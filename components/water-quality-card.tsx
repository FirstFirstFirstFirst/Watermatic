import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function WaterQualityCard() {
  const qualityMetrics = [
    { name: "pH Level", value: 7.1, min: 6.5, max: 8.5, status: "Optimal" },
    { name: "Chlorine", value: 1.2, min: 0.5, max: 2.0, status: "Good" },
    { name: "Turbidity", value: 1.5, min: 0, max: 5, status: "Excellent" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Quality</CardTitle>
        <CardDescription>Current water quality metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {qualityMetrics.map((metric) => {
            const percentage = ((metric.value - metric.min) / (metric.max - metric.min)) * 100

            return (
              <div key={metric.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-medium">{metric.name}</div>
                  <div className="text-muted-foreground">
                    {metric.value} ({metric.status})
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <div>{metric.min}</div>
                  <div>{metric.max}</div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

