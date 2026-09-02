"use client"

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import type { StudentHeaderFilterKey } from "@/shared/lib/training/student-list-filters"
import { filterStudentFacetOptions } from "@/shared/lib/training/student-list-filters"

const MENU_WIDTH = 288

export interface StudentColumnHeaderFilterProps {
  filterKey: StudentHeaderFilterKey
  label: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
  onClear: () => void
  hideLabel?: boolean
  emailOptions?: string[]
  emailSelected?: string
  onToggleEmail?: (value: string) => void
  onClearEmail?: () => void
}

export default function StudentColumnHeaderFilter({
  filterKey,
  label,
  options,
  selected,
  onToggle,
  onClear,
  hideLabel = false,
  emailOptions,
  emailSelected = "",
  onToggleEmail,
  onClearEmail,
}: StudentColumnHeaderFilterProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [emailQuery, setEmailQuery] = useState("")
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; maxHeight: number } | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const searchId = `student-header-filter-${filterKey}`
  const emailSearchId = `${searchId}-email`
  const showEmail = Boolean(emailOptions && onToggleEmail)
  const emailActive = Boolean(emailSelected)
  const activeCount = selected.length + (emailActive ? 1 : 0)

  const visibleOptions = useMemo(
    () => filterStudentFacetOptions(options, query),
    [options, query]
  )
  const visibleEmails = useMemo(
    () => filterStudentFacetOptions(emailOptions ?? [], emailQuery),
    [emailOptions, emailQuery]
  )

  useLayoutEffect(() => {
    if (!open || !rootRef.current) return
    const update = () => {
      const r = rootRef.current!.getBoundingClientRect()
      const left = Math.min(Math.max(8, r.left), window.innerWidth - MENU_WIDTH - 8)
      const spaceBelow = window.innerHeight - r.bottom - 12
      const spaceAbove = r.top - 12
      const openDown = spaceBelow >= 220 || spaceBelow >= spaceAbove
      const maxHeight = Math.max(180, Math.min(360, openDown ? spaceBelow : spaceAbove))
      const top = openDown ? r.bottom + 4 : Math.max(8, r.top - maxHeight - 4)
      setMenuPos({ top, left, maxHeight })
    }
    update()
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, true)
    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="tabletitle flex items-center gap-1 text-start cursor-pointer hover:text-primary min-h-11"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={activeCount > 0 ? `Filter ${label}, ${activeCount} selected` : `Filter ${label}`}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((prev) => !prev)
        }}
      >
        {hideLabel ? null : <span>{label}</span>}
        <i
          className={`ri-filter-3-line text-[0.875rem] ${activeCount > 0 ? "text-primary" : "text-defaulttextcolor/50"}`}
          aria-hidden="true"
        />
        {activeCount > 0 && (
          <span className="badge bg-primary text-white rounded-full text-[0.65rem] px-1.5">
            {activeCount}
          </span>
        )}
      </button>
      {open && menuPos && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={menuRef}
              className="fixed z-[200] w-72 rounded-lg border border-defaultborder dark:border-defaultborder/20 bg-white py-2 shadow-lg dark:bg-bodybg overflow-y-auto overscroll-contain"
              style={{ top: menuPos.top, left: menuPos.left, maxHeight: menuPos.maxHeight, width: MENU_WIDTH }}
              role="dialog"
              aria-label={`Filter by ${label}`}
            >
              <div className="px-2 pb-2">
                <label htmlFor={searchId} className="sr-only">
                  Search {label}
                </label>
                <input
                  id={searchId}
                  type="search"
                  className="form-control !py-1.5 !text-sm min-h-11"
                  placeholder={`Search ${label.toLowerCase()}...`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="px-2">
                {visibleOptions.length > 0 ? (
                  <ul className="space-y-0.5">
                    {visibleOptions.map((option) => (
                      <li key={option}>
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 min-h-11 px-1.5 rounded-md">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selected.includes(option)}
                            onChange={() => onToggle(option)}
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{option}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center py-3 mb-0">
                    No {label.toLowerCase()} found
                  </p>
                )}
              </div>
              {showEmail && (
                <div className="mt-2 border-t border-gray-200 dark:border-defaultborder/10 pt-2">
                  <p className="px-2 mb-1.5 text-xs font-semibold text-gray-800 dark:text-white">Email</p>
                  <div className="px-2 pb-2">
                    <label htmlFor={emailSearchId} className="sr-only">
                      Search email
                    </label>
                    <input
                      id={emailSearchId}
                      type="search"
                      className="form-control !py-1.5 !text-sm min-h-11"
                      placeholder="Search email..."
                      value={emailQuery}
                      onChange={(e) => setEmailQuery(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                  <div className="px-2">
                    {visibleEmails.length > 0 ? (
                      <ul className="space-y-0.5">
                        {visibleEmails.map((email) => (
                          <li key={email}>
                            <label className="flex items-center gap-2 cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 min-h-11 px-1.5 rounded-md">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={emailSelected === email}
                                onChange={() => onToggleEmail?.(email)}
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300 break-all">{email}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-300 text-center py-3 mb-0">
                        No emails found
                      </p>
                    )}
                  </div>
                  {emailActive && onClearEmail && (
                    <div className="px-2 pt-2">
                      <button
                        type="button"
                        className="ti-btn ti-btn-light !py-1 !px-2 !text-[0.75rem] w-full min-h-11"
                        onClick={onClearEmail}
                      >
                        Clear email filter
                      </button>
                    </div>
                  )}
                </div>
              )}
              {selected.length > 0 && (
                <div className="px-2 pt-2 border-t border-gray-200 dark:border-defaultborder/10 mt-2">
                  <button
                    type="button"
                    className="ti-btn ti-btn-light !py-1 !px-2 !text-[0.75rem] w-full min-h-11"
                    onClick={onClear}
                  >
                    Clear {label} filter
                  </button>
                </div>
              )}
            </div>,
            document.body
          )
        : null}
    </div>
  )
}
