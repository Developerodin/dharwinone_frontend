import { describe, it, expect } from "vitest";
import { buildPrintDocument } from "./printEmail";

const msg = (over: Partial<Parameters<typeof buildPrintDocument>[0][number]> = {}) => ({
  from: "Sender <s@x.test>",
  to: "me@x.test",
  date: "Mon, 1 Sep 2026 10:00:00 +0000",
  subject: "Quarterly report",
  htmlBody: "<p>hello</p>",
  textBody: null,
  ...over,
});

describe("buildPrintDocument", () => {
  it("renders the ordinary case", () => {
    const doc = buildPrintDocument([msg()]);
    expect(doc).toContain("Quarterly report");
    expect(doc).toContain("<p>hello</p>");
    expect(doc).toContain("s@x.test");
  });

  // The print document is written into a document the page controls. A received
  // email is attacker-controlled input, so nothing from it may become live markup.

  it("strips a script tag in the HTML body", () => {
    const doc = buildPrintDocument([msg({ htmlBody: "<p>hi</p><script>alert(1)</script>" })]);
    expect(doc).not.toContain("<script>");
    expect(doc).not.toContain("alert(1)");
  });

  it("strips an inline event handler in the HTML body", () => {
    const doc = buildPrintDocument([msg({ htmlBody: '<img src="x" onerror="alert(1)">' })]);
    expect(doc).not.toContain("onerror");
  });

  it("strips a javascript: URL in the HTML body", () => {
    const doc = buildPrintDocument([msg({ htmlBody: '<a href="javascript:alert(1)">go</a>' })]);
    expect(doc).not.toContain("javascript:");
  });

  it("escapes the plain-text body instead of injecting it", () => {
    // The text/plain MIME part is attacker-controlled too, and bypasses any fix
    // that only sanitizes the HTML part.
    const doc = buildPrintDocument([msg({ htmlBody: null, textBody: "<script>alert(1)</script>" })]);
    expect(doc).not.toContain("<script>");
    expect(doc).toContain("&lt;script&gt;");
  });

  it("escapes header fields, including ampersands", () => {
    const doc = buildPrintDocument([
      msg({ from: '<script>alert(1)</script>', subject: "Q4 R&D <b>review</b>" }),
    ]);
    expect(doc).not.toContain("<script>");
    expect(doc).toContain("R&amp;D");
    expect(doc).not.toContain("<b>review</b>");
  });

  it("keeps safe formatting from the HTML body", () => {
    const doc = buildPrintDocument([
      msg({ htmlBody: '<p><strong>bold</strong> <a href="https://x.test">link</a></p>' }),
    ]);
    expect(doc).toContain("<strong>bold</strong>");
    expect(doc).toContain("https://x.test");
  });
});
