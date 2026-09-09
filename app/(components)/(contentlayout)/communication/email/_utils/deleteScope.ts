/**
 * Folders where deleting means gone for good rather than moved.
 *
 * Both providers normalise their bin to TRASH (Outlook's `deleteditems` is
 * mapped server-side) and their junk folder to SPAM or JUNK, so one check covers
 * Gmail and Outlook alike.
 *
 * Deleting inside these used to call the move-to-trash endpoint again. A
 * provider accepts that for an already-trashed conversation and does nothing, so
 * the row was removed optimistically and "Moved to trash" reported, and the
 * conversation was still there on the next load.
 */
export function isPermanentDeleteFolderId(labelId: string): boolean {
  return labelId === "TRASH" || labelId === "SPAM" || labelId === "JUNK";
}
