# Light portfolio release QA

Date: 2026-09-10

## Scope

Applied the approved personal engineering-index design to all 10 enabled public routes: homepage, About, Contact, Resume, Notes, the case-study index and four case-study details. Shared navigation, footer, typography, colors and contact actions use the same light shell.

The original portrait, approved work copy, distinct verification notes, historical content, route manifest, canonical resume and privacy gates are preserved. The contact row includes Email, GitHub, Resume PDF, X and LinkedIn as consistent filled buttons. Shared sketches replace duplicate SVG implementations.

## Verification

- `npm run verify`: passed, including typecheck, lint, formatting, privacy contracts, content, corpus, assistant evaluations, routes, SEO, confidentiality, structured data, production build, links, route smoke checks and API tests.
- `npm run test:design:http`: passed locally and on production for all 10 public routes, served design CSS, exact approved work copy, original portrait bytes, one H1 and main landmark per page, shared shell and five contact actions.
- Runtime HTTP checks cover enabled pages, retired-route redirects, deferred-route protection, API gating and canonical PDF bytes.
- `npm audit --audit-level=moderate`: zero vulnerabilities.
- Notes validation self-test and `git diff --check`: passed.
- Existing application captures cover 1440px, 390px and 320px on all 10 routes, plus 1024px on the two work indexes. They show no horizontal overflow, broken images, unhandled browser errors or remaining dark panels.
- The 23 captures unaffected by the final narrow-screen correction pass the complete geometry checks: readable sticky navigation, diagram text contained within nodes, labels at least 11px, five 44px contact buttons and aligned homepage secondary content. Recent work begins within the first 700px at 390px.

## Verification boundary

The final change aligns secondary-page gutters with the homepage below 340px. It corrects a measured 10.87px case-index diagram label at 320px: the source geometry is now `298 / 376 * 14 = 11.10px`. This last gutter change was source-checked but not re-captured. The persistent Chrome DevTools session was unavailable; it was not restarted and no additional consent was requested. Existing captures were produced earlier using isolated headless Chromium, not Playwright.

Live model completions, external message submission and social-account login flows were intentionally not exercised. No environment settings or confidential evidence were changed or published.

## Deployment cache recovery

The initial Git-connected deployment served the new HTML with an old dark stylesheet. Production verification caught the mismatch. A forced deployment from a clean archive of the committed source, without the build cache, restored the correct styles. The HTTP design check now fetches the actual linked stylesheet and asserts the pearl and cobalt tokens, homepage and secondary-route styles, and contact button styles. A successful deployment status or correct HTML alone is not sufficient release evidence.
