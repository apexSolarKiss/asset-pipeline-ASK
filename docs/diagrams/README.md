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

# Horizontal — Class A diagram-static-H (top-aligned cascade)
asset-pipeline-ASK_architecture-tree.html       renders TREE_D04 (repo architecture / artifact structure)
asset-pipeline-ASK_architecture-tree.source.js  TREE_D04 data
asset-pipeline-ASK_ontology-tree.html           renders TREE_ONTOLOGY (Axis A — information kinds)
asset-pipeline-ASK_ontology-tree.source.js      TREE_ONTOLOGY data
diagrams-static-H-engine.js                     horizontal (top-aligned cascade) layout engine

# Vertical — Class A diagram-static-V (centered spine)
asset-pipeline-ASK_inheritance-spine.html       renders TREE_INHERITANCE (Axis B — inheritance ladder)
asset-pipeline-ASK_inheritance-spine.source.js  TREE_INHERITANCE data
diagrams-static-V-engine.js                     vertical (centered spine) layout engine

# Sequence — Class A diagram-static-SEQ (left-aligned, arrowed) — illustrative doctrine diagram
asset-pipeline-ASK_discretion-chain.html        renders SPINE_DISCRETION_CHAIN (the creative-discretion chain)
asset-pipeline-ASK_discretion-chain.source.js   SPINE_DISCRETION_CHAIN data
asset-pipeline-ASK_discretion-chain.png         committed clean render via the exporter's PNG diagram export (chrome-free, dark) — embedded in docs/creative-discretion-doctrine-v1.md
diagrams-static-SEQ-engine.js                   sequence (left-aligned, arrowed) layout engine

# Convergence flow — Class A diagram-static-FLOW — illustrative VPA diagram
asset-pipeline-ASK_visual-payload-architecture.html              full-chrome diagram HTML (header/legend/HUD/caption + #flowPanel; FLOW_MODE='interactive'; PNG page + PNG diagram exports)
asset-pipeline-ASK_visual-payload-architecture.source.js         FLOW_DIAGRAM data (carrier/field/converge/spine/evalEdges/futureCarrier; AP-owned)
asset-pipeline-ASK_visual-payload-architecture.png               committed clean render via the PNG diagram export (chrome-free, dark gradient field) — embedded in docs/visual-payload-architecture-v2.md
diagrams-static-FLOW-engine.js                  convergence-flow layout engine (two modes; pan/zoom)

# Shared scaffold files — byte-identical across all FOUR static patterns; one copy
diagrams.css                                    compiled Tier 1 + Tier 2 style (incl. .edge-arrowhead, FLOW classes, --diagram-* dark-ink lines)
export-png.js                                   dual PNG export — "PNG page" (chromed 3840×2880) + "PNG diagram" (canvas-only, no chrome, natural aspect, on the gradient field); re-vendored from design-system-ASK @ 559d492 (dual export #50/#51; font-embed raster fix #60; native file:// export via the _dsa-tokens/fonts-embedded.js carrier #62; PNG-page legend nowrap-fidelity + empty-column collapse #63)

interactive/                                     AP-owned interactive surface (different artifact class)
  asset-pipeline-ASK_ia-state-spine.html         the IA state spine
  asset-pipeline-ASK_ia-state-spine.data.js      node→state data (AP authorship)
  ia-state-spine-engine.js                       AP-built layout + interaction engine (vanilla JS + SVG)
  ia-state-spine.css                             AP-owned interactive styling
```

This folder hosts four **Class A** static diagram patterns inherited by reference from `design-system-ASK`: `diagram-static-H` (horizontal cascade), `diagram-static-V` (vertical centered spine; delivered at merge `1c565e2`), `diagram-static-SEQ` (left-aligned arrowed sequence; graduated upstream at `28aeb2d`, re-vendored here, SEQ engine later re-vendored @ `92a7f70` for DS #64 configurable `secondaryEdges` + #66 span-aware gutter — used by the discretion-chain's dashed 2→4 edge), and `diagram-static-FLOW` (convergence flow with two render modes; graduated upstream from AP, re-vendored here, currently pinned at `98d6074`). `diagrams.css` and `export-png.js` are **byte-identical** across all four patterns, so this folder keeps **one shared copy** rather than vendoring each — a deliberate, documented choice. (`diagrams.css` re-vendored at **`b5d158e`** — DS #53, render-neutral: the diagram text roles `--diagram-ink/-muted/-faint` now **alias** the foundation `--fg-1/-2/-3` ramp instead of hardcoding `#6A637F`/`#827399`/faint, so a foundation foreground change propagates here automatically; structural line tokens stay diagram-local. Layout engines stay at `98d6074`; `export-png.js` stays at `957a025` (later re-vendored to `9b05d9a` for the DS #60 font-embed fix — see below). Pairs with the `_dsa-tokens/colors_and_type.css` #52 re-sync at `b5d158e`; light + dark sanity-rendered, render-vN stamps held.) (FLOW first vendored at `c87aa0d`, then re-synced to `98d6074` for two DS chrome corrections: light-mode strokes are **white** — the `c87aa0d` dark-ink change was reverted, so light mode matches the other patterns again — and the FLOW engine's junction dots were removed. `export-png.js` keeps the centered/negative-origin + landscape corrections from `c87aa0d`. Light-mode strokes white across all four patterns; dark mode and diagram text unchanged.) The shared `export-png.js` (static) and the interactive-spine `export-png.js` were **re-vendored from design-system-ASK @ `957a025`** (DS PR #50/#51) to add a second export: every diagram HUD now offers **PNG page** (the existing chromed 3840×2880 export, byte-stable) and **PNG diagram** (canvas-only, no chrome, natural aspect, on the gradient field). The diagram export is **additive** — it revises no existing committed raster. This retires the prior chrome-free-shell + headless two-build route for clean PNGs at the scaffold level; AP's own consumer normalization (regenerating the committed embedded PNGs via PNG diagram, collapsing the VPA two-build) is a separate, later AP-scoped pass. Both `export-png.js` copies were subsequently **re-vendored from design-system-ASK @ `9b05d9a`** (DS #60): the raster exporter now inlines the page's own `@font-face` woff2 as base64 inside the exported SVG, so the SVG-as-image raster resolves the real diagram fonts instead of a wider system fallback — fixing right-edge text clipping on machines where the diagram fonts are not system-installed. The committed `asset-pipeline-ASK_discretion-chain.png` (previously clipped) and `asset-pipeline-ASK_visual-payload-architecture.png` (previously rendered with fallback glyphs) rasters were regenerated with the fixed exporter — embedded JetBrains Mono + Inter, unchanged dimensions (2614×1826 / 3376×2966), dark PNG diagram export. Then **re-vendored @ `44c6074`** (DS #62, native `file://` export): a checked-in no-fetch font carrier (`_dsa-tokens/fonts-embedded.js`, loaded before `export-png.js` in every diagram HTML) lets a double-clicked `file://` page export correct PNGs offline; the exporter prefers the carrier, falls back to the http woff2 fetch, and fails closed if neither fully embeds. The successful http export output is unchanged, so the committed rasters stay correct — **no re-render**. Then **re-vendored @ `559d492`** (DS #63, PNG-*page* legend fidelity — resolves AP's own routed request): the page exporter now honors a legend row's live `white-space` — reading the computed style off the `.sub` and skipping the fixed `SUB_BUDGET` re-wrap for genuinely non-wrapping rows (`nowrap`/`pre`) — and collapses empty swatch/label columns when the whole legend lacks them. So the discretion-chain's simplified one-line ROLES row (PR #372: a single `.sub`, `white-space:nowrap`, no swatch/label) now exports on **one line, flush at the panel padding**, instead of wrapping at `SUB_BUDGET` behind a ~108px phantom swatch gap. This changes only the **PNG page** export chrome; the committed chrome-free **PNG diagram** rasters carry no legend and are **unaffected — no re-render** (the committed `asset-pipeline-ASK_discretion-chain.png` / `…_visual-payload-architecture.png` are PNG-*diagram* exports). Swatch/label legends (architecture-tree, ontology-tree, inheritance-spine, VPA) keep their columns and stay byte-identical. The interactive-spine exporter is a separate file and was **not** touched by #63. The four layout engines (`diagrams-static-H-engine.js` / `-V-` / `-SEQ-` / `-FLOW-`) are scaffold-owned and not edited locally; they are re-vendored by reference, never forked.

The **architecture diagrams** depict **different axes** of the architecture and must not be collapsed into one picture (basis: [`docs/layer-disambiguation-note-v1.md`](../layer-disambiguation-note-v1.md)):

- **architecture tree** (horizontal) — repo architecture / artifact structure / plateau state.
- **ontology tree** (horizontal) — Axis A: the kinds of information the definition layer structures (a branching classification → horizontal cascade).
- **inheritance spine** (vertical) — Axis B: where information lives and how it inherits / overrides / combines (a linear chain → centered spine).

The two IA diagrams (ontology, inheritance) are **structural** maps — they assert **no** maturity state (no earned/held/legacy); their legends are repurposed as reading notes, and architectural nuance rides in the node notes. Maturity-state semantics belong to the separate interactive surface below.

The **discretion chain** (`diagram-static-SEQ`) is a **different class** — an illustrative **doctrine** diagram, not an architecture-axis diagram. It renders the chain the architecture preserves (creative intent → creative discretion → variance → selection → governance; basis: [`docs/creative-discretion-doctrine-v1.md`](../creative-discretion-doctrine-v1.md)), as an ordered sequence of steps joined by arrows. Because it depicts doctrine rather than repo/architecture state, it refreshes when the **doctrine chain** changes, not on the milestone-/structure-coupled cadence of the architecture diagrams. A committed PNG (`asset-pipeline-ASK_discretion-chain.png`) is kept alongside the HTML for direct markdown/GitHub embedding — a deliberate exception to the otherwise HTML-only convention here. The HTML + source data remain **canonical**; the PNG is a supplemental presentation raster, not source truth. Provenance, stated plainly: this PNG is the chrome-free **dark** render produced by the exporter's **PNG diagram** export (canvas-only, natural aspect). The HTML keeps full chrome and both export controls. **DS #64 + #66 secondary edge:** the diagram carries a dashed skip edge from `2 · creative discretion` → `4 · selection` (muted / gutter-routed, via `secondaryEdges` in the source data) — the doctrinal *"exercised at selection"* relation, made visible without disturbing the five-link chain. DS #66 makes the gutter **span-aware**, so the riser routes **between box 4 and box 5** (clearing only the boxes the edge spans, not the globally widest box, node 5). Because the edge is diagram content (unlike the ROLES-panel chrome cleanup), the committed raster was regenerated (2614×1826; `source-v6 // render-v6`). To refresh it, open the HTML directly from the clone via `file://` or serve the folder over http, then use the **PNG diagram** button (or the `?export=png-diagram` route). (Both `file://` and http export correct fonts — see *How to use*.)

The **visual payload architecture** (`diagram-static-FLOW`) is a third class again — an illustrative **architecture companion** diagram of the *convergence flow* a commercial image's visual decisions move through: a reference carrier qualifying a normative-source field, the field converging into a resolved slot specification, realization (candidate image ‖ set relations) reconverging into conformance, then selection → governance → governed asset, with a return loop where a governed output can later re-enter as a reference carrier (basis: [`docs/visual-payload-architecture-v2.md`](../visual-payload-architecture-v2.md)). It is the first consumer of the `diagram-static-FLOW` scaffold AP graduated upstream and re-vendored here (pinned `98d6074`). **One full-chrome diagram HTML** (`…_visual-payload-architecture.html`): the repo-native explanatory artifact — header / legend / HUD / caption plus a hover/click side panel carrying each node's definition / example / "not-this" note, and both `PNG page` / `PNG diagram` export controls. (The earlier chrome-free static export shell + separate `.interactive.html` build is retired now that the shared exporter emits a clean `PNG diagram` directly.) A committed PNG (`asset-pipeline-ASK_visual-payload-architecture.png`, the chrome-free **dark** render via the `PNG diagram` export) is kept alongside for direct markdown/GitHub embedding (same deliberate exception as the discretion chain); it is embedded in [`docs/visual-payload-architecture-v2.md`](../visual-payload-architecture-v2.md). Both `-light` and `-dark` render off the same source model; the repo embeds the **dark** render per the theme-by-embedding-surface convention (below). The HTML + source data remain **canonical**; the PNG is a supplemental raster. Because it is coupled to the VPA topology (`docs/visual-payload-architecture-v2.md`) rather than to plateau / repo-architecture state, it refreshes when that topology changes, not on the milestone cadence. To refresh the PNG, open the HTML directly from the clone via `file://` or serve the folder over http, then use the **PNG diagram** button (or the `?export=png-diagram` route). (Both `file://` and http export correct fonts — see *How to use*.)

## Theme by embedding surface (adopted convention)

AP adopts the design-system-ASK **theme-by-embedding-surface** convention (canonical in `design-system-ASK`, pinned `7921b79`). Every FLOW/diagram package generates and retains **both** theme exports (`-light` and `-dark`); the convention selects which is *embedded*, not which exists:

- **Repository documentation + operator-system diagrams → dark** (the AP repo default; the committed `…_visual-payload-architecture.png` is the dark render).
- **Published long-form editorial → light.**
- A stated local exception may override the default for a specific figure.

Worked example: the Visual Payload Architecture FLOW diagram — the AP repo embeds the **dark** render; the *Image Is Not One Thing* editorial essay uses the **light** render. Same diagram, same source model, surface-appropriate theme; both exports retained.

## Interactive surface — IA state spine

`interactive/asset-pipeline-ASK_ia-state-spine.html` is the **state** view the static structural diagrams deliberately omit: architectural surfaces, seams, and open carrier-shape questions colored by their **current state**, with the four workflow modes as orthogonal axes that selection isolates. Hover previews, click commits a selection (dimming all but the intersecting axes), and the inspector shows the state's evidence, qualifiers, mode coverage, and the authoritative repo pointer.

- **Different artifact class.** It is an AP-owned interactive surface, not a Class A static scaffold — its own vanilla-JS/SVG layout + interaction engine (`ia-state-spine-engine.js`) and styling (`ia-state-spine.css`). It does **not** use `diagrams.css` / the static engines / `export-png.js`.
- **Color via ASK Spectral State, by reference.** Node color comes from the design-system-ASK `--state-*` role tokens (`_dsa-tokens/spectral-state.css`, opt-in module pinned at `1231d03`; `_dsa-tokens/MANIFEST.md` owns the canonical per-file pin + sha). AP consumes by reference and does not mint or edit the palette.
- **Color encodes state only.** Evidence depth, risk, mode coverage, and repo pointers are inspector metadata — never hue. One state per node.
- **Illustrative, not source truth.** The node→state data (`…ia-state-spine.data.js`) is AP authorship over the architecture's current state; `docs/architecture.md` remains authoritative.

## How to use

- Open `asset-pipeline-ASK_architecture-tree.html` directly in a browser, or via GitHub Pages if configured.
- Drag to pan; scroll to zoom; HUD controls in the bottom-left; `⤢` to fit.
- Theme follows the OS preference (`prefers-color-scheme`); the CSS supports explicit `data-theme="light"` or `data-theme="dark"` on `<html>` if a specific theme is needed.
- The HUD carries two PNG exports in the resolved theme: **PNG page** (chromed 3840×2880, the existing page export) and **PNG diagram** (canvas-only — no header / HUD / legend / caption / ticks — on the gradient field, at the diagram's natural aspect; filename `<slug>-diagram-<theme>.png`). Routes `?export=png` and `?export=png-diagram`.
- **PNG export works from both `file://` and http.** The exporter embeds the diagram fonts from a checked-in no-fetch carrier (`_dsa-tokens/fonts-embedded.js`, loaded before `export-png.js` in every diagram HTML), so a **double-clicked `file://` page exports correct PNGs offline — no server**. Over http it can also fetch the local woff2. It **fails closed** — blocks the export with a warning — if neither path fully embeds, so it can never silently emit a fallback-font (clipped) PNG. If you ever see that warning, keep `_dsa-tokens/fonts-embedded.js` next to the diagram, or serve over http:

  ```sh
  cd docs/diagrams && python3 -m http.server 8432
  ```

  then open `http://127.0.0.1:8432/<diagram>.html` (e.g. `asset-pipeline-ASK_discretion-chain.html`) and export.

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
