import { describe, it, expect } from "vitest";
import {
  isDueToday,
  filterDueToday,
  countByStatus,
  formatHoursMinutes,
  shiftProgressPercent,
  tallyLeaveDays,
  monthStripDays,
  nextMeeting,
  minutesUntil,
  canJoinMeeting,
  formatTeamPulseTitle,
  TASK_STATUS_META,
} from "@/shared/lib/dashboard/employeeDashboard";
import type { Task, TaskStatus } from "@/shared/lib/api/tasks";
import type { LeaveRequest } from "@/shared/lib/api/leave-requests";
import type { AttendanceRecord } from "@/shared/lib/api/attendance";
import type { InternalMeeting } from "@/shared/lib/api/internal-meetings";

const NOW = new Date("2026-08-18T10:30:00.000Z");

function task(over: Partial<Task> & { status: TaskStatus }): Task {
  return { _id: "t1", title: "x", ...over } as Task;
}

/** Due dates are compared on the *local* calendar day, so fixtures are built from
 *  local components — a fixed UTC instant would land on a different day per timezone. */
function localIso(dayOffset: number, hours: number): string {
  return new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() + dayOffset, hours).toISOString();
}

describe("isDueToday", () => {
  it("is true for the same calendar day", () => {
    expect(isDueToday(localIso(0, 23), NOW)).toBe(true);
  });
  it("is false for tomorrow", () => {
    expect(isDueToday(localIso(1, 23), NOW)).toBe(false);
  });
  it("is false for undefined", () => {
    expect(isDueToday(undefined, NOW)).toBe(false);
  });
  it("is false for an unparseable string", () => {
    expect(isDueToday("not-a-date", NOW)).toBe(false);
  });
});

describe("filterDueToday", () => {
  it("keeps overdue and today, drops later and completed", () => {
    const tasks = [
      task({ _id: "late", status: "todo", dueDate: "2026-08-16T00:00:00.000Z" }),
      task({ _id: "today", status: "todo", dueDate: "2026-08-18T15:00:00.000Z" }),
      task({ _id: "later", status: "todo", dueDate: "2026-08-25T00:00:00.000Z" }),
      task({ _id: "done", status: "completed", dueDate: "2026-08-18T15:00:00.000Z" }),
    ];
    const ids = filterDueToday(tasks, NOW).map((t) => t._id);
    expect(ids).toEqual(["late", "today"]);
  });
  it("puts overdue first", () => {
    const tasks = [
      task({ _id: "today", status: "todo", dueDate: "2026-08-18T15:00:00.000Z" }),
      task({ _id: "late", status: "todo", dueDate: "2026-08-16T00:00:00.000Z" }),
    ];
    expect(filterDueToday(tasks, NOW)[0]._id).toBe("late");
  });
  it("ignores tasks with no due date", () => {
    expect(filterDueToday([task({ status: "todo" })], NOW)).toHaveLength(0);
  });
});

describe("countByStatus", () => {
  it("counts every status key, zero-filled", () => {
    const out = countByStatus([
      task({ status: "todo" }),
      task({ status: "todo" }),
      task({ status: "on_going" }),
    ]);
    expect(out.todo).toBe(2);
    expect(out.on_going).toBe(1);
    expect(out.new).toBe(0);
    expect(out.in_review).toBe(0);
    expect(out.completed).toBe(0);
  });
});

describe("TASK_STATUS_META", () => {
  it("matches the task board's five statuses and colours", () => {
    expect(TASK_STATUS_META.map((s) => s.key)).toEqual([
      "new", "todo", "on_going", "in_review", "completed",
    ]);
    // Task board palette. Mirrored by TASK_STATUS_COLORS in dashboard/page.tsx until
    // that status chart was dropped; TASK_STATUS_META is now the only copy.
    expect(TASK_STATUS_META.map((s) => s.color)).toEqual([
      "#f5b849", "#f97316", "#845ADF", "#49B6F5", "#26BF94",
    ]);
  });
});

describe("formatHoursMinutes", () => {
  it("formats hours and minutes", () => {
    expect(formatHoursMinutes(372)).toBe("6h 12m");
  });
  it("drops the hour segment under an hour", () => {
    expect(formatHoursMinutes(45)).toBe("45m");
  });
  it("handles zero", () => {
    expect(formatHoursMinutes(0)).toBe("0m");
  });
  it("clamps negatives to zero", () => {
    expect(formatHoursMinutes(-10)).toBe("0m");
  });
});

describe("shiftProgressPercent", () => {
  it("is the elapsed fraction of the shift", () => {
    const now = new Date("2026-08-18T09:00:00.000Z");
    expect(shiftProgressPercent("2026-08-18T04:30:00.000Z", "04:30", "13:30", now)).toBe(50);
  });
  it("clamps to 100 after the shift ends", () => {
    const now = new Date("2026-08-18T20:00:00.000Z");
    expect(shiftProgressPercent("2026-08-18T04:30:00.000Z", "04:30", "13:30", now)).toBe(100);
  });
  it("clamps to 0 before it starts", () => {
    const now = new Date("2026-08-18T02:00:00.000Z");
    expect(shiftProgressPercent("2026-08-18T04:30:00.000Z", "04:30", "13:30", now)).toBe(0);
  });
  it("returns 0 for an unparseable punch-in", () => {
    expect(shiftProgressPercent("nope", "04:30", "13:30", NOW)).toBe(0);
  });
});

describe("tallyLeaveDays", () => {
  const reqs = [
    { leaveType: "casual", status: "approved", dates: ["2026-03-02", "2026-03-03"] },
    { leaveType: "casual", status: "approved", dates: ["2026-05-10"] },
    { leaveType: "sick", status: "approved", dates: ["2026-06-01"] },
    { leaveType: "sick", status: "pending", dates: ["2026-09-20"] },
    { leaveType: "casual", status: "rejected", dates: ["2026-04-01"] },
    { leaveType: "casual", status: "approved", dates: ["2099-09-12"] },
  ] as unknown as LeaveRequest[];

  it("counts approved days per type and ignores rejected", () => {
    const t = tallyLeaveDays(reqs);
    expect(t.casual).toBe(4);
    expect(t.sick).toBe(1);
    expect(t.unpaid).toBe(0);
  });
  it("counts pending requests, not pending days", () => {
    expect(tallyLeaveDays(reqs).pending).toBe(1);
  });
  it("returns the earliest future approved date", () => {
    expect(tallyLeaveDays(reqs).nextApproved).toBe("2099-09-12");
  });
  it("returns null when nothing is approved in future", () => {
    expect(tallyLeaveDays([]).nextApproved).toBeNull();
  });
});

describe("monthStripDays", () => {
  it("scales bar heights against the tallest day", () => {
    const recs = [
      { date: "2026-08-03", duration: 480, status: "Present" },
      { date: "2026-08-04", duration: 240, status: "Present" },
    ] as unknown as AttendanceRecord[];
    const out = monthStripDays(recs, NOW);
    expect(out[0].heightPct).toBe(100);
    expect(out[1].heightPct).toBe(50);
  });
  it("marks leave days", () => {
    const recs = [{ date: "2026-08-03", duration: null, status: "Leave" }] as unknown as AttendanceRecord[];
    expect(monthStripDays(recs, NOW)[0].kind).toBe("leave");
  });
  it("marks today", () => {
    const recs = [{ date: "2026-08-18", duration: 120, status: "Present" }] as unknown as AttendanceRecord[];
    expect(monthStripDays(recs, NOW)[0].kind).toBe("today");
  });
  it("returns an empty array for no records", () => {
    expect(monthStripDays([], NOW)).toEqual([]);
  });
});

describe("meetings", () => {
  const meetings = [
    { meetingId: "b", scheduledAt: "2026-08-18T12:00:00.000Z", durationMinutes: 30 },
    { meetingId: "a", scheduledAt: "2026-08-18T11:00:00.000Z", durationMinutes: 30 },
    { meetingId: "past", scheduledAt: "2026-08-18T08:00:00.000Z", durationMinutes: 30 },
  ] as unknown as InternalMeeting[];

  it("returns the soonest future meeting", () => {
    expect(nextMeeting(meetings, NOW)?.meetingId).toBe("a");
  });
  it("returns null when all are past", () => {
    expect(nextMeeting([meetings[2]], NOW)).toBeNull();
  });
  it("still returns an in-progress meeting after start", () => {
    const now = new Date("2026-08-18T11:10:00.000Z");
    expect(nextMeeting(meetings, now)?.meetingId).toBe("a");
  });
  it("drops a meeting once its duration window ends", () => {
    const now = new Date("2026-08-18T11:35:00.000Z");
    expect(nextMeeting([{ ...meetings[1] }], now)).toBeNull();
  });
  it("counts minutes until start", () => {
    expect(minutesUntil("2026-08-18T11:00:00.000Z", NOW)).toBe(30);
  });
  it("allows joining inside the 10-minute pre-window", () => {
    const now = new Date("2026-08-18T10:55:00.000Z");
    expect(canJoinMeeting("2026-08-18T11:00:00.000Z", 30, now)).toBe(true);
  });
  it("blocks joining well before the window", () => {
    expect(canJoinMeeting("2026-08-18T11:00:00.000Z", 30, NOW)).toBe(false);
  });
  it("allows joining while it is running", () => {
    const now = new Date("2026-08-18T11:20:00.000Z");
    expect(canJoinMeeting("2026-08-18T11:00:00.000Z", 30, now)).toBe(true);
  });
  it("blocks joining after it ends", () => {
    const now = new Date("2026-08-18T11:45:00.000Z");
    expect(canJoinMeeting("2026-08-18T11:00:00.000Z", 30, now)).toBe(false);
  });
});

describe("formatTeamPulseTitle", () => {
  it("keeps Your team when unassigned", () => {
    expect(formatTeamPulseTitle([])).toBe("Your team");
    expect(formatTeamPulseTitle(["", "  "])).toBe("Your team");
  });
  it("shows a single team name after the label", () => {
    expect(formatTeamPulseTitle(["Engineering"])).toBe("Your team · Engineering");
  });
  it("shows the first team plus overflow count", () => {
    expect(formatTeamPulseTitle(["Engineering", "Platform", "QA"])).toBe("Your team · Engineering +2");
  });
});
