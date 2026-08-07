import { describe, expect, it } from "vitest";
import {
  MEETING_CHAT_BUTTON_SLOT_ID,
  MEETING_CONTROL_BAR_CONTROLS,
} from "../livekit/stable-video-conference";

describe("StableVideoConference meeting chat", () => {
  it("uses an injected chat slot instead of ControlBar chat prop", () => {
    expect(MEETING_CONTROL_BAR_CONTROLS.chat).toBe(false);
    expect(MEETING_CHAT_BUTTON_SLOT_ID).toBe("chat-button-slot");
  });
});
