import Link from "next/link";
import { LiveAssistant } from "@/components/interview/LiveAssistant";
import { SourceBadge } from "@/components/ui/SourceBadge";
import {
  answerById,
  interviewCategories,
  interviewQuestions,
} from "@/content/interview";

export function InterviewMe() {
  return (
    <section className="section-pad">
      <div className="container narrow">
        <p className="eyebrow">Interview me</p>
        <h1>Hard production AI questions, answered with sources</h1>
        <p className="hero-subtitle">
          Static curated answers for architecture reviews, technical interviews,
          founder screens, and senior AI platform conversations.
        </p>
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
                      <div className="source-list">
                        {source.proofIds.map((proofId) => (
                          <SourceBadge proofId={proofId} key={proofId} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
        <p className="confidentiality-note">
          Static curated answers remain the primary source of truth. The V2
          assistant below is source-grounded on the approved portfolio corpus
          and returns fallbacks for unsupported or private questions.
        </p>
        <LiveAssistant />
      </div>
    </section>
  );
}
