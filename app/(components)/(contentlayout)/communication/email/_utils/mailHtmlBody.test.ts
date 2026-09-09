import { describe, it, expect } from "vitest";
import { blockRemoteImagesInHtml, htmlHasRemoteImages, prepareMailBodyHtml } from "./mailHtmlBody";

describe("blockRemoteImagesInHtml", () => {
  it("removes src from img tags and marks them blocked", () => {
    const out = blockRemoteImagesInHtml('<p>hi</p><img src="https://track.example/pixel.gif" alt="logo">');
    expect(out).not.toContain("track.example");
    expect(out).toContain('data-remote-image="blocked"');
    expect(out).toContain('alt="logo"');
  });

  it("leaves img tags without src alone", () => {
    expect(blockRemoteImagesInHtml('<img alt="x">')).toBe('<img alt="x">');
  });
});

describe("htmlHasRemoteImages", () => {
  it("detects an image src", () => {
    expect(htmlHasRemoteImages('<img src="https://a/b.png">')).toBe(true);
    expect(htmlHasRemoteImages("<p>plain</p>")).toBe(false);
  });
});

describe("prepareMailBodyHtml", () => {
  it("blocks remote images by default", () => {
    const out = prepareMailBodyHtml('<p>x</p><img src="https://evil/x" onerror="alert(1)">', {
      loadRemoteImages: false,
    });
    expect(out).not.toContain("evil");
    expect(out).not.toContain("onerror");
  });

  it("allows images when explicitly enabled", () => {
    const out = prepareMailBodyHtml('<img src="https://cdn.example/logo.png">', { loadRemoteImages: true });
    expect(out).toContain("cdn.example");
  });
});
