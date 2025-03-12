import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function LeakageMap() {
  const leakageData = [
    {
      id: 1,
      location: "Building A - Room 206A",
      type: "Pipe Leak",
      status: "Detected",
      estimatedLoss: "45 m³/month",
      detectedOn: "Oct 15, 2023",
    },
    {
      id: 2,
      location: "Swimming Pool",
      type: "Structural Leak",
      status: "Confirmed",
      estimatedLoss: "35 m³/month",
      detectedOn: "Oct 10, 2023",
    },
    {
      id: 3,
      location: "Building B - Basement",
      type: "Valve Leak",
      status: "Suspected",
      estimatedLoss: "20 m³/month",
      detectedOn: "Oct 18, 2023",
    },
    {
      id: 4,
      location: "Main Supply Line",
      type: "Joint Leak",
      status: "Confirmed",
      estimatedLoss: "20 m³/month",
      detectedOn: "Oct 5, 2023",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leakage Detection</CardTitle>
        <CardDescription>Identified water leakage points</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Estimated Loss</TableHead>
              <TableHead>Detected On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leakageData.map((leak) => (
              <TableRow key={leak.id}>
                <TableCell className="font-medium">{leak.location}</TableCell>
                <TableCell>{leak.type}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      leak.status === "Confirmed"
                        ? "bg-red-100 text-red-800"
                        : leak.status === "Detected"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {leak.status}
                  </div>
                </TableCell>
                <TableCell>{leak.estimatedLoss}</TableCell>
                <TableCell>{leak.detectedOn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
          <p className="font-medium">Total estimated water loss: 120 m³/month</p>
          <p className="mt-1">Potential savings: $180/month if all leaks are fixed</p>
        </div>
      </CardContent>
    </Card>
  )
}

