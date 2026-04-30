# Reference-Image Specificity C-Test Findings // PKT-SKU-009

## Artifact Posture

This is a findings note.

It records the C-test selected by the visual-reference binding diagnostic-order decision.

It is an evidence-chain artifact.

It is not a decision note, plan, schema mutation plan, Airtable mutation record, generation plan, or production doctrine.

It does **not** authorize Gate 2.
It does **not** authorize schema mutation.
It does **not** authorize Airtable AI field-agent configuration changes.
It does **not** authorize generation beyond the observed pass.
It does **not** authorize `generated_assets` capture.
It does **not** authorize output-slot / generated-asset linking.
It does **not** authorize `slot_status` mutation.
It does **not** authorize production-readiness claims.

It does not revise prior historical findings.

It does not establish final D1 / D2 doctrine.

This note is bounded to SKU-driven Furniture v1 and `PKT-SKU-009` evidence.

## Diagnostic Context

`PKT-SKU-008` URL visual-reference set generation landed as Supported.

`PKT-SKU-009` recurrence landed as Partial, not Supported.

The visual-reference binding diagnostic-order decision chose cheaper diagnostic discrimination before Gate 2.

C-test was first because reference-image specificity was the cheapest plausible explanation:

- maybe `REF-PKT-SKU-008-VISUAL-INVARIANT-001` was too weak / generic

## C-Test Question

Question:

- Does a stronger, more spatially specific URL reference image improve visual-reference binding without schema mutation?

Held stable:

- same packet: `PKT-SKU-009`
- same product: `SKU-CHAIR-004`
- same slots: HERO / PROFILE / DETAIL
- same schema
- same URL lookup path: `packet_reference_asset_uri_lookup`
- same product-truth lookup path: `product_image_lookup_lookup`
- same slot prompts / input-hierarchy discipline
- no field-agent configuration change

Changed variable:

- reference image changed from `REF-PKT-SKU-008-VISUAL-INVARIANT-001` to `REF-PKT-SKU-009-VISUAL-INVARIANT-002`

## Stronger Reference Criteria

`REF-PKT-SKU-009-VISUAL-INVARIANT-002` was generated to be more binding than the original reference by providing:

- explicit floor / wall plane relationship
- visible cove or wall / floor transition
- soft directional light
- clear shadow logic
- open architectural studio space
- minimal / no product-identity competition

That made the C-test a fair test of reference-image specificity.

## Observed Result

C-test outcome:

- Not supported

Observed result:

- the stronger URL reference surfaced correctly onto all three `PKT-SKU-009` slots
- slot prompts instructed the field agent to treat `packet_reference_asset_uri_lookup` as studio-world / family visual invariant
- the generated outputs did not materially inherit the reference image's floor / wall plane, cove transition, lighting direction, or shadow logic
- outputs remained in the same generic warm-neutral chair / product-image world as the `PKT-SKU-009` retry baseline
- PROFILE and DETAIL role separation remained usable, but that had already improved before the C-test and is not evidence that the stronger reference image worked
- product-truth drift remained visible, especially material / texture exaggeration

## Structural Finding

Prompt can reference a URL field != the model uses that URL as image-conditioned visual input.

The current URL-reference path appears to behave like weak textual / contextual guidance, not visual conditioning.

The blocker is probably not reference-image quality or specificity.

A stronger and more spatially specific URL reference did not materially improve binding.

This strengthens the need to inspect field-agent configuration / input weighting before escalating to Gate 2.

## PKT-SKU-008 Reinterpretation Ambiguity

This note does not revise PR #127 or retroactively change the `PKT-SKU-008` Supported finding.

The C-test does surface an open interpretive ambiguity about why `PKT-SKU-008` looked Supported.

Possible readings:

1. `PKT-SKU-008` URL reference did contribute, but with a ceiling.
2. `PKT-SKU-008` improvement may have been driven mostly by prompt-level shared invariants, while the URL reference acted weakly or inertly.
3. `PKT-SKU-008` may have been an easier packet where URL context was marginally sufficient but did not generalize.

This C-test does not distinguish among those readings.

It does prevent treating `PKT-SKU-008` Supported as final proof that the URL path is visually binding.

## Outcome Classification

This finding uses the pre-registered C-test outcome classes from the visual-reference binding diagnostic-order decision.

- Supported: not met.
- Partial: not met or only weakly met; role separation persisted, but the tested variable did not materially improve visual-reference binding.
- Not supported: met.
- Inconclusive: not the best label because the stronger reference surfaced correctly and visual evidence was sufficient to evaluate.

Final label:

- Not supported

## Next Diagnostic Direction

B-test is now the next diagnostic direction.

B-test should ask whether Airtable AI field-agent configuration / input weighting can make the URL reference act as a visual input rather than weak text / context.

Gate 2 is more strongly earned, but still not authorized.

If B-test is Not supported or unobservable, Gate 2 becomes the active candidate.

Product-truth drift remains orthogonal and should not be folded into Gate 2.

## Thesis Implication

Text-level shared invariants and URL-reference-as-context can carry some coherence. But visual-system binding - lighting direction, shadow behavior, spatial structure, floor / wall relation - appears to require either different field-agent behavior or a stronger image-bearing reference path. This supports the broader repo thesis that quality at scale depends on explicit information architecture, but also shows that not every surfaced field becomes a governing visual input.

## Non-Actions

This note does not authorize:

- further Airtable mutation
- schema mutation
- lookup-field creation
- AI field-agent configuration changes
- generation invocation
- `generated_assets` creation
- output-slot / generated-asset linking
- `slot_status` mutation
- production-readiness claims
- cross-mode generalization
- final D1 / D2 doctrine

## Evidence Attribution

Visual judgments are attributed to direct visual evidence surfaced in the control-surface thread.

Airtable metadata only verified record state and field-path surfacing.

No screenshots or generated images are committed to the repo by this findings note.
