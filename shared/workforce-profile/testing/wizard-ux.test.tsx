import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
  waitFor,
  cleanup,
} from "@testing-library/react";

vi.mock("@/shared/contexts/auth-context", () => ({
  useAuth: () => ({ user: null, permissions: [] }),
}));
vi.mock("@/shared/lib/permissions", () => ({ hasPermission: () => false }));

const runMock = vi.fn();
vi.mock("../submit/strategies", () => ({
  getSubmitStrategy: () => ({ kind: "self-service", run: runMock }),
}));

import { WizardProvider, type WizardContextValue } from "../engine/WizardContext";
import { WizardFooter } from "../engine/WizardFooter";
import { WizardStepTabs } from "../engine/WizardStepTabs";
import { WorkforceWizardShell } from "../engine/WorkforceWizardShell";
import { PersonalInfoStep } from "../steps/PersonalInfoStep";
import { useWorkforceSubmit } from "../submit/useWorkforceSubmit";
import { useWorkforceStore } from "../state/workforce.store";
import type { StepConfig } from "../types/wizard.types";
import type { ValidationIssue } from "../types/validation.types";

const STEPS: StepConfig[] = [
  { id: "personal-info", title: "Personal Info", icon: "ri-user-3-line", visibleIn: ["self-service-employee"] },
  { id: "qualification", title: "Qualification", icon: "ri-graduation-cap-line", visibleIn: ["self-service-employee"] },
  { id: "work-experience", title: "Work Experience", icon: "ri-briefcase-line", visibleIn: ["self-service-employee"] },
  { id: "documents", title: "Documents", icon: "ri-file-list-3-line", visibleIn: ["self-service-employee"] },
];

function makeCtx(over: Partial<WizardContextValue> = {}): WizardContextValue {
  return {
    mode: "self-service-employee",
    role: "employee",
    steps: STEPS,
    currentStep: "personal-info",
    currentIndex: 0,
    setStepById: vi.fn(),
    setStepByIndex: vi.fn(),
    isLoading: false,
    isSaving: false,
    loadError: null,
    saveError: null,
    isDirty: false,
    dirtySections: {},
    resetDirty: vi.fn(),
    issues: [],
    issuesByField: {},
    issuesBySection: {},
    submitAttempted: false,
    submit: vi.fn(),
    ...over,
  } as WizardContextValue;
}

const wrap = (ctx: WizardContextValue, node: React.ReactNode) => (
  <WizardProvider value={ctx}>{node}</WizardProvider>
);

const analytics = {
  trackValidationFail: vi.fn(),
  trackSubmitStart: vi.fn(),
  trackSubmitSuccess: vi.fn(),
  trackSubmitFailure: vi.fn(),
  trackStepView: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  useWorkforceStore.getState().reset();
});

// vitest runs without `globals`, so RTL cannot register its own auto-cleanup.
afterEach(cleanup);

// The footer's "Saving…" label and disabled state are driven by isSubmitting.
// A ref never re-renders, so the user gets no feedback at all during a save.
describe("useWorkforceSubmit feedback", () => {
  it("reports isSubmitting while the request is in flight", async () => {
    let release: (v: unknown) => void = () => {};
    runMock.mockImplementation(() => new Promise((res) => { release = res; }));

    const { result } = renderHook(() =>
      useWorkforceSubmit({
        mode: "self-service-employee",
        role: "employee",
        validate: () => ({ issues: [], hasErrors: false }),
        analytics: analytics as never,
      }),
    );

    expect(result.current.isSubmitting).toBe(false);
    act(() => { void result.current.submit(); });
    await waitFor(() => expect(result.current.isSubmitting).toBe(true));

    await act(async () => { release({ kind: "self-service", raw: {} }); });
    await waitFor(() => expect(result.current.isSubmitting).toBe(false));
  });

  it("captures an API failure instead of throwing it at the caller", async () => {
    runMock.mockRejectedValue(new Error("Request failed with status code 400"));

    const { result } = renderHook(() =>
      useWorkforceSubmit({
        mode: "self-service-employee",
        role: "employee",
        validate: () => ({ issues: [], hasErrors: false }),
        analytics: analytics as never,
      }),
    );

    await act(async () => {
      await expect(result.current.submit()).resolves.toBeNull();
    });
    await waitFor(() =>
      expect(result.current.submitError).toContain("Request failed with status code 400"),
    );
  });
});

describe("WorkforceWizardShell", () => {
  it("surfaces a save failure and lets the user dismiss it", () => {
    const clearSaveError = vi.fn();
    render(
      wrap(
        makeCtx({ saveError: "Phone number must be 6-15 digits", clearSaveError }),
        <WorkforceWizardShell stepRender={{ "personal-info": <p>step body</p> }} />,
      ),
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Phone number must be 6-15 digits");
    fireEvent.click(screen.getByRole("button", { name: /dismiss error/i }));
    expect(clearSaveError).toHaveBeenCalled();
  });

  it("renders no alert when the save succeeded", () => {
    render(
      wrap(
        makeCtx(),
        <WorkforceWizardShell stepRender={{ "personal-info": <p>step body</p> }} />,
      ),
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

describe("WizardFooter", () => {
  it("keeps Back mounted but disabled on the first step", () => {
    render(
      <WizardFooter
        isFirst
        isLast={false}
        isSaving={false}
        onBack={vi.fn()}
        onNext={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "Back" })).toBeDisabled();
  });
});

describe("WizardStepTabs", () => {
  it("flags steps that hold validation errors", () => {
    render(
      <WizardStepTabs
        steps={STEPS}
        currentStep="personal-info"
        onSelect={vi.fn()}
        errorSteps={["documents"]}
      />,
    );
    expect(screen.getByRole("button", { name: /Documents/i })).toHaveAttribute(
      "data-has-error",
      "true",
    );
    expect(screen.getByRole("button", { name: /Qualification/i })).not.toHaveAttribute(
      "data-has-error",
      "true",
    );
  });
});

describe("PersonalInfoStep", () => {
  it("derives the step counter from the wizard, not a hardcoded total", () => {
    render(wrap(makeCtx(), <PersonalInfoStep />));
    expect(screen.getByText(/step 1 of 4/i)).toBeInTheDocument();
  });

  it("associates the phone label with the phone input", () => {
    render(wrap(makeCtx(), <PersonalInfoStep />));
    const control = screen.getByLabelText(/phone number/i, { selector: "input" });
    expect(control.tagName).toBe("INPUT");
    expect(control).toHaveAttribute("type", "tel");
  });

  it("holds back field errors until the field is touched", () => {
    const issue: ValidationIssue = {
      field: "personalInfo.fullName",
      message: "Full name is required",
      severity: "error",
      section: "personal-info",
    };
    render(
      wrap(
        makeCtx({ issuesByField: { "personalInfo.fullName": [issue] } }),
        <PersonalInfoStep />,
      ),
    );

    expect(screen.queryByText("Full name is required")).not.toBeInTheDocument();
    fireEvent.blur(screen.getByLabelText(/full name/i));
    expect(screen.getByText("Full name is required")).toBeInTheDocument();
  });

  it("shows errors immediately once a submit has been attempted", () => {
    const issue: ValidationIssue = {
      field: "personalInfo.fullName",
      message: "Full name is required",
      severity: "error",
      section: "personal-info",
    };
    render(
      wrap(
        makeCtx({ issuesByField: { "personalInfo.fullName": [issue] }, submitAttempted: true }),
        <PersonalInfoStep />,
      ),
    );
    expect(screen.getByText("Full name is required")).toBeInTheDocument();
  });

  it("explains why an oversized profile picture was rejected", () => {
    render(wrap(makeCtx(), <PersonalInfoStep />));
    const file = new File(["x"], "big.png", { type: "image/png" });
    Object.defineProperty(file, "size", { value: 6 * 1024 * 1024 });

    fireEvent.change(screen.getByLabelText(/upload profile picture/i), {
      target: { files: [file] },
    });

    // The static "up to 5 MB" hint also matches /5 MB/, so assert on the alert.
    expect(screen.getByRole("alert")).toHaveTextContent(/under 5 MB/i);
  });

  it("accepts a social URL without a scheme, matching what the API stores", () => {
    render(wrap(makeCtx(), <PersonalInfoStep />));
    fireEvent.click(screen.getByRole("button", { name: /add link/i }));
    fireEvent.change(screen.getByLabelText(/^URL/i), {
      target: { value: "linkedin.com/in/me" },
    });
    expect(screen.queryByText(/must start with|valid URL/i)).not.toBeInTheDocument();
  });
});
