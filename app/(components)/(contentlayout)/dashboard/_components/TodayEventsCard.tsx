"use client";

import Link from "next/link";
import { appendJoinIdentityToUrl, resolvePersonalJoinIdentity } from "@/shared/lib/join-room-url";
import {
  TODAY_EVENTS_DISPLAY_CAP,
  isEventJoinable,
  minutesUntilStart,
  type DashboardEvent,
  type EventSource,
} from "@/shared/lib/dashboard/todayEvents";

/** One source failing must not remove the other, so failures are reported per source. */
export type EventSourceError = { source: EventSource; message: string };

const JOIN_CLOSED = "Opens 10 minutes before the event starts";

const SOURCE_META: Record<EventSource, { label: string; badge: string }> = {
  interview: { label: "Interview", badge: "bg-primary/10 text-primary" },
  meeting: { label: "Meeting", badge: "bg-info/10 text-info" },
};

function hhmm(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

/** "Live now" / "in 25m" / "Ended" — relative, so a stale tab still reads sensibly. */
function whenLabel(e: DashboardEvent, now: Date): string {
  if (e.status === "cancelled") return "Cancelled";
  if (new Date(e.endAt).getTime() < now.getTime()) return "Ended";
  const mins = minutesUntilStart(e, now);
  if (mins <= 0) return "Live now";
  if (mins < 60) return `in ${mins}m`;
  const hrs = Math.floor(mins / 60);
  return `in ${hrs}h ${String(mins % 60).padStart(2, "0")}m`;
}

function JoinControl({
  event,
  user,
  now,
}: {
  event: DashboardEvent;
  user: { name?: string | null; email?: string | null } | null;
  now: Date;
}) {
  const joinable = isEventJoinable(event, now);
  const base =
    "inline-flex min-h-[2.25rem] min-w-[4rem] shrink-0 items-center justify-center rounded-lg px-3 text-[0.75rem] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

  if (joinable) {
    // Same personalised link the Interviews and Meetings tables build — the room
    // recognises hosts by email, so a bare public URL would drop them to guest.
    const identity = resolvePersonalJoinIdentity(user, event.hosts);
    const href = appendJoinIdentityToUrl(event.joinUrl, identity.name, identity.email);
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Join ${event.title}`}
        className={`${base} bg-primary text-white hover:bg-primary/90`}
      >
        Join
      </a>
    );
  }

  const reason =
    event.status === "cancelled"
      ? "Cancelled"
      : event.status === "ended" || new Date(event.endAt).getTime() < now.getTime()
        ? "This event has ended"
        : !event.joinUrl
          ? "No join link available"
          : JOIN_CLOSED;

  return (
    <button
      type="button"
      disabled
      title={reason}
      aria-label={`Join ${event.title} — ${reason}`}
      className={`${base} cursor-not-allowed text-[#8c9097] opacity-60 ring-1 ring-inset ring-black/10 dark:text-white/50 dark:ring-white/10`}
    >
      Join
    </button>
  );
}

function EventRow({
  event,
  user,
  now,
}: {
  event: DashboardEvent;
  user: { name?: string | null; email?: string | null } | null;
  now: Date;
}) {
  const meta = SOURCE_META[event.source];
  const past = event.status === "cancelled" || new Date(event.endAt).getTime() < now.getTime();

  return (
    <li
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-black/5 px-3 py-2.5 transition-colors dark:border-white/10 ${
        past ? "opacity-60" : "bg-white/60 dark:bg-white/5"
      }`}
    >
      {/* Fixed-width time block so rows align; tabular digits so they do not jitter. */}
      <div className="w-[4.5rem] shrink-0">
        <p className="mb-0 text-[0.8125rem] font-semibold tabular-nums leading-tight">
          {hhmm(event.startAt)}
        </p>
        <p className="mb-0 text-[0.65rem] text-[#8c9097] dark:text-white/50">
          {whenLabel(event, now)}
        </p>
      </div>

      {/* basis-40 lets the row wrap to two lines on a narrow phone instead of clipping. */}
      <div className="min-w-0 flex-1 basis-40">
        <div className="flex items-center gap-2">
          <span className={`badge shrink-0 text-[0.6rem] ${meta.badge}`}>{meta.label}</span>
          <p className="mb-0 truncate text-[0.8125rem] font-semibold" title={event.title}>
            {event.title}
          </p>
        </div>
        {(event.participant || event.secondaryInfo) && (
          <p className="mb-0 truncate text-[0.72rem] text-[#8c9097] dark:text-white/50">
            {[event.participant, event.secondaryInfo].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>

      <JoinControl event={event} user={user} now={now} />
    </li>
  );
}

/** Inline notice for a source that failed while the other still has rows. */
function SourceFailureNotice({ errors }: { errors: EventSourceError[] }) {
  if (errors.length === 0) return null;
  return (
    <p
      role="status"
      className="mb-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-[0.72rem] text-warning"
    >
      {errors.map((e) => `${SOURCE_META[e.source].label}s unavailable (${e.message})`).join(" · ")}
    </p>
  );
}

export default function TodayEventsCard({
  events,
  loading,
  errors,
  totalToday,
  user,
  now = new Date(),
}: {
  /** Already merged, chronologically sorted and capped by the caller. */
  events: DashboardEvent[];
  loading: boolean;
  /** Per-source failures. Both present => nothing loaded. */
  errors: EventSourceError[];
  /** Server-side totals across both sources, for the "+N more" affordance. */
  totalToday: number;
  user: { name?: string | null; email?: string | null } | null;
  now?: Date;
}) {
  const bothFailed = errors.length >= 2;
  const shown = events.slice(0, TODAY_EVENTS_DISPLAY_CAP);
  const overflow = Math.max(0, totalToday - shown.length);

  return (
    <div className="box h-full flex flex-col overflow-hidden">
      <div className="box-header justify-between flex-shrink-0">
        <div>
          <div className="box-title mb-0">Highlight of Today</div>
          <p className="mb-0 text-[0.7rem] text-[#8c9097] dark:text-white/50">
            Today&apos;s Interviews / Meetings
          </p>
        </div>
        <Link
          href="/communication/meetings"
          className="px-2 text-[0.75rem] font-normal text-[#8c9097] hover:text-primary dark:text-white/50"
        >
          View All <i className="ri-arrow-down-s-line ms-1 inline-block align-middle" />
        </Link>
      </div>

      <div className="box-body flex-1 min-h-0 overflow-y-auto">
        {loading ? (
          <div className="space-y-2" aria-busy="true" aria-live="polite">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded-lg bg-black/5 dark:bg-white/10" />
            ))}
          </div>
        ) : bothFailed ? (
          <div className="flex flex-col items-center justify-center py-8 text-center" role="alert">
            <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 text-danger">
              <i className="ri-error-warning-line text-[1.25rem]" />
            </span>
            <p className="mb-1 text-[0.8125rem] font-semibold">
              Unable to load today&apos;s events.
            </p>
            <p className="mb-0 text-[0.72rem] text-[#8c9097] dark:text-white/50">
              {errors.map((e) => `${SOURCE_META[e.source].label}s: ${e.message}`).join(" · ")}
            </p>
          </div>
        ) : (
          <>
            <SourceFailureNotice errors={errors} />
            {shown.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-primary">
                  <i className="ri-calendar-check-line text-[1.25rem]" />
                </span>
                <p className="mb-1 text-[0.8125rem] font-semibold">Nothing scheduled today</p>
                <p className="mb-0 text-[0.72rem] text-[#8c9097] dark:text-white/50">
                  No interviews or meetings scheduled for today.
                </p>
              </div>
            ) : (
              <>
                <ul className="mb-0 list-none space-y-2">
                  {shown.map((e) => (
                    <EventRow key={e.id} event={e} user={user} now={now} />
                  ))}
                </ul>
                {overflow > 0 && (
                  <Link
                    href="/communication/meetings"
                    className="mt-2 inline-flex min-h-[2.25rem] w-full items-center justify-center rounded-lg text-[0.72rem] font-medium text-primary hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    View all {totalToday} of today&apos;s events
                  </Link>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
