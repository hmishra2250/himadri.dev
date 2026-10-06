import React from "react";
export function Status({ tone = "cobalt", boxed, children }) {
  return <span className={"hm-status hm-status--" + tone + (boxed ? " hm-status--boxed" : "")}><span className="hm-status-dot" aria-hidden="true"></span>{children}</span>;
}
