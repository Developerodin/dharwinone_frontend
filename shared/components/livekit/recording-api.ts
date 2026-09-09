import * as livekitApi from "@/shared/lib/api/livekit";

/** Poll recording status via the public (no auth) or authenticated endpoint. */
export function fetchRecordingStatus(roomName: string, usePublicApi = false) {
  return usePublicApi
    ? livekitApi.getRecordingStatusPublic(roomName)
    : livekitApi.getRecordingStatus(roomName);
}

export function startRoomRecording(roomName: string, hostEmail?: string) {
  return hostEmail
    ? livekitApi.startRecordingPublic(roomName, hostEmail)
    : livekitApi.startRecording(roomName);
}

export function stopRoomRecording(egressId: string, roomName: string, hostEmail?: string) {
  return hostEmail
    ? livekitApi.stopRecordingPublic(egressId, roomName, hostEmail)
    : livekitApi.stopRecording(egressId, roomName);
}

export function recordingApiError(err: unknown, fallback: string): string {
  const e = err as { response?: { data?: { message?: string } }; message?: string };
  return e?.response?.data?.message || e?.message || fallback;
}
