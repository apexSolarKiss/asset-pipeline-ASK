# Full-Flow Path B Findings // PKT-SKU-010

## Purpose

This note records **Path B of three** in the full-flow test sequence: a coordinated human-plus-agent fresh-generation full-flow on a brand-new packet `PKT-SKU-010` linked to `SKU-CHAIR-005`. Path B tests the simplest case — a fresh packet with no iteration-history baggage, where well-configured generation produces a coherent first-round set, and curation collapses to ratification.

The test also bundles a substantive architectural move: the addition of `asset_attachment` (multipleAttachments) field on `generated_assets`, validated via attachment-copy writeback, **resolving the milestone-5 thin-bridge limitation** that has been carried forward across every prior governed-asset row.

Outcome: **Supported** across all axes. Full-flow runs end-to-end. Attachment-copy writeback is Supported. Governed assets are now self-contained, carrying the asset itself rather than text-referencing it.

## Architectural Anchor

Path B is the third of three full-flow tests agreed with ASK after Path C ([#155](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/155)) and Path A ([#156](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/156)):

- **Path C:** synthesis of already-executed full-flow evidence
- **Path A:** coordinated fresh-generation full-flow on existing PKT-SKU-009 (cross-round authorship-bearing curation)
- **Path B (this note):** coordinated fresh-generation full-flow on brand-new PKT-SKU-010 (simplest-case ratification)

Path B closes the v1 sweep's full-flow item. It also carries the `asset_attachment` schema move, which addresses the architectural seam ASK surfaced as a question during Path B setup: *the existing `generated_assets` rows are text-references only and don't carry the actual asset.*

## Plan (Stated Before Execution)

**Setup (agent-side via connector):**

1. Verify SKU-CHAIR-005 exists with no prior packets (it does)
2. Create packet `PKT-SKU-010` linked to `SKU-CHAIR-005`
3. Mirror PKT-SKU-009's structural fields (business_intent, creative_intent, required_output_set) for cleanest comparison
4. Reuse `REF-PKT-SKU-009-VISUAL-INVARIANT-002` as the visual reference (single-variable test: only the SKU and the iteration-history baggage change)
5. Create three output_slots with mirrored slot_prompts

**Schema move (agent-side):**

6. Add `asset_attachment` (multipleAttachments) field on `generated_assets` to resolve the milestone-5 thin-bridge limitation
7. Validate attachment-copy writeback by populating `asset_attachment` on Path A's HERO row (existing row, known good source attachment)

**Generation (ASK):**

8. Trigger fresh AI generation in Airtable UI on the three new PKT-SKU-010 slots

**Curation (agent-side):**

9. Diff slot state to identify new candidates
10. Download new candidates and product reference
11. Vision-based curation against SKU-CHAIR-005 product reference + REF-002 + slot-role expectations
12. Propose selections; ASK ratifies or directs
13. Create three `generated_assets` rows with `asset_attachment` populated from the start, promoted directly to `governed_output`

**Non-actions:**

- no other packets, slots, modes touched
- no existing rows modified (except Path A HERO `asset_attachment` test write)
- no AI field-agent configuration changes
- no constraint_keys configured (testing minimum viable packet)

**Terminal stop:** PKT-SKU-010 + 3 slots + 3 governed-asset rows live; findings synthesized.

## Execution Record

**Setup (agent-side):**

| Record | ID |
|---|---|
| Packet PKT-SKU-010 | `recYYoTWv9ZWnUGkf` |
| SLOT-PKT-SKU-010-HERO | `receOm6zLJpFc4Hq1` |
| SLOT-PKT-SKU-010-PROFILE | `recw4gZVfzqG3lbI7` |
| SLOT-PKT-SKU-010-DETAIL | `recmv7FmCPELEVes5` |

**Schema move:**

- Field `asset_attachment` (`fldAwdZlcBHx8uiMr`, multipleAttachments) added to `generated_assets`
- Attachment-copy writeback validated on Path A HERO row (`recNTHjyhXwDZJlMf`): a new attachment id was created (`attXT8OryKhYaumLW`, distinct from the source `attHhekFb8MWgcIFg`), confirming Airtable ingested and copied the attachment object

**Generation:** ASK triggered fresh generation on 2026-05-03 at approximately 21:24. One new candidate per slot:

| Slot | Source attachment | Filename |
|---|---|---|
| HERO | `attIW057nOuo0t8iZ` | Image_May_3_2026_9_24_PM.jpeg |
| PROFILE | `att2gf85UmEsescSg` | Image_May_3_2026_9_24_PM.jpeg |
| DETAIL | `attKPHp9ddO4zqbfq` | Image_May_3_2026_9_24_PM.jpeg |

**Curation:** Claude proposed all three fresh candidates as agent baseline. ASK ratified all three.

**Row creation:** three new rows in single batched call with `asset_attachment` populated and promoted directly to `governed_output`:

| Slot | Row ID | governed_output_status | governed_output_flag | asset_attachment id |
|---|---|---|---|---|
| HERO | `recy8IJK41BO5r6tr` | governed_output | 1 | `attSuyGPLlz40HECS` |
| PROFILE | `reczFqujfyfFbGOjS` | governed_output | 1 | `attZtWMSefFqWMaxH` |
| DETAIL | `recb6wjTBg6vSWQi5` | governed_output | 1 | `attfeY5DxqqqRNmuy` |

All three: `curation_pattern = agent-vision-proposed-human-ratified`, `curator = Claude (vision-based proposing); ASK (ratifying)`, `capture_reason = path-b-fresh-packet-fresh-generation-full-flow`.

## Findings

### 1. Attachment-copy writeback: Supported — milestone-5 thin-bridge limitation resolved

The `asset_attachment` field accepted attachment-copy writeback via a URL-bearing object. Airtable ingested the attachment, assigned a new attachment id distinct from the source, and stored it on the `generated_assets` row. The row now **carries the asset itself**, not just a text reference.

This resolves the architectural limitation that has been carried forward across milestone 5, the curation-event schema mutation (#145), and every subsequent governed-asset row creation. The `asset_uri` URL field remains tool-blocked for direct URL writes, but that blocker is now bypassed by the multipleAttachments field type — the same writeback path that text-holding-attachment-id used.

The architecture's intent (per #146 and #150 framing) is now met: a `generated_assets` row IS the governed asset, carrying the image, not just metadata pointing at it.

### 2. Full-flow on a fresh packet: clean ratification, simplest case

When generation produces a coherent first-round set, the curation event collapses to ratification:

- Single round, single candidate per slot
- No cross-round complexity (within-round = approved-set by definition since there's only one round)
- Family coherence achieved automatically (within-batch = within-set)
- Product fidelity achieved (chairs match SKU-CHAIR-005's tailored armless silhouette)
- Reference binding partial (background warmer than REF-002 — same May 3 generation pattern as PKT-SKU-009 fresh batch, see finding 4)

This is **the case where the implementation goal (within-round coherence) automatically satisfies the conceptual goal (approved-set coherence)** — the convergence Path A's findings note articulated. When generation is well-configured enough to deliver a coherent first-round set, the curator's authorship at the seam compresses to confirmation, and the full-flow runs cleanly.

The architecture supports both this simple case and Path A's harder case (cross-round authorship-bearing) using the same `curation_pattern` field to record which pattern actually unfolded.

### 3. Promotion-on-creation: Supported

This is the first time `generated_assets` rows have been created with `governed_output_status = governed_output` directly, rather than being created as `candidate` and promoted later as a separate move. The formula field `governed_output_flag` propagated correctly to `1` on creation. There is no operational reason to require the candidate-then-promote sequence when the curator authoritatively chooses on first creation.

For PKT-SKU-010, this works cleanly because there are no prior rows competing for the slot's governed-output status. For slots that have existing rows (as in PKT-SKU-009), the parallel-ratified-candidate pattern from #150 / #153 / #156 remains the right move.

### 4. May 3 generation warmth pattern is generation-wide, not packet-specific

Both fresh PKT-SKU-009 (May 3 19:50) and fresh PKT-SKU-010 (May 3 21:24) batches produced backgrounds *warmer than REF-002*. The pattern repeats across packets, suggesting the warmth drift is a property of current generation conditions (Gemini 3 Pro Image with current prompt + reference configuration), not of any specific packet's setup.

This is exactly the kind of finding the v43 grounding-note loose thread *"generation tuning to deliver within-round coherence reliably"* points at. Tuning candidates: prompt-level tone instructions, reference-binding weight, model parameters. Held as a separate future direction; not opened in this PR.

### 5. PKT-SKU-010 PROFILE achieved a true 90° side profile — fresh-on-fresh-packet observation

Notable architectural observation: the PKT-SKU-010 fresh PROFILE candidate is a **clean 90° side profile**, materially cleaner than any PKT-SKU-009 PROFILE candidate ever produced across multiple iteration rounds.

Two possible explanations:
- **Fresh-on-fresh-packet has less prompt drift than fresh-on-iterated-packet.** PKT-SKU-009's slot prompts went through retry rounds where prompt updates were made to address other issues; some of those updates may have introduced behaviors that compromised PROFILE-angle fidelity. PKT-SKU-010's prompts are clean mirrors of an earlier PKT-SKU-009 state without that drift.
- **Generation variance.** Single-data-point caveat applies.

Either way, this is a useful data point for understanding how iteration history can affect generation outcomes. Recorded as observation, not load-bearing claim.

### 6. The Path C → A → B sequence completes the full-flow validation

The three paths together establish:

- **Path C:** the architecture's full-flow surface executes end-to-end (existence proof from prior evidence)
- **Path A:** the architecture supports cross-round authorship-bearing curation when single rounds fail to deliver a coherent set (implementation/conceptual goal distinction)
- **Path B:** the architecture supports clean ratification when generation produces a coherent first-round set (the simple case where implementation = conceptual goal by correlation)

Plus Path B's bonus: the asset_attachment schema move resolves the thin-bridge limitation that all three paths were carrying forward.

The v1 sweep's full-flow item is now complete.

## Cross-Path Comparison

| Axis | Path C | Path A | Path B |
|---|---|---|---|
| Test type | Synthesis of prior | Coordinated fresh-gen on existing packet | Coordinated fresh-gen on fresh packet |
| Iteration history | Heavy | Heavy + new round | None (first round) |
| Curation pattern | (synthesis only) | human-cross-round-authorship-bearing | agent-vision-proposed-human-ratified |
| Within-round vs cross-round | n/a | Cross-round (no single round delivered set coherence) | Within-round (only one round; family-coherent by default) |
| Implementation-vs-conceptual goal | Articulated | Implementation goal unmet, conceptual goal satisfied via cross-round | Implementation goal met, conceptual goal satisfied by correlation |
| `governed_output` promotion | Existing rows (parallel-ratified pattern) | New rows stay `candidate` (parallel-ratified) | New rows promoted directly on creation (no competing rows) |
| `asset_attachment` | Not yet present | Path A HERO populated as schema-move test | All three populated from creation |

## Structured Change Summary

**Why this change exists.** Path B is the final full-flow test in the v1 sweep. Bundled with Path B's curation work is the `asset_attachment` schema move, which addresses ASK's question during setup about whether `generated_assets` rows actually carry the asset (they did not until now — text-reference only).

**What changed.**

- Airtable schema: new field `asset_attachment` (`fldAwdZlcBHx8uiMr`, multipleAttachments) on `generated_assets`
- Airtable rows: 1 packet (`PKT-SKU-010`), 3 slots (HERO/PROFILE/DETAIL), 3 governed-asset rows (HERO/PROFILE/DETAIL) with `asset_attachment` populated and `governed_output_status = governed_output`
- Path A HERO row also populated with `asset_attachment` (validation test for the schema move)

**What did not change.**

- Other prior `generated_assets` rows (asset_attachment NOT yet backfilled — separate follow-on PR)
- Other tables and modes
- AI field-agent configuration
- Generation invocation (still human-side)
- AGENTS.md, grounding note (v43 already covers the methodological lessons)

**What remains out of scope.**

- Backfill of `asset_attachment` on prior 11 governed-asset rows (3 PKT-SKU-007 + 1 milestone-5 HERO + 4 PKT-SKU-009 metadata-and-vision rows + 3 PKT-SKU-009 Path A rows) — separate small follow-on PR
- Cross-mode application to a new base (the only remaining v1 sweep direction)
- Generation tuning to address the May 3 warmth pattern
- `asset_uri` URL writeback resolution (still blocked, but `asset_attachment` makes it lower priority)

## Open Questions / Next Pressure Points

1. **`asset_attachment` backfill on prior rows.** Now that the writeback path is Supported, the 11 prior governed-asset rows can be backfilled. Cleanup move; not load-bearing for new rows but desirable for consistency. Next small PR.
2. **Cross-mode application to a new base.** Only remaining v1 sweep direction. Stand up a base for collection / merchandising, marketing / message-driven, or brand campaign / editorial mode and test the cross-mode model in practice.
3. **Generation tuning to fix May 3 warmth pattern.** The background warmth drift across both fresh PKT-SKU-009 and PKT-SKU-010 batches is a packet-agnostic generation-side issue. Tuning candidate per v43 grounding-note loose thread.
4. **Whether to deprecate `asset_uri` field.** Now that `asset_attachment` carries the asset directly, `asset_uri` is structurally redundant — and remains tool-blocked. Could be removed or kept for future use (e.g., external URL pointers). Not opened.
5. **Capture-mechanics formal reopen** still flagged from milestone 5; with the thin-bridge limitation now resolved, the original blocker is materially weaker. The formal reopen decision can be revisited.

## What This Note Does Not Do

- backfill `asset_attachment` on prior rows
- deprecate `asset_uri`
- modify `AGENTS.md` or grounding note
- claim that `agent-vision-proposed-human-ratified` is the right default delegation pattern (it is the right pattern *when generation produces a coherent first-round set*)
- claim that PKT-SKU-010 PROFILE quality generalizes across all fresh-on-fresh-packet generation (single data point)
- close the v1 sweep — cross-mode application is the only remaining direction

## Anchor Documents

- [`docs/full-flow-evidence-synthesis-pkt-sku-009.md`](full-flow-evidence-synthesis-pkt-sku-009.md): Path C synthesis
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): Path A findings; introduces the implementation-vs-conceptual goal distinction this note builds on
- [`docs/curator-field-and-backfill-sku-driven-furniture-v1.md`](curator-field-and-backfill-sku-driven-furniture-v1.md): the curator field move
- [`docs/governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md`](governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md): the curation_pattern field move
- [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](curation-event-schema-mutation-sku-driven-furniture-v1.md): the four-field provenance schema move that asset_attachment now extends
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): the cross-mode v3 architecture sketch
- [`docs/milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md`](milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md): the milestone whose thin-bridge limitation this note resolves
- [The Creative Act of Selection](https://atomicspacekitten.substack.com/p/the-creative-act-of-selection): the article framing curation as the creative act
