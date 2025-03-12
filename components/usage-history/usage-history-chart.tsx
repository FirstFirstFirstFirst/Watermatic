"use client";

import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createChart, ColorType, LineSeries, Time } from "lightweight-charts";
import { useMemo } from "react";

interface UsageData {
  month: string;
  usage: number;
}

export function UsageHistoryChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const data = useMemo<UsageData[]>(
    () => [
      { month: "Jan", usage: 2800 },
      { month: "Feb", usage: 2600 },
      { month: "Mar", usage: 2900 },
      { month: "Apr", usage: 3100 },
      { month: "May", usage: 3300 },
      { month: "Jun", usage: 3500 },
      { month: "Jul", usage: 3700 },
      { month: "Aug", usage: 3600 },
      { month: "Sep", usage: 3400 },
      { month: "Oct", usage: 3120 },
      { month: "Nov", usage: 3000 },
      { month: "Dec", usage: 3000 },
    ],
    []
  );

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartElement = chartContainerRef.current;

    // Clear any existing chart
    chartElement.innerHTML = "";

    // Create tooltip element
    const tooltipEl = document.createElement("div");
    tooltipEl.className =
      "absolute hidden p-2 bg-white rounded shadow-md text-sm z-50";
    chartElement.appendChild(tooltipEl);

    // Create chart instance
    const chart = createChart(chartElement, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(0, 0, 0, 0.9)",
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
      },
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
        visible: true,
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
      width: chartElement.clientWidth,
      height: 300,
    });

    // Prepare series data with proper time format
    const seriesData = data.map((item, index) => ({
      time: index as Time, // Type assertion to Time
      value: item.usage,
    }));

    // Add area series
    const areaSeries = chart.addSeries(LineSeries, {
      lineWidth: 3,
    });

    areaSeries.setData(seriesData);

    // Set Y-axis range
    // Fix for price scale
    chart.priceScale("right").applyOptions({
      autoScale: false,
      scaleMargins: {
        top: 0.1,
        bottom: 0.3,
      },
    });

    // Fix for time scale
    chart.timeScale().applyOptions({
      barSpacing: chartElement.clientWidth / (data.length + 1),
      timeVisible: true,
      ticksVisible: true,
    });

    // Handle crosshair movement for tooltip
    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartElement.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartElement.clientHeight
      ) {
        tooltipEl.style.display = "none";
        return;
      }

      const dataIndex = param.time as number;
      if (dataIndex >= 0 && dataIndex < data.length) {
        const dataPoint = data[dataIndex];

        tooltipEl.style.display = "block";
        tooltipEl.innerHTML = `
          <div class="text-sm font-medium">${dataPoint.month}</div>
          <div class="text-sm font-semibold">${dataPoint.usage} m³</div>
        `;

        // Position tooltip near the point
        const x = param.point.x;
        const y = param.point.y;

        // Adjust position to prevent tooltip from going off-screen
        const tooltipWidth = tooltipEl.offsetWidth;
        const tooltipHeight = tooltipEl.offsetHeight;

        let left = x - tooltipWidth / 2;
        if (left < 0) left = 0;
        if (left + tooltipWidth > chartElement.clientWidth) {
          left = chartElement.clientWidth - tooltipWidth;
        }

        let top = y - tooltipHeight - 10;
        if (top < 0) top = y + 10;

        tooltipEl.style.left = `${left}px`;
        tooltipEl.style.top = `${top}px`;
      }
    });

    // Handle window resize
    const handleResize = () => {
      chart.applyOptions({
        width: chartElement.clientWidth,
      });
      chart.timeScale().applyOptions({
        barSpacing: chartElement.clientWidth / (data.length + 1),
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Annual Water Usage</CardTitle>
        <CardDescription>Monthly water consumption (m³)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px]" ref={chartContainerRef}></div>
      </CardContent>
    </Card>
  );
}
