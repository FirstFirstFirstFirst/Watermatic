"use client";

import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createChart,
  ColorType,
  HistogramSeries,
  Time,
} from "lightweight-charts";

interface WaterUsageData {
  day: string;
  usage: number;
}

interface CustomHistogramData {
  time: number;
  value: number;
  color: string;
}

import { useMemo } from "react";
export function WaterUsageCard() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Inside your functional component:
  const data = useMemo(() => {
    const waterUsageData: WaterUsageData[] = [
      { day: "Mon", usage: 120 },
      { day: "Tue", usage: 140 },
      { day: "Wed", usage: 110 },
      { day: "Thu", usage: 130 },
      { day: "Fri", usage: 150 },
      { day: "Sat", usage: 90 },
      { day: "Sun", usage: 80 },
    ];
    return waterUsageData;
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartContainer = chartContainerRef.current;
    const tooltip = tooltipRef.current;

    const chart = createChart(chartContainer, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#64748b",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "#e2e8f0" },
      },
      width: chartContainer.clientWidth,
      height: 200,
      rightPriceScale: {
        visible: false,
      },
      timeScale: {
        borderVisible: false,
      },
    });

    // Map data to histogram format
    const histogramData: CustomHistogramData[] = data.map((item, index) => ({
      time: index,
      value: item.usage,
      color: "#3b82f6",
    }));

    const series = chart.addSeries(HistogramSeries, {
      color: "#3b82f6",
    });

    series.setData(
      histogramData.map((item) => ({
        time: item.time as Time, // Cast time to Time type
        value: item.value,
        color: item.color,
      }))
    );

    // Add custom crosshair and tooltip handling
    if (tooltip) {
      chart.subscribeCrosshairMove((param) => {
        if (
          param.time === undefined ||
          param.point === undefined ||
          !param.point ||
          param.point.x < 0 ||
          param.point.x > chartContainer.clientWidth ||
          param.point.y < 0 ||
          param.point.y > chartContainer.clientHeight
        ) {
          tooltip.style.display = "none";
        } else {
          const dataPoint = param.seriesData.get(series);

          if (dataPoint) {
            // Type assertion to handle the union type
            const timeIndex = typeof param.time === "number" ? param.time : 0;
            const day = data[timeIndex].day;

            // Use type assertion to access the value property
            const value = (dataPoint as { value: number }).value;

            tooltip.style.display = "block";
            tooltip.style.left = param.point.x + "px";
            tooltip.style.top = param.point.y + "px";
            tooltip.innerHTML = `
            <div class="text-sm font-medium">${day}</div>
            <div class="text-sm font-semibold">${value} m³</div>
          `;
          }
        }
      });
    }

    // Handle resize
    const handleResize = () => {
      chart.applyOptions({ width: chartContainer.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Usage</CardTitle>
        <CardDescription>Water consumption (m³)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[200px]">
          <div ref={chartContainerRef} className="w-full h-full" />
          <div
            ref={tooltipRef}
            className="absolute z-10 bg-white p-2 rounded shadow hidden border border-gray-200"
            style={{ pointerEvents: "none" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
