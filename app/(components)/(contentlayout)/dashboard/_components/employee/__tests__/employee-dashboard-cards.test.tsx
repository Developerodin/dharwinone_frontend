import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import MyTasksCard from "../MyTasksCard";
import DueTodayCard from "../DueTodayCard";
import LeaveCard from "../LeaveCard";
import OpenRolesCard from "../OpenRolesCard";
import TeamPulseCard from "../TeamPulseCard";
import TaskDetailModal from "../TaskDetailModal";
import type { Task } from "@/shared/lib/api/tasks";
import type { JobMatch } from "@/shared/lib/api/employees";
import type { OnLeaveTodayItem } from "@/shared/lib/api/attendance";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}));

afterEach(cleanup); // repo has no global cleanup; multi-render files must unmount between tests

const tasks = [
  { _id: "1", title: "Alpha", status: "todo", dueDate: new Date().toISOString() },
  { _id: "2", title: "Beta", status: "on_going" },
] as unknown as Task[];

const idOnlyTasks = [
  { id: "id-only-1", title: "Gamma", status: "todo", dueDate: new Date().toISOString() },
] as unknown as Task[];

const matches = [
  {
    jobId: "job-1",
    title: "Data Engineer",
    company: "Acme",
    location: "Remote",
    jobType: "Full-time",
    fitScore: 57,
    fitLabel: "Partial Fit",
    matchedSkills: [],
    missingSkills: [],
  },
] as JobMatch[];

const onLeave = [
  { employeeId: "e1", name: "Ada Lovelace", leaveType: "sick" },
] as OnLeaveTodayItem[];

describe("MyTasksCard", () => {
  it("renders the five task board statuses with their labels", () => {
    render(<MyTasksCard tasks={tasks} loading={false} />);
    for (const label of ["New", "To Do", "On Going", "In Review", "Completed"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });
  it("shows every task while All is selected", () => {
    render(<MyTasksCard tasks={tasks} loading={false} />);
    expect(screen.getByText("Alpha")).toBeTruthy();
    expect(screen.getByText("Beta")).toBeTruthy();
  });
  it("renders tasks that only expose id (no _id)", () => {
    render(<MyTasksCard tasks={idOnlyTasks} loading={false} />);
    expect(screen.getByText("Gamma")).toBeTruthy();
  });
});

describe("DueTodayCard", () => {
  it("teaches the user what to do when empty", () => {
    render(
      <DueTodayCard tasks={[]} loading={false} onToggle={() => {}} onOpen={() => {}} />,
    );
    expect(screen.getByText("Nothing due today")).toBeTruthy();
  });

  it("opens details on title click and completes via checkbox", () => {
    const onToggle = vi.fn();
    const onOpen = vi.fn();
    render(
      <DueTodayCard tasks={tasks} loading={false} onToggle={onToggle} onOpen={onOpen} />,
    );

    fireEvent.click(screen.getByText("Alpha"));
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onOpen.mock.calls[0][0].title).toBe("Alpha");
    expect(onToggle).not.toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('Mark "Alpha" complete'));
    expect(onToggle).toHaveBeenCalledWith("1", "completed");
  });

  it("uses id when _id is absent for complete", () => {
    const onToggle = vi.fn();
    render(
      <DueTodayCard
        tasks={idOnlyTasks}
        loading={false}
        onToggle={onToggle}
        onOpen={() => {}}
      />,
    );
    fireEvent.click(screen.getByLabelText('Mark "Gamma" complete'));
    expect(onToggle).toHaveBeenCalledWith("id-only-1", "completed");
  });
});

describe("TaskDetailModal", () => {
  it("shows read-only details and mark complete", () => {
    const onClose = vi.fn();
    const onComplete = vi.fn();
    const task = {
      _id: "t1",
      title: "Ship overlay",
      status: "todo",
      priority: "high",
      dueDate: "2026-08-19T00:00:00.000Z",
      description: "Keep it simple.",
    } as unknown as Task;

    render(<TaskDetailModal task={task} onClose={onClose} onComplete={onComplete} />);

    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByText("Ship overlay")).toBeTruthy();
    expect(screen.getByText("To Do")).toBeTruthy();
    expect(screen.getByText("High")).toBeTruthy();
    expect(screen.getByText("Keep it simple.")).toBeTruthy();
    expect(screen.queryByText(/Save/i)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Mark complete" }));
    expect(onComplete).toHaveBeenCalledWith("t1");
  });
});

describe("LeaveCard", () => {
  it("says days taken, never days remaining", () => {
    render(<LeaveCard requests={[]} loading={false} />);
    expect(screen.getByText(/Taken this year/i)).toBeTruthy();
    expect(screen.queryByText(/remaining|balance|allowance/i)).toBeNull();
  });
});

describe("OpenRolesCard", () => {
  it("shows resume-matched jobs with fit score and apply link", () => {
    render(<OpenRolesCard jobs={matches} loading={false} />);
    expect(screen.getByText("Data Engineer")).toBeTruthy();
    expect(screen.getByText(/57% Partial Fit/)).toBeTruthy();
    const apply = screen.getByText("Apply").closest("a");
    expect(apply?.getAttribute("href")).toBe("/ats/browse-jobs/job-1");
  });

  it("uses a matches empty state, not internal openings", () => {
    render(<OpenRolesCard jobs={[]} loading={false} />);
    expect(screen.getByText(/No matching jobs right now/i)).toBeTruthy();
    expect(screen.queryByText(/internal openings/i)).toBeNull();
  });
});

describe("TeamPulseCard", () => {
  it("shows the assigned team name in the header", () => {
    render(
      <TeamPulseCard onLeave={[]} loading={false} teamNames={["Engineering"]} teamsLoading={false} />,
    );
    expect(screen.getByText("Your team · Engineering")).toBeTruthy();
    expect(screen.getByText("Everyone is in today.")).toBeTruthy();
  });

  it("keeps Your team and an empty hint when unassigned", () => {
    render(<TeamPulseCard onLeave={onLeave} loading={false} teamNames={[]} teamsLoading={false} />);
    expect(screen.getByText("Your team")).toBeTruthy();
    expect(screen.getByText(/Not assigned to a team yet/i)).toBeTruthy();
    expect(screen.getByText("Ada Lovelace")).toBeTruthy();
  });

  it("shows overflow for multiple teams and keeps out-today pulse", () => {
    render(
      <TeamPulseCard
        onLeave={onLeave}
        loading={false}
        teamNames={["Engineering", "Platform"]}
        teamsLoading={false}
      />,
    );
    expect(screen.getByText("Your team · Engineering +1")).toBeTruthy();
    expect(screen.getByText("Out today")).toBeTruthy();
    expect(screen.queryByText(/Not assigned/i)).toBeNull();
  });
});
