# Portfolio Redo Codex

Status: proposed redo brief
Date: 2026-05-14
Scope: planning artifact for a future implementation pass. This document does not authorize route exposure, dependency changes, public API launch, or confidential content publication by itself.

## Source inputs

1. `reports/portfolio-comparison/deep-review.md`
   - Comparison against Shreyansh Singh's public portfolio, GitHub, and CV.
   - Key finding: Himadri has stronger production AI ownership evidence, but weaker public compounding and public artifact density.
2. `docs/portfolio_redesign_uiux_frontend_technical_design_doc.md`
   - Existing source of truth for evidence-first product direction.
3. `docs/plans/portfolio-feedback-remediation-ralplan.md`
   - Current human-first polish plan.
4. `docs/plans/portfolio-seo-indexing-compliance-ralplan.md`
   - Current SEO, indexing, and structured data guardrails.
5. `src/content/proof.ts`
   - Approved public proof claims.
6. `public/resume/Himadri_Latest_Resume_April_2026.pdf`
   - Resume-backed factual claims.

## Redo thesis

The portfolio should stop feeling like a polished resume website and become a public proof engine for production AI systems.

The current site already has the right foundation: route governance, proof claims, typed content, confidentiality rules, case studies, and validation. The redo should not throw that away. The redo should make the public visitor feel three things within the first 60 seconds:

1. Himadri has owned messy production AI systems, not demos.
2. Himadri can turn ambiguous workflows into reliable, observable, cost-aware software.
3. Himadri is actively compounding in public again.

The main portfolio problem is not lack of achievements. It is that the strongest achievements are locked inside resume bullets, private work, or recently built local systems. The redo must convert that into a visible trail.

## Target positioning

Primary identity:

> Production AI Systems Engineer for agentic workflows, evals, observability, cost control, and artifact generation.

Secondary identities:

- AI platform architect
- Staff-level senior IC
- Founding AI engineer for workflow automation products
- ML systems generalist with computer vision and infrastructure depth

Do not lead with:

- Generic "Senior AI Engineer"
- Generic "LLM systems"
- A broad list of every domain
- A defensive career-break explanation
- A novelty assistant as the primary proof

## Primary audience

1. Founders hiring a founding AI engineer.
2. AI platform or product teams hiring senior/staff ICs.
3. Engineering leaders who need someone to own agentic workflow reliability.
4. Recruiters screening for senior AI/ML platform roles.

Secondary audience:

1. Technical peers evaluating depth.
2. Hiring managers comparing against ML systems candidates.
3. Future collaborators reading public technical notes.

## Core narrative

Current narrative:

> I am a senior AI engineer building production-grade agentic systems.

Redo narrative:

> I build production AI systems that convert messy workflows into verified artifacts: reports, charts, decks, search behavior, recommendations, and computer vision outputs. My edge is not prompts. It is execution graphs, evaluation, observability, cost control, and recovery boundaries.

This narrative should be repeated consistently across homepage, case studies, GitHub profile, resume page, and future technical notes.

## Information architecture

### Top-level nav

Keep the nav small and job-oriented:

1. Work
2. Notes
3. Labs
4. Resume
5. Contact

Optional:

- Interview Me can stay as a CTA or secondary route, but it should not compete with Work and Notes in the main nav until the live assistant is demonstrably excellent.

### Recommended route model

Keep current route governance in `src/lib/routes.ts`, but reshape public hierarchy around proof compounding:

| Route | Purpose | Priority |
|---|---|---:|
| `/` | proof engine homepage | P0 |
| `/work` or existing `/case-studies` | production case-study index | P0 |
| `/case-studies/agentic-market-research-platform` | flagship proof | P0 |
| `/case-studies/ml-infra-rescue` | infra and cost proof | P0 |
| `/case-studies/computer-vision-product-systems` | non-LLM production depth | P1 |
| `/notes` | public technical writing index | P0 |
| `/notes/dag-judge-verification` | first deep technical note | P0 |
| `/notes/cost-anatomy-agentic-reports` | second deep technical note | P1 |
| `/notes/ml-infra-rescue-after-layoffs` | third deep technical note | P1 |
| `/labs` or existing `/challenges` | interactive proof surfaces | P1 |
| `/resume` | resume plus promotion packet framing | P0 |
| `/contact` | segmented hiring CTA | P0 |
| `/interview-me` | source-grounded Q&A, static-first | P1 |

Route naming decision:

- If preserving current URL equity is more important, keep `/case-studies` and `/challenges`.
- If doing a deeper public relaunch, add `/work`, `/notes`, and `/labs` as simpler public labels, while redirecting old route names.
- Do not change route names without updating sitemap, robots, nav, route smoke tests, and link validation.

## Homepage redo

### First viewport

Goal: senior proof in one scan.

Structure:

1. Small status line:
   - "Production AI systems, evals, observability, workflow automation"
2. Hero headline:
   - "I turn messy workflows into verified AI artifacts."
3. Subhead:
   - "Senior AI engineer with 8 years across agentic reporting, ML infrastructure, search, and computer vision. I design the execution graphs, evaluators, observability, and cost controls that make AI systems usable in production."
4. CTA row:
   - Primary: "Read flagship system"
   - Secondary: "See technical notes"
   - Tertiary: "Download resume"
5. Right side:
   - One concise system proof panel, not four equal cards.
   - Show the flagship pipeline: raw survey data -> DAG -> sandbox -> judge -> charts -> deck.
   - Include three hard metrics beneath it:
     - "48-72h to <1h report turnaround"
     - "10x ML infra cost reduction"
     - "93% to 98% CV accuracy lift"

Avoid:

- Clipped mobile heading.
- Too many nav links.
- Generic SaaS hero cards.
- A first-fold trace that looks decorative before the visitor understands the story.

### Second viewport

Add "Current proof trail."

Purpose: solve the public compounding gap.

Include:

- Latest technical note.
- Latest public repo.
- Latest case-study update.
- Latest benchmark or artifact.
- Current target role.

Example:

```txt
Current proof trail
2026-05: Qwen3.6 35B MoE on 8 GB VRAM, benchmarked with auditable SWE tasks
2026-05: himadri.dev rebuilt as a proof-gated portfolio system
2026-04: AI content workflow platform, local/private-first
2025-2026: Agentic market research platform, raw survey data to verified PPTX decks
```

### Third viewport

Show "Systems shipped."

Use three strong case-study lanes:

1. Agentic Market Research Platform
   - Product outcome: 48-72h to <1h.
   - System proof: DAG, sandbox, judge, charts, deck IR.
2. ML Infrastructure Rescue
   - Product outcome: 10x cost reduction.
   - System proof: Kubernetes, search, recommendations, spot reliability.
3. Computer Vision Product Systems
   - Product outcome: 93% to 98% accuracy.
   - System proof: real-time CV, Java deployment, education product constraints.

Each card should answer:

- What was broken?
- What system did Himadri build?
- What changed?
- What tradeoff mattered?

### Fourth viewport

Show "How I build production AI."

Use six principles, but make them operational:

1. Explicit execution graphs beat vague autonomy.
2. Generated artifacts need independent verification.
3. Cost and latency are product requirements.
4. Observability is part of the UX for AI systems.
5. Intermediate representations make AI debuggable.
6. Use deterministic code where generation is weaker.

Each principle links to a case-study section or note.

### Fifth viewport

Show "Notes and labs."

This should become the compounding engine:

- Notes are deep technical writing.
- Labs are interactive reduced reproductions.

Do not ship weak labs. A serious note is better than a shallow simulator.

### Final viewport

Segment contact:

- "Founding AI engineer role"
- "Staff AI platform role"
- "Agentic workflow consulting or contract"
- "Technical collaboration"

Each segment should route to the same contact page but preframe the expected fit.

## Mobile-first requirements

The redo must treat mobile as a release blocker.

Current evidence:

- `reports/portfolio-comparison/screenshots/himadri-local-mobile.png` shows horizontal overflow and clipped nav/hero text.

Acceptance criteria:

1. No horizontal overflow at 360 px, 390 px, 430 px, 768 px, 1024 px, and desktop widths.
2. Hero text wraps cleanly at 360 px.
3. Nav is either collapsed or deliberately split without clipping.
4. CTA buttons fit without horizontal scroll.
5. Metric cards do not exceed viewport width.
6. Trace rows stack or simplify on mobile.
7. Screenshots are captured for all public P0 routes before launch.

Suggested implementation constraints:

- Use `overflow-wrap: anywhere` only for technical tokens, not normal headings.
- Use `clamp()` carefully with a mobile minimum that fits.
- Avoid fixed-width grids in hero panels.
- Avoid long unbreakable nav rows.
- Add a browser QA script or documented Chromium commands for mobile captures.

## Visual direction

The current desktop design is good. The redo should refine it, not replace it.

Keep:

- Dark technical atmosphere.
- Productized proof surfaces.
- Trace and artifact motifs.
- High contrast metrics.
- Serious, senior tone.

Change:

- Reduce card density in the first fold.
- Make the hero pipeline more specific.
- Use fewer generic dark panels.
- Make screenshots, diagrams, and artifacts feel inspectable.
- Bring more human chronology into the page.

Visual motifs:

- Execution graph
- Verifier gate
- Artifact pipeline
- Cost meter
- Trace timeline
- Benchmark table
- Public proof ledger

Avoid:

- Generic AI gradients.
- Decorative abstract blobs.
- Overly theatrical "agent" language.
- Fake terminal aesthetics unless tied to real evidence.
- Too many equal-weight cards.

## Content strategy

### Add a Notes section

Minimum viable launch:

1. `/notes`
2. `/notes/dag-judge-verification`
3. `/notes/cost-anatomy-agentic-reports`

Each note should include:

- problem
- production constraint
- rejected simpler approach
- architecture
- failure modes
- evaluation method
- cost or latency implication
- sanitized example
- what changed in the product

Do not write generic tutorials. Write decision records from production experience.

### Add public artifact pages

Strong candidates:

1. `qwen-3.6-35b-consumer-gpu`
   - Public repo already exists.
   - Turn it into a serious benchmark artifact page.
2. Deck IR preview lab
   - Keep sanitized.
   - Show why direct PPTX generation fails.
3. AI report DAG lab
   - Toy data, real architecture lesson.
   - Show planner, code generation, sandbox, judge, chart score, retry boundary.

### Reframe career break

Do not hide it, but do not center it.

Recommended framing:

> After a 2024 break, I rebuilt momentum around production AI systems and shipped Knit's agentic research platform, then rebuilt this portfolio as a proof-gated public surface for that work.

The story is recovery through shipped systems, not apology.

## GitHub profile alignment

The portfolio redo should be mirrored in `hmishra2250/README.md`.

Pin or highlight only repos that support the current story:

1. `himadri.dev`
2. `qwen-3.6-35b-consumer-gpu`
3. `handwrite-font-maker`
4. `NTM-One-Shot-TF`
5. `Botnet-Detection-using-Machine-Learning`
6. Future `ai-report-dag-lab` or `deck-ir-preview-lab`

Add a GitHub profile section:

```txt
Current public proof trail
- Production AI portfolio with proof validation
- Consumer GPU LLM benchmark harness
- Reduced AI workflow labs coming next
```

## Case-study rewrite guidance

Every case study should become less like a resume expansion and more like a staff packet.

Required sections:

1. Context
2. Scope owned
3. What was broken
4. Constraints
5. Architecture
6. Key decisions
7. Evaluation and observability
8. Outcome
9. What I would do differently now
10. Public proof and omissions

The "what I would do differently now" section is important. It signals maturity and makes the work feel real.

## Resume page redo

The resume page should not just embed or link the PDF.

Add:

1. Role-targeted summary:
   - Staff AI Platform
   - Founding AI Engineer
   - Senior AI Systems IC
2. Promotion packet block:
   - scope
   - ambiguity
   - decisions
   - leverage
   - outcomes
3. Proof-backed metric table.
4. Download PDF CTA.

Do not duplicate the full resume as plain text unless it is structured and scannable.

## Labs strategy

Labs should be serious evaluation surfaces, not toys.

Ship order:

1. Debug This Agent
   - One excellent trace diagnosis.
   - Do not reveal the correct answer early.
2. Cost Anatomy
   - Normalized units only.
   - Show how retries, judges, model routing, and sandbox reuse move cost.
3. AI Report DAG Lab
   - Static or semi-interactive execution graph.
   - Toy data only.
4. Deck IR Previewer
   - Show IR to HTML preview to PPTX concept.
   - No private deck data.

Disable or defer any lab that cannot pass quality review.

## Assistant strategy

The assistant should not be the headline until it is excellent.

Static-first path:

1. Curated hard questions.
2. Source-grounded static answers.
3. Clear source cards.
4. Confidence and omission labels.

Live assistant path:

1. Enable only behind `ENABLE_INTERVIEW_ASSISTANT_API=1`.
2. Run corpus build, corpus validation, evals, API tests.
3. Never log full question text by default.
4. Refuse unsupported claims.
5. Keep source cards visible.

The assistant should support the proof engine. It should not become the proof.

## Implementation phases

### Phase 0: stabilize trust

1. Fix mobile overflow.
2. Verify nav, hero, metrics, trace, and CTA behavior across mobile widths.
3. Keep route manifest, sitemap, robots, and nav aligned.
4. Run baseline validation.

Acceptance:

- mobile screenshots pass
- `npm run validate:routes`
- `npm run validate:content`
- `npm run validate:confidentiality`
- `npm run typecheck`
- `npm run lint`

### Phase 1: homepage narrative redo

1. Rewrite hero to "verified AI artifacts" narrative.
2. Replace first-fold four-card emphasis with a pipeline proof panel.
3. Add current proof trail.
4. Reorder sections around Work, Notes, Labs, Contact.

Acceptance:

- desktop and mobile screenshots captured
- no public claim lacks proof metadata
- no route exposure drift

### Phase 2: notes launch

1. Add `/notes`.
2. Publish two serious notes.
3. Link notes from homepage, case studies, and GitHub profile.

Acceptance:

- notes are source-safe
- no confidential content
- link validation passes

### Phase 3: case-study staff packet pass

1. Rewrite flagship case study first.
2. Then rewrite ML infra rescue.
3. Then rewrite CV product systems.

Acceptance:

- each case study has scope, decisions, tradeoffs, eval, outcome, and omissions
- each metric maps to `proof.ts`

### Phase 4: public artifact pass

1. Polish `qwen-3.6-35b-consumer-gpu`.
2. Create one reduced AI workflow lab repo or route.
3. Add benchmark/test evidence.

Acceptance:

- at least one public repo can be sampled by a reviewer in under 3 minutes
- README has architecture, quickstart, tests, and result artifacts

### Phase 5: assistant and advanced labs

1. Improve static Interview Me.
2. Only then consider live assistant exposure.
3. Build advanced labs only if they beat a strong technical note.

Acceptance:

- assistant evals pass
- API remains default-off unless explicitly enabled
- advanced labs have browser QA evidence

## Non-goals

1. Do not add new runtime dependencies without an explicit dependency ADR.
2. Do not publish private customer data, prompts, traces, dashboards, costs, or deck outputs.
3. Do not imitate Shreyansh's academic site structure directly.
4. Do not chase title comparison as a page theme.
5. Do not ship weak interactive demos for novelty.
6. Do not make the homepage a long apology for career discontinuity.

## Success metrics

Qualitative:

- A reviewer can explain Himadri's core category after one minute.
- A senior engineer can inspect at least one real technical artifact within three clicks.
- The site feels current, active, and public-facing.
- The career break reads as a transition point, not a collapse.

Quantitative:

- zero horizontal overflow in mobile QA
- at least 2 public technical notes
- at least 1 polished current public repo linked from homepage
- all public metrics tied to proof claims
- `npm run verify` passes before launch
- no disabled routes in sitemap, nav, or public links

## Final recommendation

Redo the portfolio around public proof compounding, not visual reinvention.

The current architecture is already more rigorous than most portfolios. The missing layer is an active public trail that makes the strongest production work inspectable. Keep the proof system, fix mobile, simplify the hero, add notes, package public artifacts, and make every case study read like a staff-level decision packet.

The strategic objective is simple:

> Make the site prove that Himadri is the person teams call when an AI workflow must become reliable software.
