from __future__ import annotations

from collections.abc import Mapping
from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class OutputValidationResult:
    is_valid: bool
    errors: list[str]


def validate_outputs(payload: Any) -> OutputValidationResult:
    if not isinstance(payload, Mapping):
        return OutputValidationResult(
            is_valid=False,
            errors=["payload must be a mapping"],
        )

    errors: list[str] = []

    _validate_required_category(payload, "governed_outputs", errors)
    _validate_optional_category(payload, "review_artifacts", errors)

    return OutputValidationResult(is_valid=not errors, errors=errors)


def _validate_required_category(
    payload: Mapping[str, Any], key: str, errors: list[str]
) -> None:
    if key not in payload:
        errors.append(f"{key} is required")
        return

    if _is_empty(payload[key]):
        errors.append(f"{key} must not be empty")


def _validate_optional_category(
    payload: Mapping[str, Any], key: str, errors: list[str]
) -> None:
    if key in payload and _is_empty(payload[key]):
        errors.append(f"{key} must not be empty")


def _is_empty(value: Any) -> bool:
    if value is None:
        return True

    if isinstance(value, str):
        return not value.strip()

    if isinstance(value, Mapping):
        return len(value) == 0

    if isinstance(value, list):
        return len(value) == 0

    return False
