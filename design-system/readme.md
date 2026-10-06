# himadri.dev Design System (v3)

The design system for **himadri.dev**, the site of Himadri Mishra, AI engineer. It lives in this repository and is the single source for the site's tokens, components and rules. It started as the claude.ai/design project "himadri.dev Design System" (v2, 5 October 2026) and was extended on 6 October 2026 while the site was rebuilt as one page.

**Concept: the engineering record.** The site reads like a well-set technical publication. Everything sits on one left edge inside a 1080px container. Each section is a framed panel with its number and label cut into the top edge, a sentence headline, then content that fills the width. Inside a panel, space and soft fills separate things, not lines. Everything is square, flat and fast.

## How the site uses it

- `src/styles/globals.css` imports the tokens (except `fonts.css`), `components/components.css` and `components/additions.css` from this folder. IBM Plex is loaded with `next/font` instead of the Google Fonts import.
- `src/components/ds/` holds typed React components that emit only the classes documented here: `Panel`, `Tile`, `NoteTile`, `Ledger`, `OneLiners`, `MetricTiles`, `WorkCards`, `Launches`, `Refs`, `DocumentPages`, `RefGroups`, `Years`, `Subhead`, `Button`, `ArrowLink`, `InlineLinks`, `SocialLinks`, `SocialIcon`.
- Build pages from those components. Add a new pattern here first (CSS in `components/additions.css`, a component in `src/components/ds/`, a line in this readme), then use it.

## Index

- `styles.css`: entry point (imports only)
- `tokens/`: `fonts.css` (Google Fonts import, for previews), `colors.css`, `typography.css`, `spacing.css`, `motion.css`, `base.css`
- `components/components.css`: the v2 `hm-*` classes
- `components/additions.css`: the v3 additions listed below
- `components/core|layout|identity|work/`: v2 reference components with types and usage notes (JSX for claude.ai/design previews)
- `guidelines/`: foundation cards
- `assets/`: portrait
- `SYNC.md`: what this folder holds, how it relates to claude.ai/design, and how to preview it
- `ui_kits/` is not committed: it shows the retired six-page site

## v3 additions

| Pattern | Classes | React | Use |
|---|---|---|---|
| Framed panel | `hm-panel-section`, `hm-panel`, `hm-panel-tab`, `hm-panel-head`, `hm-panel-titlebar` | `Panel` | Every top-level section. The tab carries the mono index and label and cuts into the top border. |
| Tile | `hm-tile`, `hm-meta` | `Tile` | A block inside a panel on a pearl-warm fill, with an h3 and a mono meta line. |
| Note tile | `hm-tile hm-note-tile` | `NoteTile` | A short provenance or scope note under a cobalt label. |
| Ledger | `hm-ledger`, `hm-ledger-*`, `hm-dot` | `Ledger` | A dated list of shipped work in a panel. The last row fades and a full-width primary button closes it, so it reads as a preview of the record. |
| One-liners | `hm-oneliners`, `hm-oneliner-name`, `hm-oneliner-meta` | `OneLiners` | One line per project with a mono meta note. Grows over time. A name without a link renders as text. |
| Metric tiles | `hm-metric-tiles`, `hm-metric-tile*`, `hm-refs`, `hm-ref` | `MetricTiles` | Outcome figures with what was measured and links to the work that delivered them. |
| Reference groups | `hm-groups`, `hm-group`, `hm-ref-list`, `hm-ref`, `hm-groups-intro` | `RefGroups` | Columns of pull requests or references: a plain line, then a mono reference link. |
| Years | `hm-years`, `hm-years-year`, `hm-years-name` | `Years` | Year and one-line rows. |
| Work cards | `hm-work-cards`, `hm-work-card`, `hm-work-card--wide`, `hm-work-card-body`, `hm-work-card-story`, `hm-work-card-label`, with `hm-bullets` and `hm-refs` | `WorkCards` | Work as cards on a pearl-warm fill. Only the title is set large; the story, the points (an optional bold lead-in label), figures and the evidence links stay at small body size. Wide cards span the row with the story beside the points, for the largest pieces of work; the rest sit two to a row. |
| Launches | `hm-launches` with `hm-tile`, `hm-launch-result*`, `hm-refs`, `hm-ref` | `Launches` | Shipped work as tiles: a title, the measured result when one exists (a cobalt mono before-and-after with its label), one line on what changed, and links to the evidence. |
| Refs | `hm-refs`, `hm-ref` | `Refs` | A wrapping row of mono evidence links, such as pull requests. |
| Subhead | `hm-label hm-label--ink hm-subhead` | `Subhead` | A mono label that introduces a list inside a panel. |
| Hero | `hm-hero`, `hm-hero-split`, `hm-hero-main`, `hm-hero-facts`, `hm-hero-portrait`, `hm-hero-who`, `hm-hero-name` | (page) | The first screen: identity, the statement as h1, the facts line and an action on the left; a `Ledger` on the right. It fills the first screen so the first panel starts after a scroll. |
| Social | `hm-social`, `hm-social-link`, `hm-social--github|linkedin|x`, `hm-social-icon`, `hm-footer-social` | `SocialLinks`, `SocialIcon` | GitHub, LinkedIn and X as brand marks: 44px square targets, accessible names, the channel colour fills on hover. |
| Footer band | `hm-footer-band` | (site) | The footer on a pearl-warm fill instead of a graphite rule. |
| Document pages | `hm-document`, `hm-doc-panel`, `hm-doc-page`, `hm-document-help` | `DocumentPages` | A document's pages as images in the page flow on a framed panel (no inner scroll), with a link to the selectable-text PDF. On /resume: the one-page resume, a primary download, and a quiet arrow link to the full CV. |
| Link | `hm-link` | `InlineLinks` | An underlined inline link inside running text. |

## Content fundamentals

- **First person, plain verbs.** Present tense for current work; past tense for shipped work.
- **Headlines are sentences ending in a period.** "What I work on.", "Agent Experience at Firecrawl." The page h1 is the site's statement; role words appear once, small, beside the name.
- **Sentence case everywhere.** Uppercase only in mono labels, via CSS.
- **One message per layer.** Do not repeat the statement or the facts line elsewhere on the page.
- **Proof is a link.** Prefer a public pull request, repository or page over a description. Describe private work by what it does; never add notes about the page itself ("private", "not public", "highlights").
- **Impact over volume.** Show what changed for users or agents, as a before-and-after percentage where a measurement exists, and link the evidence. Not everything needs a number: a system can be described by what it does and what it led to. Never lead with pull request, commit or fix counts. Figures stay at body size inside the text; never set a number in a large display size.
- **No em dashes, no emoji, no superlatives.** Unicode arrows are the only glyphs: → internal, ↗ external, ↓ in-page, ← back.

## Visual foundations

- **Color:** pearl `#f6f7f8` page, pearl-warm `#edeff1` tiles and fills, panel `#fbfbfc`, graphite `#14232c` ink, graphite-soft `#3d4d56` body, muted `#65737b` meta. Cobalt `#2855d8` for fills, nodes and the primary button, cobalt-dark `#1f43ae` for accent text. Status colours appear only as small square dots. Channel colours (GitHub `#24292f`, LinkedIn `#0a66c2`, X `#141414`) appear only on social links, on hover.
- **Type:** IBM Plex Sans (400, 500, 600, italic 400) and IBM Plex Mono (400, 500). Display and h1/h2 are 400 with tight tracking; h3/h4 and UI are 500. Body is 17px/1.6 at a 64ch measure. **Mono is for indices, labels, dates, status, provenance and tabular figures**, and nothing else.
- **Grid:** one 1080px container, fluid margins clamp(20px, 4vw, 48px), one left edge. Fill the width with `hm-split` (7:5 or even), three columns, or full rows. Collapse to one column under 860px.
- **Separation:** sections are framed panels (1px hairline-strong on all four sides) with the label cut into the top edge. Inside a panel, use space and pearl-warm tiles. Do not stack horizontal rules: the only rule on the page is under the sticky header.
- **Radii:** 0 everywhere. The portrait is 4px. The status dot is a 7px square.
- **Shadows and gradients:** none. Depth comes only from the panel and tile fills.
- **Hover:** secondary buttons invert to a graphite fill; primary goes cobalt to cobalt-dark; arrows nudge 3px; ledger rows fill pearl-warm and their text turns cobalt-dark; links underline.
- **Press:** buttons move down 1px. **Focus:** 2px cobalt outline, 3px offset.
- **Motion:** 140ms ease-inout for colour, 240ms ease-out for fills and arrows; in-page links scroll smoothly. No entrance animation. Reduced motion zeroes durations and scrolling.
- **Hit targets:** at least 44px.

## Iconography

No icon set. Affordances are unicode arrows inside `aria-hidden` spans, and bullets are a 10px cobalt dash drawn in CSS. The additions are the header marks in `src/components/ds/SocialLinks.tsx`: the Agent Experience AX monogram first (the official raster mark from agentexperience.tech, `public/images/agent-experience-mark.png`, shown at 28px, never recoloured, soft pearl-warm hover), then GitHub, LinkedIn and X inlined as SVG (Simple Icons paths, CC0). Add no other icons without updating this section.

## Brand mark

There is no logo. The header shows the name in Plex Sans 600 next to a mono role line. The favicon is "HM" in white Plex Sans 600 on a cobalt square.

## Fonts

`tokens/fonts.css` loads Plex from Google Fonts for standalone previews. The site loads the same families through `next/font` and points `--font-sans` and `--font-mono` at them.
