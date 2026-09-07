'use client'

import React from 'react'
import type { ModuleLifecycleStatus } from './ModuleStatusBadge'

/**
 * Ynex `.ti-btn-sm` is a 1.75rem icon square. Labeled actions must force auto width.
 */
const BULK_BTN =
  'ti-btn !mb-0 !w-auto !h-9 !py-0 !px-3 shrink-0 whitespace-nowrap inline-flex items-center text-[0.8125rem]'

const GHOST_BTN = `${BULK_BTN} !bg-white/15 !text-white !border !border-white/25 hover:!bg-white/25 disabled:opacity-50 disabled:pointer-events-none`

const DANGER_BTN = `${BULK_BTN} ti-btn-danger-full disabled:opacity-50 disabled:pointer-events-none`

export interface ModulesBulkActionsBarProps {
  count: number
  busy: boolean
  onClear: () => void
  onSetStatus: (status: ModuleLifecycleStatus) => void
  onMove: () => void
  onDelete: () => void
}

/**
 * Sticky selection bar for bulk publish / draft / archive / move / delete.
 */
export function ModulesBulkActionsBar({
  count,
  busy,
  onClear,
  onSetStatus,
  onMove,
  onDelete,
}: ModulesBulkActionsBarProps) {
  const label = count === 1 ? '1 module' : `${count} modules`

  return (
    <div
      className="sticky top-0 z-[60] mb-5 rounded-xl border border-primary bg-primary text-white px-4 py-3"
      role="region"
      aria-label="Bulk module actions"
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white text-primary text-sm font-semibold tabular-nums shrink-0">
            {count}
          </span>
          <div className="min-w-0">
            <span className="font-semibold text-[0.875rem] leading-tight block">
              {label} selected
            </span>
            <button
              type="button"
              className="text-white/80 hover:text-white text-[0.75rem] underline underline-offset-2 transition-colors duration-200 leading-tight bg-transparent border-0 p-0"
              onClick={onClear}
            >
              Clear selection
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <button
            type="button"
            className={GHOST_BTN}
            disabled={busy}
            onClick={() => onSetStatus('published')}
            aria-label="Publish selected modules"
          >
            <i className="ri-send-plane-2-line" aria-hidden />
            Publish
          </button>
          <button
            type="button"
            className={GHOST_BTN}
            disabled={busy}
            onClick={() => onSetStatus('draft')}
            aria-label="Move selected modules to draft"
          >
            <i className="ri-file-edit-line" aria-hidden />
            Draft
          </button>
          <button
            type="button"
            className={GHOST_BTN}
            disabled={busy}
            onClick={() => onSetStatus('archived')}
            aria-label="Archive selected modules"
          >
            <i className="ri-archive-2-line" aria-hidden />
            Archive
          </button>
          <span className="w-px h-6 bg-white/25 mx-0.5 hidden sm:block" aria-hidden />
          <button
            type="button"
            className={GHOST_BTN}
            disabled={busy}
            onClick={onMove}
            aria-label="Move selected modules to folders"
          >
            <i className="ri-folder-transfer-line" aria-hidden />
            Move
          </button>
          <button
            type="button"
            className={DANGER_BTN}
            disabled={busy}
            onClick={onDelete}
            aria-label="Delete selected modules"
          >
            <i className="ri-delete-bin-line" aria-hidden />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
