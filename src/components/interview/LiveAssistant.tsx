"use client";

import { useState } from "react";
import type { InterviewResponse } from "@/lib/assistant/answer";

const sampleQuestions = [
  "How does Himadri control LLM costs?",
  "Why not just use LangGraph for orchestration?",
  "What roles are the strongest fit?",
];

export function LiveAssistant() {
  const [question, setQuestion] = useState(sampleQuestions[0]);
  const [response, setResponse] = useState<InterviewResponse | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function askAssistant(nextQuestion = question) {
    setStatus("loading");
    setError("");
    setResponse(null);
    try {
      const result = await fetch("/api/interview", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: nextQuestion }),
      });
      const payload = (await result.json()) as
        | InterviewResponse
        | { error: string };
      if (!result.ok || "error" in payload) {
        throw new Error(
          "error" in payload ? payload.error : "Assistant request failed",
        );
      }
      setResponse(payload);
      setStatus("idle");
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Assistant request failed",
      );
      setStatus("error");
    }
  }

  return (
    <section className="case-section" aria-labelledby="live-assistant-heading">
      <p className="eyebrow">V2 source-grounded assistant</p>
      <h2 id="live-assistant-heading">Ask the approved portfolio corpus</h2>
      <p className="muted">
        This live mode uses deterministic retrieval over approved public and
        sanitized chunks. It returns source cards and falls back when context is
        insufficient.
      </p>
      <div className="assistant-box">
        <label htmlFor="assistant-question">Question</label>
        <textarea
          id="assistant-question"
          maxLength={500}
          onChange={(event) => setQuestion(event.target.value)}
          rows={4}
          value={question}
        />
        <div className="card-footer-row">
          <button
            className="button primary"
            disabled={status === "loading"}
            onClick={() => void askAssistant()}
            type="button"
          >
            {status === "loading" ? "Answering" : "Ask assistant"}
          </button>
          {sampleQuestions.map((sample) => (
            <button
              className="button secondary"
              key={sample}
              onClick={() => {
                setQuestion(sample);
                void askAssistant(sample);
              }}
              type="button"
            >
              {sample}
            </button>
          ))}
        </div>
        {status === "error" ? (
          <p className="confidentiality-note">{error}</p>
        ) : null}
        {response ? (
          <div className="assistant-response" aria-live="polite">
            <p className="eyebrow">Confidence: {response.confidence}</p>
            <pre>{response.answer}</pre>
            <div className="source-card-grid">
              {response.sources.map((source) => (
                <a
                  className="source-card"
                  href={source.url}
                  key={`${source.url}-${source.title}`}
                >
                  <strong>{source.title}</strong>
                  <p>{source.snippet}</p>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
