![asset-pipeline-ASK banner](asset-pipeline-ASK-banner.jpg)

# asset-pipeline-ASK

## What this is

An open-source information architecture for commercial visual-asset workflows: it turns brand style guides, creative rules, and workflow constraints into machine-usable normative structure for AI-native visual asset production.

This is not a better image-generation interface. It is a structured definition layer for making visual-production intent, constraints, references, outputs, and governance machine-usable.

The reusable object is a **portable asset-definition package** — the substrate-independent definition layer for a commercial visual-asset workflow: product truth, business and creative intent, constraints, required outputs, slot variation, visual references, decision ownership, approval boundaries, capture/governance rules, and reuse/family-coherence rules, carried as each workflow needs them. The repository is a current worked reference architecture — a prototype proof of that layer, refined as evidence accumulates, not a finished product spec.

## What claim it makes

The wedge is whether style guides, approved references, and creative rules can be made legible as normative information structure that a repo-local pipeline can carry and verify without collapsing into vague creative direction.

Product and SKU data integration is expected, but it is not the wedge. The wedge is the normative structure that makes creative intent, constraints, references, outputs, and governance usable above it.

## What layer it operates at

The repo is building a durable definition layer above changing tools and models, not a generation interface or runtime orchestration layer. It articulates a layered information architecture across brand-system, category, mode-specific, packet, slot, candidate-generation, curation-seam, and governed-asset layers, and pressures that architecture against four worked-example workflow modes at uneven evidence depth:

- SKU-driven product imagery — operationally grounded at full-flow depth
- collection / merchandising — operationally grounded at full-flow depth
- brand campaign / editorial — bounded full-flow plus structural-proof depth
- marketing / message-driven — message-hero full-flow proven in-base; support slot held

Still-image first; video extension is downstream of the layered model stabilizing.

The 2c marketing hero now demonstrates the full chain end to end inside the system: the definition layer drives generation, candidates accumulate, a human curator selects one, the selected candidate is captured into a governed asset with no external import, and the output slot is accepted. Across the other worked modes, the same package grammar is pressured at uneven evidence depth. Airtable is the worked substrate that demonstrates this — one substrate, not the deliverable. The deliverable is the portable definition layer above it, which is substrate-independent.

## What to read next

The strategic reader path:

1. [`docs/problem-and-approach.md`](docs/problem-and-approach.md) — the workflow-structure problem and the repo's approach
2. [`docs/method.md`](docs/method.md) — ontology / application split and working sequence
3. [`docs/architecture.md`](docs/architecture.md) — current architecture front door
4. [`docs/structured-ia-model-v2.md`](docs/structured-ia-model-v2.md) — current canonical machine-readable IA representation (hybrid prose + YAML appendix; v1 preserved as predecessor)
5. [`docs/layered-reference-and-discretion-architecture-v1.md`](docs/layered-reference-and-discretion-architecture-v1.md) — nine-fold reference-function taxonomy, normative hierarchy across the eight IA layers, and nine-site creative-discretion decomposition across the four workflow modes
6. [`docs/brand-system-input-cross-category-synthesis-v1.md`](docs/brand-system-input-cross-category-synthesis-v1.md) — Phase 2 six-category cross-category synthesis: six-category comparison matrix, nine-relation cross-category vocabulary, refined extraction sequence (default graph with conditional jump-points), and the five-or-six-zone hybrid implication for the brand-system layer

## One concrete example

For a first reader, the simplest complete chain example is the 2c marketing hero — a single output slot carried end to end, not the whole marketing mode:

- [`docs/asset-definition-package-map-2c-marketing-hero-v1.md`](docs/asset-definition-package-map-2c-marketing-hero-v1.md)

For the cleanest layered IA architecture case, see the SKU-driven mode, anchored against `PKT-SKU-009` and `PKT-SKU-010`:

- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](docs/ia-layered-content-sketch-sku-driven-mode-v1.md)

## Where the full evidence trail lives

- [`docs/index.md`](docs/index.md) — full navigation across all repo artifacts
- [`docs/milestones/`](docs/milestones/) — plateau markers
- [`AGENTS.md`](AGENTS.md) — repo-local execution guidance
- [`docs/diagrams/asset-pipeline-ASK_architecture-tree.html`](docs/diagrams/asset-pipeline-ASK_architecture-tree.html) — visual architecture tree at orientation depth; regenerated when a plateau milestone marker lands or an equivalent architecture-front-door shift makes the diagram materially stale, so its update cadence is slower than the prose docs; the prose docs are authoritative if the two diverge

Prototype test bases (worked evidence surfaces; Airtable is one substrate, not the deliverable):

- [`Airtable base // Integrated Four-Workflow Home-Goods v1`](https://airtable.com/app4sBiFw2tft17VF/shrckbrFuw0k9e6wq) — the base the 2c marketing-hero chain runs in; the worked evidence surface for the end-to-end in-base proof (definition layer → generation → candidate accumulation → selection → governed asset, no external import)
- [`Airtable base // SKU-Driven Furniture v1`](https://airtable.com/appoqJ25B6w4vSuX9/shrGGnxr3uvLRkEU4) — original prototype base for SKU-driven Furniture v1 and early cross-mode pressure work
- [`Airtable base // Campaign-Driven D2C Home-Goods v1`](https://airtable.com/appCAcRuA82SWj5h5/shryHuOgJHRsNhMMU) — separate campaign-mode prototype base for cross-base / cross-brand pressure work

Background article series, in chronological order:

- [From Brand Rules to Creative Discretion](https://atomicspacekitten.substack.com/p/from-brand-rules-to-creative-discretion)
- [From Normative Structure to Execution](https://atomicspacekitten.substack.com/p/from-normative-structure-to-execution)
- [The Beautiful Picture is Not the…](https://atomicspacekitten.substack.com/p/the-beautiful-picture-is-not-the)
- [The Creative Act of Selection](https://atomicspacekitten.substack.com/p/the-creative-act-of-selection)
- [From Execution Proof Back to Normative Structure](https://atomicspacekitten.substack.com/p/from-execution-proof-back-to-normative)
- [Creative Discretion Is Not Creative Intent](https://atomicspacekitten.substack.com/p/creative-discretion-is-not-creative)

## License

Copyright 2026 Andrew S Klug // ASK

Licensed under the Apache License 2.0 // see [`LICENSE`](LICENSE)
