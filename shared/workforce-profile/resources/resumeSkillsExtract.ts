import type { Skill } from "../types/workforce.types";

export const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;
export type SkillLevel = (typeof SKILL_LEVELS)[number];

/** PDF/DOCX only — matches backend resume extractor. */
export function isResumeExtractableFile(file: File): boolean {
  const lower = file.name.toLowerCase();
  return (
    file.type === "application/pdf" ||
    lower.endsWith(".pdf") ||
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    lower.endsWith(".docx")
  );
}

export function isCvResumeDocument(type?: string, label?: string): boolean {
  const t = (type || "").trim();
  const l = (label || "").trim();
  return t === "CV/Resume" || l === "CV/Resume" || l === "Resume" || l === "CV";
}

/** Dedupe by name (case-insensitive); never overwrite manually-entered skills. */
export function mergeExtractedSkillsIntoWizard(
  existing: Skill[],
  incoming: Array<{ name: string; level?: string; category?: string }>,
): Skill[] {
  const map = new Map<string, Skill>();
  let nid = Date.now();

  for (const row of existing) {
    const k = row.name.trim().toLowerCase();
    if (k) map.set(k, row);
  }

  for (const s of incoming) {
    const name = (s.name || "").trim();
    if (!name) continue;
    const k = name.toLowerCase();
    if (map.has(k)) continue;

    const level =
      typeof s.level === "string" && SKILL_LEVELS.includes(s.level as SkillLevel)
        ? s.level
        : "Intermediate";

    map.set(k, {
      id: `skill-${nid++}`,
      name,
      level,
      category: typeof s.category === "string" ? s.category : undefined,
    });
  }

  return [...map.values()];
}
