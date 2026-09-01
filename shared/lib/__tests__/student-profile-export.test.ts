import * as XLSX from "xlsx";
import { describe, expect, it } from "vitest";
import type { Student } from "@/shared/lib/api/students";
import { buildStudentProfileWorkbook } from "../student-profile-export";

const baseStudent: Student = {
  id: "s1",
  user: {
    id: "u1",
    name: "Alex Thompson",
    email: "alex@example.com",
    role: "Student",
    roleIds: [],
    status: "active",
    isEmailVerified: true,
  },
  status: "active",
  skills: ["React", "TypeScript"],
  education: [
    {
      degree: "BS",
      institution: "Stanford",
      startDate: "2014-09-01",
      endDate: "2018-06-01",
    },
  ],
  experience: [
    {
      title: "Developer",
      company: "Acme",
      startDate: "2018-07-01",
      endDate: "2020-01-01",
    },
  ],
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

function getCell(ws: XLSX.WorkSheet, row: number, col: number) {
  return ws[XLSX.utils.encode_cell({ r: row, c: col })];
}

function findProfileValue(ws: XLSX.WorkSheet, fieldLabel: string) {
  for (let row = 3; row < 30; row += 1) {
    const labelCell = getCell(ws, row, 0);
    if (labelCell?.v === fieldLabel) {
      return getCell(ws, row, 1);
    }
  }
  return undefined;
}

describe("student-profile-export", () => {
  it("builds Profile plus optional Education and Experience sheets", () => {
    const wb = buildStudentProfileWorkbook(baseStudent);
    expect(wb.SheetNames).toEqual(["Profile", "Education", "Experience"]);
  });

  it("includes only Profile when education and experience are empty", () => {
    const wb = buildStudentProfileWorkbook({
      ...baseStudent,
      education: [],
      experience: [],
    });
    expect(wb.SheetNames).toEqual(["Profile"]);
  });

  it("places the title on row 1 and headers on row 3", () => {
    const ws = buildStudentProfileWorkbook(baseStudent).Sheets.Profile;
    expect(getCell(ws, 0, 0)?.v).toBe("Student Details");
    expect(getCell(ws, 2, 0)?.v).toBe("Field");
    expect(getCell(ws, 2, 1)?.v).toBe("Value");
    expect(getCell(ws, 3, 0)?.v).toBe("Name");
  });

  it("renders empty fields as blank", () => {
    const ws = buildStudentProfileWorkbook({
      ...baseStudent,
      phone: null,
      bio: null,
      gender: undefined,
    }).Sheets.Profile;

    expect(findProfileValue(ws, "Phone")?.v).toBe("");
    expect(findProfileValue(ws, "Bio")?.v).toBe("");
    expect(findProfileValue(ws, "Gender")?.v).toBe("");
  });

  it("formats skills as comma-separated text", () => {
    const ws = buildStudentProfileWorkbook(baseStudent).Sheets.Profile;
    expect(findProfileValue(ws, "Skills")?.v).toBe("React, TypeScript");
  });

  it("formats date-only fields as Excel dates without day shift", () => {
    const ws = buildStudentProfileWorkbook({
      ...baseStudent,
      dateOfBirth: "1995-03-20",
      joiningDate: "2020-06-15",
    }).Sheets.Profile;

    const dob = findProfileValue(ws, "Date of Birth");
    const joining = findProfileValue(ws, "Joining Date");

    expect(dob?.t).toBe("d");
    expect(dob?.v).toBeInstanceOf(Date);
    expect((dob?.v as Date).getFullYear()).toBe(1995);
    expect((dob?.v as Date).getMonth()).toBe(2);
    expect((dob?.v as Date).getDate()).toBe(20);

    expect(joining?.t).toBe("d");
    expect(joining?.v).toBeInstanceOf(Date);
    expect((joining?.v as Date).getFullYear()).toBe(2020);
    expect((joining?.v as Date).getMonth()).toBe(5);
    expect((joining?.v as Date).getDate()).toBe(15);
  });

  it("does not emit null or undefined strings", () => {
    const ws = buildStudentProfileWorkbook({
      ...baseStudent,
      phone: null,
      bio: null,
      gender: undefined,
      address: { city: null, state: undefined, country: null },
    }).Sheets.Profile;

    for (const key of Object.keys(ws)) {
      if (key.startsWith("!")) continue;
      const value = ws[key]?.v;
      if (value === undefined || value === null) continue;
      expect(String(value)).not.toMatch(/^(null|undefined)$/);
    }
  });

  it("strips HTML from bio text", () => {
    const ws = buildStudentProfileWorkbook({
      ...baseStudent,
      bio: "<p>Experienced <strong>developer</strong></p>",
    }).Sheets.Profile;

    expect(findProfileValue(ws, "Bio")?.v).toBe("Experienced developer");
  });

  it("applies professional sheet metadata on Profile", () => {
    const ws = buildStudentProfileWorkbook(baseStudent).Sheets.Profile;

    expect(ws["!cols"]).toEqual([{ wch: 22 }, { wch: 48 }]);
    expect(ws["!autofilter"]?.ref).toBe("A3:B18");
    expect(ws["!sheetViews"]?.[0]?.showGridLines).toBe(false);
    expect(ws["!sheetViews"]?.[0]?.ySplit).toBe(3);
    expect(ws["!rows"]?.[16]?.hpt).toBe(72);
  });
});
