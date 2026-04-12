# Pipeline Shape

This document describes the smallest current working shape of the pipeline this repo is expected to own.

## Ingests

- source materials
- supplied parameters
- contextual instructions

These are the main categories of information the pipeline is expected to receive.

## Produces

- governed outputs
- review artifacts or intermediates where needed

The pipeline may produce both final outputs and bounded intermediate artifacts.

## Boundary

- external orchestration owns task framing, prompt packaging, and workflow control outside the repo
- repo-local pipeline logic owns the actual pipeline behavior, transformations, interfaces, and verification inside the repo

This boundary is intentional and should remain explicit.

## Execution Character

- deterministic behavior should remain the default where pipeline rules, transformations, and checks can be made explicit
- agent-assisted behavior may exist where interpretation or generation cannot yet be reduced to stable deterministic logic

This split is still provisional and should sharpen with actual pipeline requirements.

## Verification Points

- ingest validation
- transformation or stage checks
- output validation
- approval or release boundary

Verification should exist at each meaningful stage rather than only at the end.

The current shape is provisional and intended to sharpen before code.
