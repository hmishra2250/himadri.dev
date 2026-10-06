import React from "react";
export function Button({ variant = "secondary", size = "md", href, icon, iconDir, children, className = "", ...rest }) {
  const cls = ["hm-button", variant !== "secondary" ? "hm-button--" + variant : "", size === "sm" ? "hm-button--sm" : "", className].filter(Boolean).join(" ");
  const inner = <>{children}{icon ? <span className={"hm-button-icon" + (iconDir === "down" ? " hm-button-icon--down" : "")} aria-hidden="true">{icon}</span> : null}</>;
  return href ? <a className={cls} href={href} {...rest}>{inner}</a> : <button type="button" className={cls} {...rest}>{inner}</button>;
}
