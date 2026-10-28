// The simulated base for tools/shot-planning: tables, records, two-sided links, computed fields,
// script runs, interleaving and crashes. Generalised from tools/candidate-numbering's World (N2's
// test file), and not imported from it. It shows the scripts' logic; it does not show what Airtable
// does, and nothing here proves that Airtable behaves as simulated.
//
// API for tests and for later parts (S2–S5 add tests on this without changing it):
//
//   const w = new World(opts)          opts: seed, torn, tick, clock, lmtOnUnchangedWrite, formulas
//     seed                 drives record IDs and torn reads
//     torn                 a query sees every record committed before it began, and only some of
//                          those created while it was in flight (as N2's torn mode)
//     tick                 ms the clock moves on each applied script operation (default 250)
//     clock                the start time (ms)
//     lmtOnUnchangedWrite  false (default): a last-modified time moves only when a watched value
//                          changes; true: any write to a watched field moves it. v6 allows either;
//                          the copy records which Airtable does (T37)
//     formulas             { [table]: { [field]: fn } } overrides, for negative controls
//
//   Setup and hand edits, outside any run (Airtable's UI or connector, by a person):
//     w.add(table, cells) -> id        create a record; links as record IDs, selects as names
//     w.set(table, id, cells)          edit fields; moves last-modified times, never a script's
//                                      own "written at" fields
//     w.del(table, id)                 delete a record; links to it are removed
//     w.advance(ms)                    move the clock (to put a hand edit more than a minute
//                                      after a script's write, or within it)
//   Reads, as a formula sees them (computed fields are computed now):
//     w.get(table, id, field)          value (see formulas.mjs for the shapes)
//     w.ids(table)                     record IDs in creation order
//     w.find(table, pred)              IDs whose record matches pred(r), r.get(field) as above
//     w.state()                        every stored cell, for "nothing changed" comparisons
//     w.writes                         every write: { table, id, fields, by: 'run' | 'hand' | 'setup' }
//   Script runs (the exact script bytes, as an Airtable automation runs them):
//     start(w, src, cfg, { crash })    begin a run; returns run { ok, error, logs, ops, done }
//     runAlone(w, run)                 apply only this run's operations until it ends
//     press(w, src, cfg)               start + runAlone
//     drive(w, runs, rng, events)      apply every pending operation in a random interleaving
//     stepRun(w, run), holdBefore(w, run, pred)   scripted schedules, as N2's
//   A crash { at: k, when: 'before' | 'after' } fails the run's k-th operation before or after it
//   is applied. Script operations: getTable/getField (no operation), selectRecordAsync,
//   selectRecordsAsync, createRecordAsync(s), updateRecordAsync(s), each one operation.
//
// Values a script reads have Airtable's scripting shapes: a checkbox reads true or null, a single
// select { id, name, color }, a link [{ id, name }], an empty value null. Writes are checked as
// Airtable checks them: a computed field can't be written, a select needs { name } of an existing
// choice, a link needs [{ id }] of existing records, a date an ISO string.

import { buildSchema, STORED, AGG } from './schema.mjs';
import { FORMULAS } from './formulas.mjs';

export class CrashSignal extends Error {}
export function mulberry32(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export const settle = async () => { for (let i = 0; i < 6; i++) await new Promise(r => setImmediate(r)); };

const ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const clone = v => (v == null ? v : JSON.parse(JSON.stringify(v)));
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

export class World {
  constructor({ seed = 1, torn = false, tick = 250, clock = Date.UTC(2026, 9, 28, 9, 0, 0), lmtOnUnchangedWrite = false, formulas = {} } = {}) {
    this.schema = buildSchema();
    this.tables = new Map();
    for (const t of this.schema.tables) {
      const fields = t.fields.map(f => ({ ...f }));
      this.tables.set(t.id, { id: t.id, name: t.name, fields, byKey: new Map(fields.flatMap(f => [[f.id, f], [f.name, f]])), records: new Map(), auto: 0 });
    }
    for (const t of this.tables.values()) for (const f of t.fields) {
      if (f.kind === 'formula') {
        const fn = (formulas[t.name] && formulas[t.name][f.name]) || (FORMULAS[t.name] && FORMULAS[t.name][f.name]);
        if (!fn) throw new Error(`sim: no formula for ${t.name}.${f.name}`);
        f.fn = fn;
      }
      if (f.kind === 'rollup' && !AGG[f.opts.agg]) throw new Error(`sim: no aggregation ${f.opts.agg}`);
    }
    for (const [tn, fs] of Object.entries(FORMULAS)) for (const fn of Object.keys(fs)) {
      const f = this.t(tn).byKey.get(fn); if (!f || f.kind !== 'formula') throw new Error(`sim: formulas.mjs has ${tn}.${fn}, which the schema doesn't declare as a formula`);
    }
    this.torn = torn; this.tick = tick; this.clock = clock; this.lmtOnUnchangedWrite = lmtOnUnchangedWrite;
    this.idRng = mulberry32(seed * 7 + 3); this.rng = mulberry32(seed * 13 + 5);
    this.pending = []; this.applied = 0; this.writes = [];
    this.cache = new Map(); this.computing = new Set();
  }

  // ---- schema access
  t(x) { if (x && typeof x === 'object') x = x.id; const t = this.tables.get(x) || [...this.tables.values()].find(y => y.name === x); if (!t) throw new Error(`No table "${x}"`); return t; }
  f(t, x) { if (x && typeof x === 'object') x = x.id; const f = t.byKey.get(x); if (!f) throw new Error(`No field "${x}" in table "${t.name}"`); return f; }
  newId() { let s = 'rec'; for (let i = 0; i < 14; i++) s += ID_CHARS[Math.floor(this.idRng() * ID_CHARS.length)]; return s; }
  iso(ms = this.clock) { return new Date(ms).toISOString(); }
  advance(ms) { this.clock += ms; this.cache.clear(); }

  // ---- values
  // Internal stored values: text string, number, checkbox true, select choice name, link array of
  // record IDs, attachments array, date ISO string; null when empty.
  normalize(t, f, v, strict) {
    const bad = why => { throw new Error(`Field "${f.name}" in table "${t.name}" cannot accept the provided value: ${why}`); };
    if (!STORED.has(f.kind)) throw new Error(`Field "${f.name}" in table "${t.name}" cannot accept a value because the field is computed`);
    if (v === undefined) bad('undefined');
    switch (f.kind) {
      case 'text': case 'long': if (v == null || v === '') return null; if (typeof v !== 'string') bad('not a string'); return v;
      case 'number': if (v == null) return null; if (typeof v !== 'number' || Number.isNaN(v)) bad('not a number'); return v;
      case 'checkbox': if (v == null || v === false) return null; if (v !== true) bad('not a boolean'); return true;
      case 'date': if (v == null || v === '') return null; if (typeof v !== 'string' || Number.isNaN(Date.parse(v))) bad('not an ISO date string'); return new Date(Date.parse(v)).toISOString();
      case 'select': {
        if (v == null) return null;
        let name = v;
        if (typeof v === 'object') name = v.name != null ? v.name : (v.id || '').replace(/^sel/, '');
        else if (strict) bad('a single select takes { name } or { id }');
        if (!f.opts.choices.includes(name)) bad(`no choice "${name}"`);
        return name;
      }
      case 'link': {
        if (v == null) return null;
        if (!Array.isArray(v)) bad('a link takes an array');
        const tt = this.t(f.opts.table), ids = [];
        for (const x of v) {
          const id = typeof x === 'string' && !strict ? x : x && typeof x === 'object' ? x.id : bad('a link takes [{ id }]');
          if (!tt.records.has(id)) bad(`no record ${id} in ${tt.name}`);
          if (!ids.includes(id)) ids.push(id);
        }
        return ids.length ? ids : null;
      }
      case 'attachments': if (v == null) return null; if (!Array.isArray(v)) bad('attachments take an array'); return v.length ? clone(v) : null;
      default: bad(`kind ${f.kind}`);
    }
  }

  value(t, id, f) {
    const rec = t.records.get(id); if (!rec) return null;
    if (STORED.has(f.kind) || f.kind === 'autonumber') return rec.cells[f.id] ?? null;
    if (f.kind === 'modified') return rec.lmt[f.id] != null ? this.iso(rec.lmt[f.id]) : null;
    const key = `${t.id}|${id}|${f.id}`;
    if (this.cache.has(key)) return this.cache.get(key);
    if (this.computing.has(key)) throw new Error(`sim: circular computed field ${t.name}.${f.name}`);
    this.computing.add(key);
    let v;
    try {
      if (f.kind === 'formula') {
        v = f.fn({ id, get: name => this.value(t, id, this.f(t, name)) });
        if (v === true || v === false) v = v ? 1 : 0;
        if (v === undefined) v = '';
      } else {
        const lf = this.f(t, f.opts.link), tt = this.t(lf.opts.table);
        const linked = (rec.cells[lf.id] || []).filter(x => tt.records.has(x));
        const keep = f.opts.where ? linked.filter(x => { const w = this.value(tt, x, this.f(tt, f.opts.where)); return !(w == null || w === '' || w === 0); }) : linked;
        if (f.kind === 'count') v = keep.length;
        else {
          const target = this.f(tt, f.opts.field);
          const vals = keep.flatMap(x => { const y = this.value(tt, x, target); return Array.isArray(y) ? y : [y]; });
          if (f.kind === 'lookup') { const c = vals.filter(x => !(x == null || x === '')); v = c.length ? c : null; }
          else v = AGG[f.opts.agg][1](vals);
        }
      }
    } finally { this.computing.delete(key); }
    this.cache.set(key, v);
    return v;
  }

  primaryName(t, id) { const v = this.value(t, id, t.fields[0]); return v == null ? 'Unnamed record' : Array.isArray(v) ? v.join(', ') : String(v); }

  apiValue(t, f, id) {
    const v = this.value(t, id, f);
    switch (f.type) {
      case 'checkbox': return v ? true : null;
      case 'singleSelect': return v ? { id: `sel${v}`, name: v, color: 'grayLight2' } : null;
      case 'multipleRecordLinks': { const tt = this.t(f.opts.table); return v && v.length ? v.map(x => ({ id: x, name: this.primaryName(tt, x) })) : null; }
      case 'formula': case 'rollup': return v === '' ? null : clone(v);
      default: return v === '' ? null : clone(v);
    }
  }
  asString(t, f, id) {
    const v = this.apiValue(t, f, id);
    if (v == null) return '';
    if (f.type === 'singleSelect') return v.name;
    if (f.type === 'multipleRecordLinks') return v.map(x => x.name).join(', ');
    if (f.type === 'checkbox') return 'checked';
    if (Array.isArray(v)) return v.map(x => (x && typeof x === 'object' ? x.filename || x.name || JSON.stringify(x) : String(x))).join(', ');
    return String(v);
  }

  // ---- writes: every mutation goes through write(); links stay two-sided; last-modified times move
  write(t, id, cells, { by, create = false, strict = false } = {}) {
    const rec = t.records.get(id); if (!rec) throw new Error(`Record ${id} not found in ${t.name}`);
    const touched = new Set(), changed = new Set(), sideEffects = [];
    const norm = Object.entries(cells).map(([k, v]) => { const f = this.f(t, k); return [f, this.normalize(t, f, v, strict)]; });
    for (const [f, nv] of norm) {
      const old = rec.cells[f.id] ?? null;
      touched.add(f.id);
      if (!same(old, nv)) changed.add(f.id);
      rec.cells[f.id] = nv;
      if (f.kind === 'link' && f.opts.inverse != null && !same(old, nv)) {
        const tt = this.t(f.opts.table), inv = this.f(tt, f.opts.inverse), before = old || [], after = nv || [];
        for (const x of before) if (!after.includes(x) && tt.records.has(x)) { const r2 = tt.records.get(x); const arr = (r2.cells[inv.id] || []).filter(y => y !== id); r2.cells[inv.id] = arr.length ? arr : null; sideEffects.push([tt, x, inv.id]); }
        for (const x of after) if (!before.includes(x)) { const r2 = tt.records.get(x); const arr = r2.cells[inv.id] || []; if (!arr.includes(id)) { r2.cells[inv.id] = [...arr, id]; sideEffects.push([tt, x, inv.id]); } }
      }
    }
    this.stamp(t, rec, this.lmtOnUnchangedWrite || create ? new Set([...touched, ...changed]) : changed);
    for (const [tt, x, fid] of sideEffects) this.stamp(tt, tt.records.get(x), new Set([fid]));
    this.cache.clear();
    this.writes.push({ table: t.name, id, fields: norm.map(([f]) => f.name), by, create });
  }
  stamp(t, rec, fids) {
    for (const f of t.fields) if (f.kind === 'modified' && f.opts.watch.some(n => fids.has(this.f(t, n).id))) rec.lmt[f.id] = this.clock;
  }
  create(t, cells, { by, strict = false } = {}) {
    const id = this.newId();
    t.records.set(id, { cells: {}, lmt: {} });
    for (const f of t.fields) if (f.kind === 'autonumber') t.records.get(id).cells[f.id] = ++t.auto;
    try { this.write(t, id, cells, { by, create: true, strict }); } catch (e) { t.records.delete(id); throw e; }
    return id;
  }

  // ---- setup and hand edits (outside any run)
  add(table, cells = {}) { return this.create(this.t(table), cells, { by: 'setup' }); }
  set(table, id, cells) { this.write(this.t(table), id, cells, { by: 'hand' }); }
  del(table, id) {
    const t = this.t(table); if (!t.records.has(id)) return;
    for (const ot of this.tables.values()) for (const f of ot.fields) if (f.kind === 'link' && this.t(f.opts.table) === t)
      for (const [rid, r] of ot.records) if ((r.cells[f.id] || []).includes(id) && rid !== id) { const arr = r.cells[f.id].filter(x => x !== id); r.cells[f.id] = arr.length ? arr : null; this.stamp(ot, r, new Set([f.id])); }
    t.records.delete(id); this.cache.clear();
    this.writes.push({ table: t.name, id, fields: [], by: 'hand', deleted: true });
  }
  get(table, id, field) { const t = this.t(table); return this.value(t, id, this.f(t, field)); }
  ids(table) { return [...this.t(table).records.keys()]; }
  find(table, pred) { const t = this.t(table); return this.ids(table).filter(id => pred({ id, get: n => this.value(t, id, this.f(t, n)) })); }
  state() { return JSON.stringify([...this.tables.values()].map(t => [t.name, [...t.records].map(([id, r]) => [id, r.cells])])); }

  // ---- the scripting API, one table operation per call
  ordered(t) { return [...t.records.keys()].sort(); } // unsorted queries: arbitrary but stable, by record ID
  snap(t, id, fields) {
    const w = this, loaded = fields ? fields.map(x => this.f(t, typeof x === 'object' ? x.id : x)) : t.fields;
    const vals = new Map(loaded.map(f => [f.id, [this.apiValue(t, f, id), this.asString(t, f, id)]]));
    return {
      id, name: this.primaryName(t, id),
      getCellValue(x) { const f = w.f(t, typeof x === 'object' ? x.id : x); if (!vals.has(f.id)) throw new Error(`field ${f.name} was not loaded`); return clone(vals.get(f.id)[0]); },
      getCellValueAsString(x) { const f = w.f(t, typeof x === 'object' ? x.id : x); if (!vals.has(f.id)) throw new Error(`field ${f.name} was not loaded`); return vals.get(f.id)[1]; },
    };
  }
  op(run, kind, apply, extra = {}) {
    run.ops++; if (kind === 'read') run.queries++; else run.mutations++;
    if (run.crash && run.crash.at === run.ops) run.kill = run.crash.when;
    return new Promise((resolve, reject) => this.pending.push({ run, kind, apply, resolve, reject, ...extra }));
  }
  api(run) {
    const w = this;
    const fieldObj = (t, f) => ({ id: f.id, name: f.name, type: f.type, options: f.kind === 'select' ? { choices: f.opts.choices.map(n => ({ id: `sel${n}`, name: n })) } : f.kind === 'link' ? { linkedTableId: w.t(f.opts.table).id } : null });
    return {
      id: 'appSIMULATED00000', name: 'AP-ASK demo (simulated)',
      getTable(x) {
        const t = w.t(x);
        const recId = r => (typeof r === 'string' ? r : r && r.id);
        return {
          id: t.id, name: t.name, fields: t.fields.map(f => fieldObj(t, f)),
          getField: y => fieldObj(t, w.f(t, y)),
          selectRecordAsync: (id, { fields } = {}) => w.op(run, 'read', () => (t.records.has(id) ? w.snap(t, id, fields) : null)),
          selectRecordsAsync: ({ fields, recordIds } = {}) => w.op(run, 'read', begun => {
            const ids = w.ordered(t).filter(id => (!recordIds || recordIds.includes(id)) && (!begun || begun.has(id) || w.rng() < 0.5));
            const records = ids.map(id => w.snap(t, id, fields));
            return { records, recordIds: ids, getRecord: id => { const r = records.find(x => x.id === id); if (!r) throw new Error(`No record ${id} in this query`); return r; } };
          }, { query: true }),
          createRecordAsync: cells => w.op(run, 'create', () => w.create(t, cells, { by: 'run', strict: true })),
          createRecordsAsync: list => { if (list.length > 50) throw new Error('createRecordsAsync takes at most 50 records'); return w.op(run, 'create', () => list.map(x => w.create(t, x.fields, { by: 'run', strict: true }))); },
          updateRecordAsync: (r, cells) => w.op(run, 'write', () => { w.write(t, recId(r), cells, { by: 'run', strict: true }); }),
          updateRecordsAsync: list => { if (list.length > 50) throw new Error('updateRecordsAsync takes at most 50 records'); return w.op(run, 'write', () => { for (const x of list) w.write(t, x.id, x.fields, { by: 'run', strict: true }); }); },
        };
      },
    };
  }
  // Apply one pending operation. A killed run's operation fails before or after it is applied.
  // A torn query is applied in two steps: it begins, other operations may land, then it ends.
  apply(p) {
    if (this.torn && p.query && !p.begun) { p.begun = new Set([...this.tables.values()].flatMap(t => [...t.records.keys()])); return; }
    this.pending.splice(this.pending.indexOf(p), 1); this.applied++; this.clock += this.tick; this.cache.clear();
    if (p.run.kill === 'before') { p.run.kill = null; p.reject(new CrashSignal('crashed')); return; }
    let out; try { out = p.apply(p.begun); } catch (e) { p.reject(e); return; }
    if (p.run.kill === 'after') { p.run.kill = null; p.reject(new CrashSignal('crashed')); return; }
    p.resolve(out);
  }
}

// Start one run of a script. The run never rejects; it records { ok, error, logs, output }.
// The script's Date reads the simulated clock.
export function start(world, src, cfg, { crash = null } = {}) {
  const run = { done: false, ok: null, logs: [], output: {}, ops: 0, queries: 0, mutations: 0, crash, kill: null };
  let configured = false;
  class FakeDate extends Date { constructor(...a) { super(...(a.length ? a : [world.clock])); } static now() { return world.clock; } }
  const log = (...m) => run.logs.push(m.map(String).join(' '));
  const env = {
    input: { config: () => { if (configured) throw new Error('input.config() called twice'); configured = true; return { ...cfg }; } },
    output: { set: (k, v) => { run.output[k] = v; } },
    base: world.api(run), console: { log, warn: log, error: log }, Date: FakeDate,
  };
  const fn = new Function(...Object.keys(env), `return (async () => {\n${src}\n})();`);
  run.promise = Promise.resolve().then(() => fn(...Object.values(env)))
    .then(() => { run.ok = true; }, e => { run.ok = false; run.error = e; })
    .finally(() => { run.done = true; });
  return run;
}
export async function stepRun(world, run) { await settle(); const p = world.pending.find(x => x.run === run); if (!p) return false; world.apply(p); if (p.begun && world.pending.includes(p)) world.apply(p); await settle(); return true; }
export async function runAlone(world, run) { while (!run.done) { if (!(await stepRun(world, run)) && !run.done) { await settle(); if (!world.pending.some(x => x.run === run) && !run.done) throw new Error('stalled'); } } return run; }
export async function press(world, src, cfg, opts) { return runAlone(world, start(world, src, cfg, opts)); }
export async function holdBefore(world, run, pred) { for (;;) { await settle(); const p = world.pending.find(x => x.run === run); if (!p) throw new Error('run ended before the held operation'); if (pred(p)) return p; world.apply(p); } }
export async function drive(world, runs, rng, events = []) {
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
export const kindIs = (...kinds) => p => kinds.includes(p.kind);
