# AGENTS.md

This file defines repo-local execution guidance only.

## Scope

Keep work inside the repository boundary. Do not treat this repository as the place where external orchestration policy, prompt compilation behavior, or control-surface strategy is defined.

Prefer the smallest honest change set that advances the current repository state. Avoid inventing project structure, implementation detail, or workflow specificity that has not yet been decided.

## Branch And PR Discipline

Work from clear branches and open focused pull requests.

Keep each branch scoped to one coherent change.

Do not mix bootstrap documentation work with implementation work.

Use pull requests to explain change intent, boundary decisions, unresolved questions, and review needs.

## Scope Discipline

When the repository is in an early design phase, prefer documenting constraints, boundaries, and open questions over prematurely defining systems that may later need to be undone.

Do not add implementation scaffolding unless that work is explicitly in scope.

Do not add repo-local artifacts that belong to an external control surface.

## Comments, Docs, And PR Roles

Use code comments only for local clarification inside implementation artifacts when implementation exists.

Use repository docs for durable repo-local truth, boundary definitions, architecture framing, and evolving project understanding.

Use pull requests for change-specific explanation, reviewer guidance, tradeoffs, and temporary decision context that does not belong in long-lived documentation.

## Early-Stage Discipline

Keep guidance minimal and structural.

Avoid over-specifying workflow classes, ontology, approval models, or execution systems that are still under design.
