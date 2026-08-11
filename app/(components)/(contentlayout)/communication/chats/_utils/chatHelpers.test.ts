import { describe, it, expect } from "vitest";
import {
  myReactionEmoji,
  reactionToggleEmoji,
  splitTextLinks,
  conversationPreviewText,
  lastMessageFromMsg,
} from "./chatHelpers";

describe("myReactionEmoji", () => {
  it("returns the current user's emoji (populated user object)", () => {
    const reactions = [
      { user: { id: "u1" }, emoji: "👍" },
      { user: { id: "u2" }, emoji: "❤️" },
    ];
    expect(myReactionEmoji(reactions, "u1")).toBe("👍");
  });
  it("matches when user is a raw id string", () => {
    expect(myReactionEmoji([{ user: "u1", emoji: "😂" }], "u1")).toBe("😂");
  });
  it("matches when user is populated with _id", () => {
    expect(myReactionEmoji([{ user: { _id: "u1" }, emoji: "🙏" }], "u1")).toBe("🙏");
  });
  it("returns undefined when the user has no reaction", () => {
    expect(myReactionEmoji([{ user: { id: "u2" }, emoji: "❤️" }], "u1")).toBeUndefined();
  });
  it("returns undefined for empty/missing inputs", () => {
    expect(myReactionEmoji([], "u1")).toBeUndefined();
    expect(myReactionEmoji(undefined, "u1")).toBeUndefined();
    expect(myReactionEmoji([{ user: { id: "u1" }, emoji: "👍" }], undefined)).toBeUndefined();
  });
});

describe("reactionToggleEmoji", () => {
  it("returns empty string to remove when clicking the same emoji", () => {
    expect(reactionToggleEmoji("👍", "👍")).toBe("");
  });
  it("returns the clicked emoji when different", () => {
    expect(reactionToggleEmoji("👍", "❤️")).toBe("❤️");
  });
  it("returns the clicked emoji when none applied", () => {
    expect(reactionToggleEmoji(undefined, "👍")).toBe("👍");
  });
});

describe("splitTextLinks", () => {
  it("returns one plain segment when there is no URL", () => {
    expect(splitTextLinks("hello there")).toEqual([{ text: "hello there" }]);
  });
  it("linkifies a bare https URL", () => {
    const url = "https://dharwinfrontend.vercel.app/join/room?room=meeting_6c2e4416d4281e2b";
    expect(splitTextLinks(url)).toEqual([{ text: url, href: url }]);
  });
  it("keeps surrounding text as plain segments", () => {
    expect(splitTextLinks("join https://a.com now")).toEqual([
      { text: "join " },
      { text: "https://a.com", href: "https://a.com" },
      { text: " now" },
    ]);
  });
  it("prefixes https:// on www links", () => {
    expect(splitTextLinks("www.flipkart.com")).toEqual([
      { text: "www.flipkart.com", href: "https://www.flipkart.com" },
    ]);
  });
  it("drops trailing sentence punctuation from the link", () => {
    expect(splitTextLinks("see https://a.com.")).toEqual([
      { text: "see " },
      { text: "https://a.com", href: "https://a.com" },
      { text: "." },
    ]);
  });
  it("keeps a balanced trailing paren inside the link", () => {
    expect(splitTextLinks("https://en.wikipedia.org/wiki/X_(y)")).toEqual([
      { text: "https://en.wikipedia.org/wiki/X_(y)", href: "https://en.wikipedia.org/wiki/X_(y)" },
    ]);
  });
  it("handles multiple links", () => {
    expect(splitTextLinks("https://a.com and https://b.com")).toEqual([
      { text: "https://a.com", href: "https://a.com" },
      { text: " and " },
      { text: "https://b.com", href: "https://b.com" },
    ]);
  });
  it("ignores javascript: and other non-http schemes", () => {
    expect(splitTextLinks("javascript:alert(1)")).toEqual([{ text: "javascript:alert(1)" }]);
  });
  it("returns empty array for empty input", () => {
    expect(splitTextLinks("")).toEqual([]);
  });
});

describe("conversationPreviewText", () => {
  it("shows deleted placeholder from lastMessage content", () => {
    expect(conversationPreviewText({ content: "This message was deleted", createdAt: "2026-01-01" })).toBe(
      "This message was deleted"
    );
  });
  it("falls back when preview is missing", () => {
    expect(conversationPreviewText(null)).toBe("No messages yet");
    expect(conversationPreviewText(undefined)).toBe("No messages yet");
  });
});

describe("lastMessageFromMsg", () => {
  it("maps deleted-for-everyone to sidebar placeholder", () => {
    expect(
      lastMessageFromMsg({
        content: "HI",
        createdAt: "2026-01-01",
        deletedAt: "2026-01-02",
        deletedFor: "everyone",
      } as any)
    ).toEqual({
      content: "This message was deleted",
      sender: undefined,
      createdAt: "2026-01-01",
    });
  });
});
