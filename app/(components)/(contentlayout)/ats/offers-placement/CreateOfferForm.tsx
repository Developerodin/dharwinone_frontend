"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createOffer, getOfferLetterDefaults, listOffers, type Offer, type OfferLetterJobType, EMPLOYMENT_CATEGORIES, employmentCategoryFromOfferJobType, freelancePayFromOfferJobType, isInternOfferJobType, isUnpaidOfferJobType, offerJobTypeFromEmployment, type EmploymentCategory } from "@/shared/lib/api/offers";
import { listJobApplications, type JobApplication } from "@/shared/lib/api/jobApplications";
import {
  isJobApplicationEligibleForOffer,
  jobApplicationRecordId,
} from "@/shared/lib/ats/offer-application-eligibility";
import { findJobApplicationById, resolveOfferInterviewBypassAck } from "@/shared/lib/ats/resolve-offer-interview-bypass";
import { useConfirm } from "@/shared/components/ui/useConfirm";

function formatCandidateAddress(c: JobApplication["candidate"] | undefined) {
  const a = c?.address;
  if (!a || typeof a !== "object") return "";
  return [a.streetAddress, a.streetAddress2, a.city, a.state, a.zipCode, a.country].filter(Boolean).join(", ");
}

export type CreateOfferFormProps = {
  onSuccess: (created: Offer) => void;
  /** Full-page mode: Cancel is a link to this URL. */
  cancelHref?: string;
  /** Modal mode: Cancel button. Ignored if `cancelHref` is set. */
  onCancel?: () => void;
  variant?: "page" | "modal";
  /**
   * When false (e.g. Offer Letter Generator new-offer flow), selecting an application only sets the
   * application id — name, address, and role templates are not auto-filled so the letter can be filled manually.
   */
  prefillFromApplication?: boolean;
};

const getApplicationId = jobApplicationRecordId;

export function CreateOfferForm({
  onSuccess,
  cancelHref,
  onCancel,
  variant = "page",
  prefillFromApplication = true,
}: CreateOfferFormProps) {
  const { confirm, confirmDialog } = useConfirm();
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weeklyHoursOther, setWeeklyHoursOther] = useState(false);
  const [form, setForm] = useState({
    jobApplicationId: "",
    base: 0,
    hra: 0,
    gross: 0,
    currency: "USD" as "INR" | "USD",
    joiningDate: "",
    offerValidityDate: "",
    notes: "",
    letterFullName: "",
    letterAddress: "",
    positionTitle: "",
    jobType: "FT_40" as OfferLetterJobType,
    weeklyHours: 40 as number,
    workLocation: "Remote (USA)",
    rolesText: "",
    trainingText: "",
    compensationNarrative: "",
    academicNote: "",
    eligibilityText: "",
    supFirst: "Jason",
    supLast: "Mendonca",
    supPhone: "+1-307-206-9144",
    supEmail: "jason@dharwinbusinesssolutions.com",
  });

  useEffect(() => {
    Promise.all([listJobApplications({ limit: 100 }), listOffers({ limit: 100 })])
      .then(([appsRes, offersRes]) => {
        const appIdsWithOffer = new Set(
          (offersRes.results ?? [])
            .map((o) => String(o.jobApplication || "").trim())
            .filter(Boolean)
        );
        const eligible = (appsRes.results ?? []).filter((ja) =>
          isJobApplicationEligibleForOffer(ja.status, getApplicationId(ja), appIdsWithOffer)
        );
        setJobApplications(eligible);
      })
      .catch(() => setJobApplications([]))
      .finally(() => setLoading(false));
  }, []);

  const applyJobDefaults = async (positionTitle: string, jobId?: string) => {
    try {
      const defaults = await getOfferLetterDefaults(positionTitle, jobId);
      setForm((prev) => ({
        ...prev,
        ...(defaults.suggestedJobType ? { jobType: defaults.suggestedJobType } : {}),
        ...(prev.rolesText.trim()
          ? {}
          : { rolesText: (defaults.roleResponsibilities ?? []).join("\n") }),
      }));
    } catch {
      // leave empty; user can type
    }
  };

  const handleApplicationChange = async (applicationId: string) => {
    if (!applicationId) {
      setForm((f) => ({ ...f, jobApplicationId: "" }));
      return;
    }
    const ja = jobApplications.find((j) => getApplicationId(j) === applicationId);
    if (!ja) {
      setForm((f) => ({ ...f, jobApplicationId: applicationId }));
      return;
    }
    if (!prefillFromApplication) {
      setForm((f) => ({ ...f, jobApplicationId: applicationId }));
      return;
    }
    const positionTitle = ja.job?.title || "";
    const jobId =
      (ja.job as { _id?: string; id?: string } | undefined)?._id ??
      (ja.job as { id?: string } | undefined)?.id;
    const letterAddress = formatCandidateAddress(ja.candidate);
    const letterFullName = ja.candidate?.fullName || "";
    let trainingText = "";
    try {
      const d = await getOfferLetterDefaults(positionTitle, jobId);
      trainingText = d.trainingOutcomes.join("\n");
      setForm((prev) => ({
        ...prev,
        ...(d.suggestedJobType ? { jobType: d.suggestedJobType } : {}),
      }));
    } catch {
      // leave empty; user can type
    }
    setForm((prev) => ({
      ...prev,
      jobApplicationId: applicationId,
      positionTitle: positionTitle || prev.positionTitle,
      letterFullName: letterFullName || prev.letterFullName,
      letterAddress: letterAddress || prev.letterAddress,
      trainingText,
    }));
    await applyJobDefaults(positionTitle, jobId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.jobApplicationId) {
      setError("Please select a job application");
      return;
    }
    if (!/^[0-9a-fA-F]{24}$/.test(form.jobApplicationId)) {
      setError("Invalid job application selected");
      return;
    }
    const isUnpaid = isUnpaidOfferJobType(form.jobType);
    const isIntern = isInternOfferJobType(form.jobType);
    if (!isUnpaid && !Number(form.gross)) {
      setError("Enter gross CTC, or choose an unpaid job type (Training internship or Unpaid freelance).");
      return;
    }
    const roleResponsibilities = form.rolesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const trainingOutcomes = form.trainingText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const employmentEligibilityLines = form.eligibilityText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const weeklyHours: number =
      form.weeklyHours > 0 ? form.weeklyHours : form.jobType === "PT_25" ? 20 : 40;

    const selectedApp = findJobApplicationById(jobApplications, form.jobApplicationId);
    const bypassAck = await resolveOfferInterviewBypassAck(selectedApp, confirm);
    if (bypassAck === false) return;

    setSubmitting(true);
    try {
      const created = await createOffer({
        jobApplicationId: form.jobApplicationId,
        ...(bypassAck ? { ackBypassInterview: true } : {}),
        ctcBreakdown: {
          base: form.base,
          hra: form.hra,
          gross: form.gross,
          currency: form.currency,
        },
        joiningDate: form.joiningDate || null,
        offerValidityDate: form.offerValidityDate || null,
        notes: form.notes || undefined,
        letterFullName: form.letterFullName.trim() || undefined,
        letterAddress: form.letterAddress.trim() || undefined,
        positionTitle: form.positionTitle.trim() || undefined,
        jobType: form.jobType,
        weeklyHours,
        workLocation: form.workLocation.trim() || undefined,
        roleResponsibilities: roleResponsibilities.length ? roleResponsibilities : undefined,
        trainingOutcomes: isIntern && trainingOutcomes.length > 0 ? trainingOutcomes : undefined,
        compensationNarrative: form.compensationNarrative.trim() || undefined,
        academicAlignmentNote: form.academicNote.trim() || undefined,
        employmentEligibilityLines: employmentEligibilityLines.length ? employmentEligibilityLines : undefined,
        supervisor: {
          firstName: form.supFirst.trim() || undefined,
          lastName: form.supLast.trim() || undefined,
          phone: form.supPhone.trim() || undefined,
          email: form.supEmail.trim() || undefined,
        },
      });
      onSuccess(created);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (err as Error)?.message ||
        "Failed to create offer";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const isUnpaid = isUnpaidOfferJobType(form.jobType);
  const isIntern = isInternOfferJobType(form.jobType);
  const employmentCategory = employmentCategoryFromOfferJobType(form.jobType);
  const freelancePay = freelancePayFromOfferJobType(form.jobType);

  const setEmploymentCategory = (category: EmploymentCategory, payChoice?: "paid" | "unpaid") => {
    const pay = category === "Freelance" ? (payChoice ?? freelancePay) : "paid";
    const v = offerJobTypeFromEmployment(category, pay);
    setForm((f) => ({
      ...f,
      jobType: v,
      weeklyHours: v === "PT_25" ? 20 : v === "FT_40" ? 40 : f.weeklyHours,
    }));
  };
  const isModal = variant === "modal";

  return (
    <>
      {confirmDialog}
      <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div className="p-3 rounded-lg bg-danger/10 text-danger text-sm">{error}</div>}

      {isModal && (
        <div className="p-3 rounded-lg bg-primary/5 text-sm text-gray-700 dark:text-gray-300 border border-primary/20 space-y-1">
          <p className="font-medium text-gray-900 dark:text-white">Two-step flow</p>
          {prefillFromApplication ? (
            <>
              <p className="text-xs leading-relaxed">
                <strong>Here:</strong> choose the application and set compensation / dates — only what&apos;s needed to
                create the offer record. Name, address, roles, training, and PDF options are filled from the application
                (and templates) in the background.
              </p>
              <p className="text-xs leading-relaxed">
                <strong>Next:</strong> the <strong>Offer Letter Generator</strong> opens on the list so you can edit the
                letter. After you submit, you&apos;ll return to <strong>Offers &amp; Placement</strong> with the letter
                workspace open. Use <strong>Save letter</strong> to store fields on the server, then{' '}
                <strong>Save as PDF</strong> for a local print/PDF copy.
              </p>
            </>
          ) : (
            <>
              <p className="text-xs leading-relaxed">
                <strong>Here:</strong> link the offer to an application and set compensation and dates. The application
                is not used to pre-fill the letter (name, address, and roles stay empty for you to type).
              </p>
              <p className="text-xs leading-relaxed">
                <strong>Next:</strong> you&apos;ll return to <strong>Offers &amp; Placement</strong> with the same
                full-screen <strong>Offer Letter Generator</strong>. Fill the letter, use <strong>Save letter</strong>{' '}
                to store fields on the server, then <strong>Save as PDF</strong> for a local print/PDF copy.
              </p>
            </>
          )}
        </div>
      )}

      <div>
        <label className="form-label">
          Job Application <span className="text-danger">*</span>
        </label>
        <select
          className="form-control"
          value={form.jobApplicationId}
          onChange={(e) => void handleApplicationChange(e.target.value)}
          required
        >
          <option value="">Select application...</option>
          {jobApplications.map((ja) => {
            const appId = getApplicationId(ja);
            return (
              <option key={appId} value={appId}>
                {ja.job?.title} – {ja.candidate?.fullName} ({ja.candidate?.email})
              </option>
            );
          })}
          {!loading && jobApplications.length === 0 && <option disabled>No applications available</option>}
        </select>
        {!loading && jobApplications.length === 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 p-3 rounded-lg bg-gray-50 dark:bg-black/20 space-y-1">
            <p className="font-medium">No applications available to create an offer.</p>
            <p className="text-xs">
              Offers can only be created from applications in <strong>Applied</strong>, <strong>Screening</strong>,{" "}
              <strong>Interview</strong>, <strong>Shortlisted</strong>, or <strong>Offered</strong> (when no offer
              exists yet). Rejected and Hired applications are excluded.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="form-label">Base (CTC)</label>
          <input
            type="number"
            className="form-control"
            value={form.base || ""}
            onChange={(e) => setForm((f) => ({ ...f, base: Number(e.target.value) || 0 }))}
            placeholder="0"
            min={0}
          />
        </div>
        <div>
          <label className="form-label">HRA</label>
          <input
            type="number"
            className="form-control"
            value={form.hra || ""}
            onChange={(e) => setForm((f) => ({ ...f, hra: Number(e.target.value) || 0 }))}
            placeholder="0"
            min={0}
          />
        </div>
        <div>
          <label className="form-label">
            Gross CTC{" "}
            {isUnpaid ? <span className="text-gray-500">(0 for unpaid)</span> : <span className="text-danger">*</span>}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              className="form-control flex-1"
              value={form.gross || ""}
              onChange={(e) => setForm((f) => ({ ...f, gross: Number(e.target.value) || 0 }))}
              placeholder="0"
              min={0}
            />
            <select
              className="form-control w-28"
              value={form.currency}
              onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value as "INR" | "USD" }))}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Joining Date</label>
          <input
            type="date"
            className="form-control"
            value={form.joiningDate}
            onChange={(e) => setForm((f) => ({ ...f, joiningDate: e.target.value }))}
          />
        </div>
        <div>
          <label className="form-label">Offer Validity Date</label>
          <input
            type="date"
            className="form-control"
            value={form.offerValidityDate}
            onChange={(e) => setForm((f) => ({ ...f, offerValidityDate: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <label className="form-label">Notes</label>
        <textarea
          className="form-control"
          rows={isModal ? 2 : 3}
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          placeholder="Optional notes"
        />
      </div>

      {isModal && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Job type</label>
            <select
              className="form-control"
              value={employmentCategory}
              onChange={(e) => setEmploymentCategory(e.target.value as EmploymentCategory)}
            >
              {EMPLOYMENT_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {employmentCategory === "Freelance" ? (
              <div className="flex flex-wrap gap-4 mt-2" role="group" aria-label="Freelance compensation">
                <label className="inline-flex items-center gap-2 min-h-[44px] cursor-pointer">
                  <input
                    type="radio"
                    name="freelance-pay-modal"
                    checked={freelancePay === "paid"}
                    onChange={() => setEmploymentCategory("Freelance", "paid")}
                  />
                  Paid
                </label>
                <label className="inline-flex items-center gap-2 min-h-[44px] cursor-pointer">
                  <input
                    type="radio"
                    name="freelance-pay-modal"
                    checked={freelancePay === "unpaid"}
                    onChange={() => setEmploymentCategory("Freelance", "unpaid")}
                  />
                  Unpaid
                </label>
              </div>
            ) : null}
          </div>
          <div>
            <label className="form-label">Compensation</label>
            <div className={`form-control flex items-center ${isUnpaid ? "text-amber-700 dark:text-amber-400" : "text-emerald-700 dark:text-emerald-400"}`}>
              {isUnpaid ? "Unpaid" : "Paid"}{" "}
              <span className="ms-1 text-xs text-gray-500">(derived from job type)</span>
            </div>
          </div>
          <div>
            <label className="form-label">Weekly hours</label>
            {(() => {
              const isPreset = form.weeklyHours === 40 || form.weeklyHours === 20;
              const showCustom = weeklyHoursOther || !isPreset;
              return (
                <>
                  <select
                    className="form-control"
                    value={showCustom ? "other" : String(form.weeklyHours)}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "other") {
                        setWeeklyHoursOther(true);
                      } else {
                        setWeeklyHoursOther(false);
                        setForm((f) => ({ ...f, weeklyHours: Number(v) }));
                      }
                    }}
                  >
                    <option value={40}>40</option>
                    <option value={20}>20</option>
                    <option value="other">Other</option>
                  </select>
                  {showCustom ? (
                    <input
                      type="number"
                      min={1}
                      max={168}
                      className="form-control mt-2"
                      placeholder="Weekly hours"
                      value={form.weeklyHours || ""}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, weeklyHours: Number(e.target.value) || 0 }))
                      }
                    />
                  ) : null}
                </>
              );
            })()}
          </div>
          <div>
            <label className="form-label">Work location</label>
            <input
              className="form-control"
              value={form.workLocation}
              onChange={(e) => setForm((f) => ({ ...f, workLocation: e.target.value }))}
            />
          </div>
        </div>
      )}

      {!isModal && (
      <div className="border border-gray-200 dark:border-defaultborder/10 rounded-lg p-4 space-y-4 bg-gray-50/80 dark:bg-black/20">
        <h6 className="text-base font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <i className="ri-file-pdf-2-line text-primary"></i>
          Offer letter workspace
        </h6>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Pre-filled from the selected application (name, address, job title, suggested roles). After you submit,
          you&apos;ll return to <strong>Offers &amp; Placement</strong> with the letter workspace open. Use{' '}
          <strong>Save letter</strong> to store fields on the server, then <strong>Save as PDF</strong> for a local
          print/PDF copy.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Full name (on letter)</label>
            <input
              className="form-control"
              value={form.letterFullName}
              onChange={(e) => setForm((f) => ({ ...f, letterFullName: e.target.value }))}
              placeholder="Candidate full name"
            />
          </div>
          <div>
            <label className="form-label">Position (on letter)</label>
            <input
              className="form-control"
              value={form.positionTitle}
              onChange={(e) => setForm((f) => ({ ...f, positionTitle: e.target.value }))}
              placeholder="Job title"
            />
          </div>
        </div>
        <div>
          <label className="form-label">Address (full line)</label>
          <input
            className="form-control"
            value={form.letterAddress}
            onChange={(e) => setForm((f) => ({ ...f, letterAddress: e.target.value }))}
            placeholder="Street, city, state, ZIP, country"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Job type</label>
            <select
              className="form-control"
              value={employmentCategory}
              onChange={(e) => setEmploymentCategory(e.target.value as EmploymentCategory)}
            >
              {EMPLOYMENT_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {employmentCategory === "Freelance" ? (
              <div className="flex flex-wrap gap-4 mt-2" role="group" aria-label="Freelance compensation">
                <label className="inline-flex items-center gap-2 min-h-[44px] cursor-pointer">
                  <input
                    type="radio"
                    name="freelance-pay-page"
                    checked={freelancePay === "paid"}
                    onChange={() => setEmploymentCategory("Freelance", "paid")}
                  />
                  Paid
                </label>
                <label className="inline-flex items-center gap-2 min-h-[44px] cursor-pointer">
                  <input
                    type="radio"
                    name="freelance-pay-page"
                    checked={freelancePay === "unpaid"}
                    onChange={() => setEmploymentCategory("Freelance", "unpaid")}
                  />
                  Unpaid
                </label>
              </div>
            ) : null}
          </div>
          <div>
            <label className="form-label">Weekly hours</label>
            {(() => {
              const isPreset = form.weeklyHours === 40 || form.weeklyHours === 20;
              const showCustom = weeklyHoursOther || !isPreset;
              return (
                <>
                  <select
                    className="form-control"
                    value={showCustom ? "other" : String(form.weeklyHours)}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "other") {
                        setWeeklyHoursOther(true);
                      } else {
                        setWeeklyHoursOther(false);
                        setForm((f) => ({ ...f, weeklyHours: Number(v) }));
                      }
                    }}
                  >
                    <option value={40}>40</option>
                    <option value={20}>20</option>
                    <option value="other">Other</option>
                  </select>
                  {showCustom ? (
                    <input
                      type="number"
                      min={1}
                      max={168}
                      className="form-control mt-2"
                      placeholder="Weekly hours"
                      value={form.weeklyHours || ""}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, weeklyHours: Number(e.target.value) || 0 }))
                      }
                    />
                  ) : null}
                </>
              );
            })()}
          </div>
          <div>
            <label className="form-label">Compensation</label>
            <div className={`form-control flex items-center ${isUnpaid ? "text-amber-700 dark:text-amber-400" : "text-emerald-700 dark:text-emerald-400"}`}>
              {isUnpaid ? "Unpaid" : "Paid"}{" "}
              <span className="ms-1 text-xs text-gray-500">(derived from job type)</span>
            </div>
          </div>
          <div>
            <label className="form-label">Location</label>
            <input
              className="form-control"
              value={form.workLocation}
              onChange={(e) => setForm((f) => ({ ...f, workLocation: e.target.value }))}
            />
          </div>
        </div>
        <div>
          <label className="form-label">Roles &amp; responsibilities (one per line)</label>
          <textarea
            className="form-control font-mono text-xs min-h-[100px]"
            value={form.rolesText}
            onChange={(e) => setForm((f) => ({ ...f, rolesText: e.target.value }))}
            placeholder="Suggested from job title; edit as needed"
          />
        </div>
        {isIntern && (
          <div>
            <label className="form-label">Training &amp; learning outcomes (one per line)</label>
            <textarea
              className="form-control font-mono text-xs min-h-[80px]"
              value={form.trainingText}
              onChange={(e) => setForm((f) => ({ ...f, trainingText: e.target.value }))}
            />
          </div>
        )}
        {!isUnpaid && (
          <div>
            <label className="form-label">Compensation paragraph (optional; USD/INR uses gross above)</label>
            <textarea
              className="form-control text-xs min-h-[70px]"
              value={form.compensationNarrative}
              onChange={(e) => setForm((f) => ({ ...f, compensationNarrative: e.target.value }))}
              placeholder="Leave blank to auto-build from gross CTC and currency on generate"
            />
          </div>
        )}
        {!isIntern && (
          <>
            <p className="text-xs text-gray-500">Supervisor (printed on paid and freelance letters)</p>
            <div className="grid grid-cols-2 gap-2">
              <input
                className="form-control"
                placeholder="First name"
                value={form.supFirst}
                onChange={(e) => setForm((f) => ({ ...f, supFirst: e.target.value }))}
              />
              <input
                className="form-control"
                placeholder="Last name"
                value={form.supLast}
                onChange={(e) => setForm((f) => ({ ...f, supLast: e.target.value }))}
              />
              <input
                className="form-control"
                placeholder="Phone"
                value={form.supPhone}
                onChange={(e) => setForm((f) => ({ ...f, supPhone: e.target.value }))}
              />
              <input
                className="form-control"
                placeholder="Email"
                value={form.supEmail}
                onChange={(e) => setForm((f) => ({ ...f, supEmail: e.target.value }))}
              />
            </div>
            <div>
              <label className="form-label">Academic / degree alignment (optional)</label>
              <textarea
                className="form-control text-xs min-h-[56px]"
                value={form.academicNote}
                onChange={(e) => setForm((f) => ({ ...f, academicNote: e.target.value }))}
              />
            </div>
            <div>
              <label className="form-label">Employment eligibility (optional, one per line)</label>
              <textarea
                className="form-control font-mono text-xs min-h-[56px]"
                value={form.eligibilityText}
                onChange={(e) => setForm((f) => ({ ...f, eligibilityText: e.target.value }))}
              />
            </div>
          </>
        )}
      </div>
      )}

      <div className="flex flex-wrap gap-2 pt-2">
        <button
          type="submit"
          className="ti-btn ti-btn-primary"
          disabled={submitting || (!loading && jobApplications.length === 0)}
        >
          {submitting ? (
            <>
              <i className="ri-loader-4-line animate-spin me-1"></i>Creating...
            </>
          ) : isModal ? (
            <>
              <i className="ri-file-text-line me-1"></i>Create &amp; open letter
            </>
          ) : (
            <>
              <i className="ri-add-line me-1"></i>Create Offer
            </>
          )}
        </button>
        {cancelHref ? (
          <Link href={cancelHref} className="ti-btn ti-btn-light">
            Cancel
          </Link>
        ) : onCancel ? (
          <button type="button" className="ti-btn ti-btn-light" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
    </>
  );
}
