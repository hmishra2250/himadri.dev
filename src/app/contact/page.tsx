import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Mail, ExternalLink, FileDown } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { profile } from "@/content/profile";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import type { ApprovedAnalyticsEvent } from "@/lib/analytics";

export const metadata: Metadata = buildPageMetadata("/contact");

const contactActions: {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  event: ApprovedAnalyticsEvent;
}[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    event: "contact_cta_clicked",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/hmishra2250",
    href: profile.linkedin,
    icon: ExternalLink,
    event: "contact_cta_clicked",
  },
  {
    label: "GitHub",
    value: "github.com/hmishra2250",
    href: profile.github,
    icon: ExternalLink,
    event: "contact_cta_clicked",
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: profile.resumePath,
    icon: FileDown,
    event: "resume_download_clicked",
  },
];

const contactPaths = [
  {
    audience: "Product leadership",
    nextStep:
      "Share the workflow, production bottleneck, and what needs to become reliable next.",
  },
  {
    audience: "Engineering leadership",
    nextStep:
      "Share the platform scope, eval gaps, observability needs, and ownership model.",
  },
  {
    audience: "Recruiting",
    nextStep:
      "Start with the role level, interview loop, compensation range, and strongest proof points to review.",
  },
  {
    audience: "Technical collaboration",
    nextStep:
      "Point me to the system, failure mode, or prototype where a second architecture review would help.",
  },
];

export default function ContactPage() {
  return (
    <>
      <RouteJsonLd path="/contact" />
      <section className="section-pad contact-section">
        <div className="container narrow contact-page">
          <p className="eyebrow">Contact</p>
          <h1 className="display-serif">Build, harden, or review <em>production</em> AI systems.</h1>
          <p className="hero-subtitle">
            Reach out for senior AI engineering, AI platform, LLM systems, or
            production AI systems conversations.
          </p>
          <div className="contact-grid contact-actions">
            {contactActions.map((action) => (
              <TrackedAnchor
                className="contact-card"
                href={action.href}
                key={action.label}
                eventName={action.event}
                eventParams={{ source_section: "contact_page", feature_id: action.label.toLowerCase() }}
              >
                <action.icon className="icon icon-lg contact-card-icon" />
                <span>{action.label}</span>
                <strong>{action.value}</strong>
              </TrackedAnchor>
            ))}
          </div>
          <div
            className="contact-use-cases"
            aria-labelledby="contact-use-cases"
          >
            <h2 id="contact-use-cases" className="display-serif">Useful context to <em>include.</em></h2>
            <div className="contact-grid">
              {contactPaths.map((path) => (
                <article className="contact-card" key={path.audience}>
                  <span>{path.audience}</span>
                  <strong>{path.nextStep}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
