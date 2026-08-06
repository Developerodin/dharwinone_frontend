"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Tickets", href: "/dev-tickets", match: (p: string) => p === "/dev-tickets" },
  { label: "Board", href: "/dev-tickets/board", match: (p: string) => p.startsWith("/dev-tickets/board") },
  { label: "Analytics", href: "/dev-tickets/analytics", match: (p: string) => p.startsWith("/dev-tickets/analytics") },
] as const;

export default function DevTicketTabBar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Help & Support sections" className="mb-6">
      <ul className="inline-flex max-w-full flex-wrap gap-1 rounded-lg border border-defaultborder/80 bg-slate-50/80 p-1 dark:border-white/10 dark:bg-white/[0.03]">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={
                  "inline-flex min-h-[2.25rem] items-center rounded-md px-4 text-[0.8125rem] transition-colors " +
                  (active
                    ? "bg-white font-semibold text-primary shadow-sm dark:bg-bodybg"
                    : "font-medium text-[#8c9097] hover:text-defaulttextcolor dark:text-white/50 dark:hover:text-white/80")
                }
                aria-current={active ? "page" : undefined}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
