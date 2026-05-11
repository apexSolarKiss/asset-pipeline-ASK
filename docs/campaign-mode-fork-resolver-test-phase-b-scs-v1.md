# Campaign-mode fork-resolver test — Phase B structured change summary v1

## 1. Header / Posture

Phase B structured change summary; packet, base, scope, no schema mutation.

- **Packet:** `PKT-CAMP-004-KITCHEN_PREP`
- **Base:** Campaign-Driven D2C Home-Goods v1 (`appCAcRuA82SWj5h5`)
- **Scope:** packet, slot, product, and packet-atmosphere reference records created against the existing schema; no field additions, no rollup changes, no enum changes
- **Companion artifact:** Phase A pre-registration at [`docs/campaign-mode-fork-resolver-test-setup-v1.md`](campaign-mode-fork-resolver-test-setup-v1.md)

Phase B is treated as complete only after ASK uploaded the four images and lookup verification was re-run successfully.

## 2. Phase B mutation summary

Phase B created the carrier records for the fork-resolver test in the campaign-mode prototype base. The records sit on the existing schema established for Campaign-Driven D2C Home-Goods v1; nothing in this phase modified table definitions, fields, or rollup behavior.

The packet-atmosphere reference is the only new reference record introduced — a packet-scoped `approved_directional_reference` row, distinct from the brand-system-scoped references already present in the base. It is a reference role used as expected; no new field was needed to carry it.

## 3. Record inventory

**Products (3):**

| sku_key | record_id | product_image |
|---|---|---|
| `SKU-CAMP-CUTTINGBOARD-001` | `recFp4WfnnlvkjL5P` | `SKU-CAMP-CUTTINGBOARD-001.jpg` |
| `SKU-CAMP-PREPBOWL-001` | `recCfok6LfeQYe26B` | `SKU-CAMP-PREPBOWL-001.jpg` |
| `SKU-CAMP-KITCHENTOWEL-001` | `recnY581e14YouQGo` | `SKU-CAMP-KITCHENTOWEL-001.jpg` |

**Packet-atmosphere reference (1):**

| reference_key | record_id | reference_role | reference_image |
|---|---|---|---|
| `REF-CAMP-004-KITCHEN_PREP-ATMOSPHERE-001` | `rec67d6sLZwX7zqep` | `approved_directional_reference` | `REF-CAMP-004-KITCHEN_PREP-ATMOSPHERE-001.jpg` |

**Packet (1):**

| packet_key | record_id |
|---|---|
| `PKT-CAMP-004-KITCHEN_PREP` | `recrqWoGXKEVtnh4I` |

The packet record carries `business_intent`, `creative_intent`, `bounded_creative_discretion`, `required_output_set`, three product links, six reference links (five brand-system + one packet-atmosphere), and a `prompt_composition_notes` ledger of eight protocol entries recording packet-level moments of discretion.

**Output slots (3):**

| output_slot_key | record_id |
|---|---|
| `SLOT-CAMP-004-HERO_WORLD` | `recbMxKMvahBjZn7t` |
| `SLOT-CAMP-004-LIFE_IN_USE` | `recBJF31a1FKzVTWy` |
| `SLOT-CAMP-004-OBJECT_VIGNETTE` | `recXYpiHSAXRSrQ1n` |

Each slot carries `slot_prompt` and a `slot_evaluation_notes` entry recording slot-level discretion observations.

## 4. Lookup and carrier verification — post-upload table

Verification re-run after image upload. Image-bearing carriers, lookup paths, and the governed-output rollup resolved as expected against the existing schema.

| # | Chain | Result |
|---|---|---|
| 1 | `products.product_image` (3 records) | resolved — three attachments present |
| 2 | `reference_assets.reference_image` (`rec67d6sLZwX7zqep`) | resolved — one attachment present |
| 3 | `workflow_packets.product_image_lookup` (`PKT-CAMP-004`) | resolved — three product images surfaced via the three linked SKUs |
| 4 | `workflow_packets.product_status_lookup` | resolved — `draft × 3` |
| 5 | `workflow_packets.approved_reference_image_lookup` | resolved — six reference images surfaced (five brand-system + one packet-atmosphere) |
| 6 | `workflow_packets.governed_output_count` rollup | `0` — no curation yet, expected at this phase |
| 7 | `output_slots.product_image_lookup_lookup` + `output_slots.packet_reference_image_lookup` (3 slots) | resolved — all three slots inherit the three product images and six reference images via the packet linkage |

The packet's image-bearing lookups (`product_image_lookup`, `approved_reference_image_lookup`) and the slots' chained variants (`product_image_lookup_lookup`, `packet_reference_image_lookup`) are the lookup paths Phase C generation will consume; their resolution is what makes the Phase B carrier state structurally sound.

## 5. Preflight Deviation and Correction

The approved Phase B hard preflight required four image URLs / upload-ready images before Batch 1. Batch 1 proceeded before those images were available, leaving three `product_image` fields and one packet-atmosphere `reference_image` field empty. This was a workflow deviation, not a schema finding.

Correction: ASK manually uploaded the four images after record creation. Claude then re-ran lookup verification. Phase B was treated as complete only after the product and reference image lookups resolved.

## 6. Authorship-bearing observation — preliminary, not fork conclusion

During slot record authoring, the `LIFE_IN_USE` slot was recorded with `discretion_register_observation: authorship-bearing` in `slot_evaluation_notes`. The basis: composing the slot prompt required choosing a moment-of-use, a hand-presence convention, and a temporal posture from a space the brand-system references and packet creative_intent did not narrow far enough to make the choice mechanical.

This is preliminary evidence-against-premise-holds — the kind of selection pressure the curation-premise architectural fork is designed to expose. It is not yet a fork resolution. Phase C generation and Phase D synthesis are required before the observation can be weighed against the other two slot registers (`HERO_WORLD`, `OBJECT_VIGNETTE`) and against the packet-level discretion ledger. The observation is recorded so it survives into Phase D evaluation; whether it tilts the fork toward `refines` or `fragments` is held open.

## 7. Phase A → Phase B traceability

Phase A pre-registered moments of discretion at the packet level and per slot, with `discretion_register_observation` slots reserved at each. Phase B realized those moments as carrier records:

- packet-level discretion ledger → `workflow_packets.prompt_composition_notes` (eight protocol entries)
- per-slot discretion → `output_slots.slot_evaluation_notes` (three entries, one per slot)
- `fallback_chain_position: inferred_not_stated` for the packet-atmosphere reference, per Phase A pre-registration

Every Phase A pre-registered moment has a corresponding carrier record in Phase B.

## 8. What remains

- **Phase C — generation and curation.** Slot-prompt generation against the resolved lookups; selection per the bounded_creative_discretion declared at the packet. Follows the Phase 2C/2D-bedroom precedent for capture pattern and curator-of-record recording.
- **Phase D — findings synthesis.** Cross-reading the three slot discretion observations + packet ledger + governed_output curation evidence against the curation-premise fork (`holds` / `refines` / `fragments`).

The test scope remains bounded: a single campaign-mode packet against a single set of products. No expansion to additional packets, no additional brand contexts, no cross-base move within this test.

## 9. Workflow discipline observation — no rule change proposed

The hard imagery gate was correct: Batch 1 should not have proceeded before the four image URLs / upload-ready images were available. Execution crossed the gate; the correction (manual upload, re-verification) restored carrier integrity but did not undo the deviation in process order. Recorded as a deviation and correction. No workflow-rule change proposed in this artifact.

If a similar deviation recurs, the hard preflight gate may earn explicit treatment in `AGENTS.md` or a worktree-startup check. One incident earns documentation; it does not earn doctrine.

## 10. What did not change / out of scope

- No schema mutation. No field additions, no field-type changes, no rollup or formula changes, no enum changes.
- No `generated_assets` rows created. No `seam_runs` or `review_gates` rows created.
- No changes to the brand-system reference set already present in the base.
- No mutation in the SKU-Driven Furniture v1 base.
- No promotion of the curation-premise fork beyond `Held Questions` posture.

## 11. Anchor documents

- Phase A pre-registration: [`docs/campaign-mode-fork-resolver-test-setup-v1.md`](campaign-mode-fork-resolver-test-setup-v1.md)
- Architectural context — curation-premise fork: [`docs/architecture.md`](architecture.md) § Held Questions § Curation-Premise Architectural Fork
- Operator-judgment protocol: [`docs/operator-judgment-protocol-sketch-v1.md`](operator-judgment-protocol-sketch-v1.md)
- Visual-identity-system → IA mapping: [`docs/brand-system-input-visual-identity-system-to-ia-mapping-v1.md`](brand-system-input-visual-identity-system-to-ia-mapping-v1.md)
- Live prototype base: [Campaign-Driven D2C Home-Goods v1](https://airtable.com/appCAcRuA82SWj5h5)
