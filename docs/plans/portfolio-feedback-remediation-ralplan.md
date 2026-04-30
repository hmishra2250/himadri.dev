# Portfolio Feedback Remediation Ralplan

## Task

Plan the work needed to address the latest portfolio feedback while preserving the existing route, assistant, analytics, Gemini, confidentiality, no dependency, and no em dash constraints.

## RALPLAN-DR summary

### Principles

1. Human-first portfolio polish over proof theater.
2. Keep real safety and confidentiality contracts, but remove defensive homepage boilerplate.
3. Prioritize high-intent surfaces: hero, featured case study, assistant, contact, resume, and principles.
4. Avoid new routes and dependencies in this pass.
5. Keep challenges only where they create immediate value, otherwise demote them without breaking existing routes.

### Decision drivers

1. The feedback identifies human credibility issues: proof labels, disclaimers, dummy-feeling challenges, and fit-matrix copy feel built for an LLM rather than a person.
2. The current repo has clear component touchpoints for each issue.
3. Execution must preserve validation, route manifest authority, assistant gates, and confidentiality checks.

### Viable options

#### Option A: Surgical high-signal polish, chosen

Pros:
- Directly fixes the user-visible issues without changing the route model.
- Keeps validation and gated assistant behavior intact.
- Avoids new dependencies and broad redesign risk.

Cons:
- Leaves deeper challenge redesign for a later pass.
- Requires careful copy checks to avoid reintroducing proof theater.

#### Option B: Broad redesign plus new decision route, rejected

Pros:
- Could create a stronger long-term decision archive and challenge experience.

Cons:
- Expands route, sitemap, nav, smoke-test, and content scope.
- Not needed to fix the current feedback.

#### Option C: Remove challenges entirely, rejected for this pass

Pros:
- Removes the weakest perceived surface quickly.

Cons:
- Loses a differentiated interactive signal.
- Existing enabled challenge routes can be improved or demoted without route churn.

#### Option D: Keep all disclaimers as-is, rejected

Pros:
- Lowest confidentiality risk.

Cons:
- Keeps the exact defensive copy pattern the user flagged.

## ADR

### Decision

Execute a surgical polish pass that makes the homepage and key supporting routes feel human, premium, and concrete. Remove or rewrite weak labels, disclaimer overuse, and LLM-ish fit language. Keep compact public-safety labels where validation and confidentiality require them.

### Drivers

- The user wants fewer basic proof labels and fewer defensive disclaimers.
- The portfolio should sell production AI judgment through clear artifacts and interactions, not repeated provenance labels.
- Existing routes and assistant gates must not regress.

### Alternatives considered

- New global decisions route, rejected for scope control.
- Full challenge removal, rejected because keeping routes enabled while demoting weaker cards is safer.
- Full disclaimer removal, rejected because representative and sanitized examples still need public labeling.

### Consequences

- Homepage should read less like a machine-generated proof wall.
- The assistant and case-study surfaces should carry more of the conversion burden.
- Validators may need copy-aware updates only if wording contracts are intentionally changed.

## Prioritized implementation plan

### P0: Guardrails and validation contracts

Touchpoints:
- `src/lib/routes.ts`
- `src/lib/validation.ts`
- `scripts/validate-confidentiality.ts`
- `src/content/proof.ts`
- `src/content/traces.ts`
- `src/content/challenges/index.ts`

Tasks:
1. Preserve `/api/interview` as internal and gated by `ENABLE_INTERVIEW_ASSISTANT_API`.
2. Preserve live assistant UI gating through `NEXT_PUBLIC_ENABLE_INTERVIEW_ASSISTANT` plus route manifest checks.
3. Preserve Gemini server-only behavior and GA coarse-event behavior.
4. Preserve route manifest authority for nav, sitemap, robots, and public links.
5. Do not add dependencies.
6. Do not add em dashes in authored content.
7. Keep `traceLabel` valid for content validation. If displayed on homepage, use compact wording that still says sanitized representative.
8. Keep debug scenario public labels valid for confidentiality validation, but stop repeating them as large homepage copy.

### P1: Homepage trust polish

Touchpoints:
- `src/components/home/Hero.tsx`
- `src/content/metrics.ts`
- `src/styles/globals.css`
- `src/components/home/LiveSystemPulse.tsx`
- `src/content/traces.ts`
- `src/components/home/HowIThink.tsx`
- `src/content/principles.ts`
- `src/components/home/FeaturedCaseStudy.tsx`
- `src/components/home/DecisionTheaterPreview.tsx`
- `src/components/home/CaseStudyGrid.tsx`

Tasks:
1. Remove the `Proof in the first scroll` heading from the hero proof panel.
2. Make all four hero metric boxes equal size and shape in a 2 by 2 grid. Remove the first-card span styling.
3. Add a short human description to each hero metric, sourced from existing `metric.context` or a shortened equivalent.
4. Increase spacing between the hero headline and subtitle so the headline breathes consistently with surrounding spacing.
5. Replace the long Live System Pulse homepage disclaimer with the exact compact label:
   - `Sanitized representative workflow trace, private details omitted.`
6. Keep richer confidentiality language available in content data or detail surfaces where validation requires it.
7. Replace `Inspect evidence` CTAs in the homepage principles area with visitor-facing labels, for example:
   - `Read case study`
   - `Open cost model`
   - `See workflow`
8. Reframe the featured case-study architecture panel as work owned and shipped by Himadri. Use labels such as:
   - `System I architected and shipped`
   - `Workflow I owned end to end`
9. Add an ownership and result callout using existing case-study role and metrics. Do not invent metrics.
10. Rename the Decision Theater CTA so the target is honest. Use one of:
   - `See Knit decision forks`
   - `Open case-study decisions`
11. Equalize the case-study grid. Remove the special oversized Knit card in `CaseStudyGrid` because Knit is already featured above.

### P2: Challenges and interactive labs

Touchpoints:
- `src/components/home/ChallengesPreview.tsx`
- `src/app/challenges/page.tsx`
- `src/components/challenges/DebugScenarioView.tsx`
- `src/components/challenges/CostAnatomy.tsx`
- `src/components/challenges/DagSimulator.tsx`
- `src/components/challenges/DeckIrPreviewer.tsx`
- `src/content/challenges/index.ts`
- `src/lib/routes.ts`

Decision:
- Keep all currently enabled challenge routes enabled.
- Homepage promotes only the two strongest labs after copy and visual hierarchy improvements: Debug This Agent and Cost Anatomy.
- `/challenges` index still lists enabled routes, but weaker entries are framed as lightweight simulators rather than flagship proof.
- Do not create or remove routes in this pass.

Tasks:
1. Rewrite homepage Interactive Lab copy to make the reward obvious within one glance.
2. Remove `Diagnostic proof` language.
3. Make Debug This Agent preview explain the payoff: trace clue, diagnosis, fix, and why it matters.
4. Make Cost Anatomy preview explain the payoff: routing, retries, judge coverage, and unit economics.
5. On `/challenges`, polish cards for all enabled challenges so they do not feel like dummy tasks. Use clear labels:
   - `Guided trace diagnosis`
   - `Unit economics model`
   - `Workflow recovery simulator`
   - `Deck artifact inspector`
6. In Debug This Agent, hide correctness until after a choice, then show selected answer, correct answer, diagnosis, and production fix.
7. Strengthen the result panel title and copy. Use labels such as `Diagnosis result` and `Production fix` rather than `Reveal diagnosis and fix`.
8. Keep debug scenario public labels valid for validators, but display them more compactly.
9. In Cost Anatomy, replace duplicated disclaimer text with one clean sentence that still avoids exact company costs and private details.
10. Do not send answer text, free-form user text, or private content through analytics.

### P3: Interview and chat presentation

Touchpoints:
- `src/components/home/InterviewMePreview.tsx`
- `src/components/interview/InterviewMe.tsx`
- `src/components/interview/LiveAssistant.tsx`
- `src/content/interview/index.ts`
- `src/styles/globals.css`

Tasks:
1. Homepage Interview Me preview should show only the chat assistant preview and CTA. Remove static question cards from the homepage preview.
2. Remove all `Best for:` labels from homepage and full Interview Me pages.
3. Keep the full Interview Me route chat-first, with static curated answers below.
4. Keep `InterviewMe` as a server component.
5. Preserve live assistant gates exactly.
6. Restyle `LiveAssistant` to read like a chat interface:
   - stronger shell
   - sample question chips
   - input as a chat composer
   - answer as assistant bubble
   - sources as supporting cards
7. Do not change assistant API payload shape or analytics event payloads.

### P4: Humanize or remove weak supporting sections

Touchpoints:
- `src/components/home/HiringFitMatrix.tsx`
- `src/content/hiring-fit.ts`
- `src/content/interview/index.ts`
- `src/app/resume/page.tsx`
- `src/components/principles/StackOpinions.tsx`
- `src/content/stack-opinions.ts`

Tasks:
1. Replace homepage Hiring Fit Matrix with a human-readable section such as `Where I am useful`, or remove it from homepage.
2. Recommended path: keep the section but rewrite it into 3 to 4 plain cards for human readers.
3. Preserve `id="hiring-fit"` if any source card continues linking to `/#hiring-fit`; otherwise update the link in `src/content/interview/index.ts` to a live enabled route.
4. Remove the irrelevant resume note:
   - `Web contact surfaces emphasize email, LinkedIn, GitHub, and the resume artifact. Additional personal contact exposure should be reviewed before launch.`
5. Rewrite the Highcharts stack opinion. Replace `Highcharts is underrated for AI products.` with a principle around artifact boundaries, for example:
   - `Generated analytics need artifact boundaries.`
6. Reframe the Highcharts opinion around the real work: generated chart specs, editable web chart objects, quality checks, and translation into native PPTX charts.
7. Replace `Inspect the evidence` on Principles with `Read related case study`, `Open cost model`, or equivalent human CTA.

### P5: Verification and browser QA

Commands:

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

Targeted copy-regression check:

```bash
rg -n "Resume verified|Inspect evidence|Inspect the evidence|Best for:|Proof in the first scroll|Diagnostic proof|Representative normalized model" src/app src/components src/content
```

Expected result:
- No public UI matches.
- Any intentional content-data matches must be documented and not rendered on public pages.

Browser QA routes:
- `/`
- `/interview-me`
- `/resume`
- `/principles`
- `/challenges`
- `/challenges/debug-this-agent`
- `/challenges/cost-anatomy`

Browser QA viewports:
- mobile, 375px wide
- desktop, 1440px wide

## Acceptance criteria

1. Hero proof panel has no heading and contains four equal metric cards with useful descriptions.
2. Hero headline to subtitle spacing is visibly improved.
3. Live System Pulse shows compact public-safety wording, not the long defensive disclaimer.
4. No `Resume verified`, `Inspect evidence`, `Inspect the evidence`, `Best for:`, `Proof in the first scroll`, `Diagnostic proof`, or duplicated cost disclaimer appears in public UI.
5. Featured case-study architecture preview clearly states that the workflow was architected and shipped by Himadri.
6. Decision Theater CTA accurately describes the Knit case-study target.
7. Case-study grid no longer gives Knit an oversized card after the featured section.
8. Homepage Interactive Lab is either clearly rewarding for Debug and Cost or removed from homepage. This plan chooses the improved Debug and Cost path.
9. `/challenges` index frames all enabled routes honestly and avoids dummy-task language.
10. Debug This Agent hides correctness until after a choice and then shows selected answer, correct answer, diagnosis, and production fix.
11. Homepage Interview Me preview is chat-first only.
12. Full Interview Me has chat first and no `Best for:` labels.
13. Live assistant looks visually like a chat surface, not a generic form.
14. Hiring Fit Matrix is rewritten for humans or removed from homepage, with anchors updated safely.
15. Resume irrelevant contact/confidentiality note is removed.
16. Highcharts principle is reframed around generated analytics and artifact boundaries.
17. Route, assistant, Gemini, GA, confidentiality, no dependency, and no em dash constraints remain intact.

## Execution staffing guidance

### Recommended sequential Ralph path

Use `$ralph` with one executor and one verifier because many changes touch shared homepage and CSS files.

Suggested roles:
- `executor`, high reasoning: implement the copy, component, and CSS changes.
- `verifier`, high reasoning: run commands, copy grep, route checks, and browser QA evidence.
- `code-reviewer`, high reasoning: review final diff for human-facing quality and constraint preservation.

Launch hint:

```text
$ralph implement .omx/plans/portfolio-feedback-remediation-ralplan.md sequentially, preserve route and assistant gates, and commit after green verification
```

### Parallel team path

Use `$team` only if speed is more important than minimizing merge conflicts.

Lanes:
1. Homepage lane: Hero, Live System Pulse, How I Think, Featured Case Study, Decision Theater, CaseStudyGrid, Hiring section.
2. Interview/chat lane: InterviewMePreview, InterviewMe, LiveAssistant, interview content.
3. Challenges lane: ChallengesPreview, Challenges index, DebugScenarioView, CostAnatomy, challenge content.
4. Verification lane: validation, copy grep, browser QA.

Launch hint:

```text
$team implement portfolio feedback remediation with lanes for homepage polish, interview chat, challenge quality, and verification
```
