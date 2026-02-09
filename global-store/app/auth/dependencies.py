from fastapi import Depends, Request, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.auth.sessions import get_session
from app.config import settings
from app.db import models


def get_current_session(request: Request, db: Session = Depends(get_db)) -> models.Session:
    session_id = request.cookies.get(settings.session_cookie_name)
    if not session_id:
        raise HTTPException(status_code=401, detail="Not authenticated")
    session = get_session(db, session_id)
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    return session


def get_current_user(session: models.Session = Depends(get_current_session)) -> models.User:
    if not session.user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return session.user


def require_admin(user: models.User = Depends(get_current_user)) -> models.User:
    if user.role != models.UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin only")
    return user


def get_optional_user(request: Request, db: Session = Depends(get_db)) -> models.User | None:
    session_id = request.cookies.get(settings.session_cookie_name)
    if not session_id:
        return None
    session = get_session(db, session_id)
    if not session or not session.user:
        return None
    return session.user


async def verify_csrf(request: Request, session: models.Session = Depends(get_current_session)) -> None:
    token = request.headers.get("X-CSRF-Token") or request.cookies.get("csrf_token")
    if request.headers.get("content-type", "").startswith("application/x-www-form-urlencoded"):
        form = await request.form()
        token = form.get("csrf_token") or token
    if not token or token != session.csrf_token:
        raise HTTPException(status_code=400, detail="Invalid CSRF token")
