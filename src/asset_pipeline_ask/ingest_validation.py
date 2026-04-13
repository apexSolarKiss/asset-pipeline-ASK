from __future__ import annotations

from collections.abc import Mapping
from typing import Any

from ._validation_common import ValidationResult, is_empty

IngestValidationResult = ValidationResult


def validate_ingest(payload: Any) -> IngestValidationResult:
    if not isinstance(payload, Mapping):
        return IngestValidationResult(
            is_valid=False,
            errors=["payload must be a mapping"],
        )

    errors: list[str] = []

    _validate_required_category(payload, "source_materials", errors)
    _validate_required_category(payload, "supplied_parameters", errors)
    _validate_contextual_instructions(payload, errors)

    return IngestValidationResult(is_valid=not errors, errors=errors)


def _validate_required_category(
    payload: Mapping[str, Any], key: str, errors: list[str]
) -> None:
    if key not in payload:
        errors.append(f"{key} is required")
        return

    if is_empty(payload[key]):
        errors.append(f"{key} must not be empty")


def _validate_contextual_instructions(
    payload: Mapping[str, Any], errors: list[str]
) -> None:
    key = "contextual_instructions"
    if key not in payload:
        errors.append(f"{key} is required")
        return

    value = payload[key]
    if is_empty(value):
        errors.append(f"{key} must not be empty")
        return

    if not isinstance(value, (str, list, Mapping)):
        errors.append(
            f"{key} must be a non-empty string, list, or mapping"
        )
