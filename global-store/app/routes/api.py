from fastapi import APIRouter, Depends, Query, Request
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from sqlalchemy import select
import stripe
import json
from app.config import settings
from app.db.session import get_db
from app.db import models
from app.auth.dependencies import get_optional_user

router = APIRouter(prefix="/api")

stripe.api_key = settings.stripe_secret_key


class CartItemIn(BaseModel):
    product_id: str
    variant_id: str | None = None
    qty: int = Field(ge=1)


class CartSyncIn(BaseModel):
    items: list[CartItemIn]


@router.get("/products")
async def products(
    db: Session = Depends(get_db),
    q: str | None = None,
    category: str | None = None,
    min_price: int | None = Query(None, ge=0),
    max_price: int | None = Query(None, ge=0),
    sort: str | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=50),
):
    query = select(models.Product).where(models.Product.is_active.is_(True))
    if q:
        query = query.where(models.Product.name.ilike(f"%{q}%"))
    if category:
        query = query.join(models.Category).where(models.Category.slug == category)
    if min_price is not None:
        query = query.where(models.Product.price_cents >= min_price)
    if max_price is not None:
        query = query.where(models.Product.price_cents <= max_price)
    if sort == "price_asc":
        query = query.order_by(models.Product.price_cents.asc())
    elif sort == "price_desc":
        query = query.order_by(models.Product.price_cents.desc())
    else:
        query = query.order_by(models.Product.created_at.desc())

    total = db.execute(query).scalars().all()
    start = (page - 1) * page_size
    items = total[start : start + page_size]

    return {
        "items": [
            {
                "id": str(item.id),
                "name": item.name,
                "slug": item.slug,
                "price_cents": item.price_cents,
                "image": item.images[0].url if item.images else "",
            }
            for item in items
        ],
        "total": len(total),
    }


@router.get("/products/{product_id}")
async def product_detail(product_id: str, db: Session = Depends(get_db)):
    product = db.get(models.Product, product_id)
    return {
        "id": str(product.id),
        "name": product.name,
        "description": product.description,
        "price_cents": product.price_cents,
        "images": [img.url for img in product.images],
        "variants": [
            {
                "id": str(variant.id),
                "sku": variant.sku,
                "color": variant.color,
                "size": variant.size,
                "stock": variant.stock,
                "price_cents_override": variant.price_cents_override,
            }
            for variant in product.variants
        ],
    }


@router.post("/cart/sync")
async def cart_sync(payload: CartSyncIn, db: Session = Depends(get_db), user: models.User | None = Depends(get_optional_user)):
    if not user:
        return {"status": "skipped"}
    db.query(models.CartItem).filter(models.CartItem.user_id == user.id).delete()
    for item in payload.items:
        db.add(
            models.CartItem(
                user_id=user.id,
                product_id=item.product_id,
                variant_id=item.variant_id,
                qty=item.qty,
            )
        )
    db.commit()
    return {"status": "ok"}


class CheckoutIn(BaseModel):
    items: list[CartItemIn]


@router.post("/checkout/create-session")
async def create_checkout_session(
    payload: CheckoutIn,
    request: Request,
    db: Session = Depends(get_db),
    user: models.User | None = Depends(get_optional_user),
):
    if not payload.items:
        return {"error": "Cart is empty"}

    line_items = []
    total_cents = 0
    for item in payload.items:
        product = db.get(models.Product, item.product_id)
        variant = db.get(models.Variant, item.variant_id) if item.variant_id else None
        if not product:
            return {"error": "Invalid product"}
        if variant and variant.stock < item.qty:
            return {"error": f"Not enough stock for {product.name}"}
        unit_price = variant.price_cents_override if variant and variant.price_cents_override is not None else product.price_cents
        total_cents += unit_price * item.qty
        line_items.append(
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": product.name},
                    "unit_amount": unit_price,
                },
                "quantity": item.qty,
            }
        )

    order = models.Order(user_id=user.id if user else None, status=models.OrderStatus.PENDING, total_cents=total_cents, currency="usd")
    db.add(order)
    db.commit()
    db.refresh(order)

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=line_items,
        mode="payment",
        success_url=f"{settings.app_url}/account/orders",
        cancel_url=f"{settings.app_url}/cart",
        metadata={"order_id": str(order.id), "cart": json.dumps([item.model_dump() for item in payload.items])},
    )
    order.stripe_session_id = session.id
    db.commit()
    return {"url": session.url}
