"use client";

import {
  INLINE_STATUS_TOAST_INNER_CLASSES,
  INLINE_STATUS_TOAST_POSITION_BOTTOM_CENTER,
  INLINE_STATUS_TOAST_POSITION_BOTTOM_RIGHT,
  INLINE_STATUS_TOAST_POSITION_TOP_END,
} from "@/shared/lib/inline-status-toast";

type InlineStatusToastProps = {
  message: string;
  /** Optional second line; truncated, full string in title. */
  detail?: string;
  position?: "bottom-right" | "bottom-center" | "top-end";
  iconClassName?: string;
};

export function InlineStatusToast({
  message,
  detail,
  position = "bottom-right",
  iconClassName = "ri-information-line",
}: InlineStatusToastProps) {
  const positionClass =
    position === "bottom-center"
      ? INLINE_STATUS_TOAST_POSITION_BOTTOM_CENTER
      : position === "top-end"
        ? INLINE_STATUS_TOAST_POSITION_TOP_END
        : INLINE_STATUS_TOAST_POSITION_BOTTOM_RIGHT;

  return (
    <div role="status" aria-live="polite" className={positionClass}>
      <div className={`${INLINE_STATUS_TOAST_INNER_CLASSES} max-w-[20rem]`}>
        <i className={`${iconClassName} shrink-0 text-base leading-none`} aria-hidden />
        <div className="min-w-0">
          <p className="truncate">{message}</p>
          {detail ? (
            <p className="mt-0.5 truncate font-normal opacity-90" title={detail}>
              {detail}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
