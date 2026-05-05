import { NextResponse } from "next/server";
import {
  ASSISTANT_MAX_QUESTION_CHARS,
  assistantApiEnabled,
} from "@/lib/assistant/config";
import { answerInterviewQuestionForApi } from "@/lib/assistant/api-answer";
import { checkRateLimit } from "@/lib/assistant/rate-limit";

const apiResponseHeaders = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

function interviewJsonResponse(
  body: unknown,
  init?: { status?: number; headers?: Record<string, string> },
) {
  return NextResponse.json(body, {
    status: init?.status,
    headers: {
      ...apiResponseHeaders,
      ...init?.headers,
    },
  });
}

export async function POST(request: Request) {
  if (!assistantApiEnabled()) {
    return interviewJsonResponse(
      { error: "Interview assistant is disabled." },
      { status: 404 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "anonymous";
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return interviewJsonResponse(
      { error: "Too many interview requests. Please try again later." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return interviewJsonResponse(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  if (!payload || typeof payload !== "object" || !("question" in payload)) {
    return interviewJsonResponse(
      { error: "Missing question." },
      { status: 400 },
    );
  }

  const question = (payload as { question: unknown }).question;
  if (typeof question !== "string") {
    return interviewJsonResponse(
      { error: "Question must be a string." },
      { status: 400 },
    );
  }

  const trimmed = question.trim();
  if (!trimmed) {
    return interviewJsonResponse(
      { error: "Question cannot be empty." },
      { status: 400 },
    );
  }
  if (trimmed.length > ASSISTANT_MAX_QUESTION_CHARS) {
    return interviewJsonResponse(
      { error: "Question is too long." },
      { status: 400 },
    );
  }

  const response = await answerInterviewQuestionForApi(trimmed);
  return interviewJsonResponse(response, {
    headers: {
      "X-Assistant-Sources": String(response.sources.length),
    },
  });
}
