import type { MetadataRoute } from "next";
import { publicRoutes } from "@/lib/routes";
import { buildCanonicalUrl, getRouteSeo } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => {
    const seo = getRouteSeo(route.path);
    return {
      url: buildCanonicalUrl(seo.canonicalPath),
      lastModified: new Date(seo.lastModified),
      changeFrequency: route.path === "/" ? "weekly" : "monthly",
      priority: route.path === "/" ? 1 : 0.7,
    };
  });
}
