# Campaign-Mode Fork-Resolver Test // Phase C Plan v1

## 1. Header / Posture

- **Packet:** `PKT-CAMP-004-KITCHEN_PREP`
- **Base:** Campaign-Driven D2C Home-Goods v1 (`appCAcRuA82SWj5h5`)
- **Scope:** generation + curation + governed-asset writeback against the three Phase B slot records
- **Companion artifacts:** [`docs/campaign-mode-fork-resolver-test-setup-v1.md`](campaign-mode-fork-resolver-test-setup-v1.md) (Phase A pre-registration), [`docs/campaign-mode-fork-resolver-test-phase-b-scs-v1.md`](campaign-mode-fork-resolver-test-phase-b-scs-v1.md) (Phase B SCS)

This is a durable Phase C plan artifact. It does not authorize generation, curation, or `generated_assets` writeback by itself. Each execution batch still requires in-thread plan-before-execute discipline.

## 2. Entry condition — Phase B carrier state

The seven-chain lookup and carrier verification recorded in the Phase B SCS is the entry condition. All image-bearing carriers are populated; all packet and slot lookups resolve end-to-end; the `governed_output_count` rollup is `0`. The slots `SLOT-CAMP-004-HERO_WORLD`, `SLOT-CAMP-004-LIFE_IN_USE`, and `SLOT-CAMP-004-OBJECT_VIGNETTE` carry resolved `product_image_lookup_lookup` (three product images) and `packet_reference_image_lookup` (six reference images), with `slot_prompt` populated per Phase B authoring.

Phase B SCS is the canonical record of the entry state; this plan does not restate it in detail.

## 3. Scope — what this plan does and does not do

This plan does:

- Define the Phase C hard preflight protocol
- Define the per-slot generation plan and named drift surfaces
- Define the observation frame for bounded discretion across slots
- Define the curation and provenance plan that gates `generated_assets` writeback
- Define order of operations and batch structure

This plan does not:

- Invoke any generation, in or out of Airtable
- Write any `generated_assets` rows
- Perform any curation event
- Mutate any schema, field, rollup, or enum
- Resolve the curation-premise architectural fork
- Synthesize Phase D findings

## 4. Hard preflight — AI field-agent configuration + current `slot_generated_image_v1` state

The first uncertainty named in Phase A pre-registration is whether an Airtable AI field-agent fires on new slot rows when `slot_prompt` is populated, and if so what field it writes to and what lookups it consumes. Phase B populated `slot_prompt` on all three slots. Phase C cannot assume a blank generated-output state.

### 4.1 State inspection (precedes any generation invocation)

Before any generation invocation, inspect `slot_generated_image_v1` on all three `PKT-CAMP-004` slots.

Outcome classes:

- **Empty** // no prior auto-generation; proceed to configured generation plan in §5.
- **Populated** // classify as auto-first-run baseline; do not overwrite; decide whether it counts as a candidate-set member under §7 curation rules.
- **Unexpected mixed state** // stop and re-propose. Mixed state includes any of: partial population across slots, candidates that do not match the slot register, candidates with provenance that cannot be reconstructed from packet linkages.

### 4.2 Field-agent configuration finding

Independent of the state inspection, record a Phase C preflight finding answering:

- Does an AI field-agent fire automatically when `slot_prompt` is populated on a new slot row, and is that behavior scoped to a base, table, packet, or field?
- If it fires: which field receives the output (`slot_generated_image_v1` is the candidate target); does it consume `product_image_lookup_lookup` and `packet_reference_image_lookup` as image inputs; how many candidates per invocation; is it deterministic or re-runnable.
- If it does not fire: confirm fallback to operator-driven generation in Flow / Nano Banana Pro per grounding-note v55 §Prototype-Aesthetic Imagery Workflow, with writeback via manual UI upload or Dropbox-shared-URL fetch per [Limitation #5](airtable-connector-tool-capability-limitations-v1.md).

The preflight finding is recorded in-thread before any §5 generation batch begins; if the finding changes the execution path materially, it must be captured in the Phase C structured change summary after execution.

### 4.3 Gate criteria

A subsequent generation batch may proceed only when the state inspection has produced a definite outcome class **and** the field-agent configuration finding has been recorded. Either condition unmet is a hard stop.

## 5. Per-slot generation plan

Each slot receives a discrete generation batch. The batch authorizes a specific generation tool and configuration, a candidate count, and a regeneration policy. Each batch is opened in-thread with a fresh plan-before-execute step that references this section as its anchor.

### 5.1 `SLOT-CAMP-004-HERO_WORLD`

- **Register:** packet-world hero — the highest-level scene that situates the kitchen-prep packet in its warm-restraint envelope, with the three products present but not pushed into the foreground.
- **Named drift surfaces:**
  - over-cinematic drift (over-styled lighting, theatrical composition not warranted by the brand-system restraint reference)
  - packet-world-drift (scene reads as generic lifestyle rather than as the specific kitchen-prep moment)
  - palette-emphasis loss (warm-restraint envelope collapses into either flat neutrality or oversaturated warmth)
  - product-as-prop drift (the three products read as set-dressing rather than as the packet's working subjects)
- **Bounded discretion:** inherits packet-level `bounded_creative_discretion`; slot adds composition latitude over moment-of-day and depth-of-field.
- **Generation count / regen policy:** x4 per Flow precedent; regenerate if no take is coherent against the brand-system and packet-atmosphere references.

### 5.2 `SLOT-CAMP-004-LIFE_IN_USE`

- **Register:** use-moment narrative — a quiet, real-time use of one or more of the three products, with hand presence implied or shown by convention rather than pushed to portraiture.
- **Named drift surfaces:**
  - mid-cutting drift (hand or knife caught mid-action in a way that reads as motion-blur or theater rather than restraint)
  - hand-presence convention drift (over-prominent hands, modeled hands, or stylized hand poses)
  - moment-of-use over-specification (scene narrates a recipe or a sequence rather than holding a single quiet moment)
  - rustic / farmhouse drift (warm-restraint envelope collapses into rustic-kitchen aesthetic rather than warm-restraint D2C aesthetic)
- **Bounded discretion:** the discretion register here has a preliminary authorship-bearing observation from Phase B (see §6); generation must not be narrowed by that observation, only recorded against it.
- **Generation count / regen policy:** x4; regenerate if all takes collapse into a drift surface.

### 5.3 `SLOT-CAMP-004-OBJECT_VIGNETTE`

- **Register:** product-as-still-life — one or more of the three products composed as a quiet still-life vignette, distinct from the HERO_WORLD scene and from the LIFE_IN_USE use-moment.
- **Named drift surfaces:**
  - saturated-produce drift (props or surfaces compete with the products' restraint palette)
  - atmospheric-bleed drift (the kitchen-prep atmosphere reference overshadows the products themselves)
  - propped-styling drift (composition reads as commercial product staging rather than as restrained still-life)
  - rustic / farmhouse drift (same envelope collapse as 5.2)
- **Bounded discretion:** inherits packet-level discretion; slot adds latitude over which product(s) are foregrounded and which surface is used.
- **Generation count / regen policy:** x4; regenerate against the same criteria.

## 6. Bounded discretion under observation — parallel form to LIFE_IN_USE

Phase B recorded `discretion_register_observation: authorship-bearing` for `LIFE_IN_USE` in `slot_evaluation_notes`. That observation is preliminary evidence-against-premise-holds, held alongside Phase C generation, not extended by it.

Phase C does not attempt to manufacture comparable authorship-bearing moments for `HERO_WORLD` and `OBJECT_VIGNETTE`. Forced symmetry would contaminate the Phase D synthesis. Instead, Phase C records observations under the same observation frame and lets each slot's discretion classification fall where the curator-of-record reads it:

- `configuration-shaped` // the choice was effectively narrowed by packet `creative_intent`, slot `expected_output_description`, and the lookup-resolved references such that the curator was selecting among near-substitutable candidates within an envelope already defined by the schema and inputs.
- `ratification-shaped` // the choice ratified a default produced by generation, with discretion exercised mostly as a quality check rather than as authorship over what the scene depicts.
- `authorship-bearing` // the choice required selecting from a candidate space that the schema, packet, and lookups did not narrow far enough to make mechanical; the curator's selection contributed meaning the inputs did not.

Each per-slot observation is recorded into `slot_evaluation_notes` in this shape. The LIFE_IN_USE observation is preserved as preliminary evidence; whether it tilts the fork toward `refines` or `fragments` is held for Phase D synthesis once all three slots are classified.

## 7. Curation / provenance plan

Curation gates `generated_assets` writeback. No `generated_assets` row is created in Phase C until the curation plan has been satisfied for the slot whose candidate is being captured.

### 7.1 Visual evidence rule

Curation claims must be attributed to direct visual evidence from the generated candidates, not Airtable metadata alone. The `capture_notes` and the per-slot `slot_evaluation_notes` observation must reference what was visible in the candidate set; field bookkeeping alone is not a curation claim.

### 7.2 Capture pattern

The `curation_pattern` field on `generated_assets` is set per the grounding-note v42 anchor on capture as selection:

- `authorship-bearing` // raw-pass selection where the curator ranges over the full candidate space without a pre-narrowed default
- `confirmation-bearing` // ratification of a pre-narrowed default produced by an algorithmic or agentic process

The capture pattern is set per row, on the curation event, against the candidate set actually presented.

### 7.3 Curator-of-record

The `curator` field carries the curator-of-record string. For Phase C the convention is `Claude (proposing); ASK (ratifying)` when Claude proposes a selection from the candidate set and ASK confirms or overrides; `ASK` alone when the selection does not involve a Claude proposal. The field stays free-text per its description; this convention is local to Phase C and does not earn enum doctrine here.

### 7.4 Attachment vs URI carrier

`asset_attachment` carries the chosen attachment object (the selected attachment is copied from `slot_generated_image_v1` into `asset_attachment` so the governed-asset row carries the actual image, per the Phase 2A-i thin-bridge resolution). `source_attachment_id` carries the pointer back to the originating `slot_generated_image_v1` attachment. `asset_uri` is set if a URL-form carrier is needed alongside; otherwise it remains empty.

### 7.5 `slot_status` transitions

On curation event:

- Slot whose candidate becomes a governed asset → `slot_status` transitions to the appropriate existing captured / completed value after inspecting the current enum; if no suitable value exists, stop and re-propose rather than creating or improvising a value.
- Slot whose candidates are all rejected → transition only to an appropriate existing rejected / re-queue value after enum inspection; if none exists, stop and re-propose. No `generated_assets` row created.
- Mixed state on the slot → re-propose; do not transition silently.

## 8. Order of operations / batch structure

Sequential, with named stops:

1. **Phase C preflight batch.** §4.1 state inspection + §4.2 field-agent configuration finding. No generation. Stop condition: outcome class determined and finding recorded.
2. **Generation batch — HERO_WORLD.** Per §5.1. Stop condition: candidate set present in `slot_generated_image_v1` (or operator-side equivalent), no curation yet.
3. **Generation batch — LIFE_IN_USE.** Per §5.2. Same stop condition.
4. **Generation batch — OBJECT_VIGNETTE.** Per §5.3. Same stop condition.
5. **HARD STOP — visual review.** After generation completes for all three slots, stop for visual review before any curation or `generated_assets` writeback. Curation is the creative-discretionary seam under test; it must not be mechanically chained to generation.
6. **Curation batch — per slot.** Per §7. Each slot a discrete batch, fresh plan-before-execute. Stop condition: `generated_assets` row written (or slot recorded as rejected), `slot_evaluation_notes` updated with the §6 observation, `slot_status` transitioned.

No auto-chaining between batches. Each batch is opened in-thread with a fresh plan-before-execute step.

## 9. What did not change / out of scope

- No schema mutation; no field additions, type changes, rollup changes, or enum changes proposed by this plan
- No fork promotion beyond `Held Questions` posture in [`docs/architecture.md`](architecture.md)
- No expansion of test scope beyond the three Phase B slot records and the existing brand-system + packet-atmosphere references
- No cross-base or cross-brand pressure introduced in Phase C
- No workflow-rule additions to [`AGENTS.md`](../AGENTS.md) proposed by this plan; the Phase B preflight deviation is recorded in the Phase B SCS as an observation, not a rule

## 10. Anchor documents

- Phase A pre-registration: [`docs/campaign-mode-fork-resolver-test-setup-v1.md`](campaign-mode-fork-resolver-test-setup-v1.md)
- Phase B SCS: [`docs/campaign-mode-fork-resolver-test-phase-b-scs-v1.md`](campaign-mode-fork-resolver-test-phase-b-scs-v1.md)
- Operator-judgment protocol sketch: [`docs/operator-judgment-protocol-sketch-v1.md`](operator-judgment-protocol-sketch-v1.md)
- Architecture § Held Questions § Curation-Premise Architectural Fork: [`docs/architecture.md`](architecture.md)
- Visual-identity-system → IA mapping: [`docs/brand-system-input-visual-identity-system-to-ia-mapping-v1.md`](brand-system-input-visual-identity-system-to-ia-mapping-v1.md)
- Airtable connector limitations § Limitation #5: [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md)
- Grounding-note (ex-repo, source-of-intent): §Prototype-Aesthetic Imagery Workflow + §Capture is selection
- Live prototype base: [Campaign-Driven D2C Home-Goods v1](https://airtable.com/appCAcRuA82SWj5h5)
