import { describe, expect, it } from "vitest";
import {
  buildStudentListParams,
  filterStudentFacetOptions,
  isExperienceFilterActive,
  studentHeaderFilterKey,
  studentInfoHeaderFacets,
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

  it("passes studentRoleOnly through to list params", () => {
    const params = buildStudentListParams({
      page: 1,
      limit: 10,
      sortBy: "createdAt:desc",
      statusFilter: "active",
      studentRoleOnly: true,
      filters: {
        name: [],
        skills: [],
        education: [],
        email: "",
        experience: [0, 20],
      },
      experienceBounds: { min: 0, max: 20 },
    });

    expect(params.studentRoleOnly).toBe(true);
  });

  it('omits studentRoleOnly for inactive status', () => {
    const params = buildStudentListParams({
      page: 1,
      limit: 10,
      sortBy: 'createdAt:desc',
      statusFilter: 'inactive',
      studentRoleOnly: true,
      filters: {
        name: [],
        skills: [],
        education: [],
        email: '',
        experience: [0, 20],
      },
      experienceBounds: { min: 0, max: 20 },
    });

    expect(params.studentRoleOnly).toBeUndefined();
    expect(params.status).toBe('inactive');
  });

  it("maps student table headers to sidebar filter keys", () => {
    expect(studentHeaderFilterKey("studentInfo")).toBe("name");
    expect(studentHeaderFilterKey("skills")).toBe("skills");
    expect(studentHeaderFilterKey("education")).toBe("education");
  });

  it("exposes email as a Student Info header facet so the dropdown is not names-only", () => {
    expect(studentInfoHeaderFacets()).toEqual(["name", "email"]);
  });

  it("filters email facet options by substring without dropping unmatched casing", () => {
    expect(
      filterStudentFacetOptions(
        ["ada@dharwin.com", "kate@dharwin.com", "under.taker@example.com"],
        "KATE@"
      )
    ).toEqual(["kate@dharwin.com"]);
  });

  it("does not treat select, bio, or actions headers as filters", () => {
    expect(studentHeaderFilterKey("select")).toBeNull();
    expect(studentHeaderFilterKey("bio")).toBeNull();
    expect(studentHeaderFilterKey("id")).toBeNull();
  });
});
