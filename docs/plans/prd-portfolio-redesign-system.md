# PRD: Portfolio Redesign System

## 1. Product Goal

Build a high-signal portfolio that convinces CTOs, founders, VPs Engineering, and senior AI/platform evaluators that Himadri Mishra builds production AI systems, not demos.

V1 optimizes for senior AI engineer, AI platform engineer, and LLM systems architect interviews. Recruiter pass-through is secondary and should emerge from clear proof, metrics, and the Hiring Fit Matrix.

## 2. Source of Truth

- `docs/portfolio_redesign_uiux_frontend_technical_design_doc.md`, especially Section 27.
- `.omx/specs/deep-interview-portfolio-redesign.md`.
- `docs/Himadri_Latest_Resume_April_2026.pdf` for factual proof points.
- `.omx/plans/portfolio-redesign-system-ralplan.md` for consensus planning decisions.

## 3. V1 Scope

### Required V1 public routes

- `/`
- `/case-studies`
- `/case-studies/agentic-market-research-platform`
- `/resume`
- `/contact`

### Conditional V1 routes

Supporting case-study pages may ship only if they do not delay the flagship case study and pass proof/confidentiality gates:

- `/case-studies/ml-infra-rescue`
- `/case-studies/computer-vision-product-systems`
- `/case-studies/high-performance-ar-and-vision`

If not ready, the case-study grid shows concise cards only, with no broken or coming-soon links.

### Deferred from V1

- `/interview-me`
- `/principles` as a standalone indexed route
- `/challenges` and challenge detail routes
- Interview API, RAG, real assistant, real traces, sandbox execution, local search, command palette, heavy 3D, paid backend infrastructure

## 4. Required Homepage Sections

1. Hero with sharp positioning
2. Live System Pulse with sanitized representative trace label
3. Proof Wall with contextual metrics
4. How I Think with evidence links
5. Featured Agentic Market Research Platform case study
6. Decision Theater preview
7. Case Study Grid
8. Hiring Fit Matrix
9. Contact CTA / Resume CTA

## 5. Content Requirements

Every public claim must be represented as a proof object with:

- claim text
- source path
- source locator
- source type
- confidence
- confidentiality level
- public approval flag
- whether a visible public label is required
- display contexts

Public routes must not render private claims, unsourced company claims, unlabeled sanitized/synthetic artifacts, or actual internal cost figures.

## 6. Core Proof Points

Use resume-backed claims only unless additional public-safe evidence is approved:

- Knit: 48-72h to <1h report turnaround; 30-50 sandbox tasks; judge verification; DAG orchestration; 15-25 Highcharts; OpenTelemetry/Langfuse; pgvector RAG; deck/PPTX pipeline.
- Epic!: 10x infra cost reduction; 100x pod reduction; 99% spot error reduction; 50% Docker build-time reduction; 80%+ autocomplete improvement cases.
- Osmo: 93% to 98% CV accuracy; 80% IoU model; 20% engagement lift; 99% tagging effort reduction.
- Whodat: C++ ORB detector 20% faster than ORB-SLAM baseline.
- Awards/education: IIT-BHU, Kaggle top 6%, Berkeley/Microsoft/ICPC signals.

## 7. Non-Functional Requirements

- Lighthouse Performance 90+
- Accessibility 95+
- SEO 95+
- LCP <2.5s
- CLS <0.1
- INP in good range
- Mobile layout with no horizontal overflow
- No broken links
- Resume path works
- Contact path works
- Reduced-motion support
- Keyboard navigable interactions
- No heavy challenge/simulator dependencies in homepage bundle

## 8. Privacy and Confidentiality

Never publish customer data, survey datasets, proprietary prompts, internal rubrics, non-public screenshots, exact internal costs, private decks, internal code, secrets, endpoints, tokens, keys, or infrastructure identifiers.

Sanitized traces and normalized cost examples must be visibly labeled.

Downloadable resume may preserve the provided PDF. Web contact surfaces should emphasize email, LinkedIn, GitHub, and contact CTA. Displaying phone number outside the PDF requires explicit launch review.

## 9. Acceptance Criteria

V1 is done when:

- A CTO/founder/senior technical evaluator can understand within 60 seconds that Himadri builds production AI systems with real outcomes.
- Flagship case study demonstrates architecture, decisions, evaluation, observability, cost/performance awareness, and impact.
- Hiring Fit Matrix lets a recruiter pitch Himadri internally.
- Skeptical engineer can see concrete tradeoffs and failure-mode realism.
- All product quality and confidentiality checks pass.

## 10. Execution Recommendation

Recommended execution path: sequential owner or coordinated team using this PRD, the test spec, and the RALPLAN as binding inputs. Do not implement deferred features unless V1 scope is explicitly changed.
