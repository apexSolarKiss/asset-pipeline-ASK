# Method

This repository develops a working method for structuring visual asset workflows in a way that stays legible across different workflow modes.

## Two Layers

- `Ontology`: the conceptual structure used to describe workflows in shared terms
- `Application`: the use of that structure in templates, examples, and applied documents

The ontology defines the shared categories used across workflows, while the application layer is where the model is exercised and pressure-tested.

## Domain-Facing Vocabulary

The ontology's vocabulary defines shared concepts; it does not prescribe the labels every user sees. An application expresses those concepts in the established working language of its intended users, and keeps their meaning, relationships and decision boundaries intact.

In a photography-facing workflow, an output slot is presented as a **shot**, and the planned set as a **shot list**. Here a shot is the requested image, not a particular capture or generation attempt. Several candidates may answer the same shot, and selecting or accepting one of them does not change what the shot is.

This is a domain-facing alias, not a new architectural entity or a change to the ontology. The implementation's documentation states the mapping, so users do not have to learn both vocabularies. Implementation names may differ from the canonical term on the same condition: a table of shots can implement output slots, and a changed visible label does not by itself call for renaming an existing table.

Other applications may use other terms suited to their audience. A familiar label must not hide a material distinction: a requested output, a candidate and an accepted asset (the result accepted for a specified use) remain different things, even when one user action performs several workflow steps.

The implementation roadmap / system map grammar already requires this of generated documents: it translates repository vocabulary into terms its audience can read, as a content rule rather than a style preference ([Translation Rules](application/implementation-roadmap-system-map-artifact-grammar-v1.md#translation-rules)). This section extends the same discipline to operational interfaces.

## Working Sequence

- `Discovery`: maps the current state
- `Diagnosis`: interprets the current state
- `Redesign`: proposes a better target-state shape

This sequence is directional and structural, not an implementation plan.

## How To Read This Repo

- [`docs/architecture.md`](architecture.md): conceptual structure and current ontology
- [`docs/workflow-mode-comparison.md`](workflow-mode-comparison.md): what held constant and what varied across abstract workflow modes
- [`docs/application/README.md`](application/README.md): templates and example sets that exercise the method

The method remains provisional and is expected to sharpen through use.
