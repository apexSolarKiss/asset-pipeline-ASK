// Snapshot's reference list (snapshot-references.js), the change of 2026-10-30 (v3): the script step that
// assembles Reference images used for Snapshot's one update, from the trigger's own values. SNP-… cases
// run the script's exact bytes; SNP-sim feeds it the values a candidate of the simulated base's Life in use
// shot carries (Current reference images, Continuity image now, Continuity check now) and compares its
// list with the fixtures' Snapshot stand-in, which the other files rely on. CTRL-SNP-… are negative
// controls: the mechanism removed in a mutated script, and the guarding check failing for its reason.
// Local results show the script's logic; they don't show Airtable's insertAsData, its attachment write
// or its run history. Those are the copy's to show.
import * as fx from './fixtures.mjs';
import { World, start, runAlone } from '../sim/world.mjs';
import { CONTINUITY } from '../sim/formulas.mjs';

const SRC = fx.SRC.snapshot;
const CA = 'Candidates', SH = 'Shots';
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
const REFS = ['https://example.test/light.jpg', 'https://example.test/palette.jpg', 'https://example.test/material.jpg'];
const CONT = 'https://example.test/no-33.jpg';

export const cases = [];
const add = (id, title, run) => cases.push({ id, title, run });

// One run of the script on its own (it reads no table and writes nothing).
async function run(cfg, src = SRC) {
  const w = new World();
  const r = await runAlone(w, start(w, src, cfg));
  return { ok: r.ok, out: r.output.referenceUrls, error: r.error ? String(r.error.message || r.error) : '', set: Object.keys(r.output), logs: r.logs };
}
const cfgOf = (refs, cont, check) => ({ referenceUrls: refs, continuityUrls: cont, continuityChecks: check });
// A refusal: the run stops, sets no output (so the update has nothing to write), and names why.
const refused = (t, label, r, why) => t.check(`${label}: the run stops before the update, with no output, naming "${why}"`, !r.ok && !r.set.length && r.error.includes(why), r);

add('SNP-absent', 'No continuity reference configured: the list is the shot\'s reference images alone, in their order', async t => {
  for (const [label, check, cont] of [['Continuity check now as the copy passed it for a shot with none, [null]', [null], []], ['Continuity check now empty', [''], []], ['empty text', '', []], ['no check value at all', [], []], ['the lookups empty as nothing', null, null]]) {
    const r = await run(cfgOf(REFS, cont, check));
    t.check(`${label}: the reference images, in order, and nothing else`, r.ok && same(r.out, REFS), r);
  }
  const r = await run(cfgOf([], [], ['']));
  t.check('a shot with no reference images: an empty list, as Snapshot kept before', r.ok && same(r.out, []), r);
});

add('SNP-ready', 'A Ready continuity reference: the reference images in their order, then the continuity image last', async t => {
  const r = await run(cfgOf(REFS, [CONT], ['Ready']));
  t.check('the reference images, then Continuity image now last', r.ok && same(r.out, [...REFS, CONT]), r);
  t.check('no reference image is dropped, reordered or doubled', r.out.slice(0, REFS.length).every((u, i) => u === REFS[i]) && r.out.length === REFS.length + 1);
  const only = await run(cfgOf([], [CONT], ['Ready']));
  t.check('a shot with no reference images: the continuity image alone', only.ok && same(only.out, [CONT]), only);
  const spaced = await run(cfgOf(REFS, [CONT], ['  Ready ']));
  t.check('the check read trimmed, as the formula writes it', spaced.ok && same(spaced.out, [...REFS, CONT]), spaced);
});

add('SNP-incomplete', "A configured reference that isn't Ready stops the run, whatever the continuity image reads: each of Continuity check's Incomplete texts", async t => {
  for (const key of ['notNewWorkflow', 'count', 'image', 'role']) {
    for (const cont of [[], [CONT]]) refused(t, `${key}, with ${cont.length} continuity file(s)`, await run(cfgOf(REFS, cont, [CONTINUITY[key]])), CONTINUITY[key]);
  }
  refused(t, 'a text Snapshot doesn\'t know', await run(cfgOf(REFS, [CONT], ['Pending'])), 'not ready (Pending)');
  refused(t, 'two shots, one not Ready', await run(cfgOf(REFS, [CONT], ['Ready', CONTINUITY.count])), CONTINUITY.count);
});

add('SNP-disagree', 'A continuity image that disagrees with its check stops the run: Ready with none or two, or an image with nothing configured', async t => {
  refused(t, 'Ready with no continuity image', await run(cfgOf(REFS, [], ['Ready'])), 'has 0 files, not 1');
  refused(t, 'Ready with two', await run(cfgOf(REFS, [CONT, CONT.replace('33', '34')], ['Ready'])), 'has 2 files, not 1');
  refused(t, 'an image with nothing configured', await run(cfgOf(REFS, [CONT], [''])), 'no continuity reference is configured');
});

add('SNP-inputs', 'Its inputs are checked before anything is set: each must be present and a list (insertAsData) of non-empty strings, never a joined string', async t => {
  refused(t, 'referenceUrls missing', await run({ continuityUrls: [], continuityChecks: [''] }), 'input referenceUrls is missing');
  refused(t, 'continuityChecks missing', await run({ referenceUrls: REFS, continuityUrls: [] }), 'input continuityChecks is missing');
  refused(t, 'a comma-joined string, as an input without insertAsData arrives', await run(cfgOf(REFS.join(', '), [], [''])), 'must be a list');
  refused(t, 'an item that is not a non-empty string', await run(cfgOf([REFS[0], null], [], [''])), 'referenceUrls item 2 is not a file URL');
  const r = await run(cfgOf(REFS, [], ['']));
  t.check('it reads input.config() once and sets one output, referenceUrls', r.ok && same(r.set, ['referenceUrls']), r);
  t.check('the script has no base read or write: it names no table, record or field', !/base\.|selectRecord|updateRecord|createRecord|getTable/.test(SRC));
});

// The values a candidate of the shot carries, as Snapshot's inputs pass them: each attachment lookup's
// file URLs (the copy maps them to expiringDownloadUrl), and the check's text.
// An empty check reaches the script as [null], one linked shot with no value, as the copy passed it.
const checkOf = v => (v === null || v === undefined || v === '' ? [null] : [].concat(v));
const fromCandidate = (w, c) => cfgOf((w.get(CA, c, 'Current reference images') || []).map(f => f.url),
  (w.get(CA, c, 'Continuity image now') || []).map(f => f.url), checkOf(w.get(CA, c, 'Continuity check now')));
const standIn = (w, shot) => fx.snapshotCells(w, shot)['Reference images used'].map(f => f.url);
const MAY = "The room's geometry and layout, its architectural materials, and the light.";
function campaign() {
  const w = new World(), b = fx.bath(w);
  const req = fx.request(w, { name: 'Bath campaign', workflow: 'Campaign', products: [b.P.vessel, b.P.towel] });
  const shot = (name, placement, direction) => { const id = w.add(SH, { Name: name, Brief: [req.id], Placement: placement, 'Shot direction': direction, 'Lines in shot': req.lines }); w.set(SH, id, { 'Products confirmed': true }); return id; };
  return { w, hero: shot('World hero', 'campaign, world image', 'The vessel and the towel on a stone vanity.'), life: shot('Life in use', 'campaign, in use', 'A hand reaches for the towel.') };
}

add('SNP-sim', "On the simulated base: a Life in use candidate's own values give the stand-in's list, absent and Ready; an incomplete reference, which Snapshot's trigger already stops, is refused if run", async t => {
  const { w, hero, life } = campaign();
  const anchor = fx.snapshotCandidate(w, hero);
  const absent = w.add(CA, { Shot: [life] });
  const a = await run(fromCandidate(w, absent));
  t.check('absent: the script\'s list is the stand-in\'s, the shot\'s reference images', a.ok && a.out.length > 0 && same(a.out, standIn(w, life)), { script: a, standIn: standIn(w, life) });
  w.set(SH, life, { 'Continuity reference': [anchor], 'Continuity may decide': MAY });
  const ready = w.add(CA, { Shot: [life] });
  const r = await run(fromCandidate(w, ready));
  t.check('Ready: the script\'s list is the stand-in\'s, ending with the anchor\'s image', r.ok && same(r.out, standIn(w, life)) && r.out[r.out.length - 1] === w.get(CA, anchor, 'Image')[0].url, { script: r, standIn: standIn(w, life) });
  t.check('Ready: Snapshot\'s trigger holds for the candidate', fx.snapshotTriggers(w, ready));
  w.set(SH, life, { 'Continuity may decide': null });
  const held = w.add(CA, { Shot: [life] });
  t.check('incomplete: Snapshot\'s trigger doesn\'t hold (the first stop)', !fx.snapshotTriggers(w, held));
  refused(t, 'incomplete, run anyway (the second stop)', await run(fromCandidate(w, held)), CONTINUITY.role);
});

// Negative controls: the script with one mechanism removed, and SNP-ready's or SNP-incomplete's check failing.
const mutate = (from, to) => { const parts = SRC.split(from); if (parts.length !== 2) throw new Error(`the mutation's anchor occurs ${parts.length - 1} times, not once`); return parts.join(to); };

add('CTRL-SNP-order', "Negative control: with the continuity image put first, SNP-ready's order check fails", async t => {
  const src = mutate('[...references, continuity[0]]', '[continuity[0], ...references]');
  const r = await run(cfgOf(REFS, [CONT], ['Ready']), src);
  t.check('mutated: the run succeeds, but its list doesn\'t end with the continuity image', r.ok && !same(r.out, [...REFS, CONT]) && r.out[0] === CONT, r);
});

add('CTRL-SNP-incomplete', "Negative control: with the not-ready stop removed, SNP-incomplete's refusal check fails: an incomplete reference is no longer named, or is kept as if Ready", async t => {
  const src = mutate("if (notReady) throw new Error(`${NAME}: the shot's continuity reference is not ready (${notReady}); nothing is kept`);", '');
  const r1 = await run(cfgOf(REFS, [], [CONTINUITY.role]), src);
  t.check("mutated, no continuity image: the run no longer names the incomplete reference, so SNP-incomplete's check fails", !r1.error.includes(CONTINUITY.role), r1);
  const r2 = await run(cfgOf(REFS, [CONT], [CONTINUITY.role]), src);
  t.check('mutated, with a continuity image: the incomplete reference is kept as if Ready', r2.ok && same(r2.out, [...REFS, CONT]), r2);
});

add('CTRL-SNP-null', "Negative control: with an empty check read as the text 'null', SNP-absent's case for [null], the shape the copy passes for a shot with no reference, fails: the run stops instead of keeping the references", async t => {
  const src = mutate("(c === null || c === undefined ? '' : String(c))", 'String(c)');
  const r = await run(cfgOf(REFS, [], [null]), src);
  t.check('mutated: the run stops, naming the check as "null", so the references aren\'t kept', !r.ok && r.error.includes('not ready (null)'), r);
});
