# Architecture // Bounded Modeling Pass v1

## Purpose

This is a bounded architecture modeling pass against the current evidence on `main`. It is deliberately narrow in scope: one model attempt, no schema mutation, no prototype, no canonization.

It is not the canonical definition-layer artifact. That artifact is held until the modeling pass produces enough clarity to write it in a single pass. The intermediate step is judgment, not automation.

It does not supersede [`docs/architecture.md`](architecture.md) or [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md). Those remain authoritative for their subject matter.

## Posture

The corrective principles this pass operates under, surfaced by the first prototype phase and reaffirmed by the v3 repo critique:

```text
architecture attempt before prototype ceremony
vocabulary deconstruction before architectural commitment
```

```text
one model attempt
one artifact
no schema
no prototype
no canonization
```

Permission to be wrong is part of the method.

## Architectural Question

What does the current evidence — SKU operationalized end-to-end, collection operationalized end-to-end, marketing and campaign paper-probed only — actually say about the shape of the architecture, when:

- the three-layer architecture model and the layered operational information model are read together rather than as competitors
- the composite-anchor strain hypothesis has been partially deflated by collection-mode operational evidence
- the disciplined-prose vs structural-representation boundary has become the next architecture question
- the curator-override correction proved that `curation_pattern` is determined by the curator's actual judgment process, not by proposal cardinality

## 1 // Reconciliation: Three-Layer Model And Layered Operational Model

### Sources

- Three-layer model — [`docs/architecture.md`](architecture.md): universal schema / workflow-stream variants / brand-specific policy overlays.
- Layered operational model — [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): brand system → mode/category → fidelity anchor and rules → packet → slot → candidates / curation event seam / governed asset.

### How they relate

The two models describe orthogonal dimensions, not competing schemas.

- **Three-layer model**: where structure lives across the schema's organization. Universal structure that holds across modes; mode-shaped variants of that structure; brand-shaped overlays on top.
- **Layered operational model**: how information flows at runtime from upstream sources down to a governed asset, with the curation event as the singular runtime creative-discretionary act.

Read together, the architecture is a matrix:

```text
                     Layer 0  Layer 1  Layer 2  Layer 3  Layer 4  Layer 5  →seam→  Layer 6
universal schema     [    ]   [    ]   [    ]   [    ]   [    ]   [    ]            [    ]
workflow-stream      [    ]   [    ]   [    ]   [    ]   [    ]   [    ]            [    ]
brand overlay        [    ]   [    ]   [    ]   [    ]   [    ]   [    ]            [    ]
```

Each cell is a place information *can* live. Most cells are empty in any given implementation; the matrix is descriptive, not prescriptive.

Example: in collection mode, the grouping pressure lives at workflow-stream / Layer 2; the specific four-item calm-living-room grouping lives at packet / Layer 3; the exact inclusion / exclusion instructions live at slot / Layer 4; the governed selected asset lives at Layer 6.

### What this reconciliation surfaces

- The three-layer model is about **the schema's organization**. It answers: where does this concept live across universal / mode-shaped / brand-shaped tiers?
- The layered operational model is about **the runtime information flow**. It answers: where does this datum live as it flows toward a governed asset?
- These dimensions are independent. The architecture work is the matrix, not either model alone.

### Stable / provisional / not-yet-hardenable

- **Stable.** The orthogonality of the two models. They are not competing for "which is the real architecture" — they describe different dimensions and both are needed.
- **Stable.** Layer 1 (mode/category) and Layer 2 (fidelity anchor + rules) as distinct. Mode names *the kind of governing pressure*; fidelity anchor names *what the work must remain faithful to*. The cross-mode pressure-test confirmed these resolve to different content per mode.
- **Provisional.** The exact count and naming of layers in the operational model. The cross-mode note says "six layers and one seam" but the table runs Layer 0 through Layer 6 (seven numbered entries). The count is approximate; the *structure of inheritance and override* is the load-bearing claim, not the layer cardinality.
- **Provisional.** The substructure of each universal-schema concept (intent → business / creative; inputs → source / supplied / contextual / reference; constraints → hard / bounded-discretion / exclusion / reference; governance → validation / approval / override). Tentative substructure direction in [`docs/architecture.md`](architecture.md) is provisional, not finalized ontology.
- **Not yet hardenable.** A canonical layer count, a closed set of universal-schema sub-elements, a doctrine that any future schema must populate every cell of the matrix. The matrix is descriptive of where information *can* live, not a checklist.

## 2 // Composite-Anchor Pressure Across Four Modes

### Current state per mode

| Mode | Layer 2 anchor type | Operational status | Composite-anchor pressure carried by |
|---|---|---|---|
| SKU-driven | Unitary (one product) | Operationalized end-to-end (PKT-SKU-007, PKT-SKU-009, PKT-SKU-010) | `products` link + `product_image` attachment lookup; no composite anchor needed |
| Collection / merchandising | Composite (constituent items + grouping archetype + relational rules) | Operationalized end-to-end (PKT-COLL-001) | Disciplined prose in `slot_prompt` enumerating constituents; partial product-image anchoring per constituent |
| Marketing / message-driven | Composite (subject + message archetype) | Paper-probed only | Predicted: structured message-bearing-element fields. Not yet operationally tested. |
| Brand campaign / editorial | Composite (campaign concept + family-level continuity) | Paper-probed only | Predicted: campaign-concept entity; `products` peripheral. Not yet operationally tested. |

### What collection-mode operational evidence changed

The cross-mode probe sweep at probe-depth identified Layer 2's composite-anchor representation as **the most consistent strain across all three non-SKU probes**. The collection-mode operational test pressured this strain in real generation/curation/governance flow and found:

- Prose enumeration in `slot_prompt` carried 1:N constituent inclusion cleanly across three slots
- Prose carried exclusion as well as inclusion
- Prose carried fidelity for constituent SKUs that had no `product_image` attachment
- Cross-slot consistency for prose-only constituents requires verbatim repetition (no schema-enforced consistency)
- The clean fix in real-pipeline operation is to attach `product_image` to every constituent SKU, replicating the SKU-mode discipline

The strain hypothesis was **partially deflated by operational evidence**. Composite-anchor schema mutation is *less* earned now than it was after the paper probe.

### What that does NOT establish

The deflation is partial, not total. Three boundaries survive:

- Collection mode operationalized in **the same furniture base** with the same brand context; the strain hypothesis at the cross-base / cross-category boundary remains untested.
- Marketing-mode and campaign-mode composite anchors (message archetype; campaign concept) have **not** been operationalized in any base. Their structural strain remains a paper prediction.
- Collection mode worked at four-constituent scale. Whether disciplined prose holds at ten-, twenty-, or forty-constituent scale is unknown.

### Stable / provisional / not-yet-hardenable

- **Stable.** Layer 2 is the fidelity-bearing layer. The anchor can be unitary or composite. Composite anchors have named composition kinds that vary by mode.
- **Stable.** The four-mode comparison from [`docs/four-mode-truth-and-constraint-pressure-note.md`](four-mode-truth-and-constraint-pressure-note.md) and the cross-mode probe sweep: composite anchors recur across the three non-SKU modes in mode-specific shapes.
- **Provisional.** Whether composite anchors require structured representation in the schema, or whether disciplined prose is sufficient. The boundary is operationally fluid (see Section 3).
- **Not yet hardenable.** A first-class `grouping_archetype` schema is weakened by collection operational evidence. `messages` and `campaign_concept` remain paper-predicted pressures only; neither is strengthened enough for schema, but neither has been operationally deflated yet. The schema would have to be earned by observed operational pressure on disciplined prose, not by paper prediction alone.

## 3 // The Disciplined-Prose vs Structural-Representation Boundary

### What the boundary is

In any layered information system, the same datum can be carried by:

- **Structural representation**: a typed field, a link, a lookup, a discrete entity. Machine-readable, validatable, queryable, refactor-safe across implementations.
- **Disciplined prose**: human-authored language inside a freeform field (`slot_prompt`, `bounded_creative_discretion`, `creative_intent`, `business_intent`). High-bandwidth for nuance; not machine-readable; fragile under verbatim-replication burdens.

Both have legitimate roles. The architecture question is not "which one wins" but "where is the boundary, for which mode, at what scale, under which coherence pressures."

### What the operational evidence says

The collection-mode test established that prose is **more capable than the paper probe predicted** on three axes: inclusion, exclusion, and fidelity carrying without product-image attachments. It also established that prose is **fragile** on one axis: cross-slot consistency without machine-enforced anchoring.

The structural representation earns its keep when:

- Cross-output coherence is load-bearing and prose verbatim-replication is brittle
- Constituent set is large enough that prose enumeration becomes operationally unmanageable
- Mode-specific anchoring patterns recur enough to amortize schema cost across many packets
- Validation / governance / release-readiness checks need machine-readable structure
- A specific operational failure has happened that disciplined prose did not prevent

Structural representation is **unearned** when:

- Disciplined prose currently carries the load without observed failure
- The pattern has been seen at probe-depth only, not under operational pressure
- Adding structure now would harden a representation choice the architecture is not yet ready to commit to

### What the boundary is NOT

- It is not a doctrine. The boundary is mode-shaped, scale-shaped, and pressure-shaped. It moves.
- It is not a permanent claim that prose is sufficient for everything. Collection-mode operational evidence is one data point; marketing and campaign modes have not produced operational evidence.
- It is not an argument against the composite-anchor schema mutation. It reframes that mutation as conditional on operational pressure modes — failure, brittleness, scale cost, validation need, or queryability burden — that have not yet been observed.

### Stable / provisional / not-yet-hardenable

- **Stable.** Both prose and structural representation exist in the architecture. Both are legitimate. Layer 3's `bounded_creative_discretion`, `creative_intent`, `business_intent` text fields and Layer 4's `slot_prompt` text are durable carriers; Layer 4's `products` link, Layer 4's `product_image_lookup_lookup`, and Layer 4's reference attachment are durable structural slots.
- **Stable.** The principle: structural representation should be earned by observed operational pressure — failure, brittleness, scale cost, validation need, or repeated queryability burden — not by paper prediction alone.
- **Provisional.** The exact location of the boundary for collection mode at larger scale, for marketing mode at any scale, for campaign mode at any scale.
- **Not yet hardenable.** A general doctrine of when structure earns its keep. The boundary is contextual; codifying it would over-fit.

## 4 // Curation Pattern As Judgment-Process Descriptor

### What the override correction surfaced

The collection-mode operational test recorded an initial finding that "curation pattern compressed naturally to `agent-proposed-human-ratified`" because each slot had one candidate per round. After ASK overrode 2 of 3 of the executor's picks on independent judgment criteria (hero-product chair fully lit), the curation pattern on all three rows was corrected to `human-cross-round-authorship-bearing-curation`.

The corrected reading: **curation_pattern is determined by the curator's actual judgment process across the candidate space available, not by the executor's proposal cardinality.**

- Single-candidate-per-slot proposals can produce authorship-bearing curation if the curator weighs the candidate against alternatives independently and overrides where they do not match.
- Multi-candidate proposals can produce confirmation-bearing approval if the curator just ratifies the executor's pre-narrowing.
- The pattern is about *what kind of judgment happened*, not *what kind of slate was presented*.

### Why this is load-bearing architecture, not procedural cleanup

The grounding note's *capture as selection* premise treats curation as the singular runtime creative-discretionary act. If `curation_pattern` is determined by setup mechanics (cardinality of proposals, presence vs absence of pre-narrowing), then the system's expression of creative authorship would be inferable from configuration. It is not.

The pattern records what the curator actually did. The architecture must remain legible enough to record this honestly across delegation patterns from full agentic narrowing through human authorship-bearing selection. Inferring the pattern from setup would erase exactly the distinction the *capture as selection* framing protects.

### What this implies for the schema

- The five `curation_pattern` enum values describe judgment process, not setup mechanics. Their role is correct.
- Recording the pattern requires capturing what the curator actually did. The curation-event provenance fields (`captured_at`, `capture_reason`, `capture_notes`, `source_attachment_id`) plus `curator` plus `curation_pattern` together form the load-bearing record.
- The `curator` field's *by whom* axis identifies the judgment surface. When the curator ranges across alternatives independently, the field text should express selection / curation / authorship-bearing language; when the curator ratifies a pre-narrowed default, the field text should express ratification language.
- The fields-on-`generated_assets` representation is sufficient for v1. A first-class `curation_events` entity is a watchpoint, not a current need.

### Stable / provisional / not-yet-hardenable

- **Stable.** Curation event as first-class governance act. Curation-event provenance fields, including `curator`, plus `curation_pattern`. Curation pattern as a judgment-process descriptor.
- **Stable.** The principle: pattern follows curator behavior, not proposal cardinality.
- **Provisional.** Whether the five enum values are exhaustive across modes that have not been operationalized.
- **Provisional.** Whether the curation event remains modeled as fields on `generated_assets`, or migrates to a first-class entity. Sufficient for v1; pressured by future cross-output coherence work, multi-curator delegation, or curation that ranges across multiple slots simultaneously.
- **Not yet hardenable.** A `curation_events` table now. Not earned by current operational load. Add only if cross-output coherence work begins to require multi-row event records.
- **Not yet hardenable.** The link between proposal cardinality and curation pattern. The override correction proved this link is not real; future architecture should not silently restore it.

## 5 // Marketing And Campaign Modes // Paper-Probed Only

### What is established

- The cross-mode probe sweep showed both modes' Layer 2 fidelity anchors are composite, in mode-specific shapes (subject + message archetype; campaign concept + family-level continuity).
- The cross-mode probe surfaced that `products` becomes peripheral in campaign mode.
- The cross-mode probe identified review-board-shaped curation as appropriate for campaign mode at packet level.

### What is NOT established

- Whether the predicted strain points become operational blockers at any scale.
- Whether disciplined prose is sufficient for these modes, as it was for collection mode at four-constituent scale.
- Whether marketing-mode message-bearing elements (offer text, brand identifier presence, callout emphasis) need structured representation, or carry as prose.
- Whether campaign-mode family-level continuity references need first-class linkage, or carry as approved-reference attachments.
- How any of these modes interacts with cross-base / cross-category / cross-brand pressure.

### Stable / provisional / not-yet-hardenable

- **Stable.** The architecture survived paper pressure across all four modes without structural mutation. The same layered shape applies at probe-depth.
- **Provisional.** Marketing-mode and campaign-mode anchor representation, slot input plurality patterns, and curation depth at scale.
- **Not yet hardenable.** Any marketing- or campaign-specific schema element. Predictions are too thin; the deflation of the collection-mode strain hypothesis under operational pressure is a warning that paper predictions can overstate strain. Operational evidence is required.

## 6 // Stable / Provisional / Not-Yet-Hardenable Summary

Consolidated across the five sections. This is a snapshot of where the architecture currently sits, not a finalization.

### Stable

- Three-layer model and layered operational model are orthogonal dimensions of one architecture, not competing schemas
- Layer 1 (mode/category) and Layer 2 (fidelity anchor + rules) as distinct
- Layer 2 anchors can be unitary or composite; composite anchors recur in mode-specific shapes
- Both disciplined prose and structural representation are legitimate carriers; the boundary moves
- Curation event as first-class governance act, with curation-event provenance fields including `curator`, plus `curation_pattern`
- Curation pattern is determined by the curator's actual judgment process, not by proposal cardinality
- The same layered shape has held across all four modes at probe-depth, and across SKU + collection operationally; per-mode differences currently appear to be content / pressure differences rather than structural breaks
- Structural representation should be earned by observed operational pressure — failure, brittleness, scale cost, validation need, or repeated queryability burden — not by paper prediction alone

### Provisional

- The exact count and naming of layers in the operational model
- The substructure of each universal-schema concept (intent / inputs / constraints / orchestration / outputs / governance)
- Whether composite anchors require structured representation, for which modes, at what scale
- The exact location of the disciplined-prose vs structural-representation boundary for each mode
- Whether the five `curation_pattern` enum values are exhaustive across modes not yet operationalized
- Whether curation event migrates from fields-on-`generated_assets` to a first-class entity
- The four worked-example modes themselves; they are exemplars under which the architecture has been pressured, not a closed taxonomy

### Not Yet Hardenable

- A canonical layer count or sealed set of universal-schema sub-elements
- A first-class `grouping_archetype` schema (weakened by collection operational evidence); `messages` and `campaign_concept` first-class schema (paper-predicted pressures only — neither strengthened enough for schema, neither operationally deflated yet)
- A general doctrine of when structure earns its keep over prose
- A `curation_events` first-class entity table
- The link between proposal cardinality and curation pattern (override correction proved it is not real)
- Any marketing- or campaign-specific schema element (operational evidence is absent)
- The four worked-example modes as a closed taxonomy
- A canonical apex definition-layer artifact written from this pass alone — that artifact remains held until the modeling has produced enough clarity for it to write itself in a single pass

## What This Pass Did NOT Do

- Did not author the canonical definition-layer artifact
- Did not mutate Airtable
- Did not mutate any schema
- Did not open a new prototype chain
- Did not rewrite [`docs/architecture.md`](architecture.md)
- Did not finalize a layer ontology, mode taxonomy, or universal-schema sub-element list
- Did not authorize any next path; held threads remain held

## Anchor Documents

- [`docs/architecture.md`](architecture.md): three-layer architecture model and current ontology direction
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): layered operational model and curation event as first-class governance act
- [`docs/four-mode-truth-and-constraint-pressure-note.md`](four-mode-truth-and-constraint-pressure-note.md): four-mode pressure comparison
- [`docs/shared-vs-mode-weighted-pressure-note.md`](shared-vs-mode-weighted-pressure-note.md): shared versus mode-weighted pressure
- [`docs/cross-mode-probe-marketing-message-driven-v1.md`](cross-mode-probe-marketing-message-driven-v1.md): marketing-mode paper probe
- [`docs/cross-mode-probe-collection-merchandising-v1.md`](cross-mode-probe-collection-merchandising-v1.md): collection-mode paper probe (whose strain hypothesis the operational test partially deflated)
- [`docs/cross-mode-probe-brand-campaign-editorial-v1.md`](cross-mode-probe-brand-campaign-editorial-v1.md): campaign-mode paper probe
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): collection-mode operational test findings, including curator-override correction
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): introduced `human-cross-round-authorship-bearing-curation` curation_pattern value
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): coordinated fresh-generation full-flow pattern that the collection-mode operational test mirrored
- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): v1 sweep closure plateau
