# AGENTS.md for himadri.dev

## Repository purpose

This repository contains the Next.js implementation of Himadri Mishra's portfolio site for senior AI engineering, AI platform engineering, LLM systems architecture, and founding AI engineer roles.

## Technical stack

- Framework: Next.js App Router
- Language: TypeScript
- UI: React
- Styling: Tailwind CSS
- Content model: typed TypeScript modules under `src/content/`
- Routing model: App Router pages under `src/app/`
- Route authority: `src/lib/routes.ts`
- Validation: local TypeScript scripts under `scripts/`
- Resume asset: `public/resume/Himadri_Latest_Resume_April_2026.pdf`

## Source files to read first

1. `docs/portfolio_redesign_uiux_frontend_technical_design_doc.md`
2. `docs/plans/README.md`
3. `docs/plans/portfolio-redesign-system-ralplan.md`
4. `docs/plans/prd-portfolio-redesign-system.md`
5. `docs/plans/test-spec-portfolio-redesign-system.md`
6. `docs/plans/portfolio-v15-v2-ralplan.md`
7. `docs/plans/prd-portfolio-v15.md`
8. `docs/plans/test-spec-portfolio-v15.md`
9. `docs/plans/prd-portfolio-v2.md`
10. `docs/plans/test-spec-portfolio-v2.md`
11. `docs/Himadri_Latest_Resume_April_2026.pdf`

## Current public route model

Required V1 routes:

- `/`
- `/case-studies`
- `/case-studies/agentic-market-research-platform`
- `/resume`
- `/contact`

Conditional case study routes:

- `/case-studies/ml-infra-rescue`
- `/case-studies/computer-vision-product-systems`
- `/case-studies/high-performance-ar-and-vision`

Deferred until V1.5 or V2 gates pass:

- `/interview-me`
- `/principles`
- `/challenges`
- `/challenges/debug-this-agent`
- `/challenges/cost-anatomy`
- `/challenges/dag-execution-simulator`
- `/challenges/deck-ir-previewer`
- `/api/interview`

## Route rules

- `src/lib/routes.ts` is the route manifest authority.
- `src/app/sitemap.ts` must match enabled public routes.
- `src/app/robots.ts` must not block enabled public routes.
- Disabled, deferred, internal, and API routes must not appear in nav or sitemap.
- Do not publish empty routes, placeholder pages, or coming soon links.
- Run `npm run validate:routes` after route, nav, sitemap, or robots changes.

## Content and proof model

- Public proof claims live in `src/content/proof.ts`.
- Public metrics live in `src/content/metrics.ts`.
- Case study content lives in `src/content/case-studies.ts`.
- Principles live in `src/content/principles.ts`.
- Hiring fit content lives in `src/content/hiring-fit.ts`.
- Representative trace content lives in `src/content/traces.ts`.
- Every public metric or company-specific claim must reference an approved proof claim.
- Sanitized or synthetic artifacts must show a visible public label when required by their proof claim.
- Cost examples must use normalized units, not actual internal cost figures.

## Confidentiality constraints

Do not publish:

- customer names
- raw customer data
- survey datasets
- proprietary prompts
- internal evaluation rubrics
- non-public screenshots
- internal dashboard screenshots
- exact internal cost figures
- private deck outputs
- internal code
- secrets, tokens, keys, endpoints, or infrastructure identifiers
- direct production traces unless explicitly approved

Allowed content types:

- resume-backed public metrics
- high-level architecture patterns
- simplified diagrams
- synthetic or sanitized representative traces
- normalized cost units
- representative workflow examples
- public GitHub, LinkedIn, and resume information

## V1.5 implementation gates

V1.5a can add:

- static `/interview-me`
- sourced static answers
- source cards
- Stack Opinions or Production AI Beliefs
- improved flagship diagrams
- route and validation governance

V1.5b can add:

- `/challenges`
- `/challenges/debug-this-agent`
- `/challenges/cost-anatomy`

V1.5 must not add:

- live LLM calls
- `/api/interview`
- embeddings
- vector stores
- databases
- user accounts
- real trace ingestion
- real sandbox execution
- exact internal costs

## V2 implementation gates

V2 can add `/api/interview` only after these are in place:

- approved public or sanitized chunk corpus
- eval dataset with 40 to 60 cases
- eval report at `reports/assistant-eval/latest.json` or configured equivalent
- 100 percent forbidden-claim pass rate
- 100 percent prompt-injection pass rate
- 100 percent fallback pass rate for unsupported, private, and unrelated questions
- 100 percent source-card presence for non-fallback generated answers
- payload validation
- max question length
- rate limiting
- no full-message logging by default
- privacy-safe errors

V2 simulator routes must be route-local, lazy-loaded when needed, accessible, and based only on public or synthetic data.

## Commands

Use these commands for verification:

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

`npm run verify` runs typecheck, lint, format check, content validation, route validation, build, and link checks.

## Dependency policy

- Keep V1 and V1.5 on the existing Next.js, React, TypeScript, and Tailwind stack unless a plan explicitly approves a dependency.
- Do not add vector, RAG, assistant, graph, editor, analytics, or error tracking dependencies ahead of the approved phase.
- Add V2 runtime dependencies behind narrow adapter modules.
- Keep graph and editor dependencies out of the homepage critical path.

## Writing style for repository content

- Do not use em dashes in authored content.
- Use commas, colons, semicolons, parentheses, or simple hyphens instead.
- Keep content specific, evidence-backed, and technical.
- Avoid vague claims that are not backed by proof metadata.
