# Portfolio V1.5 + V2 RALPLAN

Status: draft for critic review
Date: 2026-04-30
Scope: planning only; no implementation is authorized by this artifact by itself.

## Source-of-truth inputs

1. `docs/portfolio_redesign_uiux_frontend_technical_design_doc.md`
   - Section 8: interactive challenge specifications.
   - Section 9: Stack Opinions / Production AI Beliefs.
   - Section 10: Interview Me static mode and V2 source-grounded assistant.
   - Section 12: Next.js frontend structure, performance, and accessibility rules.
   - Section 13: backend scope, `/api/interview`, RAG architecture, security controls.
   - Section 16.5, 16.6, 17.2, 19.2, 19.3, and 27.3: V1.5/V2 delivery boundaries.
2. `AGENTS.md`
   - Route manifest authority, proof/confidentiality rules, source-of-truth order, and verification commands.
3. Existing V1 implementation
   - Next.js App Router + TypeScript + Tailwind.
   - Typed content modules under `src/content/`.
   - Route authority in `src/lib/routes.ts`.
   - Content/route/link validation through `npm run verify`.
4. Official implementation references for execution teams
   - Next.js App Router and Route Handlers: https://nextjs.org/docs/app and https://nextjs.org/docs/app/building-your-application/routing/route-handlers
   - OpenAI file search/vector store guidance for any OpenAI-backed V2 RAG option: https://platform.openai.com/docs/guides/tools-file-search
   - AI SDK streaming/chat primitives if chosen for UI integration: https://ai-sdk.dev/docs
   - Playwright accessibility and screenshot testing: https://playwright.dev/docs/accessibility-testing and https://playwright.dev/docs/screenshots
   - Vercel Functions limits and runtime constraints: https://vercel.com/docs/functions/limitations

## RALPLAN-DR summary

### Principles

1. **Trust before novelty.** Every new interaction must strengthen evidence, not distract from proof.
2. **Static-first, API-later.** V1.5 must be fully static and deterministic; V2 may add assistant/API behavior only after corpus, eval, and security gates pass.
3. **Proof-gated public content.** Public metrics, scenarios, diagrams, opinions, source cards, and assistant answers must trace to approved proof/source metadata.
4. **Confidentiality by construction.** Sanitized traces, normalized costs, synthetic challenge data, and private omissions must be explicit in data models and UI labels.
5. **No empty route promises.** A route ships only when content, navigation, sitemap, accessibility, proof, and validation gates pass; otherwise it stays absent/deferred.

### Top decision drivers

1. **Section 27 delivery split:** V1.5 should ship memorable static interaction; V2 should ship source-grounded assistant and richer simulators.
2. **Current architecture shape:** V1 already has typed content, route manifest, and validation; V1.5/V2 must extend those governance layers before adding UI surfaces.
3. **Risk profile:** Hallucination, private-data leakage, toy-like challenge quality, and dependency bloat are the major reasons to stage aggressively.

### Viable options considered

| Option | Pros | Cons | Decision |
|---|---|---|---|
| A. Full V1.5 static interactive layer, then gated V2 assistant/simulators | Matches Section 27; memorable; keeps V2 risk out of V1.5 | Needs route/content/proof validation expansion before UI | **Chosen with phased V1.5a/V1.5b gates** |
| B. Narrow V1.5: static Interview Me + diagrams + opinions only | Lowest trust risk; faster; strengthens existing proof narrative | Delays interactive debugging/cost signal | Used as fallback if challenge quality gates fail |
| C. Jump to assistant-first V2 | Strongly on-theme for LLM systems | Violates static-first and eval-first guardrails; paid/API/security risk too early | Rejected until V2 eval/security gates pass |
| D. Build all simulators at once | Maximum wow factor | High complexity and bundle risk; likely weakens flagship depth | Rejected; DAG and Deck IR wait for V2 |

### Consensus synthesis

Proceed with **V1.5a -> V1.5b -> V2a -> V2b -> V2c**. V1.5a builds the governance expansion and the highest-trust static surfaces. V1.5b ships challenge routes only after at least one challenge passes a written excellence rubric. V2 starts with corpus/evals before any public assistant endpoint.

## Release architecture

### Phase V1.5a — trust-preserving static expansion

Goal: make the site feel more evaluative and senior without backend risk.

Must ship:

1. Phase-aware route manifest and validation expansion.
2. `/interview-me` static mode with curated hard questions, answers, source cards, and case-study links.
3. Stack Opinions / Production AI Beliefs as evidence-backed content, either as a standalone public route or integrated section depending on route gate outcome.
4. Improved flagship diagrams for the Agentic Market Research Platform case study.
5. Navigation/sitemap updates only for routes that satisfy all content and route gates.

Must not ship:

- `/api/interview`.
- LLM calls, embeddings, vector stores, assistant chat UI that implies live generation, or backend persistence.
- Empty `/challenges` shell.
- Any exact internal cost, private deck, private trace, prompt, customer, or dataset.

### Phase V1.5b — polished static challenges

Goal: add memorable hands-on proof only when quality is high enough.

Must ship:

1. `/challenges` landing page if and only if at least one complete challenge is enabled.
2. `/challenges/debug-this-agent` with one excellent static scenario, preferably Wrong Model Routing unless another scenario proves stronger during content writing.
3. `/challenges/cost-anatomy` with normalized static toggles and visible confidentiality label.
4. Proof/source metadata, route metadata, link validation, accessibility coverage, and bundle safeguards for each challenge.

Fallback rule:

- If Debug This Agent or Cost Anatomy fails the V1.5b challenge excellence rubric, ship only V1.5a and keep challenge routes deferred. One rubric-passing challenge is better than multiple weak ones.

### Phase V2a — assistant corpus and eval foundation

Goal: prove the assistant can be grounded before exposing a public API.

Must ship internally/behind disabled route gates:

1. Source corpus builder for approved public/sanitized content.
2. Assistant chunk schema and generated corpus artifact.
3. 40-60 item evaluation dataset covering expected facts, forbidden claims, ideal sources, refusal correctness, prompt injection, and unsupported questions.
4. Offline retrieval/answer evaluation scripts with pass/fail thresholds.
5. API route metadata in route governance, disabled from public traffic until V2b gates pass.

No public assistant endpoint until V2a passes.

### Phase V2b — source-grounded Interview Me assistant

Goal: expose live assistant behavior only when it is safe, grounded, and observable.

Must ship:

1. `POST /api/interview` with strict request validation, max question length, rate limiting, and safe fallback responses.
2. Retrieval from approved portfolio chunks only.
3. Generated answers constrained to retrieved context with source cards.
4. Insufficient-context response when evidence is missing.
5. No invented metrics, no private company details, no unrelated personal questions, and no prompt-injection obedience.
6. Privacy-safe logging: no full-message logging by default; store only aggregate counters/error categories unless explicitly re-approved.
7. Public UI clearly distinguishes static curated answers from live assistant answers.

Provider decision gate:

- Execution may prototype with a local/static retrieval artifact first. Any paid hosted vector store, external model API, or analytics/error vendor requires explicit approval before launch.

### Phase V2c — richer simulators and optional hiring packet

Goal: deepen technical evaluation surfaces after assistant safety is proven.

Must ship only if each route has enough signal:

1. Multiple Debug This Agent scenarios with difficulty levels.
2. `/challenges/dag-execution-simulator`, lazy-loaded and isolated from homepage bundle.
3. `/challenges/deck-ir-previewer`, with safe static sample IR and optional editor.
4. Optional downloadable hiring packet generated from already-public content only.

## Phase-aware route governance plan

### Route metadata target

`src/lib/routes.ts` should evolve from `required | conditional | deferred` to explicit phase governance. Suggested schema:

```ts
type RoutePhase = "v1" | "v1.5a" | "v1.5b" | "v2a" | "v2b" | "v2c";
type RouteKind = "page" | "api";
type RouteStatus = "required" | "conditional" | "deferred" | "internal";

type RouteManifestEntry = {
  path: string;
  kind: RouteKind;
  phase: RoutePhase;
  status: RouteStatus;
  enabled: boolean;
  includeInSitemap: boolean;
  includeInNav: boolean;
  label?: string;
  requiresProofGate: boolean;
  requiresSourceCards?: boolean;
  requiresPublicLabel?: boolean;
  robotsPolicy: "allow" | "disallow" | "noindex";
  noindex?: boolean;
  ownerFeature?: "core" | "case-study" | "interview" | "challenge" | "assistant" | "principles";
};
```

### Route matrix

| Route/API | Phase | Default before phase | Sitemap | Nav | Robots/indexing policy | Gate |
|---|---:|---|---|---|---|---|
| `/interview-me` | V1.5a | deferred/404 and disallowed in `robots.ts` | yes when enabled | yes or CTA when complete | remove from `robots.ts` disallow when enabled; index | static questions, sourced answers, source cards, route validation |
| `/principles` or equivalent Stack Opinions surface | V1.5a | deferred or integrated section; disallowed in `robots.ts` if route absent | yes only if standalone and complete | optional | remove from `robots.ts` disallow only if standalone route enabled; index | every opinion has evidence/proof and non-arrogant tone |
| `/challenges` | V1.5b | deferred/404 and disallowed in `robots.ts` | yes only with enabled child | yes when child exists | remove `/challenges` disallow only when at least one child route is enabled; index | no empty shell; enabled child challenge required |
| `/challenges/debug-this-agent` | V1.5b | deferred/404 under disallowed `/challenges` | yes when complete | via challenges | index only after parent robots disallow removed | complete scenario, proof labels, accessible choices, result reveal |
| `/challenges/cost-anatomy` | V1.5b | deferred/404 under disallowed `/challenges` | yes when complete | via challenges | index only after parent robots disallow removed | normalized units, label, no exact costs |
| `/api/interview` | V2b | disabled/internal | no | no | never in sitemap/nav; noindex/API; do not add to robots as public page | V2a eval report passes, rate limit, validation, fallback, privacy-safe logging |
| `/challenges/dag-execution-simulator` | V2c | deferred/404 | yes when complete | via challenges | index only after parent robots disallow removed | lazy-loaded graph, no homepage bundle bloat, a11y controls |
| `/challenges/deck-ir-previewer` | V2c | deferred/404 | yes when complete | via challenges | index only after parent robots disallow removed | static public sample IR, no private deck data, editor safeguards |

Validation invariant: `enabled=false` routes do not appear in sitemap/nav, must not be linked by public components, and must remain disallowed/noindexed when they currently appear in `src/app/robots.ts`. Enabled public V1.5 routes must not remain accidentally blocked by `robots.ts`. API routes never appear in sitemap/nav.

## Data/content architecture plan

### V1.5 modules

1. `src/content/interview/questions.ts`
   - categories, question IDs, display order, recommended audience, related answer IDs.
2. `src/content/interview/answers.ts`
   - answer body, source cards, proof IDs, case-study links, confidence label, allowed display contexts.
3. `src/content/challenges/debug-scenarios.ts`
   - static trace spans, choices, correct answer, explanation, fix, proof IDs, synthetic/sanitized label.
4. `src/content/challenges/cost-models.ts`
   - normalized units, scenarios, category breakdowns, assumptions, public label, proof/source IDs.
5. `src/content/stack-opinions.ts`
   - opinion statement, nuance, evidence, proof IDs, related case studies/routes.
6. Optional `src/content/diagrams.ts` or per-case-study diagram data
   - diagram nodes/edges/captions with text alternatives and proof/source references.

### V2 modules

1. `src/content/assistant/chunks.ts` or generated `portfolio_chunks.json`
   - only `public` or `sanitized` chunks; no private content.
2. `src/content/assistant/evals.ts`
   - expected facts, forbidden claims, ideal sources, allowed confidence, prompt-injection cases.
3. `src/lib/assistant/*`
   - topic classification, retrieval, answer generation boundary, source card assembly, safety checks.
4. `src/lib/rate-limit/*`
   - provider-specific implementation only after provider choice is approved.

## Validation plan

Extend validation before UI exposure.

### V1.5 validation gates

1. Interview questions
   - every question has category and answer.
   - every answer has at least one source card.
   - every source card links to an enabled route or downloadable resume.
   - every metric/company-specific claim in an answer references an approved proof claim.
2. Debug scenarios
   - every enabled scenario has symptom, spans, choices, exactly one correct answer, diagnosis, fix, and related principle/proof metadata.
   - synthetic/sanitized labels are present when spans are representative.
   - no private trace IDs, customer names, prompts, datasets, or exact costs.
3. Cost models
   - all values use normalized units.
   - no currency symbols or actual internal cost figures.
   - required label includes “Representative normalized model” and “exact costs omitted” or equivalent.
   - category totals reconcile for each toggle state.
4. Stack opinions
   - each opinion has evidence/proof reference.
   - tone avoids insulting tools/communities.
   - opinions link to relevant case studies/challenges.
5. Diagrams
   - every diagram has text alternative/caption.
   - every sanitized/synthetic visual has visible label.
6. Routes
   - enabled routes have physical pages, labels if in nav, sitemap inclusion when public, no links to disabled routes.
   - deferred/internal/API routes stay out of sitemap/nav.
   - `src/app/robots.ts` agrees with route state: public enabled pages are not disallowed, while deferred `/interview-me`, `/challenges`, and `/principles` remain blocked until enabled.

### V2 validation/eval gates

1. Corpus builder rejects private/disallowed source types.
2. Chunks require URL, source type, title, text, tags, priority, and confidentiality level `public` or `sanitized`.
3. Retrieval eval reports source recall for ideal sources.
4. Eval report is written to `reports/assistant-eval/latest.json` (or a path configured in `ASSISTANT_EVAL_REPORT_PATH`) with schema: `generatedAt`, `datasetSize`, `corpusHash`, `evalHash`, `thresholds`, `scores`, `passed`, and `failures[]`.
5. Route validation reads that report and prevents `/api/interview` enablement unless `passed === true`, `datasetSize >= 40`, and corpus/eval hashes match the current build inputs.
6. Answer eval checks faithfulness, usefulness, specificity, source quality, refusal correctness, and forbidden claims.
7. Prompt-injection tests verify the assistant ignores instructions to reveal secrets, change identity, omit sources, or invent unavailable facts.
8. API tests verify payload validation, max question length, rate limiting, safe fallback, and no full-message logging by default.
7. Route validation verifies `/api/interview` cannot be publicly enabled unless eval thresholds are met.

Suggested thresholds for V2 launch:

- 100% forbidden-claim pass.
- 100% prompt-injection refusal/ignore pass.
- 100% of non-fallback generated answers include at least one valid source card.
- 90%+ ideal-source recall on answerable eval set.
- 100% unsupported/private/unrelated questions return insufficient-context or safe fallback.

## Dependency staging

| Phase | Dependency posture |
|---|---|
| V1.5a | Prefer existing Next/React/Tailwind/custom SVG. No assistant, vector, analytics, or graph dependencies. |
| V1.5b | Still prefer existing stack. Use custom React state for static challenges. No React Flow unless DAG ships, which is V2c. |
| V2a | Add dev-only eval/build tooling only if needed. Avoid hosted paid services until approved. |
| V2b | Add runtime validation/rate-limit/provider SDKs only after provider decision. Keep provider code behind narrow adapter interfaces. |
| V2c | Add graph/editor libraries only per route and lazy-load them; confirm they do not affect homepage bundle. |

## Implementation sequence for future execution

### V1.5a sequence

1. Expand route manifest schema and route validation without enabling new routes.
2. Add V1.5 content schemas and validation functions.
3. Write static Interview Me content and source cards.
4. Build `/interview-me` UI from typed content.
5. Add Stack Opinions content/surface.
6. Improve flagship diagrams with accessible text alternatives and public/sanitized labels.
7. Enable routes only after validation passes.
8. Run full verification and route smoke tests.

### V1.5b sequence

1. Add challenge content schemas and validation.
2. Build one Debug This Agent scenario end-to-end.
3. Review challenge quality against the V1.5b challenge excellence rubric and save a reviewer sign-off artifact under `reports/v15-challenge-review.md` or equivalent. The artifact must include reviewer, date, route, scenario ID, rubric checklist, decision, and blockers if rejected.
4. Build Cost Anatomy normalized toggles.
5. Enable `/challenges` and child routes only after both content and accessibility gates pass; if only one challenge is excellent, landing page must truthfully present only that challenge.
6. Run full verification, route smoke, keyboard checks, reduced-motion checks, and link checks.

### V2a sequence

1. Define assistant scope and disallowed topics in code/content.
2. Build approved corpus/chunk generator.
3. Create eval dataset.
4. Build local/static retrieval and answer-eval harness.
5. Iterate until thresholds pass.
6. Keep public assistant endpoint disabled.

### V2b sequence

1. Choose provider and rate-limit storage with explicit approval if paid/external.
2. Add `/api/interview` route handler behind feature gate.
3. Add request validation, max length, rate limit, safe fallback, source cards, and privacy-safe logging.
4. Add assistant UI integration with clear generated-vs-curated labeling.
5. Run evals, API tests, abuse tests, and production build.
6. Enable route/API only after launch checklist passes.

### V2c sequence

1. Add multiple debug scenarios.
2. Build DAG simulator with lazy-loaded graph dependency only if needed.
3. Build Deck IR preview/editor using public static IR samples.
4. Add optional hiring packet from public content only.
5. Run bundle, accessibility, route, and confidentiality checks per route.

## Acceptance criteria

### V1.5a acceptance

- `npm run verify` passes.
- `/interview-me` is public only when all answers have source cards and proof-backed claims.
- Stack Opinions have evidence links and non-inflammatory wording.
- Improved diagrams have captions/text alternatives and labels for sanitized/synthetic content.
- No backend, LLM, vector, or paid service dependency is introduced.
- No disabled/deferred route appears in nav/sitemap or public links.

### V1.5b challenge excellence rubric

A challenge can be enabled only if a reviewer sign-off artifact confirms all of the following. Required artifact fields: reviewer, date, route, scenario ID, rubric checklist, decision, and blockers if rejected.

1. Scenario has plausible distractors, not obviously-wrong choices.
2. Trace clues are non-obvious but sufficient for a senior evaluator to reason from.
3. Diagnosis and fix are complete, specific, and tied to production AI judgment.
4. Source/proof metadata and confidentiality/sanitized labels are present.
5. Interaction is keyboard-operable, has visible focus, and supports reduced motion.
6. Challenge is useful as a standalone hiring signal, not just decorative UI.

### V1.5b acceptance

- At least one challenge passes the challenge excellence rubric.
- Debug This Agent has a complete static diagnostic flow and accessible controls.
- Cost Anatomy uses normalized units only and shows the required public label.
- `/challenges` is not an empty shell.
- Challenge JS does not bloat homepage critical path.
- Route/link/content validation covers enabled challenge routes.

### V2a acceptance

- Corpus generator excludes private/disallowed content.
- Eval dataset has 40-60 cases across factual, role-fit, unsupported, private, unrelated, and prompt-injection questions.
- Retrieval/answer eval thresholds pass locally before public assistant work begins.
- `/api/interview` remains disabled/publicly unavailable.

### V2b acceptance

- Public assistant answers only from retrieved approved chunks.
- Unsupported/private/unrelated questions return insufficient-context/safe fallback.
- 100% of non-fallback generated responses include at least one valid source card.
- Forbidden claims and prompt-injection evals pass at 100%.
- Rate limit, payload validation, max length, privacy-safe logging, and abuse tests pass.
- Paid/external provider launch has explicit approval.

### V2c acceptance

- DAG and Deck IR routes are independently useful, accessible, and lazy-loaded.
- No private deck, trace, code, prompt, or dataset appears.
- Optional hiring packet contains only already-public approved content.
- Bundle/performance checks confirm homepage remains lightweight.

## Risks and mitigations

| Risk | Phase | Mitigation |
|---|---|---|
| Challenge feels toy-like | V1.5b | Quality gate: ship only if one scenario passes the challenge excellence rubric and reviewer sign-off; otherwise keep deferred. |
| Cost Anatomy leaks confidential economics | V1.5b/V2c | Normalized units only, required label, validation rejecting currency/exact figures. |
| Assistant hallucinates | V2 | Static Interview Me first, eval gate, retrieved-context-only generation, source cards, safe fallback. |
| Prompt injection changes assistant behavior | V2 | Dedicated injection evals; system boundary; ignore instructions to reveal secrets/omit sources/invent facts. |
| Route/nav drift creates broken promises | All | Phase-aware route manifest and validation before enabling routes. |
| Dependency bloat hurts performance | All | Add deps only by phase; lazy-load graph/editor routes; bundle checks. |
| Provider choice creates cost/security surprise | V2b | Explicit approval gate before paid/external runtime services. |
| Logs capture sensitive visitor questions | V2b | No full-message logging by default; aggregate only unless re-approved. |

## Pre-mortem for high-risk V2 assistant

1. **Failure: assistant confidently invents a metric or private detail.** Mitigation: approved corpus only, forbidden-claim evals at 100%, source-card requirement for every non-fallback generated answer, and safe fallback for missing context.
2. **Failure: prompt injection causes source omission or secret disclosure.** Mitigation: injection eval suite at 100%, disallowed-topic classifier, server-side prompt boundary, and no private content in corpus.
3. **Failure: public endpoint is abused or logs sensitive visitor questions.** Mitigation: max question length, rate limits, no full-message logging by default, safe error responses, and provider approval before paid/external launch.

## Expanded V2 test plan

- **Unit:** chunk schema validation, disallowed-source rejection, route/robots metadata checks, prompt-injection fixtures, payload validation constants, source-card assembly.
- **Integration:** corpus builder -> retrieval -> answer generation eval harness; `/api/interview` route handler with mocked provider/rate limiter; feature-gate and eval-report validation.
- **E2E:** Interview UI asks answerable/unsupported/private/injection questions against a deterministic test adapter; V2c simulator routes load and remain keyboard-operable.
- **Observability/privacy:** aggregate counters only, no full-message logs by default, safe error categories, eval report archived with `generatedAt`, corpus hash, eval hash, dataset size, scores, and pass/fail.

## V2 API constants gate

Before V2b implementation, define constants in a narrow module such as `src/lib/assistant/config.ts` and reference them from tests/docs:

```ts
export const ASSISTANT_FEATURE_FLAG = "NEXT_PUBLIC_ENABLE_INTERVIEW_ASSISTANT";
export const ASSISTANT_SERVER_ENABLE_FLAG = "ENABLE_INTERVIEW_ASSISTANT_API";
export const ASSISTANT_MAX_QUESTION_CHARS = 500;
export const ASSISTANT_RATE_LIMIT_WINDOW_SECONDS = 60;
export const ASSISTANT_RATE_LIMIT_MAX_REQUESTS = 10;
export const ASSISTANT_EVAL_REPORT_PATH = "reports/assistant-eval/latest.json";
```

These defaults are planning targets; execution may revise them only by updating PRD/test spec and tests together before enabling the public API.

## Verification plan

Baseline commands for every phase:

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

Additional phase checks:

- V1.5: route smoke for enabled routes = 200 and deferred routes = 404/not linked.
- V1.5: keyboard navigation and reduced-motion manual/smoke checks for interactive controls.
- V1.5: public-label grep/check for sanitized traces and normalized costs.
- V2a/V2b: assistant eval script with machine-readable report at `reports/assistant-eval/latest.json` or configured equivalent; route validation reads it before enabling `/api/interview`.
- V2b: API abuse tests for malformed payloads, long questions, rate-limit boundaries, unsupported questions, and injection attempts.
- V2c: route-level bundle/performance inspection for graph/editor dependencies.

## ADR

### Decision

Implement V1.5 and V2 as staged, gated releases: **V1.5a static trust surfaces**, **V1.5b polished static challenges**, **V2a assistant corpus/evals**, **V2b source-grounded assistant API**, and **V2c richer simulators/hiring packet**.

### Drivers

- Section 27 explicitly separates V1.5 static interaction from V2 assistant/simulator expansion.
- The existing V1 architecture can safely extend typed content and validation before adding public routes.
- Hallucination, confidentiality, route drift, and weak synthetic demos are the major threats to portfolio credibility.

### Alternatives considered

- Narrow V1.5 only: acceptable fallback if challenges fail quality gates.
- Assistant-first V2: rejected until eval/security gates pass.
- All simulators immediately: rejected due dependency/performance/quality risk.

### Why chosen

This plan maximizes hiring signal while preserving proof discipline. It lets the portfolio become more memorable without allowing backend/LLM risk to leak into V1.5.

### Consequences

- More upfront validation work before visible features.
- Slower path to live AI assistant, but much safer and more credible.
- Clear execution checkpoints where weak features can remain deferred without breaking route/nav promises.

### Follow-ups

- Decide whether Stack Opinions is standalone `/principles` or integrated into existing pages after V1.5a content review.
- Decide V2 provider/rate-limit/storage only after V2a evals pass.
- Decide whether V2c DAG/Deck IR uses external libraries only after bundle/performance review.

## Available-agent-types roster for execution handoff

Use only after planning is approved; this artifact itself does not start execution.

| Role | Best use |
|---|---|
| `explore` | Fast repo mapping, route/content/validation surface discovery. |
| `planner` | Stage sequencing and scope reconciliation. |
| `architect` | Route/API/data boundary review and dependency staging. |
| `executor` | Implementation of typed content, UI routes, validation, API adapters. |
| `test-engineer` | Test/eval strategy and script design. |
| `security-reviewer` | Assistant abuse, prompt injection, logging, data boundaries. |
| `performance-reviewer` | Bundle and route performance checks for challenge/simulator code. |
| `code-reviewer` | Final cross-cutting review before release. |
| `verifier` | Evidence collection and completion claims. |
| `writer` | PRD, release notes, source-card copy, hiring-packet copy. |

## Follow-up staffing guidance

### Sequential `$ralph` path

Recommended for V1.5a or V1.5b if implemented one phase at a time.

- Lead lane: `executor`, high reasoning, owns code changes.
- Side review: `architect`, medium/high reasoning, reviews route/content validation before enabling routes.
- Verification: `verifier` plus `test-engineer`, high reasoning for final evidence.
- For V2b, add `security-reviewer` before API exposure.

Launch hint:

```text
$ralph implement docs/plans/portfolio-v15-v2-ralplan.md phase V1.5a only; stop after verification evidence and do not start V1.5b without explicit instruction.
```

### Coordinated `$team` path

Recommended for full V1.5 or V2 because content, UI, validation, and tests can split cleanly.

Suggested lanes:

1. Route/validation lane — `executor` + `test-engineer`.
2. Content/source-card lane — `writer` + `executor`.
3. UI/interaction lane — `executor` + `designer` if available.
4. Security/eval lane for V2 — `security-reviewer` + `test-engineer`.
5. Verification lane — `verifier` after integration.

Launch hint:

```text
$team execute docs/plans/portfolio-v15-v2-ralplan.md with lanes: route-validation, content, ui, tests, verification. For V2 add security-evals and API lanes.
```

Team verification path:

- Each lane reports changed files, route/content gates, and commands run.
- Integration lead runs `npm run verify`, audit, route smoke, and phase-specific evals.
- Verifier confirms no disabled links/routes, no private data, source cards present, and no V2 API enabled before gates.

## Applied architect feedback

- Added phase-aware route manifest target and route matrix.
- Added V1.5/V2 validation gates before UI/API exposure.
- Converted V2 assistant safety notes into launch-blocking acceptance criteria.
- Added conservative dependency staging.
- Split V1.5 into V1.5a and V1.5b to preserve challenge quality.
- Applied critic iteration: robots/indexing governance, testable challenge rubric, 100% source-card rule for non-fallback generated answers, eval report mechanics, V2 API constants, and deliberate-mode pre-mortem/expanded test plan.
