/* @ds-bundle: {"format":4,"namespace":"HimadriDevDesignSystem_af224d","components":[{"name":"ArrowLink","sourcePath":"components/core/ArrowLink.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Label","sourcePath":"components/core/Label.jsx"},{"name":"Status","sourcePath":"components/core/Status.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"ContactBlock","sourcePath":"components/identity/ContactBlock.jsx"},{"name":"Portrait","sourcePath":"components/identity/Portrait.jsx"},{"name":"PageHeader","sourcePath":"components/layout/PageHeader.jsx"},{"name":"Section","sourcePath":"components/layout/Section.jsx"},{"name":"SiteFooter","sourcePath":"components/layout/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/layout/SiteHeader.jsx"},{"name":"DecisionFork","sourcePath":"components/work/DecisionFork.jsx"},{"name":"Pipeline","sourcePath":"components/work/Pipeline.jsx"},{"name":"SpecList","sourcePath":"components/work/SpecList.jsx"},{"name":"SystemCard","sourcePath":"components/work/SystemGrid.jsx"},{"name":"SystemGrid","sourcePath":"components/work/SystemGrid.jsx"},{"name":"Timeline","sourcePath":"components/work/Timeline.jsx"},{"name":"MetricStrip","sourcePath":"components/work/Timeline.jsx"},{"name":"Note","sourcePath":"components/work/Timeline.jsx"},{"name":"WorkRow","sourcePath":"components/work/WorkRow.jsx"},{"name":"WorkRows","sourcePath":"components/work/WorkRow.jsx"}],"sourceHashes":{"components/core/ArrowLink.jsx":"0e3c28757ebd","components/core/Button.jsx":"c5abaafdc141","components/core/Label.jsx":"df3701f9daf8","components/core/Status.jsx":"5f1aad629699","components/core/Tabs.jsx":"a44e897ed940","components/identity/ContactBlock.jsx":"5e064a19fc31","components/identity/Portrait.jsx":"5411465193c1","components/layout/PageHeader.jsx":"4492f6698cec","components/layout/Section.jsx":"0c202e97f9c9","components/layout/SiteFooter.jsx":"1d1bbe167a23","components/layout/SiteHeader.jsx":"4473cf1349e7","components/work/DecisionFork.jsx":"e7dd2ff4dfa8","components/work/Pipeline.jsx":"6fae9b57dde3","components/work/SpecList.jsx":"0782470d651d","components/work/SystemGrid.jsx":"4fd800649359","components/work/Timeline.jsx":"755dc5021cb9","components/work/WorkRow.jsx":"a0a7607077cb","ui_kits/portfolio/CaseStudy.jsx":"d08fe09e0383","ui_kits/portfolio/Home.jsx":"f22c85c0ef67","ui_kits/portfolio/Pages.jsx":"bc2badd27c5a","ui_kits/portfolio/Shell.jsx":"c97ba28b37fd","ui_kits/portfolio/Work.jsx":"0cbdb529ca35","ui_kits/portfolio/data.js":"104d42e449e0"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HimadriDevDesignSystem_af224d = window.HimadriDevDesignSystem_af224d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/ArrowLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ArrowLink({
  href = "#",
  arrow = "→",
  tone = "cobalt",
  children,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    className: "hm-arrow-link" + (tone === "ink" ? " hm-arrow-link--ink" : "") + (className ? " " + className : "")
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    className: "hm-button-icon",
    "aria-hidden": "true"
  }, arrow));
}
Object.assign(__ds_scope, { ArrowLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ArrowLink.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = "secondary",
  size = "md",
  href,
  icon,
  iconDir,
  children,
  className = "",
  ...rest
}) {
  const cls = ["hm-button", variant !== "secondary" ? "hm-button--" + variant : "", size === "sm" ? "hm-button--sm" : "", className].filter(Boolean).join(" ");
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, children, icon ? /*#__PURE__*/React.createElement("span", {
    className: "hm-button-icon" + (iconDir === "down" ? " hm-button-icon--down" : ""),
    "aria-hidden": "true"
  }, icon) : null);
  return href ? /*#__PURE__*/React.createElement("a", _extends({
    className: cls,
    href: href
  }, rest), inner) : /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls
  }, rest), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Label.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Label({
  tone = "muted",
  plain,
  as: Tag = "span",
  children,
  className = "",
  ...rest
}) {
  const cls = ["hm-label", tone !== "muted" ? "hm-label--" + tone : "", plain ? "hm-label--plain" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Label.jsx", error: String((e && e.message) || e) }); }

// components/core/Status.jsx
try { (() => {
function Status({
  tone = "cobalt",
  boxed,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "hm-status hm-status--" + tone + (boxed ? " hm-status--boxed" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-status-dot",
    "aria-hidden": "true"
  }), children);
}
Object.assign(__ds_scope, { Status });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Status.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hm-tabs",
    role: "tablist"
  }, items.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    role: "tab",
    className: "hm-tab",
    "aria-selected": value === t.id,
    onClick: () => onChange && onChange(t.id)
  }, t.label, t.count != null ? /*#__PURE__*/React.createElement("span", {
    className: "hm-tab-count"
  }, t.count) : null)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/identity/ContactBlock.jsx
try { (() => {
function ContactBlock({
  email = "himadri.jobhunt@gmail.com",
  github = "https://github.com/hmishra2250",
  resume = "#",
  x = "https://x.com/hmishra2250",
  linkedin = "https://linkedin.com/in/hmishra2250",
  showEmail = true,
  channels = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hm-contact"
  }, showEmail ? /*#__PURE__*/React.createElement("a", {
    className: "hm-contact-email",
    href: "mailto:" + email
  }, email, /*#__PURE__*/React.createElement("span", {
    className: "hm-button-icon",
    "aria-hidden": "true"
  }, "\u2197")) : null, channels ? /*#__PURE__*/React.createElement("div", {
    className: "hm-contact-actions",
    "aria-label": "Contact links"
  }, /*#__PURE__*/React.createElement("a", {
    className: "hm-button hm-c-github",
    href: github,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "GitHub"), /*#__PURE__*/React.createElement("a", {
    className: "hm-button hm-c-linkedin",
    href: linkedin,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "LinkedIn"), /*#__PURE__*/React.createElement("a", {
    className: "hm-button hm-c-x",
    href: x,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "X / Twitter"), /*#__PURE__*/React.createElement("a", {
    className: "hm-button hm-c-resume",
    href: resume
  }, "Resume PDF")) : null);
}
Object.assign(__ds_scope, { ContactBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/identity/ContactBlock.jsx", error: String((e && e.message) || e) }); }

// components/identity/Portrait.jsx
try { (() => {
function Portrait({
  src = "assets/himadri-portrait.png",
  size = 160,
  alt = "Himadri Mishra"
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "hm-portrait",
    style: {
      width: "100%",
      maxWidth: size,
      aspectRatio: "1 / 1"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt
  }));
}
Object.assign(__ds_scope, { Portrait });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/identity/Portrait.jsx", error: String((e && e.message) || e) }); }

// components/layout/PageHeader.jsx
try { (() => {
function PageHeader({
  label,
  title,
  intro,
  actions,
  children
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "hm-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-page-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-label hm-label--cobalt"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "hm-page-header-body"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "hm-h1"
  }, title), intro ? /*#__PURE__*/React.createElement("p", {
    className: "hm-lead"
  }, intro) : null, actions ? /*#__PURE__*/React.createElement("div", {
    className: "hm-page-actions"
  }, actions) : null), children));
}
Object.assign(__ds_scope, { PageHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/PageHeader.jsx", error: String((e && e.message) || e) }); }

// components/layout/Section.jsx
try { (() => {
function Section({
  index,
  label,
  title,
  intro,
  aside,
  id,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "hm-section",
    id: id
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-wrap"
  }, /*#__PURE__*/React.createElement("header", {
    className: "hm-section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-section-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-section-index"
  }, index ? /*#__PURE__*/React.createElement("span", {
    className: "hm-section-num"
  }, index) : null, /*#__PURE__*/React.createElement("span", {
    className: "hm-label hm-label--ink"
  }, label)), aside ? /*#__PURE__*/React.createElement("div", null, aside) : null), title ? /*#__PURE__*/React.createElement("h2", {
    className: "hm-h2"
  }, title) : null, intro ? /*#__PURE__*/React.createElement("p", {
    className: "hm-section-intro"
  }, intro) : null), children));
}
Object.assign(__ds_scope, { Section });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Section.jsx", error: String((e && e.message) || e) }); }

// components/layout/SiteFooter.jsx
try { (() => {
function SiteFooter({
  name = "Himadri Mishra",
  role = "Agent Experience Engineer and AI Product Engineer",
  pages = [],
  elsewhere = [],
  year = 2026,
  colophon = "Set in IBM Plex Sans and IBM Plex Mono.",
  onNavigate
}) {
  const L = l => /*#__PURE__*/React.createElement("li", {
    key: l.label
  }, /*#__PURE__*/React.createElement("a", {
    href: l.href || "#",
    onClick: onNavigate && l.id ? e => {
      e.preventDefault();
      onNavigate(l.id);
    } : undefined
  }, l.label, l.external ? " ↗" : ""));
  return /*#__PURE__*/React.createElement("footer", {
    className: "hm-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-grid",
    style: {
      rowGap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / 7"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-footer-name"
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "hm-footer-role"
  }, role)), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "7 / 10"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-label"
  }, "Pages"), /*#__PURE__*/React.createElement("ul", {
    className: "hm-footer-list"
  }, pages.map(L))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "10 / 13"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-label"
  }, "Elsewhere"), /*#__PURE__*/React.createElement("ul", {
    className: "hm-footer-list"
  }, elsewhere.map(L)))), /*#__PURE__*/React.createElement("div", {
    className: "hm-footer-bottom"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", year, " ", name), /*#__PURE__*/React.createElement("span", null, colophon))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/layout/SiteHeader.jsx
try { (() => {
function SiteHeader({
  name = "Himadri Mishra",
  role = "Agent Experience · AI Product",
  links = [],
  active,
  resumeHref = "#",
  onNavigate
}) {
  const nav = id => onNavigate ? e => {
    e.preventDefault();
    onNavigate(id);
  } : undefined;
  return /*#__PURE__*/React.createElement("header", {
    className: "hm-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-wrap hm-header-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hm-brand",
    onClick: nav("home")
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-brand-name"
  }, name), /*#__PURE__*/React.createElement("span", {
    className: "hm-brand-role"
  }, role)), /*#__PURE__*/React.createElement("nav", {
    className: "hm-nav",
    "aria-label": "Primary"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id || l.label,
    href: l.href || "#",
    "aria-current": active === l.id ? "page" : undefined,
    onClick: l.id ? nav(l.id) : undefined
  }, l.label)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "quiet",
    href: resumeHref,
    icon: "\u2197"
  }, "Resume"))));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/work/DecisionFork.jsx
try { (() => {
function DecisionFork({
  index,
  title,
  context,
  options = [],
  chosen = 1,
  why
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: "hm-fork"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-fork-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-label hm-label--cobalt"
  }, "Decision ", index), /*#__PURE__*/React.createElement("h3", {
    className: "hm-h3"
  }, title), context ? /*#__PURE__*/React.createElement("p", null, context) : null), /*#__PURE__*/React.createElement("div", {
    className: "hm-fork-options"
  }, options.map((o, i) => /*#__PURE__*/React.createElement("div", {
    className: "hm-fork-option",
    "data-chosen": i === chosen,
    key: o.label
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-fork-option-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-h4",
    style: {
      fontSize: 16
    }
  }, o.label), i === chosen ? /*#__PURE__*/React.createElement("span", {
    className: "hm-status hm-status--cobalt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-status-dot"
  }), "Chosen") : /*#__PURE__*/React.createElement("span", {
    className: "hm-label"
  }, "Considered")), /*#__PURE__*/React.createElement("ul", {
    className: "hm-fork-list hm-fork-list--pro"
  }, o.pros.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, /*#__PURE__*/React.createElement("span", null, "+"), p))), /*#__PURE__*/React.createElement("ul", {
    className: "hm-fork-list hm-fork-list--con"
  }, o.cons.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, /*#__PURE__*/React.createElement("span", null, "\u2212"), p)))))), why ? /*#__PURE__*/React.createElement("div", {
    className: "hm-fork-why"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-label"
  }, "Why"), /*#__PURE__*/React.createElement("span", null, why)) : null);
}
Object.assign(__ds_scope, { DecisionFork });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/work/DecisionFork.jsx", error: String((e && e.message) || e) }); }

// components/work/Pipeline.jsx
try { (() => {
function Pipeline({
  steps = [],
  wrap,
  vertical,
  note
}) {
  const cls = "hm-pipeline" + (wrap ? " hm-pipeline--wrap" : "") + (vertical ? " hm-pipeline--vertical" : "");
  return /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("ol", {
    className: cls,
    style: {
      "--n": steps.length
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-pipeline-num"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    className: "hm-pipeline-title"
  }, typeof s === "string" ? s : s.title), s.detail ? /*#__PURE__*/React.createElement("span", {
    className: "hm-pipeline-detail"
  }, s.detail) : null))), note ? /*#__PURE__*/React.createElement("figcaption", {
    className: "hm-figure-note"
  }, note) : null);
}
Object.assign(__ds_scope, { Pipeline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/work/Pipeline.jsx", error: String((e && e.message) || e) }); }

// components/work/SpecList.jsx
try { (() => {
function SpecList({
  items = [],
  stacked,
  columns
}) {
  if (columns) return /*#__PURE__*/React.createElement("dl", {
    className: "hm-facts",
    style: {
      "--cols": columns
    }
  }, items.map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    className: "hm-fact",
    key: i
  }, /*#__PURE__*/React.createElement("dt", null, k), /*#__PURE__*/React.createElement("dd", null, v))));
  return /*#__PURE__*/React.createElement("dl", {
    className: "hm-spec" + (stacked ? " hm-spec--stacked" : "")
  }, items.map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    className: "hm-spec-row",
    key: i
  }, /*#__PURE__*/React.createElement("dt", null, k), /*#__PURE__*/React.createElement("dd", null, v))));
}
Object.assign(__ds_scope, { SpecList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/work/SpecList.jsx", error: String((e && e.message) || e) }); }

// components/work/SystemGrid.jsx
try { (() => {
function SystemCard({
  status = "Shipped working version",
  title,
  summary,
  bullets = [],
  action = "Explore the system",
  href = "#",
  onClick
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: "hm-system",
    href: href,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-status hm-status--cobalt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-status-dot",
    "aria-hidden": "true"
  }), status), /*#__PURE__*/React.createElement("h3", {
    className: "hm-h4",
    style: {
      fontSize: 20
    }
  }, title), /*#__PURE__*/React.createElement("p", null, summary), bullets.length ? /*#__PURE__*/React.createElement("ul", {
    className: "hm-bullets"
  }, bullets.map(b => /*#__PURE__*/React.createElement("li", {
    key: b
  }, b))) : null, /*#__PURE__*/React.createElement("span", {
    className: "hm-system-action"
  }, action, /*#__PURE__*/React.createElement("span", {
    className: "hm-button-icon",
    "aria-hidden": "true"
  }, "\u2192")));
}
function SystemGrid({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hm-systems"
  }, children);
}
Object.assign(__ds_scope, { SystemCard, SystemGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/work/SystemGrid.jsx", error: String((e && e.message) || e) }); }

// components/work/Timeline.jsx
try { (() => {
function Timeline({
  items = []
}) {
  return /*#__PURE__*/React.createElement("ol", {
    className: "hm-timeline"
  }, items.map(([y, e]) => /*#__PURE__*/React.createElement("li", {
    key: y + e,
    "data-now": y === "Now"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-timeline-year"
  }, y), /*#__PURE__*/React.createElement("span", {
    className: "hm-timeline-event"
  }, e))));
}
function MetricStrip({
  items = []
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hm-metrics"
  }, items.map(([v, l]) => /*#__PURE__*/React.createElement("div", {
    className: "hm-metric",
    key: l
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-metric-value"
  }, v), /*#__PURE__*/React.createElement("span", {
    className: "hm-metric-label"
  }, l))));
}
function Note({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hm-note"
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "hm-label hm-label--cobalt"
  }, label) : null, children);
}
Object.assign(__ds_scope, { Timeline, MetricStrip, Note });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/work/Timeline.jsx", error: String((e && e.message) || e) }); }

// components/work/WorkRow.jsx
try { (() => {
function WorkRow({
  index,
  title,
  meta,
  summary,
  children,
  href,
  defaultOpen = false,
  onClick
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  if (href || onClick) {
    return /*#__PURE__*/React.createElement("div", {
      className: "hm-row hm-row--link"
    }, /*#__PURE__*/React.createElement("a", {
      className: "hm-row-trigger",
      href: href || "#",
      onClick: onClick
    }, /*#__PURE__*/React.createElement("span", {
      className: "hm-row-num"
    }, index), /*#__PURE__*/React.createElement("span", {
      className: "hm-row-title"
    }, title), /*#__PURE__*/React.createElement("span", {
      className: "hm-row-meta"
    }, meta), /*#__PURE__*/React.createElement("span", {
      className: "hm-row-toggle",
      "aria-hidden": "true"
    }, "\u2197")), summary ? /*#__PURE__*/React.createElement("div", {
      className: "hm-grid",
      style: {
        display: "grid",
        gridTemplateColumns: "56px minmax(0,1fr)",
        columnGap: 20
      }
    }, /*#__PURE__*/React.createElement("p", {
      className: "hm-row-summary",
      style: {
        gridColumn: 2
      }
    }, summary)) : null);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "hm-row",
    "data-open": open
  }, /*#__PURE__*/React.createElement("button", {
    className: "hm-row-trigger",
    "aria-expanded": open,
    onClick: () => setOpen(!open)
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-row-num"
  }, index), /*#__PURE__*/React.createElement("span", {
    className: "hm-row-title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "hm-row-meta"
  }, meta), /*#__PURE__*/React.createElement("span", {
    className: "hm-row-toggle",
    "aria-hidden": "true"
  }, "+")), open ? /*#__PURE__*/React.createElement("div", {
    className: "hm-row-panel"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("div", {
    className: "hm-row-panel-body"
  }, children)) : null);
}
function WorkRows({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hm-rows"
  }, children);
}
Object.assign(__ds_scope, { WorkRow, WorkRows });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/work/WorkRow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/CaseStudy.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CaseStudyScreen = ({
  go
}) => {
  const {
    PageHeader,
    SpecList,
    MetricStrip,
    Pipeline,
    DecisionFork,
    Label,
    Note,
    ArrowLink
  } = HM;
  const C = window.HM_DATA.caseStudy;
  const toc = [["problem", "Problem"], ["architecture", "Architecture"], ["decisions", "Decisions"], ["verification", "Verification"], ["reflection", "Reflection"]];
  const Block = ({
    id,
    n,
    label,
    title,
    children
  }) => /*#__PURE__*/React.createElement("section", {
    id: id,
    className: "hm-block"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-section-num"
  }, n), /*#__PURE__*/React.createElement("span", {
    className: "hm-label hm-label--ink"
  }, label)), title ? /*#__PURE__*/React.createElement("h2", {
    className: "hm-h2"
  }, title) : null, children);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    label: "Case study",
    title: C.title,
    intro: C.subtitle,
    actions: /*#__PURE__*/React.createElement(ArrowLink, {
      href: "#",
      arrow: "\u2190",
      tone: "ink",
      onClick: linkTo(go, "work"),
      style: {
        flexDirection: "row-reverse"
      }
    }, "Back to Work")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(SpecList, {
    columns: 3,
    items: [["Company", C.company], ["Period", C.period], ["Role", C.role]]
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hm-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement(MetricStrip, {
    items: C.metrics
  })), /*#__PURE__*/React.createElement("nav", {
    className: "hm-toc",
    style: {
      marginTop: 40
    },
    "aria-label": "On this page"
  }, toc.map(([id, l], i) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: "#" + id,
    onClick: scrollToId(id)
  }, /*#__PURE__*/React.createElement("span", null, "0" + (i + 1)), l))), /*#__PURE__*/React.createElement(Block, {
    id: "problem",
    n: "01",
    label: "Problem",
    title: "Fluent text was not the bottleneck."
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-split"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hm-prose",
    style: {
      fontSize: 18,
      color: "var(--graphite)"
    }
  }, C.problem), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Constraints"), /*#__PURE__*/React.createElement("ul", {
    className: "hm-bullets"
  }, C.constraints.map(c => /*#__PURE__*/React.createElement("li", {
    key: c
  }, c)))))), /*#__PURE__*/React.createElement(Block, {
    id: "architecture",
    n: "02",
    label: "Architecture",
    title: "Thirteen explicit stages, from survey data to native PPTX."
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-figure"
  }, /*#__PURE__*/React.createElement(Pipeline, {
    wrap: true,
    steps: C.architecture,
    note: "Public, simplified architecture. Private prompts and implementation details omitted."
  }))), /*#__PURE__*/React.createElement(Block, {
    id: "decisions",
    n: "03",
    label: "Decisions",
    title: "Three forks that shaped the system."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 20
    }
  }, C.decisions.map((d, i) => /*#__PURE__*/React.createElement(DecisionFork, _extends({
    key: d.title,
    index: "0" + (i + 1)
  }, d, {
    chosen: 1
  }))))), /*#__PURE__*/React.createElement(Block, {
    id: "verification",
    n: "04",
    label: "Verification",
    title: "Checked, traced and recoverable."
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-split hm-split--even"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 12,
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "hm-h4"
  }, "Evaluation"), /*#__PURE__*/React.createElement("ul", {
    className: "hm-bullets"
  }, C.evaluation.map(x => /*#__PURE__*/React.createElement("li", {
    key: x
  }, x)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 12,
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "hm-h4"
  }, "Observability"), /*#__PURE__*/React.createElement("ul", {
    className: "hm-bullets"
  }, C.observability.map(x => /*#__PURE__*/React.createElement("li", {
    key: x
  }, x)))))), /*#__PURE__*/React.createElement(Block, {
    id: "reflection",
    n: "05",
    label: "Reflection"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hm-quote",
    style: {
      maxWidth: "44ch"
    }
  }, C.reflection), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement(Note, {
    label: "Confidentiality"
  }, "Private prompts, customer data, internal traces, and proprietary implementation details are omitted.")))));
};
window.CaseStudyScreen = CaseStudyScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/CaseStudy.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Home.jsx
try { (() => {
const Card3 = ({
  items
}) => /*#__PURE__*/React.createElement("div", {
  className: "hm-cols-3"
}, items.map(([t, b], i) => /*#__PURE__*/React.createElement("div", {
  key: t,
  style: {
    display: "grid",
    gap: 10,
    alignContent: "start",
    borderTop: "2px solid var(--cobalt)",
    paddingTop: 16
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "hm-row-num"
}, "0" + (i + 1)), /*#__PURE__*/React.createElement("h3", {
  className: "hm-h4"
}, t), /*#__PURE__*/React.createElement("p", {
  style: {
    color: "var(--graphite-soft)",
    fontSize: 15,
    lineHeight: 1.6
  }
}, b))));
const HomeScreen = ({
  go
}) => {
  const {
    Button,
    ArrowLink,
    Label,
    Status,
    Portrait,
    SpecList,
    Section,
    Pipeline,
    WorkRows,
    WorkRow,
    SystemGrid,
    SystemCard,
    Timeline,
    ContactBlock
  } = HM;
  const D = window.HM_DATA;
  const [lead, ...rest] = D.selected;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "hm-wrap",
    style: {
      paddingTop: "clamp(40px,5vw,72px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-hero-id"
  }, /*#__PURE__*/React.createElement(Portrait, {
    src: "../../assets/himadri-portrait.png",
    size: 56
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: "-0.01em"
    }
  }, "Himadri Mishra"), /*#__PURE__*/React.createElement(Label, null, "Remote, India"))), /*#__PURE__*/React.createElement("h1", {
    className: "hm-role"
  }, "Agent Experience Engineer", /*#__PURE__*/React.createElement("span", {
    className: "hm-role-sep",
    "aria-hidden": "true"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "hm-accent"
  }, "AI Product Engineer")), /*#__PURE__*/React.createElement("p", {
    className: "hm-display hm-hero-statement"
  }, "I build tools agents can find and use."), /*#__PURE__*/React.createElement("div", {
    className: "hm-hero-foot"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hm-lead"
  }, "I ship the access, evaluation and reporting systems behind them. My background in ML infrastructure, search and computer vision keeps that work grounded in reliability, latency and cost."), /*#__PURE__*/React.createElement("div", {
    className: "hm-page-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "\u2193",
    iconDir: "down",
    href: "#selected",
    onClick: scrollToId("selected")
  }, "Selected engineering"), /*#__PURE__*/React.createElement(Button, {
    href: "mailto:" + D.email
  }, "Email Himadri"), /*#__PURE__*/React.createElement(ArrowLink, {
    tone: "ink",
    href: "#",
    arrow: "\u2197"
  }, "Resume PDF"))), /*#__PURE__*/React.createElement("aside", {
    className: "hm-ship",
    "aria-label": "Recently shipped"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-ship-head"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-label hm-label--ink"
  }, "Recently shipped"), /*#__PURE__*/React.createElement("span", {
    className: "hm-tab-count"
  }, "2025\u20132026")), /*#__PURE__*/React.createElement(ArrowLink, {
    href: "#",
    onClick: linkTo(go, "work")
  }, "All engineering work")), /*#__PURE__*/React.createElement("ol", {
    className: "hm-ship-list"
  }, D.selected.map((w, i) => /*#__PURE__*/React.createElement("li", {
    key: w.title
  }, /*#__PURE__*/React.createElement("a", {
    href: "#selected",
    onClick: scrollToId("selected")
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-ship-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-row-num"
  }, "0" + (i + 1)), /*#__PURE__*/React.createElement(Status, null, w.category.split(" · ")[0])), /*#__PURE__*/React.createElement("span", {
    className: "hm-ship-title"
  }, w.title), /*#__PURE__*/React.createElement("span", {
    className: "hm-ship-eng"
  }, w.engineering), /*#__PURE__*/React.createElement("span", {
    className: "hm-ship-go"
  }, "Read more", /*#__PURE__*/React.createElement("span", {
    className: "hm-button-icon",
    "aria-hidden": "true"
  }, "\u2192")))))))), /*#__PURE__*/React.createElement(Section, {
    id: "selected",
    index: "01",
    label: "Selected engineering",
    title: "Agent systems I have built.",
    aside: /*#__PURE__*/React.createElement(ArrowLink, {
      href: "#",
      onClick: linkTo(go, "work")
    }, "All engineering work")
  }, /*#__PURE__*/React.createElement("article", {
    className: "hm-split"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Status, null, lead.category), /*#__PURE__*/React.createElement("h3", {
    className: "hm-h2",
    style: {
      fontWeight: 500,
      letterSpacing: "-0.028em"
    }
  }, lead.title), /*#__PURE__*/React.createElement("p", {
    className: "hm-prose"
  }, lead.summary), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--muted)",
      lineHeight: 1.55
    }
  }, lead.engineering), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ArrowLink, {
    href: "#",
    onClick: linkTo(go, "work")
  }, lead.linkLabel)), /*#__PURE__*/React.createElement(Label, {
    plain: true
  }, D.label)), /*#__PURE__*/React.createElement("div", {
    className: "hm-figure"
  }, /*#__PURE__*/React.createElement(Label, {
    tone: "ink",
    style: {
      display: "flex",
      marginBottom: 22
    }
  }, "Inside the evaluation"), /*#__PURE__*/React.createElement(Pipeline, {
    vertical: true,
    steps: [{
      title: "Encode the starting state",
      detail: "Installation, access and available tools"
    }, {
      title: "Compare matched journeys",
      detail: "Control and treatment, across clients"
    }, {
      title: "Inspect the outcome",
      detail: "Tool choice, task completion and failures"
    }],
    note: "Simplified method illustration, not a production trace."
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement(WorkRows, null, rest.map((w, i) => /*#__PURE__*/React.createElement(WorkRow, {
    key: w.title,
    index: "0" + (i + 2),
    title: w.title,
    meta: w.category
  }, /*#__PURE__*/React.createElement("p", {
    className: "hm-prose"
  }, w.summary), /*#__PURE__*/React.createElement("p", {
    className: "hm-row-eng"
  }, w.engineering), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ArrowLink, {
    href: "#",
    onClick: linkTo(go, "work")
  }, w.linkLabel))))))), /*#__PURE__*/React.createElement(Section, {
    index: "02",
    label: "Shipped systems",
    title: "More shipped agent systems.",
    intro: "Explore the implementation and engineering decisions behind each system."
  }, /*#__PURE__*/React.createElement(SystemGrid, null, D.systems.map(s => /*#__PURE__*/React.createElement(SystemCard, {
    key: s.title,
    title: s.title,
    summary: s.summary,
    bullets: s.work,
    onClick: linkTo(go, "work")
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 20,
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Label, {
    plain: true
  }, D.reviewedLabel), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "\u2192",
    href: "#",
    onClick: linkTo(go, "work")
  }, "View all engineering work"))), /*#__PURE__*/React.createElement(Section, {
    index: "03",
    label: "Public work",
    title: "Writing and open-source work.",
    aside: /*#__PURE__*/React.createElement(ArrowLink, {
      href: "#",
      onClick: linkTo(go, "notes")
    }, "Field notes")
  }, /*#__PURE__*/React.createElement(WorkRows, null, D.publicProjects.map((p, i) => /*#__PURE__*/React.createElement(WorkRow, {
    key: p.title,
    index: "0" + (i + 1),
    title: p.title,
    meta: p.status,
    summary: p.summary,
    href: p.href
  })))), /*#__PURE__*/React.createElement(Section, {
    index: "04",
    label: "Approach",
    title: "How I work with teams."
  }, /*#__PURE__*/React.createElement(Card3, {
    items: D.approach
  })), /*#__PURE__*/React.createElement(Section, {
    index: "05",
    label: "Background",
    title: "Where the work comes from.",
    aside: /*#__PURE__*/React.createElement(ArrowLink, {
      href: "#",
      onClick: linkTo(go, "about")
    }, "More about me")
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-split",
    style: {
      gridTemplateColumns: "minmax(0,4fr) minmax(0,8fr)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "hm-prose",
    style: {
      fontSize: 16
    }
  }, D.about.summary), /*#__PURE__*/React.createElement(Timeline, {
    items: D.timeline.slice(3)
  }))), /*#__PURE__*/React.createElement(Section, {
    index: "06",
    label: "Contact",
    title: "Send me what you are building.",
    intro: "Architecture reviews, agent-facing developer infrastructure, AI product workflows, platform reliability."
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-contact-split"
  }, /*#__PURE__*/React.createElement(ContactBlock, {
    channels: false
  }), /*#__PURE__*/React.createElement("ul", {
    className: "hm-contact-list"
  }, [["GitHub", "hmishra2250", "https://github.com/hmishra2250"], ["LinkedIn", "in/hmishra2250", "https://linkedin.com/in/hmishra2250"], ["X", "@hmishra2250", "https://x.com/hmishra2250"], ["Resume", "PDF, one page", "#"]].map(([k, v, href]) => /*#__PURE__*/React.createElement("li", {
    key: k
  }, /*#__PURE__*/React.createElement("a", {
    href: href
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-label"
  }, k), /*#__PURE__*/React.createElement("span", null, v), /*#__PURE__*/React.createElement("span", {
    className: "hm-button-icon",
    "aria-hidden": "true"
  }, "\u2197"))))))));
};
Object.assign(window, {
  HomeScreen,
  Card3
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Pages.jsx
try { (() => {
const AboutScreen = ({
  go
}) => {
  const {
    PageHeader,
    Portrait,
    Section,
    Timeline,
    Button,
    ArrowLink,
    SpecList
  } = HM;
  const D = window.HM_DATA;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    label: "About",
    title: "The work between a request and a useful result.",
    intro: D.about.intro,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      href: "#",
      onClick: linkTo(go, "work"),
      icon: "\u2192"
    }, "Review selected work"), /*#__PURE__*/React.createElement(ArrowLink, {
      href: "#",
      onClick: linkTo(go, "notes"),
      tone: "ink"
    }, "Read technical notes"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "hm-wrap",
    style: {
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-split",
    style: {
      gridTemplateColumns: "minmax(0,4fr) minmax(0,8fr)"
    }
  }, /*#__PURE__*/React.createElement(Portrait, {
    src: "../../assets/himadri-portrait.png",
    size: 360
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 20,
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "hm-lead"
  }, D.about.summary), /*#__PURE__*/React.createElement(SpecList, {
    items: [["Role", "Agent Experience Engineer and AI Product Engineer"], ["Based", "Remote, India"], ["Education", "IIT-BHU Varanasi, Dual Degree in Computer Science"], ["Writing", /*#__PURE__*/React.createElement("a", {
      href: "https://agentexperience.tech/"
    }, "Agent Experience field guide \u2197")]]
  })))), /*#__PURE__*/React.createElement(Section, {
    index: "01",
    label: "Background",
    title: "Where the work comes from.",
    intro: "Public historical roles establish the proof base. Current-client work is summarized only as broad capability themes."
  }, /*#__PURE__*/React.createElement(Timeline, {
    items: D.timeline
  })), /*#__PURE__*/React.createElement(Section, {
    index: "02",
    label: "Approach",
    title: "How I work with teams.",
    intro: "These are the practical habits I bring to AI systems, developer infrastructure, and platform reliability work."
  }, /*#__PURE__*/React.createElement(Card3, {
    items: D.approach
  })), /*#__PURE__*/React.createElement(Section, {
    index: "03",
    label: "Principles",
    title: "What I hold myself to."
  }, /*#__PURE__*/React.createElement(Card3, {
    items: D.principles
  })));
};
const NotesScreen = ({
  go
}) => {
  const {
    PageHeader,
    Label,
    ArrowLink,
    Note
  } = HM;
  const D = window.HM_DATA;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    label: "Notes",
    title: "Field notes on production AI systems.",
    intro: "Short, public-safe notes about agent architecture, evaluation, observability, and cost control. Each note stays tied to approved proof metadata and labels sanitized or synthetic artifacts clearly.",
    actions: /*#__PURE__*/React.createElement(ArrowLink, {
      href: "https://agentexperience.tech/",
      arrow: "\u2197"
    }, "Read the Agent Experience field guide")
  }), /*#__PURE__*/React.createElement("div", {
    className: "hm-wrap",
    style: {
      marginTop: 56
    }
  }, D.notes.map((n, i) => /*#__PURE__*/React.createElement("article", {
    key: n.title,
    style: {
      padding: "32px 0 40px",
      borderTop: i === 0 ? "1px solid var(--graphite)" : "1px solid var(--hairline-strong)",
      display: "grid",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-section-num"
  }, "0" + (i + 1)), /*#__PURE__*/React.createElement(Label, null, "Public note")), /*#__PURE__*/React.createElement("h2", {
    className: "hm-h2",
    style: {
      maxWidth: "26ch"
    }
  }, n.title), /*#__PURE__*/React.createElement("div", {
    className: "hm-split"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "hm-lead"
  }, n.dek), n.body.map(p => /*#__PURE__*/React.createElement("p", {
    key: p,
    className: "hm-prose"
  }, p)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "4px 28px"
    }
  }, n.links.map((l, j) => /*#__PURE__*/React.createElement(ArrowLink, {
    key: l,
    href: "#",
    onClick: linkTo(go, j === 0 && i === 0 ? "about" : "case")
  }, l)))), /*#__PURE__*/React.createElement(Note, {
    label: "Artifact"
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      color: "var(--graphite)",
      fontWeight: 500,
      marginBottom: 6
    }
  }, n.artifact[0]), n.artifact[1])))), /*#__PURE__*/React.createElement("p", {
    style: {
      borderTop: "1px solid var(--hairline)",
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement(Label, {
    plain: true
  }, D.notePublicLabel))));
};
const ContactScreen = () => {
  const {
    PageHeader,
    Section,
    ContactBlock,
    Note
  } = HM;
  const D = window.HM_DATA;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    label: "Contact",
    title: "Tell me about your project.",
    intro: "Reach out for AI systems architecture, agent-facing developer infrastructure, AI product workflow, or platform reliability conversations."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(ContactBlock, null))), /*#__PURE__*/React.createElement(Section, {
    index: "01",
    label: "Before you write",
    title: "Useful context to include.",
    intro: "A concise first message helps determine whether the work is a fit."
  }, /*#__PURE__*/React.createElement(Card3, {
    items: D.contactPaths
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement(Note, {
    label: "Please leave out"
  }, "Secrets, customer data, proprietary prompts, private traces, or credentials."))));
};
Object.assign(window, {
  AboutScreen,
  NotesScreen,
  ContactScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Pages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Shell.jsx
try { (() => {
const HM = window.HimadriDevDesignSystem_af224d;
const NAV = [{
  label: "Work",
  id: "work"
}, {
  label: "Notes",
  id: "notes"
}, {
  label: "About",
  id: "about"
}, {
  label: "Contact",
  id: "contact"
}];
const Page = ({
  id,
  go,
  children
}) => {
  const {
    SiteHeader,
    SiteFooter
  } = HM;
  const active = id === "case" ? "work" : id;
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": id,
    style: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    links: NAV,
    active: active,
    onNavigate: go
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1
    }
  }, children), /*#__PURE__*/React.createElement(SiteFooter, {
    onNavigate: go,
    pages: [{
      label: "Home",
      id: "home"
    }, ...NAV, {
      label: "Case study",
      id: "case"
    }],
    elsewhere: [{
      label: "GitHub",
      href: "https://github.com/hmishra2250",
      external: true
    }, {
      label: "LinkedIn",
      href: "https://linkedin.com/in/hmishra2250",
      external: true
    }, {
      label: "X / Twitter",
      href: "https://x.com/hmishra2250",
      external: true
    }, {
      label: "Agent Experience",
      href: "https://agentexperience.tech/",
      external: true
    }]
  }));
};
const linkTo = (go, id) => e => {
  e.preventDefault();
  go(id);
};
const scrollToId = id => e => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 72,
    behavior: "smooth"
  });
};
Object.assign(window, {
  HM,
  NAV,
  Page,
  linkTo,
  scrollToId
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Work.jsx
try { (() => {
const WorkRecord = ({
  r,
  n
}) => {
  const {
    Status,
    SpecList
  } = HM;
  return /*#__PURE__*/React.createElement("article", {
    className: "hm-split",
    style: {
      padding: "32px 0",
      borderBottom: "1px solid var(--hairline-strong)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 14,
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-row-num"
  }, n), /*#__PURE__*/React.createElement(Status, {
    tone: r.tone || "cobalt"
  }, r.status)), /*#__PURE__*/React.createElement("h3", {
    className: "hm-h3"
  }, r.title), /*#__PURE__*/React.createElement("p", {
    className: "hm-prose",
    style: {
      fontSize: 16
    }
  }, r.summary), /*#__PURE__*/React.createElement("ul", {
    className: "hm-bullets"
  }, r.details.map(d => /*#__PURE__*/React.createElement("li", {
    key: d
  }, d)))), /*#__PURE__*/React.createElement(SpecList, {
    stacked: true,
    items: [r.impact ? ["Impact", r.impact] : null, r.measurement ? ["How it was checked", r.measurement] : null, ["Scope", r.limitations]].filter(Boolean)
  }));
};
const WorkScreen = ({
  go
}) => {
  const {
    PageHeader,
    Tabs,
    Label,
    WorkRows,
    WorkRow,
    MetricStrip,
    ArrowLink
  } = HM;
  const D = window.HM_DATA;
  const [f, setF] = React.useState("all");
  const groups = [{
    id: "ax",
    label: "Agent experience",
    count: D.methods.length,
    title: "Tools, access and evaluation for agents.",
    intro: "Each record pairs the design and implementation with its impact, how it was checked, and its limit."
  }, {
    id: "ai",
    label: "AI products",
    count: D.systems.length,
    title: "Shipped AI products.",
    intro: D.reviewedLabel
  }, {
    id: "public",
    label: "Public work",
    count: D.publicProjects.length,
    title: "Published in the open."
  }, {
    id: "earlier",
    label: "Earlier work",
    count: D.earlier.length,
    title: "Earlier work.",
    intro: "My background in AI reporting, ML infrastructure and computer vision."
  }];
  const show = id => f === "all" || f === id;
  const Head = ({
    g
  }) => /*#__PURE__*/React.createElement("div", {
    className: "hm-section-head",
    style: {
      marginTop: 64,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-section-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-label hm-label--ink"
  }, g.label), /*#__PURE__*/React.createElement("span", {
    className: "hm-tab-count"
  }, g.count, " records")), /*#__PURE__*/React.createElement("h2", {
    className: "hm-h2"
  }, g.title), g.intro ? /*#__PURE__*/React.createElement("p", {
    className: "hm-section-intro"
  }, g.intro) : null);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    label: "Work",
    title: "The engineering record.",
    intro: "Recent agent tools and AI products, with test results and a short record of my earlier work."
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--muted)"
    }
  }, D.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 64,
      zIndex: 5,
      background: "rgba(246,247,248,0.95)",
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-wrap"
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: f,
    onChange: setF,
    items: [{
      id: "all",
      label: "All",
      count: groups.reduce((a, g) => a + g.count, 0)
    }, ...groups]
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hm-wrap"
  }, show("ax") ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Head, {
    g: groups[0]
  }), /*#__PURE__*/React.createElement("div", null, D.methods.map((m, i) => /*#__PURE__*/React.createElement(WorkRecord, {
    key: m.title,
    r: m,
    n: "A" + (i + 1)
  })))) : null, show("ai") ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Head, {
    g: groups[1]
  }), /*#__PURE__*/React.createElement("div", null, D.systems.map((s, i) => /*#__PURE__*/React.createElement(WorkRecord, {
    key: s.title,
    r: {
      status: "Shipped working version",
      title: s.title,
      summary: s.summary,
      details: s.work,
      limitations: s.limitations
    },
    n: "P" + (i + 1)
  })))) : null, show("public") ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Head, {
    g: groups[2]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(WorkRows, null, D.publicProjects.map((p, i) => /*#__PURE__*/React.createElement(WorkRow, {
    key: p.title,
    index: "0" + (i + 1),
    title: p.title,
    meta: p.status,
    summary: p.summary,
    href: p.href
  }))))) : null, show("earlier") ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Head, {
    g: groups[3]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(WorkRows, null, D.earlier.map((e, i) => /*#__PURE__*/React.createElement(WorkRow, {
    key: e.slug,
    index: e.period,
    title: e.title,
    meta: e.company,
    defaultOpen: i === 0
  }, /*#__PURE__*/React.createElement("p", {
    className: "hm-prose"
  }, e.summary), /*#__PURE__*/React.createElement(MetricStrip, {
    items: e.metrics
  }), e.hasCase ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ArrowLink, {
    href: "#",
    onClick: linkTo(go, "case")
  }, "Read the case study")) : null))))) : null));
};
window.WorkScreen = WorkScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Work.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/data.js
try { (() => {
window.HM_DATA = {
  "label": "Anonymized engineering summary; underlying work is private.",
  "reviewedLabel": "Anonymized implementation summary; underlying code is private.",
  "email": "himadri.jobhunt@gmail.com",
  "positioning": "I build AI products and agent-facing tools, connecting discovery, access, execution, evaluation and recovery. My background in ML infrastructure, search and computer vision keeps that work grounded in reliability, latency and cost.",
  "summary": "I build tools agents can find and use. I ship the access, evaluation and reporting systems behind them.",
  "selected": [{
    "category": "Shipped evaluation platform · completed studies",
    "title": "Agent journeys, encoded as state.",
    "summary": "I turned onboarding journeys into executable capability states, then used them to compare tool routing and task completion across agent clients. I built the evaluation infrastructure, state-matched router cards and evidence capture needed to inspect which journeys worked better.",
    "engineering": "Capability-state contracts, multi-client harnesses, matched A/B tasks and trace-backed outcome checks.",
    "linkLabel": "Explore the evaluation engineering"
  }, {
    "category": "Shipped system",
    "title": "MCP access and onboarding.",
    "summary": "I shipped hosted MCP authentication across account-connected, search-only and keyless entry points, connecting authorization, token lifecycle and CLI setup with explicit recovery paths.",
    "engineering": "OAuth, scoped access, headless setup, token and grant lifecycle, actionable recovery.",
    "linkLabel": "Explore access and recovery"
  }, {
    "category": "Shipped measurement and reporting",
    "title": "From discovery to grounded insights.",
    "summary": "I built measurement for whether agents could find, retrieve and use a product, then built evidence-grounded insight reporting on top of those observations. The work connects evaluation banks and retrieval probes to synthesis, validation and recoverable reporting.",
    "engineering": "Category, developer and goal-led evaluations, retrieval APIs, evidence bindings and checkpoint recovery.",
    "linkLabel": "Explore measurement and insights"
  }],
  "systems": [{
    "title": "Agent delivery platform",
    "summary": "I built and shipped a working agent delivery platform, moving tasks through execution, artifact review and human approval.",
    "work": ["Tracked runs, outputs, approvals and review decisions in shared state.", "Connected MCP tools to a web interface for reviewing the work.", "Added tests and docs for handoff and recovery."],
    "limitations": "Runs tasks and supports review. A person still approves the result."
  }, {
    "title": "Coding-agent browser QA safeguards",
    "summary": "I implemented and shipped coding-agent safeguards: when browser checks should stop, what evidence to retain, and how a reviewer picks up the work.",
    "work": ["Added guards against repeated actions and leaving the allowed website.", "Kept run traces and budget context for reviewers.", "Kept generated outputs when browser checks needed follow-up."],
    "limitations": "These safeguards are my work within a larger coding-agent system."
  }, {
    "title": "Governed knowledge MCP service",
    "summary": "I built and shipped a read-only interface for agents to retrieve structured knowledge and propose changes without granting them write access.",
    "work": ["Let agents read structured knowledge through MCP.", "Built repository scans and CI checks.", "Let agents propose updates without write access."],
    "limitations": "Some checks need private access. The full service cannot be reproduced publicly."
  }],
  "methods": [{
    "status": "Completed experiments",
    "tone": "green",
    "title": "Capability-aware router cards",
    "summary": "I built and evaluated router cards that matched an agent's available tools and access. The goal was useful tool choice and task completion, not simply more tool calls.",
    "details": ["Matched card content to capability state, with explicit controls for user intent.", "Compared cards against no-card baselines on paired tasks, while letting each client discover tools through its normal path.", "Used routing, completion, safety and answer-quality checks to keep useful changes and reject ineffective or harmful defaults."],
    "impact": "Observed better tool routing and task completion in the controlled study. The evaluation also showed why greater tool use alone was not a useful success measure.",
    "measurement": "Compared correct tool choice and completed tasks across matched setups. Reviewed safety and answer quality separately rather than folding them into tool-call counts.",
    "limitations": "The observed gain was directional, not statistically conclusive or a production conversion result."
  }, {
    "status": "Shipped system",
    "title": "Production MCP access and OAuth onboarding",
    "summary": "I shipped the cross-service access flow for hosted MCP, from account connection to usable tools. Connected accounts, search-only access and keyless trials needed different authorization paths.",
    "details": ["Connected web OAuth, token and grant lifecycle, MCP profiles, backend authorization and CLI setup.", "Separated interactive account connection from headless access and limited trials, rather than treating every client as a browser login.", "Added recovery guidance for blocked credentials, permissions and unsupported client capabilities."],
    "impact": "Put distinct access paths into live onboarding, with permission boundaries and recovery steps carried through the flow rather than left to manual setup.",
    "measurement": "Checked account connection, credential handling and permitted tool access across the supported paths. Live onboarding use confirms delivery, not a conversion lift.",
    "limitations": "Production delivery and onboarding use are supported; signup improvement is not claimed."
  }, {
    "status": "Shipped system",
    "title": "Discovery and retrieval evaluation system",
    "summary": "I built the evaluation layer for whether agents can find a product, retrieve its content and use it. Each stage needed its own evidence, not a single visibility score.",
    "details": ["Built versioned category, developer and goal-based test banks, deterministic retrieval probes, APIs and dashboard views.", "Kept eligible test cases, missing observations, citations and actual tool use separate in the results.", "Connected the evidence to reporting so a finding could point to the failed stage, not just an aggregate score."],
    "impact": "Made discovery and retrieval failures easier to locate. Teams could tell missing evidence apart from failed retrieval or a tool that was found but never used.",
    "measurement": "Tracked discovery observations, retrieval checks, source citations and tool calls against their eligible test cases. Missing results stayed visible instead of disappearing from the summary.",
    "limitations": "These checks measure access and use, not traffic, adoption or revenue growth."
  }, {
    "status": "Shipped platform",
    "title": "Cross-client agent evaluation platform",
    "summary": "I built the harness infrastructure for agent experience (AX) testing, so the same product journey could run across different clients and models under controlled A/B conditions.",
    "details": ["Built client adapters and shared experiment contracts, with client-specific connections and evidence parsing.", "Encoded control and treatment runs with matched tasks, fixed fixtures and recorded runtime versions.", "Added statistical checks and failure accounting to separate product behavior from setup errors, incomplete pairs and invalid runs."],
    "impact": "Made cross-client comparisons repeatable and inspectable, rather than a collection of one-off demos. Teams could distinguish a product failure from a broken test setup.",
    "measurement": "Compared matched runs using saved evidence, completion checks and failure categories. Client connection support stayed explicit instead of assuming all adapters behaved alike.",
    "limitations": "Results apply to the tested clients and supported connection types."
  }, {
    "status": "Implemented evaluation",
    "tone": "violet",
    "title": "Executable journeys for agent A/B tests",
    "summary": "I introduced the idea of treating onboarding as executable capability state. An experiment could then start from what an agent could actually access, not assume setup had worked.",
    "details": ["Encoded installation, authentication, skills, MCP, plugins and read access as explicit states.", "Built state-matched payload selection and readiness checks so each test received the tools and guidance its setup allowed.", "Managed setup and cleanup to reproduce alternate journeys and inspect where their capabilities differed."],
    "impact": "Turned onboarding paths into testable inputs. This made it possible to compare journey designs without confusing access differences with agent performance.",
    "measurement": "Checked readiness and state-matched behavior before comparing control and treatment runs. Kept paused paths and no-card paths visible in the inventory.",
    "limitations": "Mapped coverage is not a claim that every path was tested or improved."
  }, {
    "status": "Shipped reporting",
    "title": "Evidence-backed insight and reporting pipeline",
    "summary": "I built the pipeline that turns discovery, retrieval and journey evidence into product findings. The engineering work was keeping those findings tied to sources through synthesis, validation and recovery.",
    "details": ["Connected evidence collection with synthesis within and across test banks.", "Added deterministic validation, report storage and publication gates so findings kept their evidence bindings.", "Shipped daily reporting and implemented weekly orchestration with checkpoints to recover failed stages and reconstruct reports."],
    "impact": "Turned separate test outputs into traceable product findings. Checkpoint recovery let reporting continue from saved work instead of losing the whole run.",
    "measurement": "Checked source bindings and validation results before publication. Used shipped daily reports and recovered weekly reports as evidence of delivery and recovery.",
    "limitations": "Recovered weekly reports do not establish that every fresh weekly run completed uninterrupted."
  }],
  "publicProjects": [{
    "status": "Published guide",
    "title": "Agent Experience field guide",
    "summary": "Practical guides to discovery, tool use, evaluation and recovery, with a read-only MCP service for searching and retrieving the content.",
    "href": "https://agentexperience.tech/"
  }, {
    "status": "Draft rubric",
    "title": "Open Agent-Readiness Rubric",
    "summary": "A draft checklist for making products easier for agents to find and use, with checks for safety and recovery.",
    "href": "https://agentexperience.tech/insights/agent-readiness-rubric/"
  }, {
    "status": "Curated collection",
    "title": "Awesome Agent Experience",
    "summary": "A collection of useful tools, papers and guides on how agents find and use products.",
    "href": "https://github.com/hmishra2250/awesome-agent-experience"
  }, {
    "status": "Local experiment",
    "title": "Qwen on a consumer GPU",
    "summary": "Scripts and notes for running a large open model on a consumer GPU, with saved test results.",
    "href": "https://github.com/hmishra2250/qwen-3.6-35b-consumer-gpu"
  }],
  "earlier": [{
    "slug": "agentic-market-research-platform",
    "title": "Agentic Market Research Platform",
    "company": "Knit",
    "period": "2025–2026",
    "summary": "I built an AI workflow that turns survey data into checked reports, charts and slide decks.",
    "metrics": [["<1h", "Report turnaround, from 48–72h"], ["30–50", "Sandboxed analytics tasks per report"], ["15–25", "Charts per report"]],
    "hasCase": true
  }, {
    "slug": "ml-infra-rescue",
    "title": "ML Infrastructure Rescue",
    "company": "Epic! for Kids",
    "period": "2023–2024",
    "summary": "I took over live ML systems and reduced their cost and maintenance work.",
    "metrics": [["10x", "ML platform cost reduction"], ["100x", "Kubernetes pod usage reduction"], ["50%", "Docker build-time reduction"]]
  }, {
    "slug": "computer-vision-product-systems",
    "title": "Computer Vision Product Systems",
    "company": "Tangible Play / Osmo",
    "period": "2019–2023",
    "summary": "I built computer vision systems for worksheet recognition and interactive learning.",
    "metrics": [["93→98%", "Worksheet CV accuracy"], ["80%", "IoU, shaded-region detection"], ["99%", "Less manual tagging"]]
  }, {
    "slug": "high-performance-ar-and-vision",
    "title": "High-Performance AR and Vision",
    "company": "Whodat",
    "period": "2018–2019",
    "summary": "I worked on fast C++ vision code and depth estimation for AR.",
    "metrics": [["20%", "Faster ORB detector than the ORB-SLAM baseline"]]
  }],
  "caseStudy": {
    "title": "Agentic Market Research Platform",
    "subtitle": "Raw survey data to verified insights, charts, and consulting-grade PPTX decks.",
    "company": "Knit",
    "period": "May 2025 – April 2026",
    "role": "Senior AI Engineer / senior IC architecture for India AI workflows",
    "domains": ["LLM systems", "DAG orchestration", "Evals", "Sandbox execution", "Deck automation"],
    "problem": "Market research reporting required analysts to process survey data, write insights, generate charts, validate findings, and assemble polished decks. The bottleneck was not text generation alone; the system needed numerical correctness, artifact quality, observability, and recovery boundaries.",
    "constraints": ["Insights needed numerical correctness, not fluent guesses.", "Charts needed to be visually usable and connected to evidence.", "Reports needed consulting-grade native PowerPoint output.", "Workflow execution needed parallelism, retries, and traceability.", "Private prompts, customer data, internal traces, and proprietary implementation details must remain omitted from public discussion."],
    "architecture": ["Raw survey data", "Data ingestion and schema normalization", "Task planning", "DAG execution", "LLM Python code generation", "Sandboxed Python analysis execution", "Independent judge verification", "Insight synthesis", "Highcharts chart generation", "Visual quality scoring", "Deck intermediate representation", "HTML preview", "Native PPTX export"],
    "decisions": [{
      "title": "Free-form agents vs explicit DAG",
      "context": "The workflow needed parallel execution and reliable recovery, not just autonomous behavior.",
      "options": [{
        "label": "Free-form autonomous loop",
        "pros": ["Fast to prototype", "Flexible exploration"],
        "cons": ["Hard to debug", "Hard to parallelize", "Unclear retry boundaries"]
      }, {
        "label": "Explicit DAG execution",
        "pros": ["Deterministic dependencies", "Node-level observability", "Parallel execution", "Clear retries"],
        "cons": ["More upfront structure", "Requires domain modeling"]
      }],
      "why": "Production workflows need predictable execution and debugging more than theatrical autonomy."
    }, {
      "title": "LLM-only insights vs code-backed analysis",
      "context": "Survey analytics cannot rely on plausible natural language when denominators and filters matter.",
      "options": [{
        "label": "Ask LLM from summaries",
        "pros": ["Lower engineering complexity", "Fast response"],
        "cons": ["Hallucinated metrics", "Unsupported conclusions", "Weak audit trail"]
      }, {
        "label": "Generate and execute Python",
        "pros": ["Evidence-backed outputs", "Inspectable calculations", "Better validation hooks"],
        "cons": ["Sandboxing required", "More latency and orchestration"]
      }],
      "why": "For business reporting, numerical correctness matters more than generation convenience."
    }, {
      "title": "Self-check vs independent judge",
      "context": "A system that verifies itself can still agree with its own mistakes.",
      "options": [{
        "label": "Same-model self-check",
        "pros": ["Cheaper", "Simple"],
        "cons": ["Self-confirming errors", "Weak semantic validation"]
      }, {
        "label": "Independent judge",
        "pros": ["Recomputes evidence", "Catches silent failures", "Improves trust"],
        "cons": ["Higher cost", "More latency"]
      }],
      "why": "Verification is the difference between a demo and a production AI system."
    }],
    "evaluation": ["Independent judge agents verified each generated analysis output.", "Chart outputs passed multi-threshold quality scoring before deck assembly.", "Retry semantics were tied to task boundaries rather than vague agent state."],
    "observability": ["OpenTelemetry and Langfuse made model calls, spans, failures, and cost inspectable.", "Task-level traces exposed latency, retries, and model routing behavior.", "Generated APIs and SSE streaming made execution state visible to product surfaces."],
    "metrics": [["<1h", "Report turnaround, down from 48–72h"], ["30–50", "Sandboxed analytics tasks per report"], ["15–25", "Highcharts charts per report"], ["Multi", "Provider LLM routing on a shared Python agent platform"]],
    "reflection": "The durable lesson is that production AI systems are less about an agent loop and more about explicit boundaries: typed inputs, executable artifacts, independent verification, observability, and unit economics."
  },
  "about": {
    "title": "AI products, agent-facing tools, and the work between a request and a useful result.",
    "intro": "I work on Agent Experience (AX): can an agent use a product to finish the task a person asked for? That means connecting discovery, access, tool use, checks and human handoffs, not just making a tool call succeed.",
    "summary": "My earlier work spans automated research, ML infrastructure, search and computer vision. I bring the same questions to agentic systems: does it work, what does it cost, how does it fail, and can the next engineer operate it?"
  },
  "timeline": [["2013–2018", "IIT-BHU Varanasi, Dual Degree in Computer Science (9.28/10)"], ["2016", "Microsoft intern: dialog systems and chatbots"], ["2017", "UC Berkeley research intern: neural programmer-interpreters (Prof. Dawn Song). SN Bose Scholar."], ["2018–2019", "Whodat: built C++ ORB detector 20% faster than ORB-SLAM for AR products"], ["2019–2023", "Osmo: CV technical lead across India and US teams. 93% → 98% worksheet recognition accuracy."], ["2023–2024", "Epic! for Kids: owned ML platform after team reductions. 10x infrastructure cost reduction."], ["2025", "Kaggle top 6% globally. Open-source ML projects."], ["2025–2026", "Knit: Senior AI Engineer driving senior IC architecture for agentic market research workflows. 48–72h → <1h report turnaround."], ["Now", "Focus: AI systems architecture, agent-facing developer infrastructure, and production reliability work."]],
  "approach": [["Start with the system boundary", "Define the user promise, system state, failure modes and owner before choosing the agent pattern, model route or interface shape."], ["Make verification easy to inspect", "Separate generation from checking with executable outputs, source cards, reviewer paths and test fixtures."], ["Leave the system easier to inherit", "Deliver typed contracts, concise documentation, observable paths and decision records so the next engineer can operate the work with less context loss."]],
  "principles": [["I trace every claim to evidence", "Public pages point to approved proof, source cards, or clearly labeled representative artifacts. I do not make claims I cannot back."], ["I prefer explicit workflows", "DAGs, recovery states, evals, and logs over unstructured prompt chains. If I cannot debug it, I will not ship it."], ["I design for the next engineer", "The work only lasts when someone else can understand the contract, failure mode, and evidence trail without asking me."]],
  "notes": [{
    "title": "State is the control surface for useful agents.",
    "dek": "Autonomy works better when a system exposes state, retries, artifacts, and ownership boundaries instead of hiding them inside a chat transcript.",
    "body": ["The most useful agent interfaces I have built or reviewed make progress inspectable. Plans, tool calls, intermediate artifacts, and reviewer decisions should be visible enough that a teammate can resume the work without guessing.", "That does not make the experience less intelligent. It makes the intelligence recoverable when model behavior, data quality, or product requirements shift."],
    "artifact": ["Workflow trace sketch", "Representative sanitized workflow sketch. Customer data, private prompts, and proprietary traces omitted."],
    "links": ["Read about the operating principles", "Review the agentic workflow case study"]
  }, {
    "title": "Cost control belongs in product design, not after launch.",
    "dek": "Routing, retry budgets, cache boundaries, and judge coverage are user-experience choices when they decide whether a workflow can run reliably.",
    "body": ["Teams often discuss cost as an infrastructure cleanup. In AI products, cost is closer to interaction design because every extra retry, judge pass, sandbox setup, or premium model route changes who can use the system and how often.", "The durable pattern is to make cost tradeoffs explicit at the same layer where quality and latency tradeoffs are made."],
    "artifact": ["Cost anatomy model", "Normalized cost model. Exact company costs, vendor prices, and private dashboards omitted."],
    "links": ["Review agentic workflow tradeoffs", "Review the ML infrastructure case study"]
  }, {
    "title": "Evals should protect the business promise, not only the schema.",
    "dek": "A valid JSON object can still answer the wrong question. Evaluation has to cover intent, provenance, and the artifact a user will trust.",
    "body": ["Schema checks and execution checks are necessary, but they are not sufficient when the user cares about a decision. The verification path should know what the artifact is supposed to prove.", "For public portfolio examples, that also means marking synthetic and sanitized artifacts clearly so evidence does not imply access to private customer systems."],
    "artifact": ["Synthetic evaluation boundary", "Synthetic evaluation example. Customer data, private prompts, and internal reviewer notes omitted."],
    "links": ["Review the evaluation path", "Read the research platform case study"]
  }],
  "notePublicLabel": "Public note based on resume-backed experience and sanitized portfolio examples. Customer data, private prompts, proprietary traces, internal dashboards, and exact costs omitted.",
  "contactPaths": [["Problem shape", "Share the workflow, developer surface, or platform failure mode that needs an owner."], ["System state", "Describe what exists now: prototype, production service, internal tool, ML/search platform, or documentation path."], ["Useful outcome", "Name the artifact you need next: architecture review, implementation path, eval plan, reliability repair, or handover notes."]]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/data.js", error: String((e && e.message) || e) }); }

__ds_ns.ArrowLink = __ds_scope.ArrowLink;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.Status = __ds_scope.Status;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.ContactBlock = __ds_scope.ContactBlock;

__ds_ns.Portrait = __ds_scope.Portrait;

__ds_ns.PageHeader = __ds_scope.PageHeader;

__ds_ns.Section = __ds_scope.Section;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.DecisionFork = __ds_scope.DecisionFork;

__ds_ns.Pipeline = __ds_scope.Pipeline;

__ds_ns.SpecList = __ds_scope.SpecList;

__ds_ns.SystemCard = __ds_scope.SystemCard;

__ds_ns.SystemGrid = __ds_scope.SystemGrid;

__ds_ns.Timeline = __ds_scope.Timeline;

__ds_ns.MetricStrip = __ds_scope.MetricStrip;

__ds_ns.Note = __ds_scope.Note;

__ds_ns.WorkRow = __ds_scope.WorkRow;

__ds_ns.WorkRows = __ds_scope.WorkRows;

})();
