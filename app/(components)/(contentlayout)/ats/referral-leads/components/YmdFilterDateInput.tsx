"use client";

import dynamic from "next/dynamic";
import { useId, useState } from "react";
import { formatYmdLocal, parseYmdLocal } from "@/shared/lib/leave-date-range";
import { sanitizeReferralLeadsDateInput } from "../utils/sanitizeDateInput.util";

const DatePicker = dynamic(() => import("react-datepicker").then((mod) => mod.default), { ssr: false });

const INVALID_DATE_MESSAGE = "Enter a valid date (YYYY-MM-DD)";

interface YmdFilterDateInputProps {
  label: string;
  value: string;
  onCommit: (value: string) => void;
  minDate?: string;
  maxDate?: string;
  rangeError?: string | null;
  /** Keep the accessible name but hide the visible label (section headings supply it). */
  hideLabel?: boolean;
  portalId?: string;
  popperClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
}

function toPickerDate(ymd: string | undefined): Date | undefined {
  if (!ymd) return undefined;
  const parsed = parseYmdLocal(ymd);
  return parsed && !Number.isNaN(parsed.getTime()) ? parsed : undefined;
}

export function YmdFilterDateInput({
  label,
  value,
  onCommit,
  minDate,
  maxDate,
  rangeError = null,
  hideLabel = false,
  portalId,
  popperClassName = "!z-[60]",
  inputClassName,
  wrapperClassName,
}: YmdFilterDateInputProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const [inputError, setInputError] = useState<string | null>(null);

  const selected = value ? parseYmdLocal(value) : null;
  const error = inputError ?? rangeError;

  const handleChange = (date: Date | null) => {
    if (!date) {
      setInputError(null);
      if (value !== "") onCommit("");
      return;
    }
    const ymd = formatYmdLocal(date);
    setInputError(null);
    if (ymd !== value) onCommit(ymd);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    if (!raw.trim()) {
      setInputError(null);
      if (value !== "") onCommit("");
      return;
    }
    const sanitized = sanitizeReferralLeadsDateInput(raw);
    if (sanitized === null) {
      setInputError(INVALID_DATE_MESSAGE);
      return;
    }
    setInputError(null);
    if (sanitized !== value) onCommit(sanitized);
  };

  return (
    <div className={wrapperClassName}>
      <label htmlFor={inputId} className={hideLabel ? "sr-only" : "form-label text-xs"}>
        {label}
      </label>
      <DatePicker
        id={inputId}
        selected={selected && !Number.isNaN(selected.getTime()) ? selected : null}
        onChange={handleChange}
        onBlur={handleBlur}
        dateFormat="yyyy-MM-dd"
        placeholderText="yyyy-mm-dd"
        isClearable
        autoComplete="off"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        calendarStartDay={1}
        minDate={toPickerDate(minDate)}
        maxDate={toPickerDate(maxDate)}
        // Rendered inline, the popup is clipped by the filter card and floating-ui's
        // flip/shift middleware can only reposition inside that clipping box. A body
        // portal makes the viewport the boundary, so collision handling works.
        // Per-field node: From and To sharing one portal id would have them mount and
        // unmount the same element if both are ever open at once.
        portalId={portalId ?? `referral-leads-datepicker-portal-${label.toLowerCase()}`}
        // floating-ui defaults to `bottom` (centred): a ~280px calendar under a 150px
        // input overhangs ~65px each side. Anchor its start edge to the input instead.
        popperPlacement="bottom-start"
        popperClassName={popperClassName}
        calendarClassName="filter-dp-cal"
        wrapperClassName={wrapperClassName}
        className={`${inputClassName ?? "form-control form-control-sm w-[150px]"} ${error ? "is-invalid" : ""}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p
          id={errorId}
          className={`invalid-feedback d-block text-xs mt-0.5 mb-0 ${inputClassName ? "" : "max-w-[150px]"}`}
          aria-live="polite"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
