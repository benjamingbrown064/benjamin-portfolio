/* @ds-bundle: {"format":4,"namespace":"GovscapeDesignSystem_570c82","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"TextLink","sourcePath":"components/actions/TextLink.jsx"},{"name":"AppIcon","sourcePath":"components/brand/AppIcon.jsx"},{"name":"Kicker","sourcePath":"components/brand/Kicker.jsx"},{"name":"Lockup","sourcePath":"components/brand/Lockup.jsx"},{"name":"Mark","sourcePath":"components/brand/Mark.jsx"},{"name":"AreaCard","sourcePath":"components/data/AreaCard.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"Figure","sourcePath":"components/data/Figure.jsx"},{"name":"MoneyPair","sourcePath":"components/data/MoneyPair.jsx"},{"name":"TaskList","sourcePath":"components/data/TaskList.jsx"},{"name":"TaskRow","sourcePath":"components/data/TaskRow.jsx"},{"name":"WindowCard","sourcePath":"components/data/WindowCard.jsx"},{"name":"AdvisorDock","sourcePath":"components/feedback/AdvisorDock.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"EmptyWell","sourcePath":"components/feedback/EmptyWell.jsx"},{"name":"NextAction","sourcePath":"components/feedback/NextAction.jsx"},{"name":"Strip","sourcePath":"components/feedback/Strip.jsx"},{"name":"SystemBanner","sourcePath":"components/feedback/SystemBanner.jsx"},{"name":"AssignPicker","sourcePath":"components/forms/AssignPicker.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"SearchField","sourcePath":"components/forms/SearchField.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"},{"name":"ICONS","sourcePath":"components/icons/iconData.js"},{"name":"BigNumber","sourcePath":"components/marketing/BigNumber.jsx"},{"name":"Eyebrow","sourcePath":"components/marketing/Eyebrow.jsx"},{"name":"FrameworkTag","sourcePath":"components/marketing/FrameworkTag.jsx"},{"name":"Pillar","sourcePath":"components/marketing/Pillar.jsx"},{"name":"Rung","sourcePath":"components/marketing/Rung.jsx"},{"name":"Stat","sourcePath":"components/marketing/Stat.jsx"},{"name":"WebButton","sourcePath":"components/marketing/WebButton.jsx"},{"name":"ClientSwitcher","sourcePath":"components/navigation/ClientSwitcher.jsx"},{"name":"NavItem","sourcePath":"components/navigation/NavItem.jsx"},{"name":"Rail","sourcePath":"components/navigation/Rail.jsx"},{"name":"RailSection","sourcePath":"components/navigation/RailSection.jsx"},{"name":"WebNav","sourcePath":"components/navigation/WebNav.jsx"},{"name":"Chip","sourcePath":"components/status/Chip.jsx"},{"name":"ScoreRing","sourcePath":"components/status/ScoreRing.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"d0fb1410dd96","components/actions/TextLink.jsx":"a751b9efcff4","components/brand/AppIcon.jsx":"28a45428ce9e","components/brand/Kicker.jsx":"2e042b02d602","components/brand/Lockup.jsx":"5ac88252d6e7","components/brand/Mark.jsx":"f153bc4c7bb2","components/data/AreaCard.jsx":"3238c85b8807","components/data/Card.jsx":"0fae25b74f45","components/data/Figure.jsx":"509b23672e86","components/data/MoneyPair.jsx":"662a6eddc478","components/data/TaskList.jsx":"90cc2ec0744e","components/data/TaskRow.jsx":"c72afb66406e","components/data/WindowCard.jsx":"e0969162d745","components/feedback/AdvisorDock.jsx":"cd60b58da5ce","components/feedback/Alert.jsx":"97a9404790fc","components/feedback/EmptyWell.jsx":"6a336134a440","components/feedback/NextAction.jsx":"d06d1f9f45fb","components/feedback/Strip.jsx":"b91c56ae5ef5","components/feedback/SystemBanner.jsx":"012616e3d9d9","components/forms/AssignPicker.jsx":"65e1c07aea5e","components/forms/Checkbox.jsx":"7196c57fa1fb","components/forms/SearchField.jsx":"0ca277ef6fcc","components/icons/Icon.jsx":"051b93f37c56","components/icons/iconData.js":"7af082a53165","components/marketing/BigNumber.jsx":"2d576af9703f","components/marketing/Eyebrow.jsx":"553f696bab5c","components/marketing/FrameworkTag.jsx":"fb6ac350c24a","components/marketing/Pillar.jsx":"b6dedb25ce83","components/marketing/Rung.jsx":"fdb0425e0203","components/marketing/Stat.jsx":"8e40a4320f8a","components/marketing/WebButton.jsx":"2f6f46bf98cf","components/navigation/ClientSwitcher.jsx":"c44995393440","components/navigation/NavItem.jsx":"c4c6df8abd34","components/navigation/Rail.jsx":"8e00aa0e716f","components/navigation/RailSection.jsx":"f571b2140bbc","components/navigation/WebNav.jsx":"9a2d68ac6858","components/status/Chip.jsx":"32c576d7f0fe","components/status/ScoreRing.jsx":"6ce172b03795","ui_kits/product/App.jsx":"38886a01d407","ui_kits/product/AreaScreen.jsx":"a5cd400479f2","ui_kits/product/HomeScreen.jsx":"a02a93486681","ui_kits/product/PlanScreen.jsx":"da3fa098e537","ui_kits/product/QueueScreen.jsx":"445f74ce481e","ui_kits/product/data.jsx":"af5f6cc944f5","ui_kits/website/Hero.jsx":"5d92930f7eab","ui_kits/website/Sections.jsx":"853d94f172b0","ui_kits/website/Site.jsx":"c21863ab3b8b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GovscapeDesignSystem_570c82 = window.GovscapeDesignSystem_570c82 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Kicker.jsx
try { (() => {
/** Section kicker: red bar + tracked micro-label. Opens every section, slide and page. */
function Kicker({
  children,
  tone = "light",
  size = "md",
  style
}) {
  const lbl = tone === "dark" ? "var(--ink-muted)" : tone === "signal" ? "rgba(255,255,255,.86)" : size === "lg" ? "#fff" : "var(--muted)";
  return /*#__PURE__*/React.createElement("div", {
    className: size === "lg" ? "kick lg" : "kick",
    style: style
  }, /*#__PURE__*/React.createElement("span", {
    className: "bar",
    style: tone === "signal" ? {
      background: "#fff"
    } : undefined
  }), /*#__PURE__*/React.createElement("span", {
    className: "lbl",
    style: {
      color: lbl
    }
  }, children));
}
Object.assign(__ds_scope, { Kicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Kicker.jsx", error: String((e && e.message) || e) }); }

// components/brand/Mark.jsx
try { (() => {
/** The Govscape G monogram. Geometry copied from the brand master. Recolours via `color`. */
function Mark({
  color = "var(--signal)",
  size = 48,
  title = "Govscape",
  style
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 240 240",
    width: size,
    height: size,
    role: "img",
    "aria-label": title,
    style: {
      display: "block",
      color,
      flex: "0 0 auto",
      ...style
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "120",
    cy: "120",
    r: "74",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "46",
    strokeLinecap: "butt",
    strokeDasharray: "392 73",
    strokeDashoffset: "36.5",
    transform: "rotate(34 120 120)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "114",
    y: "97",
    width: "66",
    height: "46",
    rx: "2",
    fill: "currentColor"
  }));
}
Object.assign(__ds_scope, { Mark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Mark.jsx", error: String((e && e.message) || e) }); }

// components/brand/AppIcon.jsx
try { (() => {
function AppIcon({
  size = 78,
  background = "var(--obsidian)",
  markColor = "var(--signal)",
  bordered = false,
  shadow = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: shadow ? "appicon sh" : "appicon",
    style: {
      width: size,
      background,
      border: bordered ? "1px solid var(--line-inv)" : undefined,
      borderRadius: size < 40 ? "26%" : "23%"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Mark, {
    color: markColor,
    size: size * 0.52
  }));
}
Object.assign(__ds_scope, { AppIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/AppIcon.jsx", error: String((e && e.message) || e) }); }

// components/brand/Lockup.jsx
try { (() => {
/** Mark + wordmark, locked to the same baseline. */
function Lockup({
  layout = "horizontal",
  markColor = "var(--signal)",
  textColor = "var(--white)",
  size = 26,
  dot = false,
  wordmark = "Govscape",
  style
}) {
  const stacked = layout === "stacked";
  const mk = stacked ? size * 2.46 : size * 1.69;
  return /*#__PURE__*/React.createElement("div", {
    className: stacked ? "lk stack" : "lk",
    style: {
      gap: stacked ? size * 0.54 : size * 0.54,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Mark, {
    color: markColor,
    size: mk
  }), /*#__PURE__*/React.createElement("span", {
    className: "wm",
    style: {
      fontSize: size,
      color: textColor
    }
  }, wordmark, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--signal)"
    }
  }, ".")));
}
Object.assign(__ds_scope, { Lockup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Lockup.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
function Card({
  children,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["u-card", className].filter(Boolean).join(" "),
    style: style
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/Figure.jsx
try { (() => {
/** Money is a figure with its range underneath/beside, never a lone number. */
function Figure({
  value,
  range,
  size = "lg",
  inline = true
}) {
  const fs = size === "lg" ? 38 : size === "md" ? 28 : 22;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: inline ? "row" : "column",
      alignItems: inline ? "baseline" : "flex-start",
      gap: inline ? 10 : 4,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-fig",
    style: {
      fontSize: fs
    }
  }, value), range && /*#__PURE__*/React.createElement("span", {
    className: "u-rng"
  }, range));
}
Object.assign(__ds_scope, { Figure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Figure.jsx", error: String((e && e.message) || e) }); }

// components/data/TaskList.jsx
try { (() => {
function TaskList({
  title,
  meta,
  action,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "u-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-list-h"
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-h3"
  }, title), meta && /*#__PURE__*/React.createElement("span", {
    className: "u-small"
  }, meta), action), children);
}
Object.assign(__ds_scope, { TaskList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/TaskList.jsx", error: String((e && e.message) || e) }); }

// components/data/WindowCard.jsx
try { (() => {
function WindowCard({
  label,
  title,
  range,
  count = 0,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "u-card u-win"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tx"
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-meta"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "u-h3"
  }, title), range && /*#__PURE__*/React.createElement("span", {
    className: "u-rng"
  }, range)), /*#__PURE__*/React.createElement("span", {
    className: count ? "cnt on" : "cnt"
  }, count)), /*#__PURE__*/React.createElement("div", {
    className: "b"
  }, children));
}
Object.assign(__ds_scope, { WindowCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/WindowCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyWell.jsx
try { (() => {
function EmptyWell({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "u-drop"
  }, /*#__PURE__*/React.createElement("b", null, title), children && /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { EmptyWell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyWell.jsx", error: String((e && e.message) || e) }); }

// components/feedback/SystemBanner.jsx
try { (() => {
function SystemBanner({
  children,
  actionLabel,
  onAction,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "u-banner-top",
    style: style
  }, /*#__PURE__*/React.createElement("i", null), children, actionLabel && /*#__PURE__*/React.createElement("a", {
    onClick: onAction,
    style: {
      cursor: "pointer"
    }
  }, actionLabel));
}
Object.assign(__ds_scope, { SystemBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/SystemBanner.jsx", error: String((e && e.message) || e) }); }

// components/icons/iconData.js
try { (() => {
// Govscape icon set — 32×32 grid, 2.4 stroke, round caps/joins, one "spark" element per glyph.
// Grammar and several glyphs follow the Love Warranty icon system.
const ICONS = {
  "list": {
    "o": "<path d=\"M12 9h15M12 16h15M12 23h15\"/><path d=\"M5.5 9h.01M5.5 23h.01\"/>",
    "s": "<path d=\"M5.5 16h.01\"/>"
  },
  "download": {
    "o": "<path d=\"M6 27h20\"/><path d=\"M9 15l7 7 7-7\"/>",
    "s": "<path d=\"M16 5v13\"/>"
  },
  "arrow-right": {
    "o": "<path d=\"M5 16h20\"/>",
    "s": "<path d=\"M18 9l7 7-7 7\"/>"
  },
  "calendar": {
    "o": "<rect x=\"5\" y=\"8\" width=\"22\" height=\"19\" rx=\"2\"/><path d=\"M5 14h22\"/><path d=\"M11 5v5\"/><path d=\"M21 5v5\"/>",
    "s": "<rect x=\"10\" y=\"18\" width=\"5\" height=\"5\" rx=\"1\" fill=\"currentColor\" stroke=\"none\"/>"
  },
  "user-plus": {
    "o": "<circle cx=\"12\" cy=\"11\" r=\"4.5\"/><path d=\"M4 26a8 8 0 0 1 16 0\"/>",
    "s": "<path d=\"M24.5 7v8M20.5 11h8\"/>"
  },
  "search": {
    "o": "<circle cx=\"14\" cy=\"14\" r=\"8.5\"/>",
    "s": "<path d=\"M20.5 20.5L27 27\"/>"
  },
  "check": {
    "o": "<path d=\"M7 16.5l6 6L25 10\"/>"
  },
  "chevron-down": {
    "o": "<path d=\"M9 13l7 7 7-7\"/>"
  },
  "chevron-up": {
    "o": "<path d=\"M9 19l7-7 7 7\"/>"
  },
  "building": {
    "o": "<path d=\"M5 13v14h22V13\"/><path d=\"M4 13l4-6h16l4 6z\"/>",
    "s": "<rect x=\"13\" y=\"19\" width=\"6\" height=\"8\" fill=\"currentColor\" stroke=\"none\"/>"
  },
  "home": {
    "o": "<path d=\"M5 14.5L16 5l11 9.5V27H5z\"/>",
    "s": "<rect x=\"13\" y=\"19\" width=\"6\" height=\"8\" fill=\"currentColor\" stroke=\"none\"/>"
  },
  "dashboard": {
    "o": "<rect x=\"5\" y=\"5\" width=\"9.5\" height=\"9.5\" rx=\"1.5\"/><rect x=\"17.5\" y=\"5\" width=\"9.5\" height=\"9.5\" rx=\"1.5\"/><rect x=\"17.5\" y=\"17.5\" width=\"9.5\" height=\"9.5\" rx=\"1.5\"/>",
    "s": "<rect x=\"5\" y=\"17.5\" width=\"9.5\" height=\"9.5\" rx=\"1.5\" fill=\"currentColor\" stroke=\"none\"/>"
  },
  "queue": {
    "o": "<path d=\"M13 9h14\"/><path d=\"M13 16h14\"/><path d=\"M13 23h14\"/><path d=\"M4 9l2.2 2.2L10 7.5\"/>",
    "s": "<path d=\"M4 16l2.2 2.2L10 14.5\"/>"
  },
  "check-square": {
    "o": "<rect x=\"5\" y=\"5\" width=\"22\" height=\"22\" rx=\"4\"/>",
    "s": "<path d=\"M11 16.4l3.9 3.9L22 12.6\"/>"
  },
  "info": {
    "o": "<circle cx=\"16\" cy=\"16\" r=\"11\"/><path d=\"M16 10.5h.01\"/>",
    "s": "<path d=\"M16 15v7\"/>"
  },
  "alert": {
    "o": "<path d=\"M16 5l11 11-11 11L5 16z\"/>",
    "s": "<circle cx=\"16\" cy=\"16\" r=\"2.8\" fill=\"currentColor\" stroke=\"none\"/>"
  },
  "bot": {
    "o": "<rect x=\"5\" y=\"10\" width=\"22\" height=\"16\" rx=\"4\"/><path d=\"M16 5v5\"/>",
    "s": "<path d=\"M12 18h.01M20 18h.01\"/>"
  },
  "live": {
    "o": "<circle cx=\"16\" cy=\"16\" r=\"11\"/>",
    "s": "<path d=\"M16 10v12\"/>"
  },
  "complete": {
    "o": "<circle cx=\"16\" cy=\"16\" r=\"11\"/>",
    "s": "<path d=\"M11 16.4l3.9 3.9L22 12.6\"/>"
  },
  "report": {
    "o": "<rect x=\"7\" y=\"4\" width=\"18\" height=\"24\" rx=\"2\"/><path d=\"M11 23h10\"/><path d=\"M12 23v-5\"/><path d=\"M20 23v-9\"/>",
    "s": "<path d=\"M16 23v-7\"/>"
  },
  "support": {
    "o": "<rect x=\"4\" y=\"7\" width=\"24\" height=\"16\" rx=\"3\"/><path d=\"M12 23l4 5 4-5\"/>",
    "s": "<path d=\"M16 12v6\"/>"
  },
  "notes": {
    "o": "<path d=\"M7 4h11l7 7v17H7z\"/><path d=\"M18 4v7h7\"/><path d=\"M12 16h8\"/>",
    "s": "<path d=\"M12 21h8\"/>"
  },
  "forecast": {
    "o": "<path d=\"M4 26h24\"/><path d=\"M6 21l6-5 5 3\"/>",
    "s": "<path d=\"M17 19l9-8\" stroke-dasharray=\"3 3\"/>"
  },
  "settings": {
    "o": "<path d=\"M6 11h20\"/><path d=\"M6 22h20\"/><circle cx=\"12\" cy=\"11\" r=\"3.2\"/>",
    "s": "<circle cx=\"21\" cy=\"22\" r=\"3.2\" fill=\"currentColor\" stroke=\"none\"/>"
  },
  "govern": {
    "o": "<path d=\"M16 4l10 4v7c0 6.4-4.3 10.7-10 13-5.7-2.3-10-6.6-10-13V8z\"/>",
    "s": "<path d=\"M11.5 16l3.2 3.2 5.8-6.2\"/>"
  },
  "quality": {
    "o": "<circle cx=\"16\" cy=\"16\" r=\"11\"/>",
    "s": "<path d=\"M11 16.4l3.9 3.9L22 12.6\"/>"
  },
  "realtime": {
    "o": "<circle cx=\"16\" cy=\"16\" r=\"11\"/>",
    "s": "<path d=\"M9.5 16h3l2.5-4.5L18.5 20l2-4h2.5\"/>"
  },
  "alldata": {
    "o": "<rect x=\"4\" y=\"4\" width=\"15\" height=\"15\" rx=\"2.5\"/><path d=\"M13 23v1.5a2.5 2.5 0 0 0 2.5 2.5h9a2.5 2.5 0 0 0 2.5-2.5v-9a2.5 2.5 0 0 0-2.5-2.5H23\"/>",
    "s": "<path d=\"M8.5 11.5h6\"/>"
  },
  "accredit": {
    "o": "<circle cx=\"16\" cy=\"13\" r=\"8.5\"/><path d=\"M11 20.5L9 28l7-3 7 3-2-7.5\"/>",
    "s": "<path d=\"M12.6 13.2l2.4 2.4 4.4-4.6\"/>"
  },
  "advisor": {
    "o": "<path d=\"M14 4.5l2.4 6.6 6.6 2.4-6.6 2.4L14 22.5l-2.4-6.6L5 13.5l6.6-2.4z\"/>",
    "s": "<circle cx=\"24.5\" cy=\"24\" r=\"2.8\" fill=\"currentColor\" stroke=\"none\"/>"
  }
};
Object.assign(__ds_scope, { ICONS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/iconData.js", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
/** Govscape line icon: one outline weight plus exactly one "spark" element. */
function Icon({
  name,
  size,
  spark = true,
  sparkColor = "var(--signal)",
  strokeWidth,
  className,
  style
}) {
  const d = __ds_scope.ICONS[name];
  if (!d) return null;
  const sw = strokeWidth != null ? strokeWidth : size && size >= 28 ? 2.4 : undefined;
  const st = Object.assign({}, size ? {
    width: size,
    height: size
  } : null, sw ? {
    strokeWidth: sw
  } : null, style);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 32 32",
    "aria-hidden": "true",
    className: ["gs-icon", className].filter(Boolean).join(" "),
    style: st
  }, /*#__PURE__*/React.createElement("g", {
    dangerouslySetInnerHTML: {
      __html: d.o
    }
  }), d.s && /*#__PURE__*/React.createElement("g", {
    style: spark ? {
      color: sparkColor,
      stroke: sparkColor
    } : undefined,
    dangerouslySetInnerHTML: {
      __html: d.s
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
const V = {
  primary: "pri",
  secondary: "",
  ghost: "ghost",
  inverse: "inv"
};
/** Product button. One primary (Obsidian) per view. Signal is never a product button colour. */
function Button({
  variant = "secondary",
  size = "md",
  icon,
  iconRight,
  disabled,
  onClick,
  children,
  style
}) {
  const cls = ["u-btn", V[variant], size === "sm" && "sm", disabled && "dis"].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: cls,
    onClick: onClick,
    disabled: disabled,
    style: style
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    spark: false
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    spark: false
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/TextLink.jsx
try { (() => {
function TextLink({
  children,
  icon = "arrow-right",
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "u-link",
    onClick: onClick,
    style: style
  }, children, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    spark: false
  }));
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/data/MoneyPair.jsx
try { (() => {
function MoneyPair({
  recoverable,
  recoverableNote = "Operational, Technology and Revenue together. A recurring cost being incurred now.",
  exposure,
  exposureNote = "Probability × impact over a year. May not happen; if it does, happens once.",
  step = 1,
  steps = 3,
  stepLabel = "Estimated",
  stepNote,
  onMove
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "u-money"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hd"
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-meta ink"
  }, "Money"), /*#__PURE__*/React.createElement("span", {
    className: "u-small"
  }, "why this matters, and what order to do it in")), /*#__PURE__*/React.createElement("div", {
    className: "c"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Recoverable annual cost"), /*#__PURE__*/React.createElement("span", {
    className: "u-fig"
  }, recoverable), /*#__PURE__*/React.createElement("p", null, recoverableNote)), /*#__PURE__*/React.createElement("div", {
    className: "c"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Annual risk exposure"), /*#__PURE__*/React.createElement("span", {
    className: "u-fig"
  }, exposure), /*#__PURE__*/React.createElement("p", null, exposureNote)), /*#__PURE__*/React.createElement("div", {
    className: "ft"
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-meta"
  }, "Never added together"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-bars"
  }, Array.from({
    length: steps
  }).map((_, k) => /*#__PURE__*/React.createElement("s", {
    key: k,
    className: k < step ? "on" : undefined
  }))), /*#__PURE__*/React.createElement("b", null, stepLabel), stepNote && /*#__PURE__*/React.createElement("span", null, stepNote), onMove && /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    onClick: onMove
  }, "Move this on")));
}
Object.assign(__ds_scope, { MoneyPair });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MoneyPair.jsx", error: String((e && e.message) || e) }); }

// components/feedback/AdvisorDock.jsx
try { (() => {
function AdvisorDock({
  title,
  subtitle = "AI Advisor",
  open = false,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "u-pill",
    onClick: onClick,
    style: style
  }, /*#__PURE__*/React.createElement("span", {
    className: "av"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "advisor"
  })), /*#__PURE__*/React.createElement("span", {
    className: "tx"
  }, title, /*#__PURE__*/React.createElement("span", null, subtitle)), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: open ? "chevron-down" : "chevron-up",
    spark: false
  }));
}
Object.assign(__ds_scope, { AdvisorDock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/AdvisorDock.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
/** Critical alert — Signal tint. The only red container in the product. */
function Alert({
  title,
  children,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "u-alert"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "alert",
    spark: false
  }), /*#__PURE__*/React.createElement("div", {
    className: "tx"
  }, /*#__PURE__*/React.createElement("b", null, title), children && /*#__PURE__*/React.createElement("p", null, children)), action);
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/NextAction.jsx
try { (() => {
/** Ink "Do this next" panel — the emphasis container. */
function NextAction({
  label = "Do this next",
  title,
  meta,
  actionLabel = "Open it",
  onAction
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "u-banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tx"
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-meta"
  }, label), /*#__PURE__*/React.createElement("b", null, title), meta && /*#__PURE__*/React.createElement("span", {
    className: "m"
  }, meta)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "inverse",
    iconRight: "arrow-right",
    onClick: onAction
  }, actionLabel));
}
Object.assign(__ds_scope, { NextAction });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/NextAction.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Strip.jsx
try { (() => {
/** Neutral / info inline strip. */
function Strip({
  icon = "info",
  children,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "u-strip"
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    spark: false
  }), /*#__PURE__*/React.createElement("p", null, children), action);
}
Object.assign(__ds_scope, { Strip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Strip.jsx", error: String((e && e.message) || e) }); }

// components/forms/AssignPicker.jsx
try { (() => {
/** Dashed pill for an unset value (owner, date). Solid chip replaces it once set. */
function AssignPicker({
  label = "Assign owner",
  icon = "user-plus",
  onClick
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "u-dash",
    onClick: onClick
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    spark: false
  }), label);
}
Object.assign(__ds_scope, { AssignPicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/AssignPicker.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked = false,
  onChange,
  label
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: checked ? "u-box on" : "u-box",
    role: "checkbox",
    "aria-checked": checked,
    "aria-label": label,
    tabIndex: 0,
    onClick: () => onChange && onChange(!checked)
  }, checked && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    spark: false
  }));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchField.jsx
try { (() => {
function SearchField({
  placeholder = "Search",
  shortcut = "⌘K",
  value,
  onChange,
  width = 220
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "u-search",
    style: {
      width
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    spark: false
  }), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    placeholder: placeholder,
    style: {
      border: "none",
      outline: "none",
      background: "transparent",
      font: "inherit",
      color: "var(--u-ink)",
      flex: 1,
      minWidth: 0
    }
  }), shortcut && /*#__PURE__*/React.createElement("kbd", null, shortcut));
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchField.jsx", error: String((e && e.message) || e) }); }

// components/marketing/BigNumber.jsx
try { (() => {
function BigNumber({
  caption,
  currency = "£",
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "w-num"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cap"
  }, caption), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, currency && /*#__PURE__*/React.createElement("span", null, currency), value));
}
Object.assign(__ds_scope, { BigNumber });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/BigNumber.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  tone = "dark"
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: tone === "light" ? "w-eyebrow lt" : "w-eyebrow"
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/marketing/FrameworkTag.jsx
try { (() => {
function FrameworkTag({
  children,
  accent = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: accent ? "acc on" : "acc"
  }, children);
}
Object.assign(__ds_scope, { FrameworkTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/FrameworkTag.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Pillar.jsx
try { (() => {
function Pillar({
  icon,
  label,
  title,
  claim,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "pillar"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "pi"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 40
  })), /*#__PURE__*/React.createElement("span", {
    className: "pl"
  }, label), /*#__PURE__*/React.createElement("h3", {
    className: "pn"
  }, title), claim && /*#__PURE__*/React.createElement("p", {
    className: "pc"
  }, claim), /*#__PURE__*/React.createElement("p", {
    className: "pd"
  }, children));
}
Object.assign(__ds_scope, { Pillar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Pillar.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Rung.jsx
try { (() => {
/** Promise-ladder row: number, claim, description. */
function Rung({
  n,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "rung"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rn"
  }, n), /*#__PURE__*/React.createElement("span", {
    className: "rc"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "rd"
  }, children));
}
Object.assign(__ds_scope, { Rung });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Rung.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Stat.jsx
try { (() => {
function Stat({
  value,
  label,
  accent = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: accent ? "pstat accent" : "pstat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv"
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "pk"
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Stat.jsx", error: String((e && e.message) || e) }); }

// components/marketing/WebButton.jsx
try { (() => {
const V = {
  signal: "sig",
  line: "line",
  lined: "lined"
};
/** Marketing CTA: uppercase Archivo 800. Signal fill is for the site only. */
function WebButton({
  variant = "signal",
  size = "md",
  children,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    role: "button",
    tabIndex: 0,
    className: ["w-btn", V[variant], size === "sm" && "sm"].filter(Boolean).join(" "),
    onClick: onClick,
    style: style
  }, children);
}
Object.assign(__ds_scope, { WebButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/WebButton.jsx", error: String((e && e.message) || e) }); }

// components/navigation/ClientSwitcher.jsx
try { (() => {
function ClientSwitcher({
  name,
  initial,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "u-client",
    onClick: onClick,
    style: {
      cursor: onClick ? "pointer" : undefined
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "av"
  }, initial ?? (name || "?")[0]), /*#__PURE__*/React.createElement("b", null, name), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    spark: false
  }));
}
Object.assign(__ds_scope, { ClientSwitcher });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/ClientSwitcher.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavItem.jsx
try { (() => {
const DOT = {
  ink: "i",
  muted: "",
  critical: "c",
  clay: "",
  sand: ""
};
function NavItem({
  icon,
  dot,
  label,
  count,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: active ? "u-ni on" : "u-ni",
    onClick: onClick
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    spark: !!active
  }), dot && /*#__PURE__*/React.createElement("span", {
    className: ["d", DOT[dot]].filter(Boolean).join(" ")
  }), /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, label), count != null && /*#__PURE__*/React.createElement("span", {
    className: count === 0 ? "n z" : "n"
  }, count));
}
Object.assign(__ds_scope, { NavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavItem.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Rail.jsx
try { (() => {
/** 244px white product sidebar. Children: ClientSwitcher, NavItem, RailSection. */
function Rail({
  wordmark = "GovScape",
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: "u u-rail",
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-rail-top"
  }, /*#__PURE__*/React.createElement(__ds_scope.Mark, {
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-wm"
  }, wordmark)), children);
}
Object.assign(__ds_scope, { Rail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Rail.jsx", error: String((e && e.message) || e) }); }

// components/navigation/RailSection.jsx
try { (() => {
function RailSection({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "u-nsec u-meta"
  }, children);
}
Object.assign(__ds_scope, { RailSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/RailSection.jsx", error: String((e && e.message) || e) }); }

// components/navigation/WebNav.jsx
try { (() => {
function WebNav({
  links = ["Methodology", "How it works", "Product", "FAQ"],
  loginLabel = "Log in",
  ctaLabel = "Book a demo",
  onCta,
  onLink
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "w-nav"
  }, /*#__PURE__*/React.createElement(__ds_scope.Lockup, {
    size: 17
  }), /*#__PURE__*/React.createElement("div", {
    className: "links"
  }, links.map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      cursor: "pointer"
    },
    onClick: () => onLink && onLink(l)
  }, l))), /*#__PURE__*/React.createElement("span", {
    className: "login"
  }, loginLabel), /*#__PURE__*/React.createElement(__ds_scope.WebButton, {
    size: "sm",
    onClick: onCta
  }, ctaLabel));
}
Object.assign(__ds_scope, { WebNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/WebNav.jsx", error: String((e && e.message) || e) }); }

// components/status/Chip.jsx
try { (() => {
const T = {
  default: "",
  critical: "crit",
  open: "open"
};
function Chip({
  tone = "default",
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ["u-chip", T[tone]].filter(Boolean).join(" ")
  }, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/Chip.jsx", error: String((e && e.message) || e) }); }

// components/data/TaskRow.jsx
try { (() => {
function TaskRow({
  title,
  severity,
  area,
  owner,
  done = false,
  expected,
  measured,
  closed,
  when,
  onToggle,
  onAddDate,
  onAssign
}) {
  if (done) return /*#__PURE__*/React.createElement("div", {
    className: "u-task done"
  }, /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    checked: true,
    onChange: onToggle,
    label: "Reopen"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tx"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "u-cmp"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "u-meta"
  }, "Expected"), /*#__PURE__*/React.createElement("span", null, expected)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "u-meta"
  }, "Measured"), /*#__PURE__*/React.createElement("span", null, measured)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "u-meta"
  }, "Closed"), /*#__PURE__*/React.createElement("span", null, closed)))), /*#__PURE__*/React.createElement("span", {
    className: "u-when"
  }, when));
  return /*#__PURE__*/React.createElement("div", {
    className: "u-task"
  }, severity ? /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    tone: severity === "High" ? "critical" : "default"
  }, severity) : /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    onChange: onToggle,
    label: "Mark done"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tx"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "u-row",
    style: {
      gap: 8
    }
  }, area && /*#__PURE__*/React.createElement(__ds_scope.Chip, null, area), owner ? /*#__PURE__*/React.createElement(__ds_scope.Chip, null, owner) : /*#__PURE__*/React.createElement(__ds_scope.AssignPicker, {
    onClick: onAssign
  }))), when ? /*#__PURE__*/React.createElement("span", {
    className: "u-when"
  }, when) : /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    icon: "calendar",
    onClick: onAddDate
  }, "Add a date"));
}
Object.assign(__ds_scope, { TaskRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/TaskRow.jsx", error: String((e && e.message) || e) }); }

// components/status/ScoreRing.jsx
try { (() => {
const TONE = {
  weak: "var(--ink)",
  fair: "var(--ink)",
  good: "var(--ink)",
  provisional: "var(--muted)",
  critical: "var(--signal)"
};
function ScoreRing({
  score = 0,
  tone = "weak",
  label
}) {
  const stroke = TONE[tone] || TONE.weak;
  const c = 2 * Math.PI * 16;
  return /*#__PURE__*/React.createElement("div", {
    className: "u-score"
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-ring"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 38 38"
  }, /*#__PURE__*/React.createElement("circle", {
    className: "t",
    cx: "19",
    cy: "19",
    r: "16"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "19",
    r: "16",
    stroke: stroke,
    strokeDasharray: c * score / 100 + " " + c,
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("b", {
    style: {
      color: tone === "critical" ? "var(--signal-deep)" : tone === "provisional" ? "var(--muted-strong)" : "var(--ink)"
    }
  }, score)), label && /*#__PURE__*/React.createElement("span", {
    className: "u-meta ink"
  }, label));
}
Object.assign(__ds_scope, { ScoreRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/ScoreRing.jsx", error: String((e && e.message) || e) }); }

// components/data/AreaCard.jsx
try { (() => {
function AreaCard({
  title,
  open,
  description,
  value,
  range,
  score,
  tone = "weak",
  scoreLabel,
  note,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "u-card u-area",
    onClick: onClick,
    style: {
      cursor: onClick ? "pointer" : undefined
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-h3"
  }, title), open != null && /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    tone: "open"
  }, open, " open")), description && /*#__PURE__*/React.createElement("span", {
    className: "u-body",
    style: {
      fontSize: 13.5
    }
  }, description), /*#__PURE__*/React.createElement("div", {
    className: "fig"
  }, /*#__PURE__*/React.createElement("b", null, value), range && /*#__PURE__*/React.createElement("span", {
    className: "u-rng"
  }, range)), /*#__PURE__*/React.createElement("hr", null), score != null && /*#__PURE__*/React.createElement(__ds_scope.ScoreRing, {
    score: score,
    tone: tone,
    label: scoreLabel
  }), note && /*#__PURE__*/React.createElement("span", {
    className: "u-small"
  }, note));
}
Object.assign(__ds_scope, { AreaCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/AreaCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/product/App.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Rail,
  NavItem,
  RailSection,
  ClientSwitcher,
  SystemBanner,
  AdvisorDock,
  SearchField
} = GS;
function App() {
  const [page, setPage] = React.useState(() => localStorage.getItem("gs-kit-page") || "home");
  const [tasks, setTasks] = React.useState(TASKS);
  const [done, setDone] = React.useState(DONE);
  const [banner, setBanner] = React.useState(true);
  const go = p => {
    setPage(p);
    localStorage.setItem("gs-kit-page", p);
    window.scrollTo(0, 0);
  };
  const update = (id, patch) => setTasks(ts => ts.map(t => t.id === id ? {
    ...t,
    ...patch
  } : t));
  const complete = id => {
    const t = tasks.find(x => x.id === id);
    setTasks(ts => ts.filter(x => x.id !== id));
    setDone(d => [{
      id,
      title: t.title,
      expected: "closes " + t.area,
      measured: "pending next snapshot",
      closed: "by hand",
      when: "29 Sep"
    }, ...d]);
  };
  const ctx = {
    tasks,
    done,
    update,
    complete,
    go
  };
  const area = AREAS.find(a => "area:" + a.id === page);
  const openCount = tasks.length;
  return /*#__PURE__*/React.createElement("div", {
    className: "u",
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }
  }, banner && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 16px 0"
    }
  }, /*#__PURE__*/React.createElement(SystemBanner, {
    actionLabel: "Recalculate assessment",
    onAction: () => setBanner(false)
  }, "Benchmarks changed on 24 Sep 2026. These figures were calculated 25 Jun 2026.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      padding: 16,
      alignItems: "flex-start",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 16
    }
  }, /*#__PURE__*/React.createElement(Rail, null, /*#__PURE__*/React.createElement(ClientSwitcher, {
    name: "Acme Manufacturing"
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "building",
    label: "Portfolio",
    count: 4
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "home",
    label: "Home",
    active: page === "home",
    onClick: () => go("home")
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "queue",
    label: "Work queue",
    count: openCount,
    active: page === "queue",
    onClick: () => go("queue")
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "calendar",
    label: "90-day plan",
    active: page === "plan",
    onClick: () => go("plan")
  }), /*#__PURE__*/React.createElement(RailSection, null, "The four areas"), AREAS.map(a => /*#__PURE__*/React.createElement(NavItem, {
    key: a.id,
    dot: a.dot,
    label: a.short,
    count: a.open,
    active: page === "area:" + a.id,
    onClick: () => go("area:" + a.id)
  })))), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      maxWidth: 1040,
      padding: "10px 16px 96px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(SearchField, null)), page === "home" && /*#__PURE__*/React.createElement(HomeScreen, ctx), page === "queue" && /*#__PURE__*/React.createElement(QueueScreen, ctx), page === "plan" && /*#__PURE__*/React.createElement(PlanScreen, ctx), area && /*#__PURE__*/React.createElement(AreaScreen, _extends({
    area: area
  }, ctx)))), /*#__PURE__*/React.createElement(AdvisorDock, {
    title: "Operational Inefficiency needs attention",
    subtitle: "AI Advisor \xB7 1 area to look at",
    onClick: () => go("area:operational"),
    style: {
      position: "fixed",
      right: 24,
      bottom: 24
    }
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/product/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/product/AreaScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function AreaScreen({
  area,
  tasks,
  go
}) {
  const {
    Card,
    Figure,
    ScoreRing,
    Chip,
    TaskList,
    TaskRow,
    EmptyWell,
    Button,
    TextLink
  } = GS;
  const mine = tasks.filter(t => t.area === area.name);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "u-h1",
    style: {
      margin: 0,
      marginRight: "auto"
    }
  }, area.name), area.open > 0 && /*#__PURE__*/React.createElement(Chip, {
    tone: "open"
  }, area.open, " open")), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 22,
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) auto",
      gap: 18,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-meta ink"
  }, "Recoverable annual cost"), /*#__PURE__*/React.createElement(Figure, {
    value: area.value,
    range: area.range
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-body"
  }, area.desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(ScoreRing, {
    score: area.score,
    tone: area.tone,
    label: area.label
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-small"
  }, area.note))), /*#__PURE__*/React.createElement(TaskList, {
    title: "Work in this area",
    meta: mine.length + " open",
    action: /*#__PURE__*/React.createElement(TextLink, {
      onClick: () => go("queue")
    }, "Open the queue")
  }, mine.map(t => /*#__PURE__*/React.createElement(TaskRow, _extends({
    key: t.id
  }, t))), mine.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement(EmptyWell, {
    title: "No open work"
  }, "Nothing to do here yet. The advisor adds tasks when this area's data is connected."))));
}
window.AreaScreen = AreaScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/product/AreaScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/product/HomeScreen.jsx
try { (() => {
function HomeScreen({
  tasks,
  go
}) {
  const {
    NextAction,
    MoneyPair,
    AreaCard,
    Strip,
    Button
  } = GS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "u-h1",
    style: {
      margin: 0,
      marginRight: "auto"
    }
  }, "Home"), /*#__PURE__*/React.createElement(Button, {
    icon: "download"
  }, "Report"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "list",
    onClick: () => go("queue")
  }, "Open the queue")), /*#__PURE__*/React.createElement("p", {
    className: "u-state",
    style: {
      margin: 0
    }
  }, "About ", /*#__PURE__*/React.createElement("b", null, "\xA32.9m a year"), " is recoverable, ISO/IEC 27001 is the target, and ", /*#__PURE__*/React.createElement("b", null, "two pieces of work"), " move both."), /*#__PURE__*/React.createElement(Strip, {
    icon: "check-square",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      iconRight: "arrow-right"
    }, "Review draft")
  }, /*#__PURE__*/React.createElement("b", null, "A newer draft is waiting for review."), " The figures below are the approved ones until you approve it."), tasks[0] && /*#__PURE__*/React.createElement(NextAction, {
    title: tasks[0].title,
    meta: "Operational",
    onAction: () => go("queue")
  }), /*#__PURE__*/React.createElement(MoneyPair, {
    recoverable: "\xA32,875,313",
    exposure: "\xA3609,375",
    step: 1,
    stepNote: "step 1 of 3 \xB7 set by Revenue, the least evidenced area",
    onMove: () => go("area:revenue")
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-meta",
    style: {
      marginTop: 6
    }
  }, "The four areas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      gap: 16
    }
  }, AREAS.map(a => /*#__PURE__*/React.createElement(AreaCard, {
    key: a.id,
    title: a.name,
    open: a.open,
    description: a.desc,
    value: a.value,
    range: a.range,
    score: a.score,
    tone: a.tone,
    scoreLabel: a.label,
    note: a.note,
    onClick: () => go("area:" + a.id)
  }))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/product/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/product/PlanScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PlanScreen({
  tasks,
  update
}) {
  const {
    Alert,
    Strip,
    WindowCard,
    EmptyWell,
    TaskList,
    TaskRow,
    Button
  } = GS;
  const unowned = tasks.filter(t => !t.owner).length;
  const inWin = tasks.filter(t => t.when);
  const undated = tasks.filter(t => !t.when);
  const assignAll = () => tasks.forEach(t => !t.owner && update(t.id, {
    owner: OWNERS[t.id % OWNERS.length]
  }));
  const wins = [["Window 1", "Days 1 to 30", "29 Sep – 29 Oct"], ["Window 2", "Days 31 to 60", "29 Oct – 28 Nov"], ["Window 3", "Days 61 to 90", "28 Nov – 28 Dec"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "u-h1",
    style: {
      margin: 0
    }
  }, "90-day plan"), unowned > 0 && /*#__PURE__*/React.createElement(Alert, {
    title: "Assign owners",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      icon: "user-plus",
      onClick: assignAll
    }, "Assign owners")
  }, unowned, " of ", tasks.length, " tasks have no owner yet. A plan without names is a list of problems."), /*#__PURE__*/React.createElement(Strip, {
    icon: "info"
  }, "Windows are counted in days from today, not calendar months. ", /*#__PURE__*/React.createElement("b", null, "Closes"), " shows the liability a task retires and what it is worth a year."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      gap: 16
    }
  }, wins.map(([l, t, r], i) => {
    const items = i === 0 ? inWin : [];
    return /*#__PURE__*/React.createElement(WindowCard, {
      key: l,
      label: l,
      title: t,
      range: r,
      count: items.length
    }, items.length ? items.map(x => /*#__PURE__*/React.createElement("div", {
      key: x.id,
      className: "u-drop",
      style: {
        background: "var(--paper)",
        boxShadow: "inset 0 0 0 1px var(--line)"
      }
    }, /*#__PURE__*/React.createElement("b", null, x.title), /*#__PURE__*/React.createElement("span", null, x.area, " \xB7 ", x.when))) : /*#__PURE__*/React.createElement(EmptyWell, {
      title: "Nothing scheduled yet"
    }, "Empty on purpose. Give a task a date in this window, or add one."));
  })), /*#__PURE__*/React.createElement(TaskList, {
    title: "Undated",
    meta: undated.length + " tasks · " + undated.filter(t => !t.owner).length + " owners to add"
  }, undated.map(t => /*#__PURE__*/React.createElement(TaskRow, _extends({
    key: t.id
  }, t, {
    onAssign: () => update(t.id, {
      owner: OWNERS[t.id % OWNERS.length]
    }),
    onAddDate: () => update(t.id, {
      when: "14 Oct"
    })
  }))), undated.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement(EmptyWell, {
    title: "Everything has a date"
  }, "Every open task sits in a window above."))));
}
window.PlanScreen = PlanScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/product/PlanScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/product/QueueScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function QueueScreen({
  tasks,
  done,
  update,
  complete
}) {
  const {
    TaskList,
    TaskRow,
    Checkbox,
    Chip,
    AssignPicker,
    Button,
    EmptyWell
  } = GS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "u-h1",
    style: {
      margin: 0,
      marginRight: "auto"
    }
  }, "Work queue"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Open Frameworks")), /*#__PURE__*/React.createElement("h2", {
    className: "u-h2",
    style: {
      margin: 0
    }
  }, "Next in the queue"), /*#__PURE__*/React.createElement(TaskList, {
    title: "Open",
    meta: tasks.length + " tasks · " + tasks.filter(t => !t.owner).length + " owners to add"
  }, tasks.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement(EmptyWell, {
    title: "Queue is clear"
  }, "Nothing open. New findings land here after the next snapshot.")), tasks.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: "u-task"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    onChange: () => complete(t.id),
    label: "Mark done"
  }), /*#__PURE__*/React.createElement(Chip, {
    tone: "critical"
  }, t.severity)), /*#__PURE__*/React.createElement("div", {
    className: "tx"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t"
  }, t.title), /*#__PURE__*/React.createElement("div", {
    className: "u-row",
    style: {
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Chip, null, t.area), t.owner ? /*#__PURE__*/React.createElement(Chip, null, t.owner) : /*#__PURE__*/React.createElement(AssignPicker, {
    onClick: () => update(t.id, {
      owner: OWNERS[t.id % OWNERS.length]
    })
  }))), t.when ? /*#__PURE__*/React.createElement("span", {
    className: "u-when"
  }, t.when) : /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    icon: "calendar",
    onClick: () => update(t.id, {
      when: "14 Oct"
    })
  }, "Add a date")))), /*#__PURE__*/React.createElement(TaskList, {
    title: "Done",
    meta: done.length + " closed"
  }, done.map(d => /*#__PURE__*/React.createElement(TaskRow, _extends({
    key: d.id,
    done: true
  }, d)))));
}
window.QueueScreen = QueueScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/product/QueueScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/product/data.jsx
try { (() => {
// Sample data. Figures marked * come from the brand file; others are illustrative fills.
const GS = window.GovscapeDesignSystem_570c82;
const AREAS = [{
  id: "operational",
  name: "Operational Inefficiency",
  short: "Operational",
  dot: "ink",
  value: "£1,290,938",
  range: "£325,125 – £1,950,750",
  score: 36,
  tone: "weak",
  label: "Weak",
  open: 2,
  desc: "Add data quality (duplicates, completeness) for Operational Inefficiency",
  note: "No movement since last week's snapshot"
}, {
  id: "technology",
  name: "Technology Debt",
  short: "Technology",
  dot: "muted",
  value: "£903,375",
  range: "£512,000 – £1,420,500",
  score: 54,
  tone: "fair",
  label: "Fair",
  open: 0,
  desc: "Connect your ticketing system to measure change failure rate",
  note: "No movement since last week's snapshot"
}, {
  id: "revenue",
  name: "Revenue Leakage",
  short: "Revenue",
  dot: "muted",
  value: "£681,000",
  range: "£356,750 – £942,000",
  score: 22,
  tone: "provisional",
  label: "Provisional",
  open: 0,
  desc: "Least evidenced area. Add billing exports to firm up the range",
  note: "Estimated from benchmarks only"
}, {
  id: "risk",
  name: "Risk Exposure",
  short: "Risk Exposure",
  dot: "critical",
  value: "£609,375",
  range: "£240,000 – £1,015,500",
  score: 41,
  tone: "weak",
  label: "Weak",
  open: 0,
  desc: "Map controls to ISO/IEC 27001 to evidence risk treatment",
  note: "Down 2 pts since last week's snapshot"
}];
const TASKS = [{
  id: 1,
  severity: "High",
  title: "Review and evidence the 118 open high-severity gaps",
  area: "Operational Inefficiency"
}, {
  id: 2,
  severity: "High",
  title: "Add data quality (duplicates, completeness) for Operational Inefficiency",
  area: "Operational Inefficiency"
}];
const DONE = [{
  id: 9,
  title: "QA test task 18 Aug",
  expected: "no liability named",
  measured: "+0 pts overall score",
  closed: "by hand",
  when: "18 Aug"
}];
const OWNERS = ["Priya Shah", "Tom Reid", "Dana Okafor"];
Object.assign(window, {
  GS,
  AREAS,
  TASKS,
  DONE,
  OWNERS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/product/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
function Hero({
  onCta,
  onLink
}) {
  const {
    WebNav,
    Eyebrow,
    WebButton,
    BigNumber
  } = window.GovscapeDesignSystem_570c82;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: "var(--ink)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1360,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-frame"
  }, /*#__PURE__*/React.createElement(WebNav, {
    onCta: onCta,
    onLink: onLink
  }), /*#__PURE__*/React.createElement("div", {
    className: "w-hero"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "The number your board will ask for"), /*#__PURE__*/React.createElement("div", {
    className: "w-h1",
    style: {
      fontSize: "clamp(40px,6.4vw,92px)"
    }
  }, "Most AI governance is theatre. We do the ", /*#__PURE__*/React.createElement("em", null, "math.")), /*#__PURE__*/React.createElement("p", {
    className: "w-sub",
    style: {
      margin: 0
    }
  }, "The average company is carrying millions in unquantified AI exposure, sitting on the balance sheet, unnamed, until someone does the arithmetic."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(WebButton, {
    onClick: onCta
  }, "Book a demo"), /*#__PURE__*/React.createElement(WebButton, {
    variant: "line",
    onClick: () => onLink("Methodology")
  }, "See the model"))), /*#__PURE__*/React.createElement(BigNumber, {
    caption: "Average exposure surfaced per assessment",
    value: "2,420,000"
  }))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
const WS = window.GovscapeDesignSystem_570c82;
function Idea() {
  const {
    Kicker
  } = WS;
  return /*#__PURE__*/React.createElement("section", {
    className: "sec sec--tint"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Kicker, null, "The idea"), /*#__PURE__*/React.createElement("h2", {
    className: "h-xl",
    style: {
      maxWidth: "22ch",
      fontSize: "clamp(40px,5.2vw,76px)"
    }
  }, "We quantify risk. ", /*#__PURE__*/React.createElement("em", null, "The brand should feel that certain."))));
}
function PromiseSection() {
  const {
    Kicker,
    Rung
  } = WS;
  return /*#__PURE__*/React.createElement("section", {
    className: "sec",
    id: "how"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyerow"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, null, "01 \xB7 How it works"), /*#__PURE__*/React.createElement("h2", {
    className: "h-xl",
    style: {
      maxWidth: "19ch",
      margin: 0
    }
  }, "Governance stops being a project. It becomes a live system.")), /*#__PURE__*/React.createElement("p", {
    className: "lede",
    style: {
      maxWidth: "33ch",
      margin: 0
    }
  }, "Everyone else sells an audit: a snapshot, six months of consultants, a report that is out of date the day it lands. We sell a system that never stops checking.")), /*#__PURE__*/React.createElement("div", {
    className: "ladder",
    style: {
      marginTop: 44
    }
  }, /*#__PURE__*/React.createElement(Rung, {
    n: "01",
    title: "Minutes, not months"
  }, "Point Govscape at a source and the first findings land before the meeting ends. No scoping phase, no warehouse project. Value on day one."), /*#__PURE__*/React.createElement(Rung, {
    n: "02",
    title: "Always, not annually"
  }, "The platform re-checks and re-scores continuously. When the business changes, the number changes, so governance tracks reality instead of last quarter."), /*#__PURE__*/React.createElement(Rung, {
    n: "03",
    title: "Evidence, not opinion"
  }, "Every figure carries its source, its working, and an audited history. Challenge any number and it shows how it was reached."))));
}
const PILLARS = [["govern", "01 · Control", "Data Governance", "Know what you hold.", "Every asset owned, classified, and controlled across the whole business, not just the warehouse. Ownership and policy in one register."], ["quality", "02 · Correctness", "Data Quality", "Trust what it says.", "Duplicates, gaps, and drift surfaced as they happen, so the decisions and the AI built on your data rest on something actually correct."], ["realtime", "03 · Cadence", "Realtime Assurance", "Never a snapshot.", "The platform does the checking and the assessment for you, continuously. The score is live. Nobody has to remember to run it."], ["alldata", "04 · Coverage", "All Of It", "Tables and everything else.", "Structured and unstructured together: databases, contracts, documents, tickets, transcripts. The risk usually lives in the files nobody indexed."], ["accredit", "05 · Outcome", "Accreditation Evidence", "Audit-ready by default.", "Controls map to the frameworks you are certified against as you work, so the audit becomes an export, not a project."], ["advisor", "06 · Guidance", "The Advisor", "Always one next step.", "AI assistants read your estate, sequence the work, and shape what comes next, for the companies that need governance guided, not just measured."]];
function Backbone() {
  const {
    Kicker,
    Pillar
  } = WS;
  return /*#__PURE__*/React.createElement("section", {
    className: "sec sec--dark",
    id: "product"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyerow"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, {
    tone: "dark"
  }, "02 \xB7 The backbone"), /*#__PURE__*/React.createElement("h2", {
    className: "h-xl",
    style: {
      color: "#fff",
      maxWidth: "16ch",
      margin: 0
    }
  }, "Six capabilities. One backbone."))), /*#__PURE__*/React.createElement("div", {
    className: "pillars",
    style: {
      marginTop: 44
    }
  }, PILLARS.map(([i, l, t, c, d]) => /*#__PURE__*/React.createElement(Pillar, {
    key: t,
    icon: i,
    label: l,
    title: t,
    claim: c
  }, d)))));
}
function Proof() {
  const {
    Kicker,
    Stat,
    FrameworkTag
  } = WS;
  return /*#__PURE__*/React.createElement("section", {
    className: "sec sec--dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyerow"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, {
    tone: "dark"
  }, "03 \xB7 The Proof"), /*#__PURE__*/React.createElement("h2", {
    className: "h-xl",
    style: {
      color: "#fff",
      maxWidth: "14ch",
      margin: 0
    }
  }, "What the customer actually gets.")), /*#__PURE__*/React.createElement("p", {
    className: "lede",
    style: {
      maxWidth: "34ch",
      margin: 0
    }
  }, "Instant gratification is the differentiator. Accreditation is the destination. Both are claims we can put a number against.")), /*#__PURE__*/React.createElement("div", {
    className: "pstats",
    style: {
      marginTop: 44
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "Minutes",
    label: "Time to first findings",
    accent: true
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "Realtime",
    label: "Assessment cadence"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "All data",
    label: "Structured & unstructured"
  })), /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginTop: "clamp(40px,5vw,58px)",
      display: "block"
    }
  }, "Frameworks the evidence maps to"), /*#__PURE__*/React.createElement("div", {
    className: "accs",
    style: {
      marginTop: 18
    }
  }, ["SOC 2", "ISO 27001", "ISO 9001", "ISO 42001", "ISO 17001", "GDPR", "HIPAA"].map(f => /*#__PURE__*/React.createElement(FrameworkTag, {
    key: f
  }, f))), /*#__PURE__*/React.createElement("div", {
    className: "boiler",
    style: {
      marginTop: 52
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "In one line"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "#fff",
      fontWeight: 600
    }
  }, "Govscape is realtime data and AI governance."), " We check every piece of data a business holds, structured and unstructured, for control, quality, and compliance risk; we quantify what it is costing you; and our advisors tell you what to fix next. ", /*#__PURE__*/React.createElement("em", null, "First results in minutes, evidence ready for audit.")))));
}
function Methodology({
  onCta
}) {
  const {
    Eyebrow,
    WebButton
  } = WS;
  return /*#__PURE__*/React.createElement("section", {
    className: "sec",
    id: "methodology"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-light"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "light"
  }, "The methodology"), /*#__PURE__*/React.createElement("div", {
    className: "w-h2"
  }, "Four pillars. One number your board can defend."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(WebButton, {
    onClick: onCta
  }, "Get in touch"), /*#__PURE__*/React.createElement(WebButton, {
    variant: "lined"
  }, "See the model")))));
}
function Footer() {
  const {
    Lockup
  } = WS;
  return /*#__PURE__*/React.createElement("footer", {
    className: "foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap foot-in"
  }, /*#__PURE__*/React.createElement(Lockup, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    className: "fine"
  }, "\xA9 Govscape 2026 \xB7 hello@govscape.app")));
}
Object.assign(window, {
  Idea,
  PromiseSection,
  Backbone,
  Proof,
  Methodology,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Site.jsx
try { (() => {
function Site() {
  const [toast, setToast] = React.useState(false);
  const map = {
    "Methodology": "methodology",
    "How it works": "how",
    "Product": "product",
    "FAQ": "methodology"
  };
  const onLink = l => {
    const el = document.getElementById(map[l]);
    if (el) window.scrollTo({
      top: el.offsetTop,
      behavior: "smooth"
    });
  };
  const onCta = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2400);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    onCta: onCta,
    onLink: onLink
  }), /*#__PURE__*/React.createElement(Idea, null), /*#__PURE__*/React.createElement(PromiseSection, null), /*#__PURE__*/React.createElement(Backbone, null), /*#__PURE__*/React.createElement(Proof, null), /*#__PURE__*/React.createElement(Methodology, {
    onCta: onCta
  }), /*#__PURE__*/React.createElement(Footer, null), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      left: "50%",
      bottom: 28,
      transform: "translateX(-50%)",
      background: "var(--graphite)",
      color: "var(--bone)",
      border: "1px solid var(--ink-line)",
      padding: "12px 18px",
      fontFamily: "var(--ff-mono)",
      fontSize: 12,
      letterSpacing: ".1em",
      textTransform: "uppercase"
    }
  }, "Demo request placeholder \u2014 no booking flow in source"));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(Site, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Site.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.AppIcon = __ds_scope.AppIcon;

__ds_ns.Kicker = __ds_scope.Kicker;

__ds_ns.Lockup = __ds_scope.Lockup;

__ds_ns.Mark = __ds_scope.Mark;

__ds_ns.AreaCard = __ds_scope.AreaCard;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Figure = __ds_scope.Figure;

__ds_ns.MoneyPair = __ds_scope.MoneyPair;

__ds_ns.TaskList = __ds_scope.TaskList;

__ds_ns.TaskRow = __ds_scope.TaskRow;

__ds_ns.WindowCard = __ds_scope.WindowCard;

__ds_ns.AdvisorDock = __ds_scope.AdvisorDock;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.EmptyWell = __ds_scope.EmptyWell;

__ds_ns.NextAction = __ds_scope.NextAction;

__ds_ns.Strip = __ds_scope.Strip;

__ds_ns.SystemBanner = __ds_scope.SystemBanner;

__ds_ns.AssignPicker = __ds_scope.AssignPicker;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.SearchField = __ds_scope.SearchField;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ICONS = __ds_scope.ICONS;

__ds_ns.BigNumber = __ds_scope.BigNumber;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.FrameworkTag = __ds_scope.FrameworkTag;

__ds_ns.Pillar = __ds_scope.Pillar;

__ds_ns.Rung = __ds_scope.Rung;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.WebButton = __ds_scope.WebButton;

__ds_ns.ClientSwitcher = __ds_scope.ClientSwitcher;

__ds_ns.NavItem = __ds_scope.NavItem;

__ds_ns.Rail = __ds_scope.Rail;

__ds_ns.RailSection = __ds_scope.RailSection;

__ds_ns.WebNav = __ds_scope.WebNav;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.ScoreRing = __ds_scope.ScoreRing;

})();
