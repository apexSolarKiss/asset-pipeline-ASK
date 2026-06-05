/* asset-pipeline-ASK_ia-state-spine.data.js
   Architecture-state data for the interactive IA state spine.

   AP-owned authorship layer (which node is in which state). Consumed by
   ia-state-spine-engine.js, which colors each node by its state using the
   ASK Spectral State role tokens (--state-*, from _dsa-tokens/spectral-state.css).

   DISCIPLINE: color encodes STATE only. Everything else — evidence, qualifier,
   mode coverage, repo pointer — is metadata shown in the inspector panel, never
   in hue. One state per node. States drawn from current repo truth (milestone 12
   + evidence-depth brief + architecture.md); every state has an honest example,
   none invented for palette coverage.

   Illustrative, not source truth — repo prose (docs/architecture.md) is
   authoritative.

   Node: { id, group, label, state, evidence, qualifier?, pointer, modes? }
     group: 'root' | 'mode' | 'spine' | 'question' | 'external'
     state: one of the eight Spectral State roles
*/

window.IA_STATE_SPINE = {
  meta: {
    title: 'Layered IA — state',
    subtitle: 'Axis-independent state surface · what is earned / held / deflated, and where',
    stamp: { source: 'source-v1', render: 'render-v1', date: '2026-06-04' },
  },

  // Legend / state vocabulary (ASK Spectral State).
  states: [
    { role: 'earned',     label: 'earned',     meaning: 'operationally grounded at full depth' },
    { role: 'structural', label: 'structural', meaning: 'structurally / schema proven; not full-flow pressured' },
    { role: 'partial',    label: 'partial',    meaning: 'operational at bounded depth' },
    { role: 'proposed',   label: 'proposed',   meaning: 'articulated as a candidate; not yet pressured' },
    { role: 'deflated',   label: 'deflated',   meaning: 'pressure showed it unnecessary / dead' },
    { role: 'held',       label: 'held',       meaning: 'a named open question, not yet resolved' },
    { role: 'external',   label: 'external',   meaning: 'owned elsewhere (inherited / upstream)' },
    { role: 'neutral',    label: 'neutral',    meaning: 'no asserted state (the lavender field)' },
  ],

  nodes: [
    // ---- root / framing ----
    { id: 'root', group: 'root', label: 'Layered IA — state', state: 'neutral',
      evidence: 'Framing root — asserts no state.', pointer: 'docs/architecture.md' },

    // ---- mode axes (orthogonal; selection isolates) ----
    { id: 'm-sku', group: 'mode', label: 'SKU-driven', state: 'earned',
      evidence: 'Full-flow generation → curation → governance at PKT-SKU-007 / 009 / 010.',
      pointer: 'docs/architecture.md §Evidence Depth' },
    { id: 'm-collection', group: 'mode', label: 'collection / merchandising', state: 'earned',
      evidence: 'Full-flow at PKT-COLL-001; the composite-anchor mutation was operationally deflated here.',
      pointer: 'docs/collection-mode-operational-test-findings-v1.md' },
    { id: 'm-campaign', group: 'mode', label: 'brand campaign / editorial', state: 'partial',
      evidence: 'Bounded full-flow at PKT-CAMP-004 (one packet, three slots).',
      qualifier: 'bounded operational depth', pointer: 'docs/campaign-mode-fork-resolver-test-phase-d-findings-v1.md' },
    { id: 'm-marketing', group: 'mode', label: 'marketing / message-driven', state: 'structural',
      evidence: 'Structurally represented, not operationally earned — PKT-MSG-001 is findings-only; no full-flow.',
      qualifier: 'weakest mode', pointer: 'docs/architecture.md §Evidence Depth' },

    // ---- spine: IA layers / surfaces (upstream → downstream) ----
    { id: 's-brand-system', group: 'spine', label: 'brand-system layer', state: 'held',
      evidence: 'Currently unmodeled in IA — a named structural decision, not a deferred limitation.',
      qualifier: 'Zone 1A (approved references) earned; Zone 1B (constants) held',
      pointer: 'docs/architecture.md §Brand-System Layer Status', modes: ['m-sku','m-collection','m-campaign','m-marketing'] },
    { id: 's-category', group: 'spine', label: 'category / product-class layer', state: 'structural',
      evidence: 'Signaled-only; not first-class. Partial inheritance from brand-system (lighting register inherits; environment / proportions are category-local).',
      pointer: 'docs/architecture.md', modes: ['m-sku','m-collection','m-campaign','m-marketing'] },
    { id: 's-mode-specific', group: 'spine', label: 'mode-specific layer', state: 'structural',
      evidence: 'Varies by workflow mode; sits between category and packet. SKU-driven has none; campaign has two.',
      pointer: 'docs/architecture.md', modes: ['m-sku','m-collection','m-campaign','m-marketing'] },
    { id: 's-packet', group: 'spine', label: 'packet layer', state: 'earned',
      evidence: 'The strongest current carrier — business and creative intent, constraints, references, bounded discretion, required outputs.',
      pointer: 'docs/architecture.md', modes: ['m-sku','m-collection','m-campaign','m-marketing'] },
    { id: 's-slot', group: 'spine', label: 'slot layer', state: 'earned',
      evidence: 'Role-specific narrowing; the terminal expected-output obligation.',
      pointer: 'docs/architecture.md', modes: ['m-sku','m-collection','m-campaign','m-marketing'] },
    { id: 's-candidate', group: 'spine', label: 'candidate-generation layer', state: 'earned',
      evidence: 'Transient generated attachments; operationally exercised.',
      qualifier: 'earned where operationally pressured; marketing not yet live',
      pointer: 'docs/architecture.md', modes: ['m-sku','m-collection','m-campaign'] },
    { id: 's-curation', group: 'spine', label: 'curation seam', state: 'earned',
      evidence: 'Governance carriers operational (asset_attachment · curation_pattern · curator).',
      qualifier: 'earned where operationally pressured; marketing not yet live; the authorship-bearing vs governance-bearing split is a held sub-question',
      pointer: 'docs/architecture.md §Curation', modes: ['m-sku','m-collection','m-campaign'] },
    { id: 's-governed', group: 'spine', label: 'governed-asset layer', state: 'earned',
      evidence: 'asset_attachment self-contained writeback; durable terminal output.',
      qualifier: 'earned where operationally pressured; marketing not yet live',
      pointer: 'docs/architecture.md', modes: ['m-sku','m-collection','m-campaign'] },

    // ---- architectural-question nodes ----
    { id: 'q-structured-model', group: 'question', label: 'structured IA model v2', state: 'structural',
      evidence: 'Machine-readable 17-key YAML enumeration landed; structurally proven, but not machine-usable / runtime-consumed.',
      qualifier: 'machine-readable, not machine-usable', pointer: 'docs/structured-ia-model-v2.md' },
    { id: 'q-structured-consumer', group: 'question', label: 'structured IA v2 consumer path (validator / orchestration)', state: 'proposed',
      evidence: 'The preflight names seven candidate structured consumers; none is live. v2 leaves runtime consumption to prose.',
      pointer: 'docs/structured-ia-v2-consumer-preflight-v1.md' },
    { id: 'q-zone1b', group: 'question', label: 'brand-system Zone 1B (constants)', state: 'held',
      evidence: 'Brand-wide constants beyond approved references — structurally suggested, held.',
      pointer: 'docs/brand-system-carrier-decision-surface-v2.md', modes: ['m-sku','m-collection','m-campaign','m-marketing'] },
    { id: 'q-curation-fork', group: 'question', label: 'curation-premise fork', state: 'held',
      evidence: 'Bounded `refines` reading at PKT-CAMP-004 scope; sharpened-not-closed.',
      pointer: 'docs/campaign-mode-fork-resolver-test-phase-d-findings-v1.md', modes: ['m-campaign'] },
    { id: 'q-carrier-shape', group: 'question', label: 'carrier-shape questions (Option F · R-C/R-D · Z4-C/Z4-D)', state: 'held',
      evidence: 'Three carrier-shape choices sharpened-not-closed; no choice closed.',
      qualifier: 'single-substrate, single-reader evidence', pointer: 'docs/milestones/milestone-12-post-milestone-11-multi-axis-carrier-pattern-plateau.md',
      modes: ['m-sku','m-collection','m-campaign','m-marketing'] },
    { id: 'q-composite-anchor', group: 'question', label: 'composite-anchor', state: 'deflated',
      evidence: 'Operationally deflated for collection mode (the paper-strain mutation did not survive operational pressure).',
      qualifier: 'held for marketing / campaign modes', pointer: 'docs/collection-mode-operational-test-findings-v1.md',
      modes: ['m-collection'] },

    // ---- external ----
    { id: 'x-design-system', group: 'external', label: 'design-system-ASK foundations', state: 'external',
      evidence: 'diagram-tree · diagram-spine-static · ASK Spectral State — inherited from design-system-ASK by reference; AP is the consumer.',
      pointer: 'docs/diagrams/_dsa-tokens/MANIFEST.md' },
  ],
};
