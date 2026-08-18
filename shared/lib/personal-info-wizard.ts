import type { Mode, Role } from "@/shared/workforce-profile/types/wizard.types";

/**
 * Personal Information wizard feature flag.
 *
 * `NEXT_PUBLIC_ENABLE_PERSONAL_INFO_WIZARD=true` -> the wizard is the Personal
 * Information experience. Anything else (missing, "1", "TRUE", empty) -> the
 * existing/legacy Personal Information implementation, which stays the safe
 * default so an unset variable can never enable the wizard in production.
 *
 * The `NEXT_PUBLIC_` prefix is required: this is read from client components and
 * Next.js only inlines literal `process.env.NEXT_PUBLIC_*` reads into the browser
 * bundle (a dynamic `process.env[key]` lookup resolves to `undefined` there).
 */
export function isPersonalInfoWizardEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_PERSONAL_INFO_WIZARD === "true";
}

/**
 * Employee and Candidate are distinct user roles, so they get distinct
 * self-service wizard flows (different steps, different payload shape):
 *
 *   Employee  -> "self-service-employee"  (adds Salary Slips + Account Setting)
 *   Candidate -> "self-service-candidate"
 *
 * A user holding both roles resolves to Employee, matching the legacy behaviour
 * of the page this flag guards.
 */
export function resolveSelfServiceWizardTarget(
  roleNames: readonly string[] | null | undefined,
): { mode: Mode; role: Role } {
  const names = (roleNames ?? [])
    .map((n) => (typeof n === "string" ? n.trim().toLowerCase() : ""))
    .filter(Boolean);

  const isCandidateOnly =
    names.includes("candidate") && !names.includes("employee");

  return isCandidateOnly
    ? { mode: "self-service-candidate", role: "candidate" }
    : { mode: "self-service-employee", role: "employee" };
}
