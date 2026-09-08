import { describe, it, expect } from "vitest";
import { isRecordingActive } from "./recording-status";

describe("isRecordingActive", () => {
  it("returns true when recordings array is non-empty", () => {
    expect(
      isRecordingActive({
        isRecording: false,
        recordings: [{ egressId: "eg_1", startedAt: null }],
      })
    ).toBe(true);
  });

  it("returns true when isRecording flag is set", () => {
    expect(isRecordingActive({ isRecording: true })).toBe(true);
  });

  it("returns false when idle", () => {
    expect(isRecordingActive({ isRecording: false, recordings: [] })).toBe(false);
  });
});
