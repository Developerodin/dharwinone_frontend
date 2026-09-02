"use client";

import { useCallback, useEffect, useState } from "react";
import { getReferralLeadsStats, type ReferralLeadsQueryParams, type ReferralLeadsStatsResponse } from "@/shared/lib/api/referralLeads";

export function useReferralLeadsStats(queryParams: ReferralLeadsQueryParams, enabled: boolean) {
  const [stats, setStats] = useState<ReferralLeadsStatsResponse | null>(null);
  const [statsSnapshot, setStatsSnapshot] = useState<number | null>(null);
  const [isStale, setIsStale] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled) return;
    setError(null);
    setIsStale(false);
    try {
      const st = await getReferralLeadsStats(queryParams);
      setStats(st);
      setStatsSnapshot(st.totalReferrals);
    } catch (e: unknown) {
      const msg =
        e && typeof e === "object" && "message" in e ? String((e as { message: string }).message) : "Failed to load stats";
      setError(msg);
      throw e;
    }
  }, [enabled, queryParams]);

  useEffect(() => {
    if (!enabled) return;
    void refresh().catch(() => undefined);
  }, [enabled, queryParams, refresh]);

  useEffect(() => {
    if (!enabled || statsSnapshot == null) return;
    const t = setInterval(() => {
      void (async () => {
        try {
          const s = await getReferralLeadsStats(queryParams);
          setStatsSnapshot((prev) => {
            if (prev != null && s.totalReferrals !== prev) {
              setIsStale(true);
            }
            return s.totalReferrals;
          });
          setStats(s);
        } catch {
          /* ignore poll errors */
        }
      })();
    }, 60_000);
    return () => clearInterval(t);
  }, [enabled, queryParams, statsSnapshot]);

  return { stats, isStale, error, refresh, setIsStale };
}
