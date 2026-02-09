import os
import uuid
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db import models
from app.auth.security import hash_password

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


def run():
    db = SessionLocal()
    try:
        categories = [
            models.Category(name="Travel", slug="travel"),
            models.Category(name="Tech", slug="tech"),
            models.Category(name="Lifestyle", slug="lifestyle"),
        ]
        db.add_all(categories)
        db.commit()

        products = [
            models.Product(
                name="Voyager Backpack",
                slug="voyager-backpack",
                description="Lightweight carry for every journey.",
                price_cents=12900,
                category_id=categories[0].id,
                is_active=True,
            ),
            models.Product(
                name="Nimbus Headphones",
                slug="nimbus-headphones",
                description="Immersive audio with minimalist design.",
                price_cents=19900,
                category_id=categories[1].id,
                is_active=True,
            ),
        ]
        db.add_all(products)
        db.commit()

        images = [
            models.ProductImage(product_id=products[0].id, url="https://res.cloudinary.com/demo/image/upload/sample.jpg", alt="Backpack", sort_order=1),
            models.ProductImage(product_id=products[1].id, url="https://res.cloudinary.com/demo/image/upload/sample.jpg", alt="Headphones", sort_order=1),
        ]
        db.add_all(images)

        variants = [
            models.Variant(product_id=products[0].id, sku="BP-01", color="Black", size="One Size", stock=25),
            models.Variant(product_id=products[1].id, sku="HP-01", color="Silver", size="One Size", stock=15),
        ]
        db.add_all(variants)

        admin_email = os.getenv("ADMIN_EMAIL", "admin@globalstore.com")
        admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
        admin = models.User(
            name="Admin",
            email=admin_email,
            password_hash=hash_password(admin_password),
            role=models.UserRole.ADMIN,
        )
        db.add(admin)
        db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    run()
