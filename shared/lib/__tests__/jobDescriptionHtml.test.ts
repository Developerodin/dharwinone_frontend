import { describe, expect, it } from "vitest";
import { formatJobDescriptionForDisplay } from "../ats/jobDescriptionHtml";

/** Mirrors the `description_text` shape RapidAPI returns when HTML is unavailable. */
const PLAIN_FEED_BODY = [
  "WHAT WE OFFER",
  "",
  " * Competitive Pay + Tips: Enjoy a competitive salary.",
  " * Professional Development: Build valuable skills.",
  " * Vibrant Work Culture",
  "",
  "We review every application.",
].join("\n");

describe("formatJobDescriptionForDisplay", () => {
  it("renders consecutive plain-text bullets as a real list", () => {
    const html = formatJobDescriptionForDisplay(PLAIN_FEED_BODY);
    expect(html).toContain("<ul>");
    expect((html.match(/<li>/g) ?? []).length).toBe(3);
    expect(html).not.toContain("* Competitive");
  });

  it("keeps the bullet's leading label bold", () => {
    const html = formatJobDescriptionForDisplay(PLAIN_FEED_BODY);
    expect(html).toContain("<strong>Competitive Pay + Tips:</strong>");
  });

  it("renders numbered lines as an ordered list", () => {
    const html = formatJobDescriptionForDisplay("1. Apply online\n2. Phone screen\n3. Onsite");
    expect(html).toContain("<ol>");
    expect((html.match(/<li>/g) ?? []).length).toBe(3);
  });

  it("keeps non-bullet prose in paragraphs", () => {
    const html = formatJobDescriptionForDisplay(PLAIN_FEED_BODY);
    expect(html).toContain("<p>");
    expect(html).toContain("We review every application.");
  });

  it("passes source HTML through apart from sanitising", () => {
    const html = formatJobDescriptionForDisplay(
      "<p><strong>ABOUT</strong></p><ul><li>One</li><li>Two</li></ul>"
    );
    expect(html).toContain("<ul>");
    expect(html).toContain("<strong>ABOUT</strong>");
    expect((html.match(/<li>/g) ?? []).length).toBe(2);
  });

  it("strips scripts from source HTML", () => {
    const html = formatJobDescriptionForDisplay("<p>Hi</p><script>alert(1)</script>");
    expect(html).not.toContain("script");
  });
});
