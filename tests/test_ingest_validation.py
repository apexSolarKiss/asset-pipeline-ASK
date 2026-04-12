from asset_pipeline_ask import validate_ingest


def test_valid_ingest_payload_passes() -> None:
    result = validate_ingest(
        {
            "source_materials": ["image-a.png"],
            "supplied_parameters": {"aspect_ratio": "1:1"},
            "contextual_instructions": "Keep the output neutral and legible.",
        }
    )

    assert result.is_valid is True
    assert result.errors == []


def test_missing_source_materials_fails() -> None:
    result = validate_ingest(
        {
            "supplied_parameters": {"aspect_ratio": "1:1"},
            "contextual_instructions": ["Keep branding consistent."],
        }
    )

    assert result.is_valid is False
    assert result.errors == ["source_materials is required"]


def test_empty_supplied_parameters_fails() -> None:
    result = validate_ingest(
        {
            "source_materials": ["image-a.png"],
            "supplied_parameters": {},
            "contextual_instructions": {"tone": "neutral"},
        }
    )

    assert result.is_valid is False
    assert result.errors == ["supplied_parameters must not be empty"]


def test_empty_contextual_instructions_fails() -> None:
    result = validate_ingest(
        {
            "source_materials": ["image-a.png"],
            "supplied_parameters": {"aspect_ratio": "1:1"},
            "contextual_instructions": "",
        }
    )

    assert result.is_valid is False
    assert result.errors == ["contextual_instructions must not be empty"]


def test_multiple_failures_are_accumulated() -> None:
    result = validate_ingest(
        {
            "supplied_parameters": {},
            "contextual_instructions": [],
        }
    )

    assert result.is_valid is False
    assert result.errors == [
        "source_materials is required",
        "supplied_parameters must not be empty",
        "contextual_instructions must not be empty",
    ]
