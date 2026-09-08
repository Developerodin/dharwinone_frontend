import type { JobsListParams } from "@/shared/lib/api/jobs";

export interface JobSidebarFilters {
  jobTitle: string[];
  company: string[];
  location: string[];
  experience: [number, number];
  salary: [number, number];
  salaryNotSpecified: boolean;
  status: string;
  postingDate: string;
}

export interface JobListQueryInput {
  page: number;
  limit: number;
  sortBy: string;
  search?: string;
  listJobOrigin: "" | "internal" | "external";
  filters: JobSidebarFilters;
  salaryBounds: { min: number; max: number };
  experienceBounds: { min: number; max: number };
}

/**
 * Filters <-> URL query string, so a refresh or a shared link restores the same list.
 * Only non-default values are written, keeping an untouched list on a clean URL.
 *
 * Multi-value facets are comma-joined, matching how `serializeJobsListParams` already sends
 * them to the API -- so a facet value containing a comma cannot round-trip. If that ever
 * matters, both sides need to switch to repeated keys together.
 */
const JOB_FILTER_LIST_SEP = ",";

/** Accepts URLSearchParams or Next's ReadonlyURLSearchParams. */
type QueryReader = { get(key: string): string | null };

/** `?status=archived` and `?status=Archived` both work; `all` is passed through. */
export function normalizeJobStatusParam(raw: string | null | undefined, fallback: string): string {
  const value = raw?.trim();
  if (!value) return fallback;
  if (value.toLowerCase() === "all") return "all";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function readJobFiltersFromQuery(
  params: QueryReader,
  defaults: JobSidebarFilters
): JobSidebarFilters {
  const list = (key: string, fallback: string[]): string[] => {
    const raw = params.get(key);
    if (raw == null) return fallback;
    const values = raw
      .split(JOB_FILTER_LIST_SEP)
      .map((value) => value.trim())
      .filter(Boolean);
    return values.length ? values : fallback;
  };
  const num = (key: string, fallback: number): number => {
    const raw = params.get(key);
    if (raw == null || raw.trim() === "") return fallback;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  return {
    jobTitle: list("titles", defaults.jobTitle),
    company: list("companies", defaults.company),
    location: list("locations", defaults.location),
    experience: [num("expMin", defaults.experience[0]), num("expMax", defaults.experience[1])],
    salary: [num("salMin", defaults.salary[0]), num("salMax", defaults.salary[1])],
    salaryNotSpecified: params.get("salaryNotSpecified") === "true",
    status: normalizeJobStatusParam(params.get("status"), defaults.status),
    postingDate: params.get("postingDate")?.trim() || defaults.postingDate,
  };
}

export function writeJobFiltersToQuery(
  params: URLSearchParams,
  filters: JobSidebarFilters,
  defaults: JobSidebarFilters
): void {
  const setList = (key: string, values: string[]) => {
    if (values.length) params.set(key, values.join(JOB_FILTER_LIST_SEP));
    else params.delete(key);
  };
  const setNum = (key: string, value: number, fallback: number) => {
    if (value !== fallback) params.set(key, String(value));
    else params.delete(key);
  };

  setList("titles", filters.jobTitle);
  setList("companies", filters.company);
  setList("locations", filters.location);
  setNum("expMin", filters.experience[0], defaults.experience[0]);
  setNum("expMax", filters.experience[1], defaults.experience[1]);
  setNum("salMin", filters.salary[0], defaults.salary[0]);
  setNum("salMax", filters.salary[1], defaults.salary[1]);

  if (filters.salaryNotSpecified) params.set("salaryNotSpecified", "true");
  else params.delete("salaryNotSpecified");

  if (filters.status && filters.status !== defaults.status) params.set("status", filters.status);
  else params.delete("status");

  if (filters.postingDate) params.set("postingDate", filters.postingDate);
  else params.delete("postingDate");
}

export function isSalaryFilterActive(
  filters: JobSidebarFilters,
  bounds: { min: number; max: number }
): boolean {
  if (filters.salaryNotSpecified) return true;
  return filters.salary[0] !== bounds.min || filters.salary[1] !== bounds.max;
}

export function isExperienceFilterActive(
  filters: JobSidebarFilters,
  bounds: { min: number; max: number }
): boolean {
  return filters.experience[0] !== bounds.min || filters.experience[1] !== bounds.max;
}

export function buildJobListParams(input: JobListQueryInput): JobsListParams {
  const params: JobsListParams = {
    page: input.page,
    limit: input.limit,
    sortBy: input.sortBy,
  };

  if (input.search?.trim()) {
    params.search = input.search.trim();
  }

  if (input.listJobOrigin === "internal" || input.listJobOrigin === "external") {
    params.jobOrigin = input.listJobOrigin;
  }

  if (input.filters.status && input.filters.status !== "all") {
    params.status = input.filters.status;
  } else if (input.filters.status === "all") {
    params.status = "all";
  }

  if (input.filters.jobTitle.length) {
    params.titles = input.filters.jobTitle;
  }
  if (input.filters.company.length) {
    params.companies = input.filters.company;
  }
  if (input.filters.location.length) {
    params.locations = input.filters.location;
  }
  if (input.filters.postingDate) {
    params.postingDate = input.filters.postingDate;
  }

  filtersSalary(input, params);

  if (isExperienceFilterActive(input.filters, input.experienceBounds)) {
    params.experienceMin = input.filters.experience[0];
    params.experienceMax = input.filters.experience[1];
  }

  return params;
}

function filtersSalary(input: JobListQueryInput, params: JobsListParams): void {
  if (input.filters.salaryNotSpecified) {
    params.salaryNotSpecified = true;
    return;
  }
  if (isSalaryFilterActive(input.filters, input.salaryBounds)) {
    params.salaryMin = input.filters.salary[0];
    params.salaryMax = input.filters.salary[1];
  }
}

export function buildJobExportParams(input: JobListQueryInput): Omit<JobsListParams, "page" | "limit"> {
  const { page: _page, limit: _limit, ...params } = buildJobListParams({
    ...input,
    page: 1,
    limit: input.limit ?? 10,
  });
  return params;
}
