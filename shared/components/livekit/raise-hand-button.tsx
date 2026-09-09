"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useMeetingRaiseHand } from "@/shared/hooks/use-meeting-raise-hand";

export const MEETING_RAISE_HAND_BUTTON_SLOT_ID = "raise-hand-button-slot";

const LEAVE_BUTTON_SELECTOR =
  ".lk-disconnect-button, [data-lk-disconnect], button[aria-label*='Leave'], button[aria-label*='Disconnect']";

/** Portals raise-hand control into `.lk-control-bar` (after screen share, before chat). */
export function MeetingControlBarRaiseHand({ narrow }: { narrow: boolean }) {
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const { localHandRaised, toggleHand } = useMeetingRaiseHand();
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    const tryInject = () => {
      const bar = document.querySelector(
        ".lk-video-conference > .lk-control-bar"
      ) as HTMLElement | null;
      if (!bar) return false;

      let handSlot = document.getElementById(MEETING_RAISE_HAND_BUTTON_SLOT_ID);
      if (!handSlot) {
        handSlot = document.createElement("div");
        handSlot.id = MEETING_RAISE_HAND_BUTTON_SLOT_ID;
        handSlot.style.cssText =
          "display:flex;align-items:center;order:75;flex-shrink:0;";

        const chatSlot = document.getElementById("chat-button-slot");
        if (chatSlot) {
          bar.insertBefore(handSlot, chatSlot);
        } else {
          const leaveBtn = bar.querySelector(LEAVE_BUTTON_SELECTOR);
          if (leaveBtn) {
            bar.insertBefore(handSlot, leaveBtn);
          } else {
            bar.appendChild(handSlot);
          }
        }
      }
      const chatSlot = document.getElementById("chat-button-slot");
      if (chatSlot && handSlot.parentElement === bar && handSlot.nextElementSibling !== chatSlot) {
        bar.insertBefore(handSlot, chatSlot);
      }
      setSlot(handSlot);
      return true;
    };

    if (tryInject()) return;
    const timer = window.setInterval(() => {
      if (tryInject()) window.clearInterval(timer);
    }, 300);
    return () => window.clearInterval(timer);
  }, []);

  const handleToggle = async () => {
    if (isToggling) return;
    setIsToggling(true);
    try {
      await toggleHand();
    } finally {
      setIsToggling(false);
    }
  };

  if (!slot) return null;

  return createPortal(
    <button
      type="button"
      className="lk-button meeting-raise-hand-btn"
      aria-pressed={localHandRaised}
      aria-busy={isToggling}
      aria-label={localHandRaised ? "Lower hand" : "Raise hand"}
      disabled={isToggling}
      onClick={() => {
        void handleToggle();
      }}
    >
      <i className="ri-hand" aria-hidden="true" />
      {!narrow && <span>{localHandRaised ? "Lower hand" : "Raise hand"}</span>}
    </button>,
    slot
  );
}

