"use client"

import React from 'react'
import { closeHsOverlay } from '../../evaluation/_components/evaluation-overlay'

const ALLOWED_PROFILE_IMAGE_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
const MAX_PROFILE_IMAGE_BYTES = 5 * 1024 * 1024

function dismissProfileImageModal(onClose: () => void) {
  closeHsOverlay('#mentor-profile-image-modal')
  onClose()
}

export interface MentorProfileImageModalMentor {
  id: string
  name: string
}

export interface MentorProfileImageModalProps {
  mentor: MentorProfileImageModalMentor | null
  profileImageUrl: string | null
  profileImageLoading: boolean
  profileImageUploading: boolean
  profileImageError: string | null
  onClose: () => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function MentorProfileImageModal({
  mentor,
  profileImageUrl,
  profileImageLoading,
  profileImageUploading,
  profileImageError,
  onClose,
  onFileChange,
}: MentorProfileImageModalProps) {
  const [localError, setLocalError] = React.useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!ALLOWED_PROFILE_IMAGE_TYPES.has(file.type)) {
      setLocalError('Please choose a PNG, JPG, or WEBP image.')
      e.target.value = ''
      return
    }
    if (file.size > MAX_PROFILE_IMAGE_BYTES) {
      setLocalError('Image must be 5 MB or smaller.')
      e.target.value = ''
      return
    }
    setLocalError(null)
    onFileChange(e)
  }
  return (
    <div
      id="mentor-profile-image-modal"
      className="hs-overlay hidden ti-modal"
      tabIndex={-1}
    >
      <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
        <div className="ti-modal-content">
          <div className="ti-modal-header">
            <h6 className="modal-title text-[1rem] font-semibold text-defaulttextcolor dark:text-white/90">
              {mentor
                ? `Profile Image – ${mentor.name}`
                : 'Profile Image'}
            </h6>
            <button
              type="button"
              className="hs-dropdown-toggle !text-[1rem] !font-semibold"
              data-hs-overlay="#mentor-profile-image-modal"
              onClick={() => dismissProfileImageModal(onClose)}
            >
              <span className="sr-only">Close</span>
              <i className="ri-close-line"></i>
            </button>
          </div>
          <div className="ti-modal-body px-6 space-y-4">
            {profileImageLoading ? (
              <p className="text-sm text-defaulttextcolor/70 mb-0">
                Loading current profile image...
              </p>
            ) : profileImageUrl ? (
              <div className="flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profileImageUrl}
                  alt={mentor?.name || 'Profile image'}
                  className="w-24 h-24 rounded-full object-cover border border-defaultborder"
                />
                <p className="text-xs text-defaulttextcolor/60 mb-0">
                  This preview URL is temporary and may expire; refresh to get a new one.
                </p>
              </div>
            ) : (
              <p className="text-sm text-defaulttextcolor/70 mb-0">
                No profile image has been uploaded for this mentor yet.
              </p>
            )}

            {(profileImageError || localError) && (
              <div className="p-2 rounded border border-danger/20 bg-danger/5 text-danger text-xs">
                {profileImageError || localError}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="mentor-profile-image-file"
                className="form-label text-sm font-medium"
              >
                {profileImageUrl ? 'Change picture' : 'Add picture'}
              </label>
              <input
                id="mentor-profile-image-file"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="form-control"
                onChange={handleFileChange}
                disabled={profileImageUploading || !mentor}
              />
              <p className="text-[0.75rem] text-defaulttextcolor/70 mt-1 mb-0">
                Allowed types: PNG, JPG, JPEG, WEBP. Maximum size 5 MB.
              </p>
              {profileImageUploading && (
                <p className="text-[0.75rem] text-primary mt-1 mb-0">
                  Uploading profile image...
                </p>
              )}
            </div>
          </div>
          <div className="ti-modal-footer">
            <button
              type="button"
              className="ti-btn ti-btn-light align-middle"
              data-hs-overlay="#mentor-profile-image-modal"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
