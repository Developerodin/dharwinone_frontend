"use client";

import React, { useEffect, useRef } from "react";
import { useWizardContext } from "./WizardContext";
import { WizardStepTabs } from "./WizardStepTabs";
import { WizardFooter } from "./WizardFooter";
import { WizardFeedbackOverlay } from "../components/WizardFeedbackOverlay";
import type { StepId } from "../types/wizard.types";
import styles from "./workforce-wizard.module.css";

type StepRender = Partial<Record<StepId, React.ReactNode>>;

type Props = {
  stepRender: StepRender;
  submitLabel?: string;
  header?: React.ReactNode;
  stickyFooter?: boolean;
};

export function WorkforceWizardShell({
  stepRender,
  submitLabel = "Submit",
  header,
  stickyFooter = true,
}: Props) {
  const {
    mode,
    steps,
    currentStep,
    currentIndex,
    setStepById,
    setStepByIndex,
    isSaving,
    saveError,
    clearSaveError,
    issuesBySection,
    isDirty,
    submit,
    goNext,
    validationOverlay,
  } = useWizardContext();

  const stepRegionRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const firstRenderRef = useRef(true);

  // Swapping step content silently leaves screen readers on the old context.
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    stepRegionRef.current?.focus();
  }, [currentStep]);

  // A blocked or failed save must not be something the user has to hunt for.
  useEffect(() => {
    if (saveError) errorRef.current?.focus();
  }, [saveError]);

  const errorSteps = steps
    .filter((s) => issuesBySection[s.id]?.some((i) => i.severity === "error"))
    .map((s) => s.id);

  // In self-service modes the user is editing an existing profile, often a
  // single field. Expose Save on every step (disabled until dirty) instead of
  // forcing a Next-Next-Next walk to the last step.
  const alwaysShowSubmit =
    mode === "self-service-employee" || mode === "self-service-candidate";

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === steps.length - 1;

  const handleNext = () => goNext();
  const handleBack = () => setStepByIndex(currentIndex - 1);

  const body = stepRender[currentStep] ?? (
    <div className="p-6 text-sm text-gray-500">
      Step "{currentStep}" not configured.
    </div>
  );

  return (
    <div className={styles.shell}>
      {header}
      <WizardStepTabs
        steps={steps}
        currentStep={currentStep}
        onSelect={setStepById}
        errorSteps={errorSteps}
      />
      {saveError ? (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className={styles.saveError}
        >
          <i className="ri-error-warning-line" aria-hidden="true" />
          <span>{saveError}</span>
          <button
            type="button"
            onClick={clearSaveError}
            className={styles.saveErrorDismiss}
            aria-label="Dismiss error"
          >
            <i className="ri-close-line" aria-hidden="true" />
          </button>
        </div>
      ) : null}
      <div
        ref={stepRegionRef}
        tabIndex={-1}
        role="group"
        aria-label={steps[currentIndex]?.title ?? "Wizard step"}
        className="min-h-[200px] outline-none"
      >
        {body}
      </div>
      <WizardFooter
        isFirst={isFirst}
        isLast={isLast}
        isSaving={isSaving}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={submit}
        submitLabel={submitLabel}
        sticky={stickyFooter}
        alwaysShowSubmit={alwaysShowSubmit}
        isDirty={isDirty}
      />
      <WizardFeedbackOverlay
        status={validationOverlay.status}
        title={validationOverlay.title}
        description={validationOverlay.description}
        testId="wizard-validation-overlay"
        titleId="wizard-validation-title"
        descId="wizard-validation-desc"
      />
    </div>
  );
}
