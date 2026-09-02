/**
 * Tailwind classes for ephemeral status toasts.
 * Uses defaulttextcolor in light mode and inverts in dark mode so the surface
 * never becomes a white slab over a dark page.
 */
export const INLINE_STATUS_TOAST_INNER_CLASSES =
  "inline-flex items-center gap-2 rounded-md bg-defaulttextcolor text-white px-4 py-3 shadow-lg text-[0.8125rem] font-medium dark:bg-white dark:text-bodybg ring-1 ring-black/10 dark:ring-white/10";

export const INLINE_STATUS_TOAST_POSITION_BOTTOM_RIGHT = "fixed bottom-4 right-4 z-50";

export const INLINE_STATUS_TOAST_POSITION_BOTTOM_CENTER =
  "fixed bottom-6 left-1/2 z-[80] -translate-x-1/2";

/** Above SOP assign modals (z-[10050]) and confirm (z-[10100]); no page scrim. */
export const INLINE_STATUS_TOAST_POSITION_TOP_END = "fixed top-4 right-4 z-[11000]";
