"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Participant } from "livekit-client";
import {
  isParticipantHandRaised,
  participantDisplayName,
} from "@/shared/hooks/use-meeting-raise-hand";

const HAND_TOAST_DURATION_MS = 4000;
const HAND_LOWER_TOAST_DURATION_MS = 3000;
const HAND_TOAST_MAX_VISIBLE = 3;

type HandToast = {
  id: string;
  participantId: string;
  message: string;
  durationMs: number;
};

function handRaiseToastMessage(participant: Participant): string {
  if (participant.isLocal) return "You raised your hand";
  return `${participantDisplayName(participant)} raised their hand`;
}

function handLowerToastMessage(participant: Participant): string {
  if (participant.isLocal) return "You lowered your hand";
  return `${participantDisplayName(participant)} lowered their hand`;
}

function buildHandStates(participants: Participant[]): Record<string, boolean> {
  const map: Record<string, boolean> = {};
  for (const participant of participants) {
    map[participant.identity] = isParticipantHandRaised(participant.metadata);
  }
  return map;
}

export function MeetingHandToastStack({
  participants,
}: {
  participants: Participant[];
}) {
  const [toasts, setToasts] = useState<HandToast[]>([]);
  const initializedRef = useRef(false);
  const prevHandStatesRef = useRef<Record<string, boolean>>({});
  const toastTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const handStates = useMemo(() => buildHandStates(participants), [participants]);

  const enqueueToast = useCallback(
    (participantId: string, kind: "raise" | "lower") => {
      const participant = participants.find((p) => p.identity === participantId);
      if (!participant) return;

      const message =
        kind === "raise"
          ? handRaiseToastMessage(participant)
          : handLowerToastMessage(participant);
      const durationMs =
        kind === "raise" ? HAND_TOAST_DURATION_MS : HAND_LOWER_TOAST_DURATION_MS;
      const id = `${participantId}-${kind}-${Date.now()}`;

      setToasts((prev) => {
        const withoutSame = prev.filter(
          (toast) => toast.participantId !== participantId
        );
        return [...withoutSame, { id, participantId, message, durationMs }].slice(
          -HAND_TOAST_MAX_VISIBLE
        );
      });

      const existingTimer = toastTimersRef.current.get(participantId);
      if (existingTimer) clearTimeout(existingTimer);

      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
        toastTimersRef.current.delete(participantId);
      }, durationMs);

      toastTimersRef.current.set(participantId, timer);
    },
    [participants]
  );

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      prevHandStatesRef.current = { ...handStates };
      return;
    }

    for (const participant of participants) {
      const wasRaised = prevHandStatesRef.current[participant.identity] ?? false;
      const isRaised = handStates[participant.identity] ?? false;
      if (!wasRaised && isRaised) {
        enqueueToast(participant.identity, "raise");
      } else if (wasRaised && !isRaised) {
        enqueueToast(participant.identity, "lower");
      }
    }

    prevHandStatesRef.current = { ...handStates };
  }, [handStates, participants, enqueueToast]);

  useEffect(() => {
    const timers = toastTimersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      className="meeting-hand-toast-stack"
      aria-live="polite"
      aria-atomic="false"
      role="status"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="meeting-hand-toast">
          <span className="meeting-hand-toast-icon" aria-hidden="true">
            <i className="ri-hand" />
          </span>
          <span className="meeting-hand-toast-message">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
