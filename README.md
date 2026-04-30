# himadri.dev

Personal portfolio for Himadri Mishra, built as an evidence-first product surface for senior AI engineering, AI platform engineering, LLM systems architecture, and founding AI engineer roles.

The site is intentionally more than a resume page. It presents production AI systems work through proof-backed metrics, case studies, principles, interactive challenges, a source-grounded Interview Me surface, and gated assistant infrastructure.

## Stack

- Next.js App Router
- TypeScript
- React Server Components by default
- Tailwind CSS through `@tailwindcss/postcss`
- Typed content modules under `src/content/`
- Route manifest authority in `src/lib/routes.ts`
- Local validation scripts under `scripts/`

## Important routes

Public routes are governed by `src/lib/routes.ts`.

Core routes:

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

Internal or deferred routes:

- `/api/interview` is internal and only serves when `ENABLE_INTERVIEW_ASSISTANT_API=1`.
- `/hiring-packet` is deferred and must stay out of nav, sitemap, and public links until explicitly promoted.

## Local development

Install dependencies:

```bash
npm install
```

Start the local app:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Open:

```text
http://127.0.0.1:3000
```

## Environment flags

Use `.env.example` as the template. Keep `.env.local` private and uncommitted.

Key gates:

- `NEXT_PUBLIC_ENABLE_INTERVIEW_ASSISTANT=1` shows the live assistant UI when the route manifest allows `/api/interview`.
- `ENABLE_INTERVIEW_ASSISTANT_API=1` enables the internal assistant API route.
- `ENABLE_GEMINI_ASSISTANT=1` plus `GEMINI_API_KEY` enables server-side Gemini assistance.
- `ENABLE_ANALYTICS=1`, `NEXT_PUBLIC_ANALYTICS_PROVIDER=google_analytics`, and `NEXT_PUBLIC_GA_MEASUREMENT_ID` enable GA4.

Never expose `GEMINI_API_KEY` through a `NEXT_PUBLIC_` variable.

## Content model

Most public content lives in typed modules:

- `src/content/proof.ts`, approved public proof claims
- `src/content/metrics.ts`, public metrics tied to proof claims
- `src/content/case-studies.ts`, case study data
- `src/content/principles.ts`, homepage principles
- `src/content/stack-opinions.ts`, principles page opinion cards
- `src/content/interview/index.ts`, Interview Me source-backed answers
- `src/content/challenges/index.ts`, challenge scenarios and labels
- `src/content/traces.ts`, representative trace data

Every public metric or company-specific claim should be backed by approved proof metadata. Synthetic or sanitized artifacts must keep appropriate public labels.

## Plans and design docs

Start with:

- `docs/portfolio_redesign_uiux_frontend_technical_design_doc.md`
- `docs/plans/README.md`

The plans directory documents the project in the order it was built:

1. V1 portfolio system plan
2. V1.5 and V2 plan
3. Gap remediation plan
4. Expert review remediation plan
5. Portfolio feedback remediation plan

Read `docs/plans/README.md` before making large product, route, content, assistant, or UI changes.

## Verification

Use the smallest relevant checks while editing. Before claiming a broad change is complete, run:

```bash
npm run verify
npm audit --audit-level=moderate
```

Useful targeted checks:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run validate:content
npm run validate:routes
npm run validate:confidentiality
npm run test:links
npm run test:routes-smoke
npm run test:api
```

Assistant-specific changes should also keep these green:

```bash
npm run build:assistant-corpus
npm run validate:assistant-corpus
npm run eval:assistant
```

## Browser QA evidence

Browser QA screenshots and notes are stored under `reports/browser-qa/`.

Recent local screenshot passes used headless Chromium against the local app, for example:

```bash
chromium --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --run-all-compositor-stages-before-draw \
  --virtual-time-budget=5000 \
  --window-size=1365,2200 \
  --screenshot=reports/browser-qa/example/home.png \
  http://127.0.0.1:3000/
```

## Deployment

The project is deployed on Vercel. The connected GitHub repository deploys automatically from pushes to `main` through Vercel Git integration. No GitHub Actions workflow is required for Vercel deployment in the current setup.

## Confidentiality rules

Do not publish customer names, raw customer data, survey datasets, proprietary prompts, internal eval rubrics, non-public screenshots, internal dashboard screenshots, exact internal costs, private deck outputs, internal code, secrets, tokens, keys, endpoints, or infrastructure identifiers.

Allowed public content includes resume-backed metrics, high-level architecture patterns, simplified diagrams, synthetic or sanitized representative traces, normalized cost units, representative workflow examples, and public GitHub, LinkedIn, and resume information.
