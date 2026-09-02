import type { Role } from "@/shared/lib/types";

/**
 * TEMPORARY, DISPLAY-ONLY Student-role gate.
 *
 * Business rule: a user is a Student only when their `User.roleIds` contains the
 * Student role. The Student document's own `status` is NOT the source of truth.
 * The backend still returns every Student profile, so this trims what the
 * Students UI shows until server-side enforcement lands.
 *
 * Nothing here mutates or deletes data — it filters an already-fetched list.
 */

/** Role.name of the Student RBAC role. Backend matches it case-insensitively. */
export const STUDENT_ROLE_NAME = "student";

/**
 * Upper bound on the single fetch that backs client-side pagination.
 * Mirrors the backend's own export cap (EXPORT_MAX_ROWS = 10000).
 *
 * ponytail: fetch-all + filter locally is only viable while the Student
 * population fits one response. Past ~10k rows the fix is the backend role
 * filter (buildStudentMongoFilter), not a bigger limit here.
 */
export const STUDENT_FETCH_ALL_LIMIT = 10000;

/** Minimum shape needed to decide whether a Student row's user is a Student. */
export interface StudentRoleCandidate {
  user?: { roleIds?: string[] | null } | null;
}

/**
 * Resolve the Student role's id from a roles list.
 * @returns the role id, or null when no Student role exists in the list.
 */
export function findStudentRoleId(roles: Role[] | null | undefined): string | null {
  if (!roles?.length) return null;
  const match = roles.find((role) => role?.name?.trim().toLowerCase() === STUDENT_ROLE_NAME);
  return match?.id ?? null;
}

/**
 * True when the linked user carries the Student role.
 * Users holding Student plus any other role still qualify.
 */
export function hasStudentRole(student: StudentRoleCandidate, studentRoleId: string): boolean {
  const roleIds = student?.user?.roleIds;
  if (!Array.isArray(roleIds)) return false;
  return roleIds.some((id) => String(id) === studentRoleId);
}

/**
 * Keep only students whose linked user has the Student role.
 * A null `studentRoleId` means the role could not be resolved — the list is
 * returned unfiltered (fail open) so the page stays usable, and the caller is
 * expected to surface that with a notice.
 */
export function filterStudentsByRole<T extends StudentRoleCandidate>(
  students: T[],
  studentRoleId: string | null
): T[] {
  if (!studentRoleId) return students;
  return students.filter((student) => hasStudentRole(student, studentRoleId));
}
