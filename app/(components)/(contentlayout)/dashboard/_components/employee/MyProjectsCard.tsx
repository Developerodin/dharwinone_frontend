"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import DashboardCard from "./DashboardCard";
import type { Project } from "@/shared/lib/api/projects";

type SortKey = "name" | "open" | "due";

function openCount(p: Project) { return Math.max(0, (p.totalTasks ?? 0) - (p.completedTasks ?? 0)); }
function progress(p: Project) {
  const total = p.totalTasks ?? 0;
  return total === 0 ? 0 : Math.round(((p.completedTasks ?? 0) / total) * 100);
}
function health(p: Project): { label: string; cls: string } {
  const due = p.endDate ? new Date(p.endDate) : null;
  if (due && due < new Date() && progress(p) < 100) return { label: "Overdue", cls: "bg-red-500/10 text-red-600 dark:text-red-400" };
  if (due && (due.getTime() - Date.now()) / 86400000 < 7 && progress(p) < 80) return { label: "At risk", cls: "bg-amber-500/15 text-amber-700 dark:text-amber-400" };
  return { label: "On track", cls: "bg-green-500/10 text-green-600 dark:text-green-400" };
}

const TH = "whitespace-nowrap bg-defaultbackground px-5 py-2.5 text-start text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-textmuted dark:bg-white/[0.03] dark:text-white/50";

export default function MyProjectsCard({ projects, loading }: { projects: Project[]; loading: boolean }) {
  const [sort, setSort] = useState<{ key: SortKey; asc: boolean }>({ key: "due", asc: true });

  const rows = useMemo(() => {
    const c = [...projects];
    c.sort((a, b) => {
      const dir = sort.asc ? 1 : -1;
      if (sort.key === "name") return a.name.localeCompare(b.name) * dir;
      if (sort.key === "open") return (openCount(a) - openCount(b)) * dir;
      return ((a.endDate ? Date.parse(a.endDate) : Infinity) - (b.endDate ? Date.parse(b.endDate) : Infinity)) * dir;
    });
    return c;
  }, [projects, sort]);

  function Th({ k, children }: { k: SortKey; children: ReactNode }) {
    const on = sort.key === k;
    return (
      <th scope="col" aria-sort={on ? (sort.asc ? "ascending" : "descending") : "none"} className={TH}>
        <button type="button" onClick={() => setSort({ key: k, asc: on ? !sort.asc : true })} className="inline-flex items-center gap-1">
          {children}<span aria-hidden="true" className={on ? "text-teal-600 dark:text-teal-400" : "opacity-0"}>{sort.asc ? "↑" : "↓"}</span>
        </button>
      </th>
    );
  }

  return (
    <DashboardCard title="Projects you're on" meta={loading ? undefined : String(projects.length)} bodyClassName="p-0">
      {loading ? (
        <div className="m-5 h-32 animate-pulse rounded-lg bg-defaultborder/60 dark:bg-white/5" />
      ) : projects.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-[0.8125rem] font-semibold">You&apos;re not on a project yet</p>
          <p className="mt-1 text-[0.72rem] text-textmuted dark:text-white/50">Projects you are assigned to appear here with your open task count.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <Th k="name">Project</Th>
                <Th k="open">My open</Th>
                <th scope="col" className={TH}>Progress</th>
                <Th k="due">Due</Th>
                <th scope="col" className={TH}>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => {
                const h = health(p);
                return (
                  <tr key={p._id} className="border-b border-defaultborder/60 last:border-b-0 hover:bg-defaultbackground dark:border-white/[0.07] dark:hover:bg-white/5">
                    <td className="px-5 py-2.5 text-[0.75rem]">
                      <Link href={`/task/kanban-board/?projectId=${encodeURIComponent(p._id)}`} className="hover:underline">{p.name}</Link>
                    </td>
                    <td className="px-5 py-2.5 text-[0.75rem] tabular-nums">{openCount(p)}</td>
                    <td className="px-5 py-2.5">
                      <div className="flex min-w-[7rem] items-center gap-2">
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-defaultborder dark:bg-white/10">
                          <span className="block h-full rounded-full bg-teal-600 dark:bg-teal-400" style={{ width: `${progress(p)}%` }} />
                        </span>
                        <span className="w-7 text-end text-[0.66rem] tabular-nums text-textmuted dark:text-white/60">{progress(p)}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-2.5 text-[0.75rem] tabular-nums">
                      {p.endDate ? new Date(p.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"}
                    </td>
                    <td className="px-5 py-2.5">
                      <span className={"inline-flex rounded-full px-2 py-1 text-[0.65rem] font-semibold " + h.cls}>{h.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </DashboardCard>
  );
}
