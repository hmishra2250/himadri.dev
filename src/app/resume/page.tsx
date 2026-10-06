import type { Metadata } from "next";
import { DocumentTabs } from "@/components/ds";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { profile } from "@/content/profile";
import { resumeDocuments } from "@/content/resume";
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
          </div>
        </div>
        <DocumentTabs documents={resumeDocuments} title="Resume and full CV" />
      </section>
    </>
  );
}
