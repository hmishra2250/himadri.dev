# Agent Experience cross-links

## Scope

- Added Agent Experience beside Work in shared header and footer navigation.
- Added a contextual field-guide link on Notes; preserved existing Home and Work links.
- Centralized the external URL in the profile content module.
- Preserved design tokens, copy, internal route authority and static rendering.
- Kept the external site out of the portfolio sitemap.

## Verification

- Navigation regression failed before implementation, then passed.
- `npm run verify`: passed, including static prerender checks, content, privacy, routes, links and API tests.
- `npm audit --audit-level=moderate`: zero vulnerabilities.
- `CHECK_BASE_URL=http://127.0.0.1:3018 npm run test:design:http`: passed for six public routes.
- Impeccable detector on changed UI files: no findings.
- Safari desktop window at 1280 by 900: navigation visible on one row.
- Safari narrow window at 500 by 900: full labels fit on two navigation rows, with visible keyboard focus.
- Native Safari click on Agent Experience reached the live field guide; browser Back returned to the local portfolio.
- Native Safari clicks on Work, About and Contact reached their correct local pages.
- Desktop and narrow screenshots retained in local task evidence, not published.

## Reciprocal links

A read-only check of the live Agent Experience sitemap found visible portfolio footer links on all 33 HTML pages and an additional link on About. Reciprocal links are already live. The local Agent Experience repository has unrelated uncommitted work and differs from deployed HTML, so it was not edited or published by this task.

## Limits

The narrow Safari check is a desktop viewport check, not a physical-device test. Safari automation settings were not changed. No Chrome browser was used.
