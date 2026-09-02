import type { Student, StudentEducation, StudentUser } from "@/shared/lib/api/students";
import { calculateStudentExperienceYears } from "@/shared/lib/training/student-experience";

export const MISSING_PROFILE_VALUE = "Not provided";

export interface StudentListRow {
  id: string;
  name: string;
  displayPicture: string;
  hasProfileImage: boolean;
  phone: string;
  email: string;
  skills: string[];
  education: string;
  experience: number;
  bio: string;
}

type SkillLike = string | { name?: unknown } | null | undefined;

type EducationLike = StudentEducation & {
  institute?: string;
  university?: string;
  school?: string;
};

type StudentListSource = Student & {
  shortBio?: string | null;
  user?: StudentUser & { phoneNumber?: string | null };
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeStudentSkillNames(skills: unknown): string[] {
  if (!Array.isArray(skills)) return [];
  const names: string[] = [];
  const seen = new Set<string>();
  for (const skill of skills as SkillLike[]) {
    const name =
      typeof skill === "string"
        ? skill.trim()
        : skill && typeof skill === "object"
          ? asTrimmedString(skill.name)
          : "";
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    names.push(name);
  }
  return names;
}

function educationVenue(edu: EducationLike | null | undefined): string {
  return (
    asTrimmedString(edu?.institution) ||
    asTrimmedString(edu?.institute) ||
    asTrimmedString(edu?.university) ||
    asTrimmedString(edu?.school)
  );
}

export function formatStudentEducation(education: unknown): string {
  if (!Array.isArray(education) || education.length === 0) return "";
  return education
    .map((entry) => {
      const edu = (entry ?? {}) as EducationLike;
      const parts: string[] = [];
      const degree = asTrimmedString(edu.degree);
      const venue = educationVenue(edu);
      if (degree) parts.push(degree);
      if (venue) parts.push(venue);
      if (edu.endDate) {
        const year = new Date(edu.endDate).getFullYear();
        if (!Number.isNaN(year)) parts.push(`(${year})`);
      }
      return parts.join(" - ");
    })
    .filter(Boolean)
    .join(", ");
}

export function mapStudentToRow(student: StudentListSource): StudentListRow {
  const phone =
    asTrimmedString(student.phone) || asTrimmedString(student.user?.phoneNumber);
  const bio = asTrimmedString(student.bio) || asTrimmedString(student.shortBio);

  return {
    id: student.id,
    name: student.user?.name || "Unknown",
    displayPicture: student.profileImageUrl || "",
    hasProfileImage: Boolean(student.profileImageUrl),
    phone,
    email: student.user?.email || "",
    skills: normalizeStudentSkillNames(student.skills),
    education: formatStudentEducation(student.education),
    experience: Math.round(calculateStudentExperienceYears(student.experience)),
    bio,
  };
}
