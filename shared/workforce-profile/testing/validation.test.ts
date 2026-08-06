import { describe, expect, it } from "vitest";
import { DEFAULT_RULES } from "../hooks/useWorkforceValidation";
import { makeFormState } from "./fixtures";

const phoneRule = () => {
  const rule = DEFAULT_RULES.find((r) => r.field === "personalInfo.phoneNumber");
  if (!rule) throw new Error("phoneNumber rule missing");
  return rule;
};

const withPhone = (phoneNumber: string, countryCode = "IN") =>
  makeFormState({
    personalInfo: { ...makeFormState().personalInfo, phoneNumber, countryCode },
  });

// The API rejects anything but ^\d{6,15}$ with a 400. Catch it inline instead
// of letting the user discover it as a failed save.
describe("DEFAULT_RULES personalInfo.phoneNumber", () => {
  it("requires a phone number", () => {
    expect(phoneRule().test(withPhone(""), "self-service-employee")).toBe(
      "Phone number is required",
    );
  });

  it("accepts valid national digits", () => {
    expect(phoneRule().test(withPhone("9876543210"), "self-service-employee")).toBeNull();
  });

  it("rejects a formatted number that would 400 server-side", () => {
    expect(
      phoneRule().test(withPhone("+91 98765 43210"), "self-service-employee"),
    ).toBeTruthy();
  });

  it("rejects digits that do not match the selected country", () => {
    expect(phoneRule().test(withPhone("12345", "IN"), "self-service-employee")).toBeTruthy();
  });
});
