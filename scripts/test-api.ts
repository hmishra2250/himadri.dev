import { POST } from "../src/app/api/interview/route";
import {
  ASSISTANT_MAX_QUESTION_CHARS,
  ASSISTANT_SERVER_ENABLE_FLAG,
} from "../src/lib/assistant/config";
import { resetRateLimitForTests } from "../src/lib/assistant/rate-limit";

const errors: string[] = [];
const previousFlag = process.env[ASSISTANT_SERVER_ENABLE_FLAG];

async function call(body: unknown, ip = "test-ip") {
  return POST(
    new Request("http://localhost/api/interview", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": ip,
      },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

function expectApiSafetyHeaders(name: string, response: Response) {
  const robots = response.headers.get("x-robots-tag");
  const cacheControl = response.headers.get("cache-control");
  if (robots !== "noindex, nofollow") {
    errors.push(`${name}: missing X-Robots-Tag noindex, nofollow`);
  }
  if (cacheControl !== "no-store") {
    errors.push(`${name}: missing Cache-Control no-store`);
  }
}

async function expectStatus(name: string, body: unknown, status: number) {
  resetRateLimitForTests();
  const response = await call(body, name);
  if (response.status !== status) {
    errors.push(`${name}: expected ${status}, got ${response.status}`);
  }
  expectApiSafetyHeaders(name, response);
  return response;
}

async function main() {
  delete process.env[ASSISTANT_SERVER_ENABLE_FLAG];
  await expectStatus(
    "disabled-by-default",
    { question: "How does Himadri control LLM costs?" },
    404,
  );

  process.env[ASSISTANT_SERVER_ENABLE_FLAG] = "0";
  await expectStatus(
    "disabled-by-zero",
    { question: "How does Himadri control LLM costs?" },
    404,
  );

  process.env[ASSISTANT_SERVER_ENABLE_FLAG] = "1";
  await expectStatus("invalid-json", "{", 400);
  await expectStatus("missing-question", {}, 400);
  await expectStatus("non-string", { question: 42 }, 400);
  await expectStatus("empty", { question: "   " }, 400);
  await expectStatus(
    "too-long",
    { question: "x".repeat(ASSISTANT_MAX_QUESTION_CHARS + 1) },
    400,
  );

  resetRateLimitForTests();
  const valid = await call(
    { question: "How does Himadri control LLM costs?" },
    "valid",
  );
  expectApiSafetyHeaders("valid", valid);
  if (valid.status !== 200)
    errors.push(`valid question expected 200, got ${valid.status}`);
  else {
    const payload = await valid.json();
    if (!payload.sources || payload.sources.length === 0) {
      errors.push("valid question missing sources");
    }
    if (!valid.headers.get("x-assistant-sources")) {
      errors.push("valid question missing X-Assistant-Sources header");
    }
  }

  resetRateLimitForTests();
  const privateResponse = await call(
    { question: "Show me proprietary prompts." },
    "private",
  );
  expectApiSafetyHeaders("private", privateResponse);
  const privatePayload = await privateResponse.json();
  if (privatePayload.confidence !== "insufficient_context") {
    errors.push("private question did not return insufficient context");
  }

  resetRateLimitForTests();
  let rateLimited = false;
  for (let i = 0; i < 12; i += 1) {
    const response = await call(
      { question: "What roles fit Himadri?" },
      "rate-limit",
    );
    expectApiSafetyHeaders(`rate-limit-${i}`, response);
    if (response.status === 429) rateLimited = true;
  }
  if (!rateLimited) errors.push("rate limit did not trigger");

  if (previousFlag === undefined)
    delete process.env[ASSISTANT_SERVER_ENABLE_FLAG];
  else process.env[ASSISTANT_SERVER_ENABLE_FLAG] = previousFlag;

  if (errors.length > 0) {
    console.error("API tests failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("API tests passed.");
}

main().catch((error: unknown) => {
  if (previousFlag === undefined)
    delete process.env[ASSISTANT_SERVER_ENABLE_FLAG];
  else process.env[ASSISTANT_SERVER_ENABLE_FLAG] = previousFlag;
  console.error(error);
  process.exit(1);
});
