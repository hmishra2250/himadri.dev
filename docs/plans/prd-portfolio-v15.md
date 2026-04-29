# PRD — Portfolio V1.5 Static Interactive Layer

Status: draft for critic review
Date: 2026-04-30
Owner: future implementation agent/team

## Problem

V1 proves senior AI/platform credibility through static case studies and evidence. V1.5 must make the portfolio more memorable and evaluative without adding backend, LLM, or confidentiality risk.

## Goals

1. Let a CTO/founder/recruiter ask hard questions and receive sourced, curated answers.
2. Show production AI beliefs with evidence and nuance.
3. Add at least one excellent static interactive challenge if quality gates pass.
4. Explain cost and debugging judgment with sanitized/normalized examples.
5. Preserve route, proof, confidentiality, performance, and accessibility discipline.

## Non-goals

- No live LLM assistant.
- No `/api/interview`.
- No vector store, embeddings, database, user accounts, real trace ingestion, or real sandbox execution.
- No empty challenge shell or coming-soon route.
- No exact internal cost figures, private traces, private deck outputs, customer data, prompts, or internal datasets.

## Personas

1. CTO / VP Engineering evaluating senior AI systems judgment.
2. Founder evaluating founding AI engineer fit.
3. Senior AI/platform engineer assessing credibility.
4. Recruiter using clear proof to pass the candidate onward.

## Scope

### V1.5a must ship

- Phase-aware route manifest and validation extensions.
- Static `/interview-me` with question categories, curated answers, source cards, and case-study links.
- Evidence-backed Stack Opinions / Production AI Beliefs.
- Improved flagship case-study diagrams with captions/text alternatives.

### V1.5b may ship after gates

- `/challenges` landing page only if at least one child challenge is complete.
- `/challenges/debug-this-agent` with one polished static scenario.
- `/challenges/cost-anatomy` with normalized static toggles and required label.

## User stories

1. As a CTO, I can open Interview Me and ask/select hard questions about architecture, evals, cost, reliability, and weaknesses, then inspect source cards.
2. As a founder, I can quickly see production AI beliefs that demonstrate taste without tool-bashing.
3. As an AI engineer, I can debug a representative agent failure and compare my diagnosis to Himadri's reasoning.
4. As a hiring manager, I can inspect cost tradeoffs without seeing private company cost data.
5. As any visitor, I never encounter a broken, empty, or coming-soon route.

## Functional requirements

### Route governance

- Extend route manifest with phase, enabled, kind, proof/source/public-label requirements, sitemap/nav/indexing, and robots policy.
- Keep disabled/deferred routes out of nav, sitemap, public links, and `robots.ts` allow/index state.
- When enabling `/interview-me`, `/principles`, or `/challenges`, update `src/app/robots.ts` so enabled public pages are not accidentally disallowed.
- API routes must never appear in sitemap/nav.

### Interview Me static mode

- Provide categories: Production AI, Architecture, Evals and Reliability, Cost and Infra, Full-Stack Execution, Leadership/Seniority, Risk/Weaknesses, Role Fit.
- Each answer includes source cards with title, route/URL, snippet/summary, and proof IDs where claims require them.
- Answers must be curated/static and must not imply live AI generation.
- Unsupported topics should be handled by curated “not covered here” guidance, not generated guesses.

### Stack Opinions

- Each opinion has statement, nuance, evidence, proof/source reference, and related route.
- Tone is sharp but not insulting.
- Opinions can ship as standalone `/principles` only if route gates pass; otherwise integrate as a section/card set.

### Improved diagrams

- Flagship case-study diagrams clarify workflow architecture, verification boundary, DAG execution, Deck IR pipeline, observability/cost loops.
- Each diagram includes text alternative/caption.
- Sanitized/synthetic representations are labeled.

### V1.5b challenge excellence rubric

A challenge can be enabled only with a reviewer sign-off artifact confirming the reviewer, date, route, scenario ID, rubric checklist, decision, blockers if rejected, and:

1. plausible distractors;
2. non-obvious but sufficient trace clues;
3. complete diagnosis and fix;
4. source/proof metadata and confidentiality label;
5. keyboard flow, visible focus, reduced-motion behavior;
6. standalone hiring signal.

### Debug This Agent

- One polished scenario with symptom, static spans, choices, correct diagnosis, explanation, fix, and related principles.
- Static local state only.
- Accessible radio/button flow, keyboard navigable, visible focus, reduced-motion-safe.
- Public label identifies representative/sanitized scenario when applicable.

### Cost Anatomy

- Static toggles for Naive Implementation, Optimized Implementation, Final Production Pattern.
- Normalized unit totals and category breakdowns reconcile.
- Required visible label: representative normalized model; exact company costs omitted.
- No currency symbols or exact internal cost figures.

## Content/data requirements

- Add typed content modules for interview questions/answers, debug scenarios, cost models, stack opinions, and diagram metadata.
- All public metrics/company-specific claims reference approved proof claims.
- All source-card links point to enabled routes or approved downloads.

## UX requirements

- Design remains sharp, technical, calm, dense but readable, evidence-heavy.
- Interactions explain systems rather than decorate.
- Homepage critical path remains lightweight.
- No information is conveyed only by color.

## Acceptance criteria

1. `npm run verify` passes.
2. `npm audit --audit-level=moderate` has no moderate+ vulnerabilities.
3. `/interview-me` is public only when all questions/answers/source cards validate.
4. Stack opinions all have evidence/proof and non-inflammatory wording.
5. Debug challenge route is public only when scenario is complete, accessible, and passes the challenge excellence rubric with sign-off artifact.
6. Cost Anatomy route is public only when normalized units and required label validate.
7. `/challenges` is public only when at least one child challenge is enabled.
8. No disabled/deferred route appears in sitemap/nav/public links, and enabled public V1.5 routes are not blocked in `src/app/robots.ts`.
9. No backend, LLM, vector, database, or paid service dependency is added.
10. No private/confidential disallowed content appears.

## Rollout

1. V1.5a planning-approved implementation.
2. Verify and release V1.5a.
3. Review challenge quality.
4. Implement V1.5b only if challenge content meets excellence gate.
5. Verify and release V1.5b.

## Open decisions

- Whether Stack Opinions becomes standalone `/principles` or remains integrated.
- Which Debug This Agent scenario is strongest; default recommendation is Wrong Model Routing.
- Whether to ship one or two challenges in V1.5b; quality decides.
