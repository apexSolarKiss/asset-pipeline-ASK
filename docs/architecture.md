# Architecture

The goal of this repository is to define a structured information architecture for scalable visual asset production systems, with particular emphasis on how style guides, creative rules, and other governing constraints can become machine-usable normative structure for AI-native workflows.

At this stage, the correct architecture is the smallest honest architecture: enough structure to support disciplined design, but not so much structure that it hardens assumptions that have not yet earned permanence.

The architecture is intentionally high-level and leaves major design questions open, including:

- workflow taxonomy
- ontology for intent, inputs, constraints, orchestration, outputs, and governance
- where creative discretion enters
- where constraints bound that discretion
- where approvals and override points live
- how the system extends from still image to video
- how deterministic layers relate to agent-assisted layers

The repository is expected to support still-image workflows first. Video should be treated as an extension path, not as a reason to prematurely over-generalize the initial architecture.

The architectural task ahead is to define a model that can express normative intent and workflow governance without collapsing operational, creative, and approval concerns into a single undifferentiated layer.

## Current Working Model

Current working structure:

- three-layer model
  - universal schema
  - workflow-stream variants
  - brand-specific policy overlays

- universal schema
  - intent
    - business intent
    - creative intent
  - inputs
  - constraints
  - orchestration
  - outputs
  - governance

- tentative second-level directions
  - inputs -> source materials, supplied parameters, contextual instructions, and reference artifacts when they function as inputs
  - constraints -> hard requirements, constraint-bounded creative discretion, exclusion rules, and reference artifacts when they function as constraint carriers
  - governance -> validation, approval, override

This is the current working model, not a finalized ontology specification.

One useful way to keep that model small and legible is to treat the repository as a three-layer system:

- universal schema
- workflow-stream variants
- brand-specific policy overlays

The universal schema should define the stable conceptual structure shared across workflows. Workflow-stream variants should describe recurring differences in how that structure is realized across classes of work. Brand-specific policy overlays should remain a later layer for local policy and governance, not a replacement for the shared model.

Within that structure, the current universal schema recommendation is:

- intent
  - business intent
  - creative intent
- inputs
- constraints
- orchestration
- outputs
- governance

Business intent defines what the asset is meant to achieve. Creative intent defines how that purpose is meant to be expressed. Creative discretion should remain legible within the model, but as constraint-bounded creative discretion: scoped freedom shaped by intent, bounded by constraints, exercised through orchestration, and validated through governance rather than treated as unbounded free-form behavior. The framing of *constraint-bounded creative discretion* is developed in [From Brand Rules to Creative Discretion](https://atomicspacekitten.substack.com/p/from-brand-rules-to-creative-discretion); [The Creative Act of Selection](https://atomicspacekitten.substack.com/p/the-creative-act-of-selection) extends it to the curation seam where bounded creative discretion becomes operationally recordable.
The ordering of business intent and creative intent is descriptive, not yet a formal precedence rule, and any explicit tradeoff rule between them remains an open design question.
Partial second-level nesting is likely to emerge first under inputs, constraints, and governance. Orchestration and outputs remain intentionally flat for now. This is a tentative structural direction, not yet a finalized ontology specification.
Within that direction, inputs are currently trending toward source materials, supplied parameters, contextual instructions, and reference artifacts when those artifacts function mainly as inputs to later work, though that substructure also remains tentative rather than finalized.
Constraints are currently trending toward hard requirements, constraint-bounded creative discretion, exclusion rules, and reference artifacts when those artifacts function mainly as carriers of governing bounds, though that substructure also remains tentative rather than finalized.
Governance is currently trending toward validation, approval, and override, though that substructure also remains tentative rather than finalized.

That means the repository will need to clarify:

- what the system is intended to achieve
- what enters the system as an input
- what is treated as a governing constraint
- what is interpreted by deterministic orchestration
- what is delegated to agent-assisted interpretation or generation
- what exits the system as a governed output
- what governance applies at each decision boundary

Those decisions are not yet finalized. For now, the repository should preserve enough structure to make those questions explicit and debatable without implying that they are already solved.
Current `main` now pressure-tests the shared model across four worked-example workflow modes without hardening those modes into schema or taxonomy.

## Bounded Prototype State

For reading order across current, historical, and trigger-based docs, see [`docs/index.md`](index.md). That index is a navigation artifact, not architecture doctrine; linked docs remain authoritative for their subject matter.

The active SKU-driven Furniture v1 Airtable prototype has surfaced bounded concrete schema pressure around multi-output generation and capture. In that bounded prototype, `output_slots` now function as first-class expected output obligations, and slot-level generation has proven cleaner than packet-level generation for role-specific output production. `generated_assets` has been bounded as a promoted / captured review / governance / delivery layer, not as raw generation storage, and `slot_status` lifecycle has been decided for SKU-driven Furniture v1. Asset-family coherence / reuse / derivative pressure and `generated_assets` capture mechanics from raw slot attachments have been captured but remain unresolved.

These are bounded SKU-driven Furniture v1 findings and decisions, not generalized cross-mode doctrine. They do not establish production readiness, final schema doctrine, an asset-family or asset-applications schema, solved capture mechanics, or Airtable as the final system.

## Related Documents

- [`docs/index.md`](index.md): current reading-order map and docs navigation artifact
- [`docs/four-mode-truth-and-constraint-pressure-note.md`](four-mode-truth-and-constraint-pressure-note.md): current four-mode comparison across the repo's worked-example pressure surfaces
- [`docs/shared-vs-mode-weighted-pressure-note.md`](shared-vs-mode-weighted-pressure-note.md): current comparison of shared pressures, mode-weighted pressures, and still-unearned claims across the four worked-example modes
- [`docs/review-artifacts-optional-vs-load-bearing-note.md`](review-artifacts-optional-vs-load-bearing-note.md): current comparison of where review artifacts appear optional versus structurally load-bearing across the four worked-example modes
- [`docs/cross-mode-constraint-layering-note.md`](cross-mode-constraint-layering-note.md): current planning-level comparison of universal, workflow-mode, and brand-overlay constraint layering
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): current working layered-input model attempt across the four modes, anchored to the curation event as a first-class governance act
- [`docs/truth-pressure-across-workflow-modes-note.md`](truth-pressure-across-workflow-modes-note.md): current cross-mode comparison of the repo's strongest worked-example pressures
- [`docs/multi-output-slot-representation-structural-decision-note-sku-driven-furniture-v1.md`](multi-output-slot-representation-structural-decision-note-sku-driven-furniture-v1.md): bounded structural decision choosing first-class expected output slots
- [`docs/airtable-slot-level-generation-schema-fit-note-sku-driven-furniture-v1.md`](airtable-slot-level-generation-schema-fit-note-sku-driven-furniture-v1.md): bounded slot-level generation schema-fit and prototype finding
- [`docs/generated-assets-promotion-boundary-structural-decision-note-sku-driven-furniture-v1.md`](generated-assets-promotion-boundary-structural-decision-note-sku-driven-furniture-v1.md): bounded generated-assets promotion-boundary decision
- [`docs/output-slot-status-lifecycle-structural-decision-note-sku-driven-furniture-v1.md`](output-slot-status-lifecycle-structural-decision-note-sku-driven-furniture-v1.md): bounded output-slot status lifecycle decision
- [`docs/asset-family-coherence-and-reuse-pressure-note-sku-driven-furniture-v1.md`](asset-family-coherence-and-reuse-pressure-note-sku-driven-furniture-v1.md): bounded asset-family coherence, reuse, derivative, and capture-mechanics pressure
- [`docs/visual-invariant-anchor-refinement-note-sku-driven-furniture-v1.md`](visual-invariant-anchor-refinement-note-sku-driven-furniture-v1.md): visual invariant anchor refinement
- [`docs/multi-image-visual-reference-input-structural-decision-note-sku-driven-furniture-v1.md`](multi-image-visual-reference-input-structural-decision-note-sku-driven-furniture-v1.md): bounded multi-image / visual-reference input structural decision
- [`docs/visual-reference-input-schema-mutation-plan-sku-driven-furniture-v1.md`](visual-reference-input-schema-mutation-plan-sku-driven-furniture-v1.md): visual-reference input schema mutation plan
- [`docs/url-visual-reference-set-generation-findings-sku-driven-furniture-v1.md`](url-visual-reference-set-generation-findings-sku-driven-furniture-v1.md): URL visual-reference set generation findings
- [`docs/url-visual-reference-recurrence-findings-pkt-sku-009.md`](url-visual-reference-recurrence-findings-pkt-sku-009.md): `PKT-SKU-009` URL visual-reference recurrence findings
- [`docs/visual-reference-binding-diagnostic-order-structural-decision-note-sku-driven-furniture-v1.md`](visual-reference-binding-diagnostic-order-structural-decision-note-sku-driven-furniture-v1.md): visual-reference binding diagnostic-order decision
- [`docs/reference-image-specificity-c-test-findings-pkt-sku-009.md`](reference-image-specificity-c-test-findings-pkt-sku-009.md): `PKT-SKU-009` reference-image specificity C-test findings
- [`docs/field-agent-configuration-b-test-findings-pkt-sku-009.md`](field-agent-configuration-b-test-findings-pkt-sku-009.md): `PKT-SKU-009` field-agent configuration B-test findings
- [`docs/gate-2-image-bearing-reference-path-structural-decision-note-sku-driven-furniture-v1.md`](gate-2-image-bearing-reference-path-structural-decision-note-sku-driven-furniture-v1.md): Gate 2 image-bearing reference path structural decision
- [`docs/gate-2-image-bearing-reference-path-probe-plan-sku-driven-furniture-v1.md`](gate-2-image-bearing-reference-path-probe-plan-sku-driven-furniture-v1.md): Gate 2 image-bearing reference path probe plan
- [`docs/gate-2-image-bearing-reference-path-findings-pkt-sku-009.md`](gate-2-image-bearing-reference-path-findings-pkt-sku-009.md): `PKT-SKU-009` Gate 2 image-bearing reference path findings
- [`docs/capture-governance-next-path-structural-decision-note-sku-driven-furniture-v1.md`](capture-governance-next-path-structural-decision-note-sku-driven-furniture-v1.md): capture / governance next-path structural decision
- [`docs/capture-mechanics-plan-sku-driven-furniture-v1.md`](capture-mechanics-plan-sku-driven-furniture-v1.md): capture-mechanics plan
- [`docs/capture-mechanics-thin-bridge-findings-pkt-sku-009.md`](capture-mechanics-thin-bridge-findings-pkt-sku-009.md): `PKT-SKU-009` capture-mechanics thin-bridge findings
- [`docs/capture-mechanics-pause-and-document-structural-decision-note-sku-driven-furniture-v1.md`](capture-mechanics-pause-and-document-structural-decision-note-sku-driven-furniture-v1.md): capture-mechanics pause decision
- [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](curation-event-schema-mutation-sku-driven-furniture-v1.md): bounded schema mutation enriching `generated_assets` with curation-event provenance fields, anchored to the cross-mode v3 finding
- [`docs/curation-event-population-findings-pkt-sku-009.md`](curation-event-population-findings-pkt-sku-009.md): bounded backfill populating the four provenance fields on the PKT-SKU-009 HERO governed-asset record; resolves `source_attachment_id` writeback as Supported and narrows the milestone-5 blocker's scope
- [`docs/curation-event-population-findings-pkt-sku-007.md`](curation-event-population-findings-pkt-sku-007.md): parallel backfill on the two PKT-SKU-007 Gate 6 governed-asset rows; first cross-packet `capture_reason` enum-readiness analysis (recommends staying as text)
- [`docs/curation-event-agentic-test-findings-pkt-sku-009.md`](curation-event-agentic-test-findings-pkt-sku-009.md): first agentic-first curation event test on PKT-SKU-009 (HERO, PROFILE, DETAIL); forward provenance population Supported; meta-test articulates agentic curation as a delegation pattern
- [`docs/governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md`](governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md): bundled multiple-rows-per-slot resolution and `curation_pattern` field addition on PKT-SKU-009 (three agentic rows promoted to governed_output); forward promotion path Supported
- [`docs/governed-output-promotion-findings-pkt-sku-007.md`](governed-output-promotion-findings-pkt-sku-007.md): PKT-SKU-007 promotion completing the v1 evidence chain transition; surfaces `batch-output-no-curator-selection` as a third curation pattern beyond authorship-bearing and confirmation-bearing
- [`docs/curator-field-and-backfill-sku-driven-furniture-v1.md`](curator-field-and-backfill-sku-driven-furniture-v1.md): adds `curator` field on `generated_assets` and backfills four rows; closes the *by whom* axis of the curation event's structural provenance
- [`docs/curation-event-vision-based-agentic-test-findings-pkt-sku-009.md`](curation-event-vision-based-agentic-test-findings-pkt-sku-009.md): vision-based agentic curation test on PKT-SKU-009 with reference grounding and family coherence; REF-002 binding Supported in the most recent iteration; vision-based proper test converges with the metadata-based pick from #149; documents three vision-based delegation failure modes that required in-flight methodology correction
- [`docs/full-flow-evidence-synthesis-pkt-sku-009.md`](full-flow-evidence-synthesis-pkt-sku-009.md): full-flow architectural surface synthesis (Path C of three) — documents the already-executed end-to-end flow on PKT-SKU-009 and surfaces the human/agent surface boundary as load-bearing finding
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): coordinated fresh-generation full-flow on PKT-SKU-009 (Path A of three) — surfaces the implementation-vs-conceptual goal distinction for family coherence, refines the cross-mode model's family-coherence framing, introduces fifth `curation_pattern` value (`human-cross-round-authorship-bearing-curation`), reframes Path C's generation-invocation question as a tooling limitation
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): coordinated fresh-generation full-flow on a brand-new packet PKT-SKU-010 (Path B of three) — adds `asset_attachment` field, validates attachment-copy writeback, resolves milestone-5 thin-bridge limitation; closes the v1 sweep's full-flow item
- [`docs/verification-record-carrying-clarification.md`](verification-record-carrying-clarification.md): current clarification on what seam records must carry across the chain
- [`docs/seam-local-verification-boundary-note.md`](seam-local-verification-boundary-note.md): current clarification on later-seam verification responsibility
- [`docs/application/examples/placeholder-furniture-workflow-packet-example.md`](application/examples/placeholder-furniture-workflow-packet-example.md): current SKU-driven packet example
- [`docs/application/examples/placeholder-collection-merchandising-workflow-packet-example.md`](application/examples/placeholder-collection-merchandising-workflow-packet-example.md): current collection / merchandising packet example
- [`docs/application/examples/placeholder-marketing-message-driven-workflow-packet-example.md`](application/examples/placeholder-marketing-message-driven-workflow-packet-example.md): current marketing / message-driven packet example
- [`docs/application/examples/placeholder-campaign-workflow-packet-example.md`](application/examples/placeholder-campaign-workflow-packet-example.md): current campaign / editorial packet example
- [`docs/application/placeholder-furniture-style-spec-to-seam-chain-map.md`](application/placeholder-furniture-style-spec-to-seam-chain-map.md): current furniture bridge into the seam chain
- [`docs/application/placeholder-collection-merchandising-packet-to-seam-chain-map.md`](application/placeholder-collection-merchandising-packet-to-seam-chain-map.md): current collection / merchandising bridge into the seam chain
- [`docs/application/placeholder-marketing-message-driven-packet-to-seam-chain-map.md`](application/placeholder-marketing-message-driven-packet-to-seam-chain-map.md): current marketing / message-driven bridge into the seam chain
- [`docs/application/placeholder-campaign-packet-to-seam-chain-map.md`](application/placeholder-campaign-packet-to-seam-chain-map.md): current campaign / editorial bridge into the seam chain
