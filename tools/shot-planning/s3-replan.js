// Replan (S3) // the Replan button on a shot and on a product-page slot.
// Replan copies a guide slot's live Definition line and its guide's Adopted version into a kept
// plan, with Kept plan written at, so a change the guide has adopted reaches the slots and shots
// planned before it. Which slots it refreshes is Replan reach, not Active: an adopted change takes
// a slot out of the adopted plan until it is replanned, so a Replan limited to active slots could
// never bring it back (v6, CX5).
// On a product-page shot without an accepted image, it visits every slot linked to the shot that
// isn't validly withdrawn or waived, refreshes each one in reach, reports the rest and why, then
// works out the shot's active slots from what it wrote and, if Lines in shot is no longer an
// active slot's line, repoints it to the first active slot's line in request order. On a slot, it
// refreshes that slot's kept plan if the slot is in reach; a slot whose recorded fulfillment no
// longer matches its shot, or that its shot's acceptances don't cover, is detached from the shot
// first, with its Detach log, for Make shots to plan by its fulfillment; a covered slot whose
// recorded fulfillment is "An accepted image" stays on its shot and is refreshed (GPT-A). A slot's
// shot is its linked shot that isn't Withdrawn. On a collection shot without an accepted image, it
// refreshes the shot's kept guide plan.
// It refuses a written or walkthrough shot, a shot or slot edited by hand (a Held slot), a guide
// that isn't Complete, a retired or moved guide slot, a reassigned or replaced product, a
// superseded request and a changed obligation (a new version of the request plans that), and it
// never detaches a slot an acceptance of its shot covers. It never changes a decision, a
// fulfillment, a waiver, a candidate or an application, and never makes a retired slot usable.
// Level 0: it reads once and writes only the kept plans, links and results it names.
// Installed twice: input `kind` is "shot" or "slot". Tables and fields come from this action's
// inputs, by ID or name; see README.md.
const cfg = input.config();
const recordId = cfg.recordId;
const kind = cfg.kind;
if (kind !== 'shot' && kind !== 'slot') throw new Error('S3: input kind must be "shot" or "slot"');

// Resolve every binding, and check its field type, before reading or writing anything.
const tables = {
  R: base.getTable(cfg.requestsTable), L: base.getTable(cfg.linesTable), G: base.getTable(cfg.guidesTable),
  GS: base.getTable(cfg.guideSlotsTable), S: base.getTable(cfg.slotsTable), SH: base.getTable(cfg.shotsTable),
};
const bind = (t, key, ...types) => {
  if (!cfg[key]) throw new Error(`S3: input ${key} is missing`);
  const f = tables[t].getField(cfg[key]);
  if (!types.includes(f.type)) throw new Error(`S3: ${key} must be of type ${types.join(' or ')}, not ${f.type}`);
  return f.id;
};
const TEXT = ['singleLineText', 'multilineText'];
// The kept guide plan is a kept record, one value per line: a line break in a value (a View of two
// lines) is written ⏎, and the shot's Effective placement, Effective direction and Lineage read it back.
const KEPT_BREAK = '⏎';
const oneLine = v => String(v).split('\n').join(KEPT_BREAK);
const LOOKUP = ['multipleLookupValues', 'rollup', 'formula'];
const R = {
  lines: bind('R', 'requestLinesField', 'multipleRecordLinks'),
  guide: bind('R', 'requestCollectionGuideField', 'multipleRecordLinks'),
  superseded: bind('R', 'requestSupersededField', 'count', 'rollup', 'formula'),
};
const L = { name: bind('L', 'lineNameField', 'formula', ...TEXT) };
const G = {
  name: bind('G', 'guideNameField', ...TEXT),
  complete: bind('G', 'guideCompleteField', 'formula'),
  status: bind('G', 'guideStatusField', 'formula'),
  version: bind('G', 'guideAdoptedVersionField', 'number'),
};
const GS = {
  name: bind('GS', 'gsNameField', ...TEXT),
  guide: bind('GS', 'gsGuideField', 'multipleRecordLinks'),
  position: bind('GS', 'gsPositionField', 'number'),
  placement: bind('GS', 'gsPlacementField', ...TEXT),
  view: bind('GS', 'gsViewField', ...TEXT),
  required: bind('GS', 'gsRequiredField', 'singleSelect'),
  fill: bind('GS', 'gsFillRuleField', 'singleSelect'),
  includes: bind('GS', 'gsIncludesField', 'singleSelect'),
  choose: bind('GS', 'gsChooseCountField', 'number'),
  retired: bind('GS', 'gsRetiredField', 'checkbox'),
  line: bind('GS', 'gsDefinitionLineField', 'formula'),
};
const S = {
  name: bind('S', 'slotNameField', 'singleLineText'),
  line: bind('S', 'slotLineField', 'multipleRecordLinks'),
  request: bind('S', 'slotRequestField', 'multipleRecordLinks'),
  guideSlot: bind('S', 'slotGuideSlotField', 'multipleRecordLinks'),
  shot: bind('S', 'slotShotField', 'multipleRecordLinks'),
  keptLine: bind('S', 'slotKeptDefinitionLineField', ...TEXT),
  keptGuideId: bind('S', 'slotKeptGuideIdField', 'singleLineText'),
  keptProductId: bind('S', 'slotKeptProductIdField', 'singleLineText'),
  keptVersion: bind('S', 'slotKeptGuideVersionField', 'number'),
  keptGuideName: bind('S', 'slotKeptGuideNameField', 'singleLineText'),
  keptSlotName: bind('S', 'slotKeptSlotNameField', 'singleLineText'),
  keptPosition: bind('S', 'slotKeptPositionField', 'number'),
  keptPlacement: bind('S', 'slotKeptPlacementField', 'singleLineText'),
  keptView: bind('S', 'slotKeptViewField', ...TEXT),
  planKept: bind('S', 'slotPlanKeptField', 'checkbox'),
  writtenAt: bind('S', 'slotKeptPlanWrittenAtField', 'dateTime'),
  detachLog: bind('S', 'slotDetachLogField', 'multilineText'),
  result: bind('S', 'slotResultField', ...TEXT),
  productName: bind('S', 'slotProductNameField', ...LOOKUP),
  assignedGuideId: bind('S', 'slotAssignedGuideIdField', ...LOOKUP),
  lineProductId: bind('S', 'slotLineProductIdField', ...LOOKUP),
  requestSuperseded: bind('S', 'slotRequestSupersededField', ...LOOKUP),
  gsGuideId: bind('S', 'slotGuideSlotGuideIdField', ...LOOKUP),
  withdrawn: bind('S', 'slotWithdrawnField', 'formula'),
  waived: bind('S', 'slotWaivedField', 'formula'),
  held: bind('S', 'slotHeldField', 'formula'),
  recordCheck: bind('S', 'slotRecordCheckField', 'formula'),
  keptPlanCheck: bind('S', 'slotKeptPlanCheckField', 'formula'),
  productIntact: bind('S', 'slotProductRecordIntactField', ...LOOKUP),
  inPlan: bind('S', 'slotInPlanField', 'formula'),
  stale: bind('S', 'slotStaleField', 'formula'),
  obligation: bind('S', 'slotObligationField', 'formula'),
  reach: bind('S', 'slotReachField', 'formula'),
  active: bind('S', 'slotActiveField', 'formula'),
  matches: bind('S', 'slotMatchesField', 'formula'),
  covered: bind('S', 'slotCoveredField', 'formula'),
  shotAccepted: bind('S', 'slotShotAcceptedField', 'formula'),
  pending: bind('S', 'slotChangePendingField', 'formula'),
  operative: bind('S', 'slotOperativeField', 'formula'),
};
const SH = {
  name: bind('SH', 'shotNameField', 'singleLineText'),
  brief: bind('SH', 'shotBriefField', 'multipleRecordLinks'),
  lines: bind('SH', 'shotLinesField', 'multipleRecordLinks'),
  fromGuideSlot: bind('SH', 'shotFromGuideSlotField', 'multipleRecordLinks'),
  plan: bind('SH', 'shotKeptGuidePlanField', 'multilineText'),
  withdrawn: bind('SH', 'shotWithdrawnField', 'checkbox'),
  accepted: bind('SH', 'shotAcceptedCountField', 'rollup', 'count', 'formula'),
  workflow: bind('SH', 'shotWorkflowField', ...LOOKUP),
  slots: bind('SH', 'shotSlotsFilledField', 'multipleRecordLinks'),
  result: bind('SH', 'shotResultField', ...TEXT),
};

// Texts the slot's Status shares (sim/formulas.mjs TEXT); kept equal by the tests.
const COVERED_REFUSAL = 'An accepted image covers this slot. Set Fulfillment back and record it. To use another image here, record a use decision with Replace; to make a new one, plan it in a new version of the request.';
const COVERED_PICKUP = 'An accepted image of its shot covers this slot, and its recorded fulfillment is "An accepted image": apply a use decision with Replace to use another image here.';

const text = v => (v == null ? '' : String(v)).trim();
const num = v => (typeof v === 'number' ? v : 0);
const ids = v => (v || []).map(x => x.id);
const nameOf = v => (v ? v.name : '');
const str = (r, f) => text(r.getCellValueAsString(f)); // lookups, read as their text
const sum = (r, f) => str(r, f).split(',').reduce((a, x) => a + (Number(x) || 0), 0);
const lineOf = (plan, label) => { const m = new RegExp(`(?:^|\\n)${label}: ([^\\n]*)`).exec(plan || ''); return m ? m[1] : ''; };

async function main() {
  const at = new Date().toISOString();
  // One read of each table this press needs.
  const guides = new Map((await tables.G.selectRecordsAsync({ fields: Object.values(G) })).records.map(r => [r.id, r]));
  const guideSlots = new Map((await tables.GS.selectRecordsAsync({ fields: Object.values(GS) })).records.map(r => [r.id, r]));

  if (kind === 'slot') return replanSlot(at, guides, guideSlots);

  const shot = await tables.SH.selectRecordAsync(recordId, { fields: Object.values(SH) });
  if (!shot) { console.log('skip: shot not found'); return; }
  const done = async message => { await tables.SH.updateRecordAsync(recordId, { [SH.result]: `Replan, ${at}: ${message}` }); console.log(message); };
  const workflow = str(shot, SH.workflow);
  if (shot.getCellValue(SH.withdrawn)) return done('Not replanned: this shot is withdrawn.');
  if (workflow === 'Collection') return replanCollection(shot, at, guides, guideSlots, done);
  if (workflow !== 'Product pages') return done("Not replanned: this shot's direction is written in it; Replan is for product-page and collection shots.");
  if (num(shot.getCellValue(SH.accepted)) > 0) return done('Not replanned: this shot has an accepted image. Press Replan on each slot you need to replan.');

  const slotIds = ids(shot.getCellValue(SH.slots));
  const slots = slotIds.length ? (await tables.S.selectRecordsAsync({ fields: Object.values(S), recordIds: slotIds })).records : [];
  const linked = slotIds.map(id => slots.find(s => s.id === id)).filter(Boolean).filter(s => num(s.getCellValue(S.withdrawn)) !== 1);
  // A Held slot refuses the shot: what it decided can't be read from it (v6 §6, §7.5).
  const held = linked.find(s => num(s.getCellValue(S.held)) === 1);
  if (held) return done(`Not replanned: ${heldWhy(held)}.`);

  const report = [], refreshed = new Set();
  for (const s of linked) {
    if (num(s.getCellValue(S.waived)) === 1) { report.push(`- ${label(s)}: marked not needed; left as it is, with its waiver and kept plan.`); continue; }
    const why = notRefreshable(s, guides, guideSlots);
    if (why) { report.push(`- ${label(s)}: not replanned: ${why}.`); continue; }
    const cells = refreshCells(s, guides, guideSlots, new Date().toISOString());
    await tables.S.updateRecordAsync(s.id, { ...cells, [S.result]: `Replan, ${at}: kept plan refreshed from ${text(guides.get(keptGuide(s)).getCellValue(G.name))}, version ${cells[S.keptVersion]}, by Replan on its shot.` });
    refreshed.add(s.id);
    report.push(`- ${label(s)}: refreshed from version ${cells[S.keptVersion]}.`);
  }

  // The shot's active slots, from what was written: active before, or refreshed now.
  const active = linked.filter(s => refreshed.has(s.id) || (num(s.getCellValue(S.active)) === 1 && num(s.getCellValue(S.waived)) !== 1));
  const head = `refreshed ${refreshed.size} of ${linked.length} slot${linked.length === 1 ? '' : 's'}.`;
  if (!active.length) return done([head, ...report, 'No slot of this shot is active now: it stays unplanned.'].join('\n'));
  const reqId = ids(shot.getCellValue(SH.brief))[0];
  const req = reqId ? await tables.R.selectRecordAsync(reqId, { fields: Object.values(R) }) : null;
  const order = new Map(ids(req && req.getCellValue(R.lines)).map((id, i) => [id, i]));
  const activeLines = [...new Set(active.map(s => ids(s.getCellValue(S.line))[0]).filter(Boolean))]
    .sort((a, b) => (order.get(a) ?? 1e9) - (order.get(b) ?? 1e9));
  const now = ids(shot.getCellValue(SH.lines));
  if (now.length === 1 && activeLines.includes(now[0])) return done([head, ...report].join('\n'));
  const keep = now.find(x => activeLines.includes(x)) || activeLines[0];
  const lines = await tables.L.selectRecordsAsync({ fields: Object.values(L), recordIds: [keep] });
  const lineName = lines.records.length ? str(lines.records[0], L.name) : keep;
  await tables.SH.updateRecordAsync(recordId, { [SH.lines]: [{ id: keep }], [SH.result]: `Replan, ${at}: ${[head, ...report, `Lines in shot repointed to ${lineName}.`].join('\n')}` });
  console.log(`repointed to ${keep}`);
}

// ---- a slot
const label = s => text(s.getCellValue(S.name));
const keptGuide = s => text(s.getCellValue(S.keptGuideId));
function heldWhy(s) {
  if (text(s.getCellValue(S.keptPlanCheck))) return `Edited by hand: ${label(s)}'s kept plan was edited by hand: plan it in a new version of the request`;
  if (text(s.getCellValue(S.recordCheck))) return `Edited by hand: record ${label(s)}'s decision again first`;
  if (str(s, S.productIntact).split(',').some(x => text(x) === '0')) return `Edited by hand: record ${str(s, S.productName)}'s assignment again first`;
  return `Edited by hand: adopt ${text(s.getCellValue(S.keptGuideName))} again first`;
}
// Why a slot (not withdrawn, waived or held) can't be refreshed, or '' when it can.
function notRefreshable(s, guides, guideSlots) {
  const gid = keptGuide(s), guide = guides.get(gid);
  const gs = guideSlots.get(ids(s.getCellValue(S.guideSlot))[0]);
  // CX5: the slots Replan refreshes are Replan reach, never only the active ones.
  const inReach = num(s.getCellValue(S.reach)) === 1;
  const incomplete = !guide || num(guide.getCellValue(G.complete)) !== 1;
  const notComplete = () => `its guide isn't Complete (${guide ? text(guide.getCellValue(G.status)) : 'missing'}): adopt it first`;
  if (inReach) return incomplete || !gs ? notComplete() : '';
  if (sum(s, S.requestSuperseded) > 0) return 'its request is superseded';
  if (gid !== str(s, S.assignedGuideId)) return 'its product was reassigned to another guide';
  if (text(s.getCellValue(S.keptProductId)) !== str(s, S.lineProductId)) return 'its product was replaced on the line';
  if (!gs || str(s, S.gsGuideId) !== gid) return 'its guide slot was moved to another guide';
  if (incomplete) return notComplete();
  if (gs.getCellValue(GS.retired)) return 'its guide slot was retired; replanning never makes a retired slot usable';
  if (num(s.getCellValue(S.obligation)) !== 1) return 'its obligation changed (Required or Fill rule): plan it in a new version of the request';
  return "its guide slot's current line isn't in the guide's adopted definition: adopt the guide, then replan";
}
// The kept plan, refreshed from the live guide slot and its guide's Adopted version.
function refreshCells(s, guides, guideSlots, writtenAt) {
  const guide = guides.get(keptGuide(s)), gs = guideSlots.get(ids(s.getCellValue(S.guideSlot))[0]);
  return {
    [S.keptLine]: text(gs.getCellValue(GS.line)),
    [S.keptVersion]: num(guide.getCellValue(G.version)),
    [S.keptGuideName]: text(guide.getCellValue(G.name)),
    [S.keptSlotName]: text(gs.getCellValue(GS.name)),
    [S.keptPosition]: num(gs.getCellValue(GS.position)),
    [S.keptPlacement]: text(gs.getCellValue(GS.placement)),
    [S.keptView]: text(gs.getCellValue(GS.view)),
    [S.planKept]: true,
    [S.writtenAt]: writtenAt,
  };
}

async function replanSlot(at, guides, guideSlots) {
  const s = await tables.S.selectRecordAsync(recordId, { fields: Object.values(S) });
  if (!s) { console.log('skip: slot not found'); return; }
  const done = async (message, cells = {}) => { await tables.S.updateRecordAsync(recordId, { ...cells, [S.result]: `Replan, ${at}: ${message}` }); console.log(message); };
  if (num(s.getCellValue(S.withdrawn)) === 1) return done('Not replanned: this slot is withdrawn as a duplicate.');
  if (num(s.getCellValue(S.held)) === 1) return done(`Not replanned: ${heldWhy(s)}.`);
  if (num(s.getCellValue(S.waived)) === 1) return done('Not replanned: this slot is marked not needed; it is left as it is, with its waiver and kept plan.');

  // The slot's shot is its linked shot that isn't Withdrawn: a withdrawn duplicate doesn't count
  // (v6 §7.3), as in the slot's formulas and S2. A slot linked only to withdrawn shots has no shot.
  const linkedShots = ids(s.getCellValue(S.shot));
  const shotRecords = linkedShots.length ? (await tables.SH.selectRecordsAsync({ fields: [SH.name, SH.withdrawn], recordIds: linkedShots })).records : [];
  const liveShot = linkedShots.map(x => shotRecords.find(r => r.id === x)).find(r => r && !r.getCellValue(SH.withdrawn));
  const op = text(s.getCellValue(S.operative));
  const matches = num(s.getCellValue(S.matches)) === 1, pending = !!text(s.getCellValue(S.pending));
  let detach = false, pickupRoute = false;
  if (liveShot) {
    const accepted = num(s.getCellValue(S.shotAccepted)) === 1, covered = num(s.getCellValue(S.covered)) === 1;
    if (!accepted && matches) return done('This slot is planned with its shot: press Replan on the shot.');
    if (accepted && covered) {
      if (!matches) {
        if (pending) return done('Record the decision for this change first.');
        if (op !== 'An accepted image') return done(COVERED_REFUSAL);
        // GPT-A's route: a covered slot whose recorded fulfillment is "An accepted image" stays on
        // its shot (never detached) and takes another image through a use decision with Replace.
        // Its kept plan is refreshed below when it is in Replan reach, as on any accepted shot.
        pickupRoute = true;
      }
    } else {
      // Its shot has no accepted image and the recorded fulfillment no longer matches it, or its
      // shot's acceptances don't cover it (v6): detach it, unless a change waits for its record.
      if (pending) return done('Record the decision for this change first.');
      detach = true;
    }
  }

  const cells = {}, parts = [];
  if (detach) {
    const shotName = text(liveShot.getCellValue(SH.name)) || liveShot.id;
    const why = matches ? '; its shot was accepted without it' : '';
    const line = `Detached from ${shotName} on ${at}, Fulfillment now ${op}${why}`;
    const log = text(s.getCellValue(S.detachLog));
    cells[S.shot] = null;
    cells[S.detachLog] = log ? `${log}\n${line}` : line;
    parts.push(`Detached from ${shotName}${why}. Press Make shots on its request to plan it by its fulfillment (${op}).`);
  }
  const why = notRefreshable(s, guides, guideSlots);
  if (why) parts.push(`${detach ? 'Kept plan not refreshed' : 'Not replanned'}: ${why}.`);
  else {
    Object.assign(cells, refreshCells(s, guides, guideSlots, new Date().toISOString()));
    parts.push(`Kept plan refreshed from ${text(guides.get(keptGuide(s)).getCellValue(G.name))}, version ${cells[S.keptVersion]}.`);
  }
  if (pickupRoute) parts.push(COVERED_PICKUP);
  return done(parts.join(' '), cells);
}

// ---- a collection shot: its kept guide plan
async function replanCollection(shot, at, guides, guideSlots, done) {
  if (num(shot.getCellValue(SH.accepted)) > 0) return done('Not replanned: this collection shot has an accepted image; its kept plan stays as it was accepted.');
  const reqId = ids(shot.getCellValue(SH.brief))[0];
  const req = reqId ? await tables.R.selectRecordAsync(reqId, { fields: Object.values(R) }) : null;
  if (!req) return done('Not replanned: the shot needs its request.');
  if (num(req.getCellValue(R.superseded)) > 0) return done('Not replanned: its request is superseded.');
  const gid = ids(req.getCellValue(R.guide))[0], guide = guides.get(gid);
  if (!guide) return done('Not replanned: its request has no collection shot guide.');
  const gs = guideSlots.get(ids(shot.getCellValue(SH.fromGuideSlot))[0]);
  if (!gs || !ids(gs.getCellValue(GS.guide)).includes(gid)) return done("Not replanned: its guide slot isn't in the request's collection guide.");
  if (num(guide.getCellValue(G.complete)) !== 1) return done(`Not replanned: its guide isn't Complete (${text(guide.getCellValue(G.status))}): adopt it first.`);
  if (gs.getCellValue(GS.retired)) return done('Not replanned: its guide slot was retired; replanning never makes a retired slot usable.');
  const kept = shot.getCellValue(SH.plan) || '';
  const includes = nameOf(gs.getCellValue(GS.includes)), choose = gs.getCellValue(GS.choose);
  if (lineOf(kept, 'Includes') !== includes || lineOf(kept, 'Choose count') !== (choose == null ? '' : String(choose))) return done('Not replanned: its obligation changed (Includes or Choose count): plan it in a new version of the request.');
  const version = num(guide.getCellValue(G.version));
  const plan = [
    `Placement: ${oneLine(text(gs.getCellValue(GS.placement)))}`,
    `View: ${oneLine(text(gs.getCellValue(GS.view)))}`,
    `Lineage: ${oneLine(`Shot guide: ${text(guide.getCellValue(G.name))}, version ${version}, ${text(gs.getCellValue(GS.name))} (guide ${gid}, guide slot ${gs.id}).`)}`,
    `Includes: ${includes}`,
    `Choose count: ${choose == null ? '' : choose}`,
    `Definition: ${oneLine(text(gs.getCellValue(GS.line)))}`,
  ].join('\n');
  await tables.SH.updateRecordAsync(recordId, { [SH.plan]: plan, [SH.result]: `Replan, ${at}: kept guide plan refreshed from ${text(guide.getCellValue(G.name))}, version ${version}.` });
  console.log('refreshed the kept guide plan');
}

await main();
