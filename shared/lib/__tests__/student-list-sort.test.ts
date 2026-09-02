import { describe, expect, it } from "vitest";
import {
  DEFAULT_STUDENT_SORT_API,
  nextStudentColumnSort,
  normalizeStudentEducation,
  normalizeStudentName,
  normalizeStudentSkills,
  sortOptionToApiSortBy,
  sortStudentRows,
  studentColumnAriaSort,
  studentHeaderSortColumn,
  studentSortButtonAriaLabel,
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
    expect(sortOptionToApiSortBy("name-desc")).toBe("name:desc");
    expect(sortOptionToApiSortBy("skills-asc")).toBe("skills:asc");
    expect(sortOptionToApiSortBy("skills-desc")).toBe("skills:desc");
    expect(sortOptionToApiSortBy("")).toBe(DEFAULT_STUDENT_SORT_API);
  });

  it("sorts by joined skill names and keeps empty skills last", () => {
    expect(sortStudentRows(rows, "skills-asc").map((row) => row.name)).toEqual([
      "Morgan",
      "Zara",
      "alex",
    ]);
    expect(sortStudentRows(rows, "skills-desc").map((row) => row.name)).toEqual([
      "Zara",
      "Morgan",
      "alex",
    ]);
  });

  it("cycles a column none → asc → desc → none and switches exclusive columns", () => {
    expect(nextStudentColumnSort("", "name")).toBe("name-asc");
    expect(nextStudentColumnSort("name-asc", "name")).toBe("name-desc");
    expect(nextStudentColumnSort("name-desc", "name")).toBe("");
    expect(nextStudentColumnSort("skills-asc", "name")).toBe("name-asc");
    expect(nextStudentColumnSort("name-desc", "skills")).toBe("skills-asc");
  });

  it("maps student info / skills headers to sort columns", () => {
    expect(studentHeaderSortColumn("studentInfo")).toBe("name");
    expect(studentHeaderSortColumn("skills")).toBe("skills");
    expect(studentHeaderSortColumn("education")).toBeNull();
  });

  it("exposes aria-sort and button labels for the active column", () => {
    expect(studentColumnAriaSort("name-asc", "name")).toBe("ascending");
    expect(studentColumnAriaSort("name-asc", "skills")).toBe("none");
    expect(studentSortButtonAriaLabel("name", "")).toBe("Sort by name");
    expect(studentSortButtonAriaLabel("skills", "skills-desc")).toBe(
      "Sort by skills, currently descending"
    );
  });
});
