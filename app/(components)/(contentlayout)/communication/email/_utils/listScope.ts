/**
 * Turn the selected folder into the labelId + query the list request needs.
 *
 * Almost every folder is a label id the provider already knows. Two are not:
 *
 * - "ALL" is our own name for "no filter at all".
 * - "ARCHIVE" is a real Outlook folder, but Gmail has no archive folder. Mail is
 *   archived there by dropping the INBOX label, so archived mail is whatever is
 *   left in All Mail once the inbox, the bin, spam and the user's own outgoing
 *   mail are taken out. The sidebar used to point its "Archive" entry at
 *   CATEGORY_PERSONAL - the Personal inbox category - which is a different set
 *   of mail entirely, so archiving a conversation never made it appear there.
 */
export const ARCHIVE_LABEL_ID = "ARCHIVE";

/**
 * Gmail matches per message and returns the whole thread, so a conversation
 * with one archived message and one still in the inbox shows in both places.
 * Gmail's own web client has no archive view to compare against; this is the
 * closest a thread-level list gets.
 */
const GMAIL_ARCHIVE_SCOPE = "-in:inbox -in:sent -in:draft -in:trash -in:spam -in:chats";

export function resolveListScope(
  provider: string,
  labelId: string,
  query: string
): { labelId?: string; q?: string } {
  const q = query.trim();
  if (provider === "gmail" && labelId === ARCHIVE_LABEL_ID) {
    return { labelId: undefined, q: q ? `(${q}) ${GMAIL_ARCHIVE_SCOPE}` : GMAIL_ARCHIVE_SCOPE };
  }
  return { labelId: labelId === "ALL" ? undefined : labelId, q: q || undefined };
}
