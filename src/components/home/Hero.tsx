import { profile } from "@/content/profile";
import { practice } from "@/content/practice";
import { TrackedAnchor } from "@/components/ui/TrackedLink";

export function Hero() {
  return (
    <section className="hero section-pad">
      <div className="container hero-single">
        <p className="hero-name">{profile.name}</p>
        <h1>{practice.headline}</h1>
        <p className="hero-subtitle">{practice.summary}</p>
        <div className="hero-actions" aria-label="Primary actions">
          <TrackedAnchor
            className="button primary"
            href={`mailto:${profile.email}`}
            eventName="contact_cta_clicked"
            eventParams={{ source_section: "hero" }}
          >
            Email Himadri
          </TrackedAnchor>
          <TrackedAnchor
            className="button secondary"
            href={profile.resumePath}
            eventName="resume_download_clicked"
            eventParams={{ source_section: "hero" }}
          >
            Download resume
          </TrackedAnchor>
          <a
            className="button ghost"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
