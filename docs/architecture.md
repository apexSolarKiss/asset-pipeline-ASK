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

Business intent defines what the asset is meant to achieve. Creative intent defines how that purpose is meant to be expressed. Creative discretion should remain legible within the model, but as constraint-bounded creative discretion: scoped freedom shaped by intent, bounded by constraints, exercised through orchestration, and validated through governance rather than treated as unbounded free-form behavior.
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
- [`docs/truth-pressure-across-workflow-modes-note.md`](truth-pressure-across-workflow-modes-note.md): current cross-mode comparison of the repo's strongest worked-example pressures
- [`docs/multi-output-slot-representation-structural-decision-note-sku-driven-furniture-v1.md`](multi-output-slot-representation-structural-decision-note-sku-driven-furniture-v1.md): bounded structural decision choosing first-class expected output slots
- [`docs/airtable-slot-level-generation-schema-fit-note-sku-driven-furniture-v1.md`](airtable-slot-level-generation-schema-fit-note-sku-driven-furniture-v1.md): bounded slot-level generation schema-fit and prototype finding
- [`docs/generated-assets-promotion-boundary-structural-decision-note-sku-driven-furniture-v1.md`](generated-assets-promotion-boundary-structural-decision-note-sku-driven-furniture-v1.md): bounded generated-assets promotion-boundary decision
- [`docs/output-slot-status-lifecycle-structural-decision-note-sku-driven-furniture-v1.md`](output-slot-status-lifecycle-structural-decision-note-sku-driven-furniture-v1.md): bounded output-slot status lifecycle decision
- [`docs/asset-family-coherence-and-reuse-pressure-note-sku-driven-furniture-v1.md`](asset-family-coherence-and-reuse-pressure-note-sku-driven-furniture-v1.md): bounded asset-family coherence, reuse, derivative, and capture-mechanics pressure
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
