import { Fragment } from "react";
import Link from "next/link";
import { profile } from "@/content/profile";
import { getNavHref, navRoutes } from "@/lib/routes";

export function NavigationLinks() {
  return navRoutes.map((route) => (
    <Fragment key={route.path}>
      <Link href={getNavHref(route)}>{route.label}</Link>
      {route.path === "/case-studies" && (
        <a
          className="nav-external"
          href={profile.agentExperience}
          aria-label="Agent Experience (external website)"
        >
          Agent Experience <span aria-hidden="true">↗</span>
        </a>
      )}
    </Fragment>
  ));
}
