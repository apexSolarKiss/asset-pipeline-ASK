// Adopt guide (S6) // the Adopt this definition button on a shot guide.
// Adoption is its own act: S6 copies the guide's Definition, as it reads it at the press, into
// Adopted definition as a new version, with the decision record entered on the guide (Decided by,
// Decision source, Entered by), and appends one line to the Adoption log. It refuses without a
// complete guide, without a decision record, without a decision of its own (a Decision source
// different from the last adoption's), or when the Definition is already adopted, unless the
// adopted text reads Edited by hand: then it adopts the current Definition again, as a new version.
// It never decides: what it records is what the guide shows at the press. It never changes a
// guide slot, a product, a product-page slot or a kept plan. Level 0: it reads once and writes
// one update; a definition changed while it runs reads "Changed since adoption".
// Tables and fields come from this action's inputs, by ID or name; see README.md.
const cfg = input.config();
const recordId = cfg.recordId;

// Resolve every binding, and check its field type, before reading or writing anything.
const G = base.getTable(cfg.guidesTable);
const bind = (table, key, ...types) => {
  if (!cfg[key]) throw new Error(`S6: input ${key} is missing`);
  const f = table.getField(cfg[key]);
  if (!types.includes(f.type)) throw new Error(`S6: ${key} must be of type ${types.join(' or ')}, not ${f.type}`);
  return f.id;
};
const F = {
  definition: bind(G, 'definitionField', 'formula'),
  adopted: bind(G, 'adoptedDefinitionField', 'multilineText'),
  version: bind(G, 'adoptedVersionField', 'number'),
  adoptedAt: bind(G, 'adoptedAtField', 'dateTime'),
  log: bind(G, 'adoptionLogField', 'multilineText'),
  decidedBy: bind(G, 'decidedByField', 'singleLineText'),
  source: bind(G, 'decisionSourceField', 'singleLineText'),
  enteredBy: bind(G, 'enteredByField', 'singleLineText'),
  content: bind(G, 'decisionContentField', 'formula'),
  decided: bind(G, 'decidedContentField', 'multilineText'),
  check: bind(G, 'adoptedDefinitionCheckField', 'formula'),
  active: bind(G, 'activeSlotsField', 'rollup', 'count', 'formula'),
  incomplete: bind(G, 'slotsIncompleteField', 'rollup', 'formula'),
  incompleteNames: bind(G, 'incompleteNamesField', 'rollup', 'formula'),
  result: bind(G, 'resultField', 'multilineText', 'singleLineText'),
};
// The account that pressed the button, from the button trigger, shown as "Account" (§9.4). It is
// not evidence of who decided or who entered the record.
const account = cfg.account ? String(cfg.account) : '';
const HAND = 'Edited by hand';

const text = v => (v == null ? '' : String(v)).trim();
const num = v => (typeof v === 'number' ? v : 0);
// The last adoption's Decision source, from its Decided content (the decision lines come last).
const sourceOf = decided => { const all = [...String(decided || '').matchAll(/(?:^|\n)Decision source: ([^\n]*)/g)]; return all.length ? all[all.length - 1][1].trim() : ''; };

async function main() {
  const me = await G.selectRecordAsync(recordId, { fields: Object.values(F) });
  if (!me) { console.log('skip: guide not found'); return; }
  // A refusal is a result: its message goes to the guide's Adoption result, and nothing else is written.
  const refuse = async message => { await G.updateRecordAsync(recordId, { [F.result]: message }); console.log(`refused: ${message}`); };

  const by = text(me.getCellValue(F.decidedBy)), source = text(me.getCellValue(F.source)), entered = text(me.getCellValue(F.enteredBy));
  const definition = me.getCellValue(F.definition) || '';
  const adopted = me.getCellValue(F.adopted) || '';
  const version = num(me.getCellValue(F.version));
  const handEdited = text(me.getCellValue(F.check)) === HAND;

  if (num(me.getCellValue(F.active)) < 1) return refuse('Not adopted: the guide has no active slot.');
  if (num(me.getCellValue(F.incomplete)) > 0) return refuse(`Not adopted: every active slot needs a placement label and a view (${text(me.getCellValue(F.incompleteNames))}).`);
  if (!by || !source || !entered) return refuse('Not adopted: enter Decided by, Decision source and Entered by first.');
  const lastSource = sourceOf(me.getCellValue(F.decided));
  if ((adopted || version) && lastSource && lastSource === source) return refuse(`Not adopted: a new adoption needs its own decision; Decision source names the last adoption's ("${lastSource}").`);
  if (definition === adopted && !handEdited) return refuse(`Already adopted: version ${version}.`);

  const next = version + 1, at = new Date().toISOString();
  const line = `Version ${next} · ${at} · decided by ${by} · source: ${source} · entered by ${entered}${account ? ` · account ${account}` : ''}${handEdited ? ' · replaces an adopted definition edited by hand' : ''}`;
  const log = text(me.getCellValue(F.log));
  await G.updateRecordAsync(recordId, {
    [F.adopted]: definition,
    [F.version]: next,
    [F.adoptedAt]: at,
    [F.decided]: me.getCellValue(F.content) || '',
    [F.log]: log ? `${log}\n${line}` : line,
    [F.result]: `Adopted, version ${next}.${handEdited ? ' The adopted text it replaces had been edited by hand.' : ''}`,
  });
  console.log(`adopted version ${next}`);
}

await main();
