import Link from "next/link";
import { profile } from "@/content/profile";

export function ContactCTA() {
  return (
    <section className="section-pad" aria-labelledby="contact-cta-title">
      <div className="container cta-card">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-cta-title">
          Need someone to own production AI architecture?
        </h2>
        <p>
          I am best matched with senior AI/platform, LLM systems, and founding
          AI engineer conversations where reliability, evals, observability, and
          cost matter.
        </p>
        <div className="hero-actions">
          <Link className="button primary" href="/contact">
            Contact Himadri
          </Link>
          <a className="button secondary" href={`mailto:${profile.email}`}>
            Email directly
          </a>
          <a className="button ghost" href={profile.resumePath}>
            Download resume
          </a>
        </div>
      </div>
    </section>
  );
}
