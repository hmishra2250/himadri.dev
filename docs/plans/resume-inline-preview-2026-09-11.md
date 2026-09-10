# Inline resume preview

Scope: refine the existing Resume route, not the portfolio design system.
Visitor job: read the actual current PDF on this page, then optionally save a copy.

- Replace the large download-led introduction with a compact heading and download action.
- Embed the canonical same-origin PDF using the browser's native viewer. No viewer dependency, conversion service, tracking vendor, or new client JavaScript.
- Keep a named viewer, visible download control, and a plain open-PDF fallback for browsers that do not support embedded PDFs.
- Use the existing container, colors, typography and responsive layout. Keep the document in the first viewport and allow native scrolling/zoom.
- Verify static rendering, canonical URL, download attribute, fallback, desktop/mobile layout and the deployed PDF checksum.
- Limitation: embedded PDF controls and mobile support vary by browser. Preserve fallback access rather than claiming identical rendering everywhere.

## Local verification
- Added a build regression asserting static `/resume`, the named iframe, canonical PDF source, a real `download` attribute, and visible fallback link. It failed against the old built page before implementation.
- Chromium desktop (1440x1100) and narrow (390x844): native PDF displayed in-page; no document overflow; download event returned the canonical filename.
- Headless-shell Chromium does not paint its PDF plugin; the visual check used full Chromium with the native viewer instead of treating a blank headless screenshot as success.
- The document viewer adds no dependency or client component. Its underlying PDF remains the same canonical asset used by the download link.
- Fresh `npm run verify`: PASS, including static inline-preview regression and all existing checks. `npm audit --audit-level=moderate`: zero vulnerabilities.
- Updated PDF SHA-256: `c6e334c996d55689cdcc6771eb99a11576815a57e6aaf51a369ac1cd02f3d8f5`. Only the two role-title labels changed; dates and work descriptions are retained.
