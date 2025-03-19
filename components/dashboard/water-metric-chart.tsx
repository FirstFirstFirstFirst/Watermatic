"use client";
import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MetricId } from "./dashboard-metrics";
import { AreaSeries, ColorType, createChart, Time } from "lightweight-charts";

interface WaterMetricChartProps {
  className?: string;
  metricType: MetricId;
}

interface ChartData {
  time: number;
  value: number;
}

// Chart data for different metrics
const chartData: Record<MetricId, ChartData[]> = {
  "flow-rate": [
    { time: 1661299200, value: 25.4 },
    { time: 1661904000, value: 28.7 },
    { time: 1662508800, value: 22.3 },
    { time: 1663113600, value: 18.2 },
    { time: 1663718400, value: 24.5 },
    { time: 1664323200, value: 30.1 },
  ],
  "water-level": [
    { time: 1661299200, value: 2.2 },
    { time: 1661904000, value: 2.4 },
    { time: 1662508800, value: 2.6 },
    { time: 1663113600, value: 2.5 },
    { time: 1663718400, value: 2.3 },
    { time: 1664323200, value: 2.5 },
  ],
  "water-pressure": [
    { time: 1661299200, value: 2.7 },
    { time: 1661904000, value: 2.9 },
    { time: 1662508800, value: 2.8 },
    { time: 1663113600, value: 2.7 },
    { time: 1663718400, value: 2.6 },
    { time: 1664323200, value: 2.8 },
  ],
  turbidity: [
    { time: 1661299200, value: 1.3 },
    { time: 1661904000, value: 1.6 },
    { time: 1662508800, value: 1.7 },
    { time: 1663113600, value: 1.4 },
    { time: 1663718400, value: 1.3 },
    { time: 1664323200, value: 1.5 },
  ],
  "water-ph": [
    { time: 1661299200, value: 7.0 },
    { time: 1661904000, value: 7.2 },
    { time: 1662508800, value: 7.1 },
    { time: 1663113600, value: 7.0 },
    { time: 1663718400, value: 7.1 },
    { time: 1664323200, value: 7.1 },
  ],
};

// Chart titles for different metrics
const chartTitles: Record<MetricId, string> = {
  "flow-rate": "Water Flow Rate Overview",
  "water-level": "Water Level Overview",
  "water-pressure": "Water Pressure Overview",
  turbidity: "Turbidity Overview",
  "water-ph": "Water pH Overview",
};

// Chart descriptions for different metrics
const chartDescriptions: Record<MetricId, string> = {
  "flow-rate": "Flow rate measurements over time (L/min)",
  "water-level": "Water level measurements over time (m)",
  "water-pressure": "Water pressure measurements over time (bar)",
  turbidity: "Turbidity measurements over time (NTU)",
  "water-ph": "Water pH measurements over time",
};

// Chart colors for different metrics
const chartColors: Record<MetricId, string> = {
  "flow-rate": "#2962FF",
  "water-level": "#0097A7",
  "water-pressure": "#7B1FA2",
  turbidity: "#FFA000",
  "water-ph": "#388E3C",
};

export function WaterMetricChart({
  className,
  metricType,
}: WaterMetricChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChart = async () => {
      if (!chartContainerRef.current) return;

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

      // Get the correct color and data for the current metric
      const color = chartColors[metricType];
      const data = chartData[metricType];

      // Add area series
      const areaSeries = chart.addSeries(AreaSeries, {
        lineColor: color,
        topColor: color,
        bottomColor: `${color}47`, // Adding alpha transparency
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
  }, [metricType]);

  return (
    <Card className={`${className} h-full`}>
      <CardHeader>
        <CardTitle>{chartTitles[metricType]}</CardTitle>
        <CardDescription>{chartDescriptions[metricType]}</CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={chartContainerRef} className="h-full w-full min-h-[500px]" />
      </CardContent>
    </Card>
  );
}
