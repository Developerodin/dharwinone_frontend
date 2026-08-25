import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/shared/lib/api/client";
import {
  buyTelephonyNumber,
  getConfiguredTelephonyProvider,
  telephonyNumbersBuyPath,
} from "@/shared/lib/api/telephony";

vi.mock("@/shared/lib/api/client", () => ({
  apiClient: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("telephony buy path", () => {
  const original = process.env.NEXT_PUBLIC_TELEPHONY_PROVIDER;
  const postMock = vi.mocked(apiClient.post);

  beforeEach(() => {
    postMock.mockReset();
  });

  afterEach(() => {
    if (original === undefined) {
      delete process.env.NEXT_PUBLIC_TELEPHONY_PROVIDER;
    } else {
      process.env.NEXT_PUBLIC_TELEPHONY_PROVIDER = original;
    }
  });

  it("defaults to the Plivo buy path", () => {
    delete process.env.NEXT_PUBLIC_TELEPHONY_PROVIDER;
    expect(getConfiguredTelephonyProvider()).toBe("plivo");
    expect(telephonyNumbersBuyPath()).toBe("/plivo/numbers/buy");
  });

  it("uses the Twilio buy path when NEXT_PUBLIC_TELEPHONY_PROVIDER=twilio", () => {
    process.env.NEXT_PUBLIC_TELEPHONY_PROVIDER = "twilio";
    expect(getConfiguredTelephonyProvider()).toBe("twilio");
    expect(telephonyNumbersBuyPath()).toBe("/twilio/numbers/buy");
  });

  it("retries buy on provider-gate mismatch using backend-reported provider", async () => {
    delete process.env.NEXT_PUBLIC_TELEPHONY_PROVIDER;
    postMock
      .mockRejectedValueOnce({
        isAxiosError: true,
        response: {
          data: {
            message: "This endpoint is only available when TELEPHONY_PROVIDER=twilio.",
          },
        },
      })
      .mockResolvedValueOnce({
        data: { success: true, number: "15186291592", message: "Number purchased successfully." },
      });

    const result = await buyTelephonyNumber({
      number: "15186291592",
      countryIso: "US",
    });

    expect(postMock).toHaveBeenNthCalledWith(
      1,
      "/plivo/numbers/buy",
      expect.objectContaining({ number: "15186291592", countryIso: "US" })
    );
    expect(postMock).toHaveBeenNthCalledWith(
      2,
      "/twilio/numbers/buy",
      expect.objectContaining({ number: "15186291592", countryIso: "US" })
    );
    expect(result.success).toBe(true);
    expect(result.number).toBe("15186291592");
  });
});
