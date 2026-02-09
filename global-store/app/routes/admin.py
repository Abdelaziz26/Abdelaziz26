from fastapi import APIRouter, Depends, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.db.session import get_db
from app.db import models, queries
from app.auth.dependencies import require_admin, verify_csrf

router = APIRouter(prefix="/admin")

templates = Jinja2Templates(directory="app/templates")


@router.get("", response_class=HTMLResponse)
async def admin_dashboard(request: Request, db: Session = Depends(get_db), user: models.User = Depends(require_admin)):
    revenue, orders_count = queries.get_admin_kpis(db)
    top_items = queries.top_products(db)
    return templates.TemplateResponse(
        "admin/dashboard.html",
        {
            "request": request,
            "revenue": revenue,
            "orders_count": orders_count,
            "top_items": top_items,
            "user": user,
        },
    )


@router.get("/categories", response_class=HTMLResponse)
async def categories_list(request: Request, db: Session = Depends(get_db), user: models.User = Depends(require_admin)):
    categories = db.execute(select(models.Category).order_by(models.Category.name)).scalars().all()
    return templates.TemplateResponse(
        "admin/categories_list.html",
        {"request": request, "categories": categories, "user": user},
    )


@router.get("/categories/new", response_class=HTMLResponse)
async def category_new(request: Request, user: models.User = Depends(require_admin)):
    return templates.TemplateResponse(
        "admin/category_form.html",
        {"request": request, "category": None, "user": user},
    )


@router.post("/categories/new")
async def category_create(
    name: str = Form(...),
    slug: str = Form(...),
    db: Session = Depends(get_db),
    user: models.User = Depends(require_admin),
    csrf=Depends(verify_csrf),
):
    category = models.Category(name=name, slug=slug)
    db.add(category)
    db.commit()
    return RedirectResponse(url="/admin/categories", status_code=303)


@router.get("/categories/{category_id}", response_class=HTMLResponse)
async def category_edit(category_id: str, request: Request, db: Session = Depends(get_db), user: models.User = Depends(require_admin)):
    category = db.get(models.Category, category_id)
    return templates.TemplateResponse(
        "admin/category_form.html",
        {"request": request, "category": category, "user": user},
    )


@router.post("/categories/{category_id}")
async def category_update(
    category_id: str,
    name: str = Form(...),
    slug: str = Form(...),
    db: Session = Depends(get_db),
    user: models.User = Depends(require_admin),
    csrf=Depends(verify_csrf),
):
    category = db.get(models.Category, category_id)
    category.name = name
    category.slug = slug
    db.commit()
    return RedirectResponse(url="/admin/categories", status_code=303)


@router.post("/categories/{category_id}/delete")
async def category_delete(category_id: str, db: Session = Depends(get_db), user: models.User = Depends(require_admin), csrf=Depends(verify_csrf)):
    category = db.get(models.Category, category_id)
    db.delete(category)
    db.commit()
    return RedirectResponse(url="/admin/categories", status_code=303)


@router.get("/products", response_class=HTMLResponse)
async def products_list(request: Request, db: Session = Depends(get_db), user: models.User = Depends(require_admin)):
    products = db.execute(select(models.Product).order_by(models.Product.created_at.desc())).scalars().all()
    return templates.TemplateResponse(
        "admin/products_list.html",
        {"request": request, "products": products, "user": user},
    )


@router.get("/products/new", response_class=HTMLResponse)
async def product_new(request: Request, db: Session = Depends(get_db), user: models.User = Depends(require_admin)):
    categories = db.execute(select(models.Category)).scalars().all()
    return templates.TemplateResponse(
        "admin/product_form.html",
        {"request": request, "product": None, "categories": categories, "user": user},
    )


@router.post("/products/new")
async def product_create(
    name: str = Form(...),
    slug: str = Form(...),
    description: str = Form(...),
    price_cents: int = Form(...),
    category_id: str = Form(...),
    is_active: bool = Form(False),
    db: Session = Depends(get_db),
    user: models.User = Depends(require_admin),
    csrf=Depends(verify_csrf),
):
    product = models.Product(
        name=name,
        slug=slug,
        description=description,
        price_cents=price_cents,
        category_id=category_id,
        is_active=is_active,
    )
    db.add(product)
    db.commit()
    return RedirectResponse(url="/admin/products", status_code=303)


@router.get("/products/{product_id}", response_class=HTMLResponse)
async def product_edit(product_id: str, request: Request, db: Session = Depends(get_db), user: models.User = Depends(require_admin)):
    product = db.get(models.Product, product_id)
    categories = db.execute(select(models.Category)).scalars().all()
    images = db.execute(select(models.ProductImage).where(models.ProductImage.product_id == product_id).order_by(models.ProductImage.sort_order)).scalars().all()
    return templates.TemplateResponse(
        "admin/product_form.html",
        {"request": request, "product": product, "categories": categories, "images": images, "user": user},
    )


@router.post("/products/{product_id}")
async def product_update(
    product_id: str,
    name: str = Form(...),
    slug: str = Form(...),
    description: str = Form(...),
    price_cents: int = Form(...),
    category_id: str = Form(...),
    is_active: bool = Form(False),
    db: Session = Depends(get_db),
    user: models.User = Depends(require_admin),
    csrf=Depends(verify_csrf),
):
    product = db.get(models.Product, product_id)
    product.name = name
    product.slug = slug
    product.description = description
    product.price_cents = price_cents
    product.category_id = category_id
    product.is_active = is_active
    db.commit()
    return RedirectResponse(url=f"/admin/products/{product_id}", status_code=303)


@router.post("/products/{product_id}/delete")
async def product_delete(product_id: str, db: Session = Depends(get_db), user: models.User = Depends(require_admin), csrf=Depends(verify_csrf)):
    product = db.get(models.Product, product_id)
    db.delete(product)
    db.commit()
    return RedirectResponse(url="/admin/products", status_code=303)


@router.post("/products/{product_id}/images")
async def product_add_image(
    product_id: str,
    url: str = Form(...),
    alt: str = Form(""),
    sort_order: int = Form(0),
    db: Session = Depends(get_db),
    user: models.User = Depends(require_admin),
    csrf=Depends(verify_csrf),
):
    image = models.ProductImage(product_id=product_id, url=url, alt=alt, sort_order=sort_order)
    db.add(image)
    db.commit()
    return RedirectResponse(url=f"/admin/products/{product_id}", status_code=303)


@router.post("/products/{product_id}/images/{image_id}/delete")
async def product_delete_image(
    product_id: str,
    image_id: str,
    db: Session = Depends(get_db),
    user: models.User = Depends(require_admin),
    csrf=Depends(verify_csrf),
):
    image = db.get(models.ProductImage, image_id)
    if image:
        db.delete(image)
        db.commit()
    return RedirectResponse(url=f"/admin/products/{product_id}", status_code=303)


@router.get("/products/{product_id}/variants", response_class=HTMLResponse)
async def variants_list(product_id: str, request: Request, db: Session = Depends(get_db), user: models.User = Depends(require_admin)):
    product = db.get(models.Product, product_id)
    variants = db.execute(select(models.Variant).where(models.Variant.product_id == product_id)).scalars().all()
    return templates.TemplateResponse(
        "admin/variants_list.html",
        {"request": request, "product": product, "variants": variants, "user": user},
    )


@router.get("/products/{product_id}/variants/new", response_class=HTMLResponse)
async def variant_new(product_id: str, request: Request, db: Session = Depends(get_db), user: models.User = Depends(require_admin)):
    product = db.get(models.Product, product_id)
    return templates.TemplateResponse(
        "admin/variant_form.html",
        {"request": request, "product": product, "variant": None, "user": user},
    )


@router.post("/products/{product_id}/variants/new")
async def variant_create(
    product_id: str,
    sku: str = Form(...),
    color: str = Form(...),
    size: str = Form(...),
    stock: int = Form(...),
    price_cents_override: int | None = Form(None),
    db: Session = Depends(get_db),
    user: models.User = Depends(require_admin),
    csrf=Depends(verify_csrf),
):
    variant = models.Variant(
        product_id=product_id,
        sku=sku,
        color=color,
        size=size,
        stock=stock,
        price_cents_override=price_cents_override,
    )
    db.add(variant)
    db.commit()
    return RedirectResponse(url=f"/admin/products/{product_id}/variants", status_code=303)


@router.get("/variants/{variant_id}", response_class=HTMLResponse)
async def variant_edit(variant_id: str, request: Request, db: Session = Depends(get_db), user: models.User = Depends(require_admin)):
    variant = db.get(models.Variant, variant_id)
    product = db.get(models.Product, variant.product_id)
    return templates.TemplateResponse(
        "admin/variant_form.html",
        {"request": request, "product": product, "variant": variant, "user": user},
    )


@router.post("/variants/{variant_id}")
async def variant_update(
    variant_id: str,
    sku: str = Form(...),
    color: str = Form(...),
    size: str = Form(...),
    stock: int = Form(...),
    price_cents_override: int | None = Form(None),
    db: Session = Depends(get_db),
    user: models.User = Depends(require_admin),
    csrf=Depends(verify_csrf),
):
    variant = db.get(models.Variant, variant_id)
    variant.sku = sku
    variant.color = color
    variant.size = size
    variant.stock = stock
    variant.price_cents_override = price_cents_override
    db.commit()
    return RedirectResponse(url=f"/admin/products/{variant.product_id}/variants", status_code=303)


@router.post("/variants/{variant_id}/delete")
async def variant_delete(variant_id: str, db: Session = Depends(get_db), user: models.User = Depends(require_admin), csrf=Depends(verify_csrf)):
    variant = db.get(models.Variant, variant_id)
    product_id = variant.product_id
    db.delete(variant)
    db.commit()
    return RedirectResponse(url=f"/admin/products/{product_id}/variants", status_code=303)


@router.get("/orders", response_class=HTMLResponse)
async def orders_list(request: Request, db: Session = Depends(get_db), user: models.User = Depends(require_admin)):
    orders = db.execute(select(models.Order).order_by(models.Order.created_at.desc())).scalars().all()
    return templates.TemplateResponse(
        "admin/orders_list.html",
        {"request": request, "orders": orders, "user": user},
    )


@router.get("/orders/{order_id}", response_class=HTMLResponse)
async def order_detail(order_id: str, request: Request, db: Session = Depends(get_db), user: models.User = Depends(require_admin)):
    order = db.get(models.Order, order_id)
    return templates.TemplateResponse(
        "admin/order_detail.html",
        {"request": request, "order": order, "user": user},
    )


@router.post("/orders/{order_id}/status")
async def order_status_update(
    order_id: str,
    status: str = Form(...),
    db: Session = Depends(get_db),
    user: models.User = Depends(require_admin),
    csrf=Depends(verify_csrf),
):
    order = db.get(models.Order, order_id)
    order.status = models.OrderStatus(status)
    db.commit()
    return RedirectResponse(url=f"/admin/orders/{order_id}", status_code=303)
