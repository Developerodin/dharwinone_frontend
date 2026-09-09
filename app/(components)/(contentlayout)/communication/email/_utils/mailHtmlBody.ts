import { sanitizeRichHtml } from "@/shared/lib/sanitize-html";

/** True when sanitized HTML still carries at least one image src. */
export function htmlHasRemoteImages(html: string): boolean {
  return /<img\b[^>]*\ssrc\s*=/i.test(html);
}

/** Strip image sources so remote tracking pixels and banners do not load. */
export function blockRemoteImagesInHtml(html: string): string {
  return html.replace(/<img\b([^>]*)>/gi, (_match, attrs: string) => {
    if (!/\ssrc\s*=/i.test(attrs)) return `<img${attrs}>`;
    const withoutSrc = attrs.replace(/\s+src\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
    return `<img${withoutSrc} data-remote-image="blocked">`;
  });
}

export function prepareMailBodyHtml(
  rawHtml: string | null | undefined,
  options: { loadRemoteImages: boolean }
): string {
  if (!rawHtml?.trim()) return "";
  const sanitized = sanitizeRichHtml(rawHtml);
  return options.loadRemoteImages ? sanitized : blockRemoteImagesInHtml(sanitized);
}
