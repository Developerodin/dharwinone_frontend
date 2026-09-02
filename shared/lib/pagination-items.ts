export type PaginationItem =
  | { type: "page"; page: number }
  | { type: "ellipsis" };

export function getPaginationRange(
  total: number,
  page: number,
  pageSize: number
): { start: number; end: number } {
  if (total === 0) return { start: 0, end: 0 };
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  return { start, end };
}

/**
 * A contiguous run of at most `size` page numbers that always contains `currentPage`.
 *
 * Note the indexing: this takes and returns **1-based** page numbers, unlike
 * `buildPaginationItems` below, which is 0-based. Its callers are 1-based UIs, and
 * converting at the boundary is the part that gets written wrong.
 *
 * The window slides rather than paging in fixed blocks, so the current page keeps
 * neighbours on both sides instead of landing on the edge of a block. It is clamped at
 * both ends: page 1 gives 1..size, the last page gives the final `size` pages, and the
 * count drops to `totalPages` when there are fewer pages than the window.
 *
 * Deliberately returns no first/last anchors and no ellipsis — that is what
 * `buildPaginationItems` is for. A caller using this has chosen a fixed-width strip, and
 * pairs it with a "go to page" input to reach anything outside the window.
 */
export function buildPageWindow(currentPage: number, totalPages: number, size = 5): number[] {
  if (totalPages <= 0 || size <= 0) return [];
  const count = Math.min(size, totalPages);
  const half = Math.floor(count / 2);
  // Upper clamp inside the lower one: when count === totalPages the upper bound is 1, and
  // a currentPage below 1 must still not produce a start of 0.
  const start = Math.max(1, Math.min(currentPage - half, totalPages - count + 1));
  return Array.from({ length: count }, (_, i) => start + i);
}

export function buildPaginationItems(pageIndex: number, pageCount: number): PaginationItem[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, page) => ({ type: "page" as const, page }));
  }

  const items: PaginationItem[] = [];
  const windowRadius = 2;
  const start = Math.max(0, pageIndex - windowRadius);
  const end = Math.min(pageCount - 1, pageIndex + windowRadius);

  if (start > 0) {
    items.push({ type: "page", page: 0 });
    if (start > 1) items.push({ type: "ellipsis" });
  }

  for (let page = start; page <= end; page += 1) {
    items.push({ type: "page", page });
  }

  if (end < pageCount - 1) {
    if (end < pageCount - 2) items.push({ type: "ellipsis" });
    items.push({ type: "page", page: pageCount - 1 });
  }

  return items;
}
