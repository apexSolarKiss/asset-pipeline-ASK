# Workflow Mode Comparison

This note compares the current abstract campaign and SKU workflow examples to identify what now appears universal, what appears workflow-stream-variable, and what remains unresolved.

## What Held Constant

- Across both examples, the top-level universal schema held cleanly:
  - `intent`
  - `inputs`
  - `constraints`
  - `orchestration`
  - `outputs`
  - `governance`
- The current second-level directions also held across both examples:
  - `inputs -> source materials, supplied parameters, contextual instructions`
  - `constraints -> hard requirements, bounded discretion, exclusion rules`
  - `governance -> validation, approval, override`

This is the strongest confirmation so far that these categories belong in the universal layer rather than being artifacts of one workflow mode.

## What Varied By Workflow Mode

- `Campaign mode`
  - more expressive latitude
  - more weight on contextual instructions
  - more exploratory orchestration
  - more judgment-heavy governance

- `SKU mode`
  - more parameterization
  - tighter constraints
  - more repeatable orchestration
  - more validation-heavy governance

What changed was mostly not structure, but weighting, tightness, and mode of use.

## Remaining Ontology Tensions

- `inputs vs constraints`
- `governance vs orchestration`
- `outputs`
- `intent tension-resolution`

These remain open questions, but are now more sharply defined.

This comparison informs future workflow-stream modeling without changing the universal schema yet.
