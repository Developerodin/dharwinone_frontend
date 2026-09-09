import { describe, it, expect } from "vitest";
import { parseQuickRecipients } from "./quickRecipients";

describe("parseQuickRecipients", () => {
  it("reads the normal shape", () => {
    expect(parseQuickRecipients('[{"email":"a@x.test"},{"email":"b@x.test"}]')).toEqual([
      { email: "a@x.test" },
      { email: "b@x.test" },
    ]);
  });

  it("returns empty for absent or blank storage", () => {
    expect(parseQuickRecipients(null)).toEqual([]);
    expect(parseQuickRecipients("")).toEqual([]);
  });

  // --- the crash paths ---

  it("survives malformed JSON", () => {
    expect(parseQuickRecipients("{not json")).toEqual([]);
  });

  it("survives a non-array payload", () => {
    expect(parseQuickRecipients('{"email":"a@x.test"}')).toEqual([]);
    expect(parseQuickRecipients("null")).toEqual([]);
    expect(parseQuickRecipients("42")).toEqual([]);
  });

  it("drops entries with no usable email instead of crashing render", () => {
    expect(parseQuickRecipients('[{"email":"a@x.test"},{},null,7,{"email":123},{"email":"  "}]')).toEqual([
      { email: "a@x.test" },
    ]);
  });

  it("keeps contacts an older build may have stored unwrapped", () => {
    expect(parseQuickRecipients('["a@x.test",{"email":"b@x.test"}]')).toEqual([
      { email: "a@x.test" },
      { email: "b@x.test" },
    ]);
  });

  it("trims and de-duplicates case-insensitively", () => {
    expect(parseQuickRecipients('[" a@x.test ","A@X.test","b@x.test"]')).toEqual([
      { email: "a@x.test" },
      { email: "b@x.test" },
    ]);
  });
});
