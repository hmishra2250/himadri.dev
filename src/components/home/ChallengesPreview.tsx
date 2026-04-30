import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { routeIsEnabled } from "@/lib/routes";

const challengePreviews = [
  {
    title: "Debug This Agent",
    href: "/challenges/debug-this-agent",
    description:
      "Read a representative trace, diagnose the failure mode, and compare against the production fix.",
  },
  {
    title: "Cost Anatomy",
    href: "/challenges/cost-anatomy",
    description:
      "Toggle normalized AI workflow cost models and inspect which architecture choices change unit economics.",
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
          title="Small simulations of the production AI problems I solve."
          description="The live V1.5 challenges stay static and sanitized, but they force the visitor to inspect traces, cost tradeoffs, and failure modes instead of only reading claims."
        />
        <div className="challenge-grid" id="challenges-preview-title">
          {challengePreviews
            .filter((challenge) => routeIsEnabled(challenge.href))
            .map((challenge) => (
              <Link
                className="case-card"
                href={challenge.href}
                key={challenge.href}
              >
                <p className="eyebrow">Diagnostic proof</p>
                <h3>{challenge.title}</h3>
                <p>{challenge.description}</p>
                <span className="button secondary">Open challenge</span>
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
