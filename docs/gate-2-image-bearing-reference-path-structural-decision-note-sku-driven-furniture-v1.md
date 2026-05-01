# Gate 2 Image-Bearing Reference Path Structural Decision Note // SKU-Driven Furniture v1

## Artifact Posture

This is a structural decision note.

This note chooses Gate 2 as the next visual-reference binding test.

It is not a schema mutation plan, execution record, findings note, Airtable mutation record, generation plan, or production doctrine.

It does **not** execute schema mutation.
It does **not** authorize Airtable mutation by itself.
It does **not** authorize generation.
It does **not** authorize `generated_assets` creation.
It does **not** authorize output-slot linking.
It does **not** authorize `slot_status` mutation.
It does **not** authorize production-readiness claims.

It does not fold product-truth drift into Gate 2.

It does not establish final D1 / D2 doctrine.

This note is bounded to SKU-driven Furniture v1 visual-reference binding evidence.

## Decision Context

The current visual-reference binding evidence chain is:

- text-only invariants landed as Partial
- `PKT-SKU-008` URL visual-reference set generation landed as Supported, but is now reinterpretation-ambiguous
- `PKT-SKU-009` recurrence landed as Partial, not Supported
- C-test / reference-image specificity landed as Not supported
- B-test / instruction-canvas hierarchy landed as Not supported
- model-sensitivity probe landed as Not supported

Current structural finding:

- the URL-reference path behaves as weak text / context, not image-conditioned visual input, in this Airtable AI field-agent surface

That finding does not prove URL references cannot function as visual inputs in all systems.

It does mean this prototype URL-reference path should not be treated as visually binding.

## Decision

Decision:

- Choose Gate 2 as the next bounded test.

Reason:

- cheaper diagnostics have been exhausted
- URL reference should not be treated as visually binding in this surface
- Gate 2 is now the only remaining direct continuation of the visual-reference binding question
- Gate 2 tests whether an image-bearing attachment reference path behaves differently from a surfaced URL lookup

This decision chooses the next test direction only.

It does not execute Gate 2.

## Options Considered

### 1. Gate 2 // Image-Bearing Attachment Reference Path

Cost:

- moderate prototype-bounded schema / field-path work

Leverage:

- directly tests whether visual conditioning requires an attachment / image-bearing input instead of URL text / context

Decision:

- Chosen.

### 2. Pause // Accept URL Reference As Suggestive Context For v1

Cost:

- zero

Leverage:

- defensible, but leaves the attachment-vs-URL distinction untested

Decision:

- Not chosen because ASK explicitly wants to test whether attachment works.

### 3. D-Probe // Product-Truth Drift Investigation

Cost:

- bounded

Leverage:

- important but orthogonal

Decision:

- Not chosen for this decision.

D-probe remains separately earned and should not be folded into Gate 2.

## Gate 2 Question

Question:

- Can an image-bearing reference path make the visual invariant behave as a binding input where URL lookup failed?

Gate 2 should test:

- same or comparable packet surface
- reference image as attachment / image-bearing input
- whether background, floor / wall plane, cove transition, lighting direction, and shadow behavior bind more strongly
- whether slot role and product truth remain preserved

The test should preserve the distinction between:

- product-truth image input
- visual-reference / visual-invariant image input
- generated output storage
- `generated_assets` capture / governance

## Required Next Artifact

The next artifact should be a Gate 2 schema mutation / probe plan.

The plan must specify the minimum Airtable structure needed to expose an image-bearing visual reference to `output_slots.slot_generated_image_v1`.

The plan must preserve non-actions and stop before execution.

At minimum, the plan should define:

- target tables and fields to inspect or propose
- whether `reference_assets` needs an attachment / image-bearing field
- how eligible image-bearing references would surface to `output_slots`
- how the field-agent picker will be observed before any generation
- terminal stop point before mutation or generation unless separately authorized

## Non-Actions

This decision does not authorize:

- Airtable schema mutation
- field creation
- lookup creation
- AI field-agent configuration changes
- generation invocation
- `generated_assets` creation
- output-slot / generated-asset linking
- `slot_status` mutation
- production-readiness claims
- cross-mode generalization
- final D1 / D2 doctrine
- D-probe execution
