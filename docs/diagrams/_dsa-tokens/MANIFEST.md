# _dsa-tokens — local design-system-ASK mirror

Local, pinned mirror of design-system-ASK Tier 1 + Tier 2 foundations for the
diagram bundle in this directory. There is **no runtime fetch** from the
design-system-ASK repo and **no Google Fonts CDN dependency** — the diagram
renders entirely from these local files.

**Synced from:** `apexSolarKiss/design-system-ASK`
**Pinned commit:** `3ecc03e615c8862d72b364ded71572c6139b498e`
**Synced:** 2026-06-02

| File | Upstream source | Role |
|---|---|---|
| `colors_and_type.css` | `/colors_and_type.css` | Tier 1 + Tier 2 tokens + `@font-face` (light default · `[data-theme="dark"]` · `prefers-color-scheme` auto-bridge) |
| `fonts/InterVariable.woff2` | `/fonts/` | display family |
| `fonts/InterVariable-Italic.woff2` | `/fonts/` | display italic |
| `fonts/JetBrainsMono.woff2` | `/fonts/` | mono family |
| `fonts/JetBrainsMono-Italic.woff2` | `/fonts/` | mono italic |
| `fonts/Inter-OFL.txt`, `fonts/JetBrainsMono-OFL.txt` | `/fonts/` | SIL OFL license texts |

Re-sync this mirror (and bump the pin above + the diagram's `render-vN` stamp)
when the upstream tokens or fonts change.
