from asset_pipeline_ask import validate_release_readiness


def test_valid_ready_for_approval_payload_passes() -> None:
    result = validate_release_readiness(
        {
            "governed_output_references": ["final-image.png"],
            "readiness_status": "ready_for_approval",
            "review_artifact_references": ["comparison-sheet.png"],
        }
    )

    assert result.is_valid is True
    assert result.errors == []


def test_missing_governed_output_references_fails() -> None:
    result = validate_release_readiness(
        {
            "readiness_status": "ready_for_approval",
        }
    )

    assert result.is_valid is False
    assert result.errors == ["governed_output_references is required"]


def test_empty_governed_output_references_fails() -> None:
    result = validate_release_readiness(
        {
            "governed_output_references": [],
            "readiness_status": "ready_for_approval",
        }
    )

    assert result.is_valid is False
    assert result.errors == ["governed_output_references must not be empty"]


def test_missing_readiness_status_fails() -> None:
    result = validate_release_readiness(
        {
            "governed_output_references": ["final-image.png"],
        }
    )

    assert result.is_valid is False
    assert result.errors == ["readiness_status is required"]


def test_empty_readiness_status_fails() -> None:
    result = validate_release_readiness(
        {
            "governed_output_references": ["final-image.png"],
            "readiness_status": "",
        }
    )

    assert result.is_valid is False
    assert result.errors == ["readiness_status must not be empty"]


def test_approved_readiness_status_fails() -> None:
    result = validate_release_readiness(
        {
            "governed_output_references": ["final-image.png"],
            "readiness_status": "approved",
        }
    )

    assert result.is_valid is False
    assert result.errors == [
        "readiness_status must indicate ready to present for approval, not already approved"
    ]


def test_empty_review_artifact_references_fail_when_present() -> None:
    result = validate_release_readiness(
        {
            "governed_output_references": ["final-image.png"],
            "readiness_status": "ready_for_approval",
            "review_artifact_references": [],
        }
    )

    assert result.is_valid is False
    assert result.errors == ["review_artifact_references must not be empty"]


def test_multiple_failures_are_accumulated() -> None:
    result = validate_release_readiness(
        {
            "governed_output_references": [],
            "readiness_status": "approved",
            "review_artifact_references": [],
        }
    )

    assert result.is_valid is False
    assert result.errors == [
        "governed_output_references must not be empty",
        "readiness_status must indicate ready to present for approval, not already approved",
        "review_artifact_references must not be empty",
    ]
