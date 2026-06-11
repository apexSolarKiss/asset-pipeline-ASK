# Worked Package Store — 2c Marketing Hero

This directory is a **worked package store**: the proven 2c "Spring Refresh" marketing-hero package held as data in a **file substrate**, outside Airtable shape. It is the second-substrate instantiation that converts the instantiation *plan* (in `docs/portable-package-extraction-2c-marketing-hero-v1.md`) into instantiation *evidence*.

It is **not a grammar, template, or schema.** It is one concrete package, held as data. The proof that the package is genuinely *held* (and not merely described) is the **recovery test** — see `_recovery-test.md`, which is evidence recorded *after* a fresh reader reconstructed the chain from these files.

## Files (the store)

| File | Holds |
|---|---|
| `package.yaml` | the packet: intent, the creative-discretion aperture grant, required outputs, products, and key-links |
| `brand-system.yaml` | the inherited "Warm Restraint" layer (what the packet references rather than owns) |
| `constraints.yaml` | the four bounded rules (what may not vary), brand-context-scoped → inherited |
| `references.yaml` | the two visual anchors (image-pending — records-with-notes, no bytes) |
| `slots.yaml` | the two output obligations: HERO (accepted) and SUPPORT (held / planned) |
| `candidates.yaml` | the variance: 7 candidates (6 pre-remediation, 1 post-remediation selected) |
| `governed-assets.yaml` | the governed asset; the selection link; selection + governance co-located |
| `_substrate.yaml` | this store's own storage mechanics (quarantined — not package content) |
| `_recovery-test.md` | evidence (recorded after the fact); a recovery test must **exclude** it, not read it |

## Recovering the chain

Read `package.yaml` first (intent + discretion aperture), follow `bounded_by` → `constraints.yaml` and `anchored_to` → `references.yaml`, then `slots.yaml` → `candidates.yaml` (the variance) → `governed-assets.yaml` (the selection and its governance). The chain is **creative intent → creative discretion → variance → selection → governance**.

A recovery test must read only the store data files above (plus this README as a map). It must **exclude** `_recovery-test.md` — that file is evidence from a prior test, not package content — and must **not** use `docs/portable-package-extraction-2c-marketing-hero-v1.md` (the human-facing prose walk of this package), any other repo doc, or Airtable. The point is recovery from the store alone.
