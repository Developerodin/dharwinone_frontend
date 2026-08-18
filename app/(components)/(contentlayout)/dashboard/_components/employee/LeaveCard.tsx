"use client";

import Link from "next/link";
import DashboardCard from "./DashboardCard";
import { tallyLeaveDays } from "@/shared/lib/dashboard/employeeDashboard";
import type { LeaveRequest } from "@/shared/lib/api/leave-requests";

const TYPES = [
  { key: "casual", label: "Casual" },
  { key: "sick", label: "Sick" },
  { key: "unpaid", label: "Unpaid" },
] as const;

export default function LeaveCard({ requests, loading }: { requests: LeaveRequest[]; loading: boolean }) {
  const t = tallyLeaveDays(requests);
  const max = Math.max(1, t.casual, t.sick, t.unpaid);

  const tile = (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 ring-1 ring-sky-500/15 dark:text-sky-400">
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
    </span>
  );

  const action = (
    <Link href="/training/attendance/" className="text-[0.75rem] font-semibold text-teal-600 hover:underline dark:text-teal-400">
      Apply
    </Link>
  );

  return (
    <DashboardCard title="Leave" tile={tile} action={action}>
      {loading ? (
        <div className="h-24 animate-pulse rounded-lg bg-defaultborder/60 dark:bg-white/5" />
      ) : (
        <>
          {t.pending > 0 ? (
            <div className="mb-3.5 flex items-center gap-2 rounded-lg bg-teal-500/10 px-3 py-2 text-[0.72rem] text-defaulttextcolor/80 dark:text-white/70">
              <span className="font-semibold text-defaulttextcolor dark:text-defaulttextcolor/90">
                {t.pending} request{t.pending > 1 ? "s" : ""}
              </span>
              awaiting approval
            </div>
          ) : null}

          <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.06em] text-textmuted dark:text-white/50">
            Taken this year
          </p>
          {TYPES.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2.5 py-1.5">
              <span className="w-14 shrink-0 text-[0.75rem]">{label}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-defaultborder dark:bg-white/10">
                <span className="block h-full rounded-full bg-teal-600/40 dark:bg-teal-400/40" style={{ width: `${(t[key] / max) * 100}%` }} />
              </span>
              <span className="w-8 shrink-0 text-end text-[0.72rem] font-semibold tabular-nums">{t[key]}d</span>
            </div>
          ))}

          <p className="mt-3 text-[0.72rem] text-textmuted dark:text-white/60">
            {t.nextApproved ? (
              <>Next approved <b className="font-semibold tabular-nums text-defaulttextcolor dark:text-defaulttextcolor/90">
                {new Date(t.nextApproved).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </b></>
            ) : "No upcoming approved leave."}
          </p>
        </>
      )}
    </DashboardCard>
  );
}
