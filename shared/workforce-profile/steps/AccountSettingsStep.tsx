"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import * as authApi from "@/shared/lib/api/auth";
import type { NotificationPreferences } from "@/shared/lib/api/users";
import { DEFAULT_NOTIFICATION_PREFS } from "@/shared/lib/notification-pref-groups";
import { useAuth } from "@/shared/contexts/auth-context";
import { useHasEmployeeRole } from "@/shared/hooks/use-has-employee-role";
import { NotificationPreferencesEditor } from "@/shared/components/NotificationPreferencesEditor";
import { ChangePasswordButton } from "@/shared/components/ChangePasswordButton";
import { ForgotPasswordButton } from "@/shared/components/ForgotPasswordButton";
import styles from "./qualification-step.module.css";

function extractErrorMessage(err: unknown): string {
  if (err instanceof AxiosError && err.response?.data?.message) {
    const m = err.response.data.message;
    return Array.isArray(m) ? m.map(String).join(", ") : String(m);
  }
  return "Something went wrong. Please try again.";
}

export function AccountSettingsStep() {
  const { user, logout, refreshUser } = useAuth();
  const { hasEmployeeProfile } = useHasEmployeeRole();
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>(DEFAULT_NOTIFICATION_PREFS);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!user) return;
    const prefs = (user as { notificationPreferences?: NotificationPreferences }).notificationPreferences;
    if (prefs && typeof prefs === "object") {
      setNotificationPrefs({ ...DEFAULT_NOTIFICATION_PREFS, ...prefs });
    }
  }, [user]);

  const handleSaveNotifications = async () => {
    setSaving(true);
    try {
      if (hasEmployeeProfile) {
        await authApi.updateMeWithCandidate({ notificationPreferences: notificationPrefs });
      } else {
        await authApi.updateMyProfile({ notificationPreferences: notificationPrefs });
      }
      await refreshUser();
      await Swal.fire({
        icon: "success",
        title: "Notification preferences saved",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2800,
        timerProgressBar: true,
      });
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Couldn't save preferences",
        text: extractErrorMessage(err),
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className={styles.step}>
      <p className={styles.sectionEyebrow}>06</p>
      <div className={styles.sectionHead}>
        <div className={styles.sectionTitle}>Account Setting :</div>
        <button
          type="button"
          onClick={handleSaveNotifications}
          disabled={saving}
          className="ti-btn ti-btn-sm ti-btn-primary !w-auto !h-auto whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {saving ? "Saving…" : "Save notification preferences"}
        </button>
      </div>

      <NotificationPreferencesEditor value={notificationPrefs} onChange={setNotificationPrefs} defaultOpen />

      <div className="box overflow-hidden mt-4">
        <div className="box-body !p-0">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-2">
              <ChangePasswordButton />
              <ForgotPasswordButton />
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="ti-btn ti-btn-sm ti-btn-soft-danger !w-auto !h-auto whitespace-nowrap inline-flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <i className="ri-logout-circle-line me-1 align-middle inline-block" />
                {loggingOut ? "Logging out…" : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
