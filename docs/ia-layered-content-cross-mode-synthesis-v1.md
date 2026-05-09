# IA Layered-Content Cross-Mode Synthesis v1

## Posture

```text
on-paper IA content synthesis across B1–B4
not a per-mode summary
not a final IA model
not an architecture rewrite
not milestone-8
not Airtable / schema / prototype work
does not resolve all apex Named Limitations
self-superseding when later absorbed into milestone-8 and the eventual architecture.md rewrite
```

Per [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md), Phase 1 of the redirection is on-paper IA layered-content work across the four worked-example modes plus a synthesis that compares them. This artifact is the synthesis. It compares the four mode sketches against each other and surfaces the cross-mode IA content model that the comparison earns at current evidence depth.

The four mode sketches remain authoritative for their per-mode content articulation:

- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md) (B1)
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md) (B2)
- [`docs/ia-layered-content-sketch-marketing-mode-v1.md`](ia-layered-content-sketch-marketing-mode-v1.md) (B3)
- [`docs/ia-layered-content-sketch-campaign-mode-v1.md`](ia-layered-content-sketch-campaign-mode-v1.md) (B4)

This synthesis does not re-articulate per-mode content. It compares the four against each other, names what is stable across them, names what is mode-specific, and surfaces what the comparison teaches the architecture.

## Evidence-Depth Table Across the Four Modes

The depth at which each mode carries operational evidence governs what the synthesis can and cannot claim.

| Mode | Operational depth | Paper depth | Deflation status |
|---|---|---|---|
| **SKU-driven** | Full-flow operational across PKT-SKU-007 / 009 / 010 — generation → curation (five-axis provenance + `curator` + `curation_pattern`) → governed assets with `asset_attachment` self-contained writeback | Apex artifact + three predecessor passes; richest paper depth | Not applicable — SKU mode is the operationally-grounded baseline; no paper-strain to deflate |
| **Collection / merchandising** | Full-flow operational on PKT-COLL-001 — generation → curation (with curator override correction) → governed assets with `asset_attachment` | Cross-mode probe (paper) | **Deflated** — paper-strain hypothesis (composite-anchor schema mutation; structured grouping-archetype + relational-rules) was carried cleanly by prose discipline under operational pressure |
| **Marketing / message-driven** | Structural shape proof on PKT-MSG-001 (cycle 1, `findings-only`); no full-flow generation/curation/governance | Cross-mode probe (paper) | **Not earned** — three paper-strain points (structured slot-message-elements; composite fidelity-anchor; `selection_axis` classification) remain operationally untested |
| **Brand campaign / editorial** | Structural shape proof at two depths: PKT-CAMP-001 cycle 1 rerun (in SKU base; review-board context functioned as load-bearing for bounded mini-family proof) plus Phase 1 base setup (separate Campaign-Driven D2C Home-Goods v1 base; 95-field schema mirror; Phase 2 paused per redirection) | Richest paper probe across the three non-SKU modes; surfaces composite-anchor as cross-mode synthesis finding | **Not earned, and pressing the foundational premise** — campaign-mode strain points (composite anchor; `products` peripherality; editorial voice; review-context as load-bearing) remain operationally untested; campaign-concept selection pressures the premise that curation is the singular runtime creative-discretionary act |

The cross-mode synthesis claims that follow are bounded by this evidence-depth distribution. The architecture is most confident where it is operationally grounded (SKU + collection) and least confident where it is paper-only (marketing strain points; campaign strain points; campaign premise pressure).

## Cross-Mode Layer Map

Across the four mode sketches, two layer categories emerge: **stable shared layers** that appear in every mode, and **mode-specific layers** that distinguish one mode from the others.

```text
                    SKU-driven    Collection      Marketing       Campaign
                    ----------    ----------      ---------       --------
brand-system        ▢             ▢               ▢              ▢
category/p-class    ▢             ▢               ▢              ▢
mode-specific       —             collection /    message /       campaign
                                  grouping        offer /         concept
                                                  communication
                                                                  +
                                                                  review-context /
                                                                  campaign-world
                                                                  coherence
packet              ●             ●               ●              ●
slot                ●             ●               ●              ●
candidate gen       ◐             ◐               ◐              ◐
curation seam       ●             ●               ●              ●
governed asset      ●             ●               ●              ●

Legend:
  ● strong carrier (schema-modeled, mode-independent in shape, mode-shaped in content)
  ◐ structural carrier with transient content (mode-shaped tooling questions)
  ▢ implicit / unmodeled across all four
  — no mode-specific carrier in this column
```

The map shows: brand-system and category / product-class are implicit across all four modes; the mode-specific layer is mode-bound (one per mode for B2/B3/B4; absent in B1; B4 has two); packet / slot / curation seam / governed asset are strong shared carriers across all four; candidate generation is the same transient pattern across all four.

## Stable Shared Layers

Five layers are structurally identical in shape across the four modes. What varies is the *content* they carry per mode.

### Packet layer

Strongest current carrier across all four modes. Same fields exercised in every operational and structural-proof packet (`business_intent`, `creative_intent`, `bounded_creative_discretion`, `required_output_set`, `products` relation, packet-level reference linkage). The over-load on aesthetic + intent + (mode-specific overlay) responsibility is real and sharpens mode-by-mode (collection adds grouping intent; marketing adds message-unit identity; campaign adds campaign-concept burden + voice burden). The over-load is held — splitting the packet into separate carriers is not earned by any operational pressure.

### Slot layer

Same `slot_role` enum + `slot_prompt` text + `slot_status` lifecycle + lookup-based reference surfacing across all four modes. Mode-specific differences are at the role taxonomy (HERO / PROFILE / DETAIL for SKU; HERO_GROUP / HERO_GROUP_ALT / DETAIL_ADJACENCY for collection; hero / tight / supporting + check-board / annotation-layer for marketing; campaign-arc role candidates for campaign) and at the load placed on slot_prompt prose (1:N enumeration in collection; message-bearing elements paper-pressed in marketing; campaign-concept-fit paper-pressed in campaign). The slot is mode-shaped, not mode-specific.

### Candidate generation layer

Transient attachments-on-slot pattern across all four modes. No first-class candidate entity earned in any mode. Mode-specific tooling-limitations vary (collection's bench-cropping under composite framing; SKU's May 3 warmth drift; arrangement-non-preservation across all modes that need it; marketing-mode and campaign-mode generation behavior fully untested). Generation invocation is human-side across all four modes per the documented tooling limitation.

### Curation seam

Same five-axis provenance + `curator` + `curation_pattern` carriers across all four modes. The five `curation_pattern` values observed in SKU + collection mode covered both modes' curation events; the marketing and campaign probes did not surface a need for new values. The mode-shaped axis is the *content* of judgment — fidelity in SKU; grouping-fit + lead-product-lighting tradeoff in collection; message-fit in marketing (paper); campaign-concept-fit + voice continuity + arc advancement in campaign (paper). The principle that `curation_pattern` is determined by judgment process not proposal cardinality (established in B1 Path A, confirmed in B2 curator override) holds across all four modes in principle. Operationally tested in two; paper-asserted in two.

### Governed asset layer

Same `asset_attachment` self-contained writeback + `governed_output_status` + provenance carriers across all four modes. The Path-B-shape full flow was demonstrated operationally in SKU mode and collection mode, structurally in marketing and campaign modes (without `asset_attachment` populated). Reuse / derivative governance held across all four modes; the sharpest case for it is campaign mode's campaign-arc continuity, but it remains paper-only.

## Mode-Specific Layers

Each non-SKU mode adds at least one layer between category / product-class and packet, carrying mode-distinguishing content. SKU-driven mode is the cleanest baseline because it has no such layer.

### Collection / grouping layer (B2)

Carriers: packet `products` relation at 1:N cardinality; grouping intent in `business_intent` / `creative_intent` text; relational rules (preserve adjacency; preserve grouped coherence) in `bounded_creative_discretion`; subset selection in slot prose; exclusion-by-name in slot prose. Paper-pressed for `grouping_archetype` + `relational_rules` first-class entities. **Deflated operationally** — prose discipline carried the load on PKT-COLL-001.

### Message / offer / communication layer (B3)

Carriers: message-unit identity at packet level; communication purpose in packet text; structured rule layer (CR-MSG-001 through CR-MSG-004); promotional asset family at variant-row level. Paper-pressed for `messages` / `briefs` first-class entity, structured slot-message-element fields, `selection_axis` enum. **Not deflated; operationally untested.** The collection-mode prose-discipline pattern *may* transfer; the cross-mode probe predicts it will. No operational evidence yet says.

### Campaign concept layer (B4)

Carriers: campaign-concept identity at packet level; brand-context constraint rule (CR-CAMP-001); directional reference (REF-CAMP-DIRECTION-001 — the first explicit directional reference across the four-mode evidence chain at structural-proof depth); paper-described campaign-arc role pattern. Paper-pressed for `campaign_concept` first-class field/entity, structured reference-type tag, abstract `asset_role` taxonomy. **Not deflated; operationally untested.** Sharper than collection's analogous strain because `products` becomes peripheral in campaign mode in a way no other mode's anchor does.

### Review-context / campaign-world coherence layer (B4)

Second mode-specific layer in campaign mode, supported by cycle 1 rerun evidence (`campaign-review-board-v1` and `campaign-annotation-layer-v1` functioned as load-bearing context for the bounded mini-family proof). Marketing mode's PKT-MSG-001 introduced an analogous review-context category (`message-check-board-v1`, `message-annotation-layer-v1`) but the cycle 1 findings characterized it as not-structurally-primary at marketing-mode evidence depth. Campaign mode's evidence supports treating review-context as load-bearing for the bounded scope tested — but generalization to full-flow operational depth is untested.

### What SKU-driven mode teaches by absence

SKU-driven mode has no mode-specific layer between category and packet. The SKU is the anchor; the packet relates 1:1 to the SKU; no overlay. This is the cleanest baseline against which the three non-SKU modes' overlays can be compared. **It is also the source of the architecture's strongest operational confidence** — and therefore the temptation to over-generalize from it. The SKU-mode pattern should not be mistaken for universal doctrine; the four-mode synthesis explicitly shows that three of four modes have an overlay layer SKU mode does not need.

## Carrier-Status Matrix

The matrix below organizes the architecture's content carriers by status across the four modes. Status categories: prose-carried now; structurally explicit now; structurally suggested but not earned; operationally deflated; operationally untested.

### Prose-carried now (across all four modes)

- mode-specific overlay content (grouping intent in collection; message-unit identity in marketing; campaign concept in campaign)
- substructure of intent (business vs creative ordering; their relationship)
- substructure of constraints (hard requirements vs bounded discretion vs exclusion vs reference-as-constraint)
- aesthetic specification at the packet (the over-load surface)
- cross-axis curation tradeoffs (carried in `capture_reason` / `capture_notes` text)
- relational rules (collection adjacency; campaign-arc continuity)
- voice register (across all modes; sharpest in campaign)
- exclusion-by-name (collection; potentially other modes)
- subject / peripheral role assignment within composite-subject slots

### Structurally explicit now (across all four modes)

- packet, slot, candidate, governed-asset entities
- `slot_role` enum
- `slot_status` lifecycle
- packet-level reference linkage (`approved_reference_keys`)
- per-product `product_image` attachment
- `products` relation (1:1 in SKU and marketing; 1:N in collection; 1:1-to-peripheral in campaign)
- five-axis curation provenance (`capture_reason`, `capture_notes`, `source_attachment_id`, `captured_at`, plus `curator` and `curation_pattern`)
- `asset_attachment` self-contained writeback
- `governed_output_status` and `governed_output_flag`
- lookup chain: products → packet → slot
- four-table seam-run shape (`ingest_validation`, `transformation_check`, `output_validation`, `release_readiness`)
- `review_gates` entity
- cross-base schema mirroring at structural depth (Phase 1 campaign D2C base)

### Structurally suggested but not earned (paper-pressed across modes; held)

- `messages` / `briefs` first-class entity (paper, marketing)
- `grouping_archetype` first-class field (paper, collection — operationally deflated; less earned, not more)
- `campaign_concept` first-class field or entity (paper, campaign)
- unified `composite_anchor` polymorphic entity (paper, cross-mode probe synthesis)
- structured slot-message-element fields (paper, marketing)
- `selection_axis` enum on `generated_assets` (paper, marketing + cross-mode)
- reference-type tag on `reference_assets` (voice / world / continuity / direction / product) (paper, campaign)
- structural review-context separation from primary deliverables (paper + structural-proof, campaign)
- `curation_events` first-class entity table (held across all modes)
- richer or more abstract `asset_role` taxonomy in non-SKU modes (paper, campaign)
- aspect-ratio-as-attribute on slots (paper, marketing + campaign)
- brand-system / mode-category / product-class aesthetic carriers (Named Limitation #1)
- inheritance / override precedence rule (Named Limitation #2)

### Operationally deflated (collection mode)

- prose enumeration of 1:N constituents in slot_prompt
- prose-named subject / peripheral roles
- exclusion-by-name in slot prose
- prose-only fidelity for constituents without `product_image` (incidental capability surfaced by PKT-COLL-001's three product_image-less constituents)
- cross-axis curation tradeoff carrying via `capture_reason` / `capture_notes` text (the curator override correction on PKT-COLL-001 demonstrated this for lead-product lighting vs family coherence vs framing cleanliness vs exclusion fidelity)
- single-base mode-independence (PKT-COLL-001 + PKT-SKU-007/009/010 in the same Furniture v1 base)

### Operationally untested

- marketing-mode three paper-strain points (slot-message-element structure; composite anchor; `selection_axis`)
- campaign-mode paper-strain points (composite anchor; `products` peripherality; editorial voice; review-context as load-bearing under generation pressure)
- campaign-mode curation premise pressure (campaign-concept selection vs singular runtime creative-discretionary act)
- cross-base operational claims (the Phase 1 campaign D2C Home-Goods base is structurally ready, content-empty; Phase 2 paused)
- cross-pollination of governed assets across modes (e.g., a campaign hero shot lifted as a marketing-mode brand-voice reference)
- brand-system carriers under operational pressure (Named Limitation #1)
- inheritance / override precedence (Named Limitation #2; agent interpretation handles conflicts where layers disagree, not yet operationally pressured)
- review-context as load-bearing at full-flow depth (campaign cycle 1 rerun showed it for bounded mini-family proof; full-flow generalization untested)
- arrangement-preservation across independent generations as a generation-tooling reality across all modes
- generation tuning to address mode-specific drifts (May 3 warmth in SKU; constituent cropping in collection; voice consistency in campaign — the latter two paper-described only)

## Cross-Mode Inheritance / Override Findings

What B1–B4 collectively teach about how content flows across layers:

**Implicit-additive accumulation (Model A) holds where operationally tested.** The apex aesthetic-layering pass introduced two candidate inheritance models: Model A (implicit-additive, conflicts resolved by agent interpretation, no formal precedence) and Model B (layered precedence with explicit override). SKU-driven mode and collection mode operationally exercise Model A — each layer's content is supplied as input, and conflicts are resolved by the agent's interpretation. Marketing and campaign modes are paper-asserted to behave the same way, but operational pressure where layers genuinely disagree has not been applied in any mode. Named Limitation #2 remains.

**No formal precedence rule earned across any mode.** Where layers carry overlapping or conflicting content (packet-level voice direction vs slot-level voice instruction; packet-level reference vs slot-level reference; packet-level constraint vs slot-level exclusion), the architecture delegates resolution to agent interpretation. Whether this scales beyond the same-base same-category operational evidence available is unknown. The four-mode synthesis sharpens the unknown but does not resolve it.

**Cross-packet inheritance is operator-mediated, not structural.** REF-002 reuse across PKT-SKU-009, PKT-SKU-010, PKT-COLL-001, and the campaign-mode operational test was a deliberate operator decision to isolate variables. The architecture treats reference assets as independently linkable; multi-packet linkage is a one-sided link addition, not an inheritance chain. Operator practice carries cross-packet content reuse; the architecture does not enforce or model it.

**Cross-base inheritance is structural at schema-mirror depth, content-empty operationally.** The Phase 1 campaign base demonstrates that schema can be mirrored across bases with 11-point validation passing. Whether content can be operationally migrated, derived, or referenced across bases is untested — Phase 2 paused before the question arose.

**Slot does not currently override packet content; it adds and narrows.** Across all four modes, slot content adds role-specific framing (mode-shaped role names) and narrows packet bounds with role-specific specificity. No operational case where slot content actively suppressed or replaced packet content has been exercised. This is the cleanest read of Model A in current evidence.

**Curation does not author upstream content — *if the premise holds*.** This is the foundational stance. Campaign-mode pressure on the premise (campaign-concept selection happening upstream of generation as the dominant creative act) is the open architectural concern that the inheritance / override discussion meets. If the premise refines or fragments under operational pressure, the inheritance model has to absorb that.

## Curation and Creative-Discretion Findings Across Modes

What B1–B4 collectively teach about the curation seam and creative discretion:

**Curation pattern is determined by judgment process, not proposal cardinality.** Established in B1 Path A (PKT-SKU-009 cross-round authorship-bearing curation despite single-candidate-per-slot structure was already articulated in the prior agentic test correction); confirmed in B2 by the curator override correction on PKT-COLL-001 (executor's `agent-proposed-human-ratified` framing corrected to `human-cross-round-authorship-bearing-curation` based on the curator's actual judgment process across the full candidate space). Paper-asserted in B3 and B4. The principle is mode-independent in form; content of judgment is mode-shaped.

**Five `curation_pattern` values cover both operationally-tested modes.** No new value was earned by collection-mode operational pressure beyond what SKU mode established. Marketing and campaign probes did not surface a need for new values. The value space remains: `algorithmic-curation`, `agent-proposed-human-ratified`, `batch-output-no-curator-selection`, `agent-vision-proposed-human-ratified`, `human-cross-round-authorship-bearing-curation`. Whether marketing or campaign operationalization will surface new patterns is open.

**Implementation-vs-conceptual goal distinction is fully cross-mode.** Established in B1 Path A; confirmed operationally in B2 (the executor-vs-curator weighting tradeoff on PKT-COLL-001 was an implementation-vs-conceptual divergence carried through curation); paper-asserted in B3 and B4. Sharpest in campaign mode per the probe (modern generation can produce technically-plausible imagery for any of five touchpoints; voice + arc + continuity + latitude-use across distinct moments is a multi-axis judgment). The distinction is structural to creative production, not mode-specific in form, but most pronounced in campaign mode in scope.

**The premise that curation is the singular runtime creative-discretionary act is foundational, and campaign mode pressures it.** SKU and collection modes operationally exercise the premise without strain. Marketing mode is paper-consistent with the premise. Campaign-mode operationalization will test it: campaign-concept selection happens upstream of generation but is the dominant creative act in campaign mode. Three operational outcomes possible (per B4):

1. **Premise holds.** Campaign-concept selection is upstream setup; curation remains the singular runtime creative-discretionary act. Collection-mode-style deflation pattern.
2. **Premise refines.** Campaign-concept selection is itself a runtime creative-discretionary act in a different shape — perhaps a "concept seam" before generation alongside the curation seam.
3. **Premise fragments.** The singular runtime creative-discretionary act fragments into multiple distinct discretionary acts at different layers (concept selection; generation steering; candidate curation).

This synthesis does not resolve the question. It surfaces it as the load-bearing architectural concern that future operational work must test. The three operational outcomes shape what milestone-8 may need to absorb when campaign-mode operational evidence accumulates.

## Composite-Anchor Finding After B1–B4

The cross-mode probe series identified Layer 2's composite fidelity-anchor as the most-consistent strain across the three non-SKU modes — paper-pressed in three different mode-specific shapes (`messages` for marketing; `grouping_archetype` for collection; `campaign_concept` for campaign). The four-mode synthesis after B1–B4 sharpens this finding into three observations:

**The collection version was operationally deflated.** PKT-COLL-001 carried 1:N constituent enumeration, subject / peripheral role assignment, and exclusion-by-name through slot_prompt prose. The curator override exercised cross-axis tradeoff judgment through `capture_reason` / `capture_notes` text. Schema mutation that would have introduced `grouping_archetype` + `relational_rules` first-class carriers is *less* earned by operational pressure than it was after the paper probe.

**The marketing version is operationally untested but structurally consistent with the deflated pattern.** PKT-MSG-001 cycle 1's structural shape proof carried the bounded promotional packet without schema or configuration change. The paper-pressed mutations (`messages` / `briefs`; structured slot-message-elements; `selection_axis`) remain held. The collection-mode prose-discipline pattern *may* transfer.

**The campaign version is operationally untested AND structurally sharper than the other two.** PKT-CAMP-001 cycle 1 rerun's structural shape proof carried the bounded mini-family without schema or configuration change. But two campaign-specific structural features sharpen the strain: (a) `products` becomes peripheral, genuinely loosening the slot–product structural relationship in a way collection mode's 1:N linkage does not; (b) the curation premise pressure (campaign-concept selection upstream of generation as the dominant creative act). The collection-mode prose-discipline deflation pattern may transfer; may partially transfer; may not transfer.

**The unified `composite_anchor` polymorphic entity question is not earned.** The cross-mode probe synthesis surfaced the possibility of a single polymorphic entity carrying Layer 2's composite anchor across modes. After B1–B4, with collection deflated and marketing + campaign held, no operational pressure forces the unified entity. Whether to treat composite-anchor representation as one polymorphic entity, three mode-specific entities, or three structured packet-level fields remains a schema-design decision that current pressure does not force.

The composite-anchor finding is the strongest candidate place where structural carriers may eventually be earned — but only by operational pressure, mode-by-mode. Collection mode said no (after paper said maybe). Marketing and campaign have not yet said.

## What Should Remain Held

The synthesis is explicit about what is *not* earned by Phase 1 evidence and should not be promoted to schema doctrine yet:

- **All apex Named Limitations** (specific aesthetic-carrier schema; inheritance / override precedence; cross-base / marketing / campaign operational evidence). The four-mode synthesis does not resolve any of them. Marketing and campaign operationalization would address Named Limitation #3 if it resumed; brand-system aesthetic carriers (Named Limitation #1) and inheritance / override precedence (Named Limitation #2) are not resolved by any Phase 1 evidence.
- **The curation premise pressure question.** Surfaced explicitly in B4 and the cross-mode synthesis. Three operational outcomes named; none resolved. Future campaign-mode operational testing is the test.
- **All paper-pressed not-yet-earned mutations.** The carrier-status matrix's "structurally suggested but not earned" row covers them. Each remains a candidate for operational pressure to settle.
- **The composite-anchor question (mode-specific or unified).** Held across all three non-SKU modes per the section above. Collection's deflation is mode-bound, not generalizable.
- **Brand discovery / digestion architecture (Phase 2).** The redirection note's next phase. Held until Phase 1 outputs are absorbed and the IA-content articulation gives Phase 2 enough material to draw on.
- **Architecture.md rewrite.** Held until milestone-8 absorbs the redirection + Phase 1 outputs + collection operational deflation evidence.
- **Milestone-8 synthesis.** Held until Phase 1 (this synthesis) closes and Phase 2 produces sufficient material.
- **Grounding-note v52.** The redirection note's durable layer was absorbed into v51; further sharpening (including potentially folding in the systemic voice discipline principle held in operator memory) is held for a separate later move.
- **Phase 3 four-workflow Airtable demonstration.** Per the redirection's three-phase plan, Phase 3 (the Airtable demonstration of the IA model in operation across all four modes) is held until the IA model itself is articulated and pressured. Phase 1 closes one half of that articulation; Phase 2 brand discovery / digestion architecture closes the other.

## What This Synthesis Prepares for Next

Three downstream surfaces will absorb this synthesis at different evidence horizons:

### Milestone-8 synthesis (when written)

Milestone-8 will absorb:

- the IA layered-content redirection note (which paused Airtable mutation in favor of Phase 1)
- the four mode sketches (B1–B4)
- this cross-mode synthesis (B5)
- the operational deflation evidence from PKT-COLL-001 (collection mode's paper-strain deflated)
- the campaign-mode Phase 2 paused-not-abandoned posture
- whatever Phase 2 brand discovery / digestion architecture produces
- the curation premise pressure question, with whatever operational evidence has accumulated by then

Milestone-8's job is to mark the plateau. The synthesis is the input; the milestone synthesis is the artifact-level reading of where the architecture sits at that moment.

### Architecture.md rewrite (when authorized)

The eventual rewrite of `docs/architecture.md` will consolidate:

- the apex definition-layer artifact and its three named limitations
- the four mode sketches' per-mode IA content articulations
- this cross-mode synthesis's stable-vs-mode-specific layer map
- the carrier-status matrix's distinction between earned, paper-pressed, and held carriers
- the inheritance / override findings (still implicit-additive Model A; precedence rule unearned)
- the curation seam findings (mode-shaped content of judgment; mode-independent mechanism; premise pressure flagged)
- the composite-anchor finding (mode-specific shapes; one operationally deflated; two operationally held)
- the brand discovery / digestion architecture once Phase 2 produces it

The rewrite is held until the inputs accumulate enough to make consolidation productive. Phase 1's outputs are necessary but not sufficient; Phase 2 outputs are needed to close the architecture's intake-side articulation.

### Phase 2 brand discovery / digestion architecture (next active surface)

Phase 2 — the architectural entry surface where brand-system input enters the layered IA before any tool implementation begins — is the next active Phase 1-adjacent direction per the redirection note. Phase 1 articulates *what content lives at each layer in each mode*. Phase 2 articulates *how an existing brand system's content gets resolved into that layered IA*.

What this synthesis prepares for Phase 2:

- **The brand-system layer is currently unmodeled across all four modes.** Phase 2 articulates the intake architecture that would populate it (without yet operationalizing the population).
- **The category / product-class layer is implicit across all four modes.** Phase 2 articulates how brand-system intake decides category/product-class shape.
- **The mode-specific layer (collection-grouping; message-offer-communication; campaign-concept; review-context) is mode-bound.** Phase 2 articulates how a brand system's content selects mode shapes for its packets.
- **The packet over-load is real and sharpens by mode.** Phase 2 articulates how brand-system intake feeds packet-level aesthetic + intent + (mode-specific overlay) responsibility without further over-loading the packet.
- **Editorial voice is the sharpest brand-system property surfaced by Phase 1.** Phase 2 articulates how voice is captured at intake.

Phase 2 work has not been authorized in this synthesis. The synthesis flags the surfaces Phase 2 will need to address; the articulation belongs to Phase 2 itself.

## Self-Superseding Clause

This synthesis is a Phase 1 artifact. It should be superseded by:

- whatever later milestone-8 synthesis absorbs Phase 1 + Phase 2 outputs alongside the redirection
- the eventual `docs/architecture.md` rewrite that consolidates the apex artifact, the four mode sketches, and this synthesis into a single current-architecture document
- any operational evidence that earns or refutes one of the held strain points (marketing operationalization; campaign Phase 2 unpause; any future Phase 3 four-workflow Airtable demonstration)
- any future revision of the curation premise that operational testing pressures (premise holds / refines / fragments outcomes from B4)

It does not supersede the apex definition-layer artifact, the three predecessor architectural passes, the four mode sketches, the cross-mode probes, the collection-mode operational test findings, or the campaign-mode cycle 1 rerun + Phase 1 base setup artifacts. Those remain authoritative for their subject matter; this synthesis reads them at cross-mode comparison depth and articulates what the comparison teaches.

Phase 1 of the redirection closes with this artifact. Phase 2 — brand discovery / digestion architecture — is the next direction.

## Anchor Documents

### Phase 1 sketch series (the four sketches this synthesis compares)

- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md) (B1)
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md) (B2)
- [`docs/ia-layered-content-sketch-marketing-mode-v1.md`](ia-layered-content-sketch-marketing-mode-v1.md) (B3)
- [`docs/ia-layered-content-sketch-campaign-mode-v1.md`](ia-layered-content-sketch-campaign-mode-v1.md) (B4)

### Phase 1 framing

- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): the redirection note that defined Phase 1 and surfaces this synthesis as the Phase 1 closing artifact

### Apex and architectural-pass predecessors

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact at SKU + same-category-collection scope; three Named Limitations the synthesis carries forward
- [`docs/architecture-bounded-modeling-pass-v1.md`](architecture-bounded-modeling-pass-v1.md): three-layer-vs-layered-operational reconciliation; matrix
- [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md): vocabulary precision
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic layer-shape sketch; Model A vs Model B inheritance models
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): on-paper four-mode pressure-test that the four mode sketches concretize
- [`docs/four-mode-truth-and-constraint-pressure-note.md`](four-mode-truth-and-constraint-pressure-note.md): four-mode comparison across single-item truth, relational truth, message-bearing discipline, and campaign coherence

### Operational evidence the synthesis reads against

- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): SKU-driven Path A; implementation-vs-conceptual goal distinction; cross-round authorship-bearing curation
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): SKU-driven Path B; `asset_attachment` thin-bridge resolution
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): collection-mode operational deflation evidence; curator override correction
- [`docs/airtable-marketing-message-driven-cycle-1-findings-v1.md`](airtable-marketing-message-driven-cycle-1-findings-v1.md): marketing-mode structural shape proof
- [`docs/airtable-campaign-editorial-cycle-1-rerun-findings-v1.md`](airtable-campaign-editorial-cycle-1-rerun-findings-v1.md): campaign-mode structural shape proof; review-board context as load-bearing for bounded mini-family
- [`docs/campaign-mode-base-setup-phase-1-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-1-structured-change-summary-v1.md): cross-base schema mirroring at structural depth

### Plateau marker

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the operational plateau this synthesis reads against; Phase 1 of the redirection is the first move past it
