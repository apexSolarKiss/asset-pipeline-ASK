# Visual Payload Architecture v2

## Posture

This artifact models the content axis of the definition layer: the per-image visual
dimensions and set-level visual relationships carried by visual outputs, plus the
lifecycle roles that dimension-specific statements may occupy from intended
specification through governance. It is the v2 correction of the content-axis model:
same purpose as v1, corrected ontology and topology.

It is architecture, not prompting and not schema. It is aesthetic-agnostic: it
describes the *shape* of an image-payload system, not any brand's aesthetic. It reads
against the function-axis companion
([`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md)),
the normative-force vocabulary
([`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md)),
and the foundational premises
([`docs/foundational-premises-v1.md`](foundational-premises-v1.md)).

## What changed from v1, and why

v1 named fifteen "payload families" as a flat peer list and drew their resolution as
one linear inheritance lattice. An ontology/topology audit found that the list mixed
four different kinds of object (realized payload, a cross-image relation, conformance
relations, and external obligations/constraints), and that the linear lattice
misdrew a **convergence** problem as a single lineage. v2 corrects this:

- the primary model is **visual dimensions × lifecycle roles**, not a flat family list;
- **normative sources** (the inherited scoped statements plus orthogonal resolution
  inputs) sit *outside* payload as what converges to specify the dimensions, with
  **typed references** as a cross-cutting carrier axis over them;
- resolution is a **convergence at the slot** that **preserves the Axis-B scope
  spine** rather than replacing it;
- **normative force** is a property of a *statement about* a dimension, not of the
  dimension itself.

v1 is preserved unchanged as predecessor evidence.

## Two axes: content and function (preserved)

The reference-function taxonomy answers *what role a reference plays*; this artifact
answers *what visual information the image carries*. They are orthogonal. **Typed
references are not a peer source of visual content** — a reference is a carrier that
**anchors, evidences, or constrains** statements *across* the sources (it can anchor
lighting, product truth, composition, a prohibition, continuity). In the resolution
picture below, references are a cross-cutting function axis, never one independent
content branch.

**A reference's governing role is assigned within the production ask; it is not
intrinsic to the image carrier.** The same image may function as product-truth
evidence, a directional / scene anchor, a mood reference, a prohibition example, a
continuity reference, or non-governing inspiration depending on the package's source
of intent, scope, and carrier role. A reference does not carry its own instructions;
the production ask states what each carrier governs — and what it does not.

## The visual dimensions (content axis)

**Per-image dimensions (12):**

1. subject / product depiction
2. casting / pose / gesture
3. use-state / action
4. lighting
5. color / palette / tonal treatment
6. composition / framing / negative space
7. optics / perspective / depth
8. space / environment / background
9. styling / props / wardrobe
10. material appearance / behavior
11. mood / atmosphere
12. image finish / rendering character

**Set-level dimension (1):**

13. family / sequence relationship — with two structurally different subtypes:
    **family coherence** (an *unordered, set-based* relation) and **sequence / arc
    progression** (an *ordered, possibly temporal* relation). Evidence earned for one
    does not transfer to the other.

Two boundaries are stated explicitly to prevent overlap defects:

- **material appearance / behavior** = properties of the *depicted world* (fabric
  weave, nap, reflectivity, drape, wood grain) vs **image finish / rendering
  character** = properties of the *representation as an image* (grain, smoothing,
  sharpening, bloom, halation, compositing character). Editing history is provenance,
  not finish.
- **casting / pose / gesture** = *who appears and bodily configuration* vs
  **use-state / action** = *what is happening and the subject/product/action
  relationship*. Coupled in realization; different architectural jobs.

The dimensions are **separately articulable and governable, though coupled in
realization** — lighting moves material appearance, mood, and color; optics moves
composition and space; image finish moves texture and tonal response. They are not
causally independent.

## Lifecycle roles

A dimension is not one thing across the pipeline. Dimension-specific statements **may
occupy** several roles:

```
intended specification
realized candidate state
conformance observation
selection judgment
governed record
```

This is the load-bearing move: fidelity, aspect-compliance, and set-coherence are not
separate ontological kinds — they are the **specification** and
**conformance-observation** roles of ordinary dimensions, evaluated against the
sources below. Not every dimension occupies every role; governance in particular need
not carry a statement for each dimension (see the runtime chain).

## Normative sources

These shape the dimensions; they are not carried by the image as content. They divide
into three groups that combine differently.

**A. Inherited + local scoped visual statements** — along the Axis-B scope spine
`brand system → category / product-class → mode-specific → packet → slot`. The
brand-scope portion is the **brand image grammar**: the visual normative statements
carried by the **brand image system**, a visual-domain subsystem housed within the
brand-system scope (it operationalizes brand-level intent into visual grammar; it is
**not** an additional inheritance layer). Category conventions, mode/packet intent,
and slot-local statements occupy the lower scope positions. This is real inheritance
with local specialization — not parallel branches.

**B. Orthogonal resolution inputs** — they join the scoped stack *at* slot resolution,
not by inheriting from it:
- **product truth** — authoritative and **invariant**; it does not vary with context.
  A slot **selectively projects** which truth facets become fidelity obligations
  (profile slot → silhouette + proportion; detail slot → seam + material + joinery;
  hero slot → identity + overall form). Selective projection, not context inheritance.
- **context-profile specialization** — a reusable specialization profile that
  **specializes the inherited scoped visual stack for a production context**. Its IA
  home remains held (whether it refines `mode-specific` or sits beside it); its
  behavior is specialization.
- **output obligations** — required aspect ratio, copy-safe region, channel use, etc.
- **scoped prohibitions** — constraint predicates over one or more dimensions, scoped
  at brand / category / campaign·packet / slot. Some cross-cutting, some local; not
  one universal brand filter.

**C. Typed references** — the orthogonal function axis: cross-cutting carrier
relationships that **anchor, evidence, or constrain** statements *across* A and B.
References are not one more source species; the taxonomy is a conceptual cut
describing what a reference *does*, above any carrier shape.

## Scope inheritance and convergence (the topology)

Two structures coexist; neither replaces the other.

**Axis-B scope inheritance (authoritative, unchanged):**

```
brand system → category / product-class → mode-specific → packet → slot
```

This produces an **inherited + locally specialized scoped normative stack** (group A).

**Convergence at slot resolution** — the scoped stack joins the orthogonal inputs:

```
A. inherited + local scoped visual statements   [brand → category → mode → packet → slot]
  + product truth / selected fidelity facets
  + context-profile specialization
  + output obligations
  + scoped prohibitions
  + typed reference anchors across those statements
        >>
  resolved slot visual specification
```

Sources **converge**; the orthogonal inputs do not inherit from one another, and the
Axis-B spine remains real inheritance rather than one of several parallel branches.

**Obligations and prohibitions operate twice.** Some compile into the intended
specification (3:4 aspect; copy-safe region; "no visible logo"). The same predicates
**also survive as conformance predicates after generation** ("did the candidate
actually satisfy 3:4?"; "is the copy field usable?"; "did a prohibited logo
appear?"), because generative execution can violate a correctly resolved
specification. Their topology is *constraint during specification* **and**
*conformance predicate during evaluation*.

## The runtime / lifecycle chain

```
sources + constraints converge
  >> resolved slot visual specification
  >> generation / execution
  >> candidate realized per-image payload + realized set relationships
  >> dimension-level + set-level conformance evaluations
  >> selection judgment
  >> governance record
```

![Visual Payload Architecture — the convergence flow: a reference carrier qualifies the normative-source field; the field converges into a resolved slot specification; realization (candidate image and set relations) reconverges into conformance; then selection, governance, and a governed asset that may later return as a reference input.](diagrams/asset-pipeline-ASK_visual-payload-architecture.png)

*Visual Payload Architecture // a reference carrier can qualify the source field; source inputs converge into a resolved slot specification; the result is generated, evaluated, selected, governed, and may later return as a reference input. Illustrative — this prose is source truth. Repo-native interactive version (hover/click for definitions): [`docs/diagrams/asset-pipeline-ASK_visual-payload-architecture.html`](diagrams/asset-pipeline-ASK_visual-payload-architecture.html).*

**Evaluation precedes selection; selection adjudicates; governance records.**
Governance does **not** require one stored record per dimension: a governed asset can
record the accepted output, the selection judgment, the rationale, and the
controlling specification / references, while some dimension-level evaluation stays
implicit inside that judgment. The durable requirement is **accountability across the
lifecycle**, not dimension-by-dimension storage.

## Normative force

Force is **`visual dimension × lifecycle statement × normative force`** — a three-way
relation. It attaches to the *statement or carrier*, never to the dimension itself:

```
candidate lighting observation = descriptive
brand lighting rule            = directive
lighting prohibition           = constraint
lighting reference             = reference
selection finding (lighting)   = judgment
governed acceptance (lighting) = governance
```

The six force kinds are defined in
[`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md).
This is a bridge to existing vocabulary, not a new force model.

## Language and setup

Many dimensions can be articulated as a relatively stable upstream grammar plus a
context-specialized setup — lighting is the clean case (a warm, soft register vs a
studio key vs an outdoor exposure). A language-versus-setup distinction was observable
in the two earlier corpus runs. Its ownership and placement in the architecture — that
the brand owns the upstream grammar and context owns the setup — remain architectural
claims, not something a blind corpus proves. This is the local form of the
method-level `bounded generativity` primitive
(defined and owned at method-ASK); stated here in AP terms only.

Language supplies the upstream grammar; setup narrows a context-specific aperture; and
references and constraints can govern either layer. This is the visual-payload instance
of a nested aperture — upstream aperture-setting, then a narrower context aperture, then
nonjudgmental realization within it.

## What the corpus evidence supports — and does not

Two anonymized blind corpus runs predate this revision and tested the v1 flat
register. They did not produce or validate the ontology/topology correction. A later
terminology catch exposed the `post-processing / retouch` category error and prompted
the audit that produced v2. Their evidence is carried forward only where v2 retains
the same observable visual dimensions. Stated precisely:

**Supported:**
- the observed visual dimensions populate from real imagery, blind;
- **recurring corpus-level visual regularities, consistent with a candidate grammar**;
- the language-vs-setup distinction is observable;
- set-level **coherence / consistency** where sets were present.

**Not established by the blind runs:**
- that those regularities are *authoritative, brand-owned* grammar (that is an
  architectural assignment, not a blind-test result);
- product-fidelity conformance (no product truth was supplied);
- slot-obligation compliance (no obligations were supplied);
- prohibition compliance (not positively tested);
- ordered sequence / campaign-arc progression (only unordered family coherence was
  seen);
- the topology and force model (a population run cannot test relations).

The prior aggregate totals remain historical results of the v1 instrument; v2 does
not carry them forward as current scores. A real conformance test needs specification
+ product truth + candidate images — a **new test class**, not a rerun.

## Earned and held

**Earned by this artifact:**
- the dimensions × lifecycle-roles ontology;
- normative sources separated from payload, in groups A / B / C;
- the convergence topology that preserves the Axis-B scope spine;
- references as the orthogonal carrier/function axis;
- obligations/prohibitions as both specification constraints and evaluation predicates;
- force as a statement-level (three-way) relation;
- the material-vs-finish and casting-vs-use boundaries; the explicit distinction
  between unordered family coherence and ordered sequence / arc progression.

**Held, not decided:**
- the IA home of the context profile (refines `mode-specific` vs sits beside it);
- completeness of the dimension set beyond two corpora;
- whether family coherence and sequence / arc progression become two separate
  dimensions;
- a conformance test class (specification + product truth + candidates), not yet run.

## Boundaries

- structure, not schema: no fields, validator, or structured-IA revision proposed;
- aesthetic-agnostic; no real-brand examples;
- references remain the orthogonal function axis, not a peer visual dimension or an
  independent Axis-B source branch;
- the `bounded generativity` relation is stated in AP terms; no method doctrine is
  restated;
- the normative-force section is a bridge to existing vocabulary, not a new model;
- no runtime or package-consumer implication is asserted;
- no new corpus run is in scope; the two prior runs are bounded as stated above, and
  any specification-based conformance test remains future work.

## Self-superseding clause

This is the v2 articulation of the content axis. It supersedes
[`docs/visual-payload-architecture-v1.md`](visual-payload-architecture-v1.md), which
is preserved unchanged as predecessor evidence. v2 is superseded by any later version
that revises the dimensions, the lifecycle roles, the normative sources, or the
convergence topology.

## Anchor documents

- [`docs/visual-payload-architecture-v1.md`](visual-payload-architecture-v1.md) — predecessor (preserved as evidence)
- [`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md) — the function-axis companion
- [`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md) — the six-kind normative-force vocabulary
- [`docs/creative-discretion-doctrine-v1.md`](creative-discretion-doctrine-v1.md) — the discretion chain; AP as a worked instance of the method-level `bounded generativity` primitive
- [`docs/structured-ia-model-v2.md`](structured-ia-model-v2.md) and [`docs/architecture.md`](architecture.md) — the Axis-B scope spine this artifact preserves
- [`docs/foundational-premises-v1.md`](foundational-premises-v1.md) — references, product truth, and output are different objects
- [`docs/layer-disambiguation-note-v1.md`](layer-disambiguation-note-v1.md) — the project's four uses of "layer"
- [`docs/brand-intake-acquisition-and-blind-safety-v1.md`](brand-intake-acquisition-and-blind-safety-v1.md) — the corpus-construction preflight
