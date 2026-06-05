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
_dsa-tokens/                                    pinned design-system-ASK Tier 1 + Tier 2 mirror (no CDN)

# Horizontal — Class A diagram-tree (top-aligned cascade)
asset-pipeline-ASK_architecture-tree.html       renders TREE_D04 (repo architecture / artifact structure)
asset-pipeline-ASK_architecture-tree.source.js  TREE_D04 data
asset-pipeline-ASK_ontology-tree.html           renders TREE_ONTOLOGY (Axis A — information kinds)
asset-pipeline-ASK_ontology-tree.source.js      TREE_ONTOLOGY data
diagrams-engine.js                              horizontal (top-aligned cascade) layout engine

# Vertical — Class A diagram-spine-static (centered spine)
asset-pipeline-ASK_inheritance-spine.html       renders TREE_INHERITANCE (Axis B — inheritance ladder)
asset-pipeline-ASK_inheritance-spine.source.js  TREE_INHERITANCE data
diagrams-spine-engine.js                        vertical (centered spine) layout engine

# Shared scaffold files — byte-identical across both patterns; one copy
diagrams.css                                    compiled Tier 1 + Tier 2 style
export-png.js                                   3840×2880 PNG export

interactive/                                     AP-owned interactive surface (different artifact class)
  asset-pipeline-ASK_ia-state-spine.html         the IA state spine
  asset-pipeline-ASK_ia-state-spine.data.js      node→state data (AP authorship)
  ia-state-spine-engine.js                       AP-built layout + interaction engine (vanilla JS + SVG)
  ia-state-spine.css                             AP-owned interactive styling
```

This folder hosts two **Class A** static diagram patterns inherited by reference from `design-system-ASK`: `diagram-tree` (horizontal cascade) and `diagram-spine-static` (vertical centered spine; engine `diagrams-spine-engine.js`, delivered at merge `1c565e2`). `diagrams.css` and `export-png.js` are **byte-identical** across the two patterns, so this folder keeps **one shared copy** rather than vendoring each — a deliberate, documented choice. The two layout engines (`diagrams-engine.js` / `diagrams-spine-engine.js`) are scaffold-owned and not edited locally.

The diagrams depict **different axes** of the architecture and must not be collapsed into one picture (basis: [`docs/layer-disambiguation-note-v1.md`](../layer-disambiguation-note-v1.md)):

- **architecture tree** (horizontal) — repo architecture / artifact structure / plateau state.
- **ontology tree** (horizontal) — Axis A: the kinds of information the definition layer structures (a branching classification → horizontal cascade).
- **inheritance spine** (vertical) — Axis B: where information lives and how it inherits / overrides / combines (a linear chain → centered spine).

The two IA diagrams (ontology, inheritance) are **structural** maps — they assert **no** maturity state (no earned/held/legacy); their legends are repurposed as reading notes, and architectural nuance rides in the node notes. Maturity-state semantics belong to the separate interactive surface below.

## Interactive surface — IA state spine

`interactive/asset-pipeline-ASK_ia-state-spine.html` is the **state** view the static structural diagrams deliberately omit: architectural surfaces, seams, and open carrier-shape questions colored by their **current state**, with the four workflow modes as orthogonal axes that selection isolates. Hover previews, click commits a selection (dimming all but the intersecting axes), and the inspector shows the state's evidence, qualifiers, mode coverage, and the authoritative repo pointer.

- **Different artifact class.** It is an AP-owned interactive surface, not a Class A static scaffold — its own vanilla-JS/SVG layout + interaction engine (`ia-state-spine-engine.js`) and styling (`ia-state-spine.css`). It does **not** use `diagrams.css` / the static engines / `export-png.js`.
- **Color via ASK Spectral State, by reference.** Node color comes from the design-system-ASK `--state-*` role tokens (`_dsa-tokens/spectral-state.css`, opt-in module pinned at `e30c101`). AP consumes by reference and does not mint or edit the palette.
- **Color encodes state only.** Evidence depth, risk, mode coverage, and repo pointers are inspector metadata — never hue. One state per node.
- **Illustrative, not source truth.** The node→state data (`…ia-state-spine.data.js`) is AP authorship over the architecture's current state; `docs/architecture.md` remains authoritative.

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
