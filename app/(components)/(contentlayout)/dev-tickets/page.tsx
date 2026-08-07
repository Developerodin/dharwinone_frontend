"use client";

import Seo from "@/shared/layout-components/seo/seo";
import DevTicketAccessDenied from "@/shared/components/dev-tickets/dev-ticket-access-denied";
import DevTicketTabBar from "@/shared/components/dev-tickets/dev-ticket-tab-bar";
import DevTicketDetailDrawer from "@/shared/components/dev-tickets/dev-ticket-detail-drawer";
import CreateDevTicketModal from "@/shared/components/dev-tickets/create-dev-ticket-modal";
import DevTicketPageHeader from "@/shared/components/dev-tickets/dev-ticket-page-header";
import DevTicketScopeTabs from "@/shared/components/dev-tickets/dev-ticket-scope-tabs";
import DevTicketStatsStrip from "@/shared/components/dev-tickets/dev-ticket-stats-strip";
import { DEV_TICKET_MODULE_LABELS, formatDevTicketModuleLabel } from "@/shared/components/dev-tickets/dev-ticket-modules";
import {
  STATUS_CONFIG,
  PRIORITY_CONFIG,
  SEVERITY_CONFIG,
  LABEL_CONFIG,
  canEditDevTicket,
  computeAgeDays,
  getDevTicketDisplayId,
  getInitials,
  getTicketDbId,
  isAllowedDevTicketAttachment,
} from "@/shared/components/dev-tickets/dev-ticket-config";
import {
  bulkUpdate,
  createDevTicket,
  deleteDevTicket,
  getDevTicket,
  hasDevTicketsView,
  listDevTickets,
  updateDevTicket,
  DEV_TICKET_LABELS,
  DEV_TICKET_PLATFORMS,
  DEV_TICKET_PLATFORM_LABELS,
  type DevTicket,
  type DevTicketCategory,
  type DevTicketFilters,
  type DevTicketLabel,
  type DevTicketPlatform,
} from "@/shared/lib/api/devTickets";
import { useAuth } from "@/shared/contexts/auth-context";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";

type ScopeFilter = DevTicketFilters["scope"];

const SCOPES: { key: ScopeFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "mine", label: "Assigned to me" },
  { key: "reported", label: "Reported by me" },
  { key: "unassigned", label: "Unassigned" },
];

const TICKET_FILTER_SELECT_CLASS =
  "form-control min-w-[8.5rem] flex-1 sm:flex-none sm:w-auto !min-h-[2.375rem] !shrink-0 !py-1.5 !px-2 !text-[0.75rem]";

function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div aria-live="polite" className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 rounded-lg bg-slate-800 px-4 py-2 text-[0.8125rem] text-white shadow-lg dark:bg-white dark:text-slate-900">
      {message}
    </div>
  );
}

export default function DevTicketsPage() {
  const { user, permissions, isPlatformSuperUser, isAdministrator, permissionsLoaded } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const canView = hasDevTicketsView(permissions, isPlatformSuperUser);
  const isAdmin = Boolean(isAdministrator || isPlatformSuperUser);
  const userId = user?.id;

  const [tickets, setTickets] = useState<DevTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [scope, setScope] = useState<ScopeFilter>((searchParams.get("scope") as ScopeFilter) || "all");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") ?? "");
  const [priorityFilter, setPriorityFilter] = useState(searchParams.get("priority") ?? "");
  const [severityFilter, setSeverityFilter] = useState(searchParams.get("severity") ?? "");
  const [labelFilter, setLabelFilter] = useState(searchParams.get("label") ?? "");
  const [moduleFilter, setModuleFilter] = useState(searchParams.get("module") ?? "");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") ?? "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page") ?? 1));
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") ?? "createdAt:desc");
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [scopeCounts, setScopeCounts] = useState<Record<string, number>>({});

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [drawerTicket, setDrawerTicket] = useState<DevTicket | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [bulkAssignPlatform, setBulkAssignPlatform] = useState<DevTicketPlatform>("web");
  const [bulkLabel, setBulkLabel] = useState<DevTicketLabel>("regression");
  const [showBulkBar, setShowBulkBar] = useState(false);

  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    stepsToReproduce: "",
    pageUrl: "",
    priority: "Medium" as DevTicket["priority"],
    severity: "Major" as DevTicket["severity"],
    category: "Bug" as DevTicketCategory,
    module: "",
    environment: "Staging" as DevTicket["environment"],
    labels: [] as DevTicketLabel[],
    platform: "web" as DevTicketPlatform,
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentErrors, setAttachmentErrors] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetchAbortRef = useRef<AbortController | null>(null);
  const fetchGenerationRef = useRef(0);
  const hasLoadedOnceRef = useRef(false);
  const prevDebouncedSearchRef = useRef(searchQuery);

  const [assignModalTicket, setAssignModalTicket] = useState<DevTicket | null>(null);
  const [assignPlatform, setAssignPlatform] = useState<DevTicketPlatform>("web");

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  }, []);

  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      const trimmedPrev = prevDebouncedSearchRef.current.trim();
      const trimmedNext = searchQuery.trim();
      if (trimmedPrev !== trimmedNext) {
        setCurrentPage(1);
      }
      prevDebouncedSearchRef.current = searchQuery;
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [searchQuery]);

  const syncUrl = useCallback(
    (overrides: Record<string, string | number> = {}) => {
      const params = new URLSearchParams();
      const vals: Record<string, string | number> = {
        scope: scope ?? "all",
        status: statusFilter,
        priority: priorityFilter,
        severity: severityFilter,
        label: labelFilter,
        module: moduleFilter,
        search: debouncedSearch,
        page: currentPage,
        sortBy,
        ...overrides,
      };
      Object.entries(vals).forEach(([k, v]) => {
        if (v && v !== "all" && v !== 1 && v !== "createdAt:desc") params.set(k, String(v));
        else if (k === "page" && Number(v) > 1) params.set(k, String(v));
        else if (k === "scope" && v !== "all") params.set(k, String(v));
      });
      const qs = params.toString();
      router.replace(qs ? `/dev-tickets?${qs}` : "/dev-tickets", { scroll: false });
    },
    [scope, statusFilter, priorityFilter, severityFilter, labelFilter, moduleFilter, debouncedSearch, currentPage, sortBy, router]
  );

  const buildFilters = useCallback((): DevTicketFilters => {
    const f: DevTicketFilters = { page: currentPage, limit, sortBy, scope: scope ?? "all" };
    if (statusFilter) f.status = statusFilter as DevTicketFilters["status"];
    if (priorityFilter) f.priority = priorityFilter as DevTicketFilters["priority"];
    if (severityFilter) f.severity = severityFilter as DevTicketFilters["severity"];
    if (labelFilter) f.label = labelFilter as DevTicketLabel;
    if (moduleFilter.trim()) f.module = moduleFilter.trim();
    if (debouncedSearch.trim()) f.search = debouncedSearch.trim();
    return f;
  }, [currentPage, limit, sortBy, scope, statusFilter, priorityFilter, severityFilter, labelFilter, moduleFilter, debouncedSearch]);

  const fetchTickets = useCallback(async () => {
    if (!canView) {
      fetchAbortRef.current?.abort();
      fetchAbortRef.current = null;
      fetchGenerationRef.current += 1;
      setLoading(false);
      setRefreshing(false);
      return;
    }

    fetchAbortRef.current?.abort();
    const generation = ++fetchGenerationRef.current;
    const ac = new AbortController();
    fetchAbortRef.current = ac;

    const isInitial = !hasLoadedOnceRef.current;
    if (isInitial) setLoading(true);
    else setRefreshing(true);
    setError(null);
    try {
      const data = await listDevTickets(buildFilters(), { signal: ac.signal });
      if (generation !== fetchGenerationRef.current) return;
      setTickets(data.results ?? []);
      setTotalPages(data.totalPages ?? 1);
      setTotalResults(data.totalResults ?? 0);
      hasLoadedOnceRef.current = true;
    } catch (err: unknown) {
      if (generation !== fetchGenerationRef.current) return;
      const e = err as { response?: { data?: { message?: string } }; message?: string; code?: string; name?: string };
      if (e?.code === "ERR_CANCELED" || e?.name === "CanceledError") return;
      setError(e?.response?.data?.message ?? e?.message ?? "Failed to fetch tickets");
      setTickets([]);
      setTotalResults(0);
    } finally {
      if (generation === fetchGenerationRef.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [canView, buildFilters]);

  const fetchScopeCounts = useCallback(async () => {
    if (!canView) return;
    try {
      const scopes: ScopeFilter[] = ["all", "mine", "reported", "unassigned"];
      const results = await Promise.all(
        scopes.map((s) => listDevTickets({ scope: s, limit: 1, page: 1 }))
      );
      const counts: Record<string, number> = {};
      scopes.forEach((s, i) => {
        counts[s ?? "all"] = results[i]?.totalResults ?? 0;
      });
      setScopeCounts(counts);
    } catch {
      /* ignore */
    }
  }, [canView]);

  useEffect(() => {
    fetchTickets();
    return () => {
      fetchAbortRef.current?.abort();
      fetchGenerationRef.current += 1;
    };
  }, [fetchTickets]);

  useEffect(() => {
    syncUrl();
  }, [syncUrl]);

  useEffect(() => {
    fetchScopeCounts();
  }, [fetchScopeCounts]);

  useEffect(() => {
    const ticketParam = searchParams.get("ticket");
    if (!ticketParam || !canView) return;
    let cancelled = false;
    getDevTicket(ticketParam)
      .then((t) => {
        if (!cancelled) {
          setDrawerTicket(t);
          setDrawerOpen(true);
        }
      })
      .catch(() => {
        if (!cancelled) showToast("Could not open ticket from link");
      });
    return () => {
      cancelled = true;
    };
  }, [searchParams, canView, showToast]);


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "c" && !e.metaKey && !e.ctrlKey && !drawerOpen && !showCreateModal) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        e.preventDefault();
        setShowCreateModal(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, showCreateModal]);

  const isSearchDebouncing = searchQuery.trim() !== debouncedSearch.trim();
  const isSearchBusy = isSearchDebouncing || refreshing;
  const activeFilterCount = [statusFilter, priorityFilter, severityFilter, labelFilter, moduleFilter, searchQuery.trim()].filter(Boolean).length;
  const hasActiveFilters = activeFilterCount > 0;
  const isListBusy = loading || refreshing || isSearchDebouncing;

  const pageStats = useMemo(
    () => ({
      open: tickets.filter((t) => t.status === "Open").length,
      inProgress: tickets.filter((t) => t.status === "In Progress").length,
      resolved: tickets.filter((t) => t.status === "Resolved").length,
      critical: tickets.filter((t) => t.severity === "Blocker" || t.severity === "Critical").length,
    }),
    [tickets]
  );

  const allPageSelected = tickets.length > 0 && tickets.every((t) => selectedIds.has(getTicketDbId(t)));
  const someSelected = tickets.some((t) => selectedIds.has(getTicketDbId(t)));

  const toggleSelectAll = () => {
    if (allPageSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(tickets.map((t) => getTicketDbId(t))));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openDrawer = async (ticket: DevTicket) => {
    setDrawerTicket(ticket);
    setDrawerOpen(true);
    const id = getTicketDbId(ticket);
    if (id) {
      try {
        const latest = await getDevTicket(id);
        setDrawerTicket(latest);
      } catch {
        /* keep */
      }
    }
  };

  const handleTicketUpdated = (updated: DevTicket) => {
    const id = getTicketDbId(updated);
    setDrawerTicket(updated);
    setTickets((prev) => prev.map((t) => (getTicketDbId(t) === id ? updated : t)));
    fetchScopeCounts();
  };

  const clearSearch = () => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    prevDebouncedSearchRef.current = "";
    setSearchQuery("");
    setDebouncedSearch("");
    setCurrentPage(1);
  };

  const clearFilters = () => {
    clearSearch();
    setStatusFilter("");
    setPriorityFilter("");
    setSeverityFilter("");
    setLabelFilter("");
    setModuleFilter("");
  };

  const addFiles = (files: File[]) => {
    const errors: string[] = [];
    const valid: File[] = [];
    if (attachments.length + files.length > 10) {
      errors.push("Maximum 10 files allowed.");
      setAttachmentErrors(errors);
      return;
    }
    files.forEach((f) => {
      if (!isAllowedDevTicketAttachment(f)) errors.push(`${f.name}: type not allowed`);
      else valid.push(f);
    });
    setAttachmentErrors(errors);
    setAttachments((prev) => [...prev, ...valid]);
  };

  const handleCreate = async () => {
    if (createForm.title.trim().length < 5 || createForm.description.trim().length < 10) return;
    try {
      setCreating(true);
      await createDevTicket({
        ...createForm,
        title: createForm.title.trim(),
        description: createForm.description.trim(),
        attachments: attachments.length ? attachments : undefined,
      });
      setShowCreateModal(false);
      setCreateForm({ title: "", description: "", stepsToReproduce: "", pageUrl: "", priority: "Medium", severity: "Major", category: "Bug", module: "", environment: "Staging", labels: [], platform: "web" });
      setAttachments([]);
      showToast("Ticket created successfully");
      fetchTickets();
      fetchScopeCounts();
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } }; message?: string };
      await Swal.fire({ icon: "error", title: "Failed", text: e?.response?.data?.message ?? e?.message ?? "Could not create ticket." });
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (ticket: DevTicket) => {
    const id = getTicketDbId(ticket);
    if (!id) return;
    const result = await Swal.fire({ title: "Delete ticket?", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33", confirmButtonText: "Delete" });
    if (!result.isConfirmed) return;
    try {
      await deleteDevTicket(id);
      if (drawerTicket && getTicketDbId(drawerTicket) === id) {
        setDrawerOpen(false);
        setDrawerTicket(null);
      }
      showToast("Ticket deleted");
      fetchTickets();
      fetchScopeCounts();
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } }; message?: string };
      await Swal.fire({ icon: "error", title: "Delete failed", text: e?.response?.data?.message ?? e?.message });
    }
  };

  const handleBulkClose = async () => {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    const result = await bulkUpdate(ids, { status: "Closed" });
    if (result.skipped.length) showToast(`${result.updated.length} closed, ${result.skipped.length} skipped (no permission)`);
    else showToast(`${result.updated.length} ticket(s) closed`);
    setSelectedIds(new Set());
    fetchTickets();
    fetchScopeCounts();
  };

  const handleBulkAssign = async () => {
    const ids = Array.from(selectedIds);
    if (!ids.length || !bulkAssignPlatform) return;
    const result = await bulkUpdate(ids, { platform: bulkAssignPlatform });
    if (result.skipped.length) showToast(`${result.updated.length} assigned, ${result.skipped.length} skipped`);
    else showToast(`${result.updated.length} ticket(s) assigned`);
    setSelectedIds(new Set());
    setShowBulkBar(false);
    fetchTickets();
  };

  const handleBulkLabel = async () => {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    const result = await bulkUpdate(ids, { addLabel: bulkLabel });
    if (result.skipped.length) showToast(`${result.updated.length} labeled, ${result.skipped.length} skipped`);
    else showToast(`Label added to ${result.updated.length} ticket(s)`);
    setSelectedIds(new Set());
    fetchTickets();
  };

  const toggleSort = (field: string) => {
    const [curField, curDir] = sortBy.split(":");
    if (curField === field) {
      setSortBy(`${field}:${curDir === "asc" ? "desc" : "asc"}`);
    } else {
      setSortBy(`${field}:desc`);
    }
  };

  if (!permissionsLoaded) {
    return (
      <div className="container-fluid pt-6">
        <div className="py-16 text-center text-[#8c9097]">Loading…</div>
      </div>
    );
  }

  if (!canView) {
    return (
      <Fragment>
        <Seo title="Help & Support" />
        <DevTicketAccessDenied />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Seo title="Help & Support" />
      <Toast message={toast} />

      <div className="container-fluid pt-6">
        <DevTicketPageHeader
          title="Help & Support"
          subtitle="Internal dev and bug tracker"
          icon="ri-lifebuoy-line"
          action={
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="ti-btn ti-btn-primary inline-flex w-full items-center justify-center gap-2 !px-4 !py-2 !text-[0.8125rem] sm:w-auto"
            >
              <i className="ri-add-line" aria-hidden />
              Create ticket
            </button>
          }
        />

        <DevTicketTabBar />

        <DevTicketStatsStrip
          stats={[
            { label: "Open", count: pageStats.open, icon: "ri-radio-button-line", tone: "primary" },
            { label: "In Progress", count: pageStats.inProgress, icon: "ri-loader-4-line", tone: "warning" },
            { label: "Resolved", count: pageStats.resolved, icon: "ri-checkbox-circle-line", tone: "success" },
            { label: "Blocker / Critical", count: pageStats.critical, icon: "ri-alarm-warning-line", tone: "danger" },
          ]}
        />

        <DevTicketScopeTabs
          tabs={SCOPES.map((s) => ({
            key: s.key,
            label: s.label,
            count: scopeCounts[s.key ?? "all"] ?? 0,
          }))}
          value={scope}
          onChange={(key) => {
            setScope(key);
            setCurrentPage(1);
          }}
        />

        <div className="overflow-hidden rounded-xl border border-defaultborder/70 bg-white dark:border-white/10 dark:bg-bodybg">
          <div className="flex flex-col gap-1 border-b border-defaultborder/60 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5 dark:border-white/10">
            <div>
              <h2 className="mb-0 text-[0.9375rem] font-semibold text-defaulttextcolor dark:text-white">All tickets</h2>
              <p className="mb-0 mt-0.5 text-[0.6875rem] text-[#8c9097]">
                {error ? "Could not load results" : `${totalResults} ticket${totalResults === 1 ? "" : "s"}`}
                {!error && activeFilterCount > 0
                  ? ` · ${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""} active`
                  : ""}
              </p>
            </div>
          </div>

          <div className="border-b border-defaultborder/60 bg-slate-50/50 px-4 py-4 dark:border-white/10 dark:bg-white/[0.02] sm:px-5">
            <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-[#8c9097]">Search and filter</p>
            <div className="space-y-3">
              <div className="relative max-w-xl">
                <span
                  className="pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center"
                  aria-hidden
                >
                  {isSearchBusy ? (
                    <span className="flex h-4 w-4 items-center justify-center">
                      <i className="ri-loader-4-line animate-spin text-base leading-none text-primary" />
                    </span>
                  ) : (
                    <i className="ri-search-line text-base leading-none text-[#8c9097]" />
                  )}
                </span>
                <input
                  type="text"
                  role="searchbox"
                  autoComplete="off"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ticket ID, title, description…"
                  aria-label="Search tickets"
                  aria-busy={isSearchBusy}
                  className={`form-control !min-h-[2.375rem] !rounded-lg !ps-10 !text-[0.8125rem] ${searchQuery ? "!pe-10" : "!pe-3"}`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-[#8c9097] transition-colors hover:text-defaulttextcolor"
                    aria-label="Clear search"
                  >
                    <i className="ri-close-line text-base leading-none" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {[
                  { label: "Status", val: statusFilter, set: setStatusFilter, opts: Object.keys(STATUS_CONFIG) },
                  { label: "Priority", val: priorityFilter, set: setPriorityFilter, opts: Object.keys(PRIORITY_CONFIG) },
                  { label: "Severity", val: severityFilter, set: setSeverityFilter, opts: Object.keys(SEVERITY_CONFIG) },
                ].map((f) => (
                  <select
                    key={f.label}
                    value={f.val}
                    onChange={(e) => {
                      f.set(e.target.value);
                      setCurrentPage(1);
                    }}
                    className={TICKET_FILTER_SELECT_CLASS}
                    aria-label={`Filter by ${f.label.toLowerCase()}`}
                  >
                    <option value="">{f.label}: All</option>
                    {f.opts.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ))}
                <select
                  value={labelFilter}
                  onChange={(e) => {
                    setLabelFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={TICKET_FILTER_SELECT_CLASS}
                  aria-label="Filter by label"
                >
                  <option value="">Label: All</option>
                  {DEV_TICKET_LABELS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                <select
                  value={moduleFilter}
                  onChange={(e) => {
                    setModuleFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={`${TICKET_FILTER_SELECT_CLASS} sm:max-w-[200px]`}
                  aria-label="Filter by module"
                >
                  <option value="">Module: All</option>
                  {DEV_TICKET_MODULE_LABELS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    aria-label="Clear all filters"
                    className="ti-btn ti-btn-sm ti-btn-soft-danger !inline-flex !shrink-0 !items-center !gap-1.5 !whitespace-nowrap !px-3 !py-2 !min-h-[2.375rem]"
                  >
                    <i className="ri-filter-off-line text-[0.875rem]" aria-hidden />
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="px-4 py-4 sm:px-5">

            {selectedIds.size > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-primary/25 bg-primary/[0.04] px-3 py-2.5 dark:bg-primary/[0.06]">
                <span className="text-[0.8125rem] font-medium text-defaulttextcolor dark:text-white">
                  {selectedIds.size} selected
                </span>
                <button type="button" onClick={() => setShowBulkBar(true)} className="ti-btn ti-btn-sm ti-btn-soft-primary">Assign</button>
                <select
                  value={bulkLabel}
                  onChange={(e) => setBulkLabel(e.target.value as DevTicketLabel)}
                  className="form-control !w-auto !min-h-[2rem] !py-1 !px-2 !text-[0.75rem]"
                  aria-label="Bulk label"
                >
                  {DEV_TICKET_LABELS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                <button type="button" onClick={handleBulkLabel} className="ti-btn ti-btn-sm ti-btn-soft-info">Label</button>
                <button type="button" onClick={handleBulkClose} className="ti-btn ti-btn-sm ti-btn-soft-success">Close</button>
                <button type="button" onClick={() => setSelectedIds(new Set())} className="ti-btn ti-btn-sm ti-btn-light ms-auto">Clear</button>
              </div>
            )}

            {error && (
              <div role="alert" aria-live="assertive" className="mb-4 flex flex-col gap-3 rounded-md border border-danger/30 bg-danger/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span className="min-w-0 flex-1 text-[0.8125rem] leading-snug text-danger">{error}</span>
                <button type="button" onClick={fetchTickets} className="ti-btn ti-btn-sm ti-btn-danger !inline-flex !shrink-0 !items-center !justify-center !gap-1.5 !self-start !whitespace-nowrap !px-4 !py-2 sm:!self-center">
                  <i className="ri-refresh-line" aria-hidden />
                  Retry
                </button>
              </div>
            )}

            {loading && tickets.length === 0 ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="h-12 animate-pulse rounded-lg bg-black/5 dark:bg-white/10" />
                ))}
              </div>
            ) : tickets.length === 0 ? (
              <div className="rounded-xl border border-dashed border-defaultborder/70 px-6 py-14 text-center dark:border-white/10">
                <i className="ri-bug-line mb-3 text-[2.25rem] text-primary/40" aria-hidden />
                <h3 className="text-base font-semibold text-defaulttextcolor dark:text-white">
                  {hasActiveFilters ? "No tickets match these filters" : "No tickets yet"}
                </h3>
                <p className="mx-auto mt-1 max-w-sm text-[0.8125rem] text-[#8c9097]">
                  {hasActiveFilters ? "Try adjusting or clearing filters." : "Create the first dev ticket to get started."}
                </p>
                {hasActiveFilters ? (
                  <button type="button" onClick={clearFilters} className="ti-btn ti-btn-primary mt-4">Clear filters</button>
                ) : (
                  <button type="button" onClick={() => setShowCreateModal(true)} className="ti-btn ti-btn-primary mt-4">Create ticket</button>
                )}
              </div>
            ) : (
              <div className={`relative transition-opacity ${isListBusy ? "opacity-60" : ""}`} aria-busy={isListBusy}>
                <div className="overflow-x-auto rounded-lg border border-defaultborder/60 dark:border-white/10">
                  <table className="table table-hover mb-0 min-w-full whitespace-nowrap">
                    <thead className="bg-slate-50/90 dark:bg-white/[0.03]">
                      <tr className="text-[0.6875rem] uppercase tracking-[0.04em] text-[#8c9097]">
                        <th className="!w-10 !border-b !border-defaultborder/60 !py-3 dark:!border-white/10">
                          <input type="checkbox" checked={allPageSelected} ref={(el) => { if (el) el.indeterminate = someSelected && !allPageSelected; }} onChange={toggleSelectAll} aria-label="Select all on page" />
                        </th>
                        <th className="!border-b !border-defaultborder/60 !py-3 dark:!border-white/10">Ticket</th>
                        <th className="!border-b !border-defaultborder/60 !py-3 dark:!border-white/10">Subject</th>
                        <th className="!border-b !border-defaultborder/60 !py-3 dark:!border-white/10">Status</th>
                        <th className="!border-b !border-defaultborder/60 !py-3 dark:!border-white/10">
                          <button type="button" onClick={() => toggleSort("severity")} className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.04em] hover:text-primary">
                            Severity
                            {sortBy.startsWith("severity") ? (
                              <i className={`text-[0.75rem] ${sortBy.endsWith("asc") ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}`} aria-hidden />
                            ) : null}
                          </button>
                        </th>
                        <th className="!border-b !border-defaultborder/60 !py-3 dark:!border-white/10">Module</th>
                        <th className="!border-b !border-defaultborder/60 !py-3 dark:!border-white/10">Priority</th>
                        <th className="!border-b !border-defaultborder/60 !py-3 dark:!border-white/10">Platform</th>
                        <th className="!border-b !border-defaultborder/60 !py-3 dark:!border-white/10">
                          <button type="button" onClick={() => toggleSort("createdAt")} className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.04em] hover:text-primary">
                            Age
                            {sortBy.startsWith("createdAt") ? (
                              <i className={`text-[0.75rem] ${sortBy.endsWith("asc") ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}`} aria-hidden />
                            ) : null}
                          </button>
                        </th>
                        <th className="!border-b !border-defaultborder/60 !py-3 !text-center dark:!border-white/10">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {tickets.map((ticket) => {
                      const id = getTicketDbId(ticket);
                      const sc = STATUS_CONFIG[ticket.status] ?? STATUS_CONFIG.Open;
                      const sev = SEVERITY_CONFIG[ticket.severity] ?? SEVERITY_CONFIG.Major;
                      const pc = PRIORITY_CONFIG[ticket.priority] ?? PRIORITY_CONFIG.Medium;
                      const age = computeAgeDays(ticket.createdAt);
                      const isOpenStatus = ticket.status !== "Resolved" && ticket.status !== "Closed";
                      const editable = canEditDevTicket(ticket, userId, isAdmin);
                      return (
                        <tr key={id} className="cursor-pointer transition-colors hover:bg-slate-50/80 dark:hover:bg-white/[0.03]" onClick={() => openDrawer(ticket)}>
                          <td onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" checked={selectedIds.has(id)} onChange={() => toggleSelect(id)} aria-label={`Select ${getDevTicketDisplayId(ticket)}`} />
                          </td>
                          <td><span className="font-mono text-[0.75rem] font-semibold text-primary">{getDevTicketDisplayId(ticket)}</span></td>
                          <td>
                            <p className="mb-0 max-w-[240px] truncate text-[0.8125rem] font-medium">{ticket.title}</p>
                            {ticket.labels && ticket.labels.length > 0 && (
                              <div className="mt-0.5 flex flex-wrap gap-1">
                                {ticket.labels.map((lbl) => (
                                  <span key={lbl} className={`badge !rounded-full !text-[0.6rem] ${LABEL_CONFIG[lbl]?.badge ?? ""}`}>{lbl}</span>
                                ))}
                              </div>
                            )}
                          </td>
                          <td><span className={`badge !rounded-full !text-[0.6875rem] ${sc.badge}`}>{ticket.status}</span></td>
                          <td><span className={`badge !rounded-full !text-[0.6875rem] ${sev.badge}`}>{ticket.severity}</span></td>
                          <td className="text-[0.8125rem] text-[#8c9097]">{ticket.module ? formatDevTicketModuleLabel(ticket.module) : "—"}</td>
                          <td><span className={`badge !rounded-full !text-[0.6875rem] ${pc.badge}`}>{ticket.priority}</span></td>
                          <td>
                            {ticket.platform ? (
                              <span className="text-[0.75rem] font-medium" title={ticket.assignedTo?.email ?? ""}>
                                {DEV_TICKET_PLATFORM_LABELS[ticket.platform] ?? ticket.platform}
                              </span>
                            ) : ticket.assignedTo ? (
                              <span className="avatar avatar-xs avatar-rounded bg-primary/10 text-primary text-[0.55rem] font-bold" title={ticket.assignedTo.name ?? ticket.assignedTo.email}>
                                {getInitials(ticket.assignedTo.name, ticket.assignedTo.email)}
                              </span>
                            ) : (
                              <span className="text-[0.75rem] text-[#8c9097]">—</span>
                            )}
                          </td>
                          <td>
                            <span className={`text-[0.75rem] tabular-nums ${isOpenStatus && age > 28 ? "font-semibold text-rose-600" : ""}`}>{age}d</span>
                          </td>
                          <td className="!text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                              <button type="button" onClick={() => openDrawer(ticket)} className="ti-btn ti-btn-icon ti-btn-sm ti-btn-soft-primary" aria-label="View"><i className="ri-eye-line" /></button>
                              {editable && (
                                <>
                                  <button type="button" onClick={() => {
                                    setAssignModalTicket(ticket);
                                    setAssignPlatform(ticket.platform === "mobile" ? "mobile" : "web");
                                  }} className="ti-btn ti-btn-icon ti-btn-sm ti-btn-soft-info" aria-label="Assign"><i className="ri-user-add-line" /></button>
                                  <button type="button" onClick={() => handleDelete(ticket)} className="ti-btn ti-btn-icon ti-btn-sm ti-btn-soft-danger" aria-label="Delete"><i className="ri-delete-bin-5-line" /></button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col gap-3 border-t border-defaultborder/60 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5 dark:border-white/10">
              <p className="mb-0 text-[0.75rem] text-[#8c9097]">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="ti-btn ti-btn-sm ti-btn-light"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="ti-btn ti-btn-sm ti-btn-light"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <DevTicketDetailDrawer
        open={drawerOpen}
        ticket={drawerTicket}
        onClose={() => { setDrawerOpen(false); setDrawerTicket(null); }}
        onTicketUpdated={handleTicketUpdated}
        onOpenLinkedTicket={async (linkedId) => {
          try {
            const linked = await getDevTicket(linkedId);
            setDrawerTicket(linked);
          } catch { showToast("Could not open linked ticket"); }
        }}
        currentUserId={userId ?? ""}
        isAdmin={isAdmin}
        canEdit={drawerTicket ? canEditDevTicket(drawerTicket, userId, isAdmin) : false}
      />

      {/* Create modal */}
      <CreateDevTicketModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        form={createForm}
        onFormChange={setCreateForm}
        attachments={attachments}
        onAttachmentsChange={setAttachments}
        attachmentErrors={attachmentErrors}
        onAddFiles={addFiles}
        creating={creating}
        onSubmit={handleCreate}
      />

      {/* Bulk assign modal */}
      {showBulkBar && (
        <div className="fixed inset-0 z-[106] flex items-center justify-center bg-black/50 p-4" onClick={() => setShowBulkBar(false)}>
          <div className="w-full max-w-sm rounded-md bg-white p-5 dark:bg-bodybg" onClick={(e) => e.stopPropagation()}>
            <h6 className="mb-3 font-semibold">Bulk assign</h6>
            <select
              className="form-control form-control-block mb-3"
              value={bulkAssignPlatform}
              onChange={(e) => setBulkAssignPlatform(e.target.value as DevTicketPlatform)}
            >
              {DEV_TICKET_PLATFORMS.map((p) => (
                <option key={p} value={p}>{DEV_TICKET_PLATFORM_LABELS[p]}</option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowBulkBar(false)} className="ti-btn ti-btn-light">Cancel</button>
              <button type="button" onClick={handleBulkAssign} className="ti-btn ti-btn-primary">Assign</button>
            </div>
          </div>
        </div>
      )}

      {/* Quick assign modal */}
      {assignModalTicket && (
        <div className="fixed inset-0 z-[106] flex items-center justify-center bg-black/50 p-4" onClick={() => setAssignModalTicket(null)}>
          <div className="w-full max-w-sm rounded-md bg-white p-5 dark:bg-bodybg" onClick={(e) => e.stopPropagation()}>
            <h6 className="mb-3 font-semibold">Assign platform</h6>
            <select
              className="form-control form-control-block mb-3"
              value={assignPlatform}
              onChange={(e) => setAssignPlatform(e.target.value as DevTicketPlatform)}
            >
              {DEV_TICKET_PLATFORMS.map((p) => (
                <option key={p} value={p}>{DEV_TICKET_PLATFORM_LABELS[p]}</option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setAssignModalTicket(null)} className="ti-btn ti-btn-light">Cancel</button>
              <button
                type="button"
                onClick={async () => {
                  const id = getTicketDbId(assignModalTicket);
                  if (!id) return;
                  try {
                    const updated = await updateDevTicket(id, { platform: assignPlatform });
                    handleTicketUpdated(updated);
                    setAssignModalTicket(null);
                    showToast("Assignment updated");
                  } catch {
                    showToast("Assign failed");
                  }
                }}
                className="ti-btn ti-btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
