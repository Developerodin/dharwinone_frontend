"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/shared/contexts/auth-context";
import { useFeaturePermissions } from "@/shared/hooks/use-feature-permissions";
import { listActivityLogs } from "@/shared/lib/api/activity-logs";
import { getActivityActionDisplayForRow } from "@/shared/lib/activity-log-catalog";
import { ActivityLogChangesBlock } from "@/shared/components/activity-log-changes";
import type { ActivityLog } from "@/shared/lib/types";

const PAGE_SIZE = 15;

function formatDateTime(isoString: string | undefined): string {
  if (!isoString) return "—";
  try {
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

type EmployeeAuditPanelProps = {
  entityId: string;
  className?: string;
};

export default function EmployeeAuditPanel({ entityId, className = "" }: EmployeeAuditPanelProps) {
  const {
    permissions,
    permissionsLoaded,
    isPlatformSuperUser,
    isAdministrator,
    isDesignatedSuperadmin,
  } = useAuth();
  const logsActivityFeature = useFeaturePermissions("logs.activity");

  const canReadActivityLogs = useMemo(() => {
    if (isDesignatedSuperadmin || isPlatformSuperUser || isAdministrator) return true;
    if (permissions.some((p) => p === "activityLogs.read" || p === "activity.read")) return true;
    return logsActivityFeature.canView;
  }, [
    isDesignatedSuperadmin,
    isPlatformSuperUser,
    isAdministrator,
    permissions,
    logsActivityFeature.canView,
  ]);

  const [rows, setRows] = useState<ActivityLog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [entityId]);

  const load = useCallback(async () => {
    if (!canReadActivityLogs || !entityId) {
      setLoading(false);
      setRows([]);
      return;
    }
    setLoading(true);
    setError(false);
    try {
      const res = await listActivityLogs({
        entityType: "Candidate,Employee",
        entityId,
        page,
        limit: PAGE_SIZE,
        sortBy: "createdAt:desc",
      });
      setRows(res.results);
      setTotalPages(Math.max(1, res.totalPages || 1));
    } catch {
      setError(true);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [canReadActivityLogs, entityId, page]);

  useEffect(() => {
    if (!permissionsLoaded) return;
    void load();
  }, [load, permissionsLoaded]);

  if (!permissionsLoaded) {
    return (
      <div className={`rounded-xl border border-gray-200 bg-white p-4 dark:border-defaultborder/10 dark:bg-black/20 ${className}`}>
        <p className="mb-0 text-sm text-defaulttextcolor/60">Checking permissions…</p>
      </div>
    );
  }

  if (!canReadActivityLogs) {
    return (
      <section
        className={`rounded-xl border border-gray-200 bg-white dark:border-defaultborder/10 dark:bg-black/20 ${className}`}
        aria-label="Employee activity history"
      >
        <div className="border-b border-gray-100 px-4 py-3 dark:border-white/5 sm:px-5">
          <h4 className="mb-0 text-sm font-semibold text-gray-900 dark:text-white">Activity history</h4>
        </div>
        <div className="px-4 py-4 sm:px-5">
          <p className="mb-0 text-sm text-defaulttextcolor/70">
            You need <code className="text-xs">activity.read</code> or{" "}
            <code className="text-xs">activityLogs.read</code> to view employee audit history.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`rounded-xl border border-gray-200 bg-white dark:border-defaultborder/10 dark:bg-black/20 ${className}`}
      aria-label="Employee activity history"
    >
      <div className="border-b border-gray-100 px-4 py-3 dark:border-white/5 sm:px-5">
        <div className="flex items-start gap-3">
          <span
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
            aria-hidden
          >
            <i className="ri-history-line text-lg" />
          </span>
          <div>
            <h4 className="mb-0 text-sm font-semibold text-gray-900 dark:text-white">Activity history</h4>
            <p className="mb-0 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              Profile edits, documents, offers, and other actions on this employee record.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-5">
        {loading ? (
          <p className="mb-0 text-sm text-defaulttextcolor/60" role="status">Loading activity…</p>
        ) : error ? (
          <div className="flex flex-wrap items-center gap-3">
            <p className="mb-0 text-sm text-danger">Could not load activity history.</p>
            <button type="button" className="ti-btn ti-btn-light !py-1.5 !px-3 !text-xs" onClick={() => void load()}>
              Retry
            </button>
          </div>
        ) : !rows.length ? (
          <p className="mb-0 text-sm text-defaulttextcolor/70">No activity recorded for this employee yet.</p>
        ) : (
          <ol className="mb-0 space-y-4">
            {rows.map((log) => {
              const display = getActivityActionDisplayForRow(log);
              return (
                <li
                  key={log.id}
                  className="rounded-lg border border-defaultborder/50 bg-gray-50/50 px-3 py-3 dark:bg-black/20"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="mb-0 text-sm font-medium text-defaulttextcolor dark:text-white">
                        {display.title}
                      </p>
                      <p className="mb-0 mt-0.5 text-xs text-defaulttextcolor/60">
                        {log.actor?.name?.trim() || "System"} · {formatDateTime(log.createdAt)}
                      </p>
                    </div>
                    <span
                      className="shrink-0 rounded-full bg-light px-2 py-0.5 text-[0.65rem] font-mono text-defaulttextcolor/55 dark:bg-white/5"
                      title={log.action}
                    >
                      {log.action}
                    </span>
                  </div>
                  <ActivityLogChangesBlock log={log} />
                </li>
              );
            })}
          </ol>
        )}

        {totalPages > 1 ? (
          <nav className="mt-4 flex items-center justify-between gap-2" aria-label="Employee activity pagination">
            <button
              type="button"
              className="ti-btn ti-btn-light !py-1.5 !px-3 !text-[0.8125rem] disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Prev
            </button>
            <span className="text-[0.8125rem] text-defaulttextcolor/65">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              className="ti-btn ti-btn-light !py-1.5 !px-3 !text-[0.8125rem] disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
