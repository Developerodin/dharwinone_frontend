"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FocusLock from "react-focus-lock";
import overlayStyles from "./resumeSkillsExtractOverlay.module.css";

export interface WizardOverlayShellProps {
  open: boolean;
  children: React.ReactNode;
  onBackdropClick?: () => void;
  testId?: string;
  role?: "dialog" | "alertdialog";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-modal"?: boolean;
  "aria-busy"?: boolean;
  /** Portal to document.body (default false — wizard validation overlay renders inline). */
  portal?: boolean;
  focusLock?: boolean;
  panelClassName?: string;
  /** When set, dialog semantics live on the panel instead of the scrim. */
  panelRole?: "dialog";
  panelAriaLabel?: string;
  overlayStatus?: string;
}

/**
 * Shared scrim + panel shell for workforce-profile overlays.
 * Matches WizardFeedbackOverlay / resume skill extraction styling.
 */
export function WizardOverlayShell({
  open,
  children,
  onBackdropClick,
  testId,
  role,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-modal": ariaModal,
  "aria-busy": ariaBusy,
  portal = false,
  focusLock = false,
  panelClassName = "",
  panelRole,
  panelAriaLabel,
  overlayStatus,
}: WizardOverlayShellProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !mounted) return null;

  const panel = (
    <div
      role={panelRole}
      aria-label={panelAriaLabel}
      aria-modal={panelRole === "dialog" ? true : undefined}
      className={[
        overlayStyles.panel,
        "w-full rounded-xl border border-defaultborder bg-bodybg shadow-2xl",
        panelClassName,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );

  const inner = focusLock ? <FocusLock returnFocus>{panel}</FocusLock> : panel;

  const scrim = (
    <div
      className={overlayStyles.scrim}
      onClick={onBackdropClick}
      role={panelRole ? undefined : role}
      aria-label={panelRole ? undefined : ariaLabel}
      aria-labelledby={panelRole ? undefined : ariaLabelledBy}
      aria-describedby={panelRole ? undefined : ariaDescribedBy}
      aria-modal={panelRole ? undefined : ariaModal}
      aria-busy={ariaBusy}
      data-testid={testId}
      data-overlay-status={overlayStatus}
    >
      {inner}
    </div>
  );

  return portal ? createPortal(scrim, document.body) : scrim;
}
