# _dsa-tokens — local design-system-ASK mirror

Local, pinned mirror of design-system-ASK Tier 1 + Tier 2 foundations for the
diagram bundle in this directory. There is **no runtime fetch** from the
design-system-ASK repo and **no Google Fonts CDN dependency** — the diagram
renders entirely from these local files.

**Synced from:** `apexSolarKiss/design-system-ASK`
**Pinned commit:** per-file (see table). `colors_and_type.css` re-synced to `b5d158e6b2a74faf7dae92e3d15a6ee0a3baba59` (2026-06-26, DS #52 light-mode foreground conformance); `spectral-state.css` + fonts remain at `b3b32a5` (Spectral State v1.1; core tokens first synced at `1c565e2`).
**Synced:** 2026-06-05 (re-synced `spectral-state.css` to **v1.1** at `b3b32a5` — `proposed` moved off the health ramp to an orthogonal magenta category, with `structural` 90°→60° and `partial` 60°→30°; eight roles + names unchanged, recolor consumed by reference, no node-data change. `colors_and_type.css` byte-identical at `b3b32a5` — unchanged — and fonts unchanged. First synced 2026-06-04 from `e30c101`; shared by the architecture-tree, ontology-tree, inheritance-spine, and ia-state-spine diagrams; only the ia-state-spine loads `spectral-state.css`)
**Re-synced:** 2026-06-26 — re-vendored `colors_and_type.css` at `b5d158e` (DS #52/#53 foreground conformance): `--fg-1` now references `--ask-fg-light` (`#6A637F`, unchanged value); `--ask-white` is wordmark-only (not body text); `--fg-high-contrast` (`#201D26`) added as a reserved opt-in backup reached by no default surface. **Render-neutral for AP** — the diagram text role `--fg-1` still resolves `#6A637F` in light and the lavender ramp in dark; light + dark sanity-rendered. The sibling `diagrams.css` (one level up) was re-vendored in the same pass at `b5d158e` (#53: diagram text roles `--diagram-ink/-muted/-faint` now alias `--fg-1/-2/-3` rather than hardcode them). Diagram `render-vN` stamps **held** (render-neutral, no re-export); frozen reviewed rasters not regenerated.

Per-file pins (sha256 over file contents):

| File | Upstream source | sha256 | Role |
|---|---|---|---|
| `colors_and_type.css` | `/colors_and_type.css` @ `b5d158e` | `d3a94ac725e76ac8fdd290797ac1288799cf6f5c02e51f269c3cb666be4cb4fa` | Tier 1 + Tier 2 tokens + `@font-face` (light default · `[data-theme="dark"]` · `prefers-color-scheme` auto-bridge); **DS #52 foreground conformance** — `--fg-1` → `--ask-fg-light` (`#6A637F`), `--ask-white` = wordmark only, `--fg-high-contrast` (`#201D26`) reserved opt-in |
| `spectral-state.css` | `/spectral-state.css` @ `b3b32a5` | `36bbd48347944e746375caa791074bf9c04dd67d6b7bce1c46fe41ee03e9d432` | opt-in Spectral State **v1.1** — eight `--state-*` role tokens (`proposed` orthogonal magenta 300°; health ramp earned 120° / structural 60° / partial 30° / deflated 0°); load *after* `colors_and_type.css`; used only by the interactive IA state spine |
| `fonts/InterVariable.woff2` | `/fonts/` | — | display family |
| `fonts/InterVariable-Italic.woff2` | `/fonts/` | — | display italic |
| `fonts/JetBrainsMono.woff2` | `/fonts/` | — | mono family |
| `fonts/JetBrainsMono-Italic.woff2` | `/fonts/` | — | mono italic |
| `fonts/Inter-OFL.txt`, `fonts/JetBrainsMono-OFL.txt` | `/fonts/` | — | SIL OFL license texts |

Re-sync this mirror (bump the relevant pin + the consuming diagram's `render-vN` stamp,
and re-verify the per-file sha256) when the upstream tokens, the Spectral State module,
or the fonts change. The static scaffolds do not load `spectral-state.css`.
