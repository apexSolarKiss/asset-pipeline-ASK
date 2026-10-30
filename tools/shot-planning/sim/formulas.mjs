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
//   date, last modified time,        ISO string, or null
//   created time
//   formula                          its value: a string, or 0/1 for a truth value
// The helpers below give these Airtable's coercions: S (text, as & does, arrays joined ", "),
// AJ (ARRAYJOIN), N (a number), B (truthiness), MS (a time, in ms), FIND (1-based, 0 when absent),
// DTF (DATETIME_FORMAT(t, 'YYYY-MM-DD HH:mm:ss'), in UTC as Airtable formats without a time zone).

export const S = v => (v == null ? '' : Array.isArray(v) ? v.map(S).join(', ') : v === true ? '1' : v === false ? '0' : String(v));
export const AJ = (v, sep = '') => (v == null ? '' : Array.isArray(v) ? v.map(S).join(sep) : S(v));
export const N = v => (v == null || v === '' ? 0 : Array.isArray(v) ? v.reduce((a, x) => a + N(x), 0) : v === true ? 1 : Number(v) || 0);
export const B = v => !(v == null || v === '' || v === 0 || v === false || (Array.isArray(v) && v.length === 0));
export const MS = v => { const x = Array.isArray(v) ? v[0] : v; if (x == null || x === '') return null; const t = Date.parse(x); return Number.isNaN(t) ? null : t; };
export const FIND = (needle, hay) => { const n = S(needle), h = S(hay); if (n === '') return 0; return h.indexOf(n) + 1; };
// The live Product facts' closing clause, the product image's time; Product facts (lines) and Shared facts line end with it.
const IMAGE_AS_OF = ` & " Product image as of " & IF({Image updated}, DATETIME_FORMAT({Image updated}, 'YYYY-MM-DD HH:mm:ss'), "(no image)") & " UTC."`;
const imageAsOf = r => ` Product image as of ${r.get('Image updated') ? DTF(r.get('Image updated')) : '(no image)'} UTC.`;
// Has image: exactly one file (v3, K8). A formula reads an attachment field as its files' text,
// joined by commas, and COUNTA counts it as one value (the build copy), so one file is a field
// with no comma in it: filenames are comma-free (K8), and a filename with a comma reads 0.
const ONE_FILE = 'IF(AND({Image}, FIND(",", {Image} & "") = 0), 1, 0)';
const oneFile = r => { const files = r.get('Image') || []; return bit(files.length === 1 && !S(files[0].filename).includes(',')); };
export const DTF = v => { const t = MS(v); if (t == null) return ''; const iso = new Date(t).toISOString(); return `${iso.slice(0, 10)} ${iso.slice(11, 19)}`; };
const IF = (c, a, b) => (B(c) ? a : b);
const bit = c => (B(c) ? 1 : 0);
const present = v => B(v);

const F = (airtable, fn) => { fn.airtable = airtable.trim(); return fn; };

// The live texts of the existing formulas this unit reads or changes, with field names for field
// IDs: read from the build copy (appVaDEn7St333yYg), whose schema is the live base's; the eight that
// SCRATCH/baseline/06-field-configs.raw.json holds for the live base are byte-equal to it. An
// existing formula that isn't changed is the live text itself (don't install it). A Changed formula
// is built from its live text below, so its unchanged part is that text, character for character.
export const LIVE = {
  productFacts: `{Name} & ". Must stay true: " & {Must stay true} & " Material: " & {Material} & ". Finish: " & {Finish} & ". Product image as of " & IF({Image updated}, DATETIME_FORMAT({Image updated}, 'YYYY-MM-DD HH:mm:ss'), "(no image)") & " UTC."`,
  productPromptLine: `{Name} & ". " & {Must stay true} & " Material: " & {Material} & ". Finish: " & {Finish} & "."`,
  referenceLine: `{Name} & " (" & {Role} & ", " & {Applies to} & "): " & {What it may decide} & " Image as of " & IF({Image updated}, DATETIME_FORMAT({Image updated}, 'YYYY-MM-DD HH:mm:ss'), "(no image)") & " UTC."`,
  referencePromptLine: `{Role} & " reference: " & {What it may decide}`,
  briefStandard: `"Purpose: " & {Purpose} & "\\nDirection: " & {Direction} & "\\nWhat may vary: " & {What may vary} & "\\nProduct: " & ARRAYJOIN({Product facts}, " ") & "\\nReferences:\\n" & ARRAYJOIN({Reference lines}, "\\n")`,
  briefPrompt: `"Direction: " & {Direction} & "\\n\\nWhat may vary: " & {What may vary} & "\\n\\nThe first attached image is the product image. It is the authority for the product: " & ARRAYJOIN({Product prompt}, " ") & " Do not redesign, substitute, embellish or alter the product.\\n\\nThe remaining attached images are references, in this order. Use each one only for its role. None of them may change the product.\\n" & ARRAYJOIN({Reference prompts}, "\\n")`,
  shotTitle: `{Name}`,
  currentStandard: `ARRAYJOIN({Brief standard}, "") & "\\nShot: " & {Name} & ", for " & {Placement} & ". " & {Shot direction}`,
  currentPrompt: `"Generate one single commercial photograph. Not a grid, collage, contact sheet or multi-image layout.\\n\\nShot: " & {Name} & ", for " & {Placement} & ". " & {Shot direction} & "\\n\\n" & ARRAYJOIN({Brief prompt}, "")`,
  canGenerate: `IF(AND({Placement} != "", {Shot direction} != "", COUNTA({Product image}) > 0, COUNTA({Reference images}) > 0), 1, 0)`,
  decision: `IF(FIND("Current standard", {Acceptance coverage}),
  "Accepted for " & {Placement} &
    IF(LEN({Acceptance coverage}) - LEN(SUBSTITUTE({Acceptance coverage}, "Current standard", "")) > 16,
      " · " & (LEN({Acceptance coverage}) - LEN(SUBSTITUTE({Acceptance coverage}, "Current standard", ""))) / 16 & " images", ""),
  IF(FIND("Earlier standard", {Acceptance coverage}), "Accepted under an earlier standard", "No accepted image yet"))`,
  candidateTitle: `ARRAYJOIN({Shot name}, "") & IF({Number in shot}, " // candidate " & {Number in shot}, IF({Test}, " // test record " & {Record no.}, " // new candidate"))`,
  candidateHasImage: `IF({Image}, 1, 0)`,
  standardCheck: `IF({Standard used}="", "", IF(ARRAYJOIN({Current standard}, "")={Standard used}, "Same standard as when this image was made", "The standard has changed since this image was made"))`,
  ready: `IF(AND(COUNTA({Shot}) > 0, {Standard used}, {Prompt used}, {Intended use}, {Product image used}, {Reference images used}), "Ready to generate", "Preparing…")`,
  status: `IF({Has image} = 1, "Image ready", IF({Generate requested}, "Image requested // contact ASK if it appears stuck", IF({Generate when ready}, IF(LEFT({Input check}, 13) = "Would request", "Dry run // the image would have been requested", IF(OR(LEFT({Input check}, 8) = "Missing:", LEFT({Input check}, 19) = "Not a usable image:", LEFT({Input check}, 14) = "Not requested:", LEFT({Input check}, 14) = "Still copying:", {Standard check} = "The standard has changed since this image was made"), "Needs attention // contact ASK before trying again", "Preparing inputs // this request will continue automatically; contact ASK if it appears stuck")), IF({Standard used} = "", "Preparing inputs", IF({Ready} = "Ready to generate", "Not requested // contact ASK to generate this candidate", "Can't generate: its inputs are incomplete")))))`,
  recordComplete: `IF(AND({Image}, COUNTA({Candidate record no.}) > 0, {Approved for}, {Standard}, {Accepted by ID}), "Complete", "Incomplete")`,
  coverage: `IF(OR({Test}, {Record complete} != "Complete", {Candidate is test}), "", IF(ARRAYJOIN({Shot standard now}, "") = {Standard}, "Current standard", "Earlier standard"))`,
  acceptedCurrentTitle: `ARRAYJOIN({Candidate title now}, "")`,
};
// One substitution in a live text, which must occur exactly once.
const swap = (text, from, to) => { if (text.split(from).length !== 2) throw new Error(`formulas: "${from}" must occur once`); return text.replace(from, () => to); };

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
  otherRequest: "Not planned: it may include only its request's products",
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
const NEW_WORKFLOW = 'OR(ARRAYJOIN({Workflow}) = "Product pages", ARRAYJOIN({Workflow}) = "Collection", ARRAYJOIN({Workflow}) = "Marketing", ARRAYJOIN({Workflow}) = "Campaign")';
// v3 §5.1's products paragraph in the prompt.
const PRODUCTS_PARAGRAPH = 'The first attached images are the products, one each, in this order. Each is the authority for its product. Do not redesign, substitute, embellish or alter any product.';
// The candidates' held texts (§7.6).
export const HELD = {
  notPlanned: "Held: the shot isn't planned now. See its Plan check.",
  standard: 'Held: the standard changed since this candidate was kept.',
  continues: ' If it is planned again with the same standard, a pending request continues automatically; contact ASK to cancel it.',
};
const Q = x => `"${x.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`; // an Airtable string literal
const STATUS = {
  waivedPending: ', and a change waits for its decision record',
  pair: "Another record has this slot's key: see the slot pair check",
  shotPair: 'More than one live shot fills this slot: see the shot pair check',
  pendingTail: ': press Record decision to record it, or undo it',
  detach: 'Fulfillment changed after its shot was made: press Replan on this slot to detach it, or set it back and record it',
  replan: 'The shot guide changed: replan',
  currentByHand: "Edited by hand: an application's Current was changed by hand; undo it, or resolve the slot with a use decision with Replace",
  notShared: "Not shared: the products' facts differ (see the Shot planning note)",
  waiting: 'Waiting for Make shots',
  needsImage: 'Needs an image: a use decision for an accepted image that shows this product',
};
// A kept record is one line: a line break in a value it carries is written ⏎ (KEPT_BREAK), so a
// record's boundary is never an authored line break. The values that compose a prompt or a standard
// keep their line breaks, and a value read back from a kept record turns ⏎ back into one.
export const KEPT_BREAK = '⏎';
const oneLine = v => S(v).split('\n').join(KEPT_BREAK);
const fromOneLine = v => S(v).split(KEPT_BREAK).join('\n');
const firstLine = (text, prefix) => { const m = new RegExp(`${prefix}[^\\n]*`).exec(S(text)); return m ? m[0] : ''; };
const FILL_TO_FULFILLMENT = { 'Made for each product': 'Make', [SHARE_RULE]: 'Share', 'An accepted image that shows the product': 'An accepted image' };

const lineOf = (text, label) => { const m = new RegExp(`(?:^|\\n)${label}: ([^\\n]*)`).exec(S(text)); return m ? m[1] : ''; };

// The texts installed in the live base before the rendition and continuity change (2026-10-30): the
// README's texts until then. Each formula that change touches is built from its installed text by one
// addition (swap), so the rest of it is that text, character for character (RND-text, CNT-text).
export const INSTALLED = {
  currentStandard: `IF(${NEW_WORKFLOW},
ARRAYJOIN({Request standard}, "") & "\\nProducts, in image order:\\n" & IF({Active slots filled} > 1, ARRAYJOIN({Line shared facts}, "\\n"), ARRAYJOIN({Line facts}, "\\n")) & "\\nShot: " & {Name} & ", for " & {Effective placement} & ". " & {Effective direction} & IF({Lineage}, "\\n" & {Lineage}, "") & IF(AND({Exception}, {Exception reason}), "\\nException reason: " & {Exception reason} & ". Set by: " & {Exception set by} & ".", ""),
${LIVE.currentStandard})`,
  currentPrompt: `IF(${NEW_WORKFLOW},
"Generate one single commercial photograph. Not a grid, collage, contact sheet or multi-image layout.\\n\\nShot: " & {Name} & ", for " & {Prompt placement} & ". " & {Effective direction} & "\\n\\n" & ARRAYJOIN({Request prompt}, "") & "\\n\\n${PRODUCTS_PARAGRAPH}\\n" & IF({Active slots filled} > 1, ARRAYJOIN({Line shared prompt lines}, "\\n"), ARRAYJOIN({Line prompt lines}, "\\n")) & "\\n\\n" & ARRAYJOIN({Reference prompt}, ""),
${LIVE.currentPrompt})`,
  eligibility: `IF(SUM({Slot active}) = 0, IF(SUM({Slot waived}) > 0, "Needs review: the slot is marked not needed", IF(SUM({Slot in adopted plan}) = 0, "Needs review: the slot is no longer in the adopted plan", "Needs review: the slot is withdrawn")),
IF(ARRAYJOIN({Slot kept destination}) != {Kept destination}, "Needs review: the slot was replanned since this image was applied",
IF(AND({Kept receiving basis} != ARRAYJOIN({Slot receiving basis}), {Kept receiving basis} != ARRAYJOIN({Slot receiving basis without size})), "Needs review: the product's facts changed since this image was applied",
IF(ARRAYJOIN({Source complete}) != "Complete", "Needs review: its source record isn't complete",
IF(AND({Basis} = "Use decision", COUNTA({Use decision}) = 0), "Needs review: its decision record is missing",
IF(SUM({Slot held}) > 0, "Needs review: the slot is edited by hand",
IF(AND({Basis} = "Use decision", SUM({Decision record intact}) = 0), "Needs review: its decision's record was edited by hand",
"Holds")))))))`,
  settledSourceImage: 'IF({State} = "In use", ARRAYJOIN({Source image}), "")',
  decisionContent: `"Fulfillment: " & {Fulfillment} & "\\nFulfillment reason: " & {Fulfillment reason} & "\\nNot needed: " & IF({Not needed}, "yes", "no") & "\\nNot needed reason: " & {Not needed reason} & ${decisionFieldsText}`,
  changePending: `IF(IF({Decided content} != "", {Decision content} != {Decided content}, OR({Fulfillment} != {Fill rule fulfillment}, {Not needed})), "${TEXT.changePending}", "")`,
  planCheck: PLAN_CHECK_TEXT(),
  // Read from the live base (Candidates › Acceptance), field names for field IDs.
  acceptance: 'IF(COUNTA({Accepted images}) = 0, "Not accepted", IF(AND(ARRAYJOIN({Accepted record status}, "") != "", SUBSTITUTE(ARRAYJOIN({Accepted record status}, ""), "Complete", "") = ""), "Accepted for " & {Intended use}, "Recording acceptance…"))',
};
// The continuity reference's fixed limit, in the standard and in the prompt.
export const CONTINUITY = {
  notStandard: 'It does not decide the products, which products appear, or whether a person appears.',
  notPrompt: 'It is not an authority for any product, for which products appear, or for whether a person appears: the product images and the shot above decide those.',
  // Continuity check's texts (v2): a configured reference that isn't complete stops the shot's planning.
  notNewWorkflow: 'Incomplete: a continuity reference is used only on a product-page, collection, marketing or campaign shot',
  count: 'Incomplete: link exactly one candidate as the continuity reference',
  image: 'Incomplete: the continuity reference needs exactly one image, with no comma in its name',
  role: 'Incomplete: enter what the continuity reference may decide',
  ready: 'Ready',
  notPlanned: 'Not planned: the continuity reference is incomplete: ',
};
// Rendition state's texts, and the eligibility that a needed, unapproved rendition gives (v2). Approved
// is the one approval S8 recorded: its ID, the copy of the file it approved, and its record, which
// name this application's slot and accepted image.
export const RENDITION = {
  none: 'Needs a rendition: attach it with its operation and decision record, then press Approve rendition',
  notApproved: 'Not approved: check the rendition, then press Approve rendition',
  hand: 'Edited by hand: the approved rendition or its record no longer matches its approval; check the rendition, then press Approve rendition',
  approved: 'Approved',
  pending: 'Approved; a change waits: the rendition, its operation or its decision record changed in or after the second of its approval. The approved file is still delivered; press Approve rendition to approve the change',
  needed: 'Needs review: it needs an approved rendition',
};
// The approval ID S8 writes: R8-<slot ID>-<accepted image ID>-<time>; the approved copy's filename begins with it and "__".
export const approvalPrefix = (slotId, sourceId) => `R8-${slotId}-${sourceId}-`;

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
    'Definition line': F(`SUBSTITUTE("⟦" & {Guide ID} & " | " & {Guide-slot ID} & " | " & {Name} & " | " & {Position} & " | " & {Placement label} & " | " & {Required} & " | " & {Fill rule} & " | " & {Includes} & " | " & {Choose count} & " | " & IF({Retired}, "retired", "active") & " | " & {View} & "⟧", "\\n", "${KEPT_BREAK}")`,
      r => oneLine(`⟦${[r.get('Guide ID'), r.get('Guide-slot ID'), r.get('Name'), r.get('Position'), r.get('Placement label'), r.get('Required'), r.get('Fill rule'), r.get('Includes'), r.get('Choose count'), B(r.get('Retired')) ? 'retired' : 'active', r.get('View')].map(S).join(' | ')}⟧`)),
    'Is active': F('IF({Retired}, 0, 1)', r => bit(!B(r.get('Retired')))),
    'Is incomplete': F('IF(AND(NOT({Retired}), OR({Placement label} = "", {View} = "")), 1, 0)',
      r => bit(!B(r.get('Retired')) && (!present(r.get('Placement label')) || !present(r.get('View'))))),
    'Incomplete name': F('IF({Is incomplete}, {Name}, "")', r => IF(r.get('Is incomplete'), S(r.get('Name')), '')),
  },

  'Products': {
    'Product ID': F('RECORD_ID()', r => r.id),
    // The existing Product facts and Prompt line, the live texts; this unit doesn't edit them (§7.8).
    'Product facts': F(LIVE.productFacts,
      r => `${S(r.get('Name'))}. Must stay true: ${S(r.get('Must stay true'))} Material: ${S(r.get('Material'))}. Finish: ${S(r.get('Finish'))}. Product image as of ${B(r.get('Image updated')) ? DTF(r.get('Image updated')) : '(no image)'} UTC.`),
    'Prompt line': F(LIVE.productPromptLine, r => `${S(r.get('Name'))}. ${S(r.get('Must stay true'))} Material: ${S(r.get('Material'))}. Finish: ${S(r.get('Finish'))}.`),
    'Product share key': F('{Style} & " / " & {Color}', r => `${S(r.get('Style'))} / ${S(r.get('Color'))}`),
    // Today's Product facts without what differs between sizes of one style and color: the name, the
    // image's time (each product record has its own) and the size, which is kept apart in Size (§3).
    'Facts without size': F('"Must stay true: " & {Must stay true} & " Material: " & {Material} & ". Finish: " & {Finish} & "."',
      r => `Must stay true: ${S(r.get('Must stay true'))} Material: ${S(r.get('Material'))}. Finish: ${S(r.get('Finish'))}.`),
    // A kept record's part (Slots kept, Products kept): one line, whatever Must stay true holds.
    'Share signature': F(`SUBSTITUTE({Product share key} & " | " & {Facts without size}, "\\n", "${KEPT_BREAK}")`, r => oneLine(`${S(r.get('Product share key'))} | ${S(r.get('Facts without size'))}`)),
    // The standard's product lines end with the product image's time, as the live Product facts does,
    // so replacing the image a shot attaches changes its standard (v3 §5.1: "each line's product facts").
    'Product facts (lines)': F(`{Product share key} & ": " & {Facts without size} & IF({Size}, " Size: " & {Size} & ".", "")${IMAGE_AS_OF}`,
      r => `${S(r.get('Product share key'))}: ${S(r.get('Facts without size'))}${IF(r.get('Size'), ` Size: ${S(r.get('Size'))}.`, '')}${imageAsOf(r)}`),
    'Shared facts line': F(`{Product share key} & ": " & {Facts without size}${IMAGE_AS_OF}`, r => `${S(r.get('Product share key'))}: ${S(r.get('Facts without size'))}${imageAsOf(r)}`),
    // Today's Prompt line (name, Must stay true, material, finish), with the size (v3 §5.1).
    'Prompt line (lines)': F('{Name} & ". " & {Must stay true} & " Material: " & {Material} & ". Finish: " & {Finish} & "." & IF({Size}, " Size: " & {Size} & ".", "")',
      r => `${S(r.get('Name'))}. ${S(r.get('Must stay true'))} Material: ${S(r.get('Material'))}. Finish: ${S(r.get('Finish'))}.${IF(r.get('Size'), ` Size: ${S(r.get('Size'))}.`, '')}`),
    // Style and color with no product name and no size (§7.1), then the facts every size shares.
    'Shared prompt line': F('{Style} & ", " & {Color} & ". " & {Facts without size}', r => `${S(r.get('Style'))}, ${S(r.get('Color'))}. ${S(r.get('Facts without size'))}`),
    'Has image': F(ONE_FILE, oneFile),
    'Decision content': F(`"Shot guide: " & ARRAYJOIN({Shot guide ID}, ", ") & "\\nAssignment basis: " & {Assignment basis} & ${decisionFieldsText}`,
      r => `Shot guide: ${AJ(r.get('Shot guide ID'), ', ')}\nAssignment basis: ${S(r.get('Assignment basis'))}${decisionFields(r)}`),
    'Record check': detector(['Decided content', 'Recorded guide', 'Recorded guide ID'], 'Record changed at', 'Decision recorded at'),
    'Record intact': F('IF({Record check} = "", 1, 0)', r => bit(!present(r.get('Record check')))),
    'Assignment check': F(`IF({Decided content} = "", "Assignment not recorded", IF({Decision content} = {Decided content}, "Recorded", "Recorded; a change waits for its decision record"))`,
      r => (!present(r.get('Decided content')) ? 'Assignment not recorded' : S(r.get('Decision content')) === S(r.get('Decided content')) ? 'Recorded' : 'Recorded; a change waits for its decision record')),
    'Assigned guide ID': F('{Recorded guide ID}', r => S(r.get('Recorded guide ID'))),
  },

  'References': {
    // The existing Reference line and Prompt line, the live texts; not edited.
    'Reference line': F(LIVE.referenceLine,
      r => `${S(r.get('Name'))} (${S(r.get('Role'))}, ${S(r.get('Applies to'))}): ${S(r.get('What it may decide'))} Image as of ${B(r.get('Image updated')) ? DTF(r.get('Image updated')) : '(no image)'} UTC.`),
    'Prompt line': F(LIVE.referencePromptLine, r => `${S(r.get('Role'))} reference: ${S(r.get('What it may decide'))}`),
    'Has image': F(ONE_FILE, oneFile),
  },

  'Briefs': {
    'Request ID': F('RECORD_ID()', r => r.id),
    'References complete': F('IF(AND(COUNTA({References}) > 0, MIN({Reference has image}) = 1), 1, 0)',
      r => { const h = r.get('Reference has image') || []; return bit(h.length > 0 && h.every(x => N(x) === 1)); }),
    // The existing Brief standard and Brief prompt, the live texts; not edited (§7.8).
    'Brief standard': F(LIVE.briefStandard,
      r => `Purpose: ${S(r.get('Purpose'))}\nDirection: ${S(r.get('Direction'))}\nWhat may vary: ${S(r.get('What may vary'))}\nProduct: ${AJ(r.get('Product facts'), ' ')}\nReferences:\n${AJ(r.get('Reference lines'), '\n')}`),
    'Brief prompt': F(LIVE.briefPrompt,
      r => `Direction: ${S(r.get('Direction'))}\n\nWhat may vary: ${S(r.get('What may vary'))}\n\nThe first attached image is the product image. It is the authority for the product: ${AJ(r.get('Product prompt'), ' ')} Do not redesign, substitute, embellish or alter the product.\n\nThe remaining attached images are references, in this order. Use each one only for its role. None of them may change the product.\n${AJ(r.get('Reference prompts'), '\n')}`),
    // v3 §4: purpose, direction, what may vary, the message to carry when there is one, the workflow,
    // and each reference's line, in the live Brief standard's wording. The products come from the
    // shot's lines (§7.1), not from the request.
    'Request standard': F('"Purpose: " & {Purpose} & "\\nDirection: " & {Direction} & "\\nWhat may vary: " & {What may vary} & IF({Message to carry}, "\\nMessage to carry: " & {Message to carry}, "") & "\\nWorkflow: " & {Workflow} & "\\nReferences:\\n" & ARRAYJOIN({Reference lines}, "\\n")',
      r => `Purpose: ${S(r.get('Purpose'))}\nDirection: ${S(r.get('Direction'))}\nWhat may vary: ${S(r.get('What may vary'))}${IF(r.get('Message to carry'), `\nMessage to carry: ${S(r.get('Message to carry'))}`, '')}\nWorkflow: ${S(r.get('Workflow'))}\nReferences:\n${AJ(r.get('Reference lines'), '\n')}`),
    // v3 §4: direction, what may vary, and the message to carry when there is one, as the live Brief prompt words them.
    'Request prompt': F('"Direction: " & {Direction} & "\\n\\nWhat may vary: " & {What may vary} & IF({Message to carry}, "\\n\\nMessage to carry: " & {Message to carry}, "")',
      r => `Direction: ${S(r.get('Direction'))}\n\nWhat may vary: ${S(r.get('What may vary'))}${IF(r.get('Message to carry'), `\n\nMessage to carry: ${S(r.get('Message to carry'))}`, '')}`),
    // v3 §4: the references paragraph, worded as the live Brief prompt words it.
    'Reference prompt': F('"The remaining attached images are references, in this order. Use each one only for its role. None of them may change the product.\\n" & ARRAYJOIN({Reference prompts}, "\\n")',
      r => `The remaining attached images are references, in this order. Use each one only for its role. None of them may change the product.\n${AJ(r.get('Reference prompts'), '\n')}`),
  },

  'Product lines': {
    'Name': F('ARRAYJOIN({Request name}) & " · " & ARRAYJOIN({Product name})', r => `${AJ(r.get('Request name'))} · ${AJ(r.get('Product name'))}`),
    'Line ID': F('RECORD_ID()', r => r.id),
    'Product basis line': F(`SUBSTITUTE(ARRAYJOIN({Product ID}) & " | " & ARRAYJOIN({Product share key}) & " | " & ARRAYJOIN({Facts without size}) & " | " & ARRAYJOIN({Size}), "\\n", "${KEPT_BREAK}")`,
      r => oneLine([r.get('Product ID'), r.get('Product share key'), r.get('Facts without size'), r.get('Size')].map(v => AJ(v)).join(' | '))),
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
IF(OR({Duplicate of count} != 1, ARRAYJOIN({Duplicate key}) != {Slot key}, SUM({Duplicate withdrawn}) > 0), "Withdrawal not valid: name the record it duplicates",
IF(OR({Held}, SUM({Duplicate held}) > 0), "Withdrawal not valid: a record is edited by hand; record it again first",
IF(AND({Carries decision}, OR({Pending use decisions} > 0, SUM({Duplicate has decision}) = 0, IS_BEFORE(ARRAYJOIN({Duplicate decided at}), {Decided content changed at}))), "Withdrawal not valid: this record carries a decision; record it on the other first",
"Valid"))))`,
    r => {
      if (!B(r.get('Withdrawn'))) return '';
      if (N(r.get('Duplicate of count')) !== 1 || AJ(r.get('Duplicate key')) !== S(r.get('Slot key')) || N(r.get('Duplicate withdrawn')) > 0) return 'Withdrawal not valid: name the record it duplicates';
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
    // Rendition required is part of the draft (2026-10-30, v2): its line appears only while it is ticked, so no
    // other slot's content changes, and it operates only once S7 records it (Rendition requirement).
    'Decision content': F(swap(INSTALLED.decisionContent, ` & ${decisionFieldsText}`, ` & IF({Rendition required}, "\\nRendition required: yes", "") & ${decisionFieldsText}`),
      r => `Fulfillment: ${S(r.get('Fulfillment'))}\nFulfillment reason: ${S(r.get('Fulfillment reason'))}\nNot needed: ${B(r.get('Not needed')) ? 'yes' : 'no'}\nNot needed reason: ${S(r.get('Not needed reason'))}${B(r.get('Rendition required')) ? '\nRendition required: yes' : ''}${decisionFields(r)}`),
    'Change pending': F(swap(INSTALLED.changePending, '{Not needed})', '{Not needed}, {Rendition required})'),
      r => (present(r.get('Decided content'))
        ? S(r.get('Decision content')) !== S(r.get('Decided content'))
        : S(r.get('Fulfillment')) !== S(r.get('Fill rule fulfillment')) || B(r.get('Not needed')) || B(r.get('Rendition required'))) ? TEXT.changePending : ''),
    // The operative requirement: what S7 recorded, never the box. Unticking the box is a change that waits.
    'Rendition requirement': F('IF(AND({Decided content} != "", FIND("\\nRendition required: yes\\nDecided by: ", {Decided content}) > 0), 1, 0)',
      r => bit(present(r.get('Decided content')) && FIND('\nRendition required: yes\nDecided by: ', r.get('Decided content')) > 0)),
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
    // §11: the Product pages page groups by this, descending, so inactive slots sit in a last group.
    'Page group': F('IF({Active} = 1, "On the page", "Not in use")', r => (N(r.get('Active')) === 1 ? 'On the page' : 'Not in use')),
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
      // As the text does it: the suffix goes at every line break of the joined lines, so each Product basis line is one line (KEPT_BREAK).
      r => { if (!(r.get('Lines in shot') || []).length) return ''; const suf = N(r.get('Active slots filled')) > 1 ? ' | size omitted' : ' | size shown'; return AJ(r.get('Line product basis'), '\n').split('\n').join(`${suf}\n`) + suf; }),
    'Effective placement': F(`IF(ARRAYJOIN({Workflow}) = "Product pages", IF({Active slot products} = "", "", {Active slot products} & " " & IF({Active slots filled} > 1, SUBSTITUTE({Active placement labels}, "product page", "product pages"), {Active placement labels})),
IF(ARRAYJOIN({Workflow}) = "Collection", SUBSTITUTE(REGEX_REPLACE(REGEX_EXTRACT({Kept guide plan}, "(?:^|\\n)Placement: [^\\n]*"), "^\\n?Placement: ", ""), "${KEPT_BREAK}", "\\n"), {Placement}))`,
    r => { const wf = AJ(r.get('Workflow'));
      if (wf === 'Product pages') { const p = S(r.get('Active slot products')); if (!p) return ''; const lab = S(r.get('Active placement labels')); return `${p} ${N(r.get('Active slots filled')) > 1 ? lab.split('product page').join('product pages') : lab}`; }
      if (wf === 'Collection') return fromOneLine(lineOf(r.get('Kept guide plan'), 'Placement'));
      return S(r.get('Placement')); }),
    'Prompt placement': F('IF(ARRAYJOIN({Workflow}) = "Product pages", {Active placement labels}, {Effective placement})',
      r => (AJ(r.get('Workflow')) === 'Product pages' ? S(r.get('Active placement labels')) : S(r.get('Effective placement')))),
    'Effective direction': F(`IF(ARRAYJOIN({Workflow}) = "Product pages", {Active views} & IF({Active slots filled} > 1, "${TEXT.moreSizes}", ""),
IF(ARRAYJOIN({Workflow}) = "Collection", SUBSTITUTE(REGEX_REPLACE(REGEX_EXTRACT({Kept guide plan}, "(?:^|\\n)View: [^\\n]*"), "^\\n?View: ", ""), "${KEPT_BREAK}", "\\n"), {Shot direction}))
& IF(AND(ARRAYJOIN({Workflow}) != "Walkthrough", ARRAYJOIN({Workflow}) != "", {Exception}, {Exception reason}), " Exception: " & {Exception}, "")`,
    r => { const wf = AJ(r.get('Workflow'));
      const base = wf === 'Product pages' ? S(r.get('Active views')) + (N(r.get('Active slots filled')) > 1 ? TEXT.moreSizes : '')
        : wf === 'Collection' ? fromOneLine(lineOf(r.get('Kept guide plan'), 'View')) : S(r.get('Shot direction'));
      return base + (wf && wf !== 'Walkthrough' && B(r.get('Exception')) && B(r.get('Exception reason')) ? ` Exception: ${S(r.get('Exception'))}` : ''); }),
    'Lineage': F(`IF(ARRAYJOIN({Workflow}) = "Product pages", {Active lineage}, IF(ARRAYJOIN({Workflow}) = "Collection", SUBSTITUTE(REGEX_REPLACE(REGEX_EXTRACT({Kept guide plan}, "(?:^|\\n)Lineage: [^\\n]*"), "^\\n?Lineage: ", ""), "${KEPT_BREAK}", "\\n"), ""))`,
      r => { const wf = AJ(r.get('Workflow')); return wf === 'Product pages' ? S(r.get('Active lineage')) : wf === 'Collection' ? fromOneLine(lineOf(r.get('Kept guide plan'), 'Lineage')) : ''; }),
    'Confirmation current': F('IF(AND({Products confirmed}, OR({Lines changed at} = BLANK(), NOT(IS_BEFORE({Confirmed at}, {Lines changed at})))), 1, 0)',
      r => { const c = MS(r.get('Confirmed at')), l = MS(r.get('Lines changed at')); return bit(B(r.get('Products confirmed')) && (l == null || (c != null && c >= l))); }),
    // v2 (2026-10-30): a configured continuity reference that isn't complete stops planning, so Snapshot,
    // G2a's trigger and Accept, which all require a planned shot, stop with it; one not configured stops nothing.
    'Plan check': F(`IF(LEFT({Continuity check}, 10) = "Incomplete", "${CONTINUITY.notPlanned}" & SUBSTITUTE({Continuity check}, "Incomplete: ", ""),
${INSTALLED.planCheck})`,
      r => (S(r.get('Continuity check')).startsWith('Incomplete') ? CONTINUITY.notPlanned + S(r.get('Continuity check')).split('Incomplete: ').join('') : planCheck(r))),
    'Planned': F('IF({Plan check} = "Planned", 1, 0)', r => bit(S(r.get('Plan check')) === 'Planned')),
    'Shot-guide check': F(`IF(ARRAYJOIN({Workflow}) = "Product pages", IF({Slots guide changed} = 0, "${TEXT.guideSame}", "${TEXT.guideChanged}"),
IF(ARRAYJOIN({Workflow}) = "Collection", IF(AND(FIND(ARRAYJOIN({Guide slot definition line}), {Kept guide plan}) > 0, SUM({Collection guide complete}) = 1), "${TEXT.guideSame}", "${TEXT.guideChanged}"), ""))`,
    r => { const wf = AJ(r.get('Workflow'));
      if (wf === 'Product pages') return N(r.get('Slots guide changed')) === 0 ? TEXT.guideSame : TEXT.guideChanged;
      if (wf === 'Collection') return FIND(AJ(r.get('Guide slot definition line')), r.get('Kept guide plan')) > 0 && N(r.get('Collection guide complete')) === 1 ? TEXT.guideSame : TEXT.guideChanged;
      return ''; }),
    // Workflow branch (§7.1): the four new workflows take v3 §5.1's composition with v6's changes; any
    // other Workflow, an empty one included, keeps today's text character for character (LIVE).
    'Current standard': F(swap(INSTALLED.currentStandard, 'Set by: " & {Exception set by} & ".", ""),', 'Set by: " & {Exception set by} & ".", "") & IF({Continuity ready}, "\\n" & {Continuity line}, ""),'),
    r => (isNewWorkflow(r)
      ? `${AJ(r.get('Request standard'))}\nProducts, in image order:\n${AJ(N(r.get('Active slots filled')) > 1 ? r.get('Line shared facts') : r.get('Line facts'), '\n')}\nShot: ${S(r.get('Name'))}, for ${S(r.get('Effective placement'))}. ${S(r.get('Effective direction'))}${IF(r.get('Lineage'), `\n${S(r.get('Lineage'))}`, '')}${B(r.get('Exception')) && B(r.get('Exception reason')) ? `\nException reason: ${S(r.get('Exception reason'))}. Set by: ${S(r.get('Exception set by'))}.` : ''}${B(r.get('Continuity ready')) ? `\n${S(r.get('Continuity line'))}` : ''}`
      : `${AJ(r.get('Brief standard'))}\nShot: ${S(r.get('Name'))}, for ${S(r.get('Placement'))}. ${S(r.get('Shot direction'))}`)),
    // v3 §5.1's order: the opening, the shot, the request prompt, the products, the references.
    'Current prompt': F(swap(INSTALLED.currentPrompt, 'ARRAYJOIN({Reference prompt}, ""),', 'ARRAYJOIN({Reference prompt}, "") & IF({Continuity ready}, "\\n\\n" & {Continuity prompt}, ""),'),
    r => (isNewWorkflow(r)
      ? `Generate one single commercial photograph. Not a grid, collage, contact sheet or multi-image layout.\n\nShot: ${S(r.get('Name'))}, for ${S(r.get('Prompt placement'))}. ${S(r.get('Effective direction'))}\n\n${AJ(r.get('Request prompt'))}\n\n${PRODUCTS_PARAGRAPH}\n${AJ(N(r.get('Active slots filled')) > 1 ? r.get('Line shared prompt lines') : r.get('Line prompt lines'), '\n')}\n\n${AJ(r.get('Reference prompt'))}${B(r.get('Continuity ready')) ? `\n\n${S(r.get('Continuity prompt'))}` : ''}`
      : `Generate one single commercial photograph. Not a grid, collage, contact sheet or multi-image layout.\n\nShot: ${S(r.get('Name'))}, for ${S(r.get('Placement'))}. ${S(r.get('Shot direction'))}\n\n${AJ(r.get('Brief prompt'))}`)),
    // The live Decision with {Placement} replaced by {Effective placement} (§6), which is Placement on a walkthrough shot.
    'Decision': F(swap(LIVE.decision, '"Accepted for " & {Placement}', '"Accepted for " & {Effective placement}'),
      r => { const cov = S(r.get('Acceptance coverage')), n = cov.split('Current standard').length - 1;
        if (n > 0) return `Accepted for ${S(r.get('Effective placement'))}${n > 1 ? ` · ${n} images` : ''}`;
        return FIND('Earlier standard', cov) ? 'Accepted under an earlier standard' : 'No accepted image yet'; }),
    // v6 §6 gives this text; it replaces the live LIVE.canGenerate, whose Placement and Shot direction
    // conditions Planned covers for a walkthrough shot (§7.2).
    'Can generate': F('IF(AND({Planned} = 1, COUNTA({Product image}) > 0, COUNTA({Reference images}) > 0), 1, 0)',
      r => bit(N(r.get('Planned')) === 1 && (r.get('Product image') || []).length > 0 && (r.get('Reference images') || []).length > 0)),
    // Existing, not edited: the live text.
    'Title': F(LIVE.shotTitle, r => S(r.get('Name'))),
    // The continuity reference (2026-10-30, v2): optional. Not configured (no link, nothing it may decide):
    // empty, and nothing changes. Configured: Ready only on a new-workflow shot with exactly one linked
    // candidate whose Image is exactly one comma-free file, and what it may decide stated; otherwise
    // Incomplete, which stops the shot's planning (Plan check). Only a Ready reference reaches the
    // standard, the prompt and the candidates' Continuity image now.
    'Continuity check': F(`IF(AND({Continuity count} = 0, TRIM({Continuity may decide}) = ""), "",
IF(NOT(${NEW_WORKFLOW}), "${CONTINUITY.notNewWorkflow}",
IF({Continuity count} != 1, "${CONTINUITY.count}",
IF(SUM({Continuity has image}) != 1, "${CONTINUITY.image}",
IF(TRIM({Continuity may decide}) = "", "${CONTINUITY.role}",
"${CONTINUITY.ready}")))))`,
      r => {
        const n = N(r.get('Continuity count')), may = present(S(r.get('Continuity may decide')).trim());
        if (n === 0 && !may) return '';
        if (!isNewWorkflow(r)) return CONTINUITY.notNewWorkflow;
        if (n !== 1) return CONTINUITY.count;
        if (N(r.get('Continuity has image')) !== 1) return CONTINUITY.image;
        if (!may) return CONTINUITY.role;
        return CONTINUITY.ready;
      }),
    'Continuity ready': F(`IF({Continuity check} = "${CONTINUITY.ready}", 1, 0)`, r => bit(S(r.get('Continuity check')) === CONTINUITY.ready)),
    'Continuity line': F(`IF({Continuity ready}, "Continuity reference: No. " & ARRAYJOIN({Continuity record no.}) & ", " & ARRAYJOIN({Continuity title}) & ", image as of " & ARRAYJOIN({Continuity image as of}) & ". May decide: " & {Continuity may decide} & " ${CONTINUITY.notStandard} Set by: " & {Continuity set by} & ".", "")`,
      r => IF(r.get('Continuity ready'), `Continuity reference: No. ${AJ(r.get('Continuity record no.'))}, ${AJ(r.get('Continuity title'))}, image as of ${AJ(r.get('Continuity image as of'))}. May decide: ${S(r.get('Continuity may decide'))} ${CONTINUITY.notStandard} Set by: ${S(r.get('Continuity set by'))}.`, '')),
    'Continuity prompt': F(`IF({Continuity ready}, "The last attached image is a continuity reference, from an earlier image. Use it only for: " & {Continuity may decide} & " ${CONTINUITY.notPrompt}", "")`,
      r => IF(r.get('Continuity ready'), `The last attached image is a continuity reference, from an earlier image. Use it only for: ${S(r.get('Continuity may decide'))} ${CONTINUITY.notPrompt}`, '')),
  },

  'Candidates': {
    // The existing Title, Has image and Standard check: the live texts; not edited (§7.8).
    'Title': F(LIVE.candidateTitle,
      r => `${AJ(r.get('Shot name'))}${B(r.get('Number in shot')) ? ` // candidate ${S(r.get('Number in shot'))}` : B(r.get('Test')) ? ` // test record ${S(r.get('Record no.'))}` : ' // new candidate'}`),
    'Has image': F(LIVE.candidateHasImage, r => bit(B(r.get('Image')))),
    'Shot planned': F('IF(AND({Shot count} = 1, {Shot planned values} = 1), 1, 0)', r => bit(N(r.get('Shot count')) === 1 && N(r.get('Shot planned values')) === 1)),
    'Standard check': F(LIVE.standardCheck, r => standardCheck(r)),
    // The two held labels (§7.6) apply only to a candidate that has never had an image; otherwise,
    // and when neither holds, Ready is the live text. The standard label needs a kept standard: the
    // live Standard check is empty until Snapshot writes Standard used.
    'Ready': F(`IF(AND({Has image} = 0, {Generated at} = BLANK()), IF({Shot planned} != 1, ${Q(HELD.notPlanned)}, IF(AND({Standard check} != "", LEFT({Standard check}, 4) != "Same"), ${Q(HELD.standard)}, ${LIVE.ready})), ${LIVE.ready})`,
      r => {
        if (N(r.get('Has image')) === 0 && r.get('Generated at') == null) {
          if (N(r.get('Shot planned')) !== 1) return HELD.notPlanned;
          const sc = S(r.get('Standard check'));
          if (sc !== '' && sc.slice(0, 4) !== 'Same') return HELD.standard;
        }
        return liveReady(r); }),
    // The held branch, placed directly after the live first branch (§7.6); the rest is the live text.
    'Status': F(swap(LIVE.status, '"Image ready", ', `"Image ready", IF(LEFT({Ready}, 5) = "Held:", "Held // the shot changed." & IF({Generate when ready}, ${Q(HELD.continues)}, ""), `) + ')',
      r => {
        if (N(r.get('Has image')) === 1) return 'Image ready';
        if (S(r.get('Ready')).slice(0, 5) === 'Held:') return `Held // the shot changed.${B(r.get('Generate when ready')) ? HELD.continues : ''}`;
        return liveStatusAfterImage(r); }),
    'Is accepted': F('IF(COUNTA({Accepted images}) > 0, 1, 0)', r => bit((r.get('Accepted images') || []).length > 0)),
    'Accepted slots kept': F('IF({Is accepted}, {Slots kept}, "")', r => IF(r.get('Is accepted'), S(r.get('Slots kept')), '')),
    // Exactly one comma-free file, as Has image on Products and References (K8): what a continuity reference needs (v2).
    'One image': F(ONE_FILE, oneFile),
    // The live Acceptance, with the acceptance's condition shown after its use (v2): an image accepted
    // only through its approved rendition says so wherever its acceptance shows.
    'Acceptance': F(swap(INSTALLED.acceptance, '"Accepted for " & {Intended use}', '"Accepted for " & {Intended use} & IF(ARRAYJOIN({Accepted on condition}, "") != "", ", on condition: " & ARRAYJOIN({Accepted on condition}, ""), "")'),
      r => {
        if (!(r.get('Accepted images') || []).length) return 'Not accepted';
        const st = AJ(r.get('Accepted record status'));
        if (st === '' || st.split('Complete').join('') !== '') return 'Recording acceptance…';
        const cond = AJ(r.get('Accepted on condition'));
        return `Accepted for ${S(r.get('Intended use'))}${cond !== '' ? `, on condition: ${cond}` : ''}`;
      }),
  },

  'Accepted images': {
    // The existing Record complete, Coverage and Current title: the live texts; not edited (§7.8).
    'Record complete': F(LIVE.recordComplete,
      r => (B(r.get('Image')) && (r.get('Candidate record no.') || []).length > 0 && B(r.get('Approved for')) && B(r.get('Standard')) && B(r.get('Accepted by ID')) ? 'Complete' : 'Incomplete')),
    'Coverage': F(LIVE.coverage,
      r => (B(r.get('Test')) || S(r.get('Record complete')) !== 'Complete' || B(r.get('Candidate is test')) ? '' : AJ(r.get('Shot standard now')) === S(r.get('Standard')) ? 'Current standard' : 'Earlier standard')),
    'Current title': F(LIVE.acceptedCurrentTitle, r => AJ(r.get('Candidate title now'))),
    'Accepted ID': F('RECORD_ID()', r => r.id),
    // The comparison Coverage makes, not blanked for Test (§6).
    'Source current': F('IF(ARRAYJOIN({Shot standard now}, "") = {Standard}, 1, 0)', r => bit(AJ(r.get('Shot standard now')) === S(r.get('Standard')))),
  },

  'Applications': {
    'Name': F('ARRAYJOIN({Slot name}) & " ← " & ARRAYJOIN({Source title})', r => `${AJ(r.get('Slot name'))} ← ${AJ(r.get('Source title'))}`),
    'Application ID': F('RECORD_ID()', r => r.id),
    'Current check': detector(['Current'], 'Current changed at', 'Current set at'),
    'Eligibility': F(swap(INSTALLED.eligibility, '\n"Holds")))))))', `\nIF(AND({Rendition needed}, LEFT({Rendition state}, 8) != "${RENDITION.approved}"), "${RENDITION.needed}",\n"Holds"))))))))`),
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
      if (B(r.get('Rendition needed')) && !S(r.get('Rendition state')).startsWith(RENDITION.approved)) return RENDITION.needed;
      return 'Holds';
    }),
    'Basis finished': F('IF({Basis} = "Use decision", IF(SUM({Decision applied}), 1, 0), IF(SUM({Source applications done}), 1, 0))',
      r => bit(S(r.get('Basis')) === 'Use decision' ? N(r.get('Decision applied')) > 0 : N(r.get('Source applications done')) > 0)),
    'State': F(`IF({Withdrawn}, "Withdrawn duplicate",
IF({Current check}, "${HAND}",
IF(AND(NOT({Current}), COUNTA({Replaced by})), "Replaced by " & ARRAYJOIN({Replaced by name}),
IF(NOT({Current}), "Alternate",
IF(AND({Basis} = "Use decision", COUNTA({Use decision}) = 0), {Eligibility},
IF(NOT({Basis finished}), IF({Basis} = "Use decision", "Unfinished: press Apply this decision again", "Unfinished: press Retry applications on the accepted image"),
IF(FIND({Application ID}, ARRAYJOIN({Slot in-use replaces})), "Replacement unfinished: press Apply this decision again on the replacing decision",
IF(SUM({Slot in use count}) - 1 - SUM({Replaces in use}) > 0, "Conflict",
IF({Eligibility} != "Holds", {Eligibility}, "In use")))))))))`,
    r => {
      if (B(r.get('Withdrawn'))) return 'Withdrawn duplicate';
      if (present(r.get('Current check'))) return HAND;
      if (!B(r.get('Current'))) return (r.get('Replaced by') || []).length ? `Replaced by ${AJ(r.get('Replaced by name'))}` : 'Alternate';
      // A use decision's record missing: no press can finish it, so its eligibility, which names that, is the State.
      if (S(r.get('Basis')) === 'Use decision' && !(r.get('Use decision') || []).length) return S(r.get('Eligibility'));
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
    // A replacement whose use decision is missing can't be finished, so its application replaces nothing
    // here: the application it was replacing reads Conflict, which a use decision with Replace resolves.
    'In use replaces': F('IF(AND({In use flag}, OR({Basis} != "Use decision", COUNTA({Use decision}) > 0)), ARRAYJOIN({Replaces IDs}, ","), "")',
      r => IF(B(r.get('In use flag')) && (S(r.get('Basis')) !== 'Use decision' || (r.get('Use decision') || []).length > 0), AJ(r.get('Replaces IDs'), ','), '')),
    'In use title': F('IF({In use flag}, ARRAYJOIN({Source title}), "")', r => IF(r.get('In use flag'), AJ(r.get('Source title')), '')),
    'In use label': F('IF({In use flag}, {Kept label}, "")', r => IF(r.get('In use flag'), S(r.get('Kept label')), '')),
    'In use eligibility': F('IF({In use flag}, {Eligibility}, "")', r => IF(r.get('In use flag'), S(r.get('Eligibility')), '')),
    'Alternate title': F('IF(AND(NOT({Current}), NOT({Withdrawn}), COUNTA({Replaced by}) = 0), ARRAYJOIN({Source title}), "")',
      r => IF(!B(r.get('Current')) && !B(r.get('Withdrawn')) && !(r.get('Replaced by') || []).length, AJ(r.get('Source title')), '')),
    // A rendition is needed where the slot's recorded decision requires one or the accepted image was
    // accepted on condition (2026-10-30, v2). Then the application delivers its approved rendition,
    // never the accepted image itself.
    'Rendition needed': F('IF(OR(SUM({Slot rendition requirement}) > 0, ARRAYJOIN({Source condition}, "") != ""), 1, 0)',
      r => bit(N(r.get('Slot rendition requirement')) > 0 || AJ(r.get('Source condition')) !== '')),
    'Settled source image': F(swap(INSTALLED.settledSourceImage, '{State} = "In use"', 'AND({State} = "In use", {Rendition needed} = 0)'),
      r => IF(S(r.get('State')) === 'In use' && N(r.get('Rendition needed')) === 0, (r.get('Source image') || []).map(a => (a && a.filename) || S(a)).join(', '), '')),
    // Rendition state (v2): Approved only while S8's approval stands as S8 wrote it: its ID names this
    // application's slot and accepted image, the approved copy's file name begins with that ID (one file:
    // no comma), and its record begins with it. Anything else written there is Edited by hand. A change
    // to the draft (the file, its operation or its decision record) in the second of the approval or
    // later waits for S8 and changes nothing delivered: S8 writes a whole second, and the test is "not
    // before" it, so the race is seen whether Airtable keeps its times to the millisecond or to the
    // second. An attachment field is read as text, as the live Has image texts read Image.
    'Rendition state': F(`IF({Rendition needed} = 0, "",
IF(AND({Rendition approval ID} = "", COUNTA({Approved rendition}) = 0, {Rendition approved} = "", {Rendition approved at} = BLANK()), IF(COUNTA({Rendition}) = 0, "${RENDITION.none}", "${RENDITION.notApproved}"),
IF(OR({Rendition approval ID} = "", {Rendition approved} = "", {Rendition approved at} = BLANK(),
LEFT({Rendition approval ID}, LEN("R8-" & ARRAYJOIN({Slot ID}) & "-" & ARRAYJOIN({Source ID}) & "-")) != "R8-" & ARRAYJOIN({Slot ID}) & "-" & ARRAYJOIN({Source ID}) & "-",
LEFT({Approved rendition} & "", LEN({Rendition approval ID}) + 2) != {Rendition approval ID} & "__",
FIND(",", {Approved rendition} & "") > 0,
LEFT({Rendition approved}, LEN({Rendition approval ID})) != {Rendition approval ID}), "${RENDITION.hand}",
IF(AND({Rendition draft changed at} != BLANK(), NOT(IS_BEFORE({Rendition draft changed at}, {Rendition approved at}))), "${RENDITION.pending}",
"${RENDITION.approved}"))))`,
    r => {
      if (N(r.get('Rendition needed')) === 0) return '';
      const id = S(r.get('Rendition approval ID')), copy = r.get('Approved rendition') || [], record = S(r.get('Rendition approved')), at = MS(r.get('Rendition approved at'));
      if (id === '' && !copy.length && record === '' && at == null) return (r.get('Rendition') || []).length ? RENDITION.notApproved : RENDITION.none;
      const asText = copy.map(a => (a && a.filename) || S(a)).join(', ');
      if (id === '' || record === '' || at == null || !id.startsWith(approvalPrefix(AJ(r.get('Slot ID')), AJ(r.get('Source ID'))))
        || !asText.startsWith(`${id}__`) || asText.includes(',') || !record.startsWith(id)) return RENDITION.hand;
      const ch = MS(r.get('Rendition draft changed at'));
      return ch != null && ch >= at ? RENDITION.pending : RENDITION.approved;
    }),
    'Settled rendition': F(`IF(AND({State} = "In use", {Rendition needed}, LEFT({Rendition state}, 8) = "${RENDITION.approved}"), {Approved rendition} & "", "")`,
      r => IF(S(r.get('State')) === 'In use' && B(r.get('Rendition needed')) && S(r.get('Rendition state')).startsWith(RENDITION.approved), (r.get('Approved rendition') || []).map(a => (a && a.filename) || S(a)).join(', '), '')),
  },

  'Use decisions': {
    'Name': F('ARRAYJOIN({Source title}) & " → " & {Slot count} & " slots"', r => `${AJ(r.get('Source title'))} → ${N(r.get('Slot count'))} slots`),
    'Decision ID': F('RECORD_ID()', r => r.id),
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

// Candidates: the live Standard check, Ready and Status (after its first branch), as JavaScript.
function standardCheck(r) {
  if (!present(r.get('Standard used'))) return '';
  return AJ(r.get('Current standard')) === S(r.get('Standard used')) ? 'Same standard as when this image was made' : 'The standard has changed since this image was made';
}
function liveReady(r) {
  return (r.get('Shot') || []).length > 0 && ['Standard used', 'Prompt used', 'Intended use', 'Product image used', 'Reference images used'].every(f => B(r.get(f)))
    ? 'Ready to generate' : 'Preparing…';
}
function liveStatusAfterImage(r) {
  if (B(r.get('Generate requested'))) return 'Image requested // contact ASK if it appears stuck';
  if (B(r.get('Generate when ready'))) {
    const ic = S(r.get('Input check'));
    if (ic.slice(0, 13) === 'Would request') return 'Dry run // the image would have been requested';
    if (['Missing:', 'Not a usable image:', 'Not requested:', 'Still copying:'].some(p => ic.slice(0, p.length) === p) || S(r.get('Standard check')) === 'The standard has changed since this image was made')
      return 'Needs attention // contact ASK before trying again';
    return 'Preparing inputs // this request will continue automatically; contact ASK if it appears stuck';
  }
  if (!present(r.get('Standard used'))) return 'Preparing inputs';
  return S(r.get('Ready')) === 'Ready to generate' ? 'Not requested // contact ASK to generate this candidate' : "Can't generate: its inputs are incomplete";
}

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
  if (N(r.get('Live shot count')) > 1) return STATUS.shotPair;
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
IF({Live shot count} > 1, ${Q(STATUS.shotPair)},
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
${Q(STATUS.needsImage)})))))))))))))))))))))`;
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
  if (N(r.get('Brief count')) !== 1) return 'Not planned: it needs one request';
  if (B(r.get('Withdrawn'))) return 'Not planned: withdrawn';
  if (N(r.get('Request superseded')) > 0) return 'Not planned: its request is superseded';
  const wf = AJ(r.get('Workflow')), lines = N(r.get('Lines in shot count'));
  const otherRequest = lines > 0 && S(r.get('Line request IDs')) !== AJ(r.get('Request ID'));
  if (wf === 'Product pages') {
    if (N(r.get('Active slots filled')) < 1) return 'Not planned: it fills no active slot';
    if (N(r.get('Held slots')) > 0) return 'Not planned: a slot it fills is edited by hand (see its Status)';
    if (N(r.get('Slots not ok')) > 0) return "Not planned: a slot it fills isn't ok (see its Status)";
    if (N(r.get('Slots guide changed')) > 0) return `Not planned: ${TEXT.guideChanged.toLowerCase()}`;
    if (S(r.get('Active guide-slot IDs')).includes('¦') || S(r.get('Active definition lines')).includes('¦')) return "Not planned: its slots don't share one guide slot";
    if (lines !== 1 || !FIND(AJ(r.get('Line IDs')), r.get('Active slot lines'))) return 'Not planned: Lines in shot must be the line of one of its active slots';
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
    if (otherRequest) return TEXT.otherRequest;
    if (AJ(r.get('Guide slot includes')) === 'Choose') {
      if (lines !== N(r.get('Guide slot choose count')) || !B(r.get('Confirmation current'))) return 'Not planned: choose the products and confirm them';
    } else if (lines !== N(r.get('Request line count'))) return "Not planned: it must include all the request's products";
    return sourcesAndException(r, false);
  }
  if (!present(r.get('Placement')) || !present(r.get('Shot direction'))) return 'Not planned: it needs a Placement and a Shot direction';
  if (otherRequest) return TEXT.otherRequest;
  if (lines === 0 || !B(r.get('Confirmation current'))) return 'Not planned: confirm its products';
  return sourcesAndException(r, !['Marketing', 'Campaign'].includes(wf));
}
function PLAN_CHECK_TEXT() {
  // v3 §5.2, "Membership belongs to the request" (T7, as v3): every line is one of the request's.
  const membership = `IF(AND({Lines in shot count} > 0, {Line request IDs} != ARRAYJOIN({Request ID})), "${TEXT.otherRequest}",`;
  const sx = walkthrough => `IF(OR(COUNTA({Line product has image}) = 0, MIN({Line product has image}) != 1, SUM({References complete}) != 1), "Not planned: a source image is missing",
    ${walkthrough ? `IF({Exception} != "", "Not planned: Exceptions aren't used on walkthrough shots; edit Shot direction.",\n    ` : ''}IF(AND({Exception} != "", {Exception reason} = ""), "Not planned: an exception needs its reason", "Planned"))${walkthrough ? ')' : ''}`;
  return `IF({Brief count} != 1, "Not planned: it needs one request",
IF({Withdrawn}, "Not planned: withdrawn",
IF(SUM({Request superseded}) > 0, "Not planned: its request is superseded",
IF(ARRAYJOIN({Workflow}) = "Product pages",
  IF({Active slots filled} < 1, "Not planned: it fills no active slot",
  IF({Held slots} > 0, "Not planned: a slot it fills is edited by hand (see its Status)",
  IF({Slots not ok} > 0, "Not planned: a slot it fills isn't ok (see its Status)",
  IF({Slots guide changed} > 0, "Not planned: the shot guide changed since this was planned",
  IF(OR(FIND("¦", {Active guide-slot IDs}) > 0, FIND("¦", {Active definition lines}) > 0), "Not planned: its slots don't share one guide slot",
  IF(OR({Lines in shot count} != 1, FIND(ARRAYJOIN({Line IDs}), {Active slot lines}) = 0), "Not planned: Lines in shot must be the line of one of its active slots",
  IF({Made as} = "Make", IF({Active slots filled} != 1, "Not planned: a made shot fills exactly one slot", ${sx(false)}),
  IF({Made as} = "Share", IF({Active fulfillments} != "Share", "Not planned: every slot a shared shot fills must be Share", IF({Sharing check} != "${TEXT.sharedSame}", "Not planned: " & {Sharing check}, ${sx(false)})),
  "Not planned: Made as must be Make or Share")))))))),
IF(ARRAYJOIN({Workflow}) = "Collection",
  IF({Kept guide plan} = "", "Not planned: no kept guide plan",
  IF(SUM({Collection guide complete}) != 1, "Not planned: the collection guide isn't Complete",
  IF(FIND(ARRAYJOIN({Guide slot definition line}), {Kept guide plan}) = 0, "Not planned: the shot guide changed since this was planned",
  IF(ARRAYJOIN({Guide slot guide ID}) != ARRAYJOIN({Collection guide ID}), "Not planned: its guide isn't the request's collection guide",
  ${membership}
  IF(ARRAYJOIN({Guide slot includes}) = "Choose",
    IF(OR({Lines in shot count} != SUM({Guide slot choose count}), NOT({Confirmation current})), "Not planned: choose the products and confirm them", ${sx(false)}),
    IF({Lines in shot count} != SUM({Request line count}), "Not planned: it must include all the request's products", ${sx(false)}))))))),
  IF(OR({Placement} = "", {Shot direction} = ""), "Not planned: it needs a Placement and a Shot direction",
  ${membership}
  IF(OR({Lines in shot count} = 0, NOT({Confirmation current})), "Not planned: confirm its products",
  IF(OR(ARRAYJOIN({Workflow}) = "Marketing", ARRAYJOIN({Workflow}) = "Campaign"), ${sx(false)}, ${sx(true)})))))))))`;
}
