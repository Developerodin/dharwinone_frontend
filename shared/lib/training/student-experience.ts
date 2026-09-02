export interface StudentExperienceEntry {
  startDate?: string | Date | null
  endDate?: string | Date | null
  isCurrent?: boolean
}

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000

/**
 * Sum work-experience years across roles. Current roles use `endDate ?? now`.
 */
export function calculateStudentExperienceYears(
  experience: StudentExperienceEntry[] | null | undefined,
  now: Date = new Date()
): number {
  if (!experience?.length) return 0

  let total = 0
  for (const exp of experience) {
    if (!exp.startDate) continue

    const start = new Date(exp.startDate)
    if (Number.isNaN(start.getTime())) continue

    const end = exp.isCurrent
      ? new Date(exp.endDate ?? now)
      : exp.endDate
        ? new Date(exp.endDate)
        : null
    if (!end || Number.isNaN(end.getTime())) continue

    total += Math.max(0, (end.getTime() - start.getTime()) / MS_PER_YEAR)
  }

  return Math.round(total)
}
