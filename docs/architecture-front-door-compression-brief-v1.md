# Architecture Front-Door Compression Brief v1

## Posture

```text
architecture-hardening brief
planning / compression brief only
defines how docs/architecture.md should be compressed before any rewrite occurs
not an architecture.md rewrite
not a milestone marker
not structured IA v3
not schema
not validator / orchestration
not held-candidate adjudication map
not grounding-note v59
not memory write
not Airtable mutation
not a candidate-next-pressure-surface enumeration
self-superseding when an architecture.md compression PR lands or when the brief is materially superseded by a later plateau
```

`docs/architecture.md` is the repo's current architecture front door. Its job is to route readers to depth at orientation level. Its current state has accumulated chronological absorption to the point that the front door function is buried under absorption ledger function. This brief defines what compression means — what stays, what relocates, what compresses, what is added — before any edit to the file occurs.

The brief does not edit `docs/architecture.md`. It produces a plan a subsequent compression PR can execute.

## 1. The Compression Problem

`docs/architecture.md` is now ~270 lines across five top-level sections (`Where This File Sits`; `Current Architecture Shape`; `Evidence Depth`; `Held Questions`; `Depth Documents`). The skeleton is sound; the content within two of those sections has accreted chronologically and now exceeds the front-door's stated job.

Specifically:

- The **Held Questions** section runs 95 lines (lines 128–222). Three named structural concerns (Curation-Premise Architectural Fork; Brand-System Layer Status; Scale-of-Operation Held Question) plus an `Inventory` sub-section. The Scale-of-Operation sub-section alone runs ~37 lines (lines 173–209) and contains eleven chronological PR absorption paragraphs (each PR — #239, #250, #252, #254, #256, #258, #260, #263, #266, #268, #270 — gets its own paragraph naming what it landed and how).
- The `Inventory` sub-section's last bullet (line 218) is a single ~30-line run-on paragraph that lists every PR in the post-milestone-9 carrier-shape arc and enumerates ~25 candidate-next-pressure-surface options. Both behaviors — chronology and candidate enumeration — are explicitly out of front-door scope per AGENTS.md §Refresh Cadences and per the milestone-12 plateau marker's posture.
- The **Where This File Sits** section's source-of-truth list (lines 26–58) carries ~31 routing entries. Most are essential (current plateau marker; canonical structured form; key depth artifacts); a subset are chronological absorption entries from the post-milestone-9 arc that are duplicated in the Scale-of-Operation sub-section and in milestone docs.

The compression problem is therefore not "rewrite the architecture front door wholesale." It is "the front door reproduces chronology that lives more honestly in milestones, in `docs/index.md`, and in source artifacts." Compression returns the front door to its routing function.

A second problem compounds the first: `docs/architecture.md` does not currently reference any of PRs #274 / #275 / #276 / #277 — four post-milestone-12 PRs that landed application-layer artifact grammar work, the consumer-pressure pass, the application README routing, and the structured IA v2 consumer preflight. The front door is out of sync with current main. Compression must absorb the missing post-milestone-12 work at orientation depth even as it relocates chronological absorption out.

## 2. What `docs/architecture.md` Should Become

The compressed front door should be:

- **A concise current-state map.** What the architecture currently looks like at orientation depth — eight IA layers, four worked-example modes, five carrier types, normative-force vocabulary, where authorship-bearing discretion and governance-bearing curation sit. No PR-by-PR chronology.
- **A source-of-truth routing surface.** Pointers to the canonical depth artifacts (apex artifact; structured IA model v2; layered-reference-and-discretion architecture; brand discovery / digestion + cross-category synthesis; brand-system carrier decision surface v2; consumer preflight; artifact grammar; consumer-pressure pass) without reproducing their content.
- **An evidence-depth summary.** What's operationally grounded versus paper-pressed versus held — at the level a returning reader needs to read accurately. No PR-by-PR walk-throughs of how evidence was earned.
- **A held-question summary.** Three named structural concerns at synthesis depth, plus an inventory of held items at orientation depth. No chronological absorption of how each held question got pressured.
- **A pointer to the current plateau.** Milestone 12 is the current plateau marker; depth lives there. Front-door reads against the plateau, not under it.
- **A pointer to application / consumer surfaces.** Where the architecture's downstream consumer-facing work lives. The new application-layer artifacts (PRs #274, #275, #276, #277) need a front-door pointer at orientation depth.
- **An explicit out-of-scope section.** What this file does not do; what readers should look elsewhere for.

## 3. What `docs/architecture.md` Should Stop Doing

The compression PR should remove or relocate the following behaviors:

- **Long PR chronology.** The Scale-of-Operation Held Question sub-section's eleven PR absorption paragraphs (lines 173–209) and the Inventory sub-section's run-on PR-listing paragraph (line 218) reproduce content that lives in milestones 9–12 and in the source artifacts each PR shipped. Front-door function does not require this depth.
- **Repeated absorption paragraphs.** Multiple sections currently restate the same depth content (Curation Semantic Split appears in §Current Architecture Shape, §Held Questions / Curation-Premise Architectural Fork, and the Scale-of-Operation sub-section's normative-force paragraph). One synthesis-depth mention per concept; depth-authority pointers do the rest.
- **Candidate-next-pressure lists.** Per milestone 12's posture, post-plateau next moves are fresh strategic decisions, not pre-committed queues. Enumerating ~25 candidates in the Inventory section pre-commits the front door to a queue posture the plateau marker explicitly refused.
- **Excessive restatement of depth artifacts.** Several depth artifacts are described in two or three sections (the brand-system carrier decision surface v2 is described in the source-of-truth list, in §Held Questions / Brand-System Layer Status, and in the Inventory). One description plus depth-authority routing is enough.
- **Burying current shape under history.** §Current Architecture Shape is 36 lines and provides the orientation read; it is preceded by a 50-line section (Where This File Sits) that reads more like a reference list than orientation. The reader's first encounter should be the current shape, with routing as supporting infrastructure.

## 4. Required Current-State Anchors

The compressed front door must surface the following anchors. Some are already at orientation depth in the current file; some are missing (the post-PR-272 work).

**Present at orientation depth (preserve):**

- Current plateau marker: milestone 12 (post-milestone-11 multi-axis carrier-pattern plateau)
- Eight-layer IA model + four worked-example modes + carrier types
- Curation semantic split (authorship-bearing discretion vs governance-bearing curation)
- Normative-force six-kind vocabulary
- Apex Named Limitations (#1, #2, #3)
- Brand-system carrier decision surface v2's narrowing (Zones 1A/1B/2 + Zones 3–6 rerouting)
- Fallback chain
- Structured IA model v2 as current canonical structured form
- Layered reference and discretion architecture v1 (PR #239)
- Brand discovery / digestion + six-category synthesis (PR #241 + PR #244)

**Missing (must be added at orientation depth):**

- `docs/structured-ia-v2-consumer-preflight-v1.md` (PR #277) — names the threshold a structured consumer would have to cross to justify v3 absorption; confirms v2 is sufficient for conceptual-consumer paths at current evidence depth
- `docs/application/implementation-roadmap-system-map-artifact-grammar-v1.md` (PR #274) — first generated-output artifact grammar; the architecture's first concrete internal application-layer consumer
- `docs/application/artifact-grammar-consumer-pressure-v1.md` (PR #275) — application-consumer pressure pass; surfaces the conceptual-vs-vocabular split as an architectural category
- `docs/application/README.md` (PR #276) — the application sub-tree's lower-level map, now carrying the Generated-Output Artifact Grammars subsection

**To be demoted from orientation depth to source / depth-document routing:**

- Option F intake-time judgment trace arc (PRs #250, #252, #254, #256, #258, #260) — eleven absorption paragraphs in the current file; this work belongs in milestone 11's plateau marker and in the source artifacts, not chronologically narrated in the front door
- Intake-time reference rationale arc (PRs #263, #266) — two absorption paragraphs; belongs in milestone 12 and the source artifacts
- Zone 4 reuse-time governed-output governance arc (PRs #268, #270) — two absorption paragraphs; belongs in milestone 12 and the source artifacts

The held architectural state these arcs produced (sharpened-not-closed carrier-shape choices; the conceptual-vs-vocabular split; etc.) stays at orientation depth as held-question content. The chronological absorption walking through each PR's findings does not.

## 5. Proposed Compressed Architecture.md Skeleton

The current skeleton (Where This File Sits / Current Shape / Evidence Depth / Held Questions / Depth Documents) is sound at the section level. The compression operates within sections, not on the skeleton. Adapted to current state:

```text
1. Purpose / Current posture
   - What this file is and is not
   - One paragraph; routes to source-of-truth list

2. Current architecture shape
   - Eight layers; four modes; carrier types; normative-force vocabulary
   - Curation semantic split (authorship-bearing vs governance-bearing)
   - Fallback chain
   - Structured form (v2 + consumer preflight v1)
   - Application layer (artifact grammar v1 + consumer-pressure pass v1)

3. Evidence depth
   - Operationally grounded (SKU full-flow; collection full-flow;
     campaign at PKT-CAMP-004 bounded depth)
   - Structurally proven (marketing PKT-MSG-001; campaign Phase 1
     base setup)
   - Paper-pressed candidates (named; not enumerated to PR detail)
   - Operationally untested generalization conditions
     (multi-reader; cross-substrate; long-context)

4. Structured form and consumers
   - v2 as canonical machine-readable enumeration
   - Consumer preflight: what v2 supports, what v2 does not,
     threshold for v3 absorption
   - Conceptual consumer (PR #274 artifact grammar) versus
     structured consumer (none currently live)

5. Application-layer outputs
   - One generated-output substrate currently has a grammar
     (implementation roadmap + system map hybrid)
   - One application-consumer pressure pass currently runs
   - Sibling substrates implied but not authored
   - Pointer to docs/application/

6. Held questions / parked surfaces
   - Three named structural concerns at synthesis depth:
     - Curation-Premise Architectural Fork (provisional `refines` at
       PKT-CAMP-004; mode-weighted)
     - Brand-System Layer Status (Zone 1B residual; Zone 2 deliberate
       prose; Zones 3–6 rerouted)
     - Scale-of-Operation Held Question (operator-continuity vs
       structural-trace; legibility as test criterion)
   - Inventory at orientation depth (Apex Named Limitations;
     composite-anchor; inferred-not-stated; fallback-chain-position;
     operator-judgment representation; validator integration;
     Phase 3 demonstration)
   - No enumeration of post-milestone-9 carrier-shape PR arc
   - No candidate-next-pressure-surface list

7. Source-of-truth routing
   - Current plateau marker (milestone 12)
   - Canonical structured form (structured-ia-model-v2.md)
   - Consumer preflight (structured-ia-v2-consumer-preflight-v1.md)
   - Architecture-front-door compression brief (this brief)
   - Apex artifact (architecture-apex-definition-layer-v1.md)
   - Layered reference and discretion (layered-reference-and-
     discretion-architecture-v1.md)
   - Layered intake architecture
     (brand-discovery-digestion-layered-intake-architecture-v1.md)
   - Cross-category synthesis
     (brand-system-input-cross-category-synthesis-v1.md)
   - Brand-system carrier decision surface v2
     (brand-system-carrier-decision-surface-v2.md)
   - Application-layer grammar work (docs/application/)
   - Full repo navigation (docs/index.md)
   - Workflow rules (AGENTS.md)

8. What remains out of scope
   - PR-by-PR chronology (lives in milestones)
   - Candidate-next-pressure surfaces (live in operator-side strategy)
   - Held-candidate adjudication (no map authorized)
   - Schema / validator / orchestration commitment
   - Application substrate implementation
   - Grounding-note rewrites
```

The skeleton produces an ~120–160 line front door (down from ~270 lines) with the orientation function restored.

## 6. Relocation / Routing Logic

For each kind of content currently in `docs/architecture.md`, this brief specifies where the content should live after compression.

**Stays in `docs/architecture.md`:**

- Section-level current-state synthesis (layers; modes; carrier types; force kinds; curation semantic split; fallback chain; structured form)
- Three named structural concerns at synthesis depth (with one paragraph each, not multi-page)
- Inventory of held items at orientation depth (Apex Named Limitations and similar; one short bullet per item)
- Source-of-truth routing to canonical depth artifacts
- Out-of-scope section

**Routes to `docs/index.md`:**

- Full chronological PR-by-PR absorption history (already in `docs/index.md`'s post-milestone-* sections; the front door does not duplicate)
- Comprehensive navigation across every repo artifact (already in `docs/index.md`)
- Candidate-next-pressure-surface enumeration (already absent from `docs/index.md` proper; lives in operator-side strategy)

**Routes to milestones:**

- Milestone 12's multi-axis recurrence narrative (lives in `docs/milestones/milestone-12-...`)
- Milestone 11's Zone 6 / Option F arc narrative (lives in `docs/milestones/milestone-11-...`)
- Milestone 10's Phase 2 six-category completion narrative (lives in `docs/milestones/milestone-10-...`)
- Earlier milestones' substantive content (already milestone-resident)

**Routes to source artifacts:**

- Specific carrier-shape constraint vocabularies (Option F's PR #256 vocabulary; intake-reference-rationale's PR #263 vocabulary; Zone 4's PR #268 vocabulary)
- Per-test sub-aggregate findings (each operational pressure test's reconstruction scores)
- Reader-judgment signal descriptions (Q-9; Q-11)
- Multi-axis sharpened-not-closed analytical detail

**Routes to application docs:**

- Generated-output artifact grammar specifications (`docs/application/implementation-roadmap-system-map-artifact-grammar-v1.md`)
- Application-consumer pressure analysis (`docs/application/artifact-grammar-consumer-pressure-v1.md`)
- Application sub-tree navigation (`docs/application/README.md`)

**Should not be duplicated:**

- Any depth-artifact content (depth-authority routing replaces restatement)
- Any milestone content (front door references the plateau marker; does not narrate it)
- Any source-of-intent content from operator-side memos (boundary preserved per grounding-note discipline)

## 7. Stale or Awkward Current-Front-Door Content

Specific items the compression PR should address:

- **The Scale-of-Operation Held Question sub-section's eleven PR absorption paragraphs (lines 173–209).** This is the largest chronological absorption block in the file. The architectural content these PRs collectively produced (the conceptual-vs-vocabular split surfaced in PR #275; the sharpened-not-closed carrier-shape pattern; Option F's surviving conceptual posture; the intake-reference-rationale axis; the Zone 4 axis) can be summarized in a single synthesis paragraph routed to milestone 11 + milestone 12 + the relevant source artifacts. The eleven PR-by-PR paragraphs should collapse into this synthesis.

- **The Inventory sub-section's run-on paragraph at line 218.** A single bullet containing ~30 lines of prose enumerating every PR in the post-milestone-9 arc plus ~25 candidate next-pressure surfaces. Both behaviors (chronology; candidate enumeration) leave the front door. The held architectural content the inventory bullet does carry (Phase 2 input-category deepening surface; brand-system carrier decision surface v2's narrowing) can fold into the Brand-System Layer Status sub-section or into the inventory's preserved short-bullet items.

- **Possible stale depth-authority routing.** The current source-of-truth list at lines 26–58 includes ~31 entries. Several entries route to artifacts that the post-milestone-12 work has effectively superseded as the current routing target (e.g., the brand-system hybrid carrier decision surface v1 entry is now subordinate to v2; the various intake-trace surfaces are subordinate to milestone 11's plateau). The compression PR should audit each entry for whether it still represents the current routing target or whether a successor artifact now does.

- **Repeated held-question content.** The Curation Semantic Split is mentioned in §Current Architecture Shape (Layers list), in §Held Questions / Curation-Premise Architectural Fork, and again in the Scale-of-Operation sub-section's normative-force paragraph. One synthesis-depth mention plus depth-authority routing suffices.

- **Milestone history better routed to `docs/index.md` and `docs/milestones/`.** The current file's chronological progression from milestone 8 through milestone 12 is partially reproduced; the milestones themselves carry that progression authoritatively.

- **Pre-existing voice-discipline residue (not in scope for this brief).** Surfaced in PR #276 review: a high-precision blocklist token appears in the workflow-diagnosis-memo-template description in `docs/application/README.md`. This is pre-existing content elsewhere in the repo, not in `docs/architecture.md`, and is not part of this compression scope. Surfaced for awareness only.

- **Missing post-PR-272 content.** As named in §4 above, PRs #274 / #275 / #276 / #277 are completely absent from the current `docs/architecture.md`. The compression PR adds these at orientation depth as part of the same move that relocates chronological absorption out.

## 8. Non-Actions

The following do not happen as a result of this brief:

- No `docs/architecture.md` edit. The brief plans the compression; it does not execute it.
- No `docs/index.md` reorganization beyond a single routing entry for this brief if appropriate.
- No `docs/method.md` refresh.
- No `docs/problem-and-approach.md` refresh.
- No `docs/application/README.md` modification (the pre-existing voice-discipline residue surfaced in §7 is named as awareness only, not as scope).
- No milestone marker.
- No structured IA model v3.
- No schema.
- No validator / orchestration specification.
- No held-candidate adjudication map.
- No Airtable mutation.
- No grounding-note v59 opening.
- No memory write.
- No `design-system-ASK` implementation.
- No candidate-next-pressure-surface enumeration. The brief identifies content the compression PR should remove from the front door (candidate-next-pressure lists belong to operator-side strategy); the brief itself does not enumerate next moves either.
- No claim that any specific compressed line count is required. The skeleton in §5 is illustrative; the actual compression PR may produce a longer or shorter file as needed.
- No commitment to compressing in a single PR. If the compression turns out to be sufficiently substantial that splitting into two or more PRs aids review, that's a discretionary call for the compression authorization stage.

## Scope marker

This brief plans compression of `docs/architecture.md` at the current main HEAD (post-PR-277, `fd1c799`). If a subsequent PR lands content that materially changes the front door before compression is authorized, the brief's specific line-references and section-counts may need to be re-read against the new state. The compression principles (return the front door to routing function; relocate chronological absorption to milestones and source artifacts; absorb missing post-milestone-12 work; produce a current-state map at orientation depth) survive any such adjustment.

When a compression PR is authorized, this brief becomes its plan. Until then, the brief stands as analytical preparation.
