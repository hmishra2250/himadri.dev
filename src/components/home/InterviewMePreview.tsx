import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { interviewQuestions } from "@/content/interview";
import { routeIsEnabled } from "@/lib/routes";

export function InterviewMePreview() {
  if (!routeIsEnabled("/interview-me")) return null;

  return (
    <section className="section-pad" aria-labelledby="interview-preview-title">
      <div className="container">
        <SectionHeader
          eyebrow="Interview me"
          title="Ask the questions a senior AI screen would ask."
          titleId="interview-preview-title"
          description="Every answer cites evidence, so a screen can move from claims to proof quickly."
        />
        <div className="challenge-grid">
          {interviewQuestions.slice(0, 2).map((question) => (
            <article className="case-card" key={question.id}>
              <p className="eyebrow">{question.category}</p>
              <h3>{question.question}</h3>
              <p>Best for: {question.recommendedAudience}</p>
            </article>
          ))}
        </div>
        <div className="card-footer-row">
          <Link className="button primary" href="/interview-me">
            Open Interview Me
          </Link>
        </div>
      </div>
    </section>
  );
}
