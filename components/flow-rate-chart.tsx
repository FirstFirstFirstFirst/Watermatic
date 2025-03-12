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

interface FlowRateChartProps {
  className?: string
}

export function FlowRateChart({ className }: FlowRateChartProps) {
  const data = [
    { date: "Aug 24", value: 25.4 },
    { date: "Aug 31", value: 28.7 },
    { date: "Sep 07", value: 22.3 },
    { date: "Sep 14", value: 18.2 },
    { date: "Sep 21", value: 24.5 },
    { date: "Sep 28", value: 30.1 },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Water Flow Rate Overview</CardTitle>
        <CardDescription>Flow rate measurements over time (L/min)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer data={data} xField="date" yField="value" yDomain={[0, 40]}>
            <ChartGrid horizontal vertical />
            <ChartAxisX />
            <ChartAxisY />
            <ChartArea />
            <ChartLine curve="monotone" strokeWidth={3} className="stroke-blue-500" />
            <ChartTooltip>
              {({ point }) => (
                <ChartTooltipContent>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">{point.date}</div>
                    <div className="text-sm font-semibold">{point.value} L/min</div>
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

