import { QuickStats } from "./quickStats";
import { TotalBalance } from "./totalBalanceCard";
import { QuickActions } from "./quickActions";
import { SpendingChart } from "./spendingChart";
import { WeeklySpending } from "./weeklySpending";
import { RecentActivity } from "./RecentActivity";
import { NavigationHint } from "./navigationHint";
import { api } from "@/trpc/server";
import { Suspense } from "react";
import { LoadingSpinner } from "../_components/loadingSpinner";

const page = () => {
  const monthly = api.transaction.getMontlyBalance();
  const total = api.transaction.getTotalBalance();
  const user = api.user.userData();
  const res = api.transaction.getCategories();
  const recent = api.transaction.getTrasactions3();
  const weekly = api.transaction.getWeeklyBalance();
  return (
    <div className="mx-auto mt-2 max-w-6xl px-6 py-8">
      <Suspense
        fallback={
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-white">
            <LoadingSpinner size={50} what={"Dashboard"} />
          </div>
        }
      >
        <TotalBalance user={user} monthly={monthly} total={total} />
        <QuickStats />
        <QuickActions />
        <SpendingChart res={res} />
        <WeeklySpending weekly={weekly} />
        <RecentActivity recent={recent} monthly={monthly} />
        <NavigationHint />
      </Suspense>
    </div>
  );
};

export default page;
