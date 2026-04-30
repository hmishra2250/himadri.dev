export const ASSISTANT_FEATURE_FLAG = "NEXT_PUBLIC_ENABLE_INTERVIEW_ASSISTANT";
export const ASSISTANT_SERVER_ENABLE_FLAG = "ENABLE_INTERVIEW_ASSISTANT_API";
export const ASSISTANT_MAX_QUESTION_CHARS = 500;
export const ASSISTANT_RATE_LIMIT_WINDOW_SECONDS = 60;
export const ASSISTANT_RATE_LIMIT_MAX_REQUESTS = 10;
export const ASSISTANT_EVAL_REPORT_PATH = "reports/assistant-eval/latest.json";
export const ASSISTANT_CORPUS_PATH =
  "reports/assistant-corpus/portfolio-chunks.json";

export function assistantApiEnabled() {
  return process.env[ASSISTANT_SERVER_ENABLE_FLAG] === "1";
}

export const GEMINI_ASSISTANT_ENABLE_FLAG = "ENABLE_GEMINI_ASSISTANT";
export const GEMINI_API_KEY_ENV = "GEMINI_API_KEY";
export const GEMINI_MODEL_ENV = "GEMINI_MODEL";
export const GEMINI_MAX_OUTPUT_TOKENS_ENV = "GEMINI_MAX_OUTPUT_TOKENS";
export const GEMINI_TEMPERATURE_ENV = "GEMINI_TEMPERATURE";
export const GEMINI_DEFAULT_MODEL = "gemini-2.5-flash";

export function geminiAssistantEnabled() {
  return (
    process.env[GEMINI_ASSISTANT_ENABLE_FLAG] === "1" &&
    Boolean(process.env[GEMINI_API_KEY_ENV])
  );
}
