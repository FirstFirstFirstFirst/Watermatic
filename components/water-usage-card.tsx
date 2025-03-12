"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartAxisX,
  ChartAxisY,
  ChartBar,
  ChartContainer,
  ChartGrid,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function WaterUsageCard() {
  const data = [
    { day: "Mon", usage: 120 },
    { day: "Tue", usage: 140 },
    { day: "Wed", usage: 110 },
    { day: "Thu", usage: 130 },
    { day: "Fri", usage: 150 },
    { day: "Sat", usage: 90 },
    { day: "Sun", usage: 80 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Usage</CardTitle>
        <CardDescription>Water consumption (m³)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ChartContainer data={data} xField="day" yField="usage" yDomain={[0, 200]}>
            <ChartGrid horizontal />
            <ChartAxisX />
            <ChartAxisY />
            <ChartBar className="fill-blue-500" />
            <ChartTooltip>
              {({ point }) => (
                <ChartTooltipContent>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">{point.day}</div>
                    <div className="text-sm font-semibold">{point.usage} m³</div>
                  </div>
                </ChartTooltipContent>
              )}
            </ChartTooltip>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

