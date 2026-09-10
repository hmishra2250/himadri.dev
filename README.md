# himadri.dev

Simple public portfolio for Himadri Mishra, built with Next.js App Router and typed content. The site presents a concise professional presence for AI systems, developer infrastructure and production AI product work.

## Current public surface

Public routes are governed by `src/lib/routes.ts`. The primary visitor experience is the homepage, not a multi-page product tour.

Homepage sections:

- `/#work`, resume-backed briefs and selected case-study context
- Agent Experience engineering, scoped results, systems in development and public projects
- `/#about`, short background and focus
- `/#contact`, direct email, GitHub and resume links

Compatible reference pages remain available for direct links and search:

- `/case-studies`, work index
- `/case-studies/agentic-market-research-platform`
- `/case-studies/ml-infra-rescue`
- `/case-studies/computer-vision-product-systems`
- `/case-studies/high-performance-ar-and-vision`
- `/about`
- `/contact`
- `/resume`, minimal resume download page

Secondary page:

- `/notes`

Navigation labels still come from the route manifest. `navHref` overrides send Work, About and Contact to homepage anchors while canonical SEO paths remain the standalone route paths. Retired Interview, Principles and Challenges routes redirect through `next.config.ts`, stay out of nav and sitemap, and remain marked noindex.

## Stack

- Next.js App Router
- TypeScript
- React Server Components by default
- Tailwind CSS through `@tailwindcss/postcss`
- Typed content modules under `src/content/`
- Route authority in `src/lib/routes.ts`
- Local validation scripts under `scripts/`

Local fonts are loaded through `next/font/local` from `src/app/fonts/`. Keep the bundled font license notices in that directory when changing font assets.

## Local development

Install dependencies:

```bash
npm install
```

Start the app locally:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Open:

```text
http://127.0.0.1:3000
```

## Content model

Most public copy is typed data, not ad hoc page text.

- `src/content/profile.ts`, name, headline, email, GitHub and canonical resume path
- `src/content/practice.ts`, homepage practice copy and resume-backed `recentWorkCases`
- `src/content/current-work.ts`, qualified engineering summaries, public projects and completed evaluations
- `docs/evidence/current-systems.md`, anonymized summary source, not independently reproducible public code
- `docs/evidence/current-methods.md`, anonymized implemented and shipped engineering, with explicit experiment and operational limits
- `src/content/proof.ts`, approved proof claims with resume, public artifact or sanitized-summary provenance
- `src/content/metrics.ts`, public metrics tied to proof claims
- `src/content/case-studies.ts`, compatible case-study reference pages
- `src/content/about.ts`, about page content
- `src/content/notes.ts`, note index content

Rules to preserve:

- Route, nav, sitemap and redirect behavior come from `src/lib/routes.ts`.
- `recentWorkCases` retains the canonical-resume-only proof contract.
- New systems use a separate validated content lane with explicit maturity, scope limits and anonymized-summary labels. Public personal artifacts use reviewed public URLs.
- Engineering cards distinguish shipped systems and reporting from completed experiments and implemented journey evaluation. Numeric evidence stays in the separately validated metrics lane.
- Private-source systems and methods do not enter the assistant corpus; public positioning still uses the normal corpus build.
- Approval-gated private findings, unconfirmed authorship and unbuilt plans stay out of public content.
- Public metrics and company-specific claims must stay tied to approved proof metadata. Resume-backed metrics retain their existing source contract. Anonymous current-work aggregates use the separate `currentWorkMetrics` export and `docs/evidence/current-work-results.md`, with visible scope and uncertainty; they do not enter the assistant corpus.
- Synthetic or sanitized examples must keep appropriate public labels.
- Do not add private organization identities, raw customer data, secrets, proprietary prompts, internal rubrics, non-public screenshots or exact internal cost figures.

## Environment gates

Use `.env.example` as the template. Keep `.env.local` private and uncommitted.

- `/api/interview` is internal and default off. It only serves when `ENABLE_INTERVIEW_ASSISTANT_API=1`.
- Gemini assistance is server-side only and requires `ENABLE_GEMINI_ASSISTANT=1` plus `GEMINI_API_KEY`.
- Never expose `GEMINI_API_KEY` through a `NEXT_PUBLIC_` variable.
- GA4 analytics only run when `ENABLE_ANALYTICS=1`, `NEXT_PUBLIC_ANALYTICS_PROVIDER=google_analytics`, and `NEXT_PUBLIC_GA_MEASUREMENT_ID` are set.

## Resume chain

The canonical public resume served by the portfolio is:

```text
public/resume/Himadri_Mishra_Resume.pdf
```

The editable source lives in the sibling resume directory:

```text
../resume/main_ats.tex -> ../resume/main_ats.pdf -> public/resume/Himadri_Mishra_Resume.pdf
```

Build from `../resume` with the documented local TeX toolchain, then copy and compare the PDF before updating portfolio proof references:

```bash
latexmk -pdf -halt-on-error -interaction=nonstopmode main_ats.tex
cp main_ats.pdf ../himadri.dev/public/resume/Himadri_Mishra_Resume.pdf
cmp -s main_ats.pdf ../himadri.dev/public/resume/Himadri_Mishra_Resume.pdf
sha256sum main_ats.pdf ../himadri.dev/public/resume/Himadri_Mishra_Resume.pdf
```

## Verification

Use targeted checks while editing:

```bash
npm run typecheck
npm run lint
npm run test:privacy-contract
npm run format:check
npm run validate:content
npm run validate:routes
npm run validate:seo
npm run validate:confidentiality
npm run test:links
npm run test:routes-smoke
npm run test:api
```

Before claiming a broad portfolio change is complete, run:

```bash
npm run verify
npm audit --audit-level=moderate
```

Assistant corpus checks are still part of `npm run verify` because the internal API and deterministic fallback remain in the codebase, even though the public Interview surface is retired.

## Deployment

The project is configured for Vercel deployment from the connected repository. This README does not assert that any recent deployment has happened. Verify the current production state in Vercel before making release claims.
