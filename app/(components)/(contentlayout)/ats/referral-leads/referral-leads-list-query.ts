import type { ReferralLeadsQueryParams } from "@/shared/lib/api/referralLeads";
import { STATUS_META } from "@/shared/lib/ats/referral-leads-constants";
import type { ReferralLeadsFilterState } from "./hooks/useReferralLeadsFilters";
import type { QuickStatusFilter } from "./utils/attributionScope.util";
import type { DatePreset } from "./utils/dateRange.util";

export const DEFAULT_REFERRAL_LEADS_PAGE_SIZE = 25;

export const REFERRAL_LEADS_LIST_QUERY_KEYS = [
  "page",
  "q",
  "referredBy",
  "type",
  "status",
  "date",
  "from",
  "to",
  "salesAgent",
  "unassigned",
  "quick",
] as const;

const DATE_PRESETS: ReadonlyArray<DatePreset> = ["all", "week", "month", "quarter"];
const LINK_TYPES = ["SHARE_CANDIDATE_ONBOARD", "JOB_APPLY"] as const;
const QUICK_VALUES: ReadonlyArray<Exclude<QuickStatusFilter, null>> = [
  "hiredOnly",
  "activeEmployees",
  "resignedEmployees",
  "appliedOnly",
];

export type ReferralLeadsListState = {
  page: number;
  filters: ReferralLeadsFilterState;
};

export function parseReferralLeadsPage(raw: string | null | undefined): number {
  const n = Number.parseInt(String(raw ?? ""), 10);
  return Number.isInteger(n) && n >= 1 ? n : 1;
}

function parseDatePreset(raw: string | null | undefined): DatePreset {
  return DATE_PRESETS.includes(raw as DatePreset) ? (raw as DatePreset) : "all";
}

function parseLinkType(raw: string | null | undefined): string {
  return LINK_TYPES.includes(raw as (typeof LINK_TYPES)[number]) ? raw! : "";
}

function parseStatus(raw: string | null | undefined): string {
  const value = raw ?? "";
  return value && value in STATUS_META ? value : "";
}

function parseQuick(raw: string | null | undefined): QuickStatusFilter {
  return QUICK_VALUES.includes(raw as Exclude<QuickStatusFilter, null>)
    ? (raw as Exclude<QuickStatusFilter, null>)
    : null;
}

export function parseReferralLeadsListState(
  searchParams: Pick<URLSearchParams, "get">
): ReferralLeadsListState {
  return {
    page: parseReferralLeadsPage(searchParams.get("page")),
    filters: {
      search: searchParams.get("q") ?? "",
      filterReferrer: searchParams.get("referredBy") ?? "",
      filterType: parseLinkType(searchParams.get("type")),
      filterStatus: parseStatus(searchParams.get("status")),
      datePreset: parseDatePreset(searchParams.get("date")),
      customFrom: searchParams.get("from") ?? "",
      customTo: searchParams.get("to") ?? "",
      salesAgentUserId: searchParams.get("salesAgent") ?? "",
      unassigned: searchParams.get("unassigned") === "true",
      quickStatus: parseQuick(searchParams.get("quick")),
    },
  };
}

export function normalizeReferralLeadsListQueryString(raw: string): string {
  if (!raw) return "";
  const params = new URLSearchParams(raw);
  const keys = [...new Set([...params.keys()])].sort();
  return keys.map((key) => `${key}=${params.get(key) ?? ""}`).join("&");
}

export function areReferralLeadsListQueryStringsEquivalent(a: string, b: string): boolean {
  return normalizeReferralLeadsListQueryString(a) === normalizeReferralLeadsListQueryString(b);
}

export function buildReferralLeadsListQueryString(state: ReferralLeadsListState): string {
  const params = new URLSearchParams();
  const { page, filters } = state;

  if (page > 1) params.set("page", String(page));
  if (filters.search.trim()) params.set("q", filters.search.trim());
  if (filters.filterReferrer) params.set("referredBy", filters.filterReferrer);
  if (filters.filterType) params.set("type", filters.filterType);
  if (filters.filterStatus) params.set("status", filters.filterStatus);
  if (filters.datePreset !== "all") params.set("date", filters.datePreset);
  if (filters.customFrom) params.set("from", filters.customFrom);
  if (filters.customTo) params.set("to", filters.customTo);
  if (filters.unassigned) {
    params.set("unassigned", "true");
  } else if (filters.salesAgentUserId) {
    params.set("salesAgent", filters.salesAgentUserId);
  }
  if (filters.quickStatus) params.set("quick", filters.quickStatus);

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function referralLeadsStateAfterFilterChange(
  filters: ReferralLeadsFilterState
): ReferralLeadsListState {
  return { page: 1, filters };
}

export function withReferralLeadsPagination(
  baseParams: ReferralLeadsQueryParams,
  page: number,
  pageSize = DEFAULT_REFERRAL_LEADS_PAGE_SIZE
): ReferralLeadsQueryParams {
  return { ...baseParams, page, limit: pageSize };
}
