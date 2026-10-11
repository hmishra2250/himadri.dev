import type { Metadata } from "next";
import { DocumentPages, PageHeader } from "@/components/ds";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import { profile } from "@/content/profile";
import { cvDocument, resumeDocument } from "@/content/resume";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/resume");

export default function ResumePage() {
  return (
    <>
      <RouteJsonLd path="/resume" />
      <section className="hm-wrap hm-document" aria-labelledby="resume-title">
        <PageHeader
          id="resume-title"
          label="Resume"
          title={profile.name}
          intro={profile.headline}
          actions={
            <>
              <TrackedAnchor
                className="hm-button hm-button--primary"
                href={resumeDocument.pdf}
                download={resumeDocument.download}
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
                className="hm-arrow-link"
                href={cvDocument.pdf}
                download={cvDocument.download}
                eventName="resume_download_clicked"
                eventParams={{ source_section: "resume_page_cv" }}
              >
                {cvDocument.label}
                <span className="hm-button-icon" aria-hidden="true">
                  ↓
                </span>
              </TrackedAnchor>
            </>
          }
        />
        <DocumentPages
          label={resumeDocument.label}
          pages={resumeDocument.pages}
        />
      </section>
    </>
  );
}
