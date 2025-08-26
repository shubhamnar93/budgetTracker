"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { api } from "@/trpc/react";

export const TotalBalance = () => {
  //todo:  get budget from user
  const [balanceVisible, setBalanceVisible] = useState(true);
  const { data } = api.user.userData.useQuery();
  const monthlyBalance = api.transaction.getMontlyBalance.useQuery();
  const totalBalance = api.transaction.getTotalBalance.useQuery().data ?? 0;
  const monthlySpent = monthlyBalance.data?.monthlySpent ?? 0;

  if (!data) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }
  const userData = data;
  const spendingPercentage = (monthlySpent / totalBalance) * 100;
  return (
    <div className="mb-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-white/10"></div>
        <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/5"></div>

        <div className="relative">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-blue-100">
                Total Balance
              </p>
              <div className="flex items-center space-x-3">
                {balanceVisible ? (
                  <h2 className="text-4xl font-bold">
                    ${totalBalance.toFixed(2)}
                  </h2>
                ) : (
                  <h2 className="text-4xl font-bold">••••••</h2>
                )}
                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="rounded-lg p-2 transition-colors hover:bg-white/20"
                >
                  {balanceVisible ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">
                {userData.daysLeftInMonth} days left
              </p>
              <p className="font-medium text-white">this month</p>
            </div>
          </div>

          {/* Monthly Progress */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-blue-100">Monthly Budget Progress</span>
              <span className="font-medium text-white">
                {spendingPercentage.toFixed(0)}% used
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-white/20">
              <div
                className="h-3 rounded-full bg-white shadow-sm transition-all duration-500"
                style={{ width: `${Math.min(spendingPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-blue-100">
              <span>${monthlySpent.toFixed(2)} spent</span>
              <span>
                ${totalBalance.toFixed(2)}
                remaining
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
