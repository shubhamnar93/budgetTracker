"use client";
import type { AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";
import { use } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export const SpendingChart = ({
  res,
}: {
  res: Promise<inferRouterOutputs<AppRouter>["transaction"]["getCategories"]>;
}) => {
  const result = use(res);
  const categoryData = [
    { name: "Housing", value: result?.housing, color: "#3B82F6" },
    { name: "Food", value: result?.food, color: "#10B981" },
    { name: "Transport", value: result?.transport, color: "#8B5CF6" },
    { name: "Shopping", value: result?.shopping, color: "#EF4444" },
    { name: "Entertaiment", value: result?.entertainment, color: "#ca8a04" },
    { name: "Healthcare", value: result?.healthcare, color: "#dc2626" },
    { name: "Coffee", value: result?.coffee, color: "#ea580c" },
    { name: "Other", value: result?.other, color: "#F59E0B" },
  ];
  return (
    <div className="mt-7 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Spending by Category
      </h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [String(value), String(name)]}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {categoryData.map((category, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center">
              <div
                className="mr-2 h-3 w-3 rounded-full"
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="text-gray-600">{category.name}</span>
            </div>
            <span className="font-medium text-gray-800">${category.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
