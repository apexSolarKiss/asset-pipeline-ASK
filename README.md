![asset-pipeline-ASK banner](asset-pipeline-ASK-banner.jpg)

# asset-pipeline-ASK

## What this is

An open-source scaffold for turning brand style guides, creative rules, and workflow constraints into machine-usable normative structure for AI-native visual asset production workflows.

This is not a better image-generation interface; it is a structured definition layer for making visual-production intent, constraints, references, outputs, and governance machine-usable.

The taxonomy and ontology are still being defined. The repository exists to create a disciplined place for that design work to happen.

## What claim it makes

The wedge is whether style guides, approved references, and creative rules can be made legible as normative information structure that a repo-local pipeline can carry and verify without collapsing into vague creative direction.

Product and SKU data integration is expected, but it is not the wedge. The wedge is the normative structure that makes creative intent, constraints, references, outputs, and governance usable above it.

## What layer it operates at

The repo defines a durable spec / orchestration layer that sits above changing tools and models, not the generation interface. It articulates a layered information architecture across brand-system, category, mode-specific, packet, slot, candidate-generation, curation-seam, and governed-asset layers, and pressure-tests it against four worked-example workflow modes:

- SKU-driven product imagery
- collection / merchandising
- marketing / message-driven
- brand campaign / editorial

Still-image first; video extension is downstream of the layered model stabilizing.

## What to read next

The strategic reader path:

1. [`docs/problem-and-approach.md`](docs/problem-and-approach.md) — the workflow-structure problem and the repo's approach
2. [`docs/method.md`](docs/method.md) — ontology / application split and working sequence
3. [`docs/architecture.md`](docs/architecture.md) — current architecture front door
4. [`docs/structured-ia-model-v2.md`](docs/structured-ia-model-v2.md) — current canonical machine-readable IA representation (hybrid prose + YAML appendix; v1 preserved as predecessor)
5. [`docs/layered-reference-and-discretion-architecture-v1.md`](docs/layered-reference-and-discretion-architecture-v1.md) — nine-fold reference-function taxonomy, normative hierarchy across the eight IA layers, and nine-site creative-discretion decomposition across the four workflow modes
6. [`docs/brand-system-input-cross-category-synthesis-v1.md`](docs/brand-system-input-cross-category-synthesis-v1.md) — Phase 2 six-category cross-category synthesis: six-category comparison matrix, nine-relation cross-category vocabulary, refined extraction sequence (default graph with conditional jump-points), and the five-or-six-zone hybrid implication for the brand-system layer

## One concrete example

The cleanest layered IA case is the SKU-driven mode, anchored against `PKT-SKU-009` and `PKT-SKU-010`:

- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](docs/ia-layered-content-sketch-sku-driven-mode-v1.md)

## Where the full evidence trail lives

- [`docs/index.md`](docs/index.md) — full navigation across all repo artifacts
- [`docs/milestones/`](docs/milestones/) — plateau markers
- [`AGENTS.md`](AGENTS.md) — repo-local execution guidance
- [`docs/diagrams/asset-pipeline-ASK_architecture-tree.html`](docs/diagrams/asset-pipeline-ASK_architecture-tree.html) — visual architecture tree at orientation depth; regenerated when a milestone plateau marker lands, so its update cadence is slower than the prose docs; the prose docs are authoritative if the two diverge

Live prototype bases:

- [`Airtable base // SKU-Driven Furniture v1`](https://airtable.com/appoqJ25B6w4vSuX9/shrGGnxr3uvLRkEU4) — original prototype base for SKU-driven Furniture v1 and early cross-mode pressure work
- [`Airtable base // Campaign-Driven D2C Home-Goods v1`](https://airtable.com/appCAcRuA82SWj5h5) — separate campaign-mode prototype base for cross-base / cross-brand pressure work

Background article series, in chronological order:

- [From Brand Rules to Creative Discretion](https://atomicspacekitten.substack.com/p/from-brand-rules-to-creative-discretion)
- [From Normative Structure to Execution](https://atomicspacekitten.substack.com/p/from-normative-structure-to-execution)
- [The Beautiful Picture is Not the…](https://atomicspacekitten.substack.com/p/the-beautiful-picture-is-not-the)
- [The Creative Act of Selection](https://atomicspacekitten.substack.com/p/the-creative-act-of-selection)
- [From Execution Proof Back to Normative Structure](https://atomicspacekitten.substack.com/p/from-execution-proof-back-to-normative)

## License

Copyright (c) 2026 Andrew S Klug // ASK

Licensed under the Apache License 2.0 // see [`LICENSE`](LICENSE)
