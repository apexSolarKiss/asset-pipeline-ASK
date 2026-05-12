# Non-Airtable Extraction Attempt v1

## Posture

```text
single extraction attempt
not production-ready
not validator integration
not Pydantic
not ontology
not orchestration spec
not architecture rewrite
not Phase 3
not schema mutation
not Airtable mutation
read-only preflight against live Airtable shape
not exhaustive across modes; SKU-driven slice only
not exhaustive across target shapes; JSON Schema only
self-superseding when a subsequent extraction attempt — different shape, different slice, or operational consumption test — earns its place
```

This artifact pressure-tests the project's headline target — *"durable spec / orchestration layer above changing tools and models"* — by extracting a representative slice of the IA outside Airtable shape into JSON Schema Draft 2020-12, together with a minimal representative JSON instance outline. The standard the artifact answers to is what survives, what distorts, and what remains prose / procedural — not whether a nice schema can be written.

## Architectural Question

The structured IA model v1 ([`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md)) is the first machine-readable canonical representation of the IA layered-content model. Its YAML appendix carries stable enumeration; its prose carries everything held. Per milestone 9's *Scope of current claims*, the architecture honestly distinguishes:

- **Target layer**: machine-usable normative structure / durable spec and orchestration layer above changing tools and models.
- **Current state**: machine-*readable* enumeration plus drift detection — not yet machine-*usable* orchestration spec.

The structured IA model v1's vocabulary is heavily co-shaped with Airtable (packets, slots, lookups, attachments, link fields, single-selects). Loose thread #8 in the grounding note names "durable-layer extractability" as untested. This artifact is one bounded extraction attempt against the strongest evidence slice.

The question this attempt resolves:

- Whether the data shape of a representative IA slice translates to a declarative tool-neutral schema
- Where the translation distorts (Airtable conventions that require compromise)
- Where the translation has no clean expression (concepts that fall to prose / procedural)
- What the gap between current state and target state actually looks like at this evidence depth

## Slice

**PKT-SKU-009** plus immediately surrounding structure in the SKU-Driven Furniture v1 base (`appoqJ25B6w4vSuX9`).

Rationale: SKU-driven mode is the architecture's strongest evidence base. PKT-SKU-009 has the deepest full-flow operational evidence ([`full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md) and predecessors). If the slice does not survive extraction in its strongest case, the durable-layer claim is harder to defend.

Rejected alternatives:
- *PKT-CAMP-004* — would conflate this attempt with the curation-premise fork test absorbed in milestone 9
- *PKT-COLL-001* — the cardinality strain that operationally deflated would have distorted the survival assessment
- *Cross-mode comparison* — broadens scope past "one representative slice"

## Target Shape

**JSON Schema Draft 2020-12.**

Rationale: tool-agnostic (any consumer that can read JSON can read JSON Schema); declarative (surfaces what's expressible as data shape vs what must remain procedural); standard format readable without setup; the most direct test of "above changing tools" of the three options the grounding note loose thread #8 names (JSON Schema; ontology; tool-agnostic spec).

Rejected alternatives:
- *Pydantic* — would conflate with the validator integration held question (milestone-9 inventory); Python-specific, not tool-neutral
- *Ontology (OWL / RDF)* — higher ceremony and less standard; the relational claims can be exercised in JSON Schema via `$ref` + composition; can be a separate later attempt if `$ref` is shown to be insufficient

## Preflight: Live Airtable Shape vs IA Model Interpretation

The preflight inspected the live Airtable schema and PKT-SKU-009's slice read-only, distinguishing what the live prototype shape is from what the IA model interprets the architecture to be.

### Live Airtable shape

The SKU-driven Furniture v1 base contains eight tables:

- `products` — SKU records (sku_key primary; product_image multipleAttachments)
- `constraint_rules` — bounded discretion rules (scope_type / scope_value / rule_type / priority)
- `reference_assets` — visual / URL references (reference_key primary; asset_uri URL; reference_image multipleAttachments; reference_role singleSelect)
- `workflow_packets` — packets (packet_key primary; business_intent / creative_intent / bounded_creative_discretion multilineText; multipleRecordLinks to products, constraints, references, slots, seam_runs, generated_assets, review_gates; multiple `multipleLookupValues` lookup fields surfacing linked-record content; `governed_output_count` rollup)
- `seam_runs` — verification runs (seam_name singleSelect; status singleSelect; run_timestamp createdTime)
- `generated_assets` — curation seam + governed assets (asset_key primary; multipleRecordLinks to packet, seam_run, output_slot; governed_output_status singleSelect; governed_output_flag formula; five-axis provenance singleLineText / multilineText / dateTime; curator singleLineText; curation_pattern singleLineText; asset_attachment multipleAttachments; asset_uri url)
- `review_gates` — approval gates (gate_status singleSelect; review_board_reference singleLineText)
- `output_slots` — first-class slot obligations (output_slot_key primary; expected_output_role singleLineText; slot_prompt multilineText; slot_status singleSelect; slot_generated_image_v1 multipleAttachments; multipleRecordLinks to packet, generated_assets; multipleLookupValues surfacing product_image, packet_reference_image, packet_reference_asset_uri)

PKT-SKU-009 (record `recMSvNkWSmYRCDiT`) in the slice:
- Linked to SKU-CHAIR-004 (`recN1tSknpVYlf5Op`) via `sku_key` multipleRecordLinks
- Linked to 3 slots: HERO (`recIqKWAFbndoyi4j`), PROFILE (`recweVMhpJJKwhdnJ`), DETAIL (`recszJj3bGmq6Mv5a`) via `output_slots` multipleRecordLinks
- Linked to REF-PKT-SKU-009-VISUAL-INVARIANT-002 (`recMDw2hUSEoGGVF3`) via `approved_reference_keys` multipleRecordLinks
- Linked to 10 generated_assets rows via `generated_assets` reverse-link (including 3 PATH-A rows: HERO `recNTHjyhXwDZJlMf`, PROFILE `recIfwRXLkLipYNkM`, DETAIL `reca3b1iPG9Mcb8r9`)
- `governed_output_count` = 3 (rollup over linked generated_assets with status=governed_output)
- No `constraint_keys` linked in this snapshot

### IA model interpretation

The IA model abstracts the live shape into:

- Eight IA layers (brand-system / category / mode-specific / packet / slot / candidate-generation / curation-seam / governed-asset)
- Four worked-example modes (SKU-driven; collection / merchandising; marketing / message-driven; brand campaign / editorial)
- Five carrier types (prose / structural / visual-reference / governance / held-candidate)
- An ordered six-layer fallback chain for sparse-articulation conditions
- Held questions encoded as markers, not as structural representations

The IA model's vocabulary (layers, modes, carriers, fallback chain) is *meta-level* — describing the shape of the architecture. The live Airtable shape is *instance-level* — describing the concrete data each artifact in the architecture is. The slice extraction below targets the **instance-level data shape** of the SKU-driven slice. Where the data shape touches the meta-level vocabulary (e.g., the curation seam, the slot layer) the connection is noted but not encoded in JSON Schema.

The IA model does not claim the live Airtable shape is its terminal form. The structured IA model v1's posture frames Airtable as the current pressure surface; the architecture is the durable claim above it.

## The Extraction: JSON Schema (Inline)

The schema below is a single-attempt extraction. It is intentionally narrow — slice data shape only, not Airtable schema verbatim and not orchestration spec. Choices made:

- Relationships are expressed by-reference (record-key pointer) plus typed reference helpers, not embedded. Bidirectional Airtable links collapse to one-direction-by-convention with reciprocity not enforced.
- Lookup-field auto-surfacing is omitted (no JSON Schema analogue; recoverable by following links at consumption time).
- Formula and rollup fields are omitted (computed; no declarative analogue).
- Single-select fields known to have stable choices are encoded as `enum`. Single-line text fields held deliberately as text per current Airtable doctrine (e.g., `curation_pattern`, `curator`, `capture_reason`) are encoded as open strings to preserve that doctrine.
- Attachment objects are flattened to a typed `Attachment` definition (url + filename + size + mime + dimensions). Airtable's thumbnail variants are not modeled.
- Required-field minimums match Airtable primary-field plus the most operationally load-bearing fields per current full-flow evidence; many fields are optional reflecting current schema reality.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://asset-pipeline-ask.example/extraction/v1",
  "title": "IA Slice Extraction // SKU-Driven Mode // Bounded Attempt",
  "description": "Single extraction attempt of one representative slice of the IA layered-content architecture into JSON Schema Draft 2020-12. Pressure-test only; not production-ready; not orchestration spec; not validator integration. Scope-bounded to PKT-SKU-009 plus immediate surrounding structure in SKU-driven mode. Read against docs/non-airtable-extraction-attempt-v1.md for the survives / distorts / prose-procedural assessment.",
  "type": "object",
  "properties": {
    "packets": {"type": "array", "items": {"$ref": "#/$defs/WorkflowPacket"}},
    "output_slots": {"type": "array", "items": {"$ref": "#/$defs/OutputSlot"}},
    "products": {"type": "array", "items": {"$ref": "#/$defs/Product"}},
    "reference_assets": {"type": "array", "items": {"$ref": "#/$defs/ReferenceAsset"}},
    "generated_assets": {"type": "array", "items": {"$ref": "#/$defs/GeneratedAsset"}},
    "constraint_rules": {"type": "array", "items": {"$ref": "#/$defs/ConstraintRule"}}
  },
  "$defs": {
    "WorkflowPacket": {
      "type": "object",
      "description": "Packet layer — strongest current carrier in SKU-driven mode.",
      "required": ["packet_key", "business_intent", "creative_intent", "required_output_set", "packet_status", "sku_keys", "output_slot_keys"],
      "properties": {
        "packet_key": {"type": "string", "description": "Stable identifier; example: PKT-SKU-009"},
        "business_intent": {"type": "string"},
        "creative_intent": {"type": "string"},
        "bounded_creative_discretion": {"type": "string", "description": "Scoped freedom shaped by intent and bounded by other constraints"},
        "required_output_set": {"type": "string", "description": "Human-readable expectation; mode-specific structural representation not yet earned"},
        "sku_keys": {"type": "array", "items": {"$ref": "#/$defs/ProductRef"}, "minItems": 1, "description": "SKU-driven mode is typically 1:1 packet-to-SKU; other modes vary"},
        "output_slot_keys": {"type": "array", "items": {"$ref": "#/$defs/OutputSlotRef"}, "minItems": 1},
        "approved_reference_keys": {"type": "array", "items": {"$ref": "#/$defs/ReferenceAssetRef"}, "default": []},
        "constraint_keys": {"type": "array", "items": {"$ref": "#/$defs/ConstraintRuleRef"}, "default": []},
        "packet_status": {"type": "string", "enum": ["draft", "ready_for_ingest", "in_verification", "blocked", "release_ready"]},
        "generated_asset_keys": {"type": "array", "items": {"$ref": "#/$defs/GeneratedAssetRef"}, "default": [], "description": "Reverse linkage from generated_assets.packet_key; included for traversal convenience, denormalized"}
      }
    },
    "OutputSlot": {
      "type": "object",
      "description": "Slot layer — role-specific narrowing within a packet.",
      "required": ["output_slot_key", "expected_output_role", "packet_key"],
      "properties": {
        "output_slot_key": {"type": "string", "description": "Stable identifier; example: SLOT-PKT-SKU-009-HERO"},
        "expected_output_role": {"type": "string", "description": "Role label; SKU-driven mode uses HERO / PROFILE / DETAIL; mode-specific enums not yet earned"},
        "expected_output_description": {"type": "string"},
        "slot_prompt": {"type": "string", "description": "Role-specific narrowing prose"},
        "slot_status": {"type": "string", "description": "Lifecycle status; enum values not stably enumerated at this evidence depth; live shape allows empty (pre-generation slots; not in required list per live evidence)"},
        "slot_evaluation_notes": {"type": "string"},
        "slot_sort_order": {"type": "integer", "minimum": 0},
        "packet_key": {"$ref": "#/$defs/WorkflowPacketRef"},
        "generated_asset_keys": {"type": "array", "items": {"$ref": "#/$defs/GeneratedAssetRef"}, "default": []},
        "slot_candidate_attachments": {"type": "array", "items": {"$ref": "#/$defs/Attachment"}, "default": [], "description": "Transient generation candidates; not first-class data; promoted to GeneratedAsset on curation"}
      }
    },
    "Product": {
      "type": "object",
      "description": "Product / SKU layer — fidelity anchor in SKU-driven mode.",
      "required": ["sku_key", "product_name", "product_status"],
      "properties": {
        "sku_key": {"type": "string", "description": "Stable identifier; example: SKU-CHAIR-004"},
        "product_name": {"type": "string"},
        "category": {"type": "string", "description": "Signaled-only; not first-class layer carrier"},
        "product_class": {"type": "string"},
        "material_notes": {"type": "string"},
        "finish_notes": {"type": "string"},
        "identifying_details": {"type": "string"},
        "product_status": {"type": "string", "enum": ["draft", "approved_source", "retired"]},
        "product_image": {"$ref": "#/$defs/Attachment", "description": "Canonical product-truth image input"}
      }
    },
    "ReferenceAsset": {
      "type": "object",
      "description": "Visual / URL reference; visual-as-fidelity-strategy carrier.",
      "required": ["reference_key", "reference_role"],
      "properties": {
        "reference_key": {"type": "string", "description": "Stable identifier; example: REF-PKT-SKU-009-VISUAL-INVARIANT-002"},
        "reference_role": {"type": "string", "description": "Role classifier; example: approved_directional_reference"},
        "asset_uri": {"type": "string", "format": "uri"},
        "reference_image": {"$ref": "#/$defs/Attachment"},
        "reference_note": {"type": "string"}
      }
    },
    "ConstraintRule": {
      "type": "object",
      "description": "Bounded-discretion governing rule.",
      "required": ["constraint_key", "scope_type", "scope_value", "rule_type", "rule_text", "active_status"],
      "properties": {
        "constraint_key": {"type": "string"},
        "scope_type": {"type": "string", "enum": ["product", "category", "product_class", "brand_context"]},
        "scope_value": {"type": "string"},
        "rule_type": {"type": "string"},
        "rule_text": {"type": "string"},
        "priority": {"type": "integer", "minimum": 0},
        "active_status": {"type": "string", "enum": ["active", "inactive"]}
      }
    },
    "GeneratedAsset": {
      "type": "object",
      "description": "Curation-seam row carrying provenance and governed asset identity.",
      "required": ["asset_key", "packet_key", "output_slot_key", "governed_output_status"],
      "properties": {
        "asset_key": {"type": "string"},
        "packet_key": {"$ref": "#/$defs/WorkflowPacketRef"},
        "output_slot_key": {"$ref": "#/$defs/OutputSlotRef"},
        "asset_role": {"type": "string"},
        "asset_uri": {"type": "string", "format": "uri", "description": "Optional URL form; not always populated when bytes carried by asset_attachment"},
        "asset_attachment": {"$ref": "#/$defs/Attachment", "description": "Self-contained governed-asset attachment; resolves milestone-5 thin-bridge limitation"},
        "governed_output_status": {"type": "string", "enum": ["candidate", "governed_output", "rejected"]},
        "review_artifact_flag": {"type": "boolean", "default": false},
        "capture_reason": {"type": "string", "description": "Held as open string per current doctrine; enum promotion not yet earned"},
        "source_attachment_id": {"type": "string", "description": "Pointer to the slot-side raw candidate that became this governed asset"},
        "capture_notes": {"type": "string"},
        "captured_at": {"type": "string", "format": "date-time"},
        "curation_pattern": {"type": "string", "description": "Held as open string per current doctrine. Per milestone 9: distinguishes confirmation-bearing curation from authorship-bearing selection; SKU-mode evidence supports the singular-curation framing; campaign mode at PKT-CAMP-004 separates upstream authorship from governance-bearing curation. Schema cannot encode the semantic split."},
        "curator": {"type": "string", "description": "Held as open string to allow heterogeneous values (single human; agent-and-human compound; system process)"}
      }
    },
    "Attachment": {
      "type": "object",
      "description": "Flattened attachment carrier. Airtable thumbnail variants not modeled.",
      "required": ["url", "filename"],
      "properties": {
        "url": {"type": "string", "format": "uri"},
        "filename": {"type": "string"},
        "size_bytes": {"type": "integer", "minimum": 0},
        "mime_type": {"type": "string"},
        "width": {"type": "integer", "minimum": 0},
        "height": {"type": "integer", "minimum": 0}
      }
    },
    "WorkflowPacketRef": {"type": "object", "required": ["packet_key"], "properties": {"packet_key": {"type": "string"}}},
    "OutputSlotRef": {"type": "object", "required": ["output_slot_key"], "properties": {"output_slot_key": {"type": "string"}}},
    "ProductRef": {"type": "object", "required": ["sku_key"], "properties": {"sku_key": {"type": "string"}}},
    "ReferenceAssetRef": {"type": "object", "required": ["reference_key"], "properties": {"reference_key": {"type": "string"}}},
    "ConstraintRuleRef": {"type": "object", "required": ["constraint_key"], "properties": {"constraint_key": {"type": "string"}}},
    "GeneratedAssetRef": {"type": "object", "required": ["asset_key"], "properties": {"asset_key": {"type": "string"}}}
  }
}
```

## Minimal Representative JSON Instance Outline

The outline below is a minimal representative instance of the slice. It is intended to validate against the JSON Schema above. Field values reflect the live Airtable record content as observed at preflight, with prose fields truncated and attachment / asset URLs replaced with `urn:elided:<token>` placeholders so the instance shows shape without leaking live URLs. The chosen `generated_assets` row is the AGENTIC HERO row, which has `governed_output_status = "governed_output"`; the instance therefore demonstrates the governed-output terminal state, not the upstream candidate state.

```json
{
  "packets": [
    {
      "packet_key": "PKT-SKU-009",
      "business_intent": "Run a bounded second-packet recurrence test for URL-surfaced visual-reference input using a newly created warm-neutral dining chair product...",
      "creative_intent": "Produce a coherent three-view warm-neutral studio product image set for the Placeholder Warm-Neutral Sculpted Dining Chair while preserving product truth...",
      "required_output_set": "Three-view output set: one front three-quarter hero view, one profile / side supporting view, and one detail crop focused on construction, upholstery texture, or material character.",
      "sku_keys": [{"sku_key": "SKU-CHAIR-004"}],
      "output_slot_keys": [
        {"output_slot_key": "SLOT-PKT-SKU-009-HERO"},
        {"output_slot_key": "SLOT-PKT-SKU-009-PROFILE"},
        {"output_slot_key": "SLOT-PKT-SKU-009-DETAIL"}
      ],
      "approved_reference_keys": [
        {"reference_key": "REF-PKT-SKU-009-VISUAL-INVARIANT-002"}
      ],
      "constraint_keys": [],
      "packet_status": "ready_for_ingest",
      "generated_asset_keys": [
        {"asset_key": "ASSET-PKT-SKU-009-AGENTIC-HERO-ATTEMPT1-attHhekFb8MWgcIFg"}
      ]
    }
  ],
  "output_slots": [
    {
      "output_slot_key": "SLOT-PKT-SKU-009-HERO",
      "expected_output_role": "HERO",
      "expected_output_description": "Front three-quarter hero view for the PKT-SKU-009 recurrence test.",
      "slot_prompt": "Create the HERO image for PKT-SKU-009. Use packet_reference_image as studio-world visual reference... Use product_image as product identity/object truth...",
      "slot_evaluation_notes": "Gate 2 image-bearing reference path output captured...",
      "slot_sort_order": 1,
      "packet_key": {"packet_key": "PKT-SKU-009"},
      "generated_asset_keys": [
        {"asset_key": "ASSET-PKT-SKU-009-AGENTIC-HERO-ATTEMPT1-attHhekFb8MWgcIFg"}
      ],
      "slot_candidate_attachments": [
        {"url": "urn:elided:slot-hero-candidate", "filename": "Image_May_1_2026_3_11_AM.jpeg", "mime_type": "image/jpeg", "width": 896, "height": 1200}
      ]
    }
  ],
  "products": [
    {
      "sku_key": "SKU-CHAIR-004",
      "product_name": "Placeholder Warm-Neutral Sculpted Dining Chair",
      "category": "chair",
      "product_class": "dining",
      "material_notes": "Fully upholstered dining chair with a softly sculpted wraparound back...",
      "finish_notes": "Warm greige or oatmeal-toned upholstery with subtle woven texture...",
      "identifying_details": "Soft curved back silhouette, continuous upholstered shell...",
      "product_status": "approved_source",
      "product_image": {"url": "urn:elided:product-image", "filename": "warm_greige_upholstery_2K_202604292104.jpeg", "mime_type": "image/jpeg", "width": 1792, "height": 2400}
    }
  ],
  "reference_assets": [
    {
      "reference_key": "REF-PKT-SKU-009-VISUAL-INVARIANT-002",
      "reference_role": "approved_directional_reference",
      "asset_uri": "urn:elided:reference-asset-uri",
      "reference_image": {"url": "urn:elided:reference-image", "filename": "Create_a_warm-neutral_architectural_studio_202604292311.jpeg", "mime_type": "image/jpeg", "width": 1792, "height": 2400},
      "reference_note": "C-test stronger visual-reference candidate for PKT-SKU-009..."
    }
  ],
  "generated_assets": [
    {
      "asset_key": "ASSET-PKT-SKU-009-AGENTIC-HERO-ATTEMPT1-attHhekFb8MWgcIFg",
      "packet_key": {"packet_key": "PKT-SKU-009"},
      "output_slot_key": {"output_slot_key": "SLOT-PKT-SKU-009-HERO"},
      "asset_role": "HERO",
      "asset_attachment": {"url": "urn:elided:asset-attachment", "filename": "Image_May_1_2026_3_11_AM.jpeg", "mime_type": "image/png", "width": 896, "height": 1200},
      "governed_output_status": "governed_output",
      "review_artifact_flag": false,
      "capture_reason": "agentic-curation-attempt-1",
      "source_attachment_id": "attHhekFb8MWgcIFg",
      "capture_notes": "Agentic curation event for PKT-SKU-009 HERO slot. Selected as the first attachment in the slot's attachment array...",
      "captured_at": "2026-05-02T18:00:00.000Z",
      "curation_pattern": "agent-proposed-human-ratified",
      "curator": "Claude (proposing); ASK (ratifying)"
    }
  ],
  "constraint_rules": []
}
```

The instance shows the full slice traversal: one packet, one of its three slots (HERO; PROFILE and DETAIL elided to keep the outline minimal), one linked product, one linked reference, one linked generated_asset row at `governed_output` terminal state. Cross-record references resolve by key (`packet_key`, `output_slot_key`, etc.). All optional fields whose live value is empty are omitted rather than rendered as `null`. The instance was constructed to satisfy the schema's required-field constraints, enum constraints, and `format: uri` constraint on Attachment URLs (using `urn:elided:<token>` URN placeholders that are valid URI shape without exposing live URLs).

## What Survives

The following translate cleanly into JSON Schema with reasonable fidelity:

1. **The eight-layer relational structure.** Packet → slot → candidate → generated-asset → governed-asset (as a status); packet → product; packet → reference; packet → constraint. All translate to typed object definitions with reference relationships. The relational shape is preserved.
2. **Required vs optional fields.** JSON Schema `required` arrays carry the structural minimums per current evidence (packet_key + business_intent + creative_intent + required_output_set + packet_status + sku_keys + output_slot_keys for `WorkflowPacket`; analogous minimums for other types).
3. **Primitive field types.** Text fields → `string`; integers → `integer` with `minimum`; URLs → `string` with `format: uri`; timestamps → `string` with `format: date-time`. Each survives.
4. **Single-select fields with stable choices.** `packet_status` (5 values), `product_status` (3 values), `governed_output_status` (3 values), `scope_type` (4 values), `active_status` (2 values) all render as `enum`.
5. **The curation seam's five-axis provenance.** `capture_reason`, `captured_at`, `source_attachment_id`, `capture_notes`, `curation_pattern` plus `curator` survive as independent fields on `GeneratedAsset`. The schema preserves the provenance richness — five separate dimensions of curation-event metadata — that the architecture treats as load-bearing.
6. **The `asset_attachment` self-contained governed-asset carrier.** The Attachment definition models url + filename + size + mime + dimensions. The thin-bridge limitation that milestone 5 surfaced and milestone 7's `asset_attachment` schema move resolved is preserved by the schema's separation of `asset_uri` (URL form, optional) from `asset_attachment` (bytes-carrying form).
7. **Bidirectional-link reverse-traversal denormalization.** Packets list their generated_asset_keys; slots list their generated_asset_keys; generated_assets reference their packet_key and output_slot_key. The schema carries the by-reference shape on both sides, with reciprocity declared in description but not enforced (see *Distorts* below).
8. **The structural mode-independence of the schema.** The eight definitions are not SKU-mode-specific. A collection-mode or campaign-mode packet would instantiate the same schema with different values (multiple sku_keys; different slot enum-equivalent values; mode-specific composite-anchor content held in an unmodeled-here field). The schema is not Airtable-base-specific.

## What Distorts

The following translate, but with structural compromise that the schema cannot recover:

1. **Lookup-field auto-surfacing.** Airtable lookups (e.g., `product_image_lookup_lookup` on output_slots; `approved_reference_image_lookup` on workflow_packets) automatically surface linked-record content at the parent's level. JSON Schema has no analogue. The schema omits the lookups entirely; consumers must navigate the relationship at consumption time. *Distortion*: a structural convenience that exists in Airtable for surfacing inputs to generation invocation disappears; the data shape is recoverable but the navigation burden moves to the consumer.
2. **Multipart attachment objects.** Airtable attachments carry url + filename + size + type + width + height *plus three thumbnail variants* (small/large/full) each with their own url + dimensions. The flattened `Attachment` definition models the primary attributes only. *Distortion*: tooling that depends on pre-computed thumbnail URLs (e.g., the Airtable UI; some AI field-agent input pickers) would need to re-derive them.
3. **Single-select option metadata.** Airtable single-selects carry id + name + color. The JSON Schema `enum` carries only the name. *Distortion*: color metadata is lost; option IDs are not preserved, so referential stability across schema mutations relies on the name string remaining stable.
4. **Multiple-record-link denormalization.** Airtable links return `[{"id": "rec...", "name": "<primary-field-value>"}]` — both the record ID and the linked record's primary-field display label. The schema's `*Ref` helpers carry only the key (`packet_key`, etc.). *Distortion*: a consumer that wants the display label without following the link must denormalize or include extra fields the schema doesn't model.
5. **Bidirectional link reciprocity.** Airtable maintains both sides of a link automatically. JSON Schema cannot enforce reciprocity — a consumer must guarantee that if `packet.output_slot_keys` lists slot X, then `slot.packet_key` references packet. *Distortion*: a referential invariant the database carries free-of-charge becomes a consumer obligation.
6. **Text fields with deferred enum doctrine.** `curation_pattern`, `curator`, `capture_reason`, `asset_role`, `expected_output_role`, `slot_status` are held as text in Airtable to defer enum doctrine until the value space stabilizes (per [`docs/governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md`](governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md) and predecessors). JSON Schema can either constrain prematurely (enum now) or stay open (string). The schema chose open string with a description noting the doctrine. *Distortion*: the schema cannot communicate "this is an intentionally-open field pending stabilization" — only the description can, and descriptions are not validated.
7. **Formula and rollup fields.** `display_label` (formula on products), `governed_output_flag` (formula on generated_assets), `governed_output_count` (rollup on workflow_packets) are computed in Airtable. The schema omits them. *Distortion*: derived data that the live system depends on (e.g., the packet-level governed-output count surfaced in the architecture's plateau marking) must be re-derived at consumption time.
8. **The slot's candidate attachments.** `slot_generated_image_v1` on output_slots carries the transient candidate set produced by generation, before curation promotes one to `asset_attachment` on a generated_asset. The schema models this as `slot_candidate_attachments: [Attachment]`, but the relationship between a specific candidate-set element and the generated_asset that captured it is carried only by `source_attachment_id` matching the Airtable attachment ID string. *Distortion*: outside Airtable, "attachment ID" has no meaning; the link from candidate to governed-capture would need a different convention (content hash; UUID; etc.).

## What Has No Clean Expression (Falls to Prose / Procedural)

The following concepts the architecture treats as load-bearing have no clean expression in JSON Schema. The schema's silence on these is honest; the architecture carries them in prose or operator-judgment:

1. **Inheritance / override behavior.** The IA model's "implicit-additive Model A" inheritance (slot inherits packet bounds; packet inherits implicit category context; etc.) is conditional and interpretive. JSON Schema can compose definitions via `$ref` + `allOf`, but it cannot express "this slot's effective constraints are packet constraints plus slot constraints unless the slot overrides on dimension X." Falls to prose.
2. **The curation semantic split.** Per milestone 9, authorship-bearing discretion (variable site by mode) is distinct from governance-bearing curation (always at the curation seam). The schema sees only `curation_pattern` as an open string. The semantic split is in the *interpretation* of curation_pattern values, not in the schema. Falls to architectural prose and operator practice.
3. **The curation-premise fork status.** `holds` falsified at PKT-CAMP-004 scope; bounded `refines` is current best read; `fragments` remains a named falsification path. None of this is data about a record — it is meta-state about the architecture itself.
4. **Apex Named Limitations.** Three limitations carried forward (specific aesthetic-carrier schema; inheritance/override precedence rule; cross-base / cross-category / cross-brand operational evidence at full-flow depth). The schema has no place for architectural held questions.
5. **Brand-system layer structural decision.** Named at milestone 9 as unresolved. Three live shapes (first-class throughout; terminal operator-mediated; hybrid). The schema's `WorkflowPacket` definition does not encode brand-system content because the live system does not — but the unmodeled status itself is invisible in the schema.
6. **Carrier-status distinctions.** Prose-carried / structurally-explicit / structurally-suggested-not-earned / operationally-deflated / operationally-untested. These describe how concepts live across the architecture's artifacts; they are not data about packets.
7. **Operator-judgment paths.** The architecture's sparse-articulation fallback chain becomes load-bearing under stress; operator judgment is the carrier. Procedural; not data; not encodable.
8. **Held schema candidates.** Composite-anchor mutations; brand-platforms entity; rejected-assets entity; articulation-state flag; derivation-basis field; fallback-chain-position annotation; brand-wide-constants entity; reference-type tag (with divergent proposals); selection-axis enum; etc. Each is held in prose; none is encoded. The schema's silence on them is correct, but the schema cannot communicate "this absence is intentional and held."
9. **The provisional / mode-weighted nature of every claim.** "Singular-curation framing remains useful in SKU mode; provisional architecture-wide." "Schema is mode-independent at structural level [but full-flow operational depth varies]." The architecture's honest scoping is architectural framing, not schema content.
10. **Reuse / derivative governance.** When a governed asset becomes a reference for a later packet, what governance applies? The architecture says "not modeled"; the schema cannot model what is not modeled.
11. **Inferred-not-stated semantics.** Currently a prose discipline (operator marks derived content honestly); surfaced as a paper-pressed structural-carrier candidate (`derivation_basis`; `articulation_state`); not earned. The schema cannot represent "this field's value was derived under fallback chain position N."

## Implications for the Durable Orchestration-Layer Claim

The extraction confirms milestone 9's *Scope of current claims* distinction at an operational level:

- **Machine-readable enumeration**: the structured IA model v1's YAML appendix + this slice's data-shape extraction together demonstrate that the IA's stable enumeration and its representative data shape both translate to tool-neutral declarative form. The IA's data shape survives expression outside Airtable. The architecture is genuinely above-tool in the data-shape sense.
- **Machine-usable orchestration spec**: the extraction also confirms that this is *not* yet achieved. The substantial fraction of architectural content that falls to prose / procedural (inheritance, override, curation semantic split, held questions, operator judgment, derivation provenance, reuse governance) cannot be carried by a declarative schema. Any orchestration layer that consumed the schema would still need procedural logic — code, configuration, agentic prompt content — to do what the architecture currently asks operators and prose to do.

The honest delta: the data shape is portable. The interpretive and procedural layer that makes the data shape operational is not yet portable. The grounding note's loose thread #8 framing — that this is the *headline target* — is correctly framed: durable orchestration above changing tools is unfinished work. The structured IA model v1 is the first leg; this extraction confirms the slice survives that first leg; the procedural / interpretive layer is the next leg.

A separate, larger extraction that included procedural rules (e.g., as JSON Logic; or as Pydantic + validators; or as policy-as-code) would test the next leg. That is held; not authorized at this plateau.

## Relationship to Held Items

This artifact is adjacent to, but distinct from, two held items in the milestone-9 inventory:

- **Validator integration**. The milestone-9 held question reads: *the structured IA model v1's YAML appendix could be derived as Pydantic models for `src/asset_pipeline_ask/` consumption when an operational consumer surfaces the need; not earned by current pressure.* This extraction does not derive Pydantic, does not target `src/`, and does not propose an operational consumer. The artifact remains a pressure test of tool-agnostic data-shape extractability, separate from any runtime-language binding.
- **Brand-system layer structural decision**. The milestone-9 named decision (first-class structural carriers throughout / terminal operator-mediated translation / hybrid) is not pressured by this extraction. The slice's `WorkflowPacket` definition has no brand-system fields because the live `workflow_packets` table has none; the decision's resolution would extend the schema, not change what the schema accurately represents today.

Neither held item is advanced or resolved by this artifact.

## Scope-Bound Caveats

This is a single bounded extraction. Limits explicitly named:

- *Single slice*. PKT-SKU-009 only. Cross-mode pressure (collection / marketing / campaign modes) not tested; cross-base pressure not tested; cross-brand pressure not tested.
- *Single target shape*. JSON Schema Draft 2020-12 only. Ontology / Pydantic / TypeScript / other shapes not tested.
- *Single snapshot*. Read against live Airtable shape as of preflight time; would distort differently if the live schema mutated, and the structured IA model v1 is itself the canonical reference for stable enumeration (this extraction reads it but does not modify it).
- *Distortion list illustrative*. Eight distortions named; the list is not exhaustive. A more thorough extraction would surface more.
- *Procedural-content list illustrative*. Eleven items named; the list is not exhaustive.
- *"Survives" is structural*. Survival in JSON Schema is not the same as operational consumption by a downstream system. A consumer reading the schema still needs code, configuration, or operator practice to do anything with it.
- *Read-only preflight*. No Airtable mutation occurred; no schema mutation occurred; no record was modified.

## Self-Superseding Clause

This artifact is a v1 single-attempt extraction. It should be superseded by:

- a v2 attempt that targets a different slice (collection / marketing / campaign mode) — would test cross-mode portability
- a v2 attempt that targets a different shape (Pydantic / ontology / policy-as-code) — would test interpretive-layer portability
- any operational consumer that actually consumes the schema (would convert the pressure test into operational pressure)
- a subsequent milestone marker that absorbs extraction evidence into the architecture's claim discipline

It does not supersede the structured IA model v1, the apex definition-layer artifact, the Phase 1 mode sketches, the Phase 2 deepenings, the operational findings notes, milestone 8, milestone 9, or any other repo artifact. Those remain authoritative for their subject matter; this artifact reads them at extraction-attempt depth and tests one bounded slice against one bounded target shape.

## Anchor Documents

### Slice provenance (live Airtable shape read read-only)

- [SKU-Driven Furniture v1 Airtable base](https://airtable.com/appoqJ25B6w4vSuX9) — base `appoqJ25B6w4vSuX9`
- PKT-SKU-009 packet record `recMSvNkWSmYRCDiT`
- SLOT-PKT-SKU-009-HERO slot record `recIqKWAFbndoyi4j`
- SKU-CHAIR-004 product record `recN1tSknpVYlf5Op`
- REF-PKT-SKU-009-VISUAL-INVARIANT-002 reference record `recMDw2hUSEoGGVF3`
- ASSET-PKT-SKU-009-AGENTIC-HERO-ATTEMPT1 generated-asset record `recAGC8vFHTjvD5fH` (the governed-output row used in the instance outline)

### Architectural framing this extraction reads against

- [`docs/architecture.md`](architecture.md): current-architecture front door; Scope of current claims subsection
- [`docs/milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md`](milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md): plateau marker; held items the extraction is adjacent to but does not resolve
- [`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md): the meta-level structured IA model the extraction reads above; this slice extraction is instance-level
- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact; three Named Limitations the extraction's distortions touch

### Phase 1 source artifact the slice anchors against

- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md): SKU-driven mode IA content sketch anchored against PKT-SKU-009 + PKT-SKU-010
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): PKT-SKU-009 PATH-A full-flow operational evidence; deepest single-packet evidence base

### Held items not advanced by this artifact

- Validator integration (Pydantic models for `src/asset_pipeline_ask/`) — held per milestone 9
- Brand-system layer structural decision — held per milestone 9
- Cross-mode extraction pressure — not tested
- Operational consumer of an extracted schema — not surfaced
