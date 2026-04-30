import type { InterviewResponse } from "@/lib/assistant/answer";
import {
  GEMINI_API_KEY_ENV,
  GEMINI_DEFAULT_MODEL,
  GEMINI_MAX_OUTPUT_TOKENS_ENV,
  GEMINI_MODEL_ENV,
  GEMINI_TEMPERATURE_ENV,
  geminiAssistantEnabled,
} from "@/lib/assistant/config";

export async function tryGenerateGeminiAnswer(
  question: string,
  groundedResponse: InterviewResponse,
): Promise<InterviewResponse | null> {
  if (!geminiAssistantEnabled()) return null;
  if (groundedResponse.sources.length === 0) return null;

  const apiKey = process.env[GEMINI_API_KEY_ENV];
  if (!apiKey) return null;

  const model = process.env[GEMINI_MODEL_ENV] || GEMINI_DEFAULT_MODEL;
  const maxOutputTokens = Number(
    process.env[GEMINI_MAX_OUTPUT_TOKENS_ENV] || "768",
  );
  const temperature = Number(process.env[GEMINI_TEMPERATURE_ENV] || "0.2");
  const sourceContext = groundedResponse.sources
    .map(
      (source, index) =>
        `Source ${index + 1}: ${source.title}\nURL: ${source.url}\nSnippet: ${source.snippet}`,
    )
    .join("\n\n");

  const prompt = `You answer as Himadri Mishra's public portfolio assistant. Answer only from the approved public or sanitized sources below. Do not invent metrics. Do not mention private details. If the sources do not answer the question, say there is not enough approved portfolio context. Keep the answer concise and useful for a senior AI engineering interview.\n\nQuestion:\n${question}\n\nApproved sources:\n${sourceContext}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: Number.isFinite(maxOutputTokens)
              ? maxOutputTokens
              : 768,
            temperature: Number.isFinite(temperature) ? temperature : 0.2,
          },
        }),
      },
    );
    if (!response.ok) return null;
    const payload = (await response.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };
    const text = payload.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join("\n\n")
      .trim();
    if (!text) return null;
    return {
      ...groundedResponse,
      answer: text,
    };
  } catch {
    return null;
  }
}
