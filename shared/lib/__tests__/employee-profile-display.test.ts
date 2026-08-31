import { describe, expect, it } from "vitest";
import {
  EMPLOYEE_DESIGNATION_FALLBACK,
  getEmployeeProfileDesignationDisplay,
  shouldShowEmployeeDesignation,
} from "../employee-profile-display";

describe("shouldShowEmployeeDesignation", () => {
  it("shows designation for Employee account role", () => {
    expect(
      shouldShowEmployeeDesignation({
        roleNames: ["Employee"],
        permissionsLoaded: true,
        roleDisplayName: "Employee",
      })
    ).toBe(true);
  });

  it("hides designation for Candidate-only personas", () => {
    expect(
      shouldShowEmployeeDesignation({
        roleNames: ["Candidate"],
        permissionsLoaded: true,
        roleDisplayName: "Candidate",
      })
    ).toBe(false);
  });

  it("shows designation when user holds Employee among multiple roles", () => {
    expect(
      shouldShowEmployeeDesignation({
        roleNames: ["Administrator", "Employee"],
        permissionsLoaded: true,
        roleDisplayName: "Administrator, Employee",
      })
    ).toBe(true);
  });

  it("falls back to roleDisplayName before permissions load", () => {
    expect(
      shouldShowEmployeeDesignation({
        roleNames: [],
        permissionsLoaded: false,
        roleDisplayName: "Employee",
      })
    ).toBe(true);
    expect(
      shouldShowEmployeeDesignation({
        roleNames: [],
        permissionsLoaded: false,
        roleDisplayName: "Candidate",
      })
    ).toBe(false);
  });
});

describe("getEmployeeProfileDesignationDisplay", () => {
  it("returns resolved job title for employees with designation", () => {
    expect(
      getEmployeeProfileDesignationDisplay({ designation: "Mobile/Android Engineer" })
    ).toBe("Mobile/Android Engineer");
  });

  it("returns clean fallback when designation is missing", () => {
    expect(getEmployeeProfileDesignationDisplay(null)).toBe(EMPLOYEE_DESIGNATION_FALLBACK);
    expect(getEmployeeProfileDesignationDisplay({ designation: "" })).toBe(
      EMPLOYEE_DESIGNATION_FALLBACK
    );
  });

  it("preserves long designations without truncating in the helper", () => {
    const long =
      "Senior Mobile / Android / iOS / Cross-platform Engineer — Platform Guild Lead";
    expect(getEmployeeProfileDesignationDisplay({ designation: long })).toBe(long);
  });

  it("keeps role display separate from designation resolution", () => {
    const roleLabel = "Employee";
    const designation = getEmployeeProfileDesignationDisplay({
      designation: "Mobile/Android Engineer",
    });
    expect(roleLabel).toBe("Employee");
    expect(designation).toBe("Mobile/Android Engineer");
    expect(designation).not.toBe(roleLabel);
  });
});
