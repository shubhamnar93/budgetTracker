"use client";
import { useSearchParams } from "next/navigation";
import { Overview } from "./overview";
import { Categories } from "./categories";
import { Trends } from "./trends";
import type { AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";

export const ViewType = ({
  weekly,
  monthly,
  year,
  quarter,
  toptransaction
}: {
  weekly: Promise<inferRouterOutputs<AppRouter>["reports"]["getWeeklyData"]>;
  monthly: Promise<inferRouterOutputs<AppRouter>["reports"]["getMonthlyData"]>;
  year: Promise<inferRouterOutputs<AppRouter>["reports"]["getYearlyData"]>;
  quarter: Promise<
    inferRouterOutputs<AppRouter>["reports"]["getQuarterlyData"]
  >;
  toptransaction: Promise<inferRouterOutputs<AppRouter>["reports"]["getTopExepense"]>;
}) => {
  const searchParams = useSearchParams();
  const periodParam = searchParams.get("viewType") ?? "overview";
  return (
    <>
      {periodParam === "overview" ? (
        <Overview
          weekly={weekly}
          monthly={monthly}
          quarter={quarter}
          year={year}
          toptransaction={toptransaction}
        />
      ) : periodParam === "categories" ? (
        <Categories
          weekly={weekly}
          monthly={monthly}
          quarter={quarter}
          year={year}
        />
      ) : (
        <Trends
          weekly={weekly}
          monthly={monthly}
          quarter={quarter}
          year={year}
        />
      )}
    </>
  );
};
