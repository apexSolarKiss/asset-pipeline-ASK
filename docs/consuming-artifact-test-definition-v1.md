# Consuming-Artifact Test — Definition (v1)

## Posture

```text
test DEFINITION / pre-registration only — the test is NOT run here
defines a failable consuming-artifact test against the existing 2c worked package store
no consuming-artifact execution
no generated implementation roadmap / system map yet
no store mutation
no hash+pointer carrier build
no real second-substrate run
no reference-rich / SKU visual-reference package
no runtime consumer
no package grammar
no schema / validator / structured IA model v3
no 1C reader-path / evaluator-screen work
no new generation proof
self-superseding when the test is run and a findings artifact lands, or when the definition is revised before a run
```

This artifact pre-registers a test so that the test, when run, can fail in an informative way and cannot move its own goalposts. It tests whether the portable package can serve the application-layer output path represented by the existing implementation-roadmap / system-map grammar, using the 2c worked package store as the source package.

## The question

> **Can the portable asset-definition package, fed to the existing application grammar, support generation of a useful implementation-roadmap / system-map artifact — and where is the package insufficient?**

And the load-bearing guardrail that shapes the entire design:

> **The test must determine whether the portable package can support a method-user artifact, not whether the executor can use thread memory to produce one.**

The diagnostic value is that this run is **upstream of the visual-payload-portability work** milestone 13 names as a next-frontier question: it reveals whether a real consumer actually hits the carrier-completeness gap or the visual-auditability gap the byte-boundary findings named, or some other gap — rather than the project perfecting a carrier the consumer may never press on.

## Why this test is failable

This is not a readability or recovery test. Three distinct non-PASS outcomes are pre-registered as live and informative:

- The package may be a **sufficient source** — a consumer authors the artifact from package + grammar.
- The package may be an **insufficient source** — it carries some of what the grammar's sections need but leaves named gaps.
- The package may be a **category-mismatched source** — the grammar consumes a brand-system *intake stack* to diagnose a deployment; the package is a single governed-output *package instance*. If the run finds most sections unauthorable from the package, the finding is that the package and this grammar are different objects, and the right package-consumer is a different (unauthored) grammar.

A run that found "the package fully supports the artifact" would be the surprising result. The test is built to locate the gap, and to classify it.

## The consuming role and allowed inputs

- **Consuming role.** A fresh consumer applying the grammar — the author the grammar's author-mediated journey assumes — with **no thread context**, mirroring the recovery test's and byte-boundary test's blind-reader methodology.
- **Allowed inputs — exactly two, nothing else.**
  1. The 2c worked package store ([`docs/worked-package-store-2c-marketing-hero/`](worked-package-store-2c-marketing-hero/)), read as-is.
  2. The existing application grammar ([`docs/application/implementation-roadmap-system-map-artifact-grammar-v1.md`](application/implementation-roadmap-system-map-artifact-grammar-v1.md)).
- **Forbidden inputs.** Thread context; any other repo doc (architecture front door, milestones, structured IA model, other package legs); the byte-boundary artifacts; external brand or domain knowledge about "Warm Restraint" or home-goods; the executor's memory of having built the store.
- **The citation rule (the guardrail, operationalized).** For every section the consumer authors, it must cite **which package file or grammar rule** supplied each substantive claim. **Any content the consumer cannot trace to one of the two allowed inputs is scored as package-insufficiency** — the package did not supply it — *regardless of whether a thread-aware executor would "know" the answer.* This is what isolates package sufficiency from executor thread memory.

## The target generated artifact

The grammar's deliverable: a ten-section hybrid implementation-roadmap + system-map document (1 Executive read · 2 Source inventory · 3 Current-state system map · 4 Layered diagnosis · 5 Gap/risk map · 6 Recommended target-state system map · 7 Substrate recommendation · 8 Implementation roadmap · 9 Decisions needed · 10 Provenance/confidence appendix). The grammar's source-to-section mapping consumes brand-system input categories (brand platform; visual identity system; photography/image style guide; asset library; application guidelines; past campaigns) plus workflow / production / DAM / approval / rights context.

## Source-mapping reality check (the central pre-registered hypothesis)

The grammar expects a **brand-system intake stack for a deployment context**. The 2c package carries a **single governed marketing-hero package**: `business_intent`, `creative_intent`, a `bounded_creative_discretion` aperture, four brand-context constraints (scoped to the "Warm Restraint" brand-system instance), two image-pending references, two peripheral products, two output slots (one accepted, one held), seven candidates, and one governed asset.

The mismatch to pre-register: the package populates a slice of *one project/packet layer plus inherited brand-context constraints* — it carries no brand-platform articulation, no VIS constants, no photography style guide, no asset library beyond two image-pending references, no application guidelines, no past campaigns, and **no workflow / production / DAM / approval / cadence / rights / organizational-capacity intake at all**. The grammar's diagnostic half (§§3–5) and prescriptive half (§§6–8) are built to read a deployment's current state and recommend a target state; a single governed package is neither a current-state deployment nor a capacity intake.

The test does not assume the mismatch is total. It pre-registers it as the hypothesis the per-section grid will confirm, refine, or overturn (e.g., the package may serve as a partial mini-intake for the brand/project/asset layers of the system map).

## Per-section sufficiency — pre-registered expectation

For each section: what the grammar needs, and the pre-registered expectation given what the package carries. The run scores actual results against these; the expectations do not bind the scoring.

| § | Section | What the grammar needs | Pre-registered expectation |
|---|---|---|---|
| 1 | Executive read | A deployment intent + a body to summarize | FAIL/PARTIAL — no deployment intent; a packet creative_intent is not a deployment purpose |
| 2 | Source inventory | The intake materials, marked supplied/inferred/unresolved | PARTIAL — the package's constraints/references/intent are *some* source, but most intake categories are absent (markable as unresolved) |
| 3 | Current-state system map | A current workflow state across five layers | PARTIAL/FAIL — the package gives brand-context constraints + one project + one asset role; no channel, governance-flow, or production state |
| 4 | Layered diagnosis | What is working / strained / missing per layer | PARTIAL/FAIL — diagnosable only for the layers the package touches; most layers have no source |
| 5 | Gap / risk map | Gaps and risks from the diagnosis | PARTIAL — could surface the package's own gaps (image-pending refs; no carriers) but not a deployment's risks |
| 6 | Recommended target-state map | A recommended state vs gaps | FAIL — no deployment to recommend a target for |
| 7 | Substrate recommendation | Organizational capacity intake + target state | FAIL — no capacity intake of any kind in the package |
| 8 | Implementation roadmap | Current→target path + cadence intake | FAIL — no current/target deployment, no cadence |
| 9 | Decisions needed | Held deployment decisions + capacity | FAIL/PARTIAL — the package's held items (support slot; image-pending refs) are not deployment decisions |
| 10 | Provenance / confidence appendix | Per-claim source attribution | PARTIAL — authorable for whatever §§2–5 produced, citing package files |

If the grid matches the expectation, the headline finding is **category-mismatch**: the package is a governed-output unit, not a deployment intake, and the existing application grammar is the wrong consumer for a package instance.

## Sufficiency vs insufficiency, and the outcome classes

**Package sufficiency for a section** = the package carries the source the grammar's section needs, such that the blind consumer authors that section from package + grammar alone, every substantive claim cited to a package file or grammar rule. **Package insufficiency** = the section requires source the package does not carry, or source of a type the package is not.

Per-section outcome classes:

- **PASS** — the section is authorable from the package + grammar alone, with every substantive claim cited to an allowed input.
- **PARTIAL** — the section is partially authorable; some required source is present and cited, some is absent (named as unresolved).
- **FAIL** — the section cannot be meaningfully authored from the package; its required source is absent or is the wrong type.

Aggregate readings the run must report:

1. The per-section PASS / PARTIAL / FAIL grid.
2. Which sections the package supports (PASS/PARTIAL) and which it cannot (FAIL).
3. The dominant insufficiency classes (below), ranked by how many sections they block.
4. The headline classification: **sufficient source** / **insufficient source** (gaps named) / **category-mismatched source** (wrong source type; the grammar is the wrong consumer for a package).

## Likely insufficiency classes (pre-registered taxonomy)

The run classifies each insufficiency into one of these; the taxonomy is pre-registered so classification is not invented after results:

1. **Source-type mismatch (primary hypothesis)** — the grammar consumes a deployment intake stack; the package is a governed-output instance. Blocks the deployment-diagnostic and prescriptive sections.
2. **Carrier-completeness** — content the package should carry but does not (e.g., the hashes + durable pointers the byte-boundary findings named; system-map carrier descriptions).
3. **Visual auditability** — references image-pending; the package cannot supply inspectable visual evidence for the system map's reference-layer content.
4. **Rejection-reason granularity** — per-candidate rejection rationale not individuated; limits diagnosis of the selection seam.
5. **Package-grammar gaps** — the package is one instance, not a reusable grammar; sections needing package-shape regularity cannot rely on a single instance.
6. **Implementation-roadmap ambiguity** — no current/target deployment state, no capacity, no cadence; the roadmap and substrate sections have no source.

## What the run would change architecturally

The run is decision-bearing for the open question of which gap a real consumer actually hits:

- If the package is a **sufficient or insufficient-but-usable** source, the carrier-completeness and visual-auditability gaps the byte-boundary findings named are confirmed as *the* gaps a real consumer hits — making a real second-substrate run that carries those carriers the genuine next bottleneck.
- If the package is a **category-mismatched** source, the finding is larger: a package instance needs a *different* consuming grammar than this deployment-diagnostic grammar — i.e., the next architectural question is what generated artifact a *package* (rather than a brand intake) is the right source for. That reframes the consuming-artifact question itself, and indicates that perfecting visual carriers is premature until the package's consumer is correctly identified.

Either way the run answers which gap a real consumer actually hits, rather than pre-committing to a visual-payload-portability remedy before a consumer has pressed on it.

## What running the test would require (named, not authorized)

A separate gate. It would: give a fresh blind consumer exactly the two allowed inputs; have it attempt the ten sections under the citation rule; score each section against the outcome classes; classify each insufficiency against the pre-registered taxonomy; and report the four aggregate readings into a findings artifact. No generated artifact is produced or committed beyond what the findings record as evidence; no store mutation; no external input is admitted. None of this is performed here or authorized by this definition landing.

## Scope guards

This definition does not: run the test; generate an implementation-roadmap / system-map artifact; mutate the store; build a hash+pointer carrier; run a real second-substrate or reference-rich test; author a runtime consumer, a package grammar, a schema, a validator, or structured IA model v3; perform 1C reader-path / evaluator-screen work; or run any new generation proof. It reads the existing store and grammar as-is and pre-registers a falsifiable test.

## Anchor documents

- [`docs/application/implementation-roadmap-system-map-artifact-grammar-v1.md`](application/implementation-roadmap-system-map-artifact-grammar-v1.md) — the grammar the consumer applies; its source-to-section mapping defines what each section needs
- [`docs/application/artifact-grammar-consumer-pressure-v1.md`](application/artifact-grammar-consumer-pressure-v1.md) — the prior conceptual pass that read the grammar back into the architecture; this test is the operational successor (generate from a real package, not sort concepts)
- [`docs/worked-package-store-2c-marketing-hero/`](worked-package-store-2c-marketing-hero/) — the package the consumer reads as its source
- [`docs/byte-boundary-auditability-test-findings-v1.md`](byte-boundary-auditability-test-findings-v1.md) — the prior run; its carrier-completeness and visual-auditability gaps are two of this test's pre-registered insufficiency classes
- [`docs/milestones/milestone-13-portability-evidence-plateau.md`](milestones/milestone-13-portability-evidence-plateau.md) — the plateau; failable next-evidence standard ("test use, not readability") this test instances
- [`docs/architecture.md`](architecture.md) — §Application-Layer Outputs records the grammar as the first concrete internal consumer, consuming v2 conceptually not structurally
```
