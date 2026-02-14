from __future__ import annotations

import sys

from PySide6.QtWidgets import QApplication

from app.repositories.database import get_session, init_db
from app.services.auth_service import AuthService, SessionUser
from app.services.dashboard_service import DashboardService
from app.ui.dashboard_window import DashboardWindow
from app.ui.login_window import LoginWindow
from app.utils.logging_config import configure_logging


class NurseryApplication:
    def __init__(self) -> None:
        configure_logging()
        init_db()
        self.qt_app = QApplication(sys.argv)
        self.login_window: LoginWindow | None = None
        self.dashboard_window: DashboardWindow | None = None

    def run(self) -> int:
        with get_session() as session:
            auth_service = AuthService(session)
            auth_service.seed_admin_if_needed()

        with get_session() as session:
            auth_service = AuthService(session)
            self.login_window = LoginWindow(auth_service)
            self.login_window.login_success.connect(self._on_login_success)
            self.login_window.show()
            return self.qt_app.exec()

    def _on_login_success(self, user: SessionUser) -> None:
        with get_session() as session:
            dashboard_service = DashboardService(session)
            kpis = dashboard_service.get_kpis()

        self.dashboard_window = DashboardWindow(user, kpis)
        self.dashboard_window.show()
        if self.login_window:
            self.login_window.close()


def main() -> int:
    app = NurseryApplication()
    return app.run()


if __name__ == "__main__":
    raise SystemExit(main())
