import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <span className="footer-copy">&copy; {new Date().getFullYear()} {profile.name}</span>
        <div className="footer-links" aria-label="Footer links">
          <Link href="/case-studies">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/resume">Resume</Link>
          <Link href="/contact">Contact</Link>
          <a href={profile.github} className="link-with-icon" target="_blank" rel="noopener noreferrer">
            GitHub
            <ArrowUpRight className="icon icon-sm external-indicator" />
          </a>
          <a href={profile.linkedin} className="link-with-icon" target="_blank" rel="noopener noreferrer">
            LinkedIn
            <ArrowUpRight className="icon icon-sm external-indicator" />
          </a>
        </div>
      </div>
    </footer>
  );
}
