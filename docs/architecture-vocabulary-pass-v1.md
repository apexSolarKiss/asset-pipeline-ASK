# Architecture // Vocabulary Precision Pass v1

## Purpose

This is a bounded vocabulary precision pass against the load-bearing terms the architecture currently uses. Its narrow goal is to clarify the boundaries of those terms before any apex definition-layer artifact is attempted.

It is not the apex definition-layer artifact. It is not a rewrite of [`docs/architecture.md`](architecture.md), [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md), or [`docs/architecture-bounded-modeling-pass-v1.md`](architecture-bounded-modeling-pass-v1.md). Those remain authoritative for their subject matter.

Each distinction below answers two questions: what the boundary is, and what changes operationally if the term is used precisely. Glossary entries that do not change behavior do not belong here.

## Posture

The corrective principles this pass operates under:

```text
architecture attempt before prototype ceremony
vocabulary deconstruction before architectural commitment
```

```text
one artifact
no schema
no prototype
no canonization
no rewrite of architecture.md or cross-mode-layered-input note
```

Permission to be wrong is part of the method.

## Architectural Question

Are the load-bearing terms the architecture currently uses precise enough to support an apex definition-layer artifact? If not, which boundaries need to be sharpened first, and what becomes possible — or remains blocked — once they are?

## 1 // Runtime Curation Discretion vs Upstream Setup / Configuration / Prompt-Authoring Discretion

### Distinction

Runtime curation is the moment a candidate is selected from a set of possibilities and elevated into governed asset identity. It is the singular runtime creative-discretionary act the grounding note's *capture as selection* premise names.

Upstream setup / configuration / prompt-authoring discretion is everything earlier: SKU selection, packet authoring, slot configuration, prompt drafting, reference selection, executor weighting of generation criteria. This kind of discretion can be creative and authorship-bearing, but it is not the governed capture seam unless and until it selects and elevates a candidate into governed asset identity.

Both kinds of discretion are real. Only one is curation.

### Worked example

PKT-COLL-001 collection-mode operational test surfaced both, in sequence:

- The SKU swap (CHAIR-002 → CHAIR-003 on the packet) was authorship-bearing setup discretion. ASK changed which constituent the packet would carry; this shaped what would be eligible for later generation and curation.
- Wiring REF-PKT-SKU-009-VISUAL-INVARIANT-002 as the packet-level studio-world reference was authorship-bearing setup discretion.
- Slot-prompt tightening across rounds (round 1 → round 2 explicit framing → round 3 FRAMING REQUIREMENT block) was authorship-bearing setup discretion. Each tightening shaped what the agent could plausibly produce.
- The executor's initial weighting of family coherence + framing cleanliness over hero-product lighting was authorship-bearing setup discretion. It predisposed which round-3 / round-2 candidates the executor surfaced as "best."
- The curator's ranging across the full candidate space (multiple rounds per slot) and selecting on independent criteria — hero-product chair fully lit — overriding the executor's pre-narrowing where the criteria did not match, was the runtime curation event.

The first four reshaped the candidate space. The fifth elevated specific candidates into governed asset identity. The grounding note's *capture as selection* premise locates the governed runtime creative act at the fifth step. The first four are real, creative, authorship-bearing — and not curation.

### Operational consequence

If the term is used precisely:

- **Curation provenance fields** (`curator`, `capture_reason`, `capture_notes`, `source_attachment_id`, `captured_at`, `curation_pattern`) record the curation event. They do not record setup discretion.
- **Setup discretion** is recorded — where it is recorded at all — by separate fields: `slot_prompt` history, packet-level reference linkages, packet field edits. Significant setup decisions that shape candidate eligibility are currently recorded incompletely or not at all.
- **Curation pattern** is determined by the curator's actual judgment process, not by the executor's proposal cardinality. The curator-override correction proved this. Single-candidate-per-slot proposals can produce authorship-bearing curation if the curator weighs candidates across alternatives independently.

If the term is conflated:

- Setup discretion would be inferable from capture provenance, which (per the override correction) it cannot be.
- The architecture would silently re-link `curation_pattern` to setup mechanics, erasing the distinction the *capture as selection* framing protects.
- Authorship-bearing setup decisions would either be invisibly absorbed into curation provenance or invisibly omitted from the architecture entirely. Neither is honest.

The architecture does not currently model setup-discretion provenance as a first-class concern. That is a watchpoint, not a blocker for this pass: setup discretion is currently traceable only inconsistently, through repo evidence notes, prompt/slot mutations where recorded, and Airtable state or history where available; whether it should become a structured concern depends on operational pressure that has not yet been observed.

## 2 // Disciplined Prose vs Structural Representation

### Distinction

Disciplined prose is human-authored language inside a freeform field (`slot_prompt`, `bounded_creative_discretion`, `creative_intent`, `business_intent`, `capture_notes`). It is high-bandwidth for nuance, exclusion, novel constraint formulation, and combinations that would be over-engineered to schematize. It is fragile under verbatim-replication burdens, not machine-readable, and not directly queryable.

Structural representation is a typed field, a link, a lookup, a discrete entity. It is machine-readable, validatable, queryable, and refactor-safe across implementations. It commits the architecture to a representation choice.

Both are legitimate carriers of architectural information. The boundary between them moves with mode, scale, and observed pressure. It is not a doctrine.

### Worked example

PKT-COLL-001 collection-mode operational test pressured the prose carrier on four axes:

- **Inclusion of 1:N constituents.** Carried by prose enumeration in slot_prompt across all three slots. Held cleanly.
- **Exclusion of specific constituents.** Carried by prose exclusion language ("the lamp and bench should NOT appear in frame at all"). Held cleanly on first run after tightening.
- **Constituent identity for SKUs without product_image.** Carried by prose alone, drawing on `material_notes` / `finish_notes` / `identifying_details` text fields. Adequate at four-constituent scale.
- **Cross-slot consistency for prose-only constituents.** Fragile. Required verbatim prose repetition in every slot because each slot generation has no memory of prior slot generations.

For the same packet, structural representation also pressure-tested:

- `products` link from packet → constituent SKUs: durable structural carrier of constituent identity.
- `product_image_lookup_lookup` from slot → constituent SKU's product_image: durable structural carrier of constituent visual identity, independent of slot prompt language.
- Reference attachment from packet → studio-world image: durable structural carrier of packet-level aesthetic anchor.

### Operational consequence

If the term is used precisely:

- **Structural representation earns its keep when** observed operational pressure makes prose insufficient: cross-output coherence brittleness under verbatim-replication burdens, scale where prose enumeration becomes operationally unmanageable, validation/governance/release-readiness checks that need machine-readable structure, recurrence of mode-specific anchoring patterns enough to amortize schema cost, or a specific operational failure that disciplined prose did not prevent.
- **Structural representation does NOT earn its keep when** disciplined prose currently carries the load without observed failure, or when the pattern has been seen at probe-depth only.
- **Decision criterion** is "what failure or scale pressure is currently observed," not "what could go wrong on paper." This rules out designing-ahead-of-pressure for marketing/campaign-mode anchors that have not been operationalized.

If the term is conflated:

- Every paper-predicted strain becomes a candidate for schema mutation, producing schema bloat ahead of operational pressure.
- Conversely, every prose-carried scenario becomes evidence that prose is sufficient generally, producing schema starvation when scale or coherence pressure eventually arrives.

Both failure modes are visible in the project's recent history — the first in the cross-mode probe sweep (which the bounded modeling pass v1 partially deflated), the second as the risk after collection-mode operational test (which this distinction is meant to guard against).

## 3 // Visual Inputs as Fidelity Strategy vs Prose as Fallback / Pressure-Relief

### Distinction

Visual inputs — `product_image` attachments per SKU, reference assets per packet, packet-level studio-world references — are the architecture's fidelity strategy. They are the durable approach to product-truth and aesthetic-truth carrying. They are foundational because images carry higher-bandwidth information than prose.

Prose is a useful capability when visual inputs are unavailable. It is fallback and pressure-relief, not the strategic primitive.

### Worked example

PKT-COLL-001 collection-mode operational test, three of four constituent SKUs lacked product_image attachments:

- SKU-CHAIR-003 had a product_image ✓
- SKU-TABLE-001 had no product_image ✗
- SKU-LAMP-001 had no product_image ✗
- SKU-BENCH-001 had no product_image ✗

Prose carried the table, lamp, and bench credibly at four-constituent scale via `material_notes` / `finish_notes` / `identifying_details` text. The collection findings explicitly say "the clean fix in real-pipeline operation is to attach product_image to every constituent SKU."

### Operational consequence

If the term is used precisely:

- **A test result that says "prose carried this scenario"** is recorded honestly as an incidental capability of the architecture, not as evidence that prose suffices generally.
- **The grounding note's foundational premise** — "prose prompts alone are too lossy for high-fidelity visual systems" — is preserved. Prose-only success does not weaken the visual-inputs-as-foundation framing; it surfaces a useful fallback.
- **Future operationalization defaults** to product_image attachments per constituent. Prose-only carrying is reserved for cases where visual inputs are genuinely unavailable.

If the term is conflated:

- "Prose carried this test" becomes "prose is enough" by extrapolation. The visual-inputs premise is silently weakened by a single operational test.
- The fidelity strategy drifts toward prose-as-primitive because prose-only success accumulates as evidence faster than visual-input wiring does.
- The architecture loses the grounding note's high-bandwidth-images-vs-lossy-prose framing without ever explicitly deciding to.

## 4 // Scoped "Mode-Independent" Language

### Distinction

"The schema is mode-independent at the operational level" is a stronger claim than the evidence currently supports. The defensible claim after PKT-COLL-001: "the same layered shape and the same v1 schema carried a same-category collection-mode operational test in the same base without structural mutation." Cross-base, cross-category, and cross-brand pressure remain untested.

The distinction is the scope of the claim, not whether the architecture has held. The architecture has held under each pressure point so far. It has not been pressured at every boundary that would be required to call it mode-independent in general.

### Worked example

The pressure points the architecture has actually carried:

- SKU-driven Furniture v1 mode: operationalized end-to-end across multiple packets (PKT-SKU-007, PKT-SKU-009, PKT-SKU-010). Same base, same furniture category, same brand context.
- Collection / merchandising mode: operationalized end-to-end on PKT-COLL-001. **Same base** as SKU-driven Furniture v1. **Same furniture category.** **Same brand context.** Four-constituent scale.
- Marketing / message-driven mode: paper-probed only.
- Brand campaign / editorial mode: paper-probed only.

The pressure points the architecture has NOT been tested against:

- Cross-base — every operational test to date has been in the SKU-driven Furniture v1 base.
- Cross-category — every operational test to date has been furniture.
- Cross-brand — every operational test to date has been the same brand context.
- Larger-scale composite anchors — collection mode at four constituents only; ten-, twenty-, forty-constituent scale unknown.
- Marketing-mode composite anchor (subject + message archetype) under operational pressure.
- Campaign-mode composite anchor (campaign concept + family-level continuity) under operational pressure.

### Operational consequence

If the term is used precisely:

- Future repo language uses **scoped claims**: "the layered shape has held under each pressure point so far, and remains under-tested at cross-base / cross-category / cross-brand / larger-scale / marketing / campaign boundaries."
- Milestone closure language reflects evidence scope rather than asserting general mode-independence.
- The bounded modeling pass v1's stable / provisional / not-yet-hardenable triage is read literally: same-base same-category collection mode is in *stable*, but *cross-mode generalization* is in *provisional*.

If the term is conflated:

- "Mode-independent at the operational level" becomes settled vocabulary. Future readers infer that all modes have been operationally tested when only two have, in the same base.
- The cross-base / cross-category / cross-brand boundary disappears from the active question list. The grounding note's top open direction — operationalize a non-SKU mode in a separate base — gets quietly absorbed by a same-base operational test that did not actually pressure that boundary.
- The architecture's mode-independence becomes a claim by repetition rather than by evidence.

## 5 // Approximate Layer Count vs Load-Bearing Inheritance Structure

### Distinction

The cross-mode layered-input note says "six layers and one seam," but the table runs Layer 0 through Layer 6 (seven numbered entries plus the curation seam). The exact count and naming are approximate.

The load-bearing claim is the *structure of inheritance and override* across layers, not the cardinality. Brand-system context inherits down into mode/category, which inherits down into fidelity anchor + rules, which inherits down into packet, which inherits down into slot, which produces candidates, which the curation seam elevates into governed assets. That flow is the architecture. Whether there are six layers or seven is bookkeeping.

### Worked example

The bounded modeling pass v1 §1 matrix places architectural concepts at specific cells:

- Brand system (Layer 0) inherits universal-schema structure across all modes
- Mode/category (Layer 1) shapes how the universal schema is realized for SKU-driven, collection, marketing, or campaign work
- Fidelity anchor + rules (Layer 2) names what the work must remain faithful to (unitary product, composite grouping, message archetype, campaign concept)
- Packet (Layer 3) carries the bounded-discretion / creative-intent / business-intent text plus reference linkages for one work unit
- Slot (Layer 4) carries the slot_prompt and the structural lookup to product images and reference attachments
- Candidates (Layer 5) are generated outputs awaiting curation
- Curation seam (between Layer 5 and Layer 6) elevates one candidate into governed asset identity
- Governed asset (Layer 6) carries five-axis curation provenance plus asset_attachment

Whether this is "six layers and one seam" or "seven layers" or "five layers with brand-system context as an overlay" is a naming choice. The relationships — what inherits from what, what overrides what, where the curation seam sits — are the actual architecture.

### Operational consequence

If the term is used precisely:

- **Future modeling work names layers by what they carry**, not by a numbered progression. "Brand-system context layer," "mode/category layer," "fidelity-anchor layer," "packet layer," "slot layer," "candidate layer," "governed-asset layer" — each name carries a concept rather than a count.
- **Layer count remains approximate** until a specific operational pressure forces a settlement (which would be unusual).
- **Inheritance and override behavior** becomes the focus of architecture work: which layer's value wins when a packet and a slot both specify a constraint? what happens when a brand-overlay rule contradicts a mode-stream default? where does override authority live? These are the load-bearing questions; layer count is not.

If the term is conflated:

- A specific layer count gets canonized prematurely. Future architecture work has to either rationalize the count when it does not fit the next mode (campaign mode, where `products` becomes peripheral, may not use the product-link carrier in the same way SKU mode does), or break the canonization noisily.
- Inheritance and override behavior gets under-specified because attention goes to the count rather than the relationships.

## Aesthetic Layering // Watchpoint Only

The grounding note flags aesthetic as still under-modeled at the layered level: brand, category, product class, packet, slot, plus inheritance and override behavior. The repo currently carries aesthetic primarily through references and prose, not as a defined layered object model.

This is the deepest unresolved architectural problem in the cluster. It is named here as a watchpoint for the next architectural move; it is **not** attempted inside this pass. A worked attempt at aesthetic layering would be a full architectural pass by itself and would either bloat this artifact past one-pass scope or under-treat the aesthetic question.

What the pass observes about aesthetic without attempting to model it:

- Aesthetic appears at multiple layers in evidence: brand-system aesthetic context (implicit, currently unmodeled), mode/category-shaped aesthetic conventions (implicit), packet-level aesthetic via reference attachments, slot-level aesthetic via slot_prompt language and slot-level reference lookups.
- The inheritance and override behavior across these aesthetic layers is unspecified. When packet-level studio-world reference and slot-level slot_prompt both shape aesthetic, which wins? When brand-system context (currently unmodeled) and packet-level reference disagree, what happens?
- The grounding note's prototype-aesthetic guidance is repo-external by design; the question is not what aesthetic the prototype should embody, but what shape *the aesthetic representation itself* should take across the layered architecture.

The aesthetic-layering question is a candidate for the architectural move that follows this pass.

## Exit Criterion // Is The Apex Definition-Layer Artifact Now Writable In One Pass?

**Answer: Partial.**

What is writable in one pass after this vocabulary precision pass: an apex definition-layer artifact at SKU-driven + same-category-collection scope, with the bounded modeling pass v1 matrix consolidated, the curation seam elaborated through the runtime-vs-setup-discretion distinction, the prose-vs-structural-representation boundary specified as movable, and the visual-inputs-as-fidelity-strategy framing preserved.

What is NOT writable in one pass:

1. **Aesthetic layering.** The deepest unresolved architectural problem named in the grounding note. The apex artifact would have to either omit aesthetic (incomplete on the grounding note's own terms) or specify it (premature, given that the aesthetic-layering pass has not happened). Until aesthetic layering is at least sketched, the apex artifact will silently elide a load-bearing dimension.
2. **Marketing-mode and campaign-mode operational evidence.** Both modes have only paper-probe evidence. The apex artifact would speculate about Layer 2 representation for these modes — exactly the speculation the bounded modeling pass v1 explicitly says is "not yet hardenable." A v1 apex artifact would have to either omit these modes (a SKU + same-category-collection apex), or speculate about them (premature representation choices).
3. **Cross-base / cross-category / cross-brand pressure.** No evidence carrying it. Same-base same-category collection-mode operational test does not pressure this boundary. The apex artifact would either claim mode-independence at a scope the evidence does not support, or scope its claims to the current evidence (a same-base same-category apex).

### What ASK chooses between

- **A1: Write a v1 apex definition-layer artifact at SKU + same-category-collection scope, with named limitations.** Aesthetic layering named-not-modeled. Marketing and campaign mode named-not-detailed. Cross-base / cross-category / cross-brand boundary explicitly held as open.
- **A2: Defer apex until aesthetic layering is at least sketched.** Run an aesthetic-layering pass first (analogous to this vocabulary pass and the bounded modeling pass v1 in posture), then attempt the apex artifact afterward.
- **A3: Defer apex until marketing or campaign mode is operationalized in a real base.** Cross-base / cross-category / cross-brand pressure becomes available; the apex artifact then writes itself across more of the four-mode space.
- **A4: Some sequenced combination.** The natural sequencing options are A2-then-A1 (aesthetic sketch first, then narrow apex), A3-then-A1 (cross-base evidence first, then apex), or A2-then-A3-then-A1 (longest, most thorough).

This is the directional fork the bounded modeling pass v1 named at high level and that this pass has now sharpened. The choice is for ASK directional input.

## What This Pass Did NOT Do

- Did not author the apex definition-layer artifact.
- Did not attempt to model aesthetic layering.
- Did not mutate any schema.
- Did not mutate Airtable.
- Did not open a new prototype chain.
- Did not rewrite [`docs/architecture.md`](architecture.md), [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md), or [`docs/architecture-bounded-modeling-pass-v1.md`](architecture-bounded-modeling-pass-v1.md).
- Did not edit the README, the index, or any worked-example artifact.
- Did not authorize any next path; the directional fork in the Exit Criterion remains held for ASK input.
- Did not finalize the layer count, the universal-schema sub-element list, or the worked-example mode taxonomy.

## Anchor Documents

- [`docs/architecture.md`](architecture.md): three-layer architecture model and current ontology direction
- [`docs/architecture-bounded-modeling-pass-v1.md`](architecture-bounded-modeling-pass-v1.md): prior bounded modeling pass — three-layer-vs-layered-operational reconciliation, composite-anchor pressure, prose-vs-structural-representation boundary first named
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): layered operational model and curation event as first-class governance act
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): collection-mode operational test, including the curator-override correction that the runtime-vs-setup-discretion distinction extends
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): introduced `human-cross-round-authorship-bearing-curation` curation_pattern value
- [`docs/cross-mode-probe-marketing-message-driven-v1.md`](cross-mode-probe-marketing-message-driven-v1.md): paper-only probe — marketing mode
- [`docs/cross-mode-probe-collection-merchandising-v1.md`](cross-mode-probe-collection-merchandising-v1.md): paper-only probe — collection mode (whose strain hypothesis was partially deflated by the operational test)
- [`docs/cross-mode-probe-brand-campaign-editorial-v1.md`](cross-mode-probe-brand-campaign-editorial-v1.md): paper-only probe — campaign mode
- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): v1 sweep closure plateau
