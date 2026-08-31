import { describe, expect, it } from "vitest";
import {
  EMPLOYEE_DESIGNATION_FALLBACK,
  resolveEmployeeDesignationForProfile,
  resolveEmployeeJobTitle,
  resolveEmployeeJobTitleLabel,
} from "../employee-job-title";

describe("resolveEmployeeJobTitle", () => {
  it("prefers populated position name over designation", () => {
    expect(
      resolveEmployeeJobTitle({
        designation: "Legacy Title",
        position: { name: "Mobile/Android Engineer" },
      })
    ).toBe("Mobile/Android Engineer");
  });

  it("falls back to designation when position is missing", () => {
    expect(resolveEmployeeJobTitle({ designation: "Mobile/Android Engineer" })).toBe(
      "Mobile/Android Engineer"
    );
  });

  it("falls back to referralJobTitle when designation is empty", () => {
    expect(
      resolveEmployeeJobTitle({
        designation: "",
        referralJobTitle: "Applied Role",
      })
    ).toBe("Applied Role");
  });

  it("returns empty string when no title fields are set", () => {
    expect(resolveEmployeeJobTitle({})).toBe("");
  });

  it("ignores raw position id strings without a name", () => {
    expect(
      resolveEmployeeJobTitle({
        designation: "QA Engineer",
        position: "507f1f77bcf86cd799439011",
      })
    ).toBe("QA Engineer");
  });
});

describe("resolveEmployeeJobTitleLabel", () => {
  it("uses Not assigned for HR list labels", () => {
    expect(resolveEmployeeJobTitleLabel({})).toBe("Not assigned");
  });
});

describe("resolveEmployeeDesignationForProfile", () => {
  it("uses profile-specific fallback when title is missing", () => {
    expect(resolveEmployeeDesignationForProfile({})).toBe(EMPLOYEE_DESIGNATION_FALLBACK);
  });

  it("does not confuse designation with account role strings", () => {
    const title = resolveEmployeeDesignationForProfile({ designation: "Employee" });
    expect(title).toBe("Employee");
    expect(title).not.toBe(EMPLOYEE_DESIGNATION_FALLBACK);
  });
});
