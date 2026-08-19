"use client";

import { useEffect, useId, useRef } from "react";
import { TASK_STATUS_META } from "@/shared/lib/dashboard/employeeDashboard";
import { getTaskId, type Task, type TaskPriority, type TaskStatus } from "@/shared/lib/api/tasks";

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

function statusMeta(status: TaskStatus) {
  return TASK_STATUS_META.find((s) => s.key === status);
}

function formatDue(dueDate: string | undefined): string | null {
  if (!dueDate) return null;
  const d = new Date(dueDate);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TaskDetailModal({
  task,
  onClose,
  onComplete,
}: {
  task: Task | null;
  onClose: () => void;
  onComplete?: (id: string) => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!task) return;
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
  }, [task, onClose]);

  if (!task) return null;

  const meta = statusMeta(task.status);
  const dueLabel = formatDue(task.dueDate);
  const priority = task.priority ? PRIORITY_LABELS[task.priority] ?? task.priority : null;
  const canComplete = task.status !== "completed" && typeof onComplete === "function";
  const taskId = getTaskId(task);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div className="relative flex max-h-[min(90vh,40rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-defaultborder/70 bg-white shadow-xl shadow-black/10 dark:border-white/[0.08] dark:bg-bodybg dark:shadow-none">
        <header className="flex items-start gap-3 border-b border-defaultborder/50 bg-gradient-to-br from-teal-50/50 via-white to-white px-5 py-4 dark:border-white/[0.06] dark:from-teal-950/25 dark:via-bodybg dark:to-bodybg">
          <div className="min-w-0 flex-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-teal-600 dark:text-teal-400">
              Task details
            </p>
            <h2
              id={titleId}
              className="mt-1 text-[0.95rem] font-semibold tracking-[-0.012em] text-defaulttextcolor dark:text-defaulttextcolor/90"
            >
              {task.title}
            </h2>
            {task.taskCode ? (
              <p className="mt-0.5 font-mono text-[0.7rem] text-textmuted dark:text-white/50">
                {task.taskCode}
              </p>
            ) : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-defaultborder/70 text-textmuted transition-colors hover:bg-teal-50 hover:text-teal-700 dark:border-white/[0.08] dark:text-white/50 dark:hover:bg-teal-950/40 dark:hover:text-teal-300"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          <dl className="grid grid-cols-2 gap-3">
            <div>
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.06em] text-textmuted dark:text-white/45">
                Status
              </dt>
              <dd className="mt-1 flex items-center gap-1.5 text-[0.8125rem] font-medium text-defaulttextcolor dark:text-defaulttextcolor/90">
                {meta ? (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: meta.color }}
                  />
                ) : null}
                {meta?.label ?? task.status}
              </dd>
            </div>
            {priority ? (
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.06em] text-textmuted dark:text-white/45">
                  Priority
                </dt>
                <dd className="mt-1 text-[0.8125rem] font-medium text-defaulttextcolor dark:text-defaulttextcolor/90">
                  {priority}
                </dd>
              </div>
            ) : null}
            {dueLabel ? (
              <div className="col-span-2">
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.06em] text-textmuted dark:text-white/45">
                  Due
                </dt>
                <dd className="mt-1 text-[0.8125rem] font-medium tabular-nums text-defaulttextcolor dark:text-defaulttextcolor/90">
                  {dueLabel}
                </dd>
              </div>
            ) : null}
          </dl>

          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.06em] text-textmuted dark:text-white/45">
              Description
            </p>
            {task.description?.trim() ? (
              <p className="mt-1.5 whitespace-pre-wrap text-[0.8125rem] leading-relaxed text-defaulttextcolor/90 dark:text-white/75">
                {task.description}
              </p>
            ) : (
              <p className="mt-1.5 text-[0.8125rem] text-textmuted dark:text-white/45">
                No description.
              </p>
            )}
          </div>
        </div>

        <footer className="flex items-center justify-end gap-2 border-t border-defaultborder/50 px-5 py-3 dark:border-white/[0.06]">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 items-center rounded-xl border border-defaultborder/70 px-4 text-[0.75rem] font-semibold text-defaulttextcolor transition-colors hover:bg-defaultbackground dark:border-white/[0.08] dark:hover:bg-white/5"
          >
            Close
          </button>
          {canComplete && taskId ? (
            <button
              type="button"
              onClick={() => onComplete(taskId)}
              className="inline-flex min-h-11 items-center rounded-xl bg-teal-600 px-4 text-[0.75rem] font-semibold text-white transition-colors hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-teal-950"
            >
              Mark complete
            </button>
          ) : null}
        </footer>
      </div>
    </div>
  );
}
