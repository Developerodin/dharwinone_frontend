import { describe, expect, it } from "vitest";
import { DEFAULT_RULES } from "../hooks/useWorkforceValidation";
import { makeFormState } from "./fixtures";

const phoneRule = () => {
  const rule = DEFAULT_RULES.find((r) => r.field === "personalInfo.phoneNumber");
  if (!rule) throw new Error("phoneNumber rule missing");
  return rule;
};

const ruleByField = (field: string) => {
  const rule = DEFAULT_RULES.find((r) => r.field === field);
  if (!rule) throw new Error(`${field} rule missing`);
  return rule;
};

const withPhone = (phoneNumber: string, countryCode = "IN") =>
  makeFormState({
    personalInfo: { ...makeFormState().personalInfo, phoneNumber, countryCode },
  });

const withEducation = (
  patch: Partial<{
    degree: string;
    institute: string;
    location: string;
    startYear: string;
    endYear: string;
    description: string;
  }>,
) =>
  makeFormState({
    qualification: {
      educations: [
        {
          id: "e1",
          degree: "B.Tech",
          institute: "IIT",
          location: "Delhi",
          startYear: "2018",
          endYear: "2022",
          description: "",
          ...patch,
        },
      ],
      skills: [],
    },
  });

const withExperience = (
  patch: Partial<{
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    description: string;
  }>,
) =>
  makeFormState({
    experience: {
      experiences: [
        {
          id: "x1",
          company: "Acme",
          role: "Eng",
          startDate: "2020-01-01",
          endDate: "2021-01-01",
          currentlyWorking: false,
          description: "",
          ...patch,
        },
      ],
    },
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

describe("DEFAULT_RULES qualification years", () => {
  it("requires start year when a qualification row is used", () => {
    expect(
      ruleByField("qualification.educations[].startYear").test(
        withEducation({ startYear: "" }),
        "self-service-employee",
      ),
    ).toBe("Start year is required");
  });

  it("requires end year when a qualification row is used", () => {
    expect(
      ruleByField("qualification.educations[].endYear").test(
        withEducation({ endYear: "" }),
        "self-service-employee",
      ),
    ).toBe("End year is required");
  });

  it("rejects end year before start year", () => {
    expect(
      ruleByField("qualification.educations[].endYear").test(
        withEducation({ startYear: "2022", endYear: "2018" }),
        "self-service-employee",
      ),
    ).toBe("End year must be on or after start year");
  });

  it("ignores blank unused education rows", () => {
    const blank = makeFormState({
      qualification: {
        educations: [
          {
            id: "blank",
            degree: "",
            institute: "",
            location: "",
            startYear: "",
            endYear: "",
            description: "",
          },
        ],
        skills: [],
      },
    });
    expect(
      ruleByField("qualification.educations[].startYear").test(
        blank,
        "self-service-employee",
      ),
    ).toBeNull();
    expect(
      ruleByField("qualification.educations[].endYear").test(
        blank,
        "self-service-employee",
      ),
    ).toBeNull();
  });
});

describe("DEFAULT_RULES work experience dates", () => {
  it("requires start date when an experience row is used", () => {
    expect(
      ruleByField("experience.experiences[].startDate").test(
        withExperience({ startDate: "" }),
        "self-service-employee",
      ),
    ).toBe("Start date is required");
  });

  it("requires end date when not currently working", () => {
    expect(
      ruleByField("experience.experiences[].endDate").test(
        withExperience({ endDate: "", currentlyWorking: false }),
        "self-service-employee",
      ),
    ).toBe("End date is required");
  });

  it("allows empty end date when currently working", () => {
    expect(
      ruleByField("experience.experiences[].endDate").test(
        withExperience({ endDate: "", currentlyWorking: true }),
        "self-service-employee",
      ),
    ).toBeNull();
  });

  it("rejects end date before start date", () => {
    expect(
      ruleByField("experience.experiences[].endDate").test(
        withExperience({ startDate: "2022-01-01", endDate: "2021-01-01" }),
        "self-service-employee",
      ),
    ).toBe("End date must be after start date");
  });
});
