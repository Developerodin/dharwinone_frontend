import {
  EMPLOYEE_DESIGNATION_FALLBACK,
  resolveEmployeeDesignationForProfile,
  resolveEmployeeJobTitle,
  type EmployeeJobTitleSource,
} from "@/shared/lib/employee-job-title";
import { normalizeRoleNameForDisplay } from "@/shared/lib/user-role-display";

/** Show HRMS job title on self-profile only for Employee account role — not Candidate-only personas. */
export function shouldShowEmployeeDesignation(input: {
  roleNames?: string[] | null;
  permissionsLoaded?: boolean;
  roleDisplayName: string;
}): boolean {
  const { roleNames, permissionsLoaded, roleDisplayName } = input;
  if (permissionsLoaded && roleNames?.length) {
    return roleNames.some((n) => normalizeRoleNameForDisplay(n) === "Employee");
  }
  return roleDisplayName === "Employee" || roleDisplayName.includes("Employee");
}

export function getEmployeeProfileDesignationDisplay(
  source: EmployeeJobTitleSource | null | undefined
): string {
  return resolveEmployeeDesignationForProfile(source);
}

export {
  EMPLOYEE_DESIGNATION_FALLBACK,
  resolveEmployeeJobTitle,
  type EmployeeJobTitleSource,
};
