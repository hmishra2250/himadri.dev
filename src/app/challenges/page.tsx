import type { Metadata } from "next";
import Link from "next/link";
import { challengePublicLabel } from "@/content/challenges";
import { routeIsEnabled } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Interactive Challenges",
  description:
    "Static production AI challenges for debugging and cost architecture review.",
};

const challenges = [
  {
    title: "Debug This Agent",
    href: "/challenges/debug-this-agent",
    phase: "V1.5 challenge",
    description:
      "Inspect a representative trace, identify the root cause, and compare the diagnosis with the production fix.",
  },
  {
    title: "Cost Anatomy",
    href: "/challenges/cost-anatomy",
    phase: "V1.5 challenge",
    description:
      "Toggle normalized cost models and see how routing, retries, sandbox reuse, and judge coverage change unit economics.",
  },
  {
    title: "DAG Execution Simulator",
    href: "/challenges/dag-execution-simulator",
    phase: "Deferred V2c gate",
    description:
      "Requires node edges, dependency state, user decisions, and browser QA before public exposure.",
  },
  {
    title: "Deck IR Previewer",
    href: "/challenges/deck-ir-previewer",
    phase: "Deferred V2c gate",
    description:
      "Requires schema validation, error states, inspection features, and synthetic labels before public exposure.",
  },
];

export default function ChallengesPage() {
  const enabledChallenges = challenges.filter((challenge) =>
    routeIsEnabled(challenge.href),
  );
  const deferredChallenges = challenges.filter(
    (challenge) => !routeIsEnabled(challenge.href),
  );

  return (
    <section className="section-pad">
      <div className="container narrow">
        <p className="eyebrow">Interactive challenges</p>
        <h1>Production AI judgment you can inspect</h1>
        <p className="hero-subtitle">
          V1.5 ships only static, sanitized challenges. They are designed to
          reveal debugging judgment and unit economics without using private
          data or live execution.
        </p>
        <p className="confidentiality-note">{challengePublicLabel}</p>
        <div className="challenge-grid">
          {enabledChallenges.map((challenge) => (
            <Link
              className="case-card"
              href={challenge.href}
              key={challenge.href}
            >
              <p className="eyebrow">{challenge.phase}</p>
              <h2>{challenge.title}</h2>
              <p>{challenge.description}</p>
              <span className="button secondary">Open challenge</span>
            </Link>
          ))}
        </div>
        {deferredChallenges.length > 0 ? (
          <section className="case-section" aria-labelledby="deferred-title">
            <p className="eyebrow">Phase-gated V2</p>
            <h2 id="deferred-title">
              Deferred until the simulator gate passes
            </h2>
            <div className="challenge-grid">
              {deferredChallenges.map((challenge) => (
                <article className="case-card" key={challenge.href}>
                  <p className="eyebrow">{challenge.phase}</p>
                  <h3>{challenge.title}</h3>
                  <p>{challenge.description}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
