import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/interview-me", "/challenges", "/principles"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
