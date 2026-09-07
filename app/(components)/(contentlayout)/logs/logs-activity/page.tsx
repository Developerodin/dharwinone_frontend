"use client";

import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Seo from "@/shared/layout-components/seo/seo";
import { useAuth } from "@/shared/contexts/auth-context";
import { useFeaturePermissions } from "@/shared/hooks/use-feature-permissions";
import type { ActivityLog } from "@/shared/lib/types";
import * as activityLogsApi from "@/shared/lib/api/activity-logs";
import { AxiosError } from "axios";
import {
  getActionDisplay,
  getActivityActionDisplayForRow,
  getCandidateActivityEntitySummary,
  getDepartmentActivityEntitySummary,
  getEmployeeOrgActivityEntitySummary,
  getEntityTypeDisplay,
  getGroupedActionOptions,
  getGroupedEntityTypeOptions,
  getImpersonationEntitySummary,
  getResolvedEntityNameSummary,
  getJobActivityEntitySummary,
  getOrgMutateDeniedEntitySummary,
  getOrgStructureActivityEntitySummary,
  getOrgUnitActivityEntitySummary,
  getRoleActivityEntitySummary,
  getUserActivityEntitySummary,
} from "@/shared/lib/activity-log-catalog";
import { ActivityLogFilterSelect } from "@/shared/components/activity-log-filter-select";
import { ActivityLogLocationCell } from "@/shared/components/activity-log-location-cell";
import ListPagination from "@/shared/components/ListPagination";
import { getActivityLogDisplayIp } from "@/shared/lib/activity-log-location-display";
import { formatYmdLocal, parseYmdLocal } from "@/shared/lib/leave-date-range";
import { formatUserAgentSummary, parseUserAgentDetails } from "@/shared/lib/parse-user-agent";
import {
  canOpenActivityLogEntity,
  getActivityLogEntityHref,
} from "@/shared/lib/activity-log-entity-routes";

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
      second: "2-digit",
    });
  } catch {
    return "—";
  }
}

/**
 * Rows are timestamped in the viewer's local zone and the presets below are built from local
 * calendar days, so the bounds sent to the API have to be that local day's real instants. Stamping
 * `T00:00:00.000Z` instead (what this did before) shifted every boundary by the UTC offset: in IST
 * a "Sep 1 – Sep 1" range actually queried 05:30 Sep 1 → 05:29 Sep 2, quietly dropping the first
 * five and a half hours of the day and pulling in the next morning's.
 */
function toIsoStartOfDay(date: string | null): string | undefined {
  if (!date) return undefined;
  const parsed = parseYmdLocal(date);
  if (!parsed || Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
}

function toIsoEndOfDay(date: string | null): string | undefined {
  if (!date) return undefined;
  const parsed = parseYmdLocal(date);
  if (!parsed || Number.isNaN(parsed.getTime())) return undefined;
  const end = new Date(
    parsed.getFullYear(),
    parsed.getMonth(),
    parsed.getDate(),
    23,
    59,
    59,
    999
  );
  return end.toISOString();
}

type DatePreset = "7d" | "30d" | "3m" | "all" | "custom";

type LogRowModel = {
  actionDisp: ReturnType<typeof getActivityActionDisplayForRow>;
  entityDisp: ReturnType<typeof getEntityTypeDisplay>;
  entityRich: ReturnType<typeof getOrgMutateDeniedEntitySummary>;
  entityHref: string | null;
  canOpenEntity: boolean;
};

function buildLogRowModel(
  log: ActivityLog,
  permissions: string[],
  isAdministrator: boolean,
  isPlatformSuperUser: boolean
): LogRowModel {
  return {
    actionDisp: getActivityActionDisplayForRow(log),
    entityDisp: getEntityTypeDisplay(log.entityType),
    entityRich:
      getOrgMutateDeniedEntitySummary(log) ??
      getOrgUnitActivityEntitySummary(log) ??
      getDepartmentActivityEntitySummary(log) ??
      getOrgStructureActivityEntitySummary(log) ??
      getEmployeeOrgActivityEntitySummary(log) ??
      getCandidateActivityEntitySummary(log) ??
      getJobActivityEntitySummary(log) ??
      getRoleActivityEntitySummary(log) ??
      getUserActivityEntitySummary(log) ??
      getImpersonationEntitySummary(log) ??
      getResolvedEntityNameSummary(log),
    entityHref: getActivityLogEntityHref(log.entityType, log.entityId),
    canOpenEntity: canOpenActivityLogEntity(
      log.entityType,
      log.entityId,
      permissions,
      isAdministrator,
      isPlatformSuperUser
    ),
  };
}

/**
 * "Chrome 152 · Windows 10 / 11 (64-bit)" instead of three wrapped lines of
 * `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit…`, which took a quarter of every row and
 * told the reader nothing they could act on. The raw string stays on the cell's `title`.
 */
function shortDeviceLabel(userAgent: string | null | undefined): string {
  const parsed = parseUserAgentDetails(userAgent);
  if (!parsed) return "—";
  return `${parsed.browser} · ${parsed.os}`;
}

function presetToRange(preset: DatePreset): { start: string; end: string } {
  if (preset === "all" || preset === "custom") return { start: "", end: "" };
  const now = new Date();
  const end = formatYmdLocal(now);
  const startDate = new Date(now);
  if (preset === "7d") startDate.setDate(now.getDate() - 6);
  else if (preset === "30d") startDate.setDate(now.getDate() - 29);
  else if (preset === "3m") startDate.setMonth(now.getMonth() - 3);
  return { start: formatYmdLocal(startDate), end };
}

const DATE_PRESETS: { key: DatePreset; label: string }[] = [
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
  { key: "3m", label: "Last 3 months" },
  { key: "all", label: "All time" },
  { key: "custom", label: "Custom…" },
];

const PRESET_KEYS = new Set<string>(DATE_PRESETS.map((p) => p.key));
const PAGE_SIZES = [10, 20, 50, 100];
const SORT_FIELDS = ["createdAt", "action", "entityType"] as const;
type SortField = (typeof SORT_FIELDS)[number];
const DEFAULT_SORT = "createdAt:desc";

type LogFilters = {
  q: string;
  action: string;
  entityType: string;
  preset: DatePreset;
  startDate: string;
  endDate: string;
  sortBy: string;
  includeAttendance: boolean;
  page: number;
  limit: number;
};

const DEFAULT_PRESET: DatePreset = "7d";
const DEFAULT_LIMIT = 20;

function isValidSort(value: string): boolean {
  const [field, dir] = value.split(":");
  return (
    (SORT_FIELDS as readonly string[]).includes(field) && (dir === "asc" || dir === "desc")
  );
}

type SearchParamsLike = { get(name: string): string | null };

/** The URL is the source of truth for filters, so refresh, Back and a shared link all behave. */
function readFilters(sp: SearchParamsLike): LogFilters {
  const preset = sp.get("when") ?? "";
  const sortBy = sp.get("sort") ?? "";
  const limit = Number(sp.get("limit"));
  const page = Number(sp.get("page"));
  const ymd = (key: string) => {
    const value = (sp.get(key) ?? "").trim();
    return parseYmdLocal(value) ? value : "";
  };
  return {
    q: (sp.get("q") ?? "").trim(),
    action: (sp.get("action") ?? "").trim(),
    entityType: (sp.get("entity") ?? "").trim(),
    preset: PRESET_KEYS.has(preset) ? (preset as DatePreset) : DEFAULT_PRESET,
    startDate: ymd("from"),
    endDate: ymd("to"),
    sortBy: isValidSort(sortBy) ? sortBy : DEFAULT_SORT,
    includeAttendance: sp.get("attendance") === "1",
    page: Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1,
    limit: PAGE_SIZES.includes(limit) ? limit : DEFAULT_LIMIT,
  };
}

/** Only non-defaults reach the address bar, so an untouched page keeps a clean URL. */
function filtersToQueryString(f: LogFilters): string {
  const sp = new URLSearchParams();
  if (f.q) sp.set("q", f.q);
  if (f.action) sp.set("action", f.action);
  if (f.entityType) sp.set("entity", f.entityType);
  if (f.preset !== DEFAULT_PRESET) sp.set("when", f.preset);
  if (f.preset === "custom") {
    if (f.startDate) sp.set("from", f.startDate);
    if (f.endDate) sp.set("to", f.endDate);
  }
  if (f.sortBy !== DEFAULT_SORT) sp.set("sort", f.sortBy);
  if (f.includeAttendance) sp.set("attendance", "1");
  if (f.limit !== DEFAULT_LIMIT) sp.set("limit", String(f.limit));
  if (f.page > 1) sp.set("page", String(f.page));
  return sp.toString();
}

function ActivityLogEntityCell({
  log,
  model,
}: {
  log: ActivityLog;
  model: LogRowModel;
}) {
  const { entityDisp, entityRich, entityHref, canOpenEntity } = model;
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      {entityRich ? (
        <>
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
            <span className="text-[0.65rem] uppercase tracking-wide text-defaulttextcolor/50">
              {entityDisp.title}
            </span>
            <span className="font-semibold text-defaulttextcolor text-[0.8125rem]">
              {entityRich.headline}
            </span>
          </div>
          {entityRich.detailLines.map((line, i) => (
            <span key={i} className="text-[0.7rem] text-defaulttextcolor/75">
              {line}
            </span>
          ))}
        </>
      ) : (
        <span>{entityDisp.title}</span>
      )}
      {entityHref && canOpenEntity ? (
        <Link
          href={entityHref}
          className={
            entityRich
              ? "text-[0.65rem] text-primary font-mono break-all hover:underline"
              : "text-[0.7rem] text-primary break-all hover:underline"
          }
          title="Open linked entity"
        >
          {log.entityId ?? "—"}
        </Link>
      ) : (
        <span
          className={
            entityRich
              ? "text-[0.65rem] text-defaulttextcolor/45 font-mono break-all"
              : "text-[0.7rem] text-defaulttextcolor/70 break-all"
          }
          title={entityRich ? "Database id (reference)" : undefined}
        >
          {log.entityId ?? "—"}
        </span>
      )}
    </div>
  );
}

const HEADER_CELL =
  "px-4 py-2.5 text-start font-semibold sticky top-0 z-10 bg-gray-50 dark:bg-bodybg";

function SortableHeader({
  label,
  field,
  sortBy,
  onSort,
  className = "",
}: {
  label: string;
  field: SortField;
  sortBy: string;
  onSort: (field: SortField) => void;
  className?: string;
}) {
  const [activeField, activeDir] = sortBy.split(":");
  const isActive = activeField === field;
  return (
    <th
      className={`${HEADER_CELL} ${className}`}
      aria-sort={isActive ? (activeDir === "asc" ? "ascending" : "descending") : "none"}
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className="inline-flex items-center gap-1 font-semibold hover:text-primary"
      >
        {label}
        <i
          className={`text-[0.9rem] leading-none ${
            isActive
              ? activeDir === "asc"
                ? "ri-arrow-up-s-line text-primary"
                : "ri-arrow-down-s-line text-primary"
              : "ri-arrow-up-down-line text-defaulttextcolor/35"
          }`}
          aria-hidden
        />
      </button>
    </th>
  );
}

function FilterChip({
  label,
  onRemove,
  removeLabel,
}: {
  label: React.ReactNode;
  onRemove: () => void;
  removeLabel: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 text-[0.75rem] ps-2 pe-1 py-1 rounded bg-primary/10 text-primary">
      {label}
      <button
        type="button"
        aria-label={removeLabel}
        onClick={onRemove}
        // A bare "✕" glyph left this with a ~10px hit area. The negative margin lets a true 24×24
        // target sit inside the chip without making the chip itself any taller.
        className="inline-flex items-center justify-center w-6 h-6 -my-0.5 rounded hover:bg-primary/20"
      >
        <i className="ri-close-line text-[0.85rem] leading-none" aria-hidden />
      </button>
    </span>
  );
}

export default function LogsActivityPage() {
  const {
    user: currentUser,
    permissions,
    permissionsLoaded,
    isPlatformSuperUser,
    isAdministrator,
    isDesignatedSuperadmin,
  } = useAuth();
  const logsActivityFeature = useFeaturePermissions("logs.activity");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const canReadActivityLogs = useMemo(() => {
    if (isDesignatedSuperadmin) return true;
    if (isPlatformSuperUser) return true;
    if (isAdministrator) return true;
    if (permissions.some((p) => p === "activityLogs.read" || p === "activity.read")) return true;
    return logsActivityFeature.canView;
  }, [
    isDesignatedSuperadmin,
    isPlatformSuperUser,
    isAdministrator,
    permissions,
    logsActivityFeature.canView,
  ]);

  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const {
    q,
    action,
    entityType,
    preset: datePreset,
    startDate,
    endDate,
    sortBy,
    includeAttendance,
    page,
    limit,
  } = filters;

  /**
   * ponytail: last write wins. Two filter changes inside one tick would both build on the
   * pre-change URL and the first would be lost — fine for a filter bar driven by clicks. Move to a
   * reducer over `useSearchParams` if that ever stops being true.
   */
  const setFilters = useCallback(
    (patch: Partial<LogFilters>) => {
      const next: LogFilters = { ...filters, ...patch };
      if (!("page" in patch)) next.page = 1;
      const qs = filtersToQueryString(next);
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [filters, pathname, router]
  );

  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportNote, setExportNote] = useState("");
  const [error, setError] = useState<string>("");
  const [forbidden, setForbidden] = useState(false);

  const [searchInput, setSearchInput] = useState(q);
  const fetchIdRef = useRef(0);
  const customDateIncomplete = datePreset === "custom" && (!startDate || !endDate);

  const canFilter =
    isPlatformSuperUser ||
    logsActivityFeature.canDelete ||
    (logsActivityFeature.canCreate && logsActivityFeature.canEdit);

  const activeFilterCount =
    (q.trim() ? 1 : 0) +
    (action.trim() ? 1 : 0) +
    (entityType.trim() ? 1 : 0) +
    (datePreset !== DEFAULT_PRESET ? 1 : 0) +
    (includeAttendance ? 1 : 0);
  const hasActiveFilters = activeFilterCount > 0;

  // Open on arrival only when the link carried filters: the table gets the viewport by default,
  // but a shared URL still shows what produced it.
  const [filtersOpen, setFiltersOpen] = useState(() => hasActiveFilters);

  // Keeps the box in step when the URL changes underneath it (Back, Clear all, a shared link)
  // without fighting the user mid-keystroke.
  useEffect(() => {
    setSearchInput((prev) => (prev.trim() === q ? prev : q));
  }, [q]);

  useEffect(() => {
    const typed = searchInput.trim();
    if (typed === q) return;
    const t = setTimeout(() => setFilters({ q: typed }), 350);
    return () => clearTimeout(t);
  }, [searchInput, q, setFilters]);

  const rangeForApi = useMemo(
    () =>
      datePreset === "custom"
        ? { start: startDate, end: endDate }
        : presetToRange(datePreset),
    [datePreset, startDate, endDate]
  );

  const fetchLogs = useCallback(async () => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);
    setError("");
    setForbidden(false);

    const params: activityLogsApi.ListActivityLogsParams = {
      action: action.trim() || undefined,
      entityType: entityType.trim() || undefined,
      q: q.trim() || undefined,
      startDate: toIsoStartOfDay(rangeForApi.start || null) ?? undefined,
      endDate: toIsoEndOfDay(rangeForApi.end || null) ?? undefined,
      includeAttendance: includeAttendance || undefined,
      sortBy,
      page,
      limit,
    };

    try {
      const res = await activityLogsApi.listActivityLogs(params);
      if (fetchId !== fetchIdRef.current) return;
      setLogs(res.results ?? []);
      setTotalPages(res.totalPages ?? 1);
      setTotalResults(res.totalResults ?? 0);
    } catch (err) {
      if (fetchId !== fetchIdRef.current) return;
      if (err instanceof AxiosError && err.response?.status === 403) {
        setForbidden(true);
        setError(
          "You do not have permission to view activity logs. Ask an admin to grant logs.activity:view (or equivalent)."
        );
        setLogs([]);
      } else {
        const msg =
          err instanceof AxiosError && err.response?.data?.message
            ? String(err.response.data.message)
            : "Failed to load activity logs.";
        setError(msg);
        setLogs([]);
      }
    } finally {
      if (fetchId !== fetchIdRef.current) return;
      setLoading(false);
    }
  }, [action, entityType, q, rangeForApi, includeAttendance, sortBy, page, limit]);

  useEffect(() => {
    if (!permissionsLoaded || !canReadActivityLogs) {
      return;
    }
    if (customDateIncomplete) {
      setLoading(false);
      setLogs([]);
      setTotalResults(0);
      setTotalPages(1);
      setError("");
      return;
    }
    fetchLogs();
  }, [
    permissionsLoaded,
    canReadActivityLogs,
    customDateIncomplete,
    fetchLogs,
  ]);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setFilters({ page: totalPages });
    }
  }, [page, totalPages, setFilters]);

  const rangeLabel = useMemo(() => {
    const { start, end } = rangeForApi;
    if (!start && !end) return "all-time";
    if (start === end) return start;
    return `${start || "start"}_${end || "today"}`;
  }, [rangeForApi]);

  const buildExportParams = useCallback(
    (): activityLogsApi.ExportActivityLogsParams => ({
      action: action.trim() || undefined,
      entityType: entityType.trim() || undefined,
      q: q.trim() || undefined,
      startDate: toIsoStartOfDay(rangeForApi.start || null) ?? undefined,
      endDate: toIsoEndOfDay(rangeForApi.end || null) ?? undefined,
      includeAttendance: includeAttendance || undefined,
    }),
    [action, entityType, q, rangeForApi, includeAttendance]
  );

  const handleExportExcel = async () => {
    if (customDateIncomplete) return;
    setExporting(true);
    setError("");
    setExportNote("");
    try {
      await activityLogsApi.downloadActivityLogsExcel(buildExportParams(), rangeLabel);
      setExportNote(`Downloaded ${totalResults} row${totalResults === 1 ? "" : "s"}.`);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 404) {
        setError("No activity logs match the selected filters.");
        return;
      }
      let msg = "Export failed.";
      if (err instanceof AxiosError && err.response?.data) {
        const d = err.response.data;
        if (d instanceof Blob) {
          try {
            const t = await d.text();
            const j = JSON.parse(t) as { message?: string };
            msg = j.message ?? msg;
          } catch {
            msg = String(d);
          }
        } else if (typeof d === "object" && d != null && "message" in d) {
          msg = String((d as { message: string }).message);
        }
      }
      setError(msg);
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    if (!exportNote) return;
    const t = setTimeout(() => setExportNote(""), 5000);
    return () => clearTimeout(t);
  }, [exportNote]);

  const handleClearFilters = () => {
    setSearchInput("");
    router.replace(pathname, { scroll: false });
  };

  const handleSort = (field: SortField) => {
    const [activeField, activeDir] = sortBy.split(":");
    const nextDir = activeField === field && activeDir === "desc" ? "asc" : "desc";
    setFilters({ sortBy: `${field}:${nextDir}` });
  };

  const handlePresetChange = (nextPreset: DatePreset) => {
    if (nextPreset !== "custom") {
      setFilters({ preset: nextPreset, startDate: "", endDate: "" });
      return;
    }
    // Carry the range already on screen into the custom fields instead of blanking the table and
    // asking for two dates from scratch.
    const seed = presetToRange(datePreset);
    setFilters({
      preset: "custom",
      startDate: startDate || seed.start,
      endDate: endDate || seed.end,
    });
  };

  const accessLoading = !permissionsLoaded;
  const showToolbar = !accessLoading && canReadActivityLogs && !forbidden;
  const showPagination = !customDateIncomplete && (logs.length > 0 || hasActiveFilters);
  const showSkeleton = loading && logs.length === 0;
  const activeRangeLabel = DATE_PRESETS.find((p) => p.key === datePreset)?.label ?? "";

  return (
    <Fragment>
      <Seo title="Activity Logs" />
      <div className="mt-5 grid grid-cols-12 gap-6 h-[calc(100vh-8rem)] sm:mt-6">
        <div className="xl:col-span-12 col-span-12 h-full min-h-0 flex flex-col">
          <div className="box custom-box h-full min-h-0 flex flex-col overflow-hidden">
            <div className="box-header shrink-0 flex flex-col gap-3 !items-stretch !px-5 !py-3 sm:!py-4 bg-white dark:bg-bodybg">
              <div className="flex w-full min-w-0 items-center justify-between flex-wrap gap-3 sm:gap-4">
                <div className="box-title mb-0 !me-0 shrink-0 flex items-baseline gap-2">
                  Activity Logs
                  {showToolbar && (
                    <span className="text-[0.75rem] font-normal text-defaulttextcolor/70">
                      <span className="font-semibold text-defaulttextcolor">{totalResults}</span>{" "}
                      matching
                      {activeRangeLabel && datePreset !== "all" && datePreset !== "custom" && (
                        <span className="text-defaulttextcolor/55">
                          {" "}
                          · {activeRangeLabel.toLowerCase()}
                        </span>
                      )}
                    </span>
                  )}
                </div>
                {showToolbar && (
                  <div className="flex flex-wrap gap-2 items-center shrink-0 ms-auto">
                    {isDesignatedSuperadmin && (
                      <Link
                        href="/logs/logs-activity/platform"
                        className="ti-btn ti-btn-soft-primary !py-1 !px-3 !text-[0.75rem]"
                      >
                        Platform audit console
                      </Link>
                    )}
                    {canFilter && (
                      <button
                        type="button"
                        className={`ti-btn !py-1 !px-3 !text-[0.75rem] !mb-0 ${
                          filtersOpen || hasActiveFilters ? "ti-btn-soft-primary" : "ti-btn-light"
                        }`}
                        onClick={() => setFiltersOpen((open) => !open)}
                        aria-expanded={filtersOpen}
                        aria-controls="activity-logs-filters"
                      >
                        <i className="ri-filter-3-line me-1" aria-hidden />
                        Filters
                        {activeFilterCount > 0 && (
                          <span className="ms-1.5 inline-flex items-center justify-center min-w-[1.15rem] h-[1.15rem] px-1 rounded-full text-[0.65rem] font-semibold bg-primary text-white">
                            {activeFilterCount}
                          </span>
                        )}
                        <i
                          className={`ms-1 ri-arrow-${filtersOpen ? "up" : "down"}-s-line`}
                          aria-hidden
                        />
                      </button>
                    )}
                    <select
                      className="form-control select-show-page-size !w-auto !py-1 !px-4 !text-[0.75rem]"
                      value={limit}
                      onChange={(e) => setFilters({ limit: Number(e.target.value) })}
                      aria-label="Results per page"
                    >
                      {PAGE_SIZES.map((size) => (
                        <option key={size} value={size}>
                          Show {size}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="ti-btn ti-btn-soft-primary !py-1 !px-3 !text-[0.75rem] !mb-0"
                      onClick={handleExportExcel}
                      // Deliberately not disabled while the list reloads: the debounced search
                      // re-fetches on every keystroke and the button used to flicker inert.
                      disabled={exporting || customDateIncomplete || totalResults === 0}
                      aria-label={`Export all ${totalResults} matching activity logs as Excel`}
                      aria-busy={exporting}
                    >
                      {exporting ? (
                        <i
                          className="ri-loader-4-line animate-spin motion-reduce:animate-none me-1"
                          aria-hidden
                        />
                      ) : (
                        <i className="ri-download-2-line me-1" aria-hidden />
                      )}
                      {exporting ? "Exporting..." : `Export ${totalResults} rows`}
                    </button>
                    {currentUser && (
                      <span className="text-[0.75rem] text-defaulttextcolor/70 ps-3 border-s border-defaultborder">
                        Viewing as{" "}
                        <span className="font-medium text-defaulttextcolor">
                          {currentUser.name ?? currentUser.email}
                        </span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {exportNote && (
                <p
                  className="mb-0 text-[0.75rem] text-success flex items-center gap-1"
                  role="status"
                  aria-live="polite"
                >
                  <i className="ri-check-line" aria-hidden />
                  {exportNote}
                </p>
              )}

              {canFilter && showToolbar && (
                <>
                  <div
                    id="activity-logs-filters"
                    className={`w-full p-4 rounded-lg border border-defaultborder bg-gray-50/50 dark:bg-gray-800/30 ${
                      filtersOpen ? "" : "hidden"
                    }`}
                  >
                    <div className="mb-3">
                      <label htmlFor="logs-search" className="form-label !text-[0.75rem] mb-1">
                        Search
                      </label>
                      <input
                        id="logs-search"
                        type="search"
                        className="form-control !py-2 !text-[0.8125rem] w-full"
                        placeholder="Search by person, email, action, entity type, ID or IP…"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        aria-describedby="logs-search-help"
                      />
                      <p
                        id="logs-search-help"
                        className="mt-1 mb-0 text-[0.7rem] text-defaulttextcolor/55"
                      >
                        Matches the actor, the action code, the entity type or ID, and the name of
                        the record that changed.
                      </p>
                    </div>

                    <div className="mb-3">
                      <label id="logs-when-label" className="form-label !text-[0.75rem] mb-1">
                        When
                      </label>
                      <div
                        className="flex flex-wrap items-center gap-2"
                        role="group"
                        aria-labelledby="logs-when-label"
                      >
                        {DATE_PRESETS.map((p) => (
                          <button
                            key={p.key}
                            type="button"
                            onClick={() => handlePresetChange(p.key)}
                            aria-pressed={datePreset === p.key}
                            className={
                              "ti-btn !py-1 !px-3 !text-[0.75rem] !mb-0 " +
                              (datePreset === p.key ? "ti-btn-primary" : "ti-btn-light")
                            }
                          >
                            {p.label}
                          </button>
                        ))}

                        {/* Kept inside the When group: these are the controls that group just
                            spawned, and they used to land a row below, beside Action. */}
                        {datePreset === "custom" && (
                          <>
                            <label
                              htmlFor="logs-start-date"
                              className="text-[0.75rem] text-defaulttextcolor/70 ms-1"
                            >
                              From
                            </label>
                            <input
                              id="logs-start-date"
                              type="date"
                              className="form-control !py-1 !text-[0.8125rem] !w-auto"
                              value={startDate}
                              max={endDate || undefined}
                              onChange={(e) => setFilters({ startDate: e.target.value })}
                            />
                            <label
                              htmlFor="logs-end-date"
                              className="text-[0.75rem] text-defaulttextcolor/70"
                            >
                              To
                            </label>
                            <input
                              id="logs-end-date"
                              type="date"
                              className="form-control !py-1 !text-[0.8125rem] !w-auto"
                              value={endDate}
                              min={startDate || undefined}
                              onChange={(e) => setFilters({ endDate: e.target.value })}
                            />
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-end gap-3">
                      <div className="w-full sm:min-w-[14rem] sm:w-auto sm:flex-1">
                        <label htmlFor="logs-action" className="form-label !text-[0.75rem] mb-1">
                          Action
                        </label>
                        <ActivityLogFilterSelect
                          inputId="logs-action"
                          groups={getGroupedActionOptions()}
                          value={action}
                          onChange={(next) => setFilters({ action: next })}
                          placeholder="Any action"
                          noOptionsMessage="No matching actions"
                        />
                      </div>
                      <div className="w-full sm:min-w-[14rem] sm:w-auto sm:flex-1">
                        <label
                          htmlFor="logs-entity-type"
                          className="form-label !text-[0.75rem] mb-1"
                        >
                          Entity type
                        </label>
                        <ActivityLogFilterSelect
                          inputId="logs-entity-type"
                          groups={getGroupedEntityTypeOptions()}
                          value={entityType}
                          onChange={(next) => setFilters({ entityType: next })}
                          placeholder="Any entity"
                          noOptionsMessage="No matching entity types"
                        />
                      </div>
                    </div>

                    {/* Attendance punches are excluded by default server-side. Left unstated, that
                        exclusion is invisible — not something an audit log should hide. */}
                    <label className="flex items-start gap-2 mt-3 mb-0 cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-check-input mt-0.5"
                        checked={includeAttendance}
                        onChange={(e) => setFilters({ includeAttendance: e.target.checked })}
                      />
                      <span className="text-[0.75rem] leading-snug">
                        Include attendance events
                        <span className="block text-[0.7rem] text-defaulttextcolor/55">
                          Punch in / punch out entries are hidden by default because they outnumber
                          everything else.
                        </span>
                      </span>
                    </label>

                    {customDateIncomplete && (
                      <p className="mt-3 mb-0 text-[0.8125rem] text-warning">
                        Select both start and end dates to load custom range results.
                      </p>
                    )}
                  </div>

                  {/* Outside the collapsible panel on purpose: a filter you cannot see is worse
                      than a panel you have to open. */}
                  {hasActiveFilters && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[0.7rem] uppercase tracking-wide text-defaulttextcolor/50">
                        Active
                      </span>
                      {datePreset !== DEFAULT_PRESET && (
                        <FilterChip
                          label={
                            datePreset === "custom" && startDate && endDate
                              ? `${startDate} → ${endDate}`
                              : activeRangeLabel
                          }
                          removeLabel="Remove date range filter"
                          onRemove={() =>
                            setFilters({ preset: DEFAULT_PRESET, startDate: "", endDate: "" })
                          }
                        />
                      )}
                      {action.trim() && (
                        <FilterChip
                          label={getActionDisplay(action).title}
                          removeLabel="Remove action filter"
                          onRemove={() => setFilters({ action: "" })}
                        />
                      )}
                      {entityType.trim() && (
                        <FilterChip
                          label={getEntityTypeDisplay(entityType).title}
                          removeLabel="Remove entity type filter"
                          onRemove={() => setFilters({ entityType: "" })}
                        />
                      )}
                      {includeAttendance && (
                        <FilterChip
                          label="Attendance included"
                          removeLabel="Exclude attendance events"
                          onRemove={() => setFilters({ includeAttendance: false })}
                        />
                      )}
                      {q.trim() && (
                        <FilterChip
                          label={`“${q.trim()}”`}
                          removeLabel="Remove search filter"
                          onRemove={() => {
                            setSearchInput("");
                            setFilters({ q: "" });
                          }}
                        />
                      )}
                      <button
                        type="button"
                        onClick={handleClearFilters}
                        className="ti-btn ti-btn-light !py-1 !px-3 !text-[0.75rem] !mb-0"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="box-body !p-0 flex-1 flex flex-col overflow-hidden min-h-0">
              {error && (
                <div className="shrink-0 p-4 mx-3 sm:mx-4 mt-3 mb-0 bg-danger/10 border border-danger/30 text-danger rounded-md text-sm">
                  {error}
                </div>
              )}

              {accessLoading ? (
                <div className="flex flex-1 min-h-[40vh] items-center justify-center">
                  <div className="ti-btn ti-btn-primary ti-btn-loading">Checking access...</div>
                </div>
              ) : !canReadActivityLogs ? (
                <div className="shrink-0 p-4 mx-3 sm:mx-4 mt-3 bg-warning/10 border border-warning/30 text-warning rounded-md text-sm">
                  You need the <span className="font-semibold">logs.activity:view</span> permission (or Administrator /
                  platform access) to view activity logs.
                </div>
              ) : forbidden ? null : customDateIncomplete ? (
                <div className="flex flex-1 items-center justify-center px-4 py-10 text-center text-defaulttextcolor/70 text-sm">
                  Choose start and end dates above to view activity logs for a custom range.
                </div>
              ) : !loading && logs.length === 0 ? (
                <div className="flex flex-1 items-center justify-center mx-3 sm:mx-4 mt-3 rounded-lg border border-defaultborder px-4 py-10 text-center text-defaulttextcolor/70 text-sm">
                  {hasActiveFilters ? "No logs match your filters." : "No activity logs found yet."}
                </div>
              ) : (
                <>
                  <div
                    className="lg:hidden flex-1 min-h-0 overflow-y-auto divide-y divide-defaultborder rounded-lg border border-defaultborder mx-3 sm:mx-4 mt-3 mb-3"
                    aria-busy={loading}
                  >
                    {showSkeleton
                      ? [...Array(4)].map((_, i) => (
                          <div key={`m-sk-${i}`} className="p-3 sm:p-4 space-y-2">
                            <div className="h-4 w-2/3 bg-gray-100 dark:bg-white/5 rounded animate-pulse motion-reduce:animate-none" />
                            <div className="h-4 w-1/2 bg-gray-100 dark:bg-white/5 rounded animate-pulse motion-reduce:animate-none" />
                            <div className="h-3 w-full bg-gray-100 dark:bg-white/5 rounded animate-pulse motion-reduce:animate-none" />
                          </div>
                        ))
                      : logs.map((log) => {
                          const model = buildLogRowModel(
                            log,
                            permissions,
                            !!isAdministrator,
                            !!isPlatformSuperUser
                          );
                          const displayIp = getActivityLogDisplayIp(log);
                          return (
                            <article
                              key={log.id}
                              className={`p-3 sm:p-4 space-y-2.5 bg-white dark:bg-bodybg transition-opacity ${
                                loading ? "opacity-50" : ""
                              }`}
                            >
                              <time className="block text-[0.75rem] text-defaulttextcolor/70">
                                {formatDateTime(log.createdAt)}
                              </time>

                              <div className="grid grid-cols-1 gap-2.5 text-[0.8125rem]">
                                <div>
                                  <span className="text-[0.65rem] uppercase tracking-wide text-defaulttextcolor/50">
                                    Actor
                                  </span>
                                  <p
                                    className="font-medium mb-0"
                                    title={log.actor?.id ? `ID ${log.actor.id}` : undefined}
                                  >
                                    {log.actor?.name || "—"}
                                  </p>
                                </div>

                                <div>
                                  <span className="text-[0.65rem] uppercase tracking-wide text-defaulttextcolor/50">
                                    Action
                                  </span>
                                  <p className="font-medium mb-0">{model.actionDisp.title}</p>
                                  <p className="text-[0.7rem] font-mono text-defaulttextcolor/60 mb-0">
                                    {log.action}
                                  </p>
                                </div>

                                <div>
                                  <span className="text-[0.65rem] uppercase tracking-wide text-defaulttextcolor/50">
                                    Entity
                                  </span>
                                  <ActivityLogEntityCell log={log} model={model} />
                                </div>

                                <div>
                                  <span className="text-[0.65rem] uppercase tracking-wide text-defaulttextcolor/50">
                                    Location
                                  </span>
                                  <div className="mt-0.5">
                                    <ActivityLogLocationCell log={log} />
                                  </div>
                                </div>
                              </div>

                              <details className="rounded-md border border-defaultborder/70 bg-gray-50/60 dark:bg-gray-800/30 px-3 py-2 text-[0.75rem]">
                                <summary className="cursor-pointer font-medium text-primary select-none">
                                  Device details
                                </summary>
                                <div className="mt-2 space-y-2">
                                  <div>
                                    <span className="text-[0.65rem] uppercase tracking-wide text-defaulttextcolor/50">
                                      IP
                                    </span>
                                    <p className="font-mono break-all mb-0">{displayIp}</p>
                                  </div>
                                  <div>
                                    <span className="text-[0.65rem] uppercase tracking-wide text-defaulttextcolor/50">
                                      Device
                                    </span>
                                    <p className="mb-0">{formatUserAgentSummary(log.userAgent)}</p>
                                    <p className="break-words mb-0 text-[0.7rem] text-defaulttextcolor/60">
                                      {log.userAgent ?? "—"}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-[0.65rem] uppercase tracking-wide text-defaulttextcolor/50">
                                      Actor ID
                                    </span>
                                    <p className="font-mono break-all mb-0 text-[0.7rem] text-defaulttextcolor/60">
                                      {log.actor?.id ?? "—"}
                                    </p>
                                  </div>
                                </div>
                              </details>
                            </article>
                          );
                        })}
                  </div>

                  <div
                    className="hidden lg:block flex-1 overflow-y-auto overflow-x-auto overscroll-x-contain mx-3 sm:mx-4 mt-3 mb-3 rounded-lg border border-defaultborder"
                    style={{ minHeight: 0 }}
                    aria-busy={loading}
                  >
                    <table className="table table-bordered border-defaultborder min-w-[52rem] w-full mb-0">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-bodybg sticky top-0 z-10">
                          <SortableHeader
                            label="Timestamp"
                            field="createdAt"
                            sortBy={sortBy}
                            onSort={handleSort}
                            className="min-w-[9.5rem] whitespace-nowrap"
                          />
                          <th className={`${HEADER_CELL} min-w-[8.5rem]`}>Actor</th>
                          <SortableHeader
                            label="Action"
                            field="action"
                            sortBy={sortBy}
                            onSort={handleSort}
                            className="min-w-[9rem]"
                          />
                          <SortableHeader
                            label="Entity"
                            field="entityType"
                            sortBy={sortBy}
                            onSort={handleSort}
                            className="min-w-[12rem]"
                          />
                          <th
                            className={`${HEADER_CELL} min-w-[8rem]`}
                            title="Device place (GPS) when allowed; IP-based location is approximate."
                          >
                            Location
                          </th>
                          <th className={`${HEADER_CELL} min-w-[7rem] whitespace-nowrap`}>IP</th>
                          <th className={`${HEADER_CELL} min-w-[9rem]`}>Device</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showSkeleton
                          ? [...Array(6)].map((_, i) => (
                              <tr key={`sk-${i}`} className="border-b border-defaultborder">
                                {[...Array(7)].map((__, c) => (
                                  <td key={c} className="px-4 py-3">
                                    <div className="h-3.5 bg-gray-100 dark:bg-white/5 rounded animate-pulse motion-reduce:animate-none" />
                                  </td>
                                ))}
                              </tr>
                            ))
                          : logs.map((log) => {
                              const model = buildLogRowModel(
                                log,
                                permissions,
                                !!isAdministrator,
                                !!isPlatformSuperUser
                              );
                              return (
                                <tr
                                  key={log.id}
                                  className={`border-b border-defaultborder transition-opacity ${
                                    loading ? "opacity-50" : ""
                                  }`}
                                >
                                  <td className="px-4 py-2.5 align-middle text-[0.8125rem] whitespace-nowrap">
                                    {formatDateTime(log.createdAt)}
                                  </td>
                                  <td className="px-4 py-2.5 align-middle text-[0.8125rem]">
                                    {/* The 24-hex actor id moved to the tooltip: it sat under every
                                        name and again in the Entity column, and no reader was
                                        comparing the two by eye. */}
                                    <span
                                      className="font-medium"
                                      title={log.actor?.id ? `ID ${log.actor.id}` : undefined}
                                    >
                                      {log.actor?.name || "—"}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2.5 align-middle text-[0.8125rem]">
                                    <div className="flex flex-col gap-0.5 min-w-[8rem]">
                                      <span className="font-medium">{model.actionDisp.title}</span>
                                      <span className="font-mono text-[0.7rem] text-defaulttextcolor/60">
                                        {log.action}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-2.5 align-middle text-[0.8125rem]">
                                    <ActivityLogEntityCell log={log} model={model} />
                                  </td>
                                  <td className="px-4 py-2.5 align-middle text-[0.8125rem]">
                                    <ActivityLogLocationCell log={log} />
                                  </td>
                                  <td className="px-4 py-2.5 align-middle font-mono text-[0.75rem] whitespace-nowrap">
                                    {getActivityLogDisplayIp(log)}
                                  </td>
                                  <td
                                    className="px-4 py-2.5 align-middle text-[0.8125rem] text-defaulttextcolor/80"
                                    title={log.userAgent ?? undefined}
                                  >
                                    {shortDeviceLabel(log.userAgent)}
                                  </td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>

            {showToolbar && showPagination && (
              <div className="box-footer shrink-0 !border-t-0 bg-white dark:bg-bodybg">
                <ListPagination
                  page={page}
                  totalPages={totalPages}
                  totalResults={totalResults}
                  pageSize={limit}
                  onPageChange={(next) => setFilters({ page: next })}
                  ariaLabel="Activity logs page navigation"
                  gotoInputId="activity-logs-goto-page"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
