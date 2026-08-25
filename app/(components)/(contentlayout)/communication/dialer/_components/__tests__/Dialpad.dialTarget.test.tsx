import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Dialpad from "@/app/(components)/(contentlayout)/communication/calling/_components/Dialpad";

vi.mock("@/shared/lib/api/telephony", () => ({
  listOwnedTelephonyNumbers: vi.fn().mockResolvedValue({ numbers: [] }),
  getTelephonySdkToken: vi.fn().mockResolvedValue({ provider: "twilio", token: "t" }),
  placeTelephonyCall: vi.fn(), registerTelephonyBrowserCallIntent: vi.fn(),
  setTelephonyRecording: vi.fn(),
}));
vi.mock("@/shared/contexts/auth-context", () => ({
  useAuth: () => ({ permissions: [], isPlatformSuperUser: false, isAdministrator: false }),
}));
vi.mock("@/shared/lib/permissions", () => ({ hasPermission: () => false }));
vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams() }));
vi.mock("@twilio/voice-sdk", () => ({ Device: class { on() {} register() {} state = ""; } }));

describe("Dialpad dialTarget", () => {
  beforeEach(() => vi.clearAllMocks());

  it("fills the number field with national digits and syncs the country select", async () => {
    const { rerender } = render(<Dialpad embedded />);
    rerender(<Dialpad embedded dialTarget="+919876543210" />);
    const input = (await screen.findByLabelText("Number to dial")) as HTMLInputElement;
    const select = (await screen.findByLabelText("Country dial code")) as HTMLSelectElement;
    // Dial code lives only in the select — the box holds national digits only,
    // so the code never appears twice.
    expect(input.value).toBe("9876543210");
    expect(select.value).toBe("IN");
  });
});
