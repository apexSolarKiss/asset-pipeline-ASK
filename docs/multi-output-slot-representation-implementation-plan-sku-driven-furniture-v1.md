# Multi-Output Slot Representation Implementation Plan // SKU-Driven Furniture v1

## Artifact Posture

This is an implementation plan.

This is the first implementation plan artifact in this project.

It names planned schema specifics and execution sequence.

It does **not** execute them.

It does **not** authorize immediate Airtable mutation.
It does **not** create schema.
It does **not** update Airtable.

No direct mutation may occur until this implementation plan is reviewed and approved.

Even after approval, mutation should proceed only through the defined stop points and approval gates.

## Grounding

This plan is grounded in the current repo-local decision trail.

The structural decision note chose first-class expected output slots as the multi-output representation direction.

The structural decision note did **not** choose the exact implementation surface.

This implementation plan now chooses that implementation surface.

The structural direction comes from:

- `docs/multi-output-slot-representation-structural-decision-note-sku-driven-furniture-v1.md`

The schema-fit input comes from:

- `docs/multi-output-generation-capture-schema-fit-note-sku-driven-furniture-v1.md`

The fired design trigger comes from:

- `docs/multi-output-packet-structure-test-findings-sku-driven-furniture-v1.md`

Live Airtable schema observations are used here as control-surface context only.

They are not treated as canonical repo-local truth unless they are also present in repo-local docs.

## Current Context

`PKT-SKU-007` remains the bounded evidence source that created output-side structural pressure.

That packet was:

- a fresh product
- a fresh packet
- a clean first-pass run

It required a three-view output burden:

- front three-quarter hero view
- profile / side supporting view
- detail crop focused on construction or material character

Airtable produced one generated image.

That image corresponded most closely to the profile / side supporting view.

The hero and detail crop were missing.

The resulting fired trigger was:

- `multi-output burden cannot be preserved from prompt to generated asset capture without slot-level representation`

This implementation plan responds to that structural result.

It does not widen it into generalized output doctrine.

## Live Airtable Context

The control-surface thread reports that live Airtable currently includes:

- `workflow_packets.required_output_set`
- `workflow_packets.live_generated_image_v1`
- `workflow_packets.generated_assets` link
- `workflow_packets.seam_runs` link
- `workflow_packets.product_image_lookup`
- `workflow_packets.composed_prompt_output`
- `generated_assets.asset_key`
- `generated_assets.packet_key`
- `generated_assets.source_seam_run_key`
- `generated_assets.asset_role`
- `generated_assets.asset_uri`
- `generated_assets.governed_output_status`
- `generated_assets.review_artifact_flag`
- `generated_assets.governed_output_flag`
- `seam_runs.seam_name`
- `seam_runs.status`
- `seam_runs.input_references`
- `seam_runs.output_references`
- `seam_runs.generated_assets` link
- `products.product_image`

Those observations are useful execution context.

They do not override repo-local documentation truth.

## What This Plan Decides Now

### Decision 1

Choose the implementation surface.

Decision:

- create a new first-class `output_slots` table / layer

Rationale:

- a separate `output_slots` surface most directly preserves expected output obligations before generation
- `generated_assets` should remain focused on actual generated / captured assets
- this keeps expected slot lifecycle separate from actual asset lifecycle
- it supports zero, one, or many generated assets against an expected slot later
- it keeps the expected-slot vs actual-generated-asset distinction clean
- it aligns with the fired trigger: `multi-output burden cannot be preserved from prompt to generated asset capture without slot-level representation`

Why alternatives are not chosen as the implementation surface:

- reusing `generated_assets` without new structure is not chosen because `generated_assets` is asset-oriented and does not cleanly represent obligations that exist before generation
- extending `generated_assets` with slot-specific fields is not chosen because it risks creating a mixed obligation-plus-artifact record and reintroducing the ambiguity the structural decision was meant to resolve
- separate attachment fields per output role are not chosen because they separate final files but do not define expected output obligations as governable units
- separate packet-local runs or generation containers may still be useful execution mechanics, but they do not replace first-class expected output slots

### Decision 2

Choose plan-level schema concept.

Planned schema concept:

- `output_slots`

This is a planned Airtable table / layer only.

It is not yet created.

Suggested planned table name:

- `output_slots`

Suggested primary field:

- `output_slot_key`

Suggested planned fields:

- `output_slot_key`
  - type: `singleLineText`
  - purpose: primary slot identifier
  - example: `SLOT-PKT-SKU-007-HERO`

- `packet_key`
  - type: `multipleRecordLinks` to `workflow_packets`
  - purpose: parent packet link

- `expected_output_role`
  - type: `singleLineText`
  - purpose: role-level identity before generation
  - examples:
    - `hero_front_three_quarter`
    - `profile_side`
    - `detail_crop`
  - rationale:
    - hero/profile/detail are SKU-driven Furniture v1 role examples, not global enum doctrine
    - `singleSelect` would lock SKU-mode-specific values into the table schema before cross-mode roles are understood
    - `singleLineText` keeps the role vocabulary flexible until cross-mode role patterns are earned

- `expected_output_description`
  - type: `multilineText`
  - purpose: human-readable expected output burden for that slot

- `slot_status`
  - type: `singleSelect`
  - planned values:
    - `planned`
    - `ready_for_generation`
    - `generated`
    - `missing`
    - `needs_retry`
    - `accepted`
    - `rejected`
  - purpose: lifecycle status of expected output obligation
  - note:
    - these values blend generation lifecycle and evaluation lifecycle
    - generation lifecycle includes `planned`, `ready_for_generation`, `generated`, `missing`, `needs_retry`
    - evaluation lifecycle includes `accepted` and `rejected`
    - this two-axis ambiguity should be watched during execution and may need later refinement
    - do not split this into multiple fields in this plan unless repo-local truth clearly requires it

- `generated_assets`
  - type: `multipleRecordLinks` to `generated_assets`
  - purpose: link actual generated / captured assets back to the expected slot

- `slot_evaluation_notes`
  - type: `multilineText`
  - purpose: role-specific evaluation notes

- `generation_attempt_reference`
  - type: `singleLineText` or `multilineText`
  - purpose: lightweight reference to generation attempt, run, or provenance until a fuller run model is earned

- `slot_sort_order`
  - type: `number`
  - purpose: stable ordering for hero/profile/detail

### Decision 3

Choose planned link additions on existing tables.

Planned additions to existing tables:

- `workflow_packets.output_slots`
  - type: `multipleRecordLinks` to `output_slots`
  - purpose: packet-to-slot relationship

- `generated_assets.output_slot`
  - type: `multipleRecordLinks` to `output_slots`
  - purpose: actual asset to expected slot relationship

Deterministic link creation rule:

- create the `output_slots.generated_assets` link from the `output_slots` side
- allow Airtable to create the reciprocal field on `generated_assets`
- then rename the Airtable-created reciprocal field on `generated_assets` to `output_slot` as a separate planned mutation step
- do not leave reciprocal field naming ambiguous during execution

This plan does not add planned changes to:

- `products`
- `constraint_rules`
- `reference_assets`
- `review_gates`
- `seam_runs`

### Decision 4

Choose record-seeding plan for the first bounded use case.

Planned seed records only after approval, not now:

- `SLOT-PKT-SKU-007-HERO`
- `SLOT-PKT-SKU-007-PROFILE`
- `SLOT-PKT-SKU-007-DETAIL`

Each should link to `PKT-SKU-007` and represent one expected output obligation.

This plan does not include generation rerun.

This implementation step is only for representation and capture structure, not generation execution.

## What This Plan Defines For Execution

- before any mutation, verify live Airtable schema against the plan
- if live schema has materially diverged from the plan, stop before mutation and record the divergence
- if a planned table or field already exists, stop and inspect before creating duplicates
- if linked-field creation creates reciprocal fields with unexpected names, record the Airtable-created names and stop for review before continuing
- if `singleSelect` options create friction, stop before substituting field type unless the approved plan explicitly permits fallback
- if any schema mutation fails partway, stop immediately and record:
  - attempted step
  - Airtable response/error
  - what exists after failure
  - whether rollback is possible
- do not proceed from schema creation to record seeding without explicit approval
- do not proceed from record seeding to generation testing without a separate approved plan

## Reconciliation Gate

The schema-fit note flagged possible divergence between repo-local Airtable spec and live Airtable shape.

Reconciliation should be a prerequisite gate before mutation.

This plan does not require a separate reconciliation artifact unless divergence is material.

If divergence is minor and only confirms already-known live fields, the execution record may document it.

If divergence changes the planned mutation surface, stop and create a reconciliation note or revised implementation plan before mutation.

## Planned Mutation Sequence

The order below is planned only.

It is not executed here.

1. Verify base and table identities.
2. Verify current `workflow_packets` and `generated_assets` schemas.
3. Confirm no `output_slots` table already exists.
4. Create `output_slots` table with primary field `output_slot_key` and planned non-link fields first:
   - `expected_output_role`
   - `expected_output_description`
   - `slot_status`
   - `slot_evaluation_notes`
   - `generation_attempt_reference`
   - `slot_sort_order`
5. Add `output_slots.packet_key` link to `workflow_packets`.
6. Confirm Airtable-created reciprocal on `workflow_packets`.
7. Rename or confirm reciprocal on `workflow_packets` as `output_slots`.
8. Add `output_slots.generated_assets` link to `generated_assets`.
9. Confirm Airtable-created reciprocal on `generated_assets`.
10. Rename the reciprocal on `generated_assets` to `output_slot`.
11. Stop for schema verification.
12. Only after approval, seed the three `PKT-SKU-007` output slot records.
13. Stop again.
14. Do not run generation in this plan.

## Approval Gates And Stop Points

- Gate 1: plan approval before any Airtable mutation
- Gate 2: live schema verification before creating `output_slots`
- Gate 3: stop after `output_slots` table and fields are created
- Gate 4: approval before seed records are created
- Gate 5: stop after seed records are created
- Gate 6: separate future plan required before any generation rerun or field-agent change

## Execution Record Requirement

Mutation execution, if later approved, should be captured in a separate execution record artifact.

Suggested future artifact:

- `docs/multi-output-slot-representation-implementation-execution-record-sku-driven-furniture-v1.md`

The execution record should capture:

- actual Airtable mutations performed
- actual table and field names/IDs
- deviations from plan
- approval gates cleared
- any failures or stop conditions
- final Airtable schema state
- whether seed records were created

The execution record should not include screenshots or image files unless a separate evidence archive is explicitly approved.

## Out Of Scope

This implementation plan does not authorize:

- immediate mutation
- generation rerun
- changing `live_generated_image_v1`
- changing `composed_prompt_output`
- changing `product_image_lookup`
- changing product records
- changing constraint records
- changing review gates
- changing prompt composition behavior
- generalized output doctrine
- cross-mode conclusions
- full prototype buildout

## Conclusion

- implementation surface chosen: new first-class `output_slots` table/layer
- `generated_assets` remains actual generated/captured asset surface
- exact field plan is proposed but not executed
- `expected_output_role` remains flexible `singleLineText` because role values are SKU-mode-specific at current evidence strength
- live Airtable reconciliation is a prerequisite gate
- no mutation is authorized until this plan is reviewed and approved
- even after approval, execution must proceed through named stop points
- next artifact after approval and execution should be an execution record
