export const BROWSE_JOBS_LIST_QUERY_KEYS = [
  "page",
  "search",
  "jobType",
  "location",
  "experienceLevel",
  "sortBy",
  "jobOrigin",
] as const;

export type BrowseJobsListQueryKey = (typeof BROWSE_JOBS_LIST_QUERY_KEYS)[number];

export type BrowseJobsListState = {
  page: number;
  search: string;
  jobType: string;
  location: string;
  experienceLevel: string;
  sortBy: string;
  jobOrigin: string;
};

const DEFAULT_SORT_BY = "createdAt:desc";

export function parseBrowseJobsListPage(raw: string | null): number {
  const n = Number(raw ?? 1);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
}

export function parseBrowseJobsListState(
  searchParams: Pick<URLSearchParams, "get">
): BrowseJobsListState {
  return {
    page: parseBrowseJobsListPage(searchParams.get("page")),
    search: searchParams.get("search") ?? "",
    jobType: searchParams.get("jobType") ?? "",
    location: searchParams.get("location") ?? "",
    experienceLevel: searchParams.get("experienceLevel") ?? "",
    sortBy: searchParams.get("sortBy") ?? DEFAULT_SORT_BY,
    jobOrigin: searchParams.get("jobOrigin") ?? "",
  };
}

export function normalizeBrowseJobsListQueryString(raw: string): string {
  if (!raw) return "";
  const params = new URLSearchParams(raw);
  const keys = [...new Set([...params.keys()])].sort();
  return keys.map((key) => `${key}=${params.get(key) ?? ""}`).join("&");
}

export function areBrowseJobsListQueryStringsEquivalent(a: string, b: string): boolean {
  return normalizeBrowseJobsListQueryString(a) === normalizeBrowseJobsListQueryString(b);
}

export function buildBrowseJobsListQueryString(state: BrowseJobsListState): string {
  const params = new URLSearchParams();
  const entries: Record<BrowseJobsListQueryKey, string | number> = {
    page: state.page,
    search: state.search.trim(),
    jobType: state.jobType,
    location: state.location.trim(),
    experienceLevel: state.experienceLevel,
    sortBy: state.sortBy,
    jobOrigin: state.jobOrigin,
  };

  Object.entries(entries).forEach(([key, value]) => {
    if (key === "page") {
      if (Number(value) > 1) params.set(key, String(value));
      return;
    }
    if (key === "sortBy" && value === DEFAULT_SORT_BY) return;
    if (value) params.set(key, String(value));
  });

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function buildBrowseJobsListHref(searchParams: Pick<URLSearchParams, "get">): string {
  const params = new URLSearchParams();
  for (const key of BROWSE_JOBS_LIST_QUERY_KEYS) {
    const value = searchParams.get(key);
    if (!value) continue;
    if (key === "page" && parseBrowseJobsListPage(value) <= 1) continue;
    if (key === "sortBy" && value === DEFAULT_SORT_BY) continue;
    params.set(key, value);
  }
  const qs = params.toString();
  return qs ? `/ats/browse-jobs?${qs}` : "/ats/browse-jobs";
}

export const BROWSE_JOBS_LIST_QS_STORAGE_KEY = "browseJobs:listQs";

export function rememberBrowseJobsListQueryString(qs: string): void {
  if (typeof window === "undefined") return;
  if (qs) sessionStorage.setItem(BROWSE_JOBS_LIST_QS_STORAGE_KEY, qs);
  else sessionStorage.removeItem(BROWSE_JOBS_LIST_QS_STORAGE_KEY);
}

export function readBrowseJobsListBackHref(): string {
  if (typeof window === "undefined") return "/ats/browse-jobs";
  const qs = sessionStorage.getItem(BROWSE_JOBS_LIST_QS_STORAGE_KEY);
  return qs ? `/ats/browse-jobs?${qs}` : "/ats/browse-jobs";
}
