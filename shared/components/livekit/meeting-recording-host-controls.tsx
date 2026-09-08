"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  RecordingButton,
  RecordingNoticeToast,
  type RecordingNoticeKind,
} from "./recording-button";

const RECORDING_NOTICE_MS = 4000;

function useRecordingControlBarSlot(): HTMLElement | null {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const tryInject = () => {
      const bar = document.querySelector(".lk-control-bar");
      if (!bar) return false;
      let el = document.getElementById("recording-button-slot");
      if (!el) {
        el = document.createElement("div");
        el.id = "recording-button-slot";
        el.style.cssText = "display:flex;align-items:center;order:70;";
        const leaveBtn = bar.querySelector(
          ".lk-disconnect-button, [data-lk-disconnect], button[aria-label*='Leave'], button[aria-label*='Disconnect']"
        );
        if (leaveBtn) {
          bar.insertBefore(el, leaveBtn);
        } else {
          bar.appendChild(el);
        }
      }
      setSlot(el);
      return true;
    };
    if (tryInject()) return;
    const timer = setInterval(() => {
      if (tryInject()) clearInterval(timer);
    }, 300);
    return () => clearInterval(timer);
  }, []);

  return slot;
}

function useRecordingNotice() {
  const [notice, setNotice] = useState<RecordingNoticeKind | null>(null);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), RECORDING_NOTICE_MS);
    return () => clearTimeout(t);
  }, [notice]);

  return {
    notice,
    onRecordingStarted: () => setNotice("started"),
    onRecordingStopped: () => setNotice("stopped"),
  };
}

export interface MeetingRecordingHostControlsProps {
  enabled: boolean;
  roomName: string;
  hostEmail?: string;
  requireStartConfirm?: boolean;
  /** When true, the host-only start/stop toast renders only for the host. */
  hostOnlyNotice?: boolean;
  isHost?: boolean;
}

/** Injects the recording control into the LiveKit control bar and shows host notices. */
export function MeetingRecordingHostControls({
  enabled,
  roomName,
  hostEmail,
  requireStartConfirm = true,
  hostOnlyNotice = false,
  isHost = false,
}: MeetingRecordingHostControlsProps) {
  const slot = useRecordingControlBarSlot();
  const { notice, onRecordingStarted, onRecordingStopped } = useRecordingNotice();

  const showButton = enabled && slot;
  const showNotice = notice && (!hostOnlyNotice || isHost);

  return (
    <>
      {showButton &&
        createPortal(
          <RecordingButton
            roomName={roomName}
            hostEmail={hostEmail}
            controlBar
            requireStartConfirm={requireStartConfirm}
            onRecordingStarted={onRecordingStarted}
            onRecordingStopped={onRecordingStopped}
          />,
          slot
        )}
      {showNotice && <RecordingNoticeToast kind={notice} visible />}
    </>
  );
}
