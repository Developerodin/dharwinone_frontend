"use client";

import FocusLock from "react-focus-lock";
import mailStyles from "./mail-app.module.css";

export type MailConfirmDialogProps = {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function MailConfirmDialog({
  title,
  message,
  confirmLabel,
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
}: MailConfirmDialogProps) {
  const titleId = "mail-confirm-title";
  const descId = "mail-confirm-desc";

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 ${mailStyles.modalBackdrop}`}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
      role="presentation"
    >
      <FocusLock returnFocus>
        <div
          className={`${mailStyles.confirmDialog} ${mailStyles.modalPanel}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              onCancel();
            }
          }}
        >
          <h2 id={titleId} className={mailStyles.confirmDialogTitle}>{title}</h2>
          <p id={descId} className={mailStyles.confirmDialogMessage}>{message}</p>
          <div className={mailStyles.confirmDialogActions}>
            <button
              type="button"
              autoFocus
              onClick={onCancel}
              className={mailStyles.confirmDialogCancel}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={
                destructive ? mailStyles.confirmDialogDanger : mailStyles.confirmDialogPrimary
              }
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </FocusLock>
    </div>
  );
}
