# Global Store

Production-ready full-stack e-commerce app built with FastAPI, Jinja2, SQLAlchemy, and Stripe.

## Prerequisites
- Python 3.11+
- PostgreSQL 14+
- Node is **not** required
- Stripe account and CLI
- Cloudinary account

## Local setup
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create a database and set env vars:
```bash
createdb global_store
cp .env.example .env
```

## Run migrations
Run the SQL files in order:
```bash
psql "$DATABASE_URL" -f migrations/001_init.sql
psql "$DATABASE_URL" -f migrations/002_indexes.sql
```

## Seed the database
```bash
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/global_store
python scripts/seed.py
```

## Run the app
```bash
uvicorn app.main:app --reload
```

## Stripe webhook testing
Install and login to Stripe CLI, then:
```bash
stripe listen --forward-to localhost:8000/webhooks/stripe
```
Use the webhook signing secret printed in the CLI and set `STRIPE_WEBHOOK_SECRET` in `.env`.

## Cloudinary uploads
The admin UI uses a backend-generated signature. Call:
```
GET /admin/uploads/signature
```
Then POST to Cloudinary with the signed payload and use the returned URL in the product image form.

## Environment variables
- `DATABASE_URL`: Postgres connection string
- `SECRET_KEY`: Session middleware secret
- `SESSION_COOKIE_NAME`: Cookie name for sessions
- `SESSION_EXPIRY_DAYS`: Session expiry in days
- `APP_URL`: Base app URL used for Stripe redirects
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_PUBLIC_KEY`: Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `ADMIN_EMAIL`: seeded admin email
- `ADMIN_PASSWORD`: seeded admin password

## Deployment
### Render
1. Create a new Web Service for the app.
2. Add a PostgreSQL instance and set `DATABASE_URL`.
3. Add all `.env` variables.
4. Set the start command to `uvicorn app.main:app --host 0.0.0.0 --port 10000`.

### Fly.io
1. Run `fly launch`.
2. Configure a Postgres app and attach it.
3. Set secrets: `fly secrets set DATABASE_URL=...` etc.
4. Deploy with `fly deploy`.

### VPS
1. Install Python and Postgres.
2. Configure environment variables.
3. Use a process manager like systemd or supervisor.
