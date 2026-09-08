import React from "react";

type CompanyWebsiteLinkProps = {
  website: string;
  className?: string;
  showExternalIcon?: boolean;
};

function normalizeWebsiteHref(website: string): string {
  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
}

export function CompanyWebsiteLink({
  website,
  className = "",
  showExternalIcon = false,
}: CompanyWebsiteLinkProps) {
  const href = normalizeWebsiteHref(website);

  if (showExternalIcon) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={website}
        aria-label={`Visit website: ${website}`}
        className={`inline-flex min-w-0 max-w-full items-center gap-1 font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${className}`}
      >
        <span className="min-w-0 truncate">{website}</span>
        <i className="ri-external-link-line shrink-0 text-sm" aria-hidden />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={website}
      aria-label={`Visit website: ${website}`}
      className={`block min-w-0 max-w-full truncate font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${className}`}
    >
      {website}
    </a>
  );
}
