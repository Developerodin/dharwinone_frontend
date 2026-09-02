"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Swal from "sweetalert2";
import { reparentOrgUnit, type OrgUnitNode } from "@/shared/lib/api/org-structure";
import {
  OrgFormField,
  OrgModal,
  OrgModalCancelButton,
  OrgModalSubmitButton,
} from "./org-ui";

type ParentOption = { value: string; label: string };

function descendantIdsOf(units: OrgUnitNode[], unitId: string) {
  const childrenOf = new Map<string, OrgUnitNode[]>();
  for (const u of units) {
    const key = u.parentId ?? "__root__";
    const arr = childrenOf.get(key);
    if (arr) arr.push(u);
    else childrenOf.set(key, [u]);
  }
  const out = new Set<string>();
  const walk = (id: string) => {
    for (const child of childrenOf.get(id) ?? []) {
      if (!out.has(child.id)) {
        out.add(child.id);
        walk(child.id);
      }
    }
  };
  walk(unitId);
  return out;
}

function ParentSelect({
  id,
  options,
  value,
  onChange,
  disabled,
}: {
  id: string;
  options: ParentOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selected = options.find((o) => o.value === value) ?? options[0];
  const label = selected?.label ?? "None (root)";

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => {
          if (!disabled) setOpen((v) => !v);
        }}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        title={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-label="New parent unit"
        className={`form-control relative flex min-h-11 w-full items-center pe-9 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      >
        <span className="min-w-0 flex-1 truncate">{label}</span>
        <i
          className={`ri-arrow-down-s-line pointer-events-none absolute right-2.5 top-1/2 shrink-0 -translate-y-1/2 text-base text-defaulttextcolor/60 transition-transform duration-200 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>
      {open && !disabled ? (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          aria-labelledby={id}
          className="relative z-20 mt-1 max-h-60 overflow-auto rounded-md border border-defaultborder/70 bg-white py-1 shadow-lg dark:bg-bodybg"
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value || "root"} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className={`flex w-full cursor-pointer items-center px-3 py-2 text-start text-[0.875rem] transition-colors duration-150 motion-reduce:transition-none ${
                    active
                      ? "bg-primary/10 font-medium text-primary"
                      : "hover:bg-light/70 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="min-w-0 truncate">{opt.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

type Props = {
  open: boolean;
  unit: OrgUnitNode | null;
  units: OrgUnitNode[];
  onClose: () => void;
  onSaved: () => void;
};

export default function ReparentUnitModal({ open, unit, units, onClose, onSaved }: Props) {
  const [parentId, setParentId] = useState("");
  const [saving, setSaving] = useState(false);

  const options = useMemo<ParentOption[]>(() => {
    if (!unit) return [{ value: "", label: "None (root)" }];
    const blocked = descendantIdsOf(units, unit.id);
    return [
      { value: "", label: "None (root)" },
      ...units
        .filter((u) => u.id !== unit.id && !blocked.has(u.id))
        .map((u) => ({ value: u.id, label: `${u.name} (${u.type})` })),
    ];
  }, [unit, units]);

  useEffect(() => {
    if (!open || !unit) return;
    setParentId(unit.parentId ?? "");
  }, [open, unit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unit) return;
    setSaving(true);
    try {
      await reparentOrgUnit(unit.id, parentId || null);
      onSaved();
      onClose();
      await Swal.fire({
        icon: "success",
        title: "Unit moved",
        text: `"${unit.name}" was reparented successfully.`,
        toast: true,
        position: "top-end",
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Reparent failed";
      await Swal.fire({ icon: "error", title: "Cannot reparent", text: msg });
    } finally {
      setSaving(false);
    }
  };

  return (
    <OrgModal
      open={open && !!unit}
      title={unit ? `Reparent "${unit.name}"` : "Reparent"}
      subtitle="Choose a new parent. Descendants of this unit are excluded to avoid cycles."
      onClose={onClose}
      footer={
        <>
          <OrgModalCancelButton type="button" onClick={onClose} disabled={saving}>
            Cancel
          </OrgModalCancelButton>
          <OrgModalSubmitButton form="reparent-unit-form" saving={saving} label="Move unit" savingLabel="Moving…" />
        </>
      }
    >
      <form id="reparent-unit-form" onSubmit={handleSubmit}>
        <div className="px-5 py-5">
          <OrgFormField id="reparent-parent" label="New parent" hint="None (root) places the unit at the top of the tree.">
            <ParentSelect
              id="reparent-parent"
              options={options}
              value={parentId}
              onChange={setParentId}
              disabled={saving}
            />
          </OrgFormField>
        </div>
      </form>
    </OrgModal>
  );
}
