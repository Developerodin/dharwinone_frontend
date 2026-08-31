import { describe, expect, it, vi, afterEach } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import MeetingCreatedSuccess from "../meeting/MeetingCreatedSuccess";

const LONG_URL =
  "https://meet.example.com/rooms/very-long-interview-path-with-many-segments/and-query?guest=name&email=someone@example.com&token=abcdefghijklmnopqrstuvwxyz";

const defaultProps = {
  title: "Technical interview — Senior Engineer",
  scheduledAt: new Date("2026-09-15T14:30:00.000Z"),
  durationMinutes: 45,
  meetingId: "abc-123",
  status: "scheduled",
  shareUrl: LONG_URL,
  personalUrl: `${LONG_URL}&personal=true`,
  onClose: vi.fn(),
  onAnother: vi.fn(),
  joinHref: `${LONG_URL}&join=true`,
  variant: "interview" as const,
};

describe("MeetingCreatedSuccess responsive layout", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders interview success content with join, links, and actions", () => {
    render(<MeetingCreatedSuccess {...defaultProps} />);

    expect(screen.getByText("Interview scheduled")).toBeInTheDocument();
    expect(screen.getByLabelText("Public link")).toBeInTheDocument();
    expect(screen.getByLabelText("Your join link")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /join interview/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /done/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /schedule another interview/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to calendar/i })).toBeInTheDocument();
  });

  it("uses flex column root with internal scroll and no fixed viewport max-height", () => {
    const { container } = render(<MeetingCreatedSuccess {...defaultProps} />);
    const root = container.firstElementChild as HTMLElement;

    expect(root.className).toContain("flex-1");
    expect(root.className).toContain("overflow-hidden");
    expect(root.className).not.toMatch(/max-h-\[min\(96vh/);

    const scrollRegion = root.querySelector(".overflow-y-auto");
    expect(scrollRegion).toBeTruthy();
  });

  it("keeps copy controls accessible and copy button non-shrinking", () => {
    render(<MeetingCreatedSuccess {...defaultProps} />);

    const publicCopy = screen.getByRole("button", { name: /copy public link/i });
    expect(publicCopy).toBeInTheDocument();
    expect(publicCopy.className).toContain("shrink-0");

    const personalCopy = screen.getByRole("button", { name: /copy your join link/i });
    expect(personalCopy).toBeInTheDocument();
    expect(personalCopy.className).toContain("shrink-0");
  });

  it("allows long URLs to wrap in link fields", () => {
    render(<MeetingCreatedSuccess {...defaultProps} />);

    const publicInput = screen.getByLabelText("Public link");
    expect(publicInput.className).toContain("min-w-0");
    expect(publicInput.className).toContain("[overflow-wrap:anywhere]");

    const personalInput = screen.getByLabelText("Your join link");
    expect(personalInput.className).toContain("min-w-0");
    expect(personalInput.className).toContain("[overflow-wrap:anywhere]");
  });

  it("stacks link row on mobile and uses md breakpoint for action bar", () => {
    render(<MeetingCreatedSuccess {...defaultProps} />);

    const publicInput = screen.getByLabelText("Public link");
    const linkRow = publicInput.parentElement as HTMLElement;
    expect(linkRow.className).toContain("flex-col");
    expect(linkRow.className).toContain("sm:flex-row");

    const actionCluster = screen.getByRole("button", { name: /schedule another interview/i }).parentElement as HTMLElement;
    expect(actionCluster.className).toContain("flex-col");
    expect(actionCluster.className).toContain("md:flex-row");
  });

  it("wraps date and time chips on narrow layouts", () => {
    const { container } = render(<MeetingCreatedSuccess {...defaultProps} />);
    const chipRow = container.querySelector(".flex.w-full.flex-wrap") as HTMLElement | null;
    expect(chipRow).toBeTruthy();
    expect(chipRow?.className).toContain("flex-wrap");
    expect(chipRow?.className).toContain("w-full");
  });

  it("shows compact join label on mobile and full label from sm breakpoint", () => {
    render(<MeetingCreatedSuccess {...defaultProps} />);

    const joinLink = screen.getByRole("link", { name: /join interview/i });
    const compact = within(joinLink).getByText("Join");
    const full = within(joinLink).getByText("Join interview");

    expect(compact.className).toContain("sm:hidden");
    expect(full.className).toContain("hidden");
    expect(full.className).toContain("sm:inline");
  });

  it("places join link first in the action cluster for mobile visibility", () => {
    render(<MeetingCreatedSuccess {...defaultProps} />);

    const joinLink = screen.getByRole("link", { name: /join interview/i });
    const actionCluster = joinLink.parentElement as HTMLElement;
    const children = Array.from(actionCluster.children);
    expect(children[0]).toBe(joinLink);
  });
});
