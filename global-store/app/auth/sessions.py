import uuid
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.config import settings
from app.auth.security import generate_csrf_token
from app.db import models


def create_session(db: Session, user_id: uuid.UUID | None) -> models.Session:
    csrf_token = generate_csrf_token()
    expires_at = datetime.utcnow() + timedelta(days=settings.session_expiry_days)
    session = models.Session(user_id=user_id, csrf_token=csrf_token, expires_at=expires_at)
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


def get_session(db: Session, session_id: str) -> models.Session | None:
    try:
        session_uuid = uuid.UUID(session_id)
    except ValueError:
        return None
    session = db.get(models.Session, session_uuid)
    if not session:
        return None
    if session.expires_at < datetime.utcnow():
        db.delete(session)
        db.commit()
        return None
    return session


def destroy_session(db: Session, session_id: str) -> None:
    try:
        session_uuid = uuid.UUID(session_id)
    except ValueError:
        return
    session = db.get(models.Session, session_uuid)
    if session:
        db.delete(session)
        db.commit()
