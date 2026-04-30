# Taste skill visual QA

Date: 2026-04-30
Scope: Homepage and public route responsive rendering after applying `taste-skill` frontend polish.
Server: local production server at `http://localhost:3105` after `npm run build` and `npm run start`.
Browser: Chromium headless through Chrome DevTools Protocol with explicit device metrics.

## Installed skills

The full `Leonxlnx/taste-skill` skill set is installed under `~/.codex/skills`:

- `brandkit`
- `brutalist-skill`
- `gpt-tasteskill`
- `image-to-code-skill`
- `imagegen-frontend-mobile`
- `imagegen-frontend-web`
- `minimalist-skill`
- `output-skill`
- `redesign-skill`
- `soft-skill`
- `stitch-skill`
- `taste-skill`

## Visual changes verified

- Swapped the app typography from Inter to Geist and Geist Mono through `next/font/google`.
- Tuned the global palette away from purple-blue glow toward a tighter cyan and mint system.
- Rebalanced hero typography, line height, and tracking for stronger editorial rhythm.
- Added a soft hero ambient layer, refined glass borders, and inner surface highlights.
- Converted hero proof metrics into an asymmetric bento layout instead of equal vertical boxes.
- Added tactile button active states and more deliberate transition curves.
- Reworked global grids to support asymmetric desktop layouts while collapsing cleanly on mobile.
- Fixed mobile navigation, hero headline wrapping, and CTA stacking at 375px.

## Rendering evidence

Screenshots:

- `after-home-desktop-cdp.png`, desktop first viewport.
- `after-home-mobile-cdp.png`, 375px mobile first viewport.
- `after-home-middle-desktop-cdp.png`, desktop scrolled homepage sections.
- `after-home-middle-mobile-cdp.png`, mobile scrolled homepage sections.

Metric checks are saved in `render-metrics.json`.

Checked routes:

- `/`
- `/contact`
- `/challenges`
- `/interview-me`

## Results

- 8 route and viewport checks passed.
- Mobile viewport width was explicitly set to 375px through CDP.
- `document.body.scrollWidth` matched `window.innerWidth` on checked mobile routes.
- No horizontal overflow offenders were found on checked desktop or mobile routes.
- No checked route exposed the scanned internal labels: `V1.5`, `V2 source-grounded`, `accepted simulator`, or `hardcoded Thinking`.

## Known limits

- This is local Chromium evidence, not a hosted deployment check.
- This pass did not use a third-party social preview or visual-diff service.
