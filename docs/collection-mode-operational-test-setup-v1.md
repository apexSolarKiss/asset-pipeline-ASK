# Collection-Mode Operational Test // Setup v1

## Purpose

This artifact records the Phase 1 setup of the first cross-mode operational test in the asset-pipeline-ASK family. It pressures the existing SKU-driven Furniture v1 schema against an operational collection-mode packet (`PKT-COLL-001`), with a specific architectural question to answer.

It is the next direction after milestone 7 (v1 sweep closure plateau) and the closure of the cross-mode application sweep at probe-depth ([`docs/cross-mode-probe-collection-merchandising-v1.md`](cross-mode-probe-collection-merchandising-v1.md)).

This is Phase 1 — setup only. No generation, no curation, no governance promotion. Phase 2 will run the full flow on the packet and capture findings as a separate artifact.

## Architectural Question

**Does collection mode's 1:N slot-product cardinality strain become an operational blocker in the existing schema, or remain content-discipline-only?**

The collection / merchandising probe identified plural slot-input fields as the strongest schema implication across the cross-mode sweep. Currently `output_slots.product_image_lookup_lookup` is a multipleLookupValues that surfaces the packet's product references — singular when the packet links one SKU, plural when the packet links many. The probe's strain hypothesis: a single slot whose fidelity anchor is *the grouped set* (multiple SKUs) cannot structurally represent which SKUs are in the slot's anchor versus peripheral, and the workaround (encoding the subset selection in `slot_prompt` prose) loses query-ability and adjacency-rule structure.

This operational test puts that hypothesis under real-feeling pressure. The slots are configured as the probe predicted they'd need to be. Phase 2 will surface whether the prose workaround actually carries the discipline operationally, or whether the structural absence becomes a real blocker.

## Key Design Call

**The test runs inside the existing SKU-driven Furniture v1 base, not a new base.**

This directly tests the claim that the architecture is mode-independent. If a single base can carry both SKU-mode (PKT-SKU-007/009/010) and collection-mode (PKT-COLL-001) packets cleanly, that *is* the test of mode-independence. Same base also keeps the furniture brand context constant — isolating the *mode* variable from the *category* variable. The cross-mode probe used apparel deliberately for paper-only sketch-pressure; for operational pressure-testing, isolating one variable is sharper.

## Survey Findings

`PKT-COLL-001` already existed in the base (created 2026-04-22), with substantial packet-level configuration:

- **4 product constituents linked**: SKU-CHAIR-002 (walnut dining chair), SKU-TABLE-001 (walnut side table), SKU-LAMP-001 (floor lamp), SKU-BENCH-001 (low storage bench)
- **Business intent**: bounded collection / merchandising packet for a calm living-room grouping
- **Creative intent**: maintain one controlled four-item merchandising arrangement reading as one intentional calm grouping
- **Bounded creative discretion**: declared (allow gentle positional variation; preserve adjacency and grouped coherence)
- **Required output set**: declared (one grouped-set primary view + one contact-sheet review artifact + optional light annotation)
- **Constraint keys**: 4 linked (CR-COLL-001 through CR-COLL-004)
- **Seam runs**: 4 stage records (SR-COLL-INGEST/TRANSFORM/OUTPUT/RELEASE-001)
- **Review gate**: 1 (GATE-COLL-001)
- **3 placeholder generated_assets rows** (collection_grouping_primary_view_v1, collection-contact-sheet-v1, collection-spacing-annotation-v1) created at the same time, predating the curation-event provenance schema; carry no provenance fields; status `governed_output` despite empty provenance — the same kind of historical thin-bridge state that surfaced on PKT-SKU-007 before backfill

What was missing:

- **No `output_slots` rows** existed for `PKT-COLL-001` — the slot-level execution surface had not been stood up
- **`approved_reference_keys` empty** — the packet has constraints but no approved visual references at the packet level

## What This Phase 1 Setup Did

Created 3 net-new `output_slots` rows linked to `PKT-COLL-001`, all in `planned` status:

| `output_slot_key` | `expected_output_role` | sort | Fidelity anchor |
|---|---|---|---|
| `SLOT-PKT-COLL-001-HERO_GROUP` | `HERO_GROUP` | 1 | All four constituents as one grouped set |
| `SLOT-PKT-COLL-001-HERO_GROUP_ALT` | `HERO_GROUP_ALT` | 2 | Same grouped set from a different angle |
| `SLOT-PKT-COLL-001-DETAIL_ADJACENCY` | `DETAIL_ADJACENCY` | 3 | Two-item pairing (chair + side table) within the larger set |

Each slot's `slot_prompt` encodes the collection-mode workaround explicitly:

- All four constituent SKUs are named in prose (with their identifying details inline)
- The slot's role within the grouping is named (which SKUs are subject vs peripheral, for the DETAIL_ADJACENCY slot specifically)
- Each slot_prompt notes that the prose-naming IS the workaround being tested — the slot's structural product reference is currently 1:1 via packet pass-through and cannot represent the subset structurally

The DETAIL_ADJACENCY slot is the sharpest single test case: it asks the slot to feature 2 of the 4 constituents while acknowledging the other 2 may appear at frame edges. That subset-of-grouping pattern is what the cross-mode probe predicted would strain the most.

## What This Phase 1 Setup Did Not Do

- **No mutation of existing PKT-COLL-001 packet** — its packet-level config from 2026-04-22 stands as it was
- **No mutation of the 3 historical placeholder generated_assets rows** — they remain as they were created (empty shells from before the provenance schema; `governed_output` status preserved). Per the artifact discipline rule, historical evidence-chain artifacts are not retroactively mutated.
- **No schema mutation** — the entire point is to run the existing schema as-is and observe whether content discipline carries the strain
- **No `approved_reference_keys` configured on PKT-COLL-001** — packet-level visual references remain empty. Phase 2 will need to address this if visual references are required for generation; deferred so Phase 1 stays scoped to slot creation
- **No generation invoked** — Phase 2 work
- **No curation event** — Phase 2 work
- **No governance promotion** — Phase 2 work
- **No new Airtable base** — explicit design call to test mode-independence in the existing base
- **No mutation of any other packet** (PKT-SKU-007/009/010, PKT-MSG-001, PKT-CAMP-001 untouched)

## What Would Resolve The Architectural Uncertainty

When Phase 2 runs, the following observations would resolve the question concretely:

1. **Does the agent / generation surface honor the slot_prompt's enumerated constituents?** If yes, the prose workaround carries. If the agent only "sees" one product (the singular structural reference) and ignores the prose-named others, the workaround fails operationally.

2. **Can the curator efficiently verify each constituent's fidelity at curation time?** The curation event needs to verify all four products are faithful in HERO_GROUP, the same four in HERO_GROUP_ALT, and the two featured + two peripheral in DETAIL_ADJACENCY. If the curator has to manually cross-reference each slot_prompt against four product images while inspecting candidates, that's a workflow strain even if the structure technically works.

3. **Does adjacency-rule pressure (relational legibility, scale, spacing) survive without structural representation?** The packet's `bounded_creative_discretion` and `creative_intent` fields carry these as prose. Whether they can pressure the curation event when there's no structured field for "is this pairing adjacent?" is what Phase 2 tests.

4. **Does coherence verification across the three slots carry the heavier collection-mode pressure that the on-paper probe predicted?** The cross-mode model said collection mode has heavier coherence weight than SKU mode. The review-gate verification across HERO_GROUP + HERO_GROUP_ALT + DETAIL_ADJACENCY should pressure-test this directly.

If the answer to all four is "yes, the workaround carries cleanly" — the schema is robust without composite-anchor mutation, and the cross-mode probes' Layer 2 finding stays in held / not-earned status. If any answer is "no, the workaround creates an operational blocker" — that's a real schema-mutation candidate, and the composite-anchor work moves from speculative-design to earned-by-pressure.

## Phase 2 Scope (Separate Future Work)

- Configure packet-level `approved_reference_keys` on PKT-COLL-001 if needed for generation
- Invoke generation on each of the three slots (likely as a coordinated round, mirroring the Path A/B pattern on the SKU-driven base)
- Curate each slot's candidate set
- Record curation events with full five-axis provenance plus `curator` plus `asset_attachment` (attachment-copy writeback)
- Conduct family-coherence review across the three slots
- Document findings as `docs/collection-mode-operational-test-findings-v1.md`
- Reach a verdict on the four resolution observations above

## Anchor Documents

- [`docs/cross-mode-probe-collection-merchandising-v1.md`](cross-mode-probe-collection-merchandising-v1.md): the paper-only probe whose strain hypothesis this operational test pressures
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): on-paper layered-input model that the probe series concretized
- [`docs/application/examples/placeholder-collection-merchandising-workflow-packet-example.md`](application/examples/placeholder-collection-merchandising-workflow-packet-example.md): existing furniture-brand collection-packet placeholder (the conceptual blueprint that PKT-COLL-001 instantiates)
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): Path A pattern (coordinated fresh-gen on existing packet) that Phase 2 will mirror for collection mode
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): Path B pattern + asset_attachment field that Phase 2 will use for self-contained governed assets
- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): plateau marker that this operational test is the first move past
