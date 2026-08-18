"use client";

import Link from "next/link";
import DashboardCard from "./DashboardCard";
import { filterDueToday } from "@/shared/lib/dashboard/employeeDashboard";
import type { Task, TaskStatus } from "@/shared/lib/api/tasks";

export default function DueTodayCard({
  tasks, loading, onToggle,
}: { tasks: Task[]; loading: boolean; onToggle: (id: string, next: TaskStatus) => void }) {
  const due = filterDueToday(tasks);
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const action = (
    <Link href="/task/my-tasks/" className="inline-flex items-center gap-1 text-[0.75rem] text-textmuted hover:text-defaulttextcolor dark:text-white/50">
      My tasks
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </Link>
  );

  return (
    <DashboardCard title="Due today" meta={loading ? undefined : `${due.length} open`} action={action} bodyClassName="px-5 pb-3.5 pt-2">
      {loading ? (
        <div className="h-32 animate-pulse rounded-lg bg-defaultborder/60 dark:bg-white/5" />
      ) : due.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-[0.8125rem] font-semibold">Nothing due today</p>
          <p className="mt-1 text-[0.72rem] text-textmuted dark:text-white/50">Anything you finish early shows up here tomorrow.</p>
        </div>
      ) : (
        due.map((t) => {
          const dueTs = new Date(t.dueDate as string).setHours(0, 0, 0, 0);
          const daysLate = Math.floor((today.getTime() - dueTs) / 86400000);
          return (
            <button
              key={t._id}
              type="button"
              onClick={() => onToggle(t._id, "completed")}
              className="-mx-2 flex min-h-[2.75rem] w-full items-center gap-2.5 rounded-lg border-b border-defaultborder/60 px-2 text-start transition-colors last:border-b-0 hover:bg-defaultbackground dark:border-white/[0.07] dark:hover:bg-white/5"
            >
              <span aria-hidden="true" className="grid h-4 w-4 shrink-0 place-items-center rounded border-[1.5px] border-textmuted" />
              <span className="min-w-0 flex-1 truncate text-[0.78rem]">{t.title}</span>
              {daysLate > 0 ? (
                <span className="shrink-0 rounded-full bg-red-500/10 px-2 py-0.5 text-[0.65rem] font-semibold text-red-600 dark:text-red-400">
                  {daysLate}d late
                </span>
              ) : null}
            </button>
          );
        })
      )}
    </DashboardCard>
  );
}
