import type { Metadata } from "next";
import Link from "next/link";
import { challengePublicLabel } from "@/content/challenges";

export const metadata: Metadata = {
  title: "Interactive Challenges",
  description:
    "Static production AI challenges for debugging and cost architecture review.",
};

const challenges = [
  {
    title: "Debug This Agent",
    href: "/challenges/debug-this-agent",
    description:
      "Inspect a representative trace, identify the root cause, and compare the diagnosis with the production fix.",
  },
  {
    title: "Cost Anatomy",
    href: "/challenges/cost-anatomy",
    description:
      "Toggle normalized cost models and see how routing, retries, sandbox reuse, and judge coverage change unit economics.",
  },
];

export default function ChallengesPage() {
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
          {challenges.map((challenge) => (
            <Link
              className="case-card"
              href={challenge.href}
              key={challenge.href}
            >
              <p className="eyebrow">V1.5 challenge</p>
              <h2>{challenge.title}</h2>
              <p>{challenge.description}</p>
              <span className="button secondary">Open challenge</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
