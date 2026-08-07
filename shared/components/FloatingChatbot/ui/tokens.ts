// uat.dharwin.frontend/shared/components/FloatingChatbot/ui/tokens.ts
//
// Single source of truth for chatbot visual tokens. Every primitive +
// renderer imports from here — never inlines tone classes, radii, or
// animation keyframes.

import type { Tone } from "@/shared/types/chatResponse";

export const TONE_CHIP: Record<Tone, string> = {
  neutral: "border-slate-200/80 bg-slate-100/70 text-slate-700 dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-200",
  info:    "border-sky-200/70 bg-sky-50/80 text-sky-700 dark:border-sky-800/50 dark:bg-sky-900/30 dark:text-sky-200",
  success: "border-emerald-200/70 bg-emerald-50/80 text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-900/30 dark:text-emerald-200",
  warn:    "border-amber-200/70 bg-amber-50/80 text-amber-800 dark:border-amber-800/50 dark:bg-amber-900/30 dark:text-amber-200",
  danger:  "border-rose-200/70 bg-rose-50/80 text-rose-700 dark:border-rose-800/50 dark:bg-rose-900/30 dark:text-rose-200",
};

export const TONE_DOT: Record<Tone, string> = {
  neutral: "bg-slate-400",
  info:    "bg-sky-500",
  success: "bg-emerald-500",
  warn:    "bg-amber-500",
  danger:  "bg-rose-500",
};

// Card surfaces.
//
// The agent reply is FRAMELESS on purpose. The panel is already a container;
// wrapping records in a bordered bubble double-framed every answer (bubble
// border + card border + accent stripe = three edges around one datum).
// One frame only, and it belongs to the record card.
//
// User bubble: brand fill only (Restrained accent). Soft radius with a
// clipped trailing corner for chat directionality; inset ring for edge
// definition instead of a purple glow (reads less like AI chrome). Text is
// tinted near-white so it stays ≥4.5:1 on primary without pure #fff.
export const SURFACE = {
  card:        "rounded-lg border border-slate-200 bg-white dark:border-slate-700/60 dark:bg-slate-800/50",
  console:     "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950",
  bubbleAgent: "text-slate-800 dark:text-slate-100",
  bubbleUser:
    "rounded-[1.125rem] rounded-br-md bg-primary text-violet-50 " +
    "shadow-[0_1px_2px_rgb(15_23_42_/_0.06),0_6px_16px_-10px_rgb(132_90_223_/_0.38)] " +
    "ring-1 ring-inset ring-white/15 " +
    "dark:shadow-[0_1px_2px_rgb(0_0_0_/_0.35),0_8px_20px_-12px_rgb(132_90_223_/_0.45)] " +
    "dark:ring-white/12 " +
    "selection:bg-white/25 selection:text-white",
} as const;

// Accessible brand ink. `primary` (#845ADF) is 4.66:1 on white — it only
// clears AA at full strength, so it must never carry an opacity modifier on
// text. `violet-700` (7.1:1) is the same hue with headroom; use it wherever
// brand-coloured text sits under 14px.
export const BRAND_INK = "text-violet-700 dark:text-violet-300";

// Containment — every chatbot inner box uses these to prevent overflow.
export const CONTAINMENT = "w-full min-w-0 max-w-full box-border";
export const WRAP_ANYWHERE = "[overflow-wrap:anywhere]";

// Typography scale — five steps: 11 / 12.5 / 13 / 15 / 17.
//
// This replaced a 13-size drift (8.5 … 15px). Half-pixel steps are invisible,
// so they bought no hierarchy while costing all consistency, and nine
// unrelated roles all wore font-mono + uppercase + wide tracking, which meant
// the word "You" carried the same weight as the answer's own title.
//
// `author` is now the ONLY mono-uppercase role in the component. Everything
// else is app sans in normal case, and hierarchy comes from size + weight.
// 11px is the floor; nothing renders smaller.
export const TYPE = {
  author:   "font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400",
  label:    "text-[11px] font-medium text-slate-500 dark:text-slate-400",
  meta:     "text-[11px] text-slate-500 dark:text-slate-400",
  title:    "text-[13px] font-semibold text-slate-900 dark:text-slate-50",
  value:    "min-w-0 flex-1 break-words text-[13px] text-slate-800 dark:text-slate-100",
  body:     "text-[13px] text-slate-800 dark:text-slate-100",
  heading3: "text-[13px] font-semibold text-slate-900 dark:text-slate-50",
  heading2: "text-[15px] font-semibold text-slate-900 dark:text-slate-50",
  heading1: "text-[17px] font-semibold tracking-tight text-slate-900 dark:text-slate-50",
} as const;

export const TABLE_PAGE_SIZE = 10;

// Console animation keyframes — injected once via <ConsoleStyles/>.
//
// Deleted: agent-grid-drift, agent-shimmer, agent-mesh-drift and the
// gradient scrollbar. All four ran forever and conveyed nothing; combined
// with a per-message orbiting conic gradient they left a 20-message thread
// running ~20 concurrent compositor animations for zero information.
//
// What survives is state-bearing only: pulse-ring and dot/bar fire while the
// agent is actually working, never at rest.
export const CONSOLE_KEYFRAMES = `
@keyframes agent-pulse-ring {
  0% { transform: scale(0.55); opacity: 0.85; }
  100% { transform: scale(1.7); opacity: 0; }
}
@keyframes agent-dot {
  0%, 80%, 100% { opacity: 0.2; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-3px); }
}
@keyframes agent-bar {
  0%, 100% { transform: scaleX(0.2); opacity: 0.45; }
  50% { transform: scaleX(1); opacity: 1; }
}
.agent-scrollbar { scrollbar-width: thin; scrollbar-color: rgb(203 213 225) transparent; }
.dark .agent-scrollbar { scrollbar-color: rgb(51 65 85) transparent; }
.agent-scrollbar::-webkit-scrollbar { width: 8px; }
.agent-scrollbar::-webkit-scrollbar-track { background: transparent; }
.agent-scrollbar::-webkit-scrollbar-thumb { background: rgb(203 213 225); border-radius: 999px; }
.dark .agent-scrollbar::-webkit-scrollbar-thumb { background: rgb(51 65 85); }
@media (prefers-reduced-motion: reduce) {
  .agent-console *, .agent-console *::before, .agent-console *::after,
  .agent-fab, .agent-fab *, .agent-fab *::before, .agent-fab *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

