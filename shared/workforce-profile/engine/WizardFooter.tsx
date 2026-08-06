"use client";

import React from "react";
import styles from "./workforce-wizard.module.css";

type Props = {
  isFirst: boolean;
  isLast: boolean;
  isSaving: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  submitLabel?: string;
  sticky?: boolean;
  /** Render the submit button on every step (in addition to Next), so a
   *  self-service edit can be saved without walking the whole wizard. */
  alwaysShowSubmit?: boolean;
  /** When alwaysShowSubmit is on, disable Save until edits exist. */
  isDirty?: boolean;
};

export function WizardFooter({
  isFirst,
  isLast,
  isSaving,
  onBack,
  onNext,
  onSubmit,
  submitLabel = "Submit",
  sticky = true,
  alwaysShowSubmit = false,
  isDirty = true,
}: Props) {
  const submitButton = (
    <button
      type="button"
      onClick={onSubmit}
      disabled={isSaving || (alwaysShowSubmit && !isDirty)}
      className={styles.submitBtn}
      aria-busy={isSaving || undefined}
      title={alwaysShowSubmit && !isDirty && !isSaving ? "No changes to save yet" : undefined}
    >
      {isSaving ? (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          Saving…
        </>
      ) : (
        submitLabel
      )}
    </button>
  );

  // When Save sits next to Next, Next steps down to a neutral style so the
  // screen keeps exactly one primary action.
  const nextIsSecondary = alwaysShowSubmit && !isLast;

  return (
    <div
      className={[styles.footer, sticky ? "sticky bottom-0 z-10" : ""].filter(Boolean).join(" ")}
    >
      <div className="flex">
        {/* Kept mounted and disabled on step 1 — unmounting made the footer jump. */}
        <button
          type="button"
          onClick={onBack}
          className={styles.backBtn}
          disabled={isFirst || isSaving}
        >
          Back
        </button>
      </div>

      <div className={styles.footerActions}>
        {isLast ? (
          submitButton
        ) : (
          <>
            {alwaysShowSubmit && submitButton}
            <button
              type="button"
              onClick={onNext}
              className={nextIsSecondary ? styles.nextBtnSecondary : styles.nextBtn}
              disabled={isSaving}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
}
