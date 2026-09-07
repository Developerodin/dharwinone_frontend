"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import TiptapEditor from "@/shared/data/forms/form-editors/tiptapeditor";
import CreatableSelect from "react-select/creatable";
import type { GroupBase, StylesConfig } from "react-select";
import { atsSelectClassNames, atsSelectStyles } from "@/shared/lib/reactSelectTheme";
import { YmdFilterDateInput } from "@/shared/components/filters/YmdFilterDateInput";
import { formatYmdLocal, parseYmdLocal } from "@/shared/lib/leave-date-range";
import {
  PROJECT_FORM_FIELDS,
  type ProjectFormFieldConfig,
  type SelectOption,
} from "@/shared/data/apps/projects/projectFormConfig";
import { multiselectdata } from "@/shared/data/apps/projects/createprojectdata";
import Swal from "sweetalert2";
import { enhanceProjectBrief } from "@/shared/lib/api/pmAssistant";
import { listUsers } from "@/shared/lib/api/users";
import {
  BriefEnhancedReviewModal,
  type BriefRegenerateInput,
} from "@/shared/components/pm/BriefEnhancedReviewModal";

/** Placeholder matches the 38px control height so client-only controls do not shift layout on hydration. */
const controlSkeleton = () => (
  <div className="h-[38px] rounded-lg border border-defaultborder bg-bodybg" aria-hidden />
);

const Select = dynamic(() => import("react-select"), { ssr: false, loading: controlSkeleton });
const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false, loading: controlSkeleton });

/** Muted helper/hint text. Token-based so both themes clear 4.5:1 (hex greys did not). */
const MUTED = "text-[0.75rem] text-defaulttextcolor/70 dark:text-defaulttextcolor/55";

/**
 * Field error message. One component instead of 13 copies of `invalid-feedback d-block`,
 * which styled nothing — those Bootstrap classes have no rules in this codebase.
 * `--danger` (#E6533C) is only 3.6:1 on the light card, so light mode uses a darker red.
 */
function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div id={id} role="alert" className="mt-1 text-[0.75rem] text-[#b42318] dark:text-danger">
      {children}
    </div>
  );
}

/** Red outline for react-select, whose control is rendered inside the wrapper we can class. */
const selectErrorClass = "[&_.Select2__control]:!border-danger";

/**
 * Form values hold `Date | ISO string | null`, but the shared From/To input speaks `yyyy-mm-dd`.
 * Parsing through `Date` first (rather than slicing an ISO string) keeps the calendar day the user
 * sees identical to what the old picker showed, since stored ISO timestamps are UTC.
 */
function toYmd(value: unknown): string {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(d.getTime()) ? "" : formatYmdLocal(d);
}

/** Server-searched — org can exceed any client-side prefetch cap (see TASK_LIMIT truncation
 *  bug in the task-board Assignees picker), so assignable users are never fully loaded up front. */
function loadAssignedUserOptions(
  inputValue: string,
  callback: (options: SelectOption[]) => void
) {
  listUsers({ search: inputValue || undefined, limit: 20, status: "active" })
    .then((res) => {
      callback(
        (res.results ?? []).map((u) => ({
          value: u.id ?? u._id ?? "",
          label: u.name || u.email,
        }))
      );
    })
    .catch(() => callback([]));
}

export type ProjectFormValues = Record<
  string,
  | string
  | number
  | null
  | undefined
  | SelectOption
  | SelectOption[]
  | Date
  | unknown
>;

export interface DynamicProjectFormProps {
  values: ProjectFormValues;
  onChange: (name: string, value: unknown) => void;
  /** Team group options for “Project team(s)” multiselect (default: multiselectdata from createprojectdata) */
  assignedToOptions?: SelectOption[];
  /** Show a spinner in “Project team(s)” while the parent is still fetching teams. */
  assignedTeamsLoading?: boolean;
  /** Field-level errors */
  errors?: Record<string, string>;
  /** Disable all inputs (e.g. view mode) */
  disabled?: boolean;
  /**
   * When set, “Project team(s)” shows a create flow. Resolve with `{ value, label }` (new team id + name);
   * parent should refresh options and persist via API.
   */
  onCreateTeamGroup?: (name: string) => Promise<SelectOption>;
  /** When true, show “Enhance with AI” on the project description (requires PM assistant + server OpenAI). */
  briefAiEnhanceEnabled?: boolean;
}

const defaultAssignedToOptions = multiselectdata.map((o) => ({
  value: o.value,
  label: o.label,
}));

/** Portal target — menu renders on body so it is not clipped by section transforms/cards. */
const selectPortalTargetProps: {
  menuPortalTarget?: HTMLElement;
  menuPosition?: "fixed";
} =
  typeof document !== "undefined"
    ? { menuPortalTarget: document.body, menuPosition: "fixed" }
    : {};

const pmFormSelectStyles: StylesConfig<SelectOption, boolean, GroupBase<SelectOption>> = {
  ...atsSelectStyles<SelectOption, boolean>(),
  menuPortal: (base) => ({ ...base, zIndex: 10050 }),
};

/** Spreading the union-typed portal props widens react-select's option generic to `unknown`,
 *  so the plain <Select>/<AsyncSelect> call sites need the styles re-cast. Every option is a
 *  SelectOption at runtime. */
const pmFormSelectStylesUnknown = pmFormSelectStyles as StylesConfig<
  unknown,
  boolean,
  GroupBase<unknown>
>;

/** Shared with every other `atsSelectStyles` consumer — see `atsSelectClassNames`. */
const pmFormSelectClassNames = atsSelectClassNames;

function getGridClass(colSpan: 4 | 6 | 12 = 6): string {
  return `xl:col-span-${colSpan} col-span-12`;
}

const INTAKE_FIELD_NAMES = PROJECT_FORM_FIELDS.filter((f) => f.intake).map(
  (f) => f.name
);

function stripBriefPlain(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/** Plain text for preview dialogs (prefer DOM textContent when available). */
function htmlToPreviewPlain(html: string): string {
  if (!html || typeof html !== "string") return "";
  if (typeof document !== "undefined") {
    const d = document.createElement("div");
    d.innerHTML = html;
    return (d.textContent ?? d.innerText ?? "").replace(/\u00a0/g, " ").replace(/\s+\n/g, "\n").trim();
  }
  return stripBriefPlain(html);
}

function sectionHeadingId(title: string) {
  return `pm-form-section-${title.replace(/\s+/g, "-").toLowerCase()}`;
}

function ProjectFormSection({
  title,
  hint,
  hintPlacement = "inline",
  animationDelayMs = 0,
  children,
}: {
  title: string;
  hint?: string;
  /** `callout`: full-width note under the title (better for long copy). `inline`: hint beside title on wide screens. */
  hintPlacement?: "inline" | "callout";
  animationDelayMs?: number;
  children: React.ReactNode;
}) {
  const hid = sectionHeadingId(title);
  const callout = hint && hintPlacement === "callout";
  const inlineHint = hint && hintPlacement === "inline";

  return (
    <section
      className="overflow-visible rounded-xl border border-gray-200/90 bg-[rgb(var(--default-background))]/90 shadow-defaultshadow dark:border-white/10 dark:bg-bodybg2/35 motion-safe:animate-pm-section-in motion-reduce:animate-none px-4 py-4 sm:px-5 sm:py-5"
      style={{ animationDelay: `${animationDelayMs}ms` }}
      aria-labelledby={hid}
    >
      <header
        className={`border-s-[3px] border-teal-500 ps-3 ${callout ? "mb-3" : "mb-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4"}`}
      >
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h2 id={hid} className="m-0 text-[1rem] font-semibold leading-snug tracking-tight text-defaulttextcolor">
            {title}
          </h2>
        </div>
        {inlineHint ? (
          <p className="m-0 max-w-2xl text-[0.75rem] leading-snug text-defaulttextcolor/70 dark:text-defaulttextcolor/55 sm:text-end">
            {hint}
          </p>
        ) : null}
      </header>
      {callout ? (
        <div className="mb-4 flex gap-2.5 rounded-lg border border-teal-500/20 bg-gradient-to-br from-teal-500/[0.07] via-white/80 to-slate-50/90 px-3.5 py-2.5 dark:border-teal-400/20 dark:from-teal-500/10 dark:via-bodybg2/50 dark:to-slate-950/40">
          <span
            className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-teal-600/10 text-teal-700 dark:text-teal-300"
            aria-hidden
          >
            <i className="ri-lightbulb-line text-base" />
          </span>
          <p className="m-0 flex-1 text-[0.8125rem] leading-relaxed text-defaulttextcolor/85 dark:text-defaulttextcolor/75">{hint}</p>
        </div>
      ) : null}
      <div className="grid grid-cols-12 gap-4 overflow-visible">{children}</div>
    </section>
  );
}

export function DynamicProjectForm({
  values,
  onChange,
  assignedToOptions = defaultAssignedToOptions,
  assignedTeamsLoading = false,
  errors = {},
  disabled = false,
  onCreateTeamGroup,
  briefAiEnhanceEnabled = false,
}: DynamicProjectFormProps) {
  const [tagInputValue, setTagInputValue] = useState("");
  const [briefEnhanceLoading, setBriefEnhanceLoading] = useState(false);
  const [teamCreateOpen, setTeamCreateOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [teamCreateError, setTeamCreateError] = useState<string | null>(null);
  const [teamCreateSubmitting, setTeamCreateSubmitting] = useState(false);
  const [showIntake, setShowIntake] = useState(() =>
    INTAKE_FIELD_NAMES.length
      ? INTAKE_FIELD_NAMES.some((n) => {
          const v = values[n];
          return typeof v === "string" && v.trim().length > 0;
        })
      : false
  );

  type BriefReviewState = {
    open: boolean;
    busy: boolean;
    error: string | null;
    baseHtml: string;
    projectName?: string;
    projectManager?: string;
    clientStakeholder?: string;
    plainBefore: string;
    plainAfter: string;
    enhancedHtml: string;
    contextLines: string[];
    emptyEditorExplain: boolean;
  };

  const [briefReview, setBriefReview] = useState<BriefReviewState | null>(null);
  const briefReviewRef = useRef<BriefReviewState | null>(null);

  useEffect(() => {
    briefReviewRef.current = briefReview;
  }, [briefReview]);

  const handleChange = useCallback(
    (name: string) => (value: unknown) => {
      onChange(name, value);
    },
    [onChange]
  );

  const handleBriefRegenerate = useCallback(async (input: BriefRegenerateInput) => {
    const snap = briefReviewRef.current;
    if (!snap?.open) return;
    setBriefReview({ ...snap, busy: true, error: null });
    try {
      const out = await enhanceProjectBrief({
        html: snap.baseHtml,
        ...(snap.projectName ? { projectName: snap.projectName } : {}),
        ...(snap.projectManager ? { projectManager: snap.projectManager } : {}),
        ...(snap.clientStakeholder ? { clientStakeholder: snap.clientStakeholder } : {}),
        previousEnhancedHtml: snap.enhancedHtml,
        ...(input.refinementInstructions ? { refinementInstructions: input.refinementInstructions } : {}),
        ...(input.feedbackRating || input.feedbackComment
          ? {
              feedback: {
                ...(input.feedbackRating ? { rating: input.feedbackRating } : {}),
                ...(input.feedbackComment ? { comment: input.feedbackComment } : {}),
              },
            }
          : {}),
      });
      setBriefReview((prev) =>
        prev
          ? {
              ...prev,
              busy: false,
              error: null,
              enhancedHtml: out.enhancedHtml,
              plainAfter: htmlToPreviewPlain(out.enhancedHtml),
            }
          : null
      );
    } catch (e: unknown) {
      const msg =
        e && typeof e === "object" && "response" in e
          ? (e as { response?: { data?: { message?: string } } }).response?.data?.message
          : e instanceof Error
            ? e.message
            : "Could not regenerate the brief.";
      setBriefReview((prev) =>
        prev ? { ...prev, busy: false, error: typeof msg === "string" ? msg : "Could not regenerate the brief." } : null
      );
    }
  }, []);

  const handleBriefEnhance = useCallback(async () => {
    if (!briefAiEnhanceEnabled || disabled) return;
    const html = String(values.description ?? "");
    setBriefEnhanceLoading(true);
    try {
      const projectName = String(values.name ?? "").trim();
      const projectManager = String(values.projectManager ?? "").trim();
      const clientStakeholder = String(values.clientStakeholder ?? "").trim();
      const out = await enhanceProjectBrief({
        html,
        ...(projectName ? { projectName } : {}),
        ...(projectManager ? { projectManager } : {}),
        ...(clientStakeholder ? { clientStakeholder } : {}),
      });

      const plainBefore = htmlToPreviewPlain(html);
      const plainAfter = htmlToPreviewPlain(out.enhancedHtml);
      const contextLines: string[] = [];
      if (projectName) contextLines.push(`Project name: ${projectName}`);
      if (projectManager) contextLines.push(`PM label: ${projectManager}`);
      if (clientStakeholder) contextLines.push(`Stakeholder: ${clientStakeholder}`);

      setBriefReview({
        open: true,
        busy: false,
        error: null,
        baseHtml: html,
        ...(projectName ? { projectName } : {}),
        ...(projectManager ? { projectManager } : {}),
        ...(clientStakeholder ? { clientStakeholder } : {}),
        plainBefore,
        plainAfter,
        enhancedHtml: out.enhancedHtml,
        contextLines,
        emptyEditorExplain: plainBefore.length === 0,
      });
    } catch (e: unknown) {
      const msg =
        e && typeof e === "object" && "response" in e
          ? (e as { response?: { data?: { message?: string } } }).response?.data?.message
          : e instanceof Error
            ? e.message
            : "Could not enhance the brief.";
      await Swal.fire({
        icon: "error",
        title: "Enhance failed",
        text: typeof msg === "string" ? msg : "Could not enhance the brief.",
      });
    } finally {
      setBriefEnhanceLoading(false);
    }
  }, [
    briefAiEnhanceEnabled,
    disabled,
    values.description,
    values.name,
    values.projectManager,
    values.clientStakeholder,
  ]);

  const handleBriefReviewClose = useCallback(() => {
    if (briefReviewRef.current?.busy) return;
    setBriefReview(null);
  }, []);

  const handleBriefReviewApply = useCallback(() => {
    const snap = briefReviewRef.current;
    if (!snap?.open || snap.busy) return;
    handleChange("description")(snap.enhancedHtml);
    setBriefReview(null);
    void Swal.fire({
      icon: "success",
      title: "Brief updated",
      timer: 1600,
      showConfirmButton: false,
    });
  }, [handleChange]);

  const renderField = (field: ProjectFormFieldConfig) => {
    const value = values[field.name];
    const error = errors[field.name];
    const colClass = getGridClass(field.colSpan);
    const errorId = `${field.name}-error`;
    /** Spread onto native inputs so the error is announced and the field reads as invalid. */
    const a11yError = {
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId : undefined,
    } as const;

    if (field.type === "textarea") {
      const tv = (value as string) ?? "";
      return (
        <div key={field.name} className={colClass}>
          <label htmlFor={field.name} className="form-label">
            {field.label}
            {field.required && " *"}
          </label>
          {field.helpText ? <p className={`${MUTED} mb-1`}>{field.helpText}</p> : null}
          <textarea
            id={field.name}
            className={`form-control ${error ? "!border-danger" : ""}`}
            placeholder={field.placeholder}
            rows={field.rows ?? 4}
            value={tv}
            onChange={(e) => handleChange(field.name)(e.target.value)}
            disabled={disabled}
            {...a11yError}
          />
          {error && <FieldError id={errorId}>{error}</FieldError>}
        </div>
      );
    }

    if (field.type === "text") {
      return (
        <div key={field.name} className={`${colClass} flex flex-col`}>
          <label htmlFor={field.name} className="form-label">
            {field.label}
            {field.required && " *"}
          </label>
          {field.helpText ? <p className={`${MUTED} mb-1`}>{field.helpText}</p> : null}
          <input
            type="text"
            id={field.name}
            className={`form-control mt-auto ${error ? "!border-danger" : ""}`}
            placeholder={field.placeholder}
            value={(value as string) ?? ""}
            onChange={(e) => handleChange(field.name)(e.target.value)}
            disabled={disabled}
            required={field.required}
            {...a11yError}
          />
          {error && <FieldError id={errorId}>{error}</FieldError>}
        </div>
      );
    }

    if (field.type === "select") {
      const options = field.options ?? [];
      const selectValue =
        typeof value === "object" && value !== null && "value" in value
          ? (value as SelectOption)
          : options.find((o) => o.value === value) ?? null;
      return (
        <div key={field.name} className={colClass}>
          <label htmlFor={field.name} className="form-label">
            {field.label}
            {field.required && " *"}
          </label>
          {field.helpText ? <p className={`${MUTED} mb-1`}>{field.helpText}</p> : null}
          <Select
            inputId={field.name}
            name={field.name}
            options={options}
            className={`js-states ${error ? selectErrorClass : ""}`}
            classNamePrefix="Select2"
            placeholder={field.placeholder}
            value={selectValue}
            onChange={(opt) => handleChange(field.name)(opt)}
            isDisabled={disabled}
            menuPlacement="auto"
            aria-invalid={error ? true : undefined}
            aria-errormessage={error ? errorId : undefined}
            {...selectPortalTargetProps}
            classNames={pmFormSelectClassNames}
            styles={pmFormSelectStylesUnknown}
          />
          {error && <FieldError id={errorId}>{error}</FieldError>}
        </div>
      );
    }

    if (field.type === "multiselect") {
      const options =
        field.name === "assignedTeams" ? assignedToOptions : (field.options ?? []);
      const multiValue = Array.isArray(value) ? (value as SelectOption[]) : [];
      return (
        <div key={field.name} className={colClass}>
          <label htmlFor={field.name} className="form-label">
            {field.label}
            {field.required && " *"}
          </label>
          {field.helpText ? <p className={`${MUTED} mb-1`}>{field.helpText}</p> : null}
          {field.name === "assignedUsers" ? (
            <AsyncSelect
              isMulti
              inputId={field.name}
              name={field.name}
              cacheOptions
              defaultOptions
              loadOptions={loadAssignedUserOptions}
              className={`js-states ${error ? selectErrorClass : ""}`}
              classNamePrefix="Select2"
              value={multiValue}
              onChange={(opt) => handleChange(field.name)(Array.isArray(opt) ? opt : [])}
              isDisabled={disabled}
              menuPlacement="auto"
              aria-invalid={error ? true : undefined}
              aria-errormessage={error ? errorId : undefined}
              {...selectPortalTargetProps}
              classNames={pmFormSelectClassNames}
              styles={pmFormSelectStylesUnknown}
            />
          ) : (
            <Select
              isMulti
              inputId={field.name}
              name={field.name}
              options={options}
              isLoading={field.name === "assignedTeams" && assignedTeamsLoading}
              className={`js-states ${error ? selectErrorClass : ""}`}
              classNamePrefix="Select2"
              value={multiValue}
              onChange={(opt) => handleChange(field.name)(Array.isArray(opt) ? opt : [])}
              isDisabled={disabled}
              menuPlacement="auto"
              aria-invalid={error ? true : undefined}
              aria-errormessage={error ? errorId : undefined}
              {...selectPortalTargetProps}
              classNames={pmFormSelectClassNames}
              styles={pmFormSelectStylesUnknown}
            />
          )}
          {error && <FieldError id={errorId}>{error}</FieldError>}
          {field.name === "assignedTeams" && onCreateTeamGroup && !disabled ? (
            <div className="mt-2 space-y-2">
              <button
                type="button"
                className={`inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-md border px-3 py-2 text-[0.8125rem] font-medium transition-all duration-200 ease-out motion-reduce:transition-none ${
                  teamCreateOpen
                    ? "border-teal-500/40 bg-teal-500/5 text-teal-800 dark:text-teal-200"
                    : "border-defaultborder text-defaulttextcolor hover:border-teal-500/50 hover:bg-teal-500/[0.04] active:scale-[0.98] motion-reduce:active:scale-100"
                }`}
                aria-expanded={teamCreateOpen}
                onClick={() => {
                  if (teamCreateOpen) {
                    setTeamCreateOpen(false);
                    setNewTeamName("");
                    setTeamCreateError(null);
                  } else {
                    setTeamCreateOpen(true);
                    setTeamCreateError(null);
                    setNewTeamName("");
                  }
                }}
              >
                <i className={`ri-team-line ${teamCreateOpen ? "" : "text-teal-600 dark:text-teal-400"}`} aria-hidden />
                {teamCreateOpen ? "Close new team" : "Create new team"}
              </button>
              <div
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  teamCreateOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0">
                  {teamCreateOpen ? (
                    <div
                      key="team-create-panel"
                      className="motion-safe:animate-pm-panel-in motion-reduce:animate-none space-y-2 rounded-lg border border-slate-200/90 border-l-4 border-l-teal-500 bg-slate-50/95 p-3 shadow-sm dark:border-white/10 dark:bg-slate-950/50"
                      role="region"
                      aria-label="Create new team"
                    >
                      <label
                        htmlFor="dynamic-project-new-team-name"
                        className="form-label mb-0 text-[0.8125rem] text-defaulttextcolor"
                      >
                        New team name
                      </label>
                      <input
                        id="dynamic-project-new-team-name"
                        type="text"
                        className="form-control form-control-sm transition-shadow duration-200 focus:shadow-[0_0_0_3px_rgba(20,184,166,0.2)]"
                        placeholder="e.g. Team Mobile"
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                        disabled={teamCreateSubmitting}
                        maxLength={120}
                        autoComplete="off"
                      />
                      {teamCreateError ? (
                        <div className="text-danger text-[0.75rem] motion-safe:animate-pm-panel-in motion-reduce:animate-none">
                          {teamCreateError}
                        </div>
                      ) : null}
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        <button
                          type="button"
                          className="ti-btn ti-btn-primary !text-[0.8125rem] !min-h-[2.75rem] !py-2 !px-3 transition-transform duration-150 active:scale-[0.97] motion-reduce:active:scale-100"
                          disabled={teamCreateSubmitting || !newTeamName.trim()}
                          onClick={() => {
                            void (async () => {
                              const name = newTeamName.trim();
                              if (!name) {
                                setTeamCreateError("Enter a team name.");
                                return;
                              }
                              setTeamCreateSubmitting(true);
                              setTeamCreateError(null);
                              try {
                                const opt = await onCreateTeamGroup(name);
                                const next = [...multiValue, opt];
                                handleChange(field.name)(next);
                                setTeamCreateOpen(false);
                                setNewTeamName("");
                              } catch (e: unknown) {
                                const msg =
                                  e &&
                                  typeof e === "object" &&
                                  "response" in e &&
                                  (e as { response?: { data?: { message?: string } } }).response?.data
                                    ?.message
                                    ? String(
                                        (e as { response: { data: { message: string } } }).response.data
                                          .message
                                      )
                                    : e instanceof Error
                                      ? e.message
                                      : "Could not create team.";
                                setTeamCreateError(msg);
                              } finally {
                                setTeamCreateSubmitting(false);
                              }
                            })();
                          }}
                        >
                          {teamCreateSubmitting ? (
                            <span className="inline-flex items-center gap-2">
                              <span
                                className="inline-block size-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none"
                                aria-hidden
                              />
                              Creating…
                            </span>
                          ) : (
                            "Create & select"
                          )}
                        </button>
                        <button
                          type="button"
                          className="ti-btn ti-btn-light !text-[0.8125rem] !min-h-[2.75rem] !py-2 !px-3 transition-transform duration-150 active:scale-[0.98] motion-reduce:active:scale-100"
                          disabled={teamCreateSubmitting}
                          onClick={() => {
                            setTeamCreateOpen(false);
                            setNewTeamName("");
                            setTeamCreateError(null);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="min-h-0" aria-hidden />
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      );
    }

    if (field.type === "date") {
      // Start/End are a range: each caps the other in the picker, so an inverted range cannot be
      // entered in the first place — `validateProjectForm` stays as the backstop for typed input.
      const isRangeEnd = field.name === "endDate";
      const otherBound = toYmd(values[isRangeEnd ? "startDate" : "endDate"]);
      return (
        <div key={field.name} className={colClass}>
          {field.helpText ? <p className={`${MUTED} mb-1 mt-0`}>{field.helpText}</p> : null}
          <YmdFilterDateInput
            label={`${field.label}${field.required ? " *" : ""}`}
            inputId={field.name}
            portalId={`pm-project-form-datepicker-portal-${field.name}`}
            popperClassName="!z-[10050]"
            value={toYmd(value)}
            minDate={isRangeEnd ? otherBound || undefined : undefined}
            maxDate={isRangeEnd ? undefined : otherBound || undefined}
            rangeError={error ?? null}
            labelClassName="form-label"
            inputClassName={`form-control w-full ${error ? "!border-danger" : ""}`}
            // Stored as a local Date so `buildPayload`'s toISOString keeps its existing meaning.
            onCommit={(ymd) => handleChange(field.name)(ymd ? parseYmdLocal(ymd) : null)}
          />
        </div>
      );
    }

    if (field.type === "richtext") {
      const html = (value as string) ?? "";
      const isProjectBrief = field.name === "description";

      if (isProjectBrief) {
        return (
          <div key={field.name} className={colClass}>
            <fieldset className="m-0 min-w-0 border-0 p-0">
              <legend className="sr-only">
                Project description — narrative and scope in rich text
                {field.required ? " (required)" : ""}
              </legend>
              <div className="mb-2.5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[0.8125rem] font-semibold text-defaulttextcolor">{field.label}</span>
                    <span className="rounded bg-slate-500/10 px-1.5 py-0.5 text-[0.75rem] font-medium uppercase tracking-wide text-defaulttextcolor/70 dark:text-defaulttextcolor/55">
                      Rich text
                    </span>
                  </div>
                  {field.helpText ? (
                    <p className="mb-0 mt-1 max-w-3xl text-[0.75rem] leading-relaxed text-defaulttextcolor/70 dark:text-defaulttextcolor/55">
                      {field.helpText}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                  {briefAiEnhanceEnabled ? (
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-1.5 min-h-[2.75rem] rounded-lg border border-indigo-500/35 bg-indigo-500/[0.08] px-3 py-2 text-[0.8125rem] font-semibold text-indigo-900 shadow-sm transition-all duration-200 hover:border-indigo-500/55 hover:bg-indigo-500/[0.12] active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 disabled:pointer-events-none disabled:opacity-60 dark:text-indigo-100 dark:hover:bg-indigo-500/20"
                      disabled={disabled || briefEnhanceLoading}
                      aria-busy={briefEnhanceLoading}
                      onClick={() => void handleBriefEnhance()}
                    >
                      {briefEnhanceLoading ? (
                        <>
                          <span
                            className="inline-block size-3.5 shrink-0 animate-spin rounded-full border-2 border-indigo-400/40 border-t-indigo-700 motion-reduce:animate-none dark:border-t-indigo-200"
                            aria-hidden
                          />
                          Enhancing…
                        </>
                      ) : (
                        <>
                          <i className="ri-sparkling-2-line text-base" aria-hidden />
                          Enhance with AI
                        </>
                      )}
                    </button>
                  ) : null}
                  <p className="m-0 hidden text-end text-[0.75rem] leading-snug text-defaulttextcolor/70 sm:block sm:max-w-[14rem] dark:text-defaulttextcolor/55">
                    Toolbar formats copy; optional guided fields sit below when enabled.
                  </p>
                </div>
              </div>
              <div
                id="project-description-editor"
                className="overflow-hidden rounded-xl border border-slate-200/95 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.04] transition-[box-shadow,border-color] duration-200 focus-within:border-teal-500/45 focus-within:ring-teal-500/15 motion-reduce:transition-none dark:border-white/10 dark:bg-slate-950/35 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_2px_rgba(0,0,0,0.35)] dark:ring-white/[0.06] dark:focus-within:border-teal-400/40"
              >
                <TiptapEditor
                  content={html}
                  placeholder={field.placeholder}
                  onChange={(htmlContent) => handleChange(field.name)(htmlContent)}
                  editable={!disabled}
                />
              </div>
              <p className="mt-2 mb-0 text-[0.75rem] leading-snug text-defaulttextcolor/70 sm:hidden dark:text-defaulttextcolor/55">
                Use the toolbar for structure; guided prompts appear below when turned on above.
              </p>
              {error && <FieldError id={errorId}>{error}</FieldError>}
            </fieldset>
          </div>
        );
      }

      return (
        <div key={field.name} className={colClass}>
          <label className="form-label">
            {field.label}
            {field.required && " *"}
          </label>
          {field.helpText ? <p className={`${MUTED} mb-1`}>{field.helpText}</p> : null}
          {/* A contenteditable is not a labelable control, so the label is exposed via the group. */}
          <div id="project-description-editor" role="group" aria-label={field.label}>
            <TiptapEditor
              content={html}
              placeholder={field.placeholder}
              onChange={(htmlContent) => handleChange(field.name)(htmlContent)}
              editable={!disabled}
            />
          </div>
          {error && <FieldError id={errorId}>{error}</FieldError>}
        </div>
      );
    }

    if (field.type === "tags") {
      const tagOptions: SelectOption[] = Array.isArray(value)
        ? (value as SelectOption[]).map((t) => ({
            value: typeof t === "string" ? t : String((t as SelectOption).value),
            label: typeof t === "string" ? t : String((t as SelectOption).label),
          }))
        : [];
      const components = { DropdownIndicator: null };
      const addTag = (newTag: string) => {
        const trimmed = newTag.trim();
        if (!trimmed) return;
        if (tagOptions.some((o) => String(o.value).toLowerCase() === trimmed.toLowerCase())) return;
        handleChange(field.name)([
          ...tagOptions,
          { value: trimmed, label: trimmed },
        ]);
        setTagInputValue("");
      };
      return (
        <div key={field.name} className={colClass}>
          <label htmlFor={field.name} className="form-label">
            {field.label}
          </label>
          <p className={`${MUTED} mb-1`}>Press Enter after each tag.</p>
          <CreatableSelect
            inputId={field.name}
            components={components}
            classNamePrefix="Select2"
            isClearable
            isMulti
            menuIsOpen={false}
            placeholder={field.placeholder}
            value={tagOptions}
            inputValue={tagInputValue}
            onInputChange={(v) => setTagInputValue(v ?? "")}
            onKeyDown={(e) => {
              // Always swallow Enter: inside a <form> a bare Enter here would submit the project.
              if (e.key !== "Enter") return;
              e.preventDefault();
              if (tagInputValue.trim()) addTag(tagInputValue);
            }}
            onChange={(newVal) =>
              handleChange(field.name)(Array.isArray(newVal) ? newVal : [])
            }
            onCreateOption={(newTag) => addTag(newTag)}
            isDisabled={disabled}
            {...selectPortalTargetProps}
            classNames={pmFormSelectClassNames}
            styles={pmFormSelectStyles}
          />
          {error && <FieldError id={errorId}>{error}</FieldError>}
        </div>
      );
    }

    return null;
  };

  const visibleFields = PROJECT_FORM_FIELDS.filter(
    (f) => !f.intake || showIntake
  );

  const overviewFields = visibleFields.filter((f) =>
    ["name", "projectManager", "clientStakeholder"].includes(f.name)
  );
  const briefDescFields = visibleFields.filter((f) => f.name === "description");
  const briefIntakeFields = visibleFields.filter((f) => f.intake);
  const scheduleFields = visibleFields.filter((f) =>
    ["startDate", "endDate", "status", "priority"].includes(f.name)
  );
  const rosterFields = visibleFields.filter((f) =>
    ["assignedTeams", "assignedUsers"].includes(f.name)
  );
  const metaFields = visibleFields.filter((f) => f.name === "tags");
  const sectioned = new Set(
    [
      ...overviewFields,
      ...briefDescFields,
      ...briefIntakeFields,
      ...scheduleFields,
      ...rosterFields,
      ...metaFields,
    ].map((f) => f.name)
  );
  const overflowFields = visibleFields.filter((f) => !sectioned.has(f.name));

  return (
    <div className="pm-project-form space-y-6 overflow-visible">
      {briefReview?.open ? (
        <BriefEnhancedReviewModal
          open={briefReview.open}
          onClose={handleBriefReviewClose}
          contextLines={briefReview.contextLines}
          emptyEditorExplain={briefReview.emptyEditorExplain}
          plainCurrent={briefReview.plainBefore}
          plainSuggestion={briefReview.plainAfter}
          busy={briefReview.busy}
          error={briefReview.error}
          onApply={handleBriefReviewApply}
          onRegenerate={handleBriefRegenerate}
        />
      ) : null}
      {INTAKE_FIELD_NAMES.length ? (
        <div
          className="rounded-xl border border-dashed border-teal-500/35 bg-teal-500/[0.04] px-4 py-3 motion-safe:animate-pm-section-in motion-reduce:animate-none dark:border-teal-400/25 dark:bg-teal-500/[0.07]"
          style={{ animationDelay: "0ms" }}
        >
          <button
            type="button"
            className="ti-btn ti-btn-outline-secondary !text-[0.8125rem] !min-h-[2.75rem] !py-2 !px-3 !mb-0 transition-transform duration-200 ease-out hover:-translate-y-px motion-reduce:transform-none active:scale-[0.98] motion-reduce:active:scale-100"
            onClick={() => setShowIntake((s) => !s)}
            disabled={disabled}
            aria-expanded={showIntake}
          >
            {showIntake ? (
              <>
                <i className="ri-arrow-up-s-line me-1.5" aria-hidden />
                Hide guided brief questions
              </>
            ) : (
              <>
                <i className="ri-questionnaire-line me-1.5" aria-hidden />
                Add guided brief questions (recommended)
              </>
            )}
          </button>
          <p className="mb-0 mt-2 max-w-3xl text-[0.75rem] leading-relaxed text-defaulttextcolor/70 dark:text-defaulttextcolor/55">
            Optional prompts strengthen descriptions for PM assistant and handover.
          </p>
        </div>
      ) : null}

      <ProjectFormSection
        title="Overview"
        hint="Project name, PM label, and sponsor — what appears on the record."
        animationDelayMs={40}
      >
        {overviewFields.map((field) => renderField(field))}
      </ProjectFormSection>

      <ProjectFormSection
        title="Brief"
        hint="Start with a clear narrative here. For AI and handover, turn on guided brief questions at the top of the form — those answers are merged into the stored description."
        hintPlacement="callout"
        animationDelayMs={110}
      >
        {briefDescFields.map((field) => renderField(field))}
        {showIntake ? (
          <>
            <div className="col-span-12 mt-1 flex items-center gap-2 border-t border-dashed border-slate-200/90 pt-4 dark:border-white/10">
              <span className="flex size-8 items-center justify-center rounded-lg bg-slate-500/10 text-slate-600 dark:text-white/55">
                <i className="ri-list-check-2 text-lg" aria-hidden />
              </span>
              <div>
                <h3 className="m-0 text-[0.8125rem] font-semibold text-defaulttextcolor">Guided prompts</h3>
                <p className="m-0 text-[0.75rem] leading-snug text-defaulttextcolor/70 dark:text-defaulttextcolor/55">
                  Structured answers — appended under a delimiter in the saved brief.
                </p>
              </div>
            </div>
            {briefIntakeFields.map((field) => renderField(field))}
          </>
        ) : null}
      </ProjectFormSection>

      <ProjectFormSection
        title="Timeline & priority"
        hint="Schedule and how this work is triaged."
        animationDelayMs={180}
      >
        {scheduleFields.map((field) => renderField(field))}
      </ProjectFormSection>

      <ProjectFormSection
        title="Roster"
        hint="Link squads from the team directory and individual assignees."
        animationDelayMs={250}
      >
        {rosterFields.map((field) => renderField(field))}
      </ProjectFormSection>

      <ProjectFormSection
        title="Labels"
        hint="Tags for filtering in the project list."
        animationDelayMs={320}
      >
        {metaFields.map((field) => renderField(field))}
        {overflowFields.map((field) => renderField(field))}
      </ProjectFormSection>
    </div>
  );
}

export default DynamicProjectForm;
