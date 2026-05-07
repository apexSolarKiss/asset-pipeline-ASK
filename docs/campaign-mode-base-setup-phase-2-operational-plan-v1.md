# Campaign Mode Base Setup // Phase 2 Operational Plan v1

## Purpose

This is the Phase 2 plan-before-execute artifact for the campaign-mode operational test whose structural ground was created by the merged Phase 1 plan ([`docs/campaign-mode-base-setup-phase-1-structural-plan-v1.md`](campaign-mode-base-setup-phase-1-structural-plan-v1.md)) and confirmed in the Phase 1 structured change summary ([`docs/campaign-mode-base-setup-phase-1-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-1-structured-change-summary-v1.md)). Phase 2 covers the operational pressure surface: content text, reference imagery, AI field-agent configuration, slot-level generation, per-slot curation with full provenance writeback, cross-packet coherence check, and findings synthesis.

It is the plan-before-execute artifact required by AGENTS.md Airtable Mutation Discipline. It does not authorize Phase 2 mutation; it defines what Phase 2 mutation would do if ASK authorizes it, and what would count architecturally as the test producing schema correctness vs schema tolerance. The diagnostic lens carried inside is the load-bearing section.

It is not the actual Phase 2 mutation. It does not author content text, slot prompts, reference imagery, AI configuration, or generation. Each sub-phase will require its own authorization moment within Phase 2; this plan defines the overall shape and the diagnostic discipline.

## Posture

```text
plan only — no airtable mutation in this artifact
phase 2 scope: operational (content + references + AI + generation + curation + governance)
no slot prompt finalized text (drafts may be sketched as proposed plan content)
no creative_intent / business_intent / bounded_creative_discretion final text
no reference imagery captured into the campaign base
no AI field-agent configuration
no generation invocation
no governed_assets records
no v2 apex
no architecture rewrite
no rewrite of architecture.md / apex / predecessor passes / D2 decision note / setup-decision note / setup-content artifact / Phase 1 plan / Phase 1 amendments / Phase 1 structured change summary
no external-reader doc
no authorization for Phase 2 mutation itself
```

The diagnostic caveat from the setup-decision artifact is carried forward: any failure outcome requires diagnostic review before being interpreted as architecture pressure. Brand names stay operator-side per the grounding-note brand-name-avoidance section, which the v47 grounding note extends to compressed external aesthetic dicta. The campaign concept is **Warm Restraint** per the setup-content artifact's Reading Notes.

## Load-Bearing Principle

```text
Phase 2 tests whether the mirrored schema carries campaign-mode structure,
not merely whether campaign-mode outputs can be produced inside the mirrored schema.
```

This sentence is the single most important principle in this plan. Phase 2 produces a **schema-carries-structure** finding when the Warm Restraint discipline shows up across the 9 governed assets via the schema's existing carriers (packet-level fields, reference linkages, per-product imagery, slot-level prompts) without verbatim cross-slot prose repetition, without curator compensation for missing upstream carriers, and without slot-level prompts having to re-state brand-system framing each time. Phase 2 produces a **schema-tolerance** finding when outputs can be produced and ratified, but the discipline was carried by prose echo or curator judgment patching what the schema did not express.

Schema correctness and schema tolerance are different findings. Both are valid outcomes of the test; only the schema-correctness outcome strengthens the apex's "scoped mode-independence" claim. A tolerance outcome strengthens the case for new carriers (the campaign-concept and brand-system limitations the apex artifact holds).

## ASK Direction Recap

From the campaign-mode setup-decision and setup-content artifacts and the directional fork chosen as Option 1B:

- **Phase 2 scope**: operational. Content + references + AI + generation + curation + governance per packet, mirroring the Path B pattern from [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md).
- **Operational depth**: 3 packets × 3 slots = 9 governed assets via full governance arcs. This meets the setup-decision artifact's minimum operational depth.
- **Brand archetype**: D2C everyday-quality home-goods archetype (operator-side reference held in operator memory; per the v47 grounding note, this is a prototype-aesthetic instance for the cross-brand pressure test, not aesthetic doctrine).
- **Campaign concept**: Warm Restraint (per the setup-content artifact's Reading Notes; no external design-canon shorthand in repo artifacts).
- **Packet inventory**: bedroom / table / bath, all in `draft`, identity records created in Phase 1.
- **Slot inventory**: HERO_WORLD / LIFE_IN_USE / OBJECT_VIGNETTE per packet, all 9 in `planned`, identity records created in Phase 1, packet linkages in place.
- **Product inventory**: 8 SKUs across the campaign (one representative per type), all in `draft` with no packet linkages, no imagery, no material/finish/identifying-detail content yet.

## Connector-Capability Preflight

Per AGENTS.md Airtable Schema-Fit Rule and the v47 grounding note's posture, this preflight runs before authorizing any Phase 2 sub-phase mutation. It cites [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md) as the durable connector-limitations reference.

### What Phase 2 needs from the connector

- **Record creation** in `products`, `constraint_rules` (if used), `reference_assets`, `seam_runs`, `generated_assets`. Field types touched: `singleLineText`, `multilineText`, `multipleAttachments`, `multipleRecordLinks`, `singleSelect`, `dateTime`, `checkbox`, `url`. All are in the connector-supported field-type union per Limitation #1.
- **Record updates** across all tables to populate content fields and write linkages. Same field-type set as above. Connector-supported.
- **Linkage writes**: `workflow_packets.sku_key` → products, `workflow_packets.constraint_keys` → constraint_rules (if used), `workflow_packets.approved_reference_keys` → reference_assets, `output_slots.generated_assets` → generated_assets (and the reciprocal back-links). All `multipleRecordLinks` writes — connector-supported.
- **Attachment writes**: `products.product_image` (per-SKU imagery), `reference_assets.reference_image` (brand-system + packet-level reference imagery), `output_slots.slot_generated_image_v1` (raw model output capture), `generated_assets.asset_attachment` (governed-asset capture per Path B pattern). All `multipleAttachments` writes — connector-supported.

### What Phase 2 needs that the connector cannot provide

- **Airtable AI field-agent configuration on `output_slots`** for slot-level generation. The connector cannot configure AI field-agents programmatically; this is operator-side via Airtable UI. Recorded as Phase 2 known step, not as a tooling failure.
- **Generation invocation** of slot-level images via the AI field-agent. Generation is a UI / agent-runtime trigger; operator-side. Generation outputs (`slot_generated_image_v1`) are populated by Airtable's agent, not by the connector. Recorded as known step.
- **`asset_attachment` writeback by attachment-copy.** The Path B pattern (per [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md)) writes `multipleAttachments` field by copying the chosen attachment object from `slot_generated_image_v1` into `generated_assets.asset_attachment`. This was Supported in Path B; the same pattern carries to campaign mode.
- **Raw attachment URL writeback into `url` fields** (Limitation #3 — the milestone-5 thin-bridge limitation). Phase 2 does not require this path because `asset_attachment` (multipleAttachments) and `source_attachment_id` (singleLineText for the attachment ID pointer) together carry curation provenance without needing URL writeback. Recorded so a future operator does not re-attempt the blocked path.

### Preflight conclusion

No connector-capability gap blocks Phase 2 record / content / attachment / linkage operations. The two known operator-side steps (AI field-agent configuration, generation invocation) are tracked as known UI moments within the operational arc, not as discoveries.

## Phase 2 Operational Arc

Phase 2 decomposes into six sub-phases, each requiring its own scoped authorization moment within Phase 2. The decomposition is per the AGENTS.md Plan-Before-Execute rule: meaningful Airtable mutation authorizes against an explicit plan + structured change summary cycle. Sub-phases may merge if scope stays bounded.

The pattern per packet mirrors [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): inputs prepared → AI configured → generation invoked → candidates curated → governed-asset writeback → review-shaped coherence check.

### Phase 2A // Inputs prep — content + references + linkages

- Populate packet content text on the 3 `workflow_packets` rows: `business_intent`, `creative_intent`, `bounded_creative_discretion`, `required_output_set`. Content authored per the Warm Restraint concept and the setup-content artifact's packet-specific framings (bedroom / table / bath restraint articulation).
- Populate per-product `material_notes`, `finish_notes`, `identifying_details` for the 8 SKUs.
- Populate per-product `product_image` attachments for the 8 SKUs (one each minimum, mode-honest).
- Create `reference_assets` records:
  - **Brand-system reference packet** (procedural minimum — see *Brand-System Reference Path* below): at least 3–5 reference imagery attachments encoding the warm-restraint envelope at brand-system scope (lighting, palette, material register, human-presence cues, restraint-warmth feel).
  - **Packet-level studio-world references**: per-packet reference imagery for bedroom / table / bath atmosphere.
  - Each reference record carries `reference_role`, `reference_image` attachment, optional `asset_uri`, `reference_note`.
- Populate slot prompts (`output_slots.slot_prompt` × 9) authored per the Warm Restraint slot-role framings: HERO_WORLD compositional restraint with negative space; LIFE_IN_USE behavioral restraint with minimal gesture; OBJECT_VIGNETTE focal restraint with single subject and material visibility.
- Write linkages: `workflow_packets.sku_key` → products (per packet's product mix), `workflow_packets.approved_reference_keys` → reference_assets (per packet's reference set; brand-system references linked to all 3 packets to test cross-packet inheritance).
- `constraint_rules` records: held unless campaign content surfaces a constraint that prose alone cannot carry. The Phase 1 SCS recorded constraint_rules table population as held until earned.

### Phase 2B // AI field-agent configuration

- Operator-side step (Airtable UI): configure the AI field-agent on `output_slots` for slot-level generation, with `slot_prompt` as the input field and `slot_generated_image_v1` as the output attachment field, including the lookup chain inputs (`product_image_lookup_lookup`, `packet_reference_image_lookup`).
- Verify that the lookup chains surface values (this is the first time the chain is exercised end-to-end after the Phase 1 SCS open question #1).
- No connector mutation in this sub-phase.

### Phase 2C // Generation arcs per packet

- Generate slot-level candidates per `output_slots` row. Each slot produces one or more candidates via Airtable AI field-agent invocation.
- Candidates land on `output_slots.slot_generated_image_v1` (multipleAttachments).
- Iterate until a usable candidate pool exists per slot. The setup-decision artifact's diagnostic caveat applies categorically to any iteration cost.
- Record generation timing / observations per packet for findings synthesis.

### Phase 2D // Curation per slot — full provenance writeback

- For each `output_slots` row, the curator selects one candidate from the pool to elevate to a governed asset.
- Create one `generated_assets` row per selected candidate, populating the full curation provenance:
  - `asset_key`, `asset_role`, `governed_output_status` = `governed_output`
  - `capture_reason`, `capture_notes`, `captured_at`
  - `source_attachment_id` (text pointer to which `slot_generated_image_v1` attachment was elevated)
  - `asset_attachment` (multipleAttachments, copied from `slot_generated_image_v1` per Path B pattern)
  - `curator`, `curation_pattern`
  - `packet_key` link, `output_slot` link, `source_seam_run_key` link (if seam_runs records are created)
- The `curation_pattern` value is determined by the curator's actual judgment process across the candidate space available, not by proposal cardinality (per the curator-override correction in [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md)).

### Phase 2E // Cross-packet review-shaped coherence check

- After all 9 governed assets exist, the curator (or curator-and-agent compound) reviews the family across packets.
- Judges whether the Warm Restraint discipline holds coherently across bedroom / table / bath; whether warmth carries across all 9 assets without drifting cold; whether cross-packet continuity reads as one campaign world.
- Records the cross-packet observation in the Phase 2 findings record, not as a standalone conceptual artifact, per the v47 grounding-note proof-chain gravity well guard.
- Does not pre-suppose a higher-level curation entity in schema; pressures whether one becomes earned operationally.

### Phase 2F // Findings synthesis

- One findings artifact at packet-level depth per the four-mode evidence-chain pattern.
- Answers each of the eight diagnostic-lens questions (next section) directly.
- Maps observed outcomes to success / partial / failure categories per the setup-decision artifact, after explicit diagnostic review separates tooling / setup / model failures from architectural evidence.
- Names which apex Named Limitation(s) the test resolves, narrows, or leaves unchanged.
- Does not author a v2 apex artifact (per the v47 grounding-note architecture-pass discipline: synthesis must attempt the model against a concrete example before consolidating, and v2 apex would be a synthesis pass requiring its own decision moment).

## Diagnostic Lens

This is the load-bearing section per ASK direction. Each diagnostic question receives an explicit answer about what would count as evidence for that category. Outcomes are conditioned on diagnostic review separating non-architectural causes from architectural evidence.

### Q1 // What counts as schema carrying the campaign concept

The schema **carries** the Warm Restraint discipline when:

- The discipline is recognizable in the 9 governed-asset family **without verbatim or near-verbatim prose repetition** across slots.
- Cross-packet continuity holds via packet-level reference linkages (`approved_reference_keys`) and per-product `product_image` attachments rather than via slot-prompt prose echo.
- Slot-level role differentiation (HERO_WORLD / LIFE_IN_USE / OBJECT_VIGNETTE) holds via `slot_prompt` shape only, with the cross-cutting concept inherited via packet-level carriers and lookup chain values surfaced from packet to slot.
- The curator at the seam can elevate candidates that satisfy the warm-restraint envelope without writing in `capture_notes` what the schema failed to express upstream.
- This pattern matches the collection-mode operational test's success pattern at same-base same-category — Model A (additive accumulation) carrying the work.

This outcome strengthens the apex's "scoped mode-independence" claim across cross-base + cross-brand for campaign mode. Named Limitation #3 partially resolves for this subset.

### Q2 // What counts as prose compensating for missing structure

Prose compensation is **Model A surviving with hidden cost**. Indicators:

- The Warm Restraint discipline is held only via verbatim or near-verbatim repetition of restraint language across all 9 `slot_prompt` values; removing the prose echo from any single slot produces drift visible in the candidate pool.
- `bounded_creative_discretion` text grows long because it is carrying both packet-specific creative bounds and the cross-packet campaign concept that has no upstream home.
- Slot-level prompts must repeat brand-system framing (warmth, light, human-presence, restraint) because no upstream carrier propagates it.
- This is the collection-mode operational test's finding 5 ("cross-slot consistency for prose-only constituents requires verbatim prose repetition") at packet-level scale.

This outcome is honest evidence that Model A survives but with structural cost. It strengthens the case for an earned campaign-concept or brand-system carrier. Named Limitation #1 begins to resolve into specific carriers.

### Q3 // What counts as curator compensation

Curator compensation is **the governance seam doing structurally-upstream work**. Indicators:

- The curator at the seam rejects candidates for reasons no schema carrier expresses (e.g., "rejected because cold-restraint, not warm-restraint" when no `brand_system_temperature` carrier exists).
- `capture_notes` repeatedly references criteria that should live upstream — cross-packet continuity, brand-system warmth signature, restraint discipline — rather than packet-specific creative-intent fidelity.
- Multiple candidate rounds are needed per slot because the upstream prompt does not constrain what the curator's eye is actually selecting against.
- `curation_pattern` values like `human-cross-round-authorship-bearing-curation` recur because the candidate space has to be narrowed by hand against criteria the schema cannot express.

This outcome strengthens the case for higher-level curation surfaces, brand-system carriers, or layered-precedence inheritance (Model B). Named Limitation #2 (precedence rule for inheritance/override) may begin to surface.

### Q4 // What counts as tool / model failure

Tool / model failures are **categorically separated from architectural evidence**. Indicators:

- Generation-tooling drift: the model produces images that ignore explicit prompt constraints (e.g., the collection-mode test's finding 6 — "all items fully in frame" failure pattern for elongated constituents).
- Model warmth/coldness defaults: external image-generation model converges on its own aesthetic defaults regardless of prompt depth (per the grounding-note foundational premise that prose alone is too lossy).
- Reference-binding limitations: surfaced URL or attachment references do not bind in the candidate pool (per the Gate 2 / capture-mechanics chain history).
- Connector-capability gaps: any operation that surfaces a connector limitation per [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md).

These are recorded in execution-record style per the v47 grounding-note proof-chain gravity well guard, not as architectural findings. They do not earn a new conceptual artifact unless they change the model, schema pressure, carrier boundary, or governance seam.

### Q5 // What counts as weak brand articulation or underbuilt setup

Underbuilt setup produces **diagnostic-ambiguous outcomes**. Indicators:

- Brand-system articulation is too thin to constrain generation (the procedural reference packet exists but does not carry enough fidelity-anchor strength).
- Per-product `product_image` attachments are missing, weak, or stylistically inconsistent across the campaign.
- Reference imagery pulls in conflicting aesthetic directions across packets.
- Slot prompts are underdeveloped, contradictory, or short.

This category invokes the diagnostic caveat from the setup-decision artifact. Phase 2 plan must include the *Brand-System Reference Path* minimum below specifically to rule this category out before reading any failure as architectural pressure.

### Q6 // What counts as evidence for an earned campaign_concept carrier

Evidence for an earned `campaign_concept` carrier:

- Multiple slots, across multiple packets, require prose articulation of campaign-concept-level material (not packet-specific creative intent) to maintain cross-packet continuity.
- Removing one slot's campaign-concept prose produces cross-packet drift the curator has to fix at the seam.
- Curators record `capture_notes` referencing campaign-concept fidelity rather than packet-specific creative intent.
- Campaign-concept text content grows long enough that fitting it into existing carriers (`creative_intent`, `bounded_creative_discretion`) becomes structurally awkward versus a clean field of its own.
- Pattern is consistent across all 3 packets, not packet-specific noise.

Such evidence would earn the campaign_concept first-class carrier the cross-mode probe predicted, narrowing apex Named Limitation #1 specifically.

### Q7 // What counts as evidence for an earned brand_system carrier

Evidence for an earned `brand_system` carrier:

- The Warm Restraint discipline drifts toward sterile minimalism without explicit prose corrective in slot prompts (Model B earned because additive accumulation cannot resolve the layered conflict).
- Brand-system reference imagery surfaces inconsistently across packets via lookup chains, requiring manual repetition at packet level.
- Per-product imagery cannot be reused across cross-brand operational tests because brand-system aesthetic is encoded in product photography itself, not separable from product truth.
- Multiple packet-level reference linkages encode brand-system aesthetic across packets (rather than once at brand-system level).

Such evidence would earn either a `brand_system_aesthetic` carrier, a separate `brand_system_references` linkage, or layered-precedence Model B inheritance — narrowing apex Named Limitations #1 and/or #2.

### Q8 // Whether campaign-mode pressure strengthens, weakens, or leaves unchanged the case for a first-class composite-anchor carrier

This question is framed neutrally per ASK direction. The finding may go any of the three directions; Phase 2 records whichever way the evidence falls. The cross-mode probe and the collection-mode operational test surfaced a composite-anchor strain shaped differently per mode (`messages` for marketing, `grouping_archetype` for collection, `campaign_concept` for campaign). Collection-mode operational evidence partially deflated the strain; campaign-mode operational evidence may move it in any direction.

- **Strengthens**: campaign-mode pressure produces patterns matching the cross-mode probe's predicted strain points (campaign_concept becomes peripherally-required as packet content grows; structural repetition or curator-compensation at concept level recurs across all 3 packets).
- **Weakens**: similar to collection-mode's deflation — the existing schema (packet `creative_intent` + reference linkages) carries campaign-mode operational pressure cleanly, with composite-anchor mutation appearing less earned, not more.
- **Leaves unchanged**: ambiguous evidence; the case is neither earned operationally nor deflated; the strain remains a paper-prediction.

Phase 2's findings synthesis must record which of the three directions the evidence falls in, with explicit diagnostic review separating non-architectural causes.

## Brand-System Reference Path

Per ASK direction, Phase 2 requires at least a procedural brand-system reference packet sufficient to rule out the *weak brand articulation* category from the diagnostic lens. This is the minimum to avoid diagnostic ambiguity; richer brand-system articulation is not pre-required.

### Procedural minimum

Before Phase 2C generation begins:

- At least 3–5 reference imagery attachments uploaded to `reference_assets` records, encoding the warm-restraint envelope at brand-system scope (not per-packet specific). Examples of what these reference attachments should carry:
  - lighting register (natural-light leaning, soft, daylight or low-direct-sun)
  - palette register (warm neutrals, material-honest tonality, no high-contrast color)
  - material register (linen, wood, ceramic, cotton — visible material grain and surface)
  - human-presence register (visible in-use, not posed, restrained gesture)
  - restraint discipline (negative space, breathing room, no visual clutter)
- Each `reference_assets` record:
  - `reference_role` set per role taxonomy (e.g., `brand_system_atmosphere`, `studio_world`, `material_register`)
  - `reference_image` attachment (the image itself, multipleAttachments)
  - `reference_note` text describing what the reference carries that the prose cannot (per the grounding-note philosophical anchor on visual references)
- Brand-system references linked to all 3 packets via `workflow_packets.approved_reference_keys` so the lookup chain surfaces brand-system imagery onto every slot.

### What this rules out

A "failure" outcome where the model drifts toward sterile minimalism cannot be read as Model A failure (i.e., evidence for an earned `brand_system` carrier) unless:
1. The brand-system reference packet exists at the procedural minimum.
2. The reference imagery is stylistically coherent.
3. Lookup chain values are surfaced onto slots successfully.
4. Slot prompts reference the brand-system imagery explicitly.

If those conditions are met and the model still drifts cold without explicit prose corrective, that's architectural evidence (Q7). If those conditions are not met, the failure is underbuilt setup (Q5) and the diagnostic caveat applies.

### What this does not require

- Comprehensive brand-system documentation comparable to a real client style guide. The procedural minimum is enough to rule out underbuilt setup; richer brand-system articulation belongs to a future iteration if Phase 2 earns it.
- A first-class `brand_system_references` schema field. The procedural reference path uses existing carriers (`reference_assets` + `approved_reference_keys` + lookup chain). Whether brand-system aesthetic earns a first-class carrier is the architectural question Phase 2 pressures, not a Phase 2 prerequisite.

## Open Questions Carried Forward From Phase 1

1. **Lookup-chain end-to-end behavior** (Phase 1 SCS open question #1). Phase 1 created the 8 lookup fields and verified chain configuration; until upstream linkages are populated in Phase 2A, the lookups have no values to surface. Phase 2A is the first time the chained `output_slots` lookups (which depend on `workflow_packets` lookups, which depend on link fields) actually flow values end-to-end. Phase 2A authorization should include an explicit lookup-flow check after linkages are written but before generation begins.

2. **`category` and `product_class` enum mismatch** (Phase 1 SCS open question #2). The SKU-base enum options are furniture-specific; campaign products are home-goods (bedding, dinnerware, bath). Phase 2 holds these fields blank rather than smuggling option additions in. The decision between (a) adding campaign-fit options, (b) splitting the field per mode, or (c) leaving blank as part of mode behavior is held until Phase 2 operational evidence informs it.

3. **SKU-base singleSelect option pollution** (Phase 1 SCS open question #3). Out of scope for Phase 2; remains a separate small mutation for a future scoped plan.

4. **Diagnostic caveat continues to apply.** Any Phase 2 failure outcome must be diagnosed before being read as schema pressure or apex pressure. Section *Diagnostic Lens* operationalizes this caveat into specific category questions.

## What Phase 2 Does NOT Do

- Does not authorize a v2 apex definition-layer artifact. Per the v47 grounding-note architecture-pass discipline, synthesis passes must attempt the model against a concrete example before consolidating; if Phase 2 produces evidence sufficient for v2 apex authorship, that authorship is its own decision moment after Phase 2F findings synthesis.
- Does not authorize new architecture passes. The bounded modeling, vocabulary, aesthetic-layering, and apex passes stand. New consolidation work is held until concrete operational pressure earns it.
- Does not modify the SKU-driven Furniture v1 base. SKU-base singleSelect cleanup remains held per Phase 1 SCS open question #3.
- Does not propose schema mutations on the campaign base during Phase 2. The exact-mirror posture is the test's control. Schema mutations earned by Phase 2 evidence become a separate scoped decision after Phase 2F.
- Does not pre-frame the composite-anchor question as a retirement test. Q8 is neutral; the finding can go any direction.
- Does not promise any specific outcome. Phase 2 may produce success, partial, or failure findings per the setup-decision artifact's framing; the diagnostic lens classifies which.
- Does not bypass operator-side AI configuration or generation-invocation steps. Those remain manual UI moments, recorded as known operational steps per the connector-capability preflight.
- Does not author an external-reader doc. That direction stays held per the post-Stage-1 plan.
- Does not authorize Phase 2 mutation itself. Phase 2A authorization is the next decision moment if ASK directs Phase 2 to open.

## Sequencing

If ASK approves this plan and merges it:

1. **Phase 2A authorization** is the next decision moment. Phase 2A is the largest single mutation in Phase 2 (8 packet-content fields × 3 packets, 24 product fields × 8 SKUs, ~10 reference_assets records with imagery, 9 slot_prompts, 3 packet→products linkages, 3 packet→reference_assets linkages, 3 brand-system→all-packets reference linkages). Phase 2A may itself sub-decompose if scope warrants.
2. **Phase 2B** is operator-side AI configuration; tracked as a known UI step.
3. **Phase 2C** generation arcs require sub-authorization per packet because each packet's generation produces irreversible attachment writes.
4. **Phase 2D** curation per slot (per packet) is bundled with Phase 2C per packet, mirroring the Path B per-packet arc.
5. **Phase 2E** cross-packet coherence check happens once after all 9 governed assets exist.
6. **Phase 2F** findings artifact is the terminal Phase 2 deliverable, answering the diagnostic lens questions and recording which apex Named Limitation(s) the test resolves, narrows, or leaves unchanged.

Each sub-phase follows the AGENTS.md Plan-Before-Execute + Structured Change Summary discipline. The exact-scoped-diff gate applies per sub-phase.

## Anchor Documents

### Direct architectural anchors

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): v1 apex definition-layer artifact; Named Limitation #3 is what Phase 2 addresses for the cross-base + cross-brand + campaign-mode subset; Named Limitations #1 and #2 are what the diagnostic lens pressures
- [`docs/campaign-mode-operationalization-setup-decision-note-v1.md`](campaign-mode-operationalization-setup-decision-note-v1.md): setup-decision note defining the test shape, minimum operational depth, and outcome categories; carries the diagnostic caveat this plan operationalizes
- [`docs/campaign-mode-operationalization-setup-content-v1.md`](campaign-mode-operationalization-setup-content-v1.md): setup-content artifact carrying the campaign-mode content commitments (Warm Restraint concept; bedroom / table / bath; HERO_WORLD / LIFE_IN_USE / OBJECT_VIGNETTE; product mix; restraint as four-layer architectural mechanism)

### Phase 1 anchors

- [`docs/campaign-mode-base-setup-phase-1-structural-plan-v1.md`](campaign-mode-base-setup-phase-1-structural-plan-v1.md): merged Phase 1 plan (PR #181)
- [`docs/campaign-mode-base-setup-phase-1-preflight-discrepancy-amendment-v1.md`](campaign-mode-base-setup-phase-1-preflight-discrepancy-amendment-v1.md): preflight discrepancy amendment (PR #182)
- [`docs/campaign-mode-base-setup-phase-1-tool-capability-amendment-v1.md`](campaign-mode-base-setup-phase-1-tool-capability-amendment-v1.md): tool capability amendment (PR #183)
- [`docs/campaign-mode-base-setup-phase-1-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-1-structured-change-summary-v1.md): Phase 1 completion record (PR #184); this plan inherits the four open questions carried forward
- [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md): durable connector tool-capability reference; Phase 2 connector-capability preflight cites this

### Operational pattern reference

- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): coordinated fresh-generation full-flow on PKT-SKU-010; the operational arc shape Phase 2 mirrors per packet, including `asset_attachment` writeback by attachment-copy
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): same-base same-category collection-mode operational test; Q1 (schema-carries) and Q2 (prose-compensates) reference this test's success pattern and finding 5 directly; curator-override correction informs `curation_pattern` determination
- [`docs/curator-field-and-backfill-sku-driven-furniture-v1.md`](curator-field-and-backfill-sku-driven-furniture-v1.md): curator field provenance pattern for governed-asset writeback

### Workflow rules

- `AGENTS.md` Airtable Mutation Discipline rule (Plan-Before-Execute + Structured Change Summary)
- `AGENTS.md` Airtable Schema-Fit Rule (extended in spirit to tool-capability preflight per the v47 grounding note)
- v47 grounding note: prototype-aesthetic instances (D2C archetype tagged); proof-chain gravity well guard (no new conceptual artifact unless it changes model / schema pressure / carrier boundary / governance seam); architecture-pass discipline (synthesis only after concrete-example pressure)
