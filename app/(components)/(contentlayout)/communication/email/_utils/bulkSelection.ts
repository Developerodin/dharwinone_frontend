export type BulkScope = "selected" | "visible";

export type BulkTargets = {
  ids: string[];
  /** "selected" = the user ticked rows. "visible" = fall back to everything loaded. */
  scope: BulkScope;
};

/**
 * Decide which threads a bulk action applies to.
 *
 * The checkbox set is keyed by thread id and nothing ever pruned it, so ids
 * ticked in one folder survived into the next one. "Delete All" then trashed
 * threads the user could no longer see. Intersecting with what is currently
 * loaded makes stale ids inert without needing a reset effect to fire in the
 * right order against the async list load.
 *
 * With no usable selection the action falls back to everything loaded, which is
 * the historical behaviour - the caller must say so in its confirm prompt,
 * because "everything loaded" is 20 rows or 60 depending on how many times the
 * user pressed Load more.
 */
export function resolveBulkTargets(
  selectedIds: Iterable<string>,
  visibleIds: string[]
): BulkTargets {
  const visible = new Set(visibleIds);
  const stillVisible: string[] = [];
  const seen = new Set<string>();
  for (const id of selectedIds) {
    if (!visible.has(id) || seen.has(id)) continue;
    seen.add(id);
    stillVisible.push(id);
  }
  if (stillVisible.length > 0) return { ids: stillVisible, scope: "selected" };
  return { ids: visibleIds, scope: "visible" };
}
