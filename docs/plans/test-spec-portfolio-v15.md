# Test Spec — Portfolio V1.5 Static Interactive Layer

Status: draft for critic review
Date: 2026-04-30

## Test strategy

V1.5 testing extends V1 proof/route/link validation before any new route becomes public. The test suite must fail closed: if content or proof metadata is missing, routes stay disabled.

## Required automated checks

### Existing baseline

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

### New content validation

Add or extend scripts so `npm run validate:content` checks:

1. Interview questions
   - unique IDs.
   - valid categories.
   - each question maps to an answer.
   - each answer has source cards.
   - source cards link to enabled public route or approved download.
   - proof IDs exist for all metrics/company-specific claims.
2. Stack opinions
   - unique IDs.
   - evidence/proof reference exists.
   - wording avoids banned inflammatory phrases if such list is codified.
3. Debug scenarios
   - unique IDs.
   - exactly one correct choice.
   - at least one trace span.
   - diagnosis and fix are non-empty.
   - synthetic/sanitized label exists.
   - no disallowed private tokens/terms.
4. Cost models
   - all values are normalized units.
   - totals reconcile.
   - no currency symbols.
   - required public label present.
5. Diagrams
   - caption/text alternative present.
   - sanitized/synthetic labels present when required.

### New route validation

`npm run validate:routes` must check:

- enabled public routes have sitemap inclusion.
- nav routes have labels.
- disabled/deferred/internal/API routes are absent from nav and sitemap.
- `src/app/robots.ts` must not disallow enabled public routes; deferred `/interview-me`, `/challenges`, and `/principles` remain blocked until enabled.
- `/challenges` cannot be enabled without at least one enabled child challenge and reviewer sign-off artifact.
- `/interview-me` cannot be enabled unless interview content validation passes.
- `/challenges/cost-anatomy` cannot be enabled unless cost validation passes.
- `/challenges/debug-this-agent` cannot be enabled unless scenario validation passes.

## Route smoke matrix

After build/start or equivalent route smoke tool:

| Route | V1.5a expected | V1.5b expected |
|---|---:|---:|
| `/interview-me` | 200 | 200 |
| `/principles` if standalone | 200 if enabled, otherwise 404/not linked | same |
| `/challenges` | 404/not linked | 200 only with enabled child |
| `/challenges/debug-this-agent` | 404/not linked | 200 if enabled |
| `/challenges/cost-anatomy` | 404/not linked | 200 if enabled |
| V2 routes/APIs | 404/disabled/not linked | 404/disabled/not linked |

## Challenge excellence sign-off

Before enabling any V1.5b challenge, create a reviewer sign-off artifact such as `reports/v15-challenge-review.md` with reviewer, date, route, scenario ID, rubric checklist, decision, blockers if rejected, and confirmation of:

- plausible distractors;
- non-obvious but sufficient trace clues;
- complete diagnosis/fix;
- source/proof and confidentiality labels;
- keyboard flow;
- reduced-motion behavior;
- standalone hiring signal.

## Accessibility checks

Manual or automated checks must confirm:

- Keyboard can operate Interview Me category/question selection.
- Keyboard can complete Debug This Agent choices and reveal answer.
- Cost toggles are buttons/radios with accessible names and visible focus.
- Reduced-motion preference does not block comprehension.
- Diagrams have text alternatives.
- Source cards are semantic links/cards.
- No information is color-only.

## Confidentiality checks

Automated grep/lint or validation should reject:

- currency symbols or exact cost wording in Cost Anatomy data.
- customer names or non-public datasets.
- proprietary prompt labels/content.
- internal trace IDs or endpoint names.
- private decks/screenshots/code.

Required labels to assert in rendered content:

- sanitized representative trace/scenario labels.
- representative normalized model / exact costs omitted label.

## Performance checks

- Build must pass.
- Homepage must not import challenge-heavy modules directly.
- Challenge components should be route-local or dynamically imported when useful.
- No React Flow/vector/RAG/provider dependencies in V1.5.

## Done criteria

- All baseline commands pass.
- New V1.5 validation rules pass.
- Route smoke matches phase matrix.
- Accessibility checklist passes.
- Confidentiality checklist passes.
- Reviewer confirms the challenge excellence rubric before enabling V1.5b routes.
- Robots/indexing policy matches enabled/deferred route state.
