# Gate 2 Image-Bearing Reference Path Findings // PKT-SKU-009

## Artifact Posture

This is a Gate 2 findings note.

It records the observed result of the image-bearing reference path test for `PKT-SKU-009`.

It is an evidence-chain artifact.

It is not a decision note, schema mutation plan, execution plan, Airtable mutation plan, generation plan, or production doctrine.

It does **not** authorize `generated_assets` creation.
It does **not** authorize output-slot / generated-asset linking.
It does **not** authorize `slot_status` mutation.
It does **not** authorize production-readiness claims.
It does **not** authorize cross-mode generalization.
It does **not** establish final D1 / D2 doctrine.

It does not fold product-truth drift into Gate 2.

It does not claim the result applies beyond SKU-driven Furniture v1.

## Diagnostic Context

Text-only invariants landed as Partial.

`PKT-SKU-008` URL visual-reference set generation landed as Supported, but later became reinterpretation-ambiguous.

`PKT-SKU-009` URL-reference recurrence landed as Partial.

C-test / reference-image specificity landed as Not supported.

B-test / instruction-canvas hierarchy landed as Not supported.

The adjacent model-sensitivity probe landed as Not supported.

Gate 2 was chosen to test whether an image-bearing reference path behaves differently from surfaced URL lookup.

## Gate 2 Question

Question:

- Can an image-bearing reference path make the visual invariant behave as a binding input where URL lookup did not?

The test evaluates:

- background / studio-world fidelity
- floor / wall plane
- cove transition
- lighting direction
- shadow behavior
- slot-role preservation
- product-truth preservation

## Executed Structure

### Gate 2.1 // Storage

`reference_assets.reference_image` was created as an attachment field.

Terminal state was storage only.

### Gate 2.2 // Reference Image Population

`REF-PKT-SKU-009-VISUAL-INVARIANT-002.reference_image` was populated with the architectural studio-world reference image.

### Gate 2.3 // Lookup Surfacing

Executed daisy-chain path:

- `reference_assets.reference_image`
- surfaced to `workflow_packets` through `approved_reference_keys`
- then surfaced to `output_slots` as `packet_reference_image_lookup`

Airtable already proved it could use one attachment lookup via `product_image_lookup_lookup`.

Gate 2 tested whether a second image-bearing lookup sourced from `reference_assets` could function as a distinct visual-reference input.

`packet_reference_image_lookup` was visible in the `slot_generated_image_v1` field-agent picker.

Therefore the Gate 2.3 structural outcome was successful.

It was not `Second-lookup-not-offered`.

### Gate 2.4 // Field-Agent Configuration

`slot_generated_image_v1` was configured to use:

- `slot_prompt`
- `packet_reference_image_lookup`
- `product_image_lookup_lookup`

The old URL lookup was excluded to isolate the image-bearing attachment path.

Instruction hierarchy framed:

- `slot_prompt` = role / task
- `packet_reference_image_lookup` = studio-world visual reference
- `product_image_lookup_lookup` = product identity / object truth

### Prompt Correction Before Final Read

An initial Gate 2 generation pass showed partial promise but was not treated as a clean read because the slot prompts still carried prior URL-reference wording.

The three `PKT-SKU-009` slot prompts were then updated to reference `packet_reference_image_lookup` rather than the URL lookup.

A rerun was used for the final Gate 2 visual read.

## Observed Result

Gate 2 outcome:

- Supported

Observed:

- HERO and PROFILE materially inherited the `REF-PKT-SKU-009-VISUAL-INVARIANT-002` studio-world more strongly than the URL-reference / B-test baselines.
- Floor / wall plane, cove transition, directional light, and shadow logic became visibly present.
- The output no longer appeared dominated by the product-image background.
- Slot roles held: HERO, PROFILE, and DETAIL remained distinct.
- Product identity was broadly preserved.
- DETAIL is less diagnostic for background because it is naturally cropped, but it still read within the same studio-world / material language.

## Structural Finding

`URL lookup did not behave as visual conditioning. Attachment lookup did.`

The same reference image was ineffective as URL / context but materially more effective when surfaced as an image-bearing attachment lookup.

The system does not merely need "a reference."

It needs the reference surfaced in a form the generation surface can treat as a visual input.

## PKT-SKU-008 Reinterpretation Closure

This note does not revise PR #127 or retroactively alter the historical `PKT-SKU-008` findings artifact.

Gate 2 effectively closes the reinterpretation pressure raised by the C-test and B-test findings.

Forward interpretation:

- `PKT-SKU-008`'s original Supported reading should now be understood as prompt-driven coherence, not URL-driven visual binding.
- the URL-reference path may have carried weak contextual signal, but it should not be treated as proof of visual conditioning
- forward interpretation should distinguish `PKT-SKU-008`'s set-coherence improvement from true URL-driven visual-reference binding

## Outcome Classification

This finding uses the pre-registered Gate 2 outcome classes from the probe plan.

- Supported: met.
- Partial: not the best label because the image-bearing path materially improved binding on the target visual-system dimensions.
- Not supported: not met.
- Second-lookup-not-offered: not met because the second image-bearing lookup was picker-visible.
- Reference-surface-blocked: not met.
- Inconclusive: not the best label because the comparison was visually clear after prompt correction.

Final label:

- Supported.

## Comparison Baseline

This classification depends on comparison against:

- `PKT-SKU-009` URL-reference retry / recurrence baseline
- C-test with stronger URL reference
- B-test instruction-canvas / model-sensitivity outputs
- `REF-PKT-SKU-009-VISUAL-INVARIANT-002`
- `SKU-CHAIR-004` product image

Visual judgments are attributed to direct visual evidence surfaced in the control-surface thread.

## Architectural Implication

Image-bearing reference path becomes the leading candidate for SKU-driven Furniture v1 visual-reference architecture.

This does not automatically authorize production doctrine.

This does not generalize cross-mode.

This does not decide `generated_assets` capture mechanics.

This does not solve product-truth drift as a separate pressure.

Earned three-input v1 pattern:

1. `slot_prompt` = role, task, and slot-specific variation.
2. `packet_reference_image_lookup` = studio-world / lighting / shadow / floor-wall visual reference.
3. `product_image_lookup_lookup` = object identity / product-truth reference.

This three-input pattern is the clearest architecture earned by the visual-coherence chain so far.

## Next Decision Surface

The next decision is not more visual-reference binding diagnostics.

The next decision should choose among:

1. document / plan how to preserve the image-bearing reference path as the v1 architecture candidate
2. move to `generated_assets` / capture-governance mechanics
3. run a separate D-probe on product-truth drift
4. pause the visual-reference chain as answered for SKU-driven Furniture v1

Recommendation:

- stop further generation attempts on this chain
- preserve the Supported finding
- do not create `generated_assets` or mutate `slot_status` until capture / governance is separately planned or authorized

## Non-Actions

This note does not authorize:

- further Airtable mutation
- schema mutation beyond what was already executed for Gate 2
- additional lookup-field creation
- AI field-agent configuration changes
- generation invocation
- `generated_assets` creation
- output-slot / generated-asset linking
- `slot_status` mutation
- production-readiness claims
- cross-mode generalization
- final D1 / D2 doctrine
- D-probe execution

## Evidence Attribution

Visual judgments are attributed to direct visual evidence surfaced in the control-surface thread.

Airtable metadata verified record state, field-path surfacing, picker visibility, prompt contents, and attachment presence.

Airtable metadata alone did not establish image-fidelity conclusions.

No screenshots or generated images are committed to the repo by this findings note.
