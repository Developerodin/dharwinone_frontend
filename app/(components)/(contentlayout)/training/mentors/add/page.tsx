"use client"

import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Seo from '@/shared/layout-components/seo/seo'
import Swal from 'sweetalert2'
import { AxiosError } from 'axios'
import * as authApi from '@/shared/lib/api/auth'
import { useAuth } from '@/shared/contexts/auth-context'
import { hasPermission } from '@/shared/lib/permissions'
import type { RegisterMentorPayload } from '@/shared/lib/api/auth'
import type { MentorExperience } from '@/shared/lib/api/mentors'
import { YmdFilterDateInput } from '@/shared/components/filters/YmdFilterDateInput'

const PASSWORD_MIN_LENGTH = 8
const TEXTAREA_CLASS = 'form-control min-h-[5.5rem] resize-y'

function getErrorMessage(err: any): string {
  if (err instanceof AxiosError) {
    const msg = err.response?.data?.message
    if (typeof msg === 'string') return msg
    const code = err.response?.data?.code
    if (code === 400 && msg) return String(msg)
  }
  return 'Failed to create mentor.'
}

const AddMentor = () => {
  const router = useRouter()
  const auth = useAuth()
  const canManageMentors = hasPermission(auth, 'manage_training_mentors')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [experience, setExperience] = useState<MentorExperience[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: null,
        isCurrent: false,
        description: '',
      },
    ])
  }

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index))
  }

  const updateExperience = (index: number, field: keyof MentorExperience, value: unknown) => {
    const updated = [...experience]
    updated[index] = { ...updated[index], [field]: value }
    setExperience(updated)
  }

  const setExperienceCurrent = (index: number, isCurrent: boolean) => {
    const updated = [...experience]
    updated[index] = {
      ...updated[index],
      isCurrent,
      ...(isCurrent ? { endDate: null } : {}),
    }
    setExperience(updated)
  }

  const validateForm = (): string | null => {
    const trimmedName = name.trim()
    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedName) return 'Name is required.'
    if (!trimmedEmail) return 'Email is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return 'Please enter a valid email address.'
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
      return 'Password must be at least 8 characters.'
    }
    if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
      return 'Password must contain at least 1 capital letter and 1 number.'
    }
    if (password !== confirmPassword) return 'Passwords do not match.'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!canManageMentors) {
      setError('You do not have permission to create mentors.')
      return
    }

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    const trimmedName = name.trim()
    const trimmedEmail = email.trim().toLowerCase()

    const experienceArray = experience.map((exp) => ({
      title: exp.title || undefined,
      company: exp.company || undefined,
      location: exp.location || undefined,
      startDate: exp.startDate || undefined,
      endDate: exp.isCurrent ? null : exp.endDate || undefined,
      isCurrent: exp.isCurrent || false,
      description: exp.description || undefined,
    }))

    setLoading(true)

    try {
      const payload: RegisterMentorPayload = {
        name: trimmedName,
        email: trimmedEmail,
        password,
      }
      if (experienceArray.length > 0) {
        payload.experience = experienceArray
      }

      await authApi.registerMentor(payload)

      await Swal.fire({
        icon: 'success',
        title: 'Mentor created',
        text: `The mentor "${trimmedName}" has been created successfully.`,
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      })

      router.push('/training/mentors/')
    } catch (err) {
      const msg = getErrorMessage(err)
      setError(msg)
      await Swal.fire({
        icon: 'error',
        title: 'Failed to create mentor',
        text: msg,
        toast: true,
        position: 'top-end',
        timer: 4000,
        showConfirmButton: false,
        timerProgressBar: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <Seo title="Add Mentor" />
      
      <div className="container w-full max-w-full mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <div className="xl:col-span-12 col-span-12">
            <div className="box">
              <div className="box-header flex items-center justify-between flex-wrap gap-4">
                <div className="box-title">Add Mentor</div>
                <Link href="/training/mentors/" className="ti-btn ti-btn-light !py-1 !px-2 !text-[0.75rem]">
                  <i className="ri-arrow-left-line me-1"></i>Back to Mentors
                </Link>
              </div>
              <div className="box-body">
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="mb-6 p-4 bg-danger/10 border border-danger/30 text-danger rounded-md text-sm" role="alert" aria-live="polite">
                      {error}
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="mb-6">
                    <label htmlFor="mentor-name" className="form-label">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="mentor-name"
                      type="text"
                      className="form-control"
                      placeholder="e.g. Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-6">
                    <label htmlFor="mentor-email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      id="mentor-email"
                      type="email"
                      className="form-control"
                      placeholder="e.g. jane.doe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>

                  {/* Roles - Disabled with Mentor role selected */}
                  <div className="mb-6">
                    <label className="form-label">Roles</label>
                    <div className="form-control border flex items-center justify-between gap-2 text-start min-h-[2.375rem] bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-75">
                      <span>Mentor</span>
                      <i className="ri-arrow-down-s-line text-[1.25rem] shrink-0" />
                    </div>
                    <p className="text-[0.75rem] text-defaulttextcolor/70 mt-1 mb-0">
                      Mentor role is automatically assigned when creating a mentor account.
                    </p>
                  </div>

                  {/* Password */}
                  <div className="mb-6">
                    <label htmlFor="mentor-password" className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="mentor-password"
                        type={showPassword ? 'text' : 'password'}
                        className="form-control pe-10"
                        placeholder="Min 8 characters, at least 1 capital letter and 1 number"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        minLength={PASSWORD_MIN_LENGTH}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-1/2 -translate-y-1/2 end-3 p-1 text-defaulttextcolor/70 hover:text-defaulttextcolor"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        <i className={showPassword ? 'ri-eye-off-line text-[1.25rem]' : 'ri-eye-line text-[1.25rem]'} />
                      </button>
                    </div>
                    <p className="text-[0.75rem] text-defaulttextcolor/70 mt-1 mb-0">
                      Minimum 8 characters; must contain at least 1 capital letter and 1 number.
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-6">
                    <label htmlFor="mentor-confirm-password" className="form-label">
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="mentor-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="form-control pe-10"
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute top-1/2 -translate-y-1/2 end-3 p-1 text-defaulttextcolor/70 hover:text-defaulttextcolor"
                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                      >
                        <i className={showConfirmPassword ? 'ri-eye-off-line text-[1.25rem]' : 'ri-eye-line text-[1.25rem]'} />
                      </button>
                    </div>
                    <p className="text-[0.75rem] text-defaulttextcolor/70 mt-1 mb-0">
                      Must match the password above.
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-defaulttextcolor">Work Experience</h3>
                      <button type="button" onClick={addExperience} className="ti-btn ti-btn-primary">
                        <i className="ri-add-line me-1"></i>Add Experience
                      </button>
                    </div>

                    {experience.length === 0 ? (
                      <p className="text-defaulttextcolor/70 text-sm mb-4">No experience entries added.</p>
                    ) : (
                      <div className="space-y-4">
                        {experience.map((exp, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-defaulttextcolor">Experience Entry {index + 1}</h4>
                              <button
                                type="button"
                                onClick={() => removeExperience(index)}
                                className="ti-btn ti-btn-sm ti-btn-danger"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="form-label block" htmlFor={`exp-title-${index}`}>Job Title</label>
                                <input
                                  id={`exp-title-${index}`}
                                  type="text"
                                  className="form-control"
                                  placeholder="e.g. Senior Engineer"
                                  value={exp.title || ''}
                                  onChange={(e) => updateExperience(index, 'title', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="form-label block" htmlFor={`exp-company-${index}`}>Company</label>
                                <input
                                  id={`exp-company-${index}`}
                                  type="text"
                                  className="form-control"
                                  placeholder="e.g. Acme Corp"
                                  value={exp.company || ''}
                                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                />
                              </div>
                              <div className="lg:col-span-2">
                                <label className="form-label block" htmlFor={`exp-location-${index}`}>Location</label>
                                <input
                                  id={`exp-location-${index}`}
                                  type="text"
                                  className="form-control"
                                  placeholder="e.g. Bengaluru, India"
                                  value={exp.location || ''}
                                  onChange={(e) => updateExperience(index, 'location', e.target.value)}
                                />
                              </div>
                              <div>
                                <YmdFilterDateInput
                                  label="Start Date"
                                  value={exp.startDate || ''}
                                  onCommit={(v) => updateExperience(index, 'startDate', v)}
                                  variant="form"
                                  labelClassName="form-label block"
                                  inputId={`exp-start-${index}`}
                                />
                              </div>
                              <div>
                                <YmdFilterDateInput
                                  label="End Date"
                                  value={exp.endDate || ''}
                                  onCommit={(v) => updateExperience(index, 'endDate', v || null)}
                                  variant="form"
                                  labelClassName="form-label block"
                                  inputId={`exp-end-${index}`}
                                  disabled={!!exp.isCurrent}
                                />
                                <label className="flex items-center gap-2 cursor-pointer mt-2">
                                  <input
                                    type="checkbox"
                                    checked={exp.isCurrent || false}
                                    onChange={(e) => setExperienceCurrent(index, e.target.checked)}
                                    className="form-check-input"
                                  />
                                  <span className="text-sm text-defaulttextcolor">Current</span>
                                </label>
                              </div>
                              <div className="lg:col-span-2">
                                <label className="form-label block" htmlFor={`exp-desc-${index}`}>Description</label>
                                <textarea
                                  id={`exp-desc-${index}`}
                                  className={TEXTAREA_CLASS}
                                  placeholder="Describe responsibilities and impact"
                                  rows={3}
                                  value={exp.description || ''}
                                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="submit"
                      className="ti-btn ti-btn-primary"
                      disabled={loading || !canManageMentors}
                    >
                      {loading ? 'Adding...' : 'Add Mentor'}
                    </button>
                    <Link href="/training/mentors/" className="ti-btn ti-btn-light">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default AddMentor
