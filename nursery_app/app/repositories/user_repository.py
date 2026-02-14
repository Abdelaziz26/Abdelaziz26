from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Role, RoleType, User


class UserRepository:
    def __init__(self, session: Session) -> None:
        self.session = session

    def get_user_by_username(self, username: str) -> User | None:
        stmt = select(User).where(User.username == username, User.is_deleted.is_(False))
        return self.session.execute(stmt).scalar_one_or_none()

    def ensure_default_roles(self) -> None:
        existing_roles = {role.name for role in self.session.execute(select(Role)).scalars().all()}
        for role_type in RoleType:
            if role_type not in existing_roles:
                self.session.add(Role(name=role_type))

    def get_role(self, role_type: RoleType) -> Role:
        stmt = select(Role).where(Role.name == role_type)
        role = self.session.execute(stmt).scalar_one()
        return role

    def create_user(
        self,
        username: str,
        full_name: str,
        password_hash: str,
        role_type: RoleType,
        must_change: bool,
    ) -> User:
        role = self.get_role(role_type)
        user = User(
            username=username,
            full_name=full_name,
            password_hash=password_hash,
            role_id=role.id,
            must_change_password=must_change,
        )
        self.session.add(user)
        return user
