"use client";
import { type ReactNode } from "react";
import { CONTAINMENT, SURFACE, TYPE, WRAP_ANYWHERE } from "./tokens";

interface RecordCardProps {
  children: ReactNode;
}

// Vertical record card. Used by every list renderer (Block table, markdown
// table, candidates table, cards block).
//
// Dropped the 2.5px gradient side stripe — it was a third edge stacked on the
// card border and the old bubble border — and the "Record · 01" ordinal,
// which was machine-facing. The first FieldRow already names the record.
export function RecordCard({ children }: RecordCardProps) {
  return (
    <div className={`overflow-hidden px-3 py-2 ${SURFACE.card} ${CONTAINMENT} ${WRAP_ANYWHERE}`}>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

interface SimpleCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

// Flat surface card — KV summaries, empty states, single-record details.
export function SimpleCard({ title, children, className = "" }: SimpleCardProps) {
  return (
    <div className={`overflow-hidden px-3 py-2.5 ${SURFACE.card} ${CONTAINMENT} ${className}`}>
      {title && <p className={`mb-1 ${TYPE.title}`}>{title}</p>}
      {children}
    </div>
  );
}
