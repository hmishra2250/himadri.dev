import Link from "next/link";
import { footer, hero, sections, socials } from "@/content/site";
import { navRoutes } from "@/lib/routes";

export function SiteFooter() {
  const elsewhere = [...socials, ...footer.elsewhere];
  return (
    <footer className="hm-footer">
      <div className="hm-wrap">
        <div className="hm-grid">
          <div className="hm-footer-brand">
            <p className="hm-footer-name">{hero.name}</p>
            <p className="hm-footer-role">{footer.role}</p>
          </div>
          <nav className="hm-footer-col" aria-label="On this site">
            <span className="hm-label">On this site</span>
            <ul className="hm-footer-list">
              {sections.map((section) => (
                <li key={section.id}>
                  <Link href={`/#${section.id}`}>{section.label}</Link>
                </li>
              ))}
              {navRoutes.map((route) => (
                <li key={route.path}>
                  <Link href={route.path}>{route.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="hm-footer-col" aria-label="Elsewhere">
            <span className="hm-label">Elsewhere</span>
            <ul className="hm-footer-list">
              {elsewhere.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
