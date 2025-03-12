import { AlertCircle, AlertTriangle, Clock } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MaintenanceAlerts() {
  const alerts = [
    {
      id: 1,
      title: "Water leak detected",
      location: "Building A - Room 206A",
      time: "2 hours ago",
      priority: "urgent",
      description: "Sensor detected water accumulation. Possible pipe leak.",
    },
    {
      id: 2,
      title: "Pressure fluctuation",
      location: "Main Supply Line",
      time: "5 hours ago",
      priority: "normal",
      description: "Pressure readings outside normal range. Check regulator.",
    },
    {
      id: 3,
      title: "pH level outside range",
      location: "Swimming Pool",
      time: "1 day ago",
      priority: "normal",
      description: "pH level at 8.7, above recommended range. Adjust chemicals.",
    },
    {
      id: 4,
      title: "Unusual consumption pattern",
      location: "Building C - Floor 3",
      time: "2 days ago",
      priority: "normal",
      description: "Consumption spike detected during off-hours. Investigate possible causes.",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Alerts</CardTitle>
        <CardDescription>Recent maintenance alerts requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Today</h3>
            <div className="space-y-4">
              {alerts.slice(0, 2).map((alert) => (
                <div key={alert.id} className="flex gap-4">
                  <div
                    className={`mt-0.5 rounded-full p-1 ${
                      alert.priority === "urgent" ? "bg-yellow-100" : "bg-blue-100"
                    }`}
                  >
                    {alert.priority === "urgent" ? (
                      <AlertTriangle
                        className={`h-4 w-4 ${alert.priority === "urgent" ? "text-yellow-600" : "text-blue-600"}`}
                      />
                    ) : (
                      <AlertCircle
                        className={`h-4 w-4 ${alert.priority === "urgent" ? "text-yellow-600" : "text-blue-600"}`}
                      />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{alert.title}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {alert.time}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.location}</p>
                    <p className="text-sm">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">2 days ago</h3>
            <div className="space-y-4">
              {alerts.slice(2).map((alert) => (
                <div key={alert.id} className="flex gap-4">
                  <div
                    className={`mt-0.5 rounded-full p-1 ${
                      alert.priority === "urgent" ? "bg-yellow-100" : "bg-blue-100"
                    }`}
                  >
                    {alert.priority === "urgent" ? (
                      <AlertTriangle
                        className={`h-4 w-4 ${alert.priority === "urgent" ? "text-yellow-600" : "text-blue-600"}`}
                      />
                    ) : (
                      <AlertCircle
                        className={`h-4 w-4 ${alert.priority === "urgent" ? "text-yellow-600" : "text-blue-600"}`}
                      />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{alert.title}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {alert.time}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.location}</p>
                    <p className="text-sm">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

