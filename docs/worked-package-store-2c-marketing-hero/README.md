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

## Lifecycle states across files

These files are not all the same *kind* of content — they sit in three lifecycle states. The mapping is **across** files, not one-state-per-file: `slots.yaml` in particular is a mixed-state carrier. Telling the states apart is how a reader knows what is a forward-looking definition, what is a record of a run that already happened, and what is a closed governed output:

| Lifecycle state | Where it lives |
|---|---|
| **Prospective definition** (what would drive a run) | `package.yaml`, `brand-system.yaml`, `constraints.yaml`, `references.yaml`; and in `slots.yaml` the slot *definitions*, the `slot_prompt`, and the *intended* generation configuration (the slot's `generation` block). The held `SUPPORT` slot rests here — a still-prospective obligation, not yet run. |
| **Execution / run state** (a run's log, not an instruction) | `candidates.yaml` — the 7-candidate accumulation and the *actual* per-candidate invocation settings (the per-candidate `generation` blocks); and the `prompt_remediation` event in `slots.yaml`. |
| **Governed record** (the closed run) | `governed-assets.yaml`; and in `slots.yaml` the `HERO` slot's `status: accepted` and the selected-candidate linkage. (Selection is the transition into this state, not a state of its own.) |

Intended generation configuration (on the slot) and the actual per-candidate invocation settings (in `candidates.yaml`) occupy different lifecycle roles even though their values coincide here.

The states become conceptually legible when read as separate definition and run/governance axes, but the current store does not encode that partition explicitly. In this worked example, `packet_status: draft` is read as the prospective definition's editorial state, not as a roll-up of slot execution or governance state. This is an interpretive rule, not a typed relationship in the current data. Full partition and rule: [`../package-lifecycle-partition-v1.md`](../package-lifecycle-partition-v1.md).

## Recovering the chain

Read `package.yaml` first (intent + discretion aperture), follow `bounded_by` → `constraints.yaml` and `anchored_to` → `references.yaml`, then `slots.yaml` → `candidates.yaml` (the variance) → `governed-assets.yaml` (the selection and its governance). The chain is **creative intent → creative discretion → variance → selection → governance**.

A recovery test must read only the store data files above (plus this README as a map). It must **exclude** `_recovery-test.md` — that file is evidence from a prior test, not package content — and must **not** use `docs/portable-package-extraction-2c-marketing-hero-v1.md` (the human-facing prose walk of this package), any other repo doc, or Airtable. The point is recovery from the store alone.
