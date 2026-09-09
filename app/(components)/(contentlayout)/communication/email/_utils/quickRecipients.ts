export type QuickRecipient = { email: string };

/**
 * localStorage is a trust boundary: the value survives app versions, can be hand
 * edited, and is shared with whatever an older build wrote. An entry without a
 * usable `email` string reached `r.email.match(...)` in render and white-screened
 * the whole route until the user cleared site data, so parse defensively.
 *
 * Bare strings are accepted because that is the cheapest way to not silently drop
 * a user's saved contacts if an older build ever stored them unwrapped.
 */
export function parseQuickRecipients(raw: string | null): QuickRecipient[] {
  if (!raw) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const seen = new Set<string>();
  const out: QuickRecipient[] = [];
  for (const entry of parsed) {
    const email =
      typeof entry === "string"
        ? entry
        : entry && typeof entry === "object" && typeof (entry as QuickRecipient).email === "string"
          ? (entry as QuickRecipient).email
          : "";
    const trimmed = email.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ email: trimmed });
  }
  return out;
}
