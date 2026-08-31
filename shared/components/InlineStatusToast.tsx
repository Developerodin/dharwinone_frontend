"use client";

import {
  INLINE_STATUS_TOAST_INNER_CLASSES,
  INLINE_STATUS_TOAST_POSITION_BOTTOM_CENTER,
  INLINE_STATUS_TOAST_POSITION_BOTTOM_RIGHT,
} from "@/shared/lib/inline-status-toast";

type InlineStatusToastProps = {
  message: string;
  position?: "bottom-right" | "bottom-center";
  iconClassName?: string;
};

export function InlineStatusToast({
  message,
  position = "bottom-right",
  iconClassName = "ri-information-line",
}: InlineStatusToastProps) {
  const positionClass =
    position === "bottom-center"
      ? INLINE_STATUS_TOAST_POSITION_BOTTOM_CENTER
      : INLINE_STATUS_TOAST_POSITION_BOTTOM_RIGHT;

  return (
    <div role="status" aria-live="polite" className={positionClass}>
      <div className={INLINE_STATUS_TOAST_INNER_CLASSES}>
        <i className={iconClassName} aria-hidden />
        {message}
      </div>
    </div>
  );
}
