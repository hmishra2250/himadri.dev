import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { metrics } from "@/content/metrics";
import { profile } from "@/content/profile";

export const metadata: Metadata = buildPageMetadata("/resume");

export default function ResumePage() {
  return (
    <section className="section-pad">
      <div className="container narrow">
        <p className="eyebrow">Resume</p>
        <h1>Conventional artifact, evidence-first summary.</h1>
        <p className="hero-subtitle">
          The downloadable PDF is the source of truth for employment history,
          dates, public metrics, skills, awards, and education.
        </p>
        <div className="hero-actions">
          <a className="button primary" href={profile.resumePath}>
            Download latest resume PDF
          </a>
          <a className="button secondary" href={`mailto:${profile.email}`}>
            Email Himadri
          </a>
        </div>
        <div className="metric-grid resume-metrics">
          {metrics.slice(0, 6).map((metric) => (
            <article className="metric-card" key={metric.id}>
              <div className="metric-value">{metric.value}</div>
              <h2>{metric.label}</h2>
              <p>{metric.context}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
