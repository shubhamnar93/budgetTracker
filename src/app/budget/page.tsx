import { QuickStats } from "./quickStats";
import { TotalBalance } from "./totalBalanceCard";
import { QuickActions } from "./quickActions";
import { SpendingChart } from "./spendingChart";
import { WeeklySpending } from "./weeklySpending";
import { RecentActivity } from "./RecentActivity";

const page = () => {
  return (
    <div className="mx-auto mt-2 max-w-6xl px-6 py-8">
      <TotalBalance />
      <QuickStats />
      <QuickActions />
      <SpendingChart />
      <WeeklySpending />
      <RecentActivity />
    </div>
  );
};

export default page;
