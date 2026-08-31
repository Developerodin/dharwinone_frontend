"use client";

import styles from "./resumeSkillsExtractOverlay.module.css";
import { WizardOverlayShell } from "./WizardOverlayShell";

export type WizardFeedbackOverlayStatus = "idle" | "loading" | "success" | "error";

export interface WizardFeedbackOverlayProps {
  status: WizardFeedbackOverlayStatus;
  title: string;
  description?: string;
  testId?: string;
  titleId?: string;
  descId?: string;
}

/**
 * Centered overlay for wizard feedback: loading → success/error → auto-dismiss.
 * Shared scrim/panel language used by resume skill extraction and validation.
 */
export function WizardFeedbackOverlay({
  status,
  title,
  description,
  testId = "wizard-feedback-overlay",
  titleId = "wizard-feedback-title",
  descId = "wizard-feedback-desc",
}: WizardFeedbackOverlayProps) {
  if (status === "idle") return null;

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <WizardOverlayShell
      open
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      aria-busy={isLoading}
      testId={testId}
      overlayStatus={status}
      panelClassName="max-w-[22rem]"
    >
      <div className={styles.content}>
        <div className={styles.iconWrap} aria-hidden="true">
          {isLoading && (
            <svg className={styles.spinner} viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                style={{ opacity: 0.25 }}
              />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                style={{ opacity: 0.75 }}
              />
            </svg>
          )}
          {isSuccess && (
            <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path
                d="M8 12.5l2.5 2.5L16 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {isError && (
            <svg className={styles.errorIcon} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path
                d="M12 8v4m0 4h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
        <div className="min-w-0">
          <p id={titleId} className={`${styles.title} text-defaulttextcolor`}>
            {title}
          </p>
          {description ? (
            <p
              id={descId}
              className={styles.desc}
              aria-live={isLoading || isSuccess ? "polite" : undefined}
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </WizardOverlayShell>
  );
}
