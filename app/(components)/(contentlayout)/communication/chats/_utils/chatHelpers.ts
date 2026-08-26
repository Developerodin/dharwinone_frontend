import type { ChatCall, Conversation, Message } from "@/shared/lib/api/chat";

/** Resolve Mongo/API id from either shape. */
export function getId(x: { id?: string; _id?: string } | null | undefined): string | null {
  if (!x) return null;
  return x.id || (x as { _id?: { toString?: () => string } })._id?.toString?.() || null;
}

/** Sidebar / list preview line for a conversation's last message. */
export function conversationPreviewText(lastMessage?: Conversation["lastMessage"] | null): string {
  const content = lastMessage?.content?.trim();
  return content || "No messages yet";
}

/** Case-insensitive query matcher used by chat sidebar filters. */
export function matchesSearchQuery(
  query: string | null | undefined,
  fields: Array<string | null | undefined>
): boolean {
  const normalizedQuery = (query || "").trim().toLowerCase();
  if (!normalizedQuery) return true;
  return fields.some((field) => (field || "").toLowerCase().includes(normalizedQuery));
}

/** Sidebar preview after a delete-for-everyone: placeholder or previous visible message. */
export function conversationPreviewAfterDelete(
  messages: Message[],
  deletedMessageId: string,
  deletedMsg: Message
): NonNullable<Conversation["lastMessage"]> {
  const byDate = [...messages].sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
  const latestId = String((byDate[0] as { id?: string; _id?: string })?.id || (byDate[0] as { _id?: string })?._id || "");
  const deletedCopy = {
    ...deletedMsg,
    deletedAt: new Date().toISOString(),
    deletedFor: "everyone" as const,
  };

  if (latestId !== deletedMessageId) {
    const visible = byDate.find((m) => {
      const id = String((m as { id?: string; _id?: string }).id || (m as { _id?: string })._id || "");
      if (id === deletedMessageId) return false;
      return !((m as { deletedAt?: string | null }).deletedAt && (m as { deletedFor?: string }).deletedFor === "everyone");
    });
    return visible ? lastMessageFromMsg(visible) : lastMessageFromMsg(deletedCopy);
  }

  const nextVisible = byDate.find((m) => {
    const id = String((m as { id?: string; _id?: string }).id || (m as { _id?: string })._id || "");
    return id !== deletedMessageId && !((m as { deletedAt?: string | null }).deletedAt && (m as { deletedFor?: string }).deletedFor === "everyone");
  });
  return nextVisible ? lastMessageFromMsg(nextVisible) : lastMessageFromMsg(deletedCopy);
}

/** Build sidebar preview from a message after send/upload. */
export function lastMessageFromMsg(msg: Message): NonNullable<Conversation["lastMessage"]> {
  const isDeleted = !!(msg as { deletedAt?: string | null }).deletedAt;
  const deletedFor = (msg as { deletedFor?: "me" | "everyone" }).deletedFor;
  if (isDeleted && deletedFor === "everyone") {
    return {
      content: "This message was deleted",
      sender: msg.sender?.name,
      createdAt: msg.createdAt,
    };
  }
  let content = msg.content || "";
  if (msg.type === "image") content = "📷 Image";
  else if (msg.type === "video") content = "🎬 Video";
  else if (msg.type === "audio") content = "🎤 Voice note";
  else if (msg.type === "file") content = "📎 File";
  return {
    content,
    sender: msg.sender?.name,
    createdAt: msg.createdAt,
  };
}

export function callLogStatusLabel(status: string | undefined): string {
  if (!status || status === "ongoing") return "";
  if (status === "completed" || status === "ended") return "Ended";
  if (status === "missed") return "Missed";
  if (status === "declined") return "Declined";
  if (status === "initiated") return "Started";
  return status;
}

/** Short line for merged thread timeline (enriched calls from getCallsForConversation). */
export function timelineCallPillText(call: {
  direction?: "incoming" | "outgoing";
  peer?: { name?: string; isGroup?: boolean };
  callType?: string;
  status?: string;
}): string {
  const kind = call.callType === "video" ? "Video" : "Voice";
  const dir = call.direction === "outgoing" ? "Outgoing" : "Incoming";
  const status = callLogStatusLabel(call.status);
  const peerName = (call.peer?.name || "Unknown").trim() || "Unknown";
  const chunks: string[] = [];
  if (call.peer?.isGroup) {
    chunks.push(`${peerName} · ${kind} · ${dir}`);
  } else if (call.direction === "outgoing") {
    chunks.push(`You called ${peerName} · ${kind}`);
  } else if (call.direction === "incoming") {
    chunks.push(`${peerName} called · ${kind}`);
  } else {
    chunks.push(`${kind} call`);
  }
  if (status) chunks.push(status);
  return chunks.join(" · ");
}

export type MentionToken = { start: number; end: number; query: string };

/** Finds an active @mention token around the current caret position. */
export function findMentionToken(text: string, caret: number): MentionToken | null {
  const safeCaret = Math.max(0, Math.min(caret, text.length));
  const beforeCaret = text.slice(0, safeCaret);
  const match = /(?:^|\s)@([^\s@]{0,32})$/.exec(beforeCaret);
  if (!match) return null;
  const query = match[1] || "";
  const end = safeCaret;
  const start = end - query.length - 1;
  if (start < 0 || text[start] !== "@") return null;
  return { start, end, query };
}

/** Replaces the mention token range with a selected mention label. */
export function insertMentionText(
  text: string,
  range: { start: number; end: number },
  mentionLabel: string
): { value: string; caret: number } {
  const safeStart = Math.max(0, Math.min(range.start, text.length));
  const safeEnd = Math.max(safeStart, Math.min(range.end, text.length));
  const cleanLabel = mentionLabel.trim();
  if (!cleanLabel) return { value: text, caret: safeEnd };

  const before = text.slice(0, safeStart);
  const after = text.slice(safeEnd);
  const spacerBefore = before && !/\s$/.test(before) ? " " : "";
  const spacerAfter = after && !/^\s/.test(after) ? " " : "";
  const mention = `@${cleanLabel}`;
  const value = `${before}${spacerBefore}${mention}${spacerAfter}${after}`;
  const caret = (before + spacerBefore + mention + spacerAfter).length;
  return { value, caret };
}

export type TextSegment = { text: string; href?: string };

// ponytail: http(s)/www only — no scheme-agnostic match, so javascript:/data: can never become an href.
const URL_RE = /(?:https?:\/\/|www\.)[^\s<>"']+/gi;

/** Split message text into plain + link segments so bubbles can render real anchors. */
export function splitTextLinks(text: string | null | undefined): TextSegment[] {
  if (!text) return [];
  const out: TextSegment[] = [];
  let last = 0;
  URL_RE.lastIndex = 0;
  for (let m = URL_RE.exec(text); m; m = URL_RE.exec(text)) {
    let url = m[0];
    // Trailing chars that are almost always sentence punctuation, not part of the URL.
    // A ")" only counts as trailing when the URL has more ")" than "(".
    for (;;) {
      const tail = url[url.length - 1];
      if (!tail) break;
      if (".,!?;:".includes(tail)) url = url.slice(0, -1);
      else if (tail === ")" && (url.match(/\(/g)?.length ?? 0) < (url.match(/\)/g)?.length ?? 0))
        url = url.slice(0, -1);
      else break;
    }
    if (m.index > last) out.push({ text: text.slice(last, m.index) });
    out.push({ text: url, href: url.startsWith("www.") ? `https://${url}` : url });
    last = m.index + url.length;
    URL_RE.lastIndex = last;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

/** The current user's applied reaction emoji on a message, or undefined. */
export function myReactionEmoji(
  reactions: Array<{ user?: { id?: string; _id?: string } | string; emoji?: string }> | undefined,
  myId: string | undefined
): string | undefined {
  if (!reactions?.length || !myId) return undefined;
  const mine = reactions.find((r) => {
    const u = r.user as { id?: string; _id?: string } | string | undefined;
    const uid = typeof u === "string" ? u : u?.id || u?._id;
    return uid && String(uid) === String(myId);
  });
  return mine?.emoji;
}

/** Emoji to send when a user clicks `clicked` on the reaction bar:
 *  empty string removes an existing identical reaction (toggle-off),
 *  otherwise the clicked emoji is applied/replaces. */
export function reactionToggleEmoji(current: string | undefined, clicked: string): string {
  return current === clicked ? "" : clicked;
}

export function participantIdFromCallUser(p: { id?: string; _id?: string } | null | undefined): string {
  if (!p) return "";
  return String((p as { id?: string }).id ?? (p as { _id?: string })._id ?? "").trim();
}

/** Calls list row title: explicit callee (outgoing) or caller (incoming); group name for group calls. */
export function callsTabHeadline(call: ChatCall): string {
  const peer = call.peer;
  const name = (peer?.name || (call.caller as { name?: string } | undefined)?.name || "Unknown").trim() || "Unknown";
  if (peer?.isGroup) {
    if (call.direction === "outgoing") return `You called ${name}`;
    return name;
  }
  if (call.direction === "outgoing") return `You called ${name}`;
  if (call.direction === "incoming") return `${name} called you`;
  return name;
}

/** Names of users who actually joined the LiveKit room (You for viewer); omit if no join data. */
export function callJoinedParticipantsLine(
  call: { roomJoinedUserIds?: Array<{ id?: string; _id?: string; name?: string }> },
  myId: string | undefined
): string | null {
  const list = call.roomJoinedUserIds?.length ? call.roomJoinedUserIds : [];
  if (list.length === 0) return null;
  const labels: string[] = [];
  const seen = new Set<string>();
  for (const p of list) {
    const pid = participantIdFromCallUser(p);
    const label =
      myId && pid && pid === String(myId) ? "You" : (p.name || "Unknown").trim() || "Unknown";
    const dedupe = label.toLowerCase();
    if (seen.has(dedupe)) continue;
    seen.add(dedupe);
    labels.push(label);
  }
  if (labels.length === 0) return null;
  return labels.join(", ");
}
