"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Seo from "@/shared/layout-components/seo/seo";
import React, { Fragment } from "react";

export function FormLoadingSpinner({ label }: { label: string }) {
  return (
    <div className="p-6 flex items-center justify-center" role="status" aria-live="polite">
      <div
        className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function EmployeeFormAlert({
  title,
  description,
  returnUrl = "/ats/employees",
}: {
  title: string;
  description: string;
  returnUrl?: string;
}) {
  return (
    <div className="p-6">
      <div
        role="alert"
        className="rounded-md border border-warning/30 bg-warning/5 px-4 py-5 text-center max-w-lg mx-auto"
      >
        <h2 className="text-lg font-semibold text-defaulttextcolor dark:text-white mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <Link href={returnUrl} className="ti-btn ti-btn-primary">
          Back to employees list
        </Link>
      </div>
    </div>
  );
}

export const LazyEmployeeForm = dynamic(
  () => import("@/shared/data/pages/candidates/employeeform").then((m) => m.EmployeeForm),
  {
    ssr: false,
    loading: () => <FormLoadingSpinner label="Loading employee form" />,
  }
);

export function EmployeeFormPageShell({
  seoTitle,
  children,
}: {
  seoTitle: string;
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Seo title={seoTitle} />
      <div className="w-full max-w-full px-3 pt-2 pb-4 sm:px-4 sm:pt-4 md:pb-6">
        <div className="box custom-box overflow-hidden">
          <div className="box-body !p-0 product-checkout">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}
