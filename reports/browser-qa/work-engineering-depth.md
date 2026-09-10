# Work cards: engineering depth

Date: 2026-09-11

## Changes

The six agent-experience cards now explain the design idea and implementation on the left, with qualitative impact and evaluation methods on the right. Numeric displays were removed from these cards. Approved metric records remain in the evidence registry, with their ownership and provenance checks intact.

The cards cover harness infrastructure, executable capability states, state-matched router cards, production MCP authorization, discovery and retrieval measurement, and recoverable insight reporting. Shared privacy labels and individual scope limits remain visible. No new client components, dependencies or routes were added.

## Verification

- `npm run verify` passed, including typecheck, lint, format, privacy, provenance, content, routes, SEO, confidentiality, structured data, assistant corpus/evals, build, links, route smoke and API checks.
- `npm audit --audit-level=moderate` reported zero vulnerabilities.
- Local production HTTP checks passed for all public routes and retired-route redirects. Tests verify the new impact and measurement text is in served HTML and numeric panels are absent.
- A separate read-only content review found no unsupported claims or scope regressions.
- Safari was inspected at desktop and narrow window widths. The desktop card keeps implementation and evaluation aligned; the narrow layout stacks them in reading order without text clipping. Fresh preview URLs prevented stale documents from hash-only navigation.
- Home and Work remain statically prerendered. No em dashes were introduced.

Screenshots were inspected locally, not published as site assets. Narrow-window review is not exact phone-device emulation. No engagement or conversion improvement is claimed for this design change.
