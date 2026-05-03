# Full-Flow Evidence Synthesis // PKT-SKU-009

## Purpose

This note synthesizes the existing PKT-SKU-009 evidence as documentation that the full-flow architectural surface — generation event → candidate set → curation event → governed asset → curation pattern recorded → curator recorded — has already executed end-to-end. The pieces are already in the repo and in Airtable; what was missing was a single artifact that named the synthesis as such.

This is **Path C of three** in the full-flow test sequence agreed with ASK:

- **Path C (this note):** synthesize existing evidence as documentation of the already-executed full-flow
- **Path A (next):** coordinated fresh-generation full-flow on the existing PKT-SKU-009 packet
- **Path B (after A):** coordinated fresh-generation full-flow on a brand-new PKT-SKU-010 packet

Outcome: **Supported.** The full-flow architectural surface does execute end-to-end. The execution is currently a coordinated human-plus-agent act, not autonomous by either party. The human/agent surface boundary itself is architecturally meaningful and is documented here as a load-bearing finding.

## The Full-Flow Surface, Step by Step

### Step 1 — Packet exists with declared intent, constraints, references, required output set

`PKT-SKU-009` (record `recMSvNkWSmYRCDiT` on base `appoqJ25B6w4vSuX9`):

- Linked SKU: `SKU-CHAIR-004` (Placeholder Warm-Neutral Sculpted Dining Chair)
- Business intent: bounded second-packet recurrence test for URL-surfaced visual reference input
- Creative intent: coherent three-view warm-neutral studio image set preserving product truth
- Approved reference: `REF-PKT-SKU-009-VISUAL-INVARIANT-002` (warm-neutral architectural studio with cove transition and diagonal directional shadow)
- Required output set: HERO front three-quarter, PROFILE side, DETAIL material/joinery emphasis

**Surface:** agent-accessible (read + write via the Airtable connector).

### Step 2 — Output slots configured for each required slot

Three slots: `SLOT-PKT-SKU-009-HERO`, `SLOT-PKT-SKU-009-PROFILE`, `SLOT-PKT-SKU-009-DETAIL`. Each carries:

- `slot_prompt` describing the slot's role
- `packet_reference_image_lookup` surfacing REF-002 as visual binding input
- `product_image_lookup_lookup` surfacing the product truth reference

**Surface:** agent-accessible.

### Step 3 — Generation event populates `slot_generated_image_v1`

Multiple iteration rounds across late April and early May 2026, spanning the documented prior chain:

- Initial pass (early April rounds) — Not supported / blocked-by-prompt-input-hierarchy
- B-test variant 1 (instruction-canvas hierarchy) — Not supported
- B-test variant 2 (model sensitivity, `gpt-image-1` → `Gemini 3 Pro Image` switch on April 30) — did not, by itself, land reference binding
- Retry round with explicit input hierarchy — Partial; HERO cushion drift surfaced
- C-test (reference-image specificity) — Not supported
- Gate 2 (image-bearing reference attachment path) — Supported; landed REF-002 binding
- Most recent round (May 1 03:11): clean across REF-002 binding, product fidelity, family coherence

**Surface:** *human-side / opaque to the connector.* Generation invocation (Airtable AI field-agent or external pipeline) is not an action the connector exposes. ASK's manual UI action in Airtable triggered the rounds documented above.

### Step 4 — Curation event creates a `generated_assets` row pointing to a chosen attachment

Multiple curation events recorded for the same slot:

- Metadata-based agentic curation (#149): three rows created — HERO `recAGC8vFHTjvD5fH`, PROFILE `rec5IfLrRxQilTpDt`, DETAIL `recvyDFRJ13acUhFA`. All `agent-proposed-human-ratified`.
- Vision-based agentic curation (#153, after methodology correction): three additional rows — HERO `recfFqzRz2sJzNpyP`, PROFILE `rec7wPVVsGW7v0DOm`, DETAIL `recTNmexj6IscCguj`. All `agent-vision-proposed-human-ratified`. After the methodology correction these point to the same source attachments as #149's metadata picks.
- Earlier milestone-5 thin-bridge HERO row (`recSS08Vhnw5RuuUc`) — authorship-bearing curator selection by ASK during the thin-bridge proof, retained as `candidate` + `review_artifact_flag = true`.

**Surface:** agent-accessible (row creation + field population via the connector).

### Step 5 — Governed-output promotion via `governed_output_status`

The metadata-based agentic rows from #149 were promoted to `governed_output` in #150. The vision-based rows from #153 ratified the same source attachments and stay `candidate` (parallel ratified curation events without competing promotion). The thin-bridge HERO row stays `candidate` + `review_artifact_flag = true` deliberately.

**Surface:** agent-accessible.

### Step 6 — Curation pattern and curator recorded

`curation_pattern` field added in #150, populated across all rows reflecting four distinct patterns: `agent-proposed-human-ratified`, `batch-output-no-curator-selection`, `agent-vision-proposed-human-ratified`, and (for the milestone-5 HERO row) unset pending separate backfill. `curator` field added in #152, populated reflecting both single-human and compound agent-plus-human curator patterns.

**Surface:** agent-accessible.

## Findings

### 1. The full-flow architectural surface executes end-to-end

PKT-SKU-009 is the existence proof. The May 1 03:11 round produced a candidate set that satisfies the article's load-bearing criteria (REF-002 binding, product fidelity, family coherence), and downstream curation events have been recorded with full structural provenance (what / why / when / by whom / under what pattern). No part of the architecture's stated flow is unreachable.

### 2. The full-flow is currently a coordinated human-plus-agent act

The agent (executor in this session and prior) cannot trigger generation through the Airtable connector. The connector exposes schema operations, row CRUD, and metadata operations, but not "invoke AI generation." Airtable AI field-agent generation must be triggered manually by ASK in the Airtable UI (or via an Airtable Automation that's not directly invocable from the connector).

This means the full-flow is split across two surfaces:

| Step | Surface | Who can operate |
|---|---|---|
| Packet config | Agent-accessible | Agent or human |
| Slot config | Agent-accessible | Agent or human |
| Generation invocation | Human-side / opaque to connector | Human only (current connector reality) |
| Candidate set inspection | Agent-accessible | Agent or human |
| Curation event recording | Agent-accessible | Agent (under ratification pattern) or human |
| Governed-output promotion | Agent-accessible | Agent (under ratification pattern) or human |
| Curation pattern + curator recording | Agent-accessible | Agent or human |

The architecture supports this coordination cleanly because the handoff happens at the `slot_generated_image_v1` attachment surface — once candidates exist as attachments, the agent can read them and do everything downstream. The handoff back to the human happens at curator ratification (whether the agent's selection is endorsed). After ratification, the agent completes the structural recording.

### 3. The human/agent surface boundary is itself architecturally meaningful

Where the agent's operational reach ends and the human's begins is not arbitrary — it tracks the natural boundary between *creative/aesthetic invocation* (generation: choosing what model to invoke, with what prompt configuration, with what cost tradeoffs) and *operational structuring* (curation, governance, provenance recording). The article *The Creative Act of Selection* argues curation is the creative act in the system; this synthesis suggests *generation invocation* may be a *separate* creative act — choosing what raw material to bring into existence in the first place.

That's a refinement worth flagging. The article's framing did not separate generation invocation as its own creative act. The full-flow synthesis suggests it might be one. For now, recording this as an open question.

### 4. The architecture's curation_pattern field already supports recording the coordination pattern

`curation_pattern` values like `agent-proposed-human-ratified` and `agent-vision-proposed-human-ratified` already encode the coordination — they make the human ratification step structurally visible. A future schema move could add a `generation_invocation_actor` field if generation-side coordination becomes load-bearing in its own right; not earned yet.

### 5. Path C completes the v1 sweep's full-flow item without requiring fresh generation

The sweep item "full-flow generation + curation test" can be satisfied by Path C synthesis (as documentation of already-executed flow) plus Path A/B for fresh-generation tests if/when desired. The architectural finding (the full-flow surface works as a coordinated act) is achievable from Path C alone. Paths A and B add fresh data points without changing the architectural finding.

## What This Note Does Not Do

- trigger any fresh generation
- create new `generated_assets` rows
- promote any new rows to `governed_output`
- retroactively modify prior findings notes
- claim Paths A and B are unnecessary — they will produce fresh data points and may surface frictions that the existing iteration history doesn't show
- claim the human/agent surface boundary should be eliminated — only that recording it honestly is part of the legibility the architecture cares about

## Open Questions / Next Pressure Points

1. **Path A — coordinated fresh-generation full-flow on PKT-SKU-009.** Next move. Tests whether re-running generation on the existing packet produces a coherent set comparable to the May 1 03:11 round, or surfaces fresh frictions.
2. **Path B — coordinated fresh-generation full-flow on a brand-new PKT-SKU-010.** After A. Tests with no iteration-history confusion.
3. **Whether generation invocation should be modeled as its own creative act** with structural provenance (model used, prompt configuration, cost, generation timestamp) parallel to curation. Article-level question; not opened here.
4. **Cross-mode application to a new base** — final v1 sweep item.
5. **`asset_uri` writeback blocker** — still unresolved.

## Anchor Documents

- [`docs/curation-event-vision-based-agentic-test-findings-pkt-sku-009.md`](curation-event-vision-based-agentic-test-findings-pkt-sku-009.md): the most recent curation event recorded
- [`docs/curator-field-and-backfill-sku-driven-furniture-v1.md`](curator-field-and-backfill-sku-driven-furniture-v1.md): curator field and backfill
- [`docs/governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md`](governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md): the move that added `curation_pattern` and promoted the metadata-based rows
- [`docs/curation-event-agentic-test-findings-pkt-sku-009.md`](curation-event-agentic-test-findings-pkt-sku-009.md): the metadata-based agentic test
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): the cross-mode v3 architecture sketch
- [`docs/milestones/milestone-6-curation-event-first-class-plateau.md`](milestones/milestone-6-curation-event-first-class-plateau.md): the plateau this synthesis sits on top of
- [The Creative Act of Selection](https://atomicspacekitten.substack.com/p/the-creative-act-of-selection): the article that frames curation as the creative act in the system
