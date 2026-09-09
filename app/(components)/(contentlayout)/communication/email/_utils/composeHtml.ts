import type { EmailMessage } from "@/shared/lib/api/email";
import { escapeHtmlForTextNode, sanitizeRichHtml } from "@/shared/lib/sanitize-html";

type QuotableMessage = Pick<
  EmailMessage,
  "from" | "to" | "cc" | "date" | "subject" | "htmlBody" | "textBody"
>;

/**
 * The quoted original, for the reply/forward compose body.
 *
 * The source is a received email, so every field is attacker-controlled. It used
 * to be interpolated raw: a sender display name containing markup injected into
 * the quote, a text/plain body was rendered as HTML rather than as text, and if
 * the user sent without typing anything, `composeHtml` was still that raw string
 * - so inbound HTML was relayed back out under the user's own address.
 */
function quotedOriginal(msg: QuotableMessage): string {
  if (msg.htmlBody?.trim()) return sanitizeRichHtml(msg.htmlBody);
  if (msg.textBody?.trim()) return escapeHtmlForTextNode(msg.textBody);
  return "";
}

export function buildReplyQuote(msg: QuotableMessage): string {
  const who = escapeHtmlForTextNode(msg.from || "");
  const when = escapeHtmlForTextNode(msg.date || "");
  return `\n\n<div class="mail-quoted"><p>On ${when} ${who} wrote:</p><blockquote>${quotedOriginal(msg)}</blockquote></div>`;
}

export function buildForwardQuote(msg: QuotableMessage, subject: string): string {
  const esc = escapeHtmlForTextNode;
  const ccLine = msg.cc ? `<br/>Cc: ${esc(msg.cc)}` : "";
  return `\n\n<div class="mail-forwarded"><p>---------- Forwarded message ---------</p><p>From: ${esc(
    msg.from || ""
  )}<br/>To: ${esc(msg.to || "")}${ccLine}<br/>Date: ${esc(msg.date || "")}<br/>Subject: ${esc(
    subject
  )}</p><blockquote>${quotedOriginal(msg)}</blockquote></div>`;
}

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
