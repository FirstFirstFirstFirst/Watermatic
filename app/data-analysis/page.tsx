import type { Metadata } from "next"
import { AnalysisSummary } from "@/components/data-analysis/analysis-summary"
import { ComparisonChart } from "@/components/data-analysis/comparison-chart"
import { EfficiencyChart } from "@/components/data-analysis/efficiency-chart"
import { LeakageMap } from "@/components/data-analysis/leakage-map"

export const metadata: Metadata = {
  title: "Data Analysis | Water Management System",
  description: "Analyze water usage data and identify trends",
}

export default function DataAnalysisPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Data Analysis</h1>
      </div>
      <AnalysisSummary />
      <div className="grid gap-6 md:grid-cols-2">
        <ComparisonChart />
        <EfficiencyChart />
      </div>
      <LeakageMap />
    </div>
  )
}

