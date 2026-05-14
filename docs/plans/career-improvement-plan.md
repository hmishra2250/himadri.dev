# Career Improvement Plan

Date: 2026-05-14
Sources: Claude Opus career comparison, Codex deep-review, resume feedback (Claude + Gemini reviewers), recent project inventory

## Diagnosis

You are not technically behind. Your IIT-BHU dual degree (9.28 GPA), UC Berkeley research internship (Prof. Dawn Song), Microsoft internship, and 8 years of production ML work across CV, infra, search, and agentic AI are strong signals. The problem is that your career arc lacks three things Shreyansh has: **compounding tenure**, **public visibility**, and **a clear technical niche**.

Shreyansh's trajectory: 1 company, 4 promotions in 4.5 years, 3 publications, 3 patents, 30+ blog posts, 194 public repos. Yours: 4 companies, a career break, 0 publications, 0 blog posts, 11 public repos, title stuck at "Senior" for 5+ years.

The gap is recoverable. Here's how.

---

## Principle: Stop Optimizing for Breadth, Start Compounding Depth

Your recent project directory (`/home/himadri/Dev/2026/`) shows: portfolio building, CTF solving, hackathon decks (choti/TriNetra), job assessments (ThirdAI, Donizo, Shiprocket), YC Startup School, finance tracking, bounty hunting (opscout), content loops, font makers, Qwen optimization, Unsloth experiments, Firecrawl CTF, C++ practice.

This is scatter. Each project individually makes sense but collectively they signal undirected energy. Shreyansh's equivalent directory would probably have: 1 work project (Level AI), 1-2 blog draft folders, and 1 deep implementation project. That focus is why he compounds.

**Rule: From today, every project you start should pass the filter: "Does this directly build toward Staff/Principal AI Engineer positioning?"** If the answer is no, it's a hobby — treat it as such and don't let it consume career-building time.

---

## Phase 1: Immediate (Next 30 Days)

### 1. Define your one-line technical identity

Shreyansh's: "ML systems engineer who writes CUDA kernels and optimizes LLM inference."

Yours should be: **"Production AI systems engineer — I build the orchestration, evaluation, and observability that makes agentic AI actually work in business."**

This positions you in a hot, growing niche (agentic AI) but differentiates from the crowd by emphasizing the hard production parts (DAG orchestration, judge verification, cost control, artifact generation) rather than the easy demo parts.

Everything else — CV, search, infra, frontend — becomes supporting evidence, not the headline.

### 2. Commit to a company target profile

Stop shotgunning assessments. Your ideal next role:
- **AI-native company** (not a legacy company with an ML team) where the product IS AI
- **Staff or Senior Staff IC track** explicitly available
- **Minimum 3-year commitment** — you need one long tenure to break the job-hopping pattern
- **Agentic AI, LLM platform, or AI infrastructure focus** — your Knit experience is most valuable here

Target company profiles:
- Series B-D AI startups building agent platforms (Cognition, Adept, Induced, etc.)
- AI infrastructure companies (Weights & Biases, Modal, E2B, LangChain/LangSmith)
- AI product teams at scale (Notion AI, Canva AI, Figma AI, Linear)
- Enterprise AI platforms (Salesforce AI, ServiceNow, Datadog AI)

Avoid:
- Ed-tech ML roles (repeats Osmo/Epic pattern without title ceiling)
- Pure research roles (not your strength vs. Shreyansh-type candidates)
- Companies where "AI" is a feature team, not the core product

### 3. Fix the resume narrative gap

Both Claude and Gemini resume reviewers scored your resume 72-78/100. Key fixes:

**Knit bullets need business outcomes, not just architecture:**
- Before: "Engineered the insight execution engine: LLM writes Python analytics code..."
- After: "Replaced 48-72h manual analyst reporting pipeline with automated AI system, producing consulting-grade PPTX decks in under 1 hour with independent verification matching human quality benchmarks"

**Remove the "Career Break" line or reframe it:**
- Option A: Remove it entirely (the dates speak for themselves)
- Option B: "Independent study period — Kaggle competition (top 6% globally), open-source ML projects, consumer GPU optimization research"

**Consolidate internships into Experience:**
- Move UC Berkeley and Microsoft from "Projects and Awards" into the Experience timeline
- This fills the visual gap and shows early-career trajectory

**Add a "Leadership & Influence" section:**
- "CV technical lead across India and US teams at Osmo (3.5 years)"
- "Principal architect for India AI team at Knit"
- "Defined and executed ML roadmap at Epic! post-layoffs"
- "Mentored engineers on CV systems and evaluation methodology"

### 4. Update LinkedIn immediately

Your LinkedIn still says "Machine Learning Engineer" and has "Present" on the Knit end date. The `resume/linkedin_update_guide.md` you already have is good. Execute it today:
- Headline: "Senior AI Engineer | Agentic AI Platforms & Production LLM Systems | IIT-BHU"
- Update Knit end date to April 2026
- Add all bullet points from the updated resume
- Set "Open to Work" visibility to recruiters only
- Write a short post announcing availability (mention the agentic platform work)

---

## Phase 2: Medium-term (1-6 Months)

### 5. Start publishing technical content

This is non-negotiable for Staff/Principal positioning. Target: 2 posts per month for the first 3 months, then 1 per month sustained.

**First 6 posts (prioritized by uniqueness and demand):**

1. "Why I chose explicit DAGs over free-form agents for production AI workflows"
   - Your Decision Theater content, expanded into a proper article
   - Directly relevant to every team evaluating LangGraph vs. custom orchestration
   - High search demand, few production-experienced authors writing about this

2. "The case for independent judge verification in agentic systems"
   - Your Knit judge pattern, generalized
   - Include code examples (sanitized)
   - This is a gap in the current discourse — most agentic AI content is about chains, not verification

3. "I cut ML infrastructure costs 10x after inheriting a broken platform"
   - Your Epic! story, told as a narrative
   - War story format performs well on HackerNews and LinkedIn
   - Shows Staff-level ownership: took initiative, diagnosed root causes, fixed systematically

4. "Cost anatomy of an agentic AI report: where the money actually goes"
   - Based on your Cost Anatomy challenge, expanded with real (sanitized) numbers
   - CTO-audience content that shows business maturity

5. "Running Qwen 3.6 35B at 43 tok/s on 8GB VRAM: a practical guide"
   - Polish and expand the existing repo README into a proper blog post
   - Shows inference optimization depth (your weakest area vs. Shreyansh — this helps close it)

6. "What I learned from 3.5 years as the sole CV engineer at an education company"
   - Reflective piece about production ML ownership, real-time constraints, and product iteration
   - Humanizing story that differentiates from typical LLM-focused content

**Where to publish:**
- Primary: himadri.dev/notes (your domain, your SEO)
- Cross-post: LinkedIn articles (engagement), Medium (discovery), dev.to (developer audience)
- Share: Twitter/X, relevant Discord/Slack communities, HackerNews for the best pieces

### 6. Build 2-3 flagship open-source repos

Not 30 repos. Three excellent ones.

| Repo | Purpose | Target audience |
|------|---------|----------------|
| `dag-judge-lab` | Sanitized DAG orchestration + sandbox execution + independent judge verification | AI engineers evaluating agent architectures |
| `deck-ir` | Intermediate representation for AI-generated PPTX decks, with HTML preview and native export | Teams building doc/deck generation |
| `consumer-gpu-bench` | Polish of qwen repo — practical LLM inference on consumer hardware | Budget-conscious ML practitioners |

Each repo needs: strong README with diagrams, working tests, benchmark results, and a companion blog post.

### 7. Submit one paper

You have the UC Berkeley research lineage and the production experience. The agentic AI space desperately needs empirical papers from practitioners, not just academic benchmarks.

**Paper idea:** "Empirical Comparison of DAG-Based vs. Free-Form Agent Orchestration for Production Analytics Workflows"
- Compare explicit DAG execution vs. ReAct-style loops vs. LangGraph on real (synthetic reproduction of real) analytics tasks
- Measure: correctness, cost, latency, debuggability, retry success rate
- This fills a genuine gap — most orchestration comparisons are toy examples, not production analytics

**Target venues:** EMNLP Industry Track, NeurIPS Workshop on Foundation Model Agents, AAAI AI Applications, or even a solid arXiv preprint that gets Twitter traction.

**Timeline:** Draft by month 4, submit by month 6.

---

## Phase 3: Long-term (6-12 Months)

### 8. At your next job: declare Staff track intent on day 1

Tell your manager in the first week: "I want to be on the Staff/Principal promotion track. What does that look like here?"

Then systematically build the Staff case:
- **Cross-team influence:** Propose and drive an architecture decision that affects multiple teams
- **Technical strategy:** Write a technical vision doc for your domain area
- **Mentoring:** Take on 1-2 junior/mid engineers to mentor
- **Org-level impact:** Own a metric that the CTO or VP Eng cares about
- **Document everything:** Keep a brag doc updated monthly

### 9. Stop the scatter

Projects to keep:
- Portfolio (himadri.dev) — career infrastructure
- Blog/notes — career infrastructure
- 2-3 flagship open-source repos — career infrastructure
- Your day job (100% focus)

Projects to stop or limit to weekends only:
- CTFs (fun but zero career ROI at your level)
- Bounty hunting / opscout (signals financial anxiety, not career building)
- Random assessments for companies that aren't in your target profile
- Hackathon decks for others
- Hobby projects (font maker, content loop) unless they become blog posts

### 10. Build a professional network in agentic AI

- Follow and engage with: Harrison Chase (LangChain), Shreya Rajpal (Guardrails AI), Jason Liu (instructor), Simon Willison, Hamel Husain
- Comment thoughtfully on their posts with production insights (not "great post!")
- Attend 1 relevant meetup or conference per quarter
- The goal: become known in the agentic AI practitioner community as someone with real production experience

---

## Anti-Patterns to Avoid

1. **Don't copy Shreyansh's exact path.** CUDA kernels and inference optimization are his lane, not yours. Competing on his turf when he has a 4-year head start is losing strategy. Own the production agentic AI lane.

2. **Don't over-engineer the portfolio further.** The proof system, route manifests, and validation scripts are already over-built for a personal site. Every hour spent on portfolio infrastructure is an hour not spent writing content or building public repos.

3. **Don't treat the career break as a permanent scar.** It's a 10-month gap in an 8-year career. At Staff-level interviews, nobody cares about a gap if your current work is strong. Stop narrating yourself as "derailed" — narrate yourself as "refocused."

4. **Don't take a role just because it's available.** A 12-month stint at another small company as "Senior AI Engineer" reinforces the pattern. Hold out for a role where you can stay 3+ years and grow to Staff.

---

## Success Metrics (12-month targets)

| Metric | Current | Target |
|--------|---------|--------|
| Published blog posts | 0 | 12+ |
| Public repos with 50+ stars | 0 recent | 2-3 |
| Paper submissions | 0 | 1 |
| Job title | Senior | Staff or clear Staff-track offer |
| Company tenure | 0 (between jobs) | 6+ months at one company |
| LinkedIn followers/connections growth | Unknown | +500 meaningful connections |
| Technical talks/meetup presentations | 0 | 2-3 |
