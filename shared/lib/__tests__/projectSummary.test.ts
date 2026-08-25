import { describe, it, expect } from "vitest";
import type { Project } from "@/shared/lib/api/projects";
import {
  PROJECT_SUMMARY_PAGE_SIZE,
  filterAndSortProjects,
  getProjectSummaryTotalPages,
  clampProjectSummaryPage,
  paginateProjectSummary,
  getProjectSummaryPagination,
} from "@/shared/lib/dashboard/projectSummary";

const PAGE_SIZE = PROJECT_SUMMARY_PAGE_SIZE;

function makeProjects(count: number): Project[] {
  return Array.from({ length: count }, (_, i) => ({
    _id: `p${i + 1}`,
    name: `Project ${String(i + 1).padStart(2, "0")}`,
    status: "Inprogress",
    totalTasks: i,
    completedTasks: 0,
  })) as Project[];
}

describe("getProjectSummaryTotalPages", () => {
  it("returns 0 when total is 0", () => {
    expect(getProjectSummaryTotalPages(0, PAGE_SIZE)).toBe(0);
  });

  it("returns 1 when total is 1", () => {
    expect(getProjectSummaryTotalPages(1, PAGE_SIZE)).toBe(1);
  });

  it("returns 1 when total is pageSize - 1", () => {
    expect(getProjectSummaryTotalPages(PAGE_SIZE - 1, PAGE_SIZE)).toBe(1);
  });

  it("returns 1 when total equals pageSize (no page 2)", () => {
    expect(getProjectSummaryTotalPages(PAGE_SIZE, PAGE_SIZE)).toBe(1);
  });

  it("returns 2 when total is pageSize + 1", () => {
    expect(getProjectSummaryTotalPages(PAGE_SIZE + 1, PAGE_SIZE)).toBe(2);
  });

  it("returns 2 when total is 2 * pageSize", () => {
    expect(getProjectSummaryTotalPages(2 * PAGE_SIZE, PAGE_SIZE)).toBe(2);
  });

  it("returns 3 when total is 2 * pageSize + 1", () => {
    expect(getProjectSummaryTotalPages(2 * PAGE_SIZE + 1, PAGE_SIZE)).toBe(3);
  });
});

describe("paginateProjectSummary", () => {
  it("returns an empty list when total is 0", () => {
    expect(paginateProjectSummary([], 1, PAGE_SIZE)).toEqual([]);
  });

  it("returns one item when total is 1", () => {
    const items = makeProjects(1);
    expect(paginateProjectSummary(items, 1, PAGE_SIZE)).toHaveLength(1);
  });

  it("returns all items on page 1 when total equals pageSize", () => {
    const items = makeProjects(PAGE_SIZE);
    expect(paginateProjectSummary(items, 1, PAGE_SIZE)).toHaveLength(PAGE_SIZE);
    expect(paginateProjectSummary(items, 2, PAGE_SIZE)).toHaveLength(PAGE_SIZE);
    expect(getProjectSummaryTotalPages(items.length, PAGE_SIZE)).toBe(1);
  });

  it("returns pageSize items on page 1 and remainder on page 2", () => {
    const items = makeProjects(PAGE_SIZE + 1);
    expect(paginateProjectSummary(items, 1, PAGE_SIZE)).toHaveLength(PAGE_SIZE);
    expect(paginateProjectSummary(items, 2, PAGE_SIZE)).toHaveLength(1);
  });
});

describe("clampProjectSummaryPage", () => {
  it("clamps page to 1 when totalPages is 0", () => {
    expect(clampProjectSummaryPage(2, 0)).toBe(1);
  });

  it("clamps page down when filter reduces results to one page", () => {
    expect(clampProjectSummaryPage(2, 1)).toBe(1);
  });
});

describe("getProjectSummaryPagination", () => {
  it("hides pagination metadata when total is 0", () => {
    expect(getProjectSummaryPagination(0, 1, PAGE_SIZE)).toEqual({
      totalPages: 0,
      page: 1,
      entryCount: 0,
    });
  });

  it("reports entryCount for the current page only", () => {
    expect(getProjectSummaryPagination(PAGE_SIZE, 1, PAGE_SIZE).entryCount).toBe(
      PAGE_SIZE
    );
    expect(getProjectSummaryPagination(PAGE_SIZE + 1, 2, PAGE_SIZE).entryCount).toBe(
      1
    );
  });
});

describe("filterAndSortProjects pagination integration", () => {
  it("removes page 2 when search filter reduces results to one page", () => {
    const projects = [
      ...makeProjects(PAGE_SIZE),
      { _id: "alpha", name: "Alpha Special", status: "Inprogress" } as Project,
    ];
    const filtered = filterAndSortProjects(projects, "Alpha", "name-asc");
    const totalPages = getProjectSummaryTotalPages(filtered.length, PAGE_SIZE);
    const clampedPage = clampProjectSummaryPage(2, totalPages);

    expect(filtered).toHaveLength(1);
    expect(totalPages).toBe(1);
    expect(clampedPage).toBe(1);
    expect(paginateProjectSummary(filtered, clampedPage, PAGE_SIZE)).toHaveLength(1);
  });
});
