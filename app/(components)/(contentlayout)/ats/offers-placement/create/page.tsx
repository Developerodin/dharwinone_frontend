"use client";

import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Offer } from "@/shared/lib/api/offers";
import { CreateOfferForm } from "../CreateOfferForm";

const CreateOffer = () => {
  const router = useRouter();

  const handleSuccess = (created: Offer) => {
    const newId = (created as { _id?: string })._id ?? (created as { id?: string }).id ?? "";
    if (typeof window !== "undefined") {
      sessionStorage.setItem("dharwin:offerLetterAutoSaveAfterOpen", "1");
    }
    if (/^[0-9a-fA-F]{24}$/.test(newId)) {
      // SSR letter page — versioning + server prefetch (not the retired list modal)
      router.push(
        `/ats/offers-placement/offer-letter/new/?offerId=${encodeURIComponent(newId)}`
      );
      return;
    }
    router.push("/ats/offers-placement");
  };

  return (
    <Fragment>
      <Seo title="Create Offer" />
      <Pageheader currentpage="Create Offer" activepage="Offers & Placement" mainpage="Create Offer" />
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className="box overflow-hidden">
              <div className="box-header">
                <h5 className="box-title">Create Offer</h5>
                <Link href="/ats/offers-placement" className="ti-btn ti-btn-light !py-1 !px-2 !text-[0.875rem]">
                  <i className="ri-arrow-left-line me-1"></i>Back to Offers
                </Link>
              </div>
              <div className="box-body">
                <CreateOfferForm variant="page" cancelHref="/ats/offers-placement" onSuccess={handleSuccess} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateOffer;
