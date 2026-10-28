// Apply use decision (S5) // the Apply this decision button on a use decision.
// A use decision gives an accepted image a further use: its source, the slots it names, Replace or
// add, the Conditions and the decision record are the decision-maker's. S5 applies it resumably.
//   1. Applied ticked: nothing happens. A decision whose own record (Decided basis, Decided
//      selection, Decided at) reads Edited by hand: S5 finishes any replacement it had already
//      started, from the Replaces its applications carry, writes no new application, and ends the
//      decision "Applied in part", ticking Applied (v6).
//   2. The first press checks the decision as entered: Conditions and the decision record, a
//      Complete source, Test-to-Test, each named slot (Pickup ok, or under Replace a slot with an
//      image in use whose other Pickup ok terms hold and whose recorded fulfillment is "An accepted
//      image" or whose shot the source is an acceptance of), and each slot's product among the
//      source's input products, read from its Products kept (by ID, by share key where the source
//      omits size, or, with Facts reviewed, by membership only), or, for a source kept before
//      Products kept existed, from the legacy map input. If anything is refused, only the Result is
//      written, naming each refused slot and why.
//   3. Fixing the decision: one update writes Decided basis (the Live basis as checked), Decided
//      selection (each slot's applications in use at that read, v6), Decided at and the Decision
//      label, before any application. From then on S5 works from Decided basis, never from the
//      live fields, and never writes those again.
//   4. Applying, one slot at a time, in the Decided basis order, keyed "ud:" + decision + "/" + slot.
//      A key that exists is done; under Replace, an interrupted replacement is finished. Otherwise
//      the selection comes first (v6, CX7): an application in use outside this slot's Decided
//      selection means a later decision or acceptance stands, and the slot ends superseded, unless
//      that application's State reads Edited by hand, which makes the slot wait (GPT-C). Then the
//      slot is checked again: a superseded request is final; a Held slot waits; a slot no longer
//      active, a fulfillment that no longer qualifies, a kept line, product or receiving basis that
//      differs from the decided one, a source no longer Complete or a Test mismatch is final; a
//      change waiting for its record, an unadopted guide edit or another record with the slot's
//      key waits, and so does anything else. A final failure ends the slot for this decision: S5
//      records it in Ended slots at once, and a later press reports it from there without checking
//      the slot again, so a slot ended stays ended when its cause clears. A slot that passes gets its
//      application, Current, and under Replace S5 then takes out of use the applications of its
//      Decided selection still in use. The replacing application is always written first.
//   5. Finishing: unless a slot waits, S5 writes the Result and ticks Applied, the last write.
//      While a slot waits, Applied stays clear and the Result says what waits.
// It never changes Decided basis, Decided selection or Decided at once written, never removes a line
// from Ended slots, never takes out of
// use an application outside a slot's Decided selection, and never writes a slot, a shot or an
// accepted record. Level 0: no transaction; a run that stops partway is finished by pressing again.
// Inputs besides the bindings: legacyMap (JSON, accepted record ID -> { product, facts }, for the
// sources kept before Products kept existed), refuseEarlierStandard (P12's alternative: refuse a
// source whose Source current reads 0; empty by default), account (the account that pressed, shown
// as Account), and the test-only faultAfterWrites (v6 §7.7): empty turns it off; N stops the run
// with an error immediately after its Nth application write in this run (creating an application,
// or changing its Current), before any later write or the latch; the freeze isn't counted; N = 0
// stops it after the freeze, before any application write. It is empty in the live base.
// Tables and fields come from this action's inputs, by ID or name; see README.md.
const cfg = input.config();
const recordId = cfg.recordId;

// Installation inputs, checked before anything is read.
const faultRaw = cfg.faultAfterWrites == null ? '' : String(cfg.faultAfterWrites).trim();
if (faultRaw !== '' && !/^\d+$/.test(faultRaw)) throw new Error('S5: input faultAfterWrites must be empty or a whole number');
const fault = faultRaw === '' ? null : Number(faultRaw);
const refuseRaw = cfg.refuseEarlierStandard == null ? '' : String(cfg.refuseEarlierStandard).trim().toLowerCase();
if (!['', 'no', 'false', 'yes', 'true'].includes(refuseRaw)) throw new Error('S5: input refuseEarlierStandard must be empty, yes or no');
const refuseEarlier = refuseRaw === 'yes' || refuseRaw === 'true';
let legacy = {};
if (cfg.legacyMap != null && String(cfg.legacyMap).trim() !== '') {
  try { legacy = JSON.parse(String(cfg.legacyMap)); } catch (e) { throw new Error('S5: input legacyMap must be JSON: { "<accepted record ID>": { "product": "<product ID>", "facts": "<facts>" } }'); }
  if (!legacy || typeof legacy !== 'object' || Array.isArray(legacy)) throw new Error('S5: input legacyMap must be a JSON object');
  for (const [k, v] of Object.entries(legacy)) if (!/^rec\w+$/.test(k) || !v || typeof v.product !== 'string' || !/^rec\w+$/.test(v.product) || typeof v.facts !== 'string' || !v.facts.trim()) throw new Error(`S5: input legacyMap entry ${k} needs a product record ID and its facts`);
}
const account = cfg.account ? String(cfg.account) : '';

// Resolve every binding, and check its field type, before reading or writing anything.
const tables = { UD: base.getTable(cfg.decisionsTable), A: base.getTable(cfg.acceptedTable), S: base.getTable(cfg.slotsTable), AP: base.getTable(cfg.applicationsTable) };
const bind = (t, key, ...types) => {
  if (!cfg[key]) throw new Error(`S5: input ${key} is missing`);
  const f = tables[t].getField(cfg[key]);
  if (!types.includes(f.type)) throw new Error(`S5: ${key} must be of type ${types.join(' or ')}, not ${f.type}`);
  return f;
};
const id = f => f.id;
const TEXT = ['singleLineText', 'multilineText'];
const LOOKUP = ['multipleLookupValues', 'rollup', 'formula', 'count'];
const D = {
  source: id(bind('UD', 'udAcceptedImageField', 'multipleRecordLinks')),
  slots: id(bind('UD', 'udSlotsField', 'multipleRecordLinks')),
  replace: id(bind('UD', 'udReplaceField', 'checkbox')),
  conditions: id(bind('UD', 'udConditionsField', ...TEXT)),
  reviewed: id(bind('UD', 'udFactsReviewedField', 'checkbox')),
  by: id(bind('UD', 'udDecidedByField', ...TEXT)),
  from: id(bind('UD', 'udDecisionSourceField', ...TEXT)),
  entered: id(bind('UD', 'udEnteredByField', ...TEXT)),
  basis: id(bind('UD', 'udDecidedBasisField', 'multilineText')),
  at: id(bind('UD', 'udDecidedAtField', 'dateTime')),
  selection: id(bind('UD', 'udDecidedSelectionField', 'multilineText')),
  label: id(bind('UD', 'udLabelField', ...TEXT)),
  result: id(bind('UD', 'udResultField', ...TEXT)),
  applied: id(bind('UD', 'udAppliedField', 'checkbox')),
  ended: id(bind('UD', 'udEndedSlotsField', 'multilineText')),
  live: id(bind('UD', 'udLiveBasisField', 'formula')),
  intact: id(bind('UD', 'udRecordIntactField', 'formula')),
  check: id(bind('UD', 'udBasisCheckField', 'formula')),
};
const A = {
  complete: id(bind('A', 'accRecordCompleteField', 'formula')),
  productsKept: id(bind('A', 'accProductsKeptField', ...LOOKUP, 'multilineText')),
  slotsKept: id(bind('A', 'accSlotsKeptField', ...LOOKUP, 'multilineText')),
  test: id(bind('A', 'accCandidateTestField', ...LOOKUP)),
  current: id(bind('A', 'accSourceCurrentField', 'formula')),
  title: id(bind('A', 'accTitleField', ...LOOKUP, 'singleLineText')),
};
const S = {
  name: id(bind('S', 'slotNameField', 'singleLineText')),
  active: id(bind('S', 'slotActiveField', 'formula')),
  pickupOk: id(bind('S', 'slotPickupOkField', 'formula')),
  pending: id(bind('S', 'slotChangePendingField', 'formula')),
  held: id(bind('S', 'slotHeldField', 'formula')),
  keyCount: id(bind('S', 'slotKeyCountField', 'formula')),
  operative: id(bind('S', 'slotOperativeField', 'formula')),
  planKept: id(bind('S', 'slotPlanKeptField', 'checkbox')),
  guide: id(bind('S', 'slotShotGuideCheckField', 'formula')),
  inPlan: id(bind('S', 'slotInPlanField', 'formula')),
  superseded: id(bind('S', 'slotRequestSupersededField', ...LOOKUP)),
  test: id(bind('S', 'slotTestField', 'checkbox')),
  keptLine: id(bind('S', 'slotKeptDefinitionLineField', ...TEXT)),
  keptProduct: id(bind('S', 'slotKeptProductIdField', 'singleLineText')),
  receiving: id(bind('S', 'slotReceivingBasisField', 'formula')),
  shareSignature: id(bind('S', 'slotShareSignatureField', ...LOOKUP)),
  size: id(bind('S', 'slotSizeField', ...LOOKUP)),
  facts: id(bind('S', 'slotProductFactsField', ...LOOKUP)),
  status: id(bind('S', 'slotStatusField', 'formula')),
  recordCheck: id(bind('S', 'slotRecordCheckField', 'formula')),
  keptPlanCheck: id(bind('S', 'slotKeptPlanCheckField', 'formula')),
  productIntact: id(bind('S', 'slotProductRecordIntactField', ...LOOKUP)),
};
const basisField = bind('AP', 'appBasisField', 'singleSelect');
const BASIS = 'Use decision';
if (!((basisField.options && basisField.options.choices) || []).some(c => c.name === BASIS)) throw new Error(`S5: appBasisField has no choice "${BASIS}"`);
const AP = {
  key: id(bind('AP', 'appKeyField', 'singleLineText')),
  slot: id(bind('AP', 'appSlotField', 'multipleRecordLinks')),
  accepted: id(bind('AP', 'appAcceptedImageField', 'multipleRecordLinks')),
  basis: basisField.id,
  decision: id(bind('AP', 'appUseDecisionField', 'multipleRecordLinks')),
  destination: id(bind('AP', 'appKeptDestinationField', ...TEXT)),
  receiving: id(bind('AP', 'appKeptReceivingBasisField', ...TEXT)),
  label: id(bind('AP', 'appKeptLabelField', ...TEXT)),
  recordedAt: id(bind('AP', 'appRecordedAtField', 'dateTime', 'date')),
  account: id(bind('AP', 'appAccountField', ...TEXT)),
  current: id(bind('AP', 'appCurrentField', 'checkbox')),
  currentSetAt: id(bind('AP', 'appCurrentSetAtField', 'dateTime')),
  replaces: id(bind('AP', 'appReplacesField', 'multipleRecordLinks')),
  replacedBy: id(bind('AP', 'appReplacedByField', 'multipleRecordLinks')),
  replacedAt: id(bind('AP', 'appReplacedAtField', 'dateTime')),
  withdrawn: id(bind('AP', 'appWithdrawnField', 'checkbox')),
  test: id(bind('AP', 'appTestField', 'checkbox')),
  state: id(bind('AP', 'appStateField', 'formula')),
  name: id(bind('AP', 'appNameField', 'formula', ...TEXT)),
};

// Texts the slot's Status shares (sim/formulas.mjs TEXT); kept equal by the tests.
const HAND = 'Edited by hand';
const SAME = 'Same';
const CHANGE_PENDING = 'a change waits for its decision record';
const HELD_PLAN = 'plan it in a new version of the request';
const HELD_SLOT = "check this slot's decision, then press Record decision to record it again";
const HELD_PRODUCT = "check the product's assignment, then press Record decision on the product";
const HELD_GUIDE = 'adopt the guide again';
const PICK = 'An accepted image';

const text = v => (v == null ? '' : String(v)).trim();
const num = v => (typeof v === 'number' ? v : 0);
const ids = v => (v || []).map(x => x.id);
// A lookup's values: plain values, or { linkedRecordId, value } items; empty values dropped.
const values = v => (v == null ? [] : Array.isArray(v) ? v : [v]).map(x => (x && typeof x === 'object' && 'value' in x ? x.value : x)).filter(x => x != null && x !== '');
const joined = (r, f) => values(r.getCellValue(f)).map(String).join('\n');
const total = (r, f) => values(r.getCellValue(f)).reduce((a, x) => a + (typeof x === 'number' ? x : x === true ? 1 : Number(x) || 0), 0);
const flag = (r, f) => values(r.getCellValue(f)).some(x => x === true || x === 1 || x === '1');
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
const withoutSize = b => b.replace(/ ⟨size: [^⟩]*⟩$/, '').replace(/ ⟨size omitted⟩$/, '');
const lineOf = (body, label) => { const all = [...String(body || '').matchAll(new RegExp(`(?:^|\\n)${label}: ([^\\n]*)`, 'g'))]; return all.length ? all[all.length - 1][1].trim() : ''; };

// ---- what a basis says
// Live basis and Decided basis: "Source: <ID>", one slot line per slot, "replace" or "add", then
// "Facts reviewed: …", "Conditions: …" and the decision record. A slot line is "slot ID ‖ Kept
// definition line ‖ product ID ‖ receiving basis".
function parseBasis(body) {
  const s = String(body || '');
  const m = /^Source: ([^\n]*)\n([\s\S]*?)\n(replace|add)\nFacts reviewed: (yes|no)\n/.exec(s);
  if (!m) return null;
  const entries = m[2].split(/\n(?=rec\w+ ‖ )/).filter(x => x.trim()).map(l => {
    const p = l.split(' ‖ ');
    return p.length === 4 ? { slot: p[0].trim(), line: p[1], product: p[2].trim(), receiving: p[3] } : null;
  });
  if (!entries.length || entries.some(e => !e)) return null;
  return { source: m[1].trim(), entries, replace: m[3] === 'replace', reviewed: m[4] === 'yes', by: lineOf(s, 'Decided by') };
}
// Decided selection: "slot ID: app, app" or "slot ID: none", one line per slot.
function parseSelection(body) {
  const out = new Map();
  for (const l of String(body || '').split('\n')) {
    const m = /^(rec\w+): (.*)$/.exec(l.trim());
    if (m) out.set(m[1], m[2].trim() === 'none' ? [] : m[2].split(',').map(x => x.trim()).filter(Boolean));
  }
  return out;
}
// Products kept: one line per input product, "product ID | share key | facts | size | size shown/omitted".
function parseProducts(body) {
  return String(body || '').split('\n').map(x => x.trim()).filter(Boolean).map(l => {
    const p = l.split(' | ');
    if (p.length < 5) return null;
    return { product: p[0].trim(), key: p[1], facts: p.slice(2, -2).join(' | '), size: p[p.length - 2], omitted: p[p.length - 1].trim() === 'size omitted' };
  }).filter(Boolean);
}
// A basis with each slot line reduced to its slot ID: what the decision-maker entered, without the
// slots' kept lines and receiving bases.
function decisionPart(body) {
  const s = String(body || '');
  const m = /^Source: ([^\n]*)\n([\s\S]*?)\n((?:replace|add)\nFacts reviewed: [\s\S]*)$/.exec(s);
  if (!m) return s;
  return `Source: ${m[1]}\n${m[2].split(/\n(?=rec\w+ ‖ )/).map(l => l.split(' ‖ ')[0].trim()).join('\n')}\n${m[3]}`;
}
// Ended slots: "slot ID: what ended it", one line per slot a final failure ended for this decision.
function parseEnded(body) {
  const out = new Map();
  for (const l of String(body || '').split('\n')) { const m = /^(rec\w+): (.*)$/.exec(l.trim()); if (m && !out.has(m[1])) out.set(m[1], m[2].trim()); }
  return out;
}
const labelOf = by => (by === 'ASK' ? 'Example decision by ASK' : `Decision by ${by}`);

// ---- reading
async function readApplications() {
  const res = await tables.AP.selectRecordsAsync({ fields: [AP.key, AP.slot, AP.current, AP.withdrawn, AP.replaces, AP.replacedBy, AP.state, AP.name] });
  return res.records.map(r => ({
    id: r.id, key: text(r.getCellValue(AP.key)), slot: ids(r.getCellValue(AP.slot))[0] || '',
    current: !!r.getCellValue(AP.current), withdrawn: !!r.getCellValue(AP.withdrawn),
    replaces: ids(r.getCellValue(AP.replaces)), replacedBy: ids(r.getCellValue(AP.replacedBy)),
    hand: text(r.getCellValue(AP.state)) === HAND, name: text(r.getCellValueAsString(AP.name)) || r.id,
  }));
}
function slotInfo(r) {
  const heldRemedy = text(r.getCellValue(S.keptPlanCheck)) ? HELD_PLAN : text(r.getCellValue(S.recordCheck)) ? HELD_SLOT
    : values(r.getCellValue(S.productIntact)).some(x => Number(x) === 0) ? HELD_PRODUCT : HELD_GUIDE;
  return {
    id: r.id, name: text(r.getCellValue(S.name)) || r.id,
    active: num(r.getCellValue(S.active)) === 1, pickupOk: num(r.getCellValue(S.pickupOk)) === 1,
    pending: !!text(r.getCellValue(S.pending)), held: num(r.getCellValue(S.held)) === 1, heldRemedy,
    keyCount: num(r.getCellValue(S.keyCount)), op: text(r.getCellValue(S.operative)), planKept: !!r.getCellValue(S.planKept),
    guideSame: text(r.getCellValue(S.guide)) === SAME, inPlan: num(r.getCellValue(S.inPlan)) === 1,
    superseded: total(r, S.superseded) > 0, test: !!r.getCellValue(S.test),
    keptLine: text(r.getCellValue(S.keptLine)), keptProduct: text(r.getCellValue(S.keptProduct)), receiving: text(r.getCellValue(S.receiving)),
    signature: joined(r, S.shareSignature), size: joined(r, S.size), facts: joined(r, S.facts), status: text(r.getCellValue(S.status)),
  };
}
async function readSlots(slotIds) {
  if (!slotIds.length) return new Map();
  const res = await tables.S.selectRecordsAsync({ fields: Object.values(S), recordIds: slotIds });
  return new Map(res.records.map(r => [r.id, slotInfo(r)]));
}
async function readSource(sourceId) {
  const r = sourceId ? await tables.A.selectRecordAsync(sourceId, { fields: Object.values(A) }) : null;
  if (!r) return null;
  const productsKept = joined(r, A.productsKept);
  return {
    id: r.id, complete: text(r.getCellValue(A.complete)) === 'Complete', test: flag(r, A.test), current: num(r.getCellValue(A.current)) === 1,
    title: joined(r, A.title) || r.id, products: parseProducts(productsKept), hasProductsKept: !!productsKept.trim(),
    slotsKept: joined(r, A.slotsKept).split('\n').map(l => l.split(' ‖ ')[0].trim()).filter(Boolean),
  };
}

// ---- the checks
// Each named slot as step 2 checks it; '' when it qualifies.
function slotRefusal(s, src, replace, inUse, reviewed) {
  if (src.test !== s.test) return src.test ? 'a Test source serves only Test slots' : 'a non-Test source serves only non-Test slots';
  if (s.held) return `edited by hand; ${s.heldRemedy}`;
  if (s.pending) return CHANGE_PENDING;
  if (!s.active) return `it isn't active (${s.status})`;
  if (s.keyCount !== 1) return "another record has this slot's key: see the slot pair check";
  if (!s.planKept) return 'it has no kept plan';
  if (!s.guideSame) return 'the shot guide changed since it was planned';
  const pickup = s.op === PICK, ofItsShot = src.slotsKept.includes(s.id);
  if (inUse > 0) {
    if (!replace) return 'it already has an image in use: a use decision with Replace can change it';
    if (!pickup && !ofItsShot) return `its fulfillment is ${s.op}, and the source isn't an acceptance of its shot`;
  } else {
    if (!pickup) return `its fulfillment is ${s.op}: it is to be ${s.op === 'Make' ? 'made' : 'shared'}, not picked up`;
    if (!s.pickupOk) return "its Pickup ok doesn't hold";
  }
  return productRefusal(s, src, reviewed).why;
}
// The slot's product among the source's input products (v6 §7.7 step 2).
function productRefusal(s, src, reviewed) {
  if (src.hasProductsKept) {
    const kept = src.products, omit = kept.length > 0 && kept.every(k => k.omitted);
    const key = s.signature.split(' | ')[0];
    const byId = kept.find(k => k.product === s.keptProduct);
    const sameKey = omit && kept.some(k => k.key === key);
    if (reviewed) return byId || sameKey ? { why: '', route: 'reviewed' } : { why: "its product isn't among the source's input products" };
    if (byId) {
      if (`${byId.key} | ${byId.facts}` !== s.signature) return { why: "its product's facts differ from the source's recorded basis" };
      if (!omit && byId.size !== s.size) return { why: "its product's size differs from the size the source shows" };
      return { why: '', route: 'id' };
    }
    if (omit && kept.some(k => `${k.key} | ${k.facts}` === s.signature)) return { why: '', route: 'share key' };
    if (sameKey) return { why: "its share key matches, but its facts differ from the source's recorded basis" };
    if (!omit && kept.some(k => k.key === key)) return { why: "its product isn't among the source's input products: the source shows its product's size, so a matching share key isn't enough" };
    return { why: "its product isn't among the source's input products" };
  }
  const entry = legacy[src.id];
  if (!entry) return { why: 'No recorded product basis.' };
  if (entry.product !== s.keptProduct) return { why: "its product isn't the one the legacy map names for this source" };
  if (!reviewed && entry.facts.trim() !== s.facts) return { why: "its product's facts differ from the facts the legacy map records" };
  return { why: '', route: 'legacy' };
}

let writes = 0;
async function applicationWrite(p) {
  const out = await p;
  writes++;
  if (fault != null && writes >= fault) throw new Error(`S5: test fault: stopped after application write ${writes} (faultAfterWrites = ${fault})`);
  return out;
}
// Take an application out of use: Current false, and Replaced by unless it already has one.
async function takeOut(app, by, at) {
  const cells = { [AP.current]: false, [AP.currentSetAt]: at };
  if (!app.replacedBy.length) Object.assign(cells, { [AP.replacedBy]: [{ id: by }], [AP.replacedAt]: at });
  await applicationWrite(tables.AP.updateRecordAsync(app.id, cells));
  app.current = false;
  if (!app.replacedBy.length) app.replacedBy = [by];
}

async function main() {
  const me = await tables.UD.selectRecordAsync(recordId, { fields: Object.values(D) });
  if (!me) { console.log('skip: use decision not found'); return; }
  if (me.getCellValue(D.applied)) { console.log('skip: Applied is ticked'); return; }
  const apps = await readApplications();
  if (num(me.getCellValue(D.intact)) !== 1) return endEditedByHand(me, apps);

  let decided = me.getCellValue(D.basis) || '';
  let decidedAt = me.getCellValue(D.at);
  let selection;
  let basis, src, slots;
  if (!decided) {
    // ---- step 2: the first press checks the decision as entered
    const refusals = [];
    const by = text(me.getCellValue(D.by)), from = text(me.getCellValue(D.from)), entered = text(me.getCellValue(D.entered));
    if (!text(me.getCellValue(D.conditions))) refusals.push('enter the Conditions: what makes this use valid');
    if (!by || !from || !entered) refusals.push('enter Decided by, Decision source and Entered by');
    const sourceLinks = ids(me.getCellValue(D.source));
    src = sourceLinks.length === 1 ? await readSource(sourceLinks[0]) : null;
    if (sourceLinks.length !== 1) refusals.push('link exactly one accepted image as the source');
    else if (!src || !src.complete) refusals.push("the source accepted image isn't Complete");
    else if (!src.current && refuseEarlier) refusals.push('the source was accepted under an earlier standard of its shot');
    const slotIds = ids(me.getCellValue(D.slots));
    if (!slotIds.length) refusals.push('name at least one slot');
    slots = await readSlots(slotIds);
    const replace = !!me.getCellValue(D.replace), reviewed = !!me.getCellValue(D.reviewed);
    const inUseOn = sid => apps.filter(a => a.slot === sid && a.current && !a.withdrawn);
    if (src && src.complete) for (const sid of slotIds) {
      const s = slots.get(sid);
      if (!s) { refusals.push(`${sid}: its slot record is missing`); continue; }
      const why = slotRefusal(s, src, replace, inUseOn(sid).length, reviewed);
      if (why) refusals.push(`${s.name}: ${why}`);
    }
    if (refusals.length) {
      const message = ['Not applied: nothing was written.', ...refusals.map(x => `- ${x}`)].join('\n');
      await tables.UD.updateRecordAsync(recordId, { [D.result]: message });
      console.log(message);
      return;
    }
    // ---- step 3: fixing the decision, in one update, before any application
    decided = me.getCellValue(D.live) || '';
    basis = parseBasis(decided);
    if (!basis || basis.source !== src.id || basis.entries.map(e => e.slot).join() !== slotIds.join()) throw new Error('S5: the Live basis doesn\'t name the source and slots as read; nothing was written');
    selection = new Map(slotIds.map(sid => [sid, inUseOn(sid).map(a => a.id).sort()]));
    decidedAt = new Date().toISOString();
    await tables.UD.updateRecordAsync(recordId, {
      [D.basis]: decided,
      [D.selection]: slotIds.map(sid => `${sid}: ${selection.get(sid).join(', ') || 'none'}`).join('\n'),
      [D.at]: decidedAt,
      [D.label]: labelOf(by),
    });
  } else {
    // ---- a later press: everything from Decided basis
    basis = parseBasis(decided);
    if (!basis) throw new Error('S5: Decided basis names no source and slots; nothing was written');
    selection = parseSelection(me.getCellValue(D.selection));
    src = await readSource(basis.source);
    slots = await readSlots(basis.entries.map(e => e.slot));
  }
  if (fault === 0) throw new Error('S5: test fault: stopped after the freeze, before any application write (faultAfterWrites = 0)');

  // ---- step 4: applying, one slot at a time, in the Decided basis order
  const label = labelOf(basis.by);
  const omit = !!src && src.hasProductsKept && src.products.length > 0 && src.products.every(k => k.omitted);
  const finals = [], waits = [];
  // A final failure ends the slot for this decision (v6 §7.7 step 4): it is recorded at once, and
  // stays ended on every later press, even when its cause has cleared since.
  const ended = parseEnded(me.getCellValue(D.ended));
  const end = async (slotId, message) => {
    const line = message.replace(/\s*\n\s*/g, ' ');
    ended.set(slotId, line);
    await tables.UD.updateRecordAsync(recordId, { [D.ended]: [...ended].map(([k, v]) => `${k}: ${v}`).join('\n') });
    finals.push(line);
  };
  let done = 0;
  for (const e of basis.entries) {
    const key = `ud:${recordId}/${e.slot}`;
    const own = apps.filter(a => a.key === key && !a.withdrawn);
    if (apps.some(a => a.key === key)) {
      done++;
      // Finish an interrupted replacement; never take out of use one a later decision put in use.
      if (basis.replace) for (const o of own) if (o.current && !o.replacedBy.length) {
        for (const rid of o.replaces) { const r = apps.find(a => a.id === rid); if (r && r.current && !r.withdrawn) await takeOut(r, o.id, new Date().toISOString()); }
      }
      continue;
    }
    if (ended.has(e.slot)) { finals.push(ended.get(e.slot)); continue; }
    const s = slots.get(e.slot);
    if (!s) { await end(e.slot, `${e.slot} not applied: its slot record is missing`); continue; }
    // The selection first (v6, CX7): only an application in use outside this slot's Decided
    // selection counts as a later decision or acceptance; one whose Current was edited by hand
    // makes the slot wait instead (GPT-C).
    const sel = selection.get(e.slot) || [];
    const inUse = apps.filter(a => a.slot === e.slot && a.current && !a.withdrawn);
    const outside = inUse.filter(a => !sel.includes(a.id));
    const later = outside.filter(a => !a.hand);
    if (later.length) { await end(e.slot, `${s.name} superseded by ${later.map(a => a.name).join(', ')}`); continue; }
    const byHand = outside.filter(a => a.hand);
    if (byHand.length) { waits.push(`${s.name} waits: an application's Current was edited by hand; undo it, or resolve the slot with a use decision with Replace`); continue; }
    // Then the slot again, against what was decided: final, or waiting (v6).
    const why = recheck(s, e, src, basis);
    if (why.final) { await end(e.slot, `${s.name} not applied: ${why.final}`); continue; }
    if (why.wait) { waits.push(`${s.name} waits: ${why.wait}`); continue; }
    const madeId = await applicationWrite(tables.AP.createRecordAsync({
      [AP.accepted]: [{ id: src.id }],
      [AP.slot]: [{ id: e.slot }],
      [AP.key]: key,
      [AP.basis]: { name: BASIS },
      [AP.decision]: [{ id: recordId }],
      [AP.destination]: `${e.line} ‖ ${e.product}`,
      [AP.receiving]: omit ? `${withoutSize(e.receiving)} ⟨size omitted⟩` : e.receiving,
      [AP.label]: label,
      [AP.recordedAt]: decidedAt,
      [AP.account]: account,
      [AP.current]: true,
      [AP.currentSetAt]: new Date().toISOString(),
      [AP.replaces]: basis.replace ? sel.filter(x => apps.some(a => a.id === x)).map(x => ({ id: x })) : [],
      [AP.test]: src.test,
    }));
    apps.push({ id: madeId, key, slot: e.slot, current: true, withdrawn: false, replaces: basis.replace ? sel : [], replacedBy: [], hand: false, name: madeId });
    done++;
    // The replacing application is written first; then the Decided selection leaves use.
    if (basis.replace) for (const x of sel) { const r = apps.find(a => a.id === x); if (r && r.current && !r.withdrawn) await takeOut(r, madeId, new Date().toISOString()); }
  }

  // ---- step 5: finishing
  const m = basis.entries.length;
  const notes = [];
  if (src && !src.current) notes.push('Accepted under an earlier standard of its shot; assessed on its recorded basis.');
  if (src && !src.hasProductsKept) notes.push(`The legacy map was used: ${src.title} → ${(legacy[src.id] || {}).product || 'no product'}; its share key was declared, not evidenced.`);
  if (basis.reviewed) notes.push("Facts reviewed: the receiving products' current facts were reviewed by the decision-maker, not matched.");
  // The decision itself edited since it was fixed (its source, slots, Replace, Facts reviewed,
  // Conditions or record), as distinct from a slot replanned or a product's facts changed, which
  // also move the Live basis and are reported per slot above.
  if (decisionPart(me.getCellValue(D.live)) !== decisionPart(decided)) notes.push('Edited after it was decided: the Decided basis was applied, not the edit.');
  if (waits.length) {
    const message = [`Not finished: applied to ${done} of ${plural(m, 'slot')}.`, ...waits.map(x => `- ${x}`), ...finals.map(x => `- ${x}`),
      'Press Apply this decision again once each waiting slot is resolved.', ...notes].join('\n');
    await tables.UD.updateRecordAsync(recordId, { [D.result]: message });
    console.log(message);
    return;
  }
  const head = finals.length ? `Applied in part: ${done} of ${m}; ${finals.join('; ')}.` : `Applied to ${plural(m, 'slot')}.`;
  // The last write: the Result and the latch together.
  await tables.UD.updateRecordAsync(recordId, { [D.result]: [head, ...notes].join('\n'), [D.applied]: true });
  console.log(head);
}

// Step 4's second check, in v6's order: superseded (final), Held (waiting), the final failures,
// then the waiting ones.
function recheck(s, e, src, basis) {
  if (s.superseded) return { final: 'its request is superseded' };
  if (s.held) return { wait: `edited by hand; ${s.heldRemedy}` };
  if (!s.active) return { final: `it isn't active now (${s.status})` };
  const pickup = s.op === PICK, ofItsShot = !!src && src.slotsKept.includes(s.id);
  if (!pickup && !(basis.replace && ofItsShot)) return { final: `its fulfillment is now ${s.op}` };
  if (s.keptLine !== e.line || s.keptProduct !== e.product) return { final: 'it was replanned since this decision was fixed' };
  const omit = !!src && src.hasProductsKept && src.products.length > 0 && src.products.every(k => k.omitted);
  if ((omit ? withoutSize(s.receiving) : s.receiving) !== (omit ? withoutSize(e.receiving) : e.receiving)) return { final: "its product's facts changed since this decision was fixed" };
  if (!src || !src.complete) return { final: "the source isn't Complete now" };
  if (src.test !== s.test) return { final: 'the source and the slot differ in Test' };
  if (s.pending) return { wait: `${CHANGE_PENDING}; record it or undo it, then press again` };
  if (!s.guideSame && s.inPlan) return { wait: 'its shot guide has an edit not yet adopted; adopt it or undo it, then press again' };
  if (s.keyCount !== 1) return { wait: "another record has this slot's key; resolve the slot pair check, then press again" };
  if (!s.planKept || !s.guideSame) return { wait: "its plan isn't ready; see its Status, then press again" };
  return {};
}

// Step 1's second branch: the decision's own record reads Edited by hand (v6).
async function endEditedByHand(me, apps) {
  if (fault === 0) throw new Error('S5: test fault: stopped before any application write (faultAfterWrites = 0)');
  const mine = apps.filter(a => a.key.startsWith(`ud:${recordId}/`) && !a.withdrawn);
  for (const o of mine) if (o.current && !o.replacedBy.length) {
    for (const rid of o.replaces) { const r = apps.find(a => a.id === rid); if (r && r.current && !r.withdrawn) await takeOut(r, o.id, new Date().toISOString()); }
  }
  const basis = parseBasis(me.getCellValue(D.basis));
  const m = Math.max(basis ? basis.entries.length : ids(me.getCellValue(D.slots)).length, new Set(mine.map(a => a.slot)).size);
  const message = `Applied in part: ${new Set(mine.map(a => a.slot)).size} of ${m}; the rest not applied: this decision's record was edited by hand; record a new decision.`;
  await tables.UD.updateRecordAsync(recordId, { [D.result]: message, [D.applied]: true });
  console.log(message);
}

await main();
