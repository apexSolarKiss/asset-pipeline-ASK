# Review Artifact Placement Note

## Purpose

This note pressure-tests review-artifact placement across the current `output` and `release-readiness` seams.

Its purpose is to clarify the current question without turning review artifacts into a settled schema rule, validator requirement, or generalized subsystem.

## Why This Question Appears Now

The repo now has a first deterministic seam baseline, later-seam boundary clarifications, and two application-layer pressure tests. That is enough to show that review artifacts matter, but not enough to settle one universal placement rule for them.

The overlap appears because `output` is already responsible for governed output sufficiency, while `release-readiness` is responsible for bounded readiness to present for approval. Review artifacts can support both seams, but not in the same way.

## SKU-Side Pressure

In the current SKU-side packet, review artifacts appear as useful supporting material rather than as the main determinant of whether governed outputs are sufficient. A contact-sheet-style artifact helps comparative review, but the stronger governing pressure still sits on product fidelity, brand consistency, and usable governed outputs.

This makes review artifacts feel present but secondary in the SKU-side case.

## Campaign-Side Pressure

In the current campaign-side packet, review artifacts feel more central. The campaign example explicitly calls for a side-by-side review board and a light annotation or review note artifact because campaign coherence, expressive range, and directional judgment are harder to assess from isolated outputs alone.

That does not make review artifacts a separate seam. It does mean the campaign-side case places more of the readiness-supporting burden on them.

## Output

`Output` can remain the seam for governed output sufficiency without owning all review context.

At this seam, review artifacts are best understood as optional supporting context where they help show that the governed outputs are coherent, usable, and sufficient to proceed. Current repo-local truth does not justify a stronger claim that output always owns review-artifact placement.

## Release-Readiness

`Release-readiness` can carry more of the readiness-supporting review burden without becoming approval automation.

At this seam, review artifacts matter insofar as they help make the candidate set presentable for approval inside its governing bounds. This appears more important in the campaign-side case than in the SKU-side case, but the current repo still supports only a provisional statement rather than a universal rule.

## What Still Remains Open

- whether review artifacts should usually appear at both seams or primarily at one
- whether campaign/editorial work deserves a sharper expectation than SKU-driven work
- how much review-artifact continuity should be explicit across the seam records
- whether stronger placement guidance would hold outside the current two examples

## What This Note Does Not Do

- define a record schema
- introduce field catalogs
- imply validator changes
- introduce runtime or orchestration language
- define a generalized review-artifact framework
- define a new seam
