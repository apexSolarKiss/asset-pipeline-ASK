# Deterministic Vs Agent Boundary

Deterministic behavior remains the default where rules can be made explicit, and agent-assisted behavior remains an exception where behavior cannot yet be reduced cleanly.

## Deterministic Default

Deterministic behavior is preferred wherever pipeline rules, checks, or transformations can be made explicit and verified repo-locally.

## Agent-Assisted Exception

Agent-assisted behavior is acceptable only where the behavior cannot yet be cleanly reduced to stable deterministic logic, and should not be treated as the baseline design assumption.

## What This Repo May Eventually Clarify

This repo may later sharpen this boundary as actual pipeline requirements reveal which behaviors are reducible to deterministic logic and which are not.

## What Remains Out Of Scope

- runtime orchestration engines
- prompt packaging or control-surface logic
- workflow routing or scheduler design
- approval policy automation
- using agent-assisted behavior as a catch-all bucket for unresolved architecture

## Working Rule

The repo should keep deterministic behavior as the default and allow agent-assisted behavior only as a bounded exception until real pipeline requirements justify a sharper model.
