import Link from "next/link";
import { profile } from "@/content/profile";
import { navRoutes } from "@/lib/routes";

export function Navbar() {
  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Primary navigation">
        <Link href="/" className="brand" aria-label="Himadri Mishra homepage">
          <span className="brand-monogram" aria-hidden="true">
            <span className="brand-bracket">[</span>HM<span className="brand-bracket">]</span>
          </span>
          <span>{profile.name}</span>
        </Link>
        <div className="nav-links">
          {navRoutes.map((route) => (
            <Link href={route.path} key={route.path}>
              {route.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
