# Brand-System Input // Asset Library → IA Mapping v1

## Posture

```text
Phase 2 deepening artifact
asset library input category only
on-paper IA mapping
not an intake form
not a UI
not Airtable
not schema mutation
not brand-specific
not milestone-8
not architecture.md rewrite
self-superseding once Phase 2 produces a fuller model
```

Per [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md) and [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md), this artifact deepens the asset library input category into an IA mapping. It is the second Phase 2 deepening artifact, after [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md).

The two artifacts together cover the visual-evidence side of brand-system input — photography / image style guide articulates the brand's intended conventions; asset library demonstrates the brand's conventions in operation. Articulating both sides closes the load-bearing relationship the photography artifact set up: when prose and approved imagery diverge, the asset library carries.

## Why Asset Library Is the Next Deepening Surface

The photography style guide artifact identified its own most pressed conflict point and resolved it by appeal to asset library: *prose articulations of photography style are abstractions of the photography itself; the work the brand has actually approved IS the brand's photography conventions in operation*. That made asset library load-bearing for the photography mapping — but it left asset library itself only at opening-sketch depth.

Two reasons asset library is the right next move:

1. **Closes the load-bearing relationship asymmetry.** The photography artifact's resolution of the prose-vs-image conflict appealed to asset library as the fallback authority; until asset library is articulated at deepening depth, that appeal is one-sided.
2. **Tests the deepening pattern's generalization.** Photography style guide is an *articulated-conventions* input shape. Asset library is a different shape: *demonstrated evidence*. Whether the deepening pattern (define → map → cross-mode → fallback → carrier-status) generalizes to a related-but-distinct category is itself useful information for the cross-mode synthesis surface and for milestone-8 readiness.

This is not a template-filling exercise. Asset library takes a different shape because demonstrated evidence carries differently than articulated conventions.

## What Counts as Asset Library Input

Asset library content is the brand's accumulated, approved, in-operation visual work. Eight types are conceptually distinct, even when a particular brand's library mixes them or organizes by different axes (chronological vs functional vs campaign-anchored).

### Approved product imagery

Per-SKU and per-product-class photography that the brand has approved as authoritative product representation. Carries product-truth fidelity, role-typical framing conventions, retouching level, scale and proportion rules. Most operationally evident in SKU-driven mode evidence (per-SKU `product_image` per Phase 1).

### Approved lifestyle / environmental imagery

Imagery showing products in context — lifestyle scenes, environmental shots, room sets, real-use scenarios. Carries the brand's environmental treatment, prop logic, model-presence conventions, and the relationship between subject and context.

### Prior campaign imagery

Historical campaign work that the brand has approved and run. Carries voice continuity, arc patterns, family-coherence patterns, and the brand's working repertoire of campaign-shaped imagery. Particularly load-bearing for campaign-mode IA content per Phase 1.

### Editorial / brand-world imagery

Imagery that establishes brand world without anchoring to a specific product or campaign — the brand's "house style" demonstrated as imagery. Often the most direct carrier of brand-system-layer content per Phase 1's identification of the brand-system layer as currently unmodeled.

### Reference boards / moodboards

Internal direction-setting imagery the brand has used to define new work — moodboards, tone-of-voice references, exemplar collections from prior work or external sources. Carry intent more than execution.

### Retouching / final master files

Final approved master deliverables with full post-production state. Distinct from staged or in-process imagery. Carry the brand's actual retouching conventions in operation.

### Rejected or superseded imagery

Imagery the brand has explicitly chosen not to use, or imagery that newer work has superseded. Useful as *negative evidence* — surfaces the boundary of what the brand considers on-style by showing what it has chosen to exclude.

### Metadata / usage / approval state

Structured metadata accompanying assets — approval timestamps, approver identity, usage rights, supersession history, channel scope, campaign association. Often partially captured in DAM systems, partially implicit in folder structure.

The eight types overlap in practice. A campaign hero shot is simultaneously prior campaign imagery and (if used as a reference for newer work) a moodboard contribution; a final master file is simultaneously approved product imagery and an artifact carrying retouching conventions. Intake handles each type for what it carries; cross-type overlap surfaces additively.

## How Asset Library Differs from Photography / Image Style Guide

This is the load-bearing distinction for understanding what the asset library mapping looks like.

### Demonstrates rather than describes

Photography style guide *articulates* conventions ("use generous side-light"). Asset library *shows* conventions ("here are 200 approved images, all with generous side-light, demonstrating what generous side-light looks like in this brand's hands"). The articulated form is high-bandwidth for naming a rule; the demonstrated form is high-bandwidth for showing a rule's *application range*. Both are needed; neither is reducible to the other.

### Visual evidence rather than prose articulation

Style guide content is mostly prose with reference images attached. Asset library content is mostly imagery with metadata attached. Intake handles them through different surfaces — prose extraction for style guide; image-as-reference linkage for asset library; metadata-as-governance-signal for both.

### Implicit style extraction rather than explicit rule extraction

Style guide intake reads articulated rules and maps them to layer carriers. Asset library intake reads accumulated imagery as a population and extracts the *implicit posture* — what the library, taken together, demonstrates about the brand's lighting register, composition vocabulary, voice. The extraction is interpretive, not literal.

### Approval history as governance signal

Style guides articulate intended posture; asset libraries carry approval history (what was approved when, by whom, for what context, what was later superseded). The approval history is itself architectural content — it tells intake about the brand's governance shape, where curator latitude exists, and what kinds of decisions tend to be approved versus rejected.

### Already-structurally-explicit content vs prose-carried content

This is the most architecturally significant difference. Photography style guide content largely flows into IA carriers that are *prose* (slot_prompt text; bounded_creative_discretion text; capture_reason text). Asset library content largely flows into IA carriers that are *structurally explicit* — `reference_assets` is the schema-modeled entity for visual references; packet-level reference linkage and slot-level lookup chain are structurally explicit conduits. **Asset library is the input category most directly served by the architecture's existing structural carriers.** That asymmetry is itself a generalization-test finding for the deepening pattern.

## Mapping to IA Layers

Asset library content distributes across IA layers differently from photography style guide content, primarily because much of it has direct structural carriers in `reference_assets` rather than flowing through prose.

### Brand-system layer (currently unmodeled in IA)

**Receives:** the asset library's *collective gestalt* — what the library taken as a population demonstrates about the brand's visual posture. Editorial / brand-world imagery is the most direct contributor here; lifestyle / environmental imagery contributes substantially; prior campaign imagery contributes voice-continuity content.

**Resolution shape:** brand-system layer is currently unmodeled. The asset library's brand-system-level content flows downstream as an *interpretive* anchor — operator practice that recognizes the library's posture and applies it to lower-layer authoring decisions. Direct structural representation of "what the asset library demonstrates about the brand" is the same Named Limitation #1 surface; not earned.

### Category / product-class layer (currently signaled-only in IA)

**Receives:** category-specific approved product imagery; category-specific lifestyle / environmental imagery; per-product-class examples within categories.

**Resolution shape:** category presence is signaled-only in current IA. Asset library content at this layer typically organizes by category in the brand's own library structure (folder hierarchies; collection groupings; tags). Intake surfaces the category organization and feeds category-specific imagery into the appropriate downstream layer carriers; first-class category-aesthetic carriers remain unearned.

### Mode-specific layer (varies per mode)

**Receives:** mode-specific approved imagery — campaign imagery for campaign mode; promotional imagery for marketing mode; merchandising / lifestyle compositions for collection mode; per-product imagery for SKU mode.

**Resolution shape:** mode-specific layer carriers are mode-bound. Asset library content here distributes naturally by mode through library organization (campaigns folder; product-photography folder; etc.). Intake's job is to identify which library segments belong to which mode, then feed each segment into the corresponding mode-specific layer.

### Packet layer (the strongest current carrier)

**Receives:** packet-recurring reference imagery — the "house" lighting reference; recurring studio-world references like REF-002 in the Phase 1 evidence; per-packet visual anchors.

**Resolution shape:** packet-level reference linkage (`approved_reference_keys`) is structurally explicit per Phase 1. Asset library content at this layer flows directly into reference-asset records and packet-reference linkage. **This is the cleanest direct-structural-carrier mapping in the entire intake-to-IA architecture** — asset library content lands in `reference_assets` with packet-linkage as its operational connection. The cross-packet reuse of REF-002 across PKT-SKU-009 / PKT-SKU-010 / PKT-COLL-001 in the Phase 1 evidence demonstrated this conduit operationally.

### Slot layer (the role-specific narrowing carrier)

**Receives:** role-specific reference imagery (where slot-specific references exist); cropping conventions demonstrated by approved per-role imagery; per-role composition examples.

**Resolution shape:** slot-level lookup chain (`packet_reference_image_lookup`, `product_image_lookup_lookup`) surfaces packet-level references to slots. Slot-specific reference linkage (binding a per-slot reference directly) is not currently a structural carrier — Phase 1 named this as a paper candidate not earned. Asset library content at the slot layer flows through lookup-from-packet, with slot-prompt prose carrying any slot-specific role-typical framing the library demonstrates.

### Curation / governance layer

**Receives:** approval history (who approved what when, for what context); supersession patterns; rejected imagery as boundary signal; usage-rights / channel-scope metadata as governance constraint.

**Resolution shape:** curation provenance is structurally explicit per Phase 1 (five-axis provenance + `curator` + `curation_pattern`). Asset library content at this layer flows into governance criteria — what the library demonstrates about the brand's approval shape feeds the operator's understanding of curator latitude and override authority. The metadata surfaces are partially captured in `capture_reason` / `capture_notes` text; structured approval-history representation as a first-class IA carrier is not earned.

## Cross-Mode Implications

Each mode draws from different segments of the asset library. Intake should expect the brand's library to cover modes asymmetrically — most brands have rich SKU product imagery and thinner campaign archives, or vice versa.

### SKU-driven mode

Draws primarily on **approved product imagery**. Per-SKU `product_image` is the per-product fidelity carrier per Phase 1; the asset library is its source. Material / surface / finish rendering is established by per-SKU library imagery; the brand's product-photography conventions live here. Cleanest direct mapping.

### Collection / merchandising mode

Draws on **approved lifestyle / environmental imagery** for grouping context and **approved product imagery** for per-constituent fidelity. Per Phase 1's collection-mode operational evidence, prose-only fidelity carried for constituents without product_image in PKT-COLL-001. The asset library is where intake ideally finds those product images; absence in the library is what triggers the prose-only fallback that the operational test deflated.

### Marketing / message-driven mode

Draws on **prior campaign imagery** (for promotional family-coherence references), **editorial / brand-world imagery** (for brand-voice anchoring at touchpoint scope), and channel-specific imagery where the library is organized by touchpoint. Per Phase 1's marketing-mode sketch, evidence depth is operationally weaker; asset library intake provides source material for marketing-mode references but does not earn operational deflation.

### Brand campaign / editorial mode

Draws on **prior campaign imagery** (campaign-arc continuity), **editorial / brand-world imagery** (voice anchoring at the layer Phase 1 named structurally load-bearing for campaign mode), and **reference boards / moodboards** for direction-setting. Per Phase 1's campaign-mode sketch, the campaign-mode layer's editorial voice and campaign-world coherence are paper-pressed; asset library is the most concrete carrier of this content but operational deflation is unearned.

## Fallbacks and Conflict Handling

Asset library content frequently exhibits internal divergence. Six recurring patterns plus the across-input conflict pattern that connects asset library to photography style guide.

### Approved imagery vs written style guide

**Default fallback:** asset library carries. The foundational visual-as-fidelity-strategy / prose-as-fallback claim from the apex aesthetic-layering pass governs this. Articulated rules are abstractions; the library is the brand's photography conventions in operation. Where they diverge, the doing is the truth.

**Why this fallback:** completes the load-bearing relationship the photography style guide artifact set up. The two artifacts together establish that prose + visual evidence is a complementary pair, with visual evidence as the authoritative member when conflict surfaces.

### Current imagery vs older imagery

**Default fallback:** newer carries; older imagery is held as continuity reference, not authority. Same fallback the photography artifact articulated; asset library makes it concrete with actual imagery dates.

**Why this fallback:** brand visual posture evolves. Newer imagery reflects the brand's current state; older imagery may carry continuity value (especially for campaign-arc references) but should not authoritatively conflict with current work.

### Category-specific imagery vs brand-wide imagery

**Default fallback:** category-specific carries within its category; brand-wide carries across categories where category-specific guidance is absent.

**Why this fallback:** mirrors the photography style guide fallback; granularity wins where it exists.

### Campaign imagery vs evergreen imagery

**Default fallback:** context-dependent. Within a campaign's world, campaign imagery is the operating reference. Outside that campaign, evergreen library imagery is the operating reference. Treat campaign imagery as scoped to campaign-mode packets unless the brand explicitly elevates a campaign visual to evergreen status (which is itself a governance event).

**Why this fallback:** campaigns introduce voice or visual extensions that are intentional within the campaign but should not contaminate non-campaign work. Scoping campaign imagery preserves this boundary.

### Sparse or inconsistent libraries

**Default fallback:** rely on whatever IS articulated; mark gaps; lean on photography style guide where the library is sparse but the style guide is articulated. If neither is articulated, fall back to systemic patterns from Phase 1's worked-example evidence.

**Why this fallback:** sparse libraries are common (early-stage brands; recently-rebranded entities; brands with sparse archive maintenance). Inconsistent libraries are also common (rapid evolution; multiple sub-teams generating uncoordinated work). Marking gaps and divergences honestly preserves the inconsistency for operator review rather than glossing it.

### Negative examples / rejected imagery

**Default fallback:** treat as boundary signal, not authority. Rejected imagery surfaces what the brand has chosen NOT to do; this is useful for bounding the discretion zone but should not become a prescriptive negation library that operationalizes "do not do this." The signal is *boundary*; the carrier is operator awareness, not structural exclusion.

**Why this fallback:** prescriptive negation tends to over-fit. Rejected imagery can reflect one-off decisions, context-specific exclusions, or evolving posture. Treating it as bounding-signal rather than authoritative-prescription preserves the information without freezing the boundary.

## Prose-Carried Now vs Eventually Earning Structural Carriers

Asset library content sits differently across the carrier-status matrix than photography style guide content. The asymmetry is the point.

### Structurally explicit now (across all four modes)

- `reference_assets` entity itself — the structurally-modeled carrier for visual references; asset library content's primary direct-structural conduit
- Packet-level reference linkage (`approved_reference_keys`)
- Slot-level lookup chain (`product_image_lookup_lookup`, `packet_reference_image_lookup`)
- Per-product `product_image` attachment (per-SKU fidelity carrier; populated from asset library's product imagery segment)
- Cross-packet reference reuse (operationally demonstrated in Phase 1; same reference asset can serve multiple packets)
- `asset_attachment` self-contained writeback on governed-asset rows (the library's downstream operational carrier; populated from asset library content via curation)

**This is the carrier-status row where asset library content is over-represented compared to photography style guide content.** The asset library category is the input category most directly served by existing structural carriers. The architecture's `reference_assets` + lookup chain + `asset_attachment` are essentially the "asset library" infrastructure within the IA.

### Prose-carried now (across all four modes; held)

- the *interpretive* extraction of the library's collective gestalt at the brand-system layer (no first-class carrier; flows into operator practice)
- approval-history content beyond `curation_pattern` enum (carried in `capture_reason` / `capture_notes` text)
- supersession history (no first-class carrier; flows into operator awareness)
- rejected imagery as boundary signal (no first-class carrier; flows into operator awareness)
- the relationship between asset library segments and modes (carried by library organization conventions, not structurally enforced)

### Structurally suggested but not earned

- a structured tag on `reference_assets` classifying the reference type (product / lifestyle / campaign / editorial / moodboard / continuity) — surfaced in the cross-mode probe series; not earned
- approval-state metadata on `reference_assets` (who approved when; for what scope; supersession state) — surfaced in this artifact; not earned
- a `rejected_assets` first-class entity for negative-evidence boundary signal — surfaced in this artifact; not earned
- usage-rights / channel-scope metadata as structured fields — paper-pressed; not earned
- structured representation of "campaign world" as a scope on imagery — surfaced in Phase 1's campaign-mode sketch; not earned

These are paper-pressed across multiple Phase 1 + Phase 2 artifacts. They would *fit* the asset library content if earned. They remain held; asset library intake does not earn them on its own.

### Operationally deflated (collection mode)

- prose-only fidelity for constituents whose product_image is absent from the library (per PKT-COLL-001 evidence; the library's gap was filled by slot_prompt prose under operational pressure)
- cross-packet reference reuse via deliberate operator linking (REF-002 across PKT-SKU-009 / 010 / COLL-001)

### Operationally untested

- campaign-arc continuity carrying via library content (paper-only at campaign-mode evidence depth)
- editorial-voice extraction from library gestalt (paper-only)
- approval-state metadata as governance signal at full-flow depth (paper-only; cycle 1 rerun did not exercise it)
- negative-evidence carrying through `rejected_assets`-style structural surface (paper-only; not exercised)

## Open Questions

1. **How does the asset library handle assets that pre-exist articulated guidelines?** Many brands have legacy assets approved before current guidelines were written; the brand still uses them but the style guide doesn't fully describe them. Intake architecture flags this as inferred-not-stated for the style guide side, but the library side is more nuanced — legacy assets may carry posture the brand still endorses, posture the brand has tacitly moved away from, or posture the brand is genuinely uncertain about. How to weight legacy asset evidence is unprobed.

2. **How does the architecture handle asset library updates?** New approved imagery accumulates continuously; supersession events occur; campaign imagery moves from "current campaign" to "prior campaign" status. Phase 2 opening sketch flagged this generally; for asset library specifically, the question of whether updates should re-trigger intake at any layer (brand-system layer if posture has shifted; mode-specific layer if a new campaign extends voice; packet layer if a new reference becomes recurring) is unprobed.

3. **How does the photography style guide / asset library relationship work in practice when the library has multiple stylistic registers?** Some brands maintain visually heterogeneous libraries deliberately — different registers for different modes, sub-brands, or audiences. The fallback model defaults to asset library carrying, but when the library itself contains divergent registers, intake needs to identify which register applies to which intake context. Unprobed.

4. **How does rejected / superseded imagery flow as negative evidence into intake?** The fallback says treat as boundary signal not authority, but the operational shape of "boundary signal" is undefined. Does rejected imagery influence prompt generation? Curation criteria? Reviewer training? The architecture is silent on operationalization; the artifact preserves the input category honestly without prescribing.

5. **Approval-state metadata as governance signal — does the existing IA capture it?** Curation provenance fields (`captured_at`, `curator`, `capture_reason`, `capture_notes`) capture the curation event itself. Approval state on incoming asset library content (the brand's prior governance events on its own assets) is not a current IA carrier. Whether this should become a structural carrier or stay implicit in operator interpretation is open.

6. **How does the operator distinguish "approved imagery showing intentional posture" from "approved imagery approved for one-off reasons"?** Not all approved imagery is template-shaped. Some assets are approved for specific contexts that don't generalize. Library intake risks over-extracting posture from atypical approvals. The fallback model addresses internal divergence but not this kind of one-off pattern. Unprobed.

7. **Does this mapping generalize to brands with asset-library-shaped input but not photography-style-guide-shaped input?** Some brands maintain rich libraries without articulated style guides; intake works backwards from the library only. The Phase 2 architecture sketch's fallback for absent style guide is to derive from library; this artifact closes that loop. But the inverse case — articulated style guide with sparse library (early-stage brand) — is handled by photography style guide intake, not this artifact.

## Self-Superseding Clause

This artifact is a Phase 2 deepening surface. It should be superseded by:

- subsequent Phase 2 deepening artifacts on the remaining four brand-system input categories (brand platform; visual identity system; application guidelines; past campaigns), or by a sparse-articulation pressure note that pressures the deepening pattern across the categories
- a fuller Phase 2 milestone synthesis when the deepening surfaces accumulate enough material
- whatever later milestone-8 synthesis absorbs the redirection alongside Phase 1 + Phase 2 outputs and any operational evidence
- the eventual `docs/architecture.md` rewrite that consolidates the apex artifact, the Phase 1 sketches, the Phase 2 artifacts, and any operational evidence

It does not supersede the Phase 2 opening sketch, the photography / image style guide deepening artifact, the Phase 1 cross-mode synthesis, the four Phase 1 mode sketches, the apex artifact, or the apex aesthetic-layering pass. Those remain authoritative for their subject matter; this artifact reads them at asset library column depth and articulates the IA mapping there.

## Anchor Documents

### Phase 2 framing

- [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md): Phase 2 opening sketch; names asset library as one of six brand-system input categories; this artifact deepens that category
- [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md): the prior Phase 2 deepening artifact; established the load-bearing visual-as-fidelity claim that this artifact closes the other side of
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): the redirection note that frames Phase 2 as the implementation entry surface where brand-system input enters the layered IA

### Phase 1 outputs (the IA layer model the asset library mapping feeds into)

- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md): cross-mode synthesis; identifies stable shared layers, mode-specific layers, carrier-status matrix
- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md): SKU-driven mode IA content; per-SKU `product_image` populated from asset library product imagery
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md): collection / merchandising mode IA content; PKT-COLL-001 evidence including library-gap fallback (prose-only fidelity for constituents without product_image)
- [`docs/ia-layered-content-sketch-marketing-mode-v1.md`](ia-layered-content-sketch-marketing-mode-v1.md): marketing / message-driven mode IA content
- [`docs/ia-layered-content-sketch-campaign-mode-v1.md`](ia-layered-content-sketch-campaign-mode-v1.md): brand campaign / editorial mode IA content; editorial voice as load-bearing axis with library as primary carrier

### Apex and architectural-pass predecessors (load-bearing for foundational claims)

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact; Named Limitation #1 (specific aesthetic-carrier schema) is what asset library content surfaces source material for without resolving
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic layer-shape sketch; visual-as-fidelity-strategy / prose-as-fallback claim that grounds the asset-library-carries fallback in the photography artifact and confirms it from this side

### Plateau marker

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the operational plateau the Phase 1 + Phase 2 work reads against
