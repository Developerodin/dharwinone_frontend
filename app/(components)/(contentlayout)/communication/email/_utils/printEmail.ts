import type { EmailMessage } from "@/shared/lib/api/email";
import { escapeHtmlForTextNode, sanitizeRichHtml } from "@/shared/lib/sanitize-html";

type PrintableMessage = Pick<
  EmailMessage,
  "from" | "to" | "date" | "subject" | "htmlBody" | "textBody"
>;

/**
 * Build the printable document for a thread.
 *
 * Every field here comes out of a received email, which is attacker-controlled.
 * The document used to be written verbatim into a `window.open("")` popup - an
 * about:blank window that inherits this app's origin - so a crafted message ran
 * script as the signed-in user. Three separate fields were injectable: the HTML
 * body, the text/plain body (which bypasses any HTML-only fix), and the headers,
 * which only escaped "<".
 *
 * The reading pane already renders bodies through sanitizeRichHtml; print now
 * uses the same allowlist so both surfaces agree on what an email may contain.
 */
export function buildPrintDocument(messages: PrintableMessage[]): string {
  const firstMsg = messages[0];
  const subject = escapeHtmlForTextNode(firstMsg?.subject || "");

  const blocks = messages.map((msg) => {
    const body = msg.htmlBody?.trim()
      ? sanitizeRichHtml(msg.htmlBody)
      : msg.textBody
        ? `<pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtmlForTextNode(msg.textBody)}</pre>`
        : "<p>No content</p>";
    return `
      <div class="msg-block" style="margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:1px solid #eee;">
        <div class="meta">
          <p><strong>From:</strong> ${escapeHtmlForTextNode(msg.from || "")}</p>
          <p><strong>To:</strong> ${escapeHtmlForTextNode(msg.to || "")}</p>
          <p><strong>Date:</strong> ${escapeHtmlForTextNode(msg.date || "")}</p>
        </div>
        <div class="body" style="margin-top:0.5rem;">${body}</div>
      </div>
    `;
  });

  return `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${subject || "Email"}</title>
          <style>
            body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
            .subject { font-size: 18px; font-weight: 600; margin-bottom: 1.5rem; }
            .body img { max-width: 100%; }
            @media print { body { margin: 0; padding: 1rem; } }
          </style>
        </head>
        <body>
          <div class="subject">${subject || "(No subject)"}</div>
          ${blocks.join("")}
        </body>
      </html>
    `;
}
