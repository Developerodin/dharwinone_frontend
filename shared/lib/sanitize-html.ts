import DOMPurify from "isomorphic-dompurify";

/**
 * CSS properties allowed inside inline `style` attributes. Anything not listed
 * (position, z-index, transform, opacity, background-image, behavior, url(...), etc.)
 * is stripped to prevent CSS-based XSS / clickjacking / data-exfil.
 */
const ALLOWED_CSS_PROPS = new Set([
  "color",
  "background-color",
  "font-size",
  "font-family",
  "font-weight",
  "font-style",
  "text-align",
  "text-decoration",
  "line-height",
  "width",
  "height",
]);

/** Filter a CSS declaration string down to the allowlisted, url()-free properties. */
function filterStyleAttr(value: string): string {
  return value
    .split(";")
    .map((decl) => decl.trim())
    .filter(Boolean)
    .filter((decl) => {
      const idx = decl.indexOf(":");
      if (idx === -1) return false;
      const prop = decl.slice(0, idx).trim().toLowerCase();
      const val = decl.slice(idx + 1).trim().toLowerCase();
      if (!ALLOWED_CSS_PROPS.has(prop)) return false;
      // Reject any value carrying url()/expression()/external refs.
      if (/url\(|expression\(|javascript:|@import|\\/.test(val)) return false;
      return true;
    })
    .join("; ");
}

DOMPurify.addHook("uponSanitizeAttribute", (_node, data) => {
  if (data.attrName === "style") {
    data.attrValue = filterStyleAttr(data.attrValue);
  }
});

const RICH_HTML_CONFIG: Parameters<typeof DOMPurify.sanitize>[1] = {
  ALLOWED_TAGS: [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "ul",
    "ol",
    "li",
    "a",
    "h1",
    "h2",
    "h3",
    "h4",
    "blockquote",
    "code",
    "pre",
    "span",
    "div",
    "img",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "mark",
    "video",
    "source",
  ],
  ALLOWED_ATTR: ["href", "target", "rel", "class", "style", "src", "alt", "width", "height", "colspan", "rowspan", "type"],
};

/** Media that can pull something off the network once rendered. */
const REMOTE_MEDIA_TAGS = new Set(["img", "video", "source"]);

/** data: is inline bytes and cid: is an attachment already in the message; neither hits the network. */
function isRemoteMediaSrc(value: string): boolean {
  return /^\s*(?:https?:)?\/\//i.test(value);
}

/**
 * Drop remote sources during sanitization.
 *
 * Runs as a DOMPurify hook rather than over the output string: attribute values
 * are not escaped for spaces, "=" or ">", so a sender who controls `alt` can
 * hide `src=` inside it and walk straight past any regex. Here the value is read
 * off a parsed node, so there is nothing to smuggle.
 */
function blockRemoteMedia(node: Element): void {
  const tag = node.tagName?.toLowerCase?.();
  if (!tag || !REMOTE_MEDIA_TAGS.has(tag)) return;
  const src = node.getAttribute?.("src");
  if (!src || !isRemoteMediaSrc(src)) return;
  node.removeAttribute("src");
  node.setAttribute("data-remote-image", "blocked");
}

/**
 * Sanitize untrusted HTML before dangerouslySetInnerHTML (blog, job
 * descriptions, mail bodies).
 *
 * `blockRemoteMedia` additionally strips remote image, video and source
 * sources, so opening the content does not announce itself to whoever wrote it.
 * Off by default: only mail needs it.
 */
export function sanitizeRichHtml(
  html: string,
  options: { blockRemoteMedia?: boolean } = {}
): string {
  if (!html || typeof html !== "string") return "";
  if (!options.blockRemoteMedia) return DOMPurify.sanitize(html, RICH_HTML_CONFIG);
  // Hooks are global, so it is added and removed around this one call. It is a
  // different entry point from the style hook above, which is left in place.
  DOMPurify.addHook("afterSanitizeAttributes", blockRemoteMedia);
  try {
    return DOMPurify.sanitize(html, RICH_HTML_CONFIG);
  } finally {
    DOMPurify.removeHook("afterSanitizeAttributes");
  }
}

export function escapeHtmlForTextNode(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
