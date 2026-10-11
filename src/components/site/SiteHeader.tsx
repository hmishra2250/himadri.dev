import Link from "next/link";
import { hero } from "@/content/site";
import { navRoutes } from "@/lib/routes";
import { Button, SocialLinks } from "@/components/ds";

export function SiteHeader() {
  return (
    <header className="hm-header">
      <div className="hm-wrap hm-header-inner">
        <Link
          href="/"
          className="hm-brand hm-brand--mark"
          aria-label={`${hero.name}, home`}
        >
          <span className="hm-brand-mark" aria-hidden="true">
            HM
          </span>
        </Link>
        <nav className="hm-nav" aria-label="Primary">
          <SocialLinks />
          {navRoutes.map((route) => (
            <Button key={route.path} href={route.path} variant="quiet">
              {route.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
