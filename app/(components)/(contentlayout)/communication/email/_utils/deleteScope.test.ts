import { describe, it, expect } from "vitest";
import { isPermanentDeleteFolderId } from "./deleteScope";

describe("isPermanentDeleteFolderId", () => {
  it("deletes for good in the bin, for both providers", () => {
    // Gmail's system label, and what Outlook's deleteditems is mapped to.
    expect(isPermanentDeleteFolderId("TRASH")).toBe(true);
  });

  it("deletes for good in junk, for both providers", () => {
    expect(isPermanentDeleteFolderId("SPAM")).toBe(true); // Gmail
    expect(isPermanentDeleteFolderId("JUNK")).toBe(true); // Outlook
  });

  it("moves to trash everywhere else", () => {
    for (const id of ["INBOX", "ALL", "SENT", "DRAFT", "ARCHIVE", "STARRED", "Label_42", "conversationhistory"]) {
      expect(isPermanentDeleteFolderId(id)).toBe(false);
    }
  });

  it("is exact, so a user label merely named like the bin is not destructive", () => {
    expect(isPermanentDeleteFolderId("Trash")).toBe(false);
    expect(isPermanentDeleteFolderId("TRASH-2024")).toBe(false);
    expect(isPermanentDeleteFolderId("")).toBe(false);
  });
});
