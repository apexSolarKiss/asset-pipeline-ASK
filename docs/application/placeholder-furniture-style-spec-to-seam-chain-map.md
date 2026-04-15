# Placeholder Furniture Style Spec To Seam Chain Map

This note is a conceptual bridge between the placeholder furniture style-spec artifact and the current deterministic seam chain.

## Ingest

The style spec enters the seam chain first as ingest-facing information. Product / SKU data, PD references, and approved style references belong here because they define what the asset candidate is about, what the product must remain faithful to, and what visual direction should shape later work. Bounded creative discretion inputs may also enter here, but only as constrained guidance rather than open-ended instruction.

## Constraints Carried Across The Chain

The style spec acts as a normative constraint layer across transformation and output behavior. Composition, scene restraint, styling rules, fidelity expectations, and technical output expectations should shape what later stages are allowed to produce, but they do not become runtime orchestration or stage-control logic by themselves.

## Output Expectations

At the output stage, the style spec informs whether governed outputs read as brand-consistent, product-faithful, and usable for controlled downstream contexts such as ecommerce and catalog presentation. The style spec helps define sufficiency, not just aesthetics.

## Release-Readiness Expectations

At release-readiness, the style spec matters insofar as it helps determine whether an asset candidate is ready to be presented for approval. The relevant question is whether the candidate remains within the intended brand, product, and output boundaries, not whether approval policy itself has been automated.

## What Is Not In The Seam Chain Yet

- real Netsuite or Airtable integration design
- prompt libraries or prompt templates
- runtime orchestration
- schema design
- model-routing logic
- UI design
