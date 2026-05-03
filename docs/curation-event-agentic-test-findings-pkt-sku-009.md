# Curation Event Agentic Test Findings // PKT-SKU-009

## Purpose

This note records the first agentic curation event test on the SKU-driven Furniture v1 base. Three new `generated_assets` rows were created — one per `PKT-SKU-009` slot (HERO, PROFILE, DETAIL) — with all four curation-event provenance fields populated organically at row creation, not backfilled.

The test is the first to exercise the curation-event flow with the four provenance fields populated *forward* (present-tense curator description) rather than reconstructed. It is also the first to prototype an agentic-first curation pattern in which the curator role is partially delegated to the executor agent.

Outcome: **Supported.** All three rows created cleanly; all four provenance fields populated organically on first write; no tool-layer issues.

## What This Note Articulates: The Meta-Test

The traditional curator role — selecting from candidates and accepting one as a sanctioned governed asset — is being prototyped here as a *delegation pattern*. The agent (executor in the active session) proposes a candidate per slot based on its accessible inputs. ASK's role compresses from open creative selection to confirm-or-redirect.

The intended pattern, articulated here so future readers can recognize and pressure-test it:

- **Wider selection** is the agent's responsibility — survey candidates, apply a defensible heuristic, propose one per target slot.
- **Higher-level capture** is reduced to confirmation or redirect — binary or near-binary input from ASK, rather than open creative judgment per candidate.
- **Provenance** is recorded at the curation event, including which agent proposed, which heuristic was used, which limitations apply, and that ASK ratified.

**Why test this.** Real-world creative-asset operations may need to scale far past the rate at which a single human can perform open curation per asset. Agentic-first curation is a possible compression. Whether it produces *good* outcomes aesthetically is a separate question from whether it produces *clean* structural records. This test addresses only the second: does the system record the event cleanly when the curator role is delegated.

**What "agentic" means in this test — and what it more honestly is.** This test prototypes *algorithmic* curation delegated to an agent. The agent (executor in this session) followed a fixed rule rather than exercising judgment-bearing discretion. The rule was: *select the most recent generation attempt in the slot's attachment array, on the inferred reason that successive regenerations during debugging iteratively converged toward the lead candidate.* The "first-in-array" detail is the implementation; the load-bearing semantic content is *most recent equals presumed best after iterative debugging.*

Calling this "agentic" is generous. The agent's contribution was rule-application, not creative discretion. Richer agentic patterns — vision-based comparison, multi-criterion synthesis, judgment under uncertainty — are not yet tested. The artifact uses *agentic* as the umbrella label for "curation delegated to an executor process" while reserving *algorithmic* for the specific kind of delegation tested here.

The test is also metadata-based, not vision-based. Vision-based agentic curation remains a clean separate future test.

**What ASK's ratification means here — and the open question it raises.** ASK approved the agent's three proposed selections without flipping any of them. But ratifying an algorithmic pre-narrowing is structurally different from selecting from a raw candidate pass:

- In a raw-pass curation, the curator's discretion ranges over the full candidate space.
- In a ratification of an algorithmic pre-narrowing, the curator's discretion compresses to a binary or near-binary "approve or redirect" against a single proposal.

The compression is real and load-bearing for how the architecture models creative authorship. The well-known human-in-the-loop biases — anchoring, satisficing, deference to algorithmic defaults — apply: a human presented with one algorithmic recommendation is more likely to approve it than they would be to pick the same option from a raw pass. So ASK's ratification cannot be treated as straightforwardly equivalent to a raw-pass selection. The discretion was exercised; it was just narrower in shape.

This raises an open architectural question: should the system distinguish between *authorship-bearing curation* (raw-pass selection) and *confirmation-bearing approval* (ratification of a pre-narrowed default)? If the goal is to preserve creative discretion as a legible governance act, the architecture probably needs to record which pattern produced any given governed asset. The current schema does not — `capture_reason` and `capture_notes` carry the textual record of how the choice was made, but no structured field distinguishes raw-pass from ratification patterns.

This question is articulated more durably in the project grounding note under philosophical anchors, since it touches the foundational framing of curation as creative authorship.

## Plan (Stated Before Execution)

**Target:** create three new `generated_assets` rows on `appoqJ25B6w4vSuX9`, one per `PKT-SKU-009` slot. The existing milestone-5 thin-bridge HERO row remains as-is; the new HERO agentic row coexists with it.

**Action:** for each slot, agent proposes a candidate using the heuristic *first attachment in slot's attachment array (presumed lead candidate from the most recent generation batch)*. ASK ratifies or redirects per slot. Rows are created with all four provenance fields populated organically; new `asset_key` pattern `ASSET-PKT-SKU-009-AGENTIC-{SLOT}-ATTEMPT1-{attachmentId}` introduces `AGENTIC` as a new phase identifier alongside the existing `GATE2` and `GATE6` phases.

**Non-actions:**

- no AI field-agent configuration
- no generation invocation
- no other slots, packets, or modes touched
- no existing `generated_assets` rows modified
- no `governed_output_status` promotion (all three new rows stay `candidate`)
- vision-based agentic curation deferred

**Terminal stop:** three new rows exist with all four provenance fields organically populated.

## Execution Record

ASK ratified all three agent-proposed selections in a single confirmation. Three rows created in a single batched `create_records_for_table` call. No tool-layer issues. No deviations from the plan.

Final post-state:

| Slot | Row ID | Source attachment | `capture_reason` | `captured_at` |
|---|---|---|---|---|
| HERO | `recAGC8vFHTjvD5fH` | `attHhekFb8MWgcIFg` | `agentic-curation-attempt-1` | 2026-05-02T18:00:00Z |
| PROFILE | `rec5IfLrRxQilTpDt` | `att7ZYkBhsCbDIGzj` | `agentic-curation-attempt-1` | 2026-05-02T18:00:00Z |
| DETAIL | `recvyDFRJ13acUhFA` | `attP5XhJ5un2heqNW` | `agentic-curation-attempt-1` | 2026-05-02T18:00:00Z |

All three: `governed_output_status = candidate`, `governed_output_flag = 0`, `review_artifact_flag` unset, `packet_key` linked to `PKT-SKU-009`, `output_slot` linked to the corresponding slot.

## Findings

### 1. Forward population: Supported

The four provenance fields populated cleanly on row creation, not backfill. This is the first time the curation event has been recorded *as it happened* in the v1 evidence chain. No tool-layer issues.

### 2. HERO selection convergence

The agent's metadata heuristic for HERO selected `attHhekFb8MWgcIFg` — the same attachment that the milestone-5 thin-bridge HERO selection captured. Agentic and historical curation converged on the same source attachment under different curation contexts. This is a single data point, not a generalizable claim about agentic reliability, but it surfaces a useful architectural observation:

> **Multiple governed-asset rows can coexist for the same slot under different curation contexts.** The slot now has two rows (`recSS08Vhnw5RuuUc` from milestone-5 thin bridge, `recAGC8vFHTjvD5fH` from agentic curation) both pointing to the same source attachment via different `asset_key` namespaces. The schema supports this without strain because `output_slot` is `multipleRecordLinks` from the `generated_assets` side.

This raises a clean follow-on question: when multiple governed-asset rows exist for one slot, which one is *the* governed output for downstream consumption? Currently both rows have `governed_output_status = candidate`, so neither is yet promoted; the question is parked behind the unresolved `governed_output` promotion question.

### 3. New `capture_reason` value adds a third structural pattern

Three populated rows now share `agentic-curation-attempt-1`. With the prior populated rows, the dataset now contains three distinct `capture_reason` values across three different naming structures:

| Value | Naming structure | Rows |
|---|---|---|
| `thin-bridge-gate-2-attempt-1` | `<concept>-<gate>-<attempt-N>` | 1 (PKT-SKU-009 HERO milestone-5 row) |
| `gate-6-packet-level-attempt-1` | `<gate>-<context>-<attempt-N>` | 2 (PKT-SKU-007 DETAIL + PROFILE) |
| `agentic-curation-attempt-1` | `<context>-<attempt-N>` (no gate) | 3 (PKT-SKU-009 HERO + PROFILE + DETAIL agentic) |

The third structure has *no gate identifier at all*. This is honest — the agentic curation event isn't anchored to a numbered gate sequence; it's a separate phase identifier (`AGENTIC` in the `asset_key` namespace). The growing structural diversity reinforces the [#147](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/147) verdict: **`capture_reason` should stay as text.** Three structurally different naming patterns across six populated rows is strong evidence that no enum normalization is yet ready.

If we were to force normalization, we would need to either retrofit the historical rows or invent a placeholder gate identifier for non-gate-anchored events — both of which would erase honest provenance.

### 4. Asset_role casing inherited from PKT-SKU-009 precedent

The new rows use uppercase `HERO`, `PROFILE`, `DETAIL` — matching the existing `PKT-SKU-009` HERO row precedent. This continues the within-packet consistency but does not resolve the cross-packet inconsistency with `PKT-SKU-007`'s lowercase snake_case (`detail_crop`, `profile_side`). The inconsistency is recorded; not corrected.

### 5. `review_artifact_flag` unset on all three new rows

Different from the milestone-5 HERO row's `review_artifact_flag=true`. The agentic curation event is not framed as a review artifact — it is a candidate-grade governed asset that has not yet been promoted. Setting the flag false is more semantically correct, but it widens the existing semantic inconsistency (which the milestone 6 plateau notes already records).

### 6. Curator identity remains implicit

The `capture_notes` text records "ASK ratified the proposal in the executor session" — making the agentic plus ratification pattern legible in free text. There is still no first-class `curator` field. If multi-curator or agent-vs-human curator distinction becomes load-bearing, that field becomes earned.

### 7. Algorithmic versus agentic curation — the meta-test refines

The test as run prototyped *algorithmic* curation, not agentic curation in any judgment-bearing sense. The agent applied a fixed rule. The richer agentic patterns — vision-based comparison, multi-criterion judgment under uncertainty, synthesis of conflicting constraints — remain untested. This refines the meta-test framing: the artifact uses *agentic* as the umbrella label for "curation delegated to an executor process" while reserving *algorithmic* for the specific kind of delegation tested here.

The follow-on architectural question — *whether ratification of an algorithmic pre-narrowing is the same kind of creative authorship as raw-pass selection, given anchoring and satisficing biases* — is articulated above under "What ASK's ratification means here — and the open question it raises" and is added to the project grounding note's philosophical anchors as a durable open thread.

## Structured Change Summary

**Why this change exists.** The milestone 6 plateau identified the next natural pressure point as a fresh organic curation event populating `capture_reason` with a non-historical data point. ASK chose to scope this as the smaller honest unit (curation against existing candidates, not generation invocation), with the meta-pattern of agentic-first curation as the test prototype.

**What changed.** Three new `generated_assets` rows on the SKU-driven Furniture v1 base, one per `PKT-SKU-009` slot. All four provenance fields populated organically on row creation. The HERO slot now has two coexisting governed-asset rows (milestone-5 thin bridge + agentic), pointing to the same source attachment via different `asset_key` namespaces.

**What did not change.** No schema mutation. No existing rows modified. The milestone-5 HERO row, `PKT-SKU-007` rows, and all unbridged slots in other packets remain in their prior states. Other tables, modes, and bases untouched. AI field-agent configuration unchanged. No generation invocation. `governed_output_status` remains `candidate` on all three new rows.

**What remains out of scope.**

- Vision-based agentic curation
- Generation invocation followed by curation in a single end-to-end test
- `governed_output_status` promotion for any row
- Resolution of multiple-rows-per-slot semantics (which row is *the* governed output?)
- A first-class `curator` field
- Reconciliation of `review_artifact_flag` semantics
- Reconciliation of `asset_role` casing
- Promotion of `capture_reason` to singleSelect (this test reinforces the "stay as text" verdict)
- Cross-mode application beyond the SKU base
- Production-readiness claims

## What This Mutation Resolves

- The forward (non-backfill) population of curation-event provenance is verified Supported.
- The agentic-first delegation pattern is prototyped at minimum scope: agent proposes, human ratifies, structural record is clean.
- A third structural naming pattern for `capture_reason` is now present, firmly closing the enum-readiness verdict at "stay as text" with concrete diversity evidence.
- Multiple governed-asset rows per slot under different curation contexts is shown to be schema-supported (cleanly coexisting rows, distinct `asset_key`s).

## Open Questions / Next Pressure Points

1. **Which row is *the* governed output when multiple coexist?** PKT-SKU-009 HERO now has two governed-asset rows. Both `candidate`. When a downstream consumer asks "what's the HERO?", the system has no answer yet. Resolution requires either (a) a `is_primary_governed_output` flag, (b) a slot-side back-link choosing one, or (c) a promotion convention (`governed_output_status = governed_output` only on the chosen one). Not opened here.
2. **Vision-based agentic curation as the next test.** This test established metadata-based agentic curation flows cleanly. The richer agentic test — agent visually inspects candidates and selects on aesthetic criteria — is a clean separate next move.
3. **Full-flow test (generation + curation).** Still deferred. Requires AI field-agent configuration and generation invocation under the new mutation discipline.
4. **`curator` identity as a first-class field.** Now slightly more pressured because agent vs human curator is becoming a real distinction worth recording structurally rather than only in `capture_notes` free text.
5. **Capture-mechanics formal reopen.** The trigger has now been flagged in three notes. Whether to act formally remains a separate decision.
6. **Authorship-bearing curation versus confirmation-bearing approval.** Whether the schema should structurally distinguish raw-pass selection from ratification of a pre-narrowed default. Currently absent; recorded only in free-text `capture_notes`.

## What This Note Does Not Do

- claim agentic-first curation is the right default
- claim metadata-based agentic curation produces the right aesthetic outcomes
- promote any row's `governed_output_status`
- resolve multiple-rows-per-slot semantics
- introduce a `curator` field
- reconcile cross-packet `asset_role` casing
- reconcile `review_artifact_flag` semantic drift
- formally reopen capture-mechanics

## Anchor Documents

- [`docs/milestones/milestone-6-curation-event-first-class-plateau.md`](milestones/milestone-6-curation-event-first-class-plateau.md): the plateau this builds from
- [`docs/curation-event-population-findings-pkt-sku-009.md`](curation-event-population-findings-pkt-sku-009.md): first backfill (milestone-5 HERO row)
- [`docs/curation-event-population-findings-pkt-sku-007.md`](curation-event-population-findings-pkt-sku-007.md): parallel backfill plus first cross-packet enum-readiness analysis
- [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](curation-event-schema-mutation-sku-driven-furniture-v1.md): the schema mutation that established the four provenance fields
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): cross-mode v3 architecture sketch
