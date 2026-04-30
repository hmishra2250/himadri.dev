# Browser QA evidence for portfolio gap remediation

Date: 2026-04-30
Owner: Codex Ralph execution pass
Environment: local production server at http://localhost:3100 after `npm run build` and `npm run start`
Browser: Chromium headless through the Chrome DevTools Protocol

## Scope

Checked these enabled portfolio routes:

- `/`
- `/interview-me`
- `/challenges`
- `/challenges/debug-this-agent`
- `/challenges/cost-anatomy`
- `/challenges/dag-execution-simulator`
- `/challenges/deck-ir-previewer`

Skipped routes by design:

- `/hiring-packet`: deferred in the route manifest and returned 404 locally.
- `/api/interview`: internal API route. A GET returned 405 and a POST returned 404 while `ENABLE_INTERVIEW_ASSISTANT_API` stayed disabled.

## Route and browser result summary

- 21 viewport renders passed across mobile, tablet, and desktop.
- 0 horizontal overflow failures were detected.
- 6 keyboard focus paths were sampled with real Tab input.
- Reduced motion was emulated and `matchMedia('(prefers-reduced-motion: reduce)')` returned true.
- Screenshots were captured to `/tmp/himadri-browser-qa` during the run. Hash prefixes are recorded below as evidence identifiers.

## Viewport matrix

| Route                               | Viewport |      Size | H1                                                             | Horizontal overflow | Focusable count | Screenshot hash prefix |
| ----------------------------------- | -------: | --------: | -------------------------------------------------------------- | ------------------- | --------------: | ---------------------- |
| /                                   |   mobile |   390x844 | Senior AI Engineer building production-grade agentic systems.  | pass                |              42 | 1b4dc0392cb9cce0       |
| /                                   |   tablet |  768x1024 | Senior AI Engineer building production-grade agentic systems.  | pass                |              42 | 7b7da2430256b14d       |
| /                                   |  desktop | 1440x1000 | Senior AI Engineer building production-grade agentic systems.  | pass                |              42 | 0dc874bfab265d98       |
| /interview-me                       |   mobile |   390x844 | Hard production AI questions, answered with sources            | pass                |              21 | a743a0ff87fc138c       |
| /interview-me                       |   tablet |  768x1024 | Hard production AI questions, answered with sources            | pass                |              21 | 9a5fe0ea829c27e4       |
| /interview-me                       |  desktop | 1440x1000 | Hard production AI questions, answered with sources            | pass                |              21 | 0e1d0ae14c028f00       |
| /challenges                         |   mobile |   390x844 | Production AI judgment you can inspect                         | pass                |              18 | 27922b401a47ee8b       |
| /challenges                         |   tablet |  768x1024 | Production AI judgment you can inspect                         | pass                |              18 | 942d87810112690d       |
| /challenges                         |  desktop | 1440x1000 | Production AI judgment you can inspect                         | pass                |              18 | 69fc298da3d50888       |
| /challenges/debug-this-agent        |   mobile |   390x844 | Multiple production AI failure modes                           | pass                |              24 | 7d4bafb4e74e3e3f       |
| /challenges/debug-this-agent        |   tablet |  768x1024 | Multiple production AI failure modes                           | pass                |              24 | b1a92895bf091cb9       |
| /challenges/debug-this-agent        |  desktop | 1440x1000 | Multiple production AI failure modes                           | pass                |              24 | 8697abb4d0c66554       |
| /challenges/cost-anatomy            |   mobile |   390x844 | AI unit economics as an architecture problem                   | pass                |              17 | a68457d22321341d       |
| /challenges/cost-anatomy            |   tablet |  768x1024 | AI unit economics as an architecture problem                   | pass                |              17 | 357cb5b725141603       |
| /challenges/cost-anatomy            |  desktop | 1440x1000 | AI unit economics as an architecture problem                   | pass                |              17 | a0589402a3a445e0       |
| /challenges/dag-execution-simulator |   mobile |   390x844 | Why explicit workflows beat vague agents in production         | pass                |              16 | 2c62438e59417679       |
| /challenges/dag-execution-simulator |   tablet |  768x1024 | Why explicit workflows beat vague agents in production         | pass                |              16 | 95d5b9ce205ee8c2       |
| /challenges/dag-execution-simulator |  desktop | 1440x1000 | Why explicit workflows beat vague agents in production         | pass                |              16 | 8344aee2548ab959       |
| /challenges/deck-ir-previewer       |   mobile |   390x844 | Inspectable intermediate representation for AI-generated decks | pass                |              20 | abb0398c08c02ae6       |
| /challenges/deck-ir-previewer       |   tablet |  768x1024 | Inspectable intermediate representation for AI-generated decks | pass                |              20 | e53d84750a62cdb3       |
| /challenges/deck-ir-previewer       |  desktop | 1440x1000 | Inspectable intermediate representation for AI-generated decks | pass                |              20 | a653820310c540d7       |

## Keyboard focus path samples

| Route                               | First ten Tab stops                                                                                                                                                                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| /                                   | a::Skip to content -> a::HM Himadri Mishra -> a::Thinking -> a::Work -> a::Resume -> a::Contact -> a::Interview Me -> a::Principles -> a::Challenges -> a::Explore systems I built                                             |
| /interview-me                       | a::Skip to content -> a::HM Himadri Mishra -> a::Thinking -> a::Work -> a::Resume -> a::Contact -> a::Interview Me -> a::Principles -> a::Challenges -> a::Agentic Market Research Platform                                    |
| /challenges/debug-this-agent        | a::Skip to content -> a::HM Himadri Mishra -> a::Thinking -> a::Work -> a::Resume -> a::Contact -> a::Interview Me -> a::Principles -> a::Challenges -> button::The sandbox was not reused across tasks. Choose this diagnosis |
| /challenges/cost-anatomy            | a::Skip to content -> a::HM Himadri Mishra -> a::Thinking -> a::Work -> a::Resume -> a::Contact -> a::Interview Me -> a::Principles -> a::Challenges -> button::Naive implementation                                           |
| /challenges/dag-execution-simulator | a::Skip to content -> a::HM Himadri Mishra -> a::Thinking -> a::Work -> a::Resume -> a::Contact -> a::Interview Me -> a::Principles -> a::Challenges -> button::Advance ready node                                             |
| /challenges/deck-ir-previewer       | a::Skip to content -> a::HM Himadri Mishra -> a::Thinking -> a::Work -> a::Resume -> a::Contact -> a::Interview Me -> a::Principles -> a::Challenges -> button::Research summary                                               |

## Manual notes from the evidence

- Homepage, Interview Me, Challenges, Debug This Agent, Cost Anatomy, DAG, and Deck IR rendered their expected H1 copy in every checked viewport.
- Debug This Agent exposes diagnosis choices as buttons and does not reveal the correct answer before a choice is selected.
- Cost Anatomy exposes model states as buttons and exposes selected state through `aria-pressed`.
- DAG exposes native buttons for advancing, resetting, and choosing recovery behavior after the judge gate. It now shows active, complete, queued, failed, and blocked state labels.
- Deck IR exposes sample and inspection mode buttons with `aria-pressed` plus a native textarea for keyboard editing.
- The nav and skip link were reachable before page-specific controls on all sampled keyboard paths.
- The deferred hiring packet stayed unavailable. The assistant API stayed default-off.

## Route audit output

```txt
200 /
200 /interview-me
200 /challenges
200 /challenges/debug-this-agent
200 /challenges/cost-anatomy
200 /challenges/dag-execution-simulator
200 /challenges/deck-ir-previewer
404 /hiring-packet
405 GET /api/interview
404 POST /api/interview with disabled server flag
200 /sitemap.xml
200 /robots.txt
```

Sitemap contained enabled public routes including DAG and Deck IR. It did not contain `/api/interview` or `/hiring-packet`.

Robots output allowed the site and pointed to the production sitemap.

## Known limits

- This pass used local Chromium headless evidence, not a hosted deployment.
- Lighthouse was not run because the approved plan avoids adding QA tooling unless explicitly approved.
- Screenshots were captured as local temporary artifacts, with hash prefixes recorded here instead of committing binary images.
