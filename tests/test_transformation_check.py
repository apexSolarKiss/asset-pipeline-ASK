from asset_pipeline_ask import validate_transformation


def test_valid_transformation_record_passes() -> None:
    result = validate_transformation(
        {
            "stage_name": "resize",
            "input_references": ["source-image.png"],
            "output_reference": "resized-image.png",
            "status": "completed",
        }
    )

    assert result.is_valid is True
    assert result.errors == []


def test_missing_stage_name_fails() -> None:
    result = validate_transformation(
        {
            "input_references": ["source-image.png"],
            "output_reference": "resized-image.png",
            "status": "completed",
        }
    )

    assert result.is_valid is False
    assert result.errors == ["stage_name is required"]


def test_empty_input_references_fails() -> None:
    result = validate_transformation(
        {
            "stage_name": "resize",
            "input_references": [],
            "output_reference": "resized-image.png",
            "status": "completed",
        }
    )

    assert result.is_valid is False
    assert result.errors == ["input_references must not be empty"]


def test_missing_output_reference_fails() -> None:
    result = validate_transformation(
        {
            "stage_name": "resize",
            "input_references": ["source-image.png"],
            "status": "completed",
        }
    )

    assert result.is_valid is False
    assert result.errors == ["output_reference is required"]


def test_empty_status_fails() -> None:
    result = validate_transformation(
        {
            "stage_name": "resize",
            "input_references": ["source-image.png"],
            "output_reference": "resized-image.png",
            "status": "",
        }
    )

    assert result.is_valid is False
    assert result.errors == ["status must not be empty"]


def test_multiple_failures_are_accumulated() -> None:
    result = validate_transformation(
        {
            "input_references": [],
            "status": "",
        }
    )

    assert result.is_valid is False
    assert result.errors == [
        "stage_name is required",
        "input_references must not be empty",
        "output_reference is required",
        "status must not be empty",
    ]
