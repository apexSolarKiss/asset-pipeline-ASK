// Runs every tests/*.test.mjs against the simulated base, prints a per-case PASS/FAIL table and a
// total, and exits non-zero on any failure.
// Usage: node tools/shot-planning/run-tests.mjs [filter ...]
//   a filter keeps the cases whose ID or file name contains it (for example T22, CX6, planning).
// A test file exports `cases`: [{ id, title, run: async t => { t.check(label, ok, detail) } }].
// A case passes when it ran to the end, made at least one check, and every check held. Each case
// names its v6 ID (T…, U…, CX…), GPT's clarification (GPT-A, GPT-B-make, GPT-B-share, GPT-C), or a
// negative control (CTRL-…), which shows a guard failing in a mutated copy for the reason it exists.
import { readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const filters = process.argv.slice(2);
const files = readdirSync(join(HERE, 'tests')).filter(f => f.endsWith('.test.mjs')).sort();
const started = Date.now();
const rows = [];
for (const file of files) {
  const mod = await import(pathToFileURL(join(HERE, 'tests', file)).href);
  if (!Array.isArray(mod.cases)) { rows.push({ file, id: '(file)', title: 'exports no cases array', pass: false, failed: ['no cases'], n: 0 }); continue; }
  for (const c of mod.cases) {
    if (filters.length && !filters.some(f => c.id.includes(f) || file.includes(f))) continue;
    const checks = [];
    const t = { check: (label, ok, detail) => { checks.push({ label, ok: !!ok, detail }); return !!ok; } };
    let error = null;
    const t0 = Date.now();
    try { await c.run(t); } catch (e) { error = e; }
    const failed = checks.filter(x => !x.ok).map(x => `${x.label}${x.detail !== undefined ? ` // ${typeof x.detail === 'string' ? x.detail : JSON.stringify(x.detail)}` : ''}`);
    if (error) failed.push(`the case threw: ${error && error.stack ? error.stack.split('\n').slice(0, 3).join(' | ') : error}`);
    if (!checks.length && !error) failed.push('the case made no check');
    rows.push({ file, id: c.id, title: c.title, pass: !failed.length, failed, n: checks.length, ms: Date.now() - t0 });
  }
}

const w = Math.max(4, ...rows.map(r => r.id.length));
for (const r of rows) {
  console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.id.padEnd(w)}  ${r.file.replace('.test.mjs', '')}  ${r.title} (${r.n} checks)`);
  for (const f of r.failed) console.log(`        - ${f}`);
}
const failedRows = rows.filter(r => !r.pass);
const checks = rows.reduce((a, r) => a + r.n, 0);
console.log(`\n${rows.length} cases, ${checks} checks: ${rows.length - failedRows.length} passed, ${failedRows.length} failed (${((Date.now() - started) / 1000).toFixed(1)} s)`);
process.exit(failedRows.length || !rows.length ? 1 : 0);
