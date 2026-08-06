"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Tickets", href: "/dev-tickets", icon: "ri-list-check-2", match: (p: string) => p === "/dev-tickets" },
  { label: "Board", href: "/dev-tickets/board", icon: "ri-layout-column-line", match: (p: string) => p.startsWith("/dev-tickets/board") },
  { label: "Analytics", href: "/dev-tickets/analytics", icon: "ri-bar-chart-grouped-line", match: (p: string) => p.startsWith("/dev-tickets/analytics") },
] as const;

export default function DevTicketTabBar() {
  const pathname = usePathname();
  const onBoard = pathname.startsWith("/dev-tickets/board");

  return (
    <nav
      aria-label="Help & Support sections"
      className={`mb-6 ${onBoard ? "rounded-xl ring-1 ring-primary/15" : ""}`}
    >
      <ul className="inline-flex max-w-full flex-wrap gap-1 rounded-lg border border-defaultborder/80 bg-slate-50/80 p-1 dark:border-white/10 dark:bg-white/[0.03]">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={
                  "inline-flex min-h-[2.25rem] items-center gap-1.5 rounded-md px-4 text-[0.8125rem] transition-colors " +
                  (active
                    ? tab.href.includes("/board")
                      ? "bg-primary/10 font-semibold text-primary shadow-sm dark:bg-primary/15"
                      : "bg-white font-semibold text-primary shadow-sm dark:bg-bodybg"
                    : "font-medium text-[#8c9097] hover:text-defaulttextcolor dark:text-white/50 dark:hover:text-white/80")
                }
                aria-current={active ? "page" : undefined}
              >
                <i className={`${tab.icon} text-[0.9375rem]`} aria-hidden />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
