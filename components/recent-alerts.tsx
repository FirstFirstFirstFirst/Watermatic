import { AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function RecentAlerts() {
  const alerts = [
    {
      id: 1,
      location: "Building A - Room 206A",
      issue: "Potential water leak detected",
      severity: "High",
      time: "2 hours ago",
    },
    {
      id: 2,
      location: "Main Supply Line",
      issue: "Pressure fluctuation",
      severity: "Medium",
      time: "5 hours ago",
    },
    {
      id: 3,
      location: "Swimming Pool",
      issue: "pH level outside normal range",
      severity: "Low",
      time: "1 day ago",
    },
    {
      id: 4,
      location: "Building C - Floor 3",
      issue: "Unusual water consumption pattern",
      severity: "Medium",
      time: "2 days ago",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Showing the 4 most recent alerts from your system</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell className="font-medium">{alert.location}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    {alert.issue}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      alert.severity === "High"
                        ? "bg-red-100 text-red-800"
                        : alert.severity === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {alert.severity}
                  </div>
                </TableCell>
                <TableCell>{alert.time}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href="/maintenance">
            View All Alerts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

