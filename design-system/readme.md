# himadri.dev Design System (v2)

A design system for **himadri.dev**, the portfolio of Himadri Mishra, *Agent Experience Engineer and AI Product Engineer*. It is inspired by the current site, not a copy of it. The color coding is kept exactly. Layout, type and components are new.

**Concept: the engineering record.** The site reads like a well-set technical publication. Everything sits on **one left edge** inside a 1080px container. Each section opens with a graphite rule carrying a mono index and label (with an optional link on the right), then a sentence headline, then content that fills the width: 7:5 splits, 3-column grids, or full-width rows. Rules do the work that cards do on most sites. Everything is square, flat and fast.

> **On himadri.dev:** this readme is pulled from the claude.ai/design project unchanged, apart from this note and the last two sections ("How the site uses it", "Site additions"). The site's content rules live in `AGENTS.md` and `src/lib/validation.ts` and win over "Content fundamentals" below where they differ: no email, no per-block anonymized caveats, no display-size numbers, no role titles as headlines, figures only with a proof claim.

## Sources
- GitHub: https://github.com/hmishra2250/himadri.dev (`main`). Colors come from `src/styles/globals.css`. Copy comes from `src/content/*.ts` (profile, practice, selected-work, current-work, case-studies, about, notes). Explore the repo for more content and edge cases.
- Live: https://himadri.dev · Related: https://agentexperience.tech/

## Index
- `styles.css` — entry point (imports only)
- `tokens/` — `fonts.css` (Google Fonts import), `colors.css`, `typography.css`, `spacing.css`, `motion.css`, `base.css`
- `components/components.css` — all `hm-*` classes
- `components/core/` — Button, ArrowLink, Label, Status, Tabs
- `components/layout/` — SiteHeader, SiteFooter, Section, PageHeader
- `components/identity/` — Portrait, ContactBlock
- `components/work/` — WorkRow, WorkRows, Pipeline, SpecList, SystemGrid, SystemCard, DecisionFork, Timeline, MetricStrip, Note
- `ui_kits/portfolio/` — `index.html` (click-through), `all-pages.html` (every page top to bottom)
- `guidelines/` — foundation cards · `assets/` — portrait, legacy OG image · `SKILL.md`, `github.md`

## Components
Button, ArrowLink, Label, Status, Tabs, SiteHeader, SiteFooter, Section, PageHeader, Portrait, ContactBlock, WorkRow, WorkRows, Pipeline, SpecList, SystemGrid, SystemCard, DecisionFork, Timeline, MetricStrip, Note.

Utility classes for page composition: `hm-wrap` (container), `hm-split` / `hm-split--even`, `hm-figure`, `hm-toc`, `hm-block`, `hm-grid` (12 cols), `hm-display`, `hm-h1`–`hm-h4`, `hm-lead`, `hm-prose`, `hm-bullets`, `hm-cols-3`, `hm-quote`.

## Pages (UI kit)
Home · Work (filterable index) · Case study (Agentic Market Research Platform) · About · Notes · Contact.

## Content fundamentals
- **First person, past tense for shipped work.** "I shipped hosted MCP authentication…". Address the reader plainly: "Send me what you are building."
- **Headlines are sentences ending in a period.** "I build tools agents can find and use.", "Agent systems I have built." Role titles are never used as display headlines: the h1 is the one-line role pair "Agent Experience Engineer · AI Product Engineer" (spelled out, for search), set small above the display statement. Never let a role title wrap mid-phrase.
- **Sentence case everywhere.** Uppercase only in mono labels, via CSS.
- **Scope every claim.** Each record shows Impact, How it was checked, and Scope. Private work carries "Anonymized engineering summary; underlying work is private."
- **Status vocabulary:** Shipped system, Shipped platform, Shipped working version, Completed experiments, Implemented evaluation, Published guide, Draft rubric, Local experiment.
- **No em dashes in authored copy, no emoji, no superlatives.** Unicode arrows are the only glyphs: → internal, ↗ external, ↓ in-page, ← back.
- **Numbers** appear only on historical, sourced work (MetricStrip in Earlier work and the case study). Current agent work stays qualitative.

## Visual foundations
- **Color (unchanged from the live site):** pearl `#f6f7f8` page, pearl-warm `#edeff1` panels and figures, graphite `#14232c` ink and section rules, graphite-soft `#3d4d56` body, muted `#65737b` meta. Cobalt `#2855d8` for fills, nodes and rules, cobalt-dark `#1f43ae` for accent text. Status green/warn/violet/error appear only as small square dots. Contact channels keep their colors (GitHub `#24292f`, LinkedIn `#0a66c2`, X `#141414`, Resume `#a52d3a`, Email cobalt), and only inside ContactBlock.
- **Type:** IBM Plex Sans (400, 500, 600, italic 400) + IBM Plex Mono (400, 500), loaded from Google Fonts with system fallbacks. Display is clamp(40–72px), a short statement on two lines (max 17ch). Display and h1/h2 are 400 with tight tracking (-0.035em / -0.022em). h3/h4 and UI are 500. Body is 17px/1.6 at a 64ch measure. Mono is for indices, labels, status, provenance and tabular figures.
- **Grid:** one 1080px container, fluid margins clamp(20px, 4vw, 48px). No offset rails: headers, titles and content share the same left edge. Content fills the width with `hm-split` (7:5, or even), `hm-cols-3`, `SpecList columns`, or full-width rows. Prose is capped at 64ch. Everything collapses to one column under 860px.
- **Rhythm:** section gap clamp(72px, 9vw, 128px). Section header = rule + `NN LABEL` (+ right link), title, intro, then 28–44px to content.
- **Rules, not cards:** graphite 1px opens lists and sections, hairline-strong separates rows, hairline separates spec rows, 2px cobalt tops emphasis columns, a 2px graphite rail with cobalt square nodes draws pipelines. SystemGrid uses shared table-like borders.
- **Radii:** 0 everywhere. The portrait is 4px. The status dot is a 7px square.
- **Shadows:** none. Depth comes only from pearl-warm fills.
- **Backgrounds:** flat pearl. No gradients, textures or illustrations. The only image is the portrait.
- **Blur:** only the sticky header (86% pearl + 16px blur).
- **Hover:** the secondary button inverts to a graphite fill; primary goes cobalt to cobalt-dark; arrows nudge 3px; row titles turn cobalt-dark; system cards fill pearl-warm; links underline.
- **Press:** buttons move down 1px. **Focus:** 2px cobalt outline, 3px offset.
- **Motion:** 140ms ease-inout for color, 240ms ease-out for fills and arrows, and the accordion + rotates 45° to ×. No entrance animation. Reduced motion zeroes durations.
- **Hit targets:** at least 44px (header nav, tabs, buttons).

## Iconography
No icon set. Affordances are unicode arrows inside `aria-hidden` spans, and bullets are a 10px cobalt dash drawn in CSS. If icons ever become necessary, use Lucide from a CDN at 1.5px stroke and list it as an addition. No emoji.

## Brand mark
There is **no logo**. The header shows the name in Plex Sans 600 next to a mono role line. Do not draw a mark. `assets/og-image.png` is a legacy dark social card that does not match this system; use it only until it is replaced.

## Fonts
Loaded via `@import` from Google Fonts in `tokens/fonts.css` (OFL). To self-host, download the woff2 files from Google Fonts or Fontsource, add `@font-face` rules, and remove the import.

## Intentional additions (not on the current site)
Tabs (Work filter), DecisionFork and MetricStrip (case study, from `case-studies.ts` data), Pipeline (generalises the old evaluation outline), SpecList, and a Case study page.

## How the site uses it

Pulled from claude.ai/design on 11 October 2026; see `SYNC.md`.

- `src/styles/globals.css` imports the tokens (except `fonts.css`), `components/components.css` (the v2 file, unchanged) and `components/additions.css`. IBM Plex is loaded with `next/font` instead of the Google Fonts import.
- `src/components/ds/` holds typed React server components that emit only the classes documented here: `Button`, `ArrowLink`, `Label`, `Status`, `Section`, `PageHeader`, `Portrait`, `DiagramFigure` (with `DgNode`, `DgEdge`, `DgLabel`, `DgZone`), `WorkRows`, `SystemGrid`, `SystemCard`, `Timeline`, `ShipStrip`, `Evidence`, `DocumentPages`, `SocialLinks`.
- The home page follows the UI kit's Home: the hero with the shipped strip, then numbered sections (Now, In the open, Previously, Before that, Side projects): main work first, side work last. One page and `/resume`, so there is no Work, Notes, About or Contact page and no contact block; WorkRows render without accordions, so nothing on the page is hidden.
- The footer has no colophon or copyright line, and no page carries notes about the site itself (fonts, formats, how it was built).
- The JSX under `components/` and the UI kit are references for claude.ai/design previews; the site does not import them.

## Site additions

In `components/additions.css`. Add a pattern there, with a component in `src/components/ds/` and a row here, before using it.

| Pattern | Classes | React | Use |
|---|---|---|---|
| Scroll offset | `html`, `.hm-section[id]` | | In-page links scroll smoothly; the section rule lands below the sticky header. |
| Skip link | `hm-skip-link` | (layout) | Skip to content. |
| Hero | `hm-hero`, `hm-hero-who`, `hm-hero-name` | (page) | The UI kit's inline hero values. With no role line, the statement takes the role line's 40px offset, and as a sentence it runs the width over two balanced lines instead of v2's 17ch. |
| Lead piece | `hm-stack`, `hm-figure-label`, `hm-follow` | (page) | A section's lead piece beside an `hm-figure`, as in the kit's Selected engineering. Its title is an `hm-h3`, below the section's h2, and its bullets are 16px. |
| Sublist | `hm-sublist` | (page) | A mono label over a second list inside a section. |
| Wide list split | `hm-split--4-8` | (page) | A narrow intro beside a timeline, as in the kit's Background. |
| Bullet label | `hm-bullets strong` | (page) | A lead-in label inside a bullet. |
| Compact rows | `hm-rows--compact` | `WorkRows` | Rows for long lists: 20px titles that wrap long repository names, 18px padding. |
| Static row | `hm-row--static`, `hm-row-summary-wrap` | `WorkRows` | A row without a link, for work with no public page; summaries align under the title. |
| Diagrams | `hm-diagram`, `hm-diagram-svg`, `hm-dg-*`, `hm-figure--diagram` | `DiagramFigure`, `DgNode`, `DgEdge`, `DgLabel`, `DgZone` | System diagrams drawn with the diagram-design method (Cathryn Lavery): every node earns its place, one accent for the focal path, orthogonal connectors, labels on masks, a 4px grid. Skinned to v2: Plex Sans names, Plex Mono labels, square corners, pearl boxes on the pearl-warm figure, cobalt only on one or two elements. Inline SVG with a title and description; it scales to its column, and on phones the figure gives it the width. |
| Reading width | `hm-measure` | (page) | Keeps a long list, such as the timeline, to 760px on the one left edge. |
| Two-column grid | `hm-systems--2`, `hm-system--wide`, `hm-system-split` | `SystemGrid`, `SystemCard` | A two-column system grid; a wide card spans the row with its story beside its evidence. |
| Static system card | `hm-system--static`, `hm-system-title` | `SystemCard` | A card that holds its own links, so it is not a link and does not fill on hover. |
| Evidence | `hm-evidence`, `hm-evidence-ref`, `hm-evidence-block` | `Evidence` | Pull requests as ruled rows after the contact list: what changed, then the mono reference. Stacks in a card column and on phones. |
| Shipped strip head | `hm-ship-label` | `ShipStrip` | Label and period in the strip head. |
| Header marks | `hm-social`, `hm-social-link`, `hm-social--github|linkedin|x|ax`, `hm-social-icon`, `hm-social-mark` | `SocialLinks` | The only icons: the Agent Experience AX monogram (official raster mark, never recoloured) and the GitHub, LinkedIn and X brand marks (Simple Icons paths, CC0), as 44px targets in the header. |
| Footer columns | `hm-footer-brand`, `hm-footer-col` | (site) | The UI kit's inline footer columns. |
| Document pages | `hm-document`, `hm-doc-page` | `DocumentPages` | The resume's page image on an `hm-figure`; the page header carries the download. |
