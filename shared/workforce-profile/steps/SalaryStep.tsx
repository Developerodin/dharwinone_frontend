"use client";

import React, { useRef } from "react";
import { useWorkforceStore } from "../state/workforce.store";
import { useWizardContext } from "../engine/WizardContext";
import wizardUi from "../engine/workforce-wizard.module.css";
import styles from "./salary-step.module.css";
import { uploadDocument } from "@/shared/lib/api/employees";
import type { SalarySlip } from "../types/workforce.types";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const yearOptions = (): string[] => {
  const now = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => String(now - i));
};

let rowCounter = 0;
const newId = () => `ss-${Date.now()}-${++rowCounter}`;

function isExistingSlip(slip: SalarySlip): boolean {
  return slip.resource.status === "uploaded" && !slip.resource.file;
}

function findDuplicates(slips: SalarySlip[]): number[] {
  const seen = new Map<string, number>();
  const dupes: number[] = [];
  slips.forEach((s, idx) => {
    if (!s.month || !s.year) return;
    const key = `${s.month}|${s.year}`;
    if (seen.has(key)) {
      dupes.push(idx);
      dupes.push(seen.get(key)!);
    } else {
      seen.set(key, idx);
    }
  });
  return Array.from(new Set(dupes));
}

function FileThumbnail({ file }: { file: File }) {
  const isImage = file.type.startsWith("image/");
  if (isImage) {
    const url = URL.createObjectURL(file);
    return (
      <img
        src={url}
        alt={file.name}
        className={styles.fileThumb}
        onLoad={() => URL.revokeObjectURL(url)}
      />
    );
  }
  return (
    <div className={styles.fileThumbPlaceholder}>
      <i className="ri-file-text-line" aria-hidden="true" />
    </div>
  );
}

function UploadField({
  slip,
  disabled,
  onFile,
}: {
  slip: SalarySlip;
  disabled: boolean;
  onFile: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasPreview = Boolean(slip.resource.file || slip.resource.metadata);

  return (
    <div className={styles.uploadArea}>
      <input
        ref={inputRef}
        id={`salary-file-${slip.id}`}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className={styles.hiddenFile}
        disabled={disabled}
        aria-label="Upload salary slip"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) onFile(file);
        }}
      />
      <button
        type="button"
        className={styles.uploadBtn}
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        <i className="ri-upload-2-line" aria-hidden="true" />
        {hasPreview ? "Replace file" : "Choose file"}
      </button>
      <p className={styles.fieldHint}>Supported formats: JPG, JPEG, PNG, PDF</p>
      {hasPreview && (
        <div className={styles.filePreview}>
          {slip.resource.file ? (
            <FileThumbnail file={slip.resource.file} />
          ) : (
            <div className={styles.fileThumbPlaceholder}>
              <i className="ri-file-text-line" aria-hidden="true" />
            </div>
          )}
          <div className={styles.fileMeta}>
            <span className={styles.fileName}>
              {slip.resource.file?.name ??
                slip.resource.metadata?.originalName ??
                "Uploaded file"}
            </span>
            {slip.month && slip.year && (
              <span className={styles.filePeriod}>
                {slip.month} {slip.year}
              </span>
            )}
            {slip.resource.status === "uploading" && (
              <span className={`${styles.fileStatus} ${styles.fileStatusUploading}`}>
                Uploading…
              </span>
            )}
            {slip.resource.status === "failed" && (
              <span className={`${styles.fileStatus} ${styles.fileStatusFailed}`}>
                Failed: {slip.resource.error}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function SalaryStep() {
  const salarySlips = useWorkforceStore((s) => s.salary.salarySlips);
  const addSalarySlip = useWorkforceStore((s) => s.addSalarySlip);
  const removeSalarySlip = useWorkforceStore((s) => s.removeSalarySlip);
  const updateSalarySlip = useWorkforceStore((s) => s.updateSalarySlip);
  const { issuesByField } = useWizardContext();

  const fieldErr = issuesByField["salarySlips"]?.[0]?.message ?? null;

  const existing = salarySlips.filter(isExistingSlip);
  const draft = salarySlips.filter((s) => !isExistingSlip(s));
  const duplicateIndexes = findDuplicates(draft);

  const handleAdd = () =>
    addSalarySlip({
      id: newId(),
      month: "",
      year: "",
      resource: {
        tempId: `${newId()}-r`,
        status: "queued",
        progress: 0,
        label: "",
        retryCount: 0,
      },
    });

  const setField = (id: SalarySlip["id"], patch: Partial<SalarySlip>) =>
    updateSalarySlip(id, patch);

  const handleFile = async (slip: SalarySlip, file: File) => {
    const label = slip.month && slip.year ? `${slip.month} ${slip.year}` : file.name;
    setField(slip.id, {
      resource: {
        ...slip.resource,
        status: "uploading",
        progress: 0,
        file,
        label,
      },
    });

    try {
      const metadata = await uploadDocument(file, label);
      setField(slip.id, {
        resource: {
          ...slip.resource,
          status: "uploaded",
          progress: 1,
          metadata,
          file: undefined,
          label,
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setField(slip.id, {
        resource: {
          ...slip.resource,
          status: "failed",
          error: message,
          file,
          label,
        },
      });
    }
  };

  return (
    <div className={styles.step}>
      <p className={styles.sectionEyebrow}>05</p>
      <div className={styles.sectionHead}>
        <div className={styles.sectionTitle}>Salary Slips (Optional) :</div>
        <button type="button" onClick={handleAdd} className={wizardUi.actionBtn}>
          + Add Salary Slip
        </button>
      </div>

      {fieldErr && <div className={styles.sectionError}>{fieldErr}</div>}
      {duplicateIndexes.length > 0 && (
        <div className={styles.sectionError}>
          Duplicate month/year combinations found. Each month and year combination must be unique.
        </div>
      )}

      {existing.length > 0 && (
        <div className={styles.existingSection}>
          <h6 className={styles.subsectionTitle}>Existing Salary Slips</h6>
          {existing.map((slip) => (
            <div
              key={slip.id}
              className={`${styles.card} ${styles.cardExisting}`}
            >
              <button
                type="button"
                onClick={() => removeSalarySlip(slip.id)}
                className={styles.cardRemove}
                aria-label="Remove salary slip"
              >
                <i className="ri-close-line" aria-hidden="true" />
              </button>

              <div className={`${styles.field} ${styles.col3}`}>
                <label className={styles.label} htmlFor={`existing-month-${slip.id}`}>
                  Month
                </label>
                <input
                  id={`existing-month-${slip.id}`}
                  type="text"
                  className={`${styles.input} ${styles.inputReadOnly}`}
                  value={slip.month}
                  readOnly
                />
              </div>

              <div className={`${styles.field} ${styles.col3}`}>
                <label className={styles.label} htmlFor={`existing-year-${slip.id}`}>
                  Year
                </label>
                <input
                  id={`existing-year-${slip.id}`}
                  type="text"
                  className={`${styles.input} ${styles.inputReadOnly}`}
                  value={slip.year}
                  readOnly
                />
              </div>

              <div className={`${styles.field} ${styles.col6}`}>
                <span className={styles.label}>File Preview</span>
                <div className={styles.filePreview}>
                  <div className={styles.fileThumbPlaceholder}>
                    <i className="ri-file-text-line" aria-hidden="true" />
                  </div>
                  <div className={styles.fileMeta}>
                    <a
                      href={slip.resource.metadata?.url ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.fileLink}
                    >
                      {slip.resource.metadata?.originalName ?? `${slip.month} ${slip.year}`}
                    </a>
                    <span className={styles.filePeriod}>
                      {slip.month} {slip.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {draft.map((slip, index) => {
        const isDuplicate = duplicateIndexes.includes(index);
        const hasError = Boolean(fieldErr || isDuplicate);

        return (
          <div
            key={slip.id}
            className={`${styles.card} ${isDuplicate ? styles.cardDuplicate : ""}`}
          >
            <button
              type="button"
              onClick={() => removeSalarySlip(slip.id)}
              className={styles.cardRemove}
              aria-label="Remove salary slip"
            >
              <i className="ri-close-line" aria-hidden="true" />
            </button>

            <div className={`${styles.field} ${styles.col3}`}>
              <label className={styles.label} htmlFor={`month-${slip.id}`}>
                Month <span className={styles.required}>*</span>
              </label>
              <select
                id={`month-${slip.id}`}
                className={`${styles.select} ${hasError ? styles.inputError : ""}`}
                value={slip.month}
                onChange={(e) => setField(slip.id, { month: e.target.value })}
              >
                <option value="">Select</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className={`${styles.field} ${styles.col3}`}>
              <label className={styles.label} htmlFor={`year-${slip.id}`}>
                Year <span className={styles.required}>*</span>
              </label>
              <select
                id={`year-${slip.id}`}
                className={`${styles.select} ${hasError ? styles.inputError : ""}`}
                value={slip.year}
                onChange={(e) => setField(slip.id, { year: e.target.value })}
              >
                <option value="">Select</option>
                {yearOptions().map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className={`${styles.field} ${styles.col6}`}>
              <label className={styles.label} htmlFor={`salary-file-${slip.id}`}>
                Upload Salary Slip
              </label>
              <UploadField
                slip={slip}
                disabled={!slip.month || !slip.year}
                onFile={(file) => void handleFile(slip, file)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
