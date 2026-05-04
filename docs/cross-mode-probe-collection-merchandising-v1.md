# Cross-Mode Probe // Collection / Merchandising Mode v1

## Purpose

This artifact pressures the existing SKU-driven Furniture v1 schema and architecture against a concrete collection / merchandising scenario. It is the second cross-mode application probe, following the marketing / message-driven probe ([`docs/cross-mode-probe-marketing-message-driven-v1.md`](cross-mode-probe-marketing-message-driven-v1.md)).

The architectural question: **does the current implementation hold when applied to a scenario whose load-bearing creative judgment is *relational truth* across grouped items, rather than single-item truth or message-bearing signal persistence?**

Outcome: **Holds at the structural level. Strains exclusively at the slot-input plurality layer — and surfaces a sharper finding than the marketing probe did: the strain is more concrete, the workaround is less clean, and the probe brings the schema mutation closer to operational justification without quite earning it yet.**

This is a sketch, not doctrine. It does not authorize schema mutation, taxonomy settlement, or new Airtable work.

## Architectural Anchor

The cross-mode layered-input model ([`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md)) pressure-tested collection mode on paper, surfacing:

- Layer 1 governing pressure: **relational truth, adjacency**
- Layer 2 fidelity anchor: **composite (constituent items + grouping archetype + relational rules)**
- Slot input plurality: **plural product references (one per constituent)**
- Curation: per-slot plus heavier coherence verification
- Governed asset subject identity: **grouped set**

The on-paper analysis identified a possible schema implication: **plural slot-input fields**. The current `output_slots.product_image_lookup_lookup` is singular — and that singularity is most directly pressured in collection mode, where a single slot's fidelity anchor genuinely needs to point at multiple products.

The placeholder collection packet ([`docs/application/examples/placeholder-collection-merchandising-workflow-packet-example.md`](application/examples/placeholder-collection-merchandising-workflow-packet-example.md)) gives a furniture-brand instance (sofa + coffee table + accent chair). This probe pivots the brand context — to a direct-to-consumer everyday-essentials apparel brand archetype — to surface what changes when the *category* shifts away from where the placeholder lives, and what's left when only the *grouping mechanism* is doing the work.

## Probe Setup

### Brand Archetype

A direct-to-consumer everyday-essentials apparel brand whose core brand value is **everyday quality + material honesty + design restraint** — same archetype space as the marketing probe, deliberately, to isolate the *mode* variable. The collection probe tests whether the schema holds for grouping pressure when other architectural variables stay constant.

Per repo brand-name avoidance: the archetype is described by its abstract qualities. It is informed by public-reference brands in the apparel space without naming them in this artifact.

### Concrete Scenario

A spring 2026 **capsule wardrobe edit** — five constituent pieces curated as one coordinated set:

- a fine-knit t-shirt (white)
- a relaxed button-down (sand)
- a tailored ankle-length pant (charcoal)
- a leather-and-recycled-material flat (cream)
- a fine-knit cardigan (warm grey)

The five SKUs are presented as a coordinated capsule — the merchandising story is that these five pieces work together as a complete spring wardrobe foundation. The asset family must read as one intentional set, not five colocated products.

| Output slot | What it must carry |
|---|---|
| **HERO_CAPSULE_STYLED** | The full five-piece set styled on a model or styled mannequin / dressform; relational truth across all five items must read clearly |
| **HERO_CAPSULE_FLAT** | Flat-lay arrangement of all five pieces; same relational truth from a different presentation |
| **DETAIL_PAIRING** | A two-item or three-item pairing detail (e.g., t-shirt + cardigan) that reinforces the capsule's tonal logic without breaking it into individual SKUs |

Three slots, all of which are *collection-mode slots* — each slot's fidelity anchor is multiple SKUs, not one. This is the cleanest collection-mode pressure test: there is no SKU-mode slot in the packet to fall back on.

### Why This Probe

- **Tests the schema's most pressured collection-mode strain point.** Slot-input singularity is the on-paper layered-input model's most concrete schema implication. This probe puts that strain under a real-feeling scenario.
- **Same brand archetype as the marketing probe, different mode.** Isolates the mode variable.
- **Apparel rather than furniture (where the placeholder lives).** Tests category-agnosticism for collection mode specifically.
- **All slots are collection-mode slots.** No mixed packet to soften the strain.

## Mapping Attempt

### `workflow_packets` (existing entity)

Maps cleanly. The packet represents `Spring 2026 Capsule Wardrobe Edit`. The packet carries the bounded creative discretion declaration (relational logic, tonal vocabulary, allowed styling latitude), the approved references (brand visual rules, prior capsule work, fit references), and the required output set (the three slots above).

The packet shape from SKU mode survives intact.

### `products` (entity holds with multiplicity)

Holds. Five concrete SKUs link to the packet — one per constituent. This is structurally identical to how PKT-SKU-009 had multiple SKUs in scope; the difference is in how those products are *consumed* by slots.

In SKU mode, each slot is anchored to *one* product. In collection mode, each slot is anchored to a *subset* of the packet's products (HERO_CAPSULE_STYLED references all five; DETAIL_PAIRING references two or three). The slot–product relationship is no longer 1:1.

### `output_slots` (entity strains — concretely)

Strains, more concretely than in the marketing probe.

The current schema has `output_slots.product_image_lookup_lookup` as a singular reference. To support the collection-mode three-slot example above:

- HERO_CAPSULE_STYLED needs to point at five products as the fidelity anchor
- HERO_CAPSULE_FLAT needs to point at the same five products
- DETAIL_PAIRING needs to point at two or three products (a subset)

Two possible mappings without schema mutation:

1. **Encode the multi-product anchor in `slot_prompt` text.** The slot still references one "lead" product through the existing field, and the prompt names the other constituent SKUs in prose. This works operationally but loses the structural relationship between the slot and the additional products. Querying "which slots reference product X" becomes prose-search, not relational query. Adjacency rules cannot be expressed structurally.

2. **Decompose the slot.** Treat the styled hero as a *packet-level* concept and have the actual `output_slots` rows carry a single representative anchor each, with the multi-SKU truth carried at packet-level prose. This is a semantic loss — the slot is no longer the row that carries the production obligation, and the packet field has to carry obligation that should live one layer down.

Both workarounds work. Both are noticeably worse than a structured plural reference field on `output_slots`. The marketing probe could route message-bearing elements through `slot_prompt` prose without much loss; the collection probe cannot route plural product references through prose without genuine query-ability loss.

This is the sharpest schema implication surfaced across the cross-mode probes so far. **Plural slot-input fields are closer to operational justification in collection mode than in marketing mode.** Still not earned by current pressure (no marketing or collection mode is operationalized in Airtable yet), but the *kind* of pressure it would take is now more concrete.

### `reference_assets` (entity holds with content shift)

Holds. The reference asset entity already accommodates plural references per slot. In collection mode, references include:

- the five SKUs (each with its own product imagery)
- relational-archetype references (prior capsule edits with the desired tonal coherence)
- styling references (model-pose, flat-lay arrangement, pairing logic)
- brand visual rules

The structural pattern holds. What differs from SKU mode is that *each constituent SKU* now needs reference imagery on the slot, not just the lead product. This compounds the pressure on the singular `product_image_lookup_lookup` field — the slot's product anchor is a set, not a single value, and that set's imagery is what fidelity is measured against.

### `generated_assets` with five-axis curation provenance (entity holds)

Holds cleanly. Same five fields. What changes is the *content* of `capture_reason` — collection-mode reasons trend toward relational language: "scale relationships read clearly," "pairing logic legible," "no single SKU dominates," "set reads as intentional grouping."

`asset_role` likely needs richer values in collection mode. The placeholder has `HERO`, `PROFILE`, `DETAIL` for SKU mode; collection might use `STYLED_GROUP`, `FLAT_LAY`, `PAIRING_DETAIL` or similar. The existing single-select can hold either set; this is content discipline, not schema strain.

### `curation_pattern` (enum holds)

Holds. The five existing values are mode-independent. Collection-mode curation primarily uses `human-cross-round-authorship-bearing-curation` because the relational judgment is hard to delegate algorithmically — but the pattern is mode-independent in form, only mode-specific in distribution.

### `asset_attachment` (field holds cleanly)

Holds. The self-contained governed-asset pattern is mode-independent. A collection-mode asset's attachment carries the styled-set image with the same independence from slot mutation that SKU-mode and marketing-mode assets have.

### Family Coherence (concept holds, content shifts again)

Family coherence in collection mode means: do the three slots' assets read as one capsule edit, with the same five SKUs presented through complementary styling logic across the three formats?

This is *heavier* coherence pressure than SKU mode (where coherence is mostly about single-SKU consistency across HERO/PROFILE/DETAIL) and *lighter* than brand-campaign mode (where coherence spans many editorial moments). It matches the on-paper layered-input model's "per-slot plus heavier coherence verification" framing exactly.

The implementation-vs-conceptual goal distinction carries: a collection round can pass implementation (three slots filled with plausible assets) while failing conceptual (the assets don't actually read as one capsule — too many tonal outliers, scale relationships off, pairing logic unclear). Same structure, different content.

## Hypothetical Curation Walk-Through

Sketching qualitatively (no actual generation performed):

### HERO_CAPSULE_STYLED (model or dressform)

Candidates likely range across:
- Cand 1: model wearing all five pieces; pose lively but flat reads "fashion editorial" — too narrative for a capsule edit
- Cand 2: model wearing all five; pose neutral, all pieces visible; reads "credible capsule" — clean
- Cand 3: model wearing four pieces, fifth held in hand; relational logic broken
- Cand 4: dressform with all five pieces layered; technically faithful but feels merchandising-store-window — material honesty muted
- Cand 5: model wearing all five; pose neutral, but cardigan obscures button-down too much; one piece's role unclear

Curation event: pick Cand 2. `capture_reason`: "all five pieces clearly readable; relational logic present; tonal vocabulary holds; no single piece dominates the set; reads as capsule, not editorial."

### HERO_CAPSULE_FLAT

Different format, same fidelity anchor (the five SKUs). Curation event picks the flat-lay where all five pieces are visible, scale relationships are honest, and the arrangement reads as curated rather than catalog-grid.

### DETAIL_PAIRING

Two- or three-item subset. Curation picks the candidate where the pairing reinforces the capsule's tonal logic without becoming an ad for those specific pieces. This is the slot most likely to drift toward SKU-mode framing if the curator isn't careful.

### Coherence Verification (review-shaped)

After per-slot curation: review-board step verifies that the three picked assets read as one capsule. Heavier than SKU-mode coherence — the reviewer is asking "does this *set* read as one curated edit," not "is this SKU rendered consistently."

## Findings

### 1. Architectural shape holds across the mode shift

The six-layer model + curation seam + five-axis provenance + asset_attachment pattern survives translation into collection mode without structural change. Same finding as the marketing probe; same on-paper prediction.

### 2. The slot-input plurality strain is sharper here

The marketing probe found that freeform `slot_prompt` text could carry message-bearing elements with content discipline, at the cost of query-ability. The collection probe finds that the same workaround for plural product references is *worse*: it loses structural relationships between slots and constituent products, breaks adjacency-rule expression, and pushes obligation up to packet-level prose where it doesn't belong.

This is not a mutation authorization. It is an honest statement that **collection mode is the strongest case the architecture has produced for plural slot-input fields**. Marketing mode justifies the same direction less sharply.

### 3. Other strains from the marketing probe re-confirm

The composite fidelity-anchor finding from the marketing probe also surfaces here, but in a different shape:

- Marketing: composite is *subject + message archetype*
- Collection: composite is *constituent items + grouping archetype + relational rules*

Both are composite anchors. The marketing case suggested a possible `messages` or `briefs` entity; the collection case suggests structured representation of the *grouping archetype* and *relational rules*. The unification: **Layer 2's composite anchor needs more structured representation across multiple modes.** Whether that lives in a new entity, in structured packet fields, or stays as packet prose remains open.

### 4. Selection-axis remains relevant but not sharper

Collection-mode curation primarily judges relational coherence and adjacency-rule fit. Same content shift in `capture_reason` text as the marketing probe surfaced for message-fit. A `selection_axis` enum would classify either dimension. Held; not earned.

### 5. Slot-product cardinality becomes structurally interesting

In SKU mode, the slot-product relationship is 1:1. In marketing mode, it's still mostly 1:1 (the slot references one SKU, with messages layered separately). In collection mode, it's 1:N (one slot references N constituent SKUs).

This cardinality shift is the underlying structural reality the schema implication surfaces. The current `output_slots` row carries a 1:1 assumption that does not hold cross-mode. Whether to surface this as a junction table, a multi-select, or a true plural lookup is a schema-design decision that current pressure does not force.

### 6. Category-agnostic confirmation, again

Pivoting from furniture (where the placeholder lives) to apparel surfaced no category-specific strain. Collection mode behaves the same in apparel as it does in furniture. The implementation is category-agnostic, as designed.

### 7. The on-paper layered-input model's most concrete schema implication is now most concretely justified

The on-paper model's strongest schema implication was plural slot-input fields. The marketing probe softly justified it. The collection probe sharply justifies it. Across two probes, the same implication is becoming closer to earned — without yet being earned by *operational* load.

If a future cross-mode application stands up an Airtable base, collection mode is the one where plural slot-input fields would be most clearly load-bearing from day one.

## What This Probe Does Not Do

- authorize Airtable schema mutation
- stand up a collection-mode Airtable base
- run actual generation against the brand archetype
- close the cross-mode application sweep
- supersede the cross-mode layered-input model note
- claim plural slot-input fields are earned by current pressure (they are not, yet)
- name any real brand in repo artifacts (per the brand-name avoidance rule)

## Open Questions / Next Pressure Points

1. **Whether to stand up a collection-mode Airtable base for full-flow operational testing.** This probe is paper-only. A full-flow operational test would surface whether the slot-input singularity becomes an operational blocker or remains a content-discipline matter. Of the three modes that have been probed at this depth (SKU, marketing, collection), collection mode is the strongest case for that operational test.

2. **Whether plural slot-input fields should be encoded in the schema.** Held; closer to earned than after the marketing probe, but still not earned by current operational pressure. Two probes have now sharpened the case in different directions.

3. **Whether structured representation of grouping archetype + relational rules should be a first-class element of collection-mode packets.** Held. Same shape of finding as the marketing probe's `messages` or `briefs` question — a possible new entity for Layer 2's composite anchor when composite is the right model.

4. **Brand campaign / editorial mode probe.** Final remaining cross-mode probe in the v1 sweep. Different pressure again — campaign-arc coherence at scale, editorial voice as load-bearing, broader bounded latitude.

5. **Whether mixed-mode packets are operationally real.** A packet might naturally combine collection-mode slots (the styled hero) with SKU-mode slots (individual product crops of the same constituents). The current schema would handle this awkwardly because the slot row carries different cardinality assumptions per slot type. Held; not surfaced by current scenarios.

## Anchor Documents

- [`docs/cross-mode-probe-marketing-message-driven-v1.md`](cross-mode-probe-marketing-message-driven-v1.md): the first cross-mode probe (marketing / message-driven)
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): on-paper four-mode pressure-test that the probe series concretizes
- [`docs/application/examples/placeholder-collection-merchandising-workflow-packet-example.md`](application/examples/placeholder-collection-merchandising-workflow-packet-example.md): existing furniture-brand collection-packet placeholder
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): introduced the implementation-vs-conceptual goal distinction (carries fully cross-mode)
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): introduced asset_attachment field (carries fully cross-mode)
- [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](curation-event-schema-mutation-sku-driven-furniture-v1.md): original four-axis provenance schema move
- [`docs/milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md`](milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md): SKU-driven Furniture v1 plateau
