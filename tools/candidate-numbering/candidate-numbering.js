// Candidate numbering (N2) // give a genuine candidate its number within its shot.
// A candidate's number is fixed by its first row in the issued-numbers table: one more
// than the number of other candidates with an earlier row for the same shot. N2 adds rows and
// writes each row's number once, and nothing else changes them, so a late, repeated or failed
// run cannot move a number, and a deleted candidate's row keeps its number from being issued again.
// Tables and fields come from this action's inputs, by ID or name; see README.md.
const cfg = input.config();
const recordId = cfg.recordId;

// Resolve every binding, and check its field type, before reading or writing anything.
const C = base.getTable(cfg.candidatesTable);
const I = base.getTable(cfg.issuedTable);
const bind = (table, key, type) => {
  const f = table.getField(cfg[key]);
  if (f.type !== type) throw new Error(`N2: ${key} must be of type ${type}, not ${f.type}`);
  return f.id;
};
const F = {
  shot: bind(C, 'shotField', 'multipleRecordLinks'),
  test: bind(C, 'testField', 'checkbox'),
  number: bind(C, 'numberField', 'number'),
  order: bind(I, 'orderField', 'autoNumber'),
  rowShot: bind(I, 'rowShotField', 'multipleRecordLinks'),
  candidateKey: bind(I, 'candidateKeyField', 'singleLineText'),
  issued: bind(I, 'issuedNumberField', 'number'),
};

const num = v => (typeof v === 'number' ? v : null);
const onlyShot = links => (links && links.length === 1 ? links[0].id : null);

// This shot's rows, in the order they were added.
async function readRows(shotId) {
  const res = await I.selectRecordsAsync({ fields: [F.order, F.rowShot, F.candidateKey, F.issued] });
  const rows = res.records
    .filter(r => (r.getCellValue(F.rowShot) || []).some(l => l.id === shotId))
    .map(r => ({ id: r.id, order: r.getCellValue(F.order), candidate: r.getCellValue(F.candidateKey), issued: num(r.getCellValue(F.issued)) }));
  if (rows.some(r => typeof r.order !== 'number')) throw new Error('N2: a row in this shot has no order yet; no number was written. Retry');
  return rows.sort((a, b) => a.order - b.order);
}

async function main() {
  const me = await C.selectRecordAsync(recordId, { fields: [F.shot, F.test, F.number] });
  if (!me) { console.log('skip: candidate not found'); return; }
  if (num(me.getCellValue(F.number)) != null) { console.log('skip: already numbered'); return; }
  if (me.getCellValue(F.test)) { console.log('skip: test record'); return; }
  const links = me.getCellValue(F.shot) || [];
  if (links.length !== 1) { console.log(`skip: ${links.length} shots linked`); return; }
  const shotId = links[0].id;

  if (!(await readRows(shotId)).some(r => r.candidate === recordId)) {
    await I.createRecordAsync({ [F.rowShot]: [{ id: shotId }], [F.candidateKey]: recordId });
  }
  // Read again: this read begins after the candidate's row is committed, so it sees every earlier row.
  const rows = await readRows(shotId);
  const at = rows.findIndex(r => r.candidate === recordId);
  if (at < 0) throw new Error(`N2: the row for ${recordId} is not visible after it was added; no number was written`);
  const first = rows[at];
  const n = new Set(rows.slice(0, at).map(r => r.candidate)).size + 1;

  // Stop rather than write a number that another record already holds. Under the stated assumption
  // and the supported operations only the deletion stop can fire; the others catch hand edits,
  // shot changes and departures from the assumption.
  if (first.issued != null && first.issued !== n) {
    throw new Error(`N2: the row for ${recordId} holds number ${first.issued}, but its place in the shot now gives ${n}; rows were removed or edited. No number was written`);
  }
  const holder = rows.find(r => r.candidate !== recordId && r.issued === n);
  if (holder) throw new Error(`N2: number ${n} in shot ${shotId} was issued to ${holder.candidate}; no number was written`);
  const cands = await C.selectRecordsAsync({ fields: [F.shot, F.number] });
  const self = cands.records.find(r => r.id === recordId);
  if (!self) throw new Error(`N2: ${recordId} was deleted during its run; its row keeps its place`);
  if (onlyShot(self.getCellValue(F.shot)) !== shotId) throw new Error(`N2: the shot of ${recordId} changed during its run, which is not supported; no number was written`);
  const mine = num(self.getCellValue(F.number));
  if (mine != null && mine !== n) throw new Error(`N2: ${recordId} shows number ${mine}, but its row gives ${n}; no number was written`);
  const shown = cands.records.find(r => r.id !== recordId && num(r.getCellValue(F.number)) === n &&
    (r.getCellValue(F.shot) || []).some(l => l.id === shotId));
  if (shown) throw new Error(`N2: candidate ${shown.id} in shot ${shotId} already shows number ${n}; no number was written`);

  if (first.issued == null) await I.updateRecordAsync(first.id, { [F.issued]: n }); // issue before use
  if (mine == null) await C.updateRecordAsync(recordId, { [F.number]: n });
  console.log(`numbered ${n}`);
}

await main();
