/**
 * Which folder you are in changes what an action means.
 *
 * Both providers normalise their bin to TRASH (Outlook's `deleteditems` is
 * mapped server-side) and their junk folder to SPAM on Gmail or JUNK on Outlook,
 * so these checks cover both. Matching is exact, so a user label merely named
 * like a system folder is never treated as destructive.
 */

/** Gmail calls it Spam, Outlook calls it Junk. */
export function isSpamFolderId(labelId: string): boolean {
  return labelId === "SPAM" || labelId === "JUNK";
}

/**
 * Folders where deleting means gone for good rather than moved.
 *
 * Deleting inside these used to call the move-to-trash endpoint again. A
 * provider accepts that for an already-trashed conversation and does nothing, so
 * the row was removed optimistically and "Moved to trash" reported, and the
 * conversation was still there on the next load.
 */
export function isPermanentDeleteFolderId(labelId: string): boolean {
  return labelId === "TRASH" || isSpamFolderId(labelId);
}
