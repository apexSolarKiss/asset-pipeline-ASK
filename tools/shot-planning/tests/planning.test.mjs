// Planning cases: S1 Make product slots, S6 Adopt guide, S7 Record decision, and the formulas they
// rely on, on the simulated base. Each case runs the exact script bytes. IDs are v6 §10.1's; where
// a row also has Copy-only parts (another script's step, a page, Airtable's own behaviour), the
// case covers the S1/S6/S7 and formula part and says what it leaves.
import * as fx from './fixtures.mjs';
import { World, start, runAlone, holdBefore, kindIs, settle as tick } from '../sim/world.mjs';
import { TEXT } from '../sim/formulas.mjs';

const { bath, bathPlanned, adopt, assign, recordSlot, pressS1, pressS6, pressS7Product, pressS7Slot, slot, slotAt, slotsOn, note, decision, SRC } = fx;
const PS = 'Product-page slots', SG = 'Shot guides', GS = 'Guide slots';
const count = (w, table) => w.ids(table).length;
const writesSince = (w, n) => w.writes.slice(n);
const placement = (w, s) => slot(w, s, 'Placement state');
const appState = (w, a) => w.get('Applications', a, 'State');

export const cases = [];
const add = (id, title, run) => cases.push({ id, title, run });

// ---------------------------------------------------------------------------------------------
add('T1', 'Make product slots: one slot per (line, active guide slot in the adopted definition), with its kept plan and Fulfillment from the Fill rule', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  t.check('S1 ran', b.s1.ok, b.s1.error && b.s1.error.message);
  t.check('16 slots', count(w, PS) === 16, count(w, PS));
  const want = { vessel: ['Make', 'Make', 'Make', 'An accepted image'], towel: ['Share', 'Make', 'Share', 'An accepted image'] };
  for (const [p, guide] of [['vessel', b.vessel], ['towel', b.textile], ['sheet', b.textile], ['hand', b.textile]]) {
    const on = slotsOn(w, b.L[p]);
    t.check(`${p}: 4 slots on its line`, on.length === 4, on.length);
    for (let i = 0; i < 4; i++) {
      const s = slotAt(w, b.L[p], i + 1), gs = guide.slots[i];
      const live = w.get(GS, gs, 'Definition line');
      t.check(`${p} ${i + 1}: Kept definition line is the guide slot's line`, slot(w, s, 'Kept definition line') === live);
      t.check(`${p} ${i + 1}: kept plan by value`, slot(w, s, 'Kept guide ID') === guide.id && slot(w, s, 'Kept product ID') === b.P[p] && slot(w, s, 'Kept guide version') === 1
        && slot(w, s, 'Kept position') === i + 1 && slot(w, s, 'Kept placement label') === `product page, image ${i + 1}` && slot(w, s, 'Kept view') === w.get(GS, gs, 'View')
        && slot(w, s, 'Plan kept') === true && slot(w, s, 'Kept plan written at') != null && slot(w, s, 'Kept guide name') === w.get(SG, guide.id, 'Name'));
      t.check(`${p} ${i + 1}: Fulfillment from the Fill rule`, slot(w, s, 'Fulfillment') === (p === 'vessel' ? want.vessel : want.towel)[i], slot(w, s, 'Fulfillment'));
      t.check(`${p} ${i + 1}: in the plan, active, one record for its key, not held, nothing pending`, slot(w, s, 'In adopted plan') === 1 && slot(w, s, 'Active') === 1 && slot(w, s, 'Key count') === 1 && slot(w, s, 'Held') === 0 && !slot(w, s, 'Change pending'));
      t.check(`${p} ${i + 1}: Slot key is line/product/guide/guide slot`, slot(w, s, 'Slot key') === `${b.L[p]}/${b.P[p]}/${guide.id}/${gs}`);
    }
  }
  t.check('names as §7.3', slot(w, slotAt(w, b.L.sheet, 1), 'Name') === 'Bath Sheet · 1 Folded');
  t.check('the note counts what was made', /^Make product slots, .*:\nMade 16 slots: Bath Vessel · 1 Front;/.test(note(w, b.req.id)), note(w, b.req.id));
});

add('T2', 'Make product slots pressed again: no new slots', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const before = w.ids(PS).join(), n0 = w.writes.length;
  const r = await pressS1(w, b.req.id);
  t.check('ran', r.ok, r.error && r.error.message);
  t.check('no new slot', w.ids(PS).join() === before);
  t.check('the note says so', /Made no new slot\.\nAlready made: 16 slots\./.test(note(w, b.req.id)), note(w, b.req.id));
  const ws = writesSince(w, n0);
  t.check('the press wrote only the note', ws.length === 1 && ws[0].table === 'Briefs' && ws[0].fields.join() === 'Slot planning note', ws);
});

add('T2b-local', 'A double press (two overlapping S1 runs, forced interleaving): the outcome is recorded; duplicates show in Key count and a withdrawal resolves them (Copy records what Airtable does)', async t => {
  const b = bath(new World()), { w } = b;
  await adopt(w, b.vessel.id); await assign(w, b.P.vessel, b.vessel.id);
  const A = start(w, SRC.s1, fx.cfg('s1', b.req.id)), B = start(w, SRC.s1, fx.cfg('s1', b.req.id));
  await holdBefore(w, A, kindIs('create'));  // A has read everything; B runs to the end; then A finishes
  await runAlone(w, B); await runAlone(w, A);
  const on = slotsOn(w, b.L.vessel);
  t.check('both runs ended', A.ok && B.ok);
  t.check('outcome recorded: each key has two records', on.length === 8, on.length);
  const [x, y] = on.filter(s => slot(w, s, 'Kept position') === 1);
  t.check('Key count reads 2 on both, neither is ok, and Status names the pair check', slot(w, x, 'Key count') === 2 && slot(w, y, 'Slot ok') === 0 && /Another record has this slot's key/.test(slot(w, x, 'Status')));
  w.set(PS, y, { Withdrawn: true, 'Duplicate of': [x] });
  t.check('withdrawing the one carrying nothing, naming the other: valid; the other is ok', slot(w, y, 'Validly withdrawn') === 1 && slot(w, x, 'Key count') === 1 && slot(w, x, 'Slot ok') === 1 && slot(w, y, 'Status') === 'Withdrawn');
});

add('T4', 'No guide on a product: listed, nothing made; an unrecorded assignment makes nothing; S7 refuses without the link or the basis; recorded, its slots are made', async t => {
  const b = bath(new World()), { w } = b;
  await adopt(w, b.textile.id);
  for (const p of ['towel', 'hand']) await assign(w, b.P[p], b.textile.id);
  let r = await pressS1(w, b.req.id);
  t.check('S1 ran', r.ok);
  t.check('the sheet, with no guide, is listed', note(w, b.req.id).includes('Bath Sheet: no adopted shot guide (assignment not recorded); nothing was made for it.'), note(w, b.req.id));
  t.check('no slot for it', slotsOn(w, b.L.sheet).length === 0);
  // S7 refusals on a product, each writing only Record result.
  const n0 = w.writes.length;
  w.set('Products', b.P.sheet, { 'Assignment basis': 'a woven bath textile sold in sizes', ...decision() });
  r = await pressS7Product(w, b.P.sheet);
  t.check('S7 refuses without the link', /^Not recorded: link the product to its shot guide first/.test(w.get('Products', b.P.sheet, 'Record result')));
  w.set('Products', b.P.sheet, { 'Shot guide': [b.textile.id], 'Assignment basis': null });
  r = await pressS7Product(w, b.P.sheet);
  t.check('S7 refuses without the Assignment basis', /^Not recorded: enter the Assignment basis/.test(w.get('Products', b.P.sheet, 'Record result')));
  w.set('Products', b.P.sheet, { 'Assignment basis': 'a woven bath textile sold in sizes', 'Decided by': null });
  r = await pressS7Product(w, b.P.sheet);
  t.check('S7 refuses without its decision record', /^Not recorded: enter Decided by, Decision source and Entered by/.test(w.get('Products', b.P.sheet, 'Record result')));
  t.check('refusals wrote only Record result', writesSince(w, n0).filter(x => x.by === 'run').every(x => x.fields.join() === 'Record result'));
  t.check('"Assignment not recorded"', w.get('Products', b.P.sheet, 'Assignment check') === 'Assignment not recorded' && !w.get('Products', b.P.sheet, 'Assigned guide ID'));
  w.set('Products', b.P.sheet, decision()); // link, basis and record entered, no press
  await pressS1(w, b.req.id);
  t.check('entered but not recorded: still "Assignment not recorded", still none', w.get('Products', b.P.sheet, 'Assignment check') === 'Assignment not recorded' && slotsOn(w, b.L.sheet).length === 0);
  r = await pressS7Product(w, b.P.sheet);
  t.check('with both, S7 records', r.ok && w.get('Products', b.P.sheet, 'Assignment check') === 'Recorded' && w.get('Products', b.P.sheet, 'Assigned guide ID') === b.textile.id
    && (w.get('Products', b.P.sheet, 'Recorded guide') || [])[0] === b.textile.id, w.get('Products', b.P.sheet, 'Record result'));
  await pressS1(w, b.req.id);
  t.check('pressed again, its slots are made', slotsOn(w, b.L.sheet).length === 4 && slotsOn(w, b.L.towel).length === 4);
});

add('T4b', 'A guide never adopted is treated as missing ("Proposed"); adopted, S1 makes its slots', async t => {
  const b = bath(new World()), { w } = b;
  await assign(w, b.P.vessel, b.vessel.id);
  t.check('reads Proposed', w.get(SG, b.vessel.id, 'Status') === 'Proposed' && w.get(SG, b.vessel.id, 'Complete') === 0);
  await pressS1(w, b.req.id);
  t.check('S1 lists it as missing and makes nothing', note(w, b.req.id).includes('Bath Vessel: no adopted shot guide (Ceramic vessel: Proposed); nothing was made for it.') && count(w, PS) === 0, note(w, b.req.id));
  const r = await adopt(w, b.vessel.id);
  t.check('S6 adopts version 1', r.ok && w.get(SG, b.vessel.id, 'Status') === 'Adopted, version 1');
  await pressS1(w, b.req.id);
  t.check('pressed again: made', slotsOn(w, b.L.vessel).length === 4);
});

add('T4c', "An adopted guide's view edited: not Complete, S1 refuses; S6 with a new decision record adopts version 2 and S1 proceeds", async t => {
  const b = await bathPlanned(new World()), { w } = b;
  w.set(GS, b.vessel.slots[0], { View: `${fx.VIEWS.front} Centered.` });
  t.check('not Complete: "Changed since adoption: adopt again"', w.get(SG, b.vessel.id, 'Complete') === 0 && w.get(SG, b.vessel.id, 'Status') === 'Changed since adoption: adopt again');
  const front = slotAt(w, b.L.vessel, 1);
  t.check('while a draft, the slot stays in the adopted plan; Shot-guide check reads changed', slot(w, front, 'In adopted plan') === 1 && slot(w, front, 'Shot-guide check') === TEXT.guideChanged);
  await pressS1(w, b.req.id);
  t.check('S1 refuses for the guide\'s product', note(w, b.req.id).includes('Bath Vessel: no adopted shot guide (Ceramic vessel: Changed since adoption: adopt again); nothing was made for it.'), note(w, b.req.id));
  const lastSource = w.get(SG, b.vessel.id, 'Decision source');
  let r = await pressS6(w, b.vessel.id);
  t.check('S6 refuses the same decision again', /^Not adopted: a new adoption needs its own decision/.test(w.get(SG, b.vessel.id, 'Adoption result')) && w.get(SG, b.vessel.id, 'Adopted version') === 1, lastSource);
  r = await adopt(w, b.vessel.id);
  t.check('with a new decision record: version 2, Complete', r.ok && w.get(SG, b.vessel.id, 'Adopted version') === 2 && w.get(SG, b.vessel.id, 'Status') === 'Adopted, version 2');
  t.check('the log has both adoptions', (w.get(SG, b.vessel.id, 'Adoption log') || '').split('\n').length === 2);
  await pressS1(w, b.req.id);
  t.check('S1 proceeds: nothing remade; the changed slot is stale, with its next step', slotsOn(w, b.L.vessel).length === 4
    && note(w, b.req.id).includes('Bath Vessel · 1: changed by the adopted guide; press Replan on this slot.') && slot(w, front, 'Stale by adoption') === 1, note(w, b.req.id));
  t.check('its Status names the step', slot(w, front, 'Status') === 'Not in the adopted plan: the guide changed it: press Replan on this slot', slot(w, front, 'Status'));
});

add('T5', 'A guide slot added, then retired: each change unadopts; after the addition is adopted S1 makes only the new pair; after the retirement, the slot is out of the plan and of the counts', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const extra = w.add(GS, { Name: 'Rim detail', Guide: [b.vessel.id], Position: 5, 'Placement label': 'product page, image 5', View: 'Close on the rim. The product alone.', Required: 'Always', 'Fill rule': 'Made for each product' });
  t.check('the addition leaves the guide unadopted', w.get(SG, b.vessel.id, 'Complete') === 0);
  await pressS1(w, b.req.id);
  t.check('S1 makes nothing before adoption', slotsOn(w, b.L.vessel).length === 4);
  await adopt(w, b.vessel.id);
  await pressS1(w, b.req.id);
  const on = slotsOn(w, b.L.vessel);
  t.check('after adoption, only the new pair is made', on.length === 5 && count(w, PS) === 17 && slot(w, slotAt(w, b.L.vessel, 5), 'Kept slot name') === 'Rim detail', note(w, b.req.id));
  const rim = slotAt(w, b.L.vessel, 5), shot = fx.makeShot(w, [rim]);
  t.check('active, and counted on its shot', slot(w, rim, 'Active') === 1 && w.get('Shots', shot, 'Active slots filled') === 1 && w.get(SG, b.vessel.id, 'Active slots') === 5);
  w.set(GS, extra, { Retired: true });
  t.check('the retirement leaves the guide unadopted, and the slot in the plan while it is a draft', w.get(SG, b.vessel.id, 'Complete') === 0 && slot(w, rim, 'In adopted plan') === 1);
  await adopt(w, b.vessel.id);
  t.check('adopted: Complete again', w.get(SG, b.vessel.id, 'Complete') === 1 && w.get(SG, b.vessel.id, 'Adopted version') === 3);
  t.check('the slot is out of the adopted plan and inactive', slot(w, rim, 'In adopted plan') === 0 && slot(w, rim, 'Active') === 0 && slot(w, rim, 'Stale by adoption') === 0);
  t.check('it drops out of the counts', w.get('Shots', shot, 'Active slots filled') === 0 && w.get(SG, b.vessel.id, 'Active slots') === 4);
  t.check('its Status gives no Replan step', slot(w, rim, 'Status') === 'Not in the adopted plan: the guide retired this image', slot(w, rim, 'Status'));
  await pressS1(w, b.req.id);
  t.check('S1 makes no slot for a retired guide slot', slotsOn(w, b.L.vessel).length === 5);
});

add('T8b', 'Not needed on an Always slot: before the record, not waived and not ok; S7 refuses without a reason; recorded, waived, and the shared shot\'s other slot still plans; on an As needed slot, no reason needed', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const towel1 = slotAt(w, b.L.towel, 1), sheet1 = slotAt(w, b.L.sheet, 1);
  const shot = fx.makeShot(w, [towel1, sheet1]); // the shared Folded shot, input line the towel's
  t.check('the shared shot is planned', w.get('Shots', shot, 'Planned') === 1, w.get('Shots', shot, 'Plan check'));
  w.set(PS, sheet1, { 'Not needed': true });
  t.check('before it is recorded: not waived, a change waits, not ok', slot(w, sheet1, 'Waived') === 0 && slot(w, sheet1, 'Active') === 1 && slot(w, sheet1, 'Change pending') === TEXT.changePending && slot(w, sheet1, 'Slot ok') === 0);
  t.check('its shot isn\'t Planned', w.get('Shots', shot, 'Planned') === 0, w.get('Shots', shot, 'Plan check'));
  t.check('its Status says a change waits', slot(w, sheet1, 'Status').startsWith(TEXT.changePending), slot(w, sheet1, 'Status'));
  let r = await recordSlot(w, sheet1, {});
  t.check('S7 refuses without a reason', /^Not recorded: this slot is required Always/.test(slot(w, sheet1, 'Record result')) && !slot(w, sheet1, 'Decided content'));
  r = await recordSlot(w, sheet1, { 'Not needed reason': 'shown only with the bath towel' });
  t.check('recorded with one: waived, inactive, a departure', r.ok && slot(w, sheet1, 'Waived') === 1 && slot(w, sheet1, 'Active') === 0 && slot(w, sheet1, 'Departure') === 1);
  t.check('Status reads the recorded summary', slot(w, sheet1, 'Status') === 'Not needed: Not needed · decided by ASK · shown only with the bath towel', slot(w, sheet1, 'Status'));
  t.check('the shared shot\'s other slot still plans', slot(w, towel1, 'Slot ok') === 1 && w.get('Shots', shot, 'Active slots filled') === 1 && w.get('Shots', shot, 'Planned') === 1, w.get('Shots', shot, 'Plan check'));
  const sheet4 = slotAt(w, b.L.sheet, 4);
  r = await recordSlot(w, sheet4, { 'Not needed': true });
  t.check('As needed slot: recorded and waived with no reason', r.ok && slot(w, sheet4, 'Waived') === 1 && slot(w, sheet4, 'Departure') === 0, slot(w, sheet4, 'Record result'));
});

add('T8c', 'A fulfillment departure: before the record, not ok; S7 refuses without a reason, and refuses Share where the Fill rule isn\'t the share rule; recorded, its Operative fulfillment is "An accepted image" (S7 part; S2\'s part is part 2\'s)', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const glaze = slotAt(w, b.L.vessel, 3);
  w.set(PS, glaze, { Fulfillment: 'An accepted image' });
  t.check('before it is recorded: not ok, a change waits, the operative fulfillment is still Make', slot(w, glaze, 'Slot ok') === 0 && slot(w, glaze, 'Pickup ok') === 0 && slot(w, glaze, 'Change pending') === TEXT.changePending && slot(w, glaze, 'Operative fulfillment') === 'Make');
  let r = await recordSlot(w, glaze, {});
  t.check('S7 refuses without a reason', /^Not recorded: Fulfillment "An accepted image" departs from the Fill rule's "Make": enter a Fulfillment reason/.test(slot(w, glaze, 'Record result')) && !slot(w, glaze, 'Decided content'), slot(w, glaze, 'Record result'));
  w.set(PS, glaze, { Fulfillment: 'Share', 'Fulfillment reason': 'to share it' });
  r = await pressS7Slot(w, glaze);
  t.check('S7 refuses Share on a slot whose Fill rule isn\'t the share rule', /^Not recorded: Share is allowed only where/.test(slot(w, glaze, 'Record result')) && !slot(w, glaze, 'Decided content'));
  w.set(PS, glaze, { Fulfillment: 'An accepted image', 'Fulfillment reason': 'Close study already shows the glaze' });
  r = await pressS7Slot(w, glaze);
  t.check('recorded with a reason', r.ok && slot(w, glaze, 'Recorded fulfillment') === 'An accepted image' && !slot(w, glaze, 'Change pending'));
  t.check('its Operative fulfillment is "An accepted image"; not ok for a shot (S2 makes none); ok for a pickup', slot(w, glaze, 'Operative fulfillment') === 'An accepted image' && slot(w, glaze, 'Slot ok') === 0 && slot(w, glaze, 'Pickup ok') === 1 && slot(w, glaze, 'Departure') === 1);
  const towel2 = slotAt(w, b.L.towel, 2);
  w.set(PS, towel2, { Fulfillment: 'Share', 'Fulfillment reason': 'x' });
  r = await recordSlot(w, towel2, {});
  t.check('Share refused on a Make slot even with a reason', /^Not recorded: Share is allowed only where/.test(slot(w, towel2, 'Record result')));
  const towel1 = slotAt(w, b.L.towel, 1);
  w.set(PS, towel1, { Fulfillment: 'Make' });
  r = await recordSlot(w, towel1, {});
  t.check('a Share slot changed to Make is a departure: refused without a reason', /departs from the Fill rule's "Share"/.test(slot(w, towel1, 'Record result')));
});

add('T14', 'Wrong workflow: Make product slots does nothing for a collection request', async t => {
  const b = bath(new World()), { w } = b;
  await adopt(w, b.vessel.id); await assign(w, b.P.vessel, b.vessel.id);
  const col = fx.request(w, { name: 'Bath set', workflow: 'Collection', products: [b.P.vessel] });
  const n0 = w.writes.length;
  const r = await pressS1(w, col.id);
  t.check('ran, made no slot', r.ok && count(w, PS) === 0);
  t.check('the note says why', /Nothing was made: Make product slots is for Product pages requests, and this request's Workflow is "Collection"\./.test(note(w, col.id)), note(w, col.id));
  t.check('it wrote only the note', writesSince(w, n0).every(x => x.table === 'Briefs' && x.fields.join() === 'Slot planning note'));
});

add('T22/CX1', 'CX1: a guide adopted with two slots, one then retired, isn\'t Complete; S1 makes nothing; adopted again, the retired slot is out and the other\'s image stays Settled through an unrelated draft (S3\'s refusal is part 2\'s)', async t => {
  const w = new World();
  const g = fx.guide(w, 'Two-slot guide', [{ name: 'Front', position: 1 }, { name: 'Back', position: 2 }]);
  const p = fx.product(w, { name: 'Test Jar', style: 'Jar', color: 'grey', size: 'one', facts: 'A grey jar.', test: true });
  const req = fx.request(w, { name: 'Test pages', products: [p], test: true });
  await adopt(w, g.id); await assign(w, p, g.id);
  await pressS1(w, req.id);
  const [front, back] = [slotAt(w, req.lines[0], 1), slotAt(w, req.lines[0], 2)];
  const sf = fx.settle(w, [front]), sb = fx.settle(w, [back]);
  t.check('both images Settled', placement(w, front) === 'Settled' && placement(w, back) === 'Settled');
  const keepCand = [fx.stored(w, 'Candidates', sf.candidate), fx.stored(w, 'Candidates', sb.candidate), fx.stored(w, 'Accepted images', sf.accepted), fx.stored(w, 'Accepted images', sb.accepted)];
  w.set(GS, g.slots[1], { Retired: true });
  t.check('CX1: not Complete, "Changed since adoption"', w.get(SG, g.id, 'Complete') === 0 && w.get(SG, g.id, 'Status') === 'Changed since adoption: adopt again');
  const n0 = count(w, PS);
  await pressS1(w, req.id);
  t.check('S1 makes nothing for its product', count(w, PS) === n0 && note(w, req.id).includes('Test Jar: no adopted shot guide (Two-slot guide: Changed since adoption: adopt again)'), note(w, req.id));
  t.check('while a draft, both images stay Settled', placement(w, front) === 'Settled' && placement(w, back) === 'Settled');
  await adopt(w, g.id);
  t.check('adopted again: Complete, version 2', w.get(SG, g.id, 'Complete') === 1 && w.get(SG, g.id, 'Adopted version') === 2);
  t.check('the retired slot\'s product-page slot is out of the plan, its image Needs review', slot(w, back, 'In adopted plan') === 0 && slot(w, back, 'Active') === 0 && placement(w, back) === 'Needs review'
    && w.get('Applications', sb.apps[0], 'Eligibility') === 'Needs review: the slot is no longer in the adopted plan' && w.get('Applications', sb.apps[0], 'Current') === true);
  t.check('the other stays Settled', placement(w, front) === 'Settled');
  w.set(GS, g.slots[0], { View: 'Front: the product alone, centered.' });
  t.check('an unrelated draft edit: the retired slot stays out, the other stays Settled', w.get(SG, g.id, 'Complete') === 0 && slot(w, back, 'In adopted plan') === 0 && slot(w, front, 'In adopted plan') === 1 && placement(w, front) === 'Settled');
  t.check('earlier candidates and acceptances unchanged', [fx.stored(w, 'Candidates', sf.candidate), fx.stored(w, 'Candidates', sb.candidate), fx.stored(w, 'Accepted images', sf.accepted), fx.stored(w, 'Accepted images', sb.accepted)].join() === keepCand.join());
});

add('T23-adopt', 'Only a slot\'s Position changed: not Complete and its image stays Settled while a draft; adopted, the slot leaves the plan and its image Needs review (the Replan step is part 2\'s)', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const front = slotAt(w, b.L.vessel, 1); const s = fx.settle(w, [front]);
  t.check('Settled', placement(w, front) === 'Settled');
  w.set(GS, b.vessel.slots[0], { Position: 6 });
  t.check('draft: not Complete; image Settled', w.get(SG, b.vessel.id, 'Complete') === 0 && placement(w, front) === 'Settled' && slot(w, front, 'In adopted plan') === 1);
  await adopt(w, b.vessel.id);
  t.check('adopted: the slot leaves the plan, stale by adoption', slot(w, front, 'In adopted plan') === 0 && slot(w, front, 'Stale by adoption') === 1 && slot(w, front, 'Replan reach') === 1);
  t.check('its image Needs review', placement(w, front) === 'Needs review' && w.get('Applications', s.apps[0], 'Eligibility') === 'Needs review: the slot is no longer in the adopted plan');
});

add('T25', 'An existing slot record linked to an adopted guide: not Complete until adopted again', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const loose = w.add(GS, { Name: 'Underside', Position: 5, 'Placement label': 'product page, image 5', View: 'The base, turned over. The product alone.', Required: 'As needed', 'Fill rule': 'Made for each product' });
  t.check('Complete before', w.get(SG, b.vessel.id, 'Complete') === 1);
  w.set(GS, loose, { Guide: [b.vessel.id] });
  t.check('linked: not Complete', w.get(SG, b.vessel.id, 'Complete') === 0 && w.get(SG, b.vessel.id, 'Status') === 'Changed since adoption: adopt again');
  w.set(SG, b.vessel.id, { 'Guide slots': w.get(SG, b.vessel.id, 'Guide slots') }); // a re-save of the links changes nothing
  t.check('still not Complete', w.get(SG, b.vessel.id, 'Complete') === 0);
  await adopt(w, b.vessel.id);
  t.check('adopted again: Complete', w.get(SG, b.vessel.id, 'Complete') === 1 && w.get(SG, b.vessel.id, 'Adopted version') === 2);
});

add('T26', 'S6 refusals: no decision record, a record not newer than the last adoption, a definition already adopted, an incomplete slot: each refused with its reason, nothing else written', async t => {
  const w = new World();
  const g = fx.guide(w, 'Refusals', [{ name: 'Front', position: 1 }, { name: 'Back', position: 2 }]);
  const adoptionFields = ['Adopted definition', 'Adopted version', 'Adopted at', 'Decided content', 'Adoption log'];
  const snapshot = () => JSON.stringify(adoptionFields.map(f => w.get(SG, g.id, f)));
  const refused = async (label, re) => {
    const s0 = snapshot(), n0 = w.writes.length;
    const r = await pressS6(w, g.id);
    const res = w.get(SG, g.id, 'Adoption result') || '';
    t.check(`${label}: refused with its reason`, r.ok && re.test(res), res);
    t.check(`${label}: nothing else written`, snapshot() === s0 && writesSince(w, n0).every(x => x.fields.join() === 'Adoption result'));
  };
  await refused('no decision record', /^Not adopted: enter Decided by, Decision source and Entered by first\./);
  w.set(SG, g.id, { 'Decided by': 'ASK', 'Decision source': 'ASK, in the base' });
  await refused('a partial decision record', /^Not adopted: enter Decided by, Decision source and Entered by first\./);
  w.set(SG, g.id, decision('ASK\'s relay of 2026-10-29, P4'));
  let r = await pressS6(w, g.id);
  t.check('adopts version 1', r.ok && w.get(SG, g.id, 'Adopted version') === 1 && w.get(SG, g.id, 'Complete') === 1);
  w.set(GS, g.slots[1], { View: 'Back: the product alone, turned.' });
  await refused('a record not newer than the last adoption', /^Not adopted: a new adoption needs its own decision; Decision source names the last adoption's \("ASK's relay of 2026-10-29, P4"\)\./);
  w.set(GS, g.slots[1], { View: 'Back: the product alone.' });
  w.set(SG, g.id, decision('ASK\'s relay of 2026-10-30, P4'));
  await refused('a definition already adopted', /^Already adopted: version 1\./);
  w.set(GS, g.slots[1], { View: null });
  await refused('an incomplete slot', /^Not adopted: every active slot needs a placement label and a view \(Back\)\./);
  w.set(GS, g.slots[0], { Retired: true }); w.set(GS, g.slots[1], { Retired: true });
  await refused('no active slot', /^Not adopted: the guide has no active slot\./);
});

add('T27/CX2', 'CX2: repair keeps waivers: S1 pressed again to repair another line makes no slot for either waived key, and counts both as kept; a new line gets only its own slots', async t => {
  const b = bath(new World()), { w } = b;
  await adopt(w, b.vessel.id); await adopt(w, b.textile.id);
  for (const p of ['towel', 'sheet', 'hand']) await assign(w, b.P[p], b.textile.id);
  await pressS1(w, b.req.id);
  const sheet4 = slotAt(w, b.L.sheet, 4), hand1 = slotAt(w, b.L.hand, 1);
  await recordSlot(w, sheet4, { 'Not needed': true, 'Not needed reason': 'the collection image shows the bath towel beside other products' });
  await recordSlot(w, hand1, { 'Not needed': true, 'Not needed reason': 'test: an Always slot waived with a reason' });
  t.check('both waived', slot(w, sheet4, 'Waived') === 1 && slot(w, hand1, 'Waived') === 1);
  await assign(w, b.P.vessel, b.vessel.id); // the line to repair: its assignment is recorded now
  const r = await pressS1(w, b.req.id);
  const n = note(w, b.req.id);
  t.check('ran', r.ok);
  t.check('only the vessel\'s 4 slots made; no slot for either waived key', count(w, PS) === 16 && slotsOn(w, b.L.vessel).length === 4 && slotsOn(w, b.L.sheet).length === 4 && slotsOn(w, b.L.hand).length === 4);
  t.check('both counted as kept', n.includes('Bath Sheet · 4: kept as not needed.') && n.includes('Hand Towel · 1: kept as not needed.') && n.includes('Kept as not needed: 2 slots.'), n);
  t.check('both still waived, with their records', slot(w, sheet4, 'Waived') === 1 && slot(w, hand1, 'Waived') === 1 && slot(w, hand1, 'Recorded summary').endsWith('an Always slot waived with a reason'));
  const mat = fx.product(w, { name: 'Bath Mat', style: 'Terry mat', color: 'white', size: 'mat', facts: 'A white terry mat.' });
  await assign(w, mat, b.textile.id);
  const matLine = fx.line(w, b.req.id, mat);
  await pressS1(w, b.req.id);
  t.check('a new line: only its slots are made', count(w, PS) === 20 && slotsOn(w, matLine).length === 4, count(w, PS));
});

add('T28', 'Withdrawn and reopened keys, and a withdrawal that would set aside a recorded decision (v6)', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const v1 = slotAt(w, b.L.vessel, 1), v2 = slotAt(w, b.L.vessel, 2);
  w.set(PS, v1, { Withdrawn: true });
  t.check('without Duplicate of: not valid, and the slot stays active', slot(w, v1, 'Status') === 'Withdrawal not valid: name the record it duplicates' && slot(w, v1, 'Active') === 1);
  w.set(PS, v1, { 'Duplicate of': [v2] });
  t.check('naming a record with another key: not valid, still active', slot(w, v1, 'Validly withdrawn') === 0 && slot(w, v1, 'Active') === 1 && slot(w, v1, 'Status') === 'Withdrawal not valid: name the record it duplicates');
  w.set(PS, v1, { Withdrawn: false, 'Duplicate of': null });

  // Two records for one key, from a double press of S1 on a new line.
  const p2 = fx.product(w, { name: 'Bath Vessel Lid', style: 'Bath vessel lid', color: 'natural glaze', size: 'one size', facts: 'A lid in a natural glaze.' });
  await assign(w, p2, b.vessel.id);
  const lid = fx.line(w, b.req.id, p2);
  const A = start(w, SRC.s1, fx.cfg('s1', b.req.id)), B = start(w, SRC.s1, fx.cfg('s1', b.req.id));
  await holdBefore(w, A, kindIs('create')); await runAlone(w, B); await runAlone(w, A);
  const [x, y] = slotsOn(w, lid).filter(s => slot(w, s, 'Kept position') === 4);
  t.check('two records for the lid\'s image 4 key', x && y && slot(w, x, 'Slot key') === slot(w, y, 'Slot key') && slot(w, x, 'Key count') === 2);
  // Withdraw every record for one key: S1 makes nothing, and says so.
  const [p1, q1] = slotsOn(w, lid).filter(s => slot(w, s, 'Kept position') === 1);
  w.set(PS, p1, { Withdrawn: true, 'Duplicate of': [q1] }); w.set(PS, q1, { Withdrawn: true, 'Duplicate of': [p1] });
  const n1 = count(w, PS);
  await pressS1(w, b.req.id);
  t.check('every record withdrawn: S1 makes nothing and says so', count(w, PS) === n1 && note(w, b.req.id).includes('Bath Vessel Lid · 1: every record is withdrawn. If it is still required, untick Withdrawn on one.'), note(w, b.req.id));
  w.set(PS, q1, { Withdrawn: false, 'Duplicate of': null });
  t.check('untick Withdrawn on one: it is active again, and the other\'s withdrawal is valid', slot(w, q1, 'Active') === 1 && slot(w, p1, 'Validly withdrawn') === 1 && slot(w, q1, 'Key count') === 1 && slot(w, q1, 'Slot ok') === 1);

  // One record of the pair carries a recorded waiver.
  await recordSlot(w, x, { 'Not needed': true, 'Not needed reason': 'not shown for the lid' });
  w.set(PS, x, { Withdrawn: true, 'Duplicate of': [y] });
  t.check('withdrawing the record carrying a decision: not valid, shown ahead of its Not needed line', slot(w, x, 'Validly withdrawn') === 0 && slot(w, x, 'Status') === 'Withdrawal not valid: this record carries a decision; record it on the other first', slot(w, x, 'Status'));
  t.check('while both stand, neither is ok (S2 would make nothing for the key)', slot(w, y, 'Key count') === 2 && slot(w, y, 'Slot ok') === 0 && slot(w, y, 'Pickup ok') === 0 && slot(w, x, 'Slot ok') === 0);
  w.advance(5_000);
  await recordSlot(w, y, { 'Not needed': true, 'Not needed reason': 'not shown for the lid' });
  t.check('the waiver recorded on the other: the withdrawal is valid', slot(w, x, 'Validly withdrawn') === 1 && slot(w, x, 'Status') === 'Withdrawn' && slot(w, y, 'Key count') === 1 && slot(w, y, 'Waived') === 1);
  w.advance(5_000);
  await recordSlot(w, y, { 'Not needed': false, 'Not needed reason': null });
  t.check('a later decision on the kept record leaves the withdrawal valid', slot(w, x, 'Validly withdrawn') === 1 && slot(w, y, 'Waived') === 0 && slot(w, y, 'Active') === 1);
  // Hand edits of either record's Decision recorded at: forward changes nothing; back is flagged.
  const at = slot(w, x, 'Decision recorded at');
  w.advance(120_000);
  w.set(PS, x, { 'Decision recorded at': new Date(Date.parse(at) + 3_600_000).toISOString() });
  w.set(PS, y, { 'Decision recorded at': new Date(Date.parse(slot(w, y, 'Decision recorded at')) + 3_600_000).toISOString() });
  t.check('forward on either: validity unchanged', slot(w, x, 'Validly withdrawn') === 1 && slot(w, x, 'Held') === 0 && slot(w, y, 'Held') === 0);
  w.set(PS, x, { 'Decision recorded at': new Date(Date.parse(at) - 3_600_000).toISOString() });
  t.check('back on the withdrawn one: flagged, held, and the withdrawal not valid until recorded again', slot(w, x, 'Held') === 1 && slot(w, x, 'Validly withdrawn') === 0, slot(w, x, 'Status'));
  w.set(PS, x, decision(w.get(PS, x, 'Decision source')));  // the same decision fields; S7 records it again
  await pressS7Slot(w, x);
  t.check('recorded again: valid again', slot(w, x, 'Held') === 0 && slot(w, x, 'Validly withdrawn') === 1, slot(w, x, 'Status'));
  w.set(PS, y, { 'Decision recorded at': new Date(Date.parse(slot(w, y, 'Decision recorded at')) - 7_200_000).toISOString() });
  t.check('back on the kept one: it is held, and the withdrawal is not valid', slot(w, y, 'Held') === 1 && slot(w, x, 'Validly withdrawn') === 0);
  await pressS7Slot(w, y);
  t.check('recorded again: valid', slot(w, y, 'Held') === 0 && slot(w, x, 'Validly withdrawn') === 1);

  // Reopen a waived slot and record it: it plans again.
  const s4 = slotAt(w, b.L.sheet, 4);
  await recordSlot(w, s4, { 'Not needed': true });
  t.check('waived', slot(w, s4, 'Waived') === 1 && slot(w, s4, 'Active') === 0);
  await recordSlot(w, s4, { 'Not needed': false });
  t.check('reopened and recorded: active, and ok for its fulfillment', slot(w, s4, 'Waived') === 0 && slot(w, s4, 'Active') === 1 && slot(w, s4, 'Pickup ok') === 1);
});

add('T29', 'A new version of a request: S1 refuses the superseded request; the new version\'s slots are made, and its note lists the earlier waivers and departures; none is carried over', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const glaze = slotAt(w, b.L.vessel, 3), sheet4 = slotAt(w, b.L.sheet, 4);
  await recordSlot(w, glaze, { Fulfillment: 'An accepted image', 'Fulfillment reason': 'Close study shows the glaze' });
  await recordSlot(w, sheet4, { 'Not needed': true, 'Not needed reason': 'the collection image shows the bath towel beside other products' });
  const before = w.ids(PS).map(id => fx.stored(w, PS, id)).join();
  const v2 = fx.request(w, { name: 'Bath product pages v2', products: [b.P.vessel, b.P.towel, b.P.sheet, b.P.hand], supersedes: [b.req.id] });
  t.check('v1 reads superseded', w.get('Briefs', b.req.id, 'Superseded') === 1);
  const n0 = count(w, PS);
  await pressS1(w, b.req.id);
  t.check('S1 refuses the superseded request', count(w, PS) === n0 && /Nothing was made: this request is superseded/.test(note(w, b.req.id)));
  await pressS1(w, v2.id);
  t.check('the new version gets its own 16 slots', count(w, PS) === 32 && v2.lines.every(l => slotsOn(w, l).length === 4));
  const n = note(w, v2.id);
  t.check('its note lists the earlier waivers and departures, product by product', n.endsWith("The earlier version's waivers and departures, to decide again here; none was carried over:\n"
    + '- Bath Sheet · 4 In a setting: Not needed · decided by ASK · the collection image shows the bath towel beside other products\n'
    + '- Bath Vessel · 3 Glaze detail: An accepted image · decided by ASK · Close study shows the glaze'), n);
  const g2 = slotAt(w, v2.lines[0], 3), s42 = slotAt(w, v2.lines[2], 4);
  t.check('none carried over', slot(w, g2, 'Operative fulfillment') === 'Make' && !slot(w, g2, 'Decided content') && slot(w, s42, 'Waived') === 0 && slot(w, s42, 'Active') === 1);
  t.check('the earlier version\'s slots are unchanged, and out of the plan', w.ids(PS).slice(0, 16).map(id => fx.stored(w, PS, id)).join() === before && slot(w, glaze, 'In adopted plan') === 0
    && slot(w, slotAt(w, b.L.vessel, 1), 'Status') === 'Not in the adopted plan: the request was superseded');
});

add('T35-s1', 'A line\'s product changed to another on the same guide: S1 makes new slots (new keys); the old ones leave the plan with their waivers (S2\'s pair check is part 2\'s)', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const old4 = slotAt(w, b.L.sheet, 4);
  await recordSlot(w, old4, { 'Not needed': true, 'Not needed reason': 'shown only with the bath towel' });
  const xl = fx.product(w, { name: 'Bath Sheet XL', style: 'Terry towel', color: 'white', size: 'sheet XL', facts: TERRY_FACTS });
  await assign(w, xl, b.textile.id);
  const oldSlots = slotsOn(w, b.L.sheet);
  w.set('Product lines', b.L.sheet, { Product: [xl] });
  t.check('the old slots leave the plan at once', oldSlots.every(s => slot(w, s, 'In adopted plan') === 0 && slot(w, s, 'Active') === 0));
  await pressS1(w, b.req.id);
  const now = slotsOn(w, b.L.sheet), fresh = now.filter(s => !oldSlots.includes(s));
  t.check('4 new slots, with new keys for the new product', fresh.length === 4 && fresh.every(s => slot(w, s, 'Kept product ID') === xl && slot(w, s, 'Active') === 1 && slot(w, s, 'Key count') === 1));
  t.check('the old slots stay out, the waiver stays with its slot', slot(w, old4, 'Recorded not needed') === true && slot(w, old4, 'Waived') === 1
    && slot(w, oldSlots.find(s => s !== old4), 'Status') === "Not in the adopted plan: the line's product was changed");
});
const TERRY_FACTS = fx.TERRY;

// T40's body, shared with its negative control (CTRL-CX6), which runs it on a mutated formula.
async function t40(t, opts = {}) {
  for (const clearReason of [false, true]) {
    const b = await bathPlanned(new World(opts)), { w } = b;
    const s = slotAt(w, b.L.towel, 2); const st = fx.settle(w, [s]); const app = st.apps[0];
    t.check(`[${clearReason ? 'reason cleared' : 'reason kept'}] Settled`, placement(w, s) === 'Settled');
    await recordSlot(w, s, { 'Not needed': true, 'Not needed reason': 'test: hanging not used' });
    t.check('waived, inactive, image Needs review with Current unchanged, not Settled', slot(w, s, 'Waived') === 1 && slot(w, s, 'Active') === 0 && placement(w, s) === 'Needs review'
      && w.get('Applications', app, 'Current') === true && appState(w, app) === 'Needs review: the slot is marked not needed');
    t.check('its Status reads the recorded waiver (the Not in use group)', slot(w, s, 'Status') === 'Not needed: Not needed · decided by ASK · test: hanging not used', slot(w, s, 'Status'));
    w.set(PS, s, { 'Not needed reason': 'test: hanging not used here' });
    t.check('reason edited without a press: still waived and not Settled; a change waits', slot(w, s, 'Waived') === 1 && placement(w, s) !== 'Settled' && slot(w, s, 'Status').endsWith(', and a change waits for its decision record'), slot(w, s, 'Status'));
    w.set(PS, s, { 'Not needed': false, ...(clearReason ? { 'Not needed reason': null } : {}) });
    t.check('Not needed unticked without a press: still waived and not Settled', slot(w, s, 'Waived') === 1 && slot(w, s, 'Active') === 0 && placement(w, s) !== 'Settled');
    const r = await pressS7Slot(w, s);
    t.check('S7 records the reopening, since it checks the values it records', r.ok && slot(w, s, 'Recorded not needed') == null && /^Recorded: Make/.test(slot(w, s, 'Record result')), slot(w, s, 'Record result'));
    t.check('only now: active and Settled again', slot(w, s, 'Waived') === 0 && slot(w, s, 'Active') === 1 && placement(w, s) === 'Settled' && appState(w, app) === 'In use');
    // A draft departure on a Settled slot: the image stays Settled while new work is blocked.
    w.set(PS, s, { Fulfillment: 'An accepted image', 'Fulfillment reason': 'test: a pickup instead' });
    t.check('draft departure: still Settled; not ok, no pickup, a change waits', placement(w, s) === 'Settled' && slot(w, s, 'Slot ok') === 0 && slot(w, s, 'Pickup ok') === 0 && slot(w, s, 'Change pending') === TEXT.changePending);
    // An unrecorded waiver on another slot doesn't waive it.
    const other = slotAt(w, b.L.sheet, 2);
    w.set(PS, other, { 'Not needed': true, 'Not needed reason': 'test: draft only' });
    t.check('an unrecorded Not needed mark on another slot doesn\'t waive it', slot(w, other, 'Waived') === 0 && slot(w, other, 'Active') === 1);
  }
}
add('T40/CX6', 'CX6: a recorded waiver, then edits without a press: only the recording press restores settled use; a draft departure leaves the image Settled and blocks new work', t => t40(t));

add('U24-s7', 'Decision records on a slot: a recorded departure operates until a change is recorded; a re-save without a press still waits; set back with the reason cleared, S7 records it; ASK and the operator on ASK\'s relay both record (S5\'s part is part 3\'s)', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const s = slotAt(w, b.L.vessel, 2);
  let r = await recordSlot(w, s, { Fulfillment: 'An accepted image', 'Fulfillment reason': 'test: picked up' }, undefined, 'ASK');
  t.check('recorded by ASK (entered on the relay)', r.ok && slot(w, s, 'Operative fulfillment') === 'An accepted image' && slot(w, s, 'Recorded summary') === 'An accepted image · decided by ASK · test: picked up');
  w.set(PS, s, { Fulfillment: 'Make' });
  t.check('Fulfillment changed: a change waits; the recorded fulfillment still operates', slot(w, s, 'Change pending') === TEXT.changePending && slot(w, s, 'Operative fulfillment') === 'An accepted image');
  w.set(PS, s, { 'Decision source': 'ASK, in the base, re-saved' });
  t.check('Decision source re-saved without S7: still waiting', slot(w, s, 'Change pending') === TEXT.changePending && slot(w, s, 'Operative fulfillment') === 'An accepted image');
  w.set(PS, s, { 'Fulfillment reason': null, 'Decided by': 'claude-code', 'Entered by': 'claude-code' });
  r = await pressS7Slot(w, s);
  t.check('set back to the Fill rule\'s fulfillment with the reason cleared: S7 records it; the new fulfillment operates', r.ok && slot(w, s, 'Operative fulfillment') === 'Make' && !slot(w, s, 'Change pending') && slot(w, s, 'Departure') === 0, slot(w, s, 'Record result'));
  t.check('decided by another name: the summary shows Decided by', slot(w, s, 'Recorded summary') === 'Make · decided by claude-code');
  r = await recordSlot(w, s, { Fulfillment: 'Make' }, undefined, 'ASK');
  t.check('and by ASK again', r.ok && slot(w, s, 'Recorded summary') === 'Make · decided by ASK' && slot(w, s, 'Entered by') === "claude-code, on ASK's relay");
});

add('T39-s1', "T39's S1 part: after adopted changes, S1 makes nothing for the changed keys and names each slot's next step (its shot's Replan, the slot's own Replan, or a new request version); a retired one gets no Replan step", async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const at = (p, n) => slotAt(w, b.L[p], n);
  fx.makeShot(w, [at('towel', 1), at('sheet', 1)]);  // an unaccepted shared shot
  fx.settle(w, [at('towel', 3), at('sheet', 3)]);     // an accepted shared shot
  for (const [i, v] of [[0, 'folded'], [1, 'hanging'], [2, 'weave']]) w.set(GS, b.textile.slots[i], { View: `${fx.VIEWS[v]} On linen.` });
  w.set(GS, b.vessel.slots[2], { 'Fill rule': 'An accepted image that shows the product' }); // an obligation change
  w.set(GS, b.vessel.slots[1], { Retired: true });
  await adopt(w, b.textile.id); await adopt(w, b.vessel.id);
  const r = await pressS1(w, b.req.id), n = note(w, b.req.id);
  t.check('ran; nothing made', r.ok && count(w, PS) === 16, n);
  t.check('unaccepted shot: "press Replan on its shot"', n.includes('Bath Towel · 1: changed by the adopted guide; press Replan on its shot.') && n.includes('Bath Sheet · 1: changed by the adopted guide; press Replan on its shot.'), n);
  t.check('accepted shot: "press Replan on this slot"', n.includes('Bath Towel · 3: changed by the adopted guide; press Replan on this slot.'), n);
  t.check('no shot: "press Replan on this slot"', n.includes('Hand Towel · 2: changed by the adopted guide; press Replan on this slot.') && n.includes('Hand Towel · 1: changed by the adopted guide; press Replan on this slot.'), n);
  t.check('obligation changed: "plan it in a new version of the request"', n.includes('Bath Vessel · 3: changed by the adopted guide; plan it in a new version of the request.'), n);
  t.check('retired: no line in the note', !n.includes('Bath Vessel · 2'), n);
  t.check('the slots\' Status agree', slot(w, at('towel', 1), 'Status') === 'Not in the adopted plan: the guide changed it: press Replan on its shot'
    && slot(w, at('vessel', 3), 'Status') === 'Not in the adopted plan: the guide changed it: plan it in a new version of the request'
    && slot(w, at('vessel', 2), 'Status') === 'Not in the adopted plan: the guide retired this image');
  t.check('Replan reach: stale with the obligation unchanged is in reach; the obligation change and the retirement aren\'t', slot(w, at('towel', 1), 'Replan reach') === 1 && slot(w, at('vessel', 3), 'Replan reach') === 0 && slot(w, at('vessel', 2), 'Replan reach') === 0);
});

add('T20-s1', "T20's S1 and formula part: an unrecorded reassignment changes nothing and S1 says a change waits; recorded, the old slots leave the plan and S1 makes the new guide's; assigned back, the old ones return with their waivers", async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const old = slotsOn(w, b.L.sheet), s4 = slotAt(w, b.L.sheet, 4), s2 = slotAt(w, b.L.sheet, 2);
  await recordSlot(w, s4, { 'Not needed': true });
  const st = fx.settle(w, [s2]);
  w.set('Products', b.P.sheet, { 'Shot guide': [b.vessel.id], 'Assignment basis': 'test: reassigned' });
  t.check('before it is recorded: the slots stay as they were, the Settled one included', old.every(x => slot(w, x, 'In adopted plan') === 1) && placement(w, s2) === 'Settled' && slot(w, s4, 'Waived') === 1);
  await pressS1(w, b.req.id);
  t.check('S1 makes nothing for the product and says a change waits', slotsOn(w, b.L.sheet).length === 4 && note(w, b.req.id).includes('Bath Sheet: an assignment change waits for its decision record; nothing was made for it.'), note(w, b.req.id));
  await pressS7Product(w, b.P.sheet);
  t.check('recorded: the old slots leave the plan at once; the application Needs review', old.every(x => slot(w, x, 'In adopted plan') === 0) && placement(w, s2) === 'Needs review' && w.get('Applications', st.apps[0], 'Current') === true);
  t.check('their Status says the product was reassigned (a waived one keeps its waiver line)', slot(w, s2, 'Status') === 'Not in the adopted plan: the product was reassigned' && slot(w, s4, 'Waived') === 1);
  await pressS1(w, b.req.id);
  const fresh = slotsOn(w, b.L.sheet).filter(x => !old.includes(x));
  t.check('S1 makes the new guide\'s 4 slots, with new keys', fresh.length === 4 && fresh.every(x => slot(w, x, 'Kept guide ID') === b.vessel.id && slot(w, x, 'Active') === 1));
  await assign(w, b.P.sheet, b.textile.id, 'test: assigned back');
  t.check('assigned back: the old slots return, with their waiver and application as they were', old.filter(x => x !== s4).every(x => slot(w, x, 'Active') === 1) && slot(w, s4, 'Waived') === 1 && placement(w, s2) === 'Settled');
  t.check('the new guide\'s slots leave the plan', fresh.every(x => slot(w, x, 'In adopted plan') === 0));
});

add('T37-local', 'The hand-edit detector on what S1, S6 and S7 write: a press is never flagged (both last-modified models); an edit over a minute later, or a value no script wrote, is; one within the minute isn\'t (the stated limit)', async t => {
  for (const lmtOnUnchangedWrite of [false, true]) {
    const b = await bathPlanned(new World({ lmtOnUnchangedWrite })), { w } = b, m = `[${lmtOnUnchangedWrite ? 'any write moves it' : 'only a change moves it'}]`;
    const s = slotAt(w, b.L.sheet, 4);
    await recordSlot(w, s, { 'Not needed': true });
    w.advance(10 * 60_000);
    await pressS7Slot(w, s); // an S7 record that leaves its Recorded fields unchanged
    t.check(`${m} an unchanged S7 record isn't flagged`, slot(w, s, 'Held') === 0 && slot(w, s, 'Record intact') === 1);
    t.check(`${m} S1's kept plans and S7's product records aren't flagged`, w.ids(PS).every(x => slot(w, x, 'Kept plan check') === '') && w.get('Products', b.P.towel, 'Record intact') === 1);
    w.advance(30_000); w.set(PS, s, { 'Recorded not needed': false });
    t.check(`${m} within a minute: not flagged (the detector's limit, recorded, not a pass)`, slot(w, s, 'Held') === 0);
    await pressS7Slot(w, s); w.advance(61_000); w.set(PS, s, { 'Recorded not needed': false });
    t.check(`${m} over a minute later: Edited by hand, held, not waived`, slot(w, s, 'Record check') === 'Edited by hand' && slot(w, s, 'Held') === 1 && slot(w, s, 'Waived') === 0 && slot(w, s, 'Status') === TEXT.heldSlot);
    const fresh = slotAt(w, b.L.sheet, 3);
    w.set(PS, fresh, { 'Recorded not needed': true });
    t.check(`${m} a value no script wrote: flagged at once, held, not waived`, slot(w, fresh, 'Held') === 1 && slot(w, fresh, 'Waived') === 0);
    w.set(PS, fresh, decision());
    await pressS7Slot(w, fresh);
    t.check(`${m} recorded again: not held; what it records is the editable fields`, slot(w, fresh, 'Held') === 0 && slot(w, fresh, 'Recorded not needed') == null && slot(w, fresh, 'Active') === 1);
    w.advance(61_000); w.set(PS, fresh, { 'Kept fill rule': 'Made for each product' });
    t.check(`${m} a hand-edited kept plan holds the slot, names a new version, and S7 refuses it`, slot(w, fresh, 'Held') === 1 && slot(w, fresh, 'Status') === TEXT.heldPlan);
    await pressS7Slot(w, fresh);
    t.check(`${m} S7 refused`, /^Not recorded: this slot's kept plan was edited by hand/.test(slot(w, fresh, 'Record result')));
    w.advance(61_000); w.set('Products', b.P.hand, { 'Recorded guide ID': b.vessel.id });
    t.check(`${m} a hand-edited Recorded guide ID holds the product's slots, and S1 lists the product`, slotsOn(w, b.L.hand).every(x => slot(w, x, 'Held') === 1) && slot(w, slotAt(w, b.L.hand, 1), 'Status') === TEXT.heldProduct);
    await pressS1(w, b.req.id);
    t.check(`${m} S1: edited by hand, nothing made`, note(w, b.req.id).includes('Hand Towel: its assignment record was edited by hand'), note(w, b.req.id));
    await pressS7Product(w, b.P.hand);
    t.check(`${m} Record decision on the product restores it`, w.get('Products', b.P.hand, 'Record intact') === 1 && w.get('Products', b.P.hand, 'Assigned guide ID') === b.textile.id && slotsOn(w, b.L.hand).every(x => slot(w, x, 'Held') === 0));
  }
});

add('T41-local', 'A hand paste of a changed Definition into Adopted definition: every slot on the guide is held, not taken out of the plan; S6 adopts again over it as a new version, noting the hand edit; the guide\'s slots return', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  w.advance(5 * 60_000);
  w.set(GS, b.vessel.slots[1], { View: `${fx.VIEWS.threeQuarter} Lit from the left.` }); // a draft change
  w.set(SG, b.vessel.id, { 'Adopted definition': w.get(SG, b.vessel.id, 'Definition') }); // then pasted by hand, as if adopted
  t.check('the pasted text equals the Definition', w.get(SG, b.vessel.id, 'Adopted definition') === w.get(SG, b.vessel.id, 'Definition'));
  t.check('flagged: not Complete; every slot on the guide is held, and not waived or ok', w.get(SG, b.vessel.id, 'Complete') === 0 && w.get(SG, b.vessel.id, 'Status') === 'Edited by hand: adopt the guide again'
    && slotsOn(w, b.L.vessel).every(s => slot(w, s, 'Held') === 1 && slot(w, s, 'Slot ok') === 0) && slot(w, slotAt(w, b.L.vessel, 1), 'Status') === TEXT.heldGuide);
  const tq = slotAt(w, b.L.vessel, 2);
  t.check('activity follows the adopted text as it stands: the slot whose line the paste changed reads out of it, but held, and its Status says edited by hand, not out of the plan',
    slot(w, tq, 'In adopted plan') === 0 && slot(w, tq, 'Held') === 1 && slot(w, tq, 'Status') === TEXT.heldGuide && [1, 3, 4].every(p => slot(w, slotAt(w, b.L.vessel, p), 'In adopted plan') === 1));
  let r = await pressS6(w, b.vessel.id);
  t.check('S6 without a new decision record refuses', /^Not adopted: a new adoption needs its own decision/.test(w.get(SG, b.vessel.id, 'Adoption result')));
  r = await adopt(w, b.vessel.id);
  t.check('with a new decision record: adopted as version 2, though the text is equal', r.ok && w.get(SG, b.vessel.id, 'Adopted version') === 2 && w.get(SG, b.vessel.id, 'Complete') === 1);
  t.check('its log line notes the hand edit it replaced', / · replaces an adopted definition edited by hand$/.test(w.get(SG, b.vessel.id, 'Adoption log')), w.get(SG, b.vessel.id, 'Adoption log'));
  t.check('the slots are no longer held', slotsOn(w, b.L.vessel).every(s => slot(w, s, 'Held') === 0));
});

// ---- bindings, script hygiene
for (const [name, key, bad, re] of [
  ['s1', 'slotKeyField', 'Slot kee', /No field "Slot kee"/], ['s1', 'heldField', 'Name', /S1: heldField must be of type formula, not singleLineText/],
  ['s6', 'adoptedVersionField', 'Adopted at', /S6: adoptedVersionField must be of type number, not dateTime/], ['s6', 'decidedByField', undefined, /S6: input decidedByField is missing/],
  ['s7slot', 'recordedNotNeededField', 'Not needed reason', /S7: recordedNotNeededField must be of type checkbox, not multilineText/], ['s7product', 'recordedGuideField', 'Shot guide ID', /S7: recordedGuideField must be of type multipleRecordLinks, not multipleLookupValues/],
]) add(`BIND-${name}-${key}`, `${name}: a binding that doesn't resolve or has the wrong type stops the run before any read or write`, async t => {
  const b = bath(new World()), { w } = b;
  const id = name === 's1' ? b.req.id : name === 's6' ? b.vessel.id : name === 's7product' ? b.P.vessel : w.add(PS, { Name: 'x' });
  const before = w.state();
  const src = name.startsWith('s7') ? SRC.s7 : SRC[name];
  const r = await runAlone(w, start(w, src, { ...fx.cfg(name, id), [key]: bad }));
  t.check('stopped with the binding error', !r.ok && re.test(r.error.message), r.error && r.error.message);
  t.check('no operation, nothing written', r.ops === 0 && w.state() === before);
});
add('BIND-ids', 'Each script bound by table and field IDs instead of names behaves the same', async t => {
  const b = bath(new World()), { w } = b;
  w.set(SG, b.vessel.id, decision());
  let r = await runAlone(w, start(w, SRC.s6, fx.idConfig(w, 's6', b.vessel.id)));
  t.check('S6 by ID', r.ok && w.get(SG, b.vessel.id, 'Adopted version') === 1, r.error && r.error.message);
  w.set('Products', b.P.vessel, { 'Shot guide': [b.vessel.id], 'Assignment basis': 'a ceramic vessel', ...decision() });
  r = await runAlone(w, start(w, SRC.s7, fx.idConfig(w, 's7product', b.P.vessel)));
  t.check('S7 (product) by ID', r.ok && w.get('Products', b.P.vessel, 'Assignment check') === 'Recorded', r.error && r.error.message);
  r = await runAlone(w, start(w, SRC.s1, fx.idConfig(w, 's1', b.req.id)));
  t.check('S1 by ID', r.ok && slotsOn(w, b.L.vessel).length === 4, r.error && r.error.message);
  const s = slotAt(w, b.L.vessel, 4);
  w.set(PS, s, { 'Not needed': true, ...decision() });
  r = await runAlone(w, start(w, SRC.s7, fx.idConfig(w, 's7slot', s)));
  t.check('S7 (slot) by ID', r.ok && slot(w, s, 'Waived') === 1, r.error && r.error.message);
});
add('HYGIENE', 'Each script is a standalone automation script: no import, require, Node API or top-level return; reads input.config() once; ends with await main();', async t => {
  for (const [name, src] of Object.entries(SRC)) {
    t.check(`${name}: no import/require/process`, !/^\s*import\s|\brequire\(|\bprocess\.|\bBuffer\b|\bfs\./m.test(src));
    t.check(`${name}: no top-level return`, !/^return\b/m.test(src));
    t.check(`${name}: input.config() once`, (src.match(/input\.config\(\)/g) || []).length === 1);
    t.check(`${name}: ends with await main();`, /await main\(\);\s*$/.test(src));
    t.check(`${name}: parses`, (() => { try { new Function(`return (async () => {\n${src}\n})`); return true; } catch { return false; } })());
  }
});

// The Airtable texts and computed-field specs refer only to fields that exist in their tables.
function schemaProblems(w, extraText = {}) {
  const out = [];
  for (const t of w.tables.values()) for (const f of t.fields) {
    const text = (extraText[t.name] && extraText[t.name][f.name]) || (f.kind === 'formula' ? f.fn.airtable : null);
    if (f.kind === 'formula') {
      if (!text) out.push(`${t.name}.${f.name}: no Airtable text`);
      for (const [, ref] of (text || '').matchAll(/\{([^{}]+)\}/g)) if (!t.byKey.has(ref)) out.push(`${t.name}.${f.name} refers to {${ref}}, not a field of ${t.name}`);
      if (/<[a-z][^>]*>/i.test(text || '')) out.push(`${t.name}.${f.name}: a placeholder in its text`);
    }
    if (['lookup', 'rollup', 'count'].includes(f.kind)) {
      const l = t.byKey.get(f.opts.link);
      if (!l || l.kind !== 'link') { out.push(`${t.name}.${f.name}: ${f.opts.link} isn't a link field`); continue; }
      if (f.kind !== 'count' && !w.t(l.opts.table).byKey.has(f.opts.field)) out.push(`${t.name}.${f.name}: ${l.opts.table} has no ${f.opts.field}`);
      if (f.opts.where && !w.t(l.opts.table).byKey.has(f.opts.where)) out.push(`${t.name}.${f.name}: ${l.opts.table} has no ${f.opts.where}`);
    }
    if (f.kind === 'modified') for (const n of f.opts.watch) if (!t.byKey.has(n)) out.push(`${t.name}.${f.name} watches ${n}, not a field`);
  }
  return out;
}
add('SCHEMA-refs', 'Every formula carries its Airtable text, and every field it, a lookup, a rollup or a last-modified time names exists in its table; a control text naming a missing field is caught', async t => {
  const w = new World();
  const problems = schemaProblems(w);
  t.check('no unexplained reference in the schema and formulas', problems.length === 0, problems);
  const caught = schemaProblems(w, { 'Product-page slots': { Waived: 'IF(AND({Recorded not neded}, {Held} = 0), 1, 0)' } });
  t.check('control: a misspelt field in a text is caught', caught.some(x => x.includes('{Recorded not neded}')), caught);
});

// ---- negative controls: each mechanism disabled in a mutated copy, and the check that guards it failing
const mutate = (t, src, from, to, label) => { const m = src.replace(from, to); t.check(`control prepared (${label})`, m !== src); return m; };

// CX6: Waived reads the recorded field, never the editable box. The control runs T40 itself.
add('CTRL-CX6', 'Negative control: with Waived read from the editable Not needed box, T40\'s guards fail as CX6 did: an unrecorded reopening makes the slot active and its image Settled, and an unrecorded mark waives', async t => {
  const editable = { 'Product-page slots': { Waived: Object.assign(r => ((r.get('Not needed') === true && Number(r.get('Held')) === 0) ? 1 : 0), { airtable: 'IF(AND({Not needed}, {Held} = 0), 1, 0)' }) } };
  const run = async opts => { const got = []; const inner = { check: (label, ok) => { got.push([label, !!ok]); return !!ok; } }; await t40(inner, opts); return got; };
  const asWritten = await run({}), mutated = await run({ formulas: editable });
  t.check('as written, every T40 check holds', asWritten.length > 0 && asWritten.every(([, ok]) => ok), asWritten.filter(([, ok]) => !ok).map(([l]) => l));
  const failed = new Set(mutated.filter(([, ok]) => !ok).map(([l]) => l));
  t.check('mutated: the guard "Not needed unticked without a press: still waived and not Settled" fails', failed.has('Not needed unticked without a press: still waived and not Settled'), [...failed]);
  t.check('mutated: the guard against an unrecorded mark waiving fails', failed.has("an unrecorded Not needed mark on another slot doesn't waive it"), [...failed]);
});

// R1: the slot key carries the guide; T24's move-then-reassign scenario.
async function keyScenario(w, s1src) {
  const b = await bathPlanned(w);
  const linen = fx.guide(w, 'Bath linen', [{ name: 'Draped', position: 1, view: 'Draped over a rail. The product alone.' }]);
  await adopt(w, linen.id);
  const hanging = b.textile.slots[1], towelHanging = slotAt(w, b.L.towel, 2);
  await recordSlot(w, towelHanging, { Fulfillment: 'An accepted image', 'Fulfillment reason': 'test: kept decision' });
  w.set(GS, hanging, { Guide: [linen.id], Position: 2 }); // move the Hanging guide slot to Bath linen
  const draft = { complete: [w.get(SG, b.textile.id, 'Complete'), w.get(SG, linen.id, 'Complete')], inPlan: slot(w, towelHanging, 'In adopted plan') };
  await adopt(w, b.textile.id); await adopt(w, linen.id);
  const adopted = { inPlan: slot(w, towelHanging, 'In adopted plan'), status: slot(w, towelHanging, 'Status') };
  await assign(w, b.P.towel, linen.id, 'test: reassigned to Bath linen');
  await fx.press(w, s1src, fx.cfg('s1', b.req.id));
  const forHanging = slotsOn(w, b.L.towel).filter(s => (slot(w, s, 'Guide slot') || [])[0] === hanging);
  const activeHanging = forHanging.filter(s => slot(w, s, 'Active') === 1);
  const after = { forHanging: forHanging.length, activeHanging: activeHanging.length, newGuide: activeHanging.every(s => slot(w, s, 'Kept guide ID') === linen.id),
    oldStaysOut: slot(w, towelHanging, 'In adopted plan') === 0 && slot(w, towelHanging, 'Recorded fulfillment') === 'An accepted image',
    draped: slotsOn(w, b.L.towel).filter(s => slot(w, s, 'Kept slot name') === 'Draped' && slot(w, s, 'Active') === 1).length };
  await assign(w, b.P.towel, b.textile.id, 'test: assigned back');
  const back = { textileBack: [1, 3, 4].every(p => slot(w, slotAt(w, b.L.towel, p, { guideSlot: b.textile.slots[p - 1] }), 'In adopted plan') === 1),
    oldOut: slot(w, towelHanging, 'In adopted plan') === 0, newOut: activeHanging.every(s => slot(w, s, 'In adopted plan') === 0) };
  return { draft, adopted, after, back };
}
add('T24-R1', 'The slot key with the guide (v6, T24\'s local part): a guide slot moved to another guide, then a recorded reassignment, gets exactly one new slot; the old one stays out with its decision; assigning back restores the first guide\'s remaining slots', async t => {
  const x = await keyScenario(new World(), SRC.s1);
  t.check('before the move is adopted, both guides are not Complete and the slot stays in the plan', x.draft.complete.join() === '0,0' && x.draft.inPlan === 1, x.draft);
  t.check('after adoption, the moved slot\'s product-page slot is out, and its Status says the guide moved it', x.adopted.inPlan === 0 && x.adopted.status === 'Not in the adopted plan: the guide moved this image to another guide', x.adopted);
  t.check('after the reassignment, S1 makes exactly one active slot for the moved guide slot, keyed by the new guide', x.after.activeHanging === 1 && x.after.forHanging === 2 && x.after.newGuide && x.after.draped === 1, x.after);
  t.check('the old slot stays out with its decision', x.after.oldStaysOut);
  t.check('assigned back: the first guide\'s remaining slots return; the old moved-slot record stays out; the new one leaves', x.back.textileBack && x.back.oldOut && x.back.newOut, x.back);
});
add('CTRL-R1', 'Negative control: with the guide taken out of the slot key (S1\'s key and the Slot key formula), T24-R1\'s guard fails as v5 did: the old record holds the key, and the moved guide slot gets no active slot', async t => {
  const m = mutate(t, SRC.s1, 'const key = `${line.id}/${product.id}/${guideId}/${gs.id}`;', 'const key = `${line.id}/${product.id}/${gs.id}`;', 'S1 key without the guide');
  const v5Key = { 'Product-page slots': { 'Slot key': Object.assign(r => `${[].concat(r.get('Line ID') || []).join('')}/${r.get('Kept product ID') || ''}/${[].concat(r.get('Guide-slot ID') || []).join('')}`, { airtable: 'ARRAYJOIN({Line ID}) & "/" & {Kept product ID} & "/" & ARRAYJOIN({Guide-slot ID})' }) } };
  const x = await keyScenario(new World({ formulas: v5Key }), m);
  t.check('mutated: S1 ran to the end (the new guide\'s Draped slot made, the moved guide slot\'s old record left alone), and the guard "exactly one active slot for the moved guide slot" fails', x.after.draped === 1 && x.after.forHanging === 1 && x.after.activeHanging === 0, x.after);
});
