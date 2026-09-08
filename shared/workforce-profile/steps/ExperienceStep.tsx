"use client";

import { useEffect, useState } from "react";
import { YmdFilterDateInput } from "@/shared/components/filters/YmdFilterDateInput";
import { formatYmdLocal } from "@/shared/lib/leave-date-range";
import { useWorkforceStore } from "../state/workforce.store";
import { useWizardContext } from "../engine/WizardContext";
import wizardUi from "../engine/workforce-wizard.module.css";
import styles from "./qualification-step.module.css";

let rowCounter = 0;
const newId = () => `x-${Date.now()}-${++rowCounter}`;

const todayYmd = (): string => formatYmdLocal(new Date());

const validateDateRange = (start: string, end: string): boolean =>
  !start || !end || start <= end;

const validateNotFutureDate = (end: string): boolean =>
  !end || end <= todayYmd();

export function ExperienceStep() {
  const experiences = useWorkforceStore((s) => s.experience.experiences);
  const addExperienceRow = useWorkforceStore((s) => s.addExperienceRow);
  const removeExperienceRow = useWorkforceStore((s) => s.removeExperienceRow);
  const updateExperienceRow = useWorkforceStore((s) => s.updateExperienceRow);
  const { issuesByField } = useWizardContext();
  const [expOpen, setExpOpen] = useState(false);

  useEffect(() => {
    if (experiences.length > 0) {
      setExpOpen(true);
    }
  }, [experiences.length]);

  const startErr =
    issuesByField["experience.experiences[].startDate"]?.[0]?.message ?? null;
  const expErr =
    issuesByField["experience.experiences[].endDate"]?.[0]?.message ?? null;
  const dateErr = startErr || expErr;

  return (
    <div className={styles.step}>
      <p className={styles.sectionEyebrow}>03</p>
      <div className={styles.sectionHead}>
        <button
          type="button"
          id="experience-toggle"
          onClick={() => setExpOpen((v) => !v)}
          className={styles.skillsToggle}
          aria-expanded={expOpen}
          aria-controls="experience-section"
        >
          <i
            className={`ri-arrow-right-s-line ${styles.skillsToggleIcon} ${
              expOpen ? styles.skillsToggleIconOpen : ""
            }`}
            aria-hidden="true"
          />
          <span className={styles.sectionTitle}>Experience :</span>
        </button>
        <button
          type="button"
          onClick={() => {
            addExperienceRow({
              id: newId(),
              company: "",
              role: "",
              startDate: "",
              endDate: "",
              currentlyWorking: false,
              description: "",
            });
            setExpOpen(true);
          }}
          className={wizardUi.actionBtn}
        >
          + Add Experience
        </button>
      </div>
      {dateErr && <div className={styles.sectionError}>{dateErr}</div>}

      <div id="experience-section" hidden={!expOpen}>
        {experiences.map((exp, index) => (
          <div key={exp.id} className={styles.card}>
            <button
              type="button"
              onClick={() => removeExperienceRow(exp.id)}
              className={styles.cardRemove}
              aria-label={`Remove work experience ${index + 1}`}
            >
              <i className="ri-close-line" aria-hidden="true" />
            </button>

            <div className={`${styles.field} ${styles.col6}`}>
              <label className={styles.label} htmlFor={`company-${exp.id}`}>
                Company Name <span className={styles.required}>*</span>
              </label>
              <input
                id={`company-${exp.id}`}
                type="text"
                className={styles.input}
                placeholder="Company Name"
                value={exp.company}
                onChange={(e) => updateExperienceRow(exp.id, { company: e.target.value })}
              />
            </div>

            <div className={`${styles.field} ${styles.col6}`}>
              <label className={styles.label} htmlFor={`role-${exp.id}`}>
                Role/Designation <span className={styles.required}>*</span>
              </label>
              <input
                id={`role-${exp.id}`}
                type="text"
                className={styles.input}
                placeholder="Role/Designation"
                value={exp.role}
                onChange={(e) => updateExperienceRow(exp.id, { role: e.target.value })}
              />
            </div>

            <div className={`${styles.field} ${styles.col6}`}>
              <YmdFilterDateInput
                label="Start Date *"
                inputId={`start-date-${exp.id}`}
                portalId={`experience-start-datepicker-${exp.id}`}
                popperClassName="!z-[10050]"
                value={exp.startDate}
                maxDate={exp.endDate || undefined}
                labelClassName={styles.label}
                inputClassName={`${styles.input}${startErr ? ` ${styles.inputError}` : ""}`}
                onCommit={(ymd) => updateExperienceRow(exp.id, { startDate: ymd })}
              />
            </div>

            <div className={`${styles.field} ${styles.col6}`}>
              <YmdFilterDateInput
                label={`End Date${exp.currentlyWorking ? "" : " *"}`}
                inputId={`end-date-${exp.id}`}
                portalId={`experience-end-datepicker-${exp.id}`}
                popperClassName="!z-[10050]"
                value={exp.endDate}
                minDate={exp.startDate || undefined}
                maxDate={todayYmd()}
                disabled={exp.currentlyWorking}
                labelClassName={styles.label}
                inputClassName={`${styles.input}${
                  expErr && !exp.currentlyWorking ? ` ${styles.inputError}` : ""
                }`}
                onCommit={(ymd) => updateExperienceRow(exp.id, { endDate: ymd })}
              />
            </div>

            <div className={`${styles.field} ${styles.col12}`}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`currentlyWorking-${exp.id}`}
                  checked={exp.currentlyWorking}
                  onChange={(e) =>
                    updateExperienceRow(exp.id, {
                      currentlyWorking: e.target.checked,
                      endDate: e.target.checked ? "" : exp.endDate,
                    })
                  }
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor={`currentlyWorking-${exp.id}`}
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  Currently working here
                </label>
              </div>
            </div>

            {exp.startDate && exp.endDate && !validateDateRange(exp.startDate, exp.endDate) && (
              <p className={`${styles.fieldError} ${styles.col12}`}>
                Start date cannot be ahead of end date
              </p>
            )}
            {exp.endDate && !validateNotFutureDate(exp.endDate) && (
              <p className={`${styles.fieldError} ${styles.col12}`}>
                End date cannot be in the future
              </p>
            )}

            <div className={`${styles.field} ${styles.col12}`}>
              <label className={styles.label} htmlFor={`description-${exp.id}`}>
                Responsibilities / Description
              </label>
              <textarea
                id={`description-${exp.id}`}
                className={styles.textarea}
                rows={3}
                placeholder="Responsibilities / Description"
                value={exp.description}
                onChange={(e) => updateExperienceRow(exp.id, { description: e.target.value })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
