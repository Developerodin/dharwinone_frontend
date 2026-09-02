"use client"

import React, { useEffect, useMemo, useState } from 'react'
import type { StudentStatusFilter } from '@/shared/lib/training/student-list-filters'
import { filterStudentFacetOptions } from '@/shared/lib/training/student-list-filters'

export interface StudentFiltersFilterState {
  name: string[]
  skills: string[]
  education: string[]
  email: string
  experience: [number, number]
}

export interface StudentFiltersProps {
  filters: StudentFiltersFilterState
  setFilters: React.Dispatch<React.SetStateAction<StudentFiltersFilterState>>
  onClose: () => void
  allNames: string[]
  allSkills: string[]
  allEducation: string[]
  allEmails: string[]
  filteredNames: string[]
  filteredSkills: string[]
  filteredEducation: string[]
  searchName: string
  setSearchName: (v: string) => void
  searchSkills: string
  setSearchSkills: (v: string) => void
  searchEducation: string
  setSearchEducation: (v: string) => void
  statusFilter: StudentStatusFilter
  setStatusFilter: (v: StudentStatusFilter) => void
  handleMultiSelectChange: (key: 'name' | 'skills' | 'education', value: string) => void
  handleRemoveFilter: (key: 'name' | 'skills' | 'education', value: string) => void
  handleResetFilters: () => void
}

const FACET_LIST_BOX =
  'h-36 max-h-36 overflow-y-auto overscroll-contain rounded-lg bg-white dark:bg-black/20 p-2 shadow-sm [scrollbar-width:thin]'

function scrollFilterBodyIfListEdge(event: React.WheelEvent<HTMLDivElement>) {
  const list = event.currentTarget
  const atTop = list.scrollTop <= 0 && event.deltaY < 0
  const atBottom =
    list.scrollTop + list.clientHeight >= list.scrollHeight - 1 && event.deltaY > 0
  if (!atTop && !atBottom) return
  const body = list.closest('[data-student-filter-body]')
  if (!(body instanceof HTMLElement)) return
  body.scrollTop += event.deltaY
}

export default function StudentFilters({
  filters,
  setFilters,
  onClose,
  allNames,
  allSkills,
  allEducation,
  allEmails,
  filteredNames,
  filteredSkills,
  filteredEducation,
  searchName,
  setSearchName,
  searchSkills,
  setSearchSkills,
  searchEducation,
  setSearchEducation,
  statusFilter,
  setStatusFilter,
  handleMultiSelectChange,
  handleRemoveFilter,
  handleResetFilters,
}: StudentFiltersProps) {
  const [searchEmail, setSearchEmail] = useState('')
  const filteredEmails = useMemo(
    () => filterStudentFacetOptions(allEmails, searchEmail),
    [allEmails, searchEmail]
  )

  useEffect(() => {
    if (filters.email === '') setSearchEmail('')
  }, [filters.email])

  return (
    <div
      id="students-filter-panel"
      className="hs-overlay hidden ti-offcanvas ti-offcanvas-right !z-[105]"
      tabIndex={-1}
    >
      <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="ti-offcanvas-header bg-gray-50 dark:bg-black/20 !py-2.5 shrink-0">
        <h6 className="ti-offcanvas-title text-base font-semibold flex items-center gap-2">
          <i className="ri-search-line text-primary text-base"></i>
          Search Students
        </h6>
        <button
          type="button"
          className="ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10 hover:bg-gray-100 dark:hover:bg-black/40 rounded-md p-1"
          onClick={handleResetFilters}
        >
          <i className="ri-refresh-line me-1.5"></i>Reset
        </button>
      </div>
      <div
        data-student-filter-body
        className="ti-offcanvas-body !h-auto !max-h-none min-h-0 flex-1 overflow-y-auto !px-4 !pt-4 !pb-4"
      >
        <div className="space-y-5 pb-2">
          <div className="pb-4 border-b border-gray-200 dark:border-defaultborder/10">
            <label htmlFor="student-filter-status" className="form-label mb-2.5 block font-semibold text-sm text-gray-800 dark:text-white flex items-center gap-2">
              <i className="ri-toggle-line text-primary text-base"></i>
              Status
            </label>
            <select
              id="student-filter-status"
              className="form-control !py-1.5 !text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StudentStatusFilter)}
              aria-label="Filter by status"
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="pb-4 border-b border-gray-200 dark:border-defaultborder/10">
            <label htmlFor="student-filter-name-search" className="form-label mb-2.5 block font-semibold text-sm text-gray-800 dark:text-white flex items-center gap-2">
              <i className="ri-user-line text-primary text-base"></i>
              Name
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400">({allNames.length})</span>
            </label>
            <div className="space-y-2">
              <input
                id="student-filter-name-search"
                type="text"
                className="form-control !py-1.5 !text-sm mb-1.5"
                placeholder="Search students..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                aria-label="Search students"
              />
              <div className={FACET_LIST_BOX} onWheel={scrollFilterBodyIfListEdge}>
                <div className="space-y-1">
                  {filteredNames.length > 0 ? (
                    filteredNames.map((name) => (
                      <label
                        key={name}
                        className="flex items-center gap-2 cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 p-1.5 rounded-md transition-colors"
                      >
                        <input
                          type="checkbox"
                          className="form-check-input !w-3.5 !h-3.5"
                          checked={filters.name.includes(name)}
                          onChange={() => handleMultiSelectChange('name', name)}
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{name}</span>
                      </label>
                    ))
                  ) : (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-3">
                      No names found
                    </div>
                  )}
                </div>
              </div>
              {filters.name.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {filters.name.map((name) => (
                    <span
                      key={name}
                      className="badge bg-primary/10 text-primary border border-primary/30 px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-sm"
                    >
                      {name}
                      <button
                        type="button"
                        onClick={() => handleRemoveFilter('name', name)}
                        className="hover:text-primary-hover hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                        aria-label={`Remove name filter ${name}`}
                      >
                        <i className="ri-close-line text-xs"></i>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pb-4 border-b border-gray-200 dark:border-defaultborder/10">
            <label htmlFor="student-filter-email-search" className="form-label mb-2.5 block font-semibold text-sm text-gray-800 dark:text-white flex items-center gap-2">
              <i className="ri-mail-line text-warning text-base"></i>
              Email
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400">({allEmails.length})</span>
            </label>
            <div className="space-y-2">
              <input
                id="student-filter-email-search"
                type="search"
                className="form-control !py-1.5 !text-sm mb-1.5 min-h-11"
                placeholder="Search emails..."
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchEmail.trim()) {
                    setFilters((prev) => ({ ...prev, email: searchEmail.trim() }))
                  }
                }}
                autoComplete="off"
                aria-label="Search emails"
              />
              <div className={FACET_LIST_BOX} onWheel={scrollFilterBodyIfListEdge}>
                <div className="space-y-1">
                  {filteredEmails.length > 0 ? (
                    filteredEmails.map((email) => (
                      <label
                        key={email}
                        className="flex items-center gap-2 cursor-pointer hover:bg-warning/5 dark:hover:bg-warning/10 min-h-11 p-1.5 rounded-md transition-colors"
                      >
                        <input
                          type="checkbox"
                          className="form-check-input !w-3.5 !h-3.5"
                          checked={filters.email === email}
                          onChange={() =>
                            setFilters((prev) => ({
                              ...prev,
                              email: prev.email === email ? '' : email,
                            }))
                          }
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300 font-medium break-all">{email}</span>
                      </label>
                    ))
                  ) : (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-3">
                      No emails found
                    </div>
                  )}
                </div>
              </div>
              {filters.email !== '' && (
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  <span className="badge bg-warning/10 text-warning border border-warning/30 px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-sm">
                    {filters.email}
                    <button
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, email: '' }))}
                      className="hover:bg-warning/20 rounded-full p-0.5 transition-colors"
                      aria-label={`Remove email filter ${filters.email}`}
                    >
                      <i className="ri-close-line text-xs"></i>
                    </button>
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="pb-4 border-b border-gray-200 dark:border-defaultborder/10">
            <label htmlFor="student-filter-skills-search" className="form-label mb-2.5 block font-semibold text-sm text-gray-800 dark:text-white flex items-center gap-2">
              <i className="ri-code-s-slash-line text-success text-base"></i>
              Skills
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400">({allSkills.length})</span>
            </label>
            <div className="space-y-2">
              <input
                id="student-filter-skills-search"
                type="text"
                className="form-control !py-1.5 !text-sm mb-1.5"
                placeholder="Search skills..."
                value={searchSkills}
                onChange={(e) => setSearchSkills(e.target.value)}
              />
              <div className={FACET_LIST_BOX} onWheel={scrollFilterBodyIfListEdge}>
                <div className="space-y-1">
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map((skill) => (
                      <label
                        key={skill}
                        className="flex items-center gap-2 cursor-pointer hover:bg-success/5 dark:hover:bg-success/10 p-1.5 rounded-md transition-colors"
                      >
                        <input
                          type="checkbox"
                          className="form-check-input !w-3.5 !h-3.5"
                          checked={filters.skills.includes(skill)}
                          onChange={() => handleMultiSelectChange('skills', skill)}
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{skill}</span>
                      </label>
                    ))
                  ) : (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-3">
                      No skills found
                    </div>
                  )}
                </div>
              </div>
              {filters.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {filters.skills.map((skill) => (
                    <span
                      key={skill}
                      className="badge bg-success/10 text-success border border-success/30 px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveFilter('skills', skill)}
                        className="hover:text-success-hover hover:bg-success/20 rounded-full p-0.5 transition-colors"
                        aria-label={`Remove skill filter ${skill}`}
                      >
                        <i className="ri-close-line text-xs"></i>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pb-4 border-b border-gray-200 dark:border-defaultborder/10">
            <label htmlFor="student-filter-education-search" className="form-label mb-2.5 block font-semibold text-sm text-gray-800 dark:text-white flex items-center gap-2">
              <i className="ri-graduation-cap-line text-info text-base"></i>
              Education
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400">({allEducation.length})</span>
            </label>
            <div className="space-y-2">
              <input
                id="student-filter-education-search"
                type="text"
                className="form-control !py-1.5 !text-sm mb-1.5"
                placeholder="Search education..."
                value={searchEducation}
                onChange={(e) => setSearchEducation(e.target.value)}
              />
              <div className={FACET_LIST_BOX} onWheel={scrollFilterBodyIfListEdge}>
                <div className="space-y-1">
                  {filteredEducation.length > 0 ? (
                    filteredEducation.map((edu) => (
                      <label
                        key={edu}
                        className="flex items-center gap-2 cursor-pointer hover:bg-info/5 dark:hover:bg-info/10 p-1.5 rounded-md transition-colors"
                      >
                        <input
                          type="checkbox"
                          className="form-check-input !w-3.5 !h-3.5"
                          checked={filters.education.includes(edu)}
                          onChange={() => handleMultiSelectChange('education', edu)}
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{edu}</span>
                      </label>
                    ))
                  ) : (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-3">
                      No education found
                    </div>
                  )}
                </div>
              </div>
              {filters.education.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {filters.education.map((edu) => (
                    <span
                      key={edu}
                      className="badge bg-info/10 text-info border border-info/30 px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-sm"
                    >
                      {edu}
                      <button
                        type="button"
                        onClick={() => handleRemoveFilter('education', edu)}
                        className="hover:text-info-hover hover:bg-info/20 rounded-full p-0.5 transition-colors"
                        aria-label={`Remove education filter ${edu}`}
                      >
                        <i className="ri-close-line text-xs"></i>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="ti-offcanvas-footer !relative !bottom-auto shrink-0 px-4 py-3 flex gap-2">
        <button
          type="button"
          className="ti-btn ti-btn-primary flex-1 font-medium shadow-sm hover:shadow-md transition-shadow !py-1.5 !text-sm min-h-11"
          onClick={handleResetFilters}
        >
          <i className="ri-refresh-line me-1.5"></i>Reset
        </button>
        <button
          type="button"
          className="ti-btn ti-btn-light font-medium shadow-sm hover:shadow-md transition-shadow !py-1.5 !text-sm min-h-11"
          onClick={onClose}
        >
          <i className="ri-close-line me-1.5"></i>Close
        </button>
      </div>
      </div>
    </div>
  )
}
