import type { Offer, OfferLetterJobType } from "@/shared/lib/api/offers";
import {
  createEmptyOfferLetterForm,
  type OfferLetterFormFields,
} from "./OfferLetterGeneratorWorkspace";
import { detectEligibilityPreset } from "./offer-letter-generator-data";
import {
  resolveOfferLetterRolesHtml,
  resolveOfferLetterTrainingHtml,
} from "./job-posting-doc";
import { letterDateStampYmd } from "./letter-date-stamp";

export function formatCandidateAddress(
  c: { address?: Offer["candidate"]["address"] } | null | undefined
): string {
  const a = c?.address;
  if (!a || typeof a !== "object") return "";
  return [a.streetAddress, a.streetAddress2, a.city, a.state, a.zipCode, a.country]
    .filter(Boolean)
    .join(", ");
}

export function getOfferRecordId(o: { _id?: string; id?: string } | null | undefined): string {
  const v = o?._id ?? o?.id;
  if (v == null) return "";
  const s = String(v).trim();
  if (!s || s === "undefined" || s === "null") return "";
  return s;
}

/** Map a persisted offer (or letterVersions[].snapshot + candidate fallbacks) into editor form fields. */
export function mapOfferToLetterForm(
  o: Offer | (NonNullable<Offer["letterVersions"]>[number]["snapshot"] & { candidate?: Offer["candidate"] })
): OfferLetterFormFields {
  const empty = createEmptyOfferLetterForm();
  const c = "candidate" in o ? o.candidate : undefined;
  const addr = formatCandidateAddress(c);
  const jt = ((o as Offer).jobType as OfferLetterJobType) || "FT_40";
  const isIntern = jt === "INTERN_UNPAID";
  const eligLines = (o as Offer).employmentEligibilityLines || [];
  let eligibilityPreset = detectEligibilityPreset(eligLines, isIntern);
  if (isIntern && eligibilityPreset === "none" && eligLines.length === 0) {
    eligibilityPreset = "opt_stem";
  }
  if (!isIntern && eligibilityPreset === "none" && eligLines.length === 0) {
    eligibilityPreset = "opt_stem";
  }
  const eligibilityText = eligibilityPreset === "custom" ? eligLines.join("\n") : "";
  const offerLike = o as Offer;

  return {
    ...empty,
    letterFullName: offerLike.letterFullName || c?.fullName || "",
    letterAddress: offerLike.letterAddress || addr || "",
    positionTitle: offerLike.positionTitle || offerLike.job?.title || "",
    joiningDate: offerLike.joiningDate ? String(offerLike.joiningDate).slice(0, 10) : "",
    letterDate: offerLike.letterDate
      ? String(offerLike.letterDate).slice(0, 10)
      : letterDateStampYmd(),
    jobType: jt,
    weeklyHours: typeof offerLike.weeklyHours === "number" ? offerLike.weeklyHours : 40,
    workLocation: offerLike.workLocation || "Remote (USA)",
    rolesText: resolveOfferLetterRolesHtml(offerLike),
    trainingText: resolveOfferLetterTrainingHtml(offerLike),
    annualGrossCtc:
      offerLike.ctcBreakdown?.gross != null && Number(offerLike.ctcBreakdown.gross) > 0
        ? String(offerLike.ctcBreakdown.gross)
        : "",
    ctcCurrency:
      (offerLike.ctcBreakdown?.currency || "USD").toUpperCase() === "INR" ? "INR" : "USD",
    academicNote: offerLike.academicAlignmentNote || "",
    eligibilityPreset,
    eligibilityText,
    supFirst: offerLike.supervisor?.firstName || "Jason",
    supLast: offerLike.supervisor?.lastName || "Mendonca",
    supPhone: offerLike.supervisor?.phone || "+1-307-206-9144",
    supEmail: offerLike.supervisor?.email || "jason@dharwinbusinesssolutions.com",
  };
}

/** Apply a letterVersions[].snapshot onto the editor form (keeps candidate name fallbacks from current offer). */
export function mapLetterSnapshotToForm(
  snapshot: NonNullable<Offer["letterVersions"]>[number]["snapshot"],
  fallbackOffer?: Offer | null
): OfferLetterFormFields {
  const merged = {
    ...(fallbackOffer || {}),
    ...snapshot,
    candidate: fallbackOffer?.candidate,
    job: fallbackOffer?.job,
  } as Offer;
  return mapOfferToLetterForm(merged);
}
