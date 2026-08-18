"use client";

import { Fragment } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import { useAuth } from "@/shared/contexts/auth-context";
import DashboardCard from "./employee/DashboardCard";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function EmployeeDashboard(): JSX.Element {
  const { user } = useAuth();

  return (
    <Fragment>
      <Seo title="Dashboard" />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[18px] px-3.5 pb-10 pt-3.5 md:px-5 md:pt-5">

        <section className="rounded-2xl border border-defaultborder/70 bg-white px-5 py-4 text-center shadow-sm shadow-black/[0.03] dark:border-white/[0.08] dark:bg-bodybg dark:shadow-none">
          <h1 className="text-[0.9375rem] font-semibold tracking-[-0.012em] text-defaulttextcolor dark:text-defaulttextcolor/90">
            {greeting()}, <span className="text-teal-600 dark:text-teal-400">{user?.name ?? "there"}</span>
          </h1>
          <p className="mt-0.5 text-[0.75rem] text-textmuted dark:text-white/50">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </section>

        <div className="grid grid-cols-1 items-stretch gap-[18px] md:grid-cols-2 xl:grid-cols-[308px_minmax(0,1fr)_minmax(0,1fr)] 2xl:grid-cols-[340px_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-[18px] [&>section:last-child]:flex-1">
            <DashboardCard title="Today"><p>TODO Task 3</p></DashboardCard>
            <DashboardCard title="Leave"><p>TODO Task 4</p></DashboardCard>
            <DashboardCard title="Finish your profile"><p>TODO Task 5</p></DashboardCard>
            <DashboardCard title="Documents"><p>TODO Task 5</p></DashboardCard>
          </div>

          <div className="flex min-w-0 flex-col gap-[18px] [&>section:last-child]:flex-1">
            <DashboardCard title="Due today"><p>TODO Task 7</p></DashboardCard>
            <DashboardCard title="Meetings"><p>TODO Task 8</p></DashboardCard>
            <DashboardCard title="All my tasks"><p>TODO Task 7</p></DashboardCard>
          </div>

          <div className="flex min-w-0 flex-col gap-[18px] [&>section:last-child]:flex-1">
            <DashboardCard title="Upcoming Holidays"><p>TODO Task 10</p></DashboardCard>
            <DashboardCard title="Training"><p>TODO Task 6</p></DashboardCard>
            <DashboardCard title="Your team"><p>TODO Task 10</p></DashboardCard>
            <DashboardCard title="Open roles"><p>TODO Task 10</p></DashboardCard>
          </div>
        </div>

        <DashboardCard title="Projects you're on" bodyClassName="p-0">
          <p className="p-5">TODO Task 9</p>
        </DashboardCard>
      </div>
    </Fragment>
  );
}
