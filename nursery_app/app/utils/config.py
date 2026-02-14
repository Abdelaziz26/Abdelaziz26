from __future__ import annotations

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"
DB_PATH = DATA_DIR / "nursery.db"
DATABASE_URL = f"sqlite:///{DB_PATH.as_posix()}"
