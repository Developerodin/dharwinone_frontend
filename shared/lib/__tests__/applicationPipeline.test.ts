import { describe, expect, it } from "vitest";
import {
  INTERVIEW_SCHEDULE_REJECTED_MESSAGE,
  isInterviewSchedulingBlocked,
  REJECTED_REOPEN_STATUSES,
} from "../ats/applicationPipeline";

describe("applicationPipeline", () => {
  it("blocks interview scheduling only for Rejected applications", () => {
    expect(isInterviewSchedulingBlocked("Rejected")).toBe(true);
    expect(isInterviewSchedulingBlocked("Applied")).toBe(false);
    expect(isInterviewSchedulingBlocked("Interview")).toBe(false);
    expect(isInterviewSchedulingBlocked("Hired")).toBe(false);
    expect(isInterviewSchedulingBlocked(null)).toBe(false);
  });

  it("defines reopen targets without Interview (schedule-only stage)", () => {
    expect(REJECTED_REOPEN_STATUSES).toEqual(["Applied", "Screening", "Shortlisted", "Offered"]);
    expect(REJECTED_REOPEN_STATUSES.includes("Interview" as never)).toBe(false);
  });

  it("provides a user-facing rejected scheduling message", () => {
    expect(INTERVIEW_SCHEDULE_REJECTED_MESSAGE).toMatch(/rejected application/i);
  });
});
