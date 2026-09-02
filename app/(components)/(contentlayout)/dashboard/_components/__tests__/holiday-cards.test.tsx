import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import UpcomingHolidaysCard from "../UpcomingHolidaysCard";
import OnLeaveTodayCard from "../OnLeaveTodayCard";
import type { AssignedHolidayItem, OnLeaveTodayItem } from "@/shared/lib/api/attendance";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}));

afterEach(cleanup); // repo has no global cleanup; multi-render files must unmount between tests

const holidays: AssignedHolidayItem[] = [
  { id: "h1", title: "Independence Day", date: "2026-09-10", endDate: null },
  { id: "h2", title: "Diwali", date: "2026-11-08", endDate: null },
];

const onLeave: OnLeaveTodayItem[] = [
  { employeeId: "DBS001", name: "A. Employee", startDate: "2026-09-01", endDate: "2026-09-02" },
];

describe("UpcomingHolidaysCard — scope decides the heading", () => {
  it('shows "Upcoming Company Holidays" for a holiday manager', () => {
    render(<UpcomingHolidaysCard holidays={holidays} scope="company" showManage />);
    expect(screen.getByText("Upcoming Company Holidays")).toBeInTheDocument();
    expect(screen.getByText("Across the organisation")).toBeInTheDocument();
    expect(screen.queryByText("My Upcoming Holidays")).not.toBeInTheDocument();
  });

  it('shows "My Upcoming Holidays" for a normal employee', () => {
    render(<UpcomingHolidaysCard holidays={holidays} scope="personal" />);
    expect(screen.getByText("My Upcoming Holidays")).toBeInTheDocument();
    expect(screen.getByText("Assigned to you")).toBeInTheDocument();
    expect(screen.queryByText("Upcoming Company Holidays")).not.toBeInTheDocument();
  });

  it("defaults to the personal heading, so existing callers are unchanged", () => {
    // EmployeeDashboard renders this card without a scope prop.
    render(<UpcomingHolidaysCard holidays={holidays} />);
    expect(screen.getByText("My Upcoming Holidays")).toBeInTheDocument();
  });

  it("renders the holidays it is given", () => {
    render(<UpcomingHolidaysCard holidays={holidays} scope="company" />);
    // Company scope ships two renderings (phone list + desktop preview) and the
    // breakpoint picks one, so the next holiday legitimately appears twice in the DOM.
    expect(screen.getAllByText("Independence Day").length).toBeGreaterThan(0);
    expect(screen.getByText("Diwali")).toBeInTheDocument();
  });
});

/*
 * The company card used to ship TWO renderings — a phone list and a `hidden md:block`
 * one-row pane — and these tests asserted neither leaked into the other. It now ships
 * ONE list that sizes itself to whatever height is left in the cell, so the number of
 * holidays on screen follows the available space instead of a breakpoint: several in a
 * tall cell, one when On Leave Today grows or the viewport is short.
 *
 * jsdom has no layout, so the actual row count is a browser check. What is asserted here
 * is the mechanism — a single list, holding every holiday, sized by flex rather than by
 * a fixed cap — and that the personal card the employee dashboard renders is untouched.
 */
describe("UpcomingHolidaysCard — company card fills its cell with one list", () => {
  const cardList = (c: HTMLElement) => c.querySelector("ul") as HTMLElement;

  it("renders one list holding every holiday, not a per-breakpoint split", () => {
    const { container } = render(<UpcomingHolidaysCard holidays={holidays} scope="company" />);
    expect(container.querySelectorAll("ul")).toHaveLength(1);
    const list = cardList(container);
    expect(list.querySelectorAll("li")).toHaveLength(2);
    expect(list.textContent).toContain("Independence Day");
    expect(list.textContent).toContain("Diwali");
    // The md:hidden / hidden md:block pair is gone; nothing is duplicated per breakpoint.
    expect(container.querySelector('[class*="md:hidden"]')).toBeNull();
  });

  it("sizes that list from the space left in the cell rather than a fixed cap", () => {
    const { container } = render(<UpcomingHolidaysCard holidays={holidays} scope="company" />);
    const list = cardList(container);
    expect(list.className).toContain("flex-1");
    expect(list.className).toContain("min-h-0");
    expect(list.className).toContain("overflow-y-auto");
    // A max-height would pin the row count regardless of how tall the cell actually is.
    expect(list.className).not.toMatch(/max-h-/);
    // flex-1 only resolves against a flex column — that column is the card body.
    expect(list.parentElement!.className).toContain("flex-col");
  });

  it("puts View All in the header beside Manage, hidden below md", () => {
    render(<UpcomingHolidaysCard holidays={holidays} scope="company" showManage />);
    const viewAll = screen.getByRole("button", { name: /view all/i });
    // Header-only: a body footer button overflowed the fixed-height card.
    expect(viewAll.closest(".box-header")).not.toBeNull();
    expect(viewAll.className).toContain("hidden");
    expect(viewAll.className).toContain("md:inline-flex");
    expect(viewAll.parentElement).toBe(screen.getByText("Manage").parentElement);
  });

  it("keeps View All out of the header while loading", () => {
    render(<UpcomingHolidaysCard holidays={holidays} scope="company" loading />);
    expect(screen.queryByRole("button", { name: /view all/i })).not.toBeInTheDocument();
  });

  it("hides View All when there is nothing more to view", () => {
    render(<UpcomingHolidaysCard holidays={[holidays[0]]} scope="company" />);
    expect(screen.queryByRole("button", { name: /view all/i })).not.toBeInTheDocument();
  });

  it("leaves the personal card as a single capped scrolling list at every width", () => {
    // EmployeeDashboard is out of scope: it keeps the fixed max-height list it always
    // had, does not stretch to a cell it does not own, and gets no View All.
    const { container } = render(<UpcomingHolidaysCard holidays={holidays} scope="personal" />);
    const list = cardList(container);
    expect(container.querySelectorAll("ul")).toHaveLength(1);
    expect(list.className).toContain("max-h-[19rem]");
    expect(list.className).not.toContain("flex-1");
    expect(container.querySelectorAll("li")).toHaveLength(2);
    expect(screen.queryByRole("button", { name: /view all/i })).not.toBeInTheDocument();
  });
});

describe("UpcomingHolidaysCard — View All overlay", () => {
  it("opens with the complete list and no extra fetch, then closes", () => {
    render(<UpcomingHolidaysCard holidays={holidays} scope="company" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /view all/i }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    // Every holiday the card holds, not a page of them.
    expect(dialog.querySelectorAll("li")).toHaveLength(2);
    expect(dialog.textContent).toContain("Independence Day");
    expect(dialog.textContent).toContain("Diwali");
    // The overlay is where scrolling is allowed to live.
    expect(dialog.querySelector('[class*="overflow-y-auto"]')).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on Escape", () => {
    render(<UpcomingHolidaysCard holidays={holidays} scope="company" />);
    fireEvent.click(screen.getByRole("button", { name: /view all/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("UpcomingHolidaysCard — empty and loading states", () => {
  it("keeps the card visible with a company-specific empty message", () => {
    // A manager with nothing scheduled must still see the card, not a hole in the grid.
    render(<UpcomingHolidaysCard holidays={[]} scope="company" showManage />);
    expect(screen.getByText("Upcoming Company Holidays")).toBeInTheDocument();
    expect(screen.getByText("No upcoming company holidays.")).toBeInTheDocument();
  });

  it("uses the personal empty message for an employee", () => {
    render(<UpcomingHolidaysCard holidays={[]} scope="personal" />);
    expect(screen.getByText("No upcoming holidays assigned.")).toBeInTheDocument();
  });

  it("shows neither empty message while loading", () => {
    render(<UpcomingHolidaysCard holidays={[]} scope="company" loading />);
    expect(screen.queryByText("No upcoming company holidays.")).not.toBeInTheDocument();
  });
});

describe("UpcomingHolidaysCard — today banner and Manage link", () => {
  it("tells a personal viewer that punch in/out is disabled", () => {
    render(
      <UpcomingHolidaysCard
        holidays={holidays}
        scope="personal"
        todayIsHoliday
        todayHolidayTitle="Onam"
      />
    );
    expect(screen.getByRole("status").textContent).toContain("Punch in/out is disabled");
  });

  it("omits the punch sentence on the company list, where there is no punch button", () => {
    render(
      <UpcomingHolidaysCard
        holidays={holidays}
        scope="company"
        todayIsHoliday
        todayHolidayTitle="Onam"
      />
    );
    const banner = screen.getByRole("status");
    expect(banner.textContent).toContain("Onam");
    expect(banner.textContent).not.toContain("Punch in/out");
  });

  it("shows Manage only to holiday managers", () => {
    const { unmount } = render(
      <UpcomingHolidaysCard holidays={holidays} scope="company" showManage />
    );
    expect(screen.getByText("Manage")).toBeInTheDocument();
    unmount();
    render(<UpcomingHolidaysCard holidays={holidays} scope="personal" />);
    expect(screen.queryByText("Manage")).not.toBeInTheDocument();
  });
});

describe("OnLeaveTodayCard — always rendered, empty state included", () => {
  it("lists people who are away", () => {
    render(<OnLeaveTodayCard items={onLeave} />);
    expect(screen.getByText("On Leave Today")).toBeInTheDocument();
    expect(screen.getByText("1 employee")).toBeInTheDocument();
    expect(screen.getByText(/A\. Employee/)).toBeInTheDocument();
  });

  it("says nobody is away instead of disappearing", () => {
    // Hiding the card collapsed the whole row-2 away column, so it must stay mounted.
    render(<OnLeaveTodayCard items={[]} />);
    expect(screen.getByText("On Leave Today")).toBeInTheDocument();
    expect(screen.getByText("No one is on leave today")).toBeInTheDocument();
  });

  it("keeps the self-scoped heading when the viewer has no leave", () => {
    render(<OnLeaveTodayCard items={[]} selfView />);
    expect(screen.getByText("Your Leave")).toBeInTheDocument();
    expect(screen.getByText("You are not on leave today")).toBeInTheDocument();
  });

  it("does not claim 0 employees", () => {
    render(<OnLeaveTodayCard items={[]} />);
    expect(screen.queryByText("0 employees")).not.toBeInTheDocument();
  });
});

/*
 * Light and dark come from Tailwind's `dark:` variants under a `class` strategy,
 * which jsdom cannot evaluate. These assert the theme-aware markup is present and
 * that no literal background is baked in. Actual contrast in both themes is a
 * visual check, not a unit test.
 */
describe("holiday cards are theme-aware", () => {
  const rootOf = (el: HTMLElement) => el.closest(".box") as HTMLElement;

  /* These used to assert a `dark:` utility on the card ROOT. That held only because both
     cards painted their own gradient wrapper — which is exactly what made them read as a
     different product from the rest of the dashboard. The wrapper is now the shared
     `.box` surface, whose light/dark pair lives in the SCSS, so the root legitimately
     carries no `dark:` utility of its own. The guard these assertions exist for is
     unchanged: no literal and no light-only background baked onto the card. */
  it("UpcomingHolidaysCard uses the shared themed surface, no hardcoded background", () => {
    render(<UpcomingHolidaysCard holidays={holidays} scope="company" />);
    const root = rootOf(screen.getByText("Upcoming Company Holidays"));
    expect(root.className).toContain("box");
    expect(root.getAttribute("style")).toBeNull();
    expect(root.className).not.toMatch(/bg-\[#/);
    expect(root.className).not.toMatch(/\bbg-white\b/);
  });

  it("OnLeaveTodayCard empty state uses the shared themed surface and dark-aware text", () => {
    render(<OnLeaveTodayCard items={[]} />);
    const root = rootOf(screen.getByText("On Leave Today"));
    expect(root.className).toContain("box");
    expect(root.getAttribute("style")).toBeNull();
    expect(root.className).not.toMatch(/bg-\[#/);
    expect(root.className).not.toMatch(/\bbg-white\b/);
    expect(screen.getByText("Everyone is scheduled to be in.").className).toContain("dark:");
  });
});
