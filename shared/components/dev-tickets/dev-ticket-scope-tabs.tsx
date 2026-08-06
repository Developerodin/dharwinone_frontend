"use client";

type ScopeTab<T extends string> = {
  key: T;
  label: string;
  count?: number;
};

type DevTicketScopeTabsProps<T extends string> = {
  tabs: ScopeTab<T>[];
  value: T;
  onChange: (key: T) => void;
};

export default function DevTicketScopeTabs<T extends string>({
  tabs,
  value,
  onChange,
}: DevTicketScopeTabsProps<T>) {
  return (
    <div
      className="mb-4 inline-flex max-w-full flex-wrap gap-1 rounded-lg border border-defaultborder/80 bg-slate-50/80 p-1 dark:border-white/10 dark:bg-white/[0.03]"
      role="tablist"
      aria-label="Ticket scope"
    >
      {tabs.map((tab) => {
        const active = value === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.key)}
            className={`rounded-md px-3 py-1.5 text-[0.75rem] font-medium transition-colors ${
              active
                ? "bg-white text-primary shadow-sm dark:bg-bodybg"
                : "text-[#8c9097] hover:text-defaulttextcolor dark:text-white/50 dark:hover:text-white/80"
            }`}
          >
            {tab.label}
            {typeof tab.count === "number" ? (
              <span className="ms-1.5 tabular-nums opacity-70">({tab.count})</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
