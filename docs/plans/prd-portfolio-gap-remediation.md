# PRD: Portfolio gap remediation

## Status

Approved for planning. Not yet approved for implementation.

## Objective

Move the portfolio from credible and polished to clearly differentiated by fixing trust gaps, route exposure drift, weak challenge mechanics, shallow V2 artifacts, and missing browser QA evidence.

## Primary users

1. CTO or VP Engineering evaluating senior AI platform judgment.
2. Founder evaluating whether Himadri can own an AI platform from zero to one.
3. Senior AI or platform engineer checking if the work is technically real.
4. Recruiter using the site to pitch Himadri internally.

## Problem statement

The current portfolio has strong proof, clear positioning, and good build discipline. It still falls short of the intended product standard because the most differentiated surfaces are either missing from the homepage, too shallow, or exposed before their quality gates are explicit.

## Scope

### In scope

1. Phase 0 governance and route migration.
2. Browser QA policy and manual evidence requirements.
3. Broad no-em-dash validation for authored public content.
4. Homepage Challenges and Interview Me preview parity.
5. Highcharts opinion coverage.
6. Debug This Agent reveal and interaction quality.
7. Cost Anatomy confidentiality and normalized-unit discipline.
8. Assistant V2a internal-only safety foundation.
9. Assistant V2b public API only after explicit approval.
10. DAG and Deck IR V2c acceptance gates.
11. Optional hiring packet gate.
12. Gemini Flash server-side assistant option, gated behind explicit env flags and evals.
13. Analytics and observability placeholders with privacy-safe provider gates.

### Out of scope until explicit approval

1. External LLM generation.
2. Vector database or embeddings service.
3. React Flow.
4. PPTX export.
5. Analytics or Sentry.
6. Contact form backend.
7. Any private company data, internal prompt, exact cost, private deck, customer data, or internal trace.

## Product requirements

### R1: Phase 0 governance gate

The system must reconcile route manifest, sitemap, robots, nav, public links, link tests, route smoke tests, and validation before any UI or V2 work begins.

Acceptance:

- Disabled routes are not in sitemap, nav, public links, link tests, or route smoke requirements.
- `/api/interview` is never in sitemap or nav.
- Deferred routes have consistent route manifest state.
- `npm run validate:routes` fails when route state drifts.

### R2: Assistant API default-off

The assistant API must be disabled unless explicitly enabled with `ENABLE_INTERVIEW_ASSISTANT_API === "1"`.

Acceptance:

- API tests cover disabled-by-default behavior.
- API tests cover explicitly enabled behavior.
- Public API launch claims are absent before V2b approval.

### R3: Authored content style validation

The repo must prevent em dashes from authored public content.

Acceptance:

- Validation scans `src/content`, `src/components`, `src/app`, and publication-intended docs.
- Validation excludes generated, vendor, binary, lockfile, and build artifacts.

### R4: Homepage parity

The homepage must include or explicitly defer Challenges and Interview Me preview sections in the intended design-doc order.

Acceptance:

- If included, previews appear after Case Study Grid and before Hiring Fit.
- If deferred, the reason is tied to route gating and documented.

### R5: Debug This Agent interaction quality

Debug This Agent must behave like a diagnostic exercise, not a pre-spoiled answer card.

Acceptance:

- Correct choice is not visually marked before user action.
- Reveal behavior is keyboard-operable.
- Scenario includes trace, options, diagnosis, fix, proof labels, and public label.

### R6: V2a assistant foundation

The assistant must have internal eval evidence before public API exposure.

Acceptance:

- Corpus is public or sanitized.
- Eval set has 40 to 60 cases.
- Eval report proves forbidden-claim, prompt-injection, fallback, and source-card behavior.

### R7: V2c simulator readiness

DAG and Deck IR routes must be disabled until they pass their acceptance gates.

Acceptance:

- DAG has nodes, edges, dependency states, at least one user decision, downstream state changes, lesson explanation, keyboard support, mobile support, route-local loading, and public labels.
- Deck IR has synthetic samples, parse errors, mapped slide preview, an inspection feature, no private data, labels, keyboard support, and route audit pass.

### R8: Browser QA evidence

Browser QA claims must be supported by concrete evidence.

Acceptance:

- Evidence includes viewport matrix, keyboard paths, reduced-motion check, screenshots or notes, owner, and date.
- Any browser automation dependency is dev-only and explicitly approved.

### R9: Gemini, analytics, and observability readiness

The repo should include prospective environment keys without committing real secrets. Gemini, analytics, and Sentry remain disabled until explicit implementation approval.

Acceptance:

- `.env.example` lists Gemini, analytics, and Sentry variables with placeholder values.
- `.env.local` can be used locally for real values and remains ignored.
- Gemini key is server-only and never uses a `NEXT_PUBLIC_` prefix.
- Analytics keys use `NEXT_PUBLIC_` only when browser exposure is expected.
- Assistant prompts and private messages are not logged into analytics or observability tools.

## Non-goals

- Do not make the site a flashy design showcase.
- Do not add backend services just because V2 exists.
- Do not expose private work artifacts.
- Do not enable weak V2 routes to make the route list look complete.
- Do not treat deterministic retrieval as a full AI assistant unless the UI says exactly what it is.

## Done criteria

The remediation is done when:

1. Phase 0 governance passes.
2. Enabled routes match their quality gates.
3. Homepage parity or deferral is resolved.
4. Debug This Agent no longer spoils the answer.
5. Highcharts opinion exists or is explicitly deferred.
6. V2 routes are disabled until they pass acceptance.
7. Assistant API is default-off unless explicitly approved.
8. Browser QA evidence exists for enabled public routes.
9. `npm run verify` and `npm audit --audit-level=moderate` pass.
