# Problem And Approach

## The problem

Commercial visual production rarely fails for lack of a good image. It fails because the structure that should govern production stays implicit — and "creative direction" is made to carry too much at once.

"Creative direction" routinely fuses objects that do different jobs:

- **intent** — the aim the asset must express
- **constraints** — what must not be violated
- **references** — the visual anchors that override a model's defaults
- **creative discretion** — the bounded judgment that opens the permitted-variance aperture, later exercised at selection to close it
- **selection** — the adjudicative transition that chooses one candidate and makes it true to the intent
- **artifact governance** — the mechanism that binds the accepted result to its claim, use, and answerability
- **the governance record** — the durable trace of that mechanism, not the mechanism itself

Collapse these into one "creative direction" field and the system can still produce images, but it can no longer say *how the creative work happened* — where authorship lived, what was bounded, who decided, what was governed. Generation produces *candidates*; it does not adjudicate. A generated image is not yet a governed asset. These distinctions are the difference between a prompt and an architecture.

## The approach

- Name those objects separately, and make the layered structure that carries them legible — where each lives, and how it inherits, overrides, and combines.
- Treat the bounded creative-discretion aperture as a first-class carrier, distinct from the constraints that bound it and the references that anchor it.
- Keep selection (the adjudicative transition) distinct from governance (the mechanism) and from the governance record (its durable trace).
- Carry all of this as a **portable asset-definition package** — the definition layer, designed to be substrate-independent, that a production system needs *before model choice matters*.

## Start with the concrete object

The fastest way to see the distinction is the worked package, not the abstract ontology:

- [`asset-definition-package-map-2c-marketing-hero-v1.md`](asset-definition-package-map-2c-marketing-hero-v1.md) — one package, one chain end to end (intent → discretion → variance → selection → governance).
- [`package-lifecycle-partition-v1.md`](package-lifecycle-partition-v1.md) — the three lifecycle states a package spans (prospective definition / execution-run state / governed record), and how to read its statuses without contradiction.

## How the model is exercised

The conceptual structure (ontology) and its use in templates and worked examples (application) are pressure-tested across four worked-example workflow modes — built as the smallest honest structure first, kept provisional rather than claiming premature completeness. The ontology / application split and the discovery → diagnosis → redesign sequence are described in [`method.md`](method.md); the current architecture front door is [`architecture.md`](architecture.md).

The approach is still being refined in public.
