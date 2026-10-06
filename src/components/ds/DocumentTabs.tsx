"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import type { ResumeDocument } from "@/content/resume";

const subscribeToHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const readHash = () => window.location.hash.slice(1);
const noHash = () => "";

/**
 * Documents as tabs: each tab shows its pages as images in the page flow, so
 * the window scrolls naturally, and one primary button downloads whichever
 * document is open. The URL hash (#cv) opens a tab directly.
 */
export function DocumentTabs({
  documents,
  title,
}: {
  documents: readonly ResumeDocument[];
  title: string;
}) {
  const hash = useSyncExternalStore(subscribeToHash, readHash, noHash);
  const [picked, setPicked] = useState<string | null>(null);
  const active =
    picked ??
    (documents.some((doc) => doc.id === hash) ? hash : documents[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number, focus = false) => {
    const doc = documents[index];
    setPicked(doc.id);
    window.history.replaceState(
      null,
      "",
      index === 0 ? window.location.pathname : `#${doc.id}`,
    );
    if (focus) tabs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const last = documents.length - 1;
    const next =
      event.key === "ArrowRight"
        ? index === last
          ? 0
          : index + 1
        : event.key === "ArrowLeft"
          ? index === 0
            ? last
            : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  };

  const current = documents.find((doc) => doc.id === active) ?? documents[0];

  return (
    <div className="hm-doc-tabs">
      <div className="hm-doc-tabbar">
        <div className="hm-doc-tablist" role="tablist" aria-label={title}>
          {documents.map((doc, index) => (
            <button
              key={doc.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`tab-${doc.id}`}
              aria-selected={doc.id === active}
              aria-controls={`panel-${doc.id}`}
              tabIndex={doc.id === active ? 0 : -1}
              className="hm-doc-tab"
              onClick={() => select(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span className="hm-doc-tab-label">{doc.label}</span>
              <span className="hm-doc-tab-meta">{doc.meta}</span>
            </button>
          ))}
        </div>
        <TrackedAnchor
          className="hm-button hm-button--primary hm-doc-download"
          href={current.pdf}
          download={current.download}
          eventName="resume_download_clicked"
          eventParams={{ source_section: `resume_page_${current.id}` }}
        >
          {current.downloadLabel}
          <span
            className="hm-button-icon hm-button-icon--down"
            aria-hidden="true"
          >
            ↓
          </span>
        </TrackedAnchor>
      </div>
      {documents.map((doc, docIndex) => (
        <div
          key={doc.id}
          role="tabpanel"
          id={`panel-${doc.id}`}
          aria-labelledby={`tab-${doc.id}`}
          hidden={doc.id !== active}
          className="hm-doc-panel"
        >
          {doc.pages.map((pageImage, index) => (
            <Image
              key={pageImage.src}
              className="hm-doc-page"
              src={pageImage.src}
              width={pageImage.width}
              height={pageImage.height}
              sizes="(max-width: 960px) 100vw, 880px"
              priority={docIndex === 0 && index === 0}
              alt={`${doc.label}, page ${index + 1} of ${doc.pages.length}. The PDF has selectable text.`}
            />
          ))}
          <p className="hm-document-help">
            Prefer selectable text? <a href={doc.pdf}>Open the PDF</a>.
          </p>
        </div>
      ))}
    </div>
  );
}
