/* asset-pipeline-ASK_architecture-tree.source.js
   Source data for the asset-pipeline-ASK architecture tree diagram.
   Renderable by diagrams-engine.js.

   D04 // asset-pipeline-ASK architecture tree // source-v2 // 2026-05-26
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
  note: 'information architecture for visual asset production // single-node downstream pressure surface',
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
        { label: 'milestone 12', note: 'multi-axis carrier-pattern plateau · recurrence across three architecturally-distinct seams · sharpened-not-closed' },
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
        { label: 'operationally grounded full-flow', note: 'SKU-driven mode · collection / merchandising mode · brand campaign / editorial mode at bounded depth' },
        { label: 'bounded operational depth' },
        { label: 'structurally proven', note: 'marketing / message-driven mode · campaign-mode structural proof · cross-base + cross-brand at bounded depth' },
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
        { label: 'milestones', tag: 'docs/milestones/', children: [
          { label: 'milestone 12 // multi-axis carrier-pattern plateau' },
          { label: 'milestone 11 // Zone 6 / Option F trace carrier shape plateau' },
          { label: 'milestone 10 // Phase 2 six-category synthesis plateau' },
          { label: 'milestone 9 // curation semantic split + brand-system decision surface plateau' },
          { label: 'milestone 8 // Phase 2 structured-model plateau' },
          { label: 'milestone 7 // v1 sweep closure plateau' },
        ]},
        { label: 'structured IA docs', tag: 'docs/', children: [
          { label: 'structured-ia-model-v2.md' },
          { label: 'structured-ia-v2-consumer-preflight-v1.md' },
          { label: 'structured-ia-model-v1.md', status: 'legacy' },
        ]},
        { label: 'architecture depth docs', tag: 'docs/', children: [
          { label: 'architecture-apex-definition-layer-v1.md' },
          { label: 'normative-force-and-durable-layer-pressure-v1.md' },
          { label: 'layered-reference-and-discretion-architecture-v1.md' },
          { label: 'brand-system-carrier-decision-surface-v2.md' },
          { label: 'brand-discovery-digestion-layered-intake-architecture-v1.md' },
          { label: 'brand-system-input-cross-category-synthesis-v1.md' },
          { label: 'campaign-mode-fork-resolver-test-phase-d-findings-v1.md' },
          { label: 'evidence-depth-asymmetry-assessment-brief-v1.md' },
          { label: 'architecture-front-door-compression-brief-v1.md' },
        ]},
        { label: 'application docs', tag: 'docs/application/' },
        { label: 'AGENTS.md', note: 'single-node operating model · agent-agnostic workflow rules' },
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
