# Design

## Source of truth

- Status: Active
- Last refreshed: 2026-09-11
- Primary product surfaces: Home, Work index, enabled case-study detail routes, About, Resume, Contact, Notes, shared navigation, shared footer.
- Evidence reviewed: `DESIGN.md`; `package.json`; `docs/portfolio_redesign_uiux_frontend_technical_design_doc.md`; `src/styles/globals.css`; `src/styles/home.css`; `src/styles/editorial.css`; `src/app/layout.tsx`; `src/app/page.tsx`; `src/components/layout/Navbar.tsx`; `src/components/layout/Footer.tsx`; `src/components/home/SelectedWork.tsx`; `src/components/home/CurrentWork.tsx`; `src/components/home/CaseStudyGrid.tsx`; `src/content/current-work.ts`; `docs/evidence/current-systems.md`; `docs/evidence/current-methods.md`; `scripts/test-design-http.ts`; `scripts/test-current-work.ts`; `docs/plans/agent-experience-first-design.md`.

## Brand

- Personality: Calm, technical, evidence-first, work-forward, and senior. The site should feel like an engineer's publication surface, not a product-marketing landing page.
- Trust signals: Recent shipped agent engineering, anonymous implemented-work summaries, public method labels, visible scope limits, route-level provenance gates, original portrait, source-grounded content, and restrained links to inspectable public work.
- Avoid: Decorative cards, gradients, fake dashboards, generic SaaS illustration, unsupported superlatives, current-client identities, private traces, raw reports, exact costs, PR counts, private repo locators, and unsupported metrics.

## Product goals

- Goals: Surface Agent Experience Engineer and AI Product Engineer together as the two primary headlines, with agent systems as the connective engineering focus. Let shipped access flows, state-based evaluation, discovery/retrieval measurement and reporting establish that identity.
- Non-goals: Do not turn the site into a full product blog, a confidential work archive, a flashy portfolio template, or a public reproduction of private systems.
- Success signals: Visitors can identify the primary recent work, understand which claims are shipped systems versus experiments versus delivery gates, reach public work and contact actions, and verify that private claims are scoped and anonymized.

## Personas and jobs

- Primary personas: Senior engineering hiring managers, startup founders, AI platform leads, applied AI team reviewers, technical recruiters, and collaborators evaluating public work.
- User jobs: Assess technical depth, understand recency, inspect public artifacts, understand current agent-systems implementation and consult older production work only as background, download the resume, and contact Himadri.
- Key contexts of use: Fast desktop review during candidate screening, mobile resume triage, public profile follow-up, and targeted review of work examples from shared links.

## Information architecture

- Primary navigation: Manifest-driven shell links only. Home is the narrative entry; Work links directly to the complete `/case-studies` archive; About, Resume, and Contact remain direct routes or anchors as configured by the route manifest.
- Core routes/screens: Home, `/case-studies`, enabled case-study detail pages, `/about`, `/resume`, `/contact`, `/notes`, navigation, and footer.
- Content hierarchy: Home: explicit Agent Experience Engineer and AI Product Engineer headlines; flagship state-based evaluation story; MCP authentication/onboarding; discovery/retrieval and insight reporting; compact additional agent systems; public writing; About/Contact. Work contains full detail with earlier production history last. `docs/plans/agent-experience-first-design.md` supersedes the historical highlight selection in `curated-portfolio.md`.

## Design principles

- Principle 1: Current career identity before historical metrics. Do not promote older work simply because its figures are easier to headline. Evidence before ornament. Every visual choice should make scoped proof, status, and next action easier to read.
- Principle 2: Publication, not pitch deck. The interface should read like a compact engineering record with strong hierarchy, not like a conversion funnel.
- Tradeoffs: Prefer plain text, hairlines, source labels, and section rhythm over dense visual widgets. Preserve confidentiality even when a stronger claim would be more persuasive.

## Visual language

- Color: Keep pearl background `#f6f7f8`, graphite text `#14232c`, secondary graphite `#3d4d56`, muted text `#65737b`, cobalt accent `#2855d8`, and darker cobalt interactive state `#1f43ae`. Use semantic CSS variables from `src/styles/globals.css` rather than new isolated values.
- Typography: Use local Go Sans for all primary text, with real 400 and 700 weights. Use Go Mono for small labels, status text, verification notes, section labels, and figure captions. Do not introduce serif display typography.
- Spacing/layout rhythm: Centered editorial container, clear section gaps and restrained rules. Give the current flagship a broad 7:5 text/figure split, followed by horizontal project rows. Do not reuse equal promise cards or oversized empty hero space.
- Shape/radius/elevation: Flat hairline divisions are the default. Avoid decorative card chrome. The approved portrait remains a small rounded frame, 120px desktop and 72px mobile, with the existing crop.
- Motion: Minimal transitions for links, borders, background, and opacity using existing duration and easing variables. No animated dashboards or motion that competes with evidence labels.
- Imagery/iconography: Keep the original portrait. Allow one static, explicitly conceptual evaluation-structure figure beside the flagship. No fabricated runtime screenshot, dashboard or decorative metrics.

## Components

- Existing components to reuse: `Navbar`, `Footer`, `Hero`, `SelectedWork`, `WritingFeature`, `ReviewedSystems`, `AgentToolsAndEvaluation`, `PublicWork`, `AllCaseStudies`, `ContactCTA`, `ContactActions`, `TrackedLink`.
- New/changed components: Recompose SelectedWork around a flagship and supporting engineering stories. Reuse shell, contact and evidence patterns; do not preserve the rejected equal-card composition merely for component reuse.
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
- Layout adaptations: The flagship split and supporting rows become one reading column on phones, text before the figure. No horizontal figure scrolling. Preserve the responsive portrait and About/Contact layout.
- Touch/hover differences: Do not rely on hover to reveal essential information. Link affordances and focus states must remain visible on touch and keyboard.

## Interaction states

- Loading: Static portfolio content should render without custom loading states. Dynamic assistant behavior remains gated and is not part of the public design unless enabled by environment flags.
- Empty: Do not publish empty routes, coming-soon pages, or placeholder cards.
- Error: Failed optional integrations should preserve deterministic, source-grounded fallbacks and avoid exposing private data.
- Success: Successful navigation, contact actions, resume download, and public project links should use standard link behavior with analytics limited to coarse portfolio events.
- Disabled: Disabled, deferred, retired, internal, and API routes must stay out of public navigation and sitemap.
- Offline/slow network, if applicable: Core content should remain server-rendered and readable without client-side hydration-dependent disclosure.

## Content voice

- Tone: Specific, measured, technical, and personally accountable. Lead with what was built, not broad capability promises. Use Agent Experience Engineer and AI Product Engineer as identities, not a claim about future market demand.
- Terminology: Use explicit labels such as implemented service, shipped system, controlled experiment, technical design, anonymized summary, public project, scope, and limitation.
- Microcopy rules: No em dashes in authored content. Avoid vague claims. Scope every private or anonymous work claim. Distinguish shipped systems from experiments and delivery gates. Do not imply conversion, hosted-client parity, transport parity, causal adoption, or broad production rollout unless the proof model explicitly supports it.

## Implementation constraints

- Framework/styling system: Next.js App Router, TypeScript, React, Tailwind import path, local CSS files by route surface, and local Go font files through `next/font/local`.
- Design-token constraints: Use existing CSS custom properties and component classes. Do not add dependencies or a new design-system abstraction without an approved plan.
- Performance constraints: Keep graph, editor, assistant, and interactive work route-local. Home and Work must be prerendered at build time, with content, links and proof disclosures present before JavaScript. Keep the homepage lightweight and free of decorative client widgets.
- Compatibility constraints: Route manifest, proof metadata, confidentiality validation, assistant gates, and analytics privacy rules remain authoritative over presentation desires.
- Browser choice: Safari only for continued browser QA, per owner instruction. Do not launch Chrome or Chromium.
- Test/screenshot expectations: For release, run design HTTP contracts, privacy/current-work tests, route and content validation, full repository verification, HTTP asset checks, and desktop plus mobile visual inspection when available.

## Open questions

- [x] Recent agent engineering is the homepage focus; older production work stays at the end of Work.
- [x] Implement the flagship/row composition with both roles at the top and all broader work preserved in the archive.
- [x] Publication decision: Keep scoped routing-study, journey-inventory and harness-coverage aggregates on Work, not in the introductory homepage highlights.

## Shipped-work navigation refinement

- Evidence: The owner's homepage screenshot shows three system links reading like a footnote, with no explanation of what opens. The separate archive button has weak visual connection to them.
- Scope: Change only the additional shipped systems and Work gateway inside `SelectedWork`. Keep the flagship hierarchy, titles, archive anchors, proof labels and static rendering intact.
- Design: Group the area in one restrained, cobalt-ruled panel. Give each system a full clickable tile with its existing evidence-backed summary and a visible exploration cue. These are navigation tiles, not decorative capability cards. Use three columns on desktop and one column on narrow screens.
- Hierarchy: A clear section heading introduces the systems. Put the required disclosure below the tiles. Finish the same panel with a separated archive row and one cobalt primary action, making the full Work page the obvious next step.
- Interaction: Entire tiles are native links. Essential copy stays visible without hover. Hover and keyboard focus use border/background contrast and underlined action text, without motion or nested controls.
- Verification: First run existing privacy/curation regressions. Extend static markup and HTTP checks for summaries, complete clickable tiles, disclosures, valid destinations and the primary archive link. Run full verification and Safari visual/link checks before release.

## Work index readability reset

- Evidence: The owner's Work screenshots show a duplicated title, an offset hero followed by left-aligned sections, three competing columns of long text, and verification notes separated from the work they describe.
- Decision: Work becomes a compact index, not a collection of long case studies. Retire the four legacy detail routes with permanent redirects to their summaries on Work. Preserve the long-form source, proof records, current anchors and all work areas.
- Reading order: One title, one short introduction, four clear section links. Use the same bounded left edge for the header, navigation and sections. Recent agent work comes first, followed by shipped AI products, public work and short earlier-work summaries.
- Records: One primary record per row. Keep title, plain-language summary and short implementation bullets together. Scoped results sit beside that same record on wide screens and below it on phones. No three-column reading, hidden details, tab state or accordions.
- Copy: Explain what I built and what it does in short sentences. Keep necessary terms such as MCP, OAuth and API, but remove stacked abstractions and repeated caveats. Keep claims and their limits visible; use normal sans-serif text, not paragraphs of monospace notes.
- Supporting work: Use short, sequential entries rather than a title/summary/bullets layout spread across three columns. Earlier work stays secondary and has no detailed-study CTA.
- Guardrails: Keep static HTML, one H1, meaningful headings, all approved proof references and private-source labels. No em dashes. Use Safari only. Preserve Home's approved hierarchy and avoid changing unrelated pages' styling.
- Verification: Lock existing content/proof contracts before editing. Add regressions for one Work heading, all retained anchors, short copy, retired-detail redirects, and absence of the old multi-column structure. Check desktop and narrow Safari views plus full repository verification and live HTTP checks.

## Work cards: engineering depth and qualitative impact

Keep the current sequential card layout, stable anchors and static rendering. Plain language must explain the engineering, not make platform work sound like a small feature. Each agent-experience card should show the design idea and concrete implementation on the left, then impact and how it was checked on the right. Keep scope limits visible without repeating the full evidence report. Remove numeric result displays from these cards, while preserving the approved metric registry as source evidence.

Implementation plan: extend the typed method content with impact and measurement fields; restore concrete architecture and execution details; replace numeric panels with labeled qualitative outcomes; update provenance and regression tests; verify static HTML, full checks and Safari desktop/narrow layouts. Baseline privacy and rendering contracts passed before this change.

## Supporting work hierarchy

AI products follow agent experience without an intervening supporting-work block. Other work sits below AI products as three plain list items, before public work. Preserve contribution anchors, proof links and detailed source records, but do not render repeated implementation bullets and test disclosures for these smaller contributions. The source-check entry describes retrieved context, generated drafts, claim checking and human approval; do not assign it to a specific historical product without evidence.
