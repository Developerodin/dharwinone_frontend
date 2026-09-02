import { describe, expect, it } from "vitest";
import {
  MISSING_PROFILE_VALUE,
  formatStudentEducation,
  mapStudentToRow,
  normalizeStudentSkillNames,
} from "@/shared/lib/training/student-list-row";

const baseStudent = {
  id: "stu-1",
  user: { id: "u-1", name: "Alex Thompson", email: "alex@example.com" },
  status: "active",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

describe("normalizeStudentSkillNames", () => {
  it("keeps string skills", () => {
    expect(normalizeStudentSkillNames(["React", " Node.js ", ""])).toEqual(["React", "Node.js"]);
  });

  it("extracts names from object skills used on person profiles", () => {
    expect(
      normalizeStudentSkillNames([{ name: "Python", level: "Advanced" }, { name: " SQL " }])
    ).toEqual(["Python", "SQL"]);
  });

  it("returns empty when no usable skills exist", () => {
    expect(normalizeStudentSkillNames([{ level: "Beginner" }, "  ", null])).toEqual([]);
  });
});

describe("formatStudentEducation", () => {
  it("formats degree and institution", () => {
    expect(
      formatStudentEducation([
        { degree: "BS Computer Science", institution: "Stanford University", endDate: "2018-06-01" },
      ])
    ).toBe("BS Computer Science - Stanford University - (2018)");
  });

  it("reads institute when institution is missing", () => {
    expect(
      formatStudentEducation([{ degree: "MBA", institute: "Harvard Business School" }])
    ).toBe("MBA - Harvard Business School");
  });

  it("returns empty string when education has no usable fields", () => {
    expect(formatStudentEducation([{}, { description: "n/a" }])).toBe("");
  });
});

describe("mapStudentToRow", () => {
  it("maps skills, education, bio, and phone from the student document", () => {
    const row = mapStudentToRow({
      ...baseStudent,
      phone: "5551234567",
      skills: ["React", "Node.js", "TypeScript"],
      education: [{ degree: "BS Computer Science", institution: "Stanford University" }],
      bio: "Full-stack developer.",
      profileImageUrl: "https://cdn.example/alex.jpg",
    } as never);

    expect(row.phone).toBe("5551234567");
    expect(row.skills).toEqual(["React", "Node.js", "TypeScript"]);
    expect(row.education).toContain("Stanford University");
    expect(row.bio).toBe("Full-stack developer.");
  });

  it("shows object-shaped skills instead of dropping the column", () => {
    const row = mapStudentToRow({
      ...baseStudent,
      skills: [{ name: "Figma" }, { name: "User Research" }],
    } as never);

    expect(row.skills).toEqual(["Figma", "User Research"]);
  });

  it("uses account phone when student.phone is empty", () => {
    const row = mapStudentToRow({
      ...baseStudent,
      phone: "",
      user: { ...baseStudent.user, phoneNumber: "9876543210" },
    } as never);

    expect(row.phone).toBe("9876543210");
  });

  it("uses person shortBio when student bio is empty", () => {
    const row = mapStudentToRow({
      ...baseStudent,
      bio: "  ",
      shortBio: "Strategic product manager.",
    } as never);

    expect(row.bio).toBe("Strategic product manager.");
  });

  it("leaves blank fields empty so the table can show Not provided", () => {
    const row = mapStudentToRow(baseStudent as never);

    expect(row.phone).toBe("");
    expect(row.skills).toEqual([]);
    expect(row.education).toBe("");
    expect(row.bio).toBe("");
    expect(MISSING_PROFILE_VALUE).toBe("Not provided");
  });
});
