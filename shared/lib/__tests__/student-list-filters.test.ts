import { describe, expect, it } from "vitest";
import {
  buildStudentListParams,
  isExperienceFilterActive,
} from "@/shared/lib/training/student-list-filters";

describe("student-list-filters", () => {
  it("builds list params with active sidebar filters", () => {
    const params = buildStudentListParams({
      page: 2,
      limit: 25,
      sortBy: "name:asc",
      search: "alex",
      statusFilter: "active",
      filters: {
        name: ["Alex"],
        skills: ["React"],
        education: ["BS Computer Science"],
        email: "alex@",
        experience: [2, 8],
      },
      experienceBounds: { min: 0, max: 20 },
    });

    expect(params).toMatchObject({
      page: 2,
      limit: 25,
      sortBy: "name:asc",
      search: "alex",
      status: "active",
      names: ["Alex"],
      skills: ["React"],
      education: ["BS Computer Science"],
      email: "alex@",
      experienceMin: 2,
      experienceMax: 8,
    });
  });

  it("omits experience bounds when filter matches defaults", () => {
    const params = buildStudentListParams({
      page: 1,
      limit: 10,
      sortBy: "createdAt:desc",
      statusFilter: "all",
      filters: {
        name: [],
        skills: [],
        education: [],
        email: "",
        experience: [0, 20],
      },
      experienceBounds: { min: 0, max: 20 },
    });

    expect(params.experienceMin).toBeUndefined();
    expect(params.experienceMax).toBeUndefined();
    expect(params.status).toBe("all");
  });

  it("detects active experience filter", () => {
    expect(
      isExperienceFilterActive(
        { name: [], skills: [], education: [], email: "", experience: [1, 10] },
        { min: 0, max: 20 }
      )
    ).toBe(true);
  });
});
