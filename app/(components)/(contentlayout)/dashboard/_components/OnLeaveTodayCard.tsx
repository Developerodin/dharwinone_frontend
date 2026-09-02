"use client";

import type { OnLeaveTodayItem } from "@/shared/lib/api/attendance";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function formatRange(item: OnLeaveTodayItem): string {
  const start = formatDate(item.startDate);
  const end = formatDate(item.endDate);
  return start === end ? start : `${start} – ${end}`;
}

// Always mounted (see dashboard/page.tsx) so the row-2 stack keeps its shape on days
// when nobody is away — an empty card reads better than a collapsing grid.
// selfView: the viewer is a plain employee seeing only their own approved leave.
export default function OnLeaveTodayCard({
  items,
  selfView = false,
  loading = false,
}: {
  items: OnLeaveTodayItem[];
  selfView?: boolean;
  /** Request in flight. Without this the card asserted "No one is on leave today" for the
      whole request — a confident wrong answer shown before any data had arrived.
      Optional and defaulting to false so existing callers are unaffected. */
  loading?: boolean;
}) {
  const self = selfView ? items[0] ?? null : null;
  const isEmpty = items.length === 0;
  return (
    /* Card chrome matches every other dashboard widget: a plain .box with a .box-header
       and a .box-title. It used to opt out of that system — a gradient background,
       border-0 + shadow-sm, an avatar icon before the title and a second header border on
       top of the one .box-header already draws — which made this and Upcoming Holidays
       read as a pair of cards from a different product. */
    <div className="box h-full flex flex-col overflow-hidden">
      <div className="box-header justify-between flex-shrink-0">
        <div>
          <h2 className="box-title !mb-0">{selfView ? "Your Leave" : "On Leave Today"}</h2>
          {!selfView && !isEmpty && !loading && (
            <p className="mb-0 text-[0.75rem] text-[#8c9097] dark:text-white/50">
              {items.length} {items.length === 1 ? "employee" : "employees"}
            </p>
          )}
        </div>
      </div>
      <div className="box-body flex-1 min-h-0 overflow-y-auto">
        {loading ? (
          <ul className="list-none space-y-2 mb-0" aria-busy="true" aria-live="polite">
            {[0, 1].map((i) => (
              <li
                key={i}
                className="h-[3.25rem] animate-pulse rounded-lg bg-black/5 dark:bg-white/10"
              />
            ))}
          </ul>
        ) : isEmpty ? (
          /* Compact, single row. The tall centred empty state was ~175px of "nobody is
             away" in a fixed-height column this card shares with Upcoming Holidays — and
             because this card is the shrink-0 one, that height came straight out of the
             holidays list beside it. Absence of data should not outrank data. */
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
              <i className="ti ti-users text-[1.0625rem]" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="mb-0 text-[0.8125rem] font-semibold">
                {selfView ? "You are not on leave today" : "No one is on leave today"}
              </p>
              <p className="mb-0 text-[0.75rem] text-[#8c9097] dark:text-white/50">
                {selfView ? "Approved leave will show up here." : "Everyone is scheduled to be in."}
              </p>
            </div>
          </div>
        ) : self ? (
          <p className="text-[0.875rem] mb-0">
            You have approved leave from{" "}
            <span className="font-semibold text-secondary">{formatDate(self.startDate)}</span> to{" "}
            <span className="font-semibold text-secondary">{formatDate(self.endDate)}</span>.
          </p>
        ) : (
        /* Divider rows, matching Candidate List and My Tasks. The bordered `bg-white/60`
           chips only registered against the gradient this card used to carry; on a plain
           .box they are an invisible fill inside a visible outline. */
        <ul className="list-none mb-0">
          {items.map((it, idx) => (
            <li
              key={`${it.employeeId || it.name}-${idx}`}
              className="flex min-h-[3.25rem] items-center gap-3 border-b border-black/5 py-2 last:border-b-0 dark:border-white/[0.08]"
            >
              <span className="avatar avatar-sm avatar-rounded bg-secondary/10 text-secondary shrink-0">
                <i className="ti ti-user text-[0.95rem]" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[0.875rem] mb-0 truncate">
                  {it.employeeId ? <span className="text-secondary">{it.employeeId} </span> : null}
                  {it.name} <span className="font-normal text-[#8c9097] dark:text-white/50">is on Leave today</span>
                </p>
                <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-0 truncate">{formatRange(it)}</p>
              </div>
            </li>
          ))}
        </ul>
        )}
      </div>
    </div>
  );
}
