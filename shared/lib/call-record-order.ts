import type { CallRecord } from "@/shared/lib/api/bolna";
import type { ChatCall } from "@/shared/lib/api/chat";

export type CallSource = "telephony" | "in_app";

/**
 * One comparable timestamp for both call shapes, resolved before the two lists are
 * merged so the sort order and the rendered Date column can never disagree.
 *
 * Telephony rows carry the real call time in `createdAt` — the Twilio backfill writes
 * Twilio's `startTime` there rather than the import time — with `completedAt` as the
 * fallback for rows written before that. In-app chat calls only have `createdAt`.
 * Unparseable/missing -> 0, which sorts last in a descending list.
 */
export function normalizeCallTs(source: CallSource, data: CallRecord | ChatCall): number {
  const raw =
    source === "telephony"
      ? (data as CallRecord).createdAt || (data as CallRecord).completedAt || undefined
      : (data as ChatCall).createdAt;
  const t = raw ? new Date(raw).getTime() : NaN;
  return Number.isNaN(t) ? 0 : t;
}
