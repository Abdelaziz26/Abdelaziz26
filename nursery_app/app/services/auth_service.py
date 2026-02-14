from __future__ import annotations

from dataclasses import dataclass

from sqlalchemy.orm import Session

from app.models import RoleType, User
from app.repositories.user_repository import UserRepository
from app.services.schemas import LoginInput
from app.utils.security import hash_password, verify_password


@dataclass
class SessionUser:
    id: int
    username: str
    full_name: str
    role: RoleType
    must_change_password: bool


class AuthError(Exception):
    pass


class AuthService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.repo = UserRepository(session)

    def seed_admin_if_needed(self) -> None:
        self.repo.ensure_default_roles()
        existing = self.repo.get_user_by_username("admin")
        if existing:
            return
        self.repo.create_user(
            username="admin",
            full_name="Default Administrator",
            password_hash=hash_password("admin123"),
            role_type=RoleType.ADMIN,
            must_change=True,
        )

    def login(self, username: str, password: str) -> SessionUser:
        payload = LoginInput(username=username, password=password)
        user = self.repo.get_user_by_username(payload.username)
        if not user or not user.is_active:
            msg = "Invalid username or inactive account."
            raise AuthError(msg)
        if not verify_password(payload.password, user.password_hash):
            msg = "Invalid credentials."
            raise AuthError(msg)

        return self._to_session_user(user)

    @staticmethod
    def _to_session_user(user: User) -> SessionUser:
        return SessionUser(
            id=user.id,
            username=user.username,
            full_name=user.full_name,
            role=user.role.name,
            must_change_password=user.must_change_password,
        )
