"use client";

import Link from "next/link";
import type { JobMatch } from "@/shared/lib/api/employees";

export function scoreTone(fitScore: number) {
  if (fitScore >= 80) {
    return { bar: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10", ring: "ring-emerald-500/20" };
  }
  if (fitScore >= 60) {
    return { bar: "bg-sky-500", text: "text-sky-600 dark:text-sky-400", bg: "bg-sky-500/10", ring: "ring-sky-500/20" };
  }
  if (fitScore >= 40) {
    return { bar: "bg-amber-500", text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10", ring: "ring-amber-500/20" };
  }
  return { bar: "bg-slate-400", text: "text-textmuted", bg: "bg-slate-500/10", ring: "ring-slate-500/20" };
}

export type JobMatchCardCta = {
  href: string;
  label: string;
  icon: string;
};

export default function JobMatchCard({
  job,
  cta,
  variant = "panel",
}: {
  job: JobMatch;
  cta: JobMatchCardCta;
  /** panel = employees preview; profile = my-profile gradient card */
  variant?: "panel" | "profile";
}) {
  const tone = scoreTone(job.fitScore);
  const shell =
    variant === "profile"
      ? "group flex flex-col gap-3 rounded-xl border border-defaultborder/70 bg-gradient-to-br from-white via-white to-slate-50/60 p-4 shadow-sm ring-1 ring-black/[0.03] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md dark:from-bodybg dark:via-bodybg dark:to-white/[0.02] dark:border-defaultborder/20 dark:ring-white/[0.04]"
      : "group flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800";
  const titleCls =
    variant === "profile"
      ? "m-0 truncate text-[0.9rem] font-semibold tracking-tight text-defaulttextcolor dark:text-white"
      : "m-0 truncate text-sm font-semibold text-gray-900 dark:text-white";
  const metaCls =
    variant === "profile"
      ? "m-0 mt-0.5 truncate text-[0.72rem] text-textmuted dark:text-white/55"
      : "m-0 mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400";
  const chipMuted =
    variant === "profile"
      ? "inline-flex items-center gap-1 rounded-full border border-defaultborder bg-white/80 px-2 py-0.5 text-[0.65rem] font-medium text-textmuted dark:border-defaultborder/20 dark:bg-white/5 dark:text-white/55"
      : "inline-flex items-center gap-1 rounded-full border border-gray-200 px-2 py-0.5 text-[0.65rem] font-medium text-gray-500 dark:border-gray-600 dark:text-gray-400";
  const track =
    variant === "profile"
      ? "h-1 w-full overflow-hidden rounded-full bg-defaultborder/40 dark:bg-white/5"
      : "h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/5";

  return (
    <div className={shell}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className={titleCls}>{job.title}</p>
          <p className={metaCls}>
            {job.company && <span>{job.company}</span>}
            {job.location && (
              <span>
                {job.company ? " · " : ""}
                {job.location}
              </span>
            )}
          </p>
        </div>
        <div className={`flex shrink-0 flex-col items-center rounded-lg px-2.5 py-1 ring-1 ${tone.bg} ${tone.ring}`}>
          <span className={`text-base font-bold leading-none ${tone.text}`}>{job.fitScore}%</span>
          <span className={`text-[0.55rem] font-semibold uppercase tracking-wide ${tone.text}`}>{job.fitLabel}</span>
        </div>
      </div>
      <div
        className={track}
        role="progressbar"
        aria-valuenow={job.fitScore}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${job.fitScore}% fit`}
      >
        <div
          className={`h-full ${tone.bar} transition-[width] duration-700 ease-out`}
          style={{ width: `${Math.max(2, Math.min(100, job.fitScore))}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {job.jobType ? <span className={chipMuted}>{job.jobType}</span> : null}
        {job.matchedSkills.slice(0, 3).map((s) => (
          <span
            key={s.name}
            className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-700 dark:text-emerald-300"
          >
            <i className="ri-check-line text-[0.7rem]" aria-hidden />
            {s.name}
          </span>
        ))}
        {job.missingSkills.slice(0, 2).map((s) => (
          <span key={s.name} className={chipMuted}>
            {variant === "panel" ? <i className="ri-subtract-line text-[0.7rem]" aria-hidden /> : null}
            {s.name}
          </span>
        ))}
      </div>
      <Link
        href={cta.href}
        className="ti-btn ti-btn-primary !h-9 !py-0 !px-4 mt-auto inline-flex w-full min-h-[2.75rem] items-center justify-center !text-xs font-medium"
      >
        <i className={`${cta.icon} me-1.5`} aria-hidden />
        {cta.label}
      </Link>
    </div>
  );
}
