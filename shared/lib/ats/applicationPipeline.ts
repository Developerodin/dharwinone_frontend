import type { JobApplicationStatus } from "@/shared/lib/api/jobApplications";

/** Application statuses that block scheduling a new interview. */
export function isInterviewSchedulingBlocked(status: string | null | undefined): boolean {
  return status === "Rejected";
}

export const INTERVIEW_SCHEDULE_REJECTED_MESSAGE =
  "Cannot schedule an interview for a rejected application. Change the application status first.";

/** Manual targets when reopening a rejected application (Interview is schedule-only). */
export const REJECTED_REOPEN_STATUSES: JobApplicationStatus[] = [
  "Applied",
  "Screening",
  "Shortlisted",
  "Offered",
];
