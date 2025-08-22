import { api } from "@/trpc/server";
import { CreditCard, Target, TrendingUp } from "lucide-react";

export const QuickStats = async () => {
  // todo - want user to set budget
  const budget = (await api.post.userData()).monthlyBudget;
  const transactionData = await api.post.getMontlyBalance();
  const quickStats = [
    {
      label: "This Month's Spending",
      amount: transactionData.monthlySpent,
      budget: budget,
      trend: 0,
      icon: CreditCard,
      color: "blue",
    },
    {
      label: "Available to Spend",
      amount: budget - transactionData.monthlySpent,
      trend: 0,
      icon: Target,
      color: "green",
    },
    {
      label: "Monthly Income",
      amount: transactionData.monthlyIncome,
      trend: 0,
      icon: TrendingUp,
      color: "purple",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {quickStats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-lg p-4 shadow-md bg-${stat.color}-100`}
        >
          <div className="flex items-center">
            <stat.icon className={`text-${stat.color}-500 mr-2 h-6 w-6`} />
            <h3 className="text-lg font-semibold">{stat.label}</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold">
            ${stat.amount.toFixed(2)}
          </p>
          {stat.trend !== 0 && (
            <p
              className={`text-sm ${stat.trend > 0 ? "text-green-500" : "text-red-500"}`}
            >
              {stat.trend > 0 ? "+" : ""}
              {stat.trend}%
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
