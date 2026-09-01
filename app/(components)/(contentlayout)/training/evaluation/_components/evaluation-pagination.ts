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
