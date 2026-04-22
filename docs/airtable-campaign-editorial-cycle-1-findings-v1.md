# Airtable Campaign / Editorial Cycle 1 Findings v1

## Purpose Of This Cycle

This document records the first bounded campaign / editorial Airtable proof run executed against [docs/airtable-campaign-editorial-proof-plan-v1.md](/Users/ask/repos/asset-pipeline-ASK/docs/airtable-campaign-editorial-proof-plan-v1.md).

This was a Cycle-1-equivalent run for a second workflow mode. It was not a revision loop, contradiction test, governed-output automation pass, or schema/configuration change.

The purpose of the cycle was to test whether the current Airtable proof shape could carry one bounded campaign / editorial burden at all:

- one approved campaign direction
- one small branded story world
- one three-asset mini-family
- one hero asset plus two companion assets
- one side-by-side review board plus light annotation as explicit load-bearing review context
- one first-pass seam trail only:
  - `ingest_validation`
  - `transformation_check`
  - `output_validation`
  - `release_readiness`

## Pre-Registered Outcome Classes

This cycle was pre-registered against three narrow outcome classes:

- `findings-only`
  - the current proof shape carries the bounded campaign / editorial burden far enough to generate interpretable first-pass findings without requiring schema/configuration change
- `spec-earned pressure`
  - the current proof shape reveals a localized structural burden specific enough to justify later options/decision discussion, but not implementation in this pass
- `insufficient evidence`
  - the run does not produce clean enough evidence to distinguish whether the burden belongs to mode structure, execution capture, review-artifact thinness, or some other confounder

## Concrete Bounded Proof Instance Chosen

The concrete proof instance chosen for this run was:

- packet record: `PKT-CAMP-001`
- subject anchor: existing product `SKU-CHAIR-002`
- planned hero asset: `campaign_hero_landing_v1`
- planned companion assets:
  - `campaign_promo_crop_v1`
  - `campaign_supporting_variant_v1`
- planned review-board artifact: `campaign-review-board-v1`
- planned annotation/review-note layer: `campaign-annotation-layer-v1`

This kept the proof inside current packet logic while still testing a campaign / editorial family burden rather than another SKU-only burden.

## Observable Base State

At the start of execution, `main` already established the bounded campaign / editorial proof plan and the SKU-driven Furniture v1 findings chain.

During the live Airtable run, the following campaign/editorial base state was achieved:

- `PKT-CAMP-001` was created in `workflow_packets`
- `PKT-CAMP-001` was linked to `SKU-CHAIR-002`
- `PKT-CAMP-001.business_intent` was populated with a bounded campaign/editorial mini-family intent
- one campaign-family coherence rule, `CR-CAMP-001`, was created in `constraint_rules`
- `CR-CAMP-001` was captured as:
  - `scope_type`: `brand_context`
  - `scope_value`: `early_autumn_reset`
  - `rule_type`: `presentation_rule`
  - `priority`: `1`
  - `active_status`: `active`

The planned review-board artifact, annotation layer, reference records, generated assets, review-gate record, and seam-run chain were not completed cleanly in the live base during this pass.

## What Was Tested

This cycle tested whether the current Airtable proof surface could even reach a clean first-pass declaration-and-seam setup for a bounded campaign / editorial mini-family without pre-adjustment.

More specifically, the cycle tested whether the current packet logic could carry:

- a campaign-family burden rather than a single-output SKU burden
- review-board context as load-bearing rather than merely optional
- a three-asset coherence question rather than a single-item truth question

## What Worked

Several things did work cleanly before the run broke down:

- the current Airtable base did accept a second-mode packet record without any schema change
- the proof could still anchor the mode test on an existing governed product record
- the packet-level surface was sufficient to declare the campaign/editorial intent in bounded form
- one campaign/editorial family-coherence rule could be captured cleanly as an explicit live record

That means the first visible break was not graph inadequacy.

## What Failed

The run did not proceed to a clean bounded seam trail.

After `CR-CAMP-001` was created successfully, the next campaign rule capture did not remain stable under live grid entry. The attempted output-requirement record for the campaign/review-board burden, `CR-CAMP-002`, did not land cleanly as one interpretable record. Grid entry behavior began to shift values across cells inconsistently enough that the rule surface stopped being trustworthy as live evidence.

The first dominant confound was unstable live Airtable grid-entry behavior during rule capture, not a cleanly established campaign/editorial structural failure.

Because that break happened before the planned review-board artifact, companion-asset burden, and first seam-run chain were all carried into the base, this pass did not yield a clean execution record of:

1. packet declaration
2. campaign rule declaration
3. review-board burden declaration
4. first-pass seam progression
5. release-readiness evidence

No clean campaign/editorial seam-run chain was created in `seam_runs` during this pass.

## Where Meaning Became Ambiguous

Meaning became ambiguous first at execution capture and live entry stability, not at mode structure.

The live break does not cleanly show that campaign / editorial burden itself exceeded the current packet-and-seam shape.

It also does not cleanly show that review-board burden is structurally uncarriable.

Only after that execution-capture instability does any possible mode-structure question enter interpretation.

What the run does show is narrower:

- one second-mode packet could be declared
- one campaign-family rule could be captured
- the run then became confounded by unstable live record-entry behavior before the bounded proof chain was fully materialized

That leaves the cycle unable to separate:

- true campaign/editorial structural pressure
- live execution-capture fragility
- thin review-artifact declaration
- browser/grid-entry confound

## How The Review Board Functioned

The review board did not function as load-bearing context in the live base during this pass, because the run broke before the review-board artifact and annotation layer were cleanly declared.

That means this cycle did not prove that review-board burden is either:

- well-carried by the current proof shape
- or structurally under-served by it

The evidence stopped earlier than that.

## How The Burden Differed From SKU-Driven Furniture v1 In This Attempt

The different burden became visible at the level of declared intent and attempted proof shape, not as a strong empirical result carried through the live base.

Relative to SKU-driven Furniture v1, this attempt was framed around:

- family coherence across multiple planned assets
- explicit campaign-direction framing
- approval-facing review context that could not honestly stay implicit

That difference was visible in what the proof tried to declare, but the pass did not carry far enough through the live base to support a stronger empirical claim about how campaign/editorial burden behaves in practice on the current Airtable surface.

## Result Classification

This cycle earns:

- `insufficient evidence`

That is the smallest honest reading because the run did not produce clean enough evidence to distinguish whether the observed break belongs to:

- mode structure
- execution capture
- review-artifact thinness
- or another confound in the live entry surface

This cycle therefore does **not** earn:

- `findings-only`
- `spec-earned pressure`

## Why `Insufficient Evidence` Is The Smallest Honest Reading

The cycle made real live progress:

- one packet was created
- one campaign/editorial rule was created
- the second-mode burden was at least partially localized in the live base

But it did not produce a trustworthy bounded first-pass proof run.

Because the evidence broke before a clean review-board declaration and before any seam-run chain was materialized, any stronger claim would over-attribute the failure to campaign/editorial structure itself.

## Explicitly Out Of Scope After This Cycle

This findings artifact does not authorize:

- schema revision
- Airtable configuration revision
- governed output automation
- multi-packet campaign systems
- generalized approval-system design
- prompt-artifact continuity reopen
- generalized second-mode rollout

It also does not convert this incomplete cycle into a broader diagnosis about campaign/editorial mode in general.
