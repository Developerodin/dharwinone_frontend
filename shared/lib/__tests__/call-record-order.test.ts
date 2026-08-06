import { describe, expect, it } from "vitest";
import type { CallRecord } from "@/shared/lib/api/bolna";
import type { ChatCall } from "@/shared/lib/api/chat";
import { normalizeCallTs, type CallSource } from "@/shared/lib/call-record-order";

type Row = { source: CallSource; data: CallRecord | ChatCall };

const merge = (rows: Row[]) =>
  rows
    .map((r) => ({ ...r, ts: normalizeCallTs(r.source, r.data) }))
    .sort((a, b) => b.ts - a.ts);

describe("normalizeCallTs", () => {
  it("orders telephony and in-app rows newest first off a single timestamp", () => {
    const order = merge([
      { source: "telephony", data: { id: "old-dialer", createdAt: "2026-07-30T10:53:10.000Z" } },
      { source: "in_app", data: { id: "new-chat", createdAt: "2026-08-05T11:54:08.000Z" } as ChatCall },
      { source: "telephony", data: { id: "mid-dialer", createdAt: "2026-07-31T18:50:10.000Z" } },
    ]).map((r) => r.data.id);

    expect(order).toEqual(["new-chat", "mid-dialer", "old-dialer"]);
  });

  it("falls back to completedAt for telephony rows with no createdAt", () => {
    expect(normalizeCallTs("telephony", { completedAt: "2026-07-29T09:00:00.000Z" })).toBe(
      Date.parse("2026-07-29T09:00:00.000Z")
    );
  });

  it("sorts rows with a missing or unparseable timestamp last", () => {
    expect(normalizeCallTs("telephony", {})).toBe(0);
    expect(normalizeCallTs("in_app", { createdAt: "not-a-date" } as ChatCall)).toBe(0);
  });
});
