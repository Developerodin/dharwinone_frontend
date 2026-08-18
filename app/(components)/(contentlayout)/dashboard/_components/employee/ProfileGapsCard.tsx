"use client";

import Link from "next/link";
import DashboardCard from "./DashboardCard";

type Gap = { label: string; href: string };

export default function ProfileGapsCard({
  gaps, totalSections, loading,
}: { gaps: Gap[]; totalSections: number; loading: boolean }) {
  const tile = (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400">
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    </span>
  );

  const action = (
    <span className="rounded-full bg-teal-500/10 px-2 py-1 text-[0.65rem] font-semibold tabular-nums text-teal-600 dark:text-teal-400">
      {gaps.length} left
    </span>
  );

  return (
    <DashboardCard title="Finish your profile" tile={tile} action={action}>
      {loading ? (
        <div className="h-20 animate-pulse rounded-lg bg-defaultborder/60 dark:bg-white/5" />
      ) : (
        <>
          {gaps.map((g) => (
            <Link key={g.label} href={g.href}
              className="-mx-2 flex min-h-[2.75rem] items-center gap-2.5 rounded-lg px-2 text-[0.78rem] transition-colors hover:bg-defaultbackground dark:hover:bg-white/5">
              {g.label}
              <svg className="ms-auto text-textmuted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          ))}
          <p className="mt-3 text-[0.68rem] leading-snug text-textmuted dark:text-white/50">
            {totalSections - gaps.length} of {totalSections} sections complete.
          </p>
        </>
      )}
    </DashboardCard>
  );
}
