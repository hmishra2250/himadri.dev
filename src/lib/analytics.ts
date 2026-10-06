export const approvedAnalyticsEvents = ["resume_download_clicked"] as const;

export type ApprovedAnalyticsEvent = (typeof approvedAnalyticsEvents)[number];

export type AnalyticsEventParams = {
  route?: string;
  source_section?: string;
};

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config",
      target: string,
      params?: Record<string, string | boolean>,
    ) => void;
  }
}

export function trackPortfolioEvent(
  eventName: ApprovedAnalyticsEvent,
  params: AnalyticsEventParams = {},
) {
  if (typeof window === "undefined") return;
  if (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER !== "google_analytics") return;
  if (!window.gtag) return;
  window.gtag("event", eventName, params);
}
