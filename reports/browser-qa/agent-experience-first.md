# Agent Experience and AI Product Engineering redesign

Date: 2026-09-11

## Design checked

- Both roles are visible as separate lines in one homepage H1.
- A state-based evaluation flagship leads, followed by MCP access and discovery/insight engineering rows.
- Additional shipped agent systems remain directly linked.
- Broader backend, frontend, ML and computer-vision experience is retained in Work, with historical case studies last.
- Original portrait, writing feature, About and Contact remain.

## Browser evidence

Safari desktop inspection confirmed the two-role hierarchy, readable project rows, static evaluation illustration, scoped labels and archive links. Safari narrow-window and increased-page-zoom checks confirmed single-column reflow, wrapping text, stacked illustration, contact links and Work chapter navigation. No clipping was observed in the inspected regions. Normal page zoom was restored.

Safari's web-developer feature switch was disabled, so exact phone-device emulation was unavailable. These checks are desktop and small-screen reflow evidence, not an iPhone-device certification. No browser settings were enabled or privacy protections changed. Screenshots were inspected through the browser tool, not saved as repository images.

An initial Chromium preview preceded the owner's browser correction. The Chromium quit command was issued, its leftover portfolio tab was explicitly closed, and remaining browser inspection used Safari only.

## Regression coverage

The updated contracts check both role titles, recent-only selected proof references, absence of historical homepage metrics, retained archive entries, shipped-system links, static route configuration, valid data-driven fragments and the absence of em dashes in served public content. A negative fragment fixture checks that nonexistent anchors still fail.

The Work fragment checker now reads the rendered markup instead of requiring production components to duplicate literal IDs for a source scanner.

## Independent review

The review found no blocking correctness, privacy, proof, rendering or route issues. Both minor findings were resolved: Resume and GitHub use quiet text links, and unexpected method-card IDs fail explicitly instead of silently disappearing. Regression tests cover both changes.

## Release checks

`npm run verify` passed, including formatting, lint, typecheck, proof/privacy, content, corpus/evals, routes, SEO, confidentiality, structured data, static production build, links, route smoke and API tests. `npm audit --audit-level=moderate` reported zero vulnerabilities. Local production HTTP contracts passed for all ten public routes, including both role titles, archive content, metadata and no-em-dash checks.

The static build assertion confirms Home and Work are prerendered. No client-side data fetching, filtering or content disclosure was introduced. Deployed HTTP checks remain the post-push release gate.
