import type { Segment } from "@/content/site";

/** Text with inline links: plain strings and { text, href } segments. */
export function InlineLinks({ segments }: { segments: Segment[] }) {
  return (
    <>
      {segments.map((segment, index) =>
        typeof segment === "string" ? (
          segment
        ) : (
          <a key={index} className="hm-link" href={segment.href}>
            {segment.text}
          </a>
        ),
      )}
    </>
  );
}
