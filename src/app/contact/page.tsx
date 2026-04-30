import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Himadri Mishra for senior AI engineering, AI platform, and founding AI engineer conversations.",
};

const contactPaths = [
  {
    audience: "Founder or CTO",
    nextStep:
      "Send the product workflow, current AI bottleneck, and what needs to be production-ready in the next quarter.",
  },
  {
    audience: "Engineering leader",
    nextStep:
      "Share the platform scope, eval gaps, observability needs, and whether the role owns architecture or execution.",
  },
  {
    audience: "Recruiter",
    nextStep:
      "Start with the role level, interview loop, compensation range, and which proof points matter most.",
  },
  {
    audience: "Technical collaborator",
    nextStep:
      "Point me to the system, failure mode, or prototype where a second architecture review would help.",
  },
];

export default function ContactPage() {
  return (
    <section className="section-pad">
      <div className="container narrow contact-page">
        <p className="eyebrow">Contact</p>
        <h1>Best fit: serious production AI systems conversations.</h1>
        <p className="hero-subtitle">
          I am most useful where agentic workflows, evals, observability, cost,
          infra, and full-stack product execution all matter.
        </p>
        <div className="contact-grid">
          {contactPaths.map((path) => (
            <article className="contact-card" key={path.audience}>
              <span>{path.audience}</span>
              <strong>{path.nextStep}</strong>
            </article>
          ))}
        </div>
        <div className="contact-grid">
          <a className="contact-card" href={`mailto:${profile.email}`}>
            <span>Email</span>
            <strong>{profile.email}</strong>
          </a>
          <a className="contact-card" href={profile.linkedin}>
            <span>LinkedIn</span>
            <strong>linkedin.com/in/hmishra2250</strong>
          </a>
          <a className="contact-card" href={profile.github}>
            <span>GitHub</span>
            <strong>github.com/hmishra2250</strong>
          </a>
          <a className="contact-card" href={profile.resumePath}>
            <span>Resume</span>
            <strong>Download PDF</strong>
          </a>
        </div>
      </div>
    </section>
  );
}
