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

### 3. Gap remediation plan

Read third:

1. `portfolio-gap-remediation-ralplan.md`
2. `prd-portfolio-gap-remediation.md`
3. `test-spec-portfolio-gap-remediation.md`

These files plan the remediation pass after the blunt quality review found that the portfolio is credible but not yet differentiated enough. They cover:

- hard Phase 0 route and governance gate
- assistant API default-off policy
- homepage parity gaps
- challenge reveal and interaction quality
- V2 assistant, DAG, Deck IR, and hiring packet gates
- browser QA evidence and no-em-dash validation

Use these files before any new implementation intended to close the current quality gaps.

### 4. Expert review remediation plan

Read fourth:

1. `claude_opus_v2_review.md`
2. `portfolio-expert-review-remediation-ralplan.md`

These files plan the remediation pass after an external expert review found that
the foundation is strong but the experiential layer is still too static and
internal-facing. They cover:

- Live System Pulse copy, animation, trace labels, and 375px mobile layout
- nav decluttering without route rollback
- hero CTA reduction
- visitor-facing copy cleanup
- shared `SectionHeader` accessibility repair
- missing hiring-fit signals and the non-AI principle
- contact segmentation
- proof and case-study hierarchy
- share-ready OG image metadata

Use these files before implementing the next public-surface polish pass.

### 5. Portfolio feedback remediation plan

Read fifth:

1. `portfolio-feedback-remediation-ralplan.md`

This file plans the human-first polish pass after hands-on review of the current deployed and local UI found that parts of the site still felt over-explained, LLM-shaped, or visually uneven. It covers:

- hero proof card cleanup and equal sizing
- compact Live System Pulse safety copy
- removal of repeated proof-theater labels
- featured case study ownership language
- challenge preview and Debug This Agent interaction cleanup
- chat-first Interview Me presentation
- human-readable hiring fit replacement
- resume note removal
- Highcharts principle reframing around artifact boundaries

Use this plan before changing homepage proof areas, Interview Me chat presentation, challenge copy, or proof/source labels.


### 6. SEO and indexing compliance plan

Read sixth:

1. `portfolio-seo-indexing-compliance-ralplan.md`

This file plans the 2026 SEO and indexing compliance pass. It covers:

- route-bound SEO metadata and canonical URLs
- deterministic sitemap dates
- robots and Search Console readiness
- conservative structured data
- `/api/interview` noindex response headers
- heading and internal-link hygiene
- people-first content quality without SEO theater

Use this plan before changing metadata, sitemap, robots, structured data, Search Console docs, SEO validators, or public route discoverability.

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
11. A later quality review judged the implementation credible but not yet a game-changing artifact.
12. A gap remediation ralplan was then created with Planner, Architect, and Critic review.
13. That remediation plan added a hard Phase 0 governance gate before any further UI, route, assistant, or simulator work.
14. A later expert review by Claude Opus 4.6 audited design-doc adherence, UX copy, social preview readiness, nav, accessibility, and experiential impact.
15. The expert review remediation ralplan translated those findings into an acceptance-contract plan with Architect and Critic approval.
16. A later hands-on review focused on homepage proof density, assistant presentation, challenge value, and human-readable hiring signals.
17. The portfolio feedback remediation ralplan converted that feedback into a surgical UI and copy plan without changing route, assistant, analytics, Gemini, confidentiality, or dependency gates.
18. A later SEO and indexing review separated current Google-supported technical hygiene from outdated SEO tactics.
19. The SEO and indexing compliance ralplan converted that review into a route-governed metadata, sitemap, robots, structured data, API noindex, Search Console, and people-first content plan.

## How to use these plans for new work

Use this decision path:

1. If the change affects the current shipped site, read the V1 system plan, PRD, and test spec first.
2. If the change adds `/interview-me`, Stack Opinions, diagrams, or static challenges, read the V1.5 plan, PRD, and test spec.
3. If the change adds `/api/interview`, retrieval, evals, assistant behavior, DAG simulator, Deck IR previewer, or hiring packet generation, read the V2 plan, PRD, and test spec.
4. If the change fixes current quality gaps, route exposure drift, assistant default-off behavior, challenge reveal mechanics, browser QA, or simulator gates, read the gap remediation plan, PRD, and test spec.
5. If the change fixes expert-review UX gaps, Live System Pulse behavior, public copy, contact segmentation, social preview metadata, or homepage hierarchy, read the expert review and expert remediation plan.
6. If the change fixes homepage proof density, Interview Me chat presentation, challenge value, proof labels, hiring-fit language, or human copy polish, read `portfolio-feedback-remediation-ralplan.md`.
7. If the change affects metadata, sitemap, robots, structured data, Search Console readiness, SEO validation, or public route discoverability, read `portfolio-seo-indexing-compliance-ralplan.md`.
8. If route visibility changes, check `src/lib/routes.ts`, `src/app/sitemap.ts`, and `src/app/robots.ts` against the relevant plan.
9. If content claims change, check `src/content/proof.ts` and run content validation.
10. If a phase gate is not satisfied, keep the route deferred or disabled.

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
