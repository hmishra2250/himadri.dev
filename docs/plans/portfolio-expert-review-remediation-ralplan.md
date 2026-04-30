# Portfolio expert review remediation ralplan

## Status

Planner revision 2 drafted on 2026-04-30 after Architect requested iteration on acceptance precision.

Source review: `docs/plans/claude_opus_v2_review.md`

## Requirements summary

The expert review says the portfolio foundation is strong, but the public experience still feels too much like documentation and not enough like a system artifact. The remediation should preserve the existing proof, route, assistant, analytics, Gemini, and confidentiality governance while making the site more visceral, visitor-facing, and conversion-clear.

The concrete issues to resolve are:

1. Live System Pulse has defensive meta-copy.
2. Live System Pulse is static instead of streaming or progressively revealing trace spans.
3. Nav is cluttered by a hardcoded Thinking anchor and should separate nav exposure from route availability.
4. Hiring Fit is missing three design-doc signals.
5. Principles is missing the non-AI judgment principle.
6. Hero has too many CTAs.
7. Homepage and challenge copy leaks internal phase and gate language.
8. Contact page needs segmented visitor guidance.
9. OG and Twitter social preview image is missing.
10. Trace model labels look like placeholders.
11. Case Study Grid gives weaker and stronger studies equal visual weight.
12. Proof Wall gives all metrics equal weight.
13. SourceBadge exposes internal confidence taxonomy.
14. Trace row mobile layout needs 375px verification and likely layout cleanup.
15. Section `aria-labelledby` usage should point to actual heading text, not grids or card containers.

## RALPLAN-DR summary

### Principles

1. Make the portfolio feel like evidence, not a project status report.
2. Preserve truthfulness, proof backing, and confidentiality.
3. Prefer no-dependency remediation using content, CSS, metadata, and existing route systems.
4. Do not regress route, assistant, Gemini, analytics, sitemap, nav, or robots governance.
5. Improve conversion clarity by reducing competing CTAs and removing internal jargon.

### Decision drivers

1. The highest impact gap is experiential: Live System Pulse must feel like an observability artifact.
2. The strongest hiring signal depends on visitor-facing proof hierarchy, not internal implementation language.
3. The safest implementation path is narrow public-surface remediation with strong validation and browser QA.

### Viable options

| Option | Description | Pros | Cons | Decision |
|---|---|---|---|---|
| A | Minimal copy and accessibility polish only | Fastest, lowest risk | Leaves Live System Pulse static and misses the main review concern | Rejected |
| B | No-dependency public-surface remediation | Resolves all expert findings while preserving existing architecture and gates | Touches many public surfaces and needs careful QA | Chosen |
| C | Larger redesign with animation or OG dependencies and route rollback | Could create more dramatic polish | Higher regression risk, dependency drift, and unnecessary route churn | Rejected |

## ADR

### Decision

Adopt Option B: a no-dependency public-surface remediation focused on Live System Pulse, navigation, hero CTAs, visitor-facing copy, missing content signals, proof hierarchy, contact segmentation, social preview metadata, and accessibility.

### Drivers

- The review validates the architecture but criticizes the experiential layer.
- The issues are mostly copy, CSS, metadata, content, and accessibility, not platform architecture.
- Existing route, proof, assistant, GA4, Gemini, and confidentiality gates should be preserved.

### Alternatives considered

- Minimal copy polish. Rejected because it would not make the trace viewer feel like a system artifact.
- Route rollback. Rejected because V1.5 and V2c routes are now implemented and verified; nav decluttering should not automatically mean route disabling.
- New animation or OG dependencies. Rejected because CSS and static assets are sufficient for this pass.

### Why chosen

This path directly addresses the expert review while keeping the implementation small, reversible, proof-backed, and compatible with the repository validation model.

### Consequences

- Public surfaces become sharper and more experiential.
- Several files across home, content, contact, metadata, and styles will change.
- Browser QA is required, especially for trace animation, reduced motion, and 375px mobile layout.
- The plan keeps `/api/interview` internal, gated, out of sitemap, and out of nav.

### Follow-ups

1. Revisit nav order only after analytics shows real visitor behavior.
2. Consider a richer OG asset later if the static asset underperforms.
3. Plan a deeper challenge UX pass separately if challenge engagement is low.

## Phase 0: baseline guardrails

### Goal

Lock the current governance state before editing public surfaces.

### Actions

1. Run baseline checks:
   - `npm run validate:routes`
   - `npm run validate:content`
   - `npm run validate:confidentiality`
   - `npm run typecheck`
2. Inspect current route state:
   - `/`
   - `/contact`
   - `/challenges`
   - `/challenges/dag-execution-simulator`
   - `/challenges/deck-ir-previewer`
   - `/interview-me`
3. Confirm these are not changed by the remediation:
   - `/api/interview` remains internal, no sitemap, no nav, noindex.
   - `ENABLE_INTERVIEW_ASSISTANT_API` remains the server API gate.
   - `NEXT_PUBLIC_ENABLE_INTERVIEW_ASSISTANT` remains the live UI gate.
   - GA4 remains coarse-event-only and gated.
   - Gemini remains server-side and gated.

### Acceptance criteria

- Baseline checks pass before implementation.
- Current route state is documented in the execution notes.
- Any later route enablement or disablement is treated as a separate explicit decision.

## Phase 1: Live System Pulse, trace layout, nav, and hero

### Goal

Fix the most visible experiential and conversion problems first.

### Files likely touched

- `src/components/home/LiveSystemPulse.tsx`
- `src/content/traces.ts`
- `src/styles/globals.css`
- `src/components/layout/Navbar.tsx`
- `src/components/home/Hero.tsx`

### Actions

1. Remove the defensive Live System Pulse heading copy.
   - Keep the eyebrow `Live System Pulse`.
   - Add or keep a real accessible heading that describes the trace artifact without meta-commentary.
   - Keep the sanitized representative `traceLabel` visible.
2. Add CSS-only progressive trace reveal.
   - Use row-level CSS variables or `nth-child` delays.
   - Use a restrained opacity, translate, or highlight animation.
   - Add only subtle dot pulse if it improves signal without looking theatrical.
   - Under `prefers-reduced-motion: reduce`, disable animation and show all rows immediately.
3. Replace placeholder trace model labels in `src/content/traces.ts`.
   - Replace `planner-model` and `judge-model` with sanitized capability or class labels.
   - Acceptable examples: `premium-reasoning`, `fast-verifier`, `claude-sonnet`, `gemini-pro-class`.
   - Do not imply exact live model routing or leak internals.
4. Improve trace mobile layout.
   - At 375px, rows should be readable without summary text squeezed into a narrow second column.
   - Prefer stacked label/value groups or a compact two-line layout.
5. Remove the hardcoded `Thinking` link from `Navbar.tsx`.
   - Keep nav manifest-driven through `navRoutes`.
   - Do not disable routes as part of nav cleanup unless explicitly planned in a separate route pass.
6. Reduce hero CTAs to three.
   - Keep `Explore systems I built`.
   - Keep `Interview me`.
   - Keep `Download resume`.
   - Remove `Start a conversation` from the hero only. Contact remains in nav and bottom CTA.

### Acceptance criteria

- Live System Pulse no longer contains defensive meta-copy.
- Trace rows reveal progressively in normal motion mode.
- Reduced-motion mode shows all rows without reveal animation.
- Trace model labels are credible sanitized labels.
- 375px mobile trace layout is readable.
- Navbar has no hardcoded Thinking anchor.
- Hero has no more than three CTAs.
- No route is disabled just to reduce nav clutter.

## Phase 2: visitor-facing copy, source labels, and shared section accessibility

### Goal

Remove internal status language and fix section labeling patterns across shared homepage sections.

### Files likely touched

- `src/components/home/InterviewMePreview.tsx`
- `src/components/home/ChallengesPreview.tsx`
- `src/components/home/ProofWall.tsx`
- `src/components/home/HiringFitMatrix.tsx`
- `src/components/home/HowIThink.tsx`
- `src/components/home/DecisionTheaterPreview.tsx`
- `src/components/home/CaseStudyGrid.tsx`
- `src/components/ui/SectionHeader.tsx`
- `src/components/ui/SourceBadge.tsx`
- `src/app/challenges/page.tsx`

### Actions

1. Rewrite internal preview copy.
   - Interview Me preview should say: `Ask the questions a senior AI screen would ask. Every answer cites evidence.`
   - Challenges preview should focus on production failures in traces, costs, retries, verification gaps, and artifact boundaries.
   - Proof Wall should keep `Metrics with context, not isolated numbers.` and remove implementation phrases such as `resume-backed`.
2. Replace visible phase labels on public challenge cards.
   - Use visitor labels such as `Trace diagnosis`, `Cost architecture`, `Workflow simulator`, and `Artifact boundary simulator`.
   - Do not show `V1.5`, `V2`, `gate`, or `accepted simulator` in visitor-facing card labels.
3. Replace SourceBadge visitor text.
   - Do not render `high confidence` or other internal confidence taxonomy to visitors.
   - Render source-type labels such as `Resume verified`, `Public project`, `Sanitized representative`, or `Public profile`.
   - Keep tooltip text safe. Do not expose private paths or internal metadata.
4. Fix the shared section labeling pattern.
   - Preferred implementation: update `SectionHeader` to accept `titleId` and place it on the heading element.
   - Update sections using `aria-labelledby` so the id points to actual heading text.
   - Do not leave `aria-labelledby` pointing to grids, card containers, or non-heading wrappers.

### Acceptance criteria

- No visible homepage or challenges copy uses internal phase or gate language.
- Source badges are visitor-facing and safe.
- Every edited `aria-labelledby` points to visible heading text.
- The fix covers the reusable SectionHeader pattern, not only ProofWall.
- `npm run validate:content` and `npm run validate:confidentiality` pass.

## Phase 3: missing hiring-fit signals and non-AI principle

### Goal

Restore missing senior/founding AI engineer signals from the design doc without overclaiming.

### Files likely touched

- `src/content/hiring-fit.ts`
- `src/content/principles.ts`
- `src/content/proof.ts` only if a new proof claim is unavoidable

### Actions

1. Add three hiring-fit rows:
   - `Can build full-stack AI products`
   - `Understands observability`
   - `Can operate as senior IC`
2. Proof guidance:
   - Prefer existing approved proof claims, especially `knit-observability-platform`, where they already mention OpenTelemetry, Langfuse, REST APIs, SSE, Deck IR, and platform execution.
   - If a new proof claim is needed for senior IC ownership, make it resume-backed, public-safe, and limited to a hiring-fit display context.
3. Add the missing principle:
   - Title: `A good AI system knows when not to use AI.`
   - Theme: deterministic code, schemas, rules, and evaluation paths are better than generation where reliability matters.
   - Suggested proof: `knit-sandbox-tasks` or `knit-observability-platform`.

### Acceptance criteria

- Hiring-fit matrix has 9 rows.
- All new rows reference approved proof claims.
- Principles has 6 items.
- No new claim violates proof validation or confidentiality rules.
- No authored content uses em dash characters.

## Phase 4: contact segmentation, proof hierarchy, case-study weighting, and OG image

### Goal

Improve conversion and sharing polish without adding dependencies.

### Files likely touched

- `src/app/contact/page.tsx`
- `src/components/home/ProofWall.tsx`
- `src/components/home/CaseStudyGrid.tsx`
- `src/content/metrics.ts`
- `src/app/layout.tsx`
- `public/og-image.png`
- optional `public/og-image.svg` source

### Actions

1. Improve Contact page self-selection.
   - Add segmented guidance for:
     - Founder or CTO hiring a founding AI engineer.
     - Engineering leader hiring senior AI platform or LLM systems IC.
     - Recruiter doing an initial screen.
     - Technical collaborator or peer.
   - Keep contact methods simple.
   - Do not add forms or collect private data.
2. Tighten Proof Wall hierarchy.
   - Homepage Proof Wall should render the strongest 4 metrics by `priority`.
   - Keep weaker metrics available elsewhere only if useful and not equally weighted on the homepage.
3. Weight Case Study Grid.
   - Preserve all enabled case studies.
   - Visually emphasize Agentic Market Research Platform and ML Infrastructure Rescue.
   - Keep Computer Vision next.
   - Keep AR and Vision accessible but secondary.
4. Add a share-ready OG image.
   - Preferred implementation: create a no-dependency static raster asset at `public/og-image.png`, 1200x630.
   - Optional: keep an editable SVG source only if useful, but metadata should reference the PNG for social-preview reliability.
   - Wire `openGraph.images` and `twitter.images` in `src/app/layout.tsx`.
   - Include image URL, width, height, and alt text.
   - Verify the image route resolves locally after build.
   - Do not add image-generation or canvas dependencies for this pass.

### Acceptance criteria

- Contact page gives clear next steps for distinct visitor types.
- Homepage Proof Wall shows strongest 4 metrics, not all metrics equally.
- Case Study Grid has visible hierarchy while keeping all enabled studies reachable.
- `public/og-image.png` exists at 1200x630 and is referenced in OpenGraph and Twitter metadata.
- Metadata includes image URL, width, height, and alt text.
- The image endpoint resolves locally after build.
- No forms, tracking payload changes, or new dependencies are added.

## Phase 5: verification and QA

### Command verification

Run the full relevant suite after implementation:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run validate:content
npm run validate:routes
npm run validate:confidentiality
npm run build
npm run test:links
npm run test:routes-smoke
npm run test:api
npm run verify
npm audit --audit-level=moderate
```

If assistant, Gemini, corpus, or API answer behavior changes, also run:

```bash
npm run build:assistant-corpus
npm run validate:assistant-corpus
npm run eval:assistant
```

### Browser QA

Capture browser QA evidence for:

- `/`
- `/contact`
- `/challenges`
- `/challenges/dag-execution-simulator`
- `/challenges/deck-ir-previewer`
- `/interview-me`

Check:

1. Desktop and 375px mobile rendering.
2. Live System Pulse progressive reveal.
3. Reduced-motion behavior.
4. Trace row readability on mobile.
5. Navbar item count and lack of Thinking link.
6. Hero CTA count.
7. Contact segmentation.
8. No internal phase or gate language on public cards.
9. OG image metadata is present.
10. `/api/interview` is absent from nav and sitemap.
11. Analytics payloads still avoid contact text, emails, assistant questions, and private content.

### Acceptance criteria

- All command checks pass.
- Browser QA evidence is saved under `reports/browser-qa/`.
- Route audit confirms `/api/interview` remains internal, gated, out of nav, out of sitemap, and noindex.
- No confidential content, private prompt, exact internal cost, or secret is introduced.

## Available agent-types roster

- `planner`: sequencing, acceptance criteria, handoff management.
- `architect`: route, metadata, accessibility, and governance review.
- `critic`: plan quality and acceptance contract review.
- `executor`: implementation and refactoring.
- `designer`: UX hierarchy, contact segmentation, trace interaction feel.
- `writer`: visitor-facing copy, proof wording, no-em-dash content review.
- `test-engineer`: browser QA, reduced-motion, viewport checks.
- `verifier`: final evidence and completion validation.
- `security-reviewer`: confidentiality, analytics, Gemini, assistant gate review.
- `code-reviewer`: final implementation review.
- `explore`: repo lookup and implementation surface mapping.

## Ralph execution guidance

Use Ralph for sequential execution when one owner should preserve the public-surface quality bar.

Recommended sequence:

1. `executor`: Phase 1 Live Pulse, nav, hero, trace labels, trace CSS.
2. `writer`: Phase 2 public copy, SourceBadge wording, challenge labels.
3. `executor`: Phase 2 shared SectionHeader accessibility and Phase 3 content additions.
4. `designer`: Phase 4 contact, proof hierarchy, case-study weighting, OG image composition.
5. `security-reviewer`: confidentiality, analytics, assistant, Gemini, and route gate review.
6. `test-engineer` or `verifier`: full commands and browser QA.
7. `code-reviewer`: final pass.

Launch hint:

```bash
$ralph implement .omx/plans/portfolio-expert-review-remediation-ralplan.md sequentially. Copy the approved plan to docs/plans/ before execution if a durable docs handoff is desired. Preserve /api/interview, GA, Gemini, confidentiality, no-em-dash, and no-new-dependency constraints. Commit sizeable features as they complete.
```

## Team execution guidance

Use Team if parallel work is desired.

Suggested lanes:

1. Frontend interaction lane:
   - Owns `LiveSystemPulse`, trace CSS, mobile trace layout, hero CTA, nav link removal.
2. Copy and content lane:
   - Owns preview copy, challenge labels, SourceBadge text, hiring-fit rows, principles.
3. Conversion and hierarchy lane:
   - Owns contact segmentation, ProofWall metric count, CaseStudyGrid weighting.
4. Metadata and governance lane:
   - Owns OG asset, layout metadata, route/nav/sitemap checks.
5. Verification lane:
   - Owns validation commands, browser QA, reduced-motion, mobile evidence, route audit.

Launch hint:

```bash
$team implement .omx/plans/portfolio-expert-review-remediation-ralplan.md with lanes for frontend interaction, copy/content, conversion hierarchy, metadata/governance, and verification. Copy the approved plan to docs/plans/ before execution if a durable docs handoff is desired. Preserve no-new-dependency, confidentiality, /api/interview, GA, and Gemini gates.
```

Team verification path:

1. Each lane reports changed files and checks.
2. Integrator resolves conflicts and runs full command suite.
3. Security reviewer verifies no confidential content and no gate regression.
4. Verifier captures browser QA evidence.
5. Leader closes only after the worktree is clean or intentionally documented.
