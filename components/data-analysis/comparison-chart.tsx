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

export function ComparisonChart() {
  const data = [
    { month: "September", usage: 3540 },
    { month: "October", usage: 3120 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Saving</CardTitle>
        <CardDescription>Monthly comparison (m³)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer data={data} xField="month" yField="usage" yDomain={[0, 4000]}>
            <ChartGrid horizontal />
            <ChartAxisX />
            <ChartAxisY />
            <ChartBar className="fill-blue-500" />
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
        <div className="mt-4 flex justify-center">
          <div className="rounded-md bg-green-100 px-3 py-1 text-sm text-green-800">420 m³ saved (11.9% reduction)</div>
        </div>
      </CardContent>
    </Card>
  )
}

