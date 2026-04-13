from __future__ import annotations

from collections.abc import Mapping
from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class TransformationCheckResult:
    is_valid: bool
    errors: list[str]


def validate_transformation(payload: Any) -> TransformationCheckResult:
    if not isinstance(payload, Mapping):
        return TransformationCheckResult(
            is_valid=False,
            errors=["payload must be a mapping"],
        )

    errors: list[str] = []

    _validate_required_field(payload, "stage_name", errors)
    _validate_required_field(payload, "input_references", errors)
    _validate_required_field(payload, "output_reference", errors)
    _validate_required_field(payload, "status", errors)

    return TransformationCheckResult(is_valid=not errors, errors=errors)


def _validate_required_field(
    payload: Mapping[str, Any], key: str, errors: list[str]
) -> None:
    if key not in payload:
        errors.append(f"{key} is required")
        return

    if _is_empty(payload[key]):
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
