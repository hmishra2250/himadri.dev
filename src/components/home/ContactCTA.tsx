import { ContactActions } from "@/components/ui/ContactActions";

export function ContactCTA() {
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container contact-row secondary-grid">
        <h2 className="modest-section-heading" id="contact-title">
          Contact
        </h2>
        <div className="contact-copy">
          <p>Send me what you are building.</p>
          <ContactActions sourceSection="homepage_contact" />
        </div>
      </div>
    </section>
  );
}
