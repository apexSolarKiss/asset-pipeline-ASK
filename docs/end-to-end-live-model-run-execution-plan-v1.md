# End-To-End Live Model Run Execution Plan v1

## Purpose

This document translates the already-landed end-to-end live model run planning doc into one bounded execution plan for the first live attempt.

Its purpose is to define one concrete first-run shape that can later be executed in a way that preserves interpretable attribution across:

- declared packet burden
- Airtable-native invocation
- generated candidate artifact capture
- governed-output sufficiency judgment
- release-readiness judgment

This is not execution. It does not authorize Airtable mutation, model invocation, schema/configuration change, code change, or immediate live running.

## Relationship To Governing Artifacts

This execution plan should be read together with:

- `docs/end-to-end-live-model-run-plan-v1.md`
- `docs/first-live-run-invocation-surface-decision-note-v1.md`
- `docs/airtable-base-spec-sku-driven-furniture-v1.md`
- `docs/airtable-cycle-4-prompt-artifact-continuity-decision-note-sku-driven-furniture-v1.md`

The governing planning doc remains authoritative on:

- why one bounded live run is now the honest next move
- why `SKU-driven Furniture v1` remains the right first mode
- the governing definition of candidate output versus governed output
- the pre-registered outcome classes

The invocation-surface decision note is now authoritative on one specific point:

- the first bounded live run should proceed through Airtable-native invocation

This execution plan therefore does **not** reopen the invocation-surface gate.

The Cycle 4 prompt-artifact continuity decision note also remains in force:

- prompt-artifact continuity remains on hold
- this first live run stays first-pass-only
- this plan does not require a second authoritative prompt field

## Pre-Registered Outcome Classes

This execution plan carries forward the same three outcome classes from the governing planning doc.

### `findings-only`

`findings-only` is earned if:

- Airtable-native invocation is explicitly named as the execution surface
- the Airtable write surface is explicitly named
- one bounded SKU packet is carried through the first-pass seam trail
- one or more candidate artifacts are captured as stable inspectable references
- the result is interpretable without requiring schema/configuration change or broader runtime redesign

### `spec-earned pressure`

`spec-earned pressure` is earned only if the live run surfaces a localized burden specific enough to justify later options or decision discussion.

Operationally, that means the burden must localize clearly enough that the repo can say where the current execution shape stopped being honest, without confusing:

- model behavior
- capture behavior
- packet-local composition behavior
- or seam-definition ambiguity

### `insufficient evidence`

`insufficient evidence` is earned if opacity or capture failure prevents honest seam-level interpretation.

Operationally, this includes cases where:

- the actual prompt used cannot be preserved cleanly through `workflow_packets.composed_prompt_output`
- the generated image is not preserved as a stable inspectable artifact
- the capture path is too thin to tie candidate output back to packet and transformation pass
- the Airtable-native run returns too little inspectable evidence to distinguish candidate existence from governed sufficiency
- multiple confounders are active at once and no narrow reading is honest

## Concrete Commitments

### Concrete Packet

The first live run should use one newly declared bounded packet:

- `workflow_packets / PKT-SKU-005`

This packet is pre-registered as the live-run packet so the first end-to-end attempt does not inherit contradiction-specific baggage from `PKT-SKU-004` and does not need to rely on any earlier cycle packet whose burden was shaped for a different proof question.

Bounded declared contents for `PKT-SKU-005`:

- linked product: `SKU-CHAIR-002`
- burden class: one governed hero still image only
- packet status at declaration: `ready_for_ingest`
- business intent: one bounded hero asset for SKU-driven furniture presentation
- creative intent: clear, faithful hero presentation subordinate to product truth
- constraint keys:
  - `CR3-BRAND-001`
  - `CR3-CAT-CHAIR-001`
  - `CR3-PCLASS-001`
  - `CR3-SKU-TRUTH-001`
  - `CR3-SKU-FINISH-001`
- excluded constraint key:
  - `CR3-TENSION-001`
- approved reference keys:
  - `REF3-SUPPORT-001`
  - `REF3-SUPPORT-002`
  - `REF3-DIRECTION-001`
  - `REF3-DIRECTION-002`
- excluded approved reference key:
  - `REF4-DIRECTION-001`
- bounded creative discretion: composition, crop, angle, lighting, and staging may vary only within the packet's carried product-truth and rule burden
- required output set: one bounded hero still image only

This is a new packet key, not a schema change.

### Concrete Model

The image-generation model for the first Airtable-native run should be pre-registered in this plan as:

- `gpt-image-1`

This is a bounded first-run commitment for the later execution artifact, not a broader model-selection doctrine.

### Concrete Generation Parameters

Only parameters that are already relevant to the current Airtable-native path should be pre-committed here.

Pre-committed first-run parameters:

- model: `gpt-image-1`
- prompt source: `workflow_packets.composed_prompt_output` consumed through one single-field-reference path or the closest native equivalent supported by the provisioned Airtable-native invocation surface
- image input source: one supporting product image reference associated with `PKT-SKU-005`

No additional generation toggles are pre-registered in this plan.

If the provisioned Airtable-native invocation surface exposes additional optional controls during execution, those controls should remain unset for this first run unless they are already part of that same native surface and can be named explicitly in the later findings artifact without widening the plan.

### Composed-Prompt Recipe

The authoritative composed prompt for the first live run should live in:

- `workflow_packets.composed_prompt_output`

The packet-local notes field remains:

- `workflow_packets.prompt_composition_notes`

That notes field should either:

- be populated with non-authoritative composition notes if there is composition ambiguity worth preserving before execution
- or be left blank

It should not be treated as a second authoritative prompt field in this first-pass-only run.

The composed prompt should be built from the following already-earned packet-local inputs:

- linked product truth from `products` for `SKU-CHAIR-002`
- linked active constraint burden from `workflow_packets.constraint_keys`
- linked approved references from `workflow_packets.approved_reference_keys`
- `workflow_packets.business_intent`
- `workflow_packets.creative_intent`
- `workflow_packets.bounded_creative_discretion`
- `workflow_packets.required_output_set`

The composition instruction pattern should remain narrow and interpretable:

- preserve product-defining silhouette, finish, and identifying details first
- preserve scoped rules explicitly rather than flattening them into generic style language
- preserve reference-role distinctions rather than treating all references as equal directional mood
- preserve bounded creative discretion as subordinate freedom, not as override authority
- preserve the one-item hero-output burden explicitly

The Airtable-native invocation instructions should then resolve from:

- one direct reference to `workflow_packets.composed_prompt_output`, or the closest native equivalent single-field-reference path honestly supported by the provisioned invocation surface

### Image-Gen Field Inputs

The concrete product-image input source for the first run should be:

- one supporting product-truth image already linked into `PKT-SKU-005` through `approved_reference_keys`

The concrete first-run reference posture should remain:

- one product-truth supporting input used as the image input
- any additional linked approved references used only as carried prompt burden inside `composed_prompt_output`

No unsupported extra input field, no second prompt field, and no new configuration surface should be invented for this first run.

### Asset-Capture Mechanics

The owned Airtable base remains the canonical packet, seam, and evidence surface for this first run.

The generated image should therefore be produced through the Airtable-native invocation surface used for the run, then captured back into that canonical evidence surface.

For later seam interpretation, that artifact must then be preserved as one persistent inspectable asset reference associated with the live run.

The execution artifact should preserve:

- the Airtable-visible generated image artifact itself
- one stable reference to that artifact carried into `generated_assets`
- the packet association
- the source transformation seam-run association

The current base shape already supports:

- `generated_assets.asset_uri`

For this first run, `generated_assets.asset_uri` should therefore carry the stable inspectable reference actually available from the Airtable-native generation result.

If the Airtable-native surface yields an attachment-like artifact rather than a traditional external URL, the later execution artifact should still record the effective stable inspectable reference in `generated_assets.asset_uri` or the closest already-supported equivalent representation without adding schema.

This execution plan does not claim that the exact native Airtable image-generation container has already been fully verified in repo-local truth.

If this plan does not already name that exact native container honestly, the later findings artifact must explicitly name the concrete Airtable-native invocation container actually used.

Transient-only output is insufficient for this run.

### Airtable Write Surface For Capture

The Airtable write surface for the later live run should be:

- `GPT Airtable connector`

This is the control surface that should write:

- `seam_runs`
- `generated_assets`
- `review_gates`

This plan does not widen that requirement into broader control-surface doctrine.

### Concrete Key Naming Scheme

The first live run should use the following pre-registered key scheme:

- packet: `PKT-SKU-005`
- ingest seam run: `SR-LIVE-SKU-INGEST-001`
- transformation seam run: `SR-LIVE-SKU-TRANSFORM-001`
- output-validation seam run: `SR-LIVE-SKU-OUTPUT-001`
- release-readiness seam run: `SR-LIVE-SKU-RELEASE-001`
- candidate asset: `sku_live_hero_candidate_v1`
- review gate: `GATE-LIVE-SKU-001`

These are run-local identifiers only. They do not imply a broader naming-system redesign.

### Partial-Failure Handling

This first run must:

- stop on first seam failure
- record that seam as `failed`
- not retry
- not open a second pass
- not silently substitute another invocation path

If first failure occurs, the run should stop at that failed seam and preserve the resulting partial evidence inside the owned Airtable base rather than attempting recovery inside the same run.

## Seam-By-Seam Execution Sequence

### `ingest_validation`

The first seam should create:

- `seam_runs / SR-LIVE-SKU-INGEST-001`

The seam should link:

- `SR-LIVE-SKU-INGEST-001 -> workflow_packets / PKT-SKU-005`

The seam should populate at minimum:

- `seam_runs.seam_run_key = SR-LIVE-SKU-INGEST-001`
- `seam_runs.packet_key = PKT-SKU-005`
- `seam_runs.seam_name = ingest_validation`
- `seam_runs.status = completed` if the packet burden is present and usable, otherwise `failed`
- `seam_runs.input_references` with the linked product, linked constraints, linked approved references, and the packet-local prompt-bearing field location
- `seam_runs.output_references` with a narrow statement that the packet is cleared for one Airtable-native transformation pass
- `seam_runs.notes` with any seam-local declaration about packet sufficiency or packet-local blockers

`ingest_validation` should also confirm before later execution proceeds:

- `PKT-SKU-005` is linked to `SKU-CHAIR-002`
- `workflow_packets.composed_prompt_output` is populated
- the packet remains one-item, first-pass-only, hero-only burden

### `transformation_check`

The second seam should create:

- `seam_runs / SR-LIVE-SKU-TRANSFORM-001`
- `generated_assets / sku_live_hero_candidate_v1`

The seam should link:

- `SR-LIVE-SKU-TRANSFORM-001 -> workflow_packets / PKT-SKU-005`
- `sku_live_hero_candidate_v1 -> workflow_packets / PKT-SKU-005`
- `sku_live_hero_candidate_v1 -> seam_runs / SR-LIVE-SKU-TRANSFORM-001`

The transformation seam should populate at minimum:

- `seam_runs.seam_run_key = SR-LIVE-SKU-TRANSFORM-001`
- `seam_runs.packet_key = PKT-SKU-005`
- `seam_runs.seam_name = transformation_check`
- `seam_runs.status = completed` if the Airtable-native invocation returns an inspectable generated artifact, otherwise `failed`
- `seam_runs.input_references` naming `workflow_packets.composed_prompt_output`, the linked product-truth image input, the model name `gpt-image-1`, and the Airtable-native invocation surface
- `seam_runs.output_references` naming the candidate asset key and its stable inspectable reference
- `seam_runs.notes` naming that this was one first-pass-only Airtable-native generation attempt

The candidate asset record should populate at minimum:

- `generated_assets.asset_key = sku_live_hero_candidate_v1`
- `generated_assets.packet_key = PKT-SKU-005`
- `generated_assets.source_seam_run_key = SR-LIVE-SKU-TRANSFORM-001`
- `generated_assets.asset_role = hero_candidate`
- `generated_assets.asset_uri =` the stable inspectable reference actually yielded by the Airtable-native generation result
- `generated_assets.governed_output_status = candidate`
- `generated_assets.review_artifact_flag = unchecked`

No second transformation seam run should be created in this first execution plan.

### `output_validation`

The third seam should create:

- `seam_runs / SR-LIVE-SKU-OUTPUT-001`

The seam should link:

- `SR-LIVE-SKU-OUTPUT-001 -> workflow_packets / PKT-SKU-005`
- `SR-LIVE-SKU-OUTPUT-001 -> generated_assets / sku_live_hero_candidate_v1` through `output_references`

The seam should populate at minimum:

- `seam_runs.seam_run_key = SR-LIVE-SKU-OUTPUT-001`
- `seam_runs.packet_key = PKT-SKU-005`
- `seam_runs.seam_name = output_validation`
- `seam_runs.status = completed` if an honest judgment can be recorded, otherwise `failed`
- `seam_runs.input_references` naming the candidate asset and the packet-local burden it is being judged against
- `seam_runs.output_references` naming the same candidate asset and the resulting sufficiency judgment
- `seam_runs.notes` capturing the narrow evaluation result

At this seam, `generated_assets / sku_live_hero_candidate_v1` should be updated to one of:

- `generated_assets.governed_output_status = governed_output`
- `generated_assets.governed_output_status = rejected`

This seam must preserve the distinction between:

- candidate artifact existence
- governed-output sufficiency

### `release_readiness`

The fourth seam should create:

- `seam_runs / SR-LIVE-SKU-RELEASE-001`
- `review_gates / GATE-LIVE-SKU-001`

The seam should link:

- `SR-LIVE-SKU-RELEASE-001 -> workflow_packets / PKT-SKU-005`
- `GATE-LIVE-SKU-001 -> workflow_packets / PKT-SKU-005`
- `GATE-LIVE-SKU-001 -> seam_runs / SR-LIVE-SKU-RELEASE-001`

The release-readiness seam should populate at minimum:

- `seam_runs.seam_run_key = SR-LIVE-SKU-RELEASE-001`
- `seam_runs.packet_key = PKT-SKU-005`
- `seam_runs.seam_name = release_readiness`
- `seam_runs.status = completed` if the bounded result is coherent enough to present for approval-facing review, otherwise `failed`
- `seam_runs.input_references` naming the output-validation result and the candidate or governed asset under review
- `seam_runs.output_references` naming `GATE-LIVE-SKU-001`
- `seam_runs.notes` capturing why the result is or is not ready for review

The gate record should populate at minimum:

- `review_gates.gate_key = GATE-LIVE-SKU-001`
- `review_gates.packet_key = PKT-SKU-005`
- `review_gates.release_readiness_run_key = SR-LIVE-SKU-RELEASE-001`
- `review_gates.gate_status = ready_for_review` if release readiness passes, otherwise `not_ready`
- `review_gates.gate_notes` with narrow approval-facing context
- `review_gates.review_board_reference =` left blank unless a concrete review destination actually exists for this first run

This seam remains readiness to present for approval-facing review, not approval itself.

## Pre-Registered Evaluation Criteria At `output_validation`

`output_validation` should ask the following narrow questions in order.

### Candidate Existence

- Did the Airtable-native invocation produce at least one real still-image artifact for `PKT-SKU-005`?
- Is that artifact preserved as a stable inspectable reference rather than only as transient UI output?
- Is the artifact tied cleanly to `SR-LIVE-SKU-TRANSFORM-001` and `PKT-SKU-005`?

If the answer is no at this layer, the run has candidate-existence failure before it reaches governed sufficiency.

### Governed Sufficiency

- Does the candidate remain legible as `SKU-CHAIR-002` rather than as a generic furniture approximation?
- Do product-defining silhouette, finish, and identifying details remain sufficiently intact for a SKU-driven hero use?
- Does the image remain within the packet's bounded rule burden rather than drifting into contradiction or loose aesthetic interpretation?
- Does the image satisfy the packet's one-item hero-output burden cleanly enough to count as a governed output for this first proof?

Passing governed sufficiency for this run does **not** mean:

- broader production readiness
- repeatability across later runs
- batch stability
- general model adequacy

It means only that at least one candidate artifact remains governable enough to proceed to bounded release-readiness review for this first proof.

## Pre-Registered Findings Artifact

If execution later occurs, the intended findings artifact path should be:

- `docs/end-to-end-live-model-run-findings-sku-driven-furniture-v1.md`

That later findings artifact should explicitly name at minimum:

- `PKT-SKU-005`
- `SKU-CHAIR-002`
- `gpt-image-1`
- `GPT Airtable connector`
- `SR-LIVE-SKU-INGEST-001`
- `SR-LIVE-SKU-TRANSFORM-001`
- `SR-LIVE-SKU-OUTPUT-001`
- `SR-LIVE-SKU-RELEASE-001`
- `sku_live_hero_candidate_v1`
- `GATE-LIVE-SKU-001`
- the final pre-registered outcome class

## Explicitly Out Of Scope

This execution-plan update does not authorize:

- immediate live execution
- Airtable mutation
- model invocation
- schema revision
- Airtable configuration revision
- code or test changes
- automation setup
- a second pass or revision loop
- contradiction stress
- prompt-artifact continuity reopen
- broader runtime/orchestration architecture
- generalized model-routing doctrine
- any claim that Airtable-native invocation is permanent doctrine

It also does not authorize widening this first run beyond one bounded packet, one first transformation pass, one candidate hero asset, and one bounded release-readiness check.
