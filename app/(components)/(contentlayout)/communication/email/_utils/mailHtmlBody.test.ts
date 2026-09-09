import { describe, it, expect } from "vitest";
import { htmlHasBlockedImages, prepareMailBodyHtml } from "./mailHtmlBody";

describe("prepareMailBodyHtml", () => {
  it("withholds remote images by default, so opening a message reports nothing to the sender", () => {
    const out = prepareMailBodyHtml('<img src="https://cdn.example/logo.png">');
    expect(out).not.toContain("cdn.example");
    expect(htmlHasBlockedImages(out)).toBe(true);
  });

  it("withholds http and protocol-relative sources too", () => {
    expect(prepareMailBodyHtml('<img src="http://track.example/p.gif">')).not.toContain("track.example");
    expect(prepareMailBodyHtml('<img src="//track.example/p.gif">')).not.toContain("track.example");
  });

  it("withholds remote video and source elements, not just images", () => {
    expect(prepareMailBodyHtml('<video src="https://track.example/v.mp4"></video>')).not.toContain(
      "track.example"
    );
    expect(prepareMailBodyHtml('<source src="https://track.example/v.mp4">')).not.toContain(
      "track.example"
    );
  });

  // A sender controls every attribute, so anything that parses the sanitized
  // string with a regex can be walked past. These two did exactly that.
  it("cannot be bypassed by hiding src= inside another attribute", () => {
    const out = prepareMailBodyHtml('<img alt="x src=y" src="https://track.example/p.gif">');
    expect(out).not.toContain("track.example");
    expect(htmlHasBlockedImages(out)).toBe(true);
  });

  it("cannot be bypassed by a > inside an attribute value", () => {
    const out = prepareMailBodyHtml('<img alt="a>b" src="https://track.example/p.gif">');
    expect(out).not.toContain("track.example");
    expect(htmlHasBlockedImages(out)).toBe(true);
  });

  it("does not mangle the body while withholding", () => {
    // The old string surgery could emit `alt="a data-remote-image="blocked">b">`,
    // leaking the tail of the attribute as visible text.
    const out = prepareMailBodyHtml('<p>hello</p><img alt="a>b" src="https://track.example/p.gif">');
    expect(out).toContain("<p>hello</p>");
    expect(out).not.toContain('b">');
  });

  // data: and cid: never leave the machine, so withholding them would break
  // inline logos and signatures for no privacy gain.
  it("keeps inline data: images", () => {
    const out = prepareMailBodyHtml('<img src="data:image/png;base64,iVBORw0KGgo=" alt="sig">');
    expect(out).toContain("data:image/png;base64");
    expect(htmlHasBlockedImages(out)).toBe(false);
  });

  it("loads remote media once the reader opts in", () => {
    const out = prepareMailBodyHtml('<img src="https://cdn.example/logo.png">', {
      loadRemoteImages: true,
    });
    expect(out).toContain("cdn.example");
    expect(htmlHasBlockedImages(out)).toBe(false);
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

  it("leaves later sanitize calls unaffected by the temporary hook", () => {
    prepareMailBodyHtml('<img src="https://cdn.example/a.png">');
    const after = prepareMailBodyHtml('<img src="https://cdn.example/b.png">', {
      loadRemoteImages: true,
    });
    expect(after).toContain("cdn.example");
  });
});
