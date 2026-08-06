"use client";

import React from "react";
import type { StepConfig, StepId } from "../types/wizard.types";
import styles from "./workforce-wizard.module.css";

type Props = {
  steps: StepConfig[];
  currentStep: StepId;
  onSelect: (id: StepId) => void;
  /** Steps holding blocking validation errors — marked so the user can find them. */
  errorSteps?: StepId[];
};

export function WizardStepTabs({ steps, currentStep, onSelect, errorSteps = [] }: Props) {
  return (
    <div className={styles.tabWrap}>
      <nav className={styles.tabBar} aria-label="Wizard steps">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const hasError = errorSteps.includes(step.id);
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelect(step.id)}
              className={[
                styles.tab,
                isActive ? styles.tabActive : "",
                hasError ? styles.tabError : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={isActive ? "step" : undefined}
              data-has-error={hasError ? "true" : undefined}
            >
              {step.icon ? (
                <i className={`${step.icon} ${styles.tabIcon}`} aria-hidden="true" />
              ) : null}
              <span>
                <span className={styles.tabIndex}>{index + 1}.</span> {step.title}
              </span>
              {hasError ? (
                <>
                  <span className={styles.tabErrorDot} aria-hidden="true" />
                  <span className={styles.srOnly}>(has errors)</span>
                </>
              ) : null}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
