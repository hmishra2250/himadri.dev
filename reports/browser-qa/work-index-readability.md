# Work index readability

Date: 2026-09-11

## What changed

- One Work heading, a short introduction and four section links share the same left edge.
- Each recent system has its own row. Short summaries and implementation bullets stay together; results and scope sit beside that record on desktop and below it on narrow screens.
- The first three evaluation records have a stronger border. Supporting work uses short, sequential entries rather than three separate text columns.
- Common private-work disclosures appear at the start of each relevant section. Individual limits and all approved metric values remain visible.
- The four long case-study routes redirect permanently to short earlier-work summaries. The original detailed source and proof records remain in the repository.
- Public links, assistant sources and older challenge redirects now point directly to the new Work anchors.

## Review and checks

A separate design review confirmed the reading-order change and called out the old fragment tests and unnecessary employer labels. The tests were migrated to the new anchors; earlier Work entries now use dates and domain titles instead of company labels. A route review caught a metadata fallback that could reference retired SEO entries. The old detail route is now a redirect-only stub, with unknown slugs returning 404.

`npm run verify` passed after the final source changes. This includes typecheck, lint, formatting, proof/privacy, content, routes, SEO, confidentiality, structured data, corpus/evals, static build checks, link checks, route smoke and API tests. The audit reported zero vulnerabilities.

Local production HTTP tests passed for all six public routes, plus permanent redirects for all retired routes and a 404 for an unknown study. Home and Work remain statically prerendered. No client-side filtering or hidden detail controls were added. Served-content tests reject em dashes.

## Safari evidence

A dedicated Safari window was inspected at 1280 points wide and 600 points wide. Targeted window captures avoided unrelated browser windows. The desktop view showed the aligned heading, section navigation and one-record-per-row layout. The narrow view showed stacked results, wrapped text and sequential supporting entries without horizontal clipping. Existing fragment targets scrolled to the relevant records.

The final preview was loaded through a fresh URL after the production rebuild to avoid reusing the previous document during hash-only navigation. Screenshots were inspected locally, not added to public assets.

Narrow-window checks are not exact phone-device emulation. Live HTTP checks remain the post-push release gate. This review does not claim measured improvement in engagement or comprehension.
