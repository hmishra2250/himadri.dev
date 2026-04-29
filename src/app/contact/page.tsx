import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Himadri Mishra for senior AI engineering, AI platform, and founding AI engineer conversations.",
};

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
