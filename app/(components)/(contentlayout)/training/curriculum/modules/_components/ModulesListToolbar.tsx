'use client'

import Link from 'next/link'
import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import type {
  TrainingModuleLifecycleCounts,
  TrainingModulesListStatus,
} from '@/shared/lib/training/group-modules-into-folders'
import { closeHsDropdown, toggleHsDropdown } from './ModuleRowActions'
import { ModulesFolderExpandControls } from './ModulesFolderExpandControls'
import { ModulesStatusFilter } from './ModulesStatusFilter'

export type ModulesSortOption = { value: string; label: string }

export interface ModulesListToolbarProps {
  search: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  sortValue: ModulesSortOption
  sortOptions: ModulesSortOption[]
  onSortChange: (option: ModulesSortOption) => void
  statusFilter: TrainingModulesListStatus
  lifecycleCounts: TrainingModuleLifecycleCounts
  hrefForStatus: (id: TrainingModulesListStatus) => string
  onStatusChange: (next: TrainingModulesListStatus) => void
  showFolderHeaders: boolean
  allCollapsed: boolean
  folderCount: number
  onToggleAll: () => void
  onNewFolder: () => void
}

/**
 * Catalog toolbar: page title sits above the box; controls stay on one row
 * (search → sort → collapse → new module → overflow, status tabs on the right).
 */
export function ModulesListToolbar({
  search,
  onSearchChange,
  onSearchKeyDown,
  sortValue,
  sortOptions,
  onSortChange,
  statusFilter,
  lifecycleCounts,
  hrefForStatus,
  onStatusChange,
  showFolderHeaders,
  allCollapsed,
  folderCount,
  onToggleAll,
  onNewFolder,
}: ModulesListToolbarProps) {
  const moreMenuRef = useRef<HTMLDivElement | null>(null)
  const moreMenuId = useId()
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        closeHsDropdown(moreMenuRef.current)
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  /**
   * Opens or closes the overflow kebab.
   */
  const handleMoreToggle = useCallback((e: React.MouseEvent) => {
    toggleHsDropdown(moreMenuRef.current, e)
    setMoreOpen((open) => !open)
  }, [])

  /**
   * Maps native select value onto the existing sort option objects used by fetch/group.
   */
  const handleSortSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const next = sortOptions.find((opt) => opt.value === e.target.value)
      if (next) onSortChange(next)
    },
    [onSortChange, sortOptions],
  )

  /**
   * Closes overflow after a secondary action is chosen.
   */
  const handleOverflowAction = useCallback(() => {
    closeHsDropdown(moreMenuRef.current)
    setMoreOpen(false)
  }, [])

  /**
   * Opens the new-folder modal from the overflow menu.
   */
  const handleNewFolderFromMenu = useCallback(() => {
    handleOverflowAction()
    onNewFolder()
  }, [handleOverflowAction, onNewFolder])

  return (
    <div>
      <h1 className="mb-3 text-[1.125rem] font-semibold tracking-tight text-defaulttextcolor dark:text-white">
        Modules
      </h1>
      <div className="box custom-box">
        <div className="box-body !py-2 !px-3">
          <div className="flex items-center gap-1.5 flex-nowrap min-w-0 overflow-x-auto">
            <div className="relative w-48 shrink-0" role="search">
              <i
                className="ri-search-line absolute start-3 top-1/2 -translate-y-1/2 text-[0.875rem] leading-none text-[#8c9097] dark:text-white/50 pointer-events-none"
                aria-hidden
              />
              <input
                className="form-control !ps-9 !pe-3 !py-0 h-9 text-sm leading-none"
                type="search"
                placeholder="Search modules"
                aria-label="Search modules"
                value={search}
                onChange={onSearchChange}
                onKeyDown={onSearchKeyDown}
              />
            </div>
            <label className="sr-only" htmlFor="modules-sort">
              Sort modules
            </label>
            <select
              id="modules-sort"
              className="form-control h-9 !py-0 text-sm w-auto shrink-0"
              value={sortValue.value}
              onChange={handleSortSelect}
              aria-label="Sort modules"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {showFolderHeaders ? (
              <ModulesFolderExpandControls
                allCollapsed={allCollapsed}
                folderCount={folderCount}
                onToggleAll={onToggleAll}
              />
            ) : null}
            <Link
              href="/training/curriculum/modules/create"
              className="ti-btn ti-btn-primary-full !mb-0 h-9 !py-0 !px-3 !w-auto shrink-0 whitespace-nowrap inline-flex items-center"
            >
              <i className="ri-add-line me-1 font-semibold align-middle" aria-hidden />
              New module
            </Link>
            <div className="hs-dropdown ti-dropdown relative shrink-0" ref={moreMenuRef}>
              <button
                type="button"
                id={moreMenuId}
                className="ti-btn ti-btn-light !mb-0 !px-0 !py-0 h-9 w-9 inline-flex items-center justify-center"
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                aria-label="More module actions"
                onClick={handleMoreToggle}
              >
                <i className="fe fe-more-vertical" aria-hidden />
              </button>
              <ul
                className="hs-dropdown-menu ti-dropdown-menu hidden absolute start-0 top-full mt-1 z-[100] min-w-[11.5rem] bg-bodybg border border-defaultborder rounded-md shadow-lg"
                role="menu"
                aria-labelledby={moreMenuId}
              >
                <li>
                  <Link
                    className="ti-dropdown-item flex items-center"
                    href="/training/curriculum/modules/create-with-ai"
                    role="menuitem"
                    onClick={handleOverflowAction}
                  >
                    <i className="ri-magic-line me-2 align-middle" aria-hidden />
                    Create with AI
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="ti-dropdown-item w-full text-left flex items-center"
                    role="menuitem"
                    onClick={handleNewFolderFromMenu}
                  >
                    <i className="ri-folder-add-line me-2 align-middle" aria-hidden />
                    New folder
                  </button>
                </li>
                <li>
                  <Link
                    className="ti-dropdown-item flex items-center"
                    href="/training/curriculum/categories"
                    role="menuitem"
                    onClick={handleOverflowAction}
                  >
                    <i className="ri-settings-3-line me-2 align-middle" aria-hidden />
                    Manage folders
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex-1 min-w-1" aria-hidden />
            <div className="shrink-0 ms-auto">
              <ModulesStatusFilter
                value={statusFilter}
                counts={lifecycleCounts}
                hrefFor={hrefForStatus}
                onChange={onStatusChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
