"use client";
import type { AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";
import { Activity, BarChart3, Calendar, Download, Eye } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export const Controls = ({
  weekly,
  monthly,
  year,
  quarter,
}: {
  weekly: Promise<inferRouterOutputs<AppRouter>["reports"]["getWeeklyData"]>;
  monthly: Promise<inferRouterOutputs<AppRouter>["reports"]["getMonthlyData"]>;
  year: Promise<inferRouterOutputs<AppRouter>["reports"]["getYearlyData"]>;
  quarter: Promise<
    inferRouterOutputs<AppRouter>["reports"]["getQuarterlyData"]
  >;
}) => {
  const searchParams = useSearchParams();
  const periodParam = searchParams.get("period") ?? "week";
  let data = use(weekly);

  if (periodParam === "month") {
    data = use(monthly);
  } else if (periodParam === "year") {
    data = use(year);
  } else if (periodParam == "quarter") {
    data = use(quarter);
  }
  const handleExport = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `report-${selectedPeriod}.json`;
    link.click();
  };

  const [selectedPeriod, setSelectedPeriod] = useState("month");
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString).get("period");
    setSelectedPeriod(urlParams ?? "month");
  }, []);
  const [viewType, setViewType] = useState("overview");
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString).get("viewType");
    setViewType(urlParams ?? "month");
  }, [viewType]);
  return (
    <div className="mb-8 space-y-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          <button
            onClick={() =>
              (window.location.href = `/Reports?period=${selectedPeriod}&viewType=overview`)
            }
            className={`flex items-center rounded-lg px-4 py-2 font-medium transition-all ${
              viewType === "overview"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <Eye className="mr-2 h-4 w-4" />
            Overview
          </button>
          <button
            onClick={() =>
              (window.location.href = `/Reports?period=${selectedPeriod}&viewType=categories`)
            }
            className={`flex items-center rounded-lg px-4 py-2 font-medium transition-all ${
              viewType === "categories"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Categories
          </button>
          <button
            onClick={() =>
              (window.location.href = `/Reports?period=${selectedPeriod}&viewType=trends`)
            }
            className={`flex items-center rounded-lg px-4 py-2 font-medium transition-all ${
              viewType === "trends"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <Activity className="mr-2 h-4 w-4" />
            Trends
          </button>
        </div>

        {/* Export Button */}
        <button className="hidden items-center rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm transition-colors hover:bg-gray-50 md:flex">
          <Download className="mr-2 h-4 w-4 text-gray-600" />
          <span className="text-gray-700">Export Report</span>
        </button>
      </div>

      {/* Time Period Selection */}
      <div className="hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:flex">
        <div className="mr-0 flex w-full items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="font-medium text-gray-800">Time Period:</span>
            <div className="flex space-x-2">
              {["week", "month", "quarter", "year"].map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    window.location.href = `/Reports?period=${period}&viewType=${viewType}`;
                  }}
                  className={`rounded-lg px-4 py-2 font-medium capitalize transition-all ${
                    selectedPeriod === period
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  This {period}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6 rounded-lg bg-white p-4 shadow-sm md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Time Period
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) =>
                (window.location.href = `/Reports?period=${e.target.value}&viewType=${viewType}`)
              }
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};
