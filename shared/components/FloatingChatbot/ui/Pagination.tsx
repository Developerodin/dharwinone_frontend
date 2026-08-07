"use client";
import { TYPE } from "./tokens";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPick: (page: number) => void;
}

// Unified prev/next + windowed page-dot pagination.
// Narrow panels must never wrap glyph-by-glyph ("Pre"/"v", "1"/"6").
export function Pagination({ page, pageCount, onPick }: PaginationProps) {
  return (
    <div className="flex min-w-0 flex-nowrap items-center gap-1.5 pt-1">
      <NavBtn
        label="Previous page"
        disabled={page === 0}
        onClick={() => onPick(Math.max(0, page - 1))}
      >
        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden whitespace-nowrap sm:inline">Prev</span>
      </NavBtn>

      <PageDots count={pageCount} active={page} onPick={onPick} />

      <NavBtn
        label="Next page"
        disabled={page === pageCount - 1}
        onClick={() => onPick(Math.min(pageCount - 1, page + 1))}
      >
        <span className="hidden whitespace-nowrap sm:inline">Next</span>
        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </NavBtn>
    </div>
  );
}

function NavBtn({
  label, disabled, onClick, children,
}: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="inline-flex h-7 shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {children}
    </button>
  );
}

function PageDots({ count, active, onPick }: { count: number; active: number; onPick: (p: number) => void }) {
  // Keep the window small so the control fits a ~420px side panel.
  const MAX_SLOTS = 5;
  let slots: (number | "…")[];
  if (count <= MAX_SLOTS) {
    slots = Array.from({ length: count }, (_, i) => i);
  } else if (active <= 1) {
    slots = [0, 1, 2, "…", count - 1];
  } else if (active >= count - 2) {
    slots = [0, "…", count - 3, count - 2, count - 1];
  } else {
    slots = [0, "…", active, "…", count - 1];
  }
  return (
    <div className="flex min-w-0 flex-1 items-center justify-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-nowrap items-center gap-1 px-0.5">
        {slots.map((s, i) =>
          s === "…" ? (
            <span key={`e-${i}`} className={`shrink-0 px-1 ${TYPE.meta}`}>…</span>
          ) : (
            <button
              key={s}
              type="button"
              onClick={() => onPick(s)}
              aria-label={`Page ${s + 1}`}
              aria-current={s === active ? "page" : undefined}
              className={[
                "inline-flex h-7 min-w-[1.75rem] shrink-0 items-center justify-center whitespace-nowrap rounded-md px-1.5 text-[11px] font-medium tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                s === active
                  ? "bg-primary text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:bg-slate-800",
              ].join(" ")}
            >
              {s + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}
