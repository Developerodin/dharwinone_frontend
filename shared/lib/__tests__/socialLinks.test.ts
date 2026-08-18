import { describe, expect, it } from "vitest";
import {
  getSocialLinkUrlError,
  isSocialLinkUrlValid,
  normalizeSocialUrl,
  validateSocialLinkRows,
  validateSocialLinkRowsIncomplete,
} from "../socialLinks";

describe("normalizeSocialUrl", () => {
  it("prepends https when scheme is missing", () => {
    expect(normalizeSocialUrl("github.com/user")).toBe("https://github.com/user");
  });

  it("preserves an existing https URL", () => {
    expect(normalizeSocialUrl("https://linkedin.com/in/me")).toBe("https://linkedin.com/in/me");
  });
});

describe("getSocialLinkUrlError", () => {
  it("rejects bare invalid strings", () => {
    expect(getSocialLinkUrlError("GitHub", "www.github")).toMatch(/valid web address/i);
    expect(getSocialLinkUrlError("GitHub", "not a url")).toMatch(/valid web address/i);
  });

  it("accepts scheme-less domains that normalize to valid URLs", () => {
    expect(getSocialLinkUrlError("GitHub", "github.com/user")).toBeNull();
    expect(getSocialLinkUrlError("LinkedIn", "linkedin.com/in/me")).toBeNull();
  });

  it("enforces platform-specific hostnames", () => {
    expect(getSocialLinkUrlError("GitHub", "linkedin.com/in/me")).toMatch(/GitHub link/i);
    expect(getSocialLinkUrlError("LinkedIn", "github.com/user")).toMatch(/LinkedIn link/i);
    expect(getSocialLinkUrlError("Twitter", "facebook.com/page")).toMatch(/Twitter link/i);
  });

  it("allows GitHub gists and LinkedIn country subdomains", () => {
    expect(getSocialLinkUrlError("GitHub", "gist.github.com/user/123")).toBeNull();
    expect(getSocialLinkUrlError("LinkedIn", "uk.linkedin.com/in/me")).toBeNull();
  });

  it("allows any plausible URL for Portfolio, Website, and Other", () => {
    expect(getSocialLinkUrlError("Portfolio", "my-site.io/work")).toBeNull();
    expect(getSocialLinkUrlError("Website", "example.com")).toBeNull();
    expect(getSocialLinkUrlError("Other", "https://custom.dev/profile")).toBeNull();
  });
});

describe("isSocialLinkUrlValid", () => {
  it("returns false for invalid URLs", () => {
    expect(isSocialLinkUrlValid("GitHub", "www.github")).toBe(false);
  });
});

describe("validateSocialLinkRowsIncomplete", () => {
  it("flags rows with only platform or only URL", () => {
    expect(
      validateSocialLinkRowsIncomplete([{ platform: "GitHub", url: "" }]),
    ).toMatch(/add a URL/i);
    expect(
      validateSocialLinkRowsIncomplete([{ platform: "", url: "github.com/u" }]),
    ).toMatch(/choose a platform/i);
  });
});

describe("validateSocialLinkRows", () => {
  it("returns incomplete-row errors before URL format errors", () => {
    expect(
      validateSocialLinkRows([{ platform: "GitHub", url: "" }]),
    ).toMatch(/add a URL/i);
  });

  it("blocks save when a filled row has an invalid URL", () => {
    expect(
      validateSocialLinkRows([{ platform: "GitHub", url: "www.github" }]),
    ).toMatch(/Social link 1/i);
  });

  it("passes when rows are empty or fully valid", () => {
    expect(validateSocialLinkRows([])).toBeNull();
    expect(
      validateSocialLinkRows([{ platform: "GitHub", url: "github.com/octocat" }]),
    ).toBeNull();
  });
});
