import { buildRouteJsonLd, escapeJsonLd } from "@/lib/structured-data";

export function RouteJsonLd({ path }: { path: string }) {
  const jsonLd = escapeJsonLd(JSON.stringify(buildRouteJsonLd(path)));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
