# URL Visual-Reference Recurrence Findings // PKT-SKU-009

## Artifact Posture

This is a findings note.

It records a bounded recurrence probe after the `PKT-SKU-008` Supported result.

It is an evidence-chain artifact.

It is not a decision note, plan, schema mutation plan, Airtable mutation record, generation plan, or production doctrine.

It does **not** authorize Gate 2.
It does **not** authorize schema mutation.
It does **not** authorize `generated_assets` capture.
It does **not** authorize `slot_status` mutation.
It does **not** authorize production-readiness claims.

This note is bounded to SKU-driven Furniture v1 and the `PKT-SKU-009` recurrence evidence.

## Probe Question

The probe question was whether the URL-surfaced visual-reference pattern that landed as Supported for `PKT-SKU-008` recurs on a second SKU-driven Furniture v1 packet.

The recurrence packet used a newly created product-truth anchor:

- `SKU-CHAIR-004`
- `PKT-SKU-009`
- output slots: HERO, PROFILE, DETAIL

The packet reused the existing URL visual-reference path surfaced onto `output_slots` via:

- `packet_reference_asset_uri_lookup`

The product image surfaced through:

- `product_image_lookup_lookup`

## Packet Context / Difficulty Note

`PKT-SKU-009` was created to avoid reusing old or aesthetically weak product records.

It used a newly generated warm-neutral sculpted dining chair product image as product-truth input.

It is comparable to `PKT-SKU-008` in broad mode and output shape:

- SKU-driven furniture packet
- dining-chair object
- three-slot HERO / PROFILE / DETAIL obligation

It differs because the product-truth image was newer and aesthetically stronger, but also highly visually complete. That completeness may have made the model more likely to echo the product image rather than generate distinct slot variations.

## Pass 1 Observations

Initial slot prompts were too compressed relative to the `PKT-SKU-008` prompt discipline.

Observed pass 1 behavior:

- HERO largely echoed the product-truth image.
- PROFILE largely duplicated HERO / product image rather than becoming a true profile view.
- DETAIL was more role-distinct but still behaved like a crop from the product-image system.

Outcome classification for pass 1:

- Not supported / blocked-by-prompt-input-hierarchy

Pass 1 did not fairly retest the full `PKT-SKU-008` prompt discipline because the prompts under-specified how to use the multiple inputs.

## Retry Observations

The retry revised the slot prompts to explicitly define the input hierarchy:

- `product_image_lookup_lookup` = product identity / object truth
- `packet_reference_asset_uri_lookup` = studio-world / family visual invariant
- slot role = mandatory variation

Observed retry behavior:

- slot-role separation improved
- PROFILE became a real side / profile view
- DETAIL became a real close detail crop
- HERO and PROFILE / DETAIL read more coherently as a family than pass 1

The retry therefore improved the input hierarchy and role discipline, but it did not convert the recurrence result into a clean Supported outcome.

## Remaining Failures

### A. Visual-Reference Fidelity Weakness

The generated set remained warm-neutral but did not closely lock to the background / studio-world of `REF-PKT-SKU-008-VISUAL-INVARIANT-001`.

The URL reference appeared to act as suggestive semantic context, not as a binding visual anchor.

This pressure strengthens the case for considering Gate 2 / image-bearing attachment reference behavior.

It does not authorize Gate 2.

### B. Product-Truth Fidelity Drift

HERO modified the product truth by making the seat cushion appear thicker / puffier than the product-truth image.

DETAIL introduced or exaggerated upholstery texture / surface character beyond the product-truth anchor.

This pressure is distinct from visual-reference fidelity.

It suggests product-truth lookup can also drift under generation and may need its own future investigation.

Do not treat this as automatically solved by Gate 2.

## Outcome Classification

Observed outcome classes for this chain:

- `PKT-SKU-008` URL visual-reference set generation: Supported
- `PKT-SKU-009` pass 1: Not supported / blocked-by-prompt-input-hierarchy
- `PKT-SKU-009` retry: Partial success
- overall recurrence finding: Partial, not Supported

Supported aspects:

- role separation improved after explicit input hierarchy
- set coherence improved versus pass 1
- PROFILE became role-appropriate after the retry
- DETAIL became role-appropriate after the retry

Not-supported aspects:

- visual-reference fidelity remained weak
- product-truth drift remained visible in HERO and DETAIL

The recurrence result is therefore Partial. It supports the usefulness of explicit prompt / input hierarchy, but it does not support the claim that the current URL-reference path reliably binds visual-system coherence across a second packet.

## Reopen Trigger

The recurrence result fires the relevant visual-coherence reopen trigger from the prior asset-family / visual-reference pressure chain.

The prior chain held that Gate 2 image-bearing attachment reference path should remain deferred unless future URL-reference probes fail, become unstable, or prove insufficient for visual coherence.

`PKT-SKU-009` makes that insufficiency visible on a second SKU-driven Furniture v1 packet.

Earned != authorized.

Gate 2 image-bearing reference path is more strongly earned as a decision surface.

Gate 2 is not automatically authorized.

The next step should be a bounded structural decision, not direct execution.

## Next Decision Surface

The option space remains open:

- Gate 2 image-bearing attachment reference path
- field-agent configuration investigation
- reference-image quality / specificity investigation
- product-truth drift investigation
- pause the visual-reference chain and accept URL reference as suggestive but not binding

This note does not pre-commit to any option.

## Non-Actions

This note does not authorize:

- further Airtable mutation
- schema mutation
- AI field-agent configuration changes
- generation invocation
- `generated_assets` creation
- output-slot / generated-asset linking
- `slot_status` mutation
- production-readiness claims
- cross-mode generalization
- final D1 / D2 doctrine

## Evidence Attribution

Role-fit and visual-quality judgments are attributed to direct visual evidence surfaced in the control-surface thread.

Airtable metadata alone did not establish the visual conclusions in this note.

No screenshots or generated images are committed to the repo by this findings note.
