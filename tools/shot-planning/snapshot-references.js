// Snapshot's reference list // a script step of the Snapshot automation, before its update.
// Snapshot keeps, once, what makes a candidate: the shot's standard, prompt, use, product image file and
// reference image files, copied by value in one update when the candidate's shot is planned. A shot's
// continuity reference adds one image to the reference files, kept last (the change of 2026-10-30).
// This step assembles that list, in order, from the values of the trigger that started the run: the
// same read the update copies the standard and the prompt from, never a later read of the shot. The
// list is the shot's reference images in their order, then Continuity image now while the shot's
// continuity reference is Ready. It writes nothing; the update writes its output to Reference images
// used with the other kept fields, so a candidate is kept in one write and nothing is appended later.
// With no continuity reference configured, the list is the shot's reference images alone, as before.
// A configured reference that isn't Ready, or a continuity image that doesn't agree with its check,
// stops the run before the update: nothing is kept, and the run history says why. Snapshot's trigger
// (Shot planned = 1) already keeps an incomplete reference from starting a run; this is the second stop.
// Its three inputs come from the trigger, each a list (see README.md).
const cfg = input.config();

const NAME = "Snapshot's reference list";
// A list input: the lookup's values as insertAsData passes them. An empty lookup may arrive as nothing.
const list = key => {
  if (!(key in cfg)) throw new Error(`${NAME}: input ${key} is missing`);
  const v = cfg[key];
  if (v === null || v === undefined || v === '') return [];
  if (!Array.isArray(v)) throw new Error(`${NAME}: input ${key} must be a list (insertAsData), not ${typeof v}`);
  return v;
};
const urls = key => list(key).map((u, i) => {
  if (typeof u !== 'string' || !u.trim()) throw new Error(`${NAME}: ${key} item ${i + 1} is not a file URL`);
  return u;
});

async function main() {
  const references = urls('referenceUrls');
  const continuity = urls('continuityUrls');
  // Continuity check now: the shot's Continuity check, empty while nothing is configured.
  const checks = list('continuityChecks').map(c => (c === null || c === undefined ? '' : String(c)).trim()).filter(Boolean);

  if (!checks.length) {
    if (continuity.length) throw new Error(`${NAME}: Continuity image now has ${continuity.length} file(s) but no continuity reference is configured; nothing is kept`);
    output.set('referenceUrls', references);
    console.log(`kept ${references.length} reference image(s); no continuity reference`);
    return;
  }
  const notReady = checks.find(c => c !== 'Ready');
  if (notReady) throw new Error(`${NAME}: the shot's continuity reference is not ready (${notReady}); nothing is kept`);
  if (continuity.length !== 1) throw new Error(`${NAME}: the continuity reference is Ready but Continuity image now has ${continuity.length} files, not 1; nothing is kept`);
  output.set('referenceUrls', [...references, continuity[0]]);
  console.log(`kept ${references.length} reference image(s), then the continuity image last`);
}

await main();
