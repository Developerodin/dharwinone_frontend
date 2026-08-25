import { it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import ContactContextPanel from "../ContactContextPanel";
import { blankDraft, draftFromCall } from "../../_lib/contactView";
import type { Contact } from "@/shared/lib/api/contacts";

vi.mock("@/shared/lib/api/contacts", () => ({
  createContact: vi.fn().mockResolvedValue({ contact: { id: "new", name: "Jane", phones: [{ number: "+91 5", isPrimary: true }] }, suggestedLink: null }),
  updateContact: vi.fn().mockImplementation((id, patch) => Promise.resolve({ id, ...patch })),
  deleteContact: vi.fn().mockResolvedValue(undefined),
  getContactCalls: vi.fn().mockResolvedValue([]),
}));

const contact: Contact = {
  id: "1", tenantId: "t", ownerId: "o", name: "Anita", company: "Acme",
  doNotCall: true, tags: ["Lead"], notes: "call back",
  linkedTo: { type: "candidate", id: "cand1" },
  phones: [{ label: "mobile", number: "+91 98765 43210", isPrimary: true }],
};

const base = {
  contact, initialDraft: null, visibleNumbers: [] as string[],
  onCall: vi.fn(), onEdit: vi.fn(), onCancel: vi.fn(),
  onSaved: vi.fn(), onDeleted: vi.fn(), onDirtyChange: vi.fn(),
};

beforeEach(() => vi.clearAllMocks());
afterEach(cleanup); // repo has no global cleanup; multi-render files must unmount between tests

it("read mode renders detail, linked, dials primary", () => {
  const onCall = vi.fn();
  render(<ContactContextPanel {...base} mode="read" onCall={onCall} />);
  expect(screen.getByText("Anita")).toBeInTheDocument();
  expect(screen.getByText("Lead")).toBeInTheDocument();
  expect(screen.getByText(/candidate/)).toBeInTheDocument();       // linked label
  fireEvent.click(screen.getByRole("button", { name: /^call$/i }));
    expect(onCall).toHaveBeenCalledWith("+91 98765 43210", "Anita");
});

it("delete shows inline confirm then calls deleteContact", async () => {
  const { deleteContact } = await import("@/shared/lib/api/contacts");
  render(<ContactContextPanel {...base} mode="read" />);
  fireEvent.click(screen.getByRole("button", { name: /^delete$/i }));
  fireEvent.click(screen.getByRole("button", { name: /^delete anita$/i })); // confirm
  await waitFor(() => expect(deleteContact).toHaveBeenCalledWith("1"));
});

it("create mode autofocuses name and blocks save when invalid", async () => {
  const { createContact } = await import("@/shared/lib/api/contacts");
  render(<ContactContextPanel {...base} mode="create" contact={null} initialDraft={blankDraft()} />);
  const name = screen.getByLabelText(/^name/i);
  expect(document.activeElement).toBe(name);
  fireEvent.click(screen.getByRole("button", { name: /^create$/i }));
  expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
  expect(createContact).not.toHaveBeenCalled();
});

it("create from a call prefills and saves", async () => {
  const { createContact } = await import("@/shared/lib/api/contacts");
  const onSaved = vi.fn();
  render(<ContactContextPanel {...base} mode="create" contact={null} onSaved={onSaved}
    initialDraft={draftFromCall({ name: "Jane", number: "+91 5", callId: "call1" })} />);
  fireEvent.click(screen.getByRole("button", { name: /^create$/i }));
  await waitFor(() => expect(createContact).toHaveBeenCalled());
  const body = (createContact as ReturnType<typeof vi.fn>).mock.calls[0][0];
  expect(body).toMatchObject({ name: "Jane", source: "from_call", sourceCallId: "call1", autoSuggestLink: false });
  await waitFor(() => expect(onSaved).toHaveBeenCalled());
});

it("duplicate number surfaces a non-blocking warning", async () => {
  render(<ContactContextPanel {...base} mode="create" contact={null}
    visibleNumbers={["915"]} initialDraft={draftFromCall({ name: "Jane", number: "+91 5", callId: "c" })} />);
  expect(await screen.findByText(/already exists in another contact/i)).toBeInTheDocument();
  // still allows create
  expect(screen.getByRole("button", { name: /^create$/i })).not.toBeDisabled();
});

it("phone box holds only national digits; the country select composes the full number", async () => {
  const { createContact } = await import("@/shared/lib/api/contacts");
  render(<ContactContextPanel {...base} mode="create" contact={null} initialDraft={blankDraft()} />);
  fireEvent.change(screen.getByLabelText(/^name/i), { target: { value: "Sam" } });
  const numberInput = screen.getByLabelText("Phone 1 number") as HTMLInputElement;
  fireEvent.change(numberInput, { target: { value: "9876543210" } });
  expect(numberInput.value).toBe("9876543210"); // no dial code baked into the box
  fireEvent.click(screen.getByRole("button", { name: /^create$/i }));
  await waitFor(() => expect(createContact).toHaveBeenCalled());
  const body = (createContact as ReturnType<typeof vi.fn>).mock.calls[0][0];
  expect(body.phones[0].number).toBe("+919876543210"); // default country IN
  expect(body.phones[0]).not.toHaveProperty("label");
});

it("mobile/work/other are optional tag suggestions, not a required phone-type dropdown", () => {
  render(<ContactContextPanel {...base} mode="create" contact={null} initialDraft={blankDraft()} />);
  expect(screen.queryByLabelText(/Phone 1 label/i)).not.toBeInTheDocument();
  expect(screen.getByLabelText("Phone 1 country code")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "+ mobile" }));
  expect(screen.getByText("mobile")).toBeInTheDocument(); // added as a removable tag chip
});
