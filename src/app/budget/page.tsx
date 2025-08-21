import { QuickStats } from "./quickStats";
import { TotalBalance } from "./totalBalanceCard";
import { QuickActions } from "./quickActions";

const page = () => {
  return (
    <div className="mx-auto mt-2 max-w-6xl px-6 py-8">
      <TotalBalance />
      <QuickStats />
      <QuickActions />
    </div>
  );
};

export default page;
