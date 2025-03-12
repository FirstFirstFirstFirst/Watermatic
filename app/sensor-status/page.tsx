import type { Metadata } from "next";
import { SensorMap } from "@/components/sensor-status/sensor-map";
import { SensorOverview } from "@/components/sensor-status/sensor-overview";
import { SensorTable } from "@/components/sensor-status/sensor-table";

export const metadata: Metadata = {
  title: "Sensor Status | Water Management System",
  description: "Monitor the status of all water sensors",
};

export default function SensorStatusPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Sensor Status Overview
        </h1>
      </div>
      <SensorOverview />
      <div className="grid gap-6 md:grid-cols-2">
        <SensorMap />
        <SensorTable />
      </div>
    </div>
  );
}
