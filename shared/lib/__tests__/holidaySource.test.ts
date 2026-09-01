import { describe, expect, it } from "vitest";
import type { Holiday } from "@/shared/lib/api/holidays";
import {
  coversToday,
  holidayScopeFor,
  localYmd,
  toAssignedHoliday,
  todayHolidayFrom,
  upcomingCompanyHolidays,
} from "@/shared/lib/dashboard/holidaySource";

/** Local midnight, so fixtures never depend on the runner's timezone. */
const at = (y: number, m: number, d: number) => new Date(y, m - 1, d);

const holiday = (over: Partial<Holiday> & { title: string; date: string }): Holiday => ({
  isActive: true,
  ...over,
});

describe("holidayScopeFor", () => {
  it("gives holiday managers the company catalogue", () => {
    expect(holidayScopeFor(true)).toBe("company");
  });

  it("gives everyone else their own assignments", () => {
    expect(holidayScopeFor(false)).toBe("personal");
  });
});

describe("localYmd", () => {
  it("formats the local calendar day, zero padded", () => {
    expect(localYmd(at(2026, 9, 1))).toBe("2026-09-01");
    expect(localYmd(at(2026, 12, 25))).toBe("2026-12-25");
  });

  it("does not shift the day the way toISOString would east of UTC", () => {
    // 1 Sep 05:30 local is still 31 Aug in UTC for IST; the query must say 1 Sep.
    const morning = new Date(2026, 8, 1, 5, 30);
    expect(localYmd(morning)).toBe("2026-09-01");
  });
});

describe("toAssignedHoliday", () => {
  it("accepts either id or _id and normalises endDate to null", () => {
    expect(toAssignedHoliday(holiday({ _id: "abc", title: "Diwali", date: "2026-11-08" }))).toEqual({
      id: "abc",
      title: "Diwali",
      date: "2026-11-08",
      endDate: null,
    });
    expect(
      toAssignedHoliday(
        holiday({ id: "xyz", title: "Pongal", date: "2027-01-14", endDate: "2027-01-16" })
      )
    ).toEqual({ id: "xyz", title: "Pongal", date: "2027-01-14", endDate: "2027-01-16" });
  });
});

describe("upcomingCompanyHolidays", () => {
  const now = at(2026, 9, 1);

  it("excludes inactive holidays", () => {
    const rows = [
      holiday({ id: "1", title: "Active", date: "2026-09-10" }),
      holiday({ id: "2", title: "Retired", date: "2026-09-11", isActive: false }),
    ];
    expect(upcomingCompanyHolidays(rows, now).map((h) => h.title)).toEqual(["Active"]);
  });

  it("excludes holidays that have already passed", () => {
    const rows = [
      holiday({ id: "1", title: "Last month", date: "2026-08-15" }),
      holiday({ id: "2", title: "Next week", date: "2026-09-08" }),
    ];
    expect(upcomingCompanyHolidays(rows, now).map((h) => h.title)).toEqual(["Next week"]);
  });

  it("keeps a holiday falling today", () => {
    const rows = [holiday({ id: "1", title: "Today", date: "2026-09-01" })];
    expect(upcomingCompanyHolidays(rows, now)).toHaveLength(1);
  });

  it("keeps a multi-day holiday until its end date has passed", () => {
    const rows = [holiday({ id: "1", title: "Onam", date: "2026-08-30", endDate: "2026-09-03" })];
    expect(upcomingCompanyHolidays(rows, now).map((h) => h.title)).toEqual(["Onam"]);
    // Same holiday, four days later: now finished.
    expect(upcomingCompanyHolidays(rows, at(2026, 9, 5))).toEqual([]);
  });

  it("sorts chronologically even when the server returns them out of order", () => {
    const rows = [
      holiday({ id: "3", title: "December", date: "2026-12-25" }),
      holiday({ id: "1", title: "September", date: "2026-09-05" }),
      holiday({ id: "2", title: "October", date: "2026-10-02" }),
    ];
    expect(upcomingCompanyHolidays(rows, now).map((h) => h.title)).toEqual([
      "September",
      "October",
      "December",
    ]);
  });

  it("drops rows with an unparseable date rather than throwing", () => {
    const rows = [
      holiday({ id: "1", title: "Broken", date: "not-a-date" }),
      holiday({ id: "2", title: "Fine", date: "2026-09-09" }),
    ];
    expect(upcomingCompanyHolidays(rows, now).map((h) => h.title)).toEqual(["Fine"]);
  });

  it("returns an empty list for an empty catalogue", () => {
    expect(upcomingCompanyHolidays([], now)).toEqual([]);
  });

  it("treats a late-evening local time as still being today", () => {
    // 23:45 local on 1 Sep is 2 Sep in UTC; a UTC comparison would drop today's holiday.
    const lateEvening = new Date(2026, 8, 1, 23, 45);
    const rows = [holiday({ id: "1", title: "Today", date: "2026-09-01" })];
    expect(upcomingCompanyHolidays(rows, lateEvening)).toHaveLength(1);
  });
});

describe("coversToday / todayHolidayFrom", () => {
  const now = at(2026, 9, 1);

  it("matches a single-day holiday on its own date", () => {
    expect(coversToday({ id: "1", title: "Today", date: "2026-09-01" }, now)).toBe(true);
    expect(coversToday({ id: "2", title: "Tomorrow", date: "2026-09-02" }, now)).toBe(false);
  });

  it("matches any day inside a multi-day span, including both ends", () => {
    const onam = { id: "1", title: "Onam", date: "2026-08-30", endDate: "2026-09-03" };
    expect(coversToday(onam, at(2026, 8, 30))).toBe(true);
    expect(coversToday(onam, at(2026, 9, 1))).toBe(true);
    expect(coversToday(onam, at(2026, 9, 3))).toBe(true);
    expect(coversToday(onam, at(2026, 9, 4))).toBe(false);
  });

  it("returns the covering holiday, or null when none applies", () => {
    const items = [
      { id: "1", title: "Later", date: "2026-09-20" },
      { id: "2", title: "Independence Day", date: "2026-09-01" },
    ];
    expect(todayHolidayFrom(items, now)?.title).toBe("Independence Day");
    expect(todayHolidayFrom(items, at(2026, 9, 2))).toBeNull();
    expect(todayHolidayFrom([], now)).toBeNull();
  });
});
