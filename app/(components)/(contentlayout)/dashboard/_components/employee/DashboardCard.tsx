"use client";

import type { ReactNode } from "react";

type Props = {
  title: string;
  /** Small grey text after the title, e.g. "3 today". */
  meta?: string;
  /** Right-aligned header slot: a link, filter, or pill. */
  action?: ReactNode;
  /** Optional 44px tinted icon tile before the title. */
  tile?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export default function DashboardCard({
  title, meta, action, tile, children, className = "", bodyClassName = "p-5",
}: Props) {
  return (
    <section
      className={
        "flex flex-col overflow-hidden rounded-2xl border border-defaultborder/70 bg-white shadow-sm shadow-black/[0.03] " +
        "dark:border-white/[0.08] dark:bg-bodybg dark:shadow-none " + className
      }
    >
      <header className="flex flex-wrap items-center gap-3.5 border-b border-defaultborder/50 bg-gradient-to-br from-teal-50/40 via-white to-indigo-50/30 px-5 py-4 dark:border-white/[0.06] dark:from-teal-950/20 dark:via-bodybg dark:to-indigo-950/10">
        {tile}
        <h2 className="me-auto text-[0.9rem] font-semibold tracking-[-0.012em] text-defaulttextcolor dark:text-defaulttextcolor/90">
          {title}
          {meta ? <span className="ms-2 text-[0.75rem] font-normal text-textmuted dark:text-white/50">{meta}</span> : null}
        </h2>
        {action}
      </header>
      <div className={"flex-auto " + bodyClassName}>{children}</div>
    </section>
  );
}
