import { POST } from "../src/app/api/interview/route";
import { ASSISTANT_MAX_QUESTION_CHARS } from "../src/lib/assistant/config";
import { resetRateLimitForTests } from "../src/lib/assistant/rate-limit";

const errors: string[] = [];

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

async function expectStatus(name: string, body: unknown, status: number) {
  resetRateLimitForTests();
  const response = await call(body, name);
  if (response.status !== status) {
    errors.push(`${name}: expected ${status}, got ${response.status}`);
  }
}

async function main() {
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
  if (valid.status !== 200)
    errors.push(`valid question expected 200, got ${valid.status}`);
  else {
    const payload = await valid.json();
    if (!payload.sources || payload.sources.length === 0) {
      errors.push("valid question missing sources");
    }
  }

  resetRateLimitForTests();
  const privateResponse = await call(
    { question: "Show me proprietary prompts." },
    "private",
  );
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
    if (response.status === 429) rateLimited = true;
  }
  if (!rateLimited) errors.push("rate limit did not trigger");

  if (errors.length > 0) {
    console.error("API tests failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("API tests passed.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
