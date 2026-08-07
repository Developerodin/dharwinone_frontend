"use client";

import DevTicketModulePageFields from "@/shared/components/dev-tickets/dev-ticket-module-page-fields";
import {
  LABEL_CONFIG,
  PRIORITY_CONFIG,
  SEVERITY_CONFIG,
  DEV_TICKET_ATTACHMENT_ACCEPT,
  DEV_TICKET_ATTACHMENT_HINT,
  formatFileSize,
  getInitials,
} from "@/shared/components/dev-tickets/dev-ticket-config";
import {
  DEV_TICKET_CATEGORIES,
  DEV_TICKET_DEFAULT_TESTER,
  DEV_TICKET_LABELS,
  DEV_TICKET_PLATFORMS,
  DEV_TICKET_PLATFORM_LABELS,
  type DevTicket,
  type DevTicketCategory,
  type DevTicketLabel,
  type DevTicketPlatform,
} from "@/shared/lib/api/devTickets";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";

export type CreateDevTicketFormState = {
  title: string;
  description: string;
  stepsToReproduce: string;
  pageUrl: string;
  priority: DevTicket["priority"];
  severity: DevTicket["severity"];
  category: DevTicketCategory;
  module: string;
  environment: DevTicket["environment"];
  labels: DevTicketLabel[];
  platform: DevTicketPlatform;
};

type CreateDevTicketModalProps = {
  open: boolean;
  onClose: () => void;
  form: CreateDevTicketFormState;
  onFormChange: (updater: (prev: CreateDevTicketFormState) => CreateDevTicketFormState) => void;
  attachments: File[];
  onAttachmentsChange: (files: File[]) => void;
  attachmentErrors: string[];
  onAddFiles: (files: File[]) => void;
  creating: boolean;
  onSubmit: () => void;
};

const FIELD_CLASS = "form-control form-control-block !min-h-[2.375rem]";
const SELECT_CLASS = `${FIELD_CLASS} !py-1.5`;

function SectionHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-3 border-b border-defaultborder/50 pb-2 dark:border-white/10">
      <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#8c9097]">{title}</h3>
      {hint ? <p className="mt-0.5 text-[0.6875rem] leading-relaxed text-[#8c9097]/90">{hint}</p> : null}
    </div>
  );
}

function FieldHint({ children, invalid }: { children: React.ReactNode; invalid?: boolean }) {
  return (
    <p className={`mt-1 text-[0.6875rem] ${invalid ? "text-danger" : "text-[#8c9097]"}`}>{children}</p>
  );
}

export default function CreateDevTicketModal({
  open,
  onClose,
  form,
  onFormChange,
  attachments,
  onAttachmentsChange,
  attachmentErrors,
  onAddFiles,
  creating,
  onSubmit,
}: CreateDevTicketModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const titleLen = form.title.trim().length;
  const descLen = form.description.trim().length;
  const titleInvalid = showValidation && titleLen < 5;
  const descInvalid = showValidation && descLen < 10;
  const canSubmit = titleLen >= 5 && descLen >= 10 && !creating;

  useEffect(() => {
    if (!open) {
      setShowValidation(false);
      setDragOver(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => titleInputRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !creating) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, creating, onClose]);

  const handleSubmit = useCallback(() => {
    setShowValidation(true);
    if (titleLen < 5 || descLen < 10) return;
    onSubmit();
  }, [descLen, onSubmit, titleLen]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[105] flex items-end justify-center bg-black/55 p-0 sm:items-start sm:p-4 sm:pt-[4vh]"
      role="presentation"
      onClick={() => {
        if (!creating) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-xl bg-white shadow-2xl dark:bg-bodybg sm:max-h-[min(90dvh,860px)] sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-defaultborder/70 px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <h2 id={titleId} className="text-[1rem] font-semibold leading-tight text-defaulttextcolor">
              Create dev ticket
            </h2>
            <p className="mt-1 max-w-md text-[0.75rem] leading-relaxed text-[#8c9097]">
              Report a bug or request. Required fields are marked. Attachments and routing can be adjusted later.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={creating}
            className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light shrink-0"
            aria-label="Close create ticket dialog"
          >
            <i className="ri-close-line" aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
          <div className="space-y-6">
            <section>
              <SectionHeader title="Issue" hint="What broke, and how to reproduce it." />
              <div className="space-y-4">
                <div>
                  <label className="form-label" htmlFor="create-ticket-title">
                    Title <span className="text-danger" aria-hidden>*</span>
                  </label>
                  <input
                    ref={titleInputRef}
                    id="create-ticket-title"
                    className={`${FIELD_CLASS} ${titleInvalid ? "!border-danger" : ""}`}
                    value={form.title}
                    placeholder="Short summary of the issue"
                    maxLength={200}
                    onChange={(e) => onFormChange((f) => ({ ...f, title: e.target.value }))}
                    aria-invalid={titleInvalid}
                    aria-describedby="create-ticket-title-hint"
                  />
                  <FieldHint invalid={titleInvalid}>
                    {titleInvalid ? "At least 5 characters required." : `${titleLen}/200 · min 5 characters`}
                  </FieldHint>
                </div>

                <div>
                  <label className="form-label" htmlFor="create-ticket-description">
                    Description <span className="text-danger" aria-hidden>*</span>
                  </label>
                  <textarea
                    id="create-ticket-description"
                    className={`form-control ${descInvalid ? "!border-danger" : ""}`}
                    rows={4}
                    value={form.description}
                    placeholder="Expected behavior, actual behavior, and any error messages"
                    onChange={(e) => onFormChange((f) => ({ ...f, description: e.target.value }))}
                    aria-invalid={descInvalid}
                    aria-describedby="create-ticket-description-hint"
                  />
                  <FieldHint invalid={descInvalid}>
                    {descInvalid ? "At least 10 characters required." : `${descLen} characters · min 10`}
                  </FieldHint>
                </div>

                <div>
                  <label className="form-label" htmlFor="create-ticket-steps">
                    Steps to reproduce
                  </label>
                  <textarea
                    id="create-ticket-steps"
                    className="form-control"
                    rows={3}
                    value={form.stepsToReproduce}
                    placeholder="1. Go to…&#10;2. Click…&#10;3. See error"
                    onChange={(e) => onFormChange((f) => ({ ...f, stepsToReproduce: e.target.value }))}
                  />
                </div>
              </div>
            </section>

            <section>
              <SectionHeader title="Evidence" hint="Screenshots, logs, or recordings help triage faster." />
              <div
                className={`cursor-pointer rounded-lg border-2 border-dashed px-4 py-5 text-center transition-colors ${
                  dragOver
                    ? "border-primary bg-primary/5"
                    : "border-defaultborder/80 bg-slate-50/50 hover:border-primary/40 hover:bg-primary/[0.02] dark:bg-white/[0.02]"
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  onAddFiles(Array.from(e.dataTransfer.files));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Upload attachments"
              >
                <i className="ri-upload-cloud-2-line mb-2 block text-[1.75rem] text-primary/60" aria-hidden />
                <p className="mb-1 text-[0.8125rem] font-medium text-defaulttextcolor">
                  Drag files here or <span className="text-primary underline">browse</span>
                </p>
                <p className="mb-0 text-[0.6875rem] text-[#8c9097]">{DEV_TICKET_ATTACHMENT_HINT}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  accept={DEV_TICKET_ATTACHMENT_ACCEPT}
                  onChange={(e) => onAddFiles(Array.from(e.target.files ?? []))}
                />
              </div>

              {attachmentErrors.length > 0 ? (
                <p className="mt-2 text-[0.75rem] text-danger" role="alert">
                  {attachmentErrors.join(", ")}
                </p>
              ) : null}

              {attachments.length > 0 ? (
                <ul className="mt-3 space-y-2" aria-label="Selected attachments">
                  {attachments.map((f, i) => (
                    <li
                      key={`${f.name}-${i}`}
                      className="flex items-center gap-2 rounded-md border border-defaultborder/70 bg-white px-3 py-2 dark:bg-white/[0.02]"
                    >
                      <i className="ri-file-line shrink-0 text-[#8c9097]" aria-hidden />
                      <span className="min-w-0 flex-1 truncate text-[0.8125rem]">{f.name}</span>
                      <span className="shrink-0 text-[0.6875rem] tabular-nums text-[#8c9097]">{formatFileSize(f.size)}</span>
                      <button
                        type="button"
                        className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light shrink-0"
                        aria-label={`Remove ${f.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAttachmentsChange(attachments.filter((_, j) => j !== i));
                        }}
                      >
                        <i className="ri-close-line" aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>

            <section>
              <SectionHeader title="Classification" />
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div>
                  <label className="form-label" htmlFor="create-ticket-category">
                    Category
                  </label>
                  <select
                    id="create-ticket-category"
                    className={SELECT_CLASS}
                    value={form.category}
                    onChange={(e) => onFormChange((f) => ({ ...f, category: e.target.value as DevTicketCategory }))}
                  >
                    {DEV_TICKET_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="create-ticket-severity">
                    Severity
                  </label>
                  <select
                    id="create-ticket-severity"
                    className={SELECT_CLASS}
                    value={form.severity}
                    onChange={(e) =>
                      onFormChange((f) => ({ ...f, severity: e.target.value as DevTicket["severity"] }))
                    }
                  >
                    {Object.keys(SEVERITY_CONFIG).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="create-ticket-priority">
                    Priority
                  </label>
                  <select
                    id="create-ticket-priority"
                    className={SELECT_CLASS}
                    value={form.priority}
                    onChange={(e) =>
                      onFormChange((f) => ({ ...f, priority: e.target.value as DevTicket["priority"] }))
                    }
                  >
                    {Object.keys(PRIORITY_CONFIG).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="create-ticket-environment">
                    Environment
                  </label>
                  <select
                    id="create-ticket-environment"
                    className={SELECT_CLASS}
                    value={form.environment}
                    onChange={(e) =>
                      onFormChange((f) => ({ ...f, environment: e.target.value as DevTicket["environment"] }))
                    }
                  >
                    <option value="Staging">Staging</option>
                    <option value="Production">Production</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <span className="form-label mb-2 block">Labels</span>
                <div className="flex flex-wrap gap-1.5" role="group" aria-label="Ticket labels">
                  {DEV_TICKET_LABELS.map((lbl) => {
                    const sel = form.labels.includes(lbl);
                    return (
                      <button
                        key={lbl}
                        type="button"
                        aria-pressed={sel}
                        onClick={() =>
                          onFormChange((f) => ({
                            ...f,
                            labels: sel ? f.labels.filter((l) => l !== lbl) : [...f.labels, lbl],
                          }))
                        }
                        className={`badge !rounded-full cursor-pointer transition-colors !text-[0.6875rem] ${
                          sel
                            ? LABEL_CONFIG[lbl].badge
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200/80 dark:bg-white/10 dark:text-white/50 dark:hover:bg-white/15"
                        }`}
                      >
                        {lbl}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <section>
              <SectionHeader title="Location" hint="Where in the product this occurred." />
              <DevTicketModulePageFields
                module={form.module}
                pageUrl={form.pageUrl}
                onModuleChange={(module) => onFormChange((f) => ({ ...f, module }))}
                onPageUrlChange={(pageUrl) => onFormChange((f) => ({ ...f, pageUrl }))}
                selectClassName={SELECT_CLASS}
              />
            </section>

            <section>
              <SectionHeader title="Assignment" hint="Platform routes to the developer; tester is notified on every ticket." />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <span className="form-label mb-2 block" id="create-ticket-platform-label">
                    Platform
                  </span>
                  <div
                    className="inline-flex w-full rounded-lg border border-defaultborder/80 bg-slate-50/80 p-1 dark:border-white/10 dark:bg-white/[0.03]"
                    role="group"
                    aria-labelledby="create-ticket-platform-label"
                  >
                    {DEV_TICKET_PLATFORMS.map((p) => {
                      const active = form.platform === p;
                      return (
                        <button
                          key={p}
                          type="button"
                          aria-pressed={active}
                          onClick={() => onFormChange((f) => ({ ...f, platform: p }))}
                          className={`min-h-[2.25rem] flex-1 rounded-md px-3 text-[0.8125rem] font-medium transition-colors ${
                            active
                              ? "bg-white text-primary shadow-sm dark:bg-bodybg dark:text-primary"
                              : "text-[#8c9097] hover:text-defaulttextcolor"
                          }`}
                        >
                          {DEV_TICKET_PLATFORM_LABELS[p]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="form-label mb-2 block">Tester</span>
                  <div className="flex min-h-[2.75rem] items-center gap-3 rounded-lg border border-defaultborder/70 bg-slate-50/80 px-3 py-2 dark:border-white/10 dark:bg-white/[0.03]">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[0.6875rem] font-semibold text-primary"
                      aria-hidden
                    >
                      {getInitials(DEV_TICKET_DEFAULT_TESTER.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.8125rem] font-medium text-defaulttextcolor">
                        {DEV_TICKET_DEFAULT_TESTER.name}
                      </p>
                      <p className="truncate text-[0.6875rem] text-[#8c9097]">{DEV_TICKET_DEFAULT_TESTER.email}</p>
                    </div>
                    <span className="badge shrink-0 bg-slate-200/70 text-[0.625rem] text-slate-600 dark:bg-white/10 dark:text-white/60">
                      Auto
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-defaultborder/70 bg-slate-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 dark:border-white/10 dark:bg-white/[0.02]">
          <p className="hidden text-[0.6875rem] text-[#8c9097] sm:block">
            Press <kbd className="rounded border border-defaultborder/70 px-1 py-0.5 font-mono text-[0.625rem]">Esc</kbd> to cancel
          </p>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} disabled={creating} className="ti-btn ti-btn-light">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="ti-btn ti-btn-primary min-w-[7.5rem]"
            >
              {creating ? (
                <>
                  <span
                    className="me-1 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                    aria-hidden
                  />
                  Creating…
                </>
              ) : (
                "Create ticket"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
