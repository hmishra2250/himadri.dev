"use client";

import {
  trackPortfolioEvent,
  type ApprovedAnalyticsEvent,
  type AnalyticsEventParams,
} from "@/lib/analytics";

type TrackedAnchorProps = React.ComponentProps<"a"> & {
  eventName: ApprovedAnalyticsEvent;
  eventParams?: AnalyticsEventParams;
};

export function TrackedAnchor({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackPortfolioEvent(eventName, eventParams);
        onClick?.(e);
      }}
    />
  );
}
