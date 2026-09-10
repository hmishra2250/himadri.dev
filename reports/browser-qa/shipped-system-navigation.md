# Shipped-system navigation refinement

Date: 2026-09-11

## Change and boundaries

The homepage's compact extra-system links now form a grouped navigation panel: three full-link tiles with existing approved summaries, visible exploration cues, and a separated primary Work action. Recent flagship content, historical placement, proof claims, required disclosure and route targets are unchanged. No dependencies or client-side content behavior were added.

## Evidence

- Existing privacy/current-work/curation regressions passed before editing.
- Extended static-render tests confirm three complete native links, title-based accessible names, summaries, action cues and the primary archive link. Existing anchor and proof checks remain active.
- `npm run verify` passed, including static Home/Work build assertions, lint, typecheck, content, proof/privacy, confidentiality, SEO, routes, links, corpus/evals and API tests.
- Local production HTTP contracts passed for all ten public routes. The served-content checks include the summaries, disclosure, link destinations and no em dashes.
- `npm audit --audit-level=moderate` reported zero vulnerabilities.
- Safari desktop inspection showed three aligned tiles, readable summaries, persistent action cues, the required disclosure and the visually separated primary Work action.
- Activating the first complete tile opened `/case-studies#agent-delivery-platform-foundations`, with its implementation details and scope intact.
- A Safari window resized to 600 points showed the single-column layout and wrapping text without horizontal clipping. A targeted window screenshot avoided capturing unrelated Safari windows. This is narrow-window evidence, not exact phone-device emulation.

## Limits

The stronger hierarchy and explicit link cues are a design improvement, not measured click-through uplift. No conversion claim is made. Live HTTP validation remains the post-push release check.
