import { describe, it, expect } from "vitest";
import { deriveDirectoryScope } from "../communication/directoryScope";

describe("deriveDirectoryScope", () => {
  it("returns all for communication.directory:all", () => {
    expect(deriveDirectoryScope(["communication.directory:all"], true)).toBe("all");
  });

  it("returns referred for communication.directory:referred", () => {
    expect(deriveDirectoryScope(["communication.directory:referred"], true)).toBe("referred");
  });

  it("returns none when neither permission is present", () => {
    expect(deriveDirectoryScope(["chats.read", "calls.view"], true)).toBe("none");
  });

  it("returns none for an empty permission list", () => {
    expect(deriveDirectoryScope([], true)).toBe("none");
  });

  // Must match the backend precedence in directoryScope() exactly, or web and API disagree.
  it("prefers all when both permissions are held", () => {
    expect(
      deriveDirectoryScope(
        ["communication.directory:referred", "communication.directory:all"],
        true
      )
    ).toBe("all");
  });

  it("does not infer scope from chats.manage or other admin-ish permissions", () => {
    expect(deriveDirectoryScope(["chats.manage", "users.manage"], true)).toBe("none");
  });

  it("returns all when the flag is off and permissions are empty (legacy rollback / unloaded)", () => {
    expect(deriveDirectoryScope([], false)).toBe("all");
  });

  it("returns none for restricted permissions when the flag is off (stale frontend flag)", () => {
    expect(deriveDirectoryScope(["chats.read"], false)).toBe("none");
    expect(deriveDirectoryScope(["chats.manage", "users.manage"], false)).toBe("none");
  });

  it("still honors explicit directory permissions when the flag is off", () => {
    expect(deriveDirectoryScope(["communication.directory:referred"], false)).toBe("referred");
    expect(deriveDirectoryScope(["communication.directory:all"], false)).toBe("all");
  });
});
