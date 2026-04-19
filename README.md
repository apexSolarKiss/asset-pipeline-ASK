![asset-pipeline-ASK banner](production-pipeline-ASK-banner.png)

# asset-pipeline-ASK

This repository is an open-source scaffold for turning brand style guides, creative rules, and workflow constraints into a machine-usable normative structure for AI-native visual asset production workflows.

It is being developed from first principles to support normative intent, workflow governance, and scalable asset production across multiple workflow classes. Current working workflow modes include SKU-driven product imagery, collection / merchandising context, marketing / message-driven workflows, and brand campaign / editorial workflows, though the taxonomy and ontology are still being defined.

The interesting claim here is not generic workflow structuring or product-data ingestion by itself. Product and SKU data integration is expected, but it is not the wedge. The wedge is whether style guides, approved references, and creative rules can be made legible as a normative information structure that a repo-local pipeline can carry and verify without collapsing into vague creative direction.

The purpose of this repository is not to lock those decisions early. Its immediate role is to hold the smallest honest documentation scaffold needed to define repo-local execution rules and to make later ontology design legible.

The intended production surface begins with still-image workflows. Extension to video is expected later, once the underlying information architecture is clear enough to support that expansion without collapsing distinct concerns.

At this stage, the ontology remains open. The repository exists to create a disciplined place for that design work to happen.

## Entry Points

### Substance / Payload

- [`docs/problem-and-approach.md`](docs/problem-and-approach.md): concise statement of the workflow-structure problem and the repo's current approach
- [`docs/method.md`](docs/method.md): concise explanation of the repo's method, layers, and working sequence
- [`docs/architecture.md`](docs/architecture.md): current ontology and architectural direction
- [`docs/application/README.md`](docs/application/README.md): entry point for application artifacts

### Start Here

- [`docs/four-mode-truth-and-constraint-pressure-note.md`](docs/four-mode-truth-and-constraint-pressure-note.md): current four-mode comparison across single-item truth, relational truth, message-bearing discipline, and campaign coherence
- [`docs/truth-pressure-across-workflow-modes-note.md`](docs/truth-pressure-across-workflow-modes-note.md): earlier cross-mode comparison of single-item truth, relational truth, and campaign coherence
- [`docs/verification-record-carrying-clarification.md`](docs/verification-record-carrying-clarification.md): current clarification on what seam records must carry across the chain
- [`docs/seam-local-verification-boundary-note.md`](docs/seam-local-verification-boundary-note.md): current clarification on later-seam verification responsibility

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

- [`docs/workflow-boundary.md`](docs/workflow-boundary.md): repo-local versus external control-surface boundary
- [`AGENTS.md`](AGENTS.md): repo-local execution guidance

## License

Copyright (c) 2026 Andrew S Klug // ASK

Licensed under the Apache License 2.0 // see [`LICENSE`](LICENSE)
