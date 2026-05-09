# IA Layered-Content Sketch // Marketing / Message-Driven Mode v1

## Posture

```text
on-paper IA content articulation
marketing / message-driven mode only
third of four mode sketches
not a final IA model
not an architecture rewrite
not a milestone
not an Airtable / schema / prototype task
self-superseding once the four mode sketches and cross-mode synthesis land
```

Per [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md), Phase 1 of the redirection is on-paper IA layered-content work across the four worked-example modes. This sketch is the third such sketch, on the marketing / message-driven mode at the evidence depth currently available — which is materially thinner than the depth available for SKU-driven mode and collection / merchandising mode.

The sketch does not re-derive the apex layer-shape; that lives in [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md). It populates the apex layer-shape with mode-specific content articulation, anchored against the available evidence and contrasted against the SKU-driven mode sketch ([`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md)) and the collection-mode sketch ([`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md)).

## Evidence-Depth Posture

This sketch reads against three distinct evidence sources at three different depths. Holding the distinction between them is load-bearing for the sketch's claims.

| Mode | Evidence depth available |
|---|---|
| **SKU-driven** | Operationally grounded end-to-end across PKT-SKU-007 / PKT-SKU-009 / PKT-SKU-010 — full generation → curation (five-axis provenance + curator + curation_pattern) → governed assets with `asset_attachment` self-contained writeback. |
| **Collection / merchandising** | Operationally grounded end-to-end on PKT-COLL-001 — full generation → curation (with curator override correction) → governed assets with `asset_attachment`. Paper-strain hypothesis (slot-input plurality / composite-anchor schema mutation) was operationally **deflated**: prose discipline carried the strain cleanly. |
| **Marketing / message-driven** | **Operationally weaker.** Two evidence sources: a paper probe that pressure-tested the schema against a concrete apparel scenario without running generation; and a bounded Airtable cycle 1 (PKT-MSG-001) that proved the schema's structural shape carries one bounded promotional packet at first-pass depth without schema or configuration change. **Neither source exercises full generation → curation → governance with five-axis provenance + `asset_attachment`.** The cross-mode probe's three strain points (structured slot-message-elements; composite fidelity-anchor representation; selection-axis classification) remain operationally untested. |

The right read of B3 is: the marketing-mode IA content can be sketched from paper-content anchor plus structural shape proof, but operational deflation of any strain point has *not* been earned. Therefore the message / composite-anchor questions stay held more strongly here than they do in the collection-mode sketch.

## What This Sketch Does Not Do

- propose schema mutations
- resolve any of the apex Named Limitations (specific aesthetic-carrier schema; inheritance / override precedence; cross-base / marketing / campaign evidence)
- re-derive the layer-shape from the apex artifact
- attempt cross-mode synthesis (deferred to the eventual cross-mode synthesis sketch)
- cover campaign mode (deferred to the remaining mode sketch)
- operationalize marketing mode or stand up a Phase-2 test
- reopen marketing-mode proof work
- claim that any marketing-mode paper-probe strain has been deflated by operational pressure
- close any open question; questions are surfaced for later cross-mode comparison

## Vertical Slice — PKT-MSG-001 (Structural Proof) + Cross-Mode Probe (Paper-Content Anchor)

The slice draws on two complementary anchors at different evidence depths:

- **PKT-MSG-001** — bounded marketing / message-driven Airtable Cycle-1-equivalent proof inside the existing SKU-driven Furniture v1 base. Anchor product `SKU-CHAIR-002`, message unit "Quiet Weekend Seating Event," 4 constraint rules (CR-MSG-001 through CR-MSG-004), 4 seam runs (ingest_validation / transformation_check / output_validation / release_readiness), 5 generated-asset rows (hero offer + tight variant + supporting variant + message-check-board + message-annotation-layer), 1 review gate (GATE-MSG-001), final packet status `release_ready`. **Structural shape carried; no schema or configuration change required at first-pass depth. Not a Phase-2-equivalent operational generation/curation/governance run.** ([`airtable-marketing-message-driven-cycle-1-findings-v1.md`](airtable-marketing-message-driven-cycle-1-findings-v1.md), [`airtable-marketing-message-driven-proof-plan-v1.md`](airtable-marketing-message-driven-proof-plan-v1.md))
- **Cross-mode probe** — paper-only pressure test of the SKU-driven schema against an apparel-archetype Spring 2026 messaging campaign with three touchpoints (HERO_EMAIL 1500×600 / POST_SOCIAL 1080×1080 / BANNER_WEB 1920×800), each carrying the same brand value (material honesty + design restraint) at different aspect ratios, attention durations, and message specificities. **Paper-only; no Airtable mutation, no generation, no curation events recorded.** Three strain points anticipated; all three remain operationally untested. ([`cross-mode-probe-marketing-message-driven-v1.md`](cross-mode-probe-marketing-message-driven-v1.md))

The slice is walked layer-by-layer below. Where evidence depth varies across layers, the depth available is named explicitly. Where the cross-mode probe proposes content the cycle did not operationally test, that gap is named. Where collection mode's deflation pattern would tempt analogous claims for marketing mode, the temptation is resisted — the deflation has not been earned.

### Brand-System Layer

**Slice content.** No first-class carrier in either evidence source. The brand-system context is implicit in the worked-example naming convention (PKT-MSG-001 inherits the Furniture v1 base context; the probe pivots to an apparel everyday-essentials archetype on paper) and in the externally supplied prototype-aesthetic scaffolding; it is not represented as a first-class repo / prototype carrier.

**Explicit.** Nothing.

**Implicit / unmodeled.** Same posture as the SKU-driven and collection-mode slices. Marketing mode introduces a sharper version of the brand-system question: the probe's brand-value-fit family-coherence pressure ("does this set carry material honesty + design restraint coherently?") implicates brand-system content directly, since brand value is what the marketing asset family is designed to carry. PKT-MSG-001's structural proof did not exercise this pressure operationally.

**Not-yet-doctrine.** Same Named Limitation #1. Marketing mode's brand-value-fit pressure is a *paper* candidate for sharper brand-system carriers, not an operational candidate.

**Inheritance behavior.** Currently nil. The deliberate reuse of the Furniture v1 base for PKT-MSG-001 (rather than a new apparel base for the probe scenario) keeps mode variable isolated from category and brand variables at the structural-proof level — the probe's apparel claim is paper-only.

### Category / Product-Class Layer

**Slice content.** PKT-MSG-001 sits in the furniture category, anchored on SKU-CHAIR-002 (placeholder walnut dining chair). The probe scenario is paper-pivoted to apparel/footwear (everyday flats), demonstrating that the schema is category-agnostic on paper. **Operationally, marketing mode is still only tested in furniture.**

**Explicit.** Nothing first-class. Category is signaled per-SKU and via worked-example naming.

**Implicit / unmodeled.** Same as the SKU-driven and collection-mode slices. Marketing mode introduces no novel category-layer pressure beyond what the prior modes already carry.

**Not-yet-doctrine.** Cross-category claims for marketing mode are paper-supported (probe), not operationally supported. The probe's finding ("category-agnostic confirmation") is a paper claim; the cycle 1 evidence remains in furniture.

**Inheritance behavior.** Implicit, same as prior slices.

### Message / Offer / Communication Layer

This layer is the **load-bearing distinguishing layer for marketing / message-driven mode** — the analog of collection mode's collection / grouping layer, but with operationally weaker carriers.

**Slice content.** Across the two anchors:

PKT-MSG-001 carries the message-layer content as packet attributes and constraint rules:

- message unit identity ("Quiet Weekend Seating Event") — carried as a packet-level concept, not a first-class entity
- communication purpose / message-bearing signal continuity — carried as packet text fields
- 4 constraint rules (CR-MSG-001 through CR-MSG-004) carrying message-layer rule content — content of those rules is not operationally exercised at generation/curation depth
- 5 governed-asset rows representing the bounded promotional asset family: one hero offer + two variants (tight, supporting) + two review-context artifacts (check-board, annotation-layer)

The cross-mode probe proposes message-layer content in finer detail (paper only):

- message-bearing elements at the slot level (offer text, brand identifier presence, callout emphasis, copy-overlay region)
- composite Layer 2 fidelity anchor: **subject + message archetype**
- per-touchpoint message specificity (different copy at different touchpoints — "introducing the spring colorways" / "the everyday flat that earns its place" / "designed once, made to last")
- per-touchpoint structural variation (aspect ratio, attention duration, message specificity carried as separate axes)

**Explicit.** PKT-MSG-001 makes message-unit identity, communication purpose, and rule-layer content explicit at the packet level, with placeholder governed-asset rows representing the variant set. No first-class `messages` or `briefs` entity; no structured slot-message-element fields.

**Implicit / unmodeled.** The substructure of the message itself (offer text vs callout vs brand identifier vs copy-overlay region) is structurally absent. The composite-anchor structure (subject + message archetype) is carried by packet text + slot prose; not as a first-class composite carrier. The relationship between the message and the anchor product (SKU-CHAIR-002 in PKT-MSG-001; SKU/colorway in the probe) is implicit in the packet's `business_intent` / `creative_intent` / rule-layer text.

**Not-yet-doctrine.** This is where marketing mode's paper-probe strain accumulates. The probe surfaced three candidate mutations:

1. a `messages` or `briefs` first-class entity attached to packets alongside `products`
2. structured slot-message-element fields (offer text, brand identifier presence, callout emphasis, copy-overlay region) replacing freeform `slot_prompt` text
3. a `selection_axis` enum on `generated_assets` to classify the curation event by judgment dimension (fidelity vs message-fit vs grouping-fit)

**All three remain operationally untested.** The cycle 1 structural proof did not exercise generation against message-bearing elements; did not exercise curation against message-fit; did not exercise the cross-touchpoint family-coherence verification that the probe described as the load-bearing mechanism.

**This is the key methodological asymmetry vs the collection-mode sketch.** Collection mode had analogous paper-probe strain (composite-anchor schema mutation) that the operational test on PKT-COLL-001 *deflated* — prose discipline carried the strain cleanly under real generation/curation/governance pressure. Marketing mode has *not* earned that deflation. The strain points stay held more strongly here. They may deflate similarly when operationally tested; they may not. The repo evidence does not yet say.

**Inheritance behavior.** The message layer's content sets the bounds within which packet, slot, and curation content narrows — paper-only at the probe, structurally-carried-but-not-operationally-exercised at PKT-MSG-001. Whether the inheritance can be carried via packet text + slot prose under operational pressure (the collection-mode pattern) or whether it requires structured carriers (the probe's mutation candidates) is the open operational question.

### Packet Layer

**Slice content.** PKT-MSG-001 carries the packet shape mostly mirroring the SKU-driven and collection-mode pattern:

- anchor product link (singular: SKU-CHAIR-002), unlike collection mode's 1:N constituent linkage
- 4 constraint rules linked at the rule-layer
- 4 seam runs (ingest_validation / transformation_check / output_validation / release_readiness)
- 5 governed-asset rows
- 1 review gate (GATE-MSG-001)
- final status `release_ready`

The cross-mode probe describes a parallel packet shape with mode-specific content: a Spring 2026 campaign packet carrying brand value, three touchpoints as slots, references including brand visual rules + prior on-message work + the SKU shown.

**Explicit.** Same packet fields as the prior modes — `business_intent`, `creative_intent`, `bounded_creative_discretion`, `required_output_set`, `products` relation (singular here), packet-level reference linkage. PKT-MSG-001 populated these structurally; no operational generation pass exercised them.

**Implicit / unmodeled.** Same packet over-load on aesthetic + message responsibility (per the apex; sharpened by the probe). The packet here also carries communication purpose at the packet level, which is the cross-touchpoint brand-value carrier — analogous to collection mode's grouping intent at packet level, but with message-bearing content rather than relational-grouping content.

**Not-yet-doctrine.** The packet over-load is sharper in marketing mode than in SKU-driven mode (because it adds message-bearing responsibility on top of aesthetic and intent), and possibly sharper than in collection mode (because messages are more specific and time-bounded than grouping intent). Whether this sharpness becomes operational pressure for splitting packet aesthetic vs message vs intent into separate carriers is **untested**. Held.

**Inheritance behavior.** Same general posture as prior slices. The mode-specific addition: message-unit identity at the packet level needs to flow into every slot's content for cross-slot message persistence. PKT-MSG-001's structural proof shows the linkage shape carries; whether the prose-discipline pattern (verbatim message content per slot) holds operationally for marketing as it did for collection-mode prose-only constituents is untested.

### Slot Layer

**Slice content.** Marketing-mode slots carry mode-specific role content:

PKT-MSG-001 has 5 generated-asset rows that function as the slot-output set rather than as `output_slots` rows in the SKU/collection-mode shape:

- `message_hero_offer_v1` — hero variant (parallel to HERO in SKU mode)
- `message_tight_variant_v1` — tight promotional variant
- `message_supporting_variant_v1` — supporting promotional variant
- `message-check-board-v1` — useful review context (the review-shaped artifact)
- `message-annotation-layer-v1` — useful review context (annotation overlay for message-legibility judgment)

The cross-mode probe describes slot-level content for the apparel scenario:

- aspect-ratio specification per touchpoint
- message-bearing elements (offer text, brand identifier presence, callout emphasis, copy-overlay region)
- references including brand visual rules + SKU/colorway shown + optionally lifestyle / natural-light references

**Explicit.** PKT-MSG-001's structural proof made variant identity (hero / tight / supporting) and review-context identity (check-board / annotation-layer) explicit at the row level. Per the cycle 1 findings, no `output_slots` rows of the SKU/collection-mode shape were used; no `slot_prompt` content was operationally exercised. The probe describes structured message-element fields conceptually but introduces no schema.

**Implicit / unmodeled.** The substructure of the slot's message-bearing content (which message element goes where; what the copy-overlay region looks like; what the callout emphasis means) is implicit. The aspect-ratio specification is implicit in role naming (hero / tight / supporting) without a structural aspect-ratio field. Cross-slot message persistence (the marketing-mode analog of collection-mode cross-slot constituent consistency) is implicit in the operator's authoring of variant content; not structurally enforced.

**Not-yet-doctrine.** The probe's first strain point — structured slot-message-element fields replacing freeform `slot_prompt` text — remains held. Cycle 1 carried the burden via packet-level structure plus row-level variant identity, *without* operationally exercising slot_prompt-level message authoring. Whether the marketing-mode analog of collection-mode prose discipline (verbatim message content across slots) holds operationally is *untested*. The strain stays held more strongly than collection-mode strain because the operational exercise has not happened.

The aspect-ratio-as-structural-attribute question (carry aspect ratio explicitly on the slot rather than implicit in role name) is a paper-only candidate. The cycle did not pressure it. Held.

**Inheritance behavior.** Slot content narrows packet bounds with role-specific (variant-specific) framing and message-specific narrowing. The slot's prose, when it exists, would carry the message-bearing-element content the probe describes — but PKT-MSG-001 did not operationally exercise this. The pattern is structurally sketched, operationally untested.

### Candidate Generation Layer

**Slice content.** **Not operationally exercised at marketing-mode evidence depth.**

PKT-MSG-001's cycle 1 was a structural carrying-test. No generation pass was invoked. The 5 generated-asset rows are placeholder rows analogous to the 3 historical placeholder rows on PKT-COLL-001 from 2026-04-22 — created without curation events, without source attachments, without `asset_attachment` populated.

The cross-mode probe describes a hypothetical 5-candidates-per-touchpoint generation set in qualitative prose. No actual generation was run.

**Explicit.** Nothing operationally exercised.

**Implicit / unmodeled.** Same as prior slices structurally. Mode-specific generation-tooling questions (whether text-to-image generation reliably honors message-bearing-element specifications; whether aspect-ratio variation across touchpoints introduces generation drift; whether brand-value-fit can be steered through prompting) are *all paper-only*. The collection-mode-style operational findings (constituent cropping under composite framing; arrangement-non-preservation across independent generations) have no marketing-mode analog yet because the generation has not been run.

**Not-yet-doctrine.** Same as prior slices — no first-class candidate entity is earned. The marketing-mode candidate layer surfaces no novel doctrine question at this evidence depth.

**Inheritance behavior.** Same as prior slices structurally; not operationally exercised.

### Curation Seam

**Slice content.** **Not operationally exercised at marketing-mode evidence depth.**

PKT-MSG-001's 5 generated-asset rows do not carry five-axis curation provenance (`capture_reason`, `capture_notes`, `source_attachment_id`, `captured_at`, `curator`, `curation_pattern`). No `asset_attachment` is populated. The cycle's structural proof confirmed that the schema accommodates the row shape; it did not exercise curation.

The cross-mode probe describes hypothetical curation events qualitatively for each touchpoint. Curation is described as primarily judging message-fit ("carries material visibility and natural-light reading at full size"; "holds the message at square aspect with attention-budget appropriate for social scroll"; "the visual carries the message even when read with the headline and CTA copy laid over") rather than fidelity (SKU mode) or grouping-fit (collection mode).

**Explicit.** Nothing operationally exercised. The cycle 1 evidence does not include any populated five-axis provenance for marketing-mode rows.

**Implicit / unmodeled.** The probe's third strain point — `selection_axis` enum classifying the curation event by judgment dimension (fidelity vs message-fit vs grouping-fit) — is paper-only. Whether `capture_reason` / `capture_notes` text carriers handle marketing-mode cross-axis tradeoffs operationally (the collection-mode pattern) is **untested**. The probe predicts they will; the cycle did not test it.

The probe also surfaces the question of whether marketing-mode curation introduces a different cross-axis tradeoff structure than product-fit (SKU mode) or grouping-fit (collection mode). Candidate axes the probe describes:

- message-fit (does this carry the brand value coherently?)
- product credibility (is the SKU still credibly present in the asset?)
- aspect-ratio fit (does the composition work at this touchpoint's dimensions?)
- attention-budget fit (does it read at the touchpoint's expected attention duration?)
- copy-overlay tolerance (does the visual carry the message even with copy laid over?)

These are richer than the collection-mode tradeoffs (lead-product lighting / family coherence / framing cleanliness / exclusion fidelity) but **all paper-only**. Operational pressure may winnow this set; may add to it; may show that the collection-mode-style text-field carriers handle them. Untested.

**Not-yet-doctrine.** All three of the probe's strain points (structured slot-message-elements; composite fidelity-anchor representation; selection-axis classification) **remain held more strongly than collection mode's analogous strain**, because no operational deflation has been earned. They may yet earn schema mutation when operationally pressured; they may not.

**Inheritance behavior.** Curation does not author upstream content (mode-agnostic principle, carried from SKU-driven and collection slices). The mode-specific question is whether marketing-mode curation introduces upstream-pressure feedback — e.g., whether a message-fit failure at curation pressures message authoring at the packet/slot level differently than collection-mode coherence failures pressure prose discipline. This is operationally untested.

### Governed Asset Layer

**Slice content.** **Not operationally exercised at full-flow evidence depth.** PKT-MSG-001's 5 governed-asset rows passed `release_ready` status without carrying `asset_attachment`, without populated five-axis provenance, without exercising the Path-B-shape full flow that PKT-SKU-010 and PKT-COLL-001 demonstrated for their respective modes.

This is the same artifact-state pattern as PKT-COLL-001's 3 historical placeholder rows from 2026-04-22 (pre-curation-event-schema thin-bridge state) — structural row identity without governed-capture-event content.

**Explicit.** Row identity (5 rows mapped to bounded promotional packet's variant set + review-context artifacts), packet linkage, gate-passage status. The structural-shape carrying-test passed.

**Implicit / unmodeled.** The full governed-asset model (`asset_attachment` self-contained writeback; five-axis provenance; `curator` field; `curation_pattern` value; cross-axis tradeoff carrying via `capture_reason` / `capture_notes` text) is **structurally available** but **not operationally exercised** at marketing-mode evidence depth.

The "useful review context" content category (PKT-MSG-001's `message-check-board-v1` and `message-annotation-layer-v1`) is novel relative to SKU and collection modes, where review-context artifacts have not been first-class outputs at this granularity. The cycle 1 findings frame this as "useful and appropriate, but not structurally primary" — distinct from the campaign-style "load-bearing review context" that B4 will likely articulate. This category may need its own structural treatment in future operationalization, or may stay as packet-level content; **untested**.

**Not-yet-doctrine.** Whether marketing-mode governed assets need any structural feature beyond what the SKU-driven and collection-mode rows already carry is held. The cycle 1 evidence shows the row shape carries the burden structurally at first-pass depth; full-flow operational pressure has not been applied. Held.

**Inheritance behavior.** Governed assets are downstream-terminal at first-pass depth (cycle 1) — the slice does not exercise cross-packet reuse of marketing-mode governed assets. Whether marketing-mode governed assets become inputs to downstream packets (e.g., a campaign-mode packet lifting a marketing hero offer as reference content) is unprobed.

## Marketing / Message-Driven Mode Characteristics That Emerge from the Slice

Walking the slice surfaces several characteristics, keyed to evidence depth (structural / paper / untested):

**Anchor-product cardinality is 1:1 (structural).** PKT-MSG-001 links one anchor SKU; the probe's apparel scenario implies a singular SKU per touchpoint (with colorway variation). Marketing mode appears to mirror SKU-driven mode's 1:1 cardinality at the anchor-product layer, distinct from collection mode's 1:N. Whether multi-SKU marketing variants (e.g., a campaign covering several products) operationally pressure this is untested.

**Message-unit identity at the packet level (structural).** PKT-MSG-001 carries a named message unit ("Quiet Weekend Seating Event"); the probe carries a campaign brand value. The packet is the carrier; no first-class `messages` entity. Untested whether operational message-unit reuse across packets (the same message archetype carried across multiple campaigns) pressures structural promotion.

**Bounded promotional asset family (structural).** PKT-MSG-001's 5-row asset family includes 3 promotional variants + 2 review-context artifacts. The probe's 3-touchpoint family carries different content (HERO_EMAIL / POST_SOCIAL / BANNER_WEB at distinct aspect ratios). Both fit a "small bounded promotional family" pattern. The shape generalizes structurally; the operational coherence-verification mechanism is untested in marketing mode.

**Useful review context as first-class content category (structural-paper).** PKT-MSG-001 introduces `message-check-board` and `message-annotation-layer` as variant types — review-context artifacts that the cycle 1 findings characterize as "useful and appropriate, but not structurally primary." This is novel relative to SKU and collection modes. Whether the category remains content-discipline or earns structural carriers is untested.

**Composite Layer 2 fidelity anchor: subject + message archetype (paper).** The cross-mode probe identifies marketing's composite anchor explicitly. PKT-MSG-001 carries this implicitly via packet text + rule-layer content. Whether the composite needs structural representation operationally is *the* held strain point — analogous in shape to collection-mode's grouping-archetype-and-relational-rules question, but **without** the operational deflation collection mode earned.

**Curation primarily judges message-fit (paper).** The probe describes message-fit as the dominant curation axis, with subordinate axes for product credibility, aspect-ratio fit, attention-budget fit, and copy-overlay tolerance. PKT-MSG-001 did not exercise curation. Whether `capture_reason` / `capture_notes` text carriers handle these tradeoffs operationally (the collection-mode pattern) is untested.

**Family coherence shifts to brand-value-fit across touchpoints (paper).** The probe's three-touchpoint family must read as one campaign even though aspect ratios, message specificities, and attention durations vary. Family coherence in marketing mode is brand-value-fit-across-variants, distinct from collection-mode's visual-grouping-coherence and SKU-mode's per-SKU-fidelity-coherence. Mechanism (review-shaped verification across the required output set) is mode-independent per the apex; content of verification is mode-shaped. Operationally untested.

**Mode-independence of structural shape (structural).** PKT-MSG-001 ran inside the same SKU-driven Furniture v1 base as PKT-SKU-007 / 009 / 010 and PKT-COLL-001, sharing the same packet-and-seam shape. The schema's structural mode-independence claim — already operationally confirmed for SKU and collection modes at full-flow depth — is **structurally confirmed** for marketing mode at first-pass cycle depth. Operational confirmation at full-flow depth has not been earned.

**Paper-probe strain points remain held — collection-mode-style deflation has not been earned.** The three probe-surfaced strain points (structured slot-message-elements; composite fidelity-anchor representation; selection-axis classification) are operationally untested. They may deflate similarly to collection-mode's analogous strain when operationally pressured; they may not. The repo evidence does not yet say. This is the load-bearing methodological asymmetry between B2 and B3.

## Open Questions Surfaced for Cross-Mode Comparison

These questions arise specifically from articulating the marketing-mode IA content and become more pointed when compared against the SKU-driven and collection-mode sketches and the future campaign-mode sketch.

1. **Does the collection-mode deflation pattern transfer to marketing mode under operational pressure?** Collection mode deflated its paper-strain hypothesis: prose discipline carried 1:N constituents and exclusion-by-name cleanly. Whether the analogous prose discipline (verbatim message content per slot; structured prose for message-bearing elements; text-field cross-axis tradeoff carrying at curation) holds for marketing mode is the central open operational question. Until tested, the paper-strain stays held.

2. **What does message-fit-as-primary-curation-axis look like operationally?** The probe describes it qualitatively. PKT-MSG-001 did not exercise it. Whether `capture_reason` / `capture_notes` text carriers handle marketing-mode tradeoffs as cleanly as they handled collection-mode tradeoffs (the curator-override correction surfaced a clean cross-axis tradeoff at curation) is untested.

3. **Does the message / offer / communication layer require a first-class structural carrier when operationally pressured?** Collection's analogous layer (collection / grouping) was paper-pressured for `grouping_archetype` + `relational_rules` first-class entities; operational pressure showed prose carried it. Marketing's layer is paper-pressured for `messages` / `briefs` + structured slot-message-element fields + `selection_axis` enum; operational pressure has not yet tested whether prose carries it.

4. **How does the implementation-vs-conceptual goal distinction operationalize in marketing mode?** The probe asserts it carries: implementation goal (slots filled with plausible assets) vs conceptual goal (carrying brand value across touchpoints). This is paper-asserted; not operationally exercised. Whether marketing-mode rounds will diverge along this axis the way SKU-mode rounds did (Path A's cross-round authorship-bearing curation) or will converge as collection mode mostly did (single-round candidates with curator override on lighting-vs-coherence tradeoff) is untested.

5. **Does the useful-review-context category (check-board, annotation-layer) generalize across modes?** Collection mode's PKT-COLL-001 had review-context placeholders from 2026-04-22 (collection-contact-sheet, collection-spacing-annotation) that were not exercised at full-flow depth. Marketing's PKT-MSG-001 introduces an analogous category. Whether this is a marketing-and-collection-only category or generalizes to SKU-driven mode (where it does not currently appear) and to campaign mode (where it presumably does) is open.

6. **Does the brand-value-fit family-coherence shape generalize to campaign mode?** The probe identifies marketing's family coherence as brand-value-fit-across-touchpoints. Campaign mode's family coherence is presumably also at the conceptual / value layer, but with broader scope (campaign-concept-coherence rather than message-coherence) and possibly different structural shape. B4 will need to surface this.

7. **What's the right operational pressure to apply to marketing mode for collection-mode-style deflation?** A Phase-2-equivalent test on PKT-MSG-001 (full generation → curation → governance with five-axis provenance + `asset_attachment`) would mirror what PKT-COLL-001 received. Whether that's the right next move (vs jumping to campaign-mode operationalization) is a sequencing question, not a content-articulation question; surfaced here, not resolved.

These questions feed forward into the campaign-mode sketch and ultimately into the cross-mode synthesis sketch.

## Self-Superseding Clause

This sketch is a Phase 1 artifact. It should be superseded by:

- the eventual cross-mode synthesis sketch once the four mode sketches exist and the comparison surfaces a consolidated cross-mode IA content model
- whatever later milestone-8 synthesis absorbs the redirection alongside the other Phase 1 / Phase 2 outputs
- the eventual `docs/architecture.md` rewrite that consolidates the apex artifact and the Phase 1 sketches into a single current-architecture document
- any future operational deflation (or operational confirmation of strain) earned by a Phase-2-equivalent marketing-mode test on PKT-MSG-001 or its successor

It does not supersede the apex definition-layer artifact, the three predecessor architectural passes, the SKU-driven or collection-mode sketches, the cross-mode probe, or the cycle 1 findings. Those remain authoritative for their subject matter; this sketch reads them at marketing / message-driven mode column depth and articulates content there, while preserving the evidence-depth distinction that distinguishes marketing from SKU and collection.

## Anchor Documents

### Phase 1 sketch series

- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md): the SKU-driven mode sketch; baseline for SKU-anchored 1:1 content
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md): the collection / merchandising mode sketch; contrast for 1:N grouping and operational deflation of paper-strain
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): the redirection note that places this sketch as the third of four Phase 1 mode sketches

### Apex and architectural-pass predecessors

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact at SKU + same-category-collection scope; Named Limitation #3 explicitly holds marketing-mode operational evidence as not-yet-earned
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): on-paper four-mode pressure-test that the marketing-mode probe concretizes

### Worked vertical slice — paper-content anchor and structural shape proof

- [`docs/cross-mode-probe-marketing-message-driven-v1.md`](cross-mode-probe-marketing-message-driven-v1.md): primary paper-content evidence; apparel Spring 2026 messaging scenario with three touchpoints; three strain points anticipated; all three operationally untested
- [`docs/airtable-marketing-message-driven-cycle-1-findings-v1.md`](airtable-marketing-message-driven-cycle-1-findings-v1.md): structural shape proof; PKT-MSG-001 carries the bounded marketing burden at first-pass depth; result classification `findings-only`; explicitly does NOT establish operational deflation of any strain point
- [`docs/airtable-marketing-message-driven-proof-plan-v1.md`](airtable-marketing-message-driven-proof-plan-v1.md): proof plan that Cycle 1 executed against
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): SKU-driven Path A; established the implementation-vs-conceptual goal distinction
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): SKU-driven Path B; established the asset_attachment self-contained governed-asset pattern
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): collection-mode Phase-2 operational test; established the operational-deflation-of-paper-strain pattern that marketing mode has not yet earned

### Plateau marker

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the operational plateau this sketch reads against
