"use client";

import Link from "next/link";
import DashboardCard from "./DashboardCard";
import {
  canJoinMeeting,
  minutesUntil,
  visibleMeetings,
} from "@/shared/lib/dashboard/employeeDashboard";
import type { InternalMeeting } from "@/shared/lib/api/internal-meetings";

const JOIN_CLOSED = "Opens 10 minutes before the meeting starts";
/** Hero + up to 3 later rows; remainder via Calendar. */
const MAX_LATER = 3;

function hhmm(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function statusLabel(scheduledAt: string, now: Date = new Date()): string {
  const mins = minutesUntil(scheduledAt, now);
  if (mins <= 0) return "Live now";
  if (mins === 1) return "in 1 min";
  return `in ${mins}m`;
}

function JoinControl({
  meeting,
  variant,
}: {
  meeting: InternalMeeting;
  /** Primary = next meeting (filled CTA). Secondary = later rows (outline when joinable). */
  variant: "primary" | "secondary";
}) {
  const joinable = canJoinMeeting(meeting.scheduledAt, meeting.durationMinutes);
  const href = meeting.publicMeetingUrl?.trim() || "";
  const label = `Join ${meeting.title}`;
  const base =
    "inline-flex min-h-11 min-w-[4.25rem] shrink-0 items-center justify-center rounded-lg px-3 text-[0.75rem] font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  if (joinable && href) {
    const active =
      variant === "primary"
        ? `${base} cursor-pointer bg-teal-600 text-white hover:bg-teal-700 focus-visible:outline-teal-600`
        : `${base} cursor-pointer text-teal-700 ring-1 ring-inset ring-teal-600/40 hover:bg-teal-500/10 focus-visible:outline-teal-600 dark:text-teal-300`;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={active}>
        Join
      </a>
    );
  }

  const idle =
    variant === "primary"
      ? `${base} cursor-not-allowed bg-teal-600 text-white opacity-40`
      : `${base} cursor-not-allowed text-textmuted opacity-50 ring-1 ring-inset ring-defaultborder dark:ring-white/10`;

  return (
    <button type="button" disabled title={JOIN_CLOSED} aria-label={`${label} — ${JOIN_CLOSED}`} className={idle}>
      Join
    </button>
  );
}

export default function MeetingsCard({ meetings, loading }: { meetings: InternalMeeting[]; loading: boolean }) {
  const visible = visibleMeetings(meetings);
  const next = visible[0] ?? null;
  const later = visible.slice(1);
  const shownLater = later.slice(0, MAX_LATER);
  const overflow = Math.max(0, later.length - shownLater.length);
  const todayVisible = visible.filter(
    (m) => new Date(m.scheduledAt).toDateString() === new Date().toDateString(),
  ).length;

  const action = (
    <Link
      href="/communication/meetings/"
      className="inline-flex min-h-9 items-center gap-1 rounded-md px-1 text-[0.75rem] text-textmuted transition-colors duration-150 hover:text-defaulttextcolor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-white/50"
    >
      Calendar
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </Link>
  );

  return (
    <DashboardCard
      title="Meetings"
      meta={`${todayVisible} today`}
      action={action}
      bodyClassName="px-5 pb-3.5 pt-2"
    >
      {loading ? (
        <div className="h-28 animate-pulse rounded-lg bg-defaultborder/60 dark:bg-white/5" aria-hidden />
      ) : !next ? (
        <div className="py-6 text-center" role="status">
          <p className="text-[0.8125rem] font-semibold">No meetings scheduled</p>
          <p className="mt-1 text-[0.72rem] text-textmuted dark:text-white/50">
            Meetings you&apos;re invited to appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {/* Next / live — single primary CTA */}
          <div
            className="flex items-center gap-3.5 rounded-xl bg-teal-500/10 p-3 ring-1 ring-teal-500/15"
            aria-label={`Next meeting: ${next.title}`}
          >
            <div className="shrink-0 border-e border-teal-500/25 pe-3.5 text-center">
              <p className="text-base font-bold tabular-nums text-teal-600 dark:text-teal-400">
                {hhmm(next.scheduledAt)}
              </p>
              <p className="mt-0.5 text-[0.65rem] text-textmuted dark:text-white/60">
                {statusLabel(next.scheduledAt)}
              </p>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.8125rem] font-semibold" title={next.title}>
                {next.title}
              </p>
              <p className="truncate text-[0.72rem] text-textmuted dark:text-white/60">
                {next.durationMinutes} min
              </p>
            </div>
            <JoinControl meeting={next} variant="primary" />
          </div>

          {shownLater.length > 0 ? (
            <ul className="m-0 list-none p-0" aria-label="Later meetings">
              {shownLater.map((m) => (
                <li
                  key={m.meetingId}
                  className="flex min-h-11 items-center gap-3 border-b border-defaultborder/60 py-2 last:border-b-0 dark:border-white/[0.07]"
                >
                  <span className="w-16 shrink-0 text-[0.7rem] tabular-nums text-textmuted dark:text-white/60">
                    {hhmm(m.scheduledAt)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.78rem] font-medium" title={m.title}>
                      {m.title}
                    </p>
                    <p className="truncate text-[0.65rem] text-textmuted dark:text-white/50">
                      {statusLabel(m.scheduledAt)} · {m.durationMinutes} min
                    </p>
                  </div>
                  <JoinControl meeting={m} variant="secondary" />
                </li>
              ))}
            </ul>
          ) : null}

          {overflow > 0 ? (
            <Link
              href="/communication/meetings/"
              className="mt-1 inline-flex min-h-9 items-center justify-center rounded-lg text-[0.72rem] font-medium text-teal-700 transition-colors duration-150 hover:bg-teal-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:text-teal-300"
            >
              +{overflow} more on Calendar
            </Link>
          ) : null}
        </div>
      )}
    </DashboardCard>
  );
}
