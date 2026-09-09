import { describe, it, expect } from "vitest";
import { resolveListScope } from "./listScope";

describe("resolveListScope", () => {
  it("asks for archived mail by exclusion on Gmail, which has no archive folder", () => {
    const { labelId, q } = resolveListScope("gmail", "ARCHIVE", "");
    expect(labelId).toBeUndefined();
    expect(q).toContain("-in:inbox");
    expect(q).toContain("-in:sent");
  });

  it("keeps the user's search while scoping it to archived mail", () => {
    const { q } = resolveListScope("gmail", "ARCHIVE", "from:jo");
    expect(q).toBe("(from:jo) -in:inbox -in:sent -in:draft -in:trash -in:spam -in:chats");
  });

  it("treats Archive as an ordinary folder on Outlook, where it is a real one", () => {
    expect(resolveListScope("outlook", "ARCHIVE", "")).toEqual({ labelId: "ARCHIVE", q: undefined });
  });

  it("drops the filter entirely for All mail", () => {
    expect(resolveListScope("gmail", "ALL", "")).toEqual({ labelId: undefined, q: undefined });
    expect(resolveListScope("outlook", "ALL", "hi")).toEqual({ labelId: undefined, q: "hi" });
  });

  it("passes every other folder straight through", () => {
    expect(resolveListScope("gmail", "TRASH", "")).toEqual({ labelId: "TRASH", q: undefined });
    expect(resolveListScope("gmail", "Label_9", "x")).toEqual({ labelId: "Label_9", q: "x" });
  });

  it("ignores a blank search rather than sending an empty query", () => {
    expect(resolveListScope("gmail", "INBOX", "   ").q).toBeUndefined();
  });
});
