import {
  answerInterviewQuestion,
  type InterviewResponse,
} from "@/lib/assistant/answer";
import { tryGenerateGeminiAnswer } from "@/lib/assistant/gemini";

export async function answerInterviewQuestionForApi(
  question: string,
): Promise<InterviewResponse> {
  const deterministic = answerInterviewQuestion(question);
  if (deterministic.confidence === "insufficient_context") return deterministic;
  return (
    (await tryGenerateGeminiAnswer(question, deterministic)) ?? deterministic
  );
}
