# Content & Visibility Strategy

Date: 2026-05-14
Sources: Claude Opus comparison, Codex deep-review, Shreyansh Singh's publishing pattern analysis

## Why This Document Exists

Both independent analyses (Claude Opus and Codex) identified the same root cause for the career gap: **zero public compounding**. Shreyansh has 30+ blog posts spanning 6 years, 194 public repos, 3 papers, and 3 patents. You have 0 posts, 11 repos (best ones from 2017), 0 papers, 0 patents.

Your portfolio site is more sophisticated than his. Your production experience may be deeper. But none of that matters if the public record doesn't show it. This document is the plan to fix that.

---

## The Compounding Model

Shreyansh's flywheel:
```
Read paper -> implement from scratch -> write blog post -> publish repo
     ^                                                          |
     |_________ each cycle builds audience, skill, SEO _________|
```

Your flywheel (to build):
```
Ship production system -> extract sanitized lesson -> write post -> publish companion repo
     ^                                                                       |
     |_________ each cycle builds authority in production AI niche ___________|
```

The key difference: his flywheel is research-to-implementation. Yours should be **production-to-teaching**. This is a different (and arguably scarcer) voice in the AI content ecosystem.

---

## Content Calendar: First 12 Weeks

### Weeks 1-2: Infrastructure

- [ ] Add `/notes` route to himadri.dev (MDX-based, with tags, dates, reading time)
- [ ] Add "Latest Notes" section to homepage
- [ ] Set up cross-posting workflow: write in MDX -> auto-export to Medium draft + LinkedIn article
- [ ] Add RSS feed for `/notes`
- [ ] Update GitHub profile README with "Latest writing" section

### Weeks 3-4: First 2 posts

**Post 1: "Why I Chose Explicit DAGs Over Free-Form Agents"**
- Source material: `src/content/case-studies.ts` Decision Theater (DAG vs free-form agents), your Knit production experience
- Angle: Practitioner perspective. Most agentic AI content is "look at my ReAct loop." You argue against that with production evidence.
- Target length: 2000-2500 words
- Companion: Link to DAG Execution Simulator challenge on himadri.dev
- Distribution: LinkedIn article (primary), cross-post Medium, share on Twitter, submit to HackerNews

**Post 2: "I Inherited a Broken ML Platform and Cut Costs 10x"**
- Source material: Epic! case study, ML Infra Rescue
- Angle: War story format. "Here's what I walked into, here's what I found, here's what I did."
- Target length: 2000 words
- No companion repo needed (narrative piece)
- Distribution: LinkedIn, Medium. War stories perform exceptionally on LinkedIn.

### Weeks 5-6: Posts 3-4

**Post 3: "Independent Judge Verification: The Missing Layer in Agentic Systems"**
- Source material: Knit judge pattern, proof.ts claims
- Angle: Technical deep-dive with code examples (sanitized). Most agent tutorials skip verification entirely.
- Target length: 2500-3000 words
- Companion repo: `dag-judge-lab` (start building this alongside the post)

**Post 4: "Running Qwen 3.6 35B on 8GB VRAM: A Practical Guide"**
- Source material: `qwen-3.6-35b-consumer-gpu` repo
- Angle: Practical tutorial. Shows inference optimization knowledge (your weakest area vs. Shreyansh).
- Target length: 1500-2000 words
- Companion repo: Polish the existing repo

### Weeks 7-8: Posts 5-6

**Post 5: "Cost Anatomy of an Agentic AI Report"**
- Source material: Cost Anatomy challenge, Knit production cost data (sanitized)
- Angle: "Here's where the money actually goes when you run an agentic workflow." CTO-audience content.
- Target length: 2000 words with diagrams
- Distribution: This is HackerNews-grade content if done well

**Post 6: "3.5 Years as the Only CV Engineer: Lessons from Production ML at Scale"**
- Source material: Osmo experience, CV accuracy work, engagement metrics
- Angle: Reflective narrative about what production ML ownership really means
- Target length: 2000 words
- Distribution: LinkedIn (great for "senior engineer reflects" genre)

### Weeks 9-12: Posts 7-8 + repo polish

**Post 7: "Deck Intermediate Representations: Making AI-Generated PowerPoint Debuggable"**
- Source material: Knit deck pipeline, Deck IR Previewer challenge
- Angle: Niche but highly specific production insight. Nobody else is writing about this.
- Companion repo: `deck-ir` (reduced reproduction)

**Post 8: Paper draft outline**
- Start outlining the empirical DAG vs. free-form agent comparison paper
- Build the experimental setup in `dag-judge-lab`
- Target: complete draft by week 16

---

## Content Principles

### Voice
- **Production practitioner, not academic researcher.** You're not summarizing papers; you're sharing what works in real systems.
- **Opinionated but evidence-backed.** "I chose X because Y, and here's what happened." Not "here are 5 options, pick one."
- **Specific over general.** "We ran 30-50 sandboxed analytics tasks per report" beats "we processed many tasks."
- **Honest about tradeoffs.** Include what didn't work, what you'd do differently. This is rare and builds trust.

### Format
- Every post has: a clear thesis in the first paragraph, a concrete example or diagram, and a "what I'd do differently" section
- Code examples are sanitized but realistic (not toy)
- Diagrams use consistent style (Excalidraw or Mermaid, same color palette as himadri.dev)
- Each post links back to the relevant himadri.dev case study or challenge

### Distribution
- **Primary home:** himadri.dev/notes (own your SEO)
- **LinkedIn:** Cross-post the full article. LinkedIn's algorithm favors native content over links. Add a personal intro paragraph.
- **Medium:** Cross-post with canonical URL pointing to himadri.dev
- **Twitter/X:** Thread format for key insights, link to full post
- **HackerNews:** Submit the best 1-2 posts per quarter. Don't spam.
- **Reddit:** r/MachineLearning, r/LocalLLaMA for relevant posts

---

## GitHub Visibility Strategy

### Current state
- 11 public repos, best ones from 2016-2017
- 428 total stars, concentrated in stale repos
- 129 followers
- Recent burst of activity but no consistent cadence

### Target state (6 months)
- 14-16 public repos with 3 flagship repos having 50+ stars each
- Consistent weekly commit activity (not burst-then-silence)
- GitHub profile README updated monthly with latest writing + projects

### Flagship repo plan

| Repo | Description | Target stars (6mo) | Companion post |
|------|-------------|-------------------|----------------|
| `dag-judge-lab` | Opinionated DAG orchestration + sandbox + judge verification for AI agents | 100+ | Posts 1, 3 |
| `deck-ir` | Intermediate representation for AI-generated decks with HTML preview + PPTX export | 50+ | Post 7 |
| `consumer-gpu-bench` | Polished qwen consumer GPU guide with benchmarks | 50+ | Post 4 |

### Repo quality checklist (every flagship repo)
- [ ] Strong README with architecture diagram
- [ ] Quickstart in <5 minutes
- [ ] Working tests with CI badge
- [ ] Benchmark results table
- [ ] "Why this exists" section explaining the production lesson
- [ ] Link to companion blog post
- [ ] Proper LICENSE (MIT or Apache 2.0)
- [ ] Topic tags for GitHub discoverability

---

## LinkedIn Strategy

### Current state
- Headline outdated ("Machine Learning Engineer")
- Knit still shows "Present"
- No posts or articles

### Immediate fixes (this week)
- Update headline to "Senior AI Engineer | Agentic AI Platforms & Production LLM Systems"
- Fix Knit end date
- Add all resume bullet points
- Set "Open to Work" (recruiters only)

### Ongoing cadence
- Cross-post every blog article as a LinkedIn article
- 1 short insight post per week (3-5 sentences + a specific number or lesson)
- Comment meaningfully on 3-5 posts per week from people in your target network
- Connect with engineers at target companies (personalized note mentioning specific technical interest)

### Post templates that work for senior engineers
- "I made this mistake at [Company]: [lesson]" (vulnerability + expertise)
- "Here's a number that surprised me: [specific metric from your work]" (data hook)
- "Everyone is building [trendy thing]. Here's what they're missing: [production reality]" (contrarian insight)
- "I compared [A] vs [B] in production. Here's what happened." (comparison)

---

## Metrics & Accountability

### Weekly check (every Sunday)
- [ ] Did I publish or make progress on a blog post?
- [ ] Did I make at least 1 commit to a flagship repo?
- [ ] Did I post or comment on LinkedIn at least 3 times?

### Monthly check
- [ ] At least 1 blog post published
- [ ] Blog traffic trend (set up analytics on /notes)
- [ ] GitHub profile views and star growth
- [ ] LinkedIn engagement metrics (impressions, profile views)

### Quarterly check
- [ ] 3+ posts published
- [ ] At least 1 post that got meaningful traction (50+ likes or 1000+ views)
- [ ] Flagship repo progress (stars, issues, PRs from others)
- [ ] Network growth (new meaningful connections in agentic AI space)

---

## What NOT to Do

1. **Don't write "awesome-list" repos.** They attract stars but don't demonstrate expertise.
2. **Don't write generic "intro to LangChain" tutorials.** There are 10,000 of those. Write about what only you know.
3. **Don't wait for perfection.** A published 80% post beats an unpublished 100% post. Shreyansh's earliest posts are simple paper summaries — they got better over time.
4. **Don't cross-post without canonical URLs.** Always point canonical to himadri.dev so Google indexes your domain, not Medium.
5. **Don't neglect distribution.** Writing is 50%, distribution is 50%. A great post with no distribution gets 50 views. The same post shared properly gets 5,000.
