"use client";
import {
  DashboardMetrics,
  MetricId,
} from "@/components/dashboard/dashboard-metrics";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";
import { WaterQualityCard } from "@/components/dashboard/water-quality-card";
import { WaterUsageCard } from "@/components/dashboard/water-usage-card";
import { WaterMetricChart } from "@/components/dashboard/water-metric-chart";
import { useState } from "react";

export default function DashboardPage() {
  const [activeMetric, setActiveMetric] = useState<MetricId>("flow-rate");

  const handleMetricClick = (metricId: MetricId) => {
    setActiveMetric(metricId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <DashboardMetrics
        onMetricClick={handleMetricClick}
        activeMetric={activeMetric}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WaterMetricChart className="lg:col-span-2" metricType={activeMetric} />
        <div className="space-y-6">
          <WaterUsageCard />
          <WaterQualityCard />
        </div>
      </div>
      <RecentAlerts />
    </div>
  );
}
