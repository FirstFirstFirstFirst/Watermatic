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

export function UsageHistoryChart() {
  const data = [
    { month: "Jan", usage: 2800 },
    { month: "Feb", usage: 2600 },
    { month: "Mar", usage: 2900 },
    { month: "Apr", usage: 3100 },
    { month: "May", usage: 3300 },
    { month: "Jun", usage: 3500 },
    { month: "Jul", usage: 3700 },
    { month: "Aug", usage: 3600 },
    { month: "Sep", usage: 3400 },
    { month: "Oct", usage: 3120 },
    { month: "Nov", usage: 3000 },
    { month: "Dec", usage: 3000 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Annual Water Usage</CardTitle>
        <CardDescription>Monthly water consumption (m³)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer data={data} xField="month" yField="usage" yDomain={[2000, 4000]}>
            <ChartGrid horizontal vertical />
            <ChartAxisX />
            <ChartAxisY />
            <ChartArea className="fill-blue-500/20" />
            <ChartLine curve="monotone" strokeWidth={3} className="stroke-blue-500" />
            <ChartTooltip>
              {({ point }) => (
                <ChartTooltipContent>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">{point.month}</div>
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

