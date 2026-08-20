"use client";

import { useState } from "react";
import {
  lookupUserByEmail,
  createDirectConversationByEmail,
  type ContactCard,
} from "@/shared/lib/api/chat";

/** Mirrors the server's Joi .email() shape check so an invalid address never costs a request. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type State =
  | { kind: "empty" }
  | { kind: "invalid" }
  | { kind: "searching" }
  | { kind: "miss" }
  | { kind: "rateLimited" }
  | { kind: "error" }
  // matchedEmail is the exact normalised address this contact was resolved FROM. Start chat sends
  // it, never the live input: otherwise editing the box after a hit shows Priya's card while
  // posting Harsh's address. Any input change clears the hit outright, so the two cannot diverge.
  | { kind: "hit"; contact: ContactCard; matchedEmail: string };

/**
 * Exact-email discovery for roles with no Contact Directory. Spec §7.2.
 *
 * Three constraints carry FR-09/10/11 into the DOM:
 *   1. autoComplete="off"
 *   2. SUBMIT ONLY — no debounced on-change request. A keystroke-triggered lookup is an
 *      autocomplete regardless of what the backend returns, and would exhaust the rate limit
 *      in seconds.
 *   3. No "did you mean" / nearest-match rendering on the miss branch.
 */
export default function EmailLookupPanel({
  onStarted,
}: {
  onStarted: (conversationId: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "empty" });

  /** Any edit invalidates a standing hit, so the card can never describe a different address. */
  const onEmailChange = (next: string) => {
    setEmail(next);
    setState({ kind: "empty" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value) return setState({ kind: "empty" });
    if (!EMAIL_RE.test(value)) return setState({ kind: "invalid" });

    setState({ kind: "searching" });
    const result = await lookupUserByEmail(value);
    switch (result.status) {
      case "found":
        return setState({ kind: "hit", contact: result.contact, matchedEmail: value });
      case "not_found":
        return setState({ kind: "miss" });
      case "rate_limited":
        return setState({ kind: "rateLimited" });
      default:
        return setState({ kind: "error" });
    }
  };

  const start = async () => {
    if (state.kind !== "hit") return;
    // Send state.matchedEmail — the address this card was resolved from — not the live input and
    // not state.contact.id. The server re-resolves it. Spec §5.4.
    const conv = await createDirectConversationByEmail(state.matchedEmail);
    onStarted(conv.id);
  };

  return (
    <div className="p-3">
      <form onSubmit={submit} noValidate>
        <label htmlFor="contact-email" className="block mb-2 text-sm font-medium">
          Enter the person&apos;s complete registered email address
        </label>
        <div className="flex gap-2">
          <input
            id="contact-email"
            type="email"
            autoComplete="off"
            className="form-control flex-1"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
          <button type="submit" className="ti-btn ti-btn-primary">
            Find
          </button>
        </div>
      </form>

      <div className="mt-3 text-sm">
        {state.kind === "empty" && (
          <p className="text-defaulttextcolor/60">Enter a full email address</p>
        )}
        {state.kind === "invalid" && <p className="text-danger">Enter a valid email address</p>}
        {state.kind === "miss" && (
          <p className="text-defaulttextcolor/60">No registered user found with that email</p>
        )}
        {/* Distinct from "miss": the backend's rate limiting is real security behaviour, and
            reporting it as "no such user" would tell the user their colleague does not exist. */}
        {state.kind === "rateLimited" && (
          <p className="text-warning">Too many lookup attempts. Try again later.</p>
        )}
        {state.kind === "error" && (
          <p className="text-danger">Unable to look up this user. Please try again.</p>
        )}
        {state.kind === "hit" && (
          <div className="flex items-center gap-3">
            <span className="avatar avatar-sm avatar-rounded flex-shrink-0">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  state.contact.name
                )}&size=40`}
                alt=""
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="mb-0 font-medium truncate">{state.contact.name}</p>
              <p className="text-[0.75rem] text-defaulttextcolor/60 truncate">
                {state.contact.email}
              </p>
            </div>
            <button type="button" className="ti-btn ti-btn-primary" onClick={start}>
              Start chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
