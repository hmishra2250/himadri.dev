# Curated portfolio verification

Date: 2026-09-10

## Scope

Homepage curation and complete Work archive, preserving the approved visual system and existing About/Contact content. The composition is specified in `docs/plans/curated-portfolio.md`.

## Visual review

Inspected Home and Work in native Safari at desktop and a resized narrow-window layout:

- Home shows the original portrait, introduction and three selected highlights.
- Evidence and descriptive links align in the desktop grid and stack at narrow width.
- The writing feature explains the field guide instead of presenting an orphan link.
- About, Contact and the footer remain intact, with wrapping contact actions.
- Work presents four chapter links, readable detailed entries and prominent production case-study rows.
- Fixed a shared CSS class collision that initially misaligned the writing feature.

Screenshots were inspected through the browser tool, not saved as repository image artifacts. This was not an exact phone-viewport emulation or a cross-browser/mobile-device certification.

## Automated verification

- `npm run verify`: passed, including typecheck, lint, formatting, content, proof/privacy contracts, assistant corpus/evals, routes, SEO, confidentiality, structured data, production build, links, route smoke and API tests.
- `npm audit --audit-level=moderate`: zero vulnerabilities.
- Production build: Home and Work are static prerender entries. Their route configuration rejects accidental request-time rendering.
- Raw HTTP design contracts cover all ten enabled public routes: rendered content, archive completeness, scoped metrics, canonical metadata, descriptions, landmarks, links, design CSS, original portrait and contact actions.

Content, evidence and navigation are present in HTML without executing scripts. Next.js navigation and optional analytics can still use JavaScript; this is not a zero-JavaScript claim.
