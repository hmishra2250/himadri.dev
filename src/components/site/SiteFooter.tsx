import Link from "next/link";
import { footer, hero, sections, socials } from "@/content/site";
import { navRoutes } from "@/lib/routes";
import { SocialIcon } from "@/components/ds";

export function SiteFooter() {
  return (
    <footer className="hm-footer-band">
      <div className="hm-wrap">
        <div className="hm-grid" style={{ rowGap: 32 }}>
          <div style={{ gridColumn: "1 / 7" }}>
            <p className="hm-footer-name">{hero.name}</p>
            <p className="hm-footer-role">{footer.role}</p>
          </div>
          <nav style={{ gridColumn: "7 / 10" }} aria-label="On this site">
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
          <nav style={{ gridColumn: "10 / 13" }} aria-label="Elsewhere">
            <span className="hm-label">Elsewhere</span>
            <ul className="hm-footer-list">
              {socials.map((social) => (
                <li key={social.id}>
                  <a className="hm-footer-social" href={social.href}>
                    <SocialIcon id={social.id} />
                    {social.label}
                  </a>
                </li>
              ))}
              {footer.elsewhere.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="hm-footer-bottom">
          <span>© 2026 {hero.name}</span>
        </div>
      </div>
    </footer>
  );
}
