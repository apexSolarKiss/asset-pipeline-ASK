![asset-pipeline-ASK banner](asset-pipeline-ASK-banner.jpg)

# asset-pipeline-ASK

This repository is an open-source scaffold for turning brand style guides, creative rules, and workflow constraints into a machine-usable normative structure for AI-native visual asset production workflows.

It is being developed from first principles to support normative intent, workflow governance, and scalable asset production across multiple workflow classes.

Current working workflow modes include:

- SKU-driven product imagery
- collection / merchandising context
- marketing / message-driven workflows
- brand campaign / editorial workflows

The taxonomy and ontology are still being defined.

The interesting claim here is not generic workflow structuring or product-data ingestion by itself. Product and SKU data integration is expected, but it is not the wedge. The wedge is whether style guides, approved references, and creative rules can be made legible as a normative information structure that a repo-local pipeline can carry and verify without collapsing into vague creative direction.

The purpose of this repository is not to lock those decisions early. Its immediate role is to hold the smallest honest documentation scaffold needed to define repo-local execution rules and to make later ontology design legible.

The intended production surface begins with still-image workflows. Extension to video is expected later, once the underlying information architecture is clear enough to support that expansion without collapsing distinct concerns.

At this stage, the ontology remains open. The repository exists to create a disciplined place for that design work to happen.

## Entry Points

### Background Reading

The repo's architecture work tracks a four-article arc, listed in the chronological order they pertain to the project's evolution:

- [From Brand Rules to Creative Discretion](https://atomicspacekitten.substack.com/p/from-brand-rules-to-creative-discretion): establishes *creative discretion as the bounded zone of allowed variation inside a governed system* and names the five structural categories (product / business inputs, creative / technical constraints, creative discretion, required outputs, decision ownership) that the repo's architecture work builds on
- [From Normative Structure to Execution](https://atomicspacekitten.substack.com/p/from-normative-structure-to-execution): records the move from abstract framework to standing up the v1 Airtable prototype as a concrete pressure surface
- [The Beautiful Picture is Not the…](https://atomicspacekitten.substack.com/p/the-beautiful-picture-is-not-the): records the realization mid-prototype that slot outputs were inconsistent without higher-level inputs aligning the slots across a packet — the family-coherence pressure that the cross-mode layered model directly addresses
- [The Creative Act of Selection](https://atomicspacekitten.substack.com/p/the-creative-act-of-selection): extends the framing to the curation seam where bounded creative discretion becomes operationally recordable as a governance act

### Substance / Payload

- [`docs/problem-and-approach.md`](docs/problem-and-approach.md): concise statement of the workflow-structure problem and the repo's current approach
- [`docs/method.md`](docs/method.md): concise explanation of the repo's method, layers, and working sequence
- [`docs/architecture.md`](docs/architecture.md): current ontology and architectural direction
- [`docs/index.md`](docs/index.md): reading-order and navigation map across current, historical, and trigger-based docs
- [`docs/application/README.md`](docs/application/README.md): entry point for application artifacts

### Start Here

- [`docs/airtable-base-spec-sku-driven-furniture-v1.md`](docs/airtable-base-spec-sku-driven-furniture-v1.md): narrow Airtable execution proof for the SKU-driven furniture track as a first schema-pressure test
- [`Airtable base // SKU-Driven Furniture v1`](https://airtable.com/appoqJ25B6w4vSuX9/shrGGnxr3uvLRkEU4): live Airtable base corresponding to the current narrow SKU-driven furniture v1 proof
- [`docs/multi-output-slot-generation-execution-record-sku-driven-furniture-v1.md`](docs/multi-output-slot-generation-execution-record-sku-driven-furniture-v1.md): historical Gate 6 execution record for the `PKT-SKU-007` output-side evidence chain
- [`docs/multi-output-slot-generation-findings-sku-driven-furniture-v1.md`](docs/multi-output-slot-generation-findings-sku-driven-furniture-v1.md): historical bounded findings from the `PKT-SKU-007` Gate 6 output-slot generation execution
- [`docs/gate-2-image-bearing-reference-path-findings-pkt-sku-009.md`](docs/gate-2-image-bearing-reference-path-findings-pkt-sku-009.md): current visual-reference binding findings for `PKT-SKU-009`
- [`docs/capture-mechanics-thin-bridge-findings-pkt-sku-009.md`](docs/capture-mechanics-thin-bridge-findings-pkt-sku-009.md): current capture-mechanics thin-bridge findings for `PKT-SKU-009`
- [`docs/capture-mechanics-pause-and-document-structural-decision-note-sku-driven-furniture-v1.md`](docs/capture-mechanics-pause-and-document-structural-decision-note-sku-driven-furniture-v1.md): current decision accepting the thin bridge and pausing further capture mechanics until reopen trigger
- [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](docs/curation-event-schema-mutation-sku-driven-furniture-v1.md): bounded schema mutation enriching `generated_assets` with curation-event provenance fields, anchored to the cross-mode v3 finding that curation is uniform at the packet level
- [`docs/curation-event-population-findings-pkt-sku-009.md`](docs/curation-event-population-findings-pkt-sku-009.md): bounded backfill populating the four provenance fields on the PKT-SKU-009 HERO governed-asset record; resolves `source_attachment_id` writeback as Supported and narrows the milestone-5 blocker's scope
- [`docs/curation-event-population-findings-pkt-sku-007.md`](docs/curation-event-population-findings-pkt-sku-007.md): parallel backfill on the two PKT-SKU-007 Gate 6 governed-asset rows; first cross-packet `capture_reason` enum-readiness analysis (recommends staying as text)
- [`docs/curation-event-agentic-test-findings-pkt-sku-009.md`](docs/curation-event-agentic-test-findings-pkt-sku-009.md): first agentic-first curation event test on PKT-SKU-009 (HERO, PROFILE, DETAIL); forward provenance population Supported; meta-test articulates agentic curation as a delegation pattern
- [`docs/governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md`](docs/governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md): bundled multiple-rows-per-slot resolution and `curation_pattern` field addition on PKT-SKU-009 (three agentic rows promoted to governed_output); forward promotion path Supported
- [`docs/governed-output-promotion-findings-pkt-sku-007.md`](docs/governed-output-promotion-findings-pkt-sku-007.md): PKT-SKU-007 promotion completing the v1 evidence chain transition; surfaces `batch-output-no-curator-selection` as a third curation pattern beyond authorship-bearing and confirmation-bearing
- [`docs/curator-field-and-backfill-sku-driven-furniture-v1.md`](docs/curator-field-and-backfill-sku-driven-furniture-v1.md): adds `curator` field on `generated_assets` and backfills four rows; closes the *by whom* axis of the curation event's structural provenance
- [`docs/curation-event-vision-based-agentic-test-findings-pkt-sku-009.md`](docs/curation-event-vision-based-agentic-test-findings-pkt-sku-009.md): vision-based agentic curation test on PKT-SKU-009 with reference grounding and family coherence; REF-002 binding Supported in the most recent iteration; vision-based proper test converges with the metadata-based pick from #149; documents three vision-based delegation failure modes that required in-flight methodology correction
- [`docs/full-flow-evidence-synthesis-pkt-sku-009.md`](docs/full-flow-evidence-synthesis-pkt-sku-009.md): full-flow architectural surface synthesis (Path C of three) — documents the already-executed end-to-end flow on PKT-SKU-009 and surfaces the human/agent surface boundary as load-bearing finding
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](docs/full-flow-path-a-findings-pkt-sku-009.md): coordinated fresh-generation full-flow on PKT-SKU-009 (Path A of three) — surfaces the implementation-vs-conceptual goal distinction for family coherence, refines the cross-mode model's family-coherence framing, introduces fifth `curation_pattern` value (`human-cross-round-authorship-bearing-curation`), reframes Path C's generation-invocation question as a tooling limitation
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](docs/full-flow-path-b-findings-pkt-sku-010.md): coordinated fresh-generation full-flow on a brand-new packet PKT-SKU-010 (Path B of three) — adds `asset_attachment` field, validates attachment-copy writeback, **resolves the milestone-5 thin-bridge limitation** so governed-asset rows now carry the asset itself; closes the v1 sweep's full-flow item
- [`docs/asset-attachment-backfill-findings-sku-driven-furniture-v1.md`](docs/asset-attachment-backfill-findings-sku-driven-furniture-v1.md): bounded backfill of `asset_attachment` on prior 11 governed-asset rows; 9 backfilled cleanly (PKT-SKU-009), 2 unrecoverable (PKT-SKU-007 — source attachments no longer on slot); surfaces the architectural cost of the thin-bridge limitation — text-reference-only assets are structurally lost when source attachments are later deleted
- [`docs/cross-mode-probe-marketing-message-driven-v1.md`](docs/cross-mode-probe-marketing-message-driven-v1.md): first cross-mode application probe — paper-only sketch pressuring the SKU-driven schema against a concrete marketing/message-driven scenario; architecture survives without mutation, three strain points (slot-input plurality, composite fidelity-anchor, selection-axis classification) confirmed under concrete pressure but not earned by current operational load
- [`docs/cross-mode-probe-collection-merchandising-v1.md`](docs/cross-mode-probe-collection-merchandising-v1.md): second cross-mode application probe — paper-only sketch pressuring the SKU-driven schema against a concrete collection / merchandising scenario (capsule wardrobe edit); architecture survives without mutation, but **slot-input plurality strain is sharper here** than in the marketing probe — collection mode is the strongest case the architecture has produced for plural slot-input fields, still not earned by current operational pressure
- [`docs/four-mode-truth-and-constraint-pressure-note.md`](docs/four-mode-truth-and-constraint-pressure-note.md): current four-mode comparison across single-item truth, relational truth, message-bearing discipline, and campaign coherence
- [`docs/shared-vs-mode-weighted-pressure-note.md`](docs/shared-vs-mode-weighted-pressure-note.md): current comparison of shared pressures, mode-weighted pressures, and still-unearned claims across the four worked-example modes
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](docs/cross-mode-layered-input-model-and-curation-event-note.md): current working layered-input model attempt across the four modes, anchored to the curation event as a first-class governance act
- [`docs/review-artifacts-optional-vs-load-bearing-note.md`](docs/review-artifacts-optional-vs-load-bearing-note.md): current comparison of where review artifacts appear optional versus structurally load-bearing across the four worked-example modes
- [`docs/truth-pressure-across-workflow-modes-note.md`](docs/truth-pressure-across-workflow-modes-note.md): earlier cross-mode comparison of single-item truth, relational truth, and campaign coherence
- [`docs/verification-record-carrying-clarification.md`](docs/verification-record-carrying-clarification.md): current clarification on what seam records must carry across the chain
- [`docs/seam-local-verification-boundary-note.md`](docs/seam-local-verification-boundary-note.md): current clarification on later-seam verification responsibility

The SKU-driven Furniture v1 thread includes `PKT-SKU-007` as historical output-side evidence and later `PKT-SKU-009` visual-reference / capture-governance evidence.
Current routing for that thread should start with `docs/index.md`, then the Gate 2 image-bearing reference path findings, the capture-mechanics thin-bridge findings, and the capture-mechanics pause decision.
Together those docs mark a layered v1 prototype plateau, not production readiness, generalized output doctrine, or a cross-mode conclusion.

### Worked Examples

- [`docs/application/examples/placeholder-furniture-workflow-packet-example.md`](docs/application/examples/placeholder-furniture-workflow-packet-example.md): SKU-driven packet example
- [`docs/application/examples/placeholder-collection-merchandising-workflow-packet-example.md`](docs/application/examples/placeholder-collection-merchandising-workflow-packet-example.md): collection / merchandising packet example
- [`docs/application/examples/placeholder-marketing-message-driven-workflow-packet-example.md`](docs/application/examples/placeholder-marketing-message-driven-workflow-packet-example.md): marketing / message-driven packet example
- [`docs/application/examples/placeholder-campaign-workflow-packet-example.md`](docs/application/examples/placeholder-campaign-workflow-packet-example.md): campaign / editorial packet example

### Worked-Example Bridges

- [`docs/application/placeholder-furniture-style-spec-to-seam-chain-map.md`](docs/application/placeholder-furniture-style-spec-to-seam-chain-map.md): furniture style-spec bridge into the seam chain
- [`docs/application/placeholder-collection-merchandising-packet-to-seam-chain-map.md`](docs/application/placeholder-collection-merchandising-packet-to-seam-chain-map.md): collection / merchandising bridge into the seam chain
- [`docs/application/placeholder-marketing-message-driven-packet-to-seam-chain-map.md`](docs/application/placeholder-marketing-message-driven-packet-to-seam-chain-map.md): marketing / message-driven bridge into the seam chain
- [`docs/application/placeholder-campaign-packet-to-seam-chain-map.md`](docs/application/placeholder-campaign-packet-to-seam-chain-map.md): campaign / editorial bridge into the seam chain

### Governance

- [`AGENTS.md`](AGENTS.md): repo-local execution guidance
- [`docs/historical/workflow-boundary.md`](docs/historical/workflow-boundary.md): historical — prior repo-local versus external control-surface boundary, superseded by current AGENTS.md model

## License

Copyright (c) 2026 Andrew S Klug // ASK

Licensed under the Apache License 2.0 // see [`LICENSE`](LICENSE)
