# Portfolio and Career Positioning Comparison

Date: 2026-05-14

Subjects:
- Himadri Mishra: https://www.himadri.dev, https://github.com/hmishra2250, local resume at `public/resume/Himadri_Latest_Resume_April_2026.pdf`
- Shreyansh Singh: https://shreyansh26.github.io, https://github.com/shreyansh26, CV at https://shreyansh26.github.io/assets/pdf/resume/Resume_Shreyansh.pdf

Evidence captured locally:
- `reports/portfolio-comparison/screenshots/himadri-local-desktop.png`
- `reports/portfolio-comparison/screenshots/himadri-local-mobile.png`
- `reports/portfolio-comparison/screenshots/shreyansh-desktop.png`
- `reports/portfolio-comparison/screenshots/shreyansh-mobile.png`
- `reports/portfolio-comparison/resumes/Resume_Shreyansh.pdf`

## Executive Take

Shreyansh's public surface is stronger as a compounding technical reputation engine. It shows a long, focused trail of posts, implementations, publications, GitHub projects, CTF/research history, and a promotion timeline that makes him look like someone continuously increasing depth in ML systems and LLM infrastructure.

Your public surface is stronger as a senior production AI ownership narrative. Your portfolio has a more mature product shape, stronger proof governance, route/content validation, case-study architecture, and sharper business/system outcome metrics. It reads like a senior or staff-level AI platform engineer who has shipped messy production systems, not just studied or replicated papers.

The gap is not raw capability. The gap is public compounding. Shreyansh has years of publicly visible, low-level ML systems artifacts. You have stronger production outcomes, but much of the evidence is inside employment history, private projects, or newly reconstructed portfolio surfaces. That makes your signal more dependent on trust and narrative, while his signal is easier for a reviewer to sample directly.

## Evidence Summary

### Shreyansh

His homepage says he is a Principal Machine Learning Engineer at Level AI, leading a distributed India and USA team and focusing on LLMs for contact-center conversations, LLM training/inference optimization, kernel development, and ML systems engineering. It also shows recent posts and a news timeline: joined Level AI on 2022-01-03, promoted to Senior ML Engineer on 2022-09-05, Lead ML Engineer on 2023-05-20, and Principal ML Engineer on 2024-10-01. Source: https://shreyansh26.github.io/

His projects page links a dense set of repo artifacts: Annotated-ML-Papers, MLSys-Experiments, FlashAttention-PyTorch, FlashAttention-Triton, Speculative-Sampling, LLM-Sampling, Accelerating-Cross-Encoder-Inference, SparseMatrix-Computation-CUDA, Attention-Mask-Patterns, Extracting-Training-Data-from-Large-Langauge-Models, ML-Paper-Implementations, LLM-Activation-Steering-Experiments, DeepLearning-in-the-Browser, and Linux-Malware-Detection-Research. Source: https://shreyansh26.github.io/projects/

His publications page lists three publications: MeTGAN at ICONIP 2021, CuRL at ICANN 2021, and an ACL workshop SRST 2018 paper. Source: https://shreyansh26.github.io/publications/

His GitHub profile shows 194 public repositories, 364 followers, 242 following, and a README that repeats the Principal ML Engineer at Level AI positioning. His pinned repos include Annotated-ML-Papers, FlashAttention-PyTorch, Extracting-Training-Data-from-Large-Langauge-Models, Speculative-Sampling, LLM-Sampling, and Linux-Malware-Detection-Research. Source: https://github.com/shreyansh26

His CV claims Level AI work across LLM-powered AI Workers, inference optimization with prefix caching, chunked prefill, torch.compile, CUDA Graphs, fp8 quantization, vLLM/SGLang benchmarking, Medusa speculative decoding, adoption across 8 production NLP services, Llama 8B post-training on 8xH100, Voice of the Customer, patents, Mastercard AI Garage, and IIT BHU B.Tech CSE with 9.57/10 CGPA. Source: https://shreyansh26.github.io/assets/pdf/resume/Resume_Shreyansh.pdf

### Himadri

Your resume positions you as a Senior AI Engineer with 8 years of experience, IIT BHU dual degree, agentic AI platform architecture, production LLM systems, computer vision, and ML infrastructure. The strongest bullets are: Knit report turnaround from 48-72 hours to under 1 hour, 30-50 sandbox tasks per report, 15-25 charts per report, shared Python agent platform with multi-provider routing and observability, Epic cost reduction by 10x with 100x pod reduction and 99% spot error reduction, and Osmo CV accuracy from 93% to 98%.

Your local portfolio repo is intentionally evidence-first. It has typed content, centralized route authority, proof claims, metrics tied to proof IDs, case studies, hiring-fit content, validation scripts, assistant corpus checks, confidentiality constraints, and browser QA reports. Local sources: `README.md`, `src/lib/routes.ts`, `src/content/proof.ts`, `src/content/metrics.ts`, `src/content/case-studies.ts`, `src/content/hiring-fit.ts`.

Your GitHub profile shows 11 public repositories, 129 followers, 83 following, a strong profile README, and older popular repos with long-tail stars: NTM-One-Shot-TF and Botnet-Detection-using-Machine-Learning. It also shows recent repositioning work around himadri.dev and qwen-3.6-35b-consumer-gpu. Source: https://github.com/hmishra2250

Nearby local projects show recent work across practical AI products and systems: `qwen-3.6-35b` consumer GPU benchmarking, `content-loop` private-first AI content workflow platform, `donizo_assessment_may_2026` multimodal extraction and Gemini fusion, `thirdai_assessment` multi-agent research QA, `opscout` local-first research knowledge graph, and `unsloth` model platform/runtime work. These are real recent effort signals, but most are either local/private, assessment-shaped, or not yet packaged into your public portfolio as a coherent proof trail.

## Portfolio Comparison

### First impression

Your desktop homepage wins on product design and senior positioning. The first fold is polished, modern, and immediately frames production AI as a systems discipline. It shows outcomes and constraints instead of a generic bio.

Shreyansh's homepage wins on immediate biographical credibility. It is visually simpler, almost academic, but it quickly tells the reader who he is, what he does, what he writes, when he was promoted, and where to inspect deeper work.

Recommendation: keep your high-end system-design homepage, but add a compact "current proof trail" block in the first or second fold:
- Latest technical notes
- Latest public repo artifacts
- Latest case-study additions
- Current availability or target roles
- A short timeline: Whodat -> Osmo -> Epic -> break -> Knit -> now

Right now your homepage says "trust this evidence system." His says "here is my public trail." You need both.

### Visual and UX quality

Your desktop is stronger. It feels like a product surface. The proof wall, representative trace, metrics, and CTA structure communicate senior ownership.

Your mobile rendering currently has a serious issue: the captured local mobile screenshot shows horizontal overflow and clipped nav/hero text. This weakens trust because a portfolio for senior engineering cannot visibly break on mobile. It should be treated as high priority. Screenshot: `reports/portfolio-comparison/screenshots/himadri-local-mobile.png`

Shreyansh's mobile page is not elegant, but it is readable enough and keeps a simple content flow. It also exposes his face and bio immediately. Screenshot: `reports/portfolio-comparison/screenshots/shreyansh-mobile.png`

Recommendation:
1. Fix mobile overflow before any new visual work.
2. Reduce hero heading size or clamp line length at mobile widths.
3. Collapse nav into a proper mobile menu or two-line controlled layout.
4. Add screenshot regression checks for 390 px and 430 px widths.

### Content architecture

Your content architecture is much stronger. `proof.ts`, metrics tied to proof claims, route manifest authority, validation scripts, confidentiality gates, and case-study objects are exactly the kind of rigor that a staff or senior AI platform role should respect.

Shreyansh's architecture is simpler. The site is a Jekyll-style academic blog with posts/projects/publications. The strength is not the website system. The strength is the density of artifacts behind it.

Recommendation: do not copy his site structure wholesale. Instead, import his strongest mechanism: public compounding. Add a "Field Notes" or "Engineering Notes" section with 6-10 serious technical writeups tied to your actual strengths:
- DAG orchestration for AI workflows
- Sandbox-executed analytics vs LLM-only analysis
- Judge verification patterns for generated code
- Deck IR design for AI-generated PPTX
- Cost anatomy of agentic reports
- Migrating ML infra after layoffs
- Search/autocomplete revamp lessons
- CV under latency and device constraints
- Running large MoE models on consumer hardware
- Lessons from failed or rejected agent designs

### Proof and credibility

Your proof claims are strong, but they are employment/resume-backed. That is valid, but it is harder for a stranger to independently inspect. Shreyansh gives reviewers more public handles: repos, posts, publications, citations, paper implementations, and visible repetition over time.

Your portfolio should convert private production work into safe public artifacts:
- sanitized architecture diagrams
- short design docs
- reduced reproductions
- unit-economics calculators
- benchmark harnesses
- toy implementations that preserve the real production lesson
- before/after decision records

This is especially important because your best work cannot expose customer data, prompts, decks, traces, or internal code. You already understand this and built confidentiality gates. The missing layer is sanitized external artifacts that let a reviewer feel the work.

### GitHub comparison

Shreyansh has a much stronger public GitHub footprint by count and topical concentration: 194 public repos and a continuous ML systems/LLM systems theme. Source: https://github.com/shreyansh26

You have fewer public repos: 11 public repos, with older popular ML projects and a newer portfolio/AI systems repositioning. Source: https://github.com/hmishra2250

This does not mean he is necessarily stronger in production engineering. It means his public evidence is more inspectable, broader, and more current in the exact hot zone of ML systems.

Recommendation:
- Create 3 public flagship repos, not 30 small ones.
- Each should have a strong README, diagrams, tests, and benchmark artifacts.
- Best candidates from your current work:
  - `ai-report-dag-lab`: sanitized DAG + sandbox + judge verifier.
  - `deck-ir-preview-lab`: HTML/IR/native PPTX architecture reduced reproduction.
  - `consumer-gpu-llm-bench`: package the Qwen consumer GPU work as a polished public artifact.

## Career Trajectory Comparison

### Shreyansh's visible arc

His arc is extremely coherent:
1. IIT BHU CSE, strong academic record.
2. Early CTF/security/research/publications.
3. Mastercard AI Garage applied research.
4. Level AI, one company, contact-center NLP/LLM domain.
5. Increasing depth in LLM systems, inference, CUDA/Triton, post-training, benchmarks.
6. Public writing and repos reinforce the same story.

That coherence is the biggest lesson. Even if every title were ignored, the body of work says: applied ML researcher turned ML systems/LLM infrastructure specialist.

### Your visible arc

Your arc is broader and more production-shaped:
1. IIT BHU dual degree, strong academic record.
2. UC Berkeley and Microsoft early signals.
3. AR/CV work at Whodat and Osmo.
4. Production ML ownership at Epic after layoffs, including infra, cost, search, recommendations.
5. Career break.
6. Knit production agentic platform architecture.
7. Recent intense rebuilding across portfolio, assessments, local AI tools, consumer GPU experiments, and private systems.

The problem is not that this arc is weak. It is that the public version has historically been less continuous. The career break and role transitions make it easier for you to narrate yourself as derailed, but the evidence says something more precise: you lost public compounding and perhaps title continuity, not technical capacity.

### What you likely did wrong

This is an inference, not a moral judgment.

1. You under-invested in public proof during your strongest production years.
   You shipped valuable work, but much of it stayed locked inside companies. Shreyansh converted learning into public posts and implementations.

2. You allowed breadth to obscure category ownership.
   CV, ML infra, LLM agents, deck automation, search, and platform work are all strong, but a recruiter needs one primary label. Your current best label is "production AI systems / AI platform architect." Everything else should support that.

3. You did not keep a visible technical cadence.
   Hiring markets reward recency. Your recent local work is promising, but public viewers do not see enough of it yet.

4. You may be comparing title velocity to capability.
   Titles are not clean measurements. Shreyansh's promotion velocity is impressive, but the useful lesson is not "he got ahead." The useful lesson is "he built a tight public and organizational narrative around a high-demand domain."

5. You may be undervaluing production scar tissue.
   Cost reductions, infra rescue, CV reliability, and verified AI workflows are not second-tier. They are exactly staff-level material when packaged as architecture, tradeoffs, and influence.

### What you did right

1. You accumulated multi-domain production judgment.
2. You have stronger business outcome metrics.
3. You built systems across application, platform, infra, ML, LLM orchestration, evals, and observability.
4. You now have an unusually rigorous portfolio content system.
5. You have recent local projects that show you are actively rebuilding momentum.

## Is Shreyansh's Promotion Pace Normal?

Short answer: not normal by large-company leveling norms, but plausible in a startup or high-growth AI org if the scope was real.

His public timeline says:
- 2022-01-03: joined Level AI as Machine Learning Engineer.
- 2022-09-05: promoted to Senior ML Engineer.
- 2023-05-20: promoted to Lead ML Engineer.
- 2024-10-01: promoted to Principal ML Engineer.
Source: https://shreyansh26.github.io/

By standardized large-company ladders, this is unusually fast. Levels.fyi's 2023 report describes Senior Engineer as typically 5+ years, Staff as typically 10+ years, and Principal as typically 15+ years, with Principal usually less than 3% of employees and some smaller companies having no one at that level. Source: https://www.levels.fyi/assets/pdfs/2023Report.pdf

LeadDev cautions that IC career trajectories are less standardized than management tracks and that the same role can have many titles depending on the organization. It describes principal engineers as generally guiding company technical direction, with broader scope than senior engineers. Source: https://zephrcf.leaddev.com/career-development/who-are-staff-principal-and-distinguished-engineers

GitLab's public principal engineer description expects broad cross-team, department-level technical and organizational impact: strategic roadmaps, proposals across several teams, mentoring domain experts, high-scope ambiguity, and measurable sub-department impact. Source: https://handbook.gitlab.com/job-description-library/engineering/development/management/principal-engineer/

Interpretation:
- If Level AI used a large-company calibration, Principal by late 2024 with roughly 4 years of post-graduation experience would be exceptional.
- If Level AI used startup calibration, domain scarcity, early high ownership, and title acceleration, it is less surprising.
- The title should be evaluated by scope: cross-team influence, production adoption, technical strategy, mentoring, organizational leverage, and business-critical impact.
- His CV claims adoption across 8 production NLP services, team leadership across India/USA, patents, and major LLM inference/post-training work. If accurate, those are credible staff/principal-scope signals even if the years are compressed.

Do not use his title as a verdict on your life. Use it as a market signal: focused AI/ML systems depth plus public artifact compounding plus one-company continuity can produce rapid visibility.

## What To Do Next

### 0 to 2 weeks

1. Fix the mobile overflow on your homepage and rerun screenshots.
2. Add a compact public timeline to the homepage or resume page.
3. Add a "Latest engineering notes" section, even if the first entries are short.
4. Make `qwen-3.6-35b-consumer-gpu` a polished pinned repo with a portfolio card.
5. Add a "What I can be trusted with" section aimed at Staff AI Platform / Principal-track roles.

### 2 to 6 weeks

1. Publish 3 deep technical notes from your Knit/Epic lessons, sanitized:
   - DAGs and judge verification for AI analytics.
   - Cost anatomy of agentic reports.
   - ML infra rescue after ownership collapse.
2. Build one reduced public demo from your flagship case study.
3. Add a "promotion packet" page:
   - scope owned
   - ambiguity handled
   - decisions made
   - people influenced
   - measurable outcomes
   - systems still running or lessons durable
4. Pin only repos that tell the current story.

### 6 to 12 weeks

1. Create a consistent public writing cadence: one substantial note every 2 weeks.
2. Convert 2 local/private systems into sanitized public artifacts.
3. Add benchmark evidence and test artifacts to every public repo.
4. Use the portfolio as a conversion funnel for Staff AI Engineer, AI Platform Architect, Founding AI Engineer, or Principal-track AI Systems roles.
5. Stop competing against Shreyansh's exact shape. Your strongest lane is production AI systems with reliability, evals, cost, artifacts, and cross-domain grounding.

## Final Diagnosis

You are not derailed in the sense of being technically behind. You are behind in visible compounding and category clarity.

Shreyansh's public record compounds around a narrow, hot domain: ML systems and LLM infrastructure. Your record compounds across harder-to-explain production ownership: CV, ML infra, search, agentic workflows, evaluation, deck automation, and AI platform design. That breadth is valuable, but only if it is packaged as a coherent operating identity.

The strongest next move is not to imitate his academic/blog portfolio. It is to make your portfolio prove something he does not prove as directly: that you can take messy business workflows, turn them into reliable AI systems, control cost and observability, and ship artifacts that teams can trust.

That is a senior/staff story. It just needs a tighter public trail.
