from fastapi import APIRouter, Depends, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db import queries
from app.auth.sessions import create_session, get_session
from app.config import settings

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")


def ensure_session(request: Request, db: Session):
    session_id = request.cookies.get(settings.session_cookie_name)
    session = None
    if session_id:
        session = get_session(db, session_id)
    if not session:
        session = create_session(db, None)
    return session


@router.get("/home", response_class=HTMLResponse)
async def home(request: Request, db: Session = Depends(get_db)):
    session = ensure_session(request, db)
    categories = queries.get_featured_categories(db)
    products = queries.get_best_sellers(db)
    response = templates.TemplateResponse(
        "store/home.html",
        {
            "request": request,
            "categories": categories,
            "products": products,
            "csrf_token": session.csrf_token,
            "stripe_public_key": settings.stripe_public_key,
        },
    )
    response.set_cookie(settings.session_cookie_name, str(session.id), httponly=True, samesite="lax")
    response.set_cookie("csrf_token", session.csrf_token, samesite="lax")
    return response


@router.get("/shop", response_class=HTMLResponse)
async def shop(request: Request, db: Session = Depends(get_db)):
    session = ensure_session(request, db)
    categories = queries.get_featured_categories(db)
    response = templates.TemplateResponse(
        "store/shop.html",
        {
            "request": request,
            "categories": categories,
            "csrf_token": session.csrf_token,
        },
    )
    response.set_cookie(settings.session_cookie_name, str(session.id), httponly=True, samesite="lax")
    response.set_cookie("csrf_token", session.csrf_token, samesite="lax")
    return response


@router.get("/product/{slug}", response_class=HTMLResponse)
async def product_detail(slug: str, request: Request, db: Session = Depends(get_db)):
    session = ensure_session(request, db)
    product = queries.get_product_by_slug(db, slug)
    response = templates.TemplateResponse(
        "store/product.html",
        {
            "request": request,
            "product": product,
            "csrf_token": session.csrf_token,
        },
    )
    response.set_cookie(settings.session_cookie_name, str(session.id), httponly=True, samesite="lax")
    response.set_cookie("csrf_token", session.csrf_token, samesite="lax")
    return response


@router.get("/cart", response_class=HTMLResponse)
async def cart_page(request: Request, db: Session = Depends(get_db)):
    session = ensure_session(request, db)
    response = templates.TemplateResponse(
        "store/cart.html",
        {"request": request, "csrf_token": session.csrf_token},
    )
    response.set_cookie(settings.session_cookie_name, str(session.id), httponly=True, samesite="lax")
    response.set_cookie("csrf_token", session.csrf_token, samesite="lax")
    return response


@router.get("/checkout", response_class=HTMLResponse)
async def checkout_page(request: Request, db: Session = Depends(get_db)):
    session = ensure_session(request, db)
    response = templates.TemplateResponse(
        "store/checkout.html",
        {"request": request, "csrf_token": session.csrf_token},
    )
    response.set_cookie(settings.session_cookie_name, str(session.id), httponly=True, samesite="lax")
    response.set_cookie("csrf_token", session.csrf_token, samesite="lax")
    return response
