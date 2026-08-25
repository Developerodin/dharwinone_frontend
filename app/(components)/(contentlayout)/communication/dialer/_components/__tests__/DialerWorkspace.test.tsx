import { it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor, within } from "@testing-library/react";
import DialerWorkspace from "../DialerWorkspace";

const callUpdateHandlers = new Set<(evt: { id?: string; executionId?: string; status?: string }) => void>();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock("@/shared/lib/api/bolna", () => ({
  getBolnaCallRecords: vi.fn().mockResolvedValue({
    success: true,
    records: [
      {
        _id: "1", displayName: "Jane", toPhoneNumber: "+911", status: "initiated",
        telephonyData: { direction: "outbound" }, createdAt: "2026-07-01T08:00:00Z",
      },
    ],
    total: 1, totalPages: 1, page: 1, limit: 50,
  }),
  getBolnaCallRecord: vi.fn(),
  getCallRecordings: vi.fn().mockResolvedValue({
    success: true,
    executionId: "x",
    recordings: { bolna: { available: false }, plivo: { available: false } },
  }),
}));
vi.mock("@/shared/contexts/ChatSocketContext", () => ({
  useChatSocket: () => ({
    onCallUpdate: (cb: (evt: { id?: string; executionId?: string; status?: string }) => void) => {
      callUpdateHandlers.add(cb);
      return () => { callUpdateHandlers.delete(cb); };
    },
  }),
}));
vi.mock("@/shared/lib/api/contacts", () => ({
  listContacts: vi.fn().mockResolvedValue({ results: [{ id: "1", tenantId: "t", ownerId: "o", name: "Anita", phones: [{ number: "+91 1", isPrimary: true }] }], page: 1, limit: 50, totalPages: 1, totalResults: 1 }),
  createContact: vi.fn(), updateContact: vi.fn(), deleteContact: vi.fn(),
  getContactCalls: vi.fn().mockResolvedValue([]),
}));
// Dialpad pulls in telephony SDKs; stub it for the workspace test.
vi.mock("@/app/(components)/(contentlayout)/communication/calling/_components/Dialpad", () => ({
  default: () => <div data-testid="dialpad" />,
}));

beforeEach(() => {
  vi.clearAllMocks();
  callUpdateHandlers.clear();
});
afterEach(cleanup);

function emitCallUpdate(evt: { id?: string; executionId?: string; status?: string }) {
  callUpdateHandlers.forEach((cb) => cb(evt));
}

it("updates the selected call detail badge from socket deltas without reselection", async () => {
  render(<DialerWorkspace />);
  fireEvent.click(await screen.findByRole("button", { name: /jane/i }));
  const detail = screen.getByRole("button", { name: /^call$/i }).closest("div.flex.h-full.flex-col") as HTMLElement;
  const panel = within(detail);
  expect(await panel.findByLabelText(/call status: initiated/i)).toBeInTheDocument();

  emitCallUpdate({ id: "1", executionId: "CA123", status: "ringing" });
  await waitFor(() => expect(panel.getByLabelText(/call status: ringing/i)).toBeInTheDocument());
  expect(panel.queryByLabelText(/call status: initiated/i)).not.toBeInTheDocument();

  emitCallUpdate({ executionId: "CA123", status: "in_progress" });
  await waitFor(() => expect(panel.getByLabelText(/call status: in progress/i)).toBeInTheDocument());

  emitCallUpdate({ executionId: "CA123", status: "completed", duration: 42 });
  await waitFor(() => expect(panel.getByLabelText(/call status: completed/i)).toBeInTheDocument());
});

it("switches to Contacts view and opens a contact in the right pane", async () => {
  render(<DialerWorkspace />);
  fireEvent.click(await screen.findByRole("button", { name: /^contacts$/i }));
  fireEvent.click(await screen.findByRole("button", { name: /open anita/i }));
  // Right pane now shows the contact detail (Edit button is unique to ContactContextPanel read view)
  expect(await screen.findByRole("button", { name: /^edit$/i })).toBeInTheDocument();
});

it("New contact opens a blank create form", async () => {
  render(<DialerWorkspace />);
  fireEvent.click(await screen.findByRole("button", { name: /^contacts$/i }));
  fireEvent.click(await screen.findByRole("button", { name: /new contact/i }));
  expect(await screen.findByText(/new contact/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /^create$/i })).toBeInTheDocument();
});
