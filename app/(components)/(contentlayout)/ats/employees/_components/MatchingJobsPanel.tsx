"use client";

import { useCallback, useEffect, useState } from "react";
import { getCandidateMatchingJobs, type JobMatch } from "@/shared/lib/api/employees";
import JobMatchCard from "./JobMatchCard";

function loadErrorMessage(err: unknown): string {
  const anyErr = err as { response?: { data?: { message?: string } }; message?: string };
  return anyErr?.response?.data?.message || anyErr?.message || "Could not load matching jobs. Please try again.";
}

export default function MatchingJobsPanel({
  candidateId,
  skillCount,
  onGoToSkills,
  onMatchesLoaded,
}: {
  candidateId: string;
  skillCount: number;
  onGoToSkills?: () => void;
  onMatchesLoaded?: (count: number | null) => void;
}) {
  const [jobs, setJobs] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const retry = useCallback(() => setRetryKey((k) => k + 1), []);

  useEffect(() => {
    if (!candidateId || skillCount === 0) {
      setJobs([]);
      setError(null);
      setLoading(false);
      onMatchesLoaded?.(0);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    getCandidateMatchingJobs(candidateId, { limit: 10, minScore: 1 }, { bypassCache: retryKey > 0 })
      .then((res) => {
        if (cancelled) return;
        setJobs(res.matches);
        onMatchesLoaded?.(res.matches.length);
      })
      .catch((err) => {
        if (cancelled) return;
        setJobs([]);
        setError(loadErrorMessage(err));
        onMatchesLoaded?.(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onMatchesLoaded is optional parent callback
  }, [candidateId, skillCount, retryKey]);

  if (skillCount === 0) {
    return (
      <div className="py-12 text-center">
        <span className="mx-auto mb-2 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <i className="ri-tools-line text-2xl" aria-hidden />
        </span>
        <p className="m-0 text-sm font-semibold text-gray-900 dark:text-white">Add skills to unlock job matches</p>
        <p className="m-0 mt-1 text-xs text-gray-500 dark:text-gray-400">
          Edit the profile and add skills on the Skills tab.
        </p>
        {onGoToSkills ? (
          <button
            type="button"
            className="ti-btn ti-btn-primary !h-9 !py-0 !px-4 mt-3 inline-flex min-h-[2.75rem] w-auto items-center justify-center !text-sm font-medium"
            onClick={onGoToSkills}
          >
            <i className="ri-add-line me-1.5" aria-hidden />
            Add skills
          </button>
        ) : null}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2" aria-busy="true" aria-live="polite">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <div className="space-y-2">
              <span className="block h-3 w-3/4 rounded bg-gray-200 motion-safe:animate-pulse dark:bg-white/5" />
              <span className="block h-2 w-1/2 rounded bg-gray-100 motion-safe:animate-pulse dark:bg-white/[0.03]" />
              <span className="block h-7 w-full rounded bg-gray-100 motion-safe:animate-pulse dark:bg-white/[0.03]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center" role="alert">
        <span className="mx-auto mb-2 inline-flex h-14 w-14 items-center justify-center rounded-full bg-danger/10 text-danger">
          <i className="ri-error-warning-line text-2xl" aria-hidden />
        </span>
        <p className="m-0 text-sm font-semibold text-gray-900 dark:text-white">Could not load matching jobs</p>
        <p className="m-0 mt-1 text-xs text-gray-500 dark:text-gray-400">{error}</p>
        <button
          type="button"
          className="ti-btn ti-btn-primary !h-9 !py-0 !px-4 mt-3 inline-flex min-h-[2.75rem] w-auto items-center justify-center !text-sm font-medium"
          onClick={retry}
        >
          <i className="ri-refresh-line me-1.5" aria-hidden />
          Retry
        </button>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="py-12 text-center">
        <span className="mx-auto mb-2 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-white/5">
          <i className="ri-search-line text-2xl" aria-hidden />
        </span>
        <p className="m-0 text-sm font-semibold text-gray-900 dark:text-white">No matching jobs right now</p>
        <p className="m-0 mt-1 text-xs text-gray-500 dark:text-gray-400">Add more skills or check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {jobs.map((job) => (
        <JobMatchCard
          key={job.jobId}
          job={job}
          variant="panel"
          cta={{ href: `/ats/jobs/edit/${job.jobId}`, label: "View job", icon: "ri-briefcase-line" }}
        />
      ))}
    </div>
  );
}
