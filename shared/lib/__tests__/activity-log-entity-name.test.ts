import { describe, it, expect } from "vitest";
import {
  getEmployeeOrgActivityEntitySummary,
  getResolvedEntityNameSummary,
} from "../activity-log-catalog";

describe("entity name in the activity log Entity cell", () => {
  it("falls back to the name the API resolved", () => {
    expect(getResolvedEntityNameSummary({ entityName: "Jackie Chan" })).toEqual({
      headline: "Jackie Chan",
      detailLines: [],
    });
    expect(getResolvedEntityNameSummary({ entityName: "  " })).toBeNull();
    expect(getResolvedEntityNameSummary({})).toBeNull();
  });

  it("names the person on a department assignment, stored name first", () => {
    const base = {
      entityType: "Employee",
      action: "employee.departmentAssign",
      metadata: { departmentIdBefore: "d1", departmentIdAfter: "d2" },
    };
    expect(getEmployeeOrgActivityEntitySummary(base)?.headline).toBe("Department assignment");
    expect(
      getEmployeeOrgActivityEntitySummary({ ...base, entityName: "Live Name" })?.headline
    ).toBe("Live Name");
    expect(
      getEmployeeOrgActivityEntitySummary({
        ...base,
        entityName: "Live Name",
        metadata: { ...base.metadata, fullName: "Name At Save Time" },
      })?.headline
    ).toBe("Name At Save Time");
    expect(getEmployeeOrgActivityEntitySummary({ ...base, entityName: "x" })?.detailLines).toEqual([
      "departmentId: d1 → d2",
    ]);
  });
});
