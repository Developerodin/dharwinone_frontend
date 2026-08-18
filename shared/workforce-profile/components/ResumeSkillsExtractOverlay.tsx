"use client";

import {
  WizardFeedbackOverlay,
  type WizardFeedbackOverlayStatus,
} from "./WizardFeedbackOverlay";

export type ResumeSkillsExtractOverlayStatus = WizardFeedbackOverlayStatus;

export interface ResumeSkillsExtractOverlayProps {
  status: ResumeSkillsExtractOverlayStatus;
  addedCount?: number;
  errorMessage?: string;
}

/**
 * Centered overlay for resume skill extraction: loading → success/error → auto-dismiss.
 * Matches AiBootstrapProgressOverlay scrim language.
 */
export function ResumeSkillsExtractOverlay({
  status,
  addedCount = 0,
  errorMessage,
}: ResumeSkillsExtractOverlayProps) {
  const isLoading = status === "loading";
  const isSuccess = status === "success";

  const title = isLoading
    ? "Scanning your resume"
    : isSuccess
      ? addedCount > 0
        ? `Added ${addedCount} skill${addedCount === 1 ? "" : "s"} from your resume`
        : "Resume scanned"
      : "Document saved. Skills not extracted";

  const description = isLoading
    ? "Detecting skills to suggest for your Qualification step. This usually takes a few seconds."
    : isSuccess
      ? addedCount > 0
        ? "Review them in the Qualification step."
        : "No new skills detected from the uploaded CV."
      : errorMessage ?? "Resume text may be empty, or OpenAI is unavailable.";

  return (
    <WizardFeedbackOverlay
      status={status}
      title={title}
      description={description}
      testId="resume-skills-extract-overlay"
      titleId="resume-skills-extract-title"
      descId="resume-skills-extract-desc"
    />
  );
}
