# Curated homepage and complete work archive

Status: Homepage selection superseded by `agent-experience-first-design.md`. Static delivery and proof contracts remain applicable.

## Decision

The homepage is an introduction, not an inventory. Replace overlapping recent-work, methods, shipped-systems and public-project grids with three selected highlights and one contextual writing feature. Preserve the portrait, approved pearl/cobalt typography, About and Contact. The existing Work route becomes the full archive, with direct navigation from the header.

## Principles and alternatives

- Optimize for a quick understanding of capability, then offer depth through descriptive links.
- Group work by the problem solved, not by internal evidence taxonomy.
- Keep all approved work discoverable in static HTML, with public labels and metric scopes intact.
- Preserve proof authority and confidentiality; curation changes placement, not evidence.

Rejected: keeping all entries on the homepage with renamed headings still leaves the same reading burden. Rejected: tabs or client-side filters hide information and add needless interaction. Selected: a curated homepage and an anchored, fully rendered Work archive.

The design review recommended the same three capability areas. Its suggestion of several metrics per highlight was deliberately narrowed: only the established research-turnaround and ML-cost figures appear on Home. The controlled-study gain, inventory count and adapter coverage stay with their full qualification on Work.

## Homepage

1. Existing introduction, portrait and contact/resume actions.
2. Selected work: three equal editorial highlights.
   - Tools agents can use: shipped MCP authentication and onboarding, with discovery, routing and evaluation context. Anonymous summary label, link to Work's agent-tools chapter.
   - Research turned into finished reports: production workflow ownership, established turnaround metric, direct detailed case-study link.
   - ML infrastructure rebuilt for efficiency: production platform ownership, established cost-reduction metric, direct detailed case-study link.
3. One prominent “View all work” link, describing the deeper technical archive.
4. Writing: contextual field-guide feature, plus a link to writing and open-source work on Work. No unexplained one-line guide link.
5. Existing About and Contact, unchanged.

## Complete Work page

Keep `/case-studies` and existing case-study URLs. Header Work goes directly to `/case-studies`.

- `#agent-tools`: Agent tools and evaluation. Six detailed entries plus compact supporting interface/runtime contributions, preserving every resume-backed brief and its anchor.
- `#ai-workflows`: AI workflows and safeguards. Three shipped working systems, not unfinished projects.
- `#earlier-work`: Production case studies. Four detailed case-study links with clear context, not a hidden historical row.
- `#public-work`: Writing and open source. All four public projects, with descriptions and maturity labels.

Use a plain anchor contents navigation. No tabs, accordions, client filtering, fetch-on-mount or new dependencies. Keep every existing proof and scope disclosure in the complete archive.

## Rendering and acceptance

- Home and Work are Server Components, prerendered at build time. Reject accidental request-time rendering on those routes.
- Existing Next.js navigation and optional analytics may use JavaScript; all portfolio content, metadata, links and evidence must be present without it. This is not a claim that the entire Next.js site sends zero JavaScript.
- Tests prove three curated homepage highlights, no full archive grids on Home, complete Work content and disclosures, valid destinations/anchors, canonical metadata and static prerender manifest entries.
- Regression coverage moves with content instead of being deleted. Preserve the resume-only proof contract and separate current-work metric lane.
- Full verify, dependency audit, local production HTTP checks, and live HTTP checks after publishing. Inspect desktop/mobile presentation if browser control is available; otherwise report that gap.
