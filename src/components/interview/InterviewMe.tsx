import Link from "next/link";
import { LiveAssistant } from "@/components/interview/LiveAssistant";
import {
  answerById,
  interviewCategories,
  interviewQuestions,
} from "@/content/interview";
import { routeIsEnabled } from "@/lib/routes";

export function InterviewMe() {
  const liveAssistantEnabled =
    process.env.NEXT_PUBLIC_ENABLE_INTERVIEW_ASSISTANT === "1" &&
    routeIsEnabled("/api/interview");

  return (
    <section className="section-pad">
      <div className="container narrow">
        <p className="eyebrow">Interview me</p>
        <h1>Hard production AI questions, answered with sources</h1>
        <p className="hero-subtitle">
          Static curated answers for architecture reviews, technical interviews,
          role-fit screens, and senior AI platform conversations.
        </p>
        {liveAssistantEnabled ? <LiveAssistant /> : null}
        <div className="interview-grid">
          {interviewQuestions.map((question) => {
            const answer = answerById(question.answerId);
            return (
              <article className="evidence-card" key={question.id}>
                <p className="eyebrow">
                  {interviewCategories[question.category]}
                </p>
                <h2>{question.question}</h2>
                <p className="muted">
                  Best for: {question.recommendedAudience}
                </p>
                <p>{answer.summary}</p>
                <ul className="check-list">
                  {answer.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="source-card-grid">
                  {answer.sourceCards.map((source) => (
                    <div className="source-card" key={source.title}>
                      <Link href={source.href}>{source.title}</Link>
                      <p>{source.snippet}</p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
        <p className="confidentiality-note">
          Static curated answers stay available alongside the optional live
          assistant. Both rely on approved public or sanitized evidence.
        </p>
      </div>
    </section>
  );
}
