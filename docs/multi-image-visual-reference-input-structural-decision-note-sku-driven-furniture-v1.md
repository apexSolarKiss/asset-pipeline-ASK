# Multi-Image / Visual-Reference Input Structural Decision Note // SKU-Driven Furniture v1

## Artifact Posture

This is a bounded structural decision note.

It decides whether multi-image / visual-reference input should become first-class enough to justify a schema mutation plan.

It is not a schema mutation plan, Airtable mutation plan, implementation plan, generation plan, capture-mechanics decision, or architecture rewrite.

It does **not** authorize Airtable mutation.
It does **not** authorize schema mutation execution.
It does **not** authorize field creation or deletion.
It does **not** authorize lookup creation.
It does **not** authorize AI field-agent configuration.
It does **not** authorize generation invocation.
It does **not** authorize `generated_assets` creation or linking.
It does **not** authorize output-slot linking.
It does **not** authorize `slot_status` mutation.
It does **not** authorize generated image capture.

This note is bounded to SKU-driven Furniture v1 evidence.

## Why This Exists

PR #119 showed that text-composed shared invariants produced Partial success but left HERO background / studio-plane drift.

PR #120 refined visual invariant anchoring into D1 and D2.

PR #121 chose D2 as the next probe direction only.

PR #123 showed the D2 no-mutation image-bearing path was Reference-surface blocked.

PR #124 showed the D1 URL-reference path was Not supported.

Both cheap no-mutation visual-reference paths are now blocked.

The repo now needs a bounded decision on whether visual-reference input should become first-class enough to justify schema mutation planning.

## Evidence Basis

Repo-local evidence now shows:

- text-only shared invariants improved coherence but did not fully solve visual-system drift
- current `reference_assets.asset_uri` is URL-only
- current `output_slots` has a product-truth image lookup but no second image-bearing visual-reference input path
- the Airtable AI field-agent input picker did not offer URL / reference paths because no eligible visual-reference field or lookup had been surfaced onto the current output-slot generation surface
- no Airtable mutation occurred in either schema-fit observation
- no generation occurred
- no schema mutation occurred

## Decision

Decision:

- Yes // multi-image / visual-reference input should become first-class enough to justify a bounded schema mutation plan

This is not authorization to mutate Airtable.

This is not a decision that the final schema is known.

This is not a decision to use brittle fixed fields such as `image_2`.

This authorizes only the next repo artifact:

- a minimum viable schema mutation plan for a relational image-bearing reference path

## Rationale

Both no-mutation paths are blocked.

Visual-reference input remains relevant because text-only invariants produced only Partial success.

If visual-reference input is worth testing at all, the system must be able to express it structurally.

The D1 manual UI observation did not prove that Airtable can never consume URL references.

It proved that the current `output_slots` generation surface does not expose the relevant reference fields to the field-agent picker.

The structural need is therefore not simply to add another image field.

The structural need is to design a minimal path that makes eligible visual references available at the output-slot generation surface.

Therefore the next honest step is not more probing. It is a bounded schema mutation plan.

Because reference cardinality may grow beyond one image, the likely direction should be relational rather than fixed-field.

## Preferred Schema Direction

The later schema mutation plan should prefer minimum viable relational structure, likely involving:

- making `reference_assets` image-bearing
- preserving packet association
- surfacing eligible visual-reference inputs onto `output_slots` through an explicit field / lookup path that the AI field-agent picker can inspect
- avoiding hardcoded `image_2` / `image_3` style fields unless later proven sufficient and intentionally bounded

This note does not specify exact field names as final.

This note does not authorize creation of any fields.

## What This Decision Does Not Authorize

- no Airtable mutation
- no schema mutation execution
- no field creation
- no field deletion
- no lookup creation
- no AI field-agent configuration
- no generation invocation
- no full HERO / PROFILE / DETAIL generation pass
- no `generated_assets` creation
- no `generated_assets` linking
- no output-slot linking
- no `slot_status` mutation
- no generated image capture
- no capture-mechanics decision
- no architecture rewrite
- no milestone update
- no `PKT-SKU-007` backfill

## What This Decision Does Not Establish

- no final schema doctrine
- no final D1 or D2 doctrine
- no proof that visual invariant anchors improve images
- no claim that visual references are mandatory across all packets
- no decision on `reference_assets` as permanent home
- no `generated_assets` capture-boundary decision
- no `asset_family` decision
- no `asset_applications` decision
- no `generation_attempts` decision
- no cross-mode generalization
- no production-readiness claim

## Recommended Next Artifact

The next repo artifact should be a bounded schema mutation plan for the minimum viable relational image-bearing reference path.

The plan should treat the next load-bearing question as whether the new surfaced field / lookup path is visible to the `output_slots.slot_generated_image_v1` field-agent picker before any generation is attempted.

That plan should define exact Airtable tables, fields, field types, link / lookup path, non-actions, expected observations, and terminal stop point.

It should preserve the distinction between:

- product-truth image input
- visual-reference / visual-invariant image input
- generated output storage
- `generated_assets` capture / governance

It should stop before any actual Airtable schema mutation unless separately authorized.
