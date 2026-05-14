import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/content/profile";
import { TrackedLink, TrackedAnchor } from "@/components/ui/TrackedLink";

export function ContactCTA() {
  return (
    <section className="section-pad" aria-labelledby="contact-cta-title">
      <div className="container cta-card">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-cta-title" className="display-serif">
          Need someone to own <em>production</em> AI architecture?
        </h2>
        <p>
          I am best matched with senior AI/platform and LLM systems roles where
          reliability, evals, observability, and cost matter.
        </p>
        <div className="hero-actions">
          <TrackedLink
            className="button primary"
            href="/contact"
            eventName="contact_cta_clicked"
            eventParams={{ source_section: "homepage_cta" }}
          >
            Get in touch
            <ArrowRight className="icon icon-md" />
          </TrackedLink>
          <TrackedAnchor
            className="button ghost"
            href={profile.resumePath}
            eventName="resume_download_clicked"
            eventParams={{ source_section: "homepage_cta" }}
          >
            Download resume
            <Download className="icon icon-md" />
          </TrackedAnchor>
        </div>
      </div>
    </section>
  );
}
