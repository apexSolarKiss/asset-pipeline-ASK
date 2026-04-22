# Airtable Campaign / Editorial Cycle 1 Rerun Findings v1

Live Airtable write surface: GPT Airtable connector

## Purpose Of The Rerun

This document records a clean re-attempt of the same bounded campaign / editorial Airtable proof defined in [docs/airtable-campaign-editorial-proof-plan-v1.md](/Users/ask/repos/asset-pipeline-ASK/docs/airtable-campaign-editorial-proof-plan-v1.md).

This was not a new cycle shape. It was a rerun of the same Cycle-1-equivalent proof with tighter execution capture discipline.

The purpose of the rerun was to determine whether the bounded campaign / editorial proof shape could carry cleanly when the live Airtable entry sequence remained interpretable.

## Explicit Rerun Status

This artifact should be read as a re-attempt of the same bounded proof already recorded in [docs/airtable-campaign-editorial-cycle-1-findings-v1.md](/Users/ask/repos/asset-pipeline-ASK/docs/airtable-campaign-editorial-cycle-1-findings-v1.md).

The proof shape did not change between attempts:

- one approved campaign direction
- one small branded story world
- one three-asset mini-family
- one hero asset plus two companion assets
- one side-by-side review board plus light annotation as load-bearing review context
- one first-pass seam trail only:
  - `ingest_validation`
  - `transformation_check`
  - `output_validation`
  - `release_readiness`

## Pre-Registered Outcome Classes

This rerun used the same narrow outcome classes as the first attempt:

- `findings-only`
  - the current proof shape carries the bounded campaign / editorial burden far enough to generate interpretable first-pass findings without requiring schema/configuration change
- `spec-earned pressure`
  - the current proof shape reveals a localized structural burden specific enough to justify later options/decision discussion, but not implementation in this pass
- `insufficient evidence`
  - the run does not produce clean enough evidence to distinguish whether the burden belongs to mode structure, execution capture, review-artifact thinness, or some other confounder

## Concrete Proof Instance Used

The rerun reused the same bounded proof instance:

- packet record: `PKT-CAMP-001`
- subject anchor: existing product `SKU-CHAIR-002`
- hero asset: `campaign_hero_landing_v1`
- companion assets:
  - `campaign_promo_crop_v1`
  - `campaign_supporting_variant_v1`
- review-board artifact: `campaign-review-board-v1`
- annotation / review-note layer: `campaign-annotation-layer-v1`

This kept the rerun inside the already-declared campaign / editorial proof shape rather than widening the proof or introducing a new packet burden.

## Observable Base State Entering The Rerun

At the start of the rerun, the live base already contained the earlier incomplete campaign / editorial proof state:

- `workflow_packets / PKT-CAMP-001`
- `constraint_rules / CR-CAMP-001`

That prior state represented a partial declaration, not a completed bounded proof chain.

The rerun entered with the same bounded scenario still in view, but with the live-entry residue from the interrupted attempt removed before the clean re-attempt proceeded.

## What Was Tested

The rerun tested whether the current Airtable proof surface could carry the same bounded campaign / editorial burden cleanly when execution capture remained disciplined.

More specifically, it tested whether one packet-centered proof could now carry:

- campaign-family burden across one hero asset and two companion assets
- one explicit directional reference
- one explicit output-requirement rule for family-ready deliverables
- one review board plus light annotation as load-bearing review context
- one complete first-pass seam trail from declaration through release readiness

## What Worked

This rerun carried the bounded proof shape cleanly enough to complete the intended first-pass chain.

Created during the rerun:

- `constraint_rules / CR-CAMP-002`
- `reference_assets / REF-CAMP-DIRECTION-001`
- `seam_runs / SR-CAMP-INGEST-001`
- `seam_runs / SR-CAMP-TRANSFORM-001`
- `seam_runs / SR-CAMP-OUTPUT-001`
- `seam_runs / SR-CAMP-RELEASE-001`
- `generated_assets / campaign_hero_landing_v1`
- `generated_assets / campaign_promo_crop_v1`
- `generated_assets / campaign_supporting_variant_v1`
- `generated_assets / campaign-review-board-v1`
- `generated_assets / campaign-annotation-layer-v1`
- `review_gates / GATE-CAMP-001`

Updated during the rerun:

- `workflow_packets / PKT-CAMP-001`
- `constraint_rules / CR-CAMP-001`

The packet surface now carried the bounded proof chain coherently:

- `SKU-CHAIR-002`
- `CR-CAMP-001`
- `CR-CAMP-002`
- `REF-CAMP-DIRECTION-001`
- `SR-CAMP-INGEST-001`
- `SR-CAMP-TRANSFORM-001`
- `SR-CAMP-OUTPUT-001`
- `SR-CAMP-RELEASE-001`
- `campaign_hero_landing_v1`
- `campaign_promo_crop_v1`
- `campaign_supporting_variant_v1`
- `campaign-review-board-v1`
- `campaign-annotation-layer-v1`
- `GATE-CAMP-001`

Additional clean links were also present:

- `CR-CAMP-001 -> PKT-CAMP-001`
- `CR-CAMP-002 -> PKT-CAMP-001`
- `REF-CAMP-DIRECTION-001 -> PKT-CAMP-001`
- `SR-CAMP-TRANSFORM-001 -> campaign_hero_landing_v1, campaign_promo_crop_v1, campaign_supporting_variant_v1`
- `SR-CAMP-OUTPUT-001 -> campaign-review-board-v1, campaign-annotation-layer-v1`
- `SR-CAMP-RELEASE-001 -> GATE-CAMP-001`
- `GATE-CAMP-001 -> PKT-CAMP-001`
- `GATE-CAMP-001 -> SR-CAMP-RELEASE-001`

The most important narrow result is that the proof shape did carry a bounded campaign / editorial family burden through a clean first-pass seam trail once the entry sequence remained stable.

## What Failed

No new structural failure was surfaced inside this rerun.

That does not mean campaign / editorial mode is now fully validated for broader future work. It means only that this bounded Cycle-1-equivalent proof did not surface a new blocker once the live entry sequence was carried cleanly.

## Whether Execution Capture Was Materially Cleaner

Yes.

Execution capture was materially cleaner than the first attempt.

The first attempt broke during rule capture before the review-board burden and seam trail could be carried as trustworthy evidence. In this rerun, the same proof shape was captured without that earlier live-entry instability dominating interpretation.

That cleaner capture is enough to change the smallest honest reading of the proof result.

## How The Review Board Functioned

In this rerun, the review board did function as load-bearing context.

The bounded proof did not rely only on isolated output records. It carried:

- `campaign-review-board-v1`
- `campaign-annotation-layer-v1`

through `SR-CAMP-OUTPUT-001`, and that output-layer review context remained legible all the way to `SR-CAMP-RELEASE-001` and `GATE-CAMP-001`.

That is the narrow campaign/editorial result earned here: for this bounded mini-family proof, reviewable side-by-side context was not merely optional support. It functioned as part of the carried readiness burden.

## How The Burden Differed From SKU-Driven Furniture v1 In Practice

With the proof now carried cleanly, the practical difference from SKU-driven Furniture v1 is clearer than it was in the interrupted first attempt.

SKU-driven Furniture v1 placed its primary burden on single-item truth, faithful product carry-through, and repeatable output sufficiency.

This campaign / editorial rerun placed its primary burden on:

- family coherence across multiple assets
- bounded directional consistency across hero and companion outputs
- review-board visibility as part of readiness-supporting evidence

That remains a bounded mode difference, not a claim that campaign / editorial needs a separate architecture or that all future campaign/editorial work will behave the same way.

## Result Classification

This rerun earns:

- `findings-only`

## Why `Findings-Only` Is The Smallest Honest Reading

`findings-only` is the smallest honest reading because:

- the same bounded proof shape carried cleanly when execution capture was disciplined
- the rerun produced interpretable first-pass evidence without requiring schema/configuration change
- the earlier failed attempt should not be over-read as campaign/editorial structural failure
- no new localized structural burden was surfaced that would justify a new options or decision discussion from this rerun alone

This rerun therefore does **not** earn:

- a schema revision
- an Airtable configuration revision
- a new structural-pressure note
- a generalized second-mode claim

## Where Meaning Remains Bounded

This rerun is still only one bounded second-mode proof.

It does not establish:

- that all campaign / editorial burdens are now covered by the current proof shape
- that later campaign-family stress, contradiction pressure, or revision loops will behave the same way
- that review-artifact burden is fully solved across broader approval surfaces

It does establish something narrower:

- one bounded campaign / editorial Cycle-1-equivalent proof can be carried cleanly on the current Airtable surface

## Explicitly Out Of Scope After The Rerun

This findings artifact does not authorize:

- schema revision
- Airtable configuration revision
- governed output automation
- multi-packet campaign systems
- generalized approval-system design
- prompt-artifact continuity reopen
- generalized second-mode rollout

It also does not convert this rerun into a broader validation claim about all future campaign / editorial work.
