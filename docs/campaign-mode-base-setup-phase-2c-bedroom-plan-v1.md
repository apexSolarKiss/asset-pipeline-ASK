# Campaign Mode Base Setup // Phase 2C/2D Bedroom Plan v1

## Purpose

This is the per-packet **Phase 2C/2D plan** for the **bedroom packet** (PKT-CAMP-001-BEDROOM) — the first of three per-packet operational arcs in the campaign-mode operational test. The plan bundles generation (Phase 2C) and curation/writeback (Phase 2D) because curation is load-bearing for this arc; framing it as Phase 2C alone would bury the curation step that produces the governed-asset evidence.

Per the merged Phase 2 operational plan ([`docs/campaign-mode-base-setup-phase-2-operational-plan-v1.md`](campaign-mode-base-setup-phase-2-operational-plan-v1.md)) §Sequencing, Phase 2C requires per-packet sub-authorization, and Phase 2D curation is **bundled with Phase 2C per packet, mirroring the Path B per-packet arc** ([`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md)).

This plan covers the bedroom packet's full per-packet arc: generation invocation across the 3 bedroom slots (Phase 2C) → per-slot curation with full provenance writeback into `generated_assets` (Phase 2D). The table and bath packets will receive their own per-packet plans following this precedent.

It is the plan-before-execute artifact required by AGENTS.md Airtable Mutation Discipline. It does not authorize Phase 2C/2D-bedroom mutation; it defines what the bedroom per-packet arc would do if ASK authorizes it, and what evidence the post-arc Structured Change Summary must record.

## Posture

```text
plan only — no airtable mutation in this artifact
phase 2C/2D-bedroom scope: generation across 3 bedroom slots; curation + provenance writeback for those 3 slots
phase 2C/2D-bedroom out of scope: table packet; bath packet; cross-packet coherence check (Phase 2E); findings synthesis (Phase 2F); schema mutation; new fields; SKU base modifications; seam_runs creation; v2 apex
no rewrite of architecture.md / apex / predecessor passes / D2 decision note / setup-decision note / setup-content artifact / Phase 2 operational plan / Phase 2A plan / Phase 2A-i SCS / Phase 2A-ii SCS / Phase 1 plan / Phase 1 amendments / Phase 1 SCS / connector limitations doc / v50 grounding note / Phase 2B plan / Phase 2B SCS
no v2 apex
no Phase 2E / 2F scope opening
no authorization for Phase 2C/2D-bedroom mutation itself
```

The diagnostic caveat from the setup-decision artifact, Phase 2A plan, Phase 2B plan, and Phase 2 operational plan continues to apply. Phase 2A-i + Phase 2A-ii satisfied the procedural minimum for Q5 (weak articulation / underbuilt setup) ambiguity reduction. Phase 2B confirmed Configuration Supported (Q4 reduced for the configuration step). Phase 2C/2D-bedroom is the first packet's evidence pass; the diagnostic lens reads against this packet's evidence as the first concrete-example pressure on the apex's Named Limitation #3 for cross-base + cross-brand + campaign-mode.

## Tool / Surface

- **Active tool for Phase 2C generation**: Airtable UI on the campaign base (`appCAcRuA82SWj5h5`). Per-row generation triggered via the AI field-agent's manual generation action on each `output_slots` row.
- **Active tool for Phase 2D curation + writeback**: Airtable connector (executor-side) writing `generated_assets` rows with full provenance. The `asset_attachment` writeback uses the Path B attachment-copy mechanic (copy the chosen attachment object from `slot_generated_image_v1` to `generated_assets.asset_attachment`).
- **Why operator-side for generation**: the AI field-agent's generation invocation is a UI/agent-runtime trigger; per Phase 2 operational plan §Connector-Capability Preflight, generation outputs are populated by Airtable's agent, not by the connector.
- **Why connector-side for curation + writeback**: per Path B precedent ([`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md)), `generated_assets` row creation with provenance fields and attachment-copy writeback is connector-supported.

## Phase 2B Terminal State (precondition)

Phase 2C/2D-bedroom begins from the Phase 2B terminal state confirmed in the Phase 2B SCS ([`docs/campaign-mode-base-setup-phase-2b-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-2b-structured-change-summary-v1.md)):

- AI field-agent Image field configured on `output_slots.slot_generated_image_v1` (field ID `fldbgHhMdEXDdztRk`); model Gemini 3 Pro Image; Preserve input details ON; Automatic generation OFF; three load-bearing inputs (`slot_prompt`, `packet_reference_image_lookup`, `product_image_lookup_lookup`); faithful-mirror prose wrapper.
- v0 baseline: each `output_slots` row carries one attachment from the auto-first-run (Limitation #6) — recorded as configuration-side baseline evidence, not authorized Phase 2C output. Phase 2C/2D-bedroom **preserves the v0 attachments**; Phase 2C generation appends candidates alongside v0; Phase 2D curation may select v0 as the elevated candidate or may select a Phase 2C-authorized candidate. **If v0 is selected, the SCS must record that the elevated asset originated from the Phase 2B involuntary auto-first-run (Limitation #6), not from the authorized Phase 2C generation pass — this is provenance discipline, not a downgrade of the candidate.**
- 9 `output_slots` rows with `slot_status: planned`; 3 `workflow_packets` with `packet_status: draft`; `generated_assets` and `seam_runs` tables empty.
- All 7 lookup chains verified end-to-end (Phase 2A-ii SCS).

## Bedroom Packet Specifics

| Attribute | Value |
|---|---|
| Packet record | PKT-CAMP-001-BEDROOM (`recW4aY2Hm1JTWK4j`) |
| Packet status | `draft` |
| Linked products | SKU-CAMP-BEDSHEET-001 (`recI1zGjVeu3pbCIZ`) — 1 product |
| Linked references | 5 brand-system references (LIGHT / PALETTE / MATERIAL / HUMAN / RESTRAINT) + 1 packet-atmosphere reference (REF-CAMP-001-BEDROOM-ATMOSPHERE-001) — 6 total |
| Slots | SLOT-CAMP-001-HERO_WORLD, SLOT-CAMP-001-LIFE_IN_USE, SLOT-CAMP-001-OBJECT_VIGNETTE — 3 slots |
| Slot prompts | populated per Phase 2A-ii (181–287 chars per slot) |
| Slot status | `planned` across all 3 |
| v0 baseline | 1 attachment per slot from auto-first-run (HERO_WORLD: 1392×768; LIFE_IN_USE: 1024×1024; OBJECT_VIGNETTE: 1392×768) |

## Phase 2C-Bedroom Scope (Generation)

Operator-side regeneration runs against the AI field-agent on the 3 bedroom slots, accumulating candidates in `slot_generated_image_v1`.

### Generation target — round 1 (fixed scope)

| Variable | Authorized value | Rationale |
|---|---|---|
| Candidates per slot | **Exactly 2 additional candidates per slot** beyond the v0 baseline; total candidate pool of **exactly 3 per slot** (v0 + 2 Phase 2C-authorized) | Bounded comparison space; avoids ballooning the candidate space at the first controlled evidence pass; matches Path B precedent's per-slot pool depth without runaway cost |
| Iteration discipline | Round 1 is fixed at exactly 2 additional generations per slot. Additional retries beyond round 1 require **either** an explicit per-slot operator note before the retry trigger, **or** a follow-on retry authorization captured after the bedroom SCS lands. No silent iteration. | Preserves diagnostic Q4 / Q5 separation; ensures iteration is a recorded decision, not drift |
| Model parameters | **Hold constant** for round 1: Gemini 3 Pro Image; Preserve input details ON; same prose wrapper | Holds Q4 (tool / model failure) interpretation cleanly; any parameter variation in retry rounds requires the explicit-note discipline above and SCS recording |
| Trigger mechanic | Per-row "Generate" / "Run" action on each `output_slots` row in the Airtable UI | Per-row trigger preserves operator-latitude on which slots to iterate; batch generation is not used |

### What lands

- Each generation run **appends** one attachment to `output_slots.slot_generated_image_v1` (multipleAttachments accumulates). Append-not-overwrite semantics are required (see Hard Stop Conditions below).
- v0 baseline attachments remain in place. Phase 2C does not delete them.
- After Phase 2C-bedroom round 1 completes, expected state per slot: **exactly 3 attachments** (1 v0 + 2 Phase 2C-authorized).

### Hard Stop Conditions (Phase 2C generation)

- **If any generation action overwrites or removes the v0 attachment instead of appending a new attachment, stop immediately and report before continuing.** `slot_generated_image_v1` is a multipleAttachments field, but the AI field-agent's generation behavior may not preserve prior attachments the way candidate-pool semantics require. Append-not-overwrite is load-bearing for Phase 2D curation choice; if the field-agent overwrites, the candidate pool collapses to whatever was generated last and Phase 2D loses its comparison surface.
- The check is per-trigger: after each generation action, the operator confirms the prior attachments (including v0) are still present in `slot_generated_image_v1` before triggering the next generation on that slot or any other slot.
- If overwrite behavior is observed, surface as a tool-capability finding (Limitation #X candidate); pause Phase 2C-bedroom and re-plan candidate accumulation mechanics before continuing.

### What does NOT happen in Phase 2C-bedroom

- No `slot_status` promotion (status remains `planned` until Phase 2D writeback).
- No `generated_assets` rows in Phase 2C alone.
- No curation decisions in Phase 2C alone.
- No `seam_runs` row creation (held; the operational plan permits but does not require seam_runs creation per arc).
- No table or bath packet generation.

## Phase 2D-Bedroom Scope (Curation + Provenance Writeback)

After Phase 2C-bedroom generation completes, the curator (per the Path B per-packet pattern) selects one candidate per slot to elevate to a governed asset, with full provenance writeback.

### Per-slot curation

For each of the 3 bedroom slots, the curator selects one attachment from `slot_generated_image_v1` (the round-1 candidate pool: 3 attachments per slot — v0 + 2 Phase 2C-authorized) to elevate. Selection criteria: which candidate best satisfies the slot's role framing within the Warm Restraint envelope. Selection is the curator's judgment; this is not a mechanical mapping.

The selected candidate may be a v0 baseline attachment or a Phase 2C-authorized candidate. The selection itself is the data point recorded in `generated_assets`; whether v0 or Phase 2C is selected matters for diagnostic lens read but does not change writeback mechanics.

### `generated_assets` rows created

Three rows, one per bedroom slot. Each row populated as follows:

| Field | Value | Notes |
|---|---|---|
| `asset_key` | e.g., `ASSET-CAMP-001-HERO_WORLD`, `ASSET-CAMP-001-LIFE_IN_USE`, `ASSET-CAMP-001-OBJECT_VIGNETTE` | Primary field; mirrors slot key naming |
| `asset_role` | `hero_world` / `life_in_use` / `object_vignette` | Mirrors `output_slots.expected_output_role` |
| `governed_output_status` | `governed_output` | singleSelect; per Path B precedent |
| `capture_reason` | text — e.g., "chosen-best-candidate", "only-viable-candidate", or other operator-latitude phrasing | Why this candidate elevated |
| `capture_notes` | multilineText — what bounded discretion was exercised; what the curator selected against | Carries the curator's reasoning at the seam |
| `captured_at` | dateTime — timestamp of curation event | Editable per schema |
| `source_attachment_id` | text — the attachment ID of the chosen `slot_generated_image_v1` attachment | Text pointer per Limitation #4 (attachment URL writeback gap) workaround |
| `asset_attachment` | multipleAttachments — copy of the chosen attachment object (URL + filename) | Path B attachment-copy mechanic |
| `curator` | text — e.g., "ASK", "Claude (proposing); ASK (ratifying)", or system process name | Operator-latitude; carries who performed/authorized the selection |
| `curation_pattern` | text — e.g., "human-cross-round-authorship-bearing-curation" | Determined by the curator's actual judgment process across the candidate space available, per the curator-override correction in [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md). Not determined by proposal cardinality. |
| `packet_key` link | PKT-CAMP-001-BEDROOM | Multi-link to workflow_packets |
| `output_slot` link | corresponding slot record | Multi-link to output_slots; each generated_assets row links to its slot |
| `source_seam_run_key` link | empty (no seam_runs row created) | Held per operational plan §2D ("if seam_runs records are created") |
| `review_artifact_flag` | unchecked | Default; not a review-only artifact |

### `output_slots.generated_assets` reciprocal link

The `output_slots.generated_assets` link is automatically populated by Airtable's reciprocal link behavior when `generated_assets.output_slot` is written. No separate write needed.

### `slot_status` and `packet_status` posture in Phase 2D

Status behavior is **explicit**, not operator-latitude:

- **During Phase 2C generation**: `slot_status` remains `planned` across all 3 bedroom slots. No status advancement during generation.
- **After Phase 2D curation/writeback**: For each slot where a `generated_assets` row is successfully created, set `slot_status` to **`generated`** or **`needs_review`** (both values exist in the current `slot_status` taxonomy: `planned` → `ready_for_generation` → `generated` → `missing` → `needs_retry` → `needs_review` → `accepted` → `rejected`). The choice between `generated` (a candidate was elevated and the writeback succeeded — generation lifecycle complete for this slot) and `needs_review` (a candidate was elevated but downstream evaluation is still required) is recorded in the SCS with reasoning.
- **Do NOT set `accepted`** in Phase 2C/2D-bedroom. `accepted` belongs to a downstream review-shaped evaluation phase (Phase 2E or later), not to per-packet curation.
- **`packet_status` remains `draft`** for the bedroom packet throughout Phase 2C/2D-bedroom. Packet-level promotion (e.g., to `ready_for_ingest` or `in_verification`) is held until Phase 2E review-shaped coherence check across all 3 packets, or until a separate operator decision earns it.

## What is NOT configured / written in Phase 2C/2D-Bedroom

- No table or bath packet generation, curation, or writeback.
- No `seam_runs` records.
- No `review_gates` records.
- No `constraint_rules` records.
- No new `reference_assets` records.
- No new `products` records or product-image changes.
- No `workflow_packets` content edits or linkage changes.
- No schema mutation (no new fields, no field-type changes, no field-name changes).
- No SKU-driven Furniture v1 base modifications.
- No re-configuration of the AI field-agent (settings remain as Phase 2B established).
- No deletion of v0 baseline attachments.

## Verification Steps

After Phase 2C/2D-bedroom completes, verification produces the evidence base for the Phase 2C/2D-bedroom SCS:

### Phase 2C verification (post-generation)

1. **Per-slot candidate count** — confirm each of the 3 bedroom slots has **exactly 3 attachments** in `slot_generated_image_v1` (1 v0 baseline + 2 Phase 2C-authorized round-1 candidates). If the count differs, record why (retries authorized via the explicit-note discipline; or hard-stop triggered by overwrite behavior).
2. **Per-slot generation observations** — record each generation outcome at minimum: ran successfully / partial (some attempts produced unusable output) / blocked (technical failure). Include per-trigger append-vs-overwrite verification result.
3. **Output dimension observations** — **record the actual dimensions of each Phase 2C-authorized candidate**. The plan does not constrain aspect ratio in round 1; output dimensions are a tool/model output variable that the SCS captures. Note any dimension drift relative to v0 baseline and across slots. If dimension variation impairs evaluation, that becomes a Phase 2C finding for downstream configuration/tuning decisions; round 1 does not pre-commit to a constraint.
4. **Visible-quality observations** — at the configuration-side level, not Phase 2C evaluation discipline: do candidates show the warm-restraint atmosphere reading, packet-specific bedroom atmosphere, role-framing coherence (HERO_WORLD vs LIFE_IN_USE vs OBJECT_VIGNETTE)? Note any obvious failure modes (off-prompt, model artifacts, reference-binding failure, etc.). These are signals for diagnostic lens reading.

### Phase 2D verification (post-curation)

1. **3 `generated_assets` rows created** — one per bedroom slot, with all provenance fields populated per the table above.
2. **`asset_attachment` carries the chosen attachment** — verify each `generated_assets.asset_attachment` is a multipleAttachments value carrying the curator's chosen image.
3. **`source_attachment_id` matches the chosen attachment's ID** — text pointer matches the attachment ID in `slot_generated_image_v1`.
4. **Reciprocal links populated** — `output_slots.generated_assets` and `workflow_packets.generated_assets` show the new rows.
5. **`curation_pattern` reflects the curator's judgment process** — not chosen by proposal cardinality, per the curator-override correction.
6. **`slot_status` final state recorded** — `generated` or `needs_review` per the post-curation policy above; `accepted` not used.
7. **`packet_status` confirmed `draft`** — bedroom packet status remains `draft` throughout this arc.
8. **Provenance discipline for v0 selection** — if any slot's elevated asset originates from the v0 baseline (Limitation #6 auto-first-run) rather than from a Phase 2C-authorized candidate, the SCS must record that origin explicitly per slot.

## Outcomes Frame

Each step (2C generation, 2D curation+writeback) gets a Supported / Partial / Blocked categorization in the SCS:

### Phase 2C-bedroom outcomes

- **Generation Supported**: all 3 slots received exactly 2 additional candidates appended to v0 (3-attachment pool per slot); no blocking failures; no overwrite behavior; candidates show coherent atmosphere + role-framing.
- **Generation Partial**: some slots produced usable candidates, others required retry rounds (authorized via the explicit-note discipline) or produced no usable candidate within bounded retry cost.
- **Generation Blocked**: technical failure (model unavailable, AI field-agent error, lookup-binding failure observed only at generation time, overwrite-not-append behavior triggering hard stop, etc.) prevents one or more slots from generating cleanly. Diagnostic lens Q4 (tool/model failure) is the primary read.

### Phase 2D-bedroom outcomes

- **Curation Supported**: 3 generated_assets rows created with full provenance; `asset_attachment` writeback succeeds via Path B attachment-copy mechanic; `source_attachment_id` text pointer matches; curator's `capture_notes` express their selection reasoning.
- **Curation Partial**: writeback succeeds but the candidate pool was thin (e.g., only 1 viable per slot, making "selection" effectively ratification); recorded as Q3 (curator compensation) signal if the pool depth is the constraint, or as Q1/Q2 signal if the model output is the constraint.
- **Curation Blocked**: writeback fails (connector error, attachment-copy fails) or no slot produced any viable candidate. Surfaced as connector-side issue (re-pressures Limitation #4 thin-bridge governance) or as architectural evidence depending on diagnostic review.

## Pressure Points

1. **First per-packet evidence pass.** This is the first packet to produce governed assets in the campaign base. The bedroom packet's evidence is the precedent the table and bath packets pressure against. Bedroom alone cannot answer the apex's Named Limitation #3 question for the cross-base + cross-brand + campaign-mode subset; that requires all 3 packets + Phase 2E review-shaped coherence check.
2. **Diagnostic lens reads against bedroom evidence (per-packet, partial).**
   - **Q4 (tool/model failure)**: most readable from Phase 2C generation outcomes. Configuration Supported in Phase 2B reduced Q4 ambiguity for configuration; Phase 2C generation outcomes test Q4 for actual model behavior on this packet's inputs.
   - **Q1 (schema carries the campaign concept)**: bedroom alone cannot resolve Q1 (which is fundamentally cross-packet); but bedroom evidence informs whether the schema carries packet-level discipline through packet-atmosphere reference + lookup chain + slot prompts without slot-level prose echo.
   - **Q2 (prose compensating for missing structure)**: signal in bedroom would be if slot prompts had to repeat brand-system framing across slots — note that Phase 2A-ii's deliberate authoring of slot prompts leaning on packet-level inheritance via lookup chain (rather than verbatim cross-slot repetition) tests this directly.
   - **Q3 (curator compensation)**: signal in bedroom curator's `capture_notes` — if the curator references criteria no schema carrier expresses, that's signal. If `capture_notes` only references packet-specific creative-intent fidelity, that's not.
   - **Q5 (weak articulation / underbuilt setup)**: continues to apply; Phase 2A-ii satisfied procedural minimum but final Q5 read still depends on Phase 2C / Phase 2D evidence cumulatively.
   - **Q6 (campaign_concept earned)**, **Q7 (brand_system earned)**, **Q8 (composite-anchor)**: bedroom alone insufficient; cross-packet pattern across all 3 packets + Phase 2E review needed.
3. **v0 baseline as candidate (with provenance discipline).** v0 attachments remain available for selection in Phase 2D. If a v0 attachment is the elevated candidate for any slot, that's recorded honestly — the auto-first-run's involuntary output may be the strongest output in the candidate pool. **Provenance discipline**: when v0 is selected, the SCS records that the elevated asset originated from the Phase 2B involuntary auto-first-run (Limitation #6), not from the authorized Phase 2C generation pass. This preserves the Phase 2B / 2C boundary at provenance level; the v0 batch was Phase 2B configuration-side baseline evidence; Phase 2C/2D-bedroom is where curator authorship at the seam selects which candidate is governed.
4. **Output dimension observation, not constraint.** v0 baseline shows dimension variation (1392×768 vs 1024×1024 vs 896×1200). Phase 2C/2D-bedroom **records actual dimensions for all new candidates** in the SCS but does not introduce an aspect-ratio constraint in round 1 unless Airtable forces a parameter. The test is already about whether the configured field-agent consumes the inherited structure; adding a new parameter risks confounding that read. If dimension variation impairs evaluation, that becomes a Phase 2C finding for a later configuration or tuning decision.
5. **Path B attachment-copy mechanic.** Phase 2D writeback uses Path B's attachment-copy pattern (copy the attachment object from `slot_generated_image_v1` to `generated_assets.asset_attachment`). This was Supported in PKT-SKU-010 full-flow ([`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md)). Phase 2C/2D-bedroom is the first cross-base test of this mechanic on the campaign base.
6. **`curation_pattern` per curator-override correction.** The value is determined by what the curator's actual judgment process was across the candidate space available — not by proposal cardinality. Recorded honestly in `capture_notes` and in `curation_pattern` text.
7. **`slot_status` post-curation policy is explicit.** `generated` or `needs_review` after successful curation/writeback per slot; `accepted` reserved for downstream review-shaped evaluation; `packet_status` remains `draft` for bedroom throughout.
8. **Append-not-overwrite is load-bearing.** The hard stop on overwrite behavior is the candidate-pool integrity guarantee. If overwrite occurs, Phase 2D loses its comparison surface and the arc collapses to whatever was generated last. The hard stop preserves the test's evidence base.

## What This Plan Does NOT Do

- Does not authorize Phase 2C/2D-bedroom mutation itself. Re-authorization required after this plan merges.
- Does not authorize Phase 2C/2D for the table or bath packets. Each gets its own per-packet plan.
- Does not authorize Phase 2E (cross-packet coherence check) or Phase 2F (findings synthesis).
- Does not author findings about generation, curation, family coherence, or schema correctness — those depend on cumulative Phase 2C/2D evidence across all 3 packets plus Phase 2E.
- Does not modify the SKU-driven Furniture v1 base.
- Does not change the AI field-agent configuration on `output_slots.slot_generated_image_v1` (settings remain as Phase 2B established).
- Does not delete v0 baseline attachments.
- Does not create `seam_runs` rows.
- Does not propose schema mutations on the campaign base.
- Does not author a v2 apex artifact.
- Does not authorize the `accepted` `slot_status` value in this arc; reserved for downstream review-shaped evaluation.
- Does not introduce an aspect-ratio constraint on output dimensions in round 1; observations recorded, no new parameter added.
- Does not pre-frame the bedroom evidence as resolving any specific Named Limitation; that read happens at Phase 2F findings synthesis after all 3 packets + Phase 2E.

## Sequencing

If ASK approves this plan and merges it:

1. **Phase 2C/2D-bedroom authorization** — next decision moment. Operator authorizes the per-packet arc.
2. **Phase 2C-bedroom generation execution (round 1)** — operator triggers per-row generations on the 3 bedroom slots in the Airtable UI; **exactly 2 additional generations per slot** in round 1. After each generation, operator confirms append-not-overwrite per the hard-stop discipline. v0 baseline preserved. Any retry beyond round 1 requires explicit per-slot operator note or follow-on retry authorization.
3. **Per-slot candidate review** — operator reviews the candidate pool (3 per slot — v0 + 2 Phase 2C-authorized) to inform Phase 2D selection.
4. **Phase 2D-bedroom curation + writeback execution** — executor (connector) writes 3 `generated_assets` rows with full provenance, including `asset_attachment` via Path B attachment-copy. Operator (or curator-and-agent compound) determines selection per slot and the `capture_notes` / `curation_pattern` content. `slot_status` set to `generated` or `needs_review` per slot; `packet_status` remains `draft`.
5. **Phase 2C/2D-bedroom SCS** — author the structured change summary recording per-slot generation outcomes (including append-vs-overwrite verification, actual output dimensions, and any v0-origin selections with provenance discipline), curation choices, provenance written, diagnostic-lens-readable observations, and Generation/Curation Supported/Partial/Blocked categorization. Stop at exact scoped diff for approval.
6. **Phase 2C/2D-table authorization** — next decision moment after bedroom SCS lands. Held until then.
7. **Phase 2C/2D-bath authorization** — next decision moment after table SCS lands. Held until then.
8. **Phase 2E (cross-packet coherence check)** — held until all 3 per-packet arcs complete.
9. **Phase 2F (findings synthesis)** — held until Phase 2E completes.

## Anchor Documents

### Direct architectural anchors

- [`docs/campaign-mode-base-setup-phase-2-operational-plan-v1.md`](campaign-mode-base-setup-phase-2-operational-plan-v1.md): Phase 2 operational plan; defines Phase 2C as per-packet sub-authorization with Phase 2D bundled; defines the Diagnostic Lens that Phase 2C/2D evidence feeds into; defines Phase 2D's full provenance writeback shape
- [`docs/campaign-mode-base-setup-phase-2b-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-2b-structured-change-summary-v1.md): Phase 2B SCS — AI field-agent Configuration Supported terminal state Phase 2C/2D-bedroom inherits; v0 baseline recorded as configuration-side baseline evidence
- [`docs/campaign-mode-base-setup-phase-2a-ii-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-2a-ii-structured-change-summary-v1.md): Phase 2A-ii SCS — semantic wiring + lookup-flow PASS state
- [`docs/campaign-mode-base-setup-phase-2a-i-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-2a-i-structured-change-summary-v1.md): Phase 2A-i SCS — records + imagery state
- [`docs/campaign-mode-base-setup-phase-2a-plan-v1.md`](campaign-mode-base-setup-phase-2a-plan-v1.md): Phase 2A plan — defines Diagnostic Lens that Phase 2C/2D evidence feeds into

### Operational pattern reference

- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): PKT-SKU-010 full-flow Path B precedent — generation through curation through `asset_attachment` attachment-copy writeback. The Phase 2C/2D-bedroom arc shape mirrors this. The attachment-copy mechanic was Supported in Path B.
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): collection-mode operational test — curator-override correction informs `curation_pattern` determination (judgment process, not proposal cardinality); finding 5 informs Q2 (prose compensating)
- [`docs/curator-field-and-backfill-sku-driven-furniture-v1.md`](curator-field-and-backfill-sku-driven-furniture-v1.md): curator field provenance pattern for governed-asset writeback
- [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md): connector tool capability reference — Limitation #4 (attachment URL writeback gap) governs why `source_attachment_id` is text-pointer not URL; Limitation #6 governed the v0 baseline this arc inherits

### Workflow rules

- `AGENTS.md` Airtable Mutation Discipline rule (Plan-Before-Execute + Structured Change Summary)
- `AGENTS.md` Airtable Schema-Fit Rule
- v50 grounding note: scope discipline; proof-chain gravity well guard (Phase 2C/2D-bedroom observations belong in the Phase 2C/2D-bedroom SCS — a concise execution-record artifact — unless they materially change the model / schema pressure / carrier boundary / governance seam)
