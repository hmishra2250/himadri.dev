import Link from "next/link";
import { hero } from "@/content/site";
import { navRoutes } from "@/lib/routes";
import { Button, SocialLinks } from "@/components/ds";

export function SiteHeader() {
  return (
    <header className="hm-header">
      <div className="hm-wrap hm-header-inner">
        <Link href="/" className="hm-brand">
          <span className="hm-brand-name">{hero.name}</span>
          <span className="hm-brand-role">{hero.role}</span>
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
