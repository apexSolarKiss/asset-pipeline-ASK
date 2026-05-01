# Capture Mechanics Plan // SKU-Driven Furniture v1

## Artifact Posture

This is a planning artifact.

It defines a bounded capture-mechanics planning path for SKU-driven Furniture v1.

It is not a structural decision note.

It is not an execution record.

It is not an Airtable mutation authorization.

It is not a schema mutation plan.

It is not production doctrine.

It is not cross-mode generalization.

It does **not** authorize Airtable mutation.
It does **not** authorize `generated_assets` creation.
It does **not** authorize output-slot / generated-asset linking.
It does **not** authorize `slot_status` mutation.
It does **not** authorize schema changes.
It does **not** authorize generation invocation.
It does **not** authorize a product-truth D-probe.

## Operational Bridge

This plan frames the minimum operational bridge as:

```text
raw slot output -> review/capture action -> generated_assets record -> slot_status relationship
```

The bridge is intentionally not automatic.

It preserves the difference between raw generated output, governed asset identity, and expected-output lifecycle status.

## Context

The Gate 2 image-bearing reference path is Supported for `PKT-SKU-009`.

Capture / governance mechanics is now the chosen primary repo chain.

The existing B-evidence rule remains in force: `generated_assets` are created only after explicit review / capture action.

The existing flat `slot_status` lifecycle remains in force.

This plan does not reopen either decision.

## Planning Objective

Define the minimum viable capture mechanics for moving from raw slot-level output to governed asset identity.

The mechanics should preserve evidence history.

They should avoid automatic promotion of every raw slot output.

They should make the review / capture action legible before any `generated_assets` record exists.

## Scope

This plan is bounded to SKU-driven Furniture v1.

Use `PKT-SKU-009` as the likely first candidate because it is the current Gate 2 image-bearing reference path packet.

Do not retroactively normalize `PKT-SKU-007`, `PKT-SKU-008`, or `PKT-SKU-009` historical evidence in this plan.

No live Airtable action is authorized by this plan.

## Proposed Capture Trigger

A raw `slot_generated_image_v1` attachment becomes a `generated_assets` record only after an explicit review / capture action.

Capture may be appropriate when the output is:

- selected
- rejected but evidence-bearing
- review-facing
- release-ready
- delivery-relevant

Raw generation alone is not enough.

The review / capture action must identify which raw slot attachment is being captured and why asset-level identity is needed.

## Proposed Field-Carrying Model

At capture time, the minimum field-carrying model should preserve the source slot, source evidence, and capture rationale.

Candidate fields or concepts that should carry from `output_slots` into `generated_assets` include:

- source packet
- source output slot
- slot role
- source raw image attachment / attachment reference
- prompt or prompt reference
- product reference
- visual-reference / packet reference context if available
- capture reason
- capture timestamp or capture event marker if available
- review / governance status field if already present in schema
- notes / evidence rationale

These are candidate fields / concepts, not confirmed Airtable field names.

Live Airtable schema inspection is required before execution to confirm which existing fields can carry these concepts and whether any required concept is missing.

If the current schema cannot carry one of these concepts, the capture probe should stop and report the blocker rather than mutating schema implicitly.

## Proposed `slot_status` Relationship

`slot_status` tracks the expected output obligation.

`generated_assets.governed_output_status` or an equivalent governed-asset status tracks governed asset state.

Capturing a `generated_assets` record does not automatically decide final slot acceptance.

A slot may move to `needs_review`, `accepted`, `rejected`, or `needs_retry` only through explicit review / status action.

This plan does not authorize those mutations.

The capture step and the slot-status step may be adjacent in a future workflow, but they remain conceptually distinct:

- capture creates or identifies governed asset identity
- slot status records the lifecycle state of the expected output obligation

## Evidence Preservation Rules

- Do not delete or overwrite raw `slot_generated_image_v1`.
- Do not backfill older packets merely for consistency.
- Do not treat absence of `generated_assets` as absence of raw generation.
- Do not collapse review notes into asset identity unless intentionally captured.
- Preserve historical artifacts as historical evidence, not records to be retrofitted.

These rules apply especially to `PKT-SKU-007`, `PKT-SKU-008`, and `PKT-SKU-009`, where prior evidence was produced under earlier bounded prototype states.

## Proposed First Probe Shape

This is a plan only, not execution.

First probe shape:

1. Inspect live Airtable schema / state for `output_slots`, `generated_assets`, and relevant `PKT-SKU-009` records.
2. Confirm whether current fields can express the minimum capture model.
3. If schema is sufficient, propose one bounded capture of one selected `PKT-SKU-009` slot output into `generated_assets`.
4. Stop before execution unless ASK explicitly authorizes the Airtable mutation.
5. If schema is insufficient, report the blocker and decide whether a schema mutation plan is earned.

Inspection should include only the live schema / state needed to determine whether the capture bridge is expressible.

It should not create records, link records, update statuses, configure fields, invoke generation, or alter evidence.

## Outcome Classes For Eventual Probe

Pre-registered outcome classes:

- Supported: existing schema can express the capture bridge and one bounded capture can be proposed without schema mutation
- Partial: schema can express some but not all required provenance / governance fields
- Blocked: schema cannot express the capture bridge without schema mutation
- Not supported: current model collapses evidence, status, or governance in a way that violates B-evidence / slot-status boundaries

These outcome classes apply to the eventual capture-mechanics probe, not to this planning artifact.

## Non-Actions

This plan does not authorize:

- Airtable mutation
- `generated_assets` creation
- output-slot / generated-asset linking
- `slot_status` mutation
- schema mutation
- generation invocation
- product-truth D-probe execution
- production-readiness claims
- cross-mode generalization
- retroactive mutation of historical evidence
- external grounding-note refresh

## Next Recommended Step

Inspect live Airtable schema / state before any capture execution proposal.

Inspect only; do not mutate.

Target tables likely include:

- `output_slots`
- `generated_assets`
- `workflow_packets`
- `products`
- reference paths relevant to `PKT-SKU-009`

The inspection should answer whether the current live schema can express the minimum capture bridge without schema mutation.
