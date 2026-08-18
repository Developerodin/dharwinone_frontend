"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import * as authApi from "@/shared/lib/api/auth";

const PASSWORD_MIN_LENGTH = 8;

function validateNewPassword(password: string): string | null {
  if (password.length < PASSWORD_MIN_LENGTH) return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) return "Password must contain at least one letter and one number.";
  return null;
}

type Props = {
  className?: string;
};

export function ChangePasswordButton({ className }: Props) {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setOpen(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
  };

  const closeModal = () => {
    if (!loading) setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!currentPassword.trim()) {
      setError("Current password is required.");
      return;
    }
    const validation = validateNewPassword(newPassword);
    if (validation) {
      setError(validation);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await authApi.changePassword(currentPassword.trim(), newPassword);
      setSuccess("Your password has been updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setOpen(false);
        setSuccess("");
      }, 1500);
    } catch (err) {
      const status = err instanceof AxiosError ? err.response?.status : 0;
      const msg =
        err instanceof AxiosError && err.response?.data?.message
          ? String(err.response.data.message)
          : status === 401
            ? "Current password is incorrect."
            : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={className ?? "ti-btn ti-btn-sm ti-btn-light !w-auto !h-auto whitespace-nowrap inline-flex items-center"}
      >
        <i className="ri-lock-password-line me-1 align-middle inline-block" />Change password
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="change-password-title"
          onClick={closeModal}
        >
          <div
            className="ti-modal-box w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-defaultborder"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ti-modal-header flex items-center justify-between px-4 py-3 border-b border-defaultborder">
              <h6 id="change-password-title" className="modal-title text-[1rem] font-semibold mb-0">
                Change password
              </h6>
              <button
                type="button"
                onClick={closeModal}
                className="!text-[1.25rem] !font-semibold text-defaulttextcolor hover:text-default"
                aria-label="Close"
                disabled={loading}
              >
                <i className="ri-close-line" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="ti-modal-body px-4 py-4">
              {error && (
                <div className="mb-4 p-3 bg-danger/10 border border-danger/30 text-danger rounded-md text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-success/10 border border-success/30 text-success rounded-md text-sm">
                  {success}
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="change-current-password" className="form-label !text-[0.8125rem]">Current password</label>
                <div className="input-group">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    id="change-current-password"
                    className="form-control !rounded-e-none"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => { setCurrentPassword(e.target.value); setError(""); }}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="ti-btn ti-btn-light !rounded-s-none"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    aria-label={showCurrentPassword ? "Hide" : "Show"}
                  >
                    <i className={showCurrentPassword ? "ri-eye-off-line" : "ri-eye-line"} />
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="change-new-password" className="form-label !text-[0.8125rem]">New password</label>
                <div className="input-group">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="change-new-password"
                    className="form-control !rounded-e-none"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
                    autoComplete="new-password"
                    required
                    minLength={PASSWORD_MIN_LENGTH}
                  />
                  <button
                    type="button"
                    className="ti-btn ti-btn-light !rounded-s-none"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    aria-label={showNewPassword ? "Hide" : "Show"}
                  >
                    <i className={showNewPassword ? "ri-eye-off-line" : "ri-eye-line"} />
                  </button>
                </div>
                <p className="text-[0.75rem] text-defaulttextcolor/70 mt-1 mb-0">Min 8 characters, at least one letter and one number.</p>
              </div>
              <div className="mb-4">
                <label htmlFor="change-confirm-password" className="form-label !text-[0.8125rem]">Confirm new password</label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="change-confirm-password"
                    className="form-control !rounded-e-none"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="ti-btn ti-btn-light !rounded-s-none"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide" : "Show"}
                  >
                    <i className={showConfirmPassword ? "ri-eye-off-line" : "ri-eye-line"} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="ti-btn ti-btn-light"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" className="ti-btn ti-btn-primary" disabled={loading}>
                  {loading ? "Updating…" : "Update password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
