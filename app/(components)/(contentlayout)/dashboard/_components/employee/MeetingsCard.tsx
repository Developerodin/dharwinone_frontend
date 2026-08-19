"use client";

import Link from "next/link";
import DashboardCard from "./DashboardCard";
import { canJoinMeeting, minutesUntil, nextMeeting } from "@/shared/lib/dashboard/employeeDashboard";
import type { InternalMeeting } from "@/shared/lib/api/internal-meetings";

const JOIN_CLOSED = "Opens 10 minutes before the meeting starts";

function hhmm(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export default function MeetingsCard({ meetings, loading }: { meetings: InternalMeeting[]; loading: boolean }) {
  const next = nextMeeting(meetings);
  const rest = meetings.filter((m) => m.meetingId !== next?.meetingId && new Date(m.scheduledAt) >= new Date());
  const todayCount = meetings.filter((m) => new Date(m.scheduledAt).toDateString() === new Date().toDateString()).length;
  const nextJoinable = next ? canJoinMeeting(next.scheduledAt, next.durationMinutes) : false;

  const action = (
    <Link href="/communication/meetings/" className="inline-flex items-center gap-1 text-[0.75rem] text-textmuted hover:text-defaulttextcolor dark:text-white/50">
      Calendar
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </Link>
  );

  return (
    <DashboardCard title="Meetings" meta={`${todayCount} today`} action={action} bodyClassName="px-5 pb-3.5 pt-2">
      {loading ? (
        <div className="h-28 animate-pulse rounded-lg bg-defaultborder/60 dark:bg-white/5" />
      ) : !next ? (
        <div className="py-6 text-center">
          <p className="text-[0.8125rem] font-semibold">No meetings scheduled</p>
                    <p className="mt-1 text-[0.72rem] text-textmuted dark:text-white/50">Meetings you&apos;re invited to appear here.</p>
        </div>
      ) : (
        <>
          <div className="mb-1.5 flex items-center gap-3.5 rounded-xl bg-teal-500/10 p-3 ring-1 ring-teal-500/15">
            <div className="shrink-0 border-e border-teal-500/25 pe-3.5 text-center">
              <p className="text-base font-bold tabular-nums text-teal-600 dark:text-teal-400">{hhmm(next.scheduledAt)}</p>
              <p className="mt-0.5 text-[0.65rem] text-textmuted dark:text-white/60">in {minutesUntil(next.scheduledAt)}m</p>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.8125rem] font-semibold">{next.title}</p>
              <p className="truncate text-[0.72rem] text-textmuted dark:text-white/60">{next.durationMinutes} min</p>
            </div>
            {nextJoinable && next.publicMeetingUrl ? (
              <a href={next.publicMeetingUrl}
                className="inline-flex h-7 shrink-0 items-center rounded-lg bg-teal-600 px-3 text-[0.72rem] font-semibold text-white hover:bg-teal-700">
                Join
              </a>
            ) : (
              <button type="button" disabled title={JOIN_CLOSED}
                className="inline-flex h-7 shrink-0 items-center rounded-lg bg-teal-600 px-3 text-[0.72rem] font-semibold text-white opacity-40">
                Join
              </button>
            )}
          </div>

          {rest.slice(0, 3).map((m) => (
            <div key={m.meetingId} className="flex min-h-[2.625rem] items-center gap-3 border-b border-defaultborder/60 py-2 last:border-b-0 dark:border-white/[0.07]">
              <span className="w-16 shrink-0 text-[0.7rem] tabular-nums text-textmuted dark:text-white/60">{hhmm(m.scheduledAt)}</span>
              <span className="min-w-0 flex-1 truncate text-[0.78rem]">{m.title}</span>
              <button type="button" disabled title={JOIN_CLOSED}
                className="inline-flex h-7 shrink-0 items-center rounded-lg px-3 text-[0.72rem] font-semibold text-textmuted opacity-50 ring-1 ring-inset ring-defaultborder dark:ring-white/10">
                Join
              </button>
            </div>
          ))}
        </>
      )}
    </DashboardCard>
  );
}
