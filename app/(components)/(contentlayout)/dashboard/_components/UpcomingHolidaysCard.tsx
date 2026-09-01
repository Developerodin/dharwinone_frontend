"use client";

import { useState } from "react";
import Link from "next/link";
import type { AssignedHolidayItem } from "@/shared/lib/api/attendance";
import type { HolidayScope } from "@/shared/lib/dashboard/holidaySource";
import { useModalBehavior } from "@/shared/hooks/useModalBehavior";

function formatHolidayDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: d.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
  });
}

function formatHolidayRange(item: AssignedHolidayItem): string {
  const start = formatHolidayDate(item.date);
  if (!item.endDate) return start;
  const end = formatHolidayDate(item.endDate);
  return start === end ? start : `${start} – ${end}`;
}

function daysUntil(iso: string): number | null {
  const target = new Date(iso);
  if (Number.isNaN(target.getTime())) return null;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const day = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.round((day.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
}

const COPY = {
  personal: {
    title: "My Upcoming Holidays",
    subtitle: "Assigned to you",
    empty: "No upcoming holidays assigned.",
  },
  company: {
    title: "Upcoming Company Holidays",
    subtitle: "Across the organisation",
    empty: "No upcoming company holidays.",
  },
} as const;

/**
 * One holiday row — the markup that used to be inlined in the list. Extracted so the
 * phone list, the tablet/desktop single-item preview and the View All overlay share
 * one definition instead of three copies that drift apart. Rendering is unchanged
 * from the previous inline version.
 */
function HolidayRow({ item }: { item: AssignedHolidayItem }) {
  const until = daysUntil(item.date);
  const isToday = until === 0;
  const isTomorrow = until === 1;
  const badge = isToday ? "Today" : isTomorrow ? "Tomorrow" : until != null && until > 0 ? `In ${until}d` : null;

  return (
    <li
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
        isToday
          ? "bg-warning/10 border border-warning/25"
          : "bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center min-w-[2.75rem] rounded-md px-1 py-1 text-center ${
          isToday ? "bg-warning/20 text-warning" : "bg-primary/10 text-primary"
        }`}
      >
        <span className="text-[0.65rem] font-medium uppercase leading-none">
          {new Date(item.date).toLocaleDateString("en-IN", { month: "short" })}
        </span>
        <span className="text-[1rem] font-bold leading-tight">{new Date(item.date).getDate()}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-[0.875rem] mb-0 truncate">{item.title}</p>
        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-0 truncate">
          {formatHolidayRange(item)}
        </p>
      </div>
      {badge && (
        <span
          className={`badge shrink-0 ${isToday ? "bg-warning/15 text-warning" : "bg-primary/10 text-primary"}`}
        >
          {badge}
        </span>
      )}
    </li>
  );
}

/**
 * The full list behind "View All". It renders the holidays already held in memory, so
 * opening it costs no request — the card is handed the complete upcoming list, not a
 * page of it. Scrolling lives here on purpose; the dashboard card must not scroll.
 *
 * ESC, backdrop click, focus trap, focus restore and background scroll lock all come
 * from useModalBehavior, the same hook the ATS and Organization modals use.
 */
function AllHolidaysOverlay({
  open,
  title,
  onClose,
  holidays,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  holidays: AssignedHolidayItem[];
}) {
  const { containerRef, backdropProps, requestClose } = useModalBehavior({ isOpen: open, onClose });
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center overflow-y-auto bg-black/60 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upcoming-holidays-modal-title"
      {...backdropProps}
    >
      <div ref={containerRef} className="my-auto w-full sm:max-w-lg">
        <div className="flex max-h-[92dvh] flex-col overflow-hidden rounded-t-xl bg-white shadow-xl dark:bg-bodybg sm:max-h-[calc(100dvh-2rem)] sm:rounded-xl">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-black/5 px-4 py-3 dark:border-white/10">
            <h6 id="upcoming-holidays-modal-title" className="mb-0 text-[0.9375rem] font-semibold">
              {title}
            </h6>
            <button
              type="button"
              className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light !mb-0 shrink-0"
              onClick={requestClose}
              aria-label="Close"
            >
              <i className="ti ti-x text-[1rem]" aria-hidden />
            </button>
          </div>
          {/* The only scroll container in this feature. A year of company holidays is
              ~15 rows, so the whole list renders; virtualise only if a tenant ever
              files hundreds. */}
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <ul className="list-none space-y-2 mb-0">
              {holidays.map((h) => (
                <HolidayRow key={h.id} item={h} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  loading?: boolean;
  todayIsHoliday?: boolean;
  todayHolidayTitle?: string | null;
  holidays: AssignedHolidayItem[];
  /** Show the "Manage" link — only staff who can manage holidays; hidden for plain employees. */
  showManage?: boolean;
  /**
   * Which list is being shown. "personal" is the caller's own assignments and is the
   * default, so existing usages render exactly as before. "company" is the global
   * catalogue, which only holiday managers ever receive.
   */
  scope?: HolidayScope;
};

export default function UpcomingHolidaysCard({
  loading = false,
  todayIsHoliday = false,
  todayHolidayTitle,
  holidays,
  showManage = false,
  scope = "personal",
}: Props) {
  const copy = COPY[scope];
  const [viewAllOpen, setViewAllOpen] = useState(false);

  /**
   * Only the company card gets the tablet/desktop single-item preview. The employee
   * dashboard renders this same component in "personal" scope, in a different column
   * with its own height rules, and was not part of this change — it keeps the
   * scrolling list at every width.
   */
  const previewOnDesktop = scope === "company";

  /* holidays arrives chronologically sorted: upcomingCompanyHolidays sorts locally by
     local calendar day, independent of what the server returns. That guarantee is what
     makes [0] the NEXT holiday rather than an arbitrary one. */
  const next = holidays[0];

  return (
    <div className="box overflow-hidden border-0 shadow-sm bg-gradient-to-br from-primary/5 via-transparent to-warning/5 dark:from-primary/10 dark:to-warning/10">
      <div className="box-header justify-between flex-shrink-0 border-b border-black/5 dark:border-white/10 !pb-3">
        <div className="flex items-center gap-2">
          <span className="avatar avatar-sm avatar-rounded bg-primary/15 text-primary">
            <i className="ti ti-calendar-event text-[1rem]" aria-hidden />
          </span>
          <div>
            <div className="box-title mb-0">{copy.title}</div>
            <p className="text-[0.7rem] text-[#8c9097] dark:text-white/50 mb-0">{copy.subtitle}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {/* View All sits with Manage rather than under the list: the card cell is a
              fixed height shared with On Leave Today, and a footer button pushed the
              single holiday row into a clipped overflow. Header-only also keeps it off
              phones, where the full list is still inline. */}
          {previewOnDesktop && holidays.length > 1 && !loading && (
            <button
              type="button"
              onClick={() => setViewAllOpen(true)}
              className="hidden md:inline-flex items-center gap-1 whitespace-nowrap px-2 font-normal text-[0.75rem] text-[#8c9097] dark:text-white/50 hover:text-primary"
            >
              View All
              <i className="ti ti-arrow-right text-[0.8125rem]" aria-hidden />
            </button>
          )}
          {showManage && (
            <Link
              href="/settings/attendance/holidays/"
              className="px-2 font-normal text-[0.75rem] text-[#8c9097] dark:text-white/50 hover:text-primary"
            >
              Manage
            </Link>
          )}
        </div>
      </div>
      <div className="box-body !pt-3">
        {todayIsHoliday && (
          <div
            className="mb-3 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-[0.8125rem] text-warning"
            role="status"
          >
            <span className="font-semibold">Today is a holiday</span>
            {/* The punch clause is personal-scope only: a holiday manager viewing the
                company list has no punch button, so the sentence would be misleading. */}
            {todayHolidayTitle ? (
              <span className="text-warning/90">
                {" "}
                — {todayHolidayTitle}.{scope === "personal" ? " Punch in/out is disabled." : ""}
              </span>
            ) : scope === "personal" ? (
              <span className="text-warning/90"> Punch in/out is disabled.</span>
            ) : null}
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-12 rounded-lg animate-pulse bg-black/5 dark:bg-white/10" />
            ))}
          </div>
        ) : holidays.length === 0 ? (
          <p className="text-[#8c9097] dark:text-white/50 text-sm mb-0">{copy.empty}</p>
        ) : (
          <>
            {/* Phone (below md = 768px): the original scrolling list, untouched. On the
                personal card this stays the only rendering, at every width. */}
            <ul
              className={`list-none space-y-2 mb-0 max-h-[19rem] overflow-y-auto pe-1 ${
                previewOnDesktop ? "md:hidden" : ""
              }`}
            >
              {holidays.map((h) => (
                <HolidayRow key={h.id} item={h} />
              ))}
            </ul>

            {/* Tablet + desktop: the next holiday only, so the card can never outgrow
                its fixed cell height and sprout an inner scrollbar. The rest of the
                list lives behind View All. Both renderings ship in the HTML and the
                breakpoint picks one — no JS width check, so SSR and hydration agree. */}
            {previewOnDesktop && next && (
              <div className="hidden md:block">
                <ul className="list-none mb-0">
                  <HolidayRow item={next} />
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      <AllHolidaysOverlay
        open={viewAllOpen}
        title={copy.title}
        onClose={() => setViewAllOpen(false)}
        holidays={holidays}
      />
    </div>
  );
}
