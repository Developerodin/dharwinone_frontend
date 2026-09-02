/**
 * Moved to shared/lib/pagination-items.ts so other lists can use
 * the same page-window math. Re-exported here so existing imports keep working.
 */
export type { PaginationItem } from "@/shared/lib/pagination-items";
export { getPaginationRange, buildPaginationItems } from "@/shared/lib/pagination-items";
