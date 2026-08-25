"use client";

import { apiClient } from "@/shared/lib/api/client";
import type { ActivityLogsListResponse } from "@/shared/lib/types";

export interface ListActivityLogsParams {
  actor?: string;
  action?: string;
  entityType?: string;
  entityId?: string;
  startDate?: string;
  endDate?: string;
  /** Exact or prefix match on stored client IP (IPv4 / IPv6-safe string). */
  ip?: string;
  /** Case-insensitive substring on action, entityType, entityId (and IP when q looks IP-like). */
  q?: string;
  /** When true, include noisy attendance.* actions (default on API excludes them). */
  includeAttendance?: boolean;
  sortBy?: string;
  limit?: number;
  page?: number;
}

export type ExportActivityLogsParams = Omit<
  ListActivityLogsParams,
  "sortBy" | "limit" | "page"
>;

/**
 * List activity logs (GET /v1/activity-logs).
 * Backend requires activityLogs.read or activity.read (or platform super user).
 */
export async function listActivityLogs(
  params?: ListActivityLogsParams
): Promise<ActivityLogsListResponse> {
  const { data } = await apiClient.get<ActivityLogsListResponse>("/activity-logs", {
    params,
  });
  return data;
}

/**
 * Download CSV for all rows matching filters (GET /v1/activity-logs/export), up to server cap.
 * Platform audit console only (designated superadmin).
 */
export async function exportActivityLogsCsv(params?: ExportActivityLogsParams): Promise<Blob> {
  const { data } = await apiClient.get<Blob>("/activity-logs/export", {
    params,
    responseType: "blob",
  });
  return data;
}

/**
 * Download Excel for all rows matching filters (GET /v1/activity-logs/export/excel).
 * Same RBAC/scope as the Activity Logs list (not Platform Audit).
 */
export async function downloadActivityLogsExcel(
  params?: ExportActivityLogsParams
): Promise<void> {
  const { data } = await apiClient.get<Blob>("/activity-logs/export/excel", {
    params,
    responseType: "blob",
  });
  const dateStamp = new Date().toISOString().slice(0, 10);
  const url = URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = `activity-logs-${dateStamp}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
}
