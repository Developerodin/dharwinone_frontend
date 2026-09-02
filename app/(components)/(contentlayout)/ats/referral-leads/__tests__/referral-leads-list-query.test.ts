import { describe, expect, it } from "vitest";
import type { ReferralLeadsQueryParams } from "@/shared/lib/api/referralLeads";
import {
  DEFAULT_REFERRAL_LEADS_PAGE_SIZE,
  areReferralLeadsListQueryStringsEquivalent,
  buildReferralLeadsListQueryString,
  parseReferralLeadsListState,
  parseReferralLeadsPage,
  referralLeadsStateAfterFilterChange,
  withReferralLeadsPagination,
} from "../referral-leads-list-query";
import type { ReferralLeadsFilterState } from "../hooks/useReferralLeadsFilters";

const emptyFilters: ReferralLeadsFilterState = {
  search: "",
  filterReferrer: "",
  filterType: "",
  filterStatus: "",
  datePreset: "all",
  customFrom: "",
  customTo: "",
  salesAgentUserId: "",
  unassigned: false,
  quickStatus: null,
};

describe("parseReferralLeadsPage", () => {
  it("defaults missing and invalid values to 1", () => {
    expect(parseReferralLeadsPage(null)).toBe(1);
    expect(parseReferralLeadsPage("")).toBe(1);
    expect(parseReferralLeadsPage("0")).toBe(1);
    expect(parseReferralLeadsPage("abc")).toBe(1);
  });

  it("parses page 2 and page 3", () => {
    expect(parseReferralLeadsPage("2")).toBe(2);
    expect(parseReferralLeadsPage("3")).toBe(3);
    expect(parseReferralLeadsPage("3.9")).toBe(3);
  });

  it("keeps page 999 so the server can clamp to the last valid page", () => {
    expect(parseReferralLeadsPage("999")).toBe(999);
  });
});

describe("parseReferralLeadsListState", () => {
  it("defaults to page 1 and empty filters when the query string is empty", () => {
    expect(parseReferralLeadsListState(new URLSearchParams())).toEqual({
      page: 1,
      filters: emptyFilters,
    });
  });

  it("reads page and filters from search params so a reload can restore them", () => {
    const params = new URLSearchParams(
      "page=3&q=Priya&referredBy=u1&type=JOB_APPLY&status=hired&date=week&from=2026-01-01&to=2026-01-31&salesAgent=sa1&quick=hiredOnly"
    );
    expect(parseReferralLeadsListState(params)).toEqual({
      page: 3,
      filters: {
        search: "Priya",
        filterReferrer: "u1",
        filterType: "JOB_APPLY",
        filterStatus: "hired",
        datePreset: "week",
        customFrom: "2026-01-01",
        customTo: "2026-01-31",
        salesAgentUserId: "sa1",
        unassigned: false,
        quickStatus: "hiredOnly",
      },
    });
  });

  it("drops invalid type, status, date preset, and quick values", () => {
    const params = new URLSearchParams("type=NOPE&status=bogus&date=year&quick=maybe");
    const parsed = parseReferralLeadsListState(params);
    expect(parsed.filters.filterType).toBe("");
    expect(parsed.filters.filterStatus).toBe("");
    expect(parsed.filters.datePreset).toBe("all");
    expect(parsed.filters.quickStatus).toBeNull();
  });

  it("treats unassigned=true as the unassigned filter", () => {
    const parsed = parseReferralLeadsListState(new URLSearchParams("unassigned=true"));
    expect(parsed.filters.unassigned).toBe(true);
  });
});

describe("buildReferralLeadsListQueryString", () => {
  it("omits page 1 and empty filters so the default URL has no search params", () => {
    expect(buildReferralLeadsListQueryString({ page: 1, filters: emptyFilters })).toBe("");
  });

  it("persists page 3 and active filters in the query string", () => {
    const qs = buildReferralLeadsListQueryString({
      page: 3,
      filters: {
        ...emptyFilters,
        search: "Priya",
        filterStatus: "hired",
      },
    });
    expect(qs).toBe("?page=3&q=Priya&status=hired");
  });

  it("omits page when it is 1 even if filters are active", () => {
    const qs = buildReferralLeadsListQueryString({
      page: 1,
      filters: { ...emptyFilters, search: "Priya" },
    });
    expect(qs).toBe("?q=Priya");
  });
});

describe("areReferralLeadsListQueryStringsEquivalent", () => {
  it("treats param order as equivalent", () => {
    expect(areReferralLeadsListQueryStringsEquivalent("page=2&q=test", "q=test&page=2")).toBe(true);
  });
});

describe("referralLeadsStateAfterFilterChange", () => {
  it("resets page to 1 when a filter changes", () => {
    const next = referralLeadsStateAfterFilterChange({
      ...emptyFilters,
      filterStatus: "hired",
    });
    expect(next.page).toBe(1);
    expect(next.filters.filterStatus).toBe("hired");
  });

  it("resets page to 1 when search changes", () => {
    const next = referralLeadsStateAfterFilterChange({
      ...emptyFilters,
      search: "Priya",
    });
    expect(next.page).toBe(1);
  });
});

describe("withReferralLeadsPagination", () => {
  it("sends page and limit to the server instead of slicing the client array", () => {
    const base: ReferralLeadsQueryParams = {
      search: "Priya",
      referralPipelineStatus: "hired",
    };
    const params = withReferralLeadsPagination(base, 3);
    expect(params).toEqual({
      search: "Priya",
      referralPipelineStatus: "hired",
      page: 3,
      limit: DEFAULT_REFERRAL_LEADS_PAGE_SIZE,
    });
    expect(params.limit).toBe(25);
    expect("slice" in params).toBe(false);
  });

  it("keeps filtered params when requesting page 3 so the server pages the filtered set", () => {
    const params = withReferralLeadsPagination({ referralPipelineStatus: "hired" }, 3);
    expect(params.page).toBe(3);
    expect(params.referralPipelineStatus).toBe("hired");
  });
});
