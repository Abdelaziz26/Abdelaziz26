from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import RedirectResponse
from app.config import settings
from app.routes import store, account, admin, api, stripe_webhooks, uploads

app = FastAPI(title="Global Store")

app.add_middleware(SessionMiddleware, secret_key=settings.secret_key)

app.mount("/static", StaticFiles(directory="app/static"), name="static")

templates = Jinja2Templates(directory="app/templates")

app.include_router(store.router)
app.include_router(account.router)
app.include_router(admin.router)
app.include_router(api.router)
app.include_router(stripe_webhooks.router)
app.include_router(uploads.router)


@app.get("/")
async def root():
    return RedirectResponse(url="/home")
