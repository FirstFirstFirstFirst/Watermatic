"use client";

import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createChart, ColorType, AreaSeries, Time } from "lightweight-charts";

interface FlowRateChartProps {
  className?: string;
}

interface ChartData {
  time: number;
  value: number;
}

export function FlowRateChart({ className }: FlowRateChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Sample data with Unix timestamps
  const data: ChartData[] = [
    { time: 1661299200, value: 25.4 }, // Aug 24
    { time: 1661904000, value: 28.7 }, // Aug 31
    { time: 1662508800, value: 22.3 }, // Sep 07
    { time: 1663113600, value: 18.2 }, // Sep 14
    { time: 1663718400, value: 24.5 }, // Sep 21
    { time: 1664323200, value: 30.1 }, // Sep 28
  ];

  useEffect(() => {
    if (chartContainerRef.current) {
      // Clear any existing chart
      const element = chartContainerRef.current;
      element.innerHTML = "";

      // Create chart with styling options
      const chartOptions = {
        layout: {
          textColor: "hsl(var(--foreground))",
          background: { type: "solid" as ColorType, color: "transparent" },
        },
        grid: {
          vertLines: {
            color: "rgba(200, 200, 200, 0.2)",
          },
          horzLines: {
            color: "rgba(200, 200, 200, 0.2)",
          },
        },
        rightPriceScale: {
          borderVisible: false,
        },
        timeScale: {
          borderVisible: false,
          timeVisible: true,
          tickMarkFormatter: (time: number) => {
            const date = new Date(time * 1000);
            const month = date.toLocaleString("default", { month: "short" });
            const day = date.getDate();
            return `${month} ${day}`;
          },
        },
        handleScroll: false,
        handleScale: false,
      };

      const chart = createChart(element, chartOptions);

      // Make chart responsive
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries.length === 0 || !element) return;
        const { width, height } = entries[0].contentRect;
        chart.applyOptions({ width, height });
      });

      resizeObserver.observe(element);

      // Add area series
      const areaSeries = chart.addSeries(AreaSeries, {
        lineColor: "hsl(var(--primary))",
        topColor: "hsla(var(--primary), 0.4)",
        bottomColor: "hsla(var(--primary), 0.1)",
        lineWidth: 3,
      });

      const seriesData = data.map((item) => ({
        time: item.time as Time,
        value: item.value,
      }));

      areaSeries.setData(seriesData);
      // Fit all data to view
      chart.timeScale().fitContent();

      return () => {
        chart.remove();
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Water Flow Rate Overview</CardTitle>
        <CardDescription>
          Flow rate measurements over time (L/min)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={chartContainerRef} className="h-[300px] w-full" />
      </CardContent>
    </Card>
  );
}
