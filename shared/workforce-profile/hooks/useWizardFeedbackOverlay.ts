"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { WizardFeedbackOverlayStatus } from "../components/WizardFeedbackOverlay";

const ERROR_DISMISS_MS = 4000;

export type WizardFeedbackOverlayState = {
  status: WizardFeedbackOverlayStatus;
  title: string;
  description?: string;
};

const IDLE_STATE: WizardFeedbackOverlayState = {
  status: "idle",
  title: "",
  description: undefined,
};

export function useWizardFeedbackOverlay() {
  const [overlay, setOverlay] = useState<WizardFeedbackOverlayState>(IDLE_STATE);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDismissTimer = useCallback(() => {
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
  }, []);

  const dismiss = useCallback(() => {
    clearDismissTimer();
    setOverlay(IDLE_STATE);
  }, [clearDismissTimer]);

  const scheduleDismiss = useCallback(
    (delay: number) => {
      clearDismissTimer();
      dismissTimerRef.current = setTimeout(() => {
        setOverlay(IDLE_STATE);
        dismissTimerRef.current = null;
      }, delay);
    },
    [clearDismissTimer],
  );

  useEffect(() => () => clearDismissTimer(), [clearDismissTimer]);

  const showError = useCallback(
    (title: string, description: string) => {
      clearDismissTimer();
      setOverlay({ status: "error", title, description });
      scheduleDismiss(ERROR_DISMISS_MS);
    },
    [clearDismissTimer, scheduleDismiss],
  );

  return { overlay, showError, dismiss };
}
