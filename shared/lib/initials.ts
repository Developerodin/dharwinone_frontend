/**
 * Derive 1-2 character initials from a display name (preferred) or email.
 */
export function getInitials(name?: string | null, email?: string | null): string {
  const trimmedName = (name ?? '').trim()
  if (trimmedName) {
    return (
      trimmedName
        .split(/\s+/)
        .map((part) => part[0] ?? '')
        .join('')
        .toUpperCase()
        .slice(0, 2) || '?'
    )
  }
  const trimmedEmail = (email ?? '').trim()
  if (trimmedEmail) {
    return trimmedEmail.slice(0, 2).toUpperCase()
  }
  return '?'
}
