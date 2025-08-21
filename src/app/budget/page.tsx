import { QuickStats } from "./quickStats";
import { TotalBalance } from "./totalBalanceCard";
import { QuickActions } from "./quickActions";
import { SpendingChart } from "./spendingChart";

const page = () => {
  return (
    <div className="mx-auto mt-2 max-w-6xl px-6 py-8">
      <TotalBalance />
      <QuickStats />
      <QuickActions />
      <SpendingChart />
    </div>
  );
};

export default page;
