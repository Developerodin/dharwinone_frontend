"use client";

import Link from "next/link";
import DashboardCard from "./DashboardCard";

type Group = { caption: string; items: Array<{ name: string; meta: string; href: string }> };

export default function DocumentsCard({ groups, loading }: { groups: Group[]; loading: boolean }) {
  const tile = (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-600 ring-1 ring-green-500/15 dark:text-green-400">
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" />
      </svg>
    </span>
  );

  const nonEmpty = groups.filter((g) => g.items.length > 0);

  return (
    <DashboardCard title="Documents" tile={tile}>
      {loading ? (
        <div className="h-24 animate-pulse rounded-lg bg-defaultborder/60 dark:bg-white/5" />
      ) : nonEmpty.length === 0 ? (
        <>
          <p className="text-[0.8125rem] font-semibold">No documents yet</p>
          <p className="mt-1 text-[0.72rem] text-textmuted dark:text-white/50">
            Your offer letter and payslips appear here once HR uploads them.
          </p>
        </>
      ) : (
        nonEmpty.map((g) => (
          <div key={g.caption} className="mb-3.5 last:mb-0">
            <p className="mb-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-textmuted dark:text-white/50">{g.caption}</p>
            {g.items.map((it, i) => (
              <Link key={`${it.name}-${i}`} href={it.href}
                className="-mx-2 flex min-h-[2.25rem] items-center gap-2.5 rounded-lg px-2 transition-colors hover:bg-defaultbackground dark:hover:bg-white/5">
                <span className="min-w-0 flex-1 truncate text-[0.75rem]">{it.name}</span>
                <span className="shrink-0 text-[0.66rem] tabular-nums text-textmuted dark:text-white/50">{it.meta}</span>
              </Link>
            ))}
          </div>
        ))
      )}
    </DashboardCard>
  );
}
