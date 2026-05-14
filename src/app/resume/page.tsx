import type { Metadata } from "next";
import { Download, Mail } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { metrics } from "@/content/metrics";
import { profile } from "@/content/profile";
import { TrackedAnchor } from "@/components/ui/TrackedLink";

export const metadata: Metadata = buildPageMetadata("/resume");

export default function ResumePage() {
  return (
    <>
      <RouteJsonLd path="/resume" />
      <section className="section-pad">
        <div className="container narrow">
          <p className="eyebrow">Resume</p>
          <h1 className="display-serif">Conventional artifact, <em>evidence-first</em> summary.</h1>
          <p className="hero-subtitle">
            The downloadable PDF is the source of truth for employment history,
            dates, public metrics, skills, awards, and education.
          </p>
          <div className="hero-actions">
            <TrackedAnchor
              className="button primary"
              href={profile.resumePath}
              eventName="resume_download_clicked"
              eventParams={{ source_section: "resume_page" }}
            >
              Download latest resume PDF
              <Download className="icon icon-md" />
            </TrackedAnchor>
            <TrackedAnchor
              className="button secondary"
              href={`mailto:${profile.email}`}
              eventName="contact_cta_clicked"
              eventParams={{ source_section: "resume_page" }}
            >
              Email Himadri
              <Mail className="icon icon-md" />
            </TrackedAnchor>
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
    </>
  );
}
