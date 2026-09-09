export const BROWSE_JOBS_LIST_QUERY_KEYS = [
  "page",
  "search",
  "jobTypes",
  "location",
  "experienceLevel",
  "sortBy",
  "jobOrigin",
] as const;

export type BrowseJobsListQueryKey = (typeof BROWSE_JOBS_LIST_QUERY_KEYS)[number];

export type BrowseJobsListState = {
  page: number;
  search: string;
  jobTypes: string[];
  location: string;
  experienceLevel: string;
  sortBy: string;
  jobOrigin: string;
};

const DEFAULT_SORT_BY = "createdAt:desc";

export function parseJobTypesParam(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export function parseBrowseJobsListPage(raw: string | null): number {
  const n = Number(raw ?? 1);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
}

function parseJobTypesFromSearchParams(searchParams: Pick<URLSearchParams, "get">): string[] {
  const jobTypesRaw = searchParams.get("jobTypes");
  if (jobTypesRaw) return parseJobTypesParam(jobTypesRaw);
  const legacyJobType = searchParams.get("jobType");
  return legacyJobType ? [legacyJobType] : [];
}

function toBrowseJobsHref(queryString: string): string {
  return queryString ? `/ats/browse-jobs?${queryString}` : "/ats/browse-jobs";
}

export function parseBrowseJobsListState(
  searchParams: Pick<URLSearchParams, "get">
): BrowseJobsListState {
  return {
    page: parseBrowseJobsListPage(searchParams.get("page")),
    search: searchParams.get("search") ?? "",
    jobTypes: parseJobTypesFromSearchParams(searchParams),
    location: searchParams.get("location") ?? "",
    experienceLevel: searchParams.get("experienceLevel") ?? "",
    sortBy: searchParams.get("sortBy") ?? DEFAULT_SORT_BY,
    jobOrigin: searchParams.get("jobOrigin") ?? "",
  };
}

export function normalizeBrowseJobsListQueryString(raw: string): string {
  if (!raw) return "";
  const params = new URLSearchParams(raw);
  const keys = [...params.keys()].sort();
  return keys.map((key) => `${key}=${params.get(key) ?? ""}`).join("&");
}

export function areBrowseJobsListQueryStringsEquivalent(a: string, b: string): boolean {
  return normalizeBrowseJobsListQueryString(a) === normalizeBrowseJobsListQueryString(b);
}

export function buildBrowseJobsListQueryString(state: BrowseJobsListState): string {
  const params = new URLSearchParams();
  const jobTypes = [...new Set(state.jobTypes.map((t) => t.trim()).filter(Boolean))].sort();

  if (state.page > 1) params.set("page", String(state.page));
  if (state.search.trim()) params.set("search", state.search.trim());
  if (jobTypes.length) params.set("jobTypes", jobTypes.join(","));
  if (state.location.trim()) params.set("location", state.location.trim());
  if (state.experienceLevel) params.set("experienceLevel", state.experienceLevel);
  if (state.sortBy && state.sortBy !== DEFAULT_SORT_BY) params.set("sortBy", state.sortBy);
  if (state.jobOrigin) params.set("jobOrigin", state.jobOrigin);

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function buildBrowseJobsListHref(searchParams: Pick<URLSearchParams, "get">): string {
  const qs = buildBrowseJobsListQueryString(parseBrowseJobsListState(searchParams));
  return toBrowseJobsHref(qs.startsWith("?") ? qs.slice(1) : qs);
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
  return toBrowseJobsHref(qs ?? "");
}
