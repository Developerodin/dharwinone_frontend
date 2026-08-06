"use client";

type StatTone = "primary" | "warning" | "success" | "danger";

export type DevTicketStatItem = {
  label: string;
  count: number;
  icon: string;
  tone: StatTone;
};

const TONE_CLASS: Record<StatTone, string> = {
  primary: "bg-primary/10 text-primary",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
  danger: "bg-danger/10 text-danger",
};

export default function DevTicketStatsStrip({ stats }: { stats: DevTicketStatItem[] }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-defaultborder/60 bg-white px-3.5 py-3 dark:border-white/10 dark:bg-bodybg"
        >
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${TONE_CLASS[s.tone]}`}
              aria-hidden
            >
              <i className={`${s.icon} text-[1rem]`} />
            </span>
            <div className="min-w-0">
              <p className="mb-0 truncate text-[0.6875rem] font-medium uppercase tracking-[0.04em] text-[#8c9097]">
                {s.label}
              </p>
              <p className="mb-0 text-[1.125rem] font-semibold tabular-nums leading-tight text-defaulttextcolor dark:text-white">
                {s.count}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
