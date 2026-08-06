import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";

vi.mock("@/shared/contexts/auth-context", () => ({
  useAuth: () => ({ user: null, permissions: [] }),
}));
// true so the company-email block renders and its read-only state can be asserted
vi.mock("@/shared/lib/permissions", () => ({ hasPermission: () => true }));

const uploadDocument = vi.fn();
vi.mock("@/shared/lib/api/employees", () => ({
  uploadDocument: (...args: unknown[]) => uploadDocument(...args),
}));

import { WizardProvider, type WizardContextValue } from "../engine/WizardContext";
import { PersonalInfoStep } from "../steps/PersonalInfoStep";
import { useWorkforceStore } from "../state/workforce.store";
import { toSelfServicePayload } from "../services/payload";
import { normalize } from "../services/normalizer";
import { makeFormState } from "./fixtures";
import type { StepConfig } from "../types/wizard.types";

const STEPS: StepConfig[] = [
  {
    id: "personal-info",
    title: "Personal Info",
    icon: "ri-user-3-line",
    visibleIn: ["self-service-employee"],
  },
];

function ctx(): WizardContextValue {
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
    clearSaveError: vi.fn(),
    issues: [],
    issuesByField: {},
    issuesBySection: {},
    submitAttempted: false,
    submit: vi.fn(),
  } as WizardContextValue;
}

const renderStep = () =>
  render(
    <WizardProvider value={ctx()}>
      <PersonalInfoStep />
    </WizardProvider>,
  );

const pickFile = () => {
  const input = screen.getByLabelText("Upload profile picture") as HTMLInputElement;
  const file = new File(["x"], "me.png", { type: "image/png" });
  fireEvent.change(input, { target: { files: [file] } });
  return file;
};

beforeEach(() => {
  uploadDocument.mockReset();
  useWorkforceStore.getState().hydrate(makeFormState());
});
afterEach(cleanup);

describe("profile picture — wizard save path", () => {
  // The picked File used to sit in state forever: no upload, no payload field.
  // Save answered 200 and the photo never changed.
  it("uploads the picked file and stores the returned metadata", async () => {
    uploadDocument.mockResolvedValue({
      url: "https://cdn.example.com/me.png",
      key: "uploads/me.png",
      originalName: "me.png",
      size: 10,
      mimeType: "image/png",
    });
    renderStep();
    pickFile();

    await waitFor(() => expect(uploadDocument).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      const pi = useWorkforceStore.getState().personalInfo;
      expect(pi.profilePicture?.url).toBe("https://cdn.example.com/me.png");
      expect(pi.profilePicture?.key).toBe("uploads/me.png");
      expect(pi.profilePictureFile).toBeFalsy();
    });
  });

  it("surfaces an upload failure instead of pretending the photo was set", async () => {
    uploadDocument.mockRejectedValue(new Error("nope"));
    renderStep();
    pickFile();

    await waitFor(() =>
      expect(screen.getByRole("alert").textContent).toMatch(/couldn't upload/i),
    );
    expect(useWorkforceStore.getState().personalInfo.profilePicture).toBeUndefined();
  });

  // Removal emitted `undefined`, which the include-guard drops, so the server
  // never cleared the stored picture.
  it("sends profilePicture: null when the photo was removed", () => {
    const state = makeFormState({
      personalInfo: {
        ...makeFormState().personalInfo,
        profilePicture: {
          url: "https://cdn.example.com/old.png",
          key: "uploads/old.png",
        },
        profilePictureRemoved: true,
      },
    });
    const payload = toSelfServicePayload(normalize(state), {
      "personal-info": true,
    }) as Record<string, unknown>;
    expect(payload.profilePicture).toBeNull();
  });
});

describe("self-service read-only fields", () => {
  // These have no self-service save path (absent from the PATCH schema), so an
  // editable input silently discarded whatever the user typed.
  it.each(["designation", "companyAssignedEmail"])("renders %s read-only", (id) => {
    renderStep();
    const el = document.getElementById(id) as HTMLInputElement;
    expect(el).toBeTruthy();
    expect(el.readOnly).toBe(true);
  });

  it("renders the mailbox provider select disabled", () => {
    renderStep();
    const el = document.getElementById("companyEmailProvider") as HTMLSelectElement;
    expect(el.disabled).toBe(true);
  });
});
