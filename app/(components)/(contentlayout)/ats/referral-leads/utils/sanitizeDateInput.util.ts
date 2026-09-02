import { formatYmdLocal, parseYmdLocal } from "@/shared/lib/leave-date-range";

/** True when value is YYYY-MM-DD with a real calendar date (4-digit year, valid month/day). */
export function isValidYmdLocal(value: string): boolean {
  const trimmed = value.trim();
  const parsed = parseYmdLocal(trimmed);
  if (!parsed || Number.isNaN(parsed.getTime())) return false;
  return formatYmdLocal(parsed) === trimmed;
}

/**
 * Sanitize referral-lead custom date filter values.
 * Native `<input type="date">` was abandoned here: Chromium keeps its own edit buffer
 * while focused, so ref/DOM value reverts cannot block 5+ digit years during typing.
 */
export function sanitizeReferralLeadsDateInput(raw: string): string | null {
  const value = raw.trim();
  if (!value) return "";
  if (!isValidYmdLocal(value)) return null;
  return value;
}

export const REFERRAL_LEADS_INVALID_DATE_RANGE_MESSAGE = "From date must be on or before To date";

/** True when both ends are set and From is after To. */
export function isReferralLeadsDateRangeInvalid(from: string, to: string): boolean {
  if (!from.trim() || !to.trim()) return false;
  const fromDate = parseYmdLocal(from.trim());
  const toDate = parseYmdLocal(to.trim());
  if (!fromDate || !toDate) return false;
  return fromDate.getTime() > toDate.getTime();
}

export function getReferralLeadsDateRangeError(from: string, to: string): string | null {
  return isReferralLeadsDateRangeInvalid(from, to) ? REFERRAL_LEADS_INVALID_DATE_RANGE_MESSAGE : null;
}
