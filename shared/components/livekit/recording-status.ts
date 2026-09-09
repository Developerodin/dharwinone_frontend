import type { RecordingStatusLike } from "./recording-state";

/** True when the room has an active egress according to a status poll response. */
export function isRecordingActive(data: RecordingStatusLike): boolean {
  if (data.recordings && data.recordings.length > 0) return true;
  return Boolean(data.isRecording);
}
