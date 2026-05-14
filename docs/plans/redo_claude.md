# If I Were Rebuilding himadri.dev From Scratch

Author: Claude Opus 4.6
Date: 2026-05-14
Context: Full audit of current portfolio codebase, comparison with shreyansh26.github.io, resume feedback from Claude + Gemini reviewers, Codex deep-review, browser QA reports, prior v2 review

---

## The Core Problem With the Current Site

The portfolio is **architecturally impressive and strategically misaligned**.

You built a proof-governance system with typed claims, confidentiality gates, source provenance, route manifests with phase gating, validation scripts, SEO infrastructure, structured data, and accessibility controls. This is better infrastructure than most production codebases at real companies.

But a portfolio is not a production codebase. A portfolio has one job: **convert a stranger into someone who wants to talk to you**. By that metric, the current site underperforms a generic Jekyll blog with 30 posts — which is exactly what Shreyansh has, and exactly what outperforms you in market signal.

The site fails the core test because:

1. **It explains a proof system instead of telling a story.** A CTO who lands on your homepage sees "Proof wall," "Live System Pulse," "Decision Theater," "Hiring Fit Matrix" — these are labels for a governance framework, not sections of a story. Shreyansh's homepage says: "I'm Shreyansh, I build LLMs at Level AI, here's what I write about, here's my career timeline." That's more human in 4 lines than your site is in 11 sections.

2. **It has no content marketing funnel.** Zero blog posts. Zero organic search entry points. Every visitor must arrive at the homepage cold. Shreyansh's 30+ blog posts each rank independently on Google and funnel readers to his profile. Your site is a dead-end — beautiful, but a dead-end.

3. **It over-indexes on one project.** 5 of 6 principles reference Knit. 5 of 8 hiring signals reference Knit. The featured case study is Knit. The live trace simulates Knit. The architecture preview is Knit. A reviewer who reads two sections has seen the Knit story. By section four, they're pattern-matching "same project, different angle" and clicking away.

4. **It has no human element.** No photo. No voice. No personal narrative. No career arc. No "here's what I learned" reflection. The site reads like it was written by an enterprise content team, not a person. The Decision Theater is genuinely great — it's the one place where your actual judgment and voice come through. The rest is institutional.

5. **The infrastructure tax makes content changes expensive.** Adding a piece of content means: write typed TS → ensure proof IDs exist → check confidentiality levels → verify display contexts → run validation scripts → build → deploy. This is fine for case studies you write once. It's a death sentence for a blog where you need to publish bi-weekly.

---

## What I Would Keep

Not everything is wrong. Several things are genuinely excellent and should survive any rebuild:

- **Decision Theater.** This is the single most differentiating feature. No other portfolio does this. It demonstrates real engineering judgment — not what you built, but why you chose it over the alternatives. Keep it, but make it a first-class content type, not buried as section 6 of 11 on the homepage.

- **Case studies with architecture sections.** The structure (problem → constraints → architecture → decisions → evaluation → observability → reflection) is strong. The content is well-written. The sanitization discipline is appropriate.

- **Interactive challenges.** Debug This Agent and Cost Anatomy are genuine hiring signals. They prove you can think, not just describe. But they should be discoverable from blog posts, not hidden behind a nav item that a recruiter won't click.

- **Typed content layer.** Having content as TypeScript objects is good engineering. Keep it, but add a parallel MDX pipeline for blog posts so writing doesn't require the full proof-governance ceremony.

- **Metrics.** Your numbers are specific and strong: 48-72h→<1h, 10x cost reduction, 93%→98% accuracy. These should be more prominent and less wrapped in governance language.

- **SEO infrastructure.** Canonical URLs, structured data, OpenGraph, sitemap — all solid. This just needs content to rank.

---

## What I Would Cut

- **Proof Wall as a section.** The concept of evidence-backed claims is good. A section called "Proof wall" with a description about "metrics with context, not isolated numbers" is meta-commentary about the site's methodology. Visitors don't care about your evidence framework. They care about the evidence. Integrate the metrics into the hero, case studies, and blog posts where they're contextually relevant.

- **Live System Pulse on the homepage.** A representative sanitized trace of a system nobody can see is ambiguous. Is this real? Is it live? Is it from production? The disclaimers ("sanitized representative trace, private details omitted") appear before the trace even loads, immediately framing it as something less than it appears. Move this into the Knit case study page where it has context.

- **HowIThink as a homepage section.** Six principles cards on the homepage is a lot of content before a visitor has any reason to trust your judgment. These principles should live on a standalone `/principles` page (which already exists) and be naturally woven into blog posts. On the homepage, one line is enough: "I believe production AI is a systems discipline, not a demo loop" with a link.

- **HiringFitMatrix.** "Where I am useful" as a grid of 4-9 signals reads like a self-assessment checkbox. Hiring managers form this judgment from your work, not from your claims about yourself. Cut it from the homepage. If it lives anywhere, it's the deferred `/hiring-packet` page.

- **InterviewMePreview on the homepage.** The chat widget on the homepage competes with the actual page. If someone is interested enough to use the AI interview feature, they'll navigate to `/interview-me`. The homepage preview adds noise.

- **The proof provenance system's public-facing complexity.** The `proofClaims` array with `sourceType`, `confidence`, `confidentialityLevel`, `approvedForPublicUse`, `publicLabelRequired`, `displayContexts` — this is internal governance. It should stay in the codebase as content validation but should never surface as visible UI chrome. No "source-card" components, no "confidence: high" badges, no "approved for public use" flags.

- **The 1382-line monolithic CSS file.** Start fresh with Tailwind utility classes + a small base layer. The current file has accumulated enough specificity and grid overrides that modifying any section risks cascading side effects.

---

## The Rebuild: Information Architecture

### Design Principle: Three Audiences, Three Depths

| Audience | Time budget | What they need | Where they land |
|----------|-------------|----------------|-----------------|
| Recruiter | 15 seconds | Name, title, top 3 metrics, resume link | Homepage hero |
| Hiring manager | 5 minutes | Story arc, case study summaries, recent writing | Homepage + 1 case study or blog post |
| Technical interviewer | 30 minutes | Deep case studies, code decisions, challenges, interview AI | Case study pages, challenge pages, interview assistant |

The current site dumps everything at the 15-second audience. The rebuild structures content for progressive disclosure.

### Sitemap

```
/                           → Homepage (compact, narrative, 5 sections max)
/work                       → Case study index
/work/[slug]                → Deep case study pages (keep current structure)
/notes                      → Blog index (NEW — the single biggest addition)
/notes/[slug]               → Individual blog posts (MDX)
/resume                     → Resume page
/about                      → About page with career timeline, photo, personal narrative (NEW)
/challenges                 → Challenge index
/challenges/[slug]          → Individual challenges (keep current)
/interview                  → Interview assistant (keep current, rename from /interview-me)
/contact                    → Contact page
```

**What changed:**
- `/notes` added (blog — the critical missing piece)
- `/about` added (human element — career arc, photo, personal voice)
- Nav reduced from 6 items to 5: **Work · Notes · About · Resume · Contact**
- `/principles` absorbed into `/about` and blog posts
- `/interview` accessible from case study pages and about page, not nav
- `/challenges` accessible from blog posts and case studies, not nav

### Navigation

```
[HM] Himadri Mishra                    Work · Notes · About · Resume · Contact
```

5 items. Clean. Every item is self-explanatory. "Interview" and "Challenges" are power-user features discoverable contextually, not nav-cluttering items.

---

## The Rebuild: Homepage

The homepage should be **5 sections, not 11**. Here's the structure:

### Section 1: Hero

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Senior AI Engineer · Production Agentic Systems                    │
│                                                                     │
│  ┌─────────────┐                                                    │
│  │  [photo]    │  Himadri Mishra                                    │
│  │             │  8 years building AI systems that work under        │
│  └─────────────┘  real constraints — not demos that work under       │
│                   ideal conditions.                                  │
│                                                                     │
│  IIT-BHU · UC Berkeley · Osmo · Epic! · Knit                       │
│                                                                     │
│  48-72h → <1h         10x cost reduction      93% → 98% accuracy   │
│  report turnaround    ML infrastructure       CV systems            │
│                                                                     │
│  [ Explore my work ]  [ Read my notes ]  [ Download resume ]        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**What changed vs. current hero:**
- Photo added (human element)
- Company names shown (instant credibility trail: IIT-BHU, Berkeley, known companies)
- Three metrics inline, not in a separate card grid
- "Read my notes" CTA added (funnels to blog)
- Positioning line is personal and opinionated, not corporate
- No "Interview me" button in hero (it's a power-user feature)

### Section 2: What I've Built (Case Study Cards)

Three cards, each with a concrete one-line outcome, not architectural jargon.

```
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│ Knit · 2025-2026     │  │ Epic! · 2023-2024    │  │ Osmo · 2019-2023     │
│                      │  │                      │  │                      │
│ Built an agentic     │  │ Inherited a broken   │  │ Led CV systems that  │
│ platform that turns  │  │ ML platform and cut  │  │ reached 98% accuracy │
│ survey data into     │  │ infra costs 10x      │  │ for millions of      │
│ consulting-grade     │  │ while owning search, │  │ learners under       │
│ reports in <1 hour   │  │ recs, and discovery  │  │ real-time device     │
│                      │  │                      │  │ constraints          │
│ [Read case study →]  │  │ [Read case study →]  │  │ [Read case study →]  │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

**What changed:**
- Three cards, not four (Whodat is too thin to justify a homepage card)
- Each card leads with a HUMAN outcome, not an architecture label
- No tag rows, no metric chips, no proof IDs — just the story
- Equal visual weight (no "flagship" oversizing)

### Section 3: How I Think (One Featured Decision)

Pick the single best Decision Theater fork and show it full-width. Not six principles. One concrete decision that demonstrates judgment.

```
┌─────────────────────────────────────────────────────────────────────┐
│  A decision that defines how I work                                 │
│                                                                     │
│  Free-form agents vs. explicit DAG orchestration                    │
│                                                                     │
│  ┌─ Rejected ──────────┐  ┌─ Chosen ───────────────┐               │
│  │ Free-form loop       │  │ Explicit DAG execution  │               │
│  │ + Fast prototype     │  │ + Deterministic deps    │               │
│  │ + Flexible           │  │ + Node-level debug      │               │
│  │ - Hard to debug      │  │ + Parallel execution    │               │
│  │ - No retry boundary  │  │ + Clear retries         │               │
│  └─────────────────────┘  └─────────────────────────┘               │
│                                                                     │
│  Why: Production workflows need predictable execution and debugging │
│  more than theatrical autonomy.                                     │
│                                                                     │
│  [ See more decisions → ]  [ Read the full case study → ]           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**What changed:**
- One decision, not six principles. Depth over breadth.
- This is the single best seniority signal on the entire site and it deserves full-width space.
- The "Principles" section disappears from the homepage entirely.

### Section 4: Latest Writing

```
┌─────────────────────────────────────────────────────────────────────┐
│  Latest notes                                                       │
│                                                                     │
│  May 2026  Why I Chose Explicit DAGs Over Free-Form Agents          │
│  May 2026  I Inherited a Broken ML Platform and Cut Costs 10x       │
│  Apr 2026  Running Qwen 3.6 35B on 8GB VRAM                        │
│                                                                     │
│  [ All notes → ]                                                    │
└─────────────────────────────────────────────────────────────────────┘
```

**Why this matters:**
- Shows you're actively publishing (recency signal)
- Creates organic search entry points
- Demonstrates thought leadership without a "Principles" section
- Blog titles themselves communicate expertise
- Simple list, not cards. The writing speaks for itself.

### Section 5: Contact CTA

Keep the current one, slightly simplified:

```
┌─────────────────────────────────────────────────────────────────────┐
│  Looking for someone to own production AI architecture?             │
│                                                                     │
│  I'm strongest in senior AI platform / LLM systems roles where     │
│  reliability, evaluation, and cost matter.                          │
│                                                                     │
│  [ Contact me ]  [ Email directly ]  [ Download resume ]            │
└─────────────────────────────────────────────────────────────────────┘
```

### What's Gone From The Homepage

| Section | Where it went | Why |
|---------|---------------|-----|
| LiveSystemPulse | Knit case study page | Needs context to be meaningful |
| ProofWall | Metrics inline in hero + case cards | "Proof wall" as a concept is meta-governance |
| HowIThink (6 principles) | `/about` page + woven into blog posts | Too much content for a cold visitor |
| FeaturedCaseStudy | Replaced by equal-weight case study cards | Over-indexes on Knit |
| DecisionTheaterPreview | Kept as Section 3, but one decision only | Depth over breadth |
| ChallengesPreview | Discoverable from case studies + blog posts | Power-user feature, not homepage material |
| InterviewMePreview | Discoverable from `/about` + case studies | Power-user feature |
| HiringFitMatrix | `/hiring-packet` (deferred) or cut entirely | Self-assessment checkboxes don't convert |

**Result:** Homepage goes from ~11 screens of scrolling to ~3-4 screens. Every section earns its place. A recruiter sees the full pitch in one viewport. A hiring manager gets case study entry points in two scrolls. Nobody has to scroll past a "Proof wall" to find your actual work.

---

## The Rebuild: New Pages

### `/about` — The Human Page

This is the page the current site is missing most critically.

```markdown
# About

[Photo]

I'm Himadri Mishra, a senior AI engineer based in India. I've spent 8 years
building AI systems that work under real constraints — not demos that work
under ideal conditions.

## The arc

2013-2018  IIT-BHU Varanasi, Dual Degree in Computer Science (9.28/10)
2016       Microsoft intern — dialog-based chatbots
2017       UC Berkeley intern — neural programmer-interpreters (Prof. Dawn Song)
           SN Bose Scholar
2018-2019  Whodat (AR startup) — built a C++ ORB detector 20% faster than ORB-SLAM
2019-2023  Osmo — CV lead across India/US teams, 93%→98% worksheet accuracy
2023-2024  Epic! for Kids — owned ML platform post-layoffs, 10x cost reduction
2024-2025  Career break — reset, Kaggle (top 6% globally), open-source
2025-2026  Knit — principal architect for agentic market research platform
Now        Open to Staff/Principal AI systems roles

## What I believe

[Move the 6 principles here, written as prose paragraphs, not card grids]

## Outside work

[Brief personal interests — humanizing touch]

## Let's talk

[Contact links + interview assistant CTA]
```

**Why this matters:**
- The career timeline alone answers the "who is this person" question that the current homepage defers
- A photo creates trust (Shreyansh has one, and it's the first thing you see)
- Moving principles here means they have context (the reader already knows who you are)
- The personal section humanizes what is currently a very institutional site

### `/notes` — The Blog

**Technical implementation:**

- MDX files in `src/content/notes/` (or `content/notes/` at root)
- Frontmatter: `title`, `date`, `tags`, `summary`, `readingTime` (auto-calculated)
- No proof IDs required. No confidentiality gates. No display-context enum.
- RSS feed at `/notes/rss.xml`
- Tag filtering at `/notes?tag=agentic-ai`
- "Latest notes" component on homepage pulls from same content source

**Content governance:**
- Blog posts are NOT proof-governed. They are opinions, lessons, and explorations.
- If a blog post makes a specific metric claim, it can link to the relevant case study where the proof claim lives.
- This separation means publishing is fast: write MDX → commit → deploy. No validation ceremony.

**Initial content plan:** See `content-visibility-strategy.md` for the 12-week calendar.

---

## The Rebuild: Visual Design

### Keep
- Dark mode (it's appropriate for a dev/AI portfolio)
- Geist Sans + Geist Mono fonts
- The accent color palette (sky blue, teal, mint)
- Card-based layouts with subtle borders
- The trace-row animation (staggered reveal)

### Change

**Typography:**
- H1 `max-width: 11ch` is too restrictive — it forces aggressive wrapping on meaningful headlines. Remove the max-width constraint. Let headlines be natural length.
- H1 `letter-spacing: -0.075em` is very tight. Loosen to `-0.04em` — still sharp, less strained.
- Body line-height 1.6 is fine for body copy but too loose for UI labels and card content. Add a `.tight` variant at 1.35 for compact contexts.

**Layout:**
- Replace the monolithic 1382-line `globals.css` with Tailwind utility classes for layout + a small `base.css` (~200 lines) for design tokens and custom components.
- Use CSS modules or Tailwind `@apply` for component-specific styles instead of global class selectors.
- The hero grid (`1.18fr / 0.82fr`) is overly precise. Use a simpler `1fr 1fr` or `3fr 2fr` that's easier to reason about.

**Imagery:**
- Add a profile photo to the hero and `/about` page.
- Add architecture diagrams to case study pages — actual SVG diagrams, not numbered text lists. The current "architecture" section is just `<div class="architecture-step">` with numbers and labels. That's a list, not a diagram.
- Add sanitized chart screenshots to the Knit case study (even synthetic data in Highcharts is more convincing than describing charts in text).
- Add a before/after visual for the Epic! cost reduction (even a simple bar chart).

**Animation:**
- Keep the trace-row staggered reveal (it's the one animation that works)
- Add a subtle fade-in on scroll for major sections (IntersectionObserver + CSS transition, nothing heavy)
- No parallax. No scroll hijacking. No GSAP. This is a portfolio, not a marketing site.

**Mobile:**
- Current mobile is fixed (browser QA confirms no overflow at 375px/390px). Keep the current responsive approach.
- Add a proper hamburger menu instead of the scrollable nav row + 3-column grid at 600px. The current mobile nav is functional but unconventional.

---

## The Rebuild: Content Architecture

### Current (over-governed)

```
profile.ts          → name, role, headline, positioning, links
metrics.ts          → 6 metrics with proof IDs, display contexts, priorities
proof.ts            → 13 proof claims with source paths, confidence, confidentiality
case-studies.ts     → 4 case studies with decisions, architecture, evaluation, observability
principles.ts       → 6 principles with evidence and proof IDs
hiring-fit.ts       → 9 signals with evidence and proof IDs
traces.ts           → 8 trace spans with types, models, durations, statuses
diagrams.ts         → 2 system diagrams with nodes and public labels
stack-opinions.ts   → 6 opinions with nuance, evidence, proof IDs
```

**Total: 9 content files, 13 proof claims, every metric cross-referenced.**

This is over-governed for a personal site. The proof system is elegant engineering but it creates friction that prevents content growth.

### Proposed (right-sized)

```
profile.ts          → name, role, headline, positioning, links, photo path
timeline.ts         → career events with dates (compact, for homepage + about)
case-studies.ts     → 4 case studies (keep current structure, it's good)
decisions.ts        → extracted decision forks (reusable across pages)
metrics.ts          → simplified: value, label, context, case study link (no proof IDs)
notes/              → MDX files with frontmatter (no proof governance)
challenges/         → keep current structure (interactive components)
```

**What changed:**
- `proof.ts` becomes internal validation only, never surfaces in UI
- `hiring-fit.ts` removed (self-assessment grid doesn't convert)
- `stack-opinions.ts` absorbed into blog posts (opinions belong in writing, not card grids)
- `diagrams.ts` replaced with actual SVG/image diagrams in case studies
- `traces.ts` moves to case study page, not homepage
- `principles.ts` becomes prose on `/about`, not a card grid
- `notes/` added as a first-class content type with minimal governance

**The key insight:** Production content (case studies) deserves governance. Growth content (blog posts) needs to be friction-free. The current architecture applies production governance to everything, which kills the growth flywheel before it starts.

---

## The Rebuild: Technical Stack

### Keep
- Next.js (App Router, RSC)
- TypeScript
- Vercel deployment
- Google Analytics
- Structured data (JSON-LD)

### Change

| Current | Proposed | Why |
|---------|----------|-----|
| 1382-line `globals.css` | Tailwind utilities + `base.css` (~200 lines) | Maintainability, colocation |
| `"latest"` in package.json | Pinned versions | Reproducibility |
| Empty `next.config.ts` | Security headers, image domains, redirects | Production hygiene |
| No MDX support | `next-mdx-remote` or `@next/mdx` | Blog posts need rich content |
| No image optimization | `next/image` with configured domains | Performance |
| No 404 page | Custom 404 with nav back to content | Polish |
| No RSS | RSS feed for `/notes` | Discoverability |
| 16 scripts in `verify` | Simplified: typecheck, lint, build | The validation suite is overkill for a personal site |

### What NOT to change
- Don't migrate to a CMS (Contentlayer, Sanity, etc.) — MDX files in the repo are the right choice for a solo engineer's portfolio
- Don't add a component library (shadcn, Radix) — the site is simple enough for custom components
- Don't add testing (Jest, Playwright) — visual regression testing for a personal site is over-engineering
- Don't add i18n — English only, the target market is global English-speaking AI companies

---

## Implementation Sequence

### Phase 1: Content first (Week 1-2)

This is the critical phase. The redo fails if it doesn't produce content.

1. Add `/notes` route with MDX support
2. Write and publish 2 blog posts
3. Add "Latest notes" section to homepage
4. Add `/about` page with timeline, photo, and principles-as-prose
5. Simplify homepage to 5 sections

### Phase 2: Visual refresh (Week 3-4)

6. Replace `globals.css` with Tailwind utilities + small base
7. Add architecture diagrams (SVG) to case study pages
8. Add profile photo to hero and about page
9. Add hamburger menu for mobile
10. Pin package versions

### Phase 3: Polish (Week 5-6)

11. Add RSS feed
12. Add custom 404 page
13. Configure `next.config.ts` (security headers, image optimization)
14. Move LiveSystemPulse to Knit case study page
15. Write 2 more blog posts
16. Add challenge discovery links from blog posts

### Phase 4: Growth (Week 7+)

17. One blog post per 2 weeks
18. One new open-source repo companion per month
19. Cross-post to LinkedIn and Medium
20. Iterate based on analytics (which pages convert, which blog posts get traffic)

---

## What This Gets You

| Metric | Current site | After rebuild |
|--------|-------------|---------------|
| Homepage sections | 11 | 5 |
| Time to understand who you are | 2+ scrolls | 1 viewport |
| Blog posts | 0 | 2 at launch, 12 by month 6 |
| Organic search entry points | 1 (homepage) | 15+ (homepage + blog posts + case studies) |
| Human element (photo, voice, arc) | None | About page + hero photo |
| Content publishing friction | High (proof governance) | Low (MDX frontmatter only) |
| Mobile nav | Scrollable row / 3-col grid | Hamburger menu |
| CSS maintainability | 1382 lines global | ~200 lines base + Tailwind |

The rebuild is not about making the site prettier. It's about shifting from an evidence-governance system to a **content-growth engine** that happens to have strong evidence governance for the case studies that warrant it.

---

## The One Thing That Matters Most

If you do nothing else from this document, do this:

**Add a `/notes` route and publish your first blog post this week.**

Everything else — the homepage simplification, the about page, the visual refresh, the CSS rewrite — is important but secondary. The single action that will have the most impact on your career trajectory is publishing technical content regularly. The site you publish from matters far less than the content you publish.

Shreyansh's Jekyll template is generic. His 30 blog posts are not. That's the lesson.
