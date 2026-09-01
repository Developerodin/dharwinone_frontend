import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import TodayEventsCard, { type EventSourceError } from "../TodayEventsCard";
import { TODAY_EVENTS_DISPLAY_CAP, type DashboardEvent } from "@/shared/lib/dashboard/todayEvents";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}));

afterEach(cleanup); // repo has no global cleanup; multi-render files must unmount between tests

const NOW = new Date("2026-09-01T10:00:00.000Z");

const event = (over: Partial<DashboardEvent> = {}): DashboardEvent => ({
  id: "interview:1",
  source: "interview",
  title: "Frontend interview",
  participant: "A. Candidate",
  secondaryInfo: "Senior Engineer",
  startAt: "2026-09-01T10:30:00.000Z",
  endAt: "2026-09-01T11:15:00.000Z",
  status: "scheduled",
  joinUrl: "https://app.example.test/join/room?room=meeting_i1",
  hosts: [{ nameOrRole: "Recruiter", email: "recruiter@example.test" }],
  ...over,
});

const meetingEvent = (over: Partial<DashboardEvent> = {}) =>
  event({
    id: "meeting:1",
    source: "meeting",
    title: "Sprint sync",
    participant: "Lead",
    secondaryInfo: "Team",
    ...over,
  });

const user = { name: "Staff User", email: "staff@example.test" };

const renderCard = (props: Partial<React.ComponentProps<typeof TodayEventsCard>> = {}) =>
  render(
    <TodayEventsCard
      events={[event()]}
      loading={false}
      errors={[]}
      totalToday={1}
      user={user}
      now={NOW}
      {...props}
    />
  );

describe("TodayEventsCard — both sources in one list", () => {
  it("shows the Highlight of Today heading and its subtitle", () => {
    renderCard();
    expect(screen.getByText("Highlight of Today")).toBeInTheDocument();
    expect(screen.getByText("Today's Interviews / Meetings")).toBeInTheDocument();
  });

  it("renders interviews and meetings together, each labelled by source", () => {
    renderCard({ events: [meetingEvent(), event()], totalToday: 2 });
    expect(screen.getByText("Sprint sync")).toBeInTheDocument();
    expect(screen.getByText("Frontend interview")).toBeInTheDocument();
    expect(screen.getByText("Meeting")).toBeInTheDocument();
    expect(screen.getByText("Interview")).toBeInTheDocument();
  });

  it("shows the participant and secondary detail", () => {
    renderCard();
    expect(screen.getByText(/A\. Candidate/)).toBeInTheDocument();
    expect(screen.getByText(/Senior Engineer/)).toBeInTheDocument();
  });

  it("renders a row that has neither participant nor detail", () => {
    renderCard({ events: [event({ participant: null, secondaryInfo: null })] });
    expect(screen.getByText("Frontend interview")).toBeInTheDocument();
  });

  it("preserves the order it was given — the caller already merged chronologically", () => {
    renderCard({
      events: [
        meetingEvent({ startAt: "2026-09-01T09:00:00.000Z", endAt: "2026-09-01T09:30:00.000Z" }),
        event(),
      ],
      totalToday: 2,
    });
    const titles = screen.getAllByTitle(/Sprint sync|Frontend interview/).map((n) => n.textContent);
    expect(titles).toEqual(["Sprint sync", "Frontend interview"]);
  });
});

describe("TodayEventsCard — caps and overflow", () => {
  const many = (n: number) =>
    Array.from({ length: n }, (_, i) =>
      event({
        id: `interview:${i}`,
        title: `Event ${i}`,
        startAt: new Date(Date.UTC(2026, 8, 1, 10, i)).toISOString(),
        endAt: new Date(Date.UTC(2026, 8, 1, 11, i)).toISOString(),
      })
    );

  it("never renders more than the display cap, even given more", () => {
    renderCard({ events: many(20), totalToday: 20 });
    expect(screen.getAllByRole("listitem")).toHaveLength(TODAY_EVENTS_DISPLAY_CAP);
  });

  it("offers View All with the server-side total when the day overflows", () => {
    renderCard({ events: many(20), totalToday: 512 });
    expect(screen.getByText(/View all 512 of today's events/)).toBeInTheDocument();
  });

  it("omits the overflow link when everything is on screen", () => {
    renderCard({ events: [event()], totalToday: 1 });
    expect(screen.queryByText(/View all .* of today's events/)).not.toBeInTheDocument();
  });
});

describe("TodayEventsCard — Join is gated, never guessed", () => {
  it("offers Join inside the window, carrying the viewer identity", () => {
    // 10:00Z vs a 10:05Z start — inside the 10-minute pre-open window.
    renderCard({ events: [event({ startAt: "2026-09-01T10:05:00.000Z" })] });
    const link = screen.getByRole("link", { name: /Join Frontend interview/ });
    expect(link).toHaveAttribute("href", expect.stringContaining("email=staff%40example.test"));
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("prefers the matching host identity over the login when the viewer is a host", () => {
    renderCard({
      events: [
        event({
          startAt: "2026-09-01T10:05:00.000Z",
          hosts: [{ nameOrRole: "Panel Lead", email: "staff@example.test" }],
        }),
      ],
    });
    const link = screen.getByRole("link", { name: /Join Frontend interview/ });
    expect(link).toHaveAttribute("href", expect.stringContaining("Panel+Lead"));
  });

  it("disables Join outside the window and says why", () => {
    // Starts in 4 hours — well before the window opens.
    renderCard({
      events: [event({ startAt: "2026-09-01T14:00:00.000Z", endAt: "2026-09-01T15:00:00.000Z" })],
    });
    const btn = screen.getByRole("button", { name: /Join Frontend interview/ });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("title", expect.stringContaining("Opens 10 minutes before"));
  });

  it("never offers Join for a cancelled event, even at its start time", () => {
    renderCard({ events: [event({ status: "cancelled", startAt: "2026-09-01T10:00:00.000Z" })] });
    expect(screen.queryByRole("link", { name: /Join/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Join .* Cancelled/ })).toBeDisabled();
    expect(screen.getByText("Cancelled")).toBeInTheDocument();
  });

  it("never offers Join for an event that has ended", () => {
    renderCard({
      events: [event({ startAt: "2026-09-01T08:00:00.000Z", endAt: "2026-09-01T09:00:00.000Z" })],
    });
    expect(screen.queryByRole("link", { name: /Join/ })).not.toBeInTheDocument();
    expect(screen.getByText("Ended")).toBeInTheDocument();
  });

  it("degrades to a disabled Join when the row carries no URL", () => {
    renderCard({ events: [event({ joinUrl: "", startAt: "2026-09-01T10:05:00.000Z" })] });
    const btn = screen.getByRole("button", { name: /No join link available/ });
    expect(btn).toBeDisabled();
  });

  it("survives a row with no hosts", () => {
    renderCard({ events: [event({ hosts: [], startAt: "2026-09-01T10:05:00.000Z" })] });
    expect(screen.getByRole("link", { name: /Join Frontend interview/ })).toBeInTheDocument();
  });
});

describe("TodayEventsCard — failure isolation", () => {
  const interviewsDown: EventSourceError[] = [{ source: "interview", message: "HTTP 500" }];
  const meetingsDown: EventSourceError[] = [{ source: "meeting", message: "HTTP 500" }];

  it("still renders meetings when interviews fail", () => {
    renderCard({ events: [meetingEvent()], errors: interviewsDown, totalToday: 1 });
    expect(screen.getByText("Sprint sync")).toBeInTheDocument();
    expect(screen.getByRole("status").textContent).toContain("Interviews unavailable");
  });

  it("still renders interviews when meetings fail", () => {
    renderCard({ events: [event()], errors: meetingsDown, totalToday: 1 });
    expect(screen.getByText("Frontend interview")).toBeInTheDocument();
    expect(screen.getByRole("status").textContent).toContain("Meetings unavailable");
  });

  it("reports an outright failure only when BOTH sources are down", () => {
    renderCard({ events: [], errors: [...interviewsDown, ...meetingsDown], totalToday: 0 });
    const alert = screen.getByRole("alert");
    expect(within(alert).getByText(/Unable to load today's events/)).toBeInTheDocument();
  });

  it("names the failing source and status without echoing a response body", () => {
    renderCard({
      events: [],
      errors: [
        { source: "interview", message: "no access" },
        { source: "meeting", message: "HTTP 503" },
      ],
      totalToday: 0,
    });
    const alert = screen.getByRole("alert");
    expect(alert.textContent).toContain("Interviews: no access");
    expect(alert.textContent).toContain("Meetings: HTTP 503");
  });

  it("does not claim failure when one source simply has nothing today", () => {
    renderCard({ events: [], errors: interviewsDown, totalToday: 0 });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("Nothing scheduled today")).toBeInTheDocument();
  });
});

describe("TodayEventsCard — loading and empty", () => {
  it("shows placeholders and no empty message while loading", () => {
    renderCard({ events: [], loading: true, totalToday: 0 });
    expect(screen.queryByText("Nothing scheduled today")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("explains an empty day rather than leaving a blank panel", () => {
    renderCard({ events: [], totalToday: 0 });
    expect(screen.getByText("Nothing scheduled today")).toBeInTheDocument();
    expect(screen.getByText("No interviews or meetings scheduled for today.")).toBeInTheDocument();
  });
});

describe("TodayEventsCard — long content and theming", () => {
  it("truncates rather than overflowing a very long title, keeping the full text available", () => {
    const long = "Senior Staff Platform Reliability Engineer interview, panel round three";
    renderCard({ events: [event({ title: long })] });
    const node = screen.getByTitle(long);
    expect(node.className).toContain("truncate");
  });

  /*
   * Light/dark come from Tailwind `dark:` variants under a class strategy, which jsdom
   * cannot evaluate. These assert the theme-aware markup is present and that no literal
   * surface colour is baked in. Real contrast in both themes is a visual check.
   */
  it("takes its surface from the shared .box class, not a hardcoded one", () => {
    // `.box` in public/assets/css/style.css applies bg-white AND dark:bg-bodybg, so the
    // widget is themed by belonging to it — the same way every sibling dashboard card is.
    renderCard();
    const root = screen.getByText("Highlight of Today").closest(".box") as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root.getAttribute("style")).toBeNull();
    expect(root.className).not.toMatch(/bg-\[#/);
    expect(root.className).not.toMatch(/\bbg-white\b/);
  });

  it("gives every colour it sets itself a dark counterpart", () => {
    renderCard({ events: [meetingEvent(), event()], totalToday: 2 });
    // Muted metadata and row borders are set locally, so they need explicit variants.
    for (const el of [screen.getByText(/A\. Candidate/), screen.getByText(/Lead · Team/)]) {
      expect(el.className).toContain("dark:");
    }
    const row = screen.getAllByRole("listitem")[0];
    expect(row.className).toContain("dark:");
    expect(row.className).not.toMatch(/bg-\[#/);
  });

  it("keeps the disabled Join theme-aware too", () => {
    renderCard({
      events: [event({ startAt: "2026-09-01T14:00:00.000Z", endAt: "2026-09-01T15:00:00.000Z" })],
    });
    const btn = screen.getByRole("button", { name: /Join Frontend interview/ });
    expect(btn.className).toContain("dark:");
  });
});
