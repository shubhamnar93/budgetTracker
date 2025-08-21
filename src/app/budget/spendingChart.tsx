"use client";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export const SpendingChart = () => {
  //todo - replace with actual data fetching logic
  const categoryData = [
    { name: "Housing", value: 1450, color: "#3B82F6" },
    { name: "Food", value: 920, color: "#10B981" },
    { name: "Transport", value: 380, color: "#8B5CF6" },
    { name: "Shopping", value: 640, color: "#EF4444" },
    { name: "Other", value: 230, color: "#F59E0B" },
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
