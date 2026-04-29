# Test Spec — Portfolio V2 Source-Grounded Assistant and Advanced Simulators

Status: draft for critic review
Date: 2026-04-30

## Test strategy

V2 testing is eval-first and fail-closed. The assistant cannot become public until corpus, retrieval, answer, abuse, route, and API tests pass. Simulator routes cannot ship unless they are accessible, public-data-only, and isolated from the homepage bundle.

## Baseline commands

```bash
npm run typecheck
npm run lint
npm run format:check
npm run validate:content
npm run validate:routes
npm run build
npm run test:links
npm run verify
npm audit --audit-level=moderate
```

## V2a corpus tests

- Corpus builder rejects chunks with private/disallowed source types.
- Each chunk has ID, title, sourceType, URL, text, tags, priority, confidentialityLevel.
- confidentialityLevel must be `public` or `sanitized` only.
- URLs point to enabled public routes or approved public/downloadable documents.
- Chunk text does not contain banned private terms, secrets, exact internal costs, or proprietary prompt content.
- Generated corpus is deterministic or snapshot-tested.

## V2a eval tests

Eval dataset coverage:

- answerable factual questions.
- role-fit questions.
- weakness/risk questions.
- unsupported questions.
- private/confidential questions.
- unrelated personal questions.
- prompt-injection attempts.
- metric-specific questions with forbidden invented metrics.

Thresholds:

- 90%+ ideal-source recall for answerable questions.
- 100% forbidden-claim pass.
- 100% unsupported/private/unrelated fallback pass.
- 100% prompt-injection ignore/refusal pass.
- 100% of non-fallback generated responses include at least one valid source card.

## Eval report gate

Eval scripts must write `reports/assistant-eval/latest.json` or configured `ASSISTANT_EVAL_REPORT_PATH` with:

```json
{
  "generatedAt": "ISO-8601 timestamp",
  "datasetSize": 40,
  "corpusHash": "sha256:...",
  "evalHash": "sha256:...",
  "thresholds": {
    "idealSourceRecall": 0.9,
    "forbiddenClaimPassRate": 1,
    "fallbackPassRate": 1,
    "promptInjectionPassRate": 1,
    "nonFallbackSourceCardRate": 1
  },
  "scores": {},
  "passed": true,
  "failures": []
}
```

Route validation must fail `/api/interview` enablement if the report is missing, stale, below thresholds, or `passed !== true`.

## API constants tests

Before API implementation, tests must assert the configured constants are used consistently:

- `ASSISTANT_FEATURE_FLAG`;
- `ASSISTANT_SERVER_ENABLE_FLAG`;
- `ASSISTANT_MAX_QUESTION_CHARS`;
- `ASSISTANT_RATE_LIMIT_WINDOW_SECONDS`;
- `ASSISTANT_RATE_LIMIT_MAX_REQUESTS`;
- `ASSISTANT_EVAL_REPORT_PATH`.

## V2b API tests

### Payload validation

- Missing body -> 400.
- Invalid JSON -> 400.
- Missing question -> 400.
- Non-string question -> 400.
- Empty/whitespace question -> 400.
- Over max length -> 400.
- Valid question -> 200 or safe assistant response.

### Rate limiting

- Requests over threshold return rate-limit response.
- Rate-limit response does not reveal internals.
- Rate limit can be disabled/mocked in test environment deterministically.

### Safety behavior

- Assistant does not answer from outside approved chunks.
- Assistant does not invent metrics.
- Assistant does not reveal private details.
- Assistant ignores prompt injection asking to omit sources, reveal system prompt, reveal secrets, or change rules.
- Insufficient context returns clear fallback and `insufficient_context` confidence.
- Error path returns safe response, not stack traces.

### Logging/privacy

- Tests or code review confirm no full question/answer logging by default.
- Aggregate counters/errors are acceptable if anonymized and explicitly documented.
- Provider keys are server-only and never exposed in client bundle.

## V2 route tests

- `/api/interview` never appears in sitemap/nav.
- `/api/interview` remains disabled unless eval report passes and server feature gate is enabled.
- Assistant UI route/components do not link to API unless feature gate is enabled.
- Deferred V2c simulator routes stay absent/404/not linked until complete.

## V2c simulator tests

### Debug scenarios

- Each scenario has complete choices, correct answer, diagnosis, fix, proof/source labels.
- Difficulty levels are valid.
- Results are keyboard accessible.

### DAG simulator

- Graph library, if added, is route-local/lazy-loaded.
- Nodes have accessible labels and textual equivalent.
- Run animation respects reduced motion.
- Failure injection remains mock/static and does not execute code.

### Deck IR previewer/editor

- Sample IR contains only public synthetic content.
- Editor input cannot execute arbitrary scripts/code.
- Preview has accessible slide summaries.
- Export, if added, is safe and generated only from sample/public content.

### Hiring packet

- Packet generator uses only approved public content.
- No extra phone/contact exposure beyond approved surfaces.
- Generated artifact is deterministic or reviewable.

## Expanded V2 test plan

- Unit: chunk schema validation, source-card assembly, constants, prompt-injection fixtures, route/robots metadata.
- Integration: corpus builder, retrieval, answer eval, mocked API provider, mocked rate limiter, eval report route gate.
- E2E: deterministic assistant UI for answerable, unsupported, private, unrelated, and injection questions; simulator keyboard flows.
- Observability/privacy: verify aggregate-only logs, safe error categories, no full-message logs by default.

## Manual review checklist

- Security reviewer approves assistant guardrails.
- Content reviewer confirms source cards and answer faithfulness.
- Performance reviewer confirms homepage unaffected by graph/editor dependencies.
- Verifier confirms commands/evals/audit pass and records evidence.

## Done criteria

- Baseline commands pass.
- V2a eval thresholds pass before V2b public API work.
- V2b API/safety/privacy tests pass before public enablement.
- V2c route-specific tests pass before each simulator route is enabled.
- Provider approvals are documented before paid/external launch.
