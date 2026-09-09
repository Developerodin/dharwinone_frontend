import { sanitizeRichHtml } from "@/shared/lib/sanitize-html";

/**
 * Media tags the sanitizer allows to carry a src. `srcset`, `background` and
 * `background-image` are all stripped by sanitizeRichHtml (its attribute
 * allowlist omits them, and its style filter rejects url()), so these are the
 * only ways a message body can pull something off the network.
 */
const MEDIA_TAG = /<(img|video|source)\b([^>]*)>/gi;
const SRC_ATTR = /\ssrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i;

/**
 * True for sources that cause a network request when the message is opened.
 *
 * `data:` is inline bytes and `cid:` refers to an attachment already in the
 * message, so neither reveals anything to the sender. Blocking those would only
 * break inline logos and signatures with no privacy gain.
 */
function isRemoteSrc(value: string): boolean {
  return /^\s*(?:https?:)?\/\//i.test(value);
}

function srcOf(attrs: string): string | null {
  const m = attrs.match(SRC_ATTR);
  if (!m) return null;
  return m[1] ?? m[2] ?? m[3] ?? "";
}

/** True when the body would fetch something remote if rendered as-is. */
export function htmlHasRemoteImages(html: string): boolean {
  for (const match of html.matchAll(MEDIA_TAG)) {
    const src = srcOf(match[2]);
    if (src !== null && isRemoteSrc(src)) return true;
  }
  return false;
}

/**
 * Strip remote sources so tracking pixels and remote banners do not load.
 *
 * Runs on already-sanitized HTML, so the input is DOMPurify's normalized output
 * rather than raw mail: attribute values have their angle brackets escaped,
 * which is what makes a tag-level regex safe here. A miss can only leave an
 * image loading, never introduce markup.
 */
export function blockRemoteImagesInHtml(html: string): string {
  return html.replace(MEDIA_TAG, (match, tag: string, attrs: string) => {
    const src = srcOf(attrs);
    if (src === null || !isRemoteSrc(src)) return match;
    return `<${tag}${attrs.replace(SRC_ATTR, "")} data-remote-image="blocked">`;
  });
}

/**
 * Sanitize a message body for display.
 *
 * Remote media is blocked by default. Opening a message otherwise announced the
 * open to whoever sent it - a tracking pixel reports the read time and the
 * reader's IP - which is why mail clients ask before loading them. The caller
 * opts in per conversation once the reader says so.
 */
export function prepareMailBodyHtml(
  rawHtml: string | null | undefined,
  options: { loadRemoteImages?: boolean } = {}
): string {
  if (!rawHtml?.trim()) return "";
  const sanitized = sanitizeRichHtml(rawHtml);
  return options.loadRemoteImages ? sanitized : blockRemoteImagesInHtml(sanitized);
}
