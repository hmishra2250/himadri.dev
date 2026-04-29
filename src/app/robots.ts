import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { robotsDisallowRoutes } from "@/lib/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: robotsDisallowRoutes,
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
