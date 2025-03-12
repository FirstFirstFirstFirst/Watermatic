import type { Metadata } from "next";
import { UsageHistoryChart } from "@/components/usage-history/usage-history-chart";
import { UsageSummary } from "@/components/usage-history/usage-summary";
import { UsageTable } from "@/components/usage-history/usage-table";
import { UsageTrends } from "@/components/usage-history/usage-trends";

export const metadata: Metadata = {
  title: "Usage History | Water Management System",
  description: "View and analyze your water usage history",
};

export default function UsageHistoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Usage History</h1>
      </div>
      <UsageSummary />
      <div className="grid gap-6 md:grid-cols-2">
        <UsageHistoryChart />
        <UsageTrends />
      </div>
      <UsageTable />
    </div>
  );
}
