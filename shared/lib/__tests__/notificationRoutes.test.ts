import { describe, it, expect } from "vitest";
import { resolveNotificationRoute } from "../notificationRoutes";
import type { Notification } from "@/shared/lib/api/notifications";

function notif(partial: Partial<Notification>): Notification {
  return {
    _id: "n1",
    type: "job_application",
    title: "Congratulations! You've Been Selected",
    message: "Congratulations! You've been selected for Data Analyst.",
    read: false,
    createdAt: new Date().toISOString(),
    ...partial,
  } as Notification;
}

describe("resolveNotificationRoute — job_application selection", () => {
  it("uses explicit /ats/my-applications link from backend", () => {
    expect(
      resolveNotificationRoute(
        notif({ link: "/ats/my-applications" }),
      ),
    ).toBe("/ats/my-applications");
  });

  it("falls back to My Applications when no jobId metadata", () => {
    expect(resolveNotificationRoute(notif({ link: undefined, metadata: {} }))).toBe("/ats/my-applications");
  });

  it("prefers explicit link over jobId metadata (recruiter /ats/jobs fallback)", () => {
    expect(
      resolveNotificationRoute(
        notif({
          link: "/ats/my-applications",
          metadata: { jobId: "job-abc", interviewResult: "selected" },
        }),
      ),
    ).toBe("/ats/my-applications");
  });

  it("renders selection notification title/message without mutation", () => {
    const n = notif({
      title: "Congratulations! You've Been Selected",
      message: "Congratulations! You've been selected for Data Analyst.",
    });
    expect(n.title).toContain("Congratulations");
    expect(n.message).toContain("selected");
    expect(resolveNotificationRoute(n)).toBe("/ats/my-applications");
  });
});

describe("resolveNotificationRoute — dedupe-safe identity", () => {
  it("same notification id resolves to the same route", () => {
    const a = notif({ _id: "same-id", link: "/ats/my-applications" });
    const b = notif({ _id: "same-id", link: "/ats/my-applications" });
    expect(resolveNotificationRoute(a)).toBe(resolveNotificationRoute(b));
  });
});
