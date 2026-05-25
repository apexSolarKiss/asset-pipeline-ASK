# Implementation Roadmap + System Map Artifact Grammar v1

## Posture

```text
application-layer artifact grammar
generated-output grammar for the implementation roadmap + system map hybrid
not architecture front-door doctrine
not schema
not Pydantic
not validator integration
not orchestration spec
not Airtable mutation
not a milestone marker
not structured IA v3
not held-candidate adjudication
not visual rendering specification
self-superseding when a later application artifact grammar absorbs it or supersedes it
```

This artifact defines the grammar for one generated-output substrate of the asset-pipeline-ASK layered IA: a hybrid implementation roadmap + system map deliverable produced by applying the repository's working ontology against a specific deployment context. It is application-layer guidance, not architecture-front-door doctrine. The architecture remains aesthetic-agnostic; the grammar remains substrate-shape-specific.

The repository carries evidence of architecture (operational findings; decision surfaces; pressure tests; milestones; structured IA enumeration). It does not yet carry grammars of generated outputs. This artifact is one such grammar.

## What This Artifact Defines

A single applied-output shape: a structured diagnostic + prescriptive deliverable that pairs a system-map read of a current and target workflow state with a phased implementation roadmap. Authored in Markdown; renderable to other substrates downstream of grammar.

The grammar fixes:

- a ten-section skeleton with defined section purposes
- per-section content rules (inputs, outputs, language, provenance, exclusions)
- a source-to-section mapping from the brand-system input categories and workflow / production context to artifact sections
- a repo-concept consumption map naming which repository concepts feed the grammar as reasoning substrate
- translation rules between repository vocabulary and the prose register of the generated deliverable
- a provenance / confidence grammar for inline marking and the appendix table
- a system-map grammar (current-state and target-state)
- a roadmap grammar
- a substrate-recommendation grammar
- application-consumer-distance guidance applied to held repository content

The grammar does not specify visual rendering, schema, code, or substrate implementation. Visual hierarchy is downstream of structural grammar and not specified here.

## Artifact Identity

**What the artifact is.** A single delivered document. Diagnostic in its first half (sections 1–5), prescriptive in its second half (sections 6–8), decision-supporting in its tail (sections 9–10). Markdown-authored. Walkthrough-capable for live discussion. Stand-alone-readable for an unaccompanied reader. Bounded to a specific deployment context and a specific deployment intent.

**What the artifact is not.** Not a built system. Not a deployed Airtable base, a running Python pipeline, or a published DAM taxonomy. Not a generic capabilities pitch. Not a slide deck. Not a schema commitment. Not a productized intake form.

**Audience.** Decision-makers and downstream implementation teams within a deployment context. The artifact's two halves serve two reading depths: an executive read for senior decision-makers; structured detail for implementation teams. A provenance appendix supports both.

**Job the artifact performs.** Reflects the current state of a workflow back at its operators in structurally-grounded form. Names gaps and risks. Recommends a target state with substrate justification. Lays out a phased path from current to target. Surfaces decisions required to proceed. Carries provenance so each claim is defensible without the artifact's author present.

## Section Skeleton

Ten sections, in fixed order:

```text
1.  Executive read
2.  Source inventory
3.  Current-state system map
4.  Layered diagnosis
5.  Gap / risk map
6.  Recommended target-state system map
7.  Substrate recommendation
8.  Implementation roadmap
9.  Decisions needed
10. Provenance / confidence appendix
```

The skeleton is the grammar's first guardrail against sprawl. Each section has a defined purpose; sections do not absorb each other's jobs. Reading flow: orient (1) → ground (2, 3) → interpret (4, 5) → recommend (6, 7, 8) → surface (9) → audit (10).

## Section Grammar

For each section: purpose; inputs consumed; outputs produced; language register; provenance requirements; exclusions.

### Section 1 — Executive read

- **Purpose.** Orient a senior decision-maker. Surface the artifact's key claims at skim depth. Target: one page.
- **Inputs consumed.** The rest of the artifact (authored last in practice).
- **Outputs produced.** Intent statement (the deployment's stated purpose, recorded verbatim from intake); diagnosis headline (one to two sentences); recommendation headline (one to two sentences); roadmap outline (phase names plus brief framing); decisions-needed headline (top-three decisions).
- **Language register.** Highest discipline. No internal repository vocabulary. Plain prose.
- **Provenance requirements.** Not required at this depth; provenance lives in Section 10. Claims here must match the body's claims.
- **Exclusions.** Detail not surfaced elsewhere. Recommendations not supported by body content. Speculation. Positioning rhetoric. Internal labels (force-kind terms; carrier-shape labels; packet identifiers).

### Section 2 — Source inventory

- **Purpose.** Name what intake produced. Distinguish what was supplied from what was inferred and what remains unresolved.
- **Inputs consumed.** Materials provided by the deployment context, categorized using the brand-system input categories (brand platform; visual identity system; photography / image style guide; asset library; application guidelines; past campaigns) plus workflow / production / boundary categories (channels; naming conventions; metadata / DAM context; approval workflow; production cadence; stakeholder roles; QA / governance; current tools / storage; rights / usage / localization).
- **Outputs produced.** Structured list per category. Each item marked **supplied** / **inferred** / **unresolved**. For supplied items: source identifier (file, URL, conversation date) and form (PDF, deck, image samples, written brief, verbal). For inferred items: the evidence basis and the fallback-chain step used. For unresolved items: why unresolved and what would resolve them.
- **Language register.** Descriptive. The author records what was received; interpretation is reserved for Section 4.
- **Provenance requirements.** This section is the provenance carrier for the rest of the artifact. Each item attributed to source or to fallback-chain step.
- **Exclusions.** Interpretation. Author judgment (judgment attribution is reserved for sections where it operates). Inferred items not marked as such.

### Section 3 — Current-state system map

- **Purpose.** Structurally grounded read of the current workflow state.
- **Inputs consumed.** Source inventory; the author's interpretation against the layered IA (translated per Section 6 below).
- **Outputs produced.** Layered map of current state. Per layer: what operates at that layer; what kinds of inputs guide it; what carriers hold the content (prose, structural, visual, governance); what flows connect it to adjacent layers; where decisions occur; where governance occurs; where handoffs occur. Prose-first. Supporting diagrams permitted but optional; the grammar does not commit to a diagramming tool.
- **Language register.** Translated layer language. Repository terms (brand-system layer; category / product-class layer; mode-specific layer; packet layer; slot layer) appear in their translated forms.
- **Provenance requirements.** Each claim about the current state attributed to a source-inventory item or to author inference. Inferred items marked.
- **Exclusions.** Prescription (reserved for Section 6). Evaluative judgment about whether the current state is acceptable (reserved for Section 5). Internal repository vocabulary in raw form.

### Section 4 — Layered diagnosis

- **Purpose.** Layer-by-layer interpretation. What is working, what is strained, what is missing.
- **Inputs consumed.** Current-state system map; fallback-chain reasoning for sparse layers.
- **Outputs produced.** Per-layer assessment. For each layer: what is articulated; what is inferred; what is contradictory; what is unresolved; what kind of authority each piece of information carries. The normative-force vocabulary is translated.
- **Language register.** Diagnostic prose. References to current-state map sections by anchor. Translated authority vocabulary throughout.
- **Provenance requirements.** Each layer's diagnosis cites which intake items supported the read. Inferred-versus-supplied marked.
- **Exclusions.** Target-state recommendation (Section 6). Substrate recommendation (Section 7). Raw force-kind labels. Raw carrier-shape labels.

### Section 5 — Gap / risk map

- **Purpose.** Name what is missing. Name what is risky.
- **Inputs consumed.** Layered diagnosis.
- **Outputs produced.** Structured list of gaps (per layer; per workflow stage; per governance point) and risks (per gap; per under-articulated component; per dependency on author continuity). Each gap or risk: concrete description; part of the current state it characterizes; concrete consequences if unaddressed.
- **Language register.** Descriptive of risk. Concrete consequences named in operational terms.
- **Provenance requirements.** Each gap or risk attributed to diagnosis observations.
- **Exclusions.** Prescription. Recommendations dressed as risks. Speculative risks not grounded in diagnosis.

### Section 6 — Recommended target-state system map

- **Purpose.** Structurally grounded read of the recommended state.
- **Inputs consumed.** Gap / risk map; the author's interpretation; the layered IA's normative-hierarchy structure.
- **Outputs produced.** Layered map of target state. Same per-layer structure as Section 3 for legibility (current versus target comparable layer-by-layer). Each target-state claim phrased as recommendation, not as fact.
- **Language register.** Same translated layer language as Section 3. Recommendations explicit.
- **Provenance requirements.** Each target-state claim attributed to (a) the gap or risk it addresses and (b) the method principle that supports it. Method principles are translated; the artifact does not import internal principle labels in raw form.
- **Exclusions.** Substrate decision (Section 7). Roadmap phasing (Section 8). Positioning rhetoric. Doctrine claims about how any specific external visual-identity reference should be adopted by the deployment.

### Section 7 — Substrate recommendation

- **Purpose.** Justify substrate choice (single or hybrid) with comparison.
- **Inputs consumed.** Target-state system map; the deployment context's diagnosed organizational capacity (from intake — team-skill, maintenance bandwidth, integration capacity, existing tools); deployment intent.
- **Outputs produced.** Comparison of viable substrates. Recommendation with explicit reasoning. Named alternative if the recommended substrate's threshold conditions are not met by diagnosed capacity.
- **Language register.** Substrate names operational (Airtable; Python utilities; HTML system map; DAM taxonomy doc; operating documentation; hybrid). Comparison criteria operational: build effort; maintenance burden; team-skill required; integration capacity; flexibility; time-to-value.
- **Provenance requirements.** Comparison criteria attributed to capacity intake. Recommendation attributed to author judgment about which substrate best fits the target state.
- **Exclusions.** Schema-level detail (downstream of substrate choice). Build instructions. Cost or staffing estimates. Vendor-tier commitments beyond substrate name.

### Section 8 — Implementation roadmap

- **Purpose.** Phased path from current state to target state.
- **Inputs consumed.** Target-state system map; substrate recommendation; deployment cadence intake.
- **Outputs produced.** Phased plan. Per phase, the fields listed in the Roadmap Grammar section below.
- **Language register.** Project-planning vocabulary. Ownership clear. Phase-start triggers clear.
- **Provenance requirements.** Each phase's scope attributed to the gaps or risks it addresses. Dependencies attributed to substrate choice and prior-phase deliverables.
- **Exclusions.** Implementation-level details. Team-staffing claims. Deadlines or cost estimates. Pseudo-precision (week-level dates).

### Section 9 — Decisions needed

- **Purpose.** Surface decisions required for the engagement to proceed.
- **Inputs consumed.** Substrate recommendation's held alternatives; roadmap decision gates; held questions surfaced through diagnosis.
- **Outputs produced.** Ordered list of decisions. Per decision: what is being decided; what is at stake; what information would help; who likely owns the decision; what happens if the decision is deferred.
- **Language register.** Direct. Respects decision authority. Does not foreclose alternatives the author has not closed.
- **Provenance requirements.** Each decision tied to the held question or held alternative it resolves.
- **Exclusions.** Pseudo-decisions (items the author has effectively pre-decided). Decisions the artifact is not actually asking for in this engagement.

### Section 10 — Provenance / confidence appendix

- **Purpose.** Defensibility infrastructure for the artifact's claims.
- **Inputs consumed.** All prior sections.
- **Outputs produced.** Structured table or list. Per claim: source attribution; confidence read; inferred-versus-supplied marker; held-question marker (if applicable); author-judgment attribution (if applicable). Cross-reference to body sections by anchor.
- **Language register.** Structured. Dense but readable. Audience here is the engaged reader who wants to audit.
- **Provenance requirements.** This section is the provenance carrier.
- **Exclusions.** Raw internal trace-dimension labels. The provenance *concepts* (whether something was inspected; whether it was articulated; what the derivation basis is) express in plain prose; the internal *labels* stay operator-side.

## Source-to-Section Mapping

Brand-system input categories and workflow / production context map to artifact sections as follows.

| Intake category | §2 inventory | §3 current map | §4 diagnosis | §5 gap/risk | §6 target map | §7 substrate | §8 roadmap | §9 decisions | §10 appendix |
|---|---|---|---|---|---|---|---|---|---|
| Brand platform | yes | brand layer | brand-layer assessment | if absent / contradictory | brand layer | if posture demands | early-phase scoping | if held | source attribution |
| Visual identity system | yes | brand-wide constants | VIS articulation depth | if absent / sparse | brand-wide constants | if structural representation demanded | scoping | if open | source attribution |
| Photography / image style guide | yes | category and asset layers | style articulation | if sparse | category recommendations | rarely substrate-driver | scoping | if open | source attribution |
| Asset library / examples | yes | reference-asset layer | where evidence is rich or sparse | if sparse | reference-asset structure | DAM substrate driver | scoping | rarely | source attribution |
| Application guidelines | yes | per-channel / per-touchpoint layer | per-touchpoint articulation | if sparse | application layer | views or utilities driver | scoping | rarely | source attribution |
| Past campaigns | yes | historical context | current versus historical | if past differs from intent | sometimes referenced | rarely | rarely | rarely | source attribution |
| Workflow / production context | yes | flow layer | flow strain | yes | flow layer | substrate driver | cadence shapes phasing | if capacity unclear | source attribution |
| DAM / metadata / storage context | yes | storage layer | taxonomy depth | yes | storage layer | substrate driver | scoping | if open | source attribution |
| Approval / governance context | yes | governance layer | approval bottlenecks | yes | governance layer | substrate driver | governance phasing | if open | source attribution |
| Rights / usage / localization context | yes | constraint layer | rights articulation | if sparse | per-market structure | substrate consideration | if applicable | if open | source attribution |

The table is the grammar's reverse-index: every intake category lands somewhere in the artifact. No section pulls from outside intake.

## Repo-Concept Consumption Map

The grammar consumes these repository concepts as **author-side reasoning substrate**. They inform the artifact's structure and the author's interpretation; their internal labels stay author-side and do not surface in the generated artifact's prose.

- **Brand discovery / digestion architecture.** Drives the source inventory's structure and the diagnosis's layered read. See `docs/brand-discovery-digestion-layered-intake-architecture-v1.md`.
- **Six-category synthesis.** Guides intake ordering and cross-category interpretation. See `docs/brand-system-input-cross-category-synthesis-v1.md`.
- **Fallback chain.** Handles sparse articulation. Surfaces in the source inventory as inferred rows and in the diagnosis as fallback-marked content.
- **Layered IA model.** The structural skeleton of the current-state and target-state maps. See `docs/architecture.md` and `docs/structured-ia-model-v2.md`.
- **Reference-function taxonomy.** Characterizes reference content in the system maps. See `docs/layered-reference-and-discretion-architecture-v1.md`.
- **Curation semantic split.** Drives the governance-layer diagnosis (where authorship-bearing discretion enters; where governance-bearing curation lives). Translated in artifact prose.
- **Carrier types** (prose, structural, visual, governance, held). Describe current-state versus target-state content carriage. Translated.
- **Operator-authored versus inferred-not-stated distinction.** Drives the provenance carrier's inferred-versus-supplied marker.
- **Confidence and provenance logic** carried in the post-milestone-9 trace work. Drives Section 10 and the inline provenance tags. The *concepts* (presence of inspection; articulation state; derivation basis) inform author reasoning; the *labels* stay author-side.

The grammar does not consume specific operational evidence references (packet identifiers), specific held schema candidates (none have been promoted to repository truth), or specific validator / orchestration assumptions (no such consumer exists).

## Translation Rules

The artifact's generated prose translates repository vocabulary into terms the deployment-target audience can read without prior exposure to the repository's working ontology.

| Repository term | Generated-prose equivalent |
|---|---|
| layered IA | the structure of inputs that shape each asset |
| brand-system layer | brand-wide layer / brand layer |
| category / product-class layer | category / product-class layer |
| mode-specific layer | channel-or-mode layer / project-type layer |
| packet layer | project layer / asset-family layer |
| slot layer | per-asset role / individual deliverable |
| candidate generation layer | draft / generated-output layer |
| curation seam | approval / selection boundary / where assets become officially adopted |
| governed asset layer | approved-asset layer / released-asset layer |
| carrier shape | structural representation / how this kind of information is held |
| force kind | authority type / role of information / what kind of authority this carries |
| descriptive force | factual content (what is true) |
| directive force | instructional content (what should happen) |
| constraint force | rule content (what must not be violated) |
| reference force | visual-anchor content (what visually guides interpretation) |
| judgment force | human-resolved content (where someone exercised interpretation) |
| governance force | adoption-marking content (what elevates output to approved status) |
| normative hierarchy | the layered authority of inputs |
| fallback chain | how the diagnosis handles sparse articulation |
| operator-authored versus inferred-not-stated | supplied versus inferred |
| intake-time judgment trace | the reasoning behind brand-context interpretation |
| reuse-time governance | how previously-approved assets are reused |
| reference-selection rationale | why each visual reference was chosen as evidence |
| internal carrier-shape labels | do not surface |
| specific operational evidence identifiers | do not surface |
| internal zone identifiers | do not surface; if a zone-specific recommendation appears, translate to its concrete content |
| internal structured IA model version labels | do not surface |
| internal trace-dimension labels (presence-of-inspection; articulation-state; derivation-basis) | concepts may surface in plain prose; labels stay author-side |

The translation table is the grammar's content rule, not a style preference. Internal repository labels do not surface in the generated artifact's prose.

## Provenance / Confidence Grammar

Each recommendation, diagnostic claim, and gap / risk item carries:

- **Source.** What intake item or author inference supports the claim.
- **Supplied / inferred / unresolved.** Was the supporting evidence supplied (from intake materials), inferred (from evidence under sparsity), or unresolved (held as known-unknown).
- **Confidence.** High (multiple converging signals across categories); medium (some inference required; gaps handled by fallback chain); low (working assumption pending validation).
- **Author judgment.** Attributed where author interpretation went beyond direct evidence. Named explicitly.
- **Held question.** Surfaced where the claim depends on a deployment-side decision or further evidence.

Two layers of provenance, in combination:

1. **Inline tag at point of claim.** A compact tag at the end of the sentence or paragraph carrying the claim: `[src: brand-platform.pdf §2 | conf: M | inferred | judgment: author]`
2. **Appendix table (Section 10).** Each numbered claim cross-referenced to source, confidence, inferred-versus-supplied marker, held-question marker, and author-judgment attribution.

Tag field discipline:

- `src:` — required; identifies the source (file:section, URL, intake-conversation date, "fallback chain L3", or similar)
- `conf:` — required; one of `H`, `M`, `L`
- `supplied` / `inferred` / `unresolved` — required; one term per tag
- `judgment: author` — present only where author interpretation went beyond direct evidence
- `held:` — present only where a held question is referenced

Confidence is honest. Medium and low recommendations are explicitly marked rather than normalized into high-confidence prose.

## System-Map Grammar

For both the current-state map (Section 3) and the recommended target-state map (Section 6).

### Layers

Five layers, in fixed order top-to-bottom:

```text
brand layer
category / product-class layer
channel-or-mode layer (sometimes called project-type layer)
project layer
per-asset layer
```

### Entities per layer

Representative; not exhaustive. The deployment context determines which entities surface.

- **Brand layer.** Brand-platform statements; visual identity constants; brand-wide style references; brand-wide approval authority.
- **Category / product-class layer.** Category conventions; product-class proportions and treatments; category-specific style references; category approval delegations.
- **Channel-or-mode layer.** Per-channel format requirements; per-channel usage rules; per-channel approval gates; channel-specific assets.
- **Project layer.** Project intent; project-bounded creative discretion; project reference set; project approval flow.
- **Per-asset layer.** Asset role (hero / profile / detail / lifestyle / and similar); per-asset constraints; per-asset references; per-asset approval state.

### Flows

- Inputs flowing downstream (brand → category → channel → project → asset)
- Reference selection at each layer
- Generation events (where new assets are produced)
- Approval events (where assets move from draft to approved)
- Handoffs (between teams; between systems; between phases)
- Feedback loops (where downstream observation revises upstream content)

### Decision boundaries

- Where judgment enters
- Where bounded discretion operates
- Where constraints are absolute
- Where exceptions are routed

### Governance points

- Where assets become officially approved
- Where rights or compliance is checked
- Where rejection sends work back
- Where audit or provenance is required

### Handoff points

- Between teams
- Between systems
- Between phases

### Known gaps (current-state map only)

- Layers without carriers
- Inputs dependent on author continuity
- Approvals routed through bottlenecks
- Flows without governance

### Recommended additions (target-state map only)

- Layers with new carriers
- Inputs given structural representation
- Approval flows with explicit ownership
- Governance points named at each transition

### Visual representation

Prose-first. Optional supporting diagram. The grammar does not commit to a specific diagram tool or rendering substrate. Visual hierarchy is downstream of structural grammar and is not specified here.

## Roadmap Grammar

For Section 8.

### Per-phase fields

Ten fields, in fixed order:

```text
1.  Phase name
2.  Phase goal
3.  Deliverables (named concretely)
4.  Start dependencies
5.  Finish dependencies
6.  Decision gates within phase
7.  Implementation substrate(s) built in this phase
8.  Success criteria
9.  What remains held (explicitly not done in this phase)
10. Coarse effort scale (small / medium / large)
```

### Cross-phase patterns

- **Sequencing logic.** At the start of Section 8, a paragraph explaining why phase N comes before phase N+1.
- **Held-until markers.** Phases gated on decisions or earlier-phase outputs named explicitly.
- **Roll-up summary.** At the start of Section 8, a one-paragraph overview of the full phase sequence.

### Effort-scale rules

Coarse on purpose. Supports phase comparison without claiming precision the artifact has not earned.

- `small` — single author can complete within one to two engagement weeks
- `medium` — author plus deployment-side participation; multiple engagement weeks
- `large` — author plus deployment-side participation; engagement-month scale; may need dedicated capacity

### Exclusions

- Specific field configurations or schema details
- Specific code structure
- Vendor-tier commitments beyond substrate name
- Cost or staffing estimates
- Pseudo-precision (week-level deadlines)

## Substrate-Recommendation Grammar

For Section 7.

### Substrate inventory

The grammar names six substrates as the comparison set:

- **Airtable base.** Entities, tables, fields, views, interfaces, automations. Operator-managed. Collaborative. Integration-capable.
- **Python utilities.** Folder scanners; metadata extractors; manifest generators; naming validators; QA checks; integration scripts. Engineering-managed.
- **HTML system map.** Static readable artifact. The deliverable itself can serve as part of the operational documentation surface.
- **DAM taxonomy doc.** Folder structure; naming conventions; metadata schema; search facets. Supplements an existing DAM.
- **Operating documentation.** SOP; taxonomy guide; naming convention guide; handoff protocol; role-responsibility matrix; asset lifecycle map; QA checklist.
- **Hybrid.** Any combination of the above.

### Per-substrate analysis

For each substrate considered:

- **What it is good at** — operational strengths
- **Build complexity** — what it takes to stand up
- **Maintenance complexity** — what it takes to keep running
- **Team-skill requirement** — capability presumed of the deployment side
- **Integration capacity** — how it connects to existing tools
- **Flexibility** — tolerance for change
- **Time-to-value** — when the deployment side begins seeing value

### Context-fit assessment

For each substrate:

- How well it fits the diagnosed deployment context
- What conditions make it more appropriate
- What conditions make it less appropriate
- Threshold conditions — explicit triggers that would make a different substrate preferable

### Recommendation block

- **Recommended substrate(s).** Single or hybrid; explicit.
- **Why this.** At least three reasons grounded in diagnosis and intake.
- **Why not the alternatives.** For the top-two-not-recommended substrates, a brief rejection rationale.
- **Held alternative.** If recommended substrate's threshold conditions are not met by the deployment context's capacity, what is preferred instead.
- **Boundary.** Explicit naming of what is not being recommended and why.

### Exclusions

- Schema-level detail
- Build instructions
- Productization claims
- Vendor-tier commitments beyond substrate name

## Application-Consumer-Distance Guidance

Held repository content sorts by distance from this grammar's actual consumer requirements. The four-bucket sort is application-consumer-distance guidance — it identifies which repository concepts the grammar reads, which it may read depending on deployment specifics, which it does not read until later phases, and which have no foreseeable consumer at this grammar.

This is not held-candidate adjudication. Nothing here authorizes closure of held questions. The sort exists to discipline the grammar's reach.

### Near-seam — the grammar consumes

- Brand discovery / digestion architecture
- Six-category synthesis
- Fallback chain
- Layered IA model (translated)
- Operator-authored versus inferred-not-stated distinction — drives provenance grammar
- Confidence / provenance logic — drives Section 10 and inline tags
- Curation semantic split — drives governance-layer diagnosis
- Carrier types — drive current-state versus target-state map descriptions (translated)
- Reference-function taxonomy — drives reference-asset section of system map (translated)
- Reference-selection rationale — present when references are central evidence in the system map (the planning default)

### Conditional — may be needed depending on deployment specifics

- Reference-selection rationale (when references are not central evidence — variant of above)
- Brand-wide constants beyond approved references — only when the deployment has named visual-identity constants demanding structural representation
- Visual-identity-system constants beyond approved references — same condition
- Intake-time judgment trace structural representation — only when multi-author continuity becomes load-bearing (engagements that hand off, span multiple authors, or extend over long timelines)
- Per-reference structured rationale carrier — only if the inline-tag grammar requires structured per-reference rationale rather than prose rationale
- Seven-stage extraction sequence's conditional jump-points — relevant where intake order matters and the author deviates from the default sequence

### Downstream — sits after this grammar's seam

These activate post-artifact, when implementation work begins.

- Reuse-time governed-output governance
- Derivative and reuse lineage
- Governed-output continuity
- Approval-implication classifications
- Five-axis provenance carriers (activate when actual outputs are produced and governed)
- Specific Airtable schema / Python script structure / HTML rendering tool choice — downstream of substrate recommendation and the implementation work itself

### Indefinite-park — no foreseeable consumer for this grammar

- Doctrine-level inheritance rule from external visual-identity-reference projects (not produced by this grammar's consumer pull)
- Universal deployment-side brand schema (the artifact does not commit to a universal schema; each deployment produces its own articulation shape)
- Automated brand parser (no consumer at this grammar)
- Productized intake surface (the grammar serves an author-mediated journey; productized intake is a separate substrate)
- Tier-marker conventions in deployment-side implementations (the deployment's own visual identity dominates its surfaces; internal tier markers do not enter)
- Symmetric carrier-shape remock tests at same-depth substrate (asymmetric reconstruction tests have saturated; no consumer at this grammar)
- Multi-author / cross-substrate / long-context generalization of intake-time trace and reuse-time governance work — unless engagement-level continuity becomes load-bearing earlier than this grammar requires
- Validator or orchestration runtime consumer — not the consumer this grammar serves
- Structured IA next-version schema absorption — not earned by this grammar's consumer pull

### Observations from the sort

- The grammar's actual consumer pull is on the Phase 1 and Phase 2 conceptual work (brand discovery / digestion; layered IA; reference-function taxonomy; carrier types; curation semantic split; provenance logic). That work is the structural backbone of the artifact.
- The post-milestone-9 carrier-shape work's contribution to this grammar is conceptual (it sharpened the project's understanding of what kinds of trace and rationale matter), not vocabular (its specific carrier-shape labels do not surface in the artifact). The value is in the concepts; the labels stay author-side.
- Indefinite-park is the most consequential bucket: it names what does not have to close for this grammar to be served.

## Where This Artifact Sits

- **Application layer.** This is one applied-output grammar among potentially several (Airtable base plan grammar; Python scaffold grammar; DAM taxonomy grammar; operating documentation grammar; hybrid grammars are all candidate sibling artifacts). The application sub-tree is the right home for grammar-level artifacts of this kind.
- **Not architecture-front-door doctrine.** The architecture front door (`docs/architecture.md`) remains the current-state map of the architecture itself. This artifact is one application of that architecture, not an extension of the front door.
- **Not a milestone.** Milestones mark architectural plateaus. This artifact is application-layer work derived from the existing architectural state; it does not mark a plateau.
- **Not schema, validator, or orchestration.** The grammar specifies what the generated artifact carries and how it reads. It does not specify code, fields, or runtime consumers.

## What Comes After

This grammar is the first application-layer artifact-grammar specification. It is one possible substrate among several. When other generated-output grammars are needed (an Airtable base plan grammar; a Python scaffold grammar; a DAM taxonomy grammar; an operating-documentation grammar), they belong as sibling artifacts at the same application-layer depth.

Operational use of this grammar — production of a specific instance of the artifact for a specific deployment — is downstream of this specification. The grammar earns its keep when an instance is produced and the grammar holds against the deployment's specific shape.
