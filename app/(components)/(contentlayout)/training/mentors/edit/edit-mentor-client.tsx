"use client"

import React, { Fragment, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Seo from '@/shared/layout-components/seo/seo'
import Swal from 'sweetalert2'
import { AxiosError } from 'axios'
import * as mentorsApi from '@/shared/lib/api/mentors'
import * as usersApi from '@/shared/lib/api/users'
import type { Mentor, MentorExpertise, MentorExperience, MentorAddress, MentorCertification } from '@/shared/lib/api/mentors'
import { PhoneCountrySelect } from '@/shared/components/PhoneCountrySelect'
import { YmdFilterDateInput } from '@/shared/components/filters/YmdFilterDateInput'
import {
  DEFAULT_PHONE_COUNTRY,
  formatPhoneForApi,
  getPhoneCountry,
  parseStoredPhone,
} from '@/shared/lib/phoneCountries'
import { formatYmdLocal } from '@/shared/lib/leave-date-range'
import { useAuth } from '@/shared/contexts/auth-context'
import { hasPermission } from '@/shared/lib/permissions'

const TEXTAREA_CLASS = 'form-control min-h-[5.5rem] resize-y'
const BIO_TEXTAREA_CLASS = 'form-control min-h-[7.5rem] resize-y'

function getErrorMessage(err: any): string {
  if (err instanceof AxiosError) {
    const msg = err.response?.data?.message
    if (typeof msg === 'string') return msg
    const code = err.response?.data?.code
    if (code === 400 && msg) return String(msg)
  }
  return 'Failed to update mentor.'
}

/** Prefer YYYY-MM-DD prefix so UTC midnight does not shift the calendar day. */
function toYmd(value: string | null | undefined): string {
  if (!value) return ''
  const trimmed = String(value).trim()
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) return trimmed.slice(0, 10)
  const d = new Date(trimmed)
  if (Number.isNaN(d.getTime())) return ''
  return formatYmdLocal(d)
}

const EditMentorClient = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const auth = useAuth()
  const canManageMentors = hasPermission(auth, 'manage_training_mentors')
  const mentorId = searchParams.get('id') ?? ''

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [phoneCountryCode, setPhoneCountryCode] = useState(DEFAULT_PHONE_COUNTRY)
  const [phoneDigits, setPhoneDigits] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('')
  const [address, setAddress] = useState<MentorAddress>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  })
  const [expertise, setExpertise] = useState<MentorExpertise[]>([])
  const [experience, setExperience] = useState<MentorExperience[]>([])
  const [certifications, setCertifications] = useState<MentorCertification[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [currentSkill, setCurrentSkill] = useState('')
  const [skillError, setSkillError] = useState('')
  const [bio, setBio] = useState('')
  const [status, setStatus] = useState<string>('active')

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [userId, setUserId] = useState<string>('')

  const loadMentor = useCallback(async () => {
    if (!mentorId) return
    setFetching(true)
    setLoadError(null)
    setError('')
    try {
      const mentor = await mentorsApi.getMentor(mentorId)
      setUserId(mentor.user?.id ?? '')
      setName(mentor.user?.name ?? '')
      setEmail(mentor.user?.email ?? '')

      const parsedPhone = parseStoredPhone(mentor.phone)
      setPhoneCountryCode(parsedPhone.countryCode || DEFAULT_PHONE_COUNTRY)
      setPhoneDigits(parsedPhone.digits)
      setDateOfBirth(toYmd(mentor.dateOfBirth))
      setGender((mentor.gender as 'male' | 'female' | 'other') ?? '')
      setAddress({
        street: mentor.address?.street ?? '',
        city: mentor.address?.city ?? '',
        state: mentor.address?.state ?? '',
        zipCode: mentor.address?.zipCode ?? '',
        country: mentor.address?.country ?? '',
      })
      setExpertise(mentor.expertise ?? [])
      setExperience(
        (mentor.experience ?? []).map((exp) => ({
          ...exp,
          startDate: toYmd(exp.startDate),
          endDate: exp.endDate ? toYmd(exp.endDate) : null,
        }))
      )
      setCertifications(
        (mentor.certifications ?? []).map((cert) => ({
          ...cert,
          issueDate: toYmd(cert.issueDate),
          expiryDate: toYmd(cert.expiryDate),
        }))
      )
      setSkills(mentor.skills ?? [])
      setBio(mentor.bio ?? '')
      setStatus(mentor.status ?? 'active')
    } catch (err) {
      setLoadError(getErrorMessage(err))
    } finally {
      setFetching(false)
    }
  }, [mentorId])

  useEffect(() => {
    if (!mentorId) {
      router.replace('/training/mentors/')
      return
    }
    void loadMentor()
  }, [mentorId, router, loadMentor])

  const addExpertise = () => {
    setExpertise([
      ...expertise,
      {
        area: '',
        level: '',
        yearsOfExperience: undefined,
        description: '',
      },
    ])
  }

  const removeExpertise = (index: number) => {
    setExpertise(expertise.filter((_, i) => i !== index))
  }

  const updateExpertise = (index: number, field: keyof MentorExpertise, value: any) => {
    const updated = [...expertise]
    updated[index] = { ...updated[index], [field]: value }
    setExpertise(updated)
  }

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

  const updateExperience = (index: number, field: keyof MentorExperience, value: any) => {
    const updated = [...experience]
    updated[index] = { ...updated[index], [field]: value }
    setExperience(updated)
  }

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        credentialUrl: '',
      },
    ])
  }

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index))
  }

  const updateCertification = (index: number, field: keyof MentorCertification, value: any) => {
    const updated = [...certifications]
    updated[index] = { ...updated[index], [field]: value }
    setCertifications(updated)
  }

  const addSkill = () => {
    const trimmed = currentSkill.trim()
    if (!trimmed) {
      setSkillError('Please enter a skill.')
      return
    }
    if (skills.includes(trimmed)) {
      setSkillError('That skill is already added.')
      return
    }
    setSkills([...skills, trimmed])
    setCurrentSkill('')
    setSkillError('')
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!canManageMentors) {
      setError('You do not have permission to update mentors.')
      return
    }

    if (loadError || !userId) {
      setError('Mentor data is not loaded.')
      return
    }

    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('Name is required.')
      return
    }

    const incompleteCert = certifications.find(
      (c) => (c.name.trim() || c.issuer.trim()) && (!c.name.trim() || !c.issuer.trim())
    )
    if (incompleteCert) {
      setError('Each certification needs both a name and an issuing organization.')
      return
    }

    setLoading(true)

    try {
      if (userId) {
        await usersApi.updateUser(userId, {
          name: trimmedName,
        })
      }

      const expertiseArray = expertise.map((exp) => ({
        ...exp,
        yearsOfExperience: exp.yearsOfExperience || undefined,
      }))

      const experienceArray = experience.map((exp) => ({
        ...exp,
        startDate: exp.startDate || undefined,
        endDate: exp.isCurrent ? null : exp.endDate || undefined,
        isCurrent: exp.isCurrent || false,
      }))

      const certificationsArray = certifications
        .filter((cert) => cert.name.trim() && cert.issuer.trim())
        .map((cert) => ({
          name: cert.name.trim(),
          issuer: cert.issuer.trim(),
          ...(cert.issueDate && { issueDate: cert.issueDate }),
          ...(cert.expiryDate && { expiryDate: cert.expiryDate }),
          ...(cert.credentialId && { credentialId: cert.credentialId }),
          ...(cert.credentialUrl && { credentialUrl: cert.credentialUrl }),
        }))

      const addressData: MentorAddress | undefined =
        address.street || address.city || address.state || address.zipCode || address.country
          ? {
              ...(address.street && { street: address.street }),
              ...(address.city && { city: address.city }),
              ...(address.state && { state: address.state }),
              ...(address.zipCode && { zipCode: address.zipCode }),
              ...(address.country && { country: address.country }),
            }
          : undefined

      const digits = phoneDigits.replace(/\D/g, '')
      const phoneValue = digits ? formatPhoneForApi(digits, phoneCountryCode) : ''

      await mentorsApi.updateMentor(mentorId, {
        phone: phoneValue,
        dateOfBirth: dateOfBirth || undefined,
        gender: gender || undefined,
        ...(addressData && { address: addressData }),
        expertise: expertiseArray,
        experience: experienceArray,
        certifications: certificationsArray,
        skills,
        bio: bio.trim(),
        status,
      })

      await Swal.fire({
        icon: 'success',
        title: 'Mentor updated',
        text: `The mentor "${trimmedName}" has been updated successfully.`,
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
        title: 'Failed to update mentor',
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

  if (!mentorId) {
    return (
      <Fragment>
        <Seo title="Edit Mentor" />
        <div className="container w-full max-w-full mx-auto">
          <div className="box">
            <div className="box-body py-12 text-center text-defaulttextcolor/70">Missing mentor ID. Redirecting...</div>
          </div>
        </div>
      </Fragment>
    )
  }

  if (fetching && !name && !email && !loadError) {
    return (
      <Fragment>
        <Seo title="Edit Mentor" />
        <div className="container w-full max-w-full mx-auto">
          <div className="box">
            <div className="box-body py-12 text-center text-defaulttextcolor/70">Loading mentor...</div>
          </div>
        </div>
      </Fragment>
    )
  }

  if (loadError) {
    return (
      <Fragment>
        <Seo title="Edit Mentor" />
        <div className="container w-full max-w-full mx-auto">
          <div className="box">
            <div className="box-header flex items-center justify-between flex-wrap gap-4">
              <div className="box-title">Edit Mentor</div>
              <Link href="/training/mentors/" className="ti-btn ti-btn-light !py-1 !px-2 !text-[0.75rem]">
                <i className="ri-arrow-left-line me-1"></i>Back to Mentors
              </Link>
            </div>
            <div className="box-body py-12 text-center">
              <i className="ri-error-warning-line text-4xl text-danger mb-3" aria-hidden="true" />
              <p className="text-danger mb-4">{loadError}</p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  className="ti-btn ti-btn-sm ti-btn-danger"
                  onClick={() => { void loadMentor() }}
                >
                  Retry
                </button>
                <Link href="/training/mentors/" className="ti-btn ti-btn-sm ti-btn-light">
                  Back to Mentors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

  const phoneCfg = getPhoneCountry(phoneCountryCode)

  return (
    <Fragment>
      <Seo title="Edit Mentor" />

      <div className="container w-full max-w-full mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <div className="xl:col-span-12 col-span-12">
            <div className="box">
              <div className="box-header flex items-center justify-between flex-wrap gap-4">
                <div className="box-title">Edit Mentor</div>
                <Link href="/training/mentors/" className="ti-btn ti-btn-light !py-1 !px-2 !text-[0.75rem]">
                  <i className="ri-arrow-left-line me-1"></i>Back to Mentors
                </Link>
              </div>
              <div className="box-body">
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="mb-6 p-4 bg-danger/10 border border-danger/30 text-danger rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-defaulttextcolor">User Information</h3>

                    <div className="mb-6">
                      <label htmlFor="mentor-name" className="form-label block">
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

                    <div className="mb-6">
                      <label htmlFor="mentor-email" className="form-label block">
                        Email
                      </label>
                      <input
                        id="mentor-email"
                        type="email"
                        className="form-control bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                        placeholder="e.g. jane.doe@example.com"
                        value={email}
                        disabled
                        readOnly
                      />
                      <p className="text-[0.75rem] text-defaulttextcolor/70 mt-1 mb-0">
                        Email cannot be changed.
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-defaulttextcolor">Personal Information</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="mentor-phone" className="form-label block">
                          Phone
                        </label>
                        <div className="flex gap-2">
                          <PhoneCountrySelect
                            value={phoneCountryCode}
                            onChange={setPhoneCountryCode}
                            id="mentor-phone-country"
                          />
                          <input
                            id="mentor-phone"
                            type="tel"
                            className="form-control flex-1"
                            placeholder={phoneCfg.placeholder}
                            value={phoneDigits}
                            maxLength={phoneCfg.maxLength}
                            onChange={(e) =>
                              setPhoneDigits(e.target.value.replace(/\D/g, '').slice(0, phoneCfg.maxLength))
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <YmdFilterDateInput
                          label="Date of Birth"
                          value={dateOfBirth}
                          onCommit={setDateOfBirth}
                          variant="form"
                          labelClassName="form-label block"
                          inputId="mentor-date-of-birth"
                          maxDate={formatYmdLocal(new Date())}
                        />
                      </div>
                      <div>
                        <label htmlFor="mentor-gender" className="form-label block">
                          Gender
                        </label>
                        <select
                          id="mentor-gender"
                          className="form-control"
                          value={gender}
                          onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other' | '')}
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="mentor-status" className="form-label block">
                          Status
                        </label>
                        <select
                          id="mentor-status"
                          className="form-control"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-defaulttextcolor">Address</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="lg:col-span-2">
                        <label htmlFor="mentor-street" className="form-label block">Street</label>
                        <input
                          id="mentor-street"
                          type="text"
                          className="form-control"
                          placeholder="e.g. 123 Main St"
                          value={address.street}
                          onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="mentor-city" className="form-label block">City</label>
                        <input
                          id="mentor-city"
                          type="text"
                          className="form-control"
                          placeholder="e.g. Mumbai"
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="mentor-state" className="form-label block">State</label>
                        <input
                          id="mentor-state"
                          type="text"
                          className="form-control"
                          placeholder="e.g. Maharashtra"
                          value={address.state}
                          onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="mentor-zip" className="form-label block">Zip Code</label>
                        <input
                          id="mentor-zip"
                          type="text"
                          className="form-control"
                          placeholder="e.g. 400001"
                          value={address.zipCode}
                          onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="mentor-country" className="form-label block">Country</label>
                        <input
                          id="mentor-country"
                          type="text"
                          className="form-control"
                          placeholder="e.g. India"
                          value={address.country}
                          onChange={(e) => setAddress({ ...address, country: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-defaulttextcolor">Expertise</h3>
                      <button type="button" onClick={addExpertise} className="ti-btn ti-btn-primary">
                        <i className="ri-add-line me-1"></i>Add Expertise
                      </button>
                    </div>

                    {expertise.length === 0 ? (
                      <p className="text-defaulttextcolor/70 text-sm mb-4">No expertise entries added.</p>
                    ) : (
                      <div className="space-y-4">
                        {expertise.map((exp, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-defaulttextcolor">Expertise Entry {index + 1}</h4>
                              <button
                                type="button"
                                onClick={() => removeExpertise(index)}
                                className="ti-btn ti-btn-sm ti-btn-danger"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="form-label block" htmlFor={`expertise-area-${index}`}>Area</label>
                                <input
                                  id={`expertise-area-${index}`}
                                  type="text"
                                  className="form-control"
                                  placeholder="e.g. Software Development"
                                  value={exp.area || ''}
                                  onChange={(e) => updateExpertise(index, 'area', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="form-label block" htmlFor={`expertise-level-${index}`}>Level</label>
                                <input
                                  id={`expertise-level-${index}`}
                                  type="text"
                                  className="form-control"
                                  placeholder="e.g. Expert, Advanced"
                                  value={exp.level || ''}
                                  onChange={(e) => updateExpertise(index, 'level', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="form-label block" htmlFor={`expertise-years-${index}`}>Years of Experience</label>
                                <input
                                  id={`expertise-years-${index}`}
                                  type="number"
                                  className="form-control"
                                  placeholder="e.g. 5"
                                  value={exp.yearsOfExperience || ''}
                                  onChange={(e) =>
                                    updateExpertise(
                                      index,
                                      'yearsOfExperience',
                                      e.target.value ? parseInt(e.target.value, 10) : undefined
                                    )
                                  }
                                />
                              </div>
                              <div className="lg:col-span-2">
                                <label className="form-label block" htmlFor={`expertise-desc-${index}`}>Description</label>
                                <textarea
                                  id={`expertise-desc-${index}`}
                                  className={TEXTAREA_CLASS}
                                  placeholder="Brief description of this expertise"
                                  rows={3}
                                  value={exp.description || ''}
                                  onChange={(e) => updateExpertise(index, 'description', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
                                    onChange={(e) => {
                                      updateExperience(index, 'isCurrent', e.target.checked)
                                      if (e.target.checked) {
                                        updateExperience(index, 'endDate', null)
                                      }
                                    }}
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

                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-defaulttextcolor">Certifications</h3>
                      <button type="button" onClick={addCertification} className="ti-btn ti-btn-primary">
                        <i className="ri-add-line me-1"></i>Add Certification
                      </button>
                    </div>

                    {certifications.length === 0 ? (
                      <p className="text-defaulttextcolor/70 text-sm mb-4">No certifications added.</p>
                    ) : (
                      <div className="space-y-4">
                        {certifications.map((cert, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-defaulttextcolor">Certification {index + 1}</h4>
                              <button
                                type="button"
                                onClick={() => removeCertification(index)}
                                className="ti-btn ti-btn-sm ti-btn-danger"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <label className="form-label block" htmlFor={`cert-name-${index}`}>
                                  Certification Name <span className="text-danger">*</span>
                                </label>
                                <input
                                  id={`cert-name-${index}`}
                                  type="text"
                                  className="form-control"
                                  placeholder="e.g. AWS Solutions Architect"
                                  value={cert.name}
                                  onChange={(e) => updateCertification(index, 'name', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="form-label block" htmlFor={`cert-issuer-${index}`}>
                                  Issuing Organization <span className="text-danger">*</span>
                                </label>
                                <input
                                  id={`cert-issuer-${index}`}
                                  type="text"
                                  className="form-control"
                                  placeholder="e.g. Amazon Web Services"
                                  value={cert.issuer}
                                  onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                                />
                              </div>
                              <div>
                                <YmdFilterDateInput
                                  label="Issue Date"
                                  value={cert.issueDate || ''}
                                  onCommit={(v) => updateCertification(index, 'issueDate', v)}
                                  variant="form"
                                  labelClassName="form-label block"
                                  inputId={`cert-issue-${index}`}
                                />
                              </div>
                              <div>
                                <YmdFilterDateInput
                                  label="Expiry Date"
                                  value={cert.expiryDate || ''}
                                  onCommit={(v) => updateCertification(index, 'expiryDate', v)}
                                  variant="form"
                                  labelClassName="form-label block"
                                  inputId={`cert-expiry-${index}`}
                                />
                              </div>
                              <div>
                                <label className="form-label block" htmlFor={`cert-id-${index}`}>Credential ID</label>
                                <input
                                  id={`cert-id-${index}`}
                                  type="text"
                                  className="form-control"
                                  placeholder="Optional credential ID"
                                  value={cert.credentialId || ''}
                                  onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="form-label block" htmlFor={`cert-url-${index}`}>Credential URL</label>
                                <input
                                  id={`cert-url-${index}`}
                                  type="url"
                                  className="form-control"
                                  placeholder="https://..."
                                  value={cert.credentialUrl || ''}
                                  onChange={(e) => updateCertification(index, 'credentialUrl', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-defaulttextcolor">Skills</h3>
                    <label htmlFor="mentor-skill-input" className="form-label block">Add a skill</label>
                    <div className="flex gap-2 mb-1">
                      <input
                        id="mentor-skill-input"
                        type="text"
                        className="form-control"
                        placeholder="e.g. Mentoring, React"
                        value={currentSkill}
                        onChange={(e) => {
                          setCurrentSkill(e.target.value)
                          if (skillError) setSkillError('')
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addSkill()
                          }
                        }}
                      />
                      <button type="button" onClick={addSkill} className="ti-btn ti-btn-primary">
                        <i className="ri-add-line me-1"></i>Add
                      </button>
                    </div>
                    {skillError && (
                      <p className="text-danger text-sm mb-2" role="alert">
                        {skillError}
                      </p>
                    )}
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="badge bg-primary/10 text-primary border border-primary/30 px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(index)}
                              className="text-primary hover:text-primary/70"
                              aria-label={`Remove ${skill}`}
                            >
                              <i className="ri-close-line"></i>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mb-8">
                    <label htmlFor="mentor-bio" className="form-label block">
                      Bio
                    </label>
                    <textarea
                      id="mentor-bio"
                      className={BIO_TEXTAREA_CLASS}
                      placeholder="Enter mentor biography..."
                      rows={5}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="submit"
                      className="ti-btn ti-btn-primary"
                      disabled={loading || !canManageMentors || !!loadError || !userId}
                    >
                      {loading ? 'Updating...' : 'Update Mentor'}
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

export default EditMentorClient
