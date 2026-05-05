# Non-SKU Mode Operationalization // Decision Note v1

## Purpose

This is a narrow planning / decision artifact comparing the two strongest candidates for the project's first separate-base non-SKU mode operationalization: marketing / message-driven mode and brand campaign / editorial mode. It identifies what each would pressure architecturally, what would change in the apex model under success / partial / failure outcomes, and the tradeoff between architectural pressure, setup cost, operational complexity, risk of under-depth, and expected evidence yield.

It is not a prototype-setup plan. It does not author an Airtable base. It does not specify schema. It does not pre-decide; the choice is held for ASK directional input.

This is the architectural-first entry step for Workstream D2 — operationalize a non-SKU mode in a separate base — held in the apex artifact's Named Limitation #3.

## Posture

```text
one artifact
no airtable mutation
no schema mutation
no prototype setup
no rewrite of architecture.md / apex / predecessor passes
no v2 apex artifact
no authorization for any next path
```

The artifact compares two candidates honestly. ASK chooses the next operational pressure surface (or chooses to defer to a different direction). Permission to be wrong is preserved.

## Why A Separate Base Is Required

The apex artifact ([`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md)) holds three named limitations explicitly. The third — *Marketing-mode and campaign-mode operational evidence; cross-base / cross-category / cross-brand pressure* — is the one this decision note addresses.

The collection-mode operational test ([`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md)) operationalized end-to-end in the *same* base as SKU-driven Furniture v1, in the *same* furniture category, in the *same* brand context. The test produced ten operational findings and partially deflated the composite-anchor strain hypothesis the cross-mode probe sweep had surfaced. But it did not pressure the cross-base boundary.

A separate base is required because:

- the same-base test cannot pressure base-level pressure (schema mutability, namespace conflicts, base-as-tenant boundary)
- the same-category test cannot pressure category-shaped aesthetic conventions (a furniture-category test does not test how the architecture handles, e.g., apparel-category category aesthetics, packaging-category aesthetics, or any cross-category pressure)
- the same-brand test cannot pressure brand-system-context as a layered concern (the aesthetic-layering pass §1 named brand-system context as currently unmodeled; a separate brand context would force the question of whether brand-system aesthetic needs first-class carriers)

Whichever non-SKU mode is operationalized first, the first cross-base test pressures one or more of these boundaries to the extent ASK chooses to vary each. The setup choice (how much to vary in the first test) is itself a load-bearing decision; the variants are named in the next subsection.

### Separate-Base Pressure Variants

- **Cross-base only:** new base, same category, same brand context. Tests whether the architecture carries outside the original prototype base, but does not pressure category or brand variation.
- **Cross-base + cross-category:** new base and new category. Tests whether product truth, slot roles, references, aesthetic conventions, and fidelity anchors survive category shift.
- **Cross-base + cross-brand:** new base and new brand context. Tests brand-system aesthetic, brand-overlay constraints, and inheritance/override more directly.
- **Full pressure:** new base + new category + new brand context. Highest evidence yield, highest setup cost, highest risk of under-depth, and hardest attribution.

The first D2 test should choose deliberately where it sits on this gradient.

## Diagnostic Caveat for Outcomes

Any failure outcome in the candidate analyses below would require diagnosis before being interpreted as schema pressure. Tooling limitation, under-specified setup, weak references, or insufficient operational depth must be separated from architectural failure. This is especially important for campaign mode, where high setup cost raises the risk that "failure" reflects underbuilt setup rather than the architecture.

## Candidate One // Marketing / Message-Driven Mode

### Architectural uncertainty pressured

Marketing mode's Layer 2 fidelity anchor is composite — a subject (product, person, scene) plus a message archetype (offer, claim, callout, brand-identifier emphasis). The cross-mode probe ([`docs/cross-mode-probe-marketing-message-driven-v1.md`](cross-mode-probe-marketing-message-driven-v1.md)) identified this composite anchor as a paper-predicted strain point.

Operationalizing marketing in a separate base would pressure:

- Whether the composite anchor (subject + message archetype) can be carried by disciplined prose at the packet level (`creative_intent`, `bounded_creative_discretion`) plus slot-level message-bearing instructions, or whether structured representation (e.g., a `messages` first-class entity, or message-archetype attributes) is earned by operational pressure
- The *carrier-boundary* question from vocabulary pass §2, applied to message-bearing elements specifically: offer text, brand-identifier presence, callout emphasis, regulatory disclosures
- The selection-axis classification for curation: how does a curator at the curation seam evaluate fidelity to a *message archetype* (e.g., "this image carries the offer cleanly") vs fidelity to product truth?
- The cross-base boundary at minimum; cross-category and cross-brand depending on setup choices

### What would change in the apex model

**Success.** The composite anchor (subject + message archetype) carries via prose and packet-level reference linkages. Same layered shape holds across mode + cross-base. The apex's "scoped mode-independent" claim strengthens; the marketing-mode strain hypothesis is partially deflated similar to collection mode. Composite-anchor schema mutation moves further from earned. Apex v2 would carry one more operational mode at probe-depth + operational-depth.

**Partial.** Some message-bearing axes carry by prose; others fail. The pass identifies specific structural carriers earned at specific layers (e.g., a `messages` table linked to packets, or `message_archetype` attributes on packets). Apex v2 would name these as earned schema mutations and revise Named Limitation #1.

**Failure.** If diagnostic review rules out tooling limitation, under-specified setup, weak references, and insufficient operational depth, a marketing failure would indicate that message-bearing elements require structural representation: prose alone cannot carry inclusion / exclusion / placement of message components reliably. The architecture's prose-vs-structural-representation boundary would have moved structurally for marketing mode. The apex's Named Limitation #1 would partially resolve into specific carriers; Named Limitation #2 may also pressure if message-archetype elements need to override packet defaults.

### Setup Cost / Operational Complexity / Evidence Yield

Marketing mode has lower setup cost as a first cross-base operationalization. The packet shape stays close to SKU-driven mode (subject + message instead of subject alone). Slot roles are role-shape-similar to SKU (HERO with offer, DETAIL with callout). The base setup is closer to a same-shape rebuild than a new-shape build.

Operational complexity is moderate. Risk of under-depth is lower because the role-shape continuity from SKU mode lets the packet operationalize at depth without inventing new role conventions.

Expected evidence yield is lower-to-moderate. Marketing mode's strain points (message-bearing element representation) may be tractable enough by prose that the test deflates the hypothesis without producing the pressure that would force schema mutation. A successful marketing test could produce findings analogous to collection mode's test: "the existing schema carries it cleanly; composite-anchor mutation is *less* earned." This is a real outcome but a less-architecturally-informative one than failure or partial.

## Candidate Two // Brand Campaign / Editorial Mode

Campaign / editorial is the sharper aesthetic-inheritance test. It pressures whether aesthetic remains packet-local prose/reference discipline, or whether brand-system, mode/category, campaign-world, and slot-level carriers need first-class representation and explicit inheritance/override behavior. This ties campaign mode directly to the apex artifact's Named Limitation #1 and to the Model A vs Model B question the aesthetic-layering pass §8 named as load-bearing.

### Architectural uncertainty pressured

Campaign mode's Layer 2 fidelity anchor is composite — a campaign concept plus family-level continuity. The cross-mode probe ([`docs/cross-mode-probe-brand-campaign-editorial-v1.md`](cross-mode-probe-brand-campaign-editorial-v1.md)) surfaced two distinctive findings: `products` becomes peripheral when the campaign concept is the fidelity anchor, and review-artifact placement is more structurally load-bearing in campaign mode than in any of the other three modes.

Operationalizing campaign in a separate base would pressure:

- Whether the campaign concept can be carried at packet level via disciplined prose plus reference linkages, or whether it earns first-class structural representation (e.g., a `campaign_concept` entity or `campaign_concept` attributes that span packets)
- *Products-becoming-peripheral.* If campaign mode's primary fidelity anchor is the campaign concept, then `products` may become a secondary input rather than the relational center. The architecture currently treats `products` as a primary packet-level link; campaign mode operationally would test whether this primacy generalizes
- Family-level coherence at *across-packet* level. Campaign mode's "family-level continuity" pressures coherence not only across slots within a packet (the family-coherence question SKU and collection mode addressed) but across packets within a campaign world. The architecture has no first-class carrier for cross-packet continuity
- Review-artifact load. Per [`docs/review-artifacts-optional-vs-load-bearing-note.md`](review-artifacts-optional-vs-load-bearing-note.md), campaign mode is the mode where review artifacts (board-shaped curation, family-coherence reviews) appear most structurally load-bearing. The packet-level curation seam may not be sufficient; campaign-mode curation may need a higher-level seam
- *Aesthetic inheritance and override.* Campaign mode's editorial framing requires the most layered aesthetic specification across the architecture's seven layers. The aesthetic-layering pass ([`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md)) named aesthetic layering as the deepest unresolved problem; campaign mode would pressure Model A (implicit-additive) vs Model B (layered precedence with explicit override) operationally
- The cross-base boundary, cross-category boundary, and cross-brand boundary simultaneously (campaign work is most naturally tested in a brand context different from the SKU base's furniture context, since editorial work is brand-shaped at every layer)

### What would change in the apex model

**Success.** Campaign concept + family-level continuity carries via packet-level prose plus per-packet reference linkages and slot_prompt language. Products-peripheral case validated; same layered shape holds across mode + cross-base + cross-category + cross-brand. The apex's "scoped mode-independent" claim strengthens substantially. Architectural pressure from campaign mode is partially deflated. Aesthetic-inheritance Model A holds operationally for campaign mode.

**Partial.** Specific axes carry by prose; others fail. The pass identifies which pressures are operational vs paper-only. Possible findings: campaign concept needs structural representation; family-level continuity needs cross-packet linkage; review artifacts need higher-level seam; aesthetic Model B earned for one or two layers. Apex v2 would carry several earned schema mutations and revise multiple named limitations.

**Failure.** If diagnostic review rules out tooling limitation, under-specified setup, weak references, and insufficient operational depth, a campaign failure would indicate that campaign-mode pressures are real-operational, not paper-predicted. The architecture may need structural shifts at multiple layers: `campaign_concept` first-class carrier; cross-packet continuity carrier; review-artifact entity at a higher seam; or aesthetic Model B earned because additive accumulation cannot resolve the layered conflicts campaign aesthetics produce. Apex v2 would be substantially different from v1.

### Setup Cost / Operational Complexity / Evidence Yield

Campaign mode has higher setup cost as a first cross-base operationalization. The packet shape may need to differ from SKU-driven mode (campaign concept as primary anchor; products peripheral). Slot roles may not map to SKU roles cleanly (a campaign packet may have HERO_WORLD, DETAIL_LIFESTYLE, OBJECT_VIGNETTE, EDITORIAL_PORTRAIT — none of which mirrors SKU mode's role-shape). "World-building" requires layered aesthetic specification at multiple layers, which the architecture currently carries only at packet and slot.

Operational complexity is higher. Risk of under-depth is higher because campaign mode's pressures (cross-packet continuity, family-level coherence, aesthetic inheritance) only emerge at multi-packet operational depth; a single-packet campaign mode test would fail to pressure those dimensions.

Expected evidence yield is correspondingly higher, conditional on operational depth being achieved. Campaign mode pressures more dimensions simultaneously than marketing does — aesthetic inheritance, products-peripheral, family-level continuity, review-artifact load, cross-packet linkage. The pass is more likely to produce architecturally-informative findings (success, partial, or failure) than marketing's pass, but the failure mode of "underbuilt setup looking like architectural failure" is real and is what the Diagnostic Caveat above flags.

## Comparative Analysis

The tradeoff is between architectural pressure, setup cost, operational complexity, risk of under-depth, and expected evidence yield.

| Dimension | Marketing | Campaign |
|---|---|---|
| Architectural uncertainty pressured | Composite anchor (subject + message); message-bearing element carriers | Composite anchor (campaign concept + continuity); products-peripheral; cross-packet continuity; review-artifact load; aesthetic inheritance Model A vs B |
| Layers of architecture pressured | Packet, slot, curation seam | Brand-system context, mode/category, packet, cross-packet, slot, references cross-cutting, curation seam |
| Base setup cost | Moderate (close to SKU shape) | Higher (campaign-shape may differ structurally) |
| Cross-base boundary | Pressured | Pressured |
| Cross-category boundary | Variable (depends on setup choice) | Strongly pressured (campaign work is naturally cross-category from furniture) |
| Cross-brand boundary | Variable (depends on setup choice) | Strongly pressured (editorial work is brand-shaped at every layer) |
| Most likely outcome character | Success or partial-with-narrow-strain (similar to collection mode) | Partial or failure (more pressures live; sharper test) |
| Architectural information yield | Lower-to-moderate | Higher |
| Apex v2 distance from apex v1 if test produces pressure | Modest (one mode added at operational depth, possibly one schema mutation) | Substantial (multiple structural shifts possible; aesthetic Model B may be earned; apex v2 may need restructuring) |

The pattern is:
- **Marketing** has lower setup cost and lower risk of under-depth, but likely lower architectural yield. Best candidate if the goal is *establishing a workable cross-base operationalization pattern* with manageable setup cost.
- **Campaign** has higher setup cost and higher risk of operational under-depth, but likely higher architectural yield. Best candidate if the goal is *maximum architectural pressure on the apex's named limitations*, especially the aesthetic-layering question Named Limitation #1 holds.

A third pattern is *marketing first, campaign later* — operationalize marketing as the first cross-base test (lower-stakes warmup; establishes the cross-base operationalization workflow), then campaign with the workflow already proven. This sequence trades total elapsed time for risk reduction at each step.

A fourth pattern is *neither yet, do another aesthetic refinement first* — Option 2 from the aesthetic-layering pass §10. This pattern is consistent with a posture that says: settle Model A vs Model B *conceptually* before pressuring it operationally. The risk is that conceptual refinement without operational pressure stays in paper-prediction territory, the same risk the aesthetic-layering pass already named.

## What ASK Chooses Between

The directional fork carried forward from the apex artifact's Named Limitation #3 and the aesthetic-layering pass §10, sharpened here:

- **Option D2-Marketing: Operationalize marketing / message-driven mode in a separate base.** Lower setup cost; lower risk of under-depth; lower architectural yield; most likely outcome character is success or partial-with-narrow-strain.
- **Option D2-Campaign: Operationalize brand campaign / editorial mode in a separate base.** Higher setup cost; higher risk of under-depth; higher architectural yield across more layers; most likely outcome character is partial or failure (sharper architectural test).
- **Option D2-Sequenced: Marketing first, then campaign.** Total elapsed time higher; risk-reduction at each step; cross-base workflow established by marketing operationalization before campaign-specific pressures land.
- **Option D2-Defer: Run another aesthetic-pass refinement before any cross-base operationalization.** Continued architecture consolidation; no operational evidence; same risk of paper-prediction the aesthetic-layering pass §10 named for Option 2.

A sub-question for whichever D2 option is chosen: how much to vary in the first test. Cross-base only (same furniture category, same brand context) tests the lightest possible cross-base pressure but does not pressure cross-category or cross-brand. Cross-base + cross-category + cross-brand together produces maximum pressure but increases setup cost and reduces the cleanness of attribution (which boundary produced which finding).

This is held for ASK directional input, not pre-decided.

## What This Artifact Is NOT

- Not an Airtable base setup plan. No base structure, table list, field list, or schema is specified.
- Not a prototype direction. No prototype chain is opened.
- Not a v2 apex definition-layer artifact.
- Not a rewrite of [`docs/architecture.md`](architecture.md), the apex artifact, or any predecessor pass.
- Not a rewrite of the cross-mode probe artifacts. Those remain authoritative for their subject matter.
- Not authorization for any next path. The directional fork above is held for ASK.
- Not a settlement of the "how much to vary in the first test" sub-question. That choice is named but not pre-decided.

## Anchor Documents

### Architectural anchors

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): v1 apex definition-layer artifact; Named Limitation #3 holds the cross-base / cross-category / cross-brand evidence absence this artifact addresses
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic-layering pass; identifies aesthetic inheritance / override as the deepest unresolved architectural problem, which campaign mode would pressure most
- [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md): vocabulary precision pass; carrier-boundary distinction shapes how each mode's structural-representation question gets framed

### Cross-mode probe artifacts (paper-only)

- [`docs/cross-mode-probe-marketing-message-driven-v1.md`](cross-mode-probe-marketing-message-driven-v1.md): marketing-mode paper probe; identifies composite anchor strain
- [`docs/cross-mode-probe-brand-campaign-editorial-v1.md`](cross-mode-probe-brand-campaign-editorial-v1.md): campaign-mode paper probe; surfaces products-peripheral, campaign-concept-as-anchor, family-level continuity, and aesthetic-layering pressure

### Same-base operational evidence

- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): same-base same-category collection-mode operational test; demonstrates that the cross-base boundary remains untested by current evidence

### Cross-mode pressure framing

- [`docs/four-mode-truth-and-constraint-pressure-note.md`](four-mode-truth-and-constraint-pressure-note.md): four-mode comparison across single-item truth, relational truth, message-bearing discipline, and campaign coherence
- [`docs/shared-vs-mode-weighted-pressure-note.md`](shared-vs-mode-weighted-pressure-note.md): shared versus mode-weighted pressure
- [`docs/review-artifacts-optional-vs-load-bearing-note.md`](review-artifacts-optional-vs-load-bearing-note.md): review-artifact placement; identifies campaign mode as the mode where review artifacts are most structurally load-bearing
