import type { Task, TaskStatus } from "@/shared/lib/api/tasks";
import type { LeaveRequest } from "@/shared/lib/api/leave-requests";
import type { AttendanceRecord } from "@/shared/lib/api/attendance";
import type { InternalMeeting } from "@/shared/lib/api/internal-meetings";

/** Task board statuses. Colours mirror TASK_STATUS_COLORS in dashboard/page.tsx —
 *  the board and this dashboard must agree, so never restyle these. */
export const TASK_STATUS_META: ReadonlyArray<{ key: TaskStatus; label: string; color: string }> = [
  { key: "new", label: "New", color: "#f5b849" },
  { key: "todo", label: "To Do", color: "#f97316" },
  { key: "on_going", label: "On Going", color: "#845ADF" },
  { key: "in_review", label: "In Review", color: "#49B6F5" },
  { key: "completed", label: "Completed", color: "#26BF94" },
];

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export function isDueToday(dueDate: string | undefined, now: Date = new Date()): boolean {
  if (!dueDate) return false;
  const d = new Date(dueDate);
  if (Number.isNaN(d.getTime())) return false;
  return startOfDay(d) === startOfDay(now);
}

/** Due today or already overdue, excluding completed. Overdue sorts first. */
export function filterDueToday(tasks: Task[], now: Date = new Date()): Task[] {
  const today = startOfDay(now);
  return tasks
    .filter((t) => {
      if (t.status === "completed") return false;
      if (!t.dueDate) return false;
      const d = new Date(t.dueDate);
      if (Number.isNaN(d.getTime())) return false;
      return startOfDay(d) <= today;
    })
    .sort((a, b) => new Date(a.dueDate as string).getTime() - new Date(b.dueDate as string).getTime());
}

export function countByStatus(tasks: Task[]): Record<TaskStatus, number> {
  const out: Record<TaskStatus, number> = { new: 0, todo: 0, on_going: 0, in_review: 0, completed: 0 };
  for (const t of tasks) if (t.status in out) out[t.status] += 1;
  return out;
}

export function formatHoursMinutes(totalMinutes: number): string {
  const m = Math.max(0, Math.round(totalMinutes));
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return h > 0 ? `${h}h ${String(rem).padStart(2, "0")}m` : `${rem}m`;
}

/** "HH:MM" resolved onto the same UTC calendar day as `ref`. */
function timeOnDay(hhmm: string, ref: Date): number {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(ref);
  d.setUTCHours(h ?? 0, m ?? 0, 0, 0);
  return d.getTime();
}

export function shiftProgressPercent(
  punchInIso: string,
  shiftStart: string,
  shiftEnd: string,
  now: Date = new Date()
): number {
  const ref = new Date(punchInIso);
  if (Number.isNaN(ref.getTime())) return 0;
  const start = timeOnDay(shiftStart, ref);
  const end = timeOnDay(shiftEnd, ref);
  if (end <= start) return 0;
  const pct = ((now.getTime() - start) / (end - start)) * 100;
  return Math.min(100, Math.max(0, pct));
}

export function tallyLeaveDays(requests: LeaveRequest[]): {
  casual: number; sick: number; unpaid: number; pending: number; nextApproved: string | null;
} {
  const out = { casual: 0, sick: 0, unpaid: 0, pending: 0, nextApproved: null as string | null };
  const todayIso = new Date().toISOString().slice(0, 10);
  const future: string[] = [];
  for (const r of requests) {
    if (r.status === "pending") out.pending += 1;
    if (r.status !== "approved") continue;
    const dates = Array.isArray(r.dates) ? r.dates : [];
    if (r.leaveType === "casual" || r.leaveType === "sick" || r.leaveType === "unpaid") {
      out[r.leaveType] += dates.length;
    }
    for (const d of dates) {
      const day = String(d).slice(0, 10);
      if (day >= todayIso) future.push(day);
    }
  }
  future.sort();
  out.nextApproved = future[0] ?? null;
  return out;
}

export function monthStripDays(
  records: AttendanceRecord[],
  now: Date = new Date()
): Array<{ date: string; hours: number; heightPct: number; kind: "present" | "late" | "leave" | "today" }> {
  const todayIso =
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const rows = records
    .map((r) => ({ r, day: String(r.date).slice(0, 10), mins: r.duration ?? 0 }))
    .sort((a, b) => a.day.localeCompare(b.day));
  if (rows.length === 0) return [];
  const max = Math.max(1, ...rows.map((x) => x.mins));
  return rows.map(({ r, day, mins }) => {
    const status = String(r.status ?? "").toLowerCase();
    let kind: "present" | "late" | "leave" | "today" = "present";
    if (status === "leave") kind = "leave";
    else if (status === "late") kind = "late";
    if (day === todayIso) kind = "today";
    return {
      date: day,
      hours: mins / 60,
      heightPct: kind === "leave" ? 100 : Math.round((mins / max) * 100),
      kind,
    };
  });
}

export function nextMeeting(meetings: InternalMeeting[], now: Date = new Date()): InternalMeeting | null {
  const future = meetings
    .filter((m) => new Date(m.scheduledAt).getTime() >= now.getTime())
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  return future[0] ?? null;
}

export function minutesUntil(iso: string, now: Date = new Date()): number {
  return Math.round((new Date(iso).getTime() - now.getTime()) / 60000);
}

/** Join opens 10 minutes before start and closes when the meeting ends. */
export function canJoinMeeting(scheduledAt: string, durationMinutes: number, now: Date = new Date()): boolean {
  const start = new Date(scheduledAt).getTime();
  if (Number.isNaN(start)) return false;
  const t = now.getTime();
  return t >= start - 10 * 60000 && t <= start + durationMinutes * 60000;
}
