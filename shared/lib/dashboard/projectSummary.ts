import type { Project } from "@/shared/lib/api/projects";

export const PROJECT_SUMMARY_PAGE_SIZE = 10;

export type ProjectSummarySort =
  | "name-asc"
  | "name-desc"
  | "dueDate-asc"
  | "dueDate-desc"
  | "progress-desc"
  | "progress-asc"
  | "status-asc"
  | "tasks-desc";

function projectProgressPct(p: Project): number {
  const total = p.totalTasks ?? 0;
  const completed = p.completedTasks ?? 0;
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

function parseProjectDueDate(p: Project): number {
  if (!p.endDate) return Number.POSITIVE_INFINITY;
  const t = new Date(p.endDate).getTime();
  return Number.isNaN(t) ? Number.POSITIVE_INFINITY : t;
}

export function filterAndSortProjects(
  projects: Project[],
  search: string,
  sort: ProjectSummarySort
): Project[] {
  const q = (search ?? "").trim().toLowerCase();
  const list = q
    ? projects.filter((p) => (p.name ?? "").toLowerCase().includes(q))
    : [...projects];

  const cmpStr = (a: string, b: string) =>
    a.localeCompare(b, undefined, { sensitivity: "base" });

  list.sort((a, b) => {
    switch (sort) {
      case "name-asc":
        return cmpStr(a.name ?? "", b.name ?? "");
      case "name-desc":
        return cmpStr(b.name ?? "", a.name ?? "");
      case "dueDate-asc":
        return parseProjectDueDate(a) - parseProjectDueDate(b);
      case "dueDate-desc":
        return parseProjectDueDate(b) - parseProjectDueDate(a);
      case "progress-desc":
        return projectProgressPct(b) - projectProgressPct(a);
      case "progress-asc":
        return projectProgressPct(a) - projectProgressPct(b);
      case "status-asc":
        return cmpStr(a.status ?? "", b.status ?? "");
      case "tasks-desc":
        return (b.totalTasks ?? 0) - (a.totalTasks ?? 0);
      default:
        return 0;
    }
  });
  return list;
}

export function getProjectSummaryTotalPages(
  total: number,
  pageSize: number = PROJECT_SUMMARY_PAGE_SIZE
): number {
  if (total <= 0 || pageSize <= 0) return 0;
  return Math.ceil(total / pageSize);
}

export function clampProjectSummaryPage(
  page: number,
  totalPages: number
): number {
  if (totalPages <= 0) return 1;
  if (page < 1) return 1;
  if (page > totalPages) return totalPages;
  return page;
}

export function paginateProjectSummary<T>(
  items: T[],
  page: number,
  pageSize: number = PROJECT_SUMMARY_PAGE_SIZE
): T[] {
  const totalPages = getProjectSummaryTotalPages(items.length, pageSize);
  const safePage = clampProjectSummaryPage(page, totalPages);
  if (totalPages === 0) return [];
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getProjectSummaryPagination(
  total: number,
  page: number,
  pageSize: number = PROJECT_SUMMARY_PAGE_SIZE
) {
  const totalPages = getProjectSummaryTotalPages(total, pageSize);
  const safePage = clampProjectSummaryPage(page, totalPages);
  const entryCount =
    total <= 0
      ? 0
      : Math.min(pageSize, total - (safePage - 1) * pageSize);

  return { totalPages, page: safePage, entryCount };
}
