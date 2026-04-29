# Generated Visual Invariant Anchor Structural Decision Note // SKU-Driven Furniture v1

## Artifact Posture

This is a structural decision note.

It chooses the next probe direction only.

It is not a schema decision, implementation plan, Airtable mutation plan, generation plan, capture-mechanics decision, or architecture rewrite.

It does **not** authorize schema mutation.
It does **not** authorize Airtable mutation.
It does **not** authorize generation invocation.
It does **not** authorize `generated_assets` creation or linking.
It does **not** authorize `slot_status` mutation.
It does **not** authorize generated image capture.
It does **not** authorize field creation or deletion.
It does **not** authorize lookup creation.
It does **not** authorize AI field-agent configuration.

This note is bounded to SKU-driven Furniture v1 evidence.

## Why This Exists

PR #119 recorded Partial success for the pre-composed shared invariant prompt probe.

Text-composed shared invariants materially improved set coherence but did not fully close HERO background / studio-plane drift.

PR #120 refined the visual invariant anchor option space.

The repo now needs a narrow next-probe direction from the refined four-way option space.

The goal is to choose the cheapest next probe that answers the most load-bearing unknown before schema hardening.

## Decision Surface

Available directions:

- text-only higher-layer representation
- D1 // External Visual Reference Anchor
- D2 // Generated Visual Invariant Anchor
- mixed multimodal invariant layer

Decision:

- choose D2 // Generated Visual Invariant Anchor as the next probe direction

D2 is chosen only as the next probe direction.

D2 is not chosen as final doctrine.

This decision does not prove visual invariant anchors are mandatory.

This decision does not choose a final storage, capture, or governance model.

## Rationale

Text-only shared invariants materially improved the set but left residual visual-system drift.

D1 external references may be useful, but they do not test the more interesting pipeline pressure: whether a generated upstream invariant artifact can feed downstream slot generation.

D2 directly tests the next load-bearing schema-fit unknown:

- whether Airtable AI field-agent generation can consume a second image input alongside the existing product-truth image

A D2-oriented probe can remain cheap, manual, and bounded.

Mixed multimodal may be the eventual architecture, but it is too broad as the next immediate probe unless the second-image-input question is answered first.

## What D2 Means Here

D2 means:

- create or select one generated visual invariant anchor that represents the shared family / studio world
- use it as a downstream visual-system input alongside the product-truth image, textual shared invariants, and slot-specific variation instructions

This anchor is not merely a background image.

It may carry:

- studio world
- lighting behavior
- shadow behavior
- camera language
- material rendering tone
- overall family-world feel

The product-truth anchor and visual invariant anchor remain distinct.

## Required Next Probe Shape If Later Authorized

If later separately authorized, the next probe should:

1. create or select one visual invariant anchor image
2. place it in a temporary reference surface, likely `reference_assets` if current shape is sufficient
3. test whether Airtable AI field-agent configuration can consume both:
   - product-truth image
   - visual invariant anchor image
4. stop after schema-fit observation
5. not generate a full new slot set unless separately authorized after the schema-fit question is answered

Terminal stop point for that later probe:

- `second-image-input schema-fit observed`

Expected observations:

- Airtable field-agent can consume second image input
- Airtable field-agent cannot consume second image input
- configuration path is unclear / requires manual UI behavior not visible to connector
- `reference_assets` is sufficient or insufficient as a temporary reference surface

## What This Decision Does Not Authorize

- no Airtable mutation
- no schema mutation
- no field creation
- no field deletion
- no lookup creation
- no AI field-agent configuration
- no generation invocation
- no `generated_assets` creation
- no `generated_assets` linking
- no `slot_status` mutation
- no generated image capture
- no capture-mechanics decision
- no architecture rewrite
- no milestone update
- no `PKT-SKU-007` backfill

## What This Decision Does Not Establish

- no final schema doctrine
- no cross-mode generalization
- no claim that D2 is required for all future packets
- no claim that text-only invariants are exhausted globally
- no decision on `reference_assets` as permanent home
- no decision on `generated_assets` capture boundaries
- no `asset_family` decision
- no `asset_applications` decision
- no `generation_attempts` decision
- no production-readiness claim

## Forward Pressure

If the second-image-input probe succeeds, D2 becomes technically feasible as a next live-generation probe path.

If the second-image-input probe fails, mixed multimodal becomes harder within current Airtable AI field-agent constraints, and D1 plus text may become the more practical next path.

If `reference_assets` is sufficient as a temporary home, avoid schema mutation.

If `reference_assets` is insufficient, a later options / schema-fit artifact may be earned.

Do not open `generation_attempts` or `generated_assets` capture mechanics merely because D2 is chosen as a probe direction.

## Recommended Next Artifact

The next repo artifact, if ASK chooses to proceed, should be a bounded D2 schema-fit probe plan.

That plan should define exact Airtable targets, exact reference surface, exact non-actions, expected observations, and terminal stop point before any Airtable work occurs.

This decision note itself does not execute that probe.
