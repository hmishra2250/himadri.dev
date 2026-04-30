import Link from "next/link";
import { LiveAssistant } from "@/components/interview/LiveAssistant";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { routeIsEnabled } from "@/lib/routes";

export function InterviewMePreview() {
  if (!routeIsEnabled("/interview-me")) return null;
  const liveAssistantEnabled =
    process.env.NEXT_PUBLIC_ENABLE_INTERVIEW_ASSISTANT === "1" &&
    routeIsEnabled("/api/interview");

  return (
    <section className="section-pad" aria-labelledby="interview-preview-title">
      <div className="container">
        <SectionHeader
          eyebrow="Interview me"
          title="Ask the questions a senior AI screen would ask."
          titleId="interview-preview-title"
          description="Start with the live portfolio assistant, then open the full page for curated answers and sources."
        />
        <div className="interview-preview-chat">
          {liveAssistantEnabled ? (
            <LiveAssistant analyticsRoute="/" compact />
          ) : (
            <article className="assistant-box chat-shell">
              <p className="eyebrow">Portfolio chat</p>
              <div className="chat-message user">
                What should I ask Himadri in a senior AI interview?
              </div>
              <div className="chat-message assistant">
                Ask about orchestration boundaries, evals, cost controls,
                artifact generation, and where the system fails under pressure.
              </div>
            </article>
          )}
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
