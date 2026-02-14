from __future__ import annotations

from PySide6.QtWidgets import (
    QGridLayout,
    QGroupBox,
    QLabel,
    QListWidget,
    QMainWindow,
    QPushButton,
    QVBoxLayout,
    QWidget,
)

from app.services.auth_service import SessionUser
from app.services.dashboard_service import DashboardKPIs


class DashboardWindow(QMainWindow):
    def __init__(self, user: SessionUser, kpis: DashboardKPIs) -> None:
        super().__init__()
        self.user = user
        self.kpis = kpis
        self.setWindowTitle("Nursery Management - Dashboard")
        self.resize(950, 600)
        self._build_ui()

    def _build_ui(self) -> None:
        root = QWidget()
        layout = QVBoxLayout(root)

        header = QLabel(f"Hello, {self.user.full_name} ({self.user.role.value.title()})")
        header.setStyleSheet("font-size: 18px; font-weight: 600;")

        kpi_grid = QGridLayout()
        kpi_grid.addWidget(self._kpi_card("Total Children", str(self.kpis.total_children)), 0, 0)
        kpi_grid.addWidget(self._kpi_card("Present Today", str(self.kpis.present_today)), 0, 1)
        kpi_grid.addWidget(self._kpi_card("Unpaid Invoices", str(self.kpis.unpaid_invoices)), 0, 2)
        kpi_grid.addWidget(self._kpi_card("Low Stock", str(self.kpis.low_stock_items)), 1, 0)
        kpi_grid.addWidget(self._kpi_card("Upcoming Events", str(self.kpis.upcoming_events)), 1, 1)

        quick_actions = QGroupBox("Quick Actions")
        qa_layout = QVBoxLayout(quick_actions)
        for action in ["Add Child", "Record Payment", "Mark Attendance", "Add Inventory Item"]:
            qa_layout.addWidget(QPushButton(action))

        nav = QGroupBox("Modules")
        nav_layout = QVBoxLayout(nav)
        module_list = QListWidget()
        module_list.addItems(
            [
                "Dashboard",
                "Children & Guardians",
                "Attendance",
                "Billing",
                "Inventory",
                "Reports",
                "Settings",
            ]
        )
        nav_layout.addWidget(module_list)

        layout.addWidget(header)
        layout.addLayout(kpi_grid)
        layout.addWidget(quick_actions)
        layout.addWidget(nav)
        self.setCentralWidget(root)

    @staticmethod
    def _kpi_card(title: str, value: str) -> QGroupBox:
        group = QGroupBox(title)
        layout = QVBoxLayout(group)
        label = QLabel(value)
        label.setStyleSheet("font-size: 24px; font-weight: 700;")
        layout.addWidget(label)
        return group
