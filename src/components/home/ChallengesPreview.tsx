import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { routeIsEnabled } from "@/lib/routes";

const challengePreviews = [
  {
    title: "Debug This Agent",
    href: "/challenges/debug-this-agent",
    description:
      "Follow trace clues, choose the root cause, then see the diagnosis and production fix.",
    payoff: "Trace clue to fix",
  },
  {
    title: "Cost Anatomy",
    href: "/challenges/cost-anatomy",
    description:
      "Compare workflow designs and see how routing, retries, sandbox reuse, and judges move cost units.",
    payoff: "Architecture to unit economics",
  },
];

export function ChallengesPreview() {
  if (!routeIsEnabled("/challenges")) return null;

  return (
    <section
      className="section-pad alt"
      aria-labelledby="challenges-preview-title"
    >
      <div className="container">
        <SectionHeader
          eyebrow="Interactive lab"
          title="Fast labs that reward production AI judgment."
          titleId="challenges-preview-title"
          description="Each lab gives you a visible artifact: a diagnosis, a cost shift, or a recovery decision."
        />
        <div className="challenge-grid">
          {challengePreviews
            .filter((challenge) => routeIsEnabled(challenge.href))
            .map((challenge) => (
              <Link
                className="case-card"
                href={challenge.href}
                key={challenge.href}
              >
                <p className="eyebrow">{challenge.payoff}</p>
                <h3>{challenge.title}</h3>
                <p>{challenge.description}</p>
                <span className="button secondary">Try the lab</span>
              </Link>
            ))}
        </div>
        <div className="card-footer-row">
          <Link className="button ghost" href="/challenges">
            View all enabled challenges
          </Link>
        </div>
      </div>
    </section>
  );
}
