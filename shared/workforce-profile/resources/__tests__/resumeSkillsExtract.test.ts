import { describe, expect, it } from "vitest";
import {
  isCvResumeDocument,
  isResumeExtractableFile,
  mergeExtractedSkillsIntoWizard,
} from "../resumeSkillsExtract";
import type { Skill } from "../../types/workforce.types";

describe("isResumeExtractableFile", () => {
  it("accepts PDF and DOCX", () => {
    expect(isResumeExtractableFile(new File(["x"], "cv.pdf", { type: "application/pdf" }))).toBe(
      true,
    );
    expect(
      isResumeExtractableFile(
        new File(["x"], "cv.docx", {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }),
      ),
    ).toBe(true);
  });

  it("rejects images", () => {
    expect(isResumeExtractableFile(new File(["x"], "scan.png", { type: "image/png" }))).toBe(
      false,
    );
  });
});

describe("isCvResumeDocument", () => {
  it("matches CV/Resume type or label", () => {
    expect(isCvResumeDocument("CV/Resume", "CV/Resume")).toBe(true);
    expect(isCvResumeDocument(undefined, "CV/Resume")).toBe(true);
    expect(isCvResumeDocument("Passport", "Passport")).toBe(false);
  });
});

describe("mergeExtractedSkillsIntoWizard", () => {
  const existing: Skill[] = [
    { id: "1", name: "React", level: "Advanced" },
    { id: "2", name: "TypeScript", level: "Intermediate" },
  ];

  it("adds new skills without duplicating existing names", () => {
    const merged = mergeExtractedSkillsIntoWizard(existing, [
      { name: "react", level: "Expert" },
      { name: "Node.js", level: "Advanced", category: "Backend" },
    ]);

    expect(merged).toHaveLength(3);
    expect(merged.find((s) => s.name === "React")?.level).toBe("Advanced");
    expect(merged.find((s) => s.name === "Node.js")).toMatchObject({
      level: "Advanced",
      category: "Backend",
    });
  });

  it("defaults invalid levels to Intermediate", () => {
    const merged = mergeExtractedSkillsIntoWizard([], [{ name: "Python", level: "Guru" }]);
    expect(merged[0]?.level).toBe("Intermediate");
  });
});
