# AGENTS.md for himadri.dev

## Repository purpose

This repository contains the Next.js portfolio for Himadri Mishra. It is an evidence-first product surface for senior AI engineering, AI platform engineering, LLM systems architecture, and founding AI engineer roles.

## Technical stack

- Framework: Next.js App Router
- Language: TypeScript
- UI: React
- Styling: Tailwind CSS
- Content model: typed TypeScript modules under `src/content/`
- Route authority: `src/lib/routes.ts`
- Validation: local TypeScript scripts under `scripts/`
- Assistant corpus reports: `reports/assistant-corpus/`
- Assistant eval reports: `reports/assistant-eval/`
- Browser QA evidence: `reports/browser-qa/`
- Resume asset: `public/resume/Himadri_Latest_Resume_April_2026.pdf`

## Source files to read first

1. `docs/portfolio_redesign_uiux_frontend_technical_design_doc.md`
2. `docs/plans/README.md`
3. `docs/plans/portfolio-redesign-system-ralplan.md`
4. `docs/plans/portfolio-v15-v2-ralplan.md`
5. `docs/plans/portfolio-gap-remediation-ralplan.md`
6. `docs/plans/prd-portfolio-gap-remediation.md`
7. `docs/plans/test-spec-portfolio-gap-remediation.md`
8. `src/lib/routes.ts`
9. `src/lib/validation.ts`
10. `src/content/proof.ts`
11. `src/content/challenges.ts`
12. `src/content/interview.ts`
13. `src/content/stack-opinions.ts`
14. `src/lib/assistant/config.ts`
15. `src/lib/analytics.ts`

## Current route model

Enabled public routes:

- `/`
- `/case-studies`
- `/case-studies/agentic-market-research-platform`
- `/case-studies/ml-infra-rescue`
- `/case-studies/computer-vision-product-systems`
- `/case-studies/high-performance-ar-and-vision`
- `/resume`
- `/contact`
- `/interview-me`
- `/principles`
- `/challenges`
- `/challenges/debug-this-agent`
- `/challenges/cost-anatomy`
- `/challenges/dag-execution-simulator`
- `/challenges/deck-ir-previewer`

Internal or disabled routes:

- `/api/interview` exists but is disabled unless `ENABLE_INTERVIEW_ASSISTANT_API=1`.
- `/hiring-packet` is deferred and must stay out of sitemap, nav, and public links unless explicitly promoted.

## Route rules

- `src/lib/routes.ts` is the route manifest authority.
- `src/app/sitemap.ts` must derive public URLs from the manifest.
- `src/app/robots.ts` must not block enabled public routes.
- `src/components/layout/Navbar.tsx` must use manifest nav routes.
- Disabled, deferred, internal, and API routes must not appear in nav or sitemap.
- Do not publish empty routes, placeholder pages, or coming soon links.
- Use `assertRouteEnabled(path)` in disabled or phase-gated pages.
- Run `npm run validate:routes` after route, nav, sitemap, robots, or public link changes.

## Content and proof model

- Public proof claims live in `src/content/proof.ts`.
- Public metrics live in `src/content/metrics.ts`.
- Case study content lives in `src/content/case-studies.ts`.
- Principles live in `src/content/principles.ts`.
- Hiring fit content lives in `src/content/hiring-fit.ts`.
- Representative traces live in `src/content/traces.ts`.
- Challenge data lives in `src/content/challenges.ts`.
- Interview answers live in `src/content/interview.ts`.
- Stack opinion cards live in `src/content/stack-opinions.ts`.
- Every public metric or company-specific claim must reference an approved proof claim.
- Synthetic or sanitized artifacts must show a visible public label when required by their proof claim.
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

## Assistant and Gemini gates

- `/api/interview` must remain disabled unless `ENABLE_INTERVIEW_ASSISTANT_API=1`.
- Live assistant UI must remain hidden unless `NEXT_PUBLIC_ENABLE_INTERVIEW_ASSISTANT=1` and the route manifest allows `/api/interview`.
- Gemini may run only server-side through `GEMINI_API_KEY` and `ENABLE_GEMINI_ASSISTANT=1`.
- Never expose `GEMINI_API_KEY` through a `NEXT_PUBLIC_` variable.
- Keep deterministic source-grounded answers as the fallback when Gemini is disabled, missing, rate-limited, or fails.
- Assistant responses must keep source cards and safe fallbacks.
- Do not log full assistant questions by default.
- Run `npm run build:assistant-corpus`, `npm run validate:assistant-corpus`, `npm run eval:assistant`, and `npm run test:api` after assistant changes.

## Analytics gates

- The only planned analytics provider is Google Analytics 4.
- Analytics must stay disabled unless `ENABLE_ANALYTICS=1`, `NEXT_PUBLIC_ANALYTICS_PROVIDER=google_analytics`, and `NEXT_PUBLIC_GA_MEASUREMENT_ID` are set.
- Use `trackPortfolioEvent` from `src/lib/analytics.ts` for coarse portfolio events.
- Do not send assistant question text, contact messages, emails, names, IP-derived identity, private content, or confidential content as event parameters.
- Do not add Sentry, session replay, error tracking SDKs, or other observability vendors in the current scope.

## Environment files

- Commit `.env.example` as the template.
- Keep `.env.local` ignored and uncommitted.
- Do not commit filled secrets.
- Add new environment keys to `.env.example` with empty or safe default values.

## Verification commands

Run the smallest relevant checks while editing, then run the full suite before claiming completion.

```bash
npm run typecheck
npm run lint
npm run format:check
npm run validate:content
npm run validate:routes
npm run validate:confidentiality
npm run build:assistant-corpus
npm run validate:assistant-corpus
npm run eval:assistant
npm run build
npm run test:links
npm run test:routes-smoke
npm run test:api
npm run verify
npm audit --audit-level=moderate
```

## Dependency policy

- Keep the app on the existing Next.js, React, TypeScript, Tailwind, ESLint, Prettier, and TSX stack unless a plan explicitly approves a dependency.
- Do not add vector, RAG, graph, editor, analytics, or error tracking dependencies without an approved plan.
- Keep graph and editor work route-local so the homepage critical path stays unaffected.
- Prefer local scripts and existing platform APIs before adding packages.

## Writing style for repository content

- Do not use em dashes in authored content.
- Use commas, colons, semicolons, parentheses, or simple hyphens instead.
- Keep content specific, evidence-backed, and technical.
- Avoid vague claims that are not backed by proof metadata.
