import type { MetadataRoute } from "next";
import { publicRoutes } from "@/lib/routes";
import { siteConfig } from "@/lib/metadata";
import { getRouteSeo } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => {
    const isHome = route.path === "/";
    return {
      url: `${siteConfig.url}${route.path}`,
      lastModified: new Date(getRouteSeo(route.path).lastModified),
      changeFrequency: isHome ? "weekly" : "monthly",
      priority: isHome ? 1 : 0.8,
    };
  });
}
