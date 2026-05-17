# Governed-Output Continuity / Reuse-Derivative Governance Decision Surface v1

## Posture

```text
architecture-decision surface
Zone 4 governed-output continuity / reuse-derivative governance
reuse-time reference governance
not intake-time reference rationale (that is PR #263's axis; sharpened-not-closed; remains its own surface)
not Zone 6 trace (intake-time judgment trace; plateau at milestone 11)
not schema
not Airtable
not JSON Schema
not Pydantic
not validator / orchestration
not structured IA v3
not implementation
not milestone
not held-candidate adjudication
not authorization of next pressure surface
does not collapse intake-time reference rationale into reuse-time governance
does not author field types, entity placement, cross-entity relationships, or rollup patterns
self-superseding when operational pressure test, family-coherence substrate test, multi-substrate generalization, derivative-vs-reuse pressure test, or specific carrier-shape implementation move absorbs it
```

This artifact pressures the **specific carrier-shape constraints** any future Zone 4 governed-output continuity / reuse-derivative governance carrier would need to satisfy. It is the first focused architectural treatment of Zone 4, which PR #248's brand-system carrier decision surface v2 located at the governed-asset / reference-linkage layer and preserved as adjacent to (not collapsed into) Zone 6 (intake-time judgment trace) and the intake-time reference rationale axis (PR #263).

The artifact does NOT author schema, entity placement, field types, cross-entity relationships, or rollup patterns. It defines conceptual constraints any future carrier-shape design must satisfy or address. It explicitly preserves the boundary between intake-time reference rationale (PR #263's axis, still sharpened-not-closed per PR #266) and reuse-time governed-output continuity / derivative governance (this artifact's scope).

## What This Artifact Attempts

The post-milestone-11 intake-reference-rationale loop completed with PR #267 in a sharpened-not-closed state: PR #263's design surface bounded the carrier-shape constraint vocabulary; PR #266 operationally pressured R-B + R-D + R-E hybrid; the R-C vs R-D choice remains held pending growth-pressure or symmetric-mock evidence. Throughout that arc, Zone 4 was preserved as adjacent and held — explicitly NOT collapsed into intake-time reference rationale.

The architectural question this surface pressures:

> When a governed output becomes a reference for later work, what governance and trace structure is required so the architecture can distinguish reuse, derivative use, continuity anchoring, and new asset-family creation?

This is a **dual-nature** question about the governed-output object. The same asset may exist as:

- a terminal output at the moment of governance (its original role), and
- a reference asset at later moments (its reuse role).

The architecture currently carries the governed-output state via `asset_attachment`, slot-level `governed_output_status` (`planned` → `generated`), and packet-level `governed_output_count`. It carries the reference state via `reference_assets` + `approved_reference_keys`. What it does NOT carry is the **transition** — when, why, and under what governance does a governed output cross from terminal-output role into reference role.

Why this matters for the durable definition layer (per the grounding-note premise): reuse / derivative / family-coherence rules are explicitly part of the durable layer above changing tools and models. Without governance on how governed outputs re-enter the system as references, the architecture preserves the object but loses the rule structure that makes commercial visual-asset production scalable. Continuity, derivative variants, family coherence, and supersession handling are the operational stakes.

**Boundary preserved explicitly.** Intake-time reference rationale (why references were selected at the moment of intake, what each contributed, what alternatives were rejected) is PR #263's axis and remains sharpened-not-closed there. Reuse-time governance (what authority a governed output carries when it later becomes a reference; what derivative relationships form; what family-coherence obligations attach) is this artifact's scope. The two surfaces may share some carrier patterns (per-event carriers; lineage relationships) but they address structurally different architectural objects: an intake decision vs a reuse event tied to a governed asset.

## Boundary Definitions

The Zone 4 question requires clear vocabulary distinct from intake-time scope.

### Governed output

An asset that has completed the curation seam: produced from a slot's candidate generation, scored / accepted via the five-axis provenance + curator + `curation_pattern` carriers, and persisted with `asset_attachment` writeback. The governed output is the durable terminal asset for its originating slot / packet at the moment of governance.

### Reference asset

An asset linked to a packet via `packet.approved_reference_keys` and accessible at intake time via the lookup chain. Reference assets typically come from `asset_library` (curated visual evidence) OR — relevant for this surface — from prior governed outputs that are reused.

### Governed output reused as reference

The transition that defines this surface. A governed output, originally produced for slot A in packet X, is later cited via `packet.approved_reference_keys` in packet Y. The same asset now plays two roles: terminal output for X (its original governance state), reference asset for Y (its reuse state). The architecture currently has no structural carrier for this transition.

### Derivative output

A governed output Y that is explicitly produced as a variant of a prior governed output X. Distinct from "Y uses X as a reference" — derivative carries a family-coherence obligation: Y must remain coherent with X's register, asset family, and possibly campaign world. A derivative is more constrained than a reuse-cite.

### Continuity anchor

A governed output that becomes the canonical visual reference for an ongoing brand register, campaign world, or product family. Subsequent assets in that register / world / family are expected to maintain coherence with the anchor. Continuity anchoring is a stronger governance posture than per-event reuse — it imposes ongoing constraint, not single-event citation.

### Asset family

A set of governed outputs that share a coherence relationship (e.g., a campaign cycle; a product-family launch set; a seasonal collection). Family membership carries cross-asset constraints (visual coherence; register consistency; messaging alignment) that go beyond any single asset's individual governance.

### Reuse event

The discrete moment when a governed output is cited as a reference for a new packet / slot / asset. A reuse event has a source (the governed output being reused), a downstream context (the new packet / slot), a reuse type (citation / derivative / continuity-anchor), and a governance posture (informational only / requires new approval / inherits source approval).

### Derivative governance

The governance regime applied when output Y is produced as derivative of source X. Different from informational reuse: derivative implies inheritance of constraint, family-coherence obligation, and possibly limited downstream discretion. Derivative governance asks what Y is permitted to vary from X and what Y must preserve.

### Source governed asset

The originating governed output in a reuse / derivative event. Carries authority based on its original governance state (which curator approved it; what `curation_pattern` was applied; what register it demonstrates; what asset family it belongs to). Different governed assets carry different authority depending on origin.

### Downstream packet / slot / governed output

The new context where reuse / derivative occurs. The downstream context may produce its own governed output (if the new asset clears its curation seam) — at which point the downstream governed output itself becomes a candidate for future reuse, recursively.

## Reuse / Derivative Scenarios

Seven scenarios pressure the Zone 4 governance question. Each carries different authority transfer and governance implications.

### Scenario 1 — Exact reuse as visual continuity anchor

A governed output from campaign cycle T1 is reused as `approved_reference_key` for a new packet in the same campaign world at time T2. The reuse anchors continuity: subsequent assets in the campaign world should maintain coherence with this anchor.

- **Source authority:** strong — anchor establishes ongoing visual register for the campaign world
- **Downstream inheritance:** wide — register, framing, atmosphere all carried
- **Derivative relationship:** not necessarily; the new asset may be a fresh creation within the anchor's register, not a variant
- **New approval needed:** typically no, if reuse is consistent with anchor authority
- **Trace required:** non-author operator must reconstruct that the anchor was the continuity reference, not an interchangeable evidence ref

### Scenario 2 — Reuse as atmosphere / tone reference

A governed output is cited primarily for its tone / atmosphere / register, not its product or composition specifics. The reuse is dimensional: source X demonstrates one axis the new packet needs, while other axes remain open.

- **Source authority:** partial — on the cited dimension only
- **Downstream inheritance:** narrow — tone/atmosphere carried; framing/product specifics not necessarily
- **Derivative relationship:** no — pure citation, not derivative
- **New approval needed:** typically no (citation does not bind downstream beyond the cited dimension)
- **Trace required:** non-author operator must reconstruct that the source was cited for atmosphere/tone, not full inheritance

### Scenario 3 — Reuse as product-truth or material-fidelity reference

A governed output showing accurate product material under known lighting conditions is reused as fidelity reference for product accuracy in a new asset. The new asset's framing / composition / context may diverge entirely; only the product material rendering is the citation.

- **Source authority:** strong on material fidelity; null on other dimensions
- **Downstream inheritance:** strictly bounded — material rendering only
- **Derivative relationship:** no
- **New approval needed:** typically no (citation)
- **Trace required:** non-author operator must reconstruct that the citation is product-fidelity-specific, not register-binding

### Scenario 4 — Reuse as campaign-world / family-coherence reference

A governed output is part of asset family F (e.g., "Kitchen Textiles Holiday 2025"); a new asset Z is being generated within F. Source X informs Z's coherence with the rest of family F.

- **Source authority:** as one of several family members, X carries family-level constraint shared across the family
- **Downstream inheritance:** family-coherence rules (whatever those are for F) apply
- **Derivative relationship:** ambiguous — Z is "of the same family" but not specifically derivative-of-X
- **New approval needed:** typically family-level approval (the family carries its own governance; new family member must clear family acceptance)
- **Trace required:** non-author operator must reconstruct (a) family membership; (b) family coherence rules; (c) which family members X belongs to

### Scenario 5 — Derivative generation from prior governed output

New asset Y is explicitly produced as a variant of source X (e.g., color variant; seasonal re-rendering; cropping variation; resolution variant). Derivative carries family-coherence obligation: Y must remain coherent with X in specified ways.

- **Source authority:** strong — Y inherits X's governance + must preserve specified coherence dimensions
- **Downstream inheritance:** specified-coherence-dimensions inherit; other dimensions are derivative-scoped variation
- **Derivative relationship:** explicit — Y is derivative of X
- **New approval needed:** possibly partial (Y's variation dimensions may need approval; coherence dimensions are inherited)
- **Trace required:** non-author operator must reconstruct (a) Y is derivative of X; (b) which coherence dimensions are inherited; (c) which variation dimensions are derivative-scoped

### Scenario 6 — Rejected reuse / anti-reference case

A governed output X exists but operator explicitly chooses NOT to reuse it (e.g., X is from an obsolete campaign world; X carries register the new packet wants to avoid; X is governed but operator judges it inappropriate for the new context). Negative reuse: X informs the new context by counter-example or by absence.

- **Source authority:** rejected for this new context (X may still carry authority for other contexts)
- **Downstream inheritance:** none
- **Derivative relationship:** no — explicit non-derivative
- **New approval needed:** n/a (rejection)
- **Trace required:** non-author operator must reconstruct (a) X was considered; (b) X was rejected for this context; (c) the rejection rationale (parallel to PR #263's R-E rejected-alternatives complement, but at reuse-time scope rather than intake-time selection scope)

### Scenario 7 — Superseded governed output reused incorrectly

Governed output X at time T1; X is superseded by X' at time T2 (the brand evolved, the campaign world changed, the product line was updated). At time T3, operator (or downstream operator) incorrectly cites X as `approved_reference_key` for a new packet, unaware of X's superseded status.

- **Source authority:** historically real but currently superseded — the new context inherits stale authority
- **Downstream inheritance:** incorrect — Z inherits a register / register-axis that has been replaced
- **Derivative relationship:** ambiguous — Z is derivative-of-stale-source; the architecture should detect or trace this
- **New approval needed:** the supersession event itself needs to be governance-traced; downstream reuse of superseded assets needs detection
- **Trace required:** non-author operator must reconstruct (a) X's supersession event; (b) the relationship between X and X'; (c) whether downstream uses of X are correctly oriented or stale

## Governance Questions

For each scenario, the architecture must articulate answers (or hold them explicitly) to:

### What authority does the source governed asset carry?

The seven scenarios show authority is not uniform. Continuity-anchor reuse (Scenario 1) carries broader authority than dimensional citation (Scenarios 2, 3); family-coherence reuse (Scenario 4) carries family-level authority distinct from per-asset authority; derivative (Scenario 5) carries explicit inheritance + specified variation scope; rejected reuse (Scenario 6) carries no authority for this context; superseded reuse (Scenario 7) carries stale authority that may need correction.

The carrier shape must accommodate at least four authority types: continuity-anchor; dimensional (per-axis); family-level; derivative-with-specified-variation. Plus rejection state and supersession state.

### What downstream content may inherit from it?

Depends on authority type. Continuity-anchor → wide inheritance (register / framing / atmosphere). Dimensional citation → narrow inheritance (only the cited axis). Family-coherence → family-rule-set inheritance. Derivative → specified-coherence-dimensions only. Rejected → none. Superseded → architecturally ambiguous (the question itself is part of the test of supersession handling).

### What downstream content must NOT inherit?

The negative-inheritance question is architecturally as important as positive-inheritance. For dimensional citation, only the cited axis inherits — other axes must remain open. For derivative, the variation-scoped dimensions must NOT inherit. For rejected reuse, the entire register/inheritance must NOT carry. The carrier shape must accommodate not-inherit constraints, not just inherit constraints.

### When does reuse create a derivative family relationship?

Reuse without derivative obligation (Scenarios 1, 2, 3) creates citation but not family. Derivative reuse (Scenario 5) creates an explicit one-to-one family relationship. Family-coherence reuse (Scenario 4) operates within a pre-existing family relationship. The distinction between "uses X as reference" and "is derivative of X" is governance-meaningful and must be carrier-distinguishable.

### When is a new approval needed?

Continuity-anchor and dimensional citation typically don't require new approval (the source asset's governance carries). Derivative variation may require approval on the variation dimensions. Family-level membership may require family-level approval. Supersession events require their own governance trace. The carrier shape must accommodate the approval-recurrence question per reuse event.

### When is reuse informational only?

Many reuse events are informational citations that constrain downstream content but don't trigger new governance cycles. The carrier shape must distinguish informational-only from approval-triggering reuse.

### What trace is required for non-author reconstruction?

Per the project's intake-time reference-rationale precedent (PR #263 / PR #266), a non-author operator must be able to reconstruct reuse rationale, derivative relationships, family coherence, and supersession events without operator continuity. The same architectural pressure that motivated R-B + R-C + R-D + R-E for intake applies to Zone 4 for reuse.

## Carrier-Shape Options

Five carrier-shape options compared, plus hybrid posture. Each option named; decision posture labeled.

### Option Z4-A — Prose-only reuse notes

Reuse rationale stays in `packet.capture_notes` or operator side notes; no structural carrier per reuse event.

**Reconstruction coverage:** poor — same failure mode as PR #263's R-A and Option F's pre-test situation. Without operator continuity, reuse rationale is unreconstructable.

**Decision posture: REJECTED.** The architecture has empirically established (across PR #254 / PR #258 / PR #260 reader flags) that prose-only handling fails for non-author operators. Continuing prose-only at Zone 4 reproduces the same failure mode at a different scope.

### Option Z4-B — Metadata extension on governed output

Extend the governed output's metadata (parallel to `asset_metadata` on `reference_assets`, but at the governed-output side) to carry continuity-anchor status, derivative-children list, family memberships, supersession state, current-vs-superseded marker.

**Reconstruction coverage:** strong for asset-attached intrinsic state (this governed output IS an anchor; IS in family F; IS superseded by X'; HAS derivatives Y1, Y2). Asset-attached state travels with the asset across reuse events.

**Reconstruction limit:** weak for per-event reuse trace (this particular reuse event's rationale; this specific dimensional citation). Per-event detail lives elsewhere.

**Compatibility with `governed_output_status` / `asset_attachment`:** high — extends existing structural carriers for governed outputs.

**Decision posture: STRUCTURALLY SUGGESTED** for asset-intrinsic governed-output state (continuity-anchor; family membership; supersession state; derivative-children list).

### Option Z4-C — Separate reuse / derivative event record

A new entity (or sub-record) per reuse event, capturing: source governed asset; downstream packet/slot/output; reuse type (citation / derivative / continuity-anchor / rejected-reuse); governance outcome (informational / approval-required); per-event rationale; affected downstream content.

**Reconstruction coverage:** strong for event-level reuse trace (which event happened when, what was its type, what was its governance outcome). Naturally accommodates the per-event distinction between informational and approval-triggering reuse.

**Reconstruction limit:** decoupled from asset-intrinsic state (a record must navigate to the source asset to learn its continuity-anchor status, family memberships, etc.).

**Compatibility with `reference_assets` / `approved_reference_keys`:** moderate — adds a related entity that links to both source governed asset and downstream packet.

**Decision posture: STRUCTURALLY SUGGESTED** for event-level reuse trace with per-event governance distinction. Parallel to PR #263's R-C for intake-time.

### Option Z4-D — Reference-linkage annotation

Extend the existing `reference_assets` + `approved_reference_keys` linkage with reuse-time annotation: for each linked reference, when (timestamp), why (rationale), what governance posture (informational / approval-triggering), what authority type (continuity-anchor / dimensional / family-coherence / derivative / rejected).

**Reconstruction coverage:** strong for linkage-attached reuse trace (this reference linkage carries its own reuse context). Lightweight extension of existing carrier.

**Reconstruction limit:** the linkage carrier is per-packet; cross-packet reuse pattern (how often is X reused; in what contexts) requires navigating the linkage data across packets.

**Compatibility with `reference_assets`:** highest — directly extends the existing structural carrier.

**Decision posture: STRUCTURALLY SUGGESTED** for per-linkage reuse-time annotation. Compatible with both Z4-B (asset-intrinsic state on the source) and Z4-C (event-level record).

### Option Z4-E — Asset-family / lineage record

A separate carrier for asset families (e.g., "Kitchen Textiles Holiday 2025 Family") with family identity, member assets, lineage relationships (which members are derivatives of which), family-coherence rules, family-level approval status.

**Reconstruction coverage:** strong for family-level grouping and constraint (which assets share family F; what rules apply across F; which family members are derivatives vs original family entries).

**Reconstruction limit:** per-event reuse trace requires navigating the family carrier + the linkage + the source asset. Family-level is one architectural granularity; per-event reuse is finer.

**Compatibility with `governed_output_status` / `asset_attachment`:** moderate (governed outputs become family members but the family is a separate entity).

**Decision posture: STRUCTURALLY SUGGESTED** for family-coherence / lineage scope. Distinct architectural role from Z4-B / C / D — operates at family-level granularity, not per-event or per-asset.

### Hybrid posture

The four non-rejected options address different scopes:

- **Z4-B** asset-intrinsic state (governed output's continuity-anchor status; family memberships; supersession state; derivative-children list)
- **Z4-C** event-level reuse trace (per-event reuse rationale; informational vs approval-triggering)
- **Z4-D** linkage-level reuse annotation (per-`approved_reference_keys`-linkage reuse context)
- **Z4-E** family-level lineage and coherence (family identity; member set; family rules)

A hybrid that combines Z4-B (asset-intrinsic state) + (Z4-C OR Z4-D for per-event reuse) + Z4-E (family-coherence) covers the Zone 4 governance questions without overbuilding any single carrier. The choice between Z4-C and Z4-D for per-event scope mirrors the R-C vs R-D choice from PR #263 — held pending operational pressure.

**Decision posture: STRUCTURALLY SUGGESTED as conceptual posture.** Specific carrier-shape choice held; pattern-match to PR #256's three-alternatives-for-contradiction-resolution and PR #263's three-alternatives-for-intake-reference-rationale.

## Decision Criteria

Each option evaluated against eleven criteria.

### Reconstructability by non-author operator

- Z4-A: poor (operator continuity load-bearing — the empirical failure)
- Z4-B: strong for asset-intrinsic; weak for per-event
- Z4-C: strong for event-level; weak for asset-intrinsic
- Z4-D: strong for linkage-level; moderate for cross-packet patterns
- Z4-E: strong for family-level; weak for per-event detail
- Hybrid: strong across all (each carrier covers its scope)

### Compatibility with existing `governed_output_status` / `governed_output_flag` / `asset_attachment`

- Z4-A: passive (no structural carrier)
- Z4-B: highest (extends governed-output-side carriers)
- Z4-C: moderate (related entity; doesn't conflict)
- Z4-D: moderate (references the governed output via linkage)
- Z4-E: moderate (family entity references governed outputs as members)
- Hybrid: tight at Z4-B layer; coherent elsewhere

### Compatibility with `reference_assets` / `approved_reference_keys`

- Z4-A: passive
- Z4-B: orthogonal (lives at governed-output side, not reference-asset side)
- Z4-C: moderate (event record references linkage)
- Z4-D: highest (extends linkage directly)
- Z4-E: moderate (family carrier references via members)
- Hybrid: tight at Z4-D layer; coherent elsewhere

### Ability to distinguish reuse from derivative

- Z4-A: no (prose conflates)
- Z4-B: partial (derivative-children list at asset level)
- Z4-C: yes — primary purpose of event-level reuse_type field
- Z4-D: yes (authority_type / reuse_type annotation on linkage)
- Z4-E: yes for derivative-vs-fresh-family-member (via lineage)
- Hybrid: yes — multiple carriers reinforce the distinction

### Ability to preserve source authority

- Z4-A: weak (no structural carrier for authority type)
- Z4-B: strong (continuity-anchor flag; family membership; supersession state all carry authority)
- Z4-C: strong (per-event authority_type sub-field)
- Z4-D: strong (per-linkage authority_type annotation)
- Z4-E: family-level authority via family rules
- Hybrid: strong across asset-intrinsic + event + linkage + family scopes

### Ability to preserve downstream inheritance limits

- Z4-A: weak
- Z4-B: weak (asset-intrinsic state does not specify per-event inheritance)
- Z4-C: strong (per-event inherits_dimensions / does_not_inherit_dimensions sub-fields)
- Z4-D: strong (per-linkage inheritance annotation)
- Z4-E: family-rules carry family-wide inheritance constraints
- Hybrid: strong

### Ability to preserve family-coherence relationships

- Z4-A: weak
- Z4-B: weak (single-asset state, not family-level)
- Z4-C: weak (event-level, not family-level)
- Z4-D: weak (linkage-level, not family-level)
- Z4-E: primary (this is its purpose)
- Hybrid: strong — Z4-E is the family carrier; other carriers reference it

### Ability to handle superseded assets

- Z4-A: weak
- Z4-B: strong (supersession state on asset; supersedes-by pointer; supersedes-from pointer)
- Z4-C: moderate (event-level can mark reuse-of-superseded-asset as a flag)
- Z4-D: moderate (linkage can annotate stale-source)
- Z4-E: moderate (family-level can mark supersession of family members)
- Hybrid: strong at Z4-B layer; reinforced elsewhere

### Operator burden

- Z4-A: lowest (no structural carrier)
- Z4-B: low (per-asset state, updated rarely)
- Z4-C: moderate (per-event record-keeping)
- Z4-D: low-to-moderate (per-linkage annotation on existing carrier)
- Z4-E: moderate (per-family record + member maintenance)
- Hybrid: moderate-to-high (multiple carriers; offset by per-carrier role specificity)

### Risk of schema overbuild

- Z4-A: zero (no new structure) — but rejected for inadequacy
- Z4-B: low (extends existing governed-output-side carrier)
- Z4-C: moderate (new entity)
- Z4-D: low (extends existing linkage)
- Z4-E: moderate-to-high (new entity with cross-member relationships)
- Hybrid: moderate (multiple carriers; mitigated by bounded vocabularies)

### Separation from intake-time reference rationale

- Z4-A: prose lives in intake-time content; intermingles with intake rationale (poor separation)
- Z4-B: tight — governed-output-side carriers are reuse-time by location
- Z4-C: tight — reuse event records are explicitly reuse-time scoped
- Z4-D: must be scoped explicitly to reuse-time (the linkage itself spans both intake-time selection and reuse-time governance; design-dependent)
- Z4-E: tight — family carrier is asset-family scoped, distinct from intake events
- Hybrid: tight at Z4-B / Z4-C / Z4-E layers; Z4-D requires explicit scoping

## Recommended Conceptual Posture

Consolidated constraint list using ASK's five labels.

### Required by architectural premise

These constraints any future Zone 4 carrier MUST satisfy. Architecturally required by the grounding-note premise that reuse / derivative / family-coherence rules are part of the durable definition layer:

- **Reuse trace must be carrier-attached, not prose-only.** Z4-A is rejected. Reuse rationale must be reconstructable by non-author operators.
- **Reuse-type distinction must be reconstructable.** At minimum: continuity-anchor; dimensional citation; family-coherence; derivative; rejected-reuse; superseded-asset-reuse. The five-or-six-type distinction may evolve but the basic distinction is required.
- **Source authority type must be reconstructable per reuse event.** Continuity-anchor vs dimensional vs family-level vs derivative carry different authority; the carrier must distinguish.
- **Downstream inheritance limits must be reconstructable.** What inherits AND what does NOT inherit per reuse event.
- **Family-coherence relationships must be reconstructable.** When multiple governed outputs share family membership, the family rules and member set must be reconstructable.
- **Supersession events must be traceable.** When asset X is superseded by X', the supersession event itself must be a first-class architectural object.

### Structurally suggested

These constraints are not strictly required by the premise alone but are surfaced as load-bearing for any real carrier shape:

- **Z4-B governed-output metadata extension** for asset-intrinsic state (continuity-anchor flag; family memberships; supersession state; derivative-children list).
- **Z4-C separate reuse / derivative event record** OR **Z4-D reference-linkage annotation** for per-event reuse trace (rationale; governance outcome; affected downstream content). Choice between Z4-C and Z4-D held pending operational pressure (parallel to PR #263's R-C vs R-D and PR #256's three-alternatives-for-contradiction-resolution).
- **Z4-E asset-family / lineage record** for family-coherence scope (family identity; member set; family rules; family-level approval state).
- **Hybrid posture** combining Z4-B + (Z4-C OR Z4-D) + Z4-E as the conceptual posture, with the Z4-C vs Z4-D selection deferred to operational pressure.
- **Reuse-rejected complement carrier** for rejected reuse cases (Scenario 6), parallel to PR #263's R-E rejected-alternatives complement but at reuse-time scope.
- **Multi-type authority attribution per reuse event** — a single reuse event may carry multiple authority types simultaneously (e.g., continuity-anchor for register + dimensional for product fidelity).

### Held pending operational pressure

These constraints await operational pressure (fresh-reader reconstruction test with mocked Zone 4 carriers, parallel to PR #254 for Option F and PR #266 for intake-reference-rationale):

- **Z4-C vs Z4-D selection** for per-event scope.
- **Reuse-type vocabulary** — the seven scenarios named here are illustrative; whether they constitute the closed vocabulary or remain open to extension is held.
- **Authority-type vocabulary** — continuity-anchor / dimensional / family-level / derivative / rejected / superseded is a working set; refinement awaits operational pressure.
- **Inheritance-dimension vocabulary** — what dimensions does the architecture name as inheritable (register; framing; atmosphere; material-fidelity; family-membership; etc.) is held.
- **Per-event approval-recurrence vocabulary** — when reuse triggers new approval cycles vs informational-only is the carrier's load-bearing decision; vocabulary held pending pressure.
- **Family-rule vocabulary** — what kinds of constraints a family-coherence record carries (visual-coherence; register-consistency; messaging-alignment; etc.) is held.

### Held pending cross-substrate pressure

These constraints await pressure across substrate types beyond the kitchen-textiles dry-run:

- **Multi-mode reuse patterns** — SKU-driven, collection, marketing, campaign modes may exhibit different reuse / derivative patterns. The carrier shape must accommodate cross-mode variation.
- **Cross-brand reuse** — reuse within one brand vs across brands (if the architecture eventually supports multi-brand) has different governance implications.
- **Cross-time reuse** — long-duration campaign worlds with multi-year reuse patterns; ongoing-anchor durability across architecture evolution.
- **Cross-category reuse** — does a kitchen-textiles governed output ever reuse into a dining-textiles packet (cross-category) and how does the architecture govern that?

### Rejected / Insufficient

These constraints / options are explicitly out of consideration:

- **Z4-A prose-only reuse notes** — fails the empirical reader-flag evidence from the Zone 6 / Option F arc and the intake-reference-rationale arc. Same failure mode at a different scope.
- **Z4-B as sole carrier** — covers asset-intrinsic state but not per-event reuse trace; insufficient alone.
- **Z4-C or Z4-D as sole carrier (without Z4-B + Z4-E complement)** — covers event-level but loses asset-intrinsic state that travels across events AND loses family-level relationships; insufficient alone.
- **Z4-E as sole carrier** — covers family-level but not per-event detail; insufficient alone.
- **Collapsing reuse and intake-time reference rationale into a single carrier** — the two address structurally different architectural objects (reuse event vs intake decision); collapse loses architectural distinction.

### Adjacent intake-reference-rationale question, not decided here

- **Intake-time reference rationale.** PR #263 / PR #266 hold this as sharpened-not-closed (R-C vs R-D for event-level rationale; growth-pressure pending). This Zone 4 surface does NOT pressure intake-time reference rationale — Zone 4 is reuse-time governance. The two surfaces share some carrier patterns (per-event records; rejected-alternatives complements; hybrid posture) but address different objects.
- The two surfaces' carrier-shape choices may eventually converge or diverge based on operational pressure on each axis independently.

## Relationship to Existing Architecture

Implications only; no authorization of further work.

### Governed asset layer

The governed asset layer carries `asset_attachment` (binary writeback) and slot-level `governed_output_status` + packet-level `governed_output_count`. Zone 4's Z4-B extension would add asset-intrinsic state (continuity-anchor flag; family memberships; supersession state; derivative-children list). No mutation of existing carriers is authorized; the structural posture is articulated for future carrier-shape design.

### Curation seam

Per PR #239's normative-hierarchy framing, the curation seam carries governance-bearing curation (always at the seam; five-axis provenance + curator + `curation_pattern`). Zone 4 governance is downstream of the curation seam — the governed output has cleared the seam; Zone 4 addresses what happens to the asset post-seam in reuse and derivative contexts. The two architectural locations are sequential, not overlapping.

### Reference-function taxonomy

PR #239's nine-fold reference-function taxonomy provides the vocabulary for per-reference function attribution (visual fidelity exemplar; atmosphere reference; etc.). The taxonomy applies at the reference-asset side. Zone 4's authority-type vocabulary (continuity-anchor; dimensional; family-level; derivative) operates at the governed-output-as-reference side and is architecturally distinct. Whether the two vocabularies need to align or remain distinct is a held design question.

### Intake-reference-rationale axis

PR #263 / PR #266 articulated R-B + R-C / R-D + R-E for intake-time reference rationale. Zone 4 articulates Z4-B + Z4-C / Z4-D + Z4-E + reuse-rejected complement for reuse-time governance. The architectural pattern parallels intentionally:

- Per-reference / per-asset intrinsic state (R-B / Z4-B) — different scope but parallel structural role
- Per-event detail (R-C / R-D for intake; Z4-C / Z4-D for reuse) — different objects but parallel structural role
- Rejected complement (R-E for intake; reuse-rejected for reuse) — parallel structural role
- Family / cross-event scope (Z4-E only — no intake parallel because intake events are per-packet not per-family)

The parallel is structural, not collapsible. The two surfaces remain distinct architectural objects.

### Option F trace posture

PR #252 / PR #254 / PR #258 / PR #260 articulated Option F (inspection log + intake decision record + contradiction-resolution carrier) for Zone 6 intake-time judgment trace. Zone 4 is downstream of Option F's scope — the intake decision is made and traced via Option F; Zone 4 picks up after the curation seam when governed outputs play forward into future contexts. Option F's carrier patterns may inform Z4-C's design (the parallel between Option F's intake decision record and Z4-C's reuse event record) but the architectural objects are distinct.

### `reference_assets`

`reference_assets` is the existing carrier for reference identity + `asset_metadata`. Zone 4's Z4-D would extend the linkage between `reference_assets` and packets (via `approved_reference_keys`) with reuse-time annotation. No mutation of `reference_assets` schema is authorized; the structural posture is articulated.

### `approved_reference_keys`

`packet.approved_reference_keys` provides the structural linkage from packet to selected references. When a reference is a governed-output-being-reused, the linkage point is where Z4-D annotation would sit. The linkage's dual nature (intake-time selection AND reuse-time governance) is architecturally significant: the same linkage carries both intake-rationale (PR #263 scope) and reuse-governance (Zone 4 scope), and the carrier-shape design must keep them separable.

### `asset_attachment`

`asset_attachment` is the governed output's binary writeback. Zone 4 does not modify `asset_attachment`. The supersession-state question (Scenario 7) implies an architectural concept of "current vs superseded" governed outputs, which the existing `asset_attachment` carrier does not encode. Whether supersession lives on the `asset_attachment` carrier or on a Z4-B governed-output-metadata extension is held.

### Family-coherence / campaign-world continuity

Asset families and campaign worlds have been named at various points (Phase 2 past-campaigns deepening; Phase 1 campaign-mode artifacts) but never carry first-class structural carriers. Zone 4's Z4-E asset-family / lineage record would be the first focused architectural treatment of family-level structure. Whether family-coherence rules are encoded structurally or remain operator-judgment under family-level approval is held.

### Structured IA model v2 held inventory

Several held candidates in structured IA v2's held_questions list relate to Zone 4 scope (rejected_assets entity; derivative-governance question; reuse / derivative governance question; PR #243's temporal-state trace candidate). Zone 4's carrier-shape design surface bounds the constraint vocabulary for these held candidates without resolving them. No mutation of structured IA v2's appendix is authorized.

## Earned vs Held

### What this surface narrows at this evidence depth

- **Required-by-architectural-premise constraints** are named explicitly. Any future Zone 4 carrier that does not satisfy them would fail the reuse-time governance the durable definition layer requires.
- **Structurally-suggested constraints** are named with the hybrid posture (Z4-B + Z4-C or Z4-D + Z4-E + reuse-rejected complement). Z4-C vs Z4-D selection held — pattern parallel to PR #263 for intake-time scope.
- **Held constraints** are named with the operational pressure each would require to earn or refine (mocked-Zone-4-carriers fresh-reader test; family-coherence substrate; multi-mode reuse patterns; cross-time / cross-brand / cross-category reuse).
- **Rejected constraints** are named with specific failure reasoning grounded in the prior Zone 6 / intake-rationale evidence.
- **Boundary preserved** — intake-time reference rationale (PR #263 axis) is named adjacent and not collapsed into Zone 4 reuse-time scope.

### What remains held — unchanged by this surface

- **Exact carrier shape.** Field types; cross-entity relationships; rollup patterns; cardinality constraints; null handling; default values.
- **Schema.** Airtable; JSON Schema; Pydantic; validator integration.
- **Structured IA model v3.** The Zone 4 constraint list could inform v3 absorption; v3 itself remains held.
- **Z4-C vs Z4-D selection** for event-level carrier shape. Held pending operational pressure.
- **Reuse-type vocabulary.** Held pending operational pressure.
- **Authority-type vocabulary.** Held.
- **Inheritance-dimension vocabulary.** Held.
- **Per-event approval-recurrence vocabulary.** Held.
- **Family-rule vocabulary.** Held.
- **Multi-mode / cross-brand / cross-category / cross-time reuse generalization.** Held pending cross-substrate pressure.
- **Operational test of mocked Zone 4 carriers.** Held; would parallel PR #254 for Option F and PR #266 for intake-reference-rationale.
- **Family-coherence substrate test.** Held pending substrate design that explicitly pressures family-level constraints.
- **Derivative-vs-reuse pressure test.** Held pending substrate that distinguishes scenarios with explicit derivative obligations from informational citations.
- **Supersession-handling test.** Held pending substrate with explicit supersession events.
- **Validator / orchestration consumer surfacing.** Held.
- **Intake-reference-rationale axis (PR #263 / PR #266) growth-pressure pressure surface.** Held; remains adjacent and unrelated to Zone 4 scope.

### What this artifact explicitly does not do

- Author any Airtable field shape, schema mutation, JSON Schema, Pydantic model, or validator logic
- Author any entity placement decision (where reuse-event records or family-lineage records live structurally)
- Author any cross-entity relationship design
- Promote any held carrier candidate to structural form
- Adjudicate the held-candidate inventory
- Mutate structured IA model v2's appendix
- Author structured IA model v3
- Modify [`docs/architecture.md`](architecture.md), [`docs/index.md`](index.md), [`README.md`](../README.md), [`docs/method.md`](method.md), [`AGENTS.md`](../AGENTS.md), any milestone marker, or any prior artifact
- Modify the grounding note
- Author milestone 12
- Authorize an operational pressure test against mocked Zone 4 carriers
- Authorize a family-coherence substrate test
- Authorize a derivative-vs-reuse pressure test
- Authorize a supersession-handling test
- Authorize multi-reader replication
- Authorize validator / orchestration spec
- Resolve any held question
- Resolve the Z4-C vs Z4-D selection
- Pressure intake-time reference rationale (PR #263 axis)
- Pressure Zone 1B (brand-wide constants), Zone 3 (per-touchpoint constraints), or Zone 5 (temporal-state) — those remain separate adjacent decision surfaces

## Self-Superseding Clause

This artifact is a v1 decision surface. It should be superseded by:

- An operational pressure test that mocks Zone 4 carriers (parallel to PR #266 for intake-reference-rationale; parallel to PR #254 / #258 / #260 for Option F) and tests fresh-reader reconstruction of reuse-type distinction, authority transfer, downstream inheritance limits, family-coherence relationships, and supersession handling.
- A family-coherence substrate test that explicitly pressures multi-asset family-level constraints.
- A derivative-vs-reuse pressure test that pressures the architectural distinction between informational citation and derivative obligation.
- A supersession-handling substrate test that pressures how superseded governed outputs interact with downstream contexts.
- A multi-mode reuse test (SKU / collection / marketing / campaign) that pressures cross-mode reuse pattern variation.
- A specific Zone 4 implementation move that authors entity placement, field types, cross-entity relationships, and rollup patterns for the structurally-suggested constraints.
- A structured IA model v3 that absorbs the Zone 4 constraint vocabulary into the YAML appendix's held_questions list.
- A subsequent decision surface that resolves the Z4-C vs Z4-D selection based on operational evidence.
- A combined Zone 4 + intake-reference-rationale + Option F integration test (architectural seam coherence test across three carrier families).
- A subsequent milestone marker (milestone 12, etc.) that absorbs Zone 4 evidence into a plateau.
- The eventual wholesale rewrite of [`docs/architecture.md`](architecture.md) that consolidates the Zone 4 surface at greater depth.

It does not supersede the intake-reference-rationale carrier decision surface v1 (PR #263; the parallel intake-time axis), the intake-reference-rationale operational pressure test v1 (PR #266; the operational support for that axis), the Option F trace carrier shape design surface v1 (PR #256), the Option F contradiction-present continuity-break test v1 (PR #258), the Option F multi-contradiction continuity-break test v1 (PR #260), the intake trace carrier decision surface v1 (PR #252), the continuity-breaking intake trace test v1 (PR #250), the brand-system carrier decision surface v2 (PR #248; which located Zone 4 as adjacent decision surface), the brand intake judgment-trace dry run v1, the layered reference and discretion architecture v1 (PR #239; the nine-fold reference-function taxonomy this surface aligns with), the layered intake architecture v1 (PR #241), the past-campaigns deepening (PR #243; the source of temporal-state trace candidate), structured IA model v2, the apex definition-layer artifact, the Phase 1 mode sketches, the cross-mode synthesis, the six Phase 2 deepenings, milestone 8, milestone 9, milestone 10, or milestone 11. Those remain authoritative for their content depth; this artifact reads them at Zone-4-decision-surface depth.

## Anchor Documents

### Direct conceptual predecessor (the Zone 4 location PR #248 named)

- [`docs/brand-system-carrier-decision-surface-v2.md`](brand-system-carrier-decision-surface-v2.md): PR #248 located Zone 4 (governed-output continuity reference elevation) at the governed-asset / reference-linkage layer, preserved as adjacent and held; this surface is the first focused architectural treatment of Zone 4 since PR #248 named it

### Parallel design surface (intake-time axis; this surface's reuse-time counterpart)

- [`docs/intake-reference-rationale-carrier-decision-surface-v1.md`](intake-reference-rationale-carrier-decision-surface-v1.md): PR #263 design surface for intake-time reference rationale; carrier-shape vocabulary (R-A / R-B / R-C / R-D / R-E / hybrid) this surface parallels at reuse-time scope
- [`docs/intake-reference-rationale-operational-pressure-test-v1.md`](intake-reference-rationale-operational-pressure-test-v1.md): PR #266 operational pressure test for the intake-time axis; supports the conceptual posture this Zone 4 surface extends to reuse-time scope

### Substrate this artifact reads against

- [`docs/option-f-trace-carrier-shape-design-surface-v1.md`](option-f-trace-carrier-shape-design-surface-v1.md): PR #256 design-surface pattern this artifact parallels at a different architectural axis
- [`docs/option-f-multi-contradiction-continuity-break-test-v1.md`](option-f-multi-contradiction-continuity-break-test-v1.md): PR #260 multi-contradiction findings; carrier-shape sharpened-not-closed framing this artifact adopts
- [`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md): PR #239 nine-fold reference-function taxonomy + nine-site creative-discretion decomposition; provides reference vocabulary; reference-function taxonomy applies at reference-asset side, distinct from Zone 4's authority-type vocabulary at governed-output-as-reference side
- [`docs/brand-discovery-digestion-layered-intake-architecture-v1.md`](brand-discovery-digestion-layered-intake-architecture-v1.md): PR #241 seven-stage extraction sequence; intake-stage placement of reference-selection
- [`docs/structured-ia-model-v2.md`](structured-ia-model-v2.md): held_questions list this artifact's constraint vocabulary maps to (without mutating); rejected_assets entity + derivative-governance question + reuse / derivative governance question + temporal-state trace candidate all relate to Zone 4 scope

### Conceptual framing

- [`docs/brand-system-input-past-campaigns-to-ia-mapping-v1.md`](brand-system-input-past-campaigns-to-ia-mapping-v1.md): PR #243 past-campaigns deepening; surfaces temporal-state trace dimension; past-campaigns are the input-category most directly contributing governed-output continuity content
- [`docs/architecture.md`](architecture.md): Scale-of-Operation Held Question framing reads as premise; Zone 4 governance-of-derivative-outputs framing in Inventory entry

### Plateau markers

- [`docs/milestones/milestone-11-zone-6-option-f-carrier-shape-plateau.md`](milestones/milestone-11-zone-6-option-f-carrier-shape-plateau.md): current plateau marker (Zone 6 / Option F); Zone 4 was named as adjacent and held throughout the milestone-11 framing
- [`docs/milestones/milestone-10-phase-2-six-category-synthesis-plateau.md`](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md): prior plateau marker

### Workflow framing

- [`AGENTS.md`](../AGENTS.md): repo-local workflow rules
