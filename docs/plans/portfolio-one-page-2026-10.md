# himadri.dev one-page redesign (October 2026)

Status: approved 6 October 2026. This plan supersedes the route model and page set in the earlier plans in this directory.

## Why

The site had about 2,980 words across six pages: long anonymized case studies, essay notes, an About page with old metrics, and a contact page. The recent work, which is the strongest evidence, was buried under caveats. The GitHub profile README shows the better shape: what I do now, what I did, and a link for every claim.

## Decisions

- One homepage plus `/resume`. Work, Notes, About and Contact are retired and redirect to the matching homepage section.
- The chat assistant (`/interview-me`, `/api/interview`, the Gemini path, the corpus and its evals) is deleted. Git history keeps it.
- Proof is links: merged Firecrawl pull requests, public repositories, agentexperience.tech and the resume.
- Firecrawl results are shown as percentages with what was measured and the run count. They are already on the public resume.
- No public email. LinkedIn, X and GitHub are the contact paths. A neutral address can be added later in `src/content/site.ts`.
- No public job-search signal anywhere.

## Page structure

1. Hero: portrait, the punchline as the only h1, the facts line, and links to recent work, GitHub and the resume.
2. 01 Now: Mudita Studios (described by what the work does, no product names), Agent Experience in the open, and an "Also" list of one-liners for side projects that grows over time.
3. 02 Previously: Firecrawl. Three outcome figures, twelve merged pull requests in three groups, a link to all 87, and one note on the work that is not public.
4. 03 Before that: a timeline from IIT (BHU) to Knit, earlier open source, and the full resume.

## Messaging rules

- One message per layer: the punchline appears once; the facts line appears once.
- Present tense for Mudita Studios and Agent Experience; "Previously" only for Firecrawl.
- No Mudita product names. No retired metrics (48-72h, 10x, 93% to 98%); Knit reads "2-3 days to under an hour".
- No em dashes, no contractions. `src/lib/validation.ts` enforces these and the rules above.

## Design

Visual rules come from the claude.ai/design project "himadri.dev Design System": pearl, graphite and one cobalt accent; IBM Plex Sans and Mono; one 1080px column on one left edge; rules instead of cards; square corners; light only. The site uses the port in `src/styles/design-system.css`. A local copy of the whole project lives in `design-system/` (git-ignored). Its readme's copy rules predate this plan; where they differ, this plan wins.

## Content model

- `src/content/site.ts`: everything the site says, in reading order.
- `src/content/proof.ts`: the approved source for every company-specific statement and number, referenced by id from `site.ts`.
- `src/content/profile.ts`: identity fields for metadata and structured data.

## Verification

`npm run verify` runs typecheck, lint, the site contract and render tests, format, content, route, SEO, confidentiality and structured-data validation, the build with its static-prerender check, the link check and the route smoke test. `npm run test:design:http` checks a running server.
