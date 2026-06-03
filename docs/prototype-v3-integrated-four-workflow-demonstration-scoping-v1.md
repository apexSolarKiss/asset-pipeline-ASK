# Prototype v3 // Integrated Four-Workflow Demonstration — Scoping v1

## Posture

```text
build spec, not a conceptual pass
the last document before Airtable mutation for this prototype
minimum viable integrated spine, not a complete-system build
not Airtable mutation (this PR)
not schema closure
not carrier-shape adjudication (Option F / R-C·R-D / Z4-C·Z4-D)
not structured IA model v3
not validator / orchestration
not imagery generation
not a milestone marker
not a second analysis pass
does not resolve any held question
self-superseding once the v3 base is built and findings (if any) are absorbed
```

This artifact specifies the minimum viable third Airtable base for an all-four-workflow "show don't tell" demonstration. It is a build specification grounded in the schema the two existing prototype bases already earned, not a fresh design and not another conceptual pressure pass. Its discipline: name what to build, what to reuse, what evidence the build pressures, and what to deliberately leave unsolved — then build.

## Why this prototype, why now

The project has reached analysis saturation: the post-milestone-9 carrier-shape arc and the post-milestone-12 planning passes produced honest, well-scoped artifacts but no operational ground-truth across modes. The only honest way to pressure the architecture now is to make it carry a coherent multi-mode example. Per the grounding note, prototype work is a pressure surface, not the project center; the all-four-workflow integrated demonstration is the named downstream "show don't tell" move.

This is not "build a base because a base is next on a list." It is the architectural pressure the current evidence asymmetry most needs.

## The architectural question this prototype pressures

Per the Prototype-as-Pressure-Surface Rule:

- **What architectural question does this prototype pressure?** The two existing bases each proved a single *primary* mode on the shared schema, *sequentially* and *in isolation* (SKU-driven + collection inside the furniture base; campaign in the D2C base). The unproven thing is **coexistence**: can all four worked-example modes share **one layered IA in one base under one brand-system** — without collapsing the modes into sameness, and without forcing structural mutation the single-mode bases did not need?
- **What distinction would become clearer?** Whether cross-mode coexistence needs a structural carrier (e.g., a `packet_mode` tag, or a mode-specific-layer table) or whether mode identity continues to ride cleanly in prose fields + references as it did single-mode. This is the live test of the architecture's "schema is mode-independent at structural level" claim under *simultaneous* multi-mode load rather than sequential single-mode load.
- **What would we know after that we do not know now?**
  - Whether a shared brand-system layer actually carries downstream variation across four divergent modes (not just within one).
  - Whether the governance seam (curation → `asset_attachment` / `curation_pattern` / `curator`) stays structurally coherent across all four modes.
  - Whether marketing / message-driven mode — the weakest mode, structural-proof only — survives full-flow generation → curation → governance.

Marketing full-flow is the priority pressure. It is the one mode with no operational evidence at any base, and an integrated spine forces it into reality.

## What v3 reuses (the earned schema — clone, do not redesign)

Both existing bases run the same 8-table structure. v3 clones it:

- `products` — product-truth anchor (used by SKU mode; available to others)
- `constraint_rules` — incl. `scope_type = brand_context` (the shared-brand-system carrier already exists)
- `reference_assets` — visual reference carrier; `approved_reference_keys` links shared references into packets
- `workflow_packets` — the strongest current carrier; `business_intent` / `creative_intent` / `bounded_creative_discretion` / `required_output_set` carry mode-specific content in prose
- `seam_runs` — the common four-seam model (ingest / transformation / output / release)
- `generated_assets` — incl. the earned governance carriers: `asset_attachment`, `curation_pattern`, `curator`, `capture_reason`, `source_attachment_id`, `capture_notes`, `captured_at`, `governed_output_status`
- `review_gates`
- `output_slots` — incl. `slot_prompt`, `slot_generated_image_v1`, slot→asset linkage

No new table is assumed earned. The single open structural candidate v3 may surface is a `packet_mode` tag on `workflow_packets` (see Mode coexistence below) — proposed only if coexistence legibility demands it, not pre-committed here.

## Anchor brand (scoping decision)

**Default: the existing D2C everyday-quality home-goods "Warm Restraint" synthetic brand**, framed as synthetic operational-test scaffolding for this demonstration — not repo aesthetic doctrine and not universal direction. The repo stays aesthetic-agnostic; prototype aesthetics remain operator-side per the grounding note, and in-repo use of this instance is worked-example scaffolding only. Rationale: it is the most naturally four-mode-spanning of the two prototype-aesthetic instances; the campaign-mode work, the aesthetic instance, and the imagery prompts already exist for it; and marketing can be made operational without inventing a new aesthetic universe.

**Alternative:** the LMCM furniture brand (strongest SKU + collection proof, but no campaign or marketing assets authored yet). Selecting furniture would mean authoring campaign + marketing aesthetic grounding from scratch.

The integrated v3 build *may later* require a synthetic master brand grounding note; the grounding note names v3 as a possible trigger for migrating that layer in-repo. **This scoping PR neither authors nor authorizes that migration** — it only flags it as a possible later need.

This is the one scoping choice the build spec leaves for ASK; everything downstream is written against the home-goods default and is portable to furniture if ASK redirects.

## The shared brand-system layer (MVP)

Carried on existing affordances, no new table:

- **`brand_context`-scoped `constraint_rules`** — brand-wide rules (palette discipline, lighting register, material-honesty bounds, negative/avoid) that every packet inherits.
- **A shared set of `reference_assets`** linked into all four packets via `approved_reference_keys` — the brand-system visual anchor (Zone 1A), surfaced to slots via the existing lookup chain.

The brand-system layer stays unmodeled-as-table, consistent with the architecture. The test is whether this minimal shared carrier produces legible downstream variation across four modes.

## Four packets — one per mode (MVP)

Each packet is the minimum that proves the mode is structurally distinct, not a label:

| Mode | Packet | Mode-specific anchor (the divergence) |
|---|---|---|
| SKU-driven product imagery | one home-goods SKU | product truth (`products` + `product_image`) |
| collection / merchandising | one small curated grouping | grouping / family-coherence (1:N slot↔product) |
| marketing / message-driven | one message/offer packet | message / offer / communication — **priority; must reach full-flow** |
| brand campaign / editorial | the Warm Restraint campaign packet | campaign-world coherence |

The divergence across these four anchors (product truth vs grouping vs message vs campaign-world) is what proves the four modes are not just labels on the same workflow.

## Mode coexistence (the one open structural candidate)

Single-mode bases carried mode identity implicitly (the base *was* the mode). In one base holding all four, mode identity must be legible per packet. Two readings the build will resolve empirically:

- **Prose-carried (default):** mode identity rides in `business_intent` / `creative_intent` / `required_output_set` as it did single-mode; no schema change.
- **Minimal structural tag:** a `packet_mode` single-select on `workflow_packets` if prose alone makes coexistence illegible.

The build attempts the prose-carried reading first and proposes `packet_mode` only if the demonstration strains without it. Either outcome is a finding.

## Minimum slots + assets

- Minimum viable `output_slots` per packet (enough to express the mode's output burden; not exhaustive).
- **At least one generated → curated → governed asset per mode**, carrying the full governance seam (`asset_attachment` + `curation_pattern` + `curator` + provenance), with marketing emphasized because it is the unproven full-flow.
- Imagery via the existing prototype-aesthetic imagery workflow (versioned prompts artifact → generation → scratch → rename → upload) when generation is reached; not authored in this scoping PR.

## One common governance seam

All four modes run the same `seam_runs` + `generated_assets` + governance carriers. The test is governance-seam consistency: does curation/governance stay structurally coherent when the upstream anchor differs by mode?

## Held — deliberately left prose-carried, not solved by this prototype

The prototype is allowed to *expose* strain; it must not pre-solve it. Carried as held, untouched:

- All carrier-shape forks: Option F contradiction-resolution; R-C vs R-D (intake-reference rationale); Z4-C vs Z4-D (reuse-time governance).
- Composite-anchor structure; brand-system Zone 1B (constants beyond approved references).
- Structured IA model v3; validator / orchestration; temporal-state trace carrier.
- Apex Named Limitations.

If the build pressures any of these into a material structural finding, that finding is recorded — but closing them is out of scope.

## Evidence questions the prototype will pressure

These are the questions the demonstration answers; they are the artifact's reason to exist:

1. Can four modes share one layered IA / one base without collapsing into sameness?
2. Does a shared brand-system layer (brand_context constraints + shared references) carry downstream variation across all four modes?
3. Do the four mode-specific anchors (product truth / grouping / message / campaign-world) stay distinct under one schema?
4. Does the governance seam stay structurally coherent across all four modes?
5. Does marketing / message-driven survive full-flow generation → curation → governance?
6. Does mode coexistence require `packet_mode` (or any structural carrier), or does prose carry it?

## MVP bounds (the museum guardrail)

Do **not** let "integrated four-workflow" expand into:

- production-grade schema, or every held carrier candidate resolved
- full validator / orchestration layer
- all schema candidates implemented; all carrier-shape forks closed
- a polished public demo or any UI build
- full imagery generation as a prerequisite to structural build
- a milestone marker — unless the prototype materially shifts the architecture

The third base's identity is **integrated four-mode coexistence** — not a campaign-mode v2, not an SKU v2, not a complete production system. The win is a thin integrated spine that proves coexistence, not a complete system.

## Sequence after this artifact

1. **This scoping artifact** — one PR (this document).
2. **Build the third base** — clone the 8-table schema; minimum viable integrated all-four-mode structure.
3. **Populate** — the shared brand-system layer + four packets (one per mode); not every possible artifact.
4. **Generate / curate / govern minimum assets** — ≥1 governed asset per mode; marketing first, because it is the weakest mode.
5. **Absorb findings only if earned** — a findings record (and a milestone) only if the prototype materially shifts the model, schema pressure, carrier boundary, or governance seam. If nothing material surfaces, no new conceptual artifact.

## Source-of-truth anchors

- [`docs/architecture.md`](architecture.md) — current architecture front door (milestone 12 currency); schema mode-independence claim; evidence-depth asymmetry
- [`docs/milestones/milestone-12-post-milestone-11-multi-axis-carrier-pattern-plateau.md`](milestones/milestone-12-post-milestone-11-multi-axis-carrier-pattern-plateau.md) — current plateau
- [`docs/evidence-depth-asymmetry-assessment-brief-v1.md`](evidence-depth-asymmetry-assessment-brief-v1.md) — cross-mode + operational-vs-conceptual asymmetries this prototype addresses
- [`docs/airtable-base-spec-sku-driven-furniture-v1.md`](airtable-base-spec-sku-driven-furniture-v1.md) — the earned base spec v3 clones
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md) — collection mode carried in the SKU base without structural mutation
- [`AGENTS.md`](../AGENTS.md) — Architecture-Before-Prototype, Prototype-as-Pressure-Surface, Airtable Mutation Discipline
