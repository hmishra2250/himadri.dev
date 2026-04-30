# Portfolio gap remediation ralplan

## Status

Consensus approved on 2026-04-30.

Planner created the initial plan. Architect requested one iteration for route exposure, browser QA dependency policy, assistant/API gating, no-em-dash validation, and simulator acceptance. Planner revised the plan. Architect approved. Critic approved with required Phase 0 integration items.

## Requirements summary

This plan closes the gaps found in the current portfolio after the blunt quality review. The current site is strong enough to be credible, but not yet differentiated enough to be the game-changing proof artifact envisioned in the design document.

The plan covers these gaps:

1. Homepage parity with the design document.
   - The design document requires Interactive Challenges / Lab and Interview Me before Hiring Fit and Contact.
   - `src/app/page.tsx` currently renders Hero, Live System Pulse, Proof Wall, How I Think, Featured Case Study, Decision Theater Preview, Case Study Grid, Hiring Fit Matrix, and Contact CTA only.
2. Debug This Agent trust issue.
   - The current component marks the correct answer before the visitor reveals the diagnosis.
3. V2 assistant depth and exposure.
   - The current assistant is deterministic and source-bound, which is safe, but the public API must be default-off until V2b is explicitly approved.
4. DAG and Deck IR simulator depth.
   - Current implementations are useful prototypes but too shallow to carry the full V2 promise.
5. Browser QA gap.
   - The current verification suite is strong for build and content checks, but it lacks durable browser evidence for keyboard, responsive, reduced-motion, accessibility, and Lighthouse expectations.
6. Highcharts opinion gap.
   - The design document calls for a Highcharts production AI opinion that is not yet represented as a standalone opinion card.
7. Route exposure drift.
   - Current V2/V2c surfaces must be reconciled with their phase gates before any next implementation pass.
8. Authored content style gap.
   - Repo guidance forbids em dashes in authored content, but validation must cover more than one component.

## RALPLAN-DR summary

### Principles

1. Governance before surface area.
2. Static-first, API-later.
3. Proof beats polish.
4. No confidential leakage.
5. No dependency drift without explicit approval.

### Decision drivers

1. The strongest hiring signal is inspectable production AI judgment, not more generic polish.
2. The highest risk is public exposure of weak, unsafe, or overclaimed V2 surfaces.
3. The repo already has route authority, typed content, validation scripts, and phase plans, so remediation must extend those systems instead of bypassing them.

### Viable options

| Option | Description | Pros | Cons | Decision |
|---|---|---|---|---|
| A | Hard Phase 0 governance gate, then V1.5 static improvements, then gated V2 assistant and simulators | Best balance of differentiation, safety, route discipline, and execution clarity | More upfront validation work | Favored |
| B | Tighten current V1 only and skip new surfaces | Lowest risk and fastest stabilization | Does not address the not-yet-game-changing critique | Fallback only if interactive content fails quality gates |
| C | Launch assistant and API first | Strong AI relevance | Skips eval, privacy, route, and public API gates | Rejected until V2b approval |
| D | Build all challenges and simulators immediately | High wow potential | High bundle, accessibility, simulator quality, and confidentiality risk | Rejected |

## ADR

### Decision

Adopt Option A: perform a hard Phase 0 governance gate, then ship V1.5 static trust upgrades, then gated V1.5 challenges, then V2 assistant and simulator work only after explicit safety and quality gates.

### Drivers

- Preserve trust and confidentiality.
- Avoid route, sitemap, nav, robots, and API exposure mistakes.
- Make the portfolio more differentiated without premature backend complexity.
- Keep dependency policy tight.
- Make browser QA evidence concrete before launch claims.

### Alternatives considered

- Option B, static polish only. Rejected because it does not remediate the main differentiation gap.
- Option C, assistant-first V2. Rejected because it skips eval, safety, and privacy gates.
- Option D, simulator-first V2. Rejected because it risks thin toy interactions and bundle bloat.

### Why chosen

Option A matches the current repo architecture. It turns the existing portfolio from a polished proof site into a governed, inspectable product system without prematurely adding risky dependencies or public APIs.

### Consequences

- More upfront governance work before visible improvements.
- Slower public API launch.
- Clearer handoff for Ralph or Team execution.
- Lower risk of embarrassing public routes, unsafe assistant behavior, or overclaimed V2 artifacts.

### Follow-ups

1. Execute Phase 0 before any UI, assistant, or route enablement work.
2. Keep external LLM, vector store, analytics, Sentry, React Flow, and PPTX export out of scope until a later explicit dependency ADR.
3. If browser automation tooling is desired, get explicit approval before adding dev dependencies.

## Phase 0: hard governance gate

Phase 0 is a blocking gate. No UI remediation, route enablement, API exposure, simulator work, or hiring packet work begins until this phase passes.

### Phase 0 manifest migration checklist

Audit and update these surfaces together:

1. `src/lib/routes.ts`
2. `src/app/sitemap.ts`
3. `src/app/robots.ts`
4. `src/components/layout/Navbar.tsx`
5. public links in homepage, challenges, interview, footer, and hiring packet surfaces
6. `scripts/check-links.ts`
7. `scripts/test-routes-smoke.ts`
8. route validation in `src/lib/validation.ts` and `scripts/validate-routes.ts`

### Required route defaults

| Route | Required default | Sitemap | Nav | Public-link rule |
|---|---|---|---|---|
| `/api/interview` | disabled until explicit V2b approval | never included | never included | no public launch claims until V2a eval passes and V2b is approved |
| `/challenges/dag-execution-simulator` | disabled until DAG acceptance passes | false until enabled | false | linked only from `/challenges` after enablement |
| `/challenges/deck-ir-previewer` | disabled until Deck IR acceptance passes | false until enabled | false | linked only from `/challenges` after enablement |
| `/hiring-packet` | disabled unless explicitly approved | false unless promoted | false by default | generated only from public approved content |

### Assistant API default-off requirement

`assistantApiEnabled()` must become default-off. The accepted rule is:

```txt
ENABLE_INTERVIEW_ASSISTANT_API === "1"
```

Disabled-by-default and explicitly-enabled behavior must both be tested.

### Route validation additions

Route validation must fail when:

1. disabled routes appear in sitemap, nav, route smoke requirements, link checks, or public links
2. `/api/interview` appears in sitemap or nav
3. `/api/interview` is enabled while the server feature gate is default-off or missing
4. `/api/interview` is enabled while assistant eval evidence is absent, stale, or failing
5. a public page is blocked by robots after enablement
6. a deferred route has inconsistent `enabled`, `includeInSitemap`, `includeInNav`, or robots policy values

### No-em-dash validation scope

Add or extend validation to scan authored publication surfaces:

1. `src/content/**/*.ts`
2. `src/components/**/*.tsx`
3. `src/app/**/*.tsx`
4. `docs/**/*.md` when intended for publication or copied into site content
5. `AGENTS.md` if it is edited again

Exclude:

1. `node_modules`
2. `.next`
3. `.git`
4. generated reports where content is machine-produced
5. lockfiles
6. binary assets
7. third-party or vendor files

### Browser QA policy

Default path uses no new runtime dependency:

1. `npm run verify`
2. local production build check
3. manual browser QA on key routes
4. optional external Lighthouse report captured as evidence
5. manual keyboard, responsive, and reduced-motion checks

Optional dev-only tools require explicit approval:

1. Playwright for route smoke, keyboard paths, and screenshots
2. Lighthouse CI for repeatable performance reports
3. axe checks through Playwright

No QA tool may become a runtime dependency.

### Manual browser QA evidence

Manual browser QA evidence must include:

1. viewport matrix: mobile, tablet, desktop
2. keyboard path for homepage, Debug This Agent, Cost Anatomy, Interview Me, DAG, and Deck IR when enabled
3. reduced-motion check
4. screenshots or written notes for each checked route
5. pass/fail owner and date
6. list of routes skipped because they are disabled or deferred

### Phase 0 acceptance criteria

- Route manifest state matches sitemap, robots, nav, public links, route smoke, and link checks.
- `/api/interview` is default-off and never in sitemap or nav.
- Deferred V2/V2c routes are not public-linked until acceptance passes.
- Authored public content contains no em dash characters.
- Browser QA policy exists before any browser QA tooling is added.
- `npm run validate:routes` and `npm run verify` pass after governance changes.

## Phase 1: V1.5 static trust upgrade

Goal: make the visible site more evaluative and senior without backend or assistant risk.

### Deliverables

1. Add homepage `ChallengesPreview` and `InterviewMePreview` in the design-doc order if they increase signal.
2. Add missing Highcharts stack opinion backed by the approved chart proof.
3. Improve visual specificity with system motifs that feel like AI workflow traces, evaluation gates, and artifact pipelines rather than generic dark SaaS cards.
4. Keep static curated Interview Me answers source-backed.
5. Keep diagrams text-readable, accessible, and labeled as sanitized where needed.

### Acceptance criteria

- Homepage order includes Challenges and Interview Me before Hiring Fit and Contact, or the deferral is documented with a route-gate reason.
- Highcharts opinion exists and references approved proof.
- No new content violates proof, confidentiality, or no-em-dash validation.
- No deferred V2 route is linked.
- `npm run verify` passes.

## Phase 2: V1.5 static challenges

Goal: make the challenge surfaces prove judgment instead of feeling like decorative demos.

### Deliverables

1. `/challenges` promotes only complete, enabled challenges.
2. `Debug This Agent` hides the correct answer until user selection or reveal.
3. `Debug This Agent` uses trace evidence, plausible distractors, diagnosis, production fix, and source labels.
4. `Cost Anatomy` keeps normalized units and visible confidentiality labels.
5. Challenge validation prevents empty shells and premature links.

### Acceptance criteria

- No correct choice is visually marked before user action.
- Debug flow is keyboard-operable.
- Every scenario has trace, options, answer, diagnosis, fix, proof labels, and public label.
- Cost Anatomy includes no exact internal cost figures.
- `npm run validate:content`, `npm run validate:routes`, `npm run test:links`, and `npm run verify` pass.

## Phase 3: V2a assistant foundation, internal only

Goal: prove assistant safety before any public API exposure.

### Deliverables

1. Approved public or sanitized corpus.
2. Chunk schema with source URL, title, tags, source type, priority, and confidentiality level.
3. Eval dataset with 40 to 60 cases.
4. Eval report stored under `reports/assistant-eval/latest.json` or a configured equivalent.
5. Route metadata for `/api/interview`, still disabled.
6. Tests for disabled-by-default assistant API behavior.

### Acceptance criteria

- `/api/interview` remains disabled.
- Eval report passes 100 percent forbidden-claim checks.
- Eval report passes 100 percent prompt-injection checks.
- Eval report passes 100 percent fallback checks for unsupported, private, and unrelated questions.
- Non-fallback answers include source cards.
- Route validation blocks API exposure when eval evidence or server feature gate is missing.

## Gemini, analytics, and observability intake

This intake is added after user direction on 2026-04-30. Gemini Flash and observability tooling are allowed as planned options, not automatic implementation.

### Gemini Flash recommendation

Use Gemini only on the server side. Never expose `GEMINI_API_KEY` through a `NEXT_PUBLIC_` variable. The initial model should be configurable through `GEMINI_MODEL`, with `gemini-2.5-flash` as the conservative default candidate and newer Flash preview models allowed only after a fresh official-doc check.

Required gates before Gemini powers `/api/interview`:

1. `ENABLE_INTERVIEW_ASSISTANT_API === "1"`
2. `ENABLE_GEMINI_ASSISTANT === "1"`
3. `GEMINI_API_KEY` present on the server
4. assistant eval report passes
5. rate limit and fallback tests pass
6. no full-message logging by default
7. source-card response remains mandatory

The deterministic assistant remains the fallback if Gemini is disabled, rate-limited, missing, or fails.

### Analytics recommendation

Do not add analytics during Phase 0. Keep placeholders ready, then choose one provider later:

1. Vercel Analytics for simple pageview analytics if the app deploys on Vercel.
2. Plausible for privacy-friendly external analytics if a domain-based script is preferred.
3. PostHog only if event funnels are truly needed, such as interview assistant usage and challenge completion.

Analytics must not capture full assistant questions, private messages, emails, or confidential content.

### Observability recommendation

Use Sentry only if runtime error visibility is needed after launch. If enabled, scrub request bodies and never capture full assistant prompts or private contact messages.

### Environment template policy

Maintain `.env.example` as the committed template and `.env.local` as the ignored local file for real values. Do not commit filled secrets.

## Phase 4: V2b assistant API, explicit approval required

Goal: launch public assistant only after V2a evidence and explicit approval.

### Deliverables

1. `POST /api/interview`, only if approved.
2. Payload validation.
3. Maximum question length.
4. Rate limiting.
5. Source-grounded answers only.
6. Safe fallback for unsupported or private requests.
7. Privacy-safe logging with no full-message logging by default.
8. Tests for default-off, enabled, invalid payload, rate limit, fallback, source cards, and prompt injection behavior.

### Acceptance criteria

- Public API launch claims are absent until V2b is explicitly approved.
- `/api/interview` never appears in sitemap or nav.
- Assistant UI distinguishes static curated answers from live assistant answers.
- Tests prove disabled-by-default and explicitly-enabled behavior.
- `npm run verify` passes with assistant eval evidence.

## Phase 5: V2c simulators and optional hiring packet

Goal: deepen inspectable technical proof without gimmicks.

### DAG simulator acceptance

`/challenges/dag-execution-simulator` may enable only when it has:

1. visible DAG with nodes, edges, dependency states, and execution state
2. at least one user-controlled scheduling or failure decision
3. step-by-step state changes that affect downstream readiness or failure handling
4. explanation of the production lesson after completion
5. keyboard-accessible controls
6. readable mobile layout
7. route-local or lazy loading so homepage bundle is unaffected
8. public, synthetic, or sanitized data labels
9. route audit passing with enabled route and intentional sitemap state

### Deck IR Previewer acceptance

`/challenges/deck-ir-previewer` may enable only when it has:

1. static public or synthetic Deck IR samples
2. parser validation with clear error states
3. rendered preview that maps IR sections to slide-like output
4. at least one meaningful inspection feature such as outline view, warnings, missing-field detection, or speaker-note preview
5. no private deck data, customer data, or private outputs
6. visible synthetic or sanitized label
7. keyboard-accessible editor or viewer controls
8. route audit passing with enabled route and intentional sitemap state

### Hiring packet acceptance

`/hiring-packet` remains optional and disabled unless approved.

If enabled, it must:

1. use only already-public content
2. avoid private claims and internal details
3. be generated or rendered from typed content
4. stay out of sitemap and nav unless explicitly promoted as public
5. pass link, content, no-em-dash, and confidentiality validation

## Verification plan

Baseline for every phase:

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

Additional gates:

1. manual route audit for sitemap, nav, robots, and public links
2. manual browser QA with viewport matrix, keyboard path, reduced-motion check, screenshots or notes, owner, and date
3. assistant eval gate before `/api/interview` exposure
4. bundle review before simulator enablement
5. confidentiality scan for customer names, private prompts, datasets, exact costs, and private deck material
6. no-em-dash authored-content validation before release

## Pre-mortem

1. A V2 route remains publicly linked while still weak.
   - Mitigation: Phase 0 route migration, route validation, link checks, route smoke updates.
2. Assistant API launches because the endpoint exists, not because it is ready.
   - Mitigation: default-off feature gate, V2a eval requirement, explicit V2b approval, API tests.
3. Browser QA is claimed but not reproducible.
   - Mitigation: manual evidence matrix now, optional dev-only Playwright or Lighthouse only after approval.

## Expanded test plan

### Unit and script checks

- Route manifest validation.
- Disabled route public-link validation.
- Assistant config default-off tests.
- No-em-dash authored content scan.
- Content validation for proofs, source cards, costs, and challenge completeness.

### Integration checks

- Link checker respects disabled routes.
- Route smoke respects enabled routes only.
- Sitemap and robots match route manifest.
- Assistant API tests cover disabled and enabled states.

### Browser checks

- Homepage, Interview Me, Challenges, Debug This Agent, Cost Anatomy, and any enabled V2 routes.
- Mobile, tablet, desktop viewport matrix.
- Keyboard paths for interactive components.
- Reduced-motion behavior.
- Lighthouse or external report evidence for public launch claims.

### Observability and release checks

- Reports saved under `reports/` when generated.
- Launch notes list route states, enabled features, disabled features, verification commands, and known deferred items.
- Final verification evidence includes command output and manual QA evidence.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| API launch happens before eval maturity | Default-off API, route validation, V2a eval gate, explicit V2b approval |
| Simulators feel like toys | Testable DAG and Deck IR acceptance criteria before enablement |
| Browser QA causes dependency bloat | No-new-runtime-dependency default, dev-only tools require approval |
| Hidden routes leak into sitemap or nav | Phase 0 manifest migration and validation |
| Confidential content leaks | Typed proof metadata, public labels, content validation, manual review |
| Authored content violates no-em-dash rule | Broad validation across publication surfaces |
| Hiring packet overclaims | Optional disabled-by-default route generated only from approved public content |

## Available agent-types roster

- `planner`
- `architect`
- `critic`
- `executor`
- `test-engineer`
- `verifier`
- `security-reviewer`
- `designer`
- `writer`
- `dependency-expert`
- `researcher`
- `code-reviewer`

## Follow-up staffing guidance

### Ralph path

Use Ralph for sequential execution when one owner should preserve phase order.

Recommended lanes:

1. Governance and validation executor, high reasoning.
2. Content and proof writer, medium to high reasoning.
3. UI executor, medium to high reasoning.
4. Test engineer, high reasoning.
5. Security reviewer before V2b, high reasoning.
6. Verifier, high reasoning.

Launch hint:

```bash
$ralph "Execute docs/plans/portfolio-gap-remediation-ralplan.md sequentially. Complete Phase 0 governance before UI or route work. Keep /api/interview default-off unless V2b is explicitly approved."
```

### Team path

Use Team only if coordinated parallel execution is worth the overhead.

Recommended lanes:

1. Route governance and validation.
2. Static content and source cards.
3. UI components and challenge interactions.
4. Assistant corpus and eval, internal only.
5. QA, browser checks, accessibility, and build verification.

Launch hint:

```bash
$team "Execute docs/plans/portfolio-gap-remediation-ralplan.md. Start with Phase 0 governance as a hard blocking gate. Do not enable V2 routes or /api/interview without explicit approval."
```

Team verification path:

1. Each lane reports changed files and local tests.
2. Verifier runs full `npm run verify`.
3. Security reviewer checks confidentiality and API exposure.
4. Architect reviews final route and phase alignment.
5. Leader closes the team only after verification evidence is collected.

## Consensus review changelog

- Integrated Architect iteration request for route exposure, browser QA policy, assistant/API default-off, no-em-dash validation, and simulator acceptance.
- Integrated Architect approval notes about current-state migration from enabled V2 routes to gated defaults.
- Integrated Critic approval requirements as non-optional Phase 0 acceptance criteria.
