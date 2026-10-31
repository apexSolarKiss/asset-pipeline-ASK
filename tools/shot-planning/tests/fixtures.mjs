// Shared fixtures for the shot-planning tests: the exact script bytes, their input configs, record
// builders, the demo catalog (v6 §3–§5), presses, and stand-ins for the upstream writes that S2,
// Snapshot, Accept and S4 make, so the S1/S6/S7 cases can reach a settled image before those
// scripts' own tests exist. A stand-in writes what v6 says its script or automation writes, as a
// setup write (never a hand edit), with its "written at" times; tests of S2–S5 press the real scripts.
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { World, start, runAlone, press } from '../sim/world.mjs';
import { BINDINGS } from '../sim/schema.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const script = file => readFileSync(join(ROOT, file), 'utf8');
export const SRC = { s1: script('s1-make-product-slots.js'), s6: script('s6-adopt-guide.js'), s7: script('s7-record-decision.js') };
// Added by part 2: S2 and S3 (their own tests are in shots-and-replan.test.mjs).
SRC.s2 = script('s2-make-shots.js'); SRC.s3 = script('s3-replan.js');
// Added by part 3: S4 and S5 (their own tests are in applications.test.mjs).
SRC.s4 = script('s4-apply-acceptance.js'); SRC.s5 = script('s5-apply-use-decision.js');
// Added 2026-10-30: S8 (its tests are in rendition-and-continuity.test.mjs).
SRC.s8 = script('s8-approve-rendition.js');
// Added 2026-10-30 (v3): Snapshot's reference list (its tests are in snapshot-references.test.mjs).
SRC.snapshot = script('snapshot-references.js');

// Input config for a press, by field name (the default) or translated to table and field IDs.
export const cfg = (name, recordId, extra = {}) => ({ ...BINDINGS[name], recordId, ...extra });
export function idConfig(w, name, recordId, extra = {}) {
  const b = BINDINGS[name], out = {};
  const tableKeys = Object.keys(b).filter(k => k.endsWith('Table') || k === 'table');
  const tableOf = k => { // the table a field key belongs to, by the script's own grouping
    if (name === 's7product' || name === 's7slot' || name === 's8') return b.table;
    if (name === 's6') return b.guidesTable;
    const prefix = { request: 'requestsTable', slotPlanningNote: 'requestsTable', line: 'linesTable', product: 'productsTable', assigned: 'productsTable', assignment: 'productsTable', guide: 'guidesTable', adopted: 'guidesTable', gs: 'guideSlotsTable' };
    for (const [p, t] of Object.entries(prefix)) if (k.startsWith(p)) return b[t];
    return b.slotsTable;
  };
  for (const [k, v] of Object.entries(b)) {
    if (tableKeys.includes(k)) out[k] = w.t(v).id;
    else if (k.endsWith('Field')) { const t = w.t(tableOf(k)); out[k] = w.f(t, v).id; }
    else out[k] = v;
  }
  return { ...out, recordId, ...extra };
}

export const pressS1 = (w, requestId, extra, src = SRC.s1) => press(w, src, cfg('s1', requestId, extra));
export const pressS6 = (w, guideId, extra, src = SRC.s6) => press(w, src, cfg('s6', guideId, extra));
export const pressS7Product = (w, productId, extra, src = SRC.s7) => press(w, src, cfg('s7product', productId, extra));
export const pressS7Slot = (w, slotId, extra, src = SRC.s7) => press(w, src, cfg('s7slot', slotId, extra));
export const pressS2 = (w, requestId, extra, src = SRC.s2) => press(w, src, cfg('s2', requestId, extra));
export const pressS3Shot = (w, shotId, extra, src = SRC.s3) => press(w, src, cfg('s3', shotId, { kind: 'shot', ...extra }));
export const pressS3Slot = (w, slotId, extra, src = SRC.s3) => press(w, src, cfg('s3', slotId, { kind: 'slot', ...extra }));
export const pressS4 = (w, acceptedId, extra, src = SRC.s4) => press(w, src, cfg('s4', acceptedId, extra));
export const pressS5 = (w, decisionId, extra, src = SRC.s5) => press(w, src, cfg('s5', decisionId, extra));
export const pressS8 = (w, applicationId, extra, src = SRC.s8) => press(w, src, cfg('s8', applicationId, extra));

// A decision record: by ASK, entered on ASK's relay, from a source that names its own occasion.
let occasion = 0;
export const decision = (source, by = 'ASK', entered = "claude-code, on ASK's relay") => ({ 'Decided by': by, 'Decision source': source || `ASK's relay of 2026-10-29, decision ${++occasion}`, 'Entered by': entered });

// ---- builders
export function guide(w, name, slots, { destination = 'Product page', test = false } = {}) {
  const id = w.add('Shot guides', { Name: name, Destination: destination, Test: test });
  const ids = slots.map(s => w.add('Guide slots', { Name: s.name, Guide: [id], Position: s.position, 'Placement label': s.label ?? `product page, image ${s.position}`,
    View: s.view ?? `${s.name}: the product alone.`, Required: s.required || 'Always', 'Fill rule': s.fill || 'Made for each product', Test: test }));
  return { id, slots: ids };
}
export function product(w, { name, style, color, size, facts, image = true, test = false }) {
  return w.add('Products', { Name: name, Style: style, Color: color, Size: size, 'Must stay true': facts, Image: image ? [{ url: `https://example.test/${name}.jpg`, filename: `${name.replaceAll(',', '')}.jpg` }] : null, Test: test });
}
export function request(w, { name, workflow = 'Product pages', products = [], supersedes = null, test = false, reference = true }) {
  const refs = reference ? [w.add('References', { Name: `${name} reference`, Image: [{ url: 'https://example.test/ref.jpg', filename: 'ref.jpg' }] })] : null;
  const id = w.add('Briefs', { Name: name, Workflow: workflow, Direction: 'Clean, consistent product photographs on a pale surface against a warm-white wall.', References: refs, Supersedes: supersedes, Test: test });
  const lines = products.map(p => line(w, id, p, test));
  return { id, lines };
}
export const line = (w, requestId, productId, test = false) => w.add('Product lines', { Request: [requestId], Product: [productId], Test: test });

export async function adopt(w, guideId, source) { w.set('Shot guides', guideId, decision(source)); return pressS6(w, guideId); }
export async function assign(w, productId, guideId, basis = 'a product of this guide\'s classification', source) {
  w.set('Products', productId, { 'Shot guide': [guideId], 'Assignment basis': basis, ...decision(source) }); return pressS7Product(w, productId);
}
export async function recordSlot(w, slotId, cells, source, by) { w.set('Product-page slots', slotId, { ...cells, ...decision(source, by) }); return pressS7Slot(w, slotId); }

// ---- reads
export const val = (w, table, id, field) => w.get(table, id, field);
export const slot = (w, id, field) => w.get('Product-page slots', id, field);
export const slotsOn = (w, lineId) => w.find('Product-page slots', r => (r.get('Line') || []).includes(lineId));
export const slotAt = (w, lineId, position, { guideSlot } = {}) => {
  const hits = slotsOn(w, lineId).filter(id => slot(w, id, 'Kept position') === position && (!guideSlot || (slot(w, id, 'Guide slot') || []).includes(guideSlot)));
  return hits[hits.length - 1];
};
export const note = (w, requestId) => w.get('Briefs', requestId, 'Slot planning note') || '';
export const stored = (w, table, id) => JSON.stringify(w.t(table).records.get(id).cells);

// ---- the demo catalog (v6 §3, §4, §5)
export const VIEWS = {
  front: 'The whole vessel, front on, with even space around it. The product alone: no props, people or text.',
  threeQuarter: 'An angled view in which the rim and the depth of the opening read. The product alone.',
  glaze: "Close on the vessel's surface, so the glaze's texture and variation read; the vessel's edges may leave the frame. The product alone.",
  setting: 'The product in a room or set, from an image accepted for a collection, campaign or editorial use.',
  folded: 'Folded and squared, so the edge band and the pile or grid read. The product alone.',
  hanging: 'Hung full length from one plain hook, so its drape and length read. The product alone.',
  weave: 'Close on the weave and edge band, so the pile or grid reads. The product alone.',
};
const SHARE = 'Shared across sizes of one style and color', PICK = 'An accepted image that shows the product', MAKE = 'Made for each product';
export const TERRY = 'A white terry towel with a plain woven edge band. Keep its color, pile and edge band.';
export function bath(w = new World()) {
  const vessel = guide(w, 'Ceramic vessel', [
    { name: 'Front', position: 1, view: VIEWS.front }, { name: 'Three-quarter', position: 2, view: VIEWS.threeQuarter },
    { name: 'Glaze detail', position: 3, view: VIEWS.glaze }, { name: 'In a setting', position: 4, view: VIEWS.setting, required: 'As needed', fill: PICK }]);
  const textile = guide(w, 'Bath textile', [
    { name: 'Folded', position: 1, view: VIEWS.folded, fill: SHARE }, { name: 'Hanging', position: 2, view: VIEWS.hanging },
    { name: 'Weave detail', position: 3, view: VIEWS.weave, fill: SHARE }, { name: 'In a setting', position: 4, view: VIEWS.setting, required: 'As needed', fill: PICK }]);
  const P = {
    vessel: product(w, { name: 'Bath Vessel', style: 'Bath vessel', color: 'natural glaze', size: 'one size', facts: 'A bath vessel in a natural glaze. Keep its glaze, profile and rim.' }),
    towel: product(w, { name: 'Bath Towel', style: 'Terry towel', color: 'white', size: 'bath', facts: TERRY }),
    sheet: product(w, { name: 'Bath Sheet', style: 'Terry towel', color: 'white', size: 'sheet', facts: TERRY }),
    hand: product(w, { name: 'Hand Towel', style: 'Waffle towel', color: 'oat', size: 'hand', facts: 'An oat waffle-weave towel with a flat woven edge. Keep its color, waffle grid and edge.' }),
  };
  const req = request(w, { name: 'Bath product pages', products: [P.vessel, P.towel, P.sheet, P.hand] });
  const L = { vessel: req.lines[0], towel: req.lines[1], sheet: req.lines[2], hand: req.lines[3] };
  return { w, vessel, textile, P, req, L };
}
// The catalog with both product guides adopted, all four products assigned, and S1 pressed.
export async function bathPlanned(w) {
  const b = bath(w);
  await adopt(b.w, b.vessel.id); await adopt(b.w, b.textile.id);
  await assign(b.w, b.P.vessel, b.vessel.id, 'a ceramic vessel'); for (const p of ['towel', 'sheet', 'hand']) await assign(b.w, b.P[p], b.textile.id, 'a woven bath textile sold in sizes');
  b.s1 = await pressS1(b.w, b.req.id);
  return b;
}

// ---- stand-ins for S2, Snapshot, Accept and S4 (setup writes, as those write them; see header)
let shotNo = 0;
export function makeShot(w, slotIds, { madeAs, name } = {}) {
  const first = slotIds[0];
  const lineId = w.get('Product-page slots', first, 'Line')[0];
  const reqId = w.get('Product-page slots', first, 'Request')[0];
  const as = madeAs || (w.get('Product-page slots', first, 'Operative fulfillment') === 'Share' ? 'Share' : 'Make');
  const gsId = w.get('Product-page slots', first, 'Guide-slot ID');
  const pairKey = as === 'Share' ? `${reqId}${gsId}${w.get('Product-page slots', first, 'Share signature')}` : `${lineId}${gsId}`; // §6 Pair key
  const id = w.add('Shots', { Name: name || `${w.get('Product-page slots', first, 'Name')} shot ${++shotNo}`, Brief: [reqId], 'Lines in shot': [lineId], 'Made as': as, 'Pair key': pairKey });
  for (const s of slotIds) w.set('Product-page slots', s, { Shot: [id] }); // S2 links each slot to its shot
  return id;
}
// Snapshot's stand-in writes the kept inputs (Standard used, Prompt used, Intended use, the image
// copies, Slots kept, Products kept); the generator's write of Image moves Generated at (the
// last-modified time of Image), so a candidate made without an image has no Image cell at all.
// The reference copies are the shot's reference images, then its continuity image while the shot's
// Continuity ready is 1 (the change of 2026-10-30, which Snapshot makes through Continuity image now).
export const snapshotCells = (w, shotId) => ({ Shot: [shotId], 'Number in shot': (w.get('Shots', shotId, 'Candidates') || []).length + 1,
  'Standard used': w.get('Shots', shotId, 'Current standard'), 'Prompt used': w.get('Shots', shotId, 'Current prompt'), 'Intended use': w.get('Shots', shotId, 'Effective placement'),
  'Product image used': w.get('Shots', shotId, 'Product image'),
  'Reference images used': [...(w.get('Shots', shotId, 'Reference images') || []), ...(w.get('Shots', shotId, 'Continuity ready') === 1 ? w.get('Shots', shotId, 'Continuity image') || [] : [])],
  'Slots kept': w.get('Shots', shotId, 'Current slot basis'), 'Products kept': w.get('Shots', shotId, 'Current product basis') });
export const CANDIDATE_IMAGE = shotId => [{ url: 'https://example.test/c.jpg', filename: `candidate-${shotId}.jpg` }];
// Snapshot's trigger (the live automation's conditions): a candidate linked to a shot, with Standard used
// and Image empty, whose Shot planned is 1. A shot that isn't planned (its Plan check) starts no Snapshot.
export const snapshotTriggers = (w, candidateId) => (w.get('Candidates', candidateId, 'Shot') || []).length > 0
  && !w.get('Candidates', candidateId, 'Standard used') && !w.get('Candidates', candidateId, 'Image') && w.get('Candidates', candidateId, 'Shot planned') === 1;
export function snapshotCandidate(w, shotId, { image = true } = {}) {
  return w.add('Candidates', { ...snapshotCells(w, shotId), ...(image ? { Image: CANDIDATE_IMAGE(shotId) } : {}) });
}
// Accept's stand-in: the accepted record, as Accept writes it (Accepted at is its created time).
export const accept = (w, candidateId) => w.add('Accepted images', {
  'Recorded as': w.get('Candidates', candidateId, 'Title'), 'Candidate record no.': [candidateId], Shot: w.get('Candidates', candidateId, 'Shot'),
  Image: w.get('Candidates', candidateId, 'Image'), 'Approved for': w.get('Candidates', candidateId, 'Intended use'), Standard: w.get('Candidates', candidateId, 'Standard used'),
  'Accepted on condition': w.get('Candidates', candidateId, 'Accept on condition'), // v2 (2026-10-30): Accept's one added mapping
  'Accepted by': 'ASK', 'Accepted by ID': 'usrSIMULATED00001' });
export function applyAcceptance(w, acceptedId) {
  const cand = w.get('Accepted images', acceptedId, 'Candidate record no.')[0];
  const lines = (w.get('Candidates', cand, 'Slots kept') || '').split('\n').filter(Boolean);
  const apps = [];
  for (const l of lines) {
    const [slotId, keptLine, productId, receiving] = l.split(' ‖ ');
    const inUse = (w.get('Product-page slots', slotId, 'In use count') || 0) > 0;
    apps.push(w.add('Applications', { 'Accepted image': [acceptedId], Slot: [slotId], 'Application key': `acc:${acceptedId}/${slotId}`, Basis: 'Accepted for this use',
      'Kept destination': `${keptLine} ‖ ${productId}`, 'Kept receiving basis': receiving, 'Kept label': 'made for this page', 'Recorded at': w.get('Accepted images', acceptedId, 'Accepted at'),
      Current: !inUse, 'Current set at': w.iso(), Test: !!w.get('Candidates', cand, 'Test') }));
  }
  w.set('Accepted images', acceptedId, { 'Applications done': true, 'Application progress': `Applied to ${apps.length} of ${lines.length} slots` });
  return apps;
}
// A slot set (one shot) made, generated, accepted and applied: each slot Settled.
export function settle(w, slotIds, opts) {
  const shot = makeShot(w, slotIds, opts), candidate = snapshotCandidate(w, shot), accepted = accept(w, candidate), apps = applyAcceptance(w, accepted);
  return { shot, candidate, accepted, apps };
}

export { World, start, runAlone, press };
