# Workflow Boundary (historical / superseded)

This document describes the project's prior operating model, in which the workflow lived externally as a separate ChatGPT control-surface document and the repository held only execution guidance. Under the current operating model, workflow rules live inside the repository in `AGENTS.md`, and the boundary this document describes no longer applies.

This file is retained as evidence of project evolution. Do not treat it as current guidance. For current workflow rules, read `AGENTS.md`.

---

This repository assumes a boundary between external orchestration and repo-local execution.

Within that boundary, ChatGPT acts as an external control surface and prompt compiler. That external layer may coordinate intent, compile higher-level instructions into concrete tasks, and manage orchestration behavior across sessions or systems.

That behavior does not belong in this repository.

This repository should hold repo-local truth: execution guidance, architecture framing, durable documentation, and later the implementation artifacts that belong to the repository itself.

Repo-local execution rules live in `AGENTS.md`. That file defines how work should be carried out inside this repository and should remain distinct from any external orchestration policy.

External control-surface behavior remains outside the repository, even when it materially influences how repo work is initiated or sequenced.

The purpose of this separation is to keep the repository honest about what it owns. The repository should describe local rules and local structure, not absorb external orchestration logic into versioned project documentation.
