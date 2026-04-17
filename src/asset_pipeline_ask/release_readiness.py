from __future__ import annotations
"""Bounded readiness checks before outputs are presented for approval."""

from collections.abc import Mapping
from typing import Any

from ._validation_common import ValidationResult, is_empty

ReleaseReadinessResult = ValidationResult


def validate_release_readiness(payload: Any) -> ReleaseReadinessResult:
    """Validate readiness to present outputs for approval, not approval itself."""
    if not isinstance(payload, Mapping):
        return ReleaseReadinessResult(
            is_valid=False,
            errors=["payload must be a mapping"],
        )

    errors: list[str] = []

    _validate_required_category(payload, "governed_output_references", errors)
    _validate_readiness_status(payload, errors)
    _validate_optional_category(payload, "review_artifact_references", errors)

    return ReleaseReadinessResult(is_valid=not errors, errors=errors)


def _validate_required_category(
    payload: Mapping[str, Any], key: str, errors: list[str]
) -> None:
    if key not in payload:
        errors.append(f"{key} is required")
        return

    if is_empty(payload[key]):
        errors.append(f"{key} must not be empty")


def _validate_readiness_status(
    payload: Mapping[str, Any], errors: list[str]
) -> None:
    key = "readiness_status"
    if key not in payload:
        errors.append(f"{key} is required")
        return

    value = payload[key]
    if is_empty(value):
        errors.append(f"{key} must not be empty")
        return

    if not isinstance(value, str):
        errors.append(
            f"{key} must indicate ready to present for approval"
        )
        return

    normalized = " ".join(value.lower().replace("-", " ").replace("_", " ").split())
    if "approved" in normalized or "ready" not in normalized or "approval" not in normalized:
        errors.append(
            f"{key} must indicate ready to present for approval, not already approved"
        )


def _validate_optional_category(
    payload: Mapping[str, Any], key: str, errors: list[str]
) -> None:
    if key in payload and is_empty(payload[key]):
        errors.append(f"{key} must not be empty")
