import { describe, expect, it } from "vitest";
import {
  areBrowseJobsListQueryStringsEquivalent,
  buildBrowseJobsListHref,
  buildBrowseJobsListQueryString,
  parseBrowseJobsListPage,
  parseBrowseJobsListState,
} from "../ats/browseJobsListQuery";

describe("parseBrowseJobsListPage", () => {
  it("defaults invalid or missing page to 1", () => {
    expect(parseBrowseJobsListPage(null)).toBe(1);
    expect(parseBrowseJobsListPage("0")).toBe(1);
    expect(parseBrowseJobsListPage("abc")).toBe(1);
  });

  it("parses positive integers", () => {
    expect(parseBrowseJobsListPage("3")).toBe(3);
    expect(parseBrowseJobsListPage("2.9")).toBe(2);
  });
});

describe("parseBrowseJobsListState", () => {
  it("reads all supported query params", () => {
    const params = new URLSearchParams(
      "page=2&search=engineer&jobType=Full-time&location=Boston&experienceLevel=Mid%20Level&sortBy=title:asc&jobOrigin=external"
    );
    expect(parseBrowseJobsListState(params)).toEqual({
      page: 2,
      search: "engineer",
      jobType: "Full-time",
      location: "Boston",
      experienceLevel: "Mid Level",
      sortBy: "title:asc",
      jobOrigin: "external",
    });
  });
});

describe("buildBrowseJobsListQueryString", () => {
  it("omits default page and sort values", () => {
    const qs = buildBrowseJobsListQueryString({
      page: 1,
      search: "",
      jobType: "",
      location: "",
      experienceLevel: "",
      sortBy: "createdAt:desc",
      jobOrigin: "",
    });
    expect(qs).toBe("");
  });

  it("serializes active filters", () => {
    const qs = buildBrowseJobsListQueryString({
      page: 3,
      search: " react ",
      jobType: "Contract",
      location: " NYC ",
      experienceLevel: "Senior Level",
      sortBy: "title:desc",
      jobOrigin: "internal",
    });
    const params = new URLSearchParams(qs.slice(1));
    expect(Object.fromEntries(params.entries())).toEqual({
      page: "3",
      search: "react",
      jobType: "Contract",
      location: "NYC",
      experienceLevel: "Senior Level",
      sortBy: "title:desc",
      jobOrigin: "internal",
    });
  });
});

describe("areBrowseJobsListQueryStringsEquivalent", () => {
  it("treats param order and empty strings as equivalent", () => {
    expect(areBrowseJobsListQueryStringsEquivalent("page=2&search=qa", "search=qa&page=2")).toBe(true);
    expect(areBrowseJobsListQueryStringsEquivalent("", "")).toBe(true);
    expect(areBrowseJobsListQueryStringsEquivalent("search=qa", "search=dev")).toBe(false);
  });
});

describe("buildBrowseJobsListHref", () => {
  it("builds list path with normalized params", () => {
    const params = new URLSearchParams("page=2&search=qa&sortBy=createdAt:desc");
    expect(buildBrowseJobsListHref(params)).toBe("/ats/browse-jobs?page=2&search=qa");
  });
});
