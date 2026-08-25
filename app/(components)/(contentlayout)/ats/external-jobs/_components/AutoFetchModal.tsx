"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getAutoFetchConfig,
  saveAutoFetchConfig,
  patchAutoFetchConfig,
  runAutoFetchNow,
  type AutoFetchConfig,
  type AutoFetchFrequencyMinutes,
  type AutoFetchPostedRange,
} from "@/shared/lib/api/external-jobs-autofetch";
import type { ExternalJobSource } from "@/shared/lib/api/external-jobs";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Bumped so the page-level status badge refreshes after save/run without duplicating the fetch here. */
  onConfigChanged: () => void;
  /** Fired once "Fetch Now" successfully kicks off, so the page can mirror live results into the Search tab. */
  onFetchStarted: () => void;
};

const SOURCE_OPTIONS: { value: ExternalJobSource; label: string }[] = [
  { value: "active-jobs-db", label: "Active Jobs DB" },
  { value: "linkedin-job-search-api", label: "LinkedIn Job Search API" },
];
const POSTED_RANGE_OPTIONS: { value: AutoFetchPostedRange; label: string }[] = [
  { value: "24h", label: "Last 24 hours" },
  { value: "7d", label: "Last 7 days" },
];
const FREQUENCY_OPTIONS: { value: AutoFetchFrequencyMinutes; label: string }[] = [
  { value: 60, label: "Every hour" },
  { value: 360, label: "Every 6 hours" },
  { value: 720, label: "Every 12 hours" },
  { value: 1440, label: "Daily" },
];

/** Chip list with add-input + remove -- used for both titles and locations. */
function ChipListEditor({
  label,
  placeholder,
  values,
  onChange,
}: {
  label: string;
  placeholder: string;
  values: string[];
  onChange: (next: string[]) => void;
}) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const v = draft.trim();
    if (!v) return;
    if (!values.some((x) => x.toLowerCase() === v.toLowerCase())) onChange([...values, v]);
    setDraft("");
  };
  return (
    <div>
      <label className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-wide text-textmuted dark:text-white/45">
        {label}
      </label>
      <div className="mb-2 flex flex-wrap gap-1.5">
        {values.map((v) => (
          <span
            key={v}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[0.75rem] font-medium text-primary dark:bg-primary/20"
          >
            {v}
            <button
              type="button"
              aria-label={`Remove ${v}`}
              onClick={() => onChange(values.filter((x) => x !== v))}
              className="text-primary/60 hover:text-primary"
            >
              <i className="ri-close-line text-xs" aria-hidden />
            </button>
          </span>
        ))}
        {values.length === 0 && <span className="text-[0.75rem] text-textmuted/60">None added</span>}
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className="form-control !min-h-[2.25rem] flex-1 !text-[0.8rem]"
        />
        <button
          type="button"
          onClick={add}
          className="rounded-lg border border-defaultborder/70 px-3 text-[0.75rem] font-semibold text-defaulttextcolor hover:bg-black/[0.03] dark:border-white/15 dark:hover:bg-white/5"
        >
          Add
        </button>
      </div>
    </div>
  );
}

const STATUS_LABEL: Record<string, string> = {
  never: "Never run",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  partial: "Partial",
};

export default function AutoFetchModal({ open, onClose, onConfigChanged, onFetchStarted }: Props) {
  const [config, setConfig] = useState<AutoFetchConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    getAutoFetchConfig()
      .then(setConfig)
      .catch(() => setError("Could not load configuration."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  // Poll while a run is in flight so the last-run panel updates without a manual refresh.
  useEffect(() => {
    if (!open || config?.lastRun?.status !== "running") return;
    const id = setInterval(load, 4000);
    return () => clearInterval(id);
  }, [open, config?.lastRun?.status, load]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const save = async () => {
    if (!config) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await saveAutoFetchConfig({
        titles: config.titles,
        locations: config.locations,
        source: config.source,
        postedRange: config.postedRange,
        remoteOnly: config.remoteOnly,
        frequencyMinutes: config.frequencyMinutes,
        enabled: config.enabled,
      });
      setConfig(updated);
      onConfigChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const runNow = async () => {
    setRunning(true);
    setError(null);
    try {
      await runAutoFetchNow();
      onFetchStarted();
      onConfigChanged();
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start fetch.");
    } finally {
      setRunning(false);
    }
  };

  const toggleEnabled = async () => {
    if (!config || toggling) return;
    const nextEnabled = !config.enabled;
    setConfig({ ...config, enabled: nextEnabled });
    setToggling(true);
    setError(null);
    try {
      const updated = await patchAutoFetchConfig({ enabled: nextEnabled });
      setConfig(updated);
      onConfigChanged();
    } catch (e) {
      setConfig({ ...config, enabled: !nextEnabled });
      setError(e instanceof Error ? e.message : "Could not update automatic fetching.");
    } finally {
      setToggling(false);
    }
  };

  const canRun = !!config && (config.titles.length > 0 || config.locations.length > 0);

  return (
    <div
      className="fixed inset-0 z-[105] flex items-end justify-center bg-black/55 p-0 sm:items-start sm:p-4 sm:pt-[6vh]"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Auto Fetch Jobs configuration"
        className="flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-xl bg-white shadow-2xl dark:bg-bodybg sm:max-h-[min(90dvh,780px)] sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-defaultborder/70 px-5 py-4">
          <div>
            <h2 className="text-[1rem] font-semibold text-defaulttextcolor">Auto Fetch Jobs</h2>
            <p className="mt-0.5 text-[0.75rem] text-textmuted">
              Configure recurring external job discovery across titles and locations.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-textmuted hover:bg-black/[0.04] dark:hover:bg-white/5"
          >
            <i className="ri-close-line text-lg" aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {loading || !config ? (
            <div className="py-10 text-center text-sm text-textmuted">Loading…</div>
          ) : (
            <div className="space-y-5">
              {error && (
                <div className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-[0.75rem] text-danger">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between rounded-lg border border-defaultborder/70 px-3 py-2.5 dark:border-white/10">
                <div>
                  <p className="text-[0.8rem] font-semibold text-defaulttextcolor">Automatic fetching</p>
                  <p className="text-[0.7rem] text-textmuted">
                    {config.enabled ? "Active — runs on the schedule below" : "Off — nothing runs until enabled"}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={config.enabled}
                  aria-label="Automatic fetching"
                  disabled={toggling}
                  onClick={toggleEnabled}
                  className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60 ${
                    config.enabled ? "bg-primary" : "bg-black/15 dark:bg-white/15"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      config.enabled ? "translate-x-5" : "translate-x-0.5"
                    }`}
                    style={{ marginTop: "1px" }}
                  />
                </button>
              </div>

              <ChipListEditor
                label="Job titles / keywords"
                placeholder="e.g. React Developer"
                values={config.titles}
                onChange={(titles) => setConfig({ ...config, titles })}
              />
              <ChipListEditor
                label="Locations"
                placeholder="e.g. India"
                values={config.locations}
                onChange={(locations) => setConfig({ ...config, locations })}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-wide text-textmuted dark:text-white/45">
                    Source
                  </label>
                  <select
                    className="form-select !min-h-[2.25rem] w-full !text-[0.8rem]"
                    value={config.source}
                    onChange={(e) => setConfig({ ...config, source: e.target.value as ExternalJobSource })}
                  >
                    {SOURCE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-wide text-textmuted dark:text-white/45">
                    Posted range
                  </label>
                  <select
                    className="form-select !min-h-[2.25rem] w-full !text-[0.8rem]"
                    value={config.postedRange}
                    onChange={(e) => setConfig({ ...config, postedRange: e.target.value as AutoFetchPostedRange })}
                  >
                    {POSTED_RANGE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-wide text-textmuted dark:text-white/45">
                    Fetch frequency
                  </label>
                  <select
                    className="form-select !min-h-[2.25rem] w-full !text-[0.8rem]"
                    value={config.frequencyMinutes}
                    onChange={(e) =>
                      setConfig({ ...config, frequencyMinutes: Number(e.target.value) as AutoFetchFrequencyMinutes })
                    }
                  >
                    {FREQUENCY_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="mt-6 flex items-center gap-2 text-[0.8rem] text-defaulttextcolor">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={config.remoteOnly}
                    onChange={(e) => setConfig({ ...config, remoteOnly: e.target.checked })}
                  />
                  Remote only
                </label>
              </div>

              <div className="rounded-lg border border-defaultborder/70 px-3 py-2.5 text-[0.75rem] dark:border-white/10">
                <p className="font-semibold text-defaulttextcolor">
                  {config.queryCount} quer{config.queryCount === 1 ? "y" : "ies"} per run
                  {config.queryCount > 5 ? " — throttled, will take a few minutes" : ""}
                </p>
                {config.lastRun ? (
                  <div className="mt-1.5 space-y-0.5 text-textmuted">
                    <p>
                      Last run:{" "}
                      <span
                        className={
                          config.lastRun.status === "failed"
                            ? "font-semibold text-danger"
                            : config.lastRun.status === "partial"
                            ? "font-semibold text-amber-600"
                            : "font-semibold text-defaulttextcolor"
                        }
                      >
                        {STATUS_LABEL[config.lastRun.status]}
                      </span>{" "}
                      · {new Date(config.lastRun.startedAt).toLocaleString()}
                    </p>
                    {config.lastRun.status === "running" ? (
                      <p className="flex flex-wrap items-center gap-x-1.5 text-defaulttextcolor">
                        <i className="ri-loader-4-line animate-spin text-primary" aria-hidden />
                        {config.lastRun.currentQuery ? (
                          <span>
                            Fetching {config.lastRun.currentQuery.index} of {config.lastRun.currentQuery.total}:{" "}
                            <span className="font-medium">{config.lastRun.currentQuery.title || "any title"}</span>{" "}
                            in <span className="font-medium">{config.lastRun.currentQuery.location || "any location"}</span>
                          </span>
                        ) : (
                          <span>Starting…</span>
                        )}
                        <span>· {config.lastRun.stats.fetched} found so far</span>
                      </p>
                    ) : (
                      <p>
                        {config.lastRun.stats.fetched} fetched · {config.lastRun.stats.created} new ·{" "}
                        {config.lastRun.stats.updated} updated · {config.lastRun.stats.staleArchived} stale archived ·{" "}
                        {config.lastRun.stats.expiredRemoved ?? 0} expired removed
                      </p>
                    )}
                    {config.lastRun.errorMessage && <p className="text-danger">Reason: {config.lastRun.errorMessage}</p>}
                    {config.nextRunAt && config.enabled && (
                      <p>Next run: {new Date(config.nextRunAt).toLocaleString()}</p>
                    )}
                  </div>
                ) : (
                  <p className="mt-1 text-textmuted">No runs yet.</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-defaultborder/70 px-5 py-3.5">
          <button
            type="button"
            onClick={runNow}
            disabled={!canRun || running || loading || saving}
            className="rounded-lg border border-defaultborder/70 px-3.5 py-2 text-[0.8rem] font-semibold text-defaulttextcolor disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15"
          >
            {running ? "Starting…" : "Fetch Now"}
          </button>
          <button
            type="button"
            onClick={save}
            disabled={loading || saving}
            className="rounded-lg bg-primary px-4 py-2 text-[0.8rem] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Configuration"}
          </button>
        </div>
      </div>
    </div>
  );
}
