import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import MyTasksCard from "../MyTasksCard";
import DueTodayCard from "../DueTodayCard";
import LeaveCard from "../LeaveCard";
import type { Task } from "@/shared/lib/api/tasks";

vi.mock("next/link", () => ({
  default: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

afterEach(cleanup); // repo has no global cleanup; multi-render files must unmount between tests

const tasks = [
  { _id: "1", title: "Alpha", status: "todo", dueDate: new Date().toISOString() },
  { _id: "2", title: "Beta", status: "on_going" },
] as unknown as Task[];

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
});

describe("DueTodayCard", () => {
  it("teaches the user what to do when empty", () => {
    render(<DueTodayCard tasks={[]} loading={false} onToggle={() => {}} />);
    expect(screen.getByText("Nothing due today")).toBeTruthy();
  });
});

describe("LeaveCard", () => {
  it("says days taken, never days remaining", () => {
    render(<LeaveCard requests={[]} loading={false} />);
    expect(screen.getByText(/Taken this year/i)).toBeTruthy();
    expect(screen.queryByText(/remaining|balance|allowance/i)).toBeNull();
  });
});
