/** Shared timezone utilities for the ATS Interview module. */
import { format } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

const LEGACY_ALIASES: Record<string, string> = {
  'Asia/Calcutta': 'Asia/Kolkata',
};

/** Canonical IANA zone, or "UTC" for empty/invalid input. */
export function normalizeTimezone(tz?: string | null): string {
  if (!tz || !tz.trim()) return 'UTC';
  const trimmed = tz.trim();
  return LEGACY_ALIASES[trimmed] || trimmed;
}

/** The viewer's browser timezone. */
export function getViewerTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

/**
 * Convert a wall-clock value entered in `tz` into a UTC instant.
 */
export function wallClockToUtc(dateStr: string, timeStr: string, tz: string): Date {
  return fromZonedTime(`${dateStr} ${timeStr}`, normalizeTimezone(tz));
}

/** Split a UTC instant into date/time strings as shown in `tz`. */
export function utcInstantToWallClock(
  instant: string | number | Date,
  tz: string
): { date: string; time: string } {
  const zoned = toZonedTime(instant instanceof Date ? instant : new Date(instant), normalizeTimezone(tz));
  return { date: format(zoned, 'yyyy-MM-dd'), time: format(zoned, 'HH:mm') };
}

/**
 * Local calendar date as YYYY-MM-DD. toISOString() would UTC-shift and misfile
 * rows by a day for any positive-offset timezone (e.g. IST) — avoid it here.
 * Pair with `utcInstantToWallClock(instant, viewerTz).date` so a calendar grid's
 * column keys and its row keys share one timezone interpretation.
 */
export function localDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * The row-side partner of `localDateKey`: an instant's calendar date in `tz`
 * as YYYY-MM-DD. Defaults to the viewer's zone so a calendar grid's rows and
 * columns share one timezone interpretation. Returns "" for a bad instant/zone.
 */
export function wallClockDateKey(instant: string | number | Date, tz?: string): string {
  try {
    return utcInstantToWallClock(instant, tz || getViewerTimezone()).date;
  } catch {
    return '';
  }
}

const formatterCache = new Map<string, Intl.DateTimeFormat>();
function getFormatter(timeZone: string, locale = 'en-GB'): Intl.DateTimeFormat {
  const key = `${locale}|${timeZone}`;
  let f = formatterCache.get(key);
  if (!f) {
    f = new Intl.DateTimeFormat(locale, {
      timeZone,
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    });
    formatterCache.set(key, f);
  }
  return f;
}

const dateFormatterCache = new Map<string, Intl.DateTimeFormat>();

/**
 * Calendar date of an instant rendered in `tz`, e.g. "Aug 19, 2026".
 * Formats straight off the instant — never re-parse a YYYY-MM-DD key with
 * `new Date(key)`, which reads as UTC midnight and shifts the label.
 */
export function formatDateInZone(
  instant: string | number | Date,
  tz: string,
  withYear = true
): string {
  const date = instant instanceof Date ? instant : new Date(instant);
  if (Number.isNaN(date.getTime())) return '—';
  const timeZone = normalizeTimezone(tz);
  // Cached like getFormatter: constructing Intl.DateTimeFormat is the expensive
  // part, and table rows call this twice each on every memo recompute.
  const key = `${timeZone}|${withYear}`;
  let f = dateFormatterCache.get(key);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone,
      month: 'short',
      day: 'numeric',
      ...(withYear ? { year: 'numeric' as const } : {}),
    });
    dateFormatterCache.set(key, f);
  }
  return f.format(date);
}

/** Render a UTC instant in a zone, e.g. "20 May 2026, 04:30 pm UTC". */
export function formatInZone(instant: string | number | Date, tz: string): string {
  const date = instant instanceof Date ? instant : new Date(instant);
  if (Number.isNaN(date.getTime())) return '—'; // missing/malformed instant; Intl.format would throw RangeError
  return getFormatter(normalizeTimezone(tz)).format(date);
}

/**
 * Render an instant as "meeting-zone (viewer-zone)". Pass `viewerTz` only after
 * mount — on the server pass undefined so SSR output stays deterministic.
 */
export function formatDualZone(
  instant: string | number | Date,
  meetingTz: string,
  viewerTz?: string
): string {
  const primary = formatInZone(instant, meetingTz);
  if (primary === '—') return primary; // invalid instant; don't render "— (—)"
  if (!viewerTz) return primary;
  if (normalizeTimezone(viewerTz) === normalizeTimezone(meetingTz)) return primary;
  return `${primary} (${formatInZone(instant, viewerTz)})`;
}

/** Common zones pinned to the top of the picker. */
export const COMMON_TIMEZONES: string[] = [
  'UTC',
  'Asia/Kolkata',
  'America/New_York',
  'America/Chicago',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Singapore',
  'Asia/Dubai',
  'Australia/Sydney',
];

const FALLBACK_ZONES: string[] = [
  ...COMMON_TIMEZONES,
  'America/Sao_Paulo',
  'Europe/Paris',
  'Europe/Madrid',
  'Europe/Moscow',
  'Africa/Johannesburg',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Hong_Kong',
  'Asia/Karachi',
  'Pacific/Auckland',
];

/** Full IANA zone list, common zones first. */
export function listTimezones(): string[] {
  let all: string[];
  try {
    const supported = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf;
    all = supported ? supported('timeZone') : FALLBACK_ZONES;
  } catch {
    all = FALLBACK_ZONES;
  }
  const rest = all.filter((z) => !COMMON_TIMEZONES.includes(z)).sort();
  return [...COMMON_TIMEZONES, ...rest];
}

/**
 * UTC offset label for a zone at a given instant, e.g. "UTC +05:30".
 * Offset is computed for `at` so future-dated interviews render the offset
 * that will apply on that date (correct across DST boundaries).
 */
export function getZoneOffsetLabel(tz: string, at: Date = new Date()): string {
  const zone = normalizeTimezone(tz);
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      timeZoneName: 'shortOffset',
    }).formatToParts(at);
    const raw = parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
    const m = raw.match(/([+-])(\d{1,2})(?::?(\d{2}))?/);
    if (!m) return 'UTC +00:00';
    const sign = m[1];
    const hh = m[2].padStart(2, '0');
    const mm = m[3] ?? '00';
    return `UTC ${sign}${hh}:${mm}`;
  } catch {
    return 'UTC +00:00';
  }
}

/** Combined zone label, e.g. "Asia/Kolkata · UTC +05:30". */
export function formatZoneLabel(tz: string, at: Date = new Date()): string {
  return `${normalizeTimezone(tz)} · ${getZoneOffsetLabel(tz, at)}`;
}

/** Short zone name for schedule labels, e.g. "IST" or "GMT+5:30". */
export function getZoneAbbreviation(tz: string, at: Date = new Date()): string {
  const zone = normalizeTimezone(tz);
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      timeZoneName: 'short',
    }).formatToParts(at);
    return parts.find((p) => p.type === 'timeZoneName')?.value ?? zone;
  } catch {
    return zone;
  }
}
