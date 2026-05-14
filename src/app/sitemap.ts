import type { MetadataRoute } from "next";
import { publicRoutes } from "@/lib/routes";
import { siteConfig } from "@/lib/metadata";
import { getRouteSeo } from "@/lib/seo";

const highPriorityPaths = new Set([
  "/case-studies",
  "/about",
  "/resume",
  "/contact",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => {
    const routeSeo = getRouteSeo(route.path);
    const isHome = route.path === "/";
    const isHighPriority = highPriorityPaths.has(route.path);
    const isCaseStudy = route.path.startsWith("/case-studies/");
    return {
      url: `${siteConfig.url}${route.path}`,
      lastModified: new Date(routeSeo.lastModified),
      changeFrequency: isHome ? "weekly" : "monthly",
      priority: isHome ? 1 : (isHighPriority || isCaseStudy) ? 0.8 : 0.5,
    };
  });
}
