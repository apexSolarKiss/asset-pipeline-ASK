# URL Visual Reference Set Generation Findings // SKU-Driven Furniture v1

## Artifact Posture

This is a findings note.

It records the observed result of the bounded URL visual-reference input generation probe for `PKT-SKU-008`.

It is not an options note, decision note, schema mutation plan, Airtable mutation plan, generation plan, capture-mechanics decision, or architecture rewrite.

It does **not** authorize Airtable mutation.
It does **not** authorize schema mutation.
It does **not** authorize AI field-agent configuration.
It does **not** authorize generation invocation.
It does **not** authorize `generated_assets` creation or linking.
It does **not** authorize `slot_status` mutation.
It does **not** authorize capture mechanics.
It does **not** authorize additional retries.

This note is bounded to SKU-driven Furniture v1 and `PKT-SKU-008` evidence.

## Why This Exists

PR #119 recorded Partial success for text-composed shared invariants:

- slot roles held
- set coherence improved
- HERO background / studio-plane drift remained

PR #126 defined the staged schema mutation plan for surfacing visual-reference input.

Gate 1 tested the cheapest surfaced URL lookup path before heavier image-bearing attachment structure.

This findings note records the result after the URL reference was surfaced and HERO / PROFILE / DETAIL were generated with the surfaced visual-reference URL input.

## Probe Setup

Visual invariant reference record:

- `REF-PKT-SKU-008-VISUAL-INVARIANT-001`

Packet:

- `PKT-SKU-008`

Surfaced output-slot field:

- `packet_reference_asset_uri_lookup`

Reference type:

- URL-based visual invariant / studio-world anchor

Reference content:

- warm-neutral seamless studio-world image intended to carry background / floor plane / lighting softness / shadow behavior / family-world atmosphere

Target slots:

- `SLOT-PKT-SKU-008-HERO`
- `SLOT-PKT-SKU-008-PROFILE`
- `SLOT-PKT-SKU-008-DETAIL`

Field-agent inputs:

- `slot_prompt`
- `product_image_lookup_lookup`
- `packet_reference_asset_uri_lookup`

### Prototype-Bounded Airtable Changes Executed

The bounded probe setup included these Airtable changes:

- a lookup field on `workflow_packets` was used / created to surface `approved_reference_keys -> asset_uri`
- a lookup field on `output_slots` named `packet_reference_asset_uri_lookup` surfaced the packet-level reference URI onto the output-slot generation surface
- `output_slots.slot_generated_image_v1` AI field-agent configuration was updated manually to include `packet_reference_asset_uri_lookup` as an input alongside `slot_prompt` and `product_image_lookup_lookup`
- `REF-PKT-SKU-008-VISUAL-INVARIANT-001` was created / populated with the Dropbox raw image URL / linked to `PKT-SKU-008`

These changes are prototype-bounded probe setup, not final schema doctrine.

No screenshots or generated images are committed to the repo.

Visual observations are based on direct visual evidence surfaced in the control-surface thread.

## Outcome-Class Reconciliation

Outcome classes:

- Supported: new HERO / PROFILE / DETAIL set reads as one governed family and visibly tracks the reference world better than the text-only baseline.
- Partial success: improved over text-only baseline, but set-level drift remains.
- Not supported: no meaningful improvement versus baseline.
- Inconclusive: cannot confidently distinguish reference influence from normal generation variance.

Observed result:

- Supported

ASK assessment:

- Supported

ChatGPT assessment:

- Supported // set-level

Reason:

- background / studio-world behavior is more consistent across HERO / PROFILE / DETAIL
- warm-neutral floor / wall world is more unified
- lighting softness and shadow behavior are more aligned
- PROFILE and DETAIL now align more closely with HERO
- the set reads as one governed product asset family more strongly than the prior text-only baseline

## Observed Visual Result

HERO shows a calmer seamless studio-world read and improved background alignment.

PROFILE preserves its role while matching the same warm-neutral studio world.

DETAIL preserves its role while matching material tone and background atmosphere.

The set has stronger family-level coherence than the previous Partial success state.

Remaining limitations should be treated conservatively. This finding does not claim production readiness.

## Interpretation

The surfaced URL visual-reference path appears materially useful.

This supports the cheaper D1-style path as sufficient for the current bounded probe.

Gate 2 // image-bearing attachment reference path is not earned right now.

The result supports using visual invariant anchors as part of the generation input stack.

It also shows that a URL lookup surfaced onto `output_slots` can be operationally useful in this prototype.

This is an example of prototype-bounded mutation calibration:

- reversible Airtable schema / configuration changes can be bundled into a direct bounded probe when the question is empirical and scoped to the active prototype

This does not prove that URL references are sufficient for all packets or modes.

## What This Finding Does Not Authorize

- no Airtable mutation
- no schema mutation
- no AI field-agent configuration
- no generation invocation
- no further retries
- no `generated_assets` creation
- no `generated_assets` linking
- no output-slot linking
- no `slot_status` mutation
- no generated image capture
- no capture-mechanics decision
- no Gate 2 execution
- no architecture rewrite
- no milestone update
- no `PKT-SKU-007` backfill

## What This Finding Does Not Establish

- no production-readiness claim
- no cross-mode generalization
- no proof that URL references will work for all visual invariant anchors
- no proof that attachment-based references are unnecessary forever
- no final D1 / D2 doctrine
- no `reference_assets` permanent-home decision
- no `generated_assets` capture-boundary decision
- no `asset_family` decision
- no `asset_applications` decision
- no `generation_attempts` decision

## Forward / Reopen Triggers

Gate 2 image-bearing attachment reference path should remain deferred unless future URL-reference probes fail, become unstable, or prove insufficient for visual coherence.

If another packet shows URL-reference input failing to carry visual-system coherence, Gate 2 may become re-earned.

If capture / governance of reference anchors becomes load-bearing, `generated_assets` or `reference_assets` governance may need revisiting separately.

Do not continue extra retries for `PKT-SKU-008` by default.

## Recommended Next Step

Do not open Gate 2 now.

Do not create `generated_assets` or change `slot_status` from this findings note.

If ASK chooses to continue, the next decision should likely be whether to pause the visual-reference input chain as sufficiently proven for SKU-driven Furniture v1, or whether to run a second packet to test recurrence.

This findings note itself does not choose that next step.
