"use client";

import { useEffect, useId, useRef } from "react";
import {
  punchInBlockedCopy,
  type PunchInEligibility,
} from "@/shared/lib/dashboard/employeeDashboard";

type Blocked = Extract<PunchInEligibility, { allowed: false }>;

/**
 * Design-system modal for punch-in day blocks (holiday / leave / week off).
 * Mirrors TaskDetailModal scrim + teal dashboard header language.
 */
export default function PunchInBlockedOverlay({
  block,
  onClose,
}: {
  block: Blocked | null;
  onClose: () => void;
}) {
  const titleId = useId();
  const descId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!block) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [block, onClose]);

  if (!block) return null;

  const copy = punchInBlockedCopy(block);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      data-testid="punch-in-blocked-overlay"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div className="relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-defaultborder/70 bg-white shadow-xl shadow-black/10 dark:border-white/[0.08] dark:bg-bodybg dark:shadow-none">
        <header className="border-b border-defaultborder/50 bg-gradient-to-br from-teal-50/50 via-white to-white px-5 py-4 dark:border-white/[0.06] dark:from-teal-950/25 dark:via-bodybg dark:to-bodybg">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.06em] text-teal-700 dark:text-teal-400">
            {block.label}
          </p>
          <h2
            id={titleId}
            className="mt-1 text-[1.05rem] font-semibold tracking-[-0.015em] text-defaulttextcolor dark:text-defaulttextcolor/90"
          >
            {copy.title}
          </h2>
        </header>
        <div className="px-5 py-4">
          <p id={descId} className="text-[0.875rem] leading-relaxed text-textmuted dark:text-white/65">
            {block.reason === "HOLIDAY" && block.holidayName ? (
              <>
                Today is a holiday:{" "}
                <strong className="font-semibold text-defaulttextcolor dark:text-defaulttextcolor/90">
                  {block.holidayName}
                </strong>
                . You cannot record attendance on a holiday.
                {block.alsoOnLeave ? " You also have approved leave today." : ""}
              </>
            ) : (
              copy.body
            )}
          </p>
        </div>
        <footer className="flex justify-end border-t border-defaultborder/50 px-5 py-3 dark:border-white/[0.06]">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-teal-600 px-4 text-[0.78rem] font-semibold text-white transition-colors hover:bg-teal-700 active:translate-y-px"
          >
            Got it
          </button>
        </footer>
      </div>
    </div>
  );
}
