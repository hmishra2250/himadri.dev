import type { Segment } from "@/content/site";

export function RichText({ segments }: { segments: Segment[] }) {
  return (
    <>
      {segments.map((segment, index) =>
        typeof segment === "string" ? (
          segment
        ) : (
          <a key={index} className="site-link" href={segment.href}>
            {segment.text}
          </a>
        ),
      )}
    </>
  );
}
