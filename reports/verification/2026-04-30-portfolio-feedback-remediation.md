# Portfolio feedback remediation verification

Date: 2026-04-30
Owner: Codex Ralph loop
Scope: `.omx/plans/portfolio-feedback-remediation-ralplan.md`

## Implementation coverage

- Hero proof panel no longer has the proof heading, and the four proof cards are equalized with metric context.
- Live System Pulse uses compact sanitized workflow wording while preserving representative trace safety.
- Homepage CTAs and principles use human labels instead of proof-theater labels.
- Featured case study now names the architecture preview as the system Himadri architected and shipped.
- Decision Theater CTA is explicit about opening Knit decision forks.
- Case study grid no longer gives Knit a special oversized card.
- Homepage labs now promote Debug This Agent and Cost Anatomy with payoff-focused labels.
- Challenge index keeps enabled routes but frames them as focused labs, not flagship proof claims.
- Debug This Agent hides correctness until a diagnosis is chosen, then shows selected answer, correct answer, why it matters, and production fix.
- Interview preview is chat-first; full Interview Me keeps chat before static answers.
- Live assistant UI reads as a chat interface and keeps assistant API payload shape unchanged.
- Hiring fit matrix became a human-readable Where I am useful section while preserving `#hiring-fit`.
- Resume page irrelevant web-contact note was removed.
- Highcharts opinion now frames generated analytics and artifact boundaries.

## Guardrail review

- `/api/interview` remains internal and server-gated through `ENABLE_INTERVIEW_ASSISTANT_API`.
- Live assistant UI remains gated by `NEXT_PUBLIC_ENABLE_INTERVIEW_ASSISTANT` and `routeIsEnabled("/api/interview")`.
- Gemini remains server-side through `GEMINI_API_KEY` and `ENABLE_GEMINI_ASSISTANT`.
- GA events remain coarse. Assistant events do not send question text.
- No package dependency changes were made.
- Authored public content avoids em dashes.

## Scoped deslop pass

Behavior lock:

- Full verification passed before the deslop review.
- Browser QA screenshots were refreshed after the final CSS adjustment.

Cleanup plan:

1. Dead code deletion: inspect changed components for stale imports, unused labels, and removed proof copy.
2. Duplicate removal: check repeated disclaimer and CTA patterns.
3. Naming and boundary cleanup: keep assistant route analytics accurate without changing event shape.
4. Test reinforcement: rerun format, typecheck, lint, content validators, route validators, confidentiality checks, build, route smoke, API tests, link checks, and audit.

Passes completed:

- Removed stale static Interview preview card rendering and unused interview question import.
- Consolidated live assistant analytics route through a prop so homepage usage reports `/` and Interview Me keeps `/interview-me`.
- Preserved existing assistant request payload and source-card response rendering.
- No new abstractions or dependencies were introduced.

## Browser QA evidence

Screenshots are saved under `reports/browser-qa/portfolio-feedback-remediation/` for:

- `/`
- `/interview-me`
- `/resume`
- `/principles`
- `/challenges`
- `/challenges/debug-this-agent`
- `/challenges/cost-anatomy`

Each route has desktop and mobile screenshots.

## Verification commands

Fresh commands to run before commit:

```bash
npm run format:check
npm run verify
npm audit --audit-level=moderate
rg -n "Resume verified|Inspect evidence|Inspect the evidence|Best for:|Proof in the first scroll|Diagnostic proof|Representative normalized model" src/app src/components src/content
rg -n "—" src/app src/components src/content
```
