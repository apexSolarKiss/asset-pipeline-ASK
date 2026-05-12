# Normative Force and Durable-Layer Pressure v1

## Posture

```text
model attempt, not adjudication
prose primary; markdown tables as comparison surface
no YAML appendix; canonical structured form remains structured-ia-model-v1
not architecture rewrite
not milestone marker
not validator integration
not Pydantic
not ontology
not orchestration spec
not schema mutation
not Airtable mutation
does not resolve brand-system layer structural decision
does not adjudicate any held candidate
does not authorize Phase 2 / Phase 3 / Phase 4 work
does not extend the structured IA model v1 appendix
bounded to three pressure points; not exhaustive across modes
self-superseding when a subsequent artifact earns its place
```

This artifact attempts a candidate model of *normative force* — what kind of authority each piece of information in the architecture carries — and pressures the model against three concrete cases. The standard the artifact answers to is whether the model survives those three cases honestly, where it labels cleanly, where it conflates, and where it falls back to prose / procedure. It does not adjudicate any held question.

## What This Artifact Attempts

The architecture currently enumerates layers, carriers, modes, fallback chain, and held questions ([`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md)). It does not yet articulate, at first-class depth, *what kind of authority* the information at each layer carries. "Inputs" is used loosely across the architecture — a product image, a brand value, a slot prompt, a constraint rule, an approved reference, and a governed asset are all "inputs" to something, but their normative force differs.

Milestone 9's *Scope of current claims* names the gap between the architecture's current state (machine-readable enumeration plus drift detection) and its target layer (machine-usable normative structure / durable orchestration above tools). The non-Airtable extraction attempt v1 ([`docs/non-airtable-extraction-attempt-v1.md`](non-airtable-extraction-attempt-v1.md)) showed that the *data shape* of a representative slice translates outside Airtable cleanly; the *interpretive and procedural layer* that makes the data shape operational does not.

This artifact attempts the bridge question: which kinds of information currently carry cleanly as structural carriers at this evidence depth, which are more honestly prose / procedural, and which require operational pressure before promotion. The bridge is a force model, not a carrier inventory. Carrier inventories live in the structured IA model v1 and the Phase 2 deepenings; this artifact reads above them.

## Why This Pass

Three convergent surfaces named the need:

- The non-Airtable extraction attempt confirmed that durable orchestration above tools is unfinished work, with the procedural / interpretive layer as the next leg.
- The campaign-mode fork-resolver test at PKT-CAMP-004 ([`docs/campaign-mode-fork-resolver-test-phase-d-findings-v1.md`](campaign-mode-fork-resolver-test-phase-d-findings-v1.md)) absorbed into milestone 9 forced the curation semantic split: authorship-bearing discretion at variable sites, governance-bearing curation always at the seam. The split is a question about where judgment force enters and how it travels.
- The sparse-articulation fallback pressure note ([`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md)) showed that operator judgment becomes load-bearing under stress conditions and surfaced inferred-not-stated semantics as paper-pressed structural-carrier candidates. The minimum trace a judgment event must leave to remain legible is not currently named.

The held-candidate inventory at milestone 9 lists fourteen-plus paper-pressed candidates, none operationally earned. Without a force-kind criterion set, "held" risks accumulating without an earn / deflate path.

## The Six Force Kinds (Candidate Model)

The model proposes six candidate kinds of normative force. Each carries a different relationship to authority — what binds, what advises, what describes, what anchors, what was resolved, and what elevates.

- **Descriptive**: states what is true about an object in the architecture (product material; product dimensions; SKU identity; campaign-world placement). Descriptive force is non-binding in the prescriptive sense — it does not say what should happen, only what is.
- **Directive**: states what should happen (business intent; creative intent; slot prompt; expected output role). Directive force is binding-as-instruction — it shapes downstream generation.
- **Constraint**: states what must not be violated (constraint rules with scope and priority; bounded creative discretion). Constraint force is binding-as-bound — it limits what directive content may produce.
- **Reference**: visually or by-example anchors interpretation (product image; approved reference assets; campaign-world reference imagery; brand-system asset library). Reference force is binding-as-anchor — it carries high-bandwidth normative content that prose alone cannot encode, and it overrides text-only steering when generation defaults conflict with intended output.
- **Judgment**: records what was resolved by a human, operator, or agent (curator field; curation pattern; capture reason; capture notes; slot evaluation notes; operator inferences). Judgment force is binding-as-decision — it records that a discretionary act occurred and leaves a trace.
- **Governance**: elevates output into governed asset identity (governed output status; governed output flag; asset attachment; review artifact flag; slot status transitions). Governance force is binding-as-sanction — it is the moment a candidate becomes a sanctioned asset.

The six kinds are not orthogonal in the strict sense. Some information carries multiple forces — a packet-level `bounded_creative_discretion` field carries both constraint force (the bounds) and directive force (the bounded freedom). The model treats this as composition, not failure. The question the model exists to answer is whether the force kinds carry cleanly *in their primary role* at this evidence depth.

### Force kinds overview

| Force kind  | Definition                                                  | Clean structural carrier at this evidence depth?                              | Where it appears                                                                     | Where it strains                                                                                     |
|-------------|-------------------------------------------------------------|------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| Descriptive | What is true about an object                                | Yes for product / SKU truth; partial for non-product descriptive content     | Product fields; SKU keys; identifying details; status enums where stable             | Collection constituent enumeration; campaign-world placement; multi-scope descriptive content        |
| Directive   | What should happen                                          | Partial — captured as prose; not structurally distinguished from constraint  | Business intent; creative intent; slot prompt; expected output role                  | Packet-level directive vs constraint share carrier (multilineText); inheritance / override implicit  |
| Constraint  | What must not be violated                                   | Partial — `constraint_rules` is structurally explicit; packet-level is prose | `constraint_rules` (scope, priority, rule type); bounded creative discretion (prose) | Packet-level constraint shares carrier with directive; cross-layer precedence not formally encoded   |
| Reference   | What visually anchors interpretation                        | Yes via attachments and URLs; sub-classification (descriptive vs directive) not first-class | `product_image`; `reference_assets`; packet-level approved references; `asset_attachment` | Held reference-type tag has two divergent paper proposals; not earned                                |
| Judgment    | What was resolved by human / operator / agent               | Yes for trace at curation seam; no for upstream authorship trace             | Five-axis provenance + curator + `curation_pattern` at seam; `slot_evaluation_notes` upstream | Upstream authorship-bearing moments (prompt-authoring; prompt-remediation) have no load-bearing trace |
| Governance  | What elevates output into governed asset identity           | Yes via status enum + formula + attachment carrier                           | `governed_output_status`; `governed_output_flag`; `asset_attachment`; `slot_status`  | Reuse / derivative governance not modeled                                                            |

The table above is a model attempt, not a finding. The three pressure points that follow are the cases against which the table is tested.

## Pressure Point: PKT-SKU-009

PKT-SKU-009 is the architecture's strongest full-flow evidence base ([`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md) and predecessors). The slice carries the layered structure end-to-end: SKU-CHAIR-004 product truth, packet-level intent and bounds, three slots (HERO / PROFILE / DETAIL) with role-specific narrowing, one approved reference asset, ten generated-asset rows across packet-level and slot-level generation, three of which are governed-output terminal state.

### Force-kind labeling

| IA element                            | Force kind                  | Carrier status                       | Notes                                                                                  |
|---------------------------------------|-----------------------------|--------------------------------------|----------------------------------------------------------------------------------------|
| `material_notes` / `finish_notes` / `identifying_details` on product | Descriptive | Structural (multilineText)           | Product-truth descriptive force; clean carrier                                          |
| `product_image` on product            | Reference (descriptive-reference) | Structural (multipleAttachments)     | Anchors what the product IS; descriptive sub-kind of reference                          |
| `business_intent` on packet           | Directive                   | Structural (multilineText)           | Carrier shared with creative_intent and bounded_creative_discretion; force-kind invisible to structure |
| `creative_intent` on packet           | Directive                   | Structural (multilineText)           | Same carrier as above                                                                  |
| `bounded_creative_discretion` on packet | Constraint (+ directive composite) | Structural (multilineText)           | Carrier shared with directive; the constraint force is invisible at structure level     |
| `constraint_rules` table (available carrier; not linked on PKT-SKU-009 snapshot) | Constraint                  | Structural (scope_type enum; priority int; rule_type; active_status enum) | Structurally explicit; the architecture's cleanest constraint carrier; PKT-SKU-009 does not exercise it on this snapshot |
| `reference_assets` (linked via `approved_reference_keys`) | Reference (directive-reference) | Structural (multipleAttachments + asset_uri) | Anchors how presentation should be shaped; directive sub-kind of reference              |
| `expected_output_role` on slot        | Directive                   | Structural (text; deferred enum doctrine) | SKU mode uses HERO / PROFILE / DETAIL; enum promotion deferred per current doctrine    |
| `slot_prompt` on slot                 | Directive                   | Structural (multilineText)           | Role-specific narrowing of packet-level directive content                              |
| `capture_reason` / `captured_at` / `source_attachment_id` on generated_asset | Judgment (trace metadata) | Structural (text; datetime; text)    | Five-axis provenance; trace dimensions carry cleanly                                   |
| `capture_notes` on generated_asset    | Judgment (reasoning content) | Structural (multilineText)           | Reasoning content is prose-in-structure — the carrier is structural; the content is prose |
| `curation_pattern` on generated_asset | Judgment (pattern classification) | Structural (text; deferred enum doctrine) | Per milestone 9, distinguishes confirmation-bearing from authorship-bearing observationally |
| `curator` on generated_asset          | Judgment (attribution)      | Structural (text)                    | Held as text to allow heterogeneous values (human / agent-human compound / system)     |
| `governed_output_status` on generated_asset | Governance              | Structural (singleSelect enum)       | Clean carrier                                                                          |
| `governed_output_flag` on generated_asset | Governance                | Structural (formula)                 | Computed; clean                                                                        |
| `asset_attachment` on generated_asset | Governance (+ reference composite) | Structural (multipleAttachments)     | Self-contained governed-asset carrier; resolves milestone-5 thin-bridge                |
| `slot_status` on slot                 | Governance (lifecycle)      | Structural (singleSelect; deferred enum doctrine) | Lifecycle transitions surface governance moves                                          |

### Where labeling stays clean

Descriptive, reference, governance, and seam-level judgment force kinds all carry cleanly in SKU mode. The five-axis provenance plus curator field plus `curation_pattern` together form a structural carrier set that captures *who decided, when, on what basis, against what source, in what shape* without flattening the reasoning content (which lives in `capture_notes`). This is an existence proof that judgment force can carry trace dimensions structurally without pretending judgment is deterministic.

### Where labeling strains

Two strains surface even in SKU mode:

- **Packet-level directive and constraint share carrier.** `business_intent`, `creative_intent`, and `bounded_creative_discretion` are all multilineText. The force-kind distinction is invisible to structure; it lives in the field-name convention and prose discipline. Inheritance / override between these three (and into slot-level `slot_prompt`) is implicit-additive (Apex Named Limitation #2).
- **Reference sub-classification is convention, not type.** `product_image` (descriptive-reference) and `reference_assets` (directive-reference) are structurally separated by field name and table, not by a typed reference-kind. The held reference-type tag has two divergent paper proposals (5 categories vs 6 categories); not earned.

The cleanly-labeled force kinds in SKU mode set the upper bound on what the model can claim across modes. The strain points already visible here propagate.

## Pressure Point: PKT-COLL-001

PKT-COLL-001 is the collection-mode operational test ([`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md)) — three net-new slots added to PKT-COLL-001 in the existing SKU-driven base, designed to pressure 1:N slot-product cardinality and the held composite-anchor / `grouping_archetype` candidates. The outcome was operational deflation: schema carried collection-mode pressure without structural mutation; prose discipline absorbed constituent enumeration and exclusion-by-name; three governed assets produced; `grouping_archetype` composite-anchor mutation less earned by operational pressure than before.

### Force-kind labeling

| IA element                             | Force kind                  | Carrier status                       | Notes                                                                                       |
|----------------------------------------|-----------------------------|--------------------------------------|---------------------------------------------------------------------------------------------|
| Packet `business_intent` / `creative_intent` | Directive             | Structural (multilineText)           | Collection-scope directive; same carrier as SKU mode                                         |
| Collection constituent enumeration (which SKUs are in the collection) | Descriptive (collection-scope) | Prose-carried at packet / slot level | No structural carrier for collection-as-set; held candidate (`worked_example_defaults`, related) not earned |
| Exclusion-by-name (which products are NOT in the slot) | Descriptive (negative evidence) | Prose-carried                        | Held candidate (`rejected_assets` entity) is the structural-carrier analogue; not earned     |
| `grouping_archetype` (held candidate) | Directive (collection shape) | Not realized; held composite-anchor candidate | Operationally deflated; prose discipline carried collection identity                         |
| Cross-axis selection criteria (demographic + family-coherence + price-tier, etc.) | Directive + Constraint composite | Prose-carried at packet level        | Multi-axis force composition; no structural carrier for the axis enumeration                 |
| Slot-level constituent reference (which product the slot anchors to) | Reference (descriptive-reference) | Structural via product link          | SKU-mode field reused; carries cleanly                                                       |
| Cross-axis curation tradeoffs at seam  | Judgment (multi-axis)       | Structural via `curation_pattern` + `capture_notes` | Surfaced new pattern: `batch-output-no-curator-selection`; judgment force traveled cleanly into seam carrier |
| Curator override at seam               | Judgment (curator authority over pattern label) | Structural via `curator` + `curation_pattern` | Found that `curation_pattern` reflects curator's actual judgment process, not proposal cardinality |
| `governed_output_status` / `asset_attachment` | Governance             | Structural                           | Same carriers as SKU mode; cardinality strain did not pressure them                          |

### Where labeling stays clean

Reference, judgment-at-seam, and governance force kinds carry cleanly. The cross-axis curation tradeoff at the seam was new pressure on judgment force — the curator-override finding (that `curation_pattern` is determined by the curator's actual judgment process, not by proposal cardinality) sharpened how judgment force is recorded without changing the carrier set.

### Where labeling strains

- **Collection constituent enumeration has no structural carrier.** Descriptive force at collection scope is prose-carried. The deflation of the composite-anchor / `grouping_archetype` candidate showed that prose discipline can absorb the pressure at this evidence depth. The model labels this as descriptive force living more honestly in prose at collection scope, not as descriptive force absent.
- **Cross-axis directive + constraint composition is prose.** The multi-axis selection criteria of a collection ("women's demographic, price-tier accessible, family-coherent across sizes, season-relevant") combine directive force (what the collection should express) and constraint force (what it must not violate). The architecture has no structural decomposition; prose discipline carries the composition.
- **`grouping_archetype` is the first instance of force-kind pressure deflation.** The candidate represented a paper-pressed proposal to structurally encode directive force at the collection / mode-specific layer. Operational pressure deflated the need at this evidence depth. The deflation pattern is reusable: a held candidate is a paper-pressed structural carrier for a force kind whose force is genuinely felt but whose structural representation is not yet earned by operational pressure.

## Pressure Point: PKT-CAMP-004

PKT-CAMP-004-KITCHEN_PREP is the campaign-mode fork-resolver test ([`docs/campaign-mode-fork-resolver-test-phase-d-findings-v1.md`](campaign-mode-fork-resolver-test-phase-d-findings-v1.md)) — one packet in the Campaign-Driven D2C Home-Goods v1 base, within the Warm Restraint prototype-aesthetic instance. Three slots: HERO_WORLD, LIFE_IN_USE, and OBJECT_VIGNETTE. Three generated-asset rows; all three curation events `confirmation-bearing`; authorship-bearing work surfaced upstream at prompt-authoring (LIFE_IN_USE) and prompt-remediation (OBJECT_VIGNETTE).

### Force-kind labeling

| IA element                             | Force kind                  | Carrier status                       | Notes                                                                                  |
|----------------------------------------|-----------------------------|--------------------------------------|----------------------------------------------------------------------------------------|
| Campaign concept (Warm Restraint)      | Directive + Reference + Constraint composite | Mode-specific layer; no structural carrier at packet entity | The concept directs aesthetic shape, anchors via reference imagery, and constrains via avoid-list; three force kinds combining |
| Packet-level reference (Warm Restraint reference imagery) | Reference (directive-reference at campaign scope) | Structural via reference_assets pattern | Reused carrier; the *scope* is mode-specific but the carrier shape generalizes              |
| `slot_prompt` at LIFE_IN_USE           | Directive (downstream content) | Structural (multilineText)           | The directive content is captured; the *authoring* of the directive is judgment force (below) |
| Prompt-authoring decision at LIFE_IN_USE | Judgment (upstream authorship-bearing) | No load-bearing carrier; partial prose in `slot_evaluation_notes` | The authorship-bearing site for this slot; the architecture has no structural trace      |
| `slot_prompt` at OBJECT_VIGNETTE       | Directive (downstream content) | Structural (multilineText)           | Final remediated directive captured; the remediation history is not                     |
| Prompt-remediation at OBJECT_VIGNETTE  | Judgment (upstream remediation) | No load-bearing carrier              | Mid-flow modification of slot_prompt after initial generation drifted; not captured     |
| Three curation events (all slots)      | Judgment (confirmation-bearing) + Governance | Structural via five-axis provenance + curator + `curation_pattern` + `asset_attachment` | Seam carriers carry cleanly; semantic split exposes that judgment-at-seam was *reduced* from authorship to confirmation |
| Campaign-world coherence (review-context layer) | Constraint (cross-slot)     | Prose-carried                        | The mode-specific second layer in campaign mode; campaign-world coherence is binding-as-bound across slots; no structural carrier |

### Where labeling stays clean

Reference, governance, and seam-level judgment trace carry cleanly — the same carriers that worked in SKU mode work here. The semantic split is itself an articulation of judgment force, not a failure of governance force. Governance-bearing curation at the seam was clean across all three slots.

### Where labeling strains

- **Upstream judgment force has no carrier.** Prompt-authoring at LIFE_IN_USE was authorship-bearing — the curator's discretion shaped the directive that downstream generation followed. Prompt-remediation at OBJECT_VIGNETTE was authorship-bearing — mid-flow modification of the slot_prompt after observing candidate drift. Neither moment has a load-bearing structural carrier. `slot_evaluation_notes` is the closest field; its current use is free-form prose, and its load-bearing status is partial. The minimum-trace question is open: when judgment force appears upstream of the seam, what trace must it leave for the architecture to remain legible? The model names the gap; does not resolve it.
- **Campaign concept is a multi-force composite the architecture has no carrier for at the campaign-concept entity layer.** Warm Restraint as a directive (what to express), a reference set (lifestyle imagery to anchor against), and a constraint set (the avoid-list — no austerity drift, no rustic-craft drift) combines three force kinds in one mode-specific upstream object. The held `campaign_concept` composite-anchor candidate is paper-pressed; the cross-mode probe found this the sharpest case across the probe series.
- **Confirmation-bearing curation reduces judgment force at the seam.** The seam still carries judgment trace structurally, but the *kind* of judgment recorded is confirmation, not authorship. The curation semantic split is force-articulation: judgment force splits across upstream authorship-bearing sites (no carrier) and seam-level confirmation-bearing sites (structural carrier present).

## Cross-Case Synthesis

Reading across the three pressure points:

- **Descriptive, reference, governance, and seam-level judgment trace carry cleanly across all three modes at this evidence depth.** The structural carriers earned in SKU mode generalize structurally to collection and campaign mode at the seam and at the product / reference / governed-asset layers.
- **Packet-level directive and constraint share carrier across all three modes.** `business_intent`, `creative_intent`, and `bounded_creative_discretion` are multilineText regardless of mode. The force-kind distinction lives in field-name convention and prose discipline, not in structure. Inheritance / override across IA layers is implicit-additive.
- **Reference force splits into descriptive-reference and directive-reference at all three modes.** The split is currently carried by field-name convention and table separation, not by typed reference-kind. The held reference-type tag is the paper-pressed structural carrier; not earned.
- **Judgment force operates at different sites in different modes.** SKU mode: judgment force concentrated at the seam (structurally clean). Collection mode: judgment force at the seam plus prose-carried cross-axis composition at the packet (deflation showed prose discipline absorbed cross-axis tradeoff pressure). Campaign mode at PKT-CAMP-004: judgment force splits across upstream authorship-bearing sites (no carrier) and seam-level confirmation-bearing sites (structural carrier present). Marketing mode unearned at full-flow depth.
- **Composite-force objects appear at different mode-specific layers.** Collection mode surfaced cross-axis directive + constraint composition; campaign mode surfaced directive + reference + constraint composition at the campaign-concept layer. Both are prose-carried in the current architecture. The composite-anchor held candidates across these modes share the same shape: structural representation for a multi-force upstream object whose force composition is currently invisible to structure.
- **The minimum-trace question for judgment force is unresolved.** SKU and collection modes show judgment force can carry trace dimensions structurally at the seam (five-axis provenance + curator + `curation_pattern`) without flattening reasoning content. Campaign mode shows judgment force at upstream sites has no load-bearing trace at all. Whether the seam-trace shape generalizes upstream — whether prompt-authoring and prompt-remediation events should leave a five-axis-equivalent trace — is open.

## Conversion Criteria

The model offers the following criterion answer to the artifact's exit question. Each row reflects current evidence depth, not architecture-wide doctrine.

### Currently carry cleanly as structural carriers at this evidence depth

- Descriptive force at SKU / product scope
- Reference force (with descriptive-reference and directive-reference distinguished via field naming and table separation, not via typed reference-kind)
- Governance force at the curation seam (status enum + formula + attachment + lifecycle transitions)
- Judgment force *trace dimensions* at the curation seam (five-axis provenance: capture_reason, captured_at, source_attachment_id, capture_notes, curation_pattern; plus `curator` for attribution; plus `curation_pattern` for shape)

### More honestly prose / procedural at this evidence depth

- Directive force at packet level (`business_intent`, `creative_intent`) — captured as multilineText; shares carrier with bounded_creative_discretion
- Constraint force at packet level (`bounded_creative_discretion`) — captured as multilineText; shares carrier with directive
- Judgment *reasoning content* (capture_notes, slot_evaluation_notes) — trace dimensions are structural; the reasoning content itself is prose-in-structure
- Inheritance / override behavior across IA layers (Apex Named Limitation #2)
- Inferred-not-stated semantics — a prose discipline; surfaced as paper-pressed structural-carrier candidate (`derivation_basis`; `articulation_state`); not earned
- Composite-force upstream objects at mode-specific layers (collection cross-axis composition; campaign concept) — prose discipline carries the composition; held composite-anchor candidates are the paper-pressed structural analogues

### Require operational pressure before promotion

- Upstream judgment trace (prompt-authoring, prompt-remediation moments surfaced in PKT-CAMP-004; no carrier exists; minimum-trace question is open)
- Reference-type sub-classification (the held reference-type tag with two divergent paper proposals)
- `selection_axis` enum (judgment classification by dimension)
- Marketing-mode message-element structural fields (offer text; brand identifier presence; callout emphasis; copy-overlay region) — mode not full-flow pressured
- Composite-anchor structure across non-SKU modes (collection deflated; campaign held; marketing held)
- `articulation_state` flag distinguishing rich / sparse / generic / contradictory states (paper-pressed in sparse-articulation pressure note)
- `derivation_basis` field on packet-level / slot-level prose carriers
- `fallback_chain_position` annotation on resolved content
- `approval_state` metadata on `reference_assets`
- `rejected_assets` first-class entity for negative-evidence boundary signal
- `worked_example_defaults` first-class carrier
- `contradiction_log` first-class entity tracking operator-resolved contradictions
- Aspect-ratio-as-attribute on slots
- Per-mode role-typical aesthetic constraints attached to `slot_role`

The third row above gives the held-candidate inventory a force-kind criterion set. A future held-candidate adjudication map, if earned, would use that criterion set to classify each held candidate. This artifact does not produce the map.

## Implications for Held Items (Named, Not Adjudicated)

The force model surfaces three implications for held items. The implications are named at the strength current evidence supports; they do not adjudicate the underlying decisions.

### Brand-system layer structural decision

The force model suggests why a hybrid answer is likely. The structural-constant content surfaced in the VIS deepening (logo references, typography assignments, color codes, grid systems) carries reference force and stable-constant descriptive force — both of which currently carry cleanly via structural carriers in other parts of the architecture. The brand platform deepening surfaced abstraction-heavy content (positioning, voice, values, audience) carrying directive force — which is prose-carried with no structural distinction from packet-level directive across all three modes. Operator-mediated judgment under sparse articulation surfaced in the sparse-articulation fallback pressure note carries judgment force at a site (intake-time) that has no current carrier.

The force model does not specify which brand-system carriers should mutate, which should remain prose, or how to commit. It clarifies why the three live shapes (first-class throughout / terminal operator-mediated / hybrid) likely converge on hybrid: different force kinds at the brand-system layer have different current carrier behavior, and no single shape covers all of them. The structural decision remains held per milestone 9.

### Curation-premise architectural fork

The force model articulates the curation semantic split named at milestone 9 as judgment-force-kind appearing at multiple sites of authorship-bearing form, with governance-force-kind always at the curation seam. The fork (`holds` / `refines` / `fragments`) can be read as a mode-weighted question about which sites of judgment force become load-bearing in a given mode: SKU mode concentrates judgment at the seam (the singular-curation framing remains useful), collection mode concentrates similarly at the depth tested, campaign mode at PKT-CAMP-004 splits across upstream authorship and seam confirmation. Marketing mode unearned at full-flow depth.

The bounded `refines` reading at PKT-CAMP-004 scope, held for further pressure-testing per Phase D §9, is not advanced or weakened by this artifact. The force model gives the fork's status a clearer articulation but does not move it.

### Held-candidate inventory

The conversion-criteria third row gives a force-kind criterion set for the milestone-9 held inventory. Each held candidate maps to a force kind; adjudication asks whether that kind currently carries cleanly elsewhere, more honestly via prose, or requires operational pressure before promotion. A held-candidate adjudication map remains held — not authored, not authorized — and would be Phase 3 work if earned.

## Marketing-Mode Boundary

PKT-MSG-001 is structurally proven at cycle-1 depth ([`docs/airtable-marketing-message-driven-cycle-1-findings-v1.md`](airtable-marketing-message-driven-cycle-1-findings-v1.md)) but not full-flow operationally pressured. The marketing-mode message-element fields held as paper-pressed structural carriers (offer text; brand identifier presence; callout emphasis; copy-overlay region) would, under the force model, map to directive force with sub-classifications. Without full-flow pressure, the model can name these as held candidates requiring operational pressure; it cannot label their force-kind behavior with the same confidence as the three pressure points. Marketing-mode evidence is the boundary at which the force model's claims weaken.

## What This Artifact Does Not Do

- Resolve the brand-system layer structural decision
- Adjudicate any held candidate
- Authorize any schema mutation
- Authorize any Airtable mutation
- Specify orchestration semantics
- Extend the structured IA model v1 appendix
- Make claims beyond bounded evidence at the three named pressure points
- Test marketing-mode at full-flow depth
- Resolve the curation-premise architectural fork
- Resolve the inheritance / override precedence rule (Apex Named Limitation #2)
- Resolve the minimum-trace question for upstream judgment force
- Authorize Phase 2 (brand-system hybrid carrier decision surface), Phase 3 (held-candidate adjudication map), Phase 4 (harder non-Airtable extraction), or any subsequent work in the originating plan

The force model's value is providing a criterion set the architecture currently lacks. Its limits are bounded by current evidence at three pressure points.

## Self-Superseding Clause

This artifact is a v1 model attempt. It should be superseded by:

- An operational test that resolves the minimum-trace question for upstream judgment force (would reshape the judgment-force row across all three conversion-criteria categories)
- An operational test that earns or deflates a held candidate via the force-kind criterion set (would move the candidate between conversion-criteria rows)
- A marketing-mode full-flow operational test (would extend the cross-case synthesis and earn or deflate marketing-mode-specific candidates)
- A brand-system hybrid decision surface artifact that adjudicates the three live shapes (would resolve one of the named implications above)
- A subsequent milestone marker that absorbs the force model into architecture front-door framing

It does not supersede the apex definition-layer artifact, the three predecessor architectural passes, the Phase 1 sketches, the cross-mode synthesis, the Phase 2 deepenings, the structured IA model v1, the operational findings notes, the campaign-mode fork-resolver arc, the non-Airtable extraction attempt v1, milestone 8, or milestone 9. Those remain authoritative for their subject matter; this artifact reads them at force-model depth and pressures the model against three pressure points without re-deriving content.

## Anchor Documents

### Pressure-point evidence

- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): PKT-SKU-009 full-flow operational evidence — strongest full-flow case
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): PKT-COLL-001 operational deflation evidence
- [`docs/campaign-mode-fork-resolver-test-phase-d-findings-v1.md`](campaign-mode-fork-resolver-test-phase-d-findings-v1.md): PKT-CAMP-004 bounded `refines` reading; curation semantic split surfaced

### Architectural framing this artifact reads against

- [`docs/architecture.md`](architecture.md): current-architecture front door; *Scope of current claims* subsection
- [`docs/milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md`](milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md): plateau marker; curation semantic split; brand-system layer named decision; held inventory
- [`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md): canonical structured form; the force model reads above it
- [`docs/non-airtable-extraction-attempt-v1.md`](non-airtable-extraction-attempt-v1.md): the headline-target pressure test that surfaced the machine-readable vs machine-usable gap
- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact; three Named Limitations; the force model articulates #1 (specific aesthetic-carrier schema) and #2 (inheritance / override precedence) at finer grain

### Phase 2 inputs the force model touches

- [`docs/brand-system-input-visual-identity-system-to-ia-mapping-v1.md`](brand-system-input-visual-identity-system-to-ia-mapping-v1.md): VIS deepening — concrete-constants angle of brand-system layer
- [`docs/brand-system-input-brand-platform-to-ia-mapping-v1.md`](brand-system-input-brand-platform-to-ia-mapping-v1.md): brand platform deepening — abstraction angle of brand-system layer
- [`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md): sparse-articulation fallback pressure — operator judgment load-bearing under stress

### Held items not advanced by this artifact

- Brand-system layer structural decision (named at milestone 9; remains held)
- Curation-premise architectural fork (bounded `refines` at PKT-CAMP-004 scope; held for further pressure-testing)
- Held-candidate adjudication map (Phase 3 work in the originating plan; held)
- Harder non-Airtable extraction attempt at PKT-CAMP-004 (Phase 4 work; held)
- Brand intake-sequence dry run (Phase 5 work; held)
- Architecture front-door absorption (Phase 6 work; held)
- README / docs/index.md / docs/method.md condensation (Phases 7–8 work; held)
- External article series audit (Phase 9 work; operator-side; held)
