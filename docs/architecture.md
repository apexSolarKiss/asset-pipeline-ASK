# Architecture

The goal of this repository is to define a structured information architecture for scalable visual asset production systems.

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

- universal schema
- workflow-stream variants
- brand-specific policy overlays

- intent
  - business intent
  - creative intent
- inputs
- constraints
- orchestration
- outputs
- governance

- inputs -> source materials, supplied parameters, contextual instructions
- constraints -> hard requirements, bounded discretion, exclusion rules
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

Business intent defines what the asset is meant to achieve. Creative intent defines how that purpose is meant to be expressed. Creative discretion should remain legible within the model, but as scoped freedom shaped by intent, bounded by constraints, exercised through orchestration, and validated through governance rather than treated as unbounded free-form behavior.
The ordering of business intent and creative intent is descriptive, not yet a formal precedence rule, and any explicit tradeoff rule between them remains an open design question.
Partial second-level nesting is likely to emerge first under inputs, constraints, and governance. Orchestration and outputs remain intentionally flat for now. This is a tentative structural direction, not yet a finalized ontology specification.
Within that direction, inputs are currently trending toward source materials, supplied parameters, and contextual instructions, though that substructure also remains tentative rather than finalized.
Constraints are currently trending toward hard requirements, bounded discretion, and exclusion rules, though that substructure also remains tentative rather than finalized.
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
