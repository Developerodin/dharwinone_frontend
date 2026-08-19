"use client";

import { useState } from "react";
import { useWorkforceStore } from "../state/workforce.store";
import { useWizardContext } from "../engine/WizardContext";
import wizardUi from "../engine/workforce-wizard.module.css";
import styles from "./qualification-step.module.css";

let rowCounter = 0;
const newId = () => `q-${Date.now()}-${++rowCounter}`;

function generateYearOptions(): string[] {
  const now = new Date().getFullYear();
  const out: string[] = [];
  for (let y = now + 5; y >= 1960; y--) out.push(String(y));
  return out;
}

function validateYearRange(start: string, end: string): boolean {
  if (!start || !end) return true;
  return Number(start) <= Number(end);
}

export function QualificationStep() {
  const educations = useWorkforceStore((s) => s.qualification.educations);
  const skills = useWorkforceStore((s) => s.qualification.skills);
  const addEducation = useWorkforceStore((s) => s.addEducation);
  const removeEducation = useWorkforceStore((s) => s.removeEducation);
  const updateEducation = useWorkforceStore((s) => s.updateEducation);
  const addSkill = useWorkforceStore((s) => s.addSkill);
  const removeSkill = useWorkforceStore((s) => s.removeSkill);
  const updateSkill = useWorkforceStore((s) => s.updateSkill);
  const { issuesByField } = useWizardContext();
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [eduOpen, setEduOpen] = useState(false);

  const eduErr = issuesByField["qualification.educations"]?.[0]?.message ?? null;
  const startYearErr =
    issuesByField["qualification.educations[].startYear"]?.[0]?.message ?? null;
  const endYearErr =
    issuesByField["qualification.educations[].endYear"]?.[0]?.message ?? null;
  const skillErr = issuesByField["qualification.skills"]?.[0]?.message ?? null;
  const years = generateYearOptions();
  const yearFieldErr = startYearErr || endYearErr;

  return (
    <div className={styles.step}>
      <p className={styles.sectionEyebrow}>02</p>
      <div className={styles.sectionHead}>
        <button
          type="button"
          onClick={() => setEduOpen((v) => !v)}
          className={styles.skillsToggle}
          aria-expanded={eduOpen}
        >
          <i
            className={`ri-arrow-right-s-line ${styles.skillsToggleIcon} ${
              eduOpen ? styles.skillsToggleIconOpen : ""
            }`}
            aria-hidden="true"
          />
          <span className={styles.sectionTitle}>Qualification :</span>
        </button>
        <button
          type="button"
          onClick={() => {
            addEducation({
              id: newId(),
              degree: "",
              institute: "",
              location: "",
              startYear: "",
              endYear: "",
              description: "",
            });
            setEduOpen(true);
          }}
          className={wizardUi.actionBtn}
        >
          + Add Education
        </button>
      </div>
      {eduErr && <div className={styles.sectionError}>{eduErr}</div>}
      {yearFieldErr && <div className={styles.sectionError}>{yearFieldErr}</div>}

      {eduOpen &&
        educations.map((edu) => {
        const yearMismatch =
          edu.startYear &&
          edu.endYear &&
          !validateYearRange(edu.startYear, edu.endYear);
        return (
          <div key={edu.id} className={styles.card}>
            <button
              type="button"
              onClick={() => removeEducation(edu.id)}
              className={styles.cardRemove}
              aria-label="Remove education"
            >
              <i className="ri-close-line" aria-hidden="true" />
            </button>

            <div className={`${styles.field} ${styles.col6}`}>
              <label className={styles.label} htmlFor={`degree-${edu.id}`}>
                Degree <span className={styles.required}>*</span>
              </label>
              <input
                id={`degree-${edu.id}`}
                type="text"
                className={`${styles.input} ${eduErr ? styles.inputError : ""}`}
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
              />
            </div>

            <div className={`${styles.field} ${styles.col6}`}>
              <label className={styles.label} htmlFor={`institute-${edu.id}`}>
                University <span className={styles.required}>*</span>
              </label>
              <input
                id={`institute-${edu.id}`}
                type="text"
                className={`${styles.input} ${eduErr ? styles.inputError : ""}`}
                placeholder="University/Institute"
                value={edu.institute}
                onChange={(e) =>
                  updateEducation(edu.id, { institute: e.target.value })
                }
              />
            </div>

            <div className={`${styles.field} ${styles.col6}`}>
              <label className={styles.label} htmlFor={`location-${edu.id}`}>
                Location <span className={styles.required}>*</span>
              </label>
              <input
                id={`location-${edu.id}`}
                type="text"
                className={styles.input}
                placeholder="Location"
                value={edu.location}
                onChange={(e) =>
                  updateEducation(edu.id, { location: e.target.value })
                }
              />
            </div>

            <div className={`${styles.field} ${styles.col3}`}>
              <label className={styles.label} htmlFor={`start-year-${edu.id}`}>
                Start Year <span className={styles.required}>*</span>
              </label>
              <select
                id={`start-year-${edu.id}`}
                className={`${styles.select} ${startYearErr ? styles.inputError : ""}`}
                value={edu.startYear}
                onChange={(e) =>
                  updateEducation(edu.id, { startYear: e.target.value })
                }
              >
                <option value="">Select Start Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className={`${styles.field} ${styles.col3}`}>
              <label className={styles.label} htmlFor={`end-year-${edu.id}`}>
                End Year <span className={styles.required}>*</span>
              </label>
              <select
                id={`end-year-${edu.id}`}
                className={`${styles.select} ${endYearErr ? styles.inputError : ""}`}
                value={edu.endYear}
                onChange={(e) =>
                  updateEducation(edu.id, { endYear: e.target.value })
                }
              >
                <option value="">Select End Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {yearMismatch && (
              <p className={`${styles.fieldError} ${styles.col12}`}>
                Start year cannot be ahead of end year
              </p>
            )}

            <div className={`${styles.field} ${styles.col12}`}>
              <label className={styles.label} htmlFor={`description-${edu.id}`}>
                Description
              </label>
              <textarea
                id={`description-${edu.id}`}
                className={styles.textarea}
                rows={3}
                placeholder="Description"
                value={edu.description}
                onChange={(e) =>
                  updateEducation(edu.id, { description: e.target.value })
                }
              />
            </div>
          </div>
        );
      })}

      <div className={styles.skillsSection}>
        <div className={styles.sectionHead}>
          <button
            type="button"
            onClick={() => setSkillsOpen((v) => !v)}
            className={styles.skillsToggle}
            aria-expanded={skillsOpen}
          >
            <i
              className={`ri-arrow-right-s-line ${styles.skillsToggleIcon} ${
                skillsOpen ? styles.skillsToggleIconOpen : ""
              }`}
              aria-hidden="true"
            />
            <span className={styles.sectionTitle}>Skills :</span>
          </button>
          <button
            type="button"
            onClick={() => {
              addSkill({ id: newId(), name: "", level: "Beginner" });
              setSkillsOpen(true);
            }}
            className={wizardUi.actionBtn}
          >
            + Add Skill
          </button>
        </div>
        {skillErr && <div className={styles.sectionError}>{skillErr}</div>}

        {skillsOpen &&
          skills.map((sk) => (
          <div key={sk.id} className={styles.card}>
            <button
              type="button"
              onClick={() => removeSkill(sk.id)}
              className={styles.cardRemove}
              aria-label="Remove skill"
            >
              <i className="ri-close-line" aria-hidden="true" />
            </button>

            <div className={`${styles.field} ${styles.col4}`}>
              <label className={styles.label} htmlFor={`skill-name-${sk.id}`}>
                Skill Name <span className={styles.required}>*</span>
              </label>
              <input
                id={`skill-name-${sk.id}`}
                type="text"
                className={styles.input}
                placeholder="e.g., JavaScript, Python, React"
                value={sk.name}
                onChange={(e) => updateSkill(sk.id, { name: e.target.value })}
              />
            </div>

            <div className={`${styles.field} ${styles.col4}`}>
              <label className={styles.label} htmlFor={`skill-level-${sk.id}`}>
                Skill Level
              </label>
              <select
                id={`skill-level-${sk.id}`}
                className={styles.select}
                value={sk.level}
                onChange={(e) => updateSkill(sk.id, { level: e.target.value })}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className={`${styles.field} ${styles.col4}`}>
              <label className={styles.label} htmlFor={`skill-category-${sk.id}`}>
                Category
              </label>
              <input
                id={`skill-category-${sk.id}`}
                type="text"
                className={styles.input}
                placeholder="e.g., Frontend, Languages"
                value={sk.category ?? ""}
                onChange={(e) => updateSkill(sk.id, { category: e.target.value })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
