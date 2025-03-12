"use client"

import type React from "react"

import { useMemo } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement)

interface ChartProps<T> {
  data: T[]
  xField: keyof T
  yField: keyof T
  yDomain?: number[]
  series?: { name: string; field: keyof T }[]
  className?: string
}

export const Chart = <T extends object>(props: ChartProps<T>) => {
  const { data, xField, yField, yDomain, series, className } = props

  const chartData = useMemo(() => {
    const labels = data.map((item) => item[xField] as string)
    const datasets = series
      ? series.map((s) => ({
          label: s.name,
          data: data.map((item) => item[s.field] as number),
          borderColor: s.name === "Actual" ? "#3b82f6" : "#fb923c",
          tension: 0.4,
          fill: false,
          pointRadius: 3,
          pointBackgroundColor: s.name === "Actual" ? "#3b82f6" : "#fb923c",
        }))
      : [
          {
            label: yField.toString(),
            data: data.map((item) => item[yField] as number),
            borderColor: "#3b82f6",
            tension: 0.4,
            fill: false,
            pointRadius: 3,
            pointBackgroundColor: "#3b82f6",
          },
        ]

    return {
      labels,
      datasets,
    }
  }, [data, xField, yField, series])

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          min: yDomain ? yDomain[0] : undefined,
          max: yDomain ? yDomain[1] : undefined,
          grid: {
            drawBorder: false,
          },
        },
      },
      plugins: {
        legend: {
          display: series ? true : false,
          position: "bottom",
        },
      },
    }),
    [yDomain, series],
  )

  return (
    <div className={className}>
      <Line data={chartData} options={options} />
    </div>
  )
}

export const ChartArea = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartAxisX = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartAxisY = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartContainer = <T extends object>({
  children,
  data,
  xField,
  yField,
  yDomain,
}: {
  children: React.ReactNode
  data: T[]
  xField: keyof T
  yField: keyof T
  yDomain?: number[]
}) => {
  return (
    <Chart data={data} xField={xField} yField={yField} yDomain={yDomain}>
      {children}
    </Chart>
  )
}

export const ChartGrid = ({ horizontal, vertical }: { horizontal: boolean; vertical: boolean }) => {
  return <></>
}

export const ChartLine = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartTooltipContent = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartBar = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

