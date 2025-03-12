import type { Metadata } from "next"
import { MaintenanceAlerts } from "@/components/maintenance/maintenance-alerts"
import { MaintenanceCalendar } from "@/components/maintenance/maintenance-calendar"
import { MaintenanceStats } from "@/components/maintenance/maintenance-stats"
import { MaintenanceTasks } from "@/components/maintenance/maintenance-tasks"

export const metadata: Metadata = {
  title: "Maintenance | Water Management System",
  description: "View and manage maintenance alerts and tasks",
}

export default function MaintenancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Maintenance Alerts</h1>
      </div>
      <MaintenanceStats />
      <div className="grid gap-6 md:grid-cols-2">
        <MaintenanceAlerts />
        <MaintenanceCalendar />
      </div>
      <MaintenanceTasks />
    </div>
  )
}

