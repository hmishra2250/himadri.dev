import React from "react";
export function Label({ tone = "muted", plain, as: Tag = "span", children, className = "", ...rest }) {
  const cls = ["hm-label", tone !== "muted" ? "hm-label--" + tone : "", plain ? "hm-label--plain" : "", className].filter(Boolean).join(" ");
  return <Tag className={cls} {...rest}>{children}</Tag>;
}
