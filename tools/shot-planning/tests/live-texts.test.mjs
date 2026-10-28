// The existing tables' formulas against the live base: each existing formula is the live text, each
// Changed formula is its live text plus only v6's change, and on a walkthrough shot and its
// candidates the changed formulas give what the live texts give (§7.8). The live texts are
// formulas.mjs LIVE, read from the build copy, whose schema is the live base's. The expected values
// below are written out by hand from those texts, not computed by the sim's mirrors.
import * as fx from './fixtures.mjs';
import { World } from '../sim/world.mjs';
import { FORMULAS, LIVE, HELD } from '../sim/formulas.mjs';

const { bathPlanned, pressS2, slotAt } = fx;
const SH = 'Shots', CA = 'Candidates', AI = 'Accepted images';

export const cases = [];
const add = (id, title, run) => cases.push({ id, title, run });
const text = (table, field) => FORMULAS[table][field].airtable;

// ---------------------------------------------------------------------------------------------
add('LIVE-unchanged', 'Every existing formula this unit doesn\'t change carries the live text, character for character', async t => {
  const same = [
    ['Products', 'Product facts', LIVE.productFacts], ['Products', 'Prompt line', LIVE.productPromptLine],
    ['References', 'Reference line', LIVE.referenceLine], ['References', 'Prompt line', LIVE.referencePromptLine],
    ['Briefs', 'Brief standard', LIVE.briefStandard], ['Briefs', 'Brief prompt', LIVE.briefPrompt], [SH, 'Title', LIVE.shotTitle],
    [CA, 'Title', LIVE.candidateTitle], [CA, 'Has image', LIVE.candidateHasImage], [CA, 'Standard check', LIVE.standardCheck],
    [AI, 'Record complete', LIVE.recordComplete], [AI, 'Coverage', LIVE.coverage], [AI, 'Current title', LIVE.acceptedCurrentTitle],
  ];
  for (const [table, field, live] of same) t.check(`${table} › ${field} is the live text`, text(table, field) === live, text(table, field));
});

add('LIVE-changed', 'Each Changed formula is its live text plus only v6\'s change: the Workflow branch keeps the live text as its default; Decision swaps one field; Ready wraps the live text; Status inserts one branch after its first', async t => {
  for (const [field, live] of [['Current standard', LIVE.currentStandard], ['Current prompt', LIVE.currentPrompt]]) {
    const x = text(SH, field);
    t.check(`Shots › ${field}: a Workflow branch whose default is the live text`, x.startsWith('IF(OR(ARRAYJOIN({Workflow}) = "Product pages", ') && x.endsWith(`,\n${live})`), x);
  }
  t.check('Shots › Decision: the live text with {Placement} replaced by {Effective placement}, and nothing else',
    text(SH, 'Decision') === LIVE.decision.replace('"Accepted for " & {Placement}', '"Accepted for " & {Effective placement}') && text(SH, 'Decision') !== LIVE.decision && !text(SH, 'Decision').includes('{Placement}'));
  t.check('Shots › Can generate: v6 §6\'s text, replacing the live one', text(SH, 'Can generate') === 'IF(AND({Planned} = 1, COUNTA({Product image}) > 0, COUNTA({Reference images}) > 0), 1, 0)' && LIVE.canGenerate.includes('{Placement} != ""'));
  const ready = text(CA, 'Ready');
  t.check('Candidates › Ready: the held labels, for a candidate that has never had an image, around the live text',
    ready === `IF(AND({Has image} = 0, {Generated at} = BLANK()), IF({Shot planned} != 1, "${HELD.notPlanned}", IF(AND({Standard check} != "", LEFT({Standard check}, 4) != "Same"), "${HELD.standard}", ${LIVE.ready})), ${LIVE.ready})`, ready);
  const status = text(CA, 'Status'), held = `IF(LEFT({Ready}, 5) = "Held:", "Held // the shot changed." & IF({Generate when ready}, "${HELD.continues}", ""), `;
  t.check('Candidates › Status: one held branch, directly after the live first branch; the rest is the live text',
    status.startsWith(`IF({Has image} = 1, "Image ready", ${held}`) && status.replace(held, '').slice(0, -1) === LIVE.status, status);
});

// A walkthrough request as the live base has it: one product, one reference, three written shots' worth of fields.
function walkthrough(w) {
  const vessel = w.add('Products', { Name: 'Bath Vessel', 'Must stay true': 'A bath vessel in a natural glaze.', Material: 'Stoneware', Finish: 'Natural glaze', Image: [{ url: 'https://example.test/v.jpg', filename: 'v.jpg' }] });
  const ref = w.add('References', { Name: 'Morning light', Role: 'Light', 'Applies to': 'Whole brand', 'What it may decide': 'The light only.', Image: [{ url: 'https://example.test/r.jpg', filename: 'r.jpg' }] });
  const brief = w.add('Briefs', { Name: 'Bath vessel launch', Workflow: 'Walkthrough', Purpose: 'Launch the vessel.', Direction: 'Calm and quiet.', 'What may vary': 'The room.', Products: [vessel], References: [ref] });
  const line = fx.line(w, brief, vessel);
  const shot = w.add(SH, { Name: 'Editorial hero', Brief: [brief], Placement: 'Website hero', 'Shot direction': 'The vessel in a calm room.', 'Lines in shot': [line] });
  w.set(SH, shot, { 'Products confirmed': true });
  return { vessel, ref, brief, line, shot };
}
const dtf = iso => `${iso.slice(0, 10)} ${iso.slice(11, 19)}`;

add('LIVE-7.8', 'On a walkthrough shot and its candidates the changed formulas give the live texts\' values: standard, prompt, Decision, Can generate, Title, Standard check, Ready and Status; the held labels apply only to an imageless candidate', t => live78(t));
async function live78(t, opts = {}) {
  const w = new World(opts), x = walkthrough(w);
  const facts = `Bath Vessel. Must stay true: A bath vessel in a natural glaze. Material: Stoneware. Finish: Natural glaze. Product image as of ${dtf(w.get('Products', x.vessel, 'Image updated'))} UTC.`;
  const refLine = `Morning light (Light, Whole brand): The light only. Image as of ${dtf(w.get('References', x.ref, 'Image updated'))} UTC.`;
  const briefStandard = `Purpose: Launch the vessel.\nDirection: Calm and quiet.\nWhat may vary: The room.\nProduct: ${facts}\nReferences:\n${refLine}`;
  const briefPrompt = 'Direction: Calm and quiet.\n\nWhat may vary: The room.\n\nThe first attached image is the product image. It is the authority for the product: Bath Vessel. A bath vessel in a natural glaze. Material: Stoneware. Finish: Natural glaze. Do not redesign, substitute, embellish or alter the product.\n\nThe remaining attached images are references, in this order. Use each one only for its role. None of them may change the product.\nLight reference: The light only.';
  t.check('Brief standard and Brief prompt read as live', w.get('Briefs', x.brief, 'Brief standard') === briefStandard && w.get('Briefs', x.brief, 'Brief prompt') === briefPrompt, [w.get('Briefs', x.brief, 'Brief standard'), w.get('Briefs', x.brief, 'Brief prompt')]);
  t.check('Current standard: the live expression', w.get(SH, x.shot, 'Current standard') === `${briefStandard}\nShot: Editorial hero, for Website hero. The vessel in a calm room.`, w.get(SH, x.shot, 'Current standard'));
  t.check('Current prompt: the live expression', w.get(SH, x.shot, 'Current prompt') === `Generate one single commercial photograph. Not a grid, collage, contact sheet or multi-image layout.\n\nShot: Editorial hero, for Website hero. The vessel in a calm room.\n\n${briefPrompt}`, w.get(SH, x.shot, 'Current prompt'));
  t.check('Planned and Can generate 1, as live (Placement, direction and both images present)', w.get(SH, x.shot, 'Planned') === 1 && w.get(SH, x.shot, 'Can generate') === 1, w.get(SH, x.shot, 'Plan check'));
  t.check('Decision with no acceptance: "No accepted image yet"', w.get(SH, x.shot, 'Decision') === 'No accepted image yet');

  // a candidate with its image, kept by Snapshot and accepted by Accept
  const made = fx.snapshotCandidate(w, x.shot);
  t.check('Title "Editorial hero // candidate 1"; Has image 1', w.get(CA, made, 'Title') === 'Editorial hero // candidate 1' && w.get(CA, made, 'Has image') === 1);
  t.check('Standard check "Same standard as when this image was made"; Ready "Ready to generate"; Status "Image ready"',
    w.get(CA, made, 'Standard check') === 'Same standard as when this image was made' && w.get(CA, made, 'Ready') === 'Ready to generate' && w.get(CA, made, 'Status') === 'Image ready', [w.get(CA, made, 'Ready'), w.get(CA, made, 'Status')]);
  const a1 = fx.accept(w, made);
  t.check('the acceptance: Record complete, Coverage "Current standard", Current title the candidate\'s; Decision "Accepted for Website hero"',
    w.get(AI, a1, 'Record complete') === 'Complete' && w.get(AI, a1, 'Coverage') === 'Current standard' && w.get(AI, a1, 'Current title') === 'Editorial hero // candidate 1' && w.get(SH, x.shot, 'Decision') === 'Accepted for Website hero', w.get(SH, x.shot, 'Decision'));
  fx.accept(w, fx.snapshotCandidate(w, x.shot));
  t.check('two acceptances: "Accepted for Website hero · 2 images"', w.get(SH, x.shot, 'Decision') === 'Accepted for Website hero · 2 images', w.get(SH, x.shot, 'Decision'));

  // an imageless candidate: a new one, before and after Snapshot, requested
  const fresh = w.add(CA, { Shot: [x.shot] });
  t.check('a new candidate: Title "// new candidate", Standard check empty, Ready "Preparing…" (not held), Status "Preparing inputs"',
    w.get(CA, fresh, 'Title') === 'Editorial hero // new candidate' && w.get(CA, fresh, 'Standard check') === '' && w.get(CA, fresh, 'Ready') === 'Preparing…' && w.get(CA, fresh, 'Status') === 'Preparing inputs',
    [w.get(CA, fresh, 'Title'), w.get(CA, fresh, 'Ready'), w.get(CA, fresh, 'Status')]);
  const kept = fx.snapshotCandidate(w, x.shot, { image: false });
  t.check('kept, no image: Ready "Ready to generate", Status "Not requested // contact ASK to generate this candidate"',
    w.get(CA, kept, 'Ready') === 'Ready to generate' && w.get(CA, kept, 'Status') === 'Not requested // contact ASK to generate this candidate', [w.get(CA, kept, 'Ready'), w.get(CA, kept, 'Status')]);
  w.set(CA, kept, { 'Generate when ready': true, 'Input check': 'Would request: dry run' });
  t.check('Generate when ready with a dry run: "Dry run // the image would have been requested"', w.get(CA, kept, 'Status') === 'Dry run // the image would have been requested');
  w.set(CA, kept, { 'Generate requested': true });
  t.check('Generate requested: "Image requested // contact ASK if it appears stuck"', w.get(CA, kept, 'Status') === 'Image requested // contact ASK if it appears stuck');
  w.set(CA, kept, { 'Generate requested': false, 'Generate when ready': false, 'Input check': null });
  const test = w.add(CA, { Shot: [x.shot], Test: true });
  t.check('a Test candidate without a number: "// test record N"', w.get(CA, test, 'Title') === `Editorial hero // test record ${w.get(CA, test, 'Record no.')}`, w.get(CA, test, 'Title'));

  // the standard changes
  w.set(SH, x.shot, { 'Shot direction': 'The vessel in a calm room, at dawn.' });
  t.check('the image candidate: Standard check reads changed; Ready stays "Ready to generate" and Status "Image ready" (the held labels need no image)',
    w.get(CA, made, 'Standard check') === 'The standard has changed since this image was made' && w.get(CA, made, 'Ready') === 'Ready to generate' && w.get(CA, made, 'Status') === 'Image ready', [w.get(CA, made, 'Ready'), w.get(CA, made, 'Status')]);
  t.check('the acceptances: Coverage "Earlier standard"; Decision "Accepted under an earlier standard"', w.get(AI, a1, 'Coverage') === 'Earlier standard' && w.get(SH, x.shot, 'Decision') === 'Accepted under an earlier standard');
  t.check('the kept imageless candidate: held on the standard; Status "Held // the shot changed."', w.get(CA, kept, 'Ready') === HELD.standard && w.get(CA, kept, 'Status') === 'Held // the shot changed.', [w.get(CA, kept, 'Ready'), w.get(CA, kept, 'Status')]);
  w.set(CA, kept, { 'Generate when ready': true });
  t.check('with Generate when ready, Status adds that a pending request continues', w.get(CA, kept, 'Status') === `Held // the shot changed.${HELD.continues}`, w.get(CA, kept, 'Status'));
  t.check('the new candidate, never kept, isn\'t held on the standard', w.get(CA, fresh, 'Ready') === 'Preparing…');

  // the shot unplanned: its products' confirmation cleared
  w.set(SH, x.shot, { 'Products confirmed': false });
  t.check('unplanned: Can generate 0; imageless candidates held "isn\'t planned"; the image candidate unaffected',
    w.get(SH, x.shot, 'Can generate') === 0 && w.get(CA, fresh, 'Ready') === HELD.notPlanned && w.get(CA, kept, 'Ready') === HELD.notPlanned && w.get(CA, made, 'Ready') === 'Ready to generate' && w.get(CA, made, 'Status') === 'Image ready');

  // a Test acceptance: Coverage blank, as live
  const tc = w.add(CA, { ...fx.snapshotCells(w, x.shot), Image: fx.CANDIDATE_IMAGE(x.shot), Test: true }), ta = fx.accept(w, tc);
  t.check('an acceptance of a Test candidate: Coverage empty (Candidate is test), Source current still compares', w.get(AI, ta, 'Candidate is test') === 1 && w.get(AI, ta, 'Coverage') === '' && w.get(AI, ta, 'Source current') === 1);
}

add('LIVE-new-branch', 'A product-page shot reads v3 §5.1\'s composition: the request standard, "Products, in image order:", the shot and its lineage; the prompt\'s opening, shot, request prompt, products paragraph and Prompt line, then the references', async t => {
  const b = await bathPlanned(new World()), { w } = b;
  await pressS2(w, b.req.id);
  const sh = w.get('Product-page slots', slotAt(w, b.L.vessel, 1), 'Shot')[0];
  const std = w.get(SH, sh, 'Current standard'), prompt = w.get(SH, sh, 'Current prompt');
  const reqStd = w.get('Briefs', b.req.id, 'Request standard');
  t.check('the standard: request standard, then the products, then the shot, then its lineage',
    std.startsWith(`${reqStd}\nProducts, in image order:\nBath vessel / natural glaze: Must stay true: `) && reqStd.includes('\nWorkflow: Product pages\nReferences:\n') && std.includes('\nShot: Bath Vessel · 1 Front, for Bath Vessel product page, image 1. ') && std.includes('\nShot guide: Ceramic vessel, version 1, Front'), std);
  t.check('the prompt: opening, shot (no product name in its placement), request prompt, products paragraph, the product\'s Prompt line with its size, the references',
    prompt.startsWith('Generate one single commercial photograph. Not a grid, collage, contact sheet or multi-image layout.\n\nShot: Bath Vessel · 1 Front, for product page, image 1. ')
    && prompt.includes(`\n\n${w.get('Briefs', b.req.id, 'Request prompt')}\n\nThe first attached images are the products, one each, in this order.`)
    && prompt.includes('\nBath Vessel. A bath vessel in a natural glaze. Keep its glaze, profile and rim. Material: . Finish: . Size: one size.\n\n')
    && prompt.endsWith(`\n\n${w.get('Briefs', b.req.id, 'Reference prompt')}`) && w.get('Briefs', b.req.id, 'Reference prompt').startsWith('The remaining attached images are references, in this order.'), prompt);
});

// Negative control: Ready's held labels without the "has never had an image" guard hold an image candidate.
add('CTRL-LIVE-ready', 'Negative control: with Ready\'s held labels applied to every candidate, LIVE-7.8\'s guard "Ready stays Ready to generate" for the image candidate fails', async t => {
  const unguarded = { [CA]: { Ready: Object.assign(r => {
    if (Number(r.get('Shot planned')) !== 1) return HELD.notPlanned;
    const sc = String(r.get('Standard check') || ''); if (sc !== '' && sc.slice(0, 4) !== 'Same') return HELD.standard;
    return FORMULAS[CA].Ready(r); // below the labels, as written
  }, { airtable: 'unguarded' }) } };
  const run = async opts => { const got = []; await live78({ check: (label, ok) => { got.push([label, !!ok]); return !!ok; } }, opts); return got; };
  const asWritten = await run({});
  t.check('as written, every LIVE-7.8 check holds', asWritten.length > 0 && asWritten.every(([, ok]) => ok), asWritten.filter(([, ok]) => !ok).map(([l]) => l));
  const mutated = await run({ formulas: unguarded });
  const failed = new Set(mutated.filter(([, ok]) => !ok).map(([l]) => l));
  t.check('mutated: the image candidate is held, and the guard fails', [...failed].some(l => l.startsWith('the image candidate: Standard check reads changed; Ready stays')), [...failed]);
});

// A new-workflow standard carries the time of each product image the shot attaches (README, Choices: Product facts).
add('STD-image', 'Replacing the product image a new-workflow shot attaches changes its standard: a Make shot\'s candidate reads changed; on a Share shot only the input product\'s image counts', t => stdImage(t));
async function stdImage(t, opts = {}) {
  const b = await bathPlanned(new World(opts)), { w } = b;
  await pressS2(w, b.req.id);
  const shotOfSlot = (p, n) => w.get('Product-page slots', slotAt(w, b.L[p], n), 'Shot')[0];
  const newImage = name => ({ Image: [{ url: `https://example.test/${name}-v2.jpg`, filename: `${name}-v2.jpg` }] });
  const make = shotOfSlot('vessel', 1), share = shotOfSlot('towel', 1);
  t.check('setup: a Make shot of one product and a Share shot of two sizes, its Lines in shot the towel\'s line',
    w.get(SH, make, 'Made as') === 'Make' && w.get(SH, share, 'Made as') === 'Share' && share === shotOfSlot('sheet', 1) && w.get(SH, share, 'Active slots filled') === 2
    && JSON.stringify(w.get(SH, share, 'Lines in shot')) === JSON.stringify([b.L.towel]));
  t.check('the standards name each attached image\'s time', w.get(SH, make, 'Current standard').includes(`rim. Material: . Finish: . Size: one size. Product image as of ${dtf(w.get('Products', b.P.vessel, 'Image updated'))} UTC.`)
    && w.get(SH, share, 'Current standard').includes(`Terry towel / white: Must stay true: `) && w.get(SH, share, 'Current standard').includes(`Product image as of ${dtf(w.get('Products', b.P.towel, 'Image updated'))} UTC.`), [w.get(SH, make, 'Current standard'), w.get(SH, share, 'Current standard')]);
  const cm = fx.snapshotCandidate(w, make), cs = fx.snapshotCandidate(w, share);
  t.check('kept: both candidates read "Same standard"', w.get(CA, cm, 'Standard check') === 'Same standard as when this image was made' && w.get(CA, cs, 'Standard check') === 'Same standard as when this image was made');
  w.advance(60000); w.set('Products', b.P.sheet, newImage('sheet'));
  t.check('the sheet\'s image replaced: the Share shot attaches the towel\'s, so its candidate still reads "Same standard"', w.get(CA, cs, 'Standard check') === 'Same standard as when this image was made', w.get(CA, cs, 'Standard check'));
  w.advance(60000); w.set('Products', b.P.vessel, newImage('vessel')); w.set('Products', b.P.towel, newImage('towel'));
  t.check('the vessel\'s image replaced: the Make shot\'s candidate reads "The standard has changed since this image was made"', w.get(CA, cm, 'Standard check') === 'The standard has changed since this image was made', w.get(CA, cm, 'Standard check'));
  t.check('the towel\'s image replaced: the Share shot\'s candidate reads changed', w.get(CA, cs, 'Standard check') === 'The standard has changed since this image was made', w.get(CA, cs, 'Standard check'));
}

// Negative control: product lines without the image clause leave a candidate made from the old image at "Same standard".
add('CTRL-STD-image', 'Negative control: with Product facts (lines) and Shared facts line lacking the image time, STD-image\'s "reads changed" checks fail', async t => {
  const S = v => (v == null ? '' : String(v));
  const without = { Products: {
    'Product facts (lines)': Object.assign(r => `${S(r.get('Product share key'))}: ${S(r.get('Facts without size'))}${r.get('Size') ? ` Size: ${S(r.get('Size'))}.` : ''}`, { airtable: 'no image time' }),
    'Shared facts line': Object.assign(r => `${S(r.get('Product share key'))}: ${S(r.get('Facts without size'))}`, { airtable: 'no image time' }) } };
  const run = async opts => { const got = []; await stdImage({ check: (label, ok) => { got.push([label, !!ok]); return !!ok; } }, opts); return got; };
  const asWritten = await run({});
  t.check('as written, every STD-image check holds', asWritten.length > 0 && asWritten.every(([, ok]) => ok), asWritten.filter(([, ok]) => !ok).map(([l]) => l));
  const failed = new Set((await run({ formulas: without })).filter(([, ok]) => !ok).map(([l]) => l));
  t.check('mutated: both "reads changed" checks fail', [...failed].some(l => l.startsWith('the vessel\'s image replaced')) && [...failed].some(l => l.startsWith('the towel\'s image replaced')), [...failed]);
});
