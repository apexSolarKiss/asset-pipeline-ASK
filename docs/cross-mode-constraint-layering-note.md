# Cross-Mode Constraint Layering Note

## Purpose

This note provides a planning-level comparison of constraint layering across `SKU-driven product imagery` and the looser `brand campaign / editorial` creative stream.

Its purpose is to clarify which constraint categories currently appear universal across workflow modes, which appear mode-specific, and which belong more properly to brand or client overlays.

This note does not propose schema, field systems, or runtime behavior. It is a narrow architectural note meant to keep the current repo-local model legible while the examples remain provisional.

## Why This Comparison Matters Now

The repo now has a first deterministic four-seam baseline:

- ingest validation
- transformation check
- output validation
- release-readiness

At the same time, workflow-mode variation is already established in the current repo-local framing, and recent placeholder-furniture work now applies direct pressure to the question of how constraints should layer without being collapsed into one undifferentiated bucket.

That makes this comparison timely. The next honest question is not whether the repo needs a new seam or broader machinery, but how current constraint behavior should be understood across modes while preserving the distinction between universal structure, workflow-stream variation, and brand-specific overlays.

## Two Modes In View

For current planning purposes, the contrast is between two already recognized workflow modes.

In `SKU-driven product imagery`, the governing pressure is tighter repeatability, stronger product-truth pressure, more explicit parameterization, and more validation-heavy governance. The mode is not defined by zero discretion, but by discretion being narrow and strongly bounded by comparability and consistency needs.

In `brand campaign / editorial`, the governing pressure is broader expressive latitude, greater weight on contextual instructions, looser compositional repeatability, and more judgment-heavy governance. This side of the comparison should be read less as one tightly stable operational class and more as a higher-discretion creative stream whose governing logic may vary more by campaign brief. Even so, it is still useful as a comparison case because the allowed interpretive range remains bounded by coherence and governance rather than treated as unconstrained creativity.

The important point is that the structure still appears shared across both modes. What varies is not the existence of constraints, but how tight they are, what they protect most strongly, and how much interpretive spread they allow.

## Constraint Categories That Appear Universal

Across the two modes currently in view, several constraint categories appear to hold at a universal level.

First, governed outputs must remain legible and usable for their intended downstream purpose. The exact meaning of usable may vary by mode, but the expectation that outputs must be fit for governed use appears to hold across the current examples.

Second, essential subject or product truth must remain bounded. In SKU-oriented work this pressure is more explicit and stricter, but even campaign work does not appear to allow unconstrained distortion of essential facts, identifiers, or informational presence.

Third, required subject-defining, identifier-bearing, or review-relevant signals cannot silently disappear. The form of that requirement changes by workflow mode, but the repo-local examples support the idea that those signals must still survive the workflow.

Fourth, creative discretion remains bounded rather than unconstrained. The repo's current architecture already treats bounded discretion as a distinct part of constraints rather than as permission to escape them.

Fifth, approval remains distinct from automated validation. Validation can test whether an output remains within stated bounds, but approval continues to sit at a separate boundary rather than being absorbed into deterministic checks.

These are still provisional claims, but current repo-local truth supports them as the strongest universal tendencies now visible.

## Constraint Categories That Appear Mode-Specific

What appears mode-specific is less the existence of constraints than the way constraints are weighted and expressed.

In `SKU-driven product imagery`, constraints appear to center more heavily on comparability, coverage consistency, parameter tightness, and reduced stylistic drift. This mode places greater emphasis on preserving product truth across repeated outputs and on keeping variation narrow enough that outputs remain comparable across a broader set.

In `brand campaign / editorial`, constraints appear to center more heavily on continuity of the campaign frame, allowed asset-level variation, and broader compositional freedom within coherence bounds. This creative stream still requires discipline, but the pressure is less about strict output sameness and more about keeping multiple expressions inside one recognizable campaign family, even where the exact governing logic shifts with the brief.

This suggests that workflow-mode rules are currently about governing pressure and allowed range, not about replacing the shared top-level structure. SKU mode tightens the acceptable range around repeatability and fidelity. Campaign mode allows a wider expressive range, but only within continuity, clarity, and governance limits.

## Constraint Categories That Belong To Brand / Client Overlays

Some constraints appear better understood as brand or client overlays than as workflow-mode rules.

These include the tonal world, styling posture, scene restraint, class-specific shot expectations, and SKU-specific fidelity facts that arise from a particular client or brand context. They do not seem universal to a mode in the same way that repeatability pressure or campaign coherence pressure do.

The placeholder-furniture artifacts provide the current concrete evidence for this layer. The Northline House example introduces a quiet, architectural visual world, specific scene-restraint expectations, product-class shot guidance, and SKU-specific fidelity facts. Those pressures are real and useful, but they do not by themselves define SKU mode as a whole. They are better understood as overlay constraints applied within one brand-specific context.

This distinction matters because a workflow mode should not be defined by one placeholder client's tone or visual system. Brand and client overlays can sharpen or intensify the working constraints, but they should not be mistaken for the universal or mode-level structure of the repo.

## Conceptual Influence On The Four Seam Records

These distinctions should influence the current four seam records conceptually, but not symmetrically.

### Ingest

At ingest, workflow-mode constraints and brand or client overlays may enter as context, references, and declared boundaries. This is where source materials, supplied parameters, contextual instructions, approved references, and stated fidelity expectations can become legible as what later work must remain within.

That does not mean ingest formalizes a full constraint schema. It means ingest is the natural place where the repo can carry forward the information that later stages must respect.

### Transformation

At transformation, constraints shape what kinds of work remain allowed, but they should not be turned into stage-control logic or broader runtime machinery. Universal constraints, mode-specific pressures, and overlay-specific expectations may all bear on whether a transformation remains inside bounds.

The important point is that transformation is shaped by constraints rather than made into the owner of a generalized constraint system.

### Output

At output, the relevant question is whether the resulting governed outputs are sufficient and fit for the intended mode and overlay context. Universal expectations such as legibility and usability still apply, but sufficiency is also influenced by whether the output remains inside the tighter repeatability demands of SKU mode or the coherence demands of campaign mode, as well as any brand-specific overlay expectations that are actually in scope.

This keeps output evaluation tied to governed sufficiency rather than turning it into a totalizing policy layer.

### Release-Readiness

At release-readiness, the question is whether the candidate is ready to be presented for approval within its governing bounds, not whether approval itself has been automated. Universal constraints, workflow-mode pressures, and brand or client overlays may all help determine whether the candidate is within bounds to advance.

That is still narrower than saying release-readiness owns approval policy. It tests bounded readiness for approval, while preserving the repo's current distinction between validation and human approval.

## Explicitly Out Of Scope

This note does not do the following:

- schema design
- field catalogs
- inheritance logic
- runtime orchestration
- prompt packaging or control-surface behavior
- new validation machinery
- changes to seam code
- a fifth seam

It also does not claim that the current examples are sufficient to finalize ontology decisions. The note is meant only to record the smallest honest cross-mode distinction currently earned by repo-local truth.
