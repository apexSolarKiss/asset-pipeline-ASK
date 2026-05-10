# Operator-Judgment Protocol Sketch v1

## Posture

```text
operator-judgment protocol sketch
on-paper protocol-shape proposal
not schema
not workflow procedure
not intake form
not validator
not Airtable
not CI / automation
not proof that a structural carrier is earned
self-superseding once operational pressure earns or refutes structural representation
```

This artifact proposes a candidate protocol shape for the operator's translation work between upstream brand-system inputs and downstream packet / slot / curation constraints. It is example-anchored against three concrete cases drawn from existing repo evidence. It sharpens the `operator_judgment_representation` held question; it does not resolve it.

The artifact is intentionally not a methodology document, not a workflow procedure, and not a schema proposal. The protocol shape names *moments* in the operator's translation work — not fields, not enforcement steps. Whether the shape earns structural representation in any future operational evidence is a separate question this artifact does not answer.

## Why an Operator-Judgment Protocol Sketch Now

Four lines of repo evidence have converged on the same architectural shape:

- **Brand platform deepening** ([`docs/brand-system-input-brand-platform-to-ia-mapping-v1.md`](brand-system-input-brand-platform-to-ia-mapping-v1.md)) showed abstract values, voice, stance distribute to downstream prose carriers via operator interpretation; the brand-system layer is unmodeled, so the work happens implicitly during packet authoring.
- **Visual identity system deepening** ([`docs/brand-system-input-visual-identity-system-to-ia-mapping-v1.md`](brand-system-input-visual-identity-system-to-ia-mapping-v1.md)) showed concrete brand-wide constants (color codes, typeface assignments, logo references) distribute the same way; the same translation work happens implicitly even when the upstream content is concretely defined.
- **Sparse-articulation fallback pressure** ([`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md)) showed that operator judgment becomes load-bearing under stress (sparse / contradictory / divergent input); the architecture surfaces options at every conflict point but does not auto-resolve.
- **Curation-Premise Architectural Fork** ([`docs/architecture.md`](architecture.md)'s `### Curation-Premise Architectural Fork` subsection) named three operational outcomes for the foundational premise; outcomes 2 (premise refines into layered discretionary chain) and 3 (premise fragments into multiple authorship-bearing seams) explicitly involve discretionary chains — which are operator-judgment events made structurally visible.

Each surfaces the same architectural shape from a different angle: the operator's translation work between upstream brand-system inputs and downstream packet / slot / curation constraints is currently prose-carried (via fallback notes, capture notes, curation reasoning, constraint_rules text) and not represented as a first-class protocol shape. The convergence is sufficient to articulate a candidate protocol shape for what that work might look like as something the system can read.

The artifact does not propose to encode the shape, enforce it, or claim that current prose carrying is wrong. It proposes that the translation moments have shape, and articulates a candidate skeleton for what that shape might be — pressured against concrete cases the existing artifacts already surfaced.

## The Translation Surface

What the protocol covers: the operator's resolution work between upstream brand-system inputs and downstream constraints.

**Inputs into the surface:**

- Brand-system content (platform abstractions; visual identity system constants; photography style guide articulations; asset library evidence; application guidelines; past campaigns when articulated)
- Conflicts among the inputs (brand platform vs asset library; conflicting visual identity system documents; sparse articulation paired with rich evidence)
- Sparsity gaps (input categories absent or generic)

**Outputs from the surface:**

- Packet-level constraints (`constraint_rules`, `business_intent`, `creative_intent`, `bounded_creative_discretion` text)
- Slot-level prose (`slot_prompt` text)
- Curation-event prose (`capture_reason`, `capture_notes` text)
- Inferred-not-stated marking when the resolution is operator-derived rather than explicitly stated by upstream sources

**The surface's character today:** prose-carried across multiple existing artifacts, and not represented as a first-class protocol shape.

Pieces of operator-judgment evidence already live in repo prose. The sparse-articulation fallback note articulates a six-layer fallback chain. Capture notes carry curation reasoning. `constraint_rules` text carries resolved upstream content. The four Phase 2 deepenings each articulate fallback patterns for their input category. What is missing is a consistent shape that names the *translation moments* themselves and what evidence the system could read about each — independent of where the resolution happens to land in the existing prose carriers.

The protocol sketch proposes such a shape. It does not propose to encode it as data, to enforce it via validation, or to claim that current prose carrying is wrong or insufficient at the operational pressure the architecture has earned. It proposes that the translation moments have shape, and that the shape is worth naming as a candidate for future structural representation if operational pressure surfaces a need.

## Protocol Shape

The candidate skeleton is intentionally minimal:

```text
source condition
→ conflict / sparsity type
→ fallback-chain position
→ operator inference
→ evidence basis
→ confidence / articulation state
→ downstream constraint
→ later review trigger
```

Each step names a *moment* in the operator's translation work, not a *field*. The skeleton is descriptive, not prescriptive — real translation may compose, skip, or reorder moments depending on the case.

### Source condition

The upstream input being translated. Names the input category (brand platform; visual identity system; photography style guide; asset library; application guidelines; past campaigns), the specific content being translated, and the source provenance (which document, which evidence segment, which authoring authority).

### Conflict / sparsity type

What makes the translation non-mechanical. Categories include:

- **sparsity** — input category absent or generic
- **cross-source divergence** — articulation diverges from evidence (e.g., articulated values differ from asset library voice)
- **intra-source conflict** — different documents from the same source disagree (e.g., brand book v3 vs digital design system)
- **abstraction-to-application gap** — upstream content is too abstract for direct downstream use without interpretation

Other types may emerge from operational pressure; these three are present in current repo evidence.

### Fallback-chain position

Which level of the six-layer fallback chain the operator is operating at. The chain is encoded in `docs/structured-ia-model-v1.md`'s YAML appendix:

```text
asset_library
→ photography_style_guide
→ brand_platform
→ intra_category_recency_specificity
→ phase_1_worked_example_defaults
→ inferred_not_stated
```

Position within the chain is itself protocol-load-bearing: when the operator falls back from asset library to inferred-not-stated, the inference's epistemic register changes meaningfully. The chain encodes order; the protocol step references position.

### Operator inference

What the operator decides. The decision content; not the justification.

### Evidence basis

What grounds the inference. Concrete reference points the operator drew on (specific assets; specific document sections; specific recency / authority signals). The architecture's distinction between articulated abstraction and demonstrated evidence applies here: evidence basis can be evidence-from-articulation (a specific style-guide passage), evidence-from-demonstration (a specific asset library segment), or evidence-from-default (a worked-example baseline) — and the kind of evidence affects how the inference's confidence should be marked downstream.

### Confidence / articulation state

How certain the inference is, and how it should be marked downstream. Categories include:

- **stated** — explicit in upstream source
- **inferred-not-stated** — derived from evidence with reasoning
- **operator-default** — no upstream guidance; standing default applied
- **contested** — evidence is divergent; resolution chosen but uncertain

This step overlaps conceptually with the structured IA model's `inferred_not_stated` marker but extends it: confidence is more than binary stated-vs-inferred, and the architecture currently has no consistent shape for the gradient.

### Downstream constraint

What the inference becomes when applied. References the downstream IA layer carrier (`constraint_rules` text; `bounded_creative_discretion` text; `slot_prompt` text; curation criteria) and the resolved content the carrier holds. The downstream constraint is where the protocol's translation work becomes operationally consumable.

### Later review trigger

When this inference should be revisited. Common triggers: upstream source articulation update; asset library refresh; cross-mode operationalization that pressures the inference; brand-level update; mode-specific pressure that reveals the inference doesn't generalize. The trigger is itself protocol-load-bearing — without it, inferences silently calcify into apparent doctrine even when their evidence basis has shifted.

## Anchored Cases

Three concrete cases, walked through the 8-step skeleton. Each case is drawn from existing repo evidence; the cases are intentionally limited to three so the protocol shape is pressured by distinct conflict patterns without case proliferation.

### Case 1 // Sparse VIS articulation

The case: brand provides VIS document with logo specs + 3-color palette; typography and grid components absent. (Surfaced by VIS deepening's Open Question 3.)

1. **Source condition.** Brand-provided VIS document covering logo + 3-color palette; typography and grid components absent at intake.
2. **Conflict / sparsity type.** Sparsity — VIS components absent.
3. **Fallback-chain position.** `asset_library` (most authoritative when VIS articulation is sparse); `photography_style_guide` may carry adjacent typography conventions if articulated.
4. **Operator inference.** Extract dominant typography pattern from asset library (e.g., serif headline, sans-serif body); treat extracted patterns as VIS-typography-as-derived; defer grid system to layout-time application.
5. **Evidence basis.** Asset library segment of 12 most-recent campaign assets showing consistent typography pairing; photography style guide doesn't articulate typography.
6. **Confidence / articulation state.** Inferred-not-stated; high confidence (consistency across 12 assets); explicit "derived from asset library" marking.
7. **Downstream constraint.** `constraint_rules` text encoding "headline: serif; body: sans-serif; pairing per asset library convention"; `bounded_creative_discretion` text reserving operator latitude on grid until campaign-mode application.
8. **Later review trigger.** Brand provides typography articulation; asset library refresh introduces inconsistency that breaks the inferred pattern.

### Case 2 // Brand platform divergence from asset library

The case: brand platform articulates "we are warm but not sentimental"; asset library shows imagery that reads as cool / clinical. (Surfaced by brand platform deepening's articulated-vs-demonstrated fallback.)

1. **Source condition.** Brand platform document articulates warmth-not-sentimentality; asset library 8 of 10 most recent campaign images skew cool.
2. **Conflict / sparsity type.** Cross-source divergence — articulation diverges from evidence.
3. **Fallback-chain position.** `asset_library` carries (visual-as-fidelity-strategy from the apex aesthetic-layering pass).
4. **Operator inference.** Treat asset library evidence as the operating reality; mark articulated value as performative-or-aspirational; downstream `creative_intent` text reflects the cool register the asset library demonstrates.
5. **Evidence basis.** 8 of 10 most-recent campaign images skew cool; voice-supporting copy in past campaigns shows minimal warmth markers; brand book voice section is 3 years old.
6. **Confidence / articulation state.** Divergent; high confidence on operating reality; explicit "asset library evidence supersedes articulated platform" marking.
7. **Downstream constraint.** `bounded_creative_discretion` encodes cool-leaning visual register; voice text in `creative_intent` reflects asset-library register; capture criteria flag warmth-leaning candidates as off-evidence.
8. **Later review trigger.** Brand platform updated to resolve the articulated / operational divergence; asset library shifts toward warmer register suggesting brand operating reality is changing.

### Case 3 // Conflicting VIS documents

The case: brand has three VIS documents — brand book v3 (2023), digital design system (2025), packaging guide (2024) — with overlapping but divergent typography / color / grid articulation. (Surfaced by VIS deepening's "conflicting visual identity system articulations across documents" fallback.)

1. **Source condition.** Three VIS documents with overlapping scopes and divergent rules; specifically — typography divergence between brand book v3 and digital design system; color palette extension in packaging guide.
2. **Conflict / sparsity type.** Intra-source conflict — multiple authoritative documents from the same brand disagree.
3. **Fallback-chain position.** Most-recent + most-scope-specific articulation typically carries; specific-scope documents (digital design system; packaging guide) carry within their specific scope; brand book v3 carries as default outside specific scopes.
4. **Operator inference.** Digital design system carries for digital-output packets; packaging guide carries for print packaging packets; brand book v3 carries as default for general-purpose packets; resolution is scope-specific rather than uniform.
5. **Evidence basis.** Document recency (digital design system 2025; packaging guide 2024; brand book v3 2023); document scope statements; brand-team authority signals (digital design system signed off by VP Design 2025-Q1).
6. **Confidence / articulation state.** Medium confidence; depends on output medium of the specific packet; explicit "scope-resolved per document authority" marking.
7. **Downstream constraint.** `constraint_rules` text references the document-of-authority for the specific packet's output medium; cross-medium packets may carry both and resolve at slot level.
8. **Later review trigger.** Brand consolidates documents into a single authoritative VIS; new document supersedes one of the three; cross-document authority conflict surfaces (e.g., digital design system updated mid-year contradicts packaging guide).

The three cases differ in conflict shape — sparsity (Case 1), cross-source divergence (Case 2), intra-source conflict (Case 3) — and exercise the protocol shape against the three most distinct conflict patterns existing repo evidence has surfaced. More cases would document repetition; these three carry the burden.

## What the Sketch Does Not Carry

- **Operator judgment as data.** The eight steps are protocol moments, not fields. The artifact does not propose JSON Schema, Pydantic models, or any structural encoding.
- **Field-level proposal.** Each step describes a moment; whether and how to structure a record around the moment is a separate question this artifact does not answer.
- **Workflow procedure.** The artifact does not say "operators must walk these eight steps in this order." Real translation may compose, skip, or reorder moments; the protocol shape is descriptive, not prescriptive.
- **Intake form or UI.** The sketch is on-paper architectural shape, not an implementation surface.
- **Validator integration.** The drift checker's "machine-used" claim ([`scripts/check_structured_ia_refs.py`](../scripts/check_structured_ia_refs.py)) does not extend to this protocol sketch; the artifact does not propose validation.
- **CI or automation wiring.**
- **Airtable.** The artifact stays on paper per the IA layered-content redirection's pause on Airtable mutation.
- **Earned structural representation.** `operator_judgment_representation` remains held in `docs/structured-ia-model-v1.md`; this artifact does not earn its YAML row.

## Held vs Earned

This artifact sharpens the `operator_judgment_representation` held question; it does not resolve it.

**What is sharpened:**

- The translation work has *shape* — it is not amorphous prose
- The shape is *protocol-bearing* (sequence of moments) rather than data-bearing (set of fields)
- Concrete cases can be walked through the shape and produce coherent records
- The three anchored cases distinguish three distinct conflict patterns, each with characteristic protocol traversal

**What remains held:**

- Whether the protocol shape generalizes beyond the three anchored cases (and the variations within the broader fallback model)
- Whether the protocol-shape candidate earns structural representation (Pydantic, JSON Schema, Airtable carrier) — operational pressure has not surfaced an earning need
- Whether the protocol's records should live in their own carrier or be folded into existing prose carriers (`constraint_rules`, `bounded_creative_discretion`, `capture_notes`)
- Whether the curation-premise fork's three outcomes — premise holds, premise refines, premise fragments — each compose with the protocol shape cleanly, or whether outcomes 2 and 3 require per-seam protocol variation

Per the v51 doctrine ("structure earns its keep when observed operational pressure surfaces a need; paper prediction does not"): operational pressure has not earned a structural representation of operator judgment. The sketch is paper-pressed. Resolution requires operational evidence the sketch cannot provide.

The structured IA model v1's YAML appendix continues to hold `operator_judgment_representation` as a question marker. This sketch does not change that.

## Open Questions

1. **Does the eight-step protocol shape generalize beyond the three anchored cases?** The cases pressure sparsity, cross-source divergence, and intra-source conflict. Other translation moments (mode-specific overlay resolution; inheritance from sub-brand; campaign-concept selection for outcome 2 of the curation-premise fork) are unprobed at sketch depth.

2. **Where do the eight-step records live operationally?** The architecture has prose carriers (`constraint_rules`, `capture_notes`, etc.) that already absorb pieces of the protocol's content. Whether the protocol earns a separate evidence layer (a `judgment_record` first-class entity) or remains distributed across existing carriers is unprobed.

3. **How does the protocol relate to the curation seam's structurally explicit provenance?** Curation events have five-axis provenance + `curator` + `curation_pattern`. The protocol's `evidence basis` + `confidence / articulation state` + `downstream constraint` resemble curation provenance shape. Whether the protocol shape generalizes the curation seam's provenance pattern upstream, or whether the two shapes are distinct, is unprobed.

4. **How does the protocol absorb the curation-premise architectural fork's outcomes?** Outcome 1 (premise holds) treats curation as terminal; the protocol covers upstream judgment events. Outcome 2 (premise refines into layered discretionary chain) is consistent with the protocol's sequence-of-moments shape. Outcome 3 (premise fragments into multiple authorship-bearing seams) may need per-seam protocol variation. Whether the protocol shape accommodates outcomes 2 and 3 cleanly, or fragments under their pressure, is unprobed.

5. **How does the protocol interact with auto-narrowing patterns (agentic curation; auto-suggested defaults)?** When an agent narrows candidates before operator review, where does the agent's narrowing fit in the protocol sequence? Is it a separate translation event upstream of operator inference, or a sub-step of evidence basis? Unprobed.

6. **Should `confidence / articulation state` (step 6) and the structured IA model's `inferred_not_stated` fallback-chain endpoint be unified, distinct, or composed?** They overlap conceptually: both name a translation's epistemic register. Unprobed.

7. **Does the sketch's case selection bias the protocol shape?** Three cases were chosen for distinctness; the choice may have privileged conflict patterns the architecture already understands well. Whether different case selection (e.g., mode-specific overlay resolution; campaign-concept selection; cross-brand inheritance) would surface protocol-shape pressure the current sketch misses is itself an open question.

## Self-Superseding Clause

This artifact is a protocol-shape sketch. It should be superseded by:

- subsequent operational evidence that pressures the protocol shape — either earning structural representation (Pydantic, JSON Schema, or Airtable carrier) or refuting the shape's generalization
- a Phase 2 milestone synthesis that absorbs the operator-judgment surface alongside other Phase 2 outputs
- whatever later milestone synthesis absorbs the redirection alongside Phase 1 + Phase 2 outputs and any operational evidence
- the eventual `docs/architecture.md` rewrite that consolidates the apex artifact, the Phase 1 sketches, the Phase 2 artifacts, the Curation-Premise Architectural Fork, and any operational evidence
- any operational test that earns or refutes the structural representation of operator judgment — this sketch adds the protocol-shape candidate to the pressure surface but does not resolve it

It does not supersede the Phase 2 deepenings, the sparse-articulation fallback note, the structured IA model v1, the Curation-Premise Architectural Fork in `architecture.md`, the apex artifact, or its predecessor passes. Those remain authoritative for their subject matter; this artifact reads them at protocol-shape sketch depth.

## Anchor Documents

### Phase 2 framing

- [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md): Phase 2 opening sketch
- [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md): photography deepening; articulated visual conventions
- [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](brand-system-input-asset-library-to-ia-mapping-v1.md): asset library deepening; demonstrated visual evidence; visual-as-fidelity-strategy claim that grounds Case 2's fallback
- [`docs/brand-system-input-brand-platform-to-ia-mapping-v1.md`](brand-system-input-brand-platform-to-ia-mapping-v1.md): brand platform deepening; abstract-articulation pressure; surfaced Case 2's articulation-vs-evidence shape
- [`docs/brand-system-input-visual-identity-system-to-ia-mapping-v1.md`](brand-system-input-visual-identity-system-to-ia-mapping-v1.md): VIS deepening; concrete brand-wide constants pressure; surfaced Case 1's sparsity shape and Case 3's cross-document conflict shape
- [`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md): sparse-articulation fallback pressure; six-layer fallback chain that the protocol's step 3 references
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): redirection note framing Phase 2 work

### Phase 1 outputs

- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md): cross-mode synthesis; carrier-status matrix that the protocol's step 7 references
- [`docs/ia-layered-content-sketch-campaign-mode-v1.md`](ia-layered-content-sketch-campaign-mode-v1.md): brand campaign / editorial mode IA content; surfaced the curation-premise pressure that the protocol's later-review-trigger step connects to

### Apex and architectural-pass predecessors

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact; Named Limitation #1 (which both brand platform and VIS deepenings concretized) is the structural void this protocol's translation work currently routes around
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic layer-shape sketch; visual-as-fidelity-strategy / prose-as-fallback claim that grounds Case 2
- [`docs/architecture.md`](architecture.md): current-architecture front door; the Curation-Premise Architectural Fork subsection that the protocol's later-review-trigger step connects to

### Structured form

- [`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md): structured IA model v1; carries `operator_judgment_representation` as a held question — this sketch sharpens that held question by naming a protocol-shape candidate; it does not resolve the question or earn YAML representation

### Plateau marker

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the operational plateau the Phase 1 + Phase 2 work reads against
