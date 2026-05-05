# Portfolio SEO and indexing compliance ralplan

## Status

Approved for implementation after Planner, Architect, and Critic review.

## Purpose

Make `himadri.dev` technically easy to crawl, index, inspect, and understand without turning the portfolio into SEO theater. The work should improve metadata, sitemap truthfulness, robots safety, structured data, Search Console readiness, internal linking, and people-first proof quality.

This is not a ranking-growth project. It is truthful indexing hygiene plus portfolio trust quality.

## Source guidance

Official Google guidance used for this plan:

- Google SEO Starter Guide: titles, snippets, crawl discovery, and user-first SEO basics.
- Google title links guidance: every page should have descriptive, concise title text.
- Google snippets guidance: page-specific meta descriptions can help Google choose useful snippets.
- Google sitemap guidance: sitemaps help discovery but do not guarantee crawling or indexing.
- Google robots.txt guidance: robots can include a fully qualified sitemap URL and controls crawling, not ranking.
- Google structured data guidance: JSON-LD is recommended, but markup must match visible page content and avoid misleading claims.
- Google helpful content guidance: content should be helpful, reliable, people-first, and based on genuine expertise.
- Search Console URL Inspection guidance: use live tests, canonical checks, and request indexing for priority changed URLs.

## Current repo evidence

- `src/lib/routes.ts` is already the route exposure authority.
- `src/app/sitemap.ts` derives from `publicRoutes`, which is correct, but uses `new Date()` for every route. This makes every page look modified on every build or request.
- `src/app/robots.ts` allows public routes and publishes the sitemap URL.
- `src/app/layout.tsx` has root metadata, OpenGraph, Twitter metadata, and root JSON-LD.
- Most public pages have title and description metadata, but page-level canonical and OpenGraph fields are not consistently route-bound.
- `src/lib/structured-data.ts` emits only `Person` and `WebSite` nodes.
- `scripts/validate-structured-data.ts` only allows `Person` and `WebSite`.
- `/api/interview` is correctly excluded from sitemap and nav in `src/lib/routes.ts`, but `src/app/api/interview/route.ts` should also emit `X-Robots-Tag: noindex, nofollow` on every response path.
- There is no blog route. Adding one only for keywords would violate the current no-placeholder and evidence-first rules.

## Planning decision

Implement a route-governed SEO contract with conservative structured data, deterministic sitemap metadata, API noindex headers, local validators, and a Search Console runbook.

Defer blogs or writing routes until there are original, evidence-backed posts ready to publish. Do not implement low-quality backlink, guest-post, social-signal, or Google Business Profile hacks.

## Non-goals

- Do not add `/blog`, `/writing`, or any content route until real original posts exist.
- Do not add `/hiring-packet` to sitemap, nav, structured data, or internal links.
- Do not add `/api/interview` to sitemap, nav, structured data, canonical links, or public links.
- Do not add LocalBusiness, JobPosting, FAQ, Review, Product, Course, Organization, or Article schema unless visible content and Google guidelines support it.
- Do not add dependencies.
- Do not create profile backlink automation, directory submissions, link exchanges, or social posting logic.

## Implementation plan

### Phase 1: SEO registry and metadata builders

Create `src/lib/seo.ts`.

Required registry fields for every enabled public page route:

- `path`
- `title`
- `description`
- `canonicalPath`
- `openGraphTitle`
- `openGraphDescription`
- `lastModified`

Rules:

- Registry keys must match enabled public page paths from `publicRoutes`.
- Registry must not contain `/api/interview`, `/hiring-packet`, disabled routes, deferred routes, or external URLs.
- `lastModified` must be a stable ISO date string that reflects a meaningful content or metadata update.
- `canonicalPath` must equal the public route path.
- Use `siteConfig.url` to build absolute canonical URLs.
- Keep route manifest authority in `src/lib/routes.ts`. The SEO registry consumes the route manifest, it does not replace it.

Add helper functions:

- `getRouteSeo(path)`
- `buildCanonicalUrl(path)`
- `buildPageMetadata(path)`
- `buildOpenGraphMetadata(path)`

### Phase 2: Migrate page metadata

Update public page metadata to use the SEO registry:

- `src/app/page.tsx`
- `src/app/case-studies/page.tsx`
- `src/app/case-studies/[slug]/page.tsx`
- `src/app/resume/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/interview-me/page.tsx`
- `src/app/principles/page.tsx`
- `src/app/challenges/page.tsx`
- `src/app/challenges/debug-this-agent/page.tsx`
- `src/app/challenges/cost-anatomy/page.tsx`
- `src/app/challenges/dag-execution-simulator/page.tsx`
- `src/app/challenges/deck-ir-previewer/page.tsx`

Each public page should emit:

- title
- description
- `alternates.canonical`
- route-specific OpenGraph title, description, and URL

Keep the global OG image unless route-specific images are intentionally created later.

### Phase 3: Fix sitemap truthfulness

Update `src/app/sitemap.ts` to use the SEO registry:

- Keep deriving sitemap entries from `publicRoutes`.
- Use `new Date(routeSeo.lastModified)` instead of `new Date()`.
- Keep disabled, deferred, internal, and API routes excluded.
- Keep `changeFrequency` and `priority` only as harmless hints. Do not treat them as ranking levers.

Acceptance:

- Sitemap output is deterministic across two builds when content does not change.
- `/api/interview` and `/hiring-packet` never appear in sitemap XML.

### Phase 4: Add API noindex headers

Update `src/app/api/interview/route.ts`.

All responses must include:

```txt
X-Robots-Tag: noindex, nofollow
Cache-Control: no-store
```

Response paths to cover:

- disabled `404`
- rate-limited `429`
- invalid JSON `400`
- missing question `400`
- non-string question `400`
- empty question `400`
- too-long question `400`
- success `200`

Add or update API tests so `npm run test:api` confirms this header behavior.

### Phase 5: Conservative structured data expansion

Update `src/lib/structured-data.ts`.

Allowed additions:

- `ProfilePage` for the homepage or profile-like root page.
- `WebPage` for public pages.
- `BreadcrumbList` for nested public pages.

Case studies should start with `WebPage` plus breadcrumbs. Add `CreativeWork` only if every field maps to visible content and passes validation. Do not add `Article` unless the page visibly has article semantics such as author, published or modified dates, headline, and representative image.

Structured data rules:

- JSON-LD must only describe visible page content.
- JSON-LD must not include private routes, internal routes, secrets, env key names, customer names, private traces, or exact costs.
- `sameAs` should only include real public profiles such as LinkedIn and GitHub.

### Phase 6: Validators

Add `scripts/validate-seo.ts` and `npm run validate:seo`.

Required checks:

- Every `publicRoutes` entry has SEO registry data.
- SEO registry has no extra internal, disabled, deferred, API, or unknown route.
- Title and description are present and non-empty.
- Canonical paths match enabled public routes.
- OpenGraph title, description, and URL exist.
- `lastModified` is a stable ISO date, not current runtime date generation.
- No duplicate route titles unless deliberately allowlisted.
- No em dashes in authored SEO strings.
- No `/api/interview`, `/hiring-packet`, `localhost`, secrets, env names, or private-looking tokens in SEO output.

Update `scripts/validate-structured-data.ts`:

- Expand allowed node types only for implemented schema.
- Expand allowed keys only for implemented schema.
- Validate all route-level JSON-LD helpers, not only root JSON-LD.
- Keep confidentiality and route leakage checks.

Add `validate:seo` to `npm run verify` after `validate:routes` and before `validate:structured-data`.

### Phase 7: Heading and internal-link hygiene

Audit H1 and H2 structure across public pages.

Acceptance:

- Every public page has exactly one clear H1.
- H2 sections follow page hierarchy and do not skip into decorative heading chaos.
- Links between related proof pages are crawlable anchor links, not button-only JavaScript behavior.
- Case studies link to relevant principles and challenges where useful.
- Challenges link back to relevant case studies only when the connection is honest and visible.

Do not add keyword stuffing or hidden links.

### Phase 8: Search Console and off-site runbook

Create `docs/seo-search-console-runbook.md`.

Include:

- Verify the canonical property for `https://himadri.dev` or the selected canonical host.
- Submit `https://himadri.dev/sitemap.xml`.
- Inspect priority URLs with URL Inspection.
- Run live test after deploy.
- Check Google-selected canonical.
- Request indexing only for priority changed pages.
- Run Rich Results Test for structured data pages.
- Update GitHub and LinkedIn profiles to point to the canonical domain.
- Treat social posts as distribution, not indexing signals.
- Avoid spam guest posts, low-quality profile backlinks, link exchanges, and listing threads.

## Acceptance criteria

- All enabled public routes have title, description, canonical, OpenGraph metadata, and stable `lastModified` data.
- Sitemap is deterministic and derived from enabled public page routes only.
- Robots includes the sitemap URL and does not block enabled public routes.
- `/api/interview` emits `X-Robots-Tag: noindex, nofollow` on every response path.
- Root and route-level JSON-LD only describe visible public content.
- Structured data includes no private routes, secrets, customer data, internal implementation terms, or unsupported schema claims.
- Search Console runbook exists and clearly separates code work from manual verification.
- No blog or writing route is added without real original content.
- No new dependencies are added.

## Verification commands

Run after implementation:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run validate:content
npm run validate:routes
npm run validate:seo
npm run validate:confidentiality
npm run validate:structured-data
npm run test:api
npm run build
npm run test:links
npm run test:routes-smoke
npm run verify
```

Manual or curl checks:

```bash
curl -s https://himadri.dev/robots.txt
curl -s https://himadri.dev/sitemap.xml
curl -I https://himadri.dev/api/interview
```

For local verification, use the deployed domain for final Search Console checks because localhost is not what Google indexes.

## Recommended execution order

1. Implement `src/lib/seo.ts` and `scripts/validate-seo.ts`.
2. Migrate page metadata to the registry.
3. Fix sitemap `lastModified`.
4. Add `/api/interview` noindex headers and API tests.
5. Expand structured data conservatively.
6. Expand structured data validation.
7. Add heading and internal-link hygiene fixes.
8. Add the Search Console runbook.
9. Run full verification.

## Risks

- Over-markup can look spammy and may make structured data ineligible.
- Inaccurate sitemap dates can reduce crawler trust in `lastModified`.
- Thin blog content would weaken the portfolio's evidence-first positioning.
- Internal assistant routes must not become crawlable public surfaces.
- SEO validators should prevent drift without turning every copy change into an over-strict failure.

## Implementation staffing

For sequential execution:

- `executor`: SEO registry, metadata migration, sitemap, API headers, validators.
- `verifier`: route output, sitemap output, robots output, API header paths, structured data leak checks.
- `code-reviewer`: conservative schema scope, route authority, confidentiality, no-new-dependency, and no-em-dash review.

For parallel execution:

- Lane 1: metadata registry, page metadata, sitemap.
- Lane 2: API noindex headers and tests.
- Lane 3: structured data helpers and validators.
- Lane 4: docs runbook and internal-link copy pass.

The final integration owner must run full verification before commit.

## Implementation completion status

Updated during the team implementation pass on 2026-05-05.

- [x] Phase 1: SEO registry and metadata builders implemented in `src/lib/seo.ts`.
- [x] Phase 2: Public page metadata migrated to the route-bound SEO registry.
- [x] Phase 3: Sitemap uses stable route `lastModified` values instead of runtime dates.
- [x] Phase 4: `/api/interview` emits noindex and nofollow robot headers on API response paths, with API tests updated.
- [x] Phase 5: Conservative JSON-LD helpers added for profile, web page, and breadcrumb data.
- [x] Phase 6: SEO and structured-data validators cover route leakage, canonical paths, private strings, and deterministic sitemap output.
- [x] Phase 7: Public route JSON-LD rendering added for nested public pages and route discoverability hygiene preserved.
- [x] Phase 8: Search Console and indexing runbook added at `docs/seo-search-console-runbook.md`.
- [x] Acceptance criteria: covered by `npm run validate:seo`, `npm run validate:structured-data`, `npm run test:api`, route validation, confidentiality validation, lint, format, and build verification.
