"use client";

import React, { useMemo } from "react";
import Select, { type FilterOptionOption } from "react-select";
import { atsSelectClassNames, atsSelectStyles } from "@/shared/lib/reactSelectTheme";
import type { ActivityLogSelectGroup, ActivityLogSelectOption } from "@/shared/lib/activity-log-catalog";

export interface ActivityLogFilterSelectProps {
  inputId: string;
  groups: ActivityLogSelectGroup[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  noOptionsMessage?: string;
  /** Platform audit shows the raw technical key inline (forensic use); consumer audit keeps it out of the closed control. */
  showKeyInValue?: boolean;
}

function filterOption(option: FilterOptionOption<ActivityLogSelectOption>, rawInput: string): boolean {
  const input = rawInput.trim().toLowerCase();
  if (!input) return true;
  const { label, value, data } = option;
  return (
    label.toLowerCase().includes(input) ||
    value.toLowerCase().includes(input) ||
    (data.description ?? "").toLowerCase().includes(input)
  );
}

/** Searchable, grouped replacement for the flat native `<select>` used to filter Log Audit / Platform Audit by action or entity type. */
export function ActivityLogFilterSelect({
  inputId,
  groups,
  value,
  onChange,
  placeholder,
  noOptionsMessage = "No matching options",
  showKeyInValue = false,
}: ActivityLogFilterSelectProps) {
  const selected = useMemo(() => {
    if (!value) return null;
    for (const group of groups) {
      const match = group.options.find((o) => o.value === value);
      if (match) return match;
    }
    return null;
  }, [groups, value]);

  // Both filter panels sit inside a `.box` with `overflow-hidden`, which clips an inline menu on
  // short viewports. Portalling escapes that. The menu only exists while it is open, so reading
  // `document` at render time cannot produce a hydration mismatch.
  const menuPortalTarget = typeof document === "undefined" ? undefined : document.body;

  return (
    <Select<ActivityLogSelectOption, false>
      inputId={inputId}
      options={groups}
      value={selected}
      onChange={(opt) => onChange(opt?.value ?? "")}
      isClearable
      placeholder={placeholder}
      styles={atsSelectStyles<ActivityLogSelectOption>()}
      // Opts into the settled option states in `app/globals.scss` (.ats-select-menu): the cursor is
      // the only filled row, selection is weight + check. Without the prefix this menu fell back to
      // react-select's own 8%-tint focus, invisible against the dark body background.
      classNamePrefix="Select2"
      classNames={atsSelectClassNames}
      menuPortalTarget={menuPortalTarget}
      filterOption={filterOption}
      formatGroupLabel={(group) => (
        <div className="flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-wide text-defaulttextcolor/55">
          <span>{group.label}</span>
          <span className="text-defaulttextcolor/35 normal-case font-normal">{group.options.length}</span>
        </div>
      )}
      formatOptionLabel={(option, meta) => (
        // The vendor's `.Select2__menu div div` forces `display:flex` on this wrapper, so only the
        // direction is ours to set. `min-w-0` matters: as a flex item this would otherwise refuse to
        // shrink below its longest label and push the row wider than the menu, which is what makes a
        // menu scroll sideways. With it, long names wrap instead.
        <div className="flex flex-col py-0.5 leading-tight min-w-0 break-words">
          <span>{option.label}</span>
          {(meta.context === "menu" || showKeyInValue) && (
            <span className="text-[0.7rem] font-mono text-defaulttextcolor/50">{option.value}</span>
          )}
        </div>
      )}
      noOptionsMessage={() => noOptionsMessage}
    />
  );
}
