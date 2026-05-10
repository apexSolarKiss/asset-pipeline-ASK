# AGENTS.md

This file defines repo-local workflow rules for whoever executes work on this repository.

The operating model is single-node: Claude Code is both control surface and executor.

Earlier in this project's history, work also flowed through a split-execution model — ChatGPT as prompt compiler, Codex as executor, Claude Code as optional advisor (referred to historically as **Model A**). That model has been retired here. The single-node model produced ~50x less ceremony, faster iteration, and direct ASK-to-Claude conversation in place of operator-as-go-between.

The rules below are agent-agnostic — they apply to whoever is executing.

For repo-external context (project intent, audience, philosophy, foundational premises, loose threads), read the grounding note.

For project state (artifacts, decisions, milestones, current navigation), read the repo itself.

This file owns workflow rules. It does not track project state, current direction, or recommended next paths.

---

## Source-of-Truth Boundaries

- **Repo** = project truth: artifacts, decisions, findings, architecture docs, milestones, navigation.
- **`AGENTS.md`** (this file) = workflow rules for repo execution.
- **Grounding note** (external) = repo-external context: intent, audience, philosophy, foundational premises, loose threads.
- **Airtable** = live prototype truth when inspected directly.
- **Direct visual evidence** = image-fidelity truth.

If a statement would become stale when a PR lands, a chain closes, or a next path changes, it does not belong in this file.

---

## Required Reading Before Meaningful Work

Before any meaningful repo work, read:

- `README.md`
- `AGENTS.md` (this file)
- `docs/architecture.md`
- `docs/index.md`

Then read the latest milestone in `docs/milestones/` and any artifacts relevant to the task.

For external context, read the grounding note.

---

## Repo Workflow Discipline

### Session-Start Discipline

Before any new repo work in a session:

1. Confirm the working directory is the session-owned worktree. Cross-worktree absolute paths are a known failure surface; verify before any edit, write, or cross-root `git -C` command.
2. Verify `HEAD` is attached to a named branch. Detached `HEAD` is a stop condition.
3. Verify the working tree is clean.
4. If the working tree is not clean, stop. Identify whether the changes belong to the current thread before touching anything. Inheriting another thread's uncommitted state is a stop condition until provenance is established.

This does not replace Branch Freshness or Default Verification. It is the session-entry gate before meaningful repo work begins.

### Branch Freshness

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

Before meaningful work, verify:

```text
pwd
git rev-parse --show-toplevel
git remote get-url origin
git branch --show-current
git status --short
```

Stop if repo root, remote, branch, or working tree does not match the task requirements.

### Terminal-State Discipline

Do not conflate:

- local edits
- exact scoped diff
- local commit
- pushed branch
- PR created
- merged PR
- branch cleanup

Use explicit terminal states:

```text
exact scoped diff ready for approval
committed locally only
pushed branch only
PR created
merged
merged branches cleaned up
```

### Exact Scoped Diff Gate

Stop at exact scoped diff unless ASK has already approved commit / push / PR.

The default implementation terminal state is:

```text
exact scoped diff ready for approval
```

Exact scoped diff review is the mandatory approval checkpoint before meaningful write actions complete. Approval may be given inside the executor session after the diff is reviewed; once given, the executor may complete the remaining git workflow without separate manual GitHub UI ceremony.

### Structured Change Summary

Meaningful changes require a structured change summary covering:

- why this change exists
- what changed
- what did not change
- what remains out of scope

If a PR is used, this belongs in the PR description. If no PR is used, the same summary must be produced in the executor handoff or approval record before write actions complete.

### PR Creation

When creating a PR, report:

- branch name
- commit SHA
- PR number
- PR URL
- actual base branch
- actual head branch
- validation performed
- terminal state: `PR created`

### Default: Hold or Carry Through Per Adversarial-Collaboration Preconditions

When ASK has approved the scoped diff, the workflow continues through commit and push to PR creation.

If the project meets the preconditions for adversarial collaboration (per [*Adversarial Collaboration*](https://atomicspacekitten.substack.com/p/adversarial-collaboration)) — hardened backbone, active architectural uncertainty, configured advisor surface — hold at `PR created` until the advisor relay returns approval, then continue to merge. The pushed-not-merged PR is the advisor's structural review window.

ASK forwarding an advisor approval to the executor is the relay. Forwarding may be done by pasting the advisor's approval, summary, or equivalent review result. No additional approval phrase is required after the forwarding act.

Forwarding advisor notes that contain required fixes, blocking concerns, or open questions is not approval relay; it is fix-direction or question-forwarding.

If no advisor surface is configured, carry through to merged + cleanup once diff approval is given. The pattern is proportional to architectural uncertainty live at any moment.

### Post-Merge Cleanup

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

Branch plus PR is the default for meaningful architecture, ontology, or repo-structure changes. Narrow low-risk edits or explicitly scoped bootstrap tasks may allow direct push to `main` when scope is made explicit and approved.

---

## Scope Discipline

Match the unit of work to the level of the question.

For implementation and repo hygiene, prefer the smallest honest unit. Small bounded PRs are usually best. Avoid bundling, widening, or design-in-advance.

For conceptual architecture, prefer the largest tractable structural question. The smallest honest unit at the architecture layer is often a structural question or a model attempt against a concrete example, not another local prototype probe.

Do not let "smallest unit" become a rule that prevents zooming out to the right scale. A series of small honest units at the wrong layer can add up to ceremony without architectural progress.

Do not bundle unrelated work.

Do not widen from docs to schema, Airtable mutation, architecture rewrite, or production claims unless explicitly chosen.

Do not create artifacts merely because a process pattern exists.

When the repository is in an early design phase, prefer documenting constraints, boundaries, and open questions over prematurely defining systems that may later need to be undone.

---

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

---

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

---

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

---

## Self-Evident-Premise Stop Rule

If a prototype chain is mainly proving a premise ASK already treats as foundational, stop.

Consult the grounding note for current foundational premises.

Ask whether the finding is worth documenting, or whether the project should move to the next structural layer.

Do not keep proving accepted premises unless the new work materially refines the architecture.

---

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

---

## Plan-Before-Execute Rule

Before executing a meaningful repo change, state the plan: what files will change, what scope is in vs out, what non-actions apply, what terminal state is expected.

The plan-before-execute step preserves the explicit reasoning surface that prompt-compilation provides when execution is split across a prompt-compiler and an executor. In a single-node model, plan-before-execute is the rule that restores it. Do not collapse plan and execution into a single opaque step.

---

## Airtable Operating Rule

Airtable work uses the Airtable connector.

Use the connector for record / schema truth.

Use direct visual evidence in chat for image-fidelity judgment.

Do not speculate about Airtable record contents when the connector can answer directly.

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

---

## Airtable Mutation Discipline

Airtable is a disposable prototype surface. The repo is the durable asset.

Airtable mutations rely on:

- **Plan-Before-Execute Rule** — state exact target, intended action, non-actions, and terminal stop point before mutation.
- **Structured Change Summary** — after mutation, capture why the change exists, what changed, what did not, and what remains out of scope.

This applies uniformly across schema mutation, field creation, field deletion, lookup-field creation, Airtable AI field-agent configuration, generation invocation, generated-asset creation, output-slot linking, and slot-status changes.

Per-action ASK authorization is not required when plan and change summary discipline is observed.

If a mutation reveals unexpected state, stop and re-propose.

Doctrine-touching mutations still warrant heavier care; see Prototype-Bounded vs Doctrine-Touching Mutation.

---

## Airtable Schema-Fit Rule

Before authoring or approving a probe plan for any Airtable schema-fit question, perform the cheapest available live schema inspection when the connector can answer it.

```text
check possibility first
design second
document last
```

If the current schema cannot express the proposed test, report the blocker directly.

Do not route an impossible schema-fit probe through a multi-artifact chain.

---

## Prototype-Bounded vs Doctrine-Touching Mutation

Distinguish:

- prototype-bounded schema mutation (cheap, reversible, affects only active prototype surface)
- doctrine-touching schema mutation (defines shared concepts, cross-mode framing, or long-term schema structure)

Prototype-bounded mutations may compress to a bounded probe-and-do path when authorized.

Doctrine-touching mutations require heavier discipline.

When in doubt, prefer the heavier path, but do not over-fit heavy ceremony to tiny prototype work.

---

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

---

## Repo Content and Visual Discipline

This repo is primarily read by agents, operators, and future maintainers. Repo content should therefore remain machine-readable, diffable, grep-able, and durable as plain text.

Do not replace semantic repo content with binary visual assets ad-hoc. Diagrams, rendered maps, and other visual assets may supplement plain-text artifacts, but they are not substitutes for the canonical textual representation unless the work is explicitly scoped as a systematic presentation pass.

Content visuals belong only when they clarify a repo-local artifact without weakening inspectability. Human-facing presentation layers may be developed separately when the project reaches a show-don't-tell stage.

Existing repo identity imagery is out of scope; this rule concerns content visuals such as architectural diagrams, flow maps, matrices, and rendered explanatory graphics.

---

## Comments, Docs, and PR Roles

Use code comments only for local clarification inside implementation artifacts when implementation exists.

Use repository docs for durable repo-local truth, boundary definitions, architecture framing, and evolving project understanding.

Use pull requests for change-specific explanation, reviewer guidance, tradeoffs, and temporary decision context that does not belong in long-lived documentation.

Keep repo-local documentation separate from change-specific explanation.

---

## Refresh Cadences

### Grounding Note

Refresh the grounding note only when external handoff context changes:

- new strategic direction
- philosophical reframing
- audience or positioning shift
- foundational premises change
- operating model changes

Do not refresh for routine repo chronology.

Possible future directions belong in the grounding note only as non-binding loose threads, not as recommended next paths.

### `AGENTS.md`

Refresh this file only when a workflow rule is added, removed, or materially revised.

Do not refresh because project state changed.
Do not refresh because a PR landed.
Do not refresh because a chain closed.
Do not refresh because the next project direction changed.

If a proposed update says "the project currently should do X," it does not belong in this file.

---

## Short Version

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
