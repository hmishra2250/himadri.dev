# PRD — Portfolio V2 Source-Grounded Assistant and Advanced Simulators

Status: draft for critic review
Date: 2026-04-30
Owner: future implementation agent/team

## Problem

V2 should prove that the portfolio can safely use AI itself: a source-grounded Interview Me assistant, retrieval evals, deeper debugging scenarios, DAG simulator, Deck IR previewer/editor, and optional hiring packet. The risk is that a live assistant or complex simulator can damage trust if it hallucinates, leaks private information, or feels underbuilt.

## Goals

1. Ship a source-grounded Interview Me assistant that answers only from approved portfolio content.
2. Establish retrieval and answer evals before public API exposure.
3. Expand interactive challenges only after static V1.5 proves the content model.
4. Demonstrate production AI architecture: retrieval, evals, guardrails, rate limits, privacy-safe logging, and source cards.
5. Keep advanced simulator dependencies isolated and lazy-loaded.

## Non-goals

- No assistant launch without eval/security pass.
- No user accounts.
- No storage of sensitive visitor messages by default.
- No private company docs, prompts, traces, decks, datasets, or code in corpus.
- No real code execution or real sandbox service.
- No paid model/vector/rate-limit/analytics provider launch without explicit approval.

## Personas

1. CTO/founder evaluating whether Himadri can build safe AI products.
2. Senior AI engineer evaluating retrieval/eval/guardrail discipline.
3. Recruiter/hiring manager asking role-fit questions with source-backed answers.

## Scope

### V2a — corpus and eval foundation

- Define assistant scope and disallowed topics.
- Build portfolio chunk corpus from approved public/sanitized content.
- Build 40-60 question eval dataset.
- Build retrieval and answer evaluation scripts.
- Keep `/api/interview` disabled.

### V2b — source-grounded assistant

- Implement `POST /api/interview` with validation, rate limiting, safe fallback, and no full-message logging by default.
- Retrieve from approved chunks only.
- Generate answer from retrieved context only.
- Return source cards and confidence.
- Add assistant UI integration with clear live/static distinction.

### V2c — advanced simulators and optional packet

- Multiple Debug This Agent scenarios.
- DAG Execution Simulator.
- Deck IR Previewer/editor.
- Optional downloadable hiring packet sourced only from already-public content.

## Functional requirements

### Assistant scope

Allowed topics:

- Resume-backed experience.
- Public/sanitized case studies.
- Production AI principles.
- Challenges and system-design explanations.
- Public GitHub/project summaries if added to corpus.
- Role fit and seniority questions answerable from sources.

Disallowed topics:

- Private company data, customer data, proprietary prompts, internal code, internal traces, private dashboards, internal datasets, private decks.
- Unrelated personal questions.
- Current availability beyond stated public status.
- Unsupported claims, invented metrics, or private implementation specifics.

### Corpus/chunks

Each chunk requires:

- stable ID.
- title.
- source type.
- URL/route.
- text.
- tags.
- priority.
- confidentiality level `public` or `sanitized`.

The corpus builder must reject private/disallowed content.

### Evaluation dataset

Each eval item requires:

- question.
- expected facts.
- forbidden claims.
- ideal sources.
- question type: answerable, unsupported, private, unrelated, prompt-injection, role-fit, weakness/risk.
- expected confidence/fallback behavior.

### Eval gate artifact

Before `/api/interview` can be enabled, eval scripts must write `reports/assistant-eval/latest.json` or the configured `ASSISTANT_EVAL_REPORT_PATH` with:

- `generatedAt`;
- `datasetSize`;
- `corpusHash`;
- `evalHash`;
- `thresholds`;
- `scores`;
- `passed`;
- `failures[]`.

Route validation must fail API enablement unless `passed === true`, `datasetSize >= 40`, and the report matches the current corpus/eval inputs.

### API constants

Before implementation, define and test:

- `ASSISTANT_FEATURE_FLAG = "NEXT_PUBLIC_ENABLE_INTERVIEW_ASSISTANT"`;
- `ASSISTANT_SERVER_ENABLE_FLAG = "ENABLE_INTERVIEW_ASSISTANT_API"`;
- `ASSISTANT_MAX_QUESTION_CHARS = 500`;
- `ASSISTANT_RATE_LIMIT_WINDOW_SECONDS = 60`;
- `ASSISTANT_RATE_LIMIT_MAX_REQUESTS = 10`;
- `ASSISTANT_EVAL_REPORT_PATH = "reports/assistant-eval/latest.json"`.

Execution may revise these only by updating this PRD and tests before enabling the API.

### API behavior

`POST /api/interview` request:

- JSON object with `question` string.
- Reject missing, non-string, empty, and over-length questions.
- Apply rate limit.
- Classify topic.
- Retrieve approved chunks.
- If insufficient context, return safe fallback.
- Generate response constrained to retrieved chunks.
- Return answer, source cards, and confidence.

Response shape:

- answer string.
- sources array with title, URL, snippet.
- confidence: `high`, `medium`, or `insufficient_context`.
- optional safety/fallback reason for insufficient-context responses.

### Security/privacy

- No full-message logging by default.
- No secrets in client bundle.
- Provider keys only server-side.
- Prompt injection attempts must not change allowed scope or source-card requirement.
- Rate limit failures return safe HTTP status/message.
- Errors fail closed, not with stack traces.

### Simulators

- DAG simulator uses mock/static workflow state and route-local lazy-loaded graph/editor code.
- Deck IR previewer uses public synthetic IR samples only.
- Optional editor must sanitize inputs and avoid arbitrary code execution.
- Hiring packet includes only public approved content and must not reveal contact info beyond approved surfaces.

## Provider decision framework

Execution may evaluate three approaches after V2a:

1. Static/local retrieval artifact.
2. Managed OpenAI file search/vector store.
3. Hosted DB/vector store such as Supabase pgvector or Vercel Postgres + pgvector.

Decision criteria:

- grounded-answer quality on evals.
- cost and rate-limit simplicity.
- operational complexity.
- privacy/logging posture.
- deployability on chosen host.

Any paid/external production launch requires explicit approval.

## Acceptance criteria

### V2a

1. Corpus builder accepts only public/sanitized sources.
2. Eval set contains 40-60 cases.
3. Retrieval eval passes thresholds: 90%+ ideal-source recall on answerable questions.
4. Answer eval dry run passes 100% forbidden-claim and unsupported/private fallback checks.
5. Eval report artifact is generated with required schema and `passed === true`.
6. `/api/interview` remains disabled and unlinked.

### V2b

1. `POST /api/interview` validates payload and max length.
2. Rate limit tests pass.
3. Assistant answers only from retrieved approved chunks.
4. 100% of non-fallback generated responses include at least one valid source card.
5. Unsupported/private/unrelated questions return insufficient context/safe fallback.
6. Prompt injection evals pass at 100%.
7. Forbidden claims pass at 100%.
8. No full-message logging is present by default.
9. Production build and route/link validation pass.
10. External provider approval is documented before launch if applicable.

### V2c

1. Multiple debug scenarios validate and render.
2. DAG simulator is lazy-loaded and accessible.
3. Deck IR preview/editor uses public static sample data only.
4. Optional hiring packet validates public-only content.
5. Homepage bundle/performance remains within V1 targets.

## Pre-mortem

1. Assistant invents facts: blocked by approved chunks, source-card requirement, forbidden-claim evals, and fallback.
2. Prompt injection succeeds: blocked by injection evals, disallowed-topic classification, and no private corpus content.
3. Endpoint abuse or sensitive logs: blocked by rate limits, max length, safe errors, and no full-message logging by default.

## Expanded test plan

- Unit: chunk schemas, constants, prompt-injection fixtures, source-card assembly.
- Integration: corpus -> retrieval -> answer eval; API route with mocked provider and rate limiter.
- E2E: assistant UI answerable/fallback/injection flows with deterministic adapter.
- Observability/privacy: aggregate counters only, no full-message logs, eval report archived.

## Rollout

1. Build V2a corpus/evals offline.
2. Review eval reports and provider decision.
3. Implement V2b API/UI behind gate.
4. Run security and eval gates.
5. Enable assistant publicly only after approval.
6. Implement V2c routes one at a time with lazy-load/performance checks.

## Open decisions

- Assistant model/provider.
- Retrieval storage approach.
- Rate-limit store.
- Analytics/error tracking provider and privacy posture.
- Whether hiring packet is static PDF/HTML or generated artifact.
