import type { ProjectFormValues } from "@/shared/components/forms/DynamicProjectForm";
import type { SelectOption } from "@/shared/data/apps/projects/projectFormConfig";

/** Lives beside the page rather than inside it: Next forbids extra named exports from a page file. */

export const MONGO_ID_REGEX = /^[0-9a-fA-F]{24}$/;

/** Ids the API will reject. Selections that land here would be silently dropped from the payload. */
function invalidIds(opts: SelectOption[] | undefined): string[] {
  return (opts ?? [])
    .map((o) => (o?.value != null ? String(o.value) : ""))
    .filter((id) => !MONGO_ID_REGEX.test(id));
}

/** Every problem at once — one pass, so fixing one error does not reveal the next. */
export function validateProjectForm(values: ProjectFormValues): Record<string, string> {
  const next: Record<string, string> = {};
  if (!String(values.name ?? "").trim()) next.name = "Project name is required";

  const toDate = (v: unknown): Date | null =>
    v instanceof Date ? v : v ? new Date(v as string) : null;
  const start = toDate(values.startDate);
  const end = toDate(values.endDate);
  if (start && end && !Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && end < start) {
    next.endDate = "End date must be on or after the start date.";
  }

  // Without this the ids are stripped in buildPayload and the project saves with no team.
  const badTeams = invalidIds(values.assignedTeams as SelectOption[] | undefined);
  if (badTeams.length) {
    next.assignedTeams = `${badTeams.length} selected team(s) cannot be saved. Remove and re-pick them.`;
  }
  const badUsers = invalidIds(values.assignedUsers as SelectOption[] | undefined);
  if (badUsers.length) {
    next.assignedUsers = `${badUsers.length} selected person/people cannot be saved. Remove and re-pick them.`;
  }
  return next;
}
