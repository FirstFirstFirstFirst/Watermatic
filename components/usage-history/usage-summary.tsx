import { TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function UsageSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Current Month Usage</CardDescription>
          <CardTitle className="text-2xl">3,120 m³</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
            <span>8.2% less than last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Predicted Next Month</CardDescription>
          <CardTitle className="text-2xl">3,000 m³</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
            <span>3.8% less than predicted</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Year-to-Date Usage</CardDescription>
          <CardTitle className="text-2xl">32,620 m³</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
            <span>5.3% less than last year</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Average Daily Usage</CardDescription>
          <CardTitle className="text-2xl">104 m³</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingUp className="mr-1 h-4 w-4 text-red-500" />
            <span>2.1% more than last week</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

