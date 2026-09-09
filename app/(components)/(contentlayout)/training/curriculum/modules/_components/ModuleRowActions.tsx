'use client'

import Link from 'next/link'
import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ModuleLifecycleStatus } from './ModuleStatusBadge'

export type ModuleRowActionsProps = {
  moduleId: string
  moduleName: string
  currentStatus: ModuleLifecycleStatus
  statusBusy: boolean
  onView: () => void
  onClone: () => void
  onAssignFolders: () => void
  onSetStatus: (next: ModuleLifecycleStatus) => void
  onDelete: () => void
}

type MenuCoords = {
  top: number
  left: number
  maxHeight: number
  width: number
}

/**
 * Viewport-fixed coords so the kebab is not clipped by virtualized card rows.
 */
function computeModuleRowMenuCoords(button: HTMLElement): MenuCoords {
  const rect = button.getBoundingClientRect()
  const width = 184
  const gutter = 8
  const gap = 4
  let left = rect.right - width
  left = Math.max(gutter, Math.min(left, window.innerWidth - width - gutter))
  const spaceBelow = window.innerHeight - rect.bottom - gutter
  const spaceAbove = rect.top - gutter
  const preferred = 280
  const openUp = spaceBelow < 160 && spaceAbove > spaceBelow
  const available = openUp ? spaceAbove - gap : spaceBelow - gap
  const maxHeight = Math.max(120, Math.min(preferred, available))
  const top = openUp ? rect.top - gap - maxHeight : rect.bottom + gap
  return { top, left, maxHeight, width }
}

/**
 * Kebab menu: View, Edit, Clone, Publish, Draft, Archive, Move, Delete.
 * Portaled + scrollable so it is not hidden behind neighboring cards.
 */
export default function ModuleRowActions({
  moduleId,
  moduleName,
  currentStatus,
  statusBusy,
  onView,
  onClone,
  onAssignFolders,
  onSetStatus,
  onDelete,
}: ModuleRowActionsProps) {
  const menuId = useId()
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLUListElement | null>(null)
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState<MenuCoords | null>(null)

  /**
   * Recomputes fixed position against the trigger.
   */
  const updatePosition = useCallback(() => {
    const button = buttonRef.current
    if (!button) return
    setCoords(computeModuleRowMenuCoords(button))
  }, [])

  useEffect(() => {
    if (!open) return
    updatePosition()

    /**
     * Closes on outside pointer or Escape. Catalog scroll repositions the
     * portaled menu so virtualized rows can scroll a card into view without
     * immediately dismissing it.
     */
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return
      setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onScrollOrResize = (event: Event) => {
      if (event.type === 'scroll' && menuRef.current?.contains(event.target as Node)) return
      const button = buttonRef.current
      if (!button) {
        setOpen(false)
        return
      }
      const rect = button.getBoundingClientRect()
      const onScreen = rect.bottom > 8 && rect.top < window.innerHeight - 8
      if (!onScreen) {
        setOpen(false)
        return
      }
      updatePosition()
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', onScrollOrResize, true)
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [open, updatePosition])

  /**
   * Closes the menu then runs a row action.
   */
  const runAction = useCallback((action: () => void) => {
    setOpen(false)
    action()
  }, [])

  /**
   * Opens or closes the portaled kebab.
   */
  const handleToggle = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setOpen((wasOpen) => !wasOpen)
  }, [])

  const menu =
    open && coords && typeof document !== 'undefined'
      ? createPortal(
          <ul
            ref={menuRef}
            id={menuId}
            className="m-0 overflow-y-auto overscroll-contain rounded-md border border-defaultborder bg-white py-1 shadow-lg dark:bg-bodybg"
            role="menu"
            aria-labelledby={`dropdown-menu-${moduleId}`}
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              width: coords.width,
              maxHeight: coords.maxHeight,
              zIndex: 200,
              display: 'block',
              opacity: 1,
              pointerEvents: 'auto',
            }}
          >
            <li>
              <button
                type="button"
                className="ti-dropdown-item w-full text-left"
                onClick={() => runAction(onView)}
                role="menuitem"
              >
                <i className="ri-eye-line align-middle me-1 inline-flex" aria-hidden /> View
              </button>
            </li>
            <li>
              <Link
                className="ti-dropdown-item"
                href={`/training/curriculum/modules/edit?id=${moduleId}`}
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <i className="ri-edit-line align-middle me-1 inline-flex" aria-hidden /> Edit
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="ti-dropdown-item w-full text-left"
                onClick={() => runAction(onClone)}
                role="menuitem"
              >
                <i className="ri-file-copy-line me-1 align-middle inline-flex" aria-hidden /> Clone
              </button>
            </li>
            <li>
              <button
                type="button"
                className="ti-dropdown-item w-full text-left disabled:opacity-50 disabled:pointer-events-none"
                disabled={statusBusy || currentStatus === 'published'}
                onClick={() => runAction(() => onSetStatus('published'))}
                role="menuitem"
              >
                <i className="ri-send-plane-2-line me-1 align-middle inline-flex" aria-hidden /> Publish
              </button>
            </li>
            <li>
              <button
                type="button"
                className="ti-dropdown-item w-full text-left disabled:opacity-50 disabled:pointer-events-none"
                disabled={statusBusy || currentStatus === 'draft'}
                onClick={() => runAction(() => onSetStatus('draft'))}
                role="menuitem"
              >
                <i className="ri-file-edit-line me-1 align-middle inline-flex" aria-hidden /> Draft
              </button>
            </li>
            <li>
              <button
                type="button"
                className="ti-dropdown-item w-full text-left disabled:opacity-50 disabled:pointer-events-none"
                disabled={statusBusy || currentStatus === 'archived'}
                onClick={() => runAction(() => onSetStatus('archived'))}
                role="menuitem"
              >
                <i className="ri-archive-2-line me-1 align-middle inline-flex" aria-hidden /> Archive
              </button>
            </li>
            <li>
              <button
                type="button"
                className="ti-dropdown-item w-full text-left"
                onClick={() => runAction(onAssignFolders)}
                role="menuitem"
              >
                <i className="ri-folder-transfer-line me-1 align-middle inline-flex" aria-hidden /> Move to folder(s)
              </button>
            </li>
            <li>
              <button
                type="button"
                className="ti-dropdown-item w-full text-left"
                onClick={() => runAction(onDelete)}
                role="menuitem"
              >
                <i className="ri-delete-bin-line me-1 align-middle inline-flex" aria-hidden /> Delete
              </button>
            </li>
          </ul>,
          document.body,
        )
      : null

  return (
    <div className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        id={`dropdown-menu-${moduleId}`}
        className="ti-btn ti-btn-sm ti-btn-light !mb-0 !px-0 !py-0 !w-8 !h-8 inline-flex items-center justify-center"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        onClick={handleToggle}
        aria-label={`Actions for ${moduleName}`}
      >
        <i className="fe fe-more-vertical" aria-hidden />
      </button>
      {menu}
    </div>
  )
}
