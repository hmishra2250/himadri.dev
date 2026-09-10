# Agent Experience first: positioning and homepage design

Status: Implemented and verified locally; deployment is the release gate.
Updated: 2026-09-11

Supersedes the editorial selection in `curated-portfolio.md`. Preserve its static delivery and proof contracts, not its choice of historical homepage highlights.

## What went wrong

The previous homepage gave two of three primary positions to older research and ML work. It made recent agent engineering look like one specialty among several, even though it is the intended career identity. Large historical figures then carried more visual authority than the recent systems. Broad headlines described capability rather than explaining specific engineering. Equal columns flattened the differences between the work and made the page resemble a services menu.

This is a positioning error before it is a CSS error. Renaming the same three cards does not repair it.

## Positioning decision

Primary headlines, both visible at the top: **Agent Experience Engineer** and **AI Product Engineer**.

Agent systems connects those identities. Backend, frontend, machine learning and computer vision remain part of the portfolio at a smaller scale.

Working definition, not a prediction about hiring demand: engineering the interfaces, infrastructure and evaluation that let agents discover a product, obtain appropriate access, use its tools and complete a user's task.

The evidence is implementation, not advocacy alone. The distinctive thread is personally built state-based journey evaluation, multi-client execution, shipped access flows, discovery/retrieval measurement and evidence-grounded reporting. The public field guide makes that work legible, but does not substitute for private implementation evidence.

Avoid positioning as an agent-visibility marketer, a UX-only practitioner, a generalist ML consultant or an author who has not shipped. Do not claim that every company needs this role. Make the role understandable even to someone who has never encountered the title.

## Proposed introduction

Name remains clearly visible in the header and next to the original portrait.

**H1, two lines:** Agent Experience Engineer. / AI Product Engineer.

**Body:** I ship agent-facing tools and the systems behind them: MCP access, discovery and retrieval, state-based evaluation and evidence-grounded reporting.

**Actions:** Explore my work; Get in touch. Resume and GitHub remain quieter text links. Work must be visible without a long scroll past an oversized hero.

This is past-tense implementation-led copy, not a guarantee that agents always succeed. No historical figures, industry forecasts, unsupported superlatives or generic benefit slogans in the introduction.

## Homepage stories and evidence

### 1. Flagship: State-based agent evaluation

Proposed copy:

> I turned onboarding journeys into executable capability states, then used those states to compare tool routing and task completion across agent clients. I built the evaluation infrastructure, state-matched router-card selection and evidence capture needed to inspect which journeys worked better.

Technical signals: capability-state contracts, control/treatment matrices, client adapters, matched tasks, routing and completion checks, failure accounting.

Evidence sources: `method-coded-journey-paths`, `method-multi-harness-ax-experiments`, `method-agent-routing-surfaces`.

Status treatment: shipped evaluation platform; implemented state-based evaluation and completed controlled studies. Do not label every tested router-card configuration as a production rollout.

Detail destination: existing Work anchors for journey paths, multi-harness evaluation and router cards. Main link: **How I tested agent journeys**. One main story with a related-evidence trail, not three nearly identical cards.

### 2. Production access: MCP authentication and onboarding

Proposed copy:

> I shipped hosted MCP authentication and onboarding across account-connected, search-only and keyless entry points, connecting authorization, token lifecycle and CLI setup with explicit recovery paths.

Technical signals: OAuth, token and grant lifecycle, client profiles, headless access, scoped entry points, actionable recovery.

Evidence source: `method-auth-aware-onboarding`.

Status: shipped system. Live usage is established; conversion lift is not.

Link: **MCP access and recovery** to the existing auth-aware-onboarding anchor.

### 3. Product intelligence: Discovery, retrieval and insight reporting

Proposed copy:

> I built measurement for whether agents could find, retrieve and use a product, then built evidence-grounded reporting on top of those observations. The work covered evaluation banks, retrieval probes, APIs, synthesis, validation and recoverable report execution.

Technical signals: category/developer/goal-led banks, eligible populations, missing observations, citations, evidence bindings, validation gates, checkpoint recovery.

Evidence sources: `method-discovery-retrieval-measurement`, `method-evidence-grounded-insights`.

Status: shipped measurement and reporting. Daily reporting and recovered weekly artifacts are evidenced, not uninterrupted weekly operation or revenue lift.

Link: **From discovery evidence to product decisions** to the existing discovery/retrieval anchor, with the insight entry adjacent on Work.

### Supporting agent systems

A compact list below the primary stories, not another competing grid:

- Agent delivery platform: execution, artifact review and human approval.
- Coding-agent browser QA safeguards: execution boundaries, retained evidence and reviewer handoff.
- Governed knowledge MCP: read-only retrieval and proposed changes without write authority.

These are shipped working systems. They belong in the current engineering story, not in a development backlog. Keep their detailed scope and attribution in Work. Do not imply they form one product or were delivered for one organization.

### Public writing and tools

One contextual field-guide feature, followed by quieter links to the readiness rubric and public collection. State that these are independently published artifacts, not public reproductions of professional work. Keep the consumer-GPU experiment in the full archive.

### Background and contact

Retain the successful restrained About/Contact treatment. Earlier ML, search and computer vision can appear as a brief background sentence. No older employer logos, historical case-study highlights or old cost/turnaround counters on Home.

## Visual composition

Preserve the original portrait, pearl background, graphite, cobalt and local Go typography. Change composition and hierarchy rather than introducing a new decorative theme.

```text
Name / Work / About / Resume / Contact

Portrait   Agent Experience Engineer.
           AI Product Engineer.
           Short, concrete record of shipped work.
           Explore my work / Get in touch

Selected agent engineering

01  State-based agent evaluation                 [static explanatory figure]
    What I built, why state mattered.             capability state
    Technical decisions and evidence link.          -> matched tasks
                                                    -> control / treatment
                                                    -> traces and outcomes

02  MCP authentication and onboarding
    Production access flow, lifecycle and recovery.       [detail link]

03  Discovery, retrieval and insight reporting
    Measurement through evidence-grounded reporting.      [detail link]

More agent systems
    Delivery platform / Browser QA safeguards / Knowledge MCP
    View complete work

Published work
    Field guide with context and public links

About / Contact
```

Desktop: the flagship uses a broad text/figure split, approximately 7:5. Supporting stories are generous horizontal rows, not equal-width promise cards. Numbered labels are subordinate to descriptive project titles. Use readable sentence-case section headings rather than tiny all-caps headings for every major transition.

Figure: a deliberately simplified, static explanation of the evaluation structure. Label it as conceptual, not a production trace or screenshot. No fake terminal, fabricated dashboard, decorative metric tiles, animated workflow or invented runtime state. Text and technical explanation must remain meaningful without the figure.

Mobile: one reading column, story text before figure, no horizontal diagram scrolling, no clipped labels, no essential content hidden behind tabs or accordions. Keep links descriptive and comfortably tappable.

The flagship earns visual emphasis through its original engineering method, not through having the biggest number. Do not enforce equal paragraph heights or leave large blank spaces to align three unrelated cards.

## Numbers and confidentiality

No metric strip on Home. A useful engineering decision is stronger here than an unrelated historical KPI.

Keep exact scoped results in the detailed Work entries: the roughly eight percentage-point routing/completion observation, mapped surface inventory and adapter coverage. Do not strip their denominators or qualifications to make them look like growth metrics. Homepage summaries stay directional and concrete.

Every anonymous story retains its required visible label. Use existing proof claims; grouping may require multiple proof references. Required disclaimers remain readable, but must not become the page's dominant headline. Keep private names, code, endpoints and raw evidence off the public surface.

## Complete Work order

1. State-based evaluation, journeys and router cards.
2. MCP access and onboarding, including interface/runtime contributions.
3. Discovery/retrieval measurement and insight reporting.
4. Additional delivered agent systems.
5. Public writing and tools.
6. Earlier production background, a compact final section.

Keep existing URLs and fragment IDs working. Older case studies remain available for reference, not promoted as the reason to hire Himadri. Their presence in the archive does not assert that the owner still endorses every engineering decision. Do not delete factual history or make new negative public claims about previous teams.

## Profile alignment

- Portfolio: Agent Experience Engineer and AI Product Engineer as the two visible headlines, supported by the recent agent-systems work.
- GitHub: its existing AX-first ordering is directionally aligned. Keep the public README focused on inspectable artifacts, not private case-study claims.
- LinkedIn draft: proposed headline `Agent Experience Engineer | Agent Systems & AI Product Engineering | MCP, Evaluation & Developer Tools`. This is a proposed update, not a live LinkedIn edit.
- Resume: do not silently rewrite historical jobs or titles. Update current positioning through its own document review.

## Implementation acceptance

- A visitor can identify the role and name at least two recent systems from the first screen and first work section.
- No research-turnaround, ML-cost or historical-employer highlight on Home.
- Recent work is not reduced to one umbrella card. State-based evaluation, production access and measurement/reporting each have specific implementation evidence.
- All supporting shipped systems remain reachable, with no in-development reframing.
- All homepage claims reference approved proofs; grouping cannot erase attribution or delivery boundaries.
- Preserve static build checks, raw-HTML content/metadata tests and route/fragment compatibility.
- Update curated-homepage regression expectations rather than weakening confidentiality checks.
- Review actual desktop and small-screen reflow in Safari before release. Record a device-emulation gap if Safari responsive tooling is unavailable; do not label a resized desktop window as a phone test.
- Validate the composition against this brief before publishing. Passing tests does not establish that the positioning or design is good.

## Current scope

This implementation follows the revised dual-headline direction. Historical work remains in the complete archive. Baseline privacy tests passed before replacing the old homepage card composition. Regression tests now lock both role titles, recent-only highlights, static content, full archive retention and absence of historical homepage metrics.

## Independent critique and decisions

An independent review agreed that promoting two historical entries was incompatible with the intended positioning, and recommended an asymmetric recent-work lead with access, discovery, routing, evaluation and insight evidence. This brief adopts that correction.

It does not adopt the suggested headline promise or homepage metric strip. An explicit role and past-tense implementation record are less promotional. The three scoped aggregates require different qualifications and should not read as one product-growth scorecard. Likewise, an umbrella journey is a way to explain capability, not evidence that separate professional systems formed one deployed product. Distinct project stories preserve those boundaries.
