from __future__ import annotations

from datetime import date
from decimal import Decimal

from app.models import AttendanceRecord, AttendanceStatus, Child, Event, InventoryItem, Invoice
from app.services.dashboard_service import DashboardService


def test_dashboard_kpis_empty_db(session):
    kpi = DashboardService(session).get_kpis()
    assert kpi.total_children == 0
    assert kpi.unpaid_invoices == 0


def test_dashboard_kpis_with_data(session):
    child = Child(full_name="A Child", dob=date(2020, 5, 10), gender="female")
    session.add(child)
    session.flush()

    session.add(
        AttendanceRecord(
            child_id=child.id,
            attendance_date=date.today(),
            status=AttendanceStatus.PRESENT,
        )
    )
    session.add(
        Invoice(child_id=child.id, total_amount=Decimal("150.00"), paid_amount=0, status="unpaid")
    )
    session.add(
        InventoryItem(name="Milk", category="Food", unit="ltr", min_stock=10, current_stock=3)
    )
    session.add(Event(event_date=date.today(), title="Parent Meeting"))
    session.commit()

    kpi = DashboardService(session).get_kpis()
    assert kpi.total_children == 1
    assert kpi.present_today == 1
    assert kpi.unpaid_invoices == 1
    assert kpi.low_stock_items == 1
    assert kpi.upcoming_events == 1
