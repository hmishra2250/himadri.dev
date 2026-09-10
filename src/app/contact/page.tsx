import type { Metadata } from "next";
import { ContactActions } from "@/components/ui/ContactActions";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/contact");

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
      <div className="editorial-route contact-route route-shell">
        <section className="route-hero" aria-labelledby="contact-title">
          <div className="container secondary-grid route-hero-grid">
            <p className="eyebrow">Contact</p>
            <div className="editorial-prose route-copy-stack">
              <h1 id="contact-title">Tell me about your project.</h1>
              <p className="hero-subtitle">
                Reach out for AI systems architecture, agent-facing developer
                infrastructure, AI product workflow, or platform reliability
                conversations.
              </p>
              <ContactActions sourceSection="contact_page" />
            </div>
          </div>
        </section>

        <section
          className="route-section useful-contact-context"
          aria-labelledby="useful-contact-context-title"
        >
          <div className="container secondary-grid">
            <div className="section-heading compact-heading">
              <h2
                className="modest-section-heading"
                id="useful-contact-context-title"
              >
                Useful context to include.
              </h2>
              <p>
                A concise first message helps determine whether the work is a
                fit. Please do not include secrets, customer data, proprietary
                prompts, private traces, or credentials.
              </p>
            </div>
            <div className="contact-context-list editorial-list">
              {contactPaths.map((path) => (
                <article
                  className="contact-context-row editorial-row"
                  key={path.audience}
                >
                  <span className="eyebrow">{path.audience}</span>
                  <p>{path.nextStep}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
