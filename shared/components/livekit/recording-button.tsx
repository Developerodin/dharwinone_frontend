"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRoomContext } from "@livekit/components-react";
import {
  fetchRecordingStatus,
  recordingApiError,
  startRoomRecording,
  stopRoomRecording,
} from "./recording-api";
import {
  reconcileRecordingState,
  IDLE_RECORDING_STATE,
  START_GRACE_MS,
  type RecordingUiState,
} from "./recording-state";
import { isRecordingActive } from "./recording-status";

interface RecordingButtonProps {
  roomName: string;
  hostEmail?: string;
  controlBar?: boolean;
  requireStartConfirm?: boolean;
  onRecordingStarted?: () => void;
  onRecordingStopped?: () => void;
}

export type RecordingNoticeKind = "started" | "stopped";

/** Shared Obsidian-style toast for recording start/stop notices. */
export function RecordingNoticeToast({
  kind,
  visible,
}: {
  kind: RecordingNoticeKind;
  visible: boolean;
}) {
  if (!visible) return null;

  const isStarted = kind === "started";
  const message = isStarted
    ? "Recording in progress"
    : "Recording saved — processing, available in Recordings shortly";

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[2000] flex items-center gap-2 px-4 py-2.5 rounded-full"
      style={{
        background: "rgba(11,13,14,0.82)",
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
        border: "1px solid rgba(255,82,82,0.35)",
        boxShadow: "0 12px 32px -8px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,82,82,0.15)",
        color: "#fff",
        fontFamily: "var(--obs-font-mono, ui-monospace, monospace)",
        fontSize: "11px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        maxWidth: "min(420px, calc(100vw - 2rem))",
      }}
      role="status"
      aria-live="polite"
    >
      <span
        className="inline-block w-2 h-2 rounded-full"
        style={{
          background: isStarted ? "#ff5252" : "#34d399",
          boxShadow: isStarted ? "0 0 10px #ff5252" : "0 0 10px #34d399",
          animation: isStarted ? "obsPulse 1.4s ease-in-out infinite" : undefined,
          flexShrink: 0,
        }}
      />
      <span>{message}</span>
    </div>
  );
}

export function RecordingButton({
  roomName,
  hostEmail,
  controlBar = false,
  requireStartConfirm = false,
  onRecordingStarted,
  onRecordingStopped,
}: RecordingButtonProps) {
  useRoomContext();
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [egressId, setEgressId] = useState<string | null>(null);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showStopConfirm, setShowStopConfirm] = useState(false);
  const [showStartConfirm, setShowStartConfirm] = useState(false);
  const [backendConfirmed, setBackendConfirmed] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");
  const stateRef = useRef<RecordingUiState>(IDLE_RECORDING_STATE);

  const applyState = (next: RecordingUiState, fromBackend = false) => {
    stateRef.current = next;
    setIsRecording(next.isRecording);
    setEgressId(next.egressId);
    setRecordingStartTime(next.startTime);
    if (fromBackend && next.isRecording) {
      setBackendConfirmed(true);
    }
    if (!next.isRecording) {
      setBackendConfirmed(false);
    }
  };

  const getStatus = () => fetchRecordingStatus(roomName, Boolean(hostEmail));

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const data = await getStatus();
        applyState(reconcileRecordingState(stateRef.current, data, Date.now()), isRecordingActive(data));
      } catch (err) {
        console.debug("Recording status poll skipped (transient):", err);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomName, hostEmail]);

  useEffect(() => {
    const anchor = recordingStartTime;
    if (!isRecording || anchor == null || !Number.isFinite(anchor)) {
      setElapsedSeconds(0);
      return;
    }
    const tick = () => {
      const elapsed = Math.floor((Date.now() - anchor) / 1000);
      setElapsedSeconds(Number.isFinite(elapsed) ? Math.max(0, elapsed) : 0);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isRecording, recordingStartTime]);

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(t);
  }, [error]);

  const formatDuration = (totalSeconds: number) => {
    const sec = Number.isFinite(totalSeconds) ? Math.max(0, Math.floor(totalSeconds)) : 0;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const withinStartGrace =
    isRecording &&
    recordingStartTime != null &&
    Date.now() - recordingStartTime < START_GRACE_MS;
  const isStarting = isLoading || (withinStartGrace && !backendConfirmed);

  const handleStartRecording = async () => {
    setShowStartConfirm(false);
    setIsLoading(true);
    setError(null);
    setLiveAnnouncement("Starting recording");
    try {
      const data = await startRoomRecording(roomName, hostEmail);
      applyState({ isRecording: true, egressId: data.egressId, startTime: Date.now(), missCount: 0 });
      setLiveAnnouncement("Recording started");
      onRecordingStarted?.();
    } catch (err: unknown) {
      const msg = recordingApiError(err, "Failed to start recording");
      setError(msg);
      setLiveAnnouncement(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopRecording = async () => {
    if (!egressId) {
      const msg = "No active recording found";
      setError(msg);
      setLiveAnnouncement(msg);
      return;
    }
    setShowStopConfirm(false);
    setIsLoading(true);
    setError(null);
    try {
      await stopRoomRecording(egressId, roomName, hostEmail);
      applyState(IDLE_RECORDING_STATE);
      setLiveAnnouncement("Recording stopped");
      onRecordingStopped?.();
    } catch (err: unknown) {
      const msg = recordingApiError(err, "Failed to stop recording");
      setError(msg);
      setLiveAnnouncement(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      setShowStopConfirm(true);
    } else if (requireStartConfirm) {
      setShowStartConfirm(true);
    } else {
      void handleStartRecording();
    }
  };

  const recordIdleIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
    </svg>
  );

  const recordActiveDot = (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: controlBar ? "#f87171" : "#fff",
        flexShrink: 0,
        animation: "pulse 2s infinite",
      }}
    />
  );

  const buttonContent = isStarting ? (
    <span className="lk-recording-action-label">Starting…</span>
  ) : isRecording ? (
    <>
      {recordActiveDot}
      {controlBar ? (
        <>
          <span
            className="lk-recording-timer-label"
            style={{ fontSize: "0.75rem", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}
          >
            REC {formatDuration(elapsedSeconds)}
          </span>
          <span
            className="lk-recording-timer-compact"
            style={{ fontSize: "0.75rem", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}
          >
            ● {formatDuration(elapsedSeconds)}
          </span>
        </>
      ) : (
        <span>Stop Recording</span>
      )}
    </>
  ) : (
    <>
      {recordIdleIcon}
      <span className="lk-recording-action-label">Record</span>
    </>
  );

  const errorToast =
    error &&
    createPortal(
      <div
        role="alert"
        aria-live="assertive"
        style={{
          position: "fixed",
          top: "4.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2500,
          maxWidth: "min(420px, calc(100vw - 2rem))",
          padding: "0.75rem 1rem",
          background: "rgba(127,29,29,0.95)",
          border: "1px solid rgba(248,113,113,0.4)",
          borderRadius: "12px",
          color: "#fecaca",
          fontSize: "0.8125rem",
          fontWeight: 500,
          boxShadow: "0 12px 32px -8px rgba(0,0,0,0.6)",
        }}
      >
        {error}
      </div>,
      document.body
    );

  const toggleLabel = isRecording ? "Stop Recording" : "Start Recording";

  const confirmDialogs = (
    <>
      <RecordingConfirmDialog
        variant="start"
        open={showStartConfirm}
        loading={isLoading}
        onCancel={() => setShowStartConfirm(false)}
        onConfirm={() => void handleStartRecording()}
      />
      <RecordingConfirmDialog
        variant="stop"
        open={showStopConfirm}
        loading={isLoading}
        onCancel={() => setShowStopConfirm(false)}
        onConfirm={() => void handleStopRecording()}
      />
    </>
  );

  const liveRegion = (
    <span className="sr-only" aria-live="polite" aria-atomic="true">
      {liveAnnouncement}
    </span>
  );

  if (controlBar) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        {liveRegion}
        <button
          type="button"
          onClick={handleToggleRecording}
          disabled={isLoading}
          className="lk-button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.375rem",
            padding: "0.625rem 0.75rem",
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.6 : 1,
            backgroundColor: isRecording ? "rgba(239,68,68,0.2)" : undefined,
            color: isRecording ? "#f87171" : undefined,
            whiteSpace: "nowrap",
            fontSize: "inherit",
            lineHeight: "inherit",
          }}
          title={toggleLabel}
          aria-label={toggleLabel}
          aria-pressed={isRecording}
        >
          {buttonContent}
        </button>
        {errorToast}
        {confirmDialogs}
      </div>
    );
  }

  return (
    <div className="recording-control">
      {liveRegion}
      <button
        type="button"
        onClick={handleToggleRecording}
        disabled={isLoading}
        className={`ti-btn inline-flex items-center gap-2 ${isRecording ? "ti-btn-danger" : "ti-btn-primary"} ${isLoading ? "opacity-60" : ""}`}
        title={toggleLabel}
        aria-pressed={isRecording}
      >
        {buttonContent}
      </button>
      {confirmDialogs}
      {error && (
        <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-xs" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

function RecordingConfirmDialog({
  variant,
  open,
  loading,
  onCancel,
  onConfirm,
}: {
  variant: "start" | "stop";
  open: boolean;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open || typeof document === "undefined") return null;

  const isStart = variant === "start";
  const title = isStart ? "Begin recording?" : "Stop the recording?";
  const body = isStart
    ? "Notify all participants and begin recording?"
    : "The file will be saved and added to the recordings list. You can start a new recording at any time.";
  let confirmLabel: string;
  if (loading) {
    confirmLabel = isStart ? "Starting…" : "Stopping…";
  } else {
    confirmLabel = isStart ? "Start recording" : "Stop recording";
  }
  const cancelLabel = isStart ? "Not now" : "Keep recording";
  const badge = isStart ? "RECORDING" : "RECORDING ACTIVE";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`recording-confirm-title-${variant}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        background: "rgba(6,7,10,0.72)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "obsFade 160ms ease-out",
      }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(420px, calc(100vw - 2rem))",
          padding: "1.75rem",
          background: "rgba(20,23,26,0.92)",
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "18px",
          boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
          fontFamily: "var(--obs-font-body, 'Manrope', system-ui, sans-serif)",
          color: "#f4f5f6",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 10px",
            background: "rgba(255,82,82,0.1)",
            border: "1px solid rgba(255,82,82,0.28)",
            borderRadius: "999px",
            fontFamily: "var(--obs-font-mono, ui-monospace, monospace)",
            fontSize: "10px",
            letterSpacing: "0.16em",
            color: "#ff8a8a",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#ff5252",
              boxShadow: "0 0 8px #ff5252",
              animation: "obsPulse 1.4s ease-in-out infinite",
            }}
          />
          {badge}
        </div>
        <h3
          id={`recording-confirm-title-${variant}`}
          style={{
            fontFamily: "var(--obs-font-display, 'Fraunces', serif)",
            fontSize: "1.6rem",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            margin: "0 0 0.5rem",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: "13px", color: "#a8acb1", lineHeight: 1.55, margin: "0 0 1.5rem" }}>{body}</p>
        <div style={{ display: "flex", gap: "0.6rem", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "0.7rem 1.2rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "10px",
              color: "#a8acb1",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
              letterSpacing: "-0.005em",
            }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            style={{
              padding: "0.7rem 1.2rem",
              background: loading
                ? "rgba(120,30,30,0.5)"
                : "linear-gradient(180deg, #ff5252, #d62a2a)",
              border: "1px solid rgba(255,120,120,0.4)",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "-0.005em",
              boxShadow: loading ? "none" : "0 8px 24px -8px rgba(255,82,82,0.5)",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes obsFade { from { opacity: 0; } to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          [style*="obsPulse"] { animation: none !important; }
        }
      `}</style>
    </div>,
    document.body
  );
}
