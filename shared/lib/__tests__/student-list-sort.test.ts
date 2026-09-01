import { describe, expect, it } from "vitest";
import {
  DEFAULT_STUDENT_SORT_API,
  normalizeStudentEducation,
  normalizeStudentName,
  normalizeStudentSkills,
  sortOptionToApiSortBy,
  sortStudentRows,
  type StudentSortableRow,
} from "../training/student-list-sort";

const rows: StudentSortableRow[] = [
  { name: "Zara", skills: ["Node.js", "React"], education: "MBA - Harvard" },
  { name: "alex", skills: null, education: "" },
  { name: "Morgan", skills: ["AWS"], education: "BS - MIT (2018)" },
];

describe("student-list-sort", () => {
  it("normalizes names case-insensitively", () => {
    expect(normalizeStudentName(" Alex ")).toBe("alex");
    expect(normalizeStudentName(null)).toBe("");
  });

  it("normalizes skills as sorted comma-joined text", () => {
    expect(normalizeStudentSkills(["TypeScript", "React"])).toBe("react, typescript");
    expect(normalizeStudentSkills(null)).toBe("");
  });

  it("normalizes education from strings and structured entries", () => {
    expect(normalizeStudentEducation("BS - MIT")).toBe("bs - mit");
    expect(
      normalizeStudentEducation([
        { degree: "BS", institution: "MIT", endDate: "2018-06-01" },
      ])
    ).toBe("bs - mit - (2018)");
  });

  it("sorts by name A-Z and Z-A", () => {
    expect(sortStudentRows(rows, "name-asc").map((row) => row.name)).toEqual([
      "alex",
      "Morgan",
      "Zara",
    ]);
    expect(sortStudentRows(rows, "name-desc").map((row) => row.name)).toEqual([
      "Zara",
      "Morgan",
      "alex",
    ]);
  });

  it("sorts by skills and education with null-safe values", () => {
    expect(sortStudentRows(rows, "skills-asc").map((row) => row.name)).toEqual([
      "alex",
      "Morgan",
      "Zara",
    ]);
    expect(sortStudentRows(rows, "education-asc").map((row) => row.name)).toEqual([
      "alex",
      "Morgan",
      "Zara",
    ]);
  });

  it("returns the original order when sort is cleared", () => {
    const original = [...rows];
    expect(sortStudentRows(rows, "")).toEqual(original);
  });

  it("does not mutate the source array", () => {
    const source = [...rows];
    sortStudentRows(source, "name-asc");
    expect(source).toEqual(rows);
  });

  it("maps UI sort options to API sort params", () => {
    expect(sortOptionToApiSortBy("name-asc")).toBe("name:asc");
    expect(sortOptionToApiSortBy("education-desc")).toBe("education:desc");
    expect(sortOptionToApiSortBy("")).toBe(DEFAULT_STUDENT_SORT_API);
  });
});
