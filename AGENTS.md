# AGENTS.md

This file defines repo-local execution guidance only.

## Scope

Keep work inside the repository boundary. Do not treat this repository as the place where external orchestration policy, prompt compilation behavior, or control-surface strategy is defined.

Prefer the smallest honest change set that advances the current repository state. Avoid inventing project structure, implementation detail, or workflow specificity that has not yet been decided.

## Branch And PR Discipline

Work from clear branches and open focused pull requests.

Keep each branch scoped to one coherent change.

Do not mix bootstrap documentation work with implementation work.

Exact scoped diff review is the mandatory approval checkpoint before meaningful write actions complete. That approval may be given inside Codex after the scoped diff is reviewed, and once given, Codex may complete the remaining git workflow steps without requiring separate manual GitHub UI actions. Manual GitHub UI ceremony is optional; it is not the review boundary itself.

Meaningful changes also require a structured change summary covering:

- why this change exists
- what changed
- what did not change
- what remains out of scope

If a pull request is used, that summary belongs in the PR description. If no pull request is used, the same summary must still be produced in the Codex handoff or approval record before meaningful write actions complete.

Branch plus PR remains the default path for meaningful architecture, ontology, or repo-structure changes. Narrow low-risk edits or explicitly scoped bootstrap tasks may allow direct push to `main` when that scope is made explicit and approved.

## Scope Discipline

When the repository is in an early design phase, prefer documenting constraints, boundaries, and open questions over prematurely defining systems that may later need to be undone.

Do not add implementation scaffolding unless that work is explicitly in scope.

Do not add repo-local artifacts that belong to an external control surface.

## Comments, Docs, And PR Roles

Use code comments only for local clarification inside implementation artifacts when implementation exists.

Use repository docs for durable repo-local truth, boundary definitions, architecture framing, and evolving project understanding.

Use pull requests for change-specific explanation, reviewer guidance, tradeoffs, and temporary decision context that does not belong in long-lived documentation.

Keep repo-local documentation separate from change-specific explanation. Repository docs hold durable repo-local truth. Structured change summaries and PR descriptions explain the specific change being reviewed or approved.

## Early-Stage Discipline

Keep guidance minimal and structural.

Avoid over-specifying workflow classes, ontology, approval models, or execution systems that are still under design.
