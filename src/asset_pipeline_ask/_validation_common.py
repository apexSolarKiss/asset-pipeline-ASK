from __future__ import annotations

from collections.abc import Mapping
from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class ValidationResult:
    is_valid: bool
    errors: list[str]


def is_empty(value: Any) -> bool:
    if value is None:
        return True

    if isinstance(value, str):
        return not value.strip()

    if isinstance(value, Mapping):
        return len(value) == 0

    if isinstance(value, list):
        return len(value) == 0

    return False
