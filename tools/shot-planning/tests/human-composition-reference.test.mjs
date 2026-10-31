// The change of 2026-10-31, on the simulated base: a shot's human composition reference. Optional, and when
// configured either Ready, and carried into the standard, the prompt and the kept references, its image
// after the reference images and before the continuity image, or Incomplete, which stops the shot's
// planning, and with it Snapshot and G2a's request (Human composition check, Plan check). It mirrors the
// continuity reference (CNT-… in rendition-and-continuity.test.mjs), with fixed limits of its own, and must
// be a different candidate from it. HCR-… are this change's cases; CTRL-HCR-… are negative controls: the
// mechanism removed in a mutated formula or script, and the guarding check failing for its reason. Local
// results show the logic on the simulated base; they don't show what Airtable does. The texts are read
// literally here by kept-records.test.mjs's reader, not by Airtable. The fixtures' Snapshot stand-in is not
// Snapshot, so HCR-alone and HCR-ready also run Snapshot's reference list on a candidate's own values. G2a
// is not in this folder: its after-script is exercised on this base by the change's own harness, kept with
// its proposal.
import { createHash } from 'crypto';
import * as fx from './fixtures.mjs';
import { World, start, runAlone } from '../sim/world.mjs';
import { FORMULAS, INSTALLED, CONTINUITY_INSTALLED, CONTINUITY, HUMAN_COMPOSITION, HELD, S } from '../sim/formulas.mjs';
import { evaluate } from './kept-records.test.mjs';

const { bath, SRC } = fx;
const SH = 'Shots', CA = 'Candidates', AI = 'Accepted images';
const text = (table, field) => FORMULAS[table][field].airtable;
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

export const cases = [];
const add = (id, title, run) => cases.push({ id, title, run });

// What the continuity reference may decide (No. 33's role on Life in use), and what the human composition
// reference may decide (No. 48's, as the change's proposal drafts it).
const MAY = "The room's geometry and layout, its architectural materials, and the light.";
const FIGURE = 'The man: his torso facing the camera, with the shoulder and chest in frame at the right edge; his pose, his orientation and where the frame cuts him.';
const IMG = name => [{ url: `https://example.test/${name}.jpg`, filename: `${name}.jpg` }];
// A campaign request with two written shots: World hero, whose first candidate stands for No. 33, and Life
// in use, whose first candidate stands for No. 48 (in the live base, Life in use // candidate 3).
function campaign(w = new World()) {
  const b = bath(w);
  const req = fx.request(w, { name: 'Bath campaign', workflow: 'Campaign', products: [b.P.vessel, b.P.towel] });
  const shot = (name, placement, direction) => { const id = w.add(SH, { Name: name, Brief: [req.id], Placement: placement, 'Shot direction': direction, 'Lines in shot': req.lines }); w.set(SH, id, { 'Products confirmed': true }); return id; };
  const hero = shot('World hero', 'campaign, world image', 'The vessel and the towel on a stone vanity, warm side light from a window at the left.');
  const life = shot('Life in use', 'campaign, in use', 'A hand and forearm reach for the folded towel beside the vessel.');
  const no33 = fx.snapshotCandidate(w, hero), no48 = fx.snapshotCandidate(w, life);
  w.set(CA, no33, { Image: IMG('no-33') }); w.set(CA, no48, { Image: IMG('no-48') });
  return { ...b, w, req, hero, life, no33, no48 };
}
// A walkthrough shot, outside the four workflows.
function walkthroughShot(w) {
  const vessel = w.add('Products', { Name: 'Bath Vessel', 'Must stay true': 'A vessel.', Image: IMG('v') });
  const brief = w.add('Briefs', { Name: 'Walkthrough', Workflow: 'Walkthrough', Direction: 'Calm.', Products: [vessel], References: [w.add('References', { Name: 'Light', Image: IMG('r') })] });
  const walk = w.add(SH, { Name: 'Editorial hero', Brief: [brief], Placement: 'Website hero', 'Shot direction': 'A calm room.', 'Lines in shot': [fx.line(w, brief, vessel)] });
  w.set(SH, walk, { 'Products confirmed': true });
  return walk;
}
const setContinuity = (w, x) => w.set(SH, x.life, { 'Continuity reference': [x.no33], 'Continuity may decide': MAY });
const setComposition = (w, x, ref = x.no48) => w.set(SH, x.life, { 'Human composition reference': [ref], 'Human composition may decide': FIGURE });
const shotRead = (w, s) => ({ standard: w.get(SH, s, 'Current standard'), prompt: w.get(SH, s, 'Current prompt') });
const urlsOf = files => (files || []).map(f => f.url);

// Snapshot's reference list (its exact bytes, or a mutated copy) run on a candidate's own values, as
// Snapshot's trigger passes them: each image lookup's file URLs, and each check's text, [null] when empty
// as the connector reads it. It reads no table and writes nothing.
const checkOf = v => (v == null || v === '' ? [null] : [].concat(v));
async function snapshotList(w, c, src = SRC.snapshot) {
  const cfg = { referenceUrls: urlsOf(w.get(CA, c, 'Current reference images')),
    continuityUrls: urlsOf(w.get(CA, c, 'Continuity image now')), continuityChecks: checkOf(w.get(CA, c, 'Continuity check now')),
    humanCompositionUrls: urlsOf(w.get(CA, c, 'Human composition image now')), humanCompositionChecks: checkOf(w.get(CA, c, 'Human composition check now')) };
  const own = new World(), r = await runAlone(own, start(own, src, cfg));
  return { ok: r.ok, out: r.output.referenceUrls, error: r.error ? String(r.error.message || r.error) : '' };
}
// A text read literally on one shot, and the Shots formulas whose texts this reading covers here: the
// three changed and the new ones.
const read = (w, s, airtable) => S(evaluate(airtable, f => w.get(SH, s, f)));
const LITERAL = ['Plan check', 'Current standard', 'Current prompt', 'Human composition check', 'Human composition ready', 'Human composition line', 'Human composition prompt'];
const disagreements = (w, s) => LITERAL.filter(f => read(w, s, text(SH, f)) !== S(w.get(SH, s, f)));

// Nothing configured on a shot: no human composition value, and Plan check, Current standard and Current
// prompt what the baseline texts give, read literally, and what the changed texts give, read the same way.
function asBaseline(t, w, label, s) {
  const got = { plan: w.get(SH, s, 'Plan check'), ...shotRead(w, s) };
  const base = { plan: read(w, s, CONTINUITY_INSTALLED.planCheck), standard: read(w, s, CONTINUITY_INSTALLED.currentStandard), prompt: read(w, s, CONTINUITY_INSTALLED.currentPrompt) };
  t.check(`${label}: Human composition check empty, Human composition ready 0, Human composition line and prompt empty`,
    w.get(SH, s, 'Human composition check') === '' && w.get(SH, s, 'Human composition ready') === 0 && w.get(SH, s, 'Human composition line') === '' && w.get(SH, s, 'Human composition prompt') === '');
  t.check(`${label}: Plan check (Planned), Current standard and Current prompt are the baseline texts' values`, got.plan === 'Planned' && same(got, base), { got, base });
  t.check(`${label}: the changed and new texts, read literally, give the sim's values`, disagreements(w, s).length === 0, disagreements(w, s));
}
add('HCR-absent', "No human composition reference configured: Human composition check empty; on every shot, campaign, walkthrough and product-page, Plan check, Current standard and Current prompt are what the baseline texts (the continuity change's, as installed) give, read literally, with no continuity reference and with one; the kept references are as before; Snapshot starts", t => absent(t));
async function absent(t, opts = {}) {
  const x = campaign(new World(opts)), { w } = x, refs = w.get(SH, x.life, 'Reference images');
  walkthroughShot(w);
  for (const [label, configure, kept] of [['no continuity reference', () => {}, refs], ['a Ready continuity reference', () => setContinuity(w, x), [...refs, ...w.get(CA, x.no33, 'Image')]]]) {
    configure();
    for (const s of w.ids(SH)) asBaseline(t, w, `${label}, ${w.get(SH, s, 'Name')}`, s);
    const fresh = w.add(CA, { Shot: [x.life] }), list = await snapshotList(w, fresh);
    t.check(`${label}: a new Life in use candidate starts Snapshot; its list, and the stand-in's, are the reference images${kept === refs ? '' : ', then No. 33\'s image'}, as before`,
      fx.snapshotTriggers(w, fresh) && list.ok && same(list.out, urlsOf(kept)) && same(fx.snapshotCells(w, x.life)['Reference images used'], kept), { list, standIn: fx.snapshotCells(w, x.life)['Reference images used'] });
    w.del(CA, fresh);
  }
  const b = await fx.bathPlanned(new World(opts)), pw = b.w;
  await fx.pressS2(pw, b.req.id);
  t.check('setup: S2 made the product-page shots, Make and Share', pw.ids(SH).length > 1 && ['Make', 'Share'].every(m => pw.ids(SH).some(s => pw.get(SH, s, 'Made as') === m)));
  for (const s of pw.ids(SH)) asBaseline(t, pw, `product pages, ${pw.get(SH, s, 'Name')}`, s);
}

add('HCR-ready', "Life in use with No. 48 as its human composition reference and No. 33 as its continuity reference, both Ready: the standard gains the human composition line, then the continuity line; the prompt names No. 48's image the second-to-last attached, then the continuity paragraph; its new candidates keep the reference images, then No. 48's image, then No. 33's", t => ready(t));
async function ready(t, { src, ...opts } = {}) {
  const x = campaign(new World(opts)), { w } = x;
  const plain = shotRead(w, x.life), refs = w.get(SH, x.life, 'Reference images');
  setContinuity(w, x);
  const contLine = w.get(SH, x.life, 'Continuity line'), contPara = w.get(SH, x.life, 'Continuity prompt');
  const earlier = fx.snapshotCandidate(w, x.life);
  w.advance(60_000);
  setComposition(w, x);
  const no = w.get(CA, x.no48, 'Record no.'), asOf = w.get(CA, x.no48, 'Generated at');
  const line = `Human composition reference: No. ${no}, Life in use // candidate 1, image as of ${asOf}. May decide: ${FIGURE} ${HUMAN_COMPOSITION.notStandard} Set by: ASK.`;
  const para = `The second-to-last attached image is a human composition reference, from an earlier image. Use it only for: ${FIGURE} ${HUMAN_COMPOSITION.notPrompt}`;
  const life = shotRead(w, x.life);
  t.check('Human composition check Ready, Human composition ready 1, the shot still Planned; the line names the record, its title, its image time, what it may decide, what it does not, and who set it',
    w.get(SH, x.life, 'Human composition check') === HUMAN_COMPOSITION.ready && w.get(SH, x.life, 'Human composition ready') === 1 && w.get(SH, x.life, 'Plan check') === 'Planned' && w.get(SH, x.life, 'Human composition line') === line, w.get(SH, x.life, 'Human composition line'));
  t.check('the continuity reference is as it was: Ready, its line and its paragraph unchanged, the paragraph naming the last attached image',
    w.get(SH, x.life, 'Continuity ready') === 1 && w.get(SH, x.life, 'Continuity line') === contLine && w.get(SH, x.life, 'Continuity prompt') === contPara && contPara.startsWith('The last attached image is a continuity reference'));
  t.check("Life in use's standard: the standard without references, then the human composition line, then the continuity line", life.standard === `${plain.standard}\n${line}\n${contLine}`, life.standard);
  t.check("its prompt: the prompt without references, then the human composition paragraph (the second-to-last attached image), then the continuity paragraph", life.prompt === `${plain.prompt}\n\n${para}\n\n${contPara}`, life.prompt);
  t.check("World hero, No. 33's shot, has no human composition reference, and its standard names none", w.get(SH, x.hero, 'Human composition check') === '' && !w.get(SH, x.hero, 'Current standard').includes('Human composition'));
  t.check('a Life in use candidate kept before reads "The standard has changed since this image was made"', w.get(CA, earlier, 'Standard check') === 'The standard has changed since this image was made');
  const fresh = w.add(CA, { Shot: [x.life] });
  t.check('a new Life in use candidate: Snapshot starts', fx.snapshotTriggers(w, fresh));
  const kept = [...refs, ...w.get(CA, x.no48, 'Image'), ...w.get(CA, x.no33, 'Image')], list = await snapshotList(w, fresh, src);
  t.check("Snapshot's reference list ran to the end on the new candidate's own values", list.ok, list);
  t.check("Snapshot's reference list keeps the reference images, then No. 48's image, then No. 33's last", list.ok && same(list.out, urlsOf(kept)), { list, kept: urlsOf(kept) });
  const next = fx.snapshotCandidate(w, x.life), heroNext = fx.snapshotCandidate(w, x.hero);
  t.check("kept (the fixtures' stand-in), the candidate holds the same list", same(w.get(CA, next, 'Reference images used'), kept), w.get(CA, next, 'Reference images used'));
  t.check("Human composition image now: No. 48's image on a Life in use candidate, empty on a World hero one; Human composition check now Ready there, empty on the World hero one",
    same(w.get(CA, next, 'Human composition image now'), w.get(CA, x.no48, 'Image')) && w.get(CA, heroNext, 'Human composition image now') == null
    && same(w.get(CA, next, 'Human composition check now'), [HUMAN_COMPOSITION.ready]) && w.get(CA, heroNext, 'Human composition check now') == null);
  t.check('the changed and new texts, read literally, give the sim\'s values', disagreements(w, x.life).length === 0, disagreements(w, x.life));
  return { x, w, next };
}

add('HCR-alone', 'A human composition reference with no continuity reference: its paragraph names the last attached image, and its image is kept last', async t => {
  const x = campaign(), { w } = x;
  const plain = shotRead(w, x.life), refs = w.get(SH, x.life, 'Reference images');
  setComposition(w, x);
  const line = w.get(SH, x.life, 'Human composition line'), life = shotRead(w, x.life);
  const para = `The last attached image is a human composition reference, from an earlier image. Use it only for: ${FIGURE} ${HUMAN_COMPOSITION.notPrompt}`;
  t.check('Human composition check Ready; Continuity check empty; Planned', w.get(SH, x.life, 'Human composition check') === HUMAN_COMPOSITION.ready && w.get(SH, x.life, 'Continuity check') === '' && w.get(SH, x.life, 'Planned') === 1);
  t.check('the standard: as before, then the human composition line', life.standard === `${plain.standard}\n${line}` && line.startsWith(`Human composition reference: No. ${w.get(CA, x.no48, 'Record no.')}, `), life.standard);
  t.check('the prompt: as before, then one paragraph, naming the last attached image', life.prompt === `${plain.prompt}\n\n${para}`, life.prompt);
  const fresh = w.add(CA, { Shot: [x.life] }), kept = [...refs, ...w.get(CA, x.no48, 'Image')], list = await snapshotList(w, fresh);
  t.check("Snapshot's reference list keeps the reference images, then No. 48's image last; so does the stand-in", list.ok && same(list.out, urlsOf(kept)) && same(fx.snapshotCells(w, x.life)['Reference images used'], kept), list);
  t.check('the changed and new texts, read literally, give the sim\'s values', disagreements(w, x.life).length === 0, disagreements(w, x.life));
});

add('HCR-continuity-added', "A human composition reference set first and a continuity reference added afterwards: the human composition paragraph changes from the last attached image to the second-to-last, a candidate kept before reads changed, and a new candidate keeps No. 48's image, then No. 33's", async t => {
  const x = campaign(), { w } = x, refs = w.get(SH, x.life, 'Reference images');
  setComposition(w, x);
  const alone = w.get(SH, x.life, 'Human composition prompt'), earlier = fx.snapshotCandidate(w, x.life);
  t.check('the human composition reference alone: its paragraph names the last attached image, and a candidate kept with it reads "Same standard"',
    alone.startsWith('The last attached image is a human composition reference') && w.get(CA, earlier, 'Standard check') === 'Same standard as when this image was made', alone);
  w.advance(60_000); setContinuity(w, x);
  const para = w.get(SH, x.life, 'Human composition prompt'), contPara = w.get(SH, x.life, 'Continuity prompt');
  t.check('the continuity reference added: the human composition paragraph names the second-to-last attached image, and is otherwise as it was; the continuity paragraph follows it, naming the last',
    para === alone.replace('The last attached image', 'The second-to-last attached image') && contPara.startsWith('The last attached image is a continuity reference') && w.get(SH, x.life, 'Current prompt').endsWith(`\n\n${para}\n\n${contPara}`), para);
  t.check('the candidate kept before reads "The standard has changed since this image was made"', w.get(CA, earlier, 'Standard check') === 'The standard has changed since this image was made', w.get(CA, earlier, 'Standard check'));
  const fresh = w.add(CA, { Shot: [x.life] }), kept = [...refs, ...w.get(CA, x.no48, 'Image'), ...w.get(CA, x.no33, 'Image')], list = await snapshotList(w, fresh);
  t.check("a new candidate starts Snapshot; Snapshot's reference list keeps the reference images, then No. 48's image, then No. 33's last; so does the stand-in",
    fx.snapshotTriggers(w, fresh) && list.ok && same(list.out, urlsOf(kept)) && same(fx.snapshotCells(w, x.life)['Reference images used'], kept), list);
  t.check('the changed and new texts, read literally, give the sim\'s values', disagreements(w, x.life).length === 0, disagreements(w, x.life));
});

add('HCR-incomplete', "A configured human composition reference that is incomplete stops generation visibly, never drops out of the inputs: the shot reads Not planned with the reason, Snapshot doesn't start, and a candidate kept while it was Ready is Held, so G2a's trigger doesn't hold; completed again, the shot is Planned", t => incomplete(t));
async function incomplete(t, opts = {}) {
  const x = campaign(new World(opts)), { w } = x;
  const other = fx.snapshotCandidate(w, x.life), blank = fx.snapshotCandidate(w, x.hero, { image: false });
  const two = fx.snapshotCandidate(w, x.hero); w.set(CA, two, { Image: [...IMG('a'), ...IMG('b')] });
  const comma = fx.snapshotCandidate(w, x.hero); w.set(CA, comma, { Image: IMG('figure, warm') });
  setContinuity(w, x); setComposition(w, x);
  const kept = fx.snapshotCandidate(w, x.life, { image: false }); w.set(CA, kept, { 'Generate when ready': true });
  t.check("setup: both references Ready, the shot Planned, and a candidate kept with them reads Ready to generate, with the reference images, No. 48's image and No. 33's",
    w.get(SH, x.life, 'Plan check') === 'Planned' && w.get(CA, kept, 'Ready') === 'Ready to generate' && (w.get(CA, kept, 'Reference images used') || []).length === 3);
  const blocked = (label, cells, reason, shot = x.life) => {
    if (cells) w.set(SH, shot, cells);
    const fresh = w.add(CA, { Shot: [shot] });
    const why = { check: w.get(SH, shot, 'Human composition check'), plan: w.get(SH, shot, 'Plan check') };
    t.check(`${label}: Human composition check "${reason}"; Plan check "Not planned: the human composition reference is incomplete: …"; Planned 0; its line not in the standard`,
      why.check === reason && why.plan === `${HUMAN_COMPOSITION.notPlanned}${reason.replace('Incomplete: ', '')}` && w.get(SH, shot, 'Planned') === 0 && w.get(SH, shot, 'Human composition ready') === 0 && !w.get(SH, shot, 'Current standard').includes('Human composition reference:'), why);
    t.check(`${label}: a new candidate starts no Snapshot and reads Held, naming the Plan check`, !fx.snapshotTriggers(w, fresh) && w.get(CA, fresh, 'Ready') === HELD.notPlanned && w.get(CA, fresh, 'Status').startsWith('Held // the shot changed.'), w.get(CA, fresh, 'Ready'));
    if (shot === x.life) t.check(`${label}: the candidate kept with the reference is Held, so G2a's trigger (Ready to generate) doesn't hold`, w.get(CA, kept, 'Ready') === HELD.notPlanned && w.get(CA, kept, 'Ready') !== 'Ready to generate', w.get(CA, kept, 'Ready'));
    if (shot === x.life) t.check(`${label}: a Life in use candidate's Human composition image now is empty while the shot's Human composition check reads Incomplete`,
      w.get(CA, fresh, 'Human composition image now') == null && why.check.startsWith('Incomplete'), w.get(CA, fresh, 'Human composition image now'));
    t.check(`${label}: the changed and new texts, read literally, give the sim's values`, disagreements(w, shot).length === 0, disagreements(w, shot));
    w.del(CA, fresh);
  };
  blocked('a link with nothing it may decide', { 'Human composition may decide': null }, HUMAN_COMPOSITION.role);
  blocked('a link with only spaces and line breaks for what it may decide', { 'Human composition may decide': ' \n\t ' }, HUMAN_COMPOSITION.role);
  blocked('what it may decide with no link', { 'Human composition reference': null, 'Human composition may decide': FIGURE }, HUMAN_COMPOSITION.count);
  blocked('two links', { 'Human composition reference': [x.no48, other] }, HUMAN_COMPOSITION.count);
  blocked('a linked candidate without an image', { 'Human composition reference': [blank] }, HUMAN_COMPOSITION.image);
  blocked('a linked candidate with two files', { 'Human composition reference': [two] }, HUMAN_COMPOSITION.image);
  blocked('a file name with a comma', { 'Human composition reference': [comma] }, HUMAN_COMPOSITION.image);
  blocked('the same candidate as the continuity reference', { 'Human composition reference': [x.no33] }, HUMAN_COMPOSITION.distinct);
  w.set(SH, x.life, { 'Continuity may decide': null });
  t.check("the same candidate as a continuity reference that links one candidate but is incomplete: Human composition check reads that it must be a different candidate, Plan check names the continuity reference, and the texts, read literally, give the sim's values",
    w.get(SH, x.life, 'Human composition check') === HUMAN_COMPOSITION.distinct && w.get(SH, x.life, 'Plan check') === `${CONTINUITY.notPlanned}${CONTINUITY.role.replace('Incomplete: ', '')}` && disagreements(w, x.life).length === 0,
    [w.get(SH, x.life, 'Human composition check'), w.get(SH, x.life, 'Plan check'), disagreements(w, x.life)]);
  w.set(SH, x.life, { 'Continuity may decide': MAY });
  w.set(SH, x.life, { 'Human composition reference': null, 'Human composition may decide': ' \n ' });
  t.check('no link and only spaces for what it may decide: nothing configured; Human composition check empty; Planned, the continuity reference still Ready',
    w.get(SH, x.life, 'Human composition check') === '' && w.get(SH, x.life, 'Planned') === 1 && w.get(SH, x.life, 'Continuity ready') === 1, w.get(SH, x.life, 'Human composition check'));
  setComposition(w, x);
  w.advance(60_000); w.set(CA, x.no48, { Image: null });
  blocked("the reference's image removed", null, HUMAN_COMPOSITION.image);
  w.set(CA, x.no48, { Image: IMG('no-48') });
  t.check('completed again: Ready, Planned; a new candidate starts Snapshot', w.get(SH, x.life, 'Human composition check') === HUMAN_COMPOSITION.ready && w.get(SH, x.life, 'Planned') === 1 && fx.snapshotTriggers(w, w.add(CA, { Shot: [x.life] })));
  const walk = walkthroughShot(w), liveBefore = shotRead(w, walk);
  blocked('a walkthrough shot', { 'Human composition reference': [x.no48], 'Human composition may decide': FIGURE }, HUMAN_COMPOSITION.notNewWorkflow, walk);
  t.check("the walkthrough shot's standard and prompt remain the live texts' values", same(shotRead(w, walk), liveBefore));
}

add('HCR-continuity-first', "With both references configured and the continuity reference incomplete, Plan check names the continuity reference, whether or not the human composition reference is complete; once it is corrected, Plan check names the human composition reference's fault. With two continuity links, the different-candidate test waits until the continuity reference holds one", async t => {
  const x = campaign(), { w } = x, other = fx.snapshotCandidate(w, x.hero);
  const plan = () => w.get(SH, x.life, 'Plan check'), hc = () => w.get(SH, x.life, 'Human composition check');
  const names = (ref, why) => `${ref.notPlanned}${why.replace('Incomplete: ', '')}`;
  const agree = state => t.check(`${state}: the changed and new texts, read literally, give the sim's values`, disagreements(w, x.life).length === 0, disagreements(w, x.life));
  setContinuity(w, x); setComposition(w, x);
  w.set(SH, x.life, { 'Continuity may decide': null });
  t.check('the continuity reference incomplete, the human composition reference Ready: Plan check names the continuity reference', plan() === names(CONTINUITY, CONTINUITY.role) && hc() === HUMAN_COMPOSITION.ready, plan());
  agree('the continuity reference incomplete');
  w.set(SH, x.life, { 'Human composition may decide': null });
  t.check('both incomplete: Plan check names the continuity reference', plan() === names(CONTINUITY, CONTINUITY.role) && hc() === HUMAN_COMPOSITION.role, plan());
  agree('both incomplete');
  w.set(SH, x.life, { 'Continuity may decide': MAY });
  t.check('the continuity reference completed: Plan check names the human composition reference', plan() === names(HUMAN_COMPOSITION, HUMAN_COMPOSITION.role), plan());
  agree('the continuity reference completed');
  w.set(SH, x.life, { 'Human composition may decide': FIGURE, 'Human composition reference': [x.no33], 'Continuity reference': [x.no33, other] });
  t.check('two continuity links, one of them the human composition reference: Plan check names the continuity reference, and Human composition check reads Ready',
    plan() === names(CONTINUITY, CONTINUITY.count) && hc() === HUMAN_COMPOSITION.ready, [plan(), hc()]);
  agree('two continuity links');
  w.set(SH, x.life, { 'Continuity reference': [x.no33] });
  t.check('the continuity reference corrected to that one candidate: Plan check names the human composition reference, which must be a different candidate', plan() === names(HUMAN_COMPOSITION, HUMAN_COMPOSITION.distinct), plan());
  agree('the continuity reference corrected');
  w.set(SH, x.life, { 'Human composition reference': [x.no48] });
  t.check('No. 48 as the human composition reference: both Ready, Planned', hc() === HUMAN_COMPOSITION.ready && w.get(SH, x.life, 'Continuity check') === CONTINUITY.ready && plan() === 'Planned');
  agree('both Ready');
});

add('HCR-image-changed', "The human composition reference's image replaced: Life in use's standard names the new image time, so a candidate kept with the old reads changed", async t => {
  const { x, w, next } = await ready({ check: () => true });
  t.check('kept with the reference: "Same standard"', w.get(CA, next, 'Standard check') === 'Same standard as when this image was made');
  w.advance(60_000); w.set(CA, x.no48, { Image: IMG('no-48-v2') });
  t.check("No. 48's image replaced: the line names its new time, and the candidate reads changed",
    w.get(SH, x.life, 'Human composition line').includes(`image as of ${w.get(CA, x.no48, 'Generated at')}.`) && w.get(CA, next, 'Standard check') === 'The standard has changed since this image was made', w.get(CA, next, 'Standard check'));
});

add('HCR-kept-unchanged', "Earlier candidates' kept inputs (Standard used, Prompt used, Reference images used) don't change when a human composition reference is set, changed or cleared: their stored fields stay as kept, and they read standard-changed only through Standard check", async t => {
  const x = campaign(), { w } = x, other = fx.snapshotCandidate(w, x.hero);
  setContinuity(w, x);
  const before = fx.snapshotCandidate(w, x.life), waiting = fx.snapshotCandidate(w, x.life, { image: false });
  const stored = [before, waiting].map(c => fx.stored(w, CA, c));
  const asKept = label => t.check(`${label}: the earlier candidates' stored fields, their kept inputs among them, are as kept`, same([before, waiting].map(c => fx.stored(w, CA, c)), stored));
  w.advance(60_000); setComposition(w, x);
  asKept('set');
  t.check('set: they read changed through Standard check, and the one without an image is held on the standard',
    w.get(CA, before, 'Standard check') === 'The standard has changed since this image was made' && w.get(CA, waiting, 'Ready') === HELD.standard, [w.get(CA, before, 'Standard check'), w.get(CA, waiting, 'Ready')]);
  const withIt = fx.snapshotCandidate(w, x.life), keptWith = fx.stored(w, CA, withIt);
  t.check("a candidate kept with it holds No. 48's image, then No. 33's", same(w.get(CA, withIt, 'Reference images used').slice(-2), [...w.get(CA, x.no48, 'Image'), ...w.get(CA, x.no33, 'Image')]));
  w.advance(60_000); w.set(SH, x.life, { 'Human composition may decide': `${FIGURE} Also the angle of his arm.` });
  asKept('what it may decide changed');
  w.advance(60_000); setComposition(w, x, other);
  asKept('another candidate linked');
  t.check('changed twice: the candidate kept with it is as kept too, and reads changed', fx.stored(w, CA, withIt) === keptWith && w.get(CA, withIt, 'Standard check') === 'The standard has changed since this image was made');
  w.advance(60_000); w.set(SH, x.life, { 'Human composition reference': null, 'Human composition may decide': null });
  asKept('cleared');
  t.check("cleared: the candidates kept before it read \"Same standard\" again; the one kept with it reads changed and still holds No. 48's image",
    w.get(CA, before, 'Standard check') === 'Same standard as when this image was made' && w.get(CA, waiting, 'Ready') === 'Ready to generate'
    && fx.stored(w, CA, withIt) === keptWith && w.get(CA, withIt, 'Standard check') === 'The standard has changed since this image was made', [w.get(CA, before, 'Standard check'), w.get(CA, waiting, 'Ready')]);
});

add('HCR-confers-nothing', "Referencing a candidate confers nothing: No. 48 isn't accepted, and its stored fields don't change apart from the link's pair, Human composition reference for; a candidate of another shot, referenced, reads every field as before apart from that pair; the brief's references don't change", async t => {
  const x = campaign(), { w } = x, other = fx.snapshotCandidate(w, x.hero);
  setContinuity(w, x);
  const pair = w.f(w.t(CA), 'Human composition reference for').id;
  const storedBut = c => { const cells = { ...w.t(CA).records.get(c).cells }; delete cells[pair]; return JSON.stringify(cells); };
  const fields = w.t(CA).fields.map(f => f.name).filter(n => n !== 'Human composition reference for');
  const values = c => JSON.stringify(fields.map(n => w.get(CA, c, n)));
  const no48 = storedBut(x.no48), accepted = w.ids(AI).length, briefRefs = JSON.stringify(w.get('Briefs', x.req.id, 'References'));
  w.advance(60_000); setComposition(w, x);
  t.check("No. 48's stored fields are as they were, apart from the pair, which names Life in use", storedBut(x.no48) === no48 && same(w.get(CA, x.no48, 'Human composition reference for'), [x.life]));
  t.check('No. 48 is not accepted: Acceptance "Not accepted", Is accepted 0, and no accepted record is made', w.get(CA, x.no48, 'Acceptance') === 'Not accepted' && w.get(CA, x.no48, 'Is accepted') === 0 && w.ids(AI).length === accepted);
  t.check("the brief's references are unchanged", JSON.stringify(w.get('Briefs', x.req.id, 'References')) === briefRefs);
  const otherBefore = values(other), heroBefore = shotRead(w, x.hero);
  setComposition(w, x, other);
  t.check("a World hero candidate as the reference: Ready; every one of its fields reads as before, apart from the pair; World hero's standard and prompt are unchanged",
    w.get(SH, x.life, 'Human composition check') === HUMAN_COMPOSITION.ready && values(other) === otherBefore && same(w.get(CA, other, 'Human composition reference for'), [x.life]) && same(shotRead(w, x.hero), heroBefore));
  t.check('No. 48, no longer linked, loses only the pair', w.get(CA, x.no48, 'Human composition reference for') == null && storedBut(x.no48) === no48);
});

// The baseline texts' SHA-256, as main e753aa3 carries them (Shots › Plan check, Current standard and
// Current prompt, field names for field IDs): the texts the continuity change installed in the live base.
const BASELINE_SHA256 = {
  planCheck: 'd4d9f04cb903740c30daadd443c91f73cb59e5be96dd8deff0a3c0b9d1b7e477',
  currentStandard: '3198c26e2bbf45b6a325254c6f222eed0286764c66d1b98ec4cd778d9a615298',
  currentPrompt: '894c481a0ba8f07c1cc9cfd4ef370ac1fdc580fbc139deaf89ac0458f1c12660',
};
add('HCR-text', "Plan check, Current standard and Current prompt are their baseline texts (the continuity change's, as installed, as main e753aa3 carries them) plus one addition each: Plan check one more test, directly after the continuity test; the standard's and the prompt's addition directly before the continuity addition, inside the new-workflow branch; Human composition ready reads Human composition check", async t => {
  const sha = s => createHash('sha256').update(s, 'utf8').digest('hex');
  t.check('the baseline: each text is the one main e753aa3 carries, by its SHA-256', Object.entries(BASELINE_SHA256).every(([k, h]) => sha(CONTINUITY_INSTALLED[k]) === h), Object.keys(BASELINE_SHA256).map(k => sha(CONTINUITY_INSTALLED[k])));
  const std = text(SH, 'Current standard'), prompt = text(SH, 'Current prompt'), plan = text(SH, 'Plan check');
  const addStd = ' & IF({Human composition ready}, "\\n" & {Human composition line}, "")', addPrompt = ' & IF({Human composition ready}, "\\n\\n" & {Human composition prompt}, "")';
  t.check('Current standard: the baseline with one addition, directly before the continuity addition', std.split(addStd).length === 2 && std.replace(addStd, '') === CONTINUITY_INSTALLED.currentStandard
    && std.includes(`${addStd} & IF({Continuity ready}, "\\n" & {Continuity line}, "")`), std);
  t.check('Current prompt: the baseline with one addition, directly before the continuity addition', prompt.split(addPrompt).length === 2 && prompt.replace(addPrompt, '') === CONTINUITY_INSTALLED.currentPrompt
    && prompt.includes(`${addPrompt} & IF({Continuity ready}, "\\n\\n" & {Continuity prompt}, "")`), prompt);
  t.check('each addition sits before the live default branch', std.indexOf(addStd) < std.lastIndexOf('ARRAYJOIN({Brief standard}') && prompt.indexOf(addPrompt) < prompt.lastIndexOf('ARRAYJOIN({Brief prompt}'));
  const test = `IF(LEFT({Human composition check}, 10) = "Incomplete", "${HUMAN_COMPOSITION.notPlanned}" & SUBSTITUTE({Human composition check}, "Incomplete: ", ""),\n`;
  t.check('Plan check: the baseline inside one more test, directly after the continuity test, with its one closing parenthesis',
    plan.split(test).length === 2 && plan.replace(test, '').replace(/\)$/, '') === CONTINUITY_INSTALLED.planCheck
    && plan === `IF(LEFT({Continuity check}, 10) = "Incomplete", "${CONTINUITY.notPlanned}" & SUBSTITUTE({Continuity check}, "Incomplete: ", ""),\n${test}${INSTALLED.planCheck}))`, plan.slice(0, 400));
  t.check('Human composition ready: Human composition check is Ready', text(SH, 'Human composition ready') === 'IF({Human composition check} = "Ready", 1, 0)');
});

// A case run with a recording t: its checks as [label, ok], as written and mutated.
const recorded = async (fn, opts) => { const got = []; await fn({ check: (label, ok) => { got.push([label, !!ok]); return !!ok; } }, opts); return got; };
const control = async (t, fn, mutated, expectFailed) => {
  const asWritten = await recorded(fn, {});
  t.check('as written, every check of the case holds', asWritten.length > 0 && asWritten.every(([, ok]) => ok), asWritten.filter(([, ok]) => !ok).map(([l]) => l));
  const got = await recorded(fn, mutated), failed = got.filter(([, ok]) => !ok).map(([l]) => l);
  t.check(`mutated: the guard "${expectFailed}…" fails`, failed.some(l => l.startsWith(expectFailed)), failed);
  return { got, failed };
};
add('CTRL-HCR-absent', "Negative control: with Current standard's function giving a new-workflow shot the human composition line's line break whether or not the reference is ready, HCR-absent's baseline guard fails: a shot without one gains a character", async t => {
  const NEW = ['Product pages', 'Collection', 'Marketing', 'Campaign'];
  const extra = { [SH]: { 'Current standard': Object.assign(r => { const v = FORMULAS[SH]['Current standard'](r); return NEW.includes(S(r.get('Workflow'))) && S(r.get('Human composition ready')) !== '1' ? `${v}\n` : v; }, { airtable: 'a line break too many' }) } };
  await control(t, absent, { formulas: extra }, "no continuity reference, Life in use: Plan check (Planned), Current standard and Current prompt are the baseline texts' values");
});
add('CTRL-HCR-incomplete', "Negative control: with Plan check as the baseline (no human composition test), HCR-incomplete's guards fail: an incomplete reference leaves the shot Planned, Snapshot starts, and a new candidate is kept without No. 48's image (the reference drops out of the inputs); the candidate kept with the reference is Held only because its standard changed, not on the Plan check", async t => {
  const baseline = { [SH]: { 'Plan check': Object.assign(r => FORMULAS[SH]['Plan check']({ id: r.id, get: n => (n === 'Human composition check' ? '' : r.get(n)) }), { airtable: 'baseline' }) } };
  const { failed } = await control(t, incomplete, { formulas: baseline }, 'a link with nothing it may decide: Human composition check');
  t.check('mutated: Snapshot starts for the incomplete reference, and the candidate kept with the reference is not Held on the Plan check',
    failed.some(l => l.startsWith('a link with nothing it may decide: a new candidate starts no Snapshot')) && failed.some(l => l.startsWith('a link with nothing it may decide: the candidate kept with the reference is Held')), failed);
  // The reason, on Life in use with the mutation: a new candidate made while the reference is incomplete.
  const x = campaign(new World({ formulas: baseline })), { w } = x, refs = w.get(SH, x.life, 'Reference images');
  setContinuity(w, x); setComposition(w, x);
  const kept = fx.snapshotCandidate(w, x.life, { image: false }); w.set(CA, kept, { 'Generate when ready': true });
  w.set(SH, x.life, { 'Human composition may decide': null });
  const fresh = w.add(CA, { Shot: [x.life] }), next = fx.snapshotCandidate(w, x.life);
  t.check('mutated, nothing it may decide: Human composition check reads Incomplete, yet the shot reads Planned and a new candidate starts Snapshot',
    w.get(SH, x.life, 'Human composition check') === HUMAN_COMPOSITION.role && w.get(SH, x.life, 'Plan check') === 'Planned' && fx.snapshotTriggers(w, fresh), w.get(SH, x.life, 'Plan check'));
  t.check("mutated: kept (the fixtures' stand-in), the new candidate holds the reference images, then No. 33's image only: No. 48's image drops out of the inputs",
    same(w.get(CA, next, 'Reference images used'), [...refs, ...w.get(CA, x.no33, 'Image')]), w.get(CA, next, 'Reference images used'));
  t.check('mutated: the candidate kept with the reference reads Held because its standard changed, not on the Plan check', w.get(CA, kept, 'Ready') === HELD.standard, w.get(CA, kept, 'Ready'));
});
add('CTRL-HCR-order', "Negative control: with Snapshot's reference list putting the human composition image after the continuity image, HCR-ready's order check fails, in a run that finished", async t => {
  const src = SRC.snapshot.replace('[...references, ...composition, ...continuity]', '[...references, ...continuity, ...composition]');
  t.check('the mutation applies', src !== SRC.snapshot);
  const { got } = await control(t, ready, { src }, "Snapshot's reference list keeps the reference images, then No. 48's image");
  t.check('mutated: the run itself finished', got.some(([l, ok]) => l.startsWith("Snapshot's reference list ran to the end") && ok));
});
add('CTRL-HCR-distinct', "Negative control: with Human composition check lacking the different-candidate test, HCR-incomplete's guard for the continuity reference's own candidate fails: the shot reads Planned with one image as both references", async t => {
  const without = { [SH]: { 'Human composition check': Object.assign(r => {
    const v = FORMULAS[SH]['Human composition check'](r);
    return v === HUMAN_COMPOSITION.distinct ? (S(r.get('Human composition may decide')).trim() ? HUMAN_COMPOSITION.ready : HUMAN_COMPOSITION.role) : v;
  }, { airtable: 'no different-candidate test' }) } };
  await control(t, incomplete, { formulas: without }, 'the same candidate as the continuity reference: Human composition check');
});
