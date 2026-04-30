export const approvedAnalyticsEvents = [
  "resume_download_clicked",
  "contact_cta_clicked",
  "case_study_opened",
  "interview_static_question_opened",
  "assistant_question_submitted",
  "assistant_fallback_returned",
  "challenge_opened",
  "debug_choice_submitted",
  "cost_model_toggled",
  "dag_step_advanced",
  "deck_ir_sample_selected",
] as const;

export type ApprovedAnalyticsEvent = (typeof approvedAnalyticsEvents)[number];

export type AnalyticsEventParams = {
  route?: string;
  feature_id?: string;
  scenario_id?: string;
  challenge_id?: string;
  source_section?: string;
  outcome?: boolean;
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
