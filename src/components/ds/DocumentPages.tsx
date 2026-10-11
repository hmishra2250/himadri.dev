import Image from "next/image";

export type DocumentPage = { src: string; width: number; height: number };

/**
 * A document's pages as images in the page flow, on an hm-figure, so the
 * window scrolls naturally. The page header carries the download.
 */
export function DocumentPages({
  label,
  pages,
}: {
  label: string;
  pages: readonly DocumentPage[];
}) {
  return (
    <div className="hm-figure">
      {pages.map((page, index) => (
        <Image
          key={page.src}
          className="hm-doc-page"
          src={page.src}
          width={page.width}
          height={page.height}
          sizes="(max-width: 960px) 100vw, 880px"
          priority={index === 0}
          alt={
            pages.length > 1
              ? `${label}, page ${index + 1} of ${pages.length}`
              : label
          }
        />
      ))}
    </div>
  );
}
