# _dsa-tokens — local design-system-ASK mirror

Local, pinned mirror of design-system-ASK Tier 1 + Tier 2 foundations for the
diagram bundle in this directory. There is **no runtime fetch** from the
design-system-ASK repo and **no Google Fonts CDN dependency** — the diagram
renders entirely from these local files.

**Synced from:** `apexSolarKiss/design-system-ASK`
**Pinned commit:** `b3b32a5ac82aa441b26e461a4e40c6334a93d7e6` (Spectral State v1.1 re-sync; `colors_and_type.css` byte-identical here — core tokens first synced at `1c565e2`)
**Synced:** 2026-06-05 (re-synced `spectral-state.css` to **v1.1** at `b3b32a5` — `proposed` moved off the health ramp to an orthogonal magenta category, with `structural` 90°→60° and `partial` 60°→30°; eight roles + names unchanged, recolor consumed by reference, no node-data change. `colors_and_type.css` byte-identical at `b3b32a5` — unchanged — and fonts unchanged. First synced 2026-06-04 from `e30c101`; shared by the architecture-tree, ontology-tree, inheritance-spine, and ia-state-spine diagrams; only the ia-state-spine loads `spectral-state.css`)

Per-file pins (sha256 over file contents):

| File | Upstream source | sha256 | Role |
|---|---|---|---|
| `colors_and_type.css` | `/colors_and_type.css` @ `b3b32a5` | `1aeed0fda84cef41a60789613e2a5195b0cae3c208cb047d592f27959bca973c` | Tier 1 + Tier 2 tokens + `@font-face` (light default · `[data-theme="dark"]` · `prefers-color-scheme` auto-bridge) — byte-identical to `e30c101` / `1c565e2` |
| `spectral-state.css` | `/spectral-state.css` @ `b3b32a5` | `36bbd48347944e746375caa791074bf9c04dd67d6b7bce1c46fe41ee03e9d432` | opt-in Spectral State **v1.1** — eight `--state-*` role tokens (`proposed` orthogonal magenta 300°; health ramp earned 120° / structural 60° / partial 30° / deflated 0°); load *after* `colors_and_type.css`; used only by the interactive IA state spine |
| `fonts/InterVariable.woff2` | `/fonts/` | — | display family |
| `fonts/InterVariable-Italic.woff2` | `/fonts/` | — | display italic |
| `fonts/JetBrainsMono.woff2` | `/fonts/` | — | mono family |
| `fonts/JetBrainsMono-Italic.woff2` | `/fonts/` | — | mono italic |
| `fonts/Inter-OFL.txt`, `fonts/JetBrainsMono-OFL.txt` | `/fonts/` | — | SIL OFL license texts |

Re-sync this mirror (bump the relevant pin + the consuming diagram's `render-vN` stamp,
and re-verify the per-file sha256) when the upstream tokens, the Spectral State module,
or the fonts change. The static scaffolds do not load `spectral-state.css`.
