import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { routeIsEnabled } from "@/lib/routes";

export const metadata: Metadata = buildPageMetadata("/challenges");

const challenges = [
  {
    title: "Debug This Agent",
    href: "/challenges/debug-this-agent",
    phase: "Guided trace diagnosis",
    description:
      "Follow the span clues, choose a root cause, then compare your answer with the diagnosis and production fix.",
  },
  {
    title: "Cost Anatomy",
    href: "/challenges/cost-anatomy",
    phase: "Unit economics model",
    description:
      "Toggle designs and see how routing, retries, sandbox reuse, and judge coverage move cost units.",
  },
  {
    title: "DAG Execution Simulator",
    href: "/challenges/dag-execution-simulator",
    phase: "Workflow recovery simulator",
    description:
      "Step through dependency state, judge failure, recovery choices, and downstream readiness in a lightweight simulator.",
  },
  {
    title: "Deck IR Previewer",
    href: "/challenges/deck-ir-previewer",
    phase: "Deck artifact inspector",
    description:
      "Edit synthetic Deck IR, inspect validation errors, and switch between preview, outline, and speaker notes.",
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
          These labs are small by design: each one exposes a trace, cost model,
          recovery decision, or artifact boundary you can inspect quickly.
        </p>
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
            <p className="eyebrow">Future lab ideas</p>
            <h2 id="deferred-title">Held until the interaction earns trust</h2>
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
