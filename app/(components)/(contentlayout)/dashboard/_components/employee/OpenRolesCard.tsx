"use client";

import Link from "next/link";
import DashboardCard from "./DashboardCard";
import type { JobMatch } from "@/shared/lib/api/employees";

export default function OpenRolesCard({ jobs, loading }: { jobs: JobMatch[]; loading: boolean }) {
  const action = (
    <Link href="/ats/browse-jobs/" className="inline-flex items-center gap-1 text-[0.75rem] text-textmuted hover:text-defaulttextcolor dark:text-white/50">
      View All
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </Link>
  );

  return (
    <DashboardCard title="Open roles" action={action} bodyClassName="px-5 pb-3.5 pt-2">
      {loading ? (
        <div className="h-24 animate-pulse rounded-lg bg-defaultborder/60 dark:bg-white/5" />
      ) : jobs.length === 0 ? (
        <p className="py-6 text-center text-[0.75rem] text-textmuted dark:text-white/50">
          No matching jobs right now. Add skills on your profile to see recommendations.
        </p>
      ) : (
        jobs.slice(0, 4).map((j) => {
          const meta = [j.company, j.location].filter(Boolean).join(" · ");
          return (
            <div key={j.jobId || j.title} className="flex min-h-[2.875rem] items-center gap-2.5 border-b border-defaultborder/60 py-2 last:border-b-0 dark:border-white/[0.07]">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.78rem] font-semibold">{j.title}</p>
                <p className="truncate text-[0.7rem] text-textmuted dark:text-white/50">
                  {[meta, typeof j.fitScore === "number" ? `${j.fitScore}%${j.fitLabel ? ` ${j.fitLabel}` : ""}` : null]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <Link
                href={`/ats/browse-jobs/${j.jobId}`}
                className="inline-flex h-7 shrink-0 items-center rounded-lg px-3 text-[0.72rem] font-semibold text-teal-600 ring-1 ring-inset ring-teal-500/25 transition-colors hover:bg-teal-500/10 dark:text-teal-400"
              >
                Apply
              </Link>
            </div>
          );
        })
      )}
    </DashboardCard>
  );
}
