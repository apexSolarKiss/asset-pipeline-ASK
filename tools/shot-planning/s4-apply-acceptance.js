// Apply acceptance (S4) // runs when an accepted image's Record complete reads Complete, and again
// from its Retry applications button.
// An acceptance covers the slots its stated use names: the candidate's Slots kept, one line per
// slot the shot filled when the candidate was kept. For each line, in order and one write at a
// time, S4 creates that slot's application, keyed "acc:" + accepted record ID + "/" + slot ID, with
// Basis "Accepted for this use", Kept label "made for this page", Recorded at from Accepted at, Test
// from the candidate, and the Kept destination and Kept receiving basis copied from the Slots kept
// line: what was judged, never the slot as it is now. Current is written in the same create call:
// true if the slot has no application in use, otherwise false, an alternate; the image in use
// changes only through a use decision with Replace (S5). A key that exists is skipped, so a retry
// never duplicates. A slot whose request is superseded, or that is no longer active, is skipped,
// and the progress text says why. A Held slot (edited by hand) is left: Applications done stays
// clear, and Retry applications finishes it once the slot is recorded again (v6). After the last
// line S4 writes Application progress and ticks Applications done, the last write. No kept slots
// means no application, and Applications done is still ticked. Applications done is a latch: S4
// never clears it. A Retry after it is ticked still runs, and writes only if it makes an
// application, for example for a kept slot skipped while it was waived and since reopened.
// It never writes an existing field of the accepted record, never changes an application that
// exists, never takes an application out of use and never decides anything.
// Level 0: it reads once and creates only what is missing; two overlapping runs can both create an
// application for one key, which the application pair check shows (v6 §7.7).
// Test-only input faultAfterWrites (v6 §7.7): empty turns it off; N stops the run with an error
// immediately after its Nth application write in this run (creating an application), before any
// later write or the latch; N = 0 stops it before its first application write. It is empty in the
// live base. Tables and fields come from this action's inputs, by ID or name; see README.md.
const cfg = input.config();
const recordId = cfg.recordId;

// The test-only fault, and the account that pressed (from the trigger, shown as Account).
const faultRaw = cfg.faultAfterWrites == null ? '' : String(cfg.faultAfterWrites).trim();
if (faultRaw !== '' && !/^\d+$/.test(faultRaw)) throw new Error('S4: input faultAfterWrites must be empty or a whole number');
const fault = faultRaw === '' ? null : Number(faultRaw);
const account = cfg.account ? String(cfg.account) : '';

// Resolve every binding, and check its field type, before reading or writing anything.
const tables = { A: base.getTable(cfg.acceptedTable), S: base.getTable(cfg.slotsTable), AP: base.getTable(cfg.applicationsTable) };
const bind = (t, key, ...types) => {
  if (!cfg[key]) throw new Error(`S4: input ${key} is missing`);
  const f = tables[t].getField(cfg[key]);
  if (!types.includes(f.type)) throw new Error(`S4: ${key} must be of type ${types.join(' or ')}, not ${f.type}`);
  return f;
};
const id = f => f.id;
const TEXT = ['singleLineText', 'multilineText'];
const LOOKUP = ['multipleLookupValues', 'rollup', 'formula', 'count'];
const A = {
  complete: id(bind('A', 'accRecordCompleteField', 'formula')),
  slotsKept: id(bind('A', 'accSlotsKeptField', ...LOOKUP, 'multilineText')),
  test: id(bind('A', 'accCandidateTestField', ...LOOKUP)),
  acceptedAt: id(bind('A', 'accAcceptedAtField', 'createdTime', 'dateTime', 'date')),
  done: id(bind('A', 'accDoneField', 'checkbox')),
  progress: id(bind('A', 'accProgressField', ...TEXT)),
};
const S = {
  name: id(bind('S', 'slotNameField', 'singleLineText')),
  active: id(bind('S', 'slotActiveField', 'formula')),
  held: id(bind('S', 'slotHeldField', 'formula')),
  superseded: id(bind('S', 'slotRequestSupersededField', ...LOOKUP)),
  inPlan: id(bind('S', 'slotInPlanField', 'formula')),
  waived: id(bind('S', 'slotWaivedField', 'formula')),
  withdrawn: id(bind('S', 'slotWithdrawnField', 'formula')),
  recordCheck: id(bind('S', 'slotRecordCheckField', 'formula')),
  keptPlanCheck: id(bind('S', 'slotKeptPlanCheckField', 'formula')),
  productIntact: id(bind('S', 'slotProductRecordIntactField', ...LOOKUP)),
};
const basisField = bind('AP', 'appBasisField', 'singleSelect');
const BASIS = 'Accepted for this use';
if (!((basisField.options && basisField.options.choices) || []).some(c => c.name === BASIS)) throw new Error(`S4: appBasisField has no choice "${BASIS}"`);
const AP = {
  key: id(bind('AP', 'appKeyField', 'singleLineText')),
  slot: id(bind('AP', 'appSlotField', 'multipleRecordLinks')),
  accepted: id(bind('AP', 'appAcceptedImageField', 'multipleRecordLinks')),
  basis: basisField.id,
  destination: id(bind('AP', 'appKeptDestinationField', ...TEXT)),
  receiving: id(bind('AP', 'appKeptReceivingBasisField', ...TEXT)),
  label: id(bind('AP', 'appKeptLabelField', ...TEXT)),
  recordedAt: id(bind('AP', 'appRecordedAtField', 'dateTime', 'date')),
  account: id(bind('AP', 'appAccountField', ...TEXT)),
  current: id(bind('AP', 'appCurrentField', 'checkbox')),
  currentSetAt: id(bind('AP', 'appCurrentSetAtField', 'dateTime')),
  withdrawn: id(bind('AP', 'appWithdrawnField', 'checkbox')),
  test: id(bind('AP', 'appTestField', 'checkbox')),
};

// The remedies Slot Status names for a Held slot (sim/formulas.mjs TEXT); kept equal by the tests.
const HELD_PLAN = 'plan it in a new version of the request';
const HELD_SLOT = "check this slot's decision, then press Record decision to record it again";
const HELD_PRODUCT = "check the product's assignment, then press Record decision on the product";
const HELD_GUIDE = 'adopt the guide again';

const text = v => (v == null ? '' : String(v)).trim();
const num = v => (typeof v === 'number' ? v : 0);
const ids = v => (v || []).map(x => x.id);
// A lookup's values: plain values, or { linkedRecordId, value } items; empty values dropped.
const values = v => (v == null ? [] : Array.isArray(v) ? v : [v]).map(x => (x && typeof x === 'object' && 'value' in x ? x.value : x)).filter(x => x != null && x !== '');
const joined = (r, f) => values(r.getCellValue(f)).map(String).join('\n');
const total = (r, f) => values(r.getCellValue(f)).reduce((a, x) => a + (typeof x === 'number' ? x : x === true ? 1 : Number(x) || 0), 0);
const flag = (r, f) => values(r.getCellValue(f)).some(x => x === true || x === 1 || x === '1');

let writes = 0;
async function applicationWrite(p) {
  await p;
  writes++;
  if (fault != null && writes >= fault) throw new Error(`S4: test fault: stopped after application write ${writes} (faultAfterWrites = ${fault})`);
}

async function main() {
  const at = new Date().toISOString();
  const me = await tables.A.selectRecordAsync(recordId, { fields: Object.values(A) });
  if (!me) { console.log('skip: accepted record not found'); return; }
  const alreadyDone = !!me.getCellValue(A.done);
  if (text(me.getCellValue(A.complete)) !== 'Complete') {
    await tables.A.updateRecordAsync(recordId, { [A.progress]: "Not applied: this accepted record isn't Complete." });
    console.log('refused: not Complete');
    return;
  }
  // Slots kept: one line per slot, "slot ID ‖ Kept definition line ‖ product ID ‖ receiving basis".
  const lines = joined(me, A.slotsKept).split('\n').map(x => x.trim()).filter(Boolean).map(l => {
    const p = l.split(' ‖ ');
    if (p.length !== 4 || !/^rec\w+$/.test(p[0])) throw new Error(`S4: a Slots kept line isn't "slot ‖ definition line ‖ product ‖ receiving basis": ${l}`);
    return { slot: p[0], line: p[1], product: p[2], receiving: p[3] };
  });
  if (!lines.length) {
    if (alreadyDone) { console.log('skip: no slots kept, already done'); return; }
    await tables.A.updateRecordAsync(recordId, { [A.progress]: 'No slots kept: this acceptance names no product-page slot, so it makes no application.', [A.done]: true });
    console.log('no slots kept');
    return;
  }

  const apps = (await tables.AP.selectRecordsAsync({ fields: [AP.key, AP.slot, AP.current, AP.withdrawn] })).records;
  const keys = new Set(apps.map(a => text(a.getCellValue(AP.key))));
  const inUse = new Map();
  for (const a of apps) if (a.getCellValue(AP.current) && !a.getCellValue(AP.withdrawn)) for (const s of ids(a.getCellValue(AP.slot))) inUse.set(s, (inUse.get(s) || 0) + 1);
  const slotIds = [...new Set(lines.map(l => l.slot))];
  const slots = new Map((await tables.S.selectRecordsAsync({ fields: Object.values(S), recordIds: slotIds })).records.map(r => [r.id, r]));
  const test = flag(me, A.test), acceptedAt = me.getCellValue(A.acceptedAt);

  if (fault === 0) throw new Error('S4: test fault: stopped before its first application write (faultAfterWrites = 0)');
  let made = 0, created = 0;
  const report = [], waits = [];
  for (const l of lines) {
    const key = `acc:${recordId}/${l.slot}`;
    if (keys.has(key)) { made++; continue; } // a retry skips it
    const s = slots.get(l.slot);
    const name = s ? text(s.getCellValue(S.name)) : l.slot;
    if (!s) { report.push(`- ${name}: skipped: its slot record is missing.`); continue; }
    if (total(s, S.superseded) > 0) { report.push(`- ${name}: skipped: its request is superseded.`); continue; }
    if (num(s.getCellValue(S.held)) === 1) { waits.push(`- ${name} waits: edited by hand; ${heldRemedy(s)}.`); continue; }
    if (num(s.getCellValue(S.active)) !== 1) { report.push(`- ${name}: skipped: ${inactiveWhy(s)}.`); continue; }
    const current = !(inUse.get(l.slot) > 0);
    await applicationWrite(tables.AP.createRecordAsync({
      [AP.accepted]: [{ id: recordId }],
      [AP.slot]: [{ id: l.slot }],
      [AP.key]: key,
      [AP.basis]: { name: BASIS },
      [AP.destination]: `${l.line} ‖ ${l.product}`,
      [AP.receiving]: l.receiving,
      [AP.label]: 'made for this page',
      [AP.recordedAt]: acceptedAt,
      [AP.account]: account,
      [AP.current]: current,
      [AP.currentSetAt]: new Date().toISOString(),
      [AP.test]: test,
    }));
    keys.add(key); made++; created++;
    if (current) inUse.set(l.slot, 1);
    else report.push(`- ${name}: an alternate; the image in use there stays until a use decision with Replace.`);
  }

  const head = `Applied to ${made} of ${lines.length} slot${lines.length === 1 ? '' : 's'}, ${at}.`;
  if (alreadyDone && !created) { console.log(`nothing new: ${head}`); return; }
  if (waits.length || alreadyDone) {
    const message = [head, ...report, ...waits, ...(alreadyDone ? [] : ['Applications done stays clear: press Retry applications once each waiting slot is recorded again.'])].join('\n');
    await tables.A.updateRecordAsync(recordId, { [A.progress]: message });
    console.log(message);
    return;
  }
  // The last write: progress and the latch together.
  await tables.A.updateRecordAsync(recordId, { [A.progress]: [head, ...report].join('\n'), [A.done]: true });
  console.log(head);
}

function heldRemedy(s) {
  if (text(s.getCellValue(S.keptPlanCheck))) return HELD_PLAN;
  if (text(s.getCellValue(S.recordCheck))) return HELD_SLOT;
  if (values(s.getCellValue(S.productIntact)).some(x => Number(x) === 0)) return HELD_PRODUCT;
  return HELD_GUIDE;
}
function inactiveWhy(s) {
  if (num(s.getCellValue(S.withdrawn)) === 1) return 'the slot is withdrawn';
  if (num(s.getCellValue(S.waived)) === 1) return 'the slot is marked not needed';
  if (num(s.getCellValue(S.inPlan)) !== 1) return 'the slot is no longer in the adopted plan';
  return "the slot isn't active";
}

await main();
