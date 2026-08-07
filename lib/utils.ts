/** Lightweight className combiner for UI primitives (no external deps). */
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}
