// The change of 2026-10-30 (v2), on the simulated base. A rendition: a slot's recorded decision, or an
// image accepted on condition, makes its application need an approved rendition; S8 approves the one
// file it read by copying it under its approval ID, and only that copy is delivered (Rendition needed,
// Rendition state, Eligibility's rendition branch, Settled source image and Settled rendition; Decision
// content, Change pending and Rendition requirement on the slot; Acceptance on the candidate). A
// continuity reference: optional, and when configured either Ready, and carried into the standard,
// the prompt and the kept references, or Incomplete, which stops the shot's planning, and with it
// Snapshot and G2a's request (Continuity check, Plan check). RND-… and CNT-… are this change's cases;
// CTRL-… are negative controls: the mechanism removed in a mutated formula or script, and the guarding
// check failing for its reason. Local results show the logic on the simulated base; they don't show
// what Airtable does. The fixtures' Snapshot stand-in is not Snapshot, and G2a is not in this folder:
// its script is exercised on this base by the change's own harness, kept with its proposal.
import * as fx from './fixtures.mjs';
import { World, start, runAlone, stepRun, holdBefore, kindIs } from '../sim/world.mjs';
import { FORMULAS, INSTALLED, CONTINUITY_INSTALLED, RENDITION, CONTINUITY, HELD, TEXT, approvalPrefix } from '../sim/formulas.mjs';

const { bath, bathPlanned, pressS2, pressS4, pressS8, slotAt, recordSlot, SRC } = fx;
const PS = 'Product-page slots', AP = 'Applications', AI = 'Accepted images', SH = 'Shots', CA = 'Candidates';
const text = (table, field) => FORMULAS[table][field].airtable;
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

export const cases = [];
const add = (id, title, run) => cases.push({ id, title, run });

// ---------------------------------------------------------------------------------------------
// The rendition
const CROP = { id: 'attCROP0000000001', url: 'https://example.test/crop.jpg', filename: 'candidate-46_rendition-4x5-crop_1432x1790.jpg', size: 737231, type: 'image/jpeg', width: 1432, height: 1790 };
const OTHER = { id: 'attCROP0000000002', url: 'https://example.test/crop2.jpg', filename: 'candidate-46_rendition-4x5-crop_v2.jpg', size: 701000, type: 'image/jpeg', width: 1432, height: 1790 };
const OPERATION = 'Crop only, from the accepted image as stored (2400 × 1792): box left 560, top 1, right 1992, bottom 1791; no scaling or retouching; saved as baseline JPEG, quality 95.';
const COND = 'Source selected for this use only through the approved crop. The uncropped original is not the approved delivery.';
const rdecision = (source = "ASK's relay of 2026-10-30, the 4:5 crop of No. 46") => ({ 'Rendition decided by': 'ASK', 'Rendition decision source': source, 'Rendition entered by': "claude-code, on ASK's relay" });
const S8_FIELDS = ['Approved rendition', 'Rendition approval ID', 'Rendition approved', 'Rendition approved at', 'Rendition result'];
const REQUIRE = "ASK's relay of 2026-10-30, the Hand Towel's image 2 delivered as a rendition";

// The catalog planned and its product-page shots made: the Hand Towel's Hanging slot (image 2) and the vessel's Front slot.
// precision: date-times kept only to the whole second, floored or rounded, as Airtable might keep them;
// "modified" floors only the last-modified times and keeps what S8 writes as written.
async function pdp({ precision, ...opts } = {}) {
  const w = new World(opts);
  if (precision) wholeSeconds(w, precision);
  const b = await bathPlanned(w);
  await pressS2(w, b.req.id);
  b.hanging = slotAt(w, b.L.hand, 2); b.front = slotAt(w, b.L.vessel, 1);
  return b;
}
function wholeSeconds(w, precision) {
  const q = ms => (precision === 'round' ? Math.round(ms / 1000) : Math.floor(ms / 1000)) * 1000;
  w.iso = (ms = w.clock) => new Date(q(ms)).toISOString();
  if (precision === 'modified') return;
  const normalize = w.normalize.bind(w);
  w.normalize = (t, f, v, strict) => { const r = normalize(t, f, v, strict); return f.kind === 'date' && r ? new Date(q(Date.parse(r))).toISOString() : r; };
}
// S8's approval time: the whole second at or before the press.
const second = ms => Math.floor(ms / 1000) * 1000;
const shotOf = (w, s) => w.get(PS, s, 'Shot')[0];
const appOn = (w, s, accepted) => w.find(AP, r => (r.get('Slot') || []).includes(s) && (r.get('Accepted image') || []).includes(accepted))[0];
// A candidate of the slot's shot kept (Snapshot's stand-in), accepted (Accept's stand-in, optionally on condition) and applied by the real S4.
async function acceptOn(w, s, { condition } = {}) {
  const candidate = fx.snapshotCandidate(w, shotOf(w, s));
  if (condition) w.set(CA, candidate, { 'Accept on condition': condition });
  const accepted = fx.accept(w, candidate), r = await pressS4(w, accepted);
  return { candidate, accepted, app: appOn(w, s, accepted), r };
}
const view = (w, s, a) => ({ placement: w.get(PS, s, 'Placement state'), settledImage: w.get(PS, s, 'Settled image'), settledRendition: w.get(PS, s, 'Settled rendition'),
  state: a && w.get(AP, a, 'State'), rendition: a && w.get(AP, a, 'Rendition state'), status: w.get(PS, s, 'Status') });
// The approved copy S8 writes for a file under an approval ID.
const copyOf = (id, file) => [{ url: file.url, filename: `${id}__${file.filename}` }];
const stampOf = iso => iso.replace(/[-:.]/g, '');

add('RND-record', "Rendition required is a draft until S7 records it: ticked, the slot's Decision content gains one line and a change waits, and the requirement doesn't operate; recorded, it does; no other slot's content changes", async t => {
  const b = await pdp(), { w } = b;
  const others = w.ids(PS).filter(s => s !== b.hanging), before = others.map(s => w.get(PS, s, 'Decision content'));
  w.set(PS, b.hanging, { 'Rendition required': true });
  t.check('ticked: Decision content ends its decision part with "Rendition required: yes"; Change pending; Rendition requirement 0',
    w.get(PS, b.hanging, 'Decision content').includes('\nNot needed reason: \nRendition required: yes\nDecided by: ') && w.get(PS, b.hanging, 'Change pending') === TEXT.changePending && w.get(PS, b.hanging, 'Rendition requirement') === 0, w.get(PS, b.hanging, 'Decision content'));
  const r = await recordSlot(w, b.hanging, {}, REQUIRE);
  t.check('S7 records it: Decided content is that content, Rendition requirement 1, no change waits', r.ok && w.get(PS, b.hanging, 'Decided content') === w.get(PS, b.hanging, 'Decision content')
    && w.get(PS, b.hanging, 'Rendition requirement') === 1 && w.get(PS, b.hanging, 'Change pending') === '', w.get(PS, b.hanging, 'Record result'));
  t.check("every other slot's Decision content is unchanged, and none has a requirement", same(others.map(s => w.get(PS, s, 'Decision content')), before) && others.every(s => w.get(PS, s, 'Rendition requirement') === 0 && !w.get(PS, s, 'Decision content').includes('Rendition')));
});

add('RND-pending', "A slot whose recorded decision requires a rendition, accepted: at no point of S4's run is it Settled or shows an image; its application reads Needs review until a rendition is approved, and attaching one approves nothing", t => pending(t));
async function pending(t, opts = {}) {
  const b = await pdp(opts), { w } = b;
  await recordSlot(w, b.hanging, { 'Rendition required': true }, REQUIRE);
  const candidate = fx.snapshotCandidate(w, shotOf(w, b.hanging)), accepted = fx.accept(w, candidate);
  const run = start(w, SRC.s4, fx.cfg('s4', accepted)), seen = [];
  while (!run.done) { await stepRun(w, run); seen.push(view(w, b.hanging)); }
  t.check('S4 ran to the end and made the application', run.ok && appOn(w, b.hanging, accepted), run.error && run.error.message);
  t.check("at every step of S4's run the slot was neither Settled nor showed an image (the original is never shown as delivered)",
    seen.length > 1 && seen.every(v => v.placement !== 'Settled' && v.settledImage == null && v.settledRendition == null), seen.map(v => v.placement));
  const a = appOn(w, b.hanging, accepted), v = view(w, b.hanging, a);
  t.check('the application: Current and in use, Rendition needed, Rendition state asks for a rendition, Eligibility and State "Needs review: it needs an approved rendition"',
    w.get(AP, a, 'Current') === true && w.get(AP, a, 'In use flag') === 1 && w.get(AP, a, 'Rendition needed') === 1 && v.rendition === RENDITION.none && w.get(AP, a, 'Eligibility') === RENDITION.needed && v.state === RENDITION.needed, v);
  t.check('the slot: Needs review, its Status naming the rendition; no Settled image, no Settled rendition',
    v.placement === 'Needs review' && v.status.includes(RENDITION.needed) && v.settledImage == null && v.settledRendition == null, v);
  w.set(AP, a, { Rendition: [CROP], 'Rendition operation': OPERATION, ...rdecision() });
  const u = view(w, b.hanging, a);
  t.check('the rendition attached, with its operation and decision record, and no press: "Not approved", still Needs review, nothing delivered',
    u.rendition === RENDITION.notApproved && u.state === RENDITION.needed && u.placement === 'Needs review' && u.settledImage == null && u.settledRendition == null, u);
  t.check('the accepted image and the candidate keep the original', same(w.get(AI, accepted, 'Image'), w.get(CA, candidate, 'Image')) && w.get(AI, accepted, 'Image')[0].filename === fx.CANDIDATE_IMAGE(shotOf(w, b.hanging))[0].filename);
  return { b, a, accepted, candidate };
}
// RND-pending's state, then S8 pressed once.
async function approved(opts = {}) {
  const p = await pending({ check: () => true }, opts), { w } = p.b;
  w.advance(1_000); const t0 = w.clock, r = await pressS8(w, p.a);
  const at = w.iso(second(t0)), id = `${approvalPrefix(p.b.hanging, p.accepted)}${stampOf(at)}`;
  return { ...p, w, r, at, id };
}

add('RND-approve', 'S8 approves the one rendition it read: it copies that file under its approval ID, which names the slot and the accepted image, with a record that begins with the ID; the slot is Settled and delivers the copy, never the original; the source image is unchanged', async t => {
  const p = await pending({ check: () => true }), { w } = p.b, { a, accepted, candidate } = p, s = p.b.hanging;
  w.advance(1_000);
  const original = JSON.stringify(w.get(AI, accepted, 'Image')), n = w.writes.length, t0 = w.clock;
  const r = await pressS8(w, a);
  const at = w.iso(second(t0)), id = `${approvalPrefix(s, accepted)}${stampOf(at)}`, record = w.get(AP, a, 'Rendition approved') || '';
  t.check('S8 ran; it wrote once, on the application: Approved rendition, Rendition approval ID, Rendition approved, Rendition approved at and Rendition result',
    r.ok && w.writes.slice(n).length === 1 && w.writes.slice(n).every(x => x.by === 'run' && x.table === AP && x.id === a && x.fields.join() === S8_FIELDS.join()), w.writes.slice(n));
  t.check('the approval ID is R8-<slot>-<accepted image>-<the whole second before its read>; Rendition approved at is that time', w.get(AP, a, 'Rendition approval ID') === id && w.get(AP, a, 'Rendition approved at') === at, w.get(AP, a, 'Rendition approval ID'));
  t.check('Approved rendition is one copy of the file read, by its URL, named "<ID>__<its name>"', same(w.get(AP, a, 'Approved rendition'), copyOf(id, CROP)), w.get(AP, a, 'Approved rendition'));
  t.check('the record begins with the ID and names the exact file (ID, name, bytes, type, size), the operation, the slot and application, the source and the decision record',
    record === [id, `Rendition: ${CROP.filename} · file ${CROP.id} · 737231 bytes · image/jpeg · 1432 × 1790`, `Operation: ${OPERATION}`, `For: ${w.get(PS, s, 'Name')} · slot ${s} · application ${a}`,
      `From: accepted image ${accepted} · ${w.get(AI, accepted, 'Current title')}`, 'Decided by: ASK', "Decision source: ASK's relay of 2026-10-30, the 4:5 crop of No. 46", "Entered by: claude-code, on ASK's relay", `Approved at: ${at}`].join('\n'), record);
  t.check('Rendition result: "Approved: <file> for <slot> · decided by ASK · …"; its read-back confirmed', w.get(AP, a, 'Rendition result') === `Approved: ${CROP.filename} for ${w.get(PS, s, 'Name')} · decided by ASK · entered by claude-code, on ASK's relay.` && r.logs.includes(`approved ${CROP.id} for ${a} as ${id}`), [w.get(AP, a, 'Rendition result'), r.logs]);
  const v = view(w, s, a);
  t.check('Rendition state Approved; Eligibility Holds; State In use; the slot Settled', v.rendition === RENDITION.approved && w.get(AP, a, 'Eligibility') === 'Holds' && v.state === 'In use' && v.placement === 'Settled', v);
  t.check('the slot delivers the approved copy (Settled rendition) and not the original (Settled image empty)', same(v.settledRendition, copyOf(id, CROP)) && v.settledImage == null && w.get(AP, a, 'Settled rendition') === `${id}__${CROP.filename}`, v);
  t.check("the accepted image's Image and the candidate's Image are unchanged", JSON.stringify(w.get(AI, accepted, 'Image')) === original && same(w.get(CA, candidate, 'Image'), JSON.parse(original)));
});

add('RND-replace', 'A rendition replaced after approval, one second or a minute later, never inherits the approval: the approved copy stays delivered and the change waits; the same for the operation and the decision record; S8 pressed again approves the new file under a new ID', t => replace(t));
async function replace(t, opts = {}) {
  const { w, a, b, id } = await approved(opts), s = b.hanging;
  w.advance(1_000); w.set(AP, a, { Rendition: [OTHER] });
  let v = view(w, s, a);
  t.check('a new file one second after approval: "Approved; a change waits"; the slot still Settled with the approved copy of the first file, not the new file',
    v.rendition === RENDITION.pending && v.placement === 'Settled' && same(v.settledRendition, copyOf(id, CROP)) && v.settledImage == null, v);
  w.advance(60_000); w.set(AP, a, { 'Rendition operation': `${OPERATION} Then sharpened.` });
  v = view(w, s, a);
  t.check('the operation edited a minute later: still waiting; still the approved copy delivered', v.rendition === RENDITION.pending && same(v.settledRendition, copyOf(id, CROP)), v);
  w.set(AP, a, { 'Rendition operation': OPERATION, Rendition: [CROP] });
  t.check('set back by hand: still waiting (only S8 approves)', w.get(AP, a, 'Rendition state') === RENDITION.pending);
  w.set(AP, a, { Rendition: [OTHER], 'Rendition decision source': "ASK's relay of 2026-10-31, the second crop" });
  w.advance(5_000); const t0 = w.clock, r = await pressS8(w, a);
  const id2 = `${approvalPrefix(s, w.get(AP, a, 'Source ID')[0])}${stampOf(w.iso(second(t0)))}`;
  v = view(w, s, a);
  t.check('S8 pressed again: a new ID; the new file copied under it and delivered; its record names that file and the new decision source; Approved',
    r.ok && id2 !== id && w.get(AP, a, 'Rendition approval ID') === id2 && same(v.settledRendition, copyOf(id2, OTHER)) && v.rendition === RENDITION.approved
    && w.get(AP, a, 'Rendition approved').includes(`file ${OTHER.id}`) && w.get(AP, a, 'Rendition approved').includes("Decision source: ASK's relay of 2026-10-31, the second crop"), v);
}

add('RND-race', "A rendition replaced between S8's read and its write: S8 approves and copies the file it read, never the new one, and the change waits", t => race(t));
async function race(t, { src = SRC.s8, ...opts } = {}) {
  const { b, a } = await pending({ check: () => true }, opts), { w } = b;
  w.advance(1_000 + ((1_250 - (w.clock % 1_000)) % 1_000)); // a second after the draft, a quarter into a second
  const t0 = w.clock, run = start(w, src, fx.cfg('s8', a));
  await holdBefore(w, run, kindIs('read')); w.apply(w.pending.find(p => p.run === run)); // the press has read CROP
  w.set(AP, a, { Rendition: [OTHER] }); w.advance(1_000);                                 // the file replaced; the write comes a second later
  await runAlone(w, run);
  const id = w.get(AP, a, 'Rendition approval ID'), v = view(w, b.hanging, a);
  t.check('S8 ran; its approval is of the file it read: the copy is that file, and the record names its ID', run.ok && same(w.get(AP, a, 'Approved rendition'), copyOf(id, CROP)) && w.get(AP, a, 'Rendition approved').includes(`file ${CROP.id}`) && w.get(AP, a, 'Rendition approved at') === w.iso(second(t0)), w.get(AP, a, 'Approved rendition'));
  t.check('the slot delivers the copy of the file read; the new file is not delivered', v.placement === 'Settled' && same(v.settledRendition, copyOf(id, CROP)) && !JSON.stringify(v.settledRendition).includes(OTHER.url), v);
  t.check('the change made during the press reads as waiting', v.rendition === RENDITION.pending, v);
}

add('RND-hand', "The approval edited by hand reads Edited by hand and delivers nothing: the approved copy replaced, a second file added, the record or the ID edited, or the approval copied to another slot's application", t => hand(t));
async function hand(t, opts = {}) {
  const { w, a, b } = await approved(opts), s = b.hanging;
  const reset = async () => { w.advance(1_000); await pressS8(w, a); };
  const flagged = label => {
    const v = view(w, s, a);
    t.check(`${label}: Edited by hand; Needs review; nothing delivered`, v.rendition === RENDITION.hand && v.state === RENDITION.needed && v.placement === 'Needs review' && v.settledRendition == null && v.settledImage == null, v);
  };
  w.advance(1_000); w.set(AP, a, { 'Approved rendition': [OTHER] }); flagged('the approved copy replaced by another file');
  await reset(); w.set(AP, a, { 'Approved rendition': [...w.get(AP, a, 'Approved rendition'), OTHER] }); flagged('a second file added to the approved copy');
  await reset(); w.set(AP, a, { 'Rendition approved': `Approved by hand.\n${w.get(AP, a, 'Rendition approved')}` }); flagged('the record edited');
  await reset(); w.set(AP, a, { 'Rendition approval ID': `${w.get(AP, a, 'Rendition approval ID')}x` }); flagged('the ID edited');
  await reset(); w.set(AP, a, { 'Approved rendition': null }); flagged('the approved copy removed');
  await reset();
  t.check('pressed again: Approved', w.get(AP, a, 'Rendition state') === RENDITION.approved);
  await recordSlot(w, b.front, { 'Rendition required': true }, REQUIRE);
  const front = await acceptOn(w, b.front);
  w.set(AP, front.app, { Rendition: [CROP], 'Rendition operation': OPERATION, ...rdecision() });
  const moved = ['Approved rendition', 'Rendition approval ID', 'Rendition approved', 'Rendition approved at'];
  w.set(AP, front.app, Object.fromEntries(moved.map(f => [f, w.get(AP, a, f)])));
  t.check("the approval copied by hand to another slot's application: Edited by hand there, nothing delivered", w.get(AP, front.app, 'Rendition state') === RENDITION.hand && w.get(PS, b.front, 'Settled rendition') == null && w.get(PS, b.front, 'Settled image') == null, w.get(AP, front.app, 'Rendition state'));
}

add('RND-requirement', "Unticking Rendition required doesn't restore the original: the change waits and the approved rendition stays delivered; only a recorded decision to drop the requirement delivers the accepted image", t => requirement(t));
async function requirement(t, opts = {}) {
  const { w, a, b, id, accepted } = await approved(opts), s = b.hanging;
  w.advance(1_000); w.set(PS, s, { 'Rendition required': false });
  let v = view(w, s, a);
  t.check('unticked, not recorded: a change waits on the slot; Rendition requirement 1; the approved copy still delivered, the original not',
    w.get(PS, s, 'Change pending') === TEXT.changePending && w.get(PS, s, 'Rendition requirement') === 1 && v.rendition === RENDITION.approved && v.placement === 'Settled' && same(v.settledRendition, copyOf(id, CROP)) && v.settledImage == null, v);
  const r = await recordSlot(w, s, {}, "ASK's relay of 2026-10-31, the Hand Towel's image 2 without a rendition");
  v = view(w, s, a);
  t.check('recorded by S7 with its decision record: Rendition requirement 0; the accepted image delivered; Rendition state empty',
    r.ok && w.get(PS, s, 'Rendition requirement') === 0 && w.get(AP, a, 'Rendition needed') === 0 && v.rendition === '' && v.placement === 'Settled' && same(v.settledImage, w.get(AI, accepted, 'Image')) && v.settledRendition == null, v);
}

add('RND-condition', "An image accepted on condition (No. 46's case): its acceptance shows the condition, and every application of it needs an approved rendition, whatever the slot's decision; S8's record carries the condition", t => condition(t));
async function condition(t, opts = {}) {
  const b = await pdp(opts), { w } = b, s = b.hanging;
  const plain = await acceptOn(w, b.front);
  t.check('an image accepted without one: Acceptance is the installed value, "Accepted for <its use>"', w.get(CA, plain.candidate, 'Acceptance') === `Accepted for ${w.get(CA, plain.candidate, 'Intended use')}`, w.get(CA, plain.candidate, 'Acceptance'));
  const candidate = fx.snapshotCandidate(w, shotOf(w, s));
  w.set(CA, candidate, { 'Accept on condition': COND });
  t.check('the condition entered and not yet accepted: Not accepted', w.get(CA, candidate, 'Acceptance') === 'Not accepted');
  const accepted = fx.accept(w, candidate);
  const run = start(w, SRC.s4, fx.cfg('s4', accepted)), seen = [];
  while (!run.done) { await stepRun(w, run); seen.push(view(w, s)); }
  const a = appOn(w, s, accepted);
  t.check('the accepted record keeps the condition; the candidate\'s Acceptance shows it after the use', w.get(AI, accepted, 'Accepted on condition') === COND && w.get(CA, candidate, 'Acceptance') === `Accepted for ${w.get(CA, candidate, 'Intended use')}, on condition: ${COND}`, w.get(CA, candidate, 'Acceptance'));
  t.check("the slot's decision requires nothing, yet the application needs a rendition, and at no step of S4 was the original shown as delivered",
    w.get(PS, s, 'Rendition requirement') === 0 && w.get(AP, a, 'Rendition needed') === 1 && w.get(AP, a, 'State') === RENDITION.needed && seen.every(v => v.placement !== 'Settled' && v.settledImage == null), seen.map(v => v.placement));
  w.set(AP, a, { Rendition: [CROP], 'Rendition operation': OPERATION, ...rdecision() });
  w.advance(1_000); const t0 = w.clock, r = await pressS8(w, a), id = `${approvalPrefix(s, accepted)}${stampOf(w.iso(second(t0)))}`;
  const v = view(w, s, a);
  t.check('S8 approves; its record carries "Accepted on condition: …"; the slot delivers the copy, not the original',
    r.ok && w.get(AP, a, 'Rendition approved').includes(`\nAccepted on condition: ${COND}\nDecided by: ASK`) && v.placement === 'Settled' && same(v.settledRendition, copyOf(id, CROP)) && v.settledImage == null, v);
  await recordSlot(w, s, { 'Rendition required': true }, REQUIRE);
  await recordSlot(w, s, { 'Rendition required': false }, "ASK's relay of 2026-10-31, no requirement on the slot");
  t.check('a requirement recorded on the slot and then recorded off: the condition still holds; the copy still delivered, never the original',
    w.get(PS, s, 'Rendition requirement') === 0 && w.get(AP, a, 'Rendition needed') === 1 && same(w.get(PS, s, 'Settled rendition'), copyOf(id, CROP)) && w.get(PS, s, 'Settled image') == null, view(w, s, a));
}

add('RND-refusals', "S8 refuses, writing only Rendition result: no decision record; an application that needs no rendition; an application not in use; no file or two files; a file that isn't an image or whose name has a comma; no operation", async t => {
  const { b, a } = await pending({ check: () => true }), { w } = b;
  const tryS8 = async (label, cells, expect, appId = a) => {
    if (cells) w.set(AP, appId, cells);
    const n = w.writes.length, r = await pressS8(w, appId);
    const wrote = w.writes.slice(n);
    t.check(`${label}: refused "${expect}", only Rendition result written, nothing approved`,
      r.ok && wrote.length === 1 && wrote[0].fields.join() === 'Rendition result' && w.get(AP, appId, 'Rendition result') === `Not approved: ${expect}`
      && w.get(AP, appId, 'Rendition approved') == null && w.get(AP, appId, 'Approved rendition') == null && w.get(AP, appId, 'Rendition approval ID') == null, [w.get(AP, appId, 'Rendition result'), wrote]);
  };
  await tryS8('no decision record', { 'Rendition decided by': null }, 'enter Rendition decided by, Rendition decision source and Rendition entered by first.');
  w.set(AP, a, rdecision());
  await tryS8('two files', { Rendition: [CROP, OTHER] }, 'attach exactly one rendition file; there are 2.');
  await tryS8('no file', { Rendition: null }, 'attach exactly one rendition file; there are 0.');
  await tryS8('not an image', { Rendition: [{ ...CROP, type: 'application/pdf', filename: 'crop.pdf' }] }, 'the rendition must be an image; its type is "application/pdf".');
  await tryS8('a comma in its name', { Rendition: [{ ...CROP, filename: 'crop, 4x5.jpg' }] }, "the rendition's file name has a comma; attach it under a name without one.");
  w.set(AP, a, { Rendition: [CROP] });
  await tryS8('no operation', { 'Rendition operation': null }, 'enter the Rendition operation: how the rendition was made from the accepted image.');
  w.set(AP, a, { 'Rendition operation': OPERATION, Withdrawn: true });
  await tryS8('a withdrawn application', null, 'only an application in use on its slot (Current, not Withdrawn) takes a rendition.');
  w.set(AP, a, { Withdrawn: false });
  const front = await acceptOn(w, b.front);
  await tryS8('an application that needs no rendition', { Rendition: [CROP], 'Rendition operation': OPERATION, ...rdecision() }, "this application needs no rendition: neither its slot's recorded decision nor its accepted image's acceptance requires one.", front.app);
  t.check('the other slot, without the requirement, settled with its accepted image as before, the rendition attached to it notwithstanding',
    w.get(PS, b.front, 'Placement state') === 'Settled' && same(w.get(PS, b.front, 'Settled image'), w.get(AI, front.accepted, 'Image')) && w.get(PS, b.front, 'Settled rendition') == null && w.get(AP, front.app, 'Rendition state') === '');
});

add('RND-unaffected', 'A slot without a requirement and an image accepted without a condition: Eligibility, State, Settled source image and Settled image are what the installed texts give; Rendition needed 0; Rendition state and Settled rendition empty', async t => {
  const b = await pdp(), { w } = b;
  const { app: a, accepted } = await acceptOn(w, b.front);
  t.check('In use, Settled, the accepted image delivered', w.get(AP, a, 'State') === 'In use' && w.get(PS, b.front, 'Placement state') === 'Settled' && same(w.get(PS, b.front, 'Settled image'), w.get(AI, accepted, 'Image')));
  t.check("Settled source image is the file's name, as the installed text gives; Rendition needed 0; Rendition state and Settled rendition empty",
    w.get(AP, a, 'Settled source image') === w.get(AI, accepted, 'Image')[0].filename && w.get(AP, a, 'Rendition needed') === 0 && w.get(AP, a, 'Rendition state') === '' && w.get(AP, a, 'Settled rendition') === '' && w.get(PS, b.front, 'Settled rendition') == null);
});

add('RND-text', "The rendition's changed formulas are their installed texts plus one addition each: Eligibility one branch before \"Holds\", Settled source image one condition, Decision content one line, Change pending one term, Acceptance one clause", async t => {
  const branch = `\nIF(AND({Rendition needed}, LEFT({Rendition state}, 8) != "Approved"), "${RENDITION.needed}",`;
  const el = text(AP, 'Eligibility');
  t.check('Eligibility: the installed text with one branch inserted before "Holds", and one closing parenthesis', el.split(branch).length === 2 && el.replace(branch, '').replace(/\)$/, '') === INSTALLED.eligibility, el);
  t.check('Settled source image: the installed text with its condition wrapped in AND(…, {Rendition needed} = 0)',
    text(AP, 'Settled source image') === 'IF(AND({State} = "In use", {Rendition needed} = 0), ARRAYJOIN({Source image}), "")' && INSTALLED.settledSourceImage === 'IF({State} = "In use", ARRAYJOIN({Source image}), "")');
  const line = ' & IF({Rendition required}, "\\nRendition required: yes", "")', dc = text(PS, 'Decision content');
  t.check('Decision content: the installed text with one line before the decision record', dc.split(line).length === 2 && dc.replace(line, '') === INSTALLED.decisionContent, dc);
  const cp = text(PS, 'Change pending');
  t.check('Change pending: the installed text with {Rendition required} as one more term of the no-decision test', cp.split('{Not needed}, {Rendition required})').length === 2 && cp.replace('{Not needed}, {Rendition required})', '{Not needed})') === INSTALLED.changePending, cp);
  const clause = ' & IF(ARRAYJOIN({Accepted on condition}, "") != "", ", on condition: " & ARRAYJOIN({Accepted on condition}, ""), "")', ac = text(CA, 'Acceptance');
  t.check("Acceptance: the live text (read 2026-10-30) with one clause after the use", ac.split(clause).length === 2 && ac.replace(clause, '') === INSTALLED.acceptance
    && INSTALLED.acceptance === 'IF(COUNTA({Accepted images}) = 0, "Not accepted", IF(AND(ARRAYJOIN({Accepted record status}, "") != "", SUBSTITUTE(ARRAYJOIN({Accepted record status}, ""), "Complete", "") = ""), "Accepted for " & {Intended use}, "Recording acceptance…"))', ac);
});

add('BIND-ids-s8', 'S8 bound by table and field IDs instead of names behaves the same; a binding of the wrong type stops it before any read or write', async t => {
  const { b, a } = await pending({ check: () => true }), { w } = b;
  const n = w.writes.length;
  const bad = await runAlone(w, start(w, SRC.s8, fx.cfg('s8', a, { approvedFileField: 'Rendition approval ID' })));
  t.check('a wrong type: the run stops with the binding named, and nothing is written', bad.ok === false && /S8: approvedFileField must be of type multipleAttachments, not singleLineText/.test(bad.error.message) && w.writes.length === n, bad.error && bad.error.message);
  w.advance(1_000); const r = await runAlone(w, start(w, SRC.s8, fx.idConfig(w, 's8', a)));
  t.check('S8 by ID: approved', r.ok && w.get(AP, a, 'Rendition state') === RENDITION.approved && w.get(PS, b.hanging, 'Placement state') === 'Settled', r.error && r.error.message);
});

// A case run with a recording t: its checks as [label, ok], as written and mutated.
const recorded = async (fn, opts) => { const got = []; await fn({ check: (label, ok) => { got.push([label, !!ok]); return !!ok; } }, opts); return got; };
const control = async (t, fn, mutated, expectFailed) => {
  const asWritten = await recorded(fn, {});
  t.check('as written, every check of the case holds', asWritten.length > 0 && asWritten.every(([, ok]) => ok), asWritten.filter(([, ok]) => !ok).map(([l]) => l));
  const failed = (await recorded(fn, mutated)).filter(([, ok]) => !ok).map(([l]) => l);
  t.check(`mutated: the guard "${expectFailed}…" fails`, failed.some(l => l.startsWith(expectFailed)), failed);
};
add('CTRL-RND-pending', "Negative control: with Eligibility and Settled source image as installed, RND-pending's guards fail: the slot reads Settled and shows the original while its rendition is pending", async t => {
  const installed = { [AP]: {
    Eligibility: Object.assign(r => { const v = FORMULAS[AP].Eligibility(r); return v === RENDITION.needed ? 'Holds' : v; }, { airtable: 'installed' }),
    'Settled source image': Object.assign(r => (String(r.get('State') || '') === 'In use' ? (r.get('Source image') || []).map(x => x.filename).join(', ') : ''), { airtable: 'installed' }) } };
  await control(t, pending, { formulas: installed }, 'at every step of S4');
});
add('CTRL-RND-hand', "Negative control: with Rendition state approving any recorded approval (no check of its ID, copy or record against this application), RND-hand's first guard fails: a copy replaced by hand is delivered", async t => {
  const loose = { [AP]: { 'Rendition state': Object.assign(r => {
    if (Number(r.get('Rendition needed')) !== 1) return '';
    return r.get('Rendition approval ID') ? RENDITION.approved : (r.get('Rendition') || []).length ? RENDITION.notApproved : RENDITION.none;
  }, { airtable: 'loose' }) } };
  await control(t, hand, { formulas: loose }, 'the approved copy replaced by another file');
});
add('CTRL-RND-requirement', "Negative control: with Rendition requirement reading the box instead of the recorded decision, RND-requirement's first guard fails: unticking it alone stops the rendition's delivery", async t => {
  const box = { [PS]: { 'Rendition requirement': Object.assign(r => (r.get('Rendition required') ? 1 : 0), { airtable: 'box' }) } };
  await control(t, requirement, { formulas: box }, 'unticked, not recorded');
});
add('CTRL-RND-race', "Negative control: with S8 taking its time after its read, RND-race's last guard fails: a change made during the press doesn't read as waiting", async t => {
  const late = SRC.s8.replace('  const time = new Date(); time.setUTCMilliseconds(0);\n  const at = time.toISOString();\n  const me = await T.selectRecordAsync(recordId, { fields: Object.values(F) });',
    '  const me = await T.selectRecordAsync(recordId, { fields: Object.values(F) });\n  const time = new Date(); time.setUTCMilliseconds(0);\n  const at = time.toISOString();');
  t.check('the mutation applies', late !== SRC.s8);
  await control(t, race, { src: late }, 'the change made during the press');
});
add('RND-seconds', "With date-times kept only to the whole second, floored or rounded, or only the last-modified time floored, a change made during S8's press still reads as waiting, and the file read is the one delivered", async t => {
  for (const precision of ['floor', 'round', 'modified']) await race({ check: (label, ok, detail) => t.check(`${precision}: ${label}`, ok, detail) }, { precision });
});
add('CTRL-RND-seconds', "Negative control: with the strict comparison (a change waits only when strictly after the approval), or with S8 keeping its milliseconds, RND-seconds' guard fails: a change during the press reads plain Approved", async t => {
  const strict = { [AP]: { 'Rendition state': Object.assign(r => {
    const v = FORMULAS[AP]['Rendition state'](r);
    return v === RENDITION.pending && Date.parse(r.get('Rendition draft changed at')) === Date.parse(r.get('Rendition approved at')) ? RENDITION.approved : v;
  }, { airtable: 'strict' }) } };
  await control(t, (u, o) => race(u, { precision: 'floor', ...o }), { formulas: strict }, 'the change made during the press');
  const ms = SRC.s8.replace('  const time = new Date(); time.setUTCMilliseconds(0);\n', '  const time = new Date();\n');
  t.check('the mutation applies', ms !== SRC.s8);
  await control(t, (u, o) => race(u, { precision: 'modified', ...o }), { src: ms }, 'the change made during the press');
});

// ---------------------------------------------------------------------------------------------
// The continuity reference
const MAY = "The room's geometry and layout, its architectural materials, and the light.";
// A campaign request with two written shots: World hero (the anchor) and Life in use.
function campaign(w = new World()) {
  const b = bath(w);
  const req = fx.request(w, { name: 'Bath campaign', workflow: 'Campaign', products: [b.P.vessel, b.P.towel] });
  const shot = (name, placement, direction) => { const id = w.add(SH, { Name: name, Brief: [req.id], Placement: placement, 'Shot direction': direction, 'Lines in shot': req.lines }); w.set(SH, id, { 'Products confirmed': true }); return id; };
  const hero = shot('World hero', 'campaign, world image', 'The vessel and the towel on a stone vanity, warm side light from a window at the left.');
  const life = shot('Life in use', 'campaign, in use', 'A hand and forearm reach for the folded towel beside the vessel.');
  return { ...b, req, hero, life };
}
const IMG = name => [{ url: `https://example.test/${name}.jpg`, filename: `${name}.jpg` }];
const shotRead = (w, s) => ({ standard: w.get(SH, s, 'Current standard'), prompt: w.get(SH, s, 'Current prompt') });

add('CNT-absent', 'No continuity reference configured: Continuity check empty; the shot Planned by the installed Plan check; its standard, prompt and kept references are what they were; Snapshot starts', async t => {
  const x = campaign(), { w } = x;
  const fresh = w.add(CA, { Shot: [x.life] });
  t.check('Continuity check empty, Continuity ready 0; Plan check Planned', w.get(SH, x.life, 'Continuity check') === '' && w.get(SH, x.life, 'Continuity ready') === 0 && w.get(SH, x.life, 'Plan check') === 'Planned');
  t.check('a new candidate: Snapshot starts; kept, it holds the reference images only', fx.snapshotTriggers(w, fresh) && same(fx.snapshotCells(w, x.life)['Reference images used'], w.get(SH, x.life, 'Reference images')) && !w.get(SH, x.life, 'Current standard').includes('Continuity'));
});

add('CNT-carried', "Life in use with No. 33 as its continuity reference: Ready; its standard and prompt gain one closing line each, naming the image and what it may and may not decide; its new candidates keep the image last; the anchor's standard is unchanged", t => carried(t));
async function carried(t, opts = {}) {
  const x = campaign(new World(opts)), { w } = x;
  const anchor = fx.snapshotCandidate(w, x.hero), earlier = fx.snapshotCandidate(w, x.life);
  const heroBefore = shotRead(w, x.hero), lifeBefore = shotRead(w, x.life), refs = w.get(SH, x.life, 'Reference images');
  t.check('setup: both shots read the new-workflow composition and are Planned; no continuity yet', heroBefore.standard.includes('\nProducts, in image order:\n') && w.get(SH, x.hero, 'Planned') === 1 && w.get(SH, x.life, 'Planned') === 1 && w.get(SH, x.life, 'Continuity ready') === 0, w.get(SH, x.life, 'Plan check'));
  w.advance(60_000);
  w.set(SH, x.life, { 'Continuity reference': [anchor], 'Continuity may decide': MAY });
  const no = w.get(CA, anchor, 'Record no.'), asOf = w.get(CA, anchor, 'Generated at');
  const line = `Continuity reference: No. ${no}, World hero // candidate 1, image as of ${asOf}. May decide: ${MAY} ${CONTINUITY.notStandard} Set by: ASK.`;
  const para = `The last attached image is a continuity reference, from an earlier image. Use it only for: ${MAY} ${CONTINUITY.notPrompt}`;
  const life = shotRead(w, x.life);
  t.check('Continuity check Ready, Continuity ready 1, the shot still Planned; the line names the record, its title, its image time, what it may decide, what it does not, and who set it',
    w.get(SH, x.life, 'Continuity check') === CONTINUITY.ready && w.get(SH, x.life, 'Continuity ready') === 1 && w.get(SH, x.life, 'Plan check') === 'Planned' && w.get(SH, x.life, 'Continuity line') === line, w.get(SH, x.life, 'Continuity line'));
  t.check("Life in use's standard: the standard before, then one line", life.standard === `${lifeBefore.standard}\n${line}`, life.standard);
  t.check('its prompt: the prompt before (opening, shot, request prompt, products paragraph, product lines, references), then one paragraph', life.prompt === `${lifeBefore.prompt}\n\n${para}`, life.prompt);
  t.check('the anchor shot\'s standard and prompt are unchanged, and No. 33 still reads "Same standard"', same(shotRead(w, x.hero), heroBefore) && w.get(CA, anchor, 'Standard check') === 'Same standard as when this image was made');
  t.check('a Life in use candidate kept before reads "The standard has changed since this image was made"', w.get(CA, earlier, 'Standard check') === 'The standard has changed since this image was made');
  const fresh = w.add(CA, { Shot: [x.life] });
  t.check('a new Life in use candidate: Snapshot starts', fx.snapshotTriggers(w, fresh));
  const next = fx.snapshotCandidate(w, x.life), heroNext = fx.snapshotCandidate(w, x.hero);
  t.check("kept, it holds the reference images, then No. 33's image last; its product copies are the shot's products", same(w.get(CA, next, 'Reference images used'), [...refs, ...w.get(CA, anchor, 'Image')]) && same(w.get(CA, next, 'Product image used'), w.get(SH, x.life, 'Product image')), w.get(CA, next, 'Reference images used'));
  t.check("Continuity image now: No. 33's image on a Life in use candidate, empty on the anchor's; Continuity check now Ready there, empty on the anchor's",
    same(w.get(CA, next, 'Continuity image now'), w.get(CA, anchor, 'Image')) && w.get(CA, heroNext, 'Continuity image now') == null && same(w.get(CA, next, 'Continuity check now'), [CONTINUITY.ready]) && w.get(CA, heroNext, 'Continuity check now') == null);
  t.check('a new anchor candidate keeps the reference images only', same(w.get(CA, heroNext, 'Reference images used'), w.get(SH, x.hero, 'Reference images')));
  return { x, anchor, next };
}

add('CNT-incomplete', "A configured continuity reference that is incomplete stops generation visibly, never drops out of the inputs: the shot reads Not planned with the reason, Snapshot doesn't start, and a candidate kept while it was ready is Held, so G2a's trigger doesn't hold; completed again, the shot is Planned", t => incomplete(t));
async function incomplete(t, opts = {}) {
  const x = campaign(new World(opts)), { w } = x;
  const anchor = fx.snapshotCandidate(w, x.hero), other = fx.snapshotCandidate(w, x.hero), blank = fx.snapshotCandidate(w, x.hero, { image: false });
  const two = fx.snapshotCandidate(w, x.hero); w.set(CA, two, { Image: [...IMG('a'), ...IMG('b')] });
  const comma = fx.snapshotCandidate(w, x.hero); w.set(CA, comma, { Image: IMG('hero, warm') });
  w.set(SH, x.life, { 'Continuity reference': [anchor], 'Continuity may decide': MAY });
  const kept = fx.snapshotCandidate(w, x.life, { image: false }); w.set(CA, kept, { 'Generate when ready': true });
  t.check('setup: complete, the shot Planned, and a candidate kept with the reference reads Ready to generate', w.get(SH, x.life, 'Plan check') === 'Planned' && w.get(CA, kept, 'Ready') === 'Ready to generate' && (w.get(CA, kept, 'Reference images used') || []).length === 2);
  const blocked = (label, cells, reason, shot = x.life) => {
    if (cells) w.set(SH, shot, cells);
    const fresh = w.add(CA, { Shot: [shot] });
    const why = { check: w.get(SH, shot, 'Continuity check'), plan: w.get(SH, shot, 'Plan check') };
    t.check(`${label}: Continuity check "${reason}"; Plan check "Not planned: the continuity reference is incomplete: …"; Planned 0; its line not in the standard`,
      why.check === reason && why.plan === `${CONTINUITY.notPlanned}${reason.replace('Incomplete: ', '')}` && w.get(SH, shot, 'Planned') === 0 && w.get(SH, shot, 'Continuity ready') === 0 && !w.get(SH, shot, 'Current standard').includes('Continuity reference:'), why);
    t.check(`${label}: a new candidate starts no Snapshot and reads Held, naming the Plan check`, !fx.snapshotTriggers(w, fresh) && w.get(CA, fresh, 'Ready') === HELD.notPlanned && w.get(CA, fresh, 'Status').startsWith('Held // the shot changed.'), w.get(CA, fresh, 'Ready'));
    if (shot === x.life) t.check(`${label}: the candidate kept with the reference is Held, so G2a's trigger (Ready to generate) doesn't hold`, w.get(CA, kept, 'Ready') === HELD.notPlanned && w.get(CA, kept, 'Ready') !== 'Ready to generate', w.get(CA, kept, 'Ready'));
    w.del(CA, fresh);
  };
  blocked('a link with nothing it may decide', { 'Continuity may decide': null }, CONTINUITY.role);
  blocked('a link with only spaces and line breaks for what it may decide', { 'Continuity may decide': ' \n\t ' }, CONTINUITY.role);
  blocked('what it may decide with no link', { 'Continuity reference': null, 'Continuity may decide': MAY }, CONTINUITY.count);
  blocked('two links', { 'Continuity reference': [anchor, other] }, CONTINUITY.count);
  blocked('a linked candidate without an image', { 'Continuity reference': [blank] }, CONTINUITY.image);
  blocked('a linked candidate with two files', { 'Continuity reference': [two] }, CONTINUITY.image);
  blocked('a file name with a comma', { 'Continuity reference': [comma] }, CONTINUITY.image);
  w.set(SH, x.life, { 'Continuity reference': null, 'Continuity may decide': ' \n ' });
  t.check('no link and only spaces for what it may decide: nothing configured; Continuity check empty; Planned', w.get(SH, x.life, 'Continuity check') === '' && w.get(SH, x.life, 'Planned') === 1, w.get(SH, x.life, 'Continuity check'));
  w.set(SH, x.life, { 'Continuity reference': [anchor], 'Continuity may decide': MAY });
  w.advance(60_000); w.set(CA, anchor, { Image: null });
  blocked("the reference's image removed", null, CONTINUITY.image);
  w.set(CA, anchor, { Image: IMG('anchor') });
  t.check('completed again: Ready, Planned; a new candidate starts Snapshot', w.get(SH, x.life, 'Continuity check') === CONTINUITY.ready && w.get(SH, x.life, 'Planned') === 1 && fx.snapshotTriggers(w, w.add(CA, { Shot: [x.life] })));
  const vessel = w.add('Products', { Name: 'Bath Vessel', 'Must stay true': 'A vessel.', Image: IMG('v') });
  const brief = w.add('Briefs', { Name: 'Walkthrough', Workflow: 'Walkthrough', Direction: 'Calm.', Products: [vessel], References: [w.add('References', { Name: 'Light', Image: IMG('r') })] });
  const walk = w.add(SH, { Name: 'Editorial hero', Brief: [brief], Placement: 'Website hero', 'Shot direction': 'A calm room.', 'Lines in shot': [fx.line(w, brief, vessel)] });
  const liveBefore = shotRead(w, walk);
  blocked('a walkthrough shot', { 'Continuity reference': [anchor], 'Continuity may decide': MAY }, CONTINUITY.notNewWorkflow, walk);
  t.check("the walkthrough shot's standard and prompt remain the live texts' values", same(shotRead(w, walk), liveBefore));
}

add('CNT-image-changed', "The reference's image replaced: Life in use's standard names the new image time, so a candidate kept with the old reads changed", async t => {
  const { x, anchor, next } = await carried({ check: () => true }), { w } = x;
  t.check('kept with the reference: "Same standard"', w.get(CA, next, 'Standard check') === 'Same standard as when this image was made');
  w.advance(60_000); w.set(CA, anchor, { Image: IMG('anchor-v2') });
  t.check("No. 33's image replaced: the line names its new time, and the candidate reads changed", w.get(SH, x.life, 'Continuity line').includes(`image as of ${w.get(CA, anchor, 'Generated at')}.`) && w.get(CA, next, 'Standard check') === 'The standard has changed since this image was made');
});

// The texts this change installed are CONTINUITY_INSTALLED, the human composition change's baseline (the
// change of 2026-10-31, HCR-text), so they, not the texts this folder now holds, are checked against INSTALLED.
add('CNT-text', 'Current standard and Current prompt, as this change installed them, are their installed texts plus one addition each, inside the new-workflow branch; Plan check is its installed text inside one test of Continuity check; Continuity ready reads Continuity check', async t => {
  const std = CONTINUITY_INSTALLED.currentStandard, prompt = CONTINUITY_INSTALLED.currentPrompt, plan = CONTINUITY_INSTALLED.planCheck;
  const addStd = ' & IF({Continuity ready}, "\\n" & {Continuity line}, "")', addPrompt = ' & IF({Continuity ready}, "\\n\\n" & {Continuity prompt}, "")';
  t.check('Current standard: the installed text with one addition after the exception', std.split(addStd).length === 2 && std.replace(addStd, '') === INSTALLED.currentStandard, std);
  t.check('Current prompt: the installed text with one addition after the references', prompt.split(addPrompt).length === 2 && prompt.replace(addPrompt, '') === INSTALLED.currentPrompt, prompt);
  t.check('each addition sits before the live default branch', std.indexOf(addStd) < std.lastIndexOf('ARRAYJOIN({Brief standard}') && prompt.indexOf(addPrompt) < prompt.lastIndexOf('ARRAYJOIN({Brief prompt}'));
  t.check('Plan check: IF(an incomplete Continuity check, its Not planned text, the installed text)',
    plan === `IF(LEFT({Continuity check}, 10) = "Incomplete", "${CONTINUITY.notPlanned}" & SUBSTITUTE({Continuity check}, "Incomplete: ", ""),\n${INSTALLED.planCheck})`, plan.slice(0, 160));
  t.check('Continuity ready: Continuity check is Ready', text(SH, 'Continuity ready') === 'IF({Continuity check} = "Ready", 1, 0)');
});

add('CTRL-CNT', "Negative control: with Plan check as installed (no continuity test), CNT-incomplete's guards fail: an incomplete reference leaves the shot Planned, Snapshot starts, and the candidate is kept without it (the reference drops out of the inputs)", async t => {
  const installed = { [SH]: { 'Plan check': Object.assign(r => FORMULAS[SH]['Plan check'](r).startsWith(CONTINUITY.notPlanned) ? FORMULAS[SH]['Plan check']({ id: r.id, get: n => (n === 'Continuity check' ? '' : r.get(n)) }) : FORMULAS[SH]['Plan check'](r), { airtable: 'installed' }) } };
  await control(t, incomplete, { formulas: installed }, 'a link with nothing it may decide: Continuity check');
  const failed = (await recorded(incomplete, { formulas: installed })).filter(([, ok]) => !ok).map(([l]) => l);
  t.check('mutated: Snapshot starts for the incomplete reference and the kept candidate stays Ready to generate', failed.some(l => l.startsWith('a link with nothing it may decide: a new candidate starts no Snapshot')) && failed.some(l => l.startsWith('a link with nothing it may decide: the candidate kept with the reference is Held')), failed);
});
