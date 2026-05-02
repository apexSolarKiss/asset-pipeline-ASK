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
