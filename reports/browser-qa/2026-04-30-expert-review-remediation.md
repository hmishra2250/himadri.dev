# Browser QA evidence for expert review remediation

Date: 2026-04-30
Owner: Codex Ralph execution pass
Environment: local production server at http://localhost:3100 after `npm run build` and `npm run start`
Browser: Chromium headless through the Chrome DevTools Protocol

## Scope

Checked these routes at desktop and 375px mobile widths:

- `/`
- `/contact`
- `/challenges`
- `/challenges/dag-execution-simulator`
- `/challenges/deck-ir-previewer`
- `/interview-me`

## Summary

- 12 viewport renders passed.
- 0 horizontal overflow failures were detected.
- 0 internal phase-language hits were detected for the checked routes.
- Homepage nav items: Work, Resume, Contact, Interview Me, Principles, Challenges.
- Homepage hero CTAs: Explore systems I built, Interview me, Download resume.
- Normal motion trace animation: `trace-reveal`, duration `0.52s`.
- Reduced motion matched: true. Trace animation name: `none`, opacity `1`, transform `none`.
- OpenGraph image: `https://himadri.dev/og-image.png`, 1200x630.
- Twitter image: `https://himadri.dev/og-image.png`.

## Viewport matrix

| Route                               | Viewport  |      Size | H1                                                             | Horizontal overflow | Internal phase copy |
| ----------------------------------- | --------- | --------: | -------------------------------------------------------------- | ------------------- | ------------------- |
| /                                   | mobile375 |   375x812 | Senior AI Engineer building production-grade agentic systems.  | pass                | pass                |
| /                                   | desktop   | 1440x1000 | Senior AI Engineer building production-grade agentic systems.  | pass                | pass                |
| /contact                            | mobile375 |   375x812 | Best fit: serious production AI systems conversations.         | pass                | pass                |
| /contact                            | desktop   | 1440x1000 | Best fit: serious production AI systems conversations.         | pass                | pass                |
| /challenges                         | mobile375 |   375x812 | Production AI judgment you can inspect                         | pass                | pass                |
| /challenges                         | desktop   | 1440x1000 | Production AI judgment you can inspect                         | pass                | pass                |
| /challenges/dag-execution-simulator | mobile375 |   375x812 | Why explicit workflows beat vague agents in production         | pass                | pass                |
| /challenges/dag-execution-simulator | desktop   | 1440x1000 | Why explicit workflows beat vague agents in production         | pass                | pass                |
| /challenges/deck-ir-previewer       | mobile375 |   375x812 | Inspectable intermediate representation for AI-generated decks | pass                | pass                |
| /challenges/deck-ir-previewer       | desktop   | 1440x1000 | Inspectable intermediate representation for AI-generated decks | pass                | pass                |
| /interview-me                       | mobile375 |   375x812 | Hard production AI questions, answered with sources            | pass                | pass                |
| /interview-me                       | desktop   | 1440x1000 | Hard production AI questions, answered with sources            | pass                | pass                |

## Route and asset checks

```txt
GET /og-image.png: 200 image/png, 1200x630 source asset
/api/interview: internal API route, not checked as a public page
```

## Notes

- Live System Pulse now has progressive reveal in normal motion mode and no trace-row animation under reduced motion.
- Mobile 375px layout no longer overflows.
- The hardcoded Thinking nav link is absent.
- Hero has three CTAs.
- OG and Twitter metadata point to the PNG social preview asset.

## Known limits

- This pass used local Chromium headless evidence, not a hosted deployment.
- It did not use a third-party LinkedIn or Slack scraper.
