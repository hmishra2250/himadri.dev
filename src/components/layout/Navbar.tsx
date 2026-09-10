import Link from "next/link";
import { profile } from "@/content/profile";
import { getNavHref, navRoutes } from "@/lib/routes";

export function Navbar() {
  return (
    <header className="site-header">
      <nav className="container nav nav-shell" aria-label="Primary navigation">
        <Link href="/" className="brand" aria-label="Himadri Mishra homepage">
          <span className="brand-mark" aria-hidden="true">
            HM
          </span>
          <span>{profile.name}</span>
        </Link>
        <div className="nav-links">
          {navRoutes.map((route) => (
            <Link href={getNavHref(route)} key={route.path}>
              {route.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
