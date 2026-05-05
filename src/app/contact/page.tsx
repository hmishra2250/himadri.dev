import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { profile } from "@/content/profile";

export const metadata: Metadata = buildPageMetadata("/contact");

const contactActions = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/hmishra2250",
    href: profile.linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/hmishra2250",
    href: profile.github,
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: profile.resumePath,
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
          <h1>Build, harden, or review production AI systems.</h1>
          <p className="hero-subtitle">
            Reach out for senior AI engineering, AI platform, LLM systems, or
            production AI systems conversations.
          </p>
          <div className="contact-grid contact-actions">
            {contactActions.map((action) => (
              <a className="contact-card" href={action.href} key={action.label}>
                <span>{action.label}</span>
                <strong>{action.value}</strong>
              </a>
            ))}
          </div>
          <div
            className="contact-use-cases"
            aria-labelledby="contact-use-cases"
          >
            <h2 id="contact-use-cases">Useful context to include</h2>
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
