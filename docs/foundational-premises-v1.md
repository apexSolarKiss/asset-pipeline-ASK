# Foundational Premises
### Why the architecture models structured definition layers rather than prompt events.

## Purpose

This note states the load-bearing premises the architecture rests on, in one citable place. The architecture docs *apply* these premises throughout; this note *states* them once. They are starting premises the work builds on, not open questions it re-proves.

## The premises

### 1. Prompting is not architecture

A prompt is an instruction event — a single request, composed and evaluated once. An information architecture defines what *kinds* of information exist, where they live, how they inherit, how they override, how they combine, and how they are governed. A prompt consumes that structure; it does not persist it.

The durable layer is the structured definition of intent, inputs, constraints, references, outputs, and governance — not the prompt text composed from it. Any prompt, and any generation interface, is a view on top of the definition layer. Optimizing the interface that triggers generation is not the same as defining the structure the interface reads.

### 2. Visual anchoring is a structural override, not decoration

External image-generation models carry strong defaults. Under text-only steering, prose tends to converge on those defaults no matter how detailed it is: words can *describe* composition, light behavior, surface treatment, and atmospheric register, but cannot *encode* them at the bandwidth required to move a model off its defaults.

An approved reference image is the structural override — it carries the micro-decisions prose cannot. This is why references are modeled as first-class carriers with their own normative force, not as illustrative attachments. Visual anchoring is load-bearing for fidelity; it is not ornamental.

### 3. Product truth, reference, constraint, example, and output are different objects with different jobs

The architecture keeps these distinct because each is governed differently and sits at a different place in the inheritance hierarchy:

- a product image (**product truth** — facts about the thing) is not a **reference** (directional guidance for how output should look);
- a **constraint** (what must, or must not, happen) is not an **example** (one instance that merely illustrates);
- an approved reference is not an **output** (a produced asset);
- and a generated output is not automatically a governed asset (premise 4 below).

Collapsing these — treating distinct inputs as an undifferentiated reference blob, or treating a reference as an output — is the failure mode the layered model exists to prevent. Each object has its own carrier, its own normative force, and its own boundary.

## Premises already carried elsewhere in the repo

Two further premises are equally load-bearing but already stated where the architecture defines them; this note points to them rather than restating them:

4. **A generated image is not automatically a governed asset.** Raw generation becomes governed asset identity only through the curation/governance seam — capture, provenance, curator, and `curation_pattern`. See [architecture.md](architecture.md) (the curation seam and governed-asset layer) and the `generated_assets` governance carriers.

5. **Creative discretion is a structural concern, not a residual.** Where authorship-bearing discretion enters, what bounds it, who owns the decision, and where governance-bearing curation resolves are modeled as first-class. See [layered-reference-and-discretion-architecture-v1.md](layered-reference-and-discretion-architecture-v1.md) (the nine discretion sites) and [architecture.md](architecture.md) (the curation semantic split).

## Status

These premises are the starting points the architecture builds on; they are not re-proved by routine work. Repo prose and the structured IA model apply them. This note exists so they can be cited once, plainly, without restating the reasoning each time.
