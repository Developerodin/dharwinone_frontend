"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import * as authApi from "@/shared/lib/api/auth";
import { useAuth } from "@/shared/contexts/auth-context";

type Props = {
  className?: string;
  email?: string;
};

function extractErrorMessage(err: unknown): string {
  if (err instanceof AxiosError) {
    if (err.response?.status === 400) return "Please enter a valid email address.";
    if (err.response?.data?.message) {
      const m = err.response.data.message;
      return Array.isArray(m) ? m.map(String).join(", ") : String(m);
    }
  }
  return "We could not send a reset link. Please try again later.";
}

export function ForgotPasswordButton({ className, email: emailProp }: Props) {
  const { user } = useAuth();
  const email = emailProp ?? user?.email ?? "";
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      await Swal.fire({
        icon: "error",
        title: "Email not available",
        text: "We could not find your email address. Please try again later.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
      });
      return;
    }

    setLoading(true);
    try {
      await authApi.forgotPassword({ email: trimmedEmail });
      await Swal.fire({
        icon: "success",
        title: "Password reset link sent to your email",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2800,
        timerProgressBar: true,
      });
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Request failed",
        text: extractErrorMessage(err),
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={
        className ??
        "ti-btn ti-btn-sm ti-btn-light !w-auto !h-auto whitespace-nowrap inline-flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
      }
    >
      <i className="ri-mail-send-line me-1 align-middle inline-block" />
      {loading ? "Sending…" : "Forgot password"}
    </button>
  );
}
