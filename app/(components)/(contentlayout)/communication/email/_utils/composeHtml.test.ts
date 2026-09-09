import { describe, it, expect } from "vitest";
import { cleanHtmlForSend } from "./composeHtml";

// Tiptap's getHTML() already returns real HTML with only *text content* escaped
// (a typed "<" is `&lt;`, a typed "&" is `&amp;`). Un-escaping that on the way
// out turns the user's literal text into live markup in the recipient's inbox.
describe("cleanHtmlForSend", () => {
  it("keeps typed angle brackets as text, not markup", () => {
    // user typed:  if a < b and c > d
    expect(cleanHtmlForSend("<p>if a &lt; b and c &gt; d</p>")).toBe(
      "<p>if a &lt; b and c &gt; d</p>"
    );
  });

  it("keeps a typed ampersand escaped", () => {
    // user typed:  Tom & Jerry
    expect(cleanHtmlForSend("<p>Tom &amp; Jerry</p>")).toBe("<p>Tom &amp; Jerry</p>");
  });

  it("does not turn typed text into an executable tag", () => {
    // user typed the literal characters:  <script>alert(1)</script>
    const out = cleanHtmlForSend("<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>");
    expect(out).not.toContain("<script>");
  });

  it("does not second-order unescape an escaped entity", () => {
    // user typed the literal characters:  &lt;
    expect(cleanHtmlForSend("<p>&amp;lt;</p>")).toBe("<p>&amp;lt;</p>");
  });

  it("keeps typed quotes escaped", () => {
    expect(cleanHtmlForSend("<p>she said &quot;hi&quot;</p>")).toBe(
      "<p>she said &quot;hi&quot;</p>"
    );
  });

  // Behaviour that must be preserved (this is what the function is actually for).
  it("still strips empty and br-only paragraphs", () => {
    expect(cleanHtmlForSend("<p>hi</p><p></p><p><br></p>")).toBe("<p>hi</p>");
  });

  it("still returns an empty paragraph for blank input", () => {
    expect(cleanHtmlForSend("")).toBe("<p></p>");
    expect(cleanHtmlForSend("   ")).toBe("<p></p>");
    expect(cleanHtmlForSend("<p></p>")).toBe("<p></p>");
  });

  it("leaves real markup from the editor untouched", () => {
    expect(cleanHtmlForSend('<p><strong>bold</strong> <a href="https://x.test">link</a></p>')).toBe(
      '<p><strong>bold</strong> <a href="https://x.test">link</a></p>'
    );
  });
});

import { buildReplyQuote, buildForwardQuote } from "./composeHtml";

const original = (over: Record<string, unknown> = {}) =>
  ({
    from: "Sender <s@x.test>",
    to: "me@x.test",
    cc: "",
    date: "Mon, 1 Sep 2026 10:00:00 +0000",
    subject: "Quarterly report",
    htmlBody: "<p>hello</p>",
    textBody: null,
    ...over,
  }) as Parameters<typeof buildReplyQuote>[0];

describe("buildReplyQuote", () => {
  it("quotes the original body and attribution line", () => {
    const q = buildReplyQuote(original());
    expect(q).toContain("<p>hello</p>");
    expect(q).toContain("s@x.test");
    expect(q).toContain('class="mail-quoted"');
  });

  it("strips script and event handlers from the quoted HTML body", () => {
    const q = buildReplyQuote(original({ htmlBody: '<p>hi</p><script>alert(1)</script><img src=x onerror=alert(2)>' }));
    expect(q).not.toContain("<script>");
    expect(q).not.toContain("onerror");
  });

  it("renders a text/plain original as text, not as markup", () => {
    const q = buildReplyQuote(original({ htmlBody: null, textBody: "see <b>this</b>" }));
    expect(q).toContain("&lt;b&gt;");
    expect(q).not.toContain("<b>this</b>");
  });

  it("escapes a sender display name that contains markup", () => {
    const q = buildReplyQuote(original({ from: "<img src=x onerror=alert(1)> Evil" }));
    // The name is rendered as text, so the word "onerror" survives as visible
    // characters - what matters is that no live <img tag is emitted.
    expect(q).toContain("&lt;img");
    expect(q).not.toMatch(/<img[\s>]/);
  });

  it("keeps safe formatting in the quote", () => {
    const q = buildReplyQuote(original({ htmlBody: "<p><strong>bold</strong></p>" }));
    expect(q).toContain("<strong>bold</strong>");
  });
});

describe("buildForwardQuote", () => {
  it("includes the forwarded header block", () => {
    const q = buildForwardQuote(original(), "Quarterly report");
    expect(q).toContain("Forwarded message");
    expect(q).toContain("me@x.test");
    expect(q).toContain("Quarterly report");
  });

  it("omits the Cc line when there is no Cc", () => {
    expect(buildForwardQuote(original(), "s")).not.toContain("Cc:");
    expect(buildForwardQuote(original({ cc: "c@x.test" }), "s")).toContain("Cc: c@x.test");
  });

  it("escapes every header field and sanitizes the body", () => {
    const q = buildForwardQuote(
      original({ to: "<script>alert(1)</script>", htmlBody: '<a href="javascript:alert(1)">x</a>' }),
      "<script>alert(2)</script>"
    );
    expect(q).not.toContain("<script>");
    expect(q).not.toContain("javascript:");
  });
});
