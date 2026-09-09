"use client"
import Seo from '@/shared/layout-components/seo/seo'
import React, { Fragment, useMemo, useState, useEffect, useCallback, useRef } from 'react'
import { useTable } from 'react-table'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { AxiosError } from 'axios'
import * as mentorsApi from '@/shared/lib/api/mentors'
import type { Mentor } from '@/shared/lib/api/mentors'
import MentorViewModal from './_components/MentorViewModal'
import MentorProfileImageModal from './_components/MentorProfileImageModal'
import ListPagination from '@/shared/components/ListPagination'
import { useAuth } from '@/shared/contexts/auth-context'
import { hasPermission } from '@/shared/lib/permissions'
import { getInitials } from '@/shared/lib/initials'
import { openHsOverlay, closeHsOverlay } from '../evaluation/_components/evaluation-overlay'

const ALLOWED_PROFILE_IMAGE_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
const MAX_PROFILE_IMAGE_BYTES = 5 * 1024 * 1024

function getMentorStatusBadgeClass(status: string): string {
  const normalized = status.toLowerCase()
  if (normalized === 'active') {
    return 'bg-success/10 text-success border border-success/30'
  }
  if (normalized === 'inactive') {
    return 'bg-gray-100 dark:bg-black/20 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600'
  }
  return 'bg-warning/10 text-warning border border-warning/30'
}

function MentorRowAvatar({
  name,
  imageUrl,
  className = 'w-10 h-10 rounded-full',
  onClick,
  onKeyDown,
}: {
  name: string
  imageUrl?: string | null
  className?: string
  onClick?: () => void
  onKeyDown?: (e: React.KeyboardEvent) => void
}) {
  const [imgFailed, setImgFailed] = useState(false)
  const showImg = Boolean(imageUrl) && !imgFailed
  const interactive = Boolean(onClick)

  if (showImg) {
    return (
      <img
        src={imageUrl!}
        alt={name}
        className={`object-cover flex-shrink-0 ${interactive ? 'cursor-pointer' : ''} ${className}`}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onError={() => setImgFailed(true)}
      />
    )
  }

  return (
    <span
      className={`flex items-center justify-center bg-primary/10 text-primary font-semibold text-sm flex-shrink-0 ring-1 ring-primary/15 ${interactive ? 'cursor-pointer' : ''} ${className}`}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={onKeyDown}
      onClick={onClick}
      aria-label={name}
    >
      {getInitials(name)}
    </span>
  )
}

interface MentorRow {
  id: string
  name: string
  displayPicture: string
  profileImageUrl?: string | null
  phone: string
  email: string
  skills: string[]
  expertise: string
  experience: number
  bio: string
  status: string
}

const Mentors = () => {
  const auth = useAuth()
  const canManageMentors = hasPermission(auth, 'manage_training_mentors')
  const [mentors, setMentors] = useState<MentorRow[]>([])
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState<string | null>(null)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [viewMentor, setViewMentor] = useState<Mentor | null>(null)
  const [viewMentorLoading, setViewMentorLoading] = useState(false)
  const [viewingMentorId, setViewingMentorId] = useState<string | null>(null)
  const [bulkDeleting, setBulkDeleting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'' | 'active' | 'inactive'>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalResults, setTotalResults] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [sortBy, setSortBy] = useState<string>('createdAt:desc')

  const [profileImageMentor, setProfileImageMentor] = useState<MentorRow | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [profileImageLoading, setProfileImageLoading] = useState(false)
  const [profileImageUploading, setProfileImageUploading] = useState(false)
  const [profileImageError, setProfileImageError] = useState<string | null>(null)

  const fetchMentorsRef = useRef<() => Promise<void>>()
  const fetchGenerationRef = useRef(0)
  const viewRequestIdRef = useRef(0)

  const hasActiveFilters = Boolean(debouncedSearchQuery.trim() || statusFilter)

  const mapMentorToRow = useCallback((mentor: Mentor): MentorRow => {
    const expertiseStr = mentor.expertise && mentor.expertise.length > 0
      ? mentor.expertise.map(exp => {
          const parts = []
          if (exp.area) parts.push(exp.area)
          if (exp.level) parts.push(`(${exp.level})`)
          if (exp.yearsOfExperience) parts.push(`${exp.yearsOfExperience} years`)
          return parts.join(' - ')
        }).filter(Boolean).join(', ')
      : ''

    const experienceYears = mentor.experience && mentor.experience.length > 0
      ? mentor.experience.reduce((total, exp) => {
          if (exp.startDate && exp.endDate) {
            try {
              const start = new Date(exp.startDate)
              const end = new Date(exp.endDate)
              if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                const years = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365)
                return total + Math.max(0, years)
              }
            } catch {
              // Invalid date, skip
            }
          }
          return total
        }, 0)
      : 0

    return {
      id: mentor.id,
      name: mentor.user?.name || 'Unknown',
      displayPicture: mentor.profileImageUrl || '',
      profileImageUrl: mentor.profileImageUrl || null,
      phone: mentor.phone || '',
      email: mentor.user?.email || '',
      skills: mentor.skills || [],
      expertise: expertiseStr,
      experience: Math.round(experienceYears),
      bio: mentor.bio || '',
      status: mentor.status || 'active',
    }
  }, [])

  const fetchMentors = useCallback(async () => {
    const generation = ++fetchGenerationRef.current
    setLoading(true)
    setListError(null)
    try {
      const params: mentorsApi.ListMentorsParams = {
        page: currentPage,
        limit: pageSize,
        sortBy,
        ...(debouncedSearchQuery.trim() && { search: debouncedSearchQuery.trim() }),
        ...(statusFilter && { status: statusFilter }),
      }

      const response = await mentorsApi.listMentors(params)
      if (generation !== fetchGenerationRef.current) return

      const mappedMentors = response.results.map(mapMentorToRow)
      setMentors(mappedMentors)
      setTotalResults(response.totalResults)
      setTotalPages(response.totalPages)
    } catch (err) {
      if (generation !== fetchGenerationRef.current) return

      console.error('Error fetching mentors:', err)
      const msg =
        err instanceof AxiosError && err.response?.data?.message
          ? String(err.response.data.message)
          : err instanceof Error
          ? err.message
          : 'Failed to load mentors.'
      setListError(msg)
      setMentors([])
      setTotalResults(0)
      setTotalPages(0)
    } finally {
      if (generation === fetchGenerationRef.current) {
        setLoading(false)
      }
    }
  }, [currentPage, pageSize, sortBy, debouncedSearchQuery, statusFilter, mapMentorToRow])

  useEffect(() => {
    fetchMentorsRef.current = fetchMentors
  }, [fetchMentors])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)
    return () => window.clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchQuery, statusFilter, sortBy, pageSize])

  useEffect(() => {
    setSelectedRows(new Set())
  }, [currentPage, pageSize, sortBy, debouncedSearchQuery, statusFilter])

  useEffect(() => {
    fetchMentors()
  }, [fetchMentors])

  const dismissViewMentorModal = useCallback(() => {
    closeHsOverlay('#view-mentor-modal')
    setViewMentor(null)
  }, [])

  const handleViewMentor = async (mentorId: string) => {
    const requestId = ++viewRequestIdRef.current
    setViewMentor(null)
    setViewMentorLoading(true)
    setViewingMentorId(mentorId)
    openHsOverlay('#view-mentor-modal')
    try {
      const mentor = await mentorsApi.getMentor(mentorId)
      if (requestId !== viewRequestIdRef.current) return
      setViewMentor(mentor)
    } catch (err) {
      if (requestId !== viewRequestIdRef.current) return
      setViewMentor(null)
      closeHsOverlay('#view-mentor-modal')
      const msg =
        err instanceof AxiosError && err.response?.data?.message
          ? String(err.response.data.message)
          : 'Failed to load mentor details.'
      await Swal.fire({
        icon: 'error',
        title: 'Failed to load mentor',
        text: msg,
        toast: true,
        position: 'top-end',
        timer: 4000,
        showConfirmButton: false,
        timerProgressBar: true,
      })
    } finally {
      if (requestId === viewRequestIdRef.current) {
        setViewMentorLoading(false)
        setViewingMentorId(null)
      }
    }
  }

  const openProfileImageModal = useCallback(
    async (mentor: MentorRow) => {
      if (!canManageMentors) return
      setProfileImageMentor(mentor)
      setProfileImageUrl(null)
      setProfileImageError(null)
      setProfileImageLoading(true)

      try {
        const info = await mentorsApi.getMentorProfileImage(mentor.id)
        setProfileImageUrl(info?.url ?? mentor.profileImageUrl ?? null)
      } catch (err) {
        console.error('Failed to fetch profile image URL', err)
        setProfileImageUrl(mentor.profileImageUrl ?? null)
      } finally {
        setProfileImageLoading(false)
      }

      setTimeout(() => openHsOverlay('#mentor-profile-image-modal'), 50)
    },
    [canManageMentors]
  )

  const handleProfileImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file || !profileImageMentor || !canManageMentors) return

    if (!ALLOWED_PROFILE_IMAGE_TYPES.has(file.type)) {
      setProfileImageError('Please choose a PNG, JPG, or WEBP image.')
      e.target.value = ''
      return
    }
    if (file.size > MAX_PROFILE_IMAGE_BYTES) {
      setProfileImageError('Image must be 5 MB or smaller.')
      e.target.value = ''
      return
    }

    setProfileImageUploading(true)
    setProfileImageError(null)

    try {
      await mentorsApi.uploadMentorProfileImage(profileImageMentor.id, file)

      const info = await mentorsApi.getMentorProfileImage(profileImageMentor.id)
      setProfileImageUrl(info?.url ?? null)

      if (fetchMentorsRef.current) {
        await fetchMentorsRef.current()
      }

      await Swal.fire({
        icon: 'success',
        title: 'Profile image updated',
        text: `The profile image for "${profileImageMentor.name}" has been updated.`,
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      })
    } catch (err) {
      console.error('Failed to upload profile image', err)
      const msg =
        err instanceof AxiosError && err.response?.data?.message
          ? String(err.response.data.message)
          : 'Failed to upload profile image. Please try again.'
      setProfileImageError(msg)
      await Swal.fire({
        icon: 'error',
        title: 'Profile image upload failed',
        text: msg,
        toast: true,
        position: 'top-end',
        timer: 4000,
        showConfirmButton: false,
        timerProgressBar: true,
      })
    } finally {
      setProfileImageUploading(false)
      e.target.value = ''
    }
  }

  const refreshAfterDelete = useCallback(async (deletedCount: number) => {
    const shouldDecrementPage = mentors.length <= deletedCount && currentPage > 1
    if (shouldDecrementPage) {
      setCurrentPage((page) => Math.max(1, page - 1))
      return
    }
    if (fetchMentorsRef.current) {
      await fetchMentorsRef.current()
    }
  }, [mentors.length, currentPage])

  const handleDelete = useCallback(async (id: string) => {
    if (!canManageMentors) return
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    })

    if (!result.isConfirmed) return

    try {
      await mentorsApi.deleteMentor(id)
      await Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Mentor has been deleted.',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      })
      setSelectedRows((prev) => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
      await refreshAfterDelete(1)
    } catch (err) {
      const msg =
        err instanceof AxiosError && err.response?.data?.message
          ? String(err.response.data.message)
          : 'Failed to delete mentor.'
      await Swal.fire({
        icon: 'error',
        title: 'Failed to delete mentor',
        text: msg,
        toast: true,
        position: 'top-end',
        timer: 4000,
        showConfirmButton: false,
        timerProgressBar: true,
      })
    }
  }, [canManageMentors, refreshAfterDelete])

  const handleDeleteSelected = useCallback(async () => {
    if (!canManageMentors) return
    if (selectedRows.size === 0) {
      await Swal.fire({
        icon: 'warning',
        title: 'No selection',
        text: 'Please select at least one mentor to delete.',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      })
      return
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${selectedRows.size} mentor(s). This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `Yes, delete ${selectedRows.size} mentor(s)!`,
    })

    if (!result.isConfirmed) return

    setBulkDeleting(true)
    const ids = Array.from(selectedRows)
    try {
      const results = await Promise.allSettled(ids.map((id) => mentorsApi.deleteMentor(id)))
      const succeededIds = ids.filter((_, index) => results[index].status === 'fulfilled')
      const failed = results.length - succeededIds.length

      if (failed === 0) {
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${succeededIds.length} mentor(s) have been deleted.`,
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
        })
        setSelectedRows(new Set())
        await refreshAfterDelete(succeededIds.length)
      } else {
        const failedIds = new Set(ids.filter((_, index) => results[index].status === 'rejected'))
        setSelectedRows(failedIds)
        await Swal.fire({
          icon: failed === results.length ? 'error' : 'warning',
          title: failed === results.length ? 'Delete failed' : 'Partially deleted',
          text:
            failed === results.length
              ? 'Failed to delete the selected mentors.'
              : `${succeededIds.length} deleted, ${failed} failed.`,
          toast: true,
          position: 'top-end',
          timer: 4000,
          showConfirmButton: false,
          timerProgressBar: true,
        })
        if (succeededIds.length > 0) {
          await refreshAfterDelete(succeededIds.length)
        }
      }
    } finally {
      setBulkDeleting(false)
    }
  }, [selectedRows, canManageMentors, refreshAfterDelete])

  const handleRowSelect = useCallback((id: string) => {
    setSelectedRows((prev) => {
      const newSelected = new Set(prev)
      if (newSelected.has(id)) {
        newSelected.delete(id)
      } else {
        newSelected.add(id)
      }
      return newSelected
    })
  }, [])

  const handleSelectAll = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(new Set(mentors.map((mentor) => mentor.id)))
    } else {
      setSelectedRows(new Set())
    }
  }, [mentors])

  const filteredData = mentors
  const isAllSelected = selectedRows.size === filteredData.length && filteredData.length > 0
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < filteredData.length

  const columns = useMemo(
    () => [
      ...(canManageMentors
        ? [{
            Header: (
              <span className="sr-only">Select all mentors on this page</span>
            ),
            accessor: 'checkbox',
            id: 'checkbox',
            disableSortBy: true,
            Cell: ({ row }: any) => (
              <div className="flex items-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedRows.has(row.original.id)}
                  onChange={() => handleRowSelect(row.original.id)}
                  aria-label={`Select ${row.original.name}`}
                />
              </div>
            ),
          }]
        : []),
      {
        Header: 'Mentor Info',
        accessor: 'name',
        Cell: ({ row }: any) => {
          const mentor = row.original
          const avatarClick = canManageMentors ? () => openProfileImageModal(mentor) : undefined
          const avatarKeyHandler = canManageMentors
            ? (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openProfileImageModal(mentor)
                }
              }
            : undefined
          return (
            <div className="flex items-center gap-3">
              <MentorRowAvatar
                name={mentor.name}
                imageUrl={mentor.profileImageUrl || mentor.displayPicture}
                onClick={avatarClick}
                onKeyDown={avatarKeyHandler}
              />
              <div className="flex-1 min-w-0">
                <div
                  className="font-semibold text-gray-800 dark:text-white truncate cursor-pointer hover:text-primary"
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${mentor.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      void handleViewMentor(mentor.id)
                    }
                  }}
                  onClick={() => { void handleViewMentor(mentor.id) }}
                >
                  {mentor.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  <div className="flex items-center gap-1">
                    <i className="ri-phone-line"></i>
                    {mentor.phone || 'N/A'}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <i className="ri-mail-line"></i>
                    {mentor.email}
                  </div>
                </div>
              </div>
            </div>
          )
        },
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }: any) => {
          const mentor = row.original
          const label = mentor.status || 'unknown'
          return (
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium capitalize ${getMentorStatusBadgeClass(label)}`}>
                {label}
              </span>
            </div>
          )
        },
      },
      {
        Header: 'Skills',
        accessor: 'skills',
        Cell: ({ row }: any) => {
          const mentor = row.original
          if (!mentor.skills?.length) {
            return (
              <div className="flex items-center">
                <span className="text-gray-400 text-sm">No skills listed</span>
              </div>
            )
          }
          return (
            <div className="flex items-center">
              <div className="flex flex-wrap gap-1.5">
              {mentor.skills.slice(0, 3).map((skill: string, index: number) => (
                <span
                  key={index}
                  className="badge bg-primary/10 text-primary border border-primary/30 px-2 py-1 rounded-md text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
              {mentor.skills.length > 3 && (
                <span className="badge bg-gray-100 dark:bg-black/20 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md text-xs font-medium">
                  +{mentor.skills.length - 3}
                </span>
              )}
              </div>
            </div>
          )
        },
      },
      {
        Header: 'Expertise',
        accessor: 'expertise',
        id: 'expertise',
        Cell: ({ row }: any) => {
          const mentor = row.original
          return (
            <div
              className="hidden md:flex items-center justify-center text-sm text-gray-800 dark:text-white text-center mx-auto max-w-[280px] leading-6 break-words"
              title={mentor.expertise}
            >
              {mentor.expertise ? (
                <div className="font-medium flex items-center justify-center gap-2">
                  <i className="ri-star-line text-primary"></i>
                  <span>{mentor.expertise}</span>
                </div>
              ) : (
                <span className="text-gray-400">No expertise listed</span>
              )}
            </div>
          )
        },
      },
      {
        Header: 'Bio',
        accessor: 'bio',
        id: 'bio',
        Cell: ({ row }: any) => {
          const mentor = row.original
          return (
            <div className="hidden md:flex items-center">
              <div
                className="text-sm text-gray-700 dark:text-gray-300 max-w-[280px] line-clamp-3 leading-6 break-words"
                title={mentor.bio}
              >
                {mentor.bio || <span className="text-gray-400">No bio available</span>}
              </div>
            </div>
          )
        },
      },
      {
        Header: 'Actions',
        accessor: 'id',
        disableSortBy: true,
        Cell: ({ row }: any) => (
          <div className="flex items-center gap-2">
            <div className="hs-tooltip ti-main-tooltip">
              <button
                type="button"
                onClick={() => { void handleViewMentor(row.original.id) }}
                className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm md:ti-btn-sm !min-h-[2.25rem] !min-w-[2.25rem] ti-btn-success"
                title="View Mentor"
                aria-label={`View ${row.original.name}`}
                disabled={viewingMentorId === row.original.id && viewMentorLoading}
                aria-busy={viewingMentorId === row.original.id && viewMentorLoading}
              >
                <i className="ri-eye-line"></i>
                <span
                  className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
                  role="tooltip">
                  View Mentor
                </span>
              </button>
            </div>
            {canManageMentors && (
              <>
                <div className="hs-tooltip ti-main-tooltip">
                  <Link
                    href={`/training/mentors/edit?id=${encodeURIComponent(row.original.id)}`}
                    className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm md:ti-btn-sm !min-h-[2.25rem] !min-w-[2.25rem] ti-btn-info"
                    title="Edit Mentor"
                    aria-label={`Edit ${row.original.name}`}
                  >
                    <i className="ri-pencil-line"></i>
                    <span
                      className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
                      role="tooltip">
                      Edit Mentor
                    </span>
                  </Link>
                </div>
                <div className="hs-tooltip ti-main-tooltip">
                  <button
                    type="button"
                    onClick={() => { void handleDelete(row.original.id) }}
                    className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-sm md:ti-btn-sm !min-h-[2.25rem] !min-w-[2.25rem] ti-btn-danger"
                    title="Delete Mentor"
                    aria-label={`Delete ${row.original.name}`}
                  >
                    <i className="ri-delete-bin-line"></i>
                    <span
                      className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
                      role="tooltip">
                      Delete Mentor
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        ),
      },
    ],
    [
      selectedRows,
      canManageMentors,
      handleDelete,
      handleRowSelect,
      viewingMentorId,
      viewMentorLoading,
      openProfileImageModal,
    ]
  )

  const tableInstance: any = useTable(
    {
      columns,
      data: filteredData,
      manualPagination: true,
    }
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
  } = tableInstance

  const selectAllCheckbox = canManageMentors ? (
    <input
      className="form-check-input"
      type="checkbox"
      checked={isAllSelected}
      ref={(input) => {
        if (input) input.indeterminate = isIndeterminate
      }}
      onChange={handleSelectAll}
      aria-label="Select all mentors on this page"
    />
  ) : null

  return (
    <Fragment>
      <Seo title="Mentors" />

      <div className="mt-5 grid grid-cols-12 gap-6 h-[calc(100vh-8rem)] sm:mt-6">
        <div className="xl:col-span-12 col-span-12 h-full flex flex-col">
          <div className="box custom-box h-full flex flex-col">
            <div className="box-header flex items-center justify-between flex-wrap gap-4">
              <div className="box-title">
                Mentors
                <span className="badge bg-light text-default rounded-full ms-1 text-[0.75rem] align-middle">
                  {totalResults}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <select
                  className="form-control select-show-page-size !w-auto !py-1 !px-4 !text-[0.75rem] me-2"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  aria-label="Results per page"
                >
                  {[10, 25, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      Show {size}
                    </option>
                  ))}
                </select>
                <select
                  className="form-control !w-auto !py-1 !px-2 !text-[0.75rem] me-2"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as '' | 'active' | 'inactive')}
                  aria-label="Filter by status"
                >
                  <option value="">All statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select
                  className="form-control !w-auto !py-1 !px-2 !text-[0.75rem] me-2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort mentors"
                >
                  <option value="createdAt:desc">Newest first</option>
                  <option value="createdAt:asc">Oldest first</option>
                  <option value="updatedAt:desc">Recently updated</option>
                  <option value="status:asc">Status A–Z</option>
                </select>
                {canManageMentors && (
                  <Link
                    href="/training/mentors/add"
                    className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem] me-2"
                  >
                    <i className="ri-add-line font-semibold align-middle"></i>Add Mentor
                  </Link>
                )}
                <div className="relative me-2">
                  <input
                    type="text"
                    className="form-control !py-1 !px-2 !text-[0.75rem] !pe-8"
                    placeholder="Search mentors..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                    }}
                    aria-label="Search mentors"
                  />
                  <i className="ri-search-line absolute top-1/2 -translate-y-1/2 end-2 text-gray-400"></i>
                </div>
                {canManageMentors && (
                  <button
                    type="button"
                    className="ti-btn ti-btn-danger !py-1 !px-2 !text-[0.75rem]"
                    onClick={() => { void handleDeleteSelected() }}
                    disabled={selectedRows.size === 0 || bulkDeleting}
                    aria-busy={bulkDeleting}
                  >
                    <i className="ri-delete-bin-line font-semibold align-middle me-1"></i>Delete
                  </button>
                )}
              </div>
            </div>
            <div className="box-body !p-0 flex-1 flex flex-col overflow-hidden">
              {listError && (
                <div className="flex items-center gap-2 flex-wrap px-4 py-3 bg-danger/10 border-b border-danger/20 text-danger text-sm">
                  <i className="ri-error-warning-line shrink-0" aria-hidden="true" />
                  <span className="flex-1">{listError}</span>
                  <button
                    type="button"
                    className="ti-btn ti-btn-sm ti-btn-danger"
                    onClick={() => { void fetchMentors() }}
                  >
                    Retry
                  </button>
                  <button
                    type="button"
                    className="text-danger/60 hover:text-danger"
                    onClick={() => setListError(null)}
                    aria-label="Dismiss error"
                  >
                    <i className="ri-close-line" />
                  </button>
                </div>
              )}
              <div className="table-responsive flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
                <table {...getTableProps()} className="table whitespace-nowrap min-w-full table-striped table-hover table-bordered border-gray-300 dark:border-gray-600">
                  <thead>
                    {headerGroups.map((headerGroup: any, i) => (
                      <tr {...headerGroup.getHeaderGroupProps()} className="bg-primary/10 dark:bg-primary/20 border-b border-gray-300 dark:border-gray-600" key={`header-group-${i}`}>
                        {headerGroup.headers.map((column: any, j) => (
                          <th
                            {...column.getHeaderProps()}
                            scope="col"
                            className={`sticky top-0 z-10 bg-gray-50 dark:bg-black/20 align-middle ${
                              column.id === 'expertise' ? 'text-center hidden md:table-cell' : 'text-start'
                            } ${column.id === 'bio' ? 'hidden md:table-cell' : ''}`}
                            key={column.id || `col-${j}`}
                          >
                            <div className={`flex items-center gap-2 ${column.id === 'expertise' ? 'justify-center' : ''}`}>
                              {column.id === 'checkbox' ? selectAllCheckbox : (
                                <span className="tabletitle">{column.render('Header')}</span>
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {loading ? (
                      <tr>
                        <td colSpan={columns.length} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                            <span className="text-gray-600 dark:text-gray-400">Loading mentors...</span>
                          </div>
                        </td>
                      </tr>
                    ) : listError ? (
                      <tr>
                        <td colSpan={columns.length} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <i className="ri-error-warning-line text-4xl text-danger mb-1" aria-hidden="true"></i>
                            <span className="text-gray-600 dark:text-gray-400">{listError}</span>
                            <button
                              type="button"
                              className="ti-btn ti-btn-sm ti-btn-danger"
                              onClick={() => { void fetchMentors() }}
                            >
                              Retry
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : filteredData.length === 0 ? (
                      <tr>
                        <td colSpan={columns.length} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <i className="ri-inbox-line text-4xl text-gray-400 mb-1" aria-hidden="true"></i>
                            {hasActiveFilters ? (
                              <>
                                <span className="text-gray-600 dark:text-gray-400">No mentors match your search or filters.</span>
                                <button
                                  type="button"
                                  className="ti-btn ti-btn-light ti-btn-sm"
                                  onClick={() => {
                                    setSearchQuery('')
                                    setDebouncedSearchQuery('')
                                    setStatusFilter('')
                                  }}
                                >
                                  Clear filters
                                </button>
                              </>
                            ) : (
                              <>
                                <span className="text-gray-600 dark:text-gray-400">No mentors yet.</span>
                                {canManageMentors && (
                                  <Link href="/training/mentors/add" className="ti-btn ti-btn-primary ti-btn-sm">
                                    <i className="ri-add-line me-1"></i>Add Mentor
                                  </Link>
                                )}
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((mentor) => {
                        const row = {
                          original: mentor,
                          getRowProps: () => ({}),
                          cells: columns.map((col: any) => ({
                            render: (type: string) => {
                              if (type === 'Cell') {
                                if (col.Cell) {
                                  return col.Cell({ row: { original: mentor } })
                                }
                                return mentor[col.accessor as keyof MentorRow]
                              }
                              return null
                            },
                            getCellProps: () => ({}),
                          })),
                        }
                        return (
                          <tr className="border-b border-gray-300 dark:border-gray-600" key={mentor.id}>
                            {row.cells.map((cell: any, idx: number) => {
                              const col = columns[idx]
                              const hiddenOnMobile = col?.id === 'expertise' || col?.id === 'bio'
                              return (
                                <td key={idx} className={`align-middle${hiddenOnMobile ? ' hidden md:table-cell' : ''}`}>
                                  {cell.render('Cell')}
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="box-footer !border-t-0">
              <ListPagination
                page={currentPage}
                totalPages={totalPages}
                totalResults={totalResults}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                gotoInputId="mentors-goto-page"
                touchFriendly
                ariaLabel="Mentors page navigation"
              />
            </div>
          </div>
        </div>
      </div>

      <MentorViewModal
        mentor={viewMentor}
        isLoading={viewMentorLoading}
        canManageMentors={canManageMentors}
        onClose={dismissViewMentorModal}
      />

      <MentorProfileImageModal
        mentor={profileImageMentor}
        profileImageUrl={profileImageUrl}
        profileImageLoading={profileImageLoading}
        profileImageUploading={profileImageUploading}
        profileImageError={profileImageError}
        onClose={() => {
          closeHsOverlay('#mentor-profile-image-modal')
          setProfileImageMentor(null)
          setProfileImageUrl(null)
          setProfileImageError(null)
        }}
        onFileChange={handleProfileImageFileChange}
      />
    </Fragment>
  )
}

export default Mentors
