import { describe, expect, it } from "vitest";
import type { Role } from "@/shared/lib/types";
import {
  STUDENT_FETCH_ALL_LIMIT,
  filterStudentsByRole,
  findStudentRoleId,
  hasStudentRole,
} from "@/shared/lib/training/student-role-filter";

const STUDENT_ROLE = "role-student";
const EMPLOYEE_ROLE = "role-employee";
const CANDIDATE_ROLE = "role-candidate";
const ADMIN_ROLE = "role-admin";

const role = (id: string, name: string): Role => ({ id, name, permissions: [] });

const student = (id: string, roleIds: string[] | null | undefined) => ({
  id,
  user: roleIds === undefined ? undefined : roleIds === null ? null : { roleIds },
});

describe("findStudentRoleId", () => {
  it("finds the Student role by name", () => {
    const roles = [role(EMPLOYEE_ROLE, "Employee"), role(STUDENT_ROLE, "Student")];
    expect(findStudentRoleId(roles)).toBe(STUDENT_ROLE);
  });

  it("matches the role name case-insensitively and ignores padding", () => {
    expect(findStudentRoleId([role(STUDENT_ROLE, "  student  ")])).toBe(STUDENT_ROLE);
  });

  it("returns null when no Student role exists", () => {
    expect(findStudentRoleId([role(ADMIN_ROLE, "Administrator")])).toBeNull();
    expect(findStudentRoleId([])).toBeNull();
    expect(findStudentRoleId(undefined)).toBeNull();
  });
});

describe("hasStudentRole", () => {
  it("accepts a user holding only the Student role", () => {
    expect(hasStudentRole(student("s1", [STUDENT_ROLE]), STUDENT_ROLE)).toBe(true);
  });

  it("accepts dual-role users", () => {
    expect(hasStudentRole(student("s2", [STUDENT_ROLE, EMPLOYEE_ROLE]), STUDENT_ROLE)).toBe(true);
    expect(hasStudentRole(student("s3", [CANDIDATE_ROLE, STUDENT_ROLE]), STUDENT_ROLE)).toBe(true);
    expect(hasStudentRole(student("s4", [ADMIN_ROLE, STUDENT_ROLE]), STUDENT_ROLE)).toBe(true);
  });

  it("rejects users without the Student role", () => {
    expect(hasStudentRole(student("s5", [EMPLOYEE_ROLE]), STUDENT_ROLE)).toBe(false);
    expect(hasStudentRole(student("s6", [CANDIDATE_ROLE]), STUDENT_ROLE)).toBe(false);
    expect(hasStudentRole(student("s7", [ADMIN_ROLE]), STUDENT_ROLE)).toBe(false);
    expect(hasStudentRole(student("s8", []), STUDENT_ROLE)).toBe(false);
  });

  it("rejects rows with a missing or unpopulated user", () => {
    expect(hasStudentRole(student("s9", null), STUDENT_ROLE)).toBe(false);
    expect(hasStudentRole(student("s10", undefined), STUDENT_ROLE)).toBe(false);
    expect(hasStudentRole({ user: { roleIds: null } }, STUDENT_ROLE)).toBe(false);
  });
});

describe("filterStudentsByRole", () => {
  const students = [
    student("student-only", [STUDENT_ROLE]),
    student("student-employee", [STUDENT_ROLE, EMPLOYEE_ROLE]),
    student("student-candidate", [CANDIDATE_ROLE, STUDENT_ROLE]),
    student("employee-only", [EMPLOYEE_ROLE]),
    student("candidate-only", [CANDIDATE_ROLE]),
    student("admin-only", [ADMIN_ROLE]),
    student("no-roles", []),
    student("no-user", null),
  ];

  it("keeps only Student-role users, dual roles included", () => {
    const kept = filterStudentsByRole(students, STUDENT_ROLE).map((s) => s.id);
    expect(kept).toEqual(["student-only", "student-employee", "student-candidate"]);
  });

  it("does not consider the Student document's own status", () => {
    // An "active" profile whose user lacks the Student role is still excluded.
    const rows = [
      { id: "active-but-not-student", status: "active", user: { roleIds: [EMPLOYEE_ROLE] } },
      { id: "inactive-but-student", status: "inactive", user: { roleIds: [STUDENT_ROLE] } },
    ];
    expect(filterStudentsByRole(rows, STUDENT_ROLE).map((r) => r.id)).toEqual([
      "inactive-but-student",
    ]);
  });

  it("preserves the incoming order so server-side sorting still holds", () => {
    const reversed = [...students].reverse();
    expect(filterStudentsByRole(reversed, STUDENT_ROLE).map((s) => s.id)).toEqual([
      "student-candidate",
      "student-employee",
      "student-only",
    ]);
  });

  it("fails open when the Student role id could not be resolved", () => {
    expect(filterStudentsByRole(students, null)).toBe(students);
  });

  it("returns an empty list unchanged", () => {
    expect(filterStudentsByRole([], STUDENT_ROLE)).toEqual([]);
  });
});

describe("STUDENT_FETCH_ALL_LIMIT", () => {
  it("matches the backend export cap", () => {
    expect(STUDENT_FETCH_ALL_LIMIT).toBe(10000);
  });
});
