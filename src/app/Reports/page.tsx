import { Controls } from "./controls";
import { Overview } from "./overview";
export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Controls />
      <Overview />
    </div>
  );
}
