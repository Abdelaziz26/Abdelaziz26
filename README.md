# Aurum Global Commerce

Premium, global ecommerce storefront with an admin panel built on Next.js App Router, Tailwind CSS, Prisma, and NextAuth.

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

### 3) Setup database

```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

### 4) Run the app

```bash
npm run dev
```

## Admin Access

Use the seeded admin credentials (or the values in your `.env`):

- Email: `admin@aurum.com`
- Password: `admin123`

Admin routes are protected at `/admin`. Sign in at `/sign-in`.

## Admin Features

- Dashboard KPIs and recent activity
- Product CRUD (`/admin/products`)
- Order management (`/admin/orders`)

## Notes

- SQLite is used for local development via Prisma; swap `DATABASE_URL` to use Postgres later.
- Orders are created during checkout and stored in the database.
