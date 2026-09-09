import { describe, it, expect } from "vitest";
import { resolveBulkTargets } from "./bulkSelection";

const visible = ["a", "b", "c"];

describe("resolveBulkTargets", () => {
  it("targets the ticked rows when there are some", () => {
    expect(resolveBulkTargets(new Set(["b", "c"]), visible)).toEqual({
      ids: ["b", "c"],
      scope: "selected",
    });
  });

  it("falls back to everything loaded when nothing is ticked", () => {
    expect(resolveBulkTargets(new Set(), visible)).toEqual({
      ids: visible,
      scope: "visible",
    });
  });

  // The bug: ids ticked in one folder stayed in the set after switching folder,
  // so a bulk action reached threads that were no longer on screen.
  it("drops ticked ids that are no longer on screen", () => {
    expect(resolveBulkTargets(new Set(["a", "gone-1", "gone-2"]), visible)).toEqual({
      ids: ["a"],
      scope: "selected",
    });
  });

  it("falls back to visible when every ticked id is stale", () => {
    expect(resolveBulkTargets(new Set(["gone-1", "gone-2"]), visible)).toEqual({
      ids: visible,
      scope: "visible",
    });
  });

  it("returns nothing when the list itself is empty", () => {
    expect(resolveBulkTargets(new Set(["gone"]), [])).toEqual({ ids: [], scope: "visible" });
    expect(resolveBulkTargets(new Set(), [])).toEqual({ ids: [], scope: "visible" });
  });

  it("de-duplicates and preserves selection order", () => {
    expect(resolveBulkTargets(["c", "a", "c"], visible)).toEqual({
      ids: ["c", "a"],
      scope: "selected",
    });
  });
});
