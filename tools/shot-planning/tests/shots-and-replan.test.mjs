// Shot and replan cases: S2 Make shots and S3 Replan, and the formulas they rely on, on the
// simulated base. Each case runs the exact script bytes of S2 and S3 (with S1, S6 and S7 for the
// steps before them). Where a row also needs Snapshot, Accept or S4, the fixtures' stand-ins write
// what those write (tests/fixtures.mjs); their own behaviour is tested elsewhere or in the copy.
// IDs are v6 §10.1's; a case that covers only a row's S2/S3 part says so (for example T35's S1
// part is planning.test.mjs's T35-s1).
import * as fx from './fixtures.mjs';
import { World, start, runAlone, holdBefore, kindIs } from '../sim/world.mjs';
import { TEXT } from '../sim/formulas.mjs';

const { bath, bathPlanned, adopt, assign, recordSlot, pressS1, pressS2, pressS3Shot, pressS3Slot, slot, slotAt, slotsOn, decision, SRC } = fx;
const PS = 'Product-page slots', SG = 'Shot guides', GS = 'Guide slots', SH = 'Shots';
const SHARE = 'Shared across sizes of one style and color', MAKE = 'Made for each product', PICK = 'An accepted image that shows the product';
const count = (w, table) => w.ids(table).length;
const shot = (w, id, f) => w.get(SH, id, f);
const shotOf = (w, s) => (slot(w, s, 'Shot') || [])[0];
const shotsOn = (w, reqId) => w.find(SH, r => (r.get('Brief') || []).includes(reqId));
const shotNote = (w, reqId) => w.get('Briefs', reqId, 'Shot planning note') || '';
const result = (w, table, id) => w.get(table, id, 'Replan result') || '';
const live = (w, gs) => w.get(GS, gs, 'Definition line');
const placement = (w, s) => slot(w, s, 'Placement state');
const sameIds = (a, b) => JSON.stringify(a || []) === JSON.stringify(b || []);
const wf = (w, id) => [].concat(shot(w, id, 'Workflow') || []).join('');
// The pair checks (§7.3, v6): product-page shots, not Withdrawn, that fill an active slot, one per
// Pair key; product-page shots, not Withdrawn, that fill no slot; slots, one record per Slot key.
function pairCheck(w) {
  const by = new Map();
  for (const id of w.ids(SH)) if (wf(w, id) === 'Product pages' && !shot(w, id, 'Withdrawn') && shot(w, id, 'Active slots filled') > 0) {
    const k = shot(w, id, 'Pair key'); by.set(k, [...(by.get(k) || []), id]);
  }
  return [...by.values()].filter(x => x.length > 1).map(x => x.map(id => shot(w, id, 'Name')));
}
const fillsNoSlot = w => w.ids(SH).filter(id => wf(w, id) === 'Product pages' && !shot(w, id, 'Withdrawn') && !(shot(w, id, 'Slots filled') || []).length);
const slotDuplicates = w => w.ids(PS).filter(s => slot(w, s, 'Validly withdrawn') === 0 && slot(w, s, 'Key count') > 1);
// Snapshot, Accept and S4 stand-ins on a real S2 shot (fixtures).
function acceptShot(w, shotId) {
  const candidate = fx.snapshotCandidate(w, shotId), accepted = fx.accept(w, candidate), apps = fx.applyAcceptance(w, accepted);
  return { candidate, accepted, apps };
}
const mutate = (t, src, from, to, label) => { const m = src.replace(from, to); t.check(`control prepared (${label})`, m !== src); return m; };

export const cases = [];
const add = (id, title, run) => cases.push({ id, title, run });

// ---------------------------------------------------------------------------------------------
add('T3', 'Make shots: a shot per Make slot; one shot per Share group with one signature; a Share group of one without the size sentence; none for accepted-image slots; names as §7.3; exact pair checks; pressed again, nothing new', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const at = (p, n) => slotAt(w, b.L[p], n);
  await recordSlot(w, at('vessel', 3), { Fulfillment: 'An accepted image', 'Fulfillment reason': 'Close study already shows the glaze' });
  await recordSlot(w, at('sheet', 4), { 'Not needed': true, 'Not needed reason': 'the collection image shows the bath towel beside other products' });
  const r = await pressS2(w, b.req.id);
  t.check('S2 ran', r.ok, r.error && r.error.message);
  const shots = shotsOn(w, b.req.id);
  t.check('9 product-page shots (§5)', shots.length === 9, shots.map(id => shot(w, id, 'Name')));
  for (const [p, n, name] of [['vessel', 1, 'Bath Vessel · 1 Front'], ['vessel', 2, 'Bath Vessel · 2 Three-quarter'], ['towel', 2, 'Bath Towel · 2 Hanging'], ['sheet', 2, 'Bath Sheet · 2 Hanging'], ['hand', 2, 'Hand Towel · 2 Hanging']]) {
    const s = at(p, n), sh = shotOf(w, s), gs = slot(w, s, 'Guide-slot ID')[0];
    t.check(`${name}: its own shot, Made as Make, Lines in shot its line, Pair key line + guide slot, filling it alone`, sh && shot(w, sh, 'Name') === name && shot(w, sh, 'Made as') === 'Make'
      && sameIds(shot(w, sh, 'Lines in shot'), [b.L[p]]) && shot(w, sh, 'Pair key') === `${b.L[p]}${gs}` && sameIds(shot(w, sh, 'Slots filled'), [s]), sh && [shot(w, sh, 'Name'), shot(w, sh, 'Pair key')]);
    t.check(`${name}: Planned`, sh && shot(w, sh, 'Planned') === 1, sh && shot(w, sh, 'Plan check'));
  }
  for (const [n, name] of [[1, 'Terry towel, white · 1 Folded'], [3, 'Terry towel, white · 3 Weave detail']]) {
    const tw = at('towel', n), sh = shotOf(w, tw), gs = slot(w, tw, 'Guide-slot ID')[0], sig = slot(w, tw, 'Share signature')[0];
    t.check(`${name}: one shot for both sizes, Made as Share, Lines in shot the first line in request order`, sh && sh === shotOf(w, at('sheet', n)) && shot(w, sh, 'Name') === name && shot(w, sh, 'Made as') === 'Share'
      && sameIds(shot(w, sh, 'Lines in shot'), [b.L.towel]) && shot(w, sh, 'Pair key') === `${b.req.id}${gs}${sig}`, sh && shot(w, sh, 'Name'));
    t.check(`${name}: Planned, same facts, placement names both products, the size sentence`, shot(w, sh, 'Planned') === 1 && shot(w, sh, 'Sharing check') === TEXT.sharedSame
      && shot(w, sh, 'Effective placement') === `Bath Towel, Bath Sheet product pages, image ${n}` && shot(w, sh, 'Effective direction').includes(TEXT.moreSizes.trim()), shot(w, sh, 'Plan check'));
  }
  for (const [n, name] of [[1, 'Waffle towel, oat · 1 Folded'], [3, 'Waffle towel, oat · 3 Weave detail']]) {
    const s = at('hand', n), sh = shotOf(w, s);
    t.check(`${name}: a Share group of one: its own shot (different share key), Made as Share, without the size sentence, Planned`, sh && sh !== shotOf(w, at('towel', n)) && shot(w, sh, 'Name') === name
      && shot(w, sh, 'Made as') === 'Share' && !shot(w, sh, 'Effective direction').includes('more than one size') && shot(w, sh, 'Planned') === 1, sh && [shot(w, sh, 'Name'), shot(w, sh, 'Effective direction'), shot(w, sh, 'Plan check')]);
  }
  t.check('accepted-image slots and the waived slot get none', [['vessel', 3], ['vessel', 4], ['towel', 4], ['hand', 4], ['sheet', 4]].every(([p, n]) => !shotOf(w, at(p, n))));
  t.check('the pair checks are exact: no duplicate Pair key, no shot that fills no slot, no duplicate slot key', !pairCheck(w).length && !fillsNoSlot(w).length && !slotDuplicates(w).length, pairCheck(w));
  t.check('the note lists what was made', /^Make shots, .*:\nMade 9 shots: Bath Vessel · 1 Front; Bath Vessel · 2 Three-quarter; Bath Towel · 2 Hanging;/.test(shotNote(w, b.req.id)) && shotNote(w, b.req.id).includes('Terry towel, white · 1 Folded (Bath Towel, Bath Sheet)'), shotNote(w, b.req.id));
  const n0 = w.writes.length, before = w.ids(SH).join();
  const r2 = await pressS2(w, b.req.id);
  t.check('pressed again: nothing new; the note says so', r2.ok && w.ids(SH).join() === before && /\nMade no new shot\.\nAlready planned: 11 slots with a shot\.$/.test(shotNote(w, b.req.id)), shotNote(w, b.req.id));
  t.check('pressed again: it wrote only the note', w.writes.slice(n0).every(x => x.table === 'Briefs' && x.fields.join() === 'Shot planning note'));
});

// A collection request and its adopted collection guide (v6 §4's Bath set).
async function bathSet(b) {
  const { w } = b;
  const g = fx.guide(w, 'Bath set', [{ name: 'Set together', position: 1, label: 'collection page, image 1', view: "All the request's products together, each recognizable." },
    { name: 'Coordinated pair', position: 2, label: 'collection page, image 2', view: 'Two of the request\'s products together, so their colors and materials read as a pair.' }], { destination: 'Collection' });
  w.set(GS, g.slots[0], { Includes: 'All products in the request' }); w.set(GS, g.slots[1], { Includes: 'Choose', 'Choose count': 2 });
  await adopt(w, g.id);
  const req = fx.request(w, { name: 'Bath set', workflow: 'Collection', products: [b.P.vessel, b.P.towel, b.P.hand] });
  w.set('Briefs', req.id, { 'Shot guide (collection)': [g.id] });
  return { g, req };
}
add('T3-collection', "Make shots on a Collection request: one shot per (request, active guide slot) pair, missing pairs only, with its kept guide plan, Made as Collection and Pair key; a written request's note says its shots are written in it", async t => {
  const b = bath(new World()), { w } = b;
  const { g, req } = await bathSet(b);
  const r = await pressS2(w, req.id);
  t.check('ran', r.ok, r.error && r.error.message);
  const shots = shotsOn(w, req.id);
  const together = shots.find(id => (shot(w, id, 'From guide slot') || [])[0] === g.slots[0]), pair = shots.find(id => (shot(w, id, 'From guide slot') || [])[0] === g.slots[1]);
  t.check('two shots, one per guide slot', shots.length === 2 && together && pair);
  t.check('Set together: name, Made as Collection, Pair key, all the request\'s lines in order', shot(w, together, 'Name') === 'Bath set · Set together' && shot(w, together, 'Made as') === 'Collection'
    && shot(w, together, 'Pair key') === `${req.id}${g.slots[0]}` && sameIds(shot(w, together, 'Lines in shot'), req.lines));
  const plan = shot(w, together, 'Kept guide plan');
  t.check('its kept guide plan carries placement, view, lineage and the guide slot\'s Definition line', plan.startsWith('Placement: collection page, image 1\nView: All the request\'s products together, each recognizable.\nLineage: Shot guide: Bath set, version 1, Set together (guide ')
    && plan.includes(live(w, g.slots[0])), plan);
  t.check('Set together is Planned, with its kept placement and lineage, and Shot-guide check Same', shot(w, together, 'Planned') === 1 && shot(w, together, 'Effective placement') === 'collection page, image 1'
    && shot(w, together, 'Lineage') === `Shot guide: Bath set, version 1, Set together (guide ${g.id}, guide slot ${g.slots[0]}).` && shot(w, together, 'Shot-guide check') === TEXT.guideSame, shot(w, together, 'Plan check'));
  t.check('Coordinated pair waits for the choice: no lines; the note says so', !(shot(w, pair, 'Lines in shot') || []).length && shot(w, pair, 'Plan check') === 'Not planned: choose the products and confirm them'
    && shotNote(w, req.id).includes('Coordinated pair: choose 2 products in Lines in shot, then tick Products confirmed.'), shotNote(w, req.id));
  w.set(SH, pair, { 'Lines in shot': [req.lines[0], req.lines[1]] }); w.set(SH, pair, { 'Products confirmed': true });
  t.check('chosen and confirmed: Planned', shot(w, pair, 'Planned') === 1, shot(w, pair, 'Plan check'));
  const before = w.ids(SH).join();
  await pressS2(w, req.id);
  t.check('pressed again: missing pairs only, so nothing', w.ids(SH).join() === before && shotNote(w, req.id).includes('Made no new shot.\nSet together: already has its shot.\nCoordinated pair: already has its shot.'), shotNote(w, req.id));
  const g2 = fx.guide(w, 'Unadopted set', [{ name: 'All', position: 1, label: 'collection page, image 1' }], { destination: 'Collection' });
  const req2 = fx.request(w, { name: 'Other set', workflow: 'Collection', products: [b.P.vessel] });
  w.set('Briefs', req2.id, { 'Shot guide (collection)': [g2.id] });
  await pressS2(w, req2.id);
  t.check('an unadopted collection guide: nothing made, said so', !shotsOn(w, req2.id).length && shotNote(w, req2.id).includes('Nothing was made: no adopted collection shot guide (Unadopted set: Proposed).'), shotNote(w, req2.id));
  const mk = fx.request(w, { name: 'Bath message', workflow: 'Marketing', products: [b.P.vessel] });
  const n0 = w.writes.length;
  await pressS2(w, mk.id);
  t.check('a written request: "This request\'s shots are written in it", nothing else written', shotNote(w, mk.id).endsWith("Nothing was made: this request's shots are written in it.") && w.writes.slice(n0).every(x => x.fields.join() === 'Shot planning note'));
});

add('T7-membership', "Choose 2 (v3 T7's membership): a line from another request isn't the shot's, so it isn't Planned and Plan check says so; with two of its own request's lines, confirmed, it is; a written shot follows the same rule", async t => {
  const b = bath(new World()), { w } = b;
  const { g, req } = await bathSet(b);
  await pressS2(w, req.id);
  const pair = shotsOn(w, req.id).find(id => (shot(w, id, 'From guide slot') || [])[0] === g.slots[1]);
  const other = fx.request(w, { name: 'Other set', workflow: 'Collection', products: [b.P.towel] });
  w.set(SH, pair, { 'Lines in shot': [req.lines[0], other.lines[0]] }); w.set(SH, pair, { 'Products confirmed': true });
  t.check('a line from another request, two lines, confirmed: not Planned, and Plan check names it', shot(w, pair, 'Planned') === 0 && shot(w, pair, 'Plan check') === TEXT.otherRequest, shot(w, pair, 'Plan check'));
  w.set(SH, pair, { 'Lines in shot': [req.lines[0], req.lines[1]] }); w.set(SH, pair, { 'Products confirmed': true });
  t.check('two of its own request\'s lines, confirmed: Planned', shot(w, pair, 'Planned') === 1, shot(w, pair, 'Plan check'));
  const mk = fx.request(w, { name: 'Bath message', workflow: 'Marketing', products: [b.P.vessel] });
  const written = w.add(SH, { Name: 'Message', Brief: [mk.id], Placement: 'Website hero', 'Shot direction': 'The vessel in a calm room.', 'Lines in shot': [mk.lines[0], other.lines[0]] });
  w.set(SH, written, { 'Products confirmed': true });
  t.check('a written shot with a line from another request: not Planned, the same Plan check', shot(w, written, 'Plan check') === TEXT.otherRequest, shot(w, written, 'Plan check'));
  w.set(SH, written, { 'Lines in shot': [mk.lines[0]] }); w.set(SH, written, { 'Products confirmed': true });
  t.check('its own request\'s line only, confirmed: Planned', shot(w, written, 'Planned') === 1, shot(w, written, 'Plan check'));
});

add('T3b-local', 'A double press of S2 (forced interleaving): the outcome is recorded; the duplicate shows in the shot pair check, and its slot is not ok until it is resolved (Copy records what Airtable does)', async t => {
  const b = bath(new World()), { w } = b;
  await adopt(w, b.vessel.id); await assign(w, b.P.vessel, b.vessel.id); await pressS1(w, b.req.id);
  const A = start(w, SRC.s2, fx.cfg('s2', b.req.id)), B = start(w, SRC.s2, fx.cfg('s2', b.req.id));
  await holdBefore(w, A, kindIs('create')); await runAlone(w, B); await runAlone(w, A);
  t.check('both ran', A.ok && B.ok, [A.error && A.error.message, B.error && B.error.message]);
  const front = slotAt(w, b.L.vessel, 1), shots = slot(w, front, 'Shot') || [];
  t.check('outcome recorded: two shots for the Front slot, both linked to it', shotsOn(w, b.req.id).length === 6 && shots.length === 2, shots.length);
  t.check('the shot pair check lists the duplicate; neither shot is Planned', pairCheck(w).length === 3 && shots.every(x => shot(w, x, 'Planned') === 0), pairCheck(w));
  w.set(SH, shots[1], { 'Slots filled': null, Withdrawn: true });
  t.check('withdrawn and unlinked: the pair check is clear and the kept shot plans', !pairCheck(w).some(x => x.includes('Bath Vessel · 1 Front')) && shot(w, shots[0], 'Planned') === 1, shot(w, shots[0], 'Plan check'));
});

add('T3b-withdrawn', 'A double press of S2, then the duplicate shot only ticked Withdrawn (§7.3), still linked: the slot reads only its kept shot, which has a candidate and plans; Replan on the slot leaves both links; S2 makes nothing', async t => {
  const b = bath(new World()), { w } = b;
  await adopt(w, b.vessel.id); await assign(w, b.P.vessel, b.vessel.id); await pressS1(w, b.req.id);
  const A = start(w, SRC.s2, fx.cfg('s2', b.req.id)), B = start(w, SRC.s2, fx.cfg('s2', b.req.id));
  await holdBefore(w, A, kindIs('create')); await runAlone(w, B); await runAlone(w, A);
  const front = slotAt(w, b.L.vessel, 1), shots = slot(w, front, 'Shot') || [];
  t.check('two shots linked to the Front slot', shots.length === 2, shots);
  const cand = fx.snapshotCandidate(w, shots[0], { image: true });
  w.set(SH, shots[1], { Withdrawn: true }); // only Withdrawn: the duplicate stays linked
  t.check('the slot reads only its kept shot: Live shot count 1, Matches its shot, Slot ok, "Being made: …"', slot(w, front, 'Live shot count') === 1 && slot(w, front, 'Matches its shot') === 1
    && slot(w, front, 'Slot ok') === 1 && slot(w, front, 'Status') === `Being made: ${shot(w, shots[0], 'Name')}`, slot(w, front, 'Status'));
  t.check('the kept shot, with its candidate, is Planned', shot(w, shots[0], 'Planned') === 1 && (shot(w, shots[0], 'Candidates') || []).includes(cand), shot(w, shots[0], 'Plan check'));
  await pressS3Slot(w, front);
  t.check('Replan on the slot: "planned with its shot"; nothing detached, both links kept', result(w, PS, front).endsWith('This slot is planned with its shot: press Replan on the shot.') && sameIds(slot(w, front, 'Shot'), shots) && !slot(w, front, 'Detach log'), result(w, PS, front));
  const before = w.ids(SH).length;
  await pressS2(w, b.req.id);
  // The vessel's other two slots still have both their duplicate shots live, so they aren't ok yet.
  t.check('S2 makes no shot and leaves the links; its note counts the Front slot as planned', w.ids(SH).length === before && sameIds(slot(w, front, 'Shot'), shots) && shotNote(w, b.req.id).includes('Already planned: 1 slot with a shot.')
    && !shotNote(w, b.req.id).includes('Bath Vessel · 1 Front:'), shotNote(w, b.req.id));
});

// A slot linked only to a Withdrawn shot, made stale by an adopted guide change (GPT-B's state).
async function withdrawnStale(w, s3src = SRC.s3) {
  const b = bath(w);
  await adopt(w, b.vessel.id); await assign(w, b.P.vessel, b.vessel.id); await pressS1(w, b.req.id); await pressS2(w, b.req.id);
  const front = slotAt(w, b.L.vessel, 1), first = shotOf(w, front);
  w.set(SH, first, { Withdrawn: true });
  w.set(GS, b.vessel.slots[0], { View: `${fx.VIEWS.front} Centered.` });
  await adopt(w, b.vessel.id);
  const stale = { reach: slot(w, front, 'Replan reach'), live: slot(w, front, 'Live shot count'), status: slot(w, front, 'Status') };
  await pressS1(w, b.req.id);
  const s1note = fx.note(w, b.req.id);
  const r = await fx.press(w, s3src, fx.cfg('s3', front, { kind: 'slot' }));
  const replan = { ran: r.ok, result: result(w, PS, front), inPlan: slot(w, front, 'In adopted plan') };
  await pressS2(w, b.req.id);
  const second = shotOf(w, front);
  return { b, front, first, stale, s1note, replan, second, relinked: !!second && second !== first && sameIds(slot(w, front, 'Shot'), [second]) && shot(w, second, 'Planned') === 1, note: shotNote(w, b.req.id) };
}
add('GPT-B-withdrawn-stale', 'A slot linked only to a Withdrawn shot, made stale by an adopted guide change: its Status and S1 say "press Replan on this slot"; Replan on the slot refreshes it; S2 then plans it with a new shot and relinks it', async t => {
  const x = await withdrawnStale(new World());
  t.check('stale and in reach, with no shot that counts; the Status says "press Replan on this slot"', x.stale.reach === 1 && x.stale.live === 0 && x.stale.status === 'Not in the adopted plan: the guide changed it: press Replan on this slot', x.stale);
  t.check('S1\'s note gives the same step', x.s1note.includes('Bath Vessel · 1: changed by the adopted guide; press Replan on this slot.'), x.s1note);
  t.check('Replan on the slot refreshes it, back in the plan', x.replan.ran && x.replan.result.endsWith('Kept plan refreshed from Ceramic vessel, version 2.') && x.replan.inPlan === 1, x.replan);
  t.check('S2 made a new shot and relinked the slot to it alone; it plans', x.relinked, x.note);
});
add('CTRL-WITHDRAWN-S3', "Negative control: with S3 taking a slot's first linked shot as its shot, Withdrawn or not, GPT-B-withdrawn-stale's guard fails: Replan on the slot refuses (\"planned with its shot\") and the slot stays out of the plan", async t => {
  const m = mutate(t, SRC.s3, '.find(r => r && !r.getCellValue(SH.withdrawn));', '.find(r => r);', 'S3 counts a withdrawn shot');
  const guard = x => x.replan.inPlan === 1 && x.relinked;
  t.check('as written, the slot is refreshed and replanned', guard(await withdrawnStale(new World())));
  const x = await withdrawnStale(new World(), m);
  t.check('mutated: Replan ran, and the guard fails: it refuses and the slot stays out of the plan', x.replan.ran && !guard(x) && x.replan.inPlan === 0 && x.replan.result.endsWith('This slot is planned with its shot: press Replan on the shot.'), x.replan);
});

add('GPT-B-withdrawn', "GPT-B's other term: a Withdrawn shot doesn't count as a slot's shot, so S2 plans the slot with a new shot and relinks it; and a Pair key held by a shot that does count stops S2 and is reported", async t => {
  const b = bath(new World()), { w } = b;
  await adopt(w, b.vessel.id); await assign(w, b.P.vessel, b.vessel.id); await pressS1(w, b.req.id); await pressS2(w, b.req.id);
  const front = slotAt(w, b.L.vessel, 1), first = shotOf(w, front);
  w.set(SH, first, { Withdrawn: true }); // the wrong one withdrawn: the slot still links to it
  t.check('the slot\'s shot is Withdrawn and not Planned; the slot itself is still ok', shot(w, first, 'Planned') === 0 && slot(w, front, 'Slot ok') === 1);
  await pressS2(w, b.req.id);
  const second = shotOf(w, front);
  t.check('S2 made a new shot and relinked the slot to it alone', second && second !== first && sameIds(slot(w, front, 'Shot'), [second]) && shot(w, second, 'Planned') === 1 && !(shot(w, first, 'Slots filled') || []).length, shotNote(w, b.req.id));
  // The pair-key guard: a shot holding the Three-quarter slot's Pair key fills another active slot.
  const tq = slotAt(w, b.L.vessel, 2), glaze = slotAt(w, b.L.vessel, 3), tqShot = shotOf(w, tq);
  w.set(PS, tq, { Shot: null }); w.set(PS, glaze, { Shot: [tqShot] }); // a hand relink: Glaze detail now on the Three-quarter shot
  const before = w.ids(SH).length;
  await pressS2(w, b.req.id);
  t.check('a Pair key held by a shot that fills an active slot: no shot made for the slot, and the note says so', !shotOf(w, tq) && w.ids(SH).length === before
    && shotNote(w, b.req.id).includes('Bath Vessel · 2 Three-quarter: a shot with its pair key already fills an active slot (Bath Vessel · 2 Three-quarter); no shot was made: see the shot pair check.'), shotNote(w, b.req.id));
});

// ---- CX5 and Replan reach -------------------------------------------------------------------
add('T9/CX5', 'CX5 on a shot of one slot: a view edit is a draft (changed, still in plan, not Planned); adopted, the slot is stale and out of plan; Replan on the shot refreshes it and the shot plans; earlier candidates read changed', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  await pressS2(w, b.req.id);
  const front = slotAt(w, b.L.vessel, 1), sh = shotOf(w, front);
  const cand = fx.snapshotCandidate(w, sh, { image: false });
  t.check('planned, its candidate current', shot(w, sh, 'Planned') === 1 && w.get('Candidates', cand, 'Standard check').startsWith('Same'));
  const oldLine = slot(w, front, 'Kept definition line');
  w.set(GS, b.vessel.slots[0], { View: `${fx.VIEWS.front} Centered on the surface.` });
  t.check('draft: Shot-guide check changed, still in the adopted plan, shot not Planned', slot(w, front, 'Shot-guide check') === TEXT.guideChanged && slot(w, front, 'In adopted plan') === 1 && shot(w, sh, 'Planned') === 0, shot(w, sh, 'Plan check'));
  let r = await pressS3Shot(w, sh);
  t.check('Replan while it is a draft refuses the slot: the guide isn\'t Complete', r.ok && result(w, SH, sh).includes("- Bath Vessel · 1 Front: not replanned: its guide isn't Complete (Changed since adoption: adopt again): adopt it first.")
    && slot(w, front, 'Kept definition line') === oldLine, result(w, SH, sh));
  await adopt(w, b.vessel.id);
  t.check('adopted: out of the adopted plan, stale, inactive; the shot still isn\'t Planned', slot(w, front, 'In adopted plan') === 0 && slot(w, front, 'Stale by adoption') === 1 && slot(w, front, 'Active') === 0
    && shot(w, sh, 'Active slots filled') === 0 && shot(w, sh, 'Planned') === 0);
  t.check('its Status names the step: Replan on its shot', slot(w, front, 'Status') === 'Not in the adopted plan: the guide changed it: press Replan on its shot', slot(w, front, 'Status'));
  r = await pressS3Slot(w, front);
  t.check('slot-level Replan on a slot of an unaccepted shot points to the shot\'s Replan', result(w, PS, front).endsWith('This slot is planned with its shot: press Replan on the shot.') && slot(w, front, 'Kept definition line') === oldLine, result(w, PS, front));
  r = await pressS3Shot(w, sh);
  t.check('Replan on the shot: the slot is refreshed (new kept line, version 2, new view)', r.ok && slot(w, front, 'Kept definition line') === live(w, b.vessel.slots[0]) && slot(w, front, 'Kept guide version') === 2
    && slot(w, front, 'Kept view').endsWith('Centered on the surface.'), result(w, SH, sh));
  t.check('Shot-guide check Same, in the plan, active; the shot is Planned', slot(w, front, 'Shot-guide check') === TEXT.guideSame && slot(w, front, 'In adopted plan') === 1 && slot(w, front, 'Active') === 1 && shot(w, sh, 'Planned') === 1, shot(w, sh, 'Plan check'));
  t.check('the refresh isn\'t flagged as a hand edit', slot(w, front, 'Kept plan check') === '' && slot(w, front, 'Held') === 0);
  t.check('the earlier candidate keeps the old definition in its kept standard and reads changed', !w.get('Candidates', cand, 'Standard used').includes('Centered on the surface.') && w.get('Candidates', cand, 'Standard used').includes('version 1')
    && w.get('Candidates', cand, 'Standard check') === 'The standard has changed since this image was made');
  t.check('the result says what was done', result(w, SH, sh).includes('refreshed 1 of 1 slot.\n- Bath Vessel · 1 Front: refreshed from version 2.'), result(w, SH, sh));
});

add('T4c-s3', "T4c's S3 part: while an adopted guide's view edit is a draft, Replan refuses; once version 2 is adopted it proceeds", async t => {
  const b = await bathPlanned(new World()), { w } = b;
  await pressS2(w, b.req.id);
  const s = slotAt(w, b.L.vessel, 2), sh = shotOf(w, s);
  w.set(GS, b.vessel.slots[1], { View: `${fx.VIEWS.threeQuarter} From the left.` });
  await pressS3Shot(w, sh);
  t.check('refused while not Complete; nothing refreshed', result(w, SH, sh).includes('refreshed 0 of 1 slot.') && result(w, SH, sh).includes("its guide isn't Complete") && slot(w, s, 'Kept guide version') === 1, result(w, SH, sh));
  await adopt(w, b.vessel.id);
  await pressS3Shot(w, sh);
  t.check('adopted as version 2: Replan proceeds and the shot plans', slot(w, s, 'Kept guide version') === 2 && shot(w, sh, 'Planned') === 1, result(w, SH, sh));
});

add('T10', 'A Fill rule or Required change: Replan refuses, as a draft (guide not Complete) and once adopted (obligation changed: a new version of the request)', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  await pressS2(w, b.req.id);
  const hang = slotAt(w, b.L.towel, 2), sh = shotOf(w, hang), line0 = slot(w, hang, 'Kept definition line');
  w.set(GS, b.textile.slots[1], { 'Fill rule': PICK });
  await pressS3Shot(w, sh);
  t.check('Fill rule change as a draft: refused, guide not Complete', result(w, SH, sh).includes("not replanned: its guide isn't Complete") && slot(w, hang, 'Kept definition line') === line0, result(w, SH, sh));
  await adopt(w, b.textile.id);
  t.check('adopted: stale, but its obligation changed, so out of Replan reach', slot(w, hang, 'Stale by adoption') === 1 && slot(w, hang, 'Obligation unchanged') === 0 && slot(w, hang, 'Replan reach') === 0);
  await pressS3Shot(w, sh);
  t.check('Replan on the shot refuses it: plan it in a new version of the request', result(w, SH, sh).includes('- Bath Towel · 2 Hanging: not replanned: its obligation changed (Required or Fill rule): plan it in a new version of the request.')
    && result(w, SH, sh).endsWith('No slot of this shot is active now: it stays unplanned.') && slot(w, hang, 'Kept definition line') === line0 && slot(w, hang, 'Kept fill rule') === MAKE, result(w, SH, sh));
  const glaze = slotAt(w, b.L.vessel, 3), gsh = shotOf(w, glaze), gline = slot(w, glaze, 'Kept definition line');
  w.set(GS, b.vessel.slots[2], { Required: 'As needed' });
  await adopt(w, b.vessel.id);
  await pressS3Shot(w, gsh);
  t.check('a Required change, adopted: refused the same way', result(w, SH, gsh).includes('- Bath Vessel · 3 Glaze detail: not replanned: its obligation changed (Required or Fill rule): plan it in a new version of the request.')
    && slot(w, glaze, 'Kept definition line') === gline && slot(w, glaze, 'Kept required') === 'Always', result(w, SH, gsh));
  await pressS3Slot(w, glaze);
  t.check('slot-level Replan on it points to the shot\'s Replan, which refuses', result(w, PS, glaze).endsWith('This slot is planned with its shot: press Replan on the shot.'));
});

add('T11', 'Replan guards: refused on a written shot, an accepted product-page shot, a retired guide slot and a guide not Complete; a slot-level Replan on a slot of an accepted shot refreshes that slot only; a collection shot\'s kept guide plan refreshes until it is accepted', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  await pressS2(w, b.req.id);
  const towel1 = slotAt(w, b.L.towel, 1), sheet1 = slotAt(w, b.L.sheet, 1), folded = shotOf(w, towel1);
  const acc = acceptShot(w, folded);
  t.check('the shared Folded shot is accepted; both slots Settled', placement(w, towel1) === 'Settled' && placement(w, sheet1) === 'Settled');
  // a written shot, and a walkthrough shot
  const mk = fx.request(w, { name: 'Bath message', workflow: 'Marketing', products: [b.P.vessel] });
  const written = w.add(SH, { Name: 'Bath message', Brief: [mk.id], Placement: 'Email header', 'Shot direction': 'The vessel on a sill.' });
  const walk = fx.request(w, { name: 'Launch', workflow: 'Walkthrough', products: [b.P.vessel] });
  const walkShot = w.add(SH, { Name: 'Editorial hero', Brief: [walk.id], Placement: 'Website hero', 'Shot direction': 'A calm room.' });
  for (const [x, label] of [[written, 'written'], [walkShot, 'walkthrough']]) {
    const n0 = w.writes.length; await pressS3Shot(w, x);
    t.check(`a ${label} shot: refused, only the result written`, result(w, SH, x).endsWith("Not replanned: this shot's direction is written in it; Replan is for product-page and collection shots.") && w.writes.slice(n0).every(y => y.fields.join() === 'Replan result'), result(w, SH, x));
  }
  // a guide not Complete
  w.set(GS, b.textile.slots[0], { View: `${fx.VIEWS.folded} On linen.` });
  const hang = slotAt(w, b.L.towel, 2), hsh = shotOf(w, hang);
  await pressS3Shot(w, hsh);
  t.check('a guide not Complete: refused', result(w, SH, hsh).includes("- Bath Towel · 2 Hanging: not replanned: its guide isn't Complete (Changed since adoption: adopt again): adopt it first."), result(w, SH, hsh));
  await adopt(w, b.textile.id);
  t.check('adopted: both Folded slots are stale', slot(w, towel1, 'Stale by adoption') === 1 && slot(w, sheet1, 'Stale by adoption') === 1);
  const n0 = w.writes.length;
  await pressS3Shot(w, folded);
  t.check('an accepted product-page shot: refused, pointing to the slots\' own Replan; nothing else written', result(w, SH, folded).endsWith('Not replanned: this shot has an accepted image. Press Replan on each slot you need to replan.')
    && w.writes.slice(n0).every(y => y.fields.join() === 'Replan result'), result(w, SH, folded));
  const sheetLine = slot(w, sheet1, 'Kept definition line');
  await pressS3Slot(w, towel1);
  t.check('slot-level Replan on a slot of the accepted shot refreshes that slot only', slot(w, towel1, 'Kept definition line') === live(w, b.textile.slots[0]) && slot(w, towel1, 'In adopted plan') === 1
    && slot(w, sheet1, 'Kept definition line') === sheetLine && slot(w, sheet1, 'Stale by adoption') === 1 && shotOf(w, towel1) === folded, result(w, PS, towel1));
  t.check('its image now reads "Needs review: the slot was replanned"', w.get('Applications', acc.apps[0], 'Eligibility') === 'Needs review: the slot was replanned since this image was applied' && placement(w, towel1) === 'Needs review');
  // a retired guide slot
  const weave = shotOf(w, slotAt(w, b.L.towel, 3));
  w.set(GS, b.textile.slots[2], { Retired: true });
  await adopt(w, b.textile.id);
  await pressS3Shot(w, weave);
  t.check('a retired guide slot: each slot reported, none refreshed, the shot stays unplanned', result(w, SH, weave).includes('refreshed 0 of 2 slots.') && result(w, SH, weave).includes('- Bath Towel · 3 Weave detail: not replanned: its guide slot was retired; replanning never makes a retired slot usable.')
    && result(w, SH, weave).endsWith('No slot of this shot is active now: it stays unplanned.') && shot(w, weave, 'Planned') === 0, result(w, SH, weave));
  await pressS3Slot(w, slotAt(w, b.L.hand, 3));
  t.check('slot-level on a retired slot\'s unaccepted shot points to the shot', result(w, PS, slotAt(w, b.L.hand, 3)).endsWith('This slot is planned with its shot: press Replan on the shot.'));
  // a collection shot
  const { g, req } = await bathSet(b);
  await pressS2(w, req.id);
  const together = shotsOn(w, req.id).find(id => (shot(w, id, 'From guide slot') || [])[0] === g.slots[0]);
  w.set(GS, g.slots[0], { View: 'All the request\'s products together on one shelf, each recognizable.' });
  await adopt(w, g.id);
  t.check('collection: an adopted view change: Shot-guide check changed, not Planned', shot(w, together, 'Shot-guide check') === TEXT.guideChanged && shot(w, together, 'Planned') === 0);
  await pressS3Shot(w, together);
  t.check('collection without an accepted image: the kept guide plan is refreshed, version 2, and the shot plans', shot(w, together, 'Kept guide plan').includes(live(w, g.slots[0])) && shot(w, together, 'Kept guide plan').includes('version 2')
    && shot(w, together, 'Shot-guide check') === TEXT.guideSame && shot(w, together, 'Planned') === 1, result(w, SH, together));
  w.set(GS, g.slots[0], { Includes: 'Choose', 'Choose count': 2 });
  await adopt(w, g.id);
  const kept = shot(w, together, 'Kept guide plan');
  await pressS3Shot(w, together);
  t.check('collection: an Includes change is refused (a new version of the request)', result(w, SH, together).endsWith('Not replanned: its obligation changed (Includes or Choose count): plan it in a new version of the request.') && shot(w, together, 'Kept guide plan') === kept, result(w, SH, together));
  w.set(GS, g.slots[0], { Includes: 'All products in the request', 'Choose count': null, View: 'All the request\'s products together, each recognizable.' });
  await adopt(w, g.id); await pressS3Shot(w, together);
  acceptShot(w, together);
  w.set(GS, g.slots[0], { View: 'Changed again.' }); await adopt(w, g.id);
  const kept2 = shot(w, together, 'Kept guide plan');
  await pressS3Shot(w, together);
  t.check('collection with an accepted image: refused, its kept plan as accepted', result(w, SH, together).endsWith('Not replanned: this collection shot has an accepted image; its kept plan stays as it was accepted.') && shot(w, together, 'Kept guide plan') === kept2, result(w, SH, together));
});

add('T22-s3', "T22's S3 part (CX1): while a retirement is a draft, Replan refuses; adopted, Replan reports the retired slot and refreshes the other", async t => {
  const w = new World();
  const g = fx.guide(w, 'Two-slot guide', [{ name: 'Front', position: 1 }, { name: 'Back', position: 2 }], { test: true });
  const p = fx.product(w, { name: 'Test Jar', style: 'Jar', color: 'grey', size: 'one', facts: 'A grey jar.', test: true });
  const req = fx.request(w, { name: 'Test pages', products: [p], test: true });
  await adopt(w, g.id); await assign(w, p, g.id); await pressS1(w, req.id); await pressS2(w, req.id);
  const front = slotAt(w, req.lines[0], 1), back = slotAt(w, req.lines[0], 2);
  w.set(GS, g.slots[1], { Retired: true });
  await pressS3Shot(w, shotOf(w, back));
  t.check('a draft retirement: refused (not Complete)', result(w, SH, shotOf(w, back)).includes("its guide isn't Complete (Changed since adoption: adopt again)"), result(w, SH, shotOf(w, back)));
  await adopt(w, g.id);
  await pressS3Shot(w, shotOf(w, back));
  t.check('adopted: the retired slot is reported, never made usable', result(w, SH, shotOf(w, back)).includes('- Test Jar · 2 Back: not replanned: its guide slot was retired; replanning never makes a retired slot usable.') && slot(w, back, 'Active') === 0, result(w, SH, shotOf(w, back)));
  await pressS3Shot(w, shotOf(w, front));
  t.check('the other slot\'s shot replans (version 2) and plans', slot(w, front, 'Kept guide version') === 2 && shot(w, shotOf(w, front), 'Planned') === 1, result(w, SH, shotOf(w, front)));
  t.check('the shots are Test, from their request', shot(w, shotOf(w, front), 'Test') === true);
});

add('T23-replan', "T23's Replan step: a Position change adopted takes a Settled slot out of the plan; slot-level Replan on its accepted shot brings it back with its new Kept position, and its image reads \"Needs review: the slot was replanned\"", async t => {
  const b = await bathPlanned(new World()), { w } = b;
  await pressS2(w, b.req.id);
  const front = slotAt(w, b.L.vessel, 1), acc = acceptShot(w, shotOf(w, front));
  t.check('Settled', placement(w, front) === 'Settled');
  w.set(GS, b.vessel.slots[0], { Position: 6, 'Placement label': 'product page, image 6' });
  await adopt(w, b.vessel.id);
  t.check('adopted: out of the plan, Needs review, Status names this slot\'s Replan (its shot is accepted)', slot(w, front, 'In adopted plan') === 0 && placement(w, front) === 'Needs review'
    && slot(w, front, 'Status') === 'Not in the adopted plan: the guide changed it: press Replan on this slot', slot(w, front, 'Status'));
  await pressS3Slot(w, front);
  t.check('replanned: back in the plan with its new Kept position', slot(w, front, 'In adopted plan') === 1 && slot(w, front, 'Kept position') === 6 && slot(w, front, 'Kept placement label') === 'product page, image 6', result(w, PS, front));
  t.check('its application reads "Needs review: the slot was replanned" until a Replace decision confirms it', w.get('Applications', acc.apps[0], 'State') === 'Needs review: the slot was replanned since this image was applied'
    && slot(w, front, 'Status') === 'Needs review: the slot was replanned since this image was applied', slot(w, front, 'Status'));
});

// T39's main run, shared with its negative control (CTRL-CX5), which runs it on a mutated S3.
async function t39main(w, s3src = SRC.s3) {
  const b = await bathPlanned(w);
  await pressS2(w, b.req.id);
  const towel1 = slotAt(w, b.L.towel, 1), sheet1 = slotAt(w, b.L.sheet, 1), sh = shotOf(w, towel1);
  const cand = fx.snapshotCandidate(w, sh, { image: true });
  w.set(GS, b.textile.slots[0], { View: `${fx.VIEWS.folded} On linen.` });
  await adopt(w, b.textile.id);
  const stale = [towel1, sheet1].every(s => slot(w, s, 'In adopted plan') === 0 && slot(w, s, 'Stale by adoption') === 1) && shot(w, sh, 'Active slots filled') === 0 && shot(w, sh, 'Planned') === 0;
  const r = await fx.press(w, s3src, fx.cfg('s3', sh, { kind: 'shot' }));
  const newLine = live(w, b.textile.slots[0]);
  const after = {
    ran: r.ok, refreshed: [towel1, sheet1].every(s => slot(w, s, 'Kept definition line') === newLine && slot(w, s, 'Kept guide version') === 2),
    active: [towel1, sheet1].every(s => slot(w, s, 'Active') === 1), planned: shot(w, sh, 'Planned') === 1,
    linesUnchanged: sameIds(shot(w, sh, 'Lines in shot'), [b.L.towel]), changed: w.get('Candidates', cand, 'Standard check') === 'The standard has changed since this image was made',
  };
  return { b, stale, after, sh, result: result(w, SH, sh) };
}
// A fresh catalog with S2 pressed and the Folded view edited (not yet adopted), for T39's variants.
async function foldedEdited(w) {
  const b = await bathPlanned(w);
  await pressS2(w, b.req.id);
  const towel1 = slotAt(w, b.L.towel, 1), sheet1 = slotAt(w, b.L.sheet, 1);
  w.set(GS, b.textile.slots[0], { View: `${fx.VIEWS.folded} On linen.` });
  return { b, towel1, sheet1, sh: shotOf(w, towel1) };
}
add('T39/CX5', 'CX5: every slot on an unaccepted shared shot made stale by one adopted change; Replan on the shot restores both; with one slot waived, its waiver stays and Lines in shot repoints; at the boundaries each slot is reported, and S1 makes nothing for its key; the next step shown', async t => {
  { // the main run
    const x = await t39main(new World());
    t.check('adopted: both slots out of the plan and stale; Active slots filled 0; the shot isn\'t Planned', x.stale);
    t.check('Replan on the shot: both refreshed, with the new kept line and version', x.after.ran && x.after.refreshed, x.result);
    t.check('both active; the shot Planned again; Lines in shot unchanged', x.after.active && x.after.planned && x.after.linesUnchanged, x.after);
    t.check('its earlier candidate reads changed', x.after.changed);
    t.check('the result reports both', x.result.includes('refreshed 2 of 2 slots.\n- Bath Towel · 1 Folded: refreshed from version 2.\n- Bath Sheet · 1 Folded: refreshed from version 2.'), x.result);
  }
  { // with one slot waived beforehand: the one whose line is the shot's
    const w = new World(), { b, towel1, sheet1, sh } = await foldedEdited(w);
    await recordSlot(w, towel1, { 'Not needed': true, 'Not needed reason': 'test: only the sheet' });
    const oldLine = slot(w, towel1, 'Kept definition line');
    await adopt(w, b.textile.id);
    await pressS3Shot(w, sh);
    t.check('[waived] the waived slot keeps its waiver and its old kept line', slot(w, towel1, 'Waived') === 1 && slot(w, towel1, 'Kept definition line') === oldLine && result(w, SH, sh).includes('- Bath Towel · 1 Folded: marked not needed; left as it is, with its waiver and kept plan.'), result(w, SH, sh));
    t.check('[waived] the other is refreshed, Lines in shot repointed to its line, and the shot plans', slot(w, sheet1, 'Kept definition line') === live(w, b.textile.slots[0]) && sameIds(shot(w, sh, 'Lines in shot'), [b.L.sheet])
      && result(w, SH, sh).endsWith(`Lines in shot repointed to ${w.get('Product lines', b.L.sheet, 'Name')}.`) && shot(w, sh, 'Planned') === 1, shot(w, sh, 'Plan check'));
  }
  const boundary = async (label, act, why, s1check) => {
    const w = new World(), x = await foldedEdited(w);
    await act(w, x);
    const keys = [x.towel1, x.sheet1].map(s => slot(w, s, 'Slot key'));
    await pressS3Shot(w, x.sh);
    return { w, x, keys, res: result(w, SH, x.sh), why };
  };
  { // a product reassigned (recorded)
    const { w, x, keys, res } = await boundary('reassigned', async (w, { b }) => { await adopt(w, b.textile.id); await assign(w, b.P.sheet, b.vessel.id, 'test: reassigned'); });
    t.check('[reassigned] the sheet\'s slot reported, not refreshed; the towel\'s refreshed', res.includes('- Bath Sheet · 1 Folded: not replanned: its product was reassigned to another guide.') && res.includes('- Bath Towel · 1 Folded: refreshed from version 2.')
      && slot(w, x.sheet1, 'Kept guide version') === 1, res);
    await pressS1(w, x.b.req.id);
    t.check('[reassigned] S1 makes nothing for its key', w.find(PS, r => r.get('Slot key') === keys[1]).length === 1);
  }
  { // the guide slot retired
    const { w, x, keys, res } = await boundary('retired', async (w, { b }) => { w.set(GS, b.textile.slots[0], { Retired: true }); await adopt(w, b.textile.id); });
    t.check('[retired] both reported as retired; none refreshed; the shot stays unplanned', res.includes('refreshed 0 of 2 slots.') && res.includes('- Bath Towel · 1 Folded: not replanned: its guide slot was retired') && res.endsWith('No slot of this shot is active now: it stays unplanned.'), res);
    await pressS1(w, x.b.req.id);
    t.check('[retired] S1 makes nothing for either key, and gives no Replan step', keys.every(k => w.find(PS, r => r.get('Slot key') === k).length === 1) && !fx.note(w, x.b.req.id).includes('Bath Towel · 1:')
      && slot(w, x.towel1, 'Status') === 'Not in the adopted plan: the guide retired this image', slot(w, x.towel1, 'Status'));
  }
  { // the guide slot moved to another guide
    const { w, x, keys, res } = await boundary('moved', async (w, { b }) => {
      const linen = fx.guide(w, 'Bath linen', [{ name: 'Draped', position: 5 }]); await adopt(w, linen.id);
      w.set(GS, b.textile.slots[0], { Guide: [linen.id] }); await adopt(w, b.textile.id); await adopt(w, linen.id);
    });
    t.check('[moved] both reported as moved; none refreshed', res.includes('- Bath Towel · 1 Folded: not replanned: its guide slot was moved to another guide.') && res.includes('- Bath Sheet · 1 Folded: not replanned: its guide slot was moved to another guide.'), res);
    await pressS1(w, x.b.req.id);
    t.check('[moved] S1 makes nothing for either key', keys.every(k => w.find(PS, r => r.get('Slot key') === k).length === 1) && slotsOn(w, x.b.L.towel).length === 4);
  }
  { // the request superseded
    const { w, x, res } = await boundary('superseded', async (w, { b }) => { await adopt(w, b.textile.id); fx.request(w, { name: 'Bath product pages v2', products: [b.P.towel], supersedes: [b.req.id] }); });
    t.check('[superseded] both reported; none refreshed', res.includes('- Bath Towel · 1 Folded: not replanned: its request is superseded.') && res.includes('refreshed 0 of 2 slots.'), res);
    const n = count(w, PS); await pressS1(w, x.b.req.id);
    t.check('[superseded] S1 makes nothing on the superseded request', count(w, PS) === n && /Nothing was made: this request is superseded/.test(fx.note(w, x.b.req.id)));
  }
  { // the Fill rule changed
    const { w, x, keys, res } = await boundary('fill rule', async (w, { b }) => { w.set(GS, b.textile.slots[0], { 'Fill rule': MAKE }); await adopt(w, b.textile.id); });
    t.check('[fill rule] both reported: plan it in a new version of the request', res.includes('- Bath Towel · 1 Folded: not replanned: its obligation changed (Required or Fill rule): plan it in a new version of the request.'), res);
    await pressS1(w, x.b.req.id);
    t.check('[fill rule] S1 makes nothing for the key; its note and the slot\'s Status say "plan it in a new version of the request"', w.find(PS, r => r.get('Slot key') === keys[0]).length === 1
      && fx.note(w, x.b.req.id).includes('Bath Towel · 1: changed by the adopted guide; plan it in a new version of the request.')
      && slot(w, x.towel1, 'Status') === 'Not in the adopted plan: the guide changed it: plan it in a new version of the request', fx.note(w, x.b.req.id));
  }
  { // the next step for a stale slot with no shot, and for one on an accepted shot
    const w = new World(), b = await bathPlanned(w);
    await pressS2(w, b.req.id);
    const hand4 = slotAt(w, b.L.hand, 4), towel3 = slotAt(w, b.L.towel, 3), sheet3 = slotAt(w, b.L.sheet, 3);
    acceptShot(w, shotOf(w, towel3));
    w.set(GS, b.textile.slots[3], { View: `${fx.VIEWS.setting} Daylight.` }); w.set(GS, b.textile.slots[2], { View: `${fx.VIEWS.weave} Daylight.` });
    await adopt(w, b.textile.id);
    t.check('[next step] no shot, and an accepted shot: "press Replan on this slot"', slot(w, hand4, 'Status') === 'Not in the adopted plan: the guide changed it: press Replan on this slot'
      && slot(w, towel3, 'Status') === 'Not in the adopted plan: the guide changed it: press Replan on this slot', [slot(w, hand4, 'Status'), slot(w, towel3, 'Status')]);
    await pressS3Slot(w, hand4); await pressS3Slot(w, towel3);
    t.check('[next step] the slot\'s Replan refreshes each; the accepted shot\'s other slot stays as it was', slot(w, hand4, 'In adopted plan') === 1 && slot(w, hand4, 'Kept guide version') === 2 && slot(w, towel3, 'In adopted plan') === 1
      && slot(w, sheet3, 'Kept guide version') === 1 && result(w, PS, hand4).endsWith('Kept plan refreshed from Bath textile, version 2.'), [result(w, PS, hand4), result(w, PS, towel3)]);
    t.check('[next step] the picked-up slot is ready for a use decision again', slot(w, hand4, 'Pickup ok') === 1 && slot(w, hand4, 'Status') === 'Needs an image: a use decision for an accepted image that shows this product', slot(w, hand4, 'Status'));
  }
});

add('CTRL-CX5', 'Negative control: with Replan limited to Active (S3 reads Active where it reads Replan reach), T39\'s guard fails as CX5 did: the stale slots aren\'t refreshed and the shot can\'t plan again', async t => {
  const m = mutate(t, SRC.s3, 'const inReach = num(s.getCellValue(S.reach)) === 1;', 'const inReach = num(s.getCellValue(S.active)) === 1;', 'S3 reach read from Active');
  const asWritten = await t39main(new World()), mutated = await t39main(new World(), m);
  t.check('as written, the guard holds', asWritten.after.refreshed && asWritten.after.planned);
  t.check('mutated: S3 ran to the end, and the guard "both refreshed" fails, and the shot stays unplanned', mutated.after.ran === true && !mutated.after.refreshed && !mutated.after.planned, mutated.after);
});

// ---- detaching, repointing, rejoining --------------------------------------------------------
add('T30b', 'The shot\'s input slot waived or detached: on a shared shot without an acceptance the shot isn\'t Planned; Replan on the shot repoints Lines in shot to the remaining slot\'s line; it plans again and its earlier candidates read changed', async t => {
  for (const how of ['waived', 'detached']) {
    const b = await bathPlanned(new World()), { w } = b;
    await pressS2(w, b.req.id);
    const towel1 = slotAt(w, b.L.towel, 1), sheet1 = slotAt(w, b.L.sheet, 1), sh = shotOf(w, towel1);
    const cand = fx.snapshotCandidate(w, sh, { image: true });
    if (how === 'waived') await recordSlot(w, towel1, { 'Not needed': true, 'Not needed reason': 'test: only the sheet' });
    else {
      await recordSlot(w, towel1, { Fulfillment: 'Make', 'Fulfillment reason': 'test: its own image' });
      await pressS3Slot(w, towel1);
      t.check('[detached] slot-level Replan detaches it, with its Detach log', !shotOf(w, towel1) && /^Detached from Terry towel, white · 1 Folded on .*, Fulfillment now Make$/.test(slot(w, towel1, 'Detach log')), slot(w, towel1, 'Detach log'));
    }
    t.check(`[${how}] the shot isn't Planned: its line is no longer an active slot's`, shot(w, sh, 'Planned') === 0 && shot(w, sh, 'Plan check') === 'Not planned: Lines in shot must be the line of one of its active slots', shot(w, sh, 'Plan check'));
    await pressS3Shot(w, sh);
    t.check(`[${how}] Replan on the shot repoints Lines in shot to the remaining slot's line; it plans again`, sameIds(shot(w, sh, 'Lines in shot'), [b.L.sheet]) && shot(w, sh, 'Planned') === 1 && slot(w, sheet1, 'Active') === 1, [result(w, SH, sh), shot(w, sh, 'Plan check')]);
    t.check(`[${how}] its earlier candidate reads changed`, w.get('Candidates', cand, 'Standard check') === 'The standard has changed since this image was made');
    if (how === 'detached') {
      await pressS2(w, b.req.id);
      const own = shotOf(w, towel1);
      t.check('[detached] S2 then makes the slot its own Make shot', own && own !== sh && shot(w, own, 'Made as') === 'Make' && shot(w, own, 'Name') === 'Bath Towel · 1 Folded' && shot(w, own, 'Planned') === 1, shotNote(w, b.req.id));
    }
  }
});

add('T42', 'A slot rejoining an accepted shot: reopened after the shot was accepted without it, its Status says so; Replan on the slot detaches it with its Detach log; the other slot stays Settled; S2 offers a use decision or a new shot; a recorded Make departure detaches too; a covered slot is never detached', async t => {
  for (const variant of ['reopened', 'make departure']) {
    const b = await bathPlanned(new World()), { w } = b;
    await pressS2(w, b.req.id);
    const towel1 = slotAt(w, b.L.towel, 1), sheet1 = slotAt(w, b.L.sheet, 1), sh = shotOf(w, towel1);
    await recordSlot(w, sheet1, { 'Not needed': true, 'Not needed reason': 'test: waived before acceptance' });
    const acc = acceptShot(w, sh);
    t.check(`[${variant}] the acceptance's Slots kept lists only the other slot`, w.get('Candidates', acc.candidate, 'Slots kept').split('\n').length === 1 && w.get('Candidates', acc.candidate, 'Slots kept').startsWith(towel1) && placement(w, towel1) === 'Settled');
    if (variant === 'reopened') {
      await recordSlot(w, sheet1, { 'Not needed': false, 'Not needed reason': null });
      t.check('[reopened] its Status: "Its shot was accepted without it: …"', slot(w, sheet1, 'Status') === TEXT.acceptedWithout && slot(w, sheet1, 'Covered') === 0, slot(w, sheet1, 'Status'));
    } else {
      await recordSlot(w, sheet1, { 'Not needed': false, 'Not needed reason': null, Fulfillment: 'Make', 'Fulfillment reason': 'test: its own image' });
      t.check('[make departure] its Status: fulfillment changed after its shot was made', slot(w, sheet1, 'Status').startsWith('Fulfillment changed after its shot was made'), slot(w, sheet1, 'Status'));
    }
    await pressS3Slot(w, sheet1);
    t.check(`[${variant}] Replan on the slot detaches it, with its Detach log`, !shotOf(w, sheet1) && new RegExp(`^Detached from Terry towel, white · 1 Folded on .*, Fulfillment now ${variant === 'reopened' ? 'Share; its shot was accepted without it' : 'Make'}$`).test(slot(w, sheet1, 'Detach log')), [slot(w, sheet1, 'Detach log'), result(w, PS, sheet1)]);
    t.check(`[${variant}] the other slot's image stays Settled; the shot keeps its acceptance`, placement(w, towel1) === 'Settled' && sameIds(shot(w, sh, 'Slots filled'), [towel1]) && shot(w, sh, 'Planned') === 1);
    await pressS2(w, b.req.id);
    if (variant === 'reopened') {
      const n = shotNote(w, b.req.id);
      t.check('[reopened] S2 doesn\'t join the accepted shot; its note offers a use decision or a new shot', !shotOf(w, sheet1) && n.includes('Bath Sheet · 1 Folded: its group\'s shot, Terry towel, white · 1 Folded, has an accepted image, so it wasn\'t joined')
        && n.includes('apply a use decision') && n.includes('record a departure to Make'), n);
    } else {
      const own = shotOf(w, sheet1);
      t.check('[make departure] S2 makes its own Make shot', own && own !== sh && shot(w, own, 'Made as') === 'Make' && shot(w, own, 'Planned') === 1, shotNote(w, b.req.id));
    }
    // A slot an acceptance covers is never detached (§7.5), and GPT-A's route is named.
    await recordSlot(w, towel1, { Fulfillment: 'Make', 'Fulfillment reason': 'test: its own image' });
    let n0 = w.writes.length; await pressS3Slot(w, towel1);
    t.check(`[${variant}] a covered slot with a recorded Make departure: refused, "Set Fulfillment back and record it"; not detached`, shotOf(w, towel1) === sh && result(w, PS, towel1).endsWith(TEXT.coveredRefusal)
      && w.writes.slice(n0).every(x => x.fields.join() === 'Replan result'), result(w, PS, towel1));
    await recordSlot(w, towel1, { Fulfillment: 'An accepted image', 'Fulfillment reason': 'test: the collection image instead' });
    n0 = w.writes.length; await pressS3Slot(w, towel1);
    t.check(`[${variant}] GPT-A: with "An accepted image" recorded, the refusal points to a use decision with Replace, not to setting it back`, shotOf(w, towel1) === sh && result(w, PS, towel1).endsWith(TEXT.coveredPickup)
      && slot(w, towel1, 'Status') === TEXT.coveredPickup, result(w, PS, towel1));
    w.set(PS, towel1, { Fulfillment: 'Make' });
    await pressS3Slot(w, towel1);
    t.check(`[${variant}] with a further draft: "Record the decision for this change first."`, result(w, PS, towel1).endsWith('Record the decision for this change first.') && shotOf(w, towel1) === sh);
  }
});

add('T30-local', "T30's S3 logic (its row is Copy): a Share → Make change not yet recorded leaves the slot planned with its shot; recorded, Replan detaches it and S2 makes its own shot; a further draft before Replan is refused", async t => {
  const b = await bathPlanned(new World()), { w } = b;
  await pressS2(w, b.req.id);
  const sheet1 = slotAt(w, b.L.sheet, 1), sh = shotOf(w, sheet1);
  w.set(PS, sheet1, { Fulfillment: 'Make', 'Fulfillment reason': 'test: its own image', ...decision() });
  t.check('not recorded: a change waits; the shot isn\'t Planned', slot(w, sheet1, 'Status').startsWith(TEXT.changePending) && shot(w, sh, 'Planned') === 0);
  await pressS3Slot(w, sheet1);
  t.check('slot-level Replan answers "planned with its shot", detaching nothing', result(w, PS, sheet1).endsWith('This slot is planned with its shot: press Replan on the shot.') && shotOf(w, sheet1) === sh);
  await fx.pressS7Slot(w, sheet1);
  t.check('recorded: "Fulfillment changed after its shot was made"', slot(w, sheet1, 'Status').startsWith('Fulfillment changed after its shot was made'), slot(w, sheet1, 'Status'));
  w.set(PS, sheet1, { Fulfillment: 'Share' });
  await pressS3Slot(w, sheet1);
  t.check('a further draft before Replan: "Record the decision for this change first"', result(w, PS, sheet1).endsWith('Record the decision for this change first.') && shotOf(w, sheet1) === sh);
  w.set(PS, sheet1, { Fulfillment: 'Make' });
  await pressS3Slot(w, sheet1);
  t.check('undone, then Replan: detached; the shot and its other slot are unchanged', !shotOf(w, sheet1) && sameIds(shot(w, sh, 'Slots filled'), [slotAt(w, b.L.towel, 1)]) && shot(w, sh, 'Planned') === 1);
  await pressS2(w, b.req.id);
  t.check('S2 makes its own shot', shotOf(w, sheet1) && shot(w, shotOf(w, sheet1), 'Made as') === 'Make');
});

// ---- sharing ---------------------------------------------------------------------------------
function twoTowels(w, { factsA = 'A white towel with a plain edge band.', factsB = 'A white towel with a fringed edge.' } = {}) {
  const g = fx.guide(w, 'Test textile', [{ name: 'Folded', position: 1, fill: SHARE }, { name: 'Hanging', position: 2 }], { test: true });
  const A = fx.product(w, { name: 'Test Towel Bath', style: 'Test terry', color: 'white', size: 'bath', facts: factsA, test: true });
  const B = fx.product(w, { name: 'Test Towel Sheet', style: 'Test terry', color: 'white', size: 'sheet', facts: factsB, test: true });
  const req = fx.request(w, { name: 'Test pages', products: [A, B], test: true });
  return { g, A, B, req };
}
add('T31/CX3', 'CX3: two products with one share key and contradictory facts: S2 makes no shared shot and names the difference; departures to Make (recorded) give each its own shot; facts corrected to agree give one shared shot', async t => {
  for (const fix of ['departures', 'facts corrected']) {
    const w = new World(), { g, A, B, req } = twoTowels(w);
    await adopt(w, g.id); await assign(w, A, g.id); await assign(w, B, g.id); await pressS1(w, req.id);
    const a1 = slotAt(w, req.lines[0], 1), b1 = slotAt(w, req.lines[1], 1);
    await pressS2(w, req.id);
    const n = shotNote(w, req.id);
    t.check(`[${fix}] no shared shot; the Make slots got theirs`, !shotOf(w, a1) && !shotOf(w, b1) && shotsOn(w, req.id).length === 2);
    t.check(`[${fix}] the note names the products and their differing facts`, n.includes('Test Towel Bath and Test Towel Sheet are both Test terry / white, but their facts differ: "Must stay true: A white towel with a plain edge band. Material: . Finish: ." / "Must stay true: A white towel with a fringed edge. Material: . Finish: .". Nothing was shared. If they are one style in two sizes, correct the facts and press again; if not, record a departure to Make for each.'), n);
    t.check(`[${fix}] each slot's Status points to the note`, slot(w, a1, 'Status') === "Not shared: the products' facts differ (see the Shot planning note)" && slot(w, b1, 'Status') === slot(w, a1, 'Status'), slot(w, a1, 'Status'));
    if (fix === 'departures') {
      for (const s of [a1, b1]) await recordSlot(w, s, { Fulfillment: 'Make', 'Fulfillment reason': 'test: the edges differ' });
      await pressS2(w, req.id);
      t.check('[departures] each gets its own Make shot, Planned', shotOf(w, a1) && shotOf(w, b1) && shotOf(w, a1) !== shotOf(w, b1) && [a1, b1].every(s => shot(w, shotOf(w, s), 'Made as') === 'Make' && shot(w, shotOf(w, s), 'Planned') === 1)
        && shot(w, shotOf(w, a1), 'Name') === 'Test Towel Bath · 1 Folded', shotNote(w, req.id));
    } else {
      w.set('Products', B, { 'Must stay true': 'A white towel with a plain edge band.' });
      await pressS2(w, req.id);
      const sh = shotOf(w, a1);
      t.check('[facts corrected] one shared shot for both, Planned, same facts', sh && sh === shotOf(w, b1) && shot(w, sh, 'Name') === 'Test terry, white · 1 Folded' && shot(w, sh, 'Made as') === 'Share'
        && shot(w, sh, 'Sharing check') === TEXT.sharedSame && shot(w, sh, 'Planned') === 1, shotNote(w, req.id));
    }
    t.check(`[${fix}] the pair checks are exact`, !pairCheck(w).length && !fillsNoSlot(w).length);
  }
  { // a group that already has a shot: a slot whose facts differ isn't joined
    const b = await bathPlanned(new World()), { w } = b;
    await pressS2(w, b.req.id);
    const folded = shotOf(w, slotAt(w, b.L.towel, 1)), filled = shot(w, folded, 'Slots filled');
    const mat = fx.product(w, { name: 'Bath Towel, fringed', style: 'Terry towel', color: 'white', size: 'bath', facts: 'A white terry towel with a fringed edge.' });
    await assign(w, mat, b.textile.id);
    const matLine = fx.line(w, b.req.id, mat);
    await pressS1(w, b.req.id); await pressS2(w, b.req.id);
    const m1 = slotAt(w, matLine, 1), n = shotNote(w, b.req.id);
    t.check('[existing shot] the slot whose facts differ from the group shot\'s isn\'t joined; the shot keeps its slots', !shotOf(w, m1) && sameIds(shot(w, folded, 'Slots filled'), filled) && shot(w, folded, 'Planned') === 1
      && n.includes('Bath Towel, fringed · 1 Folded: not joined to Terry towel, white · 1 Folded: its facts differ from the shot\'s'), n);
  }
});

add('T33', 'Same facts, different declared sharing: one slot departs to Make (recorded); the other forms a Share group of one, without the size sentence, and the departed slot gets its own shot', async t => {
  const w = new World(), terry = 'A white terry towel with a plain woven edge band.';
  const { g, A, B, req } = twoTowels(w, { factsA: terry, factsB: terry });
  await adopt(w, g.id); await assign(w, A, g.id); await assign(w, B, g.id); await pressS1(w, req.id);
  const a1 = slotAt(w, req.lines[0], 1), b1 = slotAt(w, req.lines[1], 1);
  t.check('one share signature', slot(w, a1, 'Share signature')[0] === slot(w, b1, 'Share signature')[0]);
  await recordSlot(w, b1, { Fulfillment: 'Make', 'Fulfillment reason': 'test: shown at its own size' });
  await pressS2(w, req.id);
  const sa = shotOf(w, a1), sb = shotOf(w, b1);
  t.check('the other forms a Share group of one: Made as Share, filling it alone, Planned', sa && shot(w, sa, 'Made as') === 'Share' && shot(w, sa, 'Name') === 'Test terry, white · 1 Folded' && sameIds(shot(w, sa, 'Slots filled'), [a1]) && shot(w, sa, 'Planned') === 1, shot(w, sa, 'Plan check'));
  t.check('without the size sentence', !shot(w, sa, 'Effective direction').includes('more than one size') && shot(w, sa, 'Effective placement') === 'Test Towel Bath product page, image 1', shot(w, sa, 'Effective direction'));
  t.check('the departed slot gets its own Make shot', sb && sb !== sa && shot(w, sb, 'Made as') === 'Make' && shot(w, sb, 'Name') === 'Test Towel Sheet · 1 Folded' && shot(w, sb, 'Planned') === 1);
});

// ---- GPT-B: obsolete shots don't suppress planning (T24 and T35) ----------------------------
// T24: a guide slot moved to another guide, then a recorded reassignment. `which` is the textile
// guide slot moved: 2 Hanging (Make) or 1 Folded (Share).
async function moveScenario(w, which, s2src = SRC.s2) {
  const b = await bathPlanned(w);
  await pressS2(w, b.req.id);
  const moved = b.textile.slots[which - 1], oldSlot = slotAt(w, b.L.towel, which), oldShot = shotOf(w, oldSlot);
  const linen = fx.guide(w, 'Bath linen', [{ name: 'Draped', position: 5, view: 'Draped over a rail. The product alone.' }]);
  await adopt(w, linen.id);
  w.set(GS, moved, { Guide: [linen.id] });
  const draft = { complete: [w.get(SG, b.textile.id, 'Complete'), w.get(SG, linen.id, 'Complete')].join(), inPlan: slot(w, oldSlot, 'In adopted plan') };
  await pressS3Shot(w, oldShot); draft.replan = result(w, SH, oldShot);
  await adopt(w, b.textile.id); await adopt(w, linen.id);
  await pressS3Shot(w, oldShot);
  const adopted = { inPlan: slot(w, oldSlot, 'In adopted plan'), replan: result(w, SH, oldShot), keptVersion: slot(w, oldSlot, 'Kept guide version') };
  await assign(w, b.P.towel, linen.id, 'test: reassigned to Bath linen');
  await pressS1(w, b.req.id);
  const forMoved = slotsOn(w, b.L.towel).filter(s => (slot(w, s, 'Guide slot') || [])[0] === moved);
  const newSlot = forMoved.find(s => slot(w, s, 'Kept guide ID') === linen.id);
  const r = await fx.press(w, s2src, fx.cfg('s2', b.req.id));
  const newShot = newSlot && shotOf(w, newSlot);
  const after = {
    ran: r.ok, forMoved: forMoved.length, newActive: !!newSlot && slot(w, newSlot, 'Active') === 1, newShot: !!newShot && newShot !== oldShot,
    samePairKey: !!newShot && shot(w, newShot, 'Pair key') === shot(w, oldShot, 'Pair key'), planned: !!newShot && shot(w, newShot, 'Planned') === 1,
    madeAs: newShot && shot(w, newShot, 'Made as'), dup: pairCheck(w), oldFillsActive: shot(w, oldShot, 'Active slots filled'),
    draped: slotsOn(w, b.L.towel).some(s => slot(w, s, 'Kept slot name') === 'Draped' && shotOf(w, s) && slot(w, s, 'Active') === 1), note: shotNote(w, b.req.id),
  };
  await assign(w, b.P.towel, b.textile.id, 'test: assigned back');
  const remaining = [1, 2, 3, 4].filter(p => p !== which).map(p => slotAt(w, b.L.towel, p, { guideSlot: b.textile.slots[p - 1] }));
  const before = w.ids(SH).length;
  await fx.press(w, s2src, fx.cfg('s2', b.req.id));
  const back = { remaining: remaining.every(s => slot(w, s, 'In adopted plan') === 1), oldOut: slot(w, oldSlot, 'In adopted plan') === 0, newOut: !newSlot || slot(w, newSlot, 'In adopted plan') === 0,
    nothingNew: w.ids(SH).length === before, dup: pairCheck(w) };
  return { b, draft, adopted, after, back };
}
for (const [which, kindName] of [[2, 'make'], [1, 'share']]) add(`T24/GPT-B-${kindName}`, `T24's script parts with the ${kindName === 'make' ? 'Make (Hanging)' : 'Share (Folded)'} guide slot moved: while a draft the slot stays in plan and Replan refuses; adopted, Replan refuses the moved slot; after a recorded reassignment S1 makes one new slot, and S2 plans it although an obsolete shot holds its Pair key (GPT-B); the pair check is clear; assigned back, the first guide's slots return`, async t => {
  const x = await moveScenario(new World(), which);
  t.check('before the move is adopted: both guides not Complete; the slot stays in the adopted plan; Replan refuses (guide not Complete)', x.draft.complete === '0,0' && x.draft.inPlan === 1 && x.draft.replan.includes("its guide isn't Complete"), x.draft);
  t.check('adopted: the moved slot is out of the plan, and Replan refuses it as moved', x.adopted.inPlan === 0 && x.adopted.replan.includes('its guide slot was moved to another guide') && x.adopted.keptVersion === 1, x.adopted);
  t.check('after the reassignment: S1 made exactly one new slot for the moved guide slot, active', x.after.forMoved === 2 && x.after.newActive, x.after);
  t.check(`GPT-B-${kindName}: S2 planned the new slot with a new ${kindName === 'make' ? 'Make' : 'Share'} shot, though the obsolete shot holds the same Pair key`, x.after.ran && x.after.newShot && x.after.samePairKey && x.after.planned && x.after.madeAs === (kindName === 'make' ? 'Make' : 'Share'), x.after);
  t.check('the obsolete shot fills no active slot, so the shot pair check shows no duplicate', x.after.oldFillsActive === 0 && !x.after.dup.length, x.after.dup);
  t.check('the new guide\'s other slot (Draped) has its shot', x.after.draped);
  t.check('assigned back: the first guide\'s remaining slots return; the old moved-slot record stays out; the new one leaves; S2 makes nothing; no duplicate', x.back.remaining && x.back.oldOut && x.back.newOut && x.back.nothingNew && !x.back.dup.length, x.back);
});

// T35: a line's product changed. The sheet line's product becomes Bath Sheet XL (same style,
// color and facts); the hand line's product becomes a relabelled hand towel (same signature).
async function lineScenario(w, s2src = SRC.s2) {
  const b = await bathPlanned(w);
  await pressS2(w, b.req.id);
  const old = { sheet: slotsOn(w, b.L.sheet), hand: slotsOn(w, b.L.hand) };
  const shots = { sheetHanging: shotOf(w, slotAt(w, b.L.sheet, 2)), folded: shotOf(w, slotAt(w, b.L.towel, 1)), handFolded: shotOf(w, slotAt(w, b.L.hand, 1)), handHanging: shotOf(w, slotAt(w, b.L.hand, 2)) };
  const xl = fx.product(w, { name: 'Bath Sheet XL', style: 'Terry towel', color: 'white', size: 'sheet XL', facts: fx.TERRY });
  const hand2 = fx.product(w, { name: 'Hand Towel, relabelled', style: 'Waffle towel', color: 'oat', size: 'hand', facts: w.get('Products', b.P.hand, 'Must stay true') });
  await assign(w, xl, b.textile.id); await assign(w, hand2, b.textile.id);
  w.set('Product lines', b.L.sheet, { Product: [xl] }); w.set('Product lines', b.L.hand, { Product: [hand2] });
  await pressS1(w, b.req.id);
  const fresh = l => slotsOn(w, b.L[l]).filter(s => !old[l].includes(s));
  const at = (l, n) => fresh(l).find(s => slot(w, s, 'Kept position') === n);
  const r = await fx.press(w, s2src, fx.cfg('s2', b.req.id));
  const shotAt = (l, n) => { const s = at(l, n); return s && shotOf(w, s); };
  return {
    b, r, shots, fresh: { sheet: fresh('sheet').length, hand: fresh('hand').length },
    xlHanging: shotAt('sheet', 2), xlFolded: shotAt('sheet', 1), handFolded: shotAt('hand', 1), handHanging: shotAt('hand', 2),
    pair: k => shot(w, k, 'Pair key'), planned: k => !!k && shot(w, k, 'Planned') === 1, get: (k, f) => k && shot(w, k, f), dup: pairCheck(w),
    oldActive: Object.values(shots).map(k => shot(w, k, 'Active slots filled')),
  };
}
for (const kindName of ['make', 'share']) add(`T35/GPT-B-${kindName}`, `T35's S2 part: a line's product changed to another on the same guide; S2 plans the new slots${kindName === 'make' ? ' (Make: a new shot though the obsolete shot holds its line\'s Pair key)' : ' (Share: a group whose only shot is obsolete gets a new shot; a group whose shot still fills an active slot is joined)'}; the shot pair check counts only shots filling an active slot`, async t => {
  const x = await lineScenario(new World());
  t.check('S1 made 4 new slots on each changed line; S2 ran', x.fresh.sheet === 4 && x.fresh.hand === 4 && x.r.ok, x.fresh);
  if (kindName === 'make') {
    t.check('GPT-B-make: Bath Sheet XL · 2 Hanging gets its own new shot, with the old one\'s Pair key, Planned', x.xlHanging && x.xlHanging !== x.shots.sheetHanging && x.pair(x.xlHanging) === x.pair(x.shots.sheetHanging)
      && x.get(x.xlHanging, 'Name') === 'Bath Sheet XL · 2 Hanging' && x.planned(x.xlHanging), [x.get(x.xlHanging, 'Name'), x.get(x.xlHanging, 'Plan check')]);
    t.check('GPT-B-make: the relabelled hand towel\'s Hanging gets its own new shot too', x.handHanging && x.handHanging !== x.shots.handHanging && x.planned(x.handHanging));
  } else {
    t.check('GPT-B-share: the hand line\'s Folded group, whose only shot is obsolete, gets a new Share shot with the same Pair key, Planned', x.handFolded && x.handFolded !== x.shots.handFolded && x.pair(x.handFolded) === x.pair(x.shots.handFolded)
      && x.get(x.handFolded, 'Made as') === 'Share' && x.planned(x.handFolded), [x.get(x.handFolded, 'Name'), x.get(x.handFolded, 'Plan check')]);
    t.check('the XL Folded slot joins the shared shot that still fills the bath towel\'s active slot (no acceptance), which plans for both', x.xlFolded === x.shots.folded && x.planned(x.xlFolded)
      && x.get(x.xlFolded, 'Effective placement') === 'Bath Towel, Bath Sheet XL product pages, image 1', x.get(x.xlFolded, 'Effective placement'));
  }
  t.check('the shot pair check, counting only shots that fill an active slot, shows no duplicate; the obsolete shots fill none', !x.dup.length && x.oldActive[0] === 0 && x.oldActive[2] === 0 && x.oldActive[3] === 0, [x.dup, x.oldActive]);
});

add('CTRL-GPT-B', "Negative control: S2 without the membership filter (any shot that isn't Withdrawn counts), GPT-B's guards fail: an obsolete shot suppresses the Make slot's shot and captures the Share group", async t => {
  const m = mutate(t, SRC.s2, 'return !!shot && !shot.getCellValue(SH.withdrawn) && fillsActive.has(id);', 'return !!shot && !shot.getCellValue(SH.withdrawn);', 'S2 without the active-slot filter');
  const make = await moveScenario(new World(), 2, m), share = await moveScenario(new World(), 1, m), line = await lineScenario(new World(), m);
  t.check('mutated, T24 make: S2 ran to the end, and the moved Make slot gets no new shot', make.after.ran === true && !make.after.newShot, make.after);
  t.check('mutated, T24 share: S2 ran to the end, and the moved Share slot is joined to the obsolete shot, or gets none', share.after.ran === true && !share.after.newShot, share.after);
  t.check('mutated, T35: S2 ran to the end, and the XL Hanging slot gets no shot, and the hand Folded group gets no new shot', line.r.ok === true && !line.xlHanging && (!line.handFolded || line.handFolded === line.shots.handFolded), [line.r.ok, line.xlHanging, line.handFolded]);
});

// ---- other rows' S2 and S3 parts -------------------------------------------------------------
async function s2guards(w, s2src = SRC.s2) {
  const b = await bathPlanned(w);
  await pressS2(w, b.req.id);
  const sheet1 = slotAt(w, b.L.sheet, 1), vessel1 = slotAt(w, b.L.vessel, 1);
  await recordSlot(w, sheet1, { Fulfillment: 'Make', 'Fulfillment reason': 'test: shown at its own size' });
  await recordSlot(w, vessel1, {});
  w.advance(2 * 60_000); w.set(PS, vessel1, { 'Recorded summary': 'test: edited by hand' });
  const mine = w.find(PS, r => (r.get('Request') || []).includes(b.req.id));
  const okWithShot = mine.filter(s => slot(w, s, 'Slot ok') === 1 && slot(w, s, 'Live shot count') > 0).length;
  const before = w.ids(SH).length;
  const r = await fx.press(w, s2src, fx.cfg('s2', b.req.id));
  return { b, sheet1, vessel1, okWithShot, ran: r.ok, nothingNew: w.ids(SH).length === before, note: shotNote(w, b.req.id) };
}
const s2listed = (w, x) => x.note.includes(`Bath Sheet · 1 Folded: ${slot(w, x.sheet1, 'Status')}.`) && x.note.includes(`Bath Vessel · 1 Front: ${TEXT.heldSlot}.`);
add('S2-guards', "S2 lists a slot that isn't ok with its Status whether or not it has a shot, and counts as planned only an ok slot with a shot that counts (§7.3): a recorded departure on a slot with its shot, and a held slot with its shot", async t => {
  const w = new World(), x = await s2guards(w);
  t.check('both have their shot and aren\'t ok: the departure waits to be detached, the other is held', shotOf(w, x.sheet1) && shotOf(w, x.vessel1) && slot(w, x.sheet1, 'Slot ok') === 0 && slot(w, x.vessel1, 'Held') === 1
    && slot(w, x.sheet1, 'Status').startsWith('Fulfillment changed after its shot was made') && slot(w, x.vessel1, 'Status') === TEXT.heldSlot, [slot(w, x.sheet1, 'Status'), slot(w, x.vessel1, 'Status')]);
  t.check('S2 makes nothing and lists each with its Status', x.ran && x.nothingNew && s2listed(w, x), x.note);
  t.check('"Already planned" counts only the ok slots with a shot', x.note.includes(`Already planned: ${x.okWithShot} slots with a shot.`) && x.okWithShot === 10, [x.okWithShot, x.note]);
});
add('CTRL-S2-OK', "Negative control: with S2 counting an active slot with a shot as planned before it checks Slot ok, S2-guards' guard fails: the held and the departed slots are counted as planned and left out of the note", async t => {
  const m = mutate(t, SRC.s2, `    if (num(s.getCellValue(S.ok)) !== 1) { out.push(\`\${label(s)}: \${text(s.getCellValue(S.status))}.\`); continue; }
    if (liveShotOf(s).length) { planned++; continue; }`, `    if (num(s.getCellValue(S.active)) === 1 && liveShotOf(s).length) { planned++; continue; }
    if (num(s.getCellValue(S.ok)) !== 1) { out.push(\`\${label(s)}: \${text(s.getCellValue(S.status))}.\`); continue; }`, 'planned before Slot ok');
  const w0 = new World();
  t.check('as written, both are listed', s2listed(w0, await s2guards(w0)));
  const w = new World(), x = await s2guards(w, m);
  t.check('mutated: S2 ran, and the guard fails: neither is listed, and both are counted as planned', x.ran && !s2listed(w, x) && x.note.includes(`Already planned: ${x.okWithShot + 2} slots with a shot.`), x.note);
});

add('T8c-s2', "T8c's S2 part: a departure not yet recorded leaves the slot not ok, and S2 makes no shot for it and lists it with its Status; recorded, its Operative fulfillment is \"An accepted image\" and S2 makes none", async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const glaze = slotAt(w, b.L.vessel, 3);
  w.set(PS, glaze, { Fulfillment: 'An accepted image', 'Fulfillment reason': 'Close study already shows the glaze' });
  await pressS2(w, b.req.id);
  t.check('draft: no shot, listed with its Status', !shotOf(w, glaze) && shotNote(w, b.req.id).includes(`Bath Vessel · 3 Glaze detail: ${TEXT.changePending}: press Record decision to record it, or undo it.`), shotNote(w, b.req.id));
  t.check('the other slots were planned', shotOf(w, slotAt(w, b.L.vessel, 1)) && shotOf(w, slotAt(w, b.L.towel, 1)));
  w.set(PS, glaze, decision()); await fx.pressS7Slot(w, glaze);
  await pressS2(w, b.req.id);
  t.check('recorded: no shot, and no longer listed', !shotOf(w, glaze) && slot(w, glaze, 'Operative fulfillment') === 'An accepted image' && !shotNote(w, b.req.id).includes('Glaze detail'), shotNote(w, b.req.id));
});

add('T28-s2', "T28's S2 parts: while two records stand for one key neither is ok and S2 makes nothing for it; once one is validly withdrawn, S2 plans the other; a reopened waiver, recorded, is planned", async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const p2 = fx.product(w, { name: 'Bath Vessel Lid', style: 'Bath vessel lid', color: 'natural glaze', size: 'one size', facts: 'A lid in a natural glaze.' });
  await assign(w, p2, b.vessel.id);
  const lid = fx.line(w, b.req.id, p2);
  const A = start(w, SRC.s1, fx.cfg('s1', b.req.id)), B = start(w, SRC.s1, fx.cfg('s1', b.req.id));
  await holdBefore(w, A, kindIs('create')); await runAlone(w, B); await runAlone(w, A);
  const [x, y] = slotsOn(w, lid).filter(s => slot(w, s, 'Kept position') === 1);
  const hang = slotAt(w, b.L.towel, 2);
  await recordSlot(w, hang, { 'Not needed': true, 'Not needed reason': 'test: hanging not used' });
  await pressS2(w, b.req.id);
  t.check('two records for one key: S2 makes nothing for it, and lists them', !shotOf(w, x) && !shotOf(w, y) && shotNote(w, b.req.id).includes("Bath Vessel Lid · 1 Front: Another record has this slot's key: see the slot pair check."), shotNote(w, b.req.id));
  t.check('a waived slot gets no shot', !shotOf(w, hang));
  w.set(PS, y, { Withdrawn: true, 'Duplicate of': [x] });
  await pressS2(w, b.req.id);
  t.check('one validly withdrawn: S2 plans the other', slot(w, y, 'Validly withdrawn') === 1 && shotOf(w, x) && !shotOf(w, y) && shot(w, shotOf(w, x), 'Planned') === 1);
  await recordSlot(w, hang, { 'Not needed': false, 'Not needed reason': null });
  await pressS2(w, b.req.id);
  t.check('the reopened waiver, recorded: S2 plans it', shotOf(w, hang) && shot(w, shotOf(w, hang), 'Name') === 'Bath Towel · 2 Hanging' && shot(w, shotOf(w, hang), 'Planned') === 1);
});

add('T29-s2', "T29's S2 part: Make shots refuses a superseded request; the new version's shots are its own", async t => {
  const b = await bathPlanned(new World()), { w } = b;
  const v2 = fx.request(w, { name: 'Bath product pages v2', products: [b.P.vessel], supersedes: [b.req.id] });
  const n0 = w.writes.length;
  await pressS2(w, b.req.id);
  t.check('refused, only the note written', !shotsOn(w, b.req.id).length && /\nNothing was made: this request is superseded by a later version\. Plan in the later version\.$/.test(shotNote(w, b.req.id)) && w.writes.slice(n0).every(x => x.fields.join() === 'Shot planning note'), shotNote(w, b.req.id));
  await pressS1(w, v2.id); await pressS2(w, v2.id);
  t.check('the new version: its own slots and shots', shotsOn(w, v2.id).length === 3 && shotsOn(w, v2.id).every(x => shot(w, x, 'Planned') === 1));
});

add('T37-s3', "T37's S3 parts: a Held slot refuses Replan on its shot (it doesn't repoint away from it) and on the slot, naming the remedy; a hand-edited kept plan names a new request version; an S3 refresh is never flagged (both last-modified models)", async t => {
  for (const lmtOnUnchangedWrite of [false, true]) {
    const m = `[${lmtOnUnchangedWrite ? 'any write moves it' : 'only a change moves it'}]`;
    const b = await bathPlanned(new World({ lmtOnUnchangedWrite })), { w } = b;
    await pressS2(w, b.req.id);
    const towel1 = slotAt(w, b.L.towel, 1), sheet1 = slotAt(w, b.L.sheet, 1), sh = shotOf(w, towel1);
    w.advance(10 * 60_000);
    await pressS3Slot(w, slotAt(w, b.L.hand, 4)); // an S3 refresh of an unchanged slot in the plan
    t.check(`${m} an S3 refresh of an unchanged slot isn't flagged`, slot(w, slotAt(w, b.L.hand, 4), 'Kept plan check') === '' && slot(w, slotAt(w, b.L.hand, 4), 'Held') === 0, result(w, PS, slotAt(w, b.L.hand, 4)));
    w.advance(61_000);
    w.set(PS, towel1, { 'Recorded not needed': true }); // a hand tick, no script wrote it
    t.check(`${m} hand-ticked Recorded not needed: held, not waived; the shot isn't Planned`, slot(w, towel1, 'Held') === 1 && slot(w, towel1, 'Waived') === 0 && shot(w, sh, 'Planned') === 0 && slot(w, towel1, 'Status') === TEXT.heldSlot);
    const n0 = w.writes.length;
    await pressS3Shot(w, sh);
    t.check(`${m} Replan on the shot refuses rather than repointing away from it`, result(w, SH, sh).endsWith("Not replanned: Edited by hand: record Bath Towel · 1 Folded's decision again first.") && sameIds(shot(w, sh, 'Lines in shot'), [b.L.towel])
      && w.writes.slice(n0).every(x => x.fields.join() === 'Replan result'), result(w, SH, sh));
    await pressS3Slot(w, towel1);
    t.check(`${m} Replan on the slot refuses too`, result(w, PS, towel1).endsWith("Not replanned: Edited by hand: record Bath Towel · 1 Folded's decision again first."));
    w.set(PS, towel1, { 'Recorded not needed': false }); w.set(PS, towel1, decision()); await fx.pressS7Slot(w, towel1);
    t.check(`${m} recorded again: no longer held`, slot(w, towel1, 'Held') === 0 && shot(w, sh, 'Planned') === 1, slot(w, towel1, 'Status'));
    w.advance(61_000);
    w.set(PS, sheet1, { 'Kept fill rule': MAKE });
    await pressS3Shot(w, sh);
    t.check(`${m} a hand-edited kept plan: refused, naming a new version of the request`, result(w, SH, sh).endsWith("Not replanned: Edited by hand: Bath Sheet · 1 Folded's kept plan was edited by hand: plan it in a new version of the request.") && slot(w, sheet1, 'Status') === TEXT.heldPlan, result(w, SH, sh));
  }
});

// ---- the shared Status texts, bindings ------------------------------------------------------
add('TEXT-s3', "S3's refusal texts for a covered slot equal the slot Status's (formulas.mjs TEXT), so the button and the Status say the same", async t => {
  t.check('the covered refusal', SRC.s3.includes(`const COVERED_REFUSAL = '${TEXT.coveredRefusal}';`));
  t.check('GPT-A\'s covered pickup', SRC.s3.includes(`const COVERED_PICKUP = '${TEXT.coveredPickup}';`));
});

// The binding config translated to table and field IDs, by each key's table prefix.
function idConfig(w, name, recordId, extra = {}) {
  const b = fx.cfg(name, recordId, extra), out = {};
  const prefix = [['request', 'requestsTable'], ['line', 'linesTable'], ['product', 'productsTable'], ['guide', 'guidesTable'], ['gs', 'guideSlotsTable'], ['slot', 'slotsTable'], ['shot', 'shotsTable']];
  for (const [k, v] of Object.entries(b)) {
    if (k.endsWith('Table')) out[k] = w.t(v).id;
    else if (k.endsWith('Field')) { const p = prefix.find(([x]) => k.startsWith(x)); out[k] = w.f(w.t(b[p[1]]), v).id; }
    else out[k] = v;
  }
  return out;
}
for (const [name, key, bad, re] of [
  ['s2', 'shotSlotsFilledField', 'Slot IDs', /S2: shotSlotsFilledField must be of type multipleRecordLinks, not rollup/], ['s2', 'slotOkField', undefined, /S2: input slotOkField is missing/],
  ['s2', 'lineShareKeyField', 'Product shar key', /No field "Product shar key"/],
  ['s3', 'slotReachField', 'Replan result', /S3: slotReachField must be of type formula, not multilineText/], ['s3', 'shotResultField', undefined, /S3: input shotResultField is missing/],
  ['s3', 'kind', 'both', /S3: input kind must be "shot" or "slot"/],
]) add(`BIND-${name}-${key}`, `${name}: a binding that doesn't resolve or has the wrong type stops the run before any read or write`, async t => {
  const b = bath(new World()), { w } = b;
  const before = w.state();
  const config = name === 's2' ? fx.cfg('s2', b.req.id) : fx.cfg('s3', b.req.id, { kind: 'shot' });
  const r = await runAlone(w, start(w, SRC[name], { ...config, [key]: bad }));
  t.check('stopped with the binding error', !r.ok && re.test(r.error.message), r.error && r.error.message);
  t.check('no operation, nothing written', r.ops === 0 && w.state() === before);
});
add('BIND-ids-s2s3', 'S2 and S3 bound by table and field IDs instead of names behave the same', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  let r = await runAlone(w, start(w, SRC.s2, idConfig(w, 's2', b.req.id)));
  t.check('S2 by ID', r.ok && shotsOn(w, b.req.id).length === 10, r.error && r.error.message);
  const front = slotAt(w, b.L.vessel, 1), sh = shotOf(w, front);
  w.set(GS, b.vessel.slots[0], { View: `${fx.VIEWS.front} Centered.` }); await adopt(w, b.vessel.id);
  r = await runAlone(w, start(w, SRC.s3, idConfig(w, 's3', sh, { kind: 'shot' })));
  t.check('S3 (shot) by ID', r.ok && slot(w, front, 'Kept guide version') === 2 && shot(w, sh, 'Planned') === 1, r.error && r.error.message);
  const hand4 = slotAt(w, b.L.hand, 4);
  w.set(GS, b.textile.slots[3], { View: `${fx.VIEWS.setting} Daylight.` }); await adopt(w, b.textile.id);
  r = await runAlone(w, start(w, SRC.s3, idConfig(w, 's3', hand4, { kind: 'slot' })));
  t.check('S3 (slot) by ID', r.ok && slot(w, hand4, 'Kept guide version') === 2, r.error && r.error.message);
});
