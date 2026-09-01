/**
 * Which holiday list the default dashboard shows, and how the company list is
 * normalised into the shape the card already consumes.
 *
 * Two endpoints exist and both are correct:
 *   - GET /holidays                                  global catalogue (managers only)
 *   - GET /training/attendance/me/upcoming-holidays   the caller's own assignments
 *
 * Holiday managers get the company catalogue, because an admin usually has no
 * personal holiday assignment and would otherwise see a permanently empty card.
 * Everyone else keeps the personal list.
 *
 * Every date comparison here uses local calendar parts, never UTC. A holiday
 * stored as 2026-09-01T00:00:00Z is "today" for a user in IST on 1 Sep, and a
 * UTC comparison would drop it a day early for anyone east of UTC.
 */
import type { AssignedHolidayItem } from "@/shared/lib/api/attendance";
import type { Holiday } from "@/shared/lib/api/holidays";

export type HolidayScope = "company" | "personal";

/** Which list a viewer should see. Managers see the catalogue, everyone else their own. */
export function holidayScopeFor(canManageHolidays: boolean): HolidayScope {
  return canManageHolidays ? "company" : "personal";
}

/** Local YYYY-MM-DD. Not toISOString(), which is UTC and can shift the day. */
export function localYmd(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Midnight local on the same calendar day, for day-granularity comparisons. */
function startOfLocalDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

function localDayOf(iso: string): number | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return startOfLocalDay(d);
}

export function toAssignedHoliday(h: Holiday): AssignedHolidayItem {
  return {
    id: String(h.id ?? h._id ?? ""),
    title: h.title,
    date: h.date,
    endDate: h.endDate ?? null,
  };
}

/**
 * Active holidays that have not finished yet, oldest first.
 *
 * The API is already asked for `isActive` and `startDate`, so this is a second
 * line of defence rather than the only filter: it keeps the guarantee local and
 * testable, and it fixes the ordering if the server ignores `sortBy`.
 *
 * A multi-day holiday counts as upcoming until its endDate has passed, so a
 * festival running 1-3 Sep still shows on 2 Sep.
 */
export function upcomingCompanyHolidays(
  rows: Holiday[],
  now: Date = new Date()
): AssignedHolidayItem[] {
  const today = startOfLocalDay(now);
  return rows
    .filter((h) => h.isActive)
    .map(toAssignedHoliday)
    .filter((h) => {
      const start = localDayOf(h.date);
      if (start == null) return false;
      const end = h.endDate ? localDayOf(h.endDate) ?? start : start;
      return Math.max(start, end) >= today;
    })
    .sort((a, b) => (localDayOf(a.date) ?? 0) - (localDayOf(b.date) ?? 0));
}

/** True when the holiday spans today, so the card can flag it like the /me endpoint does. */
export function coversToday(h: AssignedHolidayItem, now: Date = new Date()): boolean {
  const today = startOfLocalDay(now);
  const start = localDayOf(h.date);
  if (start == null) return false;
  const end = h.endDate ? localDayOf(h.endDate) ?? start : start;
  return start <= today && today <= end;
}

/** The holiday covering today, if any — mirrors todayIsHoliday/todayHolidayTitle from /me. */
export function todayHolidayFrom(
  items: AssignedHolidayItem[],
  now: Date = new Date()
): AssignedHolidayItem | null {
  return items.find((h) => coversToday(h, now)) ?? null;
}
