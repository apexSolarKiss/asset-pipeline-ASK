/* asset-pipeline-ASK_ia-state-spine.data.js
   Architecture-state data for the interactive IA state spine.

   AP-owned authorship layer (which node is in which state). Consumed by
   ia-state-spine-engine.js, which colors each node by its state using the
   ASK Spectral State role tokens (--state-*, from _dsa-tokens/spectral-state.css).

   DISCIPLINE: color encodes STATE only. Everything else — evidence, qualifier,
   mode coverage, repo pointer — is metadata shown in the inspector panel, never
   in hue. One state per node. States drawn from current repo truth (milestone 14
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
    stamp: { source: 'source-v5', render: 'render-v7', date: '2026-06-18' },
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
    // Left-to-right: brand campaign → marketing → collection → SKU-driven.
    { id: 'm-campaign', group: 'mode', label: 'brand campaign / editorial', state: 'partial',
      evidence: 'Bounded full-flow at PKT-CAMP-004 (one packet, three slots).',
      qualifier: 'bounded operational depth', pointer: 'docs/campaign-mode-fork-resolver-test-phase-d-findings-v1.md' },
    { id: 'm-marketing', group: 'mode', label: 'marketing / message-driven', state: 'partial',
      evidence: 'Bounded full-flow at the message-hero slot — the 2c in-base proof: generation → candidate accumulation → authorship-bearing selection → governed ASSET-MSG-HG-001-HERO-001, no external import.',
      qualifier: 'message-hero slot only; support slot held; full mode not closed', pointer: 'docs/architecture.md §Evidence Depth' },
    { id: 'm-collection', group: 'mode', label: 'collection / merchandising', state: 'earned',
      evidence: 'Full-flow at PKT-COLL-001; the composite-anchor mutation was operationally deflated here.',
      pointer: 'docs/collection-mode-operational-test-findings-v1.md' },
    { id: 'm-sku', group: 'mode', label: 'SKU-driven', state: 'earned',
      evidence: 'Full-flow generation → curation → governance at PKT-SKU-007 / 009 / 010.',
      pointer: 'docs/architecture.md §Evidence Depth' },

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
      evidence: 'Transient generated attachments; operationally exercised across all four modes (marketing now live at the message-hero slot via the 2c in-base proof).',
      qualifier: 'earned where operationally pressured; marketing at bounded message-hero-slot depth',
      pointer: 'docs/architecture.md', modes: ['m-sku','m-collection','m-campaign','m-marketing'] },
    { id: 's-curation', group: 'spine', label: 'curation seam', state: 'earned',
      evidence: 'Governance carriers operational (asset_attachment · curation_pattern · curator); the 2c marketing-hero selection was authorship-bearing.',
      qualifier: 'earned where operationally pressured; marketing at bounded message-hero-slot depth; the authorship-bearing vs governance-bearing split is a held sub-question',
      pointer: 'docs/architecture.md §Curation', modes: ['m-sku','m-collection','m-campaign','m-marketing'] },
    { id: 's-governed', group: 'spine', label: 'governed-asset layer', state: 'earned',
      evidence: 'asset_attachment self-contained writeback; durable terminal output (marketing governed asset ASSET-MSG-HG-001-HERO-001 produced in-base).',
      qualifier: 'earned where operationally pressured; marketing at bounded message-hero-slot depth',
      pointer: 'docs/architecture.md', modes: ['m-sku','m-collection','m-campaign','m-marketing'] },

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
    { id: 'q-portability', group: 'question', label: 'portable asset-definition package · extractability', state: 'partial',
      evidence: 'Milestone 14 separated the frontier into three questions. Recovery: earned (2c package held in a file-bundle second substrate, recovered 8/8). Auditability: holds at carrier-class depth (no-image-byte boundary; hashes + durable pointers sufficient; gap is carrier-completeness, not byte-storage). Consumability: the deployment-diagnostic application grammar is category-mismatched to a package instance (10/10 FAIL) — the redirect.',
      qualifier: 'narrow — one package, one second substrate; visual-payload work down-ranked as premature; package-shaped consumer design unauthorized',
      pointer: 'docs/architecture.md §Portability / Extractability', modes: ['m-marketing'] },
    { id: 'q-package-consumer', group: 'question', label: 'what consumes a package?', state: 'partial',
      evidence: 'Milestone 15 names a first operational consumer — a package-instantiation planning agent — and formally calibrates it on one known-achievable filesystem target (run 1): a faithful dual-cited instantiation brief derived from the package alone, blind to the prior instantiation, classifying gaps instead of inventing.',
      qualifier: 'first operational consumer calibrated at run-1 (one package, one target, two runners); no consuming grammar; next evidence = a materially different second target',
      pointer: 'docs/package-instantiation-consumer-evidence-boundary-v1.md', modes: ['m-marketing'] },

    // ---- external ----
    { id: 'x-design-system', group: 'external', label: 'design-system-ASK foundations', state: 'external',
      evidence: 'diagram-tree · diagram-spine-static · ASK Spectral State — inherited from design-system-ASK by reference; AP is the consumer.',
      pointer: 'docs/diagrams/_dsa-tokens/MANIFEST.md' },
  ],
};
