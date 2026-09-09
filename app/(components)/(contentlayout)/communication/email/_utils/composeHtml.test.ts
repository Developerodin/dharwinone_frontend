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
