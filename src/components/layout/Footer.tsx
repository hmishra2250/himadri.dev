import { profile } from "@/content/profile";
import { NavigationLinks } from "@/components/layout/NavigationLinks";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} {profile.name}
        </span>
        <div className="footer-links" aria-label="Footer links">
          <NavigationLinks />
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.x} target="_blank" rel="noopener noreferrer">
            X / Twitter
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
