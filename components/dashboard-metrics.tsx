import { Droplet, Gauge, Thermometer, Waves } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card className="border-blue-500">
        <CardHeader className="pb-2">
          <CardDescription>Water Flow Rate</CardDescription>
          <CardTitle className="text-2xl">37.6 L/min</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Waves className="mr-1 h-4 w-4 text-blue-500" />
              <span>Normal</span>
            </div>
            <div>+2.5%</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Water Level</CardDescription>
          <CardTitle className="text-2xl">2.5 m</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Droplet className="mr-1 h-4 w-4 text-blue-500" />
              <span>Normal</span>
            </div>
            <div>-0.3%</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Water Pressure</CardDescription>
          <CardTitle className="text-2xl">2.8 bar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Gauge className="mr-1 h-4 w-4 text-blue-500" />
              <span>Normal</span>
            </div>
            <div>+0.1%</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Turbidity</CardDescription>
          <CardTitle className="text-2xl">1.5 NTU</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Waves className="mr-1 h-4 w-4 text-blue-500" />
              <span>Normal</span>
            </div>
            <div>-0.2%</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Water pH</CardDescription>
          <CardTitle className="text-2xl">7.1</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Thermometer className="mr-1 h-4 w-4 text-blue-500" />
              <span>Normal</span>
            </div>
            <div>+0.1%</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

