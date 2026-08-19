"use client";

import DashboardCard from "./DashboardCard";
import type { OnLeaveTodayItem } from "@/shared/lib/api/attendance";
import { formatTeamPulseTitle } from "@/shared/lib/dashboard/employeeDashboard";

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}

type Props = {
  onLeave: OnLeaveTodayItem[];
  loading: boolean;
  /** PM TeamGroup names the employee is rostered on (sorted). */
  teamNames?: string[];
  teamsLoading?: boolean;
};

export default function TeamPulseCard({
  onLeave,
  loading,
  teamNames = [],
  teamsLoading = false,
}: Props) {
  const title = formatTeamPulseTitle(teamNames);
  const showNoTeamHint = !teamsLoading && teamNames.length === 0;
  const pulseLoading = loading || teamsLoading;

  return (
    <DashboardCard title={title} bodyClassName="px-5 pb-3.5 pt-2">
      {pulseLoading ? (
        <div className="h-24 animate-pulse rounded-lg bg-defaultborder/60 dark:bg-white/5" />
      ) : (
        <div className="py-2">
          {showNoTeamHint ? (
            <p className="mb-2 text-[0.66rem] text-textmuted dark:text-white/50">
              Not assigned to a team yet.
            </p>
          ) : null}
          {onLeave.length === 0 ? (
            <p className="py-4 text-center text-[0.75rem] text-textmuted dark:text-white/50">
              Everyone is in today.
            </p>
          ) : (
            <>
              <p className="mb-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-textmuted dark:text-white/50">
                Out today
              </p>
              {onLeave.map((p) => (
                <div key={p.employeeId} className="flex min-h-[2rem] items-center gap-2.5 py-1">
                  <span
                    aria-hidden="true"
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-500/10 text-[0.6rem] font-bold text-teal-600 ring-1 ring-teal-500/15 dark:text-teal-400"
                  >
                    {initials(p.name)}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[0.75rem]">{p.name}</span>
                  <span className="shrink-0 text-[0.66rem] capitalize text-textmuted dark:text-white/50">
                    {p.leaveType ?? "Leave"}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </DashboardCard>
  );
}
