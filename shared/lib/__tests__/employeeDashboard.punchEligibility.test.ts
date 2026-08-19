import { describe, it, expect } from "vitest";
import {
  parsePunchInBlockedError,
  punchInBlockedCopy,
  resolvePunchInEligibility,
} from "@/shared/lib/dashboard/employeeDashboard";
import type { LeaveRequest } from "@/shared/lib/api/leave-requests";
import type { AttendanceRecord } from "@/shared/lib/api/attendance";

/** Fixed Wednesday 2026-08-19 local (matches user_info date). */
const WED = new Date(2026, 7, 19, 12, 0, 0);

describe("resolvePunchInEligibility", () => {
  it("allows a normal working day", () => {
    expect(
      resolvePunchInEligibility({
        todayIsHoliday: false,
        weekOffDays: ["Sunday"],
        now: WED,
      }),
    ).toEqual({ allowed: true });
  });

  it("blocks holiday with highest priority over leave and week off", () => {
    const leave: LeaveRequest[] = [
      {
        _id: "lr1",
        status: "approved",
        dates: ["2026-08-19"],
        leaveType: "casual",
      } as LeaveRequest,
    ];
    const result = resolvePunchInEligibility({
      todayIsHoliday: true,
      todayHolidayTitle: "Independence Day",
      leaveRequests: leave,
      weekOffDays: ["Wednesday"],
      now: WED,
    });
    expect(result).toMatchObject({
      allowed: false,
      reason: "HOLIDAY",
      label: "Holiday",
      holidayName: "Independence Day",
      alsoOnLeave: true,
    });
  });

  it("blocks approved leave when not a holiday", () => {
    const leave: LeaveRequest[] = [
      {
        _id: "lr1",
        status: "approved",
        dates: ["2026-08-19"],
        leaveType: "sick",
      } as LeaveRequest,
    ];
    expect(
      resolvePunchInEligibility({
        todayIsHoliday: false,
        leaveRequests: leave,
        weekOffDays: ["Sunday"],
        now: WED,
      }),
    ).toEqual({ allowed: false, reason: "LEAVE", label: "On leave" });
  });

  it("blocks via Leave attendance row without approved request", () => {
    const records: AttendanceRecord[] = [
      {
        id: "a1",
        student: "s1",
        date: "2026-08-19T00:00:00.000Z",
        punchIn: "",
        punchOut: null,
        duration: null,
        status: "Leave",
      },
    ];
    expect(
      resolvePunchInEligibility({
        todayIsHoliday: false,
        attendanceRecords: records,
        now: WED,
      }),
    ).toEqual({ allowed: false, reason: "LEAVE", label: "On leave" });
  });

  it("ignores pending leave", () => {
    const leave: LeaveRequest[] = [
      {
        _id: "lr1",
        status: "pending",
        dates: ["2026-08-19"],
        leaveType: "casual",
      } as LeaveRequest,
    ];
    expect(
      resolvePunchInEligibility({
        leaveRequests: leave,
        weekOffDays: ["Sunday"],
        now: WED,
      }),
    ).toEqual({ allowed: true });
  });

  it("blocks configured week-off day", () => {
    expect(
      resolvePunchInEligibility({
        weekOffDays: ["Wednesday"],
        now: WED,
      }),
    ).toEqual({ allowed: false, reason: "WEEK_OFF", label: "Week off" });
  });

  it("does not invent Sat/Sun week-off when list is empty (matches backend)", () => {
    const sunday = new Date(2026, 7, 16, 12, 0, 0); // Sunday
    expect(
      resolvePunchInEligibility({
        weekOffDays: [],
        now: sunday,
      }),
    ).toEqual({ allowed: true });
  });
});

describe("punchInBlockedCopy", () => {
  it("returns holiday copy with name", () => {
    const copy = punchInBlockedCopy({
      allowed: false,
      reason: "HOLIDAY",
      label: "Holiday",
      holidayName: "Diwali",
    });
    expect(copy.title).toBe("Punch in unavailable");
    expect(copy.body).toContain("Diwali");
  });
});

describe("parsePunchInBlockedError", () => {
  it("parses structured PUNCH_IN_BLOCKED axios payload", () => {
    const err = {
      response: {
        data: {
          code: 400,
          message: "Punch in blocked",
          errorCode: "PUNCH_IN_BLOCKED",
          details: { reason: "WEEK_OFF" },
        },
      },
    };
    expect(parsePunchInBlockedError(err)).toEqual({
      allowed: false,
      reason: "WEEK_OFF",
      label: "Week off",
      holidayName: undefined,
    });
  });

  it("returns null for unrelated errors", () => {
    expect(parsePunchInBlockedError({ response: { data: { message: "nope" } } })).toBeNull();
  });
});
