import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { practice } from "@/content/practice";
import { profile } from "@/content/profile";
import { TrackedAnchor } from "@/components/ui/TrackedLink";

export const metadata: Metadata = buildPageMetadata("/resume");

export default function ResumePage() {
  return (
    <>
      <RouteJsonLd path="/resume" />
      <section className="section-pad resume-simple">
        <div className="container resume-panel">
          <div>
            <p className="hero-name">Resume packet</p>
            <h1>Resume.</h1>
            <p className="hero-subtitle">
              {practice.summary} The PDF carries the complete background,
              education and historical project detail.
            </p>
          </div>
          <div className="resume-actions-panel">
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
      </section>
    </>
  );
}
