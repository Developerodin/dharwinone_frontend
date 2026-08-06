import { describe, expect, it } from "vitest";
import { normalize } from "../services/normalizer";
import { makeFormState } from "./fixtures";

describe("normalizer.normalize", () => {
  it("trims string fields", () => {
    const state = makeFormState({
      personalInfo: {
        ...makeFormState().personalInfo,
        fullName: "  Alice  ",
        email: "  a@b.co  ",
      },
    });
    const n = normalize(state);
    expect(n.fullName).toBe("Alice");
    expect(n.email).toBe("a@b.co");
  });

  // Both candidate routes validate socialLinks[].url with Joi .uri(), which
  // rejects a bare domain -> "Social link URL must be a valid URL" (400).
  it("adds a scheme to social links that lack one", () => {
    const state = makeFormState({
      personalInfo: {
        ...makeFormState().personalInfo,
        socialLinks: [
          { id: "1", platform: "LinkedIn", url: "linkedin.com/in/test" },
          { id: "2", platform: "GitHub", url: "https://github.com/test" },
          { id: "3", platform: "Site", url: "  www.example.com  " },
        ],
      },
    });
    const n = normalize(state);
    expect(n.socialLinks.map((l) => l.url)).toEqual([
      "https://linkedin.com/in/test",
      "https://github.com/test",
      "https://www.example.com",
    ]);
  });

  it("drops empty education rows", () => {
    const state = makeFormState({
      qualification: {
        educations: [
          {
            id: "1",
            degree: "B.Tech",
            institute: "IIT",
            location: "",
            startYear: "",
            endYear: "",
            description: "",
          },
          {
            id: "2",
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
    const n = normalize(state);
    expect(n.qualifications).toHaveLength(1);
    expect(n.qualifications[0].degree).toBe("B.Tech");
  });

  it("clears endDate when currentlyWorking is true", () => {
    const state = makeFormState({
      experience: {
        experiences: [
          {
            id: "1",
            company: "Acme",
            role: "Eng",
            startDate: "2020-01-01",
            endDate: "2022-01-01",
            currentlyWorking: true,
            description: "",
          },
        ],
      },
    });
    const n = normalize(state);
    expect(n.experiences[0].endDate).toBe("");
    expect(n.experiences[0].currentlyWorking).toBe(true);
  });

  it("only normalizes uploaded documents", () => {
    const state = makeFormState({
      documents: {
        documents: [
          {
            tempId: "ok",
            status: "uploaded",
            progress: 1,
            label: "ok.pdf",
            retryCount: 0,
            metadata: {
              url: "u",
              key: "k",
              originalName: "ok.pdf",
              size: 10,
              mimeType: "application/pdf",
            },
          },
          {
            tempId: "fail",
            status: "failed",
            progress: 0,
            label: "fail",
            retryCount: 1,
          },
        ],
      },
    });
    const n = normalize(state);
    expect(n.documents).toHaveLength(1);
    expect(n.documents[0].url).toBe("u");
  });

  it("filters social links missing platform or url", () => {
    const state = makeFormState({
      personalInfo: {
        ...makeFormState().personalInfo,
        socialLinks: [
          { id: 1, platform: "linkedin", url: "https://x" },
          { id: 2, platform: "", url: "https://y" },
          { id: 3, platform: "twitter", url: "" },
        ],
      },
    });
    const n = normalize(state);
    expect(n.socialLinks).toEqual([
      { platform: "linkedin", url: "https://x" },
    ]);
  });

  it("carries profilePictureRemoved and drops profilePicture when cleared", () => {
    const state = makeFormState({
      personalInfo: {
        ...makeFormState().personalInfo,
        profilePicture: {
          url: "https://cdn.example.com/old.png",
          key: "uploads/old.png",
        },
        profilePictureRemoved: true,
      },
    });
    const n = normalize(state);
    expect(n.profilePictureRemoved).toBe(true);
    expect(n.profilePicture).toBeUndefined();
  });
});
