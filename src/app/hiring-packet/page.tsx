import type { Metadata } from "next";
import { assertRouteEnabled } from "@/lib/route-guards";
import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { metrics } from "@/content/metrics";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Hiring Packet",
  description:
    "A public-only summary packet for senior AI engineering and AI platform interviews.",
};

const routePath = "/hiring-packet";

export default function HiringPacketPage() {
  assertRouteEnabled(routePath);
  return (
    <section className="section-pad">
      <div className="container narrow">
        <p className="eyebrow">Hiring packet</p>
        <h1>{profile.name}: senior AI engineering signal packet</h1>
        <p className="hero-subtitle">
          A public-only summary assembled from resume-backed metrics, sanitized
          case studies, and approved portfolio content.
        </p>
        <div className="metric-list">
          {metrics.slice(0, 6).map((metric) => (
            <strong key={metric.id}>
              {metric.value} {metric.label}
            </strong>
          ))}
        </div>
        <section className="case-section">
          <h2>Best-fit roles</h2>
          <ul className="check-list">
            <li>Senior AI Engineer</li>
            <li>AI Platform Engineer</li>
            <li>LLM Systems Architect</li>
            <li>Founding AI Engineer at serious AI startups</li>
          </ul>
        </section>
        <section className="case-section">
          <h2>Evidence routes</h2>
          <div className="case-grid">
            {caseStudies
              .filter((study) => study.routeEnabled)
              .map((study) => (
                <Link
                  className="case-card"
                  href={`/case-studies/${study.slug}`}
                  key={study.slug}
                >
                  <p className="eyebrow">Case study</p>
                  <h3>{study.title}</h3>
                  <p>{study.summary}</p>
                </Link>
              ))}
          </div>
        </section>
        <p className="confidentiality-note">
          This packet uses only already-public portfolio content. It excludes
          private customer data, internal traces, proprietary prompts, and exact
          internal cost figures.
        </p>
      </div>
    </section>
  );
}
