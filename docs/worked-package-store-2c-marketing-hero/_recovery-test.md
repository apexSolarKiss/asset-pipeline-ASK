# Recovery Test — 2c Worked Package Store

**Evidence, recorded after the fact. Not package content.** This file documents a fresh-reader recovery test run against the store on 2026-06-10. It is the proof that the package is genuinely *held* in this file substrate (recoverable on its own), not merely *described*.

**Protocol for future recovery tests:** a future test must read **only** the store's data files (`package.yaml`, `brand-system.yaml`, `constraints.yaml`, `references.yaml`, `slots.yaml`, `candidates.yaml`, `governed-assets.yaml`, `_substrate.yaml`, and `README.md` as a map). It must **exclude this file (`_recovery-test.md`)**, and must **not** use `docs/portable-package-extraction-2c-marketing-hero-v1.md`, any other repo doc, or Airtable. The whole point is recovery from the store alone.

## Setup

- **Reader:** a fresh general-purpose subagent with no session context.
- **Input boundary:** only the files in `docs/worked-package-store-2c-marketing-hero/`. Explicitly forbidden: the #319 prose walk (`portable-package-extraction-2c-marketing-hero-v1.md`), the package map, the extraction-v1 artifact, anything else under `docs/`, and Airtable.
- **Task:** reconstruct the definition-layer chain across 8 items (intent; discretion aperture + bounds; variance count + phase split; selection + pattern; governance + co-location; follow the selected-candidate→governed-asset link; follow one inherited-constraint link; identify held/absent/inherited status), plus assess substrate separation and whether the selection link is substrate-neutral.

## Recovered chain

The reader recovered the full chain unaided:

**creative intent → creative discretion → variance → selection → governance.**

`PKT-MSG-HG-001`, marketing / message-driven ("Spring Refresh"): the message is the anchor, products peripheral. Intent = a message-bearing composition with copy room and a warm daylit refresh feeling. The discretion aperture grants latitude over piece selection/arrangement, framing/crop, surface, and copy-overlay negative space — bounded by `BC-WR-PALETTE / -LIGHTING / -MATERIAL / -NEGATIVE`, anchored to `REF-WR-BRANDSYS-01 / -PALETTE-01`, owned by the marketing curator-of-record, closing at hero-slot curation. The aperture is filled at `SLOT-MSG-HG-001-HERO` (`SLOT-MSG-HG-001-SUPPORT` is planned/held). Variance = 7 candidates (6 pre-remediation, 1 post-remediation), with a single prompt-remediation pass between the phases. Selection = `CAND-MSG-HG-001-HERO-POST-01`, authorship-bearing, ranged across the full set. Governance = `ASSET-MSG-HG-001-HERO-001` (`governed_output`, in-base, no external import); selection and governance co-locate.

## Per-item results

All eight items **FULLY recoverable** from the store alone:

| # | Item | Status |
|---|---|---|
| 1 | Creative + business intent | FULL |
| 2 | Discretion aperture grant (latitude / bounds / owner / close) | FULL |
| 3 | Variance: 7 candidates, 6 pre + 1 post | FULL |
| 4 | Selection (POST-01; rationale; authorship-bearing) | FULL |
| 5 | Governance (asset; governed_output; co-location) | FULL |
| 6 | Selected-candidate → governed-asset link resolves in-store | FULL |
| 7 | Inherited-constraint link (BC-WR-PALETTE → definition + force) | FULL |
| 8 | Held / absent / inherited status all present | FULL |

**Substrate separation:** clean. `_substrate.yaml` holds the storage mechanics; Airtable identifiers appear only as labelled `legacy_*` provenance ("NEVER a link key"). **The selection link is substrate-neutral** — the governed asset points at the synthetic phase-explicit key `CAND-MSG-HG-001-HERO-POST-01`, not the Airtable attachment-id, and resolves entirely within the store.

## Gaps / observations

Disclosed limits, none of which broke the chain recovery:

- **No image bytes** (by design). Every reference and candidate is `byte_status: not_held` / `content_hash: null`, so the *visual* truth of the "most-true-to-intent" selection cannot be verified from the store — only the recorded textual rationale. Disclosed in `_substrate.yaml`.
- **Per-candidate rejection not individuated.** The 6 pre-remediation candidates are rejected as a block with aggregate failure modes (orthogonal bench / robe on hook / obstructed copy field); the store does not record why each individual PRE candidate failed.
- **`required_output_set` structured shape is held** (prose only) — as stated in the packet; the mode-specific structured form does not exist in the store.
- **Quarantined-id cross-link exists but is not load-bearing.** The selected candidate's `legacy_airtable_attachment_id` equals the asset's `airtable_source_attachment_id`, so a determined reader *could* cross-link via Airtable ids — but that path is never the load-bearing one; the substrate-neutral candidate key stands alone.
- **README forward-reference.** At test time the README pointed at this `_recovery-test.md` before it existed (the test is what produced it); the pointer resolves now that this file is present. The reader confirmed it did not need this file or the #319 walk to recover the chain.

## Verdict

**PASS.** The full intent → discretion → variance → selection → governance chain is recoverable from this store alone: every link resolves to a real in-store record via substrate-neutral business keys, held/absent/inherited statuses are explicit, and no external source was required. The only blemishes are the inherent byte-free visual-verification limit and the aggregate-only PRE-candidate rejection notes — both disclosed by the store itself.

This converts the #319 instantiation *plan* into instantiation *evidence*: the proven 2c package can be held in a second substrate (a file bundle) outside Airtable shape, and recovered from it. No second substrate beyond this one, no package grammar, no schema, no runtime consumer is thereby authorized.
