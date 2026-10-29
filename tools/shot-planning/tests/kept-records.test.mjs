// Kept records and the recovery texts (PR #456, Stage 2). A kept record is one line: a Definition
// line, a basis line (Slots kept, a use decision's basis), a Product basis line (Products kept), and
// each value of a collection shot's kept guide plan. A View or a Must stay true of two lines is
// carried in them with ⏎ for its line break, so record boundaries stay distinguishable from
// authored text, and the prompt, the standard, S4 and S5 get the whole text (ML-…). FORMULA-agree
// reads the changed formula texts literally on multi-line input and compares them with their sim
// functions. U29-local, T3b-status and U20-race are the three recovery texts. Each CTRL-… disables
// one mechanism (a formula as fbc4f24 had it, or a mutated script) and shows its guard failing.
import * as fx from './fixtures.mjs';
import { World, start, runAlone, stepRun } from '../sim/world.mjs';
import { FORMULAS, KEPT_BREAK, S, AJ, N, B } from '../sim/formulas.mjs';

const { adopt, assign, pressS1, pressS2, pressS4, pressS5, slot, slotAt, SRC } = fx;
const PS = 'Product-page slots', AP = 'Applications', UD = 'Use decisions', AI = 'Accepted images', SH = 'Shots', GS = 'Guide slots', SG = 'Shot guides', CA = 'Candidates';
const app = (w, id, f) => w.get(AP, id, f);
const ud = (w, id, f) => w.get(UD, id, f);
const shot = (w, id, f) => w.get(SH, id, f);
const appsOf = (w, d) => w.find(AP, r => (r.get('Use decision') || []).includes(d));
const appsFrom = (w, acc) => w.find(AP, r => (r.get('Accepted image') || []).includes(acc) && r.get('Basis') === 'Accepted for this use');
const inUse = (w, s) => w.find(AP, r => (r.get('Slot') || []).includes(s)).filter(a => app(w, a, 'In use flag') === 1);
const mutate = (t, src, from, to, label) => { const m = src.replace(from, to); t.check(`control prepared (${label})`, m !== src); return m; };
const snap = (w, shotId) => w.add(CA, { ...fx.snapshotCells(w, shotId), Image: fx.CANDIDATE_IMAGE(shotId) });
const decide = (w, { source, slots, replace = false, reviewed = false }) => w.add(UD, { 'Accepted image': [source], Slots: slots, Replace: replace, 'Facts reviewed': reviewed,
  Conditions: 'The products appear whole, so their size isn\'t shown.', ...fx.decision() });

export const cases = [];
const add = (id, title, run) => cases.push({ id, title, run });

// The reviewer's reproduction (Stage 2): a collection guide slot whose View has two lines.
const COLLECTION_VIEW = 'Both products together.\nKeep the red label visible and leave space above for copy.';
const PAGE_VIEW = 'The whole vessel, front on, with even space around it.\nThe product alone: no props, people or text.';
const TWO_LINE_FACTS = 'A gift vessel in a red glaze. Keep its glaze and rim.\nKeep the red label on its base visible.';
const lines = v => S(v).split('\n');

// The formulas as fbc4f24 had them, for the controls: a record line with the authored line break in it.
const OLD = {
  definitionLine: r => `⟦${[r.get('Guide ID'), r.get('Guide-slot ID'), r.get('Name'), r.get('Position'), r.get('Placement label'), r.get('Required'), r.get('Fill rule'), r.get('Includes'), r.get('Choose count'), B(r.get('Retired')) ? 'retired' : 'active', r.get('View')].map(S).join(' | ')}⟧`,
  shareSignature: r => `${S(r.get('Product share key'))} | ${S(r.get('Facts without size'))}`,
  productBasisLine: r => [r.get('Product ID'), r.get('Product share key'), r.get('Facts without size'), r.get('Size')].map(v => AJ(v)).join(' | '),
};

// ---------------------------------------------------------------------------------------------
// A collection guide slot whose View has two lines: adopted, planned by S2 (src2), kept by Snapshot.
async function collectionTwoLines(world = new World(), src2 = SRC.s2) {
  const b = fx.bath(world), { w } = b;
  const g = fx.guide(w, 'Gift set', [{ name: 'Set together', position: 1, label: 'collection page, image 1', view: COLLECTION_VIEW }], { destination: 'Collection' });
  w.set(GS, g.slots[0], { Includes: 'All products in the request' });
  await adopt(w, g.id);
  const req = fx.request(w, { name: 'Gift set', workflow: 'Collection', products: [b.P.vessel, b.P.towel] });
  w.set('Briefs', req.id, { 'Shot guide (collection)': [g.id] });
  const r = await pressS2(w, req.id, {}, src2);
  const id = w.find(SH, x => x.get('Name') === 'Gift set · Set together')[0];
  return { w, g, req, r, id, candidate: id ? snap(w, id) : null };
}
add('ML-collection', 'A collection guide slot\'s View of two lines: adopted and planned, the shot is Planned with its guide the Same, and Effective direction, the prompt and the standard carry both lines; Snapshot keeps them; the kept guide plan is one value per line', async t => {
  const { w, g, r, id, candidate } = await collectionTwoLines();
  t.check('S2 ran and made the shot', r.ok && !!id, r.error && r.error.message);
  t.check('the guide is Complete; its Definition line is one line, the View\'s line break written ⏎', w.get(SG, g.id, 'Complete') === 1
    && w.get(GS, g.slots[0], 'Definition line').endsWith(` | ${COLLECTION_VIEW.replace('\n', KEPT_BREAK)}⟧`) && !w.get(GS, g.slots[0], 'Definition line').includes('\n'), w.get(GS, g.slots[0], 'Definition line'));
  t.check('Planned 1, Can generate 1, Shot-guide check Same', shot(w, id, 'Planned') === 1 && shot(w, id, 'Can generate') === 1 && shot(w, id, 'Shot-guide check') === 'Same', shot(w, id, 'Plan check'));
  const plan = lines(shot(w, id, 'Kept guide plan'));
  t.check('the kept guide plan: six values, one per line, the View on one', plan.length === 6 && plan[1] === `View: ${COLLECTION_VIEW.replace('\n', KEPT_BREAK)}`, plan);
  t.check('Effective direction is the whole View', shot(w, id, 'Effective direction') === COLLECTION_VIEW, shot(w, id, 'Effective direction'));
  t.check('Current prompt and Current standard carry both lines', shot(w, id, 'Current prompt').includes(`Shot: Gift set · Set together, for collection page, image 1. ${COLLECTION_VIEW}\n\n`)
    && shot(w, id, 'Current standard').includes(`\nShot: Gift set · Set together, for collection page, image 1. ${COLLECTION_VIEW}\nShot guide: Gift set, version 1, Set together`), shot(w, id, 'Current standard'));
  t.check('Snapshot keeps both lines in Prompt used and Standard used; its Standard check is Same', w.get(CA, candidate, 'Prompt used').includes(COLLECTION_VIEW)
    && w.get(CA, candidate, 'Standard used').includes(COLLECTION_VIEW) && w.get(CA, candidate, 'Standard check') === 'Same standard as when this image was made');
});
// Then the View edited to another two lines, adopted, and S3 (src3) pressed on the shot.
const NEW_COLLECTION_VIEW = 'Both products together, from a little above.\nKeep the red label visible.';
async function collectionReplanned(src3 = SRC.s3) {
  const x = await collectionTwoLines(), { w, g, id } = x;
  w.set(GS, g.slots[0], { View: NEW_COLLECTION_VIEW });
  await adopt(w, g.id);
  const changed = shot(w, id, 'Shot-guide check');
  const r = await fx.pressS3Shot(w, id, {}, src3);
  return { ...x, changed, r };
}
add('ML-collection-s3', "ML-collection's shot after its View is edited to two other lines and adopted: it reads changed; Replan refreshes the kept guide plan one value per line, and the direction, prompt and standard carry the new View whole", async t => {
  const { w, id, changed, r } = await collectionReplanned();
  t.check('after the adoption the shot reads changed', changed === 'The shot guide changed since this was planned', changed);
  t.check('Replan refreshed the kept guide plan: six lines, the new View on one', r.ok && lines(shot(w, id, 'Kept guide plan')).length === 6 && lines(shot(w, id, 'Kept guide plan'))[1] === `View: ${NEW_COLLECTION_VIEW.replace('\n', KEPT_BREAK)}`, shot(w, id, 'Replan result'));
  t.check('Planned with its guide the Same; Effective direction, the prompt and the standard carry the new View whole', shot(w, id, 'Planned') === 1 && shot(w, id, 'Shot-guide check') === 'Same'
    && shot(w, id, 'Effective direction') === NEW_COLLECTION_VIEW && shot(w, id, 'Current prompt').includes(NEW_COLLECTION_VIEW) && shot(w, id, 'Current standard').includes(NEW_COLLECTION_VIEW), shot(w, id, 'Effective direction'));
});
add('CTRL-ML-collection-s3', 'Negative control: with S3 writing the View into the kept guide plan as authored (fbc4f24), ML-collection-s3\'s guard fails: the refreshed shot plans, but its direction keeps the first line only', async t => {
  const m = mutate(t, SRC.s3, '`View: ${oneLine(text(gs.getCellValue(GS.view)))}`', '`View: ${text(gs.getCellValue(GS.view))}`', 'S3 keeps the View as authored');
  const { w, id, r } = await collectionReplanned(m);
  t.check('the mutated S3 refreshed the plan; the shot plans; its direction is the first line only', r.ok && shot(w, id, 'Planned') === 1 && shot(w, id, 'Effective direction') === 'Both products together, from a little above.', shot(w, id, 'Effective direction'));
});
add('CTRL-ML-collection','Negative control: with S2 writing the View into the kept guide plan as authored (fbc4f24), ML-collection\'s guard fails as the reviewer found: Planned and the Same guide, but the direction, prompt and standard lose the second line', async t => {
  const m = mutate(t, SRC.s2, '`View: ${oneLine(text(gs.getCellValue(GS.view)))}`', '`View: ${text(gs.getCellValue(GS.view))}`', 'S2 keeps the View as authored');
  const { w, id } = await collectionTwoLines(new World(), m);
  t.check('Planned 1, Can generate 1, Shot-guide check Same', shot(w, id, 'Planned') === 1 && shot(w, id, 'Can generate') === 1 && shot(w, id, 'Shot-guide check') === 'Same');
  t.check('Effective direction is the first line only, and the second sentence is in neither the prompt nor the standard', shot(w, id, 'Effective direction') === 'Both products together.'
    && !shot(w, id, 'Current prompt').includes('Keep the red label visible') && !shot(w, id, 'Current standard').includes('Keep the red label visible'), shot(w, id, 'Effective direction'));
});

// ---------------------------------------------------------------------------------------------
// A product-page guide slot whose View has two lines, for a product whose Must stay true has two:
// planned by S1 and S2, kept by Snapshot, accepted, and applied by S4.
async function pagesTwoLines(world = new World()) {
  const b = fx.bath(world), { w } = b;
  w.set(GS, b.vessel.slots[0], { View: PAGE_VIEW });
  w.set('Products', b.P.vessel, { 'Must stay true': TWO_LINE_FACTS });
  await adopt(w, b.vessel.id); await assign(w, b.P.vessel, b.vessel.id);
  await pressS1(w, b.req.id); await pressS2(w, b.req.id);
  const front = slotAt(w, b.L.vessel, 1), id = (slot(w, front, 'Shot') || [])[0];
  const candidate = snap(w, id), accepted = fx.accept(w, candidate);
  const r = await pressS4(w, accepted);
  return { w, b, front, id, candidate, accepted, r };
}
add('ML-pages', 'A product-page View of two lines, on a product whose Must stay true has two: the prompt and the standard carry both; Slots kept is one line per slot; S4 applies it after the acceptance, and the application holds', async t => {
  const { w, front, id, candidate, accepted, r } = await pagesTwoLines();
  t.check('the shot is Planned; its Effective direction is the whole View', shot(w, id, 'Planned') === 1 && shot(w, id, 'Effective direction') === PAGE_VIEW, shot(w, id, 'Plan check'));
  t.check('the prompt carries the View and the facts whole', shot(w, id, 'Current prompt').includes(`. ${PAGE_VIEW}\n\n`) && shot(w, id, 'Current prompt').includes(TWO_LINE_FACTS));
  t.check('the standard carries the View and the facts whole', shot(w, id, 'Current standard').includes(`. ${PAGE_VIEW}\nShot guide:`) && shot(w, id, 'Current standard').includes(`Must stay true: ${TWO_LINE_FACTS} Material:`));
  const kept = lines(w.get(CA, candidate, 'Slots kept'));
  t.check('Slots kept: one line for the one slot, four parts, the line breaks written ⏎', kept.length === 1 && kept[0].split(' ‖ ').length === 4 && kept[0].split(KEPT_BREAK).length === 3, kept);
  const apps = appsFrom(w, accepted);
  t.check('S4 ran and made the application, In use; the slot Settled', r.ok && apps.length === 1 && app(w, apps[0], 'State') === 'In use' && slot(w, front, 'Placement state') === 'Settled', r.error ? r.error.message : apps.map(a => app(w, a, 'State')));
  t.check('its Kept destination and Kept receiving basis are the slot\'s own', app(w, apps[0], 'Kept destination') === slot(w, front, 'Kept destination now') && app(w, apps[0], 'Kept receiving basis') === slot(w, front, 'Receiving basis')
    && app(w, apps[0], 'Eligibility') === 'Holds');
});
add('CTRL-ML-pages', 'Negative control: with Definition line and Share signature as fbc4f24 had them, ML-pages\' guard fails as the reviewer found: S4 throws on Slots kept after the acceptance, and no application is made', async t => {
  const { w, accepted, r } = await pagesTwoLines(new World({ formulas: { [GS]: { 'Definition line': OLD.definitionLine }, Products: { 'Share signature': OLD.shareSignature } } }));
  t.check('S4 threw on a Slots kept line; the acceptance stands with no application', !r.ok && /S4: a Slots kept line isn't/.test(r.error.message) && appsFrom(w, accepted).length === 0 && !w.get(AI, accepted, 'Applications done'), r.error && r.error.message);
});

// ---------------------------------------------------------------------------------------------
// A product whose Must stay true has two lines, in an accepted collection image; two of its pickup
// slots take that image by S5: one matched by its kept facts, one with Facts reviewed.
async function factsTwoLines(world = new World()) {
  const b = fx.bath(world), { w } = b;
  const gift = fx.product(w, { name: 'Gift Vessel', style: 'Gift vessel', color: 'red glaze', size: 'one size', facts: TWO_LINE_FACTS });
  await adopt(w, b.vessel.id); await assign(w, gift, b.vessel.id, 'a ceramic vessel');
  const g = fx.guide(w, 'Gift set', [{ name: 'Set together', position: 1, label: 'collection page, image 1', view: 'Both products together.' }], { destination: 'Collection' });
  w.set(GS, g.slots[0], { Includes: 'All products in the request' });
  await adopt(w, g.id);
  const set = fx.request(w, { name: 'Gift set', workflow: 'Collection', products: [gift, b.P.towel] });
  w.set('Briefs', set.id, { 'Shot guide (collection)': [g.id] });
  await pressS2(w, set.id);
  const id = w.find(SH, x => x.get('Name') === 'Gift set · Set together')[0];
  const candidate = snap(w, id), accepted = fx.accept(w, candidate);
  await pressS4(w, accepted);
  const pages = [0, 1].map(i => fx.request(w, { name: `Gift pages ${i + 1}`, products: [gift] }));
  for (const p of pages) await pressS1(w, p.id);
  const [matched, reviewed] = pages.map(p => slotAt(w, p.lines[0], 4));
  const d1 = decide(w, { source: accepted, slots: [matched] }), d2 = decide(w, { source: accepted, slots: [reviewed], reviewed: true });
  const r1 = await pressS5(w, d1), r2 = await pressS5(w, d2);
  return { w, gift, id, candidate, accepted, matched, reviewed, d1, d2, r1, r2 };
}
add('ML-facts', 'A Must stay true of two lines: Products kept is one line per product, each with one size word; S5 picks the image up for the product by its kept facts, and with Facts reviewed by membership', async t => {
  const { w, gift, id, candidate, matched, reviewed, d1, d2, r1, r2 } = await factsTwoLines();
  const kept = lines(w.get(CA, candidate, 'Products kept'));
  t.check('Products kept: two lines, one per product, each ending with one " | size shown"', kept.length === 2 && kept.every(l => l.endsWith(' | size shown') && l.split(' | size shown').length === 2)
    && kept[0].startsWith(`${gift} | Gift vessel / red glaze | Must stay true: ${TWO_LINE_FACTS.replace('\n', KEPT_BREAK)} Material:`), kept);
  t.check('the shot\'s Current product basis is what Snapshot kept', shot(w, id, 'Current product basis') === w.get(CA, candidate, 'Products kept'));
  t.check('matched by its kept facts: applied, In use, the slot Settled', r1.ok && ud(w, d1, 'Applied') === true && appsOf(w, d1).length === 1 && app(w, appsOf(w, d1)[0], 'State') === 'In use' && slot(w, matched, 'Placement state') === 'Settled', ud(w, d1, 'Result'));
  t.check('with Facts reviewed: applied by membership, the Result says the facts were reviewed, the slot Settled', r2.ok && ud(w, d2, 'Applied') === true && appsOf(w, d2).length === 1
    && ud(w, d2, 'Result').includes('Facts reviewed: the receiving products\' current facts were reviewed') && slot(w, reviewed, 'Placement state') === 'Settled', ud(w, d2, 'Result'));
});
add('CTRL-ML-facts', 'Negative control: with Product basis line as fbc4f24 had it, ML-facts\' guard fails as the reviewer found: Products kept splits the product in two and gives it a size word mid-facts; S5 finds no input product, with or without Facts reviewed', async t => {
  const { w, candidate, d1, d2 } = await factsTwoLines(new World({ formulas: { 'Product lines': { 'Product basis line': OLD.productBasisLine } } }));
  const kept = lines(w.get(CA, candidate, 'Products kept'));
  t.check('Products kept has three lines for two products, a size word in the middle of the facts', kept.length === 3 && kept[0].endsWith('Keep its glaze and rim. | size shown'), kept);
  t.check('both refused: the product isn\'t among the source\'s input products', [d1, d2].every(d => appsOf(w, d).length === 0 && S(ud(w, d, 'Result')).includes("its product isn't among the source's input products")), [ud(w, d1, 'Result'), ud(w, d2, 'Result')]);
});

// ---------------------------------------------------------------------------------------------
// The changed formula texts read literally, as Airtable reads them: a reader for the functions they
// use (&, =, !=, >, IF, AND, OR, COUNTA, ARRAYJOIN, SUBSTITUTE, REGEX_EXTRACT, REGEX_REPLACE). A
// link or lookup is its values; & and the string functions read a value as text (S); COUNTA of a
// link is 1 when it has any record (the build copy). This is a reading of the text, not Airtable.
function evaluate(text, get) {
  const toks = []; let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (/\s/.test(c)) { i++; continue; }
    if (c === '"') { let s = ''; i++; while (text[i] !== '"') { if (text[i] === '\\') { const n = text[i + 1]; s += n === 'n' ? '\n' : n; i += 2; } else s += text[i++]; } i++; toks.push({ k: 'str', v: s }); continue; }
    if (c === '{') { const j = text.indexOf('}', i); toks.push({ k: 'field', v: text.slice(i + 1, j) }); i = j + 1; continue; }
    const op = ['!=', '>=', '<=', '&', '=', '>', '<', '(', ')', ','].find(o => text.startsWith(o, i));
    if (op) { toks.push({ k: 'op', v: op }); i += op.length; continue; }
    const m = /^(\d+(?:\.\d+)?|[A-Z_]+)/.exec(text.slice(i)); if (!m) throw new Error(`evaluate: can't read at ${text.slice(i, i + 20)}`);
    toks.push(/\d/.test(m[1][0]) ? { k: 'num', v: Number(m[1]) } : { k: 'fn', v: m[1] }); i += m[1].length;
  }
  let p = 0;
  const peek = v => toks[p] && toks[p].k === 'op' && toks[p].v === v;
  const eat = v => { if (!peek(v)) throw new Error(`evaluate: expected ${v}`); p++; };
  const FN = {
    IF: a => (B(a[0]) ? a[1] : a[2] ?? ''), AND: a => (a.every(B) ? 1 : 0), OR: a => (a.some(B) ? 1 : 0),
    COUNTA: a => (B(a[0]) ? 1 : 0), ARRAYJOIN: a => AJ(a[0], a[1] ?? ''), SUBSTITUTE: a => S(a[0]).split(S(a[1])).join(S(a[2])),
    REGEX_EXTRACT: a => { const m = new RegExp(S(a[1])).exec(S(a[0])); return m ? m[0] : ''; }, REGEX_REPLACE: a => S(a[0]).replace(new RegExp(S(a[1]), 'g'), S(a[2])),
  };
  const primary = () => {
    const tk = toks[p++];
    if (tk.k === 'str' || tk.k === 'num') return tk.v;
    if (tk.k === 'field') return get(tk.v);
    if (tk.k === 'op' && tk.v === '(') { const v = comparison(); eat(')'); return v; }
    if (tk.k === 'fn') { if (!FN[tk.v]) throw new Error(`evaluate: no ${tk.v}`); eat('('); const args = []; if (!peek(')')) { args.push(comparison()); while (peek(',')) { p++; args.push(comparison()); } } eat(')'); return FN[tk.v](args); }
    throw new Error(`evaluate: unexpected ${tk.v}`);
  };
  const concat = () => { let v = primary(); while (peek('&')) { p++; v = S(v) + S(primary()); } return v; };
  const comparison = () => {
    let v = concat();
    for (;;) {
      const op = ['=', '!=', '>', '<', '>=', '<='].find(peek); if (!op) return v;
      p++; const r = concat(), num = typeof v === 'number' || typeof r === 'number';
      const [x, y] = num ? [N(v), N(r)] : [S(v), S(r)];
      v = { '=': x === y, '!=': x !== y, '>': x > y, '<': x < y, '>=': x >= y, '<=': x <= y }[op] ? 1 : 0;
    }
  };
  const v = comparison(); if (p !== toks.length) throw new Error('evaluate: text left over'); return v;
}
const CHANGED = [[GS, 'Definition line'], ['Products', 'Share signature'], ['Product lines', 'Product basis line'], [SH, 'Current product basis'], [SH, 'Effective placement'], [SH, 'Effective direction'], [SH, 'Lineage']];
async function agreement(w, recordsOf) {
  const out = [];
  for (const [table, field] of CHANGED) for (const id of recordsOf(table)) {
    const lit = S(evaluate(FORMULAS[table][field].airtable, f => w.get(table, id, f))), sim = S(w.get(table, id, field));
    out.push({ table, field, id, same: lit === sim, multi: lit.includes('\n') || lit.includes(KEPT_BREAK), lit, sim });
  }
  return out;
}
add('FORMULA-agree', 'The changed formula texts read literally give their sim functions\' values, on the multi-line collection and product-page cases and the two-line product: Definition line, Share signature, Product basis line, Current product basis, Effective placement, Effective direction, Lineage', async t => {
  for (const [label, make] of [['collection', () => collectionTwoLines()], ['product pages', () => pagesTwoLines()], ['two-line facts', () => factsTwoLines()]]) {
    const x = await make(), w = x.w;
    const rows = await agreement(w, table => w.ids(table));
    const bad = rows.filter(r => !r.same);
    t.check(`[${label}] every record agrees (${rows.length} values, ${rows.filter(r => r.multi).length} with a line break or ⏎)`, bad.length === 0 && rows.some(r => r.multi), bad.slice(0, 2).map(r => `${r.table} › ${r.field}: ${JSON.stringify(r.lit)} vs ${JSON.stringify(r.sim)}`));
  }
});
add('CTRL-FORMULA-agree', 'Negative control: FORMULA-agree\'s reading flags Current product basis with the mirror fbc4f24 had (the size word once per product) when a Product basis line has a line break in it', async t => {
  const once = r => { if (!(r.get('Lines in shot') || []).length) return ''; const suf = N(r.get('Active slots filled')) > 1 ? ' | size omitted' : ' | size shown'; return (r.get('Line product basis') || []).map(l => S(l) + suf).join('\n'); };
  const { w } = await factsTwoLines(new World({ formulas: { 'Product lines': { 'Product basis line': OLD.productBasisLine }, [SH]: { 'Current product basis': once } } }));
  const bad = (await agreement(w, table => w.ids(table))).filter(r => !r.same).map(r => `${r.table} › ${r.field}`);
  t.check('the text and that mirror disagree on Current product basis (and on Product basis line, its old text)', bad.includes('Shots › Current product basis') && bad.includes('Product lines › Product basis line'), bad);
});
add('TEXT-kept-break', 'S2 and S3 write ⏎ for a line break in the kept guide plan, the character the formulas read back (formulas.mjs KEPT_BREAK)', async t => {
  for (const k of ['s2', 's3']) t.check(`${k.toUpperCase()}'s KEPT_BREAK is the formulas'`, SRC[k].includes(`const KEPT_BREAK = '${KEPT_BREAK}';`) && KEPT_BREAK === '⏎');
});

// ---------------------------------------------------------------------------------------------
// U29: a use decision deleted while its application is in use.
async function u29(world = new World()) {
  const b = await fx.bathPlanned(world), { w } = b;
  const g = fx.guide(w, 'U29 set', [{ name: 'Set together', position: 1, label: 'collection page, image 1', view: 'All the request\'s products together.' }], { destination: 'Collection' });
  w.set(GS, g.slots[0], { Includes: 'All products in the request' });
  await adopt(w, g.id);
  const set = fx.request(w, { name: 'U29 set', workflow: 'Collection', products: [b.P.vessel, b.P.hand] });
  w.set('Briefs', set.id, { 'Shot guide (collection)': [g.id] });
  await pressS2(w, set.id);
  const id = w.find(SH, x => x.get('Name') === 'U29 set · Set together')[0];
  const accepted = fx.accept(w, snap(w, id));
  await pressS4(w, accepted);
  const hand4 = slotAt(w, b.L.hand, 4), d = decide(w, { source: accepted, slots: [hand4] });
  const r = await pressS5(w, d);
  const a = appsOf(w, d)[0], settledBefore = slot(w, hand4, 'Placement state');
  w.del(UD, d);
  return { w, hand4, d, r, a, settledBefore };
}
add('U29-local', "U29's script-side reading: a use decision deleted while its application is in use: the application stays Current, its State and Eligibility read \"Needs review: its decision record is missing\", and the slot isn't Settled and says so; no retry is offered", async t => {
  const { w, hand4, r, a, settledBefore } = await u29();
  t.check('applied and Settled before the delete', r.ok && settledBefore === 'Settled');
  t.check('the application survives, Current, Basis "Use decision", no decision linked', w.ids(AP).includes(a) && app(w, a, 'Current') === true && app(w, a, 'Basis') === 'Use decision' && !(app(w, a, 'Use decision') || []).length);
  t.check('its State and Eligibility: "Needs review: its decision record is missing"', app(w, a, 'State') === 'Needs review: its decision record is missing' && app(w, a, 'Eligibility') === 'Needs review: its decision record is missing', app(w, a, 'State'));
  t.check('the slot: Needs review, with that text as its Status; not Settled', slot(w, hand4, 'Placement state') === 'Needs review' && slot(w, hand4, 'Status') === 'Needs review: its decision record is missing', slot(w, hand4, 'Status'));
});
add('CTRL-U29', 'Negative control: with State checking Basis finished before the decision record (fbc4f24), U29-local\'s guard fails as the reviewer found: State offers "press Apply this decision again" for a decision that no longer exists', async t => {
  const state = FORMULAS[AP].State;
  const old = r => (S(r.get('Basis')) === 'Use decision' && !(r.get('Use decision') || []).length && B(r.get('Current')) && !B(r.get('Withdrawn')) && !B(r.get('Current check')) ? 'Unfinished: press Apply this decision again' : state(r));
  const { w, hand4, a } = await u29(new World({ formulas: { [AP]: { State: old } } }));
  t.check('State reads Unfinished, a retry that cannot run; the slot reads Unfinished too', app(w, a, 'State') === 'Unfinished: press Apply this decision again' && slot(w, hand4, 'Placement state') === 'Unfinished', [app(w, a, 'State'), slot(w, hand4, 'Status')]);
});

// ---------------------------------------------------------------------------------------------
// T3b: two live shots fill one slot (a double press of S2).
async function twoShots(world = new World()) {
  const b = fx.bath(world), { w } = b;
  await adopt(w, b.vessel.id); await assign(w, b.P.vessel, b.vessel.id); await pressS1(w, b.req.id);
  const A = start(w, SRC.s2, fx.cfg('s2', b.req.id)), B2 = start(w, SRC.s2, fx.cfg('s2', b.req.id));
  while (A.mutations === 0) await stepRun(w, A); // A holds before its first create while B runs
  await runAlone(w, B2); await runAlone(w, A);
  return { w, front: slotAt(w, b.L.vessel, 1) };
}
add('T3b-status', "T3b's slot Status: while two live shots fill one slot, its Status names the duplicate and the shot pair check, not a fulfillment change", async t => {
  const { w, front } = await twoShots();
  t.check('two live shots fill the slot', slot(w, front, 'Live shot count') === 2);
  t.check('its Status: "More than one live shot fills this slot: see the shot pair check"', slot(w, front, 'Status') === 'More than one live shot fills this slot: see the shot pair check', slot(w, front, 'Status'));
});
add('CTRL-T3b-status', 'Negative control: with the slot Status seeing at most one live shot (its shot-pair branch never reached), T3b-status\'s guard fails as the copy showed: "Fulfillment changed after its shot was made: press Replan on this slot …"', async t => {
  const status = FORMULAS[PS].Status;
  const one = r => status({ id: r.id, get: f => (f === 'Live shot count' ? Math.min(1, N(r.get(f))) : r.get(f)) });
  const { w, front } = await twoShots(new World({ formulas: { [PS]: { Status: one } } }));
  t.check('the Status advises Replan on the slot', S(slot(w, front, 'Status')).startsWith('Fulfillment changed after its shot was made: press Replan on this slot'), slot(w, front, 'Status'));
});

// ---------------------------------------------------------------------------------------------
// U20: two decisions for one pickup slot pressed together, the second reading the applications
// before the first writes and the slot after: its slot's Pickup ok no longer holds.
async function u20race({ replace, src5 = SRC.s5 }) {
  const b = await fx.bathPlanned(new World()), { w } = b;
  const g = fx.guide(w, 'Race set', [{ name: 'Set together', position: 1, label: 'collection page, image 1', view: 'All the request\'s products together.' }], { destination: 'Collection' });
  w.set(GS, g.slots[0], { Includes: 'All products in the request' });
  await adopt(w, g.id);
  const set = fx.request(w, { name: 'Race set', workflow: 'Collection', products: [b.P.vessel, b.P.hand] });
  w.set('Briefs', set.id, { 'Shot guide (collection)': [g.id] });
  await pressS2(w, set.id);
  const id = w.find(SH, x => x.get('Name') === 'Race set · Set together')[0];
  const s1 = fx.accept(w, snap(w, id)), s2 = fx.accept(w, snap(w, id));
  const hand4 = slotAt(w, b.L.hand, 4);
  const d1 = decide(w, { source: s1, slots: [hand4] }), d2 = decide(w, { source: s2, slots: [hand4], replace });
  const run1 = start(w, src5, fx.cfg('s5', d1)), run2 = start(w, src5, fx.cfg('s5', d2));
  while (run2.queries < 4) await stepRun(w, run2); // the decision, the applications and the source read; the slot read waits
  await runAlone(w, run1); await runAlone(w, run2);
  return { w, hand4, d1, d2, run1, run2, again: () => pressS5(w, d2, {}, src5) };
}
add('U20-race', "U20's race, the refusal text: the second decision reads the slot after the first put an image in use; it is refused for that image, not for a formula's name: add asks for Replace, Replace asks for a further press, which applies it", async t => {
  const add1 = await u20race({ replace: false });
  t.check('[add] the first applied; the second refused, nothing written for it', add1.run1.ok && add1.run2.ok && ud(add1.w, add1.d1, 'Applied') === true && appsOf(add1.w, add1.d2).length === 0 && !ud(add1.w, add1.d2, 'Decided basis'));
  t.check('[add] its Result: "it already has an image in use: a use decision with Replace can change it"', S(ud(add1.w, add1.d2, 'Result')).endsWith(': it already has an image in use: a use decision with Replace can change it'), ud(add1.w, add1.d2, 'Result'));
  const rep = await u20race({ replace: true });
  t.check('[Replace] refused: "an image came into use on it after this run read its applications: press Apply this decision again"', appsOf(rep.w, rep.d2).length === 0
    && S(ud(rep.w, rep.d2, 'Result')).endsWith(': an image came into use on it after this run read its applications: press Apply this decision again'), ud(rep.w, rep.d2, 'Result'));
  const r = await rep.again();
  t.check('[Replace] pressed again: applied, one image in use, Settled', r.ok && ud(rep.w, rep.d2, 'Applied') === true && inUse(rep.w, rep.hand4).length === 1 && app(rep.w, inUse(rep.w, rep.hand4)[0], 'Use decision')[0] === rep.d2 && slot(rep.w, rep.hand4, 'Placement state') === 'Settled', ud(rep.w, rep.d2, 'Result'));
});
add('CTRL-U20-race', "Negative control: with S5's refusal as fbc4f24 had it, U20-race's guard fails: the Result names the Pickup ok formula", async t => {
  const m = mutate(t, SRC.s5, /if \(!s\.pickupOk\) return replace \? [^;]*;/, 'if (!s.pickupOk) return "its Pickup ok doesn\'t hold";', 'S5 names the formula');
  const x = await u20race({ replace: false, src5: m });
  t.check('the Result reads "its Pickup ok doesn\'t hold"', S(ud(x.w, x.d2, 'Result')).endsWith(": its Pickup ok doesn't hold"), ud(x.w, x.d2, 'Result'));
});
