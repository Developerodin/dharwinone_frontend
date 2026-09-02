"use client"

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'

export interface StudentRowActionsStudent {
  id: string
  name: string
}

export interface StudentRowActionsProps {
  student: StudentRowActionsStudent
  canManageStudents: boolean
  viewingStudentId: string | null
  viewStudentLoading: boolean
  downloadingStudentId: string | null
  menuOpen: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
  onView: () => void
  onDownload: () => void
  onShare: () => void
  onAddNote: () => void
  onDelete: () => void
}

export default function StudentRowActions({
  student,
  canManageStudents,
  viewingStudentId,
  viewStudentLoading,
  downloadingStudentId,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  onView,
  onDownload,
  onShare,
  onAddNote,
  onDelete,
}: StudentRowActionsProps) {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const isViewLoading = viewingStudentId === student.id && viewStudentLoading
  const isDownloading = downloadingStudentId === student.id

  useEffect(() => {
    if (!menuOpen) return
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) onCloseMenu()
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseMenu()
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen, onCloseMenu])

  const viewButton = (
    <button
      type="button"
      onClick={onView}
      className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm ti-btn-success"
      title="View Student"
      aria-label="View Student"
      aria-busy={isViewLoading}
      disabled={isViewLoading}
    >
      {isViewLoading ? (
        <i className="ri-loader-4-line animate-spin" aria-hidden="true"></i>
      ) : (
        <i className="ri-eye-line" aria-hidden="true"></i>
      )}
    </button>
  )

  const overflowItems = (
    <>
      {canManageStudents && (
        <Link
          href={`/training/students/edit/?id=${encodeURIComponent(student.id)}`}
          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium flex items-center gap-2"
          role="menuitem"
          onClick={onCloseMenu}
        >
          <i className="ri-pencil-line" aria-hidden="true"></i>
          Edit Student
        </Link>
      )}
      {canManageStudents && (
        <button
          type="button"
          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left flex items-center gap-2"
          role="menuitem"
          onClick={() => {
            onCloseMenu()
            onAddNote()
          }}
        >
          <i className="ri-file-add-line" aria-hidden="true"></i>
          Add Note
        </button>
      )}
      <button
        type="button"
        className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left flex items-center gap-2"
        role="menuitem"
        onClick={() => {
          onCloseMenu()
          onShare()
        }}
      >
        <i className="ri-share-line" aria-hidden="true"></i>
        Share Profile Link
      </button>
      <button
        type="button"
        className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left flex items-center gap-2 disabled:opacity-60"
        role="menuitem"
        disabled={isDownloading}
        aria-busy={isDownloading}
        onClick={() => {
          onCloseMenu()
          onDownload()
        }}
      >
        {isDownloading ? (
          <i className="ri-loader-4-line animate-spin" aria-hidden="true"></i>
        ) : (
          <i className="ri-download-line" aria-hidden="true"></i>
        )}
        Download Student Data
      </button>
      {canManageStudents && (
        <button
          type="button"
          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium w-full text-left flex items-center gap-2 text-danger"
          role="menuitem"
          onClick={() => {
            onCloseMenu()
            onDelete()
          }}
        >
          <i className="ri-user-unfollow-line" aria-hidden="true"></i>
          Deactivate
        </button>
      )}
    </>
  )

  return (
    <div className="flex items-center gap-2">
      <div className="hidden md:flex items-center gap-2">
        <div className="hs-tooltip ti-main-tooltip">{viewButton}</div>
        {canManageStudents && (
          <div className="hs-tooltip ti-main-tooltip">
            <Link
              href={`/training/students/edit/?id=${encodeURIComponent(student.id)}`}
              className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm ti-btn-info"
              title="Edit Student"
              aria-label="Edit Student"
            >
              <i className="ri-pencil-line" aria-hidden="true"></i>
            </Link>
          </div>
        )}
        {canManageStudents && (
          <div className="hs-tooltip ti-main-tooltip">
            <button
              type="button"
              onClick={onAddNote}
              className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm ti-btn-warning"
              title="Add Note"
              aria-label="Add Note"
            >
              <i className="ri-file-add-line" aria-hidden="true"></i>
            </button>
          </div>
        )}
        <div className="hs-tooltip ti-main-tooltip">
          <button
            type="button"
            onClick={onShare}
            className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm ti-btn-success"
            title="Share Profile Link"
            aria-label="Share Profile Link"
          >
            <i className="ri-share-line" aria-hidden="true"></i>
          </button>
        </div>
        <div className="hs-tooltip ti-main-tooltip">
          <button
            type="button"
            onClick={onDownload}
            className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm ti-btn-primary"
            title="Download Student Data"
            aria-label="Download Student Data"
            aria-busy={isDownloading}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <i className="ri-loader-4-line animate-spin" aria-hidden="true"></i>
            ) : (
              <i className="ri-download-line" aria-hidden="true"></i>
            )}
          </button>
        </div>
        {canManageStudents && (
          <div className="hs-tooltip ti-main-tooltip">
            <button
              type="button"
              onClick={onDelete}
              className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm ti-btn-danger"
              title="Deactivate"
              aria-label="Deactivate"
            >
              <i className="ri-user-unfollow-line" aria-hidden="true"></i>
            </button>
          </div>
        )}
      </div>

      <div className="flex md:hidden items-center gap-2">
        <div className="hs-tooltip ti-main-tooltip">{viewButton}</div>
        <div ref={menuRef} className="relative">
          <button
            type="button"
            className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"
            title="More actions"
            aria-label={`More actions for ${student.name}`}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={(e) => {
              e.stopPropagation()
              onToggleMenu()
            }}
          >
            <i className="ri-more-2-fill" aria-hidden="true"></i>
          </button>
          {menuOpen && (
            <div
              className="absolute end-0 top-full z-50 mt-1 min-w-[12rem] rounded-lg border border-defaultborder dark:border-defaultborder/20 bg-white py-1 shadow-lg dark:bg-bodybg"
              role="menu"
            >
              {overflowItems}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
