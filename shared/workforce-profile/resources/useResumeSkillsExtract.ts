"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import * as authApi from "@/shared/lib/api/auth";
import { useWorkforceStore } from "../state/workforce.store";
import type { ResumeSkillsExtractOverlayStatus } from "../components/ResumeSkillsExtractOverlay";
import {
  isCvResumeDocument,
  isResumeExtractableFile,
  mergeExtractedSkillsIntoWizard,
} from "./resumeSkillsExtract";

const SUCCESS_DISMISS_MS = 2500;
const ERROR_DISMISS_MS = 4000;

function extractApiErrorMessage(err: unknown): string {
  if (err instanceof AxiosError && err.response?.data?.message) {
    const m = err.response.data.message;
    return Array.isArray(m) ? m.map(String).join(", ") : String(m);
  }
  if (err instanceof Error && err.message) return err.message;
  return "Resume text may be empty, or OpenAI is unavailable.";
}

export function useResumeSkillsExtract() {
  const setQualification = useWorkforceStore((s) => s.setQualification);
  const [overlayStatus, setOverlayStatus] = useState<ResumeSkillsExtractOverlayStatus>("idle");
  const [addedCount, setAddedCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const inFlight = useRef(false);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDismissTimer = useCallback(() => {
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
  }, []);

  const scheduleDismiss = useCallback(
    (delay: number) => {
      clearDismissTimer();
      dismissTimerRef.current = setTimeout(() => {
        setOverlayStatus("idle");
        setAddedCount(0);
        setErrorMessage(undefined);
        inFlight.current = false;
        dismissTimerRef.current = null;
      }, delay);
    },
    [clearDismissTimer],
  );

  useEffect(() => () => clearDismissTimer(), [clearDismissTimer]);

  const maybeExtractFromResume = useCallback(
    async (file: File, meta?: { type?: string; label?: string }) => {
      if (!isCvResumeDocument(meta?.type, meta?.label)) return;

      if (!isResumeExtractableFile(file)) {
        await Swal.fire({
          icon: "info",
          title: "Resume saved. Skills not extracted",
          text: "Skill extraction supports PDF and DOCX only. Add skills manually in the Qualification step.",
          toast: true,
          position: "top-end",
          showConfirmButton: true,
          timer: 8000,
        });
        return;
      }

      if (inFlight.current) return;
      inFlight.current = true;
      clearDismissTimer();
      setAddedCount(0);
      setErrorMessage(undefined);
      setOverlayStatus("loading");

      const beforeCount = useWorkforceStore.getState().qualification.skills.length;

      try {
        const res = await authApi.extractSkillsFromResume(file);
        setQualification((prev) => ({
          skills: mergeExtractedSkillsIntoWizard(prev.skills, res.skills || []),
        }));

        const afterCount = useWorkforceStore.getState().qualification.skills.length;
        const added = Math.max(0, afterCount - beforeCount);

        setAddedCount(added);
        setOverlayStatus("success");
        scheduleDismiss(SUCCESS_DISMISS_MS);
      } catch (err) {
        setErrorMessage(extractApiErrorMessage(err));
        setOverlayStatus("error");
        scheduleDismiss(ERROR_DISMISS_MS);
      }
    },
    [clearDismissTimer, scheduleDismiss, setQualification],
  );

  return { maybeExtractFromResume, overlayStatus, addedCount, errorMessage };
}
