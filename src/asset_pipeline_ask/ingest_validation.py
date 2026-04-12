from __future__ import annotations

from dataclasses import dataclass
from typing import Any
from collections.abc import Mapping


@dataclass(frozen=True)
class IngestValidationResult:
    is_valid: bool
    errors: list[str]


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

    if _is_empty(payload[key]):
        errors.append(f"{key} must not be empty")


def _validate_contextual_instructions(
    payload: Mapping[str, Any], errors: list[str]
) -> None:
    key = "contextual_instructions"
    if key not in payload:
        errors.append(f"{key} is required")
        return

    value = payload[key]
    if _is_empty(value):
        errors.append(f"{key} must not be empty")
        return

    if not isinstance(value, (str, list, Mapping)):
        errors.append(
            f"{key} must be a non-empty string, list, or mapping"
        )


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
