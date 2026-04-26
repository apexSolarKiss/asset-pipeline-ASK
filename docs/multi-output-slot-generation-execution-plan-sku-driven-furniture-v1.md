# Multi-Output Slot Generation Execution Plan // SKU-Driven Furniture v1

## Artifact Posture

This is a generation execution plan.

It is not generation execution.
It is not a findings note.
It is not an execution record.

This plan does **not** authorize generation until reviewed and approved.
This plan does **not** authorize Airtable mutation until reviewed and approved.
This plan does **not** authorize schema changes.
This plan does **not** authorize prototype buildout.

It does not include screenshots or image files.

## Grounding

The Gate 6 plan chose:

- Pattern C: capture-mapping plan before generation

The capture-mapping plan chose:

- Direction 1: `output_slots` consume `live_generated_image_v1` output through explicit post-generation capture mapping

Current repo-recorded state:

- `output_slots` schema exists
- three `PKT-SKU-007` `output_slot` records exist
- `SLOT-PKT-SKU-007-HERO` exists
- `SLOT-PKT-SKU-007-PROFILE` exists
- `SLOT-PKT-SKU-007-DETAIL` exists
- all three slots are status `planned`
- no `generated_assets` are linked
- Gate 6 generation execution has not yet happened

This execution plan defines how generation, capture, mapping, and review should proceed without collapsing expected obligations into actual generated / captured assets.

The relevant conceptual split remains:

- `output_slots` = expected output obligations before generation
- `generated_assets` = actual generated / captured assets after generation
- `live_generated_image_v1` = existing Airtable image-generation / capture surface

## What This Plan Decides Now

### Decision 1: Run Vs Inspect

Decision:

- run fresh generation

Rationale:

- inspecting the old `PKT-SKU-007` output would only classify stale evidence
- Gate 6 needs to test the new slot-aware capture / mapping path under fresh generation conditions
- the original failure mode may recur, and that is useful evidence
- fresh generation tests whether the new structure can preserve partial outputs without false fulfillment

### Decision 2: Invocation Shape

Decision:

- one packet-level generation rerun through `live_generated_image_v1`, followed by explicit slot-aware capture mapping

Rationale:

- this preserves the existing generation surface for the first Gate 6 proof
- it directly tests whether Direction 1 from the capture-mapping plan is enough
- it avoids introducing a new slot-driven generation surface before the existing surface has been tested against `output_slots`
- it makes the result comparable to the original `PKT-SKU-007` failure mode

Caveat:

- packet-level generation remains a known risk because it may collapse multi-output burden again
- that risk is part of what this execution tests

### Decision 3: `generated_assets` Creation

Decision:

- `generated_assets` records may be created only after generated output is observed and role mapping is determined

Rules:

- each generated image that is retained as evidence should become a `generated_assets` record
- `asset_key` should be explicit and tied to packet, role, and attempt
- `asset_role` should use the mapped role or `unmapped_candidate` if ambiguous
- `governed_output_status` should start as `candidate`
- `output_slot` should be linked only when mapping is clear
- if `asset_uri` is not durable or not available, record the limitation explicitly in the execution report / execution record

### Decision 4: `output_slot` Linking

Decision:

- `generated_assets.output_slot` links may be created only when the generated image clearly maps to one expected slot

Rules:

- profile-like output may link only to `SLOT-PKT-SKU-007-PROFILE`
- profile-like output must not satisfy `SLOT-PKT-SKU-007-HERO` or `SLOT-PKT-SKU-007-DETAIL`
- ambiguous output should remain `unmapped_candidate` and unlinked
- no slot is fulfilled automatically merely because an image was generated

### Decision 5: `slot_status` Handling

Decision:

- do not update `slot_status` during the first Gate 6 execution

Rationale:

- the implementation plan flagged lifecycle ambiguity in `slot_status`
- Gate 6 should let the link graph carry evidence first
- lifecycle interpretation should be resolved by a later slot-status lifecycle decision artifact after evidence exists

Allowed:

- `slot_evaluation_notes` may be updated to record Gate 6 context if the approved execution step explicitly defines the update
- `generated_assets` / `output_slot` links carry primary evidence

Not allowed:

- no `slot_status` changes from `planned` to `generated`, `missing`, `accepted`, `rejected`, or `needs_retry`

### Decision 6: Visual Evidence Handling

Decision:

- visual-fidelity and role-mapping judgment requires direct visual evidence surfaced in the control-surface thread

Rules:

- Airtable record truth can confirm attachments, links, IDs, and field states
- visual role mapping must use direct image visibility in chat or another explicitly surfaced visual evidence path
- do not claim image fidelity from Airtable metadata alone
- screenshots or image files should not be committed to the repo unless a separate evidence archive is explicitly approved

## Pre-Registered Outcome Handling

### Same-As-Before Outcome

If `live_generated_image_v1` produces one profile-like image again:

- create one `generated_assets` record for the profile-like image if capture data is sufficient
- set `asset_role = profile_side`
- link `generated_assets.output_slot` to `SLOT-PKT-SKU-007-PROFILE`
- leave `SLOT-PKT-SKU-007-HERO` unlinked
- leave `SLOT-PKT-SKU-007-DETAIL` unlinked
- do not update `slot_status` values
- interpret the result as useful evidence that `output_slots` can preserve partial-result identity without false fulfillment

### Different-From-Before Outcome

If generation produces more outputs or a different role distribution:

- capture each generated image as evidence if capture data is sufficient
- map each image to the relevant `output_slot` only when role is clear
- treat improvement in output count as informative but confounded by model behavior change
- do not claim `output_slots` caused the improved generation behavior
- evaluate whether the slot structure preserved capture / mapping identity

### No-Output Outcome

If generation produces no usable output:

- create no `generated_assets` records unless a usable artifact exists
- leave `output_slots` unlinked
- do not update `slot_status` values
- record the result as execution evidence
- the findings note should distinguish generation failure from slot / capture failure

### Ambiguous-Output Outcome

If output role is visually ambiguous:

- create a `generated_assets` record only if capture data is sufficient and evidence preservation is useful
- use `asset_role = unmapped_candidate`
- do not link to `output_slot`
- do not update `slot_status` values
- record ambiguity for findings

### Capture-Failure Outcome

If generation returns an image but no durable `asset_uri` or capture path can be established:

- record that generated output existed but capture could not be completed as planned
- do not force `generated_assets` creation if required fields cannot be populated honestly
- do not link `output_slots`
- findings should treat this as capture-path pressure, not necessarily generation failure

## Gate Sequence

### Gate 1: Plan Approval

Plan approval is required before any generation or Airtable mutation.

No generation may occur from this document alone before review and approval.

### Gate 2: Live State Verification

Before execution, verify:

- `PKT-SKU-007` exists
- `live_generated_image_v1` current state
- `output_slots` table exists
- the three expected `output_slot` records exist
- all three expected `output_slot` records are linked to `PKT-SKU-007`
- all three expected `output_slot` records are status `planned`
- all three expected `output_slot` records have no linked `generated_assets`
- `generated_assets` table exists
- `generated_assets.output_slot` exists
- no conflicting `generated_assets` records already exist for the planned Gate 6 attempt

Stop if live state has materially diverged from the plan.

### Gate 3: Generation Invocation

Authorize only:

- rerun `live_generated_image_v1` for `PKT-SKU-007` under the approved execution plan

Do not authorize:

- prompt-composition redesign
- schema changes
- `slot_status` changes
- `generated_assets` creation during the generation invocation step itself unless the approved execution separates this as post-generation capture

Stop after generation invocation and report:

- whether output was produced
- how many images / attachments appear
- whether direct visual evidence is available
- whether generation changed only `live_generated_image_v1`

### Gate 4: Capture And Mapping

Authorize only if Gate 3 produced usable output and visual evidence is available.

For each generated image:

- determine candidate role using direct visual evidence
- create `generated_assets` record if capture data is sufficient
- set `packet_key` to `PKT-SKU-007`
- set `asset_role` to mapped role or `unmapped_candidate`
- set `asset_uri` if available, otherwise record limitation
- set `governed_output_status = candidate`
- set `review_artifact_flag = false` unless explicitly only a review artifact
- link `generated_assets.output_slot` only when role mapping is clear

Do not update `slot_status`.

Stop after capture / mapping and report:

- `generated_assets` records created
- `output_slot` links created
- unmapped candidates, if any
- slots still unlinked
- any capture limitations

### Gate 5: Terminal Review

Verify:

- all `generated_assets` created during Gate 4
- all `generated_assets` / `output_slot` links
- all `output_slots` and whether they have linked assets
- `slot_status` remains `planned` for all three slots
- no unauthorized fields changed
- no extra records were created
- visual-evidence boundary was preserved

### Gate 6: No Further Generation Without Separate Plan

No further generation or field-agent change is authorized without a separate future plan.

## Pre-Registered Evidence Criteria

The future Gate 6 execution should generate evidence against the seven preserved criteria.

### Whether Each `output_slot` Can Be Addressed Before Generation

This execution plan generates evidence by requiring the three seeded slots to be verified before generation and by recording whether a packet-level invocation can preserve their identities during post-generation mapping.

Because the invocation remains packet-level, this criterion remains a known risk rather than a solved condition.

### Whether Generated Output Can Be Attached To The Correct `output_slot`

This execution plan generates evidence by requiring direct visual role determination before any `generated_assets.output_slot` link is created.

Clear mapping supports the slot-aware capture path.

Ambiguity remains evidence against the path or evidence that a slot-driven invocation surface may be needed later.

### Whether `generated_assets` Records Are Needed For Each Output

This execution plan generates evidence by treating `generated_assets` as the actual-asset record surface for any retained generated image.

The future execution record should say whether the generated output could be interpreted without a `generated_assets` record, or whether the record was necessary for durable asset identity.

### Whether `slot_status` Transitions Can Be Used Without Lifecycle Ambiguity

This execution plan intentionally avoids `slot_status` transitions during the first Gate 6 execution.

That produces evidence by testing whether links alone can carry the first capture / mapping proof while preserving lifecycle ambiguity for a later decision.

### Whether Missing Outputs Can Remain Explicit As `planned` Or `missing`

This execution plan generates evidence by leaving slots without linked `generated_assets` when no matching image exists.

Because `slot_status` remains `planned`, the findings note should assess whether an unlinked planned slot is sufficiently explicit or whether a later missing-status lifecycle decision is needed.

### Whether Profile Output Can Be Linked Without Falsely Satisfying Hero / Detail Slots

This execution plan generates evidence by allowing a profile-like image to link only to `SLOT-PKT-SKU-007-PROFILE`.

If hero and detail remain unlinked, that is not failure by itself.

It is evidence that partial output can be represented without false fulfillment.

### Whether No Generation Result Should Ever Be Treated As Fulfillment Unless Slot Mapping Is Explicit

This execution plan generates evidence by requiring explicit `generated_assets.output_slot` linkage before any generated result is treated as mapped to an expected obligation.

No image should count as slot fulfillment merely because it exists in `live_generated_image_v1`.

## Future Findings Outcome Classes

The future findings note should classify the execution result using one or more of these outcome classes.

### Slot-Aware Capture Path Holds

Generated outputs can be captured as `generated_assets` and mapped or left unmapped without false fulfillment.

`slot_status` remains stable pending lifecycle decision.

### Slot-Aware Capture Path Has Gaps

Generation output exists but cannot be captured, mapped, or preserved without ambiguity under the current structure.

### Insufficient Evidence

Execution does not produce interpretable generated output, direct visual evidence is unavailable, or capture data is insufficient.

### Model-Behavior Confound

Output count or role distribution changes enough that findings must distinguish model behavior from slot-structure behavior.

## Post-Execution Artifacts

If Gate 6 execution later occurs, it must produce:

1. Gate 6 execution record

Suggested future file:

- `docs/multi-output-slot-generation-execution-record-sku-driven-furniture-v1.md`

2. Gate 6 findings note

Suggested future file:

- `docs/multi-output-slot-generation-findings-sku-driven-furniture-v1.md`

3. If needed after findings, slot-status lifecycle decision artifact

## Out Of Scope

This execution plan does not authorize:

- execution before review and approval
- schema changes
- `output_slots` schema changes
- `generated_assets` schema changes
- changes to `composed_prompt_output`
- changes to `product_image_lookup`
- prompt-composition redesign
- prototype buildout
- cross-mode claims
- generalized output doctrine
- screenshots or image files in repo
- rerunning `PKT-SKU-003`
- rerunning `PKT-SKU-007`
- `slot_status` updates during the first Gate 6 execution

## Conclusion

- chosen execution mode: fresh packet-level generation rerun through `live_generated_image_v1`, followed by explicit capture / mapping
- run vs inspect: run fresh generation
- `slot_status` handling: remain `planned` during first Gate 6 execution
- `generated_assets` creation: allowed only during approved future Gate 4 capture / mapping
- `output_slot` linking: allowed only when role mapping is clear
- generation authorized by this plan before review: no
- next step after this plan lands: review / approval before Gate 6 execution
- future execution must be gated, recorded, and followed by findings
