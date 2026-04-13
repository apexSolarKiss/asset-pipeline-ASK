from __future__ import annotations

from collections.abc import Mapping
from typing import Any

from ._validation_common import ValidationResult, is_empty

TransformationCheckResult = ValidationResult


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

    if is_empty(payload[key]):
        errors.append(f"{key} must not be empty")
