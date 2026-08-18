"use client";

import DashboardCard from "./DashboardCard";
import type { StudentCourseListItem } from "@/shared/lib/api/student-courses";

export default function TrainingCard({ courses, loading }: { courses: StudentCourseListItem[]; loading: boolean }) {
  return (
    <DashboardCard title="Training" meta={`${courses.length} assigned`}>
      {loading ? (
        <div className="h-24 animate-pulse rounded-lg bg-defaultborder/60 dark:bg-white/5" />
      ) : (
        courses.map((c) => {
          const pct = Math.round(c.progress?.percentage ?? 0);
          const done = c.status === "completed";
          return (
            <div key={c.module?.id ?? c.module?.moduleName} className="border-t border-defaultborder/60 py-2.5 first:border-t-0 first:pt-0 dark:border-white/[0.07]">
              <div className="mb-1.5 flex items-baseline justify-between gap-2">
                <span className="text-[0.78rem] font-medium">{c.module?.moduleName ?? "Untitled course"}</span>
                {done && c.certificate?.issued ? (
                  <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[0.65rem] font-semibold text-green-600 dark:text-green-400">Certificate</span>
                ) : (
                  <span className="text-[0.7rem] font-semibold tabular-nums text-textmuted dark:text-white/60">{pct}%</span>
                )}
              </div>
              <span className="block h-1.5 overflow-hidden rounded-full bg-defaultborder dark:bg-white/10">
                <span className={"block h-full rounded-full " + (done ? "bg-green-500" : "bg-teal-600 dark:bg-teal-400")} style={{ width: `${pct}%` }} />
              </span>
            </div>
          );
        })
      )}
    </DashboardCard>
  );
}
