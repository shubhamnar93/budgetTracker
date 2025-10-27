import type { AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";
import { Target } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Trends = ({
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
  const spending = data?.dateData;

  let savingsGoal = {
    target: 0,
    current: 0,
    percentage: 0,
  };
  if (data)
    savingsGoal = {
      target: data?.totalIncome,
      current: data?.totalExpense,
      percentage: Number(
        (data?.totalExpense / (data?.totalIncome / 100)).toFixed(0),
      ),
    };
  return (
    <div className="space-y-8">
      {/* Weekly Spending Trend */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Spending Trend
          </h3>
          <div className="text-sm text-gray-500">Current {periodParam}</div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={spending}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip formatter={(value) => [String(value), "Spent"]} />
              <Bar dataKey="expense" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Savings Goal Progress */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Income to Expense Ratio
          </h3>
          <div className="flex items-center space-x-1">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-600">{periodParam} target</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-800">
                ${savingsGoal.current}
              </p>
              <p className="text-gray-600">of ${savingsGoal.target} goal</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                {savingsGoal.percentage}%
              </p>
              <p className="text-sm text-gray-500">Complete</p>
            </div>
          </div>
          <div className="h-4 w-full rounded-full bg-gray-200">
            <div
              className="flex h-4 items-center justify-end rounded-full bg-blue-600 pr-2 transition-all duration-500"
              style={{ width: `${savingsGoal.percentage}%` }}
            >
              <span className="text-xs font-medium text-white">
                {savingsGoal.percentage > 15
                  ? `${savingsGoal.percentage}%`
                  : ""}
              </span>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Started: Aug 1</span>
            <span>${savingsGoal.target - savingsGoal.current} remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
};
