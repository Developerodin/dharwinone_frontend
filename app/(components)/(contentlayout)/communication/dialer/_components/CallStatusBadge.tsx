"use client";

import React from "react";
import { callStatusIcon, callStatusLabel, callStatusTone } from "../_lib/recentCalls";

type Props = {
  status?: string;
  compact?: boolean;
  className?: string;
};

export default function CallStatusBadge({ status, compact = false, className = "" }: Props) {
  const label = callStatusLabel(status);
  if (!label) return null;
  const tone = callStatusTone(status);
  const icon = callStatusIcon(status);
  const size = compact
    ? "px-1.5 py-0.5 text-[0.62rem]"
    : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${tone} ${size} ${className}`}
      aria-label={`Call status: ${label}`}
    >
      <i className={`${icon} text-[0.85em]`} aria-hidden />
      {label}
    </span>
  );
}
