import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import EmailLookupPanel from "./EmailLookupPanel";

const lookupUserByEmail = vi.fn();
const createDirectConversationByEmail = vi.fn();
vi.mock("@/shared/lib/api/chat", () => ({
  lookupUserByEmail: (...a: unknown[]) => lookupUserByEmail(...a),
  createDirectConversationByEmail: (...a: unknown[]) => createDirectConversationByEmail(...a),
}));

beforeEach(() => {
  lookupUserByEmail.mockReset();
  createDirectConversationByEmail.mockReset();
  createDirectConversationByEmail.mockResolvedValue({ id: "conv1" });
});

afterEach(() => {
  cleanup();
});

const FOUND = {
  status: "found",
  contact: { id: "u2", name: "Harsh Member", avatar: null, email: "harsh@example.com" },
};

describe("EmailLookupPanel", () => {
  it("disables autocomplete on the input", () => {
    render(<EmailLookupPanel onStarted={() => {}} />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute("autocomplete", "off");
  });

  it("does NOT call the API on keystroke — submit only", async () => {
    render(<EmailLookupPanel onStarted={() => {}} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "har" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "harsh@" } });
    await new Promise((r) => setTimeout(r, 600));
    expect(lookupUserByEmail).not.toHaveBeenCalled();
  });

  it("rejects an invalid address client-side without calling the API", async () => {
    render(<EmailLookupPanel onStarted={() => {}} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "harsh@" } });
    fireEvent.click(screen.getByRole("button", { name: /find/i }));
    await waitFor(() => expect(screen.getByText(/enter a valid email address/i)).toBeTruthy());
    expect(lookupUserByEmail).not.toHaveBeenCalled();
  });

  it("shows the fixed miss copy and no nearest matches", async () => {
    lookupUserByEmail.mockResolvedValue({ status: "not_found" });
    render(<EmailLookupPanel onStarted={() => {}} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "nobody@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /find/i }));
    await waitFor(() =>
      expect(screen.getByText("No registered user found with that email")).toBeTruthy()
    );
    expect(screen.queryByText(/did you mean/i)).toBeNull();
    expect(screen.queryByText(/similar/i)).toBeNull();
  });

  it("renders the single match with a start-chat action", async () => {
    lookupUserByEmail.mockResolvedValue(FOUND);
    render(<EmailLookupPanel onStarted={() => {}} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "harsh@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /find/i }));
    await waitFor(() => expect(screen.getByText("Harsh Member")).toBeTruthy());
    expect(screen.getByRole("button", { name: /start chat/i })).toBeTruthy();
  });

  // A rate limit reported as "no such user" tells the user their colleague does not exist.
  it("reports a rate limit distinctly from a miss", async () => {
    lookupUserByEmail.mockResolvedValue({ status: "rate_limited" });
    render(<EmailLookupPanel onStarted={() => {}} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "harsh@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /find/i }));
    await waitFor(() => expect(screen.getByText(/too many lookup attempts/i)).toBeTruthy());
    expect(screen.queryByText("No registered user found with that email")).toBeNull();
  });

  it("reports a server error distinctly from a miss", async () => {
    lookupUserByEmail.mockResolvedValue({ status: "error" });
    render(<EmailLookupPanel onStarted={() => {}} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "harsh@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /find/i }));
    await waitFor(() => expect(screen.getByText(/unable to look up this user/i)).toBeTruthy());
    expect(screen.queryByText("No registered user found with that email")).toBeNull();
  });

  // The mismatch bug: card shows one person, Start chat posts a different address.
  it("clears the hit when the input is edited, so no stale card can be actioned", async () => {
    lookupUserByEmail.mockResolvedValue({
      status: "found",
      contact: { id: "u9", name: "Priya Sharma", avatar: null, email: "priya@example.com" },
    });
    render(<EmailLookupPanel onStarted={() => {}} />);
    const input = screen.getByLabelText(/email/i);

    fireEvent.change(input, { target: { value: "priya@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /find/i }));
    await waitFor(() => expect(screen.getByText("Priya Sharma")).toBeTruthy());

    fireEvent.change(input, { target: { value: "harsh@example.com" } });
    expect(screen.queryByText("Priya Sharma")).toBeNull();
    expect(screen.queryByRole("button", { name: /start chat/i })).toBeNull();
  });

  it("starts the chat with the address the match was resolved from", async () => {
    lookupUserByEmail.mockResolvedValue(FOUND);
    render(<EmailLookupPanel onStarted={() => {}} />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "  Harsh@Example.COM  " },
    });
    fireEvent.click(screen.getByRole("button", { name: /find/i }));
    await waitFor(() => expect(screen.getByText("Harsh Member")).toBeTruthy());
    fireEvent.click(screen.getByRole("button", { name: /start chat/i }));

    await waitFor(() =>
      expect(createDirectConversationByEmail).toHaveBeenCalledWith("harsh@example.com")
    );
  });
});
