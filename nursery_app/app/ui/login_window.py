from __future__ import annotations

from PySide6.QtCore import Signal
from PySide6.QtWidgets import (
    QFormLayout,
    QHBoxLayout,
    QLabel,
    QLineEdit,
    QMessageBox,
    QPushButton,
    QVBoxLayout,
    QWidget,
)

from app.services.auth_service import AuthError, AuthService, SessionUser


class LoginWindow(QWidget):
    login_success = Signal(object)

    def __init__(self, auth_service: AuthService) -> None:
        super().__init__()
        self.auth_service = auth_service
        self.setWindowTitle("Nursery Management - Login")
        self.setMinimumWidth(420)
        self._build_ui()

    def _build_ui(self) -> None:
        layout = QVBoxLayout(self)

        title = QLabel("Welcome to Nursery Management")
        title.setStyleSheet("font-size: 20px; font-weight: 600;")

        form = QFormLayout()
        self.username_input = QLineEdit()
        self.password_input = QLineEdit()
        self.password_input.setEchoMode(QLineEdit.EchoMode.Password)

        form.addRow("Username", self.username_input)
        form.addRow("Password", self.password_input)

        button_row = QHBoxLayout()
        self.login_button = QPushButton("Login")
        self.login_button.clicked.connect(self._handle_login)
        button_row.addWidget(self.login_button)

        helper_text = QLabel("Default admin: admin / admin123")

        layout.addWidget(title)
        layout.addLayout(form)
        layout.addLayout(button_row)
        layout.addWidget(helper_text)

    def _handle_login(self) -> None:
        username = self.username_input.text().strip()
        password = self.password_input.text().strip()
        try:
            user: SessionUser = self.auth_service.login(username, password)
        except AuthError as exc:
            QMessageBox.warning(self, "Login Failed", str(exc))
            return
        except Exception:
            QMessageBox.warning(self, "Login Failed", "Please check your inputs and try again.")
            return

        self.login_success.emit(user)
