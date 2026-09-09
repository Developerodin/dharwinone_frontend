import { describe, it, expect } from "vitest";
import { blockRemoteImagesInHtml, htmlHasRemoteImages, prepareMailBodyHtml } from "./mailHtmlBody";

describe("blockRemoteImagesInHtml", () => {
  it("removes remote src from img tags and marks them blocked", () => {
    const out = blockRemoteImagesInHtml('<p>hi</p><img src="https://track.example/pixel.gif" alt="logo">');
    expect(out).not.toContain("track.example");
    expect(out).toContain('data-remote-image="blocked"');
    expect(out).toContain('alt="logo"');
  });

  it("blocks http and protocol-relative sources too", () => {
    expect(blockRemoteImagesInHtml('<img src="http://track.example/p.gif">')).not.toContain("track.example");
    expect(blockRemoteImagesInHtml('<img src="//track.example/p.gif">')).not.toContain("track.example");
  });

  it("blocks remote video and source elements, not just images", () => {
    expect(blockRemoteImagesInHtml('<video src="https://track.example/v.mp4"></video>')).not.toContain(
      "track.example"
    );
    expect(blockRemoteImagesInHtml('<source src="https://track.example/v.mp4">')).not.toContain(
      "track.example"
    );
  });

  // data: and cid: never leave the machine, so blocking them would break inline
  // logos and signatures for no privacy gain.
  it("keeps inline data: images", () => {
    const html = '<img src="data:image/png;base64,iVBORw0KGgo=" alt="sig">';
    expect(blockRemoteImagesInHtml(html)).toBe(html);
  });

  it("keeps cid: references to the message's own attachments", () => {
    const html = '<img src="cid:logo@example">';
    expect(blockRemoteImagesInHtml(html)).toBe(html);
  });

  it("leaves img tags without src alone", () => {
    expect(blockRemoteImagesInHtml('<img alt="x">')).toBe('<img alt="x">');
  });
});

describe("htmlHasRemoteImages", () => {
  it("detects a remote source", () => {
    expect(htmlHasRemoteImages('<img src="https://a/b.png">')).toBe(true);
    expect(htmlHasRemoteImages('<img src="//a/b.png">')).toBe(true);
  });

  it("does not count inline or absent sources", () => {
    expect(htmlHasRemoteImages("<p>plain</p>")).toBe(false);
    expect(htmlHasRemoteImages('<img src="data:image/png;base64,iVBORw0KGgo=">')).toBe(false);
    expect(htmlHasRemoteImages('<img src="cid:logo@example">')).toBe(false);
    expect(htmlHasRemoteImages('<img alt="no src">')).toBe(false);
  });

  it("is repeatable - the shared global regex must not carry state between calls", () => {
    const html = '<img src="https://a/b.png">';
    expect(htmlHasRemoteImages(html)).toBe(true);
    expect(htmlHasRemoteImages(html)).toBe(true);
  });
});

describe("prepareMailBodyHtml", () => {
  it("blocks remote images by default, so opening a message reports nothing to the sender", () => {
    const out = prepareMailBodyHtml('<img src="https://cdn.example/logo.png">');
    expect(out).not.toContain("cdn.example");
    expect(out).toContain('data-remote-image="blocked"');
  });

  it("loads them once the reader opts in", () => {
    const out = prepareMailBodyHtml('<img src="https://cdn.example/logo.png">', {
      loadRemoteImages: true,
    });
    expect(out).toContain("cdn.example");
  });

  it("sanitizes either way", () => {
    for (const loadRemoteImages of [true, false]) {
      const out = prepareMailBodyHtml(
        '<p>x</p><script>alert(1)</script><img src="https://evil/x" onerror="alert(1)">',
        { loadRemoteImages }
      );
      expect(out).not.toContain("<script>");
      expect(out).not.toContain("onerror");
    }
  });

  it("returns empty for a blank body", () => {
    expect(prepareMailBodyHtml(null)).toBe("");
    expect(prepareMailBodyHtml("   ")).toBe("");
  });
});
