import React from "react";
export function ArrowLink({ href = "#", arrow = "→", tone = "cobalt", children, className = "", ...rest }) {
  return <a href={href} className={"hm-arrow-link" + (tone === "ink" ? " hm-arrow-link--ink" : "") + (className ? " " + className : "")} {...rest}>{children}<span className="hm-button-icon" aria-hidden="true">{arrow}</span></a>;
}
