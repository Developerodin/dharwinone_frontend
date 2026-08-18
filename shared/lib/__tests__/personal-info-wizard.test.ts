import { afterEach, describe, expect, it } from "vitest";
import {
  isPersonalInfoWizardEnabled,
  resolveSelfServiceWizardTarget,
} from "../personal-info-wizard";

afterEach(() => {
  delete process.env.NEXT_PUBLIC_ENABLE_PERSONAL_INFO_WIZARD;
});

describe("isPersonalInfoWizardEnabled", () => {
  it('is true only for the exact string "true"', () => {
    process.env.NEXT_PUBLIC_ENABLE_PERSONAL_INFO_WIZARD = "true";
    expect(isPersonalInfoWizardEnabled()).toBe(true);
  });

  it("falls back to the existing implementation when unset", () => {
    expect(isPersonalInfoWizardEnabled()).toBe(false);
  });

  it("falls back to the existing implementation for invalid values", () => {
    for (const raw of ["false", "TRUE", "1", "yes", "", " true "]) {
      process.env.NEXT_PUBLIC_ENABLE_PERSONAL_INFO_WIZARD = raw;
      expect(isPersonalInfoWizardEnabled()).toBe(false);
    }
  });
});

describe("resolveSelfServiceWizardTarget", () => {
  it("keeps Employee and Candidate on separate flows", () => {
    expect(resolveSelfServiceWizardTarget(["Employee"])).toEqual({
      mode: "self-service-employee",
      role: "employee",
    });
    expect(resolveSelfServiceWizardTarget(["Candidate"])).toEqual({
      mode: "self-service-candidate",
      role: "candidate",
    });
  });

  it("treats a user holding both roles as an Employee", () => {
    expect(resolveSelfServiceWizardTarget(["Candidate", "Employee"])).toEqual({
      mode: "self-service-employee",
      role: "employee",
    });
  });

  it("defaults to the Employee flow when roles are unknown", () => {
    expect(resolveSelfServiceWizardTarget(null).mode).toBe("self-service-employee");
    expect(resolveSelfServiceWizardTarget([]).mode).toBe("self-service-employee");
  });
});
