"use client";
import { ArrowRight, PieChart, Plus, TrendingUp } from "lucide-react";

export const QuickActions = () => {
  return (
    <div className="mt-7 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Quick Actions
      </h3>
      <div className="space-y-3">
        <button
          className="group flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 transition-all duration-200 hover:from-blue-100 hover:to-blue-200"
          onClick={() => {
            window.location.href = "/AddItem?type=expense";
          }}
        >
          <div className="flex items-center">
            <div className="mr-3 rounded-lg bg-blue-600 p-2">
              <Plus className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-blue-900">Add Expense</span>
          </div>
          <ArrowRight className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          className="group flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-4 transition-all duration-200 hover:from-green-100 hover:to-green-200"
          onClick={() => {
            window.location.href = "/AddItem?type=income";
          }}
        >
          <div className="flex items-center">
            <div className="mr-3 rounded-lg bg-green-600 p-2">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-green-900">Add Income</span>
          </div>
          <ArrowRight className="h-4 w-4 text-green-600 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          className="group flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 p-4 transition-all duration-200 hover:from-purple-100 hover:to-purple-200"
          onClick={() => (window.location.href = "/reports")}
        >
          <div className="flex items-center">
            <div className="mr-3 rounded-lg bg-purple-600 p-2">
              <PieChart className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-purple-900">View Reports</span>
          </div>
          <ArrowRight className="h-4 w-4 text-purple-600 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
