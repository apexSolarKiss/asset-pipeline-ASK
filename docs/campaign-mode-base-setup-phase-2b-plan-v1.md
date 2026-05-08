# Campaign Mode Base Setup // Phase 2B Plan v1

## Purpose

This is the Phase 2B plan-before-execute artifact for the Airtable AI field-agent configuration step of the campaign-mode operational test. Phase 2B is the bridge between Phase 2A's content-ready / reference-wired state ([`docs/campaign-mode-base-setup-phase-2a-ii-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-2a-ii-structured-change-summary-v1.md)) and Phase 2C's generation invocation. It covers operator-side AI field-agent configuration on `output_slots`, with verification observations recorded in a structured change summary before any Phase 2C authorization.

It is the plan-before-execute artifact required by AGENTS.md Airtable Mutation Discipline. It does not authorize Phase 2B configuration itself; it defines what Phase 2B configuration would do if ASK authorizes it, what counts as configuration succeeding (Supported / Partial / Blocked), and what evidence must be recorded before Phase 2C generation authorization.

Phase 2B is operator-side work via the Airtable UI. The Airtable connector cannot configure AI field-agents programmatically — a known AI field-agent configuration gap referenced in the connector tool capability limitations doc ([`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md)). The executor's role in Phase 2B is plan-before-execute, verification observation, and the post-step structured change summary — not the configuration itself.

## Posture

```text
plan only — no airtable mutation in this artifact
phase 2B scope: AI field-agent configuration on output_slots; verification observation only
no AI generation invocation
no candidate creation
no curation
no generated_assets records
no slot_status promotion
no packet_status promotion
no schema mutation
no new fields
no repo architecture changes
no Phase 2 findings synthesis
no rewrite of architecture.md / apex / predecessor passes / D2 decision note / setup-decision note / setup-content artifact / Phase 2 operational plan / Phase 2A plan / Phase 2A-i SCS / Phase 2A-ii SCS / Phase 1 plan / Phase 1 amendments / Phase 1 SCS / connector limitations doc / v50 grounding note
no v2 apex
no Phase 2C / 2D / 2E / 2F scope opening
no authorization for Phase 2B configuration itself
```

The diagnostic caveat from the setup-decision artifact and Phase 2A plan continues to apply. Phase 2A-i + Phase 2A-ii together satisfied the procedural minimum for Q5 (weak articulation / underbuilt setup) ambiguity reduction; final Q5 interpretation still depends on Phase 2C / Phase 2D evidence. Phase 2B is the next gating step in surfacing Q4 (tool / model failure) versus architectural evidence in particular.

## Tool / Surface

- **Active tool**: Airtable UI on the campaign base `asset-pipeline-ASK // Campaign-Driven D2C Home-Goods v1` (base ID `appCAcRuA82SWj5h5`).
- **Why operator-side**: the connector cannot configure AI field-agents — a known AI field-agent configuration gap referenced in the connector tool capability limitations doc. Phase 2B is therefore an operator UI step.
- **Executor role**: produce this plan-before-execute, observe / verify after the operator configures, author the Phase 2B SCS recording observations.

## Phase 2A Terminal State (precondition)

Phase 2B begins from the Phase 2A terminal state confirmed in the Phase 2A-ii SCS:

- 8 `products` with `material_notes` / `finish_notes` / `identifying_details` text + `product_image` attachments.
- 8 `reference_assets` with `reference_role: approved_directional_reference`, `reference_note`, `reference_image` attachments.
- 3 `workflow_packets` with content fields + `sku_key` linkages (1 / 4 / 3 products) + `approved_reference_keys` linkages (5 brand-system + 1 packet-atmosphere reference each).
- 9 `output_slots` with `slot_prompt` populated, `slot_status: planned`.
- All 7 active lookup chains verified end-to-end (Phase 1 SCS open question #1 resolved).

## Configuration Scope

Operator-side configuration of an Airtable AI field-agent on the `output_slots` table.

### Output target

- `slot_generated_image_v1` (multipleAttachments) — the field-agent's output destination per slot.

### Required input fields (for the field-agent to consume)

| Field | Type | Purpose |
|---|---|---|
| `slot_prompt` | multilineText | Slot-level role-specific prompt text (the per-slot direction language) |
| `product_image_lookup_lookup` | multipleLookupValues (chained) | Product imagery surfaced from packet via the lookup chain |
| `packet_reference_image_lookup` | multipleLookupValues (chained) | Reference imagery surfaced from packet (5 brand-system + 1 packet-atmosphere image per slot) |
| `expected_output_role` | singleLineText | Slot role identifier (e.g. `hero_world` / `life_in_use` / `object_vignette`) — provides role context |
| `packet_key` | multipleRecordLinks | Packet context for slot |

The first three fields (`slot_prompt`, `product_image_lookup_lookup`, `packet_reference_image_lookup`) are the load-bearing inputs. The latter two are supporting context the field-agent may or may not natively consume — operator-latitude during configuration.

### What is NOT configured in Phase 2B

- No generation invocation: the field-agent is configured but not triggered on any record.
- No record-level "Generate" actions.
- No new fields created.
- No existing field schema modified.
- No changes to `slot_status` (remains `planned` across all 9 slots).
- No changes to `packet_status` (remains `draft`).

## Configuration Verification Steps

After operator-side configuration completes, verification produces the evidence base for the Phase 2B SCS:

### Step 1 — Confirm field-agent presence on `output_slots`

Operator confirms (and screenshots / records) that the AI field-agent is configured on the `output_slots` table, with `slot_generated_image_v1` (multipleAttachments) as the agent's output target.

### Step 2 — Confirm input field accessibility per the agent's input picker

For each of the 5 required input fields, observe and record whether it is **selectable** in the field-agent's input picker:

- `slot_prompt`: should be available as a text input (most permissive case).
- `product_image_lookup_lookup`: chained `multipleLookupValues` carrying product images. **Critical verification target** — see *Pressure Points* below.
- `packet_reference_image_lookup`: chained `multipleLookupValues` carrying reference images. **Critical verification target.**
- `expected_output_role`: should be available as a text input.
- `packet_key`: linked-record reference; behavior in input picker varies; may require operator workaround if not directly selectable.

Record exactly: which fields are selectable, which are partial (e.g. selectable but degraded behavior), which are blocked.

### Step 3 — Document the input-picker observation

Operator screenshots the field-agent configuration UI showing the input picker and the selected inputs. Operator notes any field that cannot be selected and the exact UI behavior (greyed out, missing from list, error on selection, etc.).

### Step 4 — Confirm output write target

Confirm `slot_generated_image_v1` is correctly set as the field-agent's output. No write occurs in Phase 2B — only the configuration setting is verified.

### Step 5 — Operator records model / parameter selections

If the AI field-agent configuration involves model selection (e.g., Imagen, GPT image, etc.) or other generation parameters, the operator records the specific choices. These choices become part of the Phase 2C diagnostic context — different model choices may produce different generation behavior.

## Outcomes

Each outcome is observed at configuration time, before any generation invocation:

### Configuration Supported

All 5 required input fields are selectable in the field-agent picker; output target is set to `slot_generated_image_v1`; the field-agent is configured and ready (but not invoked) on `output_slots`. Phase 2C authorization is then earnable.

### Configuration Partial

Some input fields are selectable, others are not. For example: `slot_prompt` is selectable but `product_image_lookup_lookup` is not. Operator records which fields are blocked and the exact UI behavior. Phase 2C authorization can either:

- Proceed against the reduced input set (with Phase 2C generation evidence reflecting the missing input) — Q4 (tool / model failure) and Q1 / Q2 (schema carrying / prose compensating) interpretations adjust accordingly.
- Pause for schema-fit work — surfacing the limitation as a tool-layer gap parallel to the SKU base's earlier D1 / D2 schema-fit history. A separate decision note may follow.

### Configuration Blocked

Critical input fields (e.g., neither lookup is selectable) cannot be consumed by the field-agent. The field-agent cannot operate against the configured chain. Phase 2C authorization does not proceed. Instead, the surfaced limitation becomes its own scoped decision (schema-fit work, alternative input carriers, hybrid prompt approach, etc.) — paralleling the SKU base's earlier visual-reference D1 → D2 → schema mutation arc captured in the docs/index.md.

## Evidence to Record Before Phase 2C Authorization

Phase 2B's structured change summary, authored after configuration completes, must record:

1. **Field-agent configuration state** — which AI field-agent is configured on `output_slots`, with which output field set, and which input fields successfully connected.
2. **Input picker observations** — for each of the 5 required input field types, whether selectable / partial / blocked. If blocked or partial, the exact UI behavior observed (greyed out, missing from list, error message, etc.).
3. **Output target confirmation** — `slot_generated_image_v1` correctly set as the field-agent output.
4. **Model / parameter selections** — which generation model was chosen, which generation parameters set, why (operator-latitude). These become Phase 2C diagnostic context.
5. **Diagnostic categorization** — Configuration Supported / Partial / Blocked, with explicit reasoning anchored to the observations above.
6. **Operator-side artifacts** — any screenshots, error messages, or UI observations the operator wants preserved as evidence.

The evidence must be sufficient that a future operator (or the executor) can read it cold and understand what the configuration looks like, what worked, what didn't, and what Phase 2C will be authorized against.

## Pressure Points

1. **Lookup-chain consumability by the AI field-agent picker** — the load-bearing question of Phase 2B. The campaign base's chained `multipleLookupValues` (`product_image_lookup_lookup`, `packet_reference_image_lookup`) carry images surfaced via two-tier lookup. Whether the AI field-agent's input picker can consume these chained lookups directly is exactly what Phase 2B verifies. The SKU base's earlier D1 / D2 schema-fit history (e.g. [`docs/url-reference-visual-anchor-schema-fit-findings-sku-driven-furniture-v1.md`](url-reference-visual-anchor-schema-fit-findings-sku-driven-furniture-v1.md), [`docs/gate-2-image-bearing-reference-path-findings-pkt-sku-009.md`](gate-2-image-bearing-reference-path-findings-pkt-sku-009.md), [`docs/visual-reference-input-schema-mutation-plan-sku-driven-furniture-v1.md`](visual-reference-input-schema-mutation-plan-sku-driven-furniture-v1.md)) documented input-picker limitations and the schema mutation path that resolved them. The campaign base's identical-mirror schema may exhibit the same limitations, may have improved tooling behavior, or may behave differently. Phase 2B is the test.
2. **Model choice confounds Phase 2C interpretation** — the AI field-agent's model selection (Imagen vs other) becomes a Phase 2C diagnostic variable. Recording the selection in the Phase 2B SCS keeps Q4 (tool / model failure) interpretable.
3. **No generation invocation in Phase 2B** — Phase 2B is configuration only. Generation invocation is a separate authorization moment per the merged Phase 2 operational plan §Phase 2C.
4. **Diagnostic caveat continues** — if Phase 2B surfaces blockers, those are tool-layer observations to be diagnosed separately from any architectural interpretation. The Phase 2A plan's Diagnostic Lens classifies which category each observation falls into; Phase 2B observations are primarily Q4 (tool / model failure) signal.

## What This Plan Does NOT Do

- Does not authorize Phase 2B configuration itself. Re-authorization required after this plan merges.
- Does not invoke generation on any output_slots row.
- Does not capture candidates, write `generated_assets`, or promote any record status.
- Does not modify schema (no new fields, no field-type changes, no field-name changes).
- Does not modify the SKU-driven Furniture v1 base.
- Does not modify any architectural artifact (apex, predecessor passes, v50 grounding note, Phase 2 operational plan, Phase 2A plan, Phase 2A SCSs, Phase 1 SCS, connector limitations doc).
- Does not author findings about generation, curation, family coherence, or schema correctness — those depend on Phase 2C+ evidence.
- Does not authorize Phase 2C / 2D / 2E / 2F.
- Does not assume the AI field-agent picker can consume all the surfaced lookup chains — that is precisely the test Phase 2B runs.

## Sequencing

If ASK approves this plan and merges it:

1. **Phase 2B configuration re-authorization** — next decision moment.
2. **Operator-side configuration in Airtable UI** — operator opens the campaign base, configures the AI field-agent on `output_slots`, attempts to connect all required input fields and the output field. Operator records observations per the verification steps above (screenshots, notes on input picker behavior, model/parameter choices).
3. **Executor verification observation** — executor reviews the operator's recorded observations; runs any direct connector queries useful for confirming the configured state (e.g. listing output_slots to confirm `slot_generated_image_v1` is still empty, slot_status still `planned`, etc.).
4. **Phase 2B SCS** — author the structured change summary recording configuration state, input picker observations, output target, model/parameter choices, and Configuration Supported / Partial / Blocked categorization. Stop at exact scoped diff for approval.
5. **Phase 2C authorization** — held until Phase 2B SCS lands and ASK chooses to open Phase 2C. The exact scope of Phase 2C depends on the Phase 2B outcome (Supported = full scope; Partial = reduced input set; Blocked = held until scoped schema-fit decision).

## Anchor Documents

### Direct architectural anchors

- [`docs/campaign-mode-base-setup-phase-2-operational-plan-v1.md`](campaign-mode-base-setup-phase-2-operational-plan-v1.md): Phase 2 operational plan; Phase 2B is the AI field-agent configuration sub-phase per §Phase 2B
- [`docs/campaign-mode-base-setup-phase-2a-plan-v1.md`](campaign-mode-base-setup-phase-2a-plan-v1.md): Phase 2A plan; defines the Diagnostic Lens that Phase 2B observations feed into
- [`docs/campaign-mode-base-setup-phase-2a-i-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-2a-i-structured-change-summary-v1.md): Phase 2A-i SCS — records + imagery state Phase 2B inherits
- [`docs/campaign-mode-base-setup-phase-2a-ii-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-2a-ii-structured-change-summary-v1.md): Phase 2A-ii SCS — semantic-wiring + lookup-flow PASS state Phase 2B inherits

### Operational pattern reference and pressure-point context

- [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md): connector tool capability reference — documents the known AI field-agent configuration gap (operator-side UI only)
- [`docs/url-reference-visual-anchor-schema-fit-findings-sku-driven-furniture-v1.md`](url-reference-visual-anchor-schema-fit-findings-sku-driven-furniture-v1.md): SKU base's D1 schema-fit observation — input picker historical limitation context
- [`docs/gate-2-image-bearing-reference-path-findings-pkt-sku-009.md`](gate-2-image-bearing-reference-path-findings-pkt-sku-009.md): SKU base's Gate 2 image-bearing reference path findings (Supported)
- [`docs/visual-reference-input-schema-mutation-plan-sku-driven-furniture-v1.md`](visual-reference-input-schema-mutation-plan-sku-driven-furniture-v1.md): SKU base's schema mutation that addressed input-picker limitations
- [`docs/url-visual-reference-set-generation-findings-sku-driven-furniture-v1.md`](url-visual-reference-set-generation-findings-sku-driven-furniture-v1.md): SKU base's "Supported" finding after the schema mutation

### Workflow rules

- `AGENTS.md` Airtable Mutation Discipline rule (Plan-Before-Execute + Structured Change Summary)
- `AGENTS.md` Airtable Schema-Fit Rule
- v50 grounding note: scope discipline; proof-chain gravity well guard (Phase 2B observations belong in the Phase 2B SCS — a concise execution-record artifact — not a separate conceptual artifact, unless Phase 2B surfaces something that materially changes the model / schema pressure / carrier boundary / governance seam)
