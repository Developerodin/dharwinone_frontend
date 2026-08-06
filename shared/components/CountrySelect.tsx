"use client";

import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { getCountryOptions } from "@/shared/lib/countries";

function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsDark(el.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

interface CountrySelectProps {
  value: string;
  onChange: (name: string) => void;
  id?: string;
  inputId?: string;
  className?: string;
  hasError?: boolean;
  placeholder?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

const CONTROL_MIN_HEIGHT = 44; // matches personal-info-step .select (2.75rem)
const INPUT_BG_LIGHT = "rgb(255 255 255 / 1)";

function getSelectStyles(isDark: boolean) {
  const controlBg = isDark ? "rgb(var(--body-bg) / 1)" : INPUT_BG_LIGHT;

  return {
  container: (base: Record<string, unknown>) => ({
    ...base,
    width: "100%",
  }),
  control: (base: Record<string, unknown>, state: { isFocused: boolean }) => ({
    ...base,
    minHeight: CONTROL_MIN_HEIGHT,
    borderRadius: 8,
    backgroundColor: controlBg,
    borderColor: state.isFocused
      ? "rgb(var(--primary) / 0.45)"
      : "rgb(var(--input-border) / 1)",
    boxShadow: state.isFocused ? "0 0 0 3px rgb(var(--primary) / 0.08)" : "none",
    color: "rgb(var(--default-text-color) / 1)",
    cursor: "pointer",
    "&:hover": {
      borderColor: state.isFocused
        ? "rgb(var(--primary) / 0.45)"
        : "rgb(var(--input-border) / 1)",
    },
  }),
  valueContainer: (base: Record<string, unknown>) => ({
    ...base,
    padding: "2px 0.75rem",
  }),
  singleValue: (base: Record<string, unknown>) => ({
    ...base,
    color: "rgb(var(--default-text-color) / 1)",
  }),
  input: (base: Record<string, unknown>) => ({
    ...base,
    color: "rgb(var(--default-text-color) / 1)",
    margin: 0,
    padding: 0,
  }),
  placeholder: (base: Record<string, unknown>) => ({
    ...base,
    color: "rgb(var(--default-text-color) / 0.6)",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base: Record<string, unknown>) => ({
    ...base,
    color: "rgb(var(--default-text-color) / 0.55)",
    padding: "0 10px",
    "&:hover": {
      color: "rgb(var(--default-text-color) / 0.75)",
    },
  }),
  menu: (base: Record<string, unknown>) => ({
    ...base,
    zIndex: 50,
    width: "100%",
    marginTop: 4,
    backgroundColor: "rgb(var(--body-bg) / 1)",
    color: "rgb(var(--default-text-color) / 1)",
    border: "1px solid rgb(var(--default-border) / 1)",
    borderRadius: 8,
    boxShadow: "0 4px 16px rgb(0 0 0 / 0.12)",
  }),
  menuList: (base: Record<string, unknown>) => ({
    ...base,
    padding: "4px 0",
    maxHeight: 280,
  }),
  option: (
    base: Record<string, unknown>,
    state: { isSelected: boolean; isFocused: boolean },
  ) => ({
    ...base,
    minHeight: 40,
    padding: "10px 12px",
    backgroundColor: state.isSelected
      ? "rgba(99, 102, 241, 0.15)"
      : state.isFocused
        ? "rgb(var(--default-text-color) / 0.08)"
        : "transparent",
    color: "rgb(var(--default-text-color) / 1)",
    cursor: "pointer",
  }),
};
}

/** Searchable country name selector — stores plain country name strings for API compatibility. */
export function CountrySelect({
  value,
  onChange,
  id,
  inputId,
  className = "",
  hasError = false,
  placeholder = "Select country",
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
}: CountrySelectProps) {
  const isDark = useIsDarkMode();
  const selectStyles = useMemo(() => getSelectStyles(isDark), [isDark]);
  const options = useMemo(() => getCountryOptions(value), [value]);

  const selected =
    options.find((o) => o.value === value) ??
    (value.trim() ? { value: value.trim(), label: value.trim() } : null);

  const resolvedInputId = inputId ?? id;

  return (
    <div className={`country-select w-full min-w-0 ${className}`.trim()}>
      <Select
        inputId={resolvedInputId}
        instanceId={id}
        options={options}
        value={selected}
        onChange={(opt) => onChange(opt?.value ?? "")}
        isSearchable
        isClearable={false}
        filterOption={(option, search) => {
          const input = search.trim().toLowerCase();
          if (!input) return true;
          const label = (option.label ?? "").toLowerCase();
          return label.includes(input);
        }}
        placeholder={placeholder}
        noOptionsMessage={() => "No countries found"}
        classNamePrefix="react-select"
        className="react-select-container"
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        menuPlacement="auto"
        menuShouldScrollIntoView
        styles={{
          ...selectStyles,
          control: (base, state) => ({
            ...selectStyles.control(base, state),
            borderColor: hasError
              ? "rgb(var(--danger) / 1)"
              : state.isFocused
                ? "rgb(var(--primary) / 0.45)"
                : "rgb(var(--input-border) / 1)",
          }),
        }}
      />
    </div>
  );
}
