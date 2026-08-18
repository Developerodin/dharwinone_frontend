"use client";

import { useId, useMemo, useState } from "react";
import type { NotificationPreferences } from "@/shared/lib/api/users";
import {
  ALL_NOTIFICATION_PREF_KEYS,
  NOTIFICATION_PREF_GROUPS,
  type NotificationPrefKey,
} from "@/shared/lib/notification-pref-groups";

type Props = {
  value: NotificationPreferences;
  onChange: (updater: (prev: NotificationPreferences) => NotificationPreferences) => void;
  defaultOpen?: boolean;
};

export function NotificationPreferencesEditor({ value, onChange, defaultOpen = false }: Props) {
  const panelId = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [openGroupIds, setOpenGroupIds] = useState<Set<string>>(() => new Set());

  const toggleGroup = (id: string) =>
    setOpenGroupIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const enabledCount = useMemo(
    () => ALL_NOTIFICATION_PREF_KEYS.filter((k) => value[k] !== false).length,
    [value]
  );

  const enableAll = () =>
    onChange((p) => {
      const next = { ...p };
      ALL_NOTIFICATION_PREF_KEYS.forEach((k) => {
        next[k] = true;
      });
      return next;
    });

  const disableAll = () =>
    onChange((p) => {
      const next = { ...p };
      ALL_NOTIFICATION_PREF_KEYS.forEach((k) => {
        next[k] = false;
      });
      return next;
    });

  const setGroupPrefs = (keys: NotificationPrefKey[], on: boolean) =>
    onChange((p) => {
      const next = { ...p };
      keys.forEach((k) => {
        next[k] = on;
      });
      return next;
    });

  return (
    <div className="box overflow-hidden">
      <div className="box-body !p-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-gray-50/80 dark:hover:bg-white/5 sm:px-5"
        >
          <span
            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm dark:bg-primary/20"
            aria-hidden
          >
            <i className="ri-notification-3-line text-[1.35rem] leading-none" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2 gap-y-1">
              <span className="font-semibold text-[1.05rem] text-defaulttextcolor">Notification preferences</span>
              <span className="inline-flex items-center rounded-md border border-defaultborder bg-white/90 px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wide text-defaulttextcolor/70 dark:bg-gray-800/80">
                Email & In-App
              </span>
            </span>
            <span className="mt-1.5 block text-[0.8125rem] leading-snug text-defaulttextcolor/65">
              <span className="tabular-nums font-medium text-defaulttextcolor/75">
                {enabledCount}/{ALL_NOTIFICATION_PREF_KEYS.length}
              </span>
              {" · "}
              {open ? "Hide details" : "Expand to manage notification channels"}
            </span>
          </span>
          <span className="flex shrink-0 flex-col items-center gap-1 pt-1 sm:pt-0.5">
            <span className="rounded-full border border-defaultborder/80 bg-white/80 px-2.5 py-0.5 text-[0.75rem] font-medium tabular-nums text-defaulttextcolor/80 dark:bg-gray-800/60">
              {enabledCount}/{ALL_NOTIFICATION_PREF_KEYS.length}
            </span>
            <i
              className={`ri-arrow-down-s-line text-2xl leading-none text-defaulttextcolor/45 transition-transform duration-300 ease-out ${open ? "rotate-180" : ""}`}
              aria-hidden
            />
          </span>
        </button>

        <div
          id={panelId}
          role="region"
          aria-label="Notification preferences"
          className={`overflow-hidden ${open ? "grid grid-rows-[1fr]" : "hidden"}`}
        >
          <div className="min-h-0">
            <div className="border-b border-defaultborder/70 bg-white/40 px-4 py-4 dark:border-defaultborder/50 dark:bg-gray-900/25 sm:px-5 sm:py-4">
              <p className="text-[0.875rem] text-defaulttextcolor/75 mb-4 max-w-2xl leading-relaxed">
                Choose which <strong className="font-medium text-defaulttextcolor">email</strong> and <strong className="font-medium text-defaulttextcolor">in-app</strong> notifications you receive. Toggle each channel independently per category.
              </p>
              <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-3">
                <span className="text-[0.8125rem] text-defaulttextcolor/60 tabular-nums shrink-0">
                  {enabledCount}/{ALL_NOTIFICATION_PREF_KEYS.length} enabled
                </span>
                <div
                  role="group"
                  aria-label="Bulk notification actions"
                  className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end"
                >
                  <button
                    type="button"
                    onClick={enableAll}
                    className="ti-btn ti-btn-outline-primary inline-flex !h-auto min-h-[2.5rem] w-full items-center justify-center gap-2 !px-4 !py-2.5 text-[0.875rem] font-medium sm:w-auto sm:min-w-[10.5rem]"
                  >
                    <i className="ri-mail-check-line shrink-0 text-[1.125rem] leading-none" aria-hidden />
                    <span>Enable all</span>
                  </button>
                  <button
                    type="button"
                    onClick={disableAll}
                    className="ti-btn ti-btn-light inline-flex !h-auto min-h-[2.5rem] w-full items-center justify-center gap-2 !px-4 !py-2.5 text-[0.875rem] font-medium sm:w-auto sm:min-w-[10.5rem]"
                  >
                    <i className="ri-mail-forbid-line shrink-0 text-[1.125rem] leading-none" aria-hidden />
                    <span>Disable all</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="px-3 py-4 sm:px-5 sm:py-5 space-y-4">
              {NOTIFICATION_PREF_GROUPS.map((group) => {
                const groupAllKeys = group.items.flatMap((i) => (i.key ? [i.key, i.inAppKey] : [i.inAppKey]));
                const groupOn = groupAllKeys.every((k) => value[k] !== false);
                const groupPartial = !groupOn && groupAllKeys.some((k) => value[k] !== false);
                const groupEnabledCount = groupAllKeys.filter((k) => value[k] !== false).length;
                const groupOpen = openGroupIds.has(group.id);
                const groupPanelId = `${panelId}-${group.id}`;

                return (
                  <section
                    key={group.id}
                    className="rounded-lg border border-defaultborder/90 bg-white/70 dark:bg-gray-800/30 overflow-hidden transition-shadow hover:shadow-sm"
                    aria-labelledby={`notif-group-${group.id}`}
                  >
                    <div className="flex flex-col gap-3 border-b border-defaultborder/60 bg-gray-50/80 dark:bg-gray-800/50 px-4 py-3 sm:px-4">
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.id)}
                        aria-expanded={groupOpen}
                        aria-controls={groupPanelId}
                        className="flex min-w-0 items-start gap-3 text-start"
                      >
                        <span
                          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20"
                          aria-hidden
                        >
                          <i className={`${group.icon} text-lg leading-none`} />
                        </span>
                        <div className="min-w-0 flex-1 pr-1">
                          <h3 id={`notif-group-${group.id}`} className="text-[0.9375rem] font-semibold text-defaulttextcolor mb-0 break-words">
                            {group.title}
                          </h3>
                          <p className="text-[0.75rem] text-defaulttextcolor/65 mb-0 mt-0.5 break-words">{group.summary}</p>
                        </div>
                        <span className="flex shrink-0 items-center gap-2 pt-0.5">
                          <span className="rounded-full border border-defaultborder/80 bg-white/80 px-2 py-0.5 text-[0.6875rem] font-medium tabular-nums text-defaulttextcolor/75 dark:bg-gray-800/60">
                            {groupEnabledCount}/{groupAllKeys.length}
                          </span>
                          <i
                            className={`ri-arrow-down-s-line text-xl leading-none text-defaulttextcolor/45 transition-transform duration-200 ease-out ${groupOpen ? "rotate-180" : ""}`}
                            aria-hidden
                          />
                        </span>
                      </button>
                      <div className="flex w-full min-w-0 flex-col gap-2.5 ps-0 sm:ps-12 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
                        {groupPartial ? (
                          <span className="inline-flex w-fit max-w-full items-center rounded border border-amber-200/80 bg-amber-50/90 px-2 py-1 text-[0.6875rem] font-medium uppercase tracking-wide text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
                            Partial
                          </span>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => setGroupPrefs(groupAllKeys, !groupOn)}
                          className={`ti-btn ti-btn-outline-primary inline-flex !h-auto min-h-[2.5rem] w-full max-w-full items-center justify-center gap-2 !px-4 !py-2.5 text-[0.875rem] font-medium lg:w-auto lg:shrink-0 lg:min-w-[12rem] ${!groupPartial ? "lg:ms-auto" : ""}`}
                        >
                          <span className="lg:hidden">{groupOn ? "Disable section" : "Enable section"}</span>
                          <span className="hidden lg:inline">{groupOn ? "Turn off entire section" : "Turn on entire section"}</span>
                        </button>
                      </div>
                    </div>
                    {groupOpen && (
                    <ul id={groupPanelId} className="list-none m-0 p-0 divide-y divide-defaultborder/50">
                      {group.items.map(({ key, inAppKey, label, description }) => {
                        const emailOn = key ? value[key] !== false : false;
                        const inAppOn = value[inAppKey] !== false;
                        return (
                          <li key={inAppKey}>
                            <div className="flex flex-col gap-2.5 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-4 sm:py-3.5 transition-colors hover:bg-gray-50/90 dark:hover:bg-white/5">
                              <span className="min-w-0 flex-1 pr-0 sm:pr-2">
                                <span className="block text-[0.9375rem] font-medium text-defaulttextcolor break-words">{label}</span>
                                {description ? (
                                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-defaulttextcolor/60 break-words">{description}</span>
                                ) : null}
                              </span>
                              <div className="flex shrink-0 items-center gap-5">
                                {key && (
                                  <label className="flex cursor-pointer flex-col items-center gap-1 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary/40 rounded">
                                    <span className="text-[0.6875rem] font-medium uppercase tracking-wide text-defaulttextcolor/55">Email</span>
                                    <input
                                      type="checkbox"
                                      className="sr-only"
                                      checked={emailOn}
                                      onChange={(e) => onChange((p) => ({ ...p, [key]: e.target.checked }))}
                                    />
                                    <span
                                      className={`relative inline-flex h-7 w-[2.75rem] cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
                                        emailOn ? "bg-primary" : "bg-gray-200 dark:bg-gray-600"
                                      }`}
                                      aria-hidden
                                    >
                                      <span
                                        className={`block h-6 w-6 rounded-full bg-white shadow-md ring-1 ring-black/5 transition-transform duration-200 ease-out dark:ring-white/10 ${
                                          emailOn ? "translate-x-[1.15rem]" : "translate-x-0"
                                        }`}
                                      />
                                    </span>
                                  </label>
                                )}
                                <label className="flex cursor-pointer flex-col items-center gap-1 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary/40 rounded">
                                  <span className="text-[0.6875rem] font-medium uppercase tracking-wide text-defaulttextcolor/55">In-App</span>
                                  <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={inAppOn}
                                    onChange={(e) => onChange((p) => ({ ...p, [inAppKey]: e.target.checked }))}
                                  />
                                  <span
                                    className={`relative inline-flex h-7 w-[2.75rem] cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
                                      inAppOn ? "bg-primary" : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                                    aria-hidden
                                  >
                                    <span
                                      className={`block h-6 w-6 rounded-full bg-white shadow-md ring-1 ring-black/5 transition-transform duration-200 ease-out dark:ring-white/10 ${
                                        inAppOn ? "translate-x-[1.15rem]" : "translate-x-0"
                                      }`}
                                    />
                                  </span>
                                </label>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    )}
                  </section>
                );
              })}
            </div>

            <div className="border-t border-defaultborder/80 bg-gray-50/50 px-4 py-3 dark:bg-gray-900/30 sm:px-5">
              <p className="text-[0.8125rem] text-defaulttextcolor/65 mb-0 flex flex-wrap items-center gap-2">
                <i className="ri-information-line text-base text-primary/80 shrink-0" aria-hidden />
                <span>
                  Preferences are stored with your profile. Use <strong className="font-medium text-defaulttextcolor/80">Save</strong> below to apply changes.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
