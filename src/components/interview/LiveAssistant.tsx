"use client";

import { useState } from "react";
import type { InterviewResponse } from "@/lib/assistant/answer";
import { trackPortfolioEvent } from "@/lib/analytics";

const sampleQuestions = [
  "How does Himadri control LLM costs?",
  "Why not just use LangGraph for orchestration?",
  "What roles are the strongest fit?",
];

type LiveAssistantProps = {
  analyticsRoute?: string;
};

export function LiveAssistant({
  analyticsRoute = "/interview-me",
}: LiveAssistantProps = {}) {
  const [question, setQuestion] = useState(sampleQuestions[0]);
  const [response, setResponse] = useState<InterviewResponse | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function askAssistant(nextQuestion = question) {
    trackPortfolioEvent("assistant_question_submitted", {
      route: analyticsRoute,
      source_section: "live_assistant",
    });
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
      if (payload.confidence === "insufficient_context") {
        trackPortfolioEvent("assistant_fallback_returned", {
          route: analyticsRoute,
          source_section: "live_assistant",
        });
      }
      setStatus("idle");
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Assistant request failed",
      );
      setStatus("error");
    }
  }

  return (
    <section
      className="case-section live-assistant-section"
      aria-labelledby="live-assistant-heading"
    >
      <p className="eyebrow">Portfolio chat</p>
      <h2 id="live-assistant-heading">
        Ask the portfolio like an interview loop
      </h2>
      <p className="muted">
        Ask a hiring-style question and get a concise answer with links back to
        the relevant public portfolio pages.
      </p>
      <div className="assistant-box chat-shell">
        <div className="chat-message assistant">
          Ask about orchestration, evals, cost controls, infra rescue, or where
          the systems failed before they became reliable.
        </div>
        <label htmlFor="assistant-question">Your question</label>
        <textarea
          className="chat-composer"
          id="assistant-question"
          maxLength={500}
          onChange={(event) => setQuestion(event.target.value)}
          rows={4}
          value={question}
        />
        <div className="card-footer-row sample-chip-row">
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
              className="sample-chip"
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
            <pre className="chat-message assistant">{response.answer}</pre>
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
