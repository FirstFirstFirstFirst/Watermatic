"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartAxisX,
  ChartAxisY,
  ChartContainer,
  ChartGrid,
  ChartLine,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function UsageTrends() {
  const data = [
    { week: "Week 1", actual: 780, target: 800 },
    { week: "Week 2", actual: 820, target: 800 },
    { week: "Week 3", actual: 750, target: 780 },
    { week: "Week 4", actual: 770, target: 760 },
    { week: "Week 5", actual: 720, target: 740 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage vs Target</CardTitle>
        <CardDescription>Weekly comparison with conservation targets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            data={data}
            xField="week"
            series={[
              { name: "Actual", field: "actual" },
              { name: "Target", field: "target" },
            ]}
            yDomain={[700, 850]}
          >
            <ChartGrid horizontal vertical />
            <ChartAxisX />
            <ChartAxisY />
            <ChartLine name="Actual" curve="monotone" strokeWidth={3} className="stroke-blue-500" />
            <ChartLine
              name="Target"
              curve="monotone"
              strokeWidth={2}
              strokeDasharray="5,5"
              className="stroke-orange-400"
            />
            <ChartTooltip>
              {({ point, series }) => (
                <ChartTooltipContent>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">{point.week}</div>
                    {series.map((s) => (
                      <div key={s.name} className="flex items-center gap-2 text-sm">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: s.name === "Actual" ? "#3b82f6" : "#fb923c",
                          }}
                        />
                        <span>
                          {s.name}: {point[s.field]} m³
                        </span>
                      </div>
                    ))}
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

