# Layered Reference and Discretion Architecture v1

## Posture

```text
architecture attempt
conceptual IA work
not Airtable
not schema mutation
not validator integration
not prompt engineering
not milestone
not final doctrine
self-superseding when a later structured model or operational test absorbs it
```

This artifact attempts the layered architecture of references, normative constraints, and creative discretion across the four worked-example workflow modes — the project's articulation of scalable production pipelines for commercial visual assets. It is a model attempt, not a planning document, not a probe, and not an adjudication. Permission to be wrong is part of the method; the standard the artifact answers to is whether the model survives the concrete cases it is pressured against, where it labels cleanly, where it strains, and where it falls back to prose or procedure.

The artifact does not re-derive the layered IA shape; that lives in [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md), the four Phase 1 mode sketches, the cross-mode synthesis ([`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md)), the structured IA model v1 ([`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md)), and the normative-force pass v1 ([`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md)). It reads above those and applies them to the question the IA layered-content redirection ([`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md)) named as the project's center.

## What This Artifact Attempts

Scale beyond operator continuity is treated here as an architectural premise of the project, not a strategic fork. The relevant question is not whether the architecture must generalize beyond the authoring operator; the question is what trace and layer structure makes that generalization legible. The reference-function taxonomy, the normative hierarchy, and the discretion-site decomposition below are the conceptual surfaces on which that legibility is built.

Three convergent questions the architecture is currently circling rather than modeling head-on:

- **References are talked about as one category, but they do not have one function.** Brand-system reference, category reference, slot composition reference, product-truth image, and negative reference all carry different normative load and operate at different layers. The architecture currently distinguishes descriptive-reference from directive-reference (per the normative-force pass v1) and separates `product_image` from `reference_assets` by table and field name. Below that distinction, function is implicit.
- **Creative discretion is currently articulated through one premise (curation as the singular runtime creative-discretionary act) that milestone 9 named as substantively refined.** The curation semantic split — authorship-bearing discretion at variable sites, governance-bearing curation always at the seam — opens space for naming where discretion *actually* enters across the architecture. The post-milestone-9 framing names the split; it does not yet decompose the sites.
- **Layered inheritance is talked about as if every brand carries the same kind of content downstream, but real brand systems carry stack — brand platform, visual identity system, photography style guide, asset library, application guidelines, past campaigns — at different layer specificities that map asymmetrically onto the IA.** The architecture acknowledges this asymmetry (Phase 2 deepenings; the brand-system layer named as unresolved structural decision); it has not yet attempted the layered-content model the asymmetry implies.

The artifact answers the question the project asked when it redirected: what kinds of information, constraints, references, and creative-discretion decisions go into each type of image; what is shared upstream at brand / category / product-class / collection / campaign / message levels; what is specific downstream at packet / slot levels; how visual references inherit, override, and combine; how brand-level aesthetic anchors differ from category environmental references, collection coherence references, campaign-world references, product-truth references, and slot-specific composition references; and how this differs across the four workflow modes.

The artifact pressures the model against concrete cases from existing repo evidence (PKT-SKU-009; PKT-COLL-001; PKT-CAMP-004; PKT-MSG-001) plus a conceptual cross-category contrast (dining-room vs bedroom) chosen because it pressures category-layer reference inheritance the repo's same-category operational evidence has not pressured.

## Scale Legibility as Test Criterion

Throughout the sections below, one test runs alongside the model: **could a non-author operator reconstruct why a given reference, constraint, or discretion point applies at the layer it does, from the architecture alone?** Where the answer is yes, the architecture carries operator-independent legibility. Where the answer is no, the architecture currently carries operator-continuous legibility — the reasoning is reconstructable only if the operator who made it remains in context.

This is not a separate scale-fork question. It is the basic legibility test any layered normative architecture must pass for the layering to be load-bearing. The criterion is applied per layer, per reference type, and per discretion site; missing trace is named where it surfaces; no schema is proposed.

## Reference-Function Taxonomy

References are not a single class. The architecture has at least nine reference functions, distinguished by what they carry, what they constrain, where they live in the layered model, whether they inherit or are local, and what they must not be confused with.

The taxonomy treats reference-function as a conceptual cut. Carrier representation (where each function currently lives in Airtable structure or prose; where structural carriers exist vs do not) belongs to the structured IA model v1 and the carrier-status matrix in the cross-mode synthesis. This artifact reads above carrier; it asks what each reference function *does* in the architecture.

### Brand-system reference

- **Carries.** The brand-as-a-whole visual logic: lighting register, tonal register, material rendering posture, color and finish behavior, photography conventions, applied imagery from the brand's asset library, the visual identity system's stable constants (logo, typography, color codes, grid systems). Per the Phase 2 deepenings, brand-system reference content is hybrid in shape — articulated conventions plus demonstrated evidence plus brand-wide constants.
- **Constrains.** Every downstream layer's aesthetic interpretation. A category, collection, campaign-world, or slot reference that diverges from brand-system reference must justify its divergence; absent justification, brand-system reference is the default normative anchor.
- **Where it lives.** Currently *outside* the architecture as a first-class carrier. The brand-system layer is named as unresolved structural decision in milestone 9 and [`docs/architecture.md`](architecture.md); three live shapes (first-class throughout / terminal operator-mediated / hybrid) remain unresolved. In current prototype work, brand-system reference content is supplied operator-side via the grounding-note prototype-aesthetic instances and the brand-system reference imagery linked through the existing `reference_assets` lookup chain.
- **Inherited or local.** Inherited downstream by every category, collection, campaign, message, packet, and slot under the brand. Inheritance is implicit-additive (Apex Named Limitation #2); no formal precedence rule for overriding brand-system content is earned.
- **Must not be confused with.** A specific prototype-aesthetic instance (LMCM; Warm Restraint). The instance is *one* brand-system reference set among many possible; the brand-system layer is the *position* in the architecture that holds whichever instance applies. Conflating instance with layer collapses the template's aesthetic-agnostic stance.
- **Scale-legibility test.** A non-author operator can identify *that* brand-system reference content shapes downstream interpretation by reading the lookup chain, but cannot reconstruct the brand-system aesthetic logic from the architecture alone — the logic lives in operator-side grounding-note instances or downstream prose. The legibility gap is real and is the Phase 2 deepenings' surface.

### Category / product-class reference

- **Carries.** The category-as-class visual logic: what *furniture* looks like distinct from *apparel*; what a *dining environment* looks like distinct from a *bedroom environment*; what a *chair* looks like as a product class distinct from a *bench* or *lamp* — at the level of category-typical proportions, surface treatments, environmental conventions, and role-typical slot patterns (HERO / PROFILE / DETAIL appropriate to furniture vs different role patterns for apparel or food).
- **Constrains.** Slot-role conventions; category-typical composition expectations; what counts as supporting context for the category.
- **Where it lives.** Currently signaled-only across all four worked-example modes; no first-class carrier. Category is carried by worked-example naming convention and by per-SKU descriptive fields; product-class is carried per-SKU via `material_notes` / `finish_notes` / `identifying_details`. The Phase 1 base-setup change summary for the campaign-mode D2C Home-Goods base surfaced the first operational pressure point on category/product-class enum representation (held, not resolved).
- **Inherited or local.** Partially inherited from brand-system; partially category-specific. The dining-vs-bedroom contrast clarifies the partial inheritance:
  - A brand's *lighting register* (e.g., low-direct-sun warmth around 4500–5500K with soft diffuse shadows) plausibly inherits cross-category — the same lighting logic applies to a dining scene and a bedroom scene under the same brand-system reference.
  - A brand's *environmental composition* does *not* inherit cross-category in the same way — a dining room is table-centric (subject is around the table, supporting context is wall art / pendant light / dining-chair arrangement) and a bedroom is bed-centric (subject is around the bed, supporting context is bedside table / lamp / textile layering). The supporting-context conventions are category-specific even when the brand-system aesthetic stays constant.
  - A brand's *product-class proportions* are category-specific from the start (a sofa's silhouette has nothing to inherit from a duvet's silhouette).
- **Must not be confused with.** Brand-system reference (which spans categories) or collection / campaign-world / packet-level reference (which are downstream of category). Category reference is the *intermediate* layer where some content inherits from brand-system and some content is category-local.
- **Scale-legibility test.** A non-author operator cannot currently reconstruct the partial-inheritance behavior from the architecture alone — the SKU-driven, collection-mode, and marketing-mode evidence all operate in furniture; the campaign-mode D2C Home-Goods base setup surfaced the enum mismatch but was not operationalized. The dining-vs-bedroom contrast is a paper pressure here, not earned evidence.

### Collection / family-coherence reference

- **Carries.** What makes a set of related SKUs hang together as one collection: shared studio world, shared tonal register, shared lighting direction, shared compositional logic across the constituents. In PKT-COLL-001's calm living-room grouping (chair + side table + lamp + bench), family coherence was carried by all three governed assets sharing studio world, chair fidelity, tonal register, and lighting direction even though spatial arrangement was independently generated per slot.
- **Constrains.** Cross-slot consistency within a collection packet; what "the same family" means for the set; what cross-axis tradeoffs at curation can compromise vs cannot (per PKT-COLL-001's lead-product lighting vs family coherence vs framing cleanliness vs exclusion fidelity).
- **Where it lives.** Currently prose-carried at the packet and slot layers (per the operational deflation of `grouping_archetype` + `relational_rules` paper-pressed mutations on PKT-COLL-001). The held composite-anchor candidate at collection scope is *less* earned by operational pressure than before the operational test.
- **Inherited or local.** Inherited within a collection packet (all slots under the packet inherit the family-coherence intent); not inherited across packets unless explicit operator decision (REF-002's reuse across PKT-SKU-009 / PKT-SKU-010 / PKT-COLL-001 was operator practice, not structural inheritance).
- **Must not be confused with.** Brand-system reference (which is global across the brand, not local to a collection); category reference (which is class-level, not set-level); campaign-arc continuity (which is editorial, not merchandising).
- **Scale-legibility test.** A non-author operator can identify *that* family coherence applies (from the collection packet's `business_intent` / `creative_intent` / `bounded_creative_discretion` text and the `products` 1:N linkage). The reasoning for *why* a specific composition counts as carrying family coherence vs not lives in `capture_reason` / `capture_notes` after curation — which carries trace dimensions but reasoning content is prose-in-structure. Reconstructable with effort; not operator-independent in the strong sense.

### Campaign-world reference

- **Carries.** The editorial atmosphere a campaign establishes: voice, world-coherence, arc continuity across moments, latitude bounds within which a campaign concept can be expressed. PKT-CAMP-004's Warm Restraint campaign-world reference imagery was the load-bearing carrier for the bounded mini-family proof on KITCHEN_PREP, alongside the per-product imagery. The cross-mode probe for brand campaign / editorial mode identified campaign-world reference as the heaviest coherence-verification load across the four modes (five coherence questions simultaneously per slot: per-asset role / arc advancement / voice consistency / family continuity / latitude-use).
- **Constrains.** Cross-slot voice consistency; arc-advancement legibility; campaign-concept-fit at curation; what counts as the campaign's expressive frame vs what falls outside it.
- **Where it lives.** Mode-specific to brand campaign / editorial mode; the load-bearing distinguishing layer above packet for campaign mode. Currently prose-carried at the packet level plus packet-level reference linkage; the `campaign_concept` held candidate is paper-pressed for first-class field/entity representation. The directional-reference shape (REF-CAMP-DIRECTION-001 at PKT-CAMP-001 cycle 1 rerun) is the only explicit directional reference across the four-mode evidence chain at structural-proof depth.
- **Inherited or local.** Local to a campaign packet; not inherited cross-mode (a marketing-mode packet does not automatically inherit a campaign's world reference, though it may explicitly link to a campaign-mode governed asset as a brand-voice reference if that linkage is operator-authored).
- **Must not be confused with.** Marketing/message reference (which is communication-bound, not world-bound); brand-system reference (which spans campaigns); collection coherence reference (which is set-bound, not arc-bound).
- **Scale-legibility test.** A non-author operator can identify a campaign packet's world-reference from the packet's reference linkage. Reconstructing whether a candidate carries the campaign world coherently requires either operator-continuous interpretation or explicit campaign-world articulation that current architecture does not first-class.

### Marketing/message reference

- **Carries.** Communication-bearing visual conventions: what offer text presence looks like, what brand-identifier presence looks like, what callout emphasis looks like, what copy-overlay region tolerance looks like. The cross-mode probe for marketing / message-driven mode named the composite Layer 2 anchor as subject + message archetype. PKT-MSG-001 cycle 1 carried this implicitly via packet-level text plus rule-layer content; operationally untested.
- **Constrains.** Message-fit at curation; cross-touchpoint brand-value coherence; aspect-ratio + attention-duration + message-specificity per touchpoint.
- **Where it lives.** Mode-specific to marketing / message-driven mode. Currently structurally proven at cycle-1 depth without full-flow generation/curation/governance pressure. Three paper-pressed mutations are held: `messages` / `briefs` first-class entity; structured slot-message-element fields; `selection_axis` enum. All three remain operationally untested.
- **Inherited or local.** Local to a marketing packet; not inherited across packets in the current architecture.
- **Must not be confused with.** Campaign-world reference (which is editorial, not transactional); product-truth image (which is descriptive, not communicational); slot composition reference (which is role-bound, not message-bound).
- **Scale-legibility test.** Operationally untested at marketing-mode evidence depth. The legibility claim is paper-supported.

### Product-truth image

- **Carries.** What the specific product IS: material, finish, identifying details, form. The primary descriptive-reference per the normative-force pass v1's split. In SKU-driven mode, `product_image` is the architecture's primary fidelity strategy; the visual-as-fidelity-strategy / prose-as-fallback claim from the apex aesthetic-layering pass holds operationally (SKU + collection).
- **Constrains.** What must visually survive generation: the chair must remain that chair, not a generic chair-like form. Product-truth is binding-as-anchor — text-only steering tends to drift toward generation defaults without it.
- **Where it lives.** First-class at the product entity (`product_image` attachment); flows to packet via products relation and to slot via `product_image_lookup_lookup` lookup. Operational at SKU mode and collection mode (with one observed exception — PKT-COLL-001 had three constituents without `product_image` rendered credibly from descriptive prose, an incidental capability not the operational target).
- **Inherited or local.** Local to the specific product; surfaces structurally into every slot that includes the product as subject via the lookup chain.
- **Must not be confused with.** Brand-system reference (which is global aesthetic, not product-specific); category reference (which is class, not instance); slot composition reference (which is framing, not subject identity); or governed-output continuity reference (which is downstream, not upstream).
- **Scale-legibility test.** A non-author operator can identify which products are in scope for a packet (via `products` relation) and which images anchor their identity (via the lookup chain). Operator-independent at this layer.

### Slot-level composition / crop / role reference

- **Carries.** Role-specific framing logic: HERO needs full-product framing with role-typical composition; PROFILE needs side-profile fidelity; DETAIL needs material/joinery emphasis at close crop; HERO_GROUP needs all constituents in frame; DETAIL_ADJACENCY needs subset framing with exclusion logic. In SKU-driven and collection-mode evidence, slot-role + slot_prompt + surfaced packet reference together carry slot-level composition without first-class slot-specific reference linkage.
- **Constrains.** What the slot's output must satisfy at the framing / crop / camera-distance / detail-emphasis level. Bounds the candidate composition space against role-typical expectations.
- **Where it lives.** Currently distributed: `slot_role` enum carries role identity; `slot_prompt` text carries role-specific composition instructions; packet-level reference imagery is surfaced via lookup. No slot-specific reference attachment is structurally first-class in the current architecture (slot can include packet-level references via lookup but cannot bind a slot-only reference image).
- **Inherited or local.** Slot-role naming inherits category-typical role patterns (operator practice, not structure); composition instructions are local to the slot's prose.
- **Must not be confused with.** Product-truth image (which is subject identity, not framing); brand-system reference (which is global aesthetic, not slot-local); negative reference (which is exclusion, not composition direction).
- **Scale-legibility test.** A non-author operator can identify a slot's role and intended composition from `slot_role` + `slot_prompt`. Reconstructing whether the composition is the *right* composition for the role at this brand / category / collection / campaign / packet requires either operator-continuous interpretation or richer role-typical aesthetic constraint, which is not earned at first-class depth.

### Negative / avoid reference

- **Carries.** Boundary signal — what must not appear. Two observed shapes:
  - **Avoid-by-name at slot scope.** PKT-COLL-001's DETAIL_ADJACENCY explicitly excluded the lamp and bench from frame; the agent honored the exclusion cleanly.
  - **Avoid-by-aesthetic at packet / campaign-world scope.** Warm Restraint's avoid-list (no austerity drift; no rustic-craft drift; no saturated color; no metallic accents; no hand-thrown pottery cues) carries directive-as-bound via prose discipline; without it, generation drifts toward defaults that subvert the campaign concept.
- **Constrains.** What the generation candidate space includes vs excludes. Negative reference is structurally distinct from positive reference: an aesthetic system that says only what *should* happen and never what *must not* tends to drift toward generation-model defaults.
- **Where it lives.** Currently prose-carried at packet `bounded_creative_discretion` (avoid-by-aesthetic) and at slot `slot_prompt` (avoid-by-name). No first-class `rejected_assets` or `avoid_list` entity. The held `rejected_assets` candidate is the paper-pressed structural-carrier analogue.
- **Inherited or local.** Avoid-by-aesthetic inherits from brand-system reference and campaign-world reference downstream; avoid-by-name is slot-local.
- **Must not be confused with.** Constraint rules (which are positive-as-bound and structurally explicit via `constraint_rules`); product-truth (which is what *should* visually persist); category reference (which constrains positively, not by exclusion).
- **Scale-legibility test.** A non-author operator can read the avoid content from prose, but cannot currently *verify* whether the avoid was honored without operator-continuous interpretation. Negative reference's load-bearing role is hardest to verify after the fact; the architecture carries the directive force but not a reliable trace that the avoid was operationally respected.

### Governed-output continuity reference

- **Carries.** A previously-approved governed asset reused as continuity anchor for derivative work: a campaign hero shot lifted as brand-voice reference for a later marketing packet; a governed SKU hero reused as a category reference; a campaign-world asset reused across campaign arc moments.
- **Constrains.** Cross-packet visual continuity for derivative work; what counts as a derivative vs a new asset family.
- **Where it lives.** Currently unmodeled at first-class depth. Reuse / derivative rules — when a governed asset becomes a reference for a later packet, what governance applies to the derivative — are named in the apex artifact as adjacent not-yet-hardenable concerns. The architecture treats `reference_assets` as independently linkable, so a governed output *can* be linked as a reference, but the derivative-governance question is held across all four modes.
- **Inherited or local.** Operator-mediated cross-packet inheritance; not enforced by structure.
- **Must not be confused with.** Brand-system reference (a governed output is one specific asset, not the brand-as-a-whole); product-truth image (a governed output is a downstream asset, not an upstream descriptive anchor).
- **Scale-legibility test.** A non-author operator can identify *that* an asset has been governed (via `governed_output_status` + `asset_attachment`) and *that* it can be linked as a reference, but cannot reconstruct from architecture whether a given derivative use respects the source's intent — that judgment is operator-continuous.

### Reference-function matrix

Compact at-a-glance view across the nine reference functions. The matrix does not propose schema; it summarizes the function-level distinctions the prose above articulates.

| Reference function | Primary force | Typical layer | Inherited / local | Current carrier status | Main confusion to avoid |
|---|---|---|---|---|---|
| Brand-system reference | Reference (directive + descriptive composite) | Brand-system | Inherited downstream across categories, modes, packets | No first-class carrier; structural decision named (three live shapes; hybrid most likely) | Confusing the brand-system *layer* with a specific prototype-aesthetic *instance* (LMCM; Warm Restraint) |
| Category / product-class reference | Reference (directive + descriptive composite) | Category / product-class | Partially inherited from brand-system; partially category-local (dining-vs-bedroom contrast) | Signaled-only; per-SKU descriptive fields; held | Confusing with brand-system reference (cross-category) or mode-specific reference (set-bound) |
| Collection / family-coherence reference | Reference (directive at collection scope) | Mode-specific (collection) | Inherited within collection packet; not across packets | Prose-carried; composite-anchor candidate operationally deflated | Confusing with brand-system (global) or category (class-level) |
| Campaign-world reference | Reference (directive + constraint composite at campaign scope) | Mode-specific (campaign) | Local to campaign packet; cross-mode lifting is operator-mediated | Prose + packet-level reference linkage; `campaign_concept` held candidate paper-pressed | Confusing with marketing reference (transactional) or brand-system reference (cross-campaign) |
| Marketing / message reference | Reference (directive at message scope) | Mode-specific (marketing) | Local to marketing packet | Paper-pressed; structurally proven at cycle-1 depth; held mutations operationally untested | Confusing with campaign-world (editorial) or product-truth (descriptive) |
| Product-truth image | Reference (descriptive) | Product entity → packet → slot via lookup | Local to product; surfaces structurally into every slot including the product as subject | First-class via `product_image` + lookup chain | Confusing with brand-system aesthetic (global) or slot composition (framing) |
| Slot-level composition / crop / role reference | Reference (directive at slot scope) | Slot | Slot-local; role-typical category inheritance via operator practice | Distributed: `slot_role` enum + `slot_prompt` + surfaced packet reference | Confusing with product-truth (subject) or negative reference (exclusion) |
| Negative / avoid reference | Reference (constraint-as-bound, by exclusion) | Packet (avoid-by-aesthetic) or slot (avoid-by-name) | Avoid-by-aesthetic inherits from brand-system / campaign-world; avoid-by-name is slot-local | Prose-carried; `rejected_assets` held candidate paper-pressed | Confusing with `constraint_rules` (positive-as-bound) or product-truth (positive identity) |
| Governed-output continuity reference | Reference (descriptive + directive composite) | Governed asset acting as upstream input for derivative packet | Operator-mediated cross-packet | Unmodeled at first-class depth; reuse / derivative rules held | Confusing with brand-system reference (global) or product-truth image (upstream descriptive) |

## Normative Hierarchy

The layered IA is a normative hierarchy: each layer carries normative authority over downstream layers, and the inheritance / override / combination / conflict behavior between layers is the normative-hierarchy mechanism the architecture implements. The IA carries eight layers across the four worked-example modes (per [`docs/architecture.md`](architecture.md) and the structured IA model v1). What follows is not re-derivation; it is the normative-hierarchy behavior the layers exhibit when pressed by the reference taxonomy above plus the discretion decomposition below.

### Layers, abbreviated

```text
brand-system          (currently unmodeled; structural decision named not resolved)
category / product-class  (signaled-only)
mode-specific         (varies by mode; absent in SKU mode; present in the other three)
packet                (strongest current carrier)
slot                  (role-specific narrowing)
candidate generation  (transient)
curation seam         (governance-bearing always at seam; authorship-bearing variable site)
governed asset        (durable terminal)
```

### What is shared upstream

- **Brand-system content is shared across all packets, all categories, all collections, all campaigns, all messages under the brand.** It is the most-upstream normative anchor. The hybrid carrier decision surface ([`docs/brand-system-hybrid-carrier-decision-surface-v1.md`](brand-system-hybrid-carrier-decision-surface-v1.md)) tested the three live shapes against the Phase 1 force-kind criterion set; no single shape carries the criterion set cleanly. The implication is a likely three-zone shape if hybrid is the surviving form: structural carriers for stable brand-wide constants + approved references; operator-mediated translation for prose-rich directive content; an unresolved third zone of intake-time judgment trace.
- **Category / product-class content is shared across all packets / collections / campaigns / messages within the category.** Partially inherits from brand-system (the lighting-register cross-category inheritance), partially category-specific (the environment-composition category-specificity). The dining-vs-bedroom contrast pressures this layer's partial-inheritance behavior in a way same-category operational evidence has not.
- **Mode-specific content is shared across all packets within the mode.** Each non-SKU mode adds at least one mode-specific layer between category and packet: collection / grouping; message / offer / communication; campaign concept (plus review-context / campaign-world coherence in campaign mode).

### What is specific downstream

- **Packet content is specific to the packet — the bounded production unit.** Packet carries business_intent, creative_intent, bounded_creative_discretion, products relation, packet-level reference linkage, and the over-loaded aesthetic + intent + (mode-specific overlay) burden the architecture has not relieved.
- **Slot content is specific to the slot — the role-specific narrowing.** Slot adds role identity, role-specific composition direction, slot_prompt prose, and lookup-surfaced inputs. Across all four modes, slot does not currently override packet content; it adds and narrows.
- **Candidate generation is transient by design.** No first-class candidate entity; provenance flows forward into the seam when capture happens.
- **Curation-seam content is bounded to one (or more) generated-asset row.** Governance-bearing curation always lives here; authorship-bearing discretion may or may not, depending on mode and packet.
- **Governed-asset content is durable terminal.** `asset_attachment` carries the asset itself self-contained; downstream consumption surfaces are conceptual, not modeled.

### How references inherit, override, combine

- **Implicit-additive accumulation (Model A) holds where operationally tested.** SKU mode and collection mode operationally exercise the model where each layer's content is supplied as input and conflicts are resolved by the agent's interpretation. PKT-CAMP-004 at bounded depth did not contradict this. Marketing mode is paper-consistent. Apex Named Limitation #2 (no formal precedence rule earned) remains.
- **Reference inheritance is currently lookup-chained at packet → slot.** Packet-level reference linkage (`approved_reference_keys`) surfaces into slot inputs via lookup. Brand-system / category / mode-specific reference content has no structural inheritance into packet; it enters operator-side as instance content via the grounding-note prototype-aesthetic mechanism and downstream prose.
- **Reference override is implicit and operator-mediated.** No structural mechanism elevates a slot reference over a packet reference; no structural mechanism elevates a category reference over a brand-system reference. The agent resolves conflicts at interpretation time. The dining-vs-bedroom contrast surfaces the override question concretely: if a brand-system reference's lighting register is warm-daylit and a category-specific bedroom environment reference shows lower-light pre-sleep mood, which wins? Currently: agent interpretation. The architecture has no formal override surface.
- **Reference combination is structurally additive at packet → slot.** PKT-COLL-001 used REF-002 (studio-world reference) plus per-SKU `product_image` flows for chair (table / lamp / bench had no `product_image` and were rendered from descriptive prose). PKT-CAMP-004 used Warm Restraint campaign-world reference imagery plus per-product imagery. Combination is by addition; weighting is implicit.

### Conflict cases the architecture handles by interpretation

- **Brand-system lighting register vs category-specific environmental light.** A brand whose photography style guide specifies daylit warmth may have a bedroom category whose photographic conventions are evening / low-light. The architecture has no formal precedence; the agent (or the operator at packet-authoring time) decides which to honor.
- **Packet-level voice direction vs slot-level voice instruction.** A campaign packet's voice may say "restrained, observational" while a slot may say "intimate proximity, in-use moment." Whether intimate-proximity is a refinement of observational restraint or a contradiction is resolved by interpretation.
- **Brand-system avoid-list vs packet-level expressive frame.** Warm Restraint's avoid-list rules out rustic-craft register; a packet within Warm Restraint that wants to feature a hand-thrown ceramic detail puts the avoid-list under direct pressure. The architecture has no formal mechanism for negotiating these conflicts; the bounded `refines` reading at PKT-CAMP-004 surfaced authorship-bearing prompt-remediation at OBJECT_VIGNETTE as where this judgment lives in practice.
- **Slot-level exclusion vs packet-level constituent set.** PKT-COLL-001's DETAIL_ADJACENCY excluded the lamp and bench from a packet that names all four as constituents. Slot's exclusion narrowed packet's set without overriding it. The architecture handled this by addition + narrowing, not by override.

### What this implies, named

The layered hierarchy carries reference / constraint inheritance via lookup-chain at packet → slot and via prose discipline above packet. Cross-layer conflicts are resolved by agent interpretation; no formal precedence rule is earned. The model survives the inheritance / override / combination cases the operational evidence has tested; conflict cases surface where the model relies on operator-continuous interpretation rather than operator-independent architecture. The brand-system layer's named decision and the inheritance / override precedence held question are the load-bearing places where the model would gain (or lose) legibility under operational pressure.

## Four-Mode Application

Evidence depth is unequal across the four modes; the architecture has carried full-flow operational pressure in two, bounded full-flow in one, and structural-only in one. The reference taxonomy and layered hierarchy above apply to all four, but the *strength* of each mode's claim varies. The honest depth table:

| Mode | Reference behavior | Discretion behavior | Operational evidence depth |
|---|---|---|---|
| **SKU-driven** | Product-truth image is the primary fidelity anchor; packet-level reference (REF-002 studio-world) is operationally exercised; brand-system / category references implicit | Authorship-bearing discretion concentrates at the curation seam; co-locates with governance-bearing curation; PKT-SKU-009 cross-round authorship-bearing curation | Full-flow at PKT-SKU-007 / 009 / 010 |
| **Collection / merchandising** | Product-truth image (where present) + packet-level reference; cross-axis selection criteria prose-carried; family-coherence reference prose-carried; deflated composite-anchor candidate | Authorship-bearing discretion at the curation seam (cross-round on PKT-COLL-001); cross-axis tradeoff carrying via `capture_reason` / `capture_notes` text | Full-flow at PKT-COLL-001 |
| **Brand campaign / editorial** | Campaign-world reference is mode-specific load-bearing carrier; product-truth image present but conceptually peripheral in the probe scenario (PKT-CAMP-004 anchored on per-product imagery for kitchen prep cycle); directional-reference shape novel at PKT-CAMP-001 cycle 1 rerun | Authorship-bearing discretion *upstream* at prompt-authoring (LIFE_IN_USE) and prompt-remediation (OBJECT_VIGNETTE); governance-bearing curation at seam, with all three curation events `confirmation-bearing` per Phase D | Bounded full-flow at PKT-CAMP-004; structural-proof at PKT-CAMP-001; schema-mirror at the D2C Home-Goods base |
| **Marketing / message-driven** | Marketing/message reference paper-described; product-truth image structurally present but full-flow untested; family-coherence shifts to brand-value-fit across touchpoints (paper) | Curation primarily judges message-fit per cross-mode probe; paper-described only | Structural shape proof at PKT-MSG-001 cycle 1; full-flow untested |

The artifact's claims are bounded by this distribution. Three observations the four-mode application surfaces:

- **Reference function does not split cleanly along mode lines.** Brand-system reference, category reference, product-truth image, and negative reference apply across all four modes; collection / family-coherence reference is collection-specific in scope but not in form; campaign-world reference is campaign-specific; marketing/message reference is marketing-specific. The reference *function* taxonomy is mode-independent; the *content* each function carries is mode-shaped.
- **Discretion sites distribute differently by mode.** SKU and collection modes appear to concentrate authorship-bearing discretion at the curation seam (co-locating with governance-bearing curation). Campaign mode at PKT-CAMP-004 surfaced authorship-bearing discretion *upstream* at prompt-authoring and prompt-remediation, with curation reduced to confirmation. Marketing mode is paper-described. The curation semantic split is a mode-weighted finding, not a uniform architectural claim.
- **The dining-vs-bedroom contrast applies cross-mode in different shapes.** In SKU mode, dining-room SKUs and bedroom SKUs may share a brand-system lighting register but have different environment / supporting-context expectations, which surfaces as category-shaped slot-role conventions and category-specific reference imagery. In collection mode, a multi-category collection (e.g., a "first apartment" collection spanning dining and bedroom) pressures category-coherence cross-cutting collection-coherence — a multi-axis coherence question the architecture has not pressured. In campaign mode, a campaign whose arc moves through dining and bedroom scenes pressures campaign-world coherence under category-environment-difference; this is conceptual pressure the project has not yet operationalized. In marketing mode, message reference may be largely category-agnostic (a "spring refresh" message may apply to dining and bedroom touchpoints alike), but the visual carrier of the message becomes category-specific at slot. The contrast pressures the architecture's category-inheritance behavior at every layer above slot.

## Creative-Discretion Decomposition

Curation is one creative-discretionary site, not the only one. The post-milestone-9 curation semantic split named authorship-bearing discretion (variable site) as distinct from governance-bearing curation (always at the seam). The decomposition below names at least nine discretion sites observed in current evidence, classifies each, and applies the scale-legibility test to its trace.

The classification uses the curation semantic split plus the normative-force pass v1's force-kind vocabulary. Each site is labeled authorship-bearing (creative judgment shapes downstream content), confirmation-bearing (creative judgment ratifies pre-narrowed candidates), governance-bearing (judgment elevates output into governed asset identity), or procedural (judgment routes work through pre-defined steps without authoring content).

### Sites

| Site | Decision type | Constraint source | Evidence required | Trace required | Discretion kind |
|---|---|---|---|---|---|
| **Brand digestion** | What of a brand-system stack moves into IA layers at what specificity | Brand platform; visual identity system; photography style guide; asset library; application guidelines; past campaigns | Brand-system intake artifacts; operator inference under sparse articulation | Currently none load-bearing; held candidates (`articulation_state`; `derivation_basis`; `fallback_chain_position`) paper-pressed | Authorship-bearing (under sparse articulation); confirmation-bearing (under rich articulation) |
| **Reference selection** | Which images become normative anchors at which layer (brand-system, category, packet, slot) | Brand-system asset library; category conventions; packet-level intent; slot-level role | Approved references chosen; operator-stated reasoning | Currently linkage in `reference_assets`; no trace of *why* the reference was chosen vs alternatives | Authorship-bearing |
| **Layer translation** | What moves from brand / category / mode-specific into packet and slot | Brand-system content; category conventions; mode-specific overlay (collection / message / campaign-concept); packet intent | Packet-level intent fields; slot-level role and prose | Currently prose in `business_intent` / `creative_intent` / `bounded_creative_discretion` / `slot_prompt`; no trace of the translation steps | Authorship-bearing (under sparse articulation); procedural (under rich articulation) |
| **Packet authorship** | Defining business_intent, creative_intent, bounded_creative_discretion, products relation, packet-level reference linkage, required output set | Brand-system + category + mode-specific content (upstream); operational scope (downstream) | Packet fields populated; constraint rules linked; reference assets linked | Currently structural carriers exist for *what* the packet says; no carrier for *why* the packet was authored as it was | Authorship-bearing |
| **Slot authorship** | Defining slot_role, slot_prompt, lookup-surfaced inputs, expected output role | Packet content; role-typical conventions; per-slot operational requirements | Slot fields populated; lookup chain wired | Currently structural carriers exist; `slot_evaluation_notes` is partial; the LIFE_IN_USE prompt-authoring observation on PKT-CAMP-004 was captured in evaluation notes but `slot_evaluation_notes` is not a load-bearing trace carrier | Authorship-bearing |
| **Prompt remediation** | Mid-flow modification of slot_prompt after observing candidate drift | Observed drift in candidates; operator's interpretation of where drift came from | Modified slot_prompt; the remediated content | Currently none load-bearing; OBJECT_VIGNETTE remediation on PKT-CAMP-004 was noted but is not preserved structurally | Authorship-bearing |
| **Candidate selection** | Choosing among generated candidates (one or more per slot per round) | Slot prompt; surfaced references; brand-value-fit / message-fit / campaign-concept-fit / role-fit / family-coherence-fit | Source attachment chosen; reasoning content in `capture_notes`; `curation_pattern` chosen | Five-axis provenance + curator + `curation_pattern` at the curation seam (clean structural carrier set) | Authorship-bearing (cross-round) or confirmation-bearing (single-round; agent-vision-proposed) depending on judgment process |
| **Governance-bearing curation** | Elevating chosen candidate into governed asset identity | `governed_output_status` enum transitions; `asset_attachment` populated | Status transitioned; attachment populated; review artifact flag set where applicable | `governed_output_status` + `governed_output_flag` + `asset_attachment` + `slot_status` lifecycle transitions (clean structural carriers) | Governance-bearing (always at seam; co-locates with authorship-bearing in SKU + collection; separates in campaign at PKT-CAMP-004) |
| **Override / exception handling** | When downstream needs override upstream (slot-specific exception to packet's bound; packet-level exception to brand-system aesthetic; etc.) | The conflict surface that surfaces the override question | Modified downstream content; the exception decision | Currently none load-bearing; resolved by agent interpretation under Model A; Apex Named Limitation #2 names this gap | Authorship-bearing or procedural (depending on whether the override invokes a structural rule or operator judgment) |

### Trace gap per site

Focused view across the same nine sites, applying the scale-legibility test directly: which trace dimensions are currently carried in structure, and which currently depend on operator-continuous context.

| Site | Trace currently carried | Trace missing / operator-continuous |
|---|---|---|
| Brand digestion | None load-bearing in repo; intake decisions live operator-side | Why this brand-system content moved into this IA layer at this specificity; what was articulated vs inferred-not-stated |
| Reference selection | Linkage exists (`reference_assets`, `approved_reference_keys`) | Why these references were selected vs alternatives; how candidates were narrowed |
| Layer translation | Resulting prose in `business_intent` / `creative_intent` / `bounded_creative_discretion` / `slot_prompt` | The translation steps themselves; what came from which upstream layer; what was authored downstream |
| Packet authorship | Packet fields populated; constraint rules linked; reference assets linked | Why the packet was authored as it was; what alternatives were considered; what was deferred |
| Slot authorship | Slot fields populated; lookup chain wired; `slot_evaluation_notes` partial | Why the slot was authored as it was; remediation history; rejected drafts |
| Prompt remediation | None load-bearing; only the final modified prompt is preserved | What changed, why it changed, in response to what observed drift; remediation sequence |
| Candidate selection | Five-axis provenance + `curator` + `curation_pattern` (clean structural trace dimensions) | Reasoning content carried as prose in `capture_notes` (in-structure but reasoning is operator-continuous) |
| Governance-bearing curation | `governed_output_status` + `governed_output_flag` + `asset_attachment` + `slot_status` lifecycle transitions | Reuse / derivative governance under cross-packet reference flow; downstream consumption rules |
| Override / exception handling | None load-bearing | The override decision itself; whose authority resolved the conflict; what precedent was set; whether the exception is one-off or pattern |

This table is the scale-legibility lens applied directly. Where structural trace is present, the architecture carries operator-independent legibility at that site. Where structural trace is missing, the architecture currently carries operator-continuous legibility — reconstruction depends on the operator who made the decision remaining in context. The asymmetry is the load-bearing observation; the table does not propose schema to close it.

### What this clarifies

- **Discretion is not concentrated at one site across all modes.** SKU and collection modes appear to concentrate it at candidate selection / governance-bearing curation (the seam). Campaign mode at PKT-CAMP-004 distributed it upstream (slot authorship, prompt remediation) while keeping governance at the seam. Marketing mode is paper-described.
- **Trace requirements differ by site.** Governance-bearing curation has clean structural carriers (status enum + formula + attachment + lifecycle); seam-level candidate selection has clean trace dimensions (five-axis provenance + curator + curation_pattern). Upstream authorship-bearing sites (brand digestion, layer translation, packet authorship, slot authorship, prompt remediation, override / exception handling) have no load-bearing trace carrier in the current architecture; `slot_evaluation_notes` is partial.
- **Confirmation-bearing vs authorship-bearing is determined by the curator's actual judgment process.** Per the Path A finding (PKT-SKU-009) confirmed at PKT-COLL-001 (curator override): `curation_pattern` is determined by the judgment process across the full candidate space, not by proposal cardinality. A single-candidate-per-slot proposal can still produce authorship-bearing curation if the curator weighs against alternative rounds independently.
- **Governance-bearing curation is mode-independent in mechanism, mode-shaped in content.** The carriers carry the same set across all modes; the *content* of what is being governed (fidelity in SKU; grouping-fit in collection; campaign-concept-fit in campaign; message-fit in marketing per paper) is mode-shaped.

### Scale-legibility tests across discretion sites

- **Sites with clean operator-independent trace.** Governance-bearing curation and candidate-selection-as-curation-event carry trace dimensions structurally; a non-author operator can reconstruct *who* decided, *when*, on *what basis* (`capture_reason`), against *what source* (`source_attachment_id`), in *what shape* (`curation_pattern`).
- **Sites that currently rely on operator-continuous context.** Brand digestion, reference selection, layer translation, packet authorship, slot authorship, prompt remediation, and override / exception handling rely on operator-continuous interpretation. The reasoning behind these decisions is reconstructable only if the operator who made them remains in context — and even then often only in part. The minimum-trace question is the load-bearing one for these sites; the normative-force pass v1 named it; this artifact echoes the naming without resolving it.

## Carrier grammar after the creative-discretion doctrine

The creative-discretion doctrine ([`docs/creative-discretion-doctrine-v1.md`](creative-discretion-doctrine-v1.md)) and its IA propagation into [`docs/architecture.md`](architecture.md) sharpened the definition-layer chain — creative intent → creative discretion → aperture → generation / execution → selection → governance. A read-only carrier audit across the four modes (SKU full-flow; collection; the campaign separation case at PKT-CAMP-004; marketing by paper) then tested whether the sharpened chain demands a new carrier. It does not: the chain survives contact with the live carriers as **grammar**, not schema. This section records that carrier grammar. It expands no doctrine and closes no schema.

**The aperture grant lives in `bounded_creative_discretion`.** The field carries the grant by which the brief opens the aperture; the grammar it should answer is fivefold:

- what latitude is granted;
- what may vary within it;
- who owns that latitude — the decision owner, currently the one element the upstream grant most often leaves unnamed (it is named only downstream, at `curator`);
- what standards bound it;
- where and how selection closes it.

Constraints (`constraint_rules`) and references (`approved_reference_keys` / `reference_assets`) remain separate carriers — the discretion field states *what may vary*, not *what may not* (per foundational-premises #3). **No separate aperture / permitted-variance field is currently earned:** the aperture *is* the permitted variance the discretion opens, and `bounded_creative_discretion` already holds it.

**The selection ("makes-true") rationale has a home, conditioned on whether selection and governance co-locate.**

- When selection and governance **co-locate** at the seam (SKU and collection modes), `capture_notes` may carry both the selection rationale — *why this candidate is true to intent* — and the governance record — *what made it durable*. The two acts are one moment; one field carrying both is acceptable.
- When authorship-bearing selection work happens **upstream** (slot authorship, prompt remediation) and governance-bearing curation happens **at the seam** as confirmation — the campaign separation case at PKT-CAMP-004 — the makes-true rationale lives upstream in `prompt_composition_notes` / `slot_evaluation_notes`, and `capture_notes` should cross-reference that upstream rationale while recording the confirmation / governance. The separation case already does this: confirmation-bearing `capture_notes` that point upstream rather than pretending the seam authored the choice.

**No separate selection-rationale carrier is currently earned.** The makes-true rationale is never homeless — it co-locates with governance when the two acts are one moment, and lives upstream with a downstream cross-reference when they separate. The residual is discipline, not schema: record the upstream makes-true rationale in `slot_evaluation_notes` / `prompt_composition_notes` even outside a fork-resolver test, and reference its location from `capture_notes` whenever `curation_pattern` is confirmation-bearing.

## Cross-Cuts: Dining-vs-Bedroom Conceptual Pressure

The dining-vs-bedroom contrast is conceptual pressure on the architecture's category-layer behavior. It is paper-only — the repo's operational evidence is in furniture, with collection mode's calm living-room grouping the cross-category-closest case. The contrast is named because it surfaces what same-category evidence does not pressure.

- **Lighting register inheritance.** A brand-system reference that specifies a lighting register (e.g., low-direct-sun warmth around 4500–5500K with soft diffuse shadows for the D2C home-goods Warm Restraint instance) plausibly inherits cross-category. A dining scene under this register and a bedroom scene under this register share the lighting logic. The architecture's inheritance behavior carries this case via brand-system reference imagery + packet-level inheritance.
- **Environmental composition specificity.** A dining-room scene is table-centric; a bedroom scene is bed-centric. Supporting-context conventions differ category-by-category even under shared brand-system aesthetic. The architecture has no first-class category-environmental-reference carrier; supporting-context content is currently distributed across packet-level reference imagery (which is packet-bound, not category-bound) and slot-prompt prose (which is slot-bound).
- **Cross-category collection pressure.** A multi-category collection (e.g., "first apartment" spanning dining and bedroom) would pressure category-coherence cross-cutting collection-coherence. Two coherence axes operate simultaneously: the collection must hang together as one family, *and* the dining slots must read as dining while the bedroom slots read as bedroom. The architecture's collection-coherence carrier (prose at packet + slot) carries one axis; the category-coherence axis has no structural carrier above the per-SKU level. This pressure is unprobed.
- **Cross-category campaign-arc pressure.** A campaign-arc that moves through dining and bedroom moments (e.g., a "day-into-evening" campaign) pressures campaign-world coherence under category-environment-difference. The campaign-world reference must carry through both environments while each environment's category specificity holds. PKT-CAMP-004 was anchored on KITCHEN_PREP within Warm Restraint; cross-category campaign-arc behavior is unprobed.

The dining-vs-bedroom contrast does not resolve any held question. It clarifies that category-layer inheritance is partial (some content inherits from brand-system; some content is category-local) and that the partial-inheritance behavior is the architectural surface a multi-category brand-system deployment would press.

## Earned vs Held

What the model clarifies at this evidence depth (named without promoting to schema or doctrine):

- **References must be typed by function before they can be modeled by carrier.** Reference function is at least nine-fold, mode-independent in form while the content each function carries is mode-shaped. The reference-function taxonomy is a model attempt; it survives the four pressure cases (PKT-SKU-009; PKT-COLL-001; PKT-CAMP-004; PKT-MSG-001) and the dining-vs-bedroom conceptual contrast without breaking. It does not earn schema; it earns conceptual articulation upstream of carrier modeling.
- **Creative discretion must be decomposed by site before curation / governance semantics can be generalized.** Discretion has at least nine sites, distributed differently by mode. The curation semantic split is articulated as a mode-weighted distribution of authorship-bearing discretion across sites, with governance-bearing curation always at the seam. The decomposition does not resolve the curation-premise architectural fork (named as unresolved at milestone 9); it gives the fork a finer-grained vocabulary that future operational pressure can move against.
- **Category-layer inheritance is partial.** Lighting register plausibly inherits cross-category under shared brand-system aesthetic; environment composition does not. The dining-vs-bedroom contrast clarifies the partial-inheritance behavior the architecture currently handles by implicit-additive accumulation under Model A.
- **Trace asymmetry is named explicitly.** Governance-bearing curation and seam-level candidate selection carry clean structural trace. Upstream authorship-bearing sites (brand digestion, reference selection, layer translation, packet authorship, slot authorship, prompt remediation, override / exception handling) rely on operator-continuous interpretation. The minimum-trace question for upstream judgment force is open.

What remains held — unchanged by this artifact:

- **Brand-system layer structural decision.** Three live shapes (first-class throughout / terminal operator-mediated / hybrid; hybrid most likely on current evidence). Named at milestone 9. The reference-function taxonomy and the partial-inheritance observation pressure the decision; they do not resolve it.
- **Curation-premise architectural fork.** Bounded `refines` reading at PKT-CAMP-004 scope; held for further pressure-testing per Phase D §9. The discretion decomposition above clarifies what the fork is being judged against; does not move it.
- **Apex Named Limitations.** All three carried forward unchanged.
- **Held composite-anchor / structural-carrier candidates.** Collection-mode `grouping_archetype` operationally deflated; campaign-mode `campaign_concept` paper-pressed and operationally held; marketing-mode `messages` / `briefs` / structured slot-message-element fields paper-pressed and operationally held. The reference-function taxonomy does not promote any of these to schema; it articulates what each candidate is a paper-pressed structural carrier *for*.
- **Upstream judgment trace.** The minimum-trace question for brand digestion, reference selection, layer translation, packet authorship, slot authorship, prompt remediation, and override / exception handling. Paper-pressed structural-carrier candidates (`articulation_state`; `derivation_basis`; `fallback_chain_position`; `rejected_assets`; `worked_example_defaults`; `contradiction_log`) named in the normative-force pass v1 and the sparse-articulation fallback pressure note remain held. No held-candidate adjudication map is authored or authorized by this artifact.
- **Cross-base, cross-category, cross-mode operational pressure.** The dining-vs-bedroom contrast is paper; the cross-category cases the contrast surfaces (multi-category collection; cross-category campaign-arc) are unprobed.

What this artifact explicitly does not do:

- Propose schema mutations.
- Adjudicate any held candidate.
- Resolve the brand-system layer structural decision, the curation-premise fork, or any Apex Named Limitation.
- Author orchestration semantics for the durable layer; the gap between machine-readable enumeration plus drift detection (current state) and machine-usable orchestration spec (target) named in [`docs/architecture.md`](architecture.md) is not closed by this artifact.
- Modify the structured IA model v1 or its YAML appendix.
- Authorize Airtable mutation, schema mutation, generation, validator integration, milestone 10, or reader-path cleanup.
- Operationalize the dining-vs-bedroom contrast.

## Self-Superseding Clause

This artifact is a v1 model attempt. It should be superseded by:

- An operational test that pressures the reference-function taxonomy against cross-category or cross-brand evidence at full-flow depth (would extend or refine the partial-inheritance observation).
- An operational test that resolves the minimum-trace question for upstream authorship-bearing discretion at any of the sites named in the discretion decomposition (would move the relevant site between trace-carrier categories).
- A subsequent milestone marker that absorbs the reference-function taxonomy and the discretion decomposition into architecture front-door framing.
- The eventual rewrite of `docs/architecture.md` that consolidates the apex artifact, the Phase 1 mode sketches, the Phase 2 deepenings, the structured IA model v1, the normative-force pass v1, the brand-system hybrid carrier decision surface v1, the brand intake judgment-trace dry run v1, and this artifact into a single current-architecture document.

It does not supersede the apex definition-layer artifact, the four Phase 1 mode sketches, the Phase 1 cross-mode synthesis, the Phase 2 deepenings, the structured IA model v1, the normative-force pass v1, the brand-system hybrid carrier decision surface v1, the brand intake judgment-trace dry run v1, the campaign-mode fork-resolver Phase D findings, milestone 8, or milestone 9. Those remain authoritative for their subject matter; this artifact reads them at reference-function and discretion-decomposition depth without re-deriving content.

## Anchor Documents

### Architectural framing this artifact reads against

- [`docs/architecture.md`](architecture.md): current-architecture front door; *Layers*, *Carriers*, *Held Questions*
- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact; three Named Limitations
- [`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md): canonical structured form (prose + YAML appendix)
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): the IA layered-content redirection that opened the trajectory this artifact extends

### Phase 1 mode sketches + synthesis

- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md): SKU-driven mode layered-content articulation
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md): collection / merchandising mode layered-content articulation
- [`docs/ia-layered-content-sketch-marketing-mode-v1.md`](ia-layered-content-sketch-marketing-mode-v1.md): marketing / message-driven mode layered-content articulation
- [`docs/ia-layered-content-sketch-campaign-mode-v1.md`](ia-layered-content-sketch-campaign-mode-v1.md): brand campaign / editorial mode layered-content articulation
- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md): Phase 1 cross-mode synthesis; carrier-status matrix

### Phase 2 deepenings + fallback pressure

- [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md): photography style guide → IA mapping
- [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](brand-system-input-asset-library-to-ia-mapping-v1.md): asset library → IA mapping
- [`docs/brand-system-input-brand-platform-to-ia-mapping-v1.md`](brand-system-input-brand-platform-to-ia-mapping-v1.md): brand platform → IA mapping (abstraction-angle pressure on brand-system layer)
- [`docs/brand-system-input-visual-identity-system-to-ia-mapping-v1.md`](brand-system-input-visual-identity-system-to-ia-mapping-v1.md): VIS → IA mapping (concrete-constants-angle pressure on brand-system layer)
- [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md): Phase 2 opening sketch
- [`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md): sparse-articulation fallback pressure; six-layer fallback chain; operator-judgment-load-bearing under stress

### Post-milestone-9 pressure sequence

- [`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md): six-kind normative-force model; force-kind criterion set
- [`docs/brand-system-hybrid-carrier-decision-surface-v1.md`](brand-system-hybrid-carrier-decision-surface-v1.md): brand-system three-shape decision surface
- [`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md): brand intake judgment-trace dry run; sparse-articulation walk

### Operational evidence the model pressures against

- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): PKT-SKU-009 full-flow operational evidence
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): PKT-SKU-010 full-flow operational evidence
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): PKT-COLL-001 operational deflation evidence
- [`docs/campaign-mode-fork-resolver-test-phase-d-findings-v1.md`](campaign-mode-fork-resolver-test-phase-d-findings-v1.md): PKT-CAMP-004 bounded `refines` reading; curation semantic split
- [`docs/airtable-marketing-message-driven-cycle-1-findings-v1.md`](airtable-marketing-message-driven-cycle-1-findings-v1.md): PKT-MSG-001 structural shape proof

### Plateau markers

- [`docs/milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md`](milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md): current plateau
- [`docs/milestones/milestone-8-phase-2-structured-model-plateau.md`](milestones/milestone-8-phase-2-structured-model-plateau.md): prior plateau

### Workflow framing

- [`AGENTS.md`](../AGENTS.md): repo-local workflow rules
