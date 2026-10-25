// Tests for candidate-numbering.js (N2). Runs the exact script bytes against a simulated base.
// By default the simulated base applies one table operation at a time, in an order each test
// picks, and each read sees every write committed before it: the stated assumption. Record IDs
// are random and an unsorted query returns records in an arbitrary but stable order, as in
// Airtable. Two weaker modes are also run: torn reads, which may miss a row committed while they
// are in flight, and lagging autonumbers. These tests cannot show that Airtable meets the assumption.
// Usage: node candidate-numbering.test.mjs [script.js] [--n1 <N1 script>]
//   --n1 also runs the stale-write/failure/deletion regression against the earlier N1 allocator,
//   as a control that the regression can fail for the reason it was written.
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const argv = process.argv.slice(2);
const n1At = argv.indexOf('--n1');
const N1 = n1At >= 0 ? readFileSync(argv[n1At + 1], 'utf8') : null;
const scriptArg = argv.find((a, i) => !a.startsWith('--') && !(n1At >= 0 && i === n1At + 1));
const SRC = readFileSync(scriptArg || join(dirname(fileURLToPath(import.meta.url)), 'candidate-numbering.js'), 'utf8');

function mulberry32(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const settle = async () => { for (let i = 0; i < 6; i++) await new Promise(r => setImmediate(r)); };
const byNumber = (a, b) => a - b;
class CrashSignal extends Error {}

// Two installations of N2: one bound by field name, one by field ID.
const DEMO = {
  tables: [
    { id: 'tblCand', name: 'Candidates', fields: [['fldRecNo', 'Record no.', 'autoNumber'], ['fldShot', 'Shot', 'multipleRecordLinks'], ['fldTest', 'Test', 'checkbox'], ['fldNum', 'Number in shot', 'number'], ['fldRetry', 'Retry numbering', 'checkbox']] },
    { id: 'tblShots', name: 'Shots', fields: [['fldShotName', 'Shot', 'singleLineText']] },
    { id: 'tblIssued', name: 'Issued numbers', fields: [['fldOrder', 'Issue no.', 'autoNumber'], ['fldRowShot', 'Shot', 'multipleRecordLinks'], ['fldCandKey', 'Candidate key', 'singleLineText'], ['fldIssued', 'Number', 'number']] },
  ],
  cfg: { candidatesTable: 'Candidates', shotField: 'Shot', testField: 'Test', numberField: 'Number in shot',
    issuedTable: 'Issued numbers', orderField: 'Issue no.', rowShotField: 'Shot', candidateKeyField: 'Candidate key', issuedNumberField: 'Number' },
  cand: 'tblCand', shots: 'tblShots', issued: 'tblIssued', shot: 'fldShot', test: 'fldTest', number: 'fldNum', recordNo: 'fldRecNo',
  rowShot: 'fldRowShot', candKey: 'fldCandKey', order: 'fldOrder', issuedNo: 'fldIssued',
};
const PILOT = {
  tables: [
    { id: 'tblC2', name: 'candidates', fields: [['fldR2', 'record_no', 'autoNumber'], ['fldS2', 'slot', 'multipleRecordLinks'], ['fldT2', 'smoke_test', 'checkbox'], ['fldN2', 'number_in_shot', 'number'], ['fldY2', 'retry_numbering', 'checkbox']] },
    { id: 'tblS2', name: 'output_slots', fields: [['fldSN2', 'slot', 'singleLineText']] },
    { id: 'tblI2', name: 'issued_numbers', fields: [['fldO2', 'issue_no', 'autoNumber'], ['fldK2', 'slot', 'multipleRecordLinks'], ['fldCK2', 'candidate_key', 'singleLineText'], ['fldIN2', 'number', 'number']] },
  ],
  cfg: { candidatesTable: 'tblC2', shotField: 'fldS2', testField: 'fldT2', numberField: 'fldN2',
    issuedTable: 'tblI2', orderField: 'fldO2', rowShotField: 'fldK2', candidateKeyField: 'fldCK2', issuedNumberField: 'fldIN2' },
  cand: 'tblC2', shots: 'tblS2', issued: 'tblI2', shot: 'fldS2', test: 'fldT2', number: 'fldN2', recordNo: 'fldR2',
  rowShot: 'fldK2', candKey: 'fldCK2', order: 'fldO2', issuedNo: 'fldIN2',
};
// The earlier N1 allocator's schema, for the --n1 control only, read from the first base in N1's own
// field map, so that no installation's IDs are written here.
function n1Schema(src) {
  const m = /const BASES = (\{[\s\S]*?\n\});/.exec(src);
  if (!m) throw new Error('--n1: no BASES field map found in the N1 script');
  const [baseId, B] = Object.entries(new Function(`return ${m[1]}`)())[0];
  return {
    baseId,
    tables: [
      { id: B.candidates, name: 'Candidates', fields: [[B.recordNo, 'Record no.', 'autoNumber'], [B.shot, 'Shot', 'multipleRecordLinks'], [B.test, 'Test', 'checkbox'], ['fldN1Claim', B.claim, 'number'], ['fldN1Number', B.number, 'number']] },
      { id: B.shots, name: 'Shots', fields: [['fldN1Last', B.last, 'number']] },
    ],
    cfg: {}, cand: B.candidates, shots: B.shots, shot: B.shot, test: B.test, number: 'fldN1Number', recordNo: B.recordNo,
  };
}
const N1DEMO = N1 ? n1Schema(N1) : null;

const ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
class World {
  // prefix false: a row's autonumber is fixed when its creation is requested but committed later,
  //   so a read can see a later row without an earlier one (the assumption broken).
  // torn: a read sees everything committed before it began, and only some rows created while
  //   it was in flight (weaker than an atomic read, still within the assumption's wording).
  // lag k: a new row's autonumber reads as empty for the next k operations.
  constructor(S, { prefix = true, torn = false, lag = 0, seed = 1 } = {}) {
    this.S = S; this.prefix = prefix; this.torn = torn; this.lag = lag; this.baseId = S.baseId || 'appSIMULATED00000';
    this.tables = new Map(S.tables.map(t => [t.id, { id: t.id, name: t.name, fields: t.fields.map(([id, name, type]) => ({ id, name, type })), records: new Map(), auto: new Map() }]));
    this.pending = []; this.violations = []; this.rewrites = 0; this.applied = 0; this.idRng = mulberry32(seed * 7 + 3); this.rng = mulberry32(seed * 13 + 5);
    this.issued = new Map(); // shot -> Map(number -> candidate) of every number written to a candidate or a row, kept after deletion
    this.byRun = new Set();  // candidates whose number a run wrote
    this.visibleAt = new Map(); // row -> the operation count from which its autonumber reads
  }
  newId() { let s = 'rec'; for (let i = 0; i < 14; i++) s += ID_CHARS[Math.floor(this.idRng() * ID_CHARS.length)]; return s; }
  t(idOrName) { const t = this.tables.get(idOrName) || [...this.tables.values()].find(x => x.name === idOrName); if (!t) throw new Error(`No table "${idOrName}"`); return t; }
  f(t, idOrName) { const f = t.fields.find(x => x.id === idOrName || x.name === idOrName); if (!f) throw new Error(`No field "${idOrName}" in table "${t.name}"`); return f; }
  autonumber(t, cells) { for (const f of t.fields) if (f.type === 'autoNumber' && cells[f.id] == null) { const n = (t.auto.get(f.id) || 0) + 1; t.auto.set(f.id, n); cells[f.id] = n; } }
  // Direct edits, outside any run: the setup, and what an operator does by hand.
  add(tableId, cells = {}) { const t = this.t(tableId), id = this.newId(), c = { ...cells }; this.autonumber(t, c); t.records.set(id, c); return id; }
  set(tableId, id, cells) { Object.assign(this.t(tableId).records.get(id), cells); }
  del(tableId, id) { this.t(tableId).records.delete(id); }
  get(tableId, id, field) { const r = this.t(tableId).records.get(id); return r ? (r[field] ?? null) : undefined; }
  rows(shotId) { const S = this.S; return [...this.t(S.issued).records.entries()].filter(([, c]) => (c[S.rowShot] || []).some(l => l.id === shotId)).sort((a, b) => a[1][S.order] - b[1][S.order]); }
  // Unsorted queries return records in an arbitrary but stable order: here, by record ID.
  ordered(t) { return [...t.records.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1)); }
  snap(id, cells, t, fields) {
    const c = JSON.parse(JSON.stringify(cells)), loaded = fields && fields.map(x => this.f(t, x).id), w = this;
    if (this.visibleAt.has(id) && this.applied < this.visibleAt.get(id)) for (const f of t.fields) if (f.type === 'autoNumber') c[f.id] = null;
    return { id, getCellValue(x) { const fid = w.f(t, x).id; if (loaded && !loaded.includes(fid)) throw new Error(`field ${x} was not loaded`); return c[fid] ?? null; } };
  }
  claim(shot, n, who, kind) { // the reuse oracle: one holder per number per shot, forever
    const seen = this.issued.get(shot) || new Map(); this.issued.set(shot, seen);
    if (seen.has(n) && seen.get(n) !== who) this.violations.push(`reuse or duplicate: ${n} in ${shot} (${kind}; held by ${seen.get(n)}, now ${who})`);
    seen.set(n, who);
  }
  write(t, id, cells, run) {
    const r = t.records.get(id); if (!r) throw new Error(`Record ${id} not found in ${t.name}`);
    const S = this.S, c = {};
    for (const [k, v] of Object.entries(cells)) { const f = this.f(t, k); if (f.type === 'autoNumber') throw new Error('cannot write an autonumber'); c[f.id] = v; }
    if (t.id === S.cand && S.number in c && c[S.number] != null) {
      const old = r[S.number] ?? null, n = c[S.number];
      if (old != null && old !== n) this.violations.push(`changed: ${id} ${old} -> ${n}`);
      else if (old === n) this.rewrites++;
      const shot = (r[S.shot] || [])[0]?.id; if (shot) this.claim(shot, n, id, 'candidate');
      if (run) this.byRun.add(id);
    }
    if (S.issued && t.id === S.issued && S.issuedNo in c && c[S.issuedNo] != null) {
      const shot = (r[S.rowShot] || [])[0]?.id; if (shot) this.claim(shot, c[S.issuedNo], r[S.candKey], 'row');
    }
    Object.assign(r, c);
  }
  // One table operation for a run, applied when the test picks it. A crash armed at this
  // operation makes it fail before or after it is applied.
  op(run, kind, apply, extra = {}) {
    run.ops++; if (kind === 'read') run.queries++; else run.mutations++;
    if (run.crash && run.crash.at === run.ops) run.kill = run.crash.when;
    return new Promise((resolve, reject) => this.pending.push({ run, kind, apply, resolve, reject, ...extra }));
  }
  api(run) {
    const w = this;
    return { id: w.baseId, getTable(x) {
      const t = w.t(x);
      return { id: t.id, name: t.name,
        getField: y => { const f = w.f(t, y); return { id: f.id, name: f.name, type: f.type }; },
        selectRecordAsync: (id, { fields } = {}) => w.op(run, 'read', () => (t.records.has(id) ? w.snap(id, t.records.get(id), t, fields) : null)),
        selectRecordsAsync: ({ fields } = {}) => w.op(run, 'read', begun => ({ records: w.ordered(t)
          .filter(([id]) => !begun || begun.has(id) || w.rng() < 0.5)
          .map(([id, c]) => w.snap(id, c, t, fields)) }), { query: true }),
        createRecordAsync: cells => {
          const c = {}; for (const [k, v] of Object.entries(cells)) c[w.f(t, k).id] = v;
          if (!w.prefix) w.autonumber(t, c); // the assumption broken: the number is fixed before the commit
          return w.op(run, 'create', () => { w.autonumber(t, c); const id = w.newId(); t.records.set(id, c); if (w.lag) w.visibleAt.set(id, w.applied + w.lag); return id; });
        },
        updateRecordAsync: (id, cells) => w.op(run, 'write', () => w.write(t, id, cells, run)),
      };
    } };
  }
  // Apply one pending operation; a killed run's next operation fails without being applied.
  // A torn query is applied in two steps: it begins, then other operations may land, then it ends.
  apply(p) {
    if (this.torn && p.query && !p.begun) { p.begun = new Set([...this.tables.values()].flatMap(t => [...t.records.keys()])); return; }
    this.pending.splice(this.pending.indexOf(p), 1); this.applied++;
    if (p.run.kill === 'before') { p.run.kill = null; p.reject(new CrashSignal('crashed')); return; }
    let out; try { out = p.apply(p.begun); } catch (e) { p.reject(e); return; }
    if (p.run.kill === 'after') { p.run.kill = null; p.reject(new CrashSignal('crashed')); return; }
    p.resolve(out);
  }
}

// Start one run of a script for one record. The run never rejects; it records { ok, error, logs }.
function start(world, recordId, src = SRC, crash = null) {
  const run = { recordId, done: false, ok: null, logs: [], ops: 0, queries: 0, mutations: 0, crash, kill: null };
  let clock = 1_700_000_000_000, configured = false;
  class FakeDate extends Date { constructor(...a) { super(...(a.length ? a : [clock])); } static now() { return clock; } }
  const env = {
    input: { config: () => { if (configured) throw new Error('input.config() called twice'); configured = true; return { ...world.S.cfg, recordId }; } },
    base: world.api(run), console: { log: m => run.logs.push(String(m)) },
    Date: FakeDate, Atomics: { wait: (_a, _i, _v, ms) => { clock += ms; } }, SharedArrayBuffer, Int32Array,
  };
  const fn = new Function(...Object.keys(env), `return (async () => {\n${src}\n})();`);
  run.promise = Promise.resolve().then(() => fn(...Object.values(env)))
    .then(() => { run.ok = true; }, e => { run.ok = false; run.error = e; })
    .finally(() => { run.done = true; });
  return run;
}

// Random interleaving of every pending operation, with optional events at given steps.
async function drive(world, runs, rng, events = []) {
  let step = 0;
  for (;;) {
    await settle();
    for (const ev of events) if (!ev.fired && step >= ev.at) { ev.fired = true; ev.fn(world); }
    if (!world.pending.length) { if (runs.every(r => r.done)) break; await settle(); if (!world.pending.length && runs.every(r => r.done)) break; if (!world.pending.length) throw new Error('stalled'); }
    world.apply(world.pending[Math.floor(rng() * world.pending.length)]);
    step++;
  }
  return runs;
}
// Scripted schedules: step only one run's operations.
async function stepRun(world, run) { await settle(); const p = world.pending.find(x => x.run === run); if (!p) return false; world.apply(p); if (p.begun && world.pending.includes(p)) world.apply(p); await settle(); return true; }
async function runAlone(world, run) { while (!run.done) { if (!(await stepRun(world, run)) && !run.done) { await settle(); if (!world.pending.some(x => x.run === run) && !run.done) throw new Error('stalled'); } } return run; }
async function holdBefore(world, run, pred) { for (;;) { await settle(); const p = world.pending.find(x => x.run === run); if (!p) throw new Error('run ended before the held operation'); if (pred(p)) return p; world.apply(p); } }
const kindIs = (...kinds) => p => kinds.includes(p.kind);
const nthQuery = k => p => p.kind === 'read' && p.run.queries === k;

// Shot with n genuine candidates numbered 1..n by N2 itself, one at a time: the install's migration.
// A lagging autonumber starts after this setup.
async function numbered(S, n, opts = {}) {
  const w = new World(S, { ...opts, lag: 0 }); const s = w.add(S.shots); const ids = [];
  for (let i = 0; i < n; i++) { const id = w.add(S.cand, { [S.shot]: [{ id: s }] }); ids.push(id); await runAlone(w, start(w, id)); }
  w.lag = opts.lag || 0;
  return [w, s, ids];
}
const admit = (w, s, cells = {}) => w.add(w.S.cand, { [w.S.shot]: [{ id: s }], ...cells });
const num = (w, id) => w.get(w.S.cand, id, w.S.number);
const live = (w, id) => w.t(w.S.cand).records.has(id);
const state = w => JSON.stringify([...w.tables.values()].map(t => [...t.records]));
const ok = w => [...w.violations, ...structure(w)];
// Duplicates shown now; numbers out of issue order (the order of each candidate's first row);
// and any number a run wrote that its candidate's own first row in its current shot does not hold.
function structure(w) {
  const S = w.S, out = [];
  for (const s of w.t(S.shots).records.keys()) {
    const held = [...w.t(S.cand).records.entries()].filter(([, c]) => (c[S.shot] || []).some(l => l.id === s) && c[S.number] != null);
    const nums = held.map(([, c]) => c[S.number]); if (new Set(nums).size !== nums.length) out.push(`duplicate numbers in ${s}: ${nums.join(',')}`);
    if (!S.issued) continue;
    const firstRow = new Map(); for (const [, c] of w.rows(s)) if (!firstRow.has(c[S.candKey])) firstRow.set(c[S.candKey], c);
    const ordered = held.filter(([id]) => firstRow.has(id)).sort((a, b) => firstRow.get(a[0])[S.order] - firstRow.get(b[0])[S.order]).map(([, c]) => c[S.number]);
    for (let i = 1; i < ordered.length; i++) if (ordered[i] <= ordered[i - 1]) { out.push(`numbers out of issue order in ${s}: ${ordered.join(',')}`); break; }
    for (const [id, c] of held) if (w.byRun.has(id) && (!firstRow.has(id) || firstRow.get(id)[S.issuedNo] !== c[S.number])) out.push(`${id} shows ${c[S.number]} in ${s}, which its first row there does not hold`);
  }
  return out;
}

let fails = 0; const lines = [];
const report = (name, pass, detail) => { lines.push(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ' // ' + detail : ''}`); if (!pass) fails++; };
// A scripted case that throws is reported as a failure rather than ending the suite.
async function scenario(name, fn) { try { await fn(); } catch (e) { report(name, false, `the case itself failed: ${e.message}`); } }
async function concurrent(src, { k, seeds, before = 2, opts = {}, dupFor = 0, retries = 1 }) {
  let bad = 0, unsafe = 0, stopped = 0, unnumbered = 0, maxQ = 0;
  for (let seed = 1; seed <= seeds; seed++) {
    const [w, s] = await numbered(DEMO, before, { ...opts, seed }); const ids = Array.from({ length: k }, () => admit(w, s));
    const runs = [...ids.map(id => start(w, id, src)), ...ids.slice(0, dupFor).map(id => start(w, id, src))];
    await drive(w, runs, mulberry32(seed * 7919 + k));
    if (runs.some(r => !r.ok)) stopped++;
    for (const id of ids) for (let i = 0; i < retries && num(w, id) == null; i++) await runAlone(w, start(w, id, src)); // retry each in turn
    const got = ids.map(id => num(w, id)).sort(byNumber).join();
    if (ok(w).length) unsafe++;
    if (ok(w).length || got !== Array.from({ length: k }, (_, i) => i + before + 1).join()) bad++;
    if (ids.some(id => num(w, id) == null)) unnumbered++;
    for (const r of runs) maxQ = Math.max(maxQ, r.queries);
  }
  return { bad, unsafe, stopped, unnumbered, maxQ };
}

// 1 one admission after three numbered candidates
await scenario('migration', async () => { const [w, s] = await numbered(DEMO, 3); const id = admit(w, s); const r = await runAlone(w, start(w, id));
  report('migration numbers 1-3 one at a time; the next admission takes 4', r.ok && num(w, id) === 4 && !ok(w).length && r.queries <= 4 && r.mutations <= 3, `got ${num(w, id)}; ${r.queries} queries, ${r.mutations} writes`); });

// 2 the Stage-1 regression: a stale write, a failed run, then a deletion, with no run active
async function staleWriteRegression(S, src, held) {
  const w = new World(S); const s = w.add(S.shots);
  const a = admit(w, s), b = admit(w, s), c = admit(w, s);
  const A = start(w, a, src); const h = await holdBefore(w, A, held);    // A reads, then a write of A's is delayed
  await runAlone(w, start(w, b, src)); const bNum = num(w, b);
  await runAlone(w, start(w, c, src)); const cNum = num(w, c);           // B and C run to completion
  await stepRun(w, A); A.kill = 'before'; await runAlone(w, A);           // A's delayed write commits, then A fails
  const retryC = await runAlone(w, start(w, c, src));                     // retry the numbered C after every run ended
  w.del(S.cand, c);                                                       // delete C, with no run active
  const d = admit(w, s); await runAlone(w, start(w, d, src));            // admit D
  return { w, s, a, b, c, d, h, A, retryC, bNum, cNum };
}
await scenario('Stage-1 regression', async () => { const x = await staleWriteRegression(DEMO, SRC, kindIs('create', 'write'));
  report('Stage-1 regression: A delayed then failed, C retried and deleted, D admitted: no number reused', x.h.kind === 'create' && !x.A.ok && x.retryC.logs.includes('skip: already numbered') && x.bNum === 1 && x.cNum === 2 && num(x.w, x.d) === 4 && !ok(x.w).length, `B ${x.bNum}, C ${x.cNum}, D ${num(x.w, x.d)}`);
  const r = await runAlone(x.w, start(x.w, x.a));
  report('Stage-1 regression: re-running the failed A gives it the place it reserved', r.ok && num(x.w, x.a) === 3 && !ok(x.w).length, `A ${num(x.w, x.a)}`); });
await scenario('Stage-1 variant', async () => { // the same schedule, delaying A's write of its own issued number instead of its row
  const x = await staleWriteRegression(DEMO, SRC, kindIs('write')); const r = await runAlone(x.w, start(x.w, x.a));
  report('Stage-1 regression, variant: A\'s delayed write of its own number, then failure', x.h.kind === 'write' && !x.A.ok && r.ok && num(x.w, x.a) === 1 && x.bNum === 2 && num(x.w, x.d) === 4 && !ok(x.w).length, `A ${num(x.w, x.a)}, B ${x.bNum}, D ${num(x.w, x.d)}`); });
if (N1) await scenario('N1 control', async () => { const x = await staleWriteRegression(N1DEMO, N1, kindIs('write'));
  report('control: the same regression fails the earlier N1 allocator for the reason it was written', !x.A.ok && x.cNum === 2 && num(x.w, x.d) === 2 && x.w.violations.some(v => v.startsWith('reuse')), `C ${x.cNum}; after C's deletion D got ${num(x.w, x.d)}`); });

// 3 failure at every point of a run, then a re-run
await scenario('crash points', async () => { let bad = 0, cases = 0; const detail = [];
  const [probe, ps] = await numbered(DEMO, 3); const total = (await runAlone(probe, start(probe, admit(probe, ps)))).ops;
  for (let at = 1; at <= total; at++) for (const when of ['before', 'after']) {
    const [w, s] = await numbered(DEMO, 3); const id = admit(w, s); cases++;
    const r1 = await runAlone(w, start(w, id, SRC, { at, when })); const r2 = await runAlone(w, start(w, id));
    if (r1.ok || !r2.ok || num(w, id) !== 4 || ok(w).length) { bad++; detail.push(`${when} op ${at}: ${num(w, id)}`); }
  }
  report(`a run that fails before or after any of its ${total} operations, then a re-run: number 4, no gap`, bad === 0, bad ? detail.join('; ') : `${cases} cases`); });
await scenario('repeat', async () => { const [w, s] = await numbered(DEMO, 3); const id = admit(w, s); await runAlone(w, start(w, id)); const before = state(w);
  const r = await runAlone(w, start(w, id));
  report('a repeated run after numbering writes nothing', r.ok && r.logs.includes('skip: already numbered') && state(w) === before); });
await scenario('cleared', async () => { const [w, s, ids] = await numbered(DEMO, 3); w.set(DEMO.cand, ids[1], { [DEMO.number]: null }); const rowsBefore = w.rows(s).length; const r = await runAlone(w, start(w, ids[1]));
  report('a number cleared by hand is restored by a re-run, with no new row', r.ok && num(w, ids[1]) === 2 && w.rows(s).length === rowsBefore && !ok(w).length, `got ${num(w, ids[1])}`); });

// 4 simultaneous admissions in one shot
for (const [k, seeds] of [[2, 3000], [3, 3000], [5, 3000], [8, 1000]]) {
  const r = await concurrent(SRC, { k, seeds });
  report(`${k} simultaneous admissions x ${seeds}: distinct, in issue order, no gap; every run numbers`, r.bad === 0 && r.stopped === 0, `violating runs ${r.bad}; runs without a number ${r.stopped}; at most ${r.maxQ} queries in one run`);
}

// 5 two or three runs at once for one record, beside another admission
for (const dup of [1, 2]) {
  let bad = 0, rewrites = 0, extraRows = 0; const SEEDS = 1000;
  for (let seed = 1; seed <= SEEDS; seed++) {
    const [w, s] = await numbered(DEMO, 3, { seed }); const id = admit(w, s), other = admit(w, s);
    const runs = [...Array.from({ length: dup + 1 }, () => start(w, id)), start(w, other)];
    await drive(w, runs, mulberry32(seed * 131 + dup));
    if (ok(w).length || [num(w, id), num(w, other)].sort(byNumber).join() !== '4,5' || runs.some(r => !r.ok)) bad++;
    rewrites += w.rewrites; extraRows += w.rows(s).filter(([, c]) => c[DEMO.candKey] === id).length - 1;
  }
  report(`${dup + 1} runs at once for one record, beside another admission x ${SEEDS}: one number, never changed`, bad === 0, `violating runs ${bad}; ${rewrites} rewrote the same number; ${extraRows} extra rows, which take no number`);
}

// 6 deletion at any moment, and a random mix with recovery
await scenario('deletion during numbering', async () => { let bad = 0; const SEEDS = 3000;
  for (let seed = 1; seed <= SEEDS; seed++) {
    const [w, s] = await numbered(DEMO, 2, { seed }); const ids = [admit(w, s), admit(w, s), admit(w, s)]; const rng = mulberry32(seed * 31);
    const ev = { at: 2 + Math.floor(rng() * 20), fn: world => { let best = null; for (const [id, c] of world.t(DEMO.cand).records) if (c[DEMO.number] != null && (!best || c[DEMO.number] > best.n)) best = { id, n: c[DEMO.number] }; if (best) world.del(DEMO.cand, best.id); } };
    await drive(w, ids.map(id => start(w, id)), rng, [ev]);
    if (ok(w).length) bad++;
  }
  report(`deleting the highest-numbered candidate while others are being numbered x ${SEEDS}: no number reissued, changed or duplicated`, bad === 0, `violating runs ${bad}`); });
await scenario('deleted during own run', async () => { const [w, s] = await numbered(DEMO, 3); const x = admit(w, s); const X = start(w, x); await holdBefore(w, X, kindIs('write'));
  w.del(DEMO.cand, x); await runAlone(w, X); const y = admit(w, s); await runAlone(w, start(w, y));
  report('a candidate deleted during its own run keeps its place: the next takes 5', !X.ok && num(w, y) === 5 && !ok(w).length, `got ${num(w, y)}`); });
await scenario('random mix', async () => { let bad = 0, unnumbered = 0; const SEEDS = 2000;
  for (let seed = 1; seed <= SEEDS; seed++) {
    const rng = mulberry32(seed * 977); const [w, s] = await numbered(DEMO, 2, { seed });
    const ids = Array.from({ length: 4 }, () => admit(w, s)); const runs = [];
    for (const id of ids) { runs.push(start(w, id, SRC, rng() < 0.4 ? { at: 1 + Math.floor(rng() * 8), when: rng() < 0.5 ? 'before' : 'after' } : null)); if (rng() < 0.3) runs.push(start(w, id)); }
    const ev = { at: Math.floor(rng() * 30), fn: world => { if (rng() < 0.5) { const alive = ids.filter(id => live(world, id)); if (alive.length) world.del(DEMO.cand, alive[Math.floor(rng() * alive.length)]); } } };
    await drive(w, runs, rng, [ev]);
    for (const id of ids) if (live(w, id) && num(w, id) == null) await runAlone(w, start(w, id)); // recovery: one retry each
    if (ok(w).length) bad++;
    if (ids.some(id => live(w, id) && num(w, id) == null)) unnumbered++;
  }
  report(`random failures, repeated runs and a deletion, then one retry of each unnumbered candidate x ${SEEDS}`, bad === 0 && unnumbered === 0, `violating runs ${bad}; left unnumbered ${unnumbered}`); });

// 7 reads weaker than an atomic snapshot
await scenario('torn reads', async () => {
  const a = await concurrent(SRC, { k: 2, seeds: 2000, before: 3, opts: { torn: true }, dupFor: 1 });
  const b = await concurrent(SRC, { k: 3, seeds: 2000, opts: { torn: true } });
  report('torn reads: overlapping runs for one record beside another admission x 2000, and 3 admissions x 2000: no violation', a.bad === 0 && b.bad === 0, `violating runs ${a.bad} and ${b.bad}; with a stopped run, then retried, ${a.stopped} and ${b.stopped}`); });
await scenario('lagging autonumber', async () => { const out = []; let bad = 0, observed = 0;
  for (const lag of [2, 4]) { const r = await concurrent(SRC, { k: 3, seeds: 1000, opts: { lag }, retries: 5 }); bad += r.bad; observed += r.stopped; out.push(`lag ${lag}: ${r.unsafe} with a violation, ${r.stopped} with a stopped run, ${r.unnumbered} unnumbered after up to five retries each`); }
  report('an autonumber that reads empty for a few operations: runs stop, retries number them, no violation', bad === 0 && observed > 0, out.join('; ')); });

// 8 fixtures and membership
await scenario('test admitted', async () => { const [w, s] = await numbered(DEMO, 3); const id = admit(w, s, { [DEMO.test]: true }); const before = state(w);
  const r = await runAlone(w, start(w, id));
  report('a test record admitted: no write at all', r.ok && r.logs.includes('skip: test record') && state(w) === before); });
await scenario('test later', async () => { const [w, s, ids] = await numbered(DEMO, 3); w.set(DEMO.cand, ids[2], { [DEMO.test]: true }); const id = admit(w, s); await runAlone(w, start(w, id));
  report('a numbered candidate later marked as a test keeps its number; the next is 4', num(w, ids[2]) === 3 && num(w, id) === 4 && !ok(w).length, `got ${num(w, id)}`); });
await scenario('linked later', async () => { const [w, s] = await numbered(DEMO, 2); const late = w.add(DEMO.cand, {}); const r1 = await runAlone(w, start(w, late));
  const early = admit(w, s); await runAlone(w, start(w, early)); w.set(DEMO.cand, late, { [DEMO.shot]: [{ id: s }] }); await runAlone(w, start(w, late));
  report('a record linked to its shot later: skipped, then numbered on admission', r1.logs.includes('skip: 0 shots linked') && num(w, early) === 3 && num(w, late) === 4 && !ok(w).length); });
await scenario('two shots', async () => { let bad = 0;
  for (let seed = 1; seed <= 1000; seed++) {
    const w = new World(DEMO, { seed }); const a = w.add(DEMO.shots), b = w.add(DEMO.shots);
    for (const sh of [a, a, a, a, b]) await runAlone(w, start(w, admit(w, sh)));
    const ids = [admit(w, a), admit(w, b), admit(w, a), admit(w, b)];
    await drive(w, ids.map(id => start(w, id)), mulberry32(seed));
    if (ok(w).length || [num(w, ids[0]), num(w, ids[2])].sort(byNumber).join() !== '5,6' || [num(w, ids[1]), num(w, ids[3])].sort(byNumber).join() !== '2,3') bad++;
  }
  report('two shots admitting at once x 1000: each numbers on its own, with no gap', bad === 0, `violating runs ${bad}`); });
await scenario('pilot', async () => { const [w, s] = await numbered(PILOT, 1); const ids = [admit(w, s), admit(w, s)]; await drive(w, ids.map(id => start(w, id)), mulberry32(17));
  const got = ids.map(id => num(w, id)).sort(byNumber).join();
  report('client-pilot binding by field ID: two simultaneous admissions after 1', got === '2,3' && !ok(w).length, `got ${got}`); });

// 9 every stop, and the limits the stops cannot cover
await scenario('stop: shown', async () => { const [w, s] = await numbered(DEMO, 3); w.add(DEMO.cand, { [DEMO.shot]: [{ id: s }], [DEMO.number]: 4 }); const id = admit(w, s); const r = await runAlone(w, start(w, id));
  report('stop: a number typed by hand that the next admission would take', !r.ok && /already shows number 4/.test(r.error.message) && num(w, id) == null && !w.violations.length, r.error?.message); });
await scenario('stop: holder', async () => { const [w, s] = await numbered(DEMO, 3); w.del(DEMO.issued, w.rows(s)[0][0]); const id = admit(w, s); const r = await runAlone(w, start(w, id));
  report('stop: a row removed by hand, so the next place is a number already issued', !r.ok && /was issued to/.test(r.error.message) && num(w, id) == null && !w.violations.length, r.error?.message); });
await scenario('stop: mismatch', async () => { const [w, s, ids] = await numbered(DEMO, 3); w.set(DEMO.issued, w.rows(s)[1][0], { [DEMO.issuedNo]: 9 }); w.set(DEMO.cand, ids[1], { [DEMO.number]: null });
  const r = await runAlone(w, start(w, ids[1]));
  report('stop: a row whose number was edited by hand, when its candidate is re-run', !r.ok && /holds number 9, but its place/.test(r.error.message) && num(w, ids[1]) == null, r.error?.message); });
await scenario('stop: own row missing', async () => { const [w, s] = await numbered(DEMO, 3); const x = admit(w, s); const X = start(w, x); await holdBefore(w, X, nthQuery(3));
  for (const [rid, c] of w.rows(s)) if (c[DEMO.candKey] === x) w.del(DEMO.issued, rid);
  await runAlone(w, X);
  report('stop: the run\'s own row not visible after it was added', !X.ok && /not visible after it was added/.test(X.error.message) && num(w, x) == null, X.error?.message); });
await scenario('stop: no order yet', async () => { const [w, s] = await numbered(DEMO, 3, { lag: 50 }); const x = admit(w, s); const X = await runAlone(w, start(w, x));
  report('stop: a row whose autonumber reads empty', !X.ok && /has no order yet/.test(X.error.message) && num(w, x) == null, X.error?.message); });
await scenario('stop: deleted', async () => { const [w, s] = await numbered(DEMO, 3); const x = admit(w, s); const X = start(w, x); await holdBefore(w, X, nthQuery(4)); w.del(DEMO.cand, x); await runAlone(w, X);
  report('stop: the candidate deleted during its run', !X.ok && /was deleted during its run/.test(X.error.message) && !ok(w).length, X.error?.message); });
await scenario('stop: moved', async () => { const [w, a] = await numbered(DEMO, 3); const b = w.add(DEMO.shots); const x = admit(w, a); const X = start(w, x); await holdBefore(w, X, nthQuery(4));
  w.set(DEMO.cand, x, { [DEMO.shot]: [{ id: b }] }); await runAlone(w, X);
  report('stop: the candidate\'s shot changed during its run', !X.ok && /changed during its run/.test(X.error.message) && num(w, x) == null && !ok(w).length, X.error?.message); });
await scenario('stop: shows another', async () => { const [w, s] = await numbered(DEMO, 3); const x = admit(w, s); const X = start(w, x); await holdBefore(w, X, nthQuery(4)); w.set(DEMO.cand, x, { [DEMO.number]: 9 }); await runAlone(w, X);
  report('stop: the candidate given a different number by hand during its run', !X.ok && /shows number 9, but its row gives 4/.test(X.error.message) && num(w, x) === 9, X.error?.message); });
for (const [name, cfg, msg] of [['a field binding that does not resolve', { numberField: 'Nmber in shot' }, /No field "Nmber in shot"/], ['an order binding that is not an autonumber', { orderField: 'Candidate key' }, /orderField must be of type autoNumber/], ['a test binding that is not a checkbox', { testField: 'Number in shot' }, /testField must be of type checkbox/]]) {
  await scenario(name, async () => { const [w, s] = await numbered(DEMO, 1); w.S = { ...DEMO, cfg: { ...DEMO.cfg, ...cfg } }; const id = admit(w, s); const before = state(w); const r = await runAlone(w, start(w, id));
    report(`stop: ${name}, before any read or write`, !r.ok && msg.test(r.error.message) && r.ops === 0 && state(w) === before, r.error?.message); });
}
await scenario('limit: candidate and row', async () => { const [w, s, ids] = await numbered(DEMO, 3); w.del(DEMO.cand, ids[2]); w.del(DEMO.issued, w.rows(s)[2][0]); const id = admit(w, s); await runAlone(w, start(w, id));
  report('limit, stated: deleting a candidate together with its row frees its number', num(w, id) === 3 && w.violations.some(v => v.startsWith('reuse')), `the next admission took ${num(w, id)}`); });
await scenario('limit: move after last read', async () => { const [w, a] = await numbered(DEMO, 3); const b = w.add(DEMO.shots); for (let i = 0; i < 4; i++) await runAlone(w, start(w, admit(w, b)));
  const x = admit(w, a); const X = start(w, x); await holdBefore(w, X, p => p.kind === 'write' && p.run.mutations === 3);
  w.set(DEMO.cand, x, { [DEMO.shot]: [{ id: b }] }); await runAlone(w, X);
  report('limit, stated: a shot change after the run\'s last read carries the old shot\'s number into the new one, which is why changing a candidate\'s shot is not supported', X.ok && num(w, x) === 4 && structure(w).some(v => v.startsWith('duplicate')), `x shows ${num(w, x)} in a shot that already has 4`); });
await scenario('copied record', async () => { const [w, s, ids] = await numbered(DEMO, 3); const copy = w.add(DEMO.cand, { [DEMO.shot]: [{ id: s }], [DEMO.number]: 2 }); // Duplicate record copies the number
  const dup = structure(w).some(v => v.startsWith('duplicate')); w.set(DEMO.cand, copy, { [DEMO.number]: null }); await runAlone(w, start(w, copy));
  report('a duplicated record shows its source\'s number until its number is cleared; then it is admitted and numbered 4', dup && num(w, copy) === 4 && num(w, ids[1]) === 2 && !ok(w).length, `copy ${num(w, copy)}, source ${num(w, ids[1])}`); });

// 10 a copied base, under both models: new record IDs, or the same record IDs
function copyOf(w, keepIds) {
  const c = new World(w.S, { seed: 99 }), ids = new Map();
  for (const t of w.tables.values()) for (const id of t.records.keys()) ids.set(id, keepIds ? id : c.newId());
  for (const t of w.tables.values()) {
    const ct = c.t(t.id); ct.auto = new Map(t.auto);
    for (const [id, cells] of t.records) {
      const copy = JSON.parse(JSON.stringify(cells));
      for (const f of t.fields) if (f.type === 'multipleRecordLinks' && copy[f.id]) copy[f.id] = copy[f.id].filter(l => ids.has(l.id)).map(l => ({ id: ids.get(l.id) }));
      ct.records.set(ids.get(id), copy);
    }
  }
  return [c, ids];
}
for (const keepIds of [false, true]) await scenario(`copy ${keepIds}`, async () => {
  const [w, s, ids] = await numbered(DEMO, 4); w.del(DEMO.cand, ids[3]); // 4 was issued, then its candidate deleted, before the copy
  const [c, map] = copyOf(w, keepIds); const cs = map.get(s); const id = admit(c, cs); await runAlone(c, start(c, id));
  const second = map.get(ids[1]); c.set(DEMO.cand, second, { [DEMO.number]: null }); await runAlone(c, start(c, second));
  const want = keepIds ? 2 : 6;
  report(`a copied base with ${keepIds ? 'the same' : 'new'} record IDs: next is 5, above the number deleted before the copy; a cleared number gives ${want}`, num(c, id) === 5 && num(c, second) === want && !c.violations.length && !structure(c).some(v => v.startsWith('duplicate')), `next ${num(c, id)}, cleared ${num(c, second)}`); });

// 11 negative controls: each mechanism removed, and the check that guards it fails
const mutate = (name, from, to) => { const m = SRC.replace(from, to); report(`negative control prepared (${name})`, m !== SRC); return m; };
await scenario('control: later rows', async () => { const m = mutate('count every other row, not only earlier ones', 'rows.slice(0, at)', 'rows.filter(r => r.candidate !== recordId)');
  const r = await concurrent(m, { k: 3, seeds: 500 });
  report('negative control: counting later rows too, simultaneous admissions collide or stop', r.bad + r.stopped > 0, `${r.bad} violating, ${r.stopped} with a stopped run, of 500`); });
await scenario('control: latest row', async () => { const m = mutate('a candidate\'s latest row, not its first', 'rows.findIndex(r => r.candidate === recordId)', 'rows.map(r => r.candidate).lastIndexOf(recordId)');
  let changed = 0; for (let seed = 1; seed <= 500; seed++) { const [w, s] = await numbered(DEMO, 3, { seed }); const id = admit(w, s); await drive(w, [start(w, id, m), start(w, id, m)], mulberry32(seed)); if (w.violations.some(v => v.startsWith('changed'))) changed++; }
  report('negative control: from the latest row, two runs for one record change its number', changed > 0, `runs with a changed number ${changed} of 500`); });
await scenario('control: sort', async () => { const m = mutate('rows left in query order, not sorted by issue order', '  return rows.sort((a, b) => a.order - b.order);', '  return rows;');
  const r = await concurrent(m, { k: 3, seeds: 500 });
  report('negative control: without the sort, numbers follow record IDs, not issue order', r.bad > 0, `violating runs ${r.bad} of 500`); });
await scenario('control: second read', async () => { const m = mutate('the second read made conditional again', /  if \(!\(await readRows\(shotId\)\)\.some\(r => r\.candidate === recordId\)\) \{\n    await I\.createRecordAsync\(\{ \[F\.rowShot\]: \[\{ id: shotId \}\], \[F\.candidateKey\]: recordId \}\);\n  \}\n  \/\/[^\n]*\n  const rows = await readRows\(shotId\);/,
    '  let rows = await readRows(shotId);\n  if (!rows.some(r => r.candidate === recordId)) {\n    await I.createRecordAsync({ [F.rowShot]: [{ id: shotId }], [F.candidateKey]: recordId });\n    rows = await readRows(shotId);\n  }');
  const r = await concurrent(m, { k: 2, seeds: 2000, before: 3, opts: { torn: true }, dupFor: 1 });
  report('negative control: under torn reads, numbering from a read that began before the row was known leads to violations', r.bad > 0, `violating runs ${r.bad} of 2000`); });
await scenario('control: empty order', async () => { const m = mutate('the empty-order stop removed', /  if \(rows\.some\(r => typeof r\.order !== 'number'\)\)[^\n]*\n/, '');
  const r = await concurrent(m, { k: 3, seeds: 1000, opts: { lag: 3 }, retries: 5 });
  report('negative control: without the empty-order stop, a lagging autonumber leads to violations', r.unsafe > 0, `runs with a violation ${r.unsafe} of 1000`); });
await scenario('control: shown', async () => { const m = mutate('the shown-number stop removed', /  if \(shown\) throw[^\n]*\n/, '');
  const [w, s] = await numbered(DEMO, 3); w.add(DEMO.cand, { [DEMO.shot]: [{ id: s }], [DEMO.number]: 4 }); const id = admit(w, s); await runAlone(w, start(w, id, m));
  report('negative control: without that stop, a number typed by hand is duplicated', structure(w).some(v => v.startsWith('duplicate')), `the next admission took ${num(w, id)}`); });
await scenario('control: moved', async () => { const m = mutate('the shot-change stop removed', /  if \(onlyShot\(self[^\n]*\n/, '');
  const [w, a] = await numbered(DEMO, 3); const b = w.add(DEMO.shots); for (let i = 0; i < 4; i++) await runAlone(w, start(w, admit(w, b)));
  const x = admit(w, a); const X = start(w, x, m); await holdBefore(w, X, nthQuery(4)); w.set(DEMO.cand, x, { [DEMO.shot]: [{ id: b }] }); await runAlone(w, X);
  report('negative control: without that stop, a shot change during the run carries the old shot\'s number', structure(w).some(v => v.startsWith('duplicate')), `x shows ${num(w, x)}`); });
await scenario('control: assumption', async () => { let bad = 0, stopped = 0; const SEEDS = 3000;
  for (let seed = 1; seed <= SEEDS; seed++) { const [w, s] = await numbered(DEMO, 2, { prefix: false, seed }); const ids = Array.from({ length: 3 }, () => admit(w, s)); const runs = await drive(w, ids.map(id => start(w, id)), mulberry32(seed * 3)); if (ok(w).length) bad++; if (runs.some(r => !r.ok)) stopped++; }
  report('assumption control: when a row\'s autonumber is fixed before it is committed, the guarantees can fail', bad > 0, `of ${SEEDS} runs of 3 simultaneous admissions, ${bad} ended with a duplicate, out-of-order or unbacked number, and ${stopped} had a run stop on a check`); });

console.log(lines.join('\n'));
console.log(fails ? `${fails} FAILURE(S)` : 'all cases behaved as expected');
process.exit(fails ? 1 : 0);
