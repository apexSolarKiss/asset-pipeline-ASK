# Multi-Output Slot Generation Findings // SKU-Driven Furniture v1

## Purpose

This is a findings note.

It interprets the bounded Gate 6 generation execution recorded in:

- `docs/multi-output-slot-generation-execution-record-sku-driven-furniture-v1.md`

It should be read as one bounded SKU-driven Furniture v1 finding only.

It does **not** authorize further generation.
It does **not** authorize Airtable mutation.
It does **not** authorize schema changes.
It does **not** authorize `slot_status` updates.
It does **not** establish generalized output doctrine.
It does **not** establish cross-mode conclusions.

No screenshots or image files are committed to the repo by this findings note.

## Evidence Source

The evidence source is the Gate 6 execution for `PKT-SKU-007`.

The execution used:

- packet-scoped generation through `workflow_packets.live_generated_image_v1`
- slot-scoped obligation accounting through `output_slots`
- post-generation candidate capture through `generated_assets`
- direct visual evidence surfaced in the control-surface thread for role mapping

The execution did not use Airtable metadata alone for visual role interpretation.

## Outcome Class

Outcome class:

- partial candidate capture under packet-level append generation, with post-hoc slot mapping via direct visual evidence

This is a deliberately narrow outcome class.

It does not say the slot architecture solved the full multi-output problem.

It does not say the packet-level generation surface failed.

It says the execution produced partial candidate capture, preserved slot-level accounting, and surfaced remaining structural pressure.

## Outcome-Class Reconciliation

The execution plan pre-registered four future findings outcome classes:

- slot-aware capture path holds
- slot-aware capture path has gaps
- insufficient evidence
- model-behavior confound

This result is closest to:

- slot-aware capture path holds

But that reading is bounded and qualified.

The slot-aware capture path held for preserving partial candidate capture and preventing false fulfillment.

The result also surfaced gaps / pressure because generation remained packet-scoped, attachment storage appended into a packet-level field, and slot identity required post-hoc direct visual mapping.

For that reason, the more precise outcome label remains:

- partial candidate capture under packet-level append generation, with post-hoc slot mapping via direct visual evidence

This does not claim full success.

It does not claim failure.

It does not promote any candidate beyond `governed_output_status = candidate`.

## What Happened

Before Gate 3, `PKT-SKU-007.live_generated_image_v1` already contained one prior-run attachment:

- `att26uKYLOIHZ889w`

Gate 3 generation occurred at packet scope through:

- `workflow_packets.live_generated_image_v1`

The Airtable connector could not invoke generation directly.

ASK manually invoked generation in the Airtable UI.

After Gate 3, `live_generated_image_v1` contained three attachments:

- `attlBw4Dy4BiXm7sE` // Gate 3 new attachment
- `att0lOda5z2lEXR6m` // Gate 3 new attachment
- `att26uKYLOIHZ889w` // prior-run evidence

Airtable behavior was inferred as:

- append

Gate 4 mapped only the two new Gate 3 attachments.

The prior-run attachment was excluded.

Two `generated_assets` candidate records were created:

- `recwXYcPKGfiKNxlg` // `profile_side` candidate linked to `SLOT-PKT-SKU-007-PROFILE`
- `recUhQzJCVVAVLGnx` // `detail_crop` candidate linked to `SLOT-PKT-SKU-007-DETAIL`

The hero slot remained explicit and unlinked:

- `SLOT-PKT-SKU-007-HERO`

All three slots remained:

- `slot_status = planned`

No candidate was promoted beyond:

- `governed_output_status = candidate`

## Slot-Level Reading

Two of three expected output slots received linked candidate generated assets after a single Gate 3 generation invocation:

- `SLOT-PKT-SKU-007-PROFILE` received a linked `profile_side` candidate
- `SLOT-PKT-SKU-007-DETAIL` received a linked `detail_crop` candidate

One expected output slot remained unlinked:

- `SLOT-PKT-SKU-007-HERO`

No slot was falsely satisfied.

The profile-like candidate did not satisfy the hero slot.

The profile-like candidate did not satisfy the detail slot.

The detail-like candidate did not satisfy the hero slot.

This is the important representational result:

- the hero obligation remained visible as an unlinked expected slot
- the profile and detail candidates were represented as actual generated / captured candidate assets
- the execution did not collapse candidate existence into slot completion

## Packet-Level Generation Reading

Generation occurred at packet scope through:

- `workflow_packets.live_generated_image_v1`

The output attachments were stored in a packet-level attachment field.

That packet-level field appended multiple images.

Packet-level attachment storage did not itself preserve slot identity.

Slot identity had to be reconstructed after generation through:

- direct visual evidence
- human judgment in the control-surface thread
- explicit `generated_assets.output_slot` links

This should not be described as generation for a specific slot.

The invocation remained packet-scoped.

The mapping became slot-aware only after generated output existed and was interpreted.

## Expected Obligation Vs Actual Candidate Asset

The execution preserved the distinction between:

- expected output obligation
- actual generated / captured candidate asset

`output_slots` represented slot-level expected obligations.

`generated_assets` represented actual generated / captured candidate assets.

`live_generated_image_v1` remained the packet-level generation / attachment surface.

This distinction mattered because the execution produced partial candidate capture:

- profile candidate existed
- detail candidate existed
- hero candidate did not exist

The slot structure preserved that partial state without falsely closing the hero obligation.

That is not a final approval state.

It is candidate capture evidence.

## Lifecycle Ambiguity

All three slots remained:

- `slot_status = planned`

The profile and detail slots had linked candidate assets while still remaining `planned`.

That coexistence is acceptable for this bounded execution because the execution plan intentionally held `slot_status` steady.

But it creates future slot-status lifecycle pressure.

The repo still needs to decide later whether a slot with linked candidate assets should remain `planned`, move to a generated-like state, move to a review-specific state, or use another lifecycle representation.

This findings note does not make that lifecycle decision.

## Asset URI Finding

Both Gate 4-created candidate records omitted `asset_uri`.

Reason:

- raw Airtable attachment URLs were blocked by the connector safety layer

This is a tooling limitation surfaced as a capture limitation.

It was not a blocker for this Gate 6 proof because asset identity was preserved through:

- explicit `asset_key`
- embedded attachment IDs in `asset_key`
- packet link
- slot link
- terminal inverse-link verification

The open question is whether `asset_uri` should later be:

- populated by another mechanism
- made optional with documented reason
- treated as a deferred capture obligation

This findings note does not choose among those paths.

## Criteria Reading

### Whether Each `output_slot` Can Be Addressed Before Generation

The slots existed before generation and were verified before Gate 3.

However, the generation invocation remained packet-scoped.

The execution therefore shows that slot obligations can be present before generation, but it does not show that generation itself addressed each slot separately.

### Whether Generated Output Can Be Attached To The Correct `output_slot`

Two generated outputs were attached to matching slots after direct visual interpretation:

- profile candidate to profile slot
- detail candidate to detail slot

This required post-generation mapping.

It was not structurally supplied by the packet-level attachment field.

### Whether `generated_assets` Records Are Needed For Each Output

The execution used `generated_assets` as the actual candidate asset surface.

That made the candidate records addressable independently from the packet-level attachment bucket.

The execution does not prove every future output must use the same pattern, but it does show why candidate asset records were useful here.

### Whether `slot_status` Transitions Can Be Used Without Lifecycle Ambiguity

This remains unresolved.

The execution intentionally preserved all three `slot_status` values as `planned`.

The result creates lifecycle pressure because linked candidate assets and `planned` slot status now coexist.

### Whether Missing Outputs Can Remain Explicit As `planned` Or `missing`

The hero output remained explicit as an unlinked slot with `slot_status = planned`.

This preserved missing-output visibility without a status transition.

Whether later executions should mark such a slot `missing` remains undecided.

### Whether Profile Output Can Be Linked Without Falsely Satisfying Hero / Detail Slots

The profile candidate linked only to the profile slot.

The hero slot remained unlinked.

The detail slot received its own detail candidate.

This preserved partial candidate capture without false slot mapping.

### Whether No Generation Result Should Ever Be Treated As Fulfillment Unless Slot Mapping Is Explicit

No generated result was treated as slot completion merely because it appeared in `live_generated_image_v1`.

Only explicit candidate records and explicit slot links were used for slot accounting.

Even then, the records remained candidates.

## Structural Pressure

This execution surfaces a specific structural pressure:

- `output_slots` represent slot-level expected obligations
- generation still happens through packet-level `workflow_packets.live_generated_image_v1`
- Airtable can append multiple images into the packet-level field
- packet-level attachment storage does not itself preserve slot identity
- slot identity had to be reconstructed through direct visual evidence and post-generation mapping

Packet-level append behavior also did not preserve generation-event identity: the prior-run attachment and Gate 3 attachments coexisted in the same packet-level field, so run identity had to be preserved through the pre-Gate-3 baseline and attachment IDs.

This is not a failure of `output_slots`.

It is evidence that `output_slots` can preserve partial candidate capture without false fulfillment, while surfacing pressure for future generation-attempt or slot-level generation representation.

Possible future directions include:

- slot-level invocation surface
- first-class `generation_attempts` layer
- slot-level generation fields on `output_slots`
- status quo with stronger mapping discipline

This findings note does not rank or choose among those directions.

It does not open a structural direction by itself.

## Reopen Triggers For Future Structural-Options Work

Future structural-options work may be warranted if one or more of the following occurs:

- a second packet exhibits the same mapping ambiguity
- an output plausibly fits two slots
- a generation produces output that fits no slot
- `asset_uri` becomes required by a later gate or downstream artifact
- `slot_status` remains unclear after another candidate-linked slot cycle

These are reopen triggers only.

They do not authorize immediate schema changes or Airtable mutation.

## What This Does And Does Not Mean

This finding means:

- two of three expected output slots received linked candidate generated assets
- the hero slot remained explicit and unlinked
- no slot was falsely satisfied
- all three slots remained `planned`
- the execution preserved candidate-level accounting across packet-level append behavior
- visual role mapping required direct visual evidence and human judgment

This finding does **not** mean:

- any output was approved
- any output was delivered
- any output became a governed final output
- the model generated for a specific slot
- the schema is final
- the workflow is production-ready
- the result establishes generalized doctrine

## Out Of Scope

This findings note does not authorize:

- schema changes
- new tables
- generated image files or screenshots in the repo
- README updates
- architecture rewrite
- slot-status lifecycle decision
- `generation_attempts` options note
- cross-mode claims
- retry generation plan
- `PKT-SKU-003` work
- further Airtable mutation

## Conclusion

Outcome class:

- partial candidate capture under packet-level append generation, with post-hoc slot mapping via direct visual evidence

The Gate 6 execution produced two linked candidate generated assets across three expected output slots.

The hero slot remained explicit and unlinked.

No slot was falsely satisfied.

No candidate moved beyond `governed_output_status = candidate`.

All slots remained `slot_status = planned`.

The slot structure preserved ambiguity and prevented false fulfillment, while surfacing structural pressure around packet-level generation, append capture, post-generation mapping, `asset_uri`, and slot-status lifecycle.

This finding is limited to the SKU-driven Furniture v1 / `PKT-SKU-007` Gate 6 execution.

It does not establish generalized output doctrine.

No further work is authorized by this findings note.
