from asset_pipeline_ask import validate_outputs


def test_valid_output_payload_passes() -> None:
    result = validate_outputs(
        {
            "governed_outputs": ["final-image.png"],
            "review_artifacts": ["comparison-sheet.png"],
        }
    )

    assert result.is_valid is True
    assert result.errors == []


def test_missing_governed_outputs_fails() -> None:
    result = validate_outputs(
        {
            "review_artifacts": ["comparison-sheet.png"],
        }
    )

    assert result.is_valid is False
    assert result.errors == ["governed_outputs is required"]


def test_empty_governed_outputs_fails() -> None:
    result = validate_outputs(
        {
            "governed_outputs": {},
        }
    )

    assert result.is_valid is False
    assert result.errors == ["governed_outputs must not be empty"]


def test_empty_review_artifacts_fail_when_present() -> None:
    result = validate_outputs(
        {
            "governed_outputs": ["final-image.png"],
            "review_artifacts": [],
        }
    )

    assert result.is_valid is False
    assert result.errors == ["review_artifacts must not be empty"]


def test_multiple_failures_are_accumulated() -> None:
    result = validate_outputs(
        {
            "review_artifacts": [],
        }
    )

    assert result.is_valid is False
    assert result.errors == [
        "governed_outputs is required",
        "review_artifacts must not be empty",
    ]
