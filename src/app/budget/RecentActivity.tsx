"use client";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

export const RecentActivity = () => {
  // todo: replace with real data and remember to show only 1 day activity
  const recentActivity = [
    {
      id: 1,
      type: "expense",
      description: "Whole Foods",
      amount: 127.45,
      category: "Groceries",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "income",
      description: "Freelance Payment",
      amount: 850.0,
      category: "Income",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "expense",
      description: "Uber Ride",
      amount: 18.5,
      category: "Transportation",
      time: "1 day ago",
    },
  ];

  const mothlyTransactions = 23; // todo: replace with real data
  const averageDailySpending = 127; // todo: replace with real data
  return (
    <div className="mt-7 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
        <button className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {recentActivity.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`rounded-xl p-3 ${
                  activity.type === "expense" ? "bg-red-100" : "bg-green-100"
                }`}
              >
                {activity.type === "expense" ? (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                ) : (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {activity.description}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{activity.category}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
            <div
              className={`text-lg font-semibold ${
                activity.type === "expense" ? "text-gray-800" : "text-green-600"
              }`}
            >
              {activity.type === "expense" ? "-" : "+"}$
              {activity.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-gray-50 p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">
              {mothlyTransactions}
            </p>
            <p className="text-sm text-gray-600">Transactions this month</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">
              ${averageDailySpending.toFixed(0)}
            </p>
            <p className="text-sm text-gray-600">Average daily spending</p>
          </div>
        </div>
      </div>
    </div>
  );
};
