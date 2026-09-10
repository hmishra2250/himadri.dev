# Implemented work publication design

## Status

- Status: Evidence and publication constraints retained; page composition superseded by `curated-portfolio.md`
- Owner: portfolio content and proof lanes
- UI scope: No visual redesign, no new routes, no new dependencies
- Privacy posture: Anonymous recent professional work is allowed only as scoped public-safe summaries. Public personal project names and links are allowed.

## Goal

Publish richer implemented-work evidence without weakening the existing portfolio contract. The site should keep the approved three resume-backed recent-work columns intact, then make the newer implemented Agent Experience work primary on the homepage and Work index before additional shipped systems, public projects, and historical case studies.

## Page hierarchy

1. Hero with current positioning.
2. Existing three resume-backed work columns, unchanged.
3. Implemented Agent Experience work as the primary recent-work publication block.
4. Additional anonymized shipped systems and public projects.
5. Selected historical AI product case study and earlier ML or computer vision work.
6. About and Contact.

The homepage retains a compact historical AI product link inside the existing recent-work block; it does not displace the new engineering section. The Work index should mirror this priority so a reviewer arriving directly at `/case-studies` sees current implemented work before older case studies.

## Primary implemented-work cards

Use six restrained cards. Each card needs a status, summary, evidence callout where approved, scope limit, and public label.

1. Router studies completed
   - Frame as completed controlled studies of router cards, tool descriptions, and consented client instructions.
   - Evidence callout: observed joint routing plus completion moved from 76.3% to 83.9% in a controlled matched-pair experiment, across 118 matched task pairs and two clients.
   - Scope label: directional, not statistically conclusive, not conversion, and not a universal routing guarantee.

2. MCP auth and onboarding shipped
   - Frame as shipped onboarding work for interactive OAuth, headless API-key access, limited unauthenticated exploration, blocked reasons, and next actions.
   - Scope label: shipped system behavior, not proof of hosted-client parity or completed signup conversion.

3. Discovery and retrieval shipped
   - Frame as shipped discovery and retrieval work that separates being found, being retrieved, being cited, being recommended, and being usable.
   - Scope label: separate visibility, retrieval and use measures do not imply causal traffic or revenue lift.

4. Multi-harness AX implemented
   - Frame as implemented multi-harness Agent Experience evaluation across API, CLI, and MCP-style surfaces.
   - Evidence callout: six harness adapters were implemented for evaluation coverage.
   - Scope label: six adapters does not imply transport parity, equal task coverage, or equal hosted-client behavior.

5. Journey paths as executable state
   - Evidence callout: 79 mapped onboarding surfaces, including held and no-card paths, not 79 tested winners.
   - Frame as implemented recovery journeys expressed as explicit states and replayable fixtures.
   - Scope label: replayed states test reachable behavior and handoff quality, not whether a human completed authentication or a commercial outcome.

6. Evidence-grounded insight pipeline implemented
   - Frame as an implemented insight layer over discovery, retrieval, and journey evidence.
   - Evidence callout: daily shipped status and weekly recovery reporting may be referenced only as scoped delivery gates, not as raw report publication or recurring business impact.
   - Scope label: pipeline evidence supports inspectable product decisions, not unrestricted public reproducibility or disclosure of raw reports.

## Visual treatment

- Preserve the pearl background, graphite text, cobalt accent, Go Sans, Go Mono, hairline grid, and compact editorial rhythm defined in `DESIGN.md`.
- Use existing `work-grid`, `work-column`, `work-status`, `verification`, and `work-source` patterns.
- Keep evidence callouts small and restrained, closer to verification notes than marketing badges.
- Do not introduce decorative cards, dashboards, logos, gradients, or animated metrics.
- Do not change route structure or the existing resume-backed three-column work block.

## Methodology labels

- Shipped system: use when the user-approved publication boundary says the implementation shipped, while still hiding source organization, private repo, and internal operational detail.
- Controlled experiment: use for matched-pair, replay, or harness-based findings. Include fixtures, clients, and exclusions only at the approved aggregate level.
- Delivery gate: use for daily shipped or weekly recovery labels when they describe process status, not public business impact.
- Public project: use only for public personal project names, URLs, and repositories that are already intended for public inspection.

## Privacy and proof constraints

Do not publish source companies, current-client identities, private repo names, private repo paths, private source paths, raw reports, raw traces, proprietary prompts, internal rubrics, exact costs, PR counts, customer data, private dashboards, private screenshots, or unapproved dates.

Allowed publication details for this work:

- Personal ownership and shipping, as confirmed by the user and supported by local code or history.
- Anonymous system and method summaries.
- Public personal project names and links.
- The scoped aggregate experiment callout: 76.3% to 83.9%, 118 matched task pairs, two clients, directional, not statistically conclusive, not conversion.
- The scoped inventory callout: 79 mapped surfaces, not 79 tested winners.
- The scoped harness callout: six harness adapters, not transport parity.
- Daily shipped and weekly recovery as delivery gates only.

## Acceptance checklist

- Existing three resume-backed work columns remain unchanged.
- Six implemented-work cards appear before additional shipped systems and public projects on Home and Work index.
- Every private or anonymous card shows status, scope, and publication label.
- Experiment, shipped-system, and delivery-gate labels are visibly distinct in copy.
- No unsupported conversion, parity, causal adoption, broad rollout, traffic, revenue, cost, or PR-count claims are introduced.
- Privacy and model/proof tests pass.
- Full repository verification passes before release.
- HTTP asset checks pass, including stylesheet, portrait, resume, and public project links where covered by existing scripts.
- Desktop and mobile visual checks are captured when browser QA is available.
- Git push is authorized, but no force push is allowed.

## Release verification

Verified on 2026-09-10:

- `npm run verify` passed, including typecheck, lint, privacy contracts, formatting, content and route validation, assistant corpus and evaluation, confidentiality, structured data, production build, links, route smoke and API tests.
- `npm audit --audit-level=moderate` reported zero vulnerabilities.
- `npm run test:design:http` passed against the local production build for all ten enabled public routes, served CSS, metric disclosures, original portrait and contact actions.
- Independent code review approved the publication changes without findings.
- Existing design preserved. Desktop/mobile screenshot QA was not completed because browser-connected automation was unavailable; HTTP rendering and asset checks are not a substitute for visual inspection.

## Delivered-system classification correction

The owner confirmed that working versions of all three additional systems have shipped. Present these as completed contributions under “Shipped systems”, with “Shipped working version” status on Home and Work. Remove earlier provisional deployment and integration blockers from public copy and update their proof note. Keep technical authority, attribution and privacy boundaries without implying a future completion obligation. Regression tests reject the old development-section framing and verify the new labels on rendered and served pages.
