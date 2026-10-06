# AGENTS.md for himadri.dev

## Repository purpose

This repository contains himadri.dev, the personal site of Himadri Mishra: one homepage that shows what he works on now and what he did before, with a link for every claim, plus the resume.

## Technical stack

- Framework: Next.js App Router, statically prerendered
- Language: TypeScript
- UI: React server components
- Styling: the himadri.dev Design System in `design-system/`, imported by `src/styles/globals.css` on top of Tailwind CSS v4 preflight; React components in `src/components/ds/`
- Fonts: IBM Plex Sans and IBM Plex Mono through `next/font/google`
- Content model: typed modules under `src/content/`
- Route authority: `src/lib/routes.ts`
- Validation: local TypeScript scripts under `scripts/`
- Resume assets: `public/resume/Himadri_Mishra_Resume.pdf` (one-page resume, the default download) and `public/resume/Himadri_Mishra_CV.pdf` (two-page CV, the complete record). Both are built in the `resume` repository; proof locators point at the CV. `/resume` shows the one-page resume (`DocumentPages`, page images in `public/resume/pages/`) with a primary download and a quiet link to the CV, rendered from the PDFs with `pdftoppm -png -scale-to-x 2000 -scale-to-y -1`; regenerate them whenever a PDF changes.

## Source files to read first

1. `docs/plans/portfolio-one-page-2026-10.md`
2. `src/content/site.ts`
3. `src/content/proof.ts`
4. `src/lib/routes.ts`
5. `src/lib/validation.ts`
6. `design-system/readme.md`

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
- Lead with impact, as before-and-after percentages where a measurement exists. Not everything needs a number: describe a system by what it does and what it led to. Do not lead with pull request, commit or fix counts. Keep figures at body size in the text, never as large display numbers; only card titles are set large.
- Every company-specific statement and every number references a claim in `src/content/proof.ts` through a `proof` id. Claims must be approved and public, and sourced from the current resume, a public URL, or a `work-record` (the owner's description of private work by what it does). A `work-record` claim is the owner's own account and stands on its own; it may not carry figures, so every number needs the resume or a public source. Never name private repositories in a source.
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
- No "(Contract)" labels and no meta notes about the page ("client work is private", "not public", "a few highlights"). Describe the work and its impact; leave out what is hidden.

## Design system

- `design-system/` is the himadri.dev Design System and the single source for the site's look. Read `design-system/readme.md` before any UI change.
- `src/styles/globals.css` imports its tokens, `components/components.css` and `components/additions.css` directly. Do not copy design-system CSS into `src/`.
- Build pages from the typed components in `src/components/ds/` (`Panel`, `Tile`, `NoteTile`, `Ledger`, `OneLiners`, `MetricTiles`, `WorkCards`, `Launches`, `Refs`, `RefGroups`, `Years`, `Subhead`, `Button`, `ArrowLink`, `InlineLinks`, `SocialLinks`). They emit only documented `hm-*` classes. Avoid inline styles and one-off classes.
- To add a pattern: add its CSS to `design-system/components/additions.css`, a component to `src/components/ds/`, and a row to the readme's "v3 additions" table, then use it.
- Visual rules: pearl, graphite and one cobalt accent; IBM Plex Sans, with Plex Mono only for indices, labels, dates, status, provenance and figures; one 1080px column on one left edge; square corners; no shadows, gradients or entrance animation; light only.
- Sections are framed panels with the label cut into the top edge. Inside a panel, space and soft fills separate things; do not add horizontal rules.
- Icons: the only icons are the header marks in `src/components/ds/SocialLinks.tsx`: the Agent Experience AX monogram (official raster mark, never recoloured) and the GitHub, LinkedIn and X brand marks (Simple Icons paths, CC0). Add no others without updating the design system readme.
- The hero fills the first screen with a `Ledger` of shipped work beside the statement; its "Recent work" button scrolls to section 01.
- `design-system/ui_kits/` (the retired six-page site) is git-ignored. `design-system/SYNC.md` records how the folder differs from the claude.ai/design project; push changes back with `/design-sync`.

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
