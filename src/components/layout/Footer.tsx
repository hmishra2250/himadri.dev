import Link from "next/link";
import { profile } from "@/content/profile";
import { getNavHref, navRoutes } from "@/lib/routes";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} {profile.name}
        </span>
        <div className="footer-links" aria-label="Footer links">
          {navRoutes.map((route) => (
            <Link href={getNavHref(route)} key={route.path}>
              {route.label}
            </Link>
          ))}
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
