import os
from dataclasses import dataclass


@dataclass
class Settings:
    database_url: str = os.getenv("DATABASE_URL", "")
    secret_key: str = os.getenv("SECRET_KEY", "dev-secret")
    session_cookie_name: str = os.getenv("SESSION_COOKIE_NAME", "gs_session")
    session_expiry_days: int = int(os.getenv("SESSION_EXPIRY_DAYS", "7"))
    stripe_secret_key: str = os.getenv("STRIPE_SECRET_KEY", "")
    stripe_webhook_secret: str = os.getenv("STRIPE_WEBHOOK_SECRET", "")
    stripe_public_key: str = os.getenv("STRIPE_PUBLIC_KEY", "")
    cloudinary_cloud_name: str = os.getenv("CLOUDINARY_CLOUD_NAME", "")
    cloudinary_api_key: str = os.getenv("CLOUDINARY_API_KEY", "")
    cloudinary_api_secret: str = os.getenv("CLOUDINARY_API_SECRET", "")
    app_url: str = os.getenv("APP_URL", "http://localhost:8000")


settings = Settings()
