import type { Metadata } from "next";
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics";
import { FlowRateChart } from "@/components/dashboard/flow-rate-chart";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";
import { WaterQualityCard } from "@/components/dashboard/water-quality-card";
import { WaterUsageCard } from "@/components/dashboard/water-usage-card";

export const metadata: Metadata = {
  title: "Dashboard | Water Management System",
  description: "Monitor your water usage and system status",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <DashboardMetrics />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FlowRateChart className="lg:col-span-2" />
        <div className="space-y-6">
          <WaterUsageCard />
          <WaterQualityCard />
        </div>
      </div>
      <RecentAlerts />
    </div>
  );
}
