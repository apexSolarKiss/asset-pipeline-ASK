# Continuity-Breaking Intake Trace Test v1

## Posture

```text
operational-pressure test artifact
Zone 6 pressure (intake-time judgment trace)
intake / governance layer
not brand-system carrier decision (Zones 1+2)
not packet/slot constraints (Zone 3)
not governed-asset / reference-linkage (Zone 4)
not reference-asset lifecycle / temporal-state (Zone 5)
not Airtable
not schema mutation
not JSON Schema
not Pydantic
not validator integration
not orchestration spec
not UI / intake-form design
not milestone
not held-candidate adjudication map
not architecture rewrite
not README / index / architecture cleanup
not grounding-note edit
not final doctrine
does not earn structural-carrier shapes
sharpens held candidates from paper-pressed to operationally-pressed
self-superseding when a real multi-operator continuity-break test absorbs it
```

This artifact pressures Zone 6 of the brand-system carrier decision surface v2's zone framework: the intake-time judgment trace. Per [`docs/brand-system-carrier-decision-surface-v2.md`](brand-system-carrier-decision-surface-v2.md) Section 5, Zone 6 is not a brand-system-layer carrier question; it is a trace / governance question that lives at the intake layer. The architecture's Scale-of-Operation Held Question (per [`docs/architecture.md`](architecture.md)'s named structural concerns) bound the conditional pressure path on intake-time judgment trace to a multi-operator or continuity-breaking scale condition untested. This artifact is the bounded continuity-break test that pressure path named.

## Test Question

**Can a downstream reader reconstruct why brand-system content entered the IA at a given layer, with a given derivation basis, without access to the original intake operator's memory?**

### What continuity is being broken

The continuity assumption the architecture currently relies on at the brand-digestion site (per PR #239's per-site trace-gap analysis): operator continuity bridges the trace gap. The intake operator carries memory of which sources were inspected, which content was lifted vs inferred vs defaulted, which fallback chain position produced each piece of resolved content, and which conflicts were resolved how. Downstream readers who share the intake operator's continuous context can ask the operator to re-narrate the intake decisions when needed.

The continuity break: the downstream reader does NOT have access to the intake operator's memory. The reader has access only to what survives in the IA after intake — the structural carriers (`reference_assets`; `approved_reference_keys`; `slot_role`; `governed_output_status`) and the prose carriers (`creative_intent`; `business_intent`; `bounded_creative_discretion`; `slot_prompt`; `capture_reason`; `capture_notes`).

### What a downstream reader should be able to reconstruct

Per the dry-run's five trace dimensions plus PR #241's operator-authored vs inferred-not-stated distinction, a downstream reader operating beyond operator continuity should be able to reconstruct, for each piece of content in the resulting packet:

1. **Presence of inspection** — was each fallback chain layer inspected, regardless of what content it produced?
2. **Articulation state** — was each layer's source content articulated, partial, generic, or absent at intake time?
3. **Chain position** — which fallback chain position resolved each piece of content (asset library / photography style guide / brand platform / intra-category recency / Phase 1 worked-example defaults / inferred-not-stated)?
4. **Derivation basis** — was each piece lifted verbatim, inferred from evidence, applied as worked-example default, operator-authored, or unresolved-marked?
5. **Contradiction resolution** — when sources conflicted, how was the conflict resolved (which source carried; what fallback rule applied)?
6. **Operator-authored vs inferred-not-stated** (PR #241 sub-distinction) — for content lacking direct upstream articulation, was it derived from evidence (inferred-not-stated) or authored without evidence (operator-authored)?

### What counts as success / partial success / failure

For each piece of content the test pressures:

- **Success.** Downstream reader can reconstruct the trace dimension reliably from the IA carriers alone. Operator continuity is not required.
- **Partial success.** Downstream reader can reconstruct the trace dimension with effort and some inference, but the reconstruction is not unambiguous; operator continuity would resolve the ambiguity but the reader can produce a reasonable read.
- **Failure.** Downstream reader cannot reconstruct the trace dimension from the IA carriers alone. Operator continuity is load-bearing for the reconstruction.

Aggregate test outcome reads:

- **Trace holds.** Most or all dimensions reach success or partial success across most content pieces. The architecture preserves intake reasoning for non-author readers without structural intake-trace carriers.
- **Trace partially breaks.** Dimensions vary — some hold, some fail. The architecture preserves some intake reasoning structurally but relies on operator continuity for others. Specific failure-mode dimensions are named.
- **Trace breaks.** Most or all dimensions fail across most content pieces. The architecture relies on operator continuity for intake-reasoning preservation; non-author readers cannot reconstruct intake decisions structurally.

The test does not pre-commit to which outcome is expected. Honest reading of the reconstruction exercise per Section 5 follows in Section 6.

## Test Substrate

**The substrate is the brand intake judgment-trace dry run v1's synthetic stack and intake decisions** ([`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md)). No new synthetic stack is introduced.

The dry run's bounded intake task: produce a one-packet workflow for a hero product image of a single SKU (synthetic kitchen-textiles category). The packet needed `business_intent`, `creative_intent`, `bounded_creative_discretion`, packet-level `approved_reference_keys`, and one or more `output_slots`.

The dry run's synthetic stack (deliberately sparse):

- Brand platform: only audience field articulated ("everyday households"); voice / values / positioning not articulated
- VIS: one logo reference (single wordmark; no clear-space rules); two colors named ("warm off-white"; "soft tan"); typography / grid not articulated
- Photography style guide: not articulated
- Asset library: four reference images of past kitchen-textiles products; no campaign imagery; no styled-context imagery
- Application guidelines: not articulated
- Past campaigns: none

The dry run walked the six-layer fallback chain (asset library → photography style guide → brand platform → intra-category recency / specificity → Phase 1 worked-example defaults → inferred-not-stated). The narrative documented intake decisions and reasoning at each layer.

### Why this substrate

Per ASK direction: use existing repo materials only. The dry run is the test substrate for which the trace-dimension vocabulary was originally walked — exactly the substrate Zone 6 pressure should be tested against. Reusing it preserves continuity with the trace-dimension framing PR #241 + PR #243 + PR #248 read against, without introducing new synthetic content.

The substrate has limitations the test inherits:

- The dry-run synthetic stack has no past campaigns, so the temporal-state trace dimension (Zone 5 / PR #243 candidate) is not pressured by this test. Temporal-state pressure would require either a different synthetic stack with past campaigns or a real-brand intake.
- The dry run did not pressure contradictory or divergent articulation — only sparse articulation. So the contradiction-resolution trace dimension is not directly pressured by this test; it would require a different synthetic stack or a real-brand intake.
- The synthetic stack is one stack; the dry run was one walk. Real brand-intake variability is unrepresented.

These are limits of the substrate, not of Zone 6 pressure as a category.

### What the simulated downstream reader has access to

After the dry-run intake landed, the IA contains (paraphrased from the dry-run's narrative of what was produced):

- A **packet** record with:
  - `business_intent` — populated (content not specified in dry run; assumed to be operator-authored or absorbed default for the kitchen-textiles hero use case)
  - `creative_intent` — populated combined prose containing:
    - The audience cue lifted verbatim from brand platform: "everyday households"
    - An inferred voice qualifier: "calm, warm-tone, accessible"
  - `bounded_creative_discretion` — populated (the dry run noted operator could carry the inferred dimension as a separate clause but did not commit to a specific shape)
  - `approved_reference_keys` — linked to all four asset-library references
- A **slot** record with:
  - `slot_role` — `HERO` (per Phase 1 SKU-driven sketch defaults)
  - `slot_prompt` — populated prose absorbing the SKU-driven sketch's hero-slot pattern
- **`reference_assets`** — four image records linked into `approved_reference_keys`

What the simulated downstream reader does NOT have access to:

- The dry-run's narrative (the intake operator's documented decisions and reasoning)
- Operator memory (the intake operator's recall of what was inspected, lifted, inferred, defaulted, or rejected)
- Out-of-band documentation (any operator-side notes, scratch artifacts, or ambient communication not captured in the IA's structural or prose carriers)

### Important caveat on simulation

This test is implemented by one operator (the artifact author) simulating both the original intake operator (whose decisions are documented in the dry run) and the simulated downstream reader (attempting reconstruction from the IA view). The simulation is honest in that the author refrains from using the dry run's narrative when assessing what the downstream reader could reconstruct; but it is still a single-author simulation, not a multi-operator continuity break.

A real continuity-break test would involve a different human (or future agent) attempting reconstruction from the IA view alone, with no exposure to the original intake operator's documented or remembered reasoning. The findings here are the closest substitute available without authorizing a real multi-operator test.

## Trace Dimensions Tested

The six dimensions the reconstruction exercise pressures, mapped to the trace dimensions named in the dry run + PR #241 + PR #243:

1. **Presence-of-inspection** — at each fallback chain layer, was the layer inspected? Currently no carrier; held candidate pressure path.
2. **Articulation-state** — at each layer, was source content articulated, partial, generic, contradictory, divergent, or absent? Held candidate `articulation_state` flag (paper-pressed in sparse-articulation pressure note).
3. **Chain-position** — for each piece of resolved content, which fallback chain position produced it? Held candidate `fallback_chain_position` annotation (paper-pressed in sparse-articulation pressure note).
4. **Derivation-basis** — for each piece of resolved content, lifted verbatim / inferred from evidence / applied as worked-example default / operator-authored / unresolved-marked? Held candidate `derivation_basis` field (paper-pressed); PR #241 surfaced operator-authored as a fifth value architecturally distinct from inferred-not-stated.
5. **Contradiction-resolution** — when sources conflict, how was the conflict resolved? Held candidate `contradiction_log` entity. NOT directly pressured by this test (substrate has no contradiction case).
6. **Operator-authored vs inferred-not-stated** (PR #241 sub-distinction) — within derivation-basis, was content authored without evidence vs derived from evidence? Sub-classification held; PR #241 articulated the architectural distinction.

The test also notes where temporal-state trace (Zone 5; PR #243 candidate) would apply but does not pressure it directly (substrate has no past campaigns).

## Reader Reconstruction Exercise

For each of six bounded content pieces produced by the dry-run intake, the reconstruction question asks: what can the simulated downstream reader recover from the IA view alone, and what depends on operator continuity?

### Content piece 1 — the four references in `approved_reference_keys`

**What the reader sees.** Four `reference_assets` records linked to the packet via `approved_reference_keys`. Each `reference_assets` record has the image attachment and (per current carriers) any populated metadata fields like `asset_uri`. There is no metadata field for "selection rationale" or "axes of convergence/divergence noted at intake."

**What the reader can reconstruct without operator continuity:**

- That four references are attached to the packet. **Success.**
- That these references are the packet-level reference set (vs slot-level). Visible from the linkage shape. **Success.**

**What the reader cannot reconstruct:**

- Whether four was the brand's full library or whether the four were selected from a larger candidate set. **Failure** (chain-position trace partial — reader knows references came from "the asset library" by virtue of being in `reference_assets` but does not know whether selection narrowed a larger set or absorbed the full library).
- That the operator inspected the asset library at all (vs absorbed the references mechanically without inspection). **Failure** (presence-of-inspection trace).
- The axes of convergence/divergence the operator noted at inspection (warm-tone convergence; background divergence). **Failure** (derivation-basis trace; no carrier for inspection notes).
- That four references were the entire library segment (the dry run's stack was deliberately sparse) vs a representative subset of a larger library. **Failure** (articulation-state trace at the asset-library layer).

**Per-dimension status for this content piece:**

- Presence-of-inspection: **failure**
- Articulation-state: **failure**
- Chain-position: **partial success** (reader knows asset library was the source; doesn't know selection narrowing)
- Derivation-basis: **partial success** (reader knows references were "lifted" in the sense that they are linked verbatim, but cannot recover inspection-axis notes)
- Contradiction-resolution: not pressured (no contradiction in this content piece)
- Operator-authored vs inferred: not pressured (this is direct lift, not inference)

### Content piece 2 — "everyday households" in `creative_intent`

**What the reader sees.** The phrase "everyday households" appearing in the packet's `creative_intent` prose, embedded alongside other phrasing.

**What the reader can reconstruct without operator continuity:**

- That "everyday households" describes the audience or use context. Visible from semantic content. **Success.**
- That this phrasing is tied to the packet's intent. Visible from carrier location. **Success.**

**What the reader cannot reconstruct:**

- Whether "everyday households" is a verbatim lift from a brand-system source (brand platform's audience field, in this case) or operator-authored phrasing or operator-inferred phrasing. **Failure** (derivation-basis trace).
- Whether brand platform was inspected at all. **Failure** (presence-of-inspection trace).
- Whether brand platform was richly articulated or sparse (it was sparse — only the audience field). **Failure** (articulation-state trace).
- That "everyday households" specifically came from the brand-platform layer (Layer 3 in the fallback chain) rather than from operator authoring or worked-example defaults. **Failure** (chain-position trace).

**Per-dimension status:**

- Presence-of-inspection: **failure**
- Articulation-state: **failure**
- Chain-position: **failure**
- Derivation-basis: **failure**
- Contradiction-resolution: not pressured
- Operator-authored vs inferred: not pressured (this is verbatim lift, but the reader cannot tell that without operator continuity)

### Content piece 3 — "calm, warm-tone, accessible" in `creative_intent`

**What the reader sees.** A prose qualifier in `creative_intent` describing the brand's voice register. Embedded alongside the audience cue and other content.

**What the reader can reconstruct without operator continuity:**

- That this is voice / tone content. Visible from semantic content. **Success.**

**What the reader cannot reconstruct:**

- That this content was inferred from the asset library's collective gestalt rather than lifted from brand platform articulation. The dry run's intake operator inferred "calm, warm-tone, accessible" from the asset library's convergent tone because brand platform was sparse on voice/values. The downstream reader cannot tell this from the IA view. **Failure** (derivation-basis trace; this is the operator-authored vs inferred-not-stated PR #241 distinction in operation — the content was inferred-from-evidence, not operator-authored, but the reader cannot distinguish).
- That brand platform was sparse on voice/values content (the inference happened because brand platform was sparse). **Failure** (articulation-state trace).
- Which fallback chain layer produced this content (Layer 1 evidence inferred upward, with Layer 3 brand-platform absent for the equivalent content). **Failure** (chain-position trace).
- Whether brand platform's voice/values content was inspected and found absent vs not inspected. **Failure** (presence-of-inspection trace at Layer 3).

**Per-dimension status:**

- Presence-of-inspection: **failure**
- Articulation-state: **failure**
- Chain-position: **failure**
- Derivation-basis: **failure** (PR #241 sub-distinction also fails — reader cannot tell inferred-from-evidence vs operator-authored)
- Contradiction-resolution: not pressured (no contradiction case here, but if brand platform had said "vibrant, bold, energetic" while asset library showed warm/calm, the contradiction-resolution would also fail at reconstruction)
- Operator-authored vs inferred: **failure**

### Content piece 4 — `slot_role` = HERO

**What the reader sees.** The slot's `slot_role` enum value: HERO.

**What the reader can reconstruct without operator continuity:**

- That this slot is a HERO role. **Success** (enum is structurally explicit).
- That HERO is a Phase 1 SKU-driven mode role pattern. Reconstructable by reading [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md) cross-reference. **Success** (enum vocabulary is mode-anchored).

**What the reader cannot reconstruct:**

- Whether the operator chose HERO from a larger role inventory (vs HERO being the only available role for SKU mode at this packet's stage). **Partial success** — reader can read the SKU-driven sketch and infer that HERO/PROFILE/DETAIL is the canonical role inventory for SKU mode; the choice of HERO specifically is somewhat self-evident for a single-image-per-SKU intake task, but the chain-position trace (was this from operator decision or from worked-example default) is not directly recoverable.
- Whether application guidelines content informed the choice (it didn't — application guidelines was sparse — but the reader cannot tell). **Failure** (presence-of-inspection at Layer 4 / application-guidelines equivalent).

**Per-dimension status:**

- Presence-of-inspection: **partial success / failure** (mode role inventory is reconstructable; per-layer inspection trace is not)
- Articulation-state: **partial success** (reader can infer that the role choice is canonical for SKU mode)
- Chain-position: **partial success** (reader can infer worked-example default vs operator selection, but not unambiguously)
- Derivation-basis: **partial success** (similar)
- Contradiction-resolution: not pressured
- Operator-authored vs inferred: not pressured (the role enum is from a fixed vocabulary, neither authored nor inferred)

This is the reconstruction-friendliest content piece in the exercise. The reason: `slot_role` is a structural enum tied to a Phase 1 mode vocabulary that the reader can cross-reference. When IA content takes structural enum form rather than free-form prose, reconstruction improves substantially — but the architecture's hostage to operator continuity for free-form content remains.

### Content piece 5 — `slot_prompt` content

**What the reader sees.** The slot's `slot_prompt` text: prose absorbing the SKU-driven sketch's hero-slot pattern (per the dry-run narrative — clean studio; product isolation; mild context).

**What the reader can reconstruct without operator continuity:**

- That this is composition / lighting / framing content for the HERO slot. **Success** (semantic content).
- That this content is in the slot prose carrier, vs the packet prose carrier, vs the curation prose carrier. **Success** (carrier location is structural).

**What the reader cannot reconstruct:**

- Whether this prose was operator-authored from scratch or applied from the Phase 1 SKU-driven worked-example sketch's hero-slot pattern. **Failure** (derivation-basis trace; this is the worked-example-default value of derivation-basis specifically).
- Whether photography style guide content informed the prose. The dry-run intake did not have articulated photography style guide; the reader cannot tell this from the IA view. **Failure** (presence-of-inspection at Layer 2 / photography-style-guide equivalent; articulation-state at Layer 2).
- Whether the prose came from Layer 5 (worked-example defaults) or Layer 7 (operator-authored). **Failure** (chain-position trace; PR #241 operator-authored vs inferred sub-distinction also fails — though here the answer is operator-applied-default, which is yet a third category beyond authored vs inferred).
- Whether content evolved from initial draft to final form (was the slot_prompt the operator's first draft, or did it iterate against asset-library reference content?). **Failure** (derivation iteration is not carried).

**Per-dimension status:**

- Presence-of-inspection: **failure**
- Articulation-state: **failure**
- Chain-position: **failure**
- Derivation-basis: **failure** (worked-example-default and operator-applied are indistinguishable from operator-authored)
- Contradiction-resolution: not pressured (no contradiction case)
- Operator-authored vs inferred: **failure** (and PR #241's sub-distinction is now sharpened — the architecture needs not just lifted / inferred / authored but also worked-example-defaulted / worked-example-applied as distinct values)

### Content piece 6 — what isn't in the packet at all

**What the reader sees.** Absence. Specifically: the packet does not have content from Layer 4 (intra-category recency / specificity) or Layer 6 (inferred-not-stated marking).

**What the reader can reconstruct without operator continuity:**

- That the packet has whatever content the carriers contain. The reader can read the populated fields. **Success** for what's present.

**What the reader cannot reconstruct:**

- Whether Layer 4 was checked-and-empty (the dry run's intake confirmed no prior packets in the kitchen-textiles category) vs not-checked. **Failure** (presence-of-inspection trace at Layer 4).
- Whether Layer 6 was reached (no content reached Layer 6 in the dry run — Layers 1, 3, and 5 absorbed the sparsity) vs Layer 6 not being reached because the operator stopped at Layer 5 vs Layer 6 not being relevant. **Failure** (presence-of-inspection trace at Layer 6).
- Whether the absence of past campaigns from the brand-system stack was recognized at intake or was a default the operator never inspected. **Failure** (articulation-state trace at the past-campaigns layer; presence-of-inspection trace at the past-campaigns layer).

**Per-dimension status:**

- Presence-of-inspection: **failure** (across the absent layers)
- Articulation-state: **failure**
- Chain-position: not pressured (no content produced)
- Derivation-basis: not pressured (no content produced)
- Contradiction-resolution: not pressured
- Operator-authored vs inferred: not pressured

This content piece pressures the **negative-space trace** — what intake inspected and rejected vs what intake never touched. The dimension is uncovered by current carriers entirely.

## Findings

### Per-dimension aggregate across the six content pieces

| Trace dimension | Reconstruction status (aggregate) |
|---|---|
| **Presence-of-inspection** | Failure across nearly all content pieces. Reader cannot tell whether each fallback chain layer was inspected. The dimension is uncovered by current carriers. |
| **Articulation-state** | Failure across nearly all content pieces. Reader cannot tell whether source content was articulated, partial, generic, or absent at intake time. The dimension is uncovered by current carriers. |
| **Chain-position** | Failure across most content pieces. Partial success for content where the carrier itself signals chain position (slot_role enum tied to Phase 1 mode vocabulary). Free-form prose content does not signal chain position. |
| **Derivation-basis** | Failure across nearly all free-form prose content. Partial success for direct attachments (the reference imagery itself is structurally lifted). Worked-example defaults are indistinguishable from operator-authored content. |
| **Contradiction-resolution** | Not pressured by this substrate (no contradictions in the dry-run synthetic stack). Implication: contradiction-resolution would also fail at reconstruction in cases where contradictions exist, by symmetry with derivation-basis failure. |
| **Operator-authored vs inferred-not-stated (PR #241 sub-distinction)** | Failure across all free-form prose content. The reader cannot distinguish content the operator authored from content the operator inferred from evidence. The architectural distinction PR #241 named is not recoverable from the IA view. |
| **Worked-example-default vs operator-authored (sub-distinction this test surfaces)** | Failure. The Section 5 walk surfaces a third sub-distinction within derivation-basis — content the operator absorbed from Phase 1 worked-example defaults is indistinguishable from operator-authored content. PR #241's two-value distinction (operator-authored vs inferred-not-stated) understated the carrier shape needed; the test surfaces a five-value derivation-basis as a candidate (lifted-verbatim / inferred-from-evidence / worked-example-default / operator-authored / unresolved-marked). Held candidate; not earned in this test. |

### Where current prose / artifact structure is sufficient

Limited cases:

- **`reference_assets` linkage** is structurally explicit. The reader can see which references are linked and which packet they belong to. The linkage shape itself carries trace information, even though the reasoning behind the linkage is not carried.
- **`slot_role` enum** is structurally explicit and ties to a Phase 1 mode vocabulary. The reader can infer mode-canonical roles. This is the one case in the exercise where reconstruction approaches success.
- **Carrier location** (packet vs slot vs curation seam) is structurally explicit and signals which IA layer the content lives at. This is partial reconstruction help — it doesn't recover intake reasoning, but it preserves layer assignment.

### Where reconstruction depends on operator memory

Most of the exercise. Specifically:

- All free-form prose content (`creative_intent`, `business_intent`, `bounded_creative_discretion`, `slot_prompt`) requires operator continuity to reconstruct derivation-basis, chain-position, articulation-state, presence-of-inspection, or operator-authored-vs-inferred.
- Negative-space content (what intake inspected and rejected; what intake never touched) requires operator continuity entirely.
- Inference history (whether content emerged from Layer 1 evidence inferring upward vs from Layer 3 brand-platform articulation) requires operator continuity.

### Where a trace dimension is missing

All six trace dimensions surface as missing or only partially carried:

1. **Presence-of-inspection** — fully missing
2. **Articulation-state** — fully missing
3. **Chain-position** — partially carried by enum-shaped content (slot_role); fully missing for prose content
4. **Derivation-basis** — partially carried by direct attachments (`reference_assets` linkage); fully missing for prose content; sub-classification (lifted / inferred / defaulted / authored / unresolved) entirely absent
5. **Contradiction-resolution** — not pressured by substrate; implied missing by symmetry
6. **Operator-authored vs inferred-not-stated** — fully missing for prose content (the PR #241 sub-distinction has no carrier)

The test surfaces the negative-space trace (what wasn't touched at intake) as a sub-dimension of presence-of-inspection that PR #241's dry run did not name explicitly — the dimension is inspect-or-not, but at intake's negative space (layers not reached), even the inspection trace is absent.

### Where a held candidate becomes more or less pressured

**More operationally pressured (sharpened from paper-pressed to operationally-pressed):**

- `articulation_state` flag (held in sparse-articulation pressure note + structured IA model v2 `held_questions`). The test demonstrates that downstream readers cannot reconstruct articulation-state from the IA view; under continuity break, the dimension is fully missing.
- `derivation_basis` field (held in sparse-articulation pressure note + structured IA model v2 `held_questions`). The test demonstrates failure across all free-form prose content; the carrier candidate is operationally-pressed for prose-carrier-shaped content specifically.
- `fallback_chain_position` annotation (held in sparse-articulation pressure note + structured IA model v2 `held_questions`). The test demonstrates failure across most content pieces; only enum-shaped content (slot_role) preserves chain-position partially.
- The PR #241 operator-authored vs inferred-not-stated sub-distinction. The test demonstrates that the architectural distinction is not recoverable from the IA view; the carrier question this distinction implies is operationally-pressed.

**Sharpened to a finer sub-classification than PR #241 named:**

- A five-value `derivation_basis` (lifted-verbatim / inferred-from-evidence / worked-example-default / operator-authored / unresolved-marked) is more honestly the candidate than PR #241's two-value distinction. The Section 5 walk surfaces this. Held candidate; not earned.

**Not deflated:**

- No held trace candidate is deflated by this test. The test does not demonstrate that any of the trace dimensions can be carried adequately by current prose discipline at the simulated continuity break.

**Not directly pressured:**

- `contradiction_log` entity (held). Substrate does not pressure contradiction cases.
- Temporal-state trace (PR #243 candidate). Substrate has no past campaigns.

### Aggregate test outcome

**Trace partially breaks** (per the success / partial / failure framing in Section 2). Most dimensions fail across most content pieces; a small number of cases (enum-shaped content; structurally-explicit linkage) preserve partial success. The architecture relies on operator continuity for intake-reasoning preservation in nearly all free-form prose content. The carriers that preserve reconstruction partially (slot_role enum; reference_assets linkage) do so because they are structurally explicit and tied to mode-anchored vocabulary, not because of any intake-trace-specific carrier.

The conditional pressure path PR #241's dry run named is now operationally-pressed: the trace dimensions the dry run named are operationally untenable under simulated continuity break. What current prose discipline carries is the *content* of intake decisions; what current prose discipline does not carry is the *reasoning* behind intake decisions, the *fallback-chain trajectory* that produced the content, the *inspection trace*, the *articulation-state* of source content, the *derivation-basis* sub-classification, or the *negative space* of what intake never touched.

## Earned vs Held

What this test earns:

- **The conditional pressure path PR #241 named is now operationally-pressed for intake-time judgment trace** under simulated continuity break. The architecture's reliance on operator continuity for intake-reasoning preservation is named honestly with concrete reconstruction-failure points.
- **The held trace candidates (`articulation_state`, `derivation_basis`, `fallback_chain_position`, `contradiction_log` not-pressured) are sharpened from paper-pressed to operationally-pressed.** Their absence is not abstract; it produces specific reconstruction failures in the exercise.
- **The PR #241 operator-authored vs inferred-not-stated sub-distinction is sharpened to a five-value `derivation_basis` candidate (lifted-verbatim / inferred-from-evidence / worked-example-default / operator-authored / unresolved-marked).** The test surfaces worked-example-default as a third value PR #241's two-value distinction did not name.
- **The negative-space trace sub-dimension is surfaced** within presence-of-inspection: trace of what intake never touched is uncovered by current carriers and is distinct from trace of what intake inspected and found empty.
- **The cases where partial reconstruction succeeds are also named** — enum-shaped content tied to mode-anchored vocabulary (slot_role); structurally-explicit linkage (reference_assets via `approved_reference_keys`). These point at *what shape* trace carriers would need to preserve reconstruction (structural enums or structurally-explicit linkages, not free-form prose annotations).

What this test does NOT earn:

- **No specific trace-carrier shape is promoted to schema or earned in concrete form.** The test demonstrates pressure exists; it does not specify carrier design (field names; field types; entity placement; cross-table relationships). Per the v2 structured IA model + brand-system carrier decision surface v2 doctrine, carrier shape requires its own design move; this test is the operational pressure that would inform that design.
- **No `articulation_state`, `derivation_basis`, `fallback_chain_position`, `contradiction_log`, or operator-authored sub-classification is promoted to a structural carrier.** All remain held candidates with sharpened operational pressure.
- **The test does not commit to which trace dimensions are most load-bearing or which should be carrier-designed first.** All six dimensions surfaced as failing; ranking them would require either a real multi-operator continuity-break test or a separate decision surface.
- **No carrier proposal is authorized for any held candidate.** Held-candidate adjudication remains a separate not-yet-authorized decision surface.
- **The architecture front door, structured IA model v2, milestone markers, and brand-system carrier decision surface v2 are not modified** by this test. The narrowing brand-system carrier decision surface v2 earned (hybrid operative for Zones 1+2; Zone 1B residual held; Zones 3-6 rerouted) stands. Zone 6 is the layer this test pressures; the test does not move the brand-system carrier decision.

What this test sharpens for the next move:

- **A continuity-break test against a real multi-operator scenario** would absorb this test as simulation-stage substrate and earn or deflate carrier shapes operationally.
- **A trace-carrier design decision surface** could read this test as the operational pressure that earns the design move; the test surfaces what specific reconstruction failures the carrier shapes would need to address.
- **Structured IA model v3** could absorb the trace-dimension carriers if they are designed and earned; this test does not earn them, but sharpens the pressure path that would.

The honest read: trace partially breaks under simulated continuity break; the architecture currently relies on operator continuity for intake-reasoning preservation; held trace candidates are operationally-pressed but not yet earned in carrier shape; the carrier-design decision is the next-pressure surface this test most directly informs.

## Relationship to Future Pressure Surfaces

Implications only; **no authorization**.

- **Zone 1B operational test** (brand-wide constants beyond approved references). Independent. Not pressured by this Zone 6 test. The trace-dimension findings here do not bear on the Zone 1B carrier question; Zone 1B is a content-carrier question at the brand-system layer, while Zone 6 is a trace-carrier question at the intake / governance layer.
- **Zone 3 application-guidelines cross-touchpoint operational test** (packet/slot constraint structural representation). Mostly independent. The trace-dimension findings here surface that enum-shaped content tied to mode-anchored vocabulary preserves chain-position reconstruction partially — which suggests that aspect-ratio-as-attribute (Zone 3 candidate) might preserve some trace if it takes structural-attribute shape rather than prose-carried shape. Implication only.
- **Zone 5 past-campaigns temporal-state operational test** (reference-asset lifecycle). Substrate-limited. This test could not pressure temporal-state because the dry-run synthetic stack has no past campaigns. A Zone 5 test would need different substrate. The continuity-break framing here would generalize to temporal-state under similar pressure.
- **Validator integration / orchestration spec.** Sharpened: the test demonstrates that current carriers preserve content but not reasoning. Validator design that consumes the YAML appendix would consume content but not trace; orchestration consumers would have the same gap. Implication: validator / orchestration is more honestly downstream of trace-carrier design, not upstream of it.
- **Structured IA model v3.** Sharpened: v3 could absorb trace-dimension carriers if they are designed and earned. The test does not earn them, but surfaces what v3 would absorb. v3 work remains held.
- **Trace-carrier design decision surface** (not previously named). The test most directly surfaces this as the next-pressure surface it informs: a decision artifact that proposes specific carrier shapes for the held trace dimensions, pressured against the reconstruction-failure points this test surfaces. Held; not authorized.
- **Real multi-operator continuity-break test.** The natural successor to this simulated test. Held; not authorized. The findings here would be the simulation-stage substrate; a real test would either earn or deflate the simulated-pressure findings.
- **Architecture front-door wholesale rewrite.** The test sharpens what content the rewrite would absorb but does not move it. Held.

## Self-Superseding Clause + Anchor Documents

### Self-Superseding Clause

This artifact is a v1 simulated continuity-break test. It should be superseded by:

- A real multi-operator continuity-break test that absorbs this simulated test as substrate (would either earn or deflate the simulated reconstruction failures with concrete other-operator reconstruction attempts)
- A trace-carrier design decision surface that proposes specific carrier shapes for the held trace dimensions and reads against this test's reconstruction-failure points
- An operational test against a brand-system intake with contradictions or divergence (would pressure contradiction-resolution trace, which this test's substrate did not pressure)
- An operational test against a brand-system intake with past campaigns (would pressure temporal-state trace, which this test's substrate did not pressure)
- A subsequent operational test that earns one or more of the held trace candidates as structural carriers
- A structured IA model v3 that absorbs earned trace carriers
- A subsequent milestone marker that absorbs Zone 6 operational pressure into a plateau
- The eventual rewrite of `docs/architecture.md` that consolidates Zone 6 operational evidence alongside other operational evidence into a single current-architecture document

It does not supersede the brand intake judgment-trace dry run v1 (the substrate this test reads), the brand-system carrier decision surface v2 (the surface this test pressures Zone 6 against), structured IA model v2 (the appendix this test does not mutate), the apex definition-layer artifact, the predecessor architectural passes, the Phase 1 mode sketches, the cross-mode synthesis, the six Phase 2 deepenings, the layered intake architecture v1, the cross-category synthesis v1, the layered reference and discretion architecture v1, the normative-force pass v1, the operator-judgment protocol sketch v1, milestone 8, milestone 9, or milestone 10. Those remain authoritative for their content depth; this artifact reads them at simulated continuity-break test depth.

### Anchor Documents

#### Direct substrate

- [`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md): the dry run whose synthetic stack and intake decisions this test reads as substrate; named the five trace dimensions this test pressures
- [`docs/brand-system-carrier-decision-surface-v2.md`](brand-system-carrier-decision-surface-v2.md): the surface that named Zone 6 (intake-time judgment trace) as the intake / governance layer question this test pressures; v2 explicitly named the continuity-break test as the candidate operational pressure for Zone 6

#### Trace-dimension framing

- [`docs/brand-discovery-digestion-layered-intake-architecture-v1.md`](brand-discovery-digestion-layered-intake-architecture-v1.md): PR #241 layered intake architecture; named the seven-stage extraction sequence and the operator-authored vs inferred-not-stated distinction this test sharpens
- [`docs/brand-system-input-cross-category-synthesis-v1.md`](brand-system-input-cross-category-synthesis-v1.md): PR #244 cross-category synthesis; named the five-or-six-zone framing v2 narrowed
- [`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md): six-layer fallback chain; five paper-pressed structural-carrier candidates this test operationally-presses
- [`docs/brand-system-input-past-campaigns-to-ia-mapping-v1.md`](brand-system-input-past-campaigns-to-ia-mapping-v1.md): PR #243 past-campaigns deepening; surfaced temporal-state trace as candidate (not pressured by this test's substrate)

#### Architectural framing this artifact reads against

- [`docs/architecture.md`](architecture.md): current architecture front door; Scale-of-Operation Held Question that bound the conditional pressure path this test runs
- [`docs/structured-ia-model-v2.md`](structured-ia-model-v2.md): current canonical structured form; held_questions list this test sharpens
- [`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md): PR #239 layered reference and discretion architecture; per-site trace-gap analysis this test reads against (brand-digestion site)
- [`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md): six-kind force-kind vocabulary
- [`docs/operator-judgment-protocol-sketch-v1.md`](operator-judgment-protocol-sketch-v1.md): operator-judgment protocol sketch

#### Plateau markers

- [`docs/milestones/milestone-10-phase-2-six-category-synthesis-plateau.md`](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md): current plateau
- [`docs/milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md`](milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md): prior plateau

#### Workflow framing

- [`AGENTS.md`](../AGENTS.md): repo-local workflow rules
