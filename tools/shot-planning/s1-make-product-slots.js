// Make product slots (S1) // the Make product slots button on a Product pages request.
// For each line of the request, S1 reads the product's recorded assignment. If the product has an
// adopted, Complete shot guide, S1 makes one product-page slot for each active guide slot in the
// guide's adopted definition that has no slot record yet, keyed by line, product, guide and guide
// slot. It copies the kept slot plan by value in the create call, from the live guide slot and the
// guide's Adopted version, with Kept plan written at, and sets Fulfillment from the Fill rule. It
// writes the request's Slot planning note: what it made, and each line or key it made nothing for,
// with the next step.
// It never substitutes a grid for a missing guide, never remakes a key that has a record (a waived,
// held, stale or withdrawn one included), never changes an existing slot, and never carries an
// earlier version's waivers or departures over: it lists them for a new decision. It makes no
// decision: it applies adopted guides and recorded assignments.
// Level 0: it reads once and creates only what is missing. Presses one after another never
// duplicate; two overlapping presses can, and the slot pair check shows it (§7.3).
// Tables and fields come from this action's inputs, by ID or name; see README.md.
const cfg = input.config();
const recordId = cfg.recordId;

// Resolve every binding, and check its field type, before reading or writing anything.
const tables = {
  R: base.getTable(cfg.requestsTable), L: base.getTable(cfg.linesTable), P: base.getTable(cfg.productsTable),
  G: base.getTable(cfg.guidesTable), GS: base.getTable(cfg.guideSlotsTable), S: base.getTable(cfg.slotsTable),
};
const bind = (t, key, ...types) => {
  if (!cfg[key]) throw new Error(`S1: input ${key} is missing`);
  const f = tables[t].getField(cfg[key]);
  if (!types.includes(f.type)) throw new Error(`S1: ${key} must be of type ${types.join(' or ')}, not ${f.type}`);
  return f.id;
};
const TEXT = ['singleLineText', 'multilineText'];
const R = {
  workflow: bind('R', 'requestWorkflowField', 'singleSelect'),
  superseded: bind('R', 'requestSupersededField', 'count', 'rollup', 'formula'),
  supersedes: bind('R', 'requestSupersedesField', 'multipleRecordLinks'),
  lines: bind('R', 'requestLinesField', 'multipleRecordLinks'),
  name: bind('R', 'requestNameField', ...TEXT),
  test: bind('R', 'requestTestField', 'checkbox'),
  note: bind('R', 'slotPlanningNoteField', 'multilineText'),
};
const L = {
  product: bind('L', 'lineProductField', 'multipleRecordLinks'),
  test: bind('L', 'lineTestField', 'checkbox'),
};
const P = {
  name: bind('P', 'productNameField', ...TEXT),
  guideId: bind('P', 'assignedGuideIdField', 'formula'),
  check: bind('P', 'assignmentCheckField', 'formula'),
  intact: bind('P', 'productRecordIntactField', 'formula'),
};
const G = {
  name: bind('G', 'guideNameField', ...TEXT),
  complete: bind('G', 'guideCompleteField', 'formula'),
  status: bind('G', 'guideStatusField', 'formula'),
  adopted: bind('G', 'adoptedDefinitionField', 'multilineText'),
  version: bind('G', 'adoptedVersionField', 'number'),
};
const GS = {
  name: bind('GS', 'gsNameField', ...TEXT),
  guide: bind('GS', 'gsGuideField', 'multipleRecordLinks'),
  position: bind('GS', 'gsPositionField', 'number'),
  placement: bind('GS', 'gsPlacementField', ...TEXT),
  view: bind('GS', 'gsViewField', ...TEXT),
  required: bind('GS', 'gsRequiredField', 'singleSelect'),
  fill: bind('GS', 'gsFillRuleField', 'singleSelect'),
  retired: bind('GS', 'gsRetiredField', 'checkbox'),
  line: bind('GS', 'gsDefinitionLineField', 'formula'),
};
const S = {
  name: bind('S', 'slotNameField', 'singleLineText'),
  line: bind('S', 'slotLineField', 'multipleRecordLinks'),
  guideSlot: bind('S', 'slotGuideSlotField', 'multipleRecordLinks'),
  product: bind('S', 'slotProductField', 'multipleRecordLinks'),
  request: bind('S', 'slotRequestField', 'multipleRecordLinks'),
  keptLine: bind('S', 'keptDefinitionLineField', ...TEXT),
  keptGuideId: bind('S', 'keptGuideIdField', 'singleLineText'),
  keptProductId: bind('S', 'keptProductIdField', 'singleLineText'),
  keptVersion: bind('S', 'keptGuideVersionField', 'number'),
  keptGuideName: bind('S', 'keptGuideNameField', 'singleLineText'),
  keptSlotName: bind('S', 'keptSlotNameField', 'singleLineText'),
  keptPosition: bind('S', 'keptPositionField', 'number'),
  keptPlacement: bind('S', 'keptPlacementField', 'singleLineText'),
  keptView: bind('S', 'keptViewField', ...TEXT),
  keptRequired: bind('S', 'keptRequiredField', 'singleLineText'),
  keptFill: bind('S', 'keptFillRuleField', 'singleLineText'),
  planKept: bind('S', 'planKeptField', 'checkbox'),
  writtenAt: bind('S', 'keptPlanWrittenAtField', 'dateTime'),
  fulfillment: bind('S', 'fulfillmentField', 'singleSelect'),
  test: bind('S', 'slotTestField', 'checkbox'),
  key: bind('S', 'slotKeyField', 'formula'),
  withdrawnBox: bind('S', 'withdrawnField', 'checkbox'),
  withdrawn: bind('S', 'validlyWithdrawnField', 'formula'),
  held: bind('S', 'heldField', 'formula'),
  waived: bind('S', 'waivedField', 'formula'),
  stale: bind('S', 'staleField', 'formula'),
  obligation: bind('S', 'obligationUnchangedField', 'formula'),
  liveShots: bind('S', 'slotLiveShotCountField', 'count', 'rollup', 'formula'), // its shots that aren't Withdrawn
  shotAccepted: bind('S', 'shotAcceptedField', 'formula'),
  status: bind('S', 'slotStatusField', 'formula'),
  recordedNotNeeded: bind('S', 'recordedNotNeededField', 'checkbox'),
  departure: bind('S', 'departureField', 'formula'),
  summary: bind('S', 'recordedSummaryField', 'singleLineText', 'multilineText'),
};

// The guide's fill rules (v6 §4) and the fulfillment each gives.
const FULFILLMENT_OF = { 'Made for each product': 'Make', 'Shared across sizes of one style and color': 'Share', 'An accepted image that shows the product': 'An accepted image' };
const text = v => (v == null ? '' : String(v)).trim();
const num = v => (typeof v === 'number' ? v : 0);
const ids = v => (v || []).map(x => x.id);
const nameOf = v => (v ? v.name : '');

async function main() {
  const req = await tables.R.selectRecordAsync(recordId, { fields: Object.values(R) });
  if (!req) { console.log('skip: request not found'); return; }
  const at = new Date().toISOString();
  const head = `Make product slots, ${at}:`;
  const writeNote = async lines => { await tables.R.updateRecordAsync(recordId, { [R.note]: [head, ...lines].join('\n') }); console.log(lines.join(' / ')); };

  // Refusals: a superseded request, or one that isn't a Product pages request. Nothing is made.
  if (num(req.getCellValue(R.superseded)) > 0) return writeNote(['Nothing was made: this request is superseded by a later version. Plan in the later version.']);
  const workflow = nameOf(req.getCellValue(R.workflow));
  if (workflow !== 'Product pages') return writeNote([`Nothing was made: Make product slots is for Product pages requests, and this request's Workflow is ${workflow ? `"${workflow}"` : 'empty'}.`]);

  // One read of each table.
  const lineIds = ids(req.getCellValue(R.lines));
  const lines = lineIds.length ? (await tables.L.selectRecordsAsync({ fields: Object.values(L), recordIds: lineIds })).records : [];
  const products = new Map((await tables.P.selectRecordsAsync({ fields: Object.values(P) })).records.map(r => [r.id, r]));
  const guides = new Map((await tables.G.selectRecordsAsync({ fields: Object.values(G) })).records.map(r => [r.id, r]));
  const guideSlots = (await tables.GS.selectRecordsAsync({ fields: Object.values(GS) })).records;
  const slots = (await tables.S.selectRecordsAsync({ fields: Object.values(S) })).records;
  const byKey = new Map();
  for (const s of slots) { const k = text(s.getCellValue(S.key)); if (!byKey.has(k)) byKey.set(k, []); byKey.get(k).push(s); }

  const made = [], out = [];
  let already = 0, kept = 0;
  const requestTest = !!req.getCellValue(R.test);
  for (const lineId of lineIds) {
    const line = lines.find(l => l.id === lineId);
    if (!line) { out.push(`Line ${lineId}: not found; nothing was made for it.`); continue; }
    const pid = ids(line.getCellValue(L.product));
    if (pid.length !== 1) { out.push(`${line.name}: ${pid.length ? 'more than one product' : 'no product'} on this line; nothing was made for it.`); continue; }
    const product = products.get(pid[0]);
    if (!product) { out.push(`${line.name}: its product is missing; nothing was made for it.`); continue; }
    const pname = text(product.getCellValue(P.name)) || product.id;
    const check = text(product.getCellValue(P.check));
    const guideId = text(product.getCellValue(P.guideId));
    if (num(product.getCellValue(P.intact)) !== 1) { out.push(`${pname}: its assignment record was edited by hand: check it, then press Record decision on the product; nothing was made for it.`); continue; }
    if (!guideId || check === 'Assignment not recorded') { out.push(`${pname}: no adopted shot guide (assignment not recorded); nothing was made for it.`); continue; }
    if (check !== 'Recorded') { out.push(`${pname}: an assignment change waits for its decision record; nothing was made for it.`); continue; }
    const guide = guides.get(guideId);
    if (!guide) { out.push(`${pname}: its recorded shot guide is missing; nothing was made for it.`); continue; }
    if (num(guide.getCellValue(G.complete)) !== 1) { out.push(`${pname}: no adopted shot guide (${text(guide.getCellValue(G.name))}: ${text(guide.getCellValue(G.status))}); nothing was made for it.`); continue; }

    // The guide slots in the adopted definition that aren't retired. A Complete guide's definition
    // equals its adopted text, so each such guide slot's live Definition line is a whole adopted line.
    const adopted = guide.getCellValue(G.adopted) || '';
    const version = num(guide.getCellValue(G.version));
    const inGuide = guideSlots
      .filter(gs => ids(gs.getCellValue(GS.guide)).includes(guideId) && !gs.getCellValue(GS.retired))
      .filter(gs => { const l = text(gs.getCellValue(GS.line)); return l && adopted.includes(l); })
      .sort((a, b) => num(a.getCellValue(GS.position)) - num(b.getCellValue(GS.position)));
    const lineTest = !!line.getCellValue(L.test) || requestTest;
    for (const gs of inGuide) {
      const position = num(gs.getCellValue(GS.position));
      const label = `${pname} · ${position}`;
      const key = `${line.id}/${product.id}/${guideId}/${gs.id}`;
      const existing = byKey.get(key) || [];
      const live = existing.filter(s => num(s.getCellValue(S.withdrawn)) !== 1);
      if (!existing.length) {
        const fill = nameOf(gs.getCellValue(GS.fill));
        const id = await tables.S.createRecordAsync({
          [S.name]: `${pname} · ${position} ${text(gs.getCellValue(GS.name))}`,
          [S.line]: [{ id: line.id }],
          [S.guideSlot]: [{ id: gs.id }],
          [S.product]: [{ id: product.id }],
          [S.request]: [{ id: recordId }],
          [S.keptLine]: text(gs.getCellValue(GS.line)),
          [S.keptGuideId]: guideId,
          [S.keptProductId]: product.id,
          [S.keptVersion]: version,
          [S.keptGuideName]: text(guide.getCellValue(G.name)),
          [S.keptSlotName]: text(gs.getCellValue(GS.name)),
          [S.keptPosition]: position,
          [S.keptPlacement]: text(gs.getCellValue(GS.placement)),
          [S.keptView]: text(gs.getCellValue(GS.view)),
          [S.keptRequired]: nameOf(gs.getCellValue(GS.required)),
          [S.keptFill]: fill,
          [S.planKept]: true,
          [S.writtenAt]: new Date().toISOString(),
          [S.fulfillment]: FULFILLMENT_OF[fill] ? { name: FULFILLMENT_OF[fill] } : null,
          [S.test]: lineTest,
        });
        made.push(`${pname} · ${position} ${text(gs.getCellValue(GS.name))}`);
        console.log(`made ${id}`);
        continue;
      }
      // Every record ticked Withdrawn, valid or not: say so (§7.3). Otherwise the records that
      // aren't validly withdrawn are the key's.
      if (existing.every(s => s.getCellValue(S.withdrawnBox))) { out.push(`${label}: every record is withdrawn. If it is still required, untick Withdrawn on one.`); continue; }
      if (live.length > 1) { out.push(`${label}: ${live.length} records have this slot's key: see the slot pair check.`); continue; }
      const s = live[0];
      if (num(s.getCellValue(S.held)) === 1) { out.push(`${label}: ${text(s.getCellValue(S.status))}.`); continue; }
      if (num(s.getCellValue(S.waived)) === 1) { out.push(`${label}: kept as not needed.`); kept++; continue; }
      if (num(s.getCellValue(S.stale)) === 1) {
        const step = num(s.getCellValue(S.obligation)) !== 1 ? 'plan it in a new version of the request'
          : num(s.getCellValue(S.liveShots)) === 0 || num(s.getCellValue(S.shotAccepted)) === 1 ? 'press Replan on this slot' : 'press Replan on its shot';
        out.push(`${label}: changed by the adopted guide; ${step}.`);
        continue;
      }
      already++;
    }
  }

  // A new version: the earlier version's waivers and departures, to decide again. None is carried over.
  // Listed product by product: a slot's name begins with its product's name, then its position.
  const earlier = [];
  for (const prev of ids(req.getCellValue(R.supersedes))) {
    const listed = slots.filter(s => ids(s.getCellValue(S.request)).includes(prev) && (s.getCellValue(S.recordedNotNeeded) || num(s.getCellValue(S.departure)) === 1))
      .map(s => [text(s.getCellValue(S.name)), text(s.getCellValue(S.summary))])
      .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
    for (const [n, summary] of listed) earlier.push(`- ${n}: ${summary}`);
  }

  const note = [];
  note.push(made.length ? `Made ${made.length} slot${made.length === 1 ? '' : 's'}: ${made.join('; ')}.` : 'Made no new slot.');
  if (already) note.push(`Already made: ${already} slot${already === 1 ? '' : 's'}.`);
  if (kept) note.push(`Kept as not needed: ${kept} slot${kept === 1 ? '' : 's'}.`);
  note.push(...out);
  if (earlier.length) note.push('The earlier version\'s waivers and departures, to decide again here; none was carried over:', ...earlier);
  await writeNote(note);
}

await main();
