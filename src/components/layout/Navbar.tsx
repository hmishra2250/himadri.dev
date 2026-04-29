import Link from "next/link";
import { profile } from "@/content/profile";
import { navRoutes } from "@/lib/routes";

export function Navbar() {
  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Primary navigation">
        <Link href="/" className="brand" aria-label="Himadri Mishra homepage">
          <span className="brand-mark">HM</span>
          <span>{profile.name}</span>
        </Link>
        <div className="nav-links">
          <Link href="/#thinking">Thinking</Link>
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
