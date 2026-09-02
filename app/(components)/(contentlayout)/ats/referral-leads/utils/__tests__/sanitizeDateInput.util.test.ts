import { describe, expect, it } from "vitest";
import { parseYmdLocal } from "@/shared/lib/leave-date-range";
import {
  isValidYmdLocal,
  sanitizeReferralLeadsDateInput,
  getReferralLeadsDateRangeError,
  isReferralLeadsDateRangeInvalid,
  REFERRAL_LEADS_INVALID_DATE_RANGE_MESSAGE,
} from "../sanitizeDateInput.util";

describe("isValidYmdLocal", () => {
  it("accepts real calendar dates with a 4-digit year", () => {
    expect(isValidYmdLocal("2026-01-15")).toBe(true);
    expect(isValidYmdLocal(" 1999-12-31 ")).toBe(true);
  });

  it("rejects impossible month/day combinations", () => {
    expect(isValidYmdLocal("2026-02-31")).toBe(false);
    expect(isValidYmdLocal("2026-13-01")).toBe(false);
    expect(isValidYmdLocal("2026-00-15")).toBe(false);
    expect(isValidYmdLocal("2026-04-31")).toBe(false);
  });

  it("rejects non-4-digit years", () => {
    expect(isValidYmdLocal("55555-01-01")).toBe(false);
    expect(isValidYmdLocal("26-01-01")).toBe(false);
  });
});

describe("sanitizeReferralLeadsDateInput", () => {
  it("returns empty string when cleared", () => {
    expect(sanitizeReferralLeadsDateInput("")).toBe("");
    expect(sanitizeReferralLeadsDateInput("   ")).toBe("");
  });

  it("accepts valid YYYY-MM-DD with a 4-digit year", () => {
    expect(sanitizeReferralLeadsDateInput("2026-01-15")).toBe("2026-01-15");
    expect(sanitizeReferralLeadsDateInput(" 1999-12-31 ")).toBe("1999-12-31");
  });

  it("rejects years with more than 4 digits", () => {
    expect(sanitizeReferralLeadsDateInput("55555-01-01")).toBeNull();
    expect(sanitizeReferralLeadsDateInput("123456-06-30")).toBeNull();
  });

  it("rejects years with fewer than 4 digits", () => {
    expect(sanitizeReferralLeadsDateInput("26-01-01")).toBeNull();
    expect(sanitizeReferralLeadsDateInput("202-01-01")).toBeNull();
  });

  it("rejects malformed date strings", () => {
    expect(sanitizeReferralLeadsDateInput("not-a-date")).toBeNull();
    expect(sanitizeReferralLeadsDateInput("2026/01/01")).toBeNull();
    expect(sanitizeReferralLeadsDateInput("2026-1-01")).toBeNull();
  });

  it("rejects invalid month/day values", () => {
    expect(sanitizeReferralLeadsDateInput("2026-02-31")).toBeNull();
    expect(sanitizeReferralLeadsDateInput("2026-13-10")).toBeNull();
  });

  it("aligns with parseYmdLocal acceptance rules", () => {
    const valid = "2026-06-15";
    expect(sanitizeReferralLeadsDateInput(valid)).toBe(valid);
    expect(parseYmdLocal(valid)).not.toBeNull();

    const invalid = "55555-06-15";
    expect(sanitizeReferralLeadsDateInput(invalid)).toBeNull();
    expect(parseYmdLocal(invalid)).toBeNull();
  });
});

describe("referral leads date range validation", () => {
  it("accepts empty or single-sided ranges", () => {
    expect(isReferralLeadsDateRangeInvalid("", "")).toBe(false);
    expect(isReferralLeadsDateRangeInvalid("2026-01-01", "")).toBe(false);
    expect(isReferralLeadsDateRangeInvalid("", "2026-01-31")).toBe(false);
    expect(getReferralLeadsDateRangeError("2026-01-01", "")).toBeNull();
    expect(getReferralLeadsDateRangeError("", "2026-01-31")).toBeNull();
  });

  it("accepts From on or before To", () => {
    expect(isReferralLeadsDateRangeInvalid("2026-01-01", "2026-01-31")).toBe(false);
    expect(isReferralLeadsDateRangeInvalid("2026-01-15", "2026-01-15")).toBe(false);
    expect(getReferralLeadsDateRangeError("2026-01-01", "2026-01-31")).toBeNull();
  });

  it("rejects From after To with a clear message", () => {
    expect(isReferralLeadsDateRangeInvalid("2026-02-01", "2026-01-31")).toBe(true);
    expect(getReferralLeadsDateRangeError("2026-02-01", "2026-01-31")).toBe(
      REFERRAL_LEADS_INVALID_DATE_RANGE_MESSAGE
    );
  });
});
