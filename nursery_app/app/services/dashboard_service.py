from __future__ import annotations

from dataclasses import dataclass
from datetime import date

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models import AttendanceRecord, AttendanceStatus, Child, Event, InventoryItem, Invoice


@dataclass
class DashboardKPIs:
    total_children: int
    present_today: int
    unpaid_invoices: int
    low_stock_items: int
    upcoming_events: int


class DashboardService:
    def __init__(self, session: Session) -> None:
        self.session = session

    def get_kpis(self) -> DashboardKPIs:
        today = date.today()
        total_children = self.session.scalar(
            select(func.count()).select_from(Child).where(Child.is_deleted.is_(False))
        )
        present_today = self.session.scalar(
            select(func.count())
            .select_from(AttendanceRecord)
            .where(
                AttendanceRecord.is_deleted.is_(False),
                AttendanceRecord.attendance_date == today,
                AttendanceRecord.status == AttendanceStatus.PRESENT,
            )
        )
        unpaid_invoices = self.session.scalar(
            select(func.count())
            .select_from(Invoice)
            .where(Invoice.is_deleted.is_(False), Invoice.status != "paid")
        )
        low_stock_items = self.session.scalar(
            select(func.count())
            .select_from(InventoryItem)
            .where(
                InventoryItem.is_deleted.is_(False),
                InventoryItem.current_stock <= InventoryItem.min_stock,
            )
        )
        upcoming_events = self.session.scalar(
            select(func.count())
            .select_from(Event)
            .where(Event.is_deleted.is_(False), Event.event_date >= today)
        )

        return DashboardKPIs(
            total_children=total_children or 0,
            present_today=present_today or 0,
            unpaid_invoices=unpaid_invoices or 0,
            low_stock_items=low_stock_items or 0,
            upcoming_events=upcoming_events or 0,
        )
