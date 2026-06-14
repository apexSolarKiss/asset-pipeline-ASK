# Visual Payload Architecture v1

## Posture

This artifact models the **content axis** of the definition layer: what visual information an image carries, and at which IA layer each facet is authored, inherited, overridden, referenced, generated, selected, and governed.

It is the companion to [`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md), which models the **function axis** — what role a reference plays. The two are orthogonal. The useful structure is the **payload-attributes × reference-functions** matrix: each attribute can be anchored by references playing different functions.

This is architecture, not prompting and not schema. It defines what kinds of visual information exist and where they live; it does not propose fields, a validator, or generation tactics. It is aesthetic-agnostic — it describes the *shape* of an image-payload system, not any brand's aesthetic; a real brand's visual system plugs into this structure through deployment slots. (Reads against the foundational premises that prompting is not architecture, that visual anchoring is a structural override, and that product truth / reference / constraint / example / output are different objects — [`docs/foundational-premises-v1.md`](foundational-premises-v1.md).)

## What This Artifact Attempts

The repo has modeled workflow modes, apertures, reference functions, discretion, governance, and package portability. It has not modeled the **semantic content inside the image**.

An image is not atomic. It is a composite of separable, independently-authorable visual attributes. This artifact does three things:

1. names those **attribute families**;
2. assigns each a **home layer** and an **inheritance rule** (the load-bearing move);
3. bridges each to the repo's existing **normative-force** vocabulary.

The headline is not the list. It is the placement and inheritance — which attributes are brand invariants, which are context specializations, which are product truths, and which are slot obligations.

## Content axis and function axis

The reference-function taxonomy answers *what role a reference plays* (brand-system reference, product-truth image, negative reference, and so on). Visual payload answers *what visual information the image carries*. These are different questions on different axes:

- **function axis** — the reference-function taxonomy (the companion artifact)
- **content axis** — this artifact

Their product is the matrix: a payload attribute (say, lighting) can be anchored by references serving several functions (a brand-system reference fixing the language, a product-truth image, a negative reference). Neither axis is derivable from the other.

## Visual payload inventory

The inventory spans **intra-image** attributes (what is inside a single frame) and **cross-image** payload (how a frame relates to its set) — commercial systems govern families, grids, collections, and variant sets, not isolated images. Initial set:

1. **Subject / product fidelity** — product truth (geometry, construction, accurate color, scale)
2. **Casting / model / pose / gesture** — who appears, demographics, expression, posing language
3. **Use-state / action / narrative relation** — what the image shows *happening*: product at rest vs in use, human interaction, gesture/action, occasion, lifestyle cue, narrative function
4. **Lighting** — direction, quality, ratio, color temperature, shadow logic, time-of-day
5. **Color / palette / grade** — palette logic, saturation, white balance, accent logic, grade
6. **Composition / crop / framing / negative space** — placement, hierarchy, aspect, copy-safe area
7. **Optics / focal-length feel / distance / depth** — lens signature, perspective, depth of field
8. **Space / location / background** — environment, set, seamless vs location, background treatment
9. **Styling / props / wardrobe** — set dressing, surface styling
10. **Material behavior / texture / finish** — how the material behaves + surface treatment
11. **Mood / atmosphere / emotional register** — energy, intimacy, tonal restraint
12. **Post-processing / retouch level** — grade, texture, retouch register
13. **Family / sequence coherence** *(cross-image)* — how a candidate relates to its siblings (campaign family, collection grid, variant set); the obligation to work both alone and inside the set
14. **Channel / slot-output constraints** — output role, aspect, channel usage (an obligation)
15. **Brand prohibitions / avoid-list** — the cross-cutting negative constraints

Two of these are deliberately not folded into others: **use-state/action** is what the image *does*, distinct from mood, space, or styling; **family/sequence coherence** is the cross-image payload a single-image view omits.

## Payload attribute register

The register is the core artifact. Each attribute family carries:

- **home layer** — where it is primarily authored
- **language vs setup split** — the invariant grammar vs the context-specialized instance
- **inheritance / override** — what it inherits, and what downstream may override within what bounds
- **reference requirement** — anchor / spread / cluster / direct-truth / negative / exemplar-set
- **discretion aperture** — how much variance is permitted at this attribute
- **normative force** — what kind of authority it carries (see the bridge below)
- **lifecycle** — where it resolves, is judged, and is recorded

**Lifecycle is constant; resolution depth is not.** Every attribute participates in the same downstream lifecycle: it is resolved into the generation spec, judged at selection, and recorded at governance. That uniformity is the payoff — payload plugs into the existing discretion chain (intent → discretion → variance → selection → governance) without modifying it. But *where in the lattice each attribute is actually decided* varies: some are authored upstream (brand image system or campaign) and carried into the slot; others are specialized locally at the slot.

### Register (upstream half)

| Attribute | Home layer | Language vs setup | Reference type | Aperture |
|---|---|---|---|---|
| Subject / product fidelity | Product / category (truth) | Truth, not language — a fidelity constraint | Direct product truth | ~zero (must match) |
| Casting / model / pose | Brand image system (principles) → campaign (cast) → slot (pose) | Brand casting principles vs campaign cast + slot pose | Spread (a region) | medium |
| Use-state / action / narrative | Campaign / packet (narrative) + brand (use-register) + slot (action) | Brand use-register vs campaign/slot action | Scenario exemplars (spread) | brand register medium / action medium–high |
| Lighting | Brand image system (register) → context profile (setup) → slot | Brand lighting language vs context setup | Cluster | language tight / setup medium |
| Color / palette / grade | Brand image system (palette + grade) + campaign (emphasis) | Brand palette + grade vs campaign emphasis | Anchor (grade) + swatch set | grade tight / campaign medium |
| Composition / crop / negative space | Brand norms + slot (obligation) | Brand composition grammar vs slot obligation | Role-specific examples | norms tight / slot = obligation |
| Optics / depth | Brand image system (signature) + context | Brand optical signature vs context use | Examples | signature tight |
| Space / location / background | Context profile + campaign | Brand environment logic vs campaign location | Environment references | medium–high |
| Styling / props / wardrobe | Brand image system (register) + campaign | Brand styling register vs campaign styling | Vibe spread | medium |
| Material behavior / texture / finish | Product truth (behavior) + brand (finish) | Product behaves (truth) vs brand finish treatment | Direct material references | material tight / finish brand-tight |
| Mood / atmosphere | Brand tone (register) + campaign (mood) | Brand emotional register vs campaign mood | Atmosphere references | register tight / mood medium–high |
| Post-processing / retouch | Brand image system (finish language) | Brand invariant (mostly language) | Anchor | tight |
| Family / sequence coherence *(cross-image)* | Packet / collection / campaign (set definition) + slot participation | Set-level coherence grammar vs each member's fit obligation | Exemplar-set (the sibling family) | low at set level / member varies within |
| Channel / slot-output | Slot (output role) | Obligation, not aesthetic | Spec, not imagery | ~zero (obligation) |
| Brand prohibitions / avoid-list | Brand image system (cross-cutting filter) | A boundary across all attributes | Negative references | hard boundary |

The recurring pattern: most attributes split, and they do not all live at the same layer. Lighting is not "brand-level" full stop — it is a brand *language* plus a context *setup* plus a slot *execution burden*. Composition is mostly a slot *obligation* under brand *norms*. Product fidelity is not aesthetic at all — it is product truth. Family/sequence coherence is not even single-image — it is a set-level grammar each member instantiates, and selection judges a candidate both alone and inside the set. The register's value is this sorting.

### Normative force

The register says *where* an attribute lives and *how much* it can vary, but not *what kind of authority* it carries. The repo already has that vocabulary: the six kinds of normative force — **descriptive** (what is true), **directive** (what should happen), **constraint** (what must not be violated), **reference** (what visually anchors interpretation), **judgment** (what a human/operator/agent resolved), **governance** (what elevates output into governed-asset identity). Depth: [`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md).

Visual-payload attributes differ by force-kind, not only by home layer and aperture:

- **Subject / product fidelity** → descriptive / constraint
- **Lighting language** → directive + reference
- **Color / palette / grade** → directive + reference
- **Composition / slot obligation** → directive / constraint
- **Brand prohibitions** → constraint
- **Family / sequence coherence** → directive + constraint + reference
- **Use-state / action** → directive + reference

(Casting, optics, space, styling, and mood follow the directive + reference pattern; for material, the product *behavior* carries descriptive/constraint force while the brand *finish* treatment is directive + reference.) The lifecycle carries its own forces: selection judgment is **judgment** force; the governed record is **governance** force.

The point of the bridge: two attributes at the same home layer with the same aperture can still bind differently — a brand lighting *language* directs and anchors; a brand *prohibition* only constrains. The register alone does not capture that. This is a bridge to existing repo vocabulary, not a new force model.

## Language and setup

Most attributes split into a **language** (the invariant grammar, owned upstream) and a **setup** (the context-specialized instance). Lighting is the clean example: the brand owns the lighting *language* (a warm, soft, low-contrast register, say); the context owns the *setup* (a controlled studio key vs an outdoor exposure). The language is invariant across the brand's assets; the setup is context-variable. The same split recurs across color, casting, optics, styling, finish, mood, and use-register.

Naming it explicitly dissolves the apparent tension between brand consistency and contextual variation: they are grammar and instance, not a trade-off. The brand image system supplies the grammar; context and slot instantiate the bounded variation. This is the local form of the method-level `bounded generativity` primitive (defined and owned at method-ASK); this artifact instances it for visual payload and states it in AP terms, without restating method doctrine.

## The inheritance lattice

```
brand system
  ↓        (non-visual: voice, values, positioning — stays here)
brand image system          — the invariant visual grammars
  ↓
context profile             — mode / workflow specialization of the grammar
  ↓
packet / slot resolution    — walk the lattice to the assembled spec
  ↓
candidate payload           — what the generated image actually did
  ↓
selection judgment          — which candidate best satisfies the intended payload (alone and in-set)
  ↓
governed record             — why it fit, what references justify it, what carrier audits it
```

**Brand image system** — a sublayer subordinate to and inheriting from the brand system. It owns the stable visual grammars: lighting language, color system, casting principles, optical signature, finish/retouch language, composition norms, use-register, and the prohibition/avoid-list. The brand system above it retains non-visual brand (voice, values, positioning).

**Context profile** — a mode/workflow specialization that inherits the brand image system and specializes it (studio product, ecom grid, campaign location, editorial, message-led hero, collection family, detail/material shot). **IA status held:** context profiles are finer than the four worked-example modes and may cut across them; whether a context profile *refines* the existing `mode-specific` IA layer or *sits beside it* is left unresolved here, not prematurely collapsed.

**Slot resolution** — at generation, a slot resolves its full payload by walking the lattice: brand-image-system defaults → context-profile specialization → product/category truth → campaign/packet intent (including family/sequence coherence) → slot obligation → assembled generation spec. Some of these inputs are carried unchanged from upstream; others are specialized at the slot. This is the layer between the IA and image generation.

## Per-attribute aperture

A consequence: the aperture is **per-attribute**, not only per-workflow. Lighting can be tight (brand invariant) while composition is loose (slot-level); product fidelity is near-zero; family coherence is tight at the set level. The workflow's overall aperture is the composite of its attributes' apertures — a finer resolution of the discretion model, not a replacement, and it locates authorship per attribute (authorship concentrates where the aperture is widest). Aperture and force are distinct dimensions: product fidelity and a brand prohibition are both near-zero aperture but bind as constraint in different ways.

## Earned and held

**Earned by this artifact:**
- the content axis, named and separated from the function axis (the matrix)
- the attribute inventory (intra- and cross-image)
- the attribute register, with home layer, language/setup, reference type, aperture, and force-kind
- the brand-image-system → context-profile → slot-resolution lattice
- the normative-force bridge

**Held, not decided:**
- the IA status of the context profile (refines `mode-specific` vs sits beside it)
- whether the 15-family inventory is complete or will split/merge under pressure
- whether a real image corpus can populate this register cleanly — a future pressure-test, not run here

## Boundaries

- structure, not schema: no fields, validator, or structured-IA revision proposed
- architecture, not prompt engineering
- aesthetic-agnostic: describes the shape, not a brand's aesthetic; real brands plug in through deployment slots; no real-brand examples
- the `bounded generativity` relation is stated in AP terms; no method-doctrine is restated or thickened locally
- the normative-force section is a bridge to existing vocabulary, not a new force model
- no runtime or package-consumer implication is asserted
- corpus distillation is named only as a future pressure-test; it is not in scope here

## Self-superseding clause

This artifact is the v1 articulation of the content axis. It is superseded by any later version that revises the inventory, the register, or the lattice. It does not supersede the reference-function taxonomy, the structured IA model, the normative-force pass, or `architecture.md`; it reads against them and adds the content axis they do not carry.

## Anchor documents

- [`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md) — the function-axis companion; this artifact is its content-axis counterpart
- [`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md) — the six-kind normative-force vocabulary the register bridges to
- [`docs/creative-discretion-doctrine-v1.md`](creative-discretion-doctrine-v1.md) — the discretion chain; AP as a worked instance of the method-level `bounded generativity` primitive (defined/owned at method-ASK)
- [`docs/structured-ia-model-v2.md`](structured-ia-model-v2.md) and [`docs/architecture.md`](architecture.md) — the IA layers and front-door stance this artifact places attributes against
- [`docs/foundational-premises-v1.md`](foundational-premises-v1.md) — prompting is not architecture; visual anchoring is a structural override; product truth / reference / constraint / example / output are different objects
- [`docs/layer-disambiguation-note-v1.md`](layer-disambiguation-note-v1.md) — the project's four uses of "layer," for placing the inheritance lattice without overloading the term
