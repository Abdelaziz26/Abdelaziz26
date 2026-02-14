from __future__ import annotations

import pytest

from app.services.auth_service import AuthError, AuthService


def test_seed_admin_creates_default_admin(session):
    service = AuthService(session)
    service.seed_admin_if_needed()
    session.commit()

    user = service.repo.get_user_by_username("admin")
    assert user is not None
    assert user.must_change_password is True


def test_login_with_default_admin(session):
    service = AuthService(session)
    service.seed_admin_if_needed()
    session.commit()

    logged = service.login("admin", "admin123")
    assert logged.username == "admin"
    assert logged.role.value == "admin"


def test_login_invalid_password_raises(session):
    service = AuthService(session)
    service.seed_admin_if_needed()
    session.commit()

    with pytest.raises(AuthError):
        service.login("admin", "wrongpass")
