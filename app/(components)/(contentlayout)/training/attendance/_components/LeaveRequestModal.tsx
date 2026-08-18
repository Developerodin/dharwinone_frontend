"use client";

import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createLeaveRequest } from "@/shared/lib/api/leave-requests";

function parseYmdLocal(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

type LeaveRequestForm = {
  fromDate: string;
  toDate: string;
  leaveType: "casual" | "sick" | "unpaid";
  notes: string;
};

export interface LeaveRequestModalProps {
  open: boolean;
  onClose: () => void;
  studentId: string | null;
  weekOffDays?: string[];
  onSuccess?: () => void;
}

export default function LeaveRequestModal({
  open,
  onClose,
  studentId,
  weekOffDays = [],
  onSuccess,
}: LeaveRequestModalProps) {
  const [leaveRequestForm, setLeaveRequestForm] = useState<LeaveRequestForm>({
    fromDate: "",
    toDate: "",
    leaveType: "casual",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const isWeekOffDay = useCallback(
    (date: Date) => {
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      if (weekOffDays.length === 0) return dayName === "Saturday" || dayName === "Sunday";
      return weekOffDays.includes(dayName);
    },
    [weekOffDays]
  );

  useEffect(() => {
    if (!open) return;
    setLeaveRequestForm({ fromDate: "", toDate: "", leaveType: "casual", notes: "" });
  }, [open]);

  const updateLeaveRequestForm = (field: keyof LeaveRequestForm, value: string) => {
    setLeaveRequestForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    if (!submitting) onClose();
  };

  const handleSubmitLeaveRequest = async () => {
    if (!studentId) return;
    const { fromDate, toDate, leaveType, notes } = leaveRequestForm;
    if (!fromDate || !toDate) {
      await Swal.fire({ icon: "warning", title: "Validation", text: "Please select From date and To date." });
      return;
    }
    const from = parseYmdLocal(fromDate);
    const to = parseYmdLocal(toDate);
    if (!from || !to || isNaN(from.getTime()) || isNaN(to.getTime())) {
      await Swal.fire({ icon: "warning", title: "Validation", text: "Invalid date range." });
      return;
    }
    if (to < from) {
      await Swal.fire({ icon: "warning", title: "Validation", text: "To date must be on or after From date." });
      return;
    }
    const pad = (n: number) => String(n).padStart(2, "0");
    const dates: string[] = [];
    const current = new Date(from);
    current.setHours(0, 0, 0, 0);
    const end = new Date(to);
    end.setHours(0, 0, 0, 0);
    while (current <= end) {
      if (!isWeekOffDay(current)) {
        dates.push(`${current.getFullYear()}-${pad(current.getMonth() + 1)}-${pad(current.getDate())}`);
      }
      current.setDate(current.getDate() + 1);
    }
    if (dates.length === 0) {
      await Swal.fire({ icon: "warning", title: "No working days", text: "The selected range has no working days (weekends/week-off excluded)." });
      return;
    }
    setSubmitting(true);
    try {
      await createLeaveRequest(studentId, {
        dates,
        leaveType,
        notes: notes.trim() || undefined,
      });
      await Swal.fire({ icon: "success", title: "Request Submitted", text: "Your leave request has been submitted. An admin will review it shortly.", confirmButtonText: "OK" });
      onClose();
      onSuccess?.();
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? (e as Error).message ?? "Failed to submit leave request.";
      await Swal.fire({ icon: "error", title: "Error", text: msg });
    } finally {
      setSubmitting(false);
    }
  };

  if (!open || !studentId) return null;

  return (
    <div className="fixed inset-0 z-[105] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="leave-modal-title">
      <style>{`
        @keyframes leave-modal-backdrop { from { opacity: 0; } to { opacity: 1; } }
        @keyframes leave-modal-enter {
          from { opacity: 0; transform: scale(0.96) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes leave-modal-stagger { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .leave-modal-backdrop { animation: leave-modal-backdrop 0.2s ease-out forwards; }
        .leave-modal-panel { animation: leave-modal-enter 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .leave-modal-stagger-1 { animation: leave-modal-stagger 0.35s ease-out 0.05s both; }
        .leave-modal-stagger-2 { animation: leave-modal-stagger 0.35s ease-out 0.1s both; }
        .leave-modal-stagger-3 { animation: leave-modal-stagger 0.35s ease-out 0.15s both; }
        .leave-modal-stagger-4 { animation: leave-modal-stagger 0.35s ease-out 0.2s both; }
        .leave-modal-stagger-5 { animation: leave-modal-stagger 0.35s ease-out 0.25s both; }
        .leave-type-card:focus-visible { outline: 2px solid rgba(20, 184, 166, 0.6); outline-offset: 2px; }
      `}</style>
      <div className="flex min-h-full items-start justify-center p-4 pt-[8vh] pb-8">
        <div
          className="fixed inset-0 bg-black/55 backdrop-blur-[2px] leave-modal-backdrop"
          onClick={handleClose}
          aria-hidden
        />
        <div className="relative w-full max-w-[28rem] flex flex-col max-h-[85vh] leave-modal-panel rounded-2xl border border-defaultborder/70 dark:border-white/[0.08] bg-white dark:bg-bodybg shadow-xl dark:shadow-black/30 overflow-hidden">
          <div className="relative border-b border-defaultborder/60 bg-gradient-to-br from-teal-50/80 to-transparent dark:from-teal-950/20 dark:to-transparent">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-teal-600 dark:from-teal-500 dark:to-teal-700" aria-hidden />
            <div className="flex items-start justify-between gap-4 pl-5 pr-4 py-5">
              <div className="flex items-start gap-4 min-w-0">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 ring-1 ring-teal-500/15 dark:text-teal-400 shadow-inner">
                  <i className="ri-hotel-bed-line text-[1.5rem]" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h2 id="leave-modal-title" className="text-lg font-semibold tracking-tight text-defaulttextcolor dark:text-white">
                    Request Leave
                  </h2>
                  <p className="mt-1 text-sm text-defaulttextcolor/65 dark:text-white/55">
                    Working days only · Admin will review in Settings » Attendance » Leave Requests
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl text-defaulttextcolor/70 hover:text-defaulttextcolor hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                aria-label="Close"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>
          </div>

          <div className="p-5 overflow-y-auto flex-1 space-y-5">
            <div className="leave-modal-stagger-1 flex items-start gap-3 rounded-xl bg-teal-500/10 border border-teal-500/15 p-3.5">
              <i className="ri-calendar-event-line text-teal-600 dark:text-teal-400 text-lg shrink-0 mt-0.5" aria-hidden />
              <p className="text-sm text-defaulttextcolor/85 dark:text-white/75 leading-relaxed">
                Pick a date range. Only <strong>working days</strong> are included; weekends and your week-off are skipped.
              </p>
            </div>

            <div className="leave-modal-stagger-2 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-defaulttextcolor/55 dark:text-white/50">Dates</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="leave-from-date" className="block text-xs font-medium text-defaulttextcolor/80 mb-1.5">From <span className="text-rose-500">*</span></label>
                  <input
                    id="leave-from-date"
                    type="date"
                    value={leaveRequestForm.fromDate}
                    onChange={(e) => updateLeaveRequestForm("fromDate", e.target.value)}
                    className="w-full rounded-xl border border-defaultborder/80 bg-white dark:bg-white/5 px-3.5 py-2.5 text-sm text-defaulttextcolor placeholder:text-defaulttextcolor/40 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="leave-to-date" className="block text-xs font-medium text-defaulttextcolor/80 mb-1.5">To <span className="text-rose-500">*</span></label>
                  <input
                    id="leave-to-date"
                    type="date"
                    value={leaveRequestForm.toDate}
                    onChange={(e) => updateLeaveRequestForm("toDate", e.target.value)}
                    className="w-full rounded-xl border border-defaultborder/80 bg-white dark:bg-white/5 px-3.5 py-2.5 text-sm text-defaulttextcolor placeholder:text-defaulttextcolor/40 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="leave-modal-stagger-3 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-defaulttextcolor/55 dark:text-white/50">Leave type</span>
              <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Leave type">
                {[
                  { value: "casual" as const, label: "Casual", icon: "ri-sun-line", bg: "bg-teal-50 dark:bg-teal-500/10 border-teal-200/60 dark:border-teal-500/30", active: "bg-teal-100 dark:bg-teal-500/20 border-teal-400/60 text-teal-800 dark:text-teal-200" },
                  { value: "sick" as const, label: "Sick", icon: "ri-heart-pulse-line", bg: "bg-orange-50 dark:bg-orange-500/10 border-orange-200/60 dark:border-orange-500/30", active: "bg-orange-100 dark:bg-orange-500/20 border-orange-400/60 text-orange-800 dark:text-orange-200" },
                  { value: "unpaid" as const, label: "Unpaid", icon: "ri-bank-card-line", bg: "bg-slate-100 dark:bg-slate-500/10 border-slate-200/60 dark:border-slate-500/30", active: "bg-slate-200/80 dark:bg-slate-500/25 border-slate-400/60 text-slate-800 dark:text-slate-200" },
                ].map(({ value, label, icon, bg, active }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateLeaveRequestForm("leaveType", value)}
                    className={`leave-type-card flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-center transition-all duration-200 hover:border-defaulttextcolor/20 dark:hover:border-white/20 ${leaveRequestForm.leaveType === value ? `${active} border-current` : `${bg} border-transparent text-defaulttextcolor/80 dark:text-white/70`}`}
                  >
                    <i className={`${icon} text-lg`} aria-hidden />
                    <span className="text-xs font-semibold">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="leave-modal-stagger-4 space-y-2">
              <label htmlFor="leave-notes" className="block text-xs font-semibold uppercase tracking-wider text-defaulttextcolor/55 dark:text-white/50">Notes <span className="font-normal normal-case text-defaulttextcolor/50">(optional)</span></label>
              <input
                id="leave-notes"
                type="text"
                value={leaveRequestForm.notes}
                onChange={(e) => updateLeaveRequestForm("notes", e.target.value)}
                placeholder="e.g. Family trip, medical appointment…"
                className="w-full rounded-xl border border-defaultborder/80 bg-white dark:bg-white/5 px-3.5 py-2.5 text-sm text-defaulttextcolor placeholder:text-defaulttextcolor/40 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
            </div>
          </div>

          <div className="leave-modal-stagger-5 flex items-center justify-end gap-3 border-t border-defaultborder/60 bg-defaultborder/5 dark:bg-white/5 px-5 py-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-defaultborder/80 bg-transparent px-4 py-2.5 text-sm font-medium text-defaulttextcolor hover:bg-black/5 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmitLeaveRequest}
              className="rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:shadow transition-all disabled:opacity-60 disabled:pointer-events-none flex items-center gap-2"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden />
                  Submitting…
                </>
              ) : (
                <>
                  <i className="ri-send-plane-line text-base" aria-hidden />
                  Submit request
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
