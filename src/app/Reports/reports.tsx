import { Suspense } from "react";
import { ViewType } from "./viewType";
import { Controls } from "./controls";
import { api } from "@/trpc/server";
import { LoadingSpinner } from "../_components/loadingSpinner";

export const Reports = () => {
  const weekly = api.reports.getWeeklyData();
  const year = api.reports.getYearlyData();
  const monthly = api.reports.getMonthlyData();
  const quarter = api.reports.getQuarterlyData();
  const toptransaction = api.reports.getTopExepense()
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-white">
          <LoadingSpinner size={50} what={"Reports"} />
        </div>
      }
    >
      <Controls
        weekly={weekly}
        year={year}
        monthly={monthly}
        quarter={quarter}
      />
      <ViewType
        weekly={weekly}
        year={year}
        monthly={monthly}
        quarter={quarter}
        toptransaction={toptransaction}
      />
    </Suspense>
  );
};
