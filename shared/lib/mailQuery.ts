// Builds the provider query string for mailbox search.
// Plain typed text is scoped to sender + subject (no body-text noise).
// Anything already using an operator (is:unread, from:x, has:attachment, …)
// is passed through verbatim. Works for both Gmail search and Outlook $search KQL,
// which share from:/subject:/quoted-phrase syntax.
// ponytail: single-word/phrase scope; advanced boolean queries the user types
// with an operator pass through raw. Upgrade to a real query parser only if
// users need mixed free-text + operators in one box.
//
// An operator is a bare word immediately followed by ":" and a non-space value,
// at the start of a token. Anything else containing a colon is ordinary text:
// "3:30 standup" (digits before the colon), "Re: budget" (space after it) and
// "https://x" (URL scheme, excluded by the "//" guard) must all stay scoped
// searches — passing those through raw made the provider return nothing.
const OPERATOR_TOKEN = /(^|\s)-?[a-z_]+:(?!\/\/)\S/i;

export function buildMailQuery(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (OPERATOR_TOKEN.test(t)) return t; // advanced operator query — leave untouched
  const safe = t.replace(/"/g, "");
  return `from:"${safe}" OR subject:"${safe}"`;
}
