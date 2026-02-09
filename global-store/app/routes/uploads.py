import hashlib
import time
from fastapi import APIRouter, Depends
from app.config import settings
from app.auth.dependencies import require_admin
from app.db import models

router = APIRouter(prefix="/admin")


@router.get("/uploads/signature")
async def cloudinary_signature(user: models.User = Depends(require_admin)):
    timestamp = int(time.time())
    params_to_sign = f"timestamp={timestamp}{settings.cloudinary_api_secret}"
    signature = hashlib.sha1(params_to_sign.encode("utf-8")).hexdigest()
    return {
        "signature": signature,
        "timestamp": timestamp,
        "api_key": settings.cloudinary_api_key,
        "cloud_name": settings.cloudinary_cloud_name,
    }
