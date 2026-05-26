# Evidence-Depth Asymmetry Assessment Brief v1

## Posture

```text
architecture-hardening assessment brief
evidence-depth assessment only
reads current evidence depth across modes, substrates, and consumer surfaces after the post-milestone-12 hardening arc
not an operational test
not an Airtable mutation plan
not schema
not validator / orchestration
not structured IA v3
not held-candidate adjudication map
not milestone marker
not architecture.md rewrite
not grounding-note v59
not memory write
not a candidate-next-pressure-surface queue
self-superseding when an operational test materially changes the evidence state, when the assessment is materially superseded by a later plateau, or when an asymmetry currently described as not-dominant becomes consumer-blocking
```

This brief assesses the evidence-depth asymmetry the post-milestone-12 hardening arc preserved as a still-open critique item. It classifies the asymmetry into types, maps current evidence across modes and architectural surfaces, identifies which asymmetries are actually load-bearing now, classifies pressure types without choosing one, and recommends against immediate test pressure unless a dominant asymmetry is identified.

The brief carries the same risk it tries to discipline: it is a fifth planning / analytical pass after PRs #275 / #277 / #278 / #279, and a habit of stacking planning briefs would itself become a proof-chain trap. The discipline applied here: this is a meta-assessment that reads across the architecture's evidence rather than another consumer-pressure pass against a specific architectural surface. The brief produces a classification, not another candidate queue.

## 1. The Evidence-Depth Problem

The post-milestone-12 hardening arc closed at execution depth with PR #279's compression of the architecture front door. The compressed front door explicitly preserves evidence depth as:

- **Operationally grounded full-flow**: SKU-driven mode (PKT-SKU-007 / 009 / 010); collection / merchandising mode (PKT-COLL-001); brand campaign / editorial mode at PKT-CAMP-004-KITCHEN_PREP at bounded depth (one packet; three slots).
- **Structurally proven; not full-flow operationally pressured**: marketing / message-driven mode (PKT-MSG-001, cycle 1, `findings-only`); brand campaign / editorial mode at PKT-CAMP-001 (cycle 1 rerun) plus Phase 1 Campaign-Driven D2C Home-Goods v1 base setup (95-field schema mirror in a separate base).
- **Paper-pressed; not yet operationally tested**: roughly fifteen schema / carrier candidates inventoried in the architecture's Held Questions section.

This asymmetry is not new. Apex Named Limitation #3 ("cross-base / cross-category / cross-brand pressure plus marketing-mode and campaign-mode operational evidence at full-flow depth — partially earned") has carried it forward across milestones. The post-milestone-9 carrier-shape arc added a second asymmetry shape: every operational pressure test in that arc (PR #254 / PR #258 / PR #260 / PR #266 / PR #270) ran against the same synthetic kitchen-textiles substrate with one fresh reader. PR #275's application-consumer pressure pass and PR #277's structured-consumer preflight added a third asymmetry shape: consumer-depth (one application consumer at conceptual depth; zero structured consumers live; seven candidate consumers named at preflight depth).

The question the brief asks: *which asymmetry actually matters now, given that none of the three forms has direct consumer pull from a live operational substrate?*

## 2. Evidence-Depth Categories

The brief uses the following categories, drawing from the architecture's current vocabulary and the post-milestone-12 work:

- **Operationally grounded full-flow** — generation → curation → governance carried cleanly at a specific packet; multiple packets at the same mode add depth
- **Bounded operational depth** — single-packet operational presence without breadth (campaign at PKT-CAMP-004 is the canonical example)
- **Structurally proven** — schema mirror confirmed at first-pass depth without full-flow generation / curation / governance
- **Paper-pressed** — articulated as a held candidate against the architecture's vocabulary; not earned by operational pressure
- **Synthetic-substrate-only** — operationally tested but against one author's one-time synthetic stack; cross-substrate generalization unearned
- **Application-consumer validated** — consumed by a live application-layer artifact grammar (currently one consumer at conceptual depth)
- **Structured-consumer preflighted** — assessed against the v2 YAML appendix for what a programmatic consumer could read (PR #277); no structured consumer currently live
- **Untested / held** — no evidence pressure of any kind; explicit held-question marker

The categories are not strictly ordered. Operational full-flow at one mode is stronger than structural proof at the same mode; synthetic-substrate-only operational depth is stronger than paper-pressed; application-consumer validation is qualitatively different from operational full-flow because it pressures a different surface (consumer pull, not generation reliability).

## 3. Current Evidence by Worked-Example Mode

### SKU-driven product imagery

- **Current strongest evidence**: operationally grounded full-flow across PKT-SKU-007 / 009 / 010 (five-axis provenance + curator + `curation_pattern` + `asset_attachment` carry cleanly).
- **Current limits**: single category (furniture); single brand context; multi-mode interaction with collection / marketing / campaign at structural depth only.
- **What would raise the evidence level**: cross-category SKU pressure (apparel; food; cosmetics) at full-flow depth; cross-brand SKU pressure (deploying SKU-driven flow against a second brand stack) at full-flow depth.
- **What would not materially change the evidence level**: more furniture-category packets (returns diminish); more synthetic-substrate carrier tests on SKU-mode (substrate concentration would deepen, not broaden, the evidence).

### Collection / merchandising

- **Current strongest evidence**: full-flow at PKT-COLL-001 (paper-strain composite-anchor mutation operationally deflated; prose discipline carried 1:N constituent enumeration cleanly).
- **Current limits**: single collection packet at full-flow; cross-collection pressure unearned; cross-category collection unearned (only furniture).
- **What would raise the evidence level**: a second collection packet under different intent (different family-coherence pattern; different exclusion logic); cross-category collection (e.g., apparel capsule vs furniture collection).
- **What would not materially change the evidence level**: another furniture-collection packet with the same family-coherence pattern.

### Marketing / message-driven

- **Current strongest evidence**: structural proof at PKT-MSG-001 (cycle 1, `findings-only`); no full-flow generation / curation / governance.
- **Current limits**: no full-flow operational evidence; structured slot-message-element fields, composite fidelity-anchor, and selection-axis enum classification all paper-pressed; cross-mode composite-anchor strain partially deflated on the collection side and held on the marketing side.
- **What would raise the evidence level**: full-flow operational pressure at PKT-MSG-001 or a successor marketing packet (generation → curation → governance cleanly carried); this would close Apex Named Limitation #3's marketing branch.
- **What would not materially change the evidence level**: more `findings-only` cycles at the same depth; additional paper-pressed mutation proposals.

### Brand campaign / editorial

- **Current strongest evidence**: bounded full-flow at PKT-CAMP-004-KITCHEN_PREP (three slots; three `generated_assets` rows; all three curation events `confirmation-bearing`; upstream authorship-bearing work at LIFE_IN_USE prompt-authoring and OBJECT_VIGNETTE prompt-remediation; Phase D bounded `refines` reading). Plus structural proof at PKT-CAMP-001 cycle 1 rerun and Phase 1 D2C Home-Goods v1 base setup (cross-base + cross-brand evidence at bounded depth).
- **Current limits**: single packet at full-flow; bounded depth (one packet's three slots); single brand context for the operational packet (the D2C base setup is cross-brand but not yet operational); cross-mode interaction tested only at structural depth.
- **What would raise the evidence level**: a second campaign packet at full-flow depth under different campaign-concept pressure (would broaden the `refines` reading); operationalizing the D2C base to full-flow against the Warm Restraint envelope (would close the cross-brand operational gap).
- **What would not materially change the evidence level**: another PKT-CAMP-001-style rerun at the same depth; additional structural-only base-setup work.

### Cross-mode summary

The architecture's mode-evidence asymmetry is honest: two modes are operationally grounded at full-flow; one is bounded full-flow + structural; one is structural only. Apex Named Limitation #3 already names this. The asymmetry has been carried as a held question through milestones 7 → 12 without operational pressure closing it.

## 4. Current Evidence by Architectural Surface

### Brand discovery / digestion

- **Evidence depth**: synthesis at PR #241 + PR #244 (layered intake architecture; six-category synthesis). Operationally pressured only via the brand intake judgment-trace dry run (PR #248 substrate) — one author, one synthetic stack.
- **Substrate concentration**: kitchen-textiles synthetic stack carries all current operational evidence for brand-discovery-digestion.
- **Dependency on operator continuity**: high. The dry run made operator continuity the load-bearing carrier for intake-time reasoning. Multi-operator continuity-break pressure surfaced this honestly (PR #250).
- **What pressure would matter**: a real brand-stack intake (not synthetic) at any depth; alternatively, a second synthetic stack at different category register / different sparsity pattern.

### Layered IA model

- **Evidence depth**: synthesis at PR #239 (eight layers; reference-function taxonomy; discretion decomposition); operationally grounded for SKU + collection at packet-and-seam carrier depth.
- **Substrate concentration**: same as SKU + collection mode evidence (furniture; single brand).
- **Dependency on operator continuity**: medium. Some layer carriers are structurally explicit (`reference_assets`; `asset_attachment`; `curation_pattern`); some are prose-carried (`bounded_creative_discretion`; brand-system content).
- **What pressure would matter**: cross-mode layered-IA pressure at marketing full-flow or cross-brand full-flow.

### Curation semantic split

- **Evidence depth**: synthesis at PR #239 + Phase D fork-resolver test; operationally observed at PKT-CAMP-004 (authorship surfaced upstream; governance at the seam).
- **Substrate concentration**: one campaign packet for the separation observation; SKU + collection evidence supports co-location.
- **Dependency on operator continuity**: low. The split is conceptual; the carriers operate at structural depth where they exist.
- **What pressure would matter**: a marketing-mode full-flow that surfaces a different separation pattern; a second campaign packet that confirms or refines `refines`.

### Brand-system carrier decision / Zone 1B

- **Evidence depth**: surface narrowing earned at PR #248 (Zone 1A structurally earned; Zone 1B held; Zone 2 deliberate prose; Zones 3–6 rerouted).
- **Substrate concentration**: no operational pressure on Zone 1B; only paper-pressure from VIS deepening.
- **Dependency on operator continuity**: the prose-only Zone 2 is operator-continuity-dependent by design.
- **What pressure would matter**: a real brand stack with named visual-identity constants beyond approved references demanding structural representation.

### Option F intake-time judgment trace

- **Evidence depth**: operationally supported at one-reader / one-substrate / mocked-shape depth across no-contradiction (PR #254), single-contradiction (PR #258), and multi-contradiction (PR #260) substrates. Carrier-shape choice sharpened-not-closed.
- **Substrate concentration**: kitchen-textiles synthetic stack only.
- **Dependency on operator continuity**: the carriers themselves were tested under simulated continuity-break; mocked carriers carry across the break.
- **What pressure would matter**: multi-reader replication; cross-substrate; symmetric remock test of an unmocked carrier alternative; growth-pressure substrate.

### Intake-reference rationale

- **Evidence depth**: same shape as Option F. One-reader / one-substrate / mocked-shape depth (PR #266). R-C vs R-D held.
- **Substrate concentration**: same kitchen-textiles substrate.
- **Dependency on operator continuity**: similar to Option F.
- **What pressure would matter**: symmetric R-C mock; growth-pressure reference-rationale substrate; cross-substrate test.

### Zone 4 reuse-time governance

- **Evidence depth**: one-reader / one-substrate / mocked-shape depth (PR #270). Z4-C vs Z4-D held.
- **Substrate concentration**: same kitchen-textiles substrate.
- **Dependency on operator continuity**: similar.
- **What pressure would matter**: symmetric Z4-D mock; cross-substrate; multi-source governed-output reuse; cross-time reuse.

### Artifact grammar / application consumer

- **Evidence depth**: one application-layer artifact grammar landed (PR #274); one consumer-pressure pass against it (PR #275). No artifact-grammar instance produced against a deployment.
- **Substrate concentration**: zero deployment instances. The grammar is conceptually validated; the consumer-pressure pass validated the grammar against the architecture, not against a real deployment.
- **Dependency on operator continuity**: the grammar is designed for method-user (B) journey; method-user implies operator continuity by default.
- **What pressure would matter**: an artifact-grammar instance produced against a real or realistic deployment context; this would surface what the grammar actually generates and where it strains.

### Structured IA v2 / structured consumer

- **Evidence depth**: structured form landed at PR #246 (17-key YAML appendix); preflight assessment at PR #277. No structured consumer live.
- **Substrate concentration**: n/a (no consumer).
- **Dependency on operator continuity**: the YAML appendix is consumer-independent; the prose surrounding it is operator-readable.
- **What pressure would matter**: a structured consumer that programmatically reads the YAML — even a preflight implementation against one of the seven candidate consumers PR #277 named would test what v2 actually supports at execution depth.

## 5. Asymmetry Types

The brief distinguishes six asymmetry types, each operating along a different axis:

- **Cross-mode asymmetry**: evidence depth varies across the four worked-example modes. SKU + collection at full-flow; campaign at bounded full-flow + structural; marketing at structural only. The Apex Named Limitation #3 axis.
- **Cross-substrate asymmetry**: operational evidence concentrated on the kitchen-textiles synthetic stack for all post-milestone-9 carrier-shape work. Multiple operational tests against one substrate. The "honest about both limits" axis the Zone 6 / Option F arc explicitly carried.
- **Cross-brand / cross-category asymmetry**: SKU + collection full-flow against one furniture brand context; campaign cross-base evidence at D2C structural depth only (no operational full-flow). No second-brand operational depth at any mode.
- **Consumer-depth asymmetry**: one application-layer consumer (artifact grammar) at conceptual depth; zero structured consumers live; seven candidate structured consumers named at preflight depth; zero deployment instances against any consumer.
- **Operational-vs-conceptual asymmetry**: the architecture has rich conceptual articulation (layered IA; reference-function taxonomy; discretion decomposition; carrier-shape vocabulary; force-kind vocabulary; cross-category relation vocabulary) and substantially less operational ground-truth across modes / substrates / consumers.
- **Reader/operator generalization asymmetry**: every operational pressure test in the post-milestone-9 carrier-shape arc used one fresh reader. Multi-reader replication is unearned across all three axes. The "single-author continuity" assumption is operationally untested at scale.

These types overlap — cross-substrate asymmetry within the Zone 6 / Option F arc is also reader-generalization asymmetry; cross-brand asymmetry is partly cross-category asymmetry — but the types remain useful as analytical handles.

## 6. Which Asymmetries Are Load-Bearing Now

The most consequential question. The brief evaluates each asymmetry against four sub-questions: (a) blocks current architecture claims; (b) blocks stronger future claims only; (c) acceptable because current consumer doesn't need it; (d) most likely to matter if hardening continues.

### Cross-mode asymmetry

- **Blocks current architecture claims?** Not as currently stated. The architecture front door honestly hedges: "Schema is mode-independent at structural level ... full-flow operational depth varying per the rows above." Apex Named Limitation #3 names the asymmetry. The architecture claims schema-portability at structural depth and operational ground-truth only where it has it.
- **Blocks stronger future claims?** Yes. A claim that the architecture works in marketing or in expanded campaign mode at full-flow depth would require operational evidence the architecture does not currently have.
- **Acceptable because the current consumer doesn't need it?** Partially. The artifact-grammar consumer (PR #274) operates against a deployment context; it does not directly demand cross-mode evidence. But the grammar's diagnosis and target-state-recommendation sections lean on the layered IA's structural claim — a grammar instance generated for a marketing-heavy deployment would be generating recommendations against a mode the architecture has never operationally exercised. The exposure is indirect, not direct.
- **Most likely to matter if hardening continues?** Yes. If the architecture moves toward producing artifact-grammar instances against real deployments, cross-mode asymmetry becomes silently relevant. If method.md / problem-and-approach.md get refreshed to absorb the post-milestone-12 framing, the orientation surfaces will be claiming more breadth than the architecture has operationally pressured.

### Cross-substrate asymmetry (post-milestone-9 carrier-shape arc)

- **Blocks current architecture claims?** No. Every artifact in the arc names the substrate concentration honestly; milestones 11 and 12 absorb the limit explicitly.
- **Blocks stronger future claims?** Yes. A claim that any carrier-shape pattern earned in the arc generalizes beyond kitchen-textiles substrate would require cross-substrate testing.
- **Acceptable because the current consumer doesn't need it?** Yes. PR #275's consumer-pressure pass placed cross-substrate generalization in the indefinite-park bucket for the current application-grammar consumer. PR #277's preflight names cross-substrate as conditional — needed only if a structured consumer demands it.
- **Most likely to matter if hardening continues?** Only if a structured consumer surfaces or if the arc's carrier-shape vocabulary becomes consumer-facing. Neither is currently live.

### Cross-brand / cross-category asymmetry

- **Blocks current architecture claims?** Honestly hedged via the D2C base setup ("cross-base + cross-brand evidence at bounded depth"). Not blocked at structural depth.
- **Blocks stronger future claims?** Yes for "the architecture deploys cleanly against arbitrary brand stacks" or "the brand-system architecture works cross-category." Both unearned.
- **Acceptable because the current consumer doesn't need it?** Partially. The artifact grammar accepts any brand stack as deployment context; it does not require the architecture to have operationally exercised that brand or category. But a deployment instance produced for a brand the architecture has never seen at any operational depth would test cross-brand claim at the consumer surface.
- **Most likely to matter if hardening continues?** Yes if real-deployment artifact-grammar instances are produced; no if the architecture stays in synthetic-substrate development.

### Consumer-depth asymmetry

- **Blocks current architecture claims?** No. The architecture's claims about consumer depth are honest: one conceptual consumer live; zero structured consumers live; preflight names seven candidates without authorization.
- **Blocks stronger future claims?** Yes for any claim about machine-usability beyond conceptual-consumer depth.
- **Acceptable because the current consumer doesn't need it?** Tautologically yes — the current consumer is itself the depth.
- **Most likely to matter if hardening continues?** Yes. If structured IA v3 / validator / orchestration becomes pressing, consumer-depth asymmetry will be the gating asymmetry.

### Operational-vs-conceptual asymmetry

- **Blocks current architecture claims?** This is the architecture-wide shape, not a specific claim block. The architecture has consistently named conceptual claims as conceptual and operational claims as evidence-scoped.
- **Blocks stronger future claims?** Yes for any claim that the architecture's conceptual articulation matches operational behavior at full breadth.
- **Acceptable because the current consumer doesn't need it?** Partially. Conceptual articulation is what the artifact-grammar consumer reads. The asymmetry only matters if the consumer's conceptual reads turn out to misrepresent operational behavior at deployment time.
- **Most likely to matter if hardening continues?** Yes for external positioning. The conceptual richness is what an external reader would encounter; operational shallowness across modes becomes a credibility surface when stronger external claims are made.

### Reader/operator generalization asymmetry

- **Blocks current architecture claims?** No. Every carrier-shape arc artifact names the single-reader limit honestly.
- **Blocks stronger future claims?** Yes for any claim about operator-independent legibility — directly named as the Scale-of-Operation Held Question.
- **Acceptable because the current consumer doesn't need it?** Yes for the method-user (B) first-pass default. Method-user assumes operator continuity by design.
- **Most likely to matter if hardening continues?** Yes if the self-serve user (A) reading from the first-user-journey work becomes active; A presupposes operator-independent legibility.

### Summary load-bearing read

No asymmetry currently blocks a stated architecture claim — the architecture has consistently hedged honestly. Multiple asymmetries block stronger future claims. The asymmetries most likely to become consumer-blocking under continued hardening are, in rough order: **cross-mode** (artifact-grammar deployment instances would silently surface it); **cross-brand / cross-category** (similar exposure); **operational-vs-conceptual** (external-positioning credibility surface). Cross-substrate, consumer-depth, and reader/operator-generalization asymmetries are consumer-conditional in indefinite-park or conditional postures.

## 7. Candidate Pressure Types (Classification, Not Queue)

Classified, not enumerated. Each pressure type is named with what it addresses, what it would prove, what it would not prove, and what proof-chain-gravity risk it carries.

### Full-flow operationalization of an under-tested mode

- **Addresses**: cross-mode asymmetry; Apex Named Limitation #3 (marketing branch or campaign-broader branch).
- **Would prove**: that the packet-and-seam schema carries the chosen mode at full-flow depth; that the curation semantic split applies cleanly under the mode's specific authorship-bearing-discretion pattern.
- **Would not prove**: cross-substrate generalization; cross-brand generalization within the mode; multi-reader generalization.
- **Proof-chain risk**: moderate. Full-flow operationalization produces substantial evidence and is unlikely to become ceremony, BUT it requires substantial setup (intake; reference imagery; generation cycles; curation events) per the imagery-prep workflow.

### Cross-substrate repeat of a carrier-pattern test

- **Addresses**: cross-substrate asymmetry within the post-milestone-9 carrier-shape arc.
- **Would prove**: that a specific carrier shape (Option F; R-D; Z4-C) holds against a different substrate than kitchen-textiles.
- **Would not prove**: multi-reader generalization at the new substrate; cross-mode generalization; closure of any held carrier-shape choice.
- **Proof-chain risk**: high. Per PR #275's indefinite-park sorting, no current consumer demands cross-substrate validation. Running another asymmetric reconstruction test would extend the saturated pattern milestone 12 already absorbed.

### Real brand-stack / cross-brand intake pressure

- **Addresses**: cross-brand asymmetry; brand-discovery-digestion architecture's substrate concentration; potentially cross-category asymmetry.
- **Would prove**: that the brand-discovery-digestion architecture and the fallback chain operate against real (not synthetic) brand articulation; surfaces real-brand sparsity patterns; tests Zone 1B if real brand-wide constants appear.
- **Would not prove**: that the architecture deploys cleanly across many brands; closure of the brand-system structural decision; cross-mode operational evidence.
- **Proof-chain risk**: low to moderate. Real-stack pressure is a different kind of pressure than synthetic-substrate pressure and would generate evidence the architecture currently has none of.

### Cross-category brand-system pressure

- **Addresses**: cross-category asymmetry; partial-inheritance claim from PR #239 (lighting register vs environment composition vs product-class proportions).
- **Would prove**: that the layered IA's partial-inheritance behavior holds across a second category at deepening depth.
- **Would not prove**: full-flow operational depth in the second category; cross-brand generalization within the category.
- **Proof-chain risk**: low to moderate. Conceptual pressure at deepening depth; if scoped tightly, produces architectural learning without operational setup overhead.

### Application artifact instance against a realistic deployment context

- **Addresses**: consumer-depth asymmetry at one end (would produce the first deployment-instance evidence for the artifact-grammar consumer); silently exposes cross-mode and cross-brand asymmetries; tests the grammar's own translation discipline.
- **Would prove**: that the artifact grammar generates a usable deliverable against a specific context; that the translation rules hold; that the provenance carrier carries.
- **Would not prove**: cross-mode evidence; cross-substrate carrier-shape generalization; structured consumer surface.
- **Proof-chain risk**: low. The architecture-hardening arc just produced the grammar; producing an instance against a deployment would be the natural execution of what the grammar was specified for. The risk is overrun if the instance becomes the project's center rather than a pressure surface.

### Structured consumer prototype / preflight

- **Addresses**: consumer-depth asymmetry at the structured end; v2's awaiting-a-structured-consumer status.
- **Would prove**: which of the seven candidate consumers from PR #277 is closest to being viable; what specific v2 keys actually get consumed structurally; whether v2's enumerations are sufficient or expose gaps.
- **Would not prove**: that any specific consumer is the right consumer; that v3 absorption is warranted.
- **Proof-chain risk**: moderate. A preflight prototype is closer to implementation than the preflight itself was; the boundary between preflight and prototype is where proof-chain risk grows.

### Multi-reader replication

- **Addresses**: reader/operator generalization asymmetry; named explicitly in milestone 11 / 12 as held.
- **Would prove**: that a specific carrier-shape pattern reconstructs across multiple readers at one substrate.
- **Would not prove**: cross-substrate generalization; cross-mode; closure of any carrier-shape choice.
- **Proof-chain risk**: high. Per PR #275's indefinite-park sorting, no current consumer demands multi-reader generalization at this depth. Running multi-reader tests would extend the saturated arc.

### Long-context / handoff durability test

- **Addresses**: reader/operator generalization asymmetry under time pressure; engagement-handoff scenarios.
- **Would prove**: that a specific carrier set survives time-gap reconstruction.
- **Would not prove**: cross-substrate generalization; cross-mode.
- **Proof-chain risk**: high. Similar to multi-reader replication — extends the saturated arc without surfacing a new consumer.

## 8. Recommendation

Per ASK's scope point #8, the brief must justify whether a dominant asymmetry exists.

**Recommendation: no dominant asymmetry requires immediate test pressure at this plateau.**

Justification:

- No asymmetry currently blocks a stated architecture claim. The architecture has been disciplined about hedging claims to evidence depth across milestones 7 through 12.
- The asymmetries most likely to become consumer-blocking under continued hardening (cross-mode; cross-brand / cross-category; operational-vs-conceptual) are silently relevant only if continued hardening surfaces a deployment-instance consumer or an external-positioning move. Neither is currently active.
- Cross-substrate, consumer-depth (structured end), reader/operator-generalization asymmetries are consumer-conditional. PR #275 and PR #277 honestly sorted them as indefinite-park or conditional for current consumer demands.
- Of the seven candidate pressure types named in §7, the lowest proof-chain risk and highest direct architectural value would be: **an application artifact instance against a realistic deployment context**. This would (a) produce the first deployment-instance evidence the architecture-hardening arc currently lacks; (b) silently expose cross-mode and cross-brand asymmetries against the artifact-grammar consumer; (c) test the translation rules and provenance carrier in operational use; (d) carry low proof-chain risk because the grammar was specified for exactly this kind of instance. The next-lowest-risk pressure types are real brand-stack intake pressure and cross-category brand-system pressure; both produce evidence the architecture currently has none of, without ceremony.

But the brief does not authorize any of these. The assessment is: under the current consumer surface, no asymmetry is dominantly load-bearing. If ASK chooses to authorize a pressure move, the brief's analysis supports the application-artifact-instance pressure type as the lowest-risk / highest-value option per current consumer pull.

**A second observation worth surfacing:** four of the post-milestone-12 PRs (#275, #277, #278, #279) plus this brief are bounded planning / analytical passes. The pattern has been useful for architecture hardening, but ASK's earlier memory-candidate note ("planning / analytical pass discipline") flagged the risk that this pattern could become its own kind of ceremony. The honest read: this brief is the fifth such pass, and ASK's earlier observation now has more pressure on it. Either a downstream execution move (an artifact instance; a real intake; a cross-category pass) or a deliberate pause becomes appropriate before authorizing another planning brief.

## 9. Non-Actions

The following do not happen as a result of this brief:

- No operational test of any kind. No full-flow operationalization; no cross-substrate repeat; no real brand-stack intake; no cross-category brand-system pressure; no artifact instance against a deployment; no structured-consumer prototype; no multi-reader replication; no long-context test.
- No Airtable mutation. The two prototype bases remain at their last-touched states.
- No schema. No promotion of any held schema candidate to repo-local truth.
- No structured IA model v3.
- No validator implementation or orchestration specification.
- No held-candidate adjudication map.
- No `docs/architecture.md` rewrite or modification.
- No `docs/method.md` or `docs/problem-and-approach.md` refresh.
- No grounding-note v59 opening.
- No memory write.
- No `design-system-ASK` implementation.
- No candidate-next-pressure-surface queue (the §7 classification names pressure types with their addressing-power, but does not rank them as a queue and does not authorize any).
- No milestone marker.
- No claim that any specific consumer is ready to be built or any specific test is ready to run.

## Scope marker

This brief assesses evidence-depth asymmetry at the current main HEAD (post-PR-279). If a subsequent PR materially changes the evidence state before the assessment is acted on, the asymmetry classification may need to be re-read against the new state. The assessment principles (six asymmetry types; four load-bearing sub-questions per asymmetry; pressure-type classification without queue) survive any such adjustment.

When ASK authorizes a pressure move, this brief becomes input to that move's scoping. Until then, the brief stands as analytical preparation.
