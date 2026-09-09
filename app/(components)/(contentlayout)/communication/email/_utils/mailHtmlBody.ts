import { sanitizeRichHtml } from "@/shared/lib/sanitize-html";

/** Marker the sanitizer leaves on media whose source it withheld. */
const BLOCKED_MARKER = 'data-remote-image="blocked"';

/**
 * Sanitize a message body for display.
 *
 * Remote media is withheld by default. Opening a message otherwise announces the
 * open to whoever sent it - a tracking pixel reports the read time and the
 * reader's IP - which is why mail clients ask first. The caller opts in per
 * conversation once the reader says so.
 *
 * The withholding happens inside the sanitizer, on parsed nodes. Doing it with a
 * regex over the sanitized string did not work: attribute values keep their
 * spaces, "=" and ">", so a sender controlling `alt` could write
 * `alt="x src=y"` and carry the real src straight through.
 */
export function prepareMailBodyHtml(
  rawHtml: string | null | undefined,
  options: { loadRemoteImages?: boolean } = {}
): string {
  if (!rawHtml?.trim()) return "";
  return sanitizeRichHtml(rawHtml, { blockRemoteMedia: !options.loadRemoteImages });
}

/** True when a prepared body had at least one remote source withheld. */
export function htmlHasBlockedImages(preparedHtml: string): boolean {
  return preparedHtml.includes(BLOCKED_MARKER);
}
