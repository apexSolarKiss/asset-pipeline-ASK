# Cross-Mode Probe // Marketing / Message-Driven Mode v1

## Purpose

This artifact pressures the existing SKU-driven Furniture v1 schema and architecture against a concrete marketing / message-driven scenario. It is the first cross-mode application probe — the only remaining v1-sweep direction after the SKU-driven full-flow Path A/B/C arc closed.

The architectural question: **does the current implementation (workflow_packets, output_slots, generated_assets with five-axis curation provenance plus asset_attachment) hold when applied to a message-bearing scenario, or does message-fit force a structural addition?**

Outcome: **Holds at the structural level, strains in three specific places.** The five-axis curation provenance carries cleanly. The asset_attachment self-contained pattern carries cleanly. What strains is at the slot-input layer, the candidate-evaluation layer, and the family-coherence layer — and the strain is exactly the strain the on-paper layered-input model anticipated. This probe confirms the on-paper findings under a concrete example.

This is a sketch, not doctrine. It does not authorize schema mutation, taxonomy settlement, or new Airtable work. It defines what a future schema move could address if and when one is opened.

## Architectural Anchor

The cross-mode layered-input model ([`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md)) already pressure-tested marketing mode against the other three worked-example modes on paper, surfacing:

- the same six-layer shape across all modes
- mode-specific Layer 1 governing pressure (marketing = message-bearing signal persistence)
- mode-specific Layer 2 fidelity anchor (marketing = composite: subject + message archetype)
- mode-specific slot-input plurality (marketing = singular subject + plural message-bearing elements)
- uniform curation event mechanism with mode-specific coherence-pressure weight
- a possible schema implication: **named message-bearing element fields** at the slot level

The placeholder marketing packet ([`docs/application/examples/placeholder-marketing-message-driven-workflow-packet-example.md`](application/examples/placeholder-marketing-message-driven-workflow-packet-example.md)) gave a furniture-brand instance of marketing mode. This probe pivots the brand context — to a direct-to-consumer everyday-essentials archetype, drawn abstractly from public-reference brands — to surface what changes when both the *mode* and the *category* shift away from where the schema was implemented.

## Probe Setup

### Brand Archetype

A direct-to-consumer everyday-essentials brand whose core brand value is **everyday quality + material honesty + design restraint**. The brand's marketing visual language carries the message implicitly — sustainability is signaled through *material visibility, naturalness of light, real-body movement, and design restraint*, not by saying the word "sustainable."

Per repo brand-name avoidance: the archetype is described by its abstract qualities. It is informed by public-reference brands in the apparel and home space without naming them in this artifact.

### Concrete Scenario

A spring 2026 messaging campaign with three touchpoints, each carrying the same brand value but in different aspect ratios, attention durations, and message specificities.

| Touchpoint | Aspect ratio | Attention duration | Message specificity |
|---|---|---|---|
| **HERO_EMAIL** — email hero | 1500 × 600 (wide) | 1–2 seconds at scroll | "introducing the spring colorways // same materials, new palette" |
| **POST_SOCIAL** — Instagram square | 1080 × 1080 | 2–4 seconds at scroll | "the everyday flat that earns its place" |
| **BANNER_WEB** — homepage banner | 1920 × 800 (extra-wide) | longer, but split with copy | "designed once, made to last" |

The asset family must read as one controlled marketing communication set, not three independent assets. Family coherence is load-bearing — the brand value (material honesty + design restraint) must survive across all three touchpoints.

### Why This Probe

- **Maximum-information cross-mode test.** SKU-driven mode tested whether the architecture holds for single-item truth. Marketing mode tests whether it holds for assets that *carry message* — a fundamentally different creative load.
- **Apparel rather than furniture.** Tests whether the implementation is also category-agnostic, not just mode-agnostic.
- **Three-touchpoint family coherence.** Each touchpoint is structurally distinct (aspect ratio, message specificity), so family coherence must be carried at the brand-value layer, not at the visual-template layer.

## Mapping Attempt

Each entity from the SKU-driven Airtable implementation is mapped onto this scenario. The mapping uses the actual field names and field types from the live `appoqJ25B6w4vSuX9` base, conceptually only — no Airtable mutation is performed.

### `workflow_packets` (existing entity)

Maps cleanly. The packet represents one campaign-or-message — `Spring 2026 Spring Colorways Messaging`. The packet carries:
- bounded creative discretion declaration
- approved references (brand visual rules, palette, type, prior on-message work)
- required output set (the three touchpoints above)
- communication purpose (the brand value to be carried)

The packet shape from SKU mode survives intact.

### `products` (entity strains)

Strains. In SKU mode, `products` holds concrete SKUs (e.g., `SKU-CHAIR-004`). In this scenario, the asset is *of* a product (a particular flat, in a particular spring colorway), but the asset's *purpose* is to carry the brand value, not to render the product faithfully.

Two possible mappings:

1. **`products` continues to hold the SKU(s) shown.** The flat-in-a-color is still the visual subject. Multiple colorways → multiple product rows linked to the packet. Asset role on the governed-asset row carries which touchpoint the asset serves.
2. **A new entity emerges: `messages` or `briefs`.** The brand value being carried becomes a first-class entity attached to the packet. `products` still holds the SKU(s) shown but is no longer the load-bearing entity for what the asset is "for."

Both mappings are tractable. The first maps cleanly onto current schema; the load-bearing question moves into the packet's `bounded_creative_discretion` and `communication_purpose` text fields. The second introduces a new structured entity for clearer query-ability.

The on-paper layered-input model identified Layer 2's marketing-mode fidelity anchor as **composite: subject + message archetype**. Mapping option 2 would model that composite explicitly. Mapping option 1 keeps it implicit in packet text.

### `output_slots` (entity strains)

Strains. In SKU mode, slots are role-typed (`HERO`, `PROFILE`, `DETAIL`) with implicit aspect-ratio expectations. Slots reference one product image as fidelity anchor.

In this scenario, the slot must carry:
- aspect-ratio specification (1500×600 vs 1080×1080 vs 1920×800)
- message-bearing elements (the specific message, copy placement, brand identifier presence, callout emphasis)
- reference binding to brand visual rules + the SKU/colorway shown

The SKU-mode `slot_prompt` is a single text field. For marketing mode, the on-paper analysis noted that "marketing-mode slots would benefit from structured message elements (offer text, brand identifier presence, callout emphasis) rather than relying on freeform `slot_prompt` text." This probe surfaces the same finding concretely: the freeform prompt CAN hold the message structure, but querying or pressure-testing the message structure becomes hard.

The strain is real but tractable. The slot row can be a multi-message-element row with structured fields, OR it can stay singular with structured prose in `slot_prompt`. This is a schema mutation that would earn its keep ONLY if message-element-level querying or constraint enforcement becomes load-bearing operationally.

### `reference_assets` (entity holds with content shift)

Holds. The reference asset entity already accommodates plural references per slot. In SKU mode, references are mostly product imagery. In marketing mode, references include:
- brand visual rules (palette, type, treatment)
- prior on-message work (brand-coherence reference)
- the SKU shown (still a real product reference)
- optionally: target-audience or context references (a real-body-in-motion reference, a natural-light reference, etc.)

The structural pattern holds. What changes is the *content* of references and possibly their *count* (more references per slot, since multiple message-bearing dimensions need to be anchored).

### `generated_assets` with five-axis curation provenance (entity holds)

Holds cleanly. The five fields (`capture_reason`, `captured_at`, `source_attachment_id`, `capture_notes`, `curation_pattern`) carry through without modification.

What changes: the **content** of `capture_reason` and `capture_notes`. In SKU mode, `capture_reason` text trends toward fidelity language ("most accurate proportions," "best lighting fidelity"). In marketing mode, `capture_reason` text trends toward message-fit language ("strongest material visibility," "most natural-light reading," "best carries restraint").

The field is text — it accommodates either content. Whether structured queryability across "fidelity vs message-fit" becomes load-bearing is an open question. If it does, a `selection_axis` enum field could classify each curation event by its primary judgment dimension. Without operational pressure for that query, no schema mutation is justified.

### `curation_pattern` (enum holds with possible new value)

Holds. The five existing values (`algorithmic-curation`, `agent-proposed-human-ratified`, `batch-output-no-curator-selection`, `agent-vision-proposed-human-ratified`, `human-cross-round-authorship-bearing-curation`) all describe *delegation patterns* that are mode-independent. Marketing-mode curation can use any of them.

A possible new value: `human-message-fit-judgment` — to mark curations where the primary judgment dimension was message-fit rather than fidelity or family-coherence. But this conflates *delegation pattern* with *judgment dimension*, which are orthogonal axes. Better to keep `curation_pattern` as delegation-only and add `selection_axis` as a separate field if structured retrievability becomes load-bearing.

### `asset_attachment` (field holds cleanly)

Holds. The self-contained governed-asset pattern (attachment-copy via writeback) is mode-independent. A marketing asset's attachment lives on the governed-asset row with the same independence from slot mutation that SKU-mode assets now have.

### Family Coherence (concept holds, content shifts)

The on-paper model noted that "the structural pattern at the curation seam is uniform across the four modes" but "what varies is the *weight* of cross-output coherence pressure, not the *mechanism*."

This probe confirms it under a concrete example. Family coherence in this marketing scenario means: do all three touchpoints carry the same brand value — material honesty + design restraint — even though they vary in aspect ratio, message specificity, and attention duration?

The mechanism (review-shaped coherence verification across the packet's required output set) carries through. The *content* of the verification is mode-shaped — the reviewer is asking "does this set carry the brand value coherently" rather than "does this set render the SKU consistently."

The implementation-vs-conceptual goal distinction surfaced in Path A ([`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md)) carries directly: in marketing mode, the *implementation goal* is "fill these three slots with assets that look right for the touchpoints"; the *conceptual goal* is "carry the brand value across the campaign in a way the audience can read." A round can pass implementation while failing conceptual, exactly as in SKU mode.

## Hypothetical Curation Walk-Through

For each touchpoint, imagine 5 generated candidates. Sketching the curation event qualitatively (no actual generation performed):

### HERO_EMAIL (1500×600)

Candidates likely range across:
- Cand 1: tight crop on the flat, perfect product fidelity, but visual restraint absent (looks like a product shot)
- Cand 2: lifestyle-context shot with model, real movement, natural light, restraint present, but message specificity unclear
- Cand 3: still life with material visibility, restraint present, message clear, but somewhat cold
- Cand 4: lifestyle shot with model + material visibility close-up, restraint present, message present, well-balanced
- Cand 5: model-only shot, material partially visible, restraint present, but flat itself is small

Curation event: pick Cand 4. `capture_reason`: "carries material visibility and natural-light reading at full size; flat is present and credible without dominating; message of new-palette legible through context." `curation_pattern`: `human-cross-round-authorship-bearing-curation` (the curator is making a brand-value-fit judgment that no algorithmic narrowing should pre-shape).

### POST_SOCIAL (1080×1080)

Different candidate set, different aspect ratio. Same brand-value-fit pressure.

Curation event: pick the one that holds the message ("the everyday flat that earns its place") at square aspect with attention-budget appropriate for social scroll. `capture_reason` would record the message-fit judgment plus square-format-specific composition rationale.

### BANNER_WEB (1920×800)

Wide format with copy split. The asset has to make space for copy without being subservient to it. Curation event picks the candidate where the visual *carries* the message even when read with the headline and CTA copy laid over.

### Coherence Verification (review-shaped)

After per-slot curation: review-board step verifies that the three picked assets read as one campaign. This is the "weight of cross-output coherence pressure" the on-paper model named — heavier than SKU mode (where coherence is mostly about SKU-fidelity consistency) but identical in mechanism.

If coherence fails: re-curate one or more slots. If coherence holds: governed asset family is sealed.

## Findings

### 1. Architectural shape holds across the mode shift

The six-layer model + curation seam + five-axis provenance + asset_attachment pattern survives translation into marketing mode without structural change. This confirms the on-paper finding that *the structural pattern is mode-independent*.

### 2. Three specific strain points surface

All three were anticipated by the on-paper layered-input model. This probe confirms them under a concrete example:

- **Slot-input plurality and message-bearing-element structure.** Marketing slots carry structured message elements (offer text, brand identifier presence, callout emphasis, copy-overlay region) that benefit from explicit field structure rather than freeform `slot_prompt` text. The current schema accommodates the content but loses query-ability.

- **Composite fidelity-anchor representation at the packet/slot level.** Marketing's Layer 2 anchor is composite (subject + message archetype). Current schema has `products` as the load-bearing fidelity entity. A possible refinement: a `messages` or `briefs` entity that captures the message archetype as a first-class object, attached to the packet alongside `products`.

- **Selection-axis classification at the curation event.** Marketing curation primarily judges message-fit; SKU curation primarily judges fidelity. The current `capture_reason` text accommodates either, but classification across "what dimension was this selection made on" requires query structure that text alone doesn't give. A possible refinement: a `selection_axis` enum on `generated_assets`.

### 3. None of the strains are structural breaks

The architecture survives without any mutation. All three strains can be addressed via content discipline within existing fields. Schema mutation would only earn its keep when operational query-pressure on those dimensions becomes load-bearing — and it has not, yet.

### 4. Category-agnostic confirmation

The implementation was built around furniture. Pivoting the probe's brand archetype to apparel/footwear surfaced no category-specific strain. The schema is category-agnostic, as designed.

### 5. The implementation-vs-conceptual goal distinction is fully cross-mode

Path A surfaced this distinction in SKU mode. The probe confirms it carries: in marketing mode, a round can pass implementation goals (slots filled with plausible assets) while failing the conceptual goal (carrying the brand value coherently across touchpoints). The distinction is structural to creative production, not mode-specific.

### 6. `curation_pattern` enum is mode-independent

The five existing values describe delegation patterns. Marketing-mode curation uses the same delegation patterns as SKU mode — the *content* of judgment changes, not the *delegation*. No new `curation_pattern` value is justified by this probe.

### 7. The on-paper layered-input model survives concrete pressure-test

All findings from the layered-input model held. The probe did not surface any architectural finding the model missed. This is mild validation that the on-paper analysis was disciplined; it is not validation of any specific schema mutation.

## What This Probe Does Not Do

- authorize Airtable schema mutation
- stand up a marketing-mode Airtable base
- run actual generation against the brand archetype
- close the four-mode application sweep (a fully-operationalized marketing-mode instance is a separate scope)
- supersede the cross-mode layered-input model note
- claim any of the listed schema implications are earned by current pressure
- name any real brand in repo artifacts (per the brand-name avoidance rule)

## Open Questions / Next Pressure Points

1. **Whether to stand up a marketing-mode Airtable base for full-flow operational testing.** This probe is paper-only. A full-flow operational test would actually run generation→curation→governance under the schema as-is, and surface whether the strain points become operational blockers or remain content-discipline matters.

2. **Whether `messages` or `briefs` should become a first-class entity.** Held; not earned by current pressure. Would earn its keep if the same brand value flows across many packets with shared structural relationships.

3. **Whether `selection_axis` should be a structured enum on `generated_assets`.** Held; not earned by current pressure. Would earn its keep if cross-mode comparative analysis or audit-by-judgment-dimension becomes load-bearing.

4. **Whether structured slot-message-element fields should replace freeform `slot_prompt` text in marketing-mode slots.** Held; not earned by current pressure. Would earn its keep if message-structure constraints need machine-checkable enforcement.

5. **Cross-mode application to collection / merchandising and brand campaign / editorial modes.** Two more modes from the original four-mode model remain unprobed at this depth. Each would test different pressure (relational truth for collection; campaign coherence at scale for brand campaign).

6. **Whether the implementation-vs-conceptual goal distinction should be encoded in the schema.** Held; the distinction surfaces operationally without needing structural representation.

## Anchor Documents

- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): on-paper four-mode pressure-test that this probe concretizes
- [`docs/application/examples/placeholder-marketing-message-driven-workflow-packet-example.md`](application/examples/placeholder-marketing-message-driven-workflow-packet-example.md): existing furniture-brand marketing-packet placeholder
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): introduced the implementation-vs-conceptual goal distinction
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): introduced asset_attachment field and resolved the milestone-5 thin-bridge
- [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](curation-event-schema-mutation-sku-driven-furniture-v1.md): original four-axis provenance schema move
- [`docs/asset-attachment-backfill-findings-sku-driven-furniture-v1.md`](asset-attachment-backfill-findings-sku-driven-furniture-v1.md): backfill record and architectural-cost finding
- [`docs/milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md`](milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md): SKU-driven Furniture v1 plateau
