# About page overlap repair

## Reproduction and cause

Live Safari at a 1280 by 900 window showed overlapping headings and paragraphs in the final three About principles. The shared `.principle-record` rule uses `minmax(0, 1fr) auto`. Long paragraph content took the auto track width and squeezed the heading track until heading text painted outside it.

## Change

Added an About-only single-column override in `src/styles/editorial.css`, with start alignment and an 8px heading-to-paragraph gap. Public copy, tokens, navigation and other routes are unchanged.

## Verification

- Added a source regression that failed before the CSS repair and passed afterward.
- Added a served-CSS contract for the About-only layout.
- `npm run verify`: passed.
- `npm audit --audit-level=moderate`: zero vulnerabilities.
- Local production HTTP checks: passed for six public routes.
- Safari bottom-of-page visual checks at 1280 by 900 and 500 by 900: all three principle headings and paragraphs readable without overlap; footer remains separate.
- Local screenshots retained under `.omx/research/about-overlap/`.
- Impeccable detector reported one existing Work-card border warning, outside this change. No new detector findings were introduced.

## Limits

The narrow check uses desktop Safari, not a physical phone. The CSS regression guards the identified cause; screenshots provide the rendered overlap check. Safari automation permissions were not changed.
