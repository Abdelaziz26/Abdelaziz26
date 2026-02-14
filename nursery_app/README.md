# Nursery Management Desktop App

A cross-platform desktop Nursery Management application built with **Python 3.11+, PySide6, SQLite, SQLAlchemy, Alembic, and Pydantic**.

## 1) Architecture Plan (Phase 1)

### Layered architecture
- **UI (`app/ui`)**: PySide6 windows/widgets, module navigation, user interactions.
- **Services (`app/services`)**: business logic and orchestration (auth, dashboard KPIs, domain workflows).
- **Repositories (`app/repositories`)**: persistence access using SQLAlchemy sessions.
- **Models (`app/models`)**: SQLAlchemy ORM entities and shared mixins.
- **Utilities (`app/utils`)**: config, security (password hashing), logging, helper concerns.

### Runtime flow
1. App startup initializes logging and database.
2. Auth service seeds default roles + first admin user.
3. Login window authenticates user and starts session state.
4. Dashboard loads KPI aggregates from the database.

## 2) ER Diagram (text)

```
Role (1) ────< User

Child >────< ChildGuardian >────< Guardian
Child (1) ────< AttendanceRecord
Child (1) ────< Invoice
Invoice (1) ────< InvoiceLine
Invoice (1) ────< Payment

Group >────< StaffGroup >────< Staff
Group (1) ────< Enrollment >────(1) Child

InventoryItem (1) ────< StockMovement >────(1) Supplier

Child (1) ────< ChildNote
Event (standalone)

(All entities include created_at / updated_at / is_deleted where appropriate)
```

## 3) Current Phase Status

Implemented in this iteration:
- Project scaffolding and packaging configuration.
- SQLite + SQLAlchemy initialization.
- Core entities for auth and dashboard data.
- Login screen (admin/staff role model).
- Dashboard with starter KPIs and quick actions.
- Seed admin user on first run: `admin/admin123` (force password change flag enabled).
- Initial pytest coverage for auth and dashboard services.

## 4) Setup

```bash
cd nursery_app
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -e .[dev]
```

## 5) Run app

```bash
cd nursery_app
python -m app.main
```

## 6) Database migration commands (Alembic)

```bash
cd nursery_app
alembic upgrade head
alembic revision --autogenerate -m "your message"
```

## 7) Quality checks

```bash
cd nursery_app
ruff check .
black --check .
pytest
```

## 8) Build installers/bundles

```bash
cd nursery_app
./scripts/build_windows.sh
./scripts/build_macos.sh
```

## 9) Manual smoke test checklist

- [ ] Launch app with `python -m app.main`.
- [ ] Log in with `admin/admin123`.
- [ ] Verify dashboard opens after login.
- [ ] Verify KPI cards render and show integer values.
- [ ] Verify invalid password shows friendly error.
- [ ] Confirm SQLite file exists at `nursery_app/data/nursery.db`.

## 10) Next implementation milestones

- Full module build-out (Children, Attendance, Billing, Inventory, Reports, Settings/Backup).
- Full Alembic migration coverage for all entities.
- Role-aware permissions in UI actions (staff restrictions + destructive action guards).
- CSV/PDF export services and backup/restore workflows.
