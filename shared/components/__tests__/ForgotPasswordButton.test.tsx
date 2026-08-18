import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import * as authApi from "@/shared/lib/api/auth";
import { ForgotPasswordButton } from "../ForgotPasswordButton";

vi.mock("@/shared/lib/api/auth", () => ({
  forgotPassword: vi.fn(),
}));

vi.mock("@/shared/contexts/auth-context", () => ({
  useAuth: () => ({
    user: { email: "user@example.com" },
  }),
}));

vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn().mockResolvedValue(undefined),
  },
}));

describe("ForgotPasswordButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(authApi.forgotPassword).mockResolvedValue(undefined);
  });

  afterEach(() => {
    cleanup();
  });

  it("sends forgot-password request with logged-in user email", async () => {
    const user = userEvent.setup();
    render(<ForgotPasswordButton />);

    await user.click(screen.getByRole("button", { name: /forgot password/i }));

    expect(authApi.forgotPassword).toHaveBeenCalledWith({ email: "user@example.com" });
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "success",
        title: "Password reset link sent to your email",
      }),
    );
  });

  it("uses email prop when provided", async () => {
    const user = userEvent.setup();
    render(<ForgotPasswordButton email="override@example.com" />);

    await user.click(screen.getByRole("button", { name: /forgot password/i }));

    expect(authApi.forgotPassword).toHaveBeenCalledWith({ email: "override@example.com" });
  });

  it("shows error toast when request fails", async () => {
    const err = new AxiosError("Server error");
    err.response = { status: 500, data: { message: "Server error" } } as never;
    vi.mocked(authApi.forgotPassword).mockRejectedValue(err);

    const user = userEvent.setup();
    render(<ForgotPasswordButton email="user@example.com" />);

    await user.click(screen.getByRole("button", { name: /forgot password/i }));

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "error",
        title: "Request failed",
        text: "Server error",
      }),
    );
  });
});
