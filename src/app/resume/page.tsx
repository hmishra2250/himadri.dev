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
      <div className="editorial-route resume-route route-shell">
        <section className="container" aria-labelledby="resume-title">
          <div className="resume-document-header">
            <div>
              <h1 id="resume-title" className="resume-document-title">
                Resume
              </h1>
              <p>Himadri Mishra · AI engineering and Agent Experience</p>
            </div>
            <TrackedAnchor
              className="button secondary"
              href={profile.resumePath}
              download="Himadri_Mishra_Resume.pdf"
              eventName="resume_download_clicked"
              eventParams={{ source_section: "resume_page" }}
            >
              Download PDF
            </TrackedAnchor>
          </div>
          <iframe
            className="resume-document-viewer"
            title="Himadri Mishra resume PDF"
            src={`${profile.resumePath}#view=FitH`}
            aria-describedby="resume-preview-help"
          />
          <p id="resume-preview-help" className="resume-preview-help">
            Preview unavailable in your browser?{" "}
            <a href={profile.resumePath}>Open the PDF directly</a> or use the
            download button above.
          </p>
        </section>
      </div>
    </>
  );
}
