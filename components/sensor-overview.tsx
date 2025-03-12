import { BatteryCharging, Signal, SignalLow, SignalMedium } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SensorOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Sensors</CardDescription>
          <CardTitle className="text-2xl">24</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Signal className="mr-1 h-4 w-4 text-blue-500" />
              <span>All systems operational</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Active Alerts</CardDescription>
          <CardTitle className="text-2xl">1</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <SignalLow className="mr-1 h-4 w-4 text-red-500" />
              <span>Requires attention</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Battery Status</CardDescription>
          <CardTitle className="text-2xl">92%</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <BatteryCharging className="mr-1 h-4 w-4 text-green-500" />
              <span>2 sensors charging</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Connectivity</CardDescription>
          <CardTitle className="text-2xl">23/24</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <SignalMedium className="mr-1 h-4 w-4 text-yellow-500" />
              <span>1 sensor offline</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

