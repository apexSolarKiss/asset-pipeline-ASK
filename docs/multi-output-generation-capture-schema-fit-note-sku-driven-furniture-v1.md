# Multi-Output Generation / Capture Schema-Fit Note // SKU-Driven Furniture v1

## Purpose

This note is a planning / readiness-assessment artifact only.

It exists to assess whether a future implementation path might be earned and what schema surface that future path would likely touch.

This note does **not** authorize implementation.
It does **not** authorize Airtable mutation.
It does **not** authorize schema creation.

The current decision note still holds:

- no implementation
- no Airtable mutation
- no schema creation

The existence of this schema-fit note does not itself fire a trigger.

The trigger has not fired merely because implementation-readiness has been assessed.

This is a new bridge artifact type:

- schema-fit assessment

It is not:

- a findings note
- an options note
- a decision note
- an implementation plan

## Current Evidence Posture

`PKT-SKU-007` remains the clean evidence source.

It was:

- a fresh product
- a fresh packet
- a clean first-pass run

It carried a three-view output burden:

- front three-quarter hero view
- profile / side supporting view
- detail crop focused on construction or material character

The actual result was:

- one image generated
- the profile / side supporting view was produced
- the hero and detail crop were missing

That preserves:

- `fresh-run counter-pressure`

The pressure is output-side representation and capture pressure.

One bounded run preserves structural pressure.

It does not authorize implementation.

## Provenance Discipline

This note distinguishes between two provenance sources.

First:

- repo-local schema/spec facts from `docs/airtable-base-spec-sku-driven-furniture-v1.md`

Second:

- live Airtable schema observations supplied through the external control-surface thread

Repo-local spec remains canonical repo-local truth.

Live Airtable observations are used here only as control-surface context.

They are not silently treated as canonical repo-local truth unless they are also present in repo-local docs.

If live Airtable shape appears to diverge from the repo-local Airtable spec, that is a separate provenance / reconciliation question.

This note does not silently absorb that divergence into schema-fit doctrine.

## Repo-Local Spec Facts

From `docs/airtable-base-spec-sku-driven-furniture-v1.md`, the repo-local v1 graph includes:

- `workflow_packets`
- `seam_runs`
- `generated_assets`
- `products`

The repo-local spec explicitly frames:

- `workflow_packets.required_output_set`
- one packet to many `generated_assets`
- one packet to many `seam_runs`
- `generated_assets.asset_key`
- `generated_assets.packet_key`
- `generated_assets.source_seam_run_key`
- `generated_assets.asset_role`
- `generated_assets.asset_uri`
- `generated_assets.governed_output_status`
- `generated_assets.review_artifact_flag`
- `seam_runs.seam_name`
- `seam_runs.status`
- `seam_runs.input_references`
- `seam_runs.output_references`
- `products.product_image` is **not** documented in the base spec excerpt read here as a declared core field, even though later execution artifacts clearly rely on product-image anchoring

Those are repo-local documentation facts.

## Live Airtable Context

The external control-surface thread reports that live Airtable currently has:

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

These observations are useful context for schema-fit assessment.

They do not automatically become repo-local truth.

## Provenance / Reconciliation Question

There appears to be at least some live-vs-spec divergence or under-documentation that should be kept explicit.

Examples include:

- live Airtable observations include `workflow_packets.live_generated_image_v1`, `workflow_packets.product_image_lookup`, and `workflow_packets.composed_prompt_output`, which are not part of the narrower repo-local base spec framing read here
- live Airtable observations include `generated_assets.governed_output_flag`, which is not part of the repo-local base spec field list read here
- live Airtable observations include explicit Airtable links on `workflow_packets` and `seam_runs` that are conceptually consistent with the spec graph, but not always spelled the same way as spec field lists
- execution artifacts rely on `products.product_image`, while the v1 base spec excerpt read here does not present it as an explicit `products` core field

That does **not** block this note.

But it does mean any future implementation move should first confirm whether repo-local spec and live Airtable shape are aligned, or whether a separate reconciliation artifact is needed.

## Key Conceptual Distinction

The key unresolved distinction is:

- expected output slot vs actual generated asset

Why this matters:

- expected output slot = obligation or planned output role before generation
- actual generated asset = captured result after generation
- one record type may or may not be able to carry both cleanly
- conflating them too early could create schema debt

This distinction is the core schema-fit question behind the multi-output generation / capture pressure.

## Interpretation 1

Reuse `generated_assets` as the future output-slot-like surface.

### What Schema Fit Looks Like

Under this interpretation, future implementation would try to reuse `generated_assets` without creating a new table.

The attraction is clear:

- `generated_assets` already sits adjacent to output capture
- it already carries `asset_key`
- it already carries `packet_key`
- it already carries `source_seam_run_key`
- it already carries `asset_role`
- it already carries `asset_uri`
- it already carries `governed_output_status`

That means `generated_assets` could plausibly become the surface where expected output roles and actual generated asset identity meet.

But the current shape appears asset-oriented, not necessarily expected-slot-oriented.

That is important.

An asset-oriented row starts from:

- something exists and has been captured

An expected-slot-oriented row starts from:

- something is owed whether or not it has yet been captured

Schema fit is therefore plausible here, but unresolved.

The note should preserve that ambiguity rather than collapsing it.

## Interpretation 2

Extend `generated_assets` later with slot-specific fields.

### What Schema Fit Looks Like

Under this interpretation, `generated_assets` would remain the reused surface, but future fields could make the expected-slot burden more explicit.

Candidate field concepts could include:

- expected role identifier
- slot fulfillment status
- capture status
- evaluation note surface
- role-level completeness marker

Those are candidate field concepts only.

They are not a field-creation proposal.

This interpretation would try to let one record type carry both:

- expected role burden
- actual captured asset state

That may fit if the overlap remains manageable.

It may fit less well if expected-slot lifecycle and actual-asset lifecycle start to diverge.

The schema-fit question here is therefore whether extension can preserve clarity without overloading `generated_assets` into a mixed obligation-plus-artifact record.

## Interpretation 3

Add a separate output_slots layer later.

### What Schema Fit Looks Like

Under this interpretation, a separate expected-slot table or layer would appear later if `generated_assets` should remain actual-asset records rather than expected-output obligations.

This would preserve a sharper distinction:

- expected output slots would carry what the packet owes
- generated assets would carry what generation actually produced

That separation may be cleaner if role expectation, slot status, and evaluation burden should exist before any asset is generated.

It may also be cleaner if one slot could later relate to:

- zero assets
- one captured asset
- multiple candidate assets across retries or evaluation paths

This remains the Option E-like escalation path.

It is not decided.

This note does not adopt it, rank it, or treat it as already earned.

It only records that schema fit may become cleaner under a separate layer if `generated_assets` should remain actual-asset records.

## Interpretation 4

Keep implementation held and run another bounded evidence test first.

### What Schema Fit Looks Like

Under this interpretation, schema fit remains intentionally provisional because no design-type trigger has fired.

This remains valid if the current state is:

- structural pressure exists
- implementation is still not earned
- no additional design trigger has yet forced slot-level representation

The schema-fit consequence is simple:

- adjacent schema surfaces already exist
- those surfaces may be enough to support a later design discussion
- no mutation is justified yet

This interpretation is still coherent because readiness assessment is not the same thing as trigger clearance.

## Readiness Surface Without Authorization

Even under a continued hold posture, the existing shape appears to contain adjacent surfaces that could support a future design discussion, especially:

- `workflow_packets.required_output_set`
- `workflow_packets.live_generated_image_v1` in live Airtable context
- `generated_assets`
- `seam_runs`

That does **not** mean implementation is ready.

It means the repo can now describe which surfaces a later implementation plan would likely need to touch if a trigger fires.

## Current Conclusion

- Airtable/schema implementation is still not earned.
- The existence of this schema-fit note does not fire a trigger.
- Existing Airtable shape contains adjacent surfaces that could support a future design, especially `generated_assets`.
- The key unresolved distinction is expected output slot versus actual generated asset.
- The note describes schema fit per interpretation but does not rank or choose among them.
- No mutation should occur until an evidence-type trigger fires through another bounded run, or a design-type trigger fires through downstream mapping/evaluation work.
- If implementation is later earned, the next artifact should be an implementation plan, not immediate schema mutation.
- If repo-local spec and live Airtable observations diverge, that should be handled as a separate reconciliation question before implementation.

## Out Of Scope

This note does not authorize:

- implementation
- Airtable mutation
- schema creation
- rerunning `PKT-SKU-003`
- rerunning `PKT-SKU-007`
- choosing a best-fit interpretation
- ranking the interpretations
- generalized output doctrine
- cross-mode conclusion
