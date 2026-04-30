"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    function sendPageView(attempt = 0) {
      if (cancelled) return;
      if (window.gtag) {
        window.gtag("event", "page_view", {
          page_location: window.location.href,
          page_path: pathname,
          page_title: document.title,
        });
        return;
      }
      if (attempt < 20) {
        window.setTimeout(() => sendPageView(attempt + 1), 250);
      }
    }

    sendPageView();

    return () => {
      cancelled = true;
    };
  }, [measurementId, pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
