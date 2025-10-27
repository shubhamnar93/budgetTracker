"use client";
import type { AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { Cell, Pie, ResponsiveContainer, Tooltip, PieChart } from "recharts";

export const Categories = ({
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
  type CategorySpending = {
    name: string;
    amount: number;
    color: string;
  }[];
  let categorySpending: CategorySpending = [];

  if (data)
    categorySpending = [
      {
        name: "Housing",
        amount: data?.categoryExpense.housing.total,
        color: "#3B82F6",
      },
      {
        name: "Food & Dining",
        amount: data?.categoryExpense.food.total,
        color: "#10B981",
      },
      {
        name: "Transportation",
        amount: data?.categoryExpense.transportation.total,
        color: "#8B5CF6",
      },
      {
        name: "Shopping",
        amount: data?.categoryExpense.shopping.total,
        color: "#EF4444",
      },
      {
        name: "Entertainment",
        amount: data?.categoryExpense.entertainment.total,
        color: "#F59E0B",
      },
      {
        name: "Healthcare",
        amount: data?.categoryExpense.healthcare.total,
        color: "#06B6D4",
      },
      {
        name: "Coffee & Drink",
        amount: data?.categoryExpense.coffee.total,
        color: "#ea580c",
      },
      {
        name: "Others",
        amount: data?.categoryExpense.others.total,
        color: "#84CC16",
      },
    ];
  return (
    <div className="space-y-8">
      {/* Category Overview */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Pie Chart */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-gray-800">
              Spending Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySpending}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="amount"
                  >
                    {categorySpending.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [String(value), String(name)]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Details */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-gray-800">
              Category Breakdown
            </h3>
            <div className="space-y-4">
              {categorySpending.map((category, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="font-medium text-gray-800">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold text-gray-800">
                        ${category.amount}
                      </span>
                      {/* <div
                        className={`flex items-center text-sm ${
                          category.trend > 0 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {category.trend > 0 ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        {Math.abs(category.trend)}%
                      </div> */}
                    </div>
                  </div>
                  {/* <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${category.percentage}%`,
                        backgroundColor: category.color,
                      }}
                    ></div>
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <span>{category.percentage}% of total</span>
                    <span>
                      {category.trend > 0 ? "Increased" : "Decreased"} from last
                      month
                    </span>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
