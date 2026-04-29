import { NextResponse } from "next/server";
import {
  ASSISTANT_MAX_QUESTION_CHARS,
  assistantApiEnabled,
} from "@/lib/assistant/config";
import { answerInterviewQuestion } from "@/lib/assistant/answer";
import { checkRateLimit } from "@/lib/assistant/rate-limit";

export async function POST(request: Request) {
  if (!assistantApiEnabled()) {
    return NextResponse.json(
      { error: "Interview assistant is disabled." },
      { status: 404 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "anonymous";
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many interview requests. Please try again later." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  if (!payload || typeof payload !== "object" || !("question" in payload)) {
    return NextResponse.json({ error: "Missing question." }, { status: 400 });
  }

  const question = (payload as { question: unknown }).question;
  if (typeof question !== "string") {
    return NextResponse.json(
      { error: "Question must be a string." },
      { status: 400 },
    );
  }

  const trimmed = question.trim();
  if (!trimmed) {
    return NextResponse.json(
      { error: "Question cannot be empty." },
      { status: 400 },
    );
  }
  if (trimmed.length > ASSISTANT_MAX_QUESTION_CHARS) {
    return NextResponse.json(
      { error: "Question is too long." },
      { status: 400 },
    );
  }

  const response = answerInterviewQuestion(trimmed);
  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "no-store",
      "X-Assistant-Sources": String(response.sources.length),
    },
  });
}
