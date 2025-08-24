"use client";
import { api } from "@/trpc/react";
import { BarChart3 } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const WeeklySpending = () => {
  const weeklyData = api.transaction.getWeeklyBalance.useQuery().data;
  const weeklySpendingData = [
    { day: "Mon", amount: weeklyData?.days[0]?.spent },
    { day: "Tue", amount: weeklyData?.days[1]?.spent },
    { day: "Wed", amount: weeklyData?.days[2]?.spent },
    { day: "Thu", amount: weeklyData?.days[3]?.spent },
    { day: "Fri", amount: weeklyData?.days[4]?.spent },
    { day: "Sat", amount: weeklyData?.days[5]?.spent },
    { day: "Sun", amount: weeklyData?.days[6]?.spent },
  ];

  return (
    <div className="mt-7 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Weekly Spending</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <BarChart3 className="h-4 w-4" />
          <span>This week</span>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklySpendingData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip formatter={(value) => [String(value), "Spent"]} />
            <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
