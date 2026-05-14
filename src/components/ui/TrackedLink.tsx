"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import {
  trackPortfolioEvent,
  type ApprovedAnalyticsEvent,
  type AnalyticsEventParams,
} from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: ApprovedAnalyticsEvent;
  eventParams?: AnalyticsEventParams;
};

export function TrackedLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackPortfolioEvent(eventName, eventParams);
        onClick?.(e);
      }}
    />
  );
}

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
