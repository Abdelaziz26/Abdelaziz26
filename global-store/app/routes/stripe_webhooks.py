from fastapi import APIRouter, Request
from sqlalchemy.orm import Session
from sqlalchemy import select
import stripe
import json
from app.config import settings
from app.db.session import SessionLocal
from app.db import models

router = APIRouter()

stripe.api_key = settings.stripe_secret_key


@router.post("/webhooks/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("Stripe-Signature")
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, settings.stripe_webhook_secret)
    except stripe.error.SignatureVerificationError:
        return {"status": "invalid"}

    if event["type"] == "checkout.session.completed":
        session_data = event["data"]["object"]
        session_id = session_data.get("id")
        cart_payload = session_data.get("metadata", {}).get("cart")
        db: Session = SessionLocal()
        try:
            order = db.execute(select(models.Order).where(models.Order.stripe_session_id == session_id)).scalar_one_or_none()
            if order and order.status != models.OrderStatus.PAID:
                order.status = models.OrderStatus.PAID
                if not order.items:
                    items = json.loads(cart_payload) if cart_payload else []
                    for item in items:
                        product = db.get(models.Product, item["product_id"])
                        variant = db.get(models.Variant, item.get("variant_id")) if item.get("variant_id") else None
                        unit_price = variant.price_cents_override if variant and variant.price_cents_override is not None else product.price_cents
                        db.add(
                            models.OrderItem(
                                order_id=order.id,
                                product_id=product.id,
                                variant_id=variant.id if variant else None,
                                qty=item["qty"],
                                unit_price_cents=unit_price,
                            )
                        )
                        if variant:
                            variant.stock = max(0, variant.stock - item["qty"])
                    db.commit()
                db.commit()
        finally:
            db.close()
    return {"status": "ok"}
