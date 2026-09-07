import { describe, it, expect } from "vitest";
import { validateProjectForm } from "./validateProjectForm";

const OID = "0123456789abcdef01234567";

describe("validateProjectForm", () => {
  it("passes a minimal valid form", () => {
    expect(validateProjectForm({ name: "Apollo" })).toEqual({});
  });

  it("reports every problem in one pass, not one at a time", () => {
    const errors = validateProjectForm({
      name: "   ",
      startDate: new Date("2026-03-10"),
      endDate: new Date("2026-03-01"),
      assignedTeams: [{ value: "not-an-object-id", label: "Squad" }],
    });
    expect(Object.keys(errors).sort()).toEqual(["assignedTeams", "endDate", "name"]);
  });

  it("allows an end date equal to the start date", () => {
    const d = new Date("2026-03-01");
    expect(validateProjectForm({ name: "Apollo", startDate: d, endDate: d }).endDate).toBeUndefined();
  });

  it("blocks ids the API would reject instead of dropping them silently", () => {
    expect(
      validateProjectForm({ name: "Apollo", assignedUsers: [{ value: OID, label: "Ada" }] })
        .assignedUsers
    ).toBeUndefined();
    expect(
      validateProjectForm({ name: "Apollo", assignedUsers: [{ value: "", label: "Ghost" }] })
        .assignedUsers
    ).toContain("cannot be saved");
  });
});
