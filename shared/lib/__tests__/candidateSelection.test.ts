import { describe, it, expect } from "vitest";
import type { CandidateJobApplication } from "../ats/candidateSelection";
import {
  candidateBadgeTone,
  formatDisplayDate,
  getSelectedApplications,
  hasReachedOfferStage,
  isInterviewSelectedApplication,
  resolveCandidateBadgeStatus,
  resolveCandidateLifecycle,
  shouldShowCongratulationsBanner,
} from "../ats/candidateSelection";

function app(overrides: Partial<CandidateJobApplication> = {}): CandidateJobApplication {
  return {
    _id: "app-1",
    status: "Applied",
    job: { _id: "job-1", title: "AI/ML Engineer", organisation: { name: "Dharwin Business Solutions" } },
    candidate: { fullName: "Candidate A" },
    ...overrides,
  };
}

describe("hasReachedOfferStage", () => {
  it("returns true for Offered application status", () => {
    expect(hasReachedOfferStage(app({ status: "Offered" }))).toBe(true);
  });

  it("returns true when candidateVisibleStatus is Offer (placement pending)", () => {
    expect(
      hasReachedOfferStage(app({ status: "Interview", candidateVisibleStatus: "Offer" })),
    ).toBe(true);
  });

  it("returns false for early pipeline statuses", () => {
    expect(hasReachedOfferStage(app({ status: "Interview" }))).toBe(false);
  });
});

describe("isInterviewSelectedApplication", () => {
  it("requires interviewResult selected and offer stage", () => {
    expect(
      isInterviewSelectedApplication(
        app({ interviewResult: "selected", status: "Offered", candidateVisibleStatus: "Offer" }),
      ),
    ).toBe(true);
  });

  it("does not treat Offered without interviewResult as selected", () => {
    expect(isInterviewSelectedApplication(app({ status: "Offered" }))).toBe(false);
  });

  it("does not treat interviewResult selected without offer stage", () => {
    expect(isInterviewSelectedApplication(app({ interviewResult: "selected", status: "Interview" }))).toBe(
      false,
    );
  });

  it("hides when interview result is rolled back to rejected", () => {
    expect(
      isInterviewSelectedApplication(
        app({ interviewResult: "rejected", status: "Offered" }),
      ),
    ).toBe(false);
  });

  it("hides when interview result is rolled back to pending", () => {
    expect(
      isInterviewSelectedApplication(
        app({ interviewResult: "pending", status: "Offered", candidateVisibleStatus: "Offer" }),
      ),
    ).toBe(false);
  });
});

describe("interviewResult transition scenarios", () => {
  const offerStageSelected = () =>
    app({ interviewResult: "selected", status: "Offered", candidateVisibleStatus: "Offer" });

  it("shows banner for selected + offer stage (initial selection)", () => {
    expect(shouldShowCongratulationsBanner([offerStageSelected()])).toBe(true);
  });

  it("hides after selected→rejected transition", () => {
    expect(
      shouldShowCongratulationsBanner([
        app({ interviewResult: "rejected", status: "Offered", candidateVisibleStatus: "Offer" }),
      ]),
    ).toBe(false);
  });

  it("hides after selected→pending transition", () => {
    expect(
      shouldShowCongratulationsBanner([
        app({ interviewResult: "pending", status: "Interview", candidateVisibleStatus: "Interview" }),
      ]),
    ).toBe(false);
  });

  it("shows after rejected→selected transition when offer stage reached", () => {
    expect(shouldShowCongratulationsBanner([offerStageSelected()])).toBe(true);
  });

  it("shows after pending→selected transition when offer stage reached", () => {
    expect(
      shouldShowCongratulationsBanner([
        app({ interviewResult: "selected", status: "Hired", candidateVisibleStatus: "Hired" }),
      ]),
    ).toBe(true);
  });

  it("stays shown on selected→selected (no-op re-save)", () => {
    expect(shouldShowCongratulationsBanner([offerStageSelected()])).toBe(true);
  });

  it("does not use a sticky flag — only current API interviewResult matters", () => {
    const currentApiRow = app({ interviewResult: "rejected", status: "Rejected" });
    expect(shouldShowCongratulationsBanner([currentApiRow])).toBe(false);
  });
});

describe("banner visibility matrix (10 scenarios)", () => {
  it.each([
    ["selected + Offered", { interviewResult: "selected" as const, status: "Offered" as const, candidateVisibleStatus: "Offer" }, true],
    ["selected + Hired", { interviewResult: "selected" as const, status: "Hired" as const }, true],
    ["selected + Interview only (no offer stage)", { interviewResult: "selected" as const, status: "Interview" as const }, false],
    ["Offered without interviewResult", { status: "Offered" as const }, false],
    ["rejected + Offered (rollback)", { interviewResult: "rejected" as const, status: "Offered" as const }, false],
    ["pending + Offered", { interviewResult: "pending" as const, status: "Offered" as const }, false],
    ["pending + Interview", { interviewResult: "pending" as const, status: "Interview" as const }, false],
    ["rejected + Rejected", { interviewResult: "rejected" as const, status: "Rejected" as const }, false],
    ["Applied (no interviewResult)", { status: "Applied" as const }, false],
    ["Screening (no interviewResult)", { status: "Screening" as const }, false],
  ] as const)("scenario: %s → banner %s", (_label, overrides, expected) => {
    expect(shouldShowCongratulationsBanner([app(overrides)])).toBe(expected);
  });
});

describe("resolveCandidateBadgeStatus", () => {
  it.each([
    [
      "pending + Interview",
      { interviewResult: "pending" as const, status: "Interview" as const, candidateVisibleStatus: "Interview" },
      "Interview",
    ],
    [
      "pending + Offered (selected→pending rollback)",
      { interviewResult: "pending" as const, status: "Offered" as const, candidateVisibleStatus: "Offer" },
      "Interview",
    ],
    [
      "rejected + Interview status",
      { interviewResult: "rejected" as const, status: "Interview" as const, candidateVisibleStatus: "Interview" },
      "Rejected",
    ],
    [
      "rejected + Rejected status",
      { interviewResult: "rejected" as const, status: "Rejected" as const, candidateVisibleStatus: "Rejected" },
      "Rejected",
    ],
    [
      "selected + offer stage",
      {
        interviewResult: "selected" as const,
        status: "Offered" as const,
        candidateVisibleStatus: "Offer",
      },
      "Offer",
    ],
    [
      "no interviewResult — uses candidateVisibleStatus",
      { status: "Screening" as const, candidateVisibleStatus: "Screening" },
      "Screening",
    ],
  ] as const)("badge: %s → %s", (_label, overrides, expected) => {
    expect(resolveCandidateBadgeStatus(app(overrides))).toBe(expected);
  });

  it("never shows Pending as the badge label", () => {
    const badge = resolveCandidateBadgeStatus(
      app({ interviewResult: "pending", status: "Interview", candidateVisibleStatus: "Interview" }),
    );
    expect(badge).not.toBe("Pending");
    expect(badge).toBe("Interview");
  });
});

describe("badge + banner transition matrix (13 scenarios)", () => {
  it.each([
    ["pending + Interview", { interviewResult: "pending" as const, status: "Interview" as const }, "Interview", false],
    [
      "pending + Offered stale",
      { interviewResult: "pending" as const, status: "Offered" as const, candidateVisibleStatus: "Offer" },
      "Interview",
      false,
    ],
    ["rejected", { interviewResult: "rejected" as const, status: "Rejected" as const }, "Rejected", false],
    [
      "rejected while status still Interview",
      { interviewResult: "rejected" as const, status: "Interview" as const, candidateVisibleStatus: "Interview" },
      "Rejected",
      false,
    ],
    [
      "selected + offer",
      { interviewResult: "selected" as const, status: "Offered" as const, candidateVisibleStatus: "Offer" },
      "Offer",
      true,
    ],
    [
      "selected→pending",
      { interviewResult: "pending" as const, status: "Interview" as const, candidateVisibleStatus: "Interview" },
      "Interview",
      false,
    ],
    [
      "rejected→pending",
      { interviewResult: "pending" as const, status: "Interview" as const, candidateVisibleStatus: "Interview" },
      "Interview",
      false,
    ],
    [
      "pending→selected",
      { interviewResult: "selected" as const, status: "Offered" as const, candidateVisibleStatus: "Offer" },
      "Offer",
      true,
    ],
    [
      "pending→rejected",
      { interviewResult: "rejected" as const, status: "Rejected" as const, candidateVisibleStatus: "Rejected" },
      "Rejected",
      false,
    ],
    [
      "selected→rejected",
      { interviewResult: "rejected" as const, status: "Rejected" as const, candidateVisibleStatus: "Rejected" },
      "Rejected",
      false,
    ],
    [
      "rejected→selected",
      { interviewResult: "selected" as const, status: "Offered" as const, candidateVisibleStatus: "Offer" },
      "Offer",
      true,
    ],
    [
      "selected→selected (no-op)",
      { interviewResult: "selected" as const, status: "Offered" as const, candidateVisibleStatus: "Offer" },
      "Offer",
      true,
    ],
    [
      "not sticky — rejected wins over stale offer fields",
      { interviewResult: "rejected" as const, status: "Offered" as const, candidateVisibleStatus: "Offer" },
      "Rejected",
      false,
    ],
  ] as const)("scenario: %s", (_label, overrides, expectedBadge, expectBanner) => {
    const row = app(overrides);
    expect(resolveCandidateBadgeStatus(row)).toBe(expectedBadge);
    expect(shouldShowCongratulationsBanner([row])).toBe(expectBanner);
  });
});

describe("getSelectedApplications", () => {
  it("returns empty when no selected applications", () => {
    expect(getSelectedApplications([app({ status: "Applied" })])).toEqual([]);
    expect(shouldShowCongratulationsBanner([app({ status: "Offered" })])).toBe(false);
  });

  it("returns one selected application with API job data", () => {
    const items = getSelectedApplications([
      app({
        _id: "sel-1",
        interviewResult: "selected",
        status: "Offered",
        candidateVisibleStatus: "Offer",
        updatedAt: "2026-08-01T10:00:00.000Z",
      }),
    ]);
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      applicationId: "sel-1",
      jobId: "job-1",
      jobTitle: "AI/ML Engineer",
      company: "Dharwin Business Solutions",
      selectionStatus: "Offer",
    });
  });

  it("lists multiple selected jobs once each", () => {
    const items = getSelectedApplications([
      app({
        _id: "a1",
        interviewResult: "selected",
        status: "Offered",
        job: { _id: "j1", title: "Role A", organisation: { name: "Co A" } },
      }),
      app({
        _id: "a2",
        interviewResult: "selected",
        status: "Offered",
        job: { _id: "j2", title: "Role B", organisation: { name: "Co B" } },
      }),
      app({ _id: "a3", status: "Screening" }),
    ]);
    expect(items.map((i) => i.jobTitle)).toEqual(["Role A", "Role B"]);
  });

  it("excludes non-selected applications from the banner list", () => {
    const items = getSelectedApplications([
      app({ _id: "x", interviewResult: "selected", status: "Offered" }),
      app({ _id: "y", status: "Offered" }),
      app({ _id: "z", interviewResult: "rejected", status: "Rejected" }),
    ]);
    expect(items).toHaveLength(1);
    expect(items[0].applicationId).toBe("x");
  });
});

describe("API-driven lifecycle (candidateLifecycleStage present)", () => {
  function apiRow(overrides: Partial<CandidateJobApplication>): CandidateJobApplication {
    return app({ status: "Hired", selectionPersisted: true, ...overrides });
  }

  it.each([
    ["interview", { candidateLifecycleStage: "interview" as const, candidateVisibleStatus: "Interview", showCongratulations: false }, "Interview", false, "neutral"],
    ["offer", { candidateLifecycleStage: "offer" as const, candidateVisibleStatus: "Offer", showCongratulations: true }, "Offer", true, "success"],
    ["pre-boarding", { candidateLifecycleStage: "preboarding" as const, candidateVisibleStatus: "Pre-boarding", showCongratulations: true }, "Pre-boarding", true, "success"],
    ["onboarding", { candidateLifecycleStage: "onboarding" as const, candidateVisibleStatus: "Onboarding", showCongratulations: true }, "Onboarding", true, "success"],
    ["hired", { candidateLifecycleStage: "hired" as const, candidateVisibleStatus: "Hired", showCongratulations: true }, "Hired", true, "success"],
    ["deferred", { candidateLifecycleStage: "deferred" as const, candidateVisibleStatus: "Deferred", showCongratulations: true }, "Deferred", true, "neutral"],
    ["rejected · interview", { candidateLifecycleStage: "rejected" as const, rejectionStage: "interview" as const, candidateVisibleStatus: "Rejected \u00b7 Interview", showCongratulations: false }, "Rejected \u00b7 Interview", false, "negative"],
    ["rejected · offer", { candidateLifecycleStage: "rejected" as const, rejectionStage: "offer" as const, candidateVisibleStatus: "Rejected \u00b7 Offer", showCongratulations: false }, "Rejected \u00b7 Offer", false, "negative"],
    ["rejected · pre-boarding", { candidateLifecycleStage: "rejected" as const, rejectionStage: "preboarding" as const, candidateVisibleStatus: "Rejected \u00b7 Pre-boarding", showCongratulations: false }, "Rejected \u00b7 Pre-boarding", false, "negative"],
    ["rejected · onboarding", { candidateLifecycleStage: "rejected" as const, rejectionStage: "onboarding" as const, candidateVisibleStatus: "Rejected \u00b7 Onboarding", showCongratulations: false }, "Rejected \u00b7 Onboarding", false, "negative"],
  ] as const)("stage %s → badge, banner and tone agree", (_label, overrides, badge, banner, tone) => {
    const row = apiRow(overrides);
    const lifecycle = resolveCandidateLifecycle(row);
    expect(lifecycle.badge).toBe(badge);
    expect(resolveCandidateBadgeStatus(row)).toBe(badge);
    expect(shouldShowCongratulationsBanner([row])).toBe(banner);
    expect(candidateBadgeTone(lifecycle.stage)).toBe(tone);
  });

  it("ignores a stale interviewResult once the API reports a downstream stage", () => {
    const row = apiRow({
      candidateLifecycleStage: "preboarding",
      candidateVisibleStatus: "Pre-boarding",
      showCongratulations: true,
      interviewResult: "rejected",
    });
    expect(resolveCandidateBadgeStatus(row)).toBe("Pre-boarding");
    expect(shouldShowCongratulationsBanner([row])).toBe(true);
  });

  it("keeps banner visibility per application", () => {
    const rejectedInOffer = apiRow({
      _id: "rej-1",
      candidateLifecycleStage: "rejected",
      rejectionStage: "offer",
      candidateVisibleStatus: "Rejected \u00b7 Offer",
      showCongratulations: false,
      job: { _id: "j1", title: "Role A", organisation: { name: "Co A" } },
    });
    const onboarding = apiRow({
      _id: "onb-1",
      candidateLifecycleStage: "onboarding",
      candidateVisibleStatus: "Onboarding",
      showCongratulations: true,
      job: { _id: "j2", title: "Role B", organisation: { name: "Co B" } },
    });
    const items = getSelectedApplications([rejectedInOffer, onboarding]);
    expect(items.map((i) => i.jobTitle)).toEqual(["Role B"]);
    expect(shouldShowCongratulationsBanner([rejectedInOffer, onboarding])).toBe(true);
  });
});

describe("formatDisplayDate", () => {
  it("returns null for missing or unparseable input", () => {
    expect(formatDisplayDate(undefined)).toBeNull();
    expect(formatDisplayDate("not-a-date")).toBeNull();
  });

  it("formats an ISO timestamp", () => {
    expect(formatDisplayDate("2026-08-01T10:00:00.000Z")).toContain("2026");
  });
});
