# Field-Agent Configuration B-Test Findings // PKT-SKU-009

## Artifact Posture

This is a findings note.

It records the B-test / adjacent model-sensitivity diagnostics after the reference-image specificity C-test landed as Not supported.

It is an evidence-chain artifact.

It is not a decision note, plan, schema mutation plan, Airtable mutation record, generation plan, or production doctrine.

It does **not** authorize Gate 2.
It does **not** authorize schema mutation.
It does **not** authorize Airtable AI field-agent configuration changes beyond those already observed.
It does **not** authorize further generation.
It does **not** authorize `generated_assets` capture.
It does **not** authorize output-slot / generated-asset linking.
It does **not** authorize `slot_status` mutation.
It does **not** authorize production-readiness claims.

It does not revise prior historical findings.

It does not establish final D1 / D2 doctrine.

This note is bounded to SKU-driven Furniture v1 and `PKT-SKU-009` evidence.

## Diagnostic Context

`PKT-SKU-008` URL visual-reference set generation landed as Supported.

`PKT-SKU-009` recurrence landed as Partial, not Supported.

The visual-reference binding diagnostic-order decision chose cheaper diagnostic discrimination before Gate 2.

The C-test / reference-image specificity diagnostic landed as Not supported.

The C-test produced the structural finding:

`Prompt can reference a URL field != the model uses that URL as image-conditioned visual input.`

B-test was next because the remaining cheap hypothesis was field-agent configuration / input weighting.

## B-Test Question

Question:

- Can Airtable AI field-agent configuration make `packet_reference_asset_uri_lookup` behave more like a visual input rather than weak text / context?

Target:

- same packet: `PKT-SKU-009`
- same product: `SKU-CHAIR-004`
- same slots: HERO / PROFILE / DETAIL
- same schema
- same URL reference: `REF-PKT-SKU-009-VISUAL-INVARIANT-002`
- same product-truth lookup: `product_image_lookup_lookup`

## Stage 1 // Configuration Inspection

Observed UI affordances:

- `slot_generated_image_v1` included:
  - `slot_prompt`
  - `product_image_lookup_lookup`
  - `packet_reference_asset_uri_lookup`
- Airtable UI allowed limited instruction-canvas editing:
  - reorder fields indirectly by deleting / re-adding fields
  - add instruction text around fields
  - mark fields optional
- Airtable UI did not expose:
  - explicit URL-as-image input mode
  - reference strength / weighting
  - source priority control
  - "use as image reference" control
  - a separate visual-input channel for the URL

This means B-test was possible only as an instruction-canvas hierarchy test, not as a true visual-weighting control.

## Variant 1 // Instruction-Canvas Hierarchy

Configuration change:

- added instruction-layer text around the fields
- framed `slot_prompt` as role-specific generation instruction
- framed `packet_reference_asset_uri_lookup` as studio-world visual reference for background, floor / wall plane, cove transition, lighting direction, and shadow behavior
- framed `product_image_lookup_lookup` as product identity / object truth
- did not remove fields
- did not make fields optional
- did not change schema

Outcome:

- Not supported

Observed:

- generated outputs did not materially inherit `REF-PKT-SKU-009-VISUAL-INVARIANT-002` floor / wall plane, cove transition, lighting direction, or shadow logic
- outputs remained dominated by `product_image_lookup_lookup` and generic warm-neutral product-render behavior
- field-agent instruction-canvas text did not make the URL lookup behave as a binding visual input

## Variant 2 // Model-Sensitivity Probe

This was adjacent to B-test rather than pure field-agent configuration.

It changed model selection inside the same Airtable AI field-agent surface.

It remained prototype-bounded, reversible, and cheaper than Gate 2.

Observed setup:

- model changed from `gpt-image-1` to `Gemini 3 Pro Image`
- same packet / product / slots / schema / reference URL / instruction-canvas hierarchy held stable
- one manual generation pass was observed

Outcome:

- Not supported

Observed:

- no material improvement over `gpt-image-1`
- outputs still did not materially bind to `REF-PKT-SKU-009-VISUAL-INVARIANT-002`
- model swap did not make the URL lookup behave as a visual-reference input

## Combined Outcome Classification

This finding uses the pre-registered outcome classes from the visual-reference binding diagnostic-order decision's B-test framing.

- Variant 1 // instruction-canvas hierarchy: Not supported.
- Variant 2 // model-sensitivity: Not supported.
- Combined B-test finding: Not supported.

Neither instruction hierarchy nor model selection made the URL lookup function as a binding visual reference.

Within this Airtable AI field-agent surface, across `gpt-image-1` and `Gemini 3 Pro Image`, the URL-reference lookup behaved as weak text / context rather than image-conditioned input.

## PKT-SKU-008 Reinterpretation Pressure

This note does not revise PR #127 or retroactively change the `PKT-SKU-008` Supported finding.

C-test plus B-test evidence deepens reinterpretation pressure.

The combined evidence now leans toward this reading:

- `PKT-SKU-008` coherence may have been driven primarily by prompt-level shared invariants and slot-prompt discipline, while the URL reference acted weakly or inertly.

Uncertainty remains:

- it remains possible that URL reference contributed marginally in `PKT-SKU-008`
- it remains possible that `PKT-SKU-008` was an easier packet
- this note does not prove the old finding false
- it does prevent treating `PKT-SKU-008` Supported as proof that the URL path is visually binding

## Architectural Boundary

This finding is about this Airtable AI field-agent surface.

It tested two models:

- `gpt-image-1`
- `Gemini 3 Pro Image`

It tested URL lookup surfaced through:

- `packet_reference_asset_uri_lookup`

It does not claim that all models or all systems cannot use URLs as visual inputs.

It does not require a model-by-model survey.

It does provide sufficient evidence that this prototype URL-reference path should not be treated as a governing visual input.

## v29 Calibration Note

The diagnostic-order calibration worked as intended. C-test, instruction-canvas B-test, and model-sensitivity probe were cheap, reversible, prototype-bounded diagnostics. They produced meaningful discrimination before committing to Gate 2 or schema mutation. This avoided both premature schema mutation and artifact bloat.

## Next Decision Surface

The next artifact should be a bounded structural decision, not another generation attempt.

Decision candidates:

1. Gate 2 // image-bearing attachment reference path
2. Pause // accept URL reference as suggestive context, not visual conditioning, for SKU-driven Furniture v1
3. D-probe // product-truth drift investigation, orthogonal to visual-reference binding

Gate 2 is now strongly earned as a candidate, but still not authorized.

Pause remains valid.

Product-truth drift remains orthogonal and should not be folded into Gate 2.

## Thesis Implication

URL fields can be surfaced structurally, but surfacing does not guarantee visual governability. The repo thesis is strengthened: information architecture must define not just which fields exist, but which surfaces the generation system can actually treat as governing inputs. In this prototype, text-level invariants and prompt discipline can improve coherence, but visual-system binding likely requires either an actual image-bearing reference path or a conscious decision to stop at suggestive URL context.

## Non-Actions

This note does not authorize:

- further Airtable mutation
- schema mutation
- lookup-field creation
- AI field-agent configuration changes
- generation invocation
- `generated_assets` creation
- output-slot / generated-asset linking
- `slot_status` mutation
- production-readiness claims
- cross-mode generalization
- final D1 / D2 doctrine

## Evidence Attribution

Visual judgments are attributed to direct visual evidence surfaced in the control-surface thread.

Airtable metadata verified record state, field-path surfacing, model / configuration state, and attachment presence.

Airtable metadata alone did not establish image-fidelity conclusions.

No screenshots or generated images are committed to the repo by this findings note.
