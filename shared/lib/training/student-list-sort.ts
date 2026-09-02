export type StudentSortOption = "" | "name-asc" | "name-desc" | "skills-asc" | "skills-desc";

export type StudentSortColumn = "name" | "skills";

export const DEFAULT_STUDENT_SORT_API = "createdAt:desc";

export interface StudentSortableRow {
  name: string;
  skills?: string[] | null;
  education?: string | null;
}

type EducationEntry = {
  degree?: string | null;
  institution?: string | null;
  endDate?: string | Date | null;
};

const STUDENT_SORT_OPTIONS: StudentSortOption[] = [
  "",
  "name-asc",
  "name-desc",
  "skills-asc",
  "skills-desc",
];

export function isStudentSortOption(value: string): value is StudentSortOption {
  return (STUDENT_SORT_OPTIONS as string[]).includes(value);
}

export function normalizeStudentName(value: string | null | undefined): string {
  return (value ?? "").trim().toLocaleLowerCase();
}

export function normalizeStudentSkills(skills: string[] | null | undefined): string {
  if (!skills?.length) return "";
  return [...skills]
    .map((skill) => skill.trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .join(", ")
    .toLocaleLowerCase();
}

export function normalizeStudentEducation(
  education: string | EducationEntry[] | null | undefined
): string {
  if (typeof education === "string") {
    return education.trim().toLocaleLowerCase();
  }
  if (!education?.length) return "";

  return education
    .map((entry) => {
      const parts: string[] = [];
      if (entry.degree?.trim()) parts.push(entry.degree.trim());
      if (entry.institution?.trim()) parts.push(entry.institution.trim());
      if (entry.endDate) {
        const year = new Date(entry.endDate).getFullYear();
        if (!Number.isNaN(year)) parts.push(`(${year})`);
      }
      return parts.join(" - ");
    })
    .filter(Boolean)
    .join(", ")
    .toLocaleLowerCase();
}

function compareStrings(a: string, b: string, direction: "asc" | "desc"): number {
  const cmp = a.localeCompare(b, undefined, { sensitivity: "base" });
  return direction === "asc" ? cmp : -cmp;
}

export function sortStudentRows<T extends StudentSortableRow>(
  rows: T[],
  sortOption: StudentSortOption
): T[] {
  if (!sortOption) return rows;

  const direction: "asc" | "desc" = sortOption.endsWith("-desc") ? "desc" : "asc";
  const sorted = [...rows];

  sorted.sort((left, right) => {
    if (sortOption.startsWith("name-")) {
      return compareStrings(
        normalizeStudentName(left.name),
        normalizeStudentName(right.name),
        direction
      );
    }
    if (sortOption.startsWith("skills-")) {
      const leftKey = normalizeStudentSkills(left.skills);
      const rightKey = normalizeStudentSkills(right.skills);
      if (!leftKey && !rightKey) return 0;
      if (!leftKey) return 1;
      if (!rightKey) return -1;
      return compareStrings(leftKey, rightKey, direction);
    }
    return 0;
  });

  return sorted;
}

export function sortOptionToApiSortBy(sortOption: StudentSortOption): string {
  switch (sortOption) {
    case "name-asc":
      return "name:asc";
    case "name-desc":
      return "name:desc";
    case "skills-asc":
      return "skills:asc";
    case "skills-desc":
      return "skills:desc";
    default:
      return DEFAULT_STUDENT_SORT_API;
  }
}

/** Map Students table column ids to the Evaluation-style exclusive sort columns. */
export function studentHeaderSortColumn(columnId: string): StudentSortColumn | null {
  if (columnId === "studentInfo") return "name";
  if (columnId === "skills") return "skills";
  return null;
}

/** Neutral → ascending → descending → neutral, matching react-table useSortBy. */
export function nextStudentColumnSort(
  current: StudentSortOption,
  column: StudentSortColumn
): StudentSortOption {
  const asc = `${column}-asc` as StudentSortOption;
  const desc = `${column}-desc` as StudentSortOption;
  if (current === asc) return desc;
  if (current === desc) return "";
  return asc;
}

export function studentColumnAriaSort(
  current: StudentSortOption,
  column: StudentSortColumn
): "none" | "ascending" | "descending" {
  if (current === `${column}-asc`) return "ascending";
  if (current === `${column}-desc`) return "descending";
  return "none";
}

export function studentColumnSortFlags(
  current: StudentSortOption,
  column: StudentSortColumn
): { isSorted: boolean; isSortedDesc: boolean } {
  return {
    isSorted: current === `${column}-asc` || current === `${column}-desc`,
    isSortedDesc: current === `${column}-desc`,
  };
}

export function studentSortButtonAriaLabel(
  column: StudentSortColumn,
  current: StudentSortOption
): string {
  const name = column === "name" ? "name" : "skills";
  const state = studentColumnAriaSort(current, column);
  if (state === "ascending") return `Sort by ${name}, currently ascending`;
  if (state === "descending") return `Sort by ${name}, currently descending`;
  return `Sort by ${name}`;
}
