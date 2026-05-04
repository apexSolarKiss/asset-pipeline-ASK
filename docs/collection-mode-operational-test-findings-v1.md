# Collection-Mode Operational Test // Findings v1

## Purpose

This artifact records the verdict of the first cross-mode operational test in the asset-pipeline-ASK family. The test pressured the existing SKU-driven Furniture v1 schema against an operational collection-mode packet (`PKT-COLL-001`) end-to-end: setup, generation, curation, and governance. It is the Phase 2 follow-on to the Phase 1 setup recorded in [`docs/collection-mode-operational-test-setup-v1.md`](collection-mode-operational-test-setup-v1.md).

The test was deliberately scoped to **isolate the mode variable** by running inside the existing SKU-driven Furniture v1 base (no new base) with the same brand context (furniture) — the cross-mode probe used apparel for paper-pressure, but operational testing for mode-independence is sharper when category and base stay constant.

## Architectural Question

**Does collection mode's 1:N slot-product cardinality strain become an operational blocker in the existing schema, or remain content-discipline-only?**

## Verdict

**The existing schema carries collection-mode operational pressure cleanly without structural mutation.** All three slots produced ratifiable governed assets via the prose-only workaround that the cross-mode probe predicted would strain. Three governed-asset rows now carry full five-axis provenance + `asset_attachment` self-contained writeback, mirroring the SKU-mode Path B pattern exactly. The schema is mode-independent at the operational level, not just on paper.

The composite-anchor schema mutation is *less* earned by operational pressure now than it was after the paper probe. What looked like sharp strain on paper turned out to be content-discipline navigable in practice.

## What Was Produced

Three governed-asset rows on PKT-COLL-001:

| asset_key | source slot | source candidate | asset_attachment |
|---|---|---|---|
| `ASSET-PKT-COLL-001-HERO_GROUP-attNNPboxBKfKyLUh` | HERO_GROUP | round 3 | `attmXJvaGTfNQaWRk` (copied) |
| `ASSET-PKT-COLL-001-HERO_GROUP_ALT-attWtGCiXjokm3wW2` | HERO_GROUP_ALT | round 2 | `attv3RQBMmMh8ZMko` (copied) |
| `ASSET-PKT-COLL-001-DETAIL_ADJACENCY-att9DsOIW3rYyTjab` | DETAIL_ADJACENCY | round 2 | `attwQsROD3yePox8O` (copied) |

All three rows carry `governed_output_status: governed_output`, `curation_pattern: agent-proposed-human-ratified`, `curator: Claude (proposing); ASK (ratifying)`, and full `capture_reason` / `capture_notes` text. The three slots' `slot_status` transitioned from `planned` to `accepted`.

## Findings

### 1. Prose-only naming carries 1:N slot-product cardinality cleanly

The cross-mode probe predicted that a single slot whose fidelity anchor is *the grouped set* (multiple SKUs) might fail because the slot's structural product reference is 1:1 via packet pass-through and cannot represent multiple constituents structurally. The workaround was to enumerate all four constituents in `slot_prompt` prose.

**The workaround held cleanly across all three slots.** The agent honored the prose enumeration and rendered all four constituents (where instructed) or the requested subset (where instructed). HERO_GROUP and HERO_GROUP_ALT each show all four constituents in frame; DETAIL_ADJACENCY shows the chair + side table pairing with the lamp and bench cleanly excluded.

### 2. Prose-only fidelity also carries for SKUs without product_image attachments

Of the four PKT-COLL-001 SKUs:

- SKU-CHAIR-003 has a `product_image` attachment ✓
- SKU-TABLE-001 has NO `product_image` ✗
- SKU-LAMP-001 has NO `product_image` ✗
- SKU-BENCH-001 has NO `product_image` ✗

The agent rendered the table, lamp, and bench credibly using `material_notes` / `finish_notes` / `identifying_details` text fields surfaced via slot_prompt prose alone, with no visual reference for those three constituents. **Prose-only descriptions carried visual fidelity adequately for a calm-living-room collection-mode composition.**

This is incidental — in real-pipeline operation, every constituent SKU should carry a `product_image` attachment for product-truth fidelity (the SKU-mode discipline). But it surfaces a useful capability of the architecture: prose can carry constituent identity when product images are unavailable.

### 3. Prose can carry exclusion as well as inclusion

DETAIL_ADJACENCY's tightened slot_prompt explicitly named the lamp and bench as "should NOT appear in frame at all." The agent honored the exclusion cleanly on the first run after tightening. This is a non-trivial capability: subset selection within a packet's product set, expressed in prose, was rendered structurally absent in the generated output.

### 4. Generation tooling does not reliably honor "all items fully in frame" for elongated constituents

HERO_GROUP's bench-cropping persisted across all three rounds despite progressively stronger framing language (round 1 default; round 2 "all four constituents must be fully within the frame"; round 3 explicit FRAMING REQUIREMENT block calling out the bench specifically with resolution options enumerated).

Each round improved the bench's visibility marginally but none fully resolved the cropping. The agent appears to interpret "low storage bench" as a naturally elongated horizontal piece that cannot fit alongside three other items in a portrait-oriented frame, regardless of camera-pullback instruction.

**This is a generation-tooling limitation, not a schema limitation.** Recording it as a documented constraint: text-to-image generation does not reliably honor "all items fully in frame" instructions when one constituent's natural proportions are dramatically different from the others. Workarounds at the operational layer:

- adjust aspect ratio to landscape (would help horizontal items fit)
- specify a smaller bench scale in the SKU's identifying_details
- accept the cropping when it is mild enough not to affect the asset's purpose

For this test, the cropping was accepted as documented and the round-3 candidate was ratified as the strongest of the three rounds.

### 5. Cross-slot consistency for prose-only constituents requires verbatim repetition

ASK observed during round-2 review that the lamp shows surprising consistency *within* each slot's two rounds but variation *across* slots. Structural reason:

- Within-slot consistency: same slot_prompt prose → same agent interpretation → similar visual across regenerations
- Cross-slot variation: HERO_GROUP_ALT's slot_prompt abbreviated constituent descriptions ("the same four constituents are present" with bullets carrying only SKU + name) while HERO_GROUP's slot_prompt carried full identifying_details inline. The agent has no memory of prior slot generations; abbreviated prose gives more interpretive latitude.

**Implication:** when constituents have no `product_image` attachment, the slot's lookup has nothing to surface for that constituent — the only thing carrying identity is the prose. Cross-slot consistency therefore requires **verbatim prose repetition** in every slot. SKU mode's `product_image_lookup_lookup` automatically anchors visual identity across slots when product_image attachments exist; collection mode without product_image attachments must replicate the prose.

This is a content-discipline finding, not a schema-mutation finding. **The clean fix in real-pipeline operation is to attach product_image to every constituent SKU**, just as in SKU mode. Prose-only fidelity is an interesting incidental capability; product_image-anchored fidelity is the operational target.

### 6. "Same arrangement, different angle" is not a tractable instruction for text-to-image

The original HERO_GROUP_ALT slot_prompt asked for "the SAME grouped-set arrangement viewed from a different angle." The agent produced a fresh composition with the same constituents instead. Text-to-image generation cannot preserve spatial arrangement across independent generations.

The round-2 reframe of the slot_prompt was to be honest about what the tooling can do: "a second view of the same calm living-room grouping concept ... with a different camera position." Under that framing, the tool produced a coherent second view that shares studio world, lighting direction, and tonal register with HERO_GROUP — even though the spatial arrangement is independently generated.

This is a generation-tooling reality worth recording: **slot prompts that ask for arrangement-preservation across independent generations do not work.** The fix is honest framing in the prompt itself; the architecture is unaffected.

### 7. Curation pattern compressed naturally to agent-proposed-human-ratified

With one candidate per slot per round, the curation pattern compressed to `agent-proposed-human-ratified` rather than `human-cross-round-authorship-bearing-curation` (which would require the curator ranging over a candidate space). This is operationally reasonable for collection-mode work where the brief is specific enough that the agent's first proposal is often close to acceptable.

The cross-mode probe's prediction that collection-mode curation primarily uses `human-cross-round-authorship-bearing-curation` was overstated; in this test, agent-proposed-human-ratified was sufficient.

### 8. The implementation-vs-conceptual goal distinction surfaces here too

Path A's distinction (implementation goal: "fill these slots with plausible assets" vs. conceptual goal: "deliver coherent governed assets") carries cleanly into collection mode. The first-round candidates passed implementation goals (slots filled, all four constituents present) but missed conceptual goals (HERO_GROUP cropped the bench; DETAIL_ADJACENCY had an awkwardly placed lamp). Round-2 / round-3 iterations brought conceptual goals into alignment — except for the HERO_GROUP bench cropping, which became a documented generation-tooling limitation rather than a curation issue.

### 9. Family coherence holds across the three slots

All three governed assets share the same studio world (warm neutral architectural with cove transition), the same chair fidelity (sculpted upholstered chair, slim tapered legs, warm neutral upholstery), the same tonal register (warm walnut + upholstery accent), and the same lighting direction. The set reads as one curated capsule even though each slot was independently generated. **Collection-mode family coherence is achievable via slot_prompt-anchored consistency, even without arrangement preservation.**

### 10. The 3 historical placeholder generated_assets rows from 2026-04-22 are untouched

Per artifact discipline (do not retrofit evidence-chain artifacts), the three placeholder rows from 2026-04-22 (`collection_grouping_primary_view_v1`, `collection-contact-sheet-v1`, `collection-spacing-annotation-v1`) were not modified. They remain as historical thin-bridge state — `governed_output` status with no provenance fields populated, predating the curation-event provenance schema.

This means PKT-COLL-001's governed_output_count is now 6 — 3 historical placeholders + 3 new operational-test outputs. The count is not the test's subject; the operational test outputs are. Whether to demote the placeholders to `candidate` or `rejected` status is a separate operational decision, deferred.

## What This Test Did Not Establish

- No schema mutation. The composite-anchor schema mutation that the cross-mode probe surfaced as the most consistent strain across three modes is *less* earned by operational pressure now, not more.
- No `messages` / `briefs` / `grouping_archetype` / `campaign_concept` first-class entities. The packet's `bounded_creative_discretion`, `creative_intent`, and `business_intent` text fields, plus the slot_prompt prose, carry the composite-anchor representation adequately.
- No new `selection_axis` enum on `generated_assets`. The `capture_reason` and `capture_notes` text fields carry the relational-judgment dimension content adequately.
- No `curation_pattern` enum value added. The existing five values cover collection-mode curation cleanly.

## What This Test Earned

- **Operational confirmation that the architecture is mode-independent at the operational level**, not just on paper. The same schema that ran SKU mode end-to-end (PKT-SKU-009, PKT-SKU-010) ran collection mode end-to-end (PKT-COLL-001) without structural change.
- **A cleaner case for product_image attachments on every constituent SKU**, including supporting items like tables, lamps, and benches. The prose-only-fidelity capability is real but the product-image anchor is operationally sharper, especially for cross-slot consistency.
- **A documented generation-tooling limitation** (cropping of elongated constituents under "all in frame" instructions) that future operational work can plan around at the prompt or aspect-ratio layer.
- **A verified Path-B-shape full flow on a non-SKU mode** — generation → curation → asset_attachment writeback → governance promotion — proving the flow is mode-independent.

## What Remains Out Of Scope

- Operationalizing marketing or campaign mode (the other two non-SKU modes probed at probe-depth in the v1 sweep)
- Generation tuning (May 3 warmth pattern still open from earlier findings)
- Capture-mechanics formal reopen (still flagged from milestone 5)
- Demotion or restructuring of the 3 historical placeholder generated_assets rows on PKT-COLL-001

## Anchor Documents

- [`docs/collection-mode-operational-test-setup-v1.md`](collection-mode-operational-test-setup-v1.md): Phase 1 setup + iterative prompt-tightening adjustments that this artifact closes
- [`docs/cross-mode-probe-collection-merchandising-v1.md`](cross-mode-probe-collection-merchandising-v1.md): paper-only probe whose strain hypothesis this operational test validated — and partially deflated
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): on-paper layered-input model that the probe series concretized
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): Path B pattern (coordinated fresh-gen + asset_attachment writeback) that this test mirrored for collection mode
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): introduced implementation-vs-conceptual goal distinction; carried fully cross-mode here
- [`docs/asset-attachment-backfill-findings-sku-driven-furniture-v1.md`](asset-attachment-backfill-findings-sku-driven-furniture-v1.md): asset_attachment field background
- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): plateau marker that this operational test was the first move past
