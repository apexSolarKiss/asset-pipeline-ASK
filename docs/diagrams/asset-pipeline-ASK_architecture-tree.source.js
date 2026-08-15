/* asset-pipeline-ASK_architecture-tree.source.js
   Source data for the asset-pipeline-ASK architecture tree diagram.
   Renderable by diagrams-engine.js.

   D04 // asset-pipeline-ASK architecture tree // source-v8 // 2026-08-15
   v8 (2026-08-15): milestone-16 state-surface refresh. The current-plateau carrier moves
   to milestone 16 (PostgreSQL second target exercised at constructive-instantiation
   depth) while milestone 14 remains the governing architecture posture. Adds the
   PostgreSQL constructive-instantiation portability leg, the evidence-boundary routing
   entry, and milestone 16 to the milestone routing list. Retires "next evidence = a
   materially different second target" as an unperformed move and replaces it with the
   target-exercised / consumer-repetition-untested split, partitioned so the earned
   target-diversity + representation-legibility finding sits in the default-earned node and
   only consumer repetition / consuming grammar carry status:'held'. State-surface data only;
   no new architecture claim. Content-only; render held render-v16.
   v7 (2026-07-25): operating-model current truth per control-surface#171. The retired
   "single-node" label is removed from the root note and the AGENTS.md node, which now
   names the adversarial-collaboration operating model (ASK-apexed advisor-executor
   topology). No architecture, IA, mode, carrier, or evidence-depth content changed. The
   repo's aesthetic-layering inheritance/override vocabulary is a separate domain term set
   and is untouched. Content-only; render held render-v16.
   Single-tree extraction from the operator-side ecology-ASK diagram package
   following the Class A repo-native diagram-bundle pattern proven across
   apexSolarKiss/control-surface (D01) and apexSolarKiss/method-ASK (D02).
   This repo carries TREE_D04 only.

   Each TREE follows the same shape:
     { kind: 'root'|'section'|'group'|'node', label, note?, tag?, status?, children? }
     status: 'earned' (default) | 'held' | 'legacy'
*/

window.TREE_D04 = {
  kind: 'root',
  label: 'asset-pipeline-ASK',
  note: 'information architecture for visual asset production // downstream pressure surface',
  children: [
    {
      kind: 'section', label: 'current architecture front door',
      tag: 'docs/architecture.md',
      children: [
        { label: 'purpose / current posture' },
        { label: 'current architecture shape', note: 'eight IA layers · four worked-example modes · five carrier types · normative-force vocabulary · fallback chain' },
        { label: 'evidence depth' },
        { label: 'structured form and consumers' },
        { label: 'application-layer outputs' },
        { label: 'held questions / parked surfaces' },
        { label: 'source-of-truth routing' },
        { label: 'what remains out of scope' },
      ],
    },
    {
      kind: 'section', label: 'current plateau',
      children: [
        { label: 'milestone 16 // latest evidence plateau', note: 'PostgreSQL second target exercised at constructive-instantiation depth · one frozen package concretely instantiated in PostgreSQL 17.11 · tested source semantics preserved and recoverable · no target incompatibility established · target diversity exercised; calibrated consumer repetition on target two NOT tested; consuming grammar NOT earned · no further PostgreSQL or generic portability run opens by default' },
        { label: 'milestone 14 // governing architecture posture', note: 'portability frontier separation · recovery (earned) / auditability (carrier-class) / consumability (redirect) · the deployment-diagnostic grammar is the wrong consumer for a package instance · open question: what consumes a package, and is one needed' },
      ],
    },
    {
      kind: 'section', label: 'portability / extractability',
      tag: 'docs/architecture.md §Portability',
      note: 'milestone 14: the frontier separated into three distinct questions',
      children: [
        { kind: 'group', label: 'recovery (earned)', children: [
          { label: 'data-shape extraction (SKU slice)', note: 'representative SKU slice → JSON Schema + minimal instance · data shape portable; interpretive / procedural layer not yet portable' },
          { label: 'package extraction (proven 2c instance)', note: 'proven 2c marketing-hero package re-expressed outside Airtable · prose walk + tool-agnostic YAML · walked to instantiation-plan depth' },
          { label: 'worked package store · recovery 8/8', note: 'proven 2c package held in a file-bundle second substrate · recovered from the store alone (8/8 PASS) · substrate-neutral keys; Airtable couplings quarantined' },
        ]},
        { kind: 'group', label: 'second target · PostgreSQL (milestone 16)', children: [
          { label: 'constructive instantiation + assisted recovery · target diversity exercised', note: 'the same frozen package concretely instantiated in PostgreSQL 17.11 — a materially different, typed relational target · verified against the fixture (160 passed / 0 failed) · twelve executed recovery surfaces · one instruction-isolated assisted-recovery pass · tested source semantics preserved and recoverable · no target incompatibility established · the representation carried package→slot containment and the AP lifecycle classification but not the inheritance rule explaining lawful slot-level narrowing — representation legibility, not package contradiction' },
          { label: 'consumer repetition NOT tested · consuming grammar NOT earned', note: 'the calibrated package-instantiation consumer was not rerun on PostgreSQL — this leg was an executor-authored prototype · no further PostgreSQL or generic portability run opens by default', status: 'held' },
        ]},
        { label: 'auditability · carrier-class (byte-boundary run)', note: 'no-image-byte boundary holds at carrier-class depth · hashes + durable pointers sufficient · gap is carrier-completeness, not byte-storage' },
        { label: 'consumability · the redirect (consuming-artifact run)', note: 'deployment-diagnostic implementation-roadmap / system-map grammar is category-mismatched to a package instance · 0 PASS / 0 PARTIAL / 10 FAIL source-type mismatch · package is a governed-output instance, not a deployment intake', status: 'held' },
        { label: 'claim boundary', note: 'earned: recovery (one package, one second substrate) + auditability (carrier-class) + a first operational consumer calibrated run-1 + one materially different relational target exercised at constructive-instantiation depth · not earned: a consuming grammar · repeatable package consumer · package grammar · runtime consumer · image-byte storage · schema / v3 · general PostgreSQL compatibility · all-package portability' },
        { kind: 'group', label: 'package-instantiation consumer (milestone 15)', children: [
          { label: 'first operational consumer · calibrated run-1', note: 'the consumability redirect named a first operational consumer — a package-instantiation planning agent · formally calibrated on one known-achievable filesystem target (run 1) · faithful dual-cited instantiation brief from the package alone, blind to the prior instantiation · gaps classified, not invented' },
          { label: 'not earned (run-1 bounds)', note: 'no consuming grammar · no general converter · no schema / runtime · the materially-different-second-target condition has since been exercised at constructive depth (milestone 16), but calibrated consumer repetition on target two remains untested', status: 'held' },
        ]},
        { kind: 'group', label: 'next frontier questions', children: [
          { label: 'what consumes a package? · is one needed', note: 'milestone 15: answered at first-operational-consumer depth (package-instantiation planning agent, calibrated run-1); the consuming-grammar question stays open · or the package role may already be complete (portable / auditable / exemplary)', status: 'held' },
          { label: 'visual-payload portability (down-ranked as premature)', status: 'held' },
          { label: 'consuming grammar (needs calibrated consumer repetition, not another target)', note: 'milestone 16 exercised a materially different target; the remaining unearned step is repetition of the calibrated package-instantiation consumer on target two · no further PostgreSQL or generic portability run opens by default', status: 'held' },
        ]},
      ],
    },
    {
      kind: 'section', label: 'structured form',
      children: [
        { label: 'structured IA model v2', note: 'hybrid prose + YAML appendix · seventeen top-level keys · canonical machine-readable enumeration' },
        { label: 'structured IA v2 consumer preflight', note: 'reads v2 against seven candidate structured consumers · names threshold for v3 absorption' },
        { label: 'structured IA model v1', note: 'predecessor structured form · authoritative for v1 content depth', status: 'legacy' },
      ],
    },
    {
      kind: 'section', label: 'application layer',
      tag: 'docs/application/',
      children: [
        { label: 'implementation roadmap + system map artifact grammar', note: 'first generated-output artifact grammar · ten-section skeleton' },
        { label: 'application-consumer pressure pass', note: 'reads grammar back into architecture · surfaces conceptual-vs-vocabular split' },
        { label: 'consuming-artifact run · package as source', note: 'operational successor to the pressure pass · grammar is category-mismatched to a package instance (10/10 FAIL) · the redirect', status: 'held' },
        { label: 'application subtree README routing' },
        { kind: 'group', label: 'sibling substrates', children: [
          { label: 'Airtable base-plan grammar', status: 'held' },
          { label: 'Python scaffold grammar', status: 'held' },
          { label: 'DAM taxonomy grammar', status: 'held' },
          { label: 'operating-documentation grammar', status: 'held' },
          { label: 'HTML system-map grammar', status: 'held' },
        ]},
      ],
    },
    {
      kind: 'section', label: 'evidence depth',
      children: [
        { label: 'operationally grounded full-flow', note: 'SKU-driven mode · collection / merchandising mode · brand campaign / editorial mode at bounded depth · marketing / message-driven mode at bounded message-hero-slot depth (the 2c in-base proof; support slot held)' },
        { label: 'bounded operational depth' },
        { label: 'structurally proven', note: 'marketing / message-driven earlier PKT-MSG-001 probe (findings-only) · campaign-mode structural proof · cross-base + cross-brand at bounded depth' },
        { label: 'paper-pressed', note: 'cross-mode composite-anchor · selection-axis enum · brand-platform / brand-wide-constants entities · approval-state metadata · several held schema candidates' },
        { label: 'application-consumer validated', note: 'one conceptual consumer; one execution instance at synthetic-realistic depth (operator-side)' },
        { label: 'structured-consumer preflighted', note: 'zero structured consumers live · seven candidates named at preflight depth' },
      ],
    },
    {
      kind: 'section', label: 'held questions / parked surfaces',
      children: [
        { label: 'curation-premise architectural fork', note: 'bounded refines reading · curation semantic split (authorship-bearing discretion vs governance-bearing curation)' },
        { label: 'brand-system layer status', note: 'Zone 1A structurally earned · Zone 1B residual held · Zone 2 deliberate prose · Zones 3-6 rerouted to adjacent layers' },
        { label: 'scale-of-operation held question', note: 'operator-continuity vs structural-trace pattern · multi-axis recurrence across three seams · sharpened-not-closed across all axes' },
        { kind: 'group', label: 'inventory', children: [
          { label: 'apex named limitations', status: 'held' },
          { label: 'composite-anchor structure', status: 'held' },
          { label: 'inferred-not-stated structural representation', status: 'held' },
          { label: 'fallback-chain-position structural representation', status: 'held' },
          { label: 'operator-judgment representation', status: 'held' },
          { label: 'validator integration', status: 'held' },
          { label: 'Phase 3 demonstration', status: 'held' },
        ]},
      ],
    },
    {
      kind: 'section', label: 'source-of-truth routing',
      children: [
        { label: 'milestones', note: 'docs/milestones/', children: [
          { label: 'milestone 16 // PostgreSQL second-target evidence plateau' },
          { label: 'milestone 15 // resolution calculus + package-instantiation consumer evidence plateau' },
          { label: 'milestone 14 // portability frontier separation' },
          { label: 'milestone 13 // portability evidence plateau' },
          { label: 'milestone 12 // multi-axis carrier-pattern plateau' },
          { label: 'milestone 11 // Zone 6 / Option F trace carrier shape plateau' },
          { label: 'milestone 10 // Phase 2 six-category synthesis plateau' },
          { label: 'milestone 9 // curation semantic split + brand-system decision surface plateau' },
          { label: 'milestone 8 // Phase 2 structured-model plateau' },
          { label: 'milestone 7 // v1 sweep closure plateau' },
        ]},
        { label: 'structured IA docs', note: 'docs/', children: [
          { label: 'structured-ia-model-v2.md' },
          { label: 'structured-ia-v2-consumer-preflight-v1.md' },
          { label: 'structured-ia-model-v1.md', status: 'legacy' },
        ]},
        { label: 'portability docs', note: 'docs/', children: [
          { label: 'non-airtable-extraction-attempt-v1.md' },
          { label: 'portable-package-extraction-2c-marketing-hero-v1.md' },
          { label: 'worked-package-store-2c-marketing-hero/' },
          { label: 'byte-boundary-auditability-test-definition-v1.md' },
          { label: 'byte-boundary-auditability-test-findings-v1.md' },
          { label: 'consuming-artifact-test-definition-v1.md' },
          { label: 'consuming-artifact-test-findings-v1.md' },
          { label: 'package-instantiation-consumer-evidence-boundary-v1.md' },
          { label: 'postgresql-constructive-instantiation-and-recovery-evidence-boundary-v1.md' },
        ]},
        { label: 'architecture depth docs', note: 'docs/', children: [
          { label: 'architecture-apex-definition-layer-v1.md' },
          { label: 'normative-force-and-durable-layer-pressure-v1.md' },
          { label: 'layered-reference-and-discretion-architecture-v1.md' },
          { label: 'brand-system-carrier-decision-surface-v2.md' },
          { label: 'brand-discovery-digestion-layered-intake-architecture-v1.md' },
          { label: 'brand-system-input-cross-category-synthesis-v1.md' },
          { label: 'campaign-mode-fork-resolver-test-phase-d-findings-v1.md' },
          { label: 'evidence-depth-asymmetry-assessment-brief-v1.md' },
          { label: 'architecture-front-door-compression-brief-v1.md' },
          { label: 'resolution-calculus-evidence-boundary-v1.md' },
        ]},
        { label: 'application docs', note: 'docs/application/' },
        { label: 'AGENTS.md', note: 'adversarial-collaboration operating model · agent-agnostic workflow rules' },
        { label: 'docs/index.md', note: 'full repo navigation' },
      ],
    },
    {
      kind: 'section', label: 'out-of-scope boundaries',
      children: [
        { label: 'PR-by-PR chronology', note: 'lives in milestones, not the front door' },
        { label: 'candidate-next-pressure-surface enumeration', note: 'subsequent pressure is a fresh strategic decision' },
        { label: 'held-candidate adjudication', note: 'no map authorized' },
        { label: 'schema / validator / orchestration commitment' },
        { label: 'application substrate implementation' },
        { label: 'operator-side source-of-intent', note: 'externality discipline · grounding-note content stays operator-side' },
        { label: 'per-mode content articulation', note: 'lives in Phase 1 mode sketches' },
        { label: 'per-input-category mapping', note: 'lives in Phase 2 deepenings' },
        { label: 'per-packet operational findings' },
      ],
    },
  ],
};
