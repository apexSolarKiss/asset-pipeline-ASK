# Milestone 14 // Portability Frontier Separation — Recovery, Auditability, Consumability

## Posture

```text
plateau marker
absorbs the redirect, not the chronology
not implementation
not a package-shaped consumer / consuming grammar (design unauthorized)
not a replication run
not a real second-substrate run
not a reference-rich / SKU visual-reference / visual-payload run
not schema / validator / structured IA model v3
not a runtime consumer
not a package grammar
not carrier (hash+pointer) work
not 1C reader-path / evaluator-screen work
not method-doctrine expansion
not a front-door wholesale rewrite
names the new architectural question; does not answer it
self-superseding when a subsequent milestone marks the next architectural plateau
```

This artifact marks the plateau the post-milestone-13 portability runs reach. Where milestone 13 marked the portability *evidence arc* (the 2c proof + the three extraction/recovery legs), milestone 14 marks what the two runs *after* it separated. The marker absorbs the **redirect** those runs produced — not the sequence of PRs that produced it. The PRs are provenance (Anchor Documents); the finding is the separation.

## What Milestone 14 Marks

The plateau identity is a single load-bearing claim:

**The portability frontier has now separated three things that were previously fused into "is the package portable." They are distinct questions with distinct answers:**

1. **Package recovery / portability** — *settled, earned.* The proven 2c package can be held in a second substrate and recovered from it (fresh-reader recovery, 8/8; milestone 13).
2. **Package auditability** — *settled at carrier-class depth.* The no-image-byte boundary does not reopen: hashes + durable pointers are sufficient as a carrier class to support visual auditability of the package's existing images, without storing bytes ([byte-boundary findings](../byte-boundary-auditability-test-findings-v1.md), carrier-class / counterfactual depth). The store-as-is gap is carrier-completeness, not byte-storage.
3. **Package consumability** — *the redirect.* The repo's one application-layer consumer — the deployment-diagnostic implementation-roadmap / system-map grammar — is the **wrong consumer for a package instance**: a blind consumer applying the grammar to the package store scored **0 PASS / 0 PARTIAL / 10 FAIL**, every section on source-type mismatch ([consuming-artifact findings](../consuming-artifact-test-findings-v1.md)). The grammar consumes a *deployment's* intake stack; a package is a *single governed-output instance*. They are different objects.

The third finding is the milestone. Recovery and auditability were on the expected portability path; consumability was assumed adjacent and turned out to be a category question.

## The redirect

The consumability finding redirects the frontier in two ways:

- **It down-ranks the visual-payload-axis moves as premature.** A real second-substrate run and a reference-rich package run would deepen carrier-completeness and visual-auditability carriers (the gaps the byte-boundary findings named). But source-type mismatch blocks all ten application-layer sections *before* any carrier-completeness or visual-auditability gap is reached. Perfecting those carriers now would deepen something the one application-layer consumer never touches — proof-chain gravity. Those runs are not the next bottleneck.
- **It surfaces a new architectural question, which this milestone names and does not answer:** **what consumes a package?** And, prior to that: **does the package need a package-shaped consumer at all, or is its role already complete — as a portable governed-output object, instantiation evidence, and worked example?** The consuming-artifact run did not say "build the package consumer." It showed the current consumer is mismatched, and left open whether a package's role is to be consumed into a further generated artifact or is already discharged by being recoverable, auditable, and exemplary.

The methodological weight of the consumability finding rests on the citation rule: the blind consumer declined four available improvisations (inventing a workflow, recommending a substrate, treating the synthetic brand scaffold as intake, treating provenance markers as body claims), so the 10/10 FAIL measures the package, not consumer incapacity.

## What Is Earned

- **The three questions are now distinct.** "Is the package portable" has resolved into recovery (earned), auditability (carrier-class), and consumability (mismatched to the current consumer) — three answers, not one.
- **Recovery and auditability stand** at the depths milestone 13 and the byte-boundary findings recorded; this milestone does not disturb them.
- **The current application grammar's scope is clarified.** It is a deployment-diagnostic consumer; it is not, and was not designed as, a package consumer. The category distinction (deployment intake vs governed-output instance) is now operationally evidenced.

## What Remains Held / Unauthorized

- **Package-shaped consumer design** — a consuming grammar, audit/readiness brief, governance/evidence card, handoff artifact, or substrate-requirements artifact whose source is a package instance. Named as candidate surfaces below; **none authorized.** Building one now would prototype ahead of the architectural question (what consumes a package, and whether one is needed), which is named here, not framed.
- **Replication** (a different-mode package against the same grammar) — would test whether source-type mismatch is a package-object property or a marketing-instance property; held (the mismatch is structural enough that another mode would likely confirm, not discriminate).
- **Real second-substrate / reference-rich / visual-payload work** — down-ranked as premature; held.
- **1C reader-path / evaluator-screen work** — held.
- **Carrier (hash+pointer) build, runtime consumer, package grammar, schema / validator / structured IA model v3, method-doctrine expansion, front-door wholesale rewrite** — all held / unauthorized, carried forward.

## Why This Is Not Consumer Readiness

The redirect is an architectural finding, not a build signal:

- **No package consumer is identified, let alone designed.** The milestone names the question; it does not pick a candidate.
- **Whether a package needs a consumer at all is unresolved.** The "role may already be complete" reframe is live; it is the guard against inventing a consumer because the word *consumer* appeared in the evidence trail.
- **The current grammar's mismatch is operationally evidenced but bounded** — one consumer, one package, one grammar; the grammar was authored for deployment intake. The finding is about the package↔this-grammar relationship, not a claim that the package is useless to every possible consumer.

Milestone 14 makes the three-way separation legible and names the open question. It does not change the implementation-readiness state.

## Required Follow-On State-Surface Refresh

This marker lands a plateau and so triggers the milestone-coupled diagram-surface cadence — but it intentionally absorbs the redirect as prose and does not bundle render / state-surface work. That refresh is therefore **required maintenance, not an optional next move**: the **architecture tree** ([`docs/diagrams/asset-pipeline-ASK_architecture-tree.html`](../diagrams/asset-pipeline-ASK_architecture-tree.html)) and the **interactive IA state spine** ([`docs/diagrams/interactive/asset-pipeline-ASK_ia-state-spine.html`](../diagrams/interactive/asset-pipeline-ASK_ia-state-spine.html)) must be refreshed in a **separate follow-on PR** to reflect milestone-14 state — the recovery / auditability / consumability separation, the current-plateau pointer, and the byte-boundary and consuming-artifact findings that postdate the diagrams' last content refresh. Until that follow-on lands the diagrams may lag this marker; `docs/architecture.md` says so, and the prose docs are authoritative if the two diverge.

## Candidate Next-Pressure Surfaces

Listed neutrally. None authorized. Listing order does not imply preference. The architectural question — *what consumes a package, and is one needed* — must be framed (candidate model; resolvable uncertainty; downstream need) before any of the build candidates is opened.

- Name / frame the package-consumer question further (operator-side or a bounded architecture note) before any build
- Package audit / readiness brief (lightest build candidate; risks being a demonstration)
- Package governance / evidence card (lightest build candidate; risks being a demonstration)
- Package-to-implementation handoff artifact (overlaps the #319 instantiation plan)
- Package-to-substrate requirements artifact (overlaps the #319 instantiation plan)
- Package-shaped consuming grammar (heaviest; least earned; explicitly premature)
- Replication run (different-mode package vs the same grammar)
- Pause / no immediate next move

## Self-Superseding Clause

Milestone 14 is a plateau marker. It should be superseded by:

- a subsequent milestone when the next architectural plateau is reached
- a framing of the package-consumer question to architecture-attempt depth (candidate model + resolvable uncertainty), which would convert the named question into a decidable one
- a package-shaped consumer test or build, once the question is framed and a downstream need is established
- a replication run that establishes whether source-type mismatch is a package-object property
- a subsequent milestone that resolves whether a package's role is already complete or requires a consumer

It does not supersede milestone 13, the apex definition-layer artifact, the predecessor architectural passes, the Phase 1 sketches, the Phase 2 artifacts, the portability legs (extraction attempt; package extraction; worked package store), the byte-boundary artifacts, the consuming-artifact artifacts, or milestones 7–13. Those remain authoritative for their subject matter; this milestone reads them at frontier-separation depth.

## Anchor Documents

Provenance — six PRs landed between milestone 13 and this marker (#327–#332):

- [`docs/milestones/milestone-13-portability-evidence-plateau.md`](milestone-13-portability-evidence-plateau.md) — the prior plateau (portability evidence arc); #327 cut it and refreshed the state surfaces. #328 compressed `docs/index.md` navigation.
- [`docs/byte-boundary-auditability-test-definition-v1.md`](../byte-boundary-auditability-test-definition-v1.md) (#329) and [`docs/byte-boundary-auditability-test-findings-v1.md`](../byte-boundary-auditability-test-findings-v1.md) (#330) — the auditability question: no-byte boundary holds at carrier-class depth.
- [`docs/consuming-artifact-test-definition-v1.md`](../consuming-artifact-test-definition-v1.md) (#331) and [`docs/consuming-artifact-test-findings-v1.md`](../consuming-artifact-test-findings-v1.md) (#332) — the consumability question: category-mismatched source, 10/10 FAIL; the redirect.
- [`docs/architecture.md`](../architecture.md) — the front door, pointing at this plateau as current.
- [`docs/index.md`](../index.md) — navigation; the Portability / Extractability section routes to the portability / extractability arc.
- [`docs/application/implementation-roadmap-system-map-artifact-grammar-v1.md`](../application/implementation-roadmap-system-map-artifact-grammar-v1.md) — the deployment-diagnostic grammar whose category-mismatch with a package instance is the redirect.
```
