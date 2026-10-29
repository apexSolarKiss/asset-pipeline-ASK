// The demo schema for the simulated base: every table and field proposal v6 §6 defines, with
// the existing tables' fields the new formulas read. Each field is [name, kind, options]:
//
//   stored kinds   text (singleLineText), long (multilineText), number, checkbox, select
//                  (singleSelect, options.choices), link (multipleRecordLinks, options.table and
//                  options.inverse: the inverse field's name in the linked table, which the schema
//                  adds there; a self link has one too, as Airtable creates it), attachments
//                  (multipleAttachments), date (dateTime), autonumber
//   computed kinds formula (its function and Airtable text are in formulas.mjs, under the same
//                  table and field name), lookup (options.link, options.field), rollup
//                  (options.link, options.field, options.agg, optional options.where), count
//                  (options.link, optional options.where), modified (lastModifiedTime,
//                  options.watch: the field names it watches), created (createdTime: the
//                  record's creation time)
//
// The existing tables' fields carry the live base's exact names, types and configurations, as
// the build copy's schema read gives them (README, Schema). An existing formula's text is the
// live text (formulas.mjs).
//
// Computed fields are never stored: sim/world.mjs computes them on read. A rollup's agg names
// an aggregation in AGG below, which carries the Airtable aggregation formula it mirrors; a
// where clause names a field of the linked record that must be truthy (Airtable's rollup
// condition "only include linked records where <field> is not empty / is 1").
//
// Field IDs are generated from the table's abbreviation and the field's place, so a test can
// bind an installation by ID as well as by name (see idConfig in tests/fixtures.mjs).
//
// BINDINGS holds each script's default input config, by field name.

const SHARE_RULE = 'Shared across sizes of one style and color';
export const FILL_RULES = ['Made for each product', SHARE_RULE, 'An accepted image that shows the product'];
export const FULFILLMENTS = ['Make', 'Share', 'An accepted image'];

// Rollup aggregations: [Airtable aggregation formula, JS function over the values].
// Values arrive flattened, in link order, with empty values kept, as Airtable passes them.
const blank = v => v == null || v === '' || v === false;
export const AGG = {
  JOIN_NL: ['ARRAYJOIN(values, "\\n")', v => v.map(x => (x == null ? '' : String(x))).join('\n')],
  JOIN_NL_COMPACT: ['ARRAYJOIN(ARRAYCOMPACT(values), "\\n")', v => v.filter(x => !blank(x)).map(String).join('\n')],
  JOIN_BAR_COMPACT: ['ARRAYJOIN(ARRAYCOMPACT(values), "¦")', v => v.filter(x => !blank(x)).map(String).join('¦')],
  JOIN_COMMA_COMPACT: ['ARRAYJOIN(ARRAYCOMPACT(values), ", ")', v => v.filter(x => !blank(x)).map(String).join(', ')],
  JOIN_BAR: ['ARRAYJOIN(values, "|")', v => v.map(x => (x == null ? '' : String(x))).join('|')],
  OR: ['OR(values)', v => (v.some(x => !blank(x) && x !== 0) ? 1 : 0)],
  UNIQUE_BAR: ['ARRAYJOIN(ARRAYUNIQUE(ARRAYCOMPACT(ARRAYFLATTEN(values))), "¦")', v => [...new Set(v.filter(x => !blank(x)).map(String))].join('¦')],
  UNIQUE_NL: ['ARRAYJOIN(ARRAYUNIQUE(ARRAYCOMPACT(ARRAYFLATTEN(values))), "\\n")', v => [...new Set(v.filter(x => !blank(x)).map(String))].join('\n')],
  SUM: ['SUM(values)', v => v.reduce((a, x) => a + (typeof x === 'number' ? x : x === true ? 1 : 0), 0)],
  MIN: ['MIN(values)', v => { const n = v.filter(x => typeof x === 'number'); return n.length ? Math.min(...n) : 0; }],
};

const T = (name, abbr, fields) => ({ name, abbr, fields });
const sel = choices => ({ choices });
const link = (table, inverse) => ({ table, inverse });
const lk = (lnk, field, where) => ({ link: lnk, field, where });
const ru = (lnk, field, agg, where) => ({ link: lnk, field, agg, where });

const DECISION_RECORD = [['Decided by', 'text'], ['Decision source', 'text'], ['Entered by', 'text']];

const TABLES = [
  T('Shot guides', 'SG', [
    ['Name', 'text'],
    ['Destination', 'select', sel(['Product page', 'Collection'])],
    ['Guide ID', 'formula'],
    ['Guide slots', 'link', link('Guide slots', 'Guide')], // every slot, retired ones included
    ['Products', 'link', link('Products', 'Shot guide')],
    ['Products (recorded)', 'link', link('Products', 'Recorded guide')],
    ['Requests', 'link', link('Briefs', 'Shot guide (collection)')],
    ['Test', 'checkbox'],
    ['Slot definitions', 'rollup', ru('Guide slots', 'Definition line', 'JOIN_NL')],
    ['Definition', 'formula'],
    ['Adopted definition', 'long'],
    ['Adopted version', 'number'],
    ['Adopted at', 'date'],
    ['Adoption log', 'long'],
    ...DECISION_RECORD,
    ['Decision content', 'formula'],
    ['Decided content', 'long'],
    ['Adoption note', 'long'],
    ['Adoption result', 'long'],
    ['Adopted definition changed at', 'modified', { watch: ['Adopted definition', 'Adopted version', 'Decided content'] }],
    ['Adopted definition check', 'formula'],
    ['Active slots', 'rollup', ru('Guide slots', 'Is active', 'SUM')],
    ['Slots incomplete', 'rollup', ru('Guide slots', 'Is incomplete', 'SUM')],
    ['Incomplete slot names', 'rollup', ru('Guide slots', 'Incomplete name', 'JOIN_COMMA_COMPACT')],
    ['Complete', 'formula'],
    ['Status', 'formula'],
    ['Guide check', 'formula'],
  ]),
  T('Guide slots', 'GS', [
    ['Name', 'text'],
    ['Guide', 'link', link('Shot guides', 'Guide slots')],
    ['Position', 'number'],
    ['Placement label', 'text'],
    ['View', 'long'],
    ['Required', 'select', sel(['Always', 'As needed'])],
    ['Fill rule', 'select', sel(FILL_RULES)],
    ['Includes', 'select', sel(['All products in the request', 'Choose'])],
    ['Choose count', 'number'],
    ['Retired', 'checkbox'],
    ['Test', 'checkbox'],
    ['Guide ID (from Guide)', 'lookup', lk('Guide', 'Guide ID')],
    ['Guide ID', 'formula'],
    ['Guide-slot ID', 'formula'],
    ['Definition line', 'formula'],
    ['Is active', 'formula'],
    ['Is incomplete', 'formula'],
    ['Incomplete name', 'formula'],
  ]),
  T('Products', 'PR', [
    ['Name', 'text'],
    ['Image', 'attachments'],
    ['Test', 'checkbox'],
    ['Style', 'text'],
    ['Color', 'text'],
    ['Size', 'text'],
    ['Must stay true', 'long'], // existing: the facts text
    ['Material', 'text'],       // existing
    ['Finish', 'text'],         // existing
    ['Image updated', 'modified', { watch: ['Image'] }], // existing
    ['Product ID', 'formula'],
    ['Product facts', 'formula'], // existing, not edited: the live text
    ['Prompt line', 'formula'],   // existing, not edited: the live text
    ['Product share key', 'formula'],
    ['Facts without size', 'formula'],
    ['Share signature', 'formula'],
    ['Product facts (lines)', 'formula'],
    ['Shared facts line', 'formula'],
    ['Prompt line (lines)', 'formula'],
    ['Shared prompt line', 'formula'],
    ['Has image', 'formula'],
    ['Shot guide', 'link', link('Shot guides', 'Products')], // "assigned by merchandising": the draft
    ['Assignment basis', 'long'],
    ...DECISION_RECORD,
    ['Shot guide ID', 'lookup', lk('Shot guide', 'Guide ID')],
    ['Decision content', 'formula'],
    ['Decided content', 'long'],
    ['Decision recorded at', 'date'],
    ['Recorded guide', 'link', link('Shot guides', 'Products (recorded)')],
    ['Recorded guide ID', 'text'],
    ['Record result', 'long'],
    ['Record changed at', 'modified', { watch: ['Decided content', 'Recorded guide', 'Recorded guide ID'] }],
    ['Record check', 'formula'],
    ['Record intact', 'formula'],
    ['Assignment check', 'formula'],
    ['Assigned guide ID', 'formula'],
    ['Recorded guide adopted definition', 'lookup', lk('Recorded guide', 'Adopted definition')],
    ['Recorded guide check', 'lookup', lk('Recorded guide', 'Adopted definition check')],
    ['Recorded guide complete', 'lookup', lk('Recorded guide', 'Complete')],
    ['Recorded guide status', 'lookup', lk('Recorded guide', 'Status')],
    ['Recorded guide name', 'lookup', lk('Recorded guide', 'Name')],
  ]),
  T('References', 'RF', [
    ['Name', 'text'],
    ['Role', 'select', sel(['Light', 'Palette', 'Material', 'Restraint', 'Atmosphere'])], // existing
    ['Applies to', 'select', sel(['Whole brand', 'This brief'])],                          // existing
    ['What it may decide', 'long'],                                                        // existing
    ['Image', 'attachments'],
    ['Test', 'checkbox'],
    ['Image updated', 'modified', { watch: ['Image'] }], // existing
    ['Reference line', 'formula'], // existing, not edited: the live text
    ['Prompt line', 'formula'],    // existing, not edited: the live text
    ['Has image', 'formula'],
  ]),
  T('Briefs', 'BR', [
    ['Name', 'text'],
    ['Workflow', 'select', sel(['Product pages', 'Collection', 'Marketing', 'Campaign', 'Walkthrough'])],
    ['Purpose', 'long'],        // existing
    ['Direction', 'long'],      // existing
    ['What may vary', 'long'],  // existing
    ['Products', 'link', link('Products', 'Briefs')], // existing link, unchanged
    ['References', 'link', link('References', 'Briefs')],
    ['Shot guide (collection)', 'link', link('Shot guides', 'Requests')],
    ['Message to carry', 'long'],
    ['Slot planning note', 'long'],
    ['Shot planning note', 'long'],
    ['Supersedes', 'link', link('Briefs', 'Superseded by')],
    ['Test', 'checkbox'],
    ['Request ID', 'formula'],
    ['Guide ID', 'lookup', lk('Shot guide (collection)', 'Guide ID')],
    ['Guide complete', 'lookup', lk('Shot guide (collection)', 'Complete')],
    ['Superseded', 'count', { link: 'Superseded by' }],
    ['Line count', 'count', { link: 'Product lines' }],
    ['Reference has image', 'lookup', lk('References', 'Has image')],
    ['References complete', 'formula'],
    ['Product facts', 'lookup', lk('Products', 'Product facts')],        // existing
    ['Reference lines', 'lookup', lk('References', 'Reference line')],   // existing
    ['Product prompt', 'lookup', lk('Products', 'Prompt line')],         // existing
    ['Reference prompts', 'lookup', lk('References', 'Prompt line')],    // existing
    ['Reference images', 'lookup', lk('References', 'Image')],
    ['Brief standard', 'formula'], // existing, not edited: the live text
    ['Brief prompt', 'formula'],   // existing, not edited: the live text
    ['Request standard', 'formula'],
    ['Request prompt', 'formula'],
    ['Reference prompt', 'formula'],
  ]),
  T('Product lines', 'PL', [
    ['Name', 'formula'], // the primary: created by connector as Single line text, converted to this formula in the UI (README, Install)
    ['Request', 'link', link('Briefs', 'Product lines')],
    ['Product', 'link', link('Products', 'Product lines')],
    ['Test', 'checkbox'],
    ['Line ID', 'formula'],
    ['Request ID', 'lookup', lk('Request', 'Request ID')],
    ['Request name', 'lookup', lk('Request', 'Name')],
    ['Request workflow', 'lookup', lk('Request', 'Workflow')],
    ['Request superseded', 'lookup', lk('Request', 'Superseded')],
    ['Product ID', 'lookup', lk('Product', 'Product ID')],
    ['Product name', 'lookup', lk('Product', 'Name')],
    ['Assigned guide ID', 'lookup', lk('Product', 'Assigned guide ID')],
    ['Product share key', 'lookup', lk('Product', 'Product share key')],
    ['Share signature', 'lookup', lk('Product', 'Share signature')],
    ['Product facts (lines)', 'lookup', lk('Product', 'Product facts (lines)')],
    ['Facts without size', 'lookup', lk('Product', 'Facts without size')],
    ['Shared facts line', 'lookup', lk('Product', 'Shared facts line')],
    ['Prompt line (lines)', 'lookup', lk('Product', 'Prompt line (lines)')],
    ['Shared prompt line', 'lookup', lk('Product', 'Shared prompt line')],
    ['Size', 'lookup', lk('Product', 'Size')],
    ['Image', 'lookup', lk('Product', 'Image')],
    ['Has image', 'lookup', lk('Product', 'Has image')],
    ['Product basis line', 'formula'],
    ['Live slot keys', 'rollup', ru('Product-page slots', 'Live key', 'JOIN_BAR_COMPACT')],
  ]),
  T('Product-page slots', 'PS', [
    ['Name', 'text'],
    ['Line', 'link', link('Product lines', 'Product-page slots')],
    ['Guide slot', 'link', link('Guide slots', 'Product-page slots')],
    ['Product', 'link', link('Products', 'Product-page slots')],
    ['Request', 'link', link('Briefs', 'Product-page slots')],
    // the kept slot plan, written by S1 at creation and refreshed only by S3
    ['Kept definition line', 'long'],
    ['Kept guide ID', 'text'],
    ['Kept product ID', 'text'],
    ['Kept guide version', 'number'],
    ['Kept guide name', 'text'],
    ['Kept slot name', 'text'],
    ['Kept position', 'number'],
    ['Kept placement label', 'text'],
    ['Kept view', 'long'],
    ['Kept required', 'text'],
    ['Kept fill rule', 'text'],
    ['Plan kept', 'checkbox'],
    ['Kept plan written at', 'date'],
    // the planning decision: editable draft, and what S7 records
    ['Fulfillment', 'select', sel(FULFILLMENTS)],
    ['Fulfillment reason', 'long'],
    ['Not needed', 'checkbox'],
    ['Not needed reason', 'long'],
    ...DECISION_RECORD,
    ['Decision content', 'formula'],
    ['Decided content', 'long'],
    ['Decision recorded at', 'date'],
    ['Recorded fulfillment', 'text'],
    ['Recorded not needed', 'checkbox'],
    ['Recorded summary', 'text'],
    ['Record result', 'long'],
    ['Withdrawn', 'checkbox'],
    ['Duplicate of', 'link', link('Product-page slots', 'Duplicated by')],
    ['Shot', 'link', link('Shots', 'Slots filled')],
    ['Detach log', 'long'],
    ['Test', 'checkbox'],
    ['Slot ID', 'formula'],
    ['Line ID', 'lookup', lk('Line', 'Line ID')],
    ['Line request ID', 'lookup', lk('Line', 'Request ID')],
    ['Line product ID', 'lookup', lk('Line', 'Product ID')],
    ['Line live keys', 'lookup', lk('Line', 'Live slot keys')],
    ['Request ID', 'lookup', lk('Request', 'Request ID')],
    ['Request superseded', 'lookup', lk('Request', 'Superseded')],
    ['Request shot planning note', 'lookup', lk('Request', 'Shot planning note')],
    ['Guide-slot ID', 'lookup', lk('Guide slot', 'Guide-slot ID')],
    ['Guide slot definition line', 'lookup', lk('Guide slot', 'Definition line')],
    ['Guide slot guide ID', 'lookup', lk('Guide slot', 'Guide ID')],
    ['Guide slot required', 'lookup', lk('Guide slot', 'Required')],
    ['Guide slot fill rule', 'lookup', lk('Guide slot', 'Fill rule')],
    ['Product name', 'lookup', lk('Product', 'Name')],
    ['Assigned guide ID', 'lookup', lk('Product', 'Assigned guide ID')],
    ['Product record intact', 'lookup', lk('Product', 'Record intact')],
    ['Guide adopted definition', 'lookup', lk('Product', 'Recorded guide adopted definition')],
    ['Guide adoption check', 'lookup', lk('Product', 'Recorded guide check')],
    ['Guide complete', 'lookup', lk('Product', 'Recorded guide complete')],
    ['Share signature', 'lookup', lk('Line', 'Share signature')],
    ['Size', 'lookup', lk('Line', 'Size')],
    // The slot's shot reads skip a Withdrawn shot (v6 §7.3: a withdrawn duplicate doesn't count),
    // the same rule as S2's: a slot left linked to a withdrawn duplicate reads only its other shot.
    ['Live shot count', 'count', { link: 'Shot', where: 'Not withdrawn' }],
    ['Duplicate of count', 'count', { link: 'Duplicate of' }],
    ['Shot made as', 'lookup', lk('Shot', 'Made as', 'Not withdrawn')],
    ['Shot name', 'lookup', lk('Shot', 'Name', 'Not withdrawn')],
    ['Shot accepted count', 'lookup', lk('Shot', 'Accepted count', 'Not withdrawn')],
    ['Shot accepted slots kept', 'lookup', lk('Shot', 'Accepted slots kept', 'Not withdrawn')],
    ['Shot active slots filled', 'lookup', lk('Shot', 'Active slots filled', 'Not withdrawn')],
    ['Shot active products', 'lookup', lk('Shot', 'Active slot products', 'Not withdrawn')],
    ['Decided content changed at', 'modified', { watch: ['Decided content'] }],
    ['Record changed at', 'modified', { watch: ['Decided content', 'Recorded fulfillment', 'Recorded not needed', 'Recorded summary'] }],
    ['Kept plan changed at', 'modified', { watch: ['Kept definition line', 'Kept guide ID', 'Kept product ID', 'Kept guide version', 'Kept guide name', 'Kept slot name', 'Kept position', 'Kept placement label', 'Kept view', 'Kept required', 'Kept fill rule', 'Plan kept'] }],
    ['Slot key', 'formula'],
    ['Live key', 'formula'],
    ['Key count', 'formula'],
    ['Record check', 'formula'],
    ['Kept plan check', 'formula'],
    ['Record intact', 'formula'],
    ['Held', 'formula'],
    ['Has decision', 'formula'],
    ['Pending use decisions', 'rollup', ru('Use decisions', 'Pending fixed', 'SUM')],
    ['Carries decision', 'formula'],
    ['Duplicate key', 'lookup', lk('Duplicate of', 'Slot key')],
    ['Duplicate withdrawn', 'lookup', lk('Duplicate of', 'Withdrawn')],
    ['Duplicate held', 'lookup', lk('Duplicate of', 'Held')],
    ['Duplicate has decision', 'lookup', lk('Duplicate of', 'Has decision')],
    ['Duplicate decided at', 'lookup', lk('Duplicate of', 'Decided content changed at')],
    ['Withdrawal', 'formula'],
    ['Validly withdrawn', 'formula'],
    ['Fill rule fulfillment', 'formula'],
    ['Operative fulfillment', 'formula'],
    ['Departure', 'formula'],
    ['Change pending', 'formula'],
    ['In adopted plan', 'formula'],
    ['Stale by adoption', 'formula'],
    ['Obligation unchanged', 'formula'],
    ['Waived', 'formula'],
    ['Replan reach', 'formula'],
    ['Active', 'formula'],
    ['Matches its shot', 'formula'],
    ['Shot accepted', 'formula'],
    ['Covered', 'formula'],
    ['Slot ok', 'formula'],
    ['Shot-guide check', 'formula'],
    ['Pickup ok', 'formula'],
    ['Receiving basis', 'formula'],
    ['Receiving basis without size', 'formula'],
    ['Basis line', 'formula'],
    ['Shot basis line', 'formula'],
    ['Kept destination now', 'formula'],
    ['Lineage line', 'formula'],
    ['Active slot ID', 'formula'],
    ['Active line ID', 'formula'],
    ['Active share signature', 'formula'],
    ['Active product name', 'formula'],
    ['Active placement label', 'formula'],
    ['Active view', 'formula'],
    ['Active guide-slot ID', 'formula'],
    ['Active definition line', 'formula'],
    ['Active operative fulfillment', 'formula'],
    ['Not ok', 'formula'],
    ['Guide changed', 'formula'],
    ['In use count', 'rollup', ru('Applications', 'In use flag', 'SUM')],
    ['In-use states', 'rollup', ru('Applications', 'In use state', 'JOIN_NL_COMPACT')],
    ['In-use bases', 'rollup', ru('Applications', 'In use basis', 'JOIN_NL_COMPACT')],
    ['In-use replaces', 'rollup', ru('Applications', 'In use replaces', 'JOIN_NL_COMPACT')],
    ['In-use titles', 'rollup', ru('Applications', 'In use title', 'JOIN_NL_COMPACT')],
    ['In-use labels', 'rollup', ru('Applications', 'In use label', 'JOIN_NL_COMPACT')],
    ['In-use eligibility', 'rollup', ru('Applications', 'In use eligibility', 'JOIN_NL_COMPACT')],
    ['Alternate titles', 'rollup', ru('Applications', 'Alternate title', 'JOIN_COMMA_COMPACT')],
    ['Settled image', 'rollup', ru('Applications', 'Settled source image', 'JOIN_NL_COMPACT')],
    ['Placement state', 'formula'],
    ['Status', 'formula'],
    ['Replan result', 'long'], // S3's result on a slot (added by part 2)
    ['Product facts', 'lookup', lk('Product', 'Product facts')], // the existing facts text, for S5's legacy map (added by part 3)
  ]),
  T('Shots', 'SH', [
    ['Name', 'text'],
    ['Brief', 'link', link('Briefs', 'Shots')],
    ['Lines in shot', 'link', link('Product lines', 'Shots')],
    ['From guide slot', 'link', link('Guide slots', 'Shots')],
    ['Made as', 'select', sel(['Make', 'Share', 'Collection'])],
    ['Placement', 'text'],
    ['Shot direction', 'long'],
    ['Products confirmed', 'checkbox'],
    ['Kept guide plan', 'long'],
    ['Pair key', 'text'],
    ['Exception', 'long'],
    ['Exception reason', 'long'],
    ['Exception set by', 'text'],
    ['Exception set at', 'date'],
    ['Withdrawn', 'checkbox'],
    ['Note', 'long'],
    ['Test', 'checkbox'],
    ['Shot ID', 'formula'],
    ['Not withdrawn', 'formula'],
    ['Confirmed at', 'modified', { watch: ['Products confirmed'] }],
    ['Lines changed at', 'modified', { watch: ['Lines in shot'] }],
    // Counts of the two links: a formula's COUNTA reads a link field as one value (the build copy).
    ['Brief count', 'count', { link: 'Brief' }],
    ['Lines in shot count', 'count', { link: 'Lines in shot' }],
    ['Workflow', 'lookup', lk('Brief', 'Workflow')],
    ['Request superseded', 'lookup', lk('Brief', 'Superseded')],
    ['Request line count', 'lookup', lk('Brief', 'Line count')],
    ['Request ID', 'lookup', lk('Brief', 'Request ID')],
    ['Brief standard', 'lookup', lk('Brief', 'Brief standard')],
    ['Brief prompt', 'lookup', lk('Brief', 'Brief prompt')],
    ['Request standard', 'lookup', lk('Brief', 'Request standard')],
    ['Request prompt', 'lookup', lk('Brief', 'Request prompt')],
    ['Reference prompt', 'lookup', lk('Brief', 'Reference prompt')],
    ['References complete', 'lookup', lk('Brief', 'References complete')],
    ['Reference images', 'lookup', lk('Brief', 'Reference images')],
    ['Collection guide ID', 'lookup', lk('Brief', 'Guide ID')],
    ['Collection guide complete', 'lookup', lk('Brief', 'Guide complete')],
    ['Guide slot definition line', 'lookup', lk('From guide slot', 'Definition line')],
    ['Guide slot guide ID', 'lookup', lk('From guide slot', 'Guide ID')],
    ['Guide slot includes', 'lookup', lk('From guide slot', 'Includes')],
    ['Guide slot choose count', 'lookup', lk('From guide slot', 'Choose count')],
    ['Line IDs', 'lookup', lk('Lines in shot', 'Line ID')],
    ['Line request IDs', 'rollup', ru('Lines in shot', 'Request ID', 'UNIQUE_BAR')],
    ['Line share signature', 'lookup', lk('Lines in shot', 'Share signature')],
    ['Line facts', 'lookup', lk('Lines in shot', 'Product facts (lines)')],
    ['Line shared facts', 'lookup', lk('Lines in shot', 'Shared facts line')],
    ['Line prompt lines', 'lookup', lk('Lines in shot', 'Prompt line (lines)')],
    ['Line shared prompt lines', 'lookup', lk('Lines in shot', 'Shared prompt line')],
    ['Line product has image', 'lookup', lk('Lines in shot', 'Has image')],
    ['Line product basis', 'lookup', lk('Lines in shot', 'Product basis line')],
    ['Product image', 'lookup', lk('Lines in shot', 'Image')], // repointed through lines (§6)
    ['Active slots filled', 'rollup', ru('Slots filled', 'Active', 'SUM')],
    ['Held slots', 'rollup', ru('Slots filled', 'Held', 'SUM')],
    ['Slots not ok', 'rollup', ru('Slots filled', 'Not ok', 'SUM')],
    ['Slots guide changed', 'rollup', ru('Slots filled', 'Guide changed', 'SUM')],
    ['Active slot lines', 'rollup', ru('Slots filled', 'Active line ID', 'UNIQUE_BAR')],
    ['Share signatures', 'rollup', ru('Slots filled', 'Active share signature', 'UNIQUE_BAR')],
    ['Active slot products', 'rollup', ru('Slots filled', 'Active product name', 'JOIN_COMMA_COMPACT')],
    ['Active placement labels', 'rollup', ru('Slots filled', 'Active placement label', 'UNIQUE_BAR')],
    ['Active views', 'rollup', ru('Slots filled', 'Active view', 'UNIQUE_BAR')],
    ['Active guide-slot IDs', 'rollup', ru('Slots filled', 'Active guide-slot ID', 'UNIQUE_BAR')],
    ['Active definition lines', 'rollup', ru('Slots filled', 'Active definition line', 'UNIQUE_BAR')],
    ['Active fulfillments', 'rollup', ru('Slots filled', 'Active operative fulfillment', 'UNIQUE_BAR')],
    ['Active lineage', 'rollup', ru('Slots filled', 'Lineage line', 'UNIQUE_NL')],
    ['Slot IDs', 'rollup', ru('Slots filled', 'Active slot ID', 'JOIN_COMMA_COMPACT')],
    ['Current slot basis', 'rollup', ru('Slots filled', 'Shot basis line', 'JOIN_NL_COMPACT')],
    ['Accepted count', 'rollup', ru('Candidates', 'Is accepted', 'SUM')],
    ['Accepted slots kept', 'rollup', ru('Candidates', 'Accepted slots kept', 'JOIN_NL_COMPACT')],
    // existing: Title, the shot's display name the candidates look up; Acceptance coverage, read by Decision
    ['Title', 'formula'],
    ['Acceptance coverage', 'rollup', ru('Accepted images', 'Coverage', 'JOIN_BAR')],
    ['Sharing check', 'formula'],
    ['Current product basis', 'formula'],
    ['Effective placement', 'formula'],
    ['Prompt placement', 'formula'],
    ['Effective direction', 'formula'],
    ['Lineage', 'formula'],
    ['Confirmation current', 'formula'],
    ['Plan check', 'formula'],
    ['Planned', 'formula'],
    ['Shot-guide check', 'formula'],
    ['Current standard', 'formula'],
    ['Current prompt', 'formula'],
    ['Decision', 'formula'],
    ['Can generate', 'formula'],
    ['Replan result', 'long'], // S3's result on a shot (added by part 2)
  ]),
  T('Candidates', 'CA', [
    ['Record no.', 'autonumber'],
    ['Shot', 'link', link('Shots', 'Candidates')],
    ['Number in shot', 'number'],
    ['Test', 'checkbox'],
    ['Image', 'attachments'],
    ['Generated at', 'modified', { watch: ['Image'] }], // existing: the last-modified time of Image
    ['Generate when ready', 'checkbox'],
    ['Generate requested', 'checkbox'],        // existing: ticked by G1
    ['Standard used', 'long'],                 // existing: the kept standard, written by Snapshot
    ['Prompt used', 'long'],                   // existing: written by Snapshot
    ['Intended use', 'text'],                  // existing: written by Snapshot
    ['Product image used', 'attachments'],     // existing: written by Snapshot
    ['Reference images used', 'attachments'],  // existing: written by Snapshot
    ['Input check', 'long'],                   // existing: written by G2a
    ['Slots kept', 'long'],      // kept by Snapshot (§6)
    ['Products kept', 'long'],   // kept by Snapshot (§6)
    ['Shot name', 'lookup', lk('Shot', 'Title')],             // existing
    ['Current standard', 'lookup', lk('Shot', 'Current standard')], // existing: the shot's current standard
    ['Shot planned values', 'rollup', ru('Shot', 'Planned', 'SUM')],
    ['Shot count', 'count', { link: 'Shot' }],
    ['Shot withdrawn', 'rollup', ru('Shot', 'Withdrawn', 'OR')], // the Candidates page's filter (§11)
    ['Current slot basis', 'lookup', lk('Shot', 'Current slot basis')],
    ['Current product basis', 'lookup', lk('Shot', 'Current product basis')],
    ['Current intended use', 'lookup', lk('Shot', 'Effective placement')], // repointed (§6)
    ['Title', 'formula'],
    ['Has image', 'formula'],
    ['Shot planned', 'formula'],
    ['Standard check', 'formula'],
    ['Ready', 'formula'],
    ['Status', 'formula'],
    ['Is accepted', 'formula'],
    ['Accepted slots kept', 'formula'],
  ]),
  T('Accepted images', 'AI', [
    // existing: every field down to Current title, as Accept writes and the live base computes them
    ['Recorded as', 'text'], // the primary field: the candidate's title when it was accepted
    ['Candidate record no.', 'link', link('Candidates', 'Accepted images')],
    ['Shot', 'link', link('Shots', 'Accepted images')],
    ['Image', 'attachments'], // Accept copies the candidate's image into it
    ['Approved for', 'text'],
    ['Standard', 'long'],    // the candidate's Standard used, copied by Accept
    ['Accepted by', 'text'],
    ['Accepted by ID', 'text'],
    ['Accepted at', 'created'],
    ['Test', 'checkbox'],
    ['Record complete', 'formula'],
    ['Candidate is test', 'rollup', ru('Candidate record no.', 'Test', 'OR')],
    ['Shot standard now', 'lookup', lk('Shot', 'Current standard')],
    ['Coverage', 'formula'],
    ['Candidate title now', 'lookup', lk('Candidate record no.', 'Title')],
    ['Current title', 'formula'],
    // new
    ['Applications done', 'checkbox'],
    ['Application progress', 'long'],
    ['Accepted ID', 'formula'],
    ['Slots kept', 'lookup', lk('Candidate record no.', 'Slots kept')],
    ['Products kept', 'lookup', lk('Candidate record no.', 'Products kept')],
    ['Source current', 'formula'],
  ]),
  T('Applications', 'AP', [
    ['Name', 'formula'], // the primary: created by connector as Single line text, converted to this formula in the UI (README, Install)
    ['Accepted image', 'link', link('Accepted images', 'Applications')],
    ['Slot', 'link', link('Product-page slots', 'Applications')],
    ['Application key', 'text'],
    ['Basis', 'select', sel(['Accepted for this use', 'Use decision'])],
    ['Use decision', 'link', link('Use decisions', 'Applications')],
    ['Kept destination', 'long'],
    ['Kept receiving basis', 'long'],
    ['Kept label', 'text'],
    ['Recorded at', 'date'],
    ['Account', 'text'],
    ['Current', 'checkbox'],
    ['Current set at', 'date'],
    ['Replaces', 'link', link('Applications', 'Named in Replaces')],
    ['Replaced by', 'link', link('Applications', 'Named in Replaced by')],
    ['Replaced at', 'date'],
    ['Withdrawn', 'checkbox'],
    ['Test', 'checkbox'],
    ['Application ID', 'formula'],
    ['Current changed at', 'modified', { watch: ['Current'] }],
    ['Product', 'lookup', lk('Slot', 'Product name')],
    ['Position', 'lookup', lk('Slot', 'Kept position')],
    ['Slot name', 'lookup', lk('Slot', 'Name')],
    ['Slot active', 'lookup', lk('Slot', 'Active')],
    ['Slot held', 'lookup', lk('Slot', 'Held')],
    ['Slot waived', 'lookup', lk('Slot', 'Waived')],
    ['Slot in adopted plan', 'lookup', lk('Slot', 'In adopted plan')],
    ['Slot kept slot name', 'lookup', lk('Slot', 'Kept slot name')],
    ['Slot kept destination', 'lookup', lk('Slot', 'Kept destination now')],
    ['Slot receiving basis', 'lookup', lk('Slot', 'Receiving basis')],
    ['Slot receiving basis without size', 'lookup', lk('Slot', 'Receiving basis without size')],
    ['Slot in use count', 'lookup', lk('Slot', 'In use count')],
    ['Slot in-use replaces', 'lookup', lk('Slot', 'In-use replaces')],
    ['Slot plan changed', 'lookup', lk('Slot', 'Kept plan changed at')],
    ['Source complete', 'lookup', lk('Accepted image', 'Record complete')],
    ['Source ID', 'lookup', lk('Accepted image', 'Accepted ID')],
    ['Source title', 'lookup', lk('Accepted image', 'Current title')],
    ['Source image', 'lookup', lk('Accepted image', 'Image')],
    ['Source applications done', 'lookup', lk('Accepted image', 'Applications done')],
    ['Decision applied', 'lookup', lk('Use decision', 'Applied')],
    ['Decision record intact', 'lookup', lk('Use decision', 'Record intact')],
    ['Replaced by name', 'lookup', lk('Replaced by', 'Name')],
    ['Replaces IDs', 'lookup', lk('Replaces', 'Application ID')],
    ['Replaces in use', 'lookup', lk('Replaces', 'In use flag')],
    ['Current check', 'formula'],
    ['Eligibility', 'formula'],
    ['Basis finished', 'formula'],
    ['State', 'formula'],
    ['Delivery name', 'formula'],
    ['In use flag', 'formula'],
    ['In use state', 'formula'],
    ['In use basis', 'formula'],
    ['In use replaces', 'formula'],
    ['In use title', 'formula'],
    ['In use label', 'formula'],
    ['In use eligibility', 'formula'],
    ['Alternate title', 'formula'],
    ['Settled source image', 'formula'],
  ]),
  T('Use decisions', 'UD', [
    ['Name', 'formula'], // the primary: created by connector as Single line text, converted to this formula in the UI (README, Install)
    ['Accepted image', 'link', link('Accepted images', 'Use decisions')],
    ['Slots', 'link', link('Product-page slots', 'Use decisions')],
    ['Replace', 'checkbox'],
    ['Conditions', 'long'],
    ['Facts reviewed', 'checkbox'],
    ...DECISION_RECORD,
    ['Decided basis', 'long'],
    ['Decided at', 'date'],
    ['Decided selection', 'long'],
    ['Decision label', 'text'],
    ['Result', 'long'],
    ['Ended slots', 'long'], // written only by S5: the slots a final failure ended for this decision
    ['Applied', 'checkbox'],
    ['Test', 'checkbox'],
    ['Decision ID', 'formula'],
    ['Source ID', 'lookup', lk('Accepted image', 'Accepted ID')],
    ['Source title', 'lookup', lk('Accepted image', 'Current title')],
    ['Slot basis lines', 'rollup', ru('Slots', 'Basis line', 'JOIN_NL')],
    ['Record changed at', 'modified', { watch: ['Decided basis', 'Decided selection', 'Decided at'] }],
    ['Application count', 'count', { link: 'Applications' }],
    ['Slot count', 'count', { link: 'Slots' }],
    ['Live basis', 'formula'],
    ['Record intact', 'formula'],
    ['Basis check', 'formula'],
    ['Pending fixed', 'formula'],
    ['Progress', 'formula'],
  ]),
];

const KIND = {
  text: 'singleLineText', long: 'multilineText', number: 'number', checkbox: 'checkbox', select: 'singleSelect',
  link: 'multipleRecordLinks', attachments: 'multipleAttachments', date: 'dateTime', autonumber: 'autoNumber',
  formula: 'formula', lookup: 'multipleLookupValues', rollup: 'rollup', count: 'count', modified: 'lastModifiedTime',
  created: 'createdTime',
};
export const STORED = new Set(['text', 'long', 'number', 'checkbox', 'select', 'link', 'attachments', 'date']);

// Build the schema: tables with typed fields, inverse link fields added to their tables.
export function buildSchema() {
  const tables = TABLES.map(t => ({ id: `tbl${t.abbr}0000000000000`.slice(0, 17), name: t.name, abbr: t.abbr,
    fields: t.fields.map(([name, kind, opts = {}]) => ({ name, kind, opts })) }));
  const byName = new Map(tables.map(t => [t.name, t]));
  for (const t of tables) for (const f of [...t.fields]) {
    if (f.kind !== 'link' || f.opts.inverse == null || f.opts.inverseOf) continue;
    const target = byName.get(f.opts.table); if (!target) throw new Error(`schema: no table ${f.opts.table}`);
    const declared = target.fields.find(x => x.name === f.opts.inverse);
    if (declared) { // both sides declared: they must name each other
      if (declared.kind !== 'link' || declared.opts.table !== t.name || declared.opts.inverse !== f.name) throw new Error(`schema: ${target.name}.${f.opts.inverse} doesn't pair with ${t.name}.${f.name}`);
      declared.opts.inverseOf = true; continue;
    }
    target.fields.push({ name: f.opts.inverse, kind: 'link', opts: { table: t.name, inverse: f.name, inverseOf: true } });
  }
  for (const t of tables) t.fields.forEach((f, i) => {
    f.id = `fld${t.abbr}${String(i).padStart(3, '0')}xxxxxxxxx`.slice(0, 17);
    f.type = KIND[f.kind];
    if (!f.type) throw new Error(`schema: ${t.name}.${f.name} has unknown kind ${f.kind}`);
  });
  return { tables };
}

// Each script's default input config, by table and field name. recordId is added per press.
export const BINDINGS = {
  s1: {
    requestsTable: 'Briefs', requestWorkflowField: 'Workflow', requestSupersededField: 'Superseded',
    requestSupersedesField: 'Supersedes', requestLinesField: 'Product lines', requestNameField: 'Name',
    requestTestField: 'Test', slotPlanningNoteField: 'Slot planning note',
    linesTable: 'Product lines', lineProductField: 'Product', lineTestField: 'Test',
    productsTable: 'Products', productNameField: 'Name', assignedGuideIdField: 'Assigned guide ID',
    assignmentCheckField: 'Assignment check', productRecordIntactField: 'Record intact',
    guidesTable: 'Shot guides', guideNameField: 'Name', guideCompleteField: 'Complete', guideStatusField: 'Status',
    adoptedDefinitionField: 'Adopted definition', adoptedVersionField: 'Adopted version',
    guideSlotsTable: 'Guide slots', gsNameField: 'Name', gsGuideField: 'Guide', gsPositionField: 'Position',
    gsPlacementField: 'Placement label', gsViewField: 'View', gsRequiredField: 'Required', gsFillRuleField: 'Fill rule',
    gsRetiredField: 'Retired', gsDefinitionLineField: 'Definition line',
    slotsTable: 'Product-page slots', slotNameField: 'Name', slotLineField: 'Line', slotGuideSlotField: 'Guide slot',
    slotProductField: 'Product', slotRequestField: 'Request', keptDefinitionLineField: 'Kept definition line',
    keptGuideIdField: 'Kept guide ID', keptProductIdField: 'Kept product ID', keptGuideVersionField: 'Kept guide version',
    keptGuideNameField: 'Kept guide name', keptSlotNameField: 'Kept slot name', keptPositionField: 'Kept position',
    keptPlacementField: 'Kept placement label', keptViewField: 'Kept view', keptRequiredField: 'Kept required',
    keptFillRuleField: 'Kept fill rule', planKeptField: 'Plan kept', keptPlanWrittenAtField: 'Kept plan written at',
    fulfillmentField: 'Fulfillment', slotTestField: 'Test', slotKeyField: 'Slot key',
    withdrawnField: 'Withdrawn', validlyWithdrawnField: 'Validly withdrawn', heldField: 'Held', waivedField: 'Waived', staleField: 'Stale by adoption',
    obligationUnchangedField: 'Obligation unchanged', slotLiveShotCountField: 'Live shot count', shotAcceptedField: 'Shot accepted',
    slotStatusField: 'Status', recordedNotNeededField: 'Recorded not needed', departureField: 'Departure',
    recordedSummaryField: 'Recorded summary',
  },
  s6: {
    guidesTable: 'Shot guides', definitionField: 'Definition', adoptedDefinitionField: 'Adopted definition',
    adoptedVersionField: 'Adopted version', adoptedAtField: 'Adopted at', adoptionLogField: 'Adoption log',
    decidedByField: 'Decided by', decisionSourceField: 'Decision source', enteredByField: 'Entered by',
    decisionContentField: 'Decision content', decidedContentField: 'Decided content',
    adoptedDefinitionCheckField: 'Adopted definition check', activeSlotsField: 'Active slots',
    slotsIncompleteField: 'Slots incomplete', incompleteNamesField: 'Incomplete slot names', resultField: 'Adoption result',
  },
  s7product: {
    kind: 'product', table: 'Products', shotGuideField: 'Shot guide', assignmentBasisField: 'Assignment basis',
    decidedByField: 'Decided by', decisionSourceField: 'Decision source', enteredByField: 'Entered by',
    decisionContentField: 'Decision content', decidedContentField: 'Decided content',
    decisionRecordedAtField: 'Decision recorded at', recordedGuideField: 'Recorded guide',
    recordedGuideIdField: 'Recorded guide ID', resultField: 'Record result',
  },
  s7slot: {
    kind: 'slot', table: 'Product-page slots', fulfillmentField: 'Fulfillment', fulfillmentReasonField: 'Fulfillment reason',
    notNeededField: 'Not needed', notNeededReasonField: 'Not needed reason',
    decidedByField: 'Decided by', decisionSourceField: 'Decision source', enteredByField: 'Entered by',
    decisionContentField: 'Decision content', decidedContentField: 'Decided content',
    decisionRecordedAtField: 'Decision recorded at', recordedFulfillmentField: 'Recorded fulfillment',
    recordedNotNeededField: 'Recorded not needed', recordedSummaryField: 'Recorded summary',
    keptFillRuleField: 'Kept fill rule', keptRequiredField: 'Kept required', planKeptField: 'Plan kept',
    keptPlanCheckField: 'Kept plan check', resultField: 'Record result',
  },
  // S2 Make shots (added by part 2). Keys name their table by prefix: request, line, product,
  // guide, gs (guide slots), slot, shot.
  s2: {
    requestsTable: 'Briefs', requestWorkflowField: 'Workflow', requestSupersededField: 'Superseded',
    requestLinesField: 'Product lines', requestNameField: 'Name', requestTestField: 'Test',
    requestNoteField: 'Shot planning note', requestCollectionGuideField: 'Shot guide (collection)',
    linesTable: 'Product lines', lineProductField: 'Product', lineShareKeyField: 'Product share key',
    lineFactsField: 'Facts without size',
    productsTable: 'Products', productNameField: 'Name', productStyleField: 'Style', productColorField: 'Color',
    guidesTable: 'Shot guides', guideNameField: 'Name', guideCompleteField: 'Complete', guideStatusField: 'Status',
    guideAdoptedDefinitionField: 'Adopted definition', guideAdoptedVersionField: 'Adopted version',
    guideSlotsTable: 'Guide slots', gsNameField: 'Name', gsGuideField: 'Guide', gsPositionField: 'Position',
    gsPlacementField: 'Placement label', gsViewField: 'View', gsIncludesField: 'Includes', gsChooseCountField: 'Choose count',
    gsRetiredField: 'Retired', gsDefinitionLineField: 'Definition line',
    slotsTable: 'Product-page slots', slotNameField: 'Name', slotLineField: 'Line', slotRequestField: 'Request',
    slotShotField: 'Shot', slotActiveField: 'Active', slotOkField: 'Slot ok', slotOperativeField: 'Operative fulfillment',
    slotGuideSlotIdField: 'Guide-slot ID', slotShareSignatureField: 'Share signature', slotPositionField: 'Kept position',
    slotKeptSlotNameField: 'Kept slot name', slotStatusField: 'Status', slotWaivedField: 'Waived',
    slotWithdrawnField: 'Validly withdrawn', slotTestField: 'Test',
    shotsTable: 'Shots', shotNameField: 'Name', shotBriefField: 'Brief', shotLinesField: 'Lines in shot',
    shotFromGuideSlotField: 'From guide slot', shotMadeAsField: 'Made as', shotKeptGuidePlanField: 'Kept guide plan',
    shotPairKeyField: 'Pair key', shotWithdrawnField: 'Withdrawn', shotTestField: 'Test', shotSlotsFilledField: 'Slots filled',
    shotAcceptedCountField: 'Accepted count', shotLineShareSignatureField: 'Line share signature',
  },
  // S3 Replan (added by part 2), one script installed twice: kind "shot" or "slot".
  s3: {
    requestsTable: 'Briefs', requestLinesField: 'Product lines', requestCollectionGuideField: 'Shot guide (collection)',
    requestSupersededField: 'Superseded',
    linesTable: 'Product lines', lineNameField: 'Name',
    guidesTable: 'Shot guides', guideNameField: 'Name', guideCompleteField: 'Complete', guideStatusField: 'Status',
    guideAdoptedVersionField: 'Adopted version',
    guideSlotsTable: 'Guide slots', gsNameField: 'Name', gsGuideField: 'Guide', gsPositionField: 'Position',
    gsPlacementField: 'Placement label', gsViewField: 'View', gsRequiredField: 'Required', gsFillRuleField: 'Fill rule',
    gsIncludesField: 'Includes', gsChooseCountField: 'Choose count', gsRetiredField: 'Retired', gsDefinitionLineField: 'Definition line',
    slotsTable: 'Product-page slots', slotNameField: 'Name', slotLineField: 'Line', slotRequestField: 'Request',
    slotGuideSlotField: 'Guide slot', slotShotField: 'Shot', slotKeptDefinitionLineField: 'Kept definition line',
    slotKeptGuideIdField: 'Kept guide ID', slotKeptProductIdField: 'Kept product ID', slotKeptGuideVersionField: 'Kept guide version',
    slotKeptGuideNameField: 'Kept guide name', slotKeptSlotNameField: 'Kept slot name', slotKeptPositionField: 'Kept position',
    slotKeptPlacementField: 'Kept placement label', slotKeptViewField: 'Kept view', slotPlanKeptField: 'Plan kept',
    slotKeptPlanWrittenAtField: 'Kept plan written at', slotDetachLogField: 'Detach log', slotResultField: 'Replan result',
    slotProductNameField: 'Product name', slotAssignedGuideIdField: 'Assigned guide ID', slotLineProductIdField: 'Line product ID',
    slotRequestSupersededField: 'Request superseded', slotGuideSlotGuideIdField: 'Guide slot guide ID',
    slotWithdrawnField: 'Validly withdrawn', slotWaivedField: 'Waived', slotHeldField: 'Held', slotRecordCheckField: 'Record check',
    slotKeptPlanCheckField: 'Kept plan check', slotProductRecordIntactField: 'Product record intact',
    slotInPlanField: 'In adopted plan', slotStaleField: 'Stale by adoption', slotObligationField: 'Obligation unchanged',
    slotReachField: 'Replan reach', slotActiveField: 'Active', slotMatchesField: 'Matches its shot', slotCoveredField: 'Covered',
    slotShotAcceptedField: 'Shot accepted', slotChangePendingField: 'Change pending', slotOperativeField: 'Operative fulfillment',
    shotsTable: 'Shots', shotNameField: 'Name', shotBriefField: 'Brief', shotLinesField: 'Lines in shot',
    shotFromGuideSlotField: 'From guide slot', shotKeptGuidePlanField: 'Kept guide plan', shotWithdrawnField: 'Withdrawn',
    shotAcceptedCountField: 'Accepted count', shotWorkflowField: 'Workflow', shotSlotsFilledField: 'Slots filled',
    shotResultField: 'Replan result',
  },
  // S4 Apply acceptance (added by part 3). Keys name their table by prefix: acc (Accepted images),
  // slot (Product-page slots), app (Applications).
  s4: {
    acceptedTable: 'Accepted images', accRecordCompleteField: 'Record complete', accSlotsKeptField: 'Slots kept',
    accCandidateTestField: 'Candidate is test', accAcceptedAtField: 'Accepted at', accDoneField: 'Applications done',
    accProgressField: 'Application progress',
    slotsTable: 'Product-page slots', slotNameField: 'Name', slotActiveField: 'Active', slotHeldField: 'Held',
    slotRequestSupersededField: 'Request superseded', slotInPlanField: 'In adopted plan', slotWaivedField: 'Waived',
    slotWithdrawnField: 'Validly withdrawn', slotRecordCheckField: 'Record check', slotKeptPlanCheckField: 'Kept plan check',
    slotProductRecordIntactField: 'Product record intact',
    applicationsTable: 'Applications', appKeyField: 'Application key', appSlotField: 'Slot', appAcceptedImageField: 'Accepted image',
    appBasisField: 'Basis', appKeptDestinationField: 'Kept destination', appKeptReceivingBasisField: 'Kept receiving basis',
    appKeptLabelField: 'Kept label', appRecordedAtField: 'Recorded at', appAccountField: 'Account', appCurrentField: 'Current',
    appCurrentSetAtField: 'Current set at', appWithdrawnField: 'Withdrawn', appTestField: 'Test',
    faultAfterWrites: '', account: '',
  },
  // S5 Apply use decision (added by part 3). Keys name their table by prefix: ud (Use decisions),
  // acc (Accepted images), slot (Product-page slots), app (Applications).
  s5: {
    decisionsTable: 'Use decisions', udAcceptedImageField: 'Accepted image', udSlotsField: 'Slots', udReplaceField: 'Replace',
    udConditionsField: 'Conditions', udFactsReviewedField: 'Facts reviewed', udDecidedByField: 'Decided by',
    udDecisionSourceField: 'Decision source', udEnteredByField: 'Entered by', udDecidedBasisField: 'Decided basis',
    udDecidedAtField: 'Decided at', udDecidedSelectionField: 'Decided selection', udLabelField: 'Decision label',
    udResultField: 'Result', udAppliedField: 'Applied', udLiveBasisField: 'Live basis', udRecordIntactField: 'Record intact',
    udBasisCheckField: 'Basis check', udEndedSlotsField: 'Ended slots',
    acceptedTable: 'Accepted images', accRecordCompleteField: 'Record complete', accProductsKeptField: 'Products kept',
    accSlotsKeptField: 'Slots kept', accCandidateTestField: 'Candidate is test', accSourceCurrentField: 'Source current',
    accTitleField: 'Current title',
    slotsTable: 'Product-page slots', slotNameField: 'Name', slotActiveField: 'Active', slotPickupOkField: 'Pickup ok',
    slotChangePendingField: 'Change pending', slotHeldField: 'Held', slotKeyCountField: 'Key count',
    slotOperativeField: 'Operative fulfillment', slotPlanKeptField: 'Plan kept', slotShotGuideCheckField: 'Shot-guide check',
    slotInPlanField: 'In adopted plan', slotRequestSupersededField: 'Request superseded', slotTestField: 'Test',
    slotKeptDefinitionLineField: 'Kept definition line', slotKeptProductIdField: 'Kept product ID', slotReceivingBasisField: 'Receiving basis',
    slotShareSignatureField: 'Share signature', slotSizeField: 'Size', slotProductFactsField: 'Product facts', slotStatusField: 'Status',
    slotRecordCheckField: 'Record check', slotKeptPlanCheckField: 'Kept plan check', slotProductRecordIntactField: 'Product record intact',
    applicationsTable: 'Applications', appKeyField: 'Application key', appSlotField: 'Slot', appAcceptedImageField: 'Accepted image',
    appBasisField: 'Basis', appUseDecisionField: 'Use decision', appKeptDestinationField: 'Kept destination',
    appKeptReceivingBasisField: 'Kept receiving basis', appKeptLabelField: 'Kept label', appRecordedAtField: 'Recorded at',
    appAccountField: 'Account', appCurrentField: 'Current', appCurrentSetAtField: 'Current set at', appReplacesField: 'Replaces',
    appReplacedByField: 'Replaced by', appReplacedAtField: 'Replaced at', appWithdrawnField: 'Withdrawn', appTestField: 'Test',
    appStateField: 'State', appNameField: 'Name',
    legacyMap: '', refuseEarlierStandard: '', faultAfterWrites: '', account: '',
  },
};
