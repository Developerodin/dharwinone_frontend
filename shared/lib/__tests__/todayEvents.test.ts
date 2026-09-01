import { describe, expect, it } from "vitest";
import type { Meeting } from "@/shared/lib/api/meetings";
import type { InternalMeeting } from "@/shared/lib/api/internal-meetings";
import {
  TODAY_EVENTS_DISPLAY_CAP,
  TODAY_EVENTS_FETCH_LIMIT,
  filterToViewerToday,
  isEventJoinable,
  mergeEvents,
  minutesUntilStart,
  normalizeInternalMeeting,
  normalizeInterview,
  resolveEventJoinUrl,
  viewerDayWindow,
  type DashboardEvent,
} from "@/shared/lib/dashboard/todayEvents";

const interview = (over: Partial<Meeting> = {}): Meeting =>
  ({
    id: "i1",
    meetingId: "meeting_i1",
    title: "Frontend interview",
    scheduledAt: "2026-09-01T10:30:00.000Z",
    durationMinutes: 45,
    status: "scheduled",
    interviewType: "Video",
    maxParticipants: 10,
    allowGuestJoin: true,
    requireApproval: false,
    hosts: [{ nameOrRole: "Recruiter", email: "recruiter@example.test" }],
    emailInvites: [],
    candidate: { name: "A. Candidate" },
    publicMeetingUrl: "https://app.example.test/join/room?room=meeting_i1",
    ...over,
  }) as Meeting;

const meeting = (over: Partial<InternalMeeting> = {}): InternalMeeting =>
  ({
    id: "m1",
    meetingId: "meeting_m1",
    title: "Sprint sync",
    scheduledAt: "2026-09-01T09:00:00.000Z",
    durationMinutes: 30,
    status: "scheduled",
    meetingType: "Team",
    maxParticipants: 20,
    allowGuestJoin: false,
    requireApproval: false,
    hosts: [{ nameOrRole: "Lead", email: "lead@example.test" }],
    emailInvites: [],
    publicMeetingUrl: "https://app.example.test/join/room?room=meeting_m1",
    ...over,
  }) as InternalMeeting;

/** Local-midnight fixture, so nothing depends on the runner's zone. */
const at = (y: number, m: number, d: number, h = 0, min = 0) => new Date(y, m - 1, d, h, min);

describe("normalizeInterview", () => {
  it("maps an ATS interview onto the shared event shape", () => {
    const e = normalizeInterview(interview())!;
    expect(e.source).toBe("interview");
    expect(e.title).toBe("Frontend interview");
    expect(e.participant).toBe("A. Candidate");
    expect(e.status).toBe("scheduled");
    expect(e.endAt).toBe("2026-09-01T11:15:00.000Z"); // +45m
  });

  it("falls back to the recruiter when there is no candidate", () => {
    const e = normalizeInterview(
      interview({ candidate: undefined, recruiter: { name: "R. Recruiter" } } as Partial<Meeting>)
    )!;
    expect(e.participant).toBe("R. Recruiter");
  });

  it("leaves participant null rather than inventing one", () => {
    const e = normalizeInterview(
      interview({ candidate: undefined, recruiter: undefined } as Partial<Meeting>)
    )!;
    expect(e.participant).toBeNull();
  });

  it("drops a row with no usable start time instead of throwing", () => {
    expect(normalizeInterview(interview({ scheduledAt: "" }))).toBeNull();
    expect(normalizeInterview(interview({ scheduledAt: "not-a-date" }))).toBeNull();
    expect(normalizeInterview(interview({ scheduledAt: undefined as never }))).toBeNull();
  });

  it("substitutes the schema default for a missing or absurd duration", () => {
    // Legacy rows carry 0/negative/NaN; a zero-length event would never be joinable.
    for (const bad of [0, -30, Number.NaN, undefined]) {
      const e = normalizeInterview(interview({ durationMinutes: bad as number }))!;
      expect(e.endAt).toBe("2026-09-01T11:30:00.000Z"); // +60m default
    }
  });

  it("treats an empty legacy status as scheduled and an unknown one as unknown", () => {
    expect(normalizeInterview(interview({ status: "" }))!.status).toBe("scheduled");
    expect(normalizeInterview(interview({ status: "SCHEDULED" }))!.status).toBe("scheduled");
    expect(normalizeInterview(interview({ status: "archived" }))!.status).toBe("unknown");
  });
});

describe("normalizeInternalMeeting", () => {
  it("maps a Communication meeting onto the same shape", () => {
    const e = normalizeInternalMeeting(meeting())!;
    expect(e.source).toBe("meeting");
    expect(e.participant).toBe("Lead");
    expect(e.secondaryInfo).toBe("Team");
    expect(e.endAt).toBe("2026-09-01T09:30:00.000Z");
  });

  it("survives a row with no hosts at all", () => {
    const e = normalizeInternalMeeting(meeting({ hosts: [] }))!;
    expect(e.participant).toBeNull();
  });

  it("uses the host email when the host has no display name", () => {
    const e = normalizeInternalMeeting(meeting({ hosts: [{ email: "lead@example.test" }] }))!;
    expect(e.participant).toBe("lead@example.test");
  });
});

describe("resolveEventJoinUrl", () => {
  it("prefers the API-provided URL", () => {
    expect(resolveEventJoinUrl({ publicMeetingUrl: "https://x.test/a", meetingId: "b" }, "")).toBe(
      "https://x.test/a"
    );
  });

  it("builds a room URL from meetingId when the API omitted one", () => {
    expect(
      resolveEventJoinUrl({ publicMeetingUrl: "", meetingId: "meeting_z" }, "https://o.test")
    ).toBe("https://o.test/join/room?room=meeting_z");
  });

  it("returns empty when there is nothing to build from", () => {
    expect(resolveEventJoinUrl({ publicMeetingUrl: null, meetingId: null }, "https://o.test")).toBe(
      ""
    );
  });
});

describe("mergeEvents", () => {
  const ev = (id: string, startAt: string): DashboardEvent => ({
    id,
    source: "meeting",
    title: id,
    participant: null,
    secondaryInfo: null,
    startAt,
    endAt: startAt,
    status: "scheduled",
    joinUrl: "",
    hosts: [],
  });

  it("interleaves two sorted lists chronologically", () => {
    const a = [ev("a1", "2026-09-01T09:00:00.000Z"), ev("a2", "2026-09-01T13:00:00.000Z")];
    const b = [ev("b1", "2026-09-01T10:00:00.000Z"), ev("b2", "2026-09-01T15:00:00.000Z")];
    expect(mergeEvents(a, b).map((e) => e.id)).toEqual(["a1", "b1", "a2", "b2"]);
  });

  it("breaks ties deterministically instead of leaving Mongo order to decide", () => {
    const same = "2026-09-01T09:00:00.000Z";
    const first = mergeEvents([ev("z", same)], [ev("a", same)]).map((e) => e.id);
    const second = mergeEvents([ev("a", same)], [ev("z", same)]).map((e) => e.id);
    expect(first).toEqual(["a", "z"]);
    expect(second).toEqual(first);
  });

  it("does NOT deduplicate across sources — no FK links the two models", () => {
    const interviewEv = {
      ...ev("interview:1", "2026-09-01T09:00:00.000Z"),
      source: "interview" as const,
    };
    const meetingEv = ev("meeting:1", "2026-09-01T09:00:00.000Z");
    expect(mergeEvents([interviewEv], [meetingEv])).toHaveLength(2);
  });

  it("handles either side being empty", () => {
    expect(mergeEvents([], [])).toEqual([]);
    expect(mergeEvents([ev("a", "2026-09-01T09:00:00.000Z")], [])).toHaveLength(1);
  });

  /**
   * The invariant the display cap rests on: with both sources sorted, the first k of the
   * merge is globally correct for any k <= the per-source fetch limit. If the cap ever
   * exceeded the limit, the widget could show a later event while an earlier one sat
   * unfetched beyond the other source's page.
   */
  it("keeps the display cap within the per-source fetch limit", () => {
    expect(TODAY_EVENTS_DISPLAY_CAP).toBeLessThanOrEqual(TODAY_EVENTS_FETCH_LIMIT);
  });

  it("returns the globally earliest k when each source is truncated at the limit", () => {
    const a = Array.from({ length: TODAY_EVENTS_FETCH_LIMIT }, (_, i) =>
      ev(`a${i}`, new Date(Date.UTC(2026, 8, 1, 8, i * 2)).toISOString())
    );
    const b = Array.from({ length: TODAY_EVENTS_FETCH_LIMIT }, (_, i) =>
      ev(`b${i}`, new Date(Date.UTC(2026, 8, 1, 8, i * 2 + 1)).toISOString())
    );
    const merged = mergeEvents(a, b).slice(0, TODAY_EVENTS_DISPLAY_CAP);
    // Sources alternate minute by minute, so the true earliest 8 alternate too.
    expect(merged.map((e) => e.id)).toEqual(["a0", "b0", "a1", "b1", "a2", "b2", "a3", "b3"]);
  });
});

describe("isEventJoinable", () => {
  const base = normalizeInterview(interview())!; // 10:30Z -> 11:15Z
  const start = new Date(base.startAt);
  const end = new Date(base.endAt);

  it("opens exactly 10 minutes before the start", () => {
    expect(isEventJoinable(base, new Date(start.getTime() - 10 * 60000 - 1))).toBe(false);
    expect(isEventJoinable(base, new Date(start.getTime() - 10 * 60000))).toBe(true);
  });

  it("is joinable at the start instant and one minute before it", () => {
    expect(isEventJoinable(base, new Date(start.getTime() - 60000))).toBe(true);
    expect(isEventJoinable(base, start)).toBe(true);
  });

  it("closes the instant after the event ends", () => {
    expect(isEventJoinable(base, end)).toBe(true);
    expect(isEventJoinable(base, new Date(end.getTime() + 1000))).toBe(false);
  });

  it("is never joinable when cancelled or ended, even mid-window", () => {
    expect(isEventJoinable({ ...base, status: "cancelled" }, start)).toBe(false);
    expect(isEventJoinable({ ...base, status: "ended" }, start)).toBe(false);
  });

  it("is not joinable without a URL to join", () => {
    expect(isEventJoinable({ ...base, joinUrl: "" }, start)).toBe(false);
  });
});

describe("minutesUntilStart", () => {
  it("is positive before and negative after the start", () => {
    const e = normalizeInterview(interview())!;
    expect(minutesUntilStart(e, new Date("2026-09-01T10:00:00.000Z"))).toBe(30);
    expect(minutesUntilStart(e, new Date("2026-09-01T10:45:00.000Z"))).toBe(-15);
  });
});

describe("viewerDayWindow", () => {
  it("spans the viewer's own local midnight-to-midnight", () => {
    const { dateFrom, dateTo } = viewerDayWindow(at(2026, 9, 1, 14, 30));
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    expect(from.getFullYear()).toBe(2026);
    expect(from.getMonth()).toBe(8);
    expect(from.getDate()).toBe(1);
    expect(from.getHours()).toBe(0);
    expect(to.getDate()).toBe(1);
    expect(to.getHours()).toBe(23);
    expect(to.getMinutes()).toBe(59);
  });

  it("covers a full local day, DST included", () => {
    const { dateFrom, dateTo } = viewerDayWindow(at(2026, 9, 1, 12));
    const spanHours = (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / 3600000;
    // 23h on a spring-forward day, 25h on fall-back, 24h otherwise — never more.
    expect(spanHours).toBeGreaterThan(22.9);
    expect(spanHours).toBeLessThan(25.1);
  });

  it("is stable no matter what time of day it is called", () => {
    for (const hour of [0, 1, 5, 12, 23]) {
      const w = viewerDayWindow(at(2026, 9, 1, hour, 59));
      expect(new Date(w.dateFrom).getDate()).toBe(1);
      expect(new Date(w.dateTo).getDate()).toBe(1);
    }
  });
});

/**
 * Timezone boundaries. `filterToViewerToday` takes the zone explicitly, so these run
 * identically whatever zone the CI box is in.
 *
 * The instants below are exactly the ones a UTC-prefix comparison gets wrong.
 */
describe("filterToViewerToday across timezone boundaries", () => {
  const evAt = (startAt: string): DashboardEvent => ({
    id: startAt,
    source: "meeting",
    title: "x",
    participant: null,
    secondaryInfo: null,
    startAt,
    endAt: startAt,
    status: "scheduled",
    joinUrl: "",
    hosts: [],
  });

  const keptIn = (tz: string, startAt: string, now: Date) =>
    filterToViewerToday([evAt(startAt)], now, tz).length === 1;

  it("IST (+5:30): an 18:30Z event is already 2 Sep locally, so 1 Sep excludes it", () => {
    // 2026-09-01T18:30Z == 2026-09-02T00:00 IST.
    expect(keptIn("Asia/Kolkata", "2026-09-01T18:30:00.000Z", at(2026, 9, 1, 12))).toBe(false);
    expect(keptIn("Asia/Kolkata", "2026-09-01T18:30:00.000Z", at(2026, 9, 2, 12))).toBe(true);
  });

  it("IST: 18:29Z is still 1 Sep locally (23:59) and is kept", () => {
    expect(keptIn("Asia/Kolkata", "2026-09-01T18:29:00.000Z", at(2026, 9, 1, 12))).toBe(true);
  });

  it("IST: 05:29Z / 05:30Z / 05:31Z all land on the same local day", () => {
    for (const t of ["05:29", "05:30", "05:31"]) {
      expect(keptIn("Asia/Kolkata", `2026-09-01T${t}:00.000Z`, at(2026, 9, 1, 12))).toBe(true);
    }
  });

  it("UTC: 23:59Z belongs to that day, 00:00Z to the next", () => {
    expect(keptIn("UTC", "2026-09-01T23:59:00.000Z", at(2026, 9, 1, 12))).toBe(true);
    expect(keptIn("UTC", "2026-09-02T00:00:00.000Z", at(2026, 9, 1, 12))).toBe(false);
    expect(keptIn("UTC", "2026-09-02T00:00:00.000Z", at(2026, 9, 2, 12))).toBe(true);
  });

  it("New York (negative offset): a 01:00Z event is still the PREVIOUS local day", () => {
    // 2026-09-02T01:00Z == 2026-09-01T21:00 EDT.
    expect(keptIn("America/New_York", "2026-09-02T01:00:00.000Z", at(2026, 9, 1, 12))).toBe(true);
    expect(keptIn("America/New_York", "2026-09-02T01:00:00.000Z", at(2026, 9, 2, 12))).toBe(false);
  });

  it("New York: 04:00Z on 2 Sep is midnight local, so it belongs to 2 Sep", () => {
    expect(keptIn("America/New_York", "2026-09-02T04:00:00.000Z", at(2026, 9, 2, 12))).toBe(true);
  });

  it("the same instant can be two different days for two viewers", () => {
    const instant = "2026-09-01T20:00:00.000Z";
    // 01:30 on 2 Sep in IST, but 16:00 on 1 Sep in New York.
    expect(keptIn("Asia/Kolkata", instant, at(2026, 9, 2, 12))).toBe(true);
    expect(keptIn("America/New_York", instant, at(2026, 9, 1, 12))).toBe(true);
  });

  it("drops an unparseable start rather than counting it as today", () => {
    expect(filterToViewerToday([evAt("not-a-date")], at(2026, 9, 1), "UTC")).toEqual([]);
  });

  it("returns an empty list for no events", () => {
    expect(filterToViewerToday([], at(2026, 9, 1), "UTC")).toEqual([]);
  });
});
