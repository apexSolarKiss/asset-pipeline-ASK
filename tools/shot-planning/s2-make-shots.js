// Make shots (S2) // the Make shots button on a request.
// On a Product pages request, S2 gives each active Make slot that is ok and has no shot its own
// shot, named for the slot ("Bath Vessel · 1 Front"), with Made as Make, its line in Lines in
// shot and its Pair key, all in the create call. It groups the active Share slots that are ok and
// have no shot by guide slot and product share key: a group whose slots share one share signature
// gets one shot, named by style and color ("Terry towel, white · 1 Folded"), with Made as Share and
// the first slot's line in the request's line order; a group whose facts differ gets none, and the
// note names the difference. A Share group that already has a shot gains a slot only when the
// slot's share signature equals the shot's and the shot has no accepted image. On a Collection
// request, it makes one shot per active guide slot of the request's adopted collection guide that
// has none, with its kept guide plan, Made as Collection and its Pair key.
// A shot counts as existing (a Make slot's shot, a Share group's shot, a Pair key) only while it
// fills an active slot and isn't Withdrawn, so an obsolete shot left by a guide-slot move or a
// changed line product never stops planning.
// It writes the request's Shot planning note: what it made or joined, and each slot it made
// nothing for, with its Status. It never changes a slot's fulfillment, a decision or a candidate,
// never writes an existing shot's own fields (a slot it joins to a shot is linked from the slot),
// never joins an accepted shot, and never shares across differing facts. It makes no decision: it
// applies the recorded plan.
// Level 0: it reads once and creates only what is missing. Presses one after another never
// duplicate; two overlapping presses can, and the shot pair checks show it (§7.3).
// Tables and fields come from this action's inputs, by ID or name; see README.md.
const cfg = input.config();
const recordId = cfg.recordId;

// Resolve every binding, and check its field type, before reading or writing anything.
const tables = {
  R: base.getTable(cfg.requestsTable), L: base.getTable(cfg.linesTable), P: base.getTable(cfg.productsTable),
  G: base.getTable(cfg.guidesTable), GS: base.getTable(cfg.guideSlotsTable), S: base.getTable(cfg.slotsTable),
  SH: base.getTable(cfg.shotsTable),
};
const bind = (t, key, ...types) => {
  if (!cfg[key]) throw new Error(`S2: input ${key} is missing`);
  const f = tables[t].getField(cfg[key]);
  if (!types.includes(f.type)) throw new Error(`S2: ${key} must be of type ${types.join(' or ')}, not ${f.type}`);
  return f.id;
};
const TEXT = ['singleLineText', 'multilineText'];
const LOOKUP = ['multipleLookupValues', 'rollup', 'formula'];
const R = {
  workflow: bind('R', 'requestWorkflowField', 'singleSelect'),
  superseded: bind('R', 'requestSupersededField', 'count', 'rollup', 'formula'),
  lines: bind('R', 'requestLinesField', 'multipleRecordLinks'),
  name: bind('R', 'requestNameField', ...TEXT),
  test: bind('R', 'requestTestField', 'checkbox'),
  note: bind('R', 'requestNoteField', 'multilineText'),
  guide: bind('R', 'requestCollectionGuideField', 'multipleRecordLinks'),
};
const L = {
  product: bind('L', 'lineProductField', 'multipleRecordLinks'),
  shareKey: bind('L', 'lineShareKeyField', ...LOOKUP),
  facts: bind('L', 'lineFactsField', ...LOOKUP),
};
const P = {
  name: bind('P', 'productNameField', ...TEXT),
  style: bind('P', 'productStyleField', ...TEXT),
  color: bind('P', 'productColorField', ...TEXT),
};
const G = {
  name: bind('G', 'guideNameField', ...TEXT),
  complete: bind('G', 'guideCompleteField', 'formula'),
  status: bind('G', 'guideStatusField', 'formula'),
  adopted: bind('G', 'guideAdoptedDefinitionField', 'multilineText'),
  version: bind('G', 'guideAdoptedVersionField', 'number'),
};
const GS = {
  name: bind('GS', 'gsNameField', ...TEXT),
  guide: bind('GS', 'gsGuideField', 'multipleRecordLinks'),
  position: bind('GS', 'gsPositionField', 'number'),
  placement: bind('GS', 'gsPlacementField', ...TEXT),
  view: bind('GS', 'gsViewField', ...TEXT),
  includes: bind('GS', 'gsIncludesField', 'singleSelect'),
  choose: bind('GS', 'gsChooseCountField', 'number'),
  retired: bind('GS', 'gsRetiredField', 'checkbox'),
  line: bind('GS', 'gsDefinitionLineField', 'formula'),
};
const S = {
  name: bind('S', 'slotNameField', 'singleLineText'),
  line: bind('S', 'slotLineField', 'multipleRecordLinks'),
  request: bind('S', 'slotRequestField', 'multipleRecordLinks'),
  shot: bind('S', 'slotShotField', 'multipleRecordLinks'),
  active: bind('S', 'slotActiveField', 'formula'),
  ok: bind('S', 'slotOkField', 'formula'),
  operative: bind('S', 'slotOperativeField', 'formula'),
  guideSlotId: bind('S', 'slotGuideSlotIdField', ...LOOKUP),
  signature: bind('S', 'slotShareSignatureField', ...LOOKUP),
  position: bind('S', 'slotPositionField', 'number'),
  slotName: bind('S', 'slotKeptSlotNameField', 'singleLineText'),
  status: bind('S', 'slotStatusField', 'formula'),
  waived: bind('S', 'slotWaivedField', 'formula'),
  withdrawn: bind('S', 'slotWithdrawnField', 'formula'),
  test: bind('S', 'slotTestField', 'checkbox'),
};
const SH = {
  name: bind('SH', 'shotNameField', 'singleLineText'),
  brief: bind('SH', 'shotBriefField', 'multipleRecordLinks'),
  lines: bind('SH', 'shotLinesField', 'multipleRecordLinks'),
  fromGuideSlot: bind('SH', 'shotFromGuideSlotField', 'multipleRecordLinks'),
  madeAs: bind('SH', 'shotMadeAsField', 'singleSelect'),
  plan: bind('SH', 'shotKeptGuidePlanField', 'multilineText'),
  pairKey: bind('SH', 'shotPairKeyField', 'singleLineText'),
  withdrawn: bind('SH', 'shotWithdrawnField', 'checkbox'),
  test: bind('SH', 'shotTestField', 'checkbox'),
  slots: bind('SH', 'shotSlotsFilledField', 'multipleRecordLinks'),
  accepted: bind('SH', 'shotAcceptedCountField', 'rollup', 'count', 'formula'),
  signature: bind('SH', 'shotLineShareSignatureField', ...LOOKUP),
};

const text = v => (v == null ? '' : String(v)).trim();
const num = v => (typeof v === 'number' ? v : 0);
const ids = v => (v || []).map(x => x.id);
const nameOf = v => (v ? v.name : '');
const str = (r, f) => text(r.getCellValueAsString(f)); // lookups and rollups, read as their text
const and = xs => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

async function main() {
  const req = await tables.R.selectRecordAsync(recordId, { fields: Object.values(R) });
  if (!req) { console.log('skip: request not found'); return; }
  const at = new Date().toISOString();
  const head = `Make shots, ${at}:`;
  const writeNote = async lines => { await tables.R.updateRecordAsync(recordId, { [R.note]: [head, ...lines].join('\n') }); console.log(lines.join(' / ')); };

  if (num(req.getCellValue(R.superseded)) > 0) return writeNote(['Nothing was made: this request is superseded by a later version. Plan in the later version.']);
  const workflow = nameOf(req.getCellValue(R.workflow));
  if (workflow === 'Product pages') return productPages(req, writeNote);
  if (workflow === 'Collection') return collection(req, writeNote);
  return writeNote(["Nothing was made: this request's shots are written in it."]);
}

// ---- Product pages
async function productPages(req, writeNote) {
  const lineIds = ids(req.getCellValue(R.lines));
  const requestTest = !!req.getCellValue(R.test);
  // One read of each table.
  const lines = new Map(lineIds.length ? (await tables.L.selectRecordsAsync({ fields: Object.values(L), recordIds: lineIds })).records.map(r => [r.id, r]) : []);
  const products = new Map((await tables.P.selectRecordsAsync({ fields: Object.values(P) })).records.map(r => [r.id, r]));
  const allSlots = (await tables.S.selectRecordsAsync({ fields: Object.values(S) })).records;
  const shots = new Map((await tables.SH.selectRecordsAsync({ fields: Object.values(SH) })).records.map(r => [r.id, r]));

  // GPT-B: a shot counts as existing only while it fills an active slot and isn't Withdrawn.
  const fillsActive = new Set();
  for (const s of allSlots) if (num(s.getCellValue(S.active)) === 1) for (const id of ids(s.getCellValue(S.shot))) fillsActive.add(id);
  const counts = id => { const shot = shots.get(id); return !!shot && !shot.getCellValue(SH.withdrawn) && fillsActive.has(id); };
  const liveShotOf = s => ids(s.getCellValue(S.shot)).filter(counts);
  const byPairKey = new Map();
  for (const shot of shots.values()) if (counts(shot.id)) { const k = text(shot.getCellValue(SH.pairKey)); if (!byPairKey.has(k)) byPairKey.set(k, []); byPairKey.get(k).push(shot); }

  // This request's slots, in the request's line order, then position.
  const lineOrder = new Map(lineIds.map((id, i) => [id, i]));
  const lineOf = s => ids(s.getCellValue(S.line))[0] || '';
  const slots = allSlots.filter(s => ids(s.getCellValue(S.request)).includes(recordId))
    .sort((a, b) => ((lineOrder.get(lineOf(a)) ?? 1e9) - (lineOrder.get(lineOf(b)) ?? 1e9)) || (num(a.getCellValue(S.position)) - num(b.getCellValue(S.position))));
  const productOf = s => { const l = lines.get(lineOf(s)); return l ? products.get(ids(l.getCellValue(L.product))[0]) : null; };
  const pname = s => { const p = productOf(s); return p ? text(p.getCellValue(P.name)) : text(s.getCellValue(S.name)); };
  const gsId = s => str(s, S.guideSlotId);
  const sig = s => str(s, S.signature);
  const shareKey = s => { const l = lines.get(lineOf(s)); return l ? str(l, L.shareKey) : ''; };
  const facts = s => { const l = lines.get(lineOf(s)); return l ? str(l, L.facts) : ''; };
  const op = s => text(s.getCellValue(S.operative));
  const isTest = list => requestTest || list.some(s => !!s.getCellValue(S.test));
  const label = s => text(s.getCellValue(S.name));

  const made = [], joined = [], out = [];
  let planned = 0;
  const create = async (list, cells) => {
    const id = await tables.SH.createRecordAsync({
      ...cells,
      [SH.brief]: [{ id: recordId }],
      [SH.slots]: list.map(s => ({ id: s.id })),
      [SH.test]: isTest(list),
    });
    console.log(`made ${id}`);
    return id;
  };
  // A pair key already held by a shot that counts: report it, make nothing (the shot pair check shows it).
  const pairTaken = (key, list) => {
    const held = byPairKey.get(key) || [];
    if (!held.length) return false;
    for (const s of list) out.push(`${label(s)}: a shot with its pair key already fills an active slot (${held.map(x => text(x.getCellValue(SH.name))).join(', ')}); no shot was made: see the shot pair check.`);
    return true;
  };
  // A slot linked only to a shot that doesn't count (withdrawn) is relinked by an update of its own.
  const relink = async (s, shotId) => { await tables.S.updateRecordAsync(s.id, { [S.shot]: [{ id: shotId }] }); };

  const waiting = [];
  for (const s of slots) {
    if (num(s.getCellValue(S.withdrawn)) === 1 || num(s.getCellValue(S.waived)) === 1) continue;
    if (op(s) !== 'Make' && op(s) !== 'Share') continue; // picked-up slots get no shot
    // A slot that isn't ok is listed with its Status, whether or not it has a shot (§7.3); only an
    // ok slot with a shot that counts is planned.
    if (num(s.getCellValue(S.ok)) !== 1) { out.push(`${label(s)}: ${text(s.getCellValue(S.status))}.`); continue; }
    if (liveShotOf(s).length) { planned++; continue; }
    waiting.push(s);
  }

  // Make slots: one shot each.
  for (const s of waiting.filter(x => op(x) === 'Make')) {
    const key = `${lineOf(s)}${gsId(s)}`;
    if (pairTaken(key, [s])) continue;
    const name = `${pname(s)} · ${num(s.getCellValue(S.position))} ${text(s.getCellValue(S.slotName))}`;
    const id = await create(ids(s.getCellValue(S.shot)).length ? [] : [s], {
      [SH.name]: name, [SH.lines]: [{ id: lineOf(s) }], [SH.madeAs]: { name: 'Make' }, [SH.pairKey]: key,
    });
    if (ids(s.getCellValue(S.shot)).length) await relink(s, id);
    made.push(name);
  }

  // Share slots: grouped by guide slot and product share key.
  const groups = new Map();
  for (const s of waiting.filter(x => op(x) === 'Share')) {
    const k = `${gsId(s)}\u0000${shareKey(s)}`;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(s);
  }
  for (const [k, group] of groups) {
    const [gid, key] = k.split('\u0000');
    // The group's shot: a Share shot of this request that one of the group's slots (in any state)
    // is linked to, and that counts.
    const theirs = new Set();
    for (const s of slots) if (gsId(s) === gid && shareKey(s) === key) for (const id of ids(s.getCellValue(S.shot))) {
      const shot = shots.get(id);
      if (shot && counts(id) && nameOf(shot.getCellValue(SH.madeAs)) === 'Share' && ids(shot.getCellValue(SH.brief)).includes(recordId)) theirs.add(id);
    }
    if (theirs.size > 1) {
      for (const s of group) out.push(`${label(s)}: its group has more than one shot (${[...theirs].map(id => text(shots.get(id).getCellValue(SH.name))).join(', ')}): see the shot pair check; it was not joined.`);
      continue;
    }
    if (theirs.size === 1) {
      const shot = shots.get([...theirs][0]), shotName = text(shot.getCellValue(SH.name));
      if (num(shot.getCellValue(SH.accepted)) > 0) {
        for (const s of group) out.push(`${label(s)}: its group's shot, ${shotName}, has an accepted image, so it wasn't joined: joining would change what that image was accepted for. To use an accepted image here, record a fulfillment departure to "An accepted image", with its reason, and apply a use decision; for a new shot, record a departure to Make, with its reason, and press Make shots again.`);
        continue;
      }
      const theirSig = str(shot, SH.signature);
      for (const s of group) {
        if (sig(s) !== theirSig) { out.push(`${label(s)}: not joined to ${shotName}: its facts differ from the shot's (${sig(s)} / ${theirSig}). If it is one style in another size, correct the facts and press again; if not, record a departure to Make.`); continue; }
        await relink(s, shot.id);
        joined.push(`${label(s)} → ${shotName}`);
      }
      continue;
    }
    const sigs = [...new Set(group.map(sig))];
    if (sigs.length > 1) {
      const names = [...new Set(group.map(pname))];
      out.push(`${and(names)} are ${names.length > 2 ? 'all' : 'both'} ${key}, but their facts differ: ${[...new Set(group.map(facts))].map(f => `"${f}"`).join(' / ')}. Nothing was shared. If they are one style in two sizes, correct the facts and press again; if not, record a departure to Make for each.`);
      continue;
    }
    const pairKey = `${recordId}${gid}${sigs[0]}`;
    if (pairTaken(pairKey, group)) continue;
    const first = group[0], p = productOf(first);
    const style = p ? `${text(p.getCellValue(P.style))}, ${text(p.getCellValue(P.color))}` : key;
    const name = `${style} · ${num(first.getCellValue(S.position))} ${text(first.getCellValue(S.slotName))}`;
    const fresh = group.filter(s => !ids(s.getCellValue(S.shot)).length);
    const id = await create(fresh, { [SH.name]: name, [SH.lines]: [{ id: lineOf(first) }], [SH.madeAs]: { name: 'Share' }, [SH.pairKey]: pairKey });
    for (const s of group.filter(x => !fresh.includes(x))) await relink(s, id);
    made.push(`${name} (${group.map(pname).join(', ')})`);
  }

  const note = [];
  note.push(made.length ? `Made ${made.length} shot${made.length === 1 ? '' : 's'}: ${made.join('; ')}.` : 'Made no new shot.');
  if (joined.length) note.push(`Joined to a shot without an accepted image, so its stated use changed and its earlier candidates read changed: ${joined.join('; ')}.`);
  if (planned) note.push(`Already planned: ${planned} slot${planned === 1 ? '' : 's'} with a shot.`);
  note.push(...out);
  await writeNote(note);
}

// ---- Collection: one shot per (request, active guide slot) pair, missing pairs only.
async function collection(req, writeNote) {
  const guideId = ids(req.getCellValue(R.guide))[0];
  if (!guideId) return writeNote(['Nothing was made: this request has no collection shot guide.']);
  const guide = await tables.G.selectRecordAsync(guideId, { fields: Object.values(G) });
  if (!guide) return writeNote(['Nothing was made: its collection shot guide is missing.']);
  if (num(guide.getCellValue(G.complete)) !== 1) return writeNote([`Nothing was made: no adopted collection shot guide (${text(guide.getCellValue(G.name))}: ${text(guide.getCellValue(G.status))}).`]);
  const adopted = guide.getCellValue(G.adopted) || '';
  const version = num(guide.getCellValue(G.version));
  const guideSlots = (await tables.GS.selectRecordsAsync({ fields: Object.values(GS) })).records
    .filter(gs => ids(gs.getCellValue(GS.guide)).includes(guideId) && !gs.getCellValue(GS.retired))
    .filter(gs => { const l = text(gs.getCellValue(GS.line)); return l && adopted.includes(l); })
    .sort((a, b) => num(a.getCellValue(GS.position)) - num(b.getCellValue(GS.position)));
  const shots = (await tables.SH.selectRecordsAsync({ fields: Object.values(SH) })).records
    .filter(x => ids(x.getCellValue(SH.brief)).includes(recordId) && !x.getCellValue(SH.withdrawn));
  const lineIds = ids(req.getCellValue(R.lines));
  const made = [], out = [];
  for (const gs of guideSlots) {
    const pairKey = `${recordId}${gs.id}`;
    const gname = text(gs.getCellValue(GS.name));
    if (shots.some(x => text(x.getCellValue(SH.pairKey)) === pairKey || ids(x.getCellValue(SH.fromGuideSlot)).includes(gs.id))) { out.push(`${gname}: already has its shot.`); continue; }
    const includes = nameOf(gs.getCellValue(GS.includes));
    const choose = gs.getCellValue(GS.choose);
    const plan = [
      `Placement: ${text(gs.getCellValue(GS.placement))}`,
      `View: ${text(gs.getCellValue(GS.view))}`,
      `Lineage: Shot guide: ${text(guide.getCellValue(G.name))}, version ${version}, ${gname} (guide ${guideId}, guide slot ${gs.id}).`,
      `Includes: ${includes}`,
      `Choose count: ${choose == null ? '' : choose}`,
      `Definition: ${text(gs.getCellValue(GS.line))}`,
    ].join('\n');
    const name = `${text(req.getCellValue(R.name))} · ${gname}`;
    const id = await tables.SH.createRecordAsync({
      [SH.name]: name, [SH.brief]: [{ id: recordId }], [SH.fromGuideSlot]: [{ id: gs.id }], [SH.madeAs]: { name: 'Collection' },
      [SH.plan]: plan, [SH.pairKey]: pairKey, [SH.test]: !!req.getCellValue(R.test),
      [SH.lines]: includes === 'Choose' ? null : lineIds.map(x => ({ id: x })),
    });
    console.log(`made ${id}`);
    made.push(name);
    if (includes === 'Choose') out.push(`${gname}: choose ${choose == null ? 'its' : choose} products in Lines in shot, then tick Products confirmed.`);
  }
  await writeNote([made.length ? `Made ${made.length} shot${made.length === 1 ? '' : 's'}: ${made.join('; ')}.` : 'Made no new shot.', ...out]);
}

await main();
