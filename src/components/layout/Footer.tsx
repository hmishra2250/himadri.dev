import Link from "next/link";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="eyebrow">Built as a production artifact</p>
          <p className="muted">
            Next.js, TypeScript, typed proof content, sanitized system
            simulations, and evidence-first case studies.
          </p>
        </div>
        <div className="footer-links" aria-label="Footer links">
          <Link href="/case-studies">Work</Link>
          <Link href="/resume">Resume</Link>
          <Link href="/contact">Contact</Link>
          <a href={profile.github}>GitHub</a>
          <a href={profile.linkedin}>LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
