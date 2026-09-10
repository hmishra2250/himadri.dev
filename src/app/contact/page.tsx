import type { Metadata } from "next";
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
  event: ApprovedAnalyticsEvent;
}[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    event: "contact_cta_clicked",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/hmishra2250",
    href: profile.linkedin,
    event: "contact_cta_clicked",
  },
  {
    label: "GitHub",
    value: "github.com/hmishra2250",
    href: profile.github,
    event: "contact_cta_clicked",
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: profile.resumePath,
    event: "resume_download_clicked",
  },
];

const contactPaths = [
  {
    audience: "Problem shape",
    nextStep:
      "Share the workflow, developer surface, or platform failure mode that needs an owner.",
  },
  {
    audience: "System state",
    nextStep:
      "Describe what exists now: prototype, production service, internal tool, ML/search platform, or documentation path.",
  },
  {
    audience: "Useful outcome",
    nextStep:
      "Name the artifact you need next: architecture review, implementation path, eval plan, reliability repair, or handover notes.",
  },
];

export default function ContactPage() {
  return (
    <>
      <RouteJsonLd path="/contact" />
      <div className="editorial-route contact-route">
        <section className="section-pad contact-section">
          <div className="container contact-page">
            <div className="editorial-prose contact-intro">
              <h1>Tell me about your project.</h1>
              <p className="hero-subtitle">
                Reach out for AI systems architecture, agent-facing developer
                infrastructure, AI product workflow, or platform reliability
                conversations.
              </p>
            </div>
            <div className="contact-grid contact-actions">
              {contactActions.map((action) => (
                <TrackedAnchor
                  className="contact-card"
                  href={action.href}
                  key={action.label}
                  eventName={action.event}
                  eventParams={{
                    source_section: "contact_page",
                    feature_id: action.label.toLowerCase(),
                  }}
                >
                  <span>{action.label}</span>
                  <strong>{action.value}</strong>
                </TrackedAnchor>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad compact alt">
          <div className="container">
            <div className="section-header wide editorial-prose">
              <h2>Useful context to include.</h2>
              <p className="section-description">
                A concise first message helps determine whether the work is a
                fit. Please do not include secrets, customer data, proprietary
                prompts, private traces, or credentials.
              </p>
            </div>
            <div className="contact-grid">
              {contactPaths.map((path) => (
                <article className="contact-card" key={path.audience}>
                  <span>{path.audience}</span>
                  <strong>{path.nextStep}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
