#!/usr/bin/env bash
set -euo pipefail
pyinstaller --noconfirm --windowed --name NurseryManagement app/main.py
