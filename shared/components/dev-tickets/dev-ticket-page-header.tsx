"use client";

import React from "react";

type DevTicketPageHeaderProps = {
  title: string;
  subtitle?: string;
  icon: string;
  action?: React.ReactNode;
};

export default function DevTicketPageHeader({ title, subtitle, icon, action }: DevTicketPageHeaderProps) {
  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="flex items-center gap-2.5 text-[1.0625rem] font-semibold leading-tight text-defaulttextcolor dark:text-white">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <i className={`${icon} text-[1.0625rem]`} aria-hidden />
          </span>
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1.5 max-w-xl text-[0.8125rem] leading-relaxed text-[#8c9097] dark:text-white/50">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
