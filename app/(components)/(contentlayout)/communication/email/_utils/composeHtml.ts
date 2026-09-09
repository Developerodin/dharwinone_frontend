/**
 * Clean Tiptap HTML before send: drop empty paragraphs and trim.
 *
 * Deliberately does NOT unescape entities. Tiptap's getHTML() already returns
 * real HTML with only *text content* escaped, so unescaping turned a typed
 * "a < b" into broken markup and a typed "<script>" into a live tag in the
 * recipient's inbox. The old unescape was a leftover from the Quill editor this
 * page used before (the .ql-* rules are still in _pages_styles.scss).
 */
export function cleanHtmlForSend(html: string): string {
  if (!html?.trim()) return "<p></p>";
  const cleaned = html
    .replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, "")
    .replace(/<p>\s*<\/p>/g, "")
    .trim();
  return cleaned || "<p></p>";
}
