from __future__ import annotations
"""Governed output sufficiency checks for produced deliverables."""

from collections.abc import Mapping
from typing import Any

from ._validation_common import ValidationResult, is_empty

OutputValidationResult = ValidationResult


def validate_outputs(payload: Any) -> OutputValidationResult:
    """Validate whether governed outputs are sufficient to proceed."""
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

    if is_empty(payload[key]):
        errors.append(f"{key} must not be empty")


def _validate_optional_category(
    payload: Mapping[str, Any], key: str, errors: list[str]
) -> None:
    if key in payload and is_empty(payload[key]):
        errors.append(f"{key} must not be empty")
