# Plans directory guide

This directory contains the durable planning artifacts for the portfolio implementation. Read it as a sequence, not as a flat folder.

## Source context

Start with these files outside this directory:

1. `../portfolio_redesign_uiux_frontend_technical_design_doc.md`
   - Product, UX, frontend, backend, and phase design source of truth.
   - Section 27 locks V1 scope and defines V1.5 and V2 direction.
2. `../Himadri_Latest_Resume_April_2026.pdf`
   - Factual source for resume-backed claims, roles, dates, skills, education, awards, and public metrics.

## Reading order

### 1. V1 system plan

Read first:

1. `portfolio-redesign-system-ralplan.md`
2. `prd-portfolio-redesign-system.md`
3. `test-spec-portfolio-redesign-system.md`

These three files explain the V1 portfolio system that was planned first:

- evidence-first static portfolio
- required V1 routes
- typed content model
- proof and confidentiality validation
- route, sitemap, and link validation
- V1 verification commands

Use these files when working on the current V1 app or when checking whether a change violates launch discipline.

### 2. V1.5 and V2 expansion plan

Read second:

1. `portfolio-v15-v2-ralplan.md`
2. `prd-portfolio-v15.md`
3. `test-spec-portfolio-v15.md`
4. `prd-portfolio-v2.md`
5. `test-spec-portfolio-v2.md`

These files plan the post-V1 implementation:

- V1.5a static Interview Me, Stack Opinions, improved diagrams, route governance
- V1.5b Debug This Agent and Cost Anatomy, gated by challenge quality review
- V2a assistant corpus and eval foundation
- V2b source-grounded assistant API
- V2c advanced simulators and optional hiring packet

Use these files only after V1 is stable, or when preparing the next phase.

## How the plans were built incrementally

1. The design doc and latest resume were committed as the initial source material.
2. A clarification pass reviewed the design doc and collected missing answers in the doc itself.
3. The first consensus planning pass produced the V1 system plan, PRD, and test spec.
4. Those V1 plans were copied into this `docs/plans/` directory for durable project reference.
5. V1 implementation was then built against the V1 plan and verified with local commands.
6. A later consensus planning pass planned V1.5 and V2 without starting implementation.
7. The V1.5 and V2 plan was reviewed by an architect, revised for route governance, validation, assistant safety, and dependency staging.
8. A critic review requested tighter robots policy, challenge quality gates, eval report mechanics, API constants, and a deliberate V2 test plan.
9. Those critic changes were applied, then the plan received approval.
10. The approved V1.5 and V2 plan set was copied here beside the V1 plan set.

## How to use these plans for new work

Use this decision path:

1. If the change affects the current shipped site, read the V1 system plan, PRD, and test spec first.
2. If the change adds `/interview-me`, Stack Opinions, diagrams, or static challenges, read the V1.5 plan, PRD, and test spec.
3. If the change adds `/api/interview`, retrieval, evals, assistant behavior, DAG simulator, Deck IR previewer, or hiring packet generation, read the V2 plan, PRD, and test spec.
4. If route visibility changes, check `src/lib/routes.ts`, `src/app/sitemap.ts`, and `src/app/robots.ts` against the relevant plan.
5. If content claims change, check `src/content/proof.ts` and run content validation.
6. If a phase gate is not satisfied, keep the route deferred or disabled.

## Artifact roles

- `*-ralplan.md` files contain the consensus plan, ADR, tradeoffs, risks, route strategy, staffing guidance, and verification strategy.
- `prd-*.md` files define product requirements, scope, non-goals, user stories, and acceptance criteria.
- `test-spec-*.md` files define validation, test commands, route checks, accessibility checks, security checks, and done criteria.

## Verification expectation

Before claiming a phase is complete, run the commands required by its test spec. The common baseline is:

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

V1.5 and V2 add extra gates. Follow their test specs before enabling routes or APIs.
