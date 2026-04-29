# Test Spec: Portfolio Redesign System

## 1. Verification Philosophy

Testing must prove two things:

1. The site works as a high-performance, accessible, static portfolio.
2. The public content is evidence-backed, scoped to V1, and confidentiality-safe.

## 2. Required Validation Scripts After Scaffolding

Convert these into package scripts during implementation:

- `typecheck`
- `lint`
- `format:check`
- `validate:content`
- `validate:routes`
- `build`
- `test:a11y` or equivalent accessibility scan
- `test:links` or equivalent broken-link check
- `analyze` or equivalent bundle inspection

## 3. Content Schema Tests

`validate:content` must fail if:

- A public claim lacks `sourcePath`.
- A public claim lacks `sourceLocator`.
- A company-specific claim has `approvedForPublicUse !== true`.
- A public route renders `confidentialityLevel: "private-do-not-publish"`.
- A sanitized/synthetic artifact requires a public label but has no label.
- A cost claim uses actual internal costs instead of normalized units.
- A metric appears without context.

## 4. Route Manifest Tests

`validate:routes` must fail if:

- Required V1 routes are missing.
- Deferred routes are included in nav or sitemap.
- A public route links to an empty, disabled, or coming-soon page.
- Supporting case-study detail pages are exposed without passing content/proof gate.
- `/interview-me`, challenge detail routes, or interview API ship in V1 without explicit scope change.

## 5. UI and Accessibility Tests

Verify:

- Keyboard access for nav, CTAs, expandable decision forks, and source cards.
- Visible focus states.
- Reduced-motion fallback for Live System Pulse and animated sections.
- Semantic heading order.
- Sufficient text contrast.
- Diagrams have text alternatives or explanatory captions.
- No information is conveyed only by color.
- Mobile layouts at common widths have no horizontal overflow.

## 6. Performance Tests

Verify:

- Lighthouse Performance 90+.
- LCP <2.5s.
- CLS <0.1.
- INP in good range.
- Homepage initial bundle excludes challenge/simulator libraries.
- Heavy visual components are lazy-loaded or absent from V1.

## 7. SEO and Metadata Tests

Verify:

- Lighthouse SEO 95+.
- Title and description exist for required public routes.
- Canonical metadata is configured.
- Sitemap contains only approved public V1 routes.
- robots/noindex policy excludes any conditional hidden route.
- Open Graph metadata exists at least for home and flagship case study.

## 8. Functional Smoke Tests

Verify:

- Homepage renders all required V1 sections.
- Resume route/download works.
- Contact CTA works.
- Case-studies index renders all four work areas.
- Flagship case-study route works.
- Supporting case-study links are either valid or omitted.
- No broken internal/external links.

## 9. Confidentiality Review Checklist

Manually inspect public output for absence of:

- customer names
- raw customer data
- survey datasets
- proprietary prompts
- internal evaluation rubrics
- non-public architecture/dashboard screenshots
- exact internal costs
- private deck outputs
- internal code
- secrets, endpoints, tokens, keys, infra identifiers

Confirm sanitized traces and normalized cost models are visibly labeled.

## 10. Hiring-Signal Review

Review the built V1 against four qualitative tests:

- CTO test: would a CTO want to ask how these systems were built?
- Founder test: does the site suggest Himadri can own an AI platform from zero to one?
- Recruiter test: can the Hiring Fit Matrix support an internal pitch?
- Skeptical engineer test: are tradeoffs, failure modes, and implementation realism concrete?

## 11. V1.5/V2 Additional Tests

For later phases add:

- interaction tests for Debug This Agent and Cost Anatomy
- static Interview Me answer/source-card tests
- assistant retrieval evals
- prompt-injection tests
- rate-limit tests
- unsupported-question fallback tests
- source-grounding faithfulness tests
