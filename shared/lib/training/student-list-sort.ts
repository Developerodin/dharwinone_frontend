export type StudentSortOption =
  | ""
  | "name-asc"
  | "name-desc"
  | "skills-asc"
  | "skills-desc"
  | "education-asc"
  | "education-desc";

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
  "education-asc",
  "education-desc",
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
      return compareStrings(
        normalizeStudentSkills(left.skills),
        normalizeStudentSkills(right.skills),
        direction
      );
    }
    if (sortOption.startsWith("education-")) {
      return compareStrings(
        normalizeStudentEducation(left.education),
        normalizeStudentEducation(right.education),
        direction
      );
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
    case "education-asc":
      return "education:asc";
    case "education-desc":
      return "education:desc";
    default:
      return DEFAULT_STUDENT_SORT_API;
  }
}
