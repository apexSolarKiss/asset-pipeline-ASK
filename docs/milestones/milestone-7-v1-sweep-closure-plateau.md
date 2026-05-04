# Milestone 7 // V1 Sweep Closure Plateau

This note records the plateau where the v1 sweep closes structurally. All four worked-example modes are pressure-tested at appropriate depth — SKU-driven Furniture v1 operationalized; marketing, collection, and brand-campaign modes each probed at probe-depth against the SKU-driven schema in concrete scenarios. The split-execution operating model that the project began with has been retired in favor of a single-node operating model. The architecture has held under each pressure point in the sweep.

This milestone builds on milestone 6 (curation event first-class) by completing the cross-mode application sweep that milestone 6 named as the architecturally-relevant remaining direction.

## What This Milestone Established

**Workflow:**

- **Single-node operating model is canonical** (Claude Code as both control surface and executor; GPT optional advisor outside the execution thread).
- **Split-execution operating model retired** (historically referred to as Model A; ChatGPT prompt compiler / Codex executor / Claude Code advisor). Retained as legacy reference; `apexSolarKiss/mazeASK` is the only project still active on it.
- **Why-the-rules-exist framing**: the workflow rules in `AGENTS.md` are calibrated compensations for what single-node collapses relative to the legacy split-execution model. Plan-Before-Execute restores the prompt-compilation reasoning surface. Structured Change Summary surfaces disagreements that single-node otherwise hides. Single-Writer Discipline handles the parallel-thread pressure that single-node has more of. Exact-scoped-diff approval restores the diff-as-handoff inspection that the split provided structurally.

**Architecture:**

- Cross-mode application sweep at probe-depth across all three non-SKU modes: marketing / message-driven, collection / merchandising, brand campaign / editorial. Each probe pressured the SKU-driven schema against a concrete scenario drawn from public-reference-brand archetypes (described abstractly per the brand-name avoidance rule).
- **Architecture survives the mode shift without structural mutation across all three probes.** Six-layer model + curation seam + five-axis provenance + asset_attachment pattern carries cleanly. `curation_pattern` enum is mode-independent. Schema is category-agnostic and brand-archetype-agnostic.
- **The most consistent strain across all three non-SKU mode probes is Layer 2's composite fidelity-anchor representation.** Each non-SKU mode pressures it in a mode-specific shape: `messages` / `briefs` for marketing, `grouping_archetype` for collection, `campaign_concept` for campaign. Not authorized for schema mutation; surfaced as the highest-leverage place a future schema move could start if cross-mode application pressure ever forces one.
- **Mode-specific strain points** also recorded honestly: collection mode produced the sharpest single-strain case for plural slot-input fields (1:N slot-product cardinality); campaign mode surfaced that `products` becomes peripheral when the campaign concept itself is the fidelity anchor.
- **Implementation-vs-conceptual goal distinction is fully cross-mode** (sharpest in campaign mode, where the gap between technically-plausible imagery and conceptually-coherent campaign world is widest).
- **The full-flow Path A/B/C arc** completed inside the SKU-driven base, validating the end-to-end generation → curation → governance flow under coordinated fresh generation (Path A on existing packet, Path B on brand-new PKT-SKU-010, Path C as historical synthesis).

**Schema (SKU-driven Furniture v1 base):**

- Five-axis curation provenance complete on `generated_assets`: `capture_reason`, `captured_at`, `source_attachment_id`, `capture_notes`, `curation_pattern`.
- **`curator` field added**, closing the *by whom* axis as a first-class structured field rather than text shorthand.
- **`asset_attachment` field added** (multipleAttachments with attachment-copy writeback). Governed-asset rows now carry the asset itself, independent of any later mutation of the source slot. Resolves the milestone-5 thin-bridge limitation.

**Population (SKU-driven Furniture v1 base):**

- 13 of 15 governed-asset rows populated with `asset_attachment`. Of the 2 unpopulated: both PKT-SKU-007 rows whose source attachments are no longer present on `slot_generated_image_v1`. Documented honestly as the architectural cost of the thin-bridge limitation — text-reference-only assets are structurally lost when source attachments are later deleted.
- Five distinct `curation_pattern` values surfaced through real test work: `algorithmic-curation`, `agent-proposed-human-ratified`, `batch-output-no-curator-selection`, `agent-vision-proposed-human-ratified`, `human-cross-round-authorship-bearing-curation`.
- Curator field backfilled across all rows.

**External:**

- Four prior articles anchored in the repo as background reading for the architectural arc (*From Brand Rules to Creative Discretion*, *From Normative Structure to Execution*, *The Beautiful Picture is Not the…*, *The Creative Act of Selection*).
- New article *Lessons from the First Prototype Phase* covers the operating-model shift specifically — the sunset of Model A, the migration of structural friction into rules, and the 50x ceremony reduction that single-node operation produces. Adds to the public-facing thread of the work.

## What It Did Not Establish

- Operationalization of any non-SKU mode in Airtable. The three non-SKU mode probes are paper-only sketches; no Airtable base was stood up for marketing, collection, or campaign mode in this sweep.
- Composite-anchor schema mutation. The most consistent cross-mode strain across all three probes; surfaced but not earned by current operational pressure.
- Resolution of the May 3 generation warmth pattern flagged in earlier findings.
- Reopening of capture-mechanics work flagged from milestone 5.
- A unified composite-anchor entity design. The strain is named across three modes; the entity (or three mode-specific entities, or structured packet fields) is not designed.

## What Remains Out Of Scope

- Reopening any closed chain artifact.
- Production-readiness for any mode.
- Final layer ontology, taxonomy settlement, or closed worked-example-mode taxonomy.
- Architecture rewrite.
- Migration of `mazeASK` to single-node (separate operational decision if and when ASK returns to that project).

## Next Pressure Points

The v1 sweep is structurally closed. The next direction is a discrete choice between three architecturally-relevant options:

1. **Operationalize one of the probed modes in Airtable.** Collection mode produced the sharpest single-strain case (1:N slot-product cardinality genuinely strains the singular product reference field). Campaign mode produced the most synthesis-rich finding (`products` becomes peripheral when the campaign concept is the fidelity anchor). Operationalization would test whether the strain points become operational blockers or remain content-discipline matters.
2. **Open the composite-anchor schema mutation.** Most consistent cross-mode strain across all three probes. Not yet earned by operational load — would be designing-ahead-of-pressure. Could be opened on the existing SKU-driven base or deferred until a non-SKU mode is operationalized.
3. **Generation tuning** (May 3 warmth pattern). Smaller-scoped item still open from earlier findings; tractable while the larger directional question is being weighed.

The choice between (1), (2), and (3) is for ASK's directional input.

## Anchor Documents

- [`AGENTS.md`](../../AGENTS.md): single-node operating model + agent-agnostic workflow rules
- [`docs/cross-mode-probe-marketing-message-driven-v1.md`](../cross-mode-probe-marketing-message-driven-v1.md): first cross-mode probe
- [`docs/cross-mode-probe-collection-merchandising-v1.md`](../cross-mode-probe-collection-merchandising-v1.md): second cross-mode probe
- [`docs/cross-mode-probe-brand-campaign-editorial-v1.md`](../cross-mode-probe-brand-campaign-editorial-v1.md): third cross-mode probe (closes sweep at probe-depth)
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](../full-flow-path-a-findings-pkt-sku-009.md): Path A (coordinated fresh-gen on existing packet) — implementation-vs-conceptual goal distinction
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](../full-flow-path-b-findings-pkt-sku-010.md): Path B (coordinated fresh-gen on brand-new packet) — asset_attachment field
- [`docs/asset-attachment-backfill-findings-sku-driven-furniture-v1.md`](../asset-attachment-backfill-findings-sku-driven-furniture-v1.md): asset_attachment backfill + thin-bridge architectural cost finding
- [`docs/curator-field-and-backfill-sku-driven-furniture-v1.md`](../curator-field-and-backfill-sku-driven-furniture-v1.md): curator first-class field
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](../cross-mode-layered-input-model-and-curation-event-note.md): on-paper layered-input model that the cross-mode probes concretized
- [`docs/milestones/milestone-6-curation-event-first-class-plateau.md`](milestone-6-curation-event-first-class-plateau.md): prior plateau (curation event first-class)
- [`docs/milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md`](milestone-5-sku-driven-furniture-v1-prototype-plateau.md): plateau where the thin-bridge limitation was first named
