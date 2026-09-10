import { profile } from "@/content/profile";
import { TrackedAnchor } from "@/components/ui/TrackedLink";

export function ContactCTA() {
  return (
    <section
      className="section-pad compact contact-close"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container cta-card">
        <h2 id="contact-title">Contact.</h2>
        <div className="cta-body">
          <p>Send me what you&apos;re building.</p>
          <div className="hero-actions contact-actions-inline">
            <TrackedAnchor
              className="button primary"
              href={`mailto:${profile.email}`}
              eventName="contact_cta_clicked"
              eventParams={{ source_section: "homepage_contact" }}
            >
              {profile.email}
            </TrackedAnchor>
            <a
              className="button secondary"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <TrackedAnchor
              className="button ghost"
              href={profile.resumePath}
              eventName="resume_download_clicked"
              eventParams={{ source_section: "homepage_contact" }}
            >
              Resume PDF
            </TrackedAnchor>
          </div>
        </div>
      </div>
    </section>
  );
}
