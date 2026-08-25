import { describe, it, expect } from "vitest";
import {
  callId, callNumber, callName, callDirection, isMissed, hasRecording, fmtDuration,
  filterRecents, missedCount, matchesSearch, sortWithPins,
  callStatusLabel, normalizeCallStatus, matchesCallUpdate, mergeCallUpdate,
} from "../recentCalls";
import type { CallRecord } from "@/shared/lib/api/bolna";

const mk = (o: Partial<CallRecord>): CallRecord => ({ ...o });

describe("recentCalls helpers", () => {
  it("derives id, number, name", () => {
    expect(callId(mk({ _id: "a" }))).toBe("a");
    expect(callId(mk({ id: "b" }))).toBe("b");
    expect(callNumber(mk({ toPhoneNumber: "+911", recipientPhoneNumber: "+912" }))).toBe("+911");
    expect(callNumber(mk({ phone: "+913" }))).toBe("+913");
    expect(callName(mk({ displayName: "John", phone: "+91" }))).toBe("John");
    expect(callName(mk({ businessName: "Acme", phone: "+91" }))).toBe("Acme");
    expect(callName(mk({ phone: "+9199" }))).toBe("+9199");
  });

  it("derives direction and missed", () => {
    expect(callDirection(mk({ telephonyData: { direction: "inbound" } }))).toBe("inbound");
    expect(callDirection(mk({}))).toBe("unknown");
    expect(isMissed(mk({ status: "no-answer", telephonyData: { direction: "inbound" } }))).toBe(true);
    expect(isMissed(mk({ status: "completed", telephonyData: { direction: "inbound" } }))).toBe(false);
    expect(isMissed(mk({ status: "failed", telephonyData: { direction: "outbound" } }))).toBe(false);
    expect(hasRecording(mk({ recordingUrl: "http://x" }))).toBe(true);
    expect(hasRecording(mk({}))).toBe(false);
    expect(fmtDuration(252)).toBe("4m 12s");
    expect(fmtDuration(0)).toBe("");
  });

  it("filters and counts", () => {
    const recs = [
      mk({ _id: "1", telephonyData: { direction: "inbound" }, status: "no-answer" }),
      mk({ _id: "2", telephonyData: { direction: "outbound" }, recordingUrl: "u" }),
      mk({ _id: "3", telephonyData: { direction: "inbound" }, status: "completed" }),
    ];
    expect(filterRecents(recs, "all")).toHaveLength(3);
    expect(filterRecents(recs, "inbound").map(callId)).toEqual(["1", "3"]);
    expect(filterRecents(recs, "outbound").map(callId)).toEqual(["2"]);
    expect(filterRecents(recs, "recorded").map(callId)).toEqual(["2"]);
    expect(missedCount(recs)).toBe(1);
  });

  it("matches search on name and number", () => {
    const r = mk({ displayName: "Sarah Lee", phone: "+919876543210" });
    expect(matchesSearch(r, "sarah")).toBe(true);
    expect(matchesSearch(r, "98765")).toBe(true);
    expect(matchesSearch(r, "zzz")).toBe(false);
    expect(matchesSearch(r, "")).toBe(true);
  });

  it("splits pinned from rest preserving order", () => {
    const recs = [mk({ _id: "1" }), mk({ _id: "2" }), mk({ _id: "3" })];
    const { pinned, rest } = sortWithPins(recs, ["3", "1"]);
    expect(pinned.map(callId)).toEqual(["3", "1"]);
    expect(rest.map(callId)).toEqual(["2"]);
  });

  it("maps lifecycle statuses to readable badge labels", () => {
    expect(callStatusLabel("initiated")).toBe("Initiated");
    expect(callStatusLabel("ringing")).toBe("Ringing");
    expect(callStatusLabel("in_progress")).toBe("In progress");
    expect(callStatusLabel("in-progress")).toBe("In progress");
    expect(callStatusLabel("completed")).toBe("Completed");
    expect(callStatusLabel("no_answer")).toBe("No answer");
    expect(callStatusLabel("no-answer")).toBe("No answer");
    expect(callStatusLabel("missed")).toBe("Missed");
    expect(callStatusLabel("busy")).toBe("Busy");
    expect(callStatusLabel("failed")).toBe("Failed");
    expect(callStatusLabel("canceled")).toBe("Canceled");
    expect(normalizeCallStatus("queued")).toBe("initiated");
  });

  it("merges socket call:update deltas monotonically", () => {
    const rec = mk({ _id: "1", executionId: "CA123", status: "ringing", duration: 0 });
    expect(matchesCallUpdate(rec, { executionId: "CA123", status: "in_progress" })).toBe(true);
    const progressed = mergeCallUpdate(rec, { executionId: "CA123", status: "in_progress", duration: 12 });
    expect(progressed.status).toBe("in_progress");
    expect(progressed.duration).toBe(12);
    const stale = mergeCallUpdate(progressed, { executionId: "CA123", status: "ringing", statusRank: 2 });
    expect(stale.status).toBe("in_progress");
    const done = mergeCallUpdate(progressed, { executionId: "CA123", status: "completed", statusRank: 10, duration: 45 });
    expect(done.status).toBe("completed");
    expect(done.duration).toBe(45);
  });

  it("hydrates executionId and matches executionId-only socket deltas", () => {
    const rec = mk({ _id: "1", status: "initiated" });
    const ringing = mergeCallUpdate(rec, { id: "1", executionId: "CA123", status: "ringing" });
    expect(ringing.executionId).toBe("CA123");
    expect(ringing.status).toBe("ringing");
    expect(matchesCallUpdate(ringing, { executionId: "CA123", status: "in_progress" })).toBe(true);
    const progressed = mergeCallUpdate(ringing, { executionId: "CA123", status: "in_progress" });
    expect(progressed.status).toBe("in_progress");
    expect(matchesCallUpdate(rec, { executionId: "CA123", status: "ringing" })).toBe(false);
    expect(matchesCallUpdate(mk({ _id: "CA123", status: "initiated" }), { executionId: "CA123", status: "ringing" })).toBe(true);
  });
});
