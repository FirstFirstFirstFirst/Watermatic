"use client";
import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColorType, Time } from "lightweight-charts";

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
    const initChart = async () => {
      if (!chartContainerRef.current) return;

      // Import the library dynamically to ensure it's only loaded in the browser
      const { createChart, AreaSeries } = await import("lightweight-charts");

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
        },
        handleScroll: false,
        handleScale: false,
        width: element.clientWidth,
        height: element.clientHeight,
      };

      const chart = createChart(element, chartOptions);

      // Make chart responsive
      const resizeObserver = new ResizeObserver(() => {
        if (!element) return;
        chart.applyOptions({
          width: element.clientWidth,
          height: element.clientHeight || 300,
        });
        chart.timeScale().fitContent();
      });

      resizeObserver.observe(element);

      // Add area series
      const areaSeries = chart.addSeries(AreaSeries, {
        lineColor: "#2962FF", // Primary blue color
        topColor: "#2962FF",
        bottomColor: "rgba(41, 98, 255, 0.28)",
        lineWidth: 3,
      });

      // Prepare data in format expected by the chart
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
    };

    initChart();
  }, []);

  return (
    <Card className={`${className} h-full`}>
      <CardHeader>
        <CardTitle>Water Flow Rate Overview</CardTitle>
        <CardDescription>
          Flow rate measurements over time (L/min)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={chartContainerRef} className="h-full w-full min-h-[500px]" />
      </CardContent>
    </Card>
  );
}
