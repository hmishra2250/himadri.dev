import type { MetadataRoute } from "next";
import { publicRoutes } from "@/lib/routes";
import { siteConfig } from "@/lib/metadata";
import { getRouteSeo } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => {
    const routeSeo = getRouteSeo(route.path);
    return {
      url: `${siteConfig.url}${route.path}`,
      lastModified: new Date(routeSeo.lastModified),
      changeFrequency: route.path === "/" ? "weekly" : "monthly",
      priority: route.path === "/" ? 1 : 0.7,
    };
  });
}
