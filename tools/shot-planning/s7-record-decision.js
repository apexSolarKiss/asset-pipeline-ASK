// Record decision (S7) // the Record decision button on a product or on a product-page slot.
// Deciding and recording are separate: S7 records, as the decision, what the record shows at the
// press, with its decision record (Decided by, Decision source, Entered by). On a product it
// records the assignment: Decided content, Decision recorded at, Recorded guide and Recorded guide
// ID, in one update. On a slot it records the planning decision: Decided content, Decision recorded
// at, Recorded fulfillment, Recorded not needed and Recorded summary, in one update. What operates
// is what was recorded; the editable fields are the draft of the next decision (§6).
// It checks the values it is about to record, never the last record: on a product, one shot guide
// link and an Assignment basis; on a slot, a reason for a departure from the kept Fill rule and for
// Not needed on an Always slot, and Share only where the Fill rule is the share rule. A refusal is
// written to the record's Record result, and nothing else is written. It never decides, never
// adopts, never makes or changes a slot, a shot or an application.
// Installed twice, once per table: input `kind` is "product" or "slot". Tables and fields come
// from this action's inputs, by ID or name; see README.md.
const cfg = input.config();
const recordId = cfg.recordId;
const kind = cfg.kind;
if (kind !== 'product' && kind !== 'slot') throw new Error('S7: input kind must be "product" or "slot"');

// Resolve every binding, and check its field type, before reading or writing anything.
const T = base.getTable(cfg.table);
const bind = (key, ...types) => {
  if (!cfg[key]) throw new Error(`S7: input ${key} is missing`);
  const f = T.getField(cfg[key]);
  if (!types.includes(f.type)) throw new Error(`S7: ${key} must be of type ${types.join(' or ')}, not ${f.type}`);
  return f.id;
};
const F = {
  decidedBy: bind('decidedByField', 'singleLineText'),
  source: bind('decisionSourceField', 'singleLineText'),
  enteredBy: bind('enteredByField', 'singleLineText'),
  content: bind('decisionContentField', 'formula'),
  decided: bind('decidedContentField', 'multilineText'),
  recordedAt: bind('decisionRecordedAtField', 'dateTime'),
  result: bind('resultField', 'multilineText', 'singleLineText'),
};
if (kind === 'product') Object.assign(F, {
  guide: bind('shotGuideField', 'multipleRecordLinks'),
  basis: bind('assignmentBasisField', 'multilineText', 'singleLineText'),
  recordedGuide: bind('recordedGuideField', 'multipleRecordLinks'),
  recordedGuideId: bind('recordedGuideIdField', 'singleLineText'),
});
else Object.assign(F, {
  fulfillment: bind('fulfillmentField', 'singleSelect'),
  fulfillmentReason: bind('fulfillmentReasonField', 'multilineText', 'singleLineText'),
  notNeeded: bind('notNeededField', 'checkbox'),
  notNeededReason: bind('notNeededReasonField', 'multilineText', 'singleLineText'),
  recordedFulfillment: bind('recordedFulfillmentField', 'singleLineText'),
  recordedNotNeeded: bind('recordedNotNeededField', 'checkbox'),
  recordedSummary: bind('recordedSummaryField', 'singleLineText', 'multilineText'),
  keptFillRule: bind('keptFillRuleField', 'singleLineText'),
  keptRequired: bind('keptRequiredField', 'singleLineText'),
  planKept: bind('planKeptField', 'checkbox'),
  keptPlanCheck: bind('keptPlanCheckField', 'formula'),
});

// The guide's fill rules (v6 §4, §6) and the fulfillment each gives.
const SHARE_RULE = 'Shared across sizes of one style and color';
const FULFILLMENT_OF = { 'Made for each product': 'Make', [SHARE_RULE]: 'Share', 'An accepted image that shows the product': 'An accepted image' };
const HAND = 'Edited by hand';
const text = v => (v == null ? '' : String(v)).trim();

async function main() {
  const me = await T.selectRecordAsync(recordId, { fields: Object.values(F) });
  if (!me) { console.log('skip: record not found'); return; }
  // A refusal is a result: its message goes to Record result, and nothing else is written.
  const refuse = async why => { await T.updateRecordAsync(recordId, { [F.result]: `Not recorded: ${why}` }); console.log(`refused: ${why}`); };

  const by = text(me.getCellValue(F.decidedBy)), source = text(me.getCellValue(F.source)), entered = text(me.getCellValue(F.enteredBy));
  if (!by || !source || !entered) return refuse('enter Decided by, Decision source and Entered by first.');
  const at = new Date().toISOString();
  const content = me.getCellValue(F.content) || '';

  if (kind === 'product') {
    const links = me.getCellValue(F.guide) || [];
    if (links.length !== 1) return refuse(links.length ? 'link exactly one shot guide.' : 'link the product to its shot guide first.');
    if (!text(me.getCellValue(F.basis))) return refuse('enter the Assignment basis: the criteria the assignment rests on.');
    const guide = links[0];
    await T.updateRecordAsync(recordId, {
      [F.decided]: content,
      [F.recordedAt]: at,
      [F.recordedGuide]: [{ id: guide.id }],
      [F.recordedGuideId]: guide.id,
      [F.result]: `Recorded: assigned to ${guide.name} · decided by ${by} · entered by ${entered}.`,
    });
    console.log(`recorded assignment to ${guide.id}`);
    return;
  }

  // A slot: its kept plan is what a planning decision is checked against.
  if (text(me.getCellValue(F.keptPlanCheck)) === HAND) return refuse('this slot\'s kept plan was edited by hand, so its obligation can\'t be read from it: plan it in a new version of the request.');
  const fillRule = text(me.getCellValue(F.keptFillRule));
  if (!me.getCellValue(F.planKept) || !FULFILLMENT_OF[fillRule]) return refuse('this slot has no kept plan.');
  const sel = me.getCellValue(F.fulfillment);
  const fulfillment = sel ? sel.name : '';
  if (!fulfillment) return refuse('set Fulfillment first.');
  const fulfillmentReason = text(me.getCellValue(F.fulfillmentReason));
  const notNeeded = !!me.getCellValue(F.notNeeded);
  const notNeededReason = text(me.getCellValue(F.notNeededReason));
  const required = text(me.getCellValue(F.keptRequired));
  if (fulfillment === 'Share' && fillRule !== SHARE_RULE) return refuse(`Share is allowed only where the slot's Fill rule is "${SHARE_RULE}"; this slot's is "${fillRule}".`);
  if (fulfillment !== FULFILLMENT_OF[fillRule] && !fulfillmentReason) return refuse(`Fulfillment "${fulfillment}" departs from the Fill rule's "${FULFILLMENT_OF[fillRule]}": enter a Fulfillment reason.`);
  if (notNeeded && required === 'Always' && !notNeededReason) return refuse('this slot is required Always: marking it Not needed is an exception, and needs a Not needed reason.');

  const reason = notNeeded ? notNeededReason : fulfillment !== FULFILLMENT_OF[fillRule] ? fulfillmentReason : '';
  const summary = `${notNeeded ? 'Not needed' : fulfillment} · decided by ${by}${reason ? ` · ${reason}` : ''}`;
  await T.updateRecordAsync(recordId, {
    [F.decided]: content,
    [F.recordedAt]: at,
    [F.recordedFulfillment]: fulfillment,
    [F.recordedNotNeeded]: notNeeded,
    [F.recordedSummary]: summary,
    [F.result]: `Recorded: ${summary} · entered by ${entered}.`,
  });
  console.log(`recorded: ${summary}`);
}

await main();
