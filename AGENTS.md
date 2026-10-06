# AGENTS.md for himadri.dev

## Repository purpose

This repository contains himadri.dev, the personal site of Himadri Mishra: one homepage that shows what he works on now and what he did before, with a link for every claim, plus the resume.

## Technical stack

- Framework: Next.js App Router, statically prerendered
- Language: TypeScript
- UI: React server components
- Styling: the himadri.dev Design System, ported to `src/styles/design-system.css`, on top of Tailwind CSS v4 preflight
- Fonts: IBM Plex Sans and IBM Plex Mono through `next/font/google`
- Content model: typed modules under `src/content/`
- Route authority: `src/lib/routes.ts`
- Validation: local TypeScript scripts under `scripts/`
- Resume asset: `public/resume/Himadri_Mishra_Resume.pdf`

## Source files to read first

1. `docs/plans/portfolio-one-page-2026-10.md`
2. `src/content/site.ts`
3. `src/content/proof.ts`
4. `src/lib/routes.ts`
5. `src/lib/validation.ts`
6. `src/styles/design-system.css`

## Route model

Public routes:

- `/`
- `/resume`

Every other path from earlier versions is retired in `src/lib/routes.ts` and redirects permanently to the matching homepage section (`/#now`, `/#firecrawl`, `/#before`) or to `/`. There are no API routes.

## Route rules

- `src/lib/routes.ts` is the route manifest authority.
- `src/app/sitemap.ts` derives public URLs from the manifest.
- `src/app/robots.ts` must not block public routes.
- The header renders manifest nav routes; today that is only `/resume`.
- A retired route must have no `page.tsx` and must redirect to an enabled page.
- Do not publish empty routes, placeholder pages, or coming soon links.
- Run `npm run validate:routes` and `npm run test:routes-smoke` after route, nav, sitemap, robots, or redirect changes.

## Content and proof model

- Everything the site says lives in `src/content/site.ts`, in reading order.
- To add a side project, add a one-liner at the top of `now.also`. Leave out `href` while the repository is private; the name then renders as plain text.
- Every company-specific statement and every number references a claim in `src/content/proof.ts` through a `proof` id. Claims must be approved, public, and sourced from the current resume or a public URL.
- Merged pull requests and public repositories are their own proof: link them.
- Identity fields for metadata and structured data live in `src/content/profile.ts`.

## Messaging rules

`src/lib/validation.ts` enforces these, and `npm run validate:content` fails when they break.

- One message per layer: the punchline is the only h1 and appears once; the facts line appears once.
- Present tense for Mudita Studios and Agent Experience; "Previously" only for Firecrawl.
- No public job-search signal: no "open to", "hire me", or job-search email.
- No public email address.
- No Mudita Studios product names; describe what the work does.
- No retired metrics (48-72h, 10x, 93% to 98%). Knit reads "2-3 days to under an hour".
- No "(Contract)" labels and no per-block "anonymized summary" caveats; the footer carries one privacy line.

## Design system

- Source of truth: the claude.ai/design project "himadri.dev Design System". Its visual rules apply: pearl, graphite and one cobalt accent; IBM Plex; one 1080px column on one left edge; rules instead of cards; square corners; no shadows, gradients, or entrance animation; light only.
- `design-system/` is a git-ignored local copy of that project, for reference. Its readme's copy rules are older than `docs/plans/portfolio-one-page-2026-10.md`; where they differ, the plan wins.
- Use `hm-*` classes from `src/styles/design-system.css`. Site-specific patterns use `site-*` classes built only from its tokens. Avoid inline styles.

## Confidentiality constraints

Do not publish:

- customer names, raw customer data, or survey datasets
- proprietary prompts or internal evaluation rubrics
- non-public or internal dashboard screenshots
- exact internal cost figures or private deck outputs
- internal code or private repository names
- secrets, tokens, keys, endpoints, or infrastructure identifiers
- direct production traces

`npm run validate:confidentiality` scans site content for private identifiers, local paths, secrets, and currency amounts, and scans authored files for em dashes.

## Analytics gates

- The only analytics provider is Google Analytics 4.
- Analytics stays disabled unless `ENABLE_ANALYTICS=1`, `NEXT_PUBLIC_ANALYTICS_PROVIDER=google_analytics`, and `NEXT_PUBLIC_GA_MEASUREMENT_ID` are set.
- Use `trackPortfolioEvent` from `src/lib/analytics.ts` for coarse events only.
- Do not send names, emails, IP-derived identity, private content, or confidential content as event parameters.
- Do not add Sentry, session replay, error tracking SDKs, or other observability vendors.

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
npm run test:privacy-contract
npm run format:check
npm run validate:content
npm run validate:routes
npm run validate:seo
npm run validate:confidentiality
npm run validate:structured-data
npm run build
npm run test:links
npm run test:routes-smoke
npm run verify
npm audit --audit-level=moderate
```

`npm run test:design:http` checks a running server (set `CHECK_BASE_URL`, default `http://127.0.0.1:3010`).

## Dependency policy

- Keep the app on the existing Next.js, React, TypeScript, Tailwind, ESLint, Prettier, and TSX stack unless a plan explicitly approves a dependency.
- Do not add vector, RAG, graph, editor, analytics, or error tracking dependencies without an approved plan.
- Prefer local scripts and existing platform APIs before adding packages.

## Writing style for repository content

- Do not use em dashes in authored content.
- Use commas, colons, semicolons, parentheses, or simple hyphens instead.
- Keep content specific, evidence-backed, and technical.
- Avoid vague claims that are not backed by a proof claim or a public link.
