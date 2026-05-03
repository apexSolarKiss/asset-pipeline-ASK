# Full-Flow Path A Findings // PKT-SKU-009

## Purpose

This note records **Path A of three** in the full-flow test sequence: a coordinated human-plus-agent fresh-generation full-flow on the existing `PKT-SKU-009` packet. ASK triggered fresh generation in Airtable UI; the executor agent (Claude) proposed selections; ASK overrode the agent baseline with a cross-round mix; three new `generated_assets` rows were created with a fifth distinct `curation_pattern` value.

The test produced its **load-bearing architectural finding** in an unexpected place: not in the row creation or the candidate generation, but in the disagreement between the agent's proposed within-round-coherent baseline and ASK's actual cross-round authorship-bearing selection. That disagreement clarified that within-round family coherence is a useful proxy heuristic, while the architectural goal is coherence across the approved governed-asset set regardless of source-round identity.

Outcome: **Supported.** Fresh-generation full-flow runs cleanly as a coordinated human-plus-agent operation. The architecture supports cross-round selection without strain. The curator's authorship spans rounds when individual rounds fail to deliver a coherent set.

## Architectural Anchor

This is Path A in the sequence agreed with ASK after [Path C's synthesis](full-flow-evidence-synthesis-pkt-sku-009.md):

- **Path C ([#155](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/155)):** synthesis of already-executed full-flow evidence
- **Path A (this note):** coordinated fresh-generation full-flow on existing PKT-SKU-009
- **Path B (next):** coordinated fresh-generation full-flow on a brand-new PKT-SKU-010

Path A also reframes Path C's open question on generation invocation as a separate creative act. Per ASK's correction (recorded in feedback memory), generation invocation is **not** a separate creative act — it is a tooling step that should run mechanically once inputs are configured. The current human-trigger requirement is a tooling limitation. Curation remains the singular creative-discretionary act inside the pipeline runtime.

## Plan (Stated Before Execution)

**Target:** create three new `generated_assets` rows on `appoqJ25B6w4vSuX9`, one per `PKT-SKU-009` slot. Use new phase identifier `PATH-A` to distinguish Path A's curation events from prior agentic curation events.

**Action:**

1. Capture pre-state (slot attachment IDs frozen as the "before" set)
2. ASK triggers fresh generation in Airtable UI on the three PKT-SKU-009 slots
3. Re-fetch slot state; identify new attachments by diff against pre-state
4. Download and view new candidates against both reference images (`product_image_lookup_lookup` for product truth, `packet_reference_image_lookup` for REF-002 studio-world binding)
5. Agent proposes selection per slot using reference-grounded family-coherent vision-based curation
6. ASK reviews and either ratifies or overrides
7. Create three rows with all provenance fields populated organically; `curation_pattern` reflects the actual delegation pattern that occurred

**Non-actions:**

- no schema mutation
- no other slots, packets, or modes
- no existing rows modified
- no promotion of new rows to `governed_output` (parallel ratified curation events; metadata-based agentic rows from #150 still hold `governed_output`)
- no AI field-agent configuration changes

**Terminal stop:** three new rows recorded with all provenance fields populated; findings synthesized.

## Execution Record

**Pre-state:** seven attachments per slot frozen as the baseline against which to identify fresh outputs.

**Generation:** ASK triggered fresh generation in Airtable UI on 2026-05-03 at approximately 19:50. Each slot received exactly one new attachment from the May 3 19:50 batch (presumably still on Gemini 3 Pro Image, the model in effect since the April 30 B-test variant 2 switch).

**Agent proposal:** Claude downloaded the three new fresh attachments and proposed all three for selection on the basis of within-round family coherence (same generation conditions across the three slot outputs). The agent reasoned that fresh + reference-bound + within-batch-coherent was the strongest pick.

**ASK override:** ASK reviewed the fresh batch against REF-002 and judged the fresh HERO and DETAIL off-ref on background tone (warmer than REF-002). The fresh PROFILE was judged acceptable. ASK selected cross-round:

| Slot | ASK pick | Round | Reason |
|---|---|---|---|
| HERO | `attHhekFb8MWgcIFg` | May 1 03:11 (penultimate) | Fresh HERO off-ref / too warm |
| PROFILE | `attZ8URYSdBWBt2fF` | May 3 19:50 (fresh) | Acceptable on background; only fresh-batch pick taken |
| DETAIL | `attP5XhJ5un2heqNW` | May 1 03:11 (penultimate) | Fresh composition preferable but background off-ref; fell back for all-axes balance |

This pick set explicitly **breaks within-round family coherence** in favor of best-per-slot across rounds.

**Row creation:** three rows created in a single batched call:

| Slot | Row ID | Source attachment | Status |
|---|---|---|---|
| HERO | `recNTHjyhXwDZJlMf` | `attHhekFb8MWgcIFg` | candidate |
| PROFILE | `recIfwRXLkLipYNkM` | `attZ8URYSdBWBt2fF` | candidate |
| DETAIL | `reca3b1iPG9Mcb8r9` | `attP5XhJ5un2heqNW` | candidate |

All three: `curation_pattern = human-cross-round-authorship-bearing-curation`; `curator = ASK (cross-round authorship-bearing); Claude (vision-based fresh-bias baseline, rejected)`.

## Findings

### 1. Within-round family coherence is tempting — five reasons

Several reasons compound that explain why the executor agent (and any reasonable curator-mind) gravitates toward within-round picks:

1. **Correlation with shared generation conditions.** Within a round, model + prompts + references + (likely) seed are constant. Outputs share those conditions, so they are *more likely* to be visually coherent — same lighting, same color palette, same shadow geometry. It is a real correlation that often holds when generation is well-configured.
2. **Lower curator cognitive load.** Picking from one round constrains the search space to N candidates instead of N×R across all rounds.
3. **Cleaner provenance story.** *"All three from May 1 03:11"* reads as one iteration result; cross-round picks read as patchwork.
4. **Conflation of "most recent" with "best."** Implicitly assumes the latest iteration is the cumulative-best state, so within-round coherence on the latest equals best state.
5. **Curator-mind preference for tidy outcomes.** Single-round picks feel like clean iteration deliverables; cross-round mixing feels like compromise.

All five are real. They explain why the agent baseline in this Path A test gravitated toward fresh-everything and why the corrected vision-based test in [#153](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/153) picked all-from-May-1-03:11 partly for these reasons. The pull is genuine.

### 2. The actual architectural goal

**Coherence across the approved governed-asset set, irrespective of source-round identity.**

The downstream consumer (catalog page, brand portfolio, governance review board) sees the approved assets as a set. They do not see *which round produced each*. They see whether the assets together read as one coherent family. If a single round delivers that: great — within-round coherence and approved-set coherence converge. If no single round does: cross-round mixing is required, and the curator's authorship genuinely spans rounds.

**Within-round coherence is a useful proxy heuristic that often correlates with the goal. It is not the goal.** When the proxy fails (as in Path A — no single round delivers cross-axis coherence with the corrected per-slot fidelity calls), the architecture must support cross-round assembly. The schema does — `generated_assets` rows point to attachments from any round, and the curation_pattern field captures the delegation pattern that produced the row.

### 3. Implementation goal vs conceptual goal

**Implementation goal:** architect and build the system such that within-round family coherence is the natural result of well-configured generation (because reasons 1–5 make within-round picks the cleanest, lowest-friction operational outcome). When the implementation delivers, the curator picks within-round and gets approved-set coherence by correlation.

**Conceptual goal:** coherence across the approved governed-asset set, irrespective of source-round identity. This is the load-bearing architectural criterion.

The two should converge in well-functioning generation. When they diverge — when generation rounds individually fail to deliver a coherent set — the curator's cross-round authorship satisfies the conceptual goal even when the implementation goal is unmet.

The architecture must support both modes simultaneously: aim for within-round coherence as the natural outcome (because it is the simpler operational story), but never close off cross-round assembly as a fallback when the curator's eye determines it is needed.

### 4. How this refines the cross-mode model

The [cross-mode layered-input model note](cross-mode-layered-input-model-and-curation-event-note.md) articulates *family coherence* as load-bearing at multiple layers (layer 1 collection-mode pressure; the curation seam's cross-output coherence verification across all four modes). Path A's finding sharpens this:

- **Family coherence is evaluated on the approved set, not on source-round identity.**
- **Within-round coherence is one useful path to it; cross-round selection is another.** The curator authoritatively chooses the path.
- **The architecture must make both legible.** Recording `curation_pattern` per row is part of how legibility is preserved; recording the source attachment makes the round traceable; the approved set is queryable independently of round identity.

Per AGENTS.md *do not retrofit evidence-chain artifacts*, the cross-mode model note itself stays as-is. This refinement lives in Path A's findings note as a forward refinement of the prior sketch.

### 5. Fifth `curation_pattern` value introduced

`human-cross-round-authorship-bearing-curation` is now visible in the dataset as the fifth distinct curation pattern alongside:

- `agent-proposed-human-ratified` (3 rows from #149)
- `batch-output-no-curator-selection` (2 rows from #151)
- `agent-vision-proposed-human-ratified` (3 rows from #153)
- (unset, structurally authorship-bearing) — milestone-5 HERO row

This is an authorship-bearing pattern, but with the cross-round qualifier honestly recorded. ASK ranged over the full candidate space across multiple rounds and selected per slot. This is the canonical authorship-bearing curation the article articulates, with a structural property (cross-round) that distinguishes it from a within-single-round authorship-bearing pattern.

The agent's vision-based fresh-bias baseline was rejected by ASK. The curator field records both ASK's authorship-bearing role and the agent's rejected baseline, preserving honest provenance of how the curation event unfolded.

### 6. Path C's open question reframed

Path C ([#155](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/155)) flagged an open question: *generation invocation may itself be a separate creative act distinct from curation.* Per ASK's correction recorded after Path C merged: **this was wrong.** Generation invocation is a tooling step that should run mechanically once inputs are configured. The current human-trigger requirement is a tooling limitation, not an architectural feature. Curation remains the singular creative-discretionary act inside the pipeline runtime.

The architecture's three layers of creative work:

| Layer | Creative? | Where |
|---|---|---|
| Meta-level system building (architecture, schema design, input structuring, discretion bounds) | Yes — at the architecture level | Upstream of the pipeline |
| Pipeline runtime (inputs → slots → generation invocation → candidate set) | No — should run mechanically once configured | Inside the pipeline |
| Curation seam (selection from candidates) | Yes — *the* bounded creative-discretionary act | At the end of the pipeline |

Path A's coordinated full-flow operates within this corrected framing. The human-side trigger on generation reflects current tooling, not architectural design intent.

### 7. Tooling-as-coordination summary

Path A's full-flow ran as a coordinated act:

- Pre-state captured by agent
- Generation triggered by human (tooling-bounded — connector cannot invoke)
- Candidates downloaded and viewed by agent
- Selection proposed by agent (rejected)
- Selection authored by human across rounds
- Rows created by agent under curation_pattern that records the actual delegation pattern
- Findings synthesized by agent

The handoff happens at `slot_generated_image_v1` (after generation, before curation) and again after the curator's authorship-bearing call. The architecture's `curation_pattern` field captured both the agent's rejected baseline and ASK's actual authorship cleanly.

## Structured Change Summary

**Why this change exists.** Path A is the second of three full-flow tests agreed with ASK. It tests the coordinated fresh-generation full-flow on an existing packet. Its findings refine the cross-mode model's family-coherence framing and surface the implementation-vs-conceptual goal distinction as a load-bearing architectural insight.

**What changed.** Three new `generated_assets` rows on PKT-SKU-009 (HERO, PROFILE, DETAIL) recording ASK's cross-round authorship-bearing selection. New `curation_pattern` value `human-cross-round-authorship-bearing-curation` added to the dataset. New asset_key phase identifier `PATH-A`. Path C's open question on generation invocation reframed as a tooling limitation.

**What did not change.** No schema mutation. Existing rows from prior PRs untouched. The cross-mode model note untouched (refinement lives forward in this artifact). The metadata-based agentic rows from #150 still hold `governed_output` for these slots. AI field-agent configuration unchanged. Other tables, modes, and bases untouched. AGENTS.md and grounding note untouched.

**What remains out of scope.**

- Path B (fresh-generation full-flow on brand-new PKT-SKU-010)
- Cross-mode application
- Promotion of any Path A row to `governed_output`
- Splitting `curation_pattern` into structured sub-fields
- `asset_uri` writeback blocker
- Backfill of milestone-5 HERO row's `curation_pattern`

## Open Questions / Next Pressure Points

1. **Path B — coordinated fresh-generation full-flow on PKT-SKU-010.** Next move. Tests with a brand-new packet where there is no iteration-history confusion.
2. **Cross-mode application.** Final v1 sweep item.
3. **How should the implementation be tuned to make within-round family coherence more reliably the natural outcome?** Per finding 3, the implementation goal is to make this the default. Concrete tuning surfaces include: prompt input hierarchy stability across slots, reference-binding consistency, model + seed determinism, family-aware generation invocation. Held as future work.
4. **Should `curation_pattern` enum-promotion be reconsidered now that five distinct values exist?** Still no. Five values across three structural classes (authorship-bearing, confirmation-bearing, no-curation-event) means the value space remains heterogeneous. Stay-as-text.
5. **Should the cross-mode model note's family-coherence framing be updated to reflect Path A's refinement?** Per AGENTS.md don't-retrofit, no — the refinement lives forward in this artifact.

## What This Note Does Not Do

- promote any of the three Path A rows to `governed_output`
- update the cross-mode model note (refinement lives forward here)
- backfill milestone-5 HERO row's `curation_pattern`
- introduce any new schema field
- claim that cross-round authorship-bearing curation should be the default pattern (it is the fallback when single rounds fail to deliver)
- claim that the agent's vision-based fresh-bias was a methodology failure (it was a defensible baseline that the curator's eye improved on; documenting the rejection honestly is the test outcome)

## Anchor Documents

- [`docs/full-flow-evidence-synthesis-pkt-sku-009.md`](full-flow-evidence-synthesis-pkt-sku-009.md): Path C synthesis that this note builds on
- [`docs/curation-event-vision-based-agentic-test-findings-pkt-sku-009.md`](curation-event-vision-based-agentic-test-findings-pkt-sku-009.md): vision-based agentic test that established the prior baseline
- [`docs/curation-event-agentic-test-findings-pkt-sku-009.md`](curation-event-agentic-test-findings-pkt-sku-009.md): the metadata-based agentic test, with ASK's recently-added articulation of the agentic-vs-algorithmic distinction and the authorship-bearing-vs-confirmation-bearing question
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): the cross-mode v3 architecture sketch whose family-coherence framing this note refines forward
- [`docs/curator-field-and-backfill-sku-driven-furniture-v1.md`](curator-field-and-backfill-sku-driven-furniture-v1.md): the curator field move
- [`docs/governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md`](governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md): the curation_pattern field move
- [The Creative Act of Selection](https://atomicspacekitten.substack.com/p/the-creative-act-of-selection): the article framing curation as the creative act
- [The Beautiful Picture is Not the…](https://atomicspacekitten.substack.com/p/the-beautiful-picture-is-not-the): the article framing the slot-inconsistency / family-coherence pressure that this finding refines
