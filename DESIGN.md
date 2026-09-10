# Design

## Source of truth

- Status: Active
- Last refreshed: 2026-09-10
- Primary product surfaces: Home, Work index, enabled case-study detail routes, About, Resume, Contact, Notes, shared navigation, shared footer.
- Evidence reviewed: `DESIGN.md`; `package.json`; `docs/portfolio_redesign_uiux_frontend_technical_design_doc.md`; `src/styles/globals.css`; `src/styles/home.css`; `src/styles/editorial.css`; `src/app/layout.tsx`; `src/app/page.tsx`; `src/components/layout/Navbar.tsx`; `src/components/layout/Footer.tsx`; `src/components/home/RecentWork.tsx`; `src/components/home/CurrentWork.tsx`; `src/components/home/CaseStudyGrid.tsx`; `src/content/current-work.ts`; `docs/evidence/current-systems.md`; `docs/evidence/current-methods.md`; `scripts/test-design-http.ts`; `scripts/test-current-work.ts`.

## Brand

- Personality: Calm, technical, evidence-first, work-forward, and senior. The site should feel like an engineer's publication surface, not a product-marketing landing page.
- Trust signals: Resume-backed historical work, anonymous implemented-work summaries, public method labels, visible scope limits, route-level provenance gates, original portrait, source-grounded content, and restrained links to inspectable public work.
- Avoid: Decorative cards, gradients, fake dashboards, generic SaaS illustration, unsupported superlatives, current-client identities, private traces, raw reports, exact costs, PR counts, private repo locators, and unsupported metrics.

## Product goals

- Goals: Help a CTO, founder, hiring manager, or AI platform lead quickly understand Himadri's ability to design, ship, evaluate, recover, and explain AI and developer systems.
- Non-goals: Do not turn the site into a full product blog, a confidential work archive, a flashy portfolio template, or a public reproduction of private systems.
- Success signals: Visitors can identify the primary recent work, understand which claims are shipped systems versus experiments versus delivery gates, reach public work and contact actions, and verify that private claims are scoped and anonymized.

## Personas and jobs

- Primary personas: Senior engineering hiring managers, startup founders, AI platform leads, applied AI team reviewers, technical recruiters, and collaborators evaluating public work.
- User jobs: Assess technical depth, understand recency, inspect public artifacts, compare historical production experience with current agent-systems work, download the resume, and contact Himadri.
- Key contexts of use: Fast desktop review during candidate screening, mobile resume triage, public profile follow-up, and targeted review of work examples from shared links.

## Information architecture

- Primary navigation: Manifest-driven shell links only. Home is the narrative entry; Work links directly to the complete `/case-studies` archive; About, Resume, and Contact remain direct routes or anchors as configured by the route manifest.
- Core routes/screens: Home, `/case-studies`, enabled case-study detail pages, `/about`, `/resume`, `/contact`, `/notes`, navigation, and footer.
- Content hierarchy: Home is curated: Hero, three Selected work highlights, contextual Writing feature, About and Contact. Work is the full archive: Agent tools and evaluation, AI workflows and safeguards, Production case studies, Writing and open source. See `docs/plans/curated-portfolio.md`, which supersedes the earlier mirrored-homepage publication layout.

## Design principles

- Principle 1: Evidence before ornament. Every visual choice should make scoped proof, status, and next action easier to read.
- Principle 2: Publication, not pitch deck. The interface should read like a compact engineering record with strong hierarchy, not like a conversion funnel.
- Tradeoffs: Prefer plain text, hairlines, source labels, and section rhythm over dense visual widgets. Preserve confidentiality even when a stronger claim would be more persuasive.

## Visual language

- Color: Keep pearl background `#f6f7f8`, graphite text `#14232c`, secondary graphite `#3d4d56`, muted text `#65737b`, cobalt accent `#2855d8`, and darker cobalt interactive state `#1f43ae`. Use semantic CSS variables from `src/styles/globals.css` rather than new isolated values.
- Typography: Use local Go Sans for all primary text, with real 400 and 700 weights. Use Go Mono for small labels, status text, verification notes, section labels, and figure captions. Do not introduce serif display typography.
- Spacing/layout rhythm: Keep the compact editorial rhythm: a centered container, strong section gaps, one top rule per work grid, and 220px label columns with 30px desktop gutters on secondary rows.
- Shape/radius/elevation: Flat hairline divisions are the default. Avoid decorative card chrome. The approved portrait remains a small rounded frame, 144px desktop and 96px mobile, with the existing crop.
- Motion: Minimal transitions for links, borders, background, and opacity using existing duration and easing variables. No animated dashboards or motion that competes with evidence labels.
- Imagery/iconography: Keep the original portrait. Omit decorative system sketches from the introductory cards; technical diagrams belong with detailed case studies. Diagrams remain illustrative, not product guarantees.

## Components

- Existing components to reuse: `Navbar`, `Footer`, `Hero`, `SelectedWork`, `WritingFeature`, `ReviewedSystems`, `AgentToolsAndEvaluation`, `PublicWork`, `AllCaseStudies`, `ContactCTA`, `ContactActions`, `TrackedLink`.
- New/changed components: No new visual system is required for implemented-work publication. If cards need richer evidence callouts, extend existing `work-column`, `work-status`, `verification`, and `work-source` patterns instead of introducing a separate card language.
- Variants and states: Work cards must show title, status, summary, scope or limitation, and public label when sourced from anonymous or private work. Links use existing hover underline, visible focus ring, and manifest-safe hrefs. Contact actions stay 44px high with existing color roles.
- Token/component ownership: `src/styles/globals.css` owns tokens; `home.css` owns homepage composition; `editorial.css` owns route-level editorial surfaces. `src/lib/routes.ts` remains the route authority.

## Accessibility

- Target standard: WCAG 2.1 AA practical baseline for text contrast, landmarks, headings, focus, and keyboard navigation.
- Keyboard/focus behavior: Preserve the skip link, one `main` landmark, sticky navigation, and visible `:focus-visible` outline. All public links and contact actions must be reachable by keyboard.
- Contrast/readability: Text and buttons must stay at least 4.5:1 where required. Cobalt labels are acceptable only on the pearl shell or similarly light backgrounds.
- Screen-reader semantics: Use semantic `section`, `article`, `h1`, `h2`, `h3`, `nav`, `main`, and `footer` landmarks. Each section needs an accessible heading or label. Avoid status-only color communication.
- Reduced motion and sensory considerations: Keep motion minimal enough that reduced-motion overrides are rarely needed. If new animation is added, provide a `prefers-reduced-motion` fallback.

## Responsive behavior

- Supported breakpoints/devices: Desktop around 1440px, wide desktop above 1441px, tablet and narrow layouts at 1100px and below, and mobile around 390px.
- Layout adaptations: Homepage highlight columns stack at 1100px and below; detailed Work grids stack at 900px. Hero portrait and copy collapse cleanly on mobile. Historical, About, and Contact rows move from the 220px label column to one column.
- Touch/hover differences: Do not rely on hover to reveal essential information. Link affordances and focus states must remain visible on touch and keyboard.

## Interaction states

- Loading: Static portfolio content should render without custom loading states. Dynamic assistant behavior remains gated and is not part of the public design unless enabled by environment flags.
- Empty: Do not publish empty routes, coming-soon pages, or placeholder cards.
- Error: Failed optional integrations should preserve deterministic, source-grounded fallbacks and avoid exposing private data.
- Success: Successful navigation, contact actions, resume download, and public project links should use standard link behavior with analytics limited to coarse portfolio events.
- Disabled: Disabled, deferred, retired, internal, and API routes must stay out of public navigation and sitemap.
- Offline/slow network, if applicable: Core content should remain server-rendered and readable without client-side hydration-dependent disclosure.

## Content voice

- Tone: Specific, measured, technical, and personally accountable.
- Terminology: Use explicit labels such as implemented service, shipped system, controlled experiment, technical design, anonymized summary, public project, scope, and limitation.
- Microcopy rules: No em dashes in authored content. Avoid vague claims. Scope every private or anonymous work claim. Distinguish shipped systems from experiments and delivery gates. Do not imply conversion, hosted-client parity, transport parity, causal adoption, or broad production rollout unless the proof model explicitly supports it.

## Implementation constraints

- Framework/styling system: Next.js App Router, TypeScript, React, Tailwind import path, local CSS files by route surface, and local Go font files through `next/font/local`.
- Design-token constraints: Use existing CSS custom properties and component classes. Do not add dependencies or a new design-system abstraction without an approved plan.
- Performance constraints: Keep graph, editor, assistant, and interactive work route-local. Home and Work must be prerendered at build time, with content, links and proof disclosures present before JavaScript. Keep the homepage lightweight and free of decorative client widgets.
- Compatibility constraints: Route manifest, proof metadata, confidentiality validation, assistant gates, and analytics privacy rules remain authoritative over presentation desires.
- Test/screenshot expectations: For release, run design HTTP contracts, privacy/current-work tests, route and content validation, full repository verification, HTTP asset checks, and desktop plus mobile visual inspection when available.

## Open questions

- [x] Work is the complete archive; Home intentionally presents only three highlights and one writing feature.
- [x] Publication decision: Keep scoped routing-study, journey-inventory and harness-coverage aggregates on Work, not in the introductory homepage highlights.
