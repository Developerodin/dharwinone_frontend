import { describe, it, expect } from "vitest";
import { buildPageWindow, buildPaginationItems } from "@/shared/lib/pagination-items";

/*
* buildPageWindow backs the Students and ATS Jobs list pagination, which render a fixed-width
 * of page numbers and no ellipsis. The invariants that matter are the ones the strip's
 * layout depends on: never more than `size` numbers, always contiguous, always containing
 * the current page.
 */
describe("buildPageWindow", () => {
  it("never returns more than the requested size", () => {
    for (let page = 1; page <= 22; page += 1) {
      expect(buildPageWindow(page, 22)).toHaveLength(5);
    }
  });

  it("keeps the window contiguous and containing the current page", () => {
    for (let page = 1; page <= 22; page += 1) {
      const win = buildPageWindow(page, 22);
      expect(win).toContain(page);
      expect(win).toEqual(Array.from({ length: win.length }, (_, i) => win[0] + i));
    }
  });

  it("starts at page 1 rather than running off the front", () => {
    expect(buildPageWindow(1, 22)).toEqual([1, 2, 3, 4, 5]);
    expect(buildPageWindow(2, 22)).toEqual([1, 2, 3, 4, 5]);
    expect(buildPageWindow(3, 22)).toEqual([1, 2, 3, 4, 5]);
  });

  it("slides forward one page at a time once the window is off the front", () => {
    // The reported case: page 4 of 22 rendered 1 … 2 3 4 5 6 … 22 — seven numbers.
    expect(buildPageWindow(4, 22)).toEqual([2, 3, 4, 5, 6]);
    expect(buildPageWindow(5, 22)).toEqual([3, 4, 5, 6, 7]);
    expect(buildPageWindow(6, 22)).toEqual([4, 5, 6, 7, 8]);
  });

  it("ends on the last page rather than running off the back", () => {
    expect(buildPageWindow(20, 22)).toEqual([18, 19, 20, 21, 22]);
    expect(buildPageWindow(21, 22)).toEqual([18, 19, 20, 21, 22]);
    expect(buildPageWindow(22, 22)).toEqual([18, 19, 20, 21, 22]);
  });

  it("shrinks to the page count when there are fewer pages than the window", () => {
    expect(buildPageWindow(1, 3)).toEqual([1, 2, 3]);
    expect(buildPageWindow(3, 3)).toEqual([1, 2, 3]);
    expect(buildPageWindow(1, 1)).toEqual([1]);
  });

  it("returns nothing when there is nothing to page through", () => {
    expect(buildPageWindow(1, 0)).toEqual([]);
    expect(buildPageWindow(1, 22, 0)).toEqual([]);
  });

  it("clamps a current page outside the range instead of emitting page 0", () => {
    expect(buildPageWindow(0, 22)).toEqual([1, 2, 3, 4, 5]);
    expect(buildPageWindow(-5, 22)).toEqual([1, 2, 3, 4, 5]);
    expect(buildPageWindow(99, 22)).toEqual([18, 19, 20, 21, 22]);
  });

  it("honours a size other than the default", () => {
    expect(buildPageWindow(10, 22, 3)).toEqual([9, 10, 11]);
    expect(buildPageWindow(10, 22, 1)).toEqual([10]);
  });
});

/* buildPageWindow was added beside buildPaginationItems, not in place of it — the
   Evaluation list still renders anchors and ellipses through the older helper. */
describe("buildPaginationItems is unchanged by the new helper", () => {
  it("anchors the last page behind an ellipsis, and omits the leading one when the window already reaches the front", () => {
    // pageIndex 3, radius 2 -> window 1..5, which is adjacent to page 0: no gap to elide.
    expect(buildPaginationItems(3, 22)).toEqual([
      { type: "page", page: 0 },
      { type: "page", page: 1 },
      { type: "page", page: 2 },
      { type: "page", page: 3 },
      { type: "page", page: 4 },
      { type: "page", page: 5 },
      { type: "ellipsis" },
      { type: "page", page: 21 },
    ]);
  });

  it("elides on both sides once the window is clear of each end", () => {
    expect(buildPaginationItems(10, 22)).toEqual([
      { type: "page", page: 0 },
      { type: "ellipsis" },
      { type: "page", page: 8 },
      { type: "page", page: 9 },
      { type: "page", page: 10 },
      { type: "page", page: 11 },
      { type: "page", page: 12 },
      { type: "ellipsis" },
      { type: "page", page: 21 },
    ]);
  });
});
