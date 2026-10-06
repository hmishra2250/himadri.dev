import Link from "next/link";
import { hero, links } from "@/content/site";
import { navRoutes } from "@/lib/routes";

export function SiteHeader() {
  return (
    <header className="hm-header">
      <div className="hm-wrap hm-header-inner">
        <Link href="/" className="hm-brand">
          <span className="hm-brand-name">{hero.name}</span>
          <span className="hm-brand-role">{hero.role}</span>
        </Link>
        <nav className="hm-nav" aria-label="Primary">
          <a href={links.agentExperience}>Agent Experience</a>
          <a href={links.github}>GitHub</a>
          {navRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="hm-button hm-button--quiet hm-button--sm"
            >
              {route.label}
              <span className="hm-button-icon" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
