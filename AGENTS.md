# AGENTS.md — asset-pipeline-ASK

This repo's `AGENTS.md` is a **resolved carrier**: the shared execution protocol (below, resolved from `control-surface/protocol/AGENTS.shared.md`) + the standing upstream-conformance grant + the asset-pipeline-ASK-local delta. It installs no profile. The shared block and grant are machine-maintained — do not hand-edit between the markers.

<!-- BEGIN carrier-metadata -->
CARRIER_TYPE: resolved-local
SHARED_BLOCK_SOURCE: apexSolarKiss/control-surface/protocol/AGENTS.shared.md
SHARED_BLOCK_PIN: 8bdacc2dfc86bec8d2c0f34aa5dc4507fc7bd72b
PROFILES: []
GRANT_FRAGMENT: standing-upstream-conformance-grant@8bdacc2dfc86bec8d2c0f34aa5dc4507fc7bd72b
OPERATING_SURFACE: separately-operated
<!-- END carrier-metadata -->

<!-- BEGIN shared: AGENTS.shared.md -->
<!-- protocol/AGENTS.shared.md — distributable shared execution-protocol body (fixed, byte-identical text only). Owner explanation + authoring contract: apexSolarKiss/control-surface/protocol/README.md. This body is inserted verbatim between the BEGIN/END shared markers in each resolved AGENTS.md (the owner root and every consumer); it carries no owner-canonical H1, no project parameters, no coordinator orchestration, no consumer grant, and no repo-local delta. The rules are agent-agnostic — they apply to whoever is executing. -->

## Source-of-Truth Boundaries
<!-- rule-id: source-of-truth-boundaries -->

- **Repo** = project truth: artifacts, decisions, docs, templates, examples.
- **`AGENTS.md`** = workflow rules for repo execution, resolved as: this shared core + applicable profiles + opt-in fragments + repo-local delta.
- **Grounding note** (external) = repo-external context: intent, audience, philosophy, foundational premises, durable loose threads.
- **Per-conversation / task state** (ChatGPT thread history, task lists, in-flight session context) = ephemeral; does NOT belong in the grounding note.
- **Private agent memory** (e.g. Claude Code's MEMORY.md) = non-authoritative operator context. It MAY retain ASK-authorized incidents, anti-re-derivation pointers, worked examples, refusal/supersession records, tool/vendor occupancy, and other operator context **within that memory's authorized owning surface** — but it NEVER owns durable project truth or workflow protocol (see §Verification Claims). Wall-bound material remains on the owning side of the wall; this rule creates no cross-wall read, copy, or retention authority.

### Aging-Rate Principle
<!-- rule-id: aging-rate-principle -->

The split between repo, `AGENTS.md`, grounding note, ephemeral per-conversation / task state, and non-authoritative private agent memory is separation by *aging rate*.

- A doc that *tracks state* ages fast and must be refreshed often.
- A doc that *points to state* ages slowly and stays useful across many sessions.
- A rules doc that contains rules only ages slowly.
- A context doc that contains context only ages slowly.
- A doc that mixes rules, context, and state ages at the rate of its fastest-aging contents — usually badly.

If a statement would become stale when a PR lands, a chain closes, or a next path changes, it does not belong in this file or in the grounding note.

---

## Required Reading Before Meaningful Work
<!-- rule-id: required-reading -->

Before any meaningful repo work, read:

- this repository's `README.md`;
- this `AGENTS.md` — the shared execution-protocol core and this repo's own Required Reads named in its local delta;
- the repo-local Required Reads and architecture docs that delta names.

For external context, read the grounding note. Then read whatever templates, prompts, examples, milestones, or findings are relevant to the task.

---

## Inbound Handoff TBI Marker
<!-- rule-id: inbound-tbi-marker -->

When a routed handoff memo in a shared intake carries the `-TBI.md` suffix, treat the suffix as ASK ingestion-state only: a received handoff awaiting ingestion, not a statement about absorption. When ASK feeds that memo into the active surface, the first recipient-side action is to rename the file in place to remove `-TBI`; do not edit the memo body. Then classify the memo. When classification produces a durable action, hold, rejection, or route, record the required closure in scratch. Copy + suffix do not authorize implementation.

`-TBI` marks material that ASK has saved but has not yet fed into the operating surface responsible for ingesting it. It is an unconsumed ingestion-queue marker — not a repo-ownership marker and not a pending-action marker. That is why the suffix is struck **on ingestion** rather than at absorption: the item leaves the queue when it is fed in.

**Do not create a `-TBI` addressed to a surface the acting surface already operates.** Moving between repos inside one operating surface is a hard repo-boundary reset — read that repo's grounding note and `AGENTS.md`, verify live state, work under its own branch, diff, review, and merge gates — not an ingestion event. A handoff addressed back to the surface that authored it tracks nothing: the destination operating surface already has the material, so no ingestion boundary was crossed.

Separate repo authority is real and unaffected by this rule. **It does not create a separate ingestion boundary.** Pending owner classification or repo action is repo state — carried by the closure, the relay, or task state — not `-TBI` state.

Method-altitude articulation: `method-ASK/docs/source-of-intent.md` §Inbound handoff TBI marker.

---

## Provenance Transcript PTX Marker
<!-- rule-id: ptx-marker -->

A filename ending in `-PTX.md` or `-PTX_vN.md` identifies an ASK-assembled **Provenance Transcript**: a record of a source conversation or cross-surface exchange, retained for lineage and later verification.

The `-PTX` segment is the artifact-role marker. An optional `_vN` suffix records the version of the transcript artifact itself. It does not make the artifact a model draft or draft-zero, and it confers no lifecycle state or authority.

A `-PTX` artifact is not a canonical, a model draft or model draft-zero, a versioned canonical snapshot, a handoff, an approval or execution instruction, or an ingestion-state marker.

- `-PTX.md` is an unversioned singleton transcript.
- `-PTX_vN.md` is a numbered member of an explicit transcript version lineage. `_v0` means the first numbered PTX version, not draft-zero.
- Infer version precedence only from an explicit `_vN`, never from the `-PTX` marker itself.
- Neither `-PTX` nor `_vN` establishes whether the transcript is still being assembled, complete, closed, or frozen. PTX lifecycle and version progression are ASK-owned; do not edit, extend, rename, close, freeze, or advance a PTX unless ASK explicitly directs the exact operation.
- The PTX files are themselves the lineage; do not create a separate canonical-plus-snapshot chain for them.
- Do not absorb a PTX as project truth without classification.
- If the transcript creates work for another surface, route a separate handoff rather than stacking `-PTX` with `-TBI`.
- The convention is prospective. Historical transcripts are not renamed for conformance, so the absence of `-PTX` does not establish that a file is a model draft — classify an unmarked artifact from the file and its scratch context before versioning or superseding it.

Forms:

```text
YYYY-MM-DD_<surface-or-subject>_<topic>-PTX.md
YYYY-MM-DD_<surface-or-subject>_<topic>-PTX_vN.md
```

`-TBI`, `-PTX`, and `_vN` do not share an axis: `-TBI` is a lifecycle state, renamed off on ingestion; `-PTX` is an artifact role, and the role marker is retained throughout any version lineage; `_vN` is an optional version index for the transcript artifact. Neither `-PTX` nor `_vN` confers state, authority, or canonical status.

---

## Cross-Surface Change Routing
<!-- rule-id: cross-surface-change-routing -->

Before choosing direct operation or `-TBI` routing, first establish whether the material crosses an operating-surface boundary at all. Only then classify the change's authority and the surface's write jurisdiction.

- **Destination inside the same operating surface** → **no `-TBI`, under any authority class.** Change repo context through a hard repo-boundary reset and operate the owning repo directly under its own gates. Answer this test first; a `yes` disposes of the routing question on its own, and the authority and jurisdiction tests below never run.
- **Candidate source-of-intent, project-specific direction, or other material whose recipient must classify** → preserve the origin record, route a recipient copy through `sources of intent/` with `-TBI`, and let the recipient surface own ingestion and absorption. This branch presumes the recipient is a *different* operating surface; recipient-owned classification inside one surface is a hat swap, not a handoff.
- **ASK-authorized conformance to a protocol owned upstream** → propagate directly only where the active surface has write jurisdiction over the consumer. Apply the change through the consumer repo's own branch, diff, PR, review, and merge gates. Do not create a `-TBI` handoff merely to carry an already-authoritative protocol update.
- **No direct write jurisdiction** → route to the owning surface even when the upstream protocol is authoritative. Protocol ownership does not pierce a wall, create a grant, or bypass a surface boundary.

Write jurisdiction may be standing or explicitly granted by ASK for the scoped conformance change. Neither protocol ownership, connector capability, nor this rule itself creates write jurisdiction over another surface.

Direct propagation authorizes only the scoped conformance change. It does not authorize unrelated changes to the consumer's project truth, architecture, source of intent, or implementation.

**Conformance targets canonical state, not literal carrier strings.** Name the owner canonical by path — and SHA where available — as the authority. Quoted recipient text is a search anchor or illustration, not an exhaustive change target unless that carrier has been verified byte-identical to the owner. The acting or recipient surface reads its live carrier, corrects every materially equivalent occurrence within the explicitly named clause or section, and re-syncs that bounded scope to canonical substance without widening beyond the authorized rule. When the originating surface cannot inspect the recipient carrier — across a wall, for example — the handoff leads with the canonical re-sync instruction and marks any quoted find-and-replace text explicitly non-exhaustive.

Method-altitude articulation: `method-ASK/docs/source-of-intent.md` §Scope guard: handoff routing vs protocol conformance.

---

## Verification Claims and Evidence Boundaries
<!-- rule-id: verification-claims-evidence-boundaries -->

A verification statement is bounded by the evidence actually gathered.

- For claims such as `clean`, `complete`, `current`, `zero residue`, `byte-identical`, or `verified`, name the exact carrier set, path or query, ref or time boundary, and property actually tested.
- **Verify the measurement target at the point of execution.** A passing, failing, or zero-result check is not evidence until the command's repository or worktree, carrier or path set, ref or time boundary, and query or predicate are explicit and independently confirmed. Do not rely on inherited `cwd`, a preceding `cd` in a compound command, or an earlier attachment check in cross-repo or multi-root work. When the claim concerns change across a mutation, capture the baseline before editing; a clean post-edit result cannot establish the pre-edit state.
- **Verify execution completion and result semantics.** Confirm that a verification check actually executed before interpreting its output. Distinguish a valid no-match from an execution error; preserve the raw completion status before any pipe or transformation; quote or otherwise validate paths, globs, and input expansion. State whether a count measures files, matched lines, occurrences, records, or claim units. **Empty output from a failed or unrun check is no evidence.**
<!-- rule-id: verification-execution-completion -->
- **The boundary of a search is the boundary of the claim.** Absence from one folder, one pattern, one connector result, or one carrier class is not absence from the corpus.
- **A check verifies only its direct result.** Separate observation from inference; do not attach an inference to a checked fact and label the composite `verified`.
- Pattern lists are hypotheses about how a defect may appear, not exhaustive evidence. An exhaustive claim requires enumerating and dispositioning the actual occurrence or carrier set.
- Where coverage is partial, state the result as: `no unexplained findings in <exact set tested>`.
- If a **completed audit, closure, provenance record, or other frozen record** overstates its evidence, preserve the original statement and append a correction. Do not silently tidy the audit trail.
- If a **live canonical or current instruction** overstates its evidence, correct the operative statement under that carrier's version and snapshot discipline, preserving the prior state in its lineage — rather than leaving a false current instruction in force.

Private agent memory may record an incident or point to this canonical rule **only when ASK explicitly authorizes that memory write**. This section does not itself authorize creating, extending, or revising memory. Private agent memory is not the owner of durable workflow protocol.
<!-- rule-id: private-memory-not-owner -->

---

## Rule-to-Artifact Conformance Gate
<!-- rule-id: rule-to-artifact-conformance-gate -->

Before adding, materially revising, or applying a workflow rule that changes artifact naming, versioning, snapshots, routing, or lifecycle:

1. read the current canonical rule;
2. inspect the current artifacts, relevant lineage, and live citations the rule governs;
3. test the rule against the artifacts and the artifacts against the rule.

A long-standing written rule may have drifted. Repeated artifact practice may also be wrong. **If the rule and governed artifacts disagree, stop and obtain an ASK ruling before mutating either.**

Do not retroactively rename, normalize, or rewrite historical artifacts solely to force apparent conformance. After the ruling: **if the ruling changes the canonical rule**, update that rule first, then conform current active carriers within the authorized scope. **If the rule stands**, leave it unchanged and conform the current artifacts instead.

---

## Path Migration: Reverse-Consumer Enumeration
<!-- rule-id: path-migration-reverse-consumer-enumeration -->

Moving or renaming a canonical path breaks every surface that *points at* it, which is a strictly larger set than the surfaces that *move*. Enumerate consumers; do not reason about scope.

Before the cutover, list:

1. objects that move;
2. direct references inside the owning surface;
3. every external source index that maps the path;
4. downstream trackers, adapters, prompts, and routing instructions;
5. walled or private consumer indexes;
6. actual Project-source inventories and retrieval behavior — mounted Sources, Instructions, live connector paths, standing mounts, on-demand fallbacks, and any claim about which of those exists;
7. local launch configs, scripts, agent memory, aliases, symlinks;
8. human applications keyed to the path;
9. current locators versus historical event-time paths.

**A surface being out of scope for moving does not put it out of scope for referencing.** That inference is the characteristic failure: a downstream project keeps its own root, so it is excluded from the migration — and its index, trackers, and prompts keep pointing at an address that no longer exists.

**Post-cutover fail-closed claims apply §Verification Claims and Evidence Boundaries.** "No stale references remain" is a claim about what was scanned. Name the exact carrier set tested, or the result will be read as broader evidence than the check supports.

**Per-line disposition, never a blanket swap.** A current locator tells the reader where to find a retained artifact — update it. A historical record states where something lived at event time — leave it. A line doing both keeps its narrative and gets its locator corrected, or states both paths explicitly. Ambiguous function stops for an ASK ruling rather than a guess.

**A migration is also an audit.** Reading every consumer may surface drift that predates the move — stale bases, retired conventions, or declarations that disagree with disk or Project UI. Record it as adjacent. Repair it only when the active scope explicitly authorizes that correction and the acting surface has write jurisdiction; otherwise flag or route it under §Cross-Surface Change Routing.

---

## Repo Workflow Discipline

### Session-Start Discipline
<!-- rule-id: session-start-discipline -->

Before any new repo work in a session:

1. Confirm the working directory is the session-owned worktree or approved repo root for this session. Cross-worktree absolute paths are a known failure surface; verify before any edit, write, or cross-root `git -C` command.
2. Verify `HEAD` is attached to a named branch. Detached `HEAD` is a stop condition.
3. Verify the working tree is clean.
4. If the working tree is not clean, stop. Identify whether the changes belong to the current thread before touching anything. Inheriting another thread's uncommitted state is a stop condition until provenance is established.

This does not replace Branch Freshness or Default Verification. It is the session-entry gate before meaningful repo work begins.

### Branch Freshness
<!-- rule-id: branch-freshness -->

For repo implementation work, follow this sequence:

1. verify local repo attachment
2. verify clean working tree
3. `git fetch origin --prune`
4. `git checkout main`
5. `git pull --ff-only origin main`
6. create task branch from refreshed `main`
7. stop if any verification fails

Do not start meaningful repo work from a stale, dirty, detached, or ambiguous branch.

### Default Verification
<!-- rule-id: default-verification -->

Before meaningful work, verify:

```text
pwd
git rev-parse --show-toplevel
git remote get-url origin
git branch --show-current
git status --short
```

Stop if repo root, remote, branch, or working tree does not match the task requirements.

### Terminal-State Discipline — do not conflate
<!-- rule-id: terminal-state-do-not-conflate -->

Do not conflate distinct terminal states. Each is a separate, independently verifiable fact:

- local edits
- exact scoped diff
- local commit
- pushed branch
- PR created
- merged PR
- branch cleanup

A report that collapses two of these (e.g. "done" for a change that is only committed locally, or "merged" for a change only pushed) is a defect regardless of the vocabulary used.

### Terminal-State vocabulary
<!-- rule-id: terminal-state-vocabulary -->

Use these explicit terminal states by name:

```text
exact scoped diff ready for approval
committed locally only
pushed branch only
PR created
merged
merged branches cleaned up
```

### Explicit Artifact-Lifecycle Verbs
<!-- rule-id: explicit-artifact-lifecycle-verbs -->

Do not use `cut` as an operation verb for drafts, changes, files, versions, snapshots, handoffs, releases, or other artifacts. It is ambiguous between creation and destruction.

Name the actual operation instead: draft, write, revise, save, create a version, create a snapshot, copy at byte parity, rename, route, supersede, retire, or delete.

This rule applies to plans, instructions, handoffs, change summaries, and status reports. Historical quotations, provenance records, frozen artifacts, and unambiguous domain terms such as a film's rough cut are not rewritten solely to enforce it.

### Exact Scoped Diff Gate
<!-- rule-id: exact-scoped-diff-gate -->

Stop at exact scoped diff unless ASK has already approved commit / push / PR.

The default implementation terminal state is:

```text
exact scoped diff ready for approval
```

Exact scoped diff review is the mandatory approval checkpoint before meaningful write actions complete. Approval may be given inside the executor session after the diff is reviewed; once given, the executor may complete the remaining git workflow without separate manual GitHub UI ceremony.

### Structured Change Summary
<!-- rule-id: structured-change-summary -->

Meaningful changes require a structured change summary covering:

- why this change exists
- what changed
- what did not change
- what remains out of scope

If a PR is used, this belongs in the PR description. If no PR is used, the same summary must be produced in the executor handoff or approval record before write actions complete.

### Operator-Side Voice Scan
<!-- rule-id: operator-side-voice-scan -->

Before presenting an exact scoped diff for approval, scan added prose for voice / surface-boundary risk according to the project's operator-side voice discipline memory and grounding-note voice guidance.

Flag any matches or concerns honestly in the structured change summary. Do not auto-sanitize: some apparent matches may be legitimate domain vocabulary that the project needs to name directly.

The scan rule may live in `AGENTS.md`; the token list, translation table, and protected domain-vocabulary list do not. Those specifics are operator-side context and must not be copied into repo-local artifacts.

### Default: Hold or Carry Through Per Adversarial-Collaboration Preconditions
<!-- rule-id: default-hold-or-carry-through -->

When ASK has approved the scoped diff, the workflow continues through commit and push to PR creation.

If the project meets the preconditions for adversarial collaboration (per [*Adversarial Collaboration*](https://atomicspacekitten.substack.com/p/adversarial-collaboration)) — hardened backbone, active architectural uncertainty, configured advisor surface — hold at `PR created` until the advisor relay returns approval, then continue to merge. The pushed-not-merged PR is the advisor's structural review window.

ASK forwarding an advisor approval to the executor is the relay. Forwarding may be done by pasting the advisor's approval, summary, or equivalent review result. No additional approval phrase is required after the forwarding act.

Forwarding advisor notes that contain required fixes, blocking concerns, or open questions is not approval relay; it is fix-direction or question-forwarding.

If no advisor surface is configured, carry through to merged + cleanup once diff approval is given. The pattern is proportional to architectural uncertainty live at any moment.

### PR Creation
<!-- rule-id: pr-creation -->

When creating a PR, report:

- branch name
- commit SHA
- PR number
- PR URL
- actual base branch
- actual head branch
- validation performed
- terminal state: `PR created`

### Post-Merge Cleanup
<!-- rule-id: post-merge-cleanup -->

After merge, verify `main`, delete merged task branches where safe, verify remote branch state, and report:

- current main HEAD
- whether merge commit is present
- whether expected changes are present
- local branch cleanup
- remote branch cleanup
- final branches
- final working tree status
- terminal state: `merged branches cleaned up`

### Direct Push to Main
<!-- rule-id: direct-push-to-main -->

Branch plus PR is the default for meaningful structure or rule changes. Narrow low-risk edits or explicitly scoped bootstrap tasks may allow direct push to `main` when scope is made explicit and approved.

---

## Session Topology / Single-Writer Discipline
<!-- rule-id: session-topology-single-writer -->

Multiple operator sessions (multiple Claude Code threads, parallel Codex sessions, ChatGPT thread plus Codex thread) can mutate the same repo files concurrently. This is a real failure mode, not a hypothetical.

Rules:

- **One writer at a time per branch.** A second operator session on the same branch must verify state freshly, treat the working tree as authoritative over its own memory, and not assume mid-flight context from another session.
- **Treat repo and remote as the audit trail.** When two sessions disagree about state, prefer `git status`, `git log`, and remote-branch state over either session's recollection.
- **Stop on suspected concurrent mutation.** If a working tree contains changes the current session did not make, do not overwrite. Re-orient against the repo before continuing.

This rule applies whether the second session is the same agent, a different agent, or a human editor.

---

## Scope Discipline
<!-- rule-id: scope-discipline -->

Match the unit of work to the level of the question.

For implementation and repo hygiene, prefer the smallest honest unit. Small bounded PRs are usually best. Avoid bundling, widening, or design-in-advance.

For conceptual architecture, prefer the largest tractable structural question. The smallest honest unit at the architecture layer is often a structural question or a model attempt against a concrete example, not another local prototype probe.

Do not let "smallest unit" become a rule that prevents zooming out to the right scale. A series of small honest units at the wrong layer can add up to ceremony without architectural progress.

Do not bundle unrelated work. Do not widen scope mid-task unless the widening is explicitly chosen. Do not create artifacts merely because a process pattern exists.

---

## Plan-Before-Execute Rule
<!-- rule-id: plan-before-execute -->

Before executing a meaningful repo change, state the plan: what files will change, what scope is in vs out, what non-actions apply, what terminal state is expected.

This applies whether the executor is a separate process (Codex) or the same agent doing the planning (Claude Code).

The plan-before-execute step preserves the explicit reasoning surface that prompt-compilation provides when execution is split across a prompt-compiler and an executor. In a single-node model, plan-before-execute is the rule that restores it. Do not collapse plan and execution into a single opaque step.

---

## Tool-Dependent Workflow Rules
<!-- rule-id: tool-dependent-workflow-rules -->

When a project workflow depends on an external tool, vendor, model, rendering surface, extraction surface, diagram-generation surface, or other operator-supplied system whose identity may change, encode the repo-local rule tool-agnostically.

In `AGENTS.md`, name the structural role the tool plays, when it is invoked, what inputs and outputs it expects, the authority boundary, and any refresh cadence. In operator-side memory, carry the current approved tool / vendor / surface identity, the substitution path, and any operational details that depend on the specific tool.

The repo rule names the role; operator-side memory names the current occupant of the role. Substitution updates the memory entry, not the repo rule.

---

## Comments, Docs, and PR Roles
<!-- rule-id: comments-docs-pr-roles -->

- Comments belong in implementation artifacts only when local clarity needs them.
- Docs describe architecture, boundaries, operating contracts, and reusable guidance.
- Structured change summaries and PR descriptions hold change-specific framing.

Do not push PR-only explanation into permanent repo docs, and do not hide durable operating rules inside a PR or approval record.

---

## Refresh Cadences

### Grounding Note
<!-- rule-id: refresh-cadence-grounding-note -->

Refresh the grounding note only when external handoff context changes: new strategic direction, philosophical reframing, audience or positioning shift, foundational premises change, operating model changes.

Do not refresh for routine repo chronology. Possible future directions belong in the grounding note only as durable loose threads, not as recommended next paths.

### `AGENTS.md`
<!-- rule-id: refresh-cadence-agents-md -->

Refresh this file only when a workflow rule is added, removed, or materially revised.

Do not refresh because project state changed. Do not refresh because a PR landed. Do not refresh because the next direction changed.

If a proposed update says "the project currently should do X," it does not belong in this file.

---

## Defaults
<!-- rule-id: defaults-shared -->

- Prefer ASK reuse over world-scale abstraction.
- Prefer explicit structure over clever indirection.
- Prefer the smallest coherent scaffold that clarifies the workflow boundary.
- Use clean technical language. Avoid manifesto phrasing, speculative systems, or generic process bloat. *(Voice/register specifics route to the operator voice canonical, not to a second authority here.)*

---

## Short Version

- Verify repo state before meaningful work.
- Read repo-local truth and grounding note before responding.
- Stop at exact scoped diff before commit; carry through to merged + cleanup once approved.
- State the plan before executing.
- Single-writer per branch. Treat repo as audit trail.
- Match the unit of work to the level of the question.
- Refresh `AGENTS.md` only for rule changes.
- Keep this file workflow-only. Repo holds state. Grounding note holds external context.
- Bound every verification claim to the exact evidence gathered; separate checked facts from inferences, and test rules against the live artifacts they govern before applying them.
<!-- END shared -->

<!-- BEGIN grant: standing-upstream-conformance-grant (OPTIONAL — separately-operated opt-in only) -->
## Standing upstream conformance grants

This repo grants the **active ASK control surface** standing write jurisdiction for **GREEN mechanical conformance** to merged upstream owner changes explicitly marked for propagation, under the control-surface propagation-wave protocol (`control-surface/AGENTS.md` §Cross-Repo Propagation Waves and `control-surface/prompts/cross-repo-propagation-wave.md`). "Active ASK control surface" is the executor; ecology-ASK is the coordination altitude and ledger; this repo remains the owner of its project truth.

### Design-system vendor maintenance

Covers: byte-identical re-vendoring of DS-owned files (engines, helper, exporter, CSS, font carrier); an owner-required support file and deterministic script load order; deterministic local pin / MANIFEST / README records; an existing, unambiguous source/render/date operation; and derived-artifact (raster/companion) regeneration where this repo's existing contract requires it.

### Execution-protocol maintenance

Covers: exact or substantively deterministic re-sync of inherited `control-surface` protocol clauses in declared carriers (`AGENTS.md`, templates, prompts); deterministic carrier additions/removals/load-order changes required by the merged protocol; and local provenance/pin/README/manifest updates recording the operation.

### Both lanes — bounds

**Covered:** preparation of a bounded branch and PR under this repo's normal diff / review / merge / cleanup gates.

**Not covered:** source of intent · product/domain decisions · project architecture · source data or diagram semantics · consumer-authored visual identity or geometry · bespoke adapters requiring design judgment · intentional local protocol exceptions · review/merge/release/sealing-policy changes · changes to this grant itself · unrelated cleanup.

**Active only when:** the upstream change is merged and its canonical path + SHA are identified; the affected carriers are confirmed at rest (human + machine, per the propagation-wave at-rest gate); the change is classified GREEN; repo-local deltas and intentional exceptions are preserved; and no unresolved interpretation or project-specific policy choice is required.

**On any stop condition** (active work, unexpected diff, locally-modified owner file, ambiguous mapping, ambiguous version/raster action, project-specific judgment, conflict with a local exception): do not improvise, do not merge, leave the obligation queued as re-sync due. Route a `-TBI` handoff only when recipient classification or a new grant is genuinely required — never as a deferred-task envelope.

Execution jurisdiction does not transfer artifact ownership. ASK may suspend or revoke this grant for a wave or for the repo.
<!-- END grant -->

<!-- BEGIN local-delta -->
## asset-pipeline-ASK-Local

These rules are the repo-local delta for `asset-pipeline-ASK` (a separately-operated ASK ecology consumer) on top of the shared protocol above. It installs no profile and opts into the standing upstream-conformance grant (installed above). `asset-pipeline-ASK`'s local delta wins for `asset-pipeline-ASK` where an explicit conflict exists.

## Operating model (AP layer)

`asset-pipeline-ASK` uses a single-node operating model: the active control surface is also the executor.

## Source-of-Truth additions (AP layer)

Beyond the shared §Source-of-Truth Boundaries, `asset-pipeline-ASK` adds two project-truth sources:

- **Airtable** = live prototype truth when inspected directly.
- **Direct visual evidence** = image-fidelity truth.

## Required Reading Before Meaningful Work (AP layer)

Before any meaningful repo work, read:

- `README.md`
- `AGENTS.md` (this file)
- `docs/architecture.md`
- `docs/index.md`

Then read the latest milestone in `docs/milestones/` and any artifacts relevant to the task.

For Airtable prototype work, also read:

- `docs/airtable-connector-tool-capability-limitations-v1.md`

Before schema setup, field-agent setup, attachment handling, record mutation, generation/capture, or cross-base operationalization, confirm which steps are connector-supported and which require Airtable UI / manual hybrid execution. This is a pointer rule — the limitations doc remains the refreshable source for current tool-layer constraints; do not duplicate them here.

## Inbound handoff intake (AP layer)

The generic `-TBI` ingestion, rename-on-ingestion, and classification mechanics are owned by the shared §Inbound Handoff TBI Marker. The exact intake destination for routed inbound handoff memos is `asset-pipeline-ASK-EXTERNAL/sources of intent/`.

## Direct Push to Main (AP layer)

The shared §Direct Push to Main governs the generic narrow-low-risk allowance. For `asset-pipeline-ASK` the branch-plus-PR default carries stronger AP-local force:

Branch plus PR is the default for meaningful architecture, ontology, or repo-structure changes.

## Scope Discipline additions (AP layer)

These extend the shared §Scope Discipline with AP-specific scope guards:

Do not widen from docs to schema, Airtable mutation, architecture rewrite, or production claims unless explicitly chosen.

When the repository is in an early design phase, prefer documenting constraints, boundaries, and open questions over prematurely defining systems that may later need to be undone.

## Architecture-Before-Prototype Rule

When ASK is trying to define conceptual information architecture, do not default to Airtable probes or repo evidence chains.

First identify:

- the architectural question
- the candidate model
- the scale of example needed to pressure-test it
- what uncertainty the prototype would resolve
- what the result would change about the architecture

Use prototypes to test architecture.

Do not let the prototype become the object of study instead of the pressure surface for studying the information architecture.

If the architectural question is not clear, do not open a prototype chain.

## Prototype-as-Pressure-Surface Rule

A prototype is a pressure surface, not the project center.

A prototype is justified when it exposes, tests, or falsifies a structural distinction in the information architecture.

A prototype is not justified merely because a tool behavior is available to test.

Before proposing prototype work, state:

```text
What architectural question does this prototype pressure?
What distinction would become clearer?
What would we know after the prototype that we do not know now?
```

If the answer is only "whether the tool can do X," stop unless that tool capability is strategically load-bearing.

## Attempt-Model-Before-Plan Rule

When the work is architectural, prefer attempting a rough model on a concrete example before creating a broad planning artifact.

Do not produce a planning document that only enumerates layers, questions, or future artifacts without attempting the model.

A useful architecture artifact should do at least one of these:

- apply a candidate model to a concrete example
- show inheritance / override behavior
- reveal where a model breaks
- compare how one structure behaves across workflow modes
- surface real architecture questions from collision with an example

Permission to be wrong is part of the method.

A sketch can be more valuable than a comprehensive plan.

## Self-Evident-Premise Stop Rule

If a prototype chain is mainly proving a premise ASK already treats as foundational, stop.

Consult the grounding note for current foundational premises.

Ask whether the finding is worth documenting, or whether the project should move to the next structural layer.

Do not keep proving accepted premises unless the new work materially refines the architecture.

## Ceremony Budget Rule

Before opening an options / decision / probe / findings chain, state what architectural uncertainty the chain resolves.

If the answer is only "whether Airtable can do X," do not proceed unless Airtable capability itself is strategically load-bearing.

Avoid artifact chains that document local friction without advancing the information architecture.

Repo artifacts are justified when they preserve:

- a durable structural decision
- a schema-relevant finding
- a proof outcome that changes the model
- a reopen trigger being acted on
- live prototype state that needs repo-visible explanation

Otherwise, continue in-thread or stop.

## Airtable Operating Rule

Airtable work uses the Airtable connector.

Use the connector for record / schema truth.

Use direct visual evidence in chat for image-fidelity judgment.

Do not speculate about Airtable record contents when the connector can answer directly.

### Public Airtable Links in Repo-Readable Surfaces

Any Airtable base linked from a repo-readable surface (README, docs) must be a public read-only "Share to web" link (the `/shr…` form), not a bare base URL (`/app…`). A bare base URL gates public readers behind Airtable sign-in, so a cold visitor following a repo link to such a base hits a login wall, not the evidence. Before committing an Airtable link, enable "Share to web" (read-only) on the base or view and verify the resulting `/shr…` link loads in a logged-out browser. Share-link creation is an Airtable-UI action; the connector cannot create or verify public share links. Because a full-base "Share to web" link exposes every table in that shared base, clear operator-side residue from the shared scope first.

### Generation State Model

Distinguish:

1. storage exists
2. AI field-agent behavior is configured
3. generation has been invoked
4. generated output has been captured / mapped

Do not collapse these states.

Examples:

- a connector-created attachment field means storage exists, not that AI field-agent behavior is configured
- a generated image on a raw output field means raw output exists, not that a governed asset exists
- a generated asset record means capture / governance has been invoked, not merely that generation happened

## Airtable Mutation Discipline

Airtable is a disposable prototype surface. The repo is the durable asset.

Airtable mutations rely on:

- **Plan-Before-Execute Rule** — state exact target, intended action, non-actions, and terminal stop point before mutation.
- **Structured Change Summary** — after mutation, capture why the change exists, what changed, what did not, and what remains out of scope.

This applies uniformly across schema mutation, field creation, field deletion, lookup-field creation, Airtable AI field-agent configuration, generation invocation, generated-asset creation, output-slot linking, and slot-status changes.

Per-action ASK authorization is not required when plan and change summary discipline is observed.

If a mutation reveals unexpected state, stop and re-propose.

Doctrine-touching mutations still warrant heavier care; see Prototype-Bounded vs Doctrine-Touching Mutation.

## Airtable Schema-Fit Rule

Before authoring or approving a probe plan for any Airtable schema-fit question, perform the cheapest available live schema inspection when the connector can answer it.

```text
check possibility first
design second
document last
```

If the current schema cannot express the proposed test, report the blocker directly.

Do not route an impossible schema-fit probe through a multi-artifact chain.

## Prototype-Bounded vs Doctrine-Touching Mutation

Distinguish:

- prototype-bounded schema mutation (cheap, reversible, affects only active prototype surface)
- doctrine-touching schema mutation (defines shared concepts, cross-mode framing, or long-term schema structure)

Prototype-bounded mutations may compress to a bounded probe-and-do path when authorized.

Doctrine-touching mutations require heavier discipline.

When in doubt, prefer the heavier path, but do not over-fit heavy ceremony to tiny prototype work.

## Artifact Discipline

Repo artifacts should be narrow, citable, and explicit about posture.

### Evidence-Chain Artifacts

Evidence-chain artifacts record historical claims about what was decided, observed, or executed at a specific point.

Do not retrofit evidence-chain artifacts.

When framing changes, add a new artifact that supersedes or refines.

### Navigation / Summary Artifacts

Navigation and summary artifacts help readers navigate the repo. These may receive additive retrofits when alignment is purely navigational.

Examples: README routing, `docs/index.md`, milestone notes, application README maps.

Do not rename established files unless explicitly chosen.

### Outcome-Class Reconciliation

When a findings note pre-registers outcome classes, reconcile observed outcomes to those classes, or explicitly state why a narrower label is being used.

### Visual-Evidence Attribution

When a repo artifact records role-fit, fidelity, or image-quality claims, attribute those claims to direct visual evidence, not Airtable metadata alone.

## Repo Content and Visual Discipline

This repo is primarily read by agents, operators, and future maintainers. Repo content should therefore remain machine-readable, diffable, grep-able, and durable as plain text.

Do not replace semantic repo content with binary visual assets ad-hoc. Diagrams, rendered maps, and other visual assets may supplement plain-text artifacts, but they are not substitutes for the canonical textual representation unless the work is explicitly scoped as a systematic presentation pass.

Content visuals belong only when they clarify a repo-local artifact without weakening inspectability. Human-facing presentation layers may be developed separately when the project reaches a show-don't-tell stage.

Existing repo identity imagery is out of scope; this rule concerns content visuals such as architectural diagrams, flow maps, matrices, and rendered explanatory graphics.

## Refresh Cadence Additions (AP layer)

### Grounding Note

Possible future directions belong in the grounding note only as non-binding loose threads, not as recommended next paths.

### `AGENTS.md`

Do not refresh because a chain closed.

## Diagram Surface Refresh Cadence

The repo's diagram surface under `docs/diagrams/` is a set of visual orientation artifacts, not depth artifacts. The prose docs are authoritative if a diagram and the prose diverge. The current diagram surfaces — architecture / IA orientation diagrams, illustrative companion diagrams, and an orientation / deconfliction atlas over the representation set — are rendered in-repo by shared static engines, bespoke `figure.js` renderers, and the interactive surface's own engine:

- **architecture tree** (`asset-pipeline-ASK_architecture-tree.html`) — repo architecture / artifact structure.
- **ontology tree** (`asset-pipeline-ASK_ontology-tree.html`) — Axis A: the kinds of information the definition layer structures.
- **inheritance spine** (`asset-pipeline-ASK_inheritance-spine.html`) — Axis B: where information lives and how it inherits.
- **interactive IA state spine** (`interactive/asset-pipeline-ASK_ia-state-spine.html`) — the architecture's maturity / evidence **state** surface.
- **bounded-generativity figure** (`asset-pipeline-ASK_bounded-generativity.html`) — an **illustrative doctrine diagram** (a distinct class, not an architecture-axis or state diagram): asset-pipeline-ASK's **bounded-generativity topology** — the commercial image-production instance of bounded generativity (a source of intent / normative apex sits outside the frame → the creative brief grants the aperture of permitted variance → realization fills it with candidate variance → creative discretion enters wherever an authorized decision-maker binds within scope → curatorial selection ratifies one candidate and closes the aperture → artifact governance binds the accepted result → the governed asset + governance record sits outside the frame). The five distinctions survive as a **function-order projection** (a reading order, `creative intent → creative discretion → variance → selection → governance`) and as the non-identity line **creative intent ≠ creative discretion ≠ variance ≠ selection ≠ governance** — not as the topology itself. It is a bespoke, method-inherited `figure.js` derived from the method-ASK bounded-generativity figure (not the retired SEQ engine). Basis: `docs/creative-discretion-doctrine-v1.md`.
- **visual payload architecture** (`asset-pipeline-ASK_visual-payload-architecture.html`) — an **illustrative architecture companion diagram** on the `diagram-static-FLOW` scaffold (convergence flow on a single full-chrome diagram HTML with a clean `PNG diagram` export): reference carrier → normative-source field → resolved slot spec → realization (candidate ‖ set) → conformance → selection/governance → governed asset → future-reference return loop. Basis: `docs/visual-payload-architecture-v2.md`.
- **architectural representation atlas** (`asset-pipeline-ASK_architectural-representation-atlas.html`) — an **orientation / deconfliction** surface over the representation set: for each representation above, the object it depicts, the question it answers, the live surface, and where that view's authority ends. A bespoke `figure.js` instance (not engine-rendered), reusing the shared `diagrams.css` / `export-png.js` on a neutral palette; it creates no second system model and does not collapse the axes. Basis: `docs/architecture.md` §Source-of-Truth Routing + `docs/diagrams/README.md`.

(Axis basis: `docs/layer-disambiguation-note-v1.md`. The static architecture diagrams assert no state; the interactive spine is the state surface; the bounded-generativity figure is doctrine; the visual-payload-architecture flow is an illustrative architecture companion; the architectural representation atlas is the **orientation / deconfliction** surface over the representation set — not an architecture-axis, state, doctrine, or architecture-companion-content diagram. None of these companions, nor the atlas, is itself an architecture-axis diagram or state surface.)

**Maintenance model.** The diagrams are repo-resident and rendered in-repo — by the shared static engines (`diagrams-static-H-engine.js`, `diagrams-static-V-engine.js`, and `diagrams-static-FLOW-engine.js`), bespoke `figure.js` renderers (the bounded-generativity figure and the architectural representation atlas), and the interactive surface's own engine. The executor maintains them **in-repo** — by editing the per-diagram source data + HTML chrome and validating the rendered output (light + dark) — not by regenerating them through an external rendering surface. Any operator-side exploration surface for diagrams not yet repo-absorbed, and any rendering-tool / vendor identity, remain operator-side context and are not encoded here.

**Refresh cadence by coupling.** Refresh is milestone-triggered, but per-diagram coupling differs — **do not refresh all diagrams by default just because one changed:**

- **architecture tree** — refresh when a plateau milestone marker lands, or when the architecture front door (`docs/architecture.md`), the docs tree, or routing is substantively reorganized.
- **ontology tree (Axis A)** — refresh only when the information-kind / ontology structure changes.
- **inheritance spine (Axis B)** — refresh only when the inheritance-layer set / structure changes.
- **interactive IA state spine** — refresh when milestone / evidence state assignments change (earned / held / deflated / proposed move); the most milestone-coupled of the set.
- **bounded-generativity figure** — refresh only when the doctrine (`docs/creative-discretion-doctrine-v1.md`) changes; **not** coupled to plateau milestones or architecture / IA structure changes (it depicts doctrine, not repo state). Its **one** committed PNG — `asset-pipeline-ASK_bounded-generativity-dark.png` (the dark full-page render the doctrine note embeds directly) — is a deliberate single-raster exception to the folder's otherwise HTML-only convention, kept for markdown/GitHub embedding; the light-page and chrome-free diagram variants remain available from the exporter's `PNG page` / `PNG diagram` buttons but are not committed. The HTML + source data remain canonical and the PNG is supplemental.
- **visual payload architecture** — refresh only when the **VPA topology** (`docs/visual-payload-architecture-v2.md`) changes; **not** coupled to plateau milestones (it is an illustrative architecture companion to that doc — topology-coupled, not plateau/repo-state-coupled). The diagram HTML is full-chrome (header / legend / HUD / caption + explanatory `#flowPanel` + both `PNG page` / `PNG diagram` controls). Its committed PNG is the chrome-free **dark** render from the exporter's `PNG diagram` export, embedded in the VPA doc (a deliberate exception to the HTML-only convention; HTML + source data remain canonical, PNG supplemental). Validate both light and dark whenever the FLOW scaffold or the VPA source changes. Both the FLOW scaffold and the shared static / interactive exporters are vendored by reference from [`design-system-ASK`](https://github.com/apexSolarKiss/design-system-ASK) and never forked locally; `docs/diagrams/README.md` owns their current pins and capability state. Re-vendor on upstream change.
- **architectural representation atlas** — orientation / deconfliction surface; refresh when a represented diagram or surface is added, retired, renamed, or relocated; when the represented object or authority boundary of a view changes; or when the representational taxonomy changes; not coupled to the plateau-milestone cadence.

Do not refresh between milestones or for routine PRs. Bounded absorption PRs ship a refresh into `docs/diagrams/`, update the README pointer and any cross-reference if needed, and update this file only if the cadence itself changes. Do not maintain in-repo version history (operator-side scratch external to the repo retains any version history).

**Substrate.** A static diagram may be hosted as a single self-contained HTML file or as a repo-native bundle (thin HTML shell + per-diagram source-data file + shared engine / CSS / export files + a `docs/diagrams/README.md` carrying the source-truth-vs-illustrative-snapshot boundary). The interactive state spine is its own artifact class — a self-contained interactive surface with its own engine and styling, distinct from the static scaffolds. Review guidance:

- **Bundle / source-data substrate** (current for all listed diagram surfaces): inspect the per-diagram source-data file for content changes; inspect the README or HTML shell for routing or authority-boundary changes; inspect shared engine / CSS / export files only when they are intentionally updated; check the rendered output when practical. These files are diffable text and produce meaningful git diffs. (The **bounded-generativity figure** and the **architectural representation atlas** are variants of this substrate: each `.figure.js` is both the source-data surface and its bespoke renderer, rather than a consumer of a shared layout engine. Both reuse `diagrams.css` and `export-png.js`; the bounded-generativity figure — method-inherited from method-ASK, not the retired SEQ engine — additionally consumes the Three Functions tokens, while the atlas uses the neutral shared diagram palette and does not consume Three Functions.)
- **Self-contained HTML** (a prior substrate; may recur if a rendering surface is later substituted): typically large (~1.7 MB) because such files bundle fonts and assets as base64. Git diffs on the body are not meaningful; treat the file as a binary asset and check the rendered output rather than the diff.

Either substrate is acceptable. The cadence rules above do not change with substrate.

## Short Version (AP layer)

- Verify repo state before meaningful work.
- Read repo-local truth and grounding note before responding.
- Stop at exact scoped diff before commit.
- State the plan before executing.
- Match the unit of work to the level of the question; do not let "smallest unit" prevent zooming out to architecture scale.
- State the plan before Airtable mutation; capture a structured change summary after.
- Attempt architecture models before opening planning chains.
- Consult the grounding note for foundational premises.
- Do not keep proving accepted premises.
- Do not open ceremony-heavy artifact chains unless they resolve architectural uncertainty.
- Use the prototype as a pressure surface, not as the project center.
- Keep this file workflow-only. Repo holds project state. Grounding note holds external context.
<!-- END local-delta -->
