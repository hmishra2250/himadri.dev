# Test spec: Portfolio gap remediation

## Status

Approved planning artifact. Use before any implementation claim.

## Test strategy

The remediation must prove route governance, assistant safety, public content quality, challenge behavior, simulator gating, and browser reality.

## Required command gates

Run these for every completed phase:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run validate:content
npm run validate:routes
npm run build
npm run test:links
npm run verify
npm audit --audit-level=moderate
```

## Phase 0 tests

### Route manifest tests

`npm run validate:routes` must fail if:

1. a disabled route is in sitemap
2. a disabled route is in nav
3. a disabled route is linked from public pages
4. `/api/interview` is in sitemap or nav
5. `/api/interview` is enabled while server feature gate is missing or default-off
6. `/api/interview` is enabled while assistant eval evidence is absent, stale, or failing
7. a public enabled page is blocked by robots
8. deferred V2 or V2c routes have inconsistent manifest state

### Link and smoke tests

`npm run test:links` and route smoke tests must use the manifest state. They must not hard-code disabled future routes as required public pages.

### Assistant config tests

Tests must prove:

1. API is disabled when `ENABLE_INTERVIEW_ASSISTANT_API` is absent
2. API is disabled when `ENABLE_INTERVIEW_ASSISTANT_API` is not `"1"`
3. API is enabled only when `ENABLE_INTERVIEW_ASSISTANT_API === "1"`

### No-em-dash tests

Validation must scan authored publication surfaces:

1. `src/content/**/*.ts`
2. `src/components/**/*.tsx`
3. `src/app/**/*.tsx`
4. `docs/**/*.md` when intended for publication or copied into site content
5. `AGENTS.md` if edited

Validation must exclude generated, vendor, lockfile, binary, build, and third-party artifacts.

## Phase 1 tests

1. Homepage section order includes Challenges and Interview Me previews before Hiring Fit, or a documented deferral exists.
2. Preview CTAs point only to enabled routes.
3. Highcharts opinion references approved proof.
4. No new content violates proof or confidentiality rules.
5. `npm run verify` passes.

## Phase 2 tests

1. Debug This Agent does not mark the correct choice before user action.
2. Reveal flow works with keyboard.
3. Every debug scenario has trace, options, correct choice, diagnosis, fix, proof IDs, public label, and reviewer signoff.
4. Cost Anatomy has normalized units only.
5. Challenge landing only links enabled complete challenges.

## Phase 3 tests

1. `/api/interview` remains disabled.
2. Assistant corpus validation passes.
3. Assistant eval passes forbidden-claim checks.
4. Assistant eval passes prompt-injection checks.
5. Assistant eval passes fallback checks.
6. Non-fallback answers include source cards.
7. Route validation blocks API exposure when eval or feature gate is missing.

## Phase 4 tests

Only run after explicit V2b approval.

1. API disabled-by-default test passes.
2. API enabled test passes with `ENABLE_INTERVIEW_ASSISTANT_API=1`.
3. Invalid payload returns safe 400.
4. Empty question returns safe 400.
5. Overlong question returns safe 400.
6. Rate limit returns safe 429.
7. Unsupported or private questions return fallback.
8. Source-grounded questions return source cards.
9. Full messages are not logged by default.
10. `/api/interview` is still absent from sitemap and nav.

## Phase 5 tests

### DAG simulator

Before enabling `/challenges/dag-execution-simulator`, verify:

1. nodes and edges are visible
2. dependency states are visible
3. execution state changes across steps
4. at least one user decision changes downstream readiness or failure handling
5. production lesson is shown after completion
6. keyboard operation works
7. mobile layout is readable
8. data label is public, synthetic, or sanitized
9. route-local loading or lazy loading is used
10. route audit passes

### Deck IR Previewer

Before enabling `/challenges/deck-ir-previewer`, verify:

1. sample is public or synthetic
2. parser errors are visible and safe
3. preview maps IR sections to slide-like output
4. at least one inspection feature exists
5. no private deck data is present
6. keyboard operation works
7. mobile layout is readable
8. route audit passes

### Hiring packet

Before enabling `/hiring-packet`, verify:

1. content is already public
2. no private claims exist
3. output is rendered or generated from typed content
4. sitemap and nav state are intentional
5. link, content, no-em-dash, and confidentiality validation pass

## Manual browser QA evidence

For each enabled public route in scope, capture:

1. route path
2. viewport: mobile, tablet, desktop
3. keyboard path checked
4. reduced-motion check result
5. screenshot or written note
6. pass/fail result
7. owner
8. date

## Lighthouse or performance evidence

Before public launch claims, collect either:

1. external Lighthouse report evidence, or
2. explicitly approved dev-only Lighthouse CI result

Track:

1. Performance target 90 or higher
2. Accessibility target 95 or higher
3. SEO target 95 or higher
4. LCP below 2.5 seconds
5. CLS below 0.1

## Gemini and Google Analytics tests

Before implementing Gemini-powered assistant behavior, verify:

1. `GEMINI_API_KEY` is server-only and never exposed with `NEXT_PUBLIC_`.
2. `ENABLE_GEMINI_ASSISTANT` must equal `"1"` before Gemini is used.
3. Missing Gemini key falls back to deterministic assistant behavior.
4. Gemini errors and rate limits return safe fallback.
5. Assistant responses still include source cards.
6. No full assistant question is logged by default.

Before implementing Google Analytics, verify:

1. `NEXT_PUBLIC_ANALYTICS_PROVIDER=google_analytics`.
2. `NEXT_PUBLIC_GA_MEASUREMENT_ID` is present for browser-side GA4.
3. `ENABLE_ANALYTICS === "1"` gates event sending.
4. Only approved event names are emitted.
5. No private prompt, contact message, email, name, or confidential content is sent as an event payload.
6. Event parameters are limited to route, feature id, scenario id, challenge id, source section, and boolean outcome.

Sentry and observability vendors are deferred. The test suite should fail if Sentry SDKs or Sentry environment requirements are introduced before a later approval.

## Release evidence package

Final completion must include:

1. command output summary
2. route state summary
3. disabled route summary
4. assistant API gate summary
5. manual browser QA evidence
6. known deferrals
7. risks that remain
