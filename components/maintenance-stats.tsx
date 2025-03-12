import { CheckCircle, Clock, Wrench } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MaintenanceStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Active Alerts</CardDescription>
          <CardTitle className="text-2xl">4</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4 text-yellow-500" />
            <span>1 urgent, 3 normal</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Scheduled Maintenance</CardDescription>
          <CardTitle className="text-2xl">2</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground">
            <Wrench className="mr-1 h-4 w-4 text-blue-500" />
            <span>Next: Today, 2:00 PM</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Completed This Month</CardDescription>
          <CardTitle className="text-2xl">7</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
            <span>All tasks completed on time</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Average Response Time</CardDescription>
          <CardTitle className="text-2xl">1.2 hrs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4 text-blue-500" />
            <span>15% faster than last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

