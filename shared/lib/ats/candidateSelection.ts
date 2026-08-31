import type { JobApplication, JobApplicationStatus } from "@/shared/lib/api/jobApplications";

export type InterviewResult = "pending" | "selected" | "rejected";

/** Candidate-facing lifecycle stage — mirrors the backend `resolveCandidateLifecycle` projection. */
export type CandidateLifecycleStage =
  | "interview"
  | "offer"
  | "preboarding"
  | "onboarding"
  | "hired"
  | "deferred"
  | "rejected";

/** Stage at which the selection lifecycle closed. */
export type RejectionStage = "interview" | "offer" | "preboarding" | "onboarding";

/** Candidate-facing application row — lifecycle fields are supplied by GET /job-applications/my-applications. */
export type CandidateJobApplication = JobApplication & {
  candidateVisibleStatus?: string;
  interviewResult?: InterviewResult;
  candidateLifecycleStage?: CandidateLifecycleStage;
  rejectionStage?: RejectionStage | null;
  selectionPersisted?: boolean;
  showCongratulations?: boolean;
};

export type CandidateLifecycle = {
  stage: CandidateLifecycleStage;
  /** Badge label, already candidate-facing (e.g. "Pre-boarding", "Rejected · Offer"). */
  badge: string;
  showCongratulations: boolean;
  rejectionStage: RejectionStage | null;
};

export type SelectedApplicationItem = {
  applicationId: string;
  jobId?: string;
  jobTitle: string;
  company: string;
  selectionStatus: string;
  relevantDate?: string;
};

const OFFER_STAGE_STATUSES = new Set<JobApplicationStatus>(["Offered", "Hired"]);
const OFFER_VISIBLE_LABELS = new Set(["Offer", "Offered", "Hired"]);

/** Selection workflow reached offer stage (offer created / application Offered or beyond). */
export function hasReachedOfferStage(app: CandidateJobApplication): boolean {
  const visible = app.candidateVisibleStatus ?? app.status;
  return OFFER_STAGE_STATUSES.has(app.status) || OFFER_VISIBLE_LABELS.has(visible);
}

/**
 * ONE canonical lifecycle result for the badge, the banner and the card styling — they cannot
 * disagree because they all read this.
 *
 * The backend resolver is authoritative: when the row carries `candidateLifecycleStage` it is used
 * verbatim (only the API can see Offer/Placement state). Rows from older endpoints have no
 * lifecycle fields, so they fall back to the interviewResult + status derivation.
 *
 * Ceiling: the fallback cannot distinguish rejection stages — it reports every closure as a plain
 * "Rejected". Serve a surface from /my-applications to get stage-aware labels.
 */
export function resolveCandidateLifecycle(app: CandidateJobApplication): CandidateLifecycle {
  if (app.candidateLifecycleStage) {
    return {
      stage: app.candidateLifecycleStage,
      badge: app.candidateVisibleStatus ?? app.status,
      showCongratulations: app.showCongratulations === true,
      rejectionStage: app.rejectionStage ?? null,
    };
  }

  if (app.interviewResult === "rejected") {
    return { stage: "rejected", badge: "Rejected", showCongratulations: false, rejectionStage: null };
  }
  if (app.interviewResult === "pending") {
    return { stage: "interview", badge: "Interview", showCongratulations: false, rejectionStage: null };
  }
  const selected = app.interviewResult === "selected" && hasReachedOfferStage(app);
  return {
    stage: selected ? "offer" : "interview",
    badge: app.candidateVisibleStatus ?? app.status,
    showCongratulations: selected,
    rejectionStage: null,
  };
}

/** Candidate is on the selected path for this application (drives the congratulations banner). */
export function isInterviewSelectedApplication(app: CandidateJobApplication): boolean {
  return resolveCandidateLifecycle(app).showCongratulations;
}

/** Candidate-facing badge label — never "Pending", never a raw Placement/Offer status. */
export function resolveCandidateBadgeStatus(app: CandidateJobApplication): string {
  return resolveCandidateLifecycle(app).badge;
}

/** Visual weight for the badge. Selection is per application, so tone is too. */
export type CandidateBadgeTone = "success" | "neutral" | "negative";

const STAGE_TONE: Record<CandidateLifecycleStage, CandidateBadgeTone> = {
  interview: "neutral",
  offer: "success",
  preboarding: "success",
  onboarding: "success",
  hired: "success",
  deferred: "neutral",
  rejected: "negative",
};

export function candidateBadgeTone(stage: CandidateLifecycleStage): CandidateBadgeTone {
  return STAGE_TONE[stage] ?? "neutral";
}

/** Shared display date for candidate application surfaces. Returns null for missing/invalid input. */
export function formatDisplayDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function getSelectedApplications(apps: CandidateJobApplication[]): SelectedApplicationItem[] {
  const seen = new Set<string>();
  const items: SelectedApplicationItem[] = [];

  for (const app of apps) {
    const lifecycle = resolveCandidateLifecycle(app);
    if (!lifecycle.showCongratulations) continue;
    const applicationId = String(app._id ?? app.id ?? "");
    if (!applicationId || seen.has(applicationId)) continue;
    seen.add(applicationId);

    const job = app.job as
      | { _id?: string; id?: string; title?: string; organisation?: { name?: string } }
      | undefined;
    const jobId = job?._id ?? job?.id;

    items.push({
      applicationId,
      jobId: jobId ? String(jobId) : undefined,
      jobTitle: job?.title?.trim() || "—",
      company: job?.organisation?.name?.trim() || "—",
      selectionStatus: lifecycle.badge,
      relevantDate: app.updatedAt ?? app.appliedAt,
    });
  }

  return items;
}

export function shouldShowCongratulationsBanner(apps: CandidateJobApplication[]): boolean {
  return getSelectedApplications(apps).length > 0;
}
