import { profile } from "@/content/profile";
import { TrackedAnchor } from "@/components/ui/TrackedLink";

type ContactActionsProps = {
  sourceSection?: string;
};

export function ContactActions({
  sourceSection = "contact",
}: ContactActionsProps) {
  return (
    <div className="contact-actions" aria-label="Contact actions">
      <TrackedAnchor
        className="button contact-email"
        href={`mailto:${profile.email}`}
        eventName="contact_cta_clicked"
        eventParams={{ source_section: sourceSection }}
      >
        {profile.email}
      </TrackedAnchor>
      <TrackedAnchor
        className="button contact-github"
        href={profile.github}
        eventName="contact_cta_clicked"
        eventParams={{ source_section: sourceSection, feature_id: "github" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </TrackedAnchor>
      <TrackedAnchor
        className="button contact-resume"
        href={profile.resumePath}
        eventName="resume_download_clicked"
        eventParams={{ source_section: sourceSection }}
      >
        Resume PDF
      </TrackedAnchor>
      <TrackedAnchor
        className="button contact-x"
        href={profile.x}
        eventName="contact_cta_clicked"
        eventParams={{ source_section: sourceSection, feature_id: "x" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        X / Twitter
      </TrackedAnchor>
      <TrackedAnchor
        className="button contact-linkedin"
        href={profile.linkedin}
        eventName="contact_cta_clicked"
        eventParams={{ source_section: sourceSection, feature_id: "linkedin" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </TrackedAnchor>
    </div>
  );
}
