"use client";

import { apiClient } from "@/shared/lib/api/client";
import type { ExternalJobSource } from "@/shared/lib/api/external-jobs";

export type AutoFetchFrequencyMinutes = 60 | 360 | 720 | 1440;
export type AutoFetchPostedRange = "24h" | "7d";
export type AutoFetchRunStatus = "running" | "completed" | "failed" | "partial";

export interface AutoFetchLastRun {
  status: AutoFetchRunStatus;
  trigger: "scheduled" | "manual";
  startedAt: string;
  completedAt: string | null;
  stats: {
    fetched: number;
    created: number;
    updated: number;
    staleArchived: number;
    queriesRun: number;
    queriesFailed: number;
  };
  errorMessage: string | null;
}

export interface AutoFetchConfig {
  id: string;
  titles: string[];
  locations: string[];
  source: ExternalJobSource;
  postedRange: AutoFetchPostedRange;
  remoteOnly: boolean;
  frequencyMinutes: AutoFetchFrequencyMinutes;
  enabled: boolean;
  lastRunAt: string | null;
  lastRunStatus: "never" | AutoFetchRunStatus;
  queryCount: number;
  nextRunAt: string | null;
  lastRun: AutoFetchLastRun | null;
}

export interface AutoFetchConfigInput {
  titles?: string[];
  locations?: string[];
  source?: ExternalJobSource;
  postedRange?: AutoFetchPostedRange;
  remoteOnly?: boolean;
  frequencyMinutes?: AutoFetchFrequencyMinutes;
  enabled?: boolean;
}

export interface AutoFetchRunRecord {
  id: string;
  trigger: "scheduled" | "manual";
  status: AutoFetchRunStatus;
  startedAt: string;
  completedAt: string | null;
  stats: AutoFetchLastRun["stats"];
  errorMessage: string | null;
  failedQueries: { title: string; location: string; error: string }[];
}

export async function getAutoFetchConfig(): Promise<AutoFetchConfig> {
  const { data } = await apiClient.get<AutoFetchConfig>("/external-jobs/auto-fetch");
  return data;
}

export async function saveAutoFetchConfig(input: AutoFetchConfigInput): Promise<AutoFetchConfig> {
  const { data } = await apiClient.post<AutoFetchConfig>("/external-jobs/auto-fetch", input);
  return data;
}

export async function patchAutoFetchConfig(input: AutoFetchConfigInput): Promise<AutoFetchConfig> {
  const { data } = await apiClient.patch<AutoFetchConfig>("/external-jobs/auto-fetch", input);
  return data;
}

export async function runAutoFetchNow(): Promise<{ message: string; queryCount: number }> {
  const { data } = await apiClient.post<{ message: string; queryCount: number }>("/external-jobs/auto-fetch/run");
  return data;
}

export async function listAutoFetchRuns(limit = 10): Promise<{ runs: AutoFetchRunRecord[] }> {
  const { data } = await apiClient.get<{ runs: AutoFetchRunRecord[] }>("/external-jobs/auto-fetch/runs", {
    params: { limit },
  });
  return data;
}
