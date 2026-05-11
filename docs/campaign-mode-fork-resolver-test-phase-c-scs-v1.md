# Campaign-Mode Fork-Resolver Test // Phase C Structured Change Summary v1

## 1. Header / Posture

Phase C structured change summary; durable execution record.

- **Packet:** `PKT-CAMP-004-KITCHEN_PREP` (`recrqWoGXKEVtnh4I`)
- **Base:** Campaign-Driven D2C Home-Goods v1 (`appCAcRuA82SWj5h5`)
- **Scope:** Phase C preflight + Path A generation across three slots + curation/writeback into `generated_assets` + `slot_status` transitions to `generated`
- **Companion artifacts:** [`docs/campaign-mode-fork-resolver-test-setup-v1.md`](campaign-mode-fork-resolver-test-setup-v1.md) (Phase A pre-registration), [`docs/campaign-mode-fork-resolver-test-phase-b-scs-v1.md`](campaign-mode-fork-resolver-test-phase-b-scs-v1.md) (Phase B SCS), [`docs/campaign-mode-fork-resolver-test-phase-c-plan-v1.md`](campaign-mode-fork-resolver-test-phase-c-plan-v1.md) (Phase C plan)

This artifact is not Phase D synthesis, not a fork resolution, and not doctrine. It records what Phase C did, in what order, with what observed behavior.

## 2. Phase C preflight finding

§4.1 state inspection across the three PKT-CAMP-004 slot rows produced **outcome class: Empty** after a brief connector/UI disambiguation. The connector returned no `slot_generated_image_v1` attachments and no `generation_attempt_reference` values, with all three slots' `slot_status` unchanged at `planned` from Phase B. ASK's UI check confirmed the slots showed a "Run agent" button rather than populated attachments; the connector's empty-field omission was the correct interpretation.

§4.2 field-agent configuration finding (captured from the Airtable field-configuration UI on `output_slots.slot_generated_image_v1`):

- **Configuration scope:** field-scoped AI agent on `slot_generated_image_v1`, not table-level automation
- **Inputs consumed (in declared order):**
  1. `slot_prompt` — role-specific generation instruction
  2. `packet_reference_image_lookup` — studio-world visual reference (background, floor/wall plane, cove transition, lighting direction, shadow behavior)
  3. `product_image_lookup_lookup` — product identity / object truth (preserve identity + proportions, do not copy product-image background)
- **Trigger:** Manual — "Run agent" button per row. "Automatic generation" toggle is OFF
- **Model fidelity:** UI banner reports "The selected model does not support additional input fidelity options"
- **Empirical evidence of prior operation:** SLOT-CAMP-002 and SLOT-CAMP-003 rows in the same base show populated attachments from the same field-agent

**Path selected: A (Airtable AI field-agent manual trigger).** Path B (operator-driven Flow / Nano Banana Pro) reserved as fallback per grounding-note v55 §Prototype-Aesthetic Imagery Workflow.

## 3. Generation execution

Three "Run agent" invocations on the three PKT-CAMP-004 slots produced one attachment per click, written to each slot's `slot_generated_image_v1`. After OBJECT_VIGNETTE prompt remediation (§5 Layer 1), a second invocation on that slot appended a v1 attachment alongside v0.

| Slot | Attachment ID | Airtable filename | Dimensions | Local archive |
|---|---|---|---|---|
| HERO_WORLD (`recbMxKMvahBjZn7t`) | `attJRmBMisnRWotpm` | `Image_May_11_2026_2_56_AM.jpeg` | 1024×1024 | `asset-pipeline-ASK-EXTERNAL/scratch/fork-resolver-test-imagery/phase-c-generations/SLOT-CAMP-004-HERO_WORLD_attJRmBMisnRWotpm.jpeg` |
| LIFE_IN_USE (`recBJF31a1FKzVTWy`) | `attjh0vniPAE7dx6X` | `Image_May_11_2026_2_56_AM.jpeg` | 1024×1024 | `asset-pipeline-ASK-EXTERNAL/scratch/fork-resolver-test-imagery/phase-c-generations/SLOT-CAMP-004-LIFE_IN_USE_attjh0vniPAE7dx6X.jpeg` |
| OBJECT_VIGNETTE v0 (`recXYpiHSAXRSrQ1n`) | `attqTOa50gBYbf7kJ` | `Image_May_11_2026_2_57_AM.jpeg` | 1392×768 | `asset-pipeline-ASK-EXTERNAL/scratch/fork-resolver-test-imagery/phase-c-generations/SLOT-CAMP-004-OBJECT_VIGNETTE_attqTOa50gBYbf7kJ.jpeg` — non-curatable grid-packaging artifact |
| OBJECT_VIGNETTE v1 (`recXYpiHSAXRSrQ1n`) | `attMQDGMhrOGNuJiZ` | `Image_May_11_2026_3_29_AM.jpeg` | 1392×768 | `asset-pipeline-ASK-EXTERNAL/scratch/fork-resolver-test-imagery/phase-c-generations/SLOT-CAMP-004-OBJECT_VIGNETTE_attMQDGMhrOGNuJiZ.jpeg` — curatable single composition after prompt remediation |

Local archive directory: `asset-pipeline-ASK-EXTERNAL/scratch/fork-resolver-test-imagery/phase-c-generations/`.

**Path A candidate volume:** one attachment per Run agent click. The Phase C plan §5 "x4 per Flow precedent" assumption did not transfer to Path A; per-slot candidate volume was much lower.

**Append behavior:** append-not-overwrite behavior was confirmed again in Phase C and remains consistent with the prior Phase 2C/2D bedroom plan. OBJECT_VIGNETTE retains both v0 and v1 attachments after the second Run agent invocation.

## 4. Curation / writeback

Three `generated_assets` rows created under strict per-slot batch discipline. Each batch comprised one create on `generated_assets` plus one update on `output_slots` (`slot_evaluation_notes` append + `slot_status` transition).

| Slot | `generated_assets` record | `asset_key` | `source_attachment_id` | Re-cached `asset_attachment` id |
|---|---|---|---|---|
| HERO_WORLD | `rechpzdhccAtfacY0` | `ASSET-CAMP-004-HERO_WORLD-001` | `attJRmBMisnRWotpm` | `attvTM0OgqXrPU5x9` |
| LIFE_IN_USE | `reczZGd9NbSCULEwv` | `ASSET-CAMP-004-LIFE_IN_USE-001` | `attjh0vniPAE7dx6X` | `attcgMbaptXoC6Pqh` |
| OBJECT_VIGNETTE | `recKTx19TQblfPNkW` | `ASSET-CAMP-004-OBJECT_VIGNETTE-001` | `attMQDGMhrOGNuJiZ` (v1 only; v0 grid explicitly excluded in `capture_notes`) | `att9xzOQbEvyGL9jt` |

All three rows: `governed_output_status = governed_output`, `governed_output_flag = 1`, `curation_pattern = confirmation-bearing`, `curator = "Claude (proposing); ASK (ratifying)"`, `review_artifact_flag = false`.

`slot_status` transitions: `planned` → `generated` on all three slot records. `accepted` is reserved for downstream review-shaped acceptance and is not used in Phase C.

`workflow_packets.governed_output_count` rollup on `PKT-CAMP-004-KITCHEN_PREP` incremented `0` → `3` over the three batches; reverse-linked list of generated assets surfaces all three.

Live attachment-copy guard: each batch re-fetched the source attachment URL from `slot_generated_image_v1` immediately before the `generated_assets` create call rather than reusing pasted URLs, on account of Airtable URL rotation.

## 5. Deviations and observations

**Sequencing deviation — Phase C generation cadence.** The Phase C plan §8 specified strict per-slot generation batches with a hard stop before curation, opened in-thread one at a time. In practice, all three Run agent clicks happened before the first-slot mechanics review. This is the second gate-order deviation in the test arc. The Phase B imagery-gate breach affected preflight order; the Phase C generation sequencing deviation affected review cadence but did not corrupt the candidate set. Curation batches (Phase C §7) were executed in strict per-slot shape per ASK's direction after this deviation surfaced.

**Layer 1 — Prompt-architecture leak on OBJECT_VIGNETTE.** The Phase B-authored slot_prompt enumerated alternative subjects (*"Possible subjects: bread loaf alone, cutting board alone, prep bowl alone, or kitchen towel alone — one object..."*). The model interpreted the enumeration as a directive to produce all four and packaged them as a tiled grid in a single attachment. The Layer 1 violation is structural: the slot abstraction expects slot-prompts to commit to one composition; enumerative phrasing leaks the candidate-space across the slot/prompt boundary. Remediation: slot_prompt revised to commit to the matte ceramic prep bowl as a single foreground subject, with explicit "no multi-panel layout, no tiled grid, no alternate subject options" defenses. The re-run produced a clean single-composition output.

**Layer 2 — AI field-agent grid-packaging artifact.** Independent of the Layer 1 prompt issue: the Airtable AI field-agent writes whatever the model produces into one attachment, including tiled composites of N images. One attachment ≠ one candidate in the agent's behavior, which breaks the `source_attachment_id` provenance assumption that the Phase C plan §7.4 rests on. `source_attachment_id` cannot point at "tile 3 of 4 within attachment X." Layer 1 prompt hygiene closes the trigger but does not eliminate the agent's underlying packaging behavior. v0 grid attachment `attqTOa50gBYbf7kJ` preserved alongside v1 in `slot_generated_image_v1` and in the local archive as durable evidence.

**Path A aspect-ratio behavior.** HERO_WORLD and LIFE_IN_USE candidates were 1024×1024 square; both OBJECT_VIGNETTE attachments (v0 grid and v1 single) were 1392×768 wide. No aspect-ratio cue appeared in any slot_prompt. The model defaulted to wide aspect for the OBJECT_VIGNETTE slot's content. Observation only; not a drift surface.

## 6. Preliminary fork evidence

Curation appears confirmation-bearing / configuration-shaped across all three slots; authorship-bearing moments surfaced upstream. This is preliminary fork-readable evidence, not fork resolution.

Per-slot summary:

- **HERO_WORLD** — configuration-shaped at curation (`generated_assets.curation_pattern = confirmation-bearing`); no upstream authorship-bearing observation; Phase B record was configuration-shaped at prompt-authoring; Phase C ratification was mechanical
- **LIFE_IN_USE** — configuration-shaped at curation (`generated_assets.curation_pattern = confirmation-bearing`); upstream authorship-bearing observation preserved at Phase B prompt-authoring (the decision to reinterpret the slot as "evidence of recent use without active gesture" rather than override packet no-hands constraint); curation ratified what the authored prompt produced
- **OBJECT_VIGNETTE** — configuration-shaped at curation on v1 (`generated_assets.curation_pattern = confirmation-bearing`); upstream operational authorship-moment at Phase C prompt-remediation (the decision to recognize the v0 grid as a tooling-layer artifact and revise the slot_prompt); curation ratified the post-remediation v1 default

The premise-holds reading of the fork (curation seam carries the bounded creative discretion) predicts Phase C curation discretion to be where the load-bearing authorship would surface. The observed evidence places real authorial moments elsewhere in the pipeline — at prompt-authoring (LIFE_IN_USE) and at operational artifact-recognition (OBJECT_VIGNETTE), not at curation in any slot. Whether this tilts the fork toward `refines` (the seam is still the seam but with new authored material upstream) or toward `fragments` (multiple seams, multiple discretion sites) is held for Phase D synthesis.

## 7. What remains

Phase D — findings synthesis. Cross-reading the three slot discretion observations + packet ledger + governed-output evidence against the curation-premise fork (`holds` / `refines` / `fragments`).

Durable-home decision for the Layer 1 and Layer 2 findings: deferred. Phase C SCS records them as execution findings; Phase D synthesis may determine whether they earn a sibling artifact or limitations-note amendment.

The test scope remains bounded: a single campaign-mode packet against a single set of products. No expansion to additional packets, no cross-base move within this test.

## 8. What did not change / out of scope

- No schema mutation; no field additions, type changes, rollup or formula changes, or enum changes
- No `seam_runs` row created — gap noted in `generated_assets.source_seam_run_key` (empty on all three rows); not fabricated
- No `review_gates` row created; gap noted
- No `slot_status` transitions to `accepted` — reserved for downstream review-shaped acceptance, not used in Phase C
- No fork promotion beyond `Held Questions` posture in [`docs/architecture.md`](architecture.md)
- No `AGENTS.md` rule additions proposed by this SCS
- No updates to [`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md)
- No amendments to [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md)

## 9. Anchor documents

- Phase A pre-registration: [`docs/campaign-mode-fork-resolver-test-setup-v1.md`](campaign-mode-fork-resolver-test-setup-v1.md)
- Phase B SCS: [`docs/campaign-mode-fork-resolver-test-phase-b-scs-v1.md`](campaign-mode-fork-resolver-test-phase-b-scs-v1.md)
- Phase C plan: [`docs/campaign-mode-fork-resolver-test-phase-c-plan-v1.md`](campaign-mode-fork-resolver-test-phase-c-plan-v1.md)
- Architecture § Held Questions § Curation-Premise Architectural Fork: [`docs/architecture.md`](architecture.md)
- Operator-judgment protocol sketch: [`docs/operator-judgment-protocol-sketch-v1.md`](operator-judgment-protocol-sketch-v1.md)
- Visual-identity-system → IA mapping: [`docs/brand-system-input-visual-identity-system-to-ia-mapping-v1.md`](brand-system-input-visual-identity-system-to-ia-mapping-v1.md)
- Airtable connector limitations: [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md) (referenced, not amended)
- Grounding-note (ex-repo, source-of-intent): §Prototype-Aesthetic Imagery Workflow + §Capture is selection
- Live prototype base: [Campaign-Driven D2C Home-Goods v1](https://airtable.com/appCAcRuA82SWj5h5)
