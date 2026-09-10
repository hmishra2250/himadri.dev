# Content-preserving Impeccable refinement

## Rollback checkpoint

Commit `2ce904baff7ac3644b70eab297bcc1594f2458a5` was confirmed on GitHub before editing. Annotated tag `checkpoint/pre-impeccable-2026-09-11` was pushed and its remote target verified.

## Scope and plan

Preserve the existing design system, project copy, proof records, section order, fonts and assets. Review Home and Work independently for visual hierarchy and technical defects. Lock existing behavior, make a small CSS pass, audit and polish, then check actual Safari navigation and served HTML.

Owner-approved exceptions: shorten the homepage intro, expand contractions, prohibit em dashes in website content, and repair About/Contact navigation.

## Independent critique and audit

Assessment A used Safari screenshots and source review without detector results. Assessment B independently used source, HTTP, Safari and the Impeccable detector. Their findings were combined only after A completed.

- Visual heuristic assessment: 21/28 applicable points. Expert efficiency, transactional recovery and product help were not applicable to the assessed portfolio surfaces. This is a heuristic judgment, not a measured user-study result.
- Initial technical assessment: 16/20. Strong static rendering and token use, with specific navigation, contrast and reading hierarchy weaknesses.
- Baseline detector on app/components returned no findings. The final scan included changed CSS and reported one existing thick cobalt border on featured Work records. It is an intentional, preserved design choice, not a new defect introduced by this pass. The scopes differ, so counts are not a before/after quality metric.
- No overlays or browser console inspection were available. Safari remote automation and JavaScript from Apple Events were disabled and were not enabled.

## Changes

- Work records retain implementation on the left and impact/checks on the right. The evidence column now shares space proportionally instead of using a fixed 270px rail. Body text is 16px; evidence is 14px. Records stack at 900px rather than 760px.
- Homepage proof/status text is at least 12px. Narrow-screen summary and engineering text retain their desktop reading sizes. Slightly looser hero tracking preserves both font families and weights.
- Disclosure text on warm panels uses existing graphite-soft instead of muted, correcting the identified normal-text contrast failure without changing palette tokens.
- Header/footer links have minimum 44px targets in both dimensions. Standalone homepage project and writing links have 44px minimum height.
- About and Contact now open their dedicated public routes through the existing route manifest. Homepage section anchors remain present and valid.
- Intro now reads: "I build tools agents can find and use. I ship the access, evaluation and reporting systems behind them."
- Expanded contractions in the selected-work heading, About principles and homepage contact prompt. The last contraction was HTML-encoded; the regression now normalizes apostrophe entities before scanning source.
- Repo search found no em dashes in website source. Historical planning documents and regexes that test for forbidden punctuation were not rewritten.
- Excluded pre-existing local `.firecrawl` research captures from formatting checks rather than changing or publishing those captures.

## Regression evidence

Before fixes, navigation expectations failed for the old homepage fragment destinations. Writing-rule checks failed for contractions, including the HTML-encoded contact prompt. After fixes, those regressions passed. HTTP checks cover direct top-navigation destinations and writing rules on all six public routes.

## Preserved decisions

No contact-button recoloring, new card design, section reordering, project deletion, added metrics, new navigation item, new font, new dependency or new motion. Existing reduced-motion overrides remain unchanged because this pass introduces no motion. Core content still ships as static HTML, not hydration-dependent disclosure.

## Final verification

- `npm run verify`: passed, including typecheck, lint, formatting, content/proof checks, assistant corpus/evaluation, route/SEO/confidentiality checks, production build, static prerender assertions, links, route smoke and API tests.
- `CHECK_BASE_URL=http://127.0.0.1:3018 npm run test:design:http`: passed for all six public routes, including top-navigation destinations and writing rules.
- `npm audit --audit-level=moderate`: zero vulnerabilities.
- Source hashes: original fonts, images, proof records and project content unchanged. Every `:root` token block is byte-identical to the checkpoint.
- Six-route rendered snapshots: exact text/link/image match after only the five approved copy substitutions and About/Contact destination changes.
- Contrast calculation for corrected disclosure contexts: graphite-soft on pearl-warm is 7.61:1, replacing muted on pearl-warm at 4.24:1.
- Independent final source-diff review: approved, no concrete blockers.

### Safari end-to-end checks

Native accessibility clicks were used, not URL substitution, for these navigation transitions. The actual destination URL and page title were read after each click.

| Size                   | Journey          | Result                              |
| ---------------------- | ---------------- | ----------------------------------- |
| Desktop, 1280px window | Home > Work      | `/case-studies`, correct Work title |
| Desktop                | Work > About     | `/about`, correct About title       |
| Desktop                | About > Contact  | `/contact`, correct Contact title   |
| Desktop                | Contact > Resume | `/resume`, correct Resume title     |
| Narrow, 600px window   | Home > Work      | `/case-studies`, correct Work title |
| Narrow                 | Work > About     | `/about`, correct About title       |
| Narrow                 | About > Contact  | `/contact`, correct Contact title   |

Desktop and narrow Home/Work screenshots were inspected. The evidence column remains beside implementation on desktop and stacks below it on narrow screens. No clipping was observed in those captures. Screenshots and raw audit artifacts remain local under `.omx/research/impeccable-refinement/`, not website assets.

### Verification limits

Safari WebDriver refused a session because Allow Remote Automation is disabled. Native accessibility clicks provided the end-to-end fallback without changing browser permissions. This is not a claim of physical iPhone, screen-reader or complete WCAG certification. No browser console or injected DOM measurements were available. Existing contact colors and featured-record accent borders remain intentional design exceptions.
