/** Build a shareable students-list URL that opens the view modal for one student. */
export function buildStudentProfileShareUrl(studentId: string, baseHref: string): string {
  const url = new URL(baseHref)
  url.searchParams.set('view', studentId)
  return url.toString()
}
