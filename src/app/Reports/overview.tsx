"use client";
import { api } from "@/trpc/react";
import { DollarSign, Percent, TrendingDown, TrendingUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Overview = () => {
  const searchParams = useSearchParams();
  const periodParam = searchParams.get("period") ?? "week";
  let data = api.reports.getWeeklyData.useQuery().data;
  if (periodParam === "month") {
    data = api.reports.getMonthlyData.useQuery().data;
  } else if (periodParam === "year") {
    data = api.reports.getYearlyData.useQuery().data;
  } else if (periodParam == "quarter") {
    data = api.reports.getQuarterlyData.useQuery().data;
  }
  const daily = data?.dateData;
  const transactions = api.reports.getTopExepense.useQuery().data;
  const topExpenses = transactions?.map((transaction) => ({
    description: transaction.description,
    amount: transaction.amount,
    date: transaction.date,
    category: transaction.category,
  }));
  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl bg-green-100 p-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="mb-1 text-sm font-medium text-gray-600">
            Total Income
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            ${data?.totalIncome}
          </p>
          <p className="mt-1 text-sm text-gray-500">This {periodParam}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl bg-red-100 p-3">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <h3 className="mb-1 text-sm font-medium text-gray-600">
            Total Expense
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            ${data?.totalExpense}
          </p>
          <p className="mt-1 text-sm text-gray-500">This {periodParam}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl bg-blue-100 p-3">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="mb-1 text-sm font-medium text-gray-600">
            Net Savings
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            ${data?.totalSavig}
          </p>
          <p className="mt-1 text-sm text-gray-500">This {periodParam}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl bg-purple-100 p-3">
              <Percent className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <h3 className="mb-1 text-sm font-medium text-gray-600">
            Savings Rate
          </h3>
          <p className="text-2xl font-bold text-gray-800">44.1%</p>
          <p className="mt-1 text-sm text-green-600">Above target</p>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {periodParam.toUpperCase()} Financial Overview
          </h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Income</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-gray-600">Expenses</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-600">Savings</span>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={daily}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(value, name) => [
                  String(value),
                  name === "income"
                    ? "Income"
                    : name === "expense"
                      ? "Expense"
                      : "Saving",
                ]}
              />
              <Area
                type="monotone"
                dataKey="income"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="expense"
                stackId="2"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="saving"
                stackId="3"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Expenses */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Top Expenses</h3>
          <button
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
            onClick={() => (window.location.href = "/AllTransaction")}
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {topExpenses?.map((expense, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {expense.description}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{expense.category}</span>
                  <span>•</span>
                  <span>{new Date(expense.date).toLocaleDateString()}</span>
                </div>
              </div>
              <span className="font-semibold text-gray-800">
                ${expense.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
