"use client";

import { useCallback, useRef, useState } from "react";
import type { Mode, Role } from "../types/wizard.types";
import { useWorkforceStore, selectFormState } from "../state/workforce.store";
import type { ValidationResult } from "../types/validation.types";
import type { DirtyMap } from "../services/payload";
import {
  getSubmitStrategy,
  type StrategyResult,
} from "./strategies";
import type { WorkforceAnalyticsApi } from "../hooks/useWorkforceAnalytics";

export type UseWorkforceSubmitOptions = {
  mode: Mode;
  role: Role;
  id?: string;
  dirty?: DirtyMap;
  validate: () => ValidationResult;
  analytics: WorkforceAnalyticsApi;
  onSuccess?: (result: StrategyResult) => void;
  onValidationError?: (result: ValidationResult) => void;
};

export type UseWorkforceSubmitReturn = {
  submit: () => Promise<StrategyResult | null>;
  isSubmitting: boolean;
  /** Message from the last failed save. The caller renders it — nothing throws. */
  submitError: string | null;
  clearSubmitError: () => void;
};

/** Prefer the API's message ("phoneNumber must be…") over axios' generic status text. */
function readApiErrorMessage(err: unknown): string {
  const res = (err as { response?: { data?: { message?: unknown } } })?.response;
  const apiMessage = res?.data?.message;
  if (Array.isArray(apiMessage) && apiMessage.length > 0) {
    return apiMessage.map(String).join(", ");
  }
  if (typeof apiMessage === "string" && apiMessage.trim()) return apiMessage.trim();
  if (err instanceof Error && err.message) return err.message;
  return "Couldn't save your profile. Please try again.";
}

export function useWorkforceSubmit(
  opts: UseWorkforceSubmitOptions,
): UseWorkforceSubmitReturn {
  const { mode, role, id, dirty, validate, analytics, onSuccess, onValidationError } = opts;
  // The ref guards against double-submit synchronously; the state drives the UI.
  // Reading the ref alone never re-renders, so "Saving…" would never appear.
  const submittingRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const commitSnapshot = useWorkforceStore((s) => s.commitSnapshot);

  const clearSubmitError = useCallback(() => setSubmitError(null), []);

  const submit = useCallback(async (): Promise<StrategyResult | null> => {
    if (submittingRef.current) return null;
    setSubmitError(null);

    const result = validate();
    if (result.hasErrors) {
      for (const issue of result.issues) {
        if (issue.severity === "error") {
          analytics.trackValidationFail(issue.section, issue.field, issue.severity);
        }
      }
      onValidationError?.(result);
      return null;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    const startedAt = Date.now();
    analytics.trackSubmitStart();

    try {
      const strategy = getSubmitStrategy({ mode, role, id });
      const state = selectFormState(useWorkforceStore.getState());
      const outcome = await strategy.run({ state, dirty });
      analytics.trackSubmitSuccess(Date.now() - startedAt);
      commitSnapshot();
      onSuccess?.(outcome);
      return outcome;
    } catch (err) {
      // Rethrowing here escaped as an unhandled rejection (dev error overlay) and
      // the user was never told the save failed. Surface it instead.
      const message = readApiErrorMessage(err);
      analytics.trackSubmitFailure(message);
      setSubmitError(message);
      return null;
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }, [
    mode,
    role,
    id,
    dirty,
    validate,
    analytics,
    onSuccess,
    onValidationError,
    commitSnapshot,
  ]);

  return { submit, isSubmitting, submitError, clearSubmitError };
}
