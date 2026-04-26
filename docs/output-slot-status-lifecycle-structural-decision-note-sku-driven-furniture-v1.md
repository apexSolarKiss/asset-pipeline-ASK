# Output-Slot Status Lifecycle Structural Decision Note // SKU-Driven Furniture v1

## Artifact Posture

This is a structural decision note.

It is not an implementation plan.

It is not an execution record.

It does **not** authorize Airtable mutation.
It does **not** authorize `slot_status` updates.
It does **not** authorize `generated_assets` creation.
It does **not** authorize schema changes.
It does **not** establish generalized cross-mode doctrine.

## Evidence Basis

PR #108 landed the Airtable slot-level generation schema-fit note.

PR #109 landed the generated-assets promotion-boundary structural decision note.

PR #108 showed that `PKT-SKU-008` generated raw slot-level outputs for HERO, PROFILE, and DETAIL.

PR #109 formalized the bounded four-layer model:

- `output_slots` = expected output obligations
- `slot_prompt` = slot-level generation instruction
- `slot_generated_image_v1` = raw slot-level generated output
- `generated_assets` = promoted / captured asset record for review, acceptance / rejection, evidence preservation, release-readiness, or delivery

PR #109 explicitly deferred `slot_status` lifecycle.

Current Airtable state remains that `PKT-SKU-008` slots have generated slot-level outputs while `slot_status` remains `planned`.

This note answers the `slot_status` lifecycle question deferred by the PR #108 schema-fit note and PR #109 promotion-boundary decision: whether `slot_status` should remain `planned` after slot-level generation, or whether slot-level generation requires a distinct lifecycle state.

## Conceptual Framing

`slot_status` tracks the lifecycle of the expected output obligation on `output_slots`.

`slot_status` does not track `generated_assets` governance.

`generated_assets.governed_output_status` tracks the governance state of a captured asset record.

`slot_status` and `generated_assets.governed_output_status` are related but not interchangeable.

The `generated_assets` promotion boundary should not be used as a substitute for `slot_status` lifecycle.

## Problem Statement

Before slot-level generation, `slot_status` was intentionally held at `planned` to avoid lifecycle ambiguity.

Packet-level generation plus post-hoc mapping made generated / accepted / missing status hard to assign honestly.

After slot-level generation, each output slot can now hold its own raw generated output.

A slot can be generated without yet having a `generated_assets` record.

Therefore `slot_status` needs to express where the expected-output obligation is in its own lifecycle.

## Options

### Option 0: Keep All Slots `planned` Until `generated_assets` Exists

This option is rejected because slot-level raw generation would remain invisible in status and the prototype would under-report progress.

### Option A: Use `slot_status` Only For Generation Lifecycle

Example states:

- `planned`
- `ready_for_generation`
- `generated`
- `missing`

This option is rejected as insufficient because it cannot express review pressure after generation.

### Option B: Use `slot_status` Only For Review Lifecycle

Example states:

- `needs_review`
- `accepted`
- `rejected`
- `needs_retry`

This option is rejected as insufficient because it cannot express pre-generation and generation-readiness states.

### Option C: Split Into `slot_status` Plus `slot_review_status`

`slot_status` would track generation obligation, and `slot_review_status` would track review decision.

This option is rejected for now as likely over-structured for the current bounded prototype.

It remains a future reopen option if lifecycle pressure increases.

### Option D: Single Flat Lifecycle Field Across Generation And Review

`slot_status` carries the expected-output obligation from `planned` through generation and review.

This option is chosen for SKU-driven Furniture v1 because it is legible, works with the existing field, and avoids adding a second status field before that move is earned.

## Decision

Decision:

- Option D: single flat lifecycle field across generation and review

Chosen status meanings:

- `planned` = expected slot exists, but is not ready to generate yet
- `ready_for_generation` = `slot_prompt` and required generation inputs exist; generation can be run
- `generated` = raw slot-level generated output exists
- `needs_review` = generated output exists and requires human evaluation / capture decision
- `needs_retry` = an attempt occurred or output exists, but the result does not satisfy slot intent and should be regenerated
- `accepted` = slot-level output satisfies the expected obligation at the slot level
- `rejected` = slot-level output does not satisfy the expected obligation and should not be used
- `missing` = expected obligation remains unsatisfied after an attempt, deadline, or failed / no-output generation event

Clarifications:

- `accepted` at slot level does not automatically require `generated_assets` creation
- `accepted` can be a slot-level decision because `generated_assets` capture is required only when the result needs review, governance, delivery, release-readiness, or evidence identity beyond the slot record
- `generated_assets` creation remains governed by PR #109's B-evidence boundary
- if an accepted or rejected output needs review / capture / delivery / evidence identity, then `generated_assets` may be appropriate, but still requires explicit authorization

## Transition Rules

These are conceptual transition rules only.

They do **not** authorize Airtable mutation.

- `planned` -> `ready_for_generation` when `slot_prompt` and required generation inputs are present
- `ready_for_generation` -> `generated` when `slot_generated_image_v1` has raw output
- `generated` -> `needs_review` when raw output requires human evaluation before acceptance / retry / rejection / capture
- `generated` -> `needs_retry` may occur directly when the output is obviously unusable and does not require a separate review state to make the retry decision
- `needs_review` -> `accepted` when slot output satisfies the expected obligation
- `needs_review` -> `rejected` when slot output should not be used
- `needs_review` -> `needs_retry` when the output should be regenerated
- `needs_retry` -> `ready_for_generation` when the slot is prepared for another generation attempt
- `needs_retry` -> `generated` may occur directly if a regenerated output is produced before status is separately reset
- `generated` or `needs_review` -> `missing` only when no usable output exists after an attempt, deadline, or failure condition
- `missing` may later transition back to `ready_for_generation` or `generated` if a new authorized attempt succeeds
- `accepted` / `rejected` can be reopened to `needs_review` only by explicit review action

## Backward State For SKU-007 Slots

Existing `PKT-SKU-007` output slots remain historical records from the packet-level generation / capture-mapping model.

Do not retroactively mutate them in this decision note.

The new lifecycle should not automatically be applied backward to `PKT-SKU-007`.

Any backfill or status normalization for `PKT-SKU-007` would require a separate explicit Airtable update.

The affected slots are:

- `SLOT-PKT-SKU-007-HERO`
- `SLOT-PKT-SKU-007-PROFILE`
- `SLOT-PKT-SKU-007-DETAIL`

## PKT-SKU-008 Current State Under The Rule

`PKT-SKU-008` HERO, PROFILE, and DETAIL each have raw slot-level generated output.

No `generated_assets` records have been created for those slot-level outputs.

Under this decision, the honest next status for each would be `needs_review`, because raw slot output exists but no review / capture decision has happened.

The future status update would catch up directly to `needs_review` rather than recording each intermediate state, because the generation events already occurred in the Airtable UI during the prototype probe.

This note does **not** authorize changing those statuses.

Any `PKT-SKU-008` `slot_status` update requires separate explicit Airtable authorization.

## `governed_output_status` Out Of Scope

`generated_assets.governed_output_status` lifecycle is out of scope.

This decision does not decide `candidate` / `governed_output` / `rejected` semantics on `generated_assets`.

That lifecycle may need future clarification, especially after `generated_assets` capture begins under the B-evidence boundary.

## Airtable Schema Implications

Applying this decision in Airtable may require updating the singleSelect option set for `output_slots.slot_status`.

Adding or changing `slot_status` select options is a schema mutation.

This note does **not** authorize that schema mutation.

Any singleSelect option update requires separate explicit Airtable authorization before record-level status updates.

## Reopen Triggers

This decision may need to be revisited if:

- another mode produces slot-level lifecycle pressure not covered by this flat field
- observed dwell-time at `ready_for_generation` is consistently near-zero across multiple slot generation events
- `missing` proves too broad and needs to split `failed_generation` / `no_output` / `unusable_output` cases
- `accepted` without `generated_assets` creates downstream ambiguity
- `generated_assets.governed_output_status` lifecycle begins to conflict with `slot_status`
- a future `generation_attempts` layer changes how raw attempts are represented

## Boundaries / Non-Claims

- no Airtable mutation authorized
- no `slot_status` update authorized
- no `generated_assets` creation authorized
- no schema change authorized
- no `generated_assets.governed_output_status` lifecycle decision
- no final schema claim
- no production-readiness claim
- no cross-mode generalization
- no screenshots or generated images committed

## Next Questions

- Should `PKT-SKU-008` HERO, PROFILE, and DETAIL be updated to `needs_review`?
- Should `ready_for_generation` remain if it proves near-zero dwell time?
- Should `missing` split into `failed_generation` / `no_output` / `unusable_output` later?
- Should `accepted` imply `generated_assets` capture in any downstream workflow?
- Should `generated_assets.governed_output_status` get a lifecycle refinement?
- What Airtable singleSelect option changes are required before applying this lifecycle?
