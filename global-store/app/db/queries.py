from sqlalchemy.orm import Session
from sqlalchemy import select, func
from app.db import models


def get_featured_categories(db: Session):
    return db.execute(select(models.Category).limit(6)).scalars().all()


def get_best_sellers(db: Session):
    return db.execute(
        select(models.Product).where(models.Product.is_active.is_(True)).order_by(models.Product.created_at.desc()).limit(8)
    ).scalars().all()


def get_product_by_slug(db: Session, slug: str):
    return db.execute(select(models.Product).where(models.Product.slug == slug)).scalar_one_or_none()


def get_product_by_id(db: Session, product_id):
    return db.execute(select(models.Product).where(models.Product.id == product_id)).scalar_one_or_none()


def get_category_by_id(db: Session, category_id):
    return db.execute(select(models.Category).where(models.Category.id == category_id)).scalar_one_or_none()


def get_admin_kpis(db: Session):
    revenue = db.execute(
        select(func.coalesce(func.sum(models.Order.total_cents), 0)).where(models.Order.status == models.OrderStatus.PAID)
    ).scalar_one()
    orders_count = db.execute(select(func.count(models.Order.id))).scalar_one()
    return revenue, orders_count


def top_products(db: Session):
    return (
        db.execute(
            select(models.Product, func.coalesce(func.sum(models.OrderItem.qty), 0).label("units"))
            .join(models.OrderItem, models.OrderItem.product_id == models.Product.id, isouter=True)
            .group_by(models.Product.id)
            .order_by(func.coalesce(func.sum(models.OrderItem.qty), 0).desc())
            .limit(5)
        )
        .all()
    )
