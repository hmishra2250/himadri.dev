import Image from "next/image";

export type DocumentPage = { src: string; width: number; height: number };

/**
 * A document's pages as images in the page flow, on a framed panel, so the
 * window scrolls naturally. The PDF link keeps selectable text one click away.
 */
export function DocumentPages({
  label,
  pages,
  pdf,
}: {
  label: string;
  pages: readonly DocumentPage[];
  pdf: string;
}) {
  return (
    <div className="hm-doc-panel">
      {pages.map((page, index) => (
        <Image
          key={page.src}
          className="hm-doc-page"
          src={page.src}
          width={page.width}
          height={page.height}
          sizes="(max-width: 960px) 100vw, 880px"
          priority={index === 0}
          alt={`${label}, page ${index + 1} of ${pages.length}. The PDF has selectable text.`}
        />
      ))}
      <p className="hm-document-help">
        Prefer selectable text? <a href={pdf}>Open the PDF</a>.
      </p>
    </div>
  );
}
