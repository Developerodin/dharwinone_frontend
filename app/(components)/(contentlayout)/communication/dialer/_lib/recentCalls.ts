import type { CallRecord } from "@/shared/lib/api/bolna";

const MISSED_STATUSES = new Set(["missed", "no-answer", "no_answer", "failed"]);

/** Mirrors backend callRecord.model.js STATUS_RANK for monotonic socket merges. */
const STATUS_RANK: Record<string, number> = {
  unknown: 0,
  initiated: 1,
  ringing: 2,
  in_progress: 3,
  completed: 10,
  failed: 10,
  no_answer: 10,
  busy: 10,
  declined: 10,
  call_disconnected: 10,
  expired: 10,
  missed: 10,
  canceled: 10,
  cancelled: 10,
};

export type CallUpdatePatch = {
  id?: string | null;
  executionId?: string;
  status?: string;
  statusRank?: number;
  statusUpdatedAt?: string;
  completedAt?: string | null;
  duration?: number;
  recordingUrl?: string;
  fromPhoneNumber?: string;
  toPhoneNumber?: string;
  recipientPhoneNumber?: string;
  phone?: string;
  businessName?: string;
};

/** Normalize raw provider status strings to backend canonical keys. */
export function normalizeCallStatus(status?: string): string {
  if (!status) return "unknown";
  const s = status.toLowerCase().trim();
  const map: Record<string, string> = {
    done: "completed",
    finished: "completed",
    ended: "completed",
    success: "completed",
    error: "failed",
    errored: "failed",
    stopped: "failed",
    initiate: "initiated",
    "no-answer": "no_answer",
    "call-disconnected": "call_disconnected",
    "in-progress": "in_progress",
    "balance-low": "failed",
    queued: "initiated",
    ringing: "ringing",
    canceled: "no_answer",
    cancelled: "no_answer",
  };
  return map[s] || s.replace(/-/g, "_");
}

function rankOfStatus(status?: string): number {
  if (!status) return 0;
  const key = normalizeCallStatus(status);
  return STATUS_RANK[key] ?? 0;
}

export function callStatusLabel(status?: string): string {
  const raw = (status || "").toLowerCase().trim();
  if (raw === "canceled" || raw === "cancelled") return "Canceled";
  const key = normalizeCallStatus(status);
  const labels: Record<string, string> = {
    initiated: "Initiated",
    ringing: "Ringing",
    in_progress: "In progress",
    completed: "Completed",
    no_answer: "No answer",
    missed: "Missed",
    busy: "Busy",
    failed: "Failed",
    declined: "Canceled",
    canceled: "Canceled",
    cancelled: "Canceled",
    call_disconnected: "Failed",
    expired: "Failed",
    unknown: "Unknown",
  };
  return labels[key] || (status ? status.replace(/_/g, " ") : "");
}

export function callStatusTone(status?: string): string {
  const key = normalizeCallStatus(status);
  if (key === "completed") return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
  if (["failed", "busy", "no_answer", "missed", "declined", "call_disconnected", "expired", "canceled", "cancelled"].includes(key)) {
    return "bg-danger/10 text-danger";
  }
  if (["initiated", "ringing", "in_progress"].includes(key)) {
    return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
  }
  return "bg-black/[0.04] text-defaulttextcolor/70 dark:bg-white/10 dark:text-white/70";
}

export function callStatusIcon(status?: string): string {
  const key = normalizeCallStatus(status);
  if (key === "ringing") return "ri-notification-3-line";
  if (key === "in_progress") return "ri-phone-fill";
  if (key === "completed") return "ri-check-line";
  if (["failed", "call_disconnected", "expired"].includes(key)) return "ri-close-circle-line";
  if (["no_answer", "missed", "declined", "canceled", "cancelled"].includes(key)) return "ri-phone-missed-line";
  if (key === "busy") return "ri-forbid-line";
  if (key === "initiated") return "ri-phone-line";
  return "ri-information-line";
}

export function callId(r: CallRecord): string {
  return r._id ?? r.id ?? "";
}

export function matchesCallUpdate(r: CallRecord, evt: CallUpdatePatch): boolean {
  const id = callId(r);
  if (evt.id && id === evt.id) return true;
  if (evt.executionId && r.executionId === evt.executionId) return true;
  // Early lifecycle: socket may carry only executionId before the list row is hydrated.
  if (evt.executionId && id === evt.executionId) return true;
  if (evt.id && r.executionId === evt.id) return true;
  return false;
}

export function mergeCallUpdate(r: CallRecord, evt: CallUpdatePatch): CallRecord {
  const next: CallRecord = { ...r };
  if (evt.executionId && !next.executionId) next.executionId = evt.executionId;
  if (evt.status) {
    const incomingRank = evt.statusRank ?? rankOfStatus(evt.status);
    if (incomingRank >= rankOfStatus(r.status)) next.status = evt.status;
  }
  if (evt.duration != null) next.duration = evt.duration;
  if (evt.recordingUrl) next.recordingUrl = evt.recordingUrl;
  if (evt.completedAt !== undefined) next.completedAt = evt.completedAt ?? undefined;
  if (evt.fromPhoneNumber) next.fromPhoneNumber = evt.fromPhoneNumber;
  if (evt.toPhoneNumber) next.toPhoneNumber = evt.toPhoneNumber;
  if (evt.recipientPhoneNumber) next.recipientPhoneNumber = evt.recipientPhoneNumber;
  if (evt.phone) next.phone = evt.phone;
  if (evt.businessName) next.businessName = evt.businessName;
  return next;
}

export function callNumber(r: CallRecord): string {
  return r.toPhoneNumber ?? r.recipientPhoneNumber ?? r.phone ?? "";
}
export function callName(r: CallRecord): string {
  return r.displayName ?? r.businessName ?? callNumber(r);
}
export function callDirection(r: CallRecord): "inbound" | "outbound" | "unknown" {
  const d = r.telephonyData?.direction;
  return d === "inbound" || d === "outbound" ? d : "unknown";
}
export function isMissed(r: CallRecord): boolean {
  return callDirection(r) === "inbound" && MISSED_STATUSES.has((r.status ?? "").toLowerCase());
}
export function hasRecording(r: CallRecord): boolean {
  return Boolean(r.recordingUrl);
}
export function fmtDuration(sec?: number): string {
  if (!sec || sec < 1) return "";
  const m = Math.floor(sec / 60), s = sec % 60;
  return m ? `${m}m ${s}s` : `${s}s`;
}

export type RecentFilter = "all" | "inbound" | "outbound" | "recorded";
export function filterRecents(records: CallRecord[], filter: RecentFilter): CallRecord[] {
  switch (filter) {
    case "inbound": return records.filter((r) => callDirection(r) === "inbound");
    case "outbound": return records.filter((r) => callDirection(r) === "outbound");
    case "recorded": return records.filter(hasRecording);
    default: return records;
  }
}
export function missedCount(records: CallRecord[]): number {
  return records.reduce((n, r) => (isMissed(r) ? n + 1 : n), 0);
}
export function matchesSearch(r: CallRecord, q: string): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return `${callName(r)} ${callNumber(r)}`.toLowerCase().includes(s);
}
export function sortWithPins(
  records: CallRecord[],
  pinnedIds: string[]
): { pinned: CallRecord[]; rest: CallRecord[] } {
  const pinnedSet = new Set(pinnedIds);
  const byId = new Map(records.map((r) => [callId(r), r]));
  const pinned = pinnedIds.map((id) => byId.get(id)).filter((r): r is CallRecord => Boolean(r));
  const rest = records.filter((r) => !pinnedSet.has(callId(r)));
  return { pinned, rest };
}

export type DateGroup = "Today" | "Yesterday" | "This week" | "Older";
const ORDER: DateGroup[] = ["Today", "Yesterday", "This week", "Older"];

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function dateGroup(createdAt: string | undefined, now: Date): DateGroup {
  if (!createdAt) return "Older";
  const t = new Date(createdAt);
  if (Number.isNaN(t.getTime())) return "Older";
  const today = startOfDay(now);
  const day = startOfDay(t);
  const diffDays = Math.round((today.getTime() - day.getTime()) / 86_400_000);
  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return "This week";
  return "Older";
}

export function groupByDate(
  records: CallRecord[],
  now: Date
): { group: DateGroup; records: CallRecord[] }[] {
  const buckets = new Map<DateGroup, CallRecord[]>();
  for (const r of records) {
    const g = dateGroup(r.createdAt, now);
    const arr = buckets.get(g) ?? [];
    arr.push(r);
    buckets.set(g, arr);
  }
  return ORDER.filter((g) => buckets.has(g)).map((g) => ({ group: g, records: buckets.get(g)! }));
}
