/**
 * SSR entry for Offer Letter Generator.
 * Prefetches the offer (when ?offerId=) with auth cookies, then hydrates the client editor island.
 * // ponytail: interactive form/preview/PDF stay client — only initial offer payload is server-fetched.
 */
import React from "react";
import { fetchOfferByIdServer } from "@/shared/lib/api/offers.server";
import type { Offer } from "@/shared/lib/api/offers";
import OfferLetterPageClient from "./OfferLetterPageClient";

export default async function NewOfferLetterPage({
  searchParams,
}: {
  searchParams: Promise<{ offerId?: string }>;
}) {
  const sp = await searchParams;
  const offerIdParam = String(sp.offerId ?? "").trim() || null;

  let initialOffer: Offer | null = null;
  let initialLoadError: string | null = null;

  let ssrHydrated = false;
  if (offerIdParam && /^[0-9a-fA-F]{24}$/.test(offerIdParam)) {
    initialOffer = await fetchOfferByIdServer(offerIdParam);
    ssrHydrated = !!initialOffer;
    // Soft failure — client island may still succeed after cookie refresh / client axios.
    // // ponytail: no token refresh on RSC — expired access cookie → client retry only.
  } else if (offerIdParam) {
    initialLoadError = "Invalid offer id";
  }

  return (
    <OfferLetterPageClient
      offerIdParam={offerIdParam}
      initialOffer={initialOffer}
      initialLoadError={initialLoadError}
      ssrHydrated={ssrHydrated}
    />
  );
}
