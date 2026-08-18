"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import { useAuth } from "@/shared/contexts/auth-context";
import { ROUTES } from "@/shared/lib/constants";
import { getMeWithCandidate, type CandidateWithProfile } from "@/shared/lib/api/auth";
import {
  getMyStudentForAttendance,
  getPunchInOutStatus, getPunchInOutStatusMe,
  punchInAttendance, punchInAttendanceMe,
  punchOutAttendance, punchOutAttendanceMe,
  getAttendanceStatistics, getAttendanceStatisticsMe,
  listAttendance, listAttendanceMe,
  type AttendanceIdentity, type PunchStatusResponse, type AttendanceStatistics, type AttendanceRecord,
} from "@/shared/lib/api/attendance";
import { getAllLeaveRequests, type LeaveRequest } from "@/shared/lib/api/leave-requests";
import DashboardCard from "./employee/DashboardCard";
import TodayCard from "./employee/TodayCard";
import LeaveCard from "./employee/LeaveCard";
import ProfileGapsCard from "./employee/ProfileGapsCard";
import DocumentsCard from "./employee/DocumentsCard";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/** Employees with a Student profile must use the id-scoped attendance routes; the
 *  `/me` routes are reserved for agents with no Student and 403 for everyone else. */
function isUserBased(identity: AttendanceIdentity | null): boolean {
  return identity?.type === "user";
}

export default function EmployeeDashboard(): JSX.Element {
  const { user } = useAuth();

  const [identity, setIdentity] = useState<AttendanceIdentity | null>(null);
  const [identityResolved, setIdentityResolved] = useState(false);

  const [status, setStatus] = useState<PunchStatusResponse | null>(null);
  const [stats, setStats] = useState<AttendanceStatistics | null>(null);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [attLoading, setAttLoading] = useState(true);
  const [punching, setPunching] = useState(false);

  const [leave, setLeave] = useState<LeaveRequest[]>([]);
  const [leaveLoading, setLeaveLoading] = useState(true);

  const [profile, setProfile] = useState<CandidateWithProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  /** Leave requests are scoped by Student id, so agents on user-based attendance have none. */
  const studentId = identity && identity.type !== "user" ? identity.id : null;

  useEffect(() => {
    let cancelled = false;
    getMyStudentForAttendance()
      .then((me) => { if (!cancelled) setIdentity(me); })
      .catch(() => { if (!cancelled) setIdentity(null); })
      .finally(() => { if (!cancelled) setIdentityResolved(true); });
    return () => { cancelled = true; };
  }, []);

  const loadAttendance = useCallback(async () => {
    if (!identity) { setAttLoading(false); return; }
    setAttLoading(true);
    const userBased = isUserBased(identity);
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    const range = { startDate: first.toISOString().slice(0, 10), endDate: now.toISOString().slice(0, 10) };
    const [s, st, rec] = await Promise.allSettled([
      userBased ? getPunchInOutStatusMe() : getPunchInOutStatus(identity.id),
      userBased ? getAttendanceStatisticsMe(range) : getAttendanceStatistics(identity.id, range),
      userBased ? listAttendanceMe({ ...range, limit: 31 }) : listAttendance(identity.id, { ...range, limit: 31 }),
    ]);
    if (s.status === "fulfilled") setStatus(s.value);
    if (st.status === "fulfilled") setStats(st.value);
    if (rec.status === "fulfilled") setRecords(rec.value.results ?? []);
    setAttLoading(false);
  }, [identity]);

  useEffect(() => { if (identityResolved) void loadAttendance(); }, [identityResolved, loadAttendance]);

  useEffect(() => {
    if (!identityResolved) return;
    if (!studentId) { setLeave([]); setLeaveLoading(false); return; }
    let cancelled = false;
    getAllLeaveRequests({ student: studentId, limit: 100 })
      .then((page) => { if (!cancelled) setLeave(page.results ?? []); })
      .catch(() => { if (!cancelled) setLeave([]); })
      .finally(() => { if (!cancelled) setLeaveLoading(false); });
    return () => { cancelled = true; };
  }, [identityResolved, studentId]);

  useEffect(() => {
    let cancelled = false;
    getMeWithCandidate()
      .then((res) => { if (!cancelled) setProfile(res?.candidate ?? null); })
      .catch(() => { if (!cancelled) setProfile(null); })
      .finally(() => { if (!cancelled) setProfileLoading(false); });
    return () => { cancelled = true; };
  }, []);

  /** Only fields the employee can actually fill in on Settings → Personal information. */
  const gaps = useMemo(() => {
    const href = ROUTES.settingsPersonalInfo;
    const checks: Array<{ label: string; href: string; ok: boolean }> = [
      { label: "Phone number", href, ok: Boolean(profile?.phoneNumber) },
      { label: "Address", href, ok: Boolean(profile?.address?.streetAddress) },
      { label: "Qualification", href, ok: (profile?.qualifications?.length ?? 0) > 0 },
      { label: "Work experience", href, ok: (profile?.experiences?.length ?? 0) > 0 },
      { label: "Skills", href, ok: (profile?.skills?.length ?? 0) > 0 },
    ];
    return checks.filter((c) => !c.ok).map(({ label, href: to }) => ({ label, href: to }));
  }, [profile]);

  const documentGroups = useMemo(() => {
    const docs = (profile?.documents ?? [])
      .filter((d) => Boolean(d.url))
      .map((d) => ({
        name: d.label || d.originalName || d.type || "Document",
        meta: d.type ?? "",
        href: d.url as string,
      }));
    const slips = (profile?.salarySlips ?? [])
      .filter((s) => Boolean(s.documentUrl))
      .map((s) => ({
        name: [s.month, s.year].filter(Boolean).join(" ") || s.originalName || "Payslip",
        meta: s.originalName ?? "",
        href: s.documentUrl as string,
      }));
    return [
      { caption: "Uploaded documents", items: docs },
      { caption: "Payslips uploaded by HR", items: slips },
    ];
  }, [profile]);

  const handlePunch = useCallback(async () => {
    if (!identity) return;
    setPunching(true);
    const userBased = isUserBased(identity);
    try {
      if (status?.isPunchedIn) {
        if (userBased) await punchOutAttendanceMe();
        else await punchOutAttendance(identity.id);
      } else if (userBased) {
        await punchInAttendanceMe();
      } else {
        await punchInAttendance(identity.id);
      }
      await loadAttendance();
    } catch {
      /* the card keeps the last known state; a reload surfaces the truth */
    } finally {
      setPunching(false);
    }
  }, [identity, status?.isPunchedIn, loadAttendance]);

  return (
    <Fragment>
      <Seo title="Dashboard" />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[18px] px-3.5 pb-10 pt-3.5 md:px-5 md:pt-5">

        <section className="rounded-2xl border border-defaultborder/70 bg-white px-5 py-4 text-center shadow-sm shadow-black/[0.03] dark:border-white/[0.08] dark:bg-bodybg dark:shadow-none">
          <h1 className="text-[0.9375rem] font-semibold tracking-[-0.012em] text-defaulttextcolor dark:text-defaulttextcolor/90">
            {greeting()}, <span className="text-teal-600 dark:text-teal-400">{user?.name ?? "there"}</span>
          </h1>
          <p className="mt-0.5 text-[0.75rem] text-textmuted dark:text-white/50">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </section>

        <div className="grid grid-cols-1 items-stretch gap-[18px] md:grid-cols-2 xl:grid-cols-[308px_minmax(0,1fr)_minmax(0,1fr)] 2xl:grid-cols-[340px_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-[18px] [&>section:last-child]:flex-1">
            <TodayCard status={status} stats={stats} records={records} loading={attLoading} onPunch={handlePunch} punching={punching} />
            <LeaveCard requests={leave} loading={leaveLoading} />
            {profileLoading || gaps.length > 0
              ? <ProfileGapsCard gaps={gaps} totalSections={5} loading={profileLoading} />
              : null}
            <DocumentsCard groups={documentGroups} loading={profileLoading} />
          </div>

          <div className="flex min-w-0 flex-col gap-[18px] [&>section:last-child]:flex-1">
            <DashboardCard title="Due today"><p>TODO Task 7</p></DashboardCard>
            <DashboardCard title="Meetings"><p>TODO Task 8</p></DashboardCard>
            <DashboardCard title="All my tasks"><p>TODO Task 7</p></DashboardCard>
          </div>

          <div className="flex min-w-0 flex-col gap-[18px] [&>section:last-child]:flex-1">
            <DashboardCard title="Upcoming Holidays"><p>TODO Task 10</p></DashboardCard>
            <DashboardCard title="Training"><p>TODO Task 6</p></DashboardCard>
            <DashboardCard title="Your team"><p>TODO Task 10</p></DashboardCard>
            <DashboardCard title="Open roles"><p>TODO Task 10</p></DashboardCard>
          </div>
        </div>

        <DashboardCard title="Projects you're on" bodyClassName="p-0">
          <p className="p-5">TODO Task 9</p>
        </DashboardCard>
      </div>
    </Fragment>
  );
}
