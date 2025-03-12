import { BarChart3, Droplet, TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AnalysisSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Water Usage</CardDescription>
          <CardTitle className="text-2xl">3,120 m³/month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
            <span>8.2% decrease from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Water Leakage</CardDescription>
          <CardTitle className="text-2xl">4 locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground">
            <Droplet className="mr-1 h-4 w-4 text-blue-500" />
            <span>Estimated 120 m³ loss</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Efficiency Score</CardDescription>
          <CardTitle className="text-2xl">82/100</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
            <span>5 points improvement</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Cost Savings</CardDescription>
          <CardTitle className="text-2xl">$630/month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground">
            <BarChart3 className="mr-1 h-4 w-4 text-blue-500" />
            <span>Based on current efficiency</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

