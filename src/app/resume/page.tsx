import type { Metadata } from "next";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import { practice } from "@/content/practice";
import { profile } from "@/content/profile";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/resume");

export default function ResumePage() {
  return (
    <>
      <RouteJsonLd path="/resume" />
      <div className="editorial-route resume-route route-shell">
        <section className="route-hero" aria-labelledby="resume-title">
          <div className="container secondary-grid route-hero-grid">
            <p className="eyebrow">Resume packet</p>
            <div className="editorial-prose route-copy-stack">
              <h1 id="resume-title">Resume.</h1>
              <p className="hero-subtitle">
                {practice.summary} The PDF carries the complete background,
                education and historical project detail.
              </p>
              <div className="hero-actions resume-actions-panel">
                <TrackedAnchor
                  className="button primary"
                  href={profile.resumePath}
                  eventName="resume_download_clicked"
                  eventParams={{ source_section: "resume_page" }}
                >
                  Download PDF
                </TrackedAnchor>
                <TrackedAnchor
                  className="button secondary"
                  href={`mailto:${profile.email}`}
                  eventName="contact_cta_clicked"
                  eventParams={{ source_section: "resume_page" }}
                >
                  Email Himadri
                </TrackedAnchor>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
