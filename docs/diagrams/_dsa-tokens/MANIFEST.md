# _dsa-tokens — local design-system-ASK mirror

Local, pinned mirror of design-system-ASK Tier 1 + Tier 2 foundations for the
diagram bundle in this directory. There is **no runtime fetch** from the
design-system-ASK repo and **no Google Fonts CDN dependency** — the diagram
renders entirely from these local files.

**Synced from:** `apexSolarKiss/design-system-ASK`
**Pinned commit:** `1c565e2fc6d2a085f40db6046c985ec77ff9bb2d` (core tokens) · `e30c101cae4e9a09748937862714d8b848f24eb2` (ASK Spectral State, added)
**Synced:** 2026-06-04 (added the opt-in `spectral-state.css` module from `e30c101`, consumed by the interactive IA state spine; `colors_and_type.css` is byte-identical at `e30c101` and `1c565e2` — unchanged — and fonts are unchanged; shared by the architecture-tree, ontology-tree, inheritance-spine, and ia-state-spine diagrams)

Per-file pins (sha256 over file contents):

| File | Upstream source | sha256 | Role |
|---|---|---|---|
| `colors_and_type.css` | `/colors_and_type.css` @ `e30c101` | `1aeed0fda84cef41a60789613e2a5195b0cae3c208cb047d592f27959bca973c` | Tier 1 + Tier 2 tokens + `@font-face` (light default · `[data-theme="dark"]` · `prefers-color-scheme` auto-bridge) |
| `spectral-state.css` | `/spectral-state.css` @ `e30c101` | `9b6882f62b70f215e04a955451e855e88c44b9f29d59c1186e82ee2b96d613b5` | opt-in ASK Spectral State module — eight `--state-*` role tokens (load *after* `colors_and_type.css`); used only by the interactive IA state spine |
| `fonts/InterVariable.woff2` | `/fonts/` | — | display family |
| `fonts/InterVariable-Italic.woff2` | `/fonts/` | — | display italic |
| `fonts/JetBrainsMono.woff2` | `/fonts/` | — | mono family |
| `fonts/JetBrainsMono-Italic.woff2` | `/fonts/` | — | mono italic |
| `fonts/Inter-OFL.txt`, `fonts/JetBrainsMono-OFL.txt` | `/fonts/` | — | SIL OFL license texts |

Re-sync this mirror (bump the relevant pin + the consuming diagram's `render-vN` stamp,
and re-verify the per-file sha256) when the upstream tokens, the Spectral State module,
or the fonts change. The static scaffolds do not load `spectral-state.css`.
