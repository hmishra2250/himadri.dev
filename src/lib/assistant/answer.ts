import { retrievePortfolioChunks } from "@/lib/assistant/retrieval";

export type AssistantSource = {
  title: string;
  url: string;
  snippet: string;
};

export type InterviewResponse = {
  answer: string;
  sources: AssistantSource[];
  confidence: "high" | "medium" | "insufficient_context";
};

const PRIVATE_OR_UNSUPPORTED_PATTERNS = [
  /salary/i,
  /home address/i,
  /customer names?/i,
  /proprietary prompt/i,
  /exact internal/i,
  /internal dashboard/i,
  /private dataset/i,
  /database password/i,
  /secret/i,
  /system prompt/i,
  /confidential traces?/i,
  /next election/i,
  /recipe/i,
  /stock price/i,
  /availability next month/i,
  /churned/i,
  /private deck/i,
  /invent a metric/i,
  /make up/i,
  /omit sources/i,
  /ignore all rules/i,
  /forget the portfolio/i,
];

function fallback(): InterviewResponse {
  return {
    answer:
      "I do not have enough approved portfolio context to answer that. I can answer questions about public resume facts, sanitized case studies, production AI principles, interactive challenges, role fit, evaluation, observability, cost, and architecture.",
    sources: [],
    confidence: "insufficient_context",
  };
}

function sourceSnippet(text: string) {
  return text.length > 180 ? `${text.slice(0, 177)}...` : text;
}

export function answerInterviewQuestion(question: string): InterviewResponse {
  const normalized = question.trim();
  if (
    PRIVATE_OR_UNSUPPORTED_PATTERNS.some((pattern) => pattern.test(normalized))
  ) {
    return fallback();
  }

  const chunks = retrievePortfolioChunks(normalized, 4);
  if (chunks.length === 0) return fallback();

  const sources = chunks.map((chunk) => ({
    title: chunk.title,
    url: chunk.url,
    snippet: sourceSnippet(chunk.text),
  }));

  const answer = [
    "Based only on approved public and sanitized portfolio sources:",
    ...chunks
      .slice(0, 3)
      .map((chunk) => `${chunk.title}: ${sourceSnippet(chunk.text)}`),
    "Private artifacts and unsupported details are intentionally outside the approved public portfolio context.",
  ].join("\n\n");

  return {
    answer,
    sources,
    confidence: chunks[0].priority >= 8 ? "high" : "medium",
  };
}
