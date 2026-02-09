from fastapi import APIRouter, Depends, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db import models
from app.auth.security import hash_password, verify_password
from app.auth.sessions import create_session, destroy_session, get_session
from app.config import settings
from app.auth.dependencies import get_current_user, verify_csrf

router = APIRouter(prefix="/account")

templates = Jinja2Templates(directory="app/templates")


def ensure_session(request: Request, db: Session):
    session_id = request.cookies.get(settings.session_cookie_name)
    if session_id:
        session = get_session(db, session_id)
        if session:
            return session
    return create_session(db, None)


@router.get("/login", response_class=HTMLResponse)
async def login_page(request: Request, db: Session = Depends(get_db)):
    session = ensure_session(request, db)
    response = templates.TemplateResponse(
        "account/login.html",
        {"request": request, "error": None, "csrf_token": session.csrf_token},
    )
    response.set_cookie(settings.session_cookie_name, str(session.id), httponly=True, samesite="lax")
    response.set_cookie("csrf_token", session.csrf_token, samesite="lax")
    return response


@router.post("/login")
async def login(
    request: Request,
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
    csrf=Depends(verify_csrf),
):
    session = ensure_session(request, db)
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        response = templates.TemplateResponse(
            "account/login.html",
            {"request": request, "error": "Invalid credentials", "csrf_token": session.csrf_token},
        )
        response.set_cookie(settings.session_cookie_name, str(session.id), httponly=True, samesite="lax")
        response.set_cookie("csrf_token", session.csrf_token, samesite="lax")
        return response
    session.user_id = user.id
    db.commit()
    response = RedirectResponse(url="/account", status_code=303)
    response.set_cookie(settings.session_cookie_name, str(session.id), httponly=True, samesite="lax")
    response.set_cookie("csrf_token", session.csrf_token, samesite="lax")
    return response


@router.get("/register", response_class=HTMLResponse)
async def register_page(request: Request, db: Session = Depends(get_db)):
    session = ensure_session(request, db)
    response = templates.TemplateResponse(
        "account/register.html",
        {"request": request, "error": None, "csrf_token": session.csrf_token},
    )
    response.set_cookie(settings.session_cookie_name, str(session.id), httponly=True, samesite="lax")
    response.set_cookie("csrf_token", session.csrf_token, samesite="lax")
    return response


@router.post("/register")
async def register(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
    csrf=Depends(verify_csrf),
):
    session = ensure_session(request, db)
    existing = db.query(models.User).filter(models.User.email == email).first()
    if existing:
        response = templates.TemplateResponse(
            "account/register.html",
            {"request": request, "error": "Email already in use", "csrf_token": session.csrf_token},
        )
        response.set_cookie(settings.session_cookie_name, str(session.id), httponly=True, samesite="lax")
        response.set_cookie("csrf_token", session.csrf_token, samesite="lax")
        return response
    user = models.User(name=name, email=email, password_hash=hash_password(password), role=models.UserRole.USER)
    db.add(user)
    db.commit()
    session.user_id = user.id
    db.commit()
    response = RedirectResponse(url="/account", status_code=303)
    response.set_cookie(settings.session_cookie_name, str(session.id), httponly=True, samesite="lax")
    response.set_cookie("csrf_token", session.csrf_token, samesite="lax")
    return response


@router.get("", response_class=HTMLResponse)
async def account_page(request: Request, user: models.User = Depends(get_current_user)):
    return templates.TemplateResponse(
        "account/account.html",
        {"request": request, "user": user},
    )


@router.get("/orders", response_class=HTMLResponse)
async def orders_page(request: Request, user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    orders = db.query(models.Order).filter(models.Order.user_id == user.id).order_by(models.Order.created_at.desc()).all()
    return templates.TemplateResponse(
        "account/orders.html",
        {"request": request, "orders": orders},
    )


@router.post("/logout")
async def logout(request: Request, db: Session = Depends(get_db), csrf=Depends(verify_csrf)):
    session_id = request.cookies.get(settings.session_cookie_name)
    if session_id:
        destroy_session(db, session_id)
    response = RedirectResponse(url="/home", status_code=303)
    response.delete_cookie(settings.session_cookie_name)
    response.delete_cookie("csrf_token")
    return response
