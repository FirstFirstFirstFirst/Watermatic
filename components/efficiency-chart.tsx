"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartArea,
  ChartAxisX,
  ChartAxisY,
  ChartContainer,
  ChartGrid,
  ChartLine,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function EfficiencyChart() {
  const data = [
    { month: "July", efficiency: 72 },
    { month: "August", efficiency: 75 },
    { month: "September", efficiency: 78 },
    { month: "October", efficiency: 82 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Efficiency</CardTitle>
        <CardDescription>Efficiency score trend (0-100)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer data={data} xField="month" yField="efficiency" yDomain={[60, 90]}>
            <ChartGrid horizontal vertical />
            <ChartAxisX />
            <ChartAxisY />
            <ChartArea className="fill-gradient-to-t from-yellow-500/20 to-green-500/20" />
            <ChartLine curve="monotone" strokeWidth={3} className="stroke-gradient-to-r from-yellow-500 to-green-500" />
            <ChartTooltip>
              {({ point }) => (
                <ChartTooltipContent>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">{point.month}</div>
                    <div className="text-sm font-semibold">Score: {point.efficiency}/100</div>
                  </div>
                </ChartTooltipContent>
              )}
            </ChartTooltip>
          </ChartContainer>
        </div>
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <div>Poor: &lt;70</div>
          <div>Average: 70-80</div>
          <div>Good: &gt;80</div>
        </div>
      </CardContent>
    </Card>
  )
}

