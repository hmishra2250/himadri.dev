# Portfolio Improvement Plan

Date: 2026-05-14
Sources: Claude Opus comparison analysis, Codex deep-review (`reports/portfolio-comparison/deep-review.md`), browser QA reports, route manifest audit

## Current State

himadri.dev is a technically sophisticated Next.js portfolio with typed content, proof provenance, case studies, interactive challenges, and an AI interview assistant. It is stronger than Shreyansh's generic Jekyll template on design and engineering. But it has critical content gaps that undermine its purpose as a hiring conversion tool.

**What works:** Decision Theater, interactive challenges, proof system, SEO infrastructure, mobile responsiveness (fixed), accessibility.

**What doesn't:** No blog, no images, no career timeline, Knit-heavy repetition, no social proof, no content marketing funnel, no "latest activity" signals.

---

## Quick Wins (1-2 weeks, high ROI)

### 1. Add a `/blog` or `/notes` route with 3 seed posts

**Why:** Both analyses flag zero published writing as the single biggest gap vs. Shreyansh (30+ posts). A blog route is the highest-leverage addition because every post becomes an organic search entry point and a signal of active expertise.

**Implementation:**
- Add route to `routes.ts`: `/notes` (phase `v2c`, enabled, in sitemap, in nav, label "Notes")
- Create `src/app/notes/page.tsx` and `src/app/notes/[slug]/page.tsx`
- Add `src/content/notes.ts` with typed note entries (slug, title, date, tags, summary, body or MDX path)
- Use MDX for post content (install `@next/mdx` or `next-mdx-remote`)
- Seed with 3 posts from existing expertise (see Content Strategy doc for topics)
- Cross-link notes to relevant case studies and proof claims
- Add "Latest Notes" block to homepage (between ProofWall and HowIThink)

**Effort:** ~2 days implementation + 3-5 days writing seed posts

### 2. Add a compact career timeline to the homepage

**Why:** Both analyses note that Shreyansh's news timeline (with promotion dates) creates immediate biographical credibility. Your homepage says "trust this evidence system" but doesn't show the human journey.

**Implementation:**
- Add a `Timeline` component between Hero and LiveSystemPulse (or after ProofWall)
- Content: `2013 IIT-BHU -> 2016 Microsoft intern -> 2017 UC Berkeley / SN Bose -> 2018 Whodat (DL) -> 2019 Osmo (CV Lead) -> 2023 Epic! (ML Infra) -> 2025 Knit (AI Platform) -> Now: open to Staff/Principal AI roles`
- Keep it single-line or two-line, compact, no cards or heavy chrome
- This gives context to the metrics below it

**Effort:** ~3 hours

### 3. Add architecture diagrams and visual artifacts

**Why:** Both analyses flag that the entire site is text + colored rectangles. For someone who built chart pipelines and deck generators, showing zero visual output is a credibility miss.

**What to add:**
- Sanitized architecture diagram for the Knit agentic platform (DAG -> sandbox -> judge -> chart -> deck flow). Use Mermaid, Excalidraw export, or a clean SVG.
- Before/after comparison for the Epic! ML infra rescue (pod count, cost curve, build time)
- A representative Highcharts output screenshot (sanitized/synthetic data)
- A representative PPTX slide screenshot (sanitized)
- Add these as `<Image>` components in case study pages and as thumbnails in the case study grid

**Effort:** ~1 day for diagrams, ~3 hours to wire into components

### 4. Reduce Knit over-indexing

**Why:** Both analyses flag that 5/6 principles and 5/8 hiring signals reference Knit. This creates a "one project" risk.

**Fix:**
- Rewrite 2 principles to lead with Epic! or Osmo evidence (e.g., "Cost and latency are product features" already references Epic but the evidence text is Knit-flavored)
- Add 1 hiring-fit signal for cross-domain breadth: "Has shipped production ML across CV, search, infra, and LLM systems" with Osmo or Epic proof
- In the featured case study section, rotate or add a secondary spotlight (Epic! ML Infra Rescue)

**Effort:** ~2 hours content editing in `principles.ts` and `hiring-fit.ts`

### 5. Pin current-story repos on GitHub

**Why:** Codex flags that your most-starred repos are from 2016-2017. Your pinned repos should tell the 2026 story.

**Pin these 6:**
1. `himadri.dev` — "Evidence-first portfolio for production AI systems"
2. `qwen-3.6-35b-consumer-gpu` — Polish README, add benchmarks table, make it the "I understand inference" signal
3. `handwrite-font-maker` — Shows product thinking + CV pipeline skills
4. `NTM-One-Shot-TF` — Keep for star count and ML research credibility
5. (NEW) A sanitized agentic AI artifact repo (see Medium-term #2)
6. (NEW) First blog post's companion repo if applicable

**Effort:** ~1 hour to repin + ~3 hours to polish qwen README

---

## Medium-term Improvements (2-6 weeks)

### 6. Add a "What I Own" or promotion-packet page

**Why:** Codex recommends a page aimed at Staff/Principal evaluators showing: scope owned, ambiguity handled, decisions made, people influenced, measurable outcomes.

**Implementation:**
- Enable the deferred `/hiring-packet` route
- Structure: 4 sections mapping to Staff-level leveling rubrics
  - **Scope:** Systems I owned end-to-end (3 companies, 4 domains)
  - **Ambiguity:** Decisions made without a playbook (Decision Theater content, expanded)
  - **Influence:** Teams mentored, cross-team adoption, architecture decisions that stuck
  - **Outcomes:** Metrics wall, but organized by business impact not technical cleverness
- This page replaces generic "About me" with a targeted Staff/Principal conversion surface

**Effort:** ~2 days

### 7. Create 1 sanitized public demo repo

**Why:** Both analyses say your best work is locked inside employment history. A public artifact lets reviewers feel the work.

**Best candidate:** `ai-report-dag-lab` — a reduced reproduction of DAG orchestration + sandbox execution + judge verification. Strip all Knit-specific code, use synthetic survey data, keep the execution pattern.

**Structure:**
```
ai-report-dag-lab/
  README.md          # Architecture overview, diagrams, design decisions
  src/dag.py         # Topological sort + parallel execution
  src/sandbox.py     # Code generation + sandboxed execution (E2B or local Docker)
  src/judge.py       # Independent verification pattern
  src/chart.py       # Synthetic Highcharts generation
  tests/             # Pytest suite
  benchmarks/        # Timing and cost analysis
  docs/              # Design rationale connecting to blog posts
```

**Effort:** ~1 week

### 8. Add social proof

**Why:** Everything on the site is self-reported. No testimonials, no team context, no third-party validation.

**Options (pick 2):**
- LinkedIn recommendation excerpts (ask former managers/colleagues at Osmo, Epic, Knit)
- A "Teams I've worked with" section showing team sizes and your role within them
- Link to the Kaggle competition result page (external validation)
- If any Knit stakeholder would give a written quote about the platform impact, that's gold

**Effort:** ~1 day for implementation, variable time for collecting quotes

### 9. Fix technical risks

**Why:** Codex's portfolio agent flagged real issues.

- Replace `"latest"` with pinned versions in `package.json` (run `npm ls --depth=0` and pin current)
- Add meaningful `next.config.ts` (security headers, image domains, redirects)
- Add a custom 404 page
- Consider splitting the 1382-line `globals.css` into per-section modules (lower priority)

**Effort:** ~3 hours

---

## Longer-term (6-12 weeks)

### 10. Build the content flywheel

- 1 substantial technical note every 2 weeks
- Cross-post to Medium and LinkedIn for distribution
- Each note links back to himadri.dev (SEO backlinks)
- Add RSS feed to the notes section
- Add "Latest notes" to GitHub profile README

### 11. Add a `/projects` route

- Not just case studies (employment work) but also personal projects
- handwrite-font-maker, content-loop (if made public), the DAG lab, consumer GPU benchmarking
- Shows active building beyond paid employment

### 12. Consider a profile photo

- Both Shreyansh's site and academic convention include a headshot
- It humanizes the portfolio and builds trust
- Place it in the hero or in the contact/about section

---

## Priority Matrix

| Item | Impact | Effort | Priority |
|------|--------|--------|----------|
| Blog/notes route + 3 seed posts | Critical | Medium | P0 |
| Architecture diagrams | High | Low | P0 |
| Career timeline on homepage | High | Low | P0 |
| Reduce Knit over-indexing | Medium | Low | P1 |
| Pin current-story GitHub repos | Medium | Low | P1 |
| Hiring-packet page | High | Medium | P1 |
| Sanitized demo repo | High | High | P1 |
| Social proof | Medium | Medium | P2 |
| Technical risk fixes | Low | Low | P2 |
| Content flywheel | Critical (long-term) | Ongoing | P2 |
| Projects route | Medium | Low | P3 |
| Profile photo | Low | Low | P3 |
