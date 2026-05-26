# Diagrams // illustrative

These diagrams are illustrative. They are not source truth.

Repo prose remains authoritative. If a diagram and the repo prose disagree, trust the prose and refresh the diagram; do not modify the repo prose to match the diagram.

Each diagram is a structural snapshot of the repo at a point in time. Diagrams age. Repo prose ages too, but more slowly. The diagram should track the repo, not the other way around.

## Authority cadence

- repo prose: source truth — [`docs/architecture.md`](../architecture.md) is the current architecture front door
- diagram: illustrative snapshot, refreshed when a plateau milestone marker lands per the cadence in [`AGENTS.md`](../../AGENTS.md) §Refresh Cadences / Architecture Tree Diagram
- repo [`README.md`](../../README.md): canonical front-door entry point

## Inheritance

The diagram conforms to [`apexSolarKiss/design-system-ASK`](https://github.com/apexSolarKiss/design-system-ASK) Tier 1 + Tier 2 by reference at generation time. The compiled `diagrams.css` in this folder is render support, not identity source truth. `design-system-ASK` remains the visual authority; this folder does not own visual identity.

## Update cadence

- plateau milestone marker landing on main: refresh the source data file and re-render
- per-PR repo edits: do not refresh
- per-article work: do not refresh
- ecology-level structural shift: open a new `source-vN`

## Contents

```text
README.md                                       this file
asset-pipeline-ASK_architecture-tree.html       renders TREE_D04
asset-pipeline-ASK_architecture-tree.source.js  TREE_D04 data
diagrams-engine.js                              layout + pan/zoom engine
diagrams.css                                    compiled Tier 1 + Tier 2 style
export-png.js                                   3840×2880 PNG export
```

## How to use

- Open `asset-pipeline-ASK_architecture-tree.html` directly in a browser, or via GitHub Pages if configured.
- Drag to pan; scroll to zoom; HUD controls in the bottom-left; `⤢` to fit.
- Theme follows the OS preference (`prefers-color-scheme`); the CSS supports explicit `data-theme="light"` or `data-theme="dark"` on `<html>` if a specific theme is needed.
- The PNG export outputs a 3840×2880 image in the resolved theme.

## Lineage

This diagram is the first repo-native asset-pipeline-ASK architecture-tree absorption using the Class A diagram-bundle pattern proven across [`apexSolarKiss/control-surface/docs/diagrams/`](https://github.com/apexSolarKiss/control-surface/tree/main/docs/diagrams) (TREE_D01) and [`apexSolarKiss/method-ASK/docs/diagrams/`](https://github.com/apexSolarKiss/method-ASK/tree/main/docs/diagrams) (TREE_D02). It supersedes the prior self-contained HTML architecture-tree artifact (Claude-Design-generated, ~1.7 MB single file) at the same path.

The current bundle absorbs at `source-v2 // render-v9` to align with the other repo-native bundles. Future refreshes will bump the render version and may bump the source version if the tree data changes materially.

The operator-side ecology-ASK diagram package and historical render iterations remain in `asset-pipeline-ASK-EXTERNAL/scratch/` and are not repo truth.

## What this folder does not carry

- `TREE_D01` (control-surface architecture tree) — lives in [`apexSolarKiss/control-surface/docs/diagrams/`](https://github.com/apexSolarKiss/control-surface/tree/main/docs/diagrams)
- `TREE_D02` (method-ASK topology) — lives in [`apexSolarKiss/method-ASK/docs/diagrams/`](https://github.com/apexSolarKiss/method-ASK/tree/main/docs/diagrams)
- `TREE_D03` (ecology-ASK overall) — operator-side only; not authorized for any repo absorption
- Operator-side context payload (private; conform by reference, do not absorb)
- `design-system-ASK` Tier 3 instance identity (logo, wordmark, instance chrome) — excluded by Tier model
- Runtime dynamic import from `design-system-ASK` CSS (no; conform at generation time)
- Fast-aging state (PR numbers, commit hashes, current grounding-note version stamps, branch names, recent activity chronology)
