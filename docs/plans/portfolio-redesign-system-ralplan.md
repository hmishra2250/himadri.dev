# RALPLAN: Portfolio Redesign System

**Status:** Consensus approved by Critic after official Architect iteration
**Scope:** System planning only; no app implementation in this phase
**Context:** Greenfield repository containing committed docs and local OMX planning artifacts

## Source of Truth

1. `docs/portfolio_redesign_uiux_frontend_technical_design_doc.md`
   - Sections 0-26: strategic design, IA, content system, component specs, delivery plan, QA, risks.
   - Section 27: execution alignment decisions and V1 scope lock.
2. `.omx/specs/deep-interview-portfolio-redesign.md`
   - Clarified requirements, non-goals, decision boundaries, acceptance criteria.
3. `docs/Himadri_Latest_Resume_April_2026.pdf`
   - Factual source for claims, metrics, company history, skills, awards, and education.
4. Official framework references checked during planning:
   - Next.js App Router docs.
   - Tailwind CSS Next.js installation docs.
   - shadcn/ui Next.js installation docs.
   - Motion reduced-motion docs.

## 1. Requirements Summary

Build a high-signal portfolio that persuades CTOs, founders, VPs Engineering, and senior AI/platform evaluators that Himadri builds production AI systems, not demos. V1 must optimize for senior AI/platform/LLM systems architect interviews, with recruiter-friendly pass-through as a secondary effect.

The execution rule from Section 27 controls all tradeoffs:

1. Narrative clarity
2. Resume-backed proof
3. Flagship case-study depth
4. Senior decision-making signal
5. Conversion clarity
6. Visual polish
7. Interactivity
8. AI assistant features

## 2. Compact RALPLAN-DR

### Principles

1. **Trust before spectacle:** optimize for technical evaluator confidence, not portfolio flash.
2. **Proof is a typed system:** every significant claim needs source, context, confidence, confidentiality level, public approval, and display intent.
3. **Static V1, active evaluation:** V1 can be static/no-backend, but must still show judgment through trace cards, decision forks, source-backed metrics, and architecture diagrams.
4. **Confidentiality is product quality:** sanitized/synthetic artifacts must be visibly labeled; private artifacts must be impossible to ship accidentally.
5. **Launch discipline beats feature breadth:** any feature that delays flagship case-study depth is cut or deferred.

### Decision Drivers

1. **Section 27 V1 lock:** V1 must ship Hero, Live System Pulse, Proof Wall, How I Think, Featured Agentic Market Research Platform case study, Decision Theater preview, Case Study Grid, Hiring Fit Matrix, Resume, and Contact CTA.
2. **60-second evaluator outcome:** CTO/founder/senior technical evaluators should understand production AI systems credibility quickly.
3. **Confidentiality boundaries:** use resume-backed metrics, sanitized diagrams, representative traces, and normalized costs; never publish private company/customer/internal artifacts without explicit approval.

### Viable Options

#### Option A — Evidence-first static V1, staged V1.5/V2 — chosen

Pros:
- Matches Section 27.
- Fastest credible launch path.
- Low hallucination, confidentiality, and backend risk.
- Performance-friendly.
- Lets resume-backed proof and flagship case study carry the persuasion system.

Cons:
- Must avoid feeling like a passive resume.
- Requires strong content architecture and polished static interactions.

#### Option B — Interactive-first V1

Pros:
- Highly memorable.
- Demonstrates product imagination.
- Could make the portfolio feel like a live systems museum immediately.

Cons:
- Conflicts with V1 non-goals.
- Increases JS/performance/a11y risk.
- Delays flagship proof and case-study depth.
- Synthetic simulations may reduce trust if not excellent.

#### Option C — AI-assistant-first V1

Pros:
- Strong topical fit for LLM systems positioning.
- Could create an impressive recruiter/CTO Q&A experience.

Cons:
- Explicitly deferred by Section 27.
- Requires retrieval, evals, source cards, prompt-injection handling, rate limits, fallback behavior, and privacy controls.
- Hallucination risk is higher than V1 hiring signal.

### Chosen Direction

Choose **Option A**. Include only lightweight V1 interactions that increase trust: expandable decision forks, source cards, static trace pulse, architecture diagrams, and clear CTA paths. Defer static Interview Me and polished challenge interactions to V1.5; defer real/source-grounded AI assistant to V2.

## 3. ADR

**Decision:** Build an evidence-first static V1 using Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui primitives, typed content, and MDX/structured case-study content. Defer full challenges, source-grounded assistant, real RAG, real traces, real sandbox execution, command palette, local search, and heavy 3D.

**Drivers:** Section 27 launch discipline; primary technical evaluator target; confidentiality constraints; greenfield repo; performance/accessibility targets.

**Alternatives considered:** interactive-first V1, AI-assistant-first V1, generic resume-style portfolio. Generic resume-style was rejected because it would underuse the strongest production AI systems evidence and fail the Section 27 CTO/founder trust goal.

**Why chosen:** It maximizes trust per unit effort while minimizing leakage, hallucination, overbuild, and launch delay.

**Consequences:** V1 quality depends on content/proof rigor, flagship case-study quality, and tasteful static system visuals. The content schema and validation gates become core architecture, not optional tooling.

**Follow-ups:** Add V1.5 static Interview Me and one polished challenge after V1 content is stable. Add V2 assistant only after retrieval/eval/source-card protections exist.

## 4. Public Route Manifest

### Required V1 public routes

These are required for launch:

- `/` — homepage persuasion system.
- `/case-studies` — case-study grid/index with all four work areas represented.
- `/case-studies/agentic-market-research-platform` — flagship polished case study.
- `/resume` — resume page and/or resume download path.
- `/contact` — contact path or mailto-led contact CTA.

### Allowed V1 routes only if content gate passes

Supporting case-study detail pages are allowed only if they do **not** delay the flagship case study and pass proof/confidentiality gates:

- `/case-studies/ml-infra-rescue`
- `/case-studies/computer-vision-product-systems`
- `/case-studies/high-performance-ar-and-vision`

If supporting detail pages risk delaying launch, V1 ships them as grid cards with concise summaries and disabled/detail-coming-later links omitted. No broken or coming-soon detail links.

### Deferred from V1

- `/interview-me` — V1.5 static curated mode unless explicitly re-approved.
- `/principles` — no separate V1 route unless homepage How I Think materially overflows; if created in V1, noindex and excluded from primary nav.
- `/challenges` — no V1 route unless it contains real polished content; do not ship a coming-soon page.
- Challenge detail routes — V1.5/V2 only.
- Interview API, real RAG, real trace ingestion, real sandbox execution, user accounts, database-backed features — V2+ only.

### Navigation V1

Primary nav should remain compact:

- Work
- Thinking or Principles anchor
- Resume
- Contact

Do not expose deferred routes in nav, sitemap, or primary CTAs.

## 5. Content and Proof Architecture

### Proof inventory

Create a structured proof inventory from the resume and design doc before implementing UI:

- Knit: 48-72h to <1h report turnaround; 30-50 sandbox tasks; independent judge verification; DAG orchestration; 15-25 Highcharts; OpenTelemetry/Langfuse; pgvector RAG; memo-to-PPTX/deck IR pipeline.
- Epic!: 10x platform cost reduction; 100x Kubernetes pod reduction; 99% spot error reduction; 50% Docker build-time reduction; autocomplete outperformed prior solution in 80%+ cases.
- Osmo/Tangible Play: 93% to 98% worksheet CV accuracy; 80% IoU shaded-region model; 20% engagement lift; 99% tagging effort reduction.
- Whodat: C++ ORB detector 20% faster than ORB-SLAM baseline.
- Awards/education: IIT-BHU, Kaggle top 6%, Berkeley/Microsoft/ICPC signals.

### Claim/proof schema

Every public claim/metric/system artifact should be represented as structured content with at least:

```ts
type ProofClaim = {
  id: string;
  claim: string;
  sourcePath: string;
  sourceLocator: string;
  sourceType: "resume" | "design-doc" | "case-study-draft" | "public-profile" | "sanitized-artifact" | "synthetic-example";
  confidence: "high" | "medium" | "inferred";
  confidentialityLevel: "public" | "sanitized" | "private-do-not-publish";
  approvedForPublicUse: boolean;
  publicLabelRequired: boolean;
  publicLabel?: string;
  displayContexts: Array<"hero" | "proof-wall" | "case-study" | "trace" | "decision-theater" | "hiring-fit" | "resume" | "source-card">;
};
```

### Build/content validation gates

Build or content validation must fail if:

- `confidentialityLevel === "private-do-not-publish"` appears in a public route.
- A public claim has no `sourcePath` or `sourceLocator`.
- A company-specific claim has `approvedForPublicUse !== true`.
- A sanitized/synthetic trace, cost model, diagram, or artifact has `publicLabelRequired === true` but no visible public label.
- Cost values are actual/non-normalized internal costs rather than normalized units.
- A public route links to a deferred/empty/coming-soon page.

### Labels

Use explicit labels such as:

> Sanitized representative trace. Customer data, private prompts, and internal implementation details omitted.

> Representative normalized cost model. Exact company costs omitted.

## 6. V1 Product Architecture

### Homepage sections

Build in this order:

1. Hero
2. Live System Pulse
3. Proof Wall
4. How I Think
5. Featured Case Study: Agentic Market Research Platform
6. Decision Theater Preview
7. Case Study Grid
8. Hiring Fit Matrix
9. Contact CTA / Resume CTA

### Component system

Core V1 components:

- Layout: `Navbar`, `Footer`, `PageShell`.
- Home: `Hero`, `LiveSystemPulse`, `ProofWall`, `HowIThink`, `FeaturedCaseStudy`, `DecisionTheaterPreview`, `CaseStudyGrid`, `HiringFitMatrix`, `ContactCTA`.
- Case study: `CaseStudyHeader`, `ArchitectureDiagram`, `DecisionTheater`, `ExecutionFlow`, `ImpactMetrics`, `ReflectionBlock`.
- UI/content: `MetricCard`, `StackTag`, `SectionHeader`, `TraceSpanRow`, `ForkCard`, `SourceBadge`, `ConfidentialityLabel`.

### Static interactions allowed in V1

- Looping/static representative trace with reduced-motion fallback.
- Expandable decision forks.
- Source/evidence cards.
- Static architecture diagrams.
- Responsive metric cards.
- Simple anchor navigation.

### V1 banned implementation patterns

- Real LLM/RAG assistant.
- Real trace ingestion.
- Real sandbox execution.
- Full challenge simulators.
- Heavy 3D.
- Command palette.
- Local search.
- Paid backend infrastructure unless explicitly approved.

## 7. Technical Architecture

### Stack

- Framework: Next.js App Router.
- Language: TypeScript.
- Styling: Tailwind CSS.
- UI primitives: shadcn/ui where useful; avoid over-installing components.
- Content: typed TS/JSON plus MDX for case studies.
- Motion: Motion/Framer-style animation only where it explains systems; respect reduced motion.
- Hosting: Vercel or equivalent static-friendly deployment.
- Analytics/error tracking: optional V1; add only if lightweight and not blocking.

### Suggested project structure

```txt
src/
  app/
    page.tsx
    case-studies/
      page.tsx
      [slug]/page.tsx
    resume/page.tsx
    contact/page.tsx
  components/
    layout/
    home/
    case-study/
    ui/
  content/
    profile.ts
    proof.ts
    metrics.ts
    principles.ts
    case-studies/
    trace-examples.ts
    hiring-fit.ts
  lib/
    content.ts
    validation.ts
    routes.ts
    metadata.ts
  styles/
    globals.css
public/
  resume/
```

### Route guarding

Maintain an explicit V1 route manifest in code and validate:

- Sitemap only includes approved V1 public routes.
- Nav only includes approved V1 destinations.
- Deferred routes are absent, disabled, or noindex according to manifest.

### Resume/contact privacy policy

Default V1 rule:

- The downloadable resume may preserve the user-provided PDF as the conventional artifact.
- Web contact surfaces should emphasize email, LinkedIn, GitHub, and contact CTA.
- Do not add extra personal contact exposure beyond what is already in the resume without explicit approval.
- If a web-rendered resume duplicates the PDF, treat phone number display as a publication/privacy decision requiring explicit review before launch.

## 8. Execution Phases

### Phase 0 — Plan artifacts

- Finalize RALPLAN consensus.
- Create PRD and test spec under `.omx/plans/`.
- Use design doc + deep-interview spec as execution source of truth.

### Phase 1 — Proof/content foundation

- Extract proof inventory from resume and design doc.
- Define `ProofClaim`, metrics, principles, case-study metadata, trace examples, and hiring-fit data.
- Add validation rules before public UI consumes content.
- Draft flagship case study before visual polish.

### Phase 2 — UX/visual system

- Convert homepage storyboard into desktop/mobile wireframes.
- Define tokens for dark technical editorial style.
- Specify typography, spacing, card styles, trace visual language, diagram style, focus states, and reduced-motion behavior.

### Phase 3 — App foundation

- Scaffold Next.js/TypeScript/Tailwind app.
- Add shadcn/ui only for needed primitives.
- Configure strict TypeScript, lint, formatting, metadata, sitemap/robots, and route manifest tests.
- Add build/content validation scripts.

### Phase 4 — Homepage V1

- Implement all required homepage sections from content/proof schema.
- Keep Live System Pulse lightweight and labeled.
- Ensure all major claims show context and source affordances.

### Phase 5 — Case studies and conversion

- Polish flagship Agentic Market Research Platform page.
- Implement supporting case-study pages only if the content gate passes without delaying flagship depth; otherwise ship grid summaries only.
- Add resume route/download and contact route/CTA.

### Phase 6 — QA and launch readiness

- Run verification checklist.
- Perform manual CTO/founder/recruiter/skeptical-engineer review against Section 27.
- Fix launch blockers.

### Phase 7 — V1.5

- Static Interview Me with curated sourced answers.
- One polished Debug This Agent scenario.
- Cost Anatomy with normalized static toggles.
- Stack Opinions / Production AI Beliefs.
- Improved flagship diagrams.

### Phase 8 — V2a assistant

- Define chunks, embeddings/vector store, retrieval, grounded generation, source cards, eval set, prompt-injection handling, rate limiting, fallback behavior, and logging privacy.
- Ship only after assistant evals pass.

### Phase 9 — V2b simulations

- Multiple debug scenarios.
- DAG execution simulator.
- Deck IR previewer/editor.
- Optional downloadable hiring packet.

## 9. Acceptance Criteria

### V1 content/proof

- Every public claim/metric has a valid proof object.
- No private/proprietary data appears.
- Sanitized/synthetic artifacts are visibly labeled.
- Cost examples use normalized units only.
- Flagship case study includes problem, constraints, architecture, decisions, execution flow, evaluation/reliability, observability/debugging, cost/performance, metrics, and reflection.

### V1 product quality

- Lighthouse Performance 90+.
- Accessibility 95+.
- SEO 95+.
- LCP <2.5s.
- CLS <0.1.
- INP in good range.
- Mobile layout has no horizontal overflow.
- Resume path works.
- Contact path works.
- No broken links.
- No deferred/empty route is discoverable from nav/sitemap.
- Homepage bundle excludes heavy challenge/simulator dependencies.

### V1 hiring signal

- CTO test: the site creates interest in how the systems were built.
- Founder test: the site suggests Himadri can own a serious AI platform from zero to one.
- Recruiter test: Hiring Fit Matrix enables internal pitch.
- Skeptical engineer test: tradeoffs, failure modes, and implementation realism are concrete.

## 10. Verification Strategy

Before claiming V1 complete, run and record:

- `typecheck`
- `lint`
- formatting check
- content-schema validation
- route/sitemap/nav manifest validation
- build
- bundle inspection for homepage dependency budget
- accessibility scan plus manual keyboard/focus/reduced-motion checks
- Lighthouse/performance report
- broken-link check
- mobile viewport QA
- confidentiality review against Section 27.4-27.5
- resume/contact smoke test

For V1.5/V2 add:

- interaction tests
- assistant eval tests
- prompt-injection tests
- rate-limit tests
- retrieval/source-card checks
- unsupported-question fallback tests

## 11. Risks and Mitigations

1. **Mock telemetry feels fake** — label it clearly; keep timings plausible; anchor surrounding claims in resume-backed proof.
2. **Confidentiality leak** — enforce proof schema, validation gates, and manual security/confidentiality review.
3. **Overbuild delays launch** — route manifest and Section 27 pressure pass cut nonessential routes/features.
4. **Static V1 feels passive** — use lightweight decision/proof interactions and strong diagrams without real execution.
5. **Supporting case studies dilute flagship depth** — allow supporting detail routes only after content gate; otherwise grid summaries only.
6. **Stack opinions sound arrogant** — frame as production lessons with evidence.
7. **V2 assistant hallucinates** — ship static Interview Me first; require evals and source-grounding before real assistant.

## 12. Handoff Staffing Guidance

### Available agent-type roster

- `planner`: PRD/test-spec maintenance and scope sequencing.
- `architect`: architecture boundaries, content schema, route manifest review.
- `executor`: implementation of app foundation, components, content rendering.
- `designer`: UX/visual direction, wireframes, motion/reduced-motion behavior.
- `writer`: proof inventory, homepage copy, case studies, interview answers.
- `test-engineer`: test strategy, validation scripts, route/content checks.
- `security-reviewer`: confidentiality and public-data boundary review.
- `verifier`: final launch evidence and checklist audit.
- `code-reviewer`: holistic quality review.
- `performance-reviewer`: bundle, Lighthouse, Core Web Vitals.

### Sequential execution path

Best if sequential ownership and verification pressure matter more than parallel speed:

1. `writer` produces proof inventory and case-study drafts.
2. `designer` produces UX/visual spec.
3. `executor` builds foundation/home/case-study system.
4. `test-engineer` adds verification gates.
5. `security-reviewer` reviews confidentiality.
6. `verifier` validates launch criteria.

Suggested reasoning: high for executor/designer/test/security; medium for writer/verifier.

### Team execution path

Best if speed matters and lanes can stay coordinated:

- Lane A `writer`: proof inventory, claims, homepage/case-study copy.
- Lane B `designer`: wireframes, visual tokens, interaction specs.
- Lane C `executor`: app foundation and shared components.
- Lane D `executor`: content/case-study rendering and route manifest.
- Lane E `test-engineer`/`verifier`: validation scripts, a11y/perf/route/content checks.
- Lane F `security-reviewer`: confidentiality and V2 assistant risk review.

Team verification path:

- Each lane reports changed files, evidence, and blockers.
- Verification lane proves build/typecheck/lint/content validation/routes/a11y/perf/broken links pass.
- Security lane signs off on confidentiality gate.
- Final verifier audits against Section 27 and the PRD/test spec.
