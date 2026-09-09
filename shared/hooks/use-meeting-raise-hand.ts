"use client";

import { useCallback, useMemo } from "react";
import { useLocalParticipant, useParticipants } from "@livekit/components-react";
import type { Participant } from "livekit-client";

type MeetingParticipantMeta = {
  handRaised?: boolean;
};

function parseHandMetadata(raw: string | undefined): MeetingParticipantMeta {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as MeetingParticipantMeta;
    }
  } catch {
    // Non-JSON metadata — treat as no hand state.
  }
  return {};
}

export function isParticipantHandRaised(metadata: string | undefined): boolean {
  return parseHandMetadata(metadata).handRaised === true;
}

function buildHandMetadata(prev: string | undefined, handRaised: boolean): string {
  const existing = parseHandMetadata(prev);
  return JSON.stringify({ ...existing, handRaised });
}

export function participantDisplayName(participant: Participant): string {
  if (participant.isLocal) return "You";
  const name = participant.name?.trim();
  return name || participant.identity;
}

export function useMeetingRaiseHand() {
  const { localParticipant } = useLocalParticipant();
  const participants = useParticipants();

  const handStates = useMemo(() => {
    const map: Record<string, boolean> = {};
    for (const participant of participants) {
      map[participant.identity] = isParticipantHandRaised(participant.metadata);
    }
    return map;
  }, [participants]);

  const localHandRaised = handStates[localParticipant.identity] ?? false;

  const toggleHand = useCallback(async (): Promise<boolean> => {
    const next = !localHandRaised;
    try {
      await localParticipant.setMetadata(
        buildHandMetadata(localParticipant.metadata, next)
      );
      return true;
    } catch (error) {
      console.warn("[useMeetingRaiseHand] Failed to update hand state:", error);
      return false;
    }
  }, [localHandRaised, localParticipant]);

  return {
    participants,
    handStates,
    localHandRaised,
    toggleHand,
  };
}
