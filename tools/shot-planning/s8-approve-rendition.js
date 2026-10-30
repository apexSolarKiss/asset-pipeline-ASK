// Approve rendition (S8) // the Approve rendition button on an application.
// A rendition is a delivery file made from an application's accepted image for that application's
// slot: a crop, for example. It is its own file, on the application; the accepted image and the
// candidate's image are never changed. Rendition, Rendition operation and the decision record
// (Rendition decided by, Rendition decision source, Rendition entered by) are the draft: attaching or
// editing them approves nothing. S8 approves the one file the application shows at its read, with
// that operation and record, by copying that file into Approved rendition, named with its approval
// ID, in one update of Approved rendition, Rendition approval ID, Rendition approved, Rendition
// approved at and Rendition result. The ID names the application's slot and accepted image, and the
// record begins with it. Only the copy is delivered (Settled rendition), so a file attached later,
// even a second after the press or between its read and its write, is never delivered under this
// approval: Rendition state reads that the change waits, and S8 approves it only when pressed again.
// Rendition approved at is the whole second at or before S8's read, so a change to the draft in that
// second or after it shows, whether Airtable keeps its times to the millisecond or to the second.
// It refuses, writing only Rendition result: a missing decision record; an application that needs no
// rendition (neither its slot's recorded decision nor its accepted image's acceptance requires one);
// an application not in use (Current, not Withdrawn); not exactly one file, a file that isn't an
// image or whose name has a comma; no Rendition operation; no single slot or accepted image. It never
// changes Current, a slot, an accepted image or another application, and it never makes or edits the
// rendition itself.
// Tables and fields come from this action's inputs, by ID or name; see README.md.
const cfg = input.config();
const recordId = cfg.recordId;

// Resolve every binding, and check its field type, before reading or writing anything.
const T = base.getTable(cfg.table);
const bind = (key, ...types) => {
  if (!cfg[key]) throw new Error(`S8: input ${key} is missing`);
  const f = T.getField(cfg[key]);
  if (!types.includes(f.type)) throw new Error(`S8: ${key} must be of type ${types.join(' or ')}, not ${f.type}`);
  return f.id;
};
const LOOKUP = ['multipleLookupValues', 'rollup', 'formula'];
const F = {
  rendition: bind('renditionField', 'multipleAttachments'),
  operation: bind('operationField', 'multilineText', 'singleLineText'),
  decidedBy: bind('decidedByField', 'singleLineText'),
  source: bind('decisionSourceField', 'singleLineText'),
  enteredBy: bind('enteredByField', 'singleLineText'),
  approvedFile: bind('approvedFileField', 'multipleAttachments'),
  approvalId: bind('approvalIdField', 'singleLineText'),
  approved: bind('approvedField', 'multilineText'),
  approvedAt: bind('approvedAtField', 'dateTime'),
  result: bind('resultField', 'multilineText', 'singleLineText'),
  needed: bind('neededField', 'formula'),
  slotId: bind('slotIdField', ...LOOKUP),
  slotName: bind('slotNameField', ...LOOKUP),
  sourceId: bind('sourceIdField', ...LOOKUP),
  sourceTitle: bind('sourceTitleField', ...LOOKUP),
  sourceCondition: bind('sourceConditionField', ...LOOKUP),
  current: bind('currentField', 'checkbox'),
  withdrawn: bind('withdrawnField', 'checkbox'),
};

const text = v => (v == null ? '' : String(v)).trim();
// A lookup's values: plain values, or { linkedRecordId, value } items; empty values dropped.
const values = v => (v == null ? [] : Array.isArray(v) ? v : [v]).map(x => (x && typeof x === 'object' && 'value' in x ? x.value : x)).filter(x => x != null && x !== '');
const joined = (r, f) => values(r.getCellValue(f)).map(String).join(', ');

async function main() {
  // The approval's time is taken before the read, to the whole second: a change to the draft in that
  // second or after it reads as waiting. A change just before the press, in the same second, reads as
  // waiting too, and S8 is pressed again.
  const time = new Date(); time.setUTCMilliseconds(0);
  const at = time.toISOString();
  const me = await T.selectRecordAsync(recordId, { fields: Object.values(F) });
  if (!me) { console.log('skip: record not found'); return; }
  // A refusal is a result: its message goes to Rendition result, and nothing else is written.
  const refuse = async why => { await T.updateRecordAsync(recordId, { [F.result]: `Not approved: ${why}` }); console.log(`refused: ${why}`); };

  const by = text(me.getCellValue(F.decidedBy)), source = text(me.getCellValue(F.source)), entered = text(me.getCellValue(F.enteredBy));
  if (!by || !source || !entered) return refuse('enter Rendition decided by, Rendition decision source and Rendition entered by first.');
  if (Number(me.getCellValue(F.needed)) !== 1) return refuse("this application needs no rendition: neither its slot's recorded decision nor its accepted image's acceptance requires one.");
  if (!me.getCellValue(F.current) || me.getCellValue(F.withdrawn)) return refuse('only an application in use on its slot (Current, not Withdrawn) takes a rendition.');
  const files = me.getCellValue(F.rendition) || [];
  if (files.length !== 1) return refuse(`attach exactly one rendition file; there ${files.length === 1 ? 'is' : 'are'} ${files.length}.`);
  const file = files[0];
  if (!/^image\//.test(text(file.type))) return refuse(`the rendition must be an image; its type is "${text(file.type) || 'unknown'}".`);
  // A formula reads the approved copy as its file name; a comma there would read as a second file.
  if (text(file.filename).includes(',')) return refuse("the rendition's file name has a comma; attach it under a name without one.");
  const operation = text(me.getCellValue(F.operation));
  if (!operation) return refuse('enter the Rendition operation: how the rendition was made from the accepted image.');
  const slotIds = values(me.getCellValue(F.slotId)).map(String), sourceIds = values(me.getCellValue(F.sourceId)).map(String);
  if (slotIds.length !== 1 || sourceIds.length !== 1) return refuse('the application must link exactly one slot and one accepted image.');

  const id = `R8-${slotIds[0]}-${sourceIds[0]}-${at.replace(/[-:.]/g, '')}`;
  const size = typeof file.width === 'number' && typeof file.height === 'number' ? ` · ${file.width} × ${file.height}` : '';
  const slotName = joined(me, F.slotName), condition = joined(me, F.sourceCondition);
  const record = [
    id,
    `Rendition: ${text(file.filename)} · file ${text(file.id)} · ${typeof file.size === 'number' ? file.size : '?'} bytes · ${text(file.type)}${size}`,
    `Operation: ${operation}`,
    `For: ${slotName} · slot ${slotIds[0]} · application ${recordId}`,
    `From: accepted image ${sourceIds[0]} · ${joined(me, F.sourceTitle)}`,
    ...(condition ? [`Accepted on condition: ${condition}`] : []),
    `Decided by: ${by}`,
    `Decision source: ${source}`,
    `Entered by: ${entered}`,
    `Approved at: ${at}`,
  ].join('\n');
  await T.updateRecordAsync(recordId, {
    [F.approvedFile]: [{ url: file.url, filename: `${id}__${text(file.filename)}` }],
    [F.approvalId]: id,
    [F.approved]: record,
    [F.approvedAt]: at,
    [F.result]: `Approved: ${text(file.filename)} for ${slotName} · decided by ${by} · entered by ${entered}.`,
  });

  // Read back: the copy and the ID as written. A later press's approval, or a hand edit, is Rendition state's to show.
  const back = await T.selectRecordAsync(recordId, { fields: [F.approvedFile, F.approvalId] });
  const copy = (back && back.getCellValue(F.approvedFile)) || [];
  const ok = back && text(back.getCellValue(F.approvalId)) === id && copy.length === 1 && text(copy[0].filename).startsWith(`${id}__`);
  console.log(ok ? `approved ${text(file.id)} for ${recordId} as ${id}` : `approved ${text(file.id)} for ${recordId} as ${id}; the read-back differs: see Rendition state`);
}

await main();
