import type { Metadata } from "next";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import { profile } from "@/content/profile";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/resume");

export default function ResumePage() {
  return (
    <>
      <RouteJsonLd path="/resume" />
      <section className="hm-wrap hm-document" aria-labelledby="resume-title">
        <div className="hm-page-header">
          <span className="hm-label hm-label--cobalt">Resume</span>
          <div className="hm-page-header-body">
            <h1 id="resume-title" className="hm-h1">
              {profile.name}
            </h1>
            <p className="hm-lead">{profile.headline}</p>
            <div className="hm-page-actions">
              <TrackedAnchor
                className="hm-button hm-button--primary"
                href={profile.resumePath}
                download="Himadri_Mishra_Resume.pdf"
                eventName="resume_download_clicked"
                eventParams={{ source_section: "resume_page" }}
              >
                Download resume
                <span
                  className="hm-button-icon hm-button-icon--down"
                  aria-hidden="true"
                >
                  ↓
                </span>
              </TrackedAnchor>
              <TrackedAnchor
                className="hm-button"
                href={profile.cvPath}
                download="Himadri_Mishra_CV.pdf"
                eventName="resume_download_clicked"
                eventParams={{ source_section: "resume_page_cv" }}
              >
                Full CV, two pages
                <span
                  className="hm-button-icon hm-button-icon--down"
                  aria-hidden="true"
                >
                  ↓
                </span>
              </TrackedAnchor>
            </div>
          </div>
        </div>
        <iframe
          className="hm-document-viewer"
          title="Himadri Mishra resume PDF"
          src={`${profile.resumePath}#view=FitH`}
          aria-describedby="resume-preview-help"
        />
        <p id="resume-preview-help" className="hm-document-help">
          Preview unavailable in your browser?{" "}
          <a href={profile.resumePath}>Open the PDF directly</a>, or open the{" "}
          <a href={profile.cvPath}>full CV</a>.
        </p>
      </section>
    </>
  );
}
