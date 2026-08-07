"use client";
import { type ReactNode, useState } from "react";
import { TYPE } from "./tokens";

// ─── IconButton — header icon (clear / expand / close) ─────────────────────

export function IconButton({
  children, onClick, label, disabled = false,
}: { children: ReactNode; onClick: () => void; label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-35 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
    >
      {children}
    </button>
  );
}

// ─── Kbd — keyboard shortcut chip ──────────────────────────────────────────

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border border-slate-200 bg-white px-1 font-mono text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
      {children}
    </kbd>
  );
}

// ─── AgentOrb — agent avatar ───────────────────────────────────────────────
//
// Was an infinitely-rotating masked conic gradient. Every agent message
// mounted one, so a long thread ran a rotating gradient per message forever.
// Now a flat brand disc; the only motion is the pulse ring, and that fires
// only while `pulse` is true (preparing / streaming).

const ORB_SIZE = { sm: "h-7 w-7", md: "h-9 w-9" } as const;
const ORB_TEXT = { sm: "text-[11px]", md: "text-[13px]" } as const;

export function AgentOrb({
  size = "md", pulse = false, label = "D",
}: { size?: "sm" | "md"; pulse?: boolean; label?: string }) {
  return (
    <div className={`relative ${ORB_SIZE[size]} flex-shrink-0`}>
      {pulse && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-primary/30"
          style={{ animation: "agent-pulse-ring 1.6s ease-out infinite" }}
        />
      )}
      <div className={`absolute inset-0 flex items-center justify-center rounded-full bg-primary font-semibold text-white ${ORB_TEXT[size]}`}>
        {label}
      </div>
    </div>
  );
}

// ─── ReasoningIndicator — working state with animated dots ─────────────────

export function ReasoningIndicator() {
  return (
    <div className="mb-5 flex justify-start" aria-live="polite" aria-label="Dharwin is working">
      <div className="mr-2.5 mt-0.5 flex-shrink-0 self-start">
        <AgentOrb size="sm" pulse />
      </div>
      <div className="flex min-w-0 flex-col">
        <span className={`mb-1.5 px-1 ${TYPE.author}`}>Dharwin</span>
        <div className="flex items-center gap-2 px-1 py-1">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ animation: "agent-dot 1.2s ease-in-out infinite", animationDelay: "0ms" }} />
            <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ animation: "agent-dot 1.2s ease-in-out infinite", animationDelay: "180ms" }} />
            <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ animation: "agent-dot 1.2s ease-in-out infinite", animationDelay: "360ms" }} />
          </span>
          <span className="text-[13px] text-slate-500 dark:text-slate-400">Reading your data…</span>
        </div>
      </div>
    </div>
  );
}

// ─── EmptyChatState — pre-conversation suggested-questions screen ─────────

export function EmptyChatState({
  fullscreen, onPick, disabled, suggestions,
}: {
  fullscreen: boolean;
  onPick: (q: string) => void;
  disabled: boolean;
  suggestions: { q: string; k: string }[];
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${fullscreen ? "py-20" : "h-full py-6 px-1"}`}>
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>

      <p className="text-[17px] font-semibold tracking-tight text-slate-900 dark:text-slate-50">
        How can I help you today?
      </p>
      <p className="mt-1.5 max-w-sm text-[13px] text-slate-600 dark:text-slate-400">
        Ask anything about employees, jobs, attendance, leave, projects &amp; more.
      </p>

      <div className={`mt-5 grid w-full gap-2 ${fullscreen ? "max-w-2xl grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
        {suggestions.map(({ q, k }) => (
          <button
            key={q}
            onClick={() => onPick(q)}
            disabled={disabled}
            className="group/sug flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-left transition-colors hover:border-primary hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-primary dark:hover:bg-slate-900"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{k}</span>
              <span className="truncate text-[13px] text-slate-800 dark:text-slate-200">{q}</span>
            </span>
            <svg className="h-3.5 w-3.5 flex-shrink-0 text-slate-400 transition-transform group-hover/sug:translate-x-0.5 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── CopyButton — used after agent message ─────────────────────────────────

export function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <button
      type="button"
      onClick={onCopy}
      title={done ? "Copied" : "Copy"}
      aria-label={done ? "Copied" : "Copy"}
      className="inline-flex min-h-8 items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
    >
      {done ? (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v10a2 2 0 002 2h7M16 17V5a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h2" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}
