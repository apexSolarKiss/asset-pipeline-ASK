# Single Asset Example Chain

This is a concrete example slice of the current deterministic verification chain for one asset candidate.

## Ingest

```python
{
    "source_materials": ["source/sku-123-front.png"],
    "supplied_parameters": {"aspect_ratio": "1:1", "background": "white"},
    "contextual_instructions": "Keep the pack front legible and centered.",
}
```

## Transformation

```python
{
    "stage_name": "center-and-clean",
    "input_references": ["source/sku-123-front.png"],
    "output_reference": "staged/sku-123-front-centered.png",
    "status": "completed",
}
```

## Output

```python
{
    "governed_outputs": ["final/sku-123-front-final.png"],
    "review_artifacts": ["review/sku-123-front-contact-sheet.png"],
}
```

## Release-Readiness

```python
{
    "governed_output_references": ["final/sku-123-front-final.png"],
    "readiness_status": "ready_for_approval",
    "review_artifact_references": ["review/sku-123-front-contact-sheet.png"],
}
```

This is a conceptual worked example, not runtime sequencing or a full schema.
