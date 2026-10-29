// Application cases: S4 Apply acceptance and S5 Apply use decision, and the formulas they rely on
// (State, Eligibility, Placement state, Slot Status, Progress, Basis check, Record intact), on the
// simulated base. Each case runs the exact script bytes of S4 and S5, with S1, S2, S3, S6 and S7 for
// the steps before them. Snapshot and Accept are the fixtures' stand-ins (a candidate's kept copies,
// then an accepted record), as setup writes; their own behaviour is the copy's to show.
// IDs are v6 §10.1's; a case that covers only a row's script part says so (T12-s4, T40-apps,
// T37-s4s5). GPT-A and GPT-C are the reviewer's clarifications; CTRL-… are negative controls: the
// mechanism disabled in a mutated copy of S5, and the guarding check failing for its reason.
// Local results show the scripts' logic on the simulated base; they don't show what Airtable does.
import * as fx from './fixtures.mjs';
import { World, start, runAlone, holdBefore, kindIs } from '../sim/world.mjs';
import { TEXT } from '../sim/formulas.mjs';

const { bathPlanned, adopt, assign, recordSlot, pressS1, pressS2, pressS3Slot, pressS4, pressS5, slot, slotAt, decision, SRC } = fx;
const PS = 'Product-page slots', AP = 'Applications', UD = 'Use decisions', AI = 'Accepted images', SH = 'Shots', GS = 'Guide slots', SG = 'Shot guides';
const app = (w, id, f) => w.get(AP, id, f);
const ud = (w, id, f) => w.get(UD, id, f);
const placement = (w, s) => slot(w, s, 'Placement state');
const appsOn = (w, s) => w.find(AP, r => (r.get('Slot') || []).includes(s));
const inUse = (w, s) => appsOn(w, s).filter(a => app(w, a, 'In use flag') === 1);
const appsOf = (w, decisionId) => w.find(AP, r => (r.get('Use decision') || []).includes(decisionId));
const appsFrom = (w, acceptedId) => w.find(AP, r => (r.get('Accepted image') || []).includes(acceptedId) && r.get('Basis') === 'Accepted for this use');
const shotOf = (w, s) => (slot(w, s, 'Shot') || [])[0];
const title = (w, acc) => [].concat(w.get(AI, acc, 'Current title') || []).join('');
const keysTwice = w => { const seen = new Map(); for (const a of w.ids(AP)) { const k = app(w, a, 'Application key'); seen.set(k, (seen.get(k) || 0) + 1); } return [...seen].filter(([, n]) => n > 1).map(([k]) => k); };
const writesSince = (w, n) => w.writes.slice(n);
const stored = (w, table, id) => JSON.stringify(w.t(table).records.get(id).cells);
const MIN2 = 2 * 60_000;
const mutate = (t, src, from, to, label) => { const m = src.replace(from, to); t.check(`control prepared (${label})`, m !== src); return m; };

// Snapshot's stand-in, with the candidate's Test (fixtures' snapshotCandidate, plus Test).
function snap(w, shotId, { test = false } = {}) {
  return w.add('Candidates', { ...fx.snapshotCells(w, shotId), Image: fx.CANDIDATE_IMAGE(shotId), Test: test });
}
// A candidate kept, accepted (Accept's stand-in) and applied by the real S4.
async function acceptShot(w, shotId, opts = {}) {
  const candidate = snap(w, shotId, opts), accepted = fx.accept(w, candidate);
  const r = await pressS4(w, accepted, opts.s4);
  return { candidate, accepted, r };
}
// A use decision, entered with its decision record (by ASK, on ASK's relay, unless given).
function decide(w, { source, slots, replace = false, reviewed = false, conditions = 'The towels appear folded, so their size isn\'t shown.', by, entered, from } = {}) {
  return w.add(UD, { 'Accepted image': [source], Slots: slots, Replace: replace, 'Facts reviewed': reviewed, Conditions: conditions, ...decision(from, by, entered) });
}
// v6 §4's Bath set: an adopted collection guide, its request, and S2's Set together shot.
async function bathSet(b) {
  const { w } = b;
  const g = fx.guide(w, 'Bath set', [{ name: 'Set together', position: 1, label: 'collection page, image 1', view: "All the request's products together, each recognizable." },
    { name: 'Coordinated pair', position: 2, label: 'collection page, image 2', view: 'Two of the request\'s products together, so their colors and materials read as a pair.' }], { destination: 'Collection' });
  w.set(GS, g.slots[0], { Includes: 'All products in the request' }); w.set(GS, g.slots[1], { Includes: 'Choose', 'Choose count': 2 });
  await adopt(w, g.id);
  const req = fx.request(w, { name: 'Bath set', workflow: 'Collection', products: [b.P.vessel, b.P.towel, b.P.hand] });
  w.set('Briefs', req.id, { 'Shot guide (collection)': [g.id] });
  await pressS2(w, req.id);
  const together = w.find(SH, r => r.get('Name') === 'Bath set · Set together')[0];
  return { g, req, together, source: opts => acceptShot(w, together, opts) };
}
// The catalog planned, the product-page shots made, and the Bath set's collection shot.
async function setup(opts = {}) {
  const b = await bathPlanned(new World(opts)), { w } = b;
  b.at = (p, n) => slotAt(w, b.L[p], n);
  if (opts.shots !== false) await pressS2(w, b.req.id);
  b.set = await bathSet(b);
  return b;
}

export const cases = [];
const add = (id, title, run) => cases.push({ id, title, run });

// ---------------------------------------------------------------------------------------------
// S4
add('T12-s4', "T12's script part: S4 on an accepted shared shot makes two applications, keyed acc:…, Basis \"Accepted for this use\", Current and In use, Test from the candidate; each slot Settled and shared; a further press is a no-op", async t => {
  for (const test of [false, true]) {
    const b = await setup(), { w } = b;
    const towel1 = b.at('towel', 1), sheet1 = b.at('sheet', 1), sh = shotOf(w, towel1);
    const { candidate, accepted, r } = await acceptShot(w, sh, { test });
    const apps = appsFrom(w, accepted);
    t.check(`[Test ${test}] S4 ran`, r.ok, r.error && r.error.message);
    t.check(`[Test ${test}] two applications, keys "acc:" + record + "/" + slot`, apps.length === 2 && [towel1, sheet1].every(s => apps.some(a => app(w, a, 'Application key') === `acc:${accepted}/${s}` && (app(w, a, 'Slot') || [])[0] === s)), apps.map(a => app(w, a, 'Application key')));
    const kept = w.get('Candidates', candidate, 'Slots kept').split('\n');
    t.check(`[Test ${test}] Basis, Kept label, Recorded at, Test, and Kept destination and receiving basis copied from Slots kept`, apps.every(a => {
      const s = app(w, a, 'Slot')[0], line = kept.find(l => l.startsWith(s)).split(' ‖ ');
      return app(w, a, 'Basis') === 'Accepted for this use' && app(w, a, 'Kept label') === 'made for this page' && app(w, a, 'Recorded at') === w.get(AI, accepted, 'Accepted at')
        && !!app(w, a, 'Test') === test && app(w, a, 'Kept destination') === `${line[1]} ‖ ${line[2]}` && app(w, a, 'Kept receiving basis') === line[3];
    }));
    t.check(`[Test ${test}] each Current and In use; each slot Settled`, apps.every(a => app(w, a, 'Current') === true && app(w, a, 'State') === 'In use') && [towel1, sheet1].every(s => placement(w, s) === 'Settled'), apps.map(a => app(w, a, 'State')));
    t.check(`[Test ${test}] Applications done ticked, with its progress`, w.get(AI, accepted, 'Applications done') === true && w.get(AI, accepted, 'Application progress').startsWith('Applied to 2 of 2 slots'), w.get(AI, accepted, 'Application progress'));
    t.check(`[Test ${test}] Status: made for this page, shared with the other product`, slot(w, towel1, 'Status') === `Has its image: ${title(w, accepted)}, made for this page, shared with Bath Sheet`, slot(w, towel1, 'Status'));
    const n0 = w.writes.length; const again = await pressS4(w, accepted);
    t.check(`[Test ${test}] Retry applications after it finished: nothing written`, again.ok && writesSince(w, n0).length === 0);
  }
});

add('U27', 'S4 retry after a waiver: S4 stops after one of two; the second slot is waived (recorded); Retry applications skips it, ticks Applications done and says why; the first application settles', async t => {
  const b = await setup(), { w } = b;
  const towel1 = b.at('towel', 1), sheet1 = b.at('sheet', 1), sh = shotOf(w, towel1);
  const candidate = snap(w, sh), accepted = fx.accept(w, candidate);
  const r = await pressS4(w, accepted, { faultAfterWrites: '1' });
  const first = w.get('Candidates', candidate, 'Slots kept').split('\n')[0].split(' ‖ ')[0], second = first === towel1 ? sheet1 : towel1;
  t.check('stopped by the fault after one application', !r.ok && /test fault/.test(r.error.message) && appsFrom(w, accepted).length === 1 && !w.get(AI, accepted, 'Applications done'), r.error && r.error.message);
  t.check('the application made reads Unfinished; neither slot Settled', app(w, appsFrom(w, accepted)[0], 'State') === 'Unfinished: press Retry applications on the accepted image' && placement(w, first) === 'Unfinished' && placement(w, second) === '');
  await recordSlot(w, second, { 'Not needed': true, 'Not needed reason': 'test: not needed after all' });
  const r2 = await pressS4(w, accepted);
  t.check('Retry: the waived slot skipped, Applications done ticked, and the progress says why', r2.ok && appsFrom(w, accepted).length === 1 && w.get(AI, accepted, 'Applications done') === true
    && w.get(AI, accepted, 'Application progress').includes(`${slot(w, second, 'Name')}: skipped: the slot is marked not needed.`), w.get(AI, accepted, 'Application progress'));
  t.check('the first application settles', placement(w, first) === 'Settled' && app(w, appsFrom(w, accepted)[0], 'State') === 'In use');
  // The waiver reopened (recorded): the acceptance covers the slot, so Retry applications gives it its application.
  await recordSlot(w, second, { 'Not needed': false, 'Not needed reason': null });
  const covered = slot(w, second, 'Covered'), before = slot(w, second, 'Status');
  const r3 = await pressS4(w, accepted);
  t.check('reopened and covered, it waits for its image; Retry after Applications done makes it, In use; done stays ticked', r3.ok && covered === 1 && before.startsWith('Being made:') && appsFrom(w, accepted).length === 2
    && placement(w, second) === 'Settled' && w.get(AI, accepted, 'Applications done') === true, [before, w.get(AI, accepted, 'Application progress')]);
  const n0 = w.writes.length; await pressS4(w, accepted);
  t.check('a further Retry with nothing new writes nothing', writesSince(w, n0).length === 0);
});

add('U17', 'S4 stops partway: the application made reads Unfinished and Applications done is clear; the second product\'s facts edited, Retry applications makes the second from Slots kept, so it reads Needs review; Applications done ticked; no duplicate', async t => {
  const b = await setup(), { w } = b;
  const towel1 = b.at('towel', 1), sheet1 = b.at('sheet', 1), sh = shotOf(w, towel1);
  const candidate = snap(w, sh), accepted = fx.accept(w, candidate);
  const r = await pressS4(w, accepted, { faultAfterWrites: '1' });
  const first = w.get('Candidates', candidate, 'Slots kept').split('\n')[0].split(' ‖ ')[0], second = first === towel1 ? sheet1 : towel1;
  t.check('stopped after the first application, which reads Unfinished', !r.ok && appsFrom(w, accepted).length === 1 && app(w, appsFrom(w, accepted)[0], 'State') === 'Unfinished: press Retry applications on the accepted image' && !w.get(AI, accepted, 'Applications done'));
  const product = slot(w, second, 'Product')[0];
  w.set('Products', product, { 'Must stay true': `${fx.TERRY} Test: corrected wording.` });
  const r2 = await pressS4(w, accepted);
  const secondApp = appsFrom(w, accepted).find(a => app(w, a, 'Slot')[0] === second);
  t.check('Retry: the second made from Slots kept, so it reads "Needs review: the product\'s facts changed"', r2.ok && secondApp && app(w, secondApp, 'State') === "Needs review: the product's facts changed since this image was applied", secondApp && app(w, secondApp, 'State'));
  t.check('Applications done ticked; no key twice; the first settles', w.get(AI, accepted, 'Applications done') === true && keysTwice(w).length === 0 && placement(w, first) === 'Settled');
});

// ---------------------------------------------------------------------------------------------
// S5: the first press
add('U2', 'A use decision: a Test collection image accepted; a decision naming three Test slots whose products are its inputs, entered on ASK\'s relay: three applications, Basis "Use decision", In use; Decided basis and Decided at written once; the label reads "Example decision by ASK"', async t => {
  const b = await setup(), { w } = b;
  const testReq = fx.request(w, { name: 'Bath product pages (test)', products: [b.P.vessel, b.P.towel, b.P.hand], test: true });
  await pressS1(w, testReq.id);
  const slots = testReq.lines.map(l => slotAt(w, l, 4));
  t.check('three Test pickup slots', slots.every(s => slot(w, s, 'Test') === true && slot(w, s, 'Pickup ok') === 1));
  const src = await b.set.source({ test: true });
  t.check('S4 on a collection acceptance: no kept slots, no application, Applications done ticked', src.r.ok && appsFrom(w, src.accepted).length === 0 && w.get(AI, src.accepted, 'Applications done') === true
    && w.get(AI, src.accepted, 'Application progress').startsWith('No slots kept'), w.get(AI, src.accepted, 'Application progress'));
  const d = decide(w, { source: src.accepted, slots, conditions: 'Test: each product is recognizable in the set image.' });
  const live = ud(w, d, 'Live basis');
  const r = await pressS5(w, d);
  t.check('S5 ran', r.ok, r.error && r.error.message);
  const apps = appsOf(w, d);
  t.check('three applications, keyed ud:, Basis "Use decision", Current, In use; each slot Settled', apps.length === 3 && slots.every(s => apps.some(a => app(w, a, 'Application key') === `ud:${d}/${s}`))
    && apps.every(a => app(w, a, 'Basis') === 'Use decision' && app(w, a, 'Current') === true && app(w, a, 'State') === 'In use' && app(w, a, 'Test') === true) && slots.every(s => placement(w, s) === 'Settled'), apps.map(a => app(w, a, 'State')));
  t.check('Decided basis is the Live basis as checked; Decided selection "none" for each; Applied; Progress "Applied"; Basis check "As decided"', ud(w, d, 'Decided basis') === live && ud(w, d, 'Decided selection') === slots.map(s => `${s}: none`).join('\n')
    && ud(w, d, 'Applied') === true && ud(w, d, 'Progress') === 'Applied' && ud(w, d, 'Basis check') === 'As decided' && ud(w, d, 'Result') === 'Applied to 3 slots.', ud(w, d, 'Result'));
  t.check('the label reads "Example decision by ASK", and the Status shows it', ud(w, d, 'Decision label') === 'Example decision by ASK' && apps.every(a => app(w, a, 'Kept label') === 'Example decision by ASK')
    && slot(w, slots[1], 'Status') === `Has its image: used again from ${title(w, src.accepted)}, Example decision by ASK`, slot(w, slots[1], 'Status'));
  const at = ud(w, d, 'Decided at'), n0 = w.writes.length;
  const again = await pressS5(w, d);
  t.check('a second press is a no-op: nothing written; Decided at unchanged', again.ok && writesSince(w, n0).length === 0 && ud(w, d, 'Decided at') === at);
});

// U9's copy finding: a product with no style or color gives a receiving basis that begins with a space.
async function u9unstyled(t, src5 = SRC.s5) {
  const b = await setup(), { w } = b;
  const plain = fx.product(w, { name: 'Plain Vessel', style: null, color: null, size: null, facts: 'A small upright vessel. Keep its form and glaze.' });
  await assign(w, plain, b.vessel.id, 'a ceramic vessel');
  const set = fx.request(w, { name: 'Plain set', workflow: 'Collection', products: [plain, b.P.vessel] });
  w.set('Briefs', set.id, { 'Shot guide (collection)': [b.set.g.id] });
  await pressS2(w, set.id);
  const together = w.find(SH, r => r.get('Name') === 'Plain set · Set together')[0];
  const src = await acceptShot(w, together);
  const pages = fx.request(w, { name: 'Plain pages', products: [plain, b.P.vessel] });
  await pressS1(w, pages.id);
  const slots = pages.lines.map(l => slotAt(w, l, 4));
  t.check('the plain product\'s slot: its receiving basis begins with a space', String(slot(w, slots[0], 'Receiving basis') || '').startsWith(' '), slot(w, slots[0], 'Receiving basis'));
  const d = decide(w, { source: src.accepted, slots });
  const r = await pressS5(w, d, {}, src5);
  return { w, d, r, slots };
}
add('U9-unstyled', "U9's copy finding: a decision to a slot whose product has no style or color (its receiving basis begins with a space) applies; S5 reads the slot's receiving basis as the basis line carries it, untrimmed", async t => {
  const { w, d, r, slots } = await u9unstyled(t);
  t.check('both slots applied and Settled; nothing ended', r.ok && appsOf(w, d).length === 2 && slots.every(s => placement(w, s) === 'Settled') && !ud(w, d, 'Ended slots') && ud(w, d, 'Result') === 'Applied to 2 slots.', ud(w, d, 'Result'));
});
add('CTRL-U9', "Negative control: with S5 trimming the slot's receiving basis, U9-unstyled's guard fails: the plain product's slot is ended as \"its product's facts changed\"", async t => {
  const m = mutate(t, SRC.s5, 'receiving: exact(r.getCellValue(S.receiving))', 'receiving: text(r.getCellValue(S.receiving))', 'S5 trims the receiving basis');
  const { w, d, r, slots } = await u9unstyled(t, m);
  t.check('the mutated S5 ran to the end and ended the plain slot as changed facts', r.ok && appsOf(w, d).length === 1 && placement(w, slots[0]) !== 'Settled'
    && String(ud(w, d, 'Result')).includes("its product's facts changed since this decision was fixed"), ud(w, d, 'Result'));
});

add('U3', 'Refusal: one named slot\'s product isn\'t an input: nothing is applied, and the Result names the slot', async t => {
  const b = await setup(), { w } = b;
  const src = await b.set.source();
  const hand4 = b.at('hand', 4), sheet4 = b.at('sheet', 4);
  const d = decide(w, { source: src.accepted, slots: [hand4, sheet4] });
  const n0 = w.writes.length; const r = await pressS5(w, d);
  t.check('refused: only the Result written, naming the slot', r.ok && writesSince(w, n0).every(x => x.table === UD && x.fields.join() === 'Result') && appsOf(w, d).length === 0 && !ud(w, d, 'Decided basis')
    && ud(w, d, 'Result').startsWith(`Not applied: nothing was written.\n- ${slot(w, sheet4, 'Name')}: its product isn't among the source's input products`) && !ud(w, d, 'Result').includes(slot(w, hand4, 'Name')), ud(w, d, 'Result'));
});

add('U4', 'Refusal: the slot is to be made', async t => {
  const b = await setup(), { w } = b;
  const src = await b.set.source();
  const front = b.at('vessel', 1);
  const d = decide(w, { source: src.accepted, slots: [front] });
  await pressS5(w, d);
  t.check('refused, naming the slot\'s fulfillment', appsOf(w, d).length === 0 && ud(w, d, 'Result').endsWith(`${slot(w, front, 'Name')}: its fulfillment is Make: it is to be made, not picked up`), ud(w, d, 'Result'));
});

add('U5', 'Refusal: the slot already has an image, without Replace', async t => {
  const b = await setup(), { w } = b;
  const s1 = await b.set.source(), s2 = await b.set.source();
  const hand4 = b.at('hand', 4);
  const d1 = decide(w, { source: s1.accepted, slots: [hand4] }); await pressS5(w, d1);
  t.check('the first decision applied', placement(w, hand4) === 'Settled');
  const d2 = decide(w, { source: s2.accepted, slots: [hand4] }); await pressS5(w, d2);
  t.check('refused without Replace', appsOf(w, d2).length === 0 && ud(w, d2, 'Result').endsWith(`${slot(w, hand4, 'Name')}: it already has an image in use: a use decision with Replace can change it`), ud(w, d2, 'Result'));
});

add('U6', 'The source\'s standard changed (Source current = 0): applied, and the Result says it was accepted under an earlier standard (P12 default); under P12\'s alternative, refused', async t => {
  for (const alt of [false, true]) {
    const b = await setup(), { w } = b;
    const src = await b.set.source();
    w.set('Briefs', b.set.req.id, { Direction: 'The vessel leads, with the towels folded beside it. Test: a later direction.' });
    t.check(`[${alt ? 'P12 alternative' : 'default'}] Source current reads 0`, w.get(AI, src.accepted, 'Source current') === 0);
    const hand4 = b.at('hand', 4);
    const d = decide(w, { source: src.accepted, slots: [hand4] });
    const r = await pressS5(w, d, alt ? { refuseEarlierStandard: 'yes' } : {});
    if (!alt) t.check('[default] applied; the Result says so', r.ok && placement(w, hand4) === 'Settled' && ud(w, d, 'Result') === 'Applied to 1 slot.\nAccepted under an earlier standard of its shot; assessed on its recorded basis.', ud(w, d, 'Result'));
    else t.check('[P12 alternative] refused; nothing applied', r.ok && appsOf(w, d).length === 0 && ud(w, d, 'Result').includes('the source was accepted under an earlier standard of its shot'), ud(w, d, 'Result'));
  }
});

// U7: a third and a fourth test size of the Terry towel, each with a recorded departure to "An
// accepted image" on its Folded slot, and the shared Folded shot of the towel and the sheet accepted.
async function sizes() {
  const b = await bathPlanned(new World()), { w } = b;
  const large = fx.product(w, { name: 'Bath Towel Large', style: 'Terry towel', color: 'white', size: 'large', facts: fx.TERRY, test: true });
  const fringed = fx.product(w, { name: 'Fringed Towel', style: 'Terry towel', color: 'white', size: 'bath', facts: 'A white terry towel with a fringed edge. Keep its color, pile and fringe.', test: true });
  for (const p of [large, fringed]) await assign(w, p, b.textile.id, 'test: a woven bath textile sold in sizes');
  const lLarge = fx.line(w, b.req.id, large), lFringed = fx.line(w, b.req.id, fringed);
  await pressS1(w, b.req.id);
  const largeFolded = slotAt(w, lLarge, 1), fringedFolded = slotAt(w, lFringed, 1);
  for (const s of [largeFolded, fringedFolded]) await recordSlot(w, s, { Fulfillment: 'An accepted image', 'Fulfillment reason': 'test: the shared folded image shows this size too' });
  await pressS2(w, b.req.id);
  const towel1 = slotAt(w, b.L.towel, 1), shared = shotOf(w, towel1);
  const sharedSrc = await acceptShot(w, shared);
  const hanging = await acceptShot(w, shotOf(w, slotAt(w, b.L.towel, 2)));
  // Test-to-Test: the slots of the new products are in a non-Test request; S1 marks a slot Test only through its line or request.
  return { b, w, largeFolded, fringedFolded, shared, sharedSrc, hanging };
}
add('U7a', 'Share key from a shared shot: an accepted image from the shared Folded shot (size omitted) applied to a third size\'s slot, compared with Products kept', async t => {
  const { w, largeFolded, sharedSrc } = await sizes();
  t.check('the shared source omitted size', w.get('Candidates', sharedSrc.candidate, 'Products kept').split('\n').every(l => l.endsWith(' | size omitted')));
  const d = decide(w, { source: sharedSrc.accepted, slots: [largeFolded] });
  const r = await pressS5(w, d);
  const a = appsOf(w, d)[0];
  t.check('applied by share key; its Kept receiving basis omits the size; Settled', r.ok && a && app(w, a, 'Kept receiving basis').endsWith(' ⟨size omitted⟩') && app(w, a, 'State') === 'In use' && placement(w, largeFolded) === 'Settled', [ud(w, d, 'Result'), a && app(w, a, 'State')]);
});
add('U7b', 'Share key from an unshared shot: a source that shows its product\'s size, with a matching share key: refused', async t => {
  const { w, largeFolded, hanging } = await sizes();
  t.check('the unshared source shows size', w.get('Candidates', hanging.candidate, 'Products kept').endsWith(' | size shown'));
  const d = decide(w, { source: hanging.accepted, slots: [largeFolded] });
  await pressS5(w, d);
  t.check('refused: a matching share key isn\'t enough where the source shows size', appsOf(w, d).length === 0 && ud(w, d, 'Result').includes("the source shows its product's size, so a matching share key isn't enough"), ud(w, d, 'Result'));
});
add('U7c', 'Facts differ: a matching share key but a different Facts without size from the kept one: refused', async t => {
  const { w, fringedFolded, sharedSrc } = await sizes();
  const d = decide(w, { source: sharedSrc.accepted, slots: [fringedFolded] });
  await pressS5(w, d);
  t.check('refused: its facts differ from the recorded basis', appsOf(w, d).length === 0 && ud(w, d, 'Result').includes("its share key matches, but its facts differ from the source's recorded basis"), ud(w, d, 'Result'));
});

add('U10', 'Replace: the new application is In use; the old one is not Current, with Replaced by; the new one\'s Replaces names it', async t => {
  const b = await setup(), { w } = b;
  const s1 = await b.set.source(), s2 = await b.set.source();
  const hand4 = b.at('hand', 4);
  const d1 = decide(w, { source: s1.accepted, slots: [hand4] }); await pressS5(w, d1);
  const old = appsOf(w, d1)[0];
  const d2 = decide(w, { source: s2.accepted, slots: [hand4], replace: true }); const r = await pressS5(w, d2);
  const neu = appsOf(w, d2)[0];
  t.check('the Decided selection named the old one', ud(w, d2, 'Decided selection') === `${hand4}: ${old}`);
  t.check('the new one In use, and its Replaces names the old', r.ok && app(w, neu, 'State') === 'In use' && JSON.stringify(app(w, neu, 'Replaces')) === JSON.stringify([old]));
  t.check('the old one not Current, Replaced by the new, State "Replaced by …"', !app(w, old, 'Current') && JSON.stringify(app(w, old, 'Replaced by')) === JSON.stringify([neu]) && app(w, old, 'State') === `Replaced by ${app(w, neu, 'Name')}` && !!app(w, old, 'Replaced at'));
  t.check('Settled on the new source', placement(w, hand4) === 'Settled' && slot(w, hand4, 'Status') === `Has its image: used again from ${title(w, s2.accepted)}, Example decision by ASK`, slot(w, hand4, 'Status'));
});

add('U12', 'Test-to-Test: a Test source to a non-Test slot: refused', async t => {
  const b = await setup(), { w } = b;
  const src = await b.set.source({ test: true });
  const hand4 = b.at('hand', 4);
  const d = decide(w, { source: src.accepted, slots: [hand4] }); await pressS5(w, d);
  t.check('refused', appsOf(w, d).length === 0 && ud(w, d, 'Result').endsWith(`${slot(w, hand4, 'Name')}: a Test source serves only Test slots`), ud(w, d, 'Result'));
});

add('U14', 'A stale receiving slot: with the slot\'s product reassigned by a recorded decision, a decision to it is refused (Pickup ok = 0); before the reassignment is recorded, the decision applies (v6)', async t => {
  for (const recorded of [false, true]) {
    const b = await setup(), { w } = b;
    const src = await b.set.source();
    const hand4 = b.at('hand', 4);
    if (recorded) await assign(w, b.P.hand, b.vessel.id, 'test: reassigned');
    else w.set('Products', b.P.hand, { 'Shot guide': [b.vessel.id], 'Assignment basis': 'test: reassigned, not yet recorded' });
    const d = decide(w, { source: src.accepted, slots: [hand4] }); await pressS5(w, d);
    if (recorded) t.check('[recorded] refused: Pickup ok 0, the slot isn\'t in the adopted plan', slot(w, hand4, 'Pickup ok') === 0 && appsOf(w, d).length === 0 && ud(w, d, 'Result').includes("it isn't active (Not in the adopted plan: the product was reassigned)"), ud(w, d, 'Result'));
    else t.check('[draft] the edited link changes nothing: applied, Settled', w.get('Products', b.P.hand, 'Assignment check') === 'Recorded; a change waits for its decision record' && placement(w, hand4) === 'Settled' && ud(w, d, 'Applied') === true, ud(w, d, 'Result'));
  }
});

add('U15/CX4', 'CX4: a stop after the first of two writes: Progress "Applied to 1 of 2", the application Unfinished, neither slot Settled; cleared and pressed again, the second is made and Applied ticked, no key duplicated, Decided at unchanged; with the second slot replanned first, it is skipped and the decision reads Applied in part', async t => {
  for (const replanned of [false, true]) {
    const tag = replanned ? '[replanned]' : '[retry]';
    const b = await setup(), { w } = b;
    const src = await b.set.source();
    const towel4 = b.at('towel', 4), hand4 = b.at('hand', 4);
    const d = decide(w, { source: src.accepted, slots: [towel4, hand4] });
    const r = await pressS5(w, d, { faultAfterWrites: '1' });
    t.check(`${tag} stopped by the fault after one application`, !r.ok && /test fault/.test(r.error.message) && appsOf(w, d).length === 1 && !!ud(w, d, 'Decided at'), r.error && r.error.message);
    t.check(`${tag} Progress reads "Applied to 1 of 2"; the application reads Unfinished; neither slot Settled`, ud(w, d, 'Progress') === 'Applied to 1 of 2 slots: press Apply this decision again to finish'
      && app(w, appsOf(w, d)[0], 'State') === 'Unfinished: press Apply this decision again' && placement(w, towel4) !== 'Settled' && placement(w, hand4) !== 'Settled', ud(w, d, 'Progress'));
    const decidedAt = ud(w, d, 'Decided at');
    if (replanned) {
      w.set(GS, b.textile.slots[3], { View: `${fx.VIEWS.setting} Test: in daylight.` }); await adopt(w, b.textile.id);
      await pressS3Slot(w, hand4);
      t.check(`${tag} the second slot replanned, back in the plan with a new kept line`, slot(w, hand4, 'Active') === 1 && slot(w, hand4, 'Kept guide version') === 2);
    }
    const r2 = await pressS5(w, d);
    t.check(`${tag} pressed again: Applied; Decided at unchanged; no key twice`, r2.ok && ud(w, d, 'Applied') === true && ud(w, d, 'Decided at') === decidedAt && keysTwice(w).length === 0);
    if (!replanned) t.check('[retry] the second made; both Settled; "Applied to 2 slots."', appsOf(w, d).length === 2 && placement(w, towel4) === 'Settled' && placement(w, hand4) === 'Settled' && ud(w, d, 'Result') === 'Applied to 2 slots.', ud(w, d, 'Result'));
    else t.check('[replanned] the second skipped as changed since decided: Applied in part', appsOf(w, d).length === 1
      && ud(w, d, 'Result') === `Applied in part: 1 of 2; ${slot(w, hand4, 'Name')} not applied: it was replanned since this decision was fixed.` && ud(w, d, 'Progress') === 'Applied in part', ud(w, d, 'Result'));
  }
});

add('U16', 'A stop during a replacement: two applications in use, the old "Replacement unfinished", not Settled; cleared and pressed again, the old leaves use with Replaced by; one In use', async t => {
  const b = await setup(), { w } = b;
  const s1 = await b.set.source(), s2 = await b.set.source();
  const hand4 = b.at('hand', 4);
  const d1 = decide(w, { source: s1.accepted, slots: [hand4] }); await pressS5(w, d1);
  const old = appsOf(w, d1)[0];
  const d2 = decide(w, { source: s2.accepted, slots: [hand4], replace: true });
  const r = await pressS5(w, d2, { faultAfterWrites: '1' });
  t.check('stopped after the replacing application was written', !r.ok && appsOf(w, d2).length === 1 && inUse(w, hand4).length === 2);
  t.check('two in use: the old reads "Replacement unfinished", the slot isn\'t Settled', app(w, old, 'State') === 'Replacement unfinished: press Apply this decision again on the replacing decision' && placement(w, hand4) !== 'Settled', [app(w, old, 'State'), placement(w, hand4)]);
  const r2 = await pressS5(w, d2);
  const neu = appsOf(w, d2)[0];
  t.check('pressed again: the old not Current, Replaced by the new; one In use; Settled', r2.ok && !app(w, old, 'Current') && JSON.stringify(app(w, old, 'Replaced by')) === JSON.stringify([neu]) && inUse(w, hand4).length === 1 && placement(w, hand4) === 'Settled' && appsOf(w, d2).length === 1);
});

add('U18', 'An edit after application: Conditions and slots edited; Basis check reads "Edited after it was decided"; the applications and their Kept destination are unchanged; a press does nothing', async t => {
  const b = await setup(), { w } = b;
  const src = await b.set.source();
  const hand4 = b.at('hand', 4), towel4 = b.at('towel', 4);
  const d = decide(w, { source: src.accepted, slots: [hand4] }); await pressS5(w, d);
  const a = appsOf(w, d)[0], before = stored(w, AP, a);
  w.set(UD, d, { Conditions: 'Test: a different condition.', Slots: [hand4, towel4] });
  t.check('Basis check reads "Edited after it was decided"', ud(w, d, 'Basis check') === 'Edited after it was decided: what was decided stands; a different use is a new decision');
  const n0 = w.writes.length; const r = await pressS5(w, d);
  t.check('a press does nothing; the application unchanged', r.ok && writesSince(w, n0).length === 0 && stored(w, AP, a) === before && appsOf(w, d).length === 1);
});

add('U19', 'An edit after a partial application: stop after one of two, edit the slots, clear the fault, press again: S5 finishes the Decided basis, not the edit, and the Result says so', async t => {
  const b = await setup(), { w } = b;
  const src = await b.set.source();
  const towel4 = b.at('towel', 4), hand4 = b.at('hand', 4), vessel4 = b.at('vessel', 4);
  const d = decide(w, { source: src.accepted, slots: [towel4, hand4] });
  await pressS5(w, d, { faultAfterWrites: '1' });
  w.set(UD, d, { Slots: [towel4, vessel4] });
  const r = await pressS5(w, d);
  t.check('the Decided basis finished: the second slot applied, the added one not', r.ok && appsOf(w, d).some(a => app(w, a, 'Slot')[0] === hand4) && !appsOf(w, d).some(a => app(w, a, 'Slot')[0] === vessel4) && appsOf(w, vessel4).length === 0);
  t.check('the Result says the edit wasn\'t applied', ud(w, d, 'Applied') === true && ud(w, d, 'Result') === 'Applied to 2 slots.\nEdited after it was decided: the Decided basis was applied, not the edit.', ud(w, d, 'Result'));
});

add('U20', 'Two decisions for one slot: one after the other, the second is refused; two presses together (forced interleaving) read Conflict, not Settled, and a Replace decision leaves one In use', async t => {
  const b = await setup(), { w } = b;
  const s1 = await b.set.source(), s2 = await b.set.source(), s3 = await b.set.source();
  const hand4 = b.at('hand', 4), towel4 = b.at('towel', 4);
  const d1 = decide(w, { source: s1.accepted, slots: [hand4] }); await pressS5(w, d1);
  const d2 = decide(w, { source: s2.accepted, slots: [hand4] }); await pressS5(w, d2);
  t.check('one after the other: the second refused', appsOf(w, d2).length === 0 && ud(w, d2, 'Result').includes('it already has an image in use'));
  // Two first presses together, on another slot: the first is held before its freeze while the second runs.
  const e1 = decide(w, { source: s1.accepted, slots: [towel4] }), e2 = decide(w, { source: s2.accepted, slots: [towel4] });
  const run1 = start(w, SRC.s5, fx.cfg('s5', e1)), run2 = start(w, SRC.s5, fx.cfg('s5', e2));
  await holdBefore(w, run1, p => p.kind === 'write');
  await runAlone(w, run2); await runAlone(w, run1);
  t.check('both ran and both applied', run1.ok && run2.ok && ud(w, e1, 'Applied') && ud(w, e2, 'Applied'), [run1.error && run1.error.message, run2.error && run2.error.message]);
  t.check('two in use: the slot reads Conflict, not Settled', inUse(w, towel4).length === 2 && placement(w, towel4) === 'Conflict' && slot(w, towel4, 'Status') === 'Conflict: 2 images in use. Resolve with a use decision with Replace', slot(w, towel4, 'Status'));
  const e3 = decide(w, { source: s3.accepted, slots: [towel4], replace: true }); const r = await pressS5(w, e3);
  t.check('a Replace decision leaves one In use; Settled', r.ok && inUse(w, towel4).length === 1 && app(w, inUse(w, towel4)[0], 'Use decision')[0] === e3 && placement(w, towel4) === 'Settled');
});

add('U21', 'The receiving product\'s facts change after use: Needs review, not Settled; the records unchanged; a Replace with the same source refused; restoring the facts settles it again with no decision; a Replace with Facts reviewed settles it, and its Result says the facts were reviewed, not matched', async t => {
  const b = await setup(), { w } = b;
  const src = await b.set.source();
  const hand4 = b.at('hand', 4);
  const d1 = decide(w, { source: src.accepted, slots: [hand4] }); await pressS5(w, d1);
  const a = appsOf(w, d1)[0], accBefore = stored(w, AI, src.accepted), appBefore = stored(w, AP, a);
  const facts = w.get('Products', b.P.hand, 'Must stay true');
  w.set('Products', b.P.hand, { 'Must stay true': `${facts} Test: corrected wording.` });
  t.check('Needs review: the product\'s facts changed; not Settled', app(w, a, 'State') === "Needs review: the product's facts changed since this image was applied" && placement(w, hand4) === 'Needs review');
  t.check('the acceptance and application records are unchanged', stored(w, AI, src.accepted) === accBefore && stored(w, AP, a) === appBefore);
  const d2 = decide(w, { source: src.accepted, slots: [hand4], replace: true }); await pressS5(w, d2);
  t.check('a Replace with the same source: refused, its kept facts no longer match', appsOf(w, d2).length === 0 && ud(w, d2, 'Result').includes("its product's facts differ from the source's recorded basis"), ud(w, d2, 'Result'));
  w.set('Products', b.P.hand, { 'Must stay true': facts });
  t.check('the facts restored: Settled again, with no decision', placement(w, hand4) === 'Settled' && app(w, a, 'State') === 'In use');
  w.set('Products', b.P.hand, { 'Must stay true': `${facts} Test: corrected wording.` });
  const d3 = decide(w, { source: src.accepted, slots: [hand4], replace: true, reviewed: true }); const r = await pressS5(w, d3);
  t.check('a Replace with Facts reviewed: applied, Settled; the Result says the facts were reviewed, not matched', r.ok && placement(w, hand4) === 'Settled' && app(w, appsOf(w, d3)[0], 'State') === 'In use'
    && ud(w, d3, 'Result') === "Applied to 1 slot.\nAccepted under an earlier standard of its shot; assessed on its recorded basis.\nFacts reviewed: the receiving products' current facts were reviewed by the decision-maker, not matched.", ud(w, d3, 'Result'));
  t.check('(the source\'s standard carries the hand towel\'s facts, so their change also reads as an earlier standard)', w.get(AI, src.accepted, 'Source current') === 0);
});

// U23: the legacy map. Close study is a walkthrough shot's acceptance, kept before Products kept existed.
async function legacySetup() {
  const b = await bathPlanned(new World()), { w } = b;
  const lid = fx.product(w, { name: 'Bath Vessel Lid', style: 'Bath vessel lid', color: 'natural glaze', size: 'one size', facts: 'A lid for the bath vessel in a natural glaze. Keep its glaze and knob.' });
  await assign(w, lid, b.vessel.id, 'a ceramic vessel part');
  const lidLine = fx.line(w, b.req.id, lid);
  await pressS1(w, b.req.id);
  const vessel3 = slotAt(w, b.L.vessel, 3), lid3 = slotAt(w, lidLine, 3);
  for (const s of [vessel3, lid3]) await recordSlot(w, s, { Fulfillment: 'An accepted image', 'Fulfillment reason': 'Close study already shows the glaze' });
  const walk = fx.request(w, { name: 'Launch brief', workflow: 'Walkthrough' });
  const legacyShot = (name) => {
    const sh = w.add(SH, { Name: name, Brief: [walk.id], Placement: 'Product page detail', 'Shot direction': 'A closer, quieter view of the vessel.' });
    const c = w.add('Candidates', { Shot: [sh], 'Number in shot': 1, 'Standard used': w.get(SH, sh, 'Current standard'), 'Intended use': w.get(SH, sh, 'Effective placement'), Image: [{ url: 'https://example.test/c.jpg', filename: 'close.jpg' }] });
    return fx.accept(w, c);
  };
  const close = legacyShot('Close study'), other = legacyShot('Other study');
  const map = JSON.stringify({ [close]: { product: b.P.vessel, facts: w.get('Products', b.P.vessel, 'Product facts') } });
  return { b, w, vessel3, lid3, close, other, map };
}
add('U23', 'A legacy lookup with an overlapping name: a decision from Close study to a slot of "Bath Vessel Lid" is refused, as its product isn\'t in the legacy map; to the Bath Vessel\'s slot, allowed, and the Result says the legacy map was used; another source without Products kept: "No recorded product basis."', async t => {
  const { w, vessel3, lid3, close, other, map } = await legacySetup();
  const r0 = await pressS4(w, close);
  t.check('S4 on the legacy acceptance: no kept slots, Applications done', r0.ok && w.get(AI, close, 'Applications done') === true && appsFrom(w, close).length === 0);
  const dLid = decide(w, { source: close, slots: [lid3] }); await pressS5(w, dLid, { legacyMap: map });
  t.check('Bath Vessel Lid: refused, its product isn\'t the mapped one', appsOf(w, dLid).length === 0 && ud(w, dLid, 'Result').endsWith(`${slot(w, lid3, 'Name')}: its product isn't the one the legacy map names for this source`), ud(w, dLid, 'Result'));
  const d = decide(w, { source: close, slots: [vessel3] }); const r = await pressS5(w, d, { legacyMap: map });
  t.check('the Bath Vessel\'s slot: applied and Settled; the Result says the legacy map was used and the share key was declared, not evidenced', r.ok && placement(w, vessel3) === 'Settled'
    && ud(w, d, 'Result').startsWith('Applied to 1 slot.\nThe legacy map was used: Close study // candidate 1') && ud(w, d, 'Result').includes('its share key was declared, not evidenced'), ud(w, d, 'Result'));
  t.check('its Status: used again from Close study', slot(w, vessel3, 'Status') === 'Has its image: used again from Close study // candidate 1, Example decision by ASK', slot(w, vessel3, 'Status'));
  const dOther = decide(w, { source: other, slots: [lid3] }); await pressS5(w, dOther, { legacyMap: map });
  t.check('another source without Products kept: "No recorded product basis."', appsOf(w, dOther).length === 0 && ud(w, dOther, 'Result').endsWith('No recorded product basis.'), ud(w, dOther, 'Result'));
  const vesselFacts = JSON.parse(map)[close].facts;
  const dWrong = decide(w, { source: close, slots: [vessel3], replace: true });
  w.set('Products', w.get(PS, vessel3, 'Product')[0], { 'Must stay true': `${vesselFacts} Test: changed.` });
  await pressS5(w, dWrong, { legacyMap: map });
  t.check('the mapped product with changed facts: refused against the legacy map\'s facts', appsOf(w, dWrong).length === 0 && ud(w, dWrong, 'Result').includes("its product's facts differ from the facts the legacy map records"), ud(w, dWrong, 'Result'));
});

add('U24-s5', 'Decision records (S5\'s part): a use decision without its three fields is refused; decisions entered by "ASK" and by "claude-code, on ASK\'s relay" both apply, and the label shows Decided by', async t => {
  const b = await setup(), { w } = b;
  const src = await b.set.source();
  const hand4 = b.at('hand', 4), towel4 = b.at('towel', 4), vessel4 = b.at('vessel', 4);
  const bare = w.add(UD, { 'Accepted image': [src.accepted], Slots: [hand4], Conditions: 'Test.' });
  await pressS5(w, bare);
  t.check('without Decided by, Decision source and Entered by: refused', appsOf(w, bare).length === 0 && ud(w, bare, 'Result').includes('enter Decided by, Decision source and Entered by'), ud(w, bare, 'Result'));
  const byAsk = decide(w, { source: src.accepted, slots: [hand4], by: 'ASK', entered: 'ASK' }); await pressS5(w, byAsk);
  const relayed = decide(w, { source: src.accepted, slots: [towel4] }); await pressS5(w, relayed);
  const other = decide(w, { source: src.accepted, slots: [vessel4], by: 'Merchandising lead', entered: "claude-code, on the lead's relay" }); await pressS5(w, other);
  t.check('entered by ASK and by the operator on ASK\'s relay: both apply, labelled "Example decision by ASK"', [byAsk, relayed].every(d => ud(w, d, 'Applied') === true && ud(w, d, 'Decision label') === 'Example decision by ASK'));
  t.check('decided by another: the label shows Decided by, in the Status', ud(w, other, 'Decision label') === 'Decision by Merchandising lead' && slot(w, vessel4, 'Status') === `Has its image: used again from ${title(w, src.accepted)}, Decision by Merchandising lead`, slot(w, vessel4, 'Status'));
});

// U25: one decision on two pickup slots, stopped after the first; then the second changes.
async function u25(variant, src5 = SRC.s5) {
  const b = await setup(), { w } = b;
  const src = await b.set.source();
  const x = b.at('towel', 4), y = b.at('hand', 4);
  const d = decide(w, { source: src.accepted, slots: [x, y] });
  const stop = await fx.press(w, src5, fx.cfg('s5', d, { faultAfterWrites: '1' }));
  const stopped = !stop.ok && appsOf(w, d).length === 1 && app(w, appsOf(w, d)[0], 'Slot')[0] === x;
  const press = () => fx.press(w, src5, fx.cfg('s5', d));
  const out = { w, d, x, y, stopped, steps: [] };
  const step = async label => { const r = await press(); out.steps.push({ label, ok: r.ok, applied: ud(w, d, 'Applied') === true, result: ud(w, d, 'Result') || '', yApps: appsOf(w, d).filter(a => app(w, a, 'Slot')[0] === y).length, xState: app(w, appsOf(w, d)[0], 'State') }); };
  if (variant === 'recorded') { await recordSlot(w, y, { 'Not needed': true, 'Not needed reason': 'test: the set image doesn\'t suit this page' }); await step('recorded'); }
  if (variant === 'draft') { w.set(PS, y, { 'Not needed': true }); await step('draft'); w.set(PS, y, { 'Not needed': false }); await step('undone'); }
  if (variant === 'draft-recorded') { w.set(PS, y, { 'Not needed': true }); await step('draft'); await recordSlot(w, y, { 'Not needed': true }); await step('recorded'); }
  if (variant === 'guide-undone' || variant === 'guide-adopted') {
    const gs = b.textile.slots[3], view = w.get(GS, gs, 'View');
    w.set(GS, gs, { View: `${view} Test: in daylight.` }); await step('draft edit');
    if (variant === 'guide-undone') w.set(GS, gs, { View: view }); else await adopt(w, b.textile.id);
    await step(variant === 'guide-undone' ? 'undone' : 'adopted');
  }
  if (variant === 'two-records') {
    const names = ['Name', 'Line', 'Guide slot', 'Product', 'Request', 'Kept definition line', 'Kept guide ID', 'Kept product ID', 'Kept guide version', 'Kept guide name', 'Kept slot name', 'Kept position', 'Kept placement label', 'Kept view', 'Kept required', 'Kept fill rule', 'Plan kept', 'Fulfillment', 'Test'];
    const dup = w.add(PS, { ...Object.fromEntries(names.map(n => [n, w.get(PS, y, n)])), 'Kept plan written at': w.iso() }); // as an overlapping S1 run writes it
    out.dupKeyCount = slot(w, y, 'Key count');
    await step('two records');
    w.set(PS, dup, { Withdrawn: true, 'Duplicate of': [y] });
    out.kept = slot(w, y, 'Validly withdrawn') === 0 && slot(w, dup, 'Validly withdrawn') === 1;
    await step('withdrawn');
  }
  return out;
}
add('U25', 'A slot changes between presses: recorded Not needed ends it "Applied in part"; a draft waits (Applied clear), and applies once undone; recorded after the draft, Applied in part; an unadopted guide edit waits, undone it applies, adopted it ends; two records for the key wait until the pair check is resolved, keeping the record the decision names', async t => {
  const name = o => slot(o.w, o.y, 'Name');
  let o = await u25('recorded');
  t.check('stopped after the first of two', o.stopped);
  t.check('[recorded] Applied, "Applied in part: 1 of 2", with the reason; the first settles', o.steps[0].applied && o.steps[0].result.startsWith(`Applied in part: 1 of 2; ${name(o)} not applied: it isn't active now (Not needed: Not needed · decided by ASK`) && placement(o.w, o.x) === 'Settled', o.steps[0]);
  o = await u25('draft');
  t.check('[draft] nothing written for the slot; Applied clear; the Result says it waits; the first stays Unfinished', !o.steps[0].applied && o.steps[0].yApps === 0 && o.steps[0].xState === 'Unfinished: press Apply this decision again'
    && o.steps[0].result.includes(`${name(o)} waits: a change waits for its decision record; record it or undo it, then press again`), o.steps[0]);
  t.check('[draft] undone: applied, Applied', o.steps[1].applied && o.steps[1].yApps === 1 && o.steps[1].result === 'Applied to 2 slots.', o.steps[1]);
  o = await u25('draft-recorded');
  t.check('[draft, then recorded] waits, then "Applied in part"', !o.steps[0].applied && o.steps[1].applied && o.steps[1].result.startsWith('Applied in part: 1 of 2;'), o.steps);
  o = await u25('guide-undone');
  t.check('[unadopted guide edit] waits', !o.steps[0].applied && o.steps[0].yApps === 0 && o.steps[0].result.includes(`${name(o)} waits: its shot guide has an edit not yet adopted`), o.steps[0]);
  t.check('[undone] applied', o.steps[1].applied && o.steps[1].yApps === 1, o.steps[1]);
  o = await u25('guide-adopted');
  t.check('[adopted] the slot, out of the adopted plan, ends "Applied in part"', o.steps[1].applied && o.steps[1].yApps === 0 && o.steps[1].result.startsWith(`Applied in part: 1 of 2; ${name(o)} not applied: it isn't active now (Not in the adopted plan`), o.steps[1]);
  o = await u25('two-records');
  t.check('[two records] Key count 2: waits until the pair check is resolved', o.dupKeyCount === 2 && !o.steps[0].applied && o.steps[0].result.includes(`${name(o)} waits: another record has this slot's key`), o.steps[0]);
  t.check('[two records] the record the decision names is kept; the next press applies it', o.kept && o.steps[1].applied && o.steps[1].yApps === 1, o.steps[1]);
});

// A final failure ends its slot for the decision (v6 §7.7 step 4), even while another slot waits:
// the decision is fixed on X and Y; X's waiver is recorded (final) while Y has a draft (waiting);
// then X is reopened by a recorded decision and Y's draft undone, and the decision is pressed again.
async function u25final(src5 = SRC.s5) {
  const b = await setup(), { w } = b;
  const src = await b.set.source();
  const x = b.at('towel', 4), y = b.at('hand', 4);
  const d = decide(w, { source: src.accepted, slots: [x, y] });
  const p = extra => fx.press(w, src5, fx.cfg('s5', d, extra));
  const r0 = await p({ faultAfterWrites: '0' });
  const fixed = !r0.ok && !!ud(w, d, 'Decided at') && appsOf(w, d).length === 0;
  const on = (sid) => appsOf(w, d).filter(a => app(w, a, 'Slot')[0] === sid).length;
  const read = r => ({ ran: r.ok, applied: ud(w, d, 'Applied') === true, result: ud(w, d, 'Result') || '', ended: ud(w, d, 'Ended slots') || '', xApps: on(x), yApps: on(y) });
  await recordSlot(w, x, { 'Not needed': true, 'Not needed reason': 'test: not used on this page' });
  w.set(PS, y, { 'Not needed': true });
  const first = read(await p());
  await recordSlot(w, x, { 'Not needed': false, 'Not needed reason': null });
  w.set(PS, y, { 'Not needed': false });
  const xReopened = slot(w, x, 'Active') === 1 && slot(w, x, 'Pickup ok') === 1;
  const second = read(await p());
  return { w, d, x, y, fixed, first, xReopened, second };
}
add('U25-final', 'A final failure ends the slot for this decision while another slot waits (v6 §7.7 step 4): the ended slot is recorded in Ended slots; once its cause clears and the waiting slot is resolved, the next press applies only the waiting slot and ends "Applied in part", the ended slot unapplied', async t => {
  const o = await u25final();
  const xn = slot(o.w, o.x, 'Name'), yn = slot(o.w, o.y, 'Name');
  t.check('the decision fixed on X and Y, no application yet', o.fixed);
  t.check('first press: X ends (final), Y waits; Applied clear; X recorded in Ended slots', o.first.ran && !o.first.applied && o.first.xApps === 0 && o.first.yApps === 0
    && o.first.result.includes(`${yn} waits: a change waits for its decision record`) && o.first.result.includes(`${xn} not applied: it isn't active now (Not needed`)
    && o.first.ended.startsWith(`${o.x}: ${xn} not applied: it isn't active now (Not needed`), o.first);
  t.check('X reopened by a recorded decision: active and Pickup ok again', o.xReopened);
  t.check('second press: Y applied; X stays ended, unapplied; "Applied in part: 1 of 2" naming X\'s recorded reason', o.second.ran && o.second.applied && o.second.yApps === 1 && o.second.xApps === 0
    && o.second.result.startsWith(`Applied in part: 1 of 2; ${xn} not applied: it isn't active now (Not needed`), o.second);
});

// U26: a later decision during an unfinished one. Each stop is checked before the next step.
async function u26(variant, src5 = SRC.s5) {
  const b = await setup(), { w } = b;
  const S = [];
  for (let i = 0; i < 4; i++) S.push((await b.set.source()).accepted);
  const x = b.at('towel', 4), y = b.at('hand', 4);
  const p = (d, extra) => fx.press(w, src5, fx.cfg('s5', d, extra));
  const out = { w, x, y, checks: [] };
  const note = (label, ok, detail) => out.checks.push([label, !!ok, detail]);
  if (variant === 'duplicate') {
    // X: two applications in use with one key, as a forced overlapping S4 press leaves it.
    const hanging = shotOf(w, b.at('towel', 2)); out.x = b.at('towel', 2);
    const candidate = snap(w, hanging), acc = fx.accept(w, candidate);
    const r1 = start(w, SRC.s4, fx.cfg('s4', acc)), r2 = start(w, SRC.s4, fx.cfg('s4', acc));
    await holdBefore(w, r1, kindIs('create')); await holdBefore(w, r2, kindIs('create'));
    await runAlone(w, r1); await runAlone(w, r2);
    const dups = inUse(w, out.x);
    note('the forced overlap left two applications in use with one key', dups.length === 2 && keysTwice(w).length === 1, dups.length);
    const acc2 = (await acceptShot(w, hanging)).accepted;
    const a = decide(w, { source: acc2, slots: [out.x], replace: true });
    const ra = await p(a, { faultAfterWrites: '0' });
    note('A stopped after its freeze, before any application', !ra.ok && !!ud(w, a, 'Decided at') && appsOf(w, a).length === 0 && ud(w, a, 'Decided selection') === `${out.x}: ${[...dups].sort().join(', ')}`, ud(w, a, 'Decided selection'));
    w.set(AP, dups[1], { Withdrawn: true });
    const ra2 = await p(a);
    out.a = a; out.final = { ok: ra2.ok, applied: ud(w, a, 'Applied'), result: ud(w, a, 'Result'), inUse: inUse(w, out.x), placement: placement(w, out.x) };
    return out;
  }
  // X and Y each settled on one application, by decision D0.
  const d0 = decide(w, { source: S[0], slots: [x, y] }); await p(d0);
  const x0 = appsOf(w, d0).find(a => app(w, a, 'Slot')[0] === x), y0 = appsOf(w, d0).find(a => app(w, a, 'Slot')[0] === y);
  note('X and Y Settled on D0', placement(w, x) === 'Settled' && placement(w, y) === 'Settled');
  if (variant === 'created') {
    const a = decide(w, { source: S[1], slots: [x], replace: true });
    await p(a, { faultAfterWrites: '1' });
    note('A stopped after writing its replacing application', appsOf(w, a).length === 1 && app(w, x0, 'Current') === true && inUse(w, x).length === 2);
    const bd = decide(w, { source: S[2], slots: [x], replace: true }); await p(bd);
    note('B put its source in use', ud(w, bd, 'Applied') === true && inUse(w, x).length === 1 && app(w, inUse(w, x)[0], 'Use decision')[0] === bd);
    await p(a);
    out.a = a; out.b = bd; out.final = { applied: ud(w, a, 'Applied'), result: ud(w, a, 'Result'), inUse: inUse(w, x), placement: placement(w, x) };
  }
  if (variant === 'not-created') {
    const a = decide(w, { source: S[1], slots: [x, y], replace: true });
    await p(a, { faultAfterWrites: '2' });
    note('A stopped after X\'s replacement, before Y\'s application', appsOf(w, a).length === 1 && app(w, appsOf(w, a)[0], 'Slot')[0] === x && !app(w, x0, 'Current') && app(w, y0, 'Current') === true && !!ud(w, a, 'Decided at'));
    const bd = decide(w, { source: S[2], slots: [y], replace: true }); await p(bd);
    const by = appsOf(w, bd)[0];
    note('B replaced Y\'s image; Y Settled on B', placement(w, y) === 'Settled' && inUse(w, y).join() === by);
    await p(a);
    out.a = a; out.by = by; out.final = { applied: ud(w, a, 'Applied'), result: ud(w, a, 'Result'), yInUse: inUse(w, y), yPlacement: placement(w, y), yApps: appsOf(w, a).filter(z => app(w, z, 'Slot')[0] === y).length };
  }
  if (variant === 'earlier-C-then-A' || variant === 'earlier-A-then-C') {
    const c = decide(w, { source: S[1], slots: [x], replace: true });
    await p(c, { faultAfterWrites: '1' });
    note('C stopped before taking the old one out of use: both in use', inUse(w, x).length === 2);
    const a = decide(w, { source: S[2], slots: [x], replace: true });
    await p(a, { faultAfterWrites: '0' });
    note('A fixed while both were in use, then stopped before writing for X', appsOf(w, a).length === 0 && ud(w, a, 'Decided selection').split(': ')[1].split(', ').length === 2);
    if (variant === 'earlier-C-then-A') { await p(c); await p(a); } else { await p(a); await p(c); }
    out.a = a; out.c = c; out.final = { applied: ud(w, a, 'Applied'), cApplied: ud(w, c, 'Applied'), result: ud(w, a, 'Result'), inUse: inUse(w, x), placement: placement(w, x) };
  }
  return out;
}
add('U26/CX7', 'CX7: a later decision during an unfinished one: already created, A finishes without taking B\'s application out of use; not yet created, A writes nothing for Y and reads "Applied in part", naming Y superseded by B; an earlier decision finishing, in both orders, leaves A applied; a withdrawn duplicate is not a supersession', async t => {
  const pass = o => { for (const [l, ok, d] of o.checks) t.check(l, ok, d); };
  let o = await u26('created'); pass(o);
  t.check('[already created] A finishes, Applied; one application In use, B\'s', o.final.applied === true && o.final.inUse.length === 1 && app(o.w, o.final.inUse[0], 'Use decision')[0] === o.b && o.final.placement === 'Settled', o.final);
  o = await u26('not-created'); pass(o);
  t.check('[not yet created] A writes nothing for Y; "Applied in part: 1 of 2", naming Y as superseded by B\'s application', o.final.applied === true && o.final.yApps === 0
    && o.final.result === `Applied in part: 1 of 2; ${slot(o.w, o.y, 'Name')} superseded by ${app(o.w, o.by, 'Name')}.`, o.final.result);
  t.check('[not yet created] Y stays Settled on B', o.final.yInUse.join() === o.by && o.final.yPlacement === 'Settled');
  for (const v of ['earlier-C-then-A', 'earlier-A-then-C']) {
    o = await u26(v); pass(o);
    t.check(`[${v}] A's application In use on X, and A Applied`, o.final.applied === true && o.final.cApplied === true && o.final.inUse.length === 1 && app(o.w, o.final.inUse[0], 'Use decision')[0] === o.a && o.final.placement === 'Settled' && o.final.result === 'Applied to 1 slot.', o.final);
  }
  o = await u26('duplicate'); pass(o);
  t.check('[withdrawn duplicate] X is applied, not superseded', o.final.ok && o.final.applied === true && o.final.result === 'Applied to 1 slot.' && o.final.inUse.length === 1 && app(o.w, o.final.inUse[0], 'Use decision')[0] === o.a && o.final.placement === 'Settled', o.final);
});

add('U30', 'A Replace decision through a draft departure: on a Settled Make slot, Fulfillment set to "An accepted image" with a reason, without S7: a Replace decision from another shot\'s acceptance whose Products kept include the product is refused, "a change waits for its decision record"', async t => {
  const b = await setup(), { w } = b;
  const towel2 = b.at('towel', 2);
  await acceptShot(w, shotOf(w, towel2));
  const src = await b.set.source();
  t.check('Settled, made for this page', placement(w, towel2) === 'Settled');
  w.set(PS, towel2, { Fulfillment: 'An accepted image', 'Fulfillment reason': 'test: the set image instead' });
  const d = decide(w, { source: src.accepted, slots: [towel2], replace: true });
  const n0 = w.writes.length; await pressS5(w, d);
  t.check('refused: a change waits for its decision record; nothing applied', appsOf(w, d).length === 0 && writesSince(w, n0).every(x => x.fields.join() === 'Result')
    && ud(w, d, 'Result').endsWith(`${slot(w, towel2, 'Name')}: a change waits for its decision record`), ud(w, d, 'Result'));
  t.check('the image stays Settled', placement(w, towel2) === 'Settled');
});

// U30b: the step-2 terms that still hold under Replace on a slot with an application in use (v6
// §7.7 step 2: "no Change pending, not Held and Key count 1 still hold"), with the guide-Same and
// kept-plan terms. A Settled Make slot, a Replace decision from a second acceptance of its own shot.
async function u30b(variant, src5 = SRC.s5) {
  const b = await setup(), { w } = b;
  const s = b.at('towel', 2);
  await acceptShot(w, shotOf(w, s)); const second = await acceptShot(w, shotOf(w, s));
  const settled = placement(w, s) === 'Settled';
  if (variant === 'held') { w.advance(MIN2); w.set(PS, s, { 'Kept view': `${slot(w, s, 'Kept view')} Edited.` }); }
  if (variant === 'two-records') {
    const names = ['Name', 'Line', 'Guide slot', 'Product', 'Request', 'Kept definition line', 'Kept guide ID', 'Kept product ID', 'Kept guide version', 'Kept guide name', 'Kept slot name', 'Kept position', 'Kept placement label', 'Kept view', 'Kept required', 'Kept fill rule', 'Plan kept', 'Fulfillment', 'Test'];
    w.add(PS, { ...Object.fromEntries(names.map(n => [n, w.get(PS, s, n)])), 'Kept plan written at': w.iso() }); // as an overlapping S1 run writes it
  }
  if (variant === 'guide-draft') w.set(GS, b.textile.slots[1], { View: `${fx.VIEWS.hanging} Test: a draft edit.` });
  if (variant === 'plan-not-kept') w.set(PS, s, { 'Plan kept': false }); // within the minute: the detector's limit, so not Held
  const d = decide(w, { source: second.accepted, slots: [s], replace: true });
  const n0 = w.writes.length; const r = await fx.press(w, src5, fx.cfg('s5', d));
  return { w, s, d, settled, ran: r.ok, onlyResult: writesSince(w, n0).every(x => x.table === UD && x.fields.join() === 'Result'), result: ud(w, d, 'Result') || '',
    unfixed: ud(w, d, 'Decided at') == null && ud(w, d, 'Decided basis') == null && ud(w, d, 'Decided selection') == null, apps: appsOf(w, d).length, held: slot(w, s, 'Held'), keyCount: slot(w, s, 'Key count') };
}
const U30B = [['held', `edited by hand; ${TEXT.heldPlan.replace(/^Edited by hand: /, '')}`], ['two-records', "another record has this slot's key: see the slot pair check"],
  ['guide-draft', 'the shot guide changed since it was planned'], ['plan-not-kept', 'it has no kept plan']];
add('U30b', 'Under Replace, on a Settled slot with an application in use, a decision from another acceptance of its own shot is refused, only the Result written and the decision not fixed, when the slot is Held, another record has its key, its guide has an unadopted edit, or its plan isn\'t kept', async t => {
  for (const [variant, why] of U30B) {
    const o = await u30b(variant);
    t.check(`[${variant}] Settled before; the condition holds`, o.settled && (variant !== 'held' || o.held === 1) && (variant !== 'two-records' || o.keyCount === 2), [o.held, o.keyCount]);
    t.check(`[${variant}] refused: only the Result written, naming the slot and why; Decided at, Decided basis and Decided selection empty; no application`, o.ran && o.onlyResult && o.unfixed && o.apps === 0
      && o.result.startsWith('Not applied: nothing was written.') && o.result.includes(`- ${slot(o.w, o.s, 'Name')}: ${why}`), o.result);
  }
});

// ---------------------------------------------------------------------------------------------
add('T40-apps', "T40's application part (CX6), with S4's real applications: a recorded waiver leaves the application's Current as it was and reads Needs review; edits without a press change nothing; only the recorded reopening settles the same application again; a draft departure leaves it Settled", async t => {
  const b = await setup(), { w } = b;
  const s = b.at('towel', 2);
  const { accepted } = await acceptShot(w, shotOf(w, s));
  const a = appsFrom(w, accepted)[0];
  t.check('Settled by S4', placement(w, s) === 'Settled' && app(w, a, 'State') === 'In use');
  await recordSlot(w, s, { 'Not needed': true, 'Not needed reason': 'test: hanging not used' });
  t.check('recorded waiver: Current unchanged, "Needs review: the slot is marked not needed", not Settled', app(w, a, 'Current') === true && app(w, a, 'State') === 'Needs review: the slot is marked not needed' && placement(w, s) === 'Needs review');
  const n0 = w.writes.length; await pressS4(w, accepted);
  t.check('Retry applications on the finished acceptance writes nothing', writesSince(w, n0).length === 0);
  const src = await b.set.source();
  const d = decide(w, { source: src.accepted, slots: [s], replace: true }); await pressS5(w, d);
  t.check('a Replace decision while the waiver is recorded: refused, the slot isn\'t active', appsOf(w, d).length === 0 && ud(w, d, 'Result').includes("it isn't active (Not needed:"), ud(w, d, 'Result'));
  w.set(PS, s, { 'Not needed reason': 'test: hanging not used here' }); w.set(PS, s, { 'Not needed': false });
  t.check('edits without a press: still Needs review, not Settled', app(w, a, 'State') === 'Needs review: the slot is marked not needed' && placement(w, s) !== 'Settled');
  await fx.pressS7Slot(w, s);
  t.check('the reopening recorded: the same application In use, Settled; no new application', app(w, a, 'State') === 'In use' && placement(w, s) === 'Settled' && appsOn(w, s).length === 1);
  w.set(PS, s, { Fulfillment: 'An accepted image', 'Fulfillment reason': 'test: a pickup instead' });
  t.check('a draft departure: still Settled', placement(w, s) === 'Settled' && app(w, a, 'State') === 'In use');
});

add('GPT-A', 'GPT-A: the accepted-image replacement route, whole and visible: a covered Make slot records a departure to "An accepted image"; Status and Replan point to a use decision with Replace (not to setting it back); S5 with Replace from a collection image applies; the Status then shows the image used again from it, with its label', async t => {
  const b = await setup(), { w } = b;
  const s = b.at('towel', 2);
  const made = await acceptShot(w, shotOf(w, s));
  const src = await b.set.source();
  t.check('before: Settled, "made for this page"', slot(w, s, 'Status') === `Has its image: ${title(w, made.accepted)}, made for this page` && slot(w, s, 'Covered') === 1, slot(w, s, 'Status'));
  const early = decide(w, { source: src.accepted, slots: [s], replace: true }); await pressS5(w, early);
  t.check('a Replace decision from the collection image before the departure: refused, the source isn\'t an acceptance of its shot', appsOf(w, early).length === 0 && ud(w, early, 'Result').endsWith(`${slot(w, s, 'Name')}: its fulfillment is Make, and the source isn't an acceptance of its shot`), ud(w, early, 'Result'));
  await recordSlot(w, s, { Fulfillment: 'An accepted image', 'Fulfillment reason': 'test: the set image shows the bath towel best' });
  t.check('after the recorded departure: the Status points to a use decision with Replace, not to setting it back', slot(w, s, 'Status') === TEXT.coveredPickup && !slot(w, s, 'Status').includes('Set Fulfillment back'), slot(w, s, 'Status'));
  await pressS3Slot(w, s);
  t.check('Replan on the slot says the same', (w.get(PS, s, 'Replan result') || '').endsWith(TEXT.coveredPickup));
  const d = decide(w, { source: src.accepted, slots: [s], replace: true, conditions: 'Test: the bath towel reads clearly in the set image.' });
  const r = await pressS5(w, d);
  t.check('S5 with Replace applies: the collection image In use, the made image Replaced by it', r.ok && ud(w, d, 'Applied') === true && app(w, appsOf(w, d)[0], 'State') === 'In use'
    && app(w, appsFrom(w, made.accepted)[0], 'State') === `Replaced by ${app(w, appsOf(w, d)[0], 'Name')}`, ud(w, d, 'Result'));
  t.check('after: Settled, "used again from [title], [label]", and no longer asking for the departure to be undone', placement(w, s) === 'Settled'
    && slot(w, s, 'Status') === `Has its image: used again from ${title(w, src.accepted)}, Example decision by ASK`, slot(w, s, 'Status'));
});

// GPT-A's route after S5 starts, and across a later adopted guide change. `variant`:
//   interrupted   S5 with Replace stops after its replacing application (fault 1), then finishes;
//   facts         applied, then the towel's facts change;
//   guide-after   applied, then the Hanging view changes and is adopted: Replan on the slot, then a
//                 new Replace decision;
//   guide-before  the Hanging view changes and is adopted before any use decision.
async function gptaLater(variant, src3 = SRC.s3) {
  const b = await setup(), { w } = b;
  const s = b.at('towel', 2), sh = shotOf(w, s);
  const made = await acceptShot(w, sh);
  const src = await b.set.source();
  await recordSlot(w, s, { Fulfillment: 'An accepted image', 'Fulfillment reason': 'test: the set image shows the bath towel best' });
  const out = { w, s, sh, made, src, steps: {} };
  const look = () => ({ status: slot(w, s, 'Status'), placement: placement(w, s), shot: slot(w, s, 'Shot'), detach: slot(w, s, 'Detach log'), inPlan: slot(w, s, 'In adopted plan') });
  const changeGuide = async () => { w.set(GS, b.textile.slots[1], { View: `${fx.VIEWS.hanging} Test: against a tiled wall.` }); await adopt(w, b.textile.id); };
  const replan = async () => { const r = await fx.press(w, src3, fx.cfg('s3', s, { kind: 'slot' })); return { ran: r.ok, result: w.get(PS, s, 'Replan result') || '', ...look() }; };
  const d = decide(w, { source: src.accepted, slots: [s], replace: true });
  if (variant === 'interrupted') {
    await pressS5(w, d, { faultAfterWrites: '1' }); out.steps.stopped = look();
    await pressS5(w, d); out.steps.finished = look();
  }
  if (variant === 'facts') {
    await pressS5(w, d); out.steps.applied = look();
    w.set('Products', b.P.towel, { 'Must stay true': `${fx.TERRY} Test: corrected.` }); out.steps.facts = look();
  }
  if (variant === 'guide-after') {
    await pressS5(w, d); out.steps.applied = look();
    await changeGuide(); out.steps.stale = { ...look(), reach: slot(w, s, 'Replan reach') };
    out.steps.replan = await replan();
    const d2 = decide(w, { source: src.accepted, slots: [s], replace: true }); const r = await pressS5(w, d2);
    out.steps.confirmed = { ran: r.ok, applied: ud(w, d2, 'Applied'), result: ud(w, d2, 'Result'), ...look() };
  }
  if (variant === 'guide-before') {
    await changeGuide(); out.steps.stale = { ...look(), reach: slot(w, s, 'Replan reach') };
    out.steps.replan = await replan();
    const r = await pressS5(w, d);
    out.steps.applied = { ran: r.ok, applied: ud(w, d, 'Applied'), result: ud(w, d, 'Result'), ...look() };
  }
  return out;
}
const USED_AGAIN = o => `Has its image: used again from ${title(o.w, o.src.accepted)}, Example decision by ASK`;
const STALE_SLOT = 'Not in the adopted plan: the guide changed it: press Replan on this slot';
add('GPT-A-later', "GPT-A's route once S5 has started, and across a later adopted guide change: an interrupted Replace shows its Unfinished remedy; a facts change shows Needs review; after an adopted guide change the slot says \"press Replan on this slot\", Replan refreshes it on its shot without detaching, and a new Replace decision settles it again", async t => {
  let o = await gptaLater('interrupted');
  t.check('[interrupted] the Status shows the Unfinished remedy, not the departure guidance', o.steps.stopped.placement === 'Unfinished' && o.steps.stopped.status === 'Unfinished: press Apply this decision again', o.steps.stopped);
  t.check('[interrupted] pressed again: Settled, used again from the set image', o.steps.finished.placement === 'Settled' && o.steps.finished.status === USED_AGAIN(o), o.steps.finished);
  o = await gptaLater('facts');
  t.check('[facts] applied, then the towel\'s facts change: the Status shows the application\'s Needs review', o.steps.applied.status === USED_AGAIN(o) && o.steps.facts.placement === 'Needs review'
    && o.steps.facts.status === "Needs review: the product's facts changed since this image was applied", o.steps.facts);
  o = await gptaLater('guide-after');
  t.check('[guide after S5] the adopted change makes the slot stale, in reach: "press Replan on this slot"', o.steps.stale.inPlan === 0 && o.steps.stale.reach === 1 && o.steps.stale.status === STALE_SLOT, o.steps.stale);
  t.check('[guide after S5] Replan on the slot refreshes it on its shot, with no detach, and repeats the route\'s guidance', o.steps.replan.ran && o.steps.replan.inPlan === 1 && JSON.stringify(o.steps.replan.shot) === JSON.stringify([o.sh]) && !o.steps.replan.detach
    && o.steps.replan.result.includes('Kept plan refreshed from Bath textile, version 2.') && o.steps.replan.result.endsWith(TEXT.coveredPickup), o.steps.replan);
  t.check('[guide after S5] its image in use reads "Needs review: the slot was replanned", and the Status says so', o.steps.replan.placement === 'Needs review' && o.steps.replan.status === 'Needs review: the slot was replanned since this image was applied', o.steps.replan.status);
  t.check('[guide after S5] a new Replace decision from the same source settles it again', o.steps.confirmed.ran && o.steps.confirmed.applied === true && o.steps.confirmed.placement === 'Settled' && o.steps.confirmed.status === USED_AGAIN(o), o.steps.confirmed);
  o = await gptaLater('guide-before');
  t.check('[guide before S5] stale, in reach: "press Replan on this slot"', o.steps.stale.reach === 1 && o.steps.stale.status === STALE_SLOT, o.steps.stale);
  t.check('[guide before S5] Replan refreshes it on its shot; the Status points to a use decision with Replace again', o.steps.replan.ran && o.steps.replan.inPlan === 1 && JSON.stringify(o.steps.replan.shot) === JSON.stringify([o.sh]) && o.steps.replan.status === TEXT.coveredPickup, o.steps.replan);
  t.check('[guide before S5] S5 with Replace applies: Settled, used again', o.steps.applied.ran && o.steps.applied.applied === true && o.steps.applied.status === USED_AGAIN(o), o.steps.applied);
});

// GPT-C: X Settled on P (its shot's first acceptance), with an alternate Q (a second acceptance).
// Decision A (Replace, from a third acceptance) is fixed with X's selection {P} and stops before
// writing; then Q's Current is ticked by hand, more than a minute after S4 wrote it.
async function gptc(variant, src5 = SRC.s5) {
  const b = await setup(), { w } = b;
  const x = b.at('towel', 2), sh = shotOf(w, x);
  const p1 = await acceptShot(w, sh), p2 = await acceptShot(w, sh), p3 = await acceptShot(w, sh);
  const P = appsFrom(w, p1.accepted)[0], Q = appsFrom(w, p2.accepted)[0];
  const out = { w, x, P, Q, checks: [] };
  const note = (label, ok, detail) => out.checks.push([label, !!ok, detail]);
  const p = (d, extra) => fx.press(w, src5, fx.cfg('s5', d, extra));
  note('P in use, Q an alternate', app(w, P, 'State') === 'In use' && app(w, Q, 'State') === 'Alternate' && slot(w, x, 'Status').endsWith(`. Also accepted: ${title(w, p2.accepted)}, ${title(w, p3.accepted)}`), slot(w, x, 'Status'));
  const a = decide(w, { source: p3.accepted, slots: [x], replace: true });
  await p(a, { faultAfterWrites: '0' });
  note('A fixed with X\'s selection {P}, no application yet', ud(w, a, 'Decided selection') === `${x}: ${P}` && appsOf(w, a).length === 0);
  w.advance(MIN2); w.set(AP, Q, { Current: true });
  note('Q\'s Current ticked by hand: State "Edited by hand", in use', app(w, Q, 'State') === 'Edited by hand' && app(w, Q, 'In use flag') === 1);
  await p(a);
  out.wait = { applied: ud(w, a, 'Applied'), apps: appsOf(w, a).length, result: ud(w, a, 'Result') };
  if (variant === 'undo') {
    w.set(AP, Q, { Current: false });
    await p(a);
    out.final = { applied: ud(w, a, 'Applied'), inUse: inUse(w, x), placement: placement(w, x), result: ud(w, a, 'Result') };
  } else {
    // The fresh Replace decision, fixed while Q is in use, captures it in its own selection.
    const fresh = decide(w, { source: p2.accepted, slots: [x], replace: true });
    await p(fresh);
    out.fresh = { applied: ud(w, fresh, 'Applied'), selection: ud(w, fresh, 'Decided selection'), result: ud(w, fresh, 'Result'), app: appsOf(w, fresh)[0], qState: app(w, Q, 'State') };
    await p(a);
    out.final = { applied: ud(w, a, 'Applied'), result: ud(w, a, 'Result'), inUse: inUse(w, x), placement: placement(w, x) };
  }
  out.a = a;
  return out;
}
add('GPT-C', 'GPT-C: an in-use application outside A\'s Decided selection whose State reads "Edited by hand" makes the slot wait (not superseded); undone, A applies. A fresh Replace decision fixed while it is in use captures it, applies, and A\'s next press ends the slot as superseded by the fresh decision\'s (unflagged) application', async t => {
  const pass = o => { for (const [l, ok, d] of o.checks) t.check(l, ok, d); };
  let o = await gptc('undo'); pass(o);
  t.check('A waits: no application written, Applied clear, the Result names the hand edit', !o.wait.applied && o.wait.apps === 0
    && o.wait.result.includes(`${slot(o.w, o.x, 'Name')} waits: an application's Current was edited by hand; undo it, or resolve the slot with a use decision with Replace`), o.wait);
  t.check('[undo] the tick undone: A applies; one In use, A\'s; Settled', o.final.applied === true && o.final.inUse.length === 1 && app(o.w, o.final.inUse[0], 'Use decision')[0] === o.a && o.final.placement === 'Settled', o.final);
  o = await gptc('fresh'); pass(o);
  t.check('[fresh Replace] its selection captures P and Q', o.fresh.selection === `${o.x}: ${[o.P, o.Q].sort().join(', ')}`, o.fresh.selection);
  t.check('[fresh Replace] it applies; Q leaves use, no longer flagged', o.fresh.applied === true && app(o.w, o.fresh.app, 'State') === 'In use' && o.fresh.qState === `Replaced by ${app(o.w, o.fresh.app, 'Name')}`, o.fresh);
  t.check('[fresh Replace] A\'s next press ends the slot as superseded by the fresh application; the slot stays Settled on it', o.final.applied === true
    && o.final.result === `Applied in part: 0 of 1; ${slot(o.w, o.x, 'Name')} superseded by ${app(o.w, o.fresh.app, 'Name')}.` && o.final.inUse.join() === o.fresh.app && o.final.placement === 'Settled', o.final);
});

add('T37-s4s5', "T37's S4 and S5 parts: a Held slot waits in S4 and S5; after a new version of the request, S4's retry and S5 end it instead; a hand-pasted adoption holds a part-way decision's slots; a hand-edited Decided selection or Decided basis ends its decision as edited by hand with no application; a hand tick within a minute isn't flagged (the detector's limit); S5's own writes are never flagged (both last-modified models)", async t => {
  // A hand-edited kept plan (Kept fill rule): Held.
  {
    const b = await setup(), { w } = b;
    const towel1 = b.at('towel', 1), sheet1 = b.at('sheet', 1), sh = shotOf(w, towel1);
    const candidate = snap(w, sh);
    const src = await b.set.source();
    const hand4 = b.at('hand', 4);
    const d = decide(w, { source: src.accepted, slots: [hand4] });
    await pressS5(w, d, { faultAfterWrites: '0' });
    w.advance(MIN2);
    w.set(PS, sheet1, { 'Kept fill rule': 'Made for each product' }); w.set(PS, hand4, { 'Kept fill rule': 'Made for each product' });
    t.check('both slots Held: "plan it in a new version of the request"', [sheet1, hand4].every(s => slot(w, s, 'Held') === 1 && slot(w, s, 'Status') === TEXT.heldPlan));
    const accepted = fx.accept(w, candidate);
    await pressS4(w, accepted);
    t.check('S4 leaves the Held slot: Applications done clear, the progress says it waits', appsFrom(w, accepted).length === 1 && !w.get(AI, accepted, 'Applications done')
      && w.get(AI, accepted, 'Application progress').includes(`${slot(w, sheet1, 'Name')} waits: edited by hand; plan it in a new version of the request.`), w.get(AI, accepted, 'Application progress'));
    await pressS5(w, d);
    t.check('S5 waits on the Held slot', !ud(w, d, 'Applied') && appsOf(w, d).length === 0 && ud(w, d, 'Result').includes(`${slot(w, hand4, 'Name')} waits: edited by hand; plan it in a new version of the request`), ud(w, d, 'Result'));
    fx.request(w, { name: 'Bath product pages, version 2', products: [b.P.vessel, b.P.towel, b.P.sheet, b.P.hand], supersedes: [b.req.id] });
    await pressS4(w, accepted);
    t.check('after the new version, S4\'s retry ends the slot (request superseded) and ticks Applications done', w.get(AI, accepted, 'Applications done') === true && w.get(AI, accepted, 'Application progress').includes(`${slot(w, sheet1, 'Name')}: skipped: its request is superseded.`), w.get(AI, accepted, 'Application progress'));
    await pressS5(w, d);
    t.check('and S5 ends it: "Applied in part"', ud(w, d, 'Applied') === true && ud(w, d, 'Result') === `Applied in part: 0 of 1; ${slot(w, hand4, 'Name')} not applied: its request is superseded.`, ud(w, d, 'Result'));
  }
  // A hand paste of the Definition into the guide's Adopted definition: the decision part-way waits.
  {
    const b = await setup(), { w } = b;
    const src = await b.set.source();
    const towel4 = b.at('towel', 4), hand4 = b.at('hand', 4);
    const d = decide(w, { source: src.accepted, slots: [towel4, hand4] });
    await pressS5(w, d, { faultAfterWrites: '1' });
    w.set(GS, b.textile.slots[1], { View: `${fx.VIEWS.hanging} Test: a draft edit.` }); // a changed Definition, pasted by hand
    w.advance(MIN2); w.set(SG, b.textile.id, { 'Adopted definition': w.get(SG, b.textile.id, 'Definition') });
    t.check('every slot on the guide Held', slot(w, hand4, 'Held') === 1 && slot(w, hand4, 'Status') === TEXT.heldGuide);
    await pressS5(w, d);
    t.check('the decision part-way waits rather than skipping the slot', !ud(w, d, 'Applied') && ud(w, d, 'Result').includes(`${slot(w, hand4, 'Name')} waits: edited by hand; adopt the guide again`), ud(w, d, 'Result'));
  }
  // A hand-edited Decided selection, and in another decision a hand-edited Decided basis.
  for (const field of ['Decided selection', 'Decided basis']) {
    const b = await setup(), { w } = b;
    const src = await b.set.source();
    const towel4 = b.at('towel', 4), hand4 = b.at('hand', 4);
    const d = decide(w, { source: src.accepted, slots: [towel4, hand4] });
    await pressS5(w, d, { faultAfterWrites: '0' });
    w.advance(MIN2); w.set(UD, d, { [field]: `${ud(w, d, field)}\nTest: edited by hand.` });
    t.check(`[${field}] Record intact fails`, ud(w, d, 'Record intact') === 0);
    const n0 = w.ids(AP).length; await pressS5(w, d);
    t.check(`[${field}] no application written; it ends as edited by hand`, w.ids(AP).length === n0 && ud(w, d, 'Applied') === true
      && ud(w, d, 'Result') === "Applied in part: 0 of 2; the rest not applied: this decision's record was edited by hand; record a new decision.", ud(w, d, 'Result'));
  }
  // A Replace decision stopped after its replacing application, then its Decided selection edited by
  // hand: S5 finishes the replacement it had started, from the Replaces it wrote, and writes nothing new.
  {
    const b = await setup(), { w } = b;
    const s1 = await b.set.source(), s2 = await b.set.source();
    const towel4 = b.at('towel', 4), hand4 = b.at('hand', 4);
    const d0 = decide(w, { source: s1.accepted, slots: [towel4, hand4] }); await pressS5(w, d0);
    const old = appsOf(w, d0).find(a => app(w, a, 'Slot')[0] === towel4);
    const d = decide(w, { source: s2.accepted, slots: [towel4, hand4], replace: true });
    await pressS5(w, d, { faultAfterWrites: '1' });
    t.check('stopped after the replacing application on the first slot: two in use there', appsOf(w, d).length === 1 && inUse(w, towel4).length === 2);
    w.advance(MIN2); w.set(UD, d, { 'Decided selection': `${ud(w, d, 'Decided selection')}\nTest: edited by hand.` });
    const n0 = w.ids(AP).length; await pressS5(w, d);
    const neu = appsOf(w, d)[0];
    t.check('the started replacement finished: the old one Replaced by the new; one in use; no new application', w.ids(AP).length === n0 && !app(w, old, 'Current') && JSON.stringify(app(w, old, 'Replaced by')) === JSON.stringify([neu]) && inUse(w, towel4).join() === neu);
    t.check('the decision ends as edited by hand, naming what was applied', ud(w, d, 'Applied') === true && ud(w, d, 'Result') === "Applied in part: 1 of 2; the rest not applied: this decision's record was edited by hand; record a new decision.", ud(w, d, 'Result'));
    t.check('its own application then reads Needs review (its decision\'s record was edited by hand), and the second slot keeps its image', app(w, neu, 'State') === "Needs review: its decision's record was edited by hand" && placement(w, hand4) === 'Settled', app(w, neu, 'State'));
  }
  // The detector's limit: a hand tick within a minute of S4's write isn't flagged, and operates as if a script had written it.
  {
    const b = await setup(), { w } = b;
    const x = b.at('towel', 2), sh = shotOf(w, x);
    await acceptShot(w, sh); const q = await acceptShot(w, sh);
    const Q = appsFrom(w, q.accepted)[0];
    w.set(AP, Q, { Current: true });
    t.check('limit recorded: a tick within a minute reads not as "Edited by hand" but as a second image in use (Conflict)', app(w, Q, 'State') !== 'Edited by hand' && placement(w, x) === 'Conflict', app(w, Q, 'State'));
  }
  // S5's own writes are never flagged, under either last-modified model.
  for (const lmtOnUnchangedWrite of [false, true]) {
    const b = await setup({ lmtOnUnchangedWrite }), { w } = b;
    const s1 = await b.set.source(), s2 = await b.set.source();
    const hand4 = b.at('hand', 4);
    const d1 = decide(w, { source: s1.accepted, slots: [hand4] }); await pressS5(w, d1);
    const d2 = decide(w, { source: s2.accepted, slots: [hand4], replace: true }); await pressS5(w, d2, { faultAfterWrites: '1' }); await pressS5(w, d2);
    const all = w.ids(AP);
    t.check(`[lmtOnUnchangedWrite ${lmtOnUnchangedWrite}] no application reads Edited by hand, and both decisions' records are intact`, all.every(a => app(w, a, 'State') !== 'Edited by hand') && ud(w, d1, 'Record intact') === 1 && ud(w, d2, 'Record intact') === 1 && placement(w, hand4) === 'Settled');
  }
});

add('S4-guards', "S4's own guards: an accepted record that isn't Complete gets only its progress text; a superseded request's slot is skipped and said so; a withdrawn slot is skipped", async t => {
  const b = await setup(), { w } = b;
  const towel1 = b.at('towel', 1), sheet1 = b.at('sheet', 1), sh = shotOf(w, towel1);
  const candidate = snap(w, sh), accepted = fx.accept(w, candidate);
  w.set(AI, accepted, { Standard: null });
  const n0 = w.writes.length; await pressS4(w, accepted);
  t.check('not Complete: only Application progress written; no application; not done', writesSince(w, n0).every(x => x.table === AI && x.fields.join() === 'Application progress')
    && w.get(AI, accepted, 'Application progress') === "Not applied: this accepted record isn't Complete." && appsFrom(w, accepted).length === 0 && !w.get(AI, accepted, 'Applications done'));
  w.set(AI, accepted, { Standard: w.get('Candidates', candidate, 'Standard used') });
  fx.request(w, { name: 'Bath product pages, version 2', products: [b.P.vessel, b.P.towel, b.P.sheet, b.P.hand], supersedes: [b.req.id] });
  await pressS4(w, accepted);
  t.check('a superseded request: each slot skipped and said so; done ticked; no application', appsFrom(w, accepted).length === 0 && w.get(AI, accepted, 'Applications done') === true
    && [towel1, sheet1].every(s => w.get(AI, accepted, 'Application progress').includes(`${slot(w, s, 'Name')}: skipped: its request is superseded.`)), w.get(AI, accepted, 'Application progress'));
  // A validly withdrawn slot in Slots kept: a duplicate record of the sheet's key is kept, and the
  // sheet's own record is withdrawn, naming it.
  {
    const b2 = await setup(), w2 = b2.w;
    const t1 = b2.at('towel', 1), s1 = b2.at('sheet', 1), sh2 = shotOf(w2, t1);
    const cand2 = snap(w2, sh2);
    const names = ['Name', 'Line', 'Guide slot', 'Product', 'Request', 'Kept definition line', 'Kept guide ID', 'Kept product ID', 'Kept guide version', 'Kept guide name', 'Kept slot name', 'Kept position', 'Kept placement label', 'Kept view', 'Kept required', 'Kept fill rule', 'Plan kept', 'Fulfillment', 'Test'];
    const dup = w2.add(PS, { ...Object.fromEntries(names.map(n => [n, w2.get(PS, s1, n)])), 'Kept plan written at': w2.iso() });
    w2.set(PS, s1, { Withdrawn: true, 'Duplicate of': [dup] });
    const acc2 = fx.accept(w2, cand2);
    await pressS4(w2, acc2);
    const progress = w2.get(AI, acc2, 'Application progress') || '';
    t.check('a validly withdrawn slot: no application for it, "skipped: the slot is withdrawn"; the other slot applied; done ticked', slot(w2, s1, 'Validly withdrawn') === 1
      && appsFrom(w2, acc2).length === 1 && app(w2, appsFrom(w2, acc2)[0], 'Slot')[0] === t1 && w2.get(AI, acc2, 'Applications done') === true
      && progress.includes(`${slot(w2, s1, 'Name')}: skipped: the slot is withdrawn.`), progress);
  }
});

add('U13-local', "U13's script logic (its row is Copy): a later acceptance on a shot whose slots are filled makes alternates, not Current; the slots show \"Also accepted\"; a use decision with Replace naming that source puts it in use", async t => {
  const b = await setup(), { w } = b;
  const towel1 = b.at('towel', 1), sheet1 = b.at('sheet', 1), sh = shotOf(w, towel1);
  const first = await acceptShot(w, sh), later = await acceptShot(w, sh);
  const alts = appsFrom(w, later.accepted);
  t.check('two alternates, not Current, State "Alternate"; S4 finished', alts.length === 2 && alts.every(a => !app(w, a, 'Current') && app(w, a, 'State') === 'Alternate') && w.get(AI, later.accepted, 'Applications done') === true);
  t.check('each slot still Settled on the first, and shows "Also accepted"', [towel1, sheet1].every(s => placement(w, s) === 'Settled' && slot(w, s, 'Status').endsWith(`. Also accepted: ${title(w, later.accepted)}`)), slot(w, towel1, 'Status'));
  const d = decide(w, { source: later.accepted, slots: [towel1, sheet1], replace: true }); const r = await pressS5(w, d);
  t.check('a Replace decision naming the later source puts it in use on both; the first image Replaced', r.ok && [towel1, sheet1].every(s => inUse(w, s).length === 1 && app(w, inUse(w, s)[0], 'Use decision')[0] === d && placement(w, s) === 'Settled')
    && appsFrom(w, first.accepted).every(a => app(w, a, 'State').startsWith('Replaced by ')), ud(w, d, 'Result'));
});

add('U22-local', "U22's script logic, with T21 and T23 (their rows are Copy): a picked-up slot replanned after use reads \"Needs review: the slot was replanned\" until a Replace decision with the same source confirms it", async t => {
  const b = await setup(), { w } = b;
  const src = await b.set.source();
  const hand4 = b.at('hand', 4);
  const d1 = decide(w, { source: src.accepted, slots: [hand4] }); await pressS5(w, d1);
  const a = appsOf(w, d1)[0];
  w.set(GS, b.textile.slots[3], { View: `${fx.VIEWS.setting} Test: in daylight.` });
  t.check('a draft guide edit: the image stays Settled; the slot reads changed', placement(w, hand4) === 'Settled' && slot(w, hand4, 'Shot-guide check') === TEXT.guideChanged);
  await adopt(w, b.textile.id); await pressS3Slot(w, hand4);
  t.check('adopted and replanned: back in the plan; its application reads "Needs review: the slot was replanned"', slot(w, hand4, 'Active') === 1 && app(w, a, 'State') === 'Needs review: the slot was replanned since this image was applied' && placement(w, hand4) === 'Needs review');
  const d2 = decide(w, { source: src.accepted, slots: [hand4], replace: true }); const r = await pressS5(w, d2);
  t.check('a Replace decision with the same source confirms it: Settled', r.ok && placement(w, hand4) === 'Settled' && app(w, appsOf(w, d2)[0], 'State') === 'In use' && JSON.stringify(app(w, appsOf(w, d2)[0], 'Replaces')) === JSON.stringify([a]), ud(w, d2, 'Result'));
});

// ---------------------------------------------------------------------------------------------
// Negative controls: each mechanism disabled in a mutated copy of S5, and its guard failing.
const SUBSET = 'const later = outside.filter(a => !a.hand);';
add('CTRL-CX7', 'Negative control: with exact identity instead of the subset check (any change to the slot\'s in-use set counts as a supersession), U26\'s "earlier decision finishing" guard fails: A ends superseded by C\'s application', async t => {
  const m = mutate(t, SRC.s5, SUBSET, 'const later = (outside.length || inUse.length !== sel.length) ? (outside.length ? outside : inUse) : [];', 'exact identity');
  const ok = o => o.final.applied === true && o.final.inUse.length === 1 && app(o.w, o.final.inUse[0], 'Use decision')[0] === o.a;
  t.check('as written, A\'s application ends In use', ok(await u26('earlier-C-then-A')));
  const o = await u26('earlier-C-then-A', m);
  t.check('mutated: the guard "A\'s application In use on X" fails, A ends superseded', !ok(o) && /superseded by/.test(o.final.result || ''), o.final);
});
const ENDED_SKIP = 'if (ended.has(e.slot)) { finals.push(ended.get(e.slot)); continue; }';
add('CTRL-FINAL', 'Negative control: with Ended slots not read on a later press (every slot without a key checked again), U25-final\'s guard fails: the slot ended while another waited gets this decision\'s image once its cause clears', async t => {
  const m = mutate(t, SRC.s5, ENDED_SKIP, 'if (false) { finals.push(ended.get(e.slot)); continue; }', 'Ended slots ignored');
  const guard = o => o.second.applied && o.second.xApps === 0 && o.second.yApps === 1;
  t.check('as written, the ended slot stays unapplied', guard(await u25final()));
  const o = await u25final(m);
  t.check('mutated: both presses ran to the end, and the guard fails: the ended slot gets an application', o.first.ran && o.second.ran && !guard(o) && o.second.xApps === 1 && o.second.applied, o.second);
});
const HELD_REFUSAL = 'if (s.held) return `edited by hand; ${s.heldRemedy}`;';
add('CTRL-U30b', "Negative control: with the Held term dropped from step 2's checks, U30b's held guard fails: the decision is fixed (Decided at written) and waits, instead of being refused with only its Result written", async t => {
  const m = mutate(t, SRC.s5, HELD_REFUSAL, "if (false) return '';", 'no Held term in step 2');
  const guard = o => o.onlyResult && o.unfixed;
  t.check('as written, the held slot is refused before anything is fixed', guard(await u30b('held')));
  const o = await u30b('held', m);
  t.check('mutated: the press ran, and the guard fails: the decision is fixed and waits on the held slot', o.ran && !guard(o) && !o.unfixed && /waits: edited by hand/.test(o.result), o.result);
});
const PICKUP_ROUTE = '        pickupRoute = true;';
add('CTRL-GPT-A', "Negative control: with S3 refusing GPT-A's route outright (no refresh), GPT-A-later's guard fails: after an adopted guide change the covered slot can't be refreshed, so it stays out of the plan and Replace can't confirm it", async t => {
  const m = mutate(t, SRC.s3, PICKUP_ROUTE, '        return done(COVERED_PICKUP);', 'GPT-A route refused');
  const guard = o => o.steps.replan.inPlan === 1 && o.steps.confirmed.applied === true;
  t.check('as written, the slot is refreshed and confirmed', guard(await gptaLater('guide-after')));
  const o = await gptaLater('guide-after', m);
  t.check('mutated: Replan ran, and the guard fails: still out of the plan, and the Replace decision isn\'t applied', o.steps.replan.ran && o.steps.confirmed.ran && !guard(o) && o.steps.replan.inPlan === 0 && o.steps.confirmed.applied !== true, { replan: o.steps.replan.result, confirmed: o.steps.confirmed.result });
});
const DRAFT_WAIT = "if (s.pending) return { wait: `${CHANGE_PENDING}; record it or undo it, then press again` };";
add('CTRL-DRAFT', 'Negative control: with a draft treated as final, U25\'s draft variant latches Applied on a draft and its guard fails', async t => {
  const m = mutate(t, SRC.s5, DRAFT_WAIT, "if (s.pending) return { final: `${CHANGE_PENDING}; record it or undo it, then press again` };", 'draft as final');
  const guard = o => !o.steps[0].applied && o.steps[0].yApps === 0;
  t.check('as written, a draft waits', guard(await u25('draft')));
  const o = await u25('draft', m);
  t.check('mutated: the guard "Applied clear on a draft" fails: Applied latched', !guard(o) && o.steps[0].applied === true && o.steps[1].yApps === 0, o.steps);
});
const HAND_OUTSIDE = 'const byHand = outside.filter(a => a.hand);';
add('CTRL-GPT-C', 'Negative control: with GPT-C\'s predicate widened to any flagged Current on the slot, the fresh-Replace recovery fails: the fresh decision waits on the application its own selection holds', async t => {
  const m = mutate(t, SRC.s5, HAND_OUTSIDE, 'const byHand = inUse.filter(a => a.hand);', 'any flagged Current');
  const ok = o => o.fresh.applied === true && o.final.inUse.join() === o.fresh.app;
  t.check('as written, the recovery holds', ok(await gptc('fresh')));
  const o = await gptc('fresh', m);
  t.check('mutated: the guard "the fresh decision applies" fails; it waits', !ok(o) && !o.fresh.applied && /waits: an application's Current was edited by hand/.test(o.fresh.result || ''), o.fresh);
});

// ---------------------------------------------------------------------------------------------
// Texts, inputs and bindings.
const literal = (src, name, value) => src.includes(`const ${name} = '${value}';`) || src.includes(`const ${name} = ${JSON.stringify(value)};`);
add('TEXT-s4s5', "S4's and S5's Held remedies and S5's draft text equal the slot Status's (formulas.mjs TEXT)", async t => {
  const strip = x => x.replace(/^Edited by hand: /, '');
  for (const [name, src] of [['s4', SRC.s4], ['s5', SRC.s5]]) {
    t.check(`${name}: HELD_PLAN`, literal(src, 'HELD_PLAN', strip(TEXT.heldPlan)));
    t.check(`${name}: HELD_SLOT`, literal(src, 'HELD_SLOT', strip(TEXT.heldSlot)));
    t.check(`${name}: HELD_PRODUCT`, literal(src, 'HELD_PRODUCT', strip(TEXT.heldProduct)));
    t.check(`${name}: HELD_GUIDE`, literal(src, 'HELD_GUIDE', strip(TEXT.heldGuide)));
  }
  t.check('s5: CHANGE_PENDING', literal(SRC.s5, 'CHANGE_PENDING', TEXT.changePending[0].toLowerCase() + TEXT.changePending.slice(1)));
  t.check('the controls\' anchors exist in S5 (each once)', [SUBSET, DRAFT_WAIT, HAND_OUTSIDE].every(x => SRC.s5.split(x).length === 2));
});

function idConfig(w, name, recordId, extra = {}) {
  const b = fx.cfg(name, recordId, extra), out = {};
  const prefix = [['ud', 'decisionsTable'], ['acc', 'acceptedTable'], ['app', 'applicationsTable'], ['slot', 'slotsTable']];
  for (const [k, v] of Object.entries(b)) {
    if (k.endsWith('Table')) out[k] = w.t(v).id;
    else if (k.endsWith('Field')) { const p = prefix.find(([x]) => k.startsWith(x)); out[k] = w.f(w.t(b[p[1]]), v).id; }
    else out[k] = v;
  }
  return out;
}
for (const [name, key, bad, re] of [
  ['s4', 'appCurrentField', 'Current check', /S4: appCurrentField must be of type checkbox, not formula/], ['s4', 'accDoneField', undefined, /S4: input accDoneField is missing/],
  ['s4', 'faultAfterWrites', 'two', /S4: input faultAfterWrites must be empty or a whole number/], ['s4', 'appBasisField', 'Kept label', /S4: appBasisField must be of type singleSelect, not singleLineText/],
  ['s5', 'udDecidedSelectionField', 'Decided at', /S5: udDecidedSelectionField must be of type multilineText, not dateTime/], ['s5', 'appStateField', undefined, /S5: input appStateField is missing/],
  ['s5', 'slotPickupOkField', 'Pickup okk', /No field "Pickup okk"/], ['s5', 'faultAfterWrites', '-1', /S5: input faultAfterWrites must be empty or a whole number/],
  ['s5', 'legacyMap', '{not json', /S5: input legacyMap must be JSON/], ['s5', 'legacyMap', '{"recABC": {"product": "x"}}', /S5: input legacyMap entry recABC needs a product record ID and its facts/],
  ['s5', 'refuseEarlierStandard', 'maybe', /S5: input refuseEarlierStandard must be empty, yes or no/],
]) add(`BIND-${name}-${key}${bad && key === 'legacyMap' && bad.startsWith('{"') ? '-entry' : ''}`, `${name}: an input that doesn't resolve, has the wrong type or isn't valid stops the run before any read or write`, async t => {
  const b = await setup(), { w } = b;
  const src = await b.set.source();
  const d = decide(w, { source: src.accepted, slots: [b.at('hand', 4)] });
  const before = w.state();
  const config = name === 's4' ? fx.cfg('s4', src.accepted) : fx.cfg('s5', d);
  const r = await runAlone(w, start(w, SRC[name], { ...config, [key]: bad }));
  t.check('stopped with the input error', !r.ok && re.test(r.error.message), r.error && r.error.message);
  t.check('no operation, nothing written', r.ops === 0 && w.state() === before);
});
add('BIND-ids-s4s5', 'S4 and S5 bound by table and field IDs instead of names behave the same', async t => {
  const b = await setup(), { w } = b;
  const towel1 = b.at('towel', 1), sh = shotOf(w, towel1);
  const candidate = snap(w, sh), accepted = fx.accept(w, candidate);
  let r = await runAlone(w, start(w, SRC.s4, idConfig(w, 's4', accepted)));
  t.check('S4 by ID', r.ok && appsFrom(w, accepted).length === 2 && w.get(AI, accepted, 'Applications done') === true, r.error && r.error.message);
  const src = await b.set.source(), hand4 = b.at('hand', 4);
  const d = decide(w, { source: src.accepted, slots: [hand4] });
  r = await runAlone(w, start(w, SRC.s5, idConfig(w, 's5', d)));
  t.check('S5 by ID', r.ok && ud(w, d, 'Applied') === true && placement(w, hand4) === 'Settled', r.error && r.error.message);
});
