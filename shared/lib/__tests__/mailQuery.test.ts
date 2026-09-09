import { describe, it, expect } from "vitest";
import { buildMailQuery } from "../mailQuery";

const scoped = (s: string) => `from:"${s}" OR subject:"${s}"`;

describe("buildMailQuery", () => {
  it("scopes plain text to sender + subject", () => {
    expect(buildMailQuery("mo")).toBe('from:"mo" OR subject:"mo"');
    expect(buildMailQuery("invoice")).toBe(scoped("invoice"));
    expect(buildMailQuery("  jane doe  ")).toBe(scoped("jane doe"));
  });

  it("passes operator queries through untouched (is:unread must not be wrapped)", () => {
    expect(buildMailQuery("is:unread")).toBe("is:unread");
    expect(buildMailQuery("isRead:false")).toBe("isRead:false");
    expect(buildMailQuery("from:john@x.test")).toBe("from:john@x.test");
    expect(buildMailQuery('subject:"q4 report"')).toBe('subject:"q4 report"');
    expect(buildMailQuery("has:attachment")).toBe("has:attachment");
    expect(buildMailQuery("from:john is:unread")).toBe("from:john is:unread");
  });

  it("returns empty for blank input", () => {
    expect(buildMailQuery("")).toBe("");
    expect(buildMailQuery("   ")).toBe("");
  });

  it("strips quotes so phrases can't break the query", () => {
    expect(buildMailQuery('john "doe')).toBe('from:"john doe" OR subject:"john doe"');
    expect(buildMailQuery('say "hi"')).toBe(scoped("say hi"));
  });

  // A colon only marks an operator when it follows a bare word and is followed by
  // a value. Everything below is ordinary text a user types into the search box;
  // sending it through raw made the provider return nothing.

  it("treats a clock time as plain text, not an operator", () => {
    expect(buildMailQuery("3:30 standup")).toBe(scoped("3:30 standup"));
  });

  it("treats a trailing-colon word as plain text", () => {
    expect(buildMailQuery("Re: budget")).toBe(scoped("Re: budget"));
    expect(buildMailQuery("note: follow up")).toBe(scoped("note: follow up"));
  });

  it("treats a pasted URL as plain text", () => {
    expect(buildMailQuery("https://example.test/report")).toBe(
      scoped("https://example.test/report")
    );
  });

  it("treats a bare ratio or ID with a colon as plain text", () => {
    expect(buildMailQuery("16:9 mockups")).toBe(scoped("16:9 mockups"));
  });
});
