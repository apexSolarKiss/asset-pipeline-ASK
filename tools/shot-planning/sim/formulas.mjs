// v6's formulas as JS, computed on read by sim/world.mjs. One function per formula field, keyed
// by table and field name as in sim/schema.mjs; each carries, as .airtable, the Airtable formula
// text it mirrors, which is the text to install (README). Where v6 states a predicate without its
// exact text, the text here is the one this source proposes, and the JS follows it.
//
// A formula function receives r: r.id is the record's ID, and r.get(name) the value of one of the
// record's fields as a formula sees it:
//   text, long text, single select   string, or null when empty
//   number, count, rollup            number, or null when empty (rollups as their aggregation)
//   checkbox                         true, or null
//   link                             array of record IDs, or null
//   lookup                           array of the linked records' values, flattened, or null
//   date, last modified time         ISO string, or null
//   formula                          its value: a string, or 0/1 for a truth value
// The helpers below give these Airtable's coercions: S (text, as & does, arrays joined ", "),
// AJ (ARRAYJOIN), N (a number), B (truthiness), MS (a time, in ms), FIND (1-based, 0 when absent).

export const S = v => (v == null ? '' : Array.isArray(v) ? v.map(S).join(', ') : v === true ? '1' : v === false ? '0' : String(v));
export const AJ = (v, sep = '') => (v == null ? '' : Array.isArray(v) ? v.map(S).join(sep) : S(v));
export const N = v => (v == null || v === '' ? 0 : Array.isArray(v) ? v.reduce((a, x) => a + N(x), 0) : v === true ? 1 : Number(v) || 0);
export const B = v => !(v == null || v === '' || v === 0 || v === false || (Array.isArray(v) && v.length === 0));
export const MS = v => { const x = Array.isArray(v) ? v[0] : v; if (x == null || x === '') return null; const t = Date.parse(x); return Number.isNaN(t) ? null : t; };
export const FIND = (needle, hay) => { const n = S(needle), h = S(hay); if (n === '') return 0; return h.indexOf(n) + 1; };
const IF = (c, a, b) => (B(c) ? a : b);
const bit = c => (B(c) ? 1 : 0);
const present = v => B(v);

const F = (airtable, fn) => { fn.airtable = airtable.trim(); return fn; };

// The limited hand-edit detector (§6): a watched value changed more than a minute after the
// script's own time, or a watched value no script has written (no written-at time).
export const HAND = 'Edited by hand';
// A blank last-modified time (no watched value ever written) is never flagged against a script time.
const handText = (watched, changedAt, writtenAt) => `IF(IF({${writtenAt}} = BLANK(), OR(${watched.map(w => `{${w}}`).join(', ')}), AND({${changedAt}} != BLANK(), DATETIME_DIFF({${changedAt}}, {${writtenAt}}, 'seconds') > 60)), "${HAND}", "")`;
const handFn = (watched, changedAt, writtenAt) => r => {
  const at = MS(r.get(writtenAt));
  if (at == null) return watched.some(w => present(r.get(w))) ? HAND : '';
  const ch = MS(r.get(changedAt));
  return ch != null && ch - at > 60_000 ? HAND : '';
};
const detector = (watched, changedAt, writtenAt) => F(handText(watched, changedAt, writtenAt), handFn(watched, changedAt, writtenAt));

const decisionFields = r => `\nDecided by: ${S(r.get('Decided by'))}\nDecision source: ${S(r.get('Decision source'))}\nEntered by: ${S(r.get('Entered by'))}`;
const decisionFieldsText = '"\\nDecided by: " & {Decided by} & "\\nDecision source: " & {Decision source} & "\\nEntered by: " & {Entered by}';

// Texts the formulas show that scripts and tests also name.
export const TEXT = {
  sharedSame: 'Same facts for every product',
  sharedDiffer: 'The products this image would be shared by differ: ',
  guideSame: 'Same',
  guideChanged: 'The shot guide changed since this was planned',
  changePending: 'A change waits for its decision record',
  heldPlan: 'Edited by hand: plan it in a new version of the request',
  heldSlot: "Edited by hand: check this slot's decision, then press Record decision to record it again",
  heldProduct: "Edited by hand: check the product's assignment, then press Record decision on the product",
  heldGuide: 'Edited by hand: adopt the guide again',
  stepShot: 'press Replan on its shot',
  stepSlot: 'press Replan on this slot',
  stepVersion: 'plan it in a new version of the request',
  coveredRefusal: 'An accepted image covers this slot. Set Fulfillment back and record it. To use another image here, record a use decision with Replace; to make a new one, plan it in a new version of the request.',
  // GPT-A: a covered slot whose recorded fulfillment is "An accepted image" takes another image by S5 with Replace.
  coveredPickup: 'An accepted image of its shot covers this slot, and its recorded fulfillment is "An accepted image": apply a use decision with Replace to use another image here.',
  acceptedWithout: 'Its shot was accepted without it: press Replan on this slot to plan it apart, or make and accept a new image of the shot for all its slots',
  moreSizes: " This image is used for more than one size: nothing in it may show the product's size.",
};
const SHARE_RULE = 'Shared across sizes of one style and color';
const Q = x => `"${x.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`; // an Airtable string literal
const STATUS = {
  waivedPending: ', and a change waits for its decision record',
  pair: "Another record has this slot's key: see the slot pair check",
  pendingTail: ': press Record decision to record it, or undo it',
  detach: 'Fulfillment changed after its shot was made: press Replan on this slot to detach it, or set it back and record it',
  replan: 'The shot guide changed: replan',
  currentByHand: "Edited by hand: an application's Current was changed by hand; undo it, or resolve the slot with a use decision with Replace",
  notShared: "Not shared: the products' facts differ (see the Shot planning note)",
  waiting: 'Waiting for Make shots',
  needsImage: 'Needs an image: a use decision for an accepted image that shows this product',
};
const firstLine = (text, prefix) => { const m = new RegExp(`${prefix}[^\\n]*`).exec(S(text)); return m ? m[0] : ''; };
const FILL_TO_FULFILLMENT = { 'Made for each product': 'Make', [SHARE_RULE]: 'Share', 'An accepted image that shows the product': 'An accepted image' };

const lineOf = (text, label) => { const m = new RegExp(`(?:^|\\n)${label}: ([^\\n]*)`).exec(S(text)); return m ? m[1] : ''; };

export const FORMULAS = {
  'Shot guides': {
    'Guide ID': F('RECORD_ID()', r => r.id),
    'Definition': F('{Guide ID} & " · " & {Destination} & "\\n" & {Slot definitions}',
      r => `${S(r.get('Guide ID'))} · ${S(r.get('Destination'))}\n${S(r.get('Slot definitions'))}`),
    'Decision content': F(`"Definition:\\n" & {Definition} & ${decisionFieldsText}`,
      r => `Definition:\n${S(r.get('Definition'))}${decisionFields(r)}`),
    'Adopted definition check': detector(['Adopted definition', 'Adopted version', 'Decided content'], 'Adopted definition changed at', 'Adopted at'),
    'Complete': F('IF(AND({Adopted definition} != "", {Adopted definition check} = "", {Definition} = {Adopted definition}, {Active slots} >= 1, {Slots incomplete} = 0), 1, 0)',
      r => bit(present(r.get('Adopted definition')) && !present(r.get('Adopted definition check')) && S(r.get('Definition')) === S(r.get('Adopted definition')) && N(r.get('Active slots')) >= 1 && N(r.get('Slots incomplete')) === 0)),
    'Status': F(`IF(AND({Adopted definition} = "", {Adopted version} = BLANK()), "Proposed",
IF({Adopted definition check}, "Edited by hand: adopt the guide again",
IF({Active slots} < 1, "Incomplete: no active slot",
IF({Slots incomplete} > 0, "Incomplete: " & {Incomplete slot names} & " needs a placement label and a view",
IF({Complete}, "Adopted, version " & {Adopted version}, "Changed since adoption: adopt again")))))`,
    r => {
      if (!present(r.get('Adopted definition')) && r.get('Adopted version') == null) return 'Proposed';
      if (present(r.get('Adopted definition check'))) return 'Edited by hand: adopt the guide again';
      if (N(r.get('Active slots')) < 1) return 'Incomplete: no active slot';
      if (N(r.get('Slots incomplete')) > 0) return `Incomplete: ${S(r.get('Incomplete slot names'))} needs a placement label and a view`;
      return B(r.get('Complete')) ? `Adopted, version ${S(r.get('Adopted version'))}` : 'Changed since adoption: adopt again';
    }),
    'Guide check': F('{Status}', r => r.get('Status')),
  },

  'Guide slots': {
    'Guide ID': F('ARRAYJOIN({Guide ID (from Guide)})', r => AJ(r.get('Guide ID (from Guide)'))),
    'Guide-slot ID': F('RECORD_ID()', r => r.id),
    'Definition line': F(`"⟦" & {Guide ID} & " | " & {Guide-slot ID} & " | " & {Name} & " | " & {Position} & " | " & {Placement label} & " | " & {Required} & " | " & {Fill rule} & " | " & {Includes} & " | " & {Choose count} & " | " & IF({Retired}, "retired", "active") & " | " & {View} & "⟧"`,
      r => `⟦${[r.get('Guide ID'), r.get('Guide-slot ID'), r.get('Name'), r.get('Position'), r.get('Placement label'), r.get('Required'), r.get('Fill rule'), r.get('Includes'), r.get('Choose count'), B(r.get('Retired')) ? 'retired' : 'active', r.get('View')].map(S).join(' | ')}⟧`),
    'Is active': F('IF({Retired}, 0, 1)', r => bit(!B(r.get('Retired')))),
    'Is incomplete': F('IF(AND(NOT({Retired}), OR({Placement label} = "", {View} = "")), 1, 0)',
      r => bit(!B(r.get('Retired')) && (!present(r.get('Placement label')) || !present(r.get('View'))))),
    'Incomplete name': F('IF({Is incomplete}, {Name}, "")', r => IF(r.get('Is incomplete'), S(r.get('Name')), '')),
  },

  'Products': {
    'Product ID': F('RECORD_ID()', r => r.id),
    // Stand-ins for the existing Product facts and Prompt line formulas, which this unit doesn't edit.
    'Product facts': F('{Must stay true}', r => S(r.get('Must stay true'))),
    'Prompt line': F('{Name} & ": " & {Must stay true}', r => `${S(r.get('Name'))}: ${S(r.get('Must stay true'))}`),
    'Product share key': F('{Style} & " / " & {Color}', r => `${S(r.get('Style'))} / ${S(r.get('Color'))}`),
    'Facts without size': F('{Must stay true}', r => S(r.get('Must stay true'))),
    'Share signature': F('{Product share key} & " | " & {Facts without size}', r => `${S(r.get('Product share key'))} | ${S(r.get('Facts without size'))}`),
    'Product facts (lines)': F('{Product share key} & ": " & {Facts without size} & IF({Size}, " Size: " & {Size} & ".", "")',
      r => `${S(r.get('Product share key'))}: ${S(r.get('Facts without size'))}${IF(r.get('Size'), ` Size: ${S(r.get('Size'))}.`, '')}`),
    'Shared facts line': F('{Product share key} & ": " & {Facts without size}', r => `${S(r.get('Product share key'))}: ${S(r.get('Facts without size'))}`),
    'Prompt line (lines)': F('{Name} & " (" & {Style} & ", " & {Color} & IF({Size}, ", " & {Size}, "") & ")"',
      r => `${S(r.get('Name'))} (${S(r.get('Style'))}, ${S(r.get('Color'))}${IF(r.get('Size'), `, ${S(r.get('Size'))}`, '')})`),
    'Shared prompt line': F('{Style} & ", " & {Color}', r => `${S(r.get('Style'))}, ${S(r.get('Color'))}`),
    'Has image': F('IF(COUNTA({Image}) = 1, 1, 0)', r => bit((r.get('Image') || []).length === 1)),
    'Decision content': F(`"Shot guide: " & ARRAYJOIN({Shot guide ID}, ", ") & "\\nAssignment basis: " & {Assignment basis} & ${decisionFieldsText}`,
      r => `Shot guide: ${AJ(r.get('Shot guide ID'), ', ')}\nAssignment basis: ${S(r.get('Assignment basis'))}${decisionFields(r)}`),
    'Record check': detector(['Decided content', 'Recorded guide', 'Recorded guide ID'], 'Record changed at', 'Decision recorded at'),
    'Record intact': F('IF({Record check} = "", 1, 0)', r => bit(!present(r.get('Record check')))),
    'Assignment check': F(`IF({Decided content} = "", "Assignment not recorded", IF({Decision content} = {Decided content}, "Recorded", "Recorded; a change waits for its decision record"))`,
      r => (!present(r.get('Decided content')) ? 'Assignment not recorded' : S(r.get('Decision content')) === S(r.get('Decided content')) ? 'Recorded' : 'Recorded; a change waits for its decision record')),
    'Assigned guide ID': F('{Recorded guide ID}', r => S(r.get('Recorded guide ID'))),
  },

  'References': {
    'Has image': F('IF(COUNTA({Image}) = 1, 1, 0)', r => bit((r.get('Image') || []).length === 1)),
  },

  'Briefs': {
    'Request ID': F('RECORD_ID()', r => r.id),
    'References complete': F('IF(AND(COUNTA({References}) > 0, MIN({Reference has image}) = 1), 1, 0)',
      r => { const h = r.get('Reference has image') || []; return bit(h.length > 0 && h.every(x => N(x) === 1)); }),
    // Stand-ins for the existing brief formulas, which this unit doesn't edit.
    'Brief standard': F('"Request: " & {Name} & ". " & {Direction}', r => `Request: ${S(r.get('Name'))}. ${S(r.get('Direction'))}`),
    'Brief prompt': F('{Direction}', r => S(r.get('Direction'))),
    'Request standard': F('"Request: " & {Name} & " (" & {Workflow} & "). " & {Direction} & IF({Message to carry}, " Message to carry: " & {Message to carry}, "")',
      r => `Request: ${S(r.get('Name'))} (${S(r.get('Workflow'))}). ${S(r.get('Direction'))}${IF(r.get('Message to carry'), ` Message to carry: ${S(r.get('Message to carry'))}`, '')}`),
    'Request prompt': F('{Direction} & IF({Message to carry}, " Message: " & {Message to carry}, "")',
      r => `${S(r.get('Direction'))}${IF(r.get('Message to carry'), ` Message: ${S(r.get('Message to carry'))}`, '')}`),
    'Reference prompt': F('"Use the attached reference images for light, surface and atmosphere."', () => 'Use the attached reference images for light, surface and atmosphere.'),
  },

  'Product lines': {
    'Name': F('ARRAYJOIN({Request name}) & " · " & ARRAYJOIN({Product name})', r => `${AJ(r.get('Request name'))} · ${AJ(r.get('Product name'))}`),
    'Line ID': F('RECORD_ID()', r => r.id),
    'Product basis line': F('ARRAYJOIN({Product ID}) & " | " & ARRAYJOIN({Product share key}) & " | " & ARRAYJOIN({Facts without size}) & " | " & ARRAYJOIN({Size})',
      r => [r.get('Product ID'), r.get('Product share key'), r.get('Facts without size'), r.get('Size')].map(v => AJ(v)).join(' | ')),
  },

  'Product-page slots': {
    'Slot ID': F('RECORD_ID()', r => r.id),
    // v6 (R1): the key carries the kept guide, so a moved guide slot reassigned to its new guide gets its own slot.
    'Slot key': F('ARRAYJOIN({Line ID}) & "/" & {Kept product ID} & "/" & {Kept guide ID} & "/" & ARRAYJOIN({Guide-slot ID})',
      r => `${AJ(r.get('Line ID'))}/${S(r.get('Kept product ID'))}/${S(r.get('Kept guide ID'))}/${AJ(r.get('Guide-slot ID'))}`),
    'Live key': F('IF({Validly withdrawn}, "", {Slot key})', r => IF(r.get('Validly withdrawn'), '', S(r.get('Slot key')))),
    'Key count': F('(LEN(ARRAYJOIN({Line live keys})) - LEN(SUBSTITUTE(ARRAYJOIN({Line live keys}), {Slot key}, ""))) / LEN({Slot key})',
      r => { const keys = AJ(r.get('Line live keys')), k = S(r.get('Slot key')); return k ? keys.split(k).length - 1 : 0; }),
    'Record check': detector(['Decided content', 'Recorded fulfillment', 'Recorded not needed', 'Recorded summary'], 'Record changed at', 'Decision recorded at'),
    'Kept plan check': detector(['Kept definition line', 'Kept guide ID', 'Kept product ID', 'Kept guide version', 'Kept guide name', 'Kept slot name', 'Kept position', 'Kept placement label', 'Kept view', 'Kept required', 'Kept fill rule', 'Plan kept'], 'Kept plan changed at', 'Kept plan written at'),
    'Record intact': F('IF(AND({Record check} = "", {Kept plan check} = ""), 1, 0)', r => bit(!present(r.get('Record check')) && !present(r.get('Kept plan check')))),
    'Held': F(`IF(OR({Record intact} = 0, AND(COUNTA({Product record intact}) > 0, MIN({Product record intact}) = 0), FIND("${HAND}", ARRAYJOIN({Guide adoption check})) > 0), 1, 0)`,
      r => { const p = r.get('Product record intact') || []; return bit(N(r.get('Record intact')) === 0 || (p.length > 0 && p.some(x => N(x) === 0)) || FIND(HAND, AJ(r.get('Guide adoption check'))) > 0); }),
    'Has decision': F('IF({Decided content} != "", 1, 0)', r => bit(present(r.get('Decided content')))),
    'Carries decision': F('IF(OR({Has decision}, {Pending use decisions} > 0), 1, 0)', r => bit(B(r.get('Has decision')) || N(r.get('Pending use decisions')) > 0)),
    // v6 §6: a withdrawal counts only against a same-key record that isn't withdrawn, neither record
    // held, and the withdrawn record carrying no decision, or the named record carrying a recorded
    // decision no earlier than its own (compared by Decided content's last-modified time).
    'Withdrawal': F(`IF(NOT({Withdrawn}), "",
IF(OR(COUNTA({Duplicate of}) != 1, ARRAYJOIN({Duplicate key}) != {Slot key}, SUM({Duplicate withdrawn}) > 0), "Withdrawal not valid: name the record it duplicates",
IF(OR({Held}, SUM({Duplicate held}) > 0), "Withdrawal not valid: a record is edited by hand; record it again first",
IF(AND({Carries decision}, OR({Pending use decisions} > 0, SUM({Duplicate has decision}) = 0, IS_BEFORE(ARRAYJOIN({Duplicate decided at}), {Decided content changed at}))), "Withdrawal not valid: this record carries a decision; record it on the other first",
"Valid"))))`,
    r => {
      if (!B(r.get('Withdrawn'))) return '';
      const dup = r.get('Duplicate of') || [];
      if (dup.length !== 1 || AJ(r.get('Duplicate key')) !== S(r.get('Slot key')) || N(r.get('Duplicate withdrawn')) > 0) return 'Withdrawal not valid: name the record it duplicates';
      if (B(r.get('Held')) || N(r.get('Duplicate held')) > 0) return 'Withdrawal not valid: a record is edited by hand; record it again first';
      if (B(r.get('Carries decision'))) {
        const theirs = MS(r.get('Duplicate decided at')), mine = MS(r.get('Decided content changed at'));
        const earlier = theirs != null && mine != null && theirs < mine;
        if (N(r.get('Pending use decisions')) > 0 || N(r.get('Duplicate has decision')) === 0 || earlier) return 'Withdrawal not valid: this record carries a decision; record it on the other first';
      }
      return 'Valid';
    }),
    'Validly withdrawn': F('IF({Withdrawal} = "Valid", 1, 0)', r => bit(S(r.get('Withdrawal')) === 'Valid')),
    'Fill rule fulfillment': F(`SWITCH({Kept fill rule}, "Made for each product", "Make", "${SHARE_RULE}", "Share", "An accepted image that shows the product", "An accepted image", "")`,
      r => FILL_TO_FULFILLMENT[S(r.get('Kept fill rule'))] || ''),
    // v6: what operates is what was recorded.
    'Operative fulfillment': F('IF({Decided content} != "", {Recorded fulfillment}, {Fill rule fulfillment})',
      r => (present(r.get('Decided content')) ? S(r.get('Recorded fulfillment')) : S(r.get('Fill rule fulfillment')))),
    'Departure': F('IF(OR({Operative fulfillment} != {Fill rule fulfillment}, AND({Recorded not needed}, {Kept required} = "Always")), 1, 0)',
      r => bit(S(r.get('Operative fulfillment')) !== S(r.get('Fill rule fulfillment')) || (B(r.get('Recorded not needed')) && S(r.get('Kept required')) === 'Always'))),
    'Decision content': F(`"Fulfillment: " & {Fulfillment} & "\\nFulfillment reason: " & {Fulfillment reason} & "\\nNot needed: " & IF({Not needed}, "yes", "no") & "\\nNot needed reason: " & {Not needed reason} & ${decisionFieldsText}`,
      r => `Fulfillment: ${S(r.get('Fulfillment'))}\nFulfillment reason: ${S(r.get('Fulfillment reason'))}\nNot needed: ${B(r.get('Not needed')) ? 'yes' : 'no'}\nNot needed reason: ${S(r.get('Not needed reason'))}${decisionFields(r)}`),
    'Change pending': F(`IF(IF({Decided content} != "", {Decision content} != {Decided content}, OR({Fulfillment} != {Fill rule fulfillment}, {Not needed})), "${TEXT.changePending}", "")`,
      r => (present(r.get('Decided content'))
        ? S(r.get('Decision content')) !== S(r.get('Decided content'))
        : S(r.get('Fulfillment')) !== S(r.get('Fill rule fulfillment')) || B(r.get('Not needed'))) ? TEXT.changePending : ''),
    'In adopted plan': F(`IF(AND({Kept guide ID} != "", {Kept guide ID} = ARRAYJOIN({Assigned guide ID}), {Kept product ID} = ARRAYJOIN({Line product ID}), {Kept definition line} != "", FIND({Kept definition line}, ARRAYJOIN({Guide adopted definition})) > 0, FIND(" | active | ", {Kept definition line}) > 0, SUM({Request superseded}) = 0), 1, 0)`,
      r => bit(present(r.get('Kept guide ID')) && S(r.get('Kept guide ID')) === AJ(r.get('Assigned guide ID')) && S(r.get('Kept product ID')) === AJ(r.get('Line product ID'))
        && FIND(r.get('Kept definition line'), AJ(r.get('Guide adopted definition'))) > 0 && FIND(' | active | ', r.get('Kept definition line')) > 0 && N(r.get('Request superseded')) === 0)),
    'Stale by adoption': F(`IF(AND({Kept guide ID} != "", {Kept guide ID} = ARRAYJOIN({Assigned guide ID}), {Kept product ID} = ARRAYJOIN({Line product ID}), SUM({Request superseded}) = 0, ARRAYJOIN({Guide slot guide ID}) = {Kept guide ID}, FIND(ARRAYJOIN({Guide slot definition line}), ARRAYJOIN({Guide adopted definition})) > 0, FIND(" | active | ", ARRAYJOIN({Guide slot definition line})) > 0, FIND({Kept definition line}, ARRAYJOIN({Guide adopted definition})) = 0), 1, 0)`,
      r => { const adopted = AJ(r.get('Guide adopted definition')), live = AJ(r.get('Guide slot definition line'));
        return bit(present(r.get('Kept guide ID')) && S(r.get('Kept guide ID')) === AJ(r.get('Assigned guide ID')) && S(r.get('Kept product ID')) === AJ(r.get('Line product ID')) && N(r.get('Request superseded')) === 0
          && AJ(r.get('Guide slot guide ID')) === S(r.get('Kept guide ID')) && FIND(live, adopted) > 0 && FIND(' | active | ', live) > 0 && FIND(r.get('Kept definition line'), adopted) === 0); }),
    'Obligation unchanged': F('IF(AND({Kept required} = ARRAYJOIN({Guide slot required}), {Kept fill rule} = ARRAYJOIN({Guide slot fill rule})), 1, 0)',
      r => bit(S(r.get('Kept required')) === AJ(r.get('Guide slot required')) && S(r.get('Kept fill rule')) === AJ(r.get('Guide slot fill rule')))),
    // v6 (CX6): Waived reads the recorded field, never the editable Not needed box.
    'Waived': F('IF(AND({Recorded not needed}, {Held} = 0), 1, 0)', r => bit(B(r.get('Recorded not needed')) && N(r.get('Held')) === 0)),
    // v6 (CX5): Replan reach is kept apart from Active.
    'Replan reach': F('IF(AND({Validly withdrawn} = 0, {Waived} = 0, {Held} = 0, OR({In adopted plan}, AND({Stale by adoption}, {Obligation unchanged}))), 1, 0)',
      r => bit(N(r.get('Validly withdrawn')) === 0 && N(r.get('Waived')) === 0 && N(r.get('Held')) === 0 && (B(r.get('In adopted plan')) || (B(r.get('Stale by adoption')) && B(r.get('Obligation unchanged')))))),
    'Active': F('IF(AND({In adopted plan}, {Validly withdrawn} = 0, {Waived} = 0), 1, 0)',
      r => bit(B(r.get('In adopted plan')) && N(r.get('Validly withdrawn')) === 0 && N(r.get('Waived')) === 0)),
    // v6 §7.3: a Withdrawn shot doesn't count; Live shot count and the Shot … lookups skip it.
    'Matches its shot': F('IF(OR({Live shot count} = 0, ARRAYJOIN({Shot made as}) = {Operative fulfillment}), 1, 0)',
      r => bit(N(r.get('Live shot count')) === 0 || AJ(r.get('Shot made as')) === S(r.get('Operative fulfillment')))),
    'Shot accepted': F('IF(SUM({Shot accepted count}) > 0, 1, 0)', r => bit(N(r.get('Shot accepted count')) > 0)),
    'Covered': F('IF(AND({Shot accepted}, FIND({Slot ID}, ARRAYJOIN({Shot accepted slots kept})) > 0), 1, 0)',
      r => bit(B(r.get('Shot accepted')) && FIND(r.get('Slot ID'), AJ(r.get('Shot accepted slots kept'))) > 0)),
    'Slot ok': F('IF(AND({Active}, OR({Operative fulfillment} = "Make", {Operative fulfillment} = "Share"), {Change pending} = "", {Held} = 0, {Key count} = 1, {Matches its shot}, ARRAYJOIN({Line request ID}) = ARRAYJOIN({Request ID})), 1, 0)',
      r => bit(B(r.get('Active')) && ['Make', 'Share'].includes(S(r.get('Operative fulfillment'))) && !present(r.get('Change pending')) && N(r.get('Held')) === 0
        && N(r.get('Key count')) === 1 && B(r.get('Matches its shot')) && AJ(r.get('Line request ID')) === AJ(r.get('Request ID')))),
    'Shot-guide check': F(`IF(AND({Kept definition line} = ARRAYJOIN({Guide slot definition line}), COUNTA({Guide complete}) > 0, MIN({Guide complete}) = 1, {In adopted plan}), "${TEXT.guideSame}", "${TEXT.guideChanged}")`,
      r => { const c = r.get('Guide complete') || []; return S(r.get('Kept definition line')) === AJ(r.get('Guide slot definition line')) && c.length > 0 && c.every(x => N(x) === 1) && B(r.get('In adopted plan')) ? TEXT.guideSame : TEXT.guideChanged; }),
    'Pickup ok': F('IF(AND({Active}, {Operative fulfillment} = "An accepted image", {Change pending} = "", {Held} = 0, {Key count} = 1, {Plan kept}, {Shot-guide check} = "Same", {In use count} = 0), 1, 0)',
      r => bit(B(r.get('Active')) && S(r.get('Operative fulfillment')) === 'An accepted image' && !present(r.get('Change pending')) && N(r.get('Held')) === 0
        && N(r.get('Key count')) === 1 && B(r.get('Plan kept')) && S(r.get('Shot-guide check')) === TEXT.guideSame && N(r.get('In use count')) === 0)),
    'Receiving basis': F('ARRAYJOIN({Share signature}) & " ⟨size: " & ARRAYJOIN({Size}) & "⟩"', r => `${AJ(r.get('Share signature'))} ⟨size: ${AJ(r.get('Size'))}⟩`),
    'Receiving basis without size': F('ARRAYJOIN({Share signature}) & " ⟨size omitted⟩"', r => `${AJ(r.get('Share signature'))} ⟨size omitted⟩`),
    'Basis line': F('{Slot ID} & " ‖ " & {Kept definition line} & " ‖ " & {Kept product ID} & " ‖ " & {Receiving basis}',
      r => [r.get('Slot ID'), r.get('Kept definition line'), r.get('Kept product ID'), r.get('Receiving basis')].map(S).join(' ‖ ')),
    'Shot basis line': F('IF({Active}, {Slot ID} & " ‖ " & {Kept definition line} & " ‖ " & {Kept product ID} & " ‖ " & IF(SUM({Shot active slots filled}) > 1, {Receiving basis without size}, {Receiving basis}), "")',
      r => IF(r.get('Active'), [r.get('Slot ID'), r.get('Kept definition line'), r.get('Kept product ID'), N(r.get('Shot active slots filled')) > 1 ? r.get('Receiving basis without size') : r.get('Receiving basis')].map(S).join(' ‖ '), '')),
    'Kept destination now': F('{Kept definition line} & " ‖ " & {Kept product ID}', r => `${S(r.get('Kept definition line'))} ‖ ${S(r.get('Kept product ID'))}`),
    'Lineage line': F('IF({Active}, "Shot guide: " & {Kept guide name} & ", version " & {Kept guide version} & ", " & {Kept slot name} & " (guide " & {Kept guide ID} & ", guide slot " & ARRAYJOIN({Guide-slot ID}) & ").", "")',
      r => IF(r.get('Active'), `Shot guide: ${S(r.get('Kept guide name'))}, version ${S(r.get('Kept guide version'))}, ${S(r.get('Kept slot name'))} (guide ${S(r.get('Kept guide ID'))}, guide slot ${AJ(r.get('Guide-slot ID'))}).`, '')),
    'Active slot ID': F('IF({Active}, {Slot ID}, "")', r => IF(r.get('Active'), S(r.get('Slot ID')), '')),
    'Active line ID': F('IF({Active}, ARRAYJOIN({Line ID}), "")', r => IF(r.get('Active'), AJ(r.get('Line ID')), '')),
    'Active share signature': F('IF({Active}, ARRAYJOIN({Share signature}), "")', r => IF(r.get('Active'), AJ(r.get('Share signature')), '')),
    'Active product name': F('IF({Active}, ARRAYJOIN({Product name}), "")', r => IF(r.get('Active'), AJ(r.get('Product name')), '')),
    'Active placement label': F('IF({Active}, {Kept placement label}, "")', r => IF(r.get('Active'), S(r.get('Kept placement label')), '')),
    'Active view': F('IF({Active}, {Kept view}, "")', r => IF(r.get('Active'), S(r.get('Kept view')), '')),
    'Active guide-slot ID': F('IF({Active}, ARRAYJOIN({Guide-slot ID}), "")', r => IF(r.get('Active'), AJ(r.get('Guide-slot ID')), '')),
    'Active definition line': F('IF({Active}, {Kept definition line}, "")', r => IF(r.get('Active'), S(r.get('Kept definition line')), '')),
    'Active operative fulfillment': F('IF({Active}, {Operative fulfillment}, "")', r => IF(r.get('Active'), S(r.get('Operative fulfillment')), '')),
    'Not ok': F('IF(AND({Active}, {Slot ok} = 0), 1, 0)', r => bit(B(r.get('Active')) && N(r.get('Slot ok')) === 0)),
    'Guide changed': F(`IF(AND({Active}, {Shot-guide check} != "${TEXT.guideSame}"), 1, 0)`, r => bit(B(r.get('Active')) && S(r.get('Shot-guide check')) !== TEXT.guideSame)),
    'Placement state': F(`IF(AND({In use count} = 1, {In-use states} = "In use"), "Settled",
IF(FIND("Unfinished", {In-use states}), "Unfinished",
IF(FIND("Replacement unfinished", {In-use states}), "Replacement unfinished",
IF(OR(FIND("Conflict", {In-use states}), {In use count} > 1), "Conflict",
IF(FIND("Needs review", {In-use states}), "Needs review", "")))))`,
    r => {
      const st = S(r.get('In-use states')), n = N(r.get('In use count'));
      if (n === 1 && st === 'In use') return 'Settled';
      if (FIND('Unfinished', st)) return 'Unfinished';
      if (FIND('Replacement unfinished', st)) return 'Replacement unfinished';
      if (FIND('Conflict', st) || n > 1) return 'Conflict';
      if (FIND('Needs review', st)) return 'Needs review';
      return '';
    }),
    'Status': F(STATUS_TEXT(), r => slotStatus(r)),
  },

  'Shots': {
    'Shot ID': F('RECORD_ID()', r => r.id),
    'Not withdrawn': F('IF({Withdrawn}, 0, 1)', r => bit(!B(r.get('Withdrawn')))),
    'Sharing check': F(`IF({Made as} = "Share", IF(AND({Share signatures} != "", FIND("¦", {Share signatures}) = 0, {Share signatures} = ARRAYJOIN({Line share signature})), "${TEXT.sharedSame}", "${TEXT.sharedDiffer}" & SUBSTITUTE({Share signatures}, "¦", " / ")), "")`,
      r => { if (S(r.get('Made as')) !== 'Share') return ''; const sig = S(r.get('Share signatures'));
        return sig && !sig.includes('¦') && sig === AJ(r.get('Line share signature')) ? TEXT.sharedSame : TEXT.sharedDiffer + sig.split('¦').join(' / '); }),
    'Current product basis': F(`IF(COUNTA({Lines in shot}) = 0, "", SUBSTITUTE(ARRAYJOIN({Line product basis}, "\\n"), "\\n", IF({Active slots filled} > 1, " | size omitted", " | size shown") & "\\n") & IF({Active slots filled} > 1, " | size omitted", " | size shown"))`,
      r => { const lines = r.get('Line product basis') || []; if (!(r.get('Lines in shot') || []).length) return ''; const suf = N(r.get('Active slots filled')) > 1 ? ' | size omitted' : ' | size shown'; return lines.map(l => S(l) + suf).join('\n'); }),
    'Effective placement': F(`IF(ARRAYJOIN({Workflow}) = "Product pages", IF({Active slot products} = "", "", {Active slot products} & " " & IF({Active slots filled} > 1, SUBSTITUTE({Active placement labels}, "product page", "product pages"), {Active placement labels})),
IF(ARRAYJOIN({Workflow}) = "Collection", REGEX_REPLACE(REGEX_EXTRACT({Kept guide plan}, "Placement: [^\\n]*"), "^Placement: ", ""), {Placement}))`,
    r => { const wf = AJ(r.get('Workflow'));
      if (wf === 'Product pages') { const p = S(r.get('Active slot products')); if (!p) return ''; const lab = S(r.get('Active placement labels')); return `${p} ${N(r.get('Active slots filled')) > 1 ? lab.split('product page').join('product pages') : lab}`; }
      if (wf === 'Collection') return lineOf(r.get('Kept guide plan'), 'Placement');
      return S(r.get('Placement')); }),
    'Prompt placement': F('IF(ARRAYJOIN({Workflow}) = "Product pages", {Active placement labels}, {Effective placement})',
      r => (AJ(r.get('Workflow')) === 'Product pages' ? S(r.get('Active placement labels')) : S(r.get('Effective placement')))),
    'Effective direction': F(`IF(ARRAYJOIN({Workflow}) = "Product pages", {Active views} & IF({Active slots filled} > 1, "${TEXT.moreSizes}", ""),
IF(ARRAYJOIN({Workflow}) = "Collection", REGEX_REPLACE(REGEX_EXTRACT({Kept guide plan}, "View: [^\\n]*"), "^View: ", ""), {Shot direction}))
& IF(AND(ARRAYJOIN({Workflow}) != "Walkthrough", ARRAYJOIN({Workflow}) != "", {Exception}, {Exception reason}), " Exception: " & {Exception}, "")`,
    r => { const wf = AJ(r.get('Workflow'));
      const base = wf === 'Product pages' ? S(r.get('Active views')) + (N(r.get('Active slots filled')) > 1 ? TEXT.moreSizes : '')
        : wf === 'Collection' ? lineOf(r.get('Kept guide plan'), 'View') : S(r.get('Shot direction'));
      return base + (wf && wf !== 'Walkthrough' && B(r.get('Exception')) && B(r.get('Exception reason')) ? ` Exception: ${S(r.get('Exception'))}` : ''); }),
    'Lineage': F(`IF(ARRAYJOIN({Workflow}) = "Product pages", {Active lineage}, IF(ARRAYJOIN({Workflow}) = "Collection", REGEX_REPLACE(REGEX_EXTRACT({Kept guide plan}, "Lineage: [^\\n]*"), "^Lineage: ", ""), ""))`,
      r => { const wf = AJ(r.get('Workflow')); return wf === 'Product pages' ? S(r.get('Active lineage')) : wf === 'Collection' ? lineOf(r.get('Kept guide plan'), 'Lineage') : ''; }),
    'Confirmation current': F('IF(AND({Products confirmed}, OR({Lines changed at} = BLANK(), NOT(IS_BEFORE({Confirmed at}, {Lines changed at})))), 1, 0)',
      r => { const c = MS(r.get('Confirmed at')), l = MS(r.get('Lines changed at')); return bit(B(r.get('Products confirmed')) && (l == null || (c != null && c >= l))); }),
    'Plan check': F(PLAN_CHECK_TEXT(), r => planCheck(r)),
    'Planned': F('IF({Plan check} = "Planned", 1, 0)', r => bit(S(r.get('Plan check')) === 'Planned')),
    'Shot-guide check': F(`IF(ARRAYJOIN({Workflow}) = "Product pages", IF({Slots guide changed} = 0, "${TEXT.guideSame}", "${TEXT.guideChanged}"),
IF(ARRAYJOIN({Workflow}) = "Collection", IF(AND(FIND(ARRAYJOIN({Guide slot definition line}), {Kept guide plan}) > 0, SUM({Collection guide complete}) = 1), "${TEXT.guideSame}", "${TEXT.guideChanged}"), ""))`,
    r => { const wf = AJ(r.get('Workflow'));
      if (wf === 'Product pages') return N(r.get('Slots guide changed')) === 0 ? TEXT.guideSame : TEXT.guideChanged;
      if (wf === 'Collection') return FIND(AJ(r.get('Guide slot definition line')), r.get('Kept guide plan')) > 0 && N(r.get('Collection guide complete')) === 1 ? TEXT.guideSame : TEXT.guideChanged;
      return ''; }),
    // Workflow branch (§7.1): an empty or Walkthrough workflow keeps today's expression character for character.
    'Current standard': F(`IF(OR(ARRAYJOIN({Workflow}) = "Product pages", ARRAYJOIN({Workflow}) = "Collection", ARRAYJOIN({Workflow}) = "Marketing", ARRAYJOIN({Workflow}) = "Campaign"),
ARRAYJOIN({Request standard}, "") & "\\nProducts:\\n" & IF({Active slots filled} > 1, ARRAYJOIN({Line shared facts}, "\\n"), ARRAYJOIN({Line facts}, "\\n")) & "\\nShot: " & {Name} & ", for " & {Effective placement} & ". " & {Effective direction} & IF({Lineage}, "\\n" & {Lineage}, ""),
ARRAYJOIN({Brief standard}, "") & "\\nShot: " & {Name} & ", for " & {Placement} & ". " & {Shot direction})`,
    r => (isNewWorkflow(r)
      ? `${AJ(r.get('Request standard'))}\nProducts:\n${AJ(N(r.get('Active slots filled')) > 1 ? r.get('Line shared facts') : r.get('Line facts'), '\n')}\nShot: ${S(r.get('Name'))}, for ${S(r.get('Effective placement'))}. ${S(r.get('Effective direction'))}${IF(r.get('Lineage'), `\n${S(r.get('Lineage'))}`, '')}`
      : `${AJ(r.get('Brief standard'))}\nShot: ${S(r.get('Name'))}, for ${S(r.get('Placement'))}. ${S(r.get('Shot direction'))}`)),
    'Current prompt': F(`IF(OR(ARRAYJOIN({Workflow}) = "Product pages", ARRAYJOIN({Workflow}) = "Collection", ARRAYJOIN({Workflow}) = "Marketing", ARRAYJOIN({Workflow}) = "Campaign"),
ARRAYJOIN({Request prompt}, "") & "\\nProducts:\\n" & IF({Active slots filled} > 1, ARRAYJOIN({Line shared prompt lines}, "\\n"), ARRAYJOIN({Line prompt lines}, "\\n")) & "\\nShot: " & {Name} & ", for " & {Prompt placement} & ". " & {Effective direction},
ARRAYJOIN({Brief prompt}, "") & "\\nShot: " & {Name} & ", for " & {Placement} & ". " & {Shot direction})`,
    r => (isNewWorkflow(r)
      ? `${AJ(r.get('Request prompt'))}\nProducts:\n${AJ(N(r.get('Active slots filled')) > 1 ? r.get('Line shared prompt lines') : r.get('Line prompt lines'), '\n')}\nShot: ${S(r.get('Name'))}, for ${S(r.get('Prompt placement'))}. ${S(r.get('Effective direction'))}`
      : `${AJ(r.get('Brief prompt'))}\nShot: ${S(r.get('Name'))}, for ${S(r.get('Placement'))}. ${S(r.get('Shot direction'))}`)),
    // Stand-in for the existing Decision formula, retargeted to Effective placement (§6).
    'Decision': F('IF({Effective placement} = "", "", "For " & {Effective placement})', r => (present(r.get('Effective placement')) ? `For ${S(r.get('Effective placement'))}` : '')),
    'Can generate': F('IF(AND({Planned} = 1, COUNTA({Product image}) > 0, COUNTA({Reference images}) > 0), 1, 0)',
      r => bit(N(r.get('Planned')) === 1 && (r.get('Product image') || []).length > 0 && (r.get('Reference images') || []).length > 0)),
  },

  'Candidates': {
    'Title': F('ARRAYJOIN({Shot name}) & " // candidate " & {Number in shot}', r => `${AJ(r.get('Shot name'))} // candidate ${S(r.get('Number in shot'))}`),
    'Has image': F('IF(COUNTA({Image}) > 0, 1, 0)', r => bit((r.get('Image') || []).length > 0)),
    'Shot planned': F('IF(AND({Shot count} = 1, {Shot planned values} = 1), 1, 0)', r => bit(N(r.get('Shot count')) === 1 && N(r.get('Shot planned values')) === 1)),
    'Standard check': F('IF({Standard} = ARRAYJOIN({Shot current standard}), "Same as the shot\'s current standard", "The standard has changed since this image was made")',
      r => (S(r.get('Standard')) === AJ(r.get('Shot current standard')) ? "Same as the shot's current standard" : 'The standard has changed since this image was made')),
    // Held labels apply only to a candidate that has never had an image (§7.6); otherwise a stand-in for today's Ready.
    'Ready': F(`IF(AND({Has image} = 0, {Generated at} = BLANK()), IF({Shot planned} != 1, "Held: the shot isn't planned now. See its Plan check.", IF(LEFT({Standard check}, 4) != "Same", "Held: the standard changed since this candidate was kept.", IF({Standard}, "Ready to generate", "Preparing…"))), IF({Standard}, "Ready to generate", "Preparing…"))`,
      r => { const today = present(r.get('Standard')) ? 'Ready to generate' : 'Preparing…';
        if (N(r.get('Has image')) === 0 && r.get('Generated at') == null) {
          if (N(r.get('Shot planned')) !== 1) return "Held: the shot isn't planned now. See its Plan check.";
          if (!S(r.get('Standard check')).startsWith('Same')) return 'Held: the standard changed since this candidate was kept.';
        }
        return today; }),
    'Status': F(`IF({Has image}, "Image ready", IF(LEFT({Ready}, 5) = "Held:", "Held // the shot changed." & IF({Generate when ready}, " If it is planned again with the same standard, a pending request continues automatically; contact ASK to cancel it.", ""), IF({Generate when ready}, "Image requested", "Not requested")))`,
      r => (B(r.get('Has image')) ? 'Image ready' : S(r.get('Ready')).startsWith('Held:')
        ? `Held // the shot changed.${B(r.get('Generate when ready')) ? ' If it is planned again with the same standard, a pending request continues automatically; contact ASK to cancel it.' : ''}`
        : B(r.get('Generate when ready')) ? 'Image requested' : 'Not requested')),
    'Is accepted': F('IF(COUNTA({Accepted image}) > 0, 1, 0)', r => bit((r.get('Accepted image') || []).length > 0)),
    'Accepted slots kept': F('IF({Is accepted}, {Slots kept}, "")', r => IF(r.get('Is accepted'), S(r.get('Slots kept')), '')),
  },

  'Accepted images': {
    'Accepted ID': F('RECORD_ID()', r => r.id),
    'Name': F('ARRAYJOIN({Current title})', r => AJ(r.get('Current title'))),
    // Stand-ins for the existing Record complete and Coverage formulas, which this unit doesn't edit.
    'Record complete': F('IF(AND(COUNTA({Candidate}) = 1, {Accepted at}, {Standard}), "Complete", "Incomplete")',
      r => ((r.get('Candidate') || []).length === 1 && present(r.get('Accepted at')) && present(r.get('Standard')) ? 'Complete' : 'Incomplete')),
    'Coverage': F('IF(SUM({Candidate test}) > 0, "", IF({Standard} = ARRAYJOIN({Shot current standard}), "Current standard", "Earlier standard"))',
      r => (N(r.get('Candidate test')) > 0 ? '' : S(r.get('Standard')) === AJ(r.get('Shot current standard')) ? 'Current standard' : 'Earlier standard')),
    'Source current': F('IF({Standard} = ARRAYJOIN({Shot current standard}), 1, 0)', r => bit(S(r.get('Standard')) === AJ(r.get('Shot current standard')))),
  },

  'Applications': {
    'Application ID': F('RECORD_ID()', r => r.id),
    'Name': F('ARRAYJOIN({Slot name}) & " ← " & ARRAYJOIN({Source title})', r => `${AJ(r.get('Slot name'))} ← ${AJ(r.get('Source title'))}`),
    'Current check': detector(['Current'], 'Current changed at', 'Current set at'),
    'Eligibility': F(`IF(SUM({Slot active}) = 0, IF(SUM({Slot waived}) > 0, "Needs review: the slot is marked not needed", IF(SUM({Slot in adopted plan}) = 0, "Needs review: the slot is no longer in the adopted plan", "Needs review: the slot is withdrawn")),
IF(ARRAYJOIN({Slot kept destination}) != {Kept destination}, "Needs review: the slot was replanned since this image was applied",
IF(AND({Kept receiving basis} != ARRAYJOIN({Slot receiving basis}), {Kept receiving basis} != ARRAYJOIN({Slot receiving basis without size})), "Needs review: the product's facts changed since this image was applied",
IF(ARRAYJOIN({Source complete}) != "Complete", "Needs review: its source record isn't complete",
IF(AND({Basis} = "Use decision", COUNTA({Use decision}) = 0), "Needs review: its decision record is missing",
IF(SUM({Slot held}) > 0, "Needs review: the slot is edited by hand",
IF(AND({Basis} = "Use decision", SUM({Decision record intact}) = 0), "Needs review: its decision's record was edited by hand",
"Holds")))))))`,
    r => {
      if (N(r.get('Slot active')) === 0) return N(r.get('Slot waived')) > 0 ? 'Needs review: the slot is marked not needed'
        : N(r.get('Slot in adopted plan')) === 0 ? 'Needs review: the slot is no longer in the adopted plan' : 'Needs review: the slot is withdrawn';
      if (AJ(r.get('Slot kept destination')) !== S(r.get('Kept destination'))) return 'Needs review: the slot was replanned since this image was applied';
      const kept = S(r.get('Kept receiving basis'));
      if (kept !== AJ(r.get('Slot receiving basis')) && kept !== AJ(r.get('Slot receiving basis without size'))) return "Needs review: the product's facts changed since this image was applied";
      if (AJ(r.get('Source complete')) !== 'Complete') return "Needs review: its source record isn't complete";
      const ud = S(r.get('Basis')) === 'Use decision';
      if (ud && !(r.get('Use decision') || []).length) return 'Needs review: its decision record is missing';
      if (N(r.get('Slot held')) > 0) return 'Needs review: the slot is edited by hand';
      if (ud && N(r.get('Decision record intact')) === 0) return "Needs review: its decision's record was edited by hand";
      return 'Holds';
    }),
    'Basis finished': F('IF({Basis} = "Use decision", IF(SUM({Decision applied}), 1, 0), IF(SUM({Source applications done}), 1, 0))',
      r => bit(S(r.get('Basis')) === 'Use decision' ? N(r.get('Decision applied')) > 0 : N(r.get('Source applications done')) > 0)),
    'State': F(`IF({Withdrawn}, "Withdrawn duplicate",
IF({Current check}, "${HAND}",
IF(AND(NOT({Current}), COUNTA({Replaced by})), "Replaced by " & ARRAYJOIN({Replaced by name}),
IF(NOT({Current}), "Alternate",
IF(NOT({Basis finished}), IF({Basis} = "Use decision", "Unfinished: press Apply this decision again", "Unfinished: press Retry applications on the accepted image"),
IF(FIND({Application ID}, ARRAYJOIN({Slot in-use replaces})), "Replacement unfinished: press Apply this decision again on the replacing decision",
IF(SUM({Slot in use count}) - 1 - SUM({Replaces in use}) > 0, "Conflict",
IF({Eligibility} != "Holds", {Eligibility}, "In use"))))))))`,
    r => {
      if (B(r.get('Withdrawn'))) return 'Withdrawn duplicate';
      if (present(r.get('Current check'))) return HAND;
      if (!B(r.get('Current'))) return (r.get('Replaced by') || []).length ? `Replaced by ${AJ(r.get('Replaced by name'))}` : 'Alternate';
      if (!B(r.get('Basis finished'))) return S(r.get('Basis')) === 'Use decision' ? 'Unfinished: press Apply this decision again' : 'Unfinished: press Retry applications on the accepted image';
      if (FIND(r.get('Application ID'), AJ(r.get('Slot in-use replaces')))) return 'Replacement unfinished: press Apply this decision again on the replacing decision';
      if (N(r.get('Slot in use count')) - 1 - N(r.get('Replaces in use')) > 0) return 'Conflict';
      return S(r.get('Eligibility')) !== 'Holds' ? S(r.get('Eligibility')) : 'In use';
    }),
    'Delivery name': F('LOWER(SUBSTITUTE(ARRAYJOIN({Product}), " ", "-")) & "_" & ARRAYJOIN({Position}) & "_" & LOWER(SUBSTITUTE(ARRAYJOIN({Slot kept slot name}), " ", "-")) & "_from-accepted-" & ARRAYJOIN({Source ID}) & ".jpg"',
      r => `${AJ(r.get('Product')).split(' ').join('-').toLowerCase()}_${AJ(r.get('Position'))}_${AJ(r.get('Slot kept slot name')).split(' ').join('-').toLowerCase()}_from-accepted-${AJ(r.get('Source ID'))}.jpg`),
    'In use flag': F('IF(AND({Current}, NOT({Withdrawn})), 1, 0)', r => bit(B(r.get('Current')) && !B(r.get('Withdrawn')))),
    'In use state': F('IF({In use flag}, {State}, "")', r => IF(r.get('In use flag'), S(r.get('State')), '')),
    'In use basis': F('IF({In use flag}, {Basis}, "")', r => IF(r.get('In use flag'), S(r.get('Basis')), '')),
    'In use replaces': F('IF({In use flag}, ARRAYJOIN({Replaces IDs}, ","), "")', r => IF(r.get('In use flag'), AJ(r.get('Replaces IDs'), ','), '')),
    'In use title': F('IF({In use flag}, ARRAYJOIN({Source title}), "")', r => IF(r.get('In use flag'), AJ(r.get('Source title')), '')),
    'In use label': F('IF({In use flag}, {Kept label}, "")', r => IF(r.get('In use flag'), S(r.get('Kept label')), '')),
    'In use eligibility': F('IF({In use flag}, {Eligibility}, "")', r => IF(r.get('In use flag'), S(r.get('Eligibility')), '')),
    'Alternate title': F('IF(AND(NOT({Current}), NOT({Withdrawn}), COUNTA({Replaced by}) = 0), ARRAYJOIN({Source title}), "")',
      r => IF(!B(r.get('Current')) && !B(r.get('Withdrawn')) && !(r.get('Replaced by') || []).length, AJ(r.get('Source title')), '')),
    'Settled source image': F('IF({State} = "In use", ARRAYJOIN({Source image}), "")', r => IF(S(r.get('State')) === 'In use', (r.get('Source image') || []).map(a => (a && a.filename) || S(a)).join(', '), '')),
  },

  'Use decisions': {
    'Decision ID': F('RECORD_ID()', r => r.id),
    'Name': F('ARRAYJOIN({Source title}) & " → " & COUNTA({Slots}) & " slots"', r => `${AJ(r.get('Source title'))} → ${(r.get('Slots') || []).length} slots`),
    'Live basis': F(`"Source: " & ARRAYJOIN({Source ID}) & "\\n" & {Slot basis lines} & "\\n" & IF({Replace}, "replace", "add") & "\\nFacts reviewed: " & IF({Facts reviewed}, "yes", "no") & "\\nConditions: " & {Conditions} & ${decisionFieldsText}`,
      r => `Source: ${AJ(r.get('Source ID'))}\n${S(r.get('Slot basis lines'))}\n${B(r.get('Replace')) ? 'replace' : 'add'}\nFacts reviewed: ${B(r.get('Facts reviewed')) ? 'yes' : 'no'}\nConditions: ${S(r.get('Conditions'))}${decisionFields(r)}`),
    'Record intact': F(`IF(${handText(['Decided basis', 'Decided selection'], 'Record changed at', 'Decided at')} = "", 1, 0)`,
      r => bit(handFn(['Decided basis', 'Decided selection'], 'Record changed at', 'Decided at')(r) === '')),
    'Basis check': F('IF({Decided basis} = "", "Not applied yet", IF({Live basis} = {Decided basis}, "As decided", "Edited after it was decided: what was decided stands; a different use is a new decision"))',
      r => (!present(r.get('Decided basis')) ? 'Not applied yet' : S(r.get('Live basis')) === S(r.get('Decided basis')) ? 'As decided' : 'Edited after it was decided: what was decided stands; a different use is a new decision')),
    'Pending fixed': F('IF(AND({Decided basis} != "", NOT({Applied})), 1, 0)', r => bit(present(r.get('Decided basis')) && !B(r.get('Applied')))),
    'Progress': F(`IF({Decided basis} = "", "Not applied", IF({Applied}, IF(LEFT({Result}, 15) = "Applied in part", "Applied in part", "Applied"), "Applied to " & {Application count} & " of " & (LEN({Decided selection}) - LEN(SUBSTITUTE({Decided selection}, "\\n", "")) + 1) & " slots: press Apply this decision again to finish"))`,
      r => { if (!present(r.get('Decided basis'))) return 'Not applied';
        if (B(r.get('Applied'))) return S(r.get('Result')).startsWith('Applied in part') ? 'Applied in part' : 'Applied';
        const m = S(r.get('Decided selection')).split('\n').length;
        return `Applied to ${N(r.get('Application count'))} of ${m} slots: press Apply this decision again to finish`; }),
  },
};

function isNewWorkflow(r) { return ['Product pages', 'Collection', 'Marketing', 'Campaign'].includes(AJ(r.get('Workflow'))); }

// Slot Status (§7.7, with v6's held, recorded and stale branches, and GPT-A's covered pickup).
// slotStatus() and STATUS_TEXT() are the same decision list, branch for branch.
function notInPlanReason(r) {
  if (N(r.get('Request superseded')) > 0) return 'the request was superseded';
  if (S(r.get('Kept guide ID')) !== AJ(r.get('Assigned guide ID'))) return 'the product was reassigned';
  if (S(r.get('Kept product ID')) !== AJ(r.get('Line product ID'))) return "the line's product was changed";
  if (AJ(r.get('Guide slot guide ID')) !== S(r.get('Kept guide ID'))) return 'the guide moved this image to another guide';
  const live = AJ(r.get('Guide slot definition line')), adopted = AJ(r.get('Guide adopted definition'));
  if (FIND(live, adopted) > 0 && FIND(' | retired | ', live) > 0) return 'the guide retired this image';
  if (B(r.get('Stale by adoption'))) return `the guide changed it: ${staleStep(r)}`;
  return "the guide changed it: adopt the guide's current definition, then replan";
}
export function staleStep(r) {
  if (!B(r.get('Obligation unchanged'))) return TEXT.stepVersion;
  if (N(r.get('Live shot count')) === 0 || B(r.get('Shot accepted'))) return TEXT.stepSlot;
  return TEXT.stepShot;
}
function heldStatus(r) {
  if (present(r.get('Kept plan check'))) return TEXT.heldPlan;
  if (present(r.get('Record check'))) return TEXT.heldSlot;
  const p = r.get('Product record intact') || [];
  if (p.length > 0 && p.some(x => N(x) === 0)) return TEXT.heldProduct;
  return TEXT.heldGuide;
}
// The shot's other active products: SUBSTITUTE(", " & list & ",", ", " & mine & ",", ","), stripped.
function sharedWith(r) {
  const x = `, ${AJ(r.get('Shot active products'))},`.split(`, ${AJ(r.get('Product name'))},`).join(',');
  return x.replace(/^, ?/, '').replace(/,$/, '');
}
function slotStatus(r) {
  if (B(r.get('Validly withdrawn'))) return 'Withdrawn';
  const wd = S(r.get('Withdrawal'));
  if (wd.startsWith('Withdrawal not valid')) return wd;
  if (B(r.get('Held'))) return heldStatus(r);
  const pending = present(r.get('Change pending'));
  if (B(r.get('Waived'))) return `Not needed: ${S(r.get('Recorded summary'))}${pending ? STATUS.waivedPending : ''}`;
  if (N(r.get('Key count')) > 1) return STATUS.pair;
  if (!B(r.get('In adopted plan'))) return `Not in the adopted plan: ${notInPlanReason(r)}`;
  if (pending) return TEXT.changePending + STATUS.pendingTail;
  const op = S(r.get('Operative fulfillment')), state = S(r.get('Placement state'));
  const hasShot = N(r.get('Live shot count')) > 0, covered = B(r.get('Covered')), matches = B(r.get('Matches its shot'));
  // GPT-A: once a use decision's application is in use on the slot, its State answers below.
  const byDecision = op === 'An accepted image' && N(r.get('In use count')) > 0 && FIND('Use decision', r.get('In-use bases')) > 0;
  if (!matches && covered && !byDecision) return op === 'An accepted image' ? TEXT.coveredPickup : TEXT.coveredRefusal;
  if (!matches && !covered) return STATUS.detach;
  if (matches && hasShot && B(r.get('Shot accepted')) && !covered) return TEXT.acceptedWithout;
  if (S(r.get('Shot-guide check')) !== TEXT.guideSame) return STATUS.replan;
  if (state === 'Unfinished') return firstLine(r.get('In-use states'), 'Unfinished');
  if (state === 'Replacement unfinished') return firstLine(r.get('In-use states'), 'Replacement unfinished');
  if (state === 'Conflict') return `Conflict: ${N(r.get('In use count'))} images in use. Resolve with a use decision with Replace`;
  if (state === 'Needs review') return firstLine(r.get('In-use eligibility'), 'Needs review');
  const also = present(r.get('Alternate titles')) ? `. Also accepted: ${S(r.get('Alternate titles'))}` : '';
  if (state === 'Settled') {
    if (S(r.get('In-use bases')) === 'Use decision') return `Has its image: used again from ${S(r.get('In-use titles'))}, ${S(r.get('In-use labels'))}${also}`;
    const others = sharedWith(r);
    return `Has its image: ${S(r.get('In-use titles'))}, made for this page${others ? `, shared with ${others}` : ''}${also}`;
  }
  if (N(r.get('In use count')) > 0) return STATUS.currentByHand;
  if (hasShot) return `Being made: ${AJ(r.get('Shot name'))}`;
  const planNote = AJ(r.get('Request shot planning note'));
  if (op === 'Share' && FIND('Nothing was shared', planNote) > 0 && FIND(AJ(r.get('Product name')), planNote) > 0) return STATUS.notShared;
  if (op === 'Make' || op === 'Share') return STATUS.waiting;
  return STATUS.needsImage;
}
function STATUS_TEXT() {
  const step = `IF({Obligation unchanged} = 0, ${Q(TEXT.stepVersion)}, IF(OR({Live shot count} = 0, {Shot accepted}), ${Q(TEXT.stepSlot)}, ${Q(TEXT.stepShot)}))`;
  const reason = `IF(SUM({Request superseded}) > 0, "the request was superseded",
  IF({Kept guide ID} != ARRAYJOIN({Assigned guide ID}), "the product was reassigned",
  IF({Kept product ID} != ARRAYJOIN({Line product ID}), "the line's product was changed",
  IF(ARRAYJOIN({Guide slot guide ID}) != {Kept guide ID}, "the guide moved this image to another guide",
  IF(AND(FIND(ARRAYJOIN({Guide slot definition line}), ARRAYJOIN({Guide adopted definition})) > 0, FIND(" | retired | ", ARRAYJOIN({Guide slot definition line})) > 0), "the guide retired this image",
  IF({Stale by adoption}, "the guide changed it: " & ${step}, "the guide changed it: adopt the guide's current definition, then replan"))))))`;
  const shared = 'REGEX_REPLACE(REGEX_REPLACE(SUBSTITUTE(", " & ARRAYJOIN({Shot active products}) & ",", ", " & ARRAYJOIN({Product name}) & ",", ","), "^, ?", ""), ",$", "")';
  const also = 'IF({Alternate titles}, ". Also accepted: " & {Alternate titles}, "")';
  const byDecision = 'AND({Operative fulfillment} = "An accepted image", {In use count} > 0, FIND("Use decision", {In-use bases}) > 0)';
  return `IF({Validly withdrawn}, "Withdrawn",
IF(LEFT({Withdrawal}, 20) = "Withdrawal not valid", {Withdrawal},
IF({Held}, IF({Kept plan check}, ${Q(TEXT.heldPlan)}, IF({Record check}, ${Q(TEXT.heldSlot)}, IF(AND(COUNTA({Product record intact}) > 0, MIN({Product record intact}) = 0), ${Q(TEXT.heldProduct)}, ${Q(TEXT.heldGuide)}))),
IF({Waived}, "Not needed: " & {Recorded summary} & IF({Change pending}, ${Q(STATUS.waivedPending)}, ""),
IF({Key count} > 1, ${Q(STATUS.pair)},
IF(NOT({In adopted plan}), "Not in the adopted plan: " & ${reason},
IF({Change pending}, ${Q(TEXT.changePending + STATUS.pendingTail)},
IF(AND(NOT({Matches its shot}), {Covered}, NOT(${byDecision})), IF({Operative fulfillment} = "An accepted image", ${Q(TEXT.coveredPickup)}, ${Q(TEXT.coveredRefusal)}),
IF(AND(NOT({Matches its shot}), NOT({Covered})), ${Q(STATUS.detach)},
IF(AND({Matches its shot}, {Live shot count} > 0, {Shot accepted}, NOT({Covered})), ${Q(TEXT.acceptedWithout)},
IF({Shot-guide check} != ${Q(TEXT.guideSame)}, ${Q(STATUS.replan)},
IF({Placement state} = "Unfinished", REGEX_EXTRACT({In-use states}, "Unfinished[^\\n]*"),
IF({Placement state} = "Replacement unfinished", REGEX_EXTRACT({In-use states}, "Replacement unfinished[^\\n]*"),
IF({Placement state} = "Conflict", "Conflict: " & {In use count} & " images in use. Resolve with a use decision with Replace",
IF({Placement state} = "Needs review", REGEX_EXTRACT({In-use eligibility}, "Needs review[^\\n]*"),
IF({Placement state} = "Settled", IF({In-use bases} = "Use decision", "Has its image: used again from " & {In-use titles} & ", " & {In-use labels}, "Has its image: " & {In-use titles} & ", made for this page" & IF(${shared} != "", ", shared with " & ${shared}, "")) & ${also},
IF({In use count} > 0, ${Q(STATUS.currentByHand)},
IF({Live shot count} > 0, "Being made: " & ARRAYJOIN({Shot name}),
IF(AND({Operative fulfillment} = "Share", FIND("Nothing was shared", ARRAYJOIN({Request shot planning note})) > 0, FIND(ARRAYJOIN({Product name}), ARRAYJOIN({Request shot planning note})) > 0), ${Q(STATUS.notShared)},
IF(OR({Operative fulfillment} = "Make", {Operative fulfillment} = "Share"), ${Q(STATUS.waiting)},
${Q(STATUS.needsImage)}))))))))))))))))))))`;
}

// Planned (§7.2): Plan check names the first condition missing, or reads "Planned".
function sourcesAndException(r, walkthrough) {
  const has = r.get('Line product has image') || [];
  if (!has.length || has.some(x => N(x) !== 1) || N(r.get('References complete')) !== 1) return 'Not planned: a source image is missing';
  if (walkthrough && present(r.get('Exception'))) return "Not planned: Exceptions aren't used on walkthrough shots; edit Shot direction.";
  if (present(r.get('Exception')) && !present(r.get('Exception reason'))) return 'Not planned: an exception needs its reason';
  return 'Planned';
}
function planCheck(r) {
  if ((r.get('Brief') || []).length !== 1) return 'Not planned: it needs one request';
  if (B(r.get('Withdrawn'))) return 'Not planned: withdrawn';
  if (N(r.get('Request superseded')) > 0) return 'Not planned: its request is superseded';
  const wf = AJ(r.get('Workflow')), lines = r.get('Lines in shot') || [];
  if (wf === 'Product pages') {
    if (N(r.get('Active slots filled')) < 1) return 'Not planned: it fills no active slot';
    if (N(r.get('Held slots')) > 0) return 'Not planned: a slot it fills is edited by hand (see its Status)';
    if (N(r.get('Slots not ok')) > 0) return "Not planned: a slot it fills isn't ok (see its Status)";
    if (N(r.get('Slots guide changed')) > 0) return `Not planned: ${TEXT.guideChanged.toLowerCase()}`;
    if (S(r.get('Active guide-slot IDs')).includes('¦') || S(r.get('Active definition lines')).includes('¦')) return "Not planned: its slots don't share one guide slot";
    if (lines.length !== 1 || !FIND(AJ(r.get('Line IDs')), r.get('Active slot lines'))) return 'Not planned: Lines in shot must be the line of one of its active slots';
    const made = S(r.get('Made as'));
    if (made === 'Make') { if (N(r.get('Active slots filled')) !== 1) return 'Not planned: a made shot fills exactly one slot'; }
    else if (made === 'Share') {
      if (S(r.get('Active fulfillments')) !== 'Share') return 'Not planned: every slot a shared shot fills must be Share';
      if (S(r.get('Sharing check')) !== TEXT.sharedSame) return `Not planned: ${S(r.get('Sharing check'))}`;
    } else return 'Not planned: Made as must be Make or Share';
    return sourcesAndException(r, false);
  }
  if (wf === 'Collection') {
    if (!present(r.get('Kept guide plan'))) return 'Not planned: no kept guide plan';
    if (N(r.get('Collection guide complete')) !== 1) return "Not planned: the collection guide isn't Complete";
    if (!FIND(AJ(r.get('Guide slot definition line')), r.get('Kept guide plan'))) return `Not planned: ${TEXT.guideChanged.toLowerCase()}`;
    if (AJ(r.get('Guide slot guide ID')) !== AJ(r.get('Collection guide ID'))) return "Not planned: its guide isn't the request's collection guide";
    if (AJ(r.get('Guide slot includes')) === 'Choose') {
      if (lines.length !== N(r.get('Guide slot choose count')) || !B(r.get('Confirmation current'))) return 'Not planned: choose the products and confirm them';
    } else if (lines.length !== N(r.get('Request line count'))) return "Not planned: it must include all the request's products";
    return sourcesAndException(r, false);
  }
  if (!present(r.get('Placement')) || !present(r.get('Shot direction'))) return 'Not planned: it needs a Placement and a Shot direction';
  if (!lines.length || !B(r.get('Confirmation current'))) return 'Not planned: confirm its products';
  return sourcesAndException(r, !['Marketing', 'Campaign'].includes(wf));
}
function PLAN_CHECK_TEXT() {
  const sx = walkthrough => `IF(OR(COUNTA({Line product has image}) = 0, MIN({Line product has image}) != 1, SUM({References complete}) != 1), "Not planned: a source image is missing",
    ${walkthrough ? `IF({Exception} != "", "Not planned: Exceptions aren't used on walkthrough shots; edit Shot direction.",\n    ` : ''}IF(AND({Exception} != "", {Exception reason} = ""), "Not planned: an exception needs its reason", "Planned"))${walkthrough ? ')' : ''}`;
  return `IF(COUNTA({Brief}) != 1, "Not planned: it needs one request",
IF({Withdrawn}, "Not planned: withdrawn",
IF(SUM({Request superseded}) > 0, "Not planned: its request is superseded",
IF(ARRAYJOIN({Workflow}) = "Product pages",
  IF({Active slots filled} < 1, "Not planned: it fills no active slot",
  IF({Held slots} > 0, "Not planned: a slot it fills is edited by hand (see its Status)",
  IF({Slots not ok} > 0, "Not planned: a slot it fills isn't ok (see its Status)",
  IF({Slots guide changed} > 0, "Not planned: the shot guide changed since this was planned",
  IF(OR(FIND("¦", {Active guide-slot IDs}) > 0, FIND("¦", {Active definition lines}) > 0), "Not planned: its slots don't share one guide slot",
  IF(OR(COUNTA({Lines in shot}) != 1, FIND(ARRAYJOIN({Line IDs}), {Active slot lines}) = 0), "Not planned: Lines in shot must be the line of one of its active slots",
  IF({Made as} = "Make", IF({Active slots filled} != 1, "Not planned: a made shot fills exactly one slot", ${sx(false)}),
  IF({Made as} = "Share", IF({Active fulfillments} != "Share", "Not planned: every slot a shared shot fills must be Share", IF({Sharing check} != "${TEXT.sharedSame}", "Not planned: " & {Sharing check}, ${sx(false)})),
  "Not planned: Made as must be Make or Share")))))))),
IF(ARRAYJOIN({Workflow}) = "Collection",
  IF({Kept guide plan} = "", "Not planned: no kept guide plan",
  IF(SUM({Collection guide complete}) != 1, "Not planned: the collection guide isn't Complete",
  IF(FIND(ARRAYJOIN({Guide slot definition line}), {Kept guide plan}) = 0, "Not planned: the shot guide changed since this was planned",
  IF(ARRAYJOIN({Guide slot guide ID}) != ARRAYJOIN({Collection guide ID}), "Not planned: its guide isn't the request's collection guide",
  IF(ARRAYJOIN({Guide slot includes}) = "Choose",
    IF(OR(COUNTA({Lines in shot}) != SUM({Guide slot choose count}), NOT({Confirmation current})), "Not planned: choose the products and confirm them", ${sx(false)}),
    IF(COUNTA({Lines in shot}) != SUM({Request line count}), "Not planned: it must include all the request's products", ${sx(false)})))))),
  IF(OR({Placement} = "", {Shot direction} = ""), "Not planned: it needs a Placement and a Shot direction",
  IF(OR(COUNTA({Lines in shot}) = 0, NOT({Confirmation current})), "Not planned: confirm its products",
  IF(OR(ARRAYJOIN({Workflow}) = "Marketing", ARRAYJOIN({Workflow}) = "Campaign"), ${sx(false)}, ${sx(true)}))))))))`;
}
